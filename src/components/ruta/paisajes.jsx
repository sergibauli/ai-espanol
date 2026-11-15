import * as React from "react";

/*
  v22 · Paisaje propio de cada parada de la Ruta (90 lugares de china-stops.json).
  De cada lugar sale un tipo de paisaje con su color de laca, su tinta de sello y su pictograma (SVG propio, 64×64,
  todo en `currentColor`, así sirve igual para el estandarte, el terreno del camino y el sello del pasaporte).
*/

export const PAISAJES = {
  palacio: { es: "Palacio", zh: "宫殿", c: "#d4253a", d: "#7d0a1d", suelo: "#e9c9a0", tinta: "#b0142c" },
  templo: { es: "Templo", zh: "寺庙", c: "#e08a1e", d: "#8a3f0c", suelo: "#f0d7a8", tinta: "#a34a0a" },
  monumento: { es: "Monumento", zh: "名胜", c: "#4f7f8f", d: "#1f3f4f", suelo: "#d6e2dc", tinta: "#22506a" },
  montana: { es: "Montaña", zh: "名山", c: "#4a7fb8", d: "#1d3a66", suelo: "#d5e3ef", tinta: "#1f4e9c" },
  agua: { es: "Agua", zh: "湖河", c: "#1f9aa6", d: "#0b4f5c", suelo: "#cfeae6", tinta: "#0f6b7a" },
  puente: { es: "Puente", zh: "桥", c: "#2d8f7b", d: "#11493d", suelo: "#d3eadf", tinta: "#16614f" },
  ciudad: { es: "Ciudad", zh: "都市", c: "#5b54c9", d: "#25205e", suelo: "#dcdaf2", tinta: "#3a2f9a" },
  desierto: { es: "Desierto", zh: "沙漠", c: "#d0913a", d: "#7a4614", suelo: "#f3dfb6", tinta: "#8a4a12" },
  jardin: { es: "Jardín", zh: "园林", c: "#d6457e", d: "#7a1442", suelo: "#f5dbe4", tinta: "#a3175a" },
  mercado: { es: "Calle antigua", zh: "老街", c: "#e2462b", d: "#861b0c", suelo: "#f3d2b8", tinta: "#b3240f" },
  pradera: { es: "Pradera", zh: "草原", c: "#6f9e2f", d: "#33520f", suelo: "#e1ecc4", tinta: "#3f6a12" },
  muralla: { es: "Muralla", zh: "城墙", c: "#a0683a", d: "#4f2c12", suelo: "#ecd6b8", tinta: "#6b3510" },
  buda: { es: "Buda", zh: "大佛", c: "#c9962a", d: "#6b4a0c", suelo: "#f2e2b4", tinta: "#7a5208" },
  panda: { es: "Pandas", zh: "熊猫", c: "#3f9a5a", d: "#164a28", suelo: "#d8ecd2", tinta: "#1d5a32" },
  te: { es: "Té", zh: "茶园", c: "#4f9a3a", d: "#1f4f14", suelo: "#dcefcc", tinta: "#2b6a1a" },
  terrazas: { es: "Terrazas", zh: "梯田", c: "#8aa83a", d: "#3f5512", suelo: "#e8efc4", tinta: "#4a6512" },
};

const POR_EMOJI = {
  "🏯": "palacio", "🐉": "palacio",
  "🛕": "templo", "⛩️": "templo", "☯️": "templo", "⛪": "templo",
  "🏛️": "monumento",
  "⛰️": "montana", "🏔️": "montana", "🗻": "montana", "🌄": "montana", "🏞️": "montana", "🌫️": "montana",
  "🌊": "agua", "🚣": "agua", "🌕": "agua",
  "🌉": "puente",
  "🏙️": "ciudad", "📱": "ciudad", "📊": "ciudad",
  "🐫": "desierto", "🏜️": "desierto",
  "🌸": "jardin", "🎋": "jardin", "🍡": "jardin",
  "🏮": "mercado", "🎎": "mercado", "🍜": "mercado", "🧺": "mercado", "🌶️": "mercado", "🏘️": "mercado", "🎐": "mercado",
  "🌾": "pradera",
  "🐼": "panda", "🍵": "te",
};

