// Modelo común de los exámenes imprimibles.
// Cada fuente (modelos de nivel, simulacros generados, exámenes de unidad, exámenes de práctica y los creados
// en el generador) se convierte en el mismo documento, que pinta VistaImpresion.jsx:
//
// doc = { tipo, tipoZh, sello, titulo, tituloZh, nivel, codigo, tema, minutos, puntosTotal, criterio, criterioZh,
//         pruebas: [{ nombre, nombreZh, minutos, preparacion, puntos, instrucciones, instruccionesZh, audio,
//                     tareas: [{ titulo, instrucciones, instruccionesZh, genero, textos, bloques, listaOpciones,
//                                transcripcion, preguntas, escritura, oral, vocabulario }] }] }
// pregunta = { num, enunciado, enunciadoZh, opciones: [{ letra, texto }] | null, modo: "opcion" | "letra" | "escribir",
//              correcta (letra o texto), explicacion, explicacionZh }

const LETRAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const letraDe = (i) => LETRAS[i] || String(i + 1);

const str = (v) => (v === null || v === undefined ? "" : String(v));
// Los textos impresos no llevan las siglas del examen oficial
export function limpiar(texto) {
  return str(texto)
    .replace(/\b(del|el)\s+DELE\b/g, "$1 examen")
    .replace(/\bDELE\s*/g, "")
    .replace(/⟨|⟩/g, "")
    .trim();
}
const sinPrefijo = (op) => limpiar(op).replace(/^[a-dA-D][).]\s+/, "");
const soloLetras = (opciones) => (opciones || []).length > 1 && (opciones || []).every((v) => /^[A-Z]$/.test(str(v).trim()));

const ZH_PRUEBA = {
  lectura: "阅读理解",
  auditiva: "听力理解",
  escrita: "书面表达与互动",
  oral: "口语表达与互动",
};
const INSTR_ZH = {
  lectura: "请仔细阅读每篇文章，然后在答题卡上标出正确答案。每题只有一个正确答案。",
  auditiva: "每段录音播放两遍。请先阅读题目，然后边听边作答，并在答题卡上标出答案。",
  escrita: "请完成以下写作任务。注意字数要求，书写清楚。",
  oral: "口语考试与考官面对面进行。请利用准备时间阅读任务卡并做笔记。",
};
const TAREA_ZH = {
  opcion_multiple: "阅读或听材料，选择正确答案（A、B、C）。",
  relacionar: "将题目与相应的文本或选项配对。有多余的选项。",
  huecos: "选择合适的选项填入文中的空格。",
  fragmentos: "把片段放回文章中合适的位置。有多余的片段。",
};

function pruebaOficial(prueba) {
  const n = prueba.prueba;
  return n === 1 ? "lectura" : n === 2 ? "auditiva" : n === 3 ? "escrita" : "oral";
}

function preguntaOficial(item) {
  const letras = soloLetras(item.opciones);
  const opciones = (item.opciones || []).map((op, i) => ({ letra: letras ? str(op).trim() : letraDe(i), texto: letras ? "" : limpiar(op) }));
  if (letras) opciones.sort((a, b) => a.letra.localeCompare(b.letra));
  const correcta = typeof item.correcta === "number" ? (letras ? str(item.opciones[item.correcta]).trim() : letraDe(item.correcta)) : "";
  return {
    num: item.num,
    enunciado: limpiar(item.enunciado),
    opciones,
    modo: letras ? "letra" : "opcion",
    correcta,
    respuesta: letras || typeof item.correcta !== "number" ? "" : limpiar(item.opciones[item.correcta]),
    explicacion: limpiar(item.justificacion),
    cita: limpiar(item.fraseSoporte),
  };
}

