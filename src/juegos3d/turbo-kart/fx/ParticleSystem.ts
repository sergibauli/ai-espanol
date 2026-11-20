/**
 * GPU particle system. Two ring-buffered pools (additive + alpha blended) drawn
 * as THREE.Points with a custom ShaderMaterial. The CPU only writes attributes
 * when spawning; motion, fading and scaling are evaluated in the vertex shader
 * from birth time / velocity / gravity, so per-frame cost is one uniform.
 */
import * as THREE from 'three';
import type { IKart, IParticleSystem, ItemType, KartState, ParticlePreset } from '../core/types';
import { events } from '../core/events';
import { BASE_TOP_SPEED, GRAVITY, KART_COUNT } from '../core/constants';
import { clamp01, TAU } from '../core/math';
import { PARTICLE_FRAGMENT, PARTICLE_VERTEX } from './shaders';
import { BoostTrails } from './BoostTrails';
import { BOOST_STYLES, TIER_MINI, TIER_NEON, TIER_ULTRA, boostTier, type BoostTier } from './boostStyles';

// Sprite atlas indices (4x4 grid, row-major from the top-left).
const ATLAS_CIRCLE = 0;
const ATLAS_STREAK = 1;
const ATLAS_SMOKE = 2;
const ATLAS_SHIELD = 3;
const ATLAS_SQUARE = 4;
const ATLAS_RING = 5;
const ATLAS_BOLT = 6;
const ATLAS_HEX = 7;
const ATLAS_FLAME = 8;
const ATLAS_SHARD = 9;
const ATLAS_DOT = 10;
const ATLAS_PETAL = 11;
const ATLAS_ZI = 12;
// Turbo (Wukong): caracteres 速 / 冲 y nube xiangyun.
const ATLAS_GLYPH_SU = 13;
const ATLAS_GLYPH_CHONG = 14;
const ATLAS_CLOUD = 15;

const ADDITIVE_CAPACITY = 6144;
/** Matches BREAK_SECONDS in items/lanternBoxes.ts. */
const ITEM_BOX_BREAK_DELAY = 0.08;
const ALPHA_CAPACITY = 4096;
const MAX_KARTS = Math.max(KART_COUNT, 16);
const MAX_PER_EMITTER_PER_FRAME = 14;

/** Reusable spawn descriptor. Emitters fill this and call group.spawn(). */
interface SpawnParams {
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  life: number;
  size0: number; size1: number;
  r0: number; g0: number; b0: number;
  r1: number; g1: number; b1: number;
  a0: number; a1: number;
  rot: number; rotSpeed: number;
  gravity: number;
  atlas: number;
  align: number;
  drag: number;
}

const S: SpawnParams = {
  x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, life: 1, size0: 0.3, size1: 0.1,
  r0: 1, g0: 1, b0: 1, r1: 1, g1: 1, b1: 1, a0: 1, a1: 0, rot: 0, rotSpeed: 0,
  gravity: 0, atlas: 0, align: 0, drag: 0,
};

