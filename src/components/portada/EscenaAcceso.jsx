import * as React from "react";
import { Logo, PanelJade } from "../../../packages/imperial/src/index.js";
import { useParallaxPuntero, useEntrando } from "./vida.js";
import "../../styles/v14-motion.css";
import "../../styles/v14-portada.css";

// Fondo vivo de la portada, en versión reducida, para las pantallas de acceso (#/login y #/sign-in):
// el mapa pintado oscurecido, nubes doradas en tres profundidades, faroles, chispas y un panel de jade.
const NUBES = ["lejos n1", "lejos n2", "media n3", "media n4", "cerca n5", "cerca n6"];

function FondoVivo() {
  return (
    <div className="v14a-fondo" aria-hidden="true">
      <span className="v14a-pintura" />
      <span className="v14a-velo" />
      <span className="v14a-rayos" />
      {NUBES.map((clase) => (
        <span key={clase} className={`v14-nube ${clase}`}>
          <i />
        </span>
      ))}
      <span className="v14a-farol f1">
        <i />
      </span>
      <span className="v14a-farol f2">
        <i />
      </span>
      {Array.from({ length: 10 }, (_, indice) => (
        <span key={indice} className="wel-chispa" style={{ "--x": `${6 + ((indice * 37) % 90)}%`, "--d": `${(indice * 0.9) % 7}s`, "--t": `${6 + (indice % 4)}s` }} />
      ))}
    </div>
  );
}

// El Rey Mono saludando: flota, guiña de vez en cuando (cruce saluda ↔ guiño) y reacciona al pasar o tocar.
export function MonoSaluda() {
  const [brinco, setBrinco] = React.useState(0);
  return (
    <button type="button" className="v14a-mono" onPointerEnter={(e) => e.pointerType === "mouse" && setBrinco((n) => n + 1)} onClick={() => setBrinco((n) => n + 1)} aria-label="El Rey Mono te saluda · 美猴王向你问好">
      <span className="v14a-mono-halo" aria-hidden="true" />
      <span className="v14a-mono-rayos" aria-hidden="true" />
      <span key={brinco} className={`v14a-mono-cuerpo ${brinco ? "brinca" : ""}`} aria-hidden="true">
        <img className="pose base" src="./mono/saluda.png" alt="" draggable="false" />
        <img className="pose guino" src="./mono/guino.png" alt="" draggable="false" />
      </span>
      {brinco > 0 && (
        <span key={`b${brinco}`} className="v14a-mono-hola" translate="no">
          ¡Hola! <b>你好！</b>
        </span>
      )}
    </button>
  );
}

// Marco común: fondo vivo + panel de jade con sello, logo, mono, título bilingüe y el contenido (hoja de pergamino).
export function EscenaAcceso({ sello, titulo, tituloZh, subtitulo, conMono = true, children, pie }) {
  const refRaiz = React.useRef(null);
  const entrando = useEntrando(1400);
  useParallaxPuntero(refRaiz);
  return (
    <div ref={refRaiz} className={`tp-acceso v14a ${entrando ? "v14-entrando" : ""}`}>
      <FondoVivo />
      <PanelJade as="main" className="v14a-panel">
        <span className="v14a-sello" aria-hidden="true" translate="no">
          {[...sello].map((letra) => (
            <i key={letra}>{letra}</i>
          ))}
        </span>
        <Logo tono="oscuro" tamano={44} />
        {conMono && <MonoSaluda />}
        <h1>
          {titulo}
          <small>{tituloZh}</small>
        </h1>
        <p className="tp-acceso-sub v14a-sub">{subtitulo}</p>
        <div className="v14a-hoja">{children}</div>
        {pie}
      </PanelJade>
    </div>
  );
}
