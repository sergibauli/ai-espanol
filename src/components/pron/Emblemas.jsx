import * as React from "react";

// Emblemas de cada sala (cabecera de un sonido) y perfil de la boca (dónde se articula).
// SVG propios; las animaciones van en CSS (pronunciacion-sonido.css) con transform/opacity
// y se apagan con prefers-reduced-motion.

const Defs = ({ id }) => (
  <defs>
    <linearGradient id={`${id}-laca`} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#6e0818" />
      <stop offset=".28" stopColor="#d01b37" />
      <stop offset=".42" stopColor="#ef4a5f" />
      <stop offset=".62" stopColor="#b80f2b" />
      <stop offset="1" stopColor="#5a0614" />
    </linearGradient>
    <linearGradient id={`${id}-oro`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#fff1b8" />
      <stop offset=".45" stopColor="#f2c14e" />
      <stop offset="1" stopColor="#a8741a" />
    </linearGradient>
    <radialGradient id={`${id}-piel`} cx=".45" cy=".4" r=".7">
      <stop offset="0" stopColor="#fff6dc" />
      <stop offset=".7" stopColor="#efd7a4" />
      <stop offset="1" stopColor="#c9a464" />
    </radialGradient>
    <radialGradient id={`${id}-halo`}>
      <stop offset="0" stopColor="#ffd47a" stopOpacity=".75" />
      <stop offset="1" stopColor="#ffd47a" stopOpacity="0" />
    </radialGradient>
    <linearGradient id={`${id}-madera`} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#2a1208" />
      <stop offset=".5" stopColor="#6b3a1c" />
      <stop offset="1" stopColor="#2a1208" />
    </linearGradient>
  </defs>
);

// Arco delantero de una elipse (para aros y tachuelas)
const arco = (cx, cy, rx, ry) => `M${cx - rx} ${cy} A${rx} ${ry} 0 0 0 ${cx + rx} ${cy}`;
const tachuelas = (cx, cy, rx, ry, n) =>
  Array.from({ length: n }, (_, i) => {
    const t = (Math.PI * (i + 0.5)) / n;
    return [cx - Math.cos(t) * rx, cy + Math.sin(t) * ry];
  });

/* Tambor del trueno · 雷鼓 */
function Tambor({ id }) {
  return (
    <>
      <ellipse className="pe-sombra" cx="100" cy="160" rx="70" ry="8" />
      <g stroke={`url(#${id}-madera)`} strokeWidth="7" strokeLinecap="round">
        <path d="M52 112 L34 160" />
        <path d="M148 112 L166 160" />
        <path d="M70 120 L62 160" />
        <path d="M130 120 L138 160" />
      </g>
      <g className="pe-tambor__cuerpo">
        <path d="M36 60 Q28 90 36 120 A64 19 0 0 0 164 120 Q172 90 164 60 Z" fill={`url(#${id}-laca)`} stroke="#3d0610" strokeWidth="1.5" />
        <path d="M60 70 Q56 92 62 116" stroke="#ff9aa6" strokeWidth="5" strokeLinecap="round" fill="none" opacity=".35" />
        <path d={arco(100, 66, 64, 19)} stroke={`url(#${id}-oro)`} strokeWidth="4" fill="none" />
        <path d={arco(100, 114, 66, 19)} stroke={`url(#${id}-oro)`} strokeWidth="4" fill="none" />
        {tachuelas(100, 71, 62, 18, 11).map(([x, y], i) => (
          <circle key={`a${i}`} cx={x} cy={y} r="2.6" fill="#ffe7a0" stroke="#8a5a1e" strokeWidth=".8" />
        ))}
        {tachuelas(100, 108, 64, 18, 11).map(([x, y], i) => (
          <circle key={`b${i}`} cx={x} cy={y} r="2.6" fill="#ffe7a0" stroke="#8a5a1e" strokeWidth=".8" />
        ))}
        <g transform="translate(100 98)">
          <rect x="-11" y="-11" width="22" height="22" rx="4" fill="#f2c14e" stroke="#5e0614" strokeWidth="1.5" transform="rotate(45)" />
          <circle r="5" fill="#a3122a" />
        </g>
        <ellipse cx="100" cy="60" rx="64" ry="19" fill={`url(#${id}-piel)`} stroke="#c8961e" strokeWidth="3" />
        <ellipse cx="100" cy="60" rx="50" ry="14" fill="none" stroke="#a3122a" strokeWidth="1.2" opacity=".35" />
        <g className="pe-tambor__ondas">
          {[0, 1, 2].map((i) => (
            <ellipse key={i} style={{ "--i": i }} cx="100" cy="60" rx="40" ry="12" fill="none" stroke="#c8102e" strokeWidth="2" />
          ))}
        </g>
        <text x="100" y="60" transform="translate(0 60) scale(1 .5) translate(0 -60)" dy="2" textAnchor="middle" fontSize="40" fontWeight="900" fill="#a3122a" fontFamily="STKaiti, KaiTi, serif" opacity=".9">
          雷
        </text>
      </g>
      <g className="pe-tambor__palo is-izq">
        <path d="M30 14 L70 58" stroke="#7a3b16" strokeWidth="5" strokeLinecap="round" />
        <circle cx="70" cy="58" r="5.5" fill="#f2c14e" stroke="#7a3b16" strokeWidth="1.5" />
        <path d="M30 14 q-6 8 -2 20 M30 14 q-10 4 -14 14" stroke="#c8102e" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      <g className="pe-tambor__palo is-der">
        <path d="M170 14 L130 58" stroke="#7a3b16" strokeWidth="5" strokeLinecap="round" />
        <circle cx="130" cy="58" r="5.5" fill="#f2c14e" stroke="#7a3b16" strokeWidth="1.5" />
        <path d="M170 14 q6 8 2 20 M170 14 q10 4 14 14" stroke="#c8102e" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      <g className="pe-chispas" fill="#f2c14e">
        <path d="M16 70 l8 -10 l-2 8 l8 -2 l-10 12 l2 -8z" />
        <path d="M184 72 l-8 -10 l2 8 l-8 -2 l10 12 l-2 -8z" />
      </g>
    </>
  );
}

/* Puerta de los labios · 唇之门: abanico de laca */
function Abanico({ id }) {
  const varillas = Array.from({ length: 13 }, (_, i) => -72 + i * 12);
  return (
    <>
      <ellipse className="pe-sombra" cx="100" cy="160" rx="54" ry="7" />
      <g transform="translate(100 150) scale(.68)">
      <g className="pe-abanico">
        <path d="M-118 -60 A132 132 0 0 1 118 -60 L40 -20 A44 44 0 0 0 -40 -20 Z" transform="rotate(0)" fill={`url(#${id}-laca)`} stroke={`url(#${id}-oro)`} strokeWidth="3" />
        <path d="M-108 -56 A122 122 0 0 1 108 -56" fill="none" stroke="#f2c14e" strokeWidth="1.2" opacity=".7" />
        {varillas.map((a) => (
          <path key={a} d="M0 0 L0 -126" transform={`rotate(${a})`} stroke="#f2c14e" strokeWidth="1" opacity=".45" />
        ))}
        <g transform="translate(-30 -84)">
          <path d="M-30 18 Q0 6 26 -14 M0 8 Q12 -6 10 -20" stroke="#3b2416" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {[
            [-22, 14],
            [6, 0],
            [24, -14],
            [10, -20],
          ].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              {[0, 72, 144, 216, 288].map((r) => (
                <ellipse key={r} cy="-4.5" rx="3.6" ry="4.5" fill="#ffd0da" transform={`rotate(${r})`} />
              ))}
              <circle r="1.8" fill="#f2c14e" />
            </g>
          ))}
        </g>
        <text x="34" y="-70" fontSize="30" fontWeight="900" fill="#fff3d6" fontFamily="STKaiti, KaiTi, serif" opacity=".9">
          唇
        </text>
        <circle r="8" fill={`url(#${id}-oro)`} stroke="#5e0614" strokeWidth="2" />
        <path d="M0 8 q-4 12 0 22 q4 -10 0 -22" fill="#c8102e" />
      </g>
      </g>
      <g className="pe-petalos" fill="#ffc3d0">
        {[0, 1, 2, 3].map((i) => (
          <ellipse key={i} style={{ "--i": i }} cx={50 + i * 34} cy="30" rx="3.5" ry="5" />
        ))}
      </g>
    </>
  );
}

