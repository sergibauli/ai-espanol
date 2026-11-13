import * as React from "react";
import { Capa, Vin, n } from "./piezas.jsx";
import "../../../styles/v14-ruta-A2.css";

/*
  A2 · La Ruta de la Seda (丝绸之路): el desierto de Dunhuang, de Xi'an a Jiayuguan.
  Cómo está pintado (v14, «listón gráfico», mismo método que el piloto A1):
  - 7 planos: cielo (CSS) → sol y nubes → montañas arcoíris de Zhangye → dunas lejanas con el fuerte de Jiayuguan →
    acantilado de Mogao y dunas medias → duna de la caravana → duna del oasis de la Luna Creciente → primer plano
    (álamo del desierto a la izquierda, toldo del bazar a la derecha) que enmarca.
  - Lo ESTÁTICO va en los SVG grandes; lo VIVO, en capas HTML (<Vivo>) con un «lienzo» que calca el viewBox 800×1000:
    cada pieza se coloca con pos(x, y, ancho) en unidades del dibujo y solo anima transform/opacity.
  - Día / atardecer / noche: tintes a pantalla completa en mix-blend-mode: multiply que cambian de opacity y, por encima,
    las luces (cuevas, faroles, hogueras, luna, Vía Láctea). La luz viene siempre de arriba a la derecha.
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
  <div className={`mr-capa ${plano} a2-vivo ${clase}`}>
    <div className={`a2-lienzo ${entra != null ? "a2-entra" : ""}`} style={entra != null ? { "--i": entra } : undefined}>
      {children}
    </div>
  </div>
);
// Grupo SVG con entrada escalonada (el parallax va en la capa; la entrada, en este envoltorio)
const Entra = ({ i, children }) => (
  <g className="a2-entra" style={{ "--i": i }}>
    {children}
  </g>
);
// Curva suave (Catmull-Rom → Bézier) por una lista de puntos; tramo(P, i) va del punto i al i+1
const tramo = (P, i) => {
  const p0 = P[i - 1] || P[i];
  const p1 = P[i];
  const p2 = P[i + 1];
  const p3 = P[i + 2] || p2;
  return `C${r1(p1[0] + (p2[0] - p0[0]) / 6)} ${r1(p1[1] + (p2[1] - p0[1]) / 6)} ${r1(p2[0] - (p3[0] - p1[0]) / 6)} ${r1(p2[1] - (p3[1] - p1[1]) / 6)} ${p2[0]} ${p2[1]}`;
};
const cresta = (P, desde = 0, hasta = P.length - 1) => `M${P[desde][0]} ${P[desde][1]} ` + n(hasta - desde).map((k) => tramo(P, desde + k)).join(" ");

// ---------- degradados y motivos (ids mrA2…) ----------
function Defs() {
  const lin = (id, paradas, attrs = { x1: 0, y1: 0, x2: 0, y2: 1 }) => (
    <linearGradient id={id} {...attrs}>
      {paradas.map(([o, c, a], k) => <stop key={k} offset={o} stopColor={c} stopOpacity={a ?? 1} />)}
    </linearGradient>
  );
  const H = { x1: 0, y1: 0, x2: 1, y2: 0 };
  const us = (y1, y2) => ({ gradientUnits: "userSpaceOnUse", x1: 0, y1, x2: 0, y2 });
  // estratos de colores del Danxia de Zhangye (inclinados y repetidos)
  const estratos = (id, colores, paso) => (
    <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={paso * 0.42} y2={paso} spreadMethod="repeat">
      {colores.flatMap((c, k) => [<stop key={`a${k}`} offset={k / colores.length} stopColor={c} />, <stop key={`b${k}`} offset={(k + 0.82) / colores.length} stopColor={c} />])}
    </linearGradient>
  );
  return (
    <defs>
      {estratos("mrA2danxia1", ["#d99a86", "#f1cfa4", "#e2b08a", "#bcc4b4", "#f5dcb4", "#cf8d7c", "#ecc090"], 74)}
      {estratos("mrA2danxia2", ["#c9604a", "#f3c98a", "#e08a52", "#8fb0a2", "#f8e2b0", "#b8473a", "#eeb060", "#d9744c"], 88)}
      {lin("mrA2calima", [[0, "#ffe9c0", 0], [0.55, "#ffe9c0", 0.9], [1, "#ffe9c0", 0]])}
      {lin("mrA2calimaOro", [[0, "#ffdc9c", 0], [0.55, "#ffdc9c", 0.85], [1, "#ffdc9c", 0]])}
      {lin("mrA2velo1", [[0, "#fff1d2", 0.05], [1, "#ffe9c4", 0.92]], us(490, 640))}
      {lin("mrA2velo2", [[0, "#fff1d2", 0], [1, "#ffe6bc", 0.8]], us(520, 660))}
      {/* dunas: sombra malva-tostada en la cresta que se funde con la calima de su base; cara al sol dorada */}
      {lin("mrA2d1", [[0, "#d7b294"], [0.5, "#e9cba0"], [1, "#f8e4bc"]], us(600, 690))}
      {lin("mrA2l1", [[0, "#fff6da", 0.95], [1, "#fff0c8", 0]], us(600, 672))}
      {lin("mrA2d2", [[0, "#c2906a"], [0.5, "#dcb07c"], [1, "#f4d8a4"]], us(650, 770))}
      {lin("mrA2l2", [[0, "#ffedbc", 1], [0.7, "#ffe2a4", 0.45], [1, "#ffe2a4", 0]], us(650, 750))}
      {lin("mrA2d3", [[0, "#b17a50"], [0.45, "#d09a5e"], [1, "#efc98c"]], us(745, 880))}
      {lin("mrA2l3", [[0, "#ffe6a6", 1], [0.7, "#ffd78a", 0.5], [1, "#ffd78a", 0]], us(745, 860))}
      {lin("mrA2d4", [[0, "#9c6238"], [0.4, "#c2854a"], [1, "#e3b06a"]], us(815, 990))}
      {lin("mrA2l4", [[0, "#ffdf96", 1], [0.65, "#f9c56e", 0.55], [1, "#f9c56e", 0]], us(815, 960))}
      {lin("mrA2d5", [[0, "#6e3c1e"], [0.5, "#925428"], [1, "#b06a30"]], us(940, 1010))}
      {lin("mrA2l5", [[0, "#f3b860", 0.95], [1, "#e09a48", 0]], us(940, 1005))}
      {/* roca del acantilado de Mogao y adobe del fuerte */}
      {lin("mrA2roca", [[0, "#7c4c30"], [0.45, "#b9825a"], [0.8, "#deb084"], [1, "#f4d2a2"]], H)}
      {lin("mrA2rocaPie", [[0, "#5a3020", 0], [1, "#5a3020", 0.5]])}
      {lin("mrA2adobe", [[0, "#9a6a44"], [0.55, "#cfa070"], [1, "#f2d09c"]], H)}
      {lin("mrA2adobeV", [[0, "#000", 0], [1, "#3a1c10", 0.4]])}
      {lin("mrA2laca", [[0, "#5a1210"], [0.5, "#b33626"], [1, "#e0683e"]], H)}
      {lin("mrA2teja", [[0, "#3a2620"], [0.55, "#6e5046"], [1, "#b08c72"]], H)}
      {lin("mrA2tejaRoja", [[0, "#5e1612"], [0.55, "#a8382a"], [1, "#ea8452"]], H)}
      {lin("mrA2oro", [[0, "#9a5d12"], [0.4, "#dc9a26"], [0.75, "#ffd161"], [1, "#fff3b8"]], { x1: 0, y1: 0, x2: 1, y2: 0.35 })}
      {lin("mrA2alero", [[0, "#000", 0.5], [1, "#000", 0]])}
      {lin("mrA2agua", [[0, "#bfeee6"], [0.25, "#5cc4c8"], [0.7, "#1f8aa0"], [1, "#12607c"]])}
      {lin("mrA2reflejo", [[0, "#fff6d0", 0.9], [1, "#fff6d0", 0]])}
      {lin("mrA2tronco", [[0, "#3a2414"], [0.55, "#7a5230"], [1, "#c99a62"]], H)}
      {lin("mrA2camello", [[0, "#5a3216"], [0.5, "#a8703a"], [1, "#e6b272"]], H)}
      {lin("mrA2camelloLejos", [[0, "#3e220f"], [1, "#8a5a2c"]], H)}
      {lin("mrA2seda", [[0, "#8f0c21"], [0.5, "#d8263a"], [1, "#ff7a5c"]], H)}
      {lin("mrA2toldo", [[0, "#5a0a16"], [0.6, "#b81c2e"], [1, "#e8553c"]], { x1: 0, y1: 0, x2: 1, y2: 1 })}
      <radialGradient id="mrA2hoja" cx=".5" cy=".5" r=".5" fx=".7" fy=".25">
        <stop offset="0" stopColor="#ffe27a" /><stop offset=".5" stopColor="#e9a528" /><stop offset="1" stopColor="#a8611a" />
      </radialGradient>
      <radialGradient id="mrA2nube" cx=".5" cy=".5" r=".5" fx=".66" fy=".8">
        <stop offset="0" stopColor="#ffffff" /><stop offset=".5" stopColor="#fff0d8" /><stop offset="1" stopColor="#e8c8b8" />
      </radialGradient>
      <radialGradient id="mrA2luzArena">
        <stop offset="0" stopColor="#fff3c8" stopOpacity=".85" /><stop offset="1" stopColor="#ffe6a8" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="mrA2sombra">
        <stop offset="0" stopColor="#5a2a3a" stopOpacity=".5" /><stop offset="1" stopColor="#5a2a3a" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="mrA2bloom">
        <stop offset="0" stopColor="#fff6c4" /><stop offset=".35" stopColor="#ffb94a" stopOpacity=".75" /><stop offset="1" stopColor="#ff7a1a" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="mrA2farol" cx=".5" cy=".5" r=".5" fx=".62" fy=".35">
        <stop offset="0" stopColor="#ffb05c" /><stop offset=".55" stopColor="#e2401c" /><stop offset="1" stopColor="#7c1408" />
      </radialGradient>
    </defs>
  );
}

