// Pinball del dragón · 龙之弹球 — motor propio: física con subpasos fijos y dibujo en canvas 2D.
// Coordenadas lógicas de la mesa: 400 × 720 (vertical). El componente React solo escucha eventos.

export const ANCHO = 400;
export const ALTO = 720;
const RADIO = 9;
const GRAVEDAD = 1150;
const PASO = 1 / 240;
const VEL_MAX = 1700;
const SALVABOLA = 7; // segundos tras el lanzamiento en que la bola caída vuelve gratis
const MAX_BOLAS = 5;

const ORO = "#f2c14e";
const ORO_OSCURO = "#c8961e";
const LACA = "#c8102e";

const limitar = (v, a, b) => (v < a ? a : v > b ? b : v);

// ---------- Geometría de la mesa ----------
const ARCO = { x: 203.5, y: 205, r: 191.5 };
const PIVOTE_IZQ = { x: 116, y: 632 };
const PIVOTE_DER = { x: 258, y: 632 };
const LARGO_FLIPPER = 60;
const REPOSO = 0.52;
const ARRIBA = -0.46;
const VEL_FLIPPER = 24; // rad/s

export const LINTERNAS = [
  { x: 132, y: 178, r: 22 },
  { x: 242, y: 178, r: 22 },
  { x: 187, y: 240, r: 22 },
];
const CARRILES = [147, 187, 227];
const CARRIL_CHAR = ["福", "禄", "寿"];
const POSTES = [127, 167, 207, 247];
const BOCA_RAMPA = { x1: 14, x2: 58, y1: 296, y2: 322 };
const FILAS = [
  { y: 300, min: 72, max: 330, cap: 2 },
  { y: 356, min: 40, max: 334, cap: 2 },
  { y: 412, min: 40, max: 334, cap: 2 },
  { y: 466, min: 104, max: 270, cap: 1 },
];

function seg(ax, ay, bx, by, r = 2.5, e = 0.45, extra = {}) {
  return { ax, ay, bx, by, r, e, ...extra };
}

function construirParedes() {
  const s = [];
  s.push(seg(12, 532, 12, 205));
  const N = 36;
  for (let i = 0; i < N; i++) {
    const a1 = Math.PI + (Math.PI * i) / N;
    const a2 = Math.PI + (Math.PI * (i + 1)) / N;
    s.push(seg(ARCO.x + Math.cos(a1) * ARCO.r, ARCO.y + Math.sin(a1) * ARCO.r, ARCO.x + Math.cos(a2) * ARCO.r, ARCO.y + Math.sin(a2) * ARCO.r, 2.5, 0.35));
  }
  s.push(seg(395, 205, 395, 716));
  s.push(seg(362, 264, 362, 716, 2.5)); // pared del carril de lanzamiento
  s.push(seg(12, 532, 106, 624, 3, 0.3));
  s.push(seg(362, 532, 268, 624, 3, 0.3));
  for (const x of POSTES) s.push(seg(x, 62, x, 102, 4, 0.5));
  // Tirachinas (triángulos de jade): la cara interior da patada
  const tri = (A, B, C, signo) => {
    s.push(seg(A[0], A[1], B[0], B[1], 3, 0.4));
    s.push(seg(B[0], B[1], C[0], C[1], 3, 0.4));
    s.push(seg(A[0], A[1], C[0], C[1], 3, 0.5, { patada: 430, sling: signo }));
  };
  tri([48, 452], [48, 530], [94, 566], -1);
  tri([326, 452], [326, 530], [280, 566], 1);
  return s;
}

const PUERTA = seg(362, 264, 395, 228, 2.5, 0.4);

// Rampa del dragón: dos cúbicas de Bézier muestreadas
function bezier(p0, p1, p2, p3, n) {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const u = 1 - t;
    pts.push({
      x: u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
      y: u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
    });
  }
  return pts;
}
const RAMPA = [...bezier([36, 316], [16, 200], [36, 96], [118, 62], 28), ...bezier([118, 62], [214, 26], [330, 52], [334, 196], 28).slice(1)];
const LARGO_RAMPA = (() => {
  let l = 0;
  for (let i = 1; i < RAMPA.length; i++) l += Math.hypot(RAMPA[i].x - RAMPA[i - 1].x, RAMPA[i].y - RAMPA[i - 1].y);
  return l;
})();
function puntoRampa(t) {
  let objetivo = limitar(t, 0, 1) * LARGO_RAMPA;
  for (let i = 1; i < RAMPA.length; i++) {
    const a = RAMPA[i - 1];
    const b = RAMPA[i];
    const l = Math.hypot(b.x - a.x, b.y - a.y);
    if (objetivo <= l) return { x: a.x + ((b.x - a.x) * objetivo) / l, y: a.y + ((b.y - a.y) * objetivo) / l };
    objetivo -= l;
  }
  return RAMPA[RAMPA.length - 1];
}

// Luces que recorren la mesa: puntos repartidos por el borde interior
function construirLuces() {
  const luces = [];
  for (let y = 520; y > 215; y -= 26) luces.push({ x: 26, y });
  const n = 26;
  for (let i = 0; i <= n; i++) {
    const a = Math.PI + (Math.PI * i) / n;
    const x = ARCO.x + Math.cos(a) * (ARCO.r - 14);
    if (x > 352) break;
    luces.push({ x, y: ARCO.y + Math.sin(a) * (ARCO.r - 14) });
  }
  for (let y = 290; y < 520; y += 26) luces.push({ x: 349, y });
  return luces;
}

// ---------- Colisiones ----------
function chocarSegmento(b, ax, ay, bx, by, rad, e, vx0 = 0, vy0 = 0) {
  const abx = bx - ax;
  const aby = by - ay;
  const largo2 = abx * abx + aby * aby || 1;
  const t = limitar(((b.x - ax) * abx + (b.y - ay) * aby) / largo2, 0, 1);
  const px = ax + abx * t;
  const py = ay + aby * t;
  const dx = b.x - px;
  const dy = b.y - py;
  const d2 = dx * dx + dy * dy;
  const min = RADIO + rad;
  if (d2 >= min * min) return null;
  const d = Math.sqrt(d2) || 0.0001;
  const nx = dx / d;
  const ny = dy / d;
  b.x = px + nx * min;
  b.y = py + ny * min;
  const rvx = b.vx - vx0;
  const rvy = b.vy - vy0;
  const vn = rvx * nx + rvy * ny;
  if (vn < 0) {
    b.vx -= (1 + e) * vn * nx;
    b.vy -= (1 + e) * vn * ny;
    // rozamiento tangencial leve
    const tx = -ny;
    const ty = nx;
    const vt = (b.vx - vx0) * tx + (b.vy - vy0) * ty;
    b.vx -= vt * 0.015 * tx;
    b.vy -= vt * 0.015 * ty;
  }
  return { nx, ny, vn, px, py };
}

function chocarCirculo(b, cx, cy, r, e) {
  const dx = b.x - cx;
  const dy = b.y - cy;
  const min = r + RADIO;
  const d2 = dx * dx + dy * dy;
  if (d2 >= min * min) return null;
  const d = Math.sqrt(d2) || 0.0001;
  const nx = dx / d;
  const ny = dy / d;
  b.x = cx + nx * min;
  b.y = cy + ny * min;
  const vn = b.vx * nx + b.vy * ny;
  if (vn < 0) {
    b.vx -= (1 + e) * vn * nx;
    b.vy -= (1 + e) * vn * ny;
  }
  return { nx, ny, vn };
}

// ---------- Sprites pre-dibujados ----------
function lienzo(w, h) {
  const c = document.createElement("canvas");
  c.width = Math.max(1, Math.ceil(w));
  c.height = Math.max(1, Math.ceil(h));
  return c;
}

