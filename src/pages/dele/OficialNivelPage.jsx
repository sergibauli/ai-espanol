import * as React from "react";
import { useParams, Link } from "react-router";
import { ArrowLeftIcon, SearchIcon, ShuffleIcon, ArrowRightIcon, BookOpenIcon, HeadphonesIcon, PenLineIcon, MicIcon, SparklesIcon, TrophyIcon, TargetIcon, CheckCircle2Icon } from "lucide-react";
import { LightShell } from "../../components/layout/LightShell.jsx";
import { useLanguage } from "../../lib/i18n.jsx";
import { i as nivelValido, l as cargarModelos } from "../../lib/oficial-loader.js";
import { ParticulasNivel } from "../../components/ui/ParticulasNivel.jsx";
import { ESCENAS } from "../../components/dele/EscenasNivel.jsx";

// Cada nivel DELE es un mundo distinto del viaje: jardín de bambú (A1), festival de linternas (A2),
// montañas de tinta (B1) y Ciudad Prohibida (B2). Mismo contenido, escenario, tarjetas y animaciones propias.
const NIVELES = {
  A1: {
    nombre: "Acceso", zh: "入门", mundo: "Jardín de bambú", mundoZh: "竹林春晓", sello: "竹",
    lema: "Tus primeros pasos: frases sencillas de la vida diaria.", lemaZh: "第一步：日常生活中的简单句子。",
    partes: [["Lectura", "45′"], ["Audición", "25′"], ["Escritura", "25′"], ["Oral", "15′"]],
  },
  A2: {
    nombre: "Plataforma", zh: "基础", mundo: "Festival de linternas", mundoZh: "元宵灯会", sello: "灯",
    lema: "Te desenvuelves en situaciones cotidianas y conocidas.", lemaZh: "能应对熟悉的日常情境。",
    partes: [["Lectura", "60′"], ["Audición", "35′"], ["Escritura", "45′"], ["Oral", "15′"]],
  },
  B1: {
    nombre: "Umbral", zh: "进阶", mundo: "Montañas de tinta", mundoZh: "水墨山河", sello: "山",
    lema: "Comprendes lo esencial y das tu opinión con soltura.", lemaZh: "理解要点，流畅表达观点。",
    partes: [["Lectura", "70′"], ["Audición", "40′"], ["Escritura", "60′"], ["Oral", "15′"]],
  },
  B2: {
    nombre: "Avanzado", zh: "熟练", mundo: "Ciudad Prohibida", mundoZh: "紫禁之巅", sello: "龙",
    lema: "Argumentas, matizas y entiendes textos complejos.", lemaZh: "论证、细化观点，理解复杂文本。",
    partes: [["Lectura", "70′"], ["Audición", "40′"], ["Escritura", "80′"], ["Oral", "20′"]],
  },
};
const ICONOS_PARTE = [BookOpenIcon, HeadphonesIcon, PenLineIcon, MicIcon];

function resultado(nivel, id) {
  try {
    return JSON.parse(localStorage.getItem(`oficial_res_${nivel}_${id}`) || "null");
  } catch {
    return null;
  }
}
const colorNota = (n) => (n >= 80 ? "#22c55e" : n >= 60 ? "#f59e0b" : "#ef4444");


