/**
 * Wukong Turbo Rush · 西游极速 — visual layer of the item boxes.
 *
 * Every box is a floating imperial silk lantern (灯笼): translucent red silk lit
 * from inside (pulsing warm core + fresnel rim), gold caps, ribs and handle, a
 * swaying red tassel with a jade bead, a glowing gold 字 that floats in front of
 * the silk, a rotating jade halo with xiangyun clouds and runes, golden
 * fireflies circling it and a pool of light + rune circle on the ground (which
 * also plays the jade shockwave when a kart collects the box).
 *
 * Everything is instanced: 6 draw calls for all the boxes of a track, cheap
 * shaders, no real lights. Purely visual: it only reads box slots.
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

/** What the visuals need from an item-box slot (owned by ItemManager). */
export interface LanternSlot {
  readonly world: THREE.Vector3;
  readonly base: THREE.Vector3;
  readonly groundY: number;
  readonly active: boolean;
  readonly phase: number;
}

const TAU = Math.PI * 2;
/** Overall lantern scale and how far above the pickup point its body floats. */
const LANTERN_SCALE = 0.86;
const LANTERN_LIFT = 0.26;
/** Lantern body: radius and half-height (local units, before LANTERN_SCALE). */
const BODY_R = 0.6;
const BODY_H = 0.5;
const RIBS = 10;
const FIREFLIES_PER_BOX = 10;
const DECAL_SIZE = 7.2;
const APPEAR_SECONDS = 0.85;
const BURST_SECONDS = 0.95;

// ---------------------------------------------------------------------------
// Shaders
// ---------------------------------------------------------------------------

const INSTANCE_COMMON = /* glsl */ `
uniform float uTime;
varying vec3 vLocal;
varying vec3 vN;
varying vec3 vV;
varying float vPhase;
`;

