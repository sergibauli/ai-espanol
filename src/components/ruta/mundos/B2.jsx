import * as React from "react";
import { Capa, Vin, n, tejado, karst, Banderas } from "./piezas.jsx";
import "../../../styles/v14-ruta-B2.css";

// ---------- B2 · El sur y el oeste: Tíbet nevado, karst de Guilin, río Li y terrazas ----------
// v24: pintado por planos con perspectiva aérea (lo lejano más claro y azulado), niebla entre planos, luz desde la
// izquierda (cara iluminada / cara en sombra en cada pico) y reflejos en el río. Ids de degradados: mrB2…
const az = (i) => {
  const x = Math.sin(i * 91.7 + 13.1) * 43758.5453;
  return x - Math.floor(x);
};
function DefsB2() {
  return (
    <defs>
      <radialGradient id="mrB2sol" cx=".5" cy=".5" r=".5">
        <stop offset="0" stopColor="#fffbe6" />
        <stop offset=".25" stopColor="#fff2c4" stopOpacity=".9" />
        <stop offset="1" stopColor="#fff2c4" stopOpacity="0" />
      </radialGradient>
      {[
        ["Nieve", "#ffffff", "#dfe8ef"],
        ["Roca", "#9fb3c4", "#c9d6df"],
        ["K0", "#a9c6c2", "#dbe8e2"],
        ["K1", "#6e9f8a", "#b9d4c8"],
        ["K2", "#3f7660", "#7fae98"],
        ["K3", "#2b5a48", "#4f826b"],
        ["Rio", "#e3f2ec", "#86bdb3"],
        ["Terraza", "#c8e3a0", "#7fb158"],
        ["Colina", "#a8b88e", "#7c9270"],
      ].map(([id, a1, a2]) => (
        <linearGradient key={id} id={`mrB2${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={a1} />
          <stop offset="1" stopColor={a2} />
        </linearGradient>
      ))}
      <linearGradient id="mrB2niebla" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f4f8f2" stopOpacity="0" />
        <stop offset=".55" stopColor="#f4f8f2" stopOpacity=".85" />
        <stop offset="1" stopColor="#f4f8f2" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="mrB2sombra" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#0d2a22" stopOpacity="0" />
        <stop offset="1" stopColor="#0d2a22" stopOpacity=".32" />
      </linearGradient>
      <linearGradient id="mrB2muro" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#fbf7ee" />
        <stop offset=".7" stopColor="#ece4d2" />
        <stop offset="1" stopColor="#c9bfa8" />
      </linearGradient>
      <linearGradient id="mrB2rojo" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#a8323a" />
        <stop offset=".7" stopColor="#8e2a2a" />
        <stop offset="1" stopColor="#5e1a1c" />
      </linearGradient>
    </defs>
  );
}
// Pico kárstico pintado: cuerpo con degradado, cara en sombra a la derecha, filo de luz a la izquierda y matorral
export function Pico({ x, y, w, h, tono = "K1", matas = true, semilla = 1, luz = 0.5 }) {
  const cuerpo = karst(x, y, w, h);
  const sombra = `M${x + w * 0.04} ${y - h} C${x + w * 0.3} ${y - h} ${x + w * 0.42} ${y - h * 0.55} ${x + w / 2} ${y} L${x + w * 0.08} ${y} C${x + w * 0.16} ${y - h * 0.4} ${x + w * 0.12} ${y - h * 0.75} ${x + w * 0.04} ${y - h}Z`;
  const filo = `M${x - w * 0.42} ${y - h * 0.4} C${x - w * 0.34} ${y - h * 0.8} ${x - w * 0.2} ${y - h} ${x} ${y - h}`;
  return (
    <g>
      <path d={cuerpo} fill={`url(#mrB2${tono})`} />
      <path d={sombra} fill="url(#mrB2sombra)" />
      <path d={filo} fill="none" stroke="#fff" strokeOpacity={luz * 0.6} strokeWidth="2" strokeLinecap="round" />
      {matas &&
        Array.from({ length: Math.round(w / 14) }, (_, i) => {
          const t = az(semilla * 17 + i);
          const u = az(semilla * 7 + i * 3);
          const yy = y - h * (0.15 + t * 0.7);
          const ancho = w * (1 - (y - yy) / h) * 0.42;
          return <ellipse key={i} cx={x + (u - 0.5) * 2 * ancho} cy={yy} rx={3 + u * 4} ry={2 + t * 2} fill="#1d3f31" opacity=".22" />;
        })}
    </g>
  );
}
const Niebla = ({ y, h = 80, op = 1 }) => <rect x="-20" y={y - h / 2} width="840" height={h} fill="url(#mrB2niebla)" opacity={op} />;

export function Panorama() {
  return (
    <>
      <Capa clase="mr-lejos">
        <DefsB2 />
        <circle cx="590" cy="300" r="190" fill="url(#mrB2sol)" />
        <circle cx="590" cy="300" r="34" fill="#fffdf0" opacity=".9" />
        {/* Cordillera nevada con cara en sombra azulada */}
        <path d="M0 540 L90 430 L150 470 L250 350 L330 450 L410 380 L470 430 L560 320 L650 440 L720 400 L800 450 V700 H0Z" fill="url(#mrB2Roca)" />
        {[[90, 430, 56], [250, 350, 70], [410, 380, 58], [560, 320, 76], [720, 400, 54]].map(([x, y, w]) => (
          <g key={x}>
            <path d={`M${x - w * 0.62} ${y + w * 0.66} L${x} ${y} L${x + w * 0.7} ${y + w * 0.72} L${x + w * 0.36} ${y + w * 0.52} L${x + w * 0.12} ${y + w * 0.78} L${x - w * 0.18} ${y + w * 0.5}Z`} fill="url(#mrB2Nieve)" />
            <path d={`M${x} ${y} L${x + w * 0.7} ${y + w * 0.72} L${x + w * 0.36} ${y + w * 0.52} L${x + w * 0.12} ${y + w * 0.78} L${x + w * 0.04} ${y + w * 0.3}Z`} fill="#9fb3c8" opacity=".45" />
          </g>
        ))}
        <Niebla y={520} h={90} />
        {/* Potala sobre su colina, con volumen */}
        <path d="M110 610 C170 536 300 528 370 610Z" fill="url(#mrB2Colina)" />
        <path d="M156 582 L168 540 H324 L336 582Z" fill="url(#mrB2muro)" />
        <path d="M206 540 L212 508 H282 L288 540Z" fill="url(#mrB2rojo)" />
        <path d="M218 508 L224 496 H268 L274 508Z" fill="#e3a432" />
        <path d="M236 496 L246 486 L256 496Z" fill="#f2c14e" />
        {[176, 192, 300, 314].map((x) => <rect key={x} x={x} y="552" width="5" height="9" fill="#5a3a2a" opacity=".8" />)}
        {[222, 236, 250, 264].map((x) => <rect key={x} x={x} y="518" width="4" height="8" fill="#3a1a12" opacity=".8" />)}
        <path d="M156 582 H336" stroke="#8a7a60" strokeWidth="1.5" opacity=".6" />
        <Banderas x1={336} y1={526} x2={460} y2={478} n={11} tam={6} />
        <Niebla y={640} h={110} />
        {[[80, 730, 150, 170, 1], [210, 730, 110, 130, 2], [470, 730, 140, 190, 3], [620, 730, 120, 140, 4], [745, 730, 150, 170, 5]].map(([x, y, w, h, k]) => (
          <Pico key={k} x={x} y={y} w={w} h={h} tono="K0" matas={false} luz={0.4} />
        ))}
        <Niebla y={720} h={90} />
      </Capa>
      <Capa clase="mr-medio">
        {[[20, 830, 180, 250, 1], [140, 830, 120, 180, 2], [345, 815, 120, 160, 3], [560, 820, 130, 210, 4], [690, 830, 150, 260, 5], [800, 830, 120, 190, 6]].map(([x, y, w, h, k]) => (
          <Pico key={k} x={x} y={y} w={w} h={h} tono="K1" semilla={k} />
        ))}
        <rect x="0" y="800" width="800" height="300" fill="#7fae98" />
        <Niebla y={810} h={70} />
      </Capa>
      <Capa clase="mr-cerca">
        <path d="M0 862 C120 826 300 846 400 836 S640 826 800 856 V1100 H0Z" fill="url(#mrB2K2)" />
        {/* Río Li: agua clara con reflejos de los picos */}
        <path d="M300 1000 C330 940 450 920 420 880 S370 842 404 834 L440 834 C420 850 474 868 470 892 S400 940 500 1000Z" fill="url(#mrB2Rio)" />
        <g opacity=".22" fill="#2b5a48">
          <path d="M392 846 l10 22 l8 -22z" />
          <path d="M420 900 l14 34 l12 -34z" />
        </g>
        <path d="M352 966 Q380 950 410 958 M420 900 Q440 892 452 898 M410 852 Q420 846 432 850 M380 984 Q400 976 424 982" stroke="#fff" strokeWidth="1.6" fill="none" opacity=".8" />
        {/* Terrazas de arroz con espejo de agua y bancales en sombra */}
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <g key={k}>
            <path d={`M${560 + k * 6} ${1000 - k * 22} C${620 + k * 4} ${960 - k * 24} 720 ${955 - k * 22} 800 ${935 - k * 24}`} fill="none" stroke="#4f7f3f" strokeWidth="11" />
            <path d={`M${560 + k * 6} ${997 - k * 22} C${620 + k * 4} ${957 - k * 24} 720 ${952 - k * 22} 800 ${932 - k * 24}`} fill="none" stroke={k % 2 ? "#a9d27a" : "#cde8a6"} strokeWidth="8" />
            <path d={`M${574 + k * 6} ${994 - k * 22} C${630 + k * 4} ${954 - k * 24} 720 ${949 - k * 22} 800 ${929 - k * 24}`} fill="none" stroke="#f1fbff" strokeWidth="1.3" opacity=".75" />
          </g>
        ))}
        {[0, 1, 2, 3].map((k) => (
          <g key={k}>
            <path d={`M0 ${942 - k * 22} C80 ${952 - k * 24} ${170 - k * 6} ${977 - k * 20} ${220 - k * 8} ${1002 - k * 18}`} fill="none" stroke="#4f7f3f" strokeWidth="11" />
            <path d={`M0 ${939 - k * 22} C80 ${949 - k * 24} ${170 - k * 6} ${974 - k * 20} ${220 - k * 8} ${999 - k * 18}`} fill="none" stroke={k % 2 ? "#a9d27a" : "#cde8a6"} strokeWidth="8" />
          </g>
        ))}
      </Capa>
    </>
  );
}

export function Ambiente() {
  return (
    <div className="mr-particulas">
      <span className="mr-niebla f1" />
      <span className="mr-niebla f2" />
      <span className="mr-niebla f3" />
      <div className="mr-px3">
      <div className="mr-balsa">
        <svg viewBox="0 0 120 60" aria-hidden="true">
          <path d="M6 46 H104 L98 52 H10Z" fill="#c9a56a" />
          {n(8).map((i) => <path key={i} d={`M${12 + i * 12} 46 V52`} stroke="#8a6a38" strokeWidth="1.5" />)}
          <path d="M60 46 V24" stroke="#2c2a26" strokeWidth="5" strokeLinecap="round" />
          <path d="M46 22 L74 22 L60 12Z" fill="#d8b46a" stroke="#8a6a38" />
          <path d="M60 30 L96 2" stroke="#4a3a28" strokeWidth="2" />
          <path d="M22 46 C20 38 26 32 30 34 C32 30 38 30 36 36 C34 40 30 42 28 46Z" fill="#1f1f22" />
        </svg>
      </div>
      </div>
      {n(12).map((i) => (
        <span key={i} className={`mr-hoja ${i % 3 === 0 ? "rosa" : ""}`} style={{ left: `${(i * 47 + 5) % 100}%`, "--t": `${11 + (i % 5) * 2.5}s`, "--d": `${-((i * 2.3) % 16)}s`, "--s": 0.7 + (i % 3) * 0.25, "--x": `${(i % 2 ? 1 : -1) * (40 + (i % 4) * 16)}px` }} />
      ))}
    </div>
  );
}

// Viñetas a los lados del camino (200 × 240), pintadas con luz y niebla como el panorama
const DefsVin = () => (
  <defs>
    <linearGradient id="mrB2vAgua" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d7ece6" /><stop offset="1" stopColor="#8cc0b6" /></linearGradient>
    <linearGradient id="mrB2vNiebla" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f4f8f2" stopOpacity="0" /><stop offset=".6" stopColor="#f4f8f2" stopOpacity=".9" /><stop offset="1" stopColor="#f4f8f2" stopOpacity="0" /></linearGradient>
  </defs>
);
export const VINETAS = [
  // Picos kársticos con balsa de bambú y pescador
  () => (
    <Vin>
      <DefsVin />
      <Pico x={70} y={200} w={120} h={190} tono="K2" semilla={3} />
      <Pico x={150} y={200} w={90} h={130} tono="K1" semilla={4} />
      <rect x="0" y="160" width="200" height="50" fill="url(#mrB2vNiebla)" />
      <rect x="0" y="196" width="200" height="44" fill="url(#mrB2vAgua)" />
      <path d="M50 200 l8 26 l8 -26z M120 200 l10 20 l10 -20z" fill="#2b5a48" opacity=".2" />
      <path d="M30 214 H90 M110 228 H170" stroke="#fff" strokeWidth="1.6" opacity=".7" />
      <g className="mr-vin-balsa">
        <path d="M60 206 H150 L144 212 H66Z" fill="#c9a56a" />
        <path d="M66 212 H144" stroke="#8a6a38" strokeWidth="1" />
        <path d="M104 206 V184" stroke="#2c2a26" strokeWidth="5" strokeLinecap="round" />
        <path d="M90 182 L118 182 L104 172Z" fill="#d8b46a" stroke="#8a6a38" />
        <path d="M70 206 C68 198 74 192 78 194 C80 190 86 190 84 196 C82 200 78 202 76 206Z" fill="#1f1f22" />
      </g>
    </Vin>
  ),
  // Pagoda en la cima de un pico, entre la niebla
  () => (
    <Vin>
      <DefsVin />
      <Pico x={110} y={240} w={150} h={180} tono="K2" semilla={8} />
      <Pico x={30} y={240} w={80} h={110} tono="K1" semilla={9} />
      <g transform="translate(112 64)">
        {[0, 1, 2].map((k) => (
          <g key={k} transform={`translate(0 ${-k * 16})`}>
            <rect x={-9 + k * 2} y="-12" width={18 - k * 4} height="12" fill="#efe6d2" />
            <rect x={9 - k * 2 - 5} y="-12" width="5" height="12" fill="#c9bfa8" />
            <path d={tejado(0, -11, 34 - k * 7, 8)} fill="#5a3a2a" />
          </g>
        ))}
        <path d="M0 -58 v-10" stroke="#c8961e" strokeWidth="2" />
      </g>
      <rect x="0" y="120" width="200" height="70" fill="url(#mrB2vNiebla)" />
      <rect x="0" y="190" width="200" height="60" fill="url(#mrB2vNiebla)" opacity=".8" />
    </Vin>
  ),
  // Terrazas de arroz con agua que brilla y una casa de madera
  () => (
    <Vin>
      <DefsVin />
      <path d="M0 240 V110 C60 80 140 80 200 104 V240Z" fill="#5f9440" />
      {n(7).map((k) => (
        <g key={k}>
          <path d={`M0 ${126 + k * 17} C60 ${98 + k * 18} 140 ${98 + k * 18} 200 ${120 + k * 17}`} fill="none" stroke="#3f6f2f" strokeWidth="11" />
          <path d={`M0 ${124 + k * 17} C60 ${96 + k * 18} 140 ${96 + k * 18} 200 ${118 + k * 17}`} fill="none" stroke={k % 2 ? "#a7d07a" : "#c7e6a4"} strokeWidth="8.5" />
          <path d={`M10 ${123 + k * 17} C70 ${96 + k * 18} 130 ${96 + k * 18} 190 ${117 + k * 17}`} fill="none" stroke="#f1fbff" strokeWidth="1.3" opacity=".75" />
        </g>
      ))}
      <rect x="146" y="84" width="28" height="16" fill="#d9c49a" />
      <rect x="164" y="84" width="10" height="16" fill="#b39c70" />
      <rect x="152" y="89" width="6" height="7" fill="#5a3a2a" />
      <path d={tejado(160, 86, 40, 13)} fill="#4a2e22" />
      <rect x="0" y="70" width="200" height="50" fill="url(#mrB2vNiebla)" opacity=".7" />
    </Vin>
  ),
  // Monasterio tibetano con banderas de oración y pico nevado (con volumen)
  () => (
    <Vin anima="banderas">
      <DefsVin />
      <path d="M30 124 L100 20 L180 124Z" fill="#b9cad8" />
      <path d="M100 20 L180 124 L120 124 L108 60Z" fill="#94a9bd" opacity=".55" />
      <path d="M76 54 L100 20 L126 58 L112 52 L102 64 L90 52Z" fill="#fff" />
      <rect x="0" y="100" width="200" height="50" fill="url(#mrB2vNiebla)" />
      <path d="M0 240 V172 C60 142 140 142 200 172 V240Z" fill="#8e9f80" />
      <path d="M40 176 L46 128 H154 L160 176Z" fill="url(#mrB2muro)" />
      <path d="M72 128 L76 102 H124 L128 128Z" fill="url(#mrB2rojo)" />
      <path d="M80 102 L84 92 H116 L120 102Z" fill="#e3a432" />
      <path d="M100 76 L105 92 H95Z" fill="#f2c14e" />
      {[56, 70, 130, 144].map((x) => <rect key={x} x={x} y="142" width="6" height="10" fill="#5a3a2a" />)}
      {[86, 98, 110].map((x) => <rect key={x} x={x} y="110" width="4" height="8" fill="#3a1a12" />)}
      <g className="mr-vin-banderas">
        <Banderas x1={0} y1={98} x2={76} y2={108} n={7} />
        <Banderas x1={124} y1={106} x2={200} y2={86} n={7} />
      </g>
    </Vin>
  ),
];
