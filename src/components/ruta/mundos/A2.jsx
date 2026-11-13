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
      {lin("mrA2velo1", [[0, "#ffe9d2", 0.22], [1, "#ffe6c0", 0.78]], us(440, 640))}
      {lin("mrA2velo2", [[0, "#fff1d2", 0], [1, "#ffe6bc", 0.6]], us(520, 660))}
      {/* dunas: sombra malva-tostada en la cresta que se funde con la calima de su base; cara al sol dorada */}
      {lin("mrA2d1", [[0, "#c99c84"], [0.5, "#e2bf96"], [1, "#f8e4bc"]], us(600, 690))}
      {lin("mrA2l1", [[0, "#fff6da", 0.95], [1, "#fff0c8", 0]], us(600, 672))}
      {lin("mrA2d2", [[0, "#a8704e"], [0.5, "#d0a070"], [1, "#f4d8a4"]], us(650, 770))}
      {lin("mrA2l2", [[0, "#ffedbc", 1], [0.7, "#ffe2a4", 0.45], [1, "#ffe2a4", 0]], us(650, 750))}
      {lin("mrA2d3", [[0, "#96583a"], [0.45, "#c48a52"], [1, "#efc98c"]], us(745, 880))}
      {lin("mrA2l3", [[0, "#ffe6a6", 1], [0.7, "#ffd78a", 0.5], [1, "#ffd78a", 0]], us(745, 860))}
      {lin("mrA2d4", [[0, "#814526"], [0.4, "#b67640"], [1, "#e3b06a"]], us(815, 990))}
      {lin("mrA2l4", [[0, "#ffdf96", 1], [0.65, "#f9c56e", 0.55], [1, "#f9c56e", 0]], us(815, 960))}
      {lin("mrA2d5", [[0, "#4e2410"], [0.5, "#7c421e"], [1, "#b06a30"]], us(940, 1010))}
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
            {lin("mrA2seda", [[0, "#8f0c21"], [0.5, "#d8263a"], [1, "#ff7a5c"]], H)}
      {lin("mrA2vArena", [[0, "#f3c784"], [1, "#c08446"]])}
      {lin("mrA2vArenaLejos", [[0, "#e9c69a"], [1, "#f6dcae"]])}
      {lin("mrA2barro", [[0, "#6e4630"], [0.5, "#b48660"], [1, "#e6c29a"]], H)}
      {lin("mrA2ladrillo", [[0, "#8a5a3c"], [0.5, "#c9966a"], [1, "#f0cc9c"]], H)}
      {lin("mrA2calimaVin", [[0, "#ffe9c4", 0.1], [1, "#ffe9c4", 0.85]])}
      <linearGradient id="mrA2danxiaVin" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="20" y2="48" spreadMethod="repeat">
        {["#c9604a", "#f3c98a", "#e08a52", "#8fb0a2", "#f8e2b0", "#b8473a"].flatMap((c, k) => [<stop key={`a${k}`} offset={k / 6} stopColor={c} />, <stop key={`b${k}`} offset={(k + 0.82) / 6} stopColor={c} />])}
      </linearGradient>
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
      <radialGradient id="mrA2bloomLuna">
        <stop offset="0" stopColor="#dfe6ff" stopOpacity=".5" /><stop offset=".5" stopColor="#b8c6ff" stopOpacity=".16" /><stop offset="1" stopColor="#b8c6ff" stopOpacity="0" />
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

// Copa del álamo dorado: racimos de hojas con azar determinista dentro de una mancha irregular
const COPA = n(46).map((i) => {
  const ang = azar(i * 3) * Math.PI * 2;
  const dist = Math.sqrt(azar(i * 7));
  return [r1(48 + Math.cos(ang) * dist * 84), r1(796 + Math.sin(ang) * dist * 62 - Math.cos(ang) * dist * 14), r1(9 + azar(i * 11) * 13)];
}).sort((a, b) => b[1] - a[1]);

// ---------- trazado de la duna de la caravana: los camellos pisan estos puntos (ver @keyframes a2Camina) ----------
const RUTA_CARAVANA = [[-150, 772], [-50, 764], [50, 754], [150, 750], [250, 757], [350, 768], [450, 773], [550, 765], [650, 754], [750, 750], [850, 757], [950, 766]];

