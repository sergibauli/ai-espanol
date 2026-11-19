import * as React from "react";

/*
  v22 · Medallones de las paradas de la Ruta (SVG propio, sin imágenes externas).
  estado: "hecha" (oro + sello rojo) · "actual" (jade con aura) · "abierta" (laca roja) · "cerrada" (piedra y bronce con candado).
  El icono va encima como HTML (children). Profundidad: canto dentado, bisel doble, cara rehundida y reflejo.
*/
const PALETAS = {
  hecha: { canto: ["#fff8d6", "#f2c14e", "#b07a1c", "#6e4210"], cara: ["#fffbe6", "#f6d77e", "#d5a332", "#8a5a1e"], filete: "#fff3c4", grabado: "#9a6416", lomo: "#6e4210" },
  actual: { canto: ["#fff8d6", "#f2c14e", "#b07a1c", "#6e4210"], cara: ["#e6fff0", "#5fcf91", "#1f8a52", "#0a3b22"], filete: "#d8ffe6", grabado: "#0a3b22", lomo: "#5a360c" },
  abierta: { canto: ["#fff8d6", "#e9b648", "#a8741e", "#6e4210"], cara: ["#ff9a9a", "#e0283f", "#a5112a", "#560512"], filete: "#f6d77e", grabado: "#560512", lomo: "#5a360c" },
  // v26 · Bloqueada: el mismo medallón de oro, envejecido (bronce viejo desaturado) — se lee como «aún no», no como roto
  cerrada: { canto: ["#e6d6b0", "#b49a6a", "#7a6440", "#3e3020"], cara: ["#d8ccb0", "#a8987a", "#7a6c54", "#4a4032"], filete: "#efe2c2", grabado: "#4a3c28", lomo: "#3a2c1a" },
};

// Marco lobulado de 8 pétalos (海棠): silueta imperial en vez de un canto dentado
const LOBULOS = 8;
const marco = (r, h) => {
  let d = "";
  for (let i = 0; i <= LOBULOS; i++) {
    const a0 = (i / LOBULOS) * Math.PI * 2 - Math.PI / 2;
    const p = [60 + Math.cos(a0) * r, 60 + Math.sin(a0) * r];
    if (i === 0) d += `M${p[0].toFixed(2)} ${p[1].toFixed(2)}`;
    else {
      const am = ((i - 0.5) / LOBULOS) * Math.PI * 2 - Math.PI / 2;
      const c = [60 + Math.cos(am) * (r + h), 60 + Math.sin(am) * (r + h)];
      d += `Q${c[0].toFixed(2)} ${c[1].toFixed(2)} ${p[0].toFixed(2)} ${p[1].toFixed(2)}`;
    }
  }
  return `${d}Z`;
};
const MARCO = marco(52, 9);
const MARCO_IN = marco(47.5, 7);
// Grietas de la piedra (cerradas)
const GRIETAS = "M36 42 l7 6 l-2 7 l6 5 M82 72 l-6 4 l1 6 l-5 3 M72 32 l-3 6 l4 3";
// Nubes auspiciosas grabadas en la cara (cuatro rizos en cruz)
const RIZO = "M0 -3 a3 3 0 1 1 3 3 a2 2 0 1 0 2 -2";

