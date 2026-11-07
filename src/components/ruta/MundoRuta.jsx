import * as React from "react";

/*
  Mundos ilustrados de la ruta de aprendizaje (un mundo por nivel), solo SVG + CSS:
  - <MundoRuta nivel>: panorama fijo (sticky) en 3 capas con parallax ligado al scroll + partículas ambientales.
  - <EscenaTramo nivel idx>: viñetas a izquierda y derecha del camino de cada unidad (capa media, parallax propio).
  Estilos y animaciones en src/styles/v13-ruta-mundos.css (todas desactivadas con prefers-reduced-motion).
*/

const VB = "0 0 800 1000";
const Capa = ({ clase, children }) => (
  <div className={`mr-capa ${clase}`}>
    <svg viewBox={VB} preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      {children}
    </svg>
  </div>
);

// ---------- Piezas reutilizables ----------
// Tejado chino de aleros curvos: centro x, línea del alero y, ancho w, alto h
const tejado = (x, y, w, h) =>
  `M${x - w / 2} ${y - h * 0.32} Q${x - w * 0.36} ${y + 2} ${x - w * 0.28} ${y} L${x + w * 0.28} ${y} Q${x + w * 0.36} ${y + 2} ${x + w / 2} ${y - h * 0.32} Q${x + w * 0.33} ${y - h * 0.45} ${x + w * 0.27} ${y - h} L${x - w * 0.27} ${y - h} Q${x - w * 0.33} ${y - h * 0.45} ${x - w / 2} ${y - h * 0.32}Z`;
// Pino nevado: base (x, y), escala s
function PinoNevado({ x, y, s = 1, color = "#24402f" }) {
  const capas = [0, 1, 2].map((k) => {
    const ancho = (34 - k * 8) * s;
    const base = y - k * 20 * s;
    const alto = 30 * s;
    return { ancho, base, alto };
  });
  return (
    <g>
      <rect x={x - 2.5 * s} y={y - 6 * s} width={5 * s} height={12 * s} fill="#4a3324" />
      {capas.map(({ ancho, base, alto }, k) => (
        <g key={k}>
          <path d={`M${x - ancho} ${base} L${x} ${base - alto - 10 * s} L${x + ancho} ${base}Z`} fill={color} />
          <path d={`M${x - ancho * 0.55} ${base - alto * 0.5} L${x} ${base - alto - 10 * s} L${x + ancho * 0.6} ${base - alto * 0.45} Q${x + ancho * 0.2} ${base - alto * 0.62} ${x} ${base - alto * 0.5} Q${x - ancho * 0.25} ${base - alto * 0.6} ${x - ancho * 0.55} ${base - alto * 0.5}Z`} fill="#fbfdff" />
        </g>
      ))}
    </g>
  );
}
// Camello bactriano (dos jorobas) mirando a la derecha; pies en (0,0)
const CAMELLO = "M0 -20 C1 -28 7 -32 13 -30 C16 -40 24 -40 27 -31 C30 -38 37 -38 39 -29 L43 -28 C45 -36 47 -42 52 -42 C56 -42 58 -39 56 -36 L53 -36 C51 -30 50 -24 46 -19 L44 -17 L44 0 L41 0 L40 -14 L35 -14 L34 0 L31 0 L31 -16 L15 -16 L14 0 L11 0 L10 -15 L6 -16 L5 0 L2 0 L2 -16Z";
// Palmera: base (x,y), altura h, inclinación
function Palmera({ x, y, h = 90, inc = 10, color = "#2f5d34" }) {
  const tx = x + inc;
  const ty = y - h;
  return (
    <g>
      <path d={`M${x - 3} ${y} Q${x + inc * 0.2} ${y - h * 0.5} ${tx - 2} ${ty} L${tx + 2} ${ty} Q${x + inc * 0.3 + 4} ${y - h * 0.5} ${x + 3} ${y}Z`} fill="#6b4423" />
      {[-150, -110, -60, -20, 20, 60].map((a, i) => {
        const r = (a * Math.PI) / 180;
        const ex = tx + Math.cos(r) * 38;
        const ey = ty + Math.sin(r) * 22 + 14;
        return <path key={i} d={`M${tx} ${ty} Q${(tx + ex) / 2} ${ty - 16} ${ex} ${ey} Q${(tx + ex) / 2} ${ty - 6} ${tx} ${ty}Z`} fill={color} />;
      })}
    </g>
  );
}
// Pico kárstico (cono redondeado) con base (x, y), ancho w y alto h
const karst = (x, y, w, h) => `M${x - w / 2} ${y} C${x - w * 0.42} ${y - h * 0.55} ${x - w * 0.3} ${y - h} ${x} ${y - h} C${x + w * 0.3} ${y - h} ${x + w * 0.42} ${y - h * 0.55} ${x + w / 2} ${y}Z`;
// Banderas de oración entre dos puntos
function Banderas({ x1, y1, x2, y2, n = 9, tam = 9 }) {
  const colores = ["#2f6fd1", "#f4f1e8", "#d23a2f", "#2f9a55", "#f2c14e"];
  const curva = (t) => [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t + Math.sin(Math.PI * t) * 18];
  return (
    <g>
      <path d={`M${x1} ${y1} Q${(x1 + x2) / 2} ${(y1 + y2) / 2 + 36} ${x2} ${y2}`} fill="none" stroke="#5a4636" strokeWidth="1.2" />
      {Array.from({ length: n }, (_, i) => {
        const [bx, by] = curva((i + 0.5) / n);
        return <rect key={i} x={bx - tam / 2} y={by} width={tam} height={tam * 1.2} fill={colores[i % 5]} stroke="rgba(0,0,0,.15)" strokeWidth=".5" />;
      })}
    </g>
  );
}

