import * as React from "react";
import "../../styles/v13-ruta-mundos.css";
import "../../styles/v14-motion.css";
import * as A1 from "./mundos/A1.jsx";
import * as A2 from "./mundos/A2.jsx";
import * as B1 from "./mundos/B1.jsx";
import * as B2 from "./mundos/B2.jsx";

/*
  Mundos ilustrados de la ruta de aprendizaje (un mundo por nivel), solo SVG + CSS.
  Cada nivel vive en ./mundos/<nivel>.jsx (Panorama, Ambiente, VINETAS) con su CSS src/styles/v14-ruta-<nivel>.css.
  - <MundoRuta nivel momento fiesta>: panorama fijo (sticky) en capas con parallax ligado al scroll + ambiente animado.
      momento = "dia" | "atardecer" | "noche" (hora de China) → atributo data-momento.
      fiesta  = true unos segundos al completar una clase → clase .mr-fiesta (cada mundo reacciona a su manera).
  - <EscenaTramo nivel idx>: viñetas a izquierda y derecha del camino de cada unidad.
  Base común en v13-ruta-mundos.css; tokens de movimiento en v14-motion.css.
*/
const MUNDOS = { A1, A2, B1, B2 };

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

// Momento que se pinta (el forzado por URL manda). RutaPage lo copia en .ruta-main[data-momento] para que el CSS
// no necesite `.ruta-main:has(.mr-XX[data-momento])` (cada :has en un contenedor tan grande recalcula todo el árbol).
export function momentoRuta(momentoProp) {
  const pedido = forzado("momento");
  return ["dia", "atardecer", "noche"].includes(pedido) ? pedido : momentoProp || momentoChina();
}

export function MundoRuta({ nivel, momento: momentoProp, fiesta: fiestaProp = false }) {
  const momento = momentoRuta(momentoProp);
  const fiesta = fiestaProp || forzado("fiesta") === "1";
  const { Panorama, Ambiente } = MUNDOS[nivel] || MUNDOS.A1;
  return (
    <div className={`mr-mundo mr-${nivel} ${fiesta ? "mr-fiesta" : ""}`} data-momento={momento} aria-hidden="true">
      <div className="mr-fijo">
        <div className="mr-cielo" />
        <Panorama momento={momento} fiesta={fiesta} />
        <Ambiente momento={momento} fiesta={fiesta} />
      </div>
      <div className="mr-velo" />
    </div>
  );
}

// Rendimiento: cada viñeta se marca con data-fuera cuando sale de la pantalla (v20-fluidez.css pausa entonces sus
// animaciones). Las de su unidad ya se pausan cuando sale la unidad entera, pero una unidad mide ~600 px y sus
// viñetas (copos, reflejos… animados dentro del SVG, en el hilo principal) seguían en marcha estando fuera de la vista.
function usePausaVinetas() {
  const izquierda = React.useRef(null);
  const derecha = React.useRef(null);
  React.useEffect(() => {
    const els = [izquierda.current, derecha.current].filter(Boolean);
    if (!els.length || typeof IntersectionObserver === "undefined") return undefined;
    const ojo = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) e.target.toggleAttribute("data-fuera", !e.isIntersecting);
      },
      { rootMargin: "200px 0px" },
    );
    els.forEach((el) => ojo.observe(el));
    return () => ojo.disconnect();
  }, []);
  return [izquierda, derecha];
}

export function EscenaTramo({ nivel, idx }) {
  const lista = (MUNDOS[nivel] || MUNDOS.A1).VINETAS;
  const Izquierda = lista[idx % lista.length];
  const Derecha = lista[(idx + 2) % lista.length];
  const [refIzquierda, refDerecha] = usePausaVinetas();
  return (
    <>
      <div ref={refIzquierda} className={`mr-vineta izq ${idx % 2 ? "baja" : ""}`} aria-hidden="true">
        <Izquierda />
      </div>
      <div ref={refDerecha} className={`mr-vineta der ${idx % 2 ? "" : "baja"}`} aria-hidden="true">
        <Derecha />
      </div>
    </>
  );
}
