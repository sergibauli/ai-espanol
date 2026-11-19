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
   Mismo lenguaje que las demás: foco central, halo, rayos, profundidad,
   piezas reconocibles del juego y un gesto al pasar el ratón.
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
function Dado({ cx, cy, a = 22, caras = [1, 3, 5] }) {
  const ex = [a * 0.87, a * 0.5];
  const ey = [-a * 0.87, a * 0.5];
  const ez = [0, a];
  const T = [cx, cy - a];
  const add = (...v) => v.reduce((p, q) => [p[0] + q[0], p[1] + q[1]], [0, 0]);
  const neg = (v) => [-v[0], -v[1]];
  const caraG = (O, U, V, fill, n, key) => (
    <g key={key} transform={`matrix(${U[0]} ${U[1]} ${V[0]} ${V[1]} ${O[0]} ${O[1]})`}>
      <rect x="0.02" y="0.02" width="0.96" height="0.96" rx="0.16" fill={fill} />
      {PIPS[n].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={n === 1 ? 0.13 : 0.09} fill={n === 1 ? ROJO : TINTA} />
      ))}
    </g>
  );
  return (
    <g>
      <ellipse cx={cx} cy={cy + a * 1.05} rx={a * 1.15} ry={a * 0.32} fill="#000" opacity=".35" />
      {caraG(T, ex, ey, "#fffaf0", caras[0], "t")}
      {caraG(add(T, ey), ex, ez, "#e9d6aa", caras[1], "l")}
      {caraG(add(T, ex, ey), neg(ey), ez, "#c9a76a", caras[2], "r")}
    </g>
  );
}