// ---------- piezas vivas (HTML + SVG pequeño) ----------
// Nube rasgada del desierto: vetas pintadas con degradados CSS (sin SVG), iluminadas desde abajo por el sol bajo
const Nube = ({ x, y, ancho, deriva = 80, d = 0, opacidad = 1, fina = false }) => (
  <div className={`a2-nube ${fina ? "a2-nube-fina" : ""}`} style={pos(x, y, ancho, { "--t": `${deriva}s`, "--d": `${d}s`, opacity: opacidad })} />
);

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
        <div className="a2-sol a2-sol-tarde" style={pos(530 - 330, 536 - 330, 660)}>
          <i className="a2-rayos" /><i className="a2-halo" /><i className="a2-anillo" /><i className="a2-anillo a2-anillo2" /><i className="a2-disco" />
        </div>
        <Nube x={-30} y={452} ancho={330} deriva={110} d={-30} opacidad={0.9} />
        <Nube x={420} y={392} ancho={400} deriva={130} d={-70} opacidad={0.92} />
        <Nube fina x={110} y={330} ancho={260} deriva={90} d={-12} opacidad={0.8} />
        <Nube fina x={500} y={250} ancho={220} deriva={100} d={-50} opacidad={0.7} />
        <Nube fina x={250} y={170} ancho={200} deriva={85} d={-33} opacidad={0.55} />
      </Vivo>

      {/* ---- 2 y 3 · montañas arcoíris de Zhangye y primera línea de dunas con el fuerte de Jiayuguan ---- */}
      <Capa clase="mr-lejos">
        <Defs />
        <Entra i={0}>
          <Arcoiris picos={[[-20, 500], [40, 462], [110, 492], [180, 440], [250, 484], [320, 468], [390, 520], [450, 548], [520, 560], [600, 544], [660, 492], [730, 452], [790, 486], [830, 470]]} base={640} relleno="mrA2danxia1" semilla={4} velo="mrA2velo1" />
          <rect x="-10" y="560" width="820" height="70" fill="url(#mrA2calima)" />
          <Arcoiris picos={[[-20, 566], [50, 530], [120, 560], [200, 524], [270, 566], [340, 586], [430, 602], [540, 606], [630, 590], [700, 548], [760, 570], [830, 536]]} base={660} relleno="mrA2danxia2" semilla={11} velo="mrA2velo2" />
          <rect x="-10" y="590" width="820" height="60" fill="url(#mrA2calimaOro)" />
        </Entra>
        <Entra i={1}>
          <Duna pts={duna1} sombra="mrA2d1" luz="mrA2l1" caras={[[1, 2, 34, 30], [3, 5, 46, 34], [7, 8, 30, 24], [9, 10, 30, 26]]} grosor={1} arista="#8a5a4a" />
          <Fuerte x={640} y={632} />
          <rect x="-10" y="632" width="820" height="56" fill="url(#mrA2calima)" />
        </Entra>
      </Capa>

      <Vivo plano="mr-lejos" entra={1}>
        <Banderola x={640} y={545} ancho={17} />
        <Banderola x={596} y={559} ancho={13} d={-0.7} color="#f2c14e" />
        <Banderola x={686} y={559} ancho={13} d={-1.3} />
        <Rafaga x={240} y={612} ancho={70} d={-2} t={11} />
      </Vivo>

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
        <Rafaga x={540} y={664} ancho={110} d={-5} t={10} />
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
      <Vivo plano="mr-medio" entra={3}>
        <Rafaga x={150} y={750} ancho={120} d={0} t={9} />
        <Rafaga x={750} y={750} ancho={110} d={-4} t={12} />
        <i className="a2-bruma b1" /><i className="a2-bruma b2" />
      </Vivo>
      <Vivo plano="mr-cerca" entra={4}>
        <Rafaga x={120} y={820} ancho={150} d={-6} t={8} />
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
            {COPA.map(([x, y, r], k) => <circle key={`s${k}`} cx={r1(x - r * 0.22)} cy={r1(y + r * 0.3)} r={r} fill="#5e3010" opacity=".85" />)}
            {COPA.map(([x, y, r], k) => <circle key={k} cx={x} cy={y} r={r} fill="url(#mrA2hoja)" />)}
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

      {/* ---- textura de papel y viñeteado; tintes de atardecer y de noche (multiply) ---- */}
      <div className="a2-grano" />
      <div className="a2-tinte a2-t-atardecer" />
      <div className="a2-tinte a2-t-noche" />

      {/* ---- por encima de los tintes: resplandor del sol poniente y luces ---- */}
      <Vivo plano="mr-lejos" clase="a2-encima">
        <i className="a2-resplandor" style={pos(530 - 420, 536 - 300, 840)} />
        <i className="a2-haz" style={pos(530 - 360, 536 - 360, 720)} />
        {/* disco del sol poniente por encima del tinte, cortado en la línea de las montañas, con ondas de calor */}
        <i className="a2-disco-tarde" style={pos(530 - 84, 536 - 84, 168)} />
        <i className="a2-calor" style={pos(476, 522, 108, { "--d": "0s" })} /><i className="a2-calor" style={pos(470, 531, 120, { "--d": "-1.3s" })} /><i className="a2-calor" style={pos(466, 540, 128, { "--d": "-2.1s" })} />
      </Vivo>
      <Capa clase="mr-lejos a2-luces">
        <g className="a2-luz">
          <ellipse cx="640" cy="596" rx="80" ry="26" fill="url(#mrA2bloom)" opacity=".5" />
          {[[640, 594, 1.05], [596, 596, 0.74], [686, 596, 0.74]].flatMap(([cx, y, s]) => n(3).map((i) => <rect key={`${cx}-${i}`} x={r1(cx - 30 * s * 0.28 + i * 30 * s * 0.22)} y={r1(y)} width={r1(30 * s * 0.12)} height={r1(3.6 * s)} fill="#ffe08a" />))}
          <path d="M635 632 v-10 a5 5 0 0 1 10 0 v10Z" fill="#ffb84a" /><circle cx="640" cy="624" r="12" fill="url(#mrA2bloom)" opacity=".8" />
          {n(9).map((i) => <circle key={i} cx={548 + i * 23.4} cy="613" r="5" fill="url(#mrA2bloom)" opacity=".8" />)}
        </g>
      </Capa>
      <Capa clase="mr-medio a2-luces">
        <g className="a2-luz">
          {NICHOS.filter((_, i) => i % 3 !== 1).map(([x, y, w], i) => (
            <g key={i}>
              <circle cx={r1(x + w / 2)} cy={r1(y + w)} r={r1(w * 1.5)} fill="url(#mrA2bloom)" opacity=".75" />
              <path d={`M${r1(x + 1)} ${r1(y + w * 1.5)} V${r1(y + w * 0.6)} a${r1(w / 2 - 1)} ${r1(w / 2 - 1)} 0 0 1 ${r1(w - 2)} 0 V${r1(y + w * 1.5)}Z`} fill="#ffc45a" />
            </g>
          ))}
          <ellipse cx="248" cy="676" rx="50" ry="74" fill="url(#mrA2bloom)" opacity=".4" />
          {n(8).flatMap((k) => n(3).map((i) => {
            const w = 74 - k * 5.4;
            return <rect key={`${k}-${i}`} x={r1(248 - w * 0.2 + i * w * 0.16)} y={r1(738 - k * 14.2 - 6.5)} width={r1(w * 0.08)} height="5" rx="1.4" fill="#ffe08a" />;
          }))}
        </g>
      </Capa>
      <Vivo plano="mr-medio" clase="a2-luces">
        <div className="a2-luz"><Caravana luces /></div>
      </Vivo>
      <Capa clase="mr-cerca a2-luces">
        <g className="a2-luz">
          <ellipse cx="533" cy="906" rx="56" ry="20" fill="url(#mrA2bloom)" opacity=".55" />
          {n(5).map((i) => <rect key={i} x={509 + i * 10.4} y="903" width="6" height="10" fill="#ffd27a" opacity=".9" />)}
          {n(3).map((k) => <rect key={k} x="480" y={r1(904 - k * 15)} width="4" height="6" rx="2" fill="#ffe08a" />)}
          <ellipse cx="548" cy="932" rx="40" ry="6" fill="url(#mrA2bloom)" opacity=".4" />
          <ellipse cx="445" cy="946" rx="70" ry="16" fill="url(#mrA2bloom)" opacity=".7" />
        </g>
        {/* reflejo de la luna en el lago (solo de noche) */}
        <g className="a2-luz-luna">
          <path d="M632 906 L648 906 L644 946 L636 946Z" fill="url(#mrA2reflejo)" opacity=".6" />
          <path d="M630 918 h20 M634 928 h13 M636 937 h9" stroke="#fff" strokeWidth=".9" strokeLinecap="round" opacity=".6" />
        </g>
      </Capa>
      <Vivo plano="mr-cerca" clase="a2-delante" entra={5}>
        <div className="a2-hoguera" style={pos(432, 916, 26)}>
          <i className="a2-llama" /><i className="a2-llama a2-llama-b" />
          {n(6).map((i) => <i key={i} className="a2-chispa" style={{ "--d": `${-i * 0.5}s`, "--x": `${(i % 3) - 1}` }} />)}
        </div>
        <Farol x={704} y={752} ancho={22} cuerda={10} t={5.4} />
        <Farol x={746} y={730} ancho={28} cuerda={16} d={-2} t={4.6} />
        <Farol x={786} y={712} ancho={24} cuerda={12} d={-1.2} t={6} />
      </Vivo>
    </>
  );
}

