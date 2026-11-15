import * as React from "react";

// Portada de Pronunciación: el recinto imperial. Cada sala es un templo con arquitectura propia
// (tejados de tejas vidriadas con aleros curvos, dougong, vigas pintadas, columnas lacadas, puertas
// con clavos dorados que se abren, linternas que se mecen y escalinata de mármol) y un fondo de paisaje
// en capas con niebla, montañas, palacio, linternas de cielo y parallax suave.
// Todo se anima con transform/opacity; prefers-reduced-motion lo deja quieto (ver pronunciacion-templos.css).

// Tejas vidriadas de cada sala: [brillo, medio, sombra]
const ESTILOS = {
  labios: { teja: ["#ffe9a0", "#d9a12a", "#7a4a0c"] },
  bambu: { teja: ["#a6eab0", "#3a8a4c", "#123d1d"] },
  trueno: { teja: ["#c3cbe0", "#55607e", "#1f2638"] },
  campana: { teja: ["#9ff0e2", "#1f8a7e", "#0a3a35"] },
  montana: { teja: ["#a9c2f6", "#3352a0", "#111f45"] },
  linterna: { teja: ["#ffc08c", "#c1531f", "#5a1a08"] },
};

// Un alero (faldón de tejado) visto de frente: cumbrera arriba, faldón cóncavo y puntas levantadas.
function Alero({ id, cx = 250, y0, y1, rw, ew, u = 14, th = 8, bajo = true }) {
  const l = cx - ew;
  const r = cx + ew;
  const ky = y0 + (y1 - y0) * 0.8;
  const kx = (ew - rw) * 0.45;
  const borde = `M${l + 5} ${y1 - u + th} Q${l + 40} ${y1 + th} ${l + 70} ${y1 + th} L${r - 70} ${y1 + th} Q${r - 40} ${y1 + th} ${r - 5} ${y1 - u + th}`;
  const cuerpo = `M${cx - rw} ${y0} L${cx + rw} ${y0} C${cx + rw + kx} ${ky} ${r - 40} ${y1} ${r} ${y1 - u} L${r - 5} ${y1 - u + th} Q${r - 40} ${y1 + th} ${r - 70} ${y1 + th} L${l + 70} ${y1 + th} Q${l + 40} ${y1 + th} ${l + 5} ${y1 - u + th} L${l} ${y1 - u} C${l + 40} ${y1} ${cx - rw - kx} ${ky} ${cx - rw} ${y0} Z`;
  const lomoDer = `M${cx + rw} ${y0} C${cx + rw + kx} ${ky} ${r - 40} ${y1} ${r} ${y1 - u}`;
  const lomoIzq = `M${cx - rw} ${y0} C${cx - rw - kx} ${ky} ${l + 40} ${y1} ${l} ${y1 - u}`;
  const ys = y1 + th;
  return (
    <g>
      {bajo && (
        <>
          {/* sofito: aleros vistos por debajo con las cabezas de los cabios */}
          <path d={`M${l + 70} ${ys} L${r - 70} ${ys} Q${r - 40} ${ys} ${r - 5} ${y1 - u + th} L${r - 34} ${ys + 11} L${l + 34} ${ys + 11} L${l + 5} ${y1 - u + th} Q${l + 40} ${ys} ${l + 70} ${ys}Z`} fill="#240709" />
          <path d={`M${l + 36} ${ys + 6} H${r - 36}`} stroke="#2f9a8e" strokeWidth="5" strokeDasharray="4 3" />
          <path d={`M${l + 36} ${ys + 6} H${r - 36}`} stroke="#f2c14e" strokeWidth="1.6" strokeDasharray="1.4 5.6" strokeLinecap="round" />
        </>
      )}
      <path d={cuerpo} fill={`url(#tq-${id}-teja)`} />
      <path d={cuerpo} fill={`url(#tq-${id}-vol)`} />
      {/* lomos (垂脊) */}
      <path d={lomoDer} fill="none" stroke={`url(#tq-${id}-lomo)`} strokeWidth="6" strokeLinecap="round" />
      <path d={lomoIzq} fill="none" stroke={`url(#tq-${id}-lomo)`} strokeWidth="6" strokeLinecap="round" />
      <path d={lomoDer} fill="none" stroke="#fff3cf" strokeWidth="1" opacity=".55" />
      <path d={lomoIzq} fill="none" stroke="#fff3cf" strokeWidth="1" opacity=".55" />
      {/* bestezuelas sobre los lomos (仙人走兽) */}
      {[0.62, 0.72, 0.82].map((t) => (
        <React.Fragment key={t}>
          <circle cx={r - (1 - t) * (ew - rw) * 1.15 - 4} cy={y1 - u - (1 - t) * (y1 - y0) * 0.55 - 3} r="2.4" fill="#f2c14e" />
          <circle cx={l + (1 - t) * (ew - rw) * 1.15 + 4} cy={y1 - u - (1 - t) * (y1 - y0) * 0.55 - 3} r="2.4" fill="#f2c14e" />
        </React.Fragment>
      ))}
      {/* tejas de remate (瓦当) a lo largo del alero */}
      <path d={borde} fill="none" stroke="#5a2a08" strokeWidth="7.5" strokeDasharray="0 9" strokeLinecap="round" />
      <path d={borde} fill="none" stroke="#f2c14e" strokeWidth="5.5" strokeDasharray="0 9" strokeLinecap="round" />
      {/* puntas de los aleros (飞檐) */}
      <path d={`M${r} ${y1 - u} q8 -4 9 -14 q-6 3 -9 6Z`} fill="#f2c14e" stroke="#8a5a1e" strokeWidth=".8" />
      <path d={`M${l} ${y1 - u} q-8 -4 -9 -14 q6 3 9 6Z`} fill="#f2c14e" stroke="#8a5a1e" strokeWidth=".8" />
      {rw > 14 ? <Cumbrera id={id} cx={cx} y={y0} rw={rw} /> : <Remate cx={cx} y={y0} />}
    </g>
  );
}

