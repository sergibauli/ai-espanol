import * as React from "react";
import { Capa, Vin, n } from "./piezas.jsx";
import "../../../styles/v14-ruta-A1.css";

/*
  A1 · Pekín y el norte (北京与华北): amanecer dorado de invierno sobre la Gran Muralla y la Ciudad Prohibida.
  Cómo está pintado (v14, «listón gráfico»):
  - 7 planos: cielo (CSS) → sol y nubes → sierra lejana → sierra media → colinas de la Muralla → colinas cercanas
    (Templo del Cielo, pagoda, aldea) → Ciudad Prohibida con foso helado → primer plano (pinos, rama y alero que enmarcan).
  - Lo ESTÁTICO va en los SVG grandes (se pintan una vez y solo se componen con el parallax).
  - Lo VIVO va en capas HTML (<Vivo>) con un «lienzo» que coincide con el viewBox 800×1000 del SVG: cada elemento
    se coloca con pos(x, y, ancho) en unidades del dibujo y se anima solo con transform/opacity (capa propia de GPU).
  - Día / atardecer / noche: dos tintes a pantalla completa en mix-blend-mode: multiply que cambian de opacity,
    y por encima las capas de luces (ventanas, faroles, antorchas de la Muralla), luna y estrellas.
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
const Vivo = ({ plano, clase = "", entra, children }) => (
  <div className={`mr-capa ${plano} a1-vivo ${clase}`}>
    <div className={`a1-lienzo ${entra != null ? "a1-entra" : ""}`} style={entra != null ? { "--i": entra } : undefined}>
      {children}
    </div>
  </div>
);
// Grupo SVG con entrada escalonada (el parallax va en la capa; la entrada, en este envoltorio)
const Entra = ({ i, children }) => (
  <g className="a1-entra" style={{ "--i": i }}>
    {children}
  </g>
);

// ---------- degradados y motivos (ids mrA1…) ----------
function Defs() {
  const lin = (id, paradas, attrs = { x1: 0, y1: 0, x2: 0, y2: 1 }) => (
    <linearGradient id={id} {...attrs}>
      {paradas.map(([o, c, a], k) => <stop key={k} offset={o} stopColor={c} stopOpacity={a ?? 1} />)}
    </linearGradient>
  );
  const H = { x1: 0, y1: 0, x2: 1, y2: 0 };
  const us = (y1, y2) => ({ gradientUnits: "userSpaceOnUse", x1: 0, y1, x2: 0, y2 });
  return (
    <defs>
      {lin("mrA1oro", [[0, "#9a5d12"], [0.32, "#dc9a26"], [0.68, "#ffd161"], [1, "#fff3b8"]], { x1: 0, y1: 0, x2: 1, y2: 0.35 })}
      {lin("mrA1oroLejos", [[0, "#c79a58"], [0.6, "#f4cf86"], [1, "#fff0c4"]], { x1: 0, y1: 0, x2: 1, y2: 0.3 })}
      {lin("mrA1laca", [[0, "#4f0c13"], [0.3, "#a32628"], [0.75, "#bb362f"], [1, "#7a151c"]])}
      {lin("mrA1muro", [[0, "#7a1a1f"], [0.14, "#c5463a"], [0.55, "#a82a2c"], [1, "#69121a"]])}
      {lin("mrA1muroLuz", [[0, "#ffb37a", 0], [0.55, "#ffb37a", 0.1], [1, "#ffd0a0", 0.42]], H)}
      {lin("mrA1columna", [[0, "#560c12"], [0.55, "#d4453a"], [0.8, "#f59a78"], [1, "#7d141c"]], H)}
      {lin("mrA1marmol", [[0, "#ffffff"], [1, "#b4c2dc"]])}
      {lin("mrA1nieveTecho", [[0, "#bccdec"], [0.45, "#f1f6ff"], [1, "#fffaf0"]], H)}
      {lin("mrA1hielo", [[0, "#9fc3e2"], [0.4, "#d7edf7"], [1, "#9dbde0"]])}
      {lin("mrA1nieve", [[0, "#ffffff"], [0.5, "#eaf0fb"], [1, "#b9cbea"]])}
      {lin("mrA1pino", [[0, "#0d1f18"], [0.5, "#1c4030"], [1, "#44795a"]], H)}
      {lin("mrA1pinoLejos", [[0, "#3d5a74"], [1, "#6f93a0"]], H)}
      {lin("mrA1piedra", [[0, "#6d5c50"], [0.6, "#c9ad88"], [1, "#f6e3bd"]], H)}
      {lin("mrA1azul", [[0, "#16245a"], [0.5, "#2f55ab"], [0.85, "#6f9be6"], [1, "#b8d2ff"]], H)}
      {lin("mrA1teja", [[0, "#2c3442"], [0.6, "#566175"], [1, "#8d98aa"]], H)}
      {lin("mrA1alero", [[0, "#000", 0.55], [1, "#000", 0]])}
      {lin("mrA1bruma", [[0, "#fff6e8", 0], [0.5, "#fff6e8", 0.88], [1, "#fff6e8", 0]])}
      {lin("mrA1brumaFria", [[0, "#eef3fb", 0], [0.55, "#eef3fb", 0.9], [1, "#eef3fb", 0]])}
      {/* sierras: sombra azul que se funde con la bruma de su base; cara al sol en blanco cálido */}
      {lin("mrA1s2", [[0, "#9fb4da"], [0.55, "#c5cde2"], [1, "#f6e2cc"]], us(430, 600))}
      {lin("mrA1l2", [[0, "#fff4e2", 0.95], [0.6, "#ffeeda", 0.5], [1, "#ffeeda", 0]], us(430, 590))}
      {lin("mrA1s3", [[0, "#7d98c8"], [0.55, "#a9bbdc"], [1, "#e6e6ee"]], us(490, 680))}
      {lin("mrA1l3", [[0, "#fffaf0", 1], [0.6, "#fff3e2", 0.6], [1, "#fff3e2", 0]], us(490, 660))}
      {lin("mrA1s4", [[0, "#6c88be"], [0.5, "#95acd6"], [1, "#d6dfee"]], us(570, 760))}
      {lin("mrA1s5", [[0, "#c9d6ee"], [0.4, "#a9bde0"], [1, "#dfe7f4"]], us(670, 800))}
      <radialGradient id="mrA1luzNieve">
        <stop offset="0" stopColor="#fffdf6" /><stop offset=".55" stopColor="#fff6e6" stopOpacity=".75" /><stop offset="1" stopColor="#fff6e6" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="mrA1sombra">
        <stop offset="0" stopColor="#5f7dc0" stopOpacity=".55" /><stop offset="1" stopColor="#5f7dc0" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="mrA1nube" cx=".5" cy=".5" r=".5" fx=".68" fy=".26">
        <stop offset="0" stopColor="#ffffff" /><stop offset=".55" stopColor="#fff1da" /><stop offset=".9" stopColor="#f5cfae" /><stop offset="1" stopColor="#e3bfc4" />
      </radialGradient>
      <radialGradient id="mrA1bloom">
        <stop offset="0" stopColor="#fff6c4" /><stop offset=".35" stopColor="#ffc35a" stopOpacity=".75" /><stop offset="1" stopColor="#ff8a2a" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="mrA1farol" cx=".5" cy=".5" r=".5" fx=".62" fy=".35">
        <stop offset="0" stopColor="#ff8a5c" /><stop offset=".55" stopColor="#d91f2c" /><stop offset="1" stopColor="#7c0b18" />
      </radialGradient>
      <radialGradient id="mrA1sol"><stop offset="0" stopColor="#ffe9a8" stopOpacity=".8" /><stop offset="1" stopColor="#ffe9a8" stopOpacity="0" /></radialGradient>
      {/* celosía de puertas y ventanas */}
      <pattern id="mrA1celosia" width="4" height="4" patternUnits="userSpaceOnUse">
        <rect width="4" height="4" fill="#6b1518" />
        <path d="M0 0H4M0 0V4M2 0V4M0 2H4" stroke="#d39a55" strokeWidth=".45" opacity=".75" />
      </pattern>
      {/* friso de ménsulas dougong: azul, verde y oro */}
      <pattern id="mrA1dougong" width="9" height="7" patternUnits="userSpaceOnUse">
        <rect width="9" height="7" fill="#17406a" />
        <path d="M1 7V4H3.5V2H5.5V4H8V7Z" fill="#2f8a78" />
        <rect x="3.6" y="2.2" width="1.8" height="1.4" fill="#f2c14e" />
        <path d="M0 .6H9" stroke="#f2c14e" strokeWidth=".8" />
      </pattern>
    </defs>
  );
}

// ---------- piezas pintadas ----------
// Sierra nevada dentada: silueta en sombra azul + caras al sol (derecha) + aristas de tinta
function Sierra({ picos, base, sombra, luz, semilla, tinta }) {
  const P = picos.map(([x, y]) => ({ x, y }));
  const valles = P.slice(0, -1).map((p, i) => {
    const q = P[i + 1];
    const t = 0.42 + azar(semilla + i) * 0.2;
    return { x: p.x + (q.x - p.x) * t, y: Math.max(p.y, q.y) + 16 + azar(semilla + i * 3) * 24 };
  });
  const hombroD = P.map((p, i) => (valles[i] ? { x: (p.x + valles[i].x) / 2 + (azar(semilla + i * 5) - 0.5) * 8, y: (p.y + valles[i].y) / 2 + (azar(semilla + i * 7) - 0.35) * 10 } : null));
  const hombroI = P.map((p, i) => (i > 0 ? { x: (p.x + valles[i - 1].x) / 2 + (azar(semilla + i * 11) - 0.5) * 8, y: (p.y + valles[i - 1].y) / 2 - 3 - azar(semilla + i * 13) * 8 } : null));
  let silueta = `M${P[0].x} ${base}`;
  P.forEach((p, i) => {
    if (hombroI[i]) silueta += ` L${r1(hombroI[i].x)} ${r1(hombroI[i].y)}`;
    silueta += ` L${p.x} ${p.y}`;
    if (hombroD[i]) silueta += ` L${r1(hombroD[i].x)} ${r1(hombroD[i].y)} L${r1(valles[i].x)} ${r1(valles[i].y)}`;
  });
  silueta += ` L${P[P.length - 1].x} ${base}Z`;
  return (
    <g>
      <path d={silueta} fill={`url(#${sombra})`} />
      {P.slice(0, -1).map((p, i) => {
        const v = valles[i];
        const h = hombroD[i];
        const caida = v.y - p.y;
        const arista = [[p.x - 4 - azar(semilla + i) * 5, p.y + caida * 0.55], [p.x + 5 + azar(semilla + i * 2) * 8, p.y + caida + 26], [p.x - 6, p.y + caida + 80]];
        const cara = `M${p.x} ${p.y} L${r1(h.x)} ${r1(h.y)} L${r1(v.x)} ${r1(v.y)} L${r1(v.x - 14)} ${r1(v.y + 70)} L${r1(arista[2][0])} ${r1(arista[2][1])} L${r1(arista[1][0])} ${r1(arista[1][1])} L${r1(arista[0][0])} ${r1(arista[0][1])}Z`;
        return (
          <g key={i}>
            <path d={cara} fill={`url(#${luz})`} />
            {/* contrafuerte en sombra dentro de la cara iluminada y arista de tinta */}
            <path d={`M${r1(h.x)} ${r1(h.y)} L${r1(h.x - 7)} ${r1(h.y + caida * 0.9 + 22)} L${r1(h.x + 5)} ${r1(h.y + caida * 0.5)}Z`} fill={tinta} opacity=".22" />
            <path d={`M${p.x} ${p.y} L${r1(arista[0][0])} ${r1(arista[0][1])} L${r1(arista[1][0])} ${r1(arista[1][1])}`} fill="none" stroke={tinta} strokeWidth=".9" opacity=".35" strokeLinejoin="round" />
          </g>
        );
      })}
    </g>
  );
}

