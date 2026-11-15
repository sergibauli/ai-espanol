// Reparto de voces por examen + lista de locuciones a generar.
//   node scripts/reparto-dele.mjs > /tmp/lista.json
// 1. Lee las voces de España de scripts/voces-dele-pool.json (VoxPopuli → Fish Audio).
// 2. Calcula cuántas voces de hombre y de mujer necesita cada examen (oficiales y de práctica).
// 3. Da a cada examen su propio reparto: narrador + voces, ninguna repetida dentro del examen ni en el
//    examen anterior de la misma serie, y equilibrando el uso para que cada examen suene distinto.
// 4. Escribe src/data/reparto-dele.json y saca por stdout todas las locuciones {voz, texto, clave}.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { j as segmentosDeGuion, h as segmentosDeClips } from "../src/lib/oficial-loader.js";
import {
  turnosDeAudio,
  anuncioAudio,
  necesidadesDeAudio,
  turnosPractica,
  necesidadesPractica,
  claveOficial,
  clavePractica,
  fnv1a,
} from "../src/lib/vocesDele.js";

const pool = JSON.parse(fs.readFileSync("scripts/voces-dele-pool.json", "utf8")).filter((v) => !v.descartada);
const voces = { hombre: pool.filter((v) => v.sexo === "hombre").map((v) => v.id), mujer: pool.filter((v) => v.sexo === "mujer").map((v) => v.id) };

// ---------- Exámenes oficiales ----------
const raiz = path.resolve("src/data/oficial");
const oficiales = [];
for (const nivel of ["a1", "a2", "b1", "b2"]) {
  const modulo = await import(pathToFileURL(path.join(raiz, `oficial-${nivel}.js`)).href);
  oficiales.push(...Object.values(modulo)[0]);
}
for (const fichero of fs.readdirSync(path.join(raiz, "nuevos")).filter((f) => f.endsWith(".json")).sort()) {
  oficiales.push(JSON.parse(fs.readFileSync(path.join(raiz, "nuevos", fichero), "utf8")));
}
// Textos de audio de un examen, agrupados como los reproduce la app (un guion = una lista de segmentos)
function audiosOficiales(examen) {
  const grupos = [];
  const recorrer = (objeto) => {
    if (!objeto || typeof objeto !== "object") return;
    if (Array.isArray(objeto)) return objeto.forEach(recorrer);
    if (typeof objeto.guion === "string") {
      const clips = segmentosDeClips(objeto.clips);
      const items = (objeto.items || []).filter((item) => item.textoAudio).map((item, i) => ({ etiqueta: `Audio ${i + 1}`, texto: item.textoAudio }));
      grupos.push(clips.length ? clips : items.length ? items : segmentosDeGuion(objeto.guion));
      // El guion completo también puede reproducirse desde otros sitios
      if (clips.length || items.length) grupos.push(segmentosDeGuion(objeto.guion));
    }
    if (typeof objeto.guionAudio === "string") grupos.push(segmentosDeGuion(objeto.guionAudio));
    for (const [clave, valor] of Object.entries(objeto)) if (clave !== "guion" && clave !== "guionAudio") recorrer(valor);
  };
  recorrer(examen.pruebas || examen);
  return grupos;
}

// ---------- Exámenes de práctica ----------
const practicas = [];
for (const [nivel, archivo] of [["A1", "a1"], ["A2", "a2"], ["B1", "b1"], ["B2", "b2"]]) {
  for (const sufijo of ["", "-extra", "-extra2", "-extra3", "-extra4", "-extra5"]) {
    const modulo = await import(pathToFileURL(path.resolve(`src/data/examenes/${archivo}-exams${sufijo}.js`)).href);
    for (const examen of Object.values(modulo)[0]) {
      if (examen.level === nivel && examen.id <= 50 && examen.listening?.transcription) practicas.push({ nivel, id: examen.id, texto: examen.listening.transcription });
    }
  }
}
practicas.sort((a, b) => a.nivel.localeCompare(b.nivel) || a.id - b.id);

