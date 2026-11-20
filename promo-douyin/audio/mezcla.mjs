// Mezcla la locución sobre la música (la música baja sola cuando habla la voz).
// Uso: node audio/mezcla.mjs [larga|corta]  → audio/mezcla.wav o audio/mezcla-15s.wav
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const d = path.dirname(fileURLToPath(import.meta.url));
const version = process.argv[2] || "larga";
const lineas = JSON.parse(fs.readFileSync(path.join(d, "locucion.json"), "utf8"))[version];
const musica = path.join(d, version === "corta" ? "musica-15s.wav" : "musica.wav");
const salida = path.join(d, version === "corta" ? "mezcla-15s.wav" : "mezcla.wav");
const TEMPO = 1.2;
const limpia = "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse";
// duración real de cada frase ya recortada y acelerada
const dur = lineas.map((_, i) => {
  const f = path.join(d, "voz", `${version}_${String(i).padStart(2, "0")}.wav`);
  const out = execFileSync("ffmpeg", ["-hide_banner", "-i", f, "-af", `${limpia},atempo=${TEMPO}`, "-f", "null", "-"], { stdio: ["ignore", "pipe", "pipe"] }).toString() + "";
  return f;
});
const tiempos = [];
let fin = 0;
lineas.forEach(([t], i) => {
  const f = dur[i];
  const r = execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]).toString();
  const dd = (+r) / TEMPO * 0.93; // aprox. tras recortar silencios
  const ini = Math.max(t, fin + 0.08);
  tiempos.push(ini); fin = ini + dd;
  const sig = lineas[i + 1] ? lineas[i + 1][0] : 999;
  console.log(`${ini.toFixed(2)}–${fin.toFixed(2)} s ${fin > sig + 0.3 ? "⚠ pisa la siguiente" : ""} ${lineas[i][1]}`);
});
const args = ["-y", "-hide_banner", "-loglevel", "error", "-i", musica];
dur.forEach((f) => args.push("-i", f));
const filtros = dur.map((_, i) => `[${i + 1}]${limpia},atempo=${TEMPO},highpass=f=90,equalizer=f=3200:t=q:w=1.2:g=3,acompressor=threshold=0.1:ratio=3:attack=5:release=120,aresample=44100,aformat=channel_layouts=stereo,volume=2.2,adelay=${Math.round(tiempos[i] * 1000)}|${Math.round(tiempos[i] * 1000)}[v${i}]`);
filtros.push(`${dur.map((_, i) => `[v${i}]`).join("")}amix=inputs=${dur.length}:normalize=0[voz]`);
filtros.push(`[voz]asplit[v1][v2]`);
filtros.push(`[0][v1]sidechaincompress=threshold=0.02:ratio=8:attack=15:release=350:makeup=1[mus]`);
filtros.push(`[mus][v2]amix=inputs=2:normalize=0:duration=first[out]`);
args.push("-filter_complex", filtros.join(";"), "-map", "[out]", "-ar", "44100", salida);
execFileSync("ffmpeg", args, { stdio: "inherit" });
console.log("→", salida);
