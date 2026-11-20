// Portadas ilustradas del Pabellón de juegos: una escena SVG distinta por juego.
// Oro metálico, laca, luces y sombras con degradados propios de cada portada (ids únicos con useId).
// Todas las animaciones son CSS (transform/opacity) en styles/juegos-hub.css (.jh-p-*).
import * as React from "react";

const ROJO = "#c8102e";
const ORO = "#f2c14e";
const CREMA = "#fff4dc";
const TINTA = "#3b2416";

const Ctx = React.createContext((n) => n);
const useG = () => React.useContext(Ctx);

function Defs() {
  const g = useG();
  const lin = (id, stops, h = false) => (
    <linearGradient id={g(id)} x1="0" y1="0" x2={h ? 1 : 0} y2={h ? 0 : 1}>
      {stops.map(([o, c, op = 1]) => (
        <stop key={o} offset={o} stopColor={c} stopOpacity={op} />
      ))}
    </linearGradient>
  );
  const rad = (id, stops) => (
    <radialGradient id={g(id)}>
      {stops.map(([o, c, op = 1]) => (
        <stop key={o} offset={o} stopColor={c} stopOpacity={op} />
      ))}
    </radialGradient>
  );
  return (
    <defs>
      {lin("oro", [
        ["0", "#fff6cf"],
        [".3", "#f6cf5f"],
        [".62", "#c8961e"],
        ["1", "#7a4f12"],
      ])}
      {lin(
        "oroH",
        [
          ["0", "#7a4f12"],
          [".25", "#f2c14e"],
          [".5", "#fff6cf"],
          [".75", "#e0a83a"],
          ["1", "#7a4f12"],
        ],
        true,
      )}
      {lin("laca", [
        ["0", "#ff6a6a"],
        [".35", "#d61a36"],
        ["1", "#6d0a18"],
      ])}
      {lin("jade", [
        ["0", "#b6f0c8"],
        [".4", "#3fae6a"],
        ["1", "#0f3d24"],
      ])}
      {lin("azul", [
        ["0", "#8fb0ee"],
        [".4", "#2c5bb0"],
        ["1", "#0e1a40"],
      ])}
      {lin("crema", [
        ["0", "#fffdf6"],
        ["1", "#e6d2a6"],
      ])}
      {lin("brilloSup", [
        ["0", "#fff", ".55"],
        [".5", "#fff", "0"],
      ])}
      {lin("madera", [
        ["0", "#b5793a"],
        ["1", "#5a3416"],
      ])}
      {rad("sombra", [
        ["0", "#000", ".6"],
        ["1", "#000", "0"],
      ])}
      {rad("halo", [
        ["0", "#fff4c2", ".95"],
        [".35", "#ffd76a", ".45"],
        ["1", "#ffb84a", "0"],
      ])}
      {rad("haloRojo", [
        ["0", "#ffb08a", ".9"],
        [".4", "#ff5a4a", ".35"],
        ["1", "#ff3a3a", "0"],
      ])}
      {rad("haloJade", [
        ["0", "#e6fff0", ".95"],
        [".4", "#7be0a6", ".45"],
        ["1", "#2fae6a", "0"],
      ])}
      {lin("foco", [
        ["0", "#fff6cf", ".5"],
        [".7", "#ffe39a", ".08"],
        ["1", "#ffe39a", "0"],
      ])}
      {lin("cieloOcaso", [
        ["0", "#1a0a3a"],
        [".4", "#6a1a5a"],
        [".72", "#e0604a"],
        ["1", "#ffcf6a"],
      ])}
      {lin("tintaOro", [
        ["0", "#1a0e08"],
        [".55", "#2a1408"],
        [".8", "#8a5a1e"],
        ["1", "#f2c14e"],
      ])}
      {lin(
        "estela",
        [
          ["0", "#fff6cf", ".9"],
          ["1", "#ffb84a", "0"],
        ],
        true,
      )}
      <filter id={g("bloom")} x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="3.2" />
      </filter>
      <filter id={g("dof")} x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="1.6" />
      </filter>
      {rad("terciopelo", [
        ["0", "#3fae6a"],
        [".6", "#1d6339"],
        ["1", "#0c3a22"],
      ])}
      {lin("cieloNoche", [
        ["0", "#0b1030"],
        [".55", "#3a1a4a"],
        ["1", "#8f0c21"],
      ])}
      {lin("atardecer", [
        ["0", "#3a0a24"],
        [".45", "#b4232f"],
        [".8", "#f6b06a"],
        ["1", "#ffe39a"],
      ])}
      {lin("pelo", [
        ["0", "#fff4dc"],
        [".35", "#8a6a4a"],
        [".7", "#1a0e08"],
        ["1", "#000"],
      ])}
      {lin(
        "lacaH",
        [
          ["0", "#6d0a18"],
          [".45", "#e0485a"],
          ["1", "#6d0a18"],
        ],
        true,
      )}
      <radialGradient id={g("mesa")} cx=".5" cy=".35" r=".8">
        <stop offset="0" stopColor="#d61a36" />
        <stop offset=".55" stopColor="#7a0a1c" />
        <stop offset="1" stopColor="#2a0408" />
      </radialGradient>
      <radialGradient id={g("farol")} cx=".4" cy=".35" r=".7">
        <stop offset="0" stopColor="#fff6c8" />
        <stop offset=".4" stopColor="#ffb347" />
        <stop offset="1" stopColor="#c8102e" />
      </radialGradient>
      <radialGradient id={g("bola")} cx=".35" cy=".3" r=".7">
        <stop offset="0" stopColor="#fffbe6" />
        <stop offset=".35" stopColor="#ffe08a" />
        <stop offset=".8" stopColor="#e0a92a" />
        <stop offset="1" stopColor="#7a4f12" />
      </radialGradient>
      <radialGradient id={g("vineta")} cx=".5" cy=".45" r=".75">
        <stop offset=".55" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity=".6" />
      </radialGradient>
    </defs>
  );
}
const u = (g, n) => `url(#${g(n)})`;

// Piezas comunes
const Vineta = () => {
  const g = useG();
  return <rect width="320" height="180" fill={u(g, "vineta")} pointerEvents="none" />;
};
function Rayos({ cx = 160, cy = 90, n = 16, color = "#ffe39a", op = 0.16, r = 260 }) {
  const paths = Array.from({ length: n }, (_, i) => {
    const a0 = (i / n) * Math.PI * 2;
    const a1 = a0 + Math.PI / n;
    return `M${cx} ${cy}L${cx + r * Math.cos(a0)} ${cy + r * Math.sin(a0)}L${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)}Z`;
  });
  return (
    <g className="jh-p-rayos" style={{ transformOrigin: `${cx}px ${cy}px` }} opacity={op}>
      <path d={paths.join("")} fill={color} />
    </g>
  );
}
function Chispas({ pts, color = "#fff6d0" }) {
  return pts.map(([x, y, s = 1], i) => (
    <path
      key={i}
      className="jh-p-chispa"
      style={{ "--d": `${(i * 0.53) % 2.4}s`, transformOrigin: `${x}px ${y}px` }}
      d={`M${x} ${y - 6 * s}L${x + 1.5 * s} ${y - 1.5 * s}L${x + 6 * s} ${y}L${x + 1.5 * s} ${y + 1.5 * s}L${x} ${y + 6 * s}L${x - 1.5 * s} ${y + 1.5 * s}L${x - 6 * s} ${y}L${x - 1.5 * s} ${y - 1.5 * s}Z`}
      fill={color}
    />
  ));
}
const Sombra = ({ cx, cy, rx, ry = 6, op = 1 }) => {
  const g = useG();
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={u(g, "sombra")} opacity={op} />;
};
// Ficha 3D (cara superior + canto)
function Ficha({ x, y, w = 34, h = 40, letra, pts, color = ROJO, canto = "#b07a2a", size = 22 }) {
  const g = useG();
  return (
    <g>
      <rect x={x} y={y + 5} width={w} height={h} rx="6" fill={canto} />
      <rect x={x} y={y} width={w} height={h} rx="6" fill={u(g, "crema")} stroke="#c8961e" strokeWidth="1" />
      <rect x={x + 2} y={y + 2} width={w - 4} height={h / 2 - 2} rx="4" fill={u(g, "brilloSup")} />
      {letra && (
        <text x={x + w / 2} y={y + h / 2 + size * 0.36} textAnchor="middle" fontSize={size} fontWeight="900" fill={color} fontFamily="Georgia, serif">
          {letra}
        </text>
      )}
      {pts && (
        <text x={x + w - 5} y={y + h - 5} textAnchor="end" fontSize="8" fontWeight="800" fill="#8a5a1e">
          {pts}
        </text>
      )}
    </g>
  );
}

/* ---------- 1 · Kahoot: plató de concurso ---------- */
function Kahoot() {
  const g = useG();
  const gemas = [
    ["laca", "#7a0a1c", "M0 -9 9 7H-9z"],
    ["jade", "#0f3d24", "M0 -9 9 0 0 9-9 0z"],
    ["azul", "#0e1a40", "M0 -9a9 9 0 1 0 .1 0z"],
    ["oro", "#7a4f12", "M-8 -8h16v16h-16z"],
  ];
  return (
    <>
      <rect width="320" height="180" fill="#4a0612" />
      <Rayos cx={160} cy={70} op={0.2} />
      <path className="jh-p-foco" d="M20 0 70 0 150 170 40 170z" fill={u(g, "halo")} opacity=".25" />
      <path className="jh-p-foco is-b" d="M300 0 250 0 170 170 280 170z" fill={u(g, "halo")} opacity=".25" />
      <ellipse cx="160" cy="176" rx="190" ry="26" fill="#2a030a" />
      <ellipse cx="160" cy="176" rx="190" ry="26" fill="none" stroke={u(g, "oroH")} strokeWidth="2" />
      <circle className="jh-p-latido" style={{ transformOrigin: "160px 66px" }} cx="160" cy="66" r="62" fill={u(g, "halo")} opacity=".7" />
      <circle cx="160" cy="66" r="44" fill="#3a0510" stroke={u(g, "oroH")} strokeWidth="6" />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1="160" y1="28" x2="160" y2={i % 3 ? 33 : 36} stroke={ORO} strokeWidth="2" transform={`rotate(${i * 30} 160 66)`} />
      ))}
      <g className="jh-p-anillo" style={{ transformOrigin: "160px 66px" }}>
        <circle cx="160" cy="66" r="37" fill="none" stroke="#ffde7a" strokeWidth="4" strokeDasharray="150 90" strokeLinecap="round" />
      </g>
      <path className="jh-p-rayo" d="M168 36 142 72h16l-9 30 30-40h-17z" fill={u(g, "oro")} stroke="#5a3416" strokeWidth="2" strokeLinejoin="round" />
      {gemas.map(([c, canto, sym], i) => {
        const x = 30 + i * 68;
        return (
          <g key={c} className="jh-p-resp" style={{ "--d": `${i * 0.35}s`, transformOrigin: `${x + 29}px 146px` }}>
            <rect x={x} y="134" width="58" height="30" rx="8" fill={canto} />
            <rect x={x} y="128" width="58" height="30" rx="8" fill={u(g, c)} stroke={u(g, "oroH")} strokeWidth="1.5" />
            <rect x={x + 3} y="130" width="52" height="11" rx="5" fill={u(g, "brilloSup")} />
            <path d={sym} transform={`translate(${x + 29} 143)`} fill={CREMA} />
          </g>
        );
      })}
      {[
        [40, "#ffde7a"],
        [90, "#ff6a6a"],
        [130, "#7be0a6"],
        [200, "#8fb0ee"],
        [240, "#ffde7a"],
        [285, "#ff6a6a"],
        [70, "#8fb0ee"],
        [265, "#7be0a6"],
      ].map(([x, c], i) => (
        <rect key={i} className="jh-p-confeti" style={{ "--d": `${(i * 0.41) % 3}s`, transformOrigin: `${x}px -6px` }} x={x} y="-10" width="5" height="9" rx="1" fill={c} />
      ))}
      <Chispas
        pts={[
          [60, 40],
          [262, 52, 0.8],
          [214, 22, 0.7],
        ]}
      />
      <Vineta />
    </>
  );
}