// ---------- camello bactriano pintado (viewBox 100×80, pies en y = 78, mira a la derecha) ----------
const PATA = (x) => `M${x - 3.2} 48 L${x + 3.2} 48 L${x + 1.9} 63 L${x + 2.1} 75 L${x + 3.8} 78 L${x - 1.6} 78 L${x - 1.3} 63Z`;
function Camello({ carga = "fardos", ...attrs }) {
  const piel = "url(#mrA2camello)";
  return (
    <svg viewBox="0 0 100 80" className="a2-camello-svg" overflow="visible" {...attrs}>
      <ellipse cx="40" cy="78.6" rx="38" ry="2.2" fill="#3a1608" opacity=".4" />
      {/* patas del lado lejano (más oscuras) */}
      <path className="a2-pata a2-pata-b" d={PATA(25)} fill="#4a2810" />
      <path className="a2-pata" d={PATA(67)} fill="#4a2810" />
      <g className="a2-cuerpo">
        <path d="M12 42 C8 46 8 54 10 59 l1.6 0 C10.6 54 11.4 48 13.4 46Z" fill="#4a2810" />
        <path d="M12 44 C10 34 16 28 24 28 C26 16 32 10 37 12 C42 14 43 24 46 27 C48 16 54 8 60 11 C65 14 66 24 70 30 C76 34 76 44 72 50 C66 56 52 58 40 57 C28 58 16 54 12 44Z" fill={piel} />
        <path d="M24 28 C26 16 32 10 37 12 C42 14 43 24 46 27 C48 16 54 8 60 11 C65 14 66 24 70 30" fill="none" stroke="#ffe2b0" strokeWidth="1.1" opacity=".9" />
        <path d="M16 50 C28 57 54 58 70 51 C62 60 26 60 16 50Z" fill="#3a1c0a" opacity=".45" />
        {/* cuello y cabeza con vaivén */}
        <g className="a2-cuello">
          <path d="M72 50 C76 48 82 40 84 30 l-2 8 l1 -1 l-3 8 l1 0 l-4 8Z" fill="#4a2810" />
          <path d="M66 44 C72 46 78 40 80 30 C81 24 82 18 84 15 C86 11 91 10 95 12 C98 13 99 16 98 18 L93 19.5 C90 20 88 22 87.5 26 C86 36 82 50 72 52 C68 52 66 48 66 44Z" fill={piel} />
          <path d="M85 12 l-1.5 -4 l3 2Z" fill="#4a2810" /><circle cx="92.4" cy="14.4" r=".9" fill="#1e0c04" />
          <path d="M84 15 C86 11 91 10 95 12" fill="none" stroke="#ffe2b0" strokeWidth=".9" />
        </g>
        {/* montura de seda con cenefa dorada y carga */}
        <path d="M37 24 C42 29 48 29 52 24 L56 44 C48 48 40 48 33 44Z" fill="url(#mrA2seda)" />
        <path d="M33 44 C40 48 48 48 56 44" fill="none" stroke="#f2c14e" strokeWidth="1.6" />
        <path d="M37 24 C42 29 48 29 52 24" fill="none" stroke="#f2c14e" strokeWidth="1" />
        {carga === "fardos" && (
          <g>
            <rect x="29" y="30" width="13" height="16" rx="4" fill="#c99a62" /><rect x="29" y="30" width="13" height="16" rx="4" fill="url(#mrA2alero)" opacity=".5" transform="rotate(180 35.5 38)" />
            <path d="M29 36 h13 M29 41 h13" stroke="#6b4423" strokeWidth=".8" />
            <rect x="46" y="29" width="14" height="8" rx="4" fill="#1f8aa0" /><rect x="46" y="38" width="14" height="8" rx="4" fill="#f2c14e" /><rect x="47" y="30" width="12" height="2" rx="1" fill="#fff" opacity=".4" />
          </g>
        )}
        {carga === "jinete" && (
          <g>
            <path d="M40 26 C39 16 43 10 47 10 C51 10 54 16 53 26 L56 40 L50 42 L46 30 L42 42 L37 40Z" fill="#1f5a7a" />
            <path d="M47 10 C51 10 54 16 53 26 L56 40 L53 41 L50 26 C50 18 49 13 47 10Z" fill="#6fb6c8" opacity=".6" />
            <circle cx="47.4" cy="6.4" r="3.6" fill="#e9bf96" />
            <path d="M39.4 5 L47.4 -1.6 L55.6 5 Q47.4 7.4 39.4 5Z" fill="#e9c46a" /><path d="M47.4 -1.6 L55.6 5 Q51 6.2 47.4 6.2Z" fill="#fff0b0" opacity=".7" />
          </g>
        )}
        {/* borlas que se balancean */}
        <g className="a2-borla"><path d="M34 44 v7" stroke="#f2c14e" strokeWidth=".8" /><circle cx="34" cy="52.4" r="1.9" fill="#c8102e" /></g>
        <g className="a2-borla a2-borla-b"><path d="M55 44 v7" stroke="#f2c14e" strokeWidth=".8" /><circle cx="55" cy="52.4" r="1.9" fill="#c8102e" /></g>
        {/* farolillo de viaje (se enciende en la capa de luces) */}
        <path d="M61 30 v6" stroke="#3b2416" strokeWidth=".7" /><rect x="59" y="36" width="4.4" height="6" rx="1.6" fill="#b8321e" />
      </g>
      {/* patas del lado cercano */}
      <path className="a2-pata" d={PATA(20)} fill={piel} />
      <path className="a2-pata a2-pata-b" d={PATA(63)} fill={piel} />
    </svg>
  );
}
// Caravana: cada camello recorre la cresta con el mismo recorrido y un desfase; luces = solo los faroles (capa sobre el tinte)
const CAMELLOS = [["jinete", 0], ["fardos", 9.2], ["fardos", 18.4], ["jinete", 27.6], ["fardos", 36.8]];
// altura de la cresta en x (interpolación lineal entre los puntos, igual que los fotogramas clave)
const yRuta = (x) => {
  const k = Math.min(RUTA_CARAVANA.length - 2, Math.max(0, Math.floor((x + 150) / 100)));
  const [x0, y0] = RUTA_CARAVANA[k];
  return r1(y0 + ((RUTA_CARAVANA[k + 1][1] - y0) * (x - x0)) / 100 + 3);
};
function Caravana({ luces = false }) {
  return CAMELLOS.map(([carga, retraso], k) => (
    <div key={k} className="a2-camello" style={{ "--d": `${-52 + retraso}s`, "--p": `${-k * 0.37}s`, "--rx": 322 - k * 84, "--ry": yRuta(322 - k * 84) }}>
      {luces ? (
        <i className="a2-farolillo" />
      ) : (
        <>
          <i className="a2-polvo" /><i className="a2-polvo a2-polvo-b" />
          <Camello carga={carga} />
        </>
      )}
    </div>
  ));
}

