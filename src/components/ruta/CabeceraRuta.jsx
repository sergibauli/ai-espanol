import * as React from "react";

/*
  v22 · Cabecera de la Ruta: «dos dragones juegan con la perla» (二龙戏珠) sobre un dintel de laca, y cuatro tablillas
  de nivel, cada una con su mundo (v25: A1 Pekín nevado, A2 dunas, B1 agua y tinta, B2 karst y niebla).
  Los dragones nacen de nubes de oro: así se ven enteros, sin cortes contra el borde del pergamino.
  Todo se anima con transform/opacity y se detiene con prefers-reduced-motion (v22-ruta.css).
*/

export const MUNDO_NIVEL = {
  A1: { es: "Pekín nevado", zh: "雪中北京", c: "#1f9a5c", d: "#0d4a2b", luz: "#b8f5cf" },
  A2: { es: "Dunas al atardecer", zh: "大漠落日", c: "#e2541e", d: "#7d1a08", luz: "#ffd58a" },
  B1: { es: "Agua y tinta", zh: "江南水墨", c: "#2f5fb3", d: "#0f2350", luz: "#cfe0ff" },
  B2: { es: "Karst y niebla", zh: "山水云雾", c: "#7a3fd0", d: "#2c0f5c", luz: "#fde68a" },
};

// Mini-escenas de cada tablilla (200×90, se recortan con la tablilla)
function EscenaA1() {
  return (
    <svg className="rh-escena" viewBox="0 0 200 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="200" height="90" fill="url(#rhA1cielo)" />
      <defs>
        <linearGradient id="rhA1cielo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9fff1" />
          <stop offset="1" stopColor="#9fdcb7" />
        </linearGradient>
      </defs>
      {[
        [14, 0.9],
        [40, 1.1],
        [150, 1],
        [176, 0.85],
        [192, 1.05],
      ].map(([x, s], k) => (
        <g key={x} className="rh-bambu" style={{ "--k": k, transformOrigin: `${x}px 90px` }}>
          <rect x={x - 3 * s} y="-4" width={6 * s} height="96" rx="2" fill={k % 2 ? "#2f8f52" : "#3fae68"} />
          {[14, 34, 54, 74].map((y) => (
            <rect key={y} x={x - 3.6 * s} y={y} width={7.2 * s} height="2.2" rx="1" fill="#1d6339" />
          ))}
          <path
            d={`M${x} ${20 + k * 6} q14 -8 26 -2 q-14 6 -26 2Z M${x} ${44 + k * 3} q-14 -8 -24 0 q12 5 24 0Z`}
            fill="#2f8f52"
          />
        </g>
      ))}
    </svg>
  );
}
function EscenaA2() {
  return (
    <svg className="rh-escena" viewBox="0 0 200 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="rhA2cielo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5b1406" />
          <stop offset="1" stopColor="#c0441a" />
        </linearGradient>
        <radialGradient id="rhA2luz" cx=".5" cy=".45" r=".6">
          <stop offset="0" stopColor="#ffe9a0" />
          <stop offset=".45" stopColor="#f2541e" />
          <stop offset="1" stopColor="#8f1608" />
        </radialGradient>
      </defs>
      <rect width="200" height="90" fill="url(#rhA2cielo)" />
      <path d="M-4 10 Q50 26 100 12 T204 12" stroke="#2b0a03" strokeWidth="1.4" fill="none" />
      {[
        [16, 16],
        [56, 22],
        [146, 20],
        [184, 13],
      ].map(([x, y], k) => (
        <g key={x} className="rh-linterna" style={{ "--k": k, transformOrigin: `${x}px ${y - 6}px` }}>
          <path d={`M${x} ${y - 6} V${y}`} stroke="#2b0a03" strokeWidth="1" />
          <ellipse cx={x} cy={y + 9} rx="9" ry="10" fill="url(#rhA2luz)" />
          <rect x={x - 5} y={y - 1} width="10" height="2.4" fill="#f2c14e" />
          <rect x={x - 5} y={y + 18} width="10" height="2.4" fill="#f2c14e" />
          <path d={`M${x} ${y + 20} v8`} stroke="#f2c14e" strokeWidth="1.4" />
        </g>
      ))}
      <path d="M0 90 V70 L20 62 L40 70 V90Z M150 90 V66 L172 56 L200 66 V90Z" fill="#2b0a03" opacity=".75" />
    </svg>
  );
}
function EscenaB1() {
  return (
    <svg className="rh-escena" viewBox="0 0 200 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="rhB1cielo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4f7fc" />
          <stop offset="1" stopColor="#c9d8ef" />
        </linearGradient>
      </defs>
      <rect width="200" height="90" fill="url(#rhB1cielo)" />
      <circle cx="166" cy="20" r="9" fill="#c8102e" opacity=".85" />
      <path d="M0 90 L0 60 Q14 30 26 48 Q34 20 48 44 Q58 58 70 90Z" fill="#7d93b8" />
      <path d="M120 90 Q138 34 150 50 Q160 26 176 52 Q190 44 200 60 V90Z" fill="#5d759e" />
      <path d="M0 90 Q30 70 60 84 T140 80 T200 86 V90Z" fill="#203a66" />
      <g className="rh-niebla">
        <ellipse cx="40" cy="64" rx="46" ry="5" fill="#fff" opacity=".75" />
        <ellipse cx="160" cy="70" rx="40" ry="4" fill="#fff" opacity=".65" />
      </g>
    </svg>
  );
}
function EscenaB2() {
  return (
    <svg className="rh-escena" viewBox="0 0 200 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="rhB2cielo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2c0f5c" />
          <stop offset="1" stopColor="#8a4fd8" />
        </linearGradient>
        <linearGradient id="rhB2oro" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff1b0" />
          <stop offset="1" stopColor="#c8901e" />
        </linearGradient>
      </defs>
      <rect width="200" height="90" fill="url(#rhB2cielo)" />
      {[
        [22, 18],
        [70, 30],
        [130, 14],
        [180, 26],
        [100, 8],
      ].map(([x, y], k) => (
        <circle key={x} className="rh-chispa" style={{ "--k": k }} cx={x} cy={y} r="1.6" fill="#fde68a" />
      ))}
      <path d="M-10 66 Q30 58 70 62 L66 66 H-6Z M130 62 Q170 56 210 66 L206 70 H134Z" fill="url(#rhB2oro)" />
      <rect x="-4" y="66" width="74" height="24" fill="#9b1b2c" />
      <rect x="134" y="70" width="70" height="20" fill="#9b1b2c" />
      <g fill="#6e0b1c">
        {[6, 20, 34, 48, 146, 160, 174, 188].map((x) => (
          <rect key={x} x={x} y="72" width="4" height="18" />
        ))}
      </g>
    </svg>
  );
}
const ESCENAS = { A1: EscenaA1, A2: EscenaA2, B1: EscenaB1, B2: EscenaB2 };

function Dragon({ lado }) {
  return (
    <span className={`rh-dragon ${lado}`} aria-hidden="true">
      <span className="rh-dragon-cuerpo" />
      <span className="rh-nube" />
    </span>
  );
}

// Rendimiento: cuando la cabecera o las tablillas salen de la pantalla se marcan con data-fuera (como hace
// src/lib/fluidez.js con las unidades) y v20-fluidez.css pausa sus animaciones: dragones, perla y las mini-escenas
// SVG de las tablillas (bambú, linternas…), que se animan en el hilo principal en cada fotograma.
function usePausaFuera() {
  const cabecera = React.useRef(null);
  const tablillas = React.useRef(null);
  React.useEffect(() => {
    const els = [cabecera.current, tablillas.current].filter(Boolean);
    if (!els.length || typeof IntersectionObserver === "undefined") return undefined;
    const ojo = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) e.target.toggleAttribute("data-fuera", !e.isIntersecting);
      },
      { rootMargin: "200px 0px" },
    );
    els.forEach((el) => ojo.observe(el));
    return () => ojo.disconnect();
  }, []);
  return [cabecera, tablillas];
}