// ---------- A1 · Pekín y el norte: invierno, Gran Muralla y Ciudad Prohibida ----------
function PanoramaA1() {
  const crestaMuralla = "M0 724 C80 676 130 694 180 656 S300 646 340 694 S450 706 520 648 S650 656 700 694 S780 684 800 676";
  return (
    <>
      <Capa clase="mr-lejos">
        <defs>
          <radialGradient id="mrA1sol"><stop offset="0" stopColor="#fffaf0" /><stop offset=".45" stopColor="#ffe9c4" stopOpacity=".9" /><stop offset="1" stopColor="#ffe9c4" stopOpacity="0" /></radialGradient>
        </defs>
        <circle cx="560" cy="260" r="150" fill="url(#mrA1sol)" />
        <circle cx="560" cy="260" r="46" fill="#fff8ea" opacity=".95" />
        <path d="M0 640 L60 592 L120 616 L190 538 L260 602 L330 560 L400 612 L470 520 L560 592 L630 548 L700 604 L800 556 V1100 H0Z" fill="#9db0c2" />
        {[[190, 538], [470, 520], [630, 548], [800, 556], [60, 592], [330, 560]].map(([x, y]) => (
          <path key={x} d={`M${x - 22} ${y + 22} L${x} ${y} L${x + 24} ${y + 24} L${x + 12} ${y + 18} L${x + 4} ${y + 27} L${x - 6} ${y + 17}Z`} fill="#f7fbff" />
        ))}
        <path d={`${crestaMuralla} V1100 H0Z`} fill="#6c8297" />
        <path d={crestaMuralla} fill="none" stroke="#f3f6f9" strokeWidth="5" opacity=".9" />
        <path d={crestaMuralla} transform="translate(0 9)" fill="none" stroke="#b39876" strokeWidth="9" />
        <path d={crestaMuralla} transform="translate(0 2)" fill="none" stroke="#8a6c4f" strokeWidth="5" strokeDasharray="4 4" />
        {[[180, 640], [338, 678], [520, 632], [700, 678]].map(([x, y]) => (
          <g key={x}>
            <rect x={x - 9} y={y} width="18" height="20" fill="#a98d6c" />
            <rect x={x - 3} y={y + 9} width="6" height="8" rx="3" fill="#4d3a2a" />
            <path d={tejado(x, y + 1, 30, 9)} fill="#5c4a3c" />
            <path d={`M${x - 11} ${y - 6} L${x + 11} ${y - 6}`} stroke="#fff" strokeWidth="2.2" />
          </g>
        ))}
      </Capa>
      <Capa clase="mr-cerca">
        <defs>
          <linearGradient id="mrA1oro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffe08a" /><stop offset=".6" stopColor="#e3a432" /><stop offset="1" stopColor="#a8741e" /></linearGradient>
        </defs>
        <path d="M0 830 C180 800 620 800 800 830 V1100 H0Z" fill="#eef2f5" />
        {/* Muralla roja del palacio a lo ancho */}
        <rect x="0" y="842" width="800" height="52" fill="#9c2229" />
        <rect x="0" y="834" width="800" height="10" fill="url(#mrA1oro)" />
        <path d="M0 834 H800" stroke="#fff" strokeWidth="3" />
        {/* Sala de la Armonía Suprema */}
        <rect x="270" y="868" width="260" height="24" fill="#efeae1" />
        <rect x="300" y="852" width="200" height="18" fill="#f7f3ec" />
        <rect x="318" y="790" width="164" height="64" fill="#b0262f" />
        {[332, 352, 372, 392, 412, 432, 452, 470].map((x) => (
          <rect key={x} x={x} y="798" width="5" height="56" fill="#7d141c" />
        ))}
        <rect x="318" y="790" width="164" height="9" fill="#2f6f74" />
        <path d={tejado(400, 796, 240, 26)} fill="url(#mrA1oro)" />
        <rect x="338" y="752" width="124" height="20" fill="#a3222b" />
        <path d={tejado(400, 758, 200, 34)} fill="url(#mrA1oro)" />
        <path d="M332 724 H468" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        <path d="M328 770 Q400 762 472 770 M286 788 Q400 778 514 788" stroke="#fffdf5" strokeWidth="3" fill="none" opacity=".85" />
        <circle cx="332" cy="722" r="4" fill="#ffe08a" /><circle cx="468" cy="722" r="4" fill="#ffe08a" />
        {/* Torres de esquina */}
        {[120, 680].map((x) => (
          <g key={x}>
            <rect x={x - 26} y="796" width="52" height="40" fill="#a3222b" />
            <path d={tejado(x, 800, 84, 18)} fill="url(#mrA1oro)" />
            <path d={tejado(x, 778, 58, 20)} fill="url(#mrA1oro)" />
            <path d={`M${x - 16} 758 H${x + 16}`} stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          </g>
        ))}
        <path d="M0 900 C200 884 600 884 800 900 V1100 H0Z" fill="#f6f8fa" />
        <PinoNevado x={40} y={930} s={1.5} />
        <PinoNevado x={95} y={950} s={1.1} />
        <PinoNevado x={220} y={942} s={1} />
        <PinoNevado x={585} y={944} s={1} />
        <PinoNevado x={712} y={936} s={1.4} />
        <PinoNevado x={770} y={954} s={1.05} />
      </Capa>
    </>
  );
}

