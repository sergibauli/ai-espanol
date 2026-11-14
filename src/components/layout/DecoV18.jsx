import * as React from "react";

// v18 · Piezas decorativas dibujadas a mano en SVG (nubes de buen augurio, emblema, ruyi, esquinas).
// Todo es decorativo: aria-hidden y translate="no" para que el traductor DOM no lo toque.

const LOBULOS = [
  [70, 150, 46], [130, 122, 54], [200, 98, 62], [272, 120, 52], [330, 148, 44],
  [100, 170, 40], [170, 160, 50], [240, 162, 48], [300, 172, 38], [372, 172, 28], [34, 176, 26],
];
const RIZOS = [
  "M176 104c10-22 44-22 50 2 5 20-18 32-31 20-9-9-2-23 9-21",
  "M108 132c4-18 30-20 36-2 5 15-12 25-22 16-7-7-2-17 6-16",
  "M252 128c6-17 32-15 34 4 2 15-15 22-24 13-6-7-1-16 7-14",
  "M52 160c2-13 22-15 26-1 3 11-9 18-17 12",
  "M316 156c4-13 24-12 26 2 1 11-11 16-18 10",
];

// Nube de buen augurio (祥云): lóbulos con volumen, contorno dorado y rizos interiores
export function Nube({ className = "", tono = "crema", style }) {
  const id = React.useId().replace(/:/g, "");
  const claro = tono === "oro" ? "#fff1c4" : "#fffaf0";
  const medio = tono === "oro" ? "#f3cf7a" : "#f6e3bd";
  const sombra = tono === "oro" ? "#c9902f" : "#dcb777";
  return (
    <svg className={`v18-nube ${className}`} style={style} viewBox="0 0 400 210" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`n${id}`} cx="38%" cy="28%" r="80%">
          <stop offset="0" stopColor={claro} />
          <stop offset=".55" stopColor={medio} />
          <stop offset="1" stopColor={sombra} />
        </radialGradient>
        <linearGradient id={`b${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset=".55" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`m${id}`}>
          <rect width="400" height="210" fill={`url(#b${id})`} />
        </mask>
      </defs>
      <g mask={`url(#m${id})`}>
        {LOBULOS.map(([x, y, r], i) => (
          <circle key={`s${i}`} cx={x} cy={y} r={r + 2.2} fill="#b9801f" />
        ))}
        {LOBULOS.map(([x, y, r], i) => (
          <circle key={`o${i}`} cx={x} cy={y} r={r + 1} fill="#f7d98a" />
        ))}
        {LOBULOS.map(([x, y, r], i) => (
          <circle key={`f${i}`} cx={x} cy={y} r={r - 1.4} fill={`url(#n${id})`} />
        ))}
        {RIZOS.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#c9912e" strokeWidth="2.6" strokeLinecap="round" opacity=".85" />
        ))}
      </g>
    </svg>
  );
}

