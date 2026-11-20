// Material de la app (capturas reales de main, móvil 390×844 @3x) y cifras reales.
const C = "/promo-douyin/capturas/";
const PH = C + "_juegos.png"; // marcador provisional
export const CAP = {
  portada: C + "aprender/01-portada-puerta-rey-mono.png",
  rutaA1: C + "aprender/02-ruta-A1-bambu-muralla.png",
  rutaA2: C + "aprender/03-ruta-A2-linternas.png",
  rutaB1: C + "aprender/04-ruta-B1-tinta-noche.png",
  rutaB2: C + "aprender/05-ruta-B2-montanas.png",
  perfecta: C + "aprender/11-fin-leccion-perfecta.png",
  palabraHola: C + "aprender/07-leccion-palabra-hola.png",
  teoria: C + "unidades/03_unidad29_teoria_frases.png",
  vocabulario: C + "unidades/04_unidad29_vocabulario.png",
  dialogo: C + "unidades/05_unidad29_dialogo_voces.png",
  pronunciacion: C + "unidades/08_pronunciacion_templo.png",
  diccionario: C + "unidades/07_diccionario_ficha_agua.png",
  repaso: C + "unidades/10_repaso_espaciado.png",
  idiomas: C + "unidades/11_idiomas_selector.png",
  examA1: C + "practica/mundo_A1_bambu.png", examA2: C + "practica/mundo_A2_linternas.png", examB1: C + "practica/mundo_B1_tinta.png", examB2: C + "practica/mundo_B2_ciudad_prohibida.png",
  examen: C + "practica/examen_lectura_portada.png", impresionPanel: C + "practica/impresion_pdf.png", impresion: "/promo-douyin/film/recursos/hoja-pdf.jpg",
  tutor: C + "practica/examinador_oral.png", tutorChat: C + "practica/tutor_conversacion.png", examenOk: C + "practica/examen_pregunta_correcta.png", tvLista: C + "practica/tv_episodios.png", tv: C + "practica/tv/ep_060.jpg",
  progreso: C + "practica/mi_progreso.png", progreso2: C + "practica/mi_progreso_cuatro_pruebas.png", generador: C + "practica/generador_examen_generado.png",
  juego0: PH, juego1: PH, juego2: PH, juego3: PH, juego4: PH, juego5: PH, turbo: PH,
};
const pad = (n, w = 3) => String(n).padStart(w, "0");
export const SEQ = {
  puerta: { n: 160, url: (i) => `/promo-douyin/film/recursos/puerta/f_${pad(i + 1)}.jpg` },
  vuelo: { n: 165, url: (i) => `/promo-douyin/film/recursos/vuelo/f_${pad(i + 1)}.jpg` },
  tv: { n: 121, url: (i) => `${C}practica/tv/ep_${pad(i + 1)}.jpg` },
  acierto: { n: 90, url: (i) => `${C}aprender/seq-acierto-hola/f${pad(i)}.jpg` },
};
export const ZOOM = { tap: { x: 0.25, y: 0.69 } };
export const JUEGOS = [
  { clave: "juego0", zh: "麻将" }, { clave: "juego1", zh: "西班牙纸牌" }, { clave: "juego2", zh: "单词宫殿" },
  { clave: "juego3", zh: "飞行棋" }, { clave: "juego4", zh: "记忆翻牌" }, { clave: "juego5", zh: "神龙弹珠" },
];
export const CIFRAS = {
  unidades: 90, modelos: 88, juegos: 17, palabras: 1969, dialogos: 420,
  leccion: "5 个关卡 · 约 60 分钟",
  turboSub: "<em>答对单词</em>就能加速", turboPalabra: "¡Rápido!", turboPalabraZh: "快！",
};
