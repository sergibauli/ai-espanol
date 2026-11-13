import * as React from "react";
import { Capa, Vin, n } from "./piezas.jsx";
import "../../../styles/v14-ruta-B1.css";

/*
  B1 · El este de China (华东): noche en Shanghái (Lujiazui y el Bund sobre el Huangpu) y los canales de Suzhou,
  con la pagoda Leifeng de Hangzhou al fondo.
  Cómo está pintado (v14, «listón gráfico», mismo método que el piloto A1):
  - Planos: cielo (CSS) → colinas de Hangzhou y viaducto → skyline lejano → Lujiazui + Bund + río Huangpu →
    orilla lejana del canal (arboleda y casas) → casas de Suzhou, puente de arco y canal → primer plano (sauce, alero, lotos).
  - Lo ESTÁTICO va en los SVG grandes; lo VIVO, en capas HTML (<Vivo>) con un «lienzo» que calca el viewBox 800×1000.
  - La pintura base es de día (acuarela jiangnan); el atardecer y la NOCHE (momento estrella) son tintes multiply
    y, por encima del tinte, las capas de luces (ventanas, neones, reflejos, farolillos). Solo cambia opacity.
*/

// ---------- utilidades ----------
const azar = (i) => {
  const v = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return v - Math.floor(v);
};
const r1 = (v) => Math.round(v * 10) / 10;
// Coloca un elemento HTML en coordenadas del viewBox (800 × 1000)
const pos = (x, y, ancho, extra) => ({ left: `${x / 8}%`, top: `${y / 10}%`, width: `${ancho / 8}%`, ...extra });
// Capa HTML con el mismo encuadre que los SVG (plano = mr-lejos | mr-medio | mr-cerca para heredar su parallax)
const Vivo = ({ plano, clase = "", children }) => (
  <div className={`mr-capa ${plano} b1-vivo ${clase}`}>
    <div className="b1-lienzo">{children}</div>
  </div>
);
// Grupo SVG con entrada escalonada (el parallax va en la capa; la entrada, en este envoltorio)
const Entra = ({ i, children }) => (
  <g className="b1-entra" style={{ "--i": i }}>
    {children}
  </g>
);

const RIO = 700; // línea de agua del Huangpu
const CANAL = 930; // línea de agua del canal en primer plano

// ---------- degradados y motivos (ids mrB1…) ----------
function Defs() {
  const grad = (id, paradas, extra) => (
    <linearGradient id={id} {...extra}>
      {paradas.map(([o, c, a], k) => <stop key={k} offset={o} stopColor={c} stopOpacity={a ?? 1} />)}
    </linearGradient>
  );
  const halo = (id, paradas, extra) => (
    <radialGradient id={id} {...extra}>
      {paradas.map(([o, c, a], k) => <stop key={k} offset={o} stopColor={c} stopOpacity={a ?? 1} />)}
    </radialGradient>
  );
  const vertical = { x1: 0, y1: 0, x2: 0, y2: 1 };
  return (
    <defs>
      {/* torres: cara a la luna (izquierda) clara, cara opuesta en sombra */}
      {grad("mrB1torre", [[0, "#e6eef6"], [0.35, "#c2d2e4"], [1, "#8198b8"]])}
      {grad("mrB1torre2", [[0, "#cfdbe8"], [1, "#93a7c2"]])}
      {grad("mrB1torre3", [[0, "#d3dde8"], [1, "#b6c4d6"]])}
      {grad("mrB1bund", [[0, "#f1e6cf"], [1, "#bfae8c"]])}
      {grad("mrB1bundLuz", [[0, "#fff0b8"], [0.5, "#ffc95e"], [1, "#f08a2c"]], vertical)}
      {grad("mrB1colina", [[0, "#9fb0c8"], [1, "#d6dfe6"]], { gradientUnits: "userSpaceOnUse", x1: 0, y1: 600, x2: 0, y2: 700 })}
      {grad("mrB1colina2", [[0, "#b4c2d4"], [1, "#e2e8ea"]], { gradientUnits: "userSpaceOnUse", x1: 0, y1: 620, x2: 0, y2: 700 })}
      {grad("mrB1bruma", [[0, "#eef1ea", 0], [0.7, "#eef1ea", 0.55], [1, "#eef1ea", 0.9]], { gradientUnits: "userSpaceOnUse", x1: 0, y1: 596, x2: 0, y2: 702 })}
      {grad("mrB1rio", [[0, "#cfe3d8"], [0.3, "#a5cdbd"], [1, "#6fa898"]], { gradientUnits: "userSpaceOnUse", x1: 0, y1: 700, x2: 0, y2: 860 })}
      {grad("mrB1canal", [[0, "#a9cfbd"], [0.4, "#77ad98"], [1, "#3f7a6c"]], { gradientUnits: "userSpaceOnUse", x1: 0, y1: 838, x2: 0, y2: 1010 })}
      {grad("mrB1muro", [[0, "#fbf8ef"], [0.7, "#ece7da"], [1, "#c9cdbf"]], vertical)}
      {grad("mrB1teja", [[0, "#5b6270"], [1, "#2a2e38"]], vertical)}
      {grad("mrB1piedra", [[0, "#efe9da"], [0.6, "#cfc7b4"], [1, "#9a9a88"]], vertical)}
      {grad("mrB1madera", [[0, "#6a4a34"], [1, "#3b281c"]], vertical)}
      {grad("mrB1sombraH", [[0, "#1c2430", 0], [1, "#1c2430", 0.32]])}
      {/* reflejos estáticos de las luces en el agua (columna que se desvanece hacia abajo) */}
      {grad("mrB1refOro", [[0, "#ffd27a", 0.85], [1, "#ffd27a", 0]], vertical)}
      {grad("mrB1refRosa", [[0, "#ff6fb4", 0.85], [1, "#ff6fb4", 0]], vertical)}
      {grad("mrB1refCian", [[0, "#8fe0ff", 0.8], [1, "#8fe0ff", 0]], vertical)}
      {grad("mrB1refRojo", [[0, "#ff5a3c", 0.8], [1, "#ff5a3c", 0]], vertical)}
      {/* halos */}
      {halo("mrB1bloom", [[0, "#fff6d0", 0.95], [0.3, "#ffc468", 0.6], [1, "#ff9a3c", 0]])}
      {halo("mrB1bloomRosa", [[0, "#ffd0ea", 0.95], [0.3, "#ff5fb0", 0.55], [1, "#b03cff", 0]])}
      {halo("mrB1bloomCian", [[0, "#e8fbff", 0.95], [0.3, "#6fd4ff", 0.5], [1, "#3c7bff", 0]])}
      {halo("mrB1bloomRojo", [[0, "#ffe9c0", 0.95], [0.3, "#ff6a3c", 0.6], [1, "#e0201c", 0]])}
      {halo("mrB1farolLuz", [[0, "#fff6c4"], [0.4, "#ffb04a"], [0.8, "#f0502c"], [1, "#c81c28"]], { cx: 0.5, cy: 0.55, r: 0.62 })}
      {halo("mrB1esfera", [[0, "#fbe4ee"], [0.6, "#d894b4"], [1, "#9a5c84"]], { cx: 0.36, cy: 0.32, r: 0.75 })}
      {halo("mrB1esferaLuz", [[0, "#fff0f8"], [0.45, "#ff5aa8"], [1, "#8a1a7a"]], { cx: 0.38, cy: 0.34, r: 0.75 })}
      {halo("mrB1hoja", [[0, "#9cc08f"], [0.6, "#5e8f6c"], [1, "#3a6650"]], { cx: 0.34, cy: 0.28, r: 0.8 })}
      {halo("mrB1loto", [[0, "#8fc79a"], [0.7, "#4f9a70"], [1, "#2f7458"]], { cx: 0.4, cy: 0.3, r: 0.8 })}
      {halo("mrB1petalo", [[0, "#fff4f8"], [0.5, "#f9b4cf"], [1, "#e56a9c"]], { cx: 0.5, cy: 0.1, r: 0.95 })}
      {/* motivos: ventanas encendidas (3 repartos), tejas, celosía y plantas de oficinas */}
      {n(3).map((k) => (
        <pattern key={k} id={`mrB1ven${k}`} width="16" height="20" patternUnits="userSpaceOnUse">
          {n(20).map((c) => (azar(k * 31 + c * 7) > 0.48 ? (
            <rect key={c} x={1 + (c % 4) * 4} y={1 + Math.floor(c / 4) * 4} width="2.3" height="2.5" fill={["#ffd98a", "#fff2c4", "#ffc46a", "#bfe6ff"][Math.floor(azar(k * 5 + c) * 4)]} opacity={r1(0.55 + azar(c * 3 + k) * 0.45)} />
          ) : null))}
        </pattern>
      ))}
      <pattern id="mrB1plantas" width="6" height="5" patternUnits="userSpaceOnUse"><path d="M0 .5H6" stroke="#5e7696" strokeWidth=".7" opacity=".45" /><path d="M3 0V5" stroke="#fff" strokeWidth=".4" opacity=".25" /></pattern>
      <pattern id="mrB1tejas" width="5" height="16" patternUnits="userSpaceOnUse"><path d="M.6 0V16" stroke="#191c24" strokeWidth="1.2" /><path d="M3 0V16" stroke="#8791a4" strokeWidth=".6" opacity=".55" /></pattern>
      <pattern id="mrB1celosia" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M0 0H4V4M2 0V4M0 2H4" fill="none" stroke="#3b281c" strokeWidth=".7" /></pattern>
    </defs>
  );
}