/* ---------- 14 · Brisca del Rey Mono: abanico de naipes españoles sobre tapete ---------- */
function Brisca() {
  const g = useG();
  // Filete del naipe con «pintas»: oros sin corte, copas 1, espadas 2, bastos 3
  const filete = (x, y, w, h, cortes) => {
    const seg = [];
    const n = cortes + 1;
    const hueco = 4;
    const tramo = (w - cortes * hueco) / n;
    for (let i = 0; i < n; i++) {
      const sx = x + i * (tramo + hueco);
      seg.push(`M${sx} ${y}h${tramo}M${sx} ${y + h}h${tramo}`);
    }
    return <path d={`${seg.join("")}M${x} ${y}v${h}M${x + w} ${y}v${h}`} stroke="#c8102e" strokeWidth="1" fill="none" />;
  };
  const moneda = (cx, cy, r = 11) => (
    <g>
      <circle cx={cx} cy={cy} r={r + 1.5} fill="#7a4f12" />
      <circle cx={cx} cy={cy} r={r} fill={u(g, "oro")} />
      <circle cx={cx} cy={cy} r={r * 0.68} fill="none" stroke="#a8761e" strokeWidth="1" />
      <path d={`M${cx} ${cy - r * 0.5}l${r * 0.18} ${r * 0.32}l${r * 0.32} ${r * 0.18}l${-r * 0.32} ${r * 0.18}l${-r * 0.18} ${r * 0.32}l${-r * 0.18} ${-r * 0.32}l${-r * 0.32} ${-r * 0.18}l${r * 0.32} ${-r * 0.18}z`} fill="#c8102e" />
      <ellipse cx={cx - r * 0.35} cy={cy - r * 0.4} rx={r * 0.35} ry={r * 0.18} fill="#fff" opacity=".55" />
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
      <path d={`M${cx} ${cy - 24}l3.4 6v22h-6.8v-22z`} fill="#e6edf8" stroke="#2a3a58" strokeWidth=".8" />
      <path d={`M${cx} ${cy - 20}v20`} stroke="#9fb0cc" strokeWidth="1" />
      <path d={`M${cx - 10} ${cy + 4}q10-4 20 0q-3 4-10 4t-10-4z`} fill={u(g, "oro")} stroke="#7a4f12" strokeWidth=".6" />
      <rect x={cx - 2} y={cy + 7} width="4" height="9" rx="1" fill="#2c4f8f" />
      <circle cx={cx} cy={cy + 18} r="2.6" fill={u(g, "oro")} />
    </g>
  );
  const basto = (cx, cy) => (
    <g transform={`rotate(24 ${cx} ${cy})`}>
      <path d={`M${cx - 3} ${cy + 20}l-1-30q4-8 8-2l-1 32q-3 3-6 0z`} fill="#8a5a1e" stroke="#4a2a12" strokeWidth=".8" />
      {[-12, -2, 8].map((dy) => (
        <circle key={dy} cx={cx + (dy % 2 ? 3 : -3)} cy={cy + dy} r="1.6" fill="#5a3416" />
      ))}
      <path d={`M${cx + 3} ${cy - 6}q8-6 10 2q-6 2-10-2z`} fill="#2f8f52" />
      <path d={`M${cx - 4} ${cy + 2}q-9-3-9 5q6 1 9-5z`} fill="#3fae6a" />
    </g>
  );
  const naipe = (key, a, a2, num, cortes, dibujo, figura = false) => (
    <g key={key} className="jh-p-abanico" style={{ "--a": `${a}deg`, "--a2": `${a2}deg`, transformOrigin: "160px 176px" }}>
      <rect x="135" y="60" width="54" height="84" rx="6" fill="#000" opacity=".35" transform="translate(2 3)" />
      <rect x="133" y="58" width="54" height="84" rx="6" fill={u(g, "crema")} stroke={figura ? u(g, "oroH") : "#b08a48"} strokeWidth={figura ? 2 : 1} />
      {filete(138, 68, 44, 64, cortes)}
      <text x="140" y="66" fontSize="8" fontWeight="900" fill={ROJO} fontFamily="Georgia, serif">
        {num}
      </text>
      <text x="180" y="139" textAnchor="end" fontSize="8" fontWeight="900" fill={ROJO} fontFamily="Georgia, serif">
        {num}
      </text>
      {dibujo}
    </g>
  );
  return (
    <>
      <rect width="320" height="180" fill="#3a0610" />
      <rect width="320" height="180" fill={u(g, "laca")} opacity=".55" />
      <circle cx="160" cy="84" r="150" fill={u(g, "halo")} opacity=".45" />
      <Rayos cx={160} cy={90} n={18} op={0.12} />
      {/* Tapete verde con borde de laca y oro */}
      <ellipse cx="160" cy="150" rx="176" ry="52" fill="#4a0612" />
      <ellipse cx="160" cy="146" rx="172" ry="50" fill={u(g, "oroH")} />
      <ellipse cx="160" cy="146" rx="166" ry="46" fill={u(g, "terciopelo")} />
      <ellipse cx="160" cy="138" rx="120" ry="26" fill="#7be0a6" opacity=".14" />
      {/* Mazo con el triunfo cruzado debajo */}
      <g transform="rotate(-8 52 126)">
        <g transform="rotate(90 52 128)">
          <rect x="34" y="102" width="36" height="54" rx="4" fill={u(g, "crema")} stroke="#b08a48" />
          {copa(52, 128)}
        </g>
        {[8, 6, 4, 2, 0].map((o) => (
          <rect key={o} x={34 - o * 0.4} y={98 - o} width="36" height="54" rx="4" fill={o ? "#6b0918" : u(g, "laca")} stroke={u(g, "oro")} strokeWidth="1" />
        ))}
        <rect x="37" y="91" width="30" height="48" rx="2.5" fill="none" stroke="#ffcf6a" strokeWidth=".8" strokeDasharray="2 2" />
        <circle cx="52" cy="115" r="10" fill="#8f0c21" stroke={u(g, "oroH")} strokeWidth="1.6" />
        <text x="52" y="120" textAnchor="middle" fontSize="13" fontWeight="700" fill={CREMA} fontFamily="STKaiti, KaiTi, serif">
          悟
        </text>
      </g>
      {/* Monedas de oro apiladas */}
      <g>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <ellipse cx="270" cy={146 - i * 5} rx="15" ry="5" fill="#7a4f12" />
            <ellipse cx="270" cy={144 - i * 5} rx="15" ry="5" fill={u(g, "oroH")} />
          </g>
        ))}
        <ellipse cx="270" cy="124" rx="15" ry="5" fill="#ffe39a" />
        <rect x="267" y="122.5" width="6" height="3" fill="#8f0c21" />
      </g>
      {/* Abanico de naipes: as de oros, copas, espadas, bastos y el Rey Mono de oros */}
      <circle cx="160" cy="96" r="70" fill={u(g, "halo")} opacity=".55" className="jh-p-latido" style={{ transformOrigin: "160px 96px" }} />
      {naipe(0, -44, -52, "1", 0, moneda(160, 100, 15))}
      {naipe(1, -22, -27, "3", 1, copa(160, 100))}
      {naipe(2, 22, 27, "7", 2, espada(160, 100))}
      {naipe(3, 44, 52, "5", 3, basto(160, 100))}
      {naipe(
        4,
        0,
        0,
        "12",
        0,
        <g>
          <rect x="139" y="70" width="42" height="60" rx="2" fill="#8f0c21" />
          <rect x="139" y="70" width="42" height="60" rx="2" fill={u(g, "halo")} opacity=".7" />
          <image href="./mono/guino.webp" x="137" y="70" width="46" height="62" preserveAspectRatio="xMidYMax slice" />
          <path d="M150 73l3 6 4-7 3 7 4-7 3 6 3-5v7h-20z" fill={u(g, "oro")} stroke="#7a4f12" strokeWidth=".5" />
          {moneda(176, 124, 6)}
        </g>,
        true,
      )}
      <Chispas
        pts={[
          [212, 54, 0.9],
          [104, 50, 0.7],
          [300, 30, 0.6],
          [22, 40, 0.6],
          [244, 100, 0.5],
        ]}
      />
      <Vineta />
    </>
  );
}

