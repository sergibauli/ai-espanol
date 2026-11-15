// Utilidades compartidas por todas las escenas. Todo es DETERMINISTA: nada de Math.random(), Date.now(),
// requestAnimationFrame, setTimeout, transiciones CSS ni animaciones CSS. Cada fotograma es función pura de t.
import * as THREE from "three";
export { THREE };
export const W = 1080, H = 1920, FPS = 30;

// Zona segura de Douyin: la interfaz tapa arriba, abajo y la columna derecha.
export const SAFE = { top: 230, bottom: 1480, left: 70, right: 930 };

export const PAL = {
  laca: "#c8102e", lacaOscura: "#8f0c21", lacaProfunda: "#4a0612",
  oro: "#f2c14e", oroViejo: "#c8961e", oroClaro: "#ffe9a8", oroBlanco: "#fff6d8",
  tinta: "#3b2416", noche: "#0b0f2a", nocheAzul: "#141a44", jade: "#2fb58a", papel: "#f1e3c2",
};
export const FONT = {
  latinDisplay: '"Cinzel Decorative", "Cinzel", serif',   // títulos en español (igual que la web)
  latin: '"Cinzel", serif',
  latinMod: '"Unbounded", sans-serif',                     // cifras y rótulos modernos
  zhBrush: '"Ma Shan Zheng", "Liu Jian Mao Cao", serif',   // caligrafía de pincel (titulares)
  zhCursive: '"Liu Jian Mao Cao", serif',                  // pincel cursivo (decorativo)
  zhSerif: '"Noto Serif SC", serif',                       // titulares serios 700/900
  zhSans: '"Noto Sans SC", sans-serif',                    // texto de apoyo 500/900
  zhDeco: '"ZCOOL XiaoWei", serif',
};

// --- matemáticas ---
export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, t) => a + (b - a) * t;
/** progreso 0..1 de t dentro de [a,b] (acotado) */
export const prog = (t, a, b) => clamp((t - a) / (b - a));
/** remap acotado */
export const remap = (t, a, b, c, d, ease = (x) => x) => lerp(c, d, ease(prog(t, a, b)));
export const ease = {
  linear: (x) => x,
  inQuad: (x) => x * x, outQuad: (x) => 1 - (1 - x) * (1 - x),
  inCubic: (x) => x * x * x, outCubic: (x) => 1 - Math.pow(1 - x, 3),
  inOutCubic: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
  outQuart: (x) => 1 - Math.pow(1 - x, 4), inQuart: (x) => x * x * x * x,
  outExpo: (x) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x)), inExpo: (x) => (x <= 0 ? 0 : Math.pow(2, 10 * x - 10)),
  inOutExpo: (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2),
  outBack: (x, s = 1.70158) => 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2),
  outElastic: (x) => (x <= 0 ? 0 : x >= 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1),
  outBounce: (x) => { const n = 7.5625, d = 2.75; if (x < 1 / d) return n * x * x; if (x < 2 / d) return n * (x -= 1.5 / d) * x + 0.75; if (x < 2.5 / d) return n * (x -= 2.25 / d) * x + 0.9375; return n * (x -= 2.625 / d) * x + 0.984375; },
};
/** muelle amortiguado analítico: 0→1 con rebote, t en segundos desde el inicio */
export const spring = (t, freq = 3.2, damp = 6) => (t <= 0 ? 0 : 1 - Math.exp(-damp * t) * Math.cos(freq * Math.PI * 2 * t * 0.5));
/** generador pseudoaleatorio con semilla (mulberry32) */
export function rng(seed = 1) { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
/** ruido suave 1D determinista (para temblores de cámara, flotaciones) */
export function noise1(x, seed = 0) { const i = Math.floor(x), f = x - i; const h = (n) => { const s = Math.sin(n * 127.1 + seed * 311.7) * 43758.5453; return s - Math.floor(s); }; const u = f * f * (3 - 2 * f); return lerp(h(i), h(i + 1), u) * 2 - 1; }

// --- recursos ---
export const asset = (p) => `./assets/${p}`;
export function loadImage(src) { return new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = () => rej(new Error("no carga " + src)); im.src = src; }); }
/** Asegura que una fuente está cargada para un texto (imprescindible antes de pintar texto en canvas/WebGL). */
export async function fontReady(cssFont, text) { await document.fonts.load(cssFont, text); }
export async function loadTexture(src) { const im = await loadImage(src); const tx = new THREE.Texture(im); tx.colorSpace = THREE.SRGBColorSpace; tx.anisotropy = 8; tx.needsUpdate = true; return tx; }

/** Secuencia de fotogramas de un clip (assets/seq/<name>/0001.jpg…). get(i) devuelve una Image decodificada. */
export const SEQ = { vuelo: { n: 396, w: 1280, h: 720 }, puerta: { n: 378, w: 1280, h: 720 }, puertav: { n: 160, w: 540, h: 960 }, puertav2: { n: 111, w: 540, h: 960 }, mascota: { n: 301, w: 480, h: 854 } };
export function sequence(name) {
  const meta = SEQ[name]; const cache = new Map();
  return {
    ...meta,
    /** fotograma para el segundo `sec` del clip (30 fps), acotado */
    async at(sec) { return this.get(Math.round(sec * 30)); },
    async get(i) {
      i = clamp(Math.round(i), 0, meta.n - 1);
      if (cache.has(i)) return cache.get(i);
      const im = await loadImage(asset(`seq/${name}/${String(i + 1).padStart(4, "0")}.jpg`));
      cache.set(i, im); if (cache.size > 12) cache.delete(cache.keys().next().value);
      return im;
    },
  };
}

