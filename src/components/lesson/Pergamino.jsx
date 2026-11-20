import * as React from "react";

/*
 * Pergamino que se desenrolla: los dos rodillos salen juntos del centro y se separan mientras el papel se despliega;
 * el contenido aparece después con un fundido escalonado. Todo es CSS (transform/opacity) en v13-pergamino.css.
 * Para enrollarlo antes de cambiar de pantalla, el reproductor pone la clase `pg-cierra` en `.lp-root`.
 */

// Polvo de oro: posiciones fijas (sin Math.random, para que no cambie en cada render)
const POLVO = [
  [-42, -1, 0], [-30, 1, 40], [-18, -1, 90], [-6, 1, 20], [6, -1, 70], [18, 1, 10],
  [30, -1, 60], [42, 1, 30], [-36, 1, 110], [-12, -1, 130], [12, 1, 150], [36, -1, 120],
];

function Rodillo({ lado }) {
  return (
    <span className={`pg-eje pg-eje--${lado}`} aria-hidden="true">
      <span className="pg-rodillo">
        <i className="pg-rodillo__brillo" />
      </span>
    </span>
  );
}

export function Pergamino({ className = "", children }) {
  return (
    <div className={`pg-rollo ${className}`}>
      <span className="pg-papel" aria-hidden="true" />
      <span className="pg-destello" aria-hidden="true" />
      <Rodillo lado="arriba" />
      <Rodillo lado="abajo" />
      <span className="pg-polvo" aria-hidden="true">
        {POLVO.map(([x, dir, retraso], i) => (
          <i key={i} style={{ "--x": `${x}%`, "--dir": dir, "--r": `${retraso}ms` }} />
        ))}
      </span>
      <div className="pg-contenido">{children}</div>
    </div>
  );
}

/* Montes, pagoda y pinos dibujados aquí (nada de fotos ni recursos ajenos). Cada cordillera es un SVG aparte
   para que el parallax mueva capas enteras con transform (en la GPU) sin repintar el dibujo. */
function Capa({ nombre, children }) {
  return (
    <svg className={`fc-montes fc-capa fc-capa--${nombre}`} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      {children}
    </svg>
  );
}

// Colores de las cordilleras según el mundo del nivel (bambú A1, linternas A2, tinta B1, Ciudad Prohibida B2)
const PALETAS = {
  A1: { lejos: ["#a9cdb6", "#f0d6b0"], medio: ["#3f7a56", "#6fa77f", "#b9cf9c"], cerca: ["#1c4630", "#0f2a1b"], pagoda: "#24452f" },
  A2: { lejos: ["#a58db4", "#e2b391"], medio: ["#5b4f7c", "#8a6b80", "#c99a86"], cerca: ["#2c1f38", "#180f1e"], pagoda: "#3a2a4a" },
  B1: { lejos: ["#c9c4b8", "#ebe4d3"], medio: ["#5f5c58", "#8d8a83", "#c4bfb2"], cerca: ["#2a2827", "#141313"], pagoda: "#2b2928" },
  B2: { lejos: ["#c58f78", "#f0c28e"], medio: ["#6a2333", "#9a4a3f", "#d4875c"], cerca: ["#3b0d16", "#1f060b"], pagoda: "#4a0f19" },
};

