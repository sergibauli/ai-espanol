import * as React from "react";

// Personajes ilustrados (SVG propio) del escenario de diálogos, estilo novela visual, de medio cuerpo.
// Rig articulado: cuerpo › torso, cabeza (cejas, ojos con mirada y párpados, bocas por visema), brazos (hombro › codo › mano).
// Las poses y gestos se controlan desde CSS (dialogo.css) con clases y variables; la boca con data-v (visema).
// Miran hacia la derecha; el escenario los voltea cuando están a la derecha.

const PIELES = [
  ["#f4d6bb", "#e2b190", "#c98f6c"],
  ["#eec7a4", "#d9a47e", "#bd8460"],
  ["#e4b892", "#cf9b72", "#ad7852"],
  ["#d6a37c", "#bf8760", "#9a6644"],
  ["#c48b63", "#a8704c", "#835236"],
];
const PELOS = ["#1a1214", "#2a1a14", "#3b2416", "#4e2c1a", "#6b3a1e", "#2a2022"];
const IRIS = ["#3a2214", "#4a2c18", "#5c3a1e", "#4a4a24", "#2e2016"];
const TUNICAS = [
  { robe: "#b3122e", luz: "#e0405a", som: "#6e0717", borde: "#f2c14e", faja: "#1d6b58", cuello: "#1d6b58" },
  { robe: "#1d6b58", luz: "#3a9a80", som: "#0e3a30", borde: "#f2c14e", faja: "#b3122e", cuello: "#b3122e" },
  { robe: "#2c3a8e", luz: "#5468c0", som: "#161e52", borde: "#f2c14e", faja: "#c8102e", cuello: "#f2c14e" },
  { robe: "#7a1f6a", luz: "#a8489a", som: "#420c3a", borde: "#f2c14e", faja: "#1d6b58", cuello: "#f6e2a8" },
  { robe: "#c0601a", luz: "#e88a40", som: "#7a3608", borde: "#fff0c0", faja: "#2c3a8e", cuello: "#2c3a8e" },
  { robe: "#13607a", luz: "#3a90aa", som: "#083646", borde: "#f2c14e", faja: "#b3122e", cuello: "#f6e2a8" },
];
export const NUM_TUNICAS = TUNICAS.length;
export const tunicaN = (i) => TUNICAS[i % TUNICAS.length];

const MAYOR = /^(abuel|señor|sr\.|don |doña|anciano|director|jef|profesor|doctor|médico|madre|padre)/i;
const NINO = /^(niñ|hij|chico|chica|alumn|estudiante|hermano peque)/i;

function hash(s) {
  let h = 2166136261;
  for (const ch of String(s)) h = Math.imul(h ^ ch.codePointAt(0), 16777619) >>> 0;
  return h;
}

/** Rasgos estables de un personaje según su nombre (la voz ya marca el género). */
export function rasgos(nombre, mujer, indice = 0) {
  const h = hash(nombre);
  const edad = /^abuel|ancian/i.test(nombre) ? "anciano" : MAYOR.test(nombre) ? "adulto" : NINO.test(nombre) ? "nino" : "joven";
  const canas = edad === "anciano" || (edad === "adulto" && (h >>> 4) % 3 === 0);
  const pelo = edad === "anciano" ? "#d8d2cc" : canas ? "#7a6e68" : PELOS[h % PELOS.length];
  const peinado = mujer ? ["mono", "melena", "mono", "melena"][(h >>> 3) % 4] : ["corto", "recogido", "flequillo", "corto"][(h >>> 3) % 4];
  return {
    mujer,
    edad,
    piel: PIELES[(h >>> 5) % PIELES.length],
    pelo,
    iris: IRIS[(h >>> 11) % IRIS.length],
    peinado: edad === "anciano" ? (mujer ? "mono" : "recogido") : edad === "nino" ? (mujer ? "coletas" : "flequillo") : peinado,
    barba: !mujer && edad !== "nino" && ((h >>> 7) % 3 === 0 || edad === "anciano") ? ((h >>> 13) % 2 ? "perilla" : "completa") : null,
    gafas: edad === "adulto" ? (h >>> 9) % 2 === 0 : (h >>> 9) % 9 === 0,
    tunica: TUNICAS[(h + indice) % TUNICAS.length],
    parpadeo: 3.6 + ((h >>> 15) % 20) / 10,
  };
}

const mezcla = (a, b, t) => {
  const p = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
  const [x, y] = [p(a), p(b)];
  return "#" + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, "0")).join("");
};

