import * as React from "react";
import { Capa, Vin, n, tejado, PinoNevado, CAMELLO, Palmera, karst, Banderas } from "./piezas.jsx";
import "../../../styles/v14-ruta-B1.css";

// ---------- B1 · El este de China: anochecer en Shanghái y los canales de Suzhou ----------
export function Panorama() {
  const edificios = [
    [300, 640, 26], [330, 660, 20], [352, 620, 22], [376, 650, 24], [404, 600, 18], [430, 630, 22],
    [640, 630, 24], [668, 600, 20], [692, 650, 26], [722, 610, 22], [748, 640, 24], [776, 620, 24],
    [0, 668, 30], [34, 650, 22], [60, 676, 28], [92, 660, 24], [120, 680, 30], [154, 664, 24], [182, 684, 30], [216, 670, 28], [248, 686, 30],
  ];
  return (
    <>
      <Capa clase="mr-lejos">
        <defs>
          <pattern id="mrB1ven" width="8" height="10" patternUnits="userSpaceOnUse"><rect x="2" y="2" width="3" height="4" fill="#ffd97a" opacity=".85" /></pattern>
          <linearGradient id="mrB1torre" x1="0" x2="1"><stop offset="0" stopColor="#3a5a86" /><stop offset="1" stopColor="#1c2f52" /></linearGradient>
        </defs>
        {Array.from({ length: 26 }, (_, i) => (
          <circle key={i} cx={(i * 137) % 800} cy={40 + ((i * 89) % 420)} r={i % 4 ? 1.2 : 2} fill="#fff6d8" opacity={0.5 + (i % 3) * 0.2} />
        ))}
        <circle cx="610" cy="190" r="70" fill="#fff3cf" opacity=".12" />
        <path d="M640 160 A44 44 0 1 0 642 222 A36 36 0 1 1 640 160Z" fill="#fff3cf" />
        <g fill="#1a2a4c">
          {edificios.map(([x, y, w]) => (
            <rect key={x} x={x} y={y} width={w} height={720 - y} />
          ))}
        </g>
        <g fill="url(#mrB1ven)">
          {edificios.map(([x, y, w]) => (
            <rect key={x} x={x} y={y + 6} width={w} height={714 - y} />
          ))}
        </g>
        {/* Torres de Lujiazui: Jin Mao, Torre de Shanghái, WFC y la Perla de Oriente */}
        <path d="M516 720 L518 556 L524 540 L527 520 L530 540 L536 556 L538 720Z" fill="url(#mrB1torre)" />
        <path d="M552 720 L554 512 Q561 494 572 488 L576 720Z" fill="url(#mrB1torre)" />
        <path d="M594 720 L596 530 L612 524 L614 720Z" fill="url(#mrB1torre)" />
        <rect x="600" y="534" width="8" height="10" fill="#2a3f6e" />
        <path d="M554 520 L572 500 M556 560 L574 548" stroke="#9fd0ff" strokeWidth="1.2" opacity=".7" />
        <g>
          <path d="M470 720 L476 676 M490 720 L484 676 M480 720 V500" stroke="#c9d6ec" strokeWidth="4" />
          <circle cx="480" cy="664" r="18" fill="#e04c86" />
          <circle cx="474" cy="658" r="6" fill="#ffb4d0" opacity=".8" />
          <rect x="476" y="610" width="8" height="40" fill="#c9d6ec" />
          <circle cx="480" cy="600" r="11" fill="#e04c86" />
          <circle cx="480" cy="572" r="5" fill="#ff8fb8" />
          <circle cx="480" cy="498" r="2.5" fill="#ff5a5a" />
        </g>
        <rect x="0" y="718" width="800" height="300" fill="#0d2740" />
      </Capa>
      <Capa clase="mr-medio">
        {/* Reflejo de las luces del Bund en el río */}
        {[[310, 30], [400, 22], [480, 40], [525, 26], [563, 34], [604, 22], [700, 30], [760, 24], [80, 26], [180, 30]].map(([x, h], i) => (
          <rect key={i} x={x} y={726 + (i % 3) * 4} width={i % 3 ? 5 : 8} height={h} rx="2" fill={i === 2 ? "#ff7fae" : "#ffd97a"} opacity=".55" />
        ))}
      </Capa>
      <Capa clase="mr-cerca">
        {/* Casas de Suzhou: muros blancos, tejas negras y frontones escalonados */}
        {[[0, 120], [124, 104], [580, 110], [690, 110]].map(([x, w], i) => (
          <g key={x}>
            <rect x={x} y={812 - (i % 2) * 14} width={w} height={70 + (i % 2) * 14} fill="#ece6d8" />
            <path d={`M${x - 6} ${812 - (i % 2) * 14} L${x + w / 2} ${780 - (i % 2) * 14} L${x + w + 6} ${812 - (i % 2) * 14}Z`} fill="#2a2f3a" />
            <path d={`M${x + 4} ${792 - (i % 2) * 14} h12 v-10 h12 v-8 h${w - 56} v8 h12 v10 h12`} fill="none" stroke="#2a2f3a" strokeWidth="5" />
            <rect x={x + w * 0.3} y={840 - (i % 2) * 6} width="18" height="22" fill="#3b2a22" />
            <rect x={x + w * 0.62} y={836} width="14" height="14" fill="#ffcf6a" opacity=".85" />
          </g>
        ))}
        <rect x="0" y="880" width="800" height="220" fill="#123552" />
        {/* Puente en arco con su reflejo formando un círculo */}
        <path d="M250 884 Q400 784 550 884 L550 896 L250 896Z" fill="#d8d0bf" />
        <path d="M318 896 A82 82 0 0 1 482 896Z" fill="#0d2740" />
        <path d="M318 896 A82 82 0 0 0 482 896" fill="none" stroke="#d8d0bf" strokeWidth="9" opacity=".35" />
        <path d="M262 878 Q400 790 538 878" fill="none" stroke="#a89e8a" strokeWidth="2" strokeDasharray="6 5" />
        {/* Farolillos bajo los aleros */}
        {[[40, 826], [170, 812], [622, 826], [740, 812]].map(([x, y]) => (
          <g key={x}>
            <path d={`M${x} ${y - 12} V${y - 6}`} stroke="#2a2f3a" strokeWidth="1.5" />
            <ellipse cx={x} cy={y} rx="8" ry="9" fill="#e0302f" />
            <ellipse cx={x} cy={y} rx="12" ry="12" fill="#ff8a3c" opacity=".25" />
          </g>
        ))}
        {/* Lotos */}
        {[[90, 960], [190, 990], [640, 970], [730, 948]].map(([x, y], i) => (
          <g key={x}>
            <ellipse cx={x} cy={y} rx="26" ry="8" fill="#2f7a4f" />
            <path d={`M${x} ${y} L${x + 22} ${y - 3}`} stroke="#1f5a38" strokeWidth="1.5" />
            {i % 2 === 0 && <path d={`M${x + 6} ${y - 4} q-8 -14 4 -22 q12 8 4 22z M${x + 6} ${y - 4} q-14 -6 -12 -16 q10 2 12 16z M${x + 6} ${y - 4} q14 -6 12 -16 q-10 2 -12 16z`} fill="#f59ab8" />}
          </g>
        ))}
      </Capa>
    </>
  );
}