function Montes({ mundo = "A2" }) {
  const c = PALETAS[mundo] || PALETAS.A2;
  return (
    <>
      <Capa nombre="lejos">
        <defs>
          <linearGradient id="fcLejos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={c.lejos[0]} />
            <stop offset="1" stopColor={c.lejos[1]} />
          </linearGradient>
        </defs>
        <path
          fill="url(#fcLejos)"
          opacity=".8"
          d="M0 600 C90 560 150 520 230 535 C300 548 330 480 400 470 C470 460 500 530 570 540 C650 552 690 470 760 455 C830 440 880 520 950 530 C1030 541 1070 460 1150 450 C1230 440 1270 520 1340 528 C1420 536 1470 480 1530 485 C1570 488 1590 500 1600 505 L1600 900 L0 900 Z"
        />
      </Capa>
      <Capa nombre="medio">
        <defs>
          <linearGradient id="fcMedio" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={c.medio[0]} />
            <stop offset=".7" stopColor={c.medio[1]} />
            <stop offset="1" stopColor={c.medio[2]} />
          </linearGradient>
        </defs>
        <path
          fill="url(#fcMedio)"
          d="M0 700 C40 660 70 560 120 520 C150 498 175 515 190 560 C210 615 240 640 280 630 C320 620 330 560 360 545 C395 528 420 580 450 640 C480 700 540 690 580 660 C620 630 640 600 690 610 C760 625 800 700 860 690 C920 680 960 610 1010 560 C1050 520 1080 470 1120 440 C1150 418 1185 425 1205 460 C1230 505 1250 560 1300 590 C1350 620 1400 600 1440 560 C1480 520 1510 500 1545 520 C1575 538 1590 570 1600 590 L1600 900 L0 900 Z"
        />
        {/* Pagoda de tres tejados sobre el pico de la derecha, con una ventana encendida (en B2, un palacio) */}
        {mundo === "B2" ? (
          <g fill={c.pagoda} transform="translate(1150 392)">
            <path d="M-120 -6 Q-70 -18 -56 -40 L56 -40 Q70 -18 120 -6 Z" />
            <rect x="-92" y="-6" width="184" height="12" />
            <path d="M-100 22 Q-60 12 -50 -2 L50 -2 Q60 12 100 22 Z" />
            <rect x="-84" y="22" width="168" height="70" />
            <path d="M-14 92 V58 Q0 44 14 58 V92 Z" fill="#f6c45a" />
            <rect x="-62" y="40" width="10" height="14" fill="#f6c45a" />
            <rect x="52" y="40" width="10" height="14" fill="#f6c45a" />
          </g>
        ) : (
        <g fill={c.pagoda} transform="translate(1162 372)">
          <rect x="-3" y="-40" width="6" height="18" />
          <path d="M-40 -2 Q-20 -10 -16 -22 L16 -22 Q20 -10 40 -2 Z" />
          <rect x="-13" y="-2" width="26" height="16" />
          <path d="M-48 26 Q-26 18 -20 6 L20 6 Q26 18 48 26 Z" />
          <rect x="-16" y="26" width="32" height="18" />
          <path d="M-56 56 Q-30 46 -24 34 L24 34 Q30 46 56 56 Z" />
          <rect x="-19" y="56" width="38" height="34" />
          <rect x="-5" y="66" width="10" height="16" fill="#f6c45a" />
        </g>
        )}
      </Capa>
      <Capa nombre="cerca">
        <defs>
          <linearGradient id="fcCerca" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={c.cerca[0]} />
            <stop offset="1" stopColor={c.cerca[1]} />
          </linearGradient>
        </defs>
        <path
          fill="url(#fcCerca)"
          d="M0 760 C40 720 90 700 150 705 C210 710 240 740 300 760 C340 775 380 790 420 800 L420 900 L0 900 Z M1600 740 C1560 712 1500 690 1440 698 C1380 706 1340 735 1290 760 C1250 780 1210 795 1170 805 L1170 900 L1600 900 Z"
        />
        {/* Pinos: copas en capas sobre las rocas de los lados */}
        <g fill={c.cerca[1]} stroke={c.cerca[1]}>
          <path d="M120 712 L118 640" strokeWidth="6" fill="none" />
          <ellipse cx="100" cy="650" rx="46" ry="12" />
          <ellipse cx="135" cy="628" rx="40" ry="11" />
          <ellipse cx="112" cy="607" rx="30" ry="9" />
          <path d="M1480 700 L1476 616" strokeWidth="6" fill="none" />
          <ellipse cx="1500" cy="622" rx="50" ry="13" />
          <ellipse cx="1462" cy="600" rx="40" ry="11" />
          <ellipse cx="1488" cy="580" rx="30" ry="9" />
        </g>
      </Capa>
    </>
  );
}