/* ---------------- Cabeza ---------------- */

function Ojo({ cx, cy, r, id, lado }) {
  const w = r.edad === "nino" ? 18 : r.mujer ? 17 : 15.5;
  const h = r.edad === "nino" ? 11.5 : r.mujer ? 10.5 : 8.6;
  const almendra = `M${cx - w} ${cy + 1} Q${cx - w * 0.35} ${cy - h * 1.35} ${cx + w * 0.55} ${cy - h * 0.95} Q${cx + w * 0.95} ${cy - h * 0.4} ${cx + w} ${cy + 0.5} Q${cx + w * 0.2} ${cy + h * 1.15} ${cx - w} ${cy + 1}Z`;
  const sombra = r.piel[2];
  return (
    <g>
      <clipPath id={`${id}o${lado}`}>
        <path d={almendra} />
      </clipPath>
      <path d={almendra} fill="#fbf6ee" />
      <g clipPath={`url(#${id}o${lado})`}>
        <path d={`M${cx - w} ${cy - h * 2} H${cx + w} V${cy - h * 0.3} Q${cx} ${cy - h * 1.2} ${cx - w} ${cy - h * 0.3}Z`} fill={sombra} opacity=".28" />
        <g className="pj-iris">
          <circle cx={cx + 1} cy={cy} r={h * 1.12} fill={`url(#${id}iris)`} />
          <circle cx={cx + 1} cy={cy} r={h * 1.12} fill="none" stroke="#1a0e0a" strokeWidth="1.2" opacity=".7" />
          <circle cx={cx + 1} cy={cy + 0.5} r={h * 0.52} fill="#0e0808" />
          <circle cx={cx + 4} cy={cy - 3.2} r="2.6" fill="#fff" />
          <circle cx={cx - 1.5} cy={cy + 3.4} r="1.1" fill="#fff" opacity=".75" />
        </g>
        {/* Párpado: baja al parpadear */}
        <path className="pj-parpado" d={`M${cx - w - 2} ${cy - h * 2} H${cx + w + 2} V${cy + h * 1.6} H${cx - w - 2}Z`} fill={r.piel[0]} />
      </g>
      <path d={`M${cx - w - 1} ${cy + 1.5} Q${cx - w * 0.35} ${cy - h * 1.45} ${cx + w * 0.55} ${cy - h * 1.02} Q${cx + w * 0.95} ${cy - h * 0.45} ${cx + w + 1.5} ${cy + 1}`} stroke="#1a0e0a" strokeWidth={r.mujer ? 3.4 : 2.6} fill="none" strokeLinecap="round" />
      {r.mujer && <path d={`M${cx + w * 0.75} ${cy - h * 0.75} l5 -4 M${cx + w * 0.95} ${cy - h * 0.35} l6 -2`} stroke="#1a0e0a" strokeWidth="1.8" strokeLinecap="round" />}
      <path d={`M${cx - w * 0.7} ${cy - h * 1.75} Q${cx} ${cy - h * 2.35} ${cx + w * 0.75} ${cy - h * 1.55}`} stroke={sombra} strokeWidth="1.3" fill="none" opacity=".7" />
      <path d={`M${cx - w * 0.6} ${cy + h * 1.05} Q${cx} ${cy + h * 1.4} ${cx + w * 0.7} ${cy + h * 0.75}`} stroke={sombra} strokeWidth="1.2" fill="none" opacity=".5" />
    </g>
  );
}

