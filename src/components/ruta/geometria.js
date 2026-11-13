// Geometría del camino dorado de la Ruta: una parada por clase + cofre del examen, en un carril de ancho fijo.
// La comparten RutaPage (dibujo del camino) y MonoViajero (recorrido del Rey Mono).
export const ANCHO_CARRIL = 300;
export const FILA = 150;
export const ARRIBA = 100;
// Desplazamiento horizontal en zigzag (como un camino)
const ZIGZAG = [0, 48, 70, 48, 0, -48, -70, -48];

/** Puntos [x, y] de las paradas de la unidad `idx` (la última es el cofre del examen) */
export const puntosCamino = (idx, paradas) => Array.from({ length: paradas + 1 }, (_, i) => [ANCHO_CARRIL / 2 + ZIGZAG[(idx * 3 + i) % ZIGZAG.length], ARRIBA + i * FILA]);
/** Entrada del camino de cada unidad (arriba, bajo el estandarte) */
export const ENTRADA = [ANCHO_CARRIL / 2, 0];
export const curva = ([fx, fy], [tx, ty]) => `C${fx} ${fy + (ty - fy) / 2} ${tx} ${ty - (ty - fy) / 2} ${tx} ${ty}`;
/** Un solo tramo entre dos puntos */
export const tramo = (desde, hasta) => `M${desde[0]} ${desde[1]} ${curva(desde, hasta)}`;
/** Trazado desde la entrada hasta la parada `hasta` */
export const trazado = (pts, hasta = pts.length - 1) => {
  let d = tramo(ENTRADA, pts[0]);
  for (let i = 1; i <= hasta; i++) d += ` ${curva(pts[i - 1], pts[i])}`;
  return d;
};
/** Punto de la curva entre dos paradas para t ∈ [0, 1] (Bézier cúbica con los mismos controles que `curva`) */
export function puntoCurva([fx, fy], [tx, ty], t) {
  const medio = fy + (ty - fy) / 2;
  const u = 1 - t;
  const x = u * u * u * fx + 3 * u * u * t * fx + 3 * u * t * t * tx + t * t * t * tx;
  const y = u * u * u * fy + 3 * u * u * t * medio + 3 * u * t * t * medio + t * t * t * ty;
  return [x, y];
}
