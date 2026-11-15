import * as React from "react";

/*
 * Iconos propios de los ejercicios (SVG dibujados aquí, sin emojis ni recursos ajenos).
 * Trazo de tinta con relleno de oro o laca; todos en una caja de 48×48 y heredan el tamaño por `size`.
 */
function Svg({ size = 28, children, className = "", ...rest }) {
  return (
    <svg className={`ej-ico ${className}`} width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false" {...rest}>
      {children}
    </svg>
  );
}

const TINTA = "#3b2416";
const ORO = "#f2c14e";
const LACA = "#c8102e";
const JADE = "#2f8f52";

/* Trazo de pincel de «acierto»: gancho grueso que adelgaza al final */
export function TrazoBien({ size = 40, color = "#fff7df" }) {
  return (
    <Svg size={size}>
      <path d="M9 25.5c3.2 1.6 6.4 4.6 9.3 8.8.6.9 1.9.9 2.4-.1C25 25 31.7 16.6 40.5 10.2c.6-.5 0-1.4-.7-1.1C30.6 13 23.4 20.6 19.4 28c-2.2-2.6-5-4.7-8.3-5.8-1.4-.4-2.3 2.6-2.1 3.3Z" fill={color} />
    </Svg>
  );
}

/* Aspa de pincel de «error» */
export function TrazoMal({ size = 40, color = "#fff7df" }) {
  return (
    <Svg size={size}>
      <path d="M11.2 9.6c-1-.7-2.3.5-1.6 1.5 4 5.3 8.2 9.6 11.4 12.6-4.1 4.3-8 8.7-10.6 13.2-.6 1 .7 2 1.6 1.3 4-3.4 8-7.4 12-11.3 4.3 3.9 9.4 8.4 13.5 11.6 1 .8 2.3-.5 1.5-1.5-3.3-4.3-7.6-8.9-11.8-13.2 3.8-3.9 7.5-8 10.3-11.6.7-.9-.4-2.1-1.4-1.4-3.9 2.8-8 6.4-11.9 10.1-4.5-4.2-9-8-13-11.3Z" fill={color} />
    </Svg>
  );
}

/* Balanza: verdadero o falso */
function Balanza(p) {
  return (
    <Svg {...p}>
      <path d="M24 7v32M14 41h20" stroke={TINTA} strokeWidth="3" strokeLinecap="round" />
      <path d="M9 14h30" stroke={TINTA} strokeWidth="3" strokeLinecap="round" />
      <circle cx="24" cy="7" r="3.2" fill={ORO} stroke={TINTA} strokeWidth="1.6" />
      <path d="M9 14 4 27h10L9 14ZM39 14l-5 13h10l-5-13Z" stroke={TINTA} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M3.5 27a5.5 4 0 0 0 11 0Z" fill={JADE} stroke={TINTA} strokeWidth="1.6" />
      <path d="M33.5 27a5.5 4 0 0 0 11 0Z" fill={LACA} stroke={TINTA} strokeWidth="1.6" />
    </Svg>
  );
}

/* Abanico plegable: elegir la respuesta */
function Abanico(p) {
  return (
    <Svg {...p}>
      <path d="M24 40 5 18a26 26 0 0 1 38 0L24 40Z" fill={LACA} stroke={TINTA} strokeWidth="2" strokeLinejoin="round" />
      <path d="M24 40 9 14.6M24 40l-8-28.8M24 40V10M24 40l8-28.8M24 40l15-25.4" stroke={ORO} strokeWidth="1.6" />
      <path d="M9.5 22.5a21 21 0 0 1 29 0" stroke={ORO} strokeWidth="1.6" strokeDasharray="2 2.4" />
      <circle cx="24" cy="40" r="3" fill={ORO} stroke={TINTA} strokeWidth="1.6" />
    </Svg>
  );
}

