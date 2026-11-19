import * as React from "react";

/*
  v22 · Medallones de las paradas de la Ruta (SVG propio, sin imágenes externas).
  estado: "hecha" (oro + sello rojo) · "actual" (jade con aura) · "abierta" (laca roja) · "cerrada" (piedra y bronce con candado).
  El icono va encima como HTML (children). Profundidad: canto dentado, bisel doble, cara rehundida y reflejo.
*/
const PALETAS = {
  hecha: { canto: ["#fff6c8", "#f2c14e", "#9a6416"], cara: ["#fffbe6", "#f6d77e", "#c8961e", "#8a5a1e"], filete: "#fff3c4", grabado: "#a06a18" },
  actual: { canto: ["#fff6c8", "#f2c14e", "#9a6416"], cara: ["#eafff2", "#62d394", "#1f8a52", "#0b3f25"], filete: "#d8ffe6", grabado: "#0b3f25" },
  abierta: { canto: ["#fff6c8", "#e9b648", "#8f5c16"], cara: ["#ff8a8a", "#e0283f", "#a5112a", "#5e0614"], filete: "#f6d77e", grabado: "#5e0614" },
  cerrada: { canto: ["#c9a77a", "#86613c", "#3e2a18"], cara: ["#e4ded2", "#b3aa99", "#7d7465", "#4c463c"], filete: "#9fb59c", grabado: "#3e3a33" },
};

// Canto dentado (32 dientes redondeados) como un único path
const DIENTES = 32;
const CANTO = (() => {
  let d = "";
  for (let i = 0; i < DIENTES; i++) {
    const a0 = (i / DIENTES) * Math.PI * 2;
    const a1 = ((i + 0.5) / DIENTES) * Math.PI * 2;
    const a2 = ((i + 1) / DIENTES) * Math.PI * 2;
    const p = (r, a) => `${(60 + Math.cos(a) * r).toFixed(2)} ${(60 + Math.sin(a) * r).toFixed(2)}`;
    d += `${i ? "L" : "M"}${p(55.5, a0)} Q${p(60.5, a1)} ${p(55.5, a2)} `;
  }
  return `${d}Z`;
})();
// Grietas de la piedra (cerradas)
const GRIETAS = "M38 40 l7 6 l-2 7 l6 5 M80 70 l-6 4 l1 6 l-5 3 M70 34 l-3 6 l4 3";
// Nubes auspiciosas grabadas en la cara (cuatro rizos en cruz)
const RIZO = "M0 -3 a3 3 0 1 1 3 3 a2 2 0 1 0 2 -2";

