const s = "dele_generated_content_v1";
function a() {
  try {
    const i = localStorage.getItem(s);
    if (i) {
      return JSON.parse(i);
    }
    return [];
  } catch {
    return [];
  }
}
export function g(i) {
  return a()
    .filter((r) => r.mode === "examen" && r.data && r.level === i)
    .map((r, e) => p(r, 1000 + e));
}
function p(i, id) {
  const e = i.data || {};
  const o = (t) =>
    (t || []).map((n, c) => ({
      id: c + 1,
      question: n.question || "",
      options: n.options || [],
      correctAnswer: typeof n.correctAnswer === "number" ? n.correctAnswer : 0,
      explanation: n.explanation || "",
    }));
  return {
    id,
    level: i.level,
    theme: i.theme || e.theme || "Tema generado",
    vocabulary: (e.vocabulary || []).map((t) => ({
      word: t.word || "",
      definition: t.definition || "",
      chinese: t.chinese || "",
      example: t.example || "",
    })),
    reading: {
      textType: e.reading?.textType || "artículo",
      title: e.reading?.title || "Lectura",
      text: e.reading?.text || "",
      questions: o(e.reading?.questions),
    },
    listening: {
      title: e.listening?.title || "Audición",
      transcription: e.listening?.transcription || "",
      questions: (e.listening?.questions || []).map((t, n) => ({
        id: n + 1,
        question: t.question || "",
        options: t.options || [],
        correctAnswer: typeof t.correctAnswer === "number" ? t.correctAnswer : 0,
      })),
    },
    writing: {
      optionA: {
        title: e.writing?.optionA?.title || "Opción A",
        description: e.writing?.optionA?.description || "",
        structure: {
          intro: "",
          body: "",
          conclusion: "",
        },
        connectors: [],
        wordCount: "",
      },
      optionB: {
        title: e.writing?.optionB?.title || "Opción B",
        description: e.writing?.optionB?.description || "",
        structure: {
          intro: "",
          body: "",
          conclusion: "",
        },
        connectors: [],
        wordCount: "",
      },
    },
    monologue: {
      topic1: {
        title: e.monologue?.topic1?.title || "Tema 1",
        description: e.monologue?.topic1?.description || "",
        connectors: [],
        guideQuestions: [],
      },
      topic2: {
        title: e.monologue?.topic2?.title || "Tema 2",
        description: e.monologue?.topic2?.description || "",
        connectors: [],
        guideQuestions: [],
      },
    },
    interaction: {
      situation: e.interaction?.situation || "",
      questions: (e.interaction?.questions || []).map((t) => ({
        question: t.question || "",
        help: t.help || "",
        usefulPhrases: t.usefulPhrases || [],
      })),
    },
  };
}
function d() {
  return a()
    .filter((i) => i.mode === "modulo" && i.data)
    .map((i, r) => l(i, 1000 + r));
}
function l(i, numero) {
  const e = i.data || {};
  return {
    id: i.id,
    numero,
    numeroTexto: `gen ${numero}`,
    titulo: e.titulo || i.theme || "Módulo generado",
    tituloChino: e.tituloChino || "",
    descripcion: `Módulo generado por IA sobre "${e.titulo || i.theme}" (nivel ${i.level})`,
    descripcionChino: "AI 生成模块",
    icono: "🤖",
    color: "#a855f7",
    teoria: (e.teoria || []).map((o, t) => ({
      id: `gt${t}`,
      titulo: o.titulo || "",
      tituloChino: o.tituloChino || "",
      descripcion: o.descripcion || "",
      descripcionChino: o.descripcionChino || "",
      ejemplos: (o.ejemplos || []).map((n) => ({
        espanol: n.espanol || "",
        chino: n.chino || "",
      })),
    })),
    vocabulario: (e.vocabulario || []).map((o, t) => ({
      id: `gv${t}`,
      espanol: o.espanol || "",
      chino: o.chino || "",
      ejemplo: o.ejemplo || "",
    })),
    dialogos: (e.dialogos || []).map((o, t) => ({
      id: `gd${t}`,
      titulo: o.titulo || "",
      tituloChino: o.tituloChino || "",
      personajes: o.personajes || ["A", "B"],
      lineas: (o.lineas || []).map((n) => ({
        personaje: n.personaje || "",
        texto: n.texto || "",
        traduccion: n.traduccion || "",
      })),
    })),
    ejercicios: {
      completar: (e.ejercicios?.completar || []).map((o, t) => ({
        id: `gc${t}`,
        pregunta: o.pregunta || "",
        preguntaChino: o.preguntaChino || "",
        respuestaCorrecta: o.respuestaCorrecta || "",
        explicacion: o.explicacion || "",
        pista: "",
        numeroLetras: (o.respuestaCorrecta || "").length,
      })),
      seleccionar: (e.ejercicios?.seleccionar || []).map((o, t) => ({
        id: `gs${t}`,
        pregunta: o.pregunta || "",
        preguntaChino: o.preguntaChino || "",
        opciones: o.opciones || [],
        respuestaCorrecta: o.respuestaCorrecta || "",
        explicacion: o.explicacion || "",
      })),
      verdaderoFalso: [],
      emparejar: [],
      ordenar: [],
      traducir: [],
    },
  };
}
export { d as a };
