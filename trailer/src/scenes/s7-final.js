// s7-final · GRAN FINAL (8 s). Un único dragón chino dorado 3D procedural (Three.js) + tarjeta final con llamada a la acción.
// Todo es función pura de t: el dragón recorre una vía fija (curva) como un tren; partículas = f(semilla, t).
const TAU = Math.PI * 2;
const sm = (x) => { x = Math.min(1, Math.max(0, x)); return x * x * (3 - 2 * x); };
const fract = (x) => x - Math.floor(x);

/** interpolación cúbica monótona (PCHIP) por claves [x, y] */
function pchip(keys) {
  const n = keys.length, xs = keys.map((k) => k[0]), ys = keys.map((k) => k[1]), d = [], m = new Array(n);
  for (let i = 0; i < n - 1; i++) d[i] = (ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i]);
  m[0] = d[0]; m[n - 1] = d[n - 2];
  for (let i = 1; i < n - 1; i++) m[i] = d[i - 1] * d[i] <= 0 ? 0 : (2 * d[i - 1] * d[i]) / (d[i - 1] + d[i]);
  return (x) => {
    if (x <= xs[0]) return ys[0] + m[0] * (x - xs[0]);
    if (x >= xs[n - 1]) return ys[n - 1] + m[n - 1] * (x - xs[n - 1]);
    let i = 0; while (x > xs[i + 1]) i++;
    const h = xs[i + 1] - xs[i], u = (x - xs[i]) / h, u2 = u * u, u3 = u2 * u;
    return (2 * u3 - 3 * u2 + 1) * ys[i] + (u3 - 2 * u2 + u) * h * m[i] + (-2 * u3 + 3 * u2) * ys[i + 1] + (u3 - u2) * h * m[i + 1];
  };
}
const cr = (p0, p1, p2, p3, u) => 0.5 * (2 * p1 + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u * u + (-p0 + 3 * p1 - 3 * p2 + p3) * u * u * u);

// ───────────────────────── vía del dragón ─────────────────────────
const RX = 2.0, RY = 1.12, TH_F = 50, RING_TURNS = 2;        // elipse del anillo final, ángulo final de la cabeza
function ringPoint(deg, out) {
  const th = (deg * Math.PI) / 180, tb = Math.max(-0.12, (TH_F - deg) / 360), k = 1 + 0.1 * tb, e = sm((deg - (TH_F - 85)) / 85);
  return out.set(RX * k * Math.cos(th) - 0.25 * e, RY * k * Math.sin(th) + 0.3 * e, 0.9 * Math.sin(th) - 0.75 * tb + 0.75 * e);
}
function buildTrack(THREE) {
  const P = [], idx = {}; const add = (x, y, z, name) => { if (name) idx[name] = P.length; P.push(new THREE.Vector3(x, y, z)); };
  add(4, 9, -130); add(-8, 6, -108); add(8, 5, -88); add(-7, 4, -62); add(6.6, 4.6, -47); add(5.6, 3.1, -34);
  add(-1.6, 2.7, -25, "start"); add(-5, 1.5, -14); add(3.8, 0.5, -4); add(-2.4, -0.7, 4.5); add(-0.2, -1.1, 9.8);
  add(0.55, -0.55, 13.1, "near");
  add(-0.9, 0.5, 13.0); add(-3.2, 1.0, 9.5); add(-4.0, -1.4, 4); add(-2.6, -4.8, -0.5); add(0.6, -5.6, -2.6);
  for (let a = -55; a <= 240; a += 30) { const r = 2.7 - 0.2 * ((a + 55) / 295), y = -5.3 + 3.6 * ((a + 55) / 295); add(r * Math.cos((a * Math.PI) / 180), y, r * Math.sin((a * Math.PI) / 180)); }
  const th0 = TH_F - 360 * RING_TURNS - 140, v = new THREE.Vector3();
  for (let deg = th0; deg <= TH_F + 61; deg += 15) { ringPoint(deg, v); add(v.x, v.y, v.z, deg === th0 ? "ring" : null); }
  const curve = new THREE.CatmullRomCurve3(P, false, "centripetal");
  const M = 9000, pts = new Float32Array(3 * (M + 1)), cum = new Float32Array(M + 1); let prev = null;
  for (let i = 0; i <= M; i++) { curve.getPoint(i / M, v); pts.set([v.x, v.y, v.z], i * 3); cum[i] = i ? cum[i - 1] + v.distanceTo(prev) : 0; prev = prev || new THREE.Vector3(); prev.copy(v); }
  const total = cum[M];
  const arcAtCtrl = (ci) => { const f = (ci / (P.length - 1)) * M, i = Math.min(M - 1, Math.floor(f)); return cum[i] + (cum[i + 1] - cum[i]) * (f - i); };
  const posAt = (d, out) => {
    d = Math.min(total - 1e-4, Math.max(0, d)); let lo = 0, hi = M;
    while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (cum[mid] <= d) lo = mid; else hi = mid; }
    const u = (d - cum[lo]) / Math.max(1e-9, cum[hi] - cum[lo]), a = lo * 3, b = hi * 3;
    return out.set(pts[a] + (pts[b] - pts[a]) * u, pts[a + 1] + (pts[b + 1] - pts[a + 1]) * u, pts[a + 2] + (pts[b + 2] - pts[a + 2]) * u);
  };
  const ringArc = (deg) => arcAtCtrl(idx.ring + (deg - th0) / 15);
  return { idx, arcAtCtrl, posAt, ringArc, th0, total };
}

// ───────────────────────── geometría auxiliar ─────────────────────────
function allocTube(THREE, n, rad) {
  const g = new THREE.BufferGeometry(), nv = n * (rad + 1), index = [];
  g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(nv * 3), 3));
  g.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(nv * 3), 3));
  g.setAttribute("uv", new THREE.BufferAttribute(new Float32Array(nv * 2), 2));
  for (let i = 0; i < n - 1; i++) for (let j = 0; j < rad; j++) { const a = i * (rad + 1) + j, b = a + rad + 1; index.push(a, a + 1, b, b, a + 1, b + 1); }
  g.setIndex(index); g.userData = { n, rad }; return g;
}
/** rellena un tubo: centros C[i], marcos N[i], S[i], radio rf(i), u = uf(i). Ángulo 0 = dorsal (N). */
function fillTube(g, C, N, S, rf, uf, squash = 1) {
  const { n, rad } = g.userData, p = g.attributes.position.array, nn = g.attributes.normal.array, uv = g.attributes.uv.array; let k = 0, q = 0;
  for (let i = 0; i < n; i++) {
    const c = C[i], N1 = N[i], S1 = S[i], r = rf(i), u = uf ? uf(i) : i / (n - 1);
    for (let j = 0; j <= rad; j++) {
      const a = (j / rad) * TAU, ca = Math.cos(a), sa = Math.sin(a) * squash;
      const nx = N1.x * ca + S1.x * sa, ny = N1.y * ca + S1.y * sa, nz = N1.z * ca + S1.z * sa;
      p[k] = c.x + nx * r; p[k + 1] = c.y + ny * r; p[k + 2] = c.z + nz * r; nn[k] = nx; nn[k + 1] = ny; nn[k + 2] = nz; k += 3;
      uv[q++] = u; uv[q++] = j / rad;
    }
  }
  g.attributes.position.needsUpdate = true; g.attributes.normal.needsUpdate = true; g.attributes.uv.needsUpdate = true;
}
/** marcos por transporte (proyección sucesiva) a lo largo de una polilínea */
function frames(THREE, C, up, N, S, T) {
  const n = C.length, t = new THREE.Vector3(), nrm = new THREE.Vector3().copy(up);
  for (let i = 0; i < n; i++) {
    t.subVectors(C[Math.max(0, i - 1)], C[Math.min(n - 1, i + 1)]); if (t.lengthSq() < 1e-12) t.set(0, 0, 1); t.normalize();
    nrm.addScaledVector(t, -nrm.dot(t)); if (nrm.lengthSq() < 1e-10) nrm.set(t.y, -t.x, 0.01); nrm.normalize();
    N[i].copy(nrm); S[i].crossVectors(nrm, t).normalize(); if (T) T[i].copy(t);
  }
}
const vecs = (THREE, n) => Array.from({ length: n }, () => new THREE.Vector3());
/** tubo estático afilado por puntos de control (cuernos, lengua, patas, garras) */
function taperTube(THREE, ctrl, r0, r1, seg = 18, rad = 8, pow = 1) {
  const curve = new THREE.CatmullRomCurve3(ctrl.map((c) => new THREE.Vector3(...c)), false, "centripetal");
  const C = vecs(THREE, seg + 1), N = vecs(THREE, seg + 1), S = vecs(THREE, seg + 1); for (let i = 0; i <= seg; i++) curve.getPoint(i / seg, C[i]);
  for (const c of C) c.negate(); frames(THREE, C, new THREE.Vector3(0.3, 1, 0.2), N, S); for (const c of C) c.negate();
  const g = allocTube(THREE, seg + 1, rad); fillTube(g, C, N, S, (i) => r0 + (r1 - r0) * Math.pow(i / seg, pow)); return g;
}
/** piel por secciones: [z, ancho, altoArriba, altoAbajo, yCentro]; sección superelíptica */
function loft(THREE, secs, nz = 44, nr = 28, ex = 0.8) {
  const pos = [], uv = [], index = [], ns = secs.length; const S = (i) => secs[Math.min(ns - 1, Math.max(0, i))];
  for (let i = 0; i <= nz; i++) {
    const f = (i / nz) * (ns - 1), k = Math.min(ns - 2, Math.floor(f)), u = f - k, v = [0, 1, 2, 3, 4].map((c) => cr(S(k - 1)[c], S(k)[c], S(k + 1)[c], S(k + 2)[c], u));
    const w = Math.max(0.002, v[1]), ht = Math.max(0.002, v[2]), hb = Math.max(0.002, v[3]);
    for (let j = 0; j <= nr; j++) {
      const a = -Math.PI / 2 + (j / nr) * TAU, c = Math.cos(a), s = Math.sin(a);
      pos.push(w * Math.sign(c) * Math.pow(Math.abs(c), ex), v[4] + (s > 0 ? ht : hb) * Math.sign(s) * Math.pow(Math.abs(s), ex), v[0]); uv.push(i / nz, j / nr);
    }
  }
  for (let i = 0; i < nz; i++) for (let j = 0; j < nr; j++) { const a = i * (nr + 1) + j, b = a + nr + 1; index.push(a, b, a + 1, b, b + 1, a + 1); }
  const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(index); g.computeVertexNormals();
  // cose la costura (inferior) para que no se vea
  const nn = g.attributes.normal; for (let i = 0; i <= nz; i++) { const a = i * (nr + 1), b = a + nr; const x = nn.getX(a) + nn.getX(b), y = nn.getY(a) + nn.getY(b), z = nn.getZ(a) + nn.getZ(b), l = Math.hypot(x, y, z) || 1; nn.setXYZ(a, x / l, y / l, z / l); nn.setXYZ(b, x / l, y / l, z / l); }
  return g;
}