/* Pabellón de bambú · 竹之亭: flauta de bambú */
function Flauta({ id }) {
  return (
    <>
      <ellipse className="pe-sombra" cx="100" cy="160" rx="60" ry="7" />
      <g className="pe-bambu">
        {[
          [44, "#3d7a4a"],
          [160, "#2c5e37"],
        ].map(([x, c], i) => (
          <g key={x}>
            <rect x={x - 6} y="0" width="12" height="160" rx="5" fill={c} />
            {[30, 76, 122].map((y) => (
              <rect key={y} x={x - 8} y={y + i * 12} width="16" height="4" rx="2" fill="#1d4527" />
            ))}
            <path className="pe-hoja" d={`M${x} ${40 + i * 30} q${i ? -34 : 34} -14 ${i ? -66 : 66} 4 q${i ? 36 : -36} 12 ${i ? 66 : -66} -4z`} fill="#4f9a5c" />
          </g>
        ))}
      </g>
      <g transform="rotate(-18 100 92)">
      <g className="pe-flauta">
        <rect x="18" y="84" width="164" height="16" rx="8" fill="#d8b46a" stroke="#7a5a22" strokeWidth="1.5" />
        <rect x="18" y="84" width="164" height="5" rx="2.5" fill="#fff0c4" opacity=".6" />
        {[40, 120, 172].map((x) => (
          <rect key={x} x={x} y="83" width="5" height="18" fill="#a3122a" />
        ))}
        {[66, 82, 98, 114, 140, 154].map((x) => (
          <ellipse key={x} cx={x} cy="92" rx="3.4" ry="3" fill="#3b2416" />
        ))}
        <path d="M176 100 q4 18 -2 34 M178 100 q8 16 6 30" stroke="#c8102e" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      </g>
      <g className="pe-notas" fill="#14361d">
        {[0, 1, 2].map((i) => (
          <g key={i} style={{ "--i": i }} transform={`translate(${70 + i * 28} ${44 - i * 6})`}>
            <ellipse rx="5" ry="3.6" transform="rotate(-20)" />
            <rect x="3.5" y="-20" width="2" height="20" />
          </g>
        ))}
      </g>
    </>
  );
}

