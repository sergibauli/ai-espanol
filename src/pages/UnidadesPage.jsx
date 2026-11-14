import * as React from "react";
import { useNavigate } from "react-router";
import { SearchIcon, PlayIcon, CheckIcon, LeafIcon } from "lucide-react";
import { LightShell } from "../components/layout/LightShell.jsx";
import { Emoji3D } from "../components/ui/Emoji3D.jsx";
import { useGame } from "../lib/gamification.js";
import { progresoUnidad } from "../lib/clases.js";
import CATALOG from "../data/modulos/catalog.json";
import { Ruyi, Esquina } from "../components/layout/DecoV18.jsx";
import "../styles/v18-unidades.css";

// Cada nivel es un tramo del viaje con su mundo (los mismos que los niveles DELE)
const LEVELS = [
  { lv: "A1", es: "Principiantes", zh: "入门", mundo: "Jardín de bambú", mundoZh: "竹林春晓", sello: "竹" },
  { lv: "A2", es: "Elemental", zh: "初级", mundo: "Festival de linternas", mundoZh: "元宵灯会", sello: "灯" },
  { lv: "B1", es: "Intermedio", zh: "中级", mundo: "Montañas de tinta", mundoZh: "水墨山河", sello: "山" },
  { lv: "B2", es: "Avanzado", zh: "中高级", mundo: "Ciudad Prohibida", mundoZh: "紫禁之巅", sello: "龙" },
];

function TarjetaUnidad({ m, hechas, prog, onAbrir, i }) {
  const estado = hechas === 5 ? "completada" : hechas > 0 ? "en-curso" : "nueva";
  return (
    <button type="button" className={`u18-carta is-${estado}`} onClick={onAbrir} style={{ animationDelay: `${Math.min(i, 14) * 30}ms` }}>
      <Ruyi className="u18-carta__remate arriba" />
      <Ruyi className="u18-carta__remate abajo" />
      <span className="u18-carta__num" translate="no">{String(m.numero).padStart(2, "0")}</span>
      <span className="u18-medallon" aria-hidden="true">
        <span className="u18-medallon__int">
          <Emoji3D emoji={m.icono} size={40} />
        </span>
      </span>
      <span className="u18-carta__titulo">{m.titulo.split(" - ")[0]}</span>
      <span className="u18-carta__zh">{m.tituloChino.split(" - ")[0]}</span>
      {prog && (
        <span className="u18-carta__clases">
          {prog.total} clases · {prog.total}课
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
          return (
            <section key={L.lv} id={`un-${L.lv}`} className="u18-tramo" data-nivel={L.lv}>
              <div className="u18-banda">
                <span className="u18-banda__sello" aria-hidden="true" translate="no">
                  <b>{L.lv}</b>
                </span>
                <span className="u18-banda__txt">
                  <small>
                    {L.mundo} · <span translate="no">{L.mundoZh}</span>
                  </small>
                  <b>
                    {L.es} · <span lang="zh">{L.zh}</span>
                  </b>
                </span>
                <span className="u18-banda__prog" role="img" aria-label={`${L.hechas} de ${L.total} unidades`}>
                  <span className="u18-banda__barra">
                    <i style={{ width: `${(L.hechas / L.total) * 100}%` }} />
                  </span>
                  <em>
                    {L.hechas}/{L.total}
                  </em>
                </span>
              </div>
              <div className="u18-panel">
                <Esquina className="e-si" />
                <Esquina className="e-sd" />
                <Esquina className="e-ii" />
                <Esquina className="e-id" />
                <div className="u18-rejilla">
                  {mods.map((m, i) => (
                    <TarjetaUnidad key={m.numero} m={m} i={i} hechas={hechasDe(m)} prog={progresoDe(m)} onAbrir={() => navigate(`/modulos/modulo-${m.numero}`)} />
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
