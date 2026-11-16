// v23 · Cabecera de la unidad con el escenario de su nivel (bambú, linternas, tinta, Ciudad Prohibida),
// medalla con anillo de progreso, y mapa de clases de la unidad (camino con sellos y examen final).
import * as React from "react";
import { PlayIcon, CheckIcon, MapPinIcon, LockIcon } from "lucide-react";
import { ESCENAS } from "../dele/EscenasNivel.jsx";
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

// Puertas de palacio que se abren al entrar en la unidad (una vez por sesión y unidad; nunca con «reducir movimiento»)
function Puertas({ numero }) {
  const clave = `ud-puertas-${numero}`;
  const [ver, setVer] = React.useState(() => {
    try {
      return !window.matchMedia("(prefers-reduced-motion: reduce)").matches && !sessionStorage.getItem(clave);
    } catch {
      return false;
    }
  });
  React.useEffect(() => {
    if (!ver) return;
    try {
      sessionStorage.setItem(clave, "1");
    } catch {}
    const t = setTimeout(() => setVer(false), 2600);
    return () => clearTimeout(t);
  }, [ver, clave]);
  if (!ver) return null;
  return (
    <div className="ud-puertas" aria-hidden="true" onClick={() => setVer(false)}>
      <span className="ud-puerta izq">
        <i className="ud-aldaba" />
      </span>
      <span className="ud-puerta der">
        <i className="ud-aldaba" />
      </span>
      <span className="ud-puertas-sello" translate="no">
        第{numero}
        <br />
        单元
      </span>
    </div>
  );
}

// Farolillo rojo con borla que se balancea
const Farol = ({ lado, retraso = 0 }) => (
  <span className={`ud-farol ${lado}`} style={{ animationDelay: `${retraso}s` }} aria-hidden="true">
    <i className="ud-farol-cuerda" />
    <i className="ud-farol-cuerpo">
      <b translate="no">福</b>
    </i>
    <i className="ud-farol-borla" />
  </span>
);

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
  const Escena = ESCENAS[meta.nivel] || ESCENAS.A1;
  const mundo = MUNDOS[meta.nivel] || MUNDOS.A1;
  const [titulo, sub] = meta.titulo.split(" - ");
  const [tituloZh, subZh] = meta.tituloChino.split(" - ");
  // Paralaje: las capas se desplazan con el ratón a distinta profundidad
  const mover = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    e.currentTarget.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };
  // Las animaciones de la cabecera se pausan cuando no se ve (ahorra batería en móvil)
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const ojo = new IntersectionObserver(([e]) => el.classList.toggle("ud-fuera", !e.isIntersecting));
    ojo.observe(el);
    return () => ojo.disconnect();
  }, []);
  // Ancho interior de la cabecera para el vuelo de las nubes (se animan con transform: sin layout en cada fotograma)
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const medir = () => el.style.setProperty("--ud-ancho", `${el.clientWidth}px`);
    medir();
    if (typeof ResizeObserver === "undefined") return undefined;
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  // El escenario SVG y las partículas no dependen del progreso: no se vuelven a renderizar con cada cambio de la página
  const escena = React.useMemo(() => <Escena />, [Escena]);
  const particulas = React.useMemo(() => <ParticulasNivel nivel={meta.nivel} />, [meta.nivel]);
  return (
    <section ref={ref} className="ud-hero gm-no-adapt" data-nivel={meta.nivel} onPointerMove={mover} onPointerLeave={(e) => (e.currentTarget.style.setProperty("--px", 0), e.currentTarget.style.setProperty("--py", 0))}>
      <Puertas numero={meta.numero} />
      <Farol lado="izq" />
      <Farol lado="der" retraso={-1.3} />
      <div className="ud-hero-escena" aria-hidden="true">
        {escena}
      </div>
      <span className="ud-hero-rayos" aria-hidden="true" />
      <img className="ud-hero-montes" src={TEMA("montes-tinta.webp")} alt="" aria-hidden="true" />
      {[1, 2, 3].map((n) => (
        <img key={n} className={`ud-nube n${n}`} src={TEMA("nube-oro.png")} alt="" aria-hidden="true" />
      ))}
      <img className="ud-dragon-marco izq" src={TEMA("dragon-luz.webp")} alt="" aria-hidden="true" />
      {particulas}
      <span className="ud-hero-jinete" aria-hidden="true">
        <img className="ud-hero-mono" src={MONO(mundo.mono)} alt="" onError={(e) => (e.currentTarget.style.display = "none")} />
        <img className="ud-hero-nubemono" src={TEMA("nube-oro.png")} alt="" />
      </span>
      <span className="ud-hero-suelo" aria-hidden="true" />

      <div className="ud-hero-placa">
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
        <Volteable as="h1" cara="ud-hero-h1" es={titulo} zh={tituloZh} />
        <p className="ud-hero-zh" lang="zh">
          {tituloZh}
          {subZh && <span> · {subZh}</span>}
        </p>
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
              {progreso.completadas}/{progreso.total} {progreso.total === 1 ? "clase" : "clases"} · <span lang="zh">课</span>
            </small>
          </span>
        </div>
      </div>

      <div className="ud-hero-medalla">
        <span className="ud-halo" aria-hidden="true" />
        <img className="ud-dragon" src={TEMA("dragon-luz.webp")} alt="" aria-hidden="true" />
        <Anillo pct={progreso.pct}>
          <span className="ud-moneda">
            <Emoji3D emoji={meta.icono} size={84} float />
          </span>
        </Anillo>
        <b className="ud-hero-pct">{progreso.pct}%</b>
        <span className="ud-hero-sello" translate="no" aria-hidden="true">
          第{meta.numero}
          <br />
          单元
        </span>
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