export function Medallon({ estado = "abierta", tamano = 84, children, className = "" }) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const p = PALETAS[estado] || PALETAS.abierta;
  const cerrada = estado === "cerrada";
  return (
    <span className={`md-medallon md3 md-${estado} ${className}`} style={{ "--md": `${tamano}px` }}>
      {/* v27 · Moneda 3D: canto con grosor real (capas apiladas en Z), dorso y cara; gira con preserve-3d */}
      {Array.from({ length: cerrada ? 5 : 8 }, (_, i) => (
        <svg key={`c${i}`} className="md3-capa" viewBox="0 0 120 120" style={{ "--i": i + 1 }} aria-hidden="true">
          <path d={MARCO} fill={i % 2 ? p.canto[2] : p.lomo} />
        </svg>
      ))}
      <svg className="md3-dorso" viewBox="0 0 120 120" aria-hidden="true">
        <path d={MARCO} fill={p.canto[2]} stroke={p.lomo} strokeWidth="1.5" />
        <circle cx="60" cy="60" r="41" fill={p.canto[1]} stroke={p.filete} strokeWidth="1.6" />
        <circle cx="60" cy="60" r="34" fill="none" stroke={p.lomo} strokeOpacity=".4" strokeDasharray="2.6 2.2" />
        <text x="60" y="74" textAnchor="middle" fontSize="40" fontFamily="STKaiti, KaiTi, serif" fill={p.lomo} opacity=".8">悟</text>
      </svg>
      <svg className="md3-cara" viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <linearGradient id={`${uid}k`} x1="0" y1="0" x2=".7" y2="1">
            <stop offset="0" stopColor={p.canto[0]} />
            <stop offset=".3" stopColor={p.canto[1]} />
            <stop offset=".62" stopColor={p.canto[2]} />
            <stop offset=".78" stopColor={p.canto[1]} />
            <stop offset="1" stopColor={p.canto[3]} />
          </linearGradient>
          <linearGradient id={`${uid}b`} x1=".8" y1="1" x2=".2" y2="0">
            <stop offset="0" stopColor={p.canto[0]} />
            <stop offset=".5" stopColor={p.canto[1]} />
            <stop offset="1" stopColor={p.canto[3]} />
          </linearGradient>
          <radialGradient id={`${uid}c`} cx=".38" cy=".3" r=".8">
            <stop offset="0" stopColor={p.cara[0]} />
            <stop offset=".32" stopColor={p.cara[1]} />
            <stop offset=".74" stopColor={p.cara[2]} />
            <stop offset="1" stopColor={p.cara[3]} />
          </radialGradient>
          <radialGradient id={`${uid}s`} cx=".5" cy=".5" r=".5">
            <stop offset=".7" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity=".5" />
          </radialGradient>
          <linearGradient id="mdLaton" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f3d98e" />
            <stop offset=".4" stopColor="#c9a25a" />
            <stop offset=".75" stopColor="#8a6428" />
            <stop offset="1" stopColor="#5a3a14" />
          </linearGradient>
          <linearGradient id={`${uid}r`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity=".75" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Grosor de la pieza (lomo) y marco lobulado con bisel */}
        <path d={MARCO} transform="translate(0 5.5)" fill={p.lomo} />
        <path d={MARCO} transform="translate(0 3)" fill={p.canto[3]} />
        <path d={MARCO} fill={`url(#${uid}k)`} stroke={p.lomo} strokeWidth="1" />
        <path d={MARCO_IN} fill={`url(#${uid}b)`} />
        {/* Anillo de perlas (oro) o remaches con verdín (bronce) */}
        {Array.from({ length: 24 }, (_, i) => {
          const a = (i / 24) * Math.PI * 2;
          return <circle key={i} cx={60 + Math.cos(a) * 46.2} cy={60 + Math.sin(a) * 46.2} r="1.35" fill={cerrada ? "#6f9a86" : "#fff8dc"} stroke={cerrada ? "#2e3a30" : "#a06a18"} strokeWidth=".45" />;
        })}
        {/* Cara rehundida */}
        <circle cx="60" cy="60" r="42.5" fill={p.lomo} />
        <circle cx="60" cy="60.8" r="41" fill={`url(#${uid}c)`} />
        {cerrada && <circle cx="60" cy="60.8" r="41" fill="url(#r24-grano)" opacity=".35" />}
        <circle cx="60" cy="60.8" r="41" fill={`url(#${uid}s)`} />
        <circle cx="60" cy="60" r="42" fill="none" stroke={p.filete} strokeWidth="1.6" strokeOpacity=".95" />
        <circle cx="60" cy="60" r="36" fill="none" stroke={p.grabado} strokeOpacity=".32" strokeWidth=".9" strokeDasharray="2.6 2.2" />
        {[0, 90, 180, 270].map((g) => (
          <path key={g} d={RIZO} transform={`rotate(${g + 45} 60 60) translate(60 26)`} fill="none" stroke={p.grabado} strokeOpacity=".32" strokeWidth="1.2" strokeLinecap="round" />
        ))}
        {false && <path d={GRIETAS} fill="none" stroke="#24221e" strokeOpacity=".5" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />}
        {false && <Candado />}
        {/* Reflejos: casquete brillante arriba y luz de rebote abajo */}
        <path d="M27 50 A34 34 0 0 1 93 50 A40 26 0 0 0 27 50 Z" fill={`url(#${uid}r)`} opacity={cerrada ? 0.25 : 0.7} />
        <path d="M30 78 A34 34 0 0 0 90 78" fill="none" stroke="#fff" strokeOpacity={cerrada ? 0.1 : 0.3} strokeWidth="1.6" strokeLinecap="round" />
        <path d={MARCO} fill="none" stroke="#fff" strokeOpacity={cerrada ? 0.2 : 0.55} strokeWidth="1" transform="translate(-.6 -.8)" strokeDasharray="60 400" />
      </svg>
      <span className="md-brillo" aria-hidden="true" />
      {children != null && <span className="md-icono">{children}</span>}
    </span>
  );
}

