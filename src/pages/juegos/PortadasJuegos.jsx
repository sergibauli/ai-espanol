// Portadas ilustradas del Pabellón de juegos: una escena SVG distinta por juego.
// Todas las animaciones son CSS (transform/opacity) y están en styles/juegos-hub.css (.jh-p-*).
import * as React from "react";

const ROJO = "#c8102e";
const ORO = "#f2c14e";
const JADE = "#2f8f52";
const AZUL = "#1d3768";
const CREMA = "#fff4dc";
const TINTA = "#3b2416";

// Nubecitas doradas de fondo (comunes a todas las escenas)
const Nubes = ({ op = 0.18 }) => (
  <g opacity={op} fill="none" stroke={ORO} strokeWidth="2" strokeLinecap="round">
    <path d="M14 34c6-8 16-8 20 0 4-6 12-6 15 1" />
    <path d="M262 150c6-8 16-8 20 0 4-6 12-6 15 1" />
  </g>
);

function Kahoot() {
  const resp = [
    [ROJO, "A"],
    [JADE, "B"],
    [AZUL, "C"],
    ["#c8961e", "D"],
  ];
  return (
    <>
      <Nubes />
      <g className="jh-p-anillo" style={{ transformOrigin: "160px 70px" }}>
        <circle cx="160" cy="70" r="46" fill="none" stroke="rgba(255,244,220,.18)" strokeWidth="8" />
        <circle cx="160" cy="70" r="46" fill="none" stroke={ORO} strokeWidth="8" strokeDasharray="210 80" strokeLinecap="round" />
      </g>
      <path className="jh-p-rayo" d="M167 36 141 76h17l-8 32 30-44h-18z" fill={ORO} stroke="#8a5a1e" strokeWidth="2" strokeLinejoin="round" />
      {resp.map(([c, l], i) => (
        <g key={l} className="jh-p-resp" style={{ "--d": `${i * 0.35}s` }}>
          <rect x={34 + i * 66} y="130" width="54" height="34" rx="7" fill={c} stroke={ORO} strokeWidth="1.5" />
          <text x={61 + i * 66} y="153" textAnchor="middle" fontSize="17" fontWeight="800" fill={CREMA}>
            {l}
          </text>
        </g>
      ))}
    </>
  );
}

function Ruleta() {
  const cols = [ROJO, ORO, JADE, CREMA, ROJO, ORO, AZUL, CREMA];
  const seg = (i) => {
    const a0 = (i / 8) * Math.PI * 2;
    const a1 = ((i + 1) / 8) * Math.PI * 2;
    const r = 64;
    return `M160 96 L${160 + r * Math.cos(a0)} ${96 + r * Math.sin(a0)} A${r} ${r} 0 0 1 ${160 + r * Math.cos(a1)} ${96 + r * Math.sin(a1)}Z`;
  };
  return (
    <>
      <Nubes />
      <circle cx="160" cy="96" r="72" fill="#5a0814" stroke={ORO} strokeWidth="4" />
      <g className="jh-p-rueda" style={{ transformOrigin: "160px 96px" }}>
        {cols.map((c, i) => (
          <path key={i} d={seg(i)} fill={c} stroke="#8a5a1e" strokeWidth="1" />
        ))}
        {["sí", "no", "yo", "tú", "pan", "sol", "mar", "luz"].map((w, i) => {
          const a = ((i + 0.5) / 8) * 360;
          return (
            <text key={w} x="160" y="50" textAnchor="middle" fontSize="11" fontWeight="800" fill={i % 4 === 3 || i % 4 === 1 ? TINTA : CREMA} transform={`rotate(${a + 90} 160 96)`}>
              {w}
            </text>
          );
        })}
      </g>
      <circle cx="160" cy="96" r="12" fill={ORO} stroke="#8a5a1e" strokeWidth="2" />
      <path d="M160 34 150 14h20z" fill={ORO} stroke="#8a5a1e" strokeWidth="2" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <circle key={i} className="jh-p-bombilla" style={{ "--d": `${i * 0.25}s` }} cx={160 + 72 * Math.cos((i / 6) * Math.PI * 2)} cy={96 + 72 * Math.sin((i / 6) * Math.PI * 2)} r="4" fill="#fff6c4" />
      ))}
    </>
  );
}