/* Campana de jade · 玉钟 */
function Campana({ id }) {
  return (
    <>
      <ellipse className="pe-sombra" cx="100" cy="160" rx="50" ry="7" />
      <rect x="22" y="8" width="156" height="12" rx="5" fill={`url(#${id}-laca)`} stroke="#f2c14e" strokeWidth="2" />
      <g className="pe-campana">
        <path d="M100 20 V36" stroke="#f2c14e" strokeWidth="3" />
        <path d="M58 136 Q56 62 100 40 Q144 62 142 136 Q150 144 158 148 H42 Q50 144 58 136Z" fill="#2f9a8f" stroke="#f2c14e" strokeWidth="3" />
        <path d="M70 130 Q68 70 100 50" stroke="#bfe7df" strokeWidth="4" fill="none" opacity=".45" strokeLinecap="round" />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => <circle key={`${r}${c}`} cx={82 + c * 18} cy={76 + r * 16} r="3.4" fill="#f2c14e" stroke="#0b3531" strokeWidth=".8" />),
        )}
        <rect x="64" y="122" width="72" height="6" rx="3" fill="#f2c14e" opacity=".85" />
        <circle cx="100" cy="158" r="7" fill={`url(#${id}-oro)`} />
      </g>
      <g className="pe-ecos" fill="none" stroke="#8fe0d4" strokeWidth="2.5">
        {[0, 1, 2].map((i) => (
          <circle key={i} style={{ "--i": i }} cx="100" cy="100" r="56" />
        ))}
      </g>
    </>
  );
}