function Bocas({ r }) {
  const labio = r.mujer ? mezcla(r.piel[2], "#c8283a", 0.55) : mezcla(r.piel[2], "#a83a3a", 0.3);
  const labioL = mezcla(labio, "#ffd0c0", 0.25);
  const dentro = "#4a0f16";
  const cx = 201;
  const cy = 213;
  return (
    <g className="pj-bocas">
      <g className="v v-r">
        <path d={`M${cx - 16} ${cy - 1} Q${cx - 8} ${cy - 5} ${cx} ${cy - 3} Q${cx + 8} ${cy - 5} ${cx + 16} ${cy - 1} Q${cx} ${cy + 1} ${cx - 16} ${cy - 1}Z`} fill={labio} />
        <path d={`M${cx - 14} ${cy} Q${cx} ${cy + 11} ${cx + 14} ${cy} Q${cx} ${cy + 3} ${cx - 14} ${cy}Z`} fill={labioL} />
        <path d={`M${cx - 17} ${cy - 1.5} Q${cx} ${cy + 2.5} ${cx + 17} ${cy - 1.5}`} stroke={mezcla(labio, "#000000", 0.45)} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d={`M${cx - 4} ${cy + 5} Q${cx} ${cy + 6} ${cx + 4} ${cy + 5}`} stroke="#fff" strokeOpacity=".35" strokeWidth="1.5" fill="none" />
      </g>
      <g className="v v-m">
        <path d={`M${cx - 15} ${cy} Q${cx} ${cy - 4} ${cx + 15} ${cy} Q${cx} ${cy + 7} ${cx - 15} ${cy}Z`} fill={labio} />
        <path d={`M${cx - 16} ${cy + 0.5} Q${cx} ${cy + 1.5} ${cx + 16} ${cy + 0.5}`} stroke={mezcla(labio, "#000000", 0.5)} strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
      <g className="v v-c">
        <path d={`M${cx - 15} ${cy - 1} Q${cx} ${cy - 5} ${cx + 15} ${cy - 1} Q${cx} ${cy + 9} ${cx - 15} ${cy - 1}Z`} fill={dentro} />
        <path d={`M${cx - 12} ${cy - 2} Q${cx} ${cy - 4} ${cx + 12} ${cy - 2} L${cx + 11} ${cy + 0.5} Q${cx} ${cy - 1} ${cx - 11} ${cy + 0.5}Z`} fill="#fbf6ee" />
        <path d={`M${cx - 16} ${cy - 1} Q${cx - 8} ${cy - 6} ${cx} ${cy - 4} Q${cx + 8} ${cy - 6} ${cx + 16} ${cy - 1} Q${cx} ${cy - 3} ${cx - 16} ${cy - 1}Z`} fill={labio} />
        <path d={`M${cx - 14} ${cy + 1} Q${cx} ${cy + 12} ${cx + 14} ${cy + 1} Q${cx} ${cy + 6} ${cx - 14} ${cy + 1}Z`} fill={labioL} />
      </g>
      <g className="v v-e">
        <path d={`M${cx - 18} ${cy - 2} Q${cx} ${cy - 6} ${cx + 18} ${cy - 2} Q${cx + 10} ${cy + 11} ${cx} ${cy + 11} Q${cx - 10} ${cy + 11} ${cx - 18} ${cy - 2}Z`} fill={dentro} />
        <path d={`M${cx - 14} ${cy - 3} Q${cx} ${cy - 5} ${cx + 14} ${cy - 3} L${cx + 13} ${cy + 1.5} Q${cx} ${cy} ${cx - 13} ${cy + 1.5}Z`} fill="#fbf6ee" />
        <path d={`M${cx - 10} ${cy + 9} Q${cx} ${cy + 6} ${cx + 10} ${cy + 9} L${cx + 9} ${cy + 10.5} Q${cx} ${cy + 9} ${cx - 9} ${cy + 10.5}Z`} fill="#f0e6dc" />
        <path d={`M${cx - 19} ${cy - 2} Q${cx - 9} ${cy - 8} ${cx} ${cy - 5.5} Q${cx + 9} ${cy - 8} ${cx + 19} ${cy - 2} Q${cx} ${cy - 4.5} ${cx - 19} ${cy - 2}Z`} fill={labio} />
        <path d={`M${cx - 15} ${cy + 6} Q${cx} ${cy + 16} ${cx + 15} ${cy + 6} Q${cx} ${cy + 11} ${cx - 15} ${cy + 6}Z`} fill={labioL} />
      </g>
      <g className="v v-a">
        <path d={`M${cx - 16} ${cy - 3} Q${cx} ${cy - 7} ${cx + 16} ${cy - 3} Q${cx + 14} ${cy + 18} ${cx} ${cy + 20} Q${cx - 14} ${cy + 18} ${cx - 16} ${cy - 3}Z`} fill={dentro} />
        <path d={`M${cx - 12} ${cy - 4} Q${cx} ${cy - 6} ${cx + 12} ${cy - 4} L${cx + 11} ${cy} Q${cx} ${cy - 1.5} ${cx - 11} ${cy}Z`} fill="#fbf6ee" />
        <ellipse cx={cx} cy={cy + 14} rx="9" ry="5" fill="#d0606a" />
        <path d={`M${cx - 17} ${cy - 3} Q${cx - 8} ${cy - 9} ${cx} ${cy - 6.5} Q${cx + 8} ${cy - 9} ${cx + 17} ${cy - 3} Q${cx} ${cy - 5.5} ${cx - 17} ${cy - 3}Z`} fill={labio} />
        <path d={`M${cx - 14} ${cy + 15} Q${cx} ${cy + 26} ${cx + 14} ${cy + 15} Q${cx} ${cy + 21} ${cx - 14} ${cy + 15}Z`} fill={labioL} />
      </g>
      <g className="v v-o">
        <ellipse cx={cx} cy={cy + 4} rx="8.5" ry="10" fill={labio} />
        <ellipse cx={cx} cy={cy + 4} rx="5" ry="6.5" fill={dentro} />
        <path d={`M${cx - 6} ${cy + 11} Q${cx} ${cy + 14} ${cx + 6} ${cy + 11}`} stroke={labioL} strokeWidth="2.5" fill="none" />
      </g>
    </g>
  );
}

