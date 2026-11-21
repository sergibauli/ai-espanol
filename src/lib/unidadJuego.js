// Caché de unidades completas para los juegos (la usan contenidoJuego.js y <ConUnidadJuego> de App.jsx).
// Fichero mínimo y sin datos: App.jsx lo importa siempre, así que el cargador va con import() diferido.
const cache = new Map();
export const unidadJuegoCargada = (numero) => cache.has(Number(numero));
export const unidadJuego = (numero) => cache.get(Number(numero)) || null;
export function cargarUnidadJuego(numero) {
  const n = Number(numero);
  if (cache.has(n)) return Promise.resolve(cache.get(n));
  return import("./examGenerator.js")
    .then((g) => g.loadModule(n))
    .then(
      (modulo) => {
        cache.set(n, modulo || null);
        return modulo || null;
      },
      () => {
        cache.set(n, null); // sin red: el juego muestra su pantalla de elegir unidad en vez de quedarse cargando
        return null;
      },
    );
}
