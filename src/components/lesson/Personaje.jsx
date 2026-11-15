import * as React from "react";

// Personajes ilustrados (SVG propio, sin emojis) para el escenario de diálogos.
// Se generan a partir del nombre: género, edad, peinado, piel, color de túnica y barba.
// Miran hacia la derecha; el escenario los voltea con CSS cuando están a la derecha.

const PIELES = ["#f6d7b8", "#efc9a2", "#e6b98e", "#d9a679", "#f3cfae"];
const PELOS = ["#1d1418", "#2b1a14", "#3a2416", "#5a2f1c", "#7a3a1e"];
const TUNICAS = [
  ["#b3122e", "#f2c14e", "#1f5a4a"],
  ["#1d6b58", "#f2c14e", "#b3122e"],
  ["#2c3a8e", "#f2c14e", "#c8102e"],
  ["#7a1f6a", "#f2c14e", "#1d6b58"],
  ["#c0601a", "#fff0c0", "#2c3a8e"],
  ["#13607a", "#f2c14e", "#b3122e"],
];

const MAYOR = /^(abuel|señor|sr\.|don |doña|anciano|director|jef|profesor|doctor|médico|madre|padre)/i;
const NINO = /^(niñ|hij|chico|chica|alumn|estudiante|hermano peque)/i;

function hash(s) {
  let h = 2166136261;
  for (const ch of String(s)) h = Math.imul(h ^ ch.codePointAt(0), 16777619) >>> 0;
  return h;
}

/** Rasgos estables de un personaje según su nombre (y su voz, que ya marca el género). */
export const NUM_TUNICAS = TUNICAS.length;
export const tunicaN = (i) => TUNICAS[i % TUNICAS.length];

export function rasgos(nombre, mujer, indice = 0) {
  const h = hash(nombre);
  const edad = /^abuel|ancian/i.test(nombre) ? "anciano" : MAYOR.test(nombre) ? "adulto" : NINO.test(nombre) ? "nino" : "joven";
  const pelo = edad === "anciano" ? "#cfc8c0" : edad === "adulto" && h % 3 === 0 ? "#6b5e58" : PELOS[h % PELOS.length];
  const peinado = mujer ? ["mono", "melena", "coletas", "mono"][(h >>> 3) % 4] : ["corto", "recogido", "corto", "flequillo"][(h >>> 3) % 4];
  return {
    mujer,
    edad,
    piel: PIELES[(h >>> 5) % PIELES.length],
    pelo,
    peinado: edad === "anciano" ? (mujer ? "mono" : "calvo") : edad === "nino" && mujer ? "coletas" : peinado,
    barba: !mujer && edad !== "nino" && ((h >>> 7) % 3 === 0 || edad === "anciano"),
    gafas: (h >>> 9) % 5 === 0 || (edad === "adulto" && (h >>> 9) % 2 === 0),
    tunica: TUNICAS[(h + indice) % TUNICAS.length],
  };
}

function Pelo({ r, capa }) {
  const c = r.pelo;
  if (capa === "detras") {
    if (r.peinado === "melena") return <path d="M60 64 Q58 20 100 18 Q142 20 140 64 L146 150 Q122 162 100 150 Q78 162 54 150Z" fill={c} />;
    if (r.peinado === "coletas")
      return (
        <g fill={c}>
          <path d="M62 70 Q46 92 52 128 Q58 140 66 126 Q64 100 72 80Z" />
          <path d="M138 70 Q154 92 148 128 Q142 140 134 126 Q136 100 128 80Z" />
          <circle cx="66" cy="74" r="6" fill="#c8102e" />
          <circle cx="134" cy="74" r="6" fill="#c8102e" />
        </g>
      );
    return null;
  }
  // Delante: casquete y flequillo
  const brillo = r.peinado !== "calvo" && <path d="M78 42 Q94 34 112 38" stroke="#fff" strokeOpacity=".28" strokeWidth="4" strokeLinecap="round" fill="none" />;
  return (
    <g className="o-hair">
      <PeloDelante r={r} c={c} />
      {brillo}
    </g>
  );
}

