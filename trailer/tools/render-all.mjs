// Renderiza el tráiler completo en paralelo y lo codifica.  node tools/render-all.mjs <dirFotogramas> <salida.mp4> [trabajadores=6] [audio.wav]
import { spawn, execFileSync } from "node:child_process";
import { mkdirSync, existsSync } from "node:fs";
const [dir, out, nw = "6", audio] = process.argv.slice(2); mkdirSync(dir, { recursive: true });
const { TOTAL, FPS } = await import("../src/timeline.js"); const frames = Math.round(TOTAL * FPS); const W = +nw;
// reparto intercalado por bloques de 30 fotogramas para equilibrar escenas pesadas y ligeras
const blocks = []; for (let i = 0; i < frames; i += 30) blocks.push([i, Math.min(frames, i + 30)]);
let next = 0; const t0 = Date.now();
const worker = (id) => new Promise((res) => { const run = () => { if (next >= blocks.length) return res(); const [a, b] = blocks[next++];
  if (existsSync(`${dir}/f${String(b - 1).padStart(5, "0")}.jpg`) && !process.env.FORCE) return run();
  const p = spawn("node", ["tools/frames.mjs", "--from", a, "--to", b, "--out", dir], { stdio: ["ignore", "pipe", "inherit"] }); let o = ""; p.stdout.on("data", (d) => (o += d));
  p.on("exit", (c) => { if (c || /ERROR|PAGEERROR/.test(o)) console.log(`bloque ${a}-${b} código ${c}\n${o}`); else console.log(`ok ${a}-${b}  (${((Date.now() - t0) / 1000) | 0}s)`); run(); }); }; run(); });
await Promise.all(Array.from({ length: W }, (_, i) => worker(i)));
const args = ["-v", "error", "-y", "-framerate", String(FPS), "-i", `${dir}/f%05d.jpg`]; if (audio) args.push("-i", audio);
args.push("-c:v", "libx264", "-preset", "slow", "-crf", "16", "-pix_fmt", "yuv420p", "-profile:v", "high", "-level", "4.2", "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-movflags", "+faststart");
if (audio) args.push("-c:a", "aac", "-b:a", "256k", "-shortest"); args.push(out);
execFileSync("ffmpeg", args, { stdio: "inherit" }); console.log("vídeo", out, `${((Date.now() - t0) / 1000) | 0}s`);