// ---------- skyline: datos deterministas ----------
const FONDO = n(46).map((i) => {
  const x = i * 17.6 - 4 + azar(i) * 6;
  const centro = Math.abs(x - 400) < 130;
  return { x: r1(x), w: r1(11 + azar(i * 3) * 9), y: r1((centro ? 664 : 628) + azar(i * 7) * (centro ? 18 : 36)) };
});
// [x, ancho, cima]
const FRENTE = [
  [154, 22, 640], [178, 18, 610], [252, 20, 626], [274, 24, 652], [300, 18, 666], [322, 22, 674], [350, 18, 668],
  [440, 20, 672], [466, 24, 662], [494, 20, 646], [520, 22, 616], [546, 18, 588], [610, 16, 606], [672, 12, 618], [742, 24, 562], [768, 22, 604], [790, 20, 634],
];
const T_SHANGHAI = "M626 700 C627 600 631 500 639 426 Q645 408 659 413 L663 432 C668 520 671 610 672 700Z";
const T_WFC = "M684 700 L695 452 L714 448 L728 700Z";
// Jin Mao: tramos que se estrechan como una pagoda
const JINMAO = (() => {
  let y = RIO;
  let m = 17;
  return [44, 36, 30, 25, 20, 16, 13, 10, 8, 6].map((h) => {
    const tramo = { y: y - h, h, m };
    y -= h;
    m -= 1.35;
    return tramo;
  });
})();
const tramoJinMao = ({ y, h, m }) => `M${r1(592 - m - 1.4)} ${y + h} L${r1(592 - m)} ${y} H${r1(592 + m)} L${r1(592 + m + 1.4)} ${y + h}Z`;
const PERLA = 228;

function Edificio({ x, w, y, k, relleno = "mrB1torre2" }) {
  const tipo = k % 4;
  return (
    <g>
      {tipo === 1 && <rect x={x + w * 0.2} y={y - 7} width={w * 0.6} height="8" fill={`url(#${relleno})`} />}
      {tipo === 2 && <path d={`M${x + w / 2} ${y} v-16`} stroke="#8fa3be" strokeWidth="1" />}
      {tipo === 3 && <path d={`M${x} ${y} L${x + w} ${y - 9} V${y}Z`} fill={`url(#${relleno})`} />}
      <rect x={x} y={y} width={w} height={RIO - y} fill={`url(#${relleno})`} />
      <rect x={x} y={y} width={w} height={RIO - y} fill="url(#mrB1plantas)" />
      <rect x={x} y={y} width="1" height={RIO - y} fill="#fff" opacity=".6" />
      <rect x={x + w * 0.62} y={y} width={w * 0.38} height={RIO - y} fill="url(#mrB1sombraH)" />
    </g>
  );
}

// El Bund: bancos y aduana neoclásicos; con luz = iluminación dorada nocturna
function Bund({ luz }) {
  const cara = luz ? "url(#mrB1bundLuz)" : "url(#mrB1bund)";
  const linea = luz ? "#a8601c" : "#8f7f62";
  const bloques = [[2, 42, 662], [48, 46, 652], [98, 52, 664]];
  return (
    <g opacity={luz ? 0.94 : 1}>
      {/* torre del reloj de la Aduana y cúpula del banco */}
      <rect x="64" y="612" width="14" height="42" fill={cara} />
      <path d="M62 612 L71 595 L80 612Z" fill={cara} /><path d="M71 595 v-9" stroke={linea} strokeWidth="1" />
      <circle cx="71" cy="623" r="4.2" fill={luz ? "#fffbe0" : "#f7f1e0"} stroke={linea} strokeWidth=".7" /><path d="M71 623 v-2.8 M71 623 h2" stroke="#3b2416" strokeWidth=".6" />
      <path d="M111 664 A12 12 0 0 1 135 664Z" fill={cara} /><rect x="121" y="646" width="4" height="7" fill={cara} />
      {bloques.map(([x, w, y]) => (
        <g key={x}>
          <rect x={x} y={y} width={w} height={RIO - y} fill={cara} />
          <rect x={x - 1} y={y} width={w + 2} height="2.6" fill={luz ? "#fff6cf" : "#fbf5e4"} />
          <rect x={x} y={y + 9} width={w} height="1" fill={linea} opacity=".7" />
          {n(Math.floor(w / 5)).map((c) => (
            <g key={c}>
              <rect x={x + 2 + c * 5} y={y + 12} width="1.6" height={RIO - y - 18} fill={luz ? "#fff3c4" : "#fbf5e6"} opacity=".9" />
              <rect x={x + 3.8 + c * 5} y={y + 13} width="2.2" height={RIO - y - 20} fill={luz ? "#7a3c10" : "#6f6656"} opacity={luz ? 0.5 : 0.4} />
            </g>
          ))}
          <rect x={x} y={RIO - 6} width={w} height="6" fill={linea} opacity=".45" />
          {!luz && <rect x={x + w * 0.6} y={y} width={w * 0.4} height={RIO - y} fill="url(#mrB1sombraH)" />}
        </g>
      ))}
    </g>
  );
}

// Perla de Oriente (cx = PERLA): base pintada o versión encendida
function Perla({ luz }) {
  const x = PERLA;
  const metal = luz ? "#c9a8ff" : "#aebdd2";
  const esfera = luz ? "url(#mrB1esferaLuz)" : "url(#mrB1esfera)";
  return (
    <g>
      {luz && <circle cx={x} cy="640" r="46" fill="url(#mrB1bloomRosa)" opacity=".8" />}
      {luz && <circle cx={x} cy="552" r="30" fill="url(#mrB1bloomRosa)" opacity=".8" />}
      <path d={`M${x} 512 V452`} stroke={metal} strokeWidth="1.6" />
      <path d={`M${x - 2.4} 548 L${x - 1.4} 500 h2.8 L${x + 2.4} 548Z`} fill={metal} />
      <path d={`M${x - 5} 640 V560 M${x} 640 V560 M${x + 5} 640 V560`} stroke={metal} strokeWidth="2.6" />
      <path d={`M${x - 22} 700 L${x - 6} 648 M${x + 22} 700 L${x + 6} 648 M${x} 700 V650`} stroke={metal} strokeWidth="4" strokeLinecap="round" />
      <path d={`M${x - 15} 700 L${x - 3} 668 M${x + 15} 700 L${x + 3} 668`} stroke={metal} strokeWidth="1.4" opacity=".8" />
      {n(5).map((k) => <circle key={k} cx={x} cy={578 + k * 11} r="2.6" fill={esfera} />)}
      <circle cx={x} cy="640" r="17" fill={esfera} />
      <circle cx={x} cy="552" r="11" fill={esfera} />
      <circle cx={x} cy="508" r="5" fill={esfera} />
      <path d={`M${x - 16.5} 643 h33 M${x - 10.6} 554 h21.2`} stroke={luz ? "#ffe6f4" : "#7d5a78"} strokeWidth="1.2" opacity=".8" />
      {!luz && <path d={`M${x - 12} 632 a14 14 0 0 1 9 -8`} fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity=".8" />}
    </g>
  );
}

// Pagoda octogonal (Leifeng): cx, y = base, s = escala. Con luz = versión dorada iluminada
function Pagoda({ cx, y, s = 1, pisos = 5, luz = false }) {
  const piezas = [];
  let base = y;
  let ancho = 15 * s;
  for (let k = 0; k < pisos; k++) {
    const alto = (9 - k * 0.7) * s;
    piezas.push(
      <g key={k}>
        <rect x={r1(cx - ancho * 0.72)} y={r1(base - alto)} width={r1(ancho * 1.44)} height={r1(alto)} fill={luz ? "#ffc65a" : "#b7867a"} />
        {!luz && <rect x={r1(cx + ancho * 0.2)} y={r1(base - alto)} width={r1(ancho * 0.52)} height={r1(alto)} fill="#5a3f4a" opacity=".35" />}
        <path d={`M${r1(cx - ancho - 3 * s)} ${r1(base - alto - 0.6 * s)} Q${r1(cx - ancho * 0.6)} ${r1(base - alto + 0.8 * s)} ${r1(cx - ancho * 0.5)} ${r1(base - alto - 3.4 * s)} H${r1(cx + ancho * 0.5)} Q${r1(cx + ancho * 0.6)} ${r1(base - alto + 0.8 * s)} ${r1(cx + ancho + 3 * s)} ${r1(base - alto - 0.6 * s)} L${r1(cx + ancho)} ${r1(base - alto + 1.6 * s)} H${r1(cx - ancho)}Z`} fill={luz ? "#ffe9a8" : "#5c6676"} />
      </g>,
    );
    base -= alto + 3 * s;
    ancho -= 1.9 * s;
  }
  return (
    <g>
      {luz && <ellipse cx={cx} cy={y - 28 * s} rx={34 * s} ry={44 * s} fill="url(#mrB1bloom)" opacity=".75" />}
      {piezas}
      <path d={`M${cx} ${r1(base + 2 * s)} v${r1(-13 * s)}`} stroke={luz ? "#fff3c0" : "#5c6676"} strokeWidth={r1(1.4 * s)} />
      <circle cx={cx} cy={r1(base - 5 * s)} r={r1(1.6 * s)} fill={luz ? "#fff3c0" : "#c8961e"} />
    </g>
  );
}