// ---------- A2 · La Ruta de la Seda: atardecer, dunas, caravana, oasis y Mogao ----------
function PanoramaA2() {
  return (
    <>
      <Capa clase="mr-lejos">
        <defs>
          <radialGradient id="mrA2sol"><stop offset="0" stopColor="#fff3c2" /><stop offset=".35" stopColor="#ffd27a" /><stop offset=".7" stopColor="#ff9f4a" stopOpacity=".35" /><stop offset="1" stopColor="#ff9f4a" stopOpacity="0" /></radialGradient>
        </defs>
        <circle cx="430" cy="650" r="230" fill="url(#mrA2sol)" />
        <circle cx="430" cy="650" r="74" fill="#ffe7a8" />
        {/* Acantilado de Mogao con nichos de cuevas y la fachada de nueve pisos */}
        <path d="M0 560 L120 552 L150 528 L360 522 L372 560 L392 690 L0 700Z" fill="#b2713c" />
        <path d="M0 600 H380 M0 640 H386 M0 672 H390" stroke="#8e5329" strokeWidth="2" opacity=".6" />
        {Array.from({ length: 22 }, (_, i) => {
          const x = 14 + (i % 11) * 22 + (Math.floor(i / 11) % 2) * 10;
          const y = 572 + Math.floor(i / 11) * 40;
          return <path key={i} d={`M${x} ${y + 16} V${y + 6} A6 6 0 0 1 ${x + 12} ${y + 6} V${y + 16}Z`} fill="#4d2511" />;
        })}
        <g>
          <rect x="268" y="560" width="64" height="140" fill="#d9b48a" />
          {[0, 1, 2, 3, 4].map((k) => (
            <path key={k} d={tejado(300, 690 - k * 28, 96 - k * 12, 12)} fill="#8f2a1e" />
          ))}
          <path d={tejado(300, 548, 40, 16)} fill="#8f2a1e" />
          <rect x="296" y="520" width="8" height="14" fill="#f2c14e" />
        </g>
        <path d="M380 712 C470 660 560 668 640 690 S760 700 800 680 V1100 H380Z" fill="#e8a65a" />
      </Capa>
      <Capa clase="mr-medio">
        <path d="M0 752 C200 736 600 736 800 754 V1100 H0Z" fill="#d68a3c" />
        <path d="M0 752 C200 736 600 736 800 754" stroke="#ffd48a" strokeWidth="3" fill="none" />
      </Capa>
      <Capa clase="mr-cerca">
        <defs>
          <linearGradient id="mrA2agua" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7fd0d6" /><stop offset="1" stopColor="#2f7f95" /></linearGradient>
        </defs>
        <path d="M0 880 C160 800 320 830 440 870 S700 900 800 840 V1100 H0Z" fill="#c4712d" />
        <path d="M0 880 C160 800 320 830 440 870 S700 900 800 840" stroke="#f6c070" strokeWidth="3" fill="none" />
        <path d="M120 836 C200 860 240 900 220 960" stroke="#a85d22" strokeWidth="2" fill="none" opacity=".6" />
        {/* Oasis de la Luna Creciente */}
        <path d="M470 930 C500 896 610 892 660 918 C620 908 540 912 500 940Z" fill="url(#mrA2agua)" />
        <path d="M470 930 C520 960 640 950 660 918 C610 940 520 946 470 930Z" fill="url(#mrA2agua)" />
        <path d="M486 934 C540 948 610 944 646 924" stroke="#d8fbff" strokeWidth="2" fill="none" opacity=".8" />
        <path d={tejado(560, 902, 40, 14)} fill="#7a2418" />
        <rect x="548" y="902" width="24" height="12" fill="#c7884a" />
        <Palmera x={470} y={928} h={86} inc={-14} />
        <Palmera x={498} y={936} h={64} inc={8} color="#3d7a3f" />
        <Palmera x={668} y={922} h={92} inc={16} />
        <Palmera x={640} y={938} h={58} inc={-6} color="#3d7a3f" />
        <path d="M0 1000 C200 950 520 980 800 950 V1100 H0Z" fill="#a95a21" />
      </Capa>
    </>
  );
}

