// Contenido de una unidad o de una de sus clases para los juegos (#/juegos/x?m=N&clase=K)
import { ALL_MODULES } from "../data/modulos/index.js";
import { moduloDeClase } from "./clases.js";

// Lee ?m=N&clase=K de la ruta con HashRouter (#/juegos/x?m=8&clase=2)
export function parametrosJuego() {
  if (typeof window === "undefined") return { numero: null, clase: null };
  const consulta = (window.location.hash.split("?")[1] || window.location.search.slice(1) || "").trim();
  const params = new URLSearchParams(consulta);
  const numero = Number(params.get("m")) || null;
  const clase = params.get("clase");
  return { numero, clase: clase && clase !== "unidad" ? Number(clase) || null : null };
}

export const moduloPorNumero = (numero) => ALL_MODULES.find((modulo) => modulo.numero === Number(numero)) || null;

// Módulo (filtrado a la clase si se indica) con la misma forma que los datos originales
export function contenidoJuego(numero = parametrosJuego().numero, clase = parametrosJuego().clase) {
  const modulo = moduloPorNumero(numero);
  if (!modulo) return null;
  const filtrado = clase ? moduloDeClase(modulo, clase) : modulo;
  return {
    numero: modulo.numero,
    clase: clase || null,
    titulo: modulo.titulo,
    tituloChino: modulo.tituloChino,
    nivel: modulo.nivel,
    color: modulo.color,
    icono: modulo.icono,
    vocabulario: (filtrado.vocabulario || []).filter((v) => v?.espanol && v?.chino),
    dialogos: filtrado.dialogos || [],
    teoria: filtrado.teoria || [],
    ejercicios: filtrado.ejercicios || {},
  };
}

// Todas las palabras de todas las unidades (para juegos sin unidad elegida)
export const todasLasPalabras = () =>
  ALL_MODULES.flatMap((modulo) => (modulo.vocabulario || []).map((v) => ({ ...v, numero: modulo.numero }))).filter((v) => v?.espanol && v?.chino);
