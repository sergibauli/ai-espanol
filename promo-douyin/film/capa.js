// Capa DOM de textos y capa 2D de efectos (tinta, grietas, velocidad).
import { clamp, seg, eOut, eBack, eIn, aleatorio, muelle } from "./motor.js";

const raiz = document.getElementById("capa");
const ELS = new Map();
let usados = new Set();
export function empezarCapa() { usados = new Set(); }
export function terminarCapa() { for (const [id, el] of ELS) if (!usados.has(id)) el.style.display = "none"; }

function nodo(id, html, cls) {
  let el = ELS.get(id);
  if (!el) {
    el = document.createElement("div");
    el.className = cls;
    el.innerHTML = html;
    raiz.appendChild(el);
    ELS.set(id, el);
  }
  usados.add(id);
  el.style.display = "";
  return el;
}
// separa el texto en letras animables (respeta etiquetas <em>)
function letras(html) {
  return html.replace(/(<[^>]+>)|([^<])/g, (m, tag, ch) => (tag ? tag : ch === " " ? " " : `<span class="ch">${ch}</span>`));
}

/**
 * Texto animado.
 * lt: tiempo local (s) · ini/fin: cuándo está en pantalla
 * entrada: golpe | pincel | sube | pop | letras | zoom
 * pos: { y, x?, ancla? } en píxeles del lienzo 1080×1920 (y = centro vertical)
 */
export function texto(id, html, cls, lt, ini, fin, { y = 300, x = null, entrada = "sube", salida = "sube", dur = 0.32, rot = 0, temblor = 0, escala = 1 } = {}) {
  if (lt < ini || lt > fin) return null;
  const el = nodo(id, entrada === "letras" ? letras(html) : html, "t " + cls);
  const a = seg(lt, ini, ini + dur), b = seg(lt, fin - 0.22, fin);
  let op = 1, tx = 0, ty = 0, sc = escala, r = rot, clip = "none";
  switch (entrada) {
    case "golpe": sc *= 1 + 1.6 * (1 - eOut(a)); op = clamp(a * 3); break;
    case "pop": sc *= eBack(a, 2.2); op = clamp(a * 4); break;
    case "zoom": sc *= 0.3 + 0.7 * eOut(a); op = a; break;
    case "pincel": clip = `inset(-30% ${(1 - eOut(a)) * 100}% -30% 0)`; ty = 0; break;
    case "letras": {
      const chs = el.querySelectorAll(".ch");
      chs.forEach((c, i) => {
        const k = seg(lt, ini + i * 0.045, ini + i * 0.045 + 0.28);
        c.style.opacity = clamp(k * 3);
        c.style.transform = `translateY(${(1 - eOut(k)) * 70}px) scale(${0.4 + 0.6 * eBack(k, 2.4)})`;
      });
      break;
    }
    default: ty = (1 - eOut(a)) * 70; op = a;
  }
  if (temblor && a >= 1) { const k = Math.max(0, 1 - (lt - ini - dur) * 4); tx += Math.sin(lt * 90) * temblor * k; ty += Math.cos(lt * 77) * temblor * k; }
  if (b > 0) {
    if (salida === "golpe") { sc *= 1 + 0.5 * eIn(b); }
    else if (salida === "izq") tx -= 1200 * eIn(b);
    else ty -= 60 * eIn(b);
    op *= 1 - b;
  }
  el.style.opacity = op;
  el.style.clipPath = clip;
  const left = x === null ? 0 : x - 540;
  el.style.top = "0px";
  el.style.transform = `translate(${left + tx}px, ${y - el.offsetHeight / 2 + ty}px) rotate(${r}deg) scale(${sc})`;
  return el;
}

/** Píldora con palabra en español + traducción. pos = centro. */
export function chip(id, es, zh, lt, ini, fin, { x = 540, y = 1400, cls = "", rot = 0, flota = 1 } = {}) {
  if (lt < ini || lt > fin) return null;
  const el = nodo(id, `<b>${es}</b>${zh ? `<i>${zh}</i>` : ""}`, "chip " + cls);
  const a = seg(lt, ini, ini + 0.35), b = seg(lt, fin - 0.2, fin);
  const sc = eBack(a, 2.6) * (1 - 0.3 * b);
  const fy = Math.sin((lt - ini) * 2.4) * 8 * flota;
  el.style.opacity = clamp(a * 4) * (1 - b);
  el.style.left = "0px"; el.style.top = "0px";
  el.style.transform = `translate(${x - el.offsetWidth / 2}px, ${y - el.offsetHeight / 2 + fy}px) rotate(${rot * (1 - a * 0.3)}deg) scale(${sc})`;
  return el;
}

/** Elemento libre (sello, QR, burbuja, cifra…) */
export function libre(id, html, cls, lt, ini, fin, { x = 540, y = 960, entrada = "pop", rot = 0, escala = 1, dur = 0.35 } = {}) {
  if (lt < ini || lt > fin) return null;
  const el = nodo(id, html, cls);
  const a = seg(lt, ini, ini + dur), b = seg(lt, fin - 0.2, fin);
  let sc = escala, op = 1, ty = 0;
  if (entrada === "pop") { sc *= eBack(a, 2.2); op = clamp(a * 4); }
  else if (entrada === "golpe") { sc *= 1 + 1.4 * (1 - eOut(a)); op = clamp(a * 3); }
  else { ty = (1 - eOut(a)) * 60; op = a; }
  op *= 1 - b; sc *= 1 - 0.2 * b;
  el.style.opacity = op;
  el.style.left = "0px"; el.style.top = "0px";
  el.style.transform = `translate(${x - el.offsetWidth / 2}px, ${y - el.offsetHeight / 2 + ty}px) rotate(${rot}deg) scale(${sc})`;
  return el;
}
export function destello(k) { document.getElementById("destello").style.opacity = clamp(k); }

