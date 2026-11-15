import * as React from "react";

// Decorados del escenario de diálogos: siluetas de tinta con ventanas y farolillos encendidos.
// Cada tema es un <g> dentro de un SVG 1200×520; el suelo y el cielo son comunes.

const TEMAS = [
  ["botica", /m[ée]dic|farmacia|hospital|urgencia|dolor|salud|consulta|enferm|muelas|te pasa/i],
  ["viaje", /estaci[oó]n|aeropuerto|tren|avi[oó]n|viaje|hotel|maleta|equipaje|embarque|aduana|transporte|check|vacaciones|facturaci|destino/i],
  ["fonda", /caf[eé]|restaurante|comida|comer|cuenta$|mesa|cocina|vegetariano|men[uú]|cena|desayun/i],
  ["mercado", /tienda|mercado|supermercado|ropa|compr|fruter|zapat|rebaja|librer|precio|cuestan|regalo|probándose|muebles/i],
  ["academia", /clase|escuela|universidad|profesor|verbo|deberes|notas|beca|material|idioma|conjug|biblioteca/i],
  ["despacho", /oficina|trabajo|reuni[oó]n|entrevista|negocio|banco|cajero|transferencia|tarjeta|dinero|laboral|conferencia/i],
  ["fiesta", /fiesta|cumplea|concierto|festival|cine|pel[ií]cula|celebr|aniversario|m[uú]sica|premio/i],
  ["calle", /calle|direcci|indicaci|llegar|ciudad|barrio|museo|lugar|ubicaci|distancia|hutong|referencia|paseo/i],
  ["hogar", /casa|vecin|piso|habitaci|mudanza|familia|vivienda|ma[ñn]ana|dormir|rutina|madre|hijo/i],
];

export function temaDeDialogo(titulo = "", textos = "") {
  for (const [tema, re] of TEMAS) if (re.test(titulo)) return tema;
  for (const [tema, re] of TEMAS) if (re.test(textos)) return tema;
  return "jardin";
}

export const NOMBRE_TEMA = {
  hogar: ["El patio de los vecinos", "邻里庭院"],
  fonda: ["La casa de té", "茶馆"],
  mercado: ["El mercado", "集市"],
  academia: ["La academia", "学堂"],
  botica: ["La botica", "药铺"],
  viaje: ["La estación", "驿站"],
  despacho: ["El despacho", "衙门书房"],
  fiesta: ["La fiesta de los farolillos", "灯会"],
  calle: ["La calle de los farolillos", "灯笼街"],
  jardin: ["El jardín imperial", "御花园"],
};

const INK = "#2a1a2e";
const INK2 = "#3b2438";
const WALL = "#7a1a22";
const GLOW = "#f7c95a";

function Roof({ x, y, w, h = 34 }) {
  const e = w * 0.12;
  const d = `M${x - e} ${y + h} Q${x + w * 0.1} ${y + h * 0.55} ${x + w * 0.18} ${y} L${x + w * 0.82} ${y} Q${x + w * 0.9} ${y + h * 0.55} ${x + w + e} ${y + h} Q${x + w / 2} ${y + h * 0.72} ${x - e} ${y + h}Z`;
  return (
    <g>
      <path d={d} fill="url(#dlgTiles)" />
      <path d={d} fill="url(#dlgRoofShade)" />
      <path d={`M${x + w * 0.16} ${y + 1} L${x + w * 0.84} ${y + 1}`} stroke="#5a3410" strokeWidth="6" strokeLinecap="round" />
      <path d={`M${x + w * 0.16} ${y - 1} L${x + w * 0.84} ${y - 1}`} stroke="#ffe6a0" strokeWidth="1.5" opacity=".7" />
      <path d={`M${x - e} ${y + h} Q${x + w / 2} ${y + h * 0.72} ${x + w + e} ${y + h}`} stroke="#ffe6a0" strokeWidth="2.5" fill="none" opacity=".9" />
      <path d={`M${x - e} ${y + h} q-6 -10 2 -18 M${x + w + e} ${y + h} q6 -10 -2 -18`} stroke="#c8961e" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx={x + w * 0.16} cy={y - 2} r="4" fill="#ffe6a0" />
      <circle cx={x + w * 0.84} cy={y - 2} r="4" fill="#ffe6a0" />
      <rect x={x + 4} y={y + h - 2} width={w - 8} height="9" fill="#1f5a4a" />
      <path d={`M${x + 4} ${y + h + 7} H${x + w - 4}`} stroke="#f2c14e" strokeWidth="2" />
      {Array.from({ length: Math.max(3, Math.floor(w / 26)) }).map((_, i, arr) => (
        <rect key={i} x={x + 8 + (i * (w - 20)) / arr.length} y={y + h} width="6" height="5" fill="#f2c14e" opacity=".75" />
      ))}
    </g>
  );
}

