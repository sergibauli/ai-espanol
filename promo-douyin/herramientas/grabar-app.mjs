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
// ===== Examen de práctica (A2 · modelo 1): las cuatro pruebas =====
const EXAMEN = "#/oficial/A2/1";
// Desplaza la página con la rueda, en pasos cortos, hasta que el elemento quede a `off` px del borde superior
const irA = async (p, sel, off = 120, paso = 55, ms = 28) => {
  const y = await p.evaluate((s) => { const e = document.querySelector(s); return e ? e.getBoundingClientRect().top : null; }, sel);
  if (y == null) return console.log("sin elemento:", sel);
  const d = y - off; const n = Math.max(1, Math.ceil(Math.abs(d) / paso));
  for (let i = 0; i < n; i++) { await p.mouse.wheel(0, d / n); await p.waitForTimeout(ms); }
  await p.waitForTimeout(120);
};
// Respuesta correcta de una pregunta, leída de las props de React (PreguntaSX → item.correcta)
const correctaDe = (p, key) => p.evaluate((k) => {
  const el = document.getElementById(`q-${k}`); if (!el) return null;
  const fk = Object.keys(el).find((x) => x.startsWith("__reactFiber")); let f = el[fk];
  while (f) { const pr = f.memoizedProps; if (pr && pr.item && "correcta" in pr.item) return pr.item.correcta; f = f.return; }
  return null;
}, key);
// Toque en el centro del elemento, sin que Playwright desplace la página
const toca = async (p, sel) => {
  const bb = await p.locator(sel).first().boundingBox().catch(() => null);
  if (!bb) return console.log("sin elemento para tocar:", sel);
  await p.mouse.click(bb.x + bb.width / 2, bb.y + bb.height / 2);
};
const responde = async (p, key) => {
  const c = await correctaDe(p, key); console.log(key, "correcta →", c);
  await toca(p, `#q-${key} .sx-opt[data-opcion="${c}"]`);
  await p.waitForTimeout(420);
  await toca(p, `#q-${key} .sx-qpie button`);
};
// Palabras que no deben verse en el tráiler
const vigila = async (p, nombre) => {
  const hits = await p.evaluate(() => {
    const out = []; const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) { const t = w.currentNode.nodeValue; if (/\b(DELE|IA|AI)\b/.test(t)) { const r = w.currentNode.parentElement.getBoundingClientRect(); if (r.width && r.bottom > 0 && r.top < innerHeight) out.push(t.trim().slice(0, 80)); } }
    return out;
  });
  console.log(nombre, hits.length ? "VISIBLE PROHIBIDO: " + JSON.stringify(hits) : "sin DELE/IA/AI en pantalla");
};
// .corr-pen: se oculta la penalización por extensión (el texto tecleado es corto a propósito).
// Legibilidad en el tráiler: la ficha de corrección usa grises pensados para fondo oscuro y sobre el papel quedan muy pálidos.
const CSS_EXAMEN = [
  ".mf,[class*='mono-flot']{display:none!important} .corr-pen{display:none!important}",
  ".sx-veredicto .text-white\\/80{color:#2b2118!important} .sx-veredicto .text-white\\/60{color:#3b2f25!important}",
  ".sx-veredicto .text-white\\/30{color:#5f4d3c!important} .sx-veredicto .text-red-400\\/60{color:#c0392b!important;font-size:13px!important}",
].join("\n");
// Corrector simulado: nada sale a la red; respuestas fijas en el formato JSON que espera CorrectionDisplay
const CORR_ESCRITA = {
  criterios: [
    { criterio: "Adecuación a la tarea", banda: "Apto", nota: 2, comentario: "回应了朋友的邮件：感谢、评价房子、问价格、约时间。" },
    { criterio: "Coherencia y cohesión", banda: "Apto", nota: 2, comentario: "结构清楚，但连接词偏少，可以多用 además、por eso。" },
    { criterio: "Corrección gramatical y léxica", banda: "Casi apto", nota: 1, comentario: "ser / estar 混用，过去的事用了现在时。" },
    { criterio: "Alcance", banda: "Apto", nota: 2, comentario: "词汇够用，句子可以再丰富一些。" },
  ],
  errores: [
    { original: "Yo soy muy contento", correccion: "Estoy muy contento", tipo: "gramática", explicacion: "表示心情、状态用 estar，不用 ser；主语 yo 可以省略。" },
    { original: "el piso es cerca de mi trabajo", correccion: "el piso está cerca de mi trabajo", tipo: "gramática", explicacion: "表示位置要用 estar：estar cerca de…" },
    { original: "Ayer yo veo otro, pero es caro", correccion: "Ayer vi otro, pero era caro", tipo: "gramática", explicacion: "ayer 说的是过去已完成的动作，要用简单过去时 vi；描述用 era。" },
  ],
  sugerencias: [
    "多用连接词：además（另外）、por eso（所以）、la verdad es que…，文章会更连贯。",
    "西语的动词已经表明人称，不必每句都说 yo。",
    "再写两三句：说说你最喜欢这个房子的哪一点（el balcón, las habitaciones…），字数要达到 60–70 词。",
  ],
  fortalezas: ["开头和结尾符合朋友之间的邮件格式。", "问题提得很自然：¿Cuánto cuesta?"],
  nivelCERL: "A2",
  textoCorregido: "¡Hola, Queralt! Gracias por tu mensaje. Estoy muy contento porque el piso está cerca de mi trabajo. Ayer vi otro, pero era caro. ¿Cuánto cuesta? El sábado puedo ir. ¡Un abrazo!",
};
const CORR_ORAL = {
  puntuacion: 72,
  criterios: [
    { criterio: "Coherencia", banda: "Apto", nota: 2, comentario: "按顺序介绍了身份、外貌、性格和你们一起做的事。" },
    { criterio: "Fluidez", banda: "Casi apto", nota: 1, comentario: "句子很短，停顿较多；试着把两三个短句连成一句。" },
    { criterio: "Corrección", banda: "Apto", nota: 2, comentario: "大部分句子正确，过去的状态要用过去未完成时。" },
    { criterio: "Alcance", banda: "Apto", nota: 2, comentario: "描述外貌和性格的词汇用得很合适。" },
  ],
  errores: [
    { original: "Antes ella es profesora", correccion: "Antes era profesora", tipo: "gramática", explicacion: "过去的职业、状态用过去未完成时 (imperfecto)：era。" },
    { original: "tiene pelo blanco", correccion: "tiene el pelo blanco", tipo: "gramática", explicacion: "描述头发、眼睛时要加定冠词：tener el pelo / los ojos…" },
    { original: "Ella se llama Lin", correccion: "Se llama Lin", tipo: "registro", explicacion: "上下文已经清楚是谁，省略 ella 听起来更地道。" },
  ],
  sugerencias: [
    "想词的时候别沉默，用自然的填充语争取时间：pues…, bueno…, la verdad es que…",
    "把短句连起来说：Es baja y tiene el pelo blanco, pero es muy activa. 多用 y、pero、porque、además。",
    "讲一个具体的小故事（Recuerdo que un domingo…），独白更生动，也更容易说满 2–3 分钟。",
  ],
  fortalezas: ["发音清楚，语速稳定。", "讲到了五个要点中的四个，内容完整。"],
  nivelCERL: "A2",
  textoCorregido: "Una persona muy importante para mí es mi abuela. Se llama Lin y vive en Chengdu. Es baja, tiene el pelo blanco y es muy simpática. Antes era profesora de matemáticas. Todos los domingos cocinamos juntos y hablamos mucho. Es importante para mí porque me enseña a ser paciente.",
};
const TRANSCRIPCION_ORAL = "Una persona muy importante para mí es mi abuela. Ella se llama Lin y vive en Chengdu. Es baja, tiene pelo blanco y es muy simpática. Antes ella es profesora de matemáticas. Cada domingo nosotros cocinamos juntos y hablamos mucho. Es importante porque me enseña a ser paciente.";
async function correctorSimulado(p) {
  await p.route(/deepseek\.com|\/ai\/chat/, async (route) => {
    let cuerpo = {}; try { cuerpo = JSON.parse(route.request().postData() || "{}"); } catch {}
    const sistema = cuerpo.messages?.[0]?.content || ""; const alumno = cuerpo.messages?.at(-1)?.content || "";
    let json;
    if (/abuela/i.test(alumno)) json = CORR_ORAL;
    else {
      // la app resta por extensión (que aquí se oculta): se compensa para que la nota visible sea 66
      const palabras = Number((sistema.match(/PALABRAS DEL TEXTO[^:]*:\s*(\d+)/) || [])[1] || 0);
      const min = Number((sistema.match(/EXTENSIÓN EXIGIDA:\s*(\d+)/) || [])[1] || 0);
      const pen = min && palabras < min ? Math.min(30, Math.round(((min - palabras) / min) * 40)) : 0;
      json = { puntuacion: 66 + pen, ...CORR_ESCRITA };
    }
    await new Promise((r) => setTimeout(r, 900));
    await route.fulfill({ status: 200, contentType: "application/json", headers: { "access-control-allow-origin": "*" }, body: JSON.stringify({ choices: [{ message: { role: "assistant", content: JSON.stringify(json) }, finish_reason: "stop" }] }) });
  });
}
await sesion("exlectura", EXAMEN, async (p, graba) => {
  p.on("dialog", (d) => d.accept());
  await p.addStyleTag({ content: CSS_EXAMEN });
  await p.evaluate(() => { const h = document.querySelector(".sx-hoja"); h && window.scrollTo(0, h.getBoundingClientRect().top + scrollY - 70); });
  await p.waitForTimeout(600);
  await graba(); await p.waitForTimeout(500);
  await rueda(p, 26, 50, 38); await p.waitForTimeout(250);
  await irA(p, "#q-p1-1-1", 110);
  await p.waitForTimeout(250);
  await responde(p, "p1-1-1"); await p.waitForTimeout(1300);
  await irA(p, "#q-p1-1-2", 110);
  await responde(p, "p1-1-2"); await p.waitForTimeout(1500);
  await vigila(p, "exlectura");
}, { semilla: true });
await sesion("exauditiva", EXAMEN, async (p, graba) => {
  p.on("dialog", (d) => d.accept());
  await p.addStyleTag({ content: CSS_EXAMEN });
  await graba(); await p.waitForTimeout(500);
  await p.locator(".sx-medallas .sx-med").nth(1).click(); await p.waitForTimeout(1100);
  await irA(p, ".sx-gong-caja", 150, 50, 28); await p.waitForTimeout(250);
  await p.locator(".sx-gong-boton").click().catch(() => console.log("sin gong")); await p.waitForTimeout(1800);
  await vigila(p, "exauditiva-audio");
  await irA(p, "#q-p2-1-1", 110, 60, 26);
  await responde(p, "p2-1-1"); await p.waitForTimeout(1600);
  await rueda(p, 4, 45, 40); await p.waitForTimeout(500);
  await vigila(p, "exauditiva");
}, { semilla: true });
await sesion("exescrita", EXAMEN, async (p, graba) => {
  p.on("dialog", (d) => d.accept());
  await p.addStyleTag({ content: CSS_EXAMEN });
  await correctorSimulado(p);
  await p.locator(".sx-medallas .sx-med").nth(2).click(); await p.waitForTimeout(1500);
  await p.evaluate(() => { const t = document.querySelector(".sx-lienzo"); t && window.scrollTo(0, t.getBoundingClientRect().top + scrollY - 230); });
  await p.waitForTimeout(600);
  await graba(); await p.waitForTimeout(400);
  await p.locator("textarea.sx-renglones").click(); await p.waitForTimeout(150);
  await p.keyboard.type("¡Hola, Queralt! Gracias por tu mensaje. Yo soy muy contento porque el piso es cerca de mi trabajo. Ayer yo veo otro, pero es caro. ¿Cuánto cuesta? El sábado puedo ir. ¡Un abrazo!", { delay: 8 });
  await p.waitForTimeout(300);
  await irA(p, ".sx-iabar", 330, 50, 26);
  await p.locator(".sx-iabar button.sx-btn").click().catch(() => console.log("sin corregir"));
  await p.waitForSelector(".sx-veredicto", { timeout: 6000 }).catch(() => console.log("sin veredicto"));
  await p.waitForTimeout(250);
  await irA(p, ".sx-veredicto", 70, 50, 26); await p.waitForTimeout(900);
  await vigila(p, "exescrita-nota");
  await irA(p, ".sx-veredicto .corr-criterios", 70, 40, 28); await p.waitForTimeout(800);
  await rueda(p, 14, 50, 40); await p.waitForTimeout(800);
  await rueda(p, 9, 50, 40); await p.waitForTimeout(700);
  await vigila(p, "exescrita");
}, { tutor: true, semilla: true });
await sesion("exoral", EXAMEN, async (p, graba) => {
  p.on("dialog", (d) => d.accept());
  await p.addStyleTag({ content: CSS_EXAMEN });
  await correctorSimulado(p);
  // Micrófono simulado: el reconocimiento de voz «oye» la transcripción palabra a palabra
  await p.evaluate((texto) => {
    class ReconocimientoSimulado {
      start() { const pal = texto.split(" "); let i = 0; this.txt = ""; this.t = setInterval(() => { if (i >= pal.length) return; this.txt = pal.slice(0, ++i).join(" "); const r = [{ transcript: this.txt }]; r.isFinal = false; this.onresult?.({ resultIndex: 0, results: [r] }); setTimeout(() => { const ta = document.querySelector("textarea.sx-renglones.oral"); if (ta) ta.scrollTop = ta.scrollHeight; }, 20); }, 62); }
      stop() { clearInterval(this.t); const r = [{ transcript: this.txt }]; r.isFinal = true; this.onresult?.({ resultIndex: 0, results: [r] }); setTimeout(() => this.onend?.(), 30); }
      abort() { this.stop(); }
    }
    window.SpeechRecognition = ReconocimientoSimulado; window.webkitSpeechRecognition = ReconocimientoSimulado;
  }, TRANSCRIPCION_ORAL);
  await p.locator(".sx-medallas .sx-med").nth(3).click(); await p.waitForTimeout(1500);
  await p.evaluate(() => { const t = document.querySelector(".sx-estudio"); t && window.scrollTo(0, t.getBoundingClientRect().top + scrollY - 110); });
  await p.waitForTimeout(600);
  await graba(); await p.waitForTimeout(250);
  await toca(p, ".sx-fases button.sx-fase"); await p.waitForTimeout(2700);
  await vigila(p, "exoral-prep");
  await toca(p, ".sx-fases button.sx-fase"); await p.waitForTimeout(250);
  await toca(p, ".sx-micb"); await p.waitForTimeout(3300);
  await toca(p, ".sx-micb"); await p.waitForTimeout(400);
  await irA(p, ".sx-estudio .sx-iabar", 560, 50, 26);
  await p.locator(".sx-estudio .sx-iabar button.sx-btn").click().catch(() => console.log("sin corregir"));
  await p.waitForSelector(".sx-veredicto", { timeout: 6000 }).catch(() => console.log("sin veredicto"));
  await p.waitForTimeout(250);
  await irA(p, ".sx-veredicto", 70, 50, 26); await p.waitForTimeout(800);
  await irA(p, ".sx-veredicto .corr-criterios", 70, 40, 28); await p.waitForTimeout(900);
  await vigila(p, "exoral-nota");
  await irA(p, ".sx-veredicto .mb-5:has(.line-through)", 90, 45, 30); await p.waitForTimeout(700);
  await vigila(p, "exoral-errores");
  await rueda(p, 9, 50, 40); await p.waitForTimeout(1000);
  await vigila(p, "exoral");
}, { tutor: true, semilla: true });
// ===== Tráiler: unidad (guía con doble toque, palabras, diálogos, práctica), templo de los sonidos y diccionario-libro =====
// Comprueba que en la pantalla no se ve «DELE», «IA» ni «AI»
const sinPalabrasVetadas = async (p, nombre) => {
  const hits = await p.evaluate(() => {
    const out = []; const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) { const t = w.currentNode.nodeValue; if (/\b(DELE|IA|AI)\b/.test(t)) { const el = w.currentNode.parentElement; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); if (r.width && r.bottom > 0 && r.top < innerHeight && cs.visibility !== "hidden" && cs.opacity !== "0") out.push(t.trim().slice(0, 80)); } }
    return out;
  });
  console.log(nombre, hits.length ? "VISIBLE PROHIBIDO: " + JSON.stringify(hits) : "sin DELE/IA/AI en pantalla");
};
// Rueda hasta dejar el elemento a `off` px del borde superior
const ruedaHasta = async (p, loc, off = 200, paso = 55, ms = 30) => {
  const caja = await loc.boundingBox().catch(() => null);
  if (!caja) return console.log("sin elemento para la rueda");
  const d = caja.y - off; const n = Math.max(1, Math.ceil(Math.abs(d) / paso));
  for (let i = 0; i < n; i++) { await p.mouse.wheel(0, d / n); await p.waitForTimeout(ms); }
  await p.waitForTimeout(150);
};
// Ejercicio abierto en LessonPlayer: lee el paso (props de React) y lo contesta bien
async function contestaPaso(p) {
  const paso = await p.evaluate(() => {
    const el = document.querySelector(".lp-root .ej-opcion, .lp-root .ej-sello-btn, .lp-root .ej-carta, .lp-root .ej-tecla, .lp-root input");
    if (!el) return null;
    const k = Object.keys(el).find((x) => x.startsWith("__reactFiber")); let f = el[k];
    while (f) { const pr = f.memoizedProps; if (pr && pr.step && pr.step.type) return { type: pr.step.type, answer: pr.step.answer }; f = f.return; }
    return null;
  });
  console.log("ejercicio:", JSON.stringify(paso));
  if (!paso) return;
  if (["choice", "listen"].includes(paso.type)) await p.locator(".lp-root .ej-opcion").nth(paso.answer).click().catch(() => {});
  else if (paso.type === "pictures") await p.locator(".lp-root .ej-carta").nth(paso.answer).click().catch(() => {});
  else if (paso.type === "tf") await p.locator(`.lp-root .ej-sello-btn.${paso.answer ? "es-verdad" : "es-falso"}`).click().catch(() => {});
  else if (paso.type === "type") {
    for (const c of String(paso.answer).split(/\s*\/\s*/)[0]) {
      const tecla = c === " " ? p.locator(".lp-root .ej-tecla.es-ancha") : p.locator(".lp-root .ej-tecla", { hasText: new RegExp(`^${c.toLowerCase()}$`) });
      await tecla.first().click({ timeout: 800 }).catch(() => {});
      await p.waitForTimeout(170);
    }
  }
  await p.waitForTimeout(450);
  await p.getByText("Comprobar", { exact: false }).first().click({ timeout: 2000 }).catch(() => console.log("sin comprobar"));
}
await sesion("unidadnav", "#/modulos/modulo-1", async (p, graba) => {
  await p.addStyleTag({ content: ".mf,[class*='mono-flot']{display:none!important}" });
  await graba(); await p.waitForTimeout(500);
  // Guía: scroll suave hasta la ficha de teoría
  const frase = p.locator(".gx-cuerpo .vt").nth(1); // «Buenos días · De la mañana hasta el mediodía»
  await ruedaHasta(p, frase, 420, 40, 34); await p.waitForTimeout(450);
  // Doble toque → la frase gira y se ve en chino
  await frase.dblclick(); await p.waitForTimeout(1500);
  const frase2 = p.locator(".gx-cuerpo .vt").nth(2);
  await frase2.dblclick(); await p.waitForTimeout(1300);
  await sinPalabrasVetadas(p, "unidadnav-guia");
  // Palabras: una tarjeta gira con su ejemplo
  await p.locator("#tab-palabras").click(); await p.waitForTimeout(800);
  await p.locator(".ud-palabra-main").nth(1).click(); await p.waitForTimeout(1100);
  await rueda(p, 7, 45, 40); await p.waitForTimeout(400);
  await sinPalabrasVetadas(p, "unidadnav-palabras");
  // Diálogos: se abre el primero y avanza dos frases
  await p.locator("#tab-dialogos").click(); await p.waitForTimeout(700);
  await rueda(p, 4, 40, 40); await p.waitForTimeout(250);
  await p.locator(".td-card").first().click(); await p.waitForTimeout(1500);
  for (let i = 0; i < 2; i++) { await p.getByText("Siguiente · 下一句", { exact: false }).first().click({ timeout: 2000 }).catch(() => console.log("sin siguiente")); await p.waitForTimeout(1000); }
  await sinPalabrasVetadas(p, "unidadnav-dialogo");
  await p.locator(".lp-root .lp-close").click().catch(() => {}); await p.waitForTimeout(600);
  // Práctica: sala de entrenamiento y primer ejercicio contestado
  await p.locator("#tab-practica").click(); await p.waitForTimeout(800);
  await rueda(p, 6, 45, 40); await p.waitForTimeout(400);
  await sinPalabrasVetadas(p, "unidadnav-practica");
  await p.getByText("Practicar ahora", { exact: false }).first().click(); await p.waitForTimeout(1200);
  await contestaPaso(p); await p.waitForTimeout(1600);
  await sinPalabrasVetadas(p, "unidadnav-ejercicio");
});
await sesion("pronanim", "#/pronunciacion", async (p, graba) => {
  await p.addStyleTag({ content: ".mf,[class*='mono-flot']{display:none!important}" });
  await graba(); await p.waitForTimeout(900);
  // Templo del trueno (r / rr)
  await p.locator(".ph-templo.is-trueno").click(); await p.waitForTimeout(1700);
  await p.locator('.pv-nav-btn[aria-label*="siguiente"]').click(); await p.waitForTimeout(1100);
  // RR: onda viva y boca en perfil
  await p.locator(".pe-onda").click(); await p.waitForTimeout(1500);
  await sinPalabrasVetadas(p, "pronanim-rr");
  // Botica de sílabas: se abre el cajón «rri»
  await ruedaHasta(p, p.locator(".pe-botica"), 120, 50, 30); await p.waitForTimeout(400);
  await p.locator(".pe-cajon").nth(2).click(); await p.waitForTimeout(1400);
  // Tarjeta de la sílaba: sello con aros y palabra de ejemplo
  await ruedaHasta(p, p.locator(".pe-ficha"), 110, 55, 28); await p.waitForTimeout(300);
  await p.locator(".pe-ficha__sello").click(); await p.waitForTimeout(1100);
  await p.locator(".pe-ficha__ej").click(); await p.waitForTimeout(1200);
  await sinPalabrasVetadas(p, "pronanim-ficha");
});
await sesion("diccilibro", "#/diccionarios", async (p, graba) => {
  await p.addStyleTag({ content: ".mf,[class*='mono-flot']{display:none!important}" });
  await graba(); await p.waitForTimeout(700);
  // El A1 ya está abierto: se elige el «Tomo de Linternas» (A2) para ver la apertura del libro
  await p.locator(".dz-tomo--a2").click(); await p.waitForTimeout(3300);
  await p.locator(".dz-ficha").first().click(); await p.waitForTimeout(1700);
  await sinPalabrasVetadas(p, "diccilibro-ficha");
  for (let i = 0; i < 4; i++) { await p.getByText("Siguiente · 下一个", { exact: false }).first().click().catch(() => console.log("sin siguiente")); await p.waitForTimeout(1050); }
  await sinPalabrasVetadas(p, "diccilibro-fin");
});
await b.close();
