// Contenido de la unidad completa (todas sus clases) para los juegos (#/juegos/x?m=N; ?clase=K se ignora)
// Antes importaba ALL_MODULES: cualquier juego que usara este fichero (incluso solo por todasLasPalabras)
// descargaba las 90 unidades completas (~700 KB gzip). Ahora se pide solo la unidad del juego (trozo
// `unidad-NN` de scripts/vite-trozos-datos.mjs) y <ConUnidadJuego> (App.jsx) espera a tenerla antes de pintar.
import { unidadJuego } from "./unidadJuego.js";
export { unidadJuegoCargada, cargarUnidadJuego } from "./unidadJuego.js";

// ?m=N y «todas las palabras» viven en vocabularioJuegos.js (datos ligeros); se reexportan aquí
import { parametrosJuego } from "./vocabularioJuegos.js";
export { parametrosJuego, todasLasPalabras } from "./vocabularioJuegos.js";

export const moduloPorNumero = (numero) => unidadJuego(numero);

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
