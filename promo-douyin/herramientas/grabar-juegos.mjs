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
async function sesion(nombre, ruta, accion) {
  if (SOLO.length && !SOLO.includes(nombre)) return;
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await ctx.addInitScript(() => { let sem = 20261120; Math.random = () => ((sem = (sem * 1664525 + 1013904223) >>> 0) / 4294967296); sessionStorage.setItem("dele_auth", "true"); sessionStorage.setItem("dele_expiry", String(Date.now() + 3e6)); });
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

// AHORCADO
await sesion("ahorcado", "#/juegos/ahorcado", async (p, graba) => {
  await p.getByText("Hola y Adiós - Saludos", { exact: false }).first().click();
  await p.waitForTimeout(1200);
  await graba(); await p.waitForTimeout(600);
  const zh = buscaZh(await textoVisible(p)); console.log("ahorcado:", zh, ZH[zh]);
  if (zh) await teclea(p, ZH[zh]);
  await p.waitForTimeout(1800);
});
// RULETA
await sesion("ruleta", "#/juegos/ruleta", async (p, graba) => {
  await p.getByText("Hola y Adiós - Saludos", { exact: false }).first().click();
  await p.waitForTimeout(1200);
  await graba(); await p.waitForTimeout(500);
  await p.evaluate(() => window.scrollTo(0, 0));
  const centro = await p.evaluate(() => { const el = [...document.querySelectorAll("button, div, span")].find((e) => e.textContent.trim() === "转" && e.offsetParent); const r = el.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, tag: el.tagName }; });
  console.log("rueda", centro);
  await p.mouse.click(centro.x, centro.y);
  await p.waitForTimeout(5500);
  const t = await textoVisible(p);
  const bloque = t.split("Adivina la palabra").pop() || t;
  const zh = buscaZh(bloque); console.log("ruleta:", zh, ZH[zh]);
  if (zh) await teclea(p, ZH[zh]);
  await p.waitForTimeout(1800);
});
// CONCURSO (preguntas con cuenta atrás)
await sesion("concurso", "#/juegos/kahoot", async (p, graba) => {
  await p.getByText("Hola y Adiós - Saludos", { exact: false }).first().click();
  await graba();
  await p.waitForFunction(() => document.body.innerText.includes("西班牙语怎么说"), null, { timeout: 15000 }).catch(() => {});
  await p.waitForTimeout(1300);
  const t = await textoVisible(p);
  const zh = buscaZh(t.split("西班牙语怎么说").pop().slice(0, 40));
  console.log("concurso:", zh, ZH[zh]);
  if (zh) await p.getByText(ZH[zh], { exact: true }).first().click().catch((e) => console.log("sin clic", e.message.slice(0, 80)));
  await p.waitForTimeout(3200);
});
// UNIDAD 1 navegando: scroll y pestañas
await sesion("unidad1", "#/modulos/modulo-1", async (p, graba) => {
  await graba(); await p.waitForTimeout(500);
  for (let i = 0; i < 26; i++) { await p.mouse.wheel(0, 55); await p.waitForTimeout(40); }
  await p.waitForTimeout(500);
  await p.getByText("Palabras", { exact: true }).first().click().catch(() => {});
  await p.waitForTimeout(1300);
  for (let i = 0; i < 12; i++) { await p.mouse.wheel(0, 50); await p.waitForTimeout(40); }
  await p.waitForTimeout(400);
  await p.getByText("Diálogos", { exact: true }).first().click().catch(() => {});
  await p.waitForTimeout(1600);
});
await b.close();