/* ---------- 15 · El viaje del Rey Mono: camino en espiral hasta el Templo del Oeste ---------- */
function ViajeMono() {
  const g = useG();
  const N = 19;
  const casillas = Array.from({ length: N }, (_, k) => {
    const t = Math.PI * 0.62 + k * 0.5;
    const s = 1 - k * 0.029;
    return { k, x: 160 + 132 * s * Math.cos(t), y: 124 + 40 * s * Math.sin(t), r: 4 + 9 * s };
  });
  const color = (k) => [CREMA, CREMA, "#2c4f8f", CREMA, ROJO, CREMA, "#2f8f52", CREMA, "#c8961e"][k % 9];
  const casilla = ({ k, x, y, r }) => (
    <g key={k}>
      <ellipse cx={x} cy={y + r * 0.28} rx={r} ry={r * 0.5} fill="#5a3416" />
      <ellipse cx={x} cy={y} rx={r} ry={r * 0.5} fill={color(k)} stroke={u(g, "oroH")} strokeWidth={0.6 + r * 0.06} />
      <ellipse cx={x - r * 0.3} cy={y - r * 0.18} rx={r * 0.4} ry={r * 0.14} fill="#fff" opacity=".45" />
    </g>
  );
  const detras = casillas.filter((c) => c.y < 118);
  const delante = casillas.filter((c) => c.y >= 118).sort((a, b) => a.y - b.y);
  const tejado = (y, w, h) => (
    <g>
      <path d={`M${160 - w / 2 - 9} ${y + h - 3}Q${160 - w / 2} ${y + h} ${160 - w / 2 + 6} ${y}H${160 + w / 2 - 6}Q${160 + w / 2} ${y + h} ${160 + w / 2 + 9} ${y + h - 3}L${160 + w / 2 + 4} ${y + h + 2}H${160 - w / 2 - 4}Z`} fill={u(g, "oro")} stroke="#7a4f12" strokeWidth=".8" />
      <path d={`M${160 - w / 2 - 4} ${y + h + 2}H${160 + w / 2 + 4}`} stroke="#5a3416" strokeWidth="1.4" />
    </g>
  );
  const peon = (x, y, c, b, k) => (
    <g key={k} className="jh-p-ficha" style={{ "--d": `${k * 0.7}s`, transformOrigin: `${x}px ${y}px` }}>
      <ellipse cx={x} cy={y} rx="6" ry="2.6" fill={c} stroke="#ffe08a" strokeWidth=".6" />
      <path d={`M${x - 4.5} ${y}L${x - 2} ${y - 11}h4L${x + 4.5} ${y}z`} fill={c} />
      <circle cx={x} cy={y - 13} r="4.4" fill={b} stroke={c} strokeWidth="1.4" />
      <circle cx={x - 1.4} cy={y - 14.4} r="1.3" fill="#fff" opacity=".8" />
    </g>
  );
  const camino = casillas.map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");
  return (
    <>
      <rect width="320" height="180" fill={u(g, "cieloNoche")} />
      {[
        [30, 20], [70, 44], [118, 14], [214, 12], [262, 40], [300, 18], [16, 70], [292, 74],
      ].map(([x, y], i) => (
        <circle key={i} className="jh-p-estrella" style={{ "--d": `${i * 0.35}s` }} cx={x} cy={y} r="1.3" fill="#fff" />
      ))}
      <circle cx="272" cy="30" r="30" fill={u(g, "halo")} opacity=".5" />
      <circle cx="272" cy="30" r="11" fill="#fff4cf" />
      <path d="M0 104q30-26 56-12t44-16 40 18 40-20 46 16 44-18 50 22v86H0z" fill="#2a1240" opacity=".8" />
      <path d="M0 116q40-18 70-4t60-10 56 12 60-14 74 12v68H0z" fill="#3a0a24" opacity=".85" />
      {/* Rayos y halo del templo */}
      <circle cx="160" cy="70" r="110" fill={u(g, "halo")} opacity=".45" />
      <Rayos cx={160} cy={66} n={20} op={0.14} />
      <image className="jh-p-nube" href="./theme/nube-oro.png" x="-10" y="60" width="96" height="34" opacity=".6" />
      <image className="jh-p-nube is-b" href="./theme/nube-oro.png" x="236" y="66" width="96" height="34" opacity=".55" />
      {/* Isla-tablero flotante */}
      <ellipse cx="160" cy="132" rx="150" ry="48" fill="#4a0612" />
      <ellipse cx="160" cy="126" rx="150" ry="48" fill={u(g, "oroH")} />
      <ellipse cx="160" cy="124" rx="146" ry="45" fill="#e3cf9e" />
      <ellipse cx="160" cy="124" rx="146" ry="45" fill={u(g, "halo")} opacity=".35" />
      <polyline points={camino} fill="none" stroke="#8a5a1e" strokeWidth="3" strokeLinejoin="round" opacity=".7" />
      <polyline className="jh-p-flecha" points={camino} fill="none" stroke="#ffe08a" strokeWidth="1.2" strokeDasharray="3 4" strokeLinejoin="round" />
      {detras.map(casilla)}
      {/* Templo del Oeste */}
      <g className="jh-p-templo" style={{ transformOrigin: "160px 116px" }}>
        <ellipse cx="160" cy="117" rx="38" ry="9" fill="#7a4f12" />
        <ellipse cx="160" cy="113" rx="38" ry="9" fill={u(g, "oroH")} />
        <ellipse cx="160" cy="111" rx="32" ry="6.5" fill="#fff1b8" />
        <rect x="136" y="88" width="48" height="22" fill={u(g, "laca")} />
        {[140, 152, 168, 180].map((x) => (
          <rect key={x} x={x - 1.5} y="88" width="3" height="22" fill={u(g, "oro")} />
        ))}
        <path d="M154 110v-12a6 6 0 0 1 12 0v12z" fill="#fff6cf" />
        <path d="M154 110v-12a6 6 0 0 1 12 0v12z" fill={u(g, "halo")} />
        {tejado(78, 52, 10)}
        <rect x="144" y="64" width="32" height="14" fill={u(g, "laca")} />
        <rect x="153" y="66" width="14" height="9" rx="1" fill="#2a0408" stroke={u(g, "oro")} strokeWidth=".8" />
        <text x="160" y="73.5" textAnchor="middle" fontSize="6.5" fill="#ffe08a" fontFamily="STKaiti, KaiTi, serif">
          西天
        </text>
        {tejado(54, 36, 10)}
        <path d="M160 38l3 10h-6z" fill={u(g, "oro")} />
        <circle cx="160" cy="37" r="3" fill="#fff6cf" />
      </g>
      {delante.map(casilla)}
      {peon(casillas[10].x, casillas[10].y, "#2f8f52", "#b6f0c8", 1)}
      {peon(casillas[15].x, casillas[15].y, "#2c4f8f", "#a8c4f5", 2)}
      {/* El Rey Mono como ficha */}
      <g className="jh-p-ficha" style={{ "--d": "0s", transformOrigin: `${casillas[3].x}px ${casillas[3].y}px` }}>
        <ellipse cx={casillas[3].x} cy={casillas[3].y + 1} rx="13" ry="4" fill={u(g, "haloRojo")} />
        <image href="./mono/feliz.webp" x={casillas[3].x - 15} y={casillas[3].y - 48} width="30" height="50" />
      </g>
      {/* Dados 3D */}
      <g className="jh-p-dado" style={{ transformOrigin: "276px 140px" }}>
        <Dado cx={276} cy={138} a={19} caras={[5, 3, 6]} />
      </g>
      <g className="jh-p-dado is-b" style={{ transformOrigin: "40px 150px" }}>
        <Dado cx={40} cy={148} a={14} caras={[1, 4, 2]} />
      </g>
      <Chispas
        pts={[
          [160, 30, 0.9],
          [200, 52, 0.6],
          [120, 56, 0.6],
          [300, 110, 0.6],
        ]}
      />
      <Vineta />
    </>
  );
}