// ---------- piezas pintadas ----------
/* Duna: silueta suave en sombra + caras al sol a la derecha de cada cresta + arista nítida + filo de luz.
   caras = [[iPico, iFin, dx, dy]]: la cara iluminada va del punto iPico al iFin por la cresta y vuelve por la arista,
   que baja en S desde el pico hasta (pico.x − dx, pico.y + dy). */
function Duna({ pts, sombra, luz, caras = [], filo = "#fff4d2", arista = "#5a2c1c", grosor = 1.4 }) {
  return (
    <g>
      <path d={`${cresta(pts)} V1010 H${pts[0][0]}Z`} fill={`url(#${sombra})`} />
      {caras.map(([a, b, dx, dy], k) => {
        const [px, py] = pts[a];
        const [ex, ey] = pts[b];
        const fx = px - dx;
        const fy = py + dy;
        const vuelta = `C${r1(fx + dx * 0.55)} ${r1(fy - dy * 0.2)} ${r1(px - dx * 0.5)} ${r1(py + dy * 0.45)} ${px} ${py}`;
        return (
          <g key={k}>
            <path d={`${cresta(pts, a, b)} Q${r1((ex + fx) / 2 + dx * 0.2)} ${r1(Math.max(ey, fy) + dy * 0.28)} ${r1(fx)} ${r1(fy)} ${vuelta}Z`} fill={`url(#${luz})`} />
            <path d={`M${r1(fx)} ${r1(fy)} ${vuelta}`} transform="translate(-1.6 .6)" fill="none" stroke={arista} strokeWidth={grosor * 2.2} opacity=".2" strokeLinecap="round" />
          </g>
        );
      })}
      <path d={cresta(pts)} fill="none" stroke={filo} strokeWidth={grosor} opacity=".85" />
    </g>
  );
}

