// Banda sonora original de «Wukong Español · 悟空西语» para Douyin.
// 100 % sintetizada aquí (sin muestras ni canciones de terceros): libre de derechos.
// Uso: node audio/musica.mjs  → audio/musica.wav (44,1 kHz, estéreo, 16 bits)
// Estilo: beat electrónico moderno (4x4, 808) + guzheng (Karplus-Strong con «bend»),
// erhu (sierra con vibrato y portamento), taikos y gong. Escala pentatónica yu (La).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BPM, BEAT, BAR, COMPASES, SECCIONES, CORTA, DURACION } from "../tiempo.mjs";

const SR = 44100;
const DUR = DURACION + 0.6; // cola del gong
const N = Math.ceil(DUR * SR);
const L = new Float32Array(N), R = new Float32Array(N); // bus seco
const RL = new Float32Array(N), RR = new Float32Array(N); // envío a reverb
const SC = new Float32Array(N); // envolvente de sidechain (bombo)
const PAD_L = new Float32Array(N), PAD_R = new Float32Array(N); // bus que se comprime con el bombo

// ---------- utilidades ----------
let semilla = 12345;
const rnd = () => ((semilla = (semilla * 1664525 + 1013904223) >>> 0) / 4294967296);
const ruido = () => rnd() * 2 - 1;
const NOTAS = { C: 0, "C#": 1, D: 2, "D#": 3, E: 4, F: 5, "F#": 6, G: 7, "G#": 8, A: 9, "A#": 10, B: 11 };
function hz(n) {
  const m = /^([A-G]#?)(-?\d)$/.exec(n);
  const midi = (+m[2] + 1) * 12 + NOTAS[m[1]];
  return 440 * Math.pow(2, (midi - 69) / 12);
}
function mezcla(t0, buf, gan = 1, pan = 0, rev = 0, bus = "dry") {
  const i0 = Math.round(t0 * SR);
  const gl = gan * Math.cos((pan + 1) * Math.PI / 4) * Math.SQRT2;
  const gr = gan * Math.sin((pan + 1) * Math.PI / 4) * Math.SQRT2;
  const [A, B] = bus === "pad" ? [PAD_L, PAD_R] : [L, R];
  for (let k = 0; k < buf.length; k++) {
    const i = i0 + k;
    if (i < 0 || i >= N) continue;
    const v = buf[k];
    A[i] += v * gl; B[i] += v * gr;
    if (rev) { RL[i] += v * gl * rev; RR[i] += v * gr * rev; }
  }
}
class Biquad {
  constructor(tipo, f, q = 0.707) { this.tipo = tipo; this.x1 = this.x2 = this.y1 = this.y2 = 0; this.set(f, q); }
  set(f, q = this.q) {
    this.q = q;
    const w = 2 * Math.PI * Math.min(f, SR * 0.45) / SR, c = Math.cos(w), s = Math.sin(w), a = s / (2 * q);
    let b0, b1, b2, a0, a1, a2;
    if (this.tipo === "lp") { b0 = (1 - c) / 2; b1 = 1 - c; b2 = (1 - c) / 2; }
    else if (this.tipo === "hp") { b0 = (1 + c) / 2; b1 = -(1 + c); b2 = (1 + c) / 2; }
    else { b0 = a; b1 = 0; b2 = -a; } // bp
    a0 = 1 + a; a1 = -2 * c; a2 = 1 - a;
    this.b0 = b0 / a0; this.b1 = b1 / a0; this.b2 = b2 / a0; this.a1 = a1 / a0; this.a2 = a2 / a0;
  }
  p(x) {
    const y = this.b0 * x + this.b1 * this.x1 + this.b2 * this.x2 - this.a1 * this.y1 - this.a2 * this.y2;
    this.x2 = this.x1; this.x1 = x; this.y2 = this.y1; this.y1 = y; return y;
  }
}

// ---------- instrumentos ----------
function bombo(gan = 1) {
  const n = Math.round(0.42 * SR), b = new Float32Array(n);
  let fase = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const f = 45 + 110 * Math.exp(-t * 28);
    fase += 2 * Math.PI * f / SR;
    const env = Math.exp(-t * 7.5);
    const click = i < 90 ? ruido() * 0.5 * (1 - i / 90) : 0;
    b[i] = Math.tanh((Math.sin(fase) * env + click) * 1.6) * gan;
  }
  return b;
}
function palmada(gan = 1) {
  const n = Math.round(0.32 * SR), b = new Float32Array(n);
  const bp = new Biquad("bp", 1400, 0.9), hp = new Biquad("hp", 600);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    let env = Math.exp(-t * 16);
    for (const d of [0, 0.011, 0.022]) if (t >= d && t < d + 0.009) env = Math.max(env, 1.2 * Math.exp(-(t - d) * 220));
    const tono = Math.sin(2 * Math.PI * 190 * t) * Math.exp(-t * 30) * 0.4;
    b[i] = (hp.p(bp.p(ruido())) * env * 2.4 + tono) * gan;
  }
  return b;
}
function charles(abierto = false, gan = 1) {
  const n = Math.round((abierto ? 0.32 : 0.06) * SR), b = new Float32Array(n);
  const hp = new Biquad("hp", 7500), hp2 = new Biquad("hp", 9000);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    b[i] = hp2.p(hp.p(ruido())) * Math.exp(-t * (abierto ? 11 : 70)) * gan;
  }
  return b;
}
function taiko(gan = 1, f0 = 95) {
  const n = Math.round(1.1 * SR), b = new Float32Array(n);
  let fase = 0; const lp = new Biquad("lp", 900);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const f = f0 * (0.62 + 0.38 * Math.exp(-t * 9));
    fase += 2 * Math.PI * f / SR;
    const cuerpo = Math.sin(fase) * Math.exp(-t * 4.2);
    const golpe = lp.p(ruido()) * Math.exp(-t * 35) * 0.9;
    b[i] = Math.tanh((cuerpo * 1.3 + golpe) * 1.4) * gan;
  }
  return b;
}
function gong(gan = 1, dur = 4.5) {
  const n = Math.round(dur * SR), b = new Float32Array(n);
  const parciales = [[1, 1], [1.48, 0.7], [2.03, 0.55], [2.74, 0.4], [3.31, 0.35], [4.17, 0.25], [5.43, 0.18], [6.8, 0.12]];
  const f0 = 92;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    let s = 0;
    for (const [r, a] of parciales) {
      const f = f0 * r * (1 + 0.012 * Math.exp(-t * 1.5)) * (1 + 0.004 * t);
      s += a * Math.sin(2 * Math.PI * f * t + r) * Math.exp(-t * (0.7 + r * 0.22));
    }
    const ataque = Math.min(1, t / 0.006);
    const golpe = ruido() * Math.exp(-t * 40) * 0.4;
    b[i] = (s * 0.42 * ataque + golpe) * gan;
  }
  return b;
}
// Guzheng: Karplus-Strong con pulsación brillante y «bend» al ataque (presión de la cuerda)
function guzheng(nota, dur = 1.4, gan = 1, bend = 0) {
  const f = hz(nota);
  const n = Math.round(dur * SR), b = new Float32Array(n);
  const P = SR / f;
  const largo = Math.ceil(P) + 2;
  const linea = new Float32Array(largo * 2);
  const lp = new Biquad("lp", Math.min(9000, f * 9));
  for (let i = 0; i < largo; i++) linea[i] = lp.p(ruido()) * 0.9 + (i < largo / 2 ? 0.3 : -0.3);
  let pos = 0, ant = 0;
  const amort = Math.pow(0.5, 1 / (f * 0.9)); // decaimiento ~0.9 s a la mitad
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const per = P / (1 + bend * (1 - Math.exp(-t * 18)) * Math.exp(-t * 2.2));
    const lee = (pos - per + linea.length * 4) % linea.length;
    const i0 = Math.floor(lee), fr = lee - i0;
    const v = linea[i0 % linea.length] * (1 - fr) + linea[(i0 + 1) % linea.length] * fr;
    const nuevo = (v + ant) * 0.5 * amort; ant = v;
    linea[pos % linea.length] = nuevo; pos++;
    b[i] = v * gan * (i > n - 600 ? (n - i) / 600 : 1);
  }
  return b;
}
// Erhu: sierra filtrada con vibrato tardío, portamento y arco (ataque lento)
function erhu(notas, gan = 1) {
  // notas: [[nota, inicioEnBeats, durEnBeats], ...] con portamento entre ellas
  const fin = notas.reduce((m, [, s, d]) => Math.max(m, s + d), 0) * BEAT + 0.4;
  const n = Math.round(fin * SR), b = new Float32Array(n);
  const bp1 = new Biquad("bp", 1100, 0.8), bp2 = new Biquad("bp", 2600, 1.6), lp = new Biquad("lp", 5200);
  let fase = 0, fAct = hz(notas[0][0]);
  for (let i = 0; i < n; i++) {
    const t = i / SR, tb = t / BEAT;
    let actual = notas[0], k = 0;
    for (let j = 0; j < notas.length; j++) if (tb >= notas[j][1]) { actual = notas[j]; k = j; }
    const fObj = hz(actual[0]);
    fAct += (fObj - fAct) * 0.0016; // portamento
    const tn = t - actual[1] * BEAT;
    const vib = 1 + 0.011 * Math.sin(2 * Math.PI * 5.6 * t) * Math.min(1, Math.max(0, (tn - 0.18) * 3));
    fase += 2 * Math.PI * fAct * vib / SR;
    let s = 0;
    for (let h = 1; h <= 14; h++) s += Math.sin(fase * h) / h * (h % 2 ? 1 : 0.75);
    const finNota = (actual[1] + actual[2]) * BEAT;
    const ultima = k === notas.length - 1;
    let env = Math.min(1, t / 0.12) * (0.85 + 0.15 * Math.sin(2 * Math.PI * 0.7 * t));
    if (ultima) env *= Math.max(0, Math.min(1, (finNota + 0.25 - t) / 0.35));
    const filtrado = bp1.p(s) * 1.1 + bp2.p(s) * 0.6 + s * 0.08;
    b[i] = lp.p(filtrado) * env * gan + ruido() * 0.004 * env;
  }
  return b;
}
function bajo808(nota, dur, gan = 1) {
  const f = hz(nota), n = Math.round(dur * SR), b = new Float32Array(n);
  let fase = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    fase += 2 * Math.PI * f * (1 + 0.5 * Math.exp(-t * 40)) / SR;
    const env = Math.min(1, t / 0.005) * Math.exp(-t * 1.6) * (i > n - 400 ? (n - i) / 400 : 1);
    b[i] = Math.tanh(Math.sin(fase) * 2.2) * env * gan;
  }
  return b;
}
function pad(acorde, dur, gan = 1) {
  const n = Math.round(dur * SR), b = new Float32Array(n);
  const lp = new Biquad("lp", 2200, 0.6);
  const fs_ = acorde.map(hz);
  const fases = fs_.flatMap(() => [rnd(), rnd(), rnd()].map((x) => x * 6.28));
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    let s = 0, k = 0;
    for (const f of fs_) for (const d of [-0.006, 0, 0.007]) {
      const ph = (fases[k++] + 2 * Math.PI * f * (1 + d) * t) / (2 * Math.PI);
      s += 2 * (ph - Math.floor(ph)) - 1;
    }
    const env = Math.min(1, t / 0.25) * Math.min(1, (dur - t) / 0.3);
    b[i] = lp.p(s / (fs_.length * 3)) * env * gan;
  }
  return b;
}
function subida(dur, gan = 1) { // riser de ruido + barrido
  const n = Math.round(dur * SR), b = new Float32Array(n);
  const bp = new Biquad("bp", 300, 2);
  let fase = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR, x = t / dur;
    if (i % 64 === 0) bp.set(300 + 7000 * x * x, 2);
    fase += 2 * Math.PI * (200 + 1400 * x * x) / SR;
    b[i] = (bp.p(ruido()) * 1.4 + Math.sin(fase) * 0.12) * x * x * gan;
  }
  return b;
}
function whoosh(dur = 0.6, gan = 1) {
  const n = Math.round(dur * SR), b = new Float32Array(n);
  const bp = new Biquad("bp", 4000, 1.2);
  for (let i = 0; i < n; i++) {
    const x = i / n;
    if (i % 64 === 0) bp.set(5000 * (1 - x) + 400, 1.2);
    b[i] = bp.p(ruido()) * Math.sin(Math.PI * x) ** 1.5 * gan * 1.6;
  }
  return b;
}
function impacto(gan = 1) { // golpe grave cinematográfico
  const n = Math.round(1.6 * SR), b = new Float32Array(n);
  let fase = 0; const lp = new Biquad("lp", 2500);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    fase += 2 * Math.PI * (38 + 80 * Math.exp(-t * 12)) / SR;
    b[i] = Math.tanh(Math.sin(fase) * Math.exp(-t * 2.4) * 2 + lp.p(ruido()) * Math.exp(-t * 14) * 0.8) * gan;
  }
  return b;
}
function campanita(nota, gan = 1) { // brillo «ding» para aciertos/cifras
  const f = hz(nota), n = Math.round(1.2 * SR), b = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    b[i] = (Math.sin(2 * Math.PI * f * t) + 0.4 * Math.sin(2 * Math.PI * f * 2.76 * t) * Math.exp(-t * 6)) * Math.exp(-t * 4) * gan;
  }
  return b;
}