function smoothstep(e0: number, e1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

function rnd(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

interface RGB { r: number; g: number; b: number }

/** Hex colour → linear RGB, allocation-free after warm-up via a small cache. */
const colorCache = new Map<number, RGB>();
function rgb(hex: number): RGB {
  let c = colorCache.get(hex);
  if (!c) {
    c = {
      r: srgbToLinear(((hex >> 16) & 255) / 255),
      g: srgbToLinear(((hex >> 8) & 255) / 255),
      b: srgbToLinear((hex & 255) / 255),
    };
    colorCache.set(hex, c);
  }
  return c;
}

const scratchHsl: RGB = { r: 0, g: 0, b: 0 };
function hueChannel(p: number, q: number, t: number): number {
  t = t - Math.floor(t);
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}
/** HSL → RGB into a scratch object (no per-call allocation). */
function hslToRgb(h: number, s: number, l: number, out: RGB = scratchHsl): RGB {
  h = h - Math.floor(h);
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  out.r = hueChannel(p, q, h + 1 / 3);
  out.g = hueChannel(p, q, h);
  out.b = hueChannel(p, q, h - 1 / 3);
  return out;
}

function setColor0(c: RGB, mul = 1): void {
  S.r0 = c.r * mul; S.g0 = c.g * mul; S.b0 = c.b * mul;
}
function setColor1(c: RGB, mul = 1): void {
  S.r1 = c.r * mul; S.g1 = c.g * mul; S.b1 = c.b * mul;
}
function setColors(hex0: number, hex1: number, mul0 = 1, mul1 = mul0): void {
  setColor0(rgb(hex0), mul0);
  setColor1(rgb(hex1), mul1);
}

/** Random direction on the unit sphere written into S velocity scaled by speed. */
function randomSphereVelocity(speed: number, upBias = 0): void {
  const z = Math.random() * 2 - 1;
  const a = Math.random() * TAU;
  const rxy = Math.sqrt(Math.max(0, 1 - z * z));
  S.vx = rxy * Math.cos(a) * speed;
  S.vy = (z * speed) + upBias;
  S.vz = rxy * Math.sin(a) * speed;
}

function jitterPosition(cx: number, cy: number, cz: number, radius: number): void {
  S.x = cx + rnd(-radius, radius);
  S.y = cy + rnd(-radius, radius);
  S.z = cz + rnd(-radius, radius);
}

// ---------------------------------------------------------------------------
// Sprite atlas
// ---------------------------------------------------------------------------

function buildAtlas(): THREE.CanvasTexture {
  const size = 512;
  const cell = size / 4;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('ParticleSystem: 2D canvas unavailable');
  ctx.clearRect(0, 0, size, size);

  const withCell = (index: number, draw: (c: CanvasRenderingContext2D, half: number) => void): void => {
    const cx = (index % 4) * cell + cell / 2;
    const cy = Math.floor(index / 4) * cell + cell / 2;
    ctx.save();
    ctx.translate(cx, cy);
    draw(ctx, cell / 2);
    ctx.restore();
  };

  const softRadial = (c: CanvasRenderingContext2D, radius: number, inner = 0, power = 1): void => {
    const g = c.createRadialGradient(0, 0, 0, 0, 0, radius);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(Math.max(0.01, inner), `rgba(255,255,255,${power >= 1 ? 1 : 0.9})`);
    g.addColorStop(0.55, 'rgba(255,255,255,0.45)');
    g.addColorStop(0.85, 'rgba(255,255,255,0.08)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    c.fillStyle = g;
    c.fillRect(-radius, -radius, radius * 2, radius * 2);
  };

  // 0 soft circle
  withCell(ATLAS_CIRCLE, (c, h) => softRadial(c, h * 0.92, 0.15));

  // 1 spark streak (horizontal)
  withCell(ATLAS_STREAK, (c, h) => {
    c.scale(1, 0.22);
    softRadial(c, h * 0.95, 0.1);
  });

  // 2 smoke puff (clustered soft blobs)
  withCell(ATLAS_SMOKE, (c, h) => {
    const blobs = 9;
    for (let i = 0; i < blobs; i++) {
      const a = (i / blobs) * TAU + 0.4;
      const d = i === 0 ? 0 : h * 0.28;
      const x = Math.cos(a) * d;
      const y = Math.sin(a) * d;
      const rr = h * (i === 0 ? 0.55 : 0.42);
      const g = c.createRadialGradient(x, y, 0, x, y, rr);
      g.addColorStop(0, 'rgba(255,255,255,0.55)');
      g.addColorStop(0.6, 'rgba(255,255,255,0.22)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      c.fillStyle = g;
      c.fillRect(-h, -h, h * 2, h * 2);
    }
  });

  // 3 four-point shield with glow
  withCell(ATLAS_SHIELD, (c, h) => {
    softRadial(c, h * 0.55, 0.05);
    c.globalAlpha = 1;
    c.fillStyle = '#fff';
    c.beginPath();
    const outer = h * 0.9;
    const inner = h * 0.18;
    for (let i = 0; i < 8; i++) {
      const rr = i % 2 === 0 ? outer : inner;
      const a = (i / 8) * TAU - Math.PI / 2;
      const x = Math.cos(a) * rr;
      const y = Math.sin(a) * rr;
      if (i === 0) c.moveTo(x, y);
      else c.lineTo(x, y);
    }
    c.closePath();
    c.fill();
  });

  // 4 square confetti (slightly shaded for a paper feel)
  withCell(ATLAS_SQUARE, (c, h) => {
    const s = h * 0.72;
    const g = c.createLinearGradient(-s, -s, s, s);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(1, 'rgba(200,200,200,1)');
    c.fillStyle = g;
    c.fillRect(-s, -s * 0.7, s * 2, s * 1.4);
  });

  // 5 ring
  withCell(ATLAS_RING, (c, h) => {
    const g = c.createRadialGradient(0, 0, 0, 0, 0, h * 0.95);
    g.addColorStop(0, 'rgba(255,255,255,0)');
    g.addColorStop(0.62, 'rgba(255,255,255,0)');
    g.addColorStop(0.78, 'rgba(255,255,255,1)');
    g.addColorStop(0.9, 'rgba(255,255,255,0.5)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    c.fillStyle = g;
    c.fillRect(-h, -h, h * 2, h * 2);
  });

  // 6 emp bolt (zig-zag, vertical)
  withCell(ATLAS_BOLT, (c, h) => {
    c.lineCap = 'round';
    c.lineJoin = 'round';
    const pts: [number, number][] = [
      [-h * 0.05, -h * 0.95], [h * 0.25, -h * 0.45], [-h * 0.15, -h * 0.25],
      [h * 0.3, h * 0.15], [-h * 0.1, h * 0.3], [h * 0.12, h * 0.95],
    ];
    const stroke = (w: number, alpha: number): void => {
      c.strokeStyle = `rgba(255,255,255,${alpha})`;
      c.lineWidth = w;
      c.beginPath();
      c.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) c.lineTo(pts[i][0], pts[i][1]);
      c.stroke();
    };
    stroke(h * 0.55, 0.12);
    stroke(h * 0.3, 0.3);
    stroke(h * 0.12, 1);
  });

  // 7 hexagon
  withCell(ATLAS_HEX, (c, h) => {
    c.fillStyle = '#fff';
    c.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * TAU;
      const x = Math.cos(a) * h * 0.8;
      const y = Math.sin(a) * h * 0.8;
      if (i === 0) c.moveTo(x, y);
      else c.lineTo(x, y);
    }
    c.closePath();
    c.fill();
  });

  // 8 flame teardrop (tip up)
  withCell(ATLAS_FLAME, (c, h) => {
    const g = c.createRadialGradient(0, h * 0.25, 0, 0, h * 0.2, h * 0.75);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.5, 'rgba(255,255,255,0.55)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    c.fillStyle = g;
    c.beginPath();
    c.moveTo(0, -h * 0.95);
    c.bezierCurveTo(h * 0.75, -h * 0.1, h * 0.75, h * 0.6, 0, h * 0.85);
    c.bezierCurveTo(-h * 0.75, h * 0.6, -h * 0.75, -h * 0.1, 0, -h * 0.95);
    c.closePath();
    c.fill();
  });

  // 9 shard (elongated diamond)
  withCell(ATLAS_SHARD, (c, h) => {
    const g = c.createLinearGradient(-h, 0, h, 0);
    g.addColorStop(0, 'rgba(255,255,255,0.7)');
    g.addColorStop(0.5, 'rgba(255,255,255,1)');
    g.addColorStop(1, 'rgba(255,255,255,0.7)');
    c.fillStyle = g;
    c.beginPath();
    c.moveTo(-h * 0.9, 0);
    c.lineTo(-h * 0.1, -h * 0.32);
    c.lineTo(h * 0.9, 0);
    c.lineTo(-h * 0.1, h * 0.32);
    c.closePath();
    c.fill();
  });

  // 10 hard dot
  withCell(ATLAS_DOT, (c, h) => {
    const g = c.createRadialGradient(0, 0, 0, 0, 0, h * 0.8);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.75, 'rgba(255,255,255,1)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    c.fillStyle = g;
    c.fillRect(-h, -h, h * 2, h * 2);
  });

  // 11 paper petal (item-box lantern burst): pointed teardrop with a crease
  withCell(ATLAS_PETAL, (c, h) => {
    c.rotate(-0.5);
    c.beginPath();
    c.moveTo(0, -h * 0.88);
    c.bezierCurveTo(h * 0.62, -h * 0.45, h * 0.56, h * 0.5, 0, h * 0.8);
    c.bezierCurveTo(-h * 0.56, h * 0.5, -h * 0.62, -h * 0.45, 0, -h * 0.88);
    c.closePath();
    const g = c.createLinearGradient(-h * 0.6, 0, h * 0.6, 0);
    g.addColorStop(0, 'rgba(205,205,205,1)');
    g.addColorStop(0.5, 'rgba(255,255,255,1)');
    g.addColorStop(1, 'rgba(170,170,170,1)');
    c.fillStyle = g;
    c.fill();
    c.strokeStyle = 'rgba(120,120,120,0.9)';
    c.lineWidth = h * 0.05;
    c.beginPath();
    c.moveTo(0, -h * 0.7);
    c.quadraticCurveTo(h * 0.08, 0, 0, h * 0.65);
    c.stroke();
  });

  // 12 字 glyph released by the item-box lantern
  withCell(ATLAS_ZI, (c, h) => {
    c.font = `900 ${Math.round(h * 1.35)}px "PingFang SC","Noto Sans CJK SC","Microsoft YaHei",serif`;
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillStyle = '#fff';
    c.fillText('字', 0, h * 0.06);
  });

  // --- Turbo (Wukong): caracteres 速 / 冲, aro de nubes xiangyun y nube suelta ---
  const glyph = (index: number, ch: string): void => {
    withCell(index, (c, h) => {
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.font = `900 ${Math.round(h * 1.45)}px "STKaiti","KaiTi","Kaiti SC","Noto Serif SC","Source Han Serif SC","Songti SC","SimSun","WenQuanYi Zen Hei","Noto Sans CJK SC",serif`;
      c.shadowColor = 'rgba(255,255,255,0.9)';
      c.shadowBlur = h * 0.16;
      c.fillStyle = '#fff';
      c.fillText(ch, 0, h * 0.04);
      c.shadowBlur = 0;
      c.fillText(ch, 0, h * 0.04);
    });
  };
  glyph(ATLAS_GLYPH_SU, '速');
  glyph(ATLAS_GLYPH_CHONG, '冲');

  /** Voluta de nube (espiral de Arquímedes) centrada en (x, y). */
  const curl = (c: CanvasRenderingContext2D, x: number, y: number, r: number, dir: number, rot: number): void => {
    c.beginPath();
    const turns = 1.35;
    const steps = 28;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const a = rot + dir * t * turns * TAU;
      const rr = r * (1 - t * 0.78);
      const px = x + Math.cos(a) * rr;
      const py = y + Math.sin(a) * rr;
      if (i === 0) c.moveTo(px, py);
      else c.lineTo(px, py);
    }
    c.stroke();
  };
  const strokeGlow = (c: CanvasRenderingContext2D, w: number, draw: () => void): void => {
    c.lineCap = 'round';
    c.lineJoin = 'round';
    c.strokeStyle = 'rgba(255,255,255,0.25)';
    c.lineWidth = w * 2.6;
    draw();
    c.strokeStyle = 'rgba(255,255,255,1)';
    c.lineWidth = w;
    draw();
  };

  // nube xiangyun suelta: dos volutas y una cola
  withCell(ATLAS_CLOUD, (c, h) => {
    strokeGlow(c, h * 0.07, () => {
      curl(c, -h * 0.28, 0, h * 0.34, 1, 0);
      curl(c, h * 0.3, h * 0.06, h * 0.26, -1, Math.PI);
      c.beginPath();
      c.moveTo(-h * 0.62, h * 0.34);
      c.quadraticCurveTo(0, h * 0.5, h * 0.7, h * 0.32);
      c.stroke();
    });
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.NoColorSpace;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.generateMipmaps = true;
  tex.needsUpdate = true;
  return tex;
}

// ---------------------------------------------------------------------------
// Particle group (one pool + one Points object)
// ---------------------------------------------------------------------------

class ParticleGroup {
  readonly points: THREE.Points;
  readonly material: THREE.ShaderMaterial;
  private readonly geometry: THREE.BufferGeometry;
  private readonly capacity: number;
  private head = 0;
  private runStart = 0;
  private runLength = 0;

  private readonly position: Float32Array;
  private readonly velocity: Float32Array;
  private readonly time: Float32Array;
  private readonly size: Float32Array;
  private readonly color0: Float32Array;
  private readonly color1: Float32Array;
  private readonly alpha: Float32Array;
  private readonly rot: Float32Array;
  private readonly misc: Float32Array;
  private readonly attributes: THREE.BufferAttribute[];
  private readonly supportsRanges: boolean;
  private readonly drawSize = new THREE.Vector2();

  constructor(capacity: number, additive: boolean, atlas: THREE.Texture, renderOrder: number) {
    this.capacity = capacity;
    this.position = new Float32Array(capacity * 3);
    this.velocity = new Float32Array(capacity * 3);
    this.time = new Float32Array(capacity * 2);
    this.size = new Float32Array(capacity * 2);
    this.color0 = new Float32Array(capacity * 3);
    this.color1 = new Float32Array(capacity * 3);
    this.alpha = new Float32Array(capacity * 2);
    this.rot = new Float32Array(capacity * 2);
    this.misc = new Float32Array(capacity * 4);
    // Dead by default: birth far in the past with tiny life.
    for (let i = 0; i < capacity; i++) {
      this.time[i * 2] = -1e6;
      this.time[i * 2 + 1] = 0.001;
    }

    const geometry = new THREE.BufferGeometry();
    const make = (arr: Float32Array, itemSize: number): THREE.BufferAttribute => {
      const attr = new THREE.BufferAttribute(arr, itemSize);
      attr.setUsage(THREE.DynamicDrawUsage);
      return attr;
    };
    const attrs = {
      position: make(this.position, 3),
      aVelocity: make(this.velocity, 3),
      aTime: make(this.time, 2),
      aSize: make(this.size, 2),
      aColor0: make(this.color0, 3),
      aColor1: make(this.color1, 3),
      aAlpha: make(this.alpha, 2),
      aRot: make(this.rot, 2),
      aMisc: make(this.misc, 4),
    };
    for (const [name, attr] of Object.entries(attrs)) geometry.setAttribute(name, attr);
    this.attributes = Object.values(attrs);
    this.supportsRanges = typeof (attrs.position as unknown as { addUpdateRange?: unknown }).addUpdateRange === 'function';
    // Huge bounding sphere so culling never hides live particles (culling disabled anyway).
    geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);
    this.geometry = geometry;

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uGravity: { value: GRAVITY },
        uHeightPx: { value: 1080 },
        uAspect: { value: 16 / 9 },
        uAtlas: { value: atlas },
      },
      vertexShader: PARTICLE_VERTEX,
      fragmentShader: PARTICLE_FRAGMENT,
      transparent: true,
      depthWrite: false,
      depthTest: true,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
      fog: false,
    });

    const points = new THREE.Points(geometry, this.material);
    points.frustumCulled = false;
    points.renderOrder = renderOrder;
    points.matrixAutoUpdate = false;
    points.name = additive ? 'ParticlesAdditive' : 'ParticlesAlpha';
    points.onBeforeRender = (renderer: THREE.WebGLRenderer): void => {
      renderer.getDrawingBufferSize(this.drawSize);
      this.material.uniforms.uHeightPx.value = this.drawSize.y;
      this.material.uniforms.uAspect.value = this.drawSize.x / Math.max(1, this.drawSize.y);
    };
    this.points = points;
  }

  setTime(t: number): void {
    this.material.uniforms.uTime.value = t;
  }

  spawn(p: SpawnParams, now: number): void {
    const i = this.head;
    const i2 = i * 2;
    const i3 = i * 3;
    const i4 = i * 4;
    this.position[i3] = p.x; this.position[i3 + 1] = p.y; this.position[i3 + 2] = p.z;
    this.velocity[i3] = p.vx; this.velocity[i3 + 1] = p.vy; this.velocity[i3 + 2] = p.vz;
    this.time[i2] = now; this.time[i2 + 1] = Math.max(0.01, p.life);
    this.size[i2] = p.size0; this.size[i2 + 1] = p.size1;
    this.color0[i3] = p.r0; this.color0[i3 + 1] = p.g0; this.color0[i3 + 2] = p.b0;
    this.color1[i3] = p.r1; this.color1[i3 + 1] = p.g1; this.color1[i3 + 2] = p.b1;
    this.alpha[i2] = p.a0; this.alpha[i2 + 1] = p.a1;
    this.rot[i2] = p.rot; this.rot[i2 + 1] = p.rotSpeed;
    this.misc[i4] = p.gravity; this.misc[i4 + 1] = p.atlas; this.misc[i4 + 2] = p.align; this.misc[i4 + 3] = p.drag;

    if (this.runLength === 0) this.runStart = i;
    if (this.runLength < this.capacity) this.runLength++;
    this.head = i + 1 >= this.capacity ? 0 : i + 1;
  }

  /** Push touched ranges to the GPU (called once per frame). */
  flush(): void {
    if (this.runLength === 0) return;
    const full = !this.supportsRanges || this.runLength >= this.capacity;
    for (const attr of this.attributes) {
      if (!full) {
        const n = attr.itemSize;
        const end = this.runStart + this.runLength;
        if (end <= this.capacity) {
          attr.addUpdateRange(this.runStart * n, this.runLength * n);
        } else {
          attr.addUpdateRange(this.runStart * n, (this.capacity - this.runStart) * n);
          attr.addUpdateRange(0, (end - this.capacity) * n);
        }
      }
      attr.needsUpdate = true;
    }
    this.runLength = 0;
  }

  /** Kill every particle. */
  clear(): void {
    for (let i = 0; i < this.capacity; i++) {
      this.time[i * 2] = -1e6;
      this.time[i * 2 + 1] = 0.001;
    }
    this.head = 0;
    this.runStart = 0;
    this.runLength = this.capacity;
  }

  dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
  }
}

