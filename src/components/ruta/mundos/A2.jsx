import * as React from "react";
import { Capa, Vin, n, tejado, PinoNevado, CAMELLO, Palmera, karst, Banderas } from "./piezas.jsx";
import "../../../styles/v14-ruta-A2.css";

// ---------- A2 · La Ruta de la Seda: atardecer, dunas, caravana, oasis y Mogao ----------
export function Panorama() {
  return (
    <>
      <Capa clase="mr-lejos">
        <defs>
          <radialGradient id="mrA2sol"><stop offset="0" stopColor="#fff3c2" /><stop offset=".35" stopColor="#ffd27a" /><stop offset=".7" stopColor="#ff9f4a" stopOpacity=".35" /><stop offset="1" stopColor="#ff9f4a" stopOpacity="0" /></radialGradient>
        </defs>
        <circle cx="430" cy="650" r="230" fill="url(#mrA2sol)" />
        <circle cx="430" cy="650" r="74" fill="#ffe7a8" />
        {/* Acantilado de Mogao con nichos de cuevas y la fachada de nueve pisos */}
        <path d="M0 560 L120 552 L150 528 L360 522 L372 560 L392 690 L0 700Z" fill="#b2713c" />
        <path d="M0 600 H380 M0 640 H386 M0 672 H390" stroke="#8e5329" strokeWidth="2" opacity=".6" />
        {Array.from({ length: 22 }, (_, i) => {
          const x = 14 + (i % 11) * 22 + (Math.floor(i / 11) % 2) * 10;
          const y = 572 + Math.floor(i / 11) * 40;
          return <path key={i} d={`M${x} ${y + 16} V${y + 6} A6 6 0 0 1 ${x + 12} ${y + 6} V${y + 16}Z`} fill="#4d2511" />;
        })}
        <g>
          <rect x="268" y="560" width="64" height="140" fill="#d9b48a" />
          {[0, 1, 2, 3, 4].map((k) => (
            <path key={k} d={tejado(300, 690 - k * 28, 96 - k * 12, 12)} fill="#8f2a1e" />
          ))}
          <path d={tejado(300, 548, 40, 16)} fill="#8f2a1e" />
          <rect x="296" y="520" width="8" height="14" fill="#f2c14e" />
        </g>
        <path d="M380 712 C470 660 560 668 640 690 S760 700 800 680 V1100 H380Z" fill="#e8a65a" />
      </Capa>
      <Capa clase="mr-medio">
        <path d="M0 752 C200 736 600 736 800 754 V1100 H0Z" fill="#d68a3c" />
        <path d="M0 752 C200 736 600 736 800 754" stroke="#ffd48a" strokeWidth="3" fill="none" />
      </Capa>
      <Capa clase="mr-cerca">
        <defs>
          <linearGradient id="mrA2agua" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7fd0d6" /><stop offset="1" stopColor="#2f7f95" /></linearGradient>
        </defs>
        <path d="M0 880 C160 800 320 830 440 870 S700 900 800 840 V1100 H0Z" fill="#c4712d" />
        <path d="M0 880 C160 800 320 830 440 870 S700 900 800 840" stroke="#f6c070" strokeWidth="3" fill="none" />
        <path d="M120 836 C200 860 240 900 220 960" stroke="#a85d22" strokeWidth="2" fill="none" opacity=".6" />
        {/* Oasis de la Luna Creciente */}
        <path d="M470 930 C500 896 610 892 660 918 C620 908 540 912 500 940Z" fill="url(#mrA2agua)" />
        <path d="M470 930 C520 960 640 950 660 918 C610 940 520 946 470 930Z" fill="url(#mrA2agua)" />
        <path d="M486 934 C540 948 610 944 646 924" stroke="#d8fbff" strokeWidth="2" fill="none" opacity=".8" />
        <path d={tejado(560, 902, 40, 14)} fill="#7a2418" />
        <rect x="548" y="902" width="24" height="12" fill="#c7884a" />
        <Palmera x={470} y={928} h={86} inc={-14} />
        <Palmera x={498} y={936} h={64} inc={8} color="#3d7a3f" />
        <Palmera x={668} y={922} h={92} inc={16} />
        <Palmera x={640} y={938} h={58} inc={-6} color="#3d7a3f" />
        <path d="M0 1000 C200 950 520 980 800 950 V1100 H0Z" fill="#a95a21" />
      </Capa>
    </>
  );
}