// Cumbrera con los dos dragones (鸱吻) y la perla
function Cumbrera({ id, cx, y, rw }) {
  const dragon = "M0 10 C-11 9 -15 -3 -9 -12 C-5 -18 4 -17 5 -10 C-1 -11 -4 -6 0 -2 C3 1 7 -1 6 -5 L12 0 C13 6 8 10 0 10Z";
  return (
    <g>
      <rect x={cx - rw - 4} y={y - 10} width={rw * 2 + 8} height="11" rx="2.5" fill={`url(#tq-${id}-lomo)`} stroke="#5a2a08" strokeWidth="1" />
      <rect x={cx - rw - 2} y={y - 8} width={rw * 2 + 4} height="2" fill="#fff3cf" opacity=".5" />
      <path className="tq-dragon" d={dragon} transform={`translate(${cx - rw + 3} ${y - 9})`} fill="#f2c14e" stroke="#7a4a0c" strokeWidth="1" />
      <path className="tq-dragon" d={dragon} transform={`translate(${cx + rw - 3} ${y - 9}) scale(-1 1)`} fill="#f2c14e" stroke="#7a4a0c" strokeWidth="1" />
      <circle className="tq-perla" cx={cx} cy={y - 18} r="6.5" fill="url(#tq-perla)" />
      <path d={`M${cx - 12} ${y - 9} Q${cx} ${y - 22} ${cx + 12} ${y - 9}`} fill="none" stroke="#f2c14e" strokeWidth="2.2" />
    </g>
  );
}

// Remate dorado en punta (宝顶) para los tejados piramidales
function Remate({ cx, y }) {
  return (
    <g>
      <rect x={cx - 9} y={y - 6} width="18" height="7" rx="2" fill="#c8961e" stroke="#5a2a08" />
      <circle cx={cx} cy={y - 15} r="9" fill="url(#tq-perla)" stroke="#8a5a1e" />
      <circle cx={cx} cy={y - 29} r="5.5" fill="url(#tq-perla)" stroke="#8a5a1e" />
      <path d={`M${cx} ${y - 35} V${y - 50}`} stroke="#f2c14e" strokeWidth="2.5" strokeLinecap="round" />
      <circle className="tq-perla" cx={cx} cy={y - 52} r="3.5" fill="#fff3cf" />
    </g>
  );
}

// Banda de muro con celosía entre dos aleros
function Muro({ x0, x1, y0, y1 }) {
  return (
    <g>
      <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill="#7d0a1c" />
      <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill="url(#tq-celosia)" opacity=".8" />
      <rect x={x0} y={y1 - 3} width={x1 - x0} height="3" fill="#f2c14e" />
    </g>
  );
}