// ---------- B1 · El este de China: anochecer en Shanghái y los canales de Suzhou ----------
function PanoramaB1() {
  const edificios = [
    [300, 640, 26], [330, 660, 20], [352, 620, 22], [376, 650, 24], [404, 600, 18], [430, 630, 22],
    [640, 630, 24], [668, 600, 20], [692, 650, 26], [722, 610, 22], [748, 640, 24], [776, 620, 24],
    [0, 668, 30], [34, 650, 22], [60, 676, 28], [92, 660, 24], [120, 680, 30], [154, 664, 24], [182, 684, 30], [216, 670, 28], [248, 686, 30],
  ];
  return (
    <>
      <Capa clase="mr-lejos">
        <defs>
          <pattern id="mrB1ven" width="8" height="10" patternUnits="userSpaceOnUse"><rect x="2" y="2" width="3" height="4" fill="#ffd97a" opacity=".85" /></pattern>
          <linearGradient id="mrB1torre" x1="0" x2="1"><stop offset="0" stopColor="#3a5a86" /><stop offset="1" stopColor="#1c2f52" /></linearGradient>
        </defs>
        {Array.from({ length: 26 }, (_, i) => (
          <circle key={i} cx={(i * 137) % 800} cy={40 + ((i * 89) % 420)} r={i % 4 ? 1.2 : 2} fill="#fff6d8" opacity={0.5 + (i % 3) * 0.2} />
        ))}
        <circle cx="610" cy="190" r="70" fill="#fff3cf" opacity=".12" />
        <path d="M640 160 A44 44 0 1 0 642 222 A36 36 0 1 1 640 160Z" fill="#fff3cf" />
        <g fill="#1a2a4c">
          {edificios.map(([x, y, w]) => (
            <rect key={x} x={x} y={y} width={w} height={720 - y} />
          ))}
        </g>
        <g fill="url(#mrB1ven)">
          {edificios.map(([x, y, w]) => (
            <rect key={x} x={x} y={y + 6} width={w} height={714 - y} />
          ))}
        </g>
        {/* Torres de Lujiazui: Jin Mao, Torre de Shanghái, WFC y la Perla de Oriente */}
        <path d="M516 720 L518 556 L524 540 L527 520 L530 540 L536 556 L538 720Z" fill="url(#mrB1torre)" />
        <path d="M552 720 L554 512 Q561 494 572 488 L576 720Z" fill="url(#mrB1torre)" />
        <path d="M594 720 L596 530 L612 524 L614 720Z" fill="url(#mrB1torre)" />
        <rect x="600" y="534" width="8" height="10" fill="#2a3f6e" />
        <path d="M554 520 L572 500 M556 560 L574 548" stroke="#9fd0ff" strokeWidth="1.2" opacity=".7" />
        <g>
          <path d="M470 720 L476 676 M490 720 L484 676 M480 720 V500" stroke="#c9d6ec" strokeWidth="4" />
          <circle cx="480" cy="664" r="18" fill="#e04c86" />
          <circle cx="474" cy="658" r="6" fill="#ffb4d0" opacity=".8" />
          <rect x="476" y="610" width="8" height="40" fill="#c9d6ec" />
          <circle cx="480" cy="600" r="11" fill="#e04c86" />
          <circle cx="480" cy="572" r="5" fill="#ff8fb8" />
          <circle cx="480" cy="498" r="2.5" fill="#ff5a5a" />
        </g>
        <rect x="0" y="718" width="800" height="300" fill="#0d2740" />
      </Capa>
      <Capa clase="mr-medio">
        {/* Reflejo de las luces del Bund en el río */}
        {[[310, 30], [400, 22], [480, 40], [525, 26], [563, 34], [604, 22], [700, 30], [760, 24], [80, 26], [180, 30]].map(([x, h], i) => (
          <rect key={i} x={x} y={726 + (i % 3) * 4} width={i % 3 ? 5 : 8} height={h} rx="2" fill={i === 2 ? "#ff7fae" : "#ffd97a"} opacity=".55" />
        ))}
      </Capa>
      <Capa clase="mr-cerca">
        {/* Casas de Suzhou: muros blancos, tejas negras y frontones escalonados */}
        {[[0, 120], [124, 104], [580, 110], [690, 110]].map(([x, w], i) => (
          <g key={x}>
            <rect x={x} y={812 - (i % 2) * 14} width={w} height={70 + (i % 2) * 14} fill="#ece6d8" />
            <path d={`M${x - 6} ${812 - (i % 2) * 14} L${x + w / 2} ${780 - (i % 2) * 14} L${x + w + 6} ${812 - (i % 2) * 14}Z`} fill="#2a2f3a" />
            <path d={`M${x + 4} ${792 - (i % 2) * 14} h12 v-10 h12 v-8 h${w - 56} v8 h12 v10 h12`} fill="none" stroke="#2a2f3a" strokeWidth="5" />
            <rect x={x + w * 0.3} y={840 - (i % 2) * 6} width="18" height="22" fill="#3b2a22" />
            <rect x={x + w * 0.62} y={836} width="14" height="14" fill="#ffcf6a" opacity=".85" />
          </g>
        ))}
        <rect x="0" y="880" width="800" height="220" fill="#123552" />
        {/* Puente en arco con su reflejo formando un círculo */}
        <path d="M250 884 Q400 784 550 884 L550 896 L250 896Z" fill="#d8d0bf" />
        <path d="M318 896 A82 82 0 0 1 482 896Z" fill="#0d2740" />
        <path d="M318 896 A82 82 0 0 0 482 896" fill="none" stroke="#d8d0bf" strokeWidth="9" opacity=".35" />
        <path d="M262 878 Q400 790 538 878" fill="none" stroke="#a89e8a" strokeWidth="2" strokeDasharray="6 5" />
        {/* Farolillos bajo los aleros */}
        {[[40, 826], [170, 812], [622, 826], [740, 812]].map(([x, y]) => (
          <g key={x}>
            <path d={`M${x} ${y - 12} V${y - 6}`} stroke="#2a2f3a" strokeWidth="1.5" />
            <ellipse cx={x} cy={y} rx="8" ry="9" fill="#e0302f" />
            <ellipse cx={x} cy={y} rx="12" ry="12" fill="#ff8a3c" opacity=".25" />
          </g>
        ))}
        {/* Lotos */}
        {[[90, 960], [190, 990], [640, 970], [730, 948]].map(([x, y], i) => (
          <g key={x}>
            <ellipse cx={x} cy={y} rx="26" ry="8" fill="#2f7a4f" />
            <path d={`M${x} ${y} L${x + 22} ${y - 3}`} stroke="#1f5a38" strokeWidth="1.5" />
            {i % 2 === 0 && <path d={`M${x + 6} ${y - 4} q-8 -14 4 -22 q12 8 4 22z M${x + 6} ${y - 4} q-14 -6 -12 -16 q10 2 12 16z M${x + 6} ${y - 4} q14 -6 12 -16 q-10 2 -12 16z`} fill="#f59ab8" />}
          </g>
        ))}
      </Capa>
    </>
  );
}