export function Ambiente() {
  return (
    <div className="mr-particulas">
      <div className="mr-px2">
      <div className="mr-caravana">
        <svg viewBox="0 0 330 60" aria-hidden="true">
          {[0, 70, 140, 210, 280].map((x, i) => (
            <g key={x} transform={`translate(${x} 56) scale(${i === 0 ? 1.05 : 0.95})`} fill="#4a2412">
              <path d={CAMELLO} />
              {i % 2 === 0 && <path d="M22 -38 C22 -46 30 -46 30 -38Z M24 -44 L28 -50 L32 -44Z" />}
              {i % 2 === 1 && <rect x="16" y="-40" width="18" height="8" rx="3" fill="#7a2418" />}
            </g>
          ))}
          <path d="M53 18 L70 30 M123 18 L140 30 M193 18 L210 30 M263 18 L280 30" stroke="#4a2412" strokeWidth="1.2" />
        </svg>
      </div>
      </div>
      {[["8%", "16%", "#d23a2f"], ["78%", "10%", "#2f6fd1"]].map(([left, top, c], i) => (
        <div key={i} className="mr-cometa" style={{ left, top, "--d": `${-i * 2.5}s` }}>
          <svg viewBox="0 0 60 120" aria-hidden="true">
            <path d="M30 2 L54 30 L30 64 L6 30Z" fill={c} stroke="#f2c14e" strokeWidth="2" />
            <path d="M30 2 V64 M6 30 H54" stroke="#f2c14e" strokeWidth="1.2" />
            <path d="M30 64 Q20 80 34 92 T30 118" fill="none" stroke={c} strokeWidth="2" />
            {[78, 94, 108].map((y) => <path key={y} d={`M24 ${y} L36 ${y + 4}`} stroke="#f2c14e" strokeWidth="3" />)}
          </svg>
        </div>
      ))}
      {n(14).map((i) => (
        <span key={i} className="mr-arena" style={{ top: `${30 + ((i * 29) % 65)}%`, "--t": `${6 + (i % 5) * 1.6}s`, "--d": `${-((i * 1.3) % 9)}s`, "--s": 0.6 + (i % 3) * 0.3 }} />
      ))}
    </div>
  );
}

// Viñetas a los lados del camino (200 × 240)
export const VINETAS = [
  // Camello con jinete sobre una duna
  () => (
    <Vin anima="balanceo">
      <path d="M0 240 V200 C60 170 130 168 200 196 V240Z" fill="#e3a052" />
      <path d="M0 200 C60 170 130 168 200 196" stroke="#ffd48a" strokeWidth="3" fill="none" />
      <g transform="translate(46 188) scale(2.1)" fill="#5a2c14">
        <path d={CAMELLO} />
        <rect x="14" y="-44" width="20" height="8" rx="3" fill="#a3222b" />
        <path d="M20 -44 C20 -56 30 -56 30 -44Z" fill="#3b2416" />
        <path d="M18 -56 L25 -64 L32 -56Z" fill="#c8961e" />
      </g>
    </Vin>
  ),
  // Palmeras del oasis
  () => (
    <Vin>
      <ellipse cx="100" cy="222" rx="96" ry="18" fill="#e3a052" />
      <ellipse cx="104" cy="220" rx="62" ry="10" fill="#4fa7b5" />
      <path d="M60 220 Q104 228 150 218" stroke="#d8fbff" strokeWidth="2" fill="none" />
      <Palmera x={58} y={218} h={150} inc={-18} />
      <Palmera x={142} y={216} h={120} inc={20} color="#3d7a3f" />
      <Palmera x={100} y={222} h={80} inc={4} color="#2a6a35" />
    </Vin>
  ),
  // Cuevas de Mogao
  () => (
    <Vin>
      <path d="M0 240 V70 L30 60 L170 56 L200 70 V240Z" fill="#b8773f" />
      <path d="M0 110 H200 M0 160 H200" stroke="#8e5329" strokeWidth="2" opacity=".6" />
      {n(9).map((i) => {
        const x = 14 + (i % 3) * 62;
        const y = 78 + Math.floor(i / 3) * 52;
        return (
          <g key={i}>
            <path d={`M${x} ${y + 30} V${y + 12} A12 12 0 0 1 ${x + 24} ${y + 12} V${y + 30}Z`} fill="#4d2511" />
            {i === 4 && <path d={`M${x + 12} ${y + 8} C${x + 6} ${y + 14} ${x + 6} ${y + 24} ${x + 12} ${y + 28} C${x + 18} ${y + 24} ${x + 18} ${y + 14} ${x + 12} ${y + 8}Z`} fill="#f2c14e" />}
          </g>
        );
      })}
      <path d={tejado(100, 64, 120, 18)} fill="#8f2a1e" />
    </Vin>
  ),
  // Cometa sobre las dunas
  () => (
    <Vin anima="cometa">
      <path d="M0 240 V214 C70 194 140 200 200 222 V240Z" fill="#d98b3b" />
      <path d="M150 210 L150 196" stroke="#3b2416" strokeWidth="5" strokeLinecap="round" />
      <circle cx="150" cy="190" r="5" fill="#3b2416" />
      <path d="M150 196 Q100 120 66 56" stroke="#3b2416" strokeWidth="1" fill="none" />
      <g className="mr-vin-cometa">
        <path d="M60 10 L86 40 L60 74 L34 40Z" fill="#c8102e" stroke="#f2c14e" strokeWidth="2" />
        <path d="M60 10 V74 M34 40 H86" stroke="#f2c14e" strokeWidth="1.2" />
        <path d="M60 74 Q50 90 64 100 T58 128" fill="none" stroke="#c8102e" strokeWidth="2" />
      </g>
    </Vin>
  ),
];