// Pino cargado de nieve: pisos de ramas festoneadas con claroscuro, nieve con sombra azul y sombra proyectada
function Pino({ x, y, s = 1, pisos = 4, lejos = false }) {
  const filas = n(pisos).map((k) => ({ k, w: (30 - k * (21 / pisos)) * s, base: y - k * 17 * s, h: 31 * s }));
  return (
    <g>
      {!lejos && <ellipse cx={x - 20 * s} cy={y + 4 * s} rx={32 * s} ry={5.5 * s} fill="url(#mrA1sombra)" />}
      <rect x={x - 2.5 * s} y={y - 4 * s} width={5 * s} height={9 * s} fill="#33211a" />
      {filas.map(({ k, w, base, h }) => {
        const cima = base - h;
        const rama = `M${x} ${cima} C${x - w * 0.25} ${base - h * 0.5} ${x - w * 0.7} ${base - h * 0.2} ${x - w} ${base} Q${x - w * 0.75} ${base + 4 * s} ${x - w * 0.5} ${base - 2 * s} Q${x - w * 0.25} ${base + 5 * s} ${x} ${base - s} Q${x + w * 0.25} ${base + 5 * s} ${x + w * 0.5} ${base - 2 * s} Q${x + w * 0.75} ${base + 4 * s} ${x + w} ${base} C${x + w * 0.7} ${base - h * 0.2} ${x + w * 0.25} ${base - h * 0.5} ${x} ${cima}Z`;
        const nieve = `M${x} ${cima - s} C${x + w * 0.25} ${base - h * 0.52} ${x + w * 0.62} ${base - h * 0.26} ${x + w * 0.94} ${base - 2 * s} Q${x + w * 0.6} ${base - h * 0.16} ${x + w * 0.4} ${base - h * 0.34} Q${x + w * 0.2} ${base - h * 0.16} ${x + w * 0.05} ${base - h * 0.4} Q${x - w * 0.15} ${base - h * 0.26} ${x - w * 0.3} ${base - h * 0.44} Q${x - w * 0.5} ${base - h * 0.22} ${x - w * 0.74} ${base - h * 0.16} C${x - w * 0.55} ${base - h * 0.4} ${x - w * 0.2} ${base - h * 0.6} ${x} ${cima - s}Z`;
        return (
          <g key={k}>
            <path d={rama} fill={lejos ? "url(#mrA1pinoLejos)" : "url(#mrA1pino)"} />
            <path d={nieve} fill="url(#mrA1nieveTecho)" />
          </g>
        );
      })}
    </g>
  );
}

// Tejado de aleros curvos con tejas vidriadas, canto de tejas, cumbrera, nieve y borde de luz
function Techo({ cx, y, w, h, cima, relleno = "mrA1oro", tejas = 14, nieve = 0.55, canto = "#ffe9a8", sombraTeja = "#8a5510" }) {
  const yc = y - h;
  const forma = `M${cx - w / 2} ${y - h * 0.2} Q${cx - w * 0.42} ${y + 1} ${cx - w * 0.3} ${y} L${cx + w * 0.3} ${y} Q${cx + w * 0.42} ${y + 1} ${cx + w / 2} ${y - h * 0.2} Q${cx + w * 0.34} ${y - h * 0.34} ${cx + cima / 2} ${yc} L${cx - cima / 2} ${yc} Q${cx - w * 0.34} ${y - h * 0.34} ${cx - w / 2} ${y - h * 0.2}Z`;
  const alero = `M${cx - w / 2} ${y - h * 0.2} Q${cx - w * 0.42} ${y + 1} ${cx - w * 0.3} ${y} L${cx + w * 0.3} ${y} Q${cx + w * 0.42} ${y + 1} ${cx + w / 2} ${y - h * 0.2}`;
  const yn = y - h * (1 - nieve); // hasta dónde baja la nieve
  const manto = `M${cx - cima / 2 - 1} ${yc - 1} L${cx + cima / 2 + 1} ${yc - 1} Q${cx + w * 0.3} ${yc + (yn - yc) * 0.6} ${cx + w * 0.36} ${yn} Q${cx + w * 0.22} ${yn + h * 0.16} ${cx + w * 0.12} ${yn - h * 0.06} Q${cx} ${yn + h * 0.2} ${cx - w * 0.12} ${yn - h * 0.04} Q${cx - w * 0.24} ${yn + h * 0.16} ${cx - w * 0.36} ${yn} Q${cx - w * 0.3} ${yc + (yn - yc) * 0.6} ${cx - cima / 2 - 1} ${yc - 1}Z`;
  return (
    <g>
      <path d={alero} transform="translate(0 2.6)" fill="none" stroke="#2a0d0c" strokeWidth="3.2" opacity=".5" />
      <path d={forma} fill={`url(#${relleno})`} />
      {n(tejas + 1).map((i) => {
        const t = 0.05 + (i / tejas) * 0.9;
        return <path key={i} d={`M${r1(cx - cima / 2 + t * cima)} ${yc} Q${r1(cx - w * 0.33 + t * w * 0.66)} ${r1(y - h * 0.45)} ${r1(cx - w * 0.4 + t * w * 0.8)} ${r1(y - h * 0.06)}`} fill="none" stroke={sombraTeja} strokeWidth=".7" opacity=".55" />;
      })}
      {nieve > 0 && <path d={manto} fill="url(#mrA1nieveTecho)" opacity=".97" />}
      {/* canto del alero: hilera de tejas de remate + filo de luz */}
      <path d={alero} fill="none" stroke={sombraTeja} strokeWidth="2.6" strokeDasharray="1.7 1.5" />
      <path d={alero} transform="translate(0 -1.3)" fill="none" stroke={canto} strokeWidth="1" />
      {/* cumbrera con remates (chiwen) y nieve */}
      <rect x={cx - cima / 2 - 3} y={yc - 3.4} width={cima + 6} height="3.6" rx="1" fill={sombraTeja} />
      <path d={`M${cx - cima / 2 - 3} ${yc - 3} q-2 -6 2.5 -7 q-1.5 3 1.5 4.4Z M${cx + cima / 2 + 3} ${yc - 3} q2 -6 -2.5 -7 q1.5 3 -1.5 4.4Z`} fill={canto} />
      <path d={`M${cx - cima / 2} ${yc - 4.2} H${cx + cima / 2}`} stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      {/* borde de luz en la vertiente que mira al sol */}
      <path d={`M${cx + cima / 2} ${yc} Q${cx + w * 0.34} ${y - h * 0.34} ${cx + w / 2} ${y - h * 0.2}`} fill="none" stroke="#fffbe0" strokeWidth="1.3" opacity=".95" strokeLinecap="round" />
    </g>
  );
}

// Paños entre columnas de un pabellón (se reutilizan para pintar las ventanas encendidas)
const panos = (x, y, w, h, columnas) => n(columnas - 1).map((i) => ({ x: x + 3 + (i * (w - 4)) / (columnas - 1) + 1.6, y: y + 8, w: (w - 4) / (columnas - 1) - 3.2, h: h - 9 }));
// Cuerpo de pabellón: laca roja con sombra del alero, friso dougong, columnas cilíndricas y celosías
function Cuerpo({ x, y, w, h, columnas }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="url(#mrA1laca)" />
      {panos(x, y, w, h, columnas).map((p, i) => (
        <g key={i}>
          <rect x={r1(p.x)} y={p.y} width={r1(p.w)} height={p.h} fill="url(#mrA1celosia)" />
          <rect x={r1(p.x)} y={p.y + p.h * 0.72} width={r1(p.w)} height={p.h * 0.28} fill="#8e1d20" stroke="#d39a55" strokeWidth=".4" />
        </g>
      ))}
      <rect x={x} y={y} width={w} height="7" fill="url(#mrA1dougong)" />
      {n(columnas).map((i) => <rect key={i} x={r1(x + (i * (w - 4)) / (columnas - 1))} y={y + 7} width="4" height={h - 7} fill="url(#mrA1columna)" />)}
      <rect x={x} y={y} width={w} height={h * 0.5} fill="url(#mrA1alero)" />
    </g>
  );
}

// Balaustrada de mármol nevada
const Balaustrada = ({ x, y, w }) => (
  <g>
    <rect x={x} y={y} width={w} height="8" fill="url(#mrA1marmol)" />
    <path d={`M${x} ${y + 3.6} H${x + w}`} stroke="#8ea0c2" strokeWidth="3.4" strokeDasharray="1.4 4.2" opacity=".7" />
    <path d={`M${x - 1} ${y} H${x + w + 1}`} stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
  </g>
);