/* Gong con ondas: escuchar */
function Gong(p) {
  return (
    <Svg {...p}>
      <path d="M8 8h22M10 8v34M28 8v34" stroke={TINTA} strokeWidth="3" strokeLinecap="round" />
      <circle cx="19" cy="25" r="8.5" fill={ORO} stroke={TINTA} strokeWidth="2" />
      <circle cx="19" cy="25" r="3.2" fill="#c8961e" />
      <path d="M19 12v4.5" stroke={TINTA} strokeWidth="1.6" />
      <path d="M34 19a8 8 0 0 1 0 12M38.5 15a14 14 0 0 1 0 20" stroke={LACA} strokeWidth="2.6" strokeLinecap="round" />
    </Svg>
  );
}

/* Farolillo: elegir la imagen */
function Farol(p) {
  return (
    <Svg {...p}>
      <path d="M24 3v5M20 8h8M20 42h8M24 42v4" stroke={TINTA} strokeWidth="2.6" strokeLinecap="round" />
      <ellipse cx="24" cy="25" rx="14" ry="16" fill={LACA} stroke={TINTA} strokeWidth="2" />
      <path d="M24 9c-6 4-6 28 0 32M24 9c6 4 6 28 0 32" stroke={ORO} strokeWidth="1.6" />
      <path d="M12.5 17h23M12.5 33h23" stroke={ORO} strokeWidth="1.6" />
      <ellipse cx="24" cy="25" rx="5" ry="7" fill="#ffd77a" opacity=".55" />
    </Svg>
  );
}

