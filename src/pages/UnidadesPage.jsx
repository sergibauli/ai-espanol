import * as React from "react";
import { useNavigate } from "react-router";
import { SearchIcon, PlayIcon, XIcon, ChevronRightIcon } from "lucide-react";
import { LightShell } from "../components/layout/LightShell.jsx";
import { Emoji3D } from "../components/ui/Emoji3D.jsx";
import { ParticulasNivel } from "../components/ui/ParticulasNivel.jsx";
import { ESCENAS } from "../components/dele/EscenasNivel.jsx";
import { MotivoUnidad } from "../components/unidades/MotivoUnidad.jsx";
import { useGame } from "../lib/gamification.js";
import { progresoUnidad } from "../lib/clases.js";
import { temaDeUnidad } from "../lib/temasUnidad.js";
import CATALOG from "../data/modulos/catalog.json";
import "../styles/v19-unidades.css";

// Cada nivel es un tramo del viaje con su mundo (los mismos que los niveles DELE)
const LEVELS = [
  { lv: "A1", es: "Principiantes", zh: "入门", mundo: "Jardín de bambú", mundoZh: "竹林春晓", sello: "竹" },
  { lv: "A2", es: "Elemental", zh: "初级", mundo: "Festival de linternas", mundoZh: "元宵灯会", sello: "灯" },
  { lv: "B1", es: "Intermedio", zh: "中级", mundo: "Montañas de tinta", mundoZh: "水墨山河", sello: "山" },
  { lv: "B2", es: "Avanzado", zh: "中高级", mundo: "Ciudad Prohibida", mundoZh: "紫禁之巅", sello: "龙" },
];
const CLAVE_NIVEL = "ai-espanol:unidades-nivel";
const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const sinMovimiento = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Anillo de progreso (SVG) para el contador, las pestañas y el medallón en curso
function Anillo({ pct, r = 20, grosor = 4, className }) {
  const c = 2 * Math.PI * r;
  const lado = (r + grosor) * 2;
  return (
    <svg className={className} viewBox={`0 0 ${lado} ${lado}`} aria-hidden="true">
      <circle cx={lado / 2} cy={lado / 2} r={r} fill="none" strokeWidth={grosor} className="fondo" />
      <circle cx={lado / 2} cy={lado / 2} r={r} fill="none" strokeWidth={grosor} strokeLinecap="round" className="valor"
        strokeDasharray={c} strokeDashoffset={c * (1 - Math.min(1, Math.max(0, pct)))} transform={`rotate(-90 ${lado / 2} ${lado / 2})`} />
    </svg>
  );
}

function TarjetaUnidad({ m, prog, siguiente, onAbrir, i }) {
  const tema = temaDeUnidad(m);
  const estado = prog.completa ? "completada" : prog.pct > 0 ? "en-curso" : "nueva";
  const titulo = m.titulo.split(" - ")[0];
  const zh = m.tituloChino.split(" - ")[0];
  return (
    <button type="button" className={`u19-carta is-${estado} ${siguiente ? "is-siguiente" : ""}`} data-tema={tema.clave} onClick={onAbrir}
      style={{ "--t1": tema.t1, "--t2": tema.t2, "--i": Math.min(i, 16) }}
      aria-label={`Unidad ${m.numero}: ${titulo} · ${zh} — ${estado === "completada" ? "completada · 已完成" : estado === "en-curso" ? `${prog.pct}%` : "nueva · 新"}`}>
      <span className="u19-carta__cuerpo">
        <span className="u19-ventana" aria-hidden="true">
          <span className="u19-ventana__glifo" translate="no">{tema.glifo}</span>
          <MotivoUnidad motivo={tema.motivo} />
          <span className="u19-medallon">
            <span className="u19-medallon__halo" />
            {estado === "en-curso" && <Anillo pct={prog.pct / 100} r={44} grosor={5} className="u19-medallon__anillo" />}
            <span className="u19-medallon__disco">
              <Emoji3D emoji={m.icono} size={46} />
            </span>
          </span>
          <span className="u19-num" translate="no">{String(m.numero).padStart(2, "0")}</span>
          {estado === "nueva" && (
            <span className="u19-cinta">
              Nueva <span lang="zh">新</span>
            </span>
          )}
          {estado === "completada" && (
            <span className="u19-sello" translate="no">
              <i>完</i>
              <i>成</i>
            </span>
          )}
        </span>
        <span className="u19-carta__texto">
          <span className="u19-carta__titulo">{titulo}</span>
          <span className="u19-carta__zh" lang="zh">{zh}</span>
          <span className="u19-pips" aria-hidden="true">
            {prog.clases.map((c) => (
              <i key={c.n} className={c.completada ? "ok" : c.fraccion > 0 ? "medio" : ""} />
            ))}
            <small>
              {prog.total} clases · {prog.total}课
            </small>
          </span>
          <span className="u19-carta__pie">
            {estado === "completada" ? (
              <span className="u19-accion ok">Repasar · 复习</span>
            ) : estado === "en-curso" ? (
              <span className="u19-accion curso">
                <PlayIcon size={12} strokeWidth={3} fill="currentColor" /> Continuar · 继续 <em>{prog.pct}%</em>
              </span>
            ) : (
              <span className="u19-accion nueva">
                Empezar · <span lang="zh">开始</span> <ChevronRightIcon size={15} strokeWidth={3} />
              </span>
            )}
          </span>
        </span>
        <span className="u19-brillo" aria-hidden="true" />
        <span className="u19-chispas" aria-hidden="true">
          <i /><i /><i /><i /><i /><i />
        </span>
      </span>
    </button>
  );
}