function Ahorcado() {
  const letras = ["H", "O", "L", "A"];
  return (
    <>
      <circle cx="262" cy="40" r="20" fill="#fff1b8" opacity=".9" />
      <circle cx="270" cy="34" r="17" fill={AZUL} />
      {[
        [40, 30],
        [90, 18],
        [210, 24],
        [130, 44],
      ].map(([x, y], i) => (
        <circle key={i} className="jh-p-estrella" style={{ "--d": `${i * 0.6}s` }} cx={x} cy={y} r="1.8" fill={CREMA} />
      ))}
      <g className="jh-p-linterna" style={{ transformOrigin: "70px 0px" }}>
        <line x1="70" y1="0" x2="70" y2="40" stroke={ORO} strokeWidth="2" />
        <rect x="64" y="38" width="12" height="5" fill={ORO} />
        <ellipse cx="70" cy="62" rx="20" ry="22" fill={ROJO} stroke={ORO} strokeWidth="2" />
        <text x="70" y="69" textAnchor="middle" fontSize="18" fill={ORO} fontFamily="STKaiti, KaiTi, serif">
          猜
        </text>
        <rect x="64" y="83" width="12" height="5" fill={ORO} />
        <line x1="70" y1="88" x2="70" y2="100" stroke={ORO} strokeWidth="2" />
      </g>
      {letras.map((l, i) => (
        <g key={i}>
          <rect x={112 + i * 46} y="104" width="36" height="44" rx="5" fill="rgba(255,244,220,.1)" stroke={ORO} strokeWidth="1.5" />
          <line x1={118 + i * 46} y1="140" x2={142 + i * 46} y2="140" stroke={ORO} strokeWidth="3" strokeLinecap="round" />
          <text className={i % 2 ? "jh-p-letra" : ""} style={{ "--d": `${i * 0.5}s` }} x={130 + i * 46} y="134" textAnchor="middle" fontSize="24" fontWeight="800" fill={CREMA}>
            {l}
          </text>
        </g>
      ))}
    </>
  );
}

function Sopa() {
  const filas = ["GATOPS", "RMESAL", "AZULIO", "NPERRO"];
  return (
    <>
      <rect x="62" y="20" width="196" height="142" rx="10" fill="rgba(255,244,220,.94)" stroke={ORO} strokeWidth="3" />
      <rect className="jh-p-trazo" style={{ transformOrigin: "84px 50px" }} x="74" y="38" width="138" height="24" rx="12" fill="rgba(200,16,46,.28)" stroke={ROJO} strokeWidth="2" />
      <rect className="jh-p-trazo is-b" style={{ transformOrigin: "84px 100px" }} x="74" y="88" width="104" height="24" rx="12" fill="rgba(47,143,82,.28)" stroke={JADE} strokeWidth="2" />
      {filas.map((f, r) =>
        f.split("").map((ch, c) => (
          <text key={`${r}-${c}`} x={92 + c * 28} y={56 + r * 28} textAnchor="middle" fontSize="18" fontWeight="800" fill={TINTA} fontFamily="ui-monospace, monospace">
            {ch}
          </text>
        )),
      )}
      <g className="jh-p-lupa" style={{ transformOrigin: "250px 130px" }}>
        <circle cx="246" cy="126" r="20" fill="rgba(255,255,255,.25)" stroke={ORO} strokeWidth="5" />
        <path d="m261 141 18 18" stroke={ORO} strokeWidth="8" strokeLinecap="round" />
      </g>
    </>
  );
}

