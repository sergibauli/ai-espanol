// v31 · Cabecera de la unidad como puerta de palacio que se abre (maqueta del usuario), con placa, anillo de progreso, y mapa de clases de la unidad (camino con sellos y examen final).
import * as React from "react";
import { PlayIcon, CheckIcon, MapPinIcon, LockIcon } from "lucide-react";
import { ParticulasNivel } from "../ui/ParticulasNivel.jsx";
import { Emoji3D } from "../ui/Emoji3D.jsx";
import { Volteable } from "../ui/Volteable.jsx";
import "../../styles/dele-niveles.css";

export const MUNDOS = {
  A1: { es: "Jardín de bambú", zh: "竹林春晓", sello: "竹", mono: "saluda" },
  A2: { es: "Festival de linternas", zh: "元宵灯会", sello: "灯", mono: "feliz" },
  B1: { es: "Montañas de tinta", zh: "水墨山河", sello: "山", mono: "guino" },
  B2: { es: "Ciudad Prohibida", zh: "紫禁之巅", sello: "龙", mono: "poder" },
};
const MONO = (pose) => `${import.meta.env.BASE_URL}mono/${pose}.png`;
const TEMA = (f) => `${import.meta.env.BASE_URL}theme/${f}`;
// Esquinas doradas recortadas de las maquetas
export function Esquinas() {
  return ["si", "sd", "ii", "id"].map((k) => <img key={k} className={`ud-esq ${k}`} src={TEMA("barra-esquina.png")} alt="" aria-hidden="true" />);
}

function Anillo({ pct, children }) {
  const r = 86;
  const c = 2 * Math.PI * r;
  return (
    <span className="ud-anillo">
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <circle cx="100" cy="100" r={r} className="ud-anillo-fondo" />
        <circle cx="100" cy="100" r={r} className="ud-anillo-valor" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} />
      </svg>
      {children}
    </span>
  );
}

