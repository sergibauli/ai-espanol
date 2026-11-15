import * as React from "react";

// v20 · Escenas animadas de las tarjetas «Dentro te espera» de la portada: cada mundo tiene la suya.
// Solo decoración (aria-hidden); las animaciones son CSS (v20-mundos.css) y solo corren en la tarjeta activa.

const CAMINO = "M16 94 C 40 72, 52 86, 74 64 S 118 34, 140 48 S 168 34, 186 16";

function EscenaRuta() {
  return (
    <svg className="esc-svg" viewBox="0 0 200 110" preserveAspectRatio="xMidYMid slice">
      <defs>
        <mask id="esc-ruta-mascara">
          <path className="esc-ruta-dibujo" d={CAMINO} pathLength="100" stroke="#fff" strokeWidth="6" fill="none" />
        </mask>
      </defs>
      <g stroke="rgba(120, 80, 30, 0.18)" strokeWidth="0.6">
        {[22, 44, 66, 88].map((y) => <line key={y} x1="0" x2="200" y1={y} y2={y} />)}
        {[25, 50, 75, 100, 125, 150, 175].map((x) => <line key={x} y1="0" y2="110" x1={x} x2={x} />)}
      </g>
      <path d="M0 100 L26 62 L42 80 L66 44 L92 82 L118 52 L146 90 L172 58 L200 84 V110 H0Z" fill="#c9a26a" opacity="0.45" />
      <path d="M0 104 C 40 94, 62 108, 100 99 S 160 88, 200 101" stroke="#2f8f86" strokeWidth="3" fill="none" opacity="0.55" />
      <path d={CAMINO} stroke="#c8102e" strokeWidth="2.6" fill="none" strokeDasharray="5 4" strokeLinecap="round" mask="url(#esc-ruta-mascara)" />
      <g className="esc-ruta-pagoda" transform="translate(16 94)">
        <circle r="7" fill="#8f0c21" stroke="#f2c14e" strokeWidth="1.5" />
        <text y="3.5" textAnchor="middle" fontSize="9" fill="#fff3c4" fontFamily="STKaiti, KaiTi, serif">京</text>
      </g>
      <g className="esc-ruta-meta" transform="translate(186 16)">
        <path d="M0 0 V-14 L12 -10 L0 -6" fill="#c8102e" stroke="#7a0a1a" strokeWidth="1" />
        <circle r="3" fill="#f2c14e" />
      </g>
      <circle r="4.2" fill="#f2c14e" stroke="#8f0c21" strokeWidth="1.6">
        <animateMotion dur="4.4s" repeatCount="indefinite" path={CAMINO} keyPoints="0;1;1" keyTimes="0;0.8;1" calcMode="linear" />
      </circle>
      <g className="esc-ruta-brujula" transform="translate(62 24)">
        <circle r="13" fill="none" stroke="#8f0c21" strokeWidth="1.2" opacity="0.6" />
        <path d="M0 -12 L3 0 L0 12 L-3 0Z" fill="#c8102e" />
        <path d="M-12 0 L0 3 L12 0 L0 -3Z" fill="#8a5a0a" opacity="0.7" />
      </g>
    </svg>
  );
}

function EscenaUnidades() {
  return (
    <>
      <span className="esc-celosia" />
      <span className="esc-libro">
        <i className="esc-hoja izq" />
        <i className="esc-hoja der" />
        {[0, 1, 2].map((n) => <i key={n} className="esc-hoja vuela" style={{ "--d": `${n * 0.9}s` }} />)}
      </span>
      {["ñ", "字", "¿?", "á", "语"].map((letra, n) => (
        <b key={n} className="esc-letra" style={{ "--x": `${18 + n * 16}%`, "--d": `${n * 0.55}s` }} translate="no">{letra}</b>
      ))}
    </>
  );
}