// ---------------- efectos 2D ----------------
const fx = document.getElementById("fx").getContext("2d");
export function limpiarFx() { fx.clearRect(0, 0, 1080, 1920); }

/** Grietas doradas desde (cx, cy). k 0→1 crecimiento */
const rg = aleatorio(31);
const GRIETAS = Array.from({ length: 16 }, (_, i) => {
  const ang = (i / 16) * Math.PI * 2 + rg() * 0.3; const pts = [[0, 0]]; let a = ang, x = 0, y = 0;
  for (let k = 0; k < 9; k++) { a += (rg() - 0.5) * 0.7; const l = 50 + rg() * 90; x += Math.cos(a) * l; y += Math.sin(a) * l; pts.push([x, y]); }
  const ramas = pts.slice(2, 7).filter(() => rg() > 0.45).map(([bx, by]) => { const ba = a + (rg() - 0.5) * 2; return [[bx, by], [bx + Math.cos(ba) * 90, by + Math.sin(ba) * 90]]; });
  return { pts, ramas };
});
export function grietas(k, cx = 540, cy = 860) {
  if (k <= 0) return;
  fx.save(); fx.translate(cx, cy);
  fx.lineCap = "round"; fx.lineJoin = "round";
  for (const capa of [{ w: 16, c: "rgba(255,170,40,0.35)" }, { w: 6, c: "#ffd56a" }, { w: 2, c: "#fffbe6" }]) {
    fx.strokeStyle = capa.c; fx.lineWidth = capa.w; fx.shadowColor = "#ffb300"; fx.shadowBlur = capa.w * 2;
    for (const g of GRIETAS) {
      const n = Math.floor(k * (g.pts.length - 1));
      fx.beginPath(); fx.moveTo(0, 0);
      for (let i = 1; i <= n; i++) fx.lineTo(g.pts[i][0], g.pts[i][1]);
      fx.stroke();
      if (k > 0.6) for (const [[a, b], [c, d]] of g.ramas) { fx.beginPath(); fx.moveTo(a, b); fx.lineTo(a + (c - a) * seg(k, 0.6, 1), b + (d - b) * seg(k, 0.6, 1)); fx.stroke(); }
    }
  }
  fx.restore();
}
/** Líneas de velocidad radiales (anime) */
const rv = aleatorio(57);
const LINEAS = Array.from({ length: 90 }, () => ({ a: rv() * Math.PI * 2, r0: 380 + rv() * 400, l: 200 + rv() * 500, w: 2 + rv() * 7, f: rv() }));
export function velocidad(k, t, cx = 540, cy = 900) {
  if (k <= 0) return;
  fx.save(); fx.translate(cx, cy);
  for (const L of LINEAS) {
    const fase = (t * 3 + L.f) % 1;
    const r0 = L.r0 + fase * 600;
    fx.strokeStyle = `rgba(255,240,200,${0.55 * k * (1 - fase)})`; fx.lineWidth = L.w;
    fx.beginPath(); fx.moveTo(Math.cos(L.a) * r0, Math.sin(L.a) * r0); fx.lineTo(Math.cos(L.a) * (r0 + L.l), Math.sin(L.a) * (r0 + L.l)); fx.stroke();
  }
  fx.restore();
}
/** Mancha de tinta que cubre la pantalla (transición). k 0→1 cubre; color */
const rt = aleatorio(77);
const MANCHAS = Array.from({ length: 46 }, (_, i) => ({ x: rt() * 1080, y: rt() * 1920, r: 120 + rt() * 380, d: rt() * 0.5 }));
export function tinta(k, color = "#120a06", cx = 540, cy = 960) {
  if (k <= 0) return;
  fx.save(); fx.fillStyle = color;
  if (k >= 1) { fx.fillRect(0, 0, 1080, 1920); fx.restore(); return; }
  for (const m of MANCHAS) {
    const kk = seg(k, m.d, m.d + 0.5);
    if (kk <= 0) continue;
    const x = cx + (m.x - cx) * (0.3 + 0.7 * kk), y = cy + (m.y - cy) * (0.3 + 0.7 * kk);
    fx.beginPath();
    for (let a = 0; a <= 24; a++) { const ang = (a / 24) * Math.PI * 2; const rr = m.r * eOut(kk) * (1 + 0.18 * Math.sin(ang * 5 + m.r)); fx[a ? "lineTo" : "moveTo"](x + Math.cos(ang) * rr, y + Math.sin(ang) * rr); }
    fx.fill();
    // salpicaduras
    for (let s = 0; s < 4; s++) { const ang = m.r + s * 1.7; const d = m.r * (1.2 + 0.4 * s) * eOut(kk); fx.beginPath(); fx.arc(x + Math.cos(ang) * d, y + Math.sin(ang) * d, 10 + s * 6 * kk, 0, 7); fx.fill(); }
  }
  fx.restore();
}
/** Barra de progreso/sonido animada (ondas de voz) */
export function ondas(k, t, x, y, ancho = 260, color = "#f2c14e") {
  if (k <= 0) return;
  fx.save(); fx.globalAlpha = k; fx.fillStyle = color;
  const n = 15;
  for (let i = 0; i < n; i++) {
    const h = 16 + Math.abs(Math.sin(t * 9 + i * 0.9) * Math.sin(t * 3.3 + i * 0.4)) * 90;
    const bx = x - ancho / 2 + (i / (n - 1)) * ancho;
    fx.beginPath(); fx.roundRect(bx - 6, y - h / 2, 12, h, 6); fx.fill();
  }
  fx.restore();
}
export { fx };