function Lantern({ x, y, s = 1, line = 30 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} className="dlg-lantern">
      <line x1="0" y1={-line} x2="0" y2="-14" stroke="#1d1222" strokeWidth="1.5" />
      <circle r="58" fill="url(#dlgGlow)" className="dlg-lglow" />
      <rect x="-9" y="-16" width="18" height="5" rx="2" fill="#c8961e" />
      <ellipse rx="15" ry="13" fill="#c8102e" />
      <ellipse rx="15" ry="13" fill="url(#dlgLanternShade)" />
      <path d="M-6 -12 Q-10 0 -6 12 M6 -12 Q10 0 6 12 M0 -13 V13" stroke="#8f0c21" strokeWidth="1.2" fill="none" />
      <rect x="-9" y="11" width="18" height="5" rx="2" fill="#c8961e" />
      <path d="M0 16 V30" stroke="#f2c14e" strokeWidth="2" />
    </g>
  );
}

function Win({ x, y, w = 34, h = 40, round = false, lit = true }) {
  return round ? (
    <g>
      <circle cx={x} cy={y} r={w / 2} fill={lit ? GLOW : "#2a1a2e"} opacity={lit ? 0.9 : 1} />
      <path d={`M${x - w / 2} ${y} H${x + w / 2} M${x} ${y - w / 2} V${y + w / 2}`} stroke={INK} strokeWidth="3" />
    </g>
  ) : (
    <g>
      <rect x={x - 3} y={y - 3} width={w + 6} height={h + 6} fill="#3a0a10" />
      <rect x={x} y={y} width={w} height={h} fill={lit ? "url(#dlgWin)" : "#2a1a2e"} />
      {lit && <rect x={x - 10} y={y - 10} width={w + 20} height={h + 20} fill="url(#dlgGlow)" opacity=".5" />}
      <path d={`M${x + w / 2} ${y} V${y + h} M${x} ${y + h / 2} H${x + w}`} stroke={INK} strokeWidth="3" />
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={INK} strokeWidth="3" />
    </g>
  );
}

function Sign({ x, y, t, w = 46, h = 70 }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="4" fill="#8f0c21" stroke="#c8961e" strokeWidth="3" />
      <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" fontSize="34" fill="#f2c14e" fontFamily="STKaiti, KaiTi, serif" fontWeight="700">
        {t}
      </text>
    </g>
  );
}

function House({ x, y, w, h, roof = 40, children }) {
  return (
    <g>
      <rect x={x - 14} y={y + h - 4} width={w + 28} height="12" fill="#d9ccb4" />
      <rect x={x - 14} y={y + h + 6} width={w + 28} height="4" fill="#9d8f78" />
      <rect x={x} y={y} width={w} height={h} fill="url(#dlgWall)" />
      <rect x={x} y={y} width={w} height={h} fill="url(#dlgWallShade)" />
      {[x + 4, x + w - 16].map((px) => (
        <rect key={px} x={px} y={y} width="12" height={h} fill="#5e0f18" />
      ))}
      <rect x={x} y={y} width={w} height="14" fill="#1f5a4a" />
      <path d={`M${x} ${y + 14} H${x + w}`} stroke="#f2c14e" strokeWidth="2" />
      {Array.from({ length: Math.floor(w / 30) }).map((_, i) => (
        <path key={i} d={`M${x + 10 + i * 30} ${y + 7} l6 -4 6 4 -6 4z`} fill="#f2c14e" opacity=".8" />
      ))}
      <Roof x={x} y={y - roof + 4} w={w} h={roof} />
      {children}
    </g>
  );
}

