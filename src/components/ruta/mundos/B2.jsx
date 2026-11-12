import * as React from "react";
import { Capa, Vin, n, tejado, PinoNevado, CAMELLO, Palmera, karst, Banderas } from "./piezas.jsx";
import "../../../styles/v14-ruta-B2.css";

// ---------- B2 · El sur y el oeste: Tíbet nevado, karst de Guilin, río Li y terrazas ----------
export function Panorama() {
  return (
    <>
      <Capa clase="mr-lejos">
        <path d="M0 520 L90 430 L150 470 L250 360 L330 450 L410 380 L470 430 L560 330 L650 440 L720 400 L800 450 V700 H0Z" fill="#c7d6e2" />
        {[[90, 430], [250, 360], [410, 380], [560, 330], [720, 400]].map(([x, y]) => (
          <path key={x} d={`M${x - 34} ${y + 36} L${x} ${y} L${x + 38} ${y + 40} L${x + 18} ${y + 30} L${x + 6} ${y + 44} L${x - 10} ${y + 30}Z`} fill="#fbfdff" />
        ))}
        {/* Potala sobre su colina */}
        <path d="M120 600 C170 540 300 530 360 600Z" fill="#9aa88f" />
        <rect x="160" y="540" width="170" height="40" fill="#f4efe4" />
        <rect x="210" y="512" width="72" height="44" fill="#8e2a2a" />
        <rect x="226" y="500" width="40" height="14" fill="#e3a432" />
        {[170, 186, 202, 290, 306, 318].map((x) => (
          <rect key={x} x={x} y="552" width="6" height="8" fill="#5a3a2a" />
        ))}
        <Banderas x1={330} y1={520} x2={460} y2={470} n={11} tam={7} />
        <g fill="#8fb4a4">
          <path d={karst(80, 720, 150, 150)} /><path d={karst(200, 720, 110, 120)} /><path d={karst(470, 720, 140, 170)} /><path d={karst(620, 720, 120, 130)} /><path d={karst(740, 720, 150, 160)} />
        </g>
      </Capa>
      <Capa clase="mr-medio">
        <g fill="#5d8e78">
          <path d={karst(0, 820, 180, 230)} /><path d={karst(130, 820, 120, 170)} /><path d={karst(340, 800, 120, 150)} /><path d={karst(560, 810, 130, 190)} /><path d={karst(690, 820, 150, 240)} /><path d={karst(800, 820, 120, 180)} />
        </g>
        <path d="M0 790 H800 V1100 H0Z" fill="#5d8e78" />
      </Capa>
      <Capa clase="mr-cerca">
        <defs>
          <linearGradient id="mrB2rio" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d9eee6" /><stop offset="1" stopColor="#7fb8b0" /></linearGradient>
        </defs>
        <path d="M0 860 C120 820 300 840 400 830 S640 820 800 850 V1100 H0Z" fill="#3f6f5b" />
        {/* Río Li serpenteando hacia el horizonte */}
        <path d="M300 1000 C330 940 450 920 420 880 S370 842 404 828 L440 828 C420 844 474 868 470 892 S400 940 500 1000Z" fill="url(#mrB2rio)" />
        <path d="M352 966 Q380 950 410 958 M420 900 Q440 892 452 898 M410 852 Q420 846 432 850" stroke="#fff" strokeWidth="2" fill="none" opacity=".7" />
        {/* Terrazas de arroz */}
        <g fill="none" strokeWidth="9">
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <path key={k} d={`M${560 + k * 6} ${1000 - k * 22} C${620 + k * 4} ${960 - k * 24} ${720} ${955 - k * 22} ${800} ${935 - k * 24}`} stroke={k % 2 ? "#8cbf5a" : "#b7d98a"} />
          ))}
          {[0, 1, 2, 3].map((k) => (
            <path key={k} d={`M0 ${940 - k * 22} C${80} ${950 - k * 24} ${170 - k * 6} ${975 - k * 20} ${220 - k * 8} ${1000 - k * 18}`} stroke={k % 2 ? "#8cbf5a" : "#b7d98a"} />
          ))}
        </g>
        <g fill="none" stroke="#e8f6ff" strokeWidth="1.5" opacity=".7">
          {[0, 2, 4].map((k) => (
            <path key={k} d={`M${570 + k * 6} ${994 - k * 22} C${630 + k * 4} ${954 - k * 24} ${720} ${949 - k * 22} ${800} ${929 - k * 24}`} />
          ))}
        </g>
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

