// Motor de exámenes automáticos: mezcla preguntas de los módulos (ejercicios originales)
// con el banco enriquecido (src/data/plus/*.json) y genera exámenes reproducibles por semilla.

const MODULE_LOADERS = [
  () => import("../data/modulos/modulos-01-20.js").then((m) => m.MODULOS_01_20),
  () => import("../data/modulos/modulos-21-40.js").then((m) => m.MODULOS_21_40),
  () => import("../data/modulos/modulos-41-60.js").then((m) => m.MODULOS_41_60),
  () => import("../data/modulos/modulos-61-80.js").then((m) => m.MODULOS_61_80),
];
const PLUS_LOADERS = import.meta.glob("../data/plus/*.json", { import: "default" });

let allModulesPromise = null;
export function loadAllModules() {
  if (!allModulesPromise) {
    allModulesPromise = Promise.all(MODULE_LOADERS.map((load) => load())).then((parts) =>
      parts.flat().sort((a, b) => a.numero - b.numero),
    );
  }
  return allModulesPromise;
}

export async function loadModulePlus(numero) {
  const load = PLUS_LOADERS[`../data/plus/modulo-${numero}.json`];
  return load ? load() : null;
}

export function moduleLevel(modulo) {
  if (modulo?.nivel) return modulo.nivel;
  const n = modulo?.numero ?? modulo;
  if (n <= 20) return "A1";
  if (n <= 40) return "A2";
  if (n <= 50) return "B1";
  return "B2";
}