// Torre de vigilancia de la Muralla (pie en x, y)
function Atalaya({ x, y, s = 1 }) {
  return (
    <g>
      <rect x={x - 9 * s} y={y - 24 * s} width={18 * s} height={30 * s} fill="url(#mrA1piedra)" />
      <path d={`M${x - 11 * s} ${y - 24 * s} v${-6 * s} h${4 * s} v${3 * s} h${3 * s} v${-3 * s} h${4 * s} v${3 * s} h${3 * s} v${-3 * s} h${4 * s} v${3 * s} h${4 * s} v${3 * s}Z`} fill="url(#mrA1piedra)" />
      <path d={`M${x - 11 * s} ${y - 24 * s} H${x + 11 * s}`} stroke="#5d4c40" strokeWidth={0.8 * s} opacity=".6" />
      <path d={`M${x - 3 * s} ${y + 6 * s} v${-9 * s} a${3 * s} ${3 * s} 0 0 1 ${6 * s} 0 v${9 * s}Z`} fill="#3a2a22" />
      <rect x={x - 6 * s} y={y - 18 * s} width={3 * s} height={5 * s} rx={1.5 * s} fill="#3a2a22" /><rect x={x + 3 * s} y={y - 18 * s} width={3 * s} height={5 * s} rx={1.5 * s} fill="#3a2a22" />
      <path d={`M${x - 11.5 * s} ${y - 30 * s} q${5.5 * s} ${-3 * s} ${11.5 * s} ${-0.6 * s} q${6 * s} ${-2.4 * s} ${11.5 * s} ${0.6 * s}`} fill="none" stroke="#fff" strokeWidth={2.4 * s} strokeLinecap="round" />
      <path d={`M${x + 9 * s} ${y - 24 * s} V${y + 6 * s}`} stroke="#fff6dc" strokeWidth={0.9 * s} opacity=".9" />
      <path d={`M${x + 6 * s} ${y - 30 * s} V${y - 46 * s}`} stroke="#4a3526" strokeWidth={1.1 * s} />
    </g>
  );
}

// ---------- trazado de la Gran Muralla sobre las colinas (curvas de Bézier que también se muestrean para las antorchas) ----------
const MURALLA = [
  [[-10, 640], [40, 650], [90, 660], [140, 652]],
  [[140, 652], [200, 642], [250, 590], [310, 584]],
  [[310, 584], [360, 580], [400, 640], [450, 646]],
  [[450, 646], [500, 652], [540, 600], [600, 578]],
  [[600, 578], [650, 562], [700, 600], [740, 610]],
  [[740, 610], [770, 618], [790, 606], [810, 600]],
];
const CRESTA = `M${MURALLA[0][0].join(" ")} ` + MURALLA.map(([, c1, c2, p]) => `C${c1.join(" ")} ${c2.join(" ")} ${p.join(" ")}`).join(" ");
const enCurva = ([p0, c1, c2, p1], t) => {
  const u = 1 - t;
  return [0, 1].map((k) => u * u * u * p0[k] + 3 * u * u * t * c1[k] + 3 * u * t * t * c2[k] + t * t * t * p1[k]);
};
const ANTORCHAS = MURALLA.flatMap((tramo) => [0.12, 0.32, 0.52, 0.72, 0.9].map((t) => enCurva(tramo, t)));
const ATALAYAS = [[310, 584, 1.15], [600, 578, 1.2], [450, 646, 0.85], [740, 610, 0.9], [140, 652, 0.8]];

// ---------- edificios del plano medio ----------
// Templo del Cielo (祈年殿): tres tejados cónicos azules sobre terraza circular de mármol
function TemploCielo({ cx, y }) {
  const pisos = [[46, y - 30, 24], [35, y - 60, 22], [25, y - 86, 26]];
  return (
    <g>
      <ellipse cx={cx - 30} cy={y + 6} rx="80" ry="9" fill="url(#mrA1sombra)" />
      {[[70, y + 2], [58, y - 5], [47, y - 12]].map(([rx, cy], k) => (
        <g key={k}>
          <path d={`M${cx - rx} ${cy} v7 a${rx} 7 0 0 0 ${rx * 2} 0 v-7Z`} fill="url(#mrA1marmol)" />
          <ellipse cx={cx} cy={cy} rx={rx} ry="6" fill="#fff" />
          <path d={`M${cx - rx} ${cy + 3} a${rx} 7 0 0 0 ${rx * 2} 0`} fill="none" stroke="#8ea0c2" strokeWidth="2.4" strokeDasharray="1.2 3.4" opacity=".7" />
        </g>
      ))}
      {pisos.map(([r, ya, h], k) => {
        const alto = k === 0 ? 20 : 12;
        return (
          <g key={k}>
            <rect x={cx - r * 0.72} y={ya} width={r * 1.44} height={alto} fill="url(#mrA1columna)" />
            <rect x={cx - r * 0.72} y={ya} width={r * 1.44} height="4.5" fill="url(#mrA1dougong)" />
            {k === 0 && n(7).map((i) => <rect key={i} x={cx - r * 0.66 + i * (r * 1.32 / 7) + 1.6} y={ya + 6} width={r * 1.32 / 7 - 3} height="12" fill="url(#mrA1celosia)" opacity=".9" />)}
            <ellipse cx={cx} cy={ya + 2.5} rx={r} ry="4.6" fill="#0d1838" opacity=".55" />
            <path d={`M${cx - r} ${ya} Q${cx - r * 0.5} ${ya - h * 0.72} ${cx - r * 0.2} ${ya - h} L${cx + r * 0.2} ${ya - h} Q${cx + r * 0.5} ${ya - h * 0.72} ${cx + r} ${ya} Q${cx} ${ya + 7} ${cx - r} ${ya}Z`} fill="url(#mrA1azul)" />
            {n(9).map((i) => {
              const t = (i + 0.5) / 9;
              return <path key={i} d={`M${r1(cx - r * 0.2 + t * r * 0.4)} ${ya - h} Q${r1(cx - r * 0.55 + t * r * 1.1)} ${r1(ya - h * 0.5)} ${r1(cx - r * 0.92 + t * r * 1.84)} ${r1(ya + 1.5 + Math.sin(t * Math.PI) * 3.4)}`} fill="none" stroke="#0f1d4d" strokeWidth=".6" opacity=".6" />;
            })}
            <path d={`M${cx - r * 0.2} ${ya - h} L${cx + r * 0.2} ${ya - h} Q${cx + r * 0.42} ${ya - h * 0.74} ${cx + r * 0.6} ${ya - h * 0.42} Q${cx + r * 0.3} ${ya - h * 0.3} ${cx + r * 0.1} ${ya - h * 0.5} Q${cx - r * 0.1} ${ya - h * 0.32} ${cx - r * 0.3} ${ya - h * 0.52} Q${cx - r * 0.42} ${ya - h * 0.7} ${cx - r * 0.2} ${ya - h}Z`} fill="url(#mrA1nieveTecho)" />
            <path d={`M${cx - r} ${ya} Q${cx} ${ya + 7} ${cx + r} ${ya}`} fill="none" stroke="#f2c14e" strokeWidth="1.8" />
            <path d={`M${cx + r * 0.2} ${ya - h} Q${cx + r * 0.5} ${ya - h * 0.72} ${cx + r} ${ya}`} fill="none" stroke="#e3efff" strokeWidth="1.1" opacity=".95" />
          </g>
        );
      })}
      <path d={`M${cx - 4.5} ${y - 112} Q${cx} ${y - 132} ${cx + 4.5} ${y - 112}Z`} fill="url(#mrA1oro)" />
      <circle cx={cx} cy={y - 129} r="3.2" fill="#ffe9a8" />
    </g>
  );
}
// Pagoda de cinco pisos
function Pagoda({ cx, y }) {
  return (
    <g>
      <ellipse cx={cx - 22} cy={y + 3} rx="46" ry="6" fill="url(#mrA1sombra)" />
      <rect x={cx - 20} y={y - 6} width="40" height="8" fill="url(#mrA1marmol)" />
      {n(5).map((k) => {
        const w = 30 - k * 4;
        const yb = y - 6 - k * 17;
        return (
          <g key={k}>
            <rect x={cx - w / 2} y={yb - 12} width={w} height="12" fill="url(#mrA1columna)" />
            <rect x={cx - w / 2} y={yb - 12} width={w} height="3" fill="url(#mrA1dougong)" />
            <rect x={cx - 2} y={yb - 8} width="4" height="6" rx="2" fill="#3a1010" />
            <Techo cx={cx} y={yb - 11} w={w + 22} h={8} cima={w - 2} relleno="mrA1teja" tejas={6} nieve={0.7} canto="#cfd8e6" sombraTeja="#232a36" />
          </g>
        );
      })}
      <path d={`M${cx} ${y - 96} V${y - 116}`} stroke="#c8961e" strokeWidth="1.6" />
      <circle cx={cx} cy={y - 104} r="2.2" fill="#ffd161" /><circle cx={cx} cy={y - 110} r="1.6" fill="#ffd161" />
    </g>
  );
}
// Casa de hutong (ladrillo gris, tejado nevado, chimenea); la ventana se enciende en la capa de luces
const CASAS = [[272, 716, 26], [300, 726, 30], [334, 742, 24], [468, 742, 24], [500, 728, 30], [530, 717, 26]];
const Casa = ({ x, y, w }) => (
  <g>
    <rect x={x - w / 2} y={y - 10} width={w} height="12" fill="url(#mrA1piedra)" opacity=".92" />
    <rect x={x - w / 2} y={y - 10} width={w} height="4" fill="#3a3038" opacity=".35" />
    <rect x={x + w * 0.22} y={y - 22} width="3.4" height="9" fill="#6b5a52" />
    <path d={`M${x - w / 2 - 4} ${y - 9} L${x - w * 0.3} ${y - 18} L${x + w * 0.3} ${y - 18} L${x + w / 2 + 4} ${y - 9}Z`} fill="url(#mrA1teja)" />
    <path d={`M${x - w * 0.3} ${y - 18.6} L${x + w * 0.3} ${y - 18.6} L${x + w / 2 + 2} ${y - 12} Q${x} ${y - 9} ${x - w / 2 - 2} ${y - 12}Z`} fill="url(#mrA1nieveTecho)" />
    <rect x={x - w * 0.3} y={y - 6} width="4.4" height="4.4" fill="#4a3526" />
  </g>
);

