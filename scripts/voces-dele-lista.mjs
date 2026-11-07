// Lista todas las intervenciones de los audios DELE con su voz (src/lib/vocesDele.js) → JSON para scripts/voces-dele.py
// Uso: node scripts/voces-dele-lista.mjs > /tmp/lista.json
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { j as segmentosDeGuion, h as segmentosDeClips } from "../src/lib/oficial-loader.js";
import { turnosDeAudio, anuncioAudio } from "../src/lib/vocesDele.js";

const raiz = path.resolve("src/data/oficial");
const examenes = [];
for (const nivel of ["a1", "a2", "b1", "b2"]) {
  const modulo = await import(pathToFileURL(path.join(raiz, `oficial-${nivel}.js`)).href);
  examenes.push(Object.values(modulo)[0]);
}
for (const fichero of fs.readdirSync(path.join(raiz, "nuevos")).filter((f) => f.endsWith(".json"))) {
  examenes.push(JSON.parse(fs.readFileSync(path.join(raiz, "nuevos", fichero), "utf8")));
}
const porClave = new Map();
const anadir = (turno) => porClave.set(turno.clave, turno);
const recorrer = (objeto) => {
  if (!objeto || typeof objeto !== "object") return;
  for (const [clave, valor] of Object.entries(objeto)) {
    if (clave === "guion" && typeof valor === "string") segmentosDeGuion(valor).forEach((s) => turnosDeAudio(s.texto).forEach(anadir));
    else if (clave === "clips" && Array.isArray(valor)) segmentosDeClips(valor).forEach((s) => turnosDeAudio(s.texto).forEach(anadir));
    else if (clave === "textoAudio" && typeof valor === "string") turnosDeAudio(valor).forEach(anadir);
    else recorrer(valor);
  }
};
examenes.forEach(recorrer);
for (let n = 1; n <= 30; n++) anadir(anuncioAudio(`Audio ${n}.`));
const lista = [...porClave.values()];
const porVoz = {};
for (const t of lista) porVoz[t.voz] = (porVoz[t.voz] || 0) + 1;
console.error(`${lista.length} intervenciones · ${lista.reduce((s, t) => s + t.texto.length, 0)} caracteres`, porVoz);
process.stdout.write(JSON.stringify(lista));