export function Ambiente() {
  return (
    <div className="mr-particulas">
      <div className="mr-px3">
      <div className="mr-barca">
        <svg viewBox="0 0 160 70" aria-hidden="true">
          <path d="M4 44 Q80 66 156 40 L146 52 Q80 70 14 54Z" fill="#1d1712" />
          <path d="M48 44 Q80 18 112 42Z" fill="#2c241c" />
          <path d="M52 42 Q80 22 108 40" stroke="#6d5a42" strokeWidth="2" fill="none" />
          <path d="M132 40 L128 20" stroke="#1d1712" strokeWidth="3" />
          <circle cx="128" cy="16" r="5" fill="#1d1712" />
          <path d="M118 12 L138 12 L128 4Z" fill="#a2875a" />
          <path d="M130 24 L150 66" stroke="#6d5a42" strokeWidth="2" />
          <circle cx="40" cy="36" r="5" fill="#ff5b3a" /><circle cx="40" cy="36" r="10" fill="#ffb25a" opacity=".3" />
        </svg>
      </div>
      </div>
      {n(10).map((i) => (
        <span key={i} className="mr-linterna" style={{ left: `${(i * 41 + 7) % 100}%`, "--t": `${16 + (i % 4) * 4}s`, "--d": `${-((i * 2.9) % 20)}s`, "--s": 0.6 + (i % 3) * 0.25 }} />
      ))}
      {[["9%", "72%"], ["30%", "66%"], ["70%", "71%"], ["90%", "66%"]].map(([left, top], i) => (
        <span key={i} className="mr-reflejo" style={{ left, top, "--d": `${-i * 0.9}s` }} />
      ))}
    </div>
  );
}

