// Reconstruye src/data/audio-index-dele.json con los MP3 ya generados en public/audio/dele (útil para desplegar a mitad)
import fs from "node:fs";
const carpeta = "public/audio/dele";
const ahora = Date.now();
const claves = fs.readdirSync(carpeta)
  .filter((f) => f.endsWith(".mp3"))
  .filter((f) => { const st = fs.statSync(`${carpeta}/${f}`); return st.size > 400 && ahora - st.mtimeMs > 5000; })
  .map((f) => f.slice(0, -4)).sort();
fs.writeFileSync("src/data/audio-index-dele.json", JSON.stringify(claves));
console.log(`audio-index-dele.json: ${claves.length} audios`);
