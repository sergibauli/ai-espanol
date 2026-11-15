import * as React from "react";

// Escenas SVG del templo: una por sala (fondo del escenario) y un motivo pequeño para las tarjetas.
// Todas las animaciones van en CSS (transform/opacity) y se apagan con prefers-reduced-motion.

const Montes = ({ capas = ["#2a0a14", "#1a0710"], y = 220 }) => (
  <g>
    <path d={`M0 ${y} Q80 ${y - 70} 150 ${y - 30} T300 ${y - 50} T460 ${y - 20} T600 ${y - 60} V300 H0Z`} fill={capas[0]} opacity=".55" />
    <path d={`M0 ${y + 30} Q120 ${y - 20} 220 ${y + 10} T420 ${y} T600 ${y + 15} V300 H0Z`} fill={capas[1]} opacity=".8" />
  </g>
);

function EscenaLabios() {
  const varillas = Array.from({ length: 15 }, (_, i) => -84 + i * 12);
  return (
    <>
      <g transform="translate(470 250)">
      <g className="pv-esc__abanico">
        {varillas.map((a) => (
          <path key={a} d="M0 0 L-12 -205 Q0 -212 12 -205Z" transform={`rotate(${a})`} fill="url(#pvLaca)" stroke="#f2c14e" strokeWidth="1.2" opacity=".9" />
        ))}
        <circle r="16" fill="#f2c14e" />
        <path d="M-175 -95 A200 200 0 0 1 175 -95" fill="none" stroke="#f2c14e" strokeWidth="3" opacity=".7" />
      </g>
      </g>
      <g className="pv-esc__ramas" stroke="#3b2416" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M-10 70 Q90 90 160 60 T300 70" />
        <path d="M120 72 Q150 40 190 30" strokeWidth="2.5" />
      </g>
      {[[70, 72], [150, 58], [196, 30], [250, 66], [292, 72]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`} className="pv-esc__flor">
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="0" cy="-7" rx="5.5" ry="7" fill="#f7a8b8" transform={`rotate(${a})`} />
          ))}
          <circle r="3" fill="#f2c14e" />
        </g>
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <ellipse key={i} className="pv-esc__petalo" style={{ "--i": i }} cx={60 + i * 70} cy="40" rx="4" ry="6" fill="#f7a8b8" />
      ))}
    </>
  );
}

function EscenaBambu() {
  const tallos = [30, 80, 120, 470, 520, 575];
  return (
    <>
      {tallos.map((x, i) => (
        <g key={x} className="pv-esc__tallo" style={{ "--i": i, transformOrigin: `${x}px 300px` }}>
          <rect x={x - 7} y={i % 2 ? 10 : -20} width="14" height="330" rx="6" fill={i % 3 ? "#3d7a4a" : "#2c5e37"} />
          {[50, 120, 190, 260].map((y) => (
            <rect key={y} x={x - 9} y={y + (i % 2) * 20} width="18" height="5" rx="2" fill="#1d4527" />
          ))}
          <path className="pv-esc__hoja" d={`M${x} ${80 + i * 12} q30 -12 62 4 q-34 10 -62 -4z`} fill="#4f9a5c" />
          <path className="pv-esc__hoja is-b" d={`M${x} ${150 + i * 9} q-30 -14 -60 2 q32 12 60 -2z`} fill="#3f8a4c" />
        </g>
      ))}
    </>
  );
}

function EscenaTrueno() {
  return (
    <>
      <g className="pv-esc__nubes-trueno" fill="#5e0614" opacity=".7">
        <ellipse cx="90" cy="50" rx="90" ry="26" />
        <ellipse cx="520" cy="40" rx="110" ry="30" />
      </g>
      <path className="pv-esc__rayo" d="M520 60 l-22 46 h18 l-26 52 l46 -64 h-20 l20 -34z" fill="#f2c14e" />
      <g transform="translate(300 205)">
        {[0, 1, 2].map((i) => (
          <ellipse key={i} className="pv-esc__onda-tambor" style={{ "--i": i }} rx="120" ry="34" fill="none" stroke="#f2c14e" strokeWidth="3" />
        ))}
        <g className="pv-esc__tambor">
          <rect x="-112" y="0" width="224" height="80" rx="18" fill="url(#pvLaca)" stroke="#f2c14e" strokeWidth="3" />
          {Array.from({ length: 12 }, (_, i) => (
            <circle key={i} cx={-100 + i * 18.2} cy="8" r="3.5" fill="#f2c14e" />
          ))}
          <ellipse rx="112" ry="30" fill="#efd9a8" stroke="#c8961e" strokeWidth="4" />
          <text y="11" textAnchor="middle" fontSize="34" fill="#a3122a" fontFamily="STKaiti, KaiTi, serif" opacity=".85">
            雷
          </text>
        </g>
      </g>
    </>
  );
}

function EscenaCampana() {
  return (
    <>
      <rect x="120" y="22" width="360" height="16" rx="6" fill="url(#pvLaca)" stroke="#f2c14e" strokeWidth="2" />
      <rect x="140" y="38" width="12" height="260" fill="#5e0614" />
      <rect x="448" y="38" width="12" height="260" fill="#5e0614" />
      <g transform="translate(300 38)">
        <g className="pv-esc__campana">
          <line y1="0" y2="34" stroke="#f2c14e" strokeWidth="3" />
          <path d="M-50 150 Q-52 60 0 40 Q52 60 50 150 Q60 162 70 166 H-70 Q-60 162 -50 150Z" fill="#2f9a8f" stroke="#f2c14e" strokeWidth="3" />
          {[78, 104, 130].map((y) => (
            <line key={y} x1="-42" x2="42" y1={y} y2={y} stroke="#bfe7df" strokeWidth="2" opacity=".55" />
          ))}
          <circle cy="180" r="9" fill="#f2c14e" />
        </g>
        {[0, 1, 2].map((i) => (
          <circle key={i} className="pv-esc__eco" style={{ "--i": i }} cy="120" r="70" fill="none" stroke="#8fe0d4" strokeWidth="2.5" />
        ))}
      </g>
    </>
  );
}

function EscenaMontana() {
  return (
    <>
      <circle cx="470" cy="80" r="36" fill="#f6e7c8" opacity=".9" />
      <path d="M0 210 L90 90 L150 160 L240 50 L330 170 L400 110 L480 190 L600 120 V300 H0Z" fill="#34406b" opacity=".55" />
      <path d="M0 250 L110 150 L200 220 L300 130 L420 230 L520 170 L600 220 V300 H0Z" fill="#1b2240" opacity=".85" />
      <path d="M240 50 l-18 24 l12 -4 l6 10 l8 -12 l10 6z" fill="#f6e7c8" opacity=".8" />
      <g className="pv-esc__niebla" fill="#f6e7c8">
        <ellipse cx="160" cy="200" rx="140" ry="12" opacity=".25" />
        <ellipse cx="440" cy="240" rx="170" ry="14" opacity=".2" />
      </g>
      <g className="pv-esc__grulla" fill="none" stroke="#f6e7c8" strokeWidth="2.5" strokeLinecap="round">
        <path d="M100 70 q14 -10 26 0 q12 -10 26 0" />
        <path d="M150 96 q10 -7 18 0 q8 -7 18 0" opacity=".7" />
      </g>
    </>
  );
}

function EscenaLinterna() {
  const xs = [70, 190, 410, 530];
  return (
    <>
      <path d="M0 24 Q300 70 600 24" fill="none" stroke="#3b2416" strokeWidth="3" />
      {xs.map((x, i) => {
        const y = 24 + Math.sin((x / 600) * Math.PI) * 40;
        return (
          <g key={x} className="pv-esc__linterna" style={{ "--i": i, transformOrigin: `${x}px ${y}px` }}>
            <line x1={x} x2={x} y1={y} y2={y + 18} stroke="#3b2416" strokeWidth="2" />
            <circle className="pv-esc__halo" cx={x} cy={y + 58} r="60" fill="url(#pvHalo)" />
            <rect x={x - 22} y={y + 18} width="44" height="8" rx="2" fill="#f2c14e" />
            <ellipse cx={x} cy={y + 58} rx="38" ry="34" fill="#c8102e" stroke="#f2c14e" strokeWidth="2" />
            <path d={`M${x - 14} ${y + 26} Q${x - 26} ${y + 58} ${x - 14} ${y + 90} M${x + 14} ${y + 26} Q${x + 26} ${y + 58} ${x + 14} ${y + 90}`} stroke="#8f0c21" strokeWidth="2" fill="none" />
            <rect x={x - 22} y={y + 90} width="44" height="8" rx="2" fill="#f2c14e" />
            <path d={`M${x - 6} ${y + 98} v24 M${x} ${y + 98} v30 M${x + 6} ${y + 98} v24`} stroke="#f2c14e" strokeWidth="2" />
          </g>
        );
      })}
    </>
  );
}

const ESCENAS = { labios: EscenaLabios, bambu: EscenaBambu, trueno: EscenaTrueno, campana: EscenaCampana, montana: EscenaMontana, linterna: EscenaLinterna };

const Defs = () => (
  <defs>
    <linearGradient id="pvLaca" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#e0283f" />
      <stop offset="1" stopColor="#8f0c21" />
    </linearGradient>
    <radialGradient id="pvHalo">
      <stop offset="0" stopColor="#ffcf6b" stopOpacity=".55" />
      <stop offset="1" stopColor="#ffcf6b" stopOpacity="0" />
    </radialGradient>
  </defs>
);

// Fondo grande del escenario de una sala
export function EscenaSala({ sala, sonando = false }) {
  const Escena = ESCENAS[sala.id] || EscenaLinterna;
  return (
    <svg className={`pv-esc pv-esc--${sala.id}${sonando ? " is-sonando" : ""}`} viewBox="0 0 600 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <Defs />
      <Montes capas={[sala.tinta, "#12060a"]} y={sala.id === "montana" ? 300 : 240} />
      <Escena />
    </svg>
  );
}

// Motivo pequeño para la tarjeta de cada familia
export function MotivoSala({ sala }) {
  const comun = { className: "pv-motivo", viewBox: "0 0 64 64", "aria-hidden": true };
  switch (sala.id) {
    case "labios":
      return (
        <svg {...comun}>
          {[-60, -40, -20, 0, 20, 40, 60].map((a) => (
            <path key={a} d="M32 56 L28 14 Q32 11 36 14Z" transform={`rotate(${a} 32 56)`} fill="currentColor" opacity=".85" />
          ))}
          <circle cx="32" cy="56" r="4" fill="#f2c14e" />
        </svg>
      );
    case "bambu":
      return (
        <svg {...comun}>
          {[20, 34, 46].map((x, i) => (
            <g key={x}>
              <rect x={x - 3} y={6 + i * 4} width="6" height="56" rx="3" fill="currentColor" />
              {[20, 36, 50].map((y) => (
                <rect key={y} x={x - 4} y={y} width="8" height="2" fill="#f2c14e" opacity=".8" />
              ))}
            </g>
          ))}
        </svg>
      );
    case "trueno":
      return (
        <svg {...comun}>
          <rect x="10" y="26" width="44" height="24" rx="6" fill="currentColor" />
          <ellipse cx="32" cy="26" rx="22" ry="8" fill="#f6e7c8" stroke="#f2c14e" strokeWidth="2" />
          <path d="M44 4 l-6 10 h5 l-7 10 l12 -13 h-5 l5 -7z" fill="#f2c14e" />
        </svg>
      );
    case "campana":
      return (
        <svg {...comun}>
          <path d="M18 48 Q17 20 32 14 Q47 20 46 48 Q50 52 54 53 H10 Q14 52 18 48Z" fill="currentColor" />
          <circle cx="32" cy="58" r="3.5" fill="#f2c14e" />
          <line x1="32" x2="32" y1="4" y2="14" stroke="#f2c14e" strokeWidth="2.5" />
        </svg>
      );
    case "montana":
      return (
        <svg {...comun}>
          <path d="M2 56 L22 20 L32 34 L44 12 L62 56Z" fill="currentColor" />
          <path d="M44 12 l-6 9 l4 -1 l2 4 l3 -5 l4 2z" fill="#f6e7c8" />
          <circle cx="14" cy="14" r="5" fill="#f2c14e" />
        </svg>
      );
    default:
      return (
        <svg {...comun}>
          <rect x="24" y="8" width="16" height="4" rx="1" fill="#f2c14e" />
          <ellipse cx="32" cy="30" rx="18" ry="17" fill="currentColor" />
          <rect x="24" y="47" width="16" height="4" rx="1" fill="#f2c14e" />
          <path d="M29 51 v9 M32 51 v11 M35 51 v9" stroke="#f2c14e" strokeWidth="1.6" />
        </svg>
      );
  }
}

// Fondo con profundidad: cielo nocturno, luna, montes en capas, pagoda, linternas, nubes y polvo dorado
export function FondoTemplo() {
  const raiz = React.useRef(null);
  React.useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const alMover = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = raiz.current;
        if (!el) return;
        const caja = el.parentElement?.getBoundingClientRect();
        if (caja) el.style.setProperty("--pv-sc", String(Math.max(0, -caja.top)));
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
    <div ref={raiz} className="pv-fondo" aria-hidden="true">
      <div className="pv-fondo__cielo" />
      <div className="pv-fondo__estrellas" />
      <div className="pv-fondo__luna" />
      <img className="pv-fondo__nube is-a" src="./theme/nube-oro.png" alt="" />
      <img className="pv-fondo__nube is-b" src="./theme/nube-oro.png" alt="" />
      <svg className="pv-fondo__capa is-lejos" viewBox="0 0 1200 300" preserveAspectRatio="none">
        <path d="M0 210 Q110 90 220 170 T420 140 T640 180 T860 110 T1060 170 T1200 140 V300 H0Z" fill="#3a0d1c" />
      </svg>
      <svg className="pv-fondo__capa is-medio" viewBox="0 0 1200 300" preserveAspectRatio="none">
        <path d="M0 240 Q160 150 300 220 T600 200 T900 230 T1200 190 V300 H0Z" fill="#26070f" />
      </svg>
      <svg className="pv-fondo__pagoda" viewBox="0 0 220 260">
        <g fill="#14040a">
          <rect x="104" y="0" width="12" height="30" />
          <path d="M40 60 Q110 30 180 60 L200 52 Q170 80 110 74 Q50 80 20 52Z" />
          <rect x="60" y="72" width="100" height="40" />
          <path d="M20 130 Q110 96 200 130 L220 120 Q186 150 110 144 Q34 150 0 120Z" />
          <rect x="40" y="142" width="140" height="118" />
        </g>
        <g fill="#f2c14e" opacity=".85">
          <rect x="78" y="84" width="14" height="18" rx="2" />
          <rect x="128" y="84" width="14" height="18" rx="2" />
          <rect x="94" y="190" width="32" height="70" rx="14" fill="#ffcf6b" opacity=".6" />
        </g>
      </svg>
      <svg className="pv-fondo__capa is-cerca" viewBox="0 0 1200 300" preserveAspectRatio="none">
        <path d="M0 270 Q200 220 380 260 T760 250 T1200 240 V300 H0Z" fill="#12040a" />
      </svg>
      {[8, 30, 70, 92].map((x, i) => (
        <span key={x} className="pv-fondo__linterna" style={{ left: `${x}%`, "--i": i }}>
          <i />
        </span>
      ))}
      <div className="pv-fondo__polvo">
        {Array.from({ length: 16 }, (_, i) => (
          <i key={i} style={{ left: `${(i * 61) % 100}%`, "--i": i }} />
        ))}
      </div>
    </div>
  );
}
