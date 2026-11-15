// v30 · Contenido con GuiaBloques (fichas de vocabulario, frases con audio, conjugaciones, pasos…)
// v23 · Guía de la clase en fichas de pergamino: índice de tablillas de bambú + ficha con jerarquía clara
// (apartados numerados, tablas de equivalencias, tablas de conjugación con las terminaciones resaltadas,
// tablillas de nota / error / consejo y ejemplos con audio). Doble toque en cualquier bloque → chino (Volteable).
import * as React from "react";
import { Volume2Icon, ChevronLeftIcon, ChevronRightIcon, CheckIcon } from "lucide-react";
import { Volteable } from "../ui/Volteable.jsx";
import { speak } from "../lesson/fx.js";
import { analizarTeoria, emparejar, terminosAudibles } from "./teoria.js";
import { GuiaBloques, NUM_ZH, tieneVocab } from "./GuiaBloques.jsx";
import { Esquinas } from "./CabeceraUnidad.jsx";

// Los bloques de la ficha aparecen uno a uno al entrar en pantalla (sin JS o con «reducir movimiento» se ven tal cual)
function useRevelar(ref, clave) {
  React.useEffect(() => {
    const raiz = ref.current;
    if (!raiz || typeof IntersectionObserver === "undefined" || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;
    const piezas = raiz.querySelectorAll(".ud-ficha-cuerpo > *, .ud-ejemplo, .ud-escucha");
    raiz.classList.add("v27-revela");
    let n = 0;
    const ojo = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          e.target.style.setProperty("--v27-d", `${(n++ % 6) * 70}ms`);
          e.target.classList.add("v27-in");
          ojo.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    piezas.forEach((el) => ojo.observe(el));
    return () => ojo.disconnect();
  }, [ref, clave]);
}

// `teoria` = puntos de la clase abierta; `todas` = los de la unidad (para leer las marcas «Visto» antiguas, que eran posiciones)
export function FichaTeoria({ teoria, todas = teoria, numero }) {
  const [sel, setSel] = React.useState(0);
  const [dir, setDir] = React.useState(1);
  const key = `dele_guia_visto_${numero}`;
  const [vistos, setVistos] = React.useState(() => {
    try {
      const guardado = JSON.parse(localStorage.getItem(key) || "[]");
      return new Set(guardado.map((marca) => (typeof marca === "number" ? todas[marca]?.id : marca)).filter(Boolean));
    } catch {
      return new Set();
    }
  });
  const t = teoria[sel];
  const refFicha = React.useRef(null);
  useRevelar(refFicha, t);
  const bloques = React.useMemo(() => (t ? emparejar(analizarTeoria(t.descripcion), analizarTeoria(t.descripcionChino)) : []), [t]);
  if (!t) return null;
  const idDe = (i) => teoria[i]?.id ?? i;
  const marcar = (i, valor) => {
    const nuevos = new Set(vistos);
    (valor ?? !nuevos.has(idDe(i))) ? nuevos.add(idDe(i)) : nuevos.delete(idDe(i));
    setVistos(nuevos);
    try {
      localStorage.setItem(key, JSON.stringify([...nuevos]));
    } catch {}
  };
  const ir = (i) => {
    if (i < 0 || i >= teoria.length) return;
    setDir(i > sel ? 1 : -1);
    setSel(i);
    document.getElementById("ud-ficha")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const escucha = tieneVocab(bloques) ? [] : terminosAudibles(bloques.map(([b]) => b)).slice(0, 8);
  const visto = vistos.has(idDe(sel));
  // Los ejemplos que ya salen en el cuerpo (lista «Ejemplos») no se repiten abajo
  const enCuerpo = new Set(bloques.flatMap(([b]) => (b.type === "list" ? b.items.map((x) => (x.raw ?? x.term).replace(/[«»"\s.¡!¿?]/g, "").toLowerCase()) : [])));
  const ejemplos = (t.ejemplos || []).filter((e) => !enCuerpo.has(String(e.espanol).replace(/[«»"\s.¡!¿?]/g, "").toLowerCase()));

  return (
    <div className="ud-guia">
      {teoria.length > 1 && (
        <nav className="ud-indice" aria-label="Puntos de gramática">
          <span className="ud-indice-tit">
            Índice · <span lang="zh">语法</span>
          </span>
          {teoria.map((x, i) => (
            <button key={x.id || i} type="button" className={`ud-tablilla-bambu ${i === sel ? "on" : ""} ${vistos.has(idDe(i)) ? "visto" : ""}`} onClick={() => ir(i)} aria-current={i === sel}>
              <span className="ud-tb-num" translate="no">
                {vistos.has(idDe(i)) ? <CheckIcon size={14} strokeWidth={3.5} /> : NUM_ZH[i] || i + 1}
              </span>
              <span className="ud-tb-txt">
                <b>{x.titulo}</b>
                <small>{x.tituloChino}</small>
              </span>
            </button>
          ))}
        </nav>
      )}

      <article ref={refFicha} className="ud-ficha" id="ud-ficha" key={`ficha-${numero}-${idDe(sel)}`} style={{ "--dir": dir }}>
        <span className="ud-rodillo arriba" aria-hidden="true" />
        <Esquinas />
        <span className="ud-ficha-marca" aria-hidden="true" translate="no">
          {NUM_ZH[sel] || sel + 1}
        </span>
        <span className="ud-ficha-cinta" aria-hidden="true" translate="no">
          {t.tituloChino}
        </span>
        <header className="ud-ficha-cab">
          <span className="ud-ficha-num" translate="no" aria-hidden="true">
            {NUM_ZH[sel] || sel + 1}
          </span>
          <div className="ud-ficha-titulos">
            <small>
              Punto {sel + 1} de {teoria.length} · <span lang="zh">语法</span>
            </small>
            <Volteable as="h3" cara="ud-ficha-h3" es={t.titulo} zh={t.tituloChino} reinicio={sel} />
            <p className="ud-ficha-zh" lang="zh">
              {t.tituloChino}
            </p>
          </div>
          <button type="button" className={`ud-sello-visto ${visto ? "on" : ""}`} onClick={() => marcar(sel)} aria-pressed={visto} title="Marcar como leído · 标记为已读">
            <span translate="no">{visto ? "已读" : "读"}</span>
            <small>{visto ? "Leído" : "Marcar"}</small>
          </button>
        </header>
        <p className="gx-aviso" translate="no">
          <span className="gx-aviso-ico" aria-hidden="true">
            <i>Es</i>
            <i>中</i>
          </span>
          Toca para escuchar · doble toque para ver en chino
          <span lang="zh"> · 点击听发音，双击看中文</span>
        </p>

        <div className="ud-ficha-cuerpo gx-cuerpo">
          <GuiaBloques bloques={bloques} />
        </div>

        {ejemplos.length > 0 && (
          <section className="ud-ejemplos" aria-label="Ejemplos">
            <h5 className="ud-ejemplos-tit">
              Ejemplos · <span lang="zh">例句</span>
            </h5>
            {ejemplos.slice(0, 6).map((e, i) => (
              <button key={i} type="button" className="ud-ejemplo" onClick={() => speak(e.espanol)}>
                <span className="ud-ejemplo-play" aria-hidden="true">
                  <Volume2Icon size={18} />
                </span>
                <span className="ud-ejemplo-txt">
                  <b>{e.espanol}</b>
                  {e.chino && <small lang="zh">{e.chino}</small>}
                </span>
              </button>
            ))}
          </section>
        )}

        {escucha.length > 0 && (
          <div className="ud-escucha">
            <span className="ud-escucha-tag">
              <Volume2Icon size={14} /> Escucha · <span lang="zh">听</span>
            </span>
            {escucha.map((w) => (
              <button key={w} type="button" className="ud-escucha-btn" onClick={() => speak(w)}>
                {w}
              </button>
            ))}
          </div>
        )}

        <footer className="ud-ficha-pie">
          <button type="button" className="ud-pie-btn" disabled={sel === 0} onClick={() => ir(sel - 1)}>
            <ChevronLeftIcon size={18} /> Anterior
          </button>
          <span className="ud-pie-puntos" aria-hidden="true">
            {teoria.map((_, i) => (
              <i key={i} className={i === sel ? "on" : vistos.has(idDe(i)) ? "visto" : ""} />
            ))}
          </span>
          {sel < teoria.length - 1 ? (
            <button
              type="button"
              className="ud-pie-btn laca"
              onClick={() => {
                marcar(sel, true);
                ir(sel + 1);
              }}
            >
              Siguiente <ChevronRightIcon size={18} />
            </button>
          ) : (
            <button type="button" className={`ud-pie-btn laca ${visto ? "hecho" : ""}`} onClick={() => marcar(sel, true)}>
              <CheckIcon size={18} /> {visto ? "Leído · 已读" : "Terminado"}
            </button>
          )}
        </footer>
        <span className="ud-rodillo abajo" aria-hidden="true" />
        <span className="ud-rodillo viajero" aria-hidden="true" />
      </article>
    </div>
  );
}