/* ---------- 2 · Ruleta de feria imperial ---------- */
function Ruleta() {
  const g = useG();
  const fills = ["laca", "crema", "jade", "oro", "laca", "crema", "azul", "oro"];
  const R = 60;
  const seg = (i) => {
    const a0 = (i / 8) * Math.PI * 2 - Math.PI / 2;
    const a1 = ((i + 1) / 8) * Math.PI * 2 - Math.PI / 2;
    return `M160 86L${160 + R * Math.cos(a0)} ${86 + R * Math.sin(a0)}A${R} ${R} 0 0 1 ${160 + R * Math.cos(a1)} ${86 + R * Math.sin(a1)}Z`;
  };
  return (
    <>
      <rect width="320" height="180" fill="#3a0510" />
      <Rayos cx={160} cy={86} n={20} op={0.22} />
      <circle cx="160" cy="86" r="100" fill={u(g, "haloRojo")} opacity=".55" />
      <g transform="translate(16 12) scale(0.9)">
        <Sombra cx={160} cy={170} rx={70} ry={8} />
        <path d="M140 140 126 168h68l-14-28z" fill={u(g, "oro")} stroke="#5a3416" strokeWidth="1.5" />
        <rect x="118" y="164" width="84" height="8" rx="3" fill={u(g, "oroH")} />
        <circle cx="160" cy="86" r="74" fill={u(g, "oroH")} />
        <circle cx="160" cy="86" r="67" fill="#2a030a" />
        <g className="jh-p-rueda" style={{ transformOrigin: "160px 86px" }}>
          {fills.map((f, i) => (
            <path key={i} d={seg(i)} fill={u(g, f)} stroke="#5a3416" strokeWidth="1.2" />
          ))}
          {["sí", "pan", "sol", "mar", "yo", "luz", "té", "rey"].map((w, i) => (
            <text key={w} x="160" y="42" textAnchor="middle" fontSize="11" fontWeight="900" fill={fills[i] === "crema" || fills[i] === "oro" ? TINTA : CREMA} transform={`rotate(${i * 45 + 22.5} 160 86)`}>
              {w}
            </text>
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <line key={i} x1="160" y1="86" x2="160" y2="26" stroke={u(g, "oroH")} strokeWidth="2" transform={`rotate(${i * 45} 160 86)`} />
          ))}
        </g>
        <ellipse cx="140" cy="60" rx="40" ry="22" fill="#fff" opacity=".1" transform="rotate(-30 140 60)" />
        <circle cx="160" cy="86" r="15" fill={u(g, "oro")} stroke="#5a3416" strokeWidth="1.5" />
        <circle cx="160" cy="86" r="7" fill={u(g, "laca")} />
        <circle cx="157.5" cy="83.5" r="2.2" fill="#fff" opacity=".8" />
        {Array.from({ length: 16 }, (_, i) => {
          const a = (i / 16) * Math.PI * 2;
          return <circle key={i} className="jh-p-bombilla" style={{ "--d": `${(i % 2) * 0.6}s` }} cx={160 + 70.5 * Math.cos(a)} cy={86 + 70.5 * Math.sin(a)} r="3" fill="#fff6c4" />;
        })}
        <g>
          <path d="M160 26 148 4h24z" fill={u(g, "oro")} stroke="#5a3416" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="160" cy="9" r="4" fill={u(g, "laca")} />
        </g>
      </g>
      <Chispas
        pts={[
          [46, 40],
          [276, 34, 0.9],
          [270, 130, 0.7],
          [52, 140, 0.8],
        ]}
      />
      <Vineta />
    </>
  );
}

/* ---------- 3 · Ahorcado: linternas en la noche del palacio ---------- */
function Ahorcado() {
  const g = useG();
  const yCurva = (x) => {
    const t = x / 320;
    return (1 - t) * (1 - t) * 18 + 2 * (1 - t) * t * 62 + t * t * 18;
  };
  const letras = [
    [64, "H"],
    [128, "O", true],
    [192, "L"],
    [256, "A", true],
  ];
  return (
    <>
      <rect width="320" height="180" fill={u(g, "azul")} />
      <rect width="320" height="180" fill="#0b1430" opacity=".45" />
      <circle cx="282" cy="34" r="46" fill={u(g, "halo")} opacity=".5" />
      <circle cx="282" cy="34" r="16" fill="#fff4cf" />
      <circle cx="288" cy="30" r="14" fill="#fff9e6" opacity=".6" />
      {[
        [24, 20],
        [96, 12],
        [168, 30],
        [214, 10],
        [40, 70],
        [300, 80],
        [150, 8],
      ].map(([x, y], i) => (
        <circle key={i} className="jh-p-estrella" style={{ "--d": `${i * 0.5}s` }} cx={x} cy={y} r="1.4" fill="#fff" />
      ))}
      {[
        [50, 70, 146, 26],
        [160, 96, 136, 36],
        [272, 76, 148, 24],
      ].map(([cx, w, y, h]) => (
        <g key={cx}>
          <rect x={cx - w / 2 + 8} y={y + 8} width={w - 16} height={180 - y} fill="#070d22" />
          <path d={`M${cx - w / 2 - 12} ${y + 10}Q${cx - w / 2} ${y + 8} ${cx - w / 2 + 8} ${y}H${cx + w / 2 - 8}Q${cx + w / 2} ${y + 8} ${cx + w / 2 + 12} ${y + 10}Z`} fill="#0b1430" stroke="#c8961e" strokeWidth=".8" />
          {h > 30 && (
            <path
              d={`M${cx - w / 2 + 8} ${y - 8}Q${cx - w / 2 + 14} ${y - 10} ${cx - w / 2 + 20} ${y - 16}H${cx + w / 2 - 20}Q${cx + w / 2 - 14} ${y - 10} ${cx + w / 2 - 8} ${y - 8}Z`}
              fill="#0b1430"
              stroke="#c8961e"
              strokeWidth=".8"
            />
          )}
        </g>
      ))}
      <rect x="0" y="168" width="320" height="12" fill="#050918" />
      {[30, 62, 142, 172, 252, 290].map((x, i) => (
        <rect key={x} className="jh-p-ventana" style={{ "--d": `${i * 0.7}s` }} x={x} y="160" width="7" height="9" rx="1" fill="#ffcf6a" opacity=".85" />
      ))}
      <path d="M0 18Q160 106 320 18" fill="none" stroke="#c8961e" strokeWidth="1.5" />
      {letras.map(([x, l, oculta], i) => {
        const y = yCurva(x);
        return (
          <g key={x} className="jh-p-linterna" style={{ transformOrigin: `${x}px ${y}px`, "--d": `${-i * 0.9}s` }}>
            <line x1={x} y1={y} x2={x} y2={y + 12} stroke={ORO} strokeWidth="1.5" />
            <circle cx={x} cy={y + 40} r="36" fill={u(g, "haloRojo")} className="jh-p-brilla" style={{ "--d": `${i * 0.4}s` }} />
            <rect x={x - 9} y={y + 11} width="18" height="6" rx="2" fill={u(g, "oro")} />
            <ellipse cx={x} cy={y + 38} rx="24" ry="22" fill={u(g, "laca")} stroke="#ffcf6a" strokeWidth="1.2" />
            <ellipse cx={x} cy={y + 38} rx="13" ry="22" fill="none" stroke="#7a0a1c" strokeWidth="1.5" opacity=".7" />
            <path d={`M${x - 24} ${y + 38}h48`} stroke="#7a0a1c" strokeWidth="1" opacity=".6" />
            <ellipse cx={x - 8} cy={y + 28} rx="7" ry="9" fill="#fff" opacity=".18" />
            <rect x={x - 9} y={y + 58} width="18" height="6" rx="2" fill={u(g, "oro")} />
            <path d={`M${x - 4} ${y + 64}l-2 14M${x} ${y + 64}v16M${x + 4} ${y + 64}l2 14`} stroke={ORO} strokeWidth="1.5" />
            {oculta ? (
              <>
                <text className="jh-p-interroga" style={{ "--d": `${i * 0.6}s` }} x={x} y={y + 46} textAnchor="middle" fontSize="22" fontWeight="900" fill="#ffe39a" fontFamily="Georgia, serif">
                  ?
                </text>
                <text className="jh-p-letra" style={{ "--d": `${i * 0.6}s` }} x={x} y={y + 46} textAnchor="middle" fontSize="22" fontWeight="900" fill={CREMA} fontFamily="Georgia, serif">
                  {l}
                </text>
              </>
            ) : (
              <text x={x} y={y + 46} textAnchor="middle" fontSize="22" fontWeight="900" fill={CREMA} fontFamily="Georgia, serif">
                {l}
              </text>
            )}
          </g>
        );
      })}
      <Vineta />
    </>
  );
}

/* ---------- 4 · Sopa de letras: pergamino y pincel ---------- */
function Sopa() {
  const g = useG();
  const filas = ["GATOPS", "RMESAL", "AZULIO", "NPERRO"];
  return (
    <>
      <rect width="320" height="180" fill={u(g, "jade")} />
      <Rayos cx={160} cy={90} n={18} op={0.12} color="#e6fff0" />
      <Sombra cx={160} cy={168} rx={130} ry={9} />
      <rect x="58" y="22" width="204" height="140" fill={u(g, "crema")} />
      <rect x="58" y="22" width="204" height="140" fill="none" stroke="#c8961e" strokeWidth="1" />
      <rect x="64" y="28" width="192" height="128" fill="none" stroke={ROJO} strokeWidth=".8" opacity=".5" />
      {[44, 276].map((x) => (
        <g key={x}>
          <rect x={x} y="16" width="14" height="152" rx="5" fill={u(g, "madera")} />
          <rect x={x} y="16" width="14" height="152" rx="5" fill={u(g, "brilloSup")} opacity=".5" />
          <rect x={x - 2} y="10" width="18" height="9" rx="3" fill={u(g, "oro")} />
          <rect x={x - 2} y="165" width="18" height="9" rx="3" fill={u(g, "oro")} />
        </g>
      ))}
      {filas.map((f, r) =>
        f.split("").map((ch, c) => (
          <text key={`${r}${c}`} x={88 + c * 29} y={56 + r * 28} textAnchor="middle" fontSize="19" fontWeight="700" fill={TINTA} fontFamily="Georgia, serif">
            {ch}
          </text>
        )),
      )}
      <rect className="jh-p-tinta" x="72" y="36" width="124" height="27" rx="13.5" fill="none" stroke={ROJO} strokeWidth="3" strokeDasharray="320" pathLength="320" />
      <rect className="jh-p-tinta is-b" x="102" y="120" width="156" height="27" rx="13.5" fill="none" stroke="#1d6339" strokeWidth="3" strokeDasharray="320" pathLength="320" />
      <g className="jh-p-lupa" style={{ transformOrigin: "236px 100px" }}>
        <path d="M250 116 272 140" stroke={u(g, "laca")} strokeWidth="9" strokeLinecap="round" />
        <circle cx="236" cy="100" r="24" fill={u(g, "halo")} opacity=".35" />
        <circle cx="236" cy="100" r="21" fill="rgba(220,245,255,.25)" stroke={u(g, "oroH")} strokeWidth="5" />
        <path d="M222 92a16 16 0 0 1 12-10" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".85" />
      </g>
      <Chispas
        pts={[
          [30, 30, 0.8],
          [296, 150, 0.8],
        ]}
      />
      <Vineta />
    </>
  );
}