/* Fichas apiladas: ordenar la frase */
function Fichas(p) {
  return (
    <Svg {...p}>
      <rect x="4" y="18" width="13" height="18" rx="2.5" fill="#fff8e6" stroke={TINTA} strokeWidth="2" />
      <rect x="17.5" y="12" width="13" height="18" rx="2.5" fill="#fff8e6" stroke={TINTA} strokeWidth="2" />
      <rect x="31" y="22" width="13" height="18" rx="2.5" fill="#fff8e6" stroke={TINTA} strokeWidth="2" />
      <path d="M4 32.5h13M17.5 26.5h13M31 36.5h13" stroke={JADE} strokeWidth="3" />
      <circle cx="10.5" cy="25" r="2.4" fill={LACA} />
      <path d="M21 17.5h6M21 21.5h6" stroke={JADE} strokeWidth="2" strokeLinecap="round" />
      <path d="M37.5 26v6M34.5 29h6" stroke={LACA} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

/* Pincel sobre tintero: escribir */
function Pincel(p) {
  return (
    <Svg {...p}>
      <ellipse cx="17" cy="38" rx="12" ry="5" fill={TINTA} />
      <ellipse cx="17" cy="37" rx="7" ry="2.4" fill="#5b3a24" />
      <path d="M41 5 23 27" stroke="#8a5a1e" strokeWidth="4.2" strokeLinecap="round" />
      <path d="M41 5 23 27" stroke={ORO} strokeWidth="1.4" strokeLinecap="round" strokeDasharray="3 4" />
      <path d="M23.5 26.5c-3 1.2-6.4 4.6-7 8.8 4-.3 7.6-3.2 9.4-6.5Z" fill={TINTA} />
      <path d="M22 27.5l3.4 2.6" stroke={LACA} strokeWidth="2.4" />
    </Svg>
  );
}

/* Dos fichas unidas por un cordón: emparejar */
function Parejas(p) {
  return (
    <Svg {...p}>
      <rect x="3" y="12" width="15" height="22" rx="3" fill="#fff8e6" stroke={TINTA} strokeWidth="2" transform="rotate(-8 10.5 23)" />
      <rect x="30" y="12" width="15" height="22" rx="3" fill="#fff8e6" stroke={TINTA} strokeWidth="2" transform="rotate(8 37.5 23)" />
      <path d="M17 22c4-5 10-5 14 0" stroke={LACA} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M17 26c4 5 10 5 14 0" stroke={ORO} strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="24" cy="24" r="3" fill={ORO} stroke={TINTA} strokeWidth="1.4" />
      <text x="10.5" y="27" textAnchor="middle" fontSize="11" fontWeight="800" fill={LACA} transform="rotate(-8 10.5 23)">A</text>
      <text x="37.5" y="28" textAnchor="middle" fontSize="11" fontWeight="800" fill={JADE} transform="rotate(8 37.5 23)">字</text>
    </Svg>
  );
}

/* Rollo abierto: palabra nueva */
function Rollo(p) {
  return (
    <Svg {...p}>
      <rect x="9" y="10" width="30" height="28" fill="#fff8e6" stroke={TINTA} strokeWidth="2" />
      <rect x="5" y="6" width="38" height="6" rx="3" fill={LACA} stroke={TINTA} strokeWidth="1.6" />
      <rect x="5" y="36" width="38" height="6" rx="3" fill={LACA} stroke={TINTA} strokeWidth="1.6" />
      <path d="M15 18h18M15 23.5h13M15 29h16" stroke={TINTA} strokeWidth="2" strokeLinecap="round" />
      <rect x="29" y="25" width="6" height="7" rx="1" fill={LACA} />
    </Svg>
  );
}

/* Campana con ondas: dilo en voz alta */
function Voz(p) {
  return (
    <Svg {...p}>
      <rect x="15" y="5" width="12" height="22" rx="6" fill={ORO} stroke={TINTA} strokeWidth="2" />
      <path d="M10 21a11 11 0 0 0 22 0M21 32v8M14 41h14" stroke={TINTA} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M36 12a10 10 0 0 1 0 14M40.5 8a16 16 0 0 1 0 22" stroke={LACA} strokeWidth="2.4" strokeLinecap="round" />
    </Svg>
  );
}

/* Lámpara de aceite: idea clave */
function Lampara(p) {
  return (
    <Svg {...p}>
      <path d="M24 6c3 4 4.5 7 4.5 9.5a4.5 4.5 0 0 1-9 0C19.5 13 21 10 24 6Z" fill="#ffb347" stroke={TINTA} strokeWidth="1.6" />
      <path d="M8 24h32c-1.5 8-8 13-16 13S9.5 32 8 24Z" fill={LACA} stroke={TINTA} strokeWidth="2" strokeLinejoin="round" />
      <path d="M17 37h14l2 5H15l2-5Z" fill={ORO} stroke={TINTA} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M24 20v4" stroke={TINTA} strokeWidth="2" />
      <path d="M13 28.5h22" stroke={ORO} strokeWidth="1.6" strokeDasharray="2 2.4" />
    </Svg>
  );
}

const POR_TIPO = { tf: Balanza, choice: Abanico, listen: Gong, pictures: Farol, build: Fichas, type: Pincel, match: Parejas, learn: Rollo, speak: Voz, tip: Lampara };

export function IconoTipo({ tipo, size = 30 }) {
  const C = POR_TIPO[tipo] || Abanico;
  return <C size={size} />;
}

/* Tecla de borrar del teclado español */
export function IcoBorrar({ size = 22 }) {
  return (
    <Svg size={size}>
      <path d="M17 10h23a3 3 0 0 1 3 3v22a3 3 0 0 1-3 3H17L5 24 17 10Z" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinejoin="round" />
      <path d="M22 18l12 12M34 18 22 30" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
    </Svg>
  );
}

/* Llama de racha (solo visual) */
export function IcoRacha({ size = 20 }) {
  return (
    <Svg size={size}>
      <path d="M25 4c2 7 11 11 11 22a12 12 0 0 1-24 0c0-6 3-9 5-11 0 4 2 6 4 6-1-6 1-12 4-17Z" fill="#ffb347" stroke="#8f0c21" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M24 26c2 2 5 4 5 8a5 5 0 0 1-10 0c0-2 1-3 2-4 .3 1.4 1 2 2 2 0-2.5 0-4 1-6Z" fill="#fff1b8" />
    </Svg>
  );
}
