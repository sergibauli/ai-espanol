// v21 · Juegos H5P (h5p-standalone + librerías oficiales de H5P, MIT) generados con el contenido de cada unidad.
// No hay ficheros por unidad: el contenido se genera aquí y se entrega al reproductor a través de una ruta
// «virtual» (./h5p/u/…) que intercepta fetch. Las librerías y el reproductor son ficheros estáticos de public/h5p.
import { audioGrabado } from "../components/lesson/fx.js";

const LIBRERIAS = {
  tarjetas: { machineName: "H5P.Dialogcards", majorVersion: 1, minorVersion: 8 },
  arrastrar: { machineName: "H5P.DragText", majorVersion: 1, minorVersion: 8 },
  marcar: { machineName: "H5P.MarkTheWords", majorVersion: 1, minorVersion: 9 },
};
// Dependencias que cada tipo declara en su h5p.json (las mismas que su library.json)
const DEPENDENCIAS = {
  tarjetas: ["H5P.Dialogcards 1.8", "FontAwesome 4.5", "H5P.JoubelUI 1.3", "H5P.Audio 1.4", "H5P.Transition 1.0", "H5P.FontIcons 1.0", "flowplayer 1.0"],
  arrastrar: ["H5P.DragText 1.8", "FontAwesome 4.5", "jQuery.ui 1.10", "H5P.JoubelUI 1.3", "H5P.Question 1.4", "H5P.Transition 1.0", "H5P.FontIcons 1.0"],
  marcar: ["H5P.MarkTheWords 1.9", "FontAwesome 4.5", "H5P.JoubelUI 1.3", "H5P.Question 1.4", "H5P.Transition 1.0", "H5P.FontIcons 1.0"],
};

export const JUEGOS_H5P = {
  tarjetas: {
    titulo: "Tarjetas con voz",
    tituloZh: "有声单词卡",
    sello: "卡",
    desc: "Gira cada tarjeta, escucha al profesor y di si la sabías. Las que fallas vuelven en la siguiente ronda.",
    descZh: "翻转卡片，听老师发音，答错的卡片会在下一轮再出现。",
  },
  arrastrar: {
    titulo: "Completa el diálogo",
    tituloZh: "拖词补全对话",
    sello: "补",
    desc: "Arrastra las palabras de la unidad a su hueco en los diálogos. Cada hueco tiene una pista en chino.",
    descZh: "把本单元的单词拖到对话的空格里，每个空格都有中文提示。",
  },
  marcar: {
    titulo: "Caza de palabras",
    tituloZh: "找出单词",
    sello: "找",
    desc: "Lee el diálogo y marca las palabras en español que significan lo que pide la lista en chino.",
    descZh: "阅读对话，点出与中文意思对应的西班牙语单词。",
  },
};

