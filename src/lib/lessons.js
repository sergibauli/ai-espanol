// Micro-lecciones tipo Duolingo generadas a partir del contenido existente de cada módulo.
// 5 lecciones por módulo (3–5 min): palabras I, palabras II, idea clave, frases en acción, repaso final.
import { rng } from "./examGenerator.js";
import VOCAB_EMOJI from "../data/vocab-emoji.json";

const CHARS = ["lucia", "liwei", "carlos", "mei", "carmen"];
const pic = (w) => VOCAB_EMOJI[String(w || "").trim()];

export const LESSONS_PER_MODULE = 5;
export const LESSON_META = [
  { key: "words1", es: "Palabras clave", zh: "核心词汇", emoji: "🧠" },
  { key: "words2", es: "Más palabras", zh: "更多词汇", emoji: "📚" },
  { key: "idea", es: "La idea clave", zh: "核心语法", emoji: "💡" },
  { key: "phrases", es: "Frases en acción", zh: "实用句子", emoji: "💬" },
  { key: "review", es: "Repaso final", zh: "综合复习", emoji: "🏆" },
];

export const lessonId = (numero, index) => `m${numero}-l${index}`;

function shuffle(list, rand) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const clean = (s) => String(s ?? "").trim();
const words = (s) => clean(s).split(/\s+/).filter(Boolean);

// Opción múltiple con la correcta en posición aleatoria
function choice(rand, correct, distractors, base) {
  const opts = shuffle([...new Set([correct, ...distractors.filter((d) => d && d !== correct)])].slice(0, 4), rand);
  return { ...base, options: opts, answer: opts.indexOf(correct) };
}

// Ejercicios de vocabulario generados del contenido: en cada intento cambia el tipo de ejercicio de cada palabra
const HABLA = typeof window !== "undefined" && !!(window.SpeechRecognition || window.webkitSpeechRecognition);
function hueco(v) {
  const ej = clean(v.ejemplo);
  const w = clean(v.espanol);
  if (!ej || words(w).length > 2) return null;
  const rx = new RegExp(`(^|[^\\p{L}])(${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})(?![\\p{L}])`, "iu");
  return rx.test(ej) ? ej.replace(rx, "$1_____") : null;
}
function vocabExercise(kind, v, all, rand, pool) {
  const withPic = all.filter((o) => o.espanol !== v.espanol && pic(o.espanol));
  if (kind === "pictures" && pic(v.espanol) && withPic.length >= 2) {
    const opts = shuffle([v, ...shuffle(withPic, rand).slice(0, 2)], rand);
    return { type: "pictures", prompt: `哪一个是「${v.chino}」？`, promptZh: `¿Cuál de estos es «${v.chino}»?`, options: opts.map((o) => o.espanol), pics: opts.map((o) => pic(o.espanol)), answer: opts.indexOf(v), speakOptions: true };
  }
  if (kind === "cloze" && hueco(v)) return choice(rand, v.espanol, pool(v, "espanol"), { type: "choice", prompt: `Completa: «${hueco(v)}»`, promptZh: `填空：${v.chino}`, explain: `«${clean(v.ejemplo)}»` });
  if (kind === "tf") {
    const verdad = rand() < 0.5;
    const zh = verdad ? v.chino : pool(v, "chino")[0];
    if (zh) return { type: "tf", prompt: `«${v.espanol}» significa «${zh}»`, promptZh: "这个翻译对吗？", answer: verdad || zh === v.chino, explain: `${v.espanol} = ${v.chino}` };
  }
  if (kind === "type" && words(v.espanol).length <= 2 && v.espanol.length <= 16)
    return { character: CHARS[Math.floor(rand() * CHARS.length)], type: "type", prompt: `Escribe en español: ${v.chino}`, promptZh: "用西班牙语写出", answer: v.espanol, hint: `${v.espanol[0]}${"_".repeat(Math.max(0, v.espanol.length - 1))}` };
  if (kind === "speak" && HABLA) return { type: "speak", es: v.espanol, zh: v.chino, emoji: pic(v.espanol) };
  if (kind === "listen") return choice(rand, v.espanol, pool(v, "espanol"), { type: "listen", prompt: "Escucha y elige · 听音选择", speak: v.espanol });
  if (kind === "reverse") return choice(rand, v.espanol, pool(v, "espanol"), { type: "choice", prompt: `¿Cómo se dice «${v.chino}»?`, promptZh: "选择正确的西班牙语" });
  return choice(rand, v.chino, pool(v, "chino"), { type: "choice", prompt: `¿Qué significa «${v.espanol}»?`, promptZh: "选择正确的意思", speak: v.espanol });
}
const KINDS = ["pictures", "meaning", "listen", "reverse", "cloze", "tf", "type", "speak"];