const Tree = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill={INK}>
    <path d="M-4 0 Q-2 -40 -8 -70 L4 -70 Q4 -40 6 0Z" />
    <circle cx="-20" cy="-80" r="26" opacity=".9" />
    <circle cx="16" cy="-86" r="30" opacity=".9" />
    <circle cx="-2" cy="-110" r="28" opacity=".9" />
  </g>
);

const Willow = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`} stroke={INK} fill="none" strokeLinecap="round">
    <path d="M0 0 Q6 -90 -10 -170" strokeWidth="12" />
    {[-90, -60, -30, 0, 30, 60, 90, 120].map((dx, i) => (
      <path key={i} d={`M-10 -170 Q${dx / 2} -190 ${dx} -150 T${dx + 4} ${-60 + (i % 3) * 18}`} strokeWidth="2.4" opacity=".85" />
    ))}
  </g>
);

const Pagoda = ({ x, y, s = 1, fill = "#3a2a48" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
    {[0, 1, 2, 3, 4].map((k) => (
      <g key={k}>
        <rect x={-30 + k * 4} y={-k * 46 - 36} width={60 - k * 8} height="36" />
        <path d={`M${-52 + k * 6} ${-k * 46 - 30} Q0 ${-k * 46 - 50} ${52 - k * 6} ${-k * 46 - 30} L${36 - k * 6} ${-k * 46 - 44} L${-36 + k * 6} ${-k * 46 - 44}Z`} />
      </g>
    ))}
    <path d="M0 -270 V-240" stroke={fill} strokeWidth="4" />
  </g>
);

const Crate = ({ x, y, c }) => (
  <g>
    <rect x={x} y={y} width="56" height="26" fill="#5a3b26" stroke={INK} strokeWidth="2" />
    {[8, 22, 36, 50].map((dx, i) => (
      <circle key={i} cx={x + dx - 1} cy={y - 2} r="7.5" fill={c} />
    ))}
  </g>
);

const Stall = ({ x, y, sign, fruit }) => (
  <g>
    <rect x={x} y={y} width="190" height="120" fill={WALL} />
    <rect x={x + 10} y={y + 70} width="170" height="50" fill="#5a3b26" />
    {Array.from({ length: 7 }).map((_, i) => (
      <path key={i} d={`M${x - 10 + i * 30} ${y - 6} h30 v26 q-15 14 -30 0z`} fill={i % 2 ? "#f2c14e" : "#c8102e"} />
    ))}
    <rect x={x - 12} y={y - 18} width="214" height="14" fill="#8f0c21" />
    <Crate x={x + 22} y={y + 46} c={fruit[0]} />
    <Crate x={x + 110} y={y + 46} c={fruit[1]} />
    <Sign x={x + 72} y={y - 96} t={sign} />
  </g>
);

const Table = ({ x, y }) => (
  <g fill={INK}>
    <rect x={x - 46} y={y} width="92" height="8" />
    <rect x={x - 40} y={y + 8} width="6" height="40" />
    <rect x={x + 34} y={y + 8} width="6" height="40" />
    <path d={`M${x - 14} ${y} q0 -20 14 -20 q14 0 14 20z`} fill="#6a4a3a" />
    <path d={`M${x + 14} ${y - 12} q10 -2 10 6`} stroke="#6a4a3a" strokeWidth="3" fill="none" />
    <rect x={x + 22} y={y - 10} width="10" height="10" rx="2" fill="#f2c14e" opacity=".8" />
  </g>
);

function Mid({ tema }) {
  switch (tema) {
    case "hogar":
      return (
        <g>
          <House x={120} y={190} w={330} h={190}>
            <circle cx={285} cy={312} r={66} fill={INK} />
            <circle cx={285} cy={312} r={56} fill="url(#dlgDoorGlow)" />
            <Win x={150} y={232} />
            <Win x={386} y={232} />
          </House>
          <House x={720} y={120} w={300} h={260} roof={44}>
            {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <Win key={`${r}${c}`} x={752 + c * 92} y={150 + r * 66} w={36} h={42} lit={(r + c) % 3 !== 1} />))}
          </House>
          <Tree x={560} y={380} s={1.1} />
          <Tree x={1100} y={380} s={0.9} />
          <path d="M80 160 Q420 230 760 150 Q960 110 1140 170" stroke="#1d1222" strokeWidth="1.5" fill="none" />
          <Lantern x={300} y={196} s={0.9} line={8} />
          <Lantern x={560} y={176} s={0.8} line={10} />
          <Lantern x={940} y={130} s={0.8} line={10} />
        </g>
      );
    case "fonda":
      return (
        <g>
          <House x={160} y={150} w={880} h={230} roof={52}>
            {[0, 1, 2, 3, 4, 5].map((i) => (i === 2 || i === 3 ? null : <Win key={i} x={210 + i * 132} y={190} w={70} h={86} />))}
            <rect x={474} y={220} width={252} height={160} fill="url(#dlgDoorGlow)" />
            <path d="M474 220 H726 M600 220 V380" stroke={INK} strokeWidth="4" />
          </House>
          <Sign x={576} y={94} t="茶" w={48} h={76} />
          <path d="M150 140 Q600 210 1050 140" stroke="#1d1222" strokeWidth="1.5" fill="none" />
          {[230, 380, 820, 970].map((x, i) => (
            <Lantern key={i} x={x} y={156 + (i % 2) * 14} s={0.8} line={10} />
          ))}
          <Table x={300} y={396} />
          <Table x={900} y={396} />
        </g>
      );
    case "mercado":
      return (
        <g>
          <Pagoda x={600} y={300} s={0.6} fill="#2e2440" />
          <Stall x={70} y={250} sign="市" fruit={["#e8542e", "#f2c14e"]} />
          <Stall x={500} y={262} sign="鲜" fruit={["#7fb24a", "#c8102e"]} />
          <Stall x={930} y={250} sign="衣" fruit={["#f08a2a", "#e05a7a"]} />
          <path d="M40 150 Q600 230 1160 150" stroke="#1d1222" strokeWidth="1.5" fill="none" />
          {[180, 420, 780, 1020].map((x, i) => (
            <Lantern key={i} x={x} y={176 + (i % 2) * 12} s={0.75} line={10} />
          ))}
        </g>
      );
    case "academia":
      return (
        <g>
          <House x={110} y={130} w={980} h={250} roof={54}>
            <rect x={380} y={170} width={440} height={170} rx="6" fill="#1f3a2c" stroke="#c8961e" strokeWidth="6" />
            <text x={600} y={235} textAnchor="middle" fontSize="40" fill="#f6efd8" fontFamily="Georgia, serif" fontStyle="italic">
              ¡Hola! · 你好
            </text>
            <text x={600} y={300} textAnchor="middle" fontSize="30" fill="#f2c14e" opacity=".9" fontFamily="Georgia, serif">
              yo soy · tú eres
            </text>
            <Win x={170} y={180} w={70} h={110} />
            <Win x={960} y={180} w={70} h={110} />
          </House>
          <Sign x={576} y={74} t="学" w={48} h={70} />
          {[260, 500, 700, 940].map((x, i) => (
            <g key={i} fill={INK}>
              <rect x={x - 50} y={392} width={100} height={10} />
              <rect x={x - 44} y={402} width={6} height={30} />
              <rect x={x + 38} y={402} width={6} height={30} />
              <rect x={x - 18} y={384} width={36} height={8} fill="#f2e3bd" />
            </g>
          ))}
        </g>
      );
    case "botica":
      return (
        <g>
          <House x={140} y={130} w={920} h={250} roof={54}>
            {[0, 1, 2].map((r) => (
              <g key={r}>
                <rect x={190} y={180 + r * 60} width={340} height={6} fill="#c8961e" />
                {[0, 1, 2, 3, 4, 5].map((c) => (
                  <path key={c} d={`M${206 + c * 54} ${180 + r * 60} v-28 q0 -8 10 -8 h14 q10 0 10 8 v28z`} fill={["#3e7f6a", "#c8102e", "#f2c14e", "#6a4a8a", "#e8e0c8", "#3e7f6a"][(c + r) % 6]} opacity=".9" />
                ))}
              </g>
            ))}
            <rect x={600} y={170} width={410} height={150} fill="#5a3b26" />
            {[0, 1, 2, 3].map((r) => [0, 1, 2, 3, 4, 5].map((c) => <rect key={`${r}${c}`} x={612 + c * 66} y={180 + r * 34} width={58} height={28} fill="#6e4a30" stroke="#c8961e" strokeWidth="1.5" />))}
          </House>
          <Sign x={576} y={74} t="药" w={48} h={70} />
          <rect x={160} y={350} width={880} height={30} fill="#3a2418" />
          <Lantern x={250} y={160} s={0.8} line={14} />
          <Lantern x={950} y={160} s={0.8} line={14} />
        </g>
      );
    case "viaje":
      return (
        <g>
          <House x={330} y={150} w={540} h={230} roof={56}>
            <rect x={520} y={250} width={160} height={130} fill="url(#dlgDoorGlow)" />
            <circle cx={600} cy={200} r={30} fill="#f6efd8" stroke="#c8961e" strokeWidth="5" />
            <path d="M600 200 V180 M600 200 H616" stroke={INK} strokeWidth="4" strokeLinecap="round" />
            <Win x={380} y={230} w={80} h={80} />
            <Win x={740} y={230} w={80} h={80} />
          </House>
          <Sign x={576} y={58} t="站" w={48} h={70} />
          <g fill="#2e2440">
            <rect x={40} y={300} width={250} height={70} rx="18" />
            <rect x={910} y={300} width={250} height={70} rx="18" />
            {[60, 120, 180].map((x) => (
              <rect key={x} x={x} y={314} width={40} height={24} rx="4" fill={GLOW} opacity=".8" />
            ))}
            {[930, 990, 1050, 1110].map((x) => (
              <rect key={x} x={x} y={314} width={36} height={24} rx="4" fill={GLOW} opacity=".8" />
            ))}
          </g>
          <rect x={20} y={372} width={1160} height={8} fill="#1d1222" />
          <g>
            <rect x={210} y={384} width={46} height={40} rx="6" fill="#8f0c21" stroke="#c8961e" strokeWidth="3" />
            <rect x={262} y={398} width={34} height={26} rx="5" fill="#c8961e" />
            <path d="M224 384 v-8 h18 v8" stroke="#1d1222" strokeWidth="3" fill="none" />
          </g>
        </g>
      );
    case "despacho":
      return (
        <g>
          <House x={120} y={110} w={960} h={270} roof={56}>
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <rect x={170 + i * 230} y={150} width={150} height={180} fill={GLOW} opacity=".85" />
                {[0, 1, 2, 3].map((k) => (
                  <path key={k} d={`M${170 + i * 230 + k * 37.5} 150 v180`} stroke={INK} strokeWidth="3" />
                ))}
                <path d={`M${170 + i * 230} 240 h150`} stroke={INK} strokeWidth="3" />
              </g>
            ))}
          </House>
          <Sign x={576} y={52} t="办" w={48} h={70} />
          <g fill={INK}>
            <rect x={420} y={386} width={360} height={14} />
            <rect x={436} y={400} width={10} height={40} />
            <rect x={754} y={400} width={10} height={40} />
            <rect x={470} y={366} width={70} height={20} fill="#f2e3bd" />
            <rect x={660} y={360} width={60} height={26} fill="#8f0c21" />
          </g>
        </g>
      );
    case "fiesta":
      return (
        <g>
          {[
            [220, 110, "#f2c14e"],
            [980, 90, "#ff7a8a"],
            [620, 70, "#f6efd8"],
          ].map(([x, y, c], i) => (
            <g key={i} className="dlg-firework" style={{ animationDelay: `${i * 0.9}s` }}>
              {Array.from({ length: 14 }).map((_, k) => {
                const a = (k / 14) * Math.PI * 2;
                return <line key={k} x1={x + Math.cos(a) * 12} y1={y + Math.sin(a) * 12} x2={x + Math.cos(a) * 54} y2={y + Math.sin(a) * 54} stroke={c} strokeWidth="3" strokeLinecap="round" />;
              })}
            </g>
          ))}
          <Pagoda x={140} y={380} s={0.75} />
          <Pagoda x={1060} y={380} s={0.7} />
          <House x={360} y={230} w={480} h={150} roof={46}>
            <rect x={540} y={270} width={120} height={110} fill="url(#dlgDoorGlow)" />
          </House>
          <Sign x={576} y={152} t="庆" w={48} h={64} />
          {[0, 1].map((r) => (
            <g key={r}>
              <path d={`M0 ${150 + r * 60} Q600 ${250 + r * 60} 1200 ${150 + r * 60}`} stroke="#1d1222" strokeWidth="1.5" fill="none" />
              {Array.from({ length: 9 }).map((_, i) => {
                const x = 70 + i * 133 + r * 60;
                const t = x / 1200;
                const y = 150 + r * 60 + 4 * 100 * t * (1 - t) * 0.5 + 6;
                return <Lantern key={i} x={x} y={y + 16} s={0.6 - r * 0.1} line={6} />;
              })}
            </g>
          ))}
        </g>
      );
    case "calle":
      return (
        <g>
          <Pagoda x={600} y={300} s={0.7} />
          <House x={0} y={170} w={250} h={210} roof={46}>
            <Win x={40} y={210} w={50} h={60} />
            <Win x={150} y={210} w={50} h={60} />
            <rect x={90} y={300} width={60} height={80} fill="url(#dlgDoorGlow)" />
          </House>
          <House x={280} y={230} w={170} h={150} roof={36}>
            <Win x={330} y={266} w={60} h={50} />
          </House>
          <House x={760} y={230} w={170} h={150} roof={36}>
            <Win x={810} y={266} w={60} h={50} />
          </House>
          <House x={960} y={170} w={240} h={210} roof={46}>
            <Win x={1000} y={210} w={50} h={60} />
            <Win x={1110} y={210} w={50} h={60} />
            <rect x={1050} y={300} width={60} height={80} fill="url(#dlgDoorGlow)" />
          </House>
          <g fill={INK}>
            <rect x={556} y={300} width={8} height={90} />
            <path d="M564 312 h70 l14 12 -14 12 h-70z" fill="#8f0c21" stroke="#c8961e" strokeWidth="2" />
            <path d="M556 344 h-70 l-14 12 14 12 h70z" fill="#8f0c21" stroke="#c8961e" strokeWidth="2" />
          </g>
          <path d="M0 150 Q600 260 1200 150" stroke="#1d1222" strokeWidth="1.5" fill="none" />
          {[120, 300, 480, 720, 900, 1080].map((x, i) => {
            const t = x / 1200;
            return <Lantern key={i} x={x} y={150 + 440 * t * (1 - t) * 0.5 + 18} s={0.7} line={8} />;
          })}
        </g>
      );
    default:
      return (
        <g>
          <Pagoda x={880} y={330} s={0.85} />
          <path d="M260 380 Q480 230 700 380" stroke={INK} strokeWidth="16" fill="none" />
          <path d="M260 380 Q480 250 700 380" stroke="#8f0c21" strokeWidth="4" fill="none" />
          {[320, 380, 440, 500, 560, 620].map((x) => (
            <line key={x} x1={x} y1={380 - (x < 480 ? (x - 260) * 0.6 : (700 - x) * 0.6)} x2={x} y2={380 - (x < 480 ? (x - 260) * 0.6 : (700 - x) * 0.6) - 26} stroke="#8f0c21" strokeWidth="3" />
          ))}
          <Willow x={140} y={386} />
          <Tree x={1100} y={384} s={1.1} />
          <Lantern x={480} y={250} s={0.8} line={6} />
        </g>
      );
  }
}

function Ciruelo({ x, y, espejo = false }) {
  const flores = [[60, 70], [110, 52], [150, 92], [40, 130], [190, 60], [92, 110], [220, 104], [130, 30], [20, 96], [170, 128]];
  return (
    <g transform={`translate(${x} ${y}) scale(${espejo ? -1 : 1} 1)`}>
      <path d="M-20 20 Q60 40 120 60 Q170 76 240 100 M60 40 Q80 80 50 140 M120 60 Q150 40 200 50 M150 70 Q160 110 140 140" stroke="#1d0e14" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M-20 20 Q60 40 120 60" stroke="#1d0e14" strokeWidth="12" fill="none" strokeLinecap="round" />
      {flores.map(([fx, fy], i) => (
        <g key={i} transform={`translate(${fx} ${fy})`} className="dlg-flor" style={{ animationDelay: `${i * 0.3}s` }}>
          {[0, 72, 144, 216, 288].map((a) => (
            <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 6} cy={Math.sin((a * Math.PI) / 180) * 6} r="5.4" fill={i % 3 ? "#f7a8bc" : "#fbd2dc"} />
          ))}
          <circle r="3" fill="#f2c14e" />
        </g>
      ))}
    </g>
  );
}

export function DialogScene({ tema }) {
  return (
    <svg className="dlg-scene" viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true" translate="no">
      <defs>
        <linearGradient id="dlgSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#120c2e" />
          <stop offset=".35" stopColor="#3a1a4e" />
          <stop offset=".6" stopColor="#8a2a4e" />
          <stop offset=".78" stopColor="#e0663a" />
          <stop offset="1" stopColor="#ffc46a" />
        </linearGradient>
        <radialGradient id="dlgMoon">
          <stop offset="0" stopColor="#fff7dc" />
          <stop offset=".6" stopColor="#f6e2a8" />
          <stop offset="1" stopColor="#f6e2a8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="dlgGlow">
          <stop offset="0" stopColor="#ffcf6a" stopOpacity=".7" />
          <stop offset="1" stopColor="#ffcf6a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="dlgLanternShade" cx=".35" cy=".35">
          <stop offset="0" stopColor="#ffd27a" stopOpacity=".85" />
          <stop offset=".6" stopColor="#ff6a3a" stopOpacity=".2" />
          <stop offset="1" stopColor="#5e0614" stopOpacity=".5" />
        </radialGradient>
        <radialGradient id="dlgDoorGlow" cx=".5" cy=".6">
          <stop offset="0" stopColor="#ffe3a0" />
          <stop offset="1" stopColor="#e09a3a" />
        </radialGradient>
        <linearGradient id="dlgWallShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".35" />
          <stop offset=".3" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".25" />
        </linearGradient>
        <linearGradient id="dlgFloor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3e2a34" />
          <stop offset=".45" stopColor="#241822" />
          <stop offset="1" stopColor="#0e070c" />
        </linearGradient>
        <pattern id="dlgTiles" width="9" height="10" patternUnits="userSpaceOnUse">
          <rect width="9" height="10" fill="#d9a43a" />
          <rect width="4" height="10" fill="#f2c14e" />
          <rect x="4" width="1.4" height="10" fill="#8a5a1e" />
        </pattern>
        <linearGradient id="dlgRoofShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff2c0" stopOpacity=".35" />
          <stop offset="1" stopColor="#4a2a08" stopOpacity=".55" />
        </linearGradient>
        <linearGradient id="dlgWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7a1420" />
          <stop offset="1" stopColor="#a8202c" />
        </linearGradient>
        <radialGradient id="dlgWin" cx=".5" cy=".6">
          <stop offset="0" stopColor="#fff2c4" />
          <stop offset="1" stopColor="#f0a83a" />
        </radialGradient>
        <linearGradient id="dlgRay" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff2c8" stopOpacity=".32" />
          <stop offset="1" stopColor="#fff2c8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="dlgHorizon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff9a4a" stopOpacity="0" />
          <stop offset="1" stopColor="#ffb05a" stopOpacity=".55" />
        </linearGradient>
        <filter id="dlgBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="dlgBlurL" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <linearGradient id="dlgMist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6d9a6" stopOpacity="0" />
          <stop offset="1" stopColor="#f6d9a6" stopOpacity=".35" />
        </linearGradient>
      </defs>
      <rect width="1200" height="520" fill="url(#dlgSky)" />
      <g className="dlg-stars" fill="#fff3cf">
        {[[80, 40], [190, 90], [330, 30], [460, 70], [710, 36], [820, 96], [960, 50], [1110, 80], [1040, 20], [260, 140]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 ? 1.6 : 2.4} style={{ animationDelay: `${(i % 5) * 0.6}s` }} />
        ))}
      </g>
      <g className="dlg-rays" style={{ transformOrigin: "980px 100px" }}>
        {[-70, -48, -26, -6, 14, 36, 58].map((a, i) => (
          <polygon key={i} points={`980,100 ${980 + Math.cos(((a + 90) * Math.PI) / 180) * 900 - 40},${100 + Math.sin(((a + 90) * Math.PI) / 180) * 900} ${980 + Math.cos(((a + 90) * Math.PI) / 180) * 900 + 40},${100 + Math.sin(((a + 90) * Math.PI) / 180) * 900}`} fill="url(#dlgRay)" opacity={0.5 + (i % 2) * 0.3} />
        ))}
      </g>
      <circle cx="980" cy="100" r="150" fill="url(#dlgMoon)" opacity=".55" />
      <circle cx="980" cy="100" r="78" fill="none" stroke="#fff2c8" strokeOpacity=".25" strokeWidth="2" />
      <circle cx="980" cy="100" r="52" fill="#fff6dc" />
      <circle cx="964" cy="90" r="9" fill="#f0dca8" opacity=".6" />
      <circle cx="996" cy="114" r="6" fill="#f0dca8" opacity=".5" />
      <rect y="200" width="1200" height="180" fill="url(#dlgHorizon)" />
      <g className="dlg-far">
        <path d="M0 300 Q120 210 240 270 T480 250 T720 270 T960 230 T1200 270 V520 H0Z" fill="#6a2a5a" opacity=".55" />
        <g fill="#4a1e46" opacity=".9">
          {Array.from({ length: 9 }).map((_, i) => {
            const x = i * 140 - 20;
            const w = 90 + (i % 3) * 20;
            const y = 300 - (i % 2) * 18;
            return (
              <g key={i}>
                <rect x={x} y={y} width={w} height="80" />
                <path d={`M${x - 16} ${y + 4} Q${x + 10} ${y - 4} ${x + 16} ${y - 20} L${x + w - 16} ${y - 20} Q${x + w - 10} ${y - 4} ${x + w + 16} ${y + 4}Z`} />
                {[0, 1, 2].map((k) => (
                  <rect key={k} x={x + 14 + k * (w / 3)} y={y + 16} width="8" height="10" fill="#ffc86a" opacity={(i + k) % 3 ? 0.65 : 0.15} />
                ))}
              </g>
            );
          })}
        </g>
        <path d="M0 350 Q160 300 320 330 T640 320 T960 330 T1200 320 V520 H0Z" fill="#3a1630" opacity=".9" />
      </g>
      <rect y="240" width="1200" height="150" fill="url(#dlgMist)" className="dlg-mist" />
      <g className="dlg-mid">
        <Mid tema={tema} />
      </g>
      <path d="M0 380 H1200 V520 H0Z" fill="url(#dlgFloor)" />
      {Array.from({ length: 13 }).map((_, i) => (
        <line key={i} x1={600 + (i - 6) * 70} y1="380" x2={600 + (i - 6) * 190} y2="520" stroke="#c8961e" strokeWidth="1.2" opacity=".22" />
      ))}
      {[410, 450, 500].map((y) => (
        <line key={y} x1="0" y1={y} x2="1200" y2={y} stroke="#c8961e" strokeWidth="1" opacity=".16" />
      ))}
      <rect y="378" width="1200" height="6" fill="#f2c14e" opacity=".8" />
      <g filter="url(#dlgBlurL)" opacity=".55">
        <ellipse cx="980" cy="440" rx="60" ry="80" fill="#fff2c8" opacity=".35" />
        {[200, 420, 600, 780, 1000].map((x, i) => (
          <ellipse key={x} cx={x} cy={430 + (i % 2) * 20} rx="40" ry="18" fill="#ffb84a" />
        ))}
      </g>
      <g className="dlg-bokeh" filter="url(#dlgBlur)">
        <circle cx="70" cy="470" r="34" fill="#ffcf6a" opacity=".35" />
        <circle cx="1140" cy="455" r="44" fill="#ff7a5a" opacity=".3" />
        <circle cx="1080" cy="500" r="22" fill="#ffcf6a" opacity=".4" />
        <circle cx="140" cy="505" r="18" fill="#ff9a6a" opacity=".35" />
      </g>
      <Ciruelo x={0} y={0} />
      <Ciruelo x={1200} y={0} espejo />
    </svg>
  );
}