// ───────────────────────── texturas procedurales ─────────────────────────
function scaleMaps(THREE) {
  const Wd = 512, Hd = 1024, NU = 4, NV = 16, cu = Wd / NU, cv = Hd / NV;
  const hc = document.createElement("canvas"); hc.width = Wd; hc.height = Hd; const g = hc.getContext("2d"); g.fillStyle = "#000"; g.fillRect(0, 0, Wd, Hd);
  for (let iu = NU + 1; iu >= -2; iu--) for (let iv = -1; iv <= NV; iv++) {            // de cola a cabeza: la escama de delante monta sobre la de atrás
    const x = iu * cu, y = (iv + (iu & 1 ? 0.5 : 0)) * cv + cv / 2, rx = cu * 1.12, ry = cv * 0.56;
    const gr = g.createLinearGradient(x - rx * 0.15, 0, x + rx, 0); gr.addColorStop(0, "#1c1c1c"); gr.addColorStop(0.55, "#8a8a8a"); gr.addColorStop(0.9, "#ffffff"); gr.addColorStop(1, "#9a9a9a");
    g.fillStyle = gr; g.beginPath(); g.moveTo(x - rx * 0.2, y - ry); g.quadraticCurveTo(x + rx * 0.75, y - ry, x + rx, y); g.quadraticCurveTo(x + rx * 0.75, y + ry, x - rx * 0.2, y + ry); g.closePath(); g.fill();
    g.strokeStyle = "rgba(0,0,0,0.9)"; g.lineWidth = 3; g.stroke();
    g.strokeStyle = "rgba(255,255,255,0.35)"; g.lineWidth = 2; g.beginPath(); g.moveTo(x + rx * 0.05, y); g.lineTo(x + rx * 0.8, y); g.stroke();   // quilla
  }
  // vientre: placas transversales (v centrado en 0.5)
  const b0 = Hd * 0.365, b1 = Hd * 0.635;
  for (let iu = 0; iu < NU; iu++) { const x = iu * cu; const gr = g.createLinearGradient(x, 0, x + cu, 0); gr.addColorStop(0, "#202020"); gr.addColorStop(0.12, "#b0b0b0"); gr.addColorStop(0.8, "#f4f4f4"); gr.addColorStop(1, "#555"); g.fillStyle = gr; g.beginPath(); g.roundRect(x + 2, b0, cu - 2, b1 - b0, 26); g.fill(); }
  const hd = g.getImageData(0, 0, Wd, Hd).data, H = (x, y) => hd[(((y + Hd) % Hd) * Wd + ((x + Wd) % Wd)) * 4] / 255;
  const nc = document.createElement("canvas"); nc.width = Wd; nc.height = Hd; const ng = nc.getContext("2d"), nd = ng.createImageData(Wd, Hd);
  const cc = document.createElement("canvas"); cc.width = Wd; cc.height = Hd; const cg = cc.getContext("2d"), cd = cg.createImageData(Wd, Hd);
  const mix = (a, b, u) => a + (b - a) * u;
  for (let y = 0; y < Hd; y++) for (let x = 0; x < Wd; x++) {
    const i = (y * Wd + x) * 4, dx = (H(x + 2, y) - H(x - 2, y)) * 2.6, dy = (H(x, y + 2) - H(x, y - 2)) * 2.6, l = Math.hypot(dx, dy, 1);
    nd.data[i] = (-dx / l * 0.5 + 0.5) * 255; nd.data[i + 1] = (dy / l * 0.5 + 0.5) * 255; nd.data[i + 2] = (1 / l * 0.5 + 0.5) * 255; nd.data[i + 3] = 255;
    const h = H(x, y), vv = y / Hd, belly = sm((0.15 - Math.abs(vv - 0.5)) / 0.035), dors = sm((0.09 - Math.min(vv, 1 - vv)) / 0.09);
    let r = mix(150, 255, h), gg = mix(78, 196, h), b = mix(8, 58, h);                                   // oro: valle ámbar oscuro → cresta oro claro
    r = mix(r, mix(190, 255, h), dors * 0.5); gg = mix(gg, mix(60, 150, h), dors * 0.5); b = mix(b, 20, dors * 0.5);  // lomo algo más rojizo
    r = mix(r, mix(205, 255, h), belly); gg = mix(gg, mix(150, 238, h), belly); b = mix(b, mix(70, 176, h), belly);   // vientre marfil dorado
    cd.data[i] = r; cd.data[i + 1] = gg; cd.data[i + 2] = b; cd.data[i + 3] = 255;
  }
  ng.putImageData(nd, 0, 0); cg.putImageData(cd, 0, 0);
  const mk = (c, srgb) => { const tx = new THREE.CanvasTexture(c); tx.wrapS = tx.wrapT = THREE.RepeatWrapping; tx.anisotropy = 8; if (srgb) tx.colorSpace = THREE.SRGBColorSpace; return tx; };
  return { map: mk(cc, true), normal: mk(nc, false) };
}
function envTexture(THREE, renderer) {
  const c = document.createElement("canvas"); c.width = 1024; c.height = 512; const g = c.getContext("2d");
  const gr = g.createLinearGradient(0, 0, 0, 512); gr.addColorStop(0, "#27358f"); gr.addColorStop(0.3, "#141a44"); gr.addColorStop(0.46, "#7a3a20"); gr.addColorStop(0.53, "#ffd98a"); gr.addColorStop(0.6, "#a8401c"); gr.addColorStop(0.8, "#3a0a10"); gr.addColorStop(1, "#12060c");
  g.fillStyle = gr; g.fillRect(0, 0, 1024, 512);
  const spot = (x, y, r, col, a = 1) => { for (const ox of [-1024, 0, 1024]) { const q = g.createRadialGradient(x + ox, y, 0, x + ox, y, r); q.addColorStop(0, `rgba(${col},${a})`); q.addColorStop(0.35, `rgba(${col},${a * 0.6})`); q.addColorStop(1, `rgba(${col},0)`); g.fillStyle = q; g.fillRect(x + ox - r, y - r, r * 2, r * 2); } };
  g.globalCompositeOperation = "lighter";
  spot(256, 150, 190, "255,244,210", 1); spot(256, 150, 70, "255,255,255", 1);      // luna/clave (detrás de cámara-arriba)
  spot(760, 120, 200, "255,214,130", 0.9); spot(520, 60, 170, "120,150,255", 0.7);   // contraluz dorado y relleno azul
  spot(90, 330, 130, "255,70,40", 0.6); spot(640, 350, 150, "255,120,40", 0.55); spot(900, 250, 90, "255,236,170", 0.9);
  const tx = new THREE.CanvasTexture(c); tx.mapping = THREE.EquirectangularReflectionMapping; tx.colorSpace = THREE.SRGBColorSpace;
  const pm = new THREE.PMREMGenerator(renderer), env = pm.fromEquirectangular(tx).texture; pm.dispose(); tx.dispose(); return env;
}
function paintCloud(g, w, h, r) {
  const n = 7 + Math.floor(r() * 4), puffs = []; const base = h * 0.66;
  for (let i = 0; i < n; i++) { const u = (i + 0.5) / n, edge = Math.sin(u * Math.PI); puffs.push({ x: w * (0.1 + 0.8 * u) + (r() - 0.5) * 20, y: base - edge * h * (0.12 + r() * 0.2), r: h * (0.13 + 0.17 * edge + r() * 0.05) }); }
  g.fillStyle = "#ffe6a6"; for (const p of puffs) { g.beginPath(); g.arc(p.x, p.y, p.r + 5, 0, TAU); g.fill(); }
  g.fillRect(w * 0.1, base - 5, w * 0.8, h * 0.2);
  const gr = g.createLinearGradient(0, h * 0.12, 0, h * 0.95); gr.addColorStop(0, "#fff4d8"); gr.addColorStop(0.35, "#f1c9a4"); gr.addColorStop(0.62, "#b06a86"); gr.addColorStop(1, "#3a2f78");
  g.fillStyle = gr; for (const p of puffs) { g.beginPath(); g.arc(p.x, p.y, p.r, 0, TAU); g.fill(); } g.fillRect(w * 0.1, base, w * 0.8, h * 0.2);
  g.strokeStyle = "rgba(200,150,30,0.85)"; g.lineWidth = 4; g.lineCap = "round";
  for (let i = 1; i < n; i += 2) { const p = puffs[i], dir = i % 4 === 1 ? 1 : -1; g.beginPath(); for (let a = 0; a < 4.6; a += 0.15) { const rr = p.r * (0.72 - a * 0.12), x = p.x + Math.cos(-1.2 + a * dir) * rr * dir * -1, y = p.y + Math.sin(-1.2 + a * dir) * rr; a === 0 ? g.moveTo(x, y) : g.lineTo(x, y); } g.stroke(); }
  g.globalCompositeOperation = "destination-out"; const fd = g.createLinearGradient(0, h * 0.6, 0, h * 0.97); fd.addColorStop(0, "rgba(0,0,0,0)"); fd.addColorStop(1, "rgba(0,0,0,1)"); g.fillStyle = fd; g.fillRect(0, h * 0.6, w, h * 0.4);
  const fx = g.createLinearGradient(0, 0, w, 0); fx.addColorStop(0, "rgba(0,0,0,1)"); fx.addColorStop(0.1, "rgba(0,0,0,0)"); fx.addColorStop(0.9, "rgba(0,0,0,0)"); fx.addColorStop(1, "rgba(0,0,0,1)"); g.fillStyle = fx; g.fillRect(0, 0, w, h);
  g.globalCompositeOperation = "source-over";
}
function paintLantern(g, w, h) {
  const cx = w / 2; g.beginPath(); g.moveTo(cx - w * 0.3, h * 0.2); g.bezierCurveTo(cx - w * 0.44, h * 0.02, cx + w * 0.44, h * 0.02, cx + w * 0.3, h * 0.2); g.bezierCurveTo(cx + w * 0.42, h * 0.5, cx + w * 0.3, h * 0.75, cx + w * 0.2, h * 0.86); g.lineTo(cx - w * 0.2, h * 0.86); g.bezierCurveTo(cx - w * 0.3, h * 0.75, cx - w * 0.42, h * 0.5, cx - w * 0.3, h * 0.2); g.closePath();
  const q = g.createRadialGradient(cx, h * 0.8, 4, cx, h * 0.55, h * 0.62); q.addColorStop(0, "#fff8cf"); q.addColorStop(0.25, "#ffc85a"); q.addColorStop(0.6, "#ee4a2a"); q.addColorStop(1, "#8c1220"); g.fillStyle = q; g.fill();
  g.save(); g.clip(); g.strokeStyle = "rgba(120,10,20,0.35)"; g.lineWidth = 3; for (let i = -2; i <= 2; i++) { g.beginPath(); g.moveTo(cx + i * w * 0.14, h * 0.05); g.quadraticCurveTo(cx + i * w * 0.2, h * 0.5, cx + i * w * 0.09, h * 0.88); g.stroke(); } g.restore();
  g.fillStyle = "#f2c14e"; g.fillRect(cx - w * 0.21, h * 0.85, w * 0.42, h * 0.035); g.fillStyle = "#c8961e"; g.fillRect(cx - w * 0.05, h * 0.885, w * 0.1, h * 0.05);
}