// ---------- B2 · El sur y el oeste: Tíbet nevado, karst de Guilin, río Li y terrazas ----------
function PanoramaB2() {
  return (
    <>
      <Capa clase="mr-lejos">
        <path d="M0 520 L90 430 L150 470 L250 360 L330 450 L410 380 L470 430 L560 330 L650 440 L720 400 L800 450 V700 H0Z" fill="#c7d6e2" />
        {[[90, 430], [250, 360], [410, 380], [560, 330], [720, 400]].map(([x, y]) => (
          <path key={x} d={`M${x - 34} ${y + 36} L${x} ${y} L${x + 38} ${y + 40} L${x + 18} ${y + 30} L${x + 6} ${y + 44} L${x - 10} ${y + 30}Z`} fill="#fbfdff" />
        ))}
        {/* Potala sobre su colina */}
        <path d="M120 600 C170 540 300 530 360 600Z" fill="#9aa88f" />
        <rect x="160" y="540" width="170" height="40" fill="#f4efe4" />
        <rect x="210" y="512" width="72" height="44" fill="#8e2a2a" />
        <rect x="226" y="500" width="40" height="14" fill="#e3a432" />
        {[170, 186, 202, 290, 306, 318].map((x) => (
          <rect key={x} x={x} y="552" width="6" height="8" fill="#5a3a2a" />
        ))}
        <Banderas x1={330} y1={520} x2={460} y2={470} n={11} tam={7} />
        <g fill="#8fb4a4">
          <path d={karst(80, 720, 150, 150)} /><path d={karst(200, 720, 110, 120)} /><path d={karst(470, 720, 140, 170)} /><path d={karst(620, 720, 120, 130)} /><path d={karst(740, 720, 150, 160)} />
        </g>
      </Capa>
      <Capa clase="mr-medio">
        <g fill="#5d8e78">
          <path d={karst(0, 820, 180, 230)} /><path d={karst(130, 820, 120, 170)} /><path d={karst(340, 800, 120, 150)} /><path d={karst(560, 810, 130, 190)} /><path d={karst(690, 820, 150, 240)} /><path d={karst(800, 820, 120, 180)} />
        </g>
        <path d="M0 790 H800 V1100 H0Z" fill="#5d8e78" />
      </Capa>
      <Capa clase="mr-cerca">
        <defs>
          <linearGradient id="mrB2rio" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d9eee6" /><stop offset="1" stopColor="#7fb8b0" /></linearGradient>
        </defs>
        <path d="M0 860 C120 820 300 840 400 830 S640 820 800 850 V1100 H0Z" fill="#3f6f5b" />
        {/* Río Li serpenteando hacia el horizonte */}
        <path d="M300 1000 C330 940 450 920 420 880 S370 842 404 828 L440 828 C420 844 474 868 470 892 S400 940 500 1000Z" fill="url(#mrB2rio)" />
        <path d="M352 966 Q380 950 410 958 M420 900 Q440 892 452 898 M410 852 Q420 846 432 850" stroke="#fff" strokeWidth="2" fill="none" opacity=".7" />
        {/* Terrazas de arroz */}
        <g fill="none" strokeWidth="9">
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <path key={k} d={`M${560 + k * 6} ${1000 - k * 22} C${620 + k * 4} ${960 - k * 24} ${720} ${955 - k * 22} ${800} ${935 - k * 24}`} stroke={k % 2 ? "#8cbf5a" : "#b7d98a"} />
          ))}
          {[0, 1, 2, 3].map((k) => (
            <path key={k} d={`M0 ${940 - k * 22} C${80} ${950 - k * 24} ${170 - k * 6} ${975 - k * 20} ${220 - k * 8} ${1000 - k * 18}`} stroke={k % 2 ? "#8cbf5a" : "#b7d98a"} />
          ))}
        </g>
        <g fill="none" stroke="#e8f6ff" strokeWidth="1.5" opacity=".7">
          {[0, 2, 4].map((k) => (
            <path key={k} d={`M${570 + k * 6} ${994 - k * 22} C${630 + k * 4} ${954 - k * 24} ${720} ${949 - k * 22} ${800} ${929 - k * 24}`} />
          ))}
        </g>
      </Capa>
    </>
  );
}

// ---------- Partículas y elementos animados del panorama ----------
const n = (k) => Array.from({ length: k }, (_, i) => i);
function AmbienteA1() {
  return (
    <div className="mr-particulas">
      {n(26).map((i) => (
        <span key={i} className="mr-copo" style={{ left: `${(i * 37) % 100}%`, "--t": `${9 + (i % 6) * 2.2}s`, "--d": `${-((i * 1.7) % 14)}s`, "--s": 0.5 + (i % 4) * 0.3, "--x": `${(i % 2 ? 1 : -1) * (20 + (i % 5) * 10)}px` }} />
      ))}
    </div>
  );
}
function AmbienteA2() {
  return (
    <div className="mr-particulas">
      <div className="mr-px2">
      <div className="mr-caravana">
        <svg viewBox="0 0 330 60" aria-hidden="true">
          {[0, 70, 140, 210, 280].map((x, i) => (
            <g key={x} transform={`translate(${x} 56) scale(${i === 0 ? 1.05 : 0.95})`} fill="#4a2412">
              <path d={CAMELLO} />
              {i % 2 === 0 && <path d="M22 -38 C22 -46 30 -46 30 -38Z M24 -44 L28 -50 L32 -44Z" />}
              {i % 2 === 1 && <rect x="16" y="-40" width="18" height="8" rx="3" fill="#7a2418" />}
            </g>
          ))}
          <path d="M53 18 L70 30 M123 18 L140 30 M193 18 L210 30 M263 18 L280 30" stroke="#4a2412" strokeWidth="1.2" />
        </svg>
      </div>
      </div>
      {[["8%", "16%", "#d23a2f"], ["78%", "10%", "#2f6fd1"]].map(([left, top, c], i) => (
        <div key={i} className="mr-cometa" style={{ left, top, "--d": `${-i * 2.5}s` }}>
          <svg viewBox="0 0 60 120" aria-hidden="true">
            <path d="M30 2 L54 30 L30 64 L6 30Z" fill={c} stroke="#f2c14e" strokeWidth="2" />
            <path d="M30 2 V64 M6 30 H54" stroke="#f2c14e" strokeWidth="1.2" />
            <path d="M30 64 Q20 80 34 92 T30 118" fill="none" stroke={c} strokeWidth="2" />
            {[78, 94, 108].map((y) => <path key={y} d={`M24 ${y} L36 ${y + 4}`} stroke="#f2c14e" strokeWidth="3" />)}
          </svg>
        </div>
      ))}
      {n(14).map((i) => (
        <span key={i} className="mr-arena" style={{ top: `${30 + ((i * 29) % 65)}%`, "--t": `${6 + (i % 5) * 1.6}s`, "--d": `${-((i * 1.3) % 9)}s`, "--s": 0.6 + (i % 3) * 0.3 }} />
      ))}
    </div>
  );
}
function AmbienteB1() {
  return (
    <div className="mr-particulas">
      <div className="mr-px3">
      <div className="mr-barca">
        <svg viewBox="0 0 160 70" aria-hidden="true">
          <path d="M4 44 Q80 66 156 40 L146 52 Q80 70 14 54Z" fill="#1d1712" />
          <path d="M48 44 Q80 18 112 42Z" fill="#2c241c" />
          <path d="M52 42 Q80 22 108 40" stroke="#6d5a42" strokeWidth="2" fill="none" />
          <path d="M132 40 L128 20" stroke="#1d1712" strokeWidth="3" />
          <circle cx="128" cy="16" r="5" fill="#1d1712" />
          <path d="M118 12 L138 12 L128 4Z" fill="#a2875a" />
          <path d="M130 24 L150 66" stroke="#6d5a42" strokeWidth="2" />
          <circle cx="40" cy="36" r="5" fill="#ff5b3a" /><circle cx="40" cy="36" r="10" fill="#ffb25a" opacity=".3" />
        </svg>
      </div>
      </div>
      {n(10).map((i) => (
        <span key={i} className="mr-linterna" style={{ left: `${(i * 41 + 7) % 100}%`, "--t": `${16 + (i % 4) * 4}s`, "--d": `${-((i * 2.9) % 20)}s`, "--s": 0.6 + (i % 3) * 0.25 }} />
      ))}
      {[["9%", "72%"], ["30%", "66%"], ["70%", "71%"], ["90%", "66%"]].map(([left, top], i) => (
        <span key={i} className="mr-reflejo" style={{ left, top, "--d": `${-i * 0.9}s` }} />
      ))}
    </div>
  );
}
function AmbienteB2() {
  return (
    <div className="mr-particulas">
      <span className="mr-niebla f1" />
      <span className="mr-niebla f2" />
      <span className="mr-niebla f3" />
      <div className="mr-px3">
      <div className="mr-balsa">
        <svg viewBox="0 0 120 60" aria-hidden="true">
          <path d="M6 46 H104 L98 52 H10Z" fill="#c9a56a" />
          {n(8).map((i) => <path key={i} d={`M${12 + i * 12} 46 V52`} stroke="#8a6a38" strokeWidth="1.5" />)}
          <path d="M60 46 V24" stroke="#2c2a26" strokeWidth="5" strokeLinecap="round" />
          <path d="M46 22 L74 22 L60 12Z" fill="#d8b46a" stroke="#8a6a38" />
          <path d="M60 30 L96 2" stroke="#4a3a28" strokeWidth="2" />
          <path d="M22 46 C20 38 26 32 30 34 C32 30 38 30 36 36 C34 40 30 42 28 46Z" fill="#1f1f22" />
        </svg>
      </div>
      </div>
      {n(12).map((i) => (
        <span key={i} className={`mr-hoja ${i % 3 === 0 ? "rosa" : ""}`} style={{ left: `${(i * 47 + 5) % 100}%`, "--t": `${11 + (i % 5) * 2.5}s`, "--d": `${-((i * 2.3) % 16)}s`, "--s": 0.7 + (i % 3) * 0.25, "--x": `${(i % 2 ? 1 : -1) * (40 + (i % 4) * 16)}px` }} />
      ))}
    </div>
  );
}

