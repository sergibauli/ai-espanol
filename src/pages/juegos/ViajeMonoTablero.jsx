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
export const TableroViaje = React.memo(function TableroViaje({ luces, destino, enfocada }) {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const camino = CELDAS.map(([c, f]) => `${c * T + T / 2},${f * T + T / 2}`).join(" ") + ` ${2.3 * T},${2.5 * T}`;
  return (
    <svg className="vm-svg" viewBox={`0 0 ${LADO * T} ${LADO * T}`} role="img" aria-label="Tablero del viaje: 40 casillas en espiral hasta el Templo del Oeste · 40格螺旋棋盘，终点是西天">
      <defs>
        <pattern id={`${id}papel`} patternUnits="userSpaceOnUse" width="700" height="330">
          <image href={img("theme/papel.jpg")} width="700" height="330" preserveAspectRatio="xMidYMid slice" />
        </pattern>
        <linearGradient id={`${id}oro`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe9a6" />
          <stop offset=".5" stopColor="#f2c14e" />
          <stop offset="1" stopColor="#a8761a" />
        </linearGradient>
        <linearGradient id={`${id}cas`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff8e6" />
          <stop offset="1" stopColor="#ecd8ad" />
        </linearGradient>
        <linearGradient id={`${id}cas2`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f8e7c2" />
          <stop offset="1" stopColor="#dfc28a" />
        </linearGradient>
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
          <stop offset="0" stopColor="#fff6d0" stopOpacity=".95" />
          <stop offset=".55" stopColor="#f2c14e" stopOpacity=".35" />
          <stop offset="1" stopColor="#f2c14e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}cielo`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14254d" />
          <stop offset=".6" stopColor="#2c4f8f" />
          <stop offset="1" stopColor="#7aa5d8" />
        </linearGradient>
        {Object.entries(TONO).map(([k, [a, b]]) => (
          <linearGradient key={k} id={`${id}t-${k}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={a} />
            <stop offset="1" stopColor={b} />
          </linearGradient>
        ))}
        <filter id={`${id}sombra`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#2a1408" floodOpacity=".45" />
        </filter>
      </defs>

      {/* Pergamino de fondo */}
      <rect width="700" height="700" fill={`url(#${id}papel)`} />
      <rect width="700" height="700" fill="#f3e2bb" opacity=".35" />

      {/* Camino dorado que une las casillas */}
      <polyline points={camino} fill="none" stroke="#8a5a1e" strokeWidth="22" strokeLinejoin="round" opacity=".55" />
      <polyline points={camino} fill="none" stroke={`url(#${id}oro)`} strokeWidth="12" strokeLinejoin="round" />
      <polyline points={camino} fill="none" stroke="#fff4c8" strokeWidth="2" strokeDasharray="6 10" strokeLinejoin="round" opacity=".9" />

      {/* Meta: el Templo del Oeste */}
      <g className="vm-meta">
        <rect x={2 * T + 8} y={2 * T + 8} width={3 * T - 16} height={3 * T - 16} rx="26" fill={`url(#${id}cielo)`} stroke={`url(#${id}oro)`} strokeWidth="5" />
        <circle className="vm-meta-halo" cx="350" cy="330" r="135" fill={`url(#${id}halo)`} />
        {[
          [240, 268, 0.9],
          [446, 300, 0.8],
          [280, 432, 1.1],
          [432, 438, 0.9],
        ].map(([x, y, s], i) => (
          <image key={i} className="vm-meta-nube" style={{ animationDelay: `${i * -1.7}s` }} href={img("theme/nube-oro.png")} x={x - 40 * s} y={y - 14 * s} width={80 * s} height={28 * s} opacity=".85" />
        ))}
        <image href={img("theme/templos/montana.webp")} x="236" y="236" width="228" height="176" preserveAspectRatio="xMidYMid meet" />
        <rect x="262" y="418" width="176" height="56" rx="12" fill="#8f0c21" stroke={`url(#${id}oro)`} strokeWidth="3" filter={`url(#${id}sombra)`} />
        <text x="350" y="446" textAnchor="middle" className="vm-svg-kai" fontSize="26" fill="#ffe08a" translate="no">
          西天 · 终点
        </text>
        <text x="350" y="466" textAnchor="middle" fontSize="13" fill="#fff4dc" fontWeight="700">
          Templo del Oeste · Meta
        </text>
      </g>

      {/* Casillas */}
      {CELDAS.map(([c, f], n) => {
        const esp = ESPECIALES[n];
        const x = c * T;
        const y = f * T;
        const clases = ["vm-casilla", esp ? `is-${esp.tipo}` : "", luces?.includes(n) ? "is-luz" : "", destino === n ? "is-destino" : "", enfocada === n ? "is-enfocada" : ""].join(" ");
        return (
          <g key={n} className={clases} data-pos={n}>
            <g className="vm-casilla-cuerpo" style={{ transformOrigin: `${x + T / 2}px ${y + T / 2}px` }}>
              <rect x={x + 7} y={y + 9} width={T - 14} height={T - 14} rx="14" fill="#2a1408" opacity=".35" />
              <rect x={x + 6} y={y + 6} width={T - 12} height={T - 12} rx="14" fill={esp ? `url(#${id}t-${esp.tipo})` : `url(#${id}${n % 2 ? "cas" : "cas2"})`} stroke={`url(#${id}oro)`} strokeWidth={esp ? 3.5 : 2.5} />
              <rect x={x + 11} y={y + 11} width={T - 22} height={T - 22} rx="10" fill="none" stroke={esp ? "#ffe08a" : "#c8961e"} strokeWidth="1" opacity=".7" />
              <rect className="vm-casilla-brillo" x={x + 6} y={y + 6} width={T - 12} height={T - 12} rx="14" />
              {esp ? (
                <>
                  <g transform={`translate(${x + T / 2} ${y + T / 2 + 2})`}>
                    <Icono tipo={esp.tipo} id={id} />
                  </g>
                  <g transform={`translate(${x + T - 22} ${y + 22})`}>
                    <rect x="-12" y="-12" width="24" height="24" rx="5" fill="#c8102e" stroke="#ffe08a" strokeWidth="1.4" />
                    <text y="6.5" textAnchor="middle" className="vm-svg-kai" fontSize="17" fill="#fff4dc" translate="no">
                      {esp.sello}
                    </text>
                  </g>
                  <text x={x + T / 2} y={y + T - 13} textAnchor="middle" className="vm-svg-etq" fontSize="11" fill={esp.tipo === "melocoton" || esp.tipo === "laberinto" ? "#3b2416" : "#fff4dc"}>
                    {n === 0 ? "Salida · 起点" : esp.corto}
                  </text>
                </>
              ) : (
                <text x={x + T / 2} y={y + T / 2 + 12} textAnchor="middle" className="vm-svg-num" fontSize="34" fill="#8f0c21" opacity=".85">
                  {n}
                </text>
              )}
              {esp && n !== 0 && (
                <text x={x + 19} y={y + 27} textAnchor="middle" className="vm-svg-num-mini" fontSize="14" fill={esp.tipo === "melocoton" || esp.tipo === "laberinto" ? "#3b2416" : "#ffe08a"}>
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

/** Dado 3D: el cubo gira hasta la cara `valor` (caras de dado chino: el 1 y el 4 en rojo) */
const PUNTOS = {
  1: [[50, 50]],
  2: [
    [28, 28],
    [72, 72],
  ],
  3: [
    [26, 26],
    [50, 50],
    [74, 74],
  ],
  4: [
    [30, 30],
    [70, 30],
    [30, 70],
    [70, 70],
  ],
  5: [
    [27, 27],
    [73, 27],
    [50, 50],
    [27, 73],
    [73, 73],
  ],
  6: [
    [30, 24],
    [70, 24],
    [30, 50],
    [70, 50],
    [30, 76],
    [70, 76],
  ],
};
const CARA = { 1: "frente", 6: "atras", 3: "derecha", 4: "izquierda", 5: "arriba", 2: "abajo" };
export const GIRO_CARA = { 1: [0, 0], 6: [0, 180], 3: [0, -90], 4: [0, 90], 5: [-90, 0], 2: [90, 0] };

export function Dado({ giro, activo, girando, onTirar, etiqueta }) {
  return (
    <button type="button" className={`vm-dado ${activo ? "is-activo" : ""} ${girando ? "is-girando" : ""}`} onClick={onTirar} disabled={!activo} aria-label={etiqueta}>
      <span className="vm-dado-sombra" aria-hidden="true" />
      <span className="vm-dado-cubo" style={{ transform: `rotateX(${giro[0]}deg) rotateY(${giro[1]}deg)` }} aria-hidden="true">
        {Object.entries(PUNTOS).map(([n, pts]) => (
          <span key={n} className={`vm-dado-cara is-${CARA[n]}`}>
            {pts.map(([x, y], i) => (
              <i key={i} className={n === "1" ? "is-grande is-rojo" : n === "4" ? "is-rojo" : ""} style={{ left: `${x}%`, top: `${y}%` }} />
            ))}
          </span>
        ))}
      </span>
    </button>
  );
}
