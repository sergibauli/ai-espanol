// Cartas de la baraja española tradicional (ilustraciones de Basquetteur, Wikimedia Commons, CC BY-SA 3.0;
// ver public/baraja/LEEME.md) con acabado 3D: canto con grosor, brillo que sigue al puntero e inclinación.
import * as React from "react";
import { NOMBRE, PALO } from "./briscaLogica.js";

const ruta = (archivo) => `./baraja/${archivo}.webp`;
export const imagenCarta = (c) => ruta(`${c.palo}-${c.n}`);
export const IMAGEN_DORSO = ruta("dorso");

/** Precarga las 41 imágenes para que el reparto no parpadee */
export function precargarBaraja() {
  if (typeof Image === "undefined") return;
  for (const palo of ["oros", "copas", "espadas", "bastos"]) for (const n of [1, 2, 3, 4, 5, 6, 7, 10, 11, 12]) new Image().src = imagenCarta({ palo, n });
  new Image().src = IMAGEN_DORSO;
}

/** Símbolo del palo: recorte del as de ese palo */
export function SimboloPalo({ palo, size = 28, className = "" }) {
  return <span className={`bz-simbolo bz-simbolo--${palo} ${className}`} style={{ "--s": `${size}px`, backgroundImage: `url(${ruta(`${palo}-1`)})` }} aria-hidden="true" />;
}

export function Cara({ carta }) {
  return <img className="bz-img" src={imagenCarta(carta)} alt="" draggable="false" decoding="async" />;
}
export function Dorso() {
  return <img className="bz-img" src={IMAGEN_DORSO} alt="" draggable="false" decoding="async" />;
}

// Inclinación 3D con el puntero (solo ratón) usando variables CSS
function inclinar(e) {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", ((e.clientX - r.left) / r.width).toFixed(3));
  el.style.setProperty("--my", ((e.clientY - r.top) / r.height).toFixed(3));
  el.classList.add("is-inclinada");
}
function soltar(e) {
  const el = e.currentTarget;
  el.classList.remove("is-inclinada");
  el.style.removeProperty("--mx");
  el.style.removeProperty("--my");
}

/** Carta con dos caras (giro 3D) */
export const Carta = React.memo(function Carta({ carta, bocaAbajo = false, conCara = !bocaAbajo, className = "", origen, retraso = 0, inclinable = false }) {
  return (
    <div
      className={`bz-carta${carta.n === 1 || carta.n >= 10 ? " is-especial" : ""} ${className}`}
      data-carta={carta.id}
      data-cara={bocaAbajo ? "abajo" : "arriba"}
      data-origen={origen}
      data-retraso={retraso || undefined}
      onPointerMove={inclinable ? inclinar : undefined}
      onPointerLeave={inclinable ? soltar : undefined}
    >
      <div className={`bz-carta-in${bocaAbajo ? " is-abajo" : ""}`}>
        <div className="bz-cara bz-cara--frente">{conCara && <Cara carta={carta} />}</div>
        <div className="bz-cara bz-cara--dorso">
          <Dorso />
        </div>
      </div>
    </div>
  );
});

export const nombreFigura = (n) => NOMBRE[n];
export const colorPalo = (palo) => PALO[palo].color;
