import * as React from "react";

// Portada de Pronunciación: el recinto imperial. Cada sala es un templo distinto (ilustraciones de las maquetas
// del usuario, recortadas en public/theme/templos/*.webp) con luz que sale por la puerta, halo, bruma y partículas
// propias, y delante la plaza con los medallones de sus familias. Fondo de paisaje en capas con niebla, montañas,
// palacio, linternas de cielo y parallax suave.
// Todo se anima con transform/opacity; prefers-reduced-motion lo deja quieto (ver pronunciacion-templos.css).

// Ilustración de cada sala: tamaño real y hueco de la puerta en % de la imagen [centro x, centro y, ancho, alto]
const TEMPLOS = {
  labios: { w: 760, h: 690, puerta: [50, 76, 12, 22], part: "pluma" },
  bambu: { w: 760, h: 554, puerta: [50, 66, 19, 38], part: "chispa" },
  trueno: { w: 760, h: 589, puerta: [52.5, 62, 17, 34], part: "ascua" },
  campana: { w: 760, h: 634, puerta: [50, 71, 19, 32], part: "petalo" },
  montana: { w: 760, h: 587, puerta: [50.5, 72, 12, 22], part: "nube", rayos: true },
  linterna: { w: 760, h: 504, puerta: [49.5, 77, 15, 24], part: "mota", rayos: true },
};

// La entrada (surge, se abren las puertas, aparecen los medallones) empieza cuando el templo entra en pantalla.
function useVisto() {
  const ref = React.useRef(null);
  const [visto, setVisto] = React.useState(() => typeof IntersectionObserver === "undefined");
  React.useEffect(() => {
    const el = ref.current;
    if (visto || !el) return;
    const ojo = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          setVisto(true);
          ojo.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
    ojo.observe(el);
    return () => ojo.disconnect();
  }, [visto]);
  return [ref, visto];
}

export function TemploSala({ sala, k, oidas, total, children }) {
  const [ref, visto] = useVisto();
  const t = TEMPLOS[sala.id] || TEMPLOS.labios;
  const [px, py, pw, ph] = t.puerta;
  return (
    <section
      ref={ref}
      className={`tq-templo tq--${sala.id}${visto ? " is-visto" : ""}`}
      style={{ "--sala": sala.color, "--tinta": sala.tinta, "--k": k, "--col": k % 2 }}
      aria-label={`${sala.es} · ${sala.zh}`}
    >
      <header className="tq-titulo">
        <span className="tq-titulo__sello" translate="no" aria-hidden="true">
          {sala.sello}
        </span>
        <b translate="no">{sala.zh}</b>
        <h2>{sala.es}</h2>
      </header>
      <div className="tq-escena" aria-hidden="true">
        <span className="tq-halo" />
        {t.rayos && <span className="tq-rayos" />}
        <div className={`tq-particulas is-${t.part}`}>
          {Array.from({ length: 8 }, (_, n) => (
            <i key={n} style={{ "--n": n }} />
          ))}
        </div>
        <div className="tq-figura" style={{ aspectRatio: `${t.w} / ${t.h}`, "--px": `${px}%`, "--py": `${py}%`, "--pw": `${pw}%`, "--ph": `${ph}%` }}>
          <span className="tq-puerta is-detras" />
          <img className="tq-img" src={`./theme/templos/${sala.id}.webp`} alt="" width={t.w} height={t.h} loading="lazy" decoding="async" />
          <span className="tq-puerta is-delante" />
          <span className="tq-destello" />
        </div>
        <span className="tq-bruma" />
      </div>
      <div className="tq-plaza">
        <p className="tq-rasgo">
          <i translate="no">{sala.sello}</i> {sala.rasgo} · {sala.rasgoZh}
        </p>
        <div className="tq-familias">{children}</div>
        <span className="tq-cuenta">
          {oidas}/{total} sílabas escuchadas · 已听音节
          <span className="tq-cuenta__barra" style={{ "--p": total ? oidas / total : 0 }} aria-hidden="true" />
        </span>
      </div>
    </section>
  );
}