function rutaRedondeada(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function spriteLinterna(r, encendida, k) {
  const pad = 30;
  const c = lienzo((r * 2 + pad * 2) * k, (r * 2 + pad * 2) * k);
  const g = c.getContext("2d");
  g.scale(k, k);
  const cx = r + pad;
  const cy = r + pad;
  // halo (siempre un poco; mucho al encenderse)
  const halo = g.createRadialGradient(cx, cy, r * 0.5, cx, cy, r + pad);
  halo.addColorStop(0, encendida ? "rgba(255,214,120,0.95)" : "rgba(255,150,60,0.35)");
  halo.addColorStop(0.55, encendida ? "rgba(255,150,50,0.35)" : "rgba(255,110,40,0.08)");
  halo.addColorStop(1, "rgba(255,120,40,0)");
  g.fillStyle = halo;
  g.fillRect(0, 0, c.width, c.height);
  // cordón y borla
  g.strokeStyle = "#c8961e";
  g.lineWidth = 1.5;
  g.beginPath();
  g.moveTo(cx, cy - r - 8);
  g.lineTo(cx, cy - r * 0.95);
  g.moveTo(cx, cy + r * 0.95);
  g.lineTo(cx, cy + r + 6);
  g.stroke();
  g.fillStyle = "#ffe08a";
  g.beginPath();
  g.arc(cx, cy + r + 7, 2.6, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = encendida ? "#ff5a3c" : "#c8102e";
  g.lineWidth = 1.2;
  for (let i = -3; i <= 3; i++) {
    g.beginPath();
    g.moveTo(cx + i * 0.8, cy + r + 9);
    g.lineTo(cx + i * 1.6, cy + r + 20);
    g.stroke();
  }
  // sombra sobre la mesa
  g.fillStyle = "rgba(30,0,4,0.5)";
  g.beginPath();
  g.ellipse(cx + 4, cy + 6, r, r * 0.88, 0, 0, Math.PI * 2);
  g.fill();
  // cuerpo
  const cuerpo = g.createRadialGradient(cx - r * 0.35, cy - r * 0.35, r * 0.05, cx, cy, r * 1.05);
  if (encendida) {
    cuerpo.addColorStop(0, "#fffbe0");
    cuerpo.addColorStop(0.3, "#ffd27a");
    cuerpo.addColorStop(0.7, "#ff7a2a");
    cuerpo.addColorStop(1, "#b81a1a");
  } else {
    cuerpo.addColorStop(0, "#ff9a7a");
    cuerpo.addColorStop(0.35, "#e0283c");
    cuerpo.addColorStop(0.8, "#a00c22");
    cuerpo.addColorStop(1, "#5a0712");
  }
  g.fillStyle = cuerpo;
  g.beginPath();
  g.ellipse(cx, cy, r, r * 0.9, 0, 0, Math.PI * 2);
  g.fill();
  // costillas doradas
  g.strokeStyle = encendida ? "rgba(170,60,10,0.5)" : "rgba(242,193,78,0.35)";
  g.lineWidth = 1;
  for (const f of [0.35, 0.7]) {
    g.beginPath();
    g.ellipse(cx, cy, r * f, r * 0.9, 0, 0, Math.PI * 2);
    g.stroke();
  }
  // brillo
  g.fillStyle = "rgba(255,255,255,0.35)";
  g.beginPath();
  g.ellipse(cx - r * 0.38, cy - r * 0.4, r * 0.22, r * 0.12, -0.6, 0, Math.PI * 2);
  g.fill();
  // tapas doradas
  const tapa = g.createLinearGradient(cx - r * 0.55, 0, cx + r * 0.55, 0);
  tapa.addColorStop(0, "#7a4f12");
  tapa.addColorStop(0.45, "#fff2b0");
  tapa.addColorStop(1, "#7a4f12");
  g.fillStyle = tapa;
  rutaRedondeada(g, cx - r * 0.55, cy - r * 1.0, r * 1.1, r * 0.28, 3);
  g.fill();
  rutaRedondeada(g, cx - r * 0.55, cy + r * 0.72, r * 1.1, r * 0.28, 3);
  g.fill();
  // carácter
  g.fillStyle = encendida ? "#8f0c21" : "#ffe08a";
  g.font = `700 ${Math.round(r * 0.85)}px STKaiti, KaiTi, "Songti SC", serif`;
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText("福", cx, cy + 1);
  return { c, pad };
}

function spriteBola(k) {
  const pad = 8;
  const tam = (RADIO + pad) * 2;
  const c = lienzo(tam * k, tam * k);
  const g = c.getContext("2d");
  g.scale(k, k);
  const cx = RADIO + pad;
  const halo = g.createRadialGradient(cx, cx, RADIO * 0.7, cx, cx, RADIO + pad);
  halo.addColorStop(0, "rgba(255,230,140,0.6)");
  halo.addColorStop(1, "rgba(255,200,80,0)");
  g.fillStyle = halo;
  g.fillRect(0, 0, tam, tam);
  // cuerpo de oro pulido
  const cuerpo = g.createRadialGradient(cx - 3, cx - 3.5, 0.3, cx + 1, cx + 1, RADIO * 1.05);
  cuerpo.addColorStop(0, "#ffffff");
  cuerpo.addColorStop(0.18, "#fff3c0");
  cuerpo.addColorStop(0.5, "#f2c14e");
  cuerpo.addColorStop(0.82, "#a8741a");
  cuerpo.addColorStop(1, "#5a3a0a");
  g.fillStyle = cuerpo;
  g.beginPath();
  g.arc(cx, cx, RADIO, 0, Math.PI * 2);
  g.fill();
  // reflejo rojo de la mesa
  const reflejo = g.createLinearGradient(0, cx, 0, cx + RADIO);
  reflejo.addColorStop(0, "rgba(200,16,46,0)");
  reflejo.addColorStop(1, "rgba(200,16,46,0.45)");
  g.fillStyle = reflejo;
  g.beginPath();
  g.arc(cx, cx, RADIO, 0, Math.PI * 2);
  g.fill();
  // destello
  g.fillStyle = "rgba(255,255,255,0.95)";
  g.beginPath();
  g.ellipse(cx - 3, cx - 3.6, 2.6, 1.6, -0.7, 0, Math.PI * 2);
  g.fill();
  return { c, pad };
}

function medirTexto(texto, tamano) {
  const c = medirTexto.c || (medirTexto.c = lienzo(4, 4).getContext("2d"));
  c.font = `700 ${tamano}px "Noto Serif", Georgia, serif`;
  return c.measureText(texto).width;
}

/** Placa de laca con la palabra; estado: normal | bien | mal */
function spritePlaca(texto, k, maxAncho = 150) {
  let tamano = 17;
  let w = medirTexto(texto, tamano);
  while (w > Math.min(124, maxAncho - 30) && tamano > 10) {
    tamano -= 1;
    w = medirTexto(texto, tamano);
  }
  const alto = 36;
  const ancho = Math.max(60, Math.min(maxAncho, w + 30));
  const pad = 14;
  const crear = (estado) => {
    const c = lienzo((ancho + pad * 2) * k, (alto + pad * 2) * k);
    const g = c.getContext("2d");
    g.scale(k, k);
    const x = pad;
    const y = pad;
    const corte = 7;
    const forma = (dx, dy, w, h, cc) => {
      g.beginPath();
      g.moveTo(dx + cc, dy);
      g.lineTo(dx + w - cc, dy);
      g.lineTo(dx + w, dy + cc);
      g.lineTo(dx + w, dy + h - cc);
      g.lineTo(dx + w - cc, dy + h);
      g.lineTo(dx + cc, dy + h);
      g.lineTo(dx, dy + h - cc);
      g.lineTo(dx, dy + cc);
      g.closePath();
    };
    // brillo de la luz de la diana
    const luz = g.createRadialGradient(x + ancho / 2, y + alto / 2, 4, x + ancho / 2, y + alto / 2, ancho / 2 + pad);
    const tono = estado === "bien" ? "120,240,170" : estado === "mal" ? "255,90,70" : "255,200,90";
    luz.addColorStop(0, `rgba(${tono},${estado === "normal" ? 0.28 : 0.7})`);
    luz.addColorStop(1, `rgba(${tono},0)`);
    g.fillStyle = luz;
    g.fillRect(0, 0, ancho + pad * 2, alto + pad * 2);
    // sombra
    g.fillStyle = "rgba(20,0,4,0.6)";
    forma(x + 2, y + 4, ancho, alto, corte);
    g.fill();
    // marco de oro
    const oro = g.createLinearGradient(0, y, 0, y + alto);
    oro.addColorStop(0, "#fff2b0");
    oro.addColorStop(0.5, "#c8961e");
    oro.addColorStop(1, "#7a4f12");
    g.fillStyle = oro;
    forma(x, y, ancho, alto, corte);
    g.fill();
    // tablilla de laca
    const fondo = g.createLinearGradient(0, y + 3, 0, y + alto - 3);
    if (estado === "bien") {
      fondo.addColorStop(0, "#5fd08e");
      fondo.addColorStop(1, "#14502d");
    } else if (estado === "mal") {
      fondo.addColorStop(0, "#ff6a5a");
      fondo.addColorStop(1, "#6d0a18");
    } else {
      fondo.addColorStop(0, "#3a1418");
      fondo.addColorStop(0.5, "#1c0709");
      fondo.addColorStop(1, "#0c0304");
    }
    g.fillStyle = fondo;
    forma(x + 3, y + 3, ancho - 6, alto - 6, corte - 2);
    g.fill();
    // filete rojo interior y brillo de laca
    g.strokeStyle = estado === "normal" ? "rgba(200,16,46,0.9)" : "rgba(255,255,255,0.6)";
    g.lineWidth = 1;
    forma(x + 5.5, y + 5.5, ancho - 11, alto - 11, corte - 3);
    g.stroke();
    g.fillStyle = "rgba(255,255,255,0.08)";
    g.fillRect(x + 6, y + 5, ancho - 12, (alto - 10) / 2);
    // texto dorado
    g.font = `700 ${tamano}px "Noto Serif", Georgia, serif`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    if (estado === "normal") {
      const txt = g.createLinearGradient(0, y + 8, 0, y + alto - 8);
      txt.addColorStop(0, "#fff6cf");
      txt.addColorStop(1, "#f2c14e");
      g.fillStyle = txt;
    } else g.fillStyle = "#fff";
    g.fillText(texto, x + ancho / 2, y + alto / 2 + 1);
    return c;
  };
  return { ancho, alto, pad, normal: crear("normal"), bien: crear("bien"), mal: crear("mal") };
}

// ---------- Fondo estático ----------
function contornoMesa(g) {
  g.beginPath();
  g.moveTo(12, 716);
  g.lineTo(12, ARCO.y);
  g.arc(ARCO.x, ARCO.y, ARCO.r, Math.PI, 0);
  g.lineTo(395, 716);
  g.closePath();
}

/** Greca 回纹 en una franja horizontal (x, y, ancho, alto) */
function greca(g, x, y, w, h) {
  const paso = h * 1.6;
  g.beginPath();
  for (let px = x; px + paso <= x + w + 0.1; px += paso) {
    const a = h * 0.2;
    g.moveTo(px, y + h - a);
    g.lineTo(px, y + a);
    g.lineTo(px + paso - a * 2, y + a);
    g.lineTo(px + paso - a * 2, y + h - a * 2.4);
    g.lineTo(px + a * 2, y + h - a * 2.4);
    g.lineTo(px + a * 2, y + a * 2.4);
  }
  g.stroke();
}

function dibujarFondo(k, imgs) {
  const c = lienzo(ANCHO * k, ALTO * k);
  const g = c.getContext("2d");
  g.scale(k, k);
  // marco exterior (madera lacada oscura)
  g.fillStyle = "#1c0408";
  g.fillRect(0, 0, ANCHO, ALTO);
  g.save();
  contornoMesa(g);
  g.clip();
  // laca roja profunda con foco central
  const laca = g.createRadialGradient(187, 360, 30, 187, 380, 480);
  laca.addColorStop(0, "#e2303f");
  laca.addColorStop(0.35, "#c3122c");
  laca.addColorStop(0.75, "#8a0a1f");
  laca.addColorStop(1, "#3d040c");
  g.fillStyle = laca;
  g.fillRect(0, 0, ANCHO, ALTO);
  // trama de rombos muy tenue (laca tallada)
  g.strokeStyle = "rgba(60,0,10,0.18)";
  g.lineWidth = 1;
  g.beginPath();
  for (let i = -ALTO; i < ANCHO + ALTO; i += 18) {
    g.moveTo(i, 0);
    g.lineTo(i + ALTO, ALTO);
    g.moveTo(i, ALTO);
    g.lineTo(i + ALTO, 0);
  }
  g.stroke();
  // nubes xiangyun doradas
  g.strokeStyle = "rgba(242,193,78,0.16)";
  g.lineWidth = 2;
  const nube = (x, y, s) => {
    g.beginPath();
    g.arc(x, y, 10 * s, Math.PI * 0.9, Math.PI * 2.2);
    g.arc(x + 16 * s, y + 2 * s, 8 * s, Math.PI * 1.1, Math.PI * 2.1);
    g.arc(x + 30 * s, y + 6 * s, 6 * s, Math.PI * 1.2, Math.PI * 2.4);
    g.stroke();
  };
  for (let i = 0; i < 18; i++) nube(24 + ((i * 97) % 320), 130 + ((i * 151) % 520), 0.8 + (i % 3) * 0.35);
  // medallón central (perla del dragón)
  const mx = 187;
  const my = 384;
  const brillo = g.createRadialGradient(mx, my, 10, mx, my, 150);
  brillo.addColorStop(0, "rgba(255,214,120,0.35)");
  brillo.addColorStop(1, "rgba(255,214,120,0)");
  g.fillStyle = brillo;
  g.fillRect(mx - 150, my - 150, 300, 300);
  g.strokeStyle = "rgba(242,193,78,0.45)";
  g.lineWidth = 2;
  for (const r of [118, 96]) {
    g.beginPath();
    g.arc(mx, my, r, 0, Math.PI * 2);
    g.stroke();
  }
  g.setLineDash([2, 6]);
  g.lineWidth = 3;
  g.beginPath();
  g.arc(mx, my, 107, 0, Math.PI * 2);
  g.stroke();
  g.setLineDash([]);
  // dragón dorado enroscado: silueta de oro + detalle del original
  if (imgs.dragon?.complete && imgs.dragon.naturalWidth) {
    const dw = 270;
    const dh = 398;
    const dx = mx - dw / 2;
    const dy = 186;
    const oro = lienzo(dw * k, dh * k);
    const og = oro.getContext("2d");
    og.drawImage(imgs.dragon, 0, 0, oro.width, oro.height);
    og.globalCompositeOperation = "source-in";
    const gr = og.createLinearGradient(0, 0, oro.width, oro.height);
    gr.addColorStop(0, "#fff2b0");
    gr.addColorStop(0.4, "#f2c14e");
    gr.addColorStop(0.75, "#c8961e");
    gr.addColorStop(1, "#7a4f12");
    og.fillStyle = gr;
    og.fillRect(0, 0, oro.width, oro.height);
    og.globalCompositeOperation = "multiply";
    og.globalAlpha = 0.28;
    og.drawImage(imgs.dragon, 0, 0, oro.width, oro.height);
    og.globalCompositeOperation = "destination-in";
    og.globalAlpha = 1;
    og.drawImage(imgs.dragon, 0, 0, oro.width, oro.height);
    g.save();
    g.shadowColor = "rgba(20,0,4,0.7)";
    g.shadowBlur = 10;
    g.shadowOffsetY = 4;
    g.globalAlpha = 0.8;
    g.drawImage(oro, dx, dy, dw, dh);
    g.restore();
  }
  // nubes de oro (imagen)
  if (imgs.nube?.complete && imgs.nube.naturalWidth) {
    g.globalAlpha = 0.75;
    g.drawImage(imgs.nube, 36, 126, 112, 39);
    g.drawImage(imgs.nube, 250, 258, 96, 34);
    g.drawImage(imgs.nube, 62, 452, 88, 31);
    g.globalAlpha = 1;
  }
  // carril de lanzamiento: canal oscuro con greca
  const canal = g.createLinearGradient(362, 0, 395, 0);
  canal.addColorStop(0, "#1a0306");
  canal.addColorStop(0.5, "#3a0810");
  canal.addColorStop(1, "#1a0306");
  g.fillStyle = canal;
  g.fillRect(362, 228, 33, 490);
  // faldones laterales junto a los flippers (laca negra con greca de oro)
  const faldon = (pts, texto, tx, ty) => {
    g.beginPath();
    g.moveTo(pts[0][0], pts[0][1]);
    for (const p of pts.slice(1)) g.lineTo(p[0], p[1]);
    g.closePath();
    const f = g.createLinearGradient(0, 540, 0, 720);
    f.addColorStop(0, "#2a080c");
    f.addColorStop(1, "#0c0204");
    g.fillStyle = f;
    g.fill();
    g.save();
    g.clip();
    g.strokeStyle = "rgba(242,193,78,0.38)";
    g.lineWidth = 1;
    for (const y of [650, 700]) greca(g, 0, y, 400, 9);
    g.restore();
    g.fillStyle = "rgba(255,224,138,0.85)";
    g.font = `700 22px STKaiti, KaiTi, "Songti SC", serif`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText(texto, tx, ty);
  };
  faldon([[12, 540], [104, 628], [104, 720], [12, 720]], "龙", 50, 672);
  faldon([[362, 540], [270, 628], [270, 720], [362, 720]], "珠", 324, 672);
  // desagüe: zona oscura con texto
  const sombra = g.createLinearGradient(0, 600, 0, 720);
  sombra.addColorStop(0, "rgba(20,0,4,0)");
  sombra.addColorStop(1, "rgba(20,0,4,0.75)");
  g.fillStyle = sombra;
  g.fillRect(104, 600, 166, 120);
  g.fillStyle = "rgba(255,224,138,0.55)";
  g.font = `600 9px "Noto Serif", Georgia, serif`;
  g.textAlign = "center";
  g.fillText("龙之弹球 · Pinball del dragón", 187, 709);
  // carriles 福禄寿: placa oscura
  g.fillStyle = "rgba(20,0,4,0.45)";
  rutaRedondeada(g, 125, 54, 124, 52, 10);
  g.fill();
  // profundidad: borde interior en sombra
  contornoMesa(g);
  g.strokeStyle = "rgba(20,0,4,0.5)";
  g.lineWidth = 36;
  g.stroke();
  g.strokeStyle = "rgba(20,0,4,0.35)";
  g.lineWidth = 18;
  g.stroke();
  g.restore();

  // filete doble dorado por dentro del borde
  const filete = (desp, ancho, color) => {
    g.strokeStyle = color;
    g.lineWidth = ancho;
    g.beginPath();
    g.moveTo(12 + desp, 532);
    g.lineTo(12 + desp, ARCO.y);
    g.arc(ARCO.x, ARCO.y, ARCO.r - desp, Math.PI, 0);
    g.lineTo(362 - 4, ARCO.y + 60);
    g.stroke();
  };
  filete(8, 1.2, "rgba(242,193,78,0.6)");
  filete(11, 0.6, "rgba(242,193,78,0.4)");
  return c;
}

/** Reflejo del cristal sobre la mesa (se dibuja encima de todo) */
function dibujarCristal(k) {
  const c = lienzo(ANCHO * k, ALTO * k);
  const g = c.getContext("2d");
  g.scale(k, k);
  contornoMesa(g);
  g.clip();
  const banda = g.createLinearGradient(0, 80, 300, 380);
  banda.addColorStop(0, "rgba(255,255,255,0)");
  banda.addColorStop(0.42, "rgba(255,255,255,0)");
  banda.addColorStop(0.5, "rgba(255,255,255,0.07)");
  banda.addColorStop(0.56, "rgba(255,255,255,0)");
  banda.addColorStop(0.7, "rgba(255,255,255,0.035)");
  banda.addColorStop(0.74, "rgba(255,255,255,0)");
  g.fillStyle = banda;
  g.fillRect(0, 0, ANCHO, ALTO);
  const arriba = g.createLinearGradient(0, 0, 0, 120);
  arriba.addColorStop(0, "rgba(255,240,200,0.12)");
  arriba.addColorStop(1, "rgba(255,240,200,0)");
  g.fillStyle = arriba;
  g.fillRect(0, 0, ANCHO, 120);
  return c;
}

function trazarParedes(g, paredes) {
  g.lineCap = "round";
  for (const p of paredes) {
    if (p.sling) continue;
    g.strokeStyle = "#5a3a0a";
    g.lineWidth = p.r * 2 + 3;
    g.beginPath();
    g.moveTo(p.ax, p.ay + 1.5);
    g.lineTo(p.bx, p.by + 1.5);
    g.stroke();
  }
  for (const p of paredes) {
    if (p.sling) continue;
    const grad = g.createLinearGradient(p.ax, p.ay, p.bx, p.by);
    grad.addColorStop(0, "#ffe08a");
    grad.addColorStop(0.5, ORO_OSCURO);
    grad.addColorStop(1, "#ffe08a");
    g.strokeStyle = grad;
    g.lineWidth = p.r * 2;
    g.beginPath();
    g.moveTo(p.ax, p.ay);
    g.lineTo(p.bx, p.by);
    g.stroke();
  }
  // brillo superior de los raíles
  g.strokeStyle = "rgba(255,250,220,0.75)";
  g.lineWidth = 0.9;
  for (const p of paredes) {
    if (p.sling) continue;
    g.beginPath();
    g.moveTo(p.ax - 0.6, p.ay - 0.8);
    g.lineTo(p.bx - 0.6, p.by - 0.8);
    g.stroke();
  }
}

// ---------- Motor ----------
export class MotorPinball {
  constructor({ canvas, reducido = false, alEvento = () => {}, imgs = {} }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.reducido = reducido;
    this.alEvento = alEvento;
    this.imgs = imgs;
    this.paredes = construirParedes();
    this.luces = construirLuces();
    this.flippers = [
      { lado: -1, p: PIVOTE_IZQ, ang: REPOSO, w: 0, activo: false },
      { lado: 1, p: PIVOTE_DER, ang: REPOSO, w: 0, activo: false },
    ];
    this.linternas = LINTERNAS.map((l) => ({ ...l, luz: 0 }));
    this.slingLuz = [0, 0];
    this.carriles = [false, false, false];
    this.dianas = [];
    this.particulas = [];
    this.estela = [];
    this.tiempo = 0;
    this.acum = 0;
    this.sacudida = 0;
    this.destello = null;
    this.escala = 1;
    this.k = 1;
    this.corriendo = false;
    this.pausado = false;
    this.cargando = false;
    this.carga = 0;
    this.embolo = 0; // 0..1 dibujado
    this.ultimoT = 0;
    this.raf = 0;
    this.reiniciarPartida();
  }

  reiniciarPartida() {
    this.puntos = 0;
    this.bolas = 3;
    this.mult = 1;
    this.rampas = 0;
    this.combo = 0;
    this.aciertos = 0;
    this.fallos = 0;
    this.fin = false;
    this.nuevaBola();
  }

  nuevaBola() {
    this.bola = { x: 378.5, y: 680, vx: 0, vy: 0, enCarril: true, rampa: null, rota: 0, quieta: 0 };
    this.puertaCerrada = false;
    this.salvabola = 0;
    this.lanzada = false;
    this.estela = [];
    this.carga = 0;
    this.cargando = false;
  }

  /** Dianas nuevas: lista [{texto, correcta}] y config {movil, velocidad} */
  ponerDianas(lista, config = {}) {
    const filas = FILAS.map((f) => ({ ...f, items: [] }));
    const orden = [1, 2, 0, 3];
    let i = 0;
    const barajadas = [...lista];
    for (let j = barajadas.length - 1; j > 0; j--) {
      const r = Math.floor(Math.random() * (j + 1));
      [barajadas[j], barajadas[r]] = [barajadas[r], barajadas[j]];
    }
    for (const d of barajadas) {
      let colocada = false;
      for (let intento = 0; intento < 4 && !colocada; intento++) {
        const f = filas[orden[(i + intento) % orden.length]];
        if (f.items.length < f.cap) {
          f.items.push(d);
          colocada = true;
        }
      }
      i++;
    }
    this.dianas = [];
    const k = this.k;
    for (const f of filas) {
      const n = f.items.length;
      if (!n) continue;
      const tramo = (f.max - f.min) / n;
      const fase = Math.random() * Math.PI * 2;
      f.items.forEach((d, idx) => {
        const maxAncho = Math.min(150, tramo - 10);
        const sprite = spritePlaca(d.texto, k, maxAncho);
        const hw = sprite.ancho / 2;
        const lo = f.min + tramo * idx + hw;
        const hi = f.min + tramo * (idx + 1) - hw;
        const holgura = Math.max(0, hi - lo);
        const x = holgura > 0 ? lo + Math.random() * holgura : (lo + hi) / 2;
        const amp = config.movil ? Math.min(holgura / 2, 46) : 0;
        const base = config.movil ? lo + holgura / 2 : x;
        this.dianas.push({
          ...d,
          sprite,
          maxAncho,
          y: f.y,
          base,
          x: base,
          amp,
          fase,
          vel: config.velocidad || 1,
          hw: Math.max(4, hw - 17),
          estado: "normal",
          aparece: 0,
          golpe: 0,
        });
      });
    }
    this.enfriamiento = 0.35;
  }

  // ---- Controles ----
  flipper(lado, activo) {
    const f = this.flippers[lado < 0 ? 0 : 1];
    if (f.activo === activo) return;
    f.activo = activo;
    if (activo && this.corriendo && !this.pausado) {
      this.alEvento({ tipo: "flipper" });
      // cambio de carril (como en las máquinas clásicas)
      if (lado < 0) this.carriles = [this.carriles[1], this.carriles[2], this.carriles[0]];
      else this.carriles = [this.carriles[2], this.carriles[0], this.carriles[1]];
    }
  }
  cargar(activo) {
    if (activo) {
      const b = this.bola;
      if (b.enCarril && b.y > 650 && Math.abs(b.vy) < 60 && !b.rota) this.cargando = true;
      return;
    }
    if (this.cargando) this.lanzar();
    this.cargando = false;
  }
  lanzar() {
    const b = this.bola;
    if (b.enCarril && b.x > 364 && b.y > 600) {
      b.vy = -(1240 + 560 * this.carga);
      b.vx = 0;
      this.lanzada = true;
      this.salvabola = SALVABOLA;
      this.alEvento({ tipo: "lanzar", carga: this.carga });
    }
    this.carga = 0;
  }

  // ---- Bucle ----
  iniciar() {
    if (this.corriendo) return;
    this.corriendo = true;
    this.ultimoT = performance.now();
    const bucle = (t) => {
      if (!this.corriendo) return;
      const dt = Math.min(0.05, (t - this.ultimoT) / 1000);
      this.ultimoT = t;
      if (!this.pausado && !this.fin) this.avanzar(dt);
      this.dibujar();
      this.raf = requestAnimationFrame(bucle);
    };
    this.raf = requestAnimationFrame(bucle);
  }
  detener() {
    this.corriendo = false;
    cancelAnimationFrame(this.raf);
  }

  redimensionar(anchoCss, altoCss, dpr) {
    this.escala = anchoCss / ANCHO;
    this.k = Math.min(2.5, this.escala * dpr);
    this.canvas.width = Math.round(anchoCss * dpr);
    this.canvas.height = Math.round(altoCss * dpr);
    this.canvas.style.width = `${anchoCss}px`;
    this.canvas.style.height = `${altoCss}px`;
    this.prepararSprites();
    for (const d of this.dianas) {
      const s = spritePlaca(d.texto, this.k, d.maxAncho);
      d.sprite = s;
    }
  }

  prepararSprites() {
    const k = this.k;
    this.fondo = dibujarFondo(k, this.imgs);
    // paredes sobre el fondo
    const g = this.fondo.getContext("2d");
    g.save();
    g.setTransform(k, 0, 0, k, 0, 0);
    trazarParedes(g, this.paredes);
    g.restore();
    this.sprLinterna = spriteLinterna(22, false, k);
    this.sprLinternaOn = spriteLinterna(22, true, k);
    this.sprBola = spriteBola(k);
    this.cristal = dibujarCristal(k);
  }

  avanzar(dt) {
    this.tiempo += dt;
    this.acum += dt;
    // carga del émbolo
    if (this.cargando) this.carga = Math.min(1, this.carga + dt * 1.1);
    const objetivoEmbolo = this.cargando ? this.carga : 0;
    this.embolo += (objetivoEmbolo - this.embolo) * Math.min(1, dt * (this.cargando ? 30 : 40));
    if (this.salvabola > 0) this.salvabola -= dt;
    if (this.enfriamiento > 0) this.enfriamiento -= dt;
    // dianas móviles
    for (const d of this.dianas) {
      d.x = d.base + Math.sin(this.tiempo * d.vel + d.fase) * d.amp;
      if (d.aparece < 1) d.aparece = Math.min(1, d.aparece + dt * 3);
      if (d.golpe > 0) d.golpe -= dt;
    }
    let pasos = 0;
    while (this.acum >= PASO && pasos < 16) {
      this.subpaso(PASO);
      this.acum -= PASO;
      pasos++;
    }
    if (pasos >= 16) this.acum = 0;
    // luces y efectos
    for (const l of this.linternas) if (l.luz > 0) l.luz -= dt * 2.4;
    for (let i = 0; i < 2; i++) if (this.slingLuz[i] > 0) this.slingLuz[i] -= dt * 4;
    if (this.sacudida > 0) this.sacudida = Math.max(0, this.sacudida - dt * 30);
    if (this.destello) {
      this.destello.vida -= dt * 2.2;
      if (this.destello.vida <= 0) this.destello = null;
    }
    for (const p of this.particulas) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 300 * dt;
      p.vida -= dt * p.decae;
    }
    this.particulas = this.particulas.filter((p) => p.vida > 0);
    // estela
    const b = this.bola;
    if (!b.rota && this.lanzada) {
      this.estela.push({ x: b.x, y: b.y });
      if (this.estela.length > (this.reducido ? 4 : 12)) this.estela.shift();
    }
    if (b.rota) {
      b.rota -= dt;
      if (b.rota <= 0) this.perderBola("fallo");
    }
  }

  subpaso(h) {
    // flippers
    for (const f of this.flippers) {
      const objetivo = f.activo ? ARRIBA : REPOSO;
      const antes = f.ang;
      if (f.ang > objetivo) f.ang = Math.max(objetivo, f.ang - VEL_FLIPPER * h);
      else if (f.ang < objetivo) f.ang = Math.min(objetivo, f.ang + VEL_FLIPPER * 0.7 * h);
      f.w = (f.ang - antes) / h;
    }
    const b = this.bola;
    if (b.rota) return;
    if (b.rampa) {
      b.rampa.t += h / 0.85;
      const p = puntoRampa(b.rampa.t);
      b.x = p.x;
      b.y = p.y;
      if (b.rampa.t >= 1) {
        b.rampa = null;
        b.vx = -70;
        b.vy = 180;
      }
      return;
    }
    if (b.enCarril && this.cargando) {
      // la bola se apoya en el émbolo
      b.vx = 0;
      b.vy = 0;
      b.y = 690 + this.embolo * 26 - RADIO - 2.5;
      return;
    }
    b.vy += GRAVEDAD * h;
    const v = Math.hypot(b.vx, b.vy);
    if (v > VEL_MAX) {
      b.vx *= VEL_MAX / v;
      b.vy *= VEL_MAX / v;
    }
    const prevY = b.y;
    b.x += b.vx * h;
    b.y += b.vy * h;

    // paredes
    for (const p of this.paredes) {
      const c = chocarSegmento(b, p.ax, p.ay, p.bx, p.by, p.r, p.e);
      if (c && p.patada && c.vn < -60) {
        b.vx += c.nx * p.patada;
        b.vy += c.ny * p.patada;
        this.slingLuz[p.sling < 0 ? 0 : 1] = 1;
        this.sumar(50);
        this.chispas(c.px, c.py, 6, "#9ff0c0");
        this.alEvento({ tipo: "sling" });
      }
    }
    if (this.puertaCerrada) chocarSegmento(b, PUERTA.ax, PUERTA.ay, PUERTA.bx, PUERTA.by, PUERTA.r, PUERTA.e);
    // émbolo (suelo del carril)
    if (b.x > 362) {
      const py = 690 + this.embolo * 26;
      chocarSegmento(b, 364, py, 393, py, 2.5, 0.2);
    }
    if (b.enCarril && b.y < 262) b.enCarril = false;
    if (!this.puertaCerrada && !b.enCarril && b.x < 350) this.puertaCerrada = true;

    // linternas
    for (const l of this.linternas) {
      const c = chocarCirculo(b, l.x, l.y, l.r, 0.6);
      if (c && c.vn < -20) {
        b.vx += c.nx * 360;
        b.vy += c.ny * 360;
        l.luz = 1;
        this.sumar(100);
        this.chispas(l.x + c.nx * l.r, l.y + c.ny * l.r, 8, "#ffd27a");
        this.alEvento({ tipo: "linterna" });
      }
    }
    // flippers
    for (const f of this.flippers) {
      const tx = f.p.x + (f.lado < 0 ? Math.cos(f.ang) : -Math.cos(f.ang)) * LARGO_FLIPPER;
      const ty = f.p.y + Math.sin(f.ang) * LARGO_FLIPPER;
      // velocidad de la superficie en el punto más cercano
      const abx = tx - f.p.x;
      const aby = ty - f.p.y;
      const t = limitar(((b.x - f.p.x) * abx + (b.y - f.p.y) * aby) / (abx * abx + aby * aby), 0, 1);
      const rx = abx * t;
      const ry = aby * t;
      const w = f.lado < 0 ? f.w : -f.w; // giro en pantalla
      const vx0 = -w * ry;
      const vy0 = w * rx;
      const rad = 10 - 4 * t;
      chocarSegmento(b, f.p.x, f.p.y, tx, ty, rad, 0.32, vx0, vy0);
    }
    // carriles 福禄寿 (sensores)
    if (b.y > 58 && b.y < 104 && prevY !== b.y) {
      CARRILES.forEach((cx, i) => {
        if (Math.abs(b.x - cx) < 12 && !this.carriles[i]) {
          this.carriles[i] = true;
          this.sumar(250);
          this.alEvento({ tipo: "carril", i });
          if (this.carriles.every(Boolean)) {
            this.carriles = [false, false, false];
            if (this.mult < 5) this.mult++;
            this.flash("oro");
            this.alEvento({ tipo: "multiplicador", mult: this.mult });
          }
        }
      });
    }
    // boca de la rampa (solo subiendo)
    if (b.vy < -180 && b.x > BOCA_RAMPA.x1 && b.x < BOCA_RAMPA.x2 && b.y > BOCA_RAMPA.y1 && b.y < BOCA_RAMPA.y2) {
      b.rampa = { t: 0 };
      this.rampas++;
      this.sumar(750);
      this.alEvento({ tipo: "rampa", rampas: this.rampas });
      if (this.rampas >= 3) {
        this.rampas = 0;
        this.bolaExtra("rampa");
      }
      return;
    }
    // dianas con palabras
    if (this.enfriamiento <= 0) {
      for (const d of this.dianas) {
        if (d.estado !== "normal" || d.aparece < 0.6) continue;
        const c = chocarSegmento(b, d.x - d.hw, d.y, d.x + d.hw, d.y, 17, 0.55);
        if (!c) continue;
        if (d.correcta) {
          d.estado = "bien";
          b.vx += c.nx * 240;
          b.vy += c.ny * 240;
          this.acertar(d);
        } else {
          d.estado = "mal";
          this.fallar(d);
        }
        d.golpe = 0.6;
        break;
      }
    }
    // desagüe
    if (b.y > ALTO + 24) {
      if (this.salvabola > 0 && this.lanzada) {
        this.nuevaBola();
        this.alEvento({ tipo: "salvabola" });
      } else this.perderBola("desague");
      return;
    }
    // bola atascada: empujoncito
    if (!b.enCarril && Math.hypot(b.vx, b.vy) < 12) {
      b.quieta += h;
      if (b.quieta > 2.5) {
        b.vy = -320;
        b.vx = (Math.random() - 0.5) * 200;
        b.quieta = 0;
      }
    } else b.quieta = 0;
  }

  sumar(p) {
    this.puntos += Math.round(p * this.mult);
  }

  acertar(d) {
    this.combo++;
    this.aciertos++;
    const base = 1000 * Math.min(this.combo, 5);
    this.sumar(base);
    this.sacudida = this.reducido ? 0 : 7;
    this.flash("oro");
    this.chispas(d.x, d.y, this.reducido ? 10 : 46, ORO, 1.6);
    this.chispas(d.x, d.y, this.reducido ? 0 : 20, "#9ff0c0", 1.2);
    if (this.combo % 5 === 0) this.bolaExtra("combo");
    this.enfriamiento = 0.9;
    this.alEvento({ tipo: "acierto", texto: d.texto, combo: this.combo, x: d.x, y: d.y });
  }

  fallar(d) {
    this.combo = 0;
    this.fallos++;
    const b = this.bola;
    b.rota = 0.9;
    b.vx = 0;
    b.vy = 0;
    this.sacudida = this.reducido ? 0 : 12;
    this.flash("rojo");
    this.chispas(b.x, b.y, this.reducido ? 10 : 40, "#ff6b5a", 1.4);
    this.chispas(b.x, b.y, this.reducido ? 0 : 16, ORO, 1);
    this.enfriamiento = 2;
    this.alEvento({ tipo: "fallo", texto: d.texto, x: d.x, y: d.y });
  }

  bolaExtra(motivo) {
    if (this.bolas < MAX_BOLAS) this.bolas++;
    this.alEvento({ tipo: "bolaExtra", motivo });
  }

  perderBola(motivo) {
    this.bolas--;
    this.combo = 0;
    this.mult = 1;
    this.carriles = [false, false, false];
    if (this.bolas <= 0) {
      this.bolas = 0;
      this.fin = true;
      this.alEvento({ tipo: "fin", motivo });
      return;
    }
    this.nuevaBola();
    this.alEvento({ tipo: "bolaPerdida", motivo });
  }

  flash(color) {
    if (this.reducido) return;
    this.destello = { color, vida: 1 };
  }

  chispas(x, y, n, color, fuerza = 1) {
    for (let i = 0; i < n; i++) {
      if (this.particulas.length > 320) this.particulas.shift();
      const a = Math.random() * Math.PI * 2;
      const v = (60 + Math.random() * 260) * fuerza;
      this.particulas.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 60, vida: 1, decae: 1.4 + Math.random() * 1.2, r: 1.2 + Math.random() * 2.4, color });
    }
  }

  // ---- Dibujo ----
  dibujar() {
    const g = this.ctx;
    const k = this.k;
    const W = this.canvas.width;
    const Hc = this.canvas.height;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.clearRect(0, 0, W, Hc);
    let sx = 0;
    let sy = 0;
    if (this.sacudida > 0) {
      sx = (Math.random() - 0.5) * this.sacudida * k;
      sy = (Math.random() - 0.5) * this.sacudida * k;
    }
    g.setTransform(1, 0, 0, 1, sx, sy);
    if (this.fondo) g.drawImage(this.fondo, 0, 0);
    g.setTransform(k, 0, 0, k, sx, sy);
    const t = this.tiempo;

    // luces que recorren el borde
    const n = this.luces.length;
    const cabeza = this.reducido ? -1 : Math.floor(t * 14) % n;
    const fiesta = this.destello && this.destello.vida > 0.3;
    for (let i = 0; i < n; i++) {
      const l = this.luces[i];
      const dist = cabeza < 0 ? 99 : (cabeza - i + n) % n;
      const on = fiesta || dist < 4 || (cabeza >= 0 && (i + Math.floor(t * 2)) % 9 === 0);
      g.fillStyle = on ? (dist === 0 ? "#fffbe6" : "#ffd27a") : "rgba(242,193,78,0.28)";
      g.beginPath();
      g.arc(l.x, l.y, on ? 3 : 2.2, 0, Math.PI * 2);
      g.fill();
      if (on && !this.reducido) {
        g.fillStyle = "rgba(255,210,120,0.22)";
        g.beginPath();
        g.arc(l.x, l.y, 7, 0, Math.PI * 2);
        g.fill();
      }
    }

    // carriles 福禄寿
    g.textAlign = "center";
    g.textBaseline = "middle";
    CARRILES.forEach((cx, i) => {
      const on = this.carriles[i];
      g.fillStyle = on ? "#ffd27a" : "rgba(90,10,20,0.85)";
      g.strokeStyle = on ? "#fff4c8" : ORO_OSCURO;
      g.lineWidth = 1.5;
      g.beginPath();
      g.arc(cx, 84, 11, 0, Math.PI * 2);
      g.fill();
      g.stroke();
      g.fillStyle = on ? "#8f0c21" : "rgba(255,224,138,0.75)";
      g.font = `700 13px STKaiti, KaiTi, "Songti SC", serif`;
      g.fillText(CARRIL_CHAR[i], cx, 85);
    });

    // multiplicadores ×2…×5 encima de los flippers
    [2, 3, 4, 5].forEach((m, i) => {
      const x = 145 + i * 28;
      const on = this.mult >= m;
      g.fillStyle = on ? "#ffd27a" : "rgba(60,0,10,0.6)";
      g.strokeStyle = on ? "#fff" : "rgba(242,193,78,0.6)";
      g.lineWidth = 1.2;
      g.beginPath();
      g.moveTo(x, 534);
      g.lineTo(x + 11, 545);
      g.lineTo(x, 556);
      g.lineTo(x - 11, 545);
      g.closePath();
      g.fill();
      g.stroke();
      g.fillStyle = on ? "#8f0c21" : "rgba(255,224,138,0.7)";
      g.font = `800 9px "Noto Serif", Georgia, serif`;
      g.fillText(`×${m}`, x, 546);
    });

    // tirachinas de jade
    const tri = (pts, luz) => {
      g.beginPath();
      g.moveTo(pts[0][0], pts[0][1]);
      g.lineTo(pts[1][0], pts[1][1]);
      g.lineTo(pts[2][0], pts[2][1]);
      g.closePath();
      const grad = g.createLinearGradient(pts[0][0], pts[0][1], pts[2][0], pts[2][1]);
      grad.addColorStop(0, luz > 0 ? "#c9ffe0" : "#4fae78");
      grad.addColorStop(1, luz > 0 ? "#4fae78" : "#1d6339");
      g.fillStyle = grad;
      g.fill();
      g.lineWidth = 3;
      g.strokeStyle = luz > 0 ? "#fff4c8" : ORO;
      g.stroke();
    };
    tri([[48, 452], [48, 530], [94, 566]], this.slingLuz[0]);
    tri([[326, 452], [326, 530], [280, 566]], this.slingLuz[1]);

    // rampa del dragón (cuerpo dorado)
    g.lineCap = "round";
    g.lineJoin = "round";
    g.strokeStyle = "rgba(40,0,6,0.45)";
    g.lineWidth = 20;
    this.trazarRampa(g, 3);
    const gradR = g.createLinearGradient(20, 300, 340, 60);
    gradR.addColorStop(0, "#c8961e");
    gradR.addColorStop(0.5, "#ffe08a");
    gradR.addColorStop(1, "#c8961e");
    g.strokeStyle = gradR;
    g.lineWidth = 17;
    g.globalAlpha = 0.9;
    this.trazarRampa(g, 0);
    g.globalAlpha = 1;
    g.strokeStyle = "rgba(143,12,33,0.75)";
    g.lineWidth = 9;
    this.trazarRampa(g, 0);
    // escamas: luces de la rampa
    for (let i = 4; i < RAMPA.length - 2; i += 4) {
      const p = RAMPA[i];
      const on = !this.reducido && Math.floor(t * 8 - i / 4) % 6 === 0;
      g.fillStyle = on ? "#fff4c8" : "rgba(255,224,138,0.55)";
      g.beginPath();
      g.arc(p.x, p.y, on ? 2.6 : 1.8, 0, Math.PI * 2);
      g.fill();
    }
    // cabeza del dragón al final de la rampa y boca de entrada
    this.dibujarBocaRampa(g, t);
    this.dibujarCabeza(g);

    // luces del medallón: se encienden con el combo (12 insertos)
    {
      const enc = Math.min(12, this.combo * 2 + (this.mult - 1));
      const fiestaOro = !this.reducido && this.destello && this.destello.color === "oro";
      for (let i = 0; i < 12; i++) {
        const a = (Math.PI * 2 * i) / 12 - Math.PI / 2;
        const on = i < enc || fiestaOro;
        const pulso = on && !this.reducido ? 0.75 + 0.25 * Math.sin(t * 6 + i) : 1;
        g.save();
        g.translate(187 + Math.cos(a) * 107, 384 + Math.sin(a) * 107);
        g.rotate(a + Math.PI / 2);
        g.beginPath();
        g.moveTo(0, -6);
        g.lineTo(5, 4);
        g.lineTo(-5, 4);
        g.closePath();
        g.fillStyle = on ? `rgba(255,226,140,${pulso})` : "rgba(70,0,12,0.75)";
        g.fill();
        g.strokeStyle = on ? "#fff" : "rgba(242,193,78,0.55)";
        g.lineWidth = 1;
        g.stroke();
        g.restore();
      }
    }

    // linternas
    for (const l of this.linternas) {
      const s = l.luz > 0 ? this.sprLinternaOn : this.sprLinterna;
      if (!s) continue;
      const tam = (l.r * 2 + s.pad * 2);
      const balanceo = this.reducido ? 0 : Math.sin(t * 1.6 + l.x) * 0.05;
      g.save();
      g.translate(l.x, l.y);
      g.rotate(balanceo);
      const esc = 1 + (l.luz > 0 ? l.luz * 0.12 : 0);
      g.scale(esc, esc);
      g.drawImage(s.c, -tam / 2, -tam / 2, tam, tam);
      g.restore();
      if (l.luz > 0 && !this.reducido) {
        g.strokeStyle = `rgba(255,224,138,${l.luz * 0.8})`;
        g.lineWidth = 2;
        g.beginPath();
        g.arc(l.x, l.y, l.r + (1 - l.luz) * 26, 0, Math.PI * 2);
        g.stroke();
      }
    }

    // dianas con palabras
    for (const d of this.dianas) {
      const s = d.sprite;
      const img = d.estado === "bien" ? s.bien : d.estado === "mal" ? s.mal : s.normal;
      const w = s.ancho + s.pad * 2;
      const h = s.alto + s.pad * 2;
      const esc = (0.6 + 0.4 * d.aparece) * (d.golpe > 0 ? 1 + d.golpe * 0.25 : 1);
      g.save();
      g.globalAlpha = d.aparece;
      g.translate(d.x, d.y);
      g.scale(esc, esc);
      g.drawImage(img, -w / 2, -h / 2, w, h);
      g.restore();
    }
    g.globalAlpha = 1;

    // flippers de jade
    for (const f of this.flippers) this.dibujarFlipper(g, f);

    // émbolo con muelle
    this.dibujarEmbolo(g);

    // bola con estela
    const b = this.bola;
    if (!b.rota) {
      for (let i = 0; i < this.estela.length; i++) {
        const e = this.estela[i];
        const a = (i + 1) / this.estela.length;
        g.fillStyle = `rgba(255,214,110,${a * 0.35})`;
        g.beginPath();
        g.arc(e.x, e.y, RADIO * (0.35 + a * 0.6), 0, Math.PI * 2);
        g.fill();
      }
      const s = this.sprBola;
      if (s) {
        const tam = (RADIO + s.pad) * 2;
        g.drawImage(s.c, b.x - tam / 2, b.y - tam / 2, tam, tam);
      }
    } else {
      // bola rota: fragmentos
      g.strokeStyle = "rgba(255,120,100,0.9)";
      g.lineWidth = 2;
      const r = (1 - b.rota / 0.9) * 22 + 6;
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI * 2 * i) / 6;
        g.beginPath();
        g.moveTo(b.x + Math.cos(a) * r * 0.4, b.y + Math.sin(a) * r * 0.4);
        g.lineTo(b.x + Math.cos(a) * r, b.y + Math.sin(a) * r);
        g.stroke();
      }
    }

    // partículas (estrellas de cuatro puntas)
    for (const p of this.particulas) {
      g.globalAlpha = Math.max(0, p.vida);
      g.fillStyle = p.color;
      const r = p.r * (0.5 + p.vida * 0.7);
      g.beginPath();
      g.moveTo(p.x, p.y - r * 2);
      g.lineTo(p.x + r * 0.5, p.y - r * 0.5);
      g.lineTo(p.x + r * 2, p.y);
      g.lineTo(p.x + r * 0.5, p.y + r * 0.5);
      g.lineTo(p.x, p.y + r * 2);
      g.lineTo(p.x - r * 0.5, p.y + r * 0.5);
      g.lineTo(p.x - r * 2, p.y);
      g.lineTo(p.x - r * 0.5, p.y - r * 0.5);
      g.closePath();
      g.fill();
    }
    g.globalAlpha = 1;

    // salvabola
    if (this.salvabola > 0 && this.lanzada) {
      const on = this.reducido || Math.floor(t * 4) % 2 === 0;
      g.fillStyle = on ? "rgba(159,240,192,0.95)" : "rgba(159,240,192,0.35)";
      g.font = `700 10px "Noto Serif", Georgia, serif`;
      g.fillText("SALVABOLA · 保球", 187, 690);
    }

    // reflejo del cristal
    if (this.cristal) {
      g.setTransform(1, 0, 0, 1, sx, sy);
      g.drawImage(this.cristal, 0, 0);
      g.setTransform(k, 0, 0, k, sx, sy);
    }

    // destello
    if (this.destello) {
      g.setTransform(1, 0, 0, 1, 0, 0);
      const a = this.destello.vida * (this.destello.color === "rojo" ? 0.42 : 0.32);
      g.fillStyle = this.destello.color === "rojo" ? `rgba(200,16,46,${a})` : `rgba(255,220,120,${a})`;
      g.fillRect(0, 0, W, Hc);
    }
  }

  trazarRampa(g, dy) {
    g.beginPath();
    g.moveTo(RAMPA[0].x, RAMPA[0].y + dy);
    for (let i = 1; i < RAMPA.length; i++) g.lineTo(RAMPA[i].x, RAMPA[i].y + dy);
    g.stroke();
  }

  dibujarBocaRampa(g, t) {
    const { x1, x2, y1 } = BOCA_RAMPA;
    g.fillStyle = "rgba(20,0,4,0.75)";
    g.strokeStyle = ORO;
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(x1, y1 + 26);
    g.lineTo(x1, y1 + 4);
    g.quadraticCurveTo((x1 + x2) / 2, y1 - 16, x2, y1 + 4);
    g.lineTo(x2, y1 + 26);
    g.fill();
    g.stroke();
    // flechas que parpadean hacia la boca
    for (let i = 0; i < 3; i++) {
      const on = this.reducido ? i === 0 : Math.floor(t * 5) % 3 === 2 - i;
      g.fillStyle = on ? "#ffd27a" : "rgba(242,193,78,0.3)";
      const y = y1 + 44 + i * 13;
      const x = (x1 + x2) / 2;
      g.beginPath();
      g.moveTo(x, y - 6);
      g.lineTo(x + 8, y + 3);
      g.lineTo(x - 8, y + 3);
      g.closePath();
      g.fill();
    }
    g.fillStyle = "#ffe08a";
    g.font = `700 11px STKaiti, KaiTi, "Songti SC", serif`;
    g.fillText("龙道", (x1 + x2) / 2, y1 + 14);
    // contador de rampas (3 perlas = bola extra)
    for (let i = 0; i < 3; i++) {
      g.fillStyle = i < this.rampas ? "#ffe08a" : "rgba(60,0,10,0.7)";
      g.strokeStyle = ORO_OSCURO;
      g.lineWidth = 1;
      g.beginPath();
      g.arc(x1 + 9 + i * 13, y1 + 34, 4, 0, Math.PI * 2);
      g.fill();
      g.stroke();
    }
  }

  dibujarCabeza(g) {
    const p = RAMPA[RAMPA.length - 1];
    g.save();
    g.translate(p.x, p.y);
    g.fillStyle = "#c8961e";
    g.strokeStyle = "#5a3a0a";
    g.lineWidth = 1.5;
    g.beginPath();
    g.ellipse(0, 0, 13, 11, 0, 0, Math.PI * 2);
    g.fill();
    g.stroke();
    // cuernos y bigotes
    g.strokeStyle = "#ffe08a";
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(-6, -8);
    g.quadraticCurveTo(-12, -20, -4, -24);
    g.moveTo(6, -8);
    g.quadraticCurveTo(12, -20, 4, -24);
    g.moveTo(-8, 4);
    g.quadraticCurveTo(-22, 8, -24, 18);
    g.moveTo(8, 4);
    g.quadraticCurveTo(22, 8, 24, 18);
    g.stroke();
    g.fillStyle = "#c8102e";
    g.beginPath();
    g.arc(-5, -2, 2.4, 0, Math.PI * 2);
    g.arc(5, -2, 2.4, 0, Math.PI * 2);
    g.fill();
    g.restore();
  }

  dibujarFlipper(g, f) {
    g.save();
    g.translate(f.p.x, f.p.y);
    if (f.lado < 0) g.rotate(f.ang);
    else {
      g.scale(-1, 1);
      g.rotate(f.ang);
    }
    const L = LARGO_FLIPPER;
    // sombra
    g.fillStyle = "rgba(20,0,4,0.45)";
    g.beginPath();
    g.moveTo(0, -10 + 4);
    g.lineTo(L, -6 + 4);
    g.arc(L, 4, 6, -Math.PI / 2, Math.PI / 2);
    g.lineTo(0, 14);
    g.arc(0, 4, 10, Math.PI / 2, -Math.PI / 2);
    g.fill();
    const grad = g.createLinearGradient(0, -10, 0, 10);
    grad.addColorStop(0, "#c9ffe0");
    grad.addColorStop(0.4, "#4fae78");
    grad.addColorStop(1, "#1d6339");
    g.fillStyle = grad;
    g.beginPath();
    g.moveTo(0, -10);
    g.lineTo(L, -6);
    g.arc(L, 0, 6, -Math.PI / 2, Math.PI / 2);
    g.lineTo(0, 10);
    g.arc(0, 0, 10, Math.PI / 2, -Math.PI / 2);
    g.closePath();
    g.fill();
    g.strokeStyle = f.activo ? "#fff4c8" : ORO;
    g.lineWidth = 2.6;
    g.stroke();
    // veta del jade
    g.strokeStyle = "rgba(255,255,255,0.35)";
    g.lineWidth = 1.2;
    g.beginPath();
    g.moveTo(6, -5);
    g.quadraticCurveTo(L * 0.5, -6, L - 4, -2);
    g.stroke();
    // eje dorado
    g.fillStyle = "#ffe08a";
    g.beginPath();
    g.arc(0, 0, 4, 0, Math.PI * 2);
    g.fill();
    g.restore();
  }

  dibujarEmbolo(g) {
    const py = 690 + this.embolo * 26;
    // muelle
    g.strokeStyle = "#c8961e";
    g.lineWidth = 2;
    g.beginPath();
    const vueltas = 7;
    const alto = 716 - py - 6;
    for (let i = 0; i <= vueltas * 2; i++) {
      const y = py + 6 + (alto * i) / (vueltas * 2);
      const x = i % 2 ? 370 : 387;
      if (i === 0) g.moveTo(378.5, y);
      else g.lineTo(x, y);
    }
    g.stroke();
    // cabeza del émbolo
    const grad = g.createLinearGradient(364, 0, 393, 0);
    grad.addColorStop(0, "#8a5a0a");
    grad.addColorStop(0.5, "#ffe08a");
    grad.addColorStop(1, "#8a5a0a");
    g.fillStyle = grad;
    rutaRedondeada(g, 365, py, 27, 7, 3);
    g.fill();
    // barra de fuerza
    if (this.cargando) {
      g.fillStyle = "rgba(20,0,4,0.7)";
      g.fillRect(398 - 2, 560, 3, 120);
      g.fillStyle = this.carga > 0.85 ? "#ff6b5a" : "#ffd27a";
      g.fillRect(398 - 2, 680 - 120 * this.carga, 3, 120 * this.carga);
    }
  }
}