// ---------- composición ----------
const tB = (compas, beat = 0) => compas * BAR + beat * BEAT;
const PROG = [["A", "Am"], ["F", "F"], ["C", "C"], ["G", "G"]];
const ACORDES = { Am: ["A3", "C4", "E4", "A4"], F: ["F3", "A3", "C4", "F4"], C: ["C4", "E4", "G4", "C5"], G: ["G3", "B3", "D4", "G4"] };
const RAIZ = { A: "A1", F: "F1", C: "C2", G: "G1" };
// gancho del guzheng: 4 compases en semicorcheas [posición16, nota, bend]
const GANCHO = [
  [[0, "E5"], [3, "D5"], [6, "C5"], [8, "D5"], [10, "E5"], [12, "G5", 0.06], [14, "E5"]],
  [[0, "A5", 0.06], [3, "G5"], [6, "E5"], [8, "D5"], [10, "C5"], [12, "D5", 0.06]],
  [[0, "E5"], [3, "D5"], [6, "C5"], [8, "A4"], [10, "C5"], [12, "D5"], [14, "E5"]],
  [[0, "G5", 0.06], [3, "E5"], [6, "D5"], [8, "C5", 0.04], [12, "A4"]],
];
const ERHU_FRASE = [ // por cada vuelta de 4 compases (en beats relativos)
  ["A4", 0, 3.5], ["C5", 4, 2], ["A4", 6, 2], ["E5", 8, 2], ["G5", 10, 2], ["D5", 12, 2.5], ["E5", 14.5, 1.5],
];
const sec = (nombre) => SECCIONES.find((s) => s.id === nombre);
const S = Object.fromEntries(SECCIONES.map((s) => [s.id, s]));

