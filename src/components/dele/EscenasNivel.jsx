import * as React from "react";

// Escenarios de cada nivel DELE (SVG en línea, sin imágenes): jardín de bambú, festival de linternas,
// montañas de tinta y Ciudad Prohibida. Los usan la página de cada nivel y la portada DELE.
function EscenaA1() {
  return (
    <svg className="dn-escena" viewBox="0 0 1200 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="a1cielo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd9c7" />
          <stop offset=".55" stopColor="#ffeede" />
          <stop offset="1" stopColor="#d8f5e4" />
        </linearGradient>
        <radialGradient id="a1sol" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#fff6d8" />
          <stop offset=".6" stopColor="#ffc98a" />
          <stop offset="1" stopColor="#ffc98a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="a1bambu" x1="0" x2="1">
          <stop offset="0" stopColor="#2f8f52" />
          <stop offset=".5" stopColor="#7fd1a0" />
          <stop offset="1" stopColor="#1d6339" />
        </linearGradient>
      </defs>
      <rect width="1200" height="420" fill="url(#a1cielo)" />
      <circle cx="860" cy="150" r="130" fill="url(#a1sol)" />
      <path d="M0 300 C160 230 300 260 430 220 S700 250 820 210 S1060 240 1200 200 V420 H0Z" fill="#a8dcc0" opacity=".7" />
      <path d="M0 340 C200 290 380 330 560 300 S880 320 1200 280 V420 H0Z" fill="#6cbf90" opacity=".8" />
      <path d="M0 380 C260 350 520 380 760 360 S1040 370 1200 350 V420 H0Z" fill="#2f8f52" />
      {[40, 95, 150, 1040, 1100, 1160].map((x, i) => (
        <g key={x} className="dn-bambu" style={{ animationDelay: `${i * 0.4}s`, transformOrigin: `${x}px 420px` }}>
          <rect x={x} y={20 + (i % 3) * 30} width="18" height="420" rx="6" fill="url(#a1bambu)" />
          {[90, 170, 250, 330].map((y) => (
            <rect key={y} x={x - 2} y={y + (i % 3) * 20} width="22" height="5" rx="2" fill="#1d6339" />
          ))}
          <path d={`M${x + 18} ${120 + i * 9} q40 -20 70 -6 q-40 6 -70 16z`} fill="#3fae68" />
          <path d={`M${x} ${200 + i * 7} q-42 -18 -70 -2 q40 4 70 12z`} fill="#2f8f52" />
        </g>
      ))}
    </svg>
  );
}
function EscenaA2() {
  return (
    <svg className="dn-escena" viewBox="0 0 1200 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="a2cielo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a0b2e" />
          <stop offset=".6" stopColor="#5b1a3a" />
          <stop offset="1" stopColor="#c2410c" />
        </linearGradient>
        <radialGradient id="a2luz" cx=".5" cy=".4" r=".6">
          <stop offset="0" stopColor="#ffe08a" />
          <stop offset=".5" stopColor="#f97316" />
          <stop offset="1" stopColor="#9a1d0c" />
        </radialGradient>
      </defs>
      <rect width="1200" height="420" fill="url(#a2cielo)" />
      {Array.from({ length: 40 }, (_, i) => (
        <circle key={i} cx={(i * 137) % 1200} cy={(i * 53) % 220} r={(i % 3) * 0.7 + 0.6} fill="#ffe7b0" opacity={0.3 + (i % 5) * 0.12} />
      ))}
      <path d="M0 330 L80 330 L110 300 L210 300 L240 330 L300 330 L300 420 L0 420Z M330 340 L380 340 L420 290 L560 290 L600 340 L660 340 L660 420 L330 420Z M700 335 L760 335 L790 305 L900 305 L930 335 L990 335 L990 420 L700 420Z M1010 345 L1060 345 L1090 312 L1170 312 L1200 340 L1200 420 L1010 420Z" fill="#12061f" />
      <path d="M0 360 H1200 V420 H0Z" fill="#0a0414" />
      {[[150, 270], [470, 255], [830, 268], [1110, 280]].map(([x, y]) => (
        <g key={x}>
          <line x1={x} y1={y - 40} x2={x} y2={y - 14} stroke="#3b1a0c" strokeWidth="2" />
          <ellipse cx={x} cy={y} rx="16" ry="20" fill="url(#a2luz)" />
          <rect x={x - 9} y={y - 22} width="18" height="5" rx="2" fill="#f2c14e" />
          <rect x={x - 9} y={y + 17} width="18" height="5" rx="2" fill="#f2c14e" />
        </g>
      ))}
    </svg>
  );
}
function EscenaB1() {
  return (
    <svg className="dn-escena" viewBox="0 0 1200 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="b1cielo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1d3a" />
          <stop offset=".7" stopColor="#2d4f86" />
          <stop offset="1" stopColor="#8fb3df" />
        </linearGradient>
        <linearGradient id="b1niebla" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dbe8fb" stopOpacity="0" />
          <stop offset="1" stopColor="#dbe8fb" stopOpacity=".7" />
        </linearGradient>
      </defs>
      <rect width="1200" height="420" fill="url(#b1cielo)" />
      <circle cx="300" cy="110" r="62" fill="#f8f4e3" />
      <circle cx="300" cy="110" r="90" fill="#f8f4e3" opacity=".12" />
      <path d="M0 260 L120 150 L200 210 L330 90 L460 230 L560 170 L700 250 L820 120 L960 230 L1080 160 L1200 240 V420 H0Z" fill="#3a5f98" opacity=".55" />
      <path d="M0 300 L150 200 L260 270 L400 170 L540 290 L680 210 L800 300 L930 190 L1060 280 L1200 220 V420 H0Z" fill="#1f3c6b" opacity=".85" />
      <rect y="250" width="1200" height="120" fill="url(#b1niebla)" className="dn-niebla" />
      <path d="M0 360 L180 290 L330 350 L520 280 L700 360 L880 300 L1040 350 L1200 300 V420 H0Z" fill="#0d213f" />
      {[[820, 90], [870, 70], [910, 100]].map(([x, y], i) => (
        <path key={i} className="dn-grulla" style={{ animationDelay: `${i * 0.6}s` }} d={`M${x} ${y} q12 -10 24 0 q12 -10 24 0`} stroke="#e8eefb" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      ))}
    </svg>
  );
}
function EscenaB2() {
  return (
    <svg className="dn-escena" viewBox="0 0 1200 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="b2cielo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b0633" />
          <stop offset=".6" stopColor="#4c1d95" />
          <stop offset="1" stopColor="#a16207" />
        </linearGradient>
        <linearGradient id="b2oro" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fde68a" />
          <stop offset="1" stopColor="#b45309" />
        </linearGradient>
        <pattern id="b2escamas" width="28" height="16" patternUnits="userSpaceOnUse">
          <path d="M0 16 A14 14 0 0 1 28 16" fill="none" stroke="#fde68a" strokeOpacity=".12" strokeWidth="1.4" />
        </pattern>
      </defs>
      <rect width="1200" height="420" fill="url(#b2cielo)" />
      <rect width="1200" height="420" fill="url(#b2escamas)" />
      <path d="M300 250 Q600 130 900 250" stroke="#fde68a" strokeOpacity=".25" strokeWidth="60" fill="none" className="dn-aurora" />
      <g fill="#120320">
        <path d="M330 300 L420 260 L780 260 L870 300 L840 300 L840 330 L360 330 L360 300Z" />
        <path d="M300 300 Q600 250 900 300 L900 308 Q600 262 300 308Z" fill="url(#b2oro)" />
        <rect x="380" y="330" width="440" height="40" />
        {[400, 470, 540, 610, 680, 750].map((x) => (
          <rect key={x} x={x} y="335" width="22" height="35" fill="#7c2d12" />
        ))}
        <path d="M250 370 H950 L1000 400 H200Z" />
        <path d="M0 395 H1200 V420 H0Z" />
      </g>
      <path d="M600 250 l10 -26 l10 26z" fill="url(#b2oro)" />
    </svg>
  );
}
export const ESCENAS = { A1: EscenaA1, A2: EscenaA2, B1: EscenaB1, B2: EscenaB2 };