/* ---------- 16 · Pincel mágico: el pincel dorado escribe 笔 en la cuadrícula de caligrafía ---------- */
function PincelMagico() {
  const g = useG();
  return (
    <>
      <rect width="320" height="180" fill="#3a0610" />
      <rect width="320" height="180" fill={u(g, "laca")} opacity=".55" />
      <circle cx="160" cy="84" r="150" fill={u(g, "halo")} opacity=".4" />
      <Rayos cx={160} cy={84} n={22} op={0.1} />
      <image className="jh-p-nube" href="./theme/nube-oro.png" x="-14" y="18" width="100" height="36" opacity=".5" />
      <image className="jh-p-nube is-b" href="./theme/nube-oro.png" x="240" y="140" width="96" height="34" opacity=".45" />
      {/* Mesa de laca y papel de arroz */}
      <path d="M0 150h320v30H0z" fill="#2a0408" />
      <path d="M0 148h320v4H0z" fill={u(g, "oroH")} opacity=".8" />
      <ellipse cx="160" cy="160" rx="110" ry="8" fill={u(g, "sombra")} />
      <g transform="rotate(-3 160 92)">
        <rect x="88" y="16" width="144" height="146" fill="#b9a07a" opacity=".5" transform="translate(3 4)" />
        <rect x="88" y="16" width="144" height="146" fill={u(g, "crema")} />
        <rect x="88" y="16" width="144" height="146" fill={u(g, "halo")} opacity=".3" />
        {/* Cuadrícula 米字格 */}
        <rect x="108" y="30" width="104" height="104" fill="none" stroke="#c8102e" strokeWidth="1.6" />
        <path d="M108 30l104 104M212 30L108 134M160 30v104M108 82h104" stroke="#c8102e" strokeWidth=".7" strokeDasharray="3 3" opacity=".55" />
        {/* Carácter que se va pintando */}
        <defs>
          <clipPath id={g("revela")}>
            <rect className="jh-p-revela" x="100" y="24" width="120" height="116" style={{ transformOrigin: "160px 24px" }} />
          </clipPath>
        </defs>
        <g clipPath={u(g, "revela")}>
          <text x="160" y="119" textAnchor="middle" fontSize="92" fill="none" stroke="#ffd76a" strokeWidth="4" opacity=".45" fontFamily="STKaiti, KaiTi, 'Noto Serif CJK SC', serif" fontWeight="700">
            笔
          </text>
          <text x="160" y="119" textAnchor="middle" fontSize="92" fill="#1a0e08" fontFamily="STKaiti, KaiTi, 'Noto Serif CJK SC', serif" fontWeight="700">
            笔
          </text>
        </g>
        {/* Gotas de tinta */}
        {[
          [214, 128, 2.2],
          [206, 138, 1.4],
          [222, 120, 1.2],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#1a0e08" />
        ))}
        {/* Sello 神笔 */}
        <g className="jh-p-sello" style={{ transformOrigin: "214px 146px" }}>
          <rect x="203" y="135" width="22" height="22" rx="2" fill={ROJO} />
          <rect x="205" y="137" width="18" height="18" rx="1" fill="none" stroke={CREMA} strokeWidth=".7" />
          <text x="214" y="145" textAnchor="middle" fontSize="8" fill={CREMA} fontFamily="STKaiti, KaiTi, serif">
            神
          </text>
          <text x="214" y="154" textAnchor="middle" fontSize="8" fill={CREMA} fontFamily="STKaiti, KaiTi, serif">
            笔
          </text>
        </g>
      </g>
      {/* Tintero (piedra de tinta) */}
      <g>
        <ellipse cx="50" cy="152" rx="32" ry="10" fill="#000" opacity=".4" />
        <path d="M18 140h64v8q-32 10-64 0z" fill="#2b2b33" />
        <ellipse cx="50" cy="140" rx="32" ry="9" fill="#44444f" />
        <ellipse cx="50" cy="140" rx="24" ry="6" fill="#0d0d12" />
        <ellipse cx="44" cy="138.5" rx="9" ry="1.6" fill="#fff" opacity=".35" />
        <path d="M26 136q6-10 16-6" stroke={u(g, "oro")} strokeWidth="1.4" fill="none" />
      </g>
      {/* Estela dorada */}
      <path className="jh-p-flecha" d="M206 120q24-6 34-26t32-30" fill="none" stroke="#ffe39a" strokeWidth="1.4" strokeDasharray="2 5" strokeLinecap="round" opacity=".9" />
      {/* Pincel dorado */}
      <g className="jh-p-pincel2" style={{ transformOrigin: "200px 122px" }}>
        <circle cx="200" cy="122" r="22" fill={u(g, "halo")} />
        <g transform="translate(200 122) rotate(38)">
          <path d="M0 0c-5-6-7-16-6-26h12c1 10-1 20-6 26z" fill={u(g, "pelo")} />
          <path d="M-1 -4c-2-6-3-12-2-20" stroke="#fff" strokeWidth=".8" opacity=".35" fill="none" />
          <rect x="-7.5" y="-34" width="15" height="9" rx="2" fill={u(g, "oroH")} stroke="#7a4f12" strokeWidth=".6" />
          <rect x="-6" y="-120" width="12" height="88" rx="4" fill={u(g, "lacaH")} stroke="#4a0612" strokeWidth=".6" />
          {[-112, -78, -44].map((y) => (
            <rect key={y} x="-6.5" y={y} width="13" height="4" rx="1" fill={u(g, "oroH")} />
          ))}
          <rect x="-1.5" y="-110" width="2" height="72" rx="1" fill="#fff" opacity=".35" />
          <path d="M-5 -122h10l-2 -6h-6z" fill={u(g, "oroH")} />
          <path d="M0 -128q-8-8 0-14q8 6 0 14" fill="none" stroke={ROJO} strokeWidth="1.6" />
        </g>
        <circle cx="200" cy="122" r="3.2" fill="#fff6cf" />
      </g>
      <Chispas
        pts={[
          [222, 104, 0.9],
          [246, 80, 0.7],
          [274, 58, 0.6],
          [30, 90, 0.6],
          [290, 24, 0.7],
        ]}
      />
      <Vineta />
    </>
  );
}