function PeloDetras({ r, id }) {
  const fill = `url(#${id}pelo)`;
  if (r.peinado === "melena") return <path d="M142 118 Q122 240 138 400 Q168 414 200 404 Q234 414 262 400 Q280 240 258 118 Q230 60 200 58 Q170 60 142 118Z" fill={fill} />;
  if (r.peinado === "coletas")
    return (
      <g fill={fill}>
        <path d="M148 118 Q112 160 118 250 Q124 290 134 250 Q132 190 160 140Z" />
        <path d="M252 118 Q288 160 282 250 Q276 290 266 250 Q268 190 240 140Z" />
      </g>
    );
  if (r.peinado === "mono")
    return (
      <g>
        <ellipse cx="200" cy="52" rx="38" ry="27" fill={fill} />
        <path d="M168 50 Q200 30 232 50 M172 60 Q200 44 228 60" stroke={mezcla(r.pelo, "#000000", 0.4)} strokeWidth="1.6" fill="none" opacity=".7" />
        <path d="M176 44 Q200 34 224 44" stroke="#fff" strokeOpacity=".25" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
    );
  if (r.peinado === "recogido")
    return (
      <g>
        <ellipse cx="200" cy="52" rx="22" ry="18" fill={fill} />
        <path d="M178 60 L222 60 L218 42 L210 48 L200 36 L190 48 L182 42Z" fill="#c8961e" stroke="#7a5410" strokeWidth="1.5" />
        <circle cx="200" cy="46" r="4" fill="#1d6b58" stroke="#f2c14e" strokeWidth="1.5" />
        <path d="M160 54 L242 48" stroke="#f2c14e" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    );
  return null;
}