// ---------------------------------------------------------------------------
// Particle system
// ---------------------------------------------------------------------------

const CONFETTI_COLORS = [0xff4b4b, 0xffd23f, 0x3ddc84, 0x3ec6ff, 0xff5ce1, 0x8f7bff, 0xffffff, 0xff9a2e];
const DRIFT_STAGE_COLORS = [0xffffff, 0x3ec6ff, 0xff9a2e, 0xd64dff];

export class ParticleSystem implements IParticleSystem {
  readonly object: THREE.Object3D;

  private readonly atlas: THREE.CanvasTexture;
  private readonly additive: ParticleGroup;
  private readonly alpha: ParticleGroup;
  private time = 0;
  private karts: readonly IKart[] = [];
  private readonly unsubs: (() => void)[] = [];

  // Per-kart emitter accumulators.
  private readonly accDrift = new Float32Array(MAX_KARTS);
  private readonly accFlame = new Float32Array(MAX_KARTS);
  private readonly accSmoke = new Float32Array(MAX_KARTS);
  private readonly accDust = new Float32Array(MAX_KARTS);
  private readonly accShield = new Float32Array(MAX_KARTS);
  private readonly accSpark = new Float32Array(MAX_KARTS);
  private accStreak = 0;
  /** Estilo del turbo activo de cada kart (mini/super/ultra/neón). */
  private readonly boostTier = new Uint8Array(MAX_KARTS);
  private readonly trails: BoostTrails;
  private readonly slotFn = (id: number): number => this.slot(id);

  // Results-screen confetti shower (player podium). 0 = idle.
  private confettiTimer = 0;
  private confettiScale = 1;
  private accConfetti = 0;
  private playerPodiumPlace = 0;

  // Scratch
  private readonly camPos = new THREE.Vector3();
  /** Item-box bursts waiting for the end of the lantern's anticipation. */
  private readonly pendingBoxBursts: { x: number; y: number; z: number; due: number }[] = [];
  private readonly camFwd = new THREE.Vector3();
  private readonly camRight = new THREE.Vector3();
  private readonly camUp = new THREE.Vector3();
  private readonly tmp = new THREE.Vector3();

  constructor() {
    this.atlas = buildAtlas();
    this.additive = new ParticleGroup(ADDITIVE_CAPACITY, true, this.atlas, 20);
    this.alpha = new ParticleGroup(ALPHA_CAPACITY, false, this.atlas, 19);
    const root = new THREE.Group();
    root.name = 'ParticleSystem';
    root.matrixAutoUpdate = false;
    root.add(this.alpha.points);
    root.add(this.additive.points);
    this.trails = new BoostTrails(MAX_KARTS);
    root.add(this.trails.mesh);
    this.object = root;
    this.subscribe();
  }

  // -------------------------------------------------------------------------
  // Events
  // -------------------------------------------------------------------------

  private subscribe(): void {
    const u = this.unsubs;
    u.push(events.on('item:explosion', (e) => {
      this.emit('explosion', e.position, { scale: Math.max(0.6, e.radius / 4) });
    }));
    u.push(events.on('item:hit', (e) => {
      this.emit('hitSparks', e.position, { scale: 1.1 });
      if (e.item === 'oil' || e.item === 'triple_oil') this.emit('oilSplat', e.position);
      else if (e.item.includes('orb')) this.emit('orbBreak', e.position, { color: orbColor(e.item) });
    }));
    u.push(events.on('item:destroyed', (e) => {
      if (e.item === 'oil' || e.item === 'triple_oil') this.emit('oilSplat', e.position);
      else if (e.item === 'pulse_bomb') this.emit('explosion', e.position, { scale: 0.7 });
      else this.emit('orbBreak', e.position, { color: orbColor(e.item) });
    }));
    u.push(events.on('item:orbBounce', (e) => this.emit('hitSparks', e.position, { scale: 0.55 })));
    u.push(events.on('kart:land', (e) => {
      const k = this.kartById(e.kartId);
      if (!k) return;
      this.emit('landPuff', k.state.position, { scale: 0.7 + clamp01(e.impact) * 0.8 });
    }));
    u.push(events.on('kart:collision', (e) => {
      const s = 0.4 + clamp01(e.impulse / 8) * 0.9;
      if (e.otherId === null) this.emit('hitSparks', e.position, { scale: s, color: 0xffe08a });
      else this.emit('hitSparks', e.position, { scale: s * 0.6, color: 0xffffff });
    }));
    u.push(events.on('item:pickup', (e) => {
      // The lantern swells and flares for ITEM_BOX_BREAK_DELAY first (items/lanternBoxes.ts).
      this.pendingBoxBursts.push({ x: e.position.x, y: e.position.y, z: e.position.z, due: this.time + ITEM_BOX_BREAK_DELAY });
    }));
    u.push(events.on('race:finish', (e) => {
      if (!e.isPlayer) return;
      this.playerPodiumPlace = e.place <= 3 ? e.place : 0;
      if (e.place > 3) return;
      const k = this.kartById(e.kartId);
      if (!k) return;
      this.tmp.copy(k.state.position);
      this.tmp.y += 2.5;
      this.emit('confetti', this.tmp, { scale: e.place === 1 ? 1.4 : 1 });
      this.emit('lapFlash', k.state.position);
    }));
    u.push(events.on('game:stateChange', (e) => {
      if (e.to === 'results' && this.playerPodiumPlace > 0) {
        // Shower confetti in front of the camera while the podium screen is up.
        this.confettiScale = this.playerPodiumPlace === 1 ? 1.4 : this.playerPodiumPlace === 2 ? 1.1 : 0.85;
        this.confettiTimer = this.playerPodiumPlace === 1 ? 6 : 4;
        this.accConfetti = 0;
      } else if (e.to !== 'results' && e.to !== 'finished') {
        this.confettiTimer = 0;
        this.playerPodiumPlace = 0;
      }
    }));
    u.push(events.on('item:emp', (e) => {
      for (const k of this.karts) {
        const st = k.state;
        if (st.id === e.sourceKartId || st.isInvincible) continue;
        this.emit('empStrike', st.position);
      }
    }));
    u.push(events.on('kart:boost', (e) => {
      const idx = this.slot(e.kartId);
      const tier = boostTier(e.source, e.strength, e.duration);
      this.boostTier[idx] = tier;
      this.trails.setTier(idx, tier);
      const k = this.kartById(e.kartId);
      if (!k) return;
      this.boostBurst(k.state, tier, e.strength);
    }));
    u.push(events.on('kart:shrink', (e) => {
      const k = this.kartById(e.kartId);
      if (!k) return;
      this.shrinkPuff(k.state.position);
    }));
    u.push(events.on('kart:unshrink', (e) => {
      const k = this.kartById(e.kartId);
      if (!k) return;
      this.shrinkPuff(k.state.position);
    }));
    u.push(events.on('kart:squish', (e) => {
      const k = this.kartById(e.kartId);
      if (!k) return;
      this.emit('landPuff', k.state.position, { scale: 1.3 });
    }));
    u.push(events.on('race:lap', (e) => {
      if (!e.isPlayer) return;
      const k = this.kartById(e.kartId);
      if (!k) return;
      this.tmp.copy(k.state.position);
      this.tmp.y += 1.2;
      this.emit('lapFlash', this.tmp, { scale: e.isFinalLap ? 1.4 : 1 });
    }));
  }

  private slot(kartId: number): number {
    return kartId >= 0 && kartId < MAX_KARTS ? kartId : ((kartId % MAX_KARTS) + MAX_KARTS) % MAX_KARTS;
  }

  private kartById(id: number): IKart | null {
    const karts = this.karts;
    if (id >= 0 && id < karts.length && karts[id].state.id === id) return karts[id];
    for (let i = 0; i < karts.length; i++) if (karts[i].state.id === id) return karts[i];
    return null;
  }

  // -------------------------------------------------------------------------
  // Per-frame
  // -------------------------------------------------------------------------