/* Montaña de la garganta · 喉之山: gong con montañas pintadas */
function Gong({ id }) {
  return (
    <>
      <ellipse className="pe-sombra" cx="100" cy="160" rx="66" ry="7" />
      <g stroke={`url(#${id}-madera)`} strokeWidth="8" strokeLinecap="round" fill="none">
        <path d="M30 160 V26" />
        <path d="M170 160 V26" />
      </g>
      <path d="M20 26 Q100 6 180 26" stroke="#5e0614" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M20 26 Q100 6 180 26" stroke="#f2c14e" strokeWidth="2" fill="none" />
      <path d="M78 22 L84 44 M122 22 L116 44" stroke="#3b2416" strokeWidth="2" />
      <g className="pe-gong">
        <circle cx="100" cy="94" r="54" fill={`url(#${id}-oro)`} stroke="#7a5a22" strokeWidth="3" />
        <circle cx="100" cy="94" r="44" fill="none" stroke="#a8741a" strokeWidth="2" opacity=".7" />
        <circle cx="100" cy="94" r="16" fill="#e8b84a" stroke="#a8741a" strokeWidth="2" />
        <path d="M62 112 L80 88 L90 100 L106 76 L124 104 L134 94 L140 112 Z" fill="#34406b" opacity=".8" />
        <path d="M106 76 l-6 8 l4 -1 l2 4 l3 -5 l4 2z" fill="#f6e7c8" />
        <path d="M66 70 Q76 52 96 46" stroke="#fff6d0" strokeWidth="4" strokeLinecap="round" fill="none" opacity=".55" />
      </g>
      <g className="pe-gong__mazo">
        <path d="M188 150 L142 104" stroke="#7a3b16" strokeWidth="5" strokeLinecap="round" />
        <circle cx="140" cy="102" r="9" fill="#c8102e" stroke="#5e0614" strokeWidth="2" />
      </g>
      <g className="pe-ecos" fill="none" stroke="#f2c14e" strokeWidth="2.5">
        {[0, 1, 2].map((i) => (
          <circle key={i} style={{ "--i": i }} cx="100" cy="94" r="56" />
        ))}
      </g>
    </>
  );
}

/* Linterna del paladar · 腭之灯 */
function Linterna({ id }) {
  return (
    <>
      <circle className="pe-linterna__halo" cx="100" cy="88" r="80" fill={`url(#${id}-halo)`} />
      <g className="pe-linterna">
        <path d="M100 0 V24" stroke="#3b2416" strokeWidth="2.5" />
        <rect x="66" y="24" width="68" height="12" rx="3" fill={`url(#${id}-oro)`} stroke="#7a5a22" strokeWidth="1.5" />
        <ellipse cx="100" cy="88" rx="58" ry="52" fill={`url(#${id}-laca)`} stroke="#f2c14e" strokeWidth="2.5" />
        <path d="M78 38 Q56 88 78 138 M122 38 Q144 88 122 138 M100 36 V140" stroke="#7a0a1d" strokeWidth="2.5" fill="none" />
        <circle className="pe-linterna__luz" cx="100" cy="88" r="30" fill="#ffd47a" opacity=".35" />
        <text x="100" y="101" textAnchor="middle" fontSize="36" fontWeight="900" fill="#ffe7a0" fontFamily="STKaiti, KaiTi, serif">
          腭
        </text>
        <rect x="66" y="138" width="68" height="12" rx="3" fill={`url(#${id}-oro)`} stroke="#7a5a22" strokeWidth="1.5" />
        <g className="pe-linterna__borla" stroke="#c8102e" strokeWidth="3" strokeLinecap="round">
          <path d="M92 150 V172 M100 150 V176 M108 150 V172" />
        </g>
        <circle cx="100" cy="152" r="4" fill="#f2c14e" />
      </g>
    </>
  );
}

