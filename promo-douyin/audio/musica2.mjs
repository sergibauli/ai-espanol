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

// ---------- instrumentos pop (estilo Douyin) ----------
function pluck(nota, dur = 0.5, gan = 1) { // pluck brillante de future bass
  const f = hz(nota), n = Math.round(dur * SR), b = new Float32Array(n);
  const lp = new Biquad("lp", 6000, 1.2); let f1 = 0, f2 = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    if (i % 32 === 0) lp.set(900 + 7000 * Math.exp(-t * 14), 1.4);
    f1 += f / SR; f2 += f * 1.006 / SR;
    const s = (2 * (f1 % 1) - 1) * 0.6 + (2 * (f2 % 1) - 1) * 0.5 + (f1 % 1 < 0.5 ? 0.35 : -0.35);
    b[i] = lp.p(s) * Math.exp(-t * 7) * Math.min(1, t / 0.003) * gan;
  }
  return b;
}
function supersaw(notas, dur, gan = 1, corte = 3800) {
  const n = Math.round(dur * SR), b = new Float32Array(n); const lp = new Biquad("lp", corte, 0.8);
  const vs = notas.flatMap((x) => [-0.012, -0.005, 0, 0.006, 0.013].map((dt) => ({ f: hz(x) * (1 + dt), ph: rnd() })));
  for (let i = 0; i < n; i++) {
    const t = i / SR; let s = 0;
    for (const v of vs) { v.ph += v.f / SR; s += 2 * (v.ph % 1) - 1; }
    b[i] = lp.p(s / vs.length) * Math.min(1, t / 0.01) * Math.min(1, (dur - t) / 0.05) * gan;
  }
  return b;
}
function voxChop(nota, dur = 0.3, vocal = "a", gan = 1) { // «voz» sintética tipo vocal chop
  const F = { a: [800, 1200, 2600], o: [500, 900, 2400], e: [500, 1800, 2600], i: [300, 2200, 3000] }[vocal];
  const f = hz(nota), n = Math.round(dur * SR), b = new Float32Array(n);
  const bps = F.map((fr, k) => new Biquad("bp", fr, 6 - k));
  let ph = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR; ph += f * (1 + 0.012 * Math.sin(2 * Math.PI * 5.5 * t)) / SR;
    const src = 2 * (ph % 1) - 1;
    const s = bps[0].p(src) * 1 + bps[1].p(src) * 0.6 + bps[2].p(src) * 0.25;
    b[i] = s * Math.min(1, t / 0.015) * Math.min(1, (dur - t) / 0.06) * gan * 2.2;
  }
  return b;
}

// ---------- composición (pop electrónico de Douyin: future bass + trap) ----------
const tB = (compas, beat = 0) => compas * BAR + beat * BEAT;
const S = Object.fromEntries(SECCIONES.map((s) => [s.id, s]));
const DROP = S.revelacion.ini, CIERRE = S.cierre.ini;
const PROG = [["Am", "A1"], ["F", "F1"], ["C", "C2"], ["G", "G1"]];
const AC = { Am: ["A3", "C4", "E4", "A4"], F: ["F3", "A3", "C4", "F4"], C: ["G3", "C4", "E4", "G4"], G: ["G3", "B3", "D4", "G4"] };
// gancho melódico (pentatónico, pegadizo) en corcheas/semicorcheas: [pos16, nota, dur16]
const HOOK = [
  [[0, "E5", 2], [2, "E5", 1], [3, "G5", 2], [6, "A5", 2], [8, "G5", 2], [10, "E5", 2], [12, "D5", 4]],
  [[0, "C5", 2], [2, "D5", 2], [4, "E5", 3], [8, "D5", 2], [10, "C5", 2], [12, "A4", 4]],
  [[0, "E5", 2], [2, "E5", 1], [3, "G5", 2], [6, "A5", 2], [8, "C6", 3], [11, "A5", 1], [12, "G5", 4]],
  [[0, "E5", 2], [2, "D5", 2], [4, "C5", 2], [6, "D5", 2], [8, "E5", 6]],
];
const SC_marca = (t) => { const i0 = Math.round(t * SR), n = Math.round(0.32 * SR); for (let k = 0; k < n && i0 + k < N; k++) SC[i0 + k] = Math.max(SC[i0 + k], Math.pow(1 - k / n, 0.6)); };
const seccion = (c) => SECCIONES.find((s) => c >= s.ini && c < s.fin) || {};

// GANCHO: impacto + build con acordes filtrados, palmas que aceleran y subida
mezcla(0, impacto(1), 0.9, 0, 0.3); mezcla(0, gong(1, 4), 0.35, 0, 0.5);
for (let c = 0; c < DROP; c++) {
  const [ac] = PROG[c % 4];
  mezcla(tB(c), supersaw(AC[ac], BAR, 0.8, 900 + c * 500), 0.28, 0, 0.4, "pad");
  for (let k = 0; k < 4; k++) { mezcla(tB(c, k), bombo(0.7), c >= 2 ? 0.6 : 0.45); SC_marca(tB(c, k)); }
  if (c >= 1) for (let k = 0; k < 8; k++) mezcla(tB(c, k * 0.5), palmada(0.5), 0.18 + c * 0.04, 0, 0.3);
  for (const [p, nota, d] of HOOK[c % 4]) mezcla(tB(c, p / 4), pluck(nota, d / 4 * BEAT + 0.2, 0.6), 0.16, -0.2, 0.5);
}
for (let i = 0; i < 16; i++) mezcla(tB(DROP - 1, 2 + i * 0.125), palmada(0.3 + i * 0.04), 0.3, 0, 0.2); // redoble
mezcla(tB(DROP - 1), subida(BAR, 1), 0.6, 0, 0.3);
mezcla(tB(DROP - 1, 3.5), voxChop("A4", 0.35, "o", 1), 0.35, 0, 0.4); // «oh!»