// ---------- Reparto ----------
const uso = new Map(pool.map((v) => [v.id, 0]));
const reparto = {};
let anterior = { nivel: null, voces: new Set() };
const firmas = new Set();
function repartir(clave, serie, necesita, indice) {
  if (anterior.nivel !== serie) anterior = { nivel: serie, voces: new Set() };
  for (let intento = 0; ; intento++) {
    const usadas = new Set();
    const tomar = (sexo, saltar = 0) => {
      const candidatas = voces[sexo]
        .filter((id) => !usadas.has(id))
        .sort((a, b) => {
          const penalA = (anterior.voces.has(a) ? 1000 : 0) + uso.get(a);
          const penalB = (anterior.voces.has(b) ? 1000 : 0) + uso.get(b);
          return penalA - penalB || fnv1a(clave + a).localeCompare(fnv1a(clave + b));
        });
      const id = candidatas[Math.min(saltar, candidatas.length - 1)];
      usadas.add(id);
      return id;
    };
    // El narrador alterna hombre/mujer según el examen; si el reparto ya existe en otro examen, se cambia una voz
    const sexoNarrador = indice % 2 ? "mujer" : "hombre";
    const narrador = tomar(sexoNarrador, intento);
    const hombres = Array.from({ length: Math.max(1, necesita.hombre) }, () => tomar("hombre"));
    const mujeres = Array.from({ length: Math.max(1, necesita.mujer) }, () => tomar("mujer"));
    const firma = [...usadas].sort().join(",");
    if (firmas.has(firma) && intento < 20) continue;
    firmas.add(firma);
    usadas.forEach((id) => uso.set(id, uso.get(id) + 1));
    reparto[clave] = { narrador, hombres, mujeres };
    anterior.voces = usadas;
    return;
  }
}

const locuciones = new Map();
const anadir = (turno) => turno.clave && turno.texto && locuciones.set(turno.clave, { voz: turno.voz, texto: turno.texto, clave: turno.clave });

oficiales.forEach((examen, indice) => {
  const clave = claveOficial(examen.nivel, examen.modelo);
  const grupos = audiosOficiales(examen);
  const necesita = { hombre: 0, mujer: 0 };
  for (const grupo of grupos)
    for (const segmento of grupo) {
      const n = necesidadesDeAudio(segmento.texto);
      necesita.hombre = Math.max(necesita.hombre, n.hombre);
      necesita.mujer = Math.max(necesita.mujer, n.mujer);
    }
  repartir(clave, `oficial-${examen.nivel}`, necesita, indice);
  for (const grupo of grupos) {
    grupo.forEach((segmento, i) => {
      turnosDeAudio(segmento.texto, reparto[clave]).forEach(anadir);
      const numero = (String(segmento.etiqueta || "").match(/\d+/) || [])[0];
      anadir(anuncioAudio(`Audio ${numero || i + 1}.`, reparto[clave]));
      anadir(anuncioAudio(`Audio ${i + 1}.`, reparto[clave]));
    });
  }
});

practicas.forEach((examen, indice) => {
  const clave = clavePractica(examen.nivel, examen.id);
  repartir(clave, `practica-${examen.nivel}`, necesidadesPractica(examen.texto), indice);
  turnosPractica(examen.texto, reparto[clave]).forEach(anadir);
});

fs.writeFileSync("src/data/reparto-dele.json", JSON.stringify(reparto));
const lista = [...locuciones.values()];
const repartos = Object.values(reparto).map((r) => [r.narrador, ...r.hombres, ...r.mujeres].sort().join(","));
const usos = [...uso.values()];
console.error(
  `${Object.keys(reparto).length} exámenes · ${lista.length} locuciones · ${lista.reduce((s, t) => s + t.texto.length, 0)} caracteres · ` +
    `repartos repetidos: ${repartos.length - new Set(repartos).size} · uso por voz ${Math.min(...usos)}–${Math.max(...usos)}`,
);
process.stdout.write(JSON.stringify(lista));