  update(dt: number, karts: readonly IKart[], camera: THREE.Camera): void {
    this.karts = karts;
    dt = Math.min(Math.max(dt, 0), 0.1);
    this.time += dt;
    const now = this.time;
    this.additive.setTime(now);
    this.alpha.setTime(now);

    const e = camera.matrixWorld.elements;
    this.camPos.set(e[12], e[13], e[14]);
    this.camFwd.set(-e[8], -e[9], -e[10]).normalize();
    this.camUp.set(e[4], e[5], e[6]).normalize();
    this.camRight.set(e[0], e[1], e[2]).normalize();

    for (let i = 0; i < karts.length; i++) {
      const st = karts[i].state;
      if (st.finished && !st.isBoosting && !st.isDrifting) continue;
      if (st.isBoosting) this.trails.computeExhausts(karts[i]);
      this.updateKartEmitters(dt, st, now);
      // Camera streaks only for a strong boost at genuinely high speed.
      if (st.isPlayer && st.isBoosting && st.boostStrength >= 0.35 && Math.abs(st.speed) > BASE_TOP_SPEED * 1.12) {
        this.updateSpeedStreaks(dt, now, this.boostTier[this.slot(st.id)] as BoostTier);
      } else if (st.isPlayer) {
        this.accStreak = 0;
      }
    }

    this.trails.update(now, karts, this.slotFn);

    if (this.confettiTimer > 0) this.updateResultsConfetti(dt, now);
    for (let i = this.pendingBoxBursts.length - 1; i >= 0; i--) {
      const b = this.pendingBoxBursts[i];
      if (b.due > now) continue;
      this.itemBoxBurst(b.x, b.y, b.z, 1, now);
      this.pendingBoxBursts.splice(i, 1);
    }

    this.additive.flush();
    this.alpha.flush();
  }

  private updateKartEmitters(dt: number, st: KartState, now: number): void {
    const idx = this.slot(st.id);
    const p = st.position;
    const h = st.heading;
    const fx = -Math.sin(h);
    const fz = -Math.cos(h);
    const rx = Math.cos(h);
    const rz = -Math.sin(h);
    const speed = Math.abs(st.speed);
    const shrink = st.isShrunk ? 0.6 : 1;

    // --- drift sparks at both rear wheels ---------------------------------
    if (st.isDrifting && !st.isAirborne) {
      const stage = st.driftStage;
      const rate = stage === 0 ? 40 : 110 + stage * 20;
      const n = this.take(this.accDrift, idx, rate, dt);
      const c = rgb(DRIFT_STAGE_COLORS[stage]);
      for (let k = 0; k < n; k++) {
        const side = k % 2 === 0 ? 1 : -1;
        const bx = p.x - fx * 0.7 + rx * 0.55 * side;
        const bz = p.z - fz * 0.7 + rz * 0.55 * side;
        S.x = bx + rnd(-0.06, 0.06);
        S.y = p.y + 0.08 + rnd(0, 0.06);
        S.z = bz + rnd(-0.06, 0.06);
        // fly backwards and outwards, some upward
        const back = rnd(2.5, 5.5) + speed * 0.15;
        S.vx = -fx * back + rx * side * rnd(0.5, 2.5) + rnd(-0.6, 0.6);
        S.vy = rnd(0.8, 2.8);
        S.vz = -fz * back + rz * side * rnd(0.5, 2.5) + rnd(-0.6, 0.6);
        S.life = stage === 0 ? rnd(0.15, 0.3) : rnd(0.25, 0.45);
        S.size0 = (stage === 0 ? 0.12 : 0.2 + stage * 0.03) * shrink;
        S.size1 = 0.03;
        setColor0(c, stage === 0 ? 1.6 : 2.2);
        setColor1(c, 0.8);
        S.a0 = 1; S.a1 = 0;
        S.rot = 0; S.rotSpeed = 0;
        S.gravity = 0.9;
        S.atlas = ATLAS_STREAK;
        S.align = 1;
        S.drag = 1.5;
        this.additive.spawn(S, now);
      }

      // --- tyre smoke (hugs the ground and trails behind the rear wheels) ----
      const ns = this.take(this.accSmoke, idx, 24, dt);
      for (let k = 0; k < ns; k++) {
        const side = k % 2 === 0 ? 1 : -1;
        S.x = p.x - fx * 0.75 + rx * 0.55 * side + rnd(-0.08, 0.08);
        S.y = p.y + 0.12;
        S.z = p.z - fz * 0.75 + rz * 0.55 * side + rnd(-0.08, 0.08);
        S.vx = -fx * rnd(0.8, 2.0) + rx * side * rnd(0.2, 0.9) + rnd(-0.25, 0.25);
        S.vy = rnd(0.12, 0.4);
        S.vz = -fz * rnd(0.8, 2.0) + rz * side * rnd(0.2, 0.9) + rnd(-0.25, 0.25);
        S.life = rnd(0.55, 0.9);
        S.size0 = 0.3 * shrink; S.size1 = 0.95 * shrink;
        S.r0 = 0.66; S.g0 = 0.66; S.b0 = 0.68;
        S.r1 = 0.52; S.g1 = 0.52; S.b1 = 0.54;
        S.a0 = 0.34; S.a1 = 0;
        S.rot = rnd(0, TAU); S.rotSpeed = rnd(-1.2, 1.2);
        S.gravity = 0;
        S.atlas = ATLAS_SMOKE;
        S.align = 0;
        S.drag = 2.2;
        this.alpha.spawn(S, now);
      }
    } else {
      this.accDrift[idx] = 0;
      this.accSmoke[idx] = 0;
    }

    // --- turbo: llamas de los escapes + chispas doradas -------------------
    if (st.isBoosting) {
      this.boostFlames(dt, st, idx, now);
    } else {
      this.accFlame[idx] = 0;
      this.accSpark[idx] = 0;
    }

    // --- off-road dust --------------------------------------------------------
    if (st.surface === 'offroad' && speed > 5 && !st.isAirborne) {
      const n = this.take(this.accDust, idx, 18 + speed * 1.4, dt);
      for (let k = 0; k < n; k++) {
        const side = k % 2 === 0 ? 1 : -1;
        S.x = p.x - fx * rnd(0.3, 0.8) + rx * 0.5 * side + rnd(-0.2, 0.2);
        S.y = p.y + 0.1;
        S.z = p.z - fz * rnd(0.3, 0.8) + rz * 0.5 * side + rnd(-0.2, 0.2);
        S.vx = -fx * rnd(1, 3) + rx * side * rnd(0.5, 2) + rnd(-0.5, 0.5);
        S.vy = rnd(0.8, 2.2);
        S.vz = -fz * rnd(1, 3) + rz * side * rnd(0.5, 2) + rnd(-0.5, 0.5);
        S.life = rnd(0.6, 1.1);
        S.size0 = 0.45; S.size1 = 1.6;
        S.r0 = 0.55; S.g0 = 0.45; S.b0 = 0.3;
        S.r1 = 0.45; S.g1 = 0.38; S.b1 = 0.26;
        S.a0 = 0.42; S.a1 = 0;
        S.rot = rnd(0, TAU); S.rotSpeed = rnd(-1, 1);
        S.gravity = 0.02;
        S.atlas = ATLAS_SMOKE;
        S.align = 0;
        S.drag = 2.2;
        this.alpha.spawn(S, now);
      }
    } else {
      this.accDust[idx] = 0;
    }

    // --- shield sparkle -----------------------------------------------------------
    if (st.isInvincible) {
      const n = this.take(this.accShield, idx, 70, dt);
      for (let k = 0; k < n; k++) {
        const a = rnd(0, TAU);
        const rr = rnd(0.5, 1.1) * shrink;
        S.x = p.x + Math.cos(a) * rr;
        S.y = p.y + rnd(0.1, 1.1) * shrink;
        S.z = p.z + Math.sin(a) * rr;
        S.vx = Math.cos(a) * rnd(0.3, 1.2) + st.velocity.x * 0.35;
        S.vy = rnd(1, 2.5);
        S.vz = Math.sin(a) * rnd(0.3, 1.2) + st.velocity.z * 0.35;
        S.life = rnd(0.4, 0.8);
        S.size0 = rnd(0.24, 0.4); S.size1 = 0.03;
        const c = hslToRgb(0.48 + 0.07 * Math.sin(now * 3 + k), 1, 0.62);
        S.r0 = c.r * 2.2; S.g0 = c.g * 2.2; S.b0 = c.b * 2.2;
        S.r1 = 1.5; S.g1 = 1.5; S.b1 = 1.5;
        S.a0 = 1; S.a1 = 0;
        S.rot = rnd(0, TAU); S.rotSpeed = rnd(-3, 3);
        S.gravity = -0.08;
        S.atlas = ATLAS_SHIELD;
        S.align = 0;
        S.drag = 1.5;
        this.additive.spawn(S, now);
      }
    } else {
      this.accShield[idx] = 0;
    }
  }

  /**
   * Llamas del turbo en cada escape: un núcleo blanco caliente pegado a la
   * boca, lenguas de fuego del color del estilo y chispas doradas que saltan
   * hacia atrás. Las cintas largas (cola de dragón) las pinta BoostTrails.
   */
  private boostFlames(dt: number, st: KartState, idx: number, now: number): void {
    const tier = this.boostTier[idx] as BoostTier;
    const style = BOOST_STYLES[tier];
    const ca = rgb(style.a);
    const cb = rgb(style.b);
    const cs = rgb(style.spark);
    const ex = this.trails.exhaustWorld;
    const h = st.heading;
    const fx = -Math.sin(h);
    const fz = -Math.cos(h);
    const shrink = st.isShrunk ? 0.6 : 1;
    const busy = st.isPlayer ? 1 : 0.55;
    const fade = Math.min(1, 0.35 + st.boostTimer / 0.25);

    // núcleo blanco + lenguas de color
    const n = this.take(this.accFlame, idx, 96 * busy, dt);
    for (let k = 0; k < n; k++) {
      const e = ex[k & 1];
      const core = k % 3 === 0;
      S.x = e.x + rnd(-0.02, 0.02);
      S.y = e.y + rnd(-0.02, 0.02);
      S.z = e.z + rnd(-0.02, 0.02);
      const back = core ? rnd(1.5, 3) : rnd(5, 8.5);
      S.vx = st.velocity.x * 0.85 - fx * back + rnd(-0.35, 0.35);
      S.vy = rnd(-0.05, 0.45);
      S.vz = st.velocity.z * 0.85 - fz * back + rnd(-0.35, 0.35);
      if (core) {
        S.life = rnd(0.05, 0.09);
        S.size0 = 0.2 * shrink; S.size1 = 0.08 * shrink;
        S.r0 = 1.25; S.g0 = 1.18; S.b0 = 1.05;
        setColor1(ca, 0.9);
        S.a0 = 0.85 * fade; S.a1 = 0;
        S.atlas = ATLAS_CIRCLE; S.align = 0;
      } else {
        S.life = rnd(0.1, 0.18) * (tier === TIER_ULTRA ? 1.25 : 1);
        S.size0 = (0.3 + style.flare * 0.08) * shrink; S.size1 = 0.06;
        const c0 = (tier === TIER_ULTRA || tier === TIER_NEON) && k % 2 === 0 ? cb : ca;
        setColor0(c0, 1.25);
        setColor1(c0 === ca ? cb : ca, 0.55);
        S.a0 = 0.75 * fade; S.a1 = 0;
        S.atlas = ATLAS_FLAME; S.align = 1;
      }
      S.rot = 0; S.rotSpeed = 0;
      S.gravity = -0.03;
      S.drag = 4;
      this.additive.spawn(S, now);
    }

    // chispas doradas
    const ns = this.take(this.accSpark, idx, (tier === TIER_MINI ? 22 : 38) * busy, dt);
    for (let k = 0; k < ns; k++) {
      const e = ex[k & 1];
      S.x = e.x; S.y = e.y; S.z = e.z;
      const back = rnd(3, 7);
      const side = rnd(-2.2, 2.2);
      S.vx = st.velocity.x * 0.6 - fx * back - fz * side;
      S.vy = rnd(0.8, 3.2);
      S.vz = st.velocity.z * 0.6 - fz * back + fx * side;
      S.life = rnd(0.22, 0.48);
      S.size0 = rnd(0.11, 0.17) * shrink; S.size1 = 0.03;
      const c = k % 3 === 2 ? cb : cs;
      setColor0(c, 2.0); setColor1(c, 0.9);
      S.a0 = fade; S.a1 = 0;
      S.rot = 0; S.rotSpeed = 0;
      S.gravity = 0.9;
      S.atlas = ATLAS_STREAK; S.align = 1;
      S.drag = 1.6;
      this.additive.spawn(S, now);
    }
  }