function PeloDelante({ r, id }) {
  const osc = mezcla(r.pelo, "#000000", 0.45);
  const fill = `url(#${id}pelo)`;
  const brillo = <path d="M166 80 Q196 62 232 76" stroke="#fff" strokeOpacity=".22" strokeWidth="6" fill="none" strokeLinecap="round" />;
  const mechas = (ds) => ds.map((d, i) => <path key={i} d={d} stroke={osc} strokeWidth="1.3" fill="none" opacity=".55" />);
  switch (r.peinado) {
    case "mono":
      return (
        <g>
          <path d="M141 156 C134 96 164 64 200 64 C238 64 268 96 259 156 C254 124 242 104 218 96 C210 104 204 108 198 98 C176 100 152 118 141 156Z" fill={fill} />
          <path d="M146 126 Q138 170 146 206 Q144 222 152 232 Q150 200 156 140Z M256 126 Q264 170 256 206 Q258 222 250 232 Q252 200 246 140Z" fill={fill} />
          {mechas(["M160 100 Q176 80 198 76", "M220 80 Q244 92 252 120", "M150 140 Q146 170 151 205"])}
          {brillo}
          <path d="M218 40 L262 70" stroke="#f2c14e" strokeWidth="4" strokeLinecap="round" />
          <circle cx="262" cy="70" r="5" fill="#c8102e" stroke="#f2c14e" strokeWidth="1.5" />
          <path className="pj-borla" d="M262 75 L262 100 M258 100 L266 100" stroke="#c8102e" strokeWidth="3" strokeLinecap="round" />
          <circle cx="216" cy="38" r="5" fill="#fff6e0" />
        </g>
      );
    case "melena":
      return (
        <g>
          <path d="M140 170 C132 96 164 58 200 58 C238 58 270 96 260 170 C256 132 246 108 228 98 Q214 124 204 96 Q194 122 170 104 C156 118 146 138 140 170Z" fill={fill} />
          {mechas(["M204 98 Q206 76 200 62", "M170 106 Q160 130 152 166", "M228 100 Q244 126 250 166"])}
          {brillo}
        </g>
      );
    case "coletas":
      return (
        <g>
          <path d="M142 150 C136 94 166 62 200 62 C236 62 266 94 258 150 C250 118 236 104 200 106 C176 104 152 116 142 150Z" fill={fill} />
          <path d="M160 100 Q180 120 200 104 Q220 120 240 100 Q232 90 200 92 Q168 90 160 100Z" fill={fill} />
          <circle cx="150" cy="122" r="7" fill="#c8102e" stroke="#f2c14e" strokeWidth="1.5" />
          <circle cx="250" cy="122" r="7" fill="#c8102e" stroke="#f2c14e" strokeWidth="1.5" />
          {brillo}
        </g>
      );
    case "recogido":
      return (
        <g>
          <path d="M143 146 C138 92 166 64 200 64 C236 64 264 92 257 146 C252 118 240 102 220 96 Q200 90 180 96 C160 102 148 118 143 146Z" fill={fill} />
          {mechas(["M170 92 Q186 76 200 74", "M230 92 Q216 78 202 74", "M152 120 Q148 136 146 150"])}
          {brillo}
        </g>
      );
    case "flequillo":
      return (
        <g>
          <path d="M142 148 C136 92 166 60 202 60 C240 60 266 92 258 146 C250 124 244 112 236 108 Q226 126 214 108 Q200 128 186 108 Q172 124 160 110 C152 120 146 132 142 148Z" fill={fill} />
          {mechas(["M186 108 Q190 86 200 66", "M214 108 Q214 86 224 70", "M160 110 Q164 90 176 72"])}
          {brillo}
        </g>
      );
    default:
      return (
        <g>
          <path d="M143 144 C138 88 168 60 202 60 C238 60 264 90 257 144 C252 120 246 106 234 100 Q214 94 196 104 Q174 92 158 112 C150 120 146 130 143 144Z" fill={fill} />
          <path d="M144 140 Q142 156 148 168 L150 142Z M256 140 Q258 156 252 168 L250 142Z" fill={fill} />
          {mechas(["M196 104 Q208 82 232 76", "M174 96 Q184 80 200 72"])}
          {brillo}
        </g>
      );
  }
}

