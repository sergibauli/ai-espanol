import * as React from "react";
import { Pictograma, paisajeDe } from "./paisajes.jsx";

/*
  v22 · Sello de pasaporte de cada parada: forma propia (8 formas), tinta del paisaje, pictograma del monumento,
  ciudad en caligrafía, nombre en español en arco y fecha del día en que se terminó la unidad.
  Sin conseguir: contorno gris punteado («fantasma»). La textura de tinta gastada es un único filtro SVG
  (<FiltroTinta/>, una vez por página) aplicado a dibujos estáticos: no repinta nada en cada fotograma.
*/

const MESES = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
export const fechaSello = (ms) => {
  if (!ms) return null;
  const f = new Date(ms);
  return `${String(f.getDate()).padStart(2, "0")} ${MESES[f.getMonth()]} ${f.getFullYear()}`;
};

// Formas en una caja de 100×100 (contorno exterior + filete interior)
const FORMAS = [
  // 0 · círculo doble
  { borde: <circle cx="50" cy="50" r="46" />, filete: <circle cx="50" cy="50" r="40" />, arco: "M16 50 A34 34 0 0 1 84 50", icono: [32, 26, 36] },
  // 1 · óvalo apaisado
  { borde: <ellipse cx="50" cy="50" rx="47" ry="36" />, filete: <ellipse cx="50" cy="50" rx="41" ry="30" />, arco: "M17 52 A33 24 0 0 1 83 52", icono: [36, 26, 28], rx: true },
  // 2 · rectángulo con esquinas cortadas
  { borde: <path d="M12 8 H88 L94 14 V86 L88 92 H12 L6 86 V14Z" />, filete: <path d="M15 14 H85 L88 17 V83 L85 86 H15 L12 83 V17Z" />, icono: [32, 20, 36] },
  // 3 · octógono
  { borde: <path d="M31 4 H69 L96 31 V69 L69 96 H31 L4 69 V31Z" />, filete: <path d="M33.5 10 H66.5 L90 33.5 V66.5 L66.5 90 H33.5 L10 66.5 V33.5Z" />, arco: "M18 50 A32 32 0 0 1 82 50", icono: [32, 26, 36] },
  // 4 · sello cuadrado chino (marco grueso)
  { borde: <rect x="6" y="6" width="88" height="88" rx="6" />, filete: <rect x="13" y="13" width="74" height="74" rx="2" />, icono: [32, 18, 36], cuadrado: true },
  // 5 · hexágono
  { borde: <path d="M50 3 L91 26 V74 L50 97 L9 74 V26Z" />, filete: <path d="M50 10 L85 30 V70 L50 90 L15 70 V30Z" />, arco: "M20 48 A30 30 0 0 1 80 48", icono: [32, 28, 34] },
  // 6 · billete con muescas
  { borde: <path d="M8 14 H92 V40 A10 10 0 0 0 92 60 V86 H8 V60 A10 10 0 0 0 8 40Z" />, filete: <path d="M14 20 H86 V36 A14 14 0 0 0 86 64 V80 H14 V64 A14 14 0 0 0 14 36Z" />, icono: [34, 22, 32] },
  // 7 · flor festoneada
  {
    borde: <path d={Array.from({ length: 16 }, (_, k) => { const a = (k / 16) * Math.PI * 2; const b = ((k + 0.5) / 16) * Math.PI * 2; const c = ((k + 1) / 16) * Math.PI * 2; return `${k ? "" : `M${50 + Math.cos(a) * 42} ${50 + Math.sin(a) * 42}`} Q${50 + Math.cos(b) * 52} ${50 + Math.sin(b) * 52} ${50 + Math.cos(c) * 42} ${50 + Math.sin(c) * 42}`; }).join(" ") + "Z"} />,
    filete: <circle cx="50" cy="50" r="36" />,
    arco: "M20 50 A30 30 0 0 1 80 50",
    icono: [33, 26, 34],
  },
];

/** Filtro de tinta gastada (una vez por página) */
export function FiltroTinta() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <filter id="sp-tinta" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="ruido" />
          <feColorMatrix in="ruido" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.55" result="mascara" />
          <feComposite in="SourceGraphic" in2="mascara" operator="in" result="gastado" />
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="1" seed="3" result="onda" />
          <feDisplacementMap in="gastado" in2="onda" scale="2.2" />
        </filter>
      </defs>
    </svg>
  );
}

export function SelloPasaporte({ numero, parada, conseguido, fecha, recien = false, siguiente = false }) {
  const paisaje = paisajeDe(parada);
  const forma = FORMAS[numero % FORMAS.length];
  const giro = ((numero * 37) % 23) - 11; // −11…11°
  const id = `sp-arco-${numero}`;
  const [ix, iy, it] = forma.icono;
  const ciudadZh = parada?.ciudadZh || "";
  const fechaTxt = conseguido ? fecha || "—" : "· · ·";
  return (
    <span
      className={`sp-sello ${conseguido ? "got" : "fantasma"} ${recien ? "recien" : ""} ${siguiente ? "siguiente" : ""}`}
      style={{ "--tinta": conseguido ? paisaje.tinta : "#8b7d68", "--giro": `${giro}deg` }}
      title={`${parada?.ciudad} · ${parada?.lugar} ${ciudadZh}·${parada?.lugarZh}${conseguido ? ` — ${fechaTxt}` : " — sin sellar · 未盖章"}`}
    >
      <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <g filter={conseguido ? "url(#sp-tinta)" : undefined} fill="none" stroke="currentColor">
          <g strokeWidth={forma.cuadrado ? 5 : 3.2} strokeDasharray={conseguido ? undefined : "5 4"}>{forma.borde}</g>
          <g strokeWidth="1.3">{forma.filete}</g>
          {forma.arco && (
            <>
              <defs>
                <path id={id} d={forma.arco} />
              </defs>
              <text fill="currentColor" stroke="none" fontSize="8.4" fontWeight="800" letterSpacing="1.4" fontFamily="var(--rt-ui, system-ui), sans-serif">
                <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
                  {(parada?.ciudad || "").toUpperCase()}
                </textPath>
              </text>
            </>
          )}
          {!forma.arco && (
            <text x="50" y={forma.cuadrado ? 27 : 30} textAnchor="middle" fill="currentColor" stroke="none" fontSize="8" fontWeight="800" letterSpacing="1.2" fontFamily="var(--rt-ui, system-ui), sans-serif">
              {(parada?.ciudad || "").toUpperCase()}
            </text>
          )}
          <g stroke="none" fill="currentColor">
            <svg x={ix} y={forma.cuadrado ? 30 : iy + 6} width={it} height={it} viewBox="0 0 64 64" opacity={conseguido ? 1 : 0.55}>
              <Pictograma tipo={paisaje.tipo} tamano={64} />
            </svg>
            <text x="50" y={forma.rx ? 74 : 78} textAnchor="middle" fontSize={ciudadZh.length > 3 ? 9 : 12} fontFamily="STKaiti, KaiTi, 'Kaiti SC', serif" fontWeight="700">
              {ciudadZh}
            </text>
            <text x="50" y={forma.rx ? 82 : 87} textAnchor="middle" fontSize="6" fontWeight="800" letterSpacing=".6" fontFamily="ui-monospace, Menlo, monospace">
              {fechaTxt}
            </text>
          </g>
        </g>
      </svg>
      <span className="sp-num" translate="no">{numero}</span>
    </span>
  );
}