function tareaComprension(t, clave) {
  const m = t.material || {};
  const textos = [];
  if (t.texto && !/^Ejercicio de relacionar/i.test(t.texto)) textos.push({ titulo: limpiar(t.tituloTexto), texto: limpiar(t.texto) });
  (m.textos || []).forEach((x) => textos.push({ titulo: limpiar(x.titulo || x.tituloTexto), texto: limpiar(x.texto) }));
  const bloques = (m.bloques || []).map((b) => ({ letra: b.letra, titulo: limpiar(b.titulo), texto: limpiar(b.texto) }));
  const listaOpciones = [
    ...(m.fragmentos || []).map((f) => ({ letra: f.letra, texto: limpiar(f.texto) })),
    ...(t.parejas || []).map((p, i) => ({ letra: str(p.corresponde || p.letra).trim() || letraDe(i), texto: limpiar(p.enunciado) })),
  ];
  const preguntas = (t.items || []).map(preguntaOficial);
  // En las tareas de relacionar, el enunciado de cada pregunta está en material.enunciados
  if (t.tipo === "relacionar" && m.enunciados?.length) {
    preguntas.forEach((p, i) => {
      if (m.enunciados[i] && !p.enunciado.includes(m.enunciados[i].slice(0, 20))) p.enunciado = limpiar(m.enunciados[i]);
    });
  }
  return {
    titulo: limpiar(t.titulo),
    genero: limpiar(t.genero),
    instrucciones: limpiar(t.instrucciones),
    instruccionesZh: TAREA_ZH[t.tipo] || (clave === "auditiva" ? "听录音，选择正确答案。" : "阅读文章，选择正确答案。"),
    textos,
    bloques,
    listaOpciones: listaOpciones.sort((a, b) => a.letra.localeCompare(b.letra)),
    audio: clave === "auditiva",
    transcripcion: clave === "auditiva" ? limpiar(t.guion).replace(/\s*\[(AUDIO|PISTA|CLIP)\s*(\d+)[^\]]*\]\s*/gi, "\n\n— Audio $2 —\n").replace(/\[VOZ\s*(\d+)[^\]]*\]/gi, "Voz $1:").trim() : "",
    preguntas,
  };
}

function tareaEscrita(t) {
  return {
    titulo: limpiar(t.titulo),
    genero: limpiar(t.genero),
    instrucciones: limpiar(t.instrucciones),
    instruccionesZh: `根据情境完成写作任务，字数 ${t.minPalabras || "?"}–${t.maxPalabras || "?"} 词。`,
    escritura: {
      situacion: limpiar(t.situacion),
      destinatario: limpiar(t.destinatario),
      proposito: limpiar(t.proposito),
      material: limpiar(t.material?.contenido),
      puntosGuia: (t.puntosGuia || []).map(limpiar),
      min: t.minPalabras,
      max: t.maxPalabras,
      modelo: limpiar(t.modeloRespuesta),
      lineas: Math.min(26, Math.max(8, Math.round((t.maxPalabras || 80) / 7) + 2)),
    },
  };
}

function tareaOral(t) {
  return {
    titulo: limpiar(t.titulo),
    genero: limpiar(t.genero),
    instrucciones: limpiar(t.instrucciones),
    instruccionesZh: "阅读任务卡，准备后与考官进行口语交流。",
    oral: {
      tiempo: limpiar(t.tiempo),
      situacion: limpiar(t.situacion),
      lamina: limpiar(t.cuadernilloCandidato) !== limpiar(t.instrucciones) ? limpiar(t.cuadernilloCandidato) : "",
      escena: t.escena ? limpiar(`${t.escena.titulo || ""}${t.escena.descripcion ? ` — ${t.escena.descripcion}` : ""}`) : "",
      opciones: (t.opciones || []).map(limpiar),
      puntosGuia: (t.puntosGuia || []).map(limpiar),
      modelo: limpiar(typeof t.ejemploEsperado === "string" ? t.ejemploEsperado : ""),
      notas: 6,
    },
  };
}

/** Modelos de nivel y simulacros nuevos (OficialExamPage). */
export function desdeOficial(examen, nivel) {
  const niv = str(examen.nivel || nivel).toUpperCase();
  const nuevo = /Simulacro nuevo/i.test(examen.titulo || "") || examen.nuevo;
  const pruebas = (examen.pruebas || []).map((p) => {
    const clave = pruebaOficial(p);
    const tareas = (p.tareas || []).map((t) => (clave === "escrita" ? tareaEscrita(t) : clave === "oral" ? tareaOral(t) : tareaComprension(t, clave)));
    return {
      nombre: limpiar(p.nombre),
      nombreZh: ZH_PRUEBA[clave],
      clave,
      minutos: p.duracion || (clave === "oral" ? 15 : null),
      preparacion: p.preparacion || null,
      puntos: 25,
      instrucciones:
        clave === "lectura"
          ? `Esta prueba tiene ${tareas.length} tareas. Marque sus respuestas en la Hoja de respuestas.`
          : clave === "auditiva"
            ? `Esta prueba tiene ${tareas.length} tareas. Cada audio se escucha dos veces. Marque sus respuestas en la Hoja de respuestas.`
            : clave === "escrita"
              ? `Esta prueba tiene ${tareas.length} tareas. Escriba con letra clara y respete el número de palabras.`
              : `Esta prueba tiene ${tareas.length} tareas y se hace con el entrevistador.${p.preparacion ? ` Tiene ${p.preparacion} minutos para preparar las tareas.` : ""}`,
      instruccionesZh: INSTR_ZH[clave],
      audio: clave === "auditiva",
      tareas,
    };
  });
  return {
    tipo: nuevo ? "Simulacro de examen" : "Modelo de examen",
    tipoZh: nuevo ? "模拟试卷" : "真题模拟",
    sello: "考",
    nivel: niv,
    codigo: `${niv} · Modelo ${String(examen.modelo).padStart(2, "0")}`,
    titulo: limpiar(examen.temaCentral) || `Modelo ${examen.modelo}`,
    tituloZh: `${niv} 级 · 第 ${examen.modelo} 套`,
    ambito: limpiar(examen.ambito),
    minutos: pruebas.reduce((acc, p) => acc + (p.minutos || 0), 0),
    puntosTotal: 100,
    criterio: "Apto con 30 puntos o más en cada grupo: Grupo 1 (lectura + escritura) y Grupo 2 (audición + oral).",
    criterioZh: "两组（阅读+写作、听力+口语）各得 30 分以上即为合格。",
    pruebas,
  };
}

