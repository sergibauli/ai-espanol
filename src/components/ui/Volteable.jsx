// v22 · Fila que se gira en 3D: español por defecto; doble clic (o doble toque) muestra el chino y otra vez vuelve.
// Si se pasa `onToque`, un toque simple lo ejecuta (p. ej. escuchar) solo cuando no llega un segundo toque.
import * as React from "react";

const ESPERA = 280;

export function Volteable({ es, zh, as: Etiqueta = "div", className = "", onToque, ...resto }) {
  const [girado, setGirado] = React.useState(false);
  const ultimoToque = React.useRef(0);
  const ultimoGiro = React.useRef(0);
  const temporizador = React.useRef(null);
  React.useEffect(() => () => clearTimeout(temporizador.current), []);
  const tieneZh = zh != null && zh !== "" && zh !== false;

  const girar = () => {
    // El móvil puede mandar doble toque y además «dblclick»: un solo giro
    if (Date.now() - ultimoGiro.current < 450) return;
    ultimoGiro.current = Date.now();
    clearTimeout(temporizador.current);
    setGirado((g) => !g);
    try {
      navigator.vibrate?.(10);
    } catch {}
  };
  const alSoltar = (e) => {
    if (e.button > 0) return;
    const ahora = Date.now();
    if (tieneZh && ahora - ultimoToque.current < ESPERA) {
      ultimoToque.current = 0;
      girar();
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
      <Etiqueta className={className} onClick={onToque} {...resto}>
        {es}
      </Etiqueta>
    );
  return (
    <Etiqueta
      className={`vt ${girado ? "vt--girado" : ""} ${className}`}
      onPointerUp={alSoltar}
      onDoubleClick={(e) => (e.preventDefault(), girar())}
      onKeyDown={teclado}
      tabIndex={0}
      role="button"
      aria-pressed={girado}
      aria-label={undefined}
      title="Doble clic: traducción · 双击查看中文"
      {...resto}
    >
      <span className="vt-giro">
        <span className="vt-cara vt-es" aria-hidden={girado}>
          {es}
        </span>
        <span className="vt-cara vt-zh" lang="zh" aria-hidden={!girado}>
          {zh}
        </span>
      </span>
    </Etiqueta>
  );
}

// Aviso que explica el gesto (una vez por sesión deja de latir)
export function AvisoVolteo() {
  return (
    <div className="vt-aviso" translate="no">
      <span className="vt-aviso__icono" aria-hidden="true">
        ↻
      </span>
      <span>
        Doble toque en una frase para ver el chino · <span lang="zh">双击句子查看中文</span>
      </span>
    </div>
  );
}