/* ---------- 5 · Palabra desordenada: fichas que vuelan ---------- */
function Scramble() {
  const g = useG();
  const t = [
    ["B", 52, 70, -14, "3"],
    ["O", 100, 40, 10, "1"],
    ["L", 146, 74, -6, "1"],
    ["R", 192, 36, 16, "1"],
    ["I", 238, 66, -10, "1"],
  ];
  return (
    <>
      <rect width="320" height="180" fill={u(g, "laca")} />
      <rect width="320" height="180" fill="#3a0510" opacity=".35" />
      <Rayos cx={160} cy={80} n={22} op={0.18} />
      <circle cx="160" cy="80" r="90" fill={u(g, "halo")} opacity=".35" />
      <path className="jh-p-flecha" d="M60 130C110 160 210 160 260 130" fill="none" stroke="#ffe39a" strokeWidth="2.5" strokeDasharray="5 6" strokeLinecap="round" />
      <path d="M254 124 262 131 252 135" fill="none" stroke="#ffe39a" strokeWidth="2.5" strokeLinecap="round" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={86 + i * 31} y="150" width="25" height="22" rx="4" fill="rgba(0,0,0,.25)" stroke="#ffe39a" strokeWidth="1.2" strokeDasharray="3 3" />
      ))}
      {t.map(([l, x, y, r, p], i) => (
        <g key={l} className="jh-p-ficha" style={{ "--d": `${i * 0.22}s`, "--x": `${[-10, 8, -6, 10, -8][i]}px`, transformOrigin: `${x + 18}px ${y + 22}px` }}>
          <Sombra cx={x + 18} cy={y + 56} rx={18} ry={4} op={0.6} />
          <g transform={`rotate(${r} ${x + 18} ${y + 22})`}>
            <Ficha x={x} y={y} w={36} h={42} letra={l} pts={p} size={24} />
          </g>
        </g>
      ))}
      <Chispas
        pts={[
          [34, 30],
          [290, 28, 0.8],
          [300, 110, 0.7],
          [20, 120, 0.7],
        ]}
      />
      <Vineta />
    </>
  );
}

/* ---------- 6 · Memory: fichas de jade ---------- */
function Memory() {
  const g = useG();
  const cartas = [
    ["sol", "太阳"],
    ["perro", "狗"],
    ["casa", "家"],
  ];
  return (
    <>
      <rect width="320" height="180" fill={u(g, "jade")} />
      <rect width="320" height="180" fill="#082a18" opacity=".55" />
      <Rayos cx={160} cy={90} n={16} op={0.1} color="#e6fff0" />
      <path className="jh-p-enlace" d="M110 58C160 20 160 150 210 118" fill="none" stroke="#ffe39a" strokeWidth="2.5" strokeDasharray="4 6" strokeLinecap="round" />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const x = 46 + (i % 3) * 82;
        const y = i < 3 ? 18 : 98;
        const [es, zh] = cartas[i % 3];
        const gira = i === 0 || i === 5;
        const caraTxt = i === 0 ? cartas[0][0] : i === 5 ? cartas[0][1] : i < 3 ? es : zh;
        return (
          <g key={i} className={`jh-p-carta${gira ? " is-gira" : ""}`} style={{ transformOrigin: `${x + 32}px ${y + 34}px`, "--d": i === 5 ? "1.6s" : "0s" }}>
            <Sombra cx={x + 32} cy={y + 72} rx={30} ry={4} op={0.5} />
            <rect x={x} y={y + 5} width="64" height="66" rx="9" fill="#0f3d24" />
            <g className="jh-p-carta__dorso">
              <rect x={x} y={y} width="64" height="66" rx="9" fill={u(g, "jade")} stroke={u(g, "oroH")} strokeWidth="2" />
              <rect x={x + 6} y={y + 6} width="52" height="54" rx="6" fill="none" stroke="#ffe39a" strokeWidth="1" opacity=".7" />
              <circle cx={x + 32} cy={y + 33} r="15" fill="#0f3d24" opacity=".5" />
              <text x={x + 32} y={y + 41} textAnchor="middle" fontSize="22" fill="#ffe39a" fontFamily="STKaiti, KaiTi, serif">
                忆
              </text>
              <rect x={x + 3} y={y + 3} width="58" height="22" rx="6" fill={u(g, "brilloSup")} opacity=".7" />
            </g>
            <g className="jh-p-carta__cara">
              <circle cx={x + 32} cy={y + 33} r="44" fill={u(g, "halo")} opacity=".6" />
              <rect x={x} y={y} width="64" height="66" rx="9" fill={u(g, "crema")} stroke={u(g, "oroH")} strokeWidth="2.5" />
              <text x={x + 32} y={y + 40} textAnchor="middle" fontSize={/[a-z]/.test(caraTxt) ? 15 : 19} fontWeight="900" fill={/[a-z]/.test(caraTxt) ? TINTA : ROJO} fontFamily="Georgia, serif">
                {caraTxt}
              </text>
            </g>
          </g>
        );
      })}
      <Chispas
        pts={[
          [24, 90, 0.8],
          [300, 90, 0.8],
          [160, 92, 0.9],
        ]}
      />
      <Vineta />
    </>
  );
}

/* ---------- 7 · Palacio de las palabras: tablero de laca ---------- */
/* PalacioPalabras: ver «Portadas de los juegos nuevos» más abajo */

/* ---------- 8 · UNO: mesa de terciopelo ---------- */
function Uno() {
  const g = useG();
  const cartas = [
    ["laca", "7", -32],
    ["oro", "+2", -16],
    ["jade", "3", 0],
    ["azul", "↺", 16],
    ["laca", "9", 32],
  ];
  return (
    <>
      <rect width="320" height="180" fill="#0e1a40" />
      <circle cx="160" cy="70" r="150" fill={u(g, "azul")} opacity=".6" />
      <Rayos cx={160} cy={110} n={18} op={0.12} color="#cfe0ff" />
      <ellipse cx="160" cy="190" rx="220" ry="60" fill="#5a0814" />
      <ellipse cx="160" cy="190" rx="220" ry="60" fill="none" stroke={u(g, "oroH")} strokeWidth="3" />
      {[
        [44, 160],
        [62, 168],
        [270, 162],
      ].map(([x, y], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y + 2} rx="11" ry="5" fill="#2a030a" />
          <ellipse cx={x} cy={y} rx="11" ry="5" fill={u(g, "oroH")} />
          <rect x={x - 2.5} y={y - 1.5} width="5" height="3" fill="#7a4f12" />
        </g>
      ))}
      {cartas.map(([c, n, a], i) => (
        <g key={i} className="jh-p-abanico" style={{ "--a": `${a}deg`, "--a2": `${a * 1.5}deg`, transformOrigin: "160px 200px" }}>
          <rect x="128" y="42" width="64" height="94" rx="9" fill="#000" opacity=".35" transform="translate(3 4)" />
          <rect x="128" y="42" width="64" height="94" rx="9" fill={u(g, "crema")} />
          <rect x="132" y="46" width="56" height="86" rx="7" fill={u(g, c)} />
          <ellipse cx="160" cy="89" rx="20" ry="32" fill={CREMA} transform="rotate(28 160 89)" />
          <text x="160" y="99" textAnchor="middle" fontSize="27" fontWeight="900" fill="#2a030a" fontFamily="Georgia, serif">
            {n}
          </text>
          <text x="137" y="61" fontSize="12" fontWeight="900" fill={CREMA}>
            {n}
          </text>
          <path d="M132 46h56v28c-20-8-38-8-56 4z" fill="#fff" opacity=".18" />
        </g>
      ))}
      <g className="jh-p-vuela" style={{ transformOrigin: "262px 54px" }}>
        <g transform="rotate(22 262 54)">
          <rect x="238" y="22" width="46" height="66" rx="7" fill={u(g, "crema")} />
          <rect x="241" y="25" width="40" height="60" rx="5" fill={u(g, "laca")} />
          <circle cx="261" cy="55" r="13" fill="none" stroke={u(g, "oroH")} strokeWidth="2.5" />
          <text x="261" y="61" textAnchor="middle" fontSize="15" fill="#ffe39a" fontFamily="STKaiti, KaiTi, serif">
            牌
          </text>
        </g>
      </g>
      <Chispas
        pts={[
          [230, 92, 0.7],
          [292, 20, 0.8],
          [34, 40, 0.8],
        ]}
      />
      <Vineta />
    </>
  );
}

/* ---------- 9 · Mapa mental: árbol de pincel ---------- */
function MapaMental() {
  const g = useG();
  const ramas = [
    [70, 48, "comer", "吃"],
    [246, 46, "beber", "喝"],
    [70, 140, "fruta", "水果"],
    [236, 142, "pan", "面包"],
    [160, 26, "agua", "水"],
  ];
  return (
    <>
      <rect width="320" height="180" fill="#0c3029" />
      <circle cx="160" cy="96" r="150" fill={u(g, "jade")} opacity=".45" />
      <Rayos cx={160} cy={96} n={14} op={0.1} color="#e6fff0" />
      {ramas.map(([x, y], i) => {
        const mx = (160 + x) / 2;
        return (
          <g key={i}>
            <path d={`M160 96Q${mx} ${y + 34} ${x} ${y}`} fill="none" stroke="#7a4f12" strokeWidth="7" strokeLinecap="round" />
            <path d={`M160 96Q${mx} ${y + 34} ${x} ${y}`} fill="none" stroke={u(g, "oroH")} strokeWidth="4" strokeLinecap="round" />
            <path className="jh-p-rama" d={`M160 96Q${mx} ${y + 34} ${x} ${y}`} fill="none" stroke="#fff6cf" strokeWidth="2" strokeDasharray="2 12" strokeLinecap="round" />
          </g>
        );
      })}
      <circle className="jh-p-latido" style={{ transformOrigin: "160px 96px" }} cx="160" cy="96" r="48" fill={u(g, "haloRojo")} opacity=".7" />
      <circle cx="160" cy="96" r="30" fill={u(g, "oroH")} />
      <circle cx="160" cy="96" r="25" fill={u(g, "laca")} />
      <text x="160" y="94" textAnchor="middle" fontSize="11" fontWeight="900" fill={CREMA}>
        comida
      </text>
      <text x="160" y="108" textAnchor="middle" fontSize="11" fill="#ffe39a" fontFamily="STKaiti, KaiTi, serif">
        食物
      </text>
      {ramas.map(([x, y, w, zh], i) => (
        <g key={w} className="jh-p-nodo" style={{ "--d": `${i * 0.3}s`, transformOrigin: `${x}px ${y}px` }}>
          <circle cx={x} cy={y} r="26" fill={u(g, "haloJade")} opacity=".55" />
          <rect x={x - 30} y={y - 14} width="60" height="28" rx="14" fill={u(g, "jade")} stroke={u(g, "oroH")} strokeWidth="2" />
          <rect x={x - 27} y={y - 12} width="54" height="10" rx="5" fill={u(g, "brilloSup")} />
          <text x={x} y={y + 1} textAnchor="middle" fontSize="11" fontWeight="900" fill={CREMA}>
            {w}
          </text>
          <text x={x} y={y + 11} textAnchor="middle" fontSize="8" fill="#ffe39a">
            {zh}
          </text>
        </g>
      ))}
      <Vineta />
    </>
  );
}