// ---- Simulacros automáticos y exámenes de unidad (lib/examGenerator.js) ----
const SKILL_ES = { vocabulario: ["Vocabulario", "词汇"], gramatica: ["Gramática", "语法"], uso: ["Uso de la lengua", "语言运用"] };

function preguntaGenerada(q, num) {
  if (q.tipo === "escribir") {
    return {
      num,
      enunciado: limpiar(q.enunciado),
      enunciadoZh: limpiar(q.enunciadoZh),
      opciones: null,
      modo: "escribir",
      correcta: limpiar(q.respuesta),
      pista: limpiar(q.pista),
      explicacion: limpiar(q.explicacion),
    };
  }
  const vf = q.tipo === "vf";
  return {
    num,
    enunciado: limpiar(q.enunciado),
    enunciadoZh: limpiar(q.enunciadoZh),
    opciones: (q.opciones || []).map((op, i) => ({ letra: vf ? (i === 0 ? "V" : "F") : letraDe(i), texto: vf ? (i === 0 ? "Verdadero · 对" : "Falso · 错") : limpiar(op) })),
    modo: "opcion",
    correcta: vf ? (q.correcta === 0 ? "V" : "F") : letraDe(q.correcta),
    respuesta: vf ? "" : limpiar(q.opciones?.[q.correcta]),
    explicacion: limpiar(q.explicacion),
  };
}

