// Renderiza fotogramas con Playwright.  node tools/frames.mjs --scene s3-vuelo --t 0.5,2,4 --out dir   (capturas sueltas de prueba)
//                                        node tools/frames.mjs --from 0 --to 300 --out dir                (tramo del tráiler completo, en fotogramas)
//                                        --sheet out.jpg  (con --t) hace además una hoja de contactos reducida
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)(process.env.PW || "playwright");
import { mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
const a = Object.fromEntries(process.argv.slice(2).join(" ").split("--").filter(Boolean).map((s) => { const [k, ...v] = s.trim().split(" "); return [k, v.join(" ") || true]; }));
const out = a.out || "out"; mkdirSync(out, { recursive: true });
const port = a.port || 5180; const q = a.scene ? `&scene=${a.scene}` : "";
const b = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const p = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
p.on("pageerror", (e) => console.log("PAGEERROR", e.message)); p.on("console", (m) => { if (m.type() === "error") console.log("CONSOLE", m.text().slice(0, 300)); });
await p.goto(`http://localhost:${port}/?fit=0${q}`); await p.waitForFunction(() => window.__ready || window.__error, null, { timeout: 120000 });
const err = await p.evaluate(() => window.__error); if (err) { console.log("ERROR", err); await b.close(); process.exit(1); }
const fps = 30; const files = [];
const shot = async (t, name) => { await p.evaluate((t) => window.__seek(t), t); const f = `${out}/${name}`; await p.screenshot({ path: f, type: "jpeg", quality: 95 }); files.push(f); };
if (a.t) for (const t of String(a.t).split(",").map(Number)) await shot(t, `t${t.toFixed(2).padStart(6, "0")}.jpg`);
else { const from = +a.from || 0, to = +a.to || Math.round((await p.evaluate(() => window.__total)) * fps); for (let i = from; i < to; i++) { await shot(i / fps, `f${String(i).padStart(5, "0")}.jpg`); if (i % 30 === 0) console.log("frame", i); } }
await b.close();
if (a.sheet && files.length === 1) execFileSync("ffmpeg", ["-v","error","-y","-i",files[0],"-vf","scale=540:960",a.sheet]); else if (a.sheet && files.length) { const n = files.length, cols = Math.min(n, +a.cols || 6), rows = Math.ceil(n / cols); const inputs = files.flatMap((f) => ["-i", f]); execFileSync("ffmpeg", ["-v", "error", "-y", ...inputs, "-filter_complex", `${files.map((_, i) => `[${i}:v]scale=270:480[s${i}]`).join(";")};${files.map((_, i) => `[s${i}]`).join("")}xstack=inputs=${n}:layout=${files.map((_, i) => `${(i % cols) * 270}_${Math.floor(i / cols) * 480}`).join("|")}:fill=black`, a.sheet].filter(Boolean)); console.log("sheet", a.sheet); }