function PeloDelante({ r, c }) {
  switch (r.peinado) {
    case "mono":
      return (
        <g>
          <circle cx="100" cy="22" r="17" fill={c} />
          <path d="M80 18 L124 30" stroke="#f2c14e" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="124" cy="30" r="4.5" fill="#c8102e" stroke="#f2c14e" strokeWidth="1.5" />
          <path d="M64 70 Q60 30 100 30 Q140 30 136 70 Q130 50 112 46 Q96 56 74 52 Q66 58 64 70Z" fill={c} />
        </g>
      );
    case "melena":
      return <path d="M62 74 Q58 28 100 28 Q142 28 138 74 Q132 50 118 44 Q108 58 84 54 Q70 58 62 74Z" fill={c} />;
    case "coletas":
      return <path d="M64 70 Q60 30 100 30 Q140 30 136 70 Q126 48 100 52 Q88 46 74 54 Q66 60 64 70Z" fill={c} />;
    case "recogido":
      return (
        <g>
          <circle cx="100" cy="24" r="11" fill={c} />
          <rect x="88" y="27" width="24" height="6" rx="2" fill="#f2c14e" />
          <path d="M64 66 Q62 30 100 30 Q138 30 136 66 Q128 46 100 44 Q74 46 64 66Z" fill={c} />
        </g>
      );
    case "flequillo":
      return <path d="M63 70 Q58 26 100 26 Q144 26 137 66 Q120 58 112 46 Q100 60 80 56 Q70 60 63 70Z" fill={c} />;
    case "calvo":
      return <path d="M64 70 Q62 58 68 52 Q66 66 70 74Z M136 70 Q138 58 132 52 Q134 66 130 74Z" fill={c} />;
    default:
      return <path d="M64 68 Q60 28 100 28 Q140 28 136 68 Q130 50 118 46 Q100 52 82 46 Q68 50 64 68Z" fill={c} />;
  }
}

function Cara({ r }) {
  const ojo = r.edad === "nino" ? 5.6 : 4.6;
  return (
    <g>
      {/* cejas */}
      <g className="pj-cejas" stroke={r.edad === "anciano" ? "#9a9088" : r.pelo} strokeWidth="3" strokeLinecap="round" fill="none">
        <path d={`M80 ${r.mujer ? 60 : 61} Q87 56 94 59`} />
        <path d={`M108 59 Q116 56 123 ${r.mujer ? 60 : 61}`} />
      </g>
      {/* ojos */}
      <g className="pj-ojos">
        {[88, 116].map((x) => (
          <g key={x}>
            <ellipse cx={x} cy="72" rx={ojo * 1.15} ry={ojo * 1.4} fill="#fffaf0" />
            <ellipse cx={x + 1.2} cy="72.5" rx={ojo * 0.95} ry={ojo * 1.2} fill="#5a3218" />
            <ellipse cx={x + 1.2} cy="73" rx={ojo * 0.55} ry={ojo * 0.7} fill="#1a0f10" />
            <circle cx={x + 3} cy="69.6" r="2.2" fill="#fff" />
            <circle cx={x - 0.6} cy="75.5" r="1" fill="#fff" opacity=".8" />
            <path d={`M${x - ojo * 1.25} ${71 - ojo * 0.6} Q${x} ${71 - ojo * 1.9} ${x + ojo * 1.25} ${71 - ojo * 0.6}`} stroke="#1a0f10" strokeWidth={r.mujer ? 2.6 : 2} fill="none" strokeLinecap="round" />
          </g>
        ))}
        {r.mujer && <path d="M80.5 66.5 L77 63.5 M123.5 66.5 L127 63.5" stroke="#1a0f10" strokeWidth="2" strokeLinecap="round" />}
      </g>
      {r.gafas && (
        <g stroke="#3b2416" strokeWidth="2.2" fill="rgba(255,255,255,.12)">
          <circle cx="88" cy="71" r="10" />
          <circle cx="116" cy="71" r="10" />
          <path d="M98 70 Q102 67 106 70" fill="none" />
        </g>
      )}
      {r.edad === "anciano" && <path d="M78 82 q4 3 8 0 M118 82 q4 3 8 0" stroke="#b98a6a" strokeWidth="1.4" fill="none" />}
      {/* nariz y mejillas */}
      <path d="M104 80 Q107 87 102 88" stroke="#b77d5a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="79" cy="88" rx="7.5" ry="4.5" fill="#f07a7a" opacity=".42" />
      <ellipse cx="125" cy="88" rx="7.5" ry="4.5" fill="#f07a7a" opacity=".42" />
      {/* boca: cerrada (sonrisa) y abierta; .talk alterna entre ambas */}
      <path className="pj-boca-c" d="M92 95 Q101 102 110 95" stroke="#8a2a2a" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <g className="pj-boca-a">
        <path d="M91 94 Q101 93 111 94 Q109 106 101 107 Q93 106 91 94Z" fill="#7a1a24" />
        <path d="M95 103 Q101 99 107 103 Q104 107 101 107 Q97 107 95 103Z" fill="#e0606a" />
        <path d="M92 94.5 Q101 95.5 110 94.5 L109 97 Q101 98 93 97Z" fill="#fff" />
      </g>
      {r.barba && <path d="M70 84 Q72 118 101 122 Q130 118 132 84 Q128 104 116 104 Q101 112 86 104 Q74 104 70 84Z" fill={r.edad === "anciano" ? "#e4ded6" : r.pelo} />}
      {r.barba && <path d="M90 92 Q101 88 112 92" stroke={r.edad === "anciano" ? "#e4ded6" : r.pelo} strokeWidth="4" strokeLinecap="round" fill="none" />}
    </g>
  );
}

