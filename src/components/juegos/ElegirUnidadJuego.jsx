// Pantalla común para elegir la unidad de un juego (nivel → unidad; siempre la unidad completa).
// Cada nivel es su mundo (jardín de bambú, festival de linternas, montañas de tinta, Ciudad Prohibida)
// con el mismo escenario SVG y partículas que Unidades; las unidades son tablillas lacadas con sello.
import * as React from "react";
import { Link } from "react-router";
import { ArrowLeftIcon, SearchIcon, XIcon, PlayIcon, LayersIcon, SparklesIcon } from "lucide-react";
import CATALOGO from "../../data/modulos/catalog.json";
import { ESCENAS } from "../dele/EscenasNivel.jsx";
import { ParticulasNivel } from "../ui/ParticulasNivel.jsx";
import { progresoUnidad } from "../../lib/clases.js";
import { getGame } from "../../lib/gamification.js";
import "../../styles/juegos-elegir-unidad.css";

const MUNDOS = [
  { lv: "A1", zh: "入门", mundo: "Jardín de bambú", mundoZh: "竹林春晓", sello: "竹" },
  { lv: "A2", zh: "初级", mundo: "Festival de linternas", mundoZh: "元宵灯会", sello: "灯" },
  { lv: "B1", zh: "中级", mundo: "Montañas de tinta", mundoZh: "水墨山河", sello: "山" },
  { lv: "B2", zh: "中高级", mundo: "Ciudad Prohibida", mundoZh: "紫禁之巅", sello: "龙" },
];

