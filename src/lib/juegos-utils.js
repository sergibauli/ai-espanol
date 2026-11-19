// Solo metadatos + vocabulario de las unidades (no los módulos enteros): ver vocabularioJuegos.js
import { UNIDADES_VOCABULARIO as ALL_MODULES } from "./vocabularioJuegos.js";
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
  // Siempre el vocabulario de la unidad completa (aunque se llegue con ?clase=K)
  return t.vocabulario
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
// Si una unidad tiene menos de 6 palabras sueltas se admiten también sus expresiones cortas
// («buenos días»): los juegos quitan espacios y signos.
const MINIMO_PALABRAS = 6;
function palabrasParaJuego(moduloId) {
  const lista = moduloId ? b(moduloId) : a();
  const sueltas = lista.filter((palabra) => {
    const texto = palabra.espanol.trim();
    return texto.length >= 1 && texto.length <= 20 && !texto.includes(" ") && !texto.includes("-");
  });
  if (!moduloId || sueltas.length >= MINIMO_PALABRAS) return sueltas;
  return lista.filter((palabra) => {
    const texto = palabra.espanol.trim();
    return texto.length >= 1 && texto.replace(/[^\p{L}]/gu, "").length <= 14;
  });
}
export { palabrasParaJuego as a, a as c };