// Bambú detrás del pabellón
function Bambu({ x, alto, dir = 1 }) {
  const nudos = Array.from({ length: Math.floor(alto / 26) }, (_, n) => 250 - n * 26);
  return (
    <g className="tq-bambu" style={{ transformOrigin: `${x}px 250px` }}>
      <rect x={x - 3.5} y={250 - alto} width="7" height={alto} rx="3" fill="#3f8f4f" />
      <rect x={x - 2.5} y={250 - alto} width="2" height={alto} fill="#a6eab0" opacity=".5" />
      {nudos.map((y) => (
        <rect key={y} x={x - 4.5} y={y - 1} width="9" height="2.4" rx="1" fill="#1d5a2a" />
      ))}
      {[0, 1, 2].map((n) => (
        <path key={n} d={`M${x} ${250 - alto + 18 + n * 30} q${16 * dir} -10 ${34 * dir} -4 q${-16 * dir} 6 ${-34 * dir} 4Z`} fill="#4fae62" opacity=".95" />
      ))}
      <path d={`M${x} ${250 - alto + 34} q${-14 * dir} -12 ${-28 * dir} -10 q${12 * dir} 8 ${28 * dir} 10Z`} fill="#2f7a40" />
    </g>
  );
}

// Farolillo colgado del alero (en SVG, para la sala de las linternas)
function Farolillo({ x, y, n }) {
  return (
    <g className="tq-farolillo" style={{ transformOrigin: `${x}px ${y}px`, "--n": n }}>
      <path d={`M${x} ${y} V${y + 10}`} stroke="#3b2416" strokeWidth="1.2" />
      <ellipse cx={x} cy={y + 19} rx="8" ry="9.5" fill="url(#tq-farol)" />
      <rect x={x - 5} y={y + 8.5} width="10" height="2.5" rx="1" fill="#f2c14e" />
      <rect x={x - 5} y={y + 27.5} width="10" height="2.5" rx="1" fill="#f2c14e" />
      <path d={`M${x} ${y + 30} V${y + 37}`} stroke="#f2c14e" strokeWidth="1.5" />
    </g>
  );
}