function Cabeza({ r, id }) {
  const [base, medio, sombra] = r.piel;
  const varon = !r.mujer;
  const cara = varon
    ? "M146 140 C146 92 170 68 201 68 C233 68 256 92 256 140 C256 172 252 196 240 214 C228 232 214 242 201 242 C188 242 174 232 162 214 C150 196 146 172 146 140Z"
    : "M147 140 C147 94 171 70 201 70 C232 70 255 94 255 140 C255 174 248 198 234 216 C222 232 211 240 201 240 C191 240 180 232 168 216 C154 198 147 174 147 140Z";
  const ceja = r.edad === "anciano" ? "#cfc8c0" : mezcla(r.pelo, "#000000", 0.1);
  const g = varon ? 1.6 : -1.6;
  return (
    <g className="pj-cabeza">
      <PeloDetras r={r} id={id} />
      {[148, 254].map((x, i) => (
        <g key={x}>
          <ellipse cx={x} cy="160" rx="9" ry="16" fill={medio} />
          <path d={i ? `M${x - 2} 150 Q${x + 4} 160 ${x - 1} 170` : `M${x + 2} 150 Q${x - 4} 160 ${x + 1} 170`} stroke={sombra} strokeWidth="2" fill="none" />
          {r.mujer && (
            <g>
              <circle cx={x} cy="178" r="3.5" fill="#f2c14e" />
              <path d={`M${x} 181 v12`} stroke="#f2c14e" strokeWidth="1.5" />
              <circle cx={x} cy="196" r="3" fill="#1d6b58" />
            </g>
          )}
        </g>
      ))}
      <path d={cara} fill={`url(#${id}piel)`} />
      <path d={cara} fill="none" stroke={sombra} strokeWidth="1.5" opacity=".6" />
      <path d="M150 128 Q200 98 252 128 Q248 112 200 92 Q154 112 150 128Z" fill={sombra} opacity=".35" />
      <ellipse cx="168" cy="190" rx="15" ry="8" fill="#f07070" opacity=".24" filter={`url(#${id}suave)`} />
      <ellipse cx="236" cy="190" rx="15" ry="8" fill="#f07070" opacity=".24" filter={`url(#${id}suave)`} />
      <g className="pj-ceja pj-ceja-i">
        <path d={`M160 ${139 - (varon ? 0 : 2)} Q172 ${128 - g} 192 ${132 - g / 2} Q193 ${135 + g} 190 ${136 + g} Q174 133 162 142Z`} fill={ceja} />
      </g>
      <g className="pj-ceja pj-ceja-d">
        <path d={`M210 ${132 - g / 2} Q230 ${128 - g} 243 ${139 - (varon ? 0 : 2)} L241 142 Q228 133 212 ${136 + g} Q209 ${135 + g} 210 ${132 - g / 2}Z`} fill={ceja} />
      </g>
      <Ojo cx={177} cy={156} r={r} id={id} lado="i" />
      <Ojo cx={225} cy={156} r={r} id={id} lado="d" />
      {r.gafas && (
        <g stroke="#3b2416" strokeWidth="2.6" fill="rgba(255,255,255,.08)">
          <rect x="157" y="142" width="40" height="28" rx="10" />
          <rect x="205" y="142" width="40" height="28" rx="10" />
          <path d="M197 152 Q201 148 205 152 M157 152 L147 148 M245 152 L255 148" fill="none" />
        </g>
      )}
      <path d="M202 158 Q205 176 209 186" stroke={mezcla(base, "#ffffff", 0.4)} strokeWidth="3" fill="none" opacity=".7" strokeLinecap="round" />
      <path d={varon ? "M190 190 Q194 198 201 198 Q208 198 212 190" : "M194 192 Q197 197 202 197 Q207 197 209 192"} stroke={sombra} strokeWidth={varon ? 2.2 : 1.8} fill="none" strokeLinecap="round" opacity={varon ? 1 : 0.8} />
      <path d="M195 194 q2 2 4 1 M203 195 q2 1 4 -1" stroke={mezcla(sombra, "#000000", 0.3)} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {varon && <path d="M208 176 Q214 186 210 192" stroke={sombra} strokeWidth="1.6" fill="none" opacity=".5" />}
      {r.edad === "anciano" && <path d="M164 176 q6 4 12 0 M226 176 q6 4 12 0 M178 206 q-4 10 2 18 M224 206 q4 10 -2 18" stroke={sombra} strokeWidth="1.5" fill="none" opacity=".7" />}
      <Bocas r={r} />
      {r.barba && (
        <g fill={r.edad === "anciano" ? "#e8e2da" : r.pelo}>
          <path d="M184 204 Q201 197 218 204 Q214 200 201 200 Q188 200 184 204Z M183 204 Q178 210 176 214 Q182 208 190 206Z M219 204 Q224 210 226 214 Q220 208 212 206Z" />
          {r.barba === "completa" ? (
            <path d="M156 196 Q160 236 201 250 Q242 236 246 196 Q240 222 226 228 Q214 236 201 234 Q188 236 176 228 Q162 222 156 196Z" />
          ) : (
            <path d="M190 230 Q201 252 212 230 Q206 236 201 236 Q196 236 190 230Z" />
          )}
        </g>
      )}
      <PeloDelante r={r} id={id} />
    </g>
  );
}

/* ---------------- Cuerpo ---------------- */

function Mano({ r, id }) {
  const [base, , sombra] = r.piel;
  return (
    <g className="pj-mano">
      <path d="M-12 -2 Q-17 22 -11 40 Q-2 50 9 42 Q16 24 12 -2Z" fill={`url(#${id}piel)`} stroke={sombra} strokeWidth="1.3" />
      <path d="M10 6 Q24 14 20 28 Q14 28 9 18" fill={base} stroke={sombra} strokeWidth="1.3" />
      <path d="M-6 30 v10 M0 32 v11 M6 30 v9" stroke={sombra} strokeWidth="1.1" opacity=".6" />
    </g>
  );
}

// El brazo se pinta en dos capas con el mismo rig: la manga superior por detrás del torso
// y el antebrazo (con la mano) por delante, para que la manga salga del hombro de forma natural.
function Brazo({ r, id, cls, x, capa }) {
  const t = r.tunica;
  return (
    <g transform={`translate(${x} 300)`}>
      <g className={`pj-hombro ${cls}`}>
        {capa === "detras" && (
          <g>
            <path d="M-30 -8 Q-38 80 -28 168 L28 168 Q34 80 26 -16 Q0 -30 -30 -8Z" fill={`url(#${id}manga)`} />
            <path d="M-12 20 Q-18 90 -12 160" stroke={t.som} strokeWidth="2" fill="none" opacity=".45" />
          </g>
        )}
        <g transform="translate(0 160)">
          <g className={`pj-codo ${cls}`}>
            {capa === "delante" && (
              <g>
                <path d="M-28 -14 Q-38 70 -50 146 Q0 168 50 146 Q36 70 28 -14 Q0 -24 -28 -14Z" fill={`url(#${id}manga)`} />
                <path d="M-10 10 Q-18 80 -28 140 M12 14 Q16 80 26 140" stroke={t.som} strokeWidth="2" fill="none" opacity=".4" />
                <path d="M-50 146 Q0 168 50 146 L46 130 Q0 150 -46 130Z" fill={t.borde} />
                <g transform="translate(0 150)">
                  <Mano r={r} id={id} />
                </g>
              </g>
            )}
          </g>
        </g>
      </g>
    </g>
  );
}