const sinAcentos = (t) =>
  String(t || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

const reducido = () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Anillo de progreso alrededor del sello de la unidad */
function SelloUnidad({ numero, pct }) {
  const r = 27;
  const c = 2 * Math.PI * r;
  return (
    <span className="jeu-sello" aria-hidden="true">
      <svg viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={r} className="jeu-sello__aro" />
        {pct > 0 && <circle cx="32" cy="32" r={r} className="jeu-sello__valor" strokeDasharray={`${(c * pct) / 100} ${c}`} />}
      </svg>
      <b translate="no">{numero}</b>
    </span>
  );
}

/**
 * - `juego`: { titulo, tituloZh, sello (texto o nodo), desc, descZh }
 * - `onElegir(numero)`: unidad elegida
 * - `onTodas()` (opcional): botón «Todas las unidades»
 * - `unidadActual` (opcional): número de la unidad que llega en la ruta (acceso rápido)
 * - `error` (opcional): aviso bilingüe ya montado
 * - `volver`: ruta del botón volver (por defecto el hub de juegos)
 */
export function ElegirUnidadJuego({ juego, onElegir, onTodas, unidadActual = null, error = "", volver = "/juegos" }) {
  const actual = unidadActual ? CATALOGO.find((u) => u.numero === Number(unidadActual)) : null;
  const [nivel, setNivel] = React.useState(actual?.nivel || "A1");
  const [busqueda, setBusqueda] = React.useState("");
  const mundo = MUNDOS.find((m) => m.lv === nivel) || MUNDOS[0];
  const Escena = ESCENAS[nivel];
  const animar = !reducido();

  const cambiarNivel = (lv) => {
    setNivel(lv);
    setBusqueda("");
  };

  const progreso = React.useMemo(() => {
    const lecciones = getGame()?.lessons || {};
    const mapa = {};
    for (const u of CATALOGO) {
      try {
        mapa[u.numero] = progresoUnidad(u.numero, lecciones).pct || 0;
      } catch {
        mapa[u.numero] = 0;
      }
    }
    return mapa;
  }, []);

  const cuenta = React.useMemo(() => Object.fromEntries(MUNDOS.map((m) => [m.lv, CATALOGO.filter((u) => u.nivel === m.lv).length])), []);

  const texto = sinAcentos(busqueda.trim());
  const unidades = texto
    ? CATALOGO.filter((u) => sinAcentos(`${u.numero} ${u.titulo} ${u.tituloChino}`).includes(texto))
    : CATALOGO.filter((u) => u.nivel === nivel);

  return (
    <div className="jeu gm-no-adapt" data-nivel={nivel}>
      <section className="jeu-hero" key={nivel}>
        <div className="jeu-hero__escena">
          <Escena />
          <ParticulasNivel nivel={nivel} />
        </div>
        <span className="jeu-hero__glifo" aria-hidden="true" translate="no">
          {mundo.sello}
        </span>
        <Link to={volver} className="jeu-volver" aria-label="Juegos · 游戏: volver · 返回">
          <ArrowLeftIcon size={18} aria-hidden="true" />
          <span>Juegos · 游戏</span>
        </Link>
        <div className="jeu-hero__txt">
          <span className="jeu-emblema" aria-hidden="true" translate="no">
            <span className="jeu-emblema__rayos" />
            <span className={`jeu-emblema__sello${typeof juego.sello === "string" && juego.sello.length > 1 ? " jeu-emblema__sello--largo" : ""}`}>{juego.sello}</span>
          </span>
          <div>
            <small className="jeu-hero__mundo">
              {nivel} · {mundo.mundo} · <span translate="no">{mundo.mundoZh}</span>
            </small>
            <h1>{juego.titulo}</h1>
            <p className="jeu-hero__zh" translate="no">
              {juego.tituloZh}
            </p>
            {(juego.desc || juego.descZh) && (
              <p className="jeu-hero__desc">
                {juego.desc} {juego.descZh && <span>{juego.descZh}</span>}
              </p>
            )}
          </div>
        </div>
        <img src="./mono/saluda.webp" alt="" className="jeu-hero__mono" aria-hidden="true" />
      </section>

      <nav className="jeu-puertas" role="tablist" aria-label="Nivel · 级别">
        {MUNDOS.map((m) => {
          const EscenaMini = ESCENAS[m.lv];
          const activo = m.lv === nivel && !texto;
          return (
            <button key={m.lv} type="button" role="tab" aria-selected={activo} data-nivel={m.lv} className={`jeu-puerta${activo ? " is-on" : ""}`} onClick={() => cambiarNivel(m.lv)}>
              <span className="jeu-puerta__escena" aria-hidden="true">
                <EscenaMini />
              </span>
              <span className="jeu-puerta__moneda" aria-hidden="true" translate="no">
                {m.sello}
              </span>
              <span className="jeu-puerta__txt">
                <b>{m.lv}</b>
                <small>
                  {m.zh} · {cuenta[m.lv]}
                </small>
                <i>{m.mundo}</i>
              </span>
            </button>
          );
        })}
      </nav>

      {error && (
        <p className="jeu-error" role="alert">
          {error}
        </p>
      )}

      <div className="jeu-barra">
        {actual && (
          <button type="button" className="jeu-atajo jeu-atajo--actual" onClick={() => onElegir(actual.numero)}>
            <SparklesIcon size={18} aria-hidden="true" />
            <span>
              <small>Tu unidad · 你的单元</small>
              <b>
                {actual.numero} · {actual.titulo}
              </b>
            </span>
            <PlayIcon size={18} fill="currentColor" aria-hidden="true" />
          </button>
        )}
        {onTodas && (
          <button type="button" className="jeu-atajo" onClick={onTodas}>
            <LayersIcon size={18} aria-hidden="true" />
            <span>
              <small>Mezcla todo · 混合全部</small>
              <b>Todas las unidades</b>
            </span>
          </button>
        )}
        <label className="jeu-buscar">
          <SearchIcon size={18} aria-hidden="true" />
          <input type="search" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar tema o número · 搜索主题" aria-label="Buscar tema · 搜索主题" />
          {busqueda && (
            <button type="button" onClick={() => setBusqueda("")} aria-label="Borrar búsqueda · 清除">
              <XIcon size={16} />
            </button>
          )}
        </label>
      </div>

      <p className="jeu-paso">
        <span aria-hidden="true">◆</span> {texto ? `Resultados · 搜索结果 (${unidades.length})` : `Elige una unidad · 选择单元`} <span aria-hidden="true">◆</span>
      </p>

      <ul className="jeu-grid" key={`${nivel}|${texto}`}>
        {unidades.map((u, i) => (
          <li key={u.numero} className={animar ? "jeu-entra" : ""} style={{ "--i": Math.min(i, 16) }} data-nivel={u.nivel}>
            <button type="button" className="jeu-tablilla" onClick={() => onElegir(u.numero)}>
              <SelloUnidad numero={u.numero} pct={progreso[u.numero] || 0} />
              <span className="jeu-tablilla__txt">
                <b>{u.titulo}</b>
                <i translate="no">{u.tituloChino}</i>
                <span className="jeu-tablilla__meta">
                  <em>{u.nivel}</em> {u.vocabularioCount || 0} palabras · 词{progreso[u.numero] ? ` · ${progreso[u.numero]}%` : ""}
                </span>
              </span>
              <span className="jeu-tablilla__jugar" aria-hidden="true">
                <PlayIcon size={18} fill="currentColor" />
              </span>
            </button>
          </li>
        ))}
      </ul>
      {unidades.length === 0 && <p className="jeu-vacio">No hay temas con «{busqueda}» · 没有找到相关主题</p>}
    </div>
  );
}