  /**
   * Onda de choque al activar el turbo: aro de nubes xiangyun, nubes que se
   * abren en abanico, un carácter 速/冲 que sube y una lluvia de chispas.
   * Los karts de la IA solo hacen el aro (menos ruido y menos partículas).
   */
  private boostBurst(st: KartState, tier: BoostTier, strength: number): void {
    const now = this.time;
    const style = BOOST_STYLES[tier];
    const ca = rgb(style.a);
    const cb = rgb(style.b);
    const cs = rgb(style.spark);
    const p = st.position;
    const h = st.heading;
    const fx = -Math.sin(h);
    const fz = -Math.cos(h);
    const shrink = st.isShrunk ? 0.6 : 1;
    const sc = (0.75 + clamp01(strength) * 0.6) * shrink * (tier === TIER_ULTRA ? 1.15 : 1);
    const bx = p.x - fx * 0.6;
    const by = p.y + 0.55 * shrink;
    const bz = p.z - fz * 0.6;
    // Todo lo de la onda de choque viaja con el kart (sin arrastre): si se
    // quedara atrás, pasaría enorme por delante de la cámara.
    const vx = st.velocity.x;
    const vz = st.velocity.z;

    // aro de choque del color del turbo, centrado en el kart
    S.x = p.x; S.y = p.y + 0.6 * shrink; S.z = p.z;
    S.vx = vx; S.vy = 0; S.vz = vz;
    S.life = 0.32;
    S.size0 = 0.7 * sc; S.size1 = 2.6 * sc;
    setColor0(ca, 0.9); setColor1(cb, 0.45);
    S.a0 = 0.6; S.a1 = 0;
    S.rot = 0; S.rotSpeed = 0;
    S.gravity = 0; S.atlas = ATLAS_RING; S.align = 0; S.drag = 0;
    this.additive.spawn(S, now);
    // aro fino interior, más rápido
    S.life = 0.18; S.size0 = 0.4 * sc; S.size1 = 1.7 * sc;
    S.r0 = 0.8; S.g0 = 0.76; S.b0 = 0.7; setColor1(ca, 0.35);
    S.a0 = 0.4; S.rotSpeed = 0; S.atlas = ATLAS_RING;
    this.additive.spawn(S, now);
    // destello en los escapes
    this.flashSprite(bx, by - 0.15 * shrink, bz, 0.5 * sc, 1.2 * sc, 0.1, ca.r * 1.1 + 0.2, ca.g * 1.1 + 0.2, ca.b * 1.1 + 0.2, now);

    if (!st.isPlayer) return;

    // Anillo de nubes xiangyun: volutas repartidas en un aro perpendicular a
    // la marcha (de cara a la cámara) que se abre alrededor del kart. Solo el
    // arco superior, para que ninguna se meta bajo el asfalto.
    const clouds = tier === TIER_MINI ? 6 : 8;
    const rxv = Math.cos(h), rzv = -Math.sin(h);
    for (let i = 0; i < clouds; i++) {
      const a = (-0.35 + (i / (clouds - 1)) * (Math.PI + 0.7)) + rnd(-0.08, 0.08);
      const ca2 = Math.cos(a), sa2 = Math.sin(a);
      const r0 = 0.5 * sc;
      const sp = rnd(2.2, 2.8) * sc;
      S.x = bx + rxv * ca2 * r0; S.y = by + 0.2 + sa2 * r0; S.z = bz + rzv * ca2 * r0;
      S.vx = vx + rxv * ca2 * sp; S.vy = sa2 * sp * 0.8; S.vz = vz + rzv * ca2 * sp;
      S.life = rnd(0.42, 0.52);
      S.size0 = 0.3 * sc; S.size1 = 0.7 * sc;
      const c = i % 2 === 0 ? ca : cb;
      setColor0(c, 1.0); setColor1(c, 0.4);
      S.a0 = 0.8; S.a1 = 0;
      // la voluta se inclina siguiendo el aro
      S.rot = a - Math.PI / 2; S.rotSpeed = 0;
      S.gravity = 0; S.atlas = ATLAS_CLOUD; S.align = 0; S.drag = 0;
      this.additive.spawn(S, now);
    }

    // carácter 速 / 冲 en oro que sube y se desvanece por encima del kart
    S.x = p.x + fx * 0.3; S.y = p.y + 1.75 * shrink; S.z = p.z + fz * 0.3;
    S.vx = st.velocity.x; S.vy = 1.1; S.vz = st.velocity.z;
    S.life = 0.5;
    S.size0 = 0.55 * sc; S.size1 = 0.9 * sc;
    // el carácter siempre en oro imperial, se apaga hacia el color del turbo
    S.r0 = 1.35; S.g0 = 0.95; S.b0 = 0.35; setColor1(cb, 0.5);
    S.a0 = 0.9; S.a1 = 0;
    S.rot = 0; S.rotSpeed = 0;
    S.gravity = 0; S.atlas = style.glyph === 0 ? ATLAS_GLYPH_SU : ATLAS_GLYPH_CHONG; S.align = 0; S.drag = 0;
    this.additive.spawn(S, now);

    // lluvia de chispas doradas desde los escapes
    const sparks = tier === TIER_MINI ? 18 : 30;
    for (let i = 0; i < sparks; i++) {
      S.x = bx; S.y = by - 0.1; S.z = bz;
      const a = rnd(0, TAU);
      const sp = rnd(3, 8) * sc;
      S.vx = vx * 0.8 - fx * rnd(2, 6) + Math.cos(a) * sp * 0.6;
      S.vy = rnd(1.5, 5);
      S.vz = vz * 0.8 - fz * rnd(2, 6) + Math.sin(a) * sp * 0.6;
      S.life = rnd(0.35, 0.7);
      S.size0 = rnd(0.14, 0.22) * sc; S.size1 = 0.03;
      const c = i % 4 === 3 ? cb : cs;
      setColor0(c, 2.1); setColor1(c, 0.9);
      S.a0 = 1; S.a1 = 0;
      S.rot = 0; S.rotSpeed = 0;
      S.gravity = 1; S.atlas = ATLAS_STREAK; S.align = 1; S.drag = 1.2;
      this.additive.spawn(S, now);
    }
  }

  private updateSpeedStreaks(dt: number, now: number, tier: BoostTier): void {
    const style = BOOST_STYLES[tier];
    const ca = rgb(style.a);
    const cb = rgb(style.b);
    this.accStreak += 38 * dt;
    let n = Math.floor(this.accStreak);
    this.accStreak -= n;
    if (n > MAX_PER_EMITTER_PER_FRAME) n = MAX_PER_EMITTER_PER_FRAME;
    const cp = this.camPos;
    const f = this.camFwd;
    const r = this.camRight;
    const u = this.camUp;
    for (let k = 0; k < n; k++) {
      const ahead = rnd(8, 16);
      // keep streaks away from the screen centre so the kart stays readable
      const ang = rnd(0, TAU);
      const rad = rnd(3.2, 7.5);
      const ox = Math.cos(ang) * rad * 1.6;
      const oy = Math.sin(ang) * rad;
      S.x = cp.x + f.x * ahead + r.x * ox + u.x * oy;
      S.y = cp.y + f.y * ahead + r.y * ox + u.y * oy;
      S.z = cp.z + f.z * ahead + r.z * ox + u.z * oy;
      const spd = rnd(36, 52);
      S.vx = -f.x * spd; S.vy = -f.y * spd; S.vz = -f.z * spd;
      S.life = rnd(0.14, 0.22);
      S.size0 = 0.16; S.size1 = 0.08;
      // Mitad blancas, mitad del color del turbo: hilos de seda, no nieve.
      const c = k % 3 === 0 ? ca : k % 3 === 1 ? cb : null;
      if (c) { setColor0(c, 1.1); setColor1(c, 0.7); } else {
        S.r0 = 0.85; S.g0 = 0.9; S.b0 = 1.0;
        S.r1 = 0.6; S.g1 = 0.65; S.b1 = 0.8;
      }
      S.a0 = 0.15; S.a1 = 0;
      S.rot = 0; S.rotSpeed = 0;
      S.gravity = 0;
      S.atlas = ATLAS_STREAK;
      S.align = 1;
      S.drag = 0;
      this.additive.spawn(S, now);
    }
  }