/* Bambú en primer plano (A1): cañas a los dos lados, pegadas al borde, que se mecen */
const CANAS = [
  { x: 40, h: 0, g: 26 },
  { x: 100, h: 90, g: 20 },
  { x: 150, h: 200, g: 15 },
];
function Bambu({ lado }) {
  return (
    <svg className={`fc-bambu fc-bambu--${lado}`} viewBox="0 0 300 900" preserveAspectRatio={lado === "izq" ? "xMinYMax meet" : "xMaxYMax meet"} aria-hidden="true" style={lado === "der" ? { scale: "-1 1" } : undefined}>
      <defs>
        <linearGradient id={`fcBambu${lado}`} x1="0" x2="1">
          <stop offset="0" stopColor="#1d5c37" />
          <stop offset=".45" stopColor="#5fbf83" />
          <stop offset="1" stopColor="#174a2c" />
        </linearGradient>
      </defs>
      {CANAS.map((c, i) => (
        <g key={i} className="fc-cana" style={{ transformOrigin: `${c.x}px 900px`, animationDelay: `${i * -0.9 + (lado === "der" ? -2 : 0)}s` }}>
          <rect x={c.x} y={c.h} width={c.g} height={900 - c.h} rx={c.g / 3} fill={`url(#fcBambu${lado})`} />
          {[1, 2, 3, 4, 5, 6].map((k) => (
            <rect key={k} x={c.x - 2} y={c.h + k * 120} width={c.g + 4} height="6" rx="3" fill="#123d24" />
          ))}
          <path d={`M${c.x + c.g} ${c.h + 150} q60 -30 110 -8 q-60 8 -110 22z`} fill="#2f8f52" />
          <path d={`M${c.x} ${c.h + 270} q-40 -26 -70 -2 q36 6 70 16z`} fill="#3fae68" />
          <path d={`M${c.x + c.g} ${c.h + 390} q52 -34 96 -18 q-50 10 -96 30z`} fill="#257a45" />
        </g>
      ))}
    </svg>
  );
}

/* Guirnalda de farolillos colgada arriba (A2 y B2) */
function Guirnalda() {
  return (
    <svg className="fc-guirnalda" viewBox="0 0 1600 140" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
      <path d="M-20 18 Q400 92 800 30 T1620 22" fill="none" stroke="#5a1a0c" strokeWidth="3" />
      {[90, 260, 430, 610, 800, 990, 1170, 1350, 1520].map((x, i) => {
        const y = 18 + Math.sin((x / 1600) * Math.PI * 2.1) * -28 + (x < 800 ? (x / 800) * 40 : ((1600 - x) / 800) * 20);
        return (
          <g key={x} className="fc-farol" style={{ transformOrigin: `${x}px ${y}px`, animationDelay: `${i * -0.45}s` }}>
            <line x1={x} y1={y} x2={x} y2={y + 14} stroke="#5a1a0c" strokeWidth="2" />
            <rect x={x - 6} y={y + 12} width="12" height="5" rx="1" fill="#c8961e" />
            <ellipse cx={x} cy={y + 36} rx="20" ry="22" fill="#c8102e" />
            <ellipse cx={x} cy={y + 36} rx="11" ry="21" fill="#ff5a4a" opacity=".55" />
            <rect x={x - 6} y={y + 56} width="12" height="5" rx="1" fill="#c8961e" />
            <path d={`M${x - 4} ${y + 61} h8 l-1 16 h-6z`} fill="#f2c14e" />
          </g>
        );
      })}
    </svg>
  );
}

const LINTERNAS = [
  { x: 8, d: 26, r: -4, s: 1 },
  { x: 22, d: 32, r: -18, s: 0.7 },
  { x: 37, d: 29, r: -9, s: 0.55 },
  { x: 63, d: 34, r: -24, s: 0.6 },
  { x: 78, d: 27, r: -13, s: 0.9 },
  { x: 91, d: 31, r: -2, s: 0.65 },
];

