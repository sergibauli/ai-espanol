// Contenido de una unidad o de una de sus clases para los juegos (#/juegos/x?m=N&clase=K)
import { ALL_MODULES } from "../data/modulos/index.js";
import { moduloDeClase } from "./clases.js";

// ?m=N&clase=K y «todas las palabras» viven en vocabularioJuegos.js (datos ligeros); se reexportan aquí
import { parametrosJuego } from "./vocabularioJuegos.js";
export { parametrosJuego, todasLasPalabras } from "./vocabularioJuegos.js";

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