function vocabSteps(mod, vocab, rand) {
  const all = (mod.vocabulario || []).filter((v) => v.espanol && v.chino);
  const steps = [];
  const pool = (exclude, field) => shuffle(all.filter((v) => v[field] !== exclude[field]), rand).map((v) => v[field]);
  let previo = "";
  // Presentación: 2 palabras, practicar, 2 más, practicar… con un tipo de ejercicio distinto en cada intento
  for (let i = 0; i < vocab.length; i += 2) {
    const pair = vocab.slice(i, i + 2);
    pair.forEach((v) => steps.push({ type: "learn", es: v.espanol, zh: v.chino, example: v.ejemplo, emoji: pic(v.espanol) || mod.icono }));
    pair.forEach((v) => {
      const kinds = shuffle(KINDS.filter((k) => k !== previo), rand);
      const step = vocabExercise(kinds[0], v, all, rand, pool) || vocabExercise(kinds[1], v, all, rand, pool);
      previo = kinds[0];
      steps.push(step);
    });
  }
  if (vocab.length >= 4) steps.push({ type: "match", prompt: "Une las parejas · 连线配对", pairs: shuffle(vocab, rand).slice(0, 5).map((v) => ({ a: v.espanol, b: v.chino })) });
  return steps;
}

// Al repetir una lección: palabras de toda la unidad, primero las que el alumno falló
function vocabRepaso(mod, cuantas, rand) {
  const all = (mod.vocabulario || []).filter((v) => v.espanol && v.chino);
  let falladas = [];
  try {
    const d = JSON.parse(localStorage.getItem("ai-espanol:dele-v1") || "{}");
    const set = new Set((d.errors || []).flatMap((e) => [e.correct, e.prompt]).map(clean));
    falladas = all.filter((v) => set.has(clean(v.espanol)) || set.has(clean(v.chino)));
  } catch {}
  const resto = shuffle(all.filter((v) => !falladas.includes(v)), rand);
  return [...shuffle(falladas, rand), ...resto].slice(0, cuantas);
}

function bullets(text) {
  return clean(text)
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => /^[•\-–]/.test(l))
    .map((l) => l.replace(/^[•\-–]\s*/, ""));
}