/* ---------- 10 · Teatro: ópera de Pekín ---------- */
function Teatro() {
  const g = useG();
  const pliegues = (x0, dir) => Array.from({ length: 5 }, (_, i) => <path key={i} d={`M${x0 + dir * i * 22} 0c${dir * 6} 50 ${dir * 2} 110 ${dir * 10} 152`} stroke="#5a0814" strokeWidth="5" fill="none" opacity=".55" />);
  return (
    <>
      <rect width="320" height="180" fill="#120406" />
      <path className="jh-p-foco" d="M160 0 92 160h136z" fill={u(g, "halo")} opacity=".5" />
      <ellipse cx="160" cy="160" rx="90" ry="12" fill={u(g, "halo")} opacity=".5" />
      <rect x="0" y="152" width="320" height="28" fill={u(g, "madera")} />
      <rect x="0" y="150" width="320" height="3" fill={u(g, "oroH")} />
      <g className="jh-p-mascara" style={{ transformOrigin: "132px 96px" }}>
        <path d="M108 64c16-10 32-10 48 0 2 30-6 54-24 56-18-2-26-26-24-56z" fill={u(g, "laca")} stroke={u(g, "oroH")} strokeWidth="2" />
        <path d="M112 76q8-8 16-2M136 74q8-6 16 2" stroke="#120406" strokeWidth="4" fill="none" strokeLinecap="round" />
        <ellipse cx="122" cy="86" rx="5" ry="3" fill={CREMA} />
        <ellipse cx="142" cy="86" rx="5" ry="3" fill={CREMA} />
        <path d="M132 64v40" stroke="#ffe39a" strokeWidth="2" opacity=".8" />
        <path d="M122 104q10 6 20 0" stroke="#120406" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M110 66q-6 20 4 40M154 66q6 20-4 40" stroke="#120406" strokeWidth="2" fill="none" opacity=".6" />
      </g>
      <g className="jh-p-mascara is-b" style={{ transformOrigin: "190px 100px" }}>
        <path d="M166 70c16-10 32-10 48 0 2 30-6 54-24 56-18-2-26-26-24-56z" fill={u(g, "crema")} stroke={u(g, "oroH")} strokeWidth="2" />
        <path d="M170 82q8-6 16 0M194 82q8-6 16 0" stroke="#1d3768" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M176 92q4-4 8 0M198 92q4-4 8 0" stroke="#120406" strokeWidth="2.5" fill="none" />
        <path d="M172 98q-2 10 6 14M208 98q2 10-6 14" stroke={ROJO} strokeWidth="3" fill="none" opacity=".8" />
        <path d="M182 112q8-5 16 0" stroke={ROJO} strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      <g className="jh-p-telon is-izq">
        <path d="M0 0h108c-12 44-4 112 12 152H0z" fill={u(g, "laca")} />
        {pliegues(18, 1)}
        <path d="M104 96c-14 4-24 2-32-4" stroke={u(g, "oroH")} strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      <g className="jh-p-telon is-der">
        <path d="M320 0H212c12 44 4 112-12 152h138z" fill={u(g, "laca")} />
        {pliegues(302, -1)}
        <path d="M216 96c14 4 24 2 32-4" stroke={u(g, "oroH")} strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      <path d="M0 0h320v20c-16 10-38 10-53 0-16 10-38 10-53 0-16 10-38 10-54 0-16 10-38 10-53 0-16 10-38 10-53 0-16 10-38 10-54 0z" fill="#7a0a1c" />
      <path d="M0 20c16 10 38 10 54 0 15 10 37 10 53 0 15 10 37 10 53 0 16 10 38 10 54 0 15 10 37 10 53 0 15 10 37 10 53 0" stroke={u(g, "oroH")} strokeWidth="2.5" fill="none" />
      {[54, 107, 160, 214, 267].map((x) => (
        <path key={x} d={`M${x} 22v10`} stroke={ORO} strokeWidth="2" />
      ))}
      <Chispas
        pts={[
          [160, 40, 0.8],
          [110, 140, 0.6],
          [214, 142, 0.6],
        ]}
      />
      <Vineta />
    </>
  );
}

/* ---------- 11 · Dragón de jade: cielo nocturno ---------- */
function DragonJade() {
  const g = useG();
  return (
    <>
      <rect width="320" height="180" fill="#070b1e" />
      <circle cx="230" cy="40" r="170" fill={u(g, "azul")} opacity=".5" />
      <ellipse cx="160" cy="80" rx="220" ry="26" fill={u(g, "halo")} opacity=".14" transform="rotate(-18 160 80)" />
      <circle cx="52" cy="40" r="44" fill={u(g, "halo")} opacity=".5" />
      <circle cx="52" cy="40" r="17" fill="#fff4cf" />
      {[
        [110, 20],
        [140, 60],
        [210, 18],
        [300, 30],
        [290, 150],
        [20, 130],
        [176, 160],
        [250, 96],
      ].map(([x, y], i) => (
        <circle key={i} className="jh-p-estrella" style={{ "--d": `${i * 0.4}s` }} cx={x} cy={y} r="1.5" fill="#fff" />
      ))}
      <image className="jh-p-nube" href="./theme/nube-oro.png" x="-20" y="138" width="130" height="46" opacity=".55" />
      <image className="jh-p-nube is-b" href="./theme/nube-oro.png" x="210" y="146" width="120" height="42" opacity=".45" />
      <circle cx="140" cy="92" r="70" fill={u(g, "haloJade")} opacity=".25" />
      <image className="jh-p-dragon" href="./theme/dragon-luz.webp" x="56" y="10" width="170" height="160" preserveAspectRatio="xMidYMid meet" style={{ transformOrigin: "140px 90px" }} />
      {[
        [252, 60, "agua"],
        [276, 112, "luz"],
        [222, 146, "sol"],
      ].map(([x, y, w], i) => (
        <g key={w} className="jh-p-perla" style={{ "--d": `${i * 0.5}s`, transformOrigin: `${x}px ${y}px` }}>
          <circle cx={x} cy={y} r="24" fill={u(g, "haloJade")} />
          <circle cx={x} cy={y} r="13" fill={u(g, "jade")} stroke={u(g, "oroH")} strokeWidth="1.5" />
          <ellipse cx={x - 4} cy={y - 5} rx="5" ry="3" fill="#fff" opacity=".7" />
          <text x={x} y={y + 4} textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#fff">
            {w}
          </text>
        </g>
      ))}
      <Chispas
        pts={[
          [200, 40, 0.7],
          [300, 76, 0.6],
          [120, 150, 0.6],
        ]}
        color="#c9ffe0"
      />
      <Vineta />
    </>
  );
}

/* ---------- 12 · Escape del palacio: puerta de la Ciudad Prohibida ---------- */
function EscapePalacio() {
  const g = useG();
  const tejado = (y, w, h) => (
    <g>
      <path
        d={`M${160 - w / 2 - 14} ${y + h}Q${160 - w / 2} ${y + h - 4} ${160 - w / 2 + 10} ${y}H${160 + w / 2 - 10}Q${160 + w / 2} ${y + h - 4} ${160 + w / 2 + 14} ${y + h}Z`}
        fill={u(g, "oro")}
        stroke="#7a4f12"
        strokeWidth="1"
      />
      {Array.from({ length: Math.floor(w / 9) }, (_, i) => (
        <path key={i} d={`M${160 - w / 2 + 8 + i * 9} ${y + 1}v${h - 3}`} stroke="#a8761e" strokeWidth="1.2" opacity=".7" />
      ))}
      <path d={`M${160 - w / 2 - 14} ${y + h}H${160 + w / 2 + 14}`} stroke="#5a3416" strokeWidth="2" />
    </g>
  );
  return (
    <>
      <rect width="320" height="180" fill="#5a0814" />
      <path d="M0 0h320v120H0z" fill={u(g, "laca")} opacity=".5" />
      <circle cx="160" cy="96" r="120" fill={u(g, "halo")} opacity=".6" />
      <circle cx="160" cy="70" r="30" fill="#fff1b8" opacity=".55" />
      <rect x="0" y="104" width="320" height="56" fill="#8f0c21" />
      <rect x="0" y="100" width="320" height="6" fill={u(g, "oro")} />
      {tejado(30, 150, 18)}
      <rect x="92" y="48" width="136" height="20" fill="#8f0c21" />
      {[100, 130, 190, 220].map((x) => (
        <rect key={x} x={x - 3} y="48" width="6" height="20" fill={u(g, "laca")} />
      ))}
      {tejado(64, 186, 20)}
      <rect x="62" y="84" width="196" height="76" fill={u(g, "laca")} />
      <rect className="jh-p-luz" x="128" y="98" width="64" height="62" rx="2" fill="#fff6cf" />
      <rect className="jh-p-luz" x="110" y="98" width="100" height="70" fill={u(g, "halo")} />
      <g className="jh-p-puerta is-izq" style={{ transformOrigin: "128px 130px" }}>
        <rect x="128" y="98" width="32" height="62" fill={u(g, "laca")} stroke={u(g, "oroH")} strokeWidth="1.5" />
        {[0, 1, 2, 3, 4].map((r) => [0, 1, 2].map((c) => <circle key={`${r}${c}`} cx={134 + c * 10} cy={106 + r * 11} r="2.4" fill={u(g, "oro")} />))}
        <circle cx="155" cy="130" r="4" fill="none" stroke={u(g, "oroH")} strokeWidth="2" />
      </g>
      <g className="jh-p-puerta is-der" style={{ transformOrigin: "192px 130px" }}>
        <rect x="160" y="98" width="32" height="62" fill={u(g, "laca")} stroke={u(g, "oroH")} strokeWidth="1.5" />
        {[0, 1, 2, 3, 4].map((r) => [0, 1, 2].map((c) => <circle key={`${r}${c}`} cx={166 + c * 10} cy={106 + r * 11} r="2.4" fill={u(g, "oro")} />))}
        <circle cx="165" cy="130" r="4" fill="none" stroke={u(g, "oroH")} strokeWidth="2" />
      </g>
      <path d="M128 98a32 18 0 0 1 64 0" fill="none" stroke={u(g, "oroH")} strokeWidth="2" />
      <rect x="50" y="160" width="220" height="20" fill="#e9dcc0" />
      <rect x="70" y="166" width="180" height="2" fill="#c8b48a" />
      <rect x="86" y="172" width="148" height="2" fill="#c8b48a" />
      {[80, 240].map((x, i) => (
        <g key={x} className="jh-p-linterna" style={{ transformOrigin: `${x}px 86px`, "--d": `${-i}s` }}>
          <line x1={x} y1="86" x2={x} y2="94" stroke={ORO} strokeWidth="1.5" />
          <circle cx={x} cy="106" r="18" fill={u(g, "haloRojo")} />
          <ellipse cx={x} cy="106" rx="10" ry="12" fill={u(g, "laca")} stroke="#ffcf6a" strokeWidth="1" />
          <rect x={x - 4} y="92" width="8" height="3" fill={ORO} />
          <rect x={x - 4} y="117" width="8" height="3" fill={ORO} />
        </g>
      ))}
      <g className="jh-p-llave" style={{ transformOrigin: "286px 70px" }}>
        <circle cx="286" cy="70" r="22" fill={u(g, "halo")} opacity=".8" />
        <circle cx="286" cy="58" r="9" fill="none" stroke={u(g, "oroH")} strokeWidth="4" />
        <path d="M286 67v26m0-8h7m-7 6h5" stroke={u(g, "oro")} strokeWidth="4" strokeLinecap="round" />
      </g>
      <g>
        <rect x="16" y="20" width="34" height="18" rx="9" fill="rgba(42,3,10,.6)" stroke={ORO} strokeWidth="1" />
        <text x="33" y="33" textAnchor="middle" fontSize="11" fontWeight="900" fill="#ffe39a">
          1/5
        </text>
      </g>
      <Chispas
        pts={[
          [300, 30, 0.7],
          [20, 90, 0.6],
          [160, 18, 0.8],
        ]}
      />
      <Vineta />
    </>
  );
}

