// Micro-lecciones tipo Duolingo generadas a partir del contenido existente de cada módulo.
// 5 lecciones por módulo (3–5 min): palabras I, palabras II, idea clave, frases en acción, repaso final.
import { rng } from "./examGenerator.js";

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

function vocabSteps(mod, vocab, rand) {
  const all = (mod.vocabulario || []).filter((v) => v.espanol && v.chino);
  const steps = [];
  const pool = (exclude, field) => shuffle(all.filter((v) => v[field] !== exclude[field]), rand).map((v) => v[field]);
  // Presentación: 2 palabras, practicar, 2 más, practicar…
  for (let i = 0; i < vocab.length; i += 2) {
    const pair = vocab.slice(i, i + 2);
    pair.forEach((v) => steps.push({ type: "learn", es: v.espanol, zh: v.chino, example: v.ejemplo, emoji: mod.icono }));
    pair.forEach((v, k) => {
      const kind = (i + k) % 3;
      if (kind === 0) steps.push(choice(rand, v.chino, pool(v, "chino"), { type: "choice", prompt: `¿Qué significa «${v.espanol}»?`, promptZh: "选择正确的意思", speak: v.espanol }));
      else if (kind === 1) steps.push(choice(rand, v.espanol, pool(v, "espanol"), { type: "listen", prompt: "Escucha y elige · 听音选择", speak: v.espanol }));
      else steps.push(choice(rand, v.espanol, pool(v, "espanol"), { type: "choice", prompt: `¿Cómo se dice «${v.chino}»?`, promptZh: "选择正确的西班牙语" }));
    });
  }
  if (vocab.length >= 4) steps.push({ type: "match", prompt: "Une las parejas · 连线配对", pairs: shuffle(vocab, rand).slice(0, 5).map((v) => ({ a: v.espanol, b: v.chino })) });
  const typed = vocab.filter((v) => words(v.espanol).length === 1 && v.espanol.length <= 12)[0];
  if (typed) steps.push({ type: "type", prompt: `Escribe en español: ${typed.chino}`, promptZh: "用西班牙语写出", answer: typed.espanol, hint: `${typed.espanol[0]}${"_".repeat(Math.max(0, typed.espanol.length - 1))}` });
  return steps;
}

// Extrae los puntos "• …" de la teoría y los empareja con su versión china por posición
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
  return { type: "build", prompt: zh || "Ordena la frase · 排列句子", tiles: shuffle(tokens, rand), answer: tokens.join(" ") };
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
export function buildLesson(mod, plus, index, seed = Date.now()) {
  const rand = rng(seed);
  const vocab = (mod.vocabulario || []).filter((v) => v.espanol && v.chino);
  let steps = [];
  if (index === 0) steps = vocabSteps(mod, vocab.slice(0, 6), rand);
  else if (index === 1) steps = vocabSteps(mod, vocab.slice(6, 12).length >= 4 ? vocab.slice(6, 12) : vocab.slice(0, 6), rand);
  else if (index === 2) steps = ideaSteps(mod, rand);
  else if (index === 3) steps = phraseSteps(mod, plus, rand);
  else steps = reviewSteps(mod, plus, rand);
  // Seguridad: nunca una lección vacía
  if (steps.filter((s) => !["learn", "tip", "dialog"].includes(s.type)).length < 3) steps = [...steps, ...vocabSteps(mod, shuffle(vocab, rand).slice(0, 4), rand)];
  return { id: lessonId(mod.numero, index), modulo: mod.numero, index, ...LESSON_META[index], steps: steps.slice(0, 16) };
}
