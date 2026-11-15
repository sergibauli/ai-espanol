import * as React from "react";
import { createPortal } from "react-dom";
import { Volume2Icon, SearchIcon, XIcon, HeartIcon, ChevronLeftIcon, ChevronRightIcon, SnailIcon, SparklesIcon } from "lucide-react";
import { LightShell } from "../components/layout/LightShell.jsx";
import { speak } from "../components/lesson/fx.js";
import { useFavorites } from "../lib/favorites.js";
import { temaZh, primerHan, ESTILOS_TEMA } from "../lib/temasDiccionario.js";
import "../styles/diccionario-imperial.css";

// Diccionario español–chino: cuatro tomos (uno por nivel, cada uno con su mundo),
// buscador protagonista y fichas de pergamino/tablilla con sello y audio con la voz del profesor.
const TOMOS = [
  { key: "A1", zh: "入门", nombre: "Tomo de Bambú", nombreZh: "竹简卷", emblema: "竹", load: () => import("../data/diccionarios/a1Dictionary.js").then((m) => m.a1Dictionary) },
  { key: "A2", zh: "初级", nombre: "Tomo de Linternas", nombreZh: "灯笼卷", emblema: "灯", load: () => import("../data/diccionarios/a2Dictionary.js").then((m) => m.a2Dictionary) },
  { key: "B1", zh: "中级", nombre: "Tomo de Tinta", nombreZh: "墨卷", emblema: "墨", load: () => import("../data/diccionarios/b1Dictionary.js").then((m) => m.b1Dictionary) },
  { key: "B2", zh: "高级", nombre: "Tomo del Palacio", nombreZh: "宫阙卷", emblema: "宫", load: () => import("../data/diccionarios/b2Dictionary.js").then((m) => m.b2Dictionary) },
];
const PAGE = 36;
const TEMAS_VISIBLES = 10;
const ALFABETO = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
const SUGERENCIAS = { A1: ["hola", "familia", "casa", "comer", "rojo"], A2: ["viaje", "salud", "trabajo", "amigo", "ciudad"], B1: ["empleo", "cultura", "noticia", "ley", "ciencia"], B2: ["historia", "filosofía", "economía", "arte", "sociedad"] };