/* ---------- 13 · Fichas del palacio: pirámide de fichas de marfil sobre laca ---------- */
function FichasPalacio() {
  const g = useG();
  const ficha = (x, y, txt, color, key, extra = "") => (
    <g key={key} className={extra}>
      <rect x={x + 3} y={y + 4} width="26" height="34" rx="4" fill="#0d2a18" opacity=".55" />
      <rect x={x + 2.4} y={y + 2.4} width="26" height="34" rx="4" fill={u(g, "jade")} />
      <rect x={x + 1.2} y={y + 1.2} width="26" height="34" rx="4" fill="#d9c08a" />
      <rect x={x} y={y} width="26" height="34" rx="4" fill={u(g, "crema")} stroke="#b08a48" strokeWidth=".6" />
      <rect x={x + 2} y={y + 2} width="22" height="30" rx="3" fill="none" stroke="#e8d3a2" strokeWidth=".8" />
      <text x={x + 13} y={y + 22} textAnchor="middle" fontSize={txt.length > 2 ? 8 : 14} fontWeight="800" fill={color} fontFamily="STKaiti, KaiTi, serif">
        {txt}
      </text>
    </g>
  );
  const capa0 = [
    [58, 104, "猫", ROJO], [84, 104, "sol", TINTA], [110, 104, "书", ROJO], [136, 104, "yo", "#1d6339"], [162, 104, "水", ROJO], [188, 104, "luna", TINTA], [214, 104, "茶", ROJO], [240, 104, "té", TINTA],
    [84, 70, "el", "#1d6339"], [110, 70, "月", ROJO], [136, 70, "agua", TINTA], [162, 70, "soy", TINTA], [188, 70, "日", ROJO], [214, 70, "gato", TINTA],
  ];
  const capa1 = [[103, 60, "我", ROJO], [129, 60, "libro", TINTA], [155, 60, "家", ROJO], [181, 60, "casa", TINTA]];
  const capa2 = [[142, 52, "中", ROJO]];
  return (
    <>
      <rect width="320" height="180" fill="#3a0610" />
      <rect width="320" height="180" fill={u(g, "laca")} opacity=".55" />
      <circle cx="160" cy="80" r="130" fill={u(g, "halo")} opacity=".35" />
      <Rayos cx={160} cy={74} n={18} op={0.1} />
      <rect x="10" y="10" width="300" height="160" rx="12" fill="none" stroke={ORO} strokeWidth="1.4" opacity=".7" />
      <rect x="14" y="14" width="292" height="152" rx="10" fill="none" stroke={ORO} strokeWidth=".6" opacity=".5" />
      <ellipse cx="160" cy="150" rx="130" ry="10" fill={u(g, "sombra")} />
      {capa0.map(([x, y, t, c], i) => ficha(x, y, t, c, `a${i}`))}
      {capa1.map(([x, y, t, c], i) => ficha(x - 6, y - 6, t, c, `b${i}`))}
      {capa2.map(([x, y, t, c], i) => ficha(x - 12, y - 14, t, c, `c${i}`, "jh-p-ficha-cima"))}
      <g className="jh-p-ficha-vuela is-izq">{ficha(18, 40, "sol", TINTA, "v1")}</g>
      <g className="jh-p-ficha-vuela is-der">{ficha(276, 40, "日", ROJO, "v2")}</g>
      <circle className="jh-p-destello" cx="160" cy="30" r="16" fill={u(g, "halo")} />
      <Chispas
        pts={[
          [160, 22, 0.9],
          [40, 150, 0.6],
          [290, 140, 0.6],
        ]}
      />
      <Vineta />
    </>
  );
}

/* =====================================================================
   Portadas de los juegos nuevos (Brisca, Viaje, Pincel, Pinball, Palacio)
   Nivel «cartel»: cámara cerca, luz con bloom, profundidad de campo
   (primer plano desenfocado), brasas que suben e ilustraciones del proyecto.
   ===================================================================== */

// Cubo isométrico (dado) con puntos: cada cara se dibuja en coordenadas 0..1 con una matriz
const PIPS = {
  1: [[0.5, 0.5]],
  2: [[0.27, 0.27], [0.73, 0.73]],
  3: [[0.25, 0.25], [0.5, 0.5], [0.75, 0.75]],
  4: [[0.27, 0.27], [0.73, 0.27], [0.27, 0.73], [0.73, 0.73]],
  5: [[0.25, 0.25], [0.75, 0.25], [0.5, 0.5], [0.25, 0.75], [0.75, 0.75]],
  6: [[0.27, 0.22], [0.73, 0.22], [0.27, 0.5], [0.73, 0.5], [0.27, 0.78], [0.73, 0.78]],
};
function Dado({ cx, cy, a = 22, caras = [1, 3, 5], sombra = true }) {
  const ex = [a * 0.87, a * 0.5];
  const ey = [-a * 0.87, a * 0.5];
  const ez = [0, a];
  const T = [cx, cy - a];
  const add = (...v) => v.reduce((p, q) => [p[0] + q[0], p[1] + q[1]], [0, 0]);
  const neg = (v) => [-v[0], -v[1]];
  const cara = (O, U, V, fill, n, key) => (
    <g key={key} transform={`matrix(${U[0]} ${U[1]} ${V[0]} ${V[1]} ${O[0]} ${O[1]})`}>
      <rect x="0.02" y="0.02" width="0.96" height="0.96" rx="0.18" fill={fill} />
      {PIPS[n].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={n === 1 ? 0.14 : 0.095} fill={n === 1 ? ROJO : TINTA} />
      ))}
    </g>
  );
  return (
    <g>
      {sombra && <ellipse cx={cx} cy={cy + a * 1.15} rx={a * 1.2} ry={a * 0.3} fill="#000" opacity=".4" />}
      {cara(T, ex, ey, "#fffdf6", caras[0], "t")}
      {cara(add(T, ey), ex, ez, "#ecd9ae", caras[1], "l")}
      {cara(add(T, ex, ey), neg(ey), ez, "#c39e5e", caras[2], "r")}
      <path d={`M${T[0] + ey[0] + 1} ${T[1] + ey[1]}L${T[0] + ex[0] + ey[0]} ${T[1] + ex[1] + ey[1] - 0.5}L${T[0] + ex[0] - 1} ${T[1] + ex[1]}`} stroke="#fff" strokeWidth=".8" fill="none" opacity=".8" />
    </g>
  );
}

// Brasas doradas que suben (partículas de luz)
function Brasas({ pts, color = "#ffd27a" }) {
  return pts.map(([x, y, r = 1.2], i) => <circle key={i} className="jh-p-brasa" style={{ "--d": `${-((i * 0.83) % 4.2)}s` }} cx={x} cy={y} r={r} fill={color} />);
}
// Fuegos artificiales
function Fuego({ x, y, r = 16, color = "#ffe39a", d = 0 }) {
  const n = 12;
  return (
    <g className="jh-p-fuegoart" style={{ transformOrigin: `${x}px ${y}px`, "--d": `${d}s` }}>
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2;
        return <line key={i} x1={x + Math.cos(a) * r * 0.35} y1={y + Math.sin(a) * r * 0.35} x2={x + Math.cos(a) * r} y2={y + Math.sin(a) * r} stroke={color} strokeWidth="1.4" strokeLinecap="round" />;
      })}
      <circle cx={x} cy={y} r={r * 0.22} fill="#fff" />
    </g>
  );
}

/* ---------- 14 · Brisca del Rey Mono: abanico de naipes bajo el foco, monedas de oro al vuelo ---------- */
function Brisca() {
  const g = useG();
  const filete = (x, y, w, h, cortes) => {
    const seg = [];
    const n = cortes + 1;
    const hueco = 4;
    const tramo = (w - cortes * hueco) / n;
    for (let i = 0; i < n; i++) {
      const sx = x + i * (tramo + hueco);
      seg.push(`M${sx} ${y}h${tramo}M${sx} ${y + h}h${tramo}`);
    }
    return <path d={`${seg.join("")}M${x} ${y}v${h}M${x + w} ${y}v${h}`} stroke="#c8102e" strokeWidth="1.1" fill="none" />;
  };
  const moneda = (cx, cy, r = 11) => (
    <g>
      <circle cx={cx} cy={cy + 1.5} r={r + 1.5} fill="#5a3412" />
      <circle cx={cx} cy={cy} r={r + 1.2} fill="#7a4f12" />
      <circle cx={cx} cy={cy} r={r} fill={u(g, "oro")} />
      <circle cx={cx} cy={cy} r={r * 0.7} fill="none" stroke="#a8761e" strokeWidth={r * 0.08} />
      <path d={`M${cx} ${cy - r * 0.5}l${r * 0.18} ${r * 0.32}l${r * 0.32} ${r * 0.18}l${-r * 0.32} ${r * 0.18}l${-r * 0.18} ${r * 0.32}l${-r * 0.18} ${-r * 0.32}l${-r * 0.32} ${-r * 0.18}l${r * 0.32} ${-r * 0.18}z`} fill="#c8102e" />
      <ellipse cx={cx - r * 0.35} cy={cy - r * 0.42} rx={r * 0.38} ry={r * 0.17} fill="#fff" opacity=".65" />
    </g>
  );
  const copa = (cx, cy) => (
    <g>
      <path d={`M${cx - 12} ${cy - 14}h24c0 12-5 17-12 18-7-1-12-6-12-18z`} fill={u(g, "oro")} stroke="#7a4f12" strokeWidth=".8" />
      <path d={`M${cx - 9} ${cy - 10}h18c-1 7-4 10-9 11-5-1-8-4-9-11z`} fill="#c8102e" />
      <ellipse cx={cx} cy={cy - 14} rx="12" ry="2.6" fill="#fff1b8" stroke="#7a4f12" strokeWidth=".6" />
      <rect x={cx - 2} y={cy + 4} width="4" height="7" fill={u(g, "oro")} />
      <circle cx={cx} cy={cy + 6} r="2.6" fill="#2f8f52" />
      <path d={`M${cx - 9} ${cy + 15}q9-6 18 0z`} fill={u(g, "oro")} stroke="#7a4f12" strokeWidth=".6" />
    </g>
  );
  const espada = (cx, cy) => (
    <g transform={`rotate(-20 ${cx} ${cy})`}>
      <path d={`M${cx} ${cy - 26}l3.6 6v24h-7.2v-24z`} fill="#eef3fb" stroke="#2a3a58" strokeWidth=".8" />
      <path d={`M${cx} ${cy - 22}v22`} stroke="#9fb0cc" strokeWidth="1" />
      <path d={`M${cx - 11} ${cy + 4}q11-4 22 0q-3 4-11 4t-11-4z`} fill={u(g, "oro")} stroke="#7a4f12" strokeWidth=".6" />
      <rect x={cx - 2} y={cy + 7} width="4" height="10" rx="1" fill="#2c4f8f" />
      <circle cx={cx} cy={cy + 19} r="2.8" fill={u(g, "oro")} />
    </g>
  );
  const basto = (cx, cy) => (
    <g transform={`rotate(24 ${cx} ${cy})`}>
      <path d={`M${cx - 3.5} ${cy + 22}l-1.5-33q5-9 9-2l-1 35q-3 3-6.5 0z`} fill="#9a6526" stroke="#4a2a12" strokeWidth=".8" />
      {[-14, -4, 6, 15].map((dy, i) => (
        <circle key={dy} cx={cx + (i % 2 ? 3 : -3)} cy={cy + dy} r="1.7" fill="#5a3416" />
      ))}
      <path d={`M${cx + 3} ${cy - 8}q9-7 11 2q-7 2-11-2z`} fill="#2f8f52" />
      <path d={`M${cx - 4} ${cy + 2}q-10-3-10 5q7 1 10-5z`} fill="#3fae6a" />
    </g>
  );
  // Naipe grande (62 × 94), pivote del abanico abajo
  const naipe = (key, a, a2, num, cortes, dibujo, figura = false) => (
    <g key={key} className="jh-p-abanico" style={{ "--a": `${a}deg`, "--a2": `${a2}deg`, transformOrigin: "160px 206px" }}>
      <rect x="131" y="62" width="62" height="94" rx="7" fill="#000" opacity=".4" transform="translate(3 4)" />
      {figura && <rect x="125" y="52" width="70" height="106" rx="10" fill="#ffd76a" filter={u(g, "bloom")} opacity=".9" />}
      <rect x="129" y="58" width="62" height="94" rx="7" fill={u(g, "crema")} stroke={u(g, "oroH")} strokeWidth={figura ? 2.4 : 1.4} />
      <rect x="131" y="60" width="58" height="44" rx="5" fill={u(g, "brilloSup")} opacity=".5" />
      {filete(135, 69, 50, 76, cortes)}
      <text x="137" y="67" fontSize="8.5" fontWeight="900" fill={ROJO} fontFamily="Georgia, serif">
        {num}
      </text>
      <text x="184" y="151" textAnchor="end" fontSize="8.5" fontWeight="900" fill={ROJO} fontFamily="Georgia, serif">
        {num}
      </text>
      {figura ? dibujo : <g transform="translate(160 106) scale(1.2) translate(-160 -106)">{dibujo}</g>}
    </g>
  );
  return (
    <>
      <rect width="320" height="180" fill="#240307" />
      <rect width="320" height="180" fill={u(g, "laca")} opacity=".45" />
      <circle cx="160" cy="70" r="170" fill={u(g, "halo")} opacity=".42" />
      <Rayos cx={160} cy={96} n={22} op={0.14} />
      {/* Cono del foco */}
      <path d="M128 -4h64l90 184H38z" fill={u(g, "foco")} />
      {/* Tapete */}
      <ellipse cx="160" cy="182" rx="220" ry="66" fill="#3a0510" />
      <ellipse cx="160" cy="178" rx="214" ry="64" fill={u(g, "oroH")} />
      <ellipse cx="160" cy="180" rx="206" ry="60" fill={u(g, "terciopelo")} />
      <ellipse cx="160" cy="150" rx="120" ry="24" fill="#b6f0c8" opacity=".18" />
      {/* Mazo de cartas con el triunfo cruzado */}
      <g transform="rotate(-12 44 136)">
        <g transform="rotate(90 44 140)">
          <rect x="26" y="114" width="36" height="54" rx="4" fill={u(g, "crema")} stroke="#b08a48" />
          <g transform="translate(44 140) scale(.8) translate(-44 -140)">{copa(44, 140)}</g>
        </g>
        {[8, 6, 4, 2, 0].map((o) => (
          <rect key={o} x={26 - o * 0.4} y={108 - o} width="36" height="54" rx="4" fill={o ? "#6b0918" : u(g, "laca")} stroke={u(g, "oro")} strokeWidth="1" />
        ))}
        <rect x="29" y="101" width="30" height="48" rx="2.5" fill="none" stroke="#ffcf6a" strokeWidth=".8" strokeDasharray="2 2" />
        <circle cx="44" cy="125" r="10" fill="#8f0c21" stroke={u(g, "oroH")} strokeWidth="1.6" />
        <text x="44" y="130" textAnchor="middle" fontSize="13" fontWeight="700" fill={CREMA} fontFamily="STKaiti, KaiTi, serif">
          悟
        </text>
      </g>
      {/* Torre de monedas */}
      <g>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <ellipse cx="276" cy={158 - i * 5} rx="17" ry="5.5" fill="#6a3f10" />
            <ellipse cx="276" cy={156 - i * 5} rx="17" ry="5.5" fill={u(g, "oroH")} />
          </g>
        ))}
        <ellipse cx="276" cy="131" rx="17" ry="5.5" fill="#ffe39a" />
        <rect x="272.5" y="129.5" width="7" height="3" fill="#8f0c21" />
      </g>
      {/* Abanico de naipes */}
      <circle className="jh-p-latido" style={{ transformOrigin: "160px 100px" }} cx="160" cy="100" r="80" fill={u(g, "halo")} opacity=".6" />
      {naipe(0, -48, -58, "1", 0, moneda(160, 104, 14))}
      {naipe(1, -24, -30, "3", 1, copa(160, 104))}
      {naipe(2, 24, 30, "7", 2, espada(160, 104))}
      {naipe(3, 48, 58, "5", 3, basto(160, 104))}
      {naipe(
        4,
        0,
        0,
        "12",
        0,
        <g>
          <rect x="135" y="69" width="50" height="76" rx="2" fill="#8f0c21" />
          <rect x="135" y="69" width="50" height="76" rx="2" fill={u(g, "halo")} opacity=".8" />
          <image href="./mono/guino.webp" x="135" y="70" width="50" height="75" preserveAspectRatio="xMidYMax slice" />
          <path d="M148 74l3 6 5-8 4 8 5-8 3 6 3-5v8h-23z" fill={u(g, "oro")} stroke="#7a4f12" strokeWidth=".5" />
          {moneda(177, 136, 7)}
        </g>,
        true,
      )}
      {/* Monedas al vuelo */}
      {[
        [228, 44, 9, 0],
        [92, 34, 7, 1],
        [252, 92, 6, 2],
        [70, 76, 5, 3],
      ].map(([x, y, r, i]) => (
        <g key={i} className="jh-p-moneda" style={{ transformOrigin: `${x}px ${y}px`, "--d": `${i * -0.7}s` }}>
          <circle cx={x} cy={y} r={r * 2.4} fill={u(g, "halo")} opacity=".7" />
          {moneda(x, y, r)}
        </g>
      ))}
      {/* Primer plano desenfocado */}
      <g filter={u(g, "dof")} opacity=".95">
        {moneda(14, 168, 22)}
        {moneda(310, 30, 14)}
      </g>
      <Brasas pts={[[110, 150], [200, 160, 1.5], [150, 170], [240, 150], [80, 160, 1], [180, 140, 0.9]]} />
      <Chispas pts={[[212, 56, 0.9], [100, 54, 0.7], [300, 74, 0.6], [24, 40, 0.6]]} />
      <Vineta />
    </>
  );
}

