// Progreso por destreza, cuaderno de errores y previsión DELE (se guarda en este navegador)
const KEY = "ai-espanol:dele-v1";
export const SKILLS = {
  lectura: { es: "Comprensión de lectura", zh: "阅读理解", prueba: 1 },
  audicion: { es: "Comprensión auditiva", zh: "听力理解", prueba: 2 },
  escritura: { es: "Expresión escrita", zh: "书面表达", prueba: 3 },
  oral: { es: "Expresión oral", zh: "口语表达", prueba: 4 },
  vocabulario: { es: "Vocabulario", zh: "词汇", prueba: 0 },
  gramatica: { es: "Gramática", zh: "语法", prueba: 0 },
};
export const LEVELS = ["A1", "A2", "B1", "B2"];

function load() {
  try {
    return { answers: [], errors: [], tasks: [], ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return { answers: [], errors: [], tasks: [] };
  }
}
function save(d) {
  try {
    d.answers = d.answers.slice(-1500);
    d.errors = d.errors.slice(-400);
    d.tasks = d.tasks.slice(-200);
    localStorage.setItem(KEY, JSON.stringify(d));
  } catch {}
}
export const getDele = load;
export function setDele(patch) {
  const d = { ...load(), ...patch };
  save(d);
  return d;
}

/** Una respuesta de pregunta cerrada (lección, examen, diagnóstico) */
export function recordAnswer({ skill, level = "A1", ok, src = "", error }) {
  const d = load();
  d.answers.push({ t: Date.now(), skill, level, ok: Boolean(ok), src });
  if (!ok && error?.prompt) d.errors.push({ t: Date.now(), skill, level, src, repasos: 0, ...error });
  save(d);
}
/** Una tarea abierta corregida (escritura u oral), puntuación 0-100 */
export function recordTask({ skill, level = "A1", score, criterios = [], src = "", errores = [] }) {
  const d = load();
  d.tasks.push({ t: Date.now(), skill, level, score, criterios, src });
  for (const e of errores.slice(0, 6)) if (e?.original) d.errors.push({ t: Date.now(), skill, level, src, repasos: 0, prompt: e.original, correct: e.correccion, explain: e.explicacion, tipo: e.tipo });
  save(d);
}
export function markReviewed(t) {
  const d = load();
  const e = d.errors.find((x) => x.t === t);
  if (e) e.repasos = (e.repasos || 0) + 1;
  save(d);
}

// Acierto reciente por destreza (los últimos 60 intentos pesan más)
export function skillStats(level) {
  const d = load();
  const out = {};
  for (const k of Object.keys(SKILLS)) {
    const a = d.answers.filter((x) => x.skill === k && (!level || x.level === level)).slice(-60);
    const t = d.tasks.filter((x) => x.skill === k && (!level || x.level === level)).slice(-8);
    let w = 0;
    let s = 0;
    a.forEach((x, i) => {
      const wi = 0.5 + i / a.length;
      w += wi;
      s += wi * (x.ok ? 1 : 0);
    });
    t.forEach((x, i) => {
      const wi = 3 * (0.5 + i / t.length);
      w += wi;
      s += (wi * x.score) / 100;
    });
    out[k] = { n: a.length + t.length, pct: w ? Math.round((s / w) * 100) : null };
  }
  return out;
}

// Nota prevista por prueba (sobre 25) y probabilidad de APTO (≥ 30/50 en cada grupo)
export function predict(level) {
  const st = skillStats(level);
  const base = (k, alt) => st[k].pct ?? (alt != null ? st[alt].pct : null);
  const p = {
    lectura: base("lectura", "vocabulario"),
    audicion: base("audicion", "vocabulario"),
    escritura: base("escritura", "gramatica"),
    oral: base("oral", "gramatica"),
  };
  const pruebas = Object.fromEntries(Object.entries(p).map(([k, v]) => [k, v == null ? null : Math.round((v / 100) * 25 * 10) / 10]));
  const g1 = pruebas.lectura != null && pruebas.escritura != null ? pruebas.lectura + pruebas.escritura : null;
  const g2 = pruebas.audicion != null && pruebas.oral != null ? pruebas.audicion + pruebas.oral : null;
  // Incertidumbre: con pocos datos la probabilidad se acerca al 50 %
  const n = Object.values(st).reduce((a, x) => a + x.n, 0);
  const sd = Math.max(3, 12 - n / 15);
  const phi = (z) => 1 / (1 + Math.exp(-1.702 * z));
  const prob = g1 != null && g2 != null ? Math.round(phi((g1 - 30) / sd) * phi((g2 - 30) / sd) * 100) : null;
  return { pruebas, g1, g2, prob, datos: n };
}

/** Errores agrupados (los que menos se han repasado primero) */
export function errorNotebook(limit = 40) {
  return load()
    .errors.slice()
    .sort((a, b) => (a.repasos || 0) - (b.repasos || 0) || b.t - a.t)
    .slice(0, limit);
}

// Semana ISO y mes para el plan semanal y el reto mensual
export function weekKey(d = new Date()) {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const y = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  return `${t.getUTCFullYear()}-S${String(Math.ceil(((t - y) / 864e5 + 1) / 7)).padStart(2, "0")}`;
}
export const monthKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
