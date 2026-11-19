import * as React from "react";
import { trazado } from "./geometria.js";

/*
  v27 · Tramo pintado (scripts/tramos-ruta.py) recortado con una máscara que SIGUE EL CAMINO: el terreno pintado solo
  se ve junto al recorrido, las paradas y la peana del examen, y se funde en ~140 px con el paisaje del mundo que hay
  detrás. Así el tablero inclinado no tiene bordes ni «panel»: el camino se pinta sobre el mismo paisaje.
  La máscara son trazos concéntricos semitransparentes (sin filtros: se rasteriza una vez y es barata).
*/
const ANCHO_IMG = 760;
const ARRIBA_IMG = -70;
// Anchos de los trazos de la máscara (de fuera a dentro) y su opacidad
const BANDAS = [
  [430, 0.1],
  [380, 0.12],
  [330, 0.14],
  [285, 0.18],
  [245, 0.22],
  [210, 0.3],
  [178, 0.45],
  [150, 1],
];

export function TramoPintado({ src, pts, forma, alto, carril }) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const x0 = carril / 2 - ANCHO_IMG / 2;
  const h = alto + 220;
  const ultimo = pts.length - 1;
  const camino = `M${carril / 2} ${ARRIBA_IMG - 30} L${carril / 2} 0 ${trazado(pts, ultimo, forma).replace(/^M[^C]*/, "")}`;
  const [ex, ey] = pts[ultimo];
  return (
    <svg className="ru-tramo-svg" width={ANCHO_IMG} height={h} viewBox={`${x0} ${ARRIBA_IMG} ${ANCHO_IMG} ${h}`} style={{ left: x0, top: ARRIBA_IMG }} aria-hidden="true">
      <defs>
        <mask id={`${uid}m`} maskUnits="userSpaceOnUse" x={x0} y={ARRIBA_IMG} width={ANCHO_IMG} height={h}>
          {BANDAS.map(([ancho, op]) => (
            <g key={ancho} opacity={op}>
              <path d={camino} fill="none" stroke="#fff" strokeWidth={ancho} strokeLinecap="round" strokeLinejoin="round" />
              {pts.slice(0, ultimo).map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={ancho * 0.42} fill="#fff" />
              ))}
              {/* peana y pabellón del examen */}
              <ellipse cx={ex} cy={ey + 70} rx={ancho * 0.62} ry={ancho * 0.4} fill="#fff" />
            </g>
          ))}
        </mask>
      </defs>
      <image href={src} x={x0} y={ARRIBA_IMG} width={ANCHO_IMG} height={h} preserveAspectRatio="none" mask={`url(#${uid}m)`} />
    </svg>
  );
}
