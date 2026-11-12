import * as React from "react";
import { Capa, Vin, n, tejado, PinoNevado, CAMELLO, Palmera, karst, Banderas } from "./piezas.jsx";
import "../../../styles/v14-ruta-A1.css";

// ---------- A1 · Pekín y el norte: invierno, Gran Muralla y Ciudad Prohibida ----------
export function Panorama() {
  const crestaMuralla = "M0 724 C80 676 130 694 180 656 S300 646 340 694 S450 706 520 648 S650 656 700 694 S780 684 800 676";
  return (
    <>
      <Capa clase="mr-lejos">
        <defs>
          <radialGradient id="mrA1sol"><stop offset="0" stopColor="#fffaf0" /><stop offset=".45" stopColor="#ffe9c4" stopOpacity=".9" /><stop offset="1" stopColor="#ffe9c4" stopOpacity="0" /></radialGradient>
        </defs>
        <circle cx="560" cy="260" r="150" fill="url(#mrA1sol)" />
        <circle cx="560" cy="260" r="46" fill="#fff8ea" opacity=".95" />
        <path d="M0 640 L60 592 L120 616 L190 538 L260 602 L330 560 L400 612 L470 520 L560 592 L630 548 L700 604 L800 556 V1100 H0Z" fill="#9db0c2" />
        {[[190, 538], [470, 520], [630, 548], [800, 556], [60, 592], [330, 560]].map(([x, y]) => (
          <path key={x} d={`M${x - 22} ${y + 22} L${x} ${y} L${x + 24} ${y + 24} L${x + 12} ${y + 18} L${x + 4} ${y + 27} L${x - 6} ${y + 17}Z`} fill="#f7fbff" />
        ))}
        <path d={`${crestaMuralla} V1100 H0Z`} fill="#6c8297" />
        <path d={crestaMuralla} fill="none" stroke="#f3f6f9" strokeWidth="5" opacity=".9" />
        <path d={crestaMuralla} transform="translate(0 9)" fill="none" stroke="#b39876" strokeWidth="9" />
        <path d={crestaMuralla} transform="translate(0 2)" fill="none" stroke="#8a6c4f" strokeWidth="5" strokeDasharray="4 4" />
        {[[180, 640], [338, 678], [520, 632], [700, 678]].map(([x, y]) => (
          <g key={x}>
            <rect x={x - 9} y={y} width="18" height="20" fill="#a98d6c" />
            <rect x={x - 3} y={y + 9} width="6" height="8" rx="3" fill="#4d3a2a" />
            <path d={tejado(x, y + 1, 30, 9)} fill="#5c4a3c" />
            <path d={`M${x - 11} ${y - 6} L${x + 11} ${y - 6}`} stroke="#fff" strokeWidth="2.2" />
          </g>
        ))}
      </Capa>
      <Capa clase="mr-cerca">
        <defs>
          <linearGradient id="mrA1oro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffe08a" /><stop offset=".6" stopColor="#e3a432" /><stop offset="1" stopColor="#a8741e" /></linearGradient>
        </defs>
        <path d="M0 830 C180 800 620 800 800 830 V1100 H0Z" fill="#eef2f5" />
        {/* Muralla roja del palacio a lo ancho */}
        <rect x="0" y="842" width="800" height="52" fill="#9c2229" />
        <rect x="0" y="834" width="800" height="10" fill="url(#mrA1oro)" />
        <path d="M0 834 H800" stroke="#fff" strokeWidth="3" />
        {/* Sala de la Armonía Suprema */}
        <rect x="270" y="868" width="260" height="24" fill="#efeae1" />
        <rect x="300" y="852" width="200" height="18" fill="#f7f3ec" />
        <rect x="318" y="790" width="164" height="64" fill="#b0262f" />
        {[332, 352, 372, 392, 412, 432, 452, 470].map((x) => (
          <rect key={x} x={x} y="798" width="5" height="56" fill="#7d141c" />
        ))}
        <rect x="318" y="790" width="164" height="9" fill="#2f6f74" />
        <path d={tejado(400, 796, 240, 26)} fill="url(#mrA1oro)" />
        <rect x="338" y="752" width="124" height="20" fill="#a3222b" />
        <path d={tejado(400, 758, 200, 34)} fill="url(#mrA1oro)" />
        <path d="M332 724 H468" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        <path d="M328 770 Q400 762 472 770 M286 788 Q400 778 514 788" stroke="#fffdf5" strokeWidth="3" fill="none" opacity=".85" />
        <circle cx="332" cy="722" r="4" fill="#ffe08a" /><circle cx="468" cy="722" r="4" fill="#ffe08a" />
        {/* Torres de esquina */}
        {[120, 680].map((x) => (
          <g key={x}>
            <rect x={x - 26} y="796" width="52" height="40" fill="#a3222b" />
            <path d={tejado(x, 800, 84, 18)} fill="url(#mrA1oro)" />
            <path d={tejado(x, 778, 58, 20)} fill="url(#mrA1oro)" />
            <path d={`M${x - 16} 758 H${x + 16}`} stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          </g>
        ))}
        <path d="M0 900 C200 884 600 884 800 900 V1100 H0Z" fill="#f6f8fa" />
        <PinoNevado x={40} y={930} s={1.5} />
        <PinoNevado x={95} y={950} s={1.1} />
        <PinoNevado x={220} y={942} s={1} />
        <PinoNevado x={585} y={944} s={1} />
        <PinoNevado x={712} y={936} s={1.4} />
        <PinoNevado x={770} y={954} s={1.05} />
      </Capa>
    </>
  );
}