function Torso({ r, id }) {
  const t = r.tunica;
  const [, medio, sombra] = r.piel;
  const silueta = "M104 306 Q112 270 168 260 L201 268 L234 260 Q290 270 298 306 L312 780 L90 780Z";
  return (
    <g className="pj-torso">
      <path d="M181 222 L181 268 Q201 280 221 268 L221 222Z" fill={medio} />
      <path d="M181 230 Q201 252 221 230 L221 244 Q201 262 181 244Z" fill={sombra} opacity=".45" />
      <path d={silueta} fill={`url(#${id}tela)`} />
      <path d={silueta} fill={`url(#${id}damasco)`} />
      <path d={silueta} fill={`url(#${id}luz)`} />
      <g stroke={t.som} strokeWidth="2.2" fill="none" opacity=".4" strokeLinecap="round">
        <path d="M130 520 Q126 640 120 770" />
        <path d="M168 520 Q170 650 164 770" />
        <path d="M244 520 Q240 650 246 770" />
        <path d="M276 520 Q282 640 286 770" />
      </g>
      <path d="M174 262 L201 346 L228 262 L218 260 L201 312 L184 260Z" fill="#f6efe2" />
      <path d="M218 258 L236 262 L206 322 L196 310Z" fill={t.cuello} />
      <path d="M163 262 L184 256 L274 432 L252 444Z" fill={t.cuello} />
      <path d="M163 262 L252 444" stroke={t.borde} strokeWidth="3" />
      <path d="M184 256 L274 432" stroke={t.borde} strokeWidth="3" />
      <g stroke={t.borde} strokeWidth="1.5" fill="none" opacity=".85">
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <path key={k} d={`M${178 + k * 15} ${290 + k * 25} q5 -6 9 0 q-4 4 0 7`} />
        ))}
      </g>
      <path d="M100 448 Q201 462 302 448 L304 500 Q201 514 98 500Z" fill={t.faja} />
      <path d="M100 448 Q201 462 302 448 L302 456 Q201 470 100 456Z M98 492 Q201 506 304 492 L304 500 Q201 514 98 500Z" fill={t.borde} />
      <path d="M100 474 Q201 488 302 474" stroke={t.borde} strokeWidth="1.2" strokeDasharray="6 5" fill="none" opacity=".7" />
      <circle cx="201" cy="478" r="13" fill={t.borde} />
      <circle cx="201" cy="478" r="8" fill={t.faja} stroke={mezcla(t.borde, "#000000", 0.3)} strokeWidth="1.5" />
      <g className="pj-jade">
        <path d="M150 504 Q148 540 152 570" stroke="#c8102e" strokeWidth="2.5" fill="none" />
        <circle cx="152" cy="584" r="15" fill="#7fbf9a" stroke="#3e7f5e" strokeWidth="2" />
        <circle cx="152" cy="584" r="5" fill={t.robe} />
        <path d="M152 600 L148 640 M152 600 L156 640 M152 600 L152 642" stroke="#c8102e" strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </g>
  );
}

