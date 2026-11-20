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
await sesion("correccion", "#/oficial/A2", async (p, graba) => {
  await clicTxt(p, "Empezar"); await p.waitForTimeout(2500);
  await graba(); await p.waitForTimeout(500);
  await rueda(p, 10, 50); await p.waitForTimeout(500);
  await clicTxt(p, "En Prado del Roble", false); await p.waitForTimeout(700);
  await rueda(p, 6, 50); await p.waitForTimeout(300);
  const ops = p.locator("button:visible", { hasText: /^[ABC]\b/ }); const n = await ops.count(); console.log("opciones", n);
  for (const i of [3, 7]) if (i < n) { await ops.nth(i).click().catch(() => {}); await p.waitForTimeout(500); }
  await p.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" })); await p.waitForTimeout(900);
  await clicTxt(p, "Corregir todo", false); await p.waitForTimeout(1800);
  await rueda(p, 14, 45); await p.waitForTimeout(800); await rueda(p, 10, 45); await p.waitForTimeout(800);
}, { semilla: true });
await sesion("tv", "#/tv", async (p, graba) => {
  await p.addStyleTag({ content: ".tv-ia,.tv-aviso-ia{display:none!important}" });
  await p.waitForTimeout(800);
  await graba(); await p.waitForTimeout(900);
  await rueda(p, 12, 45, 50); await p.waitForTimeout(600);
  await p.locator("video").first().evaluate((v) => { v.muted = true; v.currentTime = 6; return v.play(); }).catch(() => {});
  await p.waitForTimeout(1600);
  await rueda(p, 16, 50, 50); await p.waitForTimeout(500);
  for (let i = 0; i < 3; i++) { await p.locator('button[aria-label*="iguiente"], .tv-carrusel button:last-of-type').first().click({ timeout: 1500 }).catch(() => {}); await p.waitForTimeout(700); }
});
await sesion("pinball", "#/juegos/pinball-dragon", async (p, graba) => {
  await clicTxt(p, "Hola y Adiós - Saludos", false); await p.waitForTimeout(1200);
  for (const t of ["Jugar", "Empezar", "¡A jugar!"]) await p.getByText(t, { exact: false }).first().click({ timeout: 800 }).catch(() => {});
  await p.waitForTimeout(1500); await graba(); await p.waitForTimeout(300);
  await p.keyboard.down(" "); await p.waitForTimeout(900); await p.keyboard.up(" ");
  for (let i = 0; i < 14; i++) { const k = i % 2 ? "ArrowRight" : "ArrowLeft"; await p.keyboard.down(k); await p.waitForTimeout(160); await p.keyboard.up(k); await p.waitForTimeout(230); }
});
await sesion("ruta3", "#/ruta", async (p, graba) => {
  await graba(); await p.waitForTimeout(400);
  await rueda(p, 40, 40, 45); await p.waitForTimeout(300); await rueda(p, 40, -40, 30);
  for (const n of ["A2", "B1", "B2"]) { await clicTxt(p, n); await p.waitForTimeout(1300); }
});
await sesion("viaje", "#/juegos/viaje-mono", async (p, graba) => {
  await clicTxt(p, "Hola y Adiós - Saludos", false); await p.waitForTimeout(1500);
  await p.locator(".vm-empezar").first().click({ timeout: 4000 }).catch(() => console.log("sin empezar"));
  await p.waitForTimeout(1500);
  const correcta = () => p.evaluate(() => {
    const el = document.querySelector(".vm-q-opciones"); if (!el) return null;
    const k = Object.keys(el).find((x) => x.startsWith("__reactFiber")); let f = el[k];
    while (f) { const pr = f.memoizedProps; if (pr && pr.q && pr.q.p && pr.q.p.correcta) return pr.q.p.correcta; f = f.return; }
    return null; });
  await graba();
  for (let turno = 0; turno < 2; turno++) {
    await p.waitForSelector(".vm-q-opciones", { timeout: 12000 }).catch(() => {});
    await p.waitForTimeout(900);
    const c = await correcta(); console.log("correcta:", c);
    if (c) await p.locator(".vm-q-opcion", { hasText: c }).first().click().catch(() => {});
    await p.waitForTimeout(1200);
    await p.locator(".vm-q-seguir").first().click({ timeout: 2500 }).catch(() => {});
    await p.waitForTimeout(700);
    const bt = p.locator(".vm-tiro-boton:not([disabled])").first();
    if (await bt.count()) { await bt.focus(); await p.keyboard.press("Enter"); } else { const bt2 = p.locator(".vm-tiro-boton").first(); const bb = await bt2.boundingBox().catch(() => null); console.log("dado deshabilitado", !!bb); if (bb) { await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await p.mouse.down(); await p.waitForTimeout(500); await p.mouse.up(); } }
    await p.waitForTimeout(4200);
    if (turno === 0) await p.waitForTimeout(500);
  }
});
await b.close();
