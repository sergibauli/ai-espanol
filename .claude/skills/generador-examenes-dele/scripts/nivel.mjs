// Medidas de dificultad de un modelo DELE (textos de lectura, guiones de audio e ítems).
// Se calibran con los 20 modelos oficiales de cada nivel (calibrar.mjs) y validar.mjs las usa
// para rechazar simulacros más fáciles o más difíciles que los oficiales del nivel.
const limpiarGuion = (g) => String(g || "").replace(/\[[^\]]*\]/g, " ");
const palabrasDe = (t) => (String(t || "").toLowerCase().match(/[a-záéíóúüñ]+/g) || []);
const frasesDe = (t) => String(t || "").split(/[.!?¿¡…\n]+/).map((s) => s.trim()).filter((s) => palabrasDe(s).length >= 2);

const SUBJ_PRES = new Set("sea sean seas seamos tenga tengan tengas tengamos haya hayan hayas hayamos pueda puedan puedas podamos vaya vayan vayas vayamos esté estén estés estemos haga hagan hagas hagamos diga digan digas sepa sepan sepas quiera quieran quieras venga vengan vengas salga salgan ponga pongan conozca conozcan llegue lleguen busque busquen pague paguen empiece empiecen vuelva vuelvan siga sigan pida pidan sienta sientan duerma duerman".split(" "));
const MARCAS = {
  subjuntivo: (w) => SUBJ_PRES.has(w) || /^[a-záéíóúñ]{3,}(ara|aras|áramos|aran|iera|ieras|iéramos|ieran|ase|iese|iesen|asen)$/.test(w),
  condicional: (w) => /^[a-záéíóúñ]{2,}(ría|rías|ríamos|rían)$/.test(w),
  futuro: (w) => /^[a-záéíóúñ]{3,}(aré|erá|irá|ará|rán|remos)$/.test(w),
  indefinido: (w) => /^[a-záéíóúñ]{2,}(aron|ieron|ó)$/.test(w) && !/(ción|ó)$/.test(w.slice(-4)) ? /(aron|ieron)$/.test(w) || /[^i]ó$/.test(w) : false,
};
const plusc = (t) => (String(t || "").toLowerCase().match(/\b(había|habías|habíamos|habían)\s+[a-z]+(ado|ido|to|cho)\b/g) || []).length;

function jaccard(a, b) {
  const A = new Set(palabrasDe(a).filter((w) => w.length > 2));
  const B = new Set(palabrasDe(b).filter((w) => w.length > 2));
  if (!A.size || !B.size) return 0;
  let n = 0;
  for (const w of A) if (B.has(w)) n++;
  return n / A.size;
}

// Textos de comprensión (lectura + audición) e ítems de opción múltiple / relacionar
export function textosDe(m) {
  const lectura = [];
  const audio = [];
  const items = [];
  (m.pruebas || []).slice(0, 2).forEach((p, i) => (p.tareas || []).forEach((t) => {
    const base = i === 0 ? lectura : audio;
    if (t.texto) base.push(t.texto);
    (t.material?.bloques || []).forEach((b) => b.texto && base.push(b.texto));
    if (t.guion) base.push(limpiarGuion(t.guion));
    (t.items || []).forEach((it) => items.push(it));
  }));
  return { lectura: lectura.join("\n"), audio: audio.join("\n"), items };
}

export function medir(m) {
  const { lectura, audio, items } = textosDe(m);
  const todo = `${lectura}\n${audio}`;
  const w = palabrasDe(todo);
  const fr = frasesDe(lectura);
  const muestra = w.slice(0, 400);
  const por1000 = (f) => (w.filter(f).length / Math.max(1, w.length)) * 1000;
  const literal = items
    .filter((it) => typeof it.opciones?.[0] === "string" && it.opciones[0].length > 3 && it.fraseSoporte)
    .map((it) => jaccard(it.opciones[it.correcta], it.fraseSoporte));
  return {
    palabrasPorFrase: fr.length ? palabrasDe(lectura).length / fr.length : 0,
    largoPalabra: w.length ? w.join("").length / w.length : 0,
    variedad: muestra.length ? new Set(muestra).size / muestra.length : 0,
    palabrasLargas: w.length ? (w.filter((x) => x.length >= 9).length / w.length) * 100 : 0,
    subjuntivo: por1000(MARCAS.subjuntivo),
    condicional: por1000(MARCAS.condicional),
    pluscuamperfecto: (plusc(todo) / Math.max(1, w.length)) * 1000,
    literalidad: literal.length ? literal.reduce((a, b) => a + b, 0) / literal.length : 0,
    palabrasTotales: w.length,
  };
}

// Qué medidas se comprueban y con qué margen sobre el rango de los oficiales (p10–p90)
export const CONTROLES = {
  palabrasPorFrase: { margen: 0.2, texto: "palabras por frase" },
  largoPalabra: { margen: 0.3, texto: "longitud media de palabra" },
  variedad: { margen: 0.5, texto: "variedad de vocabulario" },
  palabrasLargas: { margen: 0.3, texto: "% de palabras largas (vocabulario complejo)" },
  subjuntivo: { margen: 0.5, abs: 1.5, texto: "subjuntivos por 1000 palabras" },
  condicional: { margen: 0.5, abs: 1.5, texto: "condicionales por 1000 palabras" },
  pluscuamperfecto: { margen: 0.5, abs: 0.8, texto: "pluscuamperfectos por 1000 palabras" },
  literalidad: { margen: 0.2, inversa: true, texto: "literalidad de las respuestas (A1 copia el texto, B2 parafrasea)" },
};

export function comprobarNivel(medidas, calib) {
  const err = [];
  for (const [k, c] of Object.entries(CONTROLES)) {
    const r = calib?.[k];
    if (!r) continue;
    const ancho = Math.max(r.p90 - r.p10, Math.abs(r.media) * 0.1);
    const min = r.p10 - ancho * c.margen - (c.abs || 0);
    const max = r.p90 + ancho * c.margen + (c.abs || 0);
    const v = medidas[k];
    const [bajo, alto] = c.inversa ? ["DIFÍCIL", "FÁCIL"] : ["FÁCIL", "DIFÍCIL"];
    if (v < min) err.push(`dificultad: ${c.texto} = ${v.toFixed(2)} (oficiales ${r.p10.toFixed(2)}–${r.p90.toFixed(2)}): demasiado ${bajo} para el nivel`);
    if (v > max) err.push(`dificultad: ${c.texto} = ${v.toFixed(2)} (oficiales ${r.p10.toFixed(2)}–${r.p90.toFixed(2)}): demasiado ${alto} para el nivel`);
  }
  return err;
}