// Masa de árbol con volumen (copas redondas con luz arriba a la izquierda y sombra debajo)
function Arbol({ x, y, r, semilla = 1 }) {
  return (
    <g>
      {n(5).map((k) => {
        const cx = x + (azar(semilla * 7 + k) - 0.5) * r * 1.9;
        const cy = y - azar(semilla * 3 + k * 5) * r * 0.9;
        const radio = r * (0.55 + azar(semilla + k * 11) * 0.4);
        return (
          <g key={k}>
            <circle cx={r1(cx + 1.5)} cy={r1(cy + 3)} r={r1(radio)} fill="#2f5646" opacity=".55" />
            <circle cx={r1(cx)} cy={r1(cy)} r={r1(radio)} fill="url(#mrB1hoja)" />
          </g>
        );
      })}
    </g>
  );
}

// ---------- casas de Suzhou: muro encalado, tejas negras y hastiales «cabeza de caballo» ----------
// Huecos (puerta y ventanas con celosía) de una casa: se usan para pintarlos y para encenderlos
const huecos = (x, y, w, h) => {
  const ventanas = [];
  const columnas = Math.max(2, Math.floor(w / 34));
  for (let c = 0; c < columnas; c++) {
    const vx = x + 12 + (c * (w - 24 - 16)) / Math.max(1, columnas - 1);
    if (h > 78) ventanas.push([r1(vx), y - h + 16, 16, 18]);
    if (c !== Math.floor(columnas / 2)) ventanas.push([r1(vx), y - 44, 16, 20]);
  }
  const puerta = [r1(x + 12 + (Math.floor(columnas / 2) * (w - 40)) / Math.max(1, columnas - 1) - 2), y - 40, 20, 40];
  return { ventanas, puerta };
};
function Casa({ x, y, w, h, s = 1 }) {
  const cima = y - h;
  const { ventanas, puerta } = huecos(x, y, w, h);
  const hastial = (hx, alto) => (
    <g>
      <rect x={hx} y={cima - alto} width="10" height={alto + 8} fill="url(#mrB1muro)" />
      <path d={`M${hx - 3} ${cima - alto + 1} q2 -1 3 -4 h10 q1 3 3 4 l-1 2 h-14Z`} fill="#2a2e38" />
      <path d={`M${hx - 2} ${cima - alto - 2.6} h14`} stroke="#8791a4" strokeWidth=".7" />
    </g>
  );
  return (
    <g transform={s !== 1 ? `translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})` : undefined}>
      <rect x={x} y={cima} width={w} height={h} fill="url(#mrB1muro)" />
      {/* manchas de humedad y musgo junto al agua, sombra del alero y cara en sombra */}
      <rect x={x} y={y - 16} width={w} height="16" fill="#6f8a72" opacity=".28" />
      <rect x={x} y={cima} width={w} height="7" fill="#1c2430" opacity=".22" />
      <rect x={x + w * 0.7} y={cima} width={w * 0.3} height={h} fill="url(#mrB1sombraH)" opacity=".6" />
      {/* faldón de tejas con alero volado y cumbrera */}
      <path d={`M${x - 6} ${cima + 2} L${x + 5} ${cima - 17} H${x + w - 5} L${x + w + 6} ${cima + 2}Z`} fill="url(#mrB1teja)" />
      <path d={`M${x - 6} ${cima + 2} L${x + 5} ${cima - 17} H${x + w - 5} L${x + w + 6} ${cima + 2}Z`} fill="url(#mrB1tejas)" opacity=".8" />
      <path d={`M${x - 6} ${cima + 2} H${x + w + 6}`} stroke="#9aa3b4" strokeWidth="1.3" />
      <path d={`M${x + 2} ${cima - 18} q3 -1 4 -4 M${x + 4} ${cima - 18.5} H${x + w - 4} M${x + w - 2} ${cima - 18} q-3 -1 -4 -4`} fill="none" stroke="#1d2028" strokeWidth="3" strokeLinecap="round" />
      <path d={`M${x + 5} ${cima - 20.4} H${x + w - 5}`} stroke="#aab3c4" strokeWidth=".8" />
      {hastial(x - 4, 12)}
      {hastial(x + w - 6, 12)}
      {/* puerta y ventanas con celosía */}
      <rect x={puerta[0] - 2} y={puerta[1] - 3} width={puerta[2] + 4} height="3" fill="#2a2e38" />
      <rect x={puerta[0]} y={puerta[1]} width={puerta[2]} height={puerta[3]} fill="url(#mrB1madera)" />
      <path d={`M${puerta[0] + puerta[2] / 2} ${puerta[1]} v${puerta[3]}`} stroke="#241710" strokeWidth=".8" />
      {ventanas.map(([vx, vy, vw, vh]) => (
        <g key={`${vx}-${vy}`}>
          <rect x={vx - 1.5} y={vy - 1.5} width={vw + 3} height={vh + 3} fill="#4a3324" />
          <rect x={vx} y={vy} width={vw} height={vh} fill="#2b2a2c" />
          <rect x={vx} y={vy} width={vw} height={vh} fill="url(#mrB1celosia)" />
          <rect x={vx - 3} y={vy + vh + 1.5} width={vw + 6} height="2" fill="#b9b4a4" />
        </g>
      ))}
    </g>
  );
}
// Luces de una casa (por encima del tinte): ventanas cálidas con celosía a contraluz y resplandor
function CasaLuz({ x, y, w, h }) {
  const { ventanas, puerta } = huecos(x, y, w, h);
  return (
    <g>
      {ventanas.map(([vx, vy, vw, vh], k) => (
        <g key={`${vx}-${vy}`} opacity={k % 3 === 2 ? 0.55 : 1}>
          <ellipse cx={vx + vw / 2} cy={vy + vh / 2} rx={vw * 1.5} ry={vh * 1.4} fill="url(#mrB1bloom)" opacity=".55" />
          <rect x={vx} y={vy} width={vw} height={vh} fill={k % 2 ? "#ffcf72" : "#ffb85a"} />
          <rect x={vx} y={vy} width={vw} height={vh} fill="url(#mrB1celosia)" />
        </g>
      ))}
      <rect x={puerta[0] + 2} y={puerta[1] + 3} width={puerta[2] - 4} height="9" fill="#ffb85a" opacity=".75" />
      <rect x={puerta[0] + 2} y={puerta[1] + 3} width={puerta[2] - 4} height="9" fill="url(#mrB1celosia)" />
    </g>
  );
}
// [x, base, ancho, alto de muro]
const CASAS = [[4, 892, 108, 84], [118, 892, 116, 110], [566, 892, 120, 104], [692, 892, 106, 80]];
const CASAS_LEJOS = [[150, 846, 54, 34], [208, 846, 44, 42], [256, 846, 50, 30], [494, 846, 48, 32], [546, 846, 46, 42], [596, 846, 56, 34]];

