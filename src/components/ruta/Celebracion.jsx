import * as React from "react";
import { createPortal } from "react-dom";
import { FuegosArtificiales } from "./FuegosArtificiales.jsx";
const monoTrofeo = "./mono/trofeo.png";

/*
  Celebración al completar una clase (o la unidad entera) en la Ruta.
  Capa fija sobre toda la ventana con pointer-events: none: velo de noche suave para que luzcan los fuegos,
  fuegos artificiales en canvas y el sello rojo caligráfico estampándose en el centro.
  - tipo "clase": sello «第N课 · 完成» + cinta «¡Clase completada!».
  - tipo "unidad": sello «通关» con el Rey Mono en pose trofeo y rayos + cinta «¡Unidad superada!».
  - saliendo = true: se funde (lo decide RutaPage al acabar o al saltarla tocando).
  Con prefers-reduced-motion solo queda el sello con fundido (sin fuegos).
*/
const POLVO = Array.from({ length: 12 }, (_, i) => i);

// Sello de laca con bordes de tinta irregulares (filtro estático: el sello no anima el filtro, solo transform/opacity)
function SelloLaca({ id, children, grande }) {
  return (
    <div className={`rc-sello ${grande ? "grande" : ""}`}>
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <filter id={`${id}-roto`} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="3" seed="7" result="ruido" />
            <feDisplacementMap in="SourceGraphic" in2="ruido" scale="9" />
          </filter>
          <filter id={`${id}-grano`} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3" />
            <feColorMatrix values="0 0 0 0 1  0 0 0 0 .92  0 0 0 0 .8  0 0 0 -1.5 .62" />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
          <linearGradient id={`${id}-laca`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f0364c" />
            <stop offset=".42" stopColor="#c8102e" />
            <stop offset="1" stopColor="#7d0a1d" />
          </linearGradient>
          <linearGradient id={`${id}-oro`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff6cf" />
            <stop offset=".5" stopColor="#f2c14e" />
            <stop offset="1" stopColor="#a8741e" />
          </linearGradient>
        </defs>
        <rect x="6" y="10" width="188" height="188" rx="20" fill="#3b0510" opacity=".35" />
        <g filter={`url(#${id}-roto)`}>
          <rect x="8" y="8" width="184" height="184" rx="20" fill={`url(#${id}-oro)`} />
          <rect x="14" y="14" width="172" height="172" rx="15" fill={`url(#${id}-laca)`} />
          <rect x="24" y="24" width="152" height="152" rx="9" fill="none" stroke="#ffe9a8" strokeOpacity=".85" strokeWidth="2.6" />
          <rect x="30" y="30" width="140" height="140" rx="6" fill="none" stroke="#ffe9a8" strokeOpacity=".4" strokeWidth="1" />
        </g>
        {/* Luz de borde arriba a la izquierda y grano de tinta gastada */}
        <path d="M22 60V34a12 12 0 0 1 12-12h70" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" />
        <rect x="14" y="14" width="172" height="172" rx="15" fill="#fff" filter={`url(#${id}-grano)`} opacity=".5" />
      </svg>
      <div className="rc-sello-texto" translate="no">
        {children}
      </div>
    </div>
  );
}

export function Celebracion({ tipo = "clase", n = 1, lugar, saliendo = false }) {
  const id = React.useId().replace(/:/g, "");
  const [conFuegos, setConFuegos] = React.useState(() => !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
  const [dentro, setDentro] = React.useState(false);
  React.useEffect(() => {
    const cuadro = requestAnimationFrame(() => setDentro(true));
    return () => cancelAnimationFrame(cuadro);
  }, []);
  const esUnidad = tipo === "unidad";
  return createPortal(
    <div className={`rc-capa rc-${tipo} ${dentro ? "dentro" : ""} ${saliendo ? "saliendo" : ""} ${saliendo && !conFuegos ? "apagada" : ""}`} role="status" aria-live="polite">
      <div className="rc-velo" aria-hidden="true" />
      {conFuegos && <FuegosArtificiales nivel={tipo} onFin={() => setConFuegos(false)} />}
      <div className="rc-centro">
        {esUnidad && (
          <div className="rc-trofeo" aria-hidden="true">
            <span className="rc-rayos" />
            <span className="rc-halo" />
            <img src={monoTrofeo} alt="" />
          </div>
        )}
        <div className="rc-estampa">
          <span className="rc-onda" aria-hidden="true" />
          <span className="rc-onda dos" aria-hidden="true" />
          <span className="rc-polvo" aria-hidden="true">
            {POLVO.map((i) => (
              <i key={i} style={{ "--a": `${i * 30 + (i % 2) * 11}deg`, "--l": `${92 + (i % 3) * 26}px` }} />
            ))}
          </span>
          <SelloLaca id={id} grande={esUnidad}>
            {(esUnidad ? ["通关"] : [`第${n}课`, "完成"]).map((columna) => (
              <span key={columna} className={esUnidad ? "uno" : ""}>
                {[...columna].map((letra, i) => (
                  <i key={i}>{letra}</i>
                ))}
              </span>
            ))}
          </SelloLaca>
        </div>
        <div className="rc-cinta">
          <b>{esUnidad ? "¡Unidad superada!" : "¡Clase completada!"}</b>
          <span>{esUnidad ? "单元通关 · 获得护照印章" : `第${n}课完成 · 继续前进`}</span>
          {esUnidad && lugar && <em>{lugar}</em>}
        </div>
      </div>
    </div>,
    document.body,
  );
}