const BODY_VERT = /* glsl */ `
${INSTANCE_COMMON}
attribute float aKind;
attribute float aSway;
varying float vKind;
void main() {
  mat4 im = instanceMatrix;
  vec3 c = (modelMatrix * im * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
  vPhase = c.x * 0.37 + c.z * 0.61;
  vec3 p = position;
  // tassel sways like silk in the wind (weight grows towards its tip)
  float w = aSway * aSway;
  p.x += w * 0.13 * sin(uTime * 3.1 + vPhase);
  p.z += w * 0.10 * cos(uTime * 2.3 + vPhase * 1.7);
  p.y += w * 0.02 * sin(uTime * 4.0 + vPhase);
  vLocal = p;
  vKind = aKind;
  vec4 wp = modelMatrix * im * vec4(p, 1.0);
  vN = normalize(mat3(modelMatrix) * mat3(im) * normal);
  vV = normalize(cameraPosition - wp.xyz);
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

/** Silk body: lit from inside, gold ribs and trims, neon rim. */
const SILK_FRAG = /* glsl */ `
${INSTANCE_COMMON}
varying float vKind;
void main() {
  vec3 n = normalize(vN);
  vec3 v = normalize(vV);
  float ndv = clamp(dot(n, v), 0.0, 1.0);
  float ang = atan(vLocal.z, vLocal.x);
  float f = fract(ang * ${RIBS.toFixed(1)} / 6.2831853);
  float panel = sin(3.14159265 * f);
  float ribD = min(f, 1.0 - f);
  float rib = 1.0 - smoothstep(0.018, 0.05, ribD);
  float yN = vLocal.y / ${BODY_H.toFixed(2)};
  float ay = abs(yN);
  float band = smoothstep(0.66, 0.69, ay) * (1.0 - smoothstep(0.80, 0.83, ay));
  float bandPat = step(0.5, fract(ang * 36.0 / 6.2831853 + step(0.0, yN) * 0.5));
  float pulse = 0.84 + 0.16 * sin(uTime * 2.6 + vPhase) + 0.05 * sin(uTime * 7.3 + vPhase * 2.0);

  // light from the candle inside: strongest where the silk faces the camera
  float inner = pow(ndv, 1.4) * (0.5 + 0.5 * panel) * (1.0 - 0.55 * yN * yN);
  vec3 silkDark = vec3(0.22, 0.004, 0.012);
  vec3 silkLit = vec3(0.78, 0.018, 0.014);
  vec3 col = mix(silkDark, silkLit, clamp(inner * pulse * 1.2, 0.0, 1.0));
  col += vec3(1.6, 0.48, 0.06) * pow(inner, 4.0) * pulse * 0.85;
  // silk weave + shadow along the ribs
  col *= (0.9 + 0.1 * sin(vLocal.y * 160.0)) * (0.55 + 0.45 * smoothstep(0.0, 0.16, ribD));
  float fres = pow(1.0 - ndv, 3.0);
  col += vec3(0.9, 0.10, 0.30) * fres * 0.45;           // pink neon rim
  col += vec3(0.05, 0.45, 0.40) * fres * fres * 0.5;    // jade sky bounce

  vec3 gold = vec3(1.0, 0.62, 0.16) * (0.35 + 0.75 * ndv) + vec3(0.8, 0.55, 0.2) * fres;
  float g = max(rib, band * (0.55 + 0.45 * bandPat));
  col = mix(col, gold, g);
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

/** Gold caps / handle, red silk tassel, jade bead. aKind: 0 gold, 1 silk, 2 jade. */
const FRAME_FRAG = /* glsl */ `
${INSTANCE_COMMON}
varying float vKind;
void main() {
  vec3 n = normalize(vN);
  vec3 v = normalize(vV);
  float ndv = clamp(dot(n, v), 0.0, 1.0);
  vec3 r = reflect(-v, n);
  float env = smoothstep(-0.35, 0.85, r.y);
  float fres = pow(1.0 - ndv, 2.5);
  float spec = pow(max(r.y, 0.0), 14.0);
  float glint = 0.5 + 0.5 * sin(uTime * 1.5 + vPhase + r.x * 6.0);

  vec3 gold = mix(vec3(0.16, 0.06, 0.01), vec3(1.05, 0.62, 0.16), env);
  gold += vec3(1.5, 1.05, 0.45) * spec * (0.6 + 0.6 * glint) + vec3(1.0, 0.55, 0.3) * fres * 0.5;

  float strands = 0.7 + 0.3 * sin(atan(vLocal.z, vLocal.x) * 46.0);
  float tip = smoothstep(-0.78, -1.15, vLocal.y);
  vec3 silk = vec3(0.85, 0.05, 0.06) * strands * (0.45 + 0.55 * ndv);
  silk = mix(silk, vec3(1.1, 0.55, 0.15) * strands, tip * 0.35);
  silk += vec3(0.9, 0.25, 0.1) * smoothstep(-0.95, -0.72, vLocal.y) * 0.35; // lit by the lantern

  vec3 jade = mix(vec3(0.02, 0.22, 0.16), vec3(0.35, 1.25, 0.95), env * 0.6 + fres);
  jade += vec3(0.8, 1.4, 1.2) * spec * 0.7;

  vec3 col = vKind < 0.5 ? gold : (vKind < 1.5 ? silk : jade);
  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

/** Camera-facing 字 that floats in front of the silk, sways and breathes. */
const ZI_VERT = /* glsl */ `
uniform float uTime;
varying vec2 vUv;
varying float vGlow;
void main() {
  vec3 c = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
  float s = length(instanceMatrix[0].xyz);
  float ph = c.x * 0.37 + c.z * 0.61;
  vec3 camR = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
  vec3 camU = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
  vec3 toCam = normalize(cameraPosition - c);
  float sway = sin(uTime * 1.6 + ph) * 0.6;
  vec2 q = position.xy;
  q.x *= cos(sway);
  float breathe = 1.0 + 0.06 * sin(uTime * 3.2 + ph);
  vec3 wp = c + toCam * (${(BODY_R + 0.1).toFixed(3)} * s)
    + (camR * q.x + camU * (q.y + 0.03 * sin(uTime * 2.4 + ph))) * 0.78 * s * breathe;
  vUv = uv;
  vGlow = 0.85 + 0.15 * sin(uTime * 2.6 + ph);
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
}
`;

const ZI_FRAG = /* glsl */ `
uniform sampler2D uMap;
varying vec2 vUv;
varying float vGlow;
void main() {
  // masks: r = glyph + medallion (emissive gold), g = dark lacquer outline, b = warm glow
  vec3 t = texture2D(uMap, vUv).rgb;
  vec3 gold = mix(vec3(1.6, 0.62, 0.06), vec3(1.9, 1.15, 0.28), smoothstep(0.3, 0.8, vUv.y));
  vec3 emit = gold * t.r * vGlow + vec3(1.0, 0.35, 0.06) * t.b * 0.55 * vGlow;
  float occ = max(t.g, t.r) * 0.92;
  vec3 col = emit + vec3(0.12, 0.0, 0.01) * t.g * (1.0 - t.r);
  if (occ + emit.r < 0.004) discard;
  // premultiplied: the outline darkens the silk, the glyph and glow add light
  gl_FragColor = vec4(col, occ);
}
`;

/** Jade halo with xiangyun clouds and runes (texture strip), additive. */
const HALO_VERT = /* glsl */ `
uniform float uTime;
varying vec2 vUv;
varying float vFacing;
void main() {
  vec4 wp = modelMatrix * instanceMatrix * vec4(position, 1.0);
  vec3 n = normalize(mat3(modelMatrix) * mat3(instanceMatrix) * vec3(0.0, 1.0, 0.0));
  vFacing = abs(dot(n, normalize(cameraPosition - wp.xyz)));
  vUv = uv;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

const HALO_FRAG = /* glsl */ `
uniform sampler2D uMap;
uniform float uTime;
varying vec2 vUv;
varying float vFacing;
void main() {
  vec4 t = texture2D(uMap, vec2(vUv.x * 2.0 - uTime * 0.06, vUv.y));
  // edge-on the band would get too dense: soften it a little
  float k = mix(0.75, 1.0, vFacing);
  vec3 col = t.rgb * vec3(0.30, 1.45, 1.05) * k * (0.9 + 0.1 * sin(uTime * 3.0 + vUv.x * 40.0));
  gl_FragColor = vec4(col * t.a, 1.0);
}
`;

/** Ground: warm light pool + rune circle + jade shockwave after a pickup. */
const DECAL_VERT = /* glsl */ `
attribute vec3 aState; // visible (0..1), burst age (s, <0 none), appear (0..1)
varying vec2 vP;
varying vec3 vState;
varying float vPhase;
void main() {
  vec4 wp = modelMatrix * instanceMatrix * vec4(position, 1.0);
  vec3 c = (modelMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
  vPhase = c.x * 0.37 + c.z * 0.61;
  vP = (uv - 0.5) * 2.0;
  vState = aState;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`;

const DECAL_FRAG = /* glsl */ `
uniform float uTime;
varying vec2 vP;
varying vec3 vState;
varying float vPhase;
void main() {
  float r = length(vP);
  if (r > 1.0) discard;
  float vis = vState.x;
  float pulse = 0.82 + 0.18 * sin(uTime * 2.6 + vPhase);
  float appearFlash = vState.z < 1.0 ? sin(3.14159 * vState.z) : 0.0;
  // warm pool of light under the lantern
  vec3 col = vec3(1.0, 0.36, 0.10) * exp(-r * r * 30.0) * (1.6 * vis * pulse + 0.06 + appearFlash * 1.2);
  // rune circle (two rings + rotating dashes)
  float a = atan(vP.y, vP.x);
  float ring1 = exp(-pow((r - 0.215) / 0.006, 2.0));
  float ring2 = exp(-pow((r - 0.27) / 0.005, 2.0));
  float dashes = step(0.45, fract(a * 18.0 / 6.2831853 + uTime * 0.08)) * step(0.228, r) * step(r, 0.258);
  float runes = ring1 + ring2 * 0.8 + dashes * 0.55;
  col += vec3(0.15, 0.95, 0.72) * runes * (0.5 * vis + 0.12 + appearFlash * 1.2);
  // jade shockwave on pickup
  float age = vState.y;
  if (age >= 0.0 && age < ${BURST_SECONDS.toFixed(2)}) {
    float k = age / ${BURST_SECONDS.toFixed(2)};
    float R = 0.08 + 0.92 * (1.0 - pow(1.0 - k, 3.0));
    float fade = pow(1.0 - k, 1.6);
    float wave = exp(-pow((r - R) / (0.025 + 0.03 * k), 2.0));
    float inner = smoothstep(R, 0.0, r) * 0.25;
    col += (vec3(0.30, 1.6, 1.15) * wave + vec3(1.2, 0.45, 0.10) * inner) * fade * 2.0;
    float spokes = pow(abs(sin(a * 6.0 + age * 3.0)), 24.0) * smoothstep(R, R * 0.4, r) * fade;
    col += vec3(1.4, 1.0, 0.4) * spokes * 0.8;
  }
  gl_FragColor = vec4(col, 1.0);
}
`;

/** Golden fireflies orbiting every lantern (one Points draw call). */
const FLY_VERT = /* glsl */ `
uniform float uTime;
uniform float uHeightPx;
attribute vec4 aCenter; // xyz + visibility
attribute vec4 aSeed;   // radius, speed, offset, colour id
varying vec3 vColor;
varying float vAlpha;
void main() {
  float vis = aCenter.w;
  float a = aSeed.y * uTime + aSeed.z * 6.2831853;
  float h = fract(aSeed.z * 7.13 + uTime * (0.10 + 0.08 * aSeed.y));
  float rad = aSeed.x * (1.0 + 0.15 * sin(uTime * 1.7 + aSeed.z * 20.0));
  vec3 p = aCenter.xyz + vec3(cos(a) * rad, -0.55 + h * 1.7, sin(a) * rad) * max(vis, 0.001);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float tw = 0.55 + 0.45 * sin(uTime * (6.0 + 5.0 * aSeed.x) + aSeed.z * 40.0);
  vAlpha = sin(h * 3.14159) * vis * tw;
  vColor = aSeed.w < 0.5 ? vec3(2.0, 1.35, 0.5) : (aSeed.w < 1.5 ? vec3(0.45, 1.7, 1.5) : vec3(1.8, 0.5, 1.1));
  float size = 0.15 * (0.7 + 0.6 * tw);
  gl_PointSize = vis <= 0.001 ? 0.0 : clamp(size * projectionMatrix[1][1] * uHeightPx * 0.5 / max(0.05, -mv.z), 0.0, 48.0);
}
`;

const FLY_FRAG = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
void main() {
  vec2 p = gl_PointCoord - 0.5;
  float d2 = dot(p, p);
  float g = exp(-d2 * 30.0) + exp(-d2 * 260.0) * 0.8;
  if (g * vAlpha < 0.004) discard;
  gl_FragColor = vec4(vColor * g * vAlpha, 1.0);
}
`;

// ---------------------------------------------------------------------------
// Geometry + textures
// ---------------------------------------------------------------------------

function tagged(geo: THREE.BufferGeometry, kind: number): THREE.BufferGeometry {
  const g = geo.index ? geo.toNonIndexed() : geo;
  if (g !== geo) geo.dispose();
  const n = g.getAttribute('position').count;
  g.setAttribute('aKind', new THREE.BufferAttribute(new Float32Array(n).fill(kind), 1));
  g.deleteAttribute('uv');
  return g;
}

function withSway(geo: THREE.BufferGeometry): THREE.BufferGeometry {
  const pos = geo.getAttribute('position');
  const sway = new Float32Array(pos.count);
  for (let i = 0; i < pos.count; i++) sway[i] = Math.min(1, Math.max(0, (-0.6 - pos.getY(i)) / 0.55));
  geo.setAttribute('aSway', new THREE.BufferAttribute(sway, 1));
  return geo;
}

function buildSilkGeometry(): THREE.BufferGeometry {
  const pts: THREE.Vector2[] = [];
  const rows = 18;
  for (let i = 0; i <= rows; i++) {
    const a = -1 + (2 * i) / rows;
    const r = BODY_R * (0.34 + 0.66 * Math.pow(Math.max(0, 1 - a * a), 0.6));
    pts.push(new THREE.Vector2(r, a * BODY_H));
  }
  const g = tagged(new THREE.LatheGeometry(pts, 30), 0);
  return withSway(g);
}

function buildFrameGeometry(): THREE.BufferGeometry {
  const H = BODY_H;
  const parts: THREE.BufferGeometry[] = [];
  const add = (geo: THREE.BufferGeometry, kind: number, x: number, y: number, z: number, rx = 0): void => {
    if (rx) geo.rotateX(rx);
    geo.translate(x, y, z);
    parts.push(tagged(geo, kind));
  };
  // top cap: flared gold crown + rim + knob + handle
  add(new THREE.CylinderGeometry(0.17, 0.27, 0.1, 20), 0, 0, H + 0.03, 0);
  add(new THREE.TorusGeometry(0.255, 0.022, 6, 24), 0, 0, H - 0.005, 0, Math.PI / 2);
  add(new THREE.CylinderGeometry(0.05, 0.08, 0.08, 12), 0, 0, H + 0.12, 0);
  add(new THREE.SphereGeometry(0.06, 12, 8), 0, 0, H + 0.19, 0);
  add(new THREE.TorusGeometry(0.11, 0.016, 6, 20), 0, 0, H + 0.32, 0);
  // bottom cap + rim
  add(new THREE.CylinderGeometry(0.27, 0.17, 0.1, 20), 0, 0, -H - 0.03, 0);
  add(new THREE.TorusGeometry(0.255, 0.022, 6, 24), 0, 0, -H + 0.005, 0, Math.PI / 2);
  // hanging ornament: gold knot, jade bead, gold collar, red silk tassel
  add(new THREE.CylinderGeometry(0.03, 0.05, 0.06, 10), 0, 0, -H - 0.11, 0);
  add(new THREE.SphereGeometry(0.07, 14, 10), 2, 0, -H - 0.2, 0);
  add(new THREE.CylinderGeometry(0.045, 0.035, 0.06, 10), 0, 0, -H - 0.3, 0);
  add(new THREE.CylinderGeometry(0.04, 0.12, 0.38, 14, 3, true), 1, 0, -H - 0.52, 0);
  add(new THREE.CircleGeometry(0.12, 14), 1, 0, -H - 0.71, 0, Math.PI / 2);
  const merged = mergeGeometries(parts, false);
  for (const p of parts) p.dispose();
  if (!merged) throw new Error('lanternBoxes: frame merge failed');
  return withSway(merged);
}

/** Flat ring in XZ with uv.x running around it (no atan seam in the shader). */
function buildHaloGeometry(inner: number, outer: number, segments: number): THREE.BufferGeometry {
  const pos: number[] = [];
  const uv: number[] = [];
  const idx: number[] = [];
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * TAU;
    const c = Math.cos(a), s = Math.sin(a);
    pos.push(c * inner, 0, s * inner, c * outer, 0, s * outer);
    uv.push(i / segments, 0, i / segments, 1);
    if (i < segments) {
      const k = i * 2;
      idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}

const CJK_FONT = '"PingFang SC","Noto Sans CJK SC","Noto Serif CJK SC","Microsoft YaHei",serif';

function makeZiTexture(): THREE.CanvasTexture {
  // Channel masks (see ZI_FRAG): red = gold glyph, green = outline, blue = glow.
  const S = 256;
  const canvas = document.createElement('canvas');
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const c = S / 2;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, S, S);
    ctx.globalCompositeOperation = 'lighter';
    const g = ctx.createRadialGradient(c, c, 0, c, c, c);
    g.addColorStop(0, 'rgba(0,0,255,0.9)');
    g.addColorStop(0.5, 'rgba(0,0,255,0.35)');
    g.addColorStop(1, 'rgba(0,0,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, S, S);
    ctx.font = `900 ${Math.round(S * 0.58)}px ${CJK_FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 16;
    ctx.strokeStyle = 'rgb(0,255,0)';
    ctx.strokeText('字', c, c + 8);
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(c, c, S * 0.42, 0, TAU);
    ctx.stroke();
    // gold medallion rings + glyph (red channel)
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = 'rgb(255,255,0)';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(c, c, S * 0.42, 0, TAU);
    ctx.stroke();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = 'rgb(255,0,0)';
    ctx.fillText('字', c, c + 8);
  }
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.NoColorSpace;
  t.anisotropy = 2;
  return t;
}

/** Strip texture for the jade halo: glowing edges, xiangyun clouds and runes. */
function makeHaloTexture(): THREE.CanvasTexture {
  const W = 1024;
  const H = 96;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, W, H);
    const band = ctx.createLinearGradient(0, 0, 0, H);
    band.addColorStop(0, 'rgba(255,255,255,0.0)');
    band.addColorStop(0.12, 'rgba(255,255,255,0.9)');
    band.addColorStop(0.2, 'rgba(255,255,255,0.10)');
    band.addColorStop(0.8, 'rgba(255,255,255,0.10)');
    band.addColorStop(0.88, 'rgba(255,255,255,0.9)');
    band.addColorStop(1, 'rgba(255,255,255,0.0)');
    ctx.fillStyle = band;
    ctx.fillRect(0, 0, W, H);
    const glyphs = ['福', '禄', '寿', '喜', '吉', '祥', '龙', '字'];
    const cells = 8;
    const cw = W / cells;
    ctx.strokeStyle = 'rgba(255,255,255,0.95)';
    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.lineCap = 'round';
    for (let i = 0; i < cells; i++) {
      const x0 = i * cw;
      // xiangyun cloud: three curls on a wavy tail
      const cy = H * 0.5;
      ctx.lineWidth = 3.2;
      ctx.beginPath();
      ctx.moveTo(x0 + cw * 0.06, cy + 6);
      ctx.bezierCurveTo(x0 + cw * 0.18, cy + 16, x0 + cw * 0.26, cy - 4, x0 + cw * 0.36, cy + 4);
      ctx.stroke();
      const curl = (x: number, y: number, r: number, dir: number): void => {
        ctx.beginPath();
        for (let k = 0; k <= 26; k++) {
          const t = k / 26;
          const a = dir * t * TAU * 1.25;
          const rr = r * (1 - t * 0.78);
          const px = x + Math.cos(a) * rr;
          const py = y + Math.sin(a) * rr;
          if (k === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      };
      curl(x0 + cw * 0.2, cy - 7, 11, 1);
      curl(x0 + cw * 0.33, cy - 9, 9, -1);
      curl(x0 + cw * 0.12, cy + 2, 7, -1);
      // rune glyph framed by a small diamond
      const gx = x0 + cw * 0.68;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(gx, cy - 30);
      ctx.lineTo(gx + 30, cy);
      ctx.lineTo(gx, cy + 30);
      ctx.lineTo(gx - 30, cy);
      ctx.closePath();
      ctx.stroke();
      ctx.font = `700 34px ${CJK_FONT}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(glyphs[i % glyphs.length], gx, cy + 2);
      // dots between motifs
      ctx.beginPath();
      ctx.arc(x0 + cw * 0.92, cy, 3, 0, TAU);
      ctx.fill();
    }
  }
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.NoColorSpace;
  t.wrapS = THREE.RepeatWrapping;
  t.anisotropy = 4;
  return t;
}

// ---------------------------------------------------------------------------
// LanternBoxes
// ---------------------------------------------------------------------------

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _q2 = new THREE.Quaternion();
const _e = new THREE.Euler();
const _p = new THREE.Vector3();
const _s = new THREE.Vector3();
const _axisY = new THREE.Vector3(0, 1, 0);

/** Elastic pop (overshoots twice, settles at 1). */
function popIn(x: number): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  return 1 - Math.exp(-6.5 * x) * Math.cos(x * 10.5);
}

export class LanternBoxes {
  readonly object = new THREE.Group();

  private readonly n: number;
  private readonly silk: THREE.InstancedMesh;
  private readonly frame: THREE.InstancedMesh;
  private readonly zi: THREE.InstancedMesh;
  private readonly halo: THREE.InstancedMesh;
  private readonly decal: THREE.InstancedMesh;
  private readonly flies: THREE.Points;
  private readonly geometries: THREE.BufferGeometry[] = [];
  private readonly materials: THREE.ShaderMaterial[] = [];
  private readonly textures: THREE.Texture[] = [];
  private readonly decalState: THREE.InstancedBufferAttribute;
  private readonly flyCenter: THREE.BufferAttribute;
  private readonly timeUniform = { value: 0 };
  private readonly heightPx = { value: 1080 };
  private readonly drawSize = new THREE.Vector2();

  private readonly wasActive: boolean[];
  private readonly appear: Float32Array;
  private readonly burstAge: Float32Array;

  constructor(count: number) {
    this.n = count;
    this.object.name = 'itemBoxLanterns';
    this.wasActive = new Array(count).fill(true);
    this.appear = new Float32Array(count).fill(1);
    this.burstAge = new Float32Array(count).fill(-1);

    const uTime = this.timeUniform;
    const mat = (vertexShader: string, fragmentShader: string, extra: Partial<THREE.ShaderMaterialParameters> = {}, uniforms: Record<string, THREE.IUniform> = {}): THREE.ShaderMaterial => {
      const m = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms: { uTime, ...uniforms }, ...extra });
      this.materials.push(m);
      return m;
    };
    const inst = (geo: THREE.BufferGeometry, m: THREE.Material, name: string, order: number): THREE.InstancedMesh => {
      this.geometries.push(geo);
      const mesh = new THREE.InstancedMesh(geo, m, count);
      mesh.frustumCulled = false;
      mesh.renderOrder = order;
      mesh.name = name;
      this.object.add(mesh);
      return mesh;
    };

    // silk body + gold frame (opaque)
    this.silk = inst(buildSilkGeometry(), mat(BODY_VERT, SILK_FRAG), 'itemBoxes', 0);
    this.frame = inst(buildFrameGeometry(), mat(BODY_VERT, FRAME_FRAG), 'itemBoxFrame', 0);

    // floating 字
    const ziTex = makeZiTexture();
    this.textures.push(ziTex);
    this.zi = inst(new THREE.PlaneGeometry(1, 1), mat(ZI_VERT, ZI_FRAG, { transparent: true, depthWrite: false, blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor, blendEquation: THREE.AddEquation }, { uMap: { value: ziTex } }), 'itemBoxQuestion', 4);

    // jade halo
    const haloTex = makeHaloTexture();
    this.textures.push(haloTex);
    this.halo = inst(
      buildHaloGeometry(0.8, 1.0, 72),
      mat(HALO_VERT, HALO_FRAG, { transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }, { uMap: { value: haloTex } }),
      'itemBoxHalo',
      5,
    );

    // ground light pool / rune circle / shockwave
    const decalGeo = new THREE.PlaneGeometry(1, 1);
    decalGeo.rotateX(-Math.PI / 2);
    this.decalState = new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3);
    this.decalState.setUsage(THREE.DynamicDrawUsage);
    decalGeo.setAttribute('aState', this.decalState);
    this.decal = inst(
      decalGeo,
      mat(DECAL_VERT, DECAL_FRAG, { transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }),
      'itemBoxRings',
      1,
    );

    // fireflies
    const nf = count * FIREFLIES_PER_BOX;
    const flyGeo = new THREE.BufferGeometry();
    flyGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(nf * 3), 3));
    this.flyCenter = new THREE.BufferAttribute(new Float32Array(nf * 4), 4);
    this.flyCenter.setUsage(THREE.DynamicDrawUsage);
    flyGeo.setAttribute('aCenter', this.flyCenter);
    const seed = new Float32Array(nf * 4);
    for (let i = 0; i < nf; i++) {
      const j = i % FIREFLIES_PER_BOX;
      seed[i * 4] = 0.75 + Math.random() * 0.75;
      seed[i * 4 + 1] = (Math.random() < 0.5 ? -1 : 1) * (0.6 + Math.random() * 1.1);
      seed[i * 4 + 2] = Math.random();
      seed[i * 4 + 3] = j % 5 === 3 ? 1 : j % 7 === 6 ? 2 : 0;
    }
    flyGeo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 4));
    flyGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e6);
    this.geometries.push(flyGeo);
    const flyMat = mat(FLY_VERT, FLY_FRAG, { transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }, { uHeightPx: this.heightPx });
    this.flies = new THREE.Points(flyGeo, flyMat);
    this.flies.frustumCulled = false;
    this.flies.renderOrder = 6;
    this.flies.name = 'itemBoxFireflies';
    this.flies.onBeforeRender = (renderer: THREE.WebGLRenderer): void => {
      renderer.getDrawingBufferSize(this.drawSize);
      this.heightPx.value = this.drawSize.y;
    };
    this.object.add(this.flies);
  }

  /** Advance the animation and write every instance. */
  update(dt: number, time: number, slots: readonly LanternSlot[]): void {
    this.timeUniform.value = time;
    const n = Math.min(this.n, slots.length);
    const st = this.decalState.array as Float32Array;
    const fc = this.flyCenter.array as Float32Array;
    for (let i = 0; i < n; i++) {
      const b = slots[i];
      // state transitions: pickup → shockwave, respawn → elastic pop-in
      if (this.wasActive[i] && !b.active) this.burstAge[i] = 0;
      else if (!this.wasActive[i] && b.active) this.appear[i] = 0;
      this.wasActive[i] = b.active;
      if (this.burstAge[i] >= 0) {
        this.burstAge[i] += dt;
        if (this.burstAge[i] > BURST_SECONDS) this.burstAge[i] = -1;
      }
      if (b.active && this.appear[i] < 1) this.appear[i] = Math.min(1, this.appear[i] + dt / APPEAR_SECONDS);

      const ap = b.active ? this.appear[i] : 0;
      const pop = popIn(ap);
      const sc = pop * LANTERN_SCALE;
      const spinIn = (1 - pop) * 7;

      // lantern body + frame: gentle yaw, sway on two axes
      _p.set(b.world.x, b.world.y + LANTERN_LIFT, b.world.z);
      _e.set(Math.sin(time * 1.3 + b.phase) * 0.07, time * 0.6 + b.phase * 2 + spinIn, Math.sin(time * 1.9 + b.phase) * 0.09);
      _q.setFromEuler(_e);
      _s.setScalar(sc);
      _m.compose(_p, _q, _s);
      this.silk.setMatrixAt(i, _m);
      this.frame.setMatrixAt(i, _m);

      // 字: billboard, appears slightly after the lantern
      const zs = popIn(Math.max(0, (ap - 0.2) / 0.8)) * LANTERN_SCALE;
      _s.setScalar(zs);
      _m.compose(_p, _q.identity(), _s);
      this.zi.setMatrixAt(i, _m);

      // jade halo: tilted ring precessing around the lantern
      const hs = sc * (1 + (1 - pop) * 0.8) * 1.02;
      _e.set(0.42 + Math.sin(time * 0.9 + b.phase) * 0.12, 0, 0.18);
      _q.setFromEuler(_e);
      _q2.setFromAxisAngle(_axisY, time * 0.8 + b.phase);
      _q.premultiply(_q2);
      _p.y -= 0.02;
      _s.setScalar(hs);
      _m.compose(_p, _q, _s);
      this.halo.setMatrixAt(i, _m);

      // ground decal (always there: marks the spot, plays the shockwave)
      _p.set(b.base.x, b.groundY + 0.045, b.base.z);
      _s.setScalar(DECAL_SIZE);
      _m.compose(_p, _q.identity(), _s);
      this.decal.setMatrixAt(i, _m);
      st[i * 3] = pop;
      st[i * 3 + 1] = this.burstAge[i];
      st[i * 3 + 2] = b.active ? this.appear[i] : 1;

      const cy = b.world.y + LANTERN_LIFT;
      for (let k = 0; k < FIREFLIES_PER_BOX; k++) {
        const o = (i * FIREFLIES_PER_BOX + k) * 4;
        fc[o] = b.world.x; fc[o + 1] = cy; fc[o + 2] = b.world.z; fc[o + 3] = pop * LANTERN_SCALE;
      }
    }
    this.silk.instanceMatrix.needsUpdate = true;
    this.frame.instanceMatrix.needsUpdate = true;
    this.zi.instanceMatrix.needsUpdate = true;
    this.halo.instanceMatrix.needsUpdate = true;
    this.decal.instanceMatrix.needsUpdate = true;
    this.decalState.needsUpdate = true;
    this.flyCenter.needsUpdate = true;
  }

  dispose(): void {
    this.object.removeFromParent();
    for (const m of [this.silk, this.frame, this.zi, this.halo, this.decal]) m.dispose();
    for (const g of this.geometries) g.dispose();
    for (const m of this.materials) m.dispose();
    for (const t of this.textures) t.dispose();
    this.object.clear();
  }
}