// ---------- piezas vivas (HTML + SVG pequeño) ----------
const NUBES = {
  cumulo: { caja: [150, 62], bolas: [[18, 46, 15], [36, 38, 19], [56, 28, 23], [82, 24, 26], [108, 32, 22], [128, 44, 16], [70, 46, 20], [96, 48, 18], [46, 50, 16]] },
  larga: { caja: [220, 46], bolas: [[16, 36, 12], [38, 30, 17], [64, 24, 20], [92, 22, 21], [122, 26, 19], [150, 28, 18], [178, 32, 15], [202, 38, 11], [108, 38, 16], [78, 38, 16], [140, 40, 14]] },
  jiron: { caja: [120, 30], bolas: [[12, 22, 8], [30, 18, 11], [52, 15, 13], [76, 16, 12], [98, 20, 9], [110, 24, 6]] },
};
function Nube({ tipo, x, y, ancho, deriva = 70, d = 0, opacidad = 1 }) {
  const { caja, bolas } = NUBES[tipo];
  return (
    <div className="a1-nube" style={pos(x, y, ancho, { "--t": `${deriva}s`, "--d": `${d}s`, opacity: opacidad })}>
      <svg viewBox={`0 0 ${caja[0]} ${caja[1]}`}>
        {bolas.map(([bx, by, r], k) => <circle key={`s${k}`} cx={bx - 3} cy={by + 5} r={r} fill="#aab0d6" opacity=".5" />)}
        {bolas.map(([bx, by, r], k) => <circle key={k} cx={bx} cy={by} r={r} fill="url(#mrA1nube)" />)}
      </svg>
    </div>
  );
}
const Grulla = ({ k }) => (
  <svg viewBox="0 0 60 40" className="a1-grulla" style={{ "--d": `${-k * 0.23}s` }}>
    <path d="M15 23 L1 27" stroke="#2e3a55" strokeWidth="1.3" strokeLinecap="round" />
    <path className="a1-ala a1-ala-lejos" d="M26 21 C24 10 30 4 38 1 C36 9 35 15 33 22Z" fill="#c9d3e6" />
    <path d="M13 23 C20 17 33 17 40 21 C45 20 50 18 54 17.4 L59 18.2 L54 19.6 C49 20.6 45 23 41 24.4 C33 28 21 28 13 23Z" fill="#fbfcff" />
    <path d="M41 21 C45 20 50 18 54 17.4 L54 19.6 C49 20.6 45 23 41 24.4Z" fill="#2e3a55" />
    <circle cx="54.6" cy="17.6" r="1.5" fill="#d8232f" />
    <g className="a1-ala">
      <path d="M22 22 C22 9 30 2 42 0 C39 9 37 16 35 23Z" fill="#ffffff" />
      <path d="M36 4 C38 2 40 1 42 0 C40.6 4 39.4 8 38.4 11Z" fill="#2e3a55" />
    </g>
  </svg>
);
const Banderola = ({ x, y, ancho = 20, d = 0, oro = false }) => (
  <div className="a1-banderola" style={pos(x, y, ancho, { "--d": `${d}s` })}>
    <svg viewBox="0 0 30 16">
      <path d="M0 1 C9 -1 16 5 29 2 C20 6 22 10 28 13 C17 14 9 10 0 13Z" fill={oro ? "#f2c14e" : "#d81f2e"} />
      <path d="M0 1 C9 -1 16 5 29 2" fill="none" stroke={oro ? "#fff3b8" : "#ff8a6a"} strokeWidth="1.2" />
      <path d="M0 13 C9 10 17 14 28 13" fill="none" stroke={oro ? "#a8741e" : "#7c0b18"} strokeWidth="1.2" />
    </svg>
  </div>
);
function Farol({ x, y, ancho = 26, cuerda = 16, d = 0, t = 5 }) {
  return (
    <div className="a1-farol" style={pos(x - ancho / 2, y, ancho, { "--d": `${d}s`, "--t": `${t}s` })}>
      <svg viewBox={`0 0 30 ${cuerda + 52}`}>
        <circle className="a1-brillo" cx="15" cy={cuerda + 17} r="15" fill="url(#mrA1bloom)" transform={`translate(15 ${cuerda + 17}) scale(2.1) translate(-15 ${-(cuerda + 17)})`} />
        <path d={`M15 0 V${cuerda}`} stroke="#3b2416" strokeWidth="1" />
        <rect x="10" y={cuerda} width="10" height="4" rx="1" fill="#f2c14e" />
        <ellipse cx="15" cy={cuerda + 17} rx="13.5" ry="13" fill="url(#mrA1farol)" />
        <path d={`M15 ${cuerda + 4} V${cuerda + 30} M9 ${cuerda + 5.5} Q4.5 ${cuerda + 17} 9 ${cuerda + 28.5} M21 ${cuerda + 5.5} Q25.5 ${cuerda + 17} 21 ${cuerda + 28.5}`} fill="none" stroke="#ffb35c" strokeWidth=".8" opacity=".7" />
        <ellipse className="a1-brillo" cx="15" cy={cuerda + 17} rx="9" ry="10" fill="#ffe08a" opacity=".85" />
        <rect x="10" y={cuerda + 30} width="10" height="3.6" rx="1" fill="#f2c14e" />
        <path d={`M13 ${cuerda + 33} V${cuerda + 48} M15 ${cuerda + 33} V${cuerda + 51} M17 ${cuerda + 33} V${cuerda + 48}`} stroke="#f2c14e" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    </div>
  );
}
const Patinador = ({ x, y, tramo, t, d, bufanda = "#e4302f", abrigo = "#27314f" }) => (
  <div className="a1-patinador" style={pos(x, y, 17, { "--tramo": tramo, "--t": `${t}s`, "--d": `${d}s` })}>
    <svg viewBox="0 0 20 30">
      <ellipse cx="9" cy="28.6" rx="8" ry="1.2" fill="#5f7dc0" opacity=".45" />
      <path d="M9 18 L4.5 24 L1 23.4 M9.5 18 L12.5 27 L17 27" fill="none" stroke={abrigo} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 8 L13.5 9.4 L12.4 19.4 L6.6 18.4Z" fill={abrigo} />
      <path d="M11.4 10.4 L16.6 14 M8.6 10 L3.6 13" stroke={abrigo} strokeWidth="2" strokeLinecap="round" />
      <path d="M8 8.2 L1 5.6 L1.8 9.2 L8.4 10.2Z" fill={bufanda} />
      <circle cx="11" cy="5" r="3.3" fill="#f1c9a5" />
      <path d="M7.6 4.6 A3.5 3.5 0 0 1 14.4 4.2Z" fill={bufanda} />
    </svg>
  </div>
);
const Humo = ({ x, y, d = 0 }) => (
  <div className="a1-humo" style={pos(x - 7, y - 12, 14)}>
    {n(3).map((k) => <span key={k} style={{ "--d": `${d - k * 2.6}s` }} />)}
  </div>
);
const Destello = ({ x, y, tam = 12, d = 0, t = 4 }) => <span className="a1-destello" style={pos(x - tam / 2, y - tam * 0.4, tam, { "--d": `${d}s`, "--t": `${t}s` })} />;

