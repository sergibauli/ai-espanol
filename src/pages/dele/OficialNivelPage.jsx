import * as React from "react";
import { useParams, Link } from "react-router";
import { ArrowLeftIcon, SearchIcon, ShuffleIcon, ArrowRightIcon, BookOpenIcon, HeadphonesIcon, PenLineIcon, MicIcon, SparklesIcon } from "lucide-react";
import { LightShell } from "../../components/layout/LightShell.jsx";
import { useLanguage } from "../../lib/i18n.jsx";
import { i as nivelValido, l as cargarModelos } from "../../lib/oficial-loader.js";
import { ParticulasNivel } from "../../components/ui/ParticulasNivel.jsx";
import { ESCENAS } from "../../components/dele/EscenasNivel.jsx";
import { Emblema } from "../../components/dele/EmblemasModelo.jsx";
import { EscenaCarta } from "../../components/dele/EscenaCarta.jsx";
import { TITULOS, ambitoDe } from "../../data/oficial/titulos.js";
import "../../styles/dele-nivel-v2.css";
import "../../styles/movil-dele.css";

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
const colorNota = (n) => (n >= 80 ? "#15803d" : n >= 60 ? "#b45309" : "#b91c1c");
// Variante clara para leer sobre la placa oscura de la cabecera
const colorNotaClara = (n) => (n >= 80 ? "#86efac" : n >= 60 ? "#fcd34d" : "#fca5a5");


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
      .filter((x) => !s || [x.m.tema, x.m.titulo, x.m.codigo, String(x.m.id), TITULOS[x.m.codigo]?.es, TITULOS[x.m.codigo]?.zh].join(" ").toLowerCase().includes(s));
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

  // Modelo recomendado: el primero sin hacer (se destaca en grande cuando se ven todos sin buscar)
  const destacado = filtro === "todos" && !busca.trim() ? filas.find((x) => !x.r) : null;
  const totalMin = cfg.partes.reduce((a, [, min]) => a + parseInt(min, 10), 0);
  const listaRef = React.useRef(null);
  const reducido = React.useMemo(() => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches, []);

  // Las tarjetas aparecen (y el emblema se dibuja) cuando entran en pantalla
  React.useEffect(() => {
    const ul = listaRef.current;
    if (!ul) return;
    const items = [...ul.children];
    if (reducido || typeof IntersectionObserver === "undefined") {
      items.forEach((li) => li.classList.add("visto"));
      return;
    }
    const io = new IntersectionObserver(
      (ents) => ents.forEach((en) => en.isIntersecting && (en.target.classList.add("visto"), io.unobserve(en.target))),
      { rootMargin: "0px 0px 40px 0px", threshold: 0.02 }
    );
    items.forEach((li) => io.observe(li));
    return () => io.disconnect();
  }, [mostrados, reducido]);

  // Inclinación 3D con reflejo dorado (solo ratón y sin «reducir movimiento»)
  const alMover = React.useCallback(
    (e) => {
      if (reducido || e.pointerType !== "mouse") return;
      const carta = e.target.closest?.(".dx-carta");
      if (!carta) return;
      const b = carta.getBoundingClientRect();
      const x = (e.clientX - b.left) / b.width;
      const y = (e.clientY - b.top) / b.height;
      carta.style.setProperty("--rx", `${((0.5 - y) * 9).toFixed(2)}deg`);
      carta.style.setProperty("--ry", `${((x - 0.5) * 11).toFixed(2)}deg`);
      carta.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
      carta.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
    },
    [reducido]
  );
  const alSalir = React.useCallback((e) => {
    const carta = e.target.closest?.(".dx-carta");
    if (carta) ["--rx", "--ry", "--gx", "--gy"].forEach((v) => carta.style.removeProperty(v));
  }, []);

  // Mapa de sellos: salta a la tarjeta (quita filtros si estaba oculta)
  const irA = (id) => {
    const ir = () => document.getElementById(`dx-m-${id}`)?.scrollIntoView({ behavior: reducido ? "auto" : "smooth", block: "center" });
    if (!mostrados.some((x) => x.m.id === id)) {
      setFiltro("todos");
      setBusca("");
      setTimeout(ir, 60);
    } else ir();
  };

  return (
    <LightShell>
      <div className="dx gm-no-adapt" data-nivel={nivel}>
        <section className="dx-hero">
          <Escena />
          <ParticulasNivel nivel={nivel} />
          <div className="dx-hero-velo" aria-hidden="true" />
          <img className="dx-dragon" src={`${import.meta.env.BASE_URL}theme/dragon-luz.webp`} alt="" aria-hidden="true" loading="lazy" decoding="async" />
          <img className="dx-nube n1" src={`${import.meta.env.BASE_URL}theme/nube-oro.png`} alt="" aria-hidden="true" />
          <img className="dx-nube n2" src={`${import.meta.env.BASE_URL}theme/nube-oro.png`} alt="" aria-hidden="true" />
          {["tl", "tr", "bl", "br"].map((c) => (
            <img key={c} className={`dx-esquina ${c}`} src={`${import.meta.env.BASE_URL}theme/barra-esquina.png`} alt="" aria-hidden="true" />
          ))}

          <div className="dx-rollo">
            <span className="dx-rodillo izq" aria-hidden="true" />
            <div className="dx-placa">
              <div className="dx-placa-top">
                <Link to="/oficial" className="dx-volver">
                  <ArrowLeftIcon size={15} strokeWidth={2.6} /> {t("Exámenes", "考试")}
                </Link>
                <span className="dx-mundo">
                  {cfg.mundo} · <span translate="no">{cfg.mundoZh}</span>
                </span>
              </div>
              <div className="dx-titular">
                <div className="dx-sello" aria-hidden="true" translate="no">
                  <span>{cfg.sello}</span>
                </div>
                <div className="dx-titular-txt">
                  <h1 className="dx-titulo">
                    <b>{nivel}</b>
                  </h1>
                  <p className="dx-nombre">
                    {cfg.nombre} <span translate="no">· {cfg.zh}</span>
                  </p>
                </div>
              </div>
              <p className="dx-lema">
                {cfg.lema} <small>{cfg.lemaZh}</small>
              </p>
              <div className="dx-partes">
                {cfg.partes.map(([p, min], i) => {
                  const Ic = ICONOS_PARTE[i];
                  return (
                    <span key={p} className="dx-parte">
                      <Ic size={14} strokeWidth={2.4} />
                      {p} <b>{min}</b>
                    </span>
                  );
                })}
              </div>
            </div>
            <span className="dx-rodillo der" aria-hidden="true" />
          </div>

          <div className="dx-lateral">
            <nav className="dx-niveles" aria-label={t("Niveles DELE", "DELE级别")}>
              {Object.entries(NIVELES).map(([k, v]) => (
                <Link key={k} to={`/oficial/${k}`} className={`dx-nivel ${k === nivel ? "on" : ""}`} data-nivel={k} aria-current={k === nivel ? "page" : undefined} title={`${k} · ${v.nombre}`}>
                  <span className="dx-nivel-sello" translate="no">{v.sello}</span>
                  <b>{k}</b>
                  <small>{v.nombre}</small>
                </Link>
              ))}
            </nav>
            <div className="dx-progreso" aria-label={t("Progreso del nivel", "本级进度")}>
              <div className="dx-progreso-top">
                <span className="dx-anillo" style={{ "--p": pct }}>
                  <b>{pct}%</b>
                </span>
                <dl className="dx-cifras">
                  <div>
                    <dt>{t("Hechos", "已完成")}</dt>
                    <dd>
                      {hechos.length}
                      <small>/{lista.length || 0}</small>
                    </dd>
                  </div>
                  <div>
                    <dt>{t("Media", "平均")}</dt>
                    <dd style={media != null ? { color: colorNotaClara(media) } : undefined}>{media != null ? `${media}%` : "—"}</dd>
                  </div>
                  <div>
                    <dt>{t("Mejor", "最佳")}</dt>
                    <dd style={mejor != null ? { color: colorNotaClara(mejor) } : undefined}>{mejor != null ? `${mejor}%` : "—"}</dd>
                  </div>
                </dl>
              </div>
              {filas.length > 0 && (
                <div className="dx-mapa" role="group" aria-label={t("Mapa de modelos", "模型地图")}>
                  {filas.map(({ m, r }) => (
                    <button
                      key={`${m.codigo}-${m.id}`}
                      type="button"
                      className={`dx-punto ${r ? "hecho" : ""} ${m.nuevo ? "nuevo" : ""}`}
                      style={r ? { "--n": colorNotaClara(r.total || 0) } : undefined}
                      onClick={() => irA(m.id)}
                      title={`${String(m.id).padStart(2, "0")} · ${TITULOS[m.codigo]?.es || m.tema}${r ? ` · ${r.total || 0}%` : ""}`}
                      aria-label={`${t("Modelo", "模型")} ${m.id}${r ? ` · ${r.total || 0}%` : ""}`}
                    >
                      {m.id}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="dx-barra">
          <label className="dx-buscar">
            <SearchIcon size={18} />
            <input type="search" value={busca} onChange={(e) => setBusca(e.target.value)} placeholder={t("Buscar tema o número…", "按主题或编号搜索…")} aria-label={t("Buscar modelo", "搜索模型")} />
          </label>
          <div className="dx-filtros" role="group" aria-label={t("Filtrar", "筛选")}>
            {FILTROS.map(([k, lab, n]) => (
              <button key={k} type="button" className="dx-filtro" aria-pressed={filtro === k} onClick={() => setFiltro(k)}>
                {lab} <small>{n}</small>
              </button>
            ))}
          </div>
          {sorpresa && (
            <Link to={`/oficial/${nivel}/${sorpresa.m.id}`} className="dx-sorpresa" title={t("Un modelo al azar que aún no has hecho", "随机选择一套未做的模型")}>
              <ShuffleIcon size={18} strokeWidth={2.6} />
              <span>
                {t("Sorpresa", "随机")}
                <small>{t("Modelo al azar", "随机一套")}</small>
              </span>
            </Link>
          )}
        </div>

        {cargando ? (
          <div className="dx-vacio">
            <span className="dx-cargando" />
            {t("Preparando los modelos…", "正在准备模型…")}
          </div>
        ) : !mostrados.length ? (
          <p className="dx-vacio">{lista.length ? t("Ningún modelo coincide", "没有匹配的模型") : t("Nivel pendiente de publicación", "该级别尚未发布")}</p>
        ) : (
          <ul className="dx-lista" ref={listaRef} onPointerMove={alMover} onPointerOut={alSalir}>
            {mostrados.map(({ m, r }, i) => {
              const info = TITULOS[m.codigo];
              const [ambKey, ambEs, ambZh] = ambitoDe(m.ambito);
              const num = String(m.id || i + 1).padStart(2, "0");
              const grande = destacado && destacado.m === m;
              const semilla = Number(m.id) || i + 1;
              return (
                <li key={`${m.codigo}-${m.id}`} id={`dx-m-${m.id}`} className={grande ? "dx-li-grande" : ""} style={{ "--d": `${(i % 3) * 90}ms` }}>
                  <Link
                    to={`/oficial/${nivel}/${m.id}`}
                    className={`dx-carta ${r ? "hecha" : ""} ${m.nuevo ? "nueva" : ""} ${grande ? "grande" : ""}`}
                    data-amb={ambKey}
                    data-tono={semilla % 6}
                    aria-label={`${t("Modelo", "模型")} ${num}: ${info?.es || m.tema}`}
                  >
                    <span className="dx-lamina">
                      <EscenaCarta nivel={nivel} semilla={semilla} />
                      <span className="dx-num" translate="no">
                        <small>{m.nuevo ? t("Nuevo", "新") : t("Modelo", "模型")}</small>
                        <b>{num}</b>
                      </span>
                      <span className="dx-emblema">
                        <Emblema e={info?.e} size={grande ? 76 : 56} trazo={!reducido} />
                      </span>
                      {r ? (
                        <span className="dx-estado hecho" style={{ "--n": colorNota(r.total || 0) }}>
                          <i translate="no">成</i>
                          <b>{r.total || 0}%</b>
                        </span>
                      ) : m.nuevo ? (
                        <span className="dx-estado nuevo">
                          <SparklesIcon size={13} /> {t("Nuevo", "新")}
                        </span>
                      ) : null}
                      {grande && (
                        <>
                          <img className="dx-mono" src={`${import.meta.env.BASE_URL}mono/guino.webp`} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                          <span className="dx-tetoca">
                            {t("¡Te toca!", "轮到你了！")}
                          </span>
                        </>
                      )}
                    </span>
                    <span className="dx-cuerpo">
                      <span className="dx-amb">
                        {ambEs} · <span translate="no">{ambZh}</span>
                      </span>
                      <span className="dx-tit">{info?.es || m.tema}</span>
                      {info?.zh && <span className="dx-tit-zh">{info.zh}</span>}
                      <span className="dx-tema">{info ? m.tema : m.codigo}</span>
                      {r && (r.lectura != null || r.audicion != null) && (
                        <span className="dx-barras">
                          {r.lectura != null && (
                            <span>
                              <em>{t("Lectura", "阅读")}</em>
                              <i style={{ "--v": Math.min(100, r.lectura) }} />
                              <b>{r.lectura}%</b>
                            </span>
                          )}
                          {r.audicion != null && (
                            <span>
                              <em>{t("Audición", "听力")}</em>
                              <i style={{ "--v": Math.min(100, r.audicion) }} />
                              <b>{r.audicion}%</b>
                            </span>
                          )}
                        </span>
                      )}
                      <span className="dx-pie">
                        <span className="dx-meta">
                          <span>{t("4 pruebas", "4项")}</span>
                          <span>{totalMin}′</span>
                        </span>
                        <span className="dx-ir">
                          {r ? t("Repetir", "重做") : t("Empezar", "开始")} <ArrowRightIcon size={15} strokeWidth={2.8} />
                        </span>
                      </span>
                    </span>
                    <span className="dx-reflejo" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </LightShell>
  );
}
export { OficialNivelPage as default };