// --- DOM ---
export function el(tag, style = {}, parent = null, html = "") { const e = document.createElement(tag); Object.assign(e.style, style); if (html) e.innerHTML = html; if (parent) parent.appendChild(e); return e; }
/** lienzo 2D a tamaño completo */
export function canvas2d(parent, w = W, h = H) { const c = el("canvas", { position: "absolute", left: 0, top: 0, width: w + "px", height: h + "px" }, parent); c.width = w; c.height = h; return [c, c.getContext("2d")]; }
/** parte un texto en <span> por carácter (para animar letra a letra); devuelve los spans */
export function splitChars(node, text, spanStyle = {}) { node.innerHTML = ""; return [...text].map((ch) => el("span", { display: "inline-block", whiteSpace: "pre", willChange: "transform", ...spanStyle }, node, ch === " " ? "&nbsp;" : ch)); }

// --- Three.js ---
/** Renderer WebGL a 1080×1920 dentro de `parent`. Llama a renderer.render(scene,camera) dentro de update(). */
export function makeThree(parent, { alpha = true, fov = 35, antialias = true } = {}) {
  const renderer = new THREE.WebGLRenderer({ antialias, alpha, preserveDrawingBuffer: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(1); renderer.setSize(W, H, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.1;
  Object.assign(renderer.domElement.style, { position: "absolute", left: 0, top: 0, width: W + "px", height: H + "px" });
  parent.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(fov, W / H, 0.1, 500); camera.position.set(0, 0, 10);
  return { renderer, scene, camera };
}
/** textura a partir de un lienzo 2D pintado por ti */
export function canvasTexture(w, h, paint) { const c = document.createElement("canvas"); c.width = w; c.height = h; paint(c.getContext("2d"), c); const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace; tx.anisotropy = 8; return tx; }
/** textura de punto de luz suave (para partículas aditivas) */
export function glowTexture(size = 128, color = "255,220,140") { return canvasTexture(size, size, (g) => { const r = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2); r.addColorStop(0, `rgba(${color},1)`); r.addColorStop(0.25, `rgba(${color},0.55)`); r.addColorStop(1, `rgba(${color},0)`); g.fillStyle = r; g.fillRect(0, 0, size, size); }); }
/** Móvil 3D: caja redondeada con marco dorado y una captura como pantalla. Devuelve un THREE.Group (alto ≈ 2·scale). */
export async function phoneMesh(screenSrc, { scale = 1, frame = 0x1a1210, rim = 0xf2c14e } = {}) {
  const g = new THREE.Group(); const w = 0.925 * scale, h = 2 * scale, d = 0.09 * scale, r = 0.12 * scale;
  const shape = new THREE.Shape(); const x = -w / 2, y = -h / 2;
  shape.moveTo(x + r, y); shape.lineTo(x + w - r, y); shape.quadraticCurveTo(x + w, y, x + w, y + r); shape.lineTo(x + w, y + h - r); shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h); shape.lineTo(x + r, y + h); shape.quadraticCurveTo(x, y + h, x, y + h - r); shape.lineTo(x, y + r); shape.quadraticCurveTo(x, y, x + r, y);
  const body = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: d, bevelEnabled: true, bevelSize: 0.012 * scale, bevelThickness: 0.012 * scale, bevelSegments: 4, curveSegments: 24 }), [new THREE.MeshStandardMaterial({ color: frame, metalness: 0.6, roughness: 0.35 }), new THREE.MeshStandardMaterial({ color: rim, metalness: 1, roughness: 0.25 })]);
  body.position.z = -d; g.add(body);
  const tx = await loadTexture(screenSrc); const m = 0.035 * scale;
  const sw = w - m * 2, sh = h - m * 2; const sShape = new THREE.Shape(); const rr = r - m * 0.6, sx = -sw / 2, sy = -sh / 2;
  sShape.moveTo(sx + rr, sy); sShape.lineTo(sx + sw - rr, sy); sShape.quadraticCurveTo(sx + sw, sy, sx + sw, sy + rr); sShape.lineTo(sx + sw, sy + sh - rr); sShape.quadraticCurveTo(sx + sw, sy + sh, sx + sw - rr, sy + sh); sShape.lineTo(sx + rr, sy + sh); sShape.quadraticCurveTo(sx, sy + sh, sx, sy + sh - rr); sShape.lineTo(sx, sy + rr); sShape.quadraticCurveTo(sx, sy, sx + rr, sy);
  const geo = new THREE.ShapeGeometry(sShape, 24); const pos = geo.attributes.position, uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) - sx) / sw, (pos.getY(i) - sy) / sh);
  const screen = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: tx, toneMapped: false })); screen.position.z = 0.014 * scale; g.add(screen);
  g.userData.screen = screen; return g;
}