// ================= PANORAMA =================
export function Panorama({ fiesta }) {
  const panosPuerta = panos(300, 728, 200, 38, 10);
  const farolillosMuro = [28, 74, 196, 242, 558, 604, 726, 772];
  return (
    <>
      {/* ---- 1 · sol de invierno (halo que respira, rayos que giran) y nubes con volumen ---- */}
      <Vivo plano="mr-lejos" clase="a1-cielo-vivo">
        <div className="a1-sol" style={pos(560 - 330, 300 - 330, 660)}>
          <i className="a1-rayos" /><i className="a1-halo" /><i className="a1-disco" />
        </div>
        <Nube tipo="larga" x={-40} y={392} ancho={380} deriva={95} d={-20} opacidad={0.95} />
        <Nube tipo="larga" x={470} y={404} ancho={360} deriva={110} d={-60} opacidad={0.92} />
        <Nube tipo="cumulo" x={40} y={236} ancho={250} deriva={80} d={-30} />
        <Nube tipo="cumulo" x={610} y={150} ancho={210} deriva={90} d={-10} />
        <Nube tipo="jiron" x={300} y={120} ancho={170} deriva={70} d={-44} opacidad={0.8} />
        <Nube tipo="jiron" x={120} y={60} ancho={130} deriva={60} d={-12} opacidad={0.7} />
      </Vivo>

      {/* ---- 2 y 3 · sierras nevadas lejana y media, con bruma entre ellas ---- */}
      <Capa clase="mr-lejos">
        <Defs />
        <Entra i={0}>
          <Sierra picos={[[-30, 472], [42, 452], [108, 480], [172, 438], [250, 470], [322, 450], [400, 476], [472, 434], [546, 468], [622, 444], [700, 470], [772, 438], [840, 466]]} base={610} sombra="mrA1s2" luz="mrA1l2" semilla={3} tinta="#7f93bb" />
          <rect x="-10" y="520" width="820" height="90" fill="url(#mrA1bruma)" />
        </Entra>
        <Entra i={1}>
          <Sierra picos={[[-40, 540], [30, 504], [112, 532], [202, 490], [292, 528], [372, 508], [452, 540], [532, 496], [612, 530], [692, 494], [762, 522], [840, 500]]} base={690} sombra="mrA1s3" luz="mrA1l3" semilla={9} tinta="#566f9e" />
          {/* la Muralla que se pierde a lo lejos */}
          <path d="M560 570 C590 548 628 560 668 532 S752 536 810 506" fill="none" stroke="#d9c4a4" strokeWidth="4.5" opacity=".85" />
          <path d="M560 567.6 C590 545.6 628 557.6 668 529.6 S752 533.6 810 503.6" fill="none" stroke="#fff" strokeWidth="1.3" strokeDasharray="2.4 2" />
          <rect x="-10" y="588" width="820" height="96" fill="url(#mrA1brumaFria)" />
        </Entra>
      </Capa>

      {/* ---- bandada de grullas cruzando el cielo ---- */}
      <Vivo plano="mr-lejos">
        <div className="a1-bandada" style={pos(0, 372, 150)}>
          {[[60, 0], [38, 9], [84, 11], [16, 19], [106, 23], [0, 30]].map(([gx, gy], k) => (
            <div key={k} className="a1-grulla-caja" style={{ left: `${(gx / 150) * 100}%`, top: `${gy}px`, width: `${k === 0 ? 24 : 20}%` }}>
              <Grulla k={k} />
            </div>
          ))}
        </div>
      </Vivo>

      {/* ---- 4 y 5 · colinas de la Gran Muralla y colinas cercanas (Templo del Cielo, pagoda, aldea) ---- */}
      <Capa clase="mr-medio">
        <defs>
          <clipPath id="mrA1clip4"><path d={`${CRESTA} V1010 H-10Z`} /></clipPath>
          <clipPath id="mrA1clip5"><path d="M-10 716 C50 692 120 672 190 676 S310 716 372 764 L400 772 L428 766 C500 724 640 676 680 680 S760 684 810 706 V1010 H-10Z" /></clipPath>
        </defs>
        <Entra i={2}>
          <path d={`${CRESTA} V1010 H-10Z`} fill="url(#mrA1s4)" />
          <g clipPath="url(#mrA1clip4)">
            <ellipse cx="392" cy="652" rx="92" ry="64" fill="url(#mrA1luzNieve)" />
            <ellipse cx="700" cy="640" rx="110" ry="60" fill="url(#mrA1luzNieve)" />
            <ellipse cx="80" cy="690" rx="90" ry="40" fill="url(#mrA1luzNieve)" opacity=".8" />
            {/* bosquecillos lejanos en las laderas */}
            {n(26).map((i) => {
              const x = 20 + ((i * 97) % 760);
              const tramo = MURALLA[Math.min(5, Math.max(0, Math.floor((x + 10) / 137)))];
              const [, yc] = enCurva(tramo, 0.5);
              return <Pino key={i} x={x} y={r1(yc + 46 + azar(i) * 44)} s={0.36 + azar(i * 3) * 0.16} pisos={3} lejos />;
            })}
          </g>
          {/* muralla: sombra, paño al sol, almenas y nieve */}
          <path d={CRESTA} transform="translate(-3 8)" fill="none" stroke="#5874ac" strokeWidth="7" opacity=".4" />
          <path d={CRESTA} fill="none" stroke="#a88a68" strokeWidth="11" />
          <path d={CRESTA} transform="translate(0 -2.6)" fill="none" stroke="#e9d1a8" strokeWidth="4" />
          <path d={CRESTA} transform="translate(0 2.4)" fill="none" stroke="#7d6650" strokeWidth="1" strokeDasharray="5 3" opacity=".7" />
          <path d={CRESTA} transform="translate(0 -6.6)" fill="none" stroke="#c7aa80" strokeWidth="4" strokeDasharray="3.4 3" />
          <path d={CRESTA} transform="translate(0 -8.8)" fill="none" stroke="#fff" strokeWidth="1.7" strokeDasharray="3.4 3" />
          {ATALAYAS.map(([x, y, s]) => <Atalaya key={x} x={x} y={y} s={s} />)}
          <rect x="-10" y="668" width="820" height="80" fill="url(#mrA1bruma)" />
        </Entra>
        <Entra i={3}>
          <path d="M-10 716 C50 692 120 672 190 676 S310 716 372 764 L400 772 L428 766 C500 724 640 676 680 680 S760 684 810 706 V1010 H-10Z" fill="url(#mrA1s5)" />
          <g clipPath="url(#mrA1clip5)">
            <ellipse cx="300" cy="716" rx="120" ry="52" fill="url(#mrA1luzNieve)" />
            <ellipse cx="716" cy="700" rx="130" ry="46" fill="url(#mrA1luzNieve)" />
            <ellipse cx="560" cy="770" rx="90" ry="40" fill="url(#mrA1sombra)" opacity=".7" />
            <ellipse cx="60" cy="740" rx="100" ry="40" fill="url(#mrA1sombra)" opacity=".6" />
          </g>
          {[[36, 716, 0.8], [66, 706, 0.95], [96, 700, 0.75], [262, 700, 0.62], [352, 760, 0.6], [440, 764, 0.58], [566, 708, 0.7], [600, 700, 0.9], [760, 700, 0.85], [786, 712, 1]].map(([x, y, s], k) => <Pino key={k} x={x} y={y} s={s} pisos={3} />)}
          <TemploCielo cx={176} y={686} />
          <Pagoda cx={676} y={686} />
          {CASAS.map(([x, y, w]) => <Casa key={x} x={x} y={y} w={w} />)}
          {[[130, 704, 0.7], [226, 700, 0.66], [640, 704, 0.6], [716, 700, 0.72]].map(([x, y, s], k) => <Pino key={k} x={x} y={y} s={s} pisos={3} />)}
        </Entra>
      </Capa>

      {/* ---- vida del plano medio: banderolas de las atalayas, humo de las chimeneas, bruma que deriva ---- */}
      <Vivo plano="mr-medio" entra={3}>
        <Banderola x={317} y={529} ancho={20} />
        <Banderola x={607.5} y={521} ancho={21} d={-1.1} oro />
        <Banderola x={745.5} y={567} ancho={15} d={-0.5} />
        {CASAS.map(([x, y, w], k) => <Humo key={x} x={x + w * 0.22 + 1.7} y={y - 22} d={-k * 1.3} />)}
        <i className="a1-bruma b1" /><i className="a1-bruma b2" /><i className="a1-bruma b3" />
      </Vivo>

      {/* ---- 6 · Ciudad Prohibida: muralla roja, torres de esquina, puerta con pabellón de doble alero, foso helado ---- */}
      <Capa clase="mr-cerca">
        <Entra i={4}>
          {/* tejados del palacio interior asomando tras el muro (más pálidos: están lejos) */}
          <g opacity=".92">
            <Techo cx={212} y={794} w={128} h={30} cima={70} relleno="mrA1oroLejos" tejas={10} nieve={0.62} />
            <Techo cx={588} y={794} w={128} h={30} cima={70} relleno="mrA1oroLejos" tejas={10} nieve={0.62} />
            <Techo cx={40} y={796} w={96} h={22} cima={50} relleno="mrA1oroLejos" tejas={8} nieve={0.62} />
            <Techo cx={762} y={796} w={96} h={22} cima={50} relleno="mrA1oroLejos" tejas={8} nieve={0.62} />
          </g>
          {/* muro */}
          <rect x="-10" y="798" width="820" height="66" fill="url(#mrA1muro)" />
          <rect x="-10" y="798" width="820" height="66" fill="url(#mrA1muroLuz)" />
          <rect x="-10" y="852" width="820" height="12" fill="url(#mrA1marmol)" opacity=".85" />
          <path d="M-10 852 H810" stroke="#fff" strokeWidth="1.6" />
          <rect x="-10" y="789" width="820" height="10" fill="url(#mrA1oro)" />
          <path d="M-10 797.6 H810" stroke="#8a5510" strokeWidth="2.6" strokeDasharray="1.7 1.5" />
          <path d="M-10 789 Q60 785 130 788.6 T270 788 T410 789 T550 788 T690 788.6 T810 788" fill="none" stroke="#fff" strokeWidth="4.4" strokeLinecap="round" />
          <rect x="-10" y="799" width="820" height="12" fill="url(#mrA1alero)" />
          {/* farolillos colgados a lo largo del muro */}
          {farolillosMuro.map((x) => (
            <g key={x}>
              <path d={`M${x} 799 V807`} stroke="#3b2416" strokeWidth=".7" />
              <ellipse cx={x} cy="812" rx="4.2" ry="4.8" fill="url(#mrA1farol)" />
              <path d={`M${x - 2} 807.4 h4 M${x - 2} 816.6 h4 M${x} 817 v4`} stroke="#f2c14e" strokeWidth="1.1" />
            </g>
          ))}
          {/* torres de esquina (角楼) de tres tejados */}
          {[120, 680].map((cx) => (
            <g key={cx}>
              <path d={`M${cx - 54} 864 L${cx - 47} 792 L${cx + 47} 792 L${cx + 54} 864Z`} fill="url(#mrA1muro)" />
              <path d={`M${cx + 20} 792 L${cx + 47} 792 L${cx + 54} 864 L${cx + 24} 864Z`} fill="#ffc890" opacity=".22" />
              <path d={`M${cx - 54} 864 L${cx - 47} 792 L${cx - 30} 792 L${cx - 34} 864Z`} fill="#3a0a14" opacity=".28" />
              <rect x={cx - 52} y="852" width="104" height="12" fill="url(#mrA1marmol)" opacity=".9" />
              <Balaustrada x={cx - 49} y={784} w={98} />
              <Cuerpo x={cx - 32} y={756} w={64} h={28} columnas={6} />
              <Techo cx={cx} y={759} w={108} h={21} cima={66} tejas={12} />
              <Cuerpo x={cx - 23} y={731} w={46} h={9} columnas={5} />
              <Techo cx={cx} y={735} w={80} h={20} cima={44} tejas={9} />
              <Techo cx={cx} y={716} w={54} h={24} cima={9} tejas={6} nieve={0.6} />
              <path d={`M${cx} 692 V682`} stroke="#c8961e" strokeWidth="1.6" />
              <circle cx={cx} cy="686" r="3" fill="#ffe08a" />
            </g>
          ))}
          {/* puerta central: bastión con tres arcos y pabellón de doble alero */}
          <path d="M272 864 L284 774 L516 774 L528 864Z" fill="url(#mrA1muro)" />
          <path d="M452 774 L516 774 L528 864 L460 864Z" fill="#ffc890" opacity=".2" />
          <path d="M272 864 L284 774 L312 774 L304 864Z" fill="#3a0a14" opacity=".3" />
          <rect x="273" y="852" width="254" height="12" fill="url(#mrA1marmol)" opacity=".9" />
          {[[345, 20, 38], [400, 28, 48], [455, 20, 38]].map(([cx, w, h]) => (
            <g key={cx}>
              <path d={`M${cx - w / 2 - 2.5} 864 V${864 - h + w / 2} a${w / 2 + 2.5} ${w / 2 + 2.5} 0 0 1 ${w + 5} 0 V864Z`} fill="#f1e6d6" opacity=".85" />
              <path d={`M${cx - w / 2} 864 V${864 - h + w / 2} a${w / 2} ${w / 2} 0 0 1 ${w} 0 V864Z`} fill="#1f0708" />
              <path d={`M${cx - w / 2 + 2} 864 V${864 - h + w / 2 + 3} a${w / 2 - 2} ${w / 2 - 2} 0 0 1 ${w / 2 - 2} ${-(w / 2 - 2)} V864Z`} fill="#8e1d20" />
              <path d={`M${cx - w / 2 + 4} ${864 - h * 0.55} h${w / 2 - 6} M${cx - w / 2 + 4} ${864 - h * 0.4} h${w / 2 - 6} M${cx - w / 2 + 4} ${864 - h * 0.25} h${w / 2 - 6}`} stroke="#f2c14e" strokeWidth="1.1" strokeDasharray="1 1.6" />
            </g>
          ))}
          <Balaustrada x={282} y={766} w={236} />
          <Cuerpo x={300} y={728} w={200} h={38} columnas={10} />
          <Techo cx={400} y={731} w={276} h={27} cima={210} tejas={26} nieve={0.5} />
          <Cuerpo x={324} y={696} w={152} h={11} columnas={9} />
          {/* placa vertical azul con marco dorado entre los dos aleros */}
          <rect x="393" y="694" width="14" height="13" fill="#17406a" stroke="#f2c14e" strokeWidth="1.2" />
          <path d="M397 698 h6 M400 697 v7 M397 702 h6" stroke="#ffe08a" strokeWidth=".9" />
          <Techo cx={400} y={699} w={240} h={42} cima={124} tejas={24} nieve={0.58} />
          <circle cx="400" cy="651" r="3.4" fill="#ffe08a" />
          {/* foso helado: reflejos del muro, del pabellón y del sol; rayas de patín */}
          <rect x="-10" y="864" width="820" height="42" fill="url(#mrA1hielo)" />
          <rect x="-10" y="864" width="820" height="24" fill="#b8323a" opacity=".2" />
          <path d="M290 864 H510 L500 892 H300Z" fill="#c9862a" opacity=".2" />
          <ellipse cx="640" cy="886" rx="150" ry="13" fill="url(#mrA1luzNieve)" />
          <ellipse cx="640" cy="886" rx="60" ry="4" fill="#fff" opacity=".8" />
          <path d="M40 880 Q110 872 190 884 M210 894 Q260 886 320 896 M500 878 Q560 870 610 882 M560 896 Q640 890 720 898 M690 876 Q740 870 790 880" fill="none" stroke="#fff" strokeWidth="1" opacity=".75" />
          <path d="M-10 864 H810" stroke="#fff" strokeWidth="2.4" />
          {/* puente de mármol hacia la puerta */}
          <path d="M374 864 H426 L474 910 H326Z" fill="url(#mrA1marmol)" />
          <path d="M374 864 L326 910 M426 864 L474 910" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" />
          <path d="M373 866 L327 909 M427 866 L473 909" stroke="#8ea0c2" strokeWidth="2.6" strokeDasharray="1.4 4.4" />
          <path d="M366 874 H434 M356 884 H444 M346 894 H454" stroke="#9fb0cf" strokeWidth=".8" opacity=".8" />
        </Entra>
      </Capa>

      {/* ---- vida del palacio: banderolas, brillos en los tejados dorados, patinadores en el foso ---- */}
      <Vivo plano="mr-cerca" entra={4}>
        <Banderola x={120.6} y={676} ancho={17} d={-0.4} />
        <Banderola x={680.6} y={676} ancho={17} d={-1.6} />
        <Destello x={452} y={668} tam={15} d={0} t={5} />
        <Destello x={338} y={716} tam={11} d={-1.4} t={6} />
        <Destello x={523} y={722} tam={12} d={-3.1} t={4.6} />
        <Destello x={712} y={748} tam={11} d={-2.2} t={5.4} />
        <Destello x={150} y={726} tam={10} d={-4} t={6.2} />
        <Destello x={640} y={884} tam={13} d={-2.8} t={3.8} />
        <Patinador x={560} y={864} tramo={190} t={15} d={-3} />
        <Patinador x={40} y={867} tramo={230} t={19} d={-9} bufanda="#f2c14e" abrigo="#7a1e2c" />
        <Patinador x={600} y={872} tramo={130} t={12} d={-6} bufanda="#3fa6c9" abrigo="#3b2a4a" />
      </Vivo>

      {/* ---- 7 · primer plano que enmarca: orilla nevada, pinos, muñeco de nieve, rama con faroles y alero ---- */}
      <Capa clase="mr-cerca">
        <Entra i={5}>
          <path d="M-10 906 C110 892 250 912 400 908 S690 890 810 902 V1010 H-10Z" fill="url(#mrA1nieve)" />
          <path d="M-10 906 C110 892 250 912 400 908 S690 890 810 902" fill="none" stroke="#fff" strokeWidth="3" />
          <ellipse cx="610" cy="930" rx="150" ry="16" fill="url(#mrA1luzNieve)" />
          <ellipse cx="300" cy="972" rx="170" ry="20" fill="url(#mrA1sombra)" opacity=".7" />
          <path d="M150 948 Q260 930 380 950 M430 962 Q560 944 700 964" fill="none" stroke="#fff" strokeWidth="2.4" opacity=".9" />
          {/* huellas hacia el puente */}
          <path d="M392 996 Q404 960 398 916" fill="none" stroke="#8fa6d6" strokeWidth="2.2" strokeDasharray="3 6" strokeLinecap="round" opacity=".7" />
          {/* muñeco de nieve y niño */}
          <g>
            <ellipse cx="236" cy="953" rx="26" ry="5" fill="url(#mrA1sombra)" />
            <circle cx="246" cy="940" r="12" fill="url(#mrA1nieve)" /><circle cx="246" cy="923" r="8.4" fill="url(#mrA1nieve)" />
            <path d="M238 928 Q246 932 254 928 L253 931.6 Q246 935 239 931.6Z M251 930 l3 9 l-3.6 .6 l-1.6 -8.6Z" fill="#d81f2e" />
            <path d="M240 916 h12 l-1.6 -6 h-8.8Z" fill="#3b2416" /><circle cx="243.4" cy="921.6" r="1" fill="#1d1410" /><circle cx="248.6" cy="921.6" r="1" fill="#1d1410" />
            <path d="M246 924 l6 1.4 l-6 1Z" fill="#f08a2a" />
            <path d="M258 936 l10 -8 M234 936 l-9 -7" stroke="#4a3324" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M279 930 L286 931 L287.6 946 L277.4 946Z" fill="#c8102e" /><path d="M279.6 946 v7 M285.6 946 v7" stroke="#27314f" strokeWidth="2.6" strokeLinecap="round" />
            <path d="M280 933 L271 927" stroke="#c8102e" strokeWidth="2.4" strokeLinecap="round" /><circle cx="282.6" cy="926" r="4" fill="#f1c9a5" />
            <path d="M278.4 925.6 A4.3 4.3 0 0 1 287 925Z" fill="#f2c14e" /><circle cx="282.6" cy="921" r="1.6" fill="#fff" />
          </g>
          {/* pinos grandes a los lados */}
          <Pino x={104} y={968} s={1.5} pisos={5} />
          <Pino x={36} y={990} s={2.5} pisos={5} />
          <Pino x={706} y={972} s={1.45} pisos={5} />
          <Pino x={772} y={994} s={2.6} pisos={5} />
          <Pino x={168} y={992} s={0.9} />
          <Pino x={636} y={994} s={0.85} />
          {/* rama de pino nevada que entra por arriba a la izquierda */}
          <g>
            <path d="M-10 26 C60 40 120 62 176 92 C200 104 222 110 246 112" fill="none" stroke="#2a1a12" strokeWidth="7" strokeLinecap="round" />
            <path d="M80 50 C96 72 104 92 104 116 M150 80 C176 76 196 66 214 50" fill="none" stroke="#2a1a12" strokeWidth="4" strokeLinecap="round" />
            {[[30, 30, 34, 12], [84, 46, 36, 16], [132, 66, 34, 20], [104, 110, 26, 60], [186, 92, 34, 24], [214, 52, 26, -34], [246, 110, 26, 8], [56, 66, 26, 40]].map(([x, y, rx, giro], k) => (
              <g key={k} transform={`rotate(${giro} ${x} ${y})`}>
                <ellipse cx={x} cy={y + 3} rx={rx} ry="9.5" fill="url(#mrA1pino)" />
                <path d={`M${x - rx} ${y + 3} q${rx * 0.25} 9 ${rx * 0.5} 2 q${rx * 0.25} 9 ${rx * 0.5} 2 q${rx * 0.25} 9 ${rx * 0.5} 2 q${rx * 0.25} 8 ${rx * 0.5} -6Z`} fill="#0d1f18" />
                <ellipse cx={x + 2} cy={y - 3} rx={rx * 0.82} ry="5.6" fill="url(#mrA1nieveTecho)" />
              </g>
            ))}
          </g>
          {/* alero de pabellón en la esquina superior derecha */}
          <g>
            <path d="M810 -10 V140 C756 136 708 122 674 96 C648 76 634 54 628 30 C648 48 672 56 702 54 C744 50 782 30 810 4Z" fill="#3a1114" />
            <path d="M810 134 C758 130 712 116 680 92 C660 76 646 60 638 44" fill="none" stroke="#1f6f74" strokeWidth="7" strokeDasharray="3 5" />
            <path d="M810 122 C762 118 720 106 690 84" fill="none" stroke="#f2c14e" strokeWidth="1.4" opacity=".8" />
            <path d="M628 30 C648 48 672 56 702 54 C744 50 782 30 810 4" fill="none" stroke="url(#mrA1oro)" strokeWidth="7" strokeLinecap="round" />
            <path d="M626 25 C648 43 672 50 702 48 C744 44 782 24 810 -2" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
            <path d="M630 33 v10" stroke="#3b2416" strokeWidth="1" /><path d="M626.4 43 h7.2 l1.4 8 h-10Z" fill="url(#mrA1oro)" /><circle cx="630" cy="54" r="1.6" fill="#f2c14e" />
          </g>
        </Entra>
      </Capa>

      {/* ---- textura de papel y viñeteado; tintes de atardecer y de noche ---- */}
      <div className="a1-grano" />
      <div className="a1-tinte a1-t-atardecer" />
      <div className="a1-tinte a1-t-noche" />
      <div className="a1-resplandor" />

      {/* ---- luces (por encima de los tintes): antorchas de la Muralla, ventanas, farolillos ---- */}
      <Capa clase="mr-medio a1-luces">
        <g className="a1-luz">
          {ANTORCHAS.map(([x, y], k) => (
            <g key={k}>
              <circle cx={r1(x)} cy={r1(y - 8)} r="7" fill="url(#mrA1bloom)" opacity=".7" />
              <circle cx={r1(x)} cy={r1(y - 8)} r="1.3" fill="#fff3b0" />
            </g>
          ))}
          {ATALAYAS.map(([x, y, s]) => (
            <g key={x}>
              <circle cx={x} cy={y - 12 * s} r={20 * s} fill="url(#mrA1bloom)" opacity=".8" />
              <rect x={x - 6 * s} y={y - 18 * s} width={3 * s} height={5 * s} rx={1.5 * s} fill="#ffe08a" /><rect x={x + 3 * s} y={y - 18 * s} width={3 * s} height={5 * s} rx={1.5 * s} fill="#ffe08a" />
              <path d={`M${x - 3 * s} ${y + 6 * s} v${-9 * s} a${3 * s} ${3 * s} 0 0 1 ${6 * s} 0 v${9 * s}Z`} fill="#ffb84a" />
            </g>
          ))}
          {CASAS.map(([x, y, w]) => (
            <g key={x}>
              <circle cx={x - w * 0.3 + 2.2} cy={y - 3.8} r="9" fill="url(#mrA1bloom)" opacity=".85" />
              <rect x={x - w * 0.3} y={y - 6} width="4.4" height="4.4" fill="#ffe08a" />
            </g>
          ))}
          <ellipse cx="176" cy="664" rx="54" ry="30" fill="url(#mrA1bloom)" opacity=".45" />
          {n(7).map((i) => <rect key={i} x={r1(176 - 30.4 + i * 8.7 + 1.6)} y="662" width="5.7" height="12" fill="#ffd27a" opacity=".9" />)}
          {n(5).map((k) => <rect key={k} x="674" y={672 - k * 17} width="4" height="6" rx="2" fill="#ffe08a" />)}
          <ellipse cx="676" cy="640" rx="30" ry="50" fill="url(#mrA1bloom)" opacity=".3" />
        </g>
      </Capa>
      <Capa clase="mr-cerca a1-luces">
        <g className="a1-luz">
          <ellipse cx="400" cy="752" rx="150" ry="46" fill="url(#mrA1bloom)" opacity=".5" />
          {panosPuerta.map((p, i) => <rect key={i} x={r1(p.x)} y={p.y} width={r1(p.w)} height={p.h * 0.72} fill="#ffd27a" opacity=".88" />)}
          {[120, 680].flatMap((cx) => panos(cx - 32, 756, 64, 28, 6).map((p, i) => <rect key={`${cx}-${i}`} x={r1(p.x)} y={p.y} width={r1(p.w)} height={p.h * 0.72} fill="#ffd27a" opacity=".88" />))}
          {[120, 680].map((cx) => <ellipse key={cx} cx={cx} cy="770" rx="56" ry="26" fill="url(#mrA1bloom)" opacity=".45" />)}
          {[[345, 16, 30], [400, 24, 40], [455, 16, 30]].map(([cx, w, h]) => <ellipse key={cx} cx={cx} cy={864 - h * 0.45} rx={w * 0.9} ry={h * 0.7} fill="url(#mrA1bloom)" opacity=".8" />)}
          {farolillosMuro.map((x) => (
            <g key={x}>
              <circle cx={x} cy="812" r="15" fill="url(#mrA1bloom)" opacity=".85" />
              <ellipse cx={x} cy="812" rx="3" ry="3.6" fill="#ffe9a8" />
            </g>
          ))}
          {/* reflejo cálido de las luces en el hielo */}
          <ellipse cx="400" cy="884" rx="130" ry="12" fill="url(#mrA1bloom)" opacity=".35" />
          <ellipse cx="120" cy="884" rx="60" ry="8" fill="url(#mrA1bloom)" opacity=".3" /><ellipse cx="680" cy="884" rx="60" ry="8" fill="url(#mrA1bloom)" opacity=".3" />
        </g>
      </Capa>

      {/* ---- faroles que se mecen (rama, alero y puerta) y, en fiesta, tracas de petardos ---- */}
      <Vivo plano="mr-cerca" clase="a1-delante" entra={5}>
        <Farol x={104} y={118} ancho={34} cuerda={22} t={5.4} />
        <Farol x={212} y={112} ancho={26} cuerda={12} d={-2} t={4.6} />
        <Farol x={726} y={128} ancho={36} cuerda={18} d={-1.2} t={6} />
        <Farol x={300} y={733} ancho={11} cuerda={4} d={-0.6} t={3.8} />
        <Farol x={500} y={733} ancho={11} cuerda={4} d={-2.4} t={4.2} />
        {fiesta && [[236, 798], [564, 798], [318, 772], [482, 772]].map(([x, y], k) => (
          <div key={x} className="a1-traca" style={pos(x - 6, y, 12, { "--d": `${-k * 0.37}s` })}>
            <svg viewBox="0 0 14 60">
              <path d="M7 0 V56" stroke="#3b2416" strokeWidth=".8" />
              {n(8).map((i) => <rect key={i} x={i % 2 ? 7.4 : 1.2} y={3 + i * 6.4} width="5.4" height="9" rx="1.2" fill="#d81f2e" stroke="#f2c14e" strokeWidth=".7" transform={`rotate(${i % 2 ? 22 : -22} 7 ${7 + i * 6.4})`} />)}
            </svg>
            {n(5).map((i) => <i key={i} style={{ top: `${12 + i * 19}%`, left: `${i % 2 ? 60 : -30}%`, "--d": `${-i * 0.31 - k * 0.2}s` }} />)}
          </div>
        ))}
      </Vivo>
    </>
  );
}