// Viñetas a los lados del camino (200 × 240)
export const VINETAS = [
  // Pico kárstico con balsa de bambú y cormorán
  () => (
    <Vin>
      <path d={karst(70, 200, 120, 190)} fill="#4f7f6b" />
      <path d={karst(150, 200, 90, 130)} fill="#6a9a84" />
      <rect x="0" y="196" width="200" height="44" fill="#a9d0cc" />
      <path d="M30 214 H90 M110 228 H170" stroke="#fff" strokeWidth="2" opacity=".7" />
      <g className="mr-vin-balsa">
        <path d="M60 206 H150 L144 212 H66Z" fill="#c9a56a" />
        <path d="M104 206 V184" stroke="#2c2a26" strokeWidth="5" strokeLinecap="round" />
        <path d="M90 182 L118 182 L104 172Z" fill="#d8b46a" stroke="#8a6a38" />
        <path d="M70 206 C68 198 74 192 78 194 C80 190 86 190 84 196 C82 200 78 202 76 206Z" fill="#1f1f22" />
      </g>
    </Vin>
  ),
  // Panda comiendo bambú
  () => (
    <Vin anima="bambu">
      {[[20, 6], [46, 0], [168, 10], [186, 30]].map(([x, y], i) => (
        <g key={x} className="mr-vin-cana">
          <rect x={x} y={y} width="9" height={240 - y} rx="3" fill={i % 2 ? "#4f9a5a" : "#3c8a4c"} />
          {[60, 120, 180].map((yy) => <rect key={yy} x={x - 1} y={yy + y / 2} width="11" height="3" fill="#2a6a35" />)}
          <path d={`M${x + 9} ${50 + i * 14} q24 -12 42 -2 q-24 4 -42 10z M${x} ${100 + i * 10} q-24 -10 -40 0 q22 4 40 8z`} fill="#56a862" />
        </g>
      ))}
      <ellipse cx="104" cy="226" rx="70" ry="12" fill="#3f6f5b" opacity=".5" />
      <g>
        <ellipse cx="104" cy="186" rx="40" ry="38" fill="#fafafa" />
        <ellipse cx="104" cy="200" rx="40" ry="20" fill="#1b1b1e" />
        <ellipse cx="74" cy="218" rx="16" ry="10" fill="#1b1b1e" /><ellipse cx="134" cy="218" rx="16" ry="10" fill="#1b1b1e" />
        <circle cx="104" cy="134" r="30" fill="#fafafa" />
        <circle cx="80" cy="110" r="10" fill="#1b1b1e" /><circle cx="128" cy="110" r="10" fill="#1b1b1e" />
        <ellipse cx="93" cy="132" rx="8" ry="10" fill="#1b1b1e" transform="rotate(-20 93 132)" /><ellipse cx="115" cy="132" rx="8" ry="10" fill="#1b1b1e" transform="rotate(20 115 132)" />
        <circle cx="94" cy="132" r="2.6" fill="#fff" /><circle cx="114" cy="132" r="2.6" fill="#fff" />
        <ellipse cx="104" cy="146" rx="5" ry="3.5" fill="#1b1b1e" />
        <path d="M98 152 Q104 156 110 152" stroke="#1b1b1e" strokeWidth="2" fill="none" />
        <path d="M140 150 L118 160" stroke="#3c8a4c" strokeWidth="5" strokeLinecap="round" />
        <path d="M140 150 q14 -14 26 -12 q-12 6 -26 12z" fill="#56a862" />
        <ellipse cx="124" cy="164" rx="12" ry="9" fill="#1b1b1e" />
      </g>
    </Vin>
  ),
  // Terrazas de arroz con agua que brilla
  () => (
    <Vin>
      <path d="M0 240 V110 C60 80 140 80 200 104 V240Z" fill="#6fa24a" />
      {n(7).map((k) => (
        <g key={k}>
          <path d={`M0 ${124 + k * 17} C60 ${96 + k * 18} 140 ${96 + k * 18} 200 ${118 + k * 17}`} fill="none" stroke={k % 2 ? "#a7d07a" : "#c7e6a4"} strokeWidth="10" />
          <path d={`M10 ${126 + k * 17} C70 ${99 + k * 18} 130 ${99 + k * 18} 190 ${120 + k * 17}`} fill="none" stroke="#eaf8ff" strokeWidth="1.5" opacity=".75" />
        </g>
      ))}
      <path d={tejado(160, 86, 34, 12)} fill="#5a3a2a" />
      <rect x="150" y="86" width="20" height="12" fill="#d9c49a" />
    </Vin>
  ),
  // Templo tibetano con banderas de oración y pico nevado
  () => (
    <Vin anima="banderas">
      <path d="M30 120 L100 20 L180 120Z" fill="#c7d6e2" />
      <path d="M76 54 L100 20 L126 58 L112 52 L102 64 L90 52Z" fill="#fff" />
      <path d="M0 240 V170 C60 140 140 140 200 170 V240Z" fill="#9aa88f" />
      <rect x="46" y="128" width="108" height="46" fill="#f4efe4" />
      <rect x="76" y="104" width="48" height="30" fill="#8e2a2a" />
      <rect x="84" y="92" width="32" height="14" fill="#e3a432" />
      <path d="M100 76 L104 92 H96Z" fill="#f2c14e" />
      {[56, 70, 132, 146].map((x) => <rect key={x} x={x} y="140" width="6" height="10" fill="#5a3a2a" />)}
      <g className="mr-vin-banderas">
        <Banderas x1={0} y1={98} x2={76} y2={108} n={7} />
        <Banderas x1={124} y1={106} x2={200} y2={86} n={7} />
      </g>
    </Vin>
  ),
];