// Emblema de la barra: medallón de laca roja con nudo dorado sobre nubes de oro
export function Emblema({ tamano = 120 }) {
  const id = React.useId().replace(/:/g, "");
  return (
    <span className="v18-emblema" style={{ width: tamano, height: tamano * 0.98 }} translate="no" aria-hidden="true">
      <Nube tono="oro" className="v18-emblema__nube v18-emblema__nube--i" />
      <Nube tono="oro" className="v18-emblema__nube v18-emblema__nube--d" />
      <svg viewBox="0 0 120 120" className="v18-emblema__disco" focusable="false">
        <defs>
          <radialGradient id={`l${id}`} cx="36%" cy="26%" r="85%">
            <stop offset="0" stopColor="#f0503c" />
            <stop offset=".45" stopColor="#c21a1c" />
            <stop offset="1" stopColor="#6d0a10" />
          </radialGradient>
          <linearGradient id={`o${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff6cf" />
            <stop offset=".45" stopColor="#f3cb62" />
            <stop offset="1" stopColor="#b97c1c" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="56" fill={`url(#o${id})`} />
        <circle cx="60" cy="60" r="52.5" fill="#7a4a10" />
        <circle cx="60" cy="60" r="50.5" fill={`url(#o${id})`} />
        <circle cx="60" cy="60" r="46" fill={`url(#l${id})`} />
        <circle cx="60" cy="60" r="41" fill="none" stroke={`url(#o${id})`} strokeWidth="1.2" strokeDasharray="1.5 4" strokeLinecap="round" />
        {/* Nudo chino (盘长结): rombo trenzado */}
        <g fill="none" stroke={`url(#o${id})`} strokeWidth="4.2" strokeLinejoin="round" strokeLinecap="round">
          <path d="M60 30 90 60 60 90 30 60Z" />
          <path d="M60 42 78 60 60 78 42 60Z" />
          <path d="M45 45l30 30M75 45 45 75" strokeWidth="3.4" />
          <path d="M60 30c-6-9 6-13 6-6M60 90c6 9-6 13-6 6M30 60c-9 6-13-6-6-6M90 60c9-6 13 6 6 6" strokeWidth="2.6" />
        </g>
        <circle cx="60" cy="60" r="5.2" fill={`url(#o${id})`} />
        <ellipse cx="44" cy="34" rx="20" ry="9" fill="#fff" opacity=".22" transform="rotate(-28 44 34)" />
      </svg>
      <i className="v18-chispa" style={{ left: "4%", top: "10%" }} />
      <i className="v18-chispa" style={{ right: "2%", top: "30%", animationDelay: "-1.4s" }} />
      <i className="v18-chispa" style={{ left: "16%", bottom: "8%", animationDelay: "-2.3s" }} />
    </span>
  );
}

// Esquina de filigrana (voluta de nube en línea dorada); se gira con CSS para las cuatro esquinas
export function Esquina({ className = "" }) {
  return (
    <svg className={`v18-esquina ${className}`} viewBox="0 0 80 80" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M4 78V22C4 12 12 4 22 4h56" />
        <path d="M10 60V26c0-9 7-16 16-16h34" opacity=".6" />
        <path d="M16 40c0-14 10-24 24-24 10 0 17 7 17 15 0 7-5 12-11 12-5 0-9-4-9-8 0-3 3-6 6-6" />
        <path d="M16 40c0 9 6 15 13 15 5 0 9-4 9-8" />
        <path d="M22 62c5-1 8-5 8-10M62 22c-1 5-5 8-10 8" opacity=".8" />
      </g>
      <circle cx="43" cy="29" r="2.2" fill="currentColor" />
    </svg>
  );
}

// Cabeza de ruyi (如意) para los bordes de la barra y los remates de las tarjetas
export function Ruyi({ className = "" }) {
  return (
    <svg className={`v18-ruyi ${className}`} viewBox="0 0 60 28" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 24h14c-6-3-8-10-3-14 5-4 12 0 11 6M58 24H44c6-3 8-10 3-14-5-4-12 0-11 6" />
        <path d="M30 3c7 4 9 11 4 15-2 2-6 2-8 0-5-4-3-11 4-15Z" />
        <path d="M24 24h12" />
      </g>
      <circle cx="30" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

const BOKEH = [
  [8, 14, 5, 0], [17, 62, 3, -2], [26, 30, 7, -4], [34, 82, 4, -1], [43, 12, 3, -5], [52, 48, 6, -3], [58, 90, 3, -6],
  [66, 22, 8, -2], [73, 66, 4, -7], [81, 38, 5, -1], [88, 80, 7, -4], [94, 16, 4, -3], [12, 90, 6, -5], [47, 70, 3, -8],
  [70, 8, 3, -6], [90, 54, 3, -2], [30, 54, 2.5, -9], [61, 36, 2.5, -4],
];

// Fondo fijo de toda la web: laca roja con greca, bruma, bokeh dorado y nubes en las esquinas inferiores
export function FondoV18() {
  return (
    <div className="v18-fondo" aria-hidden="true" translate="no">
      <span className="v18-fondo__greca" />
      <span className="v18-fondo__luz" />
      <Nube className="v18-fondo__alta v18-fondo__alta--1" />
      <Nube className="v18-fondo__alta v18-fondo__alta--2" />
      {BOKEH.map(([x, y, r, d], i) => (
        <i key={i} className="v18-bokeh" style={{ left: `${x}%`, top: `${y}%`, width: r * 2, height: r * 2, animationDelay: `${d}s` }} />
      ))}
      <span className="v18-fondo__bruma" />
      <Nube className="v18-fondo__baja v18-fondo__baja--i2" tono="oro" />
      <Nube className="v18-fondo__baja v18-fondo__baja--i" />
      <Nube className="v18-fondo__baja v18-fondo__baja--d2" tono="oro" />
      <Nube className="v18-fondo__baja v18-fondo__baja--d" />
    </div>
  );
}

// Adornos de la barra lateral: marco de filigrana, ruyi a media altura, destellos y nubes en la base
export function AdornosBarra() {
  return (
    <span className="v18-barra-deco" aria-hidden="true" translate="no">
      <span className="v18-barra-deco__marco" />
      <Esquina className="e-si" />
      <Esquina className="e-sd" />
      <Esquina className="e-ii" />
      <Esquina className="e-id" />
      <Ruyi className="r-i" />
      <Ruyi className="r-d" />
      <i className="v18-chispa" style={{ left: "9%", top: "21%" }} />
      <i className="v18-chispa" style={{ right: "8%", top: "37%", animationDelay: "-1.1s" }} />
      <i className="v18-chispa" style={{ left: "6%", top: "58%", animationDelay: "-2.2s" }} />
      <i className="v18-chispa" style={{ right: "10%", top: "74%", animationDelay: "-.6s" }} />
      <Nube className="v18-barra-deco__nube n1" tono="oro" />
      <Nube className="v18-barra-deco__nube n2" />
      <Nube className="v18-barra-deco__nube n3" />
    </span>
  );
}