// ================= AMBIENTE (partículas por encima de todo el paisaje) =================
export function Ambiente({ fiesta }) {
  return (
    <div className="mr-particulas a1-ambiente">
      {/* noche: luna con halo y estrellas que titilan */}
      <div className="a1-noche-cielo">
        <div className="a1-lienzo">
          <div className="a1-luna" style={pos(232, 168, 64)} />
          {n(44).map((i) => (
            <span key={i} className="a1-estrella" style={pos(8 + azar(i * 5) * 784, 20 + azar(i * 9) * 400, 2 + (i % 3) * 1.4, { "--t": `${2.4 + (i % 5) * 0.9}s`, "--d": `${-azar(i) * 6}s` })} />
          ))}
          {/* la nieve brilla bajo la luna */}
          {n(14).map((i) => (
            <span key={`b${i}`} className="a1-estrella a1-chispa" style={pos(20 + azar(i * 17) * 760, 912 + azar(i * 23) * 70, 3, { "--t": `${1.8 + (i % 4) * 0.7}s`, "--d": `${-azar(i * 3) * 5}s` })} />
          ))}
        </div>
      </div>
      {/* nieve en tres profundidades: fina y lenta al fondo, media, y copos grandes y difusos cerca de la cámara */}
      {n(28).map((i) => (
        <span key={`l${i}`} className="a1-copo a1-copo-lejos" style={{ left: `${(i * 37 + 5) % 100}%`, "--y": `${(i * 53) % 96}%`, "--t": `${17 + (i % 6) * 2.6}s`, "--d": `${-((i * 2.9) % 30)}s`, "--x": `${(i % 2 ? 1 : -1) * (14 + (i % 5) * 7)}px` }} />
      ))}
      {n(16).map((i) => (
        <span key={`m${i}`} className="a1-copo a1-copo-medio" style={{ left: `${(i * 61 + 11) % 100}%`, "--y": `${(i * 71 + 9) % 96}%`, "--t": `${11 + (i % 5) * 1.7}s`, "--d": `${-((i * 1.9) % 18)}s`, "--x": `${(i % 2 ? -1 : 1) * (24 + (i % 4) * 12)}px` }} />
      ))}
      {n(7).map((i) => (
        <span key={`c${i}`} className="a1-copo a1-copo-cerca" style={{ left: `${(i * 43 + 3) % 100}%`, "--y": `${(i * 29 + 20) % 90}%`, "--t": `${6.5 + (i % 4) * 1.2}s`, "--d": `${-((i * 1.3) % 9)}s`, "--x": `${(i % 2 ? 1 : -1) * (50 + (i % 3) * 26)}px`, "--s": 0.8 + (i % 3) * 0.35 }} />
      ))}
      {/* fiesta: suelta de farolillos Kongming desde el palacio */}
      {fiesta && n(14).map((i) => (
        <span key={`k${i}`} className="a1-kongming" style={{ left: `${10 + ((i * 29) % 80)}%`, "--t": `${6 + (i % 5) * 1.1}s`, "--d": `${-(i * 0.83) % 7}s`, "--x": `${(i % 2 ? 1 : -1) * (20 + (i % 4) * 16)}px`, "--s": 0.7 + (i % 4) * 0.22 }} />
      ))}
    </div>
  );
}

