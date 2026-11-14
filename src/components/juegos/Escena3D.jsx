// v17 · Piezas comunes de los juegos en 3D: escenario con suelo en perspectiva y paralaje,
// barra superior con placas lacadas, botón con volumen y pantalla de resultados.
import * as React from "react";
import { Link } from "react-router";
import { ArrowLeftIcon, StarIcon } from "lucide-react";
import "../../styles/v17-juegos3d.css";

const sinMovimiento = () =>
  typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Escenario: fondo nocturno, luna, faroles y suelo lacado que se pierde en el horizonte.
 *  Con el ratón (o el dedo) la escena se inclina un poco: deja --mx y --my (de -1 a 1) en la raíz. */
export function Escena3D({ tema = "kahoot", className = "", children, suelo = true }) {
  const raiz = React.useRef(null);
  const pendiente = React.useRef(0);
  const alMover = React.useCallback((evento) => {
    if (sinMovimiento() || pendiente.current) return;
    const { clientX, clientY } = evento;
    pendiente.current = requestAnimationFrame(() => {
      pendiente.current = 0;
      const nodo = raiz.current;
      if (!nodo) return;
      const caja = nodo.getBoundingClientRect();
      const mx = ((clientX - caja.left) / Math.max(1, caja.width)) * 2 - 1;
      const my = ((clientY - caja.top) / Math.max(1, Math.min(caja.height, window.innerHeight))) * 2 - 1;
      nodo.style.setProperty("--mx", Math.max(-1, Math.min(1, mx)).toFixed(3));
      nodo.style.setProperty("--my", Math.max(-1, Math.min(1, my)).toFixed(3));
    });
  }, []);
  React.useEffect(() => () => cancelAnimationFrame(pendiente.current), []);
  return (
    <div ref={raiz} className={`j3 j3--${tema} gm-no-adapt ${className}`} onPointerMove={alMover}>
      <div className="j3-fondo" aria-hidden="true" translate="no">
        <div className="j3-luna" />
        <div className="j3-bruma" />
        {suelo && <div className="j3-suelo" />}
        <div className="j3-farol j3-farol--a" />
        <div className="j3-farol j3-farol--b" />
        <div className="j3-farol j3-farol--c" />
      </div>
      <div className="j3-contenido">{children}</div>
    </div>
  );
}

/** Barra superior: volver + título + placas (puntos, vidas, turno…). */
export function BarraJuego({ volverA = "/juegos", alVolver, titulo, tituloZh, children }) {
  return (
    <header className="j3-barra">
      <Link to={volverA} onClick={alVolver} className="j3-volver" aria-label="Volver a juegos · 返回游戏">
        <ArrowLeftIcon size={18} />
        <span>Volver · 返回</span>
      </Link>
      {titulo && (
        <p className="j3-titulo">
          <b>{titulo}</b>
          {tituloZh && <i>{tituloZh}</i>}
        </p>
      )}
      <div className="j3-placas">{children}</div>
    </header>
  );
}

/** Placa lacada con icono, valor y etiqueta. `tono`: oro | rojo | jade | tinta */
export function Placa({ icono, valor, etiqueta, tono = "oro", pulso = false, className = "" }) {
  return (
    <div className={`j3-placa j3-placa--${tono} ${pulso ? "j3-placa--pulso" : ""} ${className}`}>
      {icono && <span className="j3-placa__icono">{icono}</span>}
      <span className="j3-placa__texto">
        <b key={String(valor)}>{valor}</b>
        {etiqueta && <i>{etiqueta}</i>}
      </span>
    </div>
  );
}

/** Botón con volumen (se hunde al pulsar). `tono`: rojo | oro | jade | tinta */
export function Boton3D({ tono = "rojo", className = "", children, ...resto }) {
  return (
    <button type="button" className={`j3-boton j3-boton--${tono} ${className}`} {...resto}>
      <span>{children}</span>
    </button>
  );
}

/** Pantalla final: medallón que gira, estrellas, placas de datos y acciones. */
export function Resultado3D({ gano, titulo, tituloZh, sello, estrellas, datos = [], acciones, children }) {
  const total = Math.max(0, Math.min(3, estrellas ?? (gano ? 3 : 1)));
  return (
    <section className={`j3-final ${gano ? "j3-final--gano" : "j3-final--perdio"}`}>
      <div className="j3-medallon" aria-hidden="true" translate="no">
        <div className="j3-medallon__rayos" />
        <div className="j3-medallon__disco">
          <span className="j3-medallon__cara">{sello || (gano ? "胜" : "再")}</span>
          <span className="j3-medallon__cara j3-medallon__cara--dorso">{gano ? "福" : "练"}</span>
        </div>
      </div>
      <div className="j3-estrellas" aria-label={`${total} de 3 estrellas`}>
        {[0, 1, 2].map((n) => (
          <StarIcon key={n} size={34} className={n < total ? "j3-estrella j3-estrella--si" : "j3-estrella"} style={{ animationDelay: `${0.25 + n * 0.18}s` }} />
        ))}
      </div>
      <h1 className="j3-final__titulo">{titulo}</h1>
      {tituloZh && <p className="j3-final__zh">{tituloZh}</p>}
      {datos.length > 0 && (
        <div className="j3-datos">
          {datos.map((dato, n) => (
            <div key={dato.etiqueta} className={`j3-dato j3-dato--${dato.tono || "oro"}`} style={{ animationDelay: `${0.35 + n * 0.1}s` }}>
              <b>{dato.valor}</b>
              <i>{dato.etiqueta}</i>
            </div>
          ))}
        </div>
      )}
      {children}
      {acciones && <div className="j3-acciones">{acciones}</div>}
    </section>
  );
}