/** Tipo de paisaje de una parada (objeto de china-stops.json) */
export function tipoPaisaje(parada) {
  const lugar = parada?.lugar || "";
  if (/Buda/.test(lugar)) return "buda";
  if (/Terrazas/.test(lugar)) return "terrazas";
  if (/Muralla|Fuerte|Amurallada|Jiaohe|Fuerte de Piedra/.test(lugar)) return "muralla";
  if (/Panda/.test(lugar)) return "panda";
  if (/Té/.test(lugar)) return "te";
  if (/Pradera/.test(lugar)) return "pradera";
  if (/Lago|Río|Bahía|Oasis/.test(lugar) && !/Puente/.test(lugar)) return "agua";
  return POR_EMOJI[parada?.emoji] || "templo";
}
export const paisajeDe = (parada) => ({ tipo: tipoPaisaje(parada), ...PAISAJES[tipoPaisaje(parada)] });

// ---------- Pictogramas (64×64, currentColor) ----------
const alero = (cx, y, w, h = 5) => `M${cx - w} ${y} Q${cx - w * 0.55} ${y - 1} ${cx} ${y - h} Q${cx + w * 0.55} ${y - 1} ${cx + w} ${y} L${cx + w - 3} ${y + 2.4} H${cx - w + 3}Z`;