// Sierra de estratos de colores: silueta quebrada con hombros, relleno de estratos, caras en luz y en sombra
function Arcoiris({ picos, base, relleno, semilla, velo }) {
  const P = picos;
  const valles = P.slice(0, -1).map((p, i) => {
    const q = P[i + 1];
    const t = 0.4 + azar(semilla + i) * 0.25;
    return [p[0] + (q[0] - p[0]) * t, Math.max(p[1], q[1]) + 10 + azar(semilla + i * 3) * 18];
  });
  let silueta = `M${P[0][0]} ${base} L${P[0][0]} ${P[0][1]}`;
  P.forEach((p, i) => {
    if (i > 0) silueta += ` L${r1((p[0] + valles[i - 1][0]) / 2 + (azar(semilla + i * 11) - 0.5) * 8)} ${r1((p[1] + valles[i - 1][1]) / 2 - 4)} L${p[0]} ${p[1]}`;
    if (valles[i]) silueta += ` L${r1((p[0] + valles[i][0]) / 2 + 4)} ${r1((p[1] + valles[i][1]) / 2 + (azar(semilla + i * 7) - 0.3) * 7)} L${r1(valles[i][0])} ${r1(valles[i][1])}`;
  });
  silueta += ` L${P[P.length - 1][0]} ${base}Z`;
  return (
    <g>
      <path d={silueta} fill={`url(#${relleno})`} />
      {P.slice(0, -1).map((p, i) => {
        const v = valles[i];
        return (
          <g key={i}>
            {/* cara al sol (derecha del pico) y barranco en sombra (izquierda) */}
            <path d={`M${p[0]} ${p[1]} L${r1(v[0])} ${r1(v[1])} L${r1(v[0] - 10)} ${base} L${r1(p[0] + 4)} ${base} L${r1(p[0] - 3)} ${r1((p[1] + base) / 2)}Z`} fill="#fff2cc" opacity=".3" />
            <path d={`M${p[0]} ${p[1]} L${r1(p[0] - 3)} ${r1((p[1] + base) / 2)} L${r1(p[0] + 4)} ${base} L${r1(p[0] - 26)} ${base}Z`} fill="#5a2438" opacity=".2" />
          </g>
        );
      })}
      <path d={silueta} fill={`url(#${velo})`} />
    </g>
  );
}

// Tejado de aleros curvos con tejas, canto de remate, cumbrera y borde de luz en la vertiente del sol
function Techo({ cx, y, w, h, cima, relleno = "mrA2teja", tejas = 10, canto = "#ffd9a0", sombraTeja = "#2e1a14" }) {
  const yc = y - h;
  const forma = `M${cx - w / 2} ${y - h * 0.2} Q${cx - w * 0.42} ${y + 1} ${cx - w * 0.3} ${y} L${cx + w * 0.3} ${y} Q${cx + w * 0.42} ${y + 1} ${cx + w / 2} ${y - h * 0.2} Q${cx + w * 0.34} ${y - h * 0.34} ${cx + cima / 2} ${yc} L${cx - cima / 2} ${yc} Q${cx - w * 0.34} ${y - h * 0.34} ${cx - w / 2} ${y - h * 0.2}Z`;
  const alero = `M${cx - w / 2} ${y - h * 0.2} Q${cx - w * 0.42} ${y + 1} ${cx - w * 0.3} ${y} L${cx + w * 0.3} ${y} Q${cx + w * 0.42} ${y + 1} ${cx + w / 2} ${y - h * 0.2}`;
  return (
    <g>
      <path d={alero} transform={`translate(0 ${r1(h * 0.14 + 1)})`} fill="none" stroke="#1e0c08" strokeWidth={r1(h * 0.16 + 1)} opacity=".45" />
      <path d={forma} fill={`url(#${relleno})`} />
      {n(tejas + 1).map((i) => {
        const t = 0.05 + (i / tejas) * 0.9;
        return <path key={i} d={`M${r1(cx - cima / 2 + t * cima)} ${yc} Q${r1(cx - w * 0.33 + t * w * 0.66)} ${r1(y - h * 0.45)} ${r1(cx - w * 0.4 + t * w * 0.8)} ${r1(y - h * 0.06)}`} fill="none" stroke={sombraTeja} strokeWidth=".6" opacity=".5" />;
      })}
      <path d={alero} fill="none" stroke={sombraTeja} strokeWidth={r1(Math.min(2.4, h * 0.2 + 0.6))} strokeDasharray="1.6 1.4" />
      <path d={alero} transform="translate(0 -1)" fill="none" stroke={canto} strokeWidth=".8" opacity=".9" />
      <rect x={cx - cima / 2 - 1.5} y={yc - 2} width={cima + 3} height="2.4" rx="1" fill={sombraTeja} />
      <path d={`M${cx + cima / 2} ${yc} Q${cx + w * 0.34} ${y - h * 0.34} ${cx + w / 2} ${y - h * 0.2}`} fill="none" stroke="#fff0c8" strokeWidth="1.1" opacity=".95" strokeLinecap="round" />
    </g>
  );
}