function Scramble() {
  const t = ["L", "I", "B", "R", "O"];
  return (
    <>
      <Nubes />
      <text x="160" y="46" textAnchor="middle" fontSize="15" fontWeight="700" fill={ORO} letterSpacing="3">
        ? · 序 · ?
      </text>
      {t.map((l, i) => (
        <g key={l} className="jh-p-ficha" style={{ "--d": `${i * 0.18}s`, "--x": `${[2, -1, 1, -2, 0][i] * 46}px`, transformOrigin: `${74 + i * 43 + 18}px 110px` }}>
          <rect x={74 + i * 43} y="84" width="38" height="46" rx="6" fill={CREMA} stroke={ORO} strokeWidth="2.5" />
          <rect x={74 + i * 43} y="124" width="38" height="6" rx="2" fill="#c8961e" />
          <text x={93 + i * 43} y="117" textAnchor="middle" fontSize="24" fontWeight="800" fill={ROJO}>
            {l}
          </text>
        </g>
      ))}
      <path className="jh-p-flecha" d="M110 150c30 14 70 14 100 0" fill="none" stroke={ORO} strokeWidth="2.5" strokeDasharray="5 6" strokeLinecap="round" />
    </>
  );
}

function Memory() {
  const cartas = [
    ["perro", "狗"],
    ["sol", "太阳"],
    ["casa", "家"],
  ];
  return (
    <>
      <Nubes />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const x = 52 + (i % 3) * 76;
        const y = i < 3 ? 22 : 98;
        const [es, zh] = cartas[i % 3];
        const cara = i < 3 ? es : zh;
        return (
          <g key={i} className={`jh-p-carta${i === 1 || i === 4 ? " is-gira" : ""}`} style={{ transformOrigin: `${x + 30}px ${y + 32}px`, "--d": i === 4 ? "1.6s" : "0s" }}>
            <rect className="jh-p-carta__dorso" x={x} y={y} width="60" height="64" rx="8" fill={JADE} stroke={ORO} strokeWidth="2.5" />
            <text className="jh-p-carta__dorso" x={x + 30} y={y + 42} textAnchor="middle" fontSize="24" fill={ORO} fontFamily="STKaiti, KaiTi, serif">
              忆
            </text>
            <g className="jh-p-carta__cara">
              <rect x={x} y={y} width="60" height="64" rx="8" fill={CREMA} stroke={ORO} strokeWidth="2.5" />
              <text x={x + 30} y={y + 39} textAnchor="middle" fontSize={i < 3 ? 13 : 18} fontWeight="800" fill={i < 3 ? TINTA : ROJO}>
                {cara}
              </text>
            </g>
          </g>
        );
      })}
    </>
  );
}

function Apalabrados() {
  const bonus = { 3: ROJO, 9: JADE, 15: AZUL, 20: ROJO, 26: JADE };
  const fichas = [
    [8, "P"],
    [9, "A"],
    [10, "Z"],
    [3, "L"],
    [17, "U"],
  ];
  return (
    <>
      <rect x="44" y="18" width="232" height="148" rx="8" fill="#e9cf98" stroke={ORO} strokeWidth="3" />
      {Array.from({ length: 28 }, (_, i) => (
        <rect key={i} x={54 + (i % 7) * 31} y={28 + Math.floor(i / 7) * 33} width="28" height="30" rx="3" fill={bonus[i] || "rgba(138,90,30,.18)"} opacity={bonus[i] ? 0.75 : 1} />
      ))}
      {fichas.map(([i, l], k) => (
        <g key={i} className="jh-p-cae" style={{ "--d": `${k * 0.4}s` }}>
          <rect x={54 + (i % 7) * 31} y={28 + Math.floor(i / 7) * 33} width="28" height="30" rx="4" fill={CREMA} stroke="#8a5a1e" strokeWidth="1.5" />
          <text x={68 + (i % 7) * 31} y={50 + Math.floor(i / 7) * 33} textAnchor="middle" fontSize="17" fontWeight="800" fill={TINTA}>
            {l}
          </text>
        </g>
      ))}
    </>
  );
}

function Uno() {
  const cartas = [
    [ROJO, "7", -24],
    ["#c8961e", "+2", -8],
    [JADE, "3", 8],
    ["#2c4f8f", "↺", 24],
  ];
  return (
    <>
      <Nubes />
      {cartas.map(([c, n, a], i) => (
        <g key={i} className="jh-p-abanico" style={{ "--a": `${a}deg`, "--a2": `${a * 1.6}deg`, transformOrigin: "160px 196px" }}>
          <rect x="128" y="40" width="64" height="96" rx="9" fill={CREMA} />
          <rect x="133" y="45" width="54" height="86" rx="7" fill={c} />
          <ellipse cx="160" cy="88" rx="20" ry="30" fill={CREMA} transform="rotate(25 160 88)" />
          <text x="160" y="97" textAnchor="middle" fontSize="24" fontWeight="900" fill={c}>
            {n}
          </text>
          <text x="141" y="62" fontSize="12" fontWeight="900" fill={CREMA}>
            {n}
          </text>
        </g>
      ))}
    </>
  );
}