const FICHAS = [
  { t: "中", x: 12, y: 18, r: -14, c: "#c8102e" },
  { t: "发", x: 70, y: 12, r: 12, c: "#0f7a58" },
  { t: "ñ", x: 30, y: 54, r: 8, c: "#1b3f9a" },
  { t: "¡!", x: 78, y: 56, r: -10, c: "#8f0c21" },
];
function EscenaJuegos() {
  return (
    <>
      <span className="esc-ruleta" />
      {FICHAS.map(({ t, x, y, r, c }, n) => (
        <b key={t} className="esc-ficha" style={{ "--x": `${x}%`, "--y": `${y}%`, "--r": `${r}deg`, "--d": `${-n * 0.7}s`, color: c }} translate="no">{t}</b>
      ))}
      {Array.from({ length: 10 }, (_, n) => (
        <i key={n} className="esc-confeti" style={{ "--x": `${(n * 37) % 96}%`, "--d": `${-n * 0.45}s`, "--h": `${(n * 53) % 360}` }} />
      ))}
    </>
  );
}

function EscenaDele() {
  return (
    <>
      <span className="esc-rayos" />
      <svg className="esc-svg esc-palacio" viewBox="0 0 200 110" preserveAspectRatio="xMidYMax meet">
        <g fill="none" stroke="#f2c14e" strokeWidth="1.6" strokeLinejoin="round">
          <path d="M40 58 Q 100 34 160 58 L 150 52 Q 100 30 50 52 Z" fill="rgba(242,193,78,0.12)" />
          <path d="M28 82 Q 100 54 172 82 L 160 74 Q 100 50 40 74 Z" fill="rgba(242,193,78,0.12)" />
          <path d="M56 60 V 74 M 144 60 V 74 M 80 58 V 72 M 120 58 V 72" />
          <path d="M44 84 V 108 M 156 84 V 108 M 72 82 V 108 M 128 82 V 108" />
          <path d="M88 108 V 92 Q 100 84 112 92 V 108" />
          <path d="M10 108 H 190" />
        </g>
      </svg>
      <span className="esc-sello">
        <b translate="no">合格</b>
        <small>APTO</small>
      </span>
      <span className="esc-onda" />
    </>
  );
}

function EscenaPronunciacion() {
  return (
    <>
      {[0, 1, 2].map((n) => <i key={n} className="esc-anillo" style={{ "--d": `${n * 0.8}s` }} />)}
      <span className="esc-barras">
        {Array.from({ length: 15 }, (_, n) => (
          <i key={n} style={{ "--d": `${-((n * 0.37) % 1.2)}s`, "--a": 0.35 + ((n * 7) % 10) / 14 }} />
        ))}
      </span>
      <svg className="esc-svg esc-ola" viewBox="0 0 400 110" preserveAspectRatio="none">
        <path d="M0 55 Q 25 20 50 55 T 100 55 T 150 55 T 200 55 T 250 55 T 300 55 T 350 55 T 400 55" stroke="#7fe0ff" strokeWidth="2" fill="none" opacity="0.7" />
        <path d="M0 55 Q 25 80 50 55 T 100 55 T 150 55 T 200 55 T 250 55 T 300 55 T 350 55 T 400 55" stroke="#c9a6ff" strokeWidth="1.4" fill="none" opacity="0.5" />
      </svg>
      <b className="esc-hola" translate="no">¡Ho·la!</b>
    </>
  );
}

function EscenaTutor() {
  return (
    <>
      {Array.from({ length: 7 }, (_, n) => (
        <i key={n} className="esc-estrella" style={{ "--x": `${8 + ((n * 41) % 84)}%`, "--y": `${6 + ((n * 23) % 60)}%`, "--d": `${-n * 0.6}s` }} />
      ))}
      <span className="esc-burbuja izq" translate="no">¿Cómo se dice 你好?</span>
      <span className="esc-burbuja der" translate="no">¡Hola! Se dice así.</span>
      <span className="esc-burbuja escribe"><i /><i /><i /></span>
    </>
  );
}

const ESCENAS = {
  ruta: EscenaRuta,
  unidades: EscenaUnidades,
  juegos: EscenaJuegos,
  dele: EscenaDele,
  pronunciacion: EscenaPronunciacion,
  tutor: EscenaTutor,
};

export function EscenaMundo({ tema }) {
  const Escena = ESCENAS[tema];
  return (
    <span className="pc-carta-escena" aria-hidden="true">
      {Escena ? <Escena /> : null}
    </span>
  );
}
