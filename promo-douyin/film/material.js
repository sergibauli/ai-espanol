// Material de la app (capturas reales de main, móvil 390×844 @3x) y cifras reales.
const C = "/promo-douyin/capturas/";
const PH = C + "_juegos.png"; // marcador provisional
export const CAP = {
  portada: C + "aprender/01-portada-puerta-rey-mono.png",
  rutaA1: C + "aprender/02-ruta-A1-muralla-nieve.png",
  rutaA2: C + "aprender/03-ruta-A2-atardecer.png",
  rutaB1: C + "aprender/04-ruta-B1-ciudad-noche.png",
  rutaB2: C + "aprender/05-ruta-B2-montanas-verdes.png",
  perfecta: C + "aprender/11-fin-leccion-perfecta.png",
  palabraHola: C + "aprender/07-leccion-palabra-hola.png",
  teoria: C + "unidades/03_unidad29_teoria_frases.png",
  vocabulario: C + "unidades/04_unidad29_vocabulario.png",
  dialogo: C + "unidades/05_unidad29_dialogo_voces.png",
  recorrido: C + "unidades/15_unidades_recorrido_alta.png", pabellon: "/promo-douyin/film/recursos/pabellon-tapado.jpg",
  unidadPortada: C + "unidades/02_unidad29_portada.png", rr: C + "unidades/09_pronunciacion_rr.png", cuatroMundos: C + "practica/practica_cuatro_mundos.png", tutorRetrato: C + "practica/tutor_rey_mono.png",
  pronunciacion: C + "unidades/08_pronunciacion_templo.png",
  diccionario: C + "unidades/07_diccionario_ficha_agua.png",
  repaso: C + "unidades/10_repaso_espaciado.png",
  idiomas: C + "unidades/11_idiomas_selector.png",
  examA1: C + "practica/mundo_A1_bambu.png", examA2: C + "practica/mundo_A2_linternas.png", examB1: C + "practica/mundo_B1_tinta.png", examB2: C + "practica/mundo_B2_ciudad_prohibida.png",
  examen: C + "practica/examen_lectura_portada.png", impresionPanel: C + "practica/impresion_pdf.png", impresion: "/promo-douyin/film/recursos/hoja-pdf.jpg",
  tutor: C + "practica/examinador_oral.png", tutorChat: C + "practica/tutor_conversacion.png", examenOk: C + "practica/examen_pregunta_correcta.png", tvLista: C + "practica/tv_episodios.png", tv: C + "practica/tv/ep_060.jpg",
  progreso: C + "practica/mi_progreso.png", progreso2: C + "practica/mi_progreso_cuatro_pruebas.png", generador: C + "practica/generador_examen_generado.png",
  juego0: C + "juegos/mahjong.png", juego1: C + "juegos/brisca.png", juego2: C + "juegos/palacio_b.png", juego3: C + "juegos/turbo_pilotos.png", juego4: C + "juegos/dragon_jade.png", juego5: C + "juegos/pinball.png", turbo: C + "juegos/turbo_carrera_390.png", turbo2: C + "juegos/turbo_carrera2_390.png", turboLogo: C + "juegos/turbo_portada_390.png",
};
const pad = (n, w = 3) => String(n).padStart(w, "0");
export const SEQ = {
  puerta: { n: 160, url: (i) => `/promo-douyin/film/recursos/puerta/f_${pad(i + 1)}.jpg` },
  vuelo: { n: 165, url: (i) => `/promo-douyin/film/recursos/vuelo/f_${pad(i + 1)}.jpg` },
  tv: { n: 121, url: (i) => `${C}practica/tv/ep_${pad(i + 1)}.jpg` },
  turbo: { n: 14, url: (i) => `${C}juegos/turbo/f_${String(i + 1).padStart(4, "0")}.jpg` },
  ruta: { n: 90, url: (i) => `${C}aprender/seq-ruta-scroll-A1/f${pad(i)}.jpg` },
  fin: { n: 90, url: (i) => `${C}aprender/seq-fin-leccion/f${pad(i)}.jpg` },
  unidad1: { n: 228, url: (i) => `${C}v2/unidad1/f_${pad(i + 1)}.jpg` },
  concurso: { n: 235, url: (i) => `${C}v2/concurso/f_${pad(i + 1)}.jpg` },
  ahorcado: { n: 138, url: (i) => `${C}v2/ahorcado/f_${pad(i + 1)}.jpg` },
  ruleta: { n: 338, url: (i) => `${C}v2/ruleta/f_${pad(i + 1)}.jpg` },
  acierto: { n: 90, url: (i) => `${C}aprender/seq-acierto-hola/f${pad(i)}.jpg` },
};
export const ZOOM = { tap: { x: 0.69, y: 0.47 } };
export const JUEGOS = [
  { clave: "juego0", zh: "宫殿麻将" }, { clave: "juego1", zh: "美猴王纸牌" }, { clave: "juego2", zh: "字母宫殿" },
  { clave: "juego3", zh: "西游极速" }, { clave: "juego4", zh: "玉龙" }, { clave: "juego5", zh: "龙之弹球" },
];
export const CIFRAS = {
  unidades: 90, modelos: 88, juegos: 17, palabras: 1969, dialogos: 420,
  leccion: "每课 5 步 · 约 60 分钟",
  turboSub: "<em>冲对单词门</em>，立刻加速！", turboPalabra: "¡Rápido!", turboPalabraZh: "快！",
};