// v25 · Candado chino de latón (横锁): cuerpo de barril con remates, arco en U y bocallave en forma de 卍 simplificado
function Candado() {
  return (
    <g transform="translate(60 62)">
      <path d="M-11 -4 v-9 a11 9 0 0 1 22 0 v9" fill="none" stroke="#2a1a0c" strokeWidth="6" strokeLinecap="round" />
      <path d="M-11 -4 v-9 a11 9 0 0 1 22 0 v9" fill="none" stroke="#c9a25a" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M-9.6 -12 a10 8 0 0 1 8 -7" fill="none" stroke="#fff3c4" strokeOpacity=".6" strokeWidth="1.1" strokeLinecap="round" />
      {/* barril */}
      <rect x="-21" y="-6" width="42" height="18" rx="9" fill="url(#mdLaton)" stroke="#3a240e" strokeWidth="1.5" />
      <rect x="-25" y="-8" width="7" height="22" rx="2.5" fill="url(#mdLaton)" stroke="#3a240e" strokeWidth="1.3" />
      <rect x="18" y="-8" width="7" height="22" rx="2.5" fill="url(#mdLaton)" stroke="#3a240e" strokeWidth="1.3" />
      <path d="M-17 -2 H17" stroke="#fff3c4" strokeOpacity=".55" strokeWidth="1.3" />
      <path d="M-15 8 H15" stroke="#3a240e" strokeOpacity=".35" strokeWidth="1" />
      {/* bocallave */}
      <circle cx="0" cy="3" r="4.6" fill="#5a3a14" stroke="#3a240e" strokeWidth=".8" />
      <path d="M0 -0.4 v6.8 M-3.4 3 h6.8" stroke="#e9cf8e" strokeWidth="1.1" />
      {/* borla roja */}
      <path d="M0 12 v6" stroke="#8f0c21" strokeWidth="1.6" />
      <path d="M-2.4 18 h4.8 l1.2 8 h-7.2z" fill="#a5112a" />
    </g>
  );
}

const CIFRAS = ["", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖", "拾"];
/** v25 · Cifra caligráfica de la clase grabada en oro (sustituye a los emojis del medallón) */
export function GlifoClase({ n = 1, estado = "abierta", tamano = 40 }) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const car = CIFRAS[n] || String(n);
  const hecha = estado === "hecha";
  const cerrada = estado === "cerrada";
  return (
    <svg className={`md-glifo md-glifo-${estado}`} width={tamano} height={tamano} viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={hecha ? "#c8102e" : cerrada ? "#8a7a5c" : "#fffbe6"} />
          <stop offset=".45" stopColor={hecha ? "#a5112a" : cerrada ? "#6e5f44" : "#f6d77e"} />
          <stop offset="1" stopColor={hecha ? "#6e0817" : cerrada ? "#4a3e2a" : "#c8961e"} />
        </linearGradient>
      </defs>
      {/* Bajo relieve: sombra arriba-izquierda y luz abajo-derecha (grabado en la cara del medallón) */}
      <text x="20" y="30.5" textAnchor="middle" className="md-glifo-txt" fill={hecha || cerrada ? "#fff3c4" : "#3a1a06"} opacity={cerrada ? 0.7 : 0.55} transform={cerrada ? "translate(.6 .8)" : "translate(.9 1.1)"}>
        {car}
      </text>
      <text x="20" y="30.5" textAnchor="middle" className="md-glifo-txt" fill={`url(#${uid}g)`} stroke={hecha ? "#5a0a14" : cerrada ? "#3a2c1a" : "#7a4d12"} strokeWidth=".6" paintOrder="stroke">
        {car}
      </text>
    </svg>
  );
}

/** v26 · Marca discreta de «clase hecha»: insignia de jade con check (el sello 成 grande queda solo para el examen) */
export function MarcaHecha({ perfecta }) {
  return (
    <span className={`md-marca ${perfecta ? "perfecta" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="100%" height="100%">
        <path d="M6 12.5l4 4 8-9" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
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