// Fondo de la portada: paisaje imperial nocturno en capas, fijo en la ventana mientras se baja
export function FondoImperial() {
  const raiz = React.useRef(null);
  React.useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    // Solo al hacer scroll (no cada fotograma): fija una variable que mueve las capas con transform
    const alMover = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = raiz.current;
        const caja = el?.parentElement?.getBoundingClientRect();
        if (caja) el.style.setProperty("--tq-sc", String(Math.min(2400, Math.max(0, -caja.top))));
      });
    };
    document.addEventListener("scroll", alMover, { passive: true, capture: true });
    alMover();
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("scroll", alMover, { capture: true });
    };
  }, []);
  return (
    <div ref={raiz} className="tq-fondo" aria-hidden="true">
      <div className="tq-fondo__vista">
        <div className="tq-fondo__cielo" />
        <div className="tq-fondo__estrellas" />
        <div className="tq-fondo__estrellas is-b" />
        <div className="tq-fondo__luna" />
        <img className="tq-fondo__nube is-a" src="./theme/nube-oro.png" alt="" />
        <img className="tq-fondo__nube is-b" src="./theme/nube-oro.png" alt="" />
        {/* montañas lejanas (karst) */}
        <svg className="tq-fondo__capa is-lejos" viewBox="0 0 1600 400" preserveAspectRatio="xMidYMax slice">
          <defs>
            <linearGradient id="tq-fl" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7a3a6e" />
              <stop offset="1" stopColor="#3a1438" />
            </linearGradient>
          </defs>
          <path
            d="M0 400 V250 C40 250 50 150 90 150 C130 150 130 240 170 240 C200 240 205 120 250 110 C295 120 290 230 330 235 C370 230 380 180 420 180 C460 180 470 260 520 260 C560 255 570 90 620 80 C670 90 670 220 720 230 C760 230 770 170 810 165 C850 170 850 250 900 250 C940 245 950 130 1000 120 C1050 130 1050 240 1100 240 C1140 235 1150 160 1190 155 C1230 160 1240 230 1280 235 C1320 230 1330 100 1380 95 C1430 100 1430 220 1480 225 C1520 225 1540 180 1600 175 V400Z"
            fill="url(#tq-fl)"
          />
        </svg>
        <div className="tq-fondo__niebla is-a" />
        {/* palacio lejano: murallas, salones y pagoda */}
        <svg className="tq-fondo__capa is-palacio" viewBox="0 0 1600 400" preserveAspectRatio="xMidYMax slice">
          <g fill="#2a0a20">
            <path d="M0 400 V330 H1600 V400Z" />
            <path d="M0 330 V318 H1600 V330Z" opacity=".9" />
            {/* salón central */}
            <path d="M640 318 V270 H960 V318Z" />
            <path d="M600 276 Q800 250 1000 276 L1020 268 Q990 290 800 284 Q610 290 580 268Z" />
            <path d="M680 262 V240 H920 V262Z" />
            <path d="M650 246 Q800 220 950 246 L968 238 Q940 262 800 256 Q660 262 632 238Z" />
            <rect x="700" y="216" width="200" height="12" />
            {/* salones laterales */}
            <path d="M300 318 V290 H480 V318Z M270 296 Q390 278 510 296 L524 290 Q500 306 390 302 Q280 306 256 290Z" />
            <path d="M1120 318 V290 H1300 V318Z M1090 296 Q1210 278 1330 296 L1344 290 Q1320 306 1210 302 Q1100 306 1076 290Z" />
            {/* pagoda en la colina */}
            <path d="M1430 330 C1460 250 1540 250 1580 330Z" />
            <path d="M1494 270 V140 H1514 V270Z" />
            {[150, 175, 200, 225, 250].map((y, n) => (
              <path key={y} d={`M${1504 - 26 - n * 4} ${y + 6} Q1504 ${y - 6} ${1504 + 26 + n * 4} ${y + 6} L${1504 + 32 + n * 4} ${y + 2} Q1504 ${y + 16} ${1504 - 32 - n * 4} ${y + 2}Z`} />
            ))}
            <path d="M1504 140 V118" stroke="#2a0a20" strokeWidth="3" />
            {/* torres de la muralla */}
            {[120, 560, 1040, 1380].map((x) => (
              <path key={x} d={`M${x} 318 V300 H${x + 50} V318Z M${x - 10} 304 Q${x + 25} 290 ${x + 60} 304Z`} />
            ))}
          </g>
          <g fill="#ffcf6b" className="tq-fondo__ventanas">
            {[690, 730, 770, 830, 870, 910].map((x) => (
              <rect key={x} x={x} y="292" width="10" height="14" rx="2" />
            ))}
            {[330, 370, 410, 450, 1150, 1190, 1230, 1270].map((x) => (
              <rect key={x} x={x} y="300" width="8" height="10" rx="2" opacity=".8" />
            ))}
            {[160, 185, 210, 235].map((y) => (
              <rect key={y} x="1500" y={y + 6} width="8" height="7" rx="1.5" opacity=".9" />
            ))}
          </g>
        </svg>
        <div className="tq-fondo__niebla is-b" />
        {/* colinas cercanas con pinos */}
        <svg className="tq-fondo__capa is-cerca" viewBox="0 0 1600 300" preserveAspectRatio="xMidYMax slice">
          <path d="M0 300 V190 C200 150 380 210 560 190 C760 168 900 220 1080 196 C1260 172 1420 200 1600 180 V300Z" fill="#14050c" />
          {[60, 140, 1460, 1540].map((x, n) => (
            <g key={x} fill="#0d0308">
              <path d={`M${x} ${190 - (n % 2) * 14} V120`} stroke="#0d0308" strokeWidth="6" />
              <path d={`M${x - 46} ${132} Q${x} ${100} ${x + 50} ${130} Q${x} ${120} ${x - 46} ${132}Z`} />
              <path d={`M${x - 36} ${110} Q${x + 4} ${80} ${x + 40} ${108} Q${x} ${98} ${x - 36} ${110}Z`} />
              <path d={`M${x - 22} ${90} Q${x + 2} ${66} ${x + 26} ${88} Q${x} ${80} ${x - 22} ${90}Z`} />
            </g>
          ))}
        </svg>
        <div className="tq-fondo__niebla is-c" />
        {/* linternas de cielo (孔明灯) que suben */}
        <div className="tq-fondo__linternas">
          {[
            [6, 0, 1],
            [18, 7, 0.7],
            [29, 3, 0.85],
            [44, 11, 0.6],
            [57, 5, 1],
            [68, 14, 0.75],
            [79, 2, 0.9],
            [91, 9, 0.65],
            [36, 17, 0.55],
            [85, 19, 0.8],
          ].map(([x, d, s], n) => (
            <span key={n} style={{ left: `${x}%`, "--d": d, "--s": s }}>
              <i />
            </span>
          ))}
        </div>
        <div className="tq-fondo__polvo">
          {Array.from({ length: 14 }, (_, i) => (
            <i key={i} style={{ left: `${(i * 37 + 5) % 100}%`, "--i": i }} />
          ))}
        </div>
        <div className="tq-fondo__vineta" />
      </div>
    </div>
  );
}
