// Tiempo compartido entre la música y la imagen: todo el montaje va a compás.
export const BPM = 130;
export const BEAT = 60 / BPM;          // 0,4615 s
export const BAR = BEAT * 4;           // 1,846 s
export const FPS = 30;
// Versión corta (anuncio de ~15 s): VERSION=corta en Node o ?version=corta en el navegador
export const CORTA = (typeof process !== "undefined" && process.env && process.env.VERSION === "corta") ||
  (typeof location !== "undefined" && new URLSearchParams(location.search).get("version") === "corta");
// Secciones en compases [ini, fin)
const LARGA = [
  { id: "gancho", ini: 0, fin: 2 },
  { id: "problema", ini: 2, fin: 4 },
  { id: "revelacion", ini: 4, fin: 6 },
  { id: "aprender", ini: 6, fin: 8 },
  { id: "lecciones", ini: 8, fin: 10 },
  { id: "unidades", ini: 10, fin: 12 },
  { id: "herramientas", ini: 12, fin: 13 },
  { id: "practica", ini: 13, fin: 15 },
  { id: "tutor", ini: 15, fin: 16 },
  { id: "tv", ini: 16, fin: 17 },
  { id: "juegos", ini: 17, fin: 19 },
  { id: "turbo", ini: 19, fin: 21 },
  { id: "progreso", ini: 21, fin: 22 },
  { id: "idiomas", ini: 22, fin: 23 },
  { id: "beneficios", ini: 23, fin: 25 },
  { id: "cierre", ini: 25, fin: 29 },
];
const CORTA_SEC = [
  { id: "gancho", ini: 0, fin: 2 },
  { id: "revelacion", ini: 2, fin: 4 },
  { id: "juegos", ini: 4, fin: 5 },
  { id: "turbo", ini: 5, fin: 6 },
  { id: "cierre", ini: 6, fin: 8 },
];
export const SECCIONES = CORTA ? CORTA_SEC : LARGA;
export const COMPASES = CORTA ? 8 : 29;
export const DURACION = COMPASES * BAR + (CORTA ? 1.6 : 2.6); // incluye la cola del gong final