// Tejado completo de cada sala (viewBox 500 × 250; la viga acaba siempre en y = 250 para que todos alineen)
function Tejado({ id }) {
  const [brillo, medio, sombra] = ESTILOS[id].teja;
  let cuerpo;
  if (id === "labios") {
    // Puerta de honor (牌坊): bahía central más alta y dos alas
    cuerpo = (
      <>
        <rect x="60" y="186" width="380" height="28" fill="#5e0614" />
        <Alero id={id} cx={112} y0={150} y1={190} rw={42} ew={108} u={12} />
        <Alero id={id} cx={388} y0={150} y1={190} rw={42} ew={108} u={12} />
        <rect x="168" y="162" width="164" height="52" fill="#8f0c21" stroke="#f2c14e" strokeWidth="2" />
        <rect x="176" y="168" width="148" height="40" fill="url(#tq-celosia)" opacity=".9" />
        <Alero id={id} cx={250} y0={96} y1={152} rw={74} ew={150} u={14} />
      </>
    );
  } else if (id === "bambu") {
    // Pabellón (亭) con tejado piramidal y bambú alrededor
    cuerpo = (
      <>
        <Bambu x={18} alto={210} dir={1} />
        <Bambu x={34} alto={160} dir={1} />
        <Bambu x={482} alto={220} dir={-1} />
        <Bambu x={466} alto={150} dir={-1} />
        <Alero id={id} cx={250} y0={92} y1={196} rw={3} ew={232} u={20} />
      </>
    );
  } else if (id === "trueno") {
    // Torre del tambor: doble alero y el gran tambor en el muro
    cuerpo = (
      <>
        <Muro x0={150} x1={350} y0={118} y1={156} />
        <Alero id={id} cx={250} y0={152} y1={196} rw={150} ew={240} u={14} />
        <Alero id={id} cx={250} y0={70} y1={112} rw={84} ew={172} u={14} />
        <g className="tq-tambor">
          <ellipse cx="250" cy="138" rx="27" ry="27" fill="#5e0614" />
          <circle cx="250" cy="136" r="24" fill="url(#tq-piel)" stroke="#8f0c21" strokeWidth="5" />
          {Array.from({ length: 14 }, (_, n) => (
            <circle key={n} cx={250 + Math.cos((n / 14) * Math.PI * 2) * 24} cy={136 + Math.sin((n / 14) * Math.PI * 2) * 24} r="1.6" fill="#f2c14e" />
          ))}
          <path d="M250 136 m-9 0 a9 9 0 1 1 9 9 a5 5 0 1 1 -5 -5" fill="none" stroke="#8f0c21" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      </>
    );
  } else if (id === "campana") {
    // Torre de la campana: alero bajo y remate piramidal; la campana de jade se mece
    cuerpo = (
      <>
        <Muro x0={160} x1={340} y0={110} y1={156} />
        <Alero id={id} cx={250} y0={152} y1={196} rw={150} ew={240} u={14} />
        <Alero id={id} cx={250} y0={60} y1={112} rw={3} ew={160} u={16} />
        <g className="tq-campana" style={{ transformOrigin: "250px 120px" }}>
          <path d="M250 120 V126" stroke="#f2c14e" strokeWidth="2" />
          <path d="M236 152 Q236 128 250 126 Q264 128 264 152 L268 156 H232Z" fill="url(#tq-bronce)" stroke="#0a3a35" strokeWidth="1" />
          <path d="M240 140 H260 M239 146 H261" stroke="#f2c14e" strokeWidth="1" opacity=".8" />
          <circle cx="250" cy="157" r="2.5" fill="#f2c14e" />
        </g>
      </>
    );
  } else if (id === "montana") {
    // Pagoda de la montaña: tres aleros y cumbres azules detrás
    cuerpo = (
      <>
        <path d="M0 210 L40 120 L66 160 L104 70 L150 150 L170 130 L190 170 V210Z M310 210 V170 L330 132 L352 150 L396 60 L432 150 L458 112 L500 200 V210Z" fill="url(#tq-monte)" opacity=".75" />
        <path d="M104 70 L92 98 L104 92 L114 100Z M396 60 L384 92 L398 84 L408 94Z" fill="#e8eefc" opacity=".55" />
        <Muro x0={145} x1={355} y0={130} y1={160} />
        <Muro x0={185} x1={315} y0={88} y1={116} />
        <Alero id={id} cx={250} y0={156} y1={196} rw={160} ew={240} u={14} />
        <Alero id={id} cx={250} y0={108} y1={140} rw={98} ew={180} u={13} />
        <Alero id={id} cx={250} y0={58} y1={94} rw={44} ew={122} u={12} />
      </>
    );
  } else {
    // Salón de las linternas: gran tejado a cuatro aguas (庑殿) y farolillos bajo el alero
    cuerpo = (
      <>
        <Alero id={id} cx={250} y0={112} y1={194} rw={128} ew={242} u={16} />
      </>
    );
  }
  return (
    <svg viewBox="0 0 500 250" preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id={`tq-${id}-convexa`} x1="0" x2="1">
          <stop offset="0" stopColor={sombra} />
          <stop offset=".35" stopColor={brillo} />
          <stop offset=".7" stopColor={medio} />
          <stop offset="1" stopColor={sombra} />
        </linearGradient>
        <pattern id={`tq-${id}-teja`} width="9" height="16" patternUnits="userSpaceOnUse">
          <rect width="9" height="16" fill={`url(#tq-${id}-convexa)`} />
          <rect y="14.6" width="9" height="1.4" fill={sombra} opacity=".55" />
        </pattern>
        <linearGradient id={`tq-${id}-vol`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".35" />
          <stop offset=".55" stopColor="#fff" stopOpacity=".12" />
          <stop offset=".85" stopColor="#fff" stopOpacity=".05" />
          <stop offset="1" stopColor="#000" stopOpacity=".25" />
        </linearGradient>
        <linearGradient id={`tq-${id}-lomo`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={brillo} />
          <stop offset="1" stopColor={sombra} />
        </linearGradient>
      </defs>
      {cuerpo}
      {/* ménsulas (斗拱) y viga pintada (彩画) */}
      <rect x="30" y="210" width="440" height="20" fill="url(#tq-dougong)" />
      <rect x="30" y="209" width="440" height="2" fill="#f2c14e" />
      <rect x="36" y="229" width="428" height="21" fill="var(--sala)" />
      <rect x="36" y="229" width="428" height="21" fill="url(#tq-cai)" opacity=".55" />
      <rect x="36" y="229" width="428" height="21" fill="none" stroke="#f2c14e" strokeWidth="2" />
      <rect x="40" y="231" width="26" height="17" fill="#1f4f9a" stroke="#f2c14e" strokeWidth="1" />
      <rect x="434" y="231" width="26" height="17" fill="#1f4f9a" stroke="#f2c14e" strokeWidth="1" />
      <path d="M48 239.5 h10 M442 239.5 h10" stroke="#2f9a8e" strokeWidth="5" />
      {id === "linterna" && [94, 128, 372, 406].map((x, n) => <Farolillo key={x} x={x} y={249} n={n} />)}
    </svg>
  );
}

// Definiciones compartidas por todos los templos (una sola vez en la página)
export function DefsTemplos() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="tq-perla">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".5" stopColor="#ffe39a" />
          <stop offset="1" stopColor="#c8961e" />
        </radialGradient>
        <radialGradient id="tq-farol" cx=".5" cy=".45">
          <stop offset="0" stopColor="#ffd08a" />
          <stop offset=".45" stopColor="#e8402e" />
          <stop offset="1" stopColor="#8f0c21" />
        </radialGradient>
        <radialGradient id="tq-piel" cx=".45" cy=".4">
          <stop offset="0" stopColor="#fff3d6" />
          <stop offset="1" stopColor="#e2c48a" />
        </radialGradient>
        <linearGradient id="tq-bronce" x1="0" x2="1">
          <stop offset="0" stopColor="#0f4d46" />
          <stop offset=".4" stopColor="#7fe0d2" />
          <stop offset="1" stopColor="#14675f" />
        </linearGradient>
        <linearGradient id="tq-monte" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6f86c4" />
          <stop offset="1" stopColor="#1b2550" stopOpacity="0" />
        </linearGradient>
        <pattern id="tq-celosia" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 5 H10 M5 0 V10" stroke="#f2c14e" strokeWidth="1" opacity=".45" />
        </pattern>
        <pattern id="tq-dougong" width="24" height="20" patternUnits="userSpaceOnUse">
          <rect width="24" height="20" fill="#2a080b" />
          <path d="M2 8 Q2 3 7 3 H17 Q22 3 22 8Z" fill="#2f9a8e" />
          <rect x="8" y="0" width="8" height="3.5" fill="#f2c14e" />
          <rect x="3" y="8" width="5" height="3" fill="#f2c14e" />
          <rect x="16" y="8" width="5" height="3" fill="#f2c14e" />
          <rect x="9" y="11" width="6" height="6" fill="#2a56a8" />
          <rect x="10" y="17" width="4" height="3" fill="#f2c14e" />
        </pattern>
        <pattern id="tq-cai" width="40" height="21" patternUnits="userSpaceOnUse">
          <path d="M20 2 L32 10.5 L20 19 L8 10.5Z" fill="none" stroke="#f2c14e" strokeWidth="1.2" />
          <circle cx="20" cy="10.5" r="3" fill="#f2c14e" />
          <path d="M0 10.5 H6 M34 10.5 H40" stroke="#fff3cf" strokeWidth="1" />
        </pattern>
      </defs>
    </svg>
  );
}