/** Examen de lib/examGenerator.js (generador rápido, examen de unidad o de clase). */
export function desdeGenerado(exam, extra = {}) {
  const pruebas = [];
  let num = 0;
  const niveles = exam.niveles?.length ? exam.niveles.join("–") : "";
  if (exam.lectura) {
    const l = exam.lectura;
    pruebas.push({
      nombre: "Comprensión de lectura",
      nombreZh: "阅读理解",
      clave: "lectura",
      instrucciones: "Lea el texto y conteste a las preguntas. Elija la opción correcta.",
      instruccionesZh: "阅读文章，回答问题，选择正确答案。",
      tareas: [
        {
          titulo: limpiar(l.titulo),
          tituloZh: limpiar(l.tituloZh),
          instrucciones: "Lea el texto y elija la respuesta correcta (A, B, C o D).",
          instruccionesZh: "阅读文章，选择正确答案。",
          textos: [{ titulo: limpiar(l.titulo), texto: limpiar(l.texto), textoZh: limpiar(l.textoZh) }],
          preguntas: l.preguntas.map((q) => preguntaGenerada(q, ++num)),
        },
      ],
    });
  }
  const grupos = {};
  for (const q of exam.preguntas || []) (grupos[q.skill] ||= []).push(q);
  const orden = ["vocabulario", "gramatica", "uso"].filter((k) => grupos[k]?.length);
  if (orden.length) {
    const tareas = [];
    for (const k of orden) {
      const opciones = grupos[k].filter((q) => q.tipo !== "escribir");
      const escribir = grupos[k].filter((q) => q.tipo === "escribir");
      if (opciones.length)
        tareas.push({
          titulo: SKILL_ES[k][0],
          tituloZh: SKILL_ES[k][1],
          instrucciones: opciones.some((q) => q.tipo === "vf") ? "Elija la opción correcta. En las frases de verdadero o falso, marque V o F." : "Elija la opción correcta.",
          instruccionesZh: "选择正确答案。判断题请标出 V（对）或 F（错）。",
          preguntas: opciones.map((q) => preguntaGenerada(q, ++num)),
        });
      if (escribir.length)
        tareas.push({
          titulo: `${SKILL_ES[k][0]} · completar`,
          tituloZh: `${SKILL_ES[k][1]} · 填空`,
          instrucciones: "Complete cada frase con la palabra o forma adecuada.",
          instruccionesZh: "用合适的词或形式完成句子。",
          preguntas: escribir.map((q) => preguntaGenerada(q, ++num)),
        });
    }
    pruebas.push({
      nombre: "Vocabulario, gramática y uso de la lengua",
      nombreZh: "词汇、语法与语言运用",
      clave: "uso",
      instrucciones: "Conteste a todas las preguntas. Solo hay una respuesta correcta en cada una.",
      instruccionesZh: "回答所有问题。每题只有一个正确答案。",
      tareas,
    });
  }
  const total = num;
  pruebas.forEach((p) => {
    const n = p.tareas.reduce((a, t) => a + (t.preguntas?.length || 0), 0);
    p.puntos = total ? Math.round((n / total) * 100) : null;
  });
  const unidades = [...new Set([...(exam.lectura?.preguntas || []), ...(exam.preguntas || [])].map((q) => q.modulo))];
  const tituloUnidad = unidades.length === 1 ? limpiar([...(exam.preguntas || []), ...(exam.lectura?.preguntas || [])][0]?.moduloTitulo) : "";
  const titulo = tituloUnidad || limpiar(exam.titulo).replace(/^Examen\s*·\s*/, "");
  return {
    tipo: extra.tipo || "Simulacro",
    tipoZh: extra.tipoZh || "模拟考试",
    sello: extra.sello || "试",
    nivel: niveles,
    codigo: extra.codigo || `${niveles ? `Nivel ${niveles}` : "Examen"} · ${total} preguntas`,
    titulo: extra.titulo || titulo,
    tituloZh: extra.tituloZh || `${total} 道题 · ${exam.minutos} 分钟`,
    minutos: exam.minutos,
    puntosTotal: 100,
    criterio: "Cada pregunta vale lo mismo. Apto con 60 puntos o más.",
    criterioZh: "每题分值相同，60 分及以上为合格。",
    agruparPruebas: true,
    pruebas,
  };
}

// ---- Exámenes de práctica por destrezas (src/data/examenes) y los creados en el generador temático ----
function preguntaPractica(q, num) {
  return {
    num,
    enunciado: limpiar(q.question),
    opciones: (q.options || []).map((op, i) => ({ letra: letraDe(i), texto: sinPrefijo(op) })),
    modo: "opcion",
    correcta: letraDe(q.correctAnswer ?? 0),
    respuesta: sinPrefijo(q.options?.[q.correctAnswer ?? 0]),
    explicacion: limpiar(q.explanation),
  };
}

function lineasPorPalabras(wordCount) {
  const nums = str(wordCount).match(/\d+/g)?.map(Number) || [];
  const max = nums.length ? Math.max(...nums) : 120;
  return Math.min(24, Math.max(8, Math.round(max / 7) + 2));
}

