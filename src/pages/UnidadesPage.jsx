import * as React from "react";
import { useNavigate } from "react-router";
import { SearchIcon, PlayIcon, CheckIcon, LeafIcon } from "lucide-react";
import { LightShell } from "../components/layout/LightShell.jsx";
import { Emoji3D } from "../components/ui/Emoji3D.jsx";
import { useGame } from "../lib/gamification.js";
import { progresoUnidad } from "../lib/clases.js";
import CATALOG from "../data/modulos/catalog.json";
import { Ruyi, Esquina } from "../components/layout/DecoV18.jsx";
import { ESCENAS } from "../components/dele/EscenasNivel.jsx";
import "../styles/v18-unidades.css";
import "../styles/dele-niveles.css";
import "../styles/v23-unidades.css";

// Cada nivel es un tramo del viaje con su mundo (los mismos que los niveles DELE)
const LEVELS = [
  { lv: "A1", es: "Principiantes", zh: "入门", mundo: "Jardín de bambú", mundoZh: "竹林春晓", sello: "竹", mono: "saluda" },
  { lv: "A2", es: "Elemental", zh: "初级", mundo: "Festival de linternas", mundoZh: "元宵灯会", sello: "灯", mono: "feliz" },
  { lv: "B1", es: "Intermedio", zh: "中级", mundo: "Montañas de tinta", mundoZh: "水墨山河", sello: "山", mono: "guino" },
  { lv: "B2", es: "Avanzado", zh: "中高级", mundo: "Ciudad Prohibida", mundoZh: "紫禁之巅", sello: "龙", mono: "poder" },
];
const MONO = (pose) => `${import.meta.env.BASE_URL}mono/${pose}.png`;

function TarjetaUnidad({ m, hechas, prog, onAbrir, i, siguiente }) {
  const estado = hechas === 5 ? "completada" : hechas > 0 ? "en-curso" : "nueva";
  const pct = prog?.pct ?? 0;
  return (
    <button type="button" className={`u18-carta u23-carta is-${estado} ${siguiente ? "is-siguiente" : ""}`} onClick={onAbrir} style={{ animationDelay: `${Math.min(i, 14) * 30}ms` }}>
      <Ruyi className="u18-carta__remate arriba" />
      <Ruyi className="u18-carta__remate abajo" />
      <span className="u18-carta__num" translate="no">{String(m.numero).padStart(2, "0")}</span>
      {estado === "completada" && (
        <span className="u23-sello-hecho" translate="no" aria-hidden="true">
          完成
        </span>
      )}
      {siguiente && <span className="u23-cinta-sig">Siguiente · <span lang="zh">下一个</span></span>}
      <span className="u18-medallon u23-medallon" aria-hidden="true" style={{ "--pct": pct }}>
        <span className="u18-medallon__int">
          <Emoji3D emoji={m.icono} size={40} />
        </span>
      </span>
      <span className="u18-carta__titulo">{m.titulo.split(" - ")[0]}</span>
      <span className="u18-carta__zh">{m.tituloChino.split(" - ")[0]}</span>
      {prog && (
        <span className="u23-clases" aria-label={`${prog.completadas} de ${prog.total} clases`}>
          {prog.clases.map((c) => (
            <i key={c.n} className={c.completada ? "on" : c.hechas ? "medio" : ""} />
          ))}
          <small>
            {prog.total} clases · {prog.total}课
          </small>
        </span>
      )}
      <span className="u18-carta__pie">
        {estado === "completada" ? (
          <span className="u18-accion ok">
            <CheckIcon size={14} strokeWidth={3} /> Completada · 已完成
          </span>
        ) : estado === "en-curso" ? (
          <span className="u18-accion curso">
            <PlayIcon size={12} strokeWidth={3} fill="currentColor" /> {prog ? `${prog.completadas}/${prog.total} clases` : `${hechas}/5`}
          </span>
        ) : (
          <span className="u18-accion nueva">
            <LeafIcon size={15} strokeWidth={2.6} /> Empezar <span lang="zh">开始</span>
          </span>
        )}
      </span>
    </button>
  );
}

const CLAVE_NIVEL = "ai-espanol:unidades-nivel";