const DIBUJOS = {
  palacio: (
    <>
      <path d={alero(32, 18, 22, 7)} />
      <rect x="17" y="20" width="30" height="5" />
      <path d={alero(32, 30, 28, 6)} />
      <g>{[14, 22, 30, 38, 46].map((x) => <rect key={x} x={x} y="32" width="3.4" height="15" />)}</g>
      <rect x="8" y="47" width="48" height="4" />
      <path d="M4 51 H60 L57 56 H7Z" />
      <path d="M26 56 H38 L40 60 H24Z" />
      <circle cx="32" cy="9" r="2.4" />
    </>
  ),
  templo: (
    <>
      <path d="M32 3 L33.6 11 H30.4Z" />
      {[0, 1, 2, 3].map((k) => (
        <g key={k}>
          <path d={alero(32, 15 + k * 11, 9 + k * 4, 5)} />
          <rect x={32 - (6 + k * 3)} y={17 + k * 11} width={(6 + k * 3) * 2} height="6.5" />
        </g>
      ))}
      <rect x="12" y="59" width="40" height="3" />
    </>
  ),
  monumento: (
    <>
      <path d={alero(32, 13, 26, 5)} />
      <rect x="10" y="15" width="44" height="4" />
      <path d={alero(32, 24, 18, 4)} />
      <rect x="14" y="19" width="5" height="40" />
      <rect x="45" y="19" width="5" height="40" />
      <rect x="27" y="26" width="10" height="7" rx="1" />
      <rect x="23" y="34" width="3.6" height="25" />
      <rect x="37.4" y="34" width="3.6" height="25" />
      <rect x="6" y="59" width="52" height="3" />
    </>
  ),
  montana: (
    <>
      <circle cx="49" cy="13" r="5" />
      <path d="M2 58 L20 22 L28 34 L38 14 L62 58Z" />
      <path d="M20 22 L15.5 31 L19 29 L21 33 L24 28Z M38 14 L33 24 L36.5 22 L39 27 L42 21Z" fill="#fff" fillOpacity=".85" />
      <path d="M4 61 H60" stroke="currentColor" strokeWidth="2.5" />
    </>
  ),
  agua: (
    <>
      <circle cx="46" cy="14" r="6" />
      <path d="M12 34 Q32 40 52 34 L48 41 H16Z" />
      <path d="M30 34 V18 L42 31Z" />
      <path d="M29 20 V33" stroke="currentColor" strokeWidth="1.6" />
      <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
        <path d="M4 48 Q11 44 18 48 T32 48 T46 48 T60 48" />
        <path d="M8 56 Q15 52 22 56 T36 56 T50 56" />
      </g>
    </>
  ),
  puente: (
    <>
      <path d="M2 34 H62 V38 H54 Q32 12 10 38 H2Z" />
      <path d="M10 38 Q32 16 54 38" fill="none" stroke="currentColor" strokeWidth="2" />
      {[16, 24, 32, 40, 48].map((x) => <rect key={x} x={x - 0.9} y="27" width="1.8" height="7" />)}
      <path d="M8 27 H56" stroke="currentColor" strokeWidth="1.8" />
      <g fill="none" stroke="currentColor" strokeWidth="2" opacity=".7" strokeLinecap="round">
        <path d="M14 46 Q32 58 50 46" strokeDasharray="4 4" />
        <path d="M4 56 Q12 52 20 56 T36 56 T52 56 T62 54" />
      </g>
    </>
  ),
  ciudad: (
    <>
      <rect x="31" y="3" width="2" height="12" />
      <circle cx="32" cy="18" r="5" />
      <rect x="30" y="22" width="4" height="12" />
      <circle cx="32" cy="36" r="7" />
      <path d="M26 42 L22 60 H26 L30 44Z M38 42 L42 60 H38 L34 44Z" />
      <rect x="4" y="38" width="9" height="22" />
      <rect x="14" y="30" width="7" height="30" />
      <rect x="45" y="26" width="7" height="34" />
      <rect x="53" y="40" width="8" height="20" />
      <rect x="2" y="59" width="60" height="3" />
    </>
  ),
  desierto: (
    <>
      <circle cx="48" cy="13" r="6" />
      <path d="M2 60 Q18 44 34 52 T62 46 V62 H2Z" />
      <path d="M13 40 Q15 30 20 33 Q23 26 27 33 Q30 34 32 32 Q34 24 39 27 L42 29 L40 31 L37 30 Q35 36 33 40 L33 48 H31 L30 41 L22 41 L21 48 H19 L18 41 Q14 41 13 40Z" />
    </>
  ),
  jardin: (
    <>
      <path d="M6 58 Q22 44 30 30 T52 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M22 44 Q14 40 10 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {[[34, 26, 9], [48, 12, 6], [12, 30, 5]].map(([x, y, r]) => (
        <g key={x} transform={`translate(${x} ${y})`}>
          {[0, 72, 144, 216, 288].map((a) => <circle key={a} cx={Math.cos((a * Math.PI) / 180) * r * 0.62} cy={Math.sin((a * Math.PI) / 180) * r * 0.62} r={r * 0.5} />)}
          <circle r={r * 0.28} fill="#fff" fillOpacity=".85" />
        </g>
      ))}
    </>
  ),
  mercado: (
    <>
      <path d="M32 2 V8" stroke="currentColor" strokeWidth="2" />
      <rect x="24" y="8" width="16" height="4" rx="1" />
      <ellipse cx="32" cy="29" rx="17" ry="16" />
      <path d="M32 13 V45 M24 15 Q19 29 24 43 M40 15 Q45 29 40 43" fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="1.4" />
      <rect x="24" y="44" width="16" height="4" rx="1" />
      <path d="M28 48 H36 L35 60 H29Z" />
      <text x="32" y="34" textAnchor="middle" fontSize="13" fontFamily="STKaiti, KaiTi, serif" fill="#fff" fillOpacity=".9">福</text>
    </>
  ),
  pradera: (
    <>
      <circle cx="48" cy="12" r="5" />
      <path d="M14 44 Q14 30 32 26 Q50 30 50 44Z" />
      <path d="M24 30 Q32 18 40 30" />
      <rect x="28" y="36" width="8" height="8" fill="#fff" fillOpacity=".8" />
      <path d="M2 50 Q32 42 62 50 V54 H2Z" />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">{[6, 14, 22, 42, 50, 58].map((x) => <path key={x} d={`M${x} 60 L${x - 2} 55 M${x} 60 L${x + 2} 54 M${x} 60 V53`} />)}</g>
    </>
  ),
  muralla: (
    <>
      <path d="M2 60 L2 44 Q16 40 24 30 L40 22 Q50 18 62 20 V60Z" />
      <g>{[[4, 40], [10, 38], [16, 35], [22, 30], [30, 26], [36, 23], [44, 20], [52, 19], [58, 19]].map(([x, y]) => <rect key={x} x={x} y={y - 4} width="3.4" height="4" />)}</g>
      <rect x="38" y="8" width="12" height="13" />
      <path d={alero(44, 8, 10, 4)} />
      <rect x="42" y="13" width="4" height="5" fill="#fff" fillOpacity=".8" />
    </>
  ),
  buda: (
    <>
      <circle cx="32" cy="26" r="21" fill="none" stroke="currentColor" strokeWidth="2" opacity=".6" />
      <circle cx="32" cy="18" r="7" />
      <circle cx="32" cy="10" r="3" />
      <path d="M18 54 Q17 34 32 28 Q47 34 46 54Z" />
      <path d="M10 54 Q32 46 54 54 L52 60 H12Z" />
      <circle cx="32" cy="44" r="4" fill="#fff" fillOpacity=".7" />
    </>
  ),
  panda: (
    <>
      <circle cx="16" cy="16" r="7" />
      <circle cx="48" cy="16" r="7" />
      <circle cx="32" cy="34" r="22" fill="none" stroke="currentColor" strokeWidth="3" />
      <ellipse cx="23" cy="32" rx="5.5" ry="7" transform="rotate(25 23 32)" />
      <ellipse cx="41" cy="32" rx="5.5" ry="7" transform="rotate(-25 41 32)" />
      <ellipse cx="32" cy="43" rx="4" ry="3" />
      <path d="M50 52 Q58 40 54 24" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M54 30 L61 26 M53 38 L60 37" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </>
  ),
  te: (
    <>
      <path d="M10 30 H42 Q42 52 26 52 Q10 52 10 30Z" />
      <path d="M42 34 Q52 34 50 42 Q48 46 41 45" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M6 56 H46" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 24 Q16 18 20 12 M28 24 Q24 18 28 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".7" />
      <path d="M44 22 Q54 4 62 8 Q58 22 44 22Z" />
      <path d="M46 20 Q52 12 58 10" stroke="#fff" strokeOpacity=".7" strokeWidth="1.2" fill="none" />
    </>
  ),
  terrazas: (
    <>
      <circle cx="50" cy="12" r="5" />
      <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
        {[0, 1, 2, 3, 4].map((k) => <path key={k} d={`M${2 + k * 3} ${58 - k * 9} Q${24} ${50 - k * 9} ${34 + k * 2} ${54 - k * 10} T${62} ${46 - k * 10}`} />)}
      </g>
    </>
  ),
};