// Torre de tres aleros de las puertas de Jiayuguan (pie en cx, y)
function TorrePuerta({ cx, y, s = 1 }) {
  return (
    <g>
      {n(3).map((k) => {
        const w = (30 - k * 6) * s;
        const yb = y - k * 12 * s;
        return (
          <g key={k}>
            <rect x={cx - w * 0.36} y={yb - 9 * s} width={w * 0.72} height={9 * s} fill="url(#mrA2laca)" />
            <rect x={cx - w * 0.36} y={yb - 9 * s} width={w * 0.72} height={4 * s} fill="url(#mrA2alero)" />
            {k < 2 && n(3).map((i) => <rect key={i} x={r1(cx - w * 0.28 + i * w * 0.22)} y={yb - 5.5 * s} width={r1(w * 0.12)} height={3.6 * s} fill="#2a0e0a" />)}
            <Techo cx={cx} y={yb - 8 * s} w={w + 14 * s} h={(k === 2 ? 9 : 6) * s} cima={k === 2 ? 4 * s : w * 0.6} tejas={5} />
          </g>
        );
      })}
    </g>
  );
}

// Fuerte de Jiayuguan (嘉峪关): murallas de tierra apisonada con almenas, tres torres y baluarte de esquina
function Fuerte({ x, y }) {
  const almenas = (x1, x2, yy) => <path d={`M${x1} ${yy} H${x2}`} stroke="#b98e62" strokeWidth="4" strokeDasharray="3.2 2.4" />;
  return (
    <g>
      <ellipse cx={x + 60} cy={y + 3} rx="130" ry="7" fill="url(#mrA2sombra)" opacity=".7" />
      {/* muralla exterior baja y recinto interior más alto */}
      <path d={`M${x - 96} ${y} L${x - 92} ${y - 16} H${x + 100} L${x + 104} ${y}Z`} fill="url(#mrA2adobe)" />
      {almenas(x - 92, x + 100, y - 17.6)}
      <path d={`M${x - 60} ${y} L${x - 56} ${y - 32} H${x + 60} L${x + 64} ${y}Z`} fill="url(#mrA2adobe)" />
      <path d={`M${x - 60} ${y} L${x - 56} ${y - 32} H${x + 60} L${x + 64} ${y}Z`} fill="url(#mrA2adobeV)" />
      <path d={`M${x + 34} ${y - 32} H${x + 60} L${x + 64} ${y} H${x + 40}Z`} fill="#ffe2b0" opacity=".35" />
      {almenas(x - 56, x + 60, y - 33.6)}
      <path d={`M${x - 56} ${y - 24} H${x + 60} M${x - 58} ${y - 14} H${x + 62}`} stroke="#8a5c3a" strokeWidth=".6" opacity=".5" />
      {/* arco de la puerta */}
      <path d={`M${x - 5} ${y} v-10 a5 5 0 0 1 10 0 v10Z`} fill="#2a130c" />
      <path d={`M${x - 6.4} ${y} v-10 a6.4 6.4 0 0 1 12.8 0 v10`} fill="none" stroke="#f0d2a0" strokeWidth=".9" opacity=".8" />
      <TorrePuerta cx={x} y={y - 32} s={1.05} />
      <TorrePuerta cx={x - 44} y={y - 32} s={0.74} />
      <TorrePuerta cx={x + 46} y={y - 32} s={0.74} />
      {/* torreones de esquina */}
      {[x - 92, x + 98].map((tx) => (
        <g key={tx}>
          <path d={`M${tx - 8} ${y} L${tx - 6} ${y - 24} H${tx + 6} L${tx + 8} ${y}Z`} fill="url(#mrA2adobe)" />
          <path d={`M${tx - 7} ${y - 25.4} H${tx + 7}`} stroke="#b98e62" strokeWidth="3.4" strokeDasharray="2.6 2" />
          <rect x={tx - 1.4} y={y - 18} width="2.8" height="5" rx="1.4" fill="#2a130c" />
        </g>
      ))}
      {/* mástiles (las banderolas ondean en la capa viva) */}
      <path d={`M${x} ${y - 70} v-16 M${x - 44} ${y - 60} v-12 M${x + 46} ${y - 60} v-12`} stroke="#4a2a18" strokeWidth="1" />
    </g>
  );
}

// Nichos de las cuevas de Mogao: [x, y, ancho]; los marcados con luz se encienden en la capa de luces
const NICHOS = n(34).map((i) => {
  const fila = i % 3;
  const col = Math.floor(i / 3);
  return [8 + col * 17.5 + fila * 6 + azar(i) * 5, 634 + fila * 26 + azar(i * 3) * 6, 6.5 + azar(i * 5) * 4.5];
}).filter(([x]) => x < 196);
// Fachada de nueve pisos (九层楼) adosada al acantilado
function NuevePisos({ cx, y }) {
  return (
    <g>
      <path d={`M${cx - 30} ${y} L${cx - 14} ${y - 132} H${cx + 14} L${cx + 30} ${y}Z`} fill="#e9d3b0" />
      <path d={`M${cx + 6} ${y - 132} H${cx + 14} L${cx + 30} ${y} H${cx + 16}Z`} fill="#fff4d6" opacity=".7" />
      <path d={`M${cx - 30} ${y} L${cx - 14} ${y - 132} H${cx - 6} L${cx - 16} ${y}Z`} fill="#7a4a30" opacity=".35" />
      {n(9).map((k) => {
        const w = 74 - k * 5.4;
        const yb = y - k * 14.2;
        return (
          <g key={k}>
            <rect x={r1(cx - w * 0.3)} y={r1(yb - 9)} width={r1(w * 0.6)} height="9" fill="url(#mrA2laca)" opacity=".92" />
            {k < 8 && n(3).map((i) => <rect key={i} x={r1(cx - w * 0.2 + i * w * 0.16)} y={r1(yb - 6.5)} width={r1(w * 0.08)} height="5" rx="1.4" fill="#2a0e0a" />)}
            <Techo cx={cx} y={r1(yb - 8.4)} w={w} h={6.4} cima={w * 0.56} relleno="mrA2tejaRoja" tejas={8} sombraTeja="#3e0c0a" />
          </g>
        );
      })}
      <Techo cx={cx} y={y - 136} w={34} h={12} cima={5} relleno="mrA2tejaRoja" tejas={5} sombraTeja="#3e0c0a" />
      <path d={`M${cx} ${y - 148} v-9`} stroke="#c8961e" strokeWidth="1.4" /><circle cx={cx} cy={y - 153} r="2" fill="#ffd161" />
    </g>
  );
}

