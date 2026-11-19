import * as React from "react";
import "../../styles/v13-ruta-mundos.css";
import "../../styles/v14-motion.css";
import "../../styles/v25-ruta-mundo.css";
import { ParticulasRuta } from "./ParticulasRuta.jsx";

/*
  v25 · Mundo de cada nivel de la Ruta: un paisaje PINTADO (raster propio, scripts/fondos-ruta.py) en tres planos
  (lejos · medio · cerca) dentro de un lienzo fijo (sticky) con:
    - parallax ligado al scroll (cada plano se desplaza distinto; v13-ruta-mundos.css),
    - bandas de niebla que derivan entre planos (tiras tileables public/theme/ruta/niebla-*.webp),
    - rayos de sol / luna desde la luz clave del nivel, brillo del agua (B1, B2),
    - partículas en canvas (ParticulasRuta: nieve, polvo y farolillos, lluvia y pétalos, aves y hojas).
  Luz clave: A1 sol bajo de invierno a la derecha · A2 sol de atardecer a la izquierda · B1 luna arriba a la derecha ·
  B2 sol de mañana a la izquierda. Todo se para con prefers-reduced-motion y se reduce en móvil.
  momento = "dia" | "atardecer" | "noche" (hora de China) → data-momento (gradación de color encima del paisaje).
*/
const BASE = import.meta.env.BASE_URL || "./";
const capa = (nivel, plano) => `${BASE}theme/ruta/fondo-${nivel}-${plano}.webp`;

// Luz clave de cada nivel en coordenadas del lienzo (1000 × 1400) · niebla · línea del agua
const LUZ = {
  A1: { x: 77, y: 25.7, niebla: "blanca", agua: null },
  A2: { x: 23, y: 42.9, niebla: "arena", agua: null },
  B1: { x: 76, y: 16.4, niebla: "noche", agua: 64.6 },
  B2: { x: 26, y: 21.4, niebla: "blanca", agua: 62.9 },
};

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

export function MundoRuta({ nivel, momento: momentoProp, fiesta: fiestaProp = false }) {
  const momento = momentoRuta(momentoProp);
  const fiesta = fiestaProp || forzado("fiesta") === "1";
  const luz = LUZ[nivel] || LUZ.A1;
  const nv = LUZ[nivel] ? nivel : "A1";
  return (
    <div className={`mr-mundo mr-${nv} mr25 ${fiesta ? "mr-fiesta" : ""}`} data-momento={momento} aria-hidden="true">
      <div className="mr-fijo">
        <div className="mr-cielo" />
        <div className="mr-lienzo" style={{ "--sx": `${luz.x}%`, "--sy": `${luz.y}%` }}>
          <img className="mr-capa mr-lejos" src={capa(nv, "lejos")} alt="" decoding="async" fetchPriority="high" />
          <span className="mr-rayos" />
          <span className={`mr-tira n-${luz.niebla} t1`} />
          <img className="mr-capa mr-medio" src={capa(nv, "medio")} alt="" decoding="async" />
          {luz.agua && <span className="mr-agua" style={{ top: `${luz.agua}%` }} />}
          <span className={`mr-tira n-${luz.niebla} t2`} />
          <img className="mr-capa mr-cerca" src={capa(nv, "cerca")} alt="" decoding="async" />
          <span className={`mr-tira n-${luz.niebla} t3`} />
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
