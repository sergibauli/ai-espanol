// Tablero ilustrado (SVG propio) de «El viaje del Rey Mono»: espiral de 40 casillas hacia el Templo del Oeste.
import * as React from "react";
import { CELDAS, ESPECIALES, LADO } from "./viajeLogica.js";

const T = 100; // tamaño de casilla en unidades del viewBox
const BASE = import.meta.env.BASE_URL || "./";
const img = (ruta) => `${BASE}${ruta}`;

// Colores de cada tipo de casilla especial
const TONO = {
  salida: ["#3f9a63", "#1d6339"],
  nube: ["#2c4f8f", "#0e1a33"],
  puente: ["#3f9a63", "#1d6339"],
  pagoda: ["#2f8f52", "#164d2c"],
  linterna: ["#e0485a", "#8f0c21"],
  pozo: ["#5a4636", "#241510"],
  laberinto: ["#d9a441", "#8a5a1e"],
  dragon: ["#b3122c", "#5a0814"],
  melocoton: ["#f7b9a3", "#d9705a"],
};

function Icono({ tipo, id }) {
  switch (tipo) {
    case "salida":
      return (
        <g>
          <path d="M-36 20 L-14 -18 L-2 -2 L12 -26 L36 20 Z" fill="#f6ead0" opacity=".95" />
          <path d="M-14 -18 L-8 -8 L-18 -6 Z M12 -26 L19 -13 L6 -12 Z" fill="#fff" />
          <circle cx="-22" cy="12" r="5" fill="#f2a14e" />
          <circle cx="22" cy="10" r="5" fill="#e0485a" />
          <circle cx="4" cy="14" r="4" fill="#f2c14e" />
        </g>
      );
    case "nube":
      return <image href={img("theme/nube-oro.png")} x="-38" y="-14" width="76" height="27" preserveAspectRatio="xMidYMid meet" />;
    case "puente":
      return (
        <g fill="none" strokeLinecap="round">
          <path d="M-38 16 Q0 -28 38 16" stroke="#c8102e" strokeWidth="7" />
          <path d="M-38 16 Q0 -28 38 16" stroke="#f2c14e" strokeWidth="2" />
          <path d="M-30 4 Q0 -32 30 4" stroke="#f6ead0" strokeWidth="2" />
          {[-24, -12, 0, 12, 24].map((x) => (
            <line key={x} x1={x} y1={-Math.max(0, 28 - Math.abs(x) * 0.9) + 8} x2={x} y2={x === 0 ? -8 : -Math.max(0, 28 - Math.abs(x) * 0.9) + 16} stroke="#f6ead0" strokeWidth="2" />
          ))}
          <path d="M-40 22 Q-20 18 0 22 T40 22" stroke="#9fd3ff" strokeWidth="2.4" opacity=".8" />
        </g>
      );
    case "pagoda":
      return (
        <g>
          {[
            [-28, 18, 28],
            [-22, 2, 22],
            [-16, -14, 16],
          ].map(([a, y, b], i) => (
            <g key={i}>
              <rect x={a * 0.62} y={y - 1} width={-a * 1.24} height="13" fill="#8f0c21" />
              <path d={`M${a - 6} ${y} Q${a} ${y - 4} ${a + 4} ${y - 6} L${b - 4} ${y - 6} Q${b} ${y - 4} ${b + 6} ${y} Z`} fill="#f2c14e" stroke="#7a4f12" strokeWidth="1" />
            </g>
          ))}
          <path d="M0 -32 L4 -20 L-4 -20 Z" fill="#f2c14e" />
        </g>
      );
    case "linterna":
      return (
        <g>
          <line x1="0" y1="-34" x2="0" y2="-24" stroke="#f2c14e" strokeWidth="2" />
          <ellipse cx="0" cy="0" rx="21" ry="24" fill={`url(#${id}lin)`} stroke="#f2c14e" strokeWidth="1.5" />
          <path d="M-10 -22 Q-16 0 -10 22 M10 -22 Q16 0 10 22 M0 -24 V24" stroke="#f2c14e" strokeWidth="1" fill="none" opacity=".75" />
          <rect x="-11" y="-27" width="22" height="6" rx="2" fill="#f2c14e" />
          <rect x="-11" y="21" width="22" height="6" rx="2" fill="#f2c14e" />
          <path d="M0 27 V38 M-3 30 L-4 40 M3 30 L4 40" stroke="#f2c14e" strokeWidth="1.6" />
        </g>
      );
    case "pozo":
      return (
        <g>
          <path d="M-22 -26 L0 -36 L22 -26 Z" fill="#c8102e" stroke="#f2c14e" strokeWidth="1" />
          <line x1="-18" y1="-26" x2="-18" y2="6" stroke="#8a5a1e" strokeWidth="3" />
          <line x1="18" y1="-26" x2="18" y2="6" stroke="#8a5a1e" strokeWidth="3" />
          <line x1="0" y1="-26" x2="0" y2="-6" stroke="#f6ead0" strokeWidth="1" />
          <rect x="-5" y="-8" width="10" height="7" fill="#c8961e" />
          <ellipse cx="0" cy="12" rx="30" ry="13" fill="#9c8c78" stroke="#f6ead0" strokeWidth="1.2" />
          <ellipse cx="0" cy="10" rx="21" ry="7" fill="#0b0705" />
          <path d="M-30 12 V20 Q0 36 30 20 V12" fill="#7c6c58" />
        </g>
      );
    case "laberinto":
      return <path d="M-28 -28 H28 V28 H-20 V-20 H20 V20 H-12 V-12 H12 V12 H-4 V-4" fill="none" stroke="#3b2416" strokeWidth="5" strokeLinejoin="round" />;
    case "dragon":
      return <image href={img("theme/dragon.webp")} x="-34" y="-38" width="68" height="78" preserveAspectRatio="xMidYMid meet" />;
    case "melocoton":
      return (
        <g>
          <path d="M0 -20 C-30 -24 -34 18 0 28 C34 18 30 -24 0 -20 Z" fill={`url(#${id}mel)`} stroke="#b0453a" strokeWidth="1" />
          <path d="M0 -18 Q-4 4 0 26" stroke="#d9705a" strokeWidth="1.4" fill="none" />
          <path d="M2 -20 Q14 -36 28 -28 Q16 -16 2 -20 Z" fill="#2f8f52" />
          <path d="M-2 -20 Q-14 -34 -24 -26 Q-14 -18 -2 -20 Z" fill="#3f9a63" />
        </g>
      );
    default:
      return null;
  }
}