function ideaSteps(mod, rand) {
  const steps = [];
  const teoria = mod.teoria || [];
  const ej = mod.ejercicios || {};
  const checks = shuffle(
    [
      ...(ej.seleccionar || []).filter((q) => q.opciones?.includes(q.respuestaCorrecta)).map((q) => choice(rand, q.respuestaCorrecta, q.opciones, { type: "choice", prompt: q.pregunta, promptZh: q.preguntaChino !== q.pregunta ? q.preguntaChino : "", explain: q.explicacion })),
      ...(ej.verdaderoFalso || []).map((q) => ({ type: "tf", prompt: q.pregunta, promptZh: q.preguntaChino !== q.pregunta ? q.preguntaChino : "", answer: !!q.respuestaCorrecta, explain: q.explicacion })),
    ],
    rand,
  );
  teoria.slice(0, 3).forEach((t, i) => {
    const es = bullets(t.descripcion).slice(0, 4);
    const zh = bullets(t.descripcionChino);
    const sameShape = zh.length === bullets(t.descripcion).length;
    steps.push({
      type: "tip",
      title: t.titulo,
      titleZh: t.tituloChino,
      points: es.map((p, k) => ({ es: p.replace(/\s=\s[A-Za-z' ,.()/!?-]+$/, ""), zh: sameShape ? zh[k] : "" })),
      summary: es.length ? "" : clean(t.descripcion).split("\n").filter(Boolean).slice(0, 3).join(" "),
      summaryZh: es.length ? "" : clean(t.descripcionChino).split("\n").filter(Boolean).slice(0, 2).join(" "),
      examples: (t.ejemplos || []).slice(0, 2),
    });
    checks.slice(i * 2, i * 2 + 2).forEach((c) => steps.push(c));
  });
  return steps;
}

function buildStep(rand, sentence, zh) {
  const tokens = words(sentence.replace(/[¿?¡!.,;:]/g, " "));
  if (tokens.length < 3 || tokens.length > 9) return null;
  return { type: "build", character: CHARS[Math.floor(rand() * CHARS.length)], prompt: zh || "Ordena la frase · 排列句子", tiles: shuffle(tokens, rand), answer: tokens.join(" ") };
}

function phraseSteps(mod, plus, rand) {
  const steps = [];
  const d = (mod.dialogos || [])[0];
  if (d?.lineas?.length) {
    steps.push({ type: "dialog", title: d.titulo, titleZh: d.tituloChino, lines: d.lineas.slice(0, 5).map((l) => ({ who: l.personaje, es: l.texto, zh: l.traduccion })) });
    const line = d.lineas.find((l) => words(l.texto).length >= 3 && words(l.texto).length <= 9);
    const s = line && buildStep(rand, line.texto, line.traduccion);
    if (s) steps.push(s);
  }
  (plus?.frases || []).slice(0, 4).forEach((f, i) => {
    if (i % 2 === 0) steps.push({ type: "learn", es: f.es, zh: f.zh, example: f.situacion ? `📍 ${f.situacion}` : "", emoji: "💬" });
    else {
      const s = buildStep(rand, f.es, f.zh);
      if (s) steps.push(s);
    }
  });
  const ej = mod.ejercicios || {};
  (ej.traducir || []).slice(0, 2).forEach((t) => {
    const s = buildStep(rand, t.respuestaEsperada, t.fraseChino);
    if (s) steps.push(s);
  });
  const completar = (ej.completar || []).filter((c) => c.respuestaCorrecta);
  completar.slice(0, 2).forEach((c) =>
    steps.push(choice(rand, c.respuestaCorrecta, completar.map((x) => x.respuestaCorrecta), { type: "choice", prompt: c.pregunta, promptZh: c.preguntaChino !== c.pregunta ? c.preguntaChino : "", explain: c.explicacion })),
  );
  return steps;
}

function reviewSteps(mod, plus, rand) {
  const steps = [];
  shuffle(plus?.banco || [], rand)
    .slice(0, 5)
    .forEach((q) => {
      if (!q.opciones?.[q.correcta]) return;
      steps.push(choice(rand, q.opciones[q.correcta], q.opciones, { type: "choice", prompt: q.pregunta, promptZh: q.preguntaZh, explain: q.explicacionZh }));
    });
  (plus?.huecos || []).slice(0, 2).forEach((h) => steps.push({ type: "type", prompt: h.frase, promptZh: h.pistaZh, answer: h.respuesta }));
  const pares = mod.ejercicios?.emparejar?.[0]?.pares;
  if (pares?.length >= 4) steps.push({ type: "match", prompt: "Une las parejas · 连线配对", pairs: shuffle(pares, rand).slice(0, 5).map((p) => ({ a: p.izquierda, b: p.derecha })) });
  (plus?.errores || []).slice(0, 2).forEach((e) =>
    steps.push({ type: "tf", prompt: `¿Es correcta esta frase? «${e.incorrecto.replace(/^\*/, "")}»`, promptZh: "这句话正确吗？", answer: false, explain: `✓ ${e.correcto} · ${e.explicacionZh}` }),
  );
  return shuffle(steps, rand);
}

/** Devuelve la lección `index` (0–4) del módulo como lista de pasos */
export function buildLesson(mod, plus, index, seed = Date.now(), repetida = false) {
  const rand = rng(seed);
  const vocab = (mod.vocabulario || []).filter((v) => v.espanol && v.chino);
  let steps = [];
  // Primera vez: las palabras en orden didáctico; al repetir, otras palabras de la unidad y otros ejercicios
  if (index <= 1 && repetida && vocab.length > 6) steps = vocabSteps(mod, vocabRepaso(mod, 6, rand), rand);
  else if (index === 0) steps = vocabSteps(mod, vocab.slice(0, 6), rand);
  else if (index === 1) steps = vocabSteps(mod, vocab.slice(6, 12).length >= 4 ? vocab.slice(6, 12) : vocab.slice(0, 6), rand);
  else if (index === 2) steps = ideaSteps(mod, rand);
  else if (index === 3) steps = phraseSteps(mod, plus, rand);
  else steps = reviewSteps(mod, plus, rand);
  // Seguridad: nunca una lección vacía
  if (steps.filter((s) => !["learn", "tip", "dialog"].includes(s.type)).length < 3) steps = [...steps, ...vocabSteps(mod, shuffle(vocab, rand).slice(0, 4), rand)];
  return { id: lessonId(mod.numero, index), modulo: mod.numero, index, ...LESSON_META[index], steps: steps.slice(0, 16) };
}

// Práctica libre con los ejercicios originales del módulo: tipos elegidos, orden aleatorio en cada intento
export const PRACTICE_TYPES = [
  { key: "seleccionar", es: "Elegir", zh: "选择", emoji: "🎯" },
  { key: "verdaderoFalso", es: "Verdadero o falso", zh: "判断", emoji: "✅" },
  { key: "completar", es: "Completar", zh: "填空", emoji: "✍️" },
  { key: "ordenar", es: "Ordenar frases", zh: "排序", emoji: "🧩" },
  { key: "traducir", es: "Traducir", zh: "翻译", emoji: "🗣️" },
  { key: "emparejar", es: "Emparejar", zh: "配对", emoji: "🔗" },
];

export function buildPractice(mod, types, seed = Date.now()) {
  const rand = rng(seed);
  const ej = mod.ejercicios || {};
  const steps = [];
  const pick = (k) => types.includes(k);
  if (pick("seleccionar"))
    (ej.seleccionar || []).filter((q) => q.opciones?.includes(q.respuestaCorrecta)).forEach((q) =>
      steps.push(choice(rand, q.respuestaCorrecta, q.opciones, { type: "choice", prompt: q.pregunta, promptZh: q.preguntaChino !== q.pregunta ? q.preguntaChino : "", explain: q.explicacion })),
    );
  if (pick("verdaderoFalso"))
    (ej.verdaderoFalso || []).forEach((q) => steps.push({ type: "tf", prompt: q.pregunta, promptZh: q.preguntaChino !== q.pregunta ? q.preguntaChino : "", answer: !!q.respuestaCorrecta, explain: q.explicacion }));
  if (pick("completar"))
    (ej.completar || []).filter((c) => c.respuestaCorrecta).forEach((c) =>
      steps.push({ type: "type", character: CHARS[Math.floor(rand() * CHARS.length)], prompt: c.pregunta, promptZh: c.preguntaChino !== c.pregunta ? c.preguntaChino : "", answer: c.respuestaCorrecta, hint: c.pista, explain: c.explicacion }),
    );
  if (pick("ordenar"))
    (ej.ordenar || []).forEach((o) => {
      const s = buildStep(rand, o.respuestaCorrecta, "Ordena la frase · 排列句子");
      if (s) steps.push({ ...s, explain: o.explicacion });
    });
  if (pick("traducir"))
    (ej.traducir || []).forEach((t) => {
      const s = buildStep(rand, t.respuestaEsperada, t.fraseChino);
      if (s) steps.push(s);
    });
  if (pick("emparejar"))
    (ej.emparejar || []).forEach((e) => e.pares?.length >= 4 && steps.push({ type: "match", prompt: "Une las parejas · 连线配对", pairs: shuffle(e.pares, rand).slice(0, 5).map((p) => ({ a: p.izquierda, b: p.derecha })) }));
  return { id: `m${mod.numero}-practice`, modulo: mod.numero, index: 9, es: "Práctica", zh: "练习", emoji: "💪", steps: shuffle(steps, rand).slice(0, 15) };
}

// Convierte un diálogo original del módulo en una historia con el reparto de la app
// Personajes femeninos de los diálogos (el resto, hombres o neutros, usan la voz del profesor)
const FEMENINOS = /^(ana|sofía|laura|maría|elena|marta|madre|candidata|profesora|lucía|señora|directora|invitada|redactora|mei|zhang min|chen jing|investigadora|experta|amiga|viajera|carmen|vecina|secretaria|hija|sara|azafata|yuki|niña|abuela|doctora|camarera|dependienta|clienta|vendedora|enfermera|jefa|cajera|recepcionista femenina)\b/i;
export const esMujer = (nombre) => FEMENINOS.test(String(nombre || "").trim());

export function dialogToStory(d, numero, escena = "💬") {
  const people = [...new Set((d.lineas || []).map((l) => l.personaje))];
  const female = ["lucia", "mei", "carmen"];
  const male = ["carlos", "liwei"];
  let nf = 0;
  let nm = 0;
  const who = Object.fromEntries(people.map((p) => [p, esMujer(p) ? female[nf++ % female.length] : male[nm++ % male.length]]));
  return {
    modulo: `${numero}-${d.id}`,
    titulo: d.titulo,
    tituloZh: d.tituloChino,
    escena,
    lineas: (d.lineas || []).map((l, i) => ({ quien: who[l.personaje], nombre: l.personaje, emocion: i === 0 ? "feliz" : "neutral", es: l.texto, zh: l.traduccion })),
    preguntas: [],
  };
}

// Reto nuevo: 8 preguntas inéditas generadas por IA sobre la unidad (validadas); sin IA, reto mezclado local
export async function buildAIChallenge(mod) {
  const { deepseekFetch, isAIAvailable } = await import("./deepseekClient.js");
  const rand = rng(Date.now());
  const vocab = shuffle((mod.vocabulario || []).filter((v) => v.espanol && v.chino), rand).slice(0, 18);
  const temas = (mod.teoria || []).map((t) => t.titulo).slice(0, 4);
  const local = () => {
    const steps = shuffle([...vocabSteps(mod, vocab.slice(0, 6), rand), ...ideaSteps(mod, rand)], rand).slice(0, 10);
    return { id: `m${mod.numero}-reto`, modulo: mod.numero, index: 9, es: "Reto nuevo", zh: "新挑战", emoji: "🎲", steps };
  };
  if (!isAIAvailable()) return local();
  try {
    const prompt = `Unidad de español nivel ${mod.nivel || "A1"}: «${mod.titulo}». Temas: ${temas.join("; ")}. Vocabulario: ${vocab.map((v) => `${v.espanol}=${v.chino}`).join(", ")}.
Crea 8 preguntas NUEVAS de opción múltiple para estudiantes chinos sobre esta unidad (variadas: significado, completar la frase, respuesta adecuada en un diálogo, gramática del tema). Devuelve SOLO JSON: {"preguntas":[{"pregunta":"en español","preguntaZh":"traducción china","opciones":["a","b","c","d"],"correcta":"texto exacto de la opción correcta","explicacion":"breve, en chino"}]}. Una sola opción correcta, sin ambigüedad.`;
    const res = await deepseekFetch("", { body: JSON.stringify({ messages: [{ role: "user", content: prompt }], temperature: 0.9, max_tokens: 900, response_format: { type: "json_object" } }) });
    const data = await res.json();
    const qs = JSON.parse(data?.choices?.[0]?.message?.content || "{}").preguntas || [];
    const steps = qs
      .filter((q) => q?.pregunta && Array.isArray(q.opciones) && new Set(q.opciones).size === q.opciones.length && q.opciones.length >= 3 && q.opciones.includes(q.correcta))
      .map((q) => choice(rand, q.correcta, q.opciones, { type: "choice", prompt: q.pregunta, promptZh: q.preguntaZh || "", explain: q.explicacion || "" }));
    if (steps.length < 4) return local();
    return { id: `m${mod.numero}-reto`, modulo: mod.numero, index: 9, es: "Reto nuevo", zh: "新挑战", emoji: "✨", steps };
  } catch {
    return local();
  }
}