/** Personaje de cuerpo entero (viewBox 200×380). */
export function Personaje({ r, className = "" }) {
  const [robe, borde, faja] = r.tunica;
  const escala = r.edad === "nino" ? 0.86 : 1;
  return (
    <svg className={`pj ${className}`} viewBox="0 -34 200 414" aria-hidden="true">
      <defs>
        <pattern id={`pjDm${robe.slice(1)}`} width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M11 4 q4 4 0 7 q-4 -3 0 -7z M4 15 q3 2 0 4 M18 15 q-3 2 0 4" stroke={borde} strokeWidth="1.1" fill="none" opacity=".28" />
        </pattern>
        <linearGradient id={`pjSh${robe.slice(1)}`} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".32" />
          <stop offset=".42" stopColor="#fff" stopOpacity=".1" />
          <stop offset=".6" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".38" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="368" rx="64" ry="9" fill="#000" opacity=".35" />
      <g transform={`translate(100 372) scale(${escala}) translate(-100 -372)`}>
        {/* Brazo de atrás */}
        <g className="pj-brazo-b">
          <circle className="o" cx="58" cy="250" r="8.5" fill={r.piel} />
          <path className="o" d="M60 134 Q40 170 38 240 Q56 250 78 240 Q72 186 80 150Z" fill={robe} />
          <path d="M60 134 Q40 170 38 240 Q56 250 78 240 Q72 186 80 150Z" fill="#000" opacity=".22" />
          <path d="M38 240 Q56 250 78 240 L77 232 Q56 241 39 232Z" fill={borde} />
        </g>
        {/* Túnica */}
        <path className="o" d="M64 128 Q100 116 136 128 L150 200 L166 352 Q100 366 34 352 L50 200Z" fill={robe} />
        <path d="M64 128 Q100 116 136 128 L150 200 L166 352 Q100 366 34 352 L50 200Z" fill={`url(#pjDm${robe.slice(1)})`} />
        <path d="M64 128 Q100 116 136 128 L150 200 L166 352 Q100 366 34 352 L50 200Z" fill={`url(#pjSh${robe.slice(1)})`} />
        <path d="M36 338 Q100 352 164 338 L166 352 Q100 366 34 352Z" fill={borde} />
        <path d="M40 330 Q100 343 160 330" stroke={borde} strokeWidth="1.6" fill="none" opacity=".8" />
        <g stroke={faja} strokeWidth="1.8" fill="none" opacity=".9">
          {[52, 76, 100, 124, 148].map((x) => (
            <path key={x} d={`M${x - 8} ${347 + (x === 100 ? 2 : 0)} q4 -7 8 -2 q-4 3 -1 5 q5 -1 9 -4`} />
          ))}
        </g>
        <path d="M100 200 L102 358" stroke="#000" strokeOpacity=".18" strokeWidth="2" />
        {/* Zapatos */}
        <path d="M74 356 q10 -6 22 0 v6 h-22z M106 356 q10 -6 22 0 v6 h-22z" fill="#1d1222" />
        {/* Cuello cruzado */}
        <path d="M86 122 L112 186" stroke="#f6efd8" strokeWidth="9" strokeLinecap="round" />
        <path d="M86 122 L112 186" stroke={borde} strokeWidth="3" strokeLinecap="round" transform="translate(4 0)" />
        <path d="M116 122 L98 168" stroke="#f6efd8" strokeWidth="9" strokeLinecap="round" />
        <path d="M116 122 L98 168" stroke={borde} strokeWidth="3" strokeLinecap="round" transform="translate(-4 0)" />
        {/* Faja */}
        <path d="M52 192 Q100 202 148 192 L150 214 Q100 224 50 214Z" fill={faja} />
        <path d="M52 192 Q100 202 148 192" stroke={borde} strokeWidth="2.5" fill="none" />
        <path d="M50 214 Q100 224 150 214" stroke={borde} strokeWidth="2.5" fill="none" />
        <circle cx="100" cy="210" r="6" fill={borde} />
        <path d="M100 216 l-6 34 M100 216 l5 30" stroke={borde} strokeWidth="3" strokeLinecap="round" />
        <circle cx="94" cy="252" r="3.5" fill="#c8102e" />
        {/* Cuello y cabeza */}
        <rect x="90" y="104" width="22" height="22" rx="6" fill={r.piel} />
        <rect x="90" y="104" width="22" height="10" fill="#000" opacity=".1" />
        <g className="pj-cabeza">
          <g transform="translate(101 116) scale(1.24) translate(-101 -116)">
          <Pelo r={r} capa="detras" />
          <ellipse cx="64" cy="76" rx="6" ry="9" fill={r.piel} />
          <ellipse cx="138" cy="76" rx="6" ry="9" fill={r.piel} />
          {r.mujer && <circle cx="64" cy="88" r="3" fill="#f2c14e" />}
          <path className="o" d="M64 66 Q64 30 101 30 Q138 30 138 66 Q138 112 101 116 Q64 112 64 66Z" fill={r.piel} />
          <Cara r={r} />
          <Pelo r={r} capa="delante" />
          </g>
        </g>
        {/* Brazo de delante: gesticula al hablar */}
        <g className="pj-brazo">
          <circle className="o" cx="142" cy="250" r="8.5" fill={r.piel} />
          <path className="o" d="M138 132 Q162 168 162 240 Q144 250 122 240 Q128 186 120 150Z" fill={robe} />
          <path d="M138 132 Q162 168 162 240 Q144 250 122 240 Q128 186 120 150Z" fill={`url(#pjDm${robe.slice(1)})`} />
          <path d="M138 132 Q162 168 162 240 Q144 250 122 240 Q128 186 120 150Z" fill={`url(#pjSh${robe.slice(1)})`} />
          <path d="M162 240 Q144 250 122 240 L123 232 Q144 241 161 232Z" fill={borde} />
        </g>
      </g>
    </svg>
  );
}

/** Solo la cabeza (para el guion). */
export function CabezaPersonaje({ r }) {
  return (
    <svg className="pj pj-cabeza-sola" viewBox="52 6 98 116" aria-hidden="true">
      <Pelo r={r} capa="detras" />
      <ellipse cx="64" cy="76" rx="6" ry="9" fill={r.piel} />
      <ellipse cx="138" cy="76" rx="6" ry="9" fill={r.piel} />
      <path d="M64 66 Q64 30 101 30 Q138 30 138 66 Q138 112 101 116 Q64 112 64 66Z" fill={r.piel} />
      <Cara r={r} />
      <Pelo r={r} capa="delante" />
    </svg>
  );
}