// León guardián (石狮) sentado sobre su pedestal, de perfil
function Leon({ x, dir = 1 }) {
  return (
    <g transform={`translate(${x} 96) scale(${dir} 1)`}>
      <rect x="-15" y="20" width="30" height="13" rx="1.5" fill="url(#tq-marmol)" stroke="#a9997a" strokeWidth=".8" />
      <rect x="-17" y="17" width="34" height="4" rx="1" fill="#f6efdf" stroke="#a9997a" strokeWidth=".6" />
      <path d="M-11 17 V6 Q-11 -2 -4 -4 Q-6 -12 1 -14 Q9 -15 10 -7 Q12 -3 9 1 L6 3 Q11 6 11 12 V17Z" fill="url(#tq-leon)" stroke="#8a7a5a" strokeWidth=".8" />
      <circle cx="-3" cy="-9" r="3" fill="#d9ccae" stroke="#8a7a5a" strokeWidth=".6" />
      <circle cx="-6" cy="-3" r="2.6" fill="#d9ccae" stroke="#8a7a5a" strokeWidth=".6" />
      <circle cx="-7" cy="3" r="2.4" fill="#d9ccae" stroke="#8a7a5a" strokeWidth=".6" />
      <circle cx="5" cy="-8" r="1" fill="#3b2416" />
      <path d="M6 13 Q10 9 14 12 Q13 17 7 17Z" fill="#c9bc9e" stroke="#8a7a5a" strokeWidth=".6" />
      <circle cx="12" cy="11" r="3" fill="#c8961e" opacity=".9" />
    </g>
  );
}