/** Personaje de medio cuerpo (viewBox 400×780), o solo la cabeza con soloCabeza. */
export function Personaje({ r, soloCabeza = false, className = "" }) {
  const id = "pj" + React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const t = r.tunica;
  const [base, medio, sombra] = r.piel;
  const defs = (
    <defs>
      <radialGradient id={`${id}piel`} cx=".42" cy=".38" r=".7">
        <stop offset="0" stopColor={mezcla(base, "#ffffff", 0.25)} />
        <stop offset=".55" stopColor={base} />
        <stop offset=".85" stopColor={medio} />
        <stop offset="1" stopColor={sombra} />
      </radialGradient>
      <radialGradient id={`${id}iris`} cx=".5" cy=".65" r=".6">
        <stop offset="0" stopColor={mezcla(r.iris, "#e0a050", 0.45)} />
        <stop offset=".6" stopColor={r.iris} />
        <stop offset="1" stopColor={mezcla(r.iris, "#000000", 0.5)} />
      </radialGradient>
      <linearGradient id={`${id}pelo`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={mezcla(r.pelo, "#ffffff", 0.18)} />
        <stop offset=".5" stopColor={r.pelo} />
        <stop offset="1" stopColor={mezcla(r.pelo, "#000000", 0.35)} />
      </linearGradient>
      <linearGradient id={`${id}tela`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor={t.som} />
        <stop offset=".35" stopColor={t.luz} />
        <stop offset=".6" stopColor={t.robe} />
        <stop offset="1" stopColor={t.som} />
      </linearGradient>
      <linearGradient id={`${id}manga`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor={mezcla(t.robe, t.som, 0.5)} />
        <stop offset=".45" stopColor={t.luz} />
        <stop offset="1" stopColor={t.robe} />
      </linearGradient>
      <linearGradient id={`${id}luz`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff2c8" stopOpacity=".18" />
        <stop offset=".4" stopColor="#fff2c8" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity=".3" />
      </linearGradient>
      <pattern id={`${id}damasco`} width="34" height="34" patternUnits="userSpaceOnUse">
        <path d="M17 6 q6 6 0 11 q-6 -5 0 -11z M5 24 q4 3 0 6 M29 24 q-4 3 0 6" stroke={t.borde} strokeWidth="1.2" fill="none" opacity=".22" />
      </pattern>
      <filter id={`${id}suave`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" />
      </filter>
    </defs>
  );
  if (soloCabeza)
    return (
      <svg className={`pj pj-mini ${className}`} viewBox="126 70 150 150" aria-hidden="true">
        {defs}
        <Cabeza r={r} id={id} />
      </svg>
    );
  return (
    <svg className={`pj ${className}`} viewBox="0 0 400 780" aria-hidden="true" data-v="r" style={{ "--parpadeo": `${r.parpadeo}s` }}>
      {defs}
      <g className="pj-cuerpo">
        <Brazo r={r} id={id} cls="pj-b" x={116} capa="detras" />
        <Brazo r={r} id={id} cls="pj-a" x={286} capa="detras" />
        <Torso r={r} id={id} />
        <Cabeza r={r} id={id} />
        <Brazo r={r} id={id} cls="pj-b" x={116} capa="delante" />
        <Brazo r={r} id={id} cls="pj-a" x={286} capa="delante" />
      </g>
    </svg>
  );
}

export function CabezaPersonaje({ r }) {
  return <Personaje r={r} soloCabeza />;
}

/* ---------------- Interpretación de la frase ---------------- */

/** Gesto según lo que se dice. */
export function gestoDe(es = "") {
  const t = es.toLowerCase();
  if (/(gracias|encantad|mucho gusto|buen[oa]s (d[ií]as|tardes|noches)|disculpe|perd[oó]n|lo siento)/.test(t)) return "reverencia";
  if (/^¡?(hola|adi[oó]s|hasta luego|hasta pronto|chao|nos vemos)/.test(t)) return "saludo";
  if (/\?/.test(t)) return "pregunta";
  if (/!/.test(t)) return "exclama";
  return t.length % 2 ? "explica" : "explica2";
}

/** Emoción para cejas y ojos. */
export function emocionDe(es = "") {
  const t = es.toLowerCase();
  if (/(lo siento|triste|dolor|duele|cansad|enferm|mal\b|problema|perd[ií]|preocup)/.test(t)) return "triste";
  if (/\?/.test(t)) return "duda";
  if (/(!|qué bien|genial|estupend|perfecto|me encanta|claro)/.test(t)) return "feliz";
  return "neutra";
}

/** Secuencia de visemas (r reposo, m labios, c consonante, e, a, o) a partir del texto. */
export function visemas(es = "") {
  const t = es.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const out = [];
  for (const ch of t) {
    if (ch === "a") out.push("a");
    else if (ch === "e" || ch === "i") out.push("e");
    else if (ch === "o" || ch === "u") out.push("o");
    else if ("mbpv".includes(ch)) out.push("m");
    else if (/[.,;:!?¡¿]/.test(ch)) out.push("r", "r");
    else if (ch === " ") out.push("c");
    else if (/[a-zñ]/.test(ch)) out.push("c");
  }
  return out.length ? out : ["r"];
}