// PRNG determinista (mulberry32) para que un examen con la misma semilla sea idéntico
export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(list, rand) {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export const SKILLS = {
  vocabulario: { es: "Vocabulario", zh: "词汇" },
  gramatica: { es: "Gramática", zh: "语法" },
  uso: { es: "Uso de la lengua", zh: "语言运用" },
  comprension: { es: "Comprensión lectora", zh: "阅读理解" },
};

// Convierte el contenido de un módulo en preguntas normalizadas:
// { id, tipo: 'opcion'|'vf'|'escribir', skill, enunciado, enunciadoZh, opciones?, correcta, explicacion, modulo }
export function questionsFromModule(modulo, plus) {
  const out = [];
  const meta = { modulo: modulo.numero, moduloTitulo: modulo.titulo, nivel: moduleLevel(modulo) };
  const ej = modulo.ejercicios || {};
  for (const q of ej.seleccionar || []) {
    const idx = (q.opciones || []).indexOf(q.respuestaCorrecta);
    if (idx < 0) continue;
    out.push({
      ...meta,
      id: `m${modulo.numero}-s-${q.id}`,
      tipo: "opcion",
      skill: "vocabulario",
      enunciado: q.pregunta,
      enunciadoZh: q.preguntaChino !== q.pregunta ? q.preguntaChino : "",
      opciones: q.opciones,
      correcta: idx,
      explicacion: q.explicacion,
    });
  }
  for (const q of ej.verdaderoFalso || []) {
    out.push({
      ...meta,
      id: `m${modulo.numero}-vf-${q.id}`,
      tipo: "vf",
      skill: "uso",
      enunciado: q.pregunta,
      enunciadoZh: q.preguntaChino !== q.pregunta ? q.preguntaChino : "",
      opciones: ["Verdadero / 对", "Falso / 错"],
      correcta: q.respuestaCorrecta ? 0 : 1,
      explicacion: q.explicacion,
    });
  }
  for (const q of ej.completar || []) {
    if (!q.respuestaCorrecta) continue;
    out.push({
      ...meta,
      id: `m${modulo.numero}-c-${q.id}`,
      tipo: "escribir",
      skill: "gramatica",
      enunciado: q.pregunta,
      enunciadoZh: q.preguntaChino !== q.pregunta ? q.preguntaChino : "",
      respuesta: q.respuestaCorrecta,
      pista: q.pista,
      explicacion: q.explicacion,
    });
  }
  // Vocabulario: ¿qué significa X? con distractores del propio módulo
  const vocab = (modulo.vocabulario || []).filter((v) => v.espanol && v.chino);
  vocab.forEach((v, i) => {
    if (vocab.length < 4) return;
    const others = vocab.filter((o) => o.chino !== v.chino);
    const pick = [others[(i + 3) % others.length], others[(i + 7) % others.length], others[(i + 11) % others.length]];
    const opts = [v.chino, ...new Set(pick.map((o) => o.chino))].slice(0, 4);
    if (opts.length < 4) return;
    out.push({
      ...meta,
      id: `m${modulo.numero}-voc-${v.id || i}`,
      tipo: "opcion",
      skill: "vocabulario",
      enunciado: `¿Qué significa «${v.espanol}»?`,
      enunciadoZh: `“${v.espanol}”是什么意思？`,
      opciones: opts,
      correcta: 0,
      explicacion: v.ejemplo ? `${v.espanol} = ${v.chino} · ${v.ejemplo}` : `${v.espanol} = ${v.chino}`,
      barajar: true,
    });
  });
  if (plus) {
    for (const [i, q] of (plus.banco || []).entries()) {
      if (!Array.isArray(q.opciones) || q.opciones.length < 2) continue;
      out.push({
        ...meta,
        id: `m${modulo.numero}-b-${i}`,
        tipo: "opcion",
        skill: SKILLS[q.habilidad] ? q.habilidad : "uso",
        enunciado: q.pregunta,
        enunciadoZh: q.preguntaZh,
        opciones: q.opciones,
        correcta: q.correcta,
        explicacion: q.explicacionZh,
        barajar: true,
      });
    }
    for (const [i, h] of (plus.huecos || []).entries()) {
      if (!h.frase?.includes("___")) continue;
      out.push({
        ...meta,
        id: `m${modulo.numero}-h-${i}`,
        tipo: "escribir",
        skill: "gramatica",
        enunciado: h.frase,
        enunciadoZh: h.pistaZh,
        respuesta: h.respuesta,
        explicacion: h.pistaZh,
      });
    }
  }
  return out;
}

export function readingFromPlus(modulo, plus) {
  const l = plus?.lectura;
  if (!l?.texto || !l.preguntas?.length) return null;
  return {
    modulo: modulo.numero,
    nivel: moduleLevel(modulo),
    titulo: l.titulo,
    tituloZh: l.tituloZh,
    texto: l.texto,
    textoZh: l.textoZh,
    preguntas: l.preguntas.map((q, i) => ({
      id: `m${modulo.numero}-l-${i}`,
      modulo: modulo.numero,
      moduloTitulo: modulo.titulo,
      nivel: moduleLevel(modulo),
      tipo: "opcion",
      skill: "comprension",
      enunciado: q.pregunta,
      enunciadoZh: q.preguntaZh,
      opciones: q.opciones,
      correcta: q.correcta,
      explicacion: q.explicacionZh,
    })),
  };
}

function finalizeQuestion(q, rand) {
  if (!q.barajar || q.tipo !== "opcion") return q;
  const order = shuffle(
    q.opciones.map((_, i) => i),
    rand,
  );
  return { ...q, opciones: order.map((i) => q.opciones[i]), correcta: order.indexOf(q.correcta) };
}

/**
 * config: { modulos: number[], total: number, skills: string[], conLectura: boolean, seed: number,
 *           titulo?: string, minutos?: number }
 */
export async function generateExam(config) {
  const seed = config.seed ?? Math.floor(Math.random() * 1e9);
  const rand = rng(seed);
  const all = await loadAllModules();
  const chosen = all.filter((m) => config.modulos.includes(m.numero));
  const plusList = await Promise.all(chosen.map((m) => loadModulePlus(m.numero)));
  const skills = config.skills?.length ? config.skills : Object.keys(SKILLS);

  let pool = [];
  const readings = [];
  chosen.forEach((m, i) => {
    pool.push(...questionsFromModule(m, plusList[i]));
    const r = readingFromPlus(m, plusList[i]);
    if (r) readings.push(r);
  });
  pool = pool.filter((q) => skills.includes(q.skill) && q.skill !== "comprension");

  const total = Math.max(5, config.total || 20);
  let lectura = null;
  if (config.conLectura && readings.length && skills.includes("comprension")) {
    lectura = shuffle(readings, rand)[0];
  }
  const restantes = total - (lectura ? lectura.preguntas.length : 0);

  // Reparto equilibrado: ronda por módulo y por destreza para que no salga todo de un sitio
  const buckets = new Map();
  for (const q of shuffle(pool, rand)) {
    const key = `${q.modulo}|${q.skill}`;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(q);
  }
  const keys = shuffle([...buckets.keys()], rand);
  const preguntas = [];
  while (preguntas.length < restantes && keys.some((k) => buckets.get(k).length)) {
    for (const k of keys) {
      const b = buckets.get(k);
      if (b.length && preguntas.length < restantes) preguntas.push(b.shift());
    }
  }

  const finales = preguntas.map((q) => finalizeQuestion(q, rand));
  const niveles = [...new Set(chosen.map(moduleLevel))].sort();
  return {
    id: `exam-${seed}`,
    seed,
    titulo:
      config.titulo ||
      (chosen.length === 1
        ? `Examen · Módulo ${chosen[0].numero}`
        : `Examen ${niveles.join("–")} · ${chosen.length} módulos`),
    niveles,
    minutos: config.minutos ?? Math.max(10, Math.round(total * 1.2)),
    config: { ...config, seed },
    lectura: lectura ? { ...lectura, preguntas: lectura.preguntas.map((q) => finalizeQuestion(q, rand)) } : null,
    preguntas: finales,
  };
}

const strip = (s) =>
  String(s ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[¿?¡!.,;:«»"']/g, "")
    .replace(/\s+/g, " ")
    .trim();

export function isCorrect(q, answer) {
  if (answer === undefined || answer === null || answer === "") return false;
  if (q.tipo === "escribir") {
    const options = String(q.respuesta)
      .split(/\s*\/\s*/)
      .map(strip);
    return options.includes(strip(answer));
  }
  return Number(answer) === q.correcta;
}

export function scoreExam(exam, answers) {
  const items = [...(exam.lectura?.preguntas || []), ...exam.preguntas];
  const porSkill = {};
  let aciertos = 0;
  for (const q of items) {
    const ok = isCorrect(q, answers[q.id]);
    if (ok) aciertos++;
    porSkill[q.skill] ??= { total: 0, ok: 0 };
    porSkill[q.skill].total++;
    if (ok) porSkill[q.skill].ok++;
  }
  const nota = items.length ? Math.round((aciertos / items.length) * 100) : 0;
  return { aciertos, total: items.length, nota, apto: nota >= 60, porSkill };
}

const HISTORY_KEY = "ai-espanol:exam-history";
export function loadExamHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}
export function saveExamResult(entry) {
  try {
    const list = [entry, ...loadExamHistory()].slice(0, 50);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list));
  } catch {}
}

// Enlace compartible: un profesor puede mandar el mismo examen a todos sus alumnos
export function encodeExamConfig(config) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(config))));
}
export function decodeExamConfig(text) {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(text))));
  } catch {
    return null;
  }
}
