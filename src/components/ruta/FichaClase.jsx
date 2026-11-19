import * as React from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";
import { CheckIcon, LockIcon, XIcon, ChevronRightIcon, PlayIcon } from "lucide-react";
import { LESSON_META, LESSONS_PER_MODULE } from "../../lib/lessons.js";
import { Pictograma } from "./paisajes.jsx";

/*
  v27 · Ficha de clase de la Ruta (antes el popover .rp-pop dentro del tablero).
  Va en un portal a <body> (el tablero está transformado en 3D: position: fixed no sería relativo a la ventana).
  Escritorio: carta de juego anclada junto al medallón (a la derecha o a la izquierda según el sitio), que entra con
  un giro 3D. Móvil: hoja inferior a todo el ancho por encima de la barra, con velo, legible con el pulgar.
  El mundo del nivel manda: cabecera con el paisaje pintado del nivel, color de laca del nivel y pictograma de la unidad.
*/
const BASE = import.meta.env.BASE_URL || "./";
const ICONOS = ["词", "汇", "法", "句", "复"];

export function FichaClase({ ancla, abierta, nivel, color, oscuro, numero, clase, titulo, lugar, paisaje, siguiente, cargando, movil, onEmpezar, onCerrar }) {
  const ref = React.useRef(null);
  const [pos, setPos] = React.useState(null);

  // Posición junto al medallón (solo escritorio); se recoloca al hacer scroll o cambiar el tamaño
  React.useLayoutEffect(() => {
    if (movil) return undefined;
    let raf = 0;
    const colocar = () => {
      raf = 0;
      const el = ancla?.();
      const ficha = ref.current;
      if (!el || !ficha) return;
      const r = el.getBoundingClientRect();
      const ancho = ficha.offsetWidth || 340;
      const alto = ficha.offsetHeight || 420;
      const margen = 14;
      const derecha = r.right + margen + ancho < window.innerWidth - 8;
      const left = derecha ? r.right + margen : Math.max(8, r.left - margen - ancho);
      const top = Math.max(12, Math.min(window.innerHeight - alto - 12, r.top + r.height / 2 - alto * 0.42));
      const flecha = Math.max(24, Math.min(alto - 24, r.top + r.height / 2 - top));
      setPos((previa) => (previa && previa.left === left && previa.top === top && previa.flecha === flecha ? previa : { left, top, derecha, flecha }));
    };
    colocar();
    const pedir = () => {
      if (!raf) raf = requestAnimationFrame(colocar);
    };
    window.addEventListener("scroll", pedir, { passive: true, capture: true });
    window.addEventListener("resize", pedir);
    const reloj = setInterval(pedir, 250); // la cámara 3D mueve el medallón sin scroll
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(reloj);
      window.removeEventListener("scroll", pedir, { capture: true });
      window.removeEventListener("resize", pedir);
    };
  }, [ancla, movil]);

  // Foco al primer botón útil al abrir (teclado)
  React.useEffect(() => {
    const primero = ref.current?.querySelector(".rf-cta, .rf-cerrar");
    primero?.focus({ preventScroll: true });
  }, []);

  const hechas = clase.lecciones.filter(Boolean).length;
  const pct = Math.round((hechas / LESSONS_PER_MODULE) * 100);
  const estiloPos = movil ? undefined : pos ? { left: pos.left, top: pos.top, "--flecha": `${pos.flecha}px` } : { left: -9999, top: 0 };
  const ficha = (
    <>
      {movil && <div className="rf-velo" aria-hidden="true" onClick={onCerrar} />}
      <div
        ref={ref}
        className={`rp-ficha rf-${nivel} ${abierta ? "" : "cerrada"} ${movil ? "hoja" : pos?.derecha === false ? "a-izq" : "a-der"}`}
        role="dialog"
        aria-modal={movil ? "true" : undefined}
        aria-label={`Clase ${clase.n} · 第${clase.n}课`}
        style={{ ...estiloPos, "--c": abierta ? color : "#5a4632", "--d": abierta ? oscuro : "#2b1d10", "--fondo": `url("${BASE}theme/ruta/fondo-${nivel}-lejos.webp")` }}
      >
        <span className="rf-flecha" aria-hidden="true" />
        {movil && <span className="rf-asa" aria-hidden="true" />}
        <header className="rf-cab">
          <span className="rf-paisaje" aria-hidden="true" />
          <span className="rf-picto" aria-hidden="true">
            <Pictograma tipo={paisaje} tamano={movil ? 30 : 34} />
          </span>
          <span className="rf-sello" translate="no">
            第{clase.n}课
          </span>
          <div className="rf-tit">
            <small>
              {nivel} · Unidad {numero} · {lugar}
            </small>
            <b>Clase {clase.n}</b>
            <span className="rf-tema">{titulo}</span>
            <span className="rf-datos">
              {LESSONS_PER_MODULE} lecciones · ~{clase.minutos || 50} min <i translate="no">{LESSONS_PER_MODULE}个小练习 · {clase.minutos || 50}分钟</i>
            </span>
          </div>
          <button type="button" className="rf-cerrar" onClick={onCerrar} aria-label="Cerrar · 关闭">
            <XIcon size={18} strokeWidth={2.6} />
          </button>
        </header>

        {abierta ? (
          <>
            <div className="rf-progreso" aria-label={`${hechas}/${LESSONS_PER_MODULE} lecciones hechas · 已完成`}>
              <span className="rf-barra">
                <i style={{ width: `${pct}%` }} />
              </span>
              <b>
                {hechas}/{LESSONS_PER_MODULE} <span translate="no">已完成</span>
              </b>
            </div>
            <ol className="rf-lecciones">
              {LESSON_META.map((meta, k) => {
                const hecha = clase.lecciones[k];
                const disponible = k === 0 || hecha || clase.lecciones[k - 1];
                const esSiguiente = k === siguiente;
                return (
                  <li key={meta.key} style={{ "--k": k }}>
                    <button type="button" className={`rf-leccion ${hecha ? "hecha" : ""} ${esSiguiente ? "siguiente" : ""} ${disponible ? "" : "bloqueada"}`} disabled={cargando || !disponible} onClick={() => onEmpezar(k)}>
                      <span className="rf-ficha-n" aria-hidden="true">
                        {hecha ? <CheckIcon size={16} strokeWidth={4} /> : <span translate="no">{ICONOS[k]}</span>}
                      </span>
                      <span className="rf-nombre">
                        <b>
                          {k + 1}. {meta.es}
                        </b>
                        <em translate="no">{meta.zh}</em>
                      </span>
                      <small className="rf-estado">{hecha ? <>Repetir · 再练</> : esSiguiente ? <>+10 XP</> : disponible ? <>Lista · 可以</> : <LockIcon size={14} />}</small>
                    </button>
                  </li>
                );
              })}
            </ol>
            <div className="rf-acciones">
              {siguiente >= 0 ? (
                <button type="button" className="rf-cta" disabled={cargando} onClick={() => onEmpezar(siguiente)}>
                  <span className="rf-cta-play" aria-hidden="true">
                    <PlayIcon size={18} fill="currentColor" />
                  </span>
                  <span>
                    {hechas ? "Seguir" : "Empezar"} · Lección {siguiente + 1}
                    <i translate="no">{hechas ? "继续" : "开始"} 第{siguiente + 1}个练习</i>
                  </span>
                </button>
              ) : (
                <button type="button" className="rf-cta repaso" disabled={cargando} onClick={() => onEmpezar(LESSONS_PER_MODULE - 1)}>
                  <span className="rf-cta-play" aria-hidden="true">
                    <CheckIcon size={18} strokeWidth={3.4} />
                  </span>
                  <span>
                    Clase completada · Repasar <i translate="no">已完成 · 复习</i>
                  </span>
                </button>
              )}
              <Link className="rf-abrir" to={`/modulos/modulo-${numero}?clase=${clase.n}`}>
                Abrir la clase completa · 打开本课 <ChevronRightIcon size={16} />
              </Link>
            </div>
          </>
        ) : (
          <div className="rf-bloqueo">
            <span className="rf-candado" aria-hidden="true">
              <LockIcon size={30} strokeWidth={2.4} />
            </span>
            <p>
              <b>Clase bloqueada</b>
              {clase.n > 1 ? `Termina la clase ${clase.n - 1} para abrirla.` : "Termina la unidad anterior para abrirla."}
              <span translate="no">{clase.n > 1 ? `完成第${clase.n - 1}课后解锁` : "完成上一单元后解锁"}</span>
            </p>
          </div>
        )}
      </div>
    </>
  );
  return createPortal(ficha, document.body);
}