function MapaMental() {
  const ramas = [
    [70, 46, "comer"],
    [250, 44, "beber"],
    [62, 140, "fruta"],
    [256, 138, "pan"],
    [160, 22, "agua"],
  ];
  return (
    <>
      {ramas.map(([x, y], i) => (
        <path key={i} className="jh-p-rama" d={`M160 96 Q${(160 + x) / 2} ${y + 30} ${x} ${y}`} fill="none" stroke={ORO} strokeWidth="2.5" strokeDasharray="6 6" />
      ))}
      <g className="jh-p-nodo is-centro" style={{ transformOrigin: "160px 96px" }}>
        <circle cx="160" cy="96" r="30" fill={ROJO} stroke={ORO} strokeWidth="3" />
        <text x="160" y="93" textAnchor="middle" fontSize="12" fontWeight="800" fill={CREMA}>
          comida
        </text>
        <text x="160" y="109" textAnchor="middle" fontSize="11" fill={ORO}>
          食物
        </text>
      </g>
      {ramas.map(([x, y, w], i) => (
        <g key={w} className="jh-p-nodo" style={{ "--d": `${i * 0.3}s`, transformOrigin: `${x}px ${y}px` }}>
          <rect x={x - 30} y={y - 12} width="60" height="24" rx="12" fill={CREMA} stroke={ORO} strokeWidth="2" />
          <text x={x} y={y + 5} textAnchor="middle" fontSize="12" fontWeight="800" fill={TINTA}>
            {w}
          </text>
        </g>
      ))}
    </>
  );
}

function Teatro() {
  return (
    <>
      <path className="jh-p-foco" d="M160 0 90 170h140z" fill="rgba(255,241,184,.22)" />
      <rect x="0" y="152" width="320" height="28" fill="#5a2a12" />
      <rect x="0" y="150" width="320" height="4" fill={ORO} />
      <g className="jh-p-mascara" style={{ transformOrigin: "136px 96px" }}>
        <path d="M112 70c16-8 32-8 48 0 0 26-8 46-24 46s-24-20-24-46z" fill={CREMA} stroke={ORO} strokeWidth="2" />
        <path d="M122 86q5-4 10 0M140 86q5-4 10 0" stroke={TINTA} strokeWidth="2.5" fill="none" />
        <path d="M126 98q10 10 20 0" stroke={ROJO} strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      <g className="jh-p-mascara is-b" style={{ transformOrigin: "186px 100px" }}>
        <path d="M162 76c16-8 32-8 48 0 0 26-8 46-24 46s-24-20-24-46z" fill={ORO} stroke={CREMA} strokeWidth="2" />
        <path d="M172 92q5 4 10 0M190 92q5 4 10 0" stroke={TINTA} strokeWidth="2.5" fill="none" />
        <path d="M176 110q10-8 20 0" stroke={TINTA} strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      <g className="jh-p-telon is-izq">
        <path d="M0 0h120c-10 40-4 110 10 150H0z" fill={ROJO} />
        <path d="M24 0v150M54 0v150M84 0c-4 50 0 100 8 150" stroke="#8f0c21" strokeWidth="6" fill="none" opacity=".6" />
      </g>
      <g className="jh-p-telon is-der">
        <path d="M320 0H200c10 40 4 110-10 150h130z" fill={ROJO} />
        <path d="M296 0v150M266 0v150M236 0c4 50 0 100-8 150" stroke="#8f0c21" strokeWidth="6" fill="none" opacity=".6" />
      </g>
      <path d="M0 0h320v18c-20 8-40 8-53 0-20 8-40 8-53 0-20 8-40 8-54 0-20 8-40 8-53 0-20 8-40 8-53 0-20 8-40 8-54 0z" fill="#8f0c21" stroke={ORO} strokeWidth="2" />
    </>
  );
}

