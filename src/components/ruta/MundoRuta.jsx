import * as React from "react";
import "../../styles/v13-ruta-mundos.css";
import "../../styles/v14-motion.css";
import "../../styles/v25-ruta-mundo.css";
import "../../styles/v28-ruta-mundos-vivos.css";
import { ParticulasRuta } from "./ParticulasRuta.jsx";
import MUNDOS from "./mundos.json";

/*
  v28 · Mundo VIVO de cada nivel de la Ruta: una ilustración pintada (scripts/mundos/*.py, raster propio) en 6 planos
  de profundidad (cielo · lejos · … · primer plano) dentro de un lienzo fijo (sticky), con:
    - parallax por plano ligado al scroll y a la cámara 3D (puntero / inclinación: --cam-x, --cam-y × profundidad --pz),
    - piezas animadas pintadas aparte dentro de su plano (humo, banderas, farolillos, destellos, grullas, camellos,
      barcas, cascada, balsa con cormoranes, bambú…): solo transform y opacity,
    - bandas de niebla que derivan entre planos, rayos desde la luz clave y partículas en canvas (ParticulasRuta).
  Todo se pausa fuera de pantalla y con la pestaña oculta; en móvil hay menos piezas; con prefers-reduced-motion queda
  quieto. Cada nivel solo descarga sus propios planos (carga diferida por nivel).
  Marco de pintura 1100 × 1540 = lienzo visible 1000 × 1400 + margen para el parallax (los planos miden el 110 %).
  momento = "dia" | "atardecer" | "noche" (hora de China) → data-momento (gradación de color encima del paisaje).
*/
const BASE = import.meta.env.BASE_URL || "./";
const recurso = (ruta) => `${BASE}theme/ruta/mundo/${ruta}`;

// Momento del día según la hora de China (UTC+8)
export function momentoChina(fecha = new Date()) {
  const hora = (fecha.getUTCHours() + 8) % 24;
  if (hora >= 7 && hora < 17) return "dia";
  if (hora >= 17 && hora < 20) return "atardecer";
  return "noche";
}

// Para probar a mano: #/ruta?nivel=A1&momento=noche&fiesta=1
function forzado(clave) {
  try {
    return new URLSearchParams(window.location.hash.split("?")[1] || "").get(clave);
  } catch {
    return null;
  }
}

// Momento que se pinta (el forzado por URL manda). RutaPage lo copia en .ruta-main[data-momento].
export function momentoRuta(momentoProp) {
  const pedido = forzado("momento");
  return ["dia", "atardecer", "noche"].includes(pedido) ? pedido : momentoProp || momentoChina();
}

const pc = (v) => `${v}%`;

function Actor({ a }) {
  const estilo = {
    left: pc(a.x),
    top: pc(a.y),
    width: pc(a.w),
    height: pc(a.h),
    "--dur": `${a.dur || 4}s`,
    "--del": `${a.retraso || 0}s`,
  };
  if (a.dx != null) estilo["--dx"] = a.dx;
  if (a.dy != null) estilo["--dy"] = a.dy;
  if (a.amp != null) estilo["--amp"] = a.amp;
  if (a.aleteo != null) estilo["--aleteo"] = `${a.aleteo}s`;
  if (a.op != null) estilo["--op"] = a.op;
  return (
    <span className={`ma ma-${a.anim}${a.clase ? ` ${a.clase}` : ""}`} style={estilo} data-movil={a.movil === false ? "no" : undefined}>
      <img src={recurso(a.src)} alt="" decoding="async" loading="lazy" draggable="false" />
      {a.src2 && <img className="ma-b" src={recurso(a.src2)} alt="" decoding="async" loading="lazy" draggable="false" />}
    </span>
  );
}

// Pausa las animaciones CSS del mundo cuando no se ve (fuera de pantalla o pestaña oculta)
function usePausa(ref) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let visible = true;
    const aplicar = () => el.classList.toggle("mr-pausa", !visible || document.hidden);
    const ojo = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver(([e]) => { visible = e.isIntersecting; aplicar(); }) : null;
    ojo?.observe(el);
    document.addEventListener("visibilitychange", aplicar);
    return () => {
      ojo?.disconnect();
      document.removeEventListener("visibilitychange", aplicar);
    };
  }, [ref]);
}

export function MundoRuta({ nivel, momento: momentoProp, fiesta: fiestaProp = false }) {
  const momento = momentoRuta(momentoProp);
  const fiesta = fiestaProp || forzado("fiesta") === "1";
  const nv = MUNDOS[nivel] ? nivel : "A1";
  const mundo = MUNDOS[nv];
  const ref = React.useRef(null);
  usePausa(ref);
  return (
    <div ref={ref} className={`mr-mundo mr-${nv} mr25 mr28 ${fiesta ? "mr-fiesta" : ""}`} data-momento={momento} aria-hidden="true">
      <div className="mr-fijo">
        <div className="mr-cielo" />
        <div className="mr-lienzo" style={{ "--sx": pc(mundo.luz.x), "--sy": pc(mundo.luz.y) }}>
          {mundo.capas.map((c, i) => (
            <React.Fragment key={c.id}>
              <div className={`mr-plano mr-p-${c.id}`} style={{ "--pz": c.z }}>
                <img
                  className="mr-pintura"
                  src={recurso(c.src)}
                  alt=""
                  decoding="async"
                  fetchPriority={i < 2 ? "high" : undefined}
                  draggable="false"
                  style={{ left: pc(c.x), top: pc(c.y), width: pc(c.w), height: pc(c.h) }}
                />
                {mundo.actores.filter((a) => a.capa === c.id).map((a, k) => <Actor key={k} a={a} />)}
              </div>
              {i === 0 && <span className="mr-rayos" />}
              {mundo.nieblas
                .filter((n) => n.tras === c.id)
                .map((n, k) => (
                  <div key={`n${k}`} className="mr-plano mr-plano-niebla" style={{ "--pz": c.z + 0.04 }} data-movil={n.movil === false ? "no" : undefined}>
                    <span
                      className={`mr-tira n-${n.tipo}`}
                      style={{ top: pc(n.top), height: pc(n.alto), opacity: n.op, animationDuration: `${n.dur}s`, animationDirection: n.inv ? "reverse" : undefined }}
                    />
                  </div>
                ))}
            </React.Fragment>
          ))}
        </div>
        <ParticulasRuta nivel={nv} />
        <div className="mr-tono" />
      </div>
      <div className="mr-velo" />
    </div>
  );
}

// v25 · Las viñetas sueltas a los lados del camino («pegatinas») se retiran: el paisaje pintado y el terreno de cada
// tramo (Recorrido) ya componen la escena. Se mantiene el componente para no romper importaciones.
export function EscenaTramo() {
  return null;
}