// Escalinata y basamento de mármol (须弥座): balaustrada, frisos de loto, escalera con barandillas,
// leones guardianes e incensario de bronce con humo
function Basamento() {
  const postes = [];
  for (let x = 12; x <= 488; x += 22) if (x < 172 || x > 328) postes.push(x);
  const paneles = [24, 84, 144, 296, 356, 416];
  return (
    <svg viewBox="0 0 500 132" preserveAspectRatio="xMidYMin meet">
      <defs>
        <linearGradient id="tq-marmol" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fdf8ec" />
          <stop offset="1" stopColor="#cfc2a4" />
        </linearGradient>
        <linearGradient id="tq-leon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbf4e4" />
          <stop offset="1" stopColor="#bfb08f" />
        </linearGradient>
        <linearGradient id="tq-dingbr" x1="0" x2="1">
          <stop offset="0" stopColor="#5a3a12" />
          <stop offset=".45" stopColor="#e2b04a" />
          <stop offset="1" stopColor="#6b4410" />
        </linearGradient>
        <pattern id="tq-loto" width="12" height="7" patternUnits="userSpaceOnUse">
          <rect width="12" height="7" fill="#efe6d3" />
          <path d="M0 7 Q6 -2 12 7" fill="#fbf6ea" stroke="#b9a888" strokeWidth=".8" />
        </pattern>
        <pattern id="tq-loto-inv" width="12" height="7" patternUnits="userSpaceOnUse">
          <rect width="12" height="7" fill="#e6dcc4" />
          <path d="M0 0 Q6 9 12 0" fill="#f4ecda" stroke="#b9a888" strokeWidth=".8" />
        </pattern>
        <linearGradient id="tq-peldano" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf6ea" />
          <stop offset=".7" stopColor="#e3d8be" />
          <stop offset="1" stopColor="#b9a888" />
        </linearGradient>
      </defs>
      {/* balaustrada de la terraza */}
      <path d="M4 7 H172 M328 7 H496" stroke="#fbf6ea" strokeWidth="4" strokeLinecap="round" />
      <path d="M4 15 H172 M328 15 H496" stroke="#d9ccae" strokeWidth="2.4" />
      {postes.map((x) => (
        <g key={x}>
          <rect x={x - 2.6} y="3" width="5.2" height="19" fill="#f6efdf" stroke="#a9997a" strokeWidth=".6" />
          <path d={`M${x - 3.6} 3 Q${x} -4 ${x + 3.6} 3Z`} fill="#fdf8ec" stroke="#a9997a" strokeWidth=".6" />
        </g>
      ))}
      {/* superficie y frente del basamento */}
      <path d="M0 26 L6 20 H494 L500 26Z" fill="#fdf8ec" />
      <rect x="0" y="26" width="500" height="6" fill="url(#tq-marmol)" />
      <rect x="2" y="32" width="496" height="7" fill="url(#tq-loto)" />
      <rect x="8" y="39" width="484" height="26" fill="#e7dcc3" />
      {paneles.map((x) => (
        <g key={x}>
          <rect x={x} y="42" width="52" height="20" rx="1.5" fill="#ddd1b5" stroke="#bfb08f" strokeWidth=".8" />
          <path d={`M${x + 10} 52 q8 -7 16 0 q8 7 16 0`} fill="none" stroke="#c8961e" strokeWidth="1.1" opacity=".75" />
        </g>
      ))}
      <rect x="2" y="65" width="496" height="7" fill="url(#tq-loto-inv)" />
      <rect x="0" y="72" width="500" height="8" fill="url(#tq-marmol)" />
      {/* escalinata */}
      {[0, 1, 2, 3, 4, 5, 6].map((n) => (
        <rect key={n} x={176 - n * 6} y={80 + n * 7} width={148 + n * 12} height="7" fill="url(#tq-peldano)" />
      ))}
      <path d="M226 80 H274 L282 129 H218Z" fill="#f6efdf" stroke="#bfb08f" strokeWidth=".8" />
      <path d="M236 90 q14 -8 28 0 q-14 8 -28 0Z M232 104 q18 -9 36 0 q-18 9 -36 0Z M229 118 q21 -9 42 0" fill="none" stroke="#c8961e" strokeWidth="1.1" opacity=".85" />
      {/* barandillas de la escalera */}
      <path d="M172 76 L134 128 M328 76 L366 128" stroke="#f6efdf" strokeWidth="7" strokeLinecap="round" />
      <path d="M172 76 L134 128 M328 76 L366 128" stroke="#a9997a" strokeWidth="1" strokeDasharray="1 9" />
      <rect x="166" y="66" width="11" height="14" rx="1.5" fill="#fdf8ec" stroke="#a9997a" strokeWidth=".7" />
      <rect x="323" y="66" width="11" height="14" rx="1.5" fill="#fdf8ec" stroke="#a9997a" strokeWidth=".7" />
      {/* leones guardianes */}
      <Leon x={96} dir={1} />
      <Leon x={404} dir={-1} />
      {/* incensario (鼎) con humo */}
      <g>
        <path className="tq-humo" d="M250 100 q-6 -10 0 -18 q6 -8 0 -18" fill="none" stroke="#fff6e0" strokeWidth="2.4" strokeLinecap="round" opacity=".55" />
        <path className="tq-humo is-b" d="M254 100 q6 -9 0 -17 q-6 -8 1 -16" fill="none" stroke="#fff6e0" strokeWidth="1.8" strokeLinecap="round" opacity=".45" />
        <path d="M238 104 H262 Q262 118 250 118 Q238 118 238 104Z" fill="url(#tq-dingbr)" stroke="#3b2416" strokeWidth=".8" />
        <rect x="236" y="101" width="28" height="4" rx="1" fill="#e2b04a" stroke="#3b2416" strokeWidth=".6" />
        <path d="M240 101 V95 H244 V101 M256 101 V95 H260 V101" fill="none" stroke="#c8961e" strokeWidth="1.6" />
        <path d="M242 117 L240 125 M250 118 V126 M258 117 L260 125" stroke="#6b4410" strokeWidth="2.2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

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
  return (
    <section ref={ref} className={`tq-templo tq--${sala.id}${visto ? " is-visto" : ""}`} style={{ "--sala": sala.color, "--tinta": sala.tinta, "--k": k, "--col": k % 2 }} aria-label={`${sala.es} · ${sala.zh}`}>
      <span className="tq-aura" aria-hidden="true" />
      <div className="tq-tejado" aria-hidden="true">
        <Tejado id={sala.id} />
        <span className="tq-farol is-izq">
          <i />
        </span>
        <span className="tq-farol is-der">
          <i />
        </span>
      </div>
      <header className="tq-placa">
        <b translate="no">{sala.zh}</b>
        <h2>{sala.es}</h2>
      </header>
      <div className="tq-salon">
        <span className="tq-col is-izq" aria-hidden="true" />
        <span className="tq-col is-der" aria-hidden="true" />
        <span className="tq-guala" aria-hidden="true" />
        <span className="tq-queti is-izq" aria-hidden="true" />
        <span className="tq-queti is-der" aria-hidden="true" />
        <div className="tq-interior" data-sello={sala.sello}>
          <span className="tq-luz" aria-hidden="true" />
          <p className="tq-rasgo">
            <i translate="no">{sala.sello}</i> {sala.rasgo} · {sala.rasgoZh}
          </p>
          <div className="tq-familias">{children}</div>
        </div>
        <div className="tq-puertas" aria-hidden="true">
          <i className="is-izq">
            <b translate="no">{sala.sello}</b>
          </i>
          <i className="is-der">
            <b translate="no">{sala.sello}</b>
          </i>
        </div>
      </div>
      <div className="tq-base">
        <Basamento />
        <span className="tq-cuenta">
          <span className="tq-cuenta__barra" style={{ "--p": total ? oidas / total : 0 }} aria-hidden="true" />
          {oidas}/{total} sílabas escuchadas · 已听音节
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
