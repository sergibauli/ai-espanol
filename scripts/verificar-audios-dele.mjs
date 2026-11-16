// Comprueba que todos los audios de las pruebas auditivas (modelos oficiales y exámenes de práctica)
// tienen su MP3 de voz de España: clave en src/data/audio-index-dele.json, fichero en public/audio/dele
// y fichero MP3 válido (cabecera MPEG; con --ffprobe, además, que se decodifica y dura > 0,2 s).
//   node scripts/verificar-audios-dele.mjs [--ffprobe]
// Sale con código 1 si falta algo (la app tendría que recurrir a la voz del navegador).
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { j as segmentosDeGuion, h as segmentosDeClips } from "../src/lib/oficial-loader.js";
import { turnosDeAudio, anuncioAudio, turnosPractica, claveOficial, clavePractica } from "../src/lib/vocesDele.js";

const conFfprobe = process.argv.includes("--ffprobe");
const indice = new Set(JSON.parse(fs.readFileSync("src/data/audio-index-dele.json", "utf8")));
const reparto = JSON.parse(fs.readFileSync("src/data/reparto-dele.json", "utf8"));
const carpeta = "public/audio/dele";

// ---------- Locuciones, igual que las reproduce la app ----------
const raiz = path.resolve("src/data/oficial");
const oficiales = [];
for (const nivel of ["a1", "a2", "b1", "b2"]) {
  const modulo = await import(pathToFileURL(path.join(raiz, `oficial-${nivel}.js`)).href);
  oficiales.push(...Object.values(modulo)[0]);
}
for (const fichero of fs.readdirSync(path.join(raiz, "nuevos")).filter((f) => f.endsWith(".json")).sort()) {
  oficiales.push(JSON.parse(fs.readFileSync(path.join(raiz, "nuevos", fichero), "utf8")));
}
function audiosOficiales(examen) {
  const grupos = [];
  const recorrer = (objeto) => {
    if (!objeto || typeof objeto !== "object") return;
    if (Array.isArray(objeto)) return objeto.forEach(recorrer);
    if (typeof objeto.guion === "string") {
      const clips = segmentosDeClips(objeto.clips);
      const items = (objeto.items || []).filter((item) => item.textoAudio).map((item, i) => ({ etiqueta: item.etiqueta || `Parte ${i + 1}`, texto: item.textoAudio }));
      grupos.push(clips.length ? clips : items.length ? items : segmentosDeGuion(objeto.guion));
      if (clips.length || items.length) grupos.push(segmentosDeGuion(objeto.guion));
    }
    if (typeof objeto.guionAudio === "string") grupos.push(segmentosDeGuion(objeto.guionAudio));
    for (const [clave, valor] of Object.entries(objeto)) if (clave !== "guion" && clave !== "guionAudio") recorrer(valor);
  };
  recorrer(examen.pruebas || examen);
  return grupos;
}

const necesarios = new Map(); // clave → { examen, texto }
const anadir = (examen, turno) => turno?.clave && !necesarios.has(turno.clave) && necesarios.set(turno.clave, { examen, texto: turno.texto });
let examenesSinReparto = [];
for (const examen of oficiales) {
  const clave = claveOficial(examen.nivel, examen.modelo);
  if (!reparto[clave]) {
    examenesSinReparto.push(clave);
    continue;
  }
  for (const grupo of audiosOficiales(examen)) {
    grupo.forEach((segmento, i) => {
      turnosDeAudio(segmento.texto, reparto[clave]).forEach((turno) => anadir(clave, turno));
      const numero = (String(segmento.etiqueta || "").match(/\d+/) || [])[0];
      anadir(clave, anuncioAudio(`Audio ${numero || i + 1}.`, reparto[clave]));
      anadir(clave, anuncioAudio(`Audio ${i + 1}.`, reparto[clave]));
    });
  }
}
let practicas = 0;
for (const [nivel, archivo] of [["A1", "a1"], ["A2", "a2"], ["B1", "b1"], ["B2", "b2"]]) {
  for (const sufijo of ["", "-extra", "-extra2", "-extra3", "-extra4", "-extra5"]) {
    const ruta = path.resolve(`src/data/examenes/${archivo}-exams${sufijo}.js`);
    if (!fs.existsSync(ruta)) continue;
    const modulo = await import(pathToFileURL(ruta).href);
    for (const examen of Object.values(modulo)[0]) {
      if (examen.level !== nivel || !examen.listening?.transcription) continue;
      const clave = clavePractica(nivel, examen.id);
      if (!reparto[clave]) continue; // sin reparto la app usa la voz del navegador para ese examen (aviso abajo)
      practicas += 1;
      turnosPractica(examen.listening.transcription, reparto[clave]).forEach((turno) => anadir(clave, turno));
    }
  }
}

// ---------- Comprobación de cada fichero ----------
const cabeceraMp3 = (buffer) =>
  buffer.slice(0, 3).toString("latin1") === "ID3" || (buffer[0] === 0xff && (buffer[1] & 0xe0) === 0xe0);
const problemas = { sinIndice: [], sinFichero: [], invalido: [], ffprobe: [] };
let bytes = 0;
for (const [clave, info] of necesarios) {
  const fichero = `${carpeta}/${clave}.mp3`;
  if (!indice.has(clave)) problemas.sinIndice.push({ clave, ...info });
  if (!fs.existsSync(fichero)) {
    problemas.sinFichero.push({ clave, ...info });
    continue;
  }
  const contenido = fs.readFileSync(fichero);
  bytes += contenido.length;
  if (contenido.length < 1000 || !cabeceraMp3(contenido)) problemas.invalido.push({ clave, ...info, bytes: contenido.length });
  if (conFfprobe) {
    try {
      const duracion = Number(
        execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", fichero], { encoding: "utf8" }).trim(),
      );
      if (!(duracion > 0.2)) problemas.ffprobe.push({ clave, ...info, duracion });
    } catch (error) {
      problemas.ffprobe.push({ clave, ...info, error: String(error.message).slice(0, 80) });
    }
  }
}
const huerfanos = [...indice].filter((clave) => !fs.existsSync(`${carpeta}/${clave}.mp3`));

console.log(
  `${oficiales.length} modelos oficiales + ${practicas} exámenes de práctica · ${necesarios.size} locuciones · ` +
    `${(bytes / 1048576).toFixed(1)} MB`,
);
const mostrar = (titulo, lista) => {
  console.log(`${lista.length ? "✗" : "✓"} ${titulo}: ${lista.length}`);
  for (const p of lista.slice(0, 15)) console.log(`    ${p.examen} ${p.clave ?? p} ${JSON.stringify(p.texto ?? "").slice(0, 70)}`);
};
mostrar("sin clave en audio-index-dele.json (sonaría la voz del navegador)", problemas.sinIndice);
mostrar("sin fichero en public/audio/dele", problemas.sinFichero);
mostrar("MP3 vacío o sin cabecera válida", problemas.invalido);
if (conFfprobe) mostrar("MP3 que ffprobe no decodifica o dura ≤ 0,2 s", problemas.ffprobe);
console.log(`${huerfanos.length ? "✗" : "✓"} claves del índice sin fichero: ${huerfanos.length}`);
if (examenesSinReparto.length) console.log(`✗ modelos oficiales sin reparto de voces: ${examenesSinReparto.join(", ")}`);
const fallos = problemas.sinIndice.length + problemas.sinFichero.length + problemas.invalido.length + problemas.ffprobe.length + huerfanos.length + examenesSinReparto.length;
process.exit(fallos ? 1 : 0);