// ───────────────────────── texto dorado 2D ─────────────────────────
function goldSprite(text, font, px, { pad = 0.45, track = 0, dark = "#3a0409", grad = null } = {}) {
  const c = document.createElement("canvas"); let g = c.getContext("2d"); g.font = font.replace("%", px);
  const chars = [...text], ws = chars.map((ch) => g.measureText(ch).width), tw = track ? ws.reduce((a, b) => a + b + track, -track) : g.measureText(text).width, P = Math.ceil(px * pad);
  c.width = Math.ceil(tw + P * 2); c.height = Math.ceil(px * 1.3 + P * 2); g = c.getContext("2d"); g.font = font.replace("%", px); g.textBaseline = "alphabetic"; g.lineJoin = "round";
  const by = P + px * 1.02; const draw = (fn) => { if (!track) return fn(text, P, by); let x = P; chars.forEach((ch, i) => { fn(ch, x, by); x += ws[i] + track; }); };
  g.save(); g.shadowColor = "rgba(0,0,0,0.85)"; g.shadowBlur = px * 0.22; g.shadowOffsetY = px * 0.07; g.strokeStyle = "#16020a"; g.lineWidth = px * 0.17; draw((s, x, y) => g.strokeText(s, x, y)); g.restore();
  g.strokeStyle = dark; g.lineWidth = px * 0.12; draw((s, x, y) => g.strokeText(s, x, y));
  g.strokeStyle = "#e0a52a"; g.lineWidth = px * 0.035; draw((s, x, y) => g.strokeText(s, x, y));
  const gr = g.createLinearGradient(0, by - px * 0.92, 0, by + px * 0.12);
  for (const [o, col] of grad || [[0, "#fffdf0"], [0.3, "#ffe89c"], [0.52, "#f6c64f"], [0.56, "#c98a16"], [0.78, "#f2c14e"], [1, "#fff3bf"]]) gr.addColorStop(o, col);
  g.fillStyle = gr; draw((s, x, y) => g.fillText(s, x, y));
  g.save(); g.globalCompositeOperation = "source-atop"; g.strokeStyle = "rgba(255,255,255,0.55)"; g.lineWidth = px * 0.018; g.translate(0, -px * 0.012); draw((s, x, y) => g.strokeText(s, x, y)); g.restore();
  return c;
}
function whiteOf(c) { const o = document.createElement("canvas"); o.width = c.width; o.height = c.height; const g = o.getContext("2d"); g.drawImage(c, 0, 0); g.globalCompositeOperation = "source-in"; g.fillStyle = "#fffbe8"; g.fillRect(0, 0, o.width, o.height); return o; }