// Inclinación 3D y brillo que sigue al puntero (un solo manejador para toda la rejilla, escrito en variables CSS)
function useInclinacion() {
  const actual = React.useRef(null);
  const marco = React.useRef(0);
  const soltar = (carta) => {
    if (!carta) return;
    carta.style.removeProperty("--rx");
    carta.style.removeProperty("--ry");
    carta.classList.remove("is-inclinada");
  };
  const onPointerMove = (e) => {
    if (e.pointerType !== "mouse" || sinMovimiento()) return;
    const carta = e.target.closest?.(".u19-carta");
    if (carta !== actual.current) {
      soltar(actual.current);
      actual.current = carta;
    }
    if (!carta) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(marco.current);
    marco.current = requestAnimationFrame(() => {
      const r = carta.getBoundingClientRect();
      const x = (clientX - r.left) / r.width;
      const y = (clientY - r.top) / r.height;
      carta.classList.add("is-inclinada");
      carta.style.setProperty("--rx", `${((0.5 - y) * 14).toFixed(2)}deg`);
      carta.style.setProperty("--ry", `${((x - 0.5) * 16).toFixed(2)}deg`);
      carta.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
      carta.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
    });
  };
  const onPointerLeave = () => {
    cancelAnimationFrame(marco.current);
    soltar(actual.current);
    actual.current = null;
  };
  return { onPointerMove, onPointerLeave };
}