  /** Steady drizzle of confetti falling through the camera's view on the results screen. */
  private updateResultsConfetti(dt: number, now: number): void {
    this.confettiTimer -= dt;
    const s = this.confettiScale;
    this.accConfetti += 55 * s * dt;
    let n = Math.floor(this.accConfetti);
    this.accConfetti -= n;
    if (n > MAX_PER_EMITTER_PER_FRAME) n = MAX_PER_EMITTER_PER_FRAME;
    const cp = this.camPos;
    const f = this.camFwd;
    const r = this.camRight;
    const u = this.camUp;
    for (let k = 0; k < n; k++) {
      const ahead = rnd(4, 9);
      const ox = rnd(-1, 1) * ahead * 0.9;
      const oy = rnd(2.5, 4.5);
      S.x = cp.x + f.x * ahead + r.x * ox + u.x * oy;
      S.y = cp.y + f.y * ahead + r.y * ox + u.y * oy;
      S.z = cp.z + f.z * ahead + r.z * ox + u.z * oy;
      S.vx = rnd(-0.8, 0.8); S.vy = rnd(-0.6, 0.2); S.vz = rnd(-0.8, 0.8);
      S.life = rnd(2.2, 3.4);
      S.size0 = rnd(0.12, 0.2); S.size1 = S.size0;
      const c = rgb(CONFETTI_COLORS[k % CONFETTI_COLORS.length]);
      setColor0(c, 1.1); setColor1(c, 0.9);
      S.a0 = 1; S.a1 = 1;
      S.rot = rnd(0, TAU); S.rotSpeed = rnd(-6, 6);
      // low gravity + drag → a fluttery fall (~1.5 m/s terminal)
      S.gravity = 0.09; S.atlas = k % 5 === 0 ? ATLAS_HEX : ATLAS_SQUARE; S.align = 0; S.drag = 1.6;
      this.alpha.spawn(S, now);
    }
  }

  private take(acc: Float32Array, idx: number, rate: number, dt: number): number {
    acc[idx] += rate * dt;
    let n = Math.floor(acc[idx]);
    acc[idx] -= n;
    if (n > MAX_PER_EMITTER_PER_FRAME) n = MAX_PER_EMITTER_PER_FRAME;
    return n;
  }

  // -------------------------------------------------------------------------
  // Presets
  // -------------------------------------------------------------------------

  emit(preset: ParticlePreset, position: THREE.Vector3, options?: { color?: number; scale?: number; direction?: THREE.Vector3 }): void {
    const now = this.time;
    const s = options?.scale ?? 1;
    const color = options?.color;
    const dir = options?.direction ?? null;
    const x = position.x, y = position.y, z = position.z;
    switch (preset) {
      case 'explosion': this.explosion(x, y, z, s, now); break;
      case 'hitSparks': this.hitSparks(x, y, z, s, color ?? 0xffd27a, dir, now); break;
      case 'itemBoxBurst': this.itemBoxBurst(x, y, z, s, now); break;
      case 'confetti': this.confetti(x, y, z, s, now); break;
      case 'dust': this.dust(x, y, z, s, color ?? 0xc9b48a, now); break;
      case 'boostRing': this.boostRing(x, y, z, s, color ?? 0x66e6ff, now); break;
      case 'shieldSparkle': this.shieldSparkle(x, y, z, s, now); break;
      case 'empStrike': this.empStrike(x, y, z, s, now); break;
      case 'orbBreak': this.orbBreak(x, y, z, s, color ?? 0x3ddc84, now); break;
      case 'oilSplat': this.oilSplat(x, y, z, s, now); break;
      case 'waterSplash': this.waterSplash(x, y, z, s, now); break;
      case 'lapFlash': this.lapFlash(x, y, z, s, color ?? 0xffffff, now); break;
      case 'landPuff': this.landPuff(x, y, z, s, now); break;
      default: break;
    }
  }

  private ring(x: number, y: number, z: number, size0: number, size1: number, life: number, c: RGB, mul: number, now: number): void {
    S.x = x; S.y = y; S.z = z;
    S.vx = 0; S.vy = 0; S.vz = 0;
    S.life = life;
    S.size0 = size0; S.size1 = size1;
    setColor0(c, mul); setColor1(c, mul * 0.6);
    S.a0 = 0.9; S.a1 = 0;
    S.rot = 0; S.rotSpeed = 0;
    S.gravity = 0; S.atlas = ATLAS_RING; S.align = 0; S.drag = 0;
    this.additive.spawn(S, now);
  }

  private flashSprite(x: number, y: number, z: number, size0: number, size1: number, life: number, r: number, g: number, b: number, now: number): void {
    S.x = x; S.y = y; S.z = z;
    S.vx = 0; S.vy = 0; S.vz = 0;
    S.life = life;
    S.size0 = size0; S.size1 = size1;
    S.r0 = r; S.g0 = g; S.b0 = b; S.r1 = r * 0.5; S.g1 = g * 0.5; S.b1 = b * 0.5;
    S.a0 = 1; S.a1 = 0;
    S.rot = 0; S.rotSpeed = 0;
    S.gravity = 0; S.atlas = ATLAS_CIRCLE; S.align = 0; S.drag = 0;
    this.additive.spawn(S, now);
  }

  private explosion(x: number, y: number, z: number, s: number, now: number): void {
    // fireball core (short)
    for (let i = 0; i < 18; i++) {
      jitterPosition(x, y + 0.3 * s, z, 0.25 * s);
      randomSphereVelocity(rnd(1.5, 4.5) * s, 1.2 * s);
      S.life = rnd(0.3, 0.55);
      S.size0 = rnd(0.9, 1.4) * s; S.size1 = rnd(1.6, 2.3) * s;
      S.r0 = 1.9; S.g0 = 1.35; S.b0 = 0.5; S.r1 = 1.1; S.g1 = 0.25; S.b1 = 0.03;
      S.a0 = 0.8; S.a1 = 0;
      S.rot = rnd(0, TAU); S.rotSpeed = rnd(-2, 2);
      S.gravity = -0.1; S.atlas = ATLAS_SMOKE; S.align = 0; S.drag = 3;
      this.additive.spawn(S, now);
    }
    // sparks
    for (let i = 0; i < 40; i++) {
      jitterPosition(x, y + 0.3 * s, z, 0.15 * s);
      randomSphereVelocity(rnd(6, 15) * s, 2 * s);
      S.life = rnd(0.4, 0.9);
      S.size0 = 0.3 * s; S.size1 = 0.06 * s;
      S.r0 = 2.2; S.g0 = 1.8; S.b0 = 0.9; S.r1 = 1.5; S.g1 = 0.5; S.b1 = 0.08;
      S.a0 = 1; S.a1 = 0;
      S.rot = 0; S.rotSpeed = 0;
      S.gravity = 1; S.atlas = ATLAS_STREAK; S.align = 1; S.drag = 0.8;
      this.additive.spawn(S, now);
    }
    // smoke: lingers ~1.2 s after the flash is gone
    for (let i = 0; i < 24; i++) {
      jitterPosition(x, y + 0.4 * s, z, 0.4 * s);
      randomSphereVelocity(rnd(0.6, 2.2) * s, rnd(1.2, 3.0) * s);
      S.life = rnd(1.05, 1.4);
      S.size0 = rnd(0.9, 1.4) * s; S.size1 = rnd(2.4, 3.4) * s;
      S.r0 = 0.3; S.g0 = 0.27; S.b0 = 0.25; S.r1 = 0.1; S.g1 = 0.1; S.b1 = 0.1;
      S.a0 = 0.62; S.a1 = 0;
      S.rot = rnd(0, TAU); S.rotSpeed = rnd(-1.2, 1.2);
      S.gravity = -0.1; S.atlas = ATLAS_SMOKE; S.align = 0; S.drag = 1.8;
      this.alpha.spawn(S, now);
    }
    // shockwave ring expanding along the ground + a second, faster faint ring
    this.ring(x, y + 0.35 * s, z, 1.0 * s, 11 * s, 0.5, rgb(0xffc37a), 1.6, now);
    this.ring(x, y + 0.35 * s, z, 0.6 * s, 7 * s, 0.28, rgb(0xffffff), 1.2, now);
    this.flashSprite(x, y + 0.5 * s, z, 2.6 * s, 5.5 * s, 0.16, 1.9, 1.7, 1.4, now);
  }

  private hitSparks(x: number, y: number, z: number, s: number, hex: number, dir: THREE.Vector3 | null, now: number): void {
    const c = rgb(hex);
    const n = Math.round(22 * s);
    for (let i = 0; i < n; i++) {
      jitterPosition(x, y, z, 0.1);
      randomSphereVelocity(rnd(3.5, 8) * s, 1.5);
      if (dir) { S.vx += dir.x * 5 * s; S.vy += dir.y * 5 * s; S.vz += dir.z * 5 * s; }
      S.life = rnd(0.25, 0.6);
      S.size0 = 0.26 * s; S.size1 = 0.04;
      setColor0(c, 2.2); setColor1(c, 1.2);
      S.a0 = 1; S.a1 = 0;
      S.rot = 0; S.rotSpeed = 0;
      S.gravity = 1; S.atlas = ATLAS_STREAK; S.align = 1; S.drag = 1;
      this.additive.spawn(S, now);
    }
    this.flashSprite(x, y, z, 0.8 * s, 1.6 * s, 0.14, c.r * 2.2, c.g * 2.2, c.b * 2.2, now);
  }