export function Medallon({ estado = "abierta", tamano = 84, children, className = "" }) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const p = PALETAS[estado] || PALETAS.abierta;
  const cerrada = estado === "cerrada";
  return (
    <span className={`md-medallon md-${estado} ${className}`} style={{ "--md": `${tamano}px` }}>
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <linearGradient id={`${uid}k`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={p.canto[0]} />
            <stop offset=".45" stopColor={p.canto[1]} />
            <stop offset="1" stopColor={p.canto[2]} />
          </linearGradient>
          <linearGradient id={`${uid}b`} x1="1" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor={p.canto[0]} />
            <stop offset=".5" stopColor={p.canto[1]} />
            <stop offset="1" stopColor={p.canto[2]} />
          </linearGradient>
          <radialGradient id={`${uid}c`} cx=".38" cy=".32" r=".78">
            <stop offset="0" stopColor={p.cara[0]} />
            <stop offset=".35" stopColor={p.cara[1]} />
            <stop offset=".75" stopColor={p.cara[2]} />
            <stop offset="1" stopColor={p.cara[3]} />
          </radialGradient>
          <radialGradient id={`${uid}s`} cx=".5" cy=".5" r=".5">
            <stop offset=".72" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity=".45" />
          </radialGradient>
        </defs>
        {/* Sombra de contacto y canto dentado */}
        <path d={CANTO} fill={`url(#${uid}k)`} stroke={cerrada ? "#2a1a0c" : "#6e4210"} strokeWidth="1.2" />
        {/* Bisel exterior (luz arriba-izquierda) e interior invertido: da el relieve */}
        <circle cx="60" cy="60" r="51" fill={`url(#${uid}k)`} stroke={cerrada ? "#2a1a0c" : "#7a4d12"} strokeWidth=".8" />
        <circle cx="60" cy="60" r="46.5" fill={`url(#${uid}b)`} />
        {/* Anillo de perlas o remaches */}
        {Array.from({ length: 20 }, (_, i) => {
          const a = (i / 20) * Math.PI * 2;
          return <circle key={i} cx={60 + Math.cos(a) * 48.8} cy={60 + Math.sin(a) * 48.8} r="1.5" fill={cerrada ? "#5c7a5a" : "#fff8dc"} stroke={cerrada ? "#2a3a28" : "#a06a18"} strokeWidth=".5" />;
        })}
        {/* Cara rehundida */}
        <circle cx="60" cy="60" r="42" fill={`url(#${uid}c)`} />
        <circle cx="60" cy="60" r="42" fill={`url(#${uid}s)`} />
        <circle cx="60" cy="60" r="42" fill="none" stroke={p.filete} strokeWidth="2.2" strokeOpacity=".95" />
        <circle cx="60" cy="60" r="36.5" fill="none" stroke={p.grabado} strokeOpacity=".35" strokeWidth="1" strokeDasharray="3 2.4" />
        {/* Nubes grabadas en cruz */}
        {[0, 90, 180, 270].map((g) => (
          <path key={g} d={RIZO} transform={`rotate(${g} 60 60) translate(60 27)`} fill="none" stroke={p.grabado} strokeOpacity=".3" strokeWidth="1.3" strokeLinecap="round" />
        ))}
        {cerrada && <path d={GRIETAS} fill="none" stroke="#3e3a33" strokeOpacity=".45" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />}
        {cerrada && <Candado />}
        {/* Reflejos */}
        <ellipse cx="45" cy="36" rx="22" ry="10" transform="rotate(-30 45 36)" fill="#fff" fillOpacity={cerrada ? 0.16 : 0.42} />
        <path d="M24 74 A38 38 0 0 0 96 74" fill="none" stroke="#fff" strokeOpacity={cerrada ? 0.12 : 0.28} strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="md-brillo" aria-hidden="true" />
      {children != null && <span className="md-icono">{children}</span>}
    </span>
  );
}

// Candado de bronce grabado
function Candado() {
  return (
    <g transform="translate(60 62)">
      <path d="M-10 -6 v-8 a10 10 0 0 1 20 0 v8" fill="none" stroke="#2a1a0c" strokeWidth="6.5" strokeLinecap="round" />
      <path d="M-10 -6 v-8 a10 10 0 0 1 20 0 v8" fill="none" stroke="#c9a77a" strokeWidth="3.6" strokeLinecap="round" />
      <rect x="-16" y="-7" width="32" height="25" rx="5" fill="#86613c" stroke="#2a1a0c" strokeWidth="1.6" />
      <rect x="-13" y="-4.5" width="26" height="20" rx="3.5" fill="none" stroke="#e8cf9a" strokeOpacity=".55" strokeWidth="1" />
      <circle cx="0" cy="3" r="3.6" fill="#2a1a0c" />
      <path d="M-1.6 4.5 h3.2 l1 8 h-5.2 z" fill="#2a1a0c" />
      <path d="M-13 -4 h26" stroke="#fff" strokeOpacity=".35" strokeWidth="1.4" />
    </g>
  );
}

/** Sello rojo de «clase hecha» (caligrafía): 优 con nota perfecta, 成 en las demás */
export function SelloHecha({ perfecta }) {
  return (
    <span className={`md-sello ${perfecta ? "perfecta" : ""}`} aria-hidden="true" translate="no">
      <span>{perfecta ? "优" : "成"}</span>
    </span>
  );
}

