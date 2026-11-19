// Contenido de la unidad completa (todas sus clases) para los juegos (#/juegos/x?m=N; ?clase=K se ignora)
import { ALL_MODULES } from "../data/modulos/index.js";

// ?m=N y «todas las palabras» viven en vocabularioJuegos.js (datos ligeros); se reexportan aquí
import { parametrosJuego } from "./vocabularioJuegos.js";
export { parametrosJuego, todasLasPalabras } from "./vocabularioJuegos.js";

export const moduloPorNumero = (numero) => ALL_MODULES.find((modulo) => modulo.numero === Number(numero)) || null;

// Módulo completo con la misma forma que los datos originales (nunca se filtra a una clase)
export function contenidoJuego(numero = parametrosJuego().numero) {
  const modulo = moduloPorNumero(numero);
  if (!modulo) return null;
  const filtrado = modulo;
  return {
    numero: modulo.numero,
    clase: null,
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