// Puente de arco de piedra (se pinta dos veces: el puente y su reflejo invertido, que cierran el círculo)
function Puente({ reflejo = false }) {
  const arco = `M304 ${CANAL} A96 96 0 0 1 496 ${CANAL}`;
  return (
    <g>
      <path d={`M226 894 Q400 730 574 894 L574 ${CANAL} H496 A96 96 0 0 0 304 ${CANAL} H226Z`} fill="url(#mrB1piedra)" />
      {/* dovelas del arco */}
      <path d={arco} fill="none" stroke="#f3eee0" strokeWidth="9" />
      <path d={arco} fill="none" stroke="#8f8a78" strokeWidth="9" strokeDasharray="1 11" />
      <path d={`M296 ${CANAL} A104 104 0 0 1 504 ${CANAL}`} fill="none" stroke="#8f8a78" strokeWidth=".8" opacity=".7" />
      {/* intradós en sombra */}
      <path d={`M309 ${CANAL} A91 91 0 0 1 491 ${CANAL}`} fill="none" stroke="#39493f" strokeWidth="5" opacity=".55" />
      {!reflejo && (
        <>
          {/* sillares, musgo junto al agua, pretil con balaustres y filo de luz de luna */}
          <path d="M240 900 h46 M250 912 h44 M514 900 h46 M506 912 h44 M262 888 h30 M508 888 h30" stroke="#8f8a78" strokeWidth=".8" opacity=".7" />
          <path d={`M226 ${CANAL - 10} H300 V${CANAL} H226Z M500 ${CANAL - 10} H574 V${CANAL} H500Z`} fill="#5e7f62" opacity=".4" />
          <path d="M226 884 Q400 720 574 884" fill="none" stroke="#d8d2c2" strokeWidth="3" />
          <path d="M226 893 Q400 729 574 893" fill="none" stroke="#b5ad9c" strokeWidth="1.4" />
          {n(19).map((k) => {
            const t = (k + 0.5) / 19;
            const bx = 226 + 348 * t;
            const by = 884 * (1 - t) * (1 - t) + 2 * 720 * t * (1 - t) + 884 * t * t;
            return <rect key={k} x={r1(bx - 1.1)} y={r1(by)} width="2.2" height="9.5" fill="#cfc7b4" />;
          })}
          <path d="M226 882.5 Q400 718.5 574 882.5" fill="none" stroke="#fff" strokeWidth="1" opacity=".85" />
        </>
      )}
    </g>
  );
}

// Loto: hoja con escote y, si hay flor, pétalos con degradado
function Loto({ x, y, r = 24, flor = false, capullo = false }) {
  return (
    <g>
      <ellipse cx={x + 2} cy={y + 3} rx={r} ry={r * 0.3} fill="#1f4a40" opacity=".5" />
      <ellipse cx={x} cy={y} rx={r} ry={r * 0.3} fill="url(#mrB1loto)" />
      <path d={`M${x} ${y} L${x + r * 0.95} ${y - r * 0.1} L${x + r * 0.9} ${y + r * 0.12}Z`} fill="#3f7a6c" />
      <path d={`M${x} ${y} L${x - r * 0.8} ${y - r * 0.14} M${x} ${y} L${x - r * 0.6} ${y + r * 0.2} M${x} ${y} L${x + r * 0.1} ${y - r * 0.28} M${x} ${y} L${x + r * 0.2} ${y + r * 0.28}`} stroke="#2f7458" strokeWidth=".8" opacity=".8" />
      <path d={`M${x - r * 0.9} ${y - r * 0.08} A${r} ${r * 0.3} 0 0 1 ${x + r * 0.5} ${y - r * 0.26}`} fill="none" stroke="#d6f0d0" strokeWidth=".9" opacity=".7" />
      {capullo && (
        <g>
          <path d={`M${x - r * 0.5} ${y} q-3 -16 1 -30`} fill="none" stroke="#3f7a5c" strokeWidth="1.4" />
          <path d={`M${x - r * 0.5 + 1} ${y - 30} q-6 -8 0 -17 q6 9 0 17z`} fill="url(#mrB1petalo)" />
        </g>
      )}
      {flor && <FlorLoto x={x + r * 0.2} y={y - 5} s={r / 26} />}
    </g>
  );
}
const FlorLoto = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-62, -34, 34, 62].map((a) => <path key={a} d="M0 0 q-7 -11 0 -24 q7 13 0 24z" fill="url(#mrB1petalo)" transform={`rotate(${a})`} opacity=".95" />)}
    <path d="M0 0 q-9 -14 0 -30 q9 16 0 30z" fill="url(#mrB1petalo)" />
    {[-17, 17].map((a) => <path key={a} d="M0 2 q-8 -12 0 -26 q8 14 0 26z" fill="#fde0ea" stroke="#e98bb0" strokeWidth=".5" transform={`rotate(${a})`} />)}
    <circle cx="0" cy="-5" r="2.6" fill="#ffd36a" />
  </g>
);

// ================= PANORAMA =================
// --- plano lejano: colinas de Hangzhou con la pagoda Leifeng, viaducto, skyline y río Huangpu ---
function PlanoLejos() {
  return (
    <Capa clase="mr-lejos">
      <Defs />
      <Entra i={1}>
        <path d="M-10 700 V640 C60 620 110 632 170 640 C240 650 280 622 330 618 C400 612 430 640 500 636 C580 630 640 606 700 612 C750 616 790 628 810 624 V700Z" fill="url(#mrB1colina2)" />
        <path d="M200 700 C250 676 300 642 356 638 C400 636 420 660 470 664 C520 668 560 690 600 700Z" fill="url(#mrB1colina)" />
        <path d="M250 676 C290 652 320 640 356 638" fill="none" stroke="#fff" strokeWidth="1" opacity=".6" />
        <Pagoda cx={356} y={641} s={1} />
        {FONDO.map(({ x, w, y }, k) => (
          <g key={k}>
            <rect x={x} y={y} width={w} height={RIO - y} fill="url(#mrB1torre3)" />
            <rect x={x} y={y} width=".8" height={RIO - y} fill="#fff" opacity=".5" />
          </g>
        ))}
        {/* viaducto del tren de levitación magnética */}
        <rect x="-10" y="655" width="820" height="2.4" fill="#aab8cc" /><rect x="-10" y="655" width="820" height=".8" fill="#fff" opacity=".7" />
        {n(30).map((k) => <rect key={k} x={k * 28 + 6} y="657" width="2" height="43" fill="#aab8cc" opacity=".8" />)}
      </Entra>
      <Entra i={2}>
        {FRENTE.map(([x, w, y], k) => <Edificio key={x} x={x} w={w} y={y} k={k} />)}
        <Bund />
        {/* Lujiazui: Jin Mao, Torre de Shanghái y Centro Financiero (el «abrebotellas») */}
        <path d="M592 492 v-30" stroke="#8fa3be" strokeWidth="1.6" />
        {JINMAO.map((t) => <path key={t.y} d={tramoJinMao(t)} fill="url(#mrB1torre)" />)}
        {JINMAO.map((t) => <path key={t.y} d={`M${r1(592 - t.m - 1.4)} ${t.y + t.h} H${r1(592 + t.m + 1.4)}`} stroke="#6f86a8" strokeWidth=".8" />)}
        <rect x="575" y="492" width="34" height="208" fill="url(#mrB1plantas)" opacity=".7" />
        <path d={T_SHANGHAI} fill="url(#mrB1torre)" />
        <path d={T_SHANGHAI} fill="url(#mrB1plantas)" opacity=".8" />
        <path d="M639 426 C631 500 627 600 626 700" fill="none" stroke="#fff" strokeWidth="1.2" opacity=".85" />
        <path d="M644 420 C652 500 640 600 662 700 M652 412 C664 500 654 600 670 660 M634 470 C642 560 632 640 644 700" fill="none" stroke="#f4f8fc" strokeWidth=".9" opacity=".6" />
        <path d={T_WFC} fill="url(#mrB1torre)" />
        <path d={T_WFC} fill="url(#mrB1plantas)" opacity=".8" />
        <path d="M700 461 L711 459.5 L713 477 L699 478Z" fill="#dfe7ec" /><path d="M695 452 L684 700" stroke="#fff" strokeWidth="1" opacity=".8" />
        <path d="M714 448 L706 700" stroke="#fff" strokeWidth=".6" opacity=".5" />
        <Perla />
        {/* bruma al pie del skyline y paseo de la orilla */}
        <rect x="-10" y="596" width="820" height="106" fill="url(#mrB1bruma)" />
        <rect x="-10" y="697" width="820" height="4" fill="#8395ac" />
      </Entra>
      <Entra i={3}>
        <rect x="-10" y={RIO} width="820" height="420" fill="url(#mrB1rio)" />
        {n(54).map((k) => {
          const y = 705 + azar(k * 3) * 90;
          const largo = 12 + azar(k * 7) * 44;
          return <rect key={k} x={r1(azar(k * 13) * 800 - 20)} y={r1(y)} width={r1(largo)} height={k % 3 ? 0.8 : 1.3} rx=".6" fill={k % 4 ? "#fff" : "#4f8f80"} opacity={k % 4 ? 0.42 : 0.3} />;
        })}
      </Entra>
    </Capa>
  );
}

// --- plano medio: orilla lejana del canal, con arboleda, casas pequeñas y su reflejo ---
function PlanoMedio() {
  return (
    <Capa clase="mr-medio">
      <Entra i={4}>
        <ellipse cx="400" cy="806" rx="520" ry="26" fill="#eef1ea" opacity=".55" />
        {n(17).map((k) => {
          const x = k * 50 - 8 + azar(k * 9) * 18;
          const centro = Math.abs(x - 400) < 80;
          return <Arbol key={k} x={r1(x)} y={840} r={centro ? 11 : 17 + azar(k) * 9} semilla={k + 3} />;
        })}
        {CASAS_LEJOS.map(([x, y, w, h]) => <Casa key={x} x={x} y={y} w={w * 2} h={h * 2} s={0.5} />)}
        <rect x="-10" y="845" width="820" height="7" fill="url(#mrB1piedra)" /><rect x="-10" y="850" width="820" height="2.4" fill="#3f5a4c" opacity=".6" />
        <rect x="-10" y="852" width="820" height="260" fill="url(#mrB1canal)" />
        {CASAS_LEJOS.map(([x, , w, h]) => <rect key={x} x={x} y="853" width={w} height={h * 0.8} fill="#f6f2e6" opacity=".2" />)}
        {n(16).map((k) => <rect key={k} x={r1(240 + azar(k * 5) * 320)} y={r1(858 + azar(k * 11) * 60)} width={r1(10 + azar(k) * 30)} height=".9" rx=".5" fill="#fff" opacity=".4" />)}
      </Entra>
    </Capa>
  );
}

