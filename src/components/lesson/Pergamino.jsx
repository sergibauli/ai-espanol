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

function Montes() {
  return (
    <>
      <Capa nombre="lejos">
        <defs>
          <linearGradient id="fcLejos" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#a58db4" />
            <stop offset="1" stopColor="#e2b391" />
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
            <stop offset="0" stopColor="#5b4f7c" />
            <stop offset=".7" stopColor="#8a6b80" />
            <stop offset="1" stopColor="#c99a86" />
          </linearGradient>
        </defs>
        <path
          fill="url(#fcMedio)"
          d="M0 700 C40 660 70 560 120 520 C150 498 175 515 190 560 C210 615 240 640 280 630 C320 620 330 560 360 545 C395 528 420 580 450 640 C480 700 540 690 580 660 C620 630 640 600 690 610 C760 625 800 700 860 690 C920 680 960 610 1010 560 C1050 520 1080 470 1120 440 C1150 418 1185 425 1205 460 C1230 505 1250 560 1300 590 C1350 620 1400 600 1440 560 C1480 520 1510 500 1545 520 C1575 538 1590 570 1600 590 L1600 900 L0 900 Z"
        />
        {/* Pagoda de tres tejados sobre el pico de la derecha, con una ventana encendida */}
        <g fill="#3a2a4a" transform="translate(1162 372)">
          <rect x="-3" y="-40" width="6" height="18" />
          <path d="M-40 -2 Q-20 -10 -16 -22 L16 -22 Q20 -10 40 -2 Z" />
          <rect x="-13" y="-2" width="26" height="16" />
          <path d="M-48 26 Q-26 18 -20 6 L20 6 Q26 18 48 26 Z" />
          <rect x="-16" y="26" width="32" height="18" />
          <path d="M-56 56 Q-30 46 -24 34 L24 34 Q30 46 56 56 Z" />
          <rect x="-19" y="56" width="38" height="34" />
          <rect x="-5" y="66" width="10" height="16" fill="#f6c45a" />
        </g>
      </Capa>
      <Capa nombre="cerca">
        <defs>
          <linearGradient id="fcCerca" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2c1f38" />
            <stop offset="1" stopColor="#180f1e" />
          </linearGradient>
        </defs>
        <path
          fill="url(#fcCerca)"
          d="M0 760 C40 720 90 700 150 705 C210 710 240 740 300 760 C340 775 380 790 420 800 L420 900 L0 900 Z M1600 740 C1560 712 1500 690 1440 698 C1380 706 1340 735 1290 760 C1250 780 1210 795 1170 805 L1170 900 L1600 900 Z"
        />
        {/* Pinos: copas en capas sobre las rocas de los lados */}
        <g fill="#1d1426" stroke="#1d1426">
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

const LINTERNAS = [
  { x: 8, d: 26, r: -4, s: 1 },
  { x: 22, d: 32, r: -18, s: 0.7 },
  { x: 37, d: 29, r: -9, s: 0.55 },
  { x: 63, d: 34, r: -24, s: 0.6 },
  { x: 78, d: 27, r: -13, s: 0.9 },
  { x: 91, d: 31, r: -2, s: 0.65 },
];

/* Cielo del amanecer con capas en parallax: rayos de sol, nubes de oro, niebla, linternas que suben y pájaros. */
export function FondoCielo() {
  const ref = React.useRef(null);
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
    <div className="fc-cielo" ref={ref} aria-hidden="true" translate="no">
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
      <Montes />
      <div className="fc-niebla fc-niebla--1" />
      <div className="fc-niebla fc-niebla--2" />
      {LINTERNAS.map((l, i) => (
        <span key={i} className="fc-linterna" style={{ "--x": `${l.x}%`, "--d": `${l.d}s`, "--r": `${l.r}s`, "--s": l.s }}>
          <i />
        </span>
      ))}
    </div>
  );
}