/* ---------- 17 · Pinball del dragón: mesa de laca en perspectiva, dragón dorado y bola ---------- */
function PinballDragon() {
  const g = useG();
  const linterna = (x, y, i) => (
    <g key={i} className="jh-p-bumper" style={{ "--d": `${i * 0.4}s`, transformOrigin: `${x}px ${y}px` }}>
      <circle cx={x} cy={y} r="19" fill={u(g, "haloRojo")} />
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
    <g key={w} className={ok ? "jh-p-latido" : undefined} style={ok ? { transformOrigin: `${x}px ${y}px` } : undefined}>
      <rect x={x - 25} y={y - 7} width="50" height="17" rx="8.5" fill="#2a0408" />
      <rect x={x - 25} y={y - 9} width="50" height="17" rx="8.5" fill={ok ? u(g, "jade") : u(g, "crema")} stroke={u(g, "oroH")} strokeWidth="1.6" />
      <text x={x} y={y + 2.6} textAnchor="middle" fontSize="9" fontWeight="800" fill={ok ? "#fff" : TINTA}>
        {w}
      </text>
    </g>
  );
  const luces = Array.from({ length: 11 }, (_, i) => i / 10);
  return (
    <>
      <rect width="320" height="180" fill="#12020a" />
      <circle cx="160" cy="60" r="160" fill={u(g, "haloRojo")} opacity=".35" />
      <Rayos cx={160} cy={40} n={16} op={0.1} color="#ffb08a" />
      {/* Mueble de la mesa */}
      <path d="M86 2H234Q266 2 274 34L314 180H6L46 34Q54 2 86 2Z" fill="#4a0612" />
      <path d="M90 6H230Q260 6 267 36L304 180H16L53 36Q60 6 90 6Z" fill={u(g, "oroH")} />
      <path d="M94 12H226Q254 12 260 40L294 180H26L60 40Q66 12 94 12Z" fill={u(g, "mesa")} />
      {/* Calles laterales y lanzador */}
      <path d="M248 40L282 180" stroke={u(g, "oro")} strokeWidth="1.4" opacity=".8" />
      <path d="M72 40L38 180" stroke={u(g, "oro")} strokeWidth="1.4" opacity=".8" />
      <path d="M270 150v26" stroke="#c8961e" strokeWidth="5" strokeDasharray="1.4 1.4" />
      {/* Dragón dorado enroscado */}
      <circle cx="160" cy="58" r="56" fill={u(g, "halo")} opacity=".55" />
      <image className="jh-p-dragon" href="./theme/dragon-enroscado.webp" x="102" y="8" width="116" height="110" preserveAspectRatio="xMidYMid meet" style={{ transformOrigin: "160px 60px" }} />
      {/* Luces del borde */}
      {luces.map((t, i) => (
        <g key={i}>
          <circle className="jh-p-estrella" style={{ "--d": `${i * 0.12}s` }} cx={60 - t * 26} cy={44 + t * 120} r="2.2" fill="#ffd27a" />
          <circle className="jh-p-estrella" style={{ "--d": `${i * 0.12 + 0.6}s` }} cx={260 + t * 26} cy={44 + t * 120} r="2.2" fill="#ffd27a" />
        </g>
      ))}
      {linterna(110, 62, 0)}
      {linterna(210, 62, 1)}
      {/* Placas con palabras */}
      {placa(108, 106, "hola", false)}
      {placa(212, 106, "adiós", true)}
      {placa(160, 128, "gracias", false)}
      {/* Tirachinas */}
      <path d="M58 132l26 26-14 4z" fill={u(g, "laca")} stroke={u(g, "oroH")} strokeWidth="1.4" />
      <path d="M262 132l-26 26 14 4z" fill={u(g, "laca")} stroke={u(g, "oroH")} strokeWidth="1.4" />
      {/* Flippers de jade */}
      <g className="jh-p-flipper is-izq" style={{ transformOrigin: "100px 164px" }}>
        <path d="M96 158L148 168A4.5 4.5 0 0 1 146 177L94 170A6 6 0 0 1 96 158Z" fill={u(g, "jade")} stroke={u(g, "oroH")} strokeWidth="1.4" />
        <circle cx="100" cy="164" r="3" fill={u(g, "oro")} />
      </g>
      <g className="jh-p-flipper is-der" style={{ transformOrigin: "220px 164px" }}>
        <path d="M224 158L172 168A4.5 4.5 0 0 0 174 177L226 170A6 6 0 0 0 224 158Z" fill={u(g, "jade")} stroke={u(g, "oroH")} strokeWidth="1.4" />
        <circle cx="220" cy="164" r="3" fill={u(g, "oro")} />
      </g>
      {/* Bola dorada con estela */}
      <g className="jh-p-bola">
        {[0.12, 0.22, 0.34].map((a, i) => (
          <circle key={i} cx={252 - (2 - i) * 9} cy={84 + (2 - i) * 8} r={4 + i * 1.2} fill="#ffd27a" opacity={a} />
        ))}
        <circle cx="252" cy="84" r="22" fill={u(g, "halo")} />
        <circle cx="252" cy="84" r="8" fill={u(g, "bola")} />
        <ellipse cx="249" cy="80.5" rx="3" ry="2" fill="#fff" opacity=".9" />
      </g>
      <Chispas
        pts={[
          [160, 20, 0.8],
          [236, 70, 0.7],
          [20, 30, 0.6],
          [300, 30, 0.6],
        ]}
      />
      <Vineta />
    </>
  );
}

