import { ALL_MODULES } from "../data/modulos/index.js";
import { contenidoJuego, parametrosJuego } from "./contenidoJuego.js";
export function g() {
  return ALL_MODULES.map((o) => ({
    id: o.id,
    titulo: o.titulo,
    tituloChino: o.tituloChino,
    vocabularioCount: o.vocabulario?.length || 0,
    color: o.color,
  }));
}
function i(espanol) {
  if (!espanol || typeof espanol !== "string") {
    return false;
  }
  const t = espanol.trim();
  return t.length >= 1 && t.length <= 40;
}
export function b(o) {
  const t = ALL_MODULES.find((n) => n.id === o);
  if (!t || !t.vocabulario) {
    return [];
  }
  // Si el juego se abrió desde una clase (?m=N&clase=K), solo las palabras de esa clase
  const { numero, clase } = parametrosJuego();
  const fuente = clase && numero === t.numero ? contenidoJuego(numero, clase)?.vocabulario || t.vocabulario : t.vocabulario;
  return fuente
    .map((n) => ({
      espanol: n.espanol,
      chino: n.chino,
      ejemplo: n.ejemplo || "",
    }))
    .filter((n) => i(n.espanol));
}
function a() {
  const o = [];
  for (const t of ALL_MODULES) {
    if (t.vocabulario) {
      for (const n of t.vocabulario) {
        const e = {
          espanol: n.espanol,
          chino: n.chino,
          ejemplo: n.ejemplo || "",
        };
        if (i(e.espanol)) {
          o.push(e);
        }
      }
    }
  }
  return o;
}
// Palabras para los juegos de letras: una sola palabra (sin espacios ni guiones) de hasta 20 caracteres.
// Desde una clase (?m=N&clase=K) con menos de 6 palabras sueltas se admiten también sus expresiones cortas
// («buenos días»): los juegos quitan espacios y signos, así la partida sigue siendo solo con la clase.
const MINIMO_CLASE = 6;
function palabrasParaJuego(moduloId) {
  const lista = moduloId ? b(moduloId) : a();
  const sueltas = lista.filter((palabra) => {
    const texto = palabra.espanol.trim();
    return texto.length >= 1 && texto.length <= 20 && !texto.includes(" ") && !texto.includes("-");
  });
  const { clase } = parametrosJuego();
  if (!moduloId || !clase || sueltas.length >= MINIMO_CLASE) return sueltas;
  return lista.filter((palabra) => {
    const texto = palabra.espanol.trim();
    return texto.length >= 1 && texto.replace(/[^\p{L}]/gu, "").length <= 14;
  });
}
export { palabrasParaJuego as a, a as c };