// --- plano cercano: casas de Suzhou sobre el muelle, puente de arco con su círculo y lotos ---
function PlanoCerca() {
  return (
    <Capa clase="mr-cerca">
      <Entra i={5}>
        <Arbol x={236} y={812} r={24} semilla={41} /><Arbol x={566} y={806} r={26} semilla={57} /><Arbol x={30} y={790} r={22} semilla={63} /><Arbol x={776} y={794} r={24} semilla={71} />
        {CASAS.map(([x, y, w, h]) => <Casa key={x} x={x} y={y} w={w} h={h} />)}
        {/* muelles de piedra con hiladas, escalones al agua y amarres */}
        {[-10, 564].map((x) => (
          <g key={x}>
            <rect x={x} y="890" width="246" height={CANAL - 890} fill="url(#mrB1piedra)" />
            <rect x={x} y="890" width="246" height="2.4" fill="#fbf7ea" />
            <path d={`M${x} 903 h246 M${x} 916 h246 ${n(9).map((k) => `M${x + 14 + k * 28} 892 v11 M${x + 28 + k * 28} 903 v13 M${x + 10 + k * 28} 916 v14`).join(" ")}`} stroke="#8f8a78" strokeWidth=".7" opacity=".7" />
            <rect x={x} y={CANAL - 9} width="246" height="9" fill="#4f7358" opacity=".45" />
          </g>
        ))}
        <path d={`M176 ${CANAL} v-30 h12 v8 h12 v8 h12 v8 h12 v6Z`} fill="#d9d2c0" /><path d="M176 900 h12 v8 h12 v8 h12 v8 h12" fill="none" stroke="#fbf7ea" strokeWidth="1.2" />
        <path d={`M624 ${CANAL} v-6 h-12 v-8 h-12 v-8 h-12 v-8 h36Z`} fill="#d9d2c0" opacity=".9" />
      </Entra>
      <Entra i={6}>
        <rect x="-10" y={CANAL} width="820" height="190" fill="url(#mrB1canal)" />
        <g transform={`translate(0 ${CANAL * 2}) scale(1 -1)`} opacity=".3"><Puente reflejo /></g>
        {CASAS.map(([x, , w, h]) => <rect key={x} x={x} y={CANAL} width={w} height={h * 0.55} fill="#f6f2e6" opacity=".16" />)}
        <Puente />
        {/* pareja con sombrilla de papel sobre el puente */}
        <g>
          <path d="M366 806 q-1 -13 4 -15 q5 2 4 15Z" fill="#b3122e" /><circle cx="370" cy="788.5" r="2.7" fill="#2a2228" />
          <path d="M376 806 q0 -15 4.5 -17 q5 2 4.5 17Z" fill="#27324a" /><circle cx="380.5" cy="786.5" r="2.8" fill="#2a2228" />
          <path d="M377 791 V772" stroke="#3b2416" strokeWidth=".9" />
          <path d="M358 776 Q377 758 396 776 Q386 772 377 772.5 Q368 772 358 776Z" fill="#c8102e" /><path d="M358 776 Q377 758 396 776" fill="none" stroke="#f2c14e" strokeWidth=".9" />
          <path d="M377 772 L366 772.8 M377 772 L388 772.8 M377 772 V765" stroke="#8f0c21" strokeWidth=".6" />
        </g>
        <rect x="-10" y={CANAL - 1.5} width="236" height="3" fill="#2f4a40" opacity=".55" /><rect x="574" y={CANAL - 1.5} width="236" height="3" fill="#2f4a40" opacity=".55" />
        {n(22).map((k) => <rect key={k} x={r1(azar(k * 17) * 800 - 10)} y={r1(940 + azar(k * 5) * 58)} width={r1(14 + azar(k * 3) * 40)} height={k % 3 ? 0.9 : 1.4} rx=".6" fill={k % 4 ? "#fff" : "#2f6a5c"} opacity={k % 4 ? 0.34 : 0.4} />)}
        {/* alero del primer plano, arriba a la derecha: enmarca y sostiene dos faroles grandes */}
        <path d="M812 300 L700 340 Q672 350 652 326 Q660 366 700 372 L812 376Z" fill="url(#mrB1teja)" />
        <path d="M812 300 L700 340 Q672 350 652 326 Q660 366 700 372 L812 376Z" fill="url(#mrB1tejas)" opacity=".7" transform="rotate(-19 730 340)" />
        <path d="M812 300 L700 340 Q672 350 652 326" fill="none" stroke="#aab3c4" strokeWidth="1.4" />
        <path d="M690 371 L812 376 V390 L704 380Z" fill="#4a2a20" /><path d="M700 372 L812 376" stroke="#c8961e" strokeWidth="1.2" />
        <Loto x={62} y={972} r={32} flor /><Loto x={136} y={990} r={26} capullo /><Loto x={26} y={998} r={24} /><Loto x={192} y={966} r={19} />
        <Loto x={738} y={976} r={32} flor /><Loto x={672} y={992} r={26} /><Loto x={782} y={998} r={22} capullo /><Loto x={618} y={970} r={18} />
      </Entra>
    </Capa>
  );
}

// --- luces del skyline y del río (por encima del tinte) ---
function LucesLejos({ fiesta }) {
  const columna = (x, ancho, relleno, alto = 80, opacidad = 0.5) => <rect key={`${x}-${relleno}`} x={x - ancho / 2} y={RIO + 2} width={ancho} height={alto} fill={`url(#${relleno})`} opacity={opacidad} />;
  return (
    <Capa clase="mr-lejos b1-luces">
      <g className="b1-luz">
        {/* resplandor de la ciudad contra el cielo y neblina luminosa sobre el río */}
        <ellipse cx="640" cy="690" rx="250" ry="120" fill="url(#mrB1bloomRosa)" opacity=".34" />
        <ellipse cx="90" cy="694" rx="170" ry="70" fill="url(#mrB1bloom)" opacity=".4" />
        <ellipse cx="400" cy="700" rx="240" ry="46" fill="url(#mrB1bloomCian)" opacity=".2" />
        <Pagoda cx={356} y={641} s={1} luz />
        {FONDO.map(({ x, w, y }, k) => <rect key={k} x={x + 1} y={y + 3} width={w - 2} height={RIO - y - 6} fill={`url(#mrB1ven${k % 3})`} opacity=".5" />)}
        {FRENTE.map(([x, w, y], k) => <rect key={x} x={x + 1.5} y={y + 4} width={w - 3} height={RIO - y - 8} fill={`url(#mrB1ven${k % 3})`} opacity=".9" />)}
        {n(3).map((g) => (
          <g key={g} className={`b1-vg b1-vg${g}`}>
            {FRENTE.map(([x, w, y], k) => (k % 3 === g ? <rect key={x} x={x + 1.5} y={y + 6} width={w - 3} height={RIO - y - 10} fill={`url(#mrB1ven${(k + 1) % 3})`} transform="translate(2 2)" /> : null))}
          </g>
        ))}
        {/* coronas y balizas de las azoteas */}
        {FRENTE.map(([x, w, y], k) => (k % 2 ? <rect key={x} x={x} y={y - 0.5} width={w} height="1.6" fill={["#7fe0ff", "#ff7fc0", "#ffd98a"][k % 3]} /> : <circle key={x} className="b1-baliza" cx={x + w / 2} cy={y - (k % 4 === 2 ? 16 : 2)} r="1.5" fill="#ff4a3c" />))}
        <Bund luz />
        <circle cx="71" cy="623" r="9" fill="url(#mrB1bloom)" opacity=".8" />
        {/* Jin Mao: cada tramo con su cornisa dorada */}
        <rect x="576" y="494" width="32" height="204" fill="url(#mrB1ven0)" opacity=".75" />
        {JINMAO.map((t) => <path key={t.y} d={`M${r1(592 - t.m - 1.4)} ${t.y + t.h - 0.5} H${r1(592 + t.m + 1.4)}`} stroke="#ffd98a" strokeWidth="1.3" />)}
        <path d="M592 492 v-30" stroke="#fff3c0" strokeWidth="1.4" /><circle cx="592" cy="480" r="13" fill="url(#mrB1bloom)" opacity=".8" />
        {/* Torre de Shanghái: aristas de led en espiral y corona */}
        <path d={T_SHANGHAI} fill="url(#mrB1ven1)" opacity=".6" />
        <path d="M639 426 C631 500 627 600 626 700" fill="none" stroke="#9fe6ff" strokeWidth="1.4" />
        <path d="M644 420 C652 500 640 600 662 700 M652 412 C664 500 654 600 670 660" fill="none" stroke="#7fd0ff" strokeWidth="1" opacity=".85" />
        <path d="M639 426 Q645 408 659 413 L663 432" fill="none" stroke="#e8fbff" strokeWidth="1.8" /><circle cx="650" cy="418" r="26" fill="url(#mrB1bloomCian)" opacity=".85" />
        {/* Centro Financiero: filos y hueco iluminados */}
        <path d={T_WFC} fill="url(#mrB1ven2)" opacity=".6" />
        <path d="M684 700 L695 452 L714 448 L728 700" fill="none" stroke="#c9b8ff" strokeWidth="1.1" />
        <path d="M700 461 L711 459.5 L713 477 L699 478Z" fill="#3a2a7a" stroke="#e6dcff" strokeWidth="1" /><circle cx="706" cy="462" r="20" fill="url(#mrB1bloomRosa)" opacity=".55" />
        <Perla luz />
        {/* fiesta: espectáculo de luces, barridos de color sobre las torres */}
        {fiesta && ["#ff4fa8", "#4fd8ff", "#ffd24a"].map((color, g) => (
          <g key={color} className="b1-show" style={{ "--d": `${-g * 0.8}s` }} fill={color}>
            <path d={T_SHANGHAI} /><path d={T_WFC} /><rect x="575" y="492" width="34" height="208" />
            {FRENTE.filter(([, , y]) => y < 640).map(([x, w, y]) => <rect key={x} x={x} y={y} width={w} height={RIO - y} />)}
          </g>
        ))}
        {/* farolas del paseo y reflejos largos en el agua */}
        {n(58).map((k) => <circle key={k} cx={k * 14 + 3} cy="698" r="1.1" fill={k % 5 ? "#ffe3a0" : "#fff"} />)}
        <rect x="-10" y="699" width="820" height="2" fill="#ffd98a" opacity=".35" />
        {[[30, 30, "mrB1refOro", 70, 0.6], [72, 16, "mrB1refOro", 86, 0.7], [122, 40, "mrB1refOro", 66, 0.55], [PERLA, 26, "mrB1refRosa", 92, 0.75], [592, 26, "mrB1refOro", 84, 0.6], [649, 34, "mrB1refCian", 96, 0.65], [706, 30, "mrB1refRosa", 88, 0.5], [754, 20, "mrB1refCian", 70, 0.45], [356, 14, "mrB1refOro", 60, 0.55], [190, 14, "mrB1refCian", 56, 0.4], [506, 16, "mrB1refOro", 56, 0.4], [534, 14, "mrB1refRosa", 60, 0.4]].map((r) => columna(r[0], r[1], r[2], Math.min(r[3], 62), r[4] * 0.55))}
      </g>
    </Capa>
  );
}