/* ---------- 7 · Palacio de las palabras: tablero en perspectiva ante el palacio ---------- */
function PalacioPalabras() {
  const g = useG();
  // Tablero 9 × 5 en perspectiva: (col, fila) → punto en el trapecio
  const C = 9;
  const F = 5;
  const top = 96;
  const bot = 178;
  const P = (c, f) => {
    const v = f / F;
    const yv = top + (bot - top) * (v * (0.7 + 0.3 * v));
    const half = 92 + 66 * v;
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
  const bonus = { "0,0": ["laca", "×3"], "8,0": ["laca", "×3"], "1,4": ["jade", "×2"], "7,4": ["jade", "×2"], "6,1": ["azul", "×2"], "1,1": ["azul", "×2"], "8,3": ["jade", "×2"] };
  const letras = [
    [1, 2, "P", 3], [2, 2, "A", 1], [3, 2, "L", 1], [4, 2, "A", 1], [5, 2, "C", 3], [6, 2, "I", 1], [7, 2, "O", 1],
    [3, 0, "S", 1], [3, 1, "O", 1],
  ];
  const fichaQ = (c, f, l, p, k, cae) => {
    const q = quad(c, f, 0.04);
    const alto = Math.max(2, q.h * 0.2);
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
  const tejado = (y, w, h) => (
    <g>
      <path d={`M${160 - w / 2 - 14} ${y + h - 4}Q${160 - w / 2} ${y + h} ${160 - w / 2 + 8} ${y}H${160 + w / 2 - 8}Q${160 + w / 2} ${y + h} ${160 + w / 2 + 14} ${y + h - 4}L${160 + w / 2 + 6} ${y + h + 2}H${160 - w / 2 - 6}Z`} fill={u(g, "oro")} stroke="#7a4f12" strokeWidth=".8" />
      {Array.from({ length: Math.floor(w / 8) }, (_, i) => (
        <path key={i} d={`M${160 - w / 2 + 8 + i * 8} ${y + 1}v${h - 2}`} stroke="#a8761e" strokeWidth="1" opacity=".7" />
      ))}
      <path d={`M${160 - w / 2 - 6} ${y + h + 2}H${160 + w / 2 + 6}`} stroke="#5a3416" strokeWidth="1.6" />
    </g>
  );
  return (
    <>
      <rect width="320" height="180" fill={u(g, "atardecer")} />
      <circle cx="160" cy="62" r="130" fill={u(g, "halo")} opacity=".6" />
      <Rayos cx={160} cy={56} n={18} op={0.12} />
      <image className="jh-p-nube" href="./theme/nube-oro.png" x="-12" y="30" width="110" height="38" opacity=".6" />
      <image className="jh-p-nube is-b" href="./theme/nube-oro.png" x="226" y="22" width="110" height="38" opacity=".55" />
      {/* Palacio */}
      <rect x="20" y="78" width="280" height="22" fill="#6d0a18" />
      <rect x="20" y="76" width="280" height="3" fill={u(g, "oro")} />
      {tejado(22, 92, 12)}
      <rect x="114" y="36" width="92" height="20" fill={u(g, "laca")} />
      {[120, 140, 180, 200].map((x) => (
        <rect key={x} x={x - 2} y="36" width="4" height="20" fill={u(g, "oro")} opacity=".8" />
      ))}
      <rect x="146" y="39" width="28" height="12" rx="1" fill="#2a0408" stroke={u(g, "oro")} strokeWidth=".8" />
      <text x="160" y="48.5" textAnchor="middle" fontSize="8" fill="#ffe08a" fontFamily="STKaiti, KaiTi, serif">
        字宫
      </text>
      {tejado(54, 150, 14)}
      <rect x="82" y="70" width="156" height="28" fill={u(g, "laca")} />
      {[96, 124, 196, 224].map((x) => (
        <rect key={x} x={x - 2.5} y="70" width="5" height="28" fill="#5a0814" />
      ))}
      <path d="M146 98v-16a14 12 0 0 1 28 0v16z" fill="#fff1b8" opacity=".85" />
      {[56, 264].map((x, i) => (
        <g key={x} className="jh-p-linterna" style={{ transformOrigin: `${x}px 58px`, "--d": `${-i}s` }}>
          <line x1={x} y1="58" x2={x} y2="64" stroke={ORO} strokeWidth="1.2" />
          <circle cx={x} cy="74" r="14" fill={u(g, "haloRojo")} />
          <ellipse cx={x} cy="74" rx="8" ry="9.5" fill={u(g, "laca")} stroke="#ffcf6a" strokeWidth=".8" />
          <rect x={x - 3} y="63" width="6" height="2.4" fill={ORO} />
          <rect x={x - 3} y="83" width="6" height="2.4" fill={ORO} />
        </g>
      ))}
      {/* Tablero en perspectiva */}
      <polygon points={pts([P(0, 0), P(C, 0), P(C, F), P(0, F)])} fill="#4a0612" transform="translate(0 4)" />
      <polygon points={pts([P(0, 0), P(C, 0), P(C, F), P(0, F)])} fill={u(g, "laca")} stroke={u(g, "oroH")} strokeWidth="2.4" />
      {Array.from({ length: C * F }, (_, i) => {
        const c = i % C;
        const f = Math.floor(i / C);
        const q = quad(c, f);
        const b = bonus[`${c},${f}`];
        return (
          <g key={i}>
            <polygon points={pts(q.pts)} fill={b ? u(g, b[0]) : "#f3e3bd"} opacity={b ? 1 : 0.92} />
            {b && (
              <text x={q.cx} y={q.cy + q.h * 0.2} textAnchor="middle" fontSize={q.h * 0.5} fontWeight="900" fill={CREMA}>
                {b[1]}
              </text>
            )}
          </g>
        );
      })}
      {letras.map(([c, f, l, p], k) => fichaQ(c, f, l, p, k, k >= 7))}
      {/* Ñ dorada flotante */}
      <g className="jh-p-flota" style={{ transformOrigin: "286px 40px" }}>
        <circle cx="286" cy="40" r="24" fill={u(g, "halo")} />
        <g transform="rotate(12 286 40)">
          <Ficha x={272} y={22} w={28} h={32} letra="Ñ" pts="8" color={ROJO} size={19} />
        </g>
      </g>
      <Chispas
        pts={[
          [160, 16, 0.8],
          [34, 26, 0.6],
          [250, 92, 0.6],
          [70, 92, 0.5],
        ]}
      />
      <Vineta />
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
