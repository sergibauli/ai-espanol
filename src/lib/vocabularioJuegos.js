// Vocabulario de todas las unidades para los juegos de palabras (Memory, Ruleta, Ahorcado, Sopa, Kahoot…).
// Solo trae metadatos + vocabulario de cada unidad (trozo generado por scripts/vite-trozos-datos.mjs), no la teoría,
// los diálogos ni los ejercicios: el juego descarga ~1/15 de lo que bajaba con ALL_MODULES.
import UNIDADES from "virtual:modulos-vocabulario";
import { moduloDeClase } from "./clases.js";

export const UNIDADES_VOCABULARIO = UNIDADES;

// Lee ?m=N&clase=K de la ruta con HashRouter (#/juegos/x?m=8&clase=2)
export function parametrosJuego() {
  if (typeof window === "undefined") return { numero: null, clase: null };
  const consulta = (window.location.hash.split("?")[1] || window.location.search.slice(1) || "").trim();
  const params = new URLSearchParams(consulta);
  const numero = Number(params.get("m")) || null;
  const clase = params.get("clase");
  return { numero, clase: clase && clase !== "unidad" ? Number(clase) || null : null };
}

export const unidadVocabulario = (numero) => UNIDADES.find((u) => u.numero === Number(numero)) || null;

/** Como contenidoJuego (contenidoJuego.js) pero solo con el vocabulario: misma forma, sin teoría/diálogos/ejercicios */
export function vocabularioJuego(numero = parametrosJuego().numero, clase = parametrosJuego().clase) {
  const unidad = unidadVocabulario(numero);
  if (!unidad) return null;
  const filtrado = clase ? moduloDeClase(unidad, clase) : unidad;
  return {
    numero: unidad.numero,
    clase: clase || null,
    titulo: unidad.titulo,
    tituloChino: unidad.tituloChino,
    nivel: unidad.nivel,
    color: unidad.color,
    icono: unidad.icono,
    vocabulario: (filtrado.vocabulario || []).filter((v) => v?.espanol && v?.chino),
    dialogos: [],
    teoria: [],
    ejercicios: {},
  };
}

// Todas las palabras de todas las unidades (para juegos sin unidad elegida)
export const todasLasPalabras = () =>
  UNIDADES.flatMap((unidad) => (unidad.vocabulario || []).map((v) => ({ ...v, numero: unidad.numero }))).filter((v) => v?.espanol && v?.chino);
