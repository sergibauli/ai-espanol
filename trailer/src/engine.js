import "./fonts.css";
import { SCENES, TOTAL, FPS, W, H } from "./timeline.js";
import * as kit from "./kit.js";

const mods = import.meta.glob("./scenes/*.js");
const stage = document.getElementById("stage");
const fxFlash = document.getElementById("fx-flash");
const fxVig = document.getElementById("fx-vignette");
const grain = document.getElementById("fx-grain"); const gctx = grain.getContext("2d");
fxVig.style.background = "radial-gradient(ellipse 75% 62% at 50% 48%, rgba(0,0,0,0) 55%, rgba(8,2,6,0.5) 100%)";
grain.style.mixBlendMode = "overlay"; grain.style.opacity = "0.16"; grain.style.imageRendering = "auto";

const params = new URLSearchParams(location.search);
const solo = params.get("scene");                    // ?scene=s3-vuelo → t es local a esa escena
const list = solo ? SCENES.filter((s) => s.id === solo).map((s) => ({ ...s, start: 0 })) : SCENES;
const total = solo ? list[0].duration : TOTAL;
const live = new Map();

async function ensure(s) {
  if (live.has(s.id)) return live.get(s.id);
  const loader = mods[`./scenes/${s.id}.js`]; if (!loader) throw new Error("falta la escena " + s.id);
  const mod = (await loader()).default;
  const root = kit.el("div", {}, null); root.className = "scene"; root.id = s.id; stage.insertBefore(root, document.getElementById("fx"));
  await mod.setup(root, kit);
  const entry = { mod, root }; live.set(s.id, entry); return entry;
}
function paintGrain(frame) {
  const r = kit.rng(frame * 7919 + 13); const im = gctx.createImageData(270, 480); const d = im.data;
  for (let i = 0; i < d.length; i += 4) { const v = 96 + r() * 64; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255; }
  gctx.putImageData(im, 0, 0);
}
/** Pinta el fotograma del segundo t (global, o local si ?scene=). Devuelve cuando está todo listo. */
window.__seek = async (t) => {
  t = Math.max(0, Math.min(total - 1 / FPS / 2, t));
  let cur = list[0]; for (const s of list) if (t >= s.start) cur = s;
  const entry = await ensure(cur);
  for (const [id, e] of live) e.root.style.display = id === cur.id ? "block" : "none";
  await entry.mod.update(t - cur.start, kit);
  // destello dorado en cada corte (lo pone el motor: las escenas NO hacen fundidos de entrada/salida a negro)
  let f = 0;
  if (!solo) for (const s of list) { if (s.start === 0) continue; const d = t - s.start; f = Math.max(f, d < 0 ? kit.prog(d, -0.2, 0) ** 2 : 1 - kit.prog(d, 0, 0.33)); }
  fxFlash.style.background = `radial-gradient(ellipse 90% 70% at 50% 45%, rgba(255,246,216,${f}) 0%, rgba(255,214,120,${f * 0.92}) 45%, rgba(200,40,30,${f * 0.75}) 100%)`;
  paintGrain(Math.round(t * FPS));
  await document.fonts.ready;
  return true;
};
window.__total = total; window.__fps = FPS;

// Vista previa interactiva: ?play=1 reproduce, ?t=12.5 muestra un fotograma. Escala el lienzo a la ventana.
const fit = () => { const k = Math.min(innerWidth / W, innerHeight / H); stage.style.transform = params.get("fit") === "0" ? "" : `scale(${k})`; };
addEventListener("resize", fit); fit();
if (params.get("play")) { const t0 = performance.now(); const loop = async () => { await window.__seek(((performance.now() - t0) / 1000) % total); requestAnimationFrame(loop); }; loop(); }
else window.__seek(parseFloat(params.get("t") || "0")).then(() => (window.__ready = true)).catch((e) => { window.__error = String(e && e.stack || e); console.error(e); });
