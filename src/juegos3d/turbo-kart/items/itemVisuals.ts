/**
 * Procedural item visuals: 64x64 Canvas2D HUD icons and low-poly 3D meshes.
 * Everything is generated in code (no asset files). Geometries, materials and
 * textures are cached module-wide and shared between mesh instances.
 *
 * Wukong Español: original item designs — energy orbs (green / red), comet,
 * oil slick, nitro canister, plasma shield, EMP wave and pulse bomb.
 */
import * as THREE from 'three';
import type { ItemType } from '../core/types';
import { TAU } from '../core/math';

// ---------------------------------------------------------------------------
// Icons (Canvas2D)
// ---------------------------------------------------------------------------

const ICON_SIZE = 64;
const iconCache = new Map<ItemType, HTMLCanvasElement>();

/** Returns a cached 64x64 canvas icon for the HUD item slot / roulette. */
export function buildItemIcon(item: ItemType): HTMLCanvasElement {
  const cached = iconCache.get(item);
  if (cached) return cached;
  const canvas = document.createElement('canvas');
  canvas.width = ICON_SIZE;
  canvas.height = ICON_SIZE;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, ICON_SIZE, ICON_SIZE);
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    drawIcon(ctx, item);
  }
  iconCache.set(item, canvas);
  return canvas;
}

const GREEN = { core: '#eaffd8', mid: '#3dff7a', dark: '#0b7a35' };
const RED = { core: '#fff0e8', mid: '#ff4a3a', dark: '#8a0f12' };

function drawIcon(ctx: CanvasRenderingContext2D, item: ItemType): void {
  const c = ICON_SIZE / 2;
  switch (item) {
    case 'none':
      return;
    case 'oil':
      drawOil(ctx, c, c + 2, 1);
      return;
    case 'triple_oil':
      drawTriple(ctx, (x, y, s) => drawOil(ctx, x, y, s));
      return;
    case 'green_orb':
      drawOrbIcon(ctx, c, c, 1, GREEN, false);
      return;
    case 'red_orb':
      drawOrbIcon(ctx, c, c, 1, RED, true);
      return;
    case 'triple_green_orb':
      drawTriple(ctx, (x, y, s) => drawOrbIcon(ctx, x, y, s, GREEN, false));
      return;
    case 'triple_red_orb':
      drawTriple(ctx, (x, y, s) => drawOrbIcon(ctx, x, y, s, RED, true));
      return;
    case 'comet':
      drawComet(ctx, c, c, 1);
      return;
    case 'nitro':
      drawNitro(ctx, c, c, 1, false);
      return;
    case 'triple_nitro':
      drawTriple(ctx, (x, y, s) => drawNitro(ctx, x, y, s, false));
      return;
    case 'golden_nitro':
      drawNitro(ctx, c, c, 1, true);
      return;
    case 'shield':
      drawShieldIcon(ctx, c, c, 1);
      return;
    case 'emp':
      drawEmp(ctx, c, c, 1);
      return;
    case 'pulse_bomb':
      drawPulseBomb(ctx, c, c + 2, 1);
      return;
  }
}

function drawTriple(ctx: CanvasRenderingContext2D, fn: (x: number, y: number, s: number) => void): void {
  const c = ICON_SIZE / 2;
  fn(c - 15, c - 9, 0.5);
  fn(c + 15, c - 9, 0.5);
  fn(c, c + 13, 0.5);
}

function glow(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string): void {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, TAU);
  ctx.fill();
}