// --- luces de las casas, del puente y del canal ---
function LucesCerca() {
  return (
    <>
      <Capa clase="mr-medio b1-luces">
        <g className="b1-luz">
          {CASAS_LEJOS.map(([x, y, w, h], k) => (
            <g key={x}>
              <circle cx={x + w * 0.3} cy={y - h * 0.45} r="9" fill="url(#mrB1bloom)" opacity=".7" />
              <rect x={x + w * 0.3 - 3} y={y - h * 0.45 - 3.5} width="6" height="7" fill="#ffc86a" />
              <rect x={x + w * 0.7 - 3} y={y - 16} width="6" height="7" fill="#ffb85a" opacity={k % 2 ? 0.9 : 0.4} />
              <circle cx={x + w - 2} cy={y - 12} r="6" fill="url(#mrB1bloomRojo)" /><circle cx={x + w - 2} cy={y - 12} r="1.8" fill="#ff5a3c" />
              <rect x={x + w - 4.5} y="853" width="5" height="26" fill="url(#mrB1refRojo)" opacity=".7" />
              <rect x={x + w * 0.3 - 3} y="853" width="6" height="30" fill="url(#mrB1refOro)" opacity=".6" />
            </g>
          ))}
        </g>
      </Capa>
      <Capa clase="mr-cerca b1-luces">
        <g className="b1-luz">
          {/* claro de luna sobre los muros encalados y la piedra del puente */}
          {CASAS.map(([x, y, w, h]) => <rect key={x} x={x} y={y - h} width={w * 0.7} height={h} fill="#a9c0f0" opacity=".13" />)}
          <path d={`M226 894 Q400 730 574 894 L574 ${CANAL} H496 A96 96 0 0 0 304 ${CANAL} H226Z`} fill="#a9c0f0" opacity=".24" />
          <path d={`M304 ${CANAL} A96 96 0 0 1 496 ${CANAL}`} fill="none" stroke="#dbe8ff" strokeWidth="9" opacity=".3" />
          <path d="M226 882.5 Q400 718.5 574 882.5" fill="none" stroke="#eef4ff" strokeWidth="1.8" opacity=".85" />
          <circle cx="236" cy="872" r="40" fill="url(#mrB1bloom)" opacity=".4" /><circle cx="564" cy="872" r="40" fill="url(#mrB1bloom)" opacity=".4" />
          {CASAS.map(([x, y, w, h]) => <CasaLuz key={x} x={x} y={y} w={w} h={h} />)}
          {CASAS.map(([x, y, w, h]) => huecos(x, y, w, h).ventanas.filter((v, k) => k % 2 === 0).map(([vx]) => <rect key={`${x}-${vx}`} x={vx + 1} y={CANAL + 2} width="14" height="56" fill="url(#mrB1refOro)" opacity=".42" />))}
          {/* luz cálida que asoma bajo el arco y filo de luna en el círculo del reflejo */}
          <ellipse cx="400" cy={CANAL - 4} rx="92" ry="20" fill="url(#mrB1bloom)" opacity=".32" />
          <path d={`M304 ${CANAL} A96 96 0 0 0 496 ${CANAL}`} fill="none" stroke="#cfe6ff" strokeWidth="1.2" opacity=".35" />
        </g>
      </Capa>
    </>
  );
}

// ================= VIDA (capas HTML sobre el lienzo; solo transform y opacity) =================
// Reflejo de neón en el agua: columna de bandas que ondulan con desfase
const Reflejo = ({ x, y = RIO + 4, ancho, alto = 78, color, bandas = 7, d = 0 }) => (
  <div className="b1-reflejo" style={pos(x - ancho / 2, y, ancho, { height: `${alto / 10}%`, "--c": color })}>
    {n(bandas).map((k) => (
      <i key={k} style={{ top: `${r1((k / bandas) * 100)}%`, "--d": `${r1(d - k * 0.41)}s`, "--w": r1(0.8 + k * 0.1), opacity: r1(0.95 - k * 0.11) }} />
    ))}
  </div>
);

