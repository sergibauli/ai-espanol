// Voces nativas (Piper, modelos abiertos de Hugging Face: rhasspy/piper-voices) para los audios del DELE.
// Lo usan el generador (scripts/voces-dele.py vía scripts/voces-dele-lista.mjs) y el reproductor del examen,
// así que la asignación tiene que ser determinista: mismo texto → misma voz → mismo MP3.
import { parrafosDele } from "./textoDele.js";

export const VOCES = {
  "es-davefx": { sexo: "hombre", zona: "es", nombre: "España · hombre" },
  "es-sharvard-m": { sexo: "hombre", zona: "es", nombre: "España · hombre 2" },
  "mx-ald": { sexo: "hombre", zona: "am", nombre: "México · hombre" },
  "es-sharvard-f": { sexo: "mujer", zona: "es", nombre: "España · mujer" },
  "mx-claude": { sexo: "mujer", zona: "am", nombre: "México · mujer" },
  "ar-daniela": { sexo: "mujer", zona: "sur", nombre: "Argentina · mujer" },
};

// Orden de preferencia por sexo y variedad (la primera libre dentro del mismo audio gana)
const PREFERENCIAS = {
  hombre: {
    es: ["es-davefx", "es-sharvard-m", "mx-ald"],
    am: ["mx-ald", "es-sharvard-m", "es-davefx"],
    sur: ["mx-ald", "es-sharvard-m", "es-davefx"],
  },
  mujer: {
    es: ["es-sharvard-f", "mx-claude", "ar-daniela"],
    am: ["mx-claude", "ar-daniela", "es-sharvard-f"],
    sur: ["ar-daniela", "mx-claude", "es-sharvard-f"],
  },
};

export const NARRADOR = "es-davefx";

export function fnv1a(texto) {
  let hash = 0x811c9dc5;
  for (const byte of new TextEncoder().encode(texto)) {
    hash ^= byte;
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

function zonaDe(detalle) {
  if (/espa(ñ|n)a|castell|peninsular|madrid/i.test(detalle)) return "es";
  if (/argentin|urugu|rioplat|chile|per(ú|u)|andin|bolivia|ecuador|paragu/i.test(detalle)) return "sur";
  return "am";
}

function sexoDe(etiqueta) {
  return /mujer|femenin|locutora|chica|señora|niña/i.test(etiqueta) ? "mujer" : "hombre";
}

// Texto que se sintetiza: sin acotaciones ⟨pausa breve⟩ ni marcas sueltas
export const textoHablado = (texto) =>
  String(texto)
    .replace(/⟨[^⟩]*⟩/g, " ")
    .replace(/\[[^\]]*\]/g, " ")
    .replace(/_{3,}/g, " … ")
    .replace(/\s+/g, " ")
    .trim();

export const claveAudio = (voz, texto) => fnv1a(`DELE|${voz}|${texto}`);

// Divide un audio del examen en intervenciones con su voz. Sin marcas [VOZ …] → una sola locución con el narrador.
export function turnosDeAudio(texto) {
  const bloques = parrafosDele(texto);
  const turnos = bloques.filter((bloque) => bloque.tipo === "turno");
  if (!turnos.length) {
    const hablado = textoHablado(bloques.map((bloque) => bloque.texto || (bloque.items || []).join(". ")).join(" "));
    return hablado ? [{ voz: NARRADOR, texto: hablado, clave: claveAudio(NARRADOR, hablado) }] : [];
  }
  // Cada hablante distinto del audio recibe una voz distinta que encaje con su sexo y variedad
  const asignadas = new Map();
  const usadas = new Set();
  const resultado = [];
  for (const turno of turnos) {
    const id = `${turno.voz}|${turno.detalle}`;
    if (!asignadas.has(id)) {
      const sexo = sexoDe(turno.detalle || turno.voz);
      const lista = PREFERENCIAS[sexo][zonaDe(turno.detalle || "")];
      const voz = lista.find((candidata) => !usadas.has(candidata)) || lista[asignadas.size % lista.length];
      asignadas.set(id, voz);
      usadas.add(voz);
    }
    const voz = asignadas.get(id);
    const hablado = textoHablado(turno.texto);
    if (hablado) resultado.push({ voz, texto: hablado, clave: claveAudio(voz, hablado) });
  }
  return resultado;
}

// Anuncio «Audio N.» con el narrador
export const anuncioAudio = (texto) => ({ voz: NARRADOR, texto, clave: claveAudio(NARRADOR, texto) });