// ================= VIÑETAS (200 × 240) a los lados del camino =================
// Usan los mismos degradados del panorama (los ids mrA1… viven en el mismo documento).
const SueloNevado = ({ y = 222 }) => (
  <g>
    <ellipse cx="100" cy={y} rx="104" ry="20" fill="url(#mrA1nieve)" />
    <ellipse cx="130" cy={y - 4} rx="60" ry="9" fill="url(#mrA1luzNieve)" />
  </g>
);
const NieveVin = ({ k = 5 }) => (
  <g>
    {n(k).map((i) => <circle key={i} className="a1-vin-copo" cx={20 + ((i * 47) % 160)} cy="0" r={1.6 + (i % 3) * 0.6} fill="#fff" style={{ "--t": `${5 + (i % 4) * 1.3}s`, "--d": `${-i * 1.7}s` }} />)}
  </g>
);
const FarolVin = ({ x, y, s = 1, d = 0 }) => (
  <g className="a1-vin-farol" style={{ "--d": `${d}s` }}>
    <path d={`M${x} ${y} v${8 * s}`} stroke="#3b2416" strokeWidth=".9" />
    <circle className="a1-vin-brillo" cx={x} cy={y + 16 * s} r={17 * s} fill="url(#mrA1bloom)" />
    <ellipse cx={x} cy={y + 16 * s} rx={7.6 * s} ry={8.4 * s} fill="url(#mrA1farol)" />
    <path d={`M${x - 3.4 * s} ${y + 7.6 * s} h${6.8 * s} M${x - 3.4 * s} ${y + 24.4 * s} h${6.8 * s} M${x} ${y + 25 * s} v${7 * s}`} stroke="#f2c14e" strokeWidth={1.6 * s} strokeLinecap="round" />
  </g>
);
const HumoVin = ({ x, y }) => (
  <g>
    {n(3).map((k) => <circle key={k} className="a1-vin-humo" cx={x} cy={y} r="5" fill="#fff" style={{ "--d": `${-k * 2}s` }} />)}
  </g>
);