// CUERPO: drop con bombo 4x4, 808, acordes con bombeo, pluck pegadizo y vocal chops
for (let c = DROP; c < CIERRE; c++) {
  const s = seccion(c), v = (c - DROP) % 4, [ac, raiz] = PROG[v];
  const respiro = s.id === "idiomas", fuerte = ["juegos", "turbo", "beneficios"].includes(s.id);
  for (let k = 0; k < 4; k++) {
    if (!respiro || k === 0) { mezcla(tB(c, k), bombo(1), 0.88); SC_marca(tB(c, k)); }
    if (k % 2 && !respiro) mezcla(tB(c, k), palmada(1), 0.5, 0, 0.3);
    mezcla(tB(c, k + 0.5), charles(false, 1), 0.24, 0.3);
    mezcla(tB(c, k + 0.25), charles(false, 0.6), 0.12, -0.3); mezcla(tB(c, k + 0.75), charles(false, 0.6), 0.12, -0.3);
  }
  if (v === 3 && !respiro) for (let i = 0; i < 8; i++) mezcla(tB(c, 3 + i * 0.125), charles(false, 0.9), 0.2, (i % 2 ? 0.4 : -0.4)); // redoble de charles (trap)
  if (!respiro) for (const [p, d] of [[0, 1.4], [1.5, 0.5], [2, 1], [3, 0.5], [3.5, 0.5]]) mezcla(tB(c, p), bajo808(p === 3.5 ? raiz.replace(/\d/, (n) => +n + 1) : raiz, d * BEAT, 1), 0.5, 0, 0, "pad");
  // acordes cortos a contratiempo con bombeo
  for (const p of [0, 0.75, 1.5, 2.5, 3, 3.5]) mezcla(tB(c, p), supersaw(AC[ac], 0.42 * BEAT, 1, fuerte ? 5200 : 4200), respiro ? 0.12 : 0.22, 0, 0.35, "pad");
  if (respiro) mezcla(tB(c), supersaw(AC[ac], BAR, 0.9, 1600), 0.3, 0, 0.6, "pad");
  // pluck del gancho (octava arriba en los momentos fuertes)
  if (!respiro) for (const [p, nota, d] of HOOK[v]) {
    mezcla(tB(c, p / 4), pluck(nota, d / 4 * BEAT + 0.25, 1), 0.32, -0.15, 0.35);
    if (fuerte) mezcla(tB(c, p / 4), pluck(nota.replace(/\d/, (o) => +o + 1), d / 4 * BEAT + 0.15, 0.5), 0.12, 0.35, 0.35);
  }
  // vocal chops «ah/oh» en la vuelta 1 y 3
  if ((v === 1 || v === 3) && !respiro) [["A5", 0, "a"], ["G5", 0.75, "o"], ["E5", 1.5, "a"], ["G5", 2.5, "e"]].forEach(([n, p, voc]) => mezcla(tB(c, 2 + p * 0.5), voxChop(n, 0.28, voc, 1), 0.2, 0.25, 0.45));
  if (v === 3) mezcla(tB(c, 3), whoosh(BEAT, 0.6), 0.2, 0, 0.2);
}
// subida y golpe del cierre
mezcla(tB(CIERRE - 1), subida(BAR, 0.9), 0.5, 0, 0.3);
mezcla(tB(CIERRE), impacto(1), 0.8, 0, 0.3);
for (let c = CIERRE; c < COMPASES; c++) {
  const v = (c - CIERRE) % 4, [ac, raiz] = PROG[v];
  for (let k = 0; k < 4; k++) { mezcla(tB(c, k), bombo(1), 0.8); SC_marca(tB(c, k)); if (k % 2) mezcla(tB(c, k), palmada(1), 0.45, 0, 0.3); mezcla(tB(c, k + 0.5), charles(false, 1), 0.2, 0.3); }
  mezcla(tB(c), bajo808(raiz, BAR * 0.95, 1), 0.45, 0, 0, "pad");
  for (const p of [0, 0.75, 1.5, 2.5, 3, 3.5]) mezcla(tB(c, p), supersaw(AC[ac], 0.42 * BEAT, 1, 4800), 0.22, 0, 0.35, "pad");
  for (const [p, nota, d] of HOOK[v]) mezcla(tB(c, p / 4), pluck(nota, d / 4 * BEAT + 0.25, 1), 0.32, -0.15, 0.35);
}
const FINAL = tB(COMPASES);
mezcla(FINAL, impacto(0.9), 0.7, 0, 0.4);
mezcla(FINAL, supersaw(AC.Am, 2.2, 1, 3000), 0.3, 0, 0.6, "pad");
mezcla(FINAL, voxChop("A5", 0.6, "a", 1), 0.25, 0, 0.6);
for (const s of SECCIONES) if (s.ini > DROP) mezcla(tB(s.ini) - 0.3, whoosh(0.4, 0.7), 0.22, (s.ini % 2 ? 0.5 : -0.5), 0.15);

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
fs.writeFileSync(path.join(dir, CORTA ? "musica2-15s.wav" : "musica2.wav"), out);
console.log(`musica.wav · ${DUR.toFixed(2)} s · ${BPM} BPM · ${COMPASES} compases`);