function OficialNivelPage() {
  const { level: raw = "A1" } = useParams();
  const nivel = NIVELES[String(raw).toUpperCase()] ? String(raw).toUpperCase() : "A1";
  const cfg = NIVELES[nivel];
  const { t } = useLanguage();
  const [lista, setLista] = React.useState([]);
  const [cargando, setCargando] = React.useState(true);
  const [busca, setBusca] = React.useState("");
  const [filtro, setFiltro] = React.useState("todos");

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
    let vivo = true;
    setCargando(true);
    (nivelValido(nivel) ? cargarModelos(nivel) : Promise.resolve([]))
      .then((r) => vivo && (setLista(r || []), setCargando(false)))
      .catch(() => vivo && (setLista([]), setCargando(false)));
    return () => (vivo = false);
  }, [nivel]);

  const filas = React.useMemo(() => lista.map((m) => ({ m, r: resultado(nivel, m.id) })), [lista, nivel]);
  const hechos = filas.filter((x) => x.r);
  const media = hechos.length ? Math.round(hechos.reduce((a, x) => a + (x.r.total || 0), 0) / hechos.length) : null;
  const mejor = hechos.length ? Math.max(...hechos.map((x) => x.r.total || 0)) : null;
  const nuevos = filas.filter((x) => x.m.nuevo).length;
  const pct = lista.length ? Math.round((hechos.length / lista.length) * 100) : 0;
  const mostrados = React.useMemo(() => {
    const s = busca.trim().toLowerCase();
    return filas
      .filter((x) => filtro === "todos" || (filtro === "hechos" ? x.r : filtro === "nuevos" ? x.m.nuevo : !x.r))
      .filter((x) => !s || [x.m.tema, x.m.titulo, x.m.codigo, String(x.m.id)].join(" ").toLowerCase().includes(s));
  }, [filas, busca, filtro]);
  const sorpresa = React.useMemo(() => {
    const pend = filas.filter((x) => !x.r);
    const src = pend.length ? pend : filas;
    return src[Math.floor(Math.random() * src.length)];
  }, [filas]);
  const Escena = ESCENAS[nivel];
  const FILTROS = [
    ["todos", t("Todos", "全部"), filas.length],
    ["pend", t("Sin hacer", "未做"), filas.length - hechos.length],
    ["hechos", t("Hechos", "已完成"), hechos.length],
    ...(nuevos ? [["nuevos", t("Nuevos", "新"), nuevos]] : []),
  ];

  return (
    <LightShell>
      <div className="dn" data-nivel={nivel}>
        <section className="dn-hero">
          <Escena />
          <ParticulasNivel nivel={nivel} />
          <div className="dn-hero-in">
            <Link to="/oficial" className="dn-volver">
              <ArrowLeftIcon size={16} /> {t("Exámenes DELE", "DELE考试")}
            </Link>
            <div className="dn-sello" aria-hidden="true" translate="no">
              <span>{cfg.sello}</span>
              <b>{nivel}</b>
            </div>
            <p className="dn-mundo">
              {cfg.mundo} · <span translate="no">{cfg.mundoZh}</span>
            </p>
            <h1 className="dn-titulo">
              DELE {nivel} <em>{cfg.nombre}</em>
            </h1>
            <p className="dn-lema">
              {cfg.lema}
              <small>{cfg.lemaZh}</small>
            </p>
            <div className="dn-partes">
              {cfg.partes.map(([p, min], i) => {
                const Ic = ICONOS_PARTE[i];
                return (
                  <span key={p} className="dn-parte" style={{ animationDelay: `${0.2 + i * 0.08}s` }}>
                    <Ic size={15} strokeWidth={2.4} />
                    {p} <b>{min}</b>
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        <nav className="dn-niveles" aria-label="Niveles DELE">
          {Object.entries(NIVELES).map(([k, v]) => (
            <Link key={k} to={`/oficial/${k}`} className={`dn-nivel-chip ${k === nivel ? "on" : ""}`} data-nivel={k}>
              <span className="dn-chip-sello" translate="no">{v.sello}</span>
              <span>
                <b>{k}</b>
                <small>{v.nombre}</small>
              </span>
            </Link>
          ))}
        </nav>

        <section className="dn-panel" aria-label="Progreso">
          <div className="dn-stats">
            <div className="dn-stat">
              <CheckCircle2Icon size={22} />
              <b>
                {hechos.length}
                <small>/{lista.length || 0}</small>
              </b>
              <span>{t("Completados", "已完成")}</span>
            </div>
            <div className="dn-stat">
              <TargetIcon size={22} />
              <b style={media != null ? { color: colorNota(media) } : undefined}>{media != null ? `${media}%` : "—"}</b>
              <span>{t("Acierto medio", "平均正确率")}</span>
            </div>
            <div className="dn-stat">
              <TrophyIcon size={22} />
              <b style={mejor != null ? { color: colorNota(mejor) } : undefined}>{mejor != null ? `${mejor}%` : "—"}</b>
              <span>{t("Mejor modelo", "最佳成绩")}</span>
            </div>
            <div className="dn-stat dn-stat-anillo" style={{ "--p": pct }}>
              <span className="dn-anillo">
                <b>{pct}%</b>
              </span>
              <span>{t("Del nivel", "本级进度")}</span>
            </div>
          </div>
          {sorpresa && (
            <Link to={`/oficial/${nivel}/${sorpresa.m.id}`} className="dn-sorpresa">
              <span className="dn-sorpresa-ic">
                <ShuffleIcon size={24} strokeWidth={2.4} />
              </span>
              <span className="dn-sorpresa-txt">
                <b>{t("Simulacro sorpresa", "随机模拟考试")}</b>
                <small>{t("Un modelo al azar que aún no has hecho", "随机选择一套未做的模型")}</small>
              </span>
              <ArrowRightIcon size={22} strokeWidth={2.6} />
            </Link>
          )}
        </section>

        <div className="dn-herramientas">
          <label className="dn-buscar">
            <SearchIcon size={18} />
            <input type="search" value={busca} onChange={(e) => setBusca(e.target.value)} placeholder={t("Buscar por tema o número de modelo…", "按主题或模型编号搜索…")} aria-label={t("Buscar modelo", "搜索模型")} />
          </label>
          <div className="dn-filtros" role="group" aria-label="Filtrar">
            {FILTROS.map(([k, lab, n]) => (
              <button key={k} type="button" className="dn-filtro" aria-pressed={filtro === k} onClick={() => setFiltro(k)}>
                {lab} <small>{n}</small>
              </button>
            ))}
          </div>
        </div>

        {cargando ? (
          <div className="dn-vacio">
            <span className="dn-cargando" />
            {t("Preparando los modelos…", "正在准备模型…")}
          </div>
        ) : !mostrados.length ? (
          <p className="dn-vacio">{lista.length ? t("Ningún modelo coincide", "没有匹配的模型") : t("Nivel pendiente de publicación", "该级别尚未发布")}</p>
        ) : (
          <ul className="dn-lista">
            {mostrados.map(({ m, r }, i) => (
              <li key={`${m.codigo}-${m.id}`} style={{ animationDelay: `${Math.min(i, 14) * 45}ms` }}>
                <Link to={`/oficial/${nivel}/${m.id}`} className={`dn-carta ${r ? "hecha" : ""} ${m.nuevo ? "nueva" : ""}`} aria-label={`Modelo ${m.id}: ${m.tema || m.titulo}`}>
                  <span className="dn-carta-num">
                    <small>{m.nuevo ? t("Nuevo", "新") : t("Modelo", "模型")}</small>
                    <b>{String(m.id || i + 1).padStart(2, "0")}</b>
                  </span>
                  <span className="dn-carta-cuerpo">
                    <span className="dn-carta-tema">{m.tema || m.titulo}</span>
                    {m.ambito && <span className="dn-carta-amb">{m.ambito}</span>}
                    <span className="dn-carta-pie">
                      {r ? (
                        <>
                          <span className="dn-nota" style={{ "--n": colorNota(r.total || 0) }}>
                            {r.total || 0}%
                          </span>
                          {r.lectura != null && <span className="dn-pip">L {r.lectura}</span>}
                          {r.audicion != null && <span className="dn-pip">A {r.audicion}</span>}
                        </>
                      ) : (
                        <span className="dn-pip">{t("4 pruebas", "4项考试")}</span>
                      )}
                      <span className="dn-ir">
                        {r ? t("Repetir", "重做") : t("Empezar", "开始")} <ArrowRightIcon size={14} strokeWidth={2.8} />
                      </span>
                    </span>
                  </span>
                  {m.nuevo && <SparklesIcon className="dn-carta-brillo" size={18} />}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </LightShell>
  );
}
export { OficialNivelPage as default };