const barajar = (lista) => {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
};
// El texto de H5P es HTML y los asteriscos marcan respuestas: se escapan
const html = (t) => String(t ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const limpio = (t) => String(t ?? "").replace(/\*/g, "").replace(/\s+/g, " ").trim();
const escRegex = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const urlAbsoluta = (rel) => new URL(rel, location.href.split("#")[0]).href;
const lineasDe = (contenido) => (contenido.dialogos || []).flatMap((d) => (d.lineas || []).map((l) => ({ ...l, dialogo: d })));
// Busca una forma del vocabulario dentro de una frase (palabra completa, sin distinguir mayúsculas)
function buscar(frase, forma) {
  if (!forma || forma.length < 2) return null;
  const re = new RegExp(`(^|[^\\p{L}])(${escRegex(forma)})(?=$|[^\\p{L}])`, "iu");
  const m = re.exec(frase);
  return m ? { indice: m.index + m[1].length, texto: m[2] } : null;
}
// «el libro» → también vale «libro»; «Me llamo» se busca entero
const formasDe = (v) => {
  const base = limpio(v.espanol).replace(/[¿?¡!.,;:]/g, "");
  const sinArticulo = base.replace(/^(el|la|los|las|un|una)\s+/i, "");
  return [...new Set([base, sinArticulo])].filter(Boolean);
};

// ---------- Tarjetas con voz (Dialog Cards) ----------
function tarjetas(contenido) {
  const vocab = barajar(contenido.vocabulario).slice(0, 16);
  if (vocab.length < 3) return null;
  return {
    title: "",
    mode: "repetition",
    description: "",
    dialogs: vocab.map((v) => {
      const audio = audioGrabado(limpio(v.espanol));
      return {
        text: `<p><strong>${html(limpio(v.espanol))}</strong></p>${v.ejemplo ? `<p><em>${html(limpio(v.ejemplo))}</em></p>` : ""}`,
        answer: `<p>${html(v.chino)}</p>`,
        ...(audio ? { audio: [{ path: urlAbsoluta(audio), mime: "audio/mpeg", copyright: { license: "U" } }] } : {}),
        tips: { front: "", back: "" },
      };
    }),
    behaviour: { enableRetry: true, disableBackwardsNavigation: false, scaleTextNotCard: true, randomCards: true, maxProficiency: 3, quickProgression: false },
    answer: "Girar 翻",
    next: "Siguiente · 下一张",
    prev: "Anterior · 上一张",
    retry: "Otra vez · 重来",
    correctAnswer: "La sé 会",
    incorrectAnswer: "No 不会",
    round: "Ronda · 轮次 @round",
    cardsLeft: "Quedan · 剩余 @number",
    nextRound: "Ronda · 下一轮 @round",
    startOver: "Empezar de nuevo · 重新开始",
    showSummary: "Ver resumen · 查看总结",
    summary: "Resumen · 总结",
    summaryCardsRight: "Tarjetas que sabías · 会的卡片：",
    summaryCardsWrong: "Tarjetas que fallaste · 不会的卡片：",
    summaryCardsNotShown: "Tarjetas sin ver · 未出现的卡片：",
    summaryOverallScore: "Puntuación total · 总分",
    summaryCardsCompleted: "Tarjetas aprendidas · 已掌握：",
    summaryCompletedRounds: "Rondas completadas · 完成轮数：",
    summaryAllDone: "¡Muy bien! Dominas las @cards tarjetas (@max veces) · 太棒了，全部掌握！",
    progressText: "@card / @total",
    cardFrontLabel: "Español · 西语",
    cardBackLabel: "Chino · 中文",
    tipButtonLabel: "Pista · 提示",
    audioNotSupported: "Tu navegador no reproduce este audio · 浏览器不支持音频",
    confirmStartingOver: { header: "¿Empezar de nuevo? · 重新开始？", body: "Se perderá el progreso · 进度将会丢失", cancelLabel: "Cancelar · 取消", confirmLabel: "Empezar · 开始" },
  };
}

// ---------- Completa el diálogo (Drag the Words) ----------
function arrastrar(contenido) {
  const vocab = contenido.vocabulario.map((v) => ({ v, formas: formasDe(v) }));
  const usadas = new Set();
  const frases = [];
  for (const linea of barajar(lineasDe(contenido))) {
    if (frases.length >= 7) break;
    const texto = limpio(linea.texto);
    const hallada = barajar(vocab).map(({ v, formas }) => formas.map((f) => ({ v, hit: buscar(texto, f) })).find((x) => x.hit)).find((x) => x && !usadas.has(x.hit.texto.toLowerCase()));
    if (!hallada) continue;
    usadas.add(hallada.hit.texto.toLowerCase());
    const { indice, texto: palabra } = hallada.hit;
    const pista = limpio(hallada.v.chino).replace(/[:*]/g, "");
    const antes = html(texto.slice(0, indice));
    const despues = html(texto.slice(indice + palabra.length));
    frases.push(`${html(linea.personaje || "")}${linea.personaje ? ": " : ""}${antes}*${html(palabra)}:${html(pista)}*${despues}`);
  }
  if (frases.length < 3) return null;
  return {
    taskDescription: "<p>Arrastra cada palabra a su hueco · 把单词拖到空格里</p>",
    textField: frases.join("\n"),
    overallFeedback: [{ from: 0, to: 49, feedback: "¡Sigue practicando! · 继续加油！" }, { from: 50, to: 99, feedback: "¡Bien! Casi lo tienes · 很好，差一点就全对了" }, { from: 100, to: 100, feedback: "¡Perfecto! · 满分！" }],
    checkAnswer: "Comprobar · 检查",
    tryAgain: "Otra vez · 重试",
    showSolution: "Ver solución · 看答案",
    dropZoneIndex: "Hueco @index.",
    empty: "El hueco @index está vacío.",
    contains: "El hueco @index contiene @draggable.",
    ariaDraggableIndex: "@index de @count.",
    tipLabel: "Pista · 提示",
    correctText: "¡Correcto! · 正确！",
    incorrectText: "Incorrecto · 不对",
    resetDropTitle: "Vaciar hueco",
    resetDropDescription: "¿Vaciar este hueco?",
    grabbed: "Palabra cogida.",
    cancelledDragging: "Arrastre cancelado.",
    correctAnswer: "Respuesta correcta:",
    feedbackHeader: "Resultado · 结果",
    behaviour: { enableRetry: true, enableSolutionsButton: true, enableCheckButton: true, instantFeedback: true },
    scoreBarLabel: "Tienes :num de :total puntos",
  };
}

// ---------- Caza de palabras (Mark the Words) ----------
function marcar(contenido) {
  // Solo palabras sueltas: Mark the Words marca palabra a palabra
  const sueltas = contenido.vocabulario.map((v) => ({ v, forma: formasDe(v).find((f) => !/\s/.test(f)) })).filter((x) => x.forma && x.forma.length > 2);
  const lineas = lineasDe(contenido);
  const elegidas = [];
  const objetivos = new Map();
  for (const linea of lineas) {
    const texto = limpio(linea.texto);
    const hits = sueltas.filter(({ forma }) => buscar(texto, forma));
    if (!hits.length && elegidas.length >= 3) continue;
    elegidas.push({ linea, texto });
    hits.forEach((h) => objetivos.size < 8 && !objetivos.has(h.forma.toLowerCase()) && objetivos.set(h.forma.toLowerCase(), h));
    if (elegidas.length >= 8 && objetivos.size >= 4) break;
  }
  if (objetivos.size < 3) return null;
  // Marca la primera aparición de cada objetivo
  const pendientes = new Set(objetivos.keys());
  const texto = elegidas
    .map(({ linea, texto: frase }) => {
      let salida = "";
      let resto = frase;
      for (const clave of [...pendientes]) {
        const hit = buscar(resto, objetivos.get(clave).forma);
        if (!hit) continue;
        salida += html(resto.slice(0, hit.indice)) + `*${html(hit.texto)}*`;
        resto = resto.slice(hit.indice + hit.texto.length);
        pendientes.delete(clave);
      }
      return `<p>${linea.personaje ? `${html(linea.personaje)}: ` : ""}${salida}${html(resto)}</p>`;
    })
    .join("");
  const marcados = [...objetivos.keys()].filter((k) => !pendientes.has(k));
  if (marcados.length < 3) return null;
  const lista = barajar(marcados.map((k) => limpio(objetivos.get(k).v.chino)));
  return {
    taskDescription: `<p>Marca las ${marcados.length} palabras que significan · 点出意思是下列词语的 ${marcados.length} 个单词：</p><p><strong>${lista.map(html).join(" · ")}</strong></p>`,
    textField: texto,
    overallFeedback: [{ from: 0, to: 49, feedback: "¡Sigue practicando! · 继续加油！" }, { from: 50, to: 99, feedback: "¡Bien! · 很好！" }, { from: 100, to: 100, feedback: "¡Perfecto! · 满分！" }],
    checkAnswerButton: "Comprobar · 检查",
    tryAgainButton: "Otra vez · 重试",
    showSolutionButton: "Ver solución · 看答案",
    behaviour: { enableRetry: true, enableSolutionsButton: true, enableCheckButton: true, showScorePoints: true },
    correctAnswer: "¡Correcto! · 正确！",
    incorrectAnswer: "Incorrecto · 不对",
    missedAnswer: "¡No la has encontrado! · 漏掉了！",
    displaySolutionDescription: "Se muestran las soluciones · 已显示答案",
    scoreBarLabel: "Tienes :num de :total puntos",
    a11yFullTextLabel: "Texto completo",
    a11yClickableTextLabel: "Texto con palabras para marcar",
    a11ySolutionModeHeader: "Modo solución",
    a11yCheckingHeader: "Modo comprobación",
  };
}

const CONSTRUCTORES = { tarjetas, arrastrar, marcar };

function h5pJson(tipo, titulo) {
  const lib = LIBRERIAS[tipo];
  return {
    title: titulo,
    language: "es",
    mainLibrary: lib.machineName,
    embedTypes: ["div"],
    license: "U",
    preloadedDependencies: DEPENDENCIAS[tipo].map((d) => {
      const [machineName, version] = d.split(" ");
      const [majorVersion, minorVersion] = version.split(".").map(Number);
      return { machineName, majorVersion, minorVersion };
    }),
  };
}

// Contenido «virtual»: ./h5p/u/<clave>/h5p.json y ./h5p/u/<clave>/content/content.json
const VIRTUAL = new Map();
let fetchOriginal = null;
function instalarFetchVirtual() {
  if (fetchOriginal) return;
  fetchOriginal = window.fetch.bind(window);
  window.fetch = (entrada, opciones) => {
    const url = typeof entrada === "string" ? entrada : entrada?.url;
    const m = url && /\/h5p\/u\/([^/]+)\/(h5p\.json|content\/content\.json)$/.exec(url);
    if (m && VIRTUAL.has(m[1])) {
      const datos = VIRTUAL.get(m[1]);
      const cuerpo = JSON.stringify(m[2] === "h5p.json" ? datos.h5p : datos.content);
      return Promise.resolve(new Response(cuerpo, { status: 200, headers: { "Content-Type": "application/json" } }));
    }
    return fetchOriginal(entrada, opciones);
  };
}

/** Genera la actividad y devuelve las rutas para h5p-standalone, o null si la unidad no tiene material suficiente */
export function prepararH5P(tipo, contenido) {
  const content = CONSTRUCTORES[tipo]?.(contenido);
  if (!content) return null;
  instalarFetchVirtual();
  const clave = `${tipo}-${contenido.numero}-${contenido.clase ?? "u"}-${Date.now().toString(36)}`;
  VIRTUAL.set(clave, { h5p: h5pJson(tipo, `${JUEGOS_H5P[tipo].titulo} · ${contenido.titulo}`), content });
  const base = urlAbsoluta("./h5p/");
  return {
    clave,
    opciones: {
      id: clave,
      h5pJsonPath: `${base}u/${clave}`,
      contentJsonPath: `${base}u/${clave}/content`,
      librariesPath: `${base}libraries`,
      frameJs: `${base}player/frame.bundle.js`,
      frameCss: `${base}player/styles/h5p.css`,
      customCss: [`${base}tema-imperial.css`],
      frame: false,
      export: false,
      embed: false,
      copyright: false,
      icon: false,
      fullScreen: false,
    },
  };
}
export const liberarH5P = (clave) => VIRTUAL.delete(clave);