// Palmera datilera (dibujo en 100×150, pie en 50,148): tronco anillado, hojas con nervio de luz y racimos de dátiles
const hojaPalma = (ang, largo, caida) => {
  const c = [58, 44];
  const r = (ang * Math.PI) / 180;
  const tx = c[0] + Math.cos(r) * largo;
  const ty = c[1] + Math.sin(r) * largo * 0.55 + caida;
  const mx = c[0] + Math.cos(r) * largo * 0.5;
  const my = c[1] + Math.sin(r) * largo * 0.55 - 15;
  return { forma: `M${c[0]} ${c[1]} Q${r1(mx)} ${r1(my)} ${r1(tx)} ${r1(ty)} Q${r1(mx + 2)} ${r1(my + 11)} ${c[0]} ${c[1] + 3}Z`, nervio: `M${c[0]} ${c[1]} Q${r1(mx)} ${r1(my + 1)} ${r1(tx)} ${r1(ty)}` };
};
const HOJAS_DETRAS = [[-160, 44, 16], [-120, 40, 2], [-70, 40, -2], [-25, 44, 10], [190, 40, 26]].map(([a, l, k]) => hojaPalma(a, l, k));
const HOJAS_DELANTE = [[-145, 46, 10], [-98, 44, -2], [-48, 46, 2], [-8, 46, 16], [165, 44, 22], [18, 40, 26]].map(([a, l, k]) => hojaPalma(a, l, k));
const PalmaDibujo = () => (
  <>
    <ellipse cx="36" cy="148" rx="30" ry="3.4" fill="#3a1608" opacity=".35" />
    <path d="M45 148 C47 112 51 80 56 46 L62 47 C58 82 56 112 56 148Z" fill="url(#mrA2tronco)" />
    {n(10).map((i) => <path key={i} d={`M${r1(45.6 + i * 1.08)} ${138 - i * 9.4} l${r1(10 - i * 0.4)} 1.4`} stroke="#2a180c" strokeWidth="1" opacity=".55" />)}
    <g className="a2-copa">
      {HOJAS_DETRAS.map((h, i) => <path key={i} d={h.forma} fill="#1c4426" />)}
      <circle cx="54" cy="50" r="3.4" fill="#e08a1a" /><circle cx="59" cy="52" r="3.6" fill="#f2a83a" /><circle cx="63" cy="49" r="3" fill="#c96a14" />
      {HOJAS_DELANTE.map((h, i) => (
        <g key={i}>
          <path d={h.forma} fill={i > 1 && i < 4 ? "#5fa644" : "#357a38"} />
          <path d={h.nervio} fill="none" stroke="#c8e88a" strokeWidth=".9" opacity=".8" />
        </g>
      ))}
    </g>
  </>
);
// Palmera viva del panorama: se mece desde la base y la copa cabecea
function Palma({ x, y, alto = 90, d = 0, t = 6, espejo = false }) {
  const ancho = alto * 0.72;
  return (
    <div className="a2-palma" style={pos(x - ancho / 2, y - alto, ancho, { "--d": `${d}s`, "--t": `${t}s`, scale: espejo ? "-1 1" : undefined })}>
      <svg viewBox="0 0 100 150"><PalmaDibujo /></svg>
    </div>
  );
}
const Destello = ({ x, y, tam = 12, d = 0, t = 4 }) => <span className="a2-destello" style={pos(x - tam / 2, y - tam * 0.4, tam, { "--d": `${d}s`, "--t": `${t}s` })} />;
const Banderola = ({ x, y, ancho = 18, d = 0, color = "#d81f2e" }) => (
  <div className="a2-banderola" style={pos(x, y, ancho, { "--d": `${d}s` })}>
    <svg viewBox="0 0 30 16">
      <path d="M0 1 C9 -1 16 5 29 2 C20 6 22 10 28 13 C17 14 9 10 0 13Z" fill={color} />
      <path d="M0 1 C9 -1 16 5 29 2" fill="none" stroke="#ffd9a0" strokeWidth="1.2" opacity=".8" />
    </svg>
  </div>
);
// Ráfaga de arena que se desprende de una cresta (el viento sopla hacia la derecha)
const Rafaga = ({ x, y, ancho = 90, d = 0, t = 9 }) => <i className="a2-rafaga" style={pos(x, y - ancho * 0.16, ancho, { "--d": `${d}s`, "--t": `${t}s` })} />;
// Farol de seda que cuelga del toldo (va por encima del tinte: de noche es una luz)
function Farol({ x, y, ancho = 26, cuerda = 14, d = 0, t = 5 }) {
  return (
    <div className="a2-farol" style={pos(x - ancho / 2, y, ancho, { "--d": `${d}s`, "--t": `${t}s` })}>
      <svg viewBox={`0 0 30 ${cuerda + 52}`}>
        <circle className="a2-brillo" cx="15" cy={cuerda + 17} r="15" fill="url(#mrA2bloom)" transform={`translate(15 ${cuerda + 17}) scale(2.3) translate(-15 ${-(cuerda + 17)})`} />
        <path d={`M15 0 V${cuerda}`} stroke="#3b2416" strokeWidth="1" />
        <rect x="10" y={cuerda} width="10" height="4" rx="1" fill="#f2c14e" />
        <ellipse cx="15" cy={cuerda + 17} rx="12" ry="13.4" fill="url(#mrA2farol)" />
        <path d={`M15 ${cuerda + 4} V${cuerda + 30} M9 ${cuerda + 5.5} Q5 ${cuerda + 17} 9 ${cuerda + 28.5} M21 ${cuerda + 5.5} Q25 ${cuerda + 17} 21 ${cuerda + 28.5}`} fill="none" stroke="#ffc35c" strokeWidth=".8" opacity=".7" />
        <ellipse className="a2-brillo" cx="15" cy={cuerda + 17} rx="8" ry="10" fill="#ffe08a" opacity=".85" />
        <rect x="10" y={cuerda + 30} width="10" height="3.6" rx="1" fill="#f2c14e" />
        <path d={`M13 ${cuerda + 33} V${cuerda + 47} M15 ${cuerda + 33} V${cuerda + 50} M17 ${cuerda + 33} V${cuerda + 47}`} stroke="#c8102e" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// Vida del oasis: palmeras, destellos y ondas del agua, leños de la hoguera
function Oasis() {
  return (
    <>
      <Palma x={462} y={930} alto={104} d={-1} t={6.4} espejo />
      <Palma x={716} y={922} alto={112} d={-3} t={7} />
      <Palma x={744} y={934} alto={78} d={-2} t={5.6} />
      <Palma x={574} y={900} alto={62} d={-4} t={6} espejo />
      <Palma x={690} y={908} alto={70} d={-0.5} t={5.2} espejo />
      <i className="a2-onda" style={pos(560, 926, 90, { "--d": "0s" })} /><i className="a2-onda" style={pos(600, 938, 70, { "--d": "-1.6s" })} /><i className="a2-onda" style={pos(640, 918, 60, { "--d": "-2.7s" })} />
      <Destello x={628} y={912} tam={13} t={4.4} /><Destello x={580} y={930} tam={10} d={-1.8} t={5.2} /><Destello x={676} y={924} tam={11} d={-3} t={4.8} /><Destello x={540} y={920} tam={9} d={-2.4} t={6} />
      <div className="a2-lenos" style={pos(432, 944, 26)}>
        <svg viewBox="0 0 26 10"><ellipse cx="13" cy="8" rx="13" ry="2.4" fill="#3a1608" opacity=".4" /><path d="M2 8 L20 2 L22 4.4 L4 10Z" fill="#4a2a18" /><path d="M24 8 L6 2 L4 4.4 L22 10Z" fill="#6b4423" /><circle cx="2" cy="8.6" r="1.6" fill="#8a7a6a" /><circle cx="24" cy="8.8" r="1.8" fill="#a8988a" /></svg>
      </div>
    </>
  );
}

// ================= AMBIENTE (por encima de los tintes) =================
const Cometa = ({ x, y, ancho = 34, color = "#d81f2e", claro = "#ff8a6a", d = 0, clase = "", estilo }) => (
  <div className={`a2-cometa ${clase}`} style={{ ...(x != null ? pos(x, y, ancho) : {}), "--d": `${d}s`, "--c": color, ...estilo }}>
    <svg viewBox="0 0 40 52">
      <path d="M20 1 L38 22 L20 50 L2 22Z" fill={color} />
      <path d="M20 1 L38 22 L20 50Z" fill={claro} />
      <path d="M20 1 V50 M2 22 H38" stroke="#f2c14e" strokeWidth="1.2" />
      <path d="M20 1 L38 22 L20 50 L2 22Z" fill="none" stroke="#f2c14e" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="20" cy="22" r="4" fill="#f2c14e" />
    </svg>
    {/* cola de lazos encadenados: cada eslabón gira con retraso → serpentea */}
    <i className="a2-cola" style={{ "--k": 0 }}><i style={{ "--k": 1 }}><i style={{ "--k": 2 }}><i style={{ "--k": 3 }}><i style={{ "--k": 4 }} /></i></i></i></i>
  </div>
);
const SEDAS = ["#d81f2e", "#f2c14e", "#1f8aa0", "#7a3a9a", "#ff7a5c", "#2f9a55"];

export function Ambiente({ fiesta }) {
  return (
    <div className="mr-particulas a2-ambiente">
      <div className="mr-capa a2-vivo">
        <div className="a2-lienzo">
          {/* noche: Vía Láctea, estrellas, estrellas fugaces y luna creciente sobre el oasis */}
          <div className="a2-noche-cielo">
            <i className="a2-via" />
            {n(64).map((i) => {
              const tam = 1.2 + azar(i * 7) * 2.2;
              return <i key={i} className="a2-estrella" style={pos(azar(i) * 800, azar(i * 3) * 430, tam, { "--d": `${-azar(i * 5) * 4}s`, "--t": `${2 + azar(i * 9) * 3}s` })} />;
            })}
            {n(90).map((i) => {
              const t = azar(i * 13);
              const desvio = (azar(i * 17) + azar(i * 19) - 1) * 70;
              return <i key={`v${i}`} className="a2-polvo-estelar" style={pos(60 + t * 520 + desvio * 0.5, 440 - t * 440 + desvio, 0.8 + azar(i * 23) * 1.2, { opacity: 0.4 + azar(i * 29) * 0.6 })} />;
            })}
            <div className="a2-fugaz" style={pos(180, 110, 110, { "--t": "13s", "--d": "-3s" })}><i /></div>
            <div className="a2-fugaz" style={pos(470, 60, 90, { "--t": "19s", "--d": "-11s" })}><i /></div>
            <div className="a2-luna" style={pos(612, 292, 64)}>
              <svg viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="31" fill="url(#mrA2bloomLuna)" />
                <path d="M38 12 A21 21 0 1 0 52 44 A17 17 0 1 1 38 12Z" fill="#fff8dc" />
                <path d="M38 12 A21 21 0 0 0 20 46 A19 19 0 0 1 38 12Z" fill="#fff" opacity=".7" />
              </svg>
            </div>
          </div>
          {/* de día y al atardecer: halcón que planea en círculos y dos cometas con cola que serpentea */}
          <div className="a2-halcon" style={pos(150, 300, 46)}>
            <div className="a2-halcon-y">
              <svg viewBox="0 0 60 24">
                <path d="M30 10 C24 6 14 3 1 4 L5 6 L2 7.4 L7 8.6 L4.6 10.4 C10 11 16 12 20 13 C24 14 27 14 28.4 14 L27 20 L30 17.6 L33 20 L31.6 14 C33 14 36 14 40 13 C44 12 50 11 55.4 10.4 L53 8.6 L58 7.4 L55 6 L59 4 C46 3 36 6 30 10Z" fill="#2e1a0e" />
                <path d="M30 10 C36 6 46 3 59 4 L55 6 C46 6.4 38 8.6 31.6 14Z" fill="#8a5a2c" opacity=".8" />
                <circle cx="30" cy="9.6" r="2.2" fill="#f4e6c8" />
              </svg>
            </div>
          </div>
          <Cometa x={214} y={352} ancho={34} />
          <Cometa x={556} y={236} ancho={26} color="#1f6fa8" claro="#6fc4e0" d={-2.6} />
          {fiesta && n(10).map((i) => (
            <Cometa key={i} clase="a2-cometa-rafaga" ancho={22} color={SEDAS[i % 6]} claro="#fff0b0" d={-(i * 0.47)}
              estilo={pos(60 + azar(i * 3) * 680, 1000, 20 + azar(i) * 14, { "--t": `${4.6 + azar(i * 7) * 2.6}s`, "--x": `${(azar(i * 5) - 0.3) * 160}`, "--ry": `${8 + azar(i * 11) * 40}%` })} />
          ))}
        </div>
      </div>
      {/* arena que cruza y motas doradas a contraluz */}
      {n(12).map((i) => (
        <span key={i} className="mr-arena a2-arena" style={{ top: `${58 + ((i * 29) % 38)}%`, "--t": `${6 + (i % 5) * 1.6}s`, "--d": `${-((i * 1.3) % 9)}s`, "--s": 0.6 + (i % 3) * 0.3 }} />
      ))}
      {n(10).map((i) => (
        <i key={i} className="a2-mota" style={{ left: `${(i * 37 + 7) % 100}%`, top: `${40 + ((i * 23) % 56)}%`, "--s": 0.5 + azar(i) * 0.9, "--t": `${14 + azar(i * 3) * 12}s`, "--d": `${-azar(i * 5) * 20}s` }} />
      ))}
      {/* fiesta: sedas de colores al viento */}
      {fiesta && n(18).map((i) => (
        <i key={i} className="a2-seda" style={{ left: `${-10 + azar(i) * 100}%`, "--c": SEDAS[i % 6], "--s": 0.7 + azar(i * 3) * 0.8, "--t": `${3.4 + azar(i * 5) * 2.6}s`, "--d": `${-azar(i * 7) * 5}s`, "--ry": `${6 + azar(i * 13) * 70}%`, "--rg": `${azar(i * 17) * 180}deg` }} />
      ))}
    </div>
  );
}

// ================= VIÑETAS a los lados del camino (200 × 240) =================
// Suelo de duna con cresta iluminada y halo cálido detrás
const Suelo = ({ d = "M0 240 V204 C50 184 120 180 200 200 V240Z", cresta: c = "M0 204 C50 184 120 180 200 200" }) => (
  <g>
    <path d={d} fill="url(#mrA2vArena)" />
    <path d={c} fill="none" stroke="#fff0c0" strokeWidth="2" />
  </g>
);
const Halo = ({ cx = 100, cy = 120, r = 90 }) => <circle cx={cx} cy={cy} r={r} fill="url(#mrA2luzArena)" opacity=".8" />;
const BanderaVin = ({ x, y, s = 1, color = "#d81f2e", d = 0 }) => (
  <g className="a2-vin-bandera" style={{ "--d": `${d}s` }}>
    <path d={`M${x} ${y} c${5 * s} ${-2 * s} ${10 * s} ${3 * s} ${18 * s} ${0.6 * s} c${-5 * s} ${3 * s} ${-4 * s} ${5 * s} ${-0.6 * s} ${8 * s} c${-7 * s} ${0.6 * s} ${-12 * s} ${-2 * s} ${-17.4 * s} ${0.4 * s}Z`} fill={color} />
  </g>
);
// Guerrero de terracota (pies en x, y)
function Guerrero({ x, y, s = 1, opacidad = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacidad}>
      <ellipse cx="-6" cy="2" rx="24" ry="4" fill="#3a1c10" opacity=".4" />
      <rect x="-17" y="-4" width="34" height="7" rx="1" fill="url(#mrA2barro)" />
      <path d="M-11 -4 L-11 -34 L-2 -34 L-1.4 -4Z M11 -4 L11 -34 L2 -34 L1.4 -4Z" fill="url(#mrA2barro)" />
      <path d="M-11 -12 h9.4 M11 -12 h-9.4" stroke="#5a3626" strokeWidth="1" opacity=".6" />
      <path d="M-16 -31 L-13.4 -58 L13.4 -58 L16 -31 Q0 -25 -16 -31Z" fill="url(#mrA2barro)" />
      <path d="M-8 -30 L-6.6 -56 M0 -28 V-56 M8 -30 L6.6 -56" stroke="#5a3626" strokeWidth=".8" opacity=".5" />
      <path d="M-19.4 -80 L-21.4 -50 L-15 -47 L-14 -78Z M19.4 -80 L22.4 -61 L14 -54 L11.4 -60 L16 -65 L14 -78Z" fill="url(#mrA2barro)" />
      <path d="M-14.4 -57 L-15.4 -84 Q0 -91 15.4 -84 L14.4 -57 Q0 -53 -14.4 -57Z" fill="url(#mrA2barro)" />
      {/* coraza de placas remachadas */}
      <path d="M-14.8 -64 Q0 -60 14.8 -64 M-15 -71 Q0 -67 15 -71 M-15.2 -78 Q0 -74 15.2 -78 M-8 -86 V-56 M0 -88 V-55 M8 -86 V-56" fill="none" stroke="#5a3626" strokeWidth=".9" opacity=".65" />
      {[-11.6, -4, 4, 11.6].flatMap((px) => [-60.6, -67.6, -74.6, -81.6].map((py) => <circle key={`${px}${py}`} cx={px} cy={py} r=".8" fill="#f6dcb8" opacity=".8" />))}
      <ellipse cx="-16.6" cy="-81" rx="6" ry="8.4" fill="url(#mrA2barro)" /><ellipse cx="16.6" cy="-81" rx="6" ry="8.4" fill="url(#mrA2barro)" />
      <path d="M-7.4 -88 Q0 -82 7.4 -88 L6.4 -93 L-6.4 -93Z" fill="#e6c49c" />
      <ellipse cx="0" cy="-100" rx="7.6" ry="9.2" fill="url(#mrA2barro)" />
      <path d="M-7.6 -102 Q0 -114 7.6 -102 Q0 -106.4 -7.6 -102Z" fill="#6a4430" /><circle cx="4.4" cy="-111" r="3.8" fill="#7a5038" /><path d="M1 -109.4 h7" stroke="#4a2c1e" strokeWidth="1" />
      <path d="M-4.4 -100.4 h3 M1.6 -100.4 h3 M-2.6 -95.6 Q0 -94.4 2.6 -95.6" fill="none" stroke="#4a2c1e" strokeWidth=".9" strokeLinecap="round" />
      {/* media figura al sol */}
      <path d="M1 -109 Q8 -108 7.6 -98 L7 -92 L15.4 -84 L22.4 -61 L15 -52 L16 -31 L11 -30 L11 -4 L17 -4 L17 3 L1 3Z" fill="#fff2d2" opacity=".2" />
    </g>
  );
}
// Gran Pagoda del Ganso Salvaje (大雁塔): siete cuerpos de ladrillo que se estrechan, con cornisas y arcos
function PagodaGanso({ cx, y, s = 1 }) {
  return (
    <g transform={`translate(${cx} ${y}) scale(${s})`}>
      <ellipse cx="-14" cy="2" rx="62" ry="6" fill="#3a1c10" opacity=".35" />
      <path d="M-50 0 L-46 -14 H46 L50 0Z" fill="url(#mrA2ladrillo)" /><path d="M-46 -14 H46" stroke="#fff0c8" strokeWidth="1.2" />
      {n(7).map((k) => {
        const w = 66 - k * 7.4;
        const w2 = w - 5;
        const yb = -14 - k * 20.6;
        const h = 20.6 - k * 0.6;
        return (
          <g key={k}>
            <path d={`M${-w / 2} ${yb} L${-w2 / 2} ${r1(yb - h)} H${w2 / 2} L${w / 2} ${yb}Z`} fill="url(#mrA2ladrillo)" />
            <path d={`M${r1(w * 0.2)} ${yb} L${r1(w2 * 0.2)} ${r1(yb - h)} H${w2 / 2} L${w / 2} ${yb}Z`} fill="#fff0c8" opacity=".3" />
            <path d={`M${r1(-w / 2 + 2)} ${r1(yb - h * 0.34)} H${r1(w / 2 - 2)} M${r1(-w / 2 + 3)} ${r1(yb - h * 0.62)} H${r1(w / 2 - 3)}`} stroke="#7a4a30" strokeWidth=".5" opacity=".5" />
            <path d={`M${-1.9 - (k < 2 ? 1 : 0)} ${yb} v${-6} a2.4 2.4 0 0 1 ${4.8 + (k < 2 ? 1.2 : 0)} 0 v6Z`} fill="#2a130c" />
            {/* cornisa escalonada de ladrillo */}
            <path d={`M${r1(-w2 / 2 - 5)} ${r1(yb - h)} H${r1(w2 / 2 + 5)} l-2.4 3 H${r1(-w2 / 2 - 2.6)}Z`} fill="#7a4a30" />
            <path d={`M${r1(-w2 / 2 - 5)} ${r1(yb - h - 0.6)} H${r1(w2 / 2 + 5)}`} stroke="#fff0c8" strokeWidth="1.1" />
          </g>
        );
      })}
      <path d="M-9 -157 L0 -176 L9 -157Z" fill="url(#mrA2teja)" /><path d="M0 -176 v-9" stroke="#c8961e" strokeWidth="1.6" /><circle cx="0" cy="-180" r="2.4" fill="#ffd161" />
    </g>
  );
}
const PalmaVin = ({ x, y, alto, d = 0, espejo = false }) => (
  <g transform={`translate(${x} ${y}) scale(${espejo ? -1 : 1} 1)`}>
    <g className="a2-vin-palma" style={{ "--d": `${d}s` }}>
      <svg x={-alto * 0.36} y={-alto} width={alto * 0.72} height={alto * 1.08} viewBox="0 0 100 150" overflow="visible"><PalmaDibujo /></svg>
    </g>
  </g>
);

export const VINETAS = [
  // 1 · Camello con mercader cruzando la duna
  () => (
    <Vin>
      <Halo cx={120} cy={110} r={96} />
      <circle cx="128" cy="96" r="34" fill="#fff3c2" opacity=".85" />
      <path d="M0 240 V190 C40 168 90 176 130 196 C160 208 180 206 200 198 V240Z" fill="url(#mrA2vArenaLejos)" />
      <Suelo d="M0 240 V214 C50 196 130 196 200 212 V240Z" cresta="M0 214 C50 196 130 196 200 212" />
      <g className="a2-vin-polvo"><circle cx="50" cy="206" r="9" fill="#fff0c8" opacity=".7" /></g>
      <g style={{ "--p": "0s" }}><Camello carga="jinete" x="26" y="86" width="150" height="120" /></g>
      <path d="M20 224 Q60 216 110 224 M90 232 Q140 224 190 230" fill="none" stroke="#fff0c0" strokeWidth="1.2" opacity=".6" />
    </Vin>
  ),
  // 2 · Oasis de la Luna Creciente: palmeras, agua con destellos y pabellón
  () => (
    <Vin>
      <Halo cx={100} cy={150} r={90} />
      <Suelo d="M0 240 V196 C40 180 150 178 200 194 V240Z" cresta="M0 196 C40 180 150 178 200 194" />
      <path d="M22 218 C50 194 150 190 184 210 C150 200 70 204 46 226Z" fill="#5a9a40" />
      <path d="M26 219 C60 246 164 240 184 210 C150 228 70 232 26 219Z" fill="#8a5a2c" />
      <path d="M30 219 C56 198 150 196 180 211 C150 236 70 238 30 219Z" fill="url(#mrA2agua)" />
      <path d="M50 212 C90 202 140 202 172 210" fill="none" stroke="#e8fff6" strokeWidth="1.4" opacity=".8" />
      <path className="a2-vin-reflejo" d="M96 204 L120 204 L114 232 L102 232Z" fill="url(#mrA2reflejo)" />
      <g><rect x="118" y="186" width="34" height="12" fill="url(#mrA2laca)" /><Techo cx={135} y={188} w={52} h={11} cima={26} tejas={8} /></g>
      <PalmaVin x={48} y={214} alto={150} d={-1} espejo />
      <PalmaVin x={166} y={208} alto={118} d={-3} />
      <PalmaVin x={92} y={206} alto={84} d={-2} />
      <path className="a2-vin-destello" d="M106 214 l2 -7 l2 7 l7 2 l-7 2 l-2 7 l-2 -7 l-7 -2Z" fill="#fff" />
      <path className="a2-vin-destello" style={{ "--d": "-2.2s" }} d="M148 218 l1.4 -5 l1.4 5 l5 1.4 l-5 1.4 l-1.4 5 l-1.4 -5 l-5 -1.4Z" fill="#fff" />
    </Vin>
  ),
  // 3 · Cuevas de Mogao: la fachada de nueve pisos y nichos con luz de lámparas
  () => (
    <Vin>
      <path d="M8 240 L2 176 L10 120 L4 78 L26 54 L70 60 L112 48 L160 56 L190 50 L198 84 L190 130 L198 190 L192 240Z" fill="url(#mrA2roca)" />
      <path d="M4 78 L26 54 L70 60 L112 48 L160 56 L190 50 L198 84" fill="none" stroke="#fff0c8" strokeWidth="1.6" />
      <path d="M0 96 Q100 88 200 96 M0 140 Q100 132 200 142 M0 186 Q100 178 200 188" fill="none" stroke="#6e4028" strokeWidth="1.2" opacity=".5" />
      {n(9).map((i) => <path key={i} d={`M${r1(8 + i * 23 + azar(i) * 8)} ${r1(56 + azar(i * 3) * 8)} q${r1(-3 + azar(i * 5) * 6)} 20 ${r1(azar(i * 7) * 4)} ${r1(40 + azar(i * 9) * 30)}`} fill="none" stroke="#5a3020" strokeWidth={r1(1.2 + azar(i * 2) * 2)} opacity=".25" strokeLinecap="round" />)}
      {[[10, 104], [34, 100], [12, 150], [36, 148], [158, 100], [182, 104], [160, 150], [184, 148], [14, 196], [180, 196]].map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x - 1} ${y + 22} V${y + 8} a8 8 0 0 1 16 0 V${y + 22}Z`} fill="#f2d2a2" opacity=".6" />
          <path d={`M${x} ${y + 22} V${y + 8} a7 7 0 0 1 14 0 V${y + 22}Z`} fill="#3a1a10" />
          <path className="a2-vin-brillo" style={{ "--d": `${-i * 0.7}s` }} d={`M${x + 2} ${y + 22} V${y + 10} a5 5 0 0 1 10 0 V${y + 22}Z`} fill="#ffc45a" />
        </g>
      ))}
      <path d="M0 126 H52 M148 126 H200 M0 172 H56 M144 172 H200" stroke="#4a2a18" strokeWidth="2" /><path d="M0 123 H52 M148 123 H200 M0 169 H56 M144 169 H200" stroke="#4a2a18" strokeWidth="4" strokeDasharray="1 7" />
      <g transform="translate(100 232) scale(1.24)"><NuevePisos cx={0} y={0} /></g>
    </Vin>
  ),
  // 4 · Cometa sobre las dunas
  () => (
    <Vin>
      <Halo cx={80} cy={90} r={80} />
      <path d="M0 240 V200 C40 180 100 186 140 206 C170 218 190 214 200 208 V240Z" fill="url(#mrA2vArenaLejos)" />
      <Suelo d="M0 240 V220 C70 200 140 204 200 222 V240Z" cresta="M0 220 C70 200 140 204 200 222" />
      {/* niña con la cuerda */}
      <g>
        <ellipse cx="146" cy="216" rx="14" ry="2.6" fill="#3a1608" opacity=".35" />
        <path d="M146 196 L152 214 L140 214Z" fill="#c8102e" /><path d="M146 196 L152 214 L147 214Z" fill="#ff7a5c" />
        <path d="M143 214 v6 M149 214 v6" stroke="#3b2416" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M146 199 L136 188" stroke="#c8102e" strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="146.4" cy="191" r="5" fill="#f1c9a5" /><path d="M141.4 190 a5 5 0 0 1 10 -0.6 q-5 -2.4 -10 0.6Z" fill="#2a180c" /><circle cx="151.6" cy="187.6" r="2" fill="#2a180c" />
      </g>
      <path d="M136 188 Q96 130 66 78" stroke="#3b2416" strokeWidth=".8" fill="none" />
      <g className="a2-vin-cometa">
        <path d="M60 14 L86 44 L60 80 L34 44Z" fill="#c8102e" /><path d="M60 14 L86 44 L60 80Z" fill="#ff7a5c" />
        <path d="M60 14 V80 M34 44 H86" stroke="#f2c14e" strokeWidth="1.4" /><path d="M60 14 L86 44 L60 80 L34 44Z" fill="none" stroke="#f2c14e" strokeWidth="2" strokeLinejoin="round" /><circle cx="60" cy="44" r="5" fill="#f2c14e" />
        <g className="a2-vin-cola" style={{ "--k": 0 }}><path d="M60 80 v14" stroke="#c8102e" strokeWidth="2" /><path d="M54 92 l6 3 l6 -3 v7 l-6 -3 l-6 3Z" fill="#f2c14e" />
          <g className="a2-vin-cola" style={{ "--k": 1 }}><path d="M60 95 v14" stroke="#c8102e" strokeWidth="2" /><path d="M54 107 l6 3 l6 -3 v7 l-6 -3 l-6 3Z" fill="#f2c14e" />
            <g className="a2-vin-cola" style={{ "--k": 2 }}><path d="M60 110 v14" stroke="#c8102e" strokeWidth="2" /><path d="M54 122 l6 3 l6 -3 v7 l-6 -3 l-6 3Z" fill="#f2c14e" /></g>
          </g>
        </g>
      </g>
    </Vin>
  ),
  // 5 · Guerreros de terracota de Xi'an (兵马俑)
  () => (
    <Vin>
      <path d="M0 240 V60 Q100 20 200 60 V240Z" fill="#5a3422" opacity=".5" />
      <path className="a2-vin-rayo" d="M150 20 L200 20 L120 230 L40 230Z" fill="url(#mrA2reflejo)" opacity=".5" />
      <Guerrero x={44} y={196} s={0.82} opacidad={0.8} />
      <Guerrero x={156} y={196} s={0.82} opacidad={0.8} />
      <Guerrero x={100} y={196} s={0.9} opacidad={0.9} />
      <path d="M0 240 V200 H200 V240Z" fill="url(#mrA2vArena)" /><path d="M0 200 H200" stroke="#fff0c0" strokeWidth="1.6" />
      <Guerrero x={58} y={230} s={1.3} />
      <Guerrero x={146} y={230} s={1.3} />
      {n(6).map((i) => <circle key={i} className="a2-vin-mota" style={{ "--d": `${-i * 1.1}s` }} cx={40 + i * 26} cy={200 - (i % 3) * 30} r="1.6" fill="#fff0c0" />)}
    </Vin>
  ),
  // 6 · Gran Pagoda del Ganso Salvaje (大雁塔) con gansos en formación
  () => (
    <Vin>
      <Halo cx={110} cy={110} r={96} />
      <Suelo d="M0 240 V212 C60 204 140 204 200 212 V240Z" cresta="M0 212 C60 204 140 204 200 212" />
      {[[22, 212, 15], [48, 216, 12], [160, 214, 14], [184, 212, 16]].map(([x, y, r], k) => (
        <g key={k}><path d={`M${x} ${y + 6} v${-r}`} stroke="#4a2a18" strokeWidth="2" /><circle cx={x - r * 0.4} cy={y - r * 0.7} r={r * 0.62} fill="url(#mrA2hoja)" /><circle cx={x + r * 0.45} cy={y - r * 0.8} r={r * 0.6} fill="url(#mrA2hoja)" /><circle cx={x} cy={y - r * 1.3} r={r * 0.66} fill="url(#mrA2hoja)" /></g>
      ))}
      <PagodaGanso cx={100} y={216} s={1.08} />
      <g className="a2-vin-gansos">
        {[[0, 0], [-12, 7], [12, 8], [-24, 15], [24, 17]].map(([gx, gy], k) => (
          <path key={k} className="a2-vin-ala" style={{ "--d": `${-k * 0.17}s` }} d={`M${30 + gx - 7} ${40 + gy - 3} q4 -1 7 3 q3 -4 7 -3`} fill="none" stroke="#3b2416" strokeWidth="1.8" strokeLinecap="round" />
        ))}
      </g>
    </Vin>
  ),
  // 7 · Puesto del bazar: sedas, especias y farol
  () => (
    <Vin>
      <Halo cx={100} cy={150} r={90} />
      <Suelo d="M0 240 V218 C60 210 140 210 200 218 V240Z" cresta="M0 218 C60 210 140 210 200 218" />
      <path d="M28 96 V222 M172 96 V222" stroke="url(#mrA2tronco)" strokeWidth="6" />
      {/* seda colgada que ondea */}
      <g className="a2-vin-seda"><path d="M36 106 C50 110 56 104 70 108 V170 C58 164 50 172 36 166Z" fill="#1f8aa0" /><path d="M58 107 C62 106 66 107 70 108 V170 C66 168 62 167 58 167Z" fill="#8fe0e0" opacity=".5" /></g>
      <g className="a2-vin-seda" style={{ "--d": "-1.2s" }}><path d="M74 108 C86 112 92 106 104 110 V160 C94 156 86 164 74 158Z" fill="#7a3a9a" /><path d="M94 108 C98 108 101 109 104 110 V160 C100 158 97 158 94 158Z" fill="#c9a0e8" opacity=".5" /></g>
      {/* mercader */}
      <g><path d="M126 178 C124 150 132 140 142 140 C152 140 160 150 158 178Z" fill="#2f6a4a" /><path d="M142 140 C152 140 160 150 158 178 H150 C152 158 148 146 142 140Z" fill="#7fc08a" opacity=".5" />
        <circle cx="142" cy="130" r="9" fill="#e9bf96" /><path d="M132 128 Q142 112 152 128 Q142 124 132 128Z" fill="#3b2416" /><path d="M138 133 q4 2.4 8 0" fill="none" stroke="#3b2416" strokeWidth="1.2" strokeLinecap="round" /></g>
      {/* mostrador */}
      <path d="M20 178 H180 V226 H20Z" fill="#6b3a1c" /><path d="M16 172 H184 V182 H16Z" fill="#c99a62" /><path d="M16 172 H184" stroke="#fff0c8" strokeWidth="1.4" />
      <path d="M20 182 H180 V192 H20Z" fill="url(#mrA2alero)" />
      <path d="M34 196 l10 10 l-10 10 l-10 -10Z M100 196 l10 10 l-10 10 l-10 -10Z M166 196 l10 10 l-10 10 l-10 -10Z" fill="none" stroke="#f2c14e" strokeWidth="1.6" />
      {[["#c8102e", 30], ["#f2c14e", 48], ["#1f8aa0", 66]].map(([c, x]) => (
        <g key={x}><rect x={x} y="146" width="15" height="27" rx="7" fill={c} /><rect x={x + 9} y="146" width="5" height="27" rx="2.5" fill="#fff" opacity=".3" /><ellipse cx={x + 7.5} cy="147" rx="7.5" ry="3" fill="#fff" opacity=".35" /></g>
      ))}
      {[["#e08a1a", 92], ["#b8321e", 112], ["#d9b020", 164]].map(([c, x]) => (
        <g key={x}><path d={`M${x - 9} 172 q9 -22 18 0Z`} fill={c} /><path d={`M${x + 1} 153 q6 8 8 19 h-5Z`} fill="#fff" opacity=".25" /><path d={`M${x - 11} 172 h22 l-3 5 h-16Z`} fill="#8a5a2c" /></g>
      ))}
      {/* toldo a rayas con flecos */}
      <path d="M10 104 L30 70 H170 L190 104Z" fill="url(#mrA2toldo)" />
      <path d="M40 70 L26 104 H44 L54 70Z M78 70 L72 104 H90 L92 70Z M116 70 L118 104 H136 L130 70Z M154 70 L164 104 H182 L166 70Z" fill="#f2c14e" opacity=".92" />
      <path d="M30 70 H170" stroke="#ffb07a" strokeWidth="1.6" />
      <path d="M10 104 q7.5 9 15 0 q7.5 9 15 0 q7.5 9 15 0 q7.5 9 15 0 q7.5 9 15 0 q7.5 9 15 0 q7.5 9 15 0 q7.5 9 15 0 q7.5 9 15 0 q7.5 9 15 0 q7.5 9 15 0 q7.5 9 15 0Z" fill="#8f0c21" />
      <g className="a2-vin-farol">
        <path d="M118 108 v10" stroke="#3b2416" strokeWidth="1" />
        <circle className="a2-vin-brillo" cx="118" cy="130" r="22" fill="url(#mrA2bloom)" />
        <rect x="113" y="118" width="10" height="3" fill="#f2c14e" /><ellipse cx="118" cy="131" rx="10" ry="11" fill="url(#mrA2farol)" /><rect x="113" y="141" width="10" height="3" fill="#f2c14e" />
        <path d="M116 144 v9 M118 144 v11 M120 144 v9" stroke="#c8102e" strokeWidth="1" />
      </g>
    </Vin>
  ),
  // 8 · Fuerte de Jiayuguan (嘉峪关) con banderas al viento
  () => (
    <Vin>
      <Halo cx={100} cy={120} r={96} />
      <path d="M0 240 V170 L30 140 L52 160 L84 124 L112 156 L140 132 L170 158 L200 138 V240Z" fill="url(#mrA2danxiaVin)" opacity=".7" />
      <path d="M0 240 V170 L30 140 L52 160 L84 124 L112 156 L140 132 L170 158 L200 138 V240Z" fill="url(#mrA2calimaVin)" />
      <Suelo d="M0 240 V206 C60 196 140 196 200 206 V240Z" cresta="M0 206 C60 196 140 196 200 206" />
      <g transform="translate(98 212) scale(.94)"><Fuerte x={0} y={0} /></g>
      <BanderaVin x={98} y={131.6} s={1.1} />
      <BanderaVin x={56.6} y={144.6} s={0.9} color="#f2c14e" d={-0.6} />
      <BanderaVin x={141.2} y={144.6} s={0.9} d={-1.1} />
      <g className="a2-vin-polvo" style={{ "--d": "-1.4s" }}><ellipse cx="30" cy="212" rx="16" ry="5" fill="#fff0c8" opacity=".7" /></g>
    </Vin>
  ),
];