/** Dark puddle with a rainbow film and a falling drop. */
function drawOil(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number): void {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(s, s);
  ctx.beginPath();
  const n = 10;
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * TAU;
    const r = 22 + Math.sin(a * 3) * 3 + Math.cos(a * 5) * 2;
    const x = Math.cos(a) * r;
    const y = 8 + Math.sin(a) * r * 0.5;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = '#16131c';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.5;
  ctx.fill();
  ctx.stroke();
  const film = ctx.createLinearGradient(-18, 0, 18, 14);
  film.addColorStop(0, 'rgba(255,60,200,0.75)');
  film.addColorStop(0.35, 'rgba(60,200,255,0.75)');
  film.addColorStop(0.7, 'rgba(120,255,120,0.7)');
  film.addColorStop(1, 'rgba(255,220,60,0.75)');
  ctx.strokeStyle = film;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(-2, 8, 13, 5, -0.1, 0.2, Math.PI * 1.6);
  ctx.stroke();
  // drop
  ctx.fillStyle = '#231d2e';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(10, -24);
  ctx.quadraticCurveTo(18, -12, 14, -8);
  ctx.arc(10, -10, 5, 0.4, Math.PI - 0.1);
  ctx.quadraticCurveTo(4, -14, 10, -24);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.beginPath();
  ctx.arc(8, -12, 1.6, 0, TAU);
  ctx.fill();
  ctx.restore();
}