// Farolillo rojo que se mece; el halo late y el brillo interior se enciende con el momento del día
function Farol({ x, y, ancho = 14, cuerda = 8, d = 0, t = 5 }) {
  const alto = cuerda + 40;
  const cy = cuerda + 15;
  return (
    <div className="b1-farol" style={pos(x - ancho / 2, y, ancho, { "--d": `${d}s`, "--t": `${t}s` })}>
      <i className="b1-halo" style={{ top: `${r1(((cy - 60) / alto) * 100)}%` }} />
      <svg viewBox={`0 0 30 ${alto}`}>
        <path d={`M15 0 V${cuerda}`} stroke="#241710" strokeWidth="1.2" />
        <ellipse cx="15" cy={cy} rx="12" ry="12.5" fill="#c81c28" />
        <ellipse className="b1-brillo" cx="15" cy={cy} rx="12" ry="12.5" fill="url(#mrB1farolLuz)" />
        <path d={`M9.5 ${cy - 11} q-6 11 0 22 M15 ${cy - 12.5} v25 M20.5 ${cy - 11} q6 11 0 22`} fill="none" stroke="#7a0a1a" strokeWidth=".8" opacity=".65" />
        <path d={`M5.6 ${cy - 4} a11 11 0 0 1 5 -6.4`} fill="none" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" opacity=".7" />
        <rect x="9.5" y={cuerda} width="11" height="3.2" rx="1" fill="#f2c14e" /><rect x="9.5" y={cy + 11} width="11" height="3.2" rx="1" fill="#f2c14e" />
        <path d={`M15 ${cy + 14} v5 M12.5 ${cy + 19} v6 M15 ${cy + 19} v7 M17.5 ${cy + 19} v6`} stroke="#f2c14e" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// Barca de toldo negro (乌篷船): el barquero rema en la popa y la barca sale de debajo del puente hacia la cámara
const Barca = () => (
  <div className="b1-barca">
    <svg viewBox="0 0 160 80">
      <ellipse className="b1-estela" cx="80" cy="64" rx="76" ry="7" fill="none" stroke="#e6f6f0" strokeWidth="1" opacity=".5" />
      <ellipse className="b1-estela b1-estela2" cx="80" cy="64" rx="76" ry="7" fill="none" stroke="#e6f6f0" strokeWidth=".8" opacity=".35" />
      <ellipse cx="80" cy="65" rx="70" ry="5" fill="#0a1a22" opacity=".45" />
      {/* barquero con sombrero de bambú y remo largo */}
      <g className="b1-remo"><path d="M132 34 L156 76" stroke="#7a5a3a" strokeWidth="2" strokeLinecap="round" /><path d="M152 68 l6 10 l-4 1Z" fill="#7a5a3a" /></g>
      <g className="b1-remero">
        <path d="M122 58 q-2 -20 5 -24 q8 3 6 24Z" fill="#27324a" /><path d="M126 38 l8 -4 l1 3 l-7 5Z" fill="#27324a" />
        <circle cx="127" cy="30" r="4" fill="#e2b48c" /><path d="M117 29 L127 20 L137 29 Q127 26 117 29Z" fill="#d6b06a" stroke="#8a6a2c" strokeWidth=".6" />
      </g>
      {/* casco y toldo trenzado */}
      <path d="M2 50 Q10 58 26 60 H134 Q150 58 158 46 L150 64 Q80 72 12 64Z" fill="#15110e" />
      <path d="M2 50 Q10 58 26 60 H134 Q150 58 158 46" fill="none" stroke="#6d5a42" strokeWidth="1.4" />
      <path d="M38 60 Q40 30 72 28 Q104 30 106 60Z" fill="#1d1814" />
      <path d="M46 60 Q48 36 72 34 M58 60 Q60 33 72 31 M86 60 Q84 33 72 31 M98 60 Q96 36 72 34 M40 48 H104 M42 40 H102" fill="none" stroke="#4a3d2e" strokeWidth=".9" />
      <path d="M38 60 Q40 30 72 28 Q104 30 106 60" fill="none" stroke="#8a7658" strokeWidth="1.2" />
      {/* farol de proa */}
      <path d="M24 60 V40" stroke="#15110e" strokeWidth="1.4" />
      <circle className="b1-brillo" cx="24" cy="42" r="15" fill="url(#mrB1bloomRojo)" />
      <ellipse cx="24" cy="42" rx="4.6" ry="5.4" fill="#e0302f" /><ellipse className="b1-brillo" cx="24" cy="42" rx="2.6" ry="3.4" fill="#ffd98a" />
      <path className="b1-brillo" d="M20 66 h8 l-1 12 h-6Z" fill="url(#mrB1refRojo)" />
    </svg>
  </div>
);

// Barco turístico iluminado del Huangpu
const Crucero = ({ clase = "", y = 716, ancho = 74 }) => (
  <div className={`b1-crucero ${clase}`} style={pos(0, y, ancho)}>
    <svg viewBox="0 0 140 34">
      <ellipse cx="70" cy="22" rx="78" ry="18" fill="url(#mrB1bloom)" opacity=".4" />
      <path d="M4 22 H134 L124 31 H12Z" fill="#10162c" /><rect x="5" y="21.4" width="128" height="1.5" fill="#ff5fb0" />
      <rect x="16" y="13" width="106" height="9" fill="#1a2242" /><rect x="30" y="6" width="72" height="7" fill="#202a50" />
      {n(17).map((k) => <rect key={k} x={19 + k * 6} y="15" width="4" height="4.6" fill={k % 5 === 3 ? "#bfe6ff" : "#ffd98a"} />)}
      {n(11).map((k) => <rect key={k} x={33 + k * 6.2} y="7.6" width="4" height="3.6" fill={k % 4 === 1 ? "#ff9fd0" : "#fff2c4"} />)}
      <rect x="28" y="5" width="76" height="1.3" fill="#7fe0ff" />
      <path d="M66 5 V-6" stroke="#c9d6ec" strokeWidth=".8" />
      {n(9).map((k) => <circle key={k} cx={66 - (k + 1) * 6.4} cy={-6 + (k + 1) * 2.2} r="1" fill={k % 2 ? "#ffd98a" : "#ff7fc0"} />)}
      {n(9).map((k) => <circle key={`b${k}`} cx={66 + (k + 1) * 6.4} cy={-6 + (k + 1) * 2.2} r="1" fill={k % 2 ? "#7fe0ff" : "#ffd98a"} />)}
    </svg>
    <span className="b1-crucero-reflejo">{n(5).map((k) => <i key={k} style={{ top: `${k * 20}%`, "--d": `${-k * 0.5}s`, opacity: r1(0.7 - k * 0.12) }} />)}</span>
  </div>
);

// Barca-dragón de fiesta: cruza el Huangpu con remeros, tambor y guirnalda de luces
const BarcaDragon = () => (
  <div className="b1-dragon" style={pos(0, 724, 150)}>
    <svg viewBox="0 0 200 50">
      <ellipse cx="100" cy="36" rx="104" ry="16" fill="url(#mrB1bloom)" opacity=".55" />
      <path d="M12 30 Q100 42 176 30 L172 38 Q100 48 20 39Z" fill="#c8102e" /><path d="M12 30 Q100 42 176 30" fill="none" stroke="#f2c14e" strokeWidth="1.6" />
      {/* cabeza y cola del dragón */}
      <path d="M172 32 Q184 26 184 14 Q190 12 196 16 L198 21 L190 22 Q192 30 180 38Z" fill="#f2c14e" /><path d="M186 14 l2 -8 l3 7 M192 17 l6 -5" stroke="#c8102e" strokeWidth="1.6" fill="none" /><circle cx="191" cy="17" r="1.1" fill="#3b2416" />
      <path d="M14 32 Q2 28 4 14 Q10 22 20 26Z" fill="#f2c14e" />
      {n(9).map((k) => (
        <g key={k} className="b1-palista" style={{ "--d": `${-k * 0.08}s` }}>
          <circle cx={36 + k * 14} cy="22" r="2.6" fill="#2a2228" /><path d={`M${33 + k * 14} 32 q3 -8 6 0Z`} fill={k % 2 ? "#ffd98a" : "#fff"} />
          <path d={`M${38 + k * 14} 27 l5 14`} stroke="#3b2416" strokeWidth="1.2" />
        </g>
      ))}
      <circle cx="160" cy="24" r="5" fill="#8f0c21" stroke="#f2c14e" strokeWidth="1.2" />
      {n(16).map((k) => <circle key={k} cx={22 + k * 10} cy={33.5 + Math.sin((k / 15) * Math.PI) * 5.2} r="1.3" fill={k % 2 ? "#fff3b0" : "#7fe0ff"} />)}
    </svg>
  </div>
);

// Sauce llorón del primer plano: ramas que cuelgan y se mecen en tres grupos
const Sauce = () => (
  <div className="b1-sauce" style={pos(-14, 250, 190)}>
    <svg viewBox="0 0 190 400">
      <path d="M-6 4 C40 0 86 10 128 30 C150 40 168 44 186 40" fill="none" stroke="#2a2a22" strokeWidth="7" strokeLinecap="round" />
      <path d="M-6 2 C40 -2 86 8 128 28" fill="none" stroke="#7a8a6a" strokeWidth="1" opacity=".7" />
      {n(3).map((g) => (
        <g key={g} className="b1-rama" style={{ "--d": `${-g * 2.3}s` }}>
          {n(15).filter((k) => k % 3 === g).map((k) => {
            const x = 4 + k * 12.4;
            const y = 4 + (k > 9 ? (k - 9) * 8 : k * 1.2);
            const largo = 200 + azar(k * 7) * 170 - k * 6;
            const curva = `M${x} ${r1(y)} q${r1(8 - azar(k) * 16)} ${r1(largo * 0.5)} ${r1(-6 + azar(k * 3) * 10)} ${r1(largo)}`;
            return (
              <g key={k}>
                <path d={curva} fill="none" stroke="#2f4a38" strokeWidth="1.2" />
                <path d={curva} fill="none" stroke="#4f7a52" strokeWidth="5.6" strokeDasharray="2.4 4.6" strokeLinecap="round" />
                <path d={curva} fill="none" stroke="#9cc08f" strokeWidth="2.2" strokeDasharray="1 15" strokeDashoffset="3" strokeLinecap="round" opacity=".8" />
              </g>
            );
          })}
        </g>
      ))}
    </svg>
  </div>
);

// Nube de noche con volumen (pasa por delante de la luna)
const Nube = ({ x, y, ancho, t = 90, d = 0, opacidad = 0.9 }) => (
  <div className="b1-nube" style={pos(x, y, ancho, { "--t": `${t}s`, "--d": `${d}s`, opacity: opacidad })}>
    <svg viewBox="0 0 200 70">
      <defs><radialGradient id="mrB1nube" cx=".34" cy=".2" r=".9"><stop offset="0" stopColor="#dfe6ff" /><stop offset=".45" stopColor="#7f8cc4" /><stop offset="1" stopColor="#2f3a74" /></radialGradient></defs>
      {[[38, 46, 24], [70, 34, 30], [108, 28, 34], [146, 40, 28], [172, 50, 18], [90, 52, 30], [126, 54, 28]].map(([cx, cy, r]) => <circle key={cx} cx={cx} cy={cy} r={r} fill="url(#mrB1nube)" />)}
    </svg>
  </div>
);

// Vida pintada (va DEBAJO del tinte: se oscurece con la noche como el resto de la pintura)
function VidaPintada() {
  return (
    <>
      <Vivo plano="mr-lejos">
        <i className="b1-bruma b1" /><i className="b1-bruma b2" />
      </Vivo>
      <Vivo plano="mr-cerca" clase="b1-marco">
        <Sauce />
        {[[98, 918, 0], [706, 922, -1.7]].map(([x, y, d]) => (
          <div key={x} className="b1-flor" style={pos(x - 20, y - 2, 40, { "--d": `${d}s` })}>
            <svg viewBox="-24 -36 48 96"><path d="M0 2 q-4 26 2 56" fill="none" stroke="#3f7a5c" strokeWidth="1.8" /><FlorLoto x={0} y={0} s={1} /></svg>
          </div>
        ))}
      </Vivo>
    </>
  );
}

// Vida luminosa (va ENCIMA del tinte): reflejos, barcos, tren, farolillos, linternas, luciérnagas, koi
function VidaLuz({ fiesta }) {
  const reflejos = [[30, 26, "#ffd27a"], [72, 12, "#fff0c0"], [122, 34, "#ffc86a"], [PERLA, 22, "#ff5fb0"], [592, 22, "#ffd27a"], [649, 28, "#7fdcff"], [706, 24, "#c79cff"], [754, 16, "#7fdcff"], [356, 10, "#ffc86a"], [520, 12, "#ff8fc8"], [178, 12, "#7fdcff"], [466, 12, "#ffd27a"]];
  const faroles = [[18, 810], [100, 810], [132, 784], [222, 784], [580, 790], [674, 790], [706, 814], [786, 814]];
  return (
    <>
      <Vivo plano="mr-lejos" clase="b1-vida-rio">
        <div className="b1-luz b1-todo">
          <i className="b1-resplandor" /><i className="b1-neblina" />
          {reflejos.map(([x, ancho, color], k) => <Reflejo key={x} x={x} ancho={ancho} alto={62 + (k % 4) * 9} color={color} d={-k * 0.7} />)}
          <i className="b1-maglev" style={pos(0, 651.4, 96)} />
          <div className="b1-faro" style={pos(PERLA, 501, 150)}><i /><i /></div>
          <Crucero />
          <Crucero clase="b1-crucero-b" y={706} ancho={46} />
          {fiesta && <BarcaDragon />}
          {fiesta && [[PERLA, 452, "#ff7fc8"], [592, 462, "#ffe08a"], [650, 414, "#8fe6ff"], [706, 448, "#c9a8ff"], [754, 546, "#8fe6ff"], [71, 590, "#ffe08a"]].map(([x, y, color], k) => (
            <i key={x} className="b1-foco" style={pos(x - 26, y - 300, 52, { "--c": color, "--a": `${(k % 2 ? 1 : -1) * (10 + k * 4)}deg`, "--d": `${-k * 0.45}s`, "--t": `${2.2 + (k % 3) * 0.5}s` })} />
          ))}
        </div>
      </Vivo>
      <Vivo plano="mr-cerca" clase="b1-vida-canal">
        <div className="b1-luz b1-todo">
          {[132, 222, 580, 674].map((x, k) => <Reflejo key={x} x={x} y={CANAL + 3} ancho={11} alto={44} color="#ff5a3c" bandas={5} d={-k * 0.9} />)}
          {/* linternas de loto flotando en el canal */}
          {[[300, 950], [352, 974], [470, 958], [520, 986], [430, 994], [252, 992]].map(([x, y], k) => (
            <div key={x} className="b1-flotante" style={pos(x, y, 11, { "--d": `${-k * 4.3}s`, "--t": `${26 + (k % 3) * 7}s` })}>
              <i className="b1-flotante-halo" />
              <svg viewBox="0 0 22 16"><path d="M2 8 q3 -8 9 -8 q6 0 9 8 q-9 6 -18 0Z" fill="#ff8fb4" /><path d="M6 8 q1 -6 5 -7 q4 1 5 7Z" fill="#ffe9a8" /><ellipse cx="11" cy="9" rx="9" ry="3" fill="#e0527c" /><circle cx="11" cy="5" r="2" fill="#fff8d8" /></svg>
            </div>
          ))}
        </div>
        {/* koi que asoma con ondas concéntricas */}
        {[[560, 962, 0], [262, 956, -4.2]].map(([x, y, d]) => (
          <div key={x} className="b1-koi" style={pos(x, y, 34, { "--d": `${d}s` })}>
            <i className="b1-onda" /><i className="b1-onda b1-onda2" />
            <svg viewBox="0 0 40 16"><path d="M2 8 Q12 0 26 6 L36 2 L33 8 L36 14 L26 10 Q12 16 2 8Z" fill="#ff7a2c" /><path d="M8 7 q6 -3 10 0 q-4 3 -10 0Z" fill="#fff" /><circle cx="6" cy="7.4" r=".8" fill="#2a1a14" /></svg>
          </div>
        ))}
        <Barca />
        {faroles.map(([x, y], k) => <Farol key={x} x={x} y={y} d={-k * 0.8} t={4.4 + (k % 3) * 0.8} />)}
        <Farol x={716} y={366} ancho={30} cuerda={22} d={-1.2} t={5.6} /><Farol x={766} y={356} ancho={34} cuerda={30} d={-3} t={6.4} />
        {n(14).map((k) => {
          const izquierda = k % 2 === 0;
          return <i key={k} className="b1-luciernaga" style={pos((izquierda ? 14 : 590) + azar(k * 13) * 200, 800 + azar(k * 29) * 180, 3.4, { "--t": `${7 + (k % 5) * 1.6}s`, "--d": `${r1(-azar(k * 3) * 9)}s`, "--x": `${(k % 3 - 1) * 22}`, "--y": `${-12 - (k % 4) * 8}` })} />;
        })}
      </Vivo>
    </>
  );
}

export function Panorama({ fiesta }) {
  return (
    <>
      <PlanoLejos />
      <PlanoMedio />
      <PlanoCerca />
      <VidaPintada />
      {/* textura de papel, bruma de día, tintes de atardecer y de noche */}
      <div className="b1-grano" />
      <div className="b1-velo-dia" />
      <div className="b1-tinte b1-t-atardecer" />
      <div className="b1-tinte b1-t-noche" />
      <LucesLejos fiesta={fiesta} />
      <LucesCerca />
      <VidaLuz fiesta={fiesta} />
    </>
  );
}

export function Ambiente({ fiesta }) {
  return (
    <div className="mr-particulas b1-ambiente">
      {/* noche: estrellas que titilan, luna con halo y nubes que le pasan por delante */}
      <div className="b1-noche-cielo">
        <div className="b1-lienzo">
          {n(46).map((i) => (
            <span key={i} className="b1-estrella" style={pos(8 + azar(i * 5) * 784, 16 + azar(i * 9) * 470, 1.6 + (i % 3) * 1.2, { "--t": `${2.4 + (i % 5) * 0.9}s`, "--d": `${r1(-azar(i) * 6)}s` })} />
          ))}
          <div className="b1-luna" style={pos(266, 176, 58)} />
          <Nube x={180} y={196} ancho={150} t={70} d={-18} opacidad={0.8} />
          <Nube x={420} y={130} ancho={210} t={110} d={-60} opacidad={0.7} />
          <Nube x={-30} y={330} ancho={240} t={95} d={-40} opacidad={0.45} />
          <Nube x={560} y={300} ancho={260} t={120} d={-10} opacidad={0.42} />
        </div>
      </div>
      {/* linternas Kongming: unas pocas de noche, suelta masiva en la fiesta */}
      {n(fiesta ? 22 : 7).map((i) => (
        <span key={i} className={`b1-kongming ${i >= 7 ? "b1-kongming-fiesta" : ""}`} style={{ left: `${6 + ((i * 29 + 11) % 88)}%`, "--y": `${14 + ((i * 37) % 46)}%`, "--t": `${(i >= 7 ? 6 : 26) + (i % 5) * (i >= 7 ? 1.1 : 5)}s`, "--d": `${r1(-(i * 3.7) % (i >= 7 ? 6 : 30))}s`, "--x": `${(i % 2 ? 1 : -1) * (18 + (i % 4) * 14)}px`, "--s": r1(0.6 + (i % 4) * 0.2) }} />
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