export const VINETAS = [
  // 1 · Atalaya de la Gran Muralla sobre un monte nevado, con banderola
  () => (
    <Vin>
      <path d="M0 240 V176 C50 134 110 122 200 152 V240Z" fill="url(#mrA1s5)" />
      <ellipse cx="150" cy="176" rx="70" ry="30" fill="url(#mrA1luzNieve)" />
      <path d="M0 208 C40 180 70 156 110 144 S170 158 200 170" fill="none" stroke="#a88a68" strokeWidth="13" />
      <path d="M0 204.6 C40 176.6 70 152.6 110 140.6 S170 154.6 200 166.6" fill="none" stroke="#e9d1a8" strokeWidth="4.4" />
      <path d="M0 200 C40 172 70 148 110 136 S170 150 200 162" fill="none" stroke="#c7aa80" strokeWidth="4.6" strokeDasharray="4 3.4" />
      <path d="M0 197.4 C40 169.4 70 145.4 110 133.4 S170 147.4 200 159.4" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="4 3.4" />
      <Atalaya x={110} y={136} s={2} />
      <g className="a1-vin-bandera">
        <path d="M122 46 C134 43 142 52 158 48 C148 54 150 60 157 64 C143 65 134 60 122 64Z" fill="#d81f2e" />
        <path d="M122 46 C134 43 142 52 158 48" fill="none" stroke="#ff8a6a" strokeWidth="1.4" />
      </g>
      <Pino x={30} y={226} s={0.95} />
      <Pino x={178} y={232} s={0.78} />
      <NieveVin />
    </Vin>
  ),
  // 2 · Bosquecillo de pinos con farol de piedra encendido; la nieve cae de una rama
  () => (
    <Vin>
      <SueloNevado />
      <Pino x={58} y={212} s={1.7} pisos={5} />
      <Pino x={138} y={222} s={1.25} />
      <Pino x={180} y={226} s={0.85} />
      <g>
        <ellipse cx="84" cy="224" rx="20" ry="4" fill="url(#mrA1sombra)" />
        <rect x="90" y="198" width="10" height="26" fill="url(#mrA1piedra)" />
        <rect x="83" y="184" width="24" height="15" fill="url(#mrA1piedra)" />
        <circle className="a1-vin-brillo" cx="95" cy="191" r="20" fill="url(#mrA1bloom)" />
        <rect x="90" y="187" width="10" height="9" fill="#ffd36a" />
        <path d="M78 185 L95 170 L112 185Z" fill="url(#mrA1teja)" />
        <path d="M80 183 Q95 166 110 183 Q95 176 80 183Z" fill="#fff" />
      </g>
      <g className="a1-vin-alud">
        <circle cx="34" cy="150" r="3.4" fill="#fff" /><circle cx="40" cy="156" r="2.4" fill="#fff" /><circle cx="30" cy="158" r="2" fill="#fff" /><circle cx="37" cy="164" r="1.6" fill="#fff" />
      </g>
      <NieveVin k={4} />
    </Vin>
  ),
  // 3 · Torre de esquina de la Ciudad Prohibida sobre el foso helado
  () => (
    <Vin>
      <rect x="0" y="204" width="200" height="36" fill="url(#mrA1hielo)" />
      <rect x="0" y="204" width="200" height="16" fill="#b8323a" opacity=".22" />
      <ellipse cx="140" cy="222" rx="50" ry="6" fill="url(#mrA1luzNieve)" />
      <rect x="10" y="150" width="180" height="56" fill="url(#mrA1muro)" />
      <rect x="10" y="150" width="180" height="56" fill="url(#mrA1muroLuz)" />
      <rect x="10" y="196" width="180" height="10" fill="url(#mrA1marmol)" opacity=".9" />
      <Balaustrada x={14} y={142} w={172} />
      <Cuerpo x={56} y={110} w={88} h={32} columnas={7} />
      <Techo cx={100} y={113} w={144} h={24} cima={90} tejas={14} />
      <Cuerpo x={70} y={80} w={60} h={11} columnas={6} />
      <Techo cx={100} y={84} w={106} h={24} cima={58} tejas={11} />
      <Techo cx={100} y={60} w={70} h={28} cima={12} tejas={7} nieve={0.6} />
      <path d="M100 32 V20" stroke="#c8961e" strokeWidth="2" /><circle cx="100" cy="25" r="3.6" fill="#ffe08a" />
      <FarolVin x={52} y={114} s={0.8} /><FarolVin x={148} y={114} s={0.8} d={-1.6} />
      <circle className="a1-vin-destello" cx="136" cy="70" r="3" fill="#fff" />
    </Vin>
  ),
  // 4 · Templo del Cielo
  () => (
    <Vin>
      <SueloNevado y={226} />
      <g transform="translate(-100 -260) scale(1.36)">
        <TemploCielo cx={147} y={346} />
      </g>
      <circle className="a1-vin-destello" cx="100" cy="36" r="3" fill="#fff" />
      <NieveVin k={4} />
    </Vin>
  ),
  // 5 · Hutong: casa con chimenea que humea, farol y bicicleta apoyada
  () => (
    <Vin>
      <SueloNevado />
      <rect x="26" y="128" width="150" height="86" fill="url(#mrA1piedra)" />
      <rect x="26" y="128" width="150" height="22" fill="url(#mrA1alero)" />
      <path d="M26 150 H176 M26 172 H176 M26 194 H176" stroke="#6d5c50" strokeWidth=".7" opacity=".5" />
      <rect x="140" y="80" width="12" height="30" fill="url(#mrA1piedra)" />
      <path d="M12 132 L44 98 H158 L190 132Z" fill="url(#mrA1teja)" />
      {n(11).map((i) => <path key={i} d={`M${50 + i * 10.4} 98 L${24 + i * 15.4} 131`} stroke="#232a36" strokeWidth="1" opacity=".6" />)}
      <path d="M44 96.6 H158 L178 118 Q150 110 124 120 Q100 108 76 120 Q50 110 24 118Z" fill="url(#mrA1nieveTecho)" />
      <path d="M12 132 H190" stroke="#232a36" strokeWidth="3" strokeDasharray="2.4 2" />
      <rect x="44" y="156" width="34" height="58" fill="#8e1d20" stroke="#f2c14e" strokeWidth="1.4" />
      <path d="M61 156 V214" stroke="#5e0e14" strokeWidth="1.4" /><circle cx="57" cy="186" r="1.8" fill="#f2c14e" /><circle cx="65" cy="186" r="1.8" fill="#f2c14e" />
      <rect x="50" y="160" width="9" height="14" fill="#f4dc9a" opacity=".5" />
      <circle className="a1-vin-brillo" cx="126" cy="174" r="34" fill="url(#mrA1bloom)" />
      <rect x="104" y="158" width="44" height="32" fill="#ffd27a" /><rect x="104" y="158" width="44" height="32" fill="url(#mrA1celosia)" opacity=".55" />
      <rect x="102" y="156" width="48" height="36" fill="none" stroke="#5e0e14" strokeWidth="2.4" />
      <FarolVin x={90} y={134} s={0.9} />
      <HumoVin x={146} y={76} />
      {/* bicicleta */}
      <g fill="none" stroke="#27314f" strokeWidth="2" strokeLinecap="round">
        <circle cx="126" cy="212" r="11" /><circle cx="162" cy="212" r="11" />
        <path d="M126 212 L138 196 H156 L162 212 M138 196 L146 212 H126 M156 196 L154 190 h6 M136 192 h7" />
      </g>
      <path d="M115 212 a11 11 0 0 1 22 0 M151 212 a11 11 0 0 1 22 0" fill="none" stroke="#fff" strokeWidth="1.6" transform="translate(0 -1.6)" />
    </Vin>
  ),
  // 6 · Puesto de tanghulu (brochetas de espino caramelizado)
  () => (
    <Vin>
      <SueloNevado />
      <ellipse cx="86" cy="222" rx="60" ry="6" fill="url(#mrA1sombra)" />
      <path d="M40 120 V220 M160 120 V220" stroke="#4a3324" strokeWidth="4" />
      <path d="M28 124 L46 92 H154 L172 124Z" fill="url(#mrA1muro)" />
      {n(6).map((i) => <path key={i} d={`M${28 + i * 24} 124 q12 12 24 0`} fill={i % 2 ? "#f2c14e" : "#c8102e"} />)}
      <path d="M46 90.6 H154 L164 108 Q130 100 100 108 Q70 100 36 108Z" fill="url(#mrA1nieveTecho)" />
      <rect x="46" y="176" width="108" height="44" fill="url(#mrA1laca)" /><rect x="42" y="170" width="116" height="8" fill="url(#mrA1oro)" />
      <rect x="84" y="186" width="32" height="24" fill="#f1e2c0" stroke="#f2c14e" strokeWidth="1" />
      <text x="100" y="204" textAnchor="middle" fontSize="15" fontFamily="STKaiti, KaiTi, serif" fill="#8f0c21" translate="no">糖</text>
      {/* haz de paja con brochetas */}
      <rect x="94" y="120" width="12" height="52" rx="5" fill="#d8b46a" />
      {[[-40, 0], [-22, -0.6], [-6, 0], [10, -0.4], [26, 0], [42, -0.8]].map(([giro, d], k) => (
        <g key={k} className="a1-vin-brocheta" style={{ "--d": `${d}s` }} transform={`rotate(${giro} 100 150)`}>
          <path d="M100 150 V96" stroke="#b98a4a" strokeWidth="1.2" />
          {n(5).map((i) => (
            <g key={i}>
              <circle cx="100" cy={102 + i * 8.4} r="4.6" fill="url(#mrA1farol)" />
              <circle cx="101.6" cy={100.4 + i * 8.4} r="1.3" fill="#fff" opacity=".85" />
            </g>
          ))}
        </g>
      ))}
      <FarolVin x={40} y={124} s={0.8} /><FarolVin x={160} y={124} s={0.8} d={-1.2} />
      <NieveVin k={4} />
    </Vin>
  ),
  // 7 · Palacio de Verano: Puente de los Diecisiete Arcos sobre el lago helado, con pagoda al fondo
  () => (
    <Vin>
      <path d="M0 150 L40 118 L78 140 L120 104 L160 136 L200 116 V190 H0Z" fill="url(#mrA1s3)" opacity=".8" />
      <g transform="translate(60 -384) scale(.72)"><Pagoda cx={150} y={722} /></g>
      <rect x="0" y="172" width="200" height="68" fill="url(#mrA1hielo)" />
      <rect x="0" y="160" width="200" height="22" fill="url(#mrA1brumaFria)" />
      <ellipse cx="120" cy="214" rx="70" ry="8" fill="url(#mrA1luzNieve)" />
      <path d="M0 190 Q100 150 200 190 V200 H0Z" fill="url(#mrA1marmol)" />
      {n(9).map((i) => {
        const x = 20 + i * 20;
        const alto = 5 + Math.sin(((i + 0.5) / 9) * Math.PI) * 13;
        return (
          <g key={i}>
            <path d={`M${x - 6.4} 200 v${-alto + 6} a6.4 6.4 0 0 1 12.8 0 V200Z`} fill="#5f86b4" />
            <path className="a1-vin-reflejo" d={`M${x - 5} 201 h10 v${alto * 0.7} h-10Z`} fill="#fff" opacity=".35" />
          </g>
        );
      })}
      <path d="M0 189 Q100 149 200 189" fill="none" stroke="#fff" strokeWidth="3.4" />
      <path d="M0 186 Q100 146 200 186" fill="none" stroke="#8ea0c2" strokeWidth="3" strokeDasharray="1.4 5" />
      <path d="M14 224 Q60 216 110 226 M90 234 Q140 226 190 232" fill="none" stroke="#fff" strokeWidth="1" opacity=".8" />
      <Pino x={18} y={236} s={0.8} /><Pino x={186} y={238} s={0.7} />
      <NieveVin k={4} />
    </Vin>
  ),
];