/** Energy orb: bright core, halo and orbit ring; the homing one has a crosshair. */
function drawOrbIcon(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  s: number,
  col: { core: string; mid: string; dark: string },
  crosshair: boolean,
): void {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(s, s);
  glow(ctx, 0, 0, 30, col.mid + '88');
  const g = ctx.createRadialGradient(-5, -6, 2, 0, 0, 20);
  g.addColorStop(0, col.core);
  g.addColorStop(0.45, col.mid);
  g.addColorStop(1, col.dark);
  ctx.fillStyle = g;
  ctx.strokeStyle = '#0b0b14';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(0, 0, 18, 0, TAU);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = col.core;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.ellipse(0, 0, 27, 8, -0.45, 0, TAU);
  ctx.stroke();
  if (crosshair) {
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, TAU);
    ctx.moveTo(-13, 0);
    ctx.lineTo(-4, 0);
    ctx.moveTo(4, 0);
    ctx.lineTo(13, 0);
    ctx.moveTo(0, -13);
    ctx.lineTo(0, -4);
    ctx.moveTo(0, 4);
    ctx.lineTo(0, 13);
    ctx.stroke();
  } else {
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.beginPath();
    ctx.ellipse(-6, -7, 5, 3, -0.6, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

/** Blue-white comet with a flaming tail sweeping to the lower left. */
function drawComet(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number): void {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(s, s);
  const tail = ctx.createLinearGradient(-28, 26, 10, -10);
  tail.addColorStop(0, 'rgba(60,120,255,0)');
  tail.addColorStop(0.6, 'rgba(90,170,255,0.85)');
  tail.addColorStop(1, 'rgba(220,240,255,1)');
  ctx.fillStyle = tail;
  ctx.beginPath();
  ctx.moveTo(-30, 28);
  ctx.quadraticCurveTo(-6, 4, 2, -16);
  ctx.lineTo(16, -2);
  ctx.quadraticCurveTo(-4, 8, -30, 28);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-26, 14);
  ctx.quadraticCurveTo(-6, 0, 0, -12);
  ctx.lineTo(4, -8);
  ctx.quadraticCurveTo(-8, 6, -26, 14);
  ctx.fill();
  glow(ctx, 9, -9, 22, 'rgba(140,200,255,0.9)');
  const core = ctx.createRadialGradient(6, -12, 1, 9, -9, 12);
  core.addColorStop(0, '#ffffff');
  core.addColorStop(0.5, '#9fd4ff');
  core.addColorStop(1, '#1f58d6');
  ctx.fillStyle = core;
  ctx.strokeStyle = '#0a1a4a';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(9, -9, 12, 0, TAU);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

/** Pressurised nitro canister with a valve and an "N" band. */
function drawNitro(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number, gold: boolean): void {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(s, s);
  ctx.rotate(0.28);
  const body = ctx.createLinearGradient(-13, 0, 13, 0);
  if (gold) {
    body.addColorStop(0, '#8a5a06');
    body.addColorStop(0.35, '#ffe27a');
    body.addColorStop(0.6, '#f5b21a');
    body.addColorStop(1, '#7a4c04');
  } else {
    body.addColorStop(0, '#0f4a8a');
    body.addColorStop(0.35, '#7fd0ff');
    body.addColorStop(0.6, '#2b8fff');
    body.addColorStop(1, '#0b3a74');
  }
  ctx.fillStyle = body;
  ctx.strokeStyle = '#0b0b14';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(-13, -18, 26, 40, 9);
  ctx.fill();
  ctx.stroke();
  // band
  ctx.fillStyle = gold ? '#fff6d0' : '#ffffff';
  ctx.fillRect(-13, -2, 26, 11);
  ctx.strokeRect(-13, -2, 26, 11);
  ctx.fillStyle = gold ? '#b36b00' : '#e0322a';
  ctx.font = 'bold 11px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('N', 0, 4);
  // valve
  ctx.fillStyle = '#c9ced8';
  ctx.beginPath();
  ctx.roundRect(-5, -26, 10, 9, 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#e0322a';
  ctx.beginPath();
  ctx.roundRect(-9, -29, 18, 5, 2);
  ctx.fill();
  ctx.stroke();
  if (gold) {
    ctx.fillStyle = '#ffffff';
    sparkle(ctx, 15, -16, 5);
    sparkle(ctx, -15, 18, 4);
  }
  ctx.restore();
}

function sparkle(ctx: CanvasRenderingContext2D, x: number, y: number, r: number): void {
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.quadraticCurveTo(x, y, x, y + r);
  ctx.quadraticCurveTo(x, y, x - r, y);
  ctx.quadraticCurveTo(x, y, x, y - r);
  ctx.fill();
}

/** Hexagonal plasma bubble. */
function drawShieldIcon(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number): void {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(s, s);
  glow(ctx, 0, 0, 31, 'rgba(80,240,255,0.55)');
  const hex = (r: number): void => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = Math.PI / 6 + (i * Math.PI) / 3;
      const x = Math.cos(a) * r;
      const y = Math.sin(a) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  };
  const fill = ctx.createRadialGradient(-6, -8, 2, 0, 0, 24);
  fill.addColorStop(0, 'rgba(230,255,255,0.95)');
  fill.addColorStop(0.5, 'rgba(70,220,255,0.75)');
  fill.addColorStop(1, 'rgba(20,90,200,0.9)');
  hex(24);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = '#0b1d3a';
  ctx.lineWidth = 3;
  ctx.stroke();
  hex(15);
  ctx.strokeStyle = 'rgba(255,255,255,0.9)';
  ctx.lineWidth = 2;
  ctx.stroke();
  hex(6);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.restore();
}

/** Electromagnetic pulse: violet shock rings around a bright node. */
function drawEmp(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number): void {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(s, s);
  glow(ctx, 0, 0, 30, 'rgba(190,90,255,0.6)');
  for (let i = 0; i < 3; i++) {
    ctx.strokeStyle = i === 0 ? '#f3d8ff' : i === 1 ? '#c27bff' : '#7a2ad6';
    ctx.lineWidth = 3.5 - i * 0.6;
    ctx.beginPath();
    ctx.arc(0, 0, 9 + i * 8, -0.9 + i * 0.25, 0.9 - i * 0.25);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 9 + i * 8, Math.PI - 0.9 + i * 0.25, Math.PI + 0.9 - i * 0.25);
    ctx.stroke();
  }
  const core = ctx.createRadialGradient(0, 0, 1, 0, 0, 8);
  core.addColorStop(0, '#ffffff');
  core.addColorStop(1, '#a24dff');
  ctx.fillStyle = core;
  ctx.strokeStyle = '#2a0a4a';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 7, 0, TAU);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

/** Round pulse bomb: dark casing, glowing cyan band and blinking antenna. */
function drawPulseBomb(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number): void {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(s, s);
  ctx.strokeStyle = '#9aa2b0';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(4, -18);
  ctx.lineTo(9, -28);
  ctx.stroke();
  glow(ctx, 9, -28, 8, 'rgba(255,80,80,0.9)');
  ctx.fillStyle = '#ff4040';
  ctx.beginPath();
  ctx.arc(9, -28, 3, 0, TAU);
  ctx.fill();
  const body = ctx.createRadialGradient(-7, -8, 2, 0, 0, 22);
  body.addColorStop(0, '#5a6274');
  body.addColorStop(1, '#14161e');
  ctx.fillStyle = body;
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(0, 0, 20, 0, TAU);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = '#3ff0ff';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.ellipse(0, 1, 20, 6, 0, 0, Math.PI);
  ctx.stroke();
  for (let i = -1; i <= 1; i++) {
    ctx.fillStyle = '#bffbff';
    ctx.beginPath();
    ctx.arc(i * 10, 6 - Math.abs(i) * 1.5, 2, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

// ---------------------------------------------------------------------------
// 3D meshes
// ---------------------------------------------------------------------------

const geometryCache = new Map<string, THREE.BufferGeometry>();
const materialCache = new Map<string, THREE.Material>();

function geo<T extends THREE.BufferGeometry>(key: string, make: () => T): T {
  let g = geometryCache.get(key) as T | undefined;
  if (!g) {
    g = make();
    geometryCache.set(key, g);
  }
  return g;
}

function mat<T extends THREE.Material>(key: string, make: () => T): T {
  let m = materialCache.get(key) as T | undefined;
  if (!m) {
    m = make();
    materialCache.set(key, m);
  }
  return m;
}

function standard(key: string, params: THREE.MeshStandardMaterialParameters): THREE.MeshStandardMaterial {
  return mat(key, () => new THREE.MeshStandardMaterial(params));
}

function additive(key: string, color: number, opacity: number): THREE.MeshBasicMaterial {
  return mat(
    key,
    () =>
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      }),
  );
}

function basicGlow(key: string, color: number): THREE.MeshBasicMaterial {
  return mat(key, () => new THREE.MeshBasicMaterial({ color, toneMapped: false }));
}

/** Irregular flat puddle (with a raised blob) for the oil slick. */
function buildOil(): THREE.Object3D {
  const g = new THREE.Group();
  const puddle = new THREE.Mesh(
    geo('oilPuddle', () => {
      const shape = new THREE.Shape();
      const n = 22;
      for (let i = 0; i <= n; i++) {
        const a = (i / n) * TAU;
        const r = 0.62 + Math.sin(a * 3) * 0.08 + Math.cos(a * 5 + 1) * 0.06;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r * 0.85;
        if (i === 0) shape.moveTo(x, y);
        else shape.lineTo(x, y);
      }
      const e = new THREE.ExtrudeGeometry(shape, { depth: 0.04, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.05, bevelSegments: 2, curveSegments: 4 });
      e.rotateX(-Math.PI / 2);
      return e;
    }),
    standard('oilPuddle', { color: 0x0d0b12, roughness: 0.08, metalness: 0.85, emissive: 0x1a0830, emissiveIntensity: 0.4 }),
  );
  puddle.receiveShadow = true;
  g.add(puddle);
  const sheen = new THREE.Mesh(
    geo('oilSheen', () => {
      const r = new THREE.RingGeometry(0.22, 0.34, 20, 1, 0.3, Math.PI * 1.5);
      r.rotateX(-Math.PI / 2);
      return r;
    }),
    additive('oilSheen', 0x8a5cff, 0.55),
  );
  sheen.position.y = 0.1;
  g.add(sheen);
  const sheen2 = new THREE.Mesh(geo('oilSheen', () => new THREE.RingGeometry(0.22, 0.34, 20)), additive('oilSheen2', 0x35d6ff, 0.45));
  sheen2.position.set(0.15, 0.105, 0.1);
  sheen2.rotation.y = 2.1;
  sheen2.scale.setScalar(0.7);
  g.add(sheen2);
  const blob = new THREE.Mesh(
    geo('oilBlob', () => new THREE.SphereGeometry(0.2, 10, 6, 0, TAU, 0, Math.PI / 2)),
    standard('oilBlob', { color: 0x15121c, roughness: 0.05, metalness: 0.9 }),
  );
  blob.position.set(-0.18, 0.05, -0.12);
  blob.scale.set(1, 0.7, 1);
  g.add(blob);
  g.position.y = 0.02;
  return g;
}

/** Energy orb: glowing core, translucent halo and spinning rings. */
function buildEnergyOrb(color: number, key: string, homing: boolean): THREE.Object3D {
  const g = new THREE.Group();
  const core = new THREE.Mesh(geo('orbCore', () => new THREE.IcosahedronGeometry(0.26, 2)), basicGlow(`orbCore_${key}`, color));
  g.add(core);
  const inner = new THREE.Mesh(geo('orbInner', () => new THREE.IcosahedronGeometry(0.15, 1)), basicGlow('orbWhite', 0xffffff));
  g.add(inner);
  const halo = new THREE.Mesh(geo('orbHalo', () => new THREE.SphereGeometry(0.42, 14, 10)), additive(`orbHalo_${key}`, color, 0.28));
  g.add(halo);
  const ringGeo = geo('orbRing', () => new THREE.TorusGeometry(0.4, 0.03, 6, 28));
  const ringMat = basicGlow(`orbRing_${key}`, homing ? 0xffd0c0 : 0xd8ffe0);
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2 - 0.35;
  g.add(ring);
  if (homing) {
    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.x = Math.PI / 2 + 0.35;
    ring2.scale.setScalar(0.85);
    g.add(ring2);
    const finGeo = geo('orbFin', () => new THREE.ConeGeometry(0.06, 0.22, 4));
    for (let i = 0; i < 4; i++) {
      const fin = new THREE.Mesh(finGeo, ringMat);
      const a = (i / 4) * TAU;
      fin.position.set(Math.cos(a) * 0.5, 0, Math.sin(a) * 0.5);
      fin.rotation.z = Math.PI / 2;
      fin.rotation.y = -a;
      g.add(fin);
    }
  }
  const base = new THREE.Mesh(
    geo('orbShadow', () => {
      const c = new THREE.CircleGeometry(0.4, 16);
      c.rotateX(-Math.PI / 2);
      return c;
    }),
    additive(`orbGlowFloor_${key}`, color, 0.35),
  );
  base.position.y = -0.33;
  g.add(base);
  g.position.y = 0.36;
  return g;
}

/** Comet: hot blue core with a crown of crystal spikes and two tilted rings. */
function buildComet(): THREE.Object3D {
  const g = new THREE.Group();
  const core = new THREE.Mesh(geo('cometCore', () => new THREE.IcosahedronGeometry(0.34, 1)), basicGlow('cometCore', 0x9fd8ff));
  g.add(core);
  const white = new THREE.Mesh(geo('cometWhite', () => new THREE.IcosahedronGeometry(0.2, 1)), basicGlow('cometWhite', 0xffffff));
  g.add(white);
  const halo = new THREE.Mesh(geo('cometHalo', () => new THREE.SphereGeometry(0.62, 14, 10)), additive('cometHalo', 0x3a7bff, 0.3));
  g.add(halo);
  const spikeGeo = geo('cometSpike', () => new THREE.ConeGeometry(0.08, 0.42, 5));
  const spikeMat = standard('cometSpike', { color: 0xbfe6ff, emissive: 0x2a6bff, emissiveIntensity: 1.2, roughness: 0.2, metalness: 0.4 });
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * TAU;
    const dir = new THREE.Vector3(Math.cos(a), i % 2 === 0 ? 0.35 : -0.25, Math.sin(a)).normalize();
    const spike = new THREE.Mesh(spikeGeo, spikeMat);
    spike.position.copy(dir).multiplyScalar(0.45);
    spike.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    g.add(spike);
  }
  const ringGeo = geo('cometRing', () => new THREE.TorusGeometry(0.62, 0.035, 6, 32));
  const ringMat = basicGlow('cometRing', 0x7fc0ff);
  for (let i = -1; i <= 1; i += 2) {
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2 + i * 0.5;
    g.add(ring);
  }
  g.position.y = 0.55;
  return g;
}

/** Nitro canister: metal cylinder, label band and red valve. */
function buildNitro(gold: boolean): THREE.Object3D {
  const g = new THREE.Group();
  const key = gold ? 'Gold' : 'Blue';
  const bodyMat = gold
    ? standard('nitroBodyGold', { color: 0xf5b21a, roughness: 0.22, metalness: 0.85, emissive: 0x3a2400, emissiveIntensity: 0.6 })
    : standard('nitroBodyBlue', { color: 0x2b8fff, roughness: 0.25, metalness: 0.7 });
  const body = new THREE.Mesh(geo('nitroBody', () => new THREE.CapsuleGeometry(0.2, 0.42, 4, 12)), bodyMat);
  body.castShadow = true;
  g.add(body);
  const band = new THREE.Mesh(
    geo('nitroBand', () => new THREE.CylinderGeometry(0.205, 0.205, 0.16, 14, 1, true)),
    standard(`nitroBand${key}`, { color: gold ? 0xfff6d0 : 0xffffff, roughness: 0.5 }),
  );
  band.position.y = -0.02;
  g.add(band);
  const stripe = new THREE.Mesh(
    geo('nitroStripe', () => new THREE.CylinderGeometry(0.207, 0.207, 0.045, 14, 1, true)),
    standard(`nitroStripe${key}`, { color: gold ? 0xb36b00 : 0xe0322a, roughness: 0.5 }),
  );
  stripe.position.y = -0.02;
  g.add(stripe);
  const neck = new THREE.Mesh(
    geo('nitroNeck', () => new THREE.CylinderGeometry(0.06, 0.08, 0.12, 8)),
    standard('nitroNeck', { color: 0xc9ced8, roughness: 0.3, metalness: 0.9 }),
  );
  neck.position.y = 0.46;
  g.add(neck);
  const valve = new THREE.Mesh(
    geo('nitroValve', () => new THREE.TorusGeometry(0.08, 0.025, 6, 12)),
    standard('nitroValve', { color: 0xe0322a, roughness: 0.4 }),
  );
  valve.rotation.x = Math.PI / 2;
  valve.position.y = 0.53;
  g.add(valve);
  g.position.y = 0.48;
  g.rotation.z = 0.25;
  return g;
}

/** Plasma shield: faceted cyan bubble around a bright hexagonal core. */
function buildShield(): THREE.Object3D {
  const g = new THREE.Group();
  const bubble = new THREE.Mesh(geo('shieldBubble', () => new THREE.IcosahedronGeometry(0.46, 1)), additive('shieldBubble', 0x45e6ff, 0.35));
  g.add(bubble);
  const frame = new THREE.Mesh(
    geo('shieldFrame', () => new THREE.IcosahedronGeometry(0.47, 1)),
    mat('shieldFrame', () => new THREE.MeshBasicMaterial({ color: 0xbffaff, wireframe: true, toneMapped: false })),
  );
  g.add(frame);
  const core = new THREE.Mesh(
    geo('shieldCore', () => new THREE.CylinderGeometry(0.17, 0.17, 0.06, 6)),
    basicGlow('shieldCore', 0xffffff),
  );
  core.rotation.x = Math.PI / 2;
  g.add(core);
  g.position.y = 0.55;
  return g;
}

/** Pulse bomb: dark casing (blinks via 'bombBody'), cyan band, antenna light. */
function buildPulseBomb(): THREE.Object3D {
  const g = new THREE.Group();
  const body = new THREE.Mesh(
    geo('bombBody', () => new THREE.SphereGeometry(0.36, 14, 10)),
    standard('bombBody', { color: 0x15151c, roughness: 0.35, metalness: 0.5 }),
  );
  body.name = 'bombBody';
  body.castShadow = true;
  g.add(body);
  const band = new THREE.Mesh(geo('bombBand', () => new THREE.TorusGeometry(0.36, 0.04, 6, 24)), basicGlow('bombBand', 0x3ff0ff));
  band.rotation.x = Math.PI / 2;
  g.add(band);
  const studGeo = geo('bombStud', () => new THREE.SphereGeometry(0.05, 6, 4));
  const studMat = basicGlow('bombStud', 0xbffbff);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * TAU;
    const stud = new THREE.Mesh(studGeo, studMat);
    stud.position.set(Math.cos(a) * 0.4, 0, Math.sin(a) * 0.4);
    g.add(stud);
  }
  const antenna = new THREE.Mesh(
    geo('bombAntenna', () => new THREE.CylinderGeometry(0.018, 0.018, 0.24, 5)),
    standard('bombAntenna', { color: 0x9aa2b0, roughness: 0.4, metalness: 0.8 }),
  );
  antenna.position.set(0.06, 0.45, 0);
  antenna.rotation.z = -0.25;
  g.add(antenna);
  const tip = new THREE.Mesh(
    geo('bombTip', () => new THREE.SphereGeometry(0.055, 6, 4)),
    standard('bombTip', { color: 0xff5050, emissive: 0xff2020, emissiveIntensity: 2.5, roughness: 0.5 }),
  );
  tip.name = 'bombTip';
  tip.position.set(0.09, 0.57, 0);
  g.add(tip);
  g.position.y = 0.43;
  return g;
}