const EMBLEMAS = { trueno: Tambor, labios: Abanico, bambu: Flauta, campana: Campana, montana: Gong, linterna: Linterna };

export function EmblemaSala({ sala, sonando = false }) {
  const Emblema = EMBLEMAS[sala.id] || Linterna;
  const id = `pe-${sala.id}`;
  return (
    <svg className={`pe-emb pe-emb--${sala.id}${sonando ? " is-sonando" : ""}`} viewBox="2 0 196 176" aria-hidden="true">
      <Defs id={id} />
      <Emblema id={id} />
    </svg>
  );
}

/* ---------- Perfil de la boca: dónde nace el sonido ---------- */
// Lengua según la sala: cuerpo, punto de articulación y etiqueta
const BASE = " Q146 118 147 140 L147 170 L138 170 Q132 132 102 126 Q72 124 56 117 Q49 113 48 108Z";
const LENGUAS = {
  labios: { d: "M48 108 Q46 98 54 96 Q80 90 108 92 Q132 96 140 110" + BASE, punto: [34, 91], es: "los labios", zh: "双唇" },
  bambu: { d: "M48 108 Q40 94 45 87 Q52 84 60 89 Q84 91 108 92 Q132 96 140 110" + BASE, punto: [46, 85], es: "lengua y dientes", zh: "舌尖抵齿" },
  trueno: { d: "M50 108 Q46 98 50 88 Q52 78 58 77 Q66 83 82 89 Q112 91 138 108" + BASE, punto: [55, 76], es: "la punta vibra", zh: "舌尖颤动" },
  campana: { d: "M50 108 Q46 98 50 88 Q52 78 58 77 Q66 83 82 89 Q112 91 138 108" + BASE, punto: [92, 56], es: "aire por la nariz", zh: "鼻腔共鸣" },
  montana: { d: "M48 108 Q46 98 54 96 Q80 92 100 88 Q114 74 130 78 Q142 88 142 110" + BASE, punto: [130, 76], es: "fondo de la boca", zh: "舌根抬起" },
  linterna: { d: "M48 108 Q44 94 52 84 Q66 72 90 72 Q112 72 126 84 Q140 96 142 110" + BASE, punto: [84, 71], es: "lengua al paladar", zh: "舌贴上颚" },
};