export function CabeceraRuta({ region, tema, niveles, marcado, onCambiar }) {
  const [cabecera, tablillas] = usePausaFuera();
  return (
    <>
      <header className="rh-cabecera" ref={cabecera}>
        <div className="rh-dintel">
          <Dragon lado="izq" />
          <Dragon lado="der" />
          <span className="rh-perla" aria-hidden="true">
            <i />
          </span>
          <div className="rh-titulo">
            <h1>
              <b>{region[0]}</b> <i translate="no">{region[1]}</i>
            </h1>
            <p className="rh-tema">
              <span className="rh-tema-raya" aria-hidden="true" />
              {tema}
              <span className="rh-tema-raya" aria-hidden="true" />
            </p>
            <small>Viaja parada a parada: cada unidad es un lugar de China · 每个单元都是中国的一站</small>
          </div>
        </div>
      </header>
      <nav className="rh-niveles" aria-label="Niveles · 级别" ref={tablillas}>
        {niveles.map((nivel) => {
          const mundo = MUNDO_NIVEL[nivel.key];
          const Escena = ESCENAS[nivel.key];
          const on = nivel.key === marcado;
          const pct = nivel.total ? Math.round((nivel.hechas / nivel.total) * 100) : 0;
          return (
            <button
              key={nivel.key}
              type="button"
              className={`rh-tablilla rh-${nivel.key} ${on ? "on" : ""}`}
              style={{ "--c": mundo.c, "--d": mundo.d, "--luz": mundo.luz, "--p": pct }}
              aria-pressed={on}
              onClick={() => onCambiar(nivel.key)}
            >
              <Escena />
              <span className="rh-velo" aria-hidden="true" />
              <span className="rh-medalla" translate="no">
                <b>{nivel.key}</b>
              </span>
              <span className="rh-textos">
                <em>{nivel.region}</em>
                <span className="rh-mundo">
                  {mundo.es} · <span translate="no">{mundo.zh}</span>
                </span>
                <span className="rh-barra" aria-hidden="true">
                  <i style={{ transform: `scaleX(${pct / 100})` }} />
                </span>
                <small title="Clases hechas · 已完成课程">
                  {nivel.hechas}/{nivel.total} <span>clases <i translate="no">课</i></span>
                </small>
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