export function CabeceraUnidad({ meta, parada, clase, totalClases, progreso, cta }) {
  const mundo = MUNDOS[meta.nivel] || MUNDOS.A1;
  const [titulo, sub] = meta.titulo.split(" - ");
  const [tituloZh, subZh] = meta.tituloChino.split(" - ");
  // La puerta se abre al entrar (con «reducir movimiento» ya está abierta, sin transición)
  const [abierta, setAbierta] = React.useState(false);
  React.useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAbierta(true)));
    return () => cancelAnimationFrame(id);
  }, []);
  // Las animaciones de la cabecera se pausan cuando no se ve (ahorra batería en móvil)
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const ojo = new IntersectionObserver(([e]) => el.classList.toggle("ud-fuera", !e.isIntersecting));
    ojo.observe(el);
    return () => ojo.disconnect();
  }, []);
  return (
    <section ref={ref} className={`ud-hero pz-hero gm-no-adapt ${abierta ? "pz-abierta" : ""}`} data-nivel={meta.nivel} aria-label={`Unidad ${meta.numero}`}>
      {/* v31 · Puerta del palacio (maqueta del usuario): tejado dorado con el cartel de la unidad, columnas de laca,
          muros con medallón y dos hojas tachonadas con aldabas de león que se abren con luz y dejan ver la placa */}
      <span className="pz-cielo" aria-hidden="true" />
      {[1, 2].map((n) => (
        <img key={n} className={`pz-nube n${n}`} src={TEMA("nube-oro.png")} alt="" aria-hidden="true" />
      ))}
      <span className="pz-muro izq" aria-hidden="true">
        <img src={TEMA("medallon-dragon.webp")} alt="" />
      </span>
      <span className="pz-muro der" aria-hidden="true">
        <img src={TEMA("medallon-dragon.webp")} alt="" />
      </span>
      <span className="pz-suelo" aria-hidden="true" />
      <span className="pz-pilar izq" aria-hidden="true" />
      <span className="pz-pilar der" aria-hidden="true" />
      <div className="pz-techo" aria-hidden="true">
        <img src={TEMA("palacio-techo.webp")} alt="" />
      </div>
      <span className="pz-cartel" translate="no">
        第{meta.numero}单元
      </span>

      <div className="pz-portal">
        <span className="pz-luz" aria-hidden="true" />
        <span className="pz-rayos" aria-hidden="true" />
        <ParticulasNivel nivel={meta.nivel} />
        <div className="pz-hojas" aria-hidden="true">
          <span className="pz-hoja izq">
            <img className="pz-aldaba" src={TEMA("aldaba-leon.webp")} alt="" />
          </span>
          <span className="pz-hoja der">
            <img className="pz-aldaba" src={TEMA("aldaba-leon.webp")} alt="" />
          </span>
        </div>

        <div className="ud-hero-placa pz-placa">
          <Esquinas />
          <div className="ud-hero-chips">
            <span className="ud-chip nivel" translate="no">
              {meta.nivel}
            </span>
            <span className="ud-chip">
              {mundo.es} · <span translate="no">{mundo.zh}</span>
            </span>
            {parada && (
              <span className="ud-chip lugar">
                <MapPinIcon size={13} /> {parada.ciudad} · {parada.lugar}
              </span>
            )}
          </div>
          <small className="ud-hero-kicker">
            Unidad {meta.numero}
            {totalClases > 1 && ` · Clase ${clase} de ${totalClases}`}
          </small>
          <div className="pz-titulo">
            <span className="pz-emblema" aria-hidden="true">
              <Anillo pct={progreso.pct}>
                <span className="ud-moneda">
                  <Emoji3D emoji={meta.icono} size={44} />
                </span>
              </Anillo>
            </span>
            <div>
              <Volteable as="h1" cara="ud-hero-h1" es={titulo} zh={tituloZh} />
              <p className="ud-hero-zh" lang="zh">
                {tituloZh}
                {subZh && <span> · {subZh}</span>}
              </p>
            </div>
          </div>
          {sub && <p className="ud-hero-sub">{sub}</p>}
          <div className="ud-hero-acciones">
            <button type="button" className="ud-btn-laca" disabled={!cta.accion} onClick={cta.accion || undefined}>
              <PlayIcon size={18} fill="currentColor" /> {cta.texto}
            </button>
            <span className="ud-hero-prog">
              <span className="ud-hero-barra">
                <i style={{ width: `${progreso.pct}%` }} />
              </span>
              <small>
                {progreso.pct}% · {progreso.completadas}/{progreso.total} {progreso.total === 1 ? "clase" : "clases"} · <span lang="zh">课</span>
              </small>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

const contar = (info) => Object.values(info?.ejercicios || {}).reduce((t, l) => t + l.length, 0);

export function MapaClases({ progreso, actual, onElegir, onExamen, info }) {
  const varias = progreso.total > 1;
  const examenAbierto = progreso.completadas >= progreso.total;
  return (
    <section className="ud-mapa gm-no-adapt" id="u-clases" aria-label="Mapa de la unidad">
      <img className="ud-mapa-montes" src={TEMA("montes-tinta.webp")} alt="" aria-hidden="true" />
      <header className="ud-mapa-cab">
        <h2>
          {varias ? "Mapa de la unidad" : "Tu clase"} · <span lang="zh">单元地图</span>
        </h2>
        <small>
          {progreso.completadas}/{progreso.total} clases hechas · cada clase ≈ 50 min
        </small>
      </header>
      <ol className="ud-ruta" role="tablist" style={{ "--n": progreso.clases.length + 1 }}>
        {progreso.clases.map((c) => {
          const on = c.n === actual;
          return (
            <li key={c.n} className={`ud-parada ${on ? "on" : ""} ${c.completada ? "hecha" : ""}`}>
              <button type="button" role="tab" aria-selected={on} onClick={() => onElegir(c.n)}>
                <span className="ud-parada-sello" translate="no">
                  {c.completada ? <CheckIcon size={26} strokeWidth={3.5} /> : <b>第{c.n}课</b>}
                </span>
                <span className="ud-parada-txt">
                  <small>
                    Clase {c.n} · ~{c.minutos || 50} min
                  </small>
                  <Volteable as="b" es={c.titulo || `Clase ${c.n}`} zh={c.tituloChino} />
                  <span className="ud-parada-datos">
                    {c.vocabulario.length} palabras · {c.dialogos.length} diálogos · {contar(c)} ejercicios
                  </span>
                  <span className="ud-cuentas" aria-label={`${c.hechas} de 5 lecciones`}>
                    {c.lecciones.map((h, i) => (
                      <i key={i} className={h || c.completada ? "on" : ""} />
                    ))}
                  </span>
                </span>
                {on && (
                  <span className="ud-aqui">
                    <img src={MONO("feliz")} alt="" onError={(e) => (e.currentTarget.style.display = "none")} />
                    <em>Estás aquí</em>
                  </span>
                )}
              </button>
            </li>
          );
        })}
        <li className={`ud-parada final ${examenAbierto ? "abierta" : ""}`}>
          <button type="button" onClick={onExamen}>
            <span className="ud-parada-sello" translate="no">
              {examenAbierto ? <b>考</b> : <LockIcon size={20} />}
            </span>
            <span className="ud-parada-txt">
              <small>Final · <span lang="zh">考试</span></small>
              <b>Examen de la unidad</b>
              <span className="ud-parada-datos">{examenAbierto ? "¡Listo para el examen!" : "Se abre al terminar las clases"}</span>
            </span>
          </button>
        </li>
      </ol>
      {info && !info.todo && info.objetivo && (
        <div className="ud-objetivo">
          <span className="ud-objetivo-sello" translate="no">
            目标
          </span>
          <div>
            <small>Objetivo de la clase {info.n}</small>
            <Volteable as="p" es={info.objetivo.es} zh={info.objetivo.zh} />
            <p className="ud-objetivo-zh" lang="zh">
              {info.objetivo.zh}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