/** Pictograma del paisaje (tipo de PAISAJES), monocromo en currentColor */
export function Pictograma({ tipo, tamano = 40, className, style }) {
  return (
    <svg viewBox="0 0 64 64" width={tamano} height={tamano} className={className} style={style} fill="currentColor" aria-hidden="true" focusable="false">
      {DIBUJOS[tipo] || DIBUJOS.templo}
    </svg>
  );
}

/** Banda de paisaje pintada para el estandarte de la unidad: cielo, sol, montes y el monumento en oro */
export function PaisajeBanda({ tipo, semilla = 0 }) {
  const p = PAISAJES[tipo] || PAISAJES.templo;
  const id = `pb-${tipo}-${semilla}`;
  const desfase = (semilla * 53) % 120;
  return (
    <svg className="ru-banda" viewBox="0 0 600 130" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}c`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.d} />
          <stop offset=".65" stopColor={p.c} />
          <stop offset="1" stopColor="#ffd98a" />
        </linearGradient>
        <radialGradient id={`${id}s`} cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#fffbe6" />
          <stop offset=".45" stopColor="#ffe08a" stopOpacity=".9" />
          <stop offset="1" stopColor="#ffb347" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}o`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffbe6" />
          <stop offset=".5" stopColor="#f6d77e" />
          <stop offset="1" stopColor="#b8862a" />
        </linearGradient>
      </defs>
      <rect width="600" height="130" fill={`url(#${id}c)`} />
      <circle className="ru-sol" cx={322 + desfase / 4} cy="48" r="58" fill={`url(#${id}s)`} />
      <g className="ru-nubes" fill="#fff" opacity=".35">
        <ellipse cx={300 + desfase} cy="30" rx="44" ry="7" />
        <ellipse cx={180 + desfase} cy="52" rx="30" ry="5" />
      </g>
      <path d={`M0 130 V96 Q${60 + desfase} 62 140 88 T300 78 T${430 + desfase / 4} 70 T600 84 V130Z`} fill={p.d} opacity=".45" />
      <path d={`M0 130 V108 Q90 92 190 106 T380 100 T600 104 V130Z`} fill={p.d} opacity=".75" />
      <g className="ru-monumento" transform="translate(262 4) scale(1.9)" fill={`url(#${id}o)`} stroke="#5e3a10" strokeWidth=".8" strokeOpacity=".55" style={{ filter: "drop-shadow(0 0 6px rgba(255,214,120,.7))" }}>
        {DIBUJOS[tipo] || DIBUJOS.templo}
      </g>
    </svg>
  );
}