function compasDe(c) { return SECCIONES.find((s) => c >= s.ini && c < s.fin); }

// GANCHO (compases 0-1): impacto + gong + taikos + glissando de guzheng + riser
mezcla(0, impacto(1.0), 0.9, 0, 0.25);
mezcla(0, gong(1, 5), 0.55, 0, 0.5);
mezcla(0, taiko(1, 90), 0.9, 0, 0.3);
["A3", "C4", "D4", "E4", "G4", "A4", "C5", "D5", "E5", "G5", "A5"].forEach((n, i) => mezcla(0.05 + i * 0.045, guzheng(n, 1.6, 0.5), 0.5, -0.4 + i * 0.08, 0.35));
for (const b of [2, 3, 3.5]) mezcla(tB(0, b), taiko(0.8, 110), 0.7, 0, 0.3);
mezcla(tB(1, 0), impacto(0.8), 0.6, 0, 0.2);
mezcla(tB(1, 0), taiko(1, 85), 0.9, 0, 0.3);
for (let i = 0; i < 8; i++) mezcla(tB(1, 2 + i * 0.25), taiko(0.35 + i * 0.07, 120 + i * 6), 0.6, (i % 2 ? 0.3 : -0.3), 0.2);
mezcla(tB(1, 0), subida(BAR, 0.5), 0.5, 0, 0.2);
["G5", "E5", "D5", "C5"].forEach((n, i) => mezcla(tB(1, i * 0.5), guzheng(n, 1, 0.5, 0.05), 0.45, 0.3, 0.4));