export function BocaPerfil({ sala, sonando = false }) {
  const lengua = LENGUAS[sala.id] || LENGUAS.linterna;
  const nasal = sala.id === "campana";
  const [px, py] = lengua.punto;
  return (
    <figure className={`pe-boca pe-boca--${sala.id}${sonando ? " is-sonando" : ""}`}>
      <svg viewBox="8 18 160 142" role="img" aria-label={`Dónde se pronuncia: ${lengua.es} · ${lengua.zh}`}>
        {/* cabeza de perfil (corte), mirando a la izquierda */}
        <path
          d="M200 0 H74 Q58 12 54 32 L48 46 Q42 56 30 64 Q25 70 33 72 L39 72 Q33 77 30 82 Q28 88 34 89 L40 90 Q33 93 31 99 Q31 105 38 107 L44 108 Q40 118 42 128 Q46 142 70 148 Q88 152 96 170 H200 Z"
          fill="#f6e3bd"
          stroke="#3b2416"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* cavidad nasal */}
        <path className="pe-boca__nariz" d="M36 70 Q58 54 98 52 Q132 54 152 68 L152 76 Q124 64 98 64 Q66 64 40 74 Z" fill={nasal ? "#9fe0d4" : "#f0cfc0"} stroke="#b07a5a" strokeWidth="1" />
        {/* faringe y boca */}
        <path d="M44 82 Q70 70 100 70 Q120 70 130 76 Q144 82 150 76 L158 76 L158 170 L140 170 L140 124 Q100 118 56 116 Q42 108 40 98 Z" fill="#6e1620" />
        {/* paladar duro */}
        <path d="M44 80 Q60 70 86 68 Q112 66 128 74" fill="none" stroke="#f0b0a8" strokeWidth="5" strokeLinecap="round" />
        {/* velo del paladar: cerrado (oral) o bajado (nasal) */}
        <path className="pe-boca__velo" d={nasal ? "M128 74 Q138 84 136 98" : "M128 74 Q144 74 150 82"} fill="none" stroke={sala.id === "montana" ? "#f2c14e" : "#f0b0a8"} strokeWidth="5" strokeLinecap="round" />
        {/* dientes */}
        <path d="M40 76 h7 v9 q-3.5 3 -7 0z" fill="#fffaf0" stroke="#8b5e34" strokeWidth=".8" />
        <path d="M41 104 h7 v-9 q-3.5 -3 -7 0z" fill="#fffaf0" stroke="#8b5e34" strokeWidth=".8" />
        {/* labios */}
        <g className="pe-boca__labios">
          <path className="is-arriba" d="M41 74 Q30 77 29 84 Q31 89 36 89 Q40 88 42 86 Z" fill="#d9536a" stroke="#3b2416" strokeWidth="1.4" strokeLinejoin="round" />
          <path className="is-abajo" d="M42 106 Q30 104 30 97 Q31 92 36 92 Q40 93 43 95 Z" fill="#d9536a" stroke="#3b2416" strokeWidth="1.4" strokeLinejoin="round" />
        </g>
        {/* lengua */}
        <path className="pe-boca__lengua" d={lengua.d} fill="#e2707f" stroke="#8a1f2c" strokeWidth="1.5" />
        <path d="M66 108 Q96 100 126 106" fill="none" stroke="#b84a5a" strokeWidth="1.2" opacity=".55" />
        {/* aire */}
        <path
          className="pe-boca__aire"
          d={nasal ? "M151 160 L151 100 Q151 74 126 62 Q90 54 56 62 Q40 66 18 70" : "M151 160 L151 108 Q146 86 112 82 Q72 80 46 90 L14 90"}
          fill="none"
          stroke="#f2c14e"
          strokeWidth="2.5"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />
        {/* punto de articulación */}
        <g transform={`translate(${px} ${py})`}>
          <circle r="11" fill="none" stroke="#c8102e" strokeWidth="2" className="pe-boca__pulso" />
          <circle r="4.5" fill="#c8102e" stroke="#fff3d6" strokeWidth="1.5" />
        </g>
      </svg>
      <figcaption>
        <b>{lengua.es}</b> · {lengua.zh}
      </figcaption>
    </figure>
  );
}

/* Anillos de progreso: escuchadas (oro) y dominadas (laca) */
export function AnillosProgreso({ oidas, dominadas, total }) {
  const C1 = 2 * Math.PI * 30;
  const C2 = 2 * Math.PI * 21;
  return (
    <svg className="pe-anillos" viewBox="0 0 76 76" aria-hidden="true">
      <circle cx="38" cy="38" r="30" className="pe-anillos__fondo" />
      <circle cx="38" cy="38" r="21" className="pe-anillos__fondo" />
      <circle cx="38" cy="38" r="30" className="pe-anillos__oro" opacity={oidas ? 1 : 0} strokeDasharray={`${(C1 * oidas) / total} ${C1}`} />
      <circle cx="38" cy="38" r="21" className="pe-anillos__laca" opacity={dominadas ? 1 : 0} strokeDasharray={`${(C2 * dominadas) / total} ${C2}`} />
      <text x="38" y="43" textAnchor="middle">
        {oidas}
      </text>
    </svg>
  );
}