/** EMP emitter: violet node inside three shock rings. */
function buildEmp(): THREE.Object3D {
  const g = new THREE.Group();
  const core = new THREE.Mesh(geo('empCore', () => new THREE.IcosahedronGeometry(0.16, 1)), basicGlow('empCore', 0xf3d8ff));
  g.add(core);
  const ringGeo = geo('empRing', () => new THREE.TorusGeometry(0.4, 0.03, 6, 28));
  const colors = [0xc27bff, 0xa24dff, 0xf3d8ff];
  for (let i = 0; i < 3; i++) {
    const ring = new THREE.Mesh(ringGeo, basicGlow(`empRing${i}`, colors[i]));
    ring.rotation.set(i * 1.05, i * 0.6, 0);
    ring.scale.setScalar(1 - i * 0.18);
    g.add(ring);
  }
  const halo = new THREE.Mesh(geo('empHalo', () => new THREE.SphereGeometry(0.48, 12, 8)), additive('empHalo', 0x8a2cff, 0.25));
  g.add(halo);
  g.position.y = 0.55;
  return g;
}

/**
 * Builds a fresh Object3D for the given item (≤ 600 triangles). Geometries and
 * materials are shared from the module caches; the returned group itself can be
 * freely positioned, scaled and removed. Triple items return the single base
 * item (the ItemManager instantiates three of them for the orbit).
 */