const DROP = S.revelacion.ini;
// PROBLEMA (compases 2-3): medio tiempo, erhu triste, pad bajo
if (S.problema) {
mezcla(tB(2), erhu([["E5", 0, 1.5], ["D5", 1.5, 1], ["C5", 2.5, 1.5], ["A4", 4, 1.5], ["G4", 5.5, 0.5], ["A4", 6, 2]], 0.9), 0.5, 0.1, 0.45);
mezcla(tB(2), pad(ACORDES.Am, BAR * 2, 0.6), 0.35, 0, 0.5, "pad");
for (const c of [2, 3]) {
  mezcla(tB(c, 0), bombo(0.9), 0.75); mezcla(tB(c, 2), palmada(0.8), 0.45, 0, 0.3);
  mezcla(tB(c, 2.5), bombo(0.6), 0.5);
  for (let h = 0; h < 4; h++) mezcla(tB(c, h + 0.5), charles(false, 0.6), 0.22, 0.4);
}
for (let i = 0; i < 8; i++) mezcla(tB(3, 2 + i * 0.25), palmada(0.4 + i * 0.08), 0.35, 0, 0.2); // redoble
mezcla(tB(3, 0), subida(BAR, 0.8), 0.6, 0, 0.3);
} else { // versión corta: subida directa al drop
  mezcla(tB(DROP - 1, 0), subida(BAR, 0.8), 0.6, 0, 0.3);
  for (let i = 0; i < 8; i++) mezcla(tB(DROP - 1, 2 + i * 0.25), palmada(0.4 + i * 0.08), 0.35, 0, 0.2);
}