/** Tablero: casillas en espiral, camino dorado y palacio central (meta). `luces` = casillas recién recorridas; `destino` = casilla que brilla. */

// Porcelana de las casillas normales y lado (grosor) de cada medallón
const LADO_TONO = { normal: "#b08a4a" };
const R = 38; // radio del medallón
const RE = 41; // radio de las casillas especiales

/** Tablero: mapa de tinta, camino de piedra dorada en espiral, medallones 3D y templo central (meta).
 *  `luces` = casillas recién recorridas; `destino` = casilla especial activa; `objetivo` = casilla a la que va la ficha. */
export const TableroViaje = React.memo(function TableroViaje({ luces, destino, objetivo }) {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const puntos = CELDAS.map(([c, f]) => [c * T + T / 2, f * T + T / 2]);
  const camino = [...puntos, [2.35 * T, 2.5 * T]].map((p) => p.join(",")).join(" ");
  return (
    <svg className="vm-svg" viewBox={`0 0 ${LADO * T} ${LADO * T}`} role="img" aria-label="Tablero del viaje: 40 casillas en espiral hasta el Templo del Oeste · 40格螺旋棋盘，终点是西天">
      <defs>
        <linearGradient id={`${id}oro`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff1b8" />
          <stop offset=".45" stopColor="#f2c14e" />
          <stop offset="1" stopColor="#9a6a16" />
        </linearGradient>
        <radialGradient id={`${id}porcelana`} cx=".38" cy=".3" r=".8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".45" stopColor="#fbf1da" />
          <stop offset="1" stopColor="#e2c98f" />
        </radialGradient>
        <radialGradient id={`${id}lin`} cx=".4" cy=".35" r=".7">
          <stop offset="0" stopColor="#ffd38a" />
          <stop offset=".45" stopColor="#e0485a" />
          <stop offset="1" stopColor="#8f0c21" />
        </radialGradient>
        <radialGradient id={`${id}mel`} cx=".4" cy=".35" r=".75">
          <stop offset="0" stopColor="#fff1e0" />
          <stop offset=".5" stopColor="#ffb39a" />
          <stop offset="1" stopColor="#e4606a" />
        </radialGradient>
        <radialGradient id={`${id}halo`} cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#fff6d0" stopOpacity="1" />
          <stop offset=".5" stopColor="#f2c14e" stopOpacity=".45" />
          <stop offset="1" stopColor="#f2c14e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}vineta`} cx=".5" cy=".5" r=".72">
          <stop offset=".6" stopColor="#3b2416" stopOpacity="0" />
          <stop offset="1" stopColor="#3b2416" stopOpacity=".55" />
        </radialGradient>
        <linearGradient id={`${id}cielo`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0e1a33" />
          <stop offset=".55" stopColor="#2c4f8f" />
          <stop offset="1" stopColor="#8fb6e6" />
        </linearGradient>
        {Object.entries(TONO).map(([k, [a, b]]) => (
          <radialGradient key={k} id={`${id}t-${k}`} cx=".38" cy=".3" r=".85">
            <stop offset="0" stopColor="#fff" stopOpacity=".55" />
            <stop offset=".18" stopColor={a} />
            <stop offset="1" stopColor={b} />
          </radialGradient>
        ))}
        <filter id={`${id}sombra`} x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#2a1408" floodOpacity=".5" />
        </filter>
        <clipPath id={`${id}meta`}>
          <rect x={2 * T + 10} y={2 * T + 10} width={3 * T - 20} height={3 * T - 20} rx="40" />
        </clipPath>
      </defs>

      {/* Mapa de tinta de fondo */}
      <rect width="700" height="700" fill="#ead7a8" />
      <image href={img("theme/mapa-china.webp")} x="-40" y="-40" width="780" height="780" preserveAspectRatio="xMidYMid slice" opacity=".92" />
      <rect width="700" height="700" fill="#f3e2bb" opacity=".22" />
      <rect width="700" height="700" fill={`url(#${id}vineta)`} />

      {/* Camino de piedra dorada */}
      <g className="vm-camino" fill="none" strokeLinejoin="round" strokeLinecap="round">
        <polyline points={camino} stroke="#3b2416" strokeWidth="62" opacity=".28" transform="translate(0 5)" />
        <polyline points={camino} stroke="#8a5a1e" strokeWidth="58" />
        <polyline points={camino} stroke="#e8cf95" strokeWidth="50" />
        <polyline points={camino} stroke="#d8b46a" strokeWidth="50" strokeDasharray="1 11" opacity=".9" />
        <polyline points={camino} stroke="#fff4c8" strokeWidth="3" strokeDasharray="10 14" opacity=".9" />
      </g>

      {/* Meta: el Templo del Oeste */}
      <g className="vm-meta">
        <rect x={2 * T + 4} y={2 * T + 4} width={3 * T - 8} height={3 * T - 8} rx="44" fill="#8a5a1e" />
        <rect x={2 * T + 10} y={2 * T + 10} width={3 * T - 20} height={3 * T - 20} rx="40" fill={`url(#${id}cielo)`} />
        <g clipPath={`url(#${id}meta)`}>
          <g className="vm-meta-rayos" style={{ transformOrigin: "350px 330px" }}>
            {Array.from({ length: 18 }, (_, i) => (
              <path key={i} d="M350 330 L338 120 L362 120 Z" fill="#ffe9a6" opacity=".16" transform={`rotate(${i * 20} 350 330)`} />
            ))}
          </g>
          <circle className="vm-meta-halo" cx="350" cy="330" r="130" fill={`url(#${id}halo)`} />
          {[
            [250, 262, 0.95],
            [452, 290, 0.8],
            [270, 420, 1.15],
            [440, 430, 0.95],
          ].map(([x, y, s], i) => (
            <image key={i} className="vm-meta-nube" style={{ animationDelay: `${i * -1.7}s` }} href={img("theme/nube-oro.png")} x={x - 40 * s} y={y - 14 * s} width={80 * s} height={28 * s} opacity=".9" />
          ))}
          <image href={img("theme/templos/montana.webp")} x="222" y="224" width="256" height="196" preserveAspectRatio="xMidYMid meet" />
        </g>
        <rect x={2 * T + 10} y={2 * T + 10} width={3 * T - 20} height={3 * T - 20} rx="40" fill="none" stroke={`url(#${id}oro)`} strokeWidth="5" />
        <rect x={2 * T + 17} y={2 * T + 17} width={3 * T - 34} height={3 * T - 34} rx="34" fill="none" stroke="#ffe9a6" strokeWidth="1" opacity=".6" />
        <g filter={`url(#${id}sombra)`}>
          <path d="M262 428 h176 l-10 22 l10 22 h-176 l10 -22 z" fill="#8f0c21" stroke={`url(#${id}oro)`} strokeWidth="2.5" />
        </g>
        <text x="350" y="452" textAnchor="middle" className="vm-svg-kai" fontSize="24" fill="#ffe08a" translate="no">
          西天 · 终点
        </text>
        <text x="350" y="468" textAnchor="middle" fontSize="11.5" fill="#fff4dc" fontWeight="700">
          Templo del Oeste · Meta
        </text>
      </g>

      {/* Medallones */}
      {puntos.map(([cx, cy], n) => {
        const esp = ESPECIALES[n];
        const r = n === 0 ? 44 : esp ? RE : R;
        const lado = esp ? TONO[esp.tipo][1] : LADO_TONO.normal;
        const oscuro = esp && esp.tipo !== "melocoton" && esp.tipo !== "laberinto";
        const clases = ["vm-casilla", esp ? `is-${esp.tipo}` : "is-normal", luces?.includes(n) ? "is-luz" : "", destino === n ? "is-destino" : "", objetivo === n ? "is-objetivo" : ""].join(" ");
        return (
          <g key={n} className={clases} data-pos={n}>
            <circle className="vm-objetivo-aro" cx={cx} cy={cy + 3} r={r + 8} />
            <g className="vm-casilla-cuerpo" style={{ transformOrigin: `${cx}px ${cy}px` }}>
              <ellipse cx={cx} cy={cy + 11} rx={r + 1} ry={r * 0.42} fill="#2a1408" opacity=".38" />
              <circle cx={cx} cy={cy + 6} r={r} fill={lado} />
              <circle cx={cx} cy={cy + 6} r={r} fill="#000" opacity=".25" />
              <circle cx={cx} cy={cy} r={r} fill={esp ? `url(#${id}t-${esp.tipo})` : `url(#${id}porcelana)`} />
              <circle cx={cx} cy={cy} r={r - 2.5} fill="none" stroke={`url(#${id}oro)`} strokeWidth={esp ? 4 : 3} />
              <circle cx={cx} cy={cy} r={r - 8} fill="none" stroke={esp ? "#ffe9a6" : "#c8961e"} strokeWidth="1" strokeDasharray={esp ? "0" : "3 3"} opacity=".75" />
              <circle className="vm-casilla-brillo" cx={cx} cy={cy} r={r} />
              {esp ? (
                <>
                  <g transform={`translate(${cx} ${cy + 1}) scale(.74)`}>
                    <Icono tipo={esp.tipo} id={id} />
                  </g>
                  <g transform={`translate(${cx + r * 0.72} ${cy - r * 0.72}) rotate(-8)`}>
                    <rect x="-11" y="-11" width="22" height="22" rx="5" fill="#c8102e" stroke="#ffe08a" strokeWidth="1.4" />
                    <text y="6" textAnchor="middle" className="vm-svg-kai" fontSize="15" fill="#fff4dc" translate="no">
                      {esp.sello}
                    </text>
                  </g>
                  {n !== 0 && (
                    <g transform={`translate(${cx - r * 0.72} ${cy - r * 0.72})`}>
                      <circle r="10.5" fill="#fff4dc" stroke="#c8961e" strokeWidth="1.4" />
                      <text y="4.5" textAnchor="middle" className="vm-svg-num-mini" fontSize="12" fill="#8f0c21">
                        {n}
                      </text>
                    </g>
                  )}
                  <g className="vm-svg-etq">
                    <path d={`M${cx - 34} ${cy + r - 13} h68 l-6 8 l6 8 h-68 l6 -8 z`} fill={oscuro ? "#3b2416" : "#8f0c21"} stroke="#f2c14e" strokeWidth="1" />
                    <text x={cx} y={cy + r - 1} textAnchor="middle" fontSize="10.5" fill="#fff4dc" fontWeight="800">
                      {n === 0 ? "Salida · 起点" : esp.corto}
                    </text>
                  </g>
                </>
              ) : (
                <text x={cx} y={cy + 11} textAnchor="middle" className="vm-svg-num" fontSize="31" fill="#8f0c21">
                  {n}
                </text>
              )}
            </g>
          </g>
        );
      })}
    </svg>
  );
});

/** Cubo del dado (caras de dado chino: el 1 grande y el 4 en rojo). El giro lo anima la página. */
const PUNTOS = {
  1: [[50, 50]],
  2: [[28, 28], [72, 72]],
  3: [[25, 25], [50, 50], [75, 75]],
  4: [[29, 29], [71, 29], [29, 71], [71, 71]],
  5: [[26, 26], [74, 26], [50, 50], [26, 74], [74, 74]],
  6: [[29, 23], [71, 23], [29, 50], [71, 50], [29, 77], [71, 77]],
};
const CARA = { 1: "frente", 6: "atras", 3: "derecha", 4: "izquierda", 5: "arriba", 2: "abajo" };
export const GIRO_CARA = { 1: [0, 0], 6: [0, 180], 3: [0, -90], 4: [0, 90], 5: [-90, 0], 2: [90, 0] };

export const CuboDado = React.forwardRef(function CuboDado({ giro }, ref) {
  return (
    <span className="vm-cubo" aria-hidden="true">
      <span className="vm-cubo-giro" ref={ref} style={{ transform: `rotateX(${giro[0]}deg) rotateY(${giro[1]}deg) rotateZ(${giro[2] || 0}deg)` }}>
        {Object.keys(CARA).map((n) => (
          <span key={`n${n}`} className={`vm-cubo-nucleo is-${CARA[n]}`} />
        ))}
        {Object.entries(PUNTOS).map(([n, pts]) => (
          <span key={n} className={`vm-cubo-cara is-${CARA[n]}`}>
            {pts.map(([x, y], i) => (
              <i key={i} className={n === "1" ? "is-grande is-rojo" : n === "4" ? "is-rojo" : ""} style={{ left: `${x}%`, top: `${y}%` }} />
            ))}
          </span>
        ))}
      </span>
    </span>
  );
});