// Viñetas a los lados del camino (200 × 240)
export const VINETAS = [
  // Puente en arco de Suzhou con reflejo
  () => (
    <Vin>
      <rect x="0" y="150" width="200" height="90" fill="#174463" />
      <path d="M0 152 Q100 64 200 152 V164 H0Z" fill="#d8d0bf" />
      <path d="M38 164 A62 62 0 0 1 162 164Z" fill="#174463" />
      <path d="M38 164 A62 62 0 0 0 162 164" fill="none" stroke="#d8d0bf" strokeWidth="8" opacity=".35" />
      <path d="M10 146 Q100 72 190 146" fill="none" stroke="#a89e8a" strokeWidth="2" strokeDasharray="5 4" />
      <path d="M20 200 H70 M120 214 H180 M60 226 H110" stroke="#6fb2d6" strokeWidth="2" opacity=".6" />
    </Vin>
  ),
  // Barca de toldo negro con el barquero
  () => (
    <Vin anima="balanceo">
      <rect x="0" y="176" width="200" height="64" fill="#174463" opacity=".9" />
      <path d="M10 176 Q100 206 190 172 L178 188 Q100 210 22 192Z" fill="#1d1712" />
      <path d="M60 176 Q100 140 140 174Z" fill="#2c241c" />
      <path d="M66 174 Q100 146 134 172" stroke="#6d5a42" strokeWidth="2" fill="none" />
      <path d="M164 172 L160 140" stroke="#1d1712" strokeWidth="5" />
      <circle cx="160" cy="134" r="7" fill="#1d1712" />
      <path d="M146 128 L174 128 L160 118Z" fill="#a2875a" />
      <path d="M162 146 L190 236" stroke="#6d5a42" strokeWidth="2.5" />
      <circle cx="50" cy="164" r="7" fill="#ff5b3a" /><circle cx="50" cy="164" r="14" fill="#ffb25a" opacity=".3" />
      <path d="M30 214 Q100 226 170 212" stroke="#6fb2d6" strokeWidth="2" fill="none" opacity=".6" />
    </Vin>
  ),
  // Estanque de lotos
  () => (
    <Vin>
      <ellipse cx="100" cy="200" rx="100" ry="40" fill="#174463" />
      {[[50, 196, 30], [130, 186, 26], [100, 222, 34], [168, 214, 22]].map(([x, y, r]) => (
        <g key={x}>
          <ellipse cx={x} cy={y} rx={r} ry={r * 0.32} fill="#2f8a57" />
          <path d={`M${x} ${y} L${x + r * 0.9} ${y - 2}`} stroke="#1f5a38" strokeWidth="1.5" />
        </g>
      ))}
      {[[62, 186], [138, 176], [112, 212]].map(([x, y]) => (
        <g key={x}>
          <path d={`M${x} ${y} q-12 -20 6 -34 q18 14 6 34z`} fill="#f7a8c4" />
          <path d={`M${x + 6} ${y} q-22 -8 -20 -24 q14 4 20 24z M${x + 6} ${y} q22 -8 20 -24 q-14 4 -20 24z`} fill="#ef7fa6" />
          <circle cx={x + 6} cy={y - 8} r="3" fill="#ffd36a" />
        </g>
      ))}
    </Vin>
  ),
  // Casa con farolillos que se reflejan en el canal
  () => (
    <Vin>
      <rect x="20" y="96" width="160" height="80" fill="#ece6d8" />
      <path d="M8 98 L100 62 L192 98Z" fill="#2a2f3a" />
      <path d="M14 82 h20 v-12 h20 v-10 h92 v10 h20 v12 h20" fill="none" stroke="#2a2f3a" strokeWidth="6" />
      <rect x="80" y="130" width="40" height="46" fill="#3b2a22" />
      <rect x="34" y="118" width="26" height="22" fill="#ffcf6a" />
      <rect x="140" y="118" width="26" height="22" fill="#ffcf6a" />
      <rect x="0" y="176" width="200" height="64" fill="#174463" />
      {[48, 152].map((x) => (
        <g key={x}>
          <path d={`M${x} 98 V108`} stroke="#2a2f3a" strokeWidth="1.5" />
          <ellipse cx={x} cy="118" rx="10" ry="12" fill="#e0302f" />
          <rect x={x - 4} y="105" width="8" height="3" fill="#f2c14e" />
          <ellipse className="mr-vin-reflejo" cx={x} cy="206" rx="9" ry="16" fill="#ff6a4a" opacity=".45" />
        </g>
      ))}
    </Vin>
  ),
  // Perla de Oriente encendida
  () => (
    <Vin>
      <rect x="0" y="196" width="200" height="44" fill="#174463" />
      <path d="M86 196 L94 150 M114 196 L106 150 M100 196 V20" stroke="#c9d6ec" strokeWidth="5" />
      <circle cx="100" cy="140" r="24" fill="#e04c86" />
      <circle cx="92" cy="132" r="8" fill="#ffb4d0" opacity=".8" />
      <rect x="95" y="80" width="10" height="44" fill="#c9d6ec" />
      <circle cx="100" cy="70" r="15" fill="#e04c86" />
      <circle cx="100" cy="36" r="7" fill="#ff8fb8" />
      <circle className="mr-vin-reflejo" cx="100" cy="14" r="3" fill="#ff5a5a" />
      <path d="M60 210 H140 M76 222 H124" stroke="#ff7fae" strokeWidth="3" opacity=".5" />
    </Vin>
  ),
];