export function Ambiente() {
  return (
    <div className="mr-particulas">
      {n(26).map((i) => (
        <span key={i} className="mr-copo" style={{ left: `${(i * 37) % 100}%`, "--t": `${9 + (i % 6) * 2.2}s`, "--d": `${-((i * 1.7) % 14)}s`, "--s": 0.5 + (i % 4) * 0.3, "--x": `${(i % 2 ? 1 : -1) * (20 + (i % 5) * 10)}px` }} />
      ))}
    </div>
  );
}

// Viñetas a los lados del camino (200 × 240)
export const VINETAS = [
  // Torre de la Gran Muralla en un monte nevado
  () => (
    <Vin>
      <path d="M0 240 V172 C50 130 110 118 200 150 V240Z" fill="#e8eef3" />
      <path d="M110 122 C150 128 180 138 200 150 V240 H120Z" fill="#cbd7e1" />
      <path d="M0 206 L60 160 L110 142 L200 170" fill="none" stroke="#a98a68" strokeWidth="14" />
      <path d="M0 196 L60 150 L110 132 L200 160" fill="none" stroke="#8a6c4e" strokeWidth="6" strokeDasharray="5 5" />
      <path d="M0 200 L60 154 L110 136 L200 164" fill="none" stroke="#fff" strokeWidth="2" opacity=".8" />
      <rect x="92" y="96" width="38" height="44" fill="#b99a77" />
      <path d="M104 140 V124 A7 7 0 0 1 118 124 V140Z" fill="#4d3a2a" />
      <rect x="98" y="104" width="8" height="10" fill="#4d3a2a" /><rect x="116" y="104" width="8" height="10" fill="#4d3a2a" />
      <path d={tejado(111, 98, 58, 18)} fill="#5c4a3c" />
      <path d="M94 80 Q111 76 128 80" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
      <PinoNevado x={30} y={226} s={0.9} />
      <PinoNevado x={176} y={232} s={0.75} />
    </Vin>
  ),
  // Bosquecillo de pinos nevados con farol de piedra
  () => (
    <Vin>
      <ellipse cx="100" cy="228" rx="100" ry="26" fill="#eef3f7" />
      <PinoNevado x={56} y={214} s={1.6} />
      <PinoNevado x={130} y={222} s={1.25} />
      <PinoNevado x={176} y={226} s={0.85} />
      <g>
        <rect x="88" y="196" width="10" height="26" fill="#9a958c" />
        <rect x="80" y="182" width="26" height="16" fill="#b5b0a6" />
        <rect x="88" y="186" width="10" height="8" fill="#ffd36a" />
        <path d="M76 182 L93 168 L110 182Z" fill="#8a857c" />
        <path d="M78 180 L93 168 L108 180" stroke="#fff" strokeWidth="3" fill="none" />
      </g>
    </Vin>
  ),
  // Torre de esquina de la Ciudad Prohibida sobre el foso helado
  () => (
    <Vin>
      <defs>
        <linearGradient id="mrVoro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffe08a" /><stop offset="1" stopColor="#c8901e" /></linearGradient>
      </defs>
      <rect x="0" y="206" width="200" height="34" fill="#cfe0ea" />
      <path d="M10 214 H190" stroke="#fff" strokeWidth="2" opacity=".8" />
      <rect x="16" y="150" width="168" height="56" fill="#9c2229" />
      <rect x="16" y="144" width="168" height="8" fill="url(#mrVoro)" />
      <rect x="58" y="116" width="84" height="32" fill="#a3222b" />
      {[66, 80, 94, 108, 122].map((x) => <rect key={x} x={x} y="120" width="4" height="26" fill="#7d141c" />)}
      <path d={tejado(100, 120, 130, 22)} fill="url(#mrVoro)" />
      <path d={tejado(100, 96, 100, 22)} fill="url(#mrVoro)" />
      <path d={tejado(100, 72, 64, 20)} fill="url(#mrVoro)" />
      <path d="M84 52 H116 M74 76 Q100 70 126 76" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="100" cy="48" r="4" fill="#ffe08a" />
    </Vin>
  ),
  // Templo del Cielo: tres tejados azules circulares
  () => (
    <Vin>
      <ellipse cx="100" cy="226" rx="96" ry="12" fill="#f3f1ec" />
      <ellipse cx="100" cy="214" rx="82" ry="10" fill="#e6e1d6" />
      <ellipse cx="100" cy="204" rx="68" ry="8" fill="#f3f1ec" />
      {[[58, 176, 26], [40, 136, 22], [24, 100, 20]].map(([r, y, h], k) => (
        <g key={k}>
          <rect x={100 - r * 0.72} y={y} width={r * 1.44} height={k === 0 ? 26 : 16} fill="#a3222b" />
          <path d={`M${100 - r} ${y + 2} Q100 ${y - h - 6} ${100 + r} ${y + 2} Q100 ${y + 8} ${100 - r} ${y + 2}Z`} fill="#2f4f8f" />
          <path d={`M${100 - r} ${y + 2} Q100 ${y + 8} ${100 + r} ${y + 2}`} stroke="#e3a432" strokeWidth="3" fill="none" />
          <path d={`M${100 - r * 0.6} ${y - h * 0.45} Q100 ${y - h * 0.9} ${100 + r * 0.6} ${y - h * 0.45}`} stroke="#fff" strokeWidth="2.5" fill="none" opacity=".9" />
        </g>
      ))}
      <path d="M94 82 Q100 60 106 82Z" fill="#f2c14e" />
      <circle cx="100" cy="64" r="5" fill="#ffe08a" />
    </Vin>
  ),
];