// CUERPO (compases 4..fin-3): drop con 4x4, bajo, gancho, erhu
const CIERRE = S.cierre.ini;
for (let c = DROP; c < CIERRE; c++) {
  const s = compasDe(c);
  const vuelta = (c - DROP) % 4;
  const [raiz, acorde] = PROG[vuelta];
  const intenso = s && (s.id === "juegos" || s.id === "turbo" || s.id === "beneficios");
  const breakdown = s && s.id === "idiomas"; // respiro antes del final
  // batería
  for (let b = 0; b < 4; b++) {
    if (!breakdown || b === 0) { mezcla(tB(c, b), bombo(1), 0.85); SC_marca(tB(c, b)); }
    if (b % 2 === 1 && !breakdown) mezcla(tB(c, b), palmada(1), 0.5, 0, 0.25);
    mezcla(tB(c, b + 0.5), charles(b === 3 && vuelta === 3, 1), 0.26, 0.35);
    if (intenso) { mezcla(tB(c, b + 0.25), charles(false, 0.6), 0.14, -0.35); mezcla(tB(c, b + 0.75), charles(false, 0.6), 0.14, -0.35); }
  }
  if (vuelta === 3 && !breakdown) { // relleno de taikos al final de cada vuelta
    mezcla(tB(c, 3), taiko(0.8, 120), 0.5, -0.2, 0.25); mezcla(tB(c, 3.5), taiko(0.8, 105), 0.5, 0.2, 0.25); mezcla(tB(c, 3.75), taiko(0.6, 95), 0.45, 0, 0.25);
  }
  // bajo 808 sincopado
  if (!breakdown) for (const [p, d] of [[0, 0.75], [0.75, 0.5], [1.5, 1], [2.5, 0.5], [3, 0.5], [3.5, 0.5]]) {
    const oct = p === 3.5 ? RAIZ[raiz].replace(/\d/, (n) => +n + 1) : RAIZ[raiz];
    mezcla(tB(c, p), bajo808(oct, d * BEAT, 1), 0.42, 0, 0, "pad");
  }
  // pad de acordes (al bus con sidechain)
  mezcla(tB(c), pad(ACORDES[acorde], BAR, breakdown ? 1 : 0.8), breakdown ? 0.32 : 0.2, 0, 0.4, "pad");
  // gancho del guzheng
  if (!breakdown) for (const [p16, nota, bend = 0] of GANCHO[vuelta]) {
    const n = intenso ? nota.replace(/\d/, (o) => +o) : nota;
    mezcla(tB(c, p16 / 4), guzheng(n, 1.3, 0.85, bend), 0.42, -0.25, 0.3);
    if (intenso) mezcla(tB(c, p16 / 4 + 0.02), guzheng(n.replace(/\d/, (o) => +o + 1), 0.8, 0.4), 0.18, 0.4, 0.3); // octava arriba
  }
  // arpegio rápido en la sección de juegos
  if (intenso) {
    const arp = ACORDES[acorde].map((n) => n.replace(/\d/, (o) => +o + 1));
    for (let k = 0; k < 16; k++) mezcla(tB(c, k / 4), guzheng(arp[k % 4], 0.35, 0.3), 0.12, (k % 2 ? 0.6 : -0.6), 0.2);
  }
  // erhu: frase de 4 compases a partir de cada vuelta 0 (desde el compás 8)
  if (vuelta === 0 && c >= DROP + 4 && !breakdown) {
    mezcla(tB(c), erhu(ERHU_FRASE, 0.8), 0.32, 0.25, 0.45);
  }
  // en el respiro: erhu solo, expresivo
  if (breakdown && c === S.idiomas.ini) mezcla(tB(c), erhu([["E5", 0, 2], ["G5", 2, 1], ["A5", 3, 1.5 + (S.idiomas.fin - S.idiomas.ini - 1) * 4]], 0.9), 0.4, 0, 0.5);
}
// redoble + subida antes del cierre
mezcla(tB(CIERRE - 1, 0), subida(BAR, 0.9), 0.55, 0, 0.3);
for (let i = 0; i < 8; i++) mezcla(tB(CIERRE - 1, 2 + i * 0.25), taiko(0.4 + i * 0.07, 100 + i * 8), 0.55, 0, 0.2);

