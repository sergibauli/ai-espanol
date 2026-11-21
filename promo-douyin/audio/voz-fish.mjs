// Locución con Fish Audio (voz femenina china). La clave va SOLO en la variable FISH_KEY, nunca en el repo.
// Uso: NODE_USE_ENV_PROXY=1 FISH_KEY=... [VOICE=<reference_id>] node audio/voz-fish.mjs  → sustituye audio/voz/<version>_NN.wav
// Después: node audio/mezcla.mjs larga && node audio/mezcla.mjs corta && sh herramientas/montar.sh ...
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const d = path.dirname(fileURLToPath(import.meta.url));
const KEY = process.env.FISH_KEY;
if (!KEY) { console.error("Falta FISH_KEY"); process.exit(1); }
const VOICE = process.env.VOICE ?? ""; // vacío = voz por defecto de Fish (mandarín); o la voz femenina de la app: 5e816f5a0658460b960881a24733c418
const L = JSON.parse(fs.readFileSync(path.join(d, "locucion.json"), "utf8"));
for (const [version, lineas] of Object.entries(L)) {
  for (let i = 0; i < lineas.length; i++) {
    const texto = lineas[i][1];
    const r = await fetch("https://api.fish.audio/v1/tts", {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "api-key": KEY, "Content-Type": "application/json", model: process.env.MODEL || "s2.1-pro-free" },
      body: JSON.stringify({ text: texto, ...(VOICE ? { reference_id: VOICE } : {}), format: "mp3", latency: "normal" }),
    });
    if (!r.ok) { console.error(version, i, r.status, (await r.text()).slice(0, 200)); process.exit(1); }
    const mp3 = path.join(d, "voz", `${version}_${String(i).padStart(2, "0")}.mp3`);
    fs.writeFileSync(mp3, Buffer.from(await r.arrayBuffer()));
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", mp3, "-ar", "44100", mp3.replace(/\.mp3$/, ".wav")]);
    console.log(version, i, texto);
  }
}
