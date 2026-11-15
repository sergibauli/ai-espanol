import * as React from "react";

// Paisaje en miniatura de cada mundo para la lámina de una tarjeta de modelo (300×140).
// Determinista por semilla (número de modelo): cada tarjeta tiene su propia escena.
// Colores por variables CSS (--t1 cielo claro, --t2 cielo oscuro) definidas en dele-nivel-v2.css.
function rng(seed) {
  let s = (seed * 9301 + 49297) % 233280 || 1;
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280);
}
const W = 300;
const H = 140;

function cresta(r, base, amp, pasos = 6) {
  let d = `M0 ${H} L0 ${base}`;
  const dx = W / pasos;
  for (let i = 0; i < pasos; i++) {
    const x1 = i * dx + dx / 2;
    const y1 = base - amp * (0.4 + r() * 0.8);
    const x2 = (i + 1) * dx;
    const y2 = base - amp * r() * 0.35;
    d += ` Q${x1.toFixed(0)} ${y1.toFixed(0)} ${x2.toFixed(0)} ${y2.toFixed(0)}`;
  }
  return `${d} L${W} ${H}Z`;
}

function Bambu({ r }) {
  const tallos = Array.from({ length: 4 }, (_, i) => ({ x: 24 + i * 34 + r() * 16, w: 5 + r() * 3, h: 70 + r() * 70 }));
  return (
    <>
      <circle cx={70 + r() * 60} cy={38} r={18} fill="#fff6d8" opacity=".55" />
      <path d={cresta(r, 112, 30)} fill="rgba(255,255,255,.18)" />
      <path d={cresta(r, 128, 18)} fill="rgba(6,60,40,.35)" />
      {tallos.map((t, i) => (
        <g key={i} opacity={0.55 + i * 0.1}>
          <rect x={t.x} y={H - t.h} width={t.w} height={t.h} rx="2" fill="rgba(4,47,30,.55)" />
          {Array.from({ length: Math.floor(t.h / 22) }, (_, k) => (
            <rect key={k} x={t.x - 1} y={H - 18 - k * 22} width={t.w + 2} height="2.4" rx="1" fill="rgba(255,255,255,.35)" />
          ))}
          <path d={`M${t.x + t.w} ${H - t.h + 18} q14 -6 24 2 q-14 4 -24 -2z M${t.x} ${H - t.h + 34} q-14 -6 -22 2 q12 4 22 -2z`} fill="rgba(4,47,30,.5)" />
        </g>
      ))}
    </>
  );
}

function Linternas({ r }) {
  const tejados = Array.from({ length: 3 }, (_, i) => ({ x: i * 110 - 10 + r() * 20, w: 90 + r() * 30, y: 96 + r() * 16 }));
  const luces = Array.from({ length: 4 }, () => ({ x: 20 + r() * 150, y: 22 + r() * 40, s: 0.7 + r() * 0.5 }));
  return (
    <>
      {Array.from({ length: 10 }, (_, i) => (
        <circle key={i} cx={r() * W} cy={r() * 60} r={r() * 1.4 + 0.4} fill="#ffe7b0" opacity=".7" />
      ))}
      {tejados.map((t, i) => (
        <path key={i} d={`M${t.x} ${t.y} q${t.w / 2} -14 ${t.w} 0 l-8 6 h-${t.w - 16}z M${t.x + 10} ${t.y + 6} h${t.w - 20} V${H} h-${t.w - 20}z`} fill="rgba(40,8,4,.55)" />
      ))}
      {luces.map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) scale(${l.s})`}>
          <line x1="0" y1="-14" x2="0" y2="-8" stroke="rgba(60,20,8,.7)" />
          <ellipse cx="0" cy="4" rx="13" ry="16" fill="#ffb347" opacity=".22" />
          <ellipse cx="0" cy="3" rx="8" ry="10" fill="#e8401c" />
          <ellipse cx="-2" cy="1" rx="3" ry="5" fill="#ffd27a" opacity=".7" />
          <rect x="-5" y="-8" width="10" height="3" rx="1" fill="#f2c14e" />
          <rect x="-5" y="12" width="10" height="3" rx="1" fill="#f2c14e" />
        </g>
      ))}
    </>
  );
}

function Tinta({ r }) {
  return (
    <>
      <circle cx={60 + r() * 120} cy={30} r={14} fill="#eef4ff" opacity=".5" />
      <path d={cresta(r, 70, 40, 4)} fill="rgba(219,232,251,.18)" />
      <path d={cresta(r, 96, 44, 5)} fill="rgba(10,25,55,.35)" />
      <rect x="0" y="92" width={W} height="16" fill="rgba(219,232,251,.18)" />
      <path d={cresta(r, 124, 30, 6)} fill="rgba(8,18,40,.55)" />
      <g transform={`translate(${30 + r() * 120} 98)`} fill="rgba(8,18,40,.7)">
        <path d="M-12 0 q12 -8 24 0 l-3 3 h-18z" />
        <rect x="-7" y="3" width="2" height="10" />
        <rect x="5" y="3" width="2" height="10" />
      </g>
    </>
  );
}

function Palacio({ r }) {
  const x0 = -20 + r() * 40;
  return (
    <>
      <circle cx={70 + r() * 80} cy={36} r={20} fill="#fde68a" opacity=".55" />
      <circle cx={70 + r() * 80} cy={36} r={30} fill="#fde68a" opacity=".1" />
      {Array.from({ length: 12 }, (_, i) => (
        <circle key={i} cx={r() * W} cy={r() * 70} r={r() * 1.3 + 0.4} fill="#fde68a" opacity=".6" />
      ))}
      <g fill="rgba(20,4,40,.6)">
        <path d={`M${x0} 92 q60 -6 70 -22 q10 16 70 22 l-10 6 h-120z`} />
        <rect x={x0 + 18} y="98" width="104" height="42" />
        <path d={`M${x0 + 120} 104 q55 -5 62 -18 q8 13 62 18 l-8 5 h-108z`} />
        <rect x={x0 + 136} y="109" width="92" height="31" />
      </g>
      <g fill="rgba(200,16,46,.45)">
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={x0 + 26 + i * 20} y="104" width="5" height="36" />
        ))}
      </g>
      <rect x="0" y="132" width={W} height="8" fill="rgba(253,230,138,.25)" />
    </>
  );
}

const MUNDOS = { A1: Bambu, A2: Linternas, B1: Tinta, B2: Palacio };

export const EscenaCarta = React.memo(function EscenaCarta({ nivel, semilla }) {
  const Mundo = MUNDOS[nivel] || Bambu;
  const id = `dxc-${nivel}-${semilla}`;
  return (
    <svg className="dx-escena" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--t2)" }} />
          <stop offset="1" style={{ stopColor: "var(--t1)" }} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id})`} />
      <Mundo r={rng(semilla * 7 + nivel.charCodeAt(0) * 13 + nivel.charCodeAt(1))} />
    </svg>
  );
});