export function desdePractica(ex, extra = {}) {
  const nivel = str(ex.level || extra.nivel).toUpperCase();
  const pruebas = [];
  const vocabulario = (ex.vocabulary || []).map((v) => ({ es: limpiar(v.word), zh: limpiar(v.chinese), def: limpiar(v.definition), ej: limpiar(v.example) }));
  if (ex.reading) {
    const r = ex.reading;
    pruebas.push({
      nombre: "Comprensión de lectura",
      nombreZh: "阅读理解",
      clave: "lectura",
      puntos: 25,
      instrucciones: "Lea el texto y conteste a las preguntas. Marque sus respuestas en la Hoja de respuestas.",
      instruccionesZh: INSTR_ZH.lectura,
      tareas: [
        {
          titulo: limpiar(r.title),
          genero: limpiar(r.textType),
          instrucciones: "Lea el texto. A continuación, elija la opción correcta para cada pregunta.",
          instruccionesZh: "阅读文章，然后为每道题选择正确答案。",
          textos: [{ titulo: limpiar(r.title), texto: limpiar(r.text) }],
          preguntas: (r.questions || []).map((q, i) => preguntaPractica(q, i + 1)),
        },
      ],
    });
  }
  if (ex.listening) {
    const l = ex.listening;
    pruebas.push({
      nombre: "Comprensión auditiva",
      nombreZh: "听力理解",
      clave: "auditiva",
      puntos: 25,
      audio: true,
      instrucciones: "Va a escuchar una grabación dos veces. Lea antes las preguntas y elija la opción correcta.",
      instruccionesZh: INSTR_ZH.auditiva,
      tareas: [
        {
          titulo: limpiar(l.title),
          instrucciones: "Escuche el audio y conteste a las preguntas.",
          instruccionesZh: "听录音，回答问题。",
          audio: true,
          transcripcion: limpiar(l.transcription),
          preguntas: (l.questions || []).map((q, i) => preguntaPractica(q, i + 1)),
        },
      ],
    });
  }
  if (ex.writing) {
    const tareas = ["optionA", "optionB"]
      .map((k, i) => ({ o: ex.writing[k], letra: i === 0 ? "A" : "B" }))
      .filter((x) => x.o)
      .map(({ o, letra }) => ({
        titulo: `Opción ${letra} · ${limpiar(o.title)}`,
        instrucciones: limpiar(o.description),
        instruccionesZh: `写作选项 ${letra}：根据题目要求写一篇短文。`,
        escritura: {
          puntosGuia: o.structure ? [o.structure.intro, o.structure.body, o.structure.conclusion].filter(Boolean).map(limpiar) : [],
          conectores: (o.connectors || []).map(limpiar),
          extension: limpiar(o.wordCount),
          lineas: lineasPorPalabras(o.wordCount),
        },
      }));
    pruebas.push({
      nombre: "Expresión e interacción escritas",
      nombreZh: ZH_PRUEBA.escrita,
      clave: "escrita",
      puntos: 25,
      instrucciones: tareas.length > 1 ? "Elija UNA de las dos opciones y escriba su texto en las líneas." : "Escriba su texto en las líneas.",
      instruccionesZh: tareas.length > 1 ? "从两个选项中任选一个，在横线上写作。" : "请在横线上写作。",
      tareas,
    });
  }
  if (ex.monologue || ex.interaction) {
    const tareas = [];
    ["topic1", "topic2"].forEach((k, i) => {
      const o = ex.monologue?.[k];
      if (!o) return;
      tareas.push({
        titulo: `Monólogo · Tema ${i + 1} · ${limpiar(o.title)}`,
        instrucciones: limpiar(o.description),
        instruccionesZh: "独白：围绕题目讲 1–2 分钟。",
        oral: { puntosGuia: (o.guideQuestions || []).map(limpiar), conectores: (o.connectors || []).map(limpiar), notas: 5 },
      });
    });
    if (ex.interaction) {
      const it = ex.interaction;
      tareas.push({
        titulo: "Conversación con el entrevistador",
        instrucciones: limpiar(it.situation),
        instruccionesZh: "对话：根据情境回答考官的问题。",
        oral: {
          preguntasEntrevistador: (it.questions || []).map((q) => ({ pregunta: limpiar(q.question), ayuda: limpiar(q.help), frases: (q.usefulPhrases || []).map(limpiar) })),
          notas: 4,
        },
      });
    }
    pruebas.push({
      nombre: "Expresión e interacción orales",
      nombreZh: ZH_PRUEBA.oral,
      clave: "oral",
      puntos: 25,
      instrucciones: "Prepare las tareas con ayuda de las notas. Después hable con el entrevistador.",
      instruccionesZh: INSTR_ZH.oral,
      tareas,
    });
  }
  const minutos = { A1: 105, A2: 110, B1: 135, B2: 150 }[nivel] || null;
  return {
    tipo: extra.tipo || "Examen de práctica",
    tipoZh: extra.tipoZh || "分项练习试卷",
    sello: extra.sello || "练",
    nivel,
    codigo: extra.codigo || (ex.id ? `${nivel} · Práctica ${ex.id}` : `Nivel ${nivel}`),
    titulo: limpiar(ex.theme || extra.titulo || "Examen"),
    tituloZh: extra.tituloZh || `${nivel} 级 · 主题练习`,
    minutos,
    puntosTotal: 100,
    criterio: "Cada prueba vale 25 puntos. Apto con 60 puntos o más.",
    criterioZh: "每部分 25 分，总分 60 分及以上为合格。",
    vocabulario,
    pruebas,
  };
}

export function crearDocumento(fuente) {
  if (!fuente) return null;
  if (fuente.tipo === "oficial") return desdeOficial(fuente.examen, fuente.nivel);
  if (fuente.tipo === "generado") return desdeGenerado(fuente.examen, fuente.extra);
  if (fuente.tipo === "practica") return desdePractica(fuente.examen, fuente.extra);
  return fuente.documento || null;
}