/* ---------- 15 · El viaje del Rey Mono: camino de casillas hacia el Paraíso del Oeste, el Rey Mono en su nube ---------- */
function ViajeMono() {
  const g = useG();
  // Camino serpenteante: tramos Bézier del primer plano al templo
  const tramos = [
    [[14, 186], [130, 190], [292, 176], [252, 144]],
    [[252, 144], [216, 118], [74, 132], [96, 110]],
    [[96, 110], [112, 94], [172, 100], [160, 86]],
  ];
  const bz = ([p0, p1, p2, p3], t) => {
    const m = 1 - t;
    return [0, 1].map((k) => m * m * m * p0[k] + 3 * m * m * t * p1[k] + 3 * m * t * t * p2[k] + t * t * t * p3[k]);
  };
  const muestras = [];
  tramos.forEach((tr, ti) => {
    const n = [8, 7, 5][ti];
    for (let i = ti ? 1 : 0; i <= n; i++) muestras.push(bz(tr, i / n));
  });
  const casillas = muestras.map(([x, y], k) => ({ k, x, y, r: 2.8 + ((y - 84) / 100) * 15 })).sort((a, b) => a.y - b.y);
  const colores = [CREMA, "#2c4f8f", CREMA, ROJO, CREMA, "#2f8f52", CREMA, "#c8961e"];
  const ribbon = muestras.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const pos = (k) => muestras[k];
  return (
    <>
      <rect width="320" height="180" fill={u(g, "cieloOcaso")} />
      {[
        [24, 14], [64, 30], [110, 10], [228, 8], [292, 22], [300, 52], [14, 48],
      ].map(([x, y], i) => (
        <circle key={i} className="jh-p-estrella" style={{ "--d": `${i * 0.35}s` }} cx={x} cy={y} r="1.1" fill="#fff" />
      ))}
      <circle cx="160" cy="58" r="170" fill={u(g, "halo")} opacity=".55" />
      <Rayos cx={160} cy={50} n={26} op={0.2} color="#fff1c2" />
      {/* Montañas lejanas con bruma */}
      <path d="M0 96l30-26 22 14 30-30 34 34 20-12 30 20H0z" fill="#5a2a5e" opacity=".75" />
      <path d="M320 96l-30-30-24 16-26-22-30 30-14-8-24 14h148z" fill="#5a2a5e" opacity=".75" />
      <path d="M0 120q40-28 80-12t70-6 80 10 90-14v82H0z" fill="#3a1640" />
      <ellipse cx="160" cy="112" rx="200" ry="16" fill="#ffe8c8" opacity=".25" />
      {/* Templo del Oeste sobre nubes */}
      <g className="jh-p-templo" style={{ transformOrigin: "160px 84px" }}>
        <circle cx="160" cy="50" r="58" fill="#fff6cf" filter={u(g, "bloom")} opacity=".55" />
        <image href="./theme/templos/campana.webp" x="116" y="6" width="88" height="73" preserveAspectRatio="xMidYMid meet" />
        <image href="./theme/nube-oro.png" x="96" y="66" width="70" height="25" />
        <image href="./theme/nube-oro.png" x="150" y="68" width="76" height="26" />
        <rect x="146" y="80" width="28" height="12" rx="2" fill="#8f0c21" stroke={u(g, "oroH")} strokeWidth="1" />
        <text x="160" y="89.2" textAnchor="middle" fontSize="8" fill="#ffe08a" fontFamily="STKaiti, KaiTi, serif">
          西天
        </text>
      </g>
      <image className="jh-p-nube" href="./theme/nube-oro.png" x="-8" y="70" width="90" height="32" opacity=".8" />
      <image className="jh-p-nube is-b" href="./theme/nube-oro.png" x="236" y="58" width="80" height="28" opacity=".75" />
      {/* Camino */}
      <polyline points={ribbon} fill="none" stroke="#5a3416" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" opacity=".6" />
      <polyline points={ribbon} fill="none" stroke="#ffd76a" strokeWidth="2" strokeLinejoin="round" filter={u(g, "bloom")} />
      <polyline className="jh-p-flecha" points={ribbon} fill="none" stroke="#fff6cf" strokeWidth="1" strokeDasharray="3 4" strokeLinejoin="round" />
      {casillas.map(({ k, x, y, r }) => (
        <g key={k}>
          <ellipse cx={x} cy={y + r * 0.32} rx={r} ry={r * 0.5} fill="#4a2a12" />
          <ellipse cx={x} cy={y} rx={r} ry={r * 0.5} fill={colores[k % colores.length]} stroke={u(g, "oroH")} strokeWidth={0.5 + r * 0.08} />
          <ellipse cx={x - r * 0.3} cy={y - r * 0.18} rx={r * 0.42} ry={r * 0.14} fill="#fff" opacity=".5" />
          {k % 4 === 2 && r > 6 && (
            <text x={x} y={y + r * 0.2} textAnchor="middle" fontSize={r * 0.7} fontWeight="900" fill="#ffe39a">
              ★
            </text>
          )}
        </g>
      ))}
      {/* Fichas */}
      {[
        [pos(5), "#2f8f52", "#b6f0c8", 1],
        [pos(11), "#2c4f8f", "#a8c4f5", 2],
      ].map(([[x, y], c, b, k]) => {
        const s = 0.5 + ((y - 84) / 100) * 1.1;
        return (
          <g key={k} className="jh-p-ficha" style={{ "--d": `${k * 0.7}s`, transformOrigin: `${x}px ${y}px` }}>
            <g transform={`translate(${x} ${y}) scale(${s})`}>
              <ellipse cx="0" cy="0" rx="7" ry="3" fill={c} stroke="#ffe08a" strokeWidth=".7" />
              <path d="M-5 0L-2.2 -12h4.4L5 0z" fill={c} />
              <circle cx="0" cy="-14.5" r="5" fill={b} stroke={c} strokeWidth="1.5" />
              <circle cx="-1.6" cy="-16" r="1.5" fill="#fff" opacity=".85" />
            </g>
          </g>
        );
      })}
      {/* El Rey Mono en su nube voladora */}
      <g className="jh-p-vuelo" style={{ transformOrigin: "262px 112px" }}>
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${206 - i * 6} ${110 + i * 7}h${30 - i * 6}`} stroke="#ffe39a" strokeWidth={2 - i * 0.5} strokeLinecap="round" opacity={0.8 - i * 0.2} />
        ))}
        <circle cx="262" cy="96" r="34" fill={u(g, "halo")} opacity=".8" />
        <image href="./mono/poder.webp" x="238" y="44" width="48" height="85" />
        <image href="./theme/nube-oro.png" x="220" y="108" width="86" height="30" />
      </g>
      {/* Dados en el aire */}
      <g className="jh-p-dado" style={{ transformOrigin: "46px 134px" }}>
        <path d="M18 108q-6 14 8 22" stroke="#fff6cf" strokeWidth="1.4" fill="none" opacity=".6" strokeLinecap="round" />
        <g transform="rotate(-14 46 134)">
          <Dado cx={46} cy={132} a={21} caras={[5, 3, 6]} sombra={false} />
        </g>
      </g>
      <g className="jh-p-dado is-b" style={{ transformOrigin: "104px 70px" }}>
        <g transform="rotate(18 104 70)">
          <Dado cx={104} cy={70} a={11} caras={[1, 4, 2]} sombra={false} />
        </g>
      </g>
      <ellipse cx="50" cy="168" rx="22" ry="5" fill="#000" opacity=".3" />
      <Brasas pts={[[150, 100], [180, 110, 1], [130, 120, 1.4], [210, 100], [170, 130, 0.9], [120, 96, 1]]} color="#fff1b8" />
      <Chispas pts={[[160, 12, 0.9], [204, 34, 0.6], [118, 40, 0.6], [300, 140, 0.6]]} />
      <Vineta />
    </>
  );
}

/* ---------- 16 · Pincel mágico: el pincel dorado escribe 笔 con tinta que se vuelve oro ---------- */
function PincelMagico() {
  const g = useG();
  const fuente = "STKaiti, KaiTi, 'Noto Serif CJK SC', serif";
  return (
    <>
      <rect width="320" height="180" fill="#1e0306" />
      <rect width="320" height="180" fill={u(g, "laca")} opacity=".45" />
      <circle cx="166" cy="84" r="160" fill={u(g, "halo")} opacity=".45" />
      <Rayos cx={166} cy={84} n={24} op={0.13} />
      {/* Montañas a tinta al fondo */}
      <path d="M0 132l26-34 18 18 26-40 30 42 16-12 24 26H0z" fill="#12020a" opacity=".55" />
      <path d="M320 128l-24-38-20 20-24-30-22 30-14-10-24 28h128z" fill="#12020a" opacity=".55" />
      {/* Salpicadura de tinta tras el papel */}
      <path d="M232 26q22-4 18 14t20 18q-10 10-24 0t-20 6q-6-12 6-22t0-16z" fill="#12020a" opacity=".7" />
      <circle cx="270" cy="24" r="3" fill="#12020a" opacity=".7" />
      <circle cx="262" cy="70" r="2" fill="#12020a" opacity=".7" />
      {/* Papel de arroz con cuadrícula 米字格 */}
      <g transform="rotate(-4 166 90)">
        <rect x="96" y="6" width="140" height="160" fill="#000" opacity=".35" transform="translate(4 5)" />
        <rect x="96" y="6" width="140" height="160" fill={u(g, "crema")} />
        <rect x="96" y="6" width="140" height="160" fill={u(g, "halo")} opacity=".35" />
        <rect x="112" y="22" width="108" height="108" fill="none" stroke="#c8102e" strokeWidth="1.8" />
        <path d="M112 22l108 108M220 22L112 130M166 22v108M112 76h108" stroke="#c8102e" strokeWidth=".7" strokeDasharray="3 3" opacity=".5" />
        <defs>
          <clipPath id={g("revela")}>
            <rect className="jh-p-revela" x="104" y="14" width="124" height="124" style={{ transformOrigin: "166px 14px" }} />
          </clipPath>
        </defs>
        <g clipPath={u(g, "revela")}>
          <text x="166" y="117" textAnchor="middle" fontSize="100" fill="none" stroke="#ffcf4a" strokeWidth="7" filter={u(g, "bloom")} opacity=".9" fontFamily={fuente} fontWeight="700">
            笔
          </text>
          <text x="166" y="117" textAnchor="middle" fontSize="100" fill={u(g, "tintaOro")} fontFamily={fuente} fontWeight="700">
            笔
          </text>
        </g>
        {/* Gotas de tinta */}
        {[
          [220, 120, 2.6],
          [212, 134, 1.6],
          [228, 108, 1.4],
          [200, 142, 1],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#1a0e08" />
        ))}
        <g className="jh-p-sello" style={{ transformOrigin: "208px 148px" }}>
          <rect x="196" y="137" width="24" height="24" rx="2" fill={ROJO} />
          <rect x="198" y="139" width="20" height="20" rx="1" fill="none" stroke={CREMA} strokeWidth=".7" />
          <text x="208" y="148" textAnchor="middle" fontSize="8.5" fill={CREMA} fontFamily="STKaiti, KaiTi, serif">
            神
          </text>
          <text x="208" y="157" textAnchor="middle" fontSize="8.5" fill={CREMA} fontFamily="STKaiti, KaiTi, serif">
            笔
          </text>
        </g>
      </g>
      {/* Cinta de luz dorada en espiral */}
      <path d="M214 118c30-6 40-30 30-48s-36-14-34 6 34 18 52-6 18-54 36-58" fill="none" stroke="#ffd76a" strokeWidth="3" filter={u(g, "bloom")} opacity=".9" />
      <path className="jh-p-flecha" d="M214 118c30-6 40-30 30-48s-36-14-34 6 34 18 52-6 18-54 36-58" fill="none" stroke="#fff6cf" strokeWidth="1.3" strokeDasharray="5 4" strokeLinecap="round" />
      {/* El Rey Mono asoma */}
      <g className="jh-p-flota-suave" style={{ transformOrigin: "40px 130px" }}>
        <circle cx="42" cy="122" r="40" fill={u(g, "halo")} opacity=".7" />
        <image href="./mono/saluda.webp" x="4" y="70" width="70" height="125" />
      </g>
      {/* Pincel dorado */}
      <g className="jh-p-pincel2" style={{ transformOrigin: "210px 118px" }}>
        <circle cx="210" cy="118" r="18" fill="#fff1b8" filter={u(g, "bloom")} />
        <g transform="translate(210 118) rotate(36)">
          <path d="M0 0c-6-7-8-18-7-30h14c1 12-1 23-7 30z" fill={u(g, "pelo")} />
          <path d="M-1.5 -5c-2-7-3-14-2-23" stroke="#fff" strokeWidth=".9" opacity=".35" fill="none" />
          <rect x="-8.5" y="-40" width="17" height="11" rx="2.5" fill={u(g, "oroH")} stroke="#7a4f12" strokeWidth=".6" />
          <rect x="-7" y="-140" width="14" height="102" rx="4.5" fill={u(g, "lacaH")} stroke="#4a0612" strokeWidth=".6" />
          {[-132, -96, -56].map((y) => (
            <rect key={y} x="-7.6" y={y} width="15.2" height="5" rx="1.4" fill={u(g, "oroH")} />
          ))}
          <rect x="-2" y="-128" width="2.4" height="84" rx="1.2" fill="#fff" opacity=".4" />
          <path d="M-6 -142h12l-2 -7h-8z" fill={u(g, "oroH")} />
        </g>
        <circle cx="210" cy="118" r="3.6" fill="#fff" />
      </g>
      <Brasas pts={[[230, 110, 1.4], [250, 90], [196, 120, 1], [270, 70, 1.2], [290, 40], [214, 100, 0.9]]} />
      <Chispas pts={[[240, 96, 0.9], [262, 60, 0.8], [300, 22, 0.8], [104, 18, 0.6]]} />
      <Vineta />
    </>
  );
}

/* ---------- 17 · Pinball del dragón: mesa de neón dorado, dragón rojo y oro, bola cometa ---------- */
function PinballDragon() {
  const g = useG();
  const linterna = (x, y, i) => (
    <g key={i} className="jh-p-bumper" style={{ "--d": `${i * 0.4}s`, transformOrigin: `${x}px ${y}px` }}>
      <circle cx={x} cy={y} r="22" fill={u(g, "haloRojo")} />
      <circle cx={x} cy={y} r="16" fill="none" stroke="#ffd76a" strokeWidth="2.4" filter={u(g, "bloom")} />
      <circle cx={x} cy={y} r="16" fill="none" stroke="#fff1b8" strokeWidth="1" />
      <ellipse cx={x} cy={y + 6} rx="11" ry="4" fill="#4a0612" />
      <ellipse cx={x} cy={y} rx="11" ry="10.5" fill={u(g, "farol")} stroke={u(g, "oroH")} strokeWidth="1.6" />
      <rect x={x - 5} y={y - 13} width="10" height="3.5" rx="1.4" fill={u(g, "oro")} />
      <rect x={x - 5} y={y + 9.5} width="10" height="3.5" rx="1.4" fill={u(g, "oro")} />
      <text x={x} y={y + 3.6} textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#8f0c21" fontFamily="STKaiti, KaiTi, serif">
        福
      </text>
    </g>
  );
  const placa = (x, y, w, ok) => (
    <g key={w}>
      {ok && <rect x={x - 30} y={y - 13} width="60" height="25" rx="12.5" fill="#7be0a6" filter={u(g, "bloom")} className="jh-p-latido" style={{ transformOrigin: `${x}px ${y}px` }} />}
      <rect x={x - 25} y={y - 6} width="50" height="17" rx="8.5" fill="#2a0408" />
      <rect x={x - 25} y={y - 9} width="50" height="17" rx="8.5" fill={ok ? u(g, "jade") : u(g, "crema")} stroke={u(g, "oroH")} strokeWidth="1.6" />
      <text x={x} y={y + 2.6} textAnchor="middle" fontSize="9" fontWeight="800" fill={ok ? "#fff" : TINTA}>
        {w}
      </text>
    </g>
  );
  const borde = "M90 6H230Q260 6 267 36L304 180M16 180L53 36Q60 6 90 6";
  const luces = Array.from({ length: 10 }, (_, i) => i / 9);
  return (
    <>
      <rect width="320" height="180" fill="#0d0108" />
      <circle cx="160" cy="54" r="170" fill={u(g, "haloRojo")} opacity=".4" />
      <Rayos cx={160} cy={40} n={18} op={0.12} color="#ffb08a" />
      {/* Mueble y raíles de neón dorado */}
      <path d="M86 2H234Q266 2 274 34L314 180H6L46 34Q54 2 86 2Z" fill="#3a0510" />
      <path d="M94 12H226Q254 12 260 40L294 180H26L60 40Q66 12 94 12Z" fill={u(g, "mesa")} />
      <image href="./theme/nube-oro.png" x="40" y="120" width="70" height="24" opacity=".25" />
      <image href="./theme/nube-oro.png" x="214" y="128" width="70" height="24" opacity=".25" />
      <ellipse cx="160" cy="112" rx="96" ry="40" fill="none" stroke="#ffd76a" strokeWidth=".8" strokeDasharray="2 4" opacity=".55" />
      <path d={borde} fill="none" stroke="#ffcf4a" strokeWidth="6" filter={u(g, "bloom")} opacity=".8" />
      <path d={borde} fill="none" stroke={u(g, "oroH")} strokeWidth="4" />
      <path d="M248 40L282 180M72 40L38 180" stroke="#ffd76a" strokeWidth="1.2" opacity=".8" />
      <path d="M272 150v28" stroke="#c8961e" strokeWidth="6" strokeDasharray="1.4 1.4" />
      {/* Dragón rojo y oro */}
      <circle cx="160" cy="56" r="58" fill={u(g, "halo")} opacity=".6" />
      <circle cx="160" cy="56" r="40" fill="#ffb84a" filter={u(g, "bloom")} opacity=".45" />
      <image className="jh-p-dragon" href="./theme/dragon.webp" x="108" y="4" width="104" height="120" preserveAspectRatio="xMidYMid meet" style={{ transformOrigin: "160px 60px" }} />
      {luces.map((t, i) => (
        <g key={i}>
          <circle className="jh-p-estrella" style={{ "--d": `${i * 0.12}s` }} cx={60 - t * 24} cy={48 + t * 112} r="2.4" fill="#fff1b8" />
          <circle className="jh-p-estrella" style={{ "--d": `${i * 0.12 + 0.6}s` }} cx={260 + t * 24} cy={48 + t * 112} r="2.4" fill="#fff1b8" />
        </g>
      ))}
      {linterna(96, 66, 0)}
      {linterna(224, 66, 1)}
      {placa(104, 108, "hola", false)}
      {placa(216, 108, "adiós", true)}
      {placa(160, 130, "gracias", false)}
      {/* Tirachinas */}
      <path d="M58 130l28 28-15 4z" fill={u(g, "laca")} stroke="#ffd76a" strokeWidth="1.6" />
      <path d="M262 130l-28 28 15 4z" fill={u(g, "laca")} stroke="#ffd76a" strokeWidth="1.6" />
      {/* Flippers */}
      <g className="jh-p-flipper is-izq" style={{ transformOrigin: "100px 164px" }}>
        <path d="M96 158L148 168A4.5 4.5 0 0 1 146 177L94 170A6 6 0 0 1 96 158Z" fill={u(g, "jade")} stroke={u(g, "oroH")} strokeWidth="1.4" />
        <circle cx="100" cy="164" r="3" fill={u(g, "oro")} />
      </g>
      <g className="jh-p-flipper is-der" style={{ transformOrigin: "220px 164px" }}>
        <path d="M224 158L172 168A4.5 4.5 0 0 0 174 177L226 170A6 6 0 0 0 224 158Z" fill={u(g, "jade")} stroke={u(g, "oroH")} strokeWidth="1.4" />
        <circle cx="220" cy="164" r="3" fill={u(g, "oro")} />
      </g>
      {/* Bola cometa con chispas de impacto */}
      <g className="jh-p-bola">
        <path d="M246 88L290 40L294 44L250 94Z" fill={u(g, "estela")} />
        <path d="M246 88L290 40" stroke="#fff6cf" strokeWidth="2" filter={u(g, "bloom")} opacity=".8" />
        <circle cx="246" cy="92" r="16" fill="#fff1b8" filter={u(g, "bloom")} />
        <circle cx="246" cy="92" r="8" fill={u(g, "bola")} />
        <ellipse cx="243" cy="88.5" rx="3" ry="2" fill="#fff" />
      </g>
      <g className="jh-p-impacto" style={{ transformOrigin: "232px 100px" }}>
        {[[-8, -6], [-10, 2], [-4, 9], [4, -10]].map(([dx, dy], i) => (
          <line key={i} x1={232 + dx * 0.4} y1={100 + dy * 0.4} x2={232 + dx} y2={100 + dy} stroke="#fff6cf" strokeWidth="1.4" strokeLinecap="round" />
        ))}
      </g>
      <Brasas pts={[[120, 100], [200, 96, 1.4], [160, 150], [90, 140, 1], [230, 140, 1]]} color="#ffb08a" />
      <Chispas pts={[[160, 18, 0.8], [210, 30, 0.6], [24, 30, 0.6], [298, 30, 0.6]]} />
      <Vineta />
    </>
  );
}

/* ---------- 7 · Palacio de las palabras: palacio dorado, fuegos artificiales y tablero en perspectiva ---------- */
function PalacioPalabras() {
  const g = useG();
  const C = 9;
  const F = 5;
  const top = 104;
  const bot = 182;
  const P = (c, f) => {
    const v = f / F;
    const yv = top + (bot - top) * (v * (0.7 + 0.3 * v));
    const half = 96 + 70 * v;
    return [160 - half + (2 * half * c) / C, yv];
  };
  const quad = (c, f, d = 0.06) => {
    const a = P(c + d, f + d);
    const b = P(c + 1 - d, f + d);
    const e = P(c + 1 - d, f + 1 - d);
    const h = P(c + d, f + 1 - d);
    return { pts: [a, b, e, h], w: b[0] - a[0], h: h[1] - a[1], cx: (a[0] + b[0] + e[0] + h[0]) / 4, cy: (a[1] + b[1] + e[1] + h[1]) / 4 };
  };
  const pts = (arr) => arr.map((p) => p.map((n) => n.toFixed(1)).join(",")).join(" ");
  const bonus = { "0,0": ["laca", "×3"], "8,0": ["laca", "×3"], "1,4": ["jade", "×2"], "7,4": ["jade", "×2"], "6,1": ["azul", "×2"], "1,1": ["azul", "×2"], "8,3": ["jade", "×2"], "0,3": ["azul", "×2"] };
  const letras = [
    [1, 2, "P", 3], [2, 2, "A", 1], [3, 2, "L", 1], [4, 2, "A", 1], [5, 2, "C", 3], [6, 2, "I", 1], [7, 2, "O", 1],
    [3, 0, "S", 1], [3, 1, "O", 1],
  ];
  const fichaQ = (c, f, l, p, k, cae) => {
    const q = quad(c, f, 0.04);
    const alto = Math.max(2, q.h * 0.22);
    const lift = q.pts.map(([x, y]) => [x, y - alto]);
    return (
      <g key={k} className={cae ? "jh-p-cae" : undefined} style={cae ? { "--d": `${k * 0.4}s` } : undefined}>
        <polygon points={pts(q.pts)} fill="#000" opacity=".35" transform="translate(1.5 1.5)" />
        <polygon points={pts([lift[3], lift[2], q.pts[2], q.pts[3]])} fill="#b07a2a" />
        <polygon points={pts(lift)} fill={u(g, "crema")} stroke="#c8961e" strokeWidth=".7" />
        <text x={q.cx} y={q.cy - alto + q.h * 0.26} textAnchor="middle" fontSize={q.h * 0.72} fontWeight="900" fill={TINTA} fontFamily="Georgia, serif">
          {l}
        </text>
        <text x={lift[2][0] - 2} y={lift[2][1] - 1.5} textAnchor="end" fontSize={q.h * 0.26} fontWeight="800" fill="#8a5a1e">
          {p}
        </text>
      </g>
    );
  };
  const fila = [quad(1, 2, 0), quad(7, 2, 0)];
  const farol = (x, y, s, key) => (
    <g key={key} className="jh-p-linterna" style={{ transformOrigin: `${x}px 0px`, "--d": `${-key}s` }} filter={u(g, "dof")}>
      <line x1={x} y1="0" x2={x} y2={y - 12 * s} stroke={ORO} strokeWidth={1.4 * s} />
      <circle cx={x} cy={y} r={24 * s} fill={u(g, "haloRojo")} />
      <ellipse cx={x} cy={y} rx={12 * s} ry={14 * s} fill={u(g, "farol")} stroke="#ffcf6a" strokeWidth={s} />
      <rect x={x - 5 * s} y={y - 15 * s} width={10 * s} height={3.5 * s} fill={ORO} />
      <rect x={x - 5 * s} y={y + 11.5 * s} width={10 * s} height={3.5 * s} fill={ORO} />
      <path d={`M${x} ${y + 15 * s}v${10 * s}`} stroke={ROJO} strokeWidth={2 * s} />
    </g>
  );
  return (
    <>
      <rect width="320" height="180" fill={u(g, "atardecer")} />
      <circle cx="160" cy="56" r="150" fill={u(g, "halo")} opacity=".65" />
      <Rayos cx={160} cy={52} n={22} op={0.16} />
      <Fuego x={52} y={30} r={18} color="#ffe39a" d={0} />
      <Fuego x={270} y={22} r={16} color="#ff8a7a" d={-1.2} />
      <Fuego x={226} y={52} r={11} color="#b6f0c8" d={-2.1} />
      <image className="jh-p-nube" href="./theme/nube-oro.png" x="-14" y="62" width="100" height="34" opacity=".7" />
      <image className="jh-p-nube is-b" href="./theme/nube-oro.png" x="236" y="66" width="100" height="34" opacity=".65" />
      {/* Palacio dorado */}
      <circle cx="160" cy="60" r="64" fill="#fff1b8" filter={u(g, "bloom")} opacity=".45" />
      <image href="./theme/templos/linterna.webp" x="60" y="2" width="200" height="132" preserveAspectRatio="xMidYMid meet" />
      <rect x="140" y="20" width="40" height="13" rx="1.5" fill="#2a0408" stroke={u(g, "oroH")} strokeWidth="1" />
      <text x="160" y="30" textAnchor="middle" fontSize="9" fill="#ffe08a" fontFamily="STKaiti, KaiTi, serif">
        字宫
      </text>
      {/* Tablero */}
      <polygon points={pts([P(0, 0), P(C, 0), P(C, F), P(0, F)])} fill="#4a0612" transform="translate(0 4)" />
      <polygon points={pts([P(0, 0), P(C, 0), P(C, F), P(0, F)])} fill={u(g, "laca")} stroke={u(g, "oroH")} strokeWidth="2.6" />
      {Array.from({ length: C * F }, (_, i) => {
        const c = i % C;
        const f = Math.floor(i / C);
        const q = quad(c, f);
        const b = bonus[`${c},${f}`];
        return (
          <g key={i}>
            <polygon points={pts(q.pts)} fill={b ? u(g, b[0]) : "#f3e3bd"} opacity={b ? 1 : 0.94} />
            {b && (
              <text x={q.cx} y={q.cy + q.h * 0.2} textAnchor="middle" fontSize={q.h * 0.5} fontWeight="900" fill={CREMA}>
                {b[1]}
              </text>
            )}
          </g>
        );
      })}
      {/* Resplandor bajo la palabra formada */}
      <polygon className="jh-p-brilla" points={pts([fila[0].pts[0], fila[1].pts[1], fila[1].pts[2], fila[0].pts[3]])} fill="#ffd76a" filter={u(g, "bloom")} />
      {letras.map(([c, f, l, p], k) => fichaQ(c, f, l, p, k, k >= 7))}
      {/* Fichas que llegan volando */}
      <g className="jh-p-flota" style={{ transformOrigin: "286px 96px" }}>
        <circle cx="286" cy="96" r="26" fill={u(g, "halo")} />
        <g transform="rotate(12 286 96)">
          <Ficha x={271} y={77} w={30} h={34} letra="Ñ" pts="8" color={ROJO} size={20} />
        </g>
      </g>
      <g className="jh-p-flota" style={{ transformOrigin: "34px 108px", animationDelay: "-1.6s" }}>
        <circle cx="34" cy="108" r="20" fill={u(g, "halo")} />
        <g transform="rotate(-14 34 108)">
          <Ficha x={22} y={94} w={24} h={27} letra="E" pts="1" color={TINTA} size={16} />
        </g>
      </g>
      {farol(14, 30, 1.2, 0)}
      {farol(306, 24, 1.1, 1)}
      <Brasas pts={[[120, 120], [200, 116, 1.4], [150, 140], [90, 130, 1], [240, 130, 1], [176, 104, 0.9]]} />
      <Chispas pts={[[160, 8, 0.8], [110, 44, 0.6], [208, 40, 0.6]]} />
      <Vineta />
    </>
  );
}

// Wukong Turbo Rush: arte real del juego (fondo de la Ciudad del Dragón, kart dragón y logo recortados)
function TurboKart() {
  return (
    <>
      <image href="./turbo-kart/circuito-ciudad-dragon.webp" x="-10" y="-6" width="340" height="212" preserveAspectRatio="xMidYMid slice" />
      <rect x="0" y="0" width="320" height="180" fill="#14060c" opacity="0.18" />
      <g className="jh-tk-lineas" stroke="#7ff0ff" strokeWidth="1.4" strokeLinecap="round" opacity="0.75">
        <line x1="20" y1="120" x2="70" y2="120" />
        <line x1="8" y1="138" x2="62" y2="138" stroke="#ff5abe" />
        <line x1="30" y1="154" x2="80" y2="154" />
      </g>
      <image className="jh-tk-kart" href="./turbo-kart/anim/kart.webp" x="34" y="66" width="200" height="105" />
      <image className="jh-tk-logo" href="./turbo-kart/anim/logo.webp" x="196" y="10" width="112" height="66" />
    </>
  );
}

const ESCENAS = {
  kahoot: Kahoot,
  ruleta: Ruleta,
  ahorcado: Ahorcado,
  sopa: Sopa,
  scramble: Scramble,
  memory: Memory,
  "palacio-palabras": PalacioPalabras,
  uno: Uno,
  "mapa-mental": MapaMental,
  teatro: Teatro,
  "dragon-jade": DragonJade,
  "escape-palacio": EscapePalacio,
  "fichas-palacio": FichasPalacio,
  brisca: Brisca,
  "viaje-mono": ViajeMono,
  "pincel-magico": PincelMagico,
  "pinball-dragon": PinballDragon,
  "turbo-kart": TurboKart,
};

export function Portada({ id, className = "" }) {
  const Escena = ESCENAS[id];
  const base = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const g = React.useCallback((n) => `jh${base}${n}`, [base]);
  return (
    <div className={`jh-poster jh-poster--${id} ${className}`} aria-hidden="true">
      {Escena && (
        <svg viewBox="0 0 320 180" preserveAspectRatio={className.includes("is-grande") ? "xMidYMid meet" : "xMidYMid slice"} focusable="false">
          <Ctx.Provider value={g}>
            <Defs />
            <Escena />
          </Ctx.Provider>
        </svg>
      )}
    </div>
  );
}