// Mata de hierba seca del desierto (tamarisco)
const Mata = ({ x, y, s = 1, color = "#6e5a2a" }) => (
  <g>
    {n(7).map((i) => <path key={i} d={`M${x} ${y} Q${r1(x + (i - 3) * 2.2 * s)} ${r1(y - 9 * s)} ${r1(x + (i - 3) * 4.6 * s)} ${r1(y - (15 - Math.abs(i - 3) * 2.4) * s)}`} fill="none" stroke={i % 2 ? "#c9a44a" : color} strokeWidth={r1(0.9 * s)} strokeLinecap="round" />)}
  </g>
);

// ---------- trazado de la duna de la caravana: los camellos pisan estos puntos (ver @keyframes a2Camina) ----------
const RUTA_CARAVANA = [[-150, 772], [-50, 764], [50, 754], [150, 750], [250, 757], [350, 768], [450, 773], [550, 765], [650, 754], [750, 750], [850, 757], [950, 766]];

// ---------- piezas vivas (HTML + SVG pequeño) ----------
const NUBES = {
  larga: { caja: [240, 40], bolas: [[14, 30, 9], [36, 26, 13], [62, 22, 16], [92, 20, 17], [124, 22, 16], [156, 24, 15], [186, 27, 12], [212, 31, 9], [230, 34, 6], [108, 30, 13], [76, 31, 12], [140, 32, 11]] },
  jiron: { caja: [160, 24], bolas: [[10, 18, 6], [28, 15, 9], [52, 13, 10], [80, 12, 11], [108, 14, 9], [132, 17, 7], [150, 19, 5]] },
};
function Nube({ tipo, x, y, ancho, deriva = 80, d = 0, opacidad = 1 }) {
  const { caja, bolas } = NUBES[tipo];
  return (
    <div className="a2-nube" style={pos(x, y, ancho, { "--t": `${deriva}s`, "--d": `${d}s`, opacity: opacidad })}>
      <svg viewBox={`0 0 ${caja[0]} ${caja[1]}`}>
        {bolas.map(([bx, by, r], k) => <circle key={`s${k}`} cx={bx - 2} cy={by - 3} r={r} fill="#c9a0b4" opacity=".5" />)}
        {bolas.map(([bx, by, r], k) => <circle key={k} cx={bx} cy={by} r={r} fill="url(#mrA2nube)" />)}
      </svg>
    </div>
  );
}

