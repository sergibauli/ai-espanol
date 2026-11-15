// Voces de los audios de los exámenes (modelos DELE oficiales y exámenes de práctica).
// Todas son voces nativas de España clonadas con Fish Audio a partir de diputados españoles del corpus
// abierto VoxPopuli (github.com/facebookresearch/voxpopuli), con el sexo comprobado por la altura de la voz.
// Cada examen tiene su propio reparto (src/data/reparto-dele.json, scripts/reparto-dele.mjs): un narrador
// y las voces de hombre y de mujer que necesita, distintas del examen anterior y repartidas para no repetirse.
// Lo usan el generador de MP3 y los reproductores, así que todo es determinista: mismo texto + reparto → mismo MP3.
import { parrafosDele } from "./textoDele.js";

export function fnv1a(texto) {
  let hash = 0x811c9dc5;
  for (const byte of new TextEncoder().encode(texto)) {
    hash ^= byte;
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

export const claveAudio = (voz, texto) => fnv1a(`DELE|${voz}|${texto}`);

// Texto que se sintetiza: sin acotaciones ⟨pausa breve⟩ ni marcas sueltas
export const textoHablado = (texto) =>
  String(texto)
    .replace(/⟨[^⟩]*⟩/g, " ")
    .replace(/\[[^\]]*\]/g, " ")
    .replace(/_{3,}/g, " … ")
    .replace(/\s+/g, " ")
    .trim();

// ---------- Sexo de quien habla ----------
const MUJERES =
  /^(carmen|isabel|raquel|pilar|mercedes|inés|ines|beatriz|ruth|nieves|rocío|rocio|consuelo|dolores|soledad|montserrat|belén|belen|maribel|noelia|esther|lourdes|araceli|asunción|concepción|leonor|marisol|yolanda|mei|zhang min|chen jing|yuki|ana|abril|libertad|luz|paz|rosario|mar|sol|elisabet|judit|miriam|noemí|carmen)$/i;
const HOMBRES_EN_A = /^(borja|luca|nicola|josé|jose|andrea)$/i;
export const esNombreDeMujer = (nombre) => {
  const limpio = String(nombre || "").trim().split(/\s+/)[0];
  if (!limpio) return false;
  if (MUJERES.test(limpio)) return true;
  if (HOMBRES_EN_A.test(limpio)) return false;
  return /a$/i.test(limpio);
};

// Rol o etiqueta («mujer, 34 años», «LOCUTORA», «Entrevistadora», «Ana»)
export function sexoDeEtiqueta(etiqueta) {
  const texto = String(etiqueta || "");
  if (/\b(mujer|femenin\w*|chica|señora|niña)\b/i.test(texto)) return "mujer";
  if (/\b(hombre|masculin\w*|chico|señor|niño)\b/i.test(texto)) return "hombre";
  const palabra = texto.trim().split(/[\s,(-]+/)[0] || "";
  if (/^(locutora|narradora|entrevistadora|candidata|presentadora|periodista_f|profesora|doctora|directora|psicóloga|reportera|guía_f|clienta|dependienta|camarera|recepcionista_f|madre|abuela|hija|amiga|vecina|jefa|enfermera|secretaria)$/i.test(palabra)) return "mujer";
  if (/^(locutor|narrador|entrevistador|candidato|presentador|profesor|doctor|director|psicólogo|reportero|cliente|dependiente|camarero|padre|abuelo|hijo|amigo|vecino|jefe|enfermero|secretario)$/i.test(palabra)) return "hombre";
  if (/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+$/.test(palabra)) return esNombreDeMujer(palabra) ? "mujer" : "hombre";
  return null;
}

// Pistas en primera persona: «soy María», «me llamo Pablo», «soy cocinero», «estoy cansada», «soy la psicóloga»
export function sexoDeTexto(texto) {
  const t = String(texto || "");
  const nombre = t.match(/\b(?:[Ss]oy|[Mm]e llamo|[Mm]i nombre es)\s+([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)/);
  if (nombre && !/^(Yo|Un|Una|El|La|De|Muy)$/.test(nombre[1])) return esNombreDeMujer(nombre[1]) ? "mujer" : "hombre";
  if (/\b(?:soy|como)\s+(?:la|una)\s+[a-záéíóúñ]+/i.test(t) && !/\b(?:soy|como)\s+(?:la|una)\s+(?:persona|primera|única|mayor|menor|pequeña)\b/i.test(t)) return "mujer";
  if (/\bsoy\s+(?:el|un)\s+[a-záéíóúñ]+/i.test(t) && !/\bsoy\s+(?:el|un)\s+(?:único|primero|mayor|menor|poco)\b/i.test(t)) return "hombre";
  const adjetivo = t.match(/\b(?:estoy|soy|me siento|estaba|estuve|me quedé|me he quedado|he estado)\s+(?:muy\s+|tan\s+|bastante\s+|un poco\s+)?(cansad|content|nervios|preocupad|enamorad|cansad|aburrid|emocionad|casad|separad|divorciad|jubilad|agotad|encantad|segur|sol|orgullos|ocupad|enfadad|sorprendid|obligad|acostumbrad|interesad|dispuest)(a|o)\b/i);
  if (adjetivo) return adjetivo[2].toLowerCase() === "a" ? "mujer" : "hombre";
  const oficio = t.match(/\bsoy\s+(?:muy\s+)?([a-záéíóúñ]+?)(a|o|ora|or)\b/i);
  if (oficio && /^(cociner|enfermer|camarer|abogad|médic|arquitect|ingenier|secretari|maestr|bomber|psicólog|veterinari|periodist|fotógraf|cartero|panader|carnicer|peluquer|agricult|dependient|funcionari|estudiant|profes|direct|pint|escrit|traduct|diseñad)$/i.test(oficio[1])) {
    const final = oficio[2].toLowerCase();
    if (final === "a" || final === "ora") return "mujer";
    if (final === "o" || final === "or") return "hombre";
  }
  return null;
}

// ---------- Exámenes oficiales (guiones con marcas [VOZ …]) ----------
const elegir = (lista, n) => (lista?.length ? lista[n % lista.length] : null);
const vozDeSexo = (reparto, sexo, n) =>
  (sexo === "mujer" ? elegir(reparto?.mujeres, n) : elegir(reparto?.hombres, n)) || reparto?.narrador || "sin-voz";

// Divide un audio del examen en intervenciones con su voz.
// Sin marcas [VOZ …] → una sola locución (voz según quien habla, o el narrador del examen).
export function turnosDeAudio(texto, reparto) {
  const bloques = parrafosDele(texto);
  const turnos = bloques.filter((bloque) => bloque.tipo === "turno");
  if (!turnos.length) {
    const hablado = textoHablado(bloques.map((bloque) => bloque.texto || (bloque.items || []).join(". ")).join(" "));
    if (!hablado) return [];
    const sexo = sexoDeTexto(hablado);
    const voz = sexo ? vozDeSexo(reparto, sexo, 0) : reparto?.narrador || "sin-voz";
    return [{ voz, texto: hablado, clave: claveAudio(voz, hablado) }];
  }
  // Cada hablante distinto del audio recibe una voz distinta del reparto que encaje con su sexo
  const asignadas = new Map();
  const cuenta = { hombre: 0, mujer: 0 };
  const resultado = [];
  for (const turno of turnos) {
    const id = `${turno.voz}|${turno.detalle}`;
    if (!asignadas.has(id)) {
      const sexo = sexoDeTurno(turno);
      asignadas.set(id, vozDeSexo(reparto, sexo, cuenta[sexo]++));
    }
    const voz = asignadas.get(id);
    const hablado = textoHablado(turno.texto);
    if (hablado) resultado.push({ voz, texto: hablado, clave: claveAudio(voz, hablado) });
  }
  return resultado;
}

export function sexoDeTurno(turno) {
  return (
    sexoDeEtiqueta(turno.detalle) ||
    sexoDeEtiqueta(turno.voz) ||
    sexoDeTexto(turno.texto) ||
    (/[02468]$/.test(turno.voz) ? "mujer" : "hombre")
  );
}

// Necesidades de un texto: cuántos hombres y mujeres distintos hablan a la vez
export function necesidadesDeAudio(texto) {
  const turnos = parrafosDele(texto).filter((bloque) => bloque.tipo === "turno");
  const vistos = new Map();
  for (const turno of turnos) {
    const id = `${turno.voz}|${turno.detalle}`;
    if (!vistos.has(id)) vistos.set(id, sexoDeTurno(turno));
  }
  const valores = [...vistos.values()];
  if (!valores.length) {
    const sexo = sexoDeTexto(textoHablado(texto));
    return { hombre: sexo === "hombre" ? 1 : 0, mujer: sexo === "mujer" ? 1 : 0 };
  }
  return { hombre: valores.filter((s) => s === "hombre").length, mujer: valores.filter((s) => s === "mujer").length };
}

// Anuncio «Audio N.» con el narrador del examen
export const anuncioAudio = (texto, reparto) => {
  const voz = reparto?.narrador || "sin-voz";
  return { voz, texto, clave: claveAudio(voz, texto) };
};

// ---------- Exámenes de práctica (monólogos o entrevistas «Nombre: …») ----------
// Frases tal como las resalta el reproductor de práctica
export const frasesPractica = (transcripcion) =>
  String(transcripcion || "")
    .split(/(?<=[.!?])\s+/)
    .filter((frase) => frase.trim());

const ETIQUETA_PRACTICA = /^\s*([A-ZÁÉÍÓÚÑ][\wáéíóúñü]*(?:\s+[A-ZÁÉÍÓÚÑ]?[\wáéíóúñü]+){0,2})\s*:\s+/;

// Cada frase con su voz: en entrevistas, la del personaje del párrafo donde empieza la frase.
// Las frases salen del texto completo igual que en el reproductor, para que el resaltado coincida.
export function turnosPractica(transcripcion, reparto) {
  const texto = String(transcripcion || "");
  const parrafos = [];
  const separador = /\n\s*\n/g;
  let inicio = 0;
  let m;
  while ((m = separador.exec(texto))) {
    parrafos.push({ inicio, texto: texto.slice(inicio, m.index) });
    inicio = m.index + m[0].length;
  }
  parrafos.push({ inicio, texto: texto.slice(inicio) });
  const tieneEtiquetas = parrafos.filter((p) => ETIQUETA_PRACTICA.test(p.texto)).length >= 2;
  const general = sexoDeTexto(texto);
  const vozMonologo = general ? vozDeSexo(reparto, general, 0) : reparto?.narrador || "sin-voz";
  const asignadas = new Map();
  const cuenta = { hombre: 0, mujer: 0 };
  let vozActual = vozMonologo;
  for (const parrafo of parrafos) {
    const etiqueta = tieneEtiquetas ? parrafo.texto.match(ETIQUETA_PRACTICA) : null;
    if (etiqueta) {
      const nombre = etiqueta[1];
      if (!asignadas.has(nombre)) {
        const sexo = sexoDeEtiqueta(nombre) || "hombre";
        asignadas.set(nombre, vozDeSexo(reparto, sexo, cuenta[sexo]++));
      }
      vozActual = asignadas.get(nombre);
    }
    parrafo.voz = vozActual;
  }
  const resultado = [];
  let cursor = 0;
  for (const frase of frasesPractica(texto)) {
    const posicion = texto.indexOf(frase, cursor);
    if (posicion >= 0) cursor = posicion + frase.length;
    const parrafo = [...parrafos].reverse().find((p) => p.inicio <= Math.max(posicion, 0)) || parrafos[0];
    const sinEtiqueta = tieneEtiquetas ? frase.replace(ETIQUETA_PRACTICA, "") : frase;
    const hablado = textoHablado(sinEtiqueta);
    resultado.push({ frase, voz: parrafo.voz, texto: hablado, clave: hablado ? claveAudio(parrafo.voz, hablado) : null });
  }
  return resultado;
}

export function necesidadesPractica(transcripcion) {
  const parrafos = String(transcripcion || "").split(/\n\s*\n/);
  const etiquetas = parrafos.map((p) => p.match(ETIQUETA_PRACTICA)?.[1]).filter(Boolean);
  if (etiquetas.length >= 2) {
    const sexos = [...new Set(etiquetas)].map((nombre) => sexoDeEtiqueta(nombre) || "hombre");
    return { hombre: sexos.filter((s) => s === "hombre").length, mujer: sexos.filter((s) => s === "mujer").length };
  }
  const sexo = sexoDeTexto(transcripcion);
  return { hombre: sexo === "hombre" ? 1 : 0, mujer: sexo === "mujer" ? 1 : 0 };
}

export const clavePractica = (nivel, id) => `P-${String(nivel).toUpperCase()}-${id}`;
export const claveOficial = (nivel, modelo) => `${String(nivel).toUpperCase()}-${Number(modelo)}`;
