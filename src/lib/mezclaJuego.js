// Mezcla «unidades que ya he hecho» para los juegos: el selector común guarda aquí los números de unidad
// y las utilidades de vocabulario (juegos-utils, contenidoJuego, Kahoot) lo usan cuando se juega «sin unidad».
// Vive en sessionStorage: elegir «Mezclar todas» o cerrar la pestaña la borra.
const CLAVE = "dele_juego_mezcla";

export function fijarMezcla(numeros) {
  try {
    sessionStorage.setItem(CLAVE, JSON.stringify((numeros || []).map(Number).filter(Boolean)));
  } catch {}
}

export function limpiarMezcla() {
  try {
    sessionStorage.removeItem(CLAVE);
  } catch {}
}

/** Set con los números de unidad de la mezcla activa, o null si se juega con todas */
export function mezclaActual() {
  try {
    const lista = JSON.parse(sessionStorage.getItem(CLAVE) || "null");
    return Array.isArray(lista) && lista.length ? new Set(lista.map(Number)) : null;
  } catch {
    return null;
  }
}

/** Filtra una lista de módulos ({ numero } o { id: "modulo-N" }) a la mezcla activa; sin mezcla, la deja igual */
export function filtrarPorMezcla(modulos) {
  const mezcla = mezclaActual();
  if (!mezcla) return modulos;
  const filtrados = modulos.filter((m) => mezcla.has(Number(m.numero ?? String(m.id || "").replace("modulo-", ""))));
  return filtrados.length ? filtrados : modulos;
}