const norm = (text) => String(text || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
// Inicial de la palabra sin signos (¿, ¡) ni tildes; la Ñ se conserva
const inicial = (text) => {
  const letra = String(text || "").replace(/^[^\p{L}]+/u, "")[0] || "";
  return letra.toUpperCase() === "Ñ" ? "Ñ" : norm(letra).toUpperCase();
};

/** Resalta en la palabra la parte que coincide con la búsqueda (sin tildes). */
function Resaltado({ texto, normal, consulta }) {
  if (!consulta || normal.length !== texto.length) return texto;
  const i = normal.indexOf(consulta);
  if (i < 0) return texto;
  return (
    <>
      {texto.slice(0, i)}
      <mark>{texto.slice(i, i + consulta.length)}</mark>
      {texto.slice(i + consulta.length)}
    </>
  );
}

const Ficha = React.memo(function Ficha({ entrada, indice, consulta, favorita, onAbrir, onFavorita }) {
  const { w: word } = entrada;
  return (
    <article className="dz-ficha" style={{ "--i": indice % 12 }}>
      <button type="button" className="dz-ficha__abrir" onClick={() => onAbrir(indice)} aria-label={`${word.es} · ${word.zh} · Ver ficha · 查看词条`} />
      <span className="dz-ficha__sello" translate="no" aria-hidden="true">
        {primerHan(word.zh)}
      </span>
      <h3 className="dz-ficha__es">
        <Resaltado texto={word.es} normal={entrada.n} consulta={consulta} />
      </h3>
      <p className="dz-ficha__zh">{word.zh}</p>
      <span className="dz-ficha__tema">
        {word.theme}
        {temaZh(word.theme) && <small> · {temaZh(word.theme)}</small>}
      </span>
      <button type="button" className="dz-ficha__audio" onClick={() => speak(word.es)} aria-label={`Escuchar «${word.es}» · 听发音`}>
        <Volume2Icon size={20} />
      </button>
      <button type="button" className={`dz-ficha__fav ${favorita ? "is-on" : ""}`} onClick={() => onFavorita(word)} aria-pressed={favorita} aria-label="Guardar en Memoria · 收藏">
        <HeartIcon size={15} />
      </button>
    </article>
  );
});

/** Pliego con la entrada completa: se desenrolla al abrir. */
function Pliego({ word, tomo, posicion, total, favorita, onFavorita, onCerrar, onMover }) {
  const cerrarRef = React.useRef(null);
  const acciones = React.useRef({ onCerrar, onMover });
  acciones.current = { onCerrar, onMover };
  React.useEffect(() => {
    const previo = document.activeElement;
    cerrarRef.current?.focus();
    const alPulsar = (e) => {
      if (e.key === "Escape") acciones.current.onCerrar();
      else if (e.key === "ArrowRight") acciones.current.onMover(1);
      else if (e.key === "ArrowLeft") acciones.current.onMover(-1);
    };
    document.addEventListener("keydown", alPulsar);
    return () => {
      document.removeEventListener("keydown", alPulsar);
      previo?.focus?.({ preventScroll: true });
    };
  }, []);
  React.useEffect(() => {
    speak(word.es);
  }, [word]);

  return createPortal(
    <div className="dz-modal" data-tomo={tomo.key} role="dialog" aria-modal="true" aria-label={`${word.es} · ${word.zh}`} onClick={(e) => e.target === e.currentTarget && onCerrar()}>
      <div className="dz-pliego" key={word.es + posicion}>
        <span className="dz-pliego__vara dz-pliego__vara--arriba" aria-hidden="true" />
        <div className="dz-pliego__papel">
          <div className="dz-pliego__cabecera">
            <span className="dz-pliego__tomo">
              {tomo.key} · {tomo.nombre} · {tomo.nombreZh}
            </span>
            <span className="dz-pliego__pos">
              {posicion + 1} / {total}
            </span>
            <button ref={cerrarRef} type="button" className="dz-pliego__cerrar" onClick={onCerrar} aria-label="Cerrar · 关闭">
              <XIcon size={20} />
            </button>
          </div>
          <div className="dz-pliego__entrada">
            <span className="dz-pliego__sello" translate="no" aria-hidden="true">
              {primerHan(word.zh)}
            </span>
            <div>
              <h2 className="dz-pliego__es">{word.es}</h2>
              <p className="dz-pliego__zh">{word.zh}</p>
            </div>
          </div>
          <div className="dz-pliego__audios">
            <button type="button" className="dz-audio-grande" onClick={() => speak(word.es)}>
              <Volume2Icon size={26} />
              <span>
                Escuchar <small>听发音</small>
              </span>
            </button>
            <button type="button" className="dz-audio-lento" onClick={() => speak(word.es, 0.6)}>
              <SnailIcon size={18} />
              <span>
                Lento <small>慢速</small>
              </span>
            </button>
          </div>
          {word.explanation && (
            <section className="dz-pliego__bloque">
              <h4>Explicación · 讲解</h4>
              <p>{word.explanation}</p>
            </section>
          )}
          {word.exampleEs && (
            <section className="dz-pliego__bloque dz-pliego__ejemplo">
              <h4>Ejemplo · 例句</h4>
              <button type="button" onClick={() => speak(word.exampleEs)} aria-label={`Escuchar el ejemplo · 听例句: ${word.exampleEs}`}>
                <Volume2Icon size={18} />
                <span>
                  “{word.exampleEs}”<small>{word.exampleZh}</small>
                </span>
              </button>
            </section>
          )}
          <div className="dz-pliego__pie">
            <span className="dz-pliego__temaetq">
              {word.theme}
              {temaZh(word.theme) && ` · ${temaZh(word.theme)}`}
            </span>
            <button type="button" className={`dz-pliego__fav ${favorita ? "is-on" : ""}`} aria-pressed={favorita} onClick={() => onFavorita(word)}>
              <HeartIcon size={16} /> {favorita ? "Guardada · 已收藏" : "Guardar en Memoria · 收藏"}
            </button>
          </div>
          <div className="dz-pliego__nav">
            <button type="button" onClick={() => onMover(-1)} disabled={posicion === 0}>
              <ChevronLeftIcon size={18} /> Anterior · 上一个
            </button>
            <button type="button" onClick={() => onMover(1)} disabled={posicion >= total - 1}>
              Siguiente · 下一个 <ChevronRightIcon size={18} />
            </button>
          </div>
        </div>
        <span className="dz-pliego__vara dz-pliego__vara--abajo" aria-hidden="true" />
      </div>
    </div>,
    document.body
  );
}

/** Escena de fondo: luna, montes de tinta en tres planos y nubes doradas. */
function Fondo() {
  return (
    <div className="dz-fondo" aria-hidden="true">
      <span className="dz-fondo__luna" />
      <svg className="dz-fondo__montes" viewBox="0 0 1200 260" preserveAspectRatio="none">
        <path className="m1" d="M0 170 L90 120 L170 150 L260 80 L350 140 L430 100 L520 150 L610 70 L700 130 L790 95 L880 150 L960 85 L1050 135 L1130 105 L1200 140 V260 H0Z" />
        <path className="m2" d="M0 200 L110 150 L200 185 L300 130 L400 190 L500 150 L600 195 L720 140 L820 190 L930 150 L1030 195 L1120 160 L1200 185 V260 H0Z" />
        <path className="m3" d="M0 230 L140 195 L260 225 L380 190 L520 232 L660 200 L800 235 L940 205 L1080 232 L1200 210 V260 H0Z" />
      </svg>
      <span className="dz-fondo__nube dz-fondo__nube--1" />
      <span className="dz-fondo__nube dz-fondo__nube--2" />
      <span className="dz-fondo__nube dz-fondo__nube--3" />
      <span className="dz-fondo__celosia" />
    </div>
  );
}

export default function DiccionarioPage() {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [level, setLevel] = React.useState("A1");
  const [words, setWords] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [recuentos, setRecuentos] = React.useState({});
  const [q, setQ] = React.useState("");
  const [theme, setTheme] = React.useState("");
  const [letra, setLetra] = React.useState("");
  const [limit, setLimit] = React.useState(PAGE);
  const [todosTemas, setTodosTemas] = React.useState(false);
  const [abierta, setAbierta] = React.useState(-1);
  const [intento, setIntento] = React.useState(0);
  const tomo = TOMOS.find((t) => t.key === level);
  const centinela = React.useRef(null);

  React.useEffect(() => {
    let cancelado = false;
    setWords(null);
    setError(false);
    setTheme("");
    setLetra("");
    setLimit(PAGE);
    setAbierta(-1);
    tomo
      .load()
      .then((lista) => {
        if (cancelado) return;
        setWords(lista);
        setRecuentos((r) => ({ ...r, [tomo.key]: lista.length }));
      })
      .catch(() => !cancelado && setError(true));
    return () => {
      cancelado = true;
    };
  }, [level, intento]);

  // Índice preparado una vez por nivel: la búsqueda solo compara cadenas ya normalizadas
  const indice = React.useMemo(() => (words || []).map((w, id) => ({ w, id, n: norm(w.es), ini: inicial(w.es) })), [words]);
  const themes = React.useMemo(() => {
    const cuenta = new Map();
    for (const { w } of indice) if (w.theme) cuenta.set(w.theme, (cuenta.get(w.theme) || 0) + 1);
    return [...cuenta];
  }, [indice]);
  const letrasConPalabras = React.useMemo(() => new Set(indice.map((e) => e.ini)), [indice]);
  const palabraDelDia = words && words.length ? words[Math.floor(Date.now() / 86400000) % words.length] : null;

  const qDiferida = React.useDeferredValue(q);
  const consulta = norm(qDiferida.trim());
  const consultaZh = qDiferida.trim();
  const list = React.useMemo(
    () => indice.filter((e) => (!theme || e.w.theme === theme) && (!letra || e.ini === letra) && (!consulta || e.n.includes(consulta) || String(e.w.zh).includes(consultaZh))),
    [indice, theme, letra, consulta, consultaZh]
  );
  const visibles = list.slice(0, limit);
  const hayFiltros = Boolean(q || theme || letra);
  const limpiar = () => (setQ(""), setTheme(""), setLetra(""), setLimit(PAGE));
  const buscar = (texto) => (setQ(texto), setLimit(PAGE));

  // Carga progresiva al acercarse al final (además del botón «Ver más»)
  React.useEffect(() => {
    const nodo = centinela.current;
    if (!nodo || limit >= list.length || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver((ents) => ents.some((e) => e.isIntersecting) && setLimit((n) => n + PAGE), { rootMargin: "700px 0px" });
    obs.observe(nodo);
    return () => obs.disconnect();
  }, [limit, list.length]);

  const alternarFavorita = React.useCallback(
    (word) => (isFavorite(word.es) ? removeFavorite(word.es) : addFavorite(word.es, word.zh, `Diccionario ${word.level || level}`, word.level || level)),
    [isFavorite, removeFavorite, addFavorite, level]
  );
  const cerrar = React.useCallback(() => setAbierta(-1), []);
  const mover = React.useCallback(
    (paso) => {
      const j = Math.max(0, Math.min(list.length - 1, abierta + paso));
      if (j >= limit) setLimit((n) => n + PAGE);
      setAbierta(j);
    },
    [abierta, list.length, limit]
  );
  const temasMostrados = todosTemas ? themes : themes.slice(0, TEMAS_VISIBLES);
  const elegirTema = (t) => {
    setTheme(t);
    setLimit(PAGE);
    if (t && !temasMostrados.some(([x]) => x === t)) setTodosTemas(true);
  };

  return (
    <LightShell>
      <div className="unit-page dz" data-tomo={level}>
        <Fondo />

        <header className="dz-portada">
          <div className="dz-rollo">
            <span className="dz-rollo__vara dz-rollo__vara--izq" aria-hidden="true" />
            <div className="dz-rollo__papel">
              <span className="dz-rollo__ceja">
                <span>Biblioteca imperial</span>
                <span translate="no" lang="zh">
                  {" "}· 皇家书阁
                </span>
              </span>
              <h1 className="dz-rollo__titulo">
                Diccionario
                <span className="dz-rollo__titulozh" lang="zh">
                  西汉词典
                </span>
              </h1>
              <p className="dz-rollo__sub">
                {words ? `${words.length.toLocaleString("es-ES")} palabras del ${tomo.nombre.toLowerCase()} (${level}) con audio, explicación y ejemplo.` : "Abriendo el tomo…"}
                <span lang="zh"> 每个词都有真人发音、中文讲解和例句。</span>
              </p>

              <label className="dz-buscador">
                <span className="dz-buscador__icono" aria-hidden="true">
                  <SearchIcon size={22} />
                </span>
                <input
                  type="search"
                  value={q}
                  onChange={(e) => buscar(e.target.value)}
                  placeholder="Español o chino · 西语或中文"
                  aria-label="Buscar palabra · 搜索单词"
                  enterKeyHint="search"
                  autoComplete="off"
                  spellCheck={false}
                />
                {q && (
                  <button type="button" className="dz-buscador__borrar" onClick={() => buscar("")} aria-label="Borrar · 清除">
                    <XIcon size={18} />
                  </button>
                )}
              </label>
              <div className="dz-sugerencias">
                <span>Prueba · 试试:</span>
                {SUGERENCIAS[level].map((s) => (
                  <button key={s} type="button" onClick={() => buscar(s)} className={q === s ? "is-on" : ""}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <span className="dz-rollo__vara dz-rollo__vara--der" aria-hidden="true" />
            <span className="dz-rollo__sello" translate="no" aria-hidden="true">
              辞<br />典
            </span>
          </div>
          <img className="dz-portada__mono" src="./mono/guino.png" alt="" aria-hidden="true" width="150" height="150" decoding="async" />
        </header>

        <nav className="dz-tomos" role="tablist" aria-label="Nivel · 级别">
          {TOMOS.map((t, n) => (
            <button key={t.key} type="button" role="tab" style={{ "--n": n }} aria-selected={level === t.key} className={`dz-tomo dz-tomo--${t.key.toLowerCase()} ${level === t.key ? "is-on" : ""}`} onClick={() => setLevel(t.key)}>
              <span className="dz-tomo__emblema" translate="no" aria-hidden="true">
                {t.emblema}
              </span>
              <span className="dz-tomo__nivel">{t.key}</span>
              <span className="dz-tomo__nombre">
                {t.nombre}
                <small>
                  {t.nombreZh} · {t.zh}
                </small>
              </span>
              {recuentos[t.key] && <span className="dz-tomo__cuenta">{recuentos[t.key].toLocaleString("es-ES")} palabras · 词</span>}
            </button>
          ))}
        </nav>

        {palabraDelDia && (
          <section className="dz-decreto" aria-label="Palabra del día · 每日一词">
            <span className="dz-decreto__sello" translate="no" aria-hidden="true">
              {primerHan(palabraDelDia.zh)}
            </span>
            <div className="dz-decreto__texto">
              <span className="dz-decreto__ceja">
                <SparklesIcon size={13} /> Palabra del día · 每日一词 · {level}
              </span>
              <div className="dz-decreto__palabra">
                <b>{palabraDelDia.es}</b>
                <span>{palabraDelDia.zh}</span>
              </div>
              {palabraDelDia.exampleEs && (
                <p>
                  “{palabraDelDia.exampleEs}” <span>{palabraDelDia.exampleZh}</span>
                </p>
              )}
            </div>
            <button type="button" className="dz-decreto__audio" onClick={() => speak(palabraDelDia.exampleEs || palabraDelDia.es)} aria-label="Escuchar · 听">
              <Volume2Icon size={24} />
            </button>
          </section>
        )}

        <section className="dz-filtros" aria-label="Filtros · 筛选">
          <div className="dz-temas" role="group" aria-label="Temas · 主题">
            <button type="button" aria-pressed={!theme} className={`dz-tema dz-tema--todos ${!theme ? "is-on" : ""}`} onClick={() => elegirTema("")}>
              <span className="dz-tema__emblema" translate="no" aria-hidden="true">
                全
              </span>
              <span className="dz-tema__txt">
                Todos los temas<small>全部主题</small>
              </span>
            </button>
            {temasMostrados.map(([t, n], i) => (
              <button key={t} type="button" aria-pressed={theme === t} className={`dz-tema dz-tema--${ESTILOS_TEMA[i % ESTILOS_TEMA.length]} ${theme === t ? "is-on" : ""}`} onClick={() => elegirTema(theme === t ? "" : t)}>
                <span className="dz-tema__emblema" translate="no" aria-hidden="true">
                  {primerHan(temaZh(t), "词")}
                </span>
                <span className="dz-tema__txt">
                  {t}
                  {temaZh(t) && <small>{temaZh(t)}</small>}
                </span>
                <span className="dz-tema__n">{n}</span>
              </button>
            ))}
            {themes.length > TEMAS_VISIBLES && (
              <button type="button" className="dz-tema-mas" onClick={() => setTodosTemas((v) => !v)} aria-expanded={todosTemas}>
                {todosTemas ? "Menos temas · 收起" : `+${themes.length - TEMAS_VISIBLES} temas · 更多主题`}
              </button>
            )}
          </div>

          <div className="dz-abc" role="group" aria-label="Por letra · 按字母">
            <button type="button" className={!letra ? "is-on" : ""} onClick={() => (setLetra(""), setLimit(PAGE))} aria-pressed={!letra}>
              A–Z
            </button>
            {ALFABETO.map((l) => (
              <button key={l} type="button" translate="no" className={letra === l ? "is-on" : ""} disabled={!letrasConPalabras.has(l)} aria-pressed={letra === l} onClick={() => (setLetra(letra === l ? "" : l), setLimit(PAGE))}>
                {l}
              </button>
            ))}
          </div>
        </section>

        {words && (
          <div className="dz-recuento" aria-live="polite">
            <span>
              <b>{list.length.toLocaleString("es-ES")}</b> {list.length === 1 ? "palabra" : "palabras"} · 个单词
              {letra && ` · ${letra}`}
              {theme && ` · ${theme}`}
              {q.trim() && ` · «${q.trim()}»`}
            </span>
            {hayFiltros && (
              <button type="button" onClick={limpiar}>
                <XIcon size={14} /> Quitar filtros · 清除筛选
              </button>
            )}
          </div>
        )}

        <div className="dz-resultados" key={level}>
          {error ? (
            <div className="dz-vacio" role="alert">
              <span className="dz-vacio__sello" aria-hidden="true">
                误
              </span>
              <p>
                No se pudo abrir este tomo
                <span>无法打开这一卷，请重试</span>
              </p>
              <button type="button" onClick={() => setIntento((n) => n + 1)}>
                Reintentar · 重试
              </button>
            </div>
          ) : !words ? (
            <div className="dz-rejilla dz-esqueleto" aria-label="Abriendo el tomo… 正在打开词典">
              {Array.from({ length: 8 }, (_, n) => (
                <span key={n} style={{ "--i": n }} />
              ))}
            </div>
          ) : !list.length ? (
            <div className="dz-vacio" role="status">
              <span className="dz-vacio__sello" aria-hidden="true">
                无
              </span>
              <p>
                No hay palabras con estos filtros en el nivel {level}
                <span>这一级别没有符合条件的单词</span>
              </p>
              <div className="dz-vacio__acciones">
                {hayFiltros && (
                  <button type="button" onClick={limpiar}>
                    <XIcon size={16} aria-hidden="true" /> Quitar filtros · 清除筛选
                  </button>
                )}
                {q.trim() &&
                  TOMOS.filter((t) => t.key !== level).map((t) => (
                    <button key={t.key} type="button" className="is-tomo" onClick={() => setLevel(t.key)}>
                      Buscar en {t.key} · 在{t.key}中搜索
                    </button>
                  ))}
              </div>
            </div>
          ) : (
            <>
              <div className="dz-rejilla">
                {visibles.map((entrada, index) => (
                  <Ficha key={entrada.id} entrada={entrada} indice={index} consulta={consulta} favorita={isFavorite(entrada.w.es)} onAbrir={setAbierta} onFavorita={alternarFavorita} />
                ))}
              </div>
              {limit < list.length && (
                <>
                  <div ref={centinela} className="dz-centinela" aria-hidden="true" />
                  <button type="button" className="dz-mas" onClick={() => setLimit((n) => n + PAGE)}>
                    Ver más palabras · 更多 <span>{(list.length - limit).toLocaleString("es-ES")}</span>
                  </button>
                </>
              )}
            </>
          )}
        </div>

        {abierta >= 0 && list[abierta] && (
          <Pliego word={list[abierta].w} tomo={tomo} posicion={abierta} total={list.length} favorita={isFavorite(list[abierta].w.es)} onFavorita={alternarFavorita} onCerrar={cerrar} onMover={mover} />
        )}
      </div>
    </LightShell>
  );
}
