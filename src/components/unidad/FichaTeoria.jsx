// v23 · Guía de la clase en fichas de pergamino: índice de tablillas de bambú + ficha con jerarquía clara
// (apartados numerados, tablas de equivalencias, tablas de conjugación con las terminaciones resaltadas,
// tablillas de nota / error / consejo y ejemplos con audio). Doble toque en cualquier bloque → chino (Volteable).
import * as React from "react";
import { Volume2Icon, ChevronLeftIcon, ChevronRightIcon, CheckIcon } from "lucide-react";
import { Volteable, AvisoVolteo } from "../ui/Volteable.jsx";
import { speak } from "../lesson/fx.js";
import { analizarTeoria, emparejar, terminosAudibles } from "./teoria.js";
import { Esquinas } from "./CabeceraUnidad.jsx";

const NUM_ZH = ["壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖", "拾"];

// Texto con **negritas** y pronunciación «(VEIN-te)» resaltadas
export function Rico({ t }) {
  const partes = String(t ?? "").split(/(\*\*[^*]+\*\*|\([A-Za-zÁÉÍÓÚÑáéíóúñ-]*[A-ZÁÉÍÓÚÑ]{2,}[A-Za-zÁÉÍÓÚÑáéíóúñ-]*\))/g);
  return partes.map((p, i) =>
    /^\*\*.+\*\*$/.test(p) ? (
      <strong key={i} className="ud-marca">
        {p.slice(2, -2)}
      </strong>
    ) : /^\(.*-.*\)$|^\([A-ZÁÉÍÓÚÑ-]+\)$/.test(p) ? (
      <span key={i} className="ud-pron">
        {p}
      </span>
    ) : (
      <React.Fragment key={i}>{p}</React.Fragment>
    ),
  );
}

// Celda de tabla: terminaciones «-amos» y negritas en rojo
const Celda = ({ c }) => (/^-[a-záéíóúñ]+$/i.test(c) ? <span className="ud-term">{c}</span> : <Rico t={c} />);
function TablaConj({ filas }) {
  if (!filas?.length) return null;
  const [cab, ...cuerpo] = filas;
  return (
    <div className="ud-tabla-marco">
      <table className="ud-tabla">
        <thead>
          <tr>
            {cab.map((c, i) => (
              <th key={i}>
                <Rico t={c} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cuerpo.map((r, k) => (
            <tr key={k}>
              {r.map((c, n) => (n === 0 ? <th key={n} scope="row"><Rico t={c} /></th> : <td key={n}><Celda c={c} /></td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Pares({ items }) {
  return (
    <div className="ud-pares">
      {items.map((x, i) => (
        <div key={i} className={`ud-par ${x.def ? "" : "solo"}`}>
          <b>
            <Rico t={x.term} />
          </b>
          {x.def && (
            <span>
              <Rico t={x.def} />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

const Punto = ({ p, n }) => (
  <span className="ud-punto-in">
    {n != null && (
      <i className="ud-punto-n" aria-hidden="true">
        {n}
      </i>
    )}
    <b>
      <Rico t={p.term} />
    </b>
    {p.def && (
      <span>
        <Rico t={p.def} />
      </span>
    )}
    {p.sub?.length > 0 && (
      <ul className="ud-sub">
        {p.sub.map((s, i) => (
          <li key={i}>
            <Rico t={s} />
          </li>
        ))}
      </ul>
    )}
  </span>
);

const TABLILLA = {
  note: { es: "Nota", zh: "注意", sello: "注" },
  tip: { es: "Consejo", zh: "小贴士", sello: "诀" },
  error: { es: "Error común", zh: "常见错误", sello: "误" },
};

function Bloque({ b, z, capitular }) {
  if (b.type === "h")
    return (
      <Volteable
        as={b.nivel === 1 ? "h4" : "h5"}
        cara={`ud-h ud-h${b.nivel}`}
        es={
          <span className="ud-h-in">
            <Rico t={b.text} />
          </span>
        }
        zh={z?.text ? <span className="ud-h-in">{z.text}</span> : null}
      />
    );
  if (b.type === "p") return <Volteable cara={`ud-p ${capitular ? "ud-capitular" : ""}`} es={<Rico t={b.text} />} zh={z?.text} />;
  if (b.type === "pares") return <Volteable cara="ud-pares-cara" es={<Pares items={b.items} />} zh={z?.items ? <Pares items={z.items} /> : null} />;
  if (b.type === "table") return <Volteable cara="ud-tabla-cara" es={<TablaConj filas={b.rows} />} zh={z?.rows ? <TablaConj filas={z.rows} /> : null} />;
  // Listas de pares cortos («21 = veintiuno», «yo → hablo») se ven mejor como tabla de equivalencias
  if (b.type === "list" && b.items.length >= 3 && b.items.every((x) => x.def && !x.sub && x.term.length <= 14 && x.def.length <= 40))
    return <Volteable cara="ud-pares-cara" es={<Pares items={b.items} />} zh={z?.items ? <Pares items={z.items} /> : null} />;
  if (b.type === "list")
    return (
      <div className={`ud-lista ${b.ordenada ? "ordenada" : ""} ${b.items.every((x) => x.def) ? "con-def" : ""} ${b.items.every((x) => !x.def && !x.sub && x.term.length <= 26) ? "cortos" : ""}`}>
        {b.items.map((p, k) => (
          <Volteable key={k} cara="ud-punto" es={<Punto p={p} n={b.ordenada ? k + 1 : null} />} zh={z?.items?.[k] ? <Punto p={z.items[k]} n={b.ordenada ? k + 1 : null} /> : null} />
        ))}
      </div>
    );
  const t = TABLILLA[b.type];
  return (
    <aside className={`ud-tablilla ${b.type}`}>
      <span className="ud-tablilla-sello" translate="no" aria-hidden="true">
        {t.sello}
      </span>
      <Volteable as="b" cara="ud-tablilla-tit" es={b.titulo || t.es} zh={z?.titulo || t.zh} />
      {b.lines.slice(0, 8).map((n, k) => (
        <Volteable key={k} cara="ud-tablilla-linea" es={<Rico t={n} />} zh={z?.lines?.[k]} />
      ))}
    </aside>
  );
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
  const primerP = bloques.findIndex(([b]) => b.type === "p");
  const escucha = terminosAudibles(bloques.map(([b]) => b)).slice(0, 8);
  const visto = vistos.has(idDe(sel));

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

      <article className="ud-ficha" id="ud-ficha" key={`ficha-${idDe(sel)}`} style={{ "--dir": dir }}>
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
        <AvisoVolteo />

        <div className="ud-ficha-cuerpo">
          {bloques.map(([b, z], i) => (
            <Bloque key={i} b={b} z={z} capitular={i === primerP} />
          ))}
        </div>

        {(t.ejemplos || []).length > 0 && (
          <section className="ud-ejemplos" aria-label="Ejemplos">
            <h5 className="ud-ejemplos-tit">
              Ejemplos · <span lang="zh">例句</span>
            </h5>
            {t.ejemplos.slice(0, 6).map((e, i) => (
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