export default function UnidadesPage() {
  const game = useGame();
  const navigate = useNavigate();
  const inclinacion = useInclinacion();
  const [busqueda, setBusqueda] = React.useState("");
  const [nivel, setNivel] = React.useState(() => {
    try {
      const guardado = sessionStorage.getItem(CLAVE_NIVEL);
      if (LEVELS.some((L) => L.lv === guardado)) return guardado;
    } catch {}
    return "A1";
  });
  // Desde dónde se abre el nuevo mundo (centro de la pestaña pulsada, en % del ancho)
  const [origen, setOrigen] = React.useState(50);
  const elegirNivel = (lv, e) => {
    const caja = e?.currentTarget?.getBoundingClientRect?.();
    if (caja) setOrigen(Math.round(((caja.left + caja.width / 2) / window.innerWidth) * 100));
    setNivel(lv);
    setBusqueda("");
    try {
      sessionStorage.setItem(CLAVE_NIVEL, lv);
    } catch {}
  };

  const progresos = React.useMemo(() => {
    const mapa = new Map();
    for (const m of CATALOG) mapa.set(m.numero, progresoUnidad(m.numero, game.lessons));
    return mapa;
  }, [game.lessons]);
  const completadas = CATALOG.filter((m) => progresos.get(m.numero).completa).length;
  const resumen = LEVELS.map((L) => {
    const todas = CATALOG.filter((m) => m.nivel === L.lv);
    const hechas = todas.filter((m) => progresos.get(m.numero).completa).length;
    const siguiente = todas.find((m) => !progresos.get(m.numero).completa) || null;
    return { ...L, todas, total: todas.length, hechas, siguiente };
  });
  const activo = resumen.find((L) => L.lv === nivel);
  const Escena = ESCENAS[nivel];
  const resultados = busqueda
    ? resumen.map((L) => ({ ...L, mods: L.todas.filter((m) => norm(m.titulo + m.tituloChino).includes(norm(busqueda))) })).filter((L) => L.mods.length)
    : [{ ...activo, mods: activo.todas }];

  const rejilla = (L) => (
    <div className="u19-rejilla" {...inclinacion}>
      {L.mods.map((m, i) => (
        <TarjetaUnidad key={m.numero} m={m} i={i} prog={progresos.get(m.numero)} siguiente={!busqueda && L.siguiente?.numero === m.numero} onAbrir={() => navigate(`/modulos/modulo-${m.numero}`)} />
      ))}
    </div>
  );

  return (
    <LightShell>
      <div className="u19" data-nivel={nivel}>
        <header className="u19-cab">
          <div className="u19-titulo">
            <span className="u19-titulo__sello" aria-hidden="true" translate="no"><i>单</i><i>元</i></span>
            <h1>
              Unidades <span lang="zh">单元</span>
            </h1>
          </div>
          <label className="u19-buscar">
            <SearchIcon size={17} aria-hidden="true" />
            <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar unidad · 搜索单元" aria-label="Buscar unidad · 搜索单元" />
            {busqueda && (
              <button type="button" className="u19-buscar__borrar" onClick={() => setBusqueda("")} aria-label="Borrar · 清除">
                <XIcon size={15} />
              </button>
            )}
          </label>
          <p className="u19-contador" aria-label={`${completadas} de ${CATALOG.length} unidades completadas`}>
            <Anillo pct={completadas / CATALOG.length} r={21} grosor={4.5} className="u19-contador__anillo" />
            <span>
              <b>
                {completadas}
                <i>/{CATALOG.length}</i>
              </b>
              <small>
                Completadas · <span lang="zh">已完成</span>
              </small>
            </span>
          </p>
          <nav className="u19-niveles" aria-label="Nivel · 级别">
            {resumen.map((L) => {
              const on = !busqueda && L.lv === nivel;
              return (
                <button key={L.lv} type="button" className={`u19-nivel ${on ? "on" : ""}`} data-nivel={L.lv} aria-pressed={on} onClick={(e) => elegirNivel(L.lv, e)}>
                  <span className="u19-nivel__moneda">
                    <Anillo pct={L.hechas / L.total} r={19} grosor={3} className="u19-nivel__anillo" />
                    <i translate="no" aria-hidden="true">{L.sello}</i>
                  </span>
                  <span className="u19-nivel__txt">
                    <b translate="no">{L.lv}</b>
                    <small>
                      {L.es} · <span lang="zh">{L.zh}</span>
                    </small>
                  </span>
                  <em>
                    {L.hechas}/{L.total}
                  </em>
                </button>
              );
            })}
          </nav>
        </header>

        {!busqueda && (
          <section key={nivel} className="u19-mundo" data-nivel={nivel} style={{ "--ox": `${origen}%` }} aria-label={`${activo.mundo} · ${activo.mundoZh}`}>
            <div className="u19-mundo__escena">
              <Escena />
              <ParticulasNivel nivel={nivel} />
            </div>
            <span className="u19-mundo__glifo" aria-hidden="true" translate="no">{activo.sello}</span>
            <span className="u19-mundo__rayos" aria-hidden="true" />
            <div className="u19-mundo__txt">
              <span className="u19-mundo__sello" aria-hidden="true" translate="no">
                {activo.sello}
              </span>
              <span>
                <small>
                  {activo.mundo} · <span translate="no">{activo.mundoZh}</span>
                </small>
                <b>
                  {activo.lv} · {activo.es} <span lang="zh">{activo.zh}</span>
                </b>
                <span className="u19-mundo__prog" role="img" aria-label={`${activo.hechas} de ${activo.total} unidades`}>
                  <span className="u19-mundo__barra">
                    <i style={{ width: `${(activo.hechas / activo.total) * 100}%` }} />
                  </span>
                  <em>
                    {activo.hechas}/{activo.total}
                  </em>
                </span>
              </span>
            </div>
            {activo.siguiente && (
              <button type="button" className="u19-mundo__seguir" onClick={() => navigate(`/modulos/modulo-${activo.siguiente.numero}`)}>
                <span>
                  <small>{progresos.get(activo.siguiente.numero).pct > 0 ? "Continuar · 继续" : activo.hechas ? "Siguiente · 下一个" : "Empezar · 开始"}</small>
                  <b>
                    {String(activo.siguiente.numero).padStart(2, "0")} · {activo.siguiente.titulo.split(" - ")[0]}
                  </b>
                </span>
                <PlayIcon size={16} strokeWidth={3} fill="currentColor" />
              </button>
            )}
          </section>
        )}

        {resultados.map((L) => (
          <section key={`${L.lv}-${busqueda ? "b" : nivel}`} className="u19-tramo" data-nivel={L.lv}>
            {busqueda && (
              <h2 className="u19-tramo__cab">
                <i translate="no">{L.sello}</i> {L.lv} · {L.es} <span lang="zh">{L.zh}</span>
                <em>{L.mods.length}</em>
              </h2>
            )}
            {rejilla(L)}
          </section>
        ))}
        {!resultados.length && (
          <p className="u19-vacio">
            No hay unidades con «{busqueda}» · <span lang="zh">没有找到相关单元</span>
          </p>
        )}
      </div>
    </LightShell>
  );
}