function DragonJade() {
  return (
    <>
      {[
        [30, 30],
        [80, 150],
        [140, 20],
        [220, 36],
        [290, 120],
        [300, 22],
        [190, 160],
      ].map(([x, y], i) => (
        <circle key={i} className="jh-p-estrella" style={{ "--d": `${i * 0.45}s` }} cx={x} cy={y} r="1.8" fill={CREMA} />
      ))}
      <image className="jh-p-dragon" href="./theme/dragon.webp" x="40" y="20" width="200" height="140" preserveAspectRatio="xMidYMid meet" style={{ transformOrigin: "140px 90px" }} />
      {[
        [256, 60, "agua"],
        [270, 120, "luz"],
        [214, 150, "sol"],
      ].map(([x, y, w], i) => (
        <g key={w} className="jh-p-perla" style={{ "--d": `${i * 0.5}s`, transformOrigin: `${x}px ${y}px` }}>
          <circle cx={x} cy={y} r="18" fill="rgba(141,224,170,.25)" />
          <circle cx={x} cy={y} r="13" fill="#bff0d0" stroke={ORO} strokeWidth="1.5" />
          <text x={x} y={y + 4} textAnchor="middle" fontSize="9" fontWeight="800" fill="#1d6339">
            {w}
          </text>
        </g>
      ))}
    </>
  );
}

function EscapePalacio() {
  return (
    <>
      <path d="M40 58 160 18l120 40z" fill={ROJO} stroke={ORO} strokeWidth="3" strokeLinejoin="round" />
      <path d="M30 60q130-14 260 0" stroke={ORO} strokeWidth="5" fill="none" strokeLinecap="round" />
      <rect x="60" y="60" width="200" height="110" fill="#8f0c21" />
      <rect className="jh-p-luz" x="110" y="76" width="100" height="94" fill="#fff1b8" />
      <g className="jh-p-puerta is-izq" style={{ transformOrigin: "110px 120px" }}>
        <rect x="110" y="76" width="50" height="94" fill={ROJO} stroke={ORO} strokeWidth="2" />
        {[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => <circle key={`${r}${c}`} cx={122 + c * 13} cy={90 + r * 20} r="3" fill={ORO} />))}
      </g>
      <g className="jh-p-puerta is-der" style={{ transformOrigin: "210px 120px" }}>
        <rect x="160" y="76" width="50" height="94" fill={ROJO} stroke={ORO} strokeWidth="2" />
        {[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => <circle key={`${r}${c}`} cx={172 + c * 13} cy={90 + r * 20} r="3" fill={ORO} />))}
      </g>
      <g className="jh-p-llave" style={{ transformOrigin: "272px 118px" }}>
        <circle cx="272" cy="100" r="11" fill="none" stroke={ORO} strokeWidth="5" />
        <path d="M272 111v36m0-10h9m-9 8h7" stroke={ORO} strokeWidth="5" strokeLinecap="round" />
      </g>
      <text x="38" y="128" fontSize="13" fontWeight="800" fill={ORO}>
        1/5
      </text>
    </>
  );
}

const ESCENAS = {
  kahoot: Kahoot,
  ruleta: Ruleta,
  ahorcado: Ahorcado,
  sopa: Sopa,
  scramble: Scramble,
  memory: Memory,
  apalabrados: Apalabrados,
  uno: Uno,
  "mapa-mental": MapaMental,
  teatro: Teatro,
  "dragon-jade": DragonJade,
  "escape-palacio": EscapePalacio,
};

export function Portada({ id, className = "" }) {
  const Escena = ESCENAS[id];
  return (
    <div className={`jh-poster jh-poster--${id} ${className}`} aria-hidden="true">
      {Escena && (
        <svg viewBox="0 0 320 180" preserveAspectRatio={className.includes("is-grande") ? "xMidYMid meet" : "xMidYMid slice"} focusable="false">
          <Escena />
        </svg>
      )}
    </div>
  );
}