// ================= PANORAMA =================
export function Panorama() {
  const duna1 = [[-20, 628], [70, 616], [150, 626], [240, 612], [330, 624], [420, 634], [500, 630], [590, 622], [680, 628], [760, 618], [820, 626]];
  const duna2 = [[-20, 690], [60, 676], [140, 684], [230, 700], [320, 706], [400, 696], [470, 676], [540, 664], [610, 672], [690, 690], [760, 696], [820, 688]];
  const duna4 = [[-20, 852], [50, 832], [120, 820], [200, 826], [290, 846], [380, 866], [460, 874], [540, 866], [620, 850], [700, 836], [770, 832], [820, 838]];
  const duna5 = [[-20, 962], [80, 950], [180, 958], [290, 976], [400, 986], [520, 980], [630, 964], [720, 952], [820, 958]];
  return (
    <>
      {/* ---- 1 · soles (alto de día, enorme y bajo al atardecer) y nubes rasgadas ---- */}
      <Vivo plano="mr-lejos" clase="a2-cielo-vivo">
        <div className="a2-sol a2-sol-dia" style={pos(610 - 260, 250 - 260, 520)}>
          <i className="a2-rayos" /><i className="a2-halo" /><i className="a2-disco" />
        </div>
        <div className="a2-sol a2-sol-tarde" style={pos(560 - 330, 578 - 330, 660)}>
          <i className="a2-rayos" /><i className="a2-halo" /><i className="a2-anillo" /><i className="a2-anillo a2-anillo2" /><i className="a2-disco" />
          <i className="a2-calor" style={{ top: "52.4%", "--d": "0s" }} /><i className="a2-calor" style={{ top: "55%", "--d": "-1.3s" }} /><i className="a2-calor" style={{ top: "57.4%", "--d": "-2.1s" }} />
        </div>
        <Nube tipo="larga" x={-30} y={452} ancho={330} deriva={110} d={-30} opacidad={0.9} />
        <Nube tipo="larga" x={420} y={392} ancho={400} deriva={130} d={-70} opacidad={0.92} />
        <Nube tipo="jiron" x={110} y={330} ancho={260} deriva={90} d={-12} opacidad={0.8} />
        <Nube tipo="jiron" x={500} y={250} ancho={220} deriva={100} d={-50} opacidad={0.7} />
        <Nube tipo="jiron" x={250} y={170} ancho={200} deriva={85} d={-33} opacidad={0.55} />
      </Vivo>

      {/* ---- 2 y 3 · montañas arcoíris de Zhangye y primera línea de dunas con el fuerte de Jiayuguan ---- */}
      <Capa clase="mr-lejos">
        <Defs />
        <Entra i={0}>
          <Arcoiris picos={[[-20, 548], [40, 520], [110, 540], [180, 506], [250, 534], [320, 518], [390, 552], [450, 566], [520, 572], [600, 560], [660, 530], [730, 512], [790, 536], [830, 524]]} base={640} relleno="mrA2danxia1" semilla={4} velo="mrA2velo1" />
          <rect x="-10" y="560" width="820" height="70" fill="url(#mrA2calima)" />
          <Arcoiris picos={[[-20, 590], [50, 560], [120, 584], [200, 556], [270, 588], [340, 600], [430, 610], [540, 612], [630, 602], [700, 576], [760, 590], [830, 566]]} base={660} relleno="mrA2danxia2" semilla={11} velo="mrA2velo2" />
          <rect x="-10" y="590" width="820" height="60" fill="url(#mrA2calimaOro)" />
        </Entra>
        <Entra i={1}>
          <Duna pts={duna1} sombra="mrA2d1" luz="mrA2l1" caras={[[1, 2, 34, 30], [3, 5, 46, 34], [7, 8, 30, 24], [9, 10, 30, 26]]} grosor={1} arista="#8a5a4a" />
          <Fuerte x={640} y={632} />
          <rect x="-10" y="632" width="820" height="56" fill="url(#mrA2calima)" />
        </Entra>
      </Capa>

      {/* ---- 4 y 5 · acantilado de Mogao, dunas medias y duna de la caravana ---- */}
      <Capa clase="mr-medio">
        <defs>
          <clipPath id="mrA2clipMogao"><path d="M-10 618 L34 608 L78 616 L130 604 L176 612 L206 606 L296 610 L322 628 L338 668 L346 740 H-10Z" /></clipPath>
        </defs>
        <Entra i={2}>
          <Duna pts={duna2} sombra="mrA2d2" luz="mrA2l2" caras={[[1, 3, 40, 40], [7, 9, 60, 56]]} arista="#6a3c2c" />
          <ellipse cx="640" cy="720" rx="130" ry="26" fill="url(#mrA2luzArena)" opacity=".6" />
          {/* acantilado: roca con estratos, cárcavas, pasarelas de madera y nichos */}
          <path d="M-10 618 L34 608 L78 616 L130 604 L176 612 L206 606 L296 610 L322 628 L338 668 L346 740 H-10Z" fill="url(#mrA2roca)" />
          <g clipPath="url(#mrA2clipMogao)">
            <path d="M-10 630 Q80 622 170 628 T330 632 M-10 658 Q90 652 190 657 T340 664 M-10 686 Q90 680 200 685 T346 694 M-10 712 Q100 707 210 711 T346 720" fill="none" stroke="#6e4028" strokeWidth="1.1" opacity=".5" />
            {n(16).map((i) => <path key={i} d={`M${r1(6 + i * 21 + azar(i) * 9)} ${r1(608 + azar(i * 3) * 8)} q${r1(-3 + azar(i * 5) * 6)} 14 ${r1(azar(i * 7) * 3)} ${r1(24 + azar(i * 9) * 16)}`} fill="none" stroke="#5a3020" strokeWidth={r1(1 + azar(i * 2) * 1.6)} opacity=".28" strokeLinecap="round" />)}
            <path d="M296 610 L322 628 L338 668 L346 740 H318 L312 668 L300 634Z" fill="#fff0c8" opacity=".5" />
            <rect x="-10" y="690" width="360" height="50" fill="url(#mrA2rocaPie)" />
            {NICHOS.map(([x, y, w], i) => (
              <g key={i}>
                <path d={`M${r1(x - 0.8)} ${r1(y + w * 1.5)} V${r1(y + w * 0.5)} a${r1(w / 2 + 0.8)} ${r1(w / 2 + 0.8)} 0 0 1 ${r1(w + 1.6)} 0 V${r1(y + w * 1.5)}Z`} fill="#f2d2a2" opacity=".55" />
                <path d={`M${r1(x)} ${r1(y + w * 1.5)} V${r1(y + w * 0.5)} a${r1(w / 2)} ${r1(w / 2)} 0 0 1 ${r1(w)} 0 V${r1(y + w * 1.5)}Z`} fill="#3a1a10" />
              </g>
            ))}
            {[651, 677, 703].map((y) => (
              <g key={y}>
                <path d={`M-10 ${y} H198`} stroke="#4a2a18" strokeWidth="1.6" />
                <path d={`M-10 ${y - 3.4} H198`} stroke="#6b4423" strokeWidth=".8" />
                <path d={`M-10 ${y - 1.6} H198`} stroke="#4a2a18" strokeWidth="3.4" strokeDasharray=".8 6" />
              </g>
            ))}
          </g>
          <path d="M-10 618 L34 608 L78 616 L130 604 L176 612 L206 606 L296 610 L322 628" fill="none" stroke="#ffeec6" strokeWidth="1.3" opacity=".9" />
          <NuevePisos cx={248} y={738} />
          {/* álamos del desierto al pie del acantilado */}
          {[[20, 738, 13], [58, 742, 16], [104, 740, 12], [150, 744, 15], [196, 742, 11], [300, 744, 14], [330, 742, 10]].map(([x, y, r], k) => (
            <g key={k}>
              <path d={`M${x} ${y + 4} v${-r}`} stroke="#4a2a18" strokeWidth="1.6" />
              <circle cx={x - r * 0.4} cy={y - r * 0.7} r={r * 0.62} fill="url(#mrA2hoja)" /><circle cx={x + r * 0.45} cy={y - r * 0.8} r={r * 0.6} fill="url(#mrA2hoja)" /><circle cx={x} cy={y - r * 1.3} r={r * 0.66} fill="url(#mrA2hoja)" />
            </g>
          ))}
          <rect x="-10" y="716" width="820" height="50" fill="url(#mrA2calimaOro)" />
        </Entra>
      </Capa>
      <Vivo plano="mr-medio" clase="a2-caravana-capa" entra={3}>
        <Caravana />
      </Vivo>
      <Capa clase="mr-medio">
        <Entra i={3}>
          <Duna pts={RUTA_CARAVANA} sombra="mrA2d3" luz="mrA2l3" caras={[[3, 6, 70, 70], [9, 11, 60, 60]]} arista="#5e3018" />
          <path d="M40 800 Q120 786 210 800 M70 822 Q150 810 250 826 M560 800 Q640 786 720 794 M600 822 Q680 808 770 818" fill="none" stroke="#fff0c0" strokeWidth="1" opacity=".5" />
          <ellipse cx="330" cy="822" rx="150" ry="22" fill="url(#mrA2sombra)" opacity=".5" />
          <rect x="-10" y="790" width="820" height="60" fill="url(#mrA2calimaOro)" opacity=".8" />
        </Entra>
      </Capa>

      {/* ---- 6 · duna del oasis de la Luna Creciente (月牙泉) ---- */}
      <Capa clase="mr-cerca">
        <Entra i={4}>
          <Duna pts={duna4} sombra="mrA2d4" luz="mrA2l4" caras={[[2, 5, 80, 90], [10, 11, 70, 70]]} arista="#4e2410" grosor={1.8} />
          {/* rizos del viento en la arena */}
          <path d="M150 850 Q230 838 320 862 M130 874 Q230 862 340 890 M150 900 Q240 890 330 914 M20 880 Q60 872 100 882 M10 906 Q60 896 110 910" fill="none" stroke="#ffe2a0" strokeWidth="1.1" opacity=".55" />
          <path d="M152 853 Q232 841 322 865 M132 877 Q232 865 342 893" fill="none" stroke="#6a3418" strokeWidth=".9" opacity=".3" />
          {/* huellas de la caravana que baja al oasis */}
          <path d="M318 862 Q380 900 470 916" fill="none" stroke="#6a3418" strokeWidth="2.2" strokeDasharray="2 7" strokeLinecap="round" opacity=".45" />
          {/* hondonada y lago en media luna */}
          <ellipse cx="610" cy="922" rx="150" ry="34" fill="url(#mrA2sombra)" opacity=".75" />
          <path d="M484 928 C520 886 664 878 734 912 C690 898 578 902 530 940Z" fill="#3e6a34" />
          <path d="M488 930 C522 892 660 884 728 914 C684 902 580 906 532 942Z" fill="#6fa040" />
          <path d="M486 931 C540 972 700 962 736 914 C690 946 560 952 486 931Z" fill="#8a5a2c" />
          <path d="M492 931 C530 898 660 892 728 915 C692 950 560 956 492 931Z" fill="url(#mrA2agua)" />
          <path d="M520 918 C570 902 660 900 716 914" fill="none" stroke="#e8fff6" strokeWidth="1.4" opacity=".8" />
          <path d="M610 904 L650 904 L640 946 L600 946Z" fill="url(#mrA2reflejo)" opacity=".55" />
          <path d="M530 934 Q600 946 690 934 M560 942 Q620 950 670 942" fill="none" stroke="#d8fbff" strokeWidth="1" opacity=".6" />
          {/* pabellón del manantial (月泉阁) con pagoda */}
          <g>
            <ellipse cx="528" cy="914" rx="46" ry="6" fill="url(#mrA2sombra)" />
            <rect x="506" y="898" width="54" height="16" fill="url(#mrA2laca)" /><rect x="506" y="898" width="54" height="7" fill="url(#mrA2alero)" />
            {n(5).map((i) => <rect key={i} x={509 + i * 10.4} y="903" width="6" height="10" fill="#3a140c" />)}
            <Techo cx={533} y={900} w={78} h={13} cima={40} relleno="mrA2teja" tejas={12} />
            {n(3).map((k) => (
              <g key={k}>
                <rect x={r1(482 - (11 - k * 1.6))} y={r1(900 - k * 15)} width={r1(22 - k * 3.2)} height="14" fill="url(#mrA2laca)" />
                <rect x={r1(482 - 2)} y={r1(904 - k * 15)} width="4" height="6" rx="2" fill="#2a0e0a" />
                <Techo cx={482} y={r1(901 - k * 15)} w={38 - k * 5} h={k === 2 ? 12 : 7} cima={k === 2 ? 3 : 14 - k * 3} tejas={5} />
              </g>
            ))}
            <path d="M482 859 v-8" stroke="#c8961e" strokeWidth="1.2" />
          </g>
          {/* juncos de la orilla */}
          {[[556, 944], [590, 950], [700, 932], [722, 926], [500, 934]].map(([x, y], k) => <Mata key={k} x={x} y={y} s={0.9} color="#3e6a34" />)}
          <Mata x={60} y={846} s={1.2} /><Mata x={214} y={838} s={0.9} /><Mata x={410} y={880} s={0.8} /><Mata x={770} y={846} s={1.1} />
        </Entra>
      </Capa>
      <Vivo plano="mr-cerca" entra={4}>
        <Oasis />
      </Vivo>

      {/* ---- 7 · primer plano que enmarca: duna oscura, álamo dorado (胡杨) a la izquierda y toldo del bazar a la derecha ---- */}
      <Capa clase="mr-cerca">
        <Entra i={5}>
          <Duna pts={duna5} sombra="mrA2d5" luz="mrA2l5" caras={[[1, 3, 60, 40], [7, 8, 50, 36]]} filo="#ffd28a" arista="#2e1408" grosor={2} />
          <Mata x={250} y={978} s={1.5} color="#4a3a18" /><Mata x={560} y={980} s={1.3} color="#4a3a18" />
          {/* álamo del desierto: tronco retorcido y copa dorada con masa y claroscuro */}
          <g>
            <path d="M-10 1010 C6 950 0 900 22 860 C30 842 44 830 60 818 L68 826 C54 842 46 856 42 876 C36 916 44 960 40 1010Z" fill="url(#mrA2tronco)" />
            <path d="M34 862 C52 850 78 848 98 836 L100 842 C82 856 58 862 40 876Z" fill="url(#mrA2tronco)" />
            <path d="M20 880 Q30 920 26 980 M32 870 Q40 910 36 960" fill="none" stroke="#2a180c" strokeWidth="1.2" opacity=".5" />
            {[[8, 800, 34], [52, 778, 38], [98, 806, 30], [-6, 846, 28], [128, 836, 22], [30, 826, 30], [82, 842, 22], [64, 744, 26], [112, 772, 22], [16, 760, 26]].map(([x, y, r], k) => <circle key={`s${k}`} cx={x - 5} cy={y + 6} r={r} fill="#6e3a12" opacity=".8" />)}
            {[[8, 800, 34], [52, 778, 38], [98, 806, 30], [-6, 846, 28], [128, 836, 22], [30, 826, 30], [82, 842, 22], [64, 744, 26], [112, 772, 22], [16, 760, 26]].map(([x, y, r], k) => <circle key={k} cx={x} cy={y} r={r} fill="url(#mrA2hoja)" />)}
            {n(26).map((i) => <circle key={`h${i}`} cx={r1(-6 + azar(i) * 150)} cy={r1(730 + azar(i * 3) * 130)} r={r1(2 + azar(i * 7) * 2.4)} fill={i % 3 ? "#ffe27a" : "#b8641a"} opacity=".75" />)}
          </g>
          {/* puesto del bazar: poste, toldo de seda con flecos, rollos de seda y ánforas */}
          <g>
            <path d="M776 720 L784 720 L788 1010 L774 1010Z" fill="url(#mrA2tronco)" />
            <path d="M676 772 C716 748 760 728 810 708 V690 C770 698 720 716 680 744Z" fill="#3e0810" />
            <path d="M672 770 C712 742 760 718 810 700 V668 C762 680 716 704 676 738Z" fill="url(#mrA2toldo)" />
            <path d="M700 722 L716 748 M732 704 L748 730 M764 690 L780 716 M794 678 L810 702" stroke="#f2c14e" strokeWidth="5" opacity=".9" />
            <path d="M676 738 C716 704 762 680 810 668" fill="none" stroke="#ffb07a" strokeWidth="1.4" />
            <path d="M672 770 C712 742 760 718 810 700" fill="none" stroke="#f2c14e" strokeWidth="2.4" />
            {n(9).map((i) => {
              const t = i / 8;
              const x = 674 + t * 134;
              const y = 771 - t * 68 - Math.sin(t * Math.PI) * 4;
              return <g key={i}><path d={`M${r1(x)} ${r1(y)} v9`} stroke="#f2c14e" strokeWidth="1" /><circle cx={r1(x)} cy={r1(y + 10.4)} r="1.9" fill="#c8102e" /></g>;
            })}
            {/* mostrador con rollos de seda y montones de especias */}
            <path d="M700 962 H810 V1010 H696Z" fill="#5a3018" /><path d="M698 958 H810 V966 H696Z" fill="#c99a62" />
            {[["#c8102e", 712], ["#1f8aa0", 730], ["#f2c14e", 748], ["#7a3a9a", 766]].map(([c, x]) => (
              <g key={x}><rect x={x} y="930" width="15" height="29" rx="7" fill={c} /><rect x={x + 9} y="930" width="6" height="29" rx="3" fill="#fff" opacity=".28" /><ellipse cx={x + 7.5} cy="931" rx="7.5" ry="3" fill="#fff" opacity=".35" /></g>
            ))}
            <path d="M782 958 q8 -16 16 0Z" fill="#e08a1a" /><path d="M794 958 q8 -13 16 0Z" fill="#b8321e" />
            <path d="M724 1010 C716 996 718 982 728 978 L726 972 H742 L740 978 C750 982 752 996 744 1010Z" fill="#a8602a" />
            <path d="M738 980 C746 986 746 998 742 1008" fill="none" stroke="#f2c890" strokeWidth="1.4" opacity=".8" />
          </g>
        </Entra>
      </Capa>
    </>
  );
}

// Provisional (se pintan en el siguiente paso)
function Caravana() {
  return null;
}
function Oasis() {
  return null;
}

export function Ambiente() {
  return <div className="mr-particulas a2-ambiente" />;
}

// Viñetas a los lados del camino (200 × 240) — provisional
export const VINETAS = [
  () => (
    <Vin>
      <path d="M0 240 V200 C60 170 130 168 200 196 V240Z" fill="url(#mrA2d3)" />
    </Vin>
  ),
];