// CIERRE: gran golpe + gong, gancho a medio tiempo y final en La
mezcla(tB(CIERRE), impacto(1), 0.85, 0, 0.3);
mezcla(tB(CIERRE), gong(1, 5), 0.6, 0, 0.55);
mezcla(tB(CIERRE), taiko(1, 85), 0.9, 0, 0.3);
for (let c = CIERRE; c < COMPASES; c++) {
  const k = c - CIERRE;
  for (let b = 0; b < 4; b++) { if (k < 2 || b === 0) { mezcla(tB(c, b), bombo(1), 0.8); SC_marca(tB(c, b)); } if (b % 2 && k < 2) mezcla(tB(c, b), palmada(1), 0.45, 0, 0.3); mezcla(tB(c, b + 0.5), charles(false, 1), 0.2, 0.35); }
  const [raiz, acorde] = PROG[k % 4];
  mezcla(tB(c), bajo808(RAIZ[raiz], BAR * 0.9, 1), 0.4, 0, 0, "pad");
  mezcla(tB(c), pad(ACORDES[acorde], BAR, 0.9), 0.22, 0, 0.45, "pad");
  for (const [p16, nota, bend = 0] of GANCHO[k % 4]) mezcla(tB(c, p16 / 4), guzheng(nota, 1.3, 0.85, bend), 0.42, -0.25, 0.3);
}
if (COMPASES - CIERRE < 4) {} // nada
// golpe final
const FINAL = tB(COMPASES);
mezcla(FINAL - BEAT * 0.5, whoosh(0.5, 0.8), 0.3, 0, 0.2);
mezcla(FINAL, gong(1, 3.2), 0.6, 0, 0.6);
mezcla(FINAL, taiko(1, 80), 0.9, 0, 0.35);
mezcla(FINAL, guzheng("A4", 3, 0.9), 0.5, -0.2, 0.5);
mezcla(FINAL, guzheng("E5", 3, 0.7), 0.4, 0.2, 0.5);
mezcla(FINAL, guzheng("A5", 3, 0.6, 0.05), 0.35, 0, 0.5);

