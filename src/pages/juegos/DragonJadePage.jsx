// Dragón de jade · 玉龙 — arcade en canvas 2D: guía al dragón y cómete la perla con la palabra correcta.
import * as React from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";
import { PauseIcon, PlayIcon, Volume2Icon, VolumeXIcon, HeartIcon, RotateCcwIcon, MaximizeIcon, MinimizeIcon, LayersIcon, TrophyIcon, ZapIcon } from "lucide-react";
import { useSound } from "../../lib/sound.jsx";
import { speak } from "../../components/lesson/fx.js";
import { addXp } from "../../lib/gamification.js";
import { todasLasPalabras } from "../../lib/contenidoJuego.js";
import {
  barajar,
  limpiar,
  sinAcentos,
  tieneChino,
  useContenidoJuego,
  claveRecord,
  leerNumero,
  guardarNumero,
  usePrefiereMenosMovimiento,
  SelectorUnidad,
  Sello,
  Volver,
  etiquetaContenido,
  frasesDeClase,
  palabrasDe,
} from "./jbComun.jsx";
import "../../styles/v13-juegos-b.css";

const ACIERTOS_POR_NIVEL = 5;
const NIVELES_ANTES_DEL_JEFE = 3;
const VIDAS = 3;

// ---------- Contenido ----------
function construirPreguntas(c) {
  const vocab = (c.vocabulario || []).filter((v) => limpiar(v.espanol).length <= 26 && limpiar(v.chino));
  const relleno = vocab.length < 8 ? barajar(todasLasPalabras().filter((v) => limpiar(v.espanol).length <= 18)).slice(0, 30) : [];
  const preguntas = vocab.map((v) => ({ tipo: "vocab", zh: limpiar(v.chino), es: limpiar(v.espanol) }));
  const huecos = [];
  for (const e of c.ejercicios?.completar || []) {
    const resp = limpiar(e?.respuestaCorrecta);
    const preg = limpiar(e?.pregunta);
    if (!resp || resp.length > 22 || !/_{2,}/.test(preg)) continue;
    const zh = limpiar(e.preguntaChino);
    huecos.push({ tipo: "hueco", frase: preg.replace(/_{2,}/, "＿＿＿"), zh: zh && zh !== preg && tieneChino(zh) ? zh : "", es: resp });
  }
  for (const t of c.teoria || [])
    for (const ej of t?.ejemplos || []) {
      const palabras = palabrasDe(ej?.espanol);
      if (palabras.length < 3 || palabras.length > 10 || !ej?.chino || huecos.length > 12) continue;
      const candidatas = palabras.map((p, i) => [p.replace(/[¿?¡!.,;:«»"()—–-]/g, ""), i]).filter(([p]) => p.length >= 3);
      if (!candidatas.length) continue;
      const [palabra, indice] = candidatas[Math.floor(Math.random() * candidatas.length)];
      const frase = palabras.map((p, i) => (i === indice ? p.replace(palabra, "＿＿＿") : p)).join(" ");
      huecos.push({ tipo: "hueco", frase, zh: limpiar(ej.chino), es: palabra });
    }
  const lista = [...preguntas, ...barajar(huecos).slice(0, Math.max(3, Math.round(preguntas.length * 0.5)))];
  if (lista.length < 4) for (const v of relleno) lista.push({ tipo: "vocab", zh: limpiar(v.chino), es: limpiar(v.espanol) });
  const banco = [...new Set([...vocab, ...relleno].map((v) => limpiar(v.espanol)).concat(huecos.map((h) => h.es)))];
  const frases = frasesDeClase(c, 3, 7);
  const frase = frases.length ? frases[Math.floor(Math.random() * frases.length)] : frasesDeClase({ vocabulario: relleno }, 3, 7)[0] || { texto: "El dragón de jade vuela alto", zh: "玉龙高高飞翔" };
  return { preguntas: barajar(lista), banco, frase };
}

function distractores(correcta, banco, n, mismoTipo = []) {
  const clave = sinAcentos(correcta);
  const usadas = new Set([clave]);
  const fuera = (t) => {
    const k = sinAcentos(t);
    if (!k || usadas.has(k)) return false;
    usadas.add(k);
    return true;
  };
  const preferidas = barajar(mismoTipo).filter(fuera);
  const resto = barajar(banco)
    .sort((a, b) => Math.abs(a.length - correcta.length) - Math.abs(b.length - correcta.length) + (Math.random() - 0.5) * 6)
    .filter(fuera);
  return [...preferidas, ...resto].slice(0, n);
}

// ---------- Sprites de brillo (una sola vez) ----------
const cacheBrillo = new Map();
function brillo(color) {
  if (cacheBrillo.has(color)) return cacheBrillo.get(color);
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, color);
  gr.addColorStop(0.35, color.replace(/[\d.]+\)$/, "0.45)"));
  gr.addColorStop(1, color.replace(/[\d.]+\)$/, "0)"));
  g.fillStyle = gr;
  g.fillRect(0, 0, 64, 64);
  cacheBrillo.set(color, c);
  return c;
}
const ORO = "rgba(242,193,78,1)";
const JADE = "rgba(110,231,183,1)";
const ROJO = "rgba(255,90,90,1)";
const LUNA = "rgba(255,236,190,1)";

function redondeado(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

// ---------- Motor ----------
function crearEstado() {
  return {
    w: 800,
    h: 600,
    dpr: 1,
    escala: 1,
    arriba: 120,
    t: 0,
    cabeza: { x: 200, y: 400 },
    vel: { x: 120, y: -20 },
    objetivo: null,
    teclas: new Set(),
    camino: [],
    segmentos: 22,
    perlas: [],
    particulas: [],
    textos: [],
    estrellas: [],
    nubes: [],
    farolillos: [],
    montes: [],
    sacudida: 0,
    destello: 0,
    destelloColor: "255,60,60",
    invulnerable: 0,
    fase: "inicio",
    nivel: 1,
    aciertosNivel: 0,
    aciertos: 0,
    combo: 0,
    comboMax: 0,
    puntos: 0,
    vidas: VIDAS,
    pregunta: null,
    indicePregunta: 0,
    esperaSiguiente: 0,
    jefe: null,
    comidas: [],
  };
}

function prepararFondo(S) {
  const { w, h } = S;
  const rnd = (a, b) => a + Math.random() * (b - a);
  S.estrellas = Array.from({ length: Math.round((w * h) / 5200) }, () => ({ x: Math.random() * w, y: Math.random() * h * 0.85, r: rnd(0.4, 1.6), f: rnd(0, 6.3), v: rnd(0.6, 2.2), p: rnd(0.15, 0.6) }));
  S.nubes = Array.from({ length: 9 }, (_, i) => {
    const capa = i % 3;
    return { x: Math.random() * w, y: rnd(h * 0.1, h * 0.9), capa, s: [0.7, 1.1, 1.7][capa] * S.escala * rnd(0.8, 1.3), v: [6, 14, 26][capa], a: [0.1, 0.16, 0.24][capa] };
  });
  S.farolillos = Array.from({ length: 7 }, () => ({ x: Math.random() * w, y: rnd(0, h), v: rnd(8, 18), s: rnd(0.5, 1) * S.escala, f: rnd(0, 6) }));
  // Montañas de tinta: tres capas de siluetas
  S.montes = [0, 1, 2].map((capa) => {
    const puntos = [];
    const paso = 40 + capa * 20;
    let y = h * (0.78 + capa * 0.06);
    for (let x = -100; x <= w + 200; x += paso) {
      y = Math.min(h * 0.97, Math.max(h * (0.62 + capa * 0.07), y + rnd(-40, 40)));
      puntos.push([x, y]);
    }
    return { capa, puntos };
  });
}

function dibujarFondo(g, S, imgNube, reducido) {
  const { w, h, t } = S;
  const px = (S.cabeza.x - w / 2) / w;
  const py = (S.cabeza.y - h / 2) / h;
  const cielo = g.createLinearGradient(0, 0, 0, h);
  cielo.addColorStop(0, "#050a1f");
  cielo.addColorStop(0.55, "#0f1a3d");
  cielo.addColorStop(1, "#2a1530");
  g.fillStyle = cielo;
  g.fillRect(0, 0, w, h);
  // Estrellas
  for (const e of S.estrellas) {
    const a = reducido ? 0.7 : 0.45 + Math.sin(t * e.v + e.f) * 0.4;
    g.globalAlpha = Math.max(0.1, a);
    g.fillStyle = "#fff6dc";
    g.fillRect(e.x - px * 10 * e.p, e.y - py * 8 * e.p, e.r, e.r);
  }
  g.globalAlpha = 1;
  // Luna
  const lx = w * 0.82 - px * 14;
  const ly = h * 0.2 - py * 10;
  const lr = Math.min(w, h) * 0.07;
  g.globalCompositeOperation = "lighter";
  g.drawImage(brillo("rgba(255,214,140,0.55)"), lx - lr * 4, ly - lr * 4, lr * 8, lr * 8);
  g.globalCompositeOperation = "source-over";
  const gl = g.createRadialGradient(lx - lr * 0.3, ly - lr * 0.3, lr * 0.1, lx, ly, lr);
  gl.addColorStop(0, "#fff8e1");
  gl.addColorStop(1, "#f2c14e");
  g.fillStyle = gl;
  g.beginPath();
  g.arc(lx, ly, lr, 0, Math.PI * 2);
  g.fill();
  // Farolillos que suben a lo lejos
  for (const f of S.farolillos) {
    const x = f.x - px * 20 + Math.sin(t * 0.6 + f.f) * 6;
    g.globalCompositeOperation = "lighter";
    g.drawImage(brillo("rgba(255,150,60,0.5)"), x - 18 * f.s, f.y - 18 * f.s, 36 * f.s, 36 * f.s);
    g.globalCompositeOperation = "source-over";
    g.fillStyle = "#e8552a";
    redondeado(g, x - 4 * f.s, f.y - 6 * f.s, 8 * f.s, 11 * f.s, 3 * f.s);
    g.fill();
  }
  // Montañas
  const coloresMonte = ["rgba(36,40,82,0.85)", "rgba(24,26,58,0.92)", "rgba(14,14,34,1)"];
  for (const m of S.montes) {
    const off = -px * (12 + m.capa * 18);
    g.fillStyle = coloresMonte[m.capa];
    g.beginPath();
    g.moveTo(-100, h + 10);
    for (let i = 0; i < m.puntos.length; i++) {
      const [x, y] = m.puntos[i];
      const prev = m.puntos[i - 1];
      if (!prev) g.lineTo(x + off, y);
      else g.quadraticCurveTo(prev[0] + off, prev[1], (prev[0] + x) / 2 + off, (prev[1] + y) / 2);
    }
    g.lineTo(w + 200, h + 10);
    g.closePath();
    g.fill();
    if (m.capa < 2) {
      const niebla = g.createLinearGradient(0, h * 0.7, 0, h);
      niebla.addColorStop(0, "rgba(200,170,220,0)");
      niebla.addColorStop(1, "rgba(200,170,220,0.06)");
      g.fillStyle = niebla;
      g.fillRect(0, h * 0.7, w, h * 0.3);
    }
  }
  // Nubes doradas en parallax
  if (imgNube?.complete && imgNube.naturalWidth) {
    for (const n of S.nubes) {
      const ancho = 200 * n.s;
      const x = ((n.x - px * (10 + n.capa * 25)) % (w + ancho * 2)) - ancho;
      g.globalAlpha = n.a;
      g.drawImage(imgNube, x, n.y - py * (6 + n.capa * 12), ancho, 70 * n.s);
    }
    g.globalAlpha = 1;
  }
}

function avanzarFondo(S, dt, reducido) {
  const k = reducido ? 0.15 : 1;
  for (const n of S.nubes) n.x = (n.x + n.v * dt * k) % (S.w + 600);
  for (const f of S.farolillos) {
    f.y -= f.v * dt * k;
    if (f.y < -30) {
      f.y = S.h + 30;
      f.x = Math.random() * S.w;
    }
  }
}

// Posición de cada segmento a lo largo del camino que ha dejado la cabeza
function posicionesCuerpo(S) {
  const sep = 9 * S.escala;
  const pos = [{ x: S.cabeza.x, y: S.cabeza.y }];
  const camino = S.camino;
  let i = camino.length - 1;
  let prev = { x: S.cabeza.x, y: S.cabeza.y };
  let acumulado = 0;
  for (let s = 1; s <= S.segmentos; s++) {
    const meta = s * sep;
    while (i >= 0) {
      const p = camino[i];
      const d = Math.hypot(p.x - prev.x, p.y - prev.y);
      if (acumulado + d >= meta) {
        const f = (meta - acumulado) / (d || 1);
        const q = { x: prev.x + (p.x - prev.x) * f, y: prev.y + (p.y - prev.y) * f };
        acumulado = meta;
        prev = q;
        break;
      }
      acumulado += d;
      prev = p;
      i--;
    }
    if (i < 0) {
      const ult = pos[pos.length - 1];
      const ang = Math.atan2(S.vel.y, S.vel.x);
      pos.push({ x: ult.x - Math.cos(ang) * sep, y: ult.y - Math.sin(ang) * sep });
      prev = pos[pos.length - 1];
    } else pos.push(prev);
  }
  return pos;
}

function dibujarDragon(g, S, reducido) {
  const pos = posicionesCuerpo(S);
  const n = pos.length;
  const E = S.escala;
  const t = S.t;
  if (S.invulnerable > 0 && Math.floor(S.invulnerable * 12) % 2 === 0) g.globalAlpha = 0.45;
  // Ondulación lateral para que el cuerpo «nade»
  const ond = pos.map((p, i) => {
    if (i === 0) return p;
    const a = pos[i - 1];
    const dx = a.x - p.x;
    const dy = a.y - p.y;
    const d = Math.hypot(dx, dy) || 1;
    const amp = reducido ? 0 : Math.sin(t * 5 - i * 0.32) * 3.6 * E * Math.min(1, i / 4);
    return { x: p.x + (-dy / d) * amp, y: p.y + (dx / d) * amp, nx: -dy / d, ny: dx / d, ang: Math.atan2(dy, dx) };
  });
  ond[0].ang = Math.atan2(S.vel.y, S.vel.x);
  // Cola de llama
  const cola = ond[n - 1];
  const angCola = cola.ang ?? 0;
  g.save();
  g.translate(cola.x, cola.y);
  g.rotate(angCola + Math.PI);
  for (let k = -2; k <= 2; k++) {
    g.fillStyle = k % 2 ? "#c8102e" : "#f2c14e";
    g.beginPath();
    g.moveTo(0, 0);
    const ondea = reducido ? 0 : Math.sin(t * 8 + k) * 3;
    g.quadraticCurveTo(14 * E, k * 6 * E + ondea, 26 * E, k * 9 * E + ondea);
    g.quadraticCurveTo(12 * E, k * 3 * E, 0, 2 * E);
    g.fill();
  }
  g.restore();
  // Cuerpo continuo: contorno con grosor variable
  const h0 = ond[0];
  h0.nx = -Math.sin(h0.ang);
  h0.ny = Math.cos(h0.ang);
  const radio = (i) => (25 - (i / n) * 18) * E;
  const izq = [];
  const der = [];
  for (let i = 0; i < n; i++) {
    const p = ond[i];
    const r = radio(i);
    izq.push([p.x + p.nx * r, p.y + p.ny * r]);
    der.push([p.x - p.nx * r, p.y - p.ny * r]);
  }
  // Aletas dorsales (detrás del cuerpo)
  for (let i = 2; i < n - 1; i += 2) {
    const p = ond[i];
    const r = radio(i);
    g.fillStyle = i % 4 === 0 ? "#f2c14e" : "#e8552a";
    g.beginPath();
    g.moveTo(p.x + p.nx * r * 0.7 - Math.cos(p.ang) * r * 0.7, p.y + p.ny * r * 0.7 - Math.sin(p.ang) * r * 0.7);
    g.lineTo(p.x + p.nx * r * 1.7 - Math.cos(p.ang) * r * 0.5, p.y + p.ny * r * 1.7 - Math.sin(p.ang) * r * 0.5);
    g.lineTo(p.x + p.nx * r * 0.7 + Math.cos(p.ang) * r * 0.5, p.y + p.ny * r * 0.7 + Math.sin(p.ang) * r * 0.5);
    g.fill();
  }
  // Patas con garras
  for (const i of [Math.round(n * 0.18), Math.round(n * 0.55)]) {
    const p = ond[i];
    if (!p || i === 0) continue;
    const r = radio(i);
    g.strokeStyle = "#c8961e";
    g.lineWidth = 4 * E;
    g.lineCap = "round";
    for (const lado of [-1, 1]) {
      const mueve = reducido ? 0 : Math.sin(t * 6 + lado + i) * 4 * E;
      const fx = p.x - p.nx * (r + 12 * E) - Math.cos(p.ang) * (6 * E + lado * 8 * E + mueve);
      const fy = p.y - p.ny * (r + 12 * E) - Math.sin(p.ang) * (6 * E + lado * 8 * E + mueve);
      g.beginPath();
      g.moveTo(p.x, p.y);
      g.lineTo(fx, fy);
      g.stroke();
      g.lineWidth = 2.2 * E;
      for (const c of [-0.6, 0, 0.6]) {
        g.beginPath();
        g.moveTo(fx, fy);
        g.lineTo(fx + Math.cos(p.ang + c) * 6 * E, fy + Math.sin(p.ang + c) * 6 * E);
        g.stroke();
      }
      g.lineWidth = 4 * E;
    }
  }
  g.beginPath();
  g.moveTo(izq[0][0], izq[0][1]);
  for (let i = 1; i < n; i++) g.lineTo(izq[i][0], izq[i][1]);
  for (let i = n - 1; i >= 0; i--) g.lineTo(der[i][0], der[i][1]);
  g.closePath();
  const gc = g.createLinearGradient(ond[0].x, ond[0].y, ond[n - 1].x, ond[n - 1].y);
  gc.addColorStop(0, "#21a774");
  gc.addColorStop(1, "#0d5c43");
  g.fillStyle = gc;
  g.fill();
  g.strokeStyle = "#08392a";
  g.lineWidth = 2 * E;
  g.stroke();
  // Brillo del lomo y vientre dorado
  g.lineCap = "round";
  for (let i = 1; i < n - 1; i++) {
    const a = ond[i];
    const b = ond[i + 1];
    const r = radio(i);
    g.strokeStyle = "rgba(160,245,205,0.55)";
    g.lineWidth = r * 0.35;
    g.beginPath();
    g.moveTo(a.x + a.nx * r * 0.45, a.y + a.ny * r * 0.45);
    g.lineTo(b.x + b.nx * r * 0.45, b.y + b.ny * r * 0.45);
    g.stroke();
    g.strokeStyle = "rgba(255,222,140,0.85)";
    g.lineWidth = r * 0.42;
    g.beginPath();
    g.moveTo(a.x - a.nx * r * 0.6, a.y - a.ny * r * 0.6);
    g.lineTo(b.x - b.nx * r * 0.6, b.y - b.ny * r * 0.6);
    g.stroke();
  }
  // Escamas doradas
  g.strokeStyle = "rgba(242,193,78,0.8)";
  g.lineWidth = 1.4 * E;
  for (let i = 2; i < n - 1; i++) {
    const p = ond[i];
    const r = radio(i) * 0.55;
    g.beginPath();
    g.arc(p.x + p.nx * r * 0.2, p.y + p.ny * r * 0.2, r, p.ang + Math.PI * 0.6, p.ang + Math.PI * 1.4);
    g.stroke();
  }
  // Cabeza
  const c = ond[0];
  const ang = c.ang;
  const mira = Math.cos(ang) < 0 ? -1 : 1;
  g.save();
  g.translate(c.x, c.y);
  g.rotate(ang);
  g.scale(E * 1.35, E * 1.35 * mira);
  // Melena
  for (let k = 0; k < 7; k++) {
    const a = Math.PI * (0.55 + k * 0.13);
    const largo = 22 + (k % 2) * 8 + (reducido ? 0 : Math.sin(t * 7 + k) * 3);
    g.fillStyle = k % 2 ? "#c8102e" : "#e8552a";
    g.beginPath();
    g.moveTo(-6, 0);
    g.lineTo(-6 + Math.cos(a) * largo, Math.sin(a) * largo - 6);
    g.lineTo(-2 + Math.cos(a + 0.25) * 10, Math.sin(a + 0.25) * 10);
    g.fill();
  }
  // Cuernos
  g.strokeStyle = "#f2c14e";
  g.lineWidth = 3.2;
  g.lineCap = "round";
  g.beginPath();
  g.moveTo(-2, -10);
  g.quadraticCurveTo(-16, -26, -30, -24);
  g.moveTo(-12, -18);
  g.lineTo(-14, -28);
  g.stroke();
  // Cráneo y hocico
  const gh = g.createLinearGradient(0, -14, 0, 14);
  gh.addColorStop(0, "#6fe0ac");
  gh.addColorStop(0.6, "#178a5e");
  gh.addColorStop(1, "#0a4632");
  g.fillStyle = gh;
  g.beginPath();
  g.moveTo(-14, -12);
  g.quadraticCurveTo(6, -18, 26, -8);
  g.quadraticCurveTo(34, -5, 33, 0);
  g.lineTo(18, 2);
  g.lineTo(-12, 10);
  g.quadraticCurveTo(-20, 0, -14, -12);
  g.fill();
  // Mandíbula y boca roja
  g.fillStyle = "#8f0c21";
  g.beginPath();
  g.moveTo(18, 2);
  g.lineTo(31, 2);
  g.lineTo(26, 9);
  g.lineTo(-6, 12);
  g.fill();
  g.fillStyle = "#1f9d6b";
  g.beginPath();
  g.moveTo(-8, 10);
  g.quadraticCurveTo(12, 16, 27, 9);
  g.lineTo(24, 14);
  g.quadraticCurveTo(6, 20, -10, 13);
  g.fill();
  // Cejas y escamas de la nariz
  g.fillStyle = "#f2c14e";
  g.beginPath();
  g.moveTo(2, -12);
  g.quadraticCurveTo(10, -18, 16, -11);
  g.quadraticCurveTo(9, -13, 2, -9);
  g.fill();
  g.beginPath();
  g.arc(30, -3, 1.6, 0, Math.PI * 2);
  g.fill();
  // Ojo
  g.globalCompositeOperation = "lighter";
  g.drawImage(brillo("rgba(255,200,80,0.8)"), 0, -16, 16, 16);
  g.globalCompositeOperation = "source-over";
  g.fillStyle = "#fff3c4";
  g.beginPath();
  g.ellipse(9, -8, 4.2, 3.2, -0.2, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "#1a0f08";
  g.beginPath();
  g.ellipse(10, -8, 1.4, 2.8, 0, 0, Math.PI * 2);
  g.fill();
  // Bigotes
  g.strokeStyle = "rgba(242,193,78,0.95)";
  g.lineWidth = 1.6;
  for (const lado of [0, 1]) {
    const o = reducido ? 0 : Math.sin(t * 4 + lado * 1.7) * 8;
    g.beginPath();
    g.moveTo(26, 2 + lado * 2);
    g.bezierCurveTo(14, 18 + o, -10, 6 - o, -30, 22 + o + lado * 6);
    g.stroke();
  }
  g.restore();
  g.globalAlpha = 1;
  return ond;
}

function medirPerla(g, perla, E) {
  g.font = `700 ${Math.round(17 * Math.max(E, 0.92))}px system-ui, -apple-system, "Segoe UI", sans-serif`;
  perla.ancho = Math.max(56 * E, g.measureText(perla.texto).width + 26 * Math.max(E, 0.85));
  perla.alto = 38 * Math.max(E, 0.85);
}

function dibujarPerla(g, p, S) {
  const E = S.escala;
  const nace = Math.min(1, (S.t - p.nacida) * 4);
  const s = p.muere ? Math.max(0, 1 - (S.t - p.muere) * 5) : 1 - Math.pow(1 - nace, 3);
  if (s <= 0) return;
  const x = p.x;
  const y = p.y + Math.sin(S.t * 2 + p.fase) * 3 * E;
  g.save();
  g.translate(x, y);
  g.scale(s, s);
  // Halo
  g.globalCompositeOperation = "lighter";
  const halo = p.jefe ? "rgba(170,140,255,0.55)" : "rgba(255,160,70,0.5)";
  g.drawImage(brillo(halo), -p.ancho * 0.8, -p.alto * 1.4, p.ancho * 1.6, p.alto * 2.8);
  g.globalCompositeOperation = "source-over";
  // Cordón y tapa
  g.strokeStyle = "#c8961e";
  g.lineWidth = 1.5 * E;
  g.beginPath();
  g.moveTo(0, -p.alto / 2 - 12 * E);
  g.lineTo(0, -p.alto / 2);
  g.stroke();
  // Cuerpo del farol
  const w = p.ancho;
  const h = p.alto;
  const gr = g.createLinearGradient(0, -h / 2, 0, h / 2);
  if (p.jefe) {
    gr.addColorStop(0, "#3a2f7a");
    gr.addColorStop(1, "#1d1645");
  } else {
    gr.addColorStop(0, "#e01b3c");
    gr.addColorStop(1, "#8f0c21");
  }
  g.fillStyle = gr;
  redondeado(g, -w / 2, -h / 2, w, h, h / 2);
  g.fill();
  g.strokeStyle = "#f2c14e";
  g.lineWidth = 2 * E;
  g.stroke();
  // Tapas doradas
  g.fillStyle = "#f2c14e";
  redondeado(g, -w * 0.22, -h / 2 - 4 * E, w * 0.44, 6 * E, 2 * E);
  g.fill();
  redondeado(g, -w * 0.22, h / 2 - 2 * E, w * 0.44, 6 * E, 2 * E);
  g.fill();
  // Borla
  g.strokeStyle = "#f2c14e";
  g.lineWidth = 1.4 * E;
  for (let k = -2; k <= 2; k++) {
    g.beginPath();
    g.moveTo(k * 1.6 * E, h / 2 + 4 * E);
    g.lineTo(k * 2.2 * E, h / 2 + 14 * E);
    g.stroke();
  }
  // Texto
  g.fillStyle = "#fffaf0";
  g.font = `700 ${Math.round(17 * Math.max(E, 0.92))}px system-ui, -apple-system, "Segoe UI", sans-serif`;
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(p.texto, 0, 1);
  g.restore();
}

function dibujarJefe(g, S, reducido) {
  const J = S.jefe;
  if (!J) return;
  const E = S.escala;
  const t = S.t;
  const x = J.x;
  const y = J.y;
  const enfado = J.golpe > 0 ? 1 : 0;
  g.save();
  g.translate(x, y);
  if (!reducido && J.golpe > 0) g.translate((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6);
  g.globalCompositeOperation = "lighter";
  g.drawImage(brillo(enfado ? "rgba(255,120,120,0.5)" : "rgba(140,110,255,0.45)"), -170 * E, -90 * E, 340 * E, 180 * E);
  g.globalCompositeOperation = "source-over";
  const bolas = [
    [-80, 10, 40],
    [-40, -18, 48],
    [10, -26, 54],
    [60, -10, 46],
    [95, 14, 34],
    [-10, 18, 50],
    [45, 22, 40],
    [-62, 26, 30],
  ];
  for (const [bx, by, br] of bolas) {
    const ondula = reducido ? 0 : Math.sin(t * 1.6 + bx) * 3;
    const gr = g.createRadialGradient((bx - br * 0.3) * E, (by - br * 0.4) * E, 4, bx * E, by * E, br * E);
    gr.addColorStop(0, "#56607f");
    gr.addColorStop(1, "#1b2034");
    g.fillStyle = gr;
    g.beginPath();
    g.arc(bx * E, (by + ondula) * E, br * E, 0, Math.PI * 2);
    g.fill();
  }
  // Ojos
  for (const lado of [-1, 1]) {
    g.globalCompositeOperation = "lighter";
    g.drawImage(brillo("rgba(255,70,70,0.9)"), (lado * 26 - 14) * E, -12 * E, 28 * E, 22 * E);
    g.globalCompositeOperation = "source-over";
    g.fillStyle = "#ffd2d2";
    g.beginPath();
    g.ellipse(lado * 26 * E, -1 * E, 7 * E, 4 * E, lado * 0.3, 0, Math.PI * 2);
    g.fill();
  }
  g.restore();
  // Vida del jefe
  const anchoBarra = 180 * E;
  const bx = x - anchoBarra / 2;
  const by = y + 62 * E;
  g.fillStyle = "rgba(10,10,30,0.7)";
  redondeado(g, bx, by, anchoBarra, 10 * E, 5 * E);
  g.fill();
  g.fillStyle = "#f2c14e";
  const f = 1 - J.indice / J.palabras.length;
  redondeado(g, bx, by, Math.max(10 * E, anchoBarra * f), 10 * E, 5 * E);
  g.fill();
  // Rayos
  for (const r of J.rayos) {
    if (r.aviso > 0) {
      g.fillStyle = `rgba(255,80,80,${0.12 + 0.12 * Math.sin(t * 20)})`;
      g.fillRect(r.x - r.ancho / 2, y + 40 * E, r.ancho, S.h);
      g.strokeStyle = "rgba(255,120,120,0.6)";
      g.setLineDash([8, 8]);
      g.beginPath();
      g.moveTo(r.x, y + 40 * E);
      g.lineTo(r.x, S.h);
      g.stroke();
      g.setLineDash([]);
    } else if (r.golpe > 0) {
      g.strokeStyle = "rgba(220,230,255,0.95)";
      g.lineWidth = 4 * E;
      g.globalCompositeOperation = "lighter";
      g.beginPath();
      let ry = y + 40 * E;
      g.moveTo(r.x, ry);
      while (ry < S.h) {
        ry += 30 * E;
        g.lineTo(r.x + (Math.random() - 0.5) * r.ancho * 0.8, ry);
      }
      g.stroke();
      g.lineWidth = 12 * E;
      g.strokeStyle = "rgba(140,160,255,0.25)";
      g.stroke();
      g.globalCompositeOperation = "source-over";
    }
  }
}

function chispa(S, x, y, color, fuerza = 1, cantidad = 1) {
  for (let i = 0; i < cantidad; i++) {
    if (S.particulas.length > 420) S.particulas.shift();
    const a = Math.random() * Math.PI * 2;
    const v = (20 + Math.random() * 160) * fuerza * S.escala;
    S.particulas.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, vida: 0.5 + Math.random() * 0.6, edad: 0, r: (1.5 + Math.random() * 3) * S.escala, color });
  }
}

// ---------- Componente ----------
export default function DragonJadePage() {
  const contenido = useContenidoJuego();
  if (!contenido)
    return (
      <SelectorUnidad
        titulo="Dragón de jade"
        tituloChino="玉龙"
        icono={<Sello grande>玉龙</Sello>}
        descripcion="Guía al dragón y cómete las perlas con la palabra correcta · 引导玉龙吃掉正确的词语"
      />
    );
  return <JuegoDragon key={`${contenido.numero}-${contenido.clase}`} contenido={contenido} />;
}

function JuegoDragon({ contenido }) {
  const { soundEnabled, toggleSound, playCorrect, playWrong, playWin, playLose, playSpell, playClick } = useSound();
  const reducido = usePrefiereMenosMovimiento();
  const raizRef = React.useRef(null);
  const zonaRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const hudRef = React.useRef(null);
  const S = React.useRef(null);
  if (!S.current) S.current = crearEstado();
  if (import.meta.env.DEV) window.__jbDragon = S; // solo para pruebas locales
  const datos = React.useMemo(() => construirPreguntas(contenido), [contenido]);
  const claveRec = claveRecord("dragon", contenido);
  const [record, setRecord] = React.useState(() => leerNumero(claveRec));
  const [fase, setFase] = React.useState("inicio");
  const [hud, setHud] = React.useState({ puntos: 0, vidas: VIDAS, combo: 0, nivel: 1, pregunta: null, jefe: null });
  const [banner, setBanner] = React.useState(null);
  const [resultado, setResultado] = React.useState(null);
  const [pantallaCompleta, setPantallaCompleta] = React.useState(false);
  const sonido = React.useRef({ soundEnabled, playCorrect, playWrong, playWin, playLose, playSpell });
  sonido.current = { soundEnabled, playCorrect, playWrong, playWin, playLose, playSpell };
  const reducidoRef = React.useRef(reducido);
  reducidoRef.current = reducido;

  const actualizarHud = React.useCallback(() => {
    const s = S.current;
    setHud({
      puntos: s.puntos,
      vidas: s.vidas,
      combo: s.combo,
      nivel: s.nivel,
      pregunta: s.pregunta,
      jefe: s.jefe ? { palabras: s.jefe.palabras, indice: s.jefe.indice, zh: s.jefe.zh } : null,
    });
  }, []);

  const mostrarBanner = React.useCallback((b) => {
    setBanner({ ...b, id: Math.random() });
    window.clearTimeout(mostrarBanner.t);
    mostrarBanner.t = window.setTimeout(() => setBanner(null), 1900);
  }, []);

  const decir = React.useCallback((texto) => {
    if (sonido.current.soundEnabled) speak(texto, 0.9);
  }, []);

  // ---- Lógica de juego ----
  const zonaJuego = () => {
    const s = S.current;
    const margen = 34 * s.escala;
    const arriba = s.arriba + (s.jefe ? 150 * s.escala : 20 * s.escala);
    return { x0: margen + 30 * s.escala, x1: s.w - margen - 30 * s.escala, y0: arriba, y1: s.h - margen };
  };

  const colocarPerlas = (textos) => {
    const s = S.current;
    const g = canvasRef.current?.getContext("2d");
    const z = zonaJuego();
    const perlas = [];
    for (const item of textos) {
      const p = { ...item, nacida: s.t + perlas.length * 0.08, fase: Math.random() * 6, muere: 0 };
      if (g) medirPerla(g, p, s.escala);
      let intento = 0;
      do {
        p.x = z.x0 + p.ancho / 2 + Math.random() * Math.max(10, z.x1 - z.x0 - p.ancho);
        p.y = z.y0 + p.alto / 2 + Math.random() * Math.max(10, z.y1 - z.y0 - p.alto);
        intento++;
      } while (
        intento < 60 &&
        (Math.hypot(p.x - s.cabeza.x, p.y - s.cabeza.y) < 170 * s.escala || perlas.some((q) => Math.abs(q.x - p.x) < (q.ancho + p.ancho) / 2 + 12 && Math.abs(q.y - p.y) < (q.alto + p.alto) / 2 + 26))
      );
      const v = (18 + s.nivel * 16 + (p.jefe ? 10 : 0)) * s.escala;
      const a = Math.random() * Math.PI * 2;
      p.vx = Math.cos(a) * v;
      p.vy = Math.sin(a) * v;
      perlas.push(p);
    }
    s.perlas = perlas;
  };

  const siguientePregunta = () => {
    const s = S.current;
    const lista = datos.preguntas;
    if (!lista.length) return;
    if (s.indicePregunta >= lista.length) {
      s.indicePregunta = 0;
      datos.preguntas = barajar(lista);
    }
    const q = datos.preguntas[s.indicePregunta++];
    s.pregunta = q;
    const mismoTipo = q.tipo === "hueco" ? lista.filter((x) => x.tipo === "hueco").map((x) => x.es) : [];
    const n = Math.min(2 + s.nivel, 5) - 1;
    const malas = distractores(q.es, datos.banco, n, mismoTipo);
    colocarPerlas(barajar([{ texto: q.es, correcta: true }, ...malas.map((m) => ({ texto: m, correcta: false }))]));
    actualizarHud();
  };

  const empezarJefe = () => {
    const s = S.current;
    const palabras = palabrasDe(datos.frase.texto);
    s.jefe = { palabras, indice: 0, zh: datos.frase.zh, x: s.w / 2, y: s.arriba + 64 * s.escala, rayos: [], proximoRayo: 3, golpe: 0, dir: 1 };
    s.pregunta = null;
    s.perlas = [];
    mostrarBanner({ es: "¡Jefe final! Ordena la frase", zh: "最终头目！按顺序吃掉词语", jefe: true });
    window.setTimeout(() => {
      if (!S.current.jefe) return;
      colocarPerlas(barajar(palabras.map((p, i) => ({ texto: p, correcta: false, jefe: true, orden: i }))));
    }, 900);
    actualizarHud();
  };

  const terminar = (gana) => {
    const s = S.current;
    if (s.fase === "fin") return;
    s.fase = "fin";
    if (gana) {
      s.puntos += 200 + s.vidas * 50;
      sonido.current.soundEnabled && sonido.current.playWin();
    } else sonido.current.soundEnabled && sonido.current.playLose();
    const nuevoRecord = s.puntos > leerNumero(claveRec);
    if (nuevoRecord) {
      guardarNumero(claveRec, s.puntos);
      setRecord(s.puntos);
    }
    const xp = Math.min(80, Math.max(5, Math.round(s.puntos / 12)));
    try {
      addXp(xp);
    } catch {}
    setResultado({ gana, puntos: s.puntos, comboMax: s.comboMax, aciertos: s.aciertos, nuevoRecord, xp, comidas: s.comidas.slice(-12) });
    setFase("fin");
    actualizarHud();
  };

  const comer = (p) => {
    const s = S.current;
    if (s.jefe) {
      const J = s.jefe;
      const esperada = J.palabras[J.indice];
      if (sinAcentos(p.texto) === sinAcentos(esperada)) {
        p.muere = s.t;
        J.indice++;
        J.golpe = 0.5;
        s.combo++;
        s.comboMax = Math.max(s.comboMax, s.combo);
        s.puntos += 25 * Math.min(s.combo, 6);
        s.segmentos += 2;
        chispa(s, p.x, p.y, ORO, 1.2, reducidoRef.current ? 0 : 26);
        s.textos.push({ x: p.x, y: p.y, txt: `+${25 * Math.min(s.combo, 6)}`, edad: 0, color: "#f2c14e" });
        sonido.current.soundEnabled && sonido.current.playSpell();
        if (J.indice >= J.palabras.length) {
          decir(datos.frase.texto);
          chispa(s, J.x, J.y, ORO, 2.5, reducidoRef.current ? 0 : 120);
          s.destello = 0.6;
          s.destelloColor = "255,220,140";
          window.setTimeout(() => terminar(true), 1200);
          s.jefe.rayos = [];
        } else decir(p.texto);
        actualizarHud();
      } else herir(p);
      return;
    }
    if (p.correcta) {
      p.muere = s.t;
      for (const q of s.perlas) if (q !== p && !q.muere) q.muere = s.t + 0.05;
      s.combo++;
      s.comboMax = Math.max(s.comboMax, s.combo);
      s.aciertos++;
      s.aciertosNivel++;
      const ganados = 10 * Math.min(s.combo, 5) * s.nivel;
      s.puntos += ganados;
      s.segmentos += 3;
      s.comidas.push({ es: p.texto, zh: s.pregunta?.tipo === "vocab" ? s.pregunta.zh : "" });
      chispa(s, p.x, p.y, ORO, 1.3, reducidoRef.current ? 0 : 34);
      chispa(s, p.x, p.y, JADE, 0.8, reducidoRef.current ? 0 : 16);
      s.textos.push({ x: p.x, y: p.y, txt: `+${ganados}${s.combo > 1 ? ` ×${Math.min(s.combo, 5)}` : ""}`, edad: 0, color: "#f2c14e" });
      sonido.current.soundEnabled && sonido.current.playCorrect();
      decir(p.texto);
      s.pregunta = null;
      if (s.aciertosNivel >= ACIERTOS_POR_NIVEL) {
        s.aciertosNivel = 0;
        if (s.nivel >= NIVELES_ANTES_DEL_JEFE) {
          s.esperaSiguiente = 0;
          window.setTimeout(empezarJefe, 700);
        } else {
          s.nivel++;
          mostrarBanner({ es: `Nivel ${s.nivel}`, zh: `第${s.nivel}关 · 更快了！` });
          s.esperaSiguiente = 1.3;
        }
      } else s.esperaSiguiente = 0.7;
      actualizarHud();
    } else herir(p);
  };

  const herir = (p) => {
    const s = S.current;
    if (s.invulnerable > 0) return;
    s.vidas--;
    s.combo = 0;
    s.invulnerable = 1.4;
    s.sacudida = reducidoRef.current ? 0 : 0.45;
    s.destello = 0.35;
    s.destelloColor = "255,60,60";
    if (p) {
      chispa(s, p.x, p.y, ROJO, 1, reducidoRef.current ? 0 : 22);
      s.textos.push({ x: p.x, y: p.y, txt: "✕", edad: 0, color: "#ff8a8a" });
      if (!s.jefe) p.muere = s.t;
      else {
        // En el jefe la perla se aparta
        p.vx = (p.x - s.cabeza.x) * 3;
        p.vy = (p.y - s.cabeza.y) * 3;
      }
    }
    sonido.current.soundEnabled && sonido.current.playWrong();
    try {
      navigator.vibrate?.(120);
    } catch {}
    if (s.vidas <= 0) window.setTimeout(() => terminar(false), 500);
    else if (!s.jefe && p) {
      // Si se come la incorrecta, vuelven a salir las perlas restantes con otra posición
      const restantes = s.perlas.filter((q) => !q.muere);
      if (!restantes.some((q) => q.correcta)) s.esperaSiguiente = 0.6;
    }
    actualizarHud();
  };

  const empezar = () => {
    const prev = S.current;
    const s = crearEstado();
    Object.assign(s, { w: prev.w, h: prev.h, dpr: prev.dpr, escala: prev.escala, arriba: prev.arriba, estrellas: prev.estrellas, nubes: prev.nubes, farolillos: prev.farolillos, montes: prev.montes, t: prev.t });
    s.cabeza = { x: s.w * 0.2, y: s.h * 0.6 };
    s.camino = [];
    s.fase = "jugando";
    S.current = s;
    datos.preguntas = barajar(datos.preguntas);
    setResultado(null);
    setFase("jugando");
    playClick?.();
    siguientePregunta();
    zonaRef.current?.focus?.();
  };

  const pausar = React.useCallback(() => {
    const s = S.current;
    if (s.fase === "jugando") {
      s.fase = "pausa";
      setFase("pausa");
    } else if (s.fase === "pausa") {
      s.fase = "jugando";
      setFase("jugando");
    }
  }, []);

  // ---- Bucle, tamaño y entrada ----
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const zona = zonaRef.current;
    const g = canvas.getContext("2d");
    const imgNube = new Image();
    imgNube.src = "./theme/nube-oro.png";
    let raf = 0;
    let ultimo = performance.now();

    const redimensionar = () => {
      const r = zona.getBoundingClientRect();
      const s = S.current;
      const dpr = Math.min(2.5, window.devicePixelRatio || 1);
      s.w = Math.max(280, r.width);
      s.h = Math.max(320, r.height);
      s.dpr = dpr;
      s.escala = Math.max(0.72, Math.min(1.15, Math.min(s.w, s.h) / 680));
      s.arriba = (hudRef.current?.offsetHeight || 100) + 8;
      canvas.width = Math.round(s.w * dpr);
      canvas.height = Math.round(s.h * dpr);
      canvas.style.width = `${s.w}px`;
      canvas.style.height = `${s.h}px`;
      prepararFondo(s);
      if (s.jefe) {
        s.jefe.x = s.w / 2;
        s.jefe.y = s.arriba + 64 * s.escala;
      }
      for (const p of s.perlas) medirPerla(g, p, s.escala);
      s.cabeza.x = Math.min(s.cabeza.x, s.w - 20);
      s.cabeza.y = Math.min(s.cabeza.y, s.h - 20);
    };
    const ro = new ResizeObserver(redimensionar);
    ro.observe(zona);
    if (hudRef.current) ro.observe(hudRef.current);
    redimensionar();
    S.current.cabeza = { x: S.current.w * 0.3, y: S.current.h * 0.62 };

    const paso = (ahora) => {
      raf = requestAnimationFrame(paso);
      const dt = Math.min(0.05, (ahora - ultimo) / 1000);
      ultimo = ahora;
      const s = S.current;
      const red = reducidoRef.current;
      const activo = s.fase === "jugando";
      if (s.fase !== "pausa") s.t += dt;
      avanzarFondo(s, s.fase === "pausa" ? 0 : dt, red);

      // Movimiento de la cabeza
      if (s.fase !== "pausa") {
        const max = (250 + s.nivel * 35 + (s.jefe ? 30 : 0)) * s.escala;
        let dx = 0;
        let dy = 0;
        if (s.teclas.size) {
          if (s.teclas.has("izq")) dx -= 1;
          if (s.teclas.has("der")) dx += 1;
          if (s.teclas.has("arr")) dy -= 1;
          if (s.teclas.has("aba")) dy += 1;
          const d = Math.hypot(dx, dy) || 1;
          dx = (dx / d) * max;
          dy = (dy / d) * max;
          if (!dx && !dy) {
            dx = s.vel.x;
            dy = s.vel.y;
          }
        } else if (s.objetivo) {
          const ox = s.objetivo.x - s.cabeza.x;
          const oy = s.objetivo.y - s.cabeza.y;
          const d = Math.hypot(ox, oy);
          const v = Math.min(max, d * 4.2);
          if (d > 6) {
            dx = (ox / d) * v;
            dy = (oy / d) * v;
          } else {
            dx = s.vel.x * 0.9;
            dy = s.vel.y * 0.9;
          }
        } else if (!activo) {
          // Vuelo libre en la pantalla de inicio: describe círculos
          const a = s.t * 0.7;
          const cx = s.w / 2 + Math.cos(a) * s.w * 0.3;
          const cy = s.h * 0.58 + Math.sin(a * 2) * s.h * 0.16;
          dx = (cx - s.cabeza.x) * 2;
          dy = (cy - s.cabeza.y) * 2;
        } else {
          dx = s.vel.x;
          dy = s.vel.y;
        }
        const k = Math.min(1, dt * 7);
        s.vel.x += (dx - s.vel.x) * k;
        s.vel.y += (dy - s.vel.y) * k;
        const rap = Math.hypot(s.vel.x, s.vel.y);
        const minimo = 40 * s.escala;
        if (rap < minimo && activo && !s.objetivo) {
          s.vel.x = (s.vel.x / (rap || 1)) * minimo || minimo;
          s.vel.y = (s.vel.y / (rap || 1)) * minimo;
        }
        s.cabeza.x += s.vel.x * dt;
        s.cabeza.y += s.vel.y * dt;
        const m = 16 * s.escala;
        if (s.cabeza.x < m || s.cabeza.x > s.w - m) s.vel.x *= -0.6;
        if (s.cabeza.y < m || s.cabeza.y > s.h - m) s.vel.y *= -0.6;
        s.cabeza.x = Math.max(m, Math.min(s.w - m, s.cabeza.x));
        s.cabeza.y = Math.max(m, Math.min(s.h - m, s.cabeza.y));
        const ult = s.camino[s.camino.length - 1];
        if (!ult || Math.hypot(ult.x - s.cabeza.x, ult.y - s.cabeza.y) > 2) {
          s.camino.push({ x: s.cabeza.x, y: s.cabeza.y });
          const maxPuntos = Math.ceil((s.segmentos * 9 * s.escala) / 2) + 60;
          if (s.camino.length > maxPuntos) s.camino.splice(0, s.camino.length - maxPuntos);
        }
        // Estela de chispas
        if (!red && rap > 60) {
          const e = s.camino[Math.max(0, s.camino.length - 1 - Math.floor(s.segmentos * 2))] || s.cabeza;
          if (Math.random() < 0.9) {
            s.particulas.push({ x: e.x + (Math.random() - 0.5) * 10, y: e.y + (Math.random() - 0.5) * 10, vx: (Math.random() - 0.5) * 30, vy: (Math.random() - 0.5) * 30 + 10, vida: 0.7 + Math.random() * 0.5, edad: 0, r: (1 + Math.random() * 2.4) * s.escala, color: Math.random() < 0.7 ? ORO : JADE });
          }
        }
      }

      if (activo) {
        if (s.invulnerable > 0) s.invulnerable -= dt;
        if (s.esperaSiguiente > 0) {
          s.esperaSiguiente -= dt;
          if (s.esperaSiguiente <= 0) siguientePregunta();
        }
        // Perlas
        const z = zonaJuego();
        const rCabeza = 20 * s.escala;
        for (const p of s.perlas) {
          if (p.muere) continue;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          if (p.x - p.ancho / 2 < z.x0 - 20 || p.x + p.ancho / 2 > z.x1 + 20) {
            p.vx *= -1;
            p.x = Math.max(z.x0 - 20 + p.ancho / 2, Math.min(z.x1 + 20 - p.ancho / 2, p.x));
          }
          if (p.y - p.alto / 2 < z.y0 || p.y + p.alto / 2 > z.y1) {
            p.vy *= -1;
            p.y = Math.max(z.y0 + p.alto / 2, Math.min(z.y1 - p.alto / 2, p.y));
          }
          const vmax = (18 + s.nivel * 16 + 60) * s.escala;
          const vv = Math.hypot(p.vx, p.vy);
          if (vv > vmax) {
            p.vx *= 0.97;
            p.vy *= 0.97;
          }
          if (s.t - p.nacida < 0.25) continue;
          const cx = Math.max(p.x - p.ancho / 2, Math.min(s.cabeza.x, p.x + p.ancho / 2));
          const cy = Math.max(p.y - p.alto / 2, Math.min(s.cabeza.y, p.y + p.alto / 2));
          if (Math.hypot(cx - s.cabeza.x, cy - s.cabeza.y) < rCabeza) {
            if (!p.correcta && !p.jefe && s.invulnerable > 0) continue;
            if (p.jefe && s.invulnerable > 0 && sinAcentos(p.texto) !== sinAcentos(s.jefe?.palabras[s.jefe.indice] || "")) continue;
            comer(p);
          }
        }
        // Las perlas se apartan entre sí para no taparse
        const vivas = s.perlas.filter((p) => !p.muere);
        for (let i = 0; i < vivas.length; i++)
          for (let j = i + 1; j < vivas.length; j++) {
            const a = vivas[i];
            const b = vivas[j];
            const sx = (a.ancho + b.ancho) / 2 + 8 - Math.abs(a.x - b.x);
            const sy = (a.alto + b.alto) / 2 + 22 - Math.abs(a.y - b.y);
            if (sx > 0 && sy > 0) {
              const ejeX = sx / (a.ancho + b.ancho) < sy / (a.alto + b.alto);
              const sentido = ejeX ? Math.sign(a.x - b.x) || 1 : Math.sign(a.y - b.y) || 1;
              const empuje = Math.min(ejeX ? sx : sy, 40) * dt * 4;
              if (ejeX) {
                a.x += sentido * empuje;
                b.x -= sentido * empuje;
                a.vx = Math.abs(a.vx) * sentido;
                b.vx = -Math.abs(b.vx) * sentido;
              } else {
                a.y += sentido * empuje;
                b.y -= sentido * empuje;
                a.vy = Math.abs(a.vy) * sentido;
                b.vy = -Math.abs(b.vy) * sentido;
              }
            }
          }
        s.perlas = s.perlas.filter((p) => !p.muere || s.t - p.muere < 0.3);
        // Jefe
        const J = s.jefe;
        if (J) {
          J.golpe = Math.max(0, J.golpe - dt);
          J.x += J.dir * 40 * s.escala * dt;
          if (J.x > s.w * 0.7 || J.x < s.w * 0.3) J.dir *= -1;
          if (J.indice < J.palabras.length) {
            J.proximoRayo -= dt;
            if (J.proximoRayo <= 0) {
              J.proximoRayo = Math.max(2.2, 4.2 - J.indice * 0.15);
              J.rayos.push({ x: Math.max(30, Math.min(s.w - 30, s.cabeza.x + (Math.random() - 0.5) * 60)), ancho: 64 * s.escala, aviso: 1.0, golpe: 0.3, dano: false });
            }
          }
          for (const r of J.rayos) {
            if (r.aviso > 0) r.aviso -= dt;
            else {
              if (!r.dano) {
                r.dano = true;
                s.destello = Math.max(s.destello, 0.25);
                s.destelloColor = "200,210,255";
                if (Math.abs(s.cabeza.x - r.x) < r.ancho / 2 && s.cabeza.y > J.y && s.invulnerable <= 0) herir(null);
              }
              r.golpe -= dt;
            }
          }
          J.rayos = J.rayos.filter((r) => r.aviso > 0 || r.golpe > 0);
        }
      }

      // Partículas y textos
      if (s.fase !== "pausa") {
        for (const p of s.particulas) {
          p.edad += dt;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.vx *= 0.96;
          p.vy = p.vy * 0.96 + 20 * dt;
        }
        s.particulas = s.particulas.filter((p) => p.edad < p.vida);
        for (const tx of s.textos) {
          tx.edad += dt;
          tx.y -= 40 * dt;
        }
        s.textos = s.textos.filter((tx) => tx.edad < 1);
        s.sacudida = Math.max(0, s.sacudida - dt);
        s.destello = Math.max(0, s.destello - dt);
      }

      // ---- Dibujo ----
      g.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
      if (s.sacudida > 0) g.translate((Math.random() - 0.5) * 14 * s.sacudida, (Math.random() - 0.5) * 14 * s.sacudida);
      dibujarFondo(g, s, imgNube, red);
      dibujarJefe(g, s, red);
      for (const p of s.perlas) dibujarPerla(g, p, s);
      g.globalCompositeOperation = "lighter";
      for (const p of s.particulas) {
        const a = 1 - p.edad / p.vida;
        g.globalAlpha = a;
        const r = p.r * 4;
        g.drawImage(brillo(p.color), p.x - r, p.y - r, r * 2, r * 2);
      }
      g.globalAlpha = 1;
      g.globalCompositeOperation = "source-over";
      dibujarDragon(g, s, red);
      for (const tx of s.textos) {
        g.globalAlpha = 1 - tx.edad;
        g.fillStyle = tx.color;
        g.font = `800 ${Math.round(20 * s.escala)}px system-ui, sans-serif`;
        g.textAlign = "center";
        g.strokeStyle = "rgba(20,10,5,0.8)";
        g.lineWidth = 4;
        g.strokeText(tx.txt, tx.x, tx.y - 26 * s.escala);
        g.fillText(tx.txt, tx.x, tx.y - 26 * s.escala);
      }
      g.globalAlpha = 1;
      if (s.destello > 0) {
        g.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
        g.fillStyle = `rgba(${s.destelloColor},${Math.min(0.35, s.destello * 0.8)})`;
        g.fillRect(0, 0, s.w, s.h);
      }
    };
    raf = requestAnimationFrame(paso);

    // Entrada: ratón y táctil
    const local = (e) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const mover = (e) => {
      const s = S.current;
      if (e.pointerType === "mouse" || e.buttons || e.pointerType === "touch" || e.pointerType === "pen") {
        s.objetivo = local(e);
        s.teclas.clear();
      }
    };
    const soltar = (e) => {
      if (e.pointerType !== "mouse") S.current.objetivo = null;
    };
    canvas.addEventListener("pointermove", mover);
    canvas.addEventListener("pointerdown", mover);
    canvas.addEventListener("pointerup", soltar);
    canvas.addEventListener("pointercancel", soltar);
    const mapa = { ArrowLeft: "izq", KeyA: "izq", ArrowRight: "der", KeyD: "der", ArrowUp: "arr", KeyW: "arr", ArrowDown: "aba", KeyS: "aba" };
    const abajo = (e) => {
      const s = S.current;
      if (e.target?.tagName === "INPUT" || e.target?.tagName === "TEXTAREA") return;
      if (mapa[e.code] && (s.fase === "jugando" || s.fase === "pausa")) {
        e.preventDefault();
        s.teclas.add(mapa[e.code]);
        s.objetivo = null;
      } else if ((e.code === "KeyP" || e.code === "Escape") && (s.fase === "jugando" || s.fase === "pausa")) {
        e.preventDefault();
        pausar();
      }
    };
    const arriba = (e) => {
      if (mapa[e.code]) S.current.teclas.delete(mapa[e.code]);
    };
    window.addEventListener("keydown", abajo);
    window.addEventListener("keyup", arriba);
    const oculta = () => {
      if (document.hidden && S.current.fase === "jugando") pausar();
    };
    document.addEventListener("visibilitychange", oculta);
    const fs = () => {
      setPantallaCompleta(!!document.fullscreenElement);
      window.setTimeout(redimensionar, 60);
    };
    document.addEventListener("fullscreenchange", fs);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", mover);
      canvas.removeEventListener("pointerdown", mover);
      canvas.removeEventListener("pointerup", soltar);
      canvas.removeEventListener("pointercancel", soltar);
      window.removeEventListener("keydown", abajo);
      window.removeEventListener("keyup", arriba);
      document.removeEventListener("visibilitychange", oculta);
      document.removeEventListener("fullscreenchange", fs);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const alternarPantallaCompleta = () => {
    try {
      if (document.fullscreenElement) document.exitFullscreen();
      else raizRef.current?.requestFullscreen?.();
    } catch {}
  };

  const q = hud.pregunta;
  const J = hud.jefe;
  const jugando = fase === "jugando" || fase === "pausa";

  return (
    <div ref={raizRef} className={`jb-dragon gm-no-adapt ${pantallaCompleta ? "is-completa" : ""}`}>
      <div className="jb-dragon__barra">
        <Volver />
        <span className="jb-dragon__unidad">{etiquetaContenido(contenido)}</span>
      </div>
      <div ref={zonaRef} className="jb-dragon__zona" tabIndex={-1}>
        <canvas
          ref={canvasRef}
          className="jb-dragon__canvas"
          role="img"
          aria-label="Cielo nocturno con el dragón de jade y perlas con palabras · 夜空中的玉龙与词语灯笼"
        />
        <div ref={hudRef} className="jb-hud">
          <div className="jb-hud__fila">
            <div className="jb-hud__vidas" aria-label={`Vidas: ${hud.vidas} · 生命`}>
              {Array.from({ length: VIDAS }, (_, i) => (
                <HeartIcon key={i} size={22} className={i < hud.vidas ? "is-llena" : ""} aria-hidden="true" />
              ))}
            </div>
            <div className="jb-hud__dato">
              <small>
                <span className="jb-largo">Puntos · 分数</span>
                <span className="jb-corto">Pts · 分</span>
              </small>
              <strong>{hud.puntos}</strong>
            </div>
            <div className="jb-hud__dato">
              <small>
                <span className="jb-largo">Nivel · 关</span>
                <span className="jb-corto">Nv · 关</span>
              </small>
              <strong>{J ? "龙王" : hud.nivel}</strong>
            </div>
            {hud.combo > 1 && (
              <div className="jb-hud__combo" key={hud.combo}>
                <ZapIcon size={16} aria-hidden="true" /> ×{Math.min(hud.combo, J ? 6 : 5)}
              </div>
            )}
            <div className="jb-hud__botones">
              <button type="button" className="jb-icono" onClick={toggleSound} aria-label={soundEnabled ? "Silenciar · 静音" : "Activar sonido · 打开声音"} aria-pressed={!soundEnabled}>
                {soundEnabled ? <Volume2Icon size={20} /> : <VolumeXIcon size={20} />}
              </button>
              <button type="button" className="jb-icono jb-solo-escritorio" onClick={alternarPantallaCompleta} aria-label="Pantalla completa · 全屏">
                {pantallaCompleta ? <MinimizeIcon size={20} /> : <MaximizeIcon size={20} />}
              </button>
              {jugando && (
                <button type="button" className="jb-icono" onClick={pausar} aria-label={fase === "pausa" ? "Seguir · 继续" : "Pausa · 暂停"}>
                  {fase === "pausa" ? <PlayIcon size={20} /> : <PauseIcon size={20} />}
                </button>
              )}
            </div>
          </div>
          {jugando && (
            <div className={`jb-objetivo ${J ? "jb-objetivo--jefe" : ""}`} aria-live="polite">
              {J ? (
                <>
                  <span className="jb-objetivo__pista">Cómete las palabras en orden · 按顺序吃掉词语</span>
                  <span className="jb-objetivo__frase">
                    {J.palabras.map((p, i) => (
                      <span key={i} className={`jb-hueco ${i < J.indice ? "is-hecho" : i === J.indice ? "is-actual" : ""}`}>
                        {i < J.indice ? p : "＿".repeat(Math.min(4, Math.max(2, Math.ceil(p.length / 2))))}
                      </span>
                    ))}
                  </span>
                  {J.zh && <span className="jb-objetivo__zh">{J.zh}</span>}
                </>
              ) : q ? (
                q.tipo === "vocab" ? (
                  <>
                    <span className="jb-objetivo__pista">¿Cómo se dice en español? · 用西班牙语怎么说？</span>
                    <span className="jb-objetivo__chino">{q.zh}</span>
                  </>
                ) : (
                  <>
                    <span className="jb-objetivo__pista">Completa la frase · 补全句子</span>
                    <span className="jb-objetivo__frase jb-objetivo__frase--hueco">{q.frase}</span>
                    {q.zh && <span className="jb-objetivo__zh">{q.zh}</span>}
                  </>
                )
              ) : (
                <span className="jb-objetivo__pista jb-objetivo__pista--ok">¡Bien! · 太棒了！</span>
              )}
            </div>
          )}
        </div>

        {banner && (
          <div key={banner.id} className={`jb-banner ${banner.jefe ? "jb-banner--jefe" : ""}`} role="status">
            <strong>{banner.es}</strong>
            <span>{banner.zh}</span>
          </div>
        )}

        {fase === "inicio" && (
          <div className="jb-capa">
            <div className="jb-tarjeta jb-pergamino">
              <img className="jb-tarjeta__dragon" src="./theme/dragon.webp" alt="" aria-hidden="true" />
              <Sello grande>玉龙</Sello>
              <h1 className="jb-titulo jb-titulo--tinta">
                Dragón de jade <span>· 玉龙</span>
              </h1>
              <p className="jb-tarjeta__clase">
                {contenido.titulo} · {contenido.tituloChino}
              </p>
              <ul className="jb-instrucciones">
                <li>
                  <b>Guía al dragón</b> con el ratón o el dedo (o flechas / WASD). <span>用鼠标、手指或方向键引导玉龙。</span>
                </li>
                <li>
                  <b>Cómete el farol</b> con la palabra española correcta. <span>吃掉写着正确西语单词的灯笼。</span>
                </li>
                <li>
                  <b>Si fallas</b>, pierdes una vida. Tras 3 niveles llega el jefe: la nube de tormenta. <span>吃错会失去一条命；三关后迎战雷云头目。</span>
                </li>
              </ul>
              {record > 0 && (
                <p className="jb-record">
                  <TrophyIcon size={18} aria-hidden="true" /> Récord · 最高分: <b>{record}</b>
                </p>
              )}
              <button type="button" className="jb-boton jb-boton--grande" onClick={empezar} autoFocus>
                <PlayIcon size={22} aria-hidden="true" /> Jugar · 开始
              </button>
              <Link to="/juegos/dragon-jade" className="jb-enlace">
                <LayersIcon size={16} aria-hidden="true" /> Otra unidad · 换单元
              </Link>
            </div>
          </div>
        )}

        {fase === "pausa" && (
          <div className="jb-capa">
            <div className="jb-tarjeta jb-pergamino jb-tarjeta--peque">
              <Sello>暂停</Sello>
              <h2 className="jb-titulo jb-titulo--tinta">Pausa · 暂停</h2>
              <button type="button" className="jb-boton jb-boton--grande" onClick={pausar} autoFocus>
                <PlayIcon size={22} aria-hidden="true" /> Seguir · 继续
              </button>
              <button type="button" className="jb-boton jb-boton--linea" onClick={empezar}>
                <RotateCcwIcon size={18} aria-hidden="true" /> Reiniciar · 重新开始
              </button>
            </div>
          </div>
        )}
      </div>

      {fase === "fin" &&
        resultado &&
        createPortal(
          <div className="jb-modal gm-no-adapt" role="dialog" aria-modal="true" aria-labelledby="jb-fin-titulo">
            <div className="jb-tarjeta jb-pergamino jb-fin">
              <img className="jb-fin__mono" src={resultado.gana ? "./mono/trofeo.png" : "./mono/serio.png"} alt="Rey Mono · 美猴王" />
              <Sello grande>{resultado.gana ? "通关" : "再来"}</Sello>
              <h2 id="jb-fin-titulo" className="jb-titulo jb-titulo--tinta">
                {resultado.gana ? "¡Has vencido a la tormenta!" : "El dragón descansa"}
                <span>{resultado.gana ? "你战胜了雷云！" : "玉龙累了，再试一次吧"}</span>
              </h2>
              <div className="jb-stats">
                <div>
                  <small>
                <span className="jb-largo">Puntos · 分数</span>
                <span className="jb-corto">Pts · 分</span>
              </small>
                  <strong>{resultado.puntos}</strong>
                </div>
                <div>
                  <small>Combo máx. · 最高连击</small>
                  <strong>×{resultado.comboMax}</strong>
                </div>
                <div>
                  <small>XP · 经验</small>
                  <strong>+{resultado.xp}</strong>
                </div>
              </div>
              {resultado.nuevoRecord && <p className="jb-nuevo-record">¡Nuevo récord! · 新纪录！</p>}
              {resultado.comidas.length > 0 && (
                <ul className="jb-comidas" aria-label="Palabras acertadas · 答对的词语">
                  {resultado.comidas.map((c, i) => (
                    <li key={i}>
                      <button type="button" onClick={() => speak(c.es, 0.9)}>
                        {c.es}
                        {c.zh && <small>{c.zh}</small>}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <div className="jb-fin__botones">
                <button type="button" className="jb-boton jb-boton--grande" onClick={empezar} autoFocus>
                  <RotateCcwIcon size={20} aria-hidden="true" /> Otra vez · 再玩一次
                </button>
                <Link to="/juegos/dragon-jade" className="jb-boton jb-boton--linea" onClick={() => setFase("inicio")}>
                  <LayersIcon size={18} aria-hidden="true" /> Otra clase · 换一课
                </Link>
                <Link to="/juegos" className="jb-boton jb-boton--linea">
                  Juegos · 游戏
                </Link>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
