import * as React from "react";

/*
  Telón cinematográfico al cambiar de nivel: tres bancos de nubes auspiciosas (祥云) cruzan el mapa
  (solo el área de .ruta-main; el menú no se tapa) y en el centro se estampa el gran sello del destino.
  - onCubre(): se llama cuando el telón tapa el mapa → ahí RutaPage cambia de nivel.
  - onFin(): al terminar (≈1,15 s). Con prefers-reduced-motion es un fundido corto.
  - pointer-events: none → no bloquea: si el alumno pulsa otra pestaña, el telón se reinicia hacia el nuevo destino.
*/
export const DESTINOS = {
  A1: { zh: "北京", es: "Pekín y el norte", zhLargo: "北京与华北" },
  A2: { zh: "丝路", es: "La Ruta de la Seda", zhLargo: "丝绸之路" },
  B1: { zh: "江南", es: "El este de China", zhLargo: "华东" },
  B2: { zh: "山水", es: "El sur y el oeste", zhLargo: "西南与华南" },
};
const T_CUBRE = 430;
const T_TOTAL = 1180;

// Banco de nubes: masa de volutas con luz arriba a la izquierda, sombra abajo y espirales doradas
function BancoNubes({ id, tono }) {
  const lobulos = [];
  for (let x = 90; x <= 1110; x += 85) {
    lobulos.push([x, 62 + ((x / 85) % 2) * 14, 58 + ((x / 85) % 3) * 6]);
    lobulos.push([x + 40, 300 - 60 - ((x / 85) % 2) * 12, 56 + ((x / 85) % 3) * 7]);
  }
  // Rizos de los extremos
  lobulos.push([52, 150, 62], [80, 96, 44], [84, 214, 46], [1148, 150, 62], [1120, 96, 44], [1116, 214, 46]);
  const masa = (
    <>
      <rect x="70" y="60" width="1060" height="180" rx="40" />
      {lobulos.map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} />
      ))}
    </>
  );
  return (
    <svg viewBox="0 0 1200 300" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-cuerpo`} x1="0" y1="0" x2="0" y2="1">
          {tono === "tinta" ? (
            <>
              <stop offset="0" stopColor="var(--tn-a)" />
              <stop offset=".55" stopColor="var(--tn-b)" />
              <stop offset="1" stopColor="var(--tn-c)" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="#fffdf2" />
              <stop offset=".4" stopColor="#fbeecb" />
              <stop offset=".78" stopColor="#f0cf86" />
              <stop offset="1" stopColor="#d8a544" />
            </>
          )}
        </linearGradient>
        <radialGradient id={`${id}-luz`} cx=".3" cy=".1" r=".7">
          <stop offset="0" stopColor="#fff" stopOpacity=".7" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g fill="#2a0d10" opacity=".28" transform="translate(6 12)">{masa}</g>
      <g fill={tono === "tinta" ? "var(--tn-filo)" : "#b9872a"} transform="translate(2 4)">{masa}</g>
      <g fill="#fffef6" transform="translate(-3 -4)">{masa}</g>
      <g fill={`url(#${id}-cuerpo)`}>{masa}</g>
      <g fill={`url(#${id}-luz)`}>{masa}</g>
      {/* Espirales de 祥云 */}
      <g fill="none" stroke={tono === "tinta" ? "var(--tn-filo)" : "#c8961e"} strokeOpacity={tono === "tinta" ? 0.8 : 0.75} strokeWidth="4" strokeLinecap="round">
        {[130, 330, 530, 730, 930, 1090].map((x, i) => (
          <path key={x} d={`M${x - 46} ${i % 2 ? 196 : 112}c0-34 52-40 58-8 5 24-28 32-34 12-4-12 10-18 16-10M${x + 30} ${i % 2 ? 110 : 200}c26-22 62 2 46 28-12 18-38 8-32-10`} />
        ))}
      </g>
    </svg>
  );
}

export function TransicionNivel({ destino, clave, onCubre, onFin }) {
  const id = React.useId().replace(/:/g, "");
  const avisos = React.useRef({ onCubre, onFin });
  avisos.current = { onCubre, onFin };
  React.useEffect(() => {
    if (!destino) return undefined;
    const reducido = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const alCubrir = setTimeout(() => avisos.current.onCubre?.(destino), reducido ? 130 : T_CUBRE);
    const alAcabar = setTimeout(() => avisos.current.onFin?.(), reducido ? 380 : T_TOTAL);
    return () => {
      clearTimeout(alCubrir);
      clearTimeout(alAcabar);
    };
  }, [destino, clave]);
  if (!destino) return null;
  const lugar = DESTINOS[destino] || DESTINOS.A1;
  return (
    <div className="tn-ancla" aria-hidden="true">
      <div key={clave} className={`tn-telon tn-${destino}`}>
        <div className="tn-fondo" />
        <div className="tn-banco b1">
          <BancoNubes id={`${id}a`} tono="oro" />
        </div>
        <div className="tn-banco b2">
          <BancoNubes id={`${id}b`} tono="tinta" />
        </div>
        <div className="tn-banco b3">
          <BancoNubes id={`${id}c`} tono="oro" />
        </div>
        <div className="tn-centro">
          <div className="tn-sello" translate="no">
            <span>{lugar.zh}</span>
          </div>
          <div className="tn-rotulo">
            <b>{destino}</b>
            <span>{lugar.es}</span>
            <i translate="no">{lugar.zhLargo}</i>
          </div>
        </div>
      </div>
    </div>
  );
}