// SFX en las transiciones entre secciones (whoosh) y campanitas en las cifras
for (const s of SECCIONES) if (s.ini > 0) mezcla(tB(s.ini) - 0.32, whoosh(0.45, 0.8), 0.32, (s.ini % 2 ? 0.5 : -0.5), 0.15);
if (S.beneficios) for (const b of [0, 1, 2, 3]) mezcla(tB(S.beneficios.ini, b * 2), campanita(["A5", "C6", "D6", "E6"][b], 1), 0.16, 0, 0.5);

function SC_marca(t) { // envolvente de ducking
  const i0 = Math.round(t * SR), n = Math.round(0.28 * SR);
  for (let k = 0; k < n && i0 + k < N; k++) SC[i0 + k] = Math.max(SC[i0 + k], 1 - k / n);
}

// ---------- reverb (Freeverb simplificado) ----------
function reverb(entrada, sem) {
  const salida = new Float32Array(N);
  const combs = [1116, 1188, 1277, 1356, 1422, 1491, 1557, 1617].map((d) => ({ b: new Float32Array(d + sem), i: 0, f: 0 }));
  const alls = [556, 441, 341, 225].map((d) => ({ b: new Float32Array(d + sem), i: 0 }));
  const fb = 0.84, damp = 0.25;
  for (let n = 0; n < N; n++) {
    const x = entrada[n] * 0.015;
    let s = 0;
    for (const c of combs) {
      const y = c.b[c.i];
      c.f = y * (1 - damp) + c.f * damp;
      c.b[c.i] = x + c.f * fb;
      c.i = (c.i + 1) % c.b.length;
      s += y;
    }
    for (const a of alls) {
      const y = a.b[a.i];
      a.b[a.i] = s + y * 0.5;
      a.i = (a.i + 1) % a.b.length;
      s = y - s;
    }
    salida[n] = s;
  }
  return salida;
}
const revL = reverb(RL, 0), revR = reverb(RR, 23);

// ---------- mezcla final ----------
const out = Buffer.alloc(44 + N * 4);
let pico = 0;
const ML = new Float32Array(N), MR = new Float32Array(N);
for (let i = 0; i < N; i++) {
  const duck = 1 - 0.65 * SC[i];
  ML[i] = L[i] + PAD_L[i] * duck + revL[i] * 2.2;
  MR[i] = R[i] + PAD_R[i] * duck + revR[i] * 2.2;
  pico = Math.max(pico, Math.abs(ML[i]), Math.abs(MR[i]));
}
const g = 1.6 / pico; // empuja contra el limitador suave
const fade = (i) => Math.min(1, (N - i) / (SR * 0.4));
const hpL = new Biquad("hp", 28), hpR = new Biquad("hp", 28);
for (let i = 0; i < N; i++) {
  const l = Math.tanh(hpL.p(ML[i]) * g) * 0.93 * fade(i);
  const r = Math.tanh(hpR.p(MR[i]) * g) * 0.93 * fade(i);
  out.writeInt16LE(Math.round(l * 32767), 44 + i * 4);
  out.writeInt16LE(Math.round(r * 32767), 46 + i * 4);
}
out.write("RIFF", 0); out.writeUInt32LE(36 + N * 4, 4); out.write("WAVE", 8); out.write("fmt ", 12);
out.writeUInt32LE(16, 16); out.writeUInt16LE(1, 20); out.writeUInt16LE(2, 22); out.writeUInt32LE(SR, 24);
out.writeUInt32LE(SR * 4, 28); out.writeUInt16LE(4, 32); out.writeUInt16LE(16, 34); out.write("data", 36); out.writeUInt32LE(N * 4, 40);
const dir = path.dirname(fileURLToPath(import.meta.url));
fs.writeFileSync(path.join(dir, CORTA ? "musica-15s.wav" : "musica.wav"), out);
console.log(`musica.wav · ${DUR.toFixed(2)} s · ${BPM} BPM · ${COMPASES} compases`);