/** Cofre imperial del examen de la unidad (cerrado o abierto con luz) */
export function CofreImperial({ abierto = false, tamano = 104 }) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <span className={`md-cofre ${abierto ? "abierto" : ""}`} style={{ "--md": `${tamano}px` }}>
      <svg viewBox="0 0 120 110" aria-hidden="true">
        <defs>
          <linearGradient id={`${uid}l`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e8374d" />
            <stop offset=".55" stopColor="#a5112a" />
            <stop offset="1" stopColor="#5e0614" />
          </linearGradient>
          <linearGradient id={`${uid}o`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff6c8" />
            <stop offset=".45" stopColor="#f2c14e" />
            <stop offset="1" stopColor="#8f5c16" />
          </linearGradient>
          <radialGradient id={`${uid}r`} cx=".5" cy="1" r=".9">
            <stop offset="0" stopColor="#fffbe6" />
            <stop offset=".5" stopColor="#f6d77e" stopOpacity=".8" />
            <stop offset="1" stopColor="#f6d77e" stopOpacity="0" />
          </radialGradient>
        </defs>
        {abierto && (
          <g className="md-cofre-luz">
            <path d="M30 52 L4 0 H116 L90 52 Z" fill={`url(#${uid}r)`} />
          </g>
        )}
        {/* Tapa */}
        <g className="md-cofre-tapa">
          {abierto ? (
            <>
              <path d="M22 40 Q60 22 98 40 L94 50 H26 Z" fill={`url(#${uid}l)`} stroke="#3b0710" strokeWidth="1.6" />
              <path d="M22 40 Q60 22 98 40" fill="none" stroke={`url(#${uid}o)`} strokeWidth="4" />
            </>
          ) : (
            <>
              <path d="M16 54 V40 Q16 20 60 18 Q104 20 104 40 V54 Z" fill={`url(#${uid}l)`} stroke="#3b0710" strokeWidth="1.6" />
              <path d="M16 40 Q16 20 60 18 Q104 20 104 40" fill="none" stroke={`url(#${uid}o)`} strokeWidth="4" />
              <path d="M38 21 V54 M82 21 V54" stroke={`url(#${uid}o)`} strokeWidth="6" />
              <path d="M30 30 Q60 22 92 30" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="2.5" strokeLinecap="round" />
            </>
          )}
        </g>
        {/* Caja */}
        <rect x="14" y="52" width="92" height="46" rx="5" fill={`url(#${uid}l)`} stroke="#3b0710" strokeWidth="1.6" />
        <path d="M38 52 V98 M82 52 V98" stroke={`url(#${uid}o)`} strokeWidth="6" />
        <rect x="14" y="52" width="92" height="7" fill={`url(#${uid}o)`} stroke="#6e4210" strokeWidth=".8" />
        {/* Esquineras */}
        {[[14, 59], [106, 59], [14, 98], [106, 98]].map(([x, y], k) => (
          <path key={k} d={`M${x} ${y} h${x < 60 ? 9 : -9} M${x} ${y} v${y < 80 ? 9 : -9}`} stroke={`url(#${uid}o)`} strokeWidth="5" strokeLinecap="round" />
        ))}
        {/* Cerradura con 考 */}
        <path d="M47 58 h26 v22 l-13 9 l-13 -9 Z" fill={`url(#${uid}o)`} stroke="#6e4210" strokeWidth="1.4" />
        <text x="60" y="76" textAnchor="middle" fontSize="16" fontWeight="700" fill="#7d0a1d" style={{ fontFamily: '"STKaiti","KaiTi","Kaiti SC",serif' }}>
          考
        </text>
        {abierto && (
          <g className="md-cofre-tesoro">
            <ellipse cx="60" cy="52" rx="34" ry="6" fill="#fff3c4" />
            <path d="M44 50 l6 -10 h20 l6 10 Z" fill={`url(#${uid}o)`} stroke="#8f5c16" strokeWidth="1" />
            <circle cx="40" cy="48" r="5" fill={`url(#${uid}o)`} stroke="#8f5c16" strokeWidth=".8" />
            <circle cx="80" cy="47" r="5.5" fill={`url(#${uid}o)`} stroke="#8f5c16" strokeWidth=".8" />
          </g>
        )}
        <path d="M18 62 H102" stroke="#fff" strokeOpacity=".25" strokeWidth="1.5" />
      </svg>
    </span>
  );
}