  private itemBoxBurst(x: number, y: number, z: number, s: number, now: number): void {
    // Silk lantern bursting: red paper petals that tumble and float down, gold
    // paper flakes, golden sparks, twinkling stars, jade embers and rings, and a
    // warm flash. No rainbow: lacquer red, gold and jade only.
    // lantern centre (LANTERN_LIFT above the pickup point)
    const yc = y + 0.5 * s;
    // Close to the camera (the player's own pickup): halve the light and keep
    // the flash under ~20 % of the screen height.
    const cdx = this.camPos.x - x, cdy = this.camPos.y - yc, cdz = this.camPos.z - z;
    const camDist = Math.sqrt(cdx * cdx + cdy * cdy + cdz * cdz);
    const near = camDist < 4 ? 0.5 : 1;
    const maxFlash = Math.max(0.3, 0.28 * camDist);
    const near2 = smoothstep(2.5, 8.0, camDist) * 0.7 + 0.3;
    // red paper petals (alpha blended so they read as paper, not light)
    for (let i = 0; i < 30; i++) {
      jitterPosition(x, yc, z, 0.35 * s);
      randomSphereVelocity(rnd(2.5, 6.5) * s, rnd(2.0, 4.0) * s);
      S.life = rnd(1.0, 1.6);
      S.size0 = rnd(0.26, 0.42) * s; S.size1 = S.size0 * 0.8;
      const deep = Math.random();
      S.r0 = 0.70 - deep * 0.2; S.g0 = 0.03; S.b0 = 0.04;
      S.r1 = 0.42; S.g1 = 0.015; S.b1 = 0.025;
      S.a0 = 1; S.a1 = 0.85;
      S.rot = rnd(0, TAU); S.rotSpeed = rnd(-7, 7);
      S.gravity = 0.22; S.atlas = ATLAS_PETAL; S.align = 0; S.drag = 2.2;
      this.alpha.spawn(S, now);
    }
    // gold paper flakes
    for (let i = 0; i < 10; i++) {
      jitterPosition(x, yc, z, 0.3 * s);
      randomSphereVelocity(rnd(2, 5.5) * s, rnd(2.5, 4.5) * s);
      S.life = rnd(0.9, 1.4);
      S.size0 = rnd(0.16, 0.26) * s; S.size1 = S.size0 * 0.7;
      S.r0 = 1.0; S.g0 = 0.72; S.b0 = 0.22; S.r1 = 0.8; S.g1 = 0.5; S.b1 = 0.12;
      S.a0 = 1; S.a1 = 0.7;
      S.rot = rnd(0, TAU); S.rotSpeed = rnd(-10, 10);
      S.gravity = 0.3; S.atlas = i % 2 === 0 ? ATLAS_SQUARE : ATLAS_PETAL; S.align = 0; S.drag = 2;
      this.alpha.spawn(S, now);
    }
    // golden sparks (fast, velocity aligned)
    const sparks = Math.round(34 * near);
    for (let i = 0; i < sparks; i++) {
      jitterPosition(x, yc, z, 0.15 * s);
      randomSphereVelocity(rnd(5, 11) * s, 2.5 * s);
      S.life = rnd(0.35, 0.75);
      S.size0 = rnd(0.22, 0.34) * s; S.size1 = 0.05 * s;
      S.r0 = 1.5 * near; S.g0 = 0.95 * near; S.b0 = 0.25 * near; S.r1 = 1.1 * near; S.g1 = 0.35 * near; S.b1 = 0.05 * near;
      S.a0 = 1; S.a1 = 0;
      S.rot = 0; S.rotSpeed = 0;
      S.gravity = 0.8; S.atlas = ATLAS_STREAK; S.align = 1; S.drag = 1.6;
      this.additive.spawn(S, now);
    }
    // twinkling gold stars that hang in the air
    for (let i = 0; i < 8; i++) {
      jitterPosition(x, yc, z, 0.6 * s);
      randomSphereVelocity(rnd(0.8, 2.4) * s, 1.0 * s);
      S.life = rnd(0.6, 1.0);
      S.size0 = rnd(0.3, 0.5) * s; S.size1 = 0.05;
      S.r0 = 1.35; S.g0 = 0.9; S.b0 = 0.3; S.r1 = 0.9; S.g1 = 0.45; S.b1 = 0.08;
      S.a0 = 1; S.a1 = 0;
      S.rot = rnd(0, TAU); S.rotSpeed = rnd(-4, 4);
      S.gravity = -0.05; S.atlas = ATLAS_SHIELD; S.align = 0; S.drag = 2.5;
      this.additive.spawn(S, now);
    }
    // jade embers rising
    for (let i = 0; i < 14; i++) {
      jitterPosition(x, y - 0.2 * s, z, 0.7 * s);
      S.vx = rnd(-0.8, 0.8) * s; S.vy = rnd(2.0, 4.0) * s; S.vz = rnd(-0.8, 0.8) * s;
      S.life = rnd(0.7, 1.2);
      S.size0 = rnd(0.12, 0.2) * s; S.size1 = 0.03;
      S.r0 = 0.3; S.g0 = 1.6; S.b0 = 1.2; S.r1 = 0.1; S.g1 = 0.8; S.b1 = 0.7;
      S.a0 = 1; S.a1 = 0;
      S.rot = 0; S.rotSpeed = 0;
      S.gravity = -0.12; S.atlas = ATLAS_CIRCLE; S.align = 0; S.drag = 1.2;
      this.additive.spawn(S, now);
    }
    // the lantern's 字 is released: a big gold glyph that rises, grows and fades
    S.x = x; S.y = yc + 0.6 * s; S.z = z;
    S.vx = 0; S.vy = 3.2 * s; S.vz = 0;
    S.life = 0.6;
    S.size0 = 0.8 * s; S.size1 = 1.4 * s;
    S.r0 = 1.45; S.g0 = 0.8; S.b0 = 0.16; S.r1 = 0.9; S.g1 = 0.3; S.b1 = 0.04;
    S.a0 = 1; S.a1 = 0.2;
    S.rot = 0; S.rotSpeed = 0;
    S.gravity = 0; S.atlas = ATLAS_ZI; S.align = 0; S.drag = 2.5;
    this.additive.spawn(S, now);
    // short fountain of golden light shooting upwards
    for (let i = 0; i < 6; i++) {
      S.x = x + rnd(-0.25, 0.25) * s; S.y = yc; S.z = z + rnd(-0.25, 0.25) * s;
      S.vx = rnd(-1.5, 1.5) * s; S.vy = rnd(9, 14) * s; S.vz = rnd(-1.5, 1.5) * s;
      S.life = rnd(0.3, 0.45);
      S.size0 = rnd(0.45, 0.65) * s; S.size1 = 0.12 * s;
      S.r0 = 1.3; S.g0 = 0.8; S.b0 = 0.25; S.r1 = 0.6; S.g1 = 0.25; S.b1 = 0.05;
      S.a0 = 0.8; S.a1 = 0;
      S.rot = 0; S.rotSpeed = 0;
      S.gravity = 0.5; S.atlas = ATLAS_STREAK; S.align = 1; S.drag = 2;
      this.additive.spawn(S, now);
    }
    // rings + flash (the flat ground shockwave is drawn by the lantern decal)
    this.ring(x, yc, z, 0.6 * s, Math.min(4.8 * s, 0.45 * camDist), 0.35, rgb(0x3dffc8), 1.5 * near2, now);
    this.ring(x, yc, z, 0.4 * s, Math.min(3.0 * s, 0.3 * camDist), 0.25, rgb(0xffb347), 1.0 * near2, now);
    const f1 = Math.min(2.4 * s, maxFlash);
    this.flashSprite(x, yc, z, f1 * 0.5, f1, 0.12, 0.9 * near, 0.4 * near, 0.1 * near, now);
  }

  private confetti(x: number, y: number, z: number, s: number, now: number): void {
    const n = Math.round(150 * s);
    for (let i = 0; i < n; i++) {
      jitterPosition(x, y, z, 0.6 * s);
      const a = rnd(0, TAU);
      const sp = rnd(1, 4.5) * s;
      S.vx = Math.cos(a) * sp; S.vz = Math.sin(a) * sp; S.vy = rnd(4, 9.5) * s;
      S.life = rnd(2.8, 4.8);
      S.size0 = rnd(0.14, 0.22); S.size1 = S.size0;
      const c = rgb(CONFETTI_COLORS[i % CONFETTI_COLORS.length]);
      setColor0(c, 1.1); setColor1(c, 0.9);
      S.a0 = 1; S.a1 = 1;
      S.rot = rnd(0, TAU); S.rotSpeed = rnd(-5, 5);
      S.gravity = 0.16; S.atlas = i % 5 === 0 ? ATLAS_HEX : ATLAS_SQUARE; S.align = 0; S.drag = 1.3;
      this.alpha.spawn(S, now);
    }
  }

  private dust(x: number, y: number, z: number, s: number, hex: number, now: number): void {
    const c = rgb(hex);
    const n = Math.round(10 * s);
    for (let i = 0; i < n; i++) {
      jitterPosition(x, y + 0.1, z, 0.2 * s);
      randomSphereVelocity(rnd(0.4, 1.6) * s, rnd(0.4, 1.2));
      S.life = rnd(0.6, 1.1);
      S.size0 = 0.5 * s; S.size1 = 1.7 * s;
      setColor0(c, 0.8); setColor1(c, 0.65);
      S.a0 = 0.45; S.a1 = 0;
      S.rot = rnd(0, TAU); S.rotSpeed = rnd(-1, 1);
      S.gravity = -0.02; S.atlas = ATLAS_SMOKE; S.align = 0; S.drag = 2;
      this.alpha.spawn(S, now);
    }
  }