export default function UnidadesPage() {
  const game = useGame();
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = React.useState("");
  const [nivel, setNivel] = React.useState(() => {
    try {
      const guardado = sessionStorage.getItem(CLAVE_NIVEL);
      if (LEVELS.some((L) => L.lv === guardado)) return guardado;
    } catch {}
    return "A1";
  });
  const elegirNivel = (lv) => {
    setNivel(lv);
    setBusqueda("");
    try {
      sessionStorage.setItem(CLAVE_NIVEL, lv);
    } catch {}
  };
  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  // Progreso por clases (0–5 para la tarjeta): 5 = todas las clases de la unidad hechas
  const progresoDe = (m) => progresoUnidad(m.numero, game.lessons);
  const hechasDe = (m) => {
    const p = progresoDe(m);
    return p.completa ? 5 : p.pct > 0 ? Math.min(4, Math.max(1, Math.round(p.pct / 20))) : 0;
  };
  const completadas = CATALOG.filter((m) => hechasDe(m) === 5).length;
  const resumen = LEVELS.map((L) => {
    const todas = CATALOG.filter((m) => m.nivel === L.lv);
    return { ...L, total: todas.length, hechas: todas.filter((m) => hechasDe(m) === 5).length };
  });
  // Con búsqueda se muestran todos los niveles que coinciden; sin ella, solo el nivel elegido
  const visibles = busqueda ? resumen : resumen.filter((L) => L.lv === nivel);
  let hayResultados = false;

  return (
    <LightShell>
      <div className="u18">
        <header className="u18-cab">
          <p className="u18-contador" aria-label={`${completadas} de ${CATALOG.length} unidades completadas`}>
            <b>{completadas}</b>
            <i>/</i>
            <b>{CATALOG.length}</b>
            <small>
              Unidades completadas · <span lang="zh">已完成</span>
            </small>
          </p>
          <div className="u18-placa">
            <span className="u18-placa__a">
              <span className="u18-placa__b">
                <h1>
                  Unidades <span lang="zh">单元</span>
                </h1>
              </span>
            </span>
            <i className="u18-placa__gema izq" aria-hidden="true" />
            <i className="u18-placa__gema der" aria-hidden="true" />
          </div>
          <label className="u18-buscar">
            <SearchIcon size={18} aria-hidden="true" />
            <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar unidad · 搜索单元" aria-label="Buscar unidad · 搜索单元" />
          </label>
          <nav className="u18-niveles" aria-label="Nivel · 级别">
            {resumen.map((L) => {
              const activo = !busqueda && L.lv === nivel;
              return (
                <button key={L.lv} type="button" className={`u18-nivel ${activo ? "on" : ""}`} data-nivel={L.lv} aria-pressed={activo} onClick={() => elegirNivel(L.lv)}>
                  <span className="u18-nivel__in">
                    <i translate="no" aria-hidden="true">{L.sello}</i>
                    <b translate="no">{L.lv}</b>
                    <small>
                      {L.es} · <span lang="zh">{L.zh}</span>
                    </small>
                    <em>
                      {L.hechas}/{L.total}
                    </em>
                  </span>
                </button>
              );
            })}
          </nav>
        </header>

        {visibles.map((L) => {
          const mods = CATALOG.filter((m) => m.nivel === L.lv && (!busqueda || norm(m.titulo + m.tituloChino).includes(norm(busqueda))));
          if (!mods.length) return null;
          hayResultados = true;
          // Siguiente unidad del nivel: la primera empezada sin terminar o, si no hay, la primera nueva
          const delNivel = CATALOG.filter((m) => m.nivel === L.lv);
          const sig = delNivel.find((m) => hechasDe(m) > 0 && hechasDe(m) < 5) || delNivel.find((m) => hechasDe(m) === 0) || null;
          return (
            <section key={L.lv} id={`un-${L.lv}`} className="u18-tramo" data-nivel={L.lv}>
              <div className="u23-mundo gm-no-adapt" data-nivel={L.lv}>
                <span className="u23-mundo__escena" aria-hidden="true">
                  {React.createElement(ESCENAS[L.lv])}
                </span>
                <img className="u23-mundo__mono" src={MONO(L.mono)} alt="" onError={(e) => (e.currentTarget.style.display = "none")} />
                <span className="u18-banda__sello u23-mundo__sello" aria-hidden="true" translate="no">
                  <b>{L.lv}</b>
                </span>
                <span className="u23-mundo__txt">
                  <small>
                    {L.mundo} · <span translate="no">{L.mundoZh}</span>
                  </small>
                  <b>
                    {L.es} · <span lang="zh">{L.zh}</span>
                  </b>
                  <span className="u23-mundo__prog" role="img" aria-label={`${L.hechas} de ${L.total} unidades`}>
                    <span className="u23-mundo__barra">
                      <i style={{ width: `${(L.hechas / L.total) * 100}%` }} />
                    </span>
                    <em>
                      {L.hechas}/{L.total} <span lang="zh">单元</span>
                    </em>
                  </span>
                </span>
                {!busqueda && sig && (
                  <button type="button" className="u23-continua" onClick={() => navigate(`/modulos/modulo-${sig.numero}`)}>
                    <span className="u23-continua__pic">
                      <Emoji3D emoji={sig.icono} size={44} />
                    </span>
                    <span className="u23-continua__txt">
                      <small>
                        {hechasDe(sig) > 0 ? "Continúa · 继续" : "Empieza · 开始"} — Unidad {sig.numero}
                      </small>
                      <b>{sig.titulo.split(" - ")[0]}</b>
                      <span lang="zh">{sig.tituloChino.split(" - ")[0]}</span>
                    </span>
                    <span className="u23-continua__play" aria-hidden="true">
                      <PlayIcon size={20} fill="currentColor" />
                    </span>
                  </button>
                )}
              </div>
              <div className="u18-panel">
                <Esquina className="e-si" />
                <Esquina className="e-sd" />
                <Esquina className="e-ii" />
                <Esquina className="e-id" />
                <div className="u18-rejilla">
                  {mods.map((m, i) => (
                    <TarjetaUnidad key={m.numero} m={m} i={i} hechas={hechasDe(m)} prog={progresoDe(m)} siguiente={!busqueda && sig?.numero === m.numero} onAbrir={() => navigate(`/modulos/modulo-${m.numero}`)} />
                  ))}
                </div>
              </div>
            </section>
          );
        })}
        {!hayResultados && (
          <p className="u18-vacio">
            No hay unidades con «{busqueda}» · <span lang="zh">没有找到相关单元</span>
          </p>
        )}
      </div>
    </LightShell>
  );
}