const MUNDOS = {
  A1: [PanoramaA1, AmbienteA1],
  A2: [PanoramaA2, AmbienteA2],
  B1: [PanoramaB1, AmbienteB1],
  B2: [PanoramaB2, AmbienteB2],
};

export function MundoRuta({ nivel }) {
  const [Panorama, Ambiente] = MUNDOS[nivel] || MUNDOS.A1;
  return (
    <div className={`mr-mundo mr-${nivel}`} aria-hidden="true">
      <div className="mr-fijo">
        <div className="mr-cielo" />
        <Panorama />
        <Ambiente />
      </div>
      <div className="mr-velo" />
    </div>
  );
}

// ---------- Viñetas a los lados del camino (200 × 240) ----------
const Vin = ({ children, anima }) => (
  <svg viewBox="0 0 200 240" aria-hidden="true" className={anima ? `mr-anima-${anima}` : undefined}>
    {children}
  </svg>
);
const VINETAS = {
  A1: [
    // Torre de la Gran Muralla en un monte nevado
    () => (
      <Vin>
        <path d="M0 240 V172 C50 130 110 118 200 150 V240Z" fill="#e8eef3" />
        <path d="M110 122 C150 128 180 138 200 150 V240 H120Z" fill="#cbd7e1" />
        <path d="M0 206 L60 160 L110 142 L200 170" fill="none" stroke="#a98a68" strokeWidth="14" />
        <path d="M0 196 L60 150 L110 132 L200 160" fill="none" stroke="#8a6c4e" strokeWidth="6" strokeDasharray="5 5" />
        <path d="M0 200 L60 154 L110 136 L200 164" fill="none" stroke="#fff" strokeWidth="2" opacity=".8" />
        <rect x="92" y="96" width="38" height="44" fill="#b99a77" />
        <path d="M104 140 V124 A7 7 0 0 1 118 124 V140Z" fill="#4d3a2a" />
        <rect x="98" y="104" width="8" height="10" fill="#4d3a2a" /><rect x="116" y="104" width="8" height="10" fill="#4d3a2a" />
        <path d={tejado(111, 98, 58, 18)} fill="#5c4a3c" />
        <path d="M94 80 Q111 76 128 80" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
        <PinoNevado x={30} y={226} s={0.9} />
        <PinoNevado x={176} y={232} s={0.75} />
      </Vin>
    ),
    // Bosquecillo de pinos nevados con farol de piedra
    () => (
      <Vin>
        <ellipse cx="100" cy="228" rx="100" ry="26" fill="#eef3f7" />
        <PinoNevado x={56} y={214} s={1.6} />
        <PinoNevado x={130} y={222} s={1.25} />
        <PinoNevado x={176} y={226} s={0.85} />
        <g>
          <rect x="88" y="196" width="10" height="26" fill="#9a958c" />
          <rect x="80" y="182" width="26" height="16" fill="#b5b0a6" />
          <rect x="88" y="186" width="10" height="8" fill="#ffd36a" />
          <path d="M76 182 L93 168 L110 182Z" fill="#8a857c" />
          <path d="M78 180 L93 168 L108 180" stroke="#fff" strokeWidth="3" fill="none" />
        </g>
      </Vin>
    ),
    // Torre de esquina de la Ciudad Prohibida sobre el foso helado
    () => (
      <Vin>
        <defs>
          <linearGradient id="mrVoro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffe08a" /><stop offset="1" stopColor="#c8901e" /></linearGradient>
        </defs>
        <rect x="0" y="206" width="200" height="34" fill="#cfe0ea" />
        <path d="M10 214 H190" stroke="#fff" strokeWidth="2" opacity=".8" />
        <rect x="16" y="150" width="168" height="56" fill="#9c2229" />
        <rect x="16" y="144" width="168" height="8" fill="url(#mrVoro)" />
        <rect x="58" y="116" width="84" height="32" fill="#a3222b" />
        {[66, 80, 94, 108, 122].map((x) => <rect key={x} x={x} y="120" width="4" height="26" fill="#7d141c" />)}
        <path d={tejado(100, 120, 130, 22)} fill="url(#mrVoro)" />
        <path d={tejado(100, 96, 100, 22)} fill="url(#mrVoro)" />
        <path d={tejado(100, 72, 64, 20)} fill="url(#mrVoro)" />
        <path d="M84 52 H116 M74 76 Q100 70 126 76" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="100" cy="48" r="4" fill="#ffe08a" />
      </Vin>
    ),
    // Templo del Cielo: tres tejados azules circulares
    () => (
      <Vin>
        <ellipse cx="100" cy="226" rx="96" ry="12" fill="#f3f1ec" />
        <ellipse cx="100" cy="214" rx="82" ry="10" fill="#e6e1d6" />
        <ellipse cx="100" cy="204" rx="68" ry="8" fill="#f3f1ec" />
        {[[58, 176, 26], [40, 136, 22], [24, 100, 20]].map(([r, y, h], k) => (
          <g key={k}>
            <rect x={100 - r * 0.72} y={y} width={r * 1.44} height={k === 0 ? 26 : 16} fill="#a3222b" />
            <path d={`M${100 - r} ${y + 2} Q100 ${y - h - 6} ${100 + r} ${y + 2} Q100 ${y + 8} ${100 - r} ${y + 2}Z`} fill="#2f4f8f" />
            <path d={`M${100 - r} ${y + 2} Q100 ${y + 8} ${100 + r} ${y + 2}`} stroke="#e3a432" strokeWidth="3" fill="none" />
            <path d={`M${100 - r * 0.6} ${y - h * 0.45} Q100 ${y - h * 0.9} ${100 + r * 0.6} ${y - h * 0.45}`} stroke="#fff" strokeWidth="2.5" fill="none" opacity=".9" />
          </g>
        ))}
        <path d="M94 82 Q100 60 106 82Z" fill="#f2c14e" />
        <circle cx="100" cy="64" r="5" fill="#ffe08a" />
      </Vin>
    ),
  ],
  A2: [
    // Camello con jinete sobre una duna
    () => (
      <Vin anima="balanceo">
        <path d="M0 240 V200 C60 170 130 168 200 196 V240Z" fill="#e3a052" />
        <path d="M0 200 C60 170 130 168 200 196" stroke="#ffd48a" strokeWidth="3" fill="none" />
        <g transform="translate(46 188) scale(2.1)" fill="#5a2c14">
          <path d={CAMELLO} />
          <rect x="14" y="-44" width="20" height="8" rx="3" fill="#a3222b" />
          <path d="M20 -44 C20 -56 30 -56 30 -44Z" fill="#3b2416" />
          <path d="M18 -56 L25 -64 L32 -56Z" fill="#c8961e" />
        </g>
      </Vin>
    ),
    // Palmeras del oasis
    () => (
      <Vin>
        <ellipse cx="100" cy="222" rx="96" ry="18" fill="#e3a052" />
        <ellipse cx="104" cy="220" rx="62" ry="10" fill="#4fa7b5" />
        <path d="M60 220 Q104 228 150 218" stroke="#d8fbff" strokeWidth="2" fill="none" />
        <Palmera x={58} y={218} h={150} inc={-18} />
        <Palmera x={142} y={216} h={120} inc={20} color="#3d7a3f" />
        <Palmera x={100} y={222} h={80} inc={4} color="#2a6a35" />
      </Vin>
    ),
    // Cuevas de Mogao
    () => (
      <Vin>
        <path d="M0 240 V70 L30 60 L170 56 L200 70 V240Z" fill="#b8773f" />
        <path d="M0 110 H200 M0 160 H200" stroke="#8e5329" strokeWidth="2" opacity=".6" />
        {n(9).map((i) => {
          const x = 14 + (i % 3) * 62;
          const y = 78 + Math.floor(i / 3) * 52;
          return (
            <g key={i}>
              <path d={`M${x} ${y + 30} V${y + 12} A12 12 0 0 1 ${x + 24} ${y + 12} V${y + 30}Z`} fill="#4d2511" />
              {i === 4 && <path d={`M${x + 12} ${y + 8} C${x + 6} ${y + 14} ${x + 6} ${y + 24} ${x + 12} ${y + 28} C${x + 18} ${y + 24} ${x + 18} ${y + 14} ${x + 12} ${y + 8}Z`} fill="#f2c14e" />}
            </g>
          );
        })}
        <path d={tejado(100, 64, 120, 18)} fill="#8f2a1e" />
      </Vin>
    ),
    // Cometa sobre las dunas
    () => (
      <Vin anima="cometa">
        <path d="M0 240 V214 C70 194 140 200 200 222 V240Z" fill="#d98b3b" />
        <path d="M150 210 L150 196" stroke="#3b2416" strokeWidth="5" strokeLinecap="round" />
        <circle cx="150" cy="190" r="5" fill="#3b2416" />
        <path d="M150 196 Q100 120 66 56" stroke="#3b2416" strokeWidth="1" fill="none" />
        <g className="mr-vin-cometa">
          <path d="M60 10 L86 40 L60 74 L34 40Z" fill="#c8102e" stroke="#f2c14e" strokeWidth="2" />
          <path d="M60 10 V74 M34 40 H86" stroke="#f2c14e" strokeWidth="1.2" />
          <path d="M60 74 Q50 90 64 100 T58 128" fill="none" stroke="#c8102e" strokeWidth="2" />
        </g>
      </Vin>
    ),
  ],
  B1: [
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
  ],
  B2: [
    // Pico kárstico con balsa de bambú y cormorán
    () => (
      <Vin>
        <path d={karst(70, 200, 120, 190)} fill="#4f7f6b" />
        <path d={karst(150, 200, 90, 130)} fill="#6a9a84" />
        <rect x="0" y="196" width="200" height="44" fill="#a9d0cc" />
        <path d="M30 214 H90 M110 228 H170" stroke="#fff" strokeWidth="2" opacity=".7" />
        <g className="mr-vin-balsa">
          <path d="M60 206 H150 L144 212 H66Z" fill="#c9a56a" />
          <path d="M104 206 V184" stroke="#2c2a26" strokeWidth="5" strokeLinecap="round" />
          <path d="M90 182 L118 182 L104 172Z" fill="#d8b46a" stroke="#8a6a38" />
          <path d="M70 206 C68 198 74 192 78 194 C80 190 86 190 84 196 C82 200 78 202 76 206Z" fill="#1f1f22" />
        </g>
      </Vin>
    ),
    // Panda comiendo bambú
    () => (
      <Vin anima="bambu">
        {[[20, 6], [46, 0], [168, 10], [186, 30]].map(([x, y], i) => (
          <g key={x} className="mr-vin-cana">
            <rect x={x} y={y} width="9" height={240 - y} rx="3" fill={i % 2 ? "#4f9a5a" : "#3c8a4c"} />
            {[60, 120, 180].map((yy) => <rect key={yy} x={x - 1} y={yy + y / 2} width="11" height="3" fill="#2a6a35" />)}
            <path d={`M${x + 9} ${50 + i * 14} q24 -12 42 -2 q-24 4 -42 10z M${x} ${100 + i * 10} q-24 -10 -40 0 q22 4 40 8z`} fill="#56a862" />
          </g>
        ))}
        <ellipse cx="104" cy="226" rx="70" ry="12" fill="#3f6f5b" opacity=".5" />
        <g>
          <ellipse cx="104" cy="186" rx="40" ry="38" fill="#fafafa" />
          <ellipse cx="104" cy="200" rx="40" ry="20" fill="#1b1b1e" />
          <ellipse cx="74" cy="218" rx="16" ry="10" fill="#1b1b1e" /><ellipse cx="134" cy="218" rx="16" ry="10" fill="#1b1b1e" />
          <circle cx="104" cy="134" r="30" fill="#fafafa" />
          <circle cx="80" cy="110" r="10" fill="#1b1b1e" /><circle cx="128" cy="110" r="10" fill="#1b1b1e" />
          <ellipse cx="93" cy="132" rx="8" ry="10" fill="#1b1b1e" transform="rotate(-20 93 132)" /><ellipse cx="115" cy="132" rx="8" ry="10" fill="#1b1b1e" transform="rotate(20 115 132)" />
          <circle cx="94" cy="132" r="2.6" fill="#fff" /><circle cx="114" cy="132" r="2.6" fill="#fff" />
          <ellipse cx="104" cy="146" rx="5" ry="3.5" fill="#1b1b1e" />
          <path d="M98 152 Q104 156 110 152" stroke="#1b1b1e" strokeWidth="2" fill="none" />
          <path d="M140 150 L118 160" stroke="#3c8a4c" strokeWidth="5" strokeLinecap="round" />
          <path d="M140 150 q14 -14 26 -12 q-12 6 -26 12z" fill="#56a862" />
          <ellipse cx="124" cy="164" rx="12" ry="9" fill="#1b1b1e" />
        </g>
      </Vin>
    ),
    // Terrazas de arroz con agua que brilla
    () => (
      <Vin>
        <path d="M0 240 V110 C60 80 140 80 200 104 V240Z" fill="#6fa24a" />
        {n(7).map((k) => (
          <g key={k}>
            <path d={`M0 ${124 + k * 17} C60 ${96 + k * 18} 140 ${96 + k * 18} 200 ${118 + k * 17}`} fill="none" stroke={k % 2 ? "#a7d07a" : "#c7e6a4"} strokeWidth="10" />
            <path d={`M10 ${126 + k * 17} C70 ${99 + k * 18} 130 ${99 + k * 18} 190 ${120 + k * 17}`} fill="none" stroke="#eaf8ff" strokeWidth="1.5" opacity=".75" />
          </g>
        ))}
        <path d={tejado(160, 86, 34, 12)} fill="#5a3a2a" />
        <rect x="150" y="86" width="20" height="12" fill="#d9c49a" />
      </Vin>
    ),
    // Templo tibetano con banderas de oración y pico nevado
    () => (
      <Vin anima="banderas">
        <path d="M30 120 L100 20 L180 120Z" fill="#c7d6e2" />
        <path d="M76 54 L100 20 L126 58 L112 52 L102 64 L90 52Z" fill="#fff" />
        <path d="M0 240 V170 C60 140 140 140 200 170 V240Z" fill="#9aa88f" />
        <rect x="46" y="128" width="108" height="46" fill="#f4efe4" />
        <rect x="76" y="104" width="48" height="30" fill="#8e2a2a" />
        <rect x="84" y="92" width="32" height="14" fill="#e3a432" />
        <path d="M100 76 L104 92 H96Z" fill="#f2c14e" />
        {[56, 70, 132, 146].map((x) => <rect key={x} x={x} y="140" width="6" height="10" fill="#5a3a2a" />)}
        <g className="mr-vin-banderas">
          <Banderas x1={0} y1={98} x2={76} y2={108} n={7} />
          <Banderas x1={124} y1={106} x2={200} y2={86} n={7} />
        </g>
      </Vin>
    ),
  ],
};

export function EscenaTramo({ nivel, idx }) {
  const lista = VINETAS[nivel] || VINETAS.A1;
  const Izquierda = lista[idx % lista.length];
  const Derecha = lista[(idx + 2) % lista.length];
  return (
    <>
      <div className={`mr-vineta izq ${idx % 2 ? "baja" : ""}`} aria-hidden="true">
        <Izquierda />
      </div>
      <div className={`mr-vineta der ${idx % 2 ? "" : "baja"}`} aria-hidden="true">
        <Derecha />
      </div>
    </>
  );
}