/* Cielo del amanecer con capas en parallax: rayos de sol, nubes de oro, niebla, linternas que suben y pájaros. */
export const FondoCielo = React.memo(function FondoCielo({ mundo = "A2", progreso = 0, paso = 0 }) {
  const ref = React.useRef(null);
  // Giroscopio en móviles (Android lo da sin pedir permiso; en iPhone se queda quieto)
  React.useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: fine)").matches || typeof DeviceOrientationEvent === "undefined" || typeof DeviceOrientationEvent.requestPermission === "function") return;
    let pendiente = 0;
    let base = null;
    const girar = (e) => {
      if (e.gamma == null) return;
      base ??= { g: e.gamma, b: e.beta };
      const x = Math.max(-1, Math.min(1, (e.gamma - base.g) / 25)) / 2;
      const y = Math.max(-1, Math.min(1, (e.beta - base.b) / 25)) / 2;
      if (pendiente) return;
      pendiente = requestAnimationFrame(() => {
        pendiente = 0;
        el.style.setProperty("--px", x.toFixed(3));
        el.style.setProperty("--py", y.toFixed(3));
      });
    };
    window.addEventListener("deviceorientation", girar, { passive: true });
    return () => {
      window.removeEventListener("deviceorientation", girar);
      cancelAnimationFrame(pendiente);
    };
  }, []);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(pointer: fine)").matches) return;
    let pendiente = 0;
    let x = 0;
    let y = 0;
    const mover = (e) => {
      x = e.clientX / window.innerWidth - 0.5;
      y = e.clientY / window.innerHeight - 0.5;
      if (pendiente) return;
      pendiente = requestAnimationFrame(() => {
        pendiente = 0;
        el.style.setProperty("--px", x.toFixed(3));
        el.style.setProperty("--py", y.toFixed(3));
      });
    };
    window.addEventListener("pointermove", mover, { passive: true });
    return () => {
      window.removeEventListener("pointermove", mover);
      cancelAnimationFrame(pendiente);
    };
  }, []);
  return (
    <div
      className={`fc-cielo fc-mundo-${mundo}`}
      ref={ref}
      aria-hidden="true"
      translate="no"
      // --prog (0–1): la luz sube con la lección; --deriva (−1…1): cada paso desplaza un poco las capas (cambio de escena)
      style={{ "--prog": (progreso / 100).toFixed(3), "--deriva": (((paso % 5) - 2) / 2).toFixed(2) }}
    >
      <div className="fc-luz" />
      <div className="fc-sol" />
      <div className="fc-rayos" />
      <div className="fc-nube fc-nube--1" />
      <div className="fc-nube fc-nube--2" />
      <div className="fc-nube fc-nube--3" />
      <svg className="fc-pajaros" viewBox="0 0 120 40">
        {[
          [10, 20],
          [34, 10],
          [52, 24],
          [76, 14],
          [96, 28],
        ].map(([px, py], i) => (
          <path key={i} className="fc-pajaro" style={{ animationDelay: `${i * -0.17}s` }} d={`M${px - 7} ${py - 3} Q${px - 3} ${py - 5} ${px} ${py} Q${px + 3} ${py - 5} ${px + 7} ${py - 3}`} />
        ))}
      </svg>
      <Montes mundo={mundo} />
      {mundo === "A1" && (
        <>
          <Bambu lado="izq" />
          <Bambu lado="der" />
        </>
      )}
      {(mundo === "A2" || mundo === "B2") && <Guirnalda />}
      <div className="fc-niebla fc-niebla--1" />
      <div className="fc-niebla fc-niebla--2" />
      {LINTERNAS.map((l, i) => (
        <span key={i} className="fc-linterna" style={{ "--x": `${l.x}%`, "--d": `${l.d}s`, "--r": `${l.r}s`, "--s": l.s }}>
          <i />
        </span>
      ))}
    </div>
  );
});