  private boostRing(x: number, y: number, z: number, s: number, hex: number, now: number): void {
    const c = rgb(hex);
    this.ring(x, y, z, 0.8 * s, 3.6 * s, 0.35, c, 1.8, now);
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * TAU;
      S.x = x; S.y = y; S.z = z;
      S.vx = Math.cos(a) * 5 * s; S.vy = rnd(0.5, 1.5); S.vz = Math.sin(a) * 5 * s;
      S.life = 0.35;
      S.size0 = 0.25 * s; S.size1 = 0.04;
      setColor0(c, 2.2); setColor1(c, 1.0);
      S.a0 = 1; S.a1 = 0;
      S.rot = 0; S.rotSpeed = 0;
      S.gravity = 0.2; S.atlas = ATLAS_STREAK; S.align = 1; S.drag = 2;
      this.additive.spawn(S, now);
    }
  }

  private shieldSparkle(x: number, y: number, z: number, s: number, now: number): void {
    const n = Math.round(14 * s);
    for (let i = 0; i < n; i++) {
      jitterPosition(x, y, z, 0.6 * s);
      randomSphereVelocity(rnd(0.8, 2.4), 1.2);
      S.life = rnd(0.4, 0.8);
      S.size0 = rnd(0.2, 0.34) * s; S.size1 = 0.0;
      const c = hslToRgb(rnd(0.46, 0.56), 1, 0.62);
      S.r0 = c.r * 2.2; S.g0 = c.g * 2.2; S.b0 = c.b * 2.2; S.r1 = 1.6; S.g1 = 1.6; S.b1 = 1.6;
      S.a0 = 1; S.a1 = 0;
      S.rot = rnd(0, TAU); S.rotSpeed = rnd(-3, 3);
      S.gravity = -0.1; S.atlas = ATLAS_SHIELD; S.align = 0; S.drag = 1.5;
      this.additive.spawn(S, now);
    }
  }

  private empStrike(x: number, y: number, z: number, s: number, now: number): void {
    // Electromagnetic pulse: violet shock rings, a short arcing column and crackling streaks.
    const violet = rgb(0xb36bff);
    for (let i = 0; i < 3; i++) {
      this.ring(x, y + 0.25 + i * 0.35, z, 0.3, (3 + i * 1.6) * s, 0.3 + i * 0.08, violet, 2.2, now);
    }
    for (let i = 0; i < 5; i++) {
      S.x = x + rnd(-0.25, 0.25); S.y = y + 0.6 + i * 0.55 * s; S.z = z + rnd(-0.25, 0.25);
      S.vx = 0; S.vy = 1.5; S.vz = 0;
      S.life = 0.2 + i * 0.02;
      S.size0 = 1.1 * s; S.size1 = 0.5 * s;
      S.r0 = 2.4; S.g0 = 1.3; S.b0 = 3.2; S.r1 = 1.2; S.g1 = 0.4; S.b1 = 2.2;
      S.a0 = 1; S.a1 = 0;
      S.rot = rnd(-0.6, 0.6); S.rotSpeed = rnd(-8, 8);
      S.gravity = 0; S.atlas = ATLAS_BOLT; S.align = 0; S.drag = 0;
      this.additive.spawn(S, now);
    }
    this.flashSprite(x, y + 0.6, z, 2 * s, 4.5 * s, 0.18, 2.4, 1.4, 3.0, now);
    for (let i = 0; i < 26; i++) {
      jitterPosition(x, y + 0.4, z, 0.2);
      randomSphereVelocity(rnd(3, 8), 1.2);
      S.life = rnd(0.3, 0.6);
      S.size0 = 0.24; S.size1 = 0.03;
      S.r0 = 2.6; S.g0 = 1.4; S.b0 = 3.2; S.r1 = 1.0; S.g1 = 0.3; S.b1 = 2.0;
      S.a0 = 1; S.a1 = 0;
      S.rot = 0; S.rotSpeed = 0;
      S.gravity = 0.4; S.atlas = ATLAS_STREAK; S.align = 1; S.drag = 1;
      this.additive.spawn(S, now);
    }
  }

  private orbBreak(x: number, y: number, z: number, s: number, hex: number, now: number): void {
    const c = rgb(hex);
    // Chunky opaque shards that tumble and fall fast: readable, over in ~0.7 s.
    for (let i = 0; i < 18; i++) {
      jitterPosition(x, y + 0.1, z, 0.15);
      randomSphereVelocity(rnd(3, 7) * s, 3);
      S.life = rnd(0.4, 0.7);
      S.size0 = rnd(0.22, 0.34); S.size1 = 0.12;
      setColor0(c, 1.1); setColor1(c, 0.55);
      S.a0 = 1; S.a1 = 0;
      S.rot = rnd(0, TAU); S.rotSpeed = rnd(-10, 10);
      S.gravity = 1.1; S.atlas = i % 2 === 0 ? ATLAS_SHARD : ATLAS_HEX; S.align = 0; S.drag = 0.6;
      this.alpha.spawn(S, now);
    }
    this.hitSparks(x, y, z, 0.6 * s, 0xffffff, null, now);
  }

  private oilSplat(x: number, y: number, z: number, s: number, now: number): void {
    const c = rgb(0x1c1726);
    for (let i = 0; i < 14; i++) {
      jitterPosition(x, y + 0.1, z, 0.12);
      randomSphereVelocity(rnd(1, 3.2) * s, 2.2);
      S.life = rnd(0.45, 0.8);
      S.size0 = rnd(0.16, 0.26); S.size1 = rnd(0.25, 0.4);
      setColor0(c, 1.0); setColor1(c, 0.75);
      S.a0 = 1; S.a1 = 0;
      S.rot = rnd(0, TAU); S.rotSpeed = rnd(-4, 4);
      S.gravity = 1.2; S.atlas = i % 3 === 0 ? ATLAS_HEX : ATLAS_DOT; S.align = 0; S.drag = 0.8;
      this.alpha.spawn(S, now);
    }
    this.dust(x, y, z, 0.6 * s, 0x4a3f5c, now);
  }

  private waterSplash(x: number, y: number, z: number, s: number, now: number): void {
    for (let i = 0; i < 30; i++) {
      jitterPosition(x, y, z, 0.2 * s);
      const a = rnd(0, TAU);
      const sp = rnd(0.8, 2.8) * s;
      S.vx = Math.cos(a) * sp; S.vz = Math.sin(a) * sp; S.vy = rnd(3, 7) * s;
      S.life = rnd(0.5, 0.9);
      S.size0 = 0.16 * s; S.size1 = 0.05;
      S.r0 = 1.0; S.g0 = 1.5; S.b0 = 1.9; S.r1 = 0.6; S.g1 = 0.9; S.b1 = 1.3;
      S.a0 = 0.9; S.a1 = 0;
      S.rot = 0; S.rotSpeed = 0;
      S.gravity = 1; S.atlas = ATLAS_DOT; S.align = 0; S.drag = 0.4;
      this.additive.spawn(S, now);
    }
    for (let i = 0; i < 8; i++) {
      jitterPosition(x, y + 0.2, z, 0.3 * s);
      randomSphereVelocity(rnd(0.3, 1.2), 1);
      S.life = rnd(0.6, 1.0);
      S.size0 = 0.6 * s; S.size1 = 1.6 * s;
      S.r0 = 0.85; S.g0 = 0.9; S.b0 = 0.95; S.r1 = 0.8; S.g1 = 0.85; S.b1 = 0.9;
      S.a0 = 0.4; S.a1 = 0;
      S.rot = rnd(0, TAU); S.rotSpeed = rnd(-1, 1);
      S.gravity = -0.05; S.atlas = ATLAS_SMOKE; S.align = 0; S.drag = 2;
      this.alpha.spawn(S, now);
    }
  }

  private lapFlash(x: number, y: number, z: number, s: number, hex: number, now: number): void {
    const c = rgb(hex);
    this.ring(x, y, z, 0.6 * s, 6.5 * s, 0.45, c, 2.0, now);
    for (let i = 0; i < 22; i++) {
      const a = (i / 22) * TAU;
      S.x = x; S.y = y; S.z = z;
      S.vx = Math.cos(a) * rnd(3, 5) * s; S.vy = rnd(1.5, 4); S.vz = Math.sin(a) * rnd(3, 5) * s;
      S.life = rnd(0.5, 0.9);
      S.size0 = 0.3 * s; S.size1 = 0.02;
      const hc = hslToRgb(i / 22, 1, 0.6);
      S.r0 = hc.r * 2.2; S.g0 = hc.g * 2.2; S.b0 = hc.b * 2.2; S.r1 = 1.5; S.g1 = 1.5; S.b1 = 1.5;
      S.a0 = 1; S.a1 = 0;
      S.rot = rnd(0, TAU); S.rotSpeed = rnd(-4, 4);
      S.gravity = 0.3; S.atlas = ATLAS_SHIELD; S.align = 0; S.drag = 1.2;
      this.additive.spawn(S, now);
    }
  }

  private landPuff(x: number, y: number, z: number, s: number, now: number): void {
    const n = Math.round(10 * s);
    for (let i = 0; i < n; i++) {
      const a = rnd(0, TAU);
      S.x = x + Math.cos(a) * 0.4; S.y = y + 0.08; S.z = z + Math.sin(a) * 0.4;
      const sp = rnd(1.2, 3) * s;
      S.vx = Math.cos(a) * sp; S.vy = rnd(0.3, 0.9); S.vz = Math.sin(a) * sp;
      S.life = rnd(0.45, 0.8);
      S.size0 = 0.4 * s; S.size1 = 1.4 * s;
      S.r0 = 0.6; S.g0 = 0.58; S.b0 = 0.52; S.r1 = 0.5; S.g1 = 0.48; S.b1 = 0.44;
      S.a0 = 0.45; S.a1 = 0;
      S.rot = rnd(0, TAU); S.rotSpeed = rnd(-1.5, 1.5);
      S.gravity = 0.0; S.atlas = ATLAS_SMOKE; S.align = 0; S.drag = 2.5;
      this.alpha.spawn(S, now);
    }
  }

  private shrinkPuff(p: THREE.Vector3): void {
    const now = this.time;
    for (let i = 0; i < 16; i++) {
      jitterPosition(p.x, p.y + 0.5, p.z, 0.4);
      randomSphereVelocity(rnd(0.8, 2.2), 0.8);
      S.life = rnd(0.5, 0.9);
      S.size0 = 0.5; S.size1 = 1.3;
      S.r0 = 0.9; S.g0 = 0.9; S.b0 = 1.0; S.r1 = 0.7; S.g1 = 0.7; S.b1 = 0.8;
      S.a0 = 0.5; S.a1 = 0;
      S.rot = rnd(0, TAU); S.rotSpeed = rnd(-2, 2);
      S.gravity = -0.05; S.atlas = ATLAS_SMOKE; S.align = 0; S.drag = 2;
      this.alpha.spawn(S, now);
    }
    this.shieldSparkle(p.x, p.y + 0.5, p.z, 0.8, now);
  }

  // -------------------------------------------------------------------------

  reset(): void {
    this.pendingBoxBursts.length = 0;
    this.additive.clear();
    this.alpha.clear();
    this.accDrift.fill(0);
    this.accFlame.fill(0);
    this.accSmoke.fill(0);
    this.accDust.fill(0);
    this.accShield.fill(0);
    this.accSpark.fill(0);
    this.boostTier.fill(TIER_MINI);
    this.trails.clear();
    this.accStreak = 0;
    this.confettiTimer = 0;
    this.accConfetti = 0;
    this.playerPodiumPlace = 0;
  }

  dispose(): void {
    for (const off of this.unsubs) off();
    this.unsubs.length = 0;
    this.additive.dispose();
    this.alpha.dispose();
    this.trails.dispose();
    this.atlas.dispose();
    this.object.removeFromParent();
    this.karts = [];
  }
}

function orbColor(item: ItemType): number {
  if (item.startsWith('red')) return 0xff3b30;
  if (item === 'comet') return 0x3a7bff;
  if (item === 'pulse_bomb') return 0x222233;
  return 0x3dff7a;
}