export function buildItemMesh(item: ItemType): THREE.Object3D {
  switch (item) {
    case 'oil':
    case 'triple_oil':
      return buildOil();
    case 'green_orb':
    case 'triple_green_orb':
      return buildEnergyOrb(0x3dff7a, 'green', false);
    case 'red_orb':
    case 'triple_red_orb':
      return buildEnergyOrb(0xff3a2a, 'red', true);
    case 'comet':
      return buildComet();
    case 'nitro':
    case 'triple_nitro':
      return buildNitro(false);
    case 'golden_nitro':
      return buildNitro(true);
    case 'shield':
      return buildShield();
    case 'emp':
      return buildEmp();
    case 'pulse_bomb':
      return buildPulseBomb();
    case 'none':
    default:
      return new THREE.Group();
  }
}

/** Base (non-triple) item type, e.g. 'triple_red_orb' -> 'red_orb'. */
export function baseItemType(item: ItemType): ItemType {
  switch (item) {
    case 'triple_oil':
      return 'oil';
    case 'triple_green_orb':
      return 'green_orb';
    case 'triple_red_orb':
      return 'red_orb';
    case 'triple_nitro':
      return 'nitro';
    default:
      return item;
  }
}

/** Frees all cached GPU resources (geometries, materials) and icon canvases. */
export function disposeItemVisualCaches(): void {
  for (const g of geometryCache.values()) g.dispose();
  geometryCache.clear();
  for (const m of materialCache.values()) m.dispose();
  materialCache.clear();
  iconCache.clear();
}