export default {
  async setup(root, kit) {
    const { THREE, PAL, FONT, W, H } = kit; const R = kit.rng(77); this.kit = kit;
    // ── capas: cielo 2D · WebGL (dragón, logo, nubes) · rótulos 2D
    [this.bgC, this.bg] = kit.canvas2d(root);
    const three = (this.three = kit.makeThree(root, { alpha: true, fov: 35 })); const { scene, renderer, camera } = three;
    renderer.setClearColor(0x000000, 0); renderer.toneMappingExposure = 1.05; camera.near = 0.05; camera.far = 400; camera.updateProjectionMatrix();
    [this.fgC, this.fg] = kit.canvas2d(root);
    this.tmp = document.createElement("canvas"); this.tmp.width = 1400; this.tmp.height = 420; this.tg = this.tmp.getContext("2d");

    // ── cielo estático
    const sky = (this.sky = document.createElement("canvas")); sky.width = W; sky.height = H; const sg = sky.getContext("2d");
    const gr = sg.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, "#05071c"); gr.addColorStop(0.3, "#0b0f2a"); gr.addColorStop(0.58, "#1a1650"); gr.addColorStop(0.8, "#4a1338"); gr.addColorStop(1, "#8f0c21");
    sg.fillStyle = gr; sg.fillRect(0, 0, W, H);
    const blob = (x, y, r, col) => { const q = sg.createRadialGradient(x, y, 0, x, y, r); q.addColorStop(0, col); q.addColorStop(1, "rgba(0,0,0,0)"); sg.fillStyle = q; sg.fillRect(x - r, y - r, r * 2, r * 2); };
    sg.globalCompositeOperation = "lighter"; blob(200, 700, 700, "rgba(40,50,150,0.35)"); blob(900, 1100, 800, "rgba(120,20,70,0.3)"); blob(540, 1900, 900, "rgba(242,120,40,0.28)");
    this.stars = []; for (let i = 0; i < 260; i++) { const s = { x: R() * W, y: R() * H * 0.9, r: 0.6 + R() * R() * 2.4, p: R() * TAU, f: 1 + R() * 3, a: 0.35 + R() * 0.65 }; this.stars.push(s); if (i >= 60) { sg.fillStyle = `rgba(255,${230 + R() * 25 | 0},${190 + R() * 60 | 0},${s.a * 0.8})`; sg.beginPath(); sg.arc(s.x, s.y, s.r * 0.8, 0, TAU); sg.fill(); } }
    this.stars.length = 60;

    // ── luces y entorno
    scene.environment = envTexture(THREE, renderer);
    const key = new THREE.DirectionalLight(0xfff0d0, 2.6); key.position.set(-4, 7, 9); scene.add(key);
    const rim = new THREE.DirectionalLight(0x8fa8ff, 1.6); rim.position.set(5, 2, -8); scene.add(rim);
    const fill = new THREE.DirectionalLight(0xff7a3a, 1.2); fill.position.set(2, -6, 4); scene.add(fill);
    scene.add(new THREE.AmbientLight(0xffe2b0, 0.5));
    const glowTx = (this.glowTx = kit.glowTexture(128, "255,214,120")), glowW = kit.glowTexture(128, "255,246,216");

    // ── luna dorada lejana (detrás del logo en el encuadre final)
    const moon = (this.moon = new THREE.Group()); moon.position.set(0.1, 1.05, -30); scene.add(moon);
    const moonTx = kit.canvasTexture(512, 512, (g) => {
      const q = g.createRadialGradient(215, 200, 10, 256, 256, 250); q.addColorStop(0, "#fffbe6"); q.addColorStop(0.45, "#ffe9a8"); q.addColorStop(0.8, "#f2c14e"); q.addColorStop(0.97, "#d9952a"); q.addColorStop(1, "rgba(217,149,42,0)"); g.fillStyle = q; g.beginPath(); g.arc(256, 256, 252, 0, TAU); g.fill();
      const r2 = kit.rng(5); g.globalCompositeOperation = "source-atop"; for (let i = 0; i < 26; i++) { const x = 60 + r2() * 390, y = 60 + r2() * 390, rr = 14 + r2() * 46; const c = g.createRadialGradient(x, y, 0, x, y, rr); c.addColorStop(0, "rgba(200,140,40,0.2)"); c.addColorStop(1, "rgba(200,140,40,0)"); g.fillStyle = c; g.fillRect(x - rr, y - rr, rr * 2, rr * 2); }
    });
    moon.add(new THREE.Mesh(new THREE.PlaneGeometry(7.8, 7.8), new THREE.MeshBasicMaterial({ map: moonTx, transparent: true, depthWrite: false, toneMapped: false })));
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTx, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.75, toneMapped: false })); halo.scale.setScalar(26); halo.position.z = -0.5; moon.add(halo);
    const raysTx = kit.canvasTexture(512, 512, (g) => { g.translate(256, 256); const r2 = kit.rng(9); for (let i = 0; i < 40; i++) { const a = (i / 40) * TAU + r2() * 0.08, wd = 0.02 + r2() * 0.05, L = 150 + r2() * 105; const q = g.createLinearGradient(0, 0, Math.cos(a) * L, Math.sin(a) * L); q.addColorStop(0, "rgba(255,225,150,0.9)"); q.addColorStop(1, "rgba(255,225,150,0)"); g.fillStyle = q; g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.cos(a - wd) * L, Math.sin(a - wd) * L); g.lineTo(Math.cos(a + wd) * L, Math.sin(a + wd) * L); g.fill(); } });
    this.moonRays = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.MeshBasicMaterial({ map: raysTx, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.3, toneMapped: false })); this.moonRays.position.z = -0.3; moon.add(this.moonRays);

    // ── nubes auspiciosas (3 variantes) en profundidad
    const cloudTx = [0, 1, 2].map((i) => kit.canvasTexture(768, 320, (g) => paintCloud(g, 768, 320, kit.rng(31 + i * 7))));
    this.clouds = []; const addCloud = (x, y, z, s, kind, o = 1) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1), new THREE.MeshBasicMaterial({ map: cloudTx[this.clouds.length % 3], transparent: true, depthWrite: false, opacity: o, toneMapped: false })); m.scale.set(s * (R() < 0.5 ? -1 : 1), s, 1); m.userData = { x, y, z, kind, ph: R() * TAU, o }; scene.add(m); this.clouds.push(m); };
    for (let i = 0; i < 26; i++) { const side = i % 2 ? 1 : -1, z = -34 + i * 1.9; addCloud(side * (3.2 + R() * 5.5), -5 + R() * 11, z, 3 + R() * 3.5, "fly"); }       // pasillo de vuelo
    for (let i = 0; i < 9; i++) addCloud(-9 + i * 2.3 + R(), -7.6 - R() * 1.1 + (i % 2) * 0.5, 1.5 + (i % 3) * 1.6, 3.4 + R() * 1.6, "bank");                              // banco inferior de la tarjeta
    for (let i = 0; i < 8; i++) addCloud((i % 2 ? 1 : -1) * (7.5 + R() * 6), -7 + i * 2.6 + R() * 2, -22 - R() * 5, 5 + R() * 4, "far", 0.75);                             // lejanas junto a la luna
    addCloud(-4.3, 3.1, -3, 2.6, "far", 0.9); addCloud(4.6, -3.2, -4, 2.8, "far", 0.9); addCloud(-4.8, -3.6, -5, 3, "far", 0.85);

    // ── linternas celestes
    const lanTx = kit.canvasTexture(160, 220, (g) => paintLantern(g, 160, 220)); this.lanterns = [];
    for (let i = 0; i < 11; i++) { const g = new THREE.Group(), side = i % 2 ? 1 : -1, z = -6 - R() * 18, sc = 0.9 + R() * 0.7;
      const gl = new THREE.Sprite(new THREE.SpriteMaterial({ map: kit.glowTexture(96, "255,120,50"), blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.7, toneMapped: false })); gl.scale.setScalar(3.4); g.add(gl);
      g.add(new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1.1), new THREE.MeshBasicMaterial({ map: lanTx, transparent: true, depthWrite: false, toneMapped: false })));
      g.scale.setScalar(sc); g.userData = { x: side * (3.4 + R() * 4.5) * (1 + -z / 30), y: -9 + R() * 15, z, ph: R() * TAU, v: 0.18 + R() * 0.2, gl }; scene.add(g); this.lanterns.push(g); }

    // ── DRAGÓN ─────────────────────────────────────────────
    const track = (this.track = buildTrack(THREE)); const L = (this.L = 13.2), NR = (this.NR = 300), RAD = 20; this.R0 = 0.27; this.HS = 1.22;
    const ra = track.ringArc;
    this.dHead = pchip([[0, track.arcAtCtrl(track.idx.start)], [1.5, track.arcAtCtrl(track.idx.near)], [2.25, track.arcAtCtrl(track.idx.near + 5.2)], [3.0, ra(track.th0 + 15)], [4.0, ra(TH_F - 400)], [5.0, ra(TH_F - 150)], [6.0, ra(TH_F - 22)], [7.0, ra(TH_F - 9)], [8.0, ra(TH_F)]]);
    const maps = scaleMaps(THREE); maps.map.repeat.set(1, 1); const dragon = (this.dragon = new THREE.Group()); scene.add(dragon);
    const gold = (o = {}) => new THREE.MeshStandardMaterial({ color: 0xffb637, metalness: 0.92, roughness: 0.3, envMapIntensity: 1.25, ...o });
    this.bodyGeo = allocTube(THREE, NR + 1, RAD);
    const bodyMat = new THREE.MeshStandardMaterial({ map: maps.map, normalMap: maps.normal, normalScale: new THREE.Vector2(1.5, 1.5), metalness: 0.9, roughness: 0.27, envMapIntensity: 1.35, emissive: 0x4a2400, emissiveIntensity: 0.35 });
    const body = new THREE.Mesh(this.bodyGeo, bodyMat); body.frustumCulled = false; dragon.add(body);
    this.C = vecs(THREE, NR + 1); this.C2 = vecs(THREE, NR + 1); this.fN = vecs(THREE, NR + 1); this.fS = vecs(THREE, NR + 1); this.fT = vecs(THREE, NR + 1);
    this.rBody = (i) => { const s = i / NR; return this.R0 * (0.72 + 0.28 * sm(s / 0.06)) * (s < 0.5 ? 1 : Math.pow(1 - (s - 0.5) / 0.5, 0.62) * 0.98 + 0.02) * (1 + 0.05 * Math.sin(s * 40)); };

    // cresta dorsal (instancias)
    const fin = new THREE.ConeGeometry(0.5, 1, 5, 3); fin.translate(0, 0.5, 0); { const p = fin.attributes.position, col = []; for (let i = 0; i < p.count; i++) { const y = p.getY(i); p.setZ(i, p.getZ(i) - y * y * 0.55); col.push(0.78 + 0.22 * y, 0.05 + 0.75 * y * y, 0.1 * (1 - y) + 0.2 * y * y); } fin.setAttribute("color", new THREE.Float32BufferAttribute(col, 3)); fin.computeVertexNormals(); }
    this.NF = 120; this.fins = new THREE.InstancedMesh(fin, new THREE.MeshStandardMaterial({ vertexColors: true, metalness: 0.55, roughness: 0.35, emissive: 0x7a1408, emissiveIntensity: 0.55, envMapIntensity: 1.1 }), this.NF); this.fins.frustumCulled = false; dragon.add(this.fins);

    // cintas: melena, barba, penacho de cola, codos
    const RS = 9; this.RS = RS; this.rib = [];
    const addRib = (o) => this.rib.push({ ph: R() * TAU, w: 0.11, len: 1, ...o });
    for (let i = 0; i < 26; i++) { const a = (-150 + (300 * i) / 25) * (Math.PI / 180), ring = i % 3; addRib({ kind: "head", root: [Math.sin(a) * (0.3 - ring * 0.02), Math.cos(a) * 0.25 + 0.04, -0.02 - ring * 0.13 + R() * 0.05], dir: [Math.sin(a) * 0.9, Math.cos(a) * 0.9 + 0.15, -1], len: 0.75 + R() * 0.75 + (Math.abs(a) < 0.8 ? 0.35 : 0), w: 0.1 + R() * 0.06 }); }
    for (const sx of [-1, 1]) for (let j = 0; j < 3; j++) addRib({ kind: "head", root: [sx * (0.3 + j * 0.02), -0.02 - j * 0.07, 0.05 - j * 0.02], dir: [sx * 1.25, -0.25 - j * 0.3, -0.75], len: 0.6 + (2 - j) * 0.12, w: 0.14 });   // aletas de mejilla
    for (let j = 0; j < 5; j++) addRib({ kind: "jaw", root: [(j - 2) * 0.05, -0.15, 0.3 + Math.abs(j - 2) * -0.07 + 0.25], dir: [(j - 2) * 0.22, -1, -0.45], len: 0.5 + (2 - Math.abs(j - 2)) * 0.13, w: 0.075 });   // barba
    for (let j = 0; j < 9; j++) { const a = (j / 9) * TAU; addRib({ kind: "tail", root: [0, 0, 0], dir: [Math.sin(a) * 0.55, Math.cos(a) * 0.55, -1], len: 0.8 + R() * 0.6, w: 0.12 }); }
    const nRib = this.rib.length, rg = (this.ribGeo = new THREE.BufferGeometry()), nvR = nRib * (RS + 1) * 2, ri = [], rc = new Float32Array(nvR * 3);
    rg.setAttribute("position", new THREE.BufferAttribute(new Float32Array(nvR * 3), 3)); rg.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(nvR * 3), 3));
    for (let r = 0; r < nRib; r++) for (let k = 0; k <= RS; k++) { const f = k / RS, b = (r * (RS + 1) + k) * 2; for (const o of [0, 1]) { const i = (b + o) * 3; rc[i] = 0.5 + 0.5 * sm(f * 1.6); rc[i + 1] = 0.02 + 0.8 * f * f; rc[i + 2] = 0.06 * (1 - f) + 0.25 * f * f * f; } if (k < RS) ri.push(b, b + 1, b + 2, b + 2, b + 1, b + 3); }
    rg.setAttribute("color", new THREE.BufferAttribute(rc, 3)); rg.setIndex(ri);
    const ribM = new THREE.Mesh(rg, new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, metalness: 0.45, roughness: 0.4, emissive: 0x8a1408, emissiveIntensity: 0.6, envMapIntensity: 1.0 })); ribM.frustumCulled = false; dragon.add(ribM);

    // cabeza
    const head = (this.head = new THREE.Group()); head.matrixAutoUpdate = false; dragon.add(head);
    const hn = maps.normal.clone(); hn.repeat.set(5, 1); hn.needsUpdate = true; const hm = maps.map.clone(); hm.repeat.set(5, 1); hm.needsUpdate = true;
    const skin = new THREE.MeshStandardMaterial({ map: hm, normalMap: hn, normalScale: new THREE.Vector2(0.9, 0.9), metalness: 0.9, roughness: 0.28, envMapIntensity: 1.35, emissive: 0x4a2400, emissiveIntensity: 0.35 });
    const ivory = new THREE.MeshStandardMaterial({ color: 0xfff4d6, metalness: 0.1, roughness: 0.3, emissive: 0x6a5a30, emissiveIntensity: 0.5 });
    const hornM = gold({ color: 0xffe2a0, roughness: 0.22, metalness: 0.85, emissive: 0x6a3a08, emissiveIntensity: 0.4 });
    const redM = new THREE.MeshStandardMaterial({ color: 0xc8102e, metalness: 0.2, roughness: 0.35, emissive: 0x6a0612, emissiveIntensity: 0.8 });
    const darkM = new THREE.MeshStandardMaterial({ color: 0x3a0408, metalness: 0, roughness: 0.6, emissive: 0x2a0204 });
    const mesh = (g, m, p, parent = head) => { const o = new THREE.Mesh(g, m); if (p) o.position.set(...p); parent.add(o); return o; };
    // cráneo + morro (mitad superior)
    mesh(loft(THREE, [[-0.34, 0.16, 0.17, 0.17, 0.02], [-0.12, 0.29, 0.27, 0.2, 0.03], [0.1, 0.36, 0.31, 0.13, 0.03], [0.3, 0.3, 0.25, 0.07, 0.02], [0.5, 0.215, 0.165, 0.055, 0], [0.74, 0.19, 0.14, 0.05, -0.01], [0.94, 0.215, 0.16, 0.055, 0], [1.1, 0.2, 0.15, 0.05, 0.01], [1.2, 0.13, 0.09, 0.04, 0.01], [1.235, 0.01, 0.01, 0.01, 0.01]], 52, 30, 0.82), skin);
    // nariz: dos bulbos + fosas
    for (const sx of [-1, 1]) { const n = mesh(new THREE.SphereGeometry(0.09, 16, 12), gold({ color: 0xffc04a }), [sx * 0.105, 0.13, 1.12]); n.scale.set(1, 0.85, 1.15); mesh(new THREE.SphereGeometry(0.035, 10, 8), darkM, [sx * 0.125, 0.135, 1.215]); }
    // crestas del morro
    for (let i = 0; i < 5; i++) { const c = mesh(new THREE.ConeGeometry(0.04, 0.13 + i * 0.012, 5), hornM, [0, 0.18 + (i > 2 ? (i - 2) * 0.06 : 0), 0.92 - i * 0.14]); c.rotation.x = -0.5; }
    // cejas + ojos encendidos
    this.eyes = [];
    for (const sx of [-1, 1]) {
      const brow = mesh(taperTube(THREE, [[sx * 0.1, 0.2, 0.52], [sx * 0.2, 0.31, 0.38], [sx * 0.32, 0.37, 0.18], [sx * 0.43, 0.42, -0.08], [sx * 0.5, 0.5, -0.3]], 0.05, 0.012, 16, 8, 1.4), gold({ color: 0xffcf62 })); brow.scale.y = 1.25;
      const eye = mesh(new THREE.SphereGeometry(0.082, 18, 14), new THREE.MeshBasicMaterial({ color: 0xfff1a0, toneMapped: false }), [sx * 0.262, 0.2, 0.3]);
      const pup = mesh(new THREE.SphereGeometry(0.05, 10, 10), new THREE.MeshBasicMaterial({ color: 0x1a0204 }), [sx * 0.3, 0.2, 0.345]); pup.scale.set(0.9, 1.25, 0.42); pup.lookAt(sx * 2, 0.3, 1.6);
      const gl = new THREE.Sprite(new THREE.SpriteMaterial({ map: kit.glowTexture(96, "255,170,60"), blending: THREE.AdditiveBlending, depthWrite: false, depthTest: true, opacity: 0.9, toneMapped: false })); gl.position.set(sx * 0.31, 0.2, 0.33); gl.scale.setScalar(0.55); head.add(gl); this.eyes.push(gl, eye);
      // cuernos de ciervo con rama
      mesh(taperTube(THREE, [[sx * 0.15, 0.27, 0.0], [sx * 0.23, 0.52, -0.22], [sx * 0.3, 0.72, -0.62], [sx * 0.36, 0.8, -1.02], [sx * 0.34, 0.96, -1.38]], 0.07, 0.012, 26, 9, 0.85), hornM);
      mesh(taperTube(THREE, [[sx * 0.275, 0.66, -0.48], [sx * 0.33, 0.92, -0.5], [sx * 0.39, 1.1, -0.7]], 0.045, 0.01, 12, 8), hornM);
      mesh(taperTube(THREE, [[sx * 0.35, 0.8, -0.95], [sx * 0.46, 0.93, -1.08], [sx * 0.52, 1.07, -1.3]], 0.035, 0.008, 10, 7), hornM);
      // oreja
      const ear = mesh(new THREE.ConeGeometry(0.1, 0.42, 8), gold({ color: 0xffb637, side: THREE.DoubleSide }), [sx * 0.42, 0.16, -0.08]); ear.scale.z = 0.4; ear.rotation.set(-1.15, 0, -sx * 1.05);
      // dientes superiores
      for (let i = 0; i < 9; i++) { const z = 0.42 + i * 0.085, big = i === 7; const tth = mesh(new THREE.ConeGeometry(big ? 0.036 : 0.019, big ? 0.2 : 0.075, 7), ivory, [sx * (0.175 - (i > 6 ? (i - 6) * 0.03 : 0) + (i < 2 ? 0.02 : 0)), -0.05 - (big ? 0.085 : 0.03), z]); tth.rotation.x = Math.PI; }
    }
    for (let i = -1; i <= 1; i++) { const tth = mesh(new THREE.ConeGeometry(0.02, 0.08, 6), ivory, [i * 0.065, -0.075, 1.17]); tth.rotation.x = Math.PI; }
    const palate = mesh(new THREE.SphereGeometry(1, 16, 10), darkM, [0, -0.03, 0.6]); palate.scale.set(0.16, 0.035, 0.52);
    // mandíbula inferior articulada
    const jaw = (this.jaw = new THREE.Group()); jaw.position.set(0, -0.06, 0.02); head.add(jaw);
    mesh(loft(THREE, [[-0.22, 0.1, 0.03, 0.1, -0.02], [0, 0.27, 0.035, 0.17, -0.02], [0.25, 0.25, 0.03, 0.14, -0.02], [0.5, 0.185, 0.028, 0.095, -0.02], [0.8, 0.165, 0.03, 0.08, -0.02], [1.02, 0.17, 0.035, 0.085, -0.02], [1.12, 0.1, 0.03, 0.05, -0.02], [1.15, 0.01, 0.01, 0.01, -0.02]], 40, 26, 0.85), skin, null, jaw);
    for (const sx of [-1, 1]) for (let i = 0; i < 8; i++) { const big = i === 6; mesh(new THREE.ConeGeometry(big ? 0.03 : 0.017, big ? 0.15 : 0.065, 7), ivory, [sx * (0.15 - (i > 5 ? (i - 5) * 0.025 : 0)), 0.03 + (big ? 0.06 : 0.02), 0.44 + i * 0.085], jaw); }
    const tongue = mesh(taperTube(THREE, [[0, -0.02, 0.1], [0, 0.0, 0.45], [0, 0.02, 0.8], [0, 0.09, 1.0], [0, 0.2, 1.08]], 0.075, 0.02, 16, 10), redM, null, jaw); tongue.scale.x = 1.5;
    const floor = mesh(new THREE.SphereGeometry(1, 16, 10), darkM, [0, 0.0, 0.5], jaw); floor.scale.set(0.15, 0.03, 0.5);
    // bigotes (tubos dinámicos)
    this.whisk = [-1, 1].map((sx) => { const g = allocTube(THREE, 26, 7); const m = new THREE.Mesh(g, gold({ color: 0xffd060, emissive: 0x7a4a00, emissiveIntensity: 0.6 })); m.frustumCulled = false; dragon.add(m); return { g, sx, C: vecs(THREE, 26), N: vecs(THREE, 26), S: vecs(THREE, 26) }; });
    // patas con garras
    const legGeo = (sx) => { const g = new THREE.Group(); const m = gold({ color: 0xffb030, roughness: 0.32 });
      g.add(new THREE.Mesh(taperTube(THREE, [[0, 0, 0], [sx * 0.3, -0.1, -0.12], [sx * 0.46, -0.42, -0.02]], 0.15, 0.085, 12, 10), m));
      g.add(new THREE.Mesh(taperTube(THREE, [[sx * 0.46, -0.42, -0.02], [sx * 0.52, -0.56, 0.2], [sx * 0.55, -0.66, 0.42]], 0.085, 0.06, 10, 9), m));
      for (let c = 0; c < 4; c++) { const a = c < 3 ? (c - 1) * 0.55 : Math.PI, bx = sx * 0.55, by = -0.66, bz = 0.42, dx = Math.sin(a) * 0.3, dz = Math.cos(a) * 0.3; g.add(new THREE.Mesh(taperTube(THREE, [[bx, by, bz], [bx + dx * 0.55, by + 0.04, bz + dz * 0.55], [bx + dx, by - 0.08, bz + dz], [bx + dx * 1.12, by - 0.24, bz + dz * 1.05]], 0.045, 0.004, 10, 7), c % 2 ? ivory : m)); }
      const tuft = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.5, 6), redM); tuft.position.set(sx * 0.46, -0.3, -0.25); tuft.rotation.x = -1.9; tuft.scale.x = 0.4; g.add(tuft);
      g.matrixAutoUpdate = false; dragon.add(g); return g; };
    this.legs = [[0.16, -1], [0.16, 1], [0.5, -1], [0.5, 1]].map(([s, sx], i) => ({ s, sx, g: legGeo(sx), ph: i * 1.7 }));

    // estela de fuego dorado
    const mkPts = (n, size, tex) => { const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3)); g.setAttribute("color", new THREE.BufferAttribute(new Float32Array(n * 3), 3)); const p = new THREE.Points(g, new THREE.PointsMaterial({ map: tex, size, sizeAttenuation: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, vertexColors: true, toneMapped: false })); p.frustumCulled = false; scene.add(p); return p; };
    this.fire = [mkPts(420, 0.14, glowW), mkPts(150, 0.38, glowTx)]; this.fireSeed = this.fire.map((p) => Array.from({ length: p.geometry.attributes.position.count }, () => ({ ph: R(), life: 0.7 + R() * 1.1, s: R() * R() * 0.9, ox: R() - 0.5, oy: R() - 0.5, oz: R() - 0.5, vx: R() - 0.5, vy: R() * 0.9, vz: R() - 0.5 })));
    this.dust = mkPts(260, 0.11, glowTx); this.dustSeed = Array.from({ length: 260 }, () => ({ x: (R() - 0.5) * 14, y: -9 + R() * 14, z: -8 + R() * 16, ph: R() * TAU, f: 0.5 + R() * 1.5, v: 0.1 + R() * 0.25 }));

    // ── LOGO 3D: icono de la app como medallón
    const logo = (this.logo = new THREE.Group()); scene.add(logo);
    const rr = (w, r) => { const s = new THREE.Shape(), x = -w / 2; s.moveTo(x + r, x); s.lineTo(-x - r, x); s.quadraticCurveTo(-x, x, -x, x + r); s.lineTo(-x, -x - r); s.quadraticCurveTo(-x, -x, -x - r, -x); s.lineTo(x + r, -x); s.quadraticCurveTo(x, -x, x, -x - r); s.lineTo(x, x + r); s.quadraticCurveTo(x, x, x + r, x); return s; };
    const slab = new THREE.Mesh(new THREE.ExtrudeGeometry(rr(1.5, 0.3), { depth: 0.12, bevelEnabled: true, bevelSize: 0.035, bevelThickness: 0.035, bevelSegments: 4, curveSegments: 20 }), gold({ roughness: 0.2 })); slab.position.z = -0.12; logo.add(slab);
    const iconTx = await kit.loadTexture(kit.asset("icons/icon-512.png")); const fg = new THREE.ShapeGeometry(rr(1.42, 0.27), 20); { const p = fg.attributes.position, u = fg.attributes.uv; for (let i = 0; i < p.count; i++) u.setXY(i, p.getX(i) / 1.42 + 0.5, p.getY(i) / 1.42 + 0.5); }
    const face = new THREE.Mesh(fg, new THREE.MeshBasicMaterial({ map: iconTx, toneMapped: false })); face.position.z = 0.037; logo.add(face);
    this.iconHot = new THREE.Mesh(fg, new THREE.MeshBasicMaterial({ color: 0xfff3c8, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })); this.iconHot.position.z = 0.04; logo.add(this.iconHot);
    this.logoGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowW, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })); this.logoGlow.position.z = -0.4; scene.add(this.logoGlow);
    this.logoRays = new THREE.Mesh(new THREE.PlaneGeometry(9, 9), new THREE.MeshBasicMaterial({ map: raysTx, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false })); this.logoRays.position.z = -0.5; scene.add(this.logoRays);

    // ── rótulos 2D (sprites pre-renderizados)
    const T1 = "AI Español", T2 = "AI 西班牙语", T3a = "现在就开始", T3b = "学西班牙语", T4 = "立即体验", T5 = "sergibauli.github.io/ai-espanol", T6 = "DELE A1–B2";
    const fLat = `900 %px ${FONT.latinDisplay}`, fBrush = `%px ${FONT.zhBrush}`, fSerif = `900 %px ${FONT.zhSerif}`, fSans = `900 %px ${FONT.zhSans}`, fMod = `700 %px ${FONT.latinMod}`;
    await Promise.all([kit.fontReady(fLat.replace("%", 100), T1), kit.fontReady(fBrush.replace("%", 100), T2), kit.fontReady(fSerif.replace("%", 100), T3a + T3b), kit.fontReady(fSans.replace("%", 100), T4), kit.fontReady(fMod.replace("%", 40), T5 + T6)]);
    this.sT1 = goldSprite(T1, fLat, 150, { track: 2 }); this.sT1w = whiteOf(this.sT1);
    this.sT2 = goldSprite(T2, fBrush, 112, { track: 4 }); this.sT2w = whiteOf(this.sT2);
    this.sHead = [T3a, T3b].map((ln) => [...ln].map((ch) => { const c = goldSprite(ch, fSerif, 146, { pad: 0.4 }); return { c, w: whiteOf(c) }; }));
    // sello «DELE A1–B2»
    this.sDele = (() => { const c = document.createElement("canvas"); c.width = 330; c.height = 84; const g = c.getContext("2d"); g.font = fMod.replace("%", 30); const tw = g.measureText(T6).width, w = tw + 56, x = (330 - w) / 2;
      g.shadowColor = "rgba(0,0,0,0.6)"; g.shadowBlur = 10; g.shadowOffsetY = 4; const q = g.createLinearGradient(0, 12, 0, 72); q.addColorStop(0, "#e02a40"); q.addColorStop(1, "#8f0c21"); g.fillStyle = q; g.beginPath(); g.roundRect(x, 12, w, 60, 14); g.fill(); g.shadowColor = "transparent";
      g.strokeStyle = "#ffe9a8"; g.lineWidth = 3; g.beginPath(); g.roundRect(x + 5, 17, w - 10, 50, 10); g.stroke(); g.fillStyle = "#fff6d8"; g.textBaseline = "middle"; g.fillText(T6, x + 28, 43); return c; })();
    // botón dorado
    this.sBtn = (() => { const w = 640, h = 190, bw = 560, bh = 128, x = (w - bw) / 2, y = (h - bh) / 2, c = document.createElement("canvas"); c.width = w; c.height = h; const g = c.getContext("2d");
      g.save(); g.shadowColor = "rgba(0,0,0,0.7)"; g.shadowBlur = 22; g.shadowOffsetY = 10; g.fillStyle = "#5a0a14"; g.beginPath(); g.roundRect(x, y, bw, bh, bh / 2); g.fill(); g.restore();
      const q = g.createLinearGradient(0, y, 0, y + bh); q.addColorStop(0, "#fff8d4"); q.addColorStop(0.18, "#ffe08a"); q.addColorStop(0.5, "#f2c14e"); q.addColorStop(0.55, "#d79a22"); q.addColorStop(0.85, "#f0b93c"); q.addColorStop(1, "#b77a10"); g.fillStyle = q; g.beginPath(); g.roundRect(x, y, bw, bh, bh / 2); g.fill();
      g.strokeStyle = "#7a1010"; g.lineWidth = 3; g.beginPath(); g.roundRect(x + 9, y + 9, bw - 18, bh - 18, (bh - 18) / 2); g.stroke(); g.strokeStyle = "rgba(255,255,255,0.75)"; g.lineWidth = 3; g.beginPath(); g.roundRect(x + 2, y + 2, bw - 4, bh - 4, bh / 2 - 2); g.stroke();
      g.font = fSans.replace("%", 72); g.textAlign = "center"; g.textBaseline = "middle"; const cx = w / 2, cy = h / 2 + 4, chs = [...T4], sp = 92; chs.forEach((ch, i) => { const px = cx + (i - 1.5) * sp; g.fillStyle = "rgba(255,246,216,0.8)"; g.fillText(ch, px, cy + 3); g.fillStyle = "#7a0612"; g.fillText(ch, px, cy); }); return c; })();
    // dirección web
    this.sUrl = (() => { const c = document.createElement("canvas"); c.width = 900; c.height = 90; const g = c.getContext("2d"); let px = 36; g.font = fMod.replace("%", px); const tw0 = g.measureText(T5).width; px = Math.min(36, (36 * 760) / tw0); g.font = fMod.replace("%", px); const tw = g.measureText(T5).width, w = tw + 70, x = (900 - w) / 2;
      g.fillStyle = "rgba(11,8,30,0.82)"; g.beginPath(); g.roundRect(x, 12, w, 66, 33); g.fill(); g.strokeStyle = "#f2c14e"; g.lineWidth = 2.5; g.stroke();
      g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = "#fff6d8"; g.fillText(T5, 450, 46); return c; })();
    this.mono = await kit.loadImage(kit.asset("mono/trofeo.png"));
    // fuegos artificiales
    this.fw = [[3.0, 150, 420, 250, 1], [3.5, 930, 330, 230, 2], [4.0, 110, 1010, 210, 3], [4.5, 950, 1050, 220, 4], [5.0, 540, 190, 240, 5], [5.5, 190, 250, 170, 6]].map(([t0, x, y, r, sd]) => { const q = kit.rng(sd * 97); return { t0, x, y, r, sp: Array.from({ length: 64 }, () => ({ a: q() * TAU, v: 0.45 + q() * 0.55, w: q() })) }; });
    this.lines = Array.from({ length: 70 }, () => ({ a: R() * TAU, ph: R(), len: 0.12 + R() * 0.3, w: 1 + R() * 3 }));
    this.v = vecs(THREE, 12); this.m4 = new THREE.Matrix4(); this.dummy = new THREE.Object3D();
  },

  proj(x, y, z) { const { W, H } = this.kit, v = this.v[10].set(x, y, z).project(this.three.camera); return [(v.x + 1) * 0.5 * W, (1 - v.y) * 0.5 * H]; },

  updateDragon(t) {
    const { THREE } = this.kit, { track, L, NR, C, C2, fN, fS, fT, HS } = this, [a, b, T0, up, N0, S0, tmp, w1, w2] = this.v;
    const d = this.dHead(t), speed = (this.dHead(t + 0.012) - this.dHead(t - 0.012)) / 0.024, wRing = sm((t - 2.75) / 0.9), fast = Math.min(1, speed / 26);
    for (let i = 0; i <= NR; i++) track.posAt(d - (i / NR) * L, C[i]);
    track.posAt(d + 0.3, a); track.posAt(d - 0.3, b); T0.subVectors(a, b).normalize();
    const hl = Math.hypot(C[0].x, C[0].y) || 1; up.set((C[0].x / hl) * wRing, 1 - wRing + (C[0].y / hl) * wRing, 0.5 * wRing).normalize();
    // 1.ª pasada: marcos base y ondulación serpenteante
    const g = t < 3 ? t : 3 + (1 - Math.exp(-(t - 3) * 1.1)) / 1.1 * 0.84 + 0.16 * (t - 3), Phi = 8.5 * g, amp = 0.07 + 0.42 * (1 - wRing) * (0.4 + 0.6 * fast);
    frames(THREE, C, up, fN, fS, fT); fT[0].copy(T0);
    for (let i = 0; i <= NR; i++) { const s = i / NR, A = amp * sm(s / 0.16) * (0.75 + 0.5 * s), ph = s * 2.6 * TAU + Phi; C2[i].copy(C[i]).addScaledVector(fS[i], A * Math.sin(ph)).addScaledVector(fN[i], A * 0.4 * Math.cos(ph * 0.7 + 1)); }
    N0.copy(up).addScaledVector(T0, -up.dot(T0)).normalize();
    frames(THREE, C2, N0, fN, fS, fT); fT[0].copy(T0); fN[0].copy(N0); fS[0].crossVectors(N0, T0).normalize(); S0.copy(fS[0]);
    const tile = 0.44; fillTube(this.bodyGeo, C2, fN, fS, this.rBody, (i) => ((i / NR) * L) / tile);
    // cabeza
    const jawOpen = 0.2 + 0.5 * Math.exp(-Math.pow((t - 1.3) / 0.33, 2)) + 0.22 * Math.exp(-Math.pow((t - 3.05) / 0.3, 2)) + 0.035 * Math.sin(t * 2.2);
    this.jaw.rotation.x = jawOpen; this.m4.makeBasis(S0, N0, T0).scale(tmp.set(HS, HS, HS)).setPosition(tmp.copy(C2[0]).addScaledVector(T0, 0.12)); this.head.matrix.copy(this.m4);
    const eg = 0.5 + 0.12 * Math.sin(t * 5) + 0.5 * Math.exp(-Math.pow((t - 1.3) / 0.3, 2)); this.eyes[0].scale.setScalar(eg); this.eyes[2].scale.setScalar(eg);
    const hp = (x, y, z, out) => out.copy(C2[0]).addScaledVector(T0, 0.12 + z * HS).addScaledVector(S0, x * HS).addScaledVector(N0, y * HS);
    // cresta dorsal
    const dm = this.dummy;
    for (let k = 0; k < this.NF; k++) {
      const s = 0.012 + (k / this.NF) * 0.96, fi = s * NR, i = Math.min(NR - 1, Math.floor(fi)), r = this.rBody(i), big = k % 3 === 0 ? 1.25 : 0.85, hgt = (0.2 + r * 1.15) * big * (1 + 0.8 * Math.exp(-s * 14)) * (0.92 + 0.08 * Math.sin(t * 3 + k));
      a.lerpVectors(C2[i], C2[i + 1], fi - i).addScaledVector(fN[i], r * 0.86);
      w1.copy(fN[i]).multiplyScalar(0.8).addScaledVector(fT[i], -0.6).normalize(); w2.crossVectors(fS[i], w1).normalize();
      this.m4.makeBasis(tmp.copy(fS[i]).multiplyScalar(0.05 + r * 0.2), b.copy(w1).multiplyScalar(hgt), w2.multiplyScalar(0.16 + r * 0.55)).setPosition(a); this.fins.setMatrixAt(k, this.m4);
    }
    this.fins.instanceMatrix.needsUpdate = true;
    // patas
    for (const lg of this.legs) { const i = Math.round(lg.s * NR), r = this.rBody(i), sw = 0.25 * Math.sin(t * (1.2 + 3 * fast) + lg.ph);
      a.copy(C2[i]).addScaledVector(fS[i], lg.sx * r * 0.7).addScaledVector(fN[i], -r * 0.35);
      w1.copy(fT[i]).multiplyScalar(Math.cos(sw)).addScaledVector(fN[i], Math.sin(sw)); w2.copy(fN[i]).multiplyScalar(Math.cos(sw)).addScaledVector(fT[i], -Math.sin(sw));
      this.m4.makeBasis(fS[i], w2, w1).scale(tmp.set(1.15, 1.15, 1.15)).setPosition(a); lg.g.matrix.copy(this.m4); }
    // bigotes
    for (const wk of this.whisk) { const n = wk.C.length, len = 2.3;
      for (let k = 0; k < n; k++) { const f = k / (n - 1), back = 0.25 + 0.95 * fast;
        hp(wk.sx * 0.2, 0.04, 1.1, wk.C[k]).addScaledVector(S0, wk.sx * (0.62 * Math.sin(f * 1.9) + 0.09 * Math.sin(f * 5 - t * 2.6 + wk.sx) * f) * len)
          .addScaledVector(T0, (0.3 * Math.sin(f * Math.PI) - f * f * back) * len).addScaledVector(N0, (0.42 * f - 0.6 * f * f + 0.07 * Math.sin(f * 4 - t * 2.1 + 1) * f) * len); }
      frames(THREE, wk.C, N0, wk.N, wk.S); fillTube(wk.g, wk.C, wk.N, wk.S, (k) => 0.038 * HS * (1 - 0.9 * (k / (n - 1)))); }
    // cintas (melena, barba, cola)
    const P = this.ribGeo.attributes.position.array, Nn = this.ribGeo.attributes.normal.array, RS = this.RS; let q = 0;
    const tl = NR - 3, jc = Math.cos(jawOpen), js = Math.sin(jawOpen);
    for (const rb of this.rib) {
      let bx, by, bz, O; const isT = rb.kind === "tail"; if (isT) { O = C2[tl]; bx = fS[tl]; by = fN[tl]; bz = fT[tl]; } else { O = null; bx = S0; by = N0; bz = T0; }
      let [rx, ry, rz] = rb.root, [dx, dy, dz] = rb.dir; if (rb.kind === "jaw") { const y1 = ry * jc - rz * js + 0.0, z1 = ry * js + rz * jc; ry = y1 - 0.02; rz = z1; }
      if (isT) a.copy(O); else hp(rx, ry, rz, a);
      w1.set(0, 0, 0).addScaledVector(bx, dx).addScaledVector(by, dy).addScaledVector(bz, dz).normalize();          // dirección
      w2.set(0, 0, 0).addScaledVector(bx, dx).addScaledVector(by, dy); if (w2.lengthSq() < 1e-6) w2.copy(by); w2.normalize(); // radial (cara de la cinta)
      const len = rb.len * (isT ? 1 : HS);
      for (let k = 0; k <= RS; k++) { const f = k / RS, wv = Math.sin(f * 4.2 - t * (2.4 + 5 * fast) + rb.ph) * 0.11 * f * len;
        b.copy(a).addScaledVector(w1, len * f).addScaledVector(bz, -len * f * f * (0.25 + 0.6 * fast)).addScaledVector(w2, wv + len * 0.12 * Math.sin(f * 2.5)).addScaledVector(by, -0.1 * f * f * len * (1 - fast));
        tmp.crossVectors(w1, w2).normalize(); const hw = rb.w * HS * (1 - Math.pow(f, 1.6)) * (0.55 + 0.45 * Math.sin(Math.min(1, f * 3) * Math.PI * 0.5));
        P[q] = b.x + tmp.x * hw; P[q + 1] = b.y + tmp.y * hw; P[q + 2] = b.z + tmp.z * hw; P[q + 3] = b.x - tmp.x * hw; P[q + 4] = b.y - tmp.y * hw; P[q + 5] = b.z - tmp.z * hw;
        Nn[q] = Nn[q + 3] = w2.x; Nn[q + 1] = Nn[q + 4] = w2.y; Nn[q + 2] = Nn[q + 5] = w2.z; q += 6; }
    }
    this.ribGeo.attributes.position.needsUpdate = true; this.ribGeo.attributes.normal.needsUpdate = true;
    return { d, speed, fast };
  },

  updateFire(t) {
    const { track, L } = this, a = this.v[0];
    this.fire.forEach((pts, gi) => { const P = pts.geometry.attributes.position.array, Cc = pts.geometry.attributes.color.array, seeds = this.fireSeed[gi];
      for (let i = 0; i < seeds.length; i++) { const s = seeds[i], n = Math.floor(t / s.life - s.ph), b = (n + s.ph) * s.life, age = t - b, u = age / s.life;
        track.posAt(this.dHead(b) - s.s * L, a); const sp = 0.3 + 0.5 * u, k = Math.pow(1 - u, 1.6) * (b < -0.4 ? 0 : 1);
        P[i * 3] = a.x + s.ox * 0.5 + s.vx * age * 0.9 + Math.sin(age * 5 + s.ph * 40) * 0.08; P[i * 3 + 1] = a.y + s.oy * 0.5 + (s.vy * 0.8 + 0.25) * age * sp * 2; P[i * 3 + 2] = a.z + s.oz * 0.5 + s.vz * age * 0.9;
        Cc[i * 3] = k; Cc[i * 3 + 1] = k * (0.9 - 0.5 * u); Cc[i * 3 + 2] = k * (0.6 - 0.55 * u); }
      pts.geometry.attributes.position.needsUpdate = true; pts.geometry.attributes.color.needsUpdate = true; });
    const P = this.dust.geometry.attributes.position.array, Cc = this.dust.geometry.attributes.color.array;
    this.dustSeed.forEach((s, i) => { P[i * 3] = s.x + Math.sin(t * 0.4 * s.f + s.ph) * 0.4; P[i * 3 + 1] = -9 + ((s.y + 9 + t * s.v) % 14); P[i * 3 + 2] = s.z; const k = 0.35 + 0.35 * Math.sin(t * 2.2 * s.f + s.ph); Cc[i * 3] = k; Cc[i * 3 + 1] = k * 0.85; Cc[i * 3 + 2] = k * 0.5; });
    this.dust.geometry.attributes.position.needsUpdate = true; this.dust.geometry.attributes.color.needsUpdate = true;
  },

  /** dibuja un sprite centrado en (x,y) con escala, alfa y brillo que barre (sh 0..1) */
  spr(c, x, y, sc = 1, alpha = 1, sh = -1) {
    const g = this.fg; if (alpha <= 0.003 || sc <= 0) return; let src = c;
    if (sh > 0 && sh < 1) { const tg = this.tg; tg.globalCompositeOperation = "source-over"; tg.clearRect(0, 0, c.width, c.height); tg.drawImage(c, 0, 0); tg.globalCompositeOperation = "source-atop"; const bx = -120 + (c.width + 240) * sh, q = tg.createLinearGradient(bx - 90, 0, bx + 90, 60); q.addColorStop(0, "rgba(255,255,255,0)"); q.addColorStop(0.5, "rgba(255,255,255,0.9)"); q.addColorStop(1, "rgba(255,255,255,0)"); tg.fillStyle = q; tg.fillRect(0, 0, c.width, c.height); src = this.tmp; }
    g.globalAlpha = alpha; g.drawImage(src, 0, 0, c.width, c.height, x - (c.width * sc) / 2, y - (c.height * sc) / 2, c.width * sc, c.height * sc); g.globalAlpha = 1;
  },

  async update(t, kit) {
    const { THREE, W, H, ease, prog, noise1, lerp, clamp } = kit, { scene, camera, renderer } = this.three, g = this.fg, bg = this.bg;
    // ── cámara
    const wB = ease.inOutCubic(prog(t, 2.5, 3.5)), wC = ease.inOutCubic(prog(t, 4.6, 5.3)), calm = 1 - 0.75 * sm((t - 5.6) / 1.2);
    const pA = [0, 0.3, lerp(25, 16, ease.outCubic(prog(t, 0, 1.6)))], lA = [0.1, lerp(1.6, 0, sm(t / 1.7)), 0], pB = [0, -0.2, 13.4], lB = [0.1, -1.0, 0], pC = [0, -0.6, 16.5], lC = [0.1, -2.48, 0];
    const mix3 = (a, b, w) => a.map((v, i) => lerp(v, b[i], w)); let cp = mix3(mix3(pA, pB, wB), pC, wC), cl = mix3(mix3(lA, lB, wB), lC, wC);
    const shake = 0.55 * Math.exp(-Math.max(0, t - 1.42) * 5) * (t > 1.3 ? sm((t - 1.3) / 0.12) : 0) + 0.16 * (t > 3 ? Math.exp(-(t - 3) * 6) : 0) + 0.07 * (t > 5 ? Math.exp(-(t - 5) * 7) : 0);
    cp[0] += noise1(t * 38, 1) * shake + Math.sin(t * 0.7) * 0.06 * calm; cp[1] += noise1(t * 41, 2) * shake + Math.sin(t * 0.9 + 1) * 0.04 * calm; cl[0] += noise1(t * 33, 3) * shake * 0.6; cl[1] += noise1(t * 36, 4) * shake * 0.6;
    camera.position.set(...cp); camera.up.set(0, 1, 0); camera.lookAt(...cl); camera.rotateZ(noise1(t * 30, 5) * shake * 0.12 + 0.05 * Math.sin(t * 1.3) * (1 - wB)); camera.updateMatrixWorld();

    // ── dragón, fuego, ambiente
    const dr = this.updateDragon(t); this.updateFire(t);
    this.moonRays.rotation.z = t * 0.05; this.moonRays.material.opacity = 0.22 + 0.06 * Math.sin(t * 1.3);
    const rush = ease.inOutCubic(prog(t, 0, 1.9)) * 46;
    for (const c of this.clouds) { const u = c.userData; let z = u.z, o = u.o; if (u.kind === "fly") { z += rush; o *= 1 - prog(z, camera.position.z - 5, camera.position.z - 0.5); } if (u.kind === "bank") o *= sm((t - 2.6) / 1.6);
      c.position.set(u.x + Math.sin(t * 0.25 + u.ph) * 0.35, u.y + Math.sin(t * 0.4 + u.ph) * 0.08, z); c.material.opacity = o; c.visible = o > 0.01; }
    for (const l of this.lanterns) { const u = l.userData; l.position.set(u.x + Math.sin(t * 0.6 + u.ph) * 0.3, u.y + t * u.v, u.z); l.rotation.z = Math.sin(t * 0.8 + u.ph) * 0.08; u.gl.material.opacity = 0.55 + 0.15 * Math.sin(t * 6 + u.ph); }
    // ── logo 3D: se forja en t=3
    const f = t - 3, on = f > 0, pop = on ? kit.spring(f, 2.6, 5.5) : 0, heat = on ? Math.exp(-f * 2.3) : 0;
    this.logo.visible = on; this.logo.scale.setScalar(Math.max(0.001, pop)); this.logo.rotation.y = on ? (1 - ease.outExpo(prog(f, 0, 1.1))) * TAU * 1.5 + Math.sin(t * 0.9) * 0.07 * calm : 0; this.logo.rotation.x = Math.sin(t * 0.7 + 1) * 0.04 * calm; this.logo.position.y = Math.sin(t * 1.1) * 0.03;
    this.iconHot.material.opacity = heat * 0.95 + 0.07 * Math.max(0, Math.sin(t * 3.1));
    const pre = sm((t - 2.5) / 0.5); this.logoGlow.scale.setScalar(on ? 4.2 + 9 * heat : 6 * pre * pre); this.logoGlow.material.opacity = on ? 0.5 + 0.5 * heat : pre;
    this.logoRays.rotation.z = -t * 0.12; this.logoRays.material.opacity = on ? 0.3 + 0.6 * heat : pre * 0.5; this.logoRays.scale.setScalar(on ? 0.75 + 0.5 * heat : 0.5 * pre + 0.01);
    renderer.render(scene, camera);

    // ── cielo 2D: estrellas y fuegos artificiales
    bg.globalCompositeOperation = "source-over"; bg.drawImage(this.sky, 0, 0); bg.globalCompositeOperation = "lighter";
    for (const s of this.stars) { const a = s.a * (0.45 + 0.55 * Math.sin(t * s.f + s.p) ** 2); bg.fillStyle = `rgba(255,240,200,${a})`; bg.beginPath(); bg.arc(s.x, s.y, s.r, 0, TAU); bg.fill(); if (s.r > 1.8) { bg.fillRect(s.x - s.r * 4 * a, s.y - 0.5, s.r * 8 * a, 1); bg.fillRect(s.x - 0.5, s.y - s.r * 4 * a, 1, s.r * 8 * a); } }
    bg.lineCap = "round";
    for (const fw of this.fw) { const a = t - fw.t0; if (a < 0 || a > 1.5) continue; const e = 1 - Math.exp(-a * 3.2), fade = Math.pow(1 - a / 1.5, 1.4);
      const q = bg.createRadialGradient(fw.x, fw.y, 0, fw.x, fw.y, fw.r * 1.3); q.addColorStop(0, `rgba(255,220,140,${0.35 * Math.exp(-a * 5)})`); q.addColorStop(1, "rgba(255,220,140,0)"); bg.fillStyle = q; bg.fillRect(fw.x - fw.r * 1.3, fw.y - fw.r * 1.3, fw.r * 2.6, fw.r * 2.6);
      for (const s of fw.sp) { const rr = fw.r * s.v * e, r0 = fw.r * s.v * (1 - Math.exp(-Math.max(0, a - 0.09) * 3.2)), gy = 70 * a * a, tw = 0.6 + 0.4 * Math.sin(a * 30 + s.w * 20);
        bg.strokeStyle = `rgba(255,${200 + s.w * 50 | 0},${110 + s.w * 90 | 0},${fade * tw * 0.8})`; bg.lineWidth = 2 + s.w * 2.5; bg.beginPath(); bg.moveTo(fw.x + Math.cos(s.a) * r0, fw.y + Math.sin(s.a) * r0 + gy * 0.9); bg.lineTo(fw.x + Math.cos(s.a) * rr, fw.y + Math.sin(s.a) * rr + gy); bg.stroke(); } }

    // ── rótulos 2D
    g.clearRect(0, 0, W, H); g.globalCompositeOperation = "source-over";
    const card = sm((t - 4.7) / 0.6), CX = 510;
    if (card > 0) { const q = g.createLinearGradient(0, 880, 0, 1620); q.addColorStop(0, "rgba(8,6,28,0)"); q.addColorStop(0.2, `rgba(8,6,28,${0.6 * card})`); q.addColorStop(0.8, `rgba(8,6,28,${0.62 * card})`); q.addColorStop(1, "rgba(8,6,28,0)"); g.fillStyle = q; g.fillRect(0, 880, W, 740); }
    // líneas de velocidad del vuelo
    const sl = sm((t - 0.2) / 0.6) * (1 - sm((t - 1.6) / 0.7));
    if (sl > 0.01) { g.globalCompositeOperation = "lighter"; g.lineCap = "round"; const [mx, my] = this.proj(0, 1, -30);
      for (const ln of this.lines) { const u = fract(ln.ph + t * (1.1 + ln.len)), r0 = 260 + u * u * 1250, r1 = r0 + ln.len * 620 * (0.3 + u), ca = Math.cos(ln.a), sa = Math.sin(ln.a); g.strokeStyle = `rgba(255,225,160,${0.34 * sl * u})`; g.lineWidth = ln.w * (0.5 + u * 1.5); g.beginPath(); g.moveTo(mx + ca * r0, my + sa * r0); g.lineTo(mx + ca * r1, my + sa * r1); g.stroke(); }
      g.globalCompositeOperation = "source-over"; }
    // logotipo: «AI Español» (forja con luz en 3.5) + «AI 西班牙语» (4.0) + sello DELE (4.25)
    const [ax, ay] = this.proj(0, -1.78, 0), [bx] = this.proj(1, -1.78, 0), ppu = bx - ax, k = ppu / 184.6;
    if (t > 3.5) { const a = t - 3.5, c = this.sT1, sc = (0.775 * k) * (1 + 0.3 * (1 - ease.outExpo(prog(a, 0, 0.45)))), wipe = ease.outCubic(prog(a, 0, 0.5)), hot = Math.exp(-a * 2.6), w = c.width * sc, hh = c.height * sc, x0 = ax - w / 2, sh = fract((t - 3.9) / 2.6) * 2.2;
      g.save(); g.beginPath(); g.rect(x0, ay - hh, w * wipe, hh * 2); g.clip(); this.spr(c, ax, ay, sc, 1, sh); g.globalCompositeOperation = "lighter"; this.spr(this.sT1w, ax, ay, sc, hot); g.restore();
      if (wipe < 1) { g.globalCompositeOperation = "lighter"; const ex = x0 + w * wipe, q = g.createRadialGradient(ex, ay, 0, ex, ay, 240 * k); q.addColorStop(0, "rgba(255,250,225,1)"); q.addColorStop(0.3, "rgba(255,214,120,0.6)"); q.addColorStop(1, "rgba(255,180,60,0)"); g.fillStyle = q; g.fillRect(ex - 260, ay - 260, 520, 520); g.globalCompositeOperation = "source-over"; } }
    const [zx, zy] = this.proj(0, -2.36, 0);
    if (t > 4.0) { const a = t - 4.0, c = this.sT2, s0 = 0.66 * k, sc = s0 * (1 + 1.3 * (1 - ease.outExpo(prog(a, 0, 0.35)))), al = prog(a, 0, 0.1), dele = t > 4.25 ? kit.spring(t - 4.25, 3, 7) : 0, tw = c.width * s0, dw = 250 * k * dele, off = -(dw + 14 * k * dele) / 2;
      this.spr(c, zx + off, zy, sc, al, fract((t - 4.6) / 2.6) * 2.2); g.globalCompositeOperation = "lighter"; this.spr(this.sT2w, zx + off, zy, sc, Math.exp(-a * 4) * al); g.globalCompositeOperation = "source-over";
      if (dele > 0) this.spr(this.sDele, zx + off + tw / 2 - 30 * k + 150 * k, zy + 4 * k, 0.86 * k * dele, 1); }
    // Rey Mono triunfante (4.5)
    if (t > 4.5) { const a = t - 4.5, sp = kit.spring(a, 2.8, 6), [mx, my] = this.proj(-1.72, -1.02, 0.5), hh = 345 * k * (0.5 + 0.5 * sp), ww = hh * (230 / 268), bob = Math.sin(t * 2.1) * 5 * k, yy = my + (1 - sp) * 260 + bob;
      g.globalCompositeOperation = "lighter"; const q = g.createRadialGradient(mx, yy - hh * 0.5, 0, mx, yy - hh * 0.5, hh * 0.85); q.addColorStop(0, `rgba(255,220,130,${0.5 + 0.5 * Math.exp(-a * 4)})`); q.addColorStop(1, "rgba(255,200,90,0)"); g.fillStyle = q; g.fillRect(mx - hh, yy - hh * 1.4, hh * 2, hh * 1.8);
      if (a < 0.6) { g.strokeStyle = `rgba(255,236,170,${1 - a / 0.6})`; g.lineWidth = 6; for (let i = 0; i < 12; i++) { const an = (i / 12) * TAU, r0 = hh * (0.5 + a * 1.2), r1 = r0 + hh * 0.3; g.beginPath(); g.moveTo(mx + Math.cos(an) * r0, yy - hh * 0.5 + Math.sin(an) * r0); g.lineTo(mx + Math.cos(an) * r1, yy - hh * 0.5 + Math.sin(an) * r1); g.stroke(); } }
      g.globalCompositeOperation = "source-over"; g.imageSmoothingQuality = "high"; g.save(); g.translate(mx, yy); g.rotate(Math.sin(t * 2.1 + 0.5) * 0.03 + (1 - sp) * 0.3); g.shadowColor = "rgba(0,0,0,0.55)"; g.shadowBlur = 18; g.shadowOffsetY = 8; g.drawImage(this.mono, 6, 67, 230, 268, -ww / 2, -hh, ww, hh); g.restore(); }
    // titular (5.0 y 5.25), carácter a carácter
    const lineY = [1068, 1222];
    this.sHead.forEach((ln, li) => ln.forEach((ch, i) => { const t0 = 5.0 + li * 0.25 + i * 0.045, a = t - t0; if (a <= 0) return; const x = CX + (i - 2) * 158, y = lineY[li], e = ease.outExpo(prog(a, 0, 0.4)), sc = 1 + 1.6 * (1 - e) + 0.012 * Math.sin(t * 1.6 + i * 0.7 + li) * (a > 0.5 ? 1 : 0);
      this.spr(ch.c, x, y - (1 - e) * 40, sc, prog(a, 0, 0.08), fract((t - 5.9 - li * 0.25) / 2.4) * 2 - i * 0.08 > 0 ? clamp((fract((t - 5.9 - li * 0.25) / 2.4) * 2.4 - i * 0.12) , 0, 1) : -1);
      g.globalCompositeOperation = "lighter"; this.spr(ch.w, x, y - (1 - e) * 40, sc, Math.exp(-a * 5)); g.globalCompositeOperation = "source-over"; }));
    for (const [t0, y, wd] of [[5.0, 1068, 900], [5.25, 1222, 900]]) { const a = t - t0; if (a > 0 && a < 0.6) { g.globalCompositeOperation = "lighter"; const e = ease.outExpo(a / 0.6), q = g.createLinearGradient(CX - wd * e, 0, CX + wd * e, 0); q.addColorStop(0, "rgba(255,230,160,0)"); q.addColorStop(0.5, `rgba(255,246,216,${0.9 * (1 - a / 0.6)})`); q.addColorStop(1, "rgba(255,230,160,0)"); g.fillStyle = q; g.fillRect(CX - wd * e, y + 86, wd * 2 * e, 5); g.globalCompositeOperation = "source-over"; } }
    // botón (5.5): late a 120 BPM
    if (t > 5.5) { const a = t - 5.5, sp = kit.spring(a, 3, 6.5), beat = fract(t / 0.5), amp = lerp(0.06, 0.034, sm((t - 6) / 1)), pulse = Math.exp(-beat * 5), sc = sp * (1 + amp * pulse), by = 1368;
      g.globalCompositeOperation = "lighter"; const gl = 0.35 + 0.4 * pulse, q = g.createRadialGradient(CX, by, 40, CX, by, 420); q.addColorStop(0, `rgba(255,205,100,${gl * sp})`); q.addColorStop(1, "rgba(255,190,80,0)"); g.save(); g.translate(CX, by); g.scale(1, 0.42); g.translate(-CX, -by); g.fillStyle = q; g.fillRect(CX - 440, by - 440, 880, 880); g.restore();
      if (a > 0.3) { g.strokeStyle = `rgba(255,224,150,${0.75 * (1 - beat) ** 2})`; g.lineWidth = 5 * (1 - beat) + 1; const gw = 560 + 20 + beat * 80, gh = 128 + 20 + beat * 60; g.beginPath(); g.roundRect(CX - gw / 2, by - gh / 2, gw, gh, gh / 2); g.stroke(); }
      g.globalCompositeOperation = "source-over"; this.spr(this.sBtn, CX, by, sc, 1, fract((t - 5.7) / 1.5) * 1.6); }
    // dirección (6.0)
    if (t > 6.0) { const a = t - 6.0, e = ease.outExpo(prog(a, 0, 0.5)), c = this.sUrl; g.save(); g.beginPath(); g.rect(CX - 450 * e, 1400, 900 * e, 120); g.clip(); this.spr(c, CX, 1456 + (1 - e) * 24, 1, 1, fract((t - 6.3) / 2.2) * 1.8); g.restore(); }
    // destellos de impacto
    g.globalCompositeOperation = "lighter";
    const fl = (a, s) => (a > 0 ? Math.exp(-a * s) : 0), f1 = Math.exp(-Math.pow((t - 1.45) / 0.13, 2)) * 0.6, f3 = fl(t - 3, 5), f5 = fl(t - 5, 7) * 0.5;
    if (f1 > 0.01) { g.fillStyle = `rgba(255,236,190,${f1})`; g.fillRect(0, 0, W, H); }
    const [ix, iy] = this.proj(0, 0, 0);
    if (f3 > 0.01) { const q = g.createRadialGradient(ix, iy, 0, ix, iy, 1500); q.addColorStop(0, `rgba(255,252,235,${f3})`); q.addColorStop(0.25, `rgba(255,220,130,${f3 * 0.8})`); q.addColorStop(1, "rgba(255,160,60,0)"); g.fillStyle = q; g.fillRect(0, 0, W, H); }
    for (const [t0, rmax, cx, cy] of [[3, 1300, ix, iy], [5, 900, CX, 1140]]) { const a = t - t0; if (a > 0 && a < 0.7) { const e = ease.outCubic(a / 0.7); g.strokeStyle = `rgba(255,236,180,${0.8 * (1 - e)})`; g.lineWidth = 26 * (1 - e) + 2; g.beginPath(); g.ellipse(cx, cy, rmax * e, rmax * e * (t0 === 5 ? 0.3 : 1), 0, 0, TAU); g.stroke(); } }
    if (f5 > 0.01) { g.fillStyle = `rgba(255,240,200,${f5 * 0.5})`; g.fillRect(0, 0, W, H); }
    g.globalCompositeOperation = "source-over";
  },
};
