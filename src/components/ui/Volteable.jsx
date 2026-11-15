// v22 · Tarjeta que se gira en 3D: español por defecto; doble clic (o doble toque) muestra el chino y otra vez vuelve.
// La tarjeta entera gira (no solo el texto): `cara` es la clase de diseño que llevan las dos caras (p. ej. "gd-point").
// La cara china lleva translate="no": siempre se ve en chino, sea cual sea el idioma de ayuda.
// Si se pasa `onToque`, un toque simple lo ejecuta (p. ej. escuchar) solo cuando no llega un segundo toque.
import * as React from "react";

const ESPERA = 280;

export function Volteable({ es, zh, as: Etiqueta = "div", cara = "", className = "", onToque, ...resto }) {
  const [girado, setGirado] = React.useState(false);
  const [ondas, setOndas] = React.useState([]);
  const animado = React.useRef(false);
  const ultimoToque = React.useRef(0);
  const ultimoGiro = React.useRef(0);
  const temporizador = React.useRef(null);
  const raiz = React.useRef(null);
  React.useEffect(() => () => clearTimeout(temporizador.current), []);
  const tieneZh = zh != null && zh !== "" && zh !== false;

  const girar = (e) => {
    // El móvil puede mandar doble toque y además «dblclick»: un solo giro
    if (Date.now() - ultimoGiro.current < 450) return;
    ultimoGiro.current = Date.now();
    animado.current = true;
    clearTimeout(temporizador.current);
    // Onda de tinta dorada desde el punto donde se ha tocado
    const caja = raiz.current?.getBoundingClientRect();
    if (caja && e?.clientX != null) {
      const id = Date.now();
      setOndas((o) => [...o.slice(-2), { id, x: e.clientX - caja.left, y: e.clientY - caja.top }]);
      setTimeout(() => setOndas((o) => o.filter((x) => x.id !== id)), 900);
    }
    setGirado((g) => !g);
    try {
      navigator.vibrate?.([8, 30, 14]);
    } catch {}
  };
  const alSoltar = (e) => {
    if (e.button > 0) return;
    const ahora = Date.now();
    if (tieneZh && ahora - ultimoToque.current < ESPERA) {
      ultimoToque.current = 0;
      girar(e);
      return;
    }
    ultimoToque.current = ahora;
    if (onToque) {
      clearTimeout(temporizador.current);
      temporizador.current = setTimeout(onToque, tieneZh ? ESPERA : 0);
    }
  };
  const teclado = (e) => {
    if (!tieneZh || (e.key !== "Enter" && e.key !== " ")) return;
    e.preventDefault();
    girar();
  };

  if (!tieneZh)
    return (
      <Etiqueta className={`vt-solo ${cara} ${className}`} onClick={onToque} {...resto}>
        {es}
      </Etiqueta>
    );
  return (
    <Etiqueta
      ref={raiz}
      className={`vt ${girado ? "vt--girado" : ""} ${animado.current ? (girado ? "vt--a-zh" : "vt--a-es") : ""} ${className}`}
      onPointerUp={alSoltar}
      onDoubleClick={(e) => (e.preventDefault(), girar(e))}
      onKeyDown={teclado}
      tabIndex={0}
      role="button"
      aria-pressed={girado}
      title="Doble clic: chino · 双击查看中文"
      {...resto}
    >
      <span className="vt-giro">
        <span className={`vt-cara vt-es ${cara}`} aria-hidden={girado}>
          {es}
        </span>
        <span className={`vt-cara vt-zh ${cara}`} lang="zh" translate="no" aria-hidden={!girado}>
          {zh}
          <i className="vt-sello" aria-hidden="true">
            中
          </i>
        </span>
      </span>
      {ondas.map((o) => (
        <i key={o.id} className="vt-onda" style={{ left: o.x, top: o.y }} aria-hidden="true" />
      ))}
    </Etiqueta>
  );
}

// Aviso que explica el gesto, bajo el título de la guía
export function AvisoVolteo() {
  return (
    <div className="vt-aviso" translate="no">
      <span className="vt-aviso__icono" aria-hidden="true">
        <i>Es</i>
        <i>中</i>
      </span>
      <span>Doble toque en cualquier frase para verla en chino</span>
    </div>
  );
}
