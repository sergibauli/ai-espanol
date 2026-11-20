// Graba partidas reales (concurso, ahorcado, ruleta) y la Unidad 1 navegando, con el screencast de Chromium.
// Uso: node herramientas/grabar-juegos.mjs  → capturas/v2/<nombre>/f_###.jpg (30 fps)
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const RAIZ = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const { MODULOS_01_20: lista } = await import(path.resolve(RAIZ, "../src/data/modulos/modulos-01-20.js"));
const u1 = lista.find((m) => m && (m.id === "modulo-1" || m.id === 1 || /Hola y Adi/.test(m.titulo || m.title || ""))) || lista[0];
const ZH = Object.fromEntries((u1.vocabulario || []).map((v) => [v.chino, v.espanol]));
const ES = Object.fromEntries((u1.vocabulario || []).map((v) => [v.espanol, v.chino]));
console.log("vocabulario U1:", Object.keys(ZH).length);
const quita = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase();

const b = await chromium.launch();
const SOLO = process.argv.slice(2);
async function sesion(nombre, ruta, accion, { tutor = false, semilla = false, w = 0, nologin = false } = {}) {
  if (SOLO.length && !SOLO.includes(nombre)) return;
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  if (!nologin) await ctx.addInitScript(() => { let sem = 20261120; Math.random = () => ((sem = (sem * 1664525 + 1013904223) >>> 0) / 4294967296); sessionStorage.setItem("dele_auth", "true"); sessionStorage.setItem("dele_expiry", String(Date.now() + 3e6)); });
  if (semilla) await ctx.addInitScript({ path: path.join(RAIZ, "herramientas/semilla-progreso.js") });
  await ctx.addInitScript(() => { sessionStorage.setItem("mono-fab-pista", "1"); const st = () => { const s = document.createElement("style"); s.textContent = ".mf{display:none!important}"; document.head.appendChild(s); }; if (document.head) st(); else document.addEventListener("DOMContentLoaded", st); });
  if (tutor) {
    await ctx.addInitScript(() => { localStorage.setItem("ai-espanol:tutor-level", "A2"); const falsa = { s: btoa("\0"), k: btoa("simulada") }; Object.defineProperty(window, "__DS_KEY__", { get: () => falsa, set: () => {}, configurable: false }); window.speechSynthesis && (window.speechSynthesis.speak = () => {}); });
    const R = ["✏️ Corrección: «Hoy estoy cansado.» (表示暂时的状态用 estar，不用 ser。) ¡Buena pregunta! 💪 ¿Por qué estás cansado hoy?", "¡Perfecto, sin errores! 👏 ¿Qué estudiaste ayer?"]; let n = 0;
    const responder = (route) => route.fulfill({ status: 200, contentType: "application/json", headers: { "access-control-allow-origin": "*" }, body: JSON.stringify({ choices: [{ message: { role: "assistant", content: R[Math.min(n++, 1)] }, finish_reason: "stop" }] }) });
    await ctx.route(/deepseek\.com/, responder); await ctx.route(/\/ai\/chat/, responder);
  }
  const p = await ctx.newPage();
  await p.goto("http://127.0.0.1:5173/" + ruta, { waitUntil: "networkidle" }).catch(() => {});
  await p.waitForTimeout(2500);
  await p.evaluate(() => document.querySelectorAll('[class*="mono-flot"],[class*="MonoFlot"],[class*="burbuja-mono"]').forEach((e) => (e.style.display = "none")));
  const dir = path.join(RAIZ, "capturas/v2", nombre, "crudo");
  fs.rmSync(path.dirname(dir), { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
  const cdp = await ctx.newCDPSession(p);
  const marcos = [];
  cdp.on("Page.screencastFrame", async (f) => {
    const n = marcos.length; const fn = path.join(dir, `c_${String(n).padStart(4, "0")}.jpg`);
    fs.writeFileSync(fn, Buffer.from(f.data, "base64")); marcos.push([fn, f.metadata.timestamp]);
    cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {});
  });
  const graba = async () => cdp.send("Page.startScreencast", { format: "jpeg", quality: 90, maxWidth: 1170, maxHeight: 2532, everyNthFrame: 1 });
  await accion(p, graba);
  await cdp.send("Page.stopScreencast").catch(() => {});
  await p.waitForTimeout(300);
  // remuestrear a 30 fps según las marcas de tiempo
  const lineas = marcos.map(([fn, t], i) => `file '${fn}'\nduration ${Math.max(0.001, ((marcos[i + 1] || [0, t + 0.04])[1] - t)).toFixed(4)}`).join("\n");
  const listaF = path.join(dir, "lista.txt"); fs.writeFileSync(listaF, lineas + `\nfile '${marcos[marcos.length - 1][0]}'\n`);
  const out = path.join(RAIZ, "capturas/v2", nombre);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", listaF, "-vf", "fps=30,scale=1170:2532", "-q:v", "3", path.join(out, "f_%03d.jpg")]);
  console.log(nombre, "crudos", marcos.length, "→", fs.readdirSync(out).filter((f) => f.startsWith("f_")).length, "fotogramas");
  await ctx.close();
}
const textoVisible = (p) => p.evaluate(() => document.body.innerText);
async function teclea(p, palabra) {
  const hechas = new Set();
  for (const l of quita(palabra).replace(/[^A-ZÑ]/g, "")) {
    if (hechas.has(l)) continue; hechas.add(l);
    await p.locator("button", { hasText: new RegExp(`^${l}$`) }).first().click({ timeout: 2000 }).catch(() => {});
    await p.waitForTimeout(420);
  }
}
function buscaZh(texto) { return Object.keys(ZH).filter((z) => texto.includes(z)).sort((a, b2) => b2.length - a.length)[0]; }


const rueda = async (p, n, dy = 60, ms = 45) => { for (let i = 0; i < n; i++) { await p.mouse.wheel(0, dy); await p.waitForTimeout(ms); } };
const clicTxt = async (p, t, exact = true) => p.getByText(t, { exact }).first().click({ timeout: 3000 }).catch(() => console.log("sin clic:", t));
await sesion("ruta", "#/ruta", async (p, graba) => {
  await graba(); await p.waitForTimeout(600);
  await rueda(p, 8, 45); await p.waitForTimeout(400); await rueda(p, 8, -45); await p.waitForTimeout(300);
  for (const n of ["A2", "B1", "B2"]) { await clicTxt(p, n); await p.waitForTimeout(1300); }
});
await sesion("tutor", "#/tutor-voz", async (p, graba) => {
  const input = p.locator(".tutor-input input"); await input.scrollIntoViewIfNeeded().catch(() => {});
  await p.evaluate(() => { const c = document.querySelector(".tutor-chat"); c && c.scrollIntoView({ block: "end" }); window.scrollBy(0, 90); });
  await p.waitForTimeout(500); await graba(); await p.waitForTimeout(400);
  await input.click().catch(() => {}); await p.keyboard.type("Corrige: «Yo soy cansado hoy».", { delay: 45 });
  await p.locator(".tutor-send").click().catch(() => {}); await p.waitForTimeout(2600);
  await p.evaluate(() => { const l = document.querySelector(".tutor-msgs"); if (l) l.scrollTop = l.scrollHeight; });
  await p.waitForTimeout(1200);
}, { tutor: true, semilla: true });
await sesion("diccionario", "#/diccionarios", async (p, graba) => {
  await graba(); await p.waitForTimeout(500);
  await p.locator(".dz-buscador input").click().catch(() => {}); await p.keyboard.type("agua", { delay: 160 }); await p.waitForTimeout(1300);
  await p.locator(".dz-ficha").first().click().catch(() => {}); await p.waitForTimeout(1800);
});
await sesion("pronunciacion", "#/pronunciacion", async (p, graba) => {
  await graba(); await p.waitForTimeout(500); await rueda(p, 14, 50); await p.waitForTimeout(500); await clicTxt(p, "RR", false); await p.waitForTimeout(1800);
});
await sesion("examenes", "#/oficial", async (p, graba) => {
  await graba(); await p.waitForTimeout(500); await rueda(p, 16, 55); await p.waitForTimeout(400); await clicTxt(p, "Entrar · 进入", false); await p.waitForTimeout(1600); await rueda(p, 10, 50); await p.waitForTimeout(600);
}, { semilla: true });
await sesion("progreso", "#/mi-dele", async (p, graba) => {
  await graba(); await p.waitForTimeout(700); await rueda(p, 24, 50, 55); await p.waitForTimeout(600);
}, { semilla: true });
await sesion("idiomas", "#/modulos/modulo-16", async (p, graba) => {
  await rueda(p, 6, 60); await p.waitForTimeout(500);
  await graba(); await p.waitForTimeout(500);
  await p.locator('button:has-text("文A"), button[aria-label*="dioma"], .selector-idioma button').first().click().catch(() => console.log("sin selector"));
  await p.waitForTimeout(1300); await clicTxt(p, "English", false); await p.waitForTimeout(1800); await rueda(p, 8, 50); await p.waitForTimeout(600);
});
await sesion("portada", "#/", async (p, graba) => {
  await graba(); await p.waitForTimeout(1500);
  await rueda(p, 30, 40, 50); await p.waitForTimeout(700); await rueda(p, 20, 45, 50); await p.waitForTimeout(600);
}, { nologin: true });
await b.close();
