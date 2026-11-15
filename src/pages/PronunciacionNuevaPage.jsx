import * as React from "react";
import { createPortal } from "react-dom";
import { Link, useSearchParams } from "react-router";
import {
  Volume2Icon,
  Volume1Icon,
  PlayIcon,
  MicIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  LightbulbIcon,
  SearchIcon,
  XIcon,
  HeartIcon,
  BookOpenIcon,
  MessageCircleIcon,
  FileTextIcon,
  SparklesIcon,
  LayoutGridIcon,
} from "lucide-react";
import { LightShell } from "../components/layout/LightShell.jsx";
import PracticePlayer from "../components/pron/PracticePlayer.jsx";
import OndaViva, { useVoz, SelloEstampa } from "../components/pron/OndaViva.jsx";
import { EscenaSala, FondoTemplo } from "../components/pron/Escenas.jsx";
import { SALAS, salaDeFamilia, duracionVoz, reducido } from "../components/pron/salas.js";
import { FAMILIAS, materialDe } from "../components/pron/datos.js";
import { useFavorites } from "../lib/favorites.js";
import "../styles/pronunciacion-v2.css";

const DIFICILES = FAMILIAS.filter((familia) => familia.dificil).length;
const TODAS = FAMILIAS.flatMap((familia) => familia.silabas.map((silaba) => ({ familia, silaba })));
const TOTAL_SILABAS = new Set(TODAS.map((x) => x.silaba.s)).size;
// Letra(s) que representan a la familia: «b», «c», «ch», «ll», «h»…
const LETRAS = { "ge-gi-j": "j", h: "h" };
const letraDe = (familia) => LETRAS[familia.id] || familia.silabas[0].s.replace(/[aeiouáéíóú]+$/, "") || familia.id;

// Progreso guardado
const CLAVES = { oidas: "dele_pron_oidas", dominadas: "dele_pron_dominadas", perfectas: "dele_pron_perfectas", visitadas: "dele_visited_silabas" };
const leer = (clave) => {
  try {
    return new Set(JSON.parse(localStorage.getItem(clave) || "[]"));
  } catch {
    return new Set();
  }
};
function useConjunto(clave) {
  const [valor, setValor] = React.useState(() => leer(clave));
  const anadir = React.useCallback((x) => setValor((previo) => (previo.has(x) ? previo : new Set(previo).add(x))), []);
  React.useEffect(() => {
    try {
      localStorage.setItem(clave, JSON.stringify([...valor]));
    } catch {}
  }, [clave, valor]);
  return [valor, anadir];
}

// Las puertas lacadas del templo se abren una vez por sesión
function usePuertas() {
  const [abrir] = React.useState(() => {
    try {
      if (reducido() || sessionStorage.getItem("pv_puertas")) return false;
      sessionStorage.setItem("pv_puertas", "1");
      return true;
    } catch {
      return false;
    }
  });
  return abrir;
}

const normalizar = (t) =>
  String(t || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[¡!¿?.,;:"'«»]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const TITULO = "El templo de los sonidos";

// Pronunciación: un solo templo. Nivel 1 = las seis salas con sus familias; nivel 2 = una familia con sus sílabas,
// y para cada sílaba sus palabras, frases y textos para escuchar, pronunciar y practicar.
export default function PronunciacionNuevaPage() {
  const [params, setParams] = useSearchParams();
  const familia = FAMILIAS.find((f) => f.id === params.get("f")) || null;
  const silaba = familia ? familia.silabas.find((s) => s.s === params.get("s")) || familia.silabas[0] : null;

  const [soloDificiles, setSoloDificiles] = React.useState(false);
  const [busqueda, setBusqueda] = React.useState("");
  const [oidas, oir] = useConjunto(CLAVES.oidas);
  const [dominadas, dominar] = useConjunto(CLAVES.dominadas);
  const [perfectas, perfecta] = useConjunto(CLAVES.perfectas);
  const [visitadas, visitar] = useConjunto(CLAVES.visitadas);
  const [recien, setRecien] = React.useState("");
  const [practica, setPractica] = React.useState(false);
  const voz = useVoz();
  const puertas = usePuertas();
  const raiz = React.useRef(null);

  const reproducir = React.useCallback(
    (texto, velocidad = 0.85) => {
      voz.hablar(texto, velocidad);
      oir(texto);
    },
    [voz.hablar, oir],
  );

  const ir = (f, s, { reemplazar = false } = {}) => {
    const siguiente = new URLSearchParams();
    if (f) siguiente.set("f", f.id);
    if (s) siguiente.set("s", s.s);
    setParams(siguiente, { replace: reemplazar });
    if (s) visitar(s.s);
    const caja = raiz.current?.getBoundingClientRect();
    if (caja && caja.top < 0) raiz.current.scrollIntoView({ block: "start", behavior: reducido() ? "auto" : "smooth" });
  };

  React.useEffect(() => {
    if (silaba) visitar(silaba.s);
  }, [silaba, visitar]);

  const oidasDe = (f) => f.silabas.filter((s) => oidas.has(s.s)).length;
  const dominadasDe = (f) => f.silabas.filter((s) => dominadas.has(s.s)).length;
  const escuchadas = new Set(TODAS.filter((x) => oidas.has(x.silaba.s)).map((x) => x.silaba.s)).size;
  const totalDominadas = new Set(TODAS.filter((x) => dominadas.has(x.silaba.s)).map((x) => x.silaba.s)).size;
  const porcentaje = Math.round((totalDominadas / TOTAL_SILABAS) * 100);
  const continuar = () => {
    const x = TODAS.find((y) => !visitadas.has(y.silaba.s)) || TODAS[0];
    ir(x.familia, x.silaba);
  };

  const alTerminarPractica = (correctas, total) => {
    if (silaba && total && correctas / total >= 0.7 && !dominadas.has(silaba.s)) {
      dominar(silaba.s);
      setRecien(silaba.s);
    }
  };

  return (
    <LightShell>
      <div ref={raiz} className="pv-root gm-no-adapt">
        <FondoTemplo />
        <div className="pv-contenido">
          {!familia ? (
            <Salas
              puertas={puertas}
              soloDificiles={soloDificiles}
              setSoloDificiles={setSoloDificiles}
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              oidasDe={oidasDe}
              dominadasDe={dominadasDe}
              escuchadas={escuchadas}
              totalDominadas={totalDominadas}
              porcentaje={porcentaje}
              visitadas={visitadas}
              continuar={continuar}
              ir={ir}
            />
          ) : (
            <Familia
              key={familia.id}
              familia={familia}
              silaba={silaba}
              voz={voz}
              reproducir={reproducir}
              oidas={oidas}
              dominadas={dominadas}
              perfectas={perfectas}
              perfecta={perfecta}
              recien={recien}
              ir={ir}
              practicar={() => setPractica(true)}
            />
          )}
        </div>
      </div>
      {practica &&
        familia &&
        silaba &&
        createPortal(<PracticePlayer item={silaba} familia={familia} onClose={() => setPractica(false)} onTerminar={alTerminarPractica} color={salaDeFamilia(familia.id).color} />, document.body)}
    </LightShell>
  );
}

/* ---------- Nivel 1: las salas ---------- */
function Salas({ puertas, soloDificiles, setSoloDificiles, busqueda, setBusqueda, oidasDe, dominadasDe, escuchadas, totalDominadas, porcentaje, visitadas, continuar, ir }) {
  const lista = FAMILIAS.filter((f) => !soloDificiles || f.dificil);
  const q = normalizar(busqueda);
  const encontradas = q
    ? [...TODAS.filter((x) => x.silaba.s.startsWith(q)), ...TODAS.filter((x) => !x.silaba.s.startsWith(q) && (x.silaba.s.includes(q) || normalizar(x.silaba.ej).includes(q)))]
    : [];
  return (
    <div className="pv-nivel pv-nivel--salas">
      <Link to="/dashboard" className="sh-back no-print jd-back pv-volver">
        <ArrowLeftIcon size={14} /> Inicio · 首页
      </Link>

      <section className={`pv-hero${puertas ? " con-puertas" : ""}`} aria-labelledby="pv-titulo">
        {puertas && (
          <div className="pv-puertas" aria-hidden="true">
            <span className="is-izq">
              <i translate="no">声</i>
            </span>
            <span className="is-der">
              <i translate="no">音</i>
            </span>
          </div>
        )}
        <div className="pv-hero__texto">
          <span className="pv-hero__ceja">
            <span className="pv-sello-mini" translate="no">
              音
            </span>
            Pronunciación · 发音
          </span>
          <h1 id="pv-titulo" className="pv-hero__titulo" aria-label={TITULO}>
            {TITULO.split(" ").map((palabra, p, palabras) => (
              <span key={p} className="pv-hero__palabra" aria-hidden="true">
                {[...palabra].map((letra, l) => (
                  <span key={l} className="pv-hero__letra" style={{ "--i": palabras.slice(0, p).join("").length + l }}>
                    {letra}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <div className="pv-hero__zh">声音殿堂</div>
          <p className="pv-hero__desc">
            {TOTAL_SILABAS} sílabas en {FAMILIAS.length} familias y {SALAS.length} salas, según dónde nace cada sonido. Entra en una familia, escucha cada sílaba con sus palabras, frases y textos, y graba tu voz: cada sílaba que dominas recibe el sello 印.
            <span>
              {TOTAL_SILABAS}个音节，分为{FAMILIAS.length}组、{SALAS.length}个殿堂，按发音部位划分。进入一组，听每个音节的单词、句子和短文，并录下你的声音：每掌握一个音节，就盖上一枚“印”章。
            </span>
          </p>
          <div className="pv-hero__acciones">
            <button type="button" className="jd-btn-oro pv-btn-oro" onClick={continuar}>
              <PlayIcon size={16} fill="currentColor" /> {visitadas.size ? "Continuar por donde ibas · 继续上次进度" : "Empezar · 开始"}
            </button>
          </div>
          <div className="pv-hero__stats">
            <span>
              <b>{FAMILIAS.length}</b> familias · 组
            </span>
            <span>
              <b>{DIFICILES}</b> difíciles · 难点
            </span>
            <span>
              <b>{escuchadas}</b>/{TOTAL_SILABAS} escuchadas · 已听
            </span>
          </div>
        </div>
        <div className="pv-hero__escena" aria-hidden="true">
          <svg className="pv-anillo" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" className="pv-anillo__fondo" />
            <circle cx="60" cy="60" r="54" className="pv-anillo__valor" style={{ "--p": porcentaje / 100 }} />
          </svg>
          <span className="pv-hero__halo" />
          <img className="pv-hero__nube" src="./theme/nube-oro.png" alt="" />
          <img className="pv-hero__mono" src="./mono/saluda.png" alt="" />
          <span className="pv-hero__dominio">
            <b>{totalDominadas}</b>
            <small>dominadas · 已掌握</small>
          </span>
        </div>
      </section>

      <div className="pv-barra">
        <div className="pv-filtro" role="tablist" aria-label="Filtro · 筛选">
          <button type="button" role="tab" aria-selected={!soloDificiles} className={!soloDificiles ? "is-on" : ""} onClick={() => setSoloDificiles(false)}>
            Todas · 全部 <span>{FAMILIAS.length}</span>
          </button>
          <button type="button" role="tab" aria-selected={soloDificiles} className={soloDificiles ? "is-on" : ""} onClick={() => setSoloDificiles(true)}>
            Difíciles para chinos · 难点 <span>{DIFICILES}</span>
          </button>
        </div>
        <label className="pt-buscar pv-buscar">
          <SearchIcon size={18} aria-hidden="true" />
          <input type="search" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar sílaba o palabra · 搜索音节" aria-label="Buscar sílaba o palabra · 搜索音节" />
          {busqueda && (
            <button type="button" onClick={() => setBusqueda("")} aria-label="Borrar · 清除">
              <XIcon size={16} />
            </button>
          )}
        </label>
      </div>

      {q ? (
        <section className="pv-resultados" aria-live="polite">
          {encontradas.length ? (
            encontradas.map(({ familia, silaba }, n) => {
              const sala = salaDeFamilia(familia.id);
              return (
                <button key={familia.id + silaba.s} type="button" className={`pt-ficha${visitadas.has(silaba.s) ? " is-visitada" : ""}`} style={{ "--i": n, "--sala": sala.color, "--tinta": sala.tinta }} onClick={() => ir(familia, silaba)}>
                  <span translate="no">{silaba.s}</span>
                  <small>{silaba.ej}</small>
                </button>
              );
            })
          ) : (
            <p className="pt-vacio">
              <img src="./mono/serio.png" alt="" /> No hay ninguna sílaba con «{busqueda}» · 没有找到这个音节
            </p>
          )}
        </section>
      ) : (
        <div className="pv-recinto">
          {SALAS.map((s, k) => {
            const familias = lista.filter((f) => s.familias.includes(f.id));
            if (!familias.length) return null;
            const total = familias.reduce((n, f) => n + f.silabas.length, 0);
            const oidasSala = familias.reduce((n, f) => n + oidasDe(f), 0);
            return (
              <section key={s.id} className="pv-pab" style={{ "--sala": s.color, "--tinta": s.tinta, "--k": k }} aria-label={`${s.es} · ${s.zh}`}>
                <div className="pv-pab__tejado" aria-hidden="true">
                  <svg viewBox="0 0 400 128">
                    <defs>
                      <linearGradient id="pvTeja" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#4a1420" />
                        <stop offset="1" stopColor="#1c0509" />
                      </linearGradient>
                      <pattern id="pvSurcos" width="9" height="40" patternUnits="userSpaceOnUse">
                        <rect width="9" height="40" fill="url(#pvTeja)" />
                        <rect x="0" width="3" height="40" fill="#6b2230" opacity=".7" />
                      </pattern>
                    </defs>
                    {/* tejado superior */}
                    <path d="M118 22 H282 L318 50 Q342 52 352 40 Q348 58 322 60 H78 Q52 58 48 40 Q58 52 82 50Z" fill="url(#pvSurcos)" stroke="#f2c14e" strokeWidth="1.5" />
                    <rect x="112" y="14" width="176" height="9" rx="3" fill="#f2c14e" stroke="#8a5a1e" />
                    <path d="M112 18 Q100 4 92 12 Q104 12 104 24Z M288 18 Q300 4 308 12 Q296 12 296 24Z" fill="#f2c14e" stroke="#8a5a1e" />
                    <circle cx="200" cy="10" r="6" fill="#f2c14e" stroke="#8a5a1e" />
                    {/* friso entre aleros */}
                    <rect x="92" y="60" width="216" height="12" fill="var(--sala)" stroke="#f2c14e" strokeWidth="1.2" />
                    {/* tejado inferior */}
                    <path d="M70 72 H330 L370 102 Q392 104 400 88 Q398 112 372 114 H28 Q2 112 0 88 Q8 104 30 102Z" fill="url(#pvSurcos)" stroke="#f2c14e" strokeWidth="1.5" />
                    <path d="M28 114 H372" stroke="#f2c14e" strokeWidth="3" />
                    {Array.from({ length: 23 }, (_, n) => (
                      <circle key={n} cx={35 + n * 15} cy="116" r="4" fill="#f2c14e" stroke="#8a5a1e" strokeWidth="1" />
                    ))}
                    <path d="M0 88 q-6 -10 2 -16 M400 88 q6 -10 -2 -16 M48 40 q-6 -9 1 -14 M352 40 q6 -9 -1 -14" stroke="#f2c14e" strokeWidth="3" fill="none" strokeLinecap="round" />
                  </svg>
                  <span className="pv-pab__farol is-izq">
                    <i />
                  </span>
                  <span className="pv-pab__farol is-der">
                    <i />
                  </span>
                </div>
                <div className="pv-pab__viga" aria-hidden="true" />
                <header className="pv-pab__placa">
                  <b translate="no">{s.zh}</b>
                  <h2>{s.es}</h2>
                </header>
                <div className="pv-pab__salon">
                  <span className="pv-pab__calado" aria-hidden="true" />
                  <span className="pv-pab__luz" aria-hidden="true" />
                  <p className="pv-pab__rasgo">
                    <i translate="no">{s.sello}</i> {s.rasgo} · {s.rasgoZh}
                  </p>
                  <div className="pv-pab__familias">
                    {familias.map((f, n) => {
                      const hechas = oidasDe(f);
                      const completa = dominadasDe(f) === f.silabas.length;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          className={`pv-medalla${completa ? " is-completa" : ""}`}
                          style={{ "--i": n, "--p": hechas / f.silabas.length }}
                          onClick={() => ir(f, f.silabas[0])}
                          aria-label={`${f.titulo}${f.dificil ? " · difícil · 难点" : ""} · ${hechas}/${f.silabas.length}`}
                        >
                          <span className="pv-medalla__aro" aria-hidden="true">
                            <span className="pv-medalla__cara">
                              <b translate="no">{letraDe(f)}</b>
                            </span>
                          </span>
                          <span className="pv-medalla__nombre">
                            {f.titulo}
                            <small>{f.tituloZh}</small>
                          </span>
                          {f.dificil && (
                            <i className="pv-medalla__dificil" translate="no" aria-hidden="true">
                              难
                            </i>
                          )}
                          {completa && <SelloEstampa texto="印" className="pv-medalla__sello is-quieto" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="pv-pab__terraza">
                  <span className="pv-pab__balaustrada" aria-hidden="true" />
                  <span className="pv-pab__cuenta">
                    {oidasSala}/{total} sílabas escuchadas · 已听音节
                  </span>
                  <span className="pv-pab__escalera" aria-hidden="true" />
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

const PESTANAS = [
  { clave: "palabras", es: "Palabras", zh: "单词", Icono: BookOpenIcon },
  { clave: "frases", es: "Frases", zh: "句子", Icono: MessageCircleIcon },
  { clave: "textos", es: "Textos", zh: "文本", Icono: FileTextIcon },
];

// Resalta la sílaba dentro de la palabra o la frase
function Resaltar({ texto, silaba }) {
  const i = texto.toLowerCase().indexOf(silaba.toLowerCase());
  if (i < 0) return texto;
  return (
    <>
      {texto.slice(0, i)}
      <mark className="pt-marca">{texto.slice(i, i + silaba.length)}</mark>
      {texto.slice(i + silaba.length)}
    </>
  );
}

/* ---------- Nivel 2: una familia y sus sílabas ---------- */
function Familia({ familia, silaba, voz, reproducir, oidas, dominadas, perfectas, perfecta, recien, ir, practicar }) {
  const sala = salaDeFamilia(familia.id);
  const indice = FAMILIAS.indexOf(familia);
  const anterior = FAMILIAS[(indice - 1 + FAMILIAS.length) % FAMILIAS.length];
  const siguiente = FAMILIAS[(indice + 1) % FAMILIAS.length];
  const { nivel, texto: sonando, hablar } = voz;
  const temporizadores = React.useRef([]);
  const [pestana, setPestana] = React.useState("palabras");
  const [direccion, setDireccion] = React.useState(1);
  const material = React.useMemo(() => materialDe(silaba), [silaba]);
  const hechas = familia.silabas.filter((s) => oidas.has(s.s)).length;
  const dom = familia.silabas.filter((s) => dominadas.has(s.s)).length;

  React.useEffect(() => () => temporizadores.current.forEach(clearTimeout), []);
  React.useEffect(() => setPestana("palabras"), [silaba]);

  const elegir = (s) => {
    temporizadores.current.forEach(clearTimeout);
    setDireccion(familia.silabas.indexOf(s) >= familia.silabas.indexOf(silaba) ? 1 : -1);
    ir(familia, s, { reemplazar: true });
    reproducir(s.s);
  };
  const reproducirFamilia = () => {
    temporizadores.current.forEach(clearTimeout);
    let espera = 0;
    temporizadores.current = familia.silabas.map((s) => {
      const t = setTimeout(() => reproducir(s.s), espera);
      espera += Math.max(1100, duracionVoz(s.s) + 250);
      return t;
    });
  };

  return (
    <div className="pv-nivel pv-nivel--familia" style={{ "--sala": sala.color, "--tinta": sala.tinta }}>
      <div className="pv-familia__nav">
        <button type="button" className="pv-nav-btn" onClick={() => ir(null, null)}>
          <LayoutGridIcon size={16} /> Las salas · 殿堂
        </button>
        <span>
          <button type="button" className="pv-nav-btn" onClick={() => ir(anterior, anterior.silabas[0])} aria-label={`Familia anterior: ${anterior.titulo} · 上一组`}>
            <ArrowLeftIcon size={16} /> <b translate="no">{letraDe(anterior)}</b>
          </button>
          <button type="button" className="pv-nav-btn" onClick={() => ir(siguiente, siguiente.silabas[0])} aria-label={`Familia siguiente: ${siguiente.titulo} · 下一组`}>
            <b translate="no">{letraDe(siguiente)}</b> <ArrowRightIcon size={16} />
          </button>
        </span>
      </div>

      <section className="pv-portico" aria-labelledby="pv-familia-titulo">
        <div className="pv-portico__escena" aria-hidden="true">
          <EscenaSala sala={sala} sonando={nivel > 0} />
        </div>
        <span className="pv-portico__sala">
          <i translate="no">{sala.sello}</i> {sala.es} · {sala.zh}
        </span>
        <div className="pv-portico__titulo">
          <span className="pv-portico__letra" translate="no">
            {letraDe(familia)}
          </span>
          <div>
            <h1 id="pv-familia-titulo">
              {familia.titulo} <span>{familia.tituloZh}</span>
            </h1>
            {familia.dificil ? (
              <span className="pv-chip is-laca">
                <i translate="no">难</i> Difícil para hablantes de chino · 中国学生难点
              </span>
            ) : (
              <span className="pv-chip">Sonido parecido al chino · 与汉语相近</span>
            )}
          </div>
        </div>
        <img className="pv-portico__mono" src={`./mono/${nivel > 0 ? "poder" : "guino"}.png`} alt="" />
        <span className="pv-portico__progreso" title="Escuchadas y dominadas · 已听 / 已掌握">
          <b>{hechas}</b>/{familia.silabas.length} escuchadas · 已听
          <small>
            印 {dom}/{familia.silabas.length} dominadas · 已掌握
          </small>
        </span>
      </section>

      <div className="pv-pergamino">
        <div className="pv-pergamino__cuerpo">
          <div className="pv-familia__guia">
            <div className={`pv-escenario__onda${nivel > 0 ? " is-viva" : ""}`}>
              <OndaViva nivel={nivel} color={sala.color} alto={84} />
              <span className="pv-escenario__sonando" aria-hidden="true">
                {nivel > 0 ? (
                  <>
                    <Volume2Icon size={16} /> <b translate="no">{sonando}</b>
                  </>
                ) : (
                  "Pulsa una sílaba para oírla · 点击音节试听"
                )}
              </span>
            </div>
            <div className="pv-consejo">
              <LightbulbIcon size={20} aria-hidden="true" />
              <div>
                <b>Consejo · 发音要诀</b>
                <p className="pv-consejo__es">{familia.pista || sala.pista}</p>
                <p>{familia.consejoZh}</p>
              </div>
            </div>
          </div>

          <div className="pv-botica">
            <div className="pv-botica__tejado" aria-hidden="true">
              <span>
                Botica de sílabas · <b translate="no">音节药柜</b>
              </span>
            </div>
            <div className="pv-botica__cajones" role="tablist" aria-label="Sílabas · 音节">
              {familia.silabas.map((s, n) => (
                <button
                  key={s.s}
                  type="button"
                  role="tab"
                  aria-selected={s === silaba}
                  style={{ "--i": n }}
                  className={`pv-cajon${s === silaba ? " is-on" : ""}${oidas.has(s.s) ? " is-oida" : ""}${dominadas.has(s.s) ? " is-dominada" : ""}${sonando === s.s ? " is-sonando" : ""}`}
                  onClick={() => elegir(s)}
                >
                  <span className="pv-cajon__hueco" aria-hidden="true" />
                  <span className="pv-cajon__frente">
                    <span className="pv-cajon__placa">
                      <b translate="no">{s.s}</b>
                      <small>{s.ej}</small>
                    </span>
                    <i className="pv-cajon__tirador" aria-hidden="true" />
                    <i className="pv-silaba__ondas" aria-hidden="true" />
                  </span>
                  {oidas.has(s.s) && (
                    <i className="pv-cajon__oida" aria-hidden="true">
                      ✓
                    </i>
                  )}
                  {dominadas.has(s.s) && <SelloEstampa texto="印" className={`pv-cajon__sello${recien === s.s ? "" : " is-quieto"}`} />}
                </button>
              ))}
              <button type="button" className="pv-cajon is-todas" onClick={reproducirFamilia}>
                <span className="pv-cajon__hueco" aria-hidden="true" />
                <span className="pv-cajon__frente">
                  <span className="pv-cajon__placa">
                    {nivel > 0 ? <SparklesIcon size={22} /> : <PlayIcon size={22} fill="currentColor" />}
                    <small>
                      Escuchar todas
                      <br />
                      连续播放
                    </small>
                  </span>
                  <i className="pv-cajon__tirador" aria-hidden="true" />
                </span>
              </button>
            </div>
          </div>

          <div key={silaba.s} className={`pv-detalle ${direccion < 0 ? "desde-izq" : "desde-der"}`}>
            <div className="pv-detalle__cabeza">
              <button type="button" className="pv-detalle__sello" onClick={() => reproducir(silaba.s, 0.8)} aria-label={`Escuchar «${silaba.s}» · 听`}>
                <span translate="no">{silaba.s}</span>
                <small>
                  <Volume2Icon size={14} /> Escuchar · 听
                </small>
              </button>
              <div className="pv-detalle__info">
                <Formula silaba={silaba.s} muda={familia.id === "h"} />
                <button type="button" className="pv-detalle__ej" onClick={() => reproducir(silaba.ej)}>
                  <b>
                    <Resaltar texto={silaba.ej} silaba={silaba.s} />
                  </b>
                  <small>{silaba.ejZh}</small>
                  <Volume2Icon size={16} aria-hidden="true" />
                </button>
                <div className="pv-detalle__botones">
                  <button type="button" className="pv-btn-laca" onClick={() => reproducir(silaba.s, 0.55)}>
                    <Volume1Icon size={17} /> Lento · 慢速
                  </button>
                  <button type="button" className="jd-btn-oro pv-btn-oro" onClick={practicar}>
                    <MicIcon size={17} /> Practicar con el Rey Mono · 跟练
                  </button>
                </div>
              </div>
              {dominadas.has(silaba.s) && <SelloEstampa texto="印" sub="dominada · 掌握" className={`pv-detalle__dominada${recien === silaba.s ? "" : " is-quieto"}`} />}
            </div>

            <div className="pt-pestanas" role="tablist">
              {PESTANAS.map(({ clave, es, zh, Icono }) => (
                <button key={clave} type="button" role="tab" aria-selected={pestana === clave} className={pestana === clave ? "is-on" : ""} onClick={() => setPestana(clave)} disabled={!material[clave].length}>
                  <Icono size={16} /> {es} · {zh} <span>{material[clave].length}</span>
                </button>
              ))}
            </div>

            <Lista key={pestana} tipo={pestana} items={material[pestana]} silaba={silaba} hablar={hablar} sonando={sonando} perfectas={perfectas} perfecta={perfecta} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Consonante + vocal = sílaba (la h muda, tachada)
function Formula({ silaba, muda }) {
  const vocal = silaba.match(/[aeiouáéíóú]+$/)?.[0] || "";
  const consonante = silaba.slice(0, silaba.length - vocal.length);
  return (
    <div className="pv-formula" aria-label={`${consonante} + ${vocal} = ${silaba}`}>
      <span className={`pv-formula__ficha is-cons${muda ? " is-muda" : ""}`} translate="no">
        {consonante}
      </span>
      <i>+</i>
      <span className="pv-formula__ficha is-vocal" translate="no">
        {vocal}
      </span>
      <i>=</i>
      <span className="pv-formula__ficha is-total" translate="no">
        {silaba}
      </span>
      <small>{muda ? "La h no suena · h不发音" : "consonante + vocal · 辅音 + 元音"}</small>
    </div>
  );
}

// Palabras, frases o textos de una sílaba: escuchar, lento, pronunciar (reconocimiento de voz) y favorito
function Lista({ tipo, items, silaba, hablar, sonando, perfectas, perfecta }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [escuchando, setEscuchando] = React.useState("");
  const [resultado, setResultado] = React.useState({});
  const reconocedor = React.useRef(null);
  React.useEffect(() => () => reconocedor.current?.abort?.(), []);

  const pronunciar = (objetivo) => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setResultado((r) => ({ ...r, [objetivo]: { estado: "sin", oido: "" } }));
      return;
    }
    if (escuchando === objetivo) {
      reconocedor.current?.stop?.();
      return;
    }
    reconocedor.current?.abort?.();
    const rec = new SR();
    reconocedor.current = rec;
    rec.lang = "es-ES";
    rec.continuous = false;
    rec.interimResults = false;
    rec.maxAlternatives = 3;
    setEscuchando(objetivo);
    setResultado((r) => ({ ...r, [objetivo]: undefined }));
    rec.onresult = (evento) => {
      const meta = normalizar(objetivo);
      const alternativas = [...evento.results[0]].map((alt) => normalizar(alt.transcript));
      const bien = alternativas.some((oido) => oido && (oido.includes(meta) || meta.includes(oido)));
      setResultado((r) => ({ ...r, [objetivo]: { estado: bien ? "ok" : "mal", oido: evento.results[0][0].transcript } }));
      if (bien) perfecta(objetivo);
    };
    rec.onerror = (e) => {
      if (e?.error === "no-speech") setResultado((r) => ({ ...r, [objetivo]: { estado: "mal", oido: "" } }));
      else if (e?.error && e.error !== "aborted") setResultado((r) => ({ ...r, [objetivo]: { estado: "sin", oido: "" } }));
    };
    rec.onend = () => setEscuchando((actual) => (actual === objetivo ? "" : actual));
    try {
      rec.start();
    } catch {
      setEscuchando("");
    }
  };

  const clase = tipo === "palabras" ? "palabra" : tipo === "frases" ? "frase" : "texto";
  return (
    <div className={`pt-lista pt-lista--${tipo}`}>
      {items.map(({ es, zh }, n) => {
        const r = resultado[es];
        const oyendo = escuchando === es;
        const bien = perfectas.has(es) || r?.estado === "ok";
        return (
          <article key={es} className={`pt-item pt-item--${clase}${bien ? " is-perfecta" : ""}${oyendo ? " is-escuchando" : ""}${sonando === es ? " is-sonando" : ""}`} style={{ "--i": n }}>
            <span className="pt-item__brillo" aria-hidden="true" />
            <span className="pt-item__n">{n + 1}</span>
            <p className="pt-item__es">
              <Resaltar texto={es} silaba={silaba.s} />
            </p>
            <p className="pt-item__zh">{zh}</p>
            <div className="pt-item__botones">
              <button type="button" onClick={() => hablar(es, 0.9)} aria-label={`Escuchar «${es}» · 听`}>
                <Volume2Icon size={16} /> Escuchar · 听
              </button>
              {clase !== "texto" && (
                <button type="button" className="is-lento" onClick={() => hablar(es, 0.55)} aria-label={`Lento «${es}» · 慢速`}>
                  <Volume1Icon size={16} />
                </button>
              )}
              <button type="button" className={`is-mic${oyendo ? " is-on" : ""}`} onClick={() => pronunciar(es)}>
                <MicIcon size={16} /> {oyendo ? "Te escucho… · 正在听" : "Pronunciar · 跟读"}
              </button>
              {clase === "palabra" && (
                <button
                  type="button"
                  className={`is-fav${isFavorite(es) ? " is-on" : ""}`}
                  onClick={() => (isFavorite(es) ? removeFavorite(es) : addFavorite(es, zh, `Pronunciación · ${silaba.s}`, "A1-B2"))}
                  aria-label="Favorito · 收藏"
                  aria-pressed={isFavorite(es)}
                >
                  <HeartIcon size={16} fill={isFavorite(es) ? "currentColor" : "none"} />
                </button>
              )}
            </div>
            {r?.estado === "mal" && <p className="pt-item__aviso is-mal">{r.oido ? `Te he oído «${r.oido}». ¡Otra vez! · 再试一次` : "No te he oído. ¡Otra vez! · 没听清，再试一次"}</p>}
            {r?.estado === "sin" && <p className="pt-item__aviso">Usa Chrome o Edge para el reconocimiento de voz · 请用 Chrome 或 Edge 进行语音识别</p>}
            {bien && <SelloEstampa texto="好" sub="¡Perfecto!" className={`pt-item__sello${r?.estado === "ok" ? "" : " is-quieto"}`} />}
          </article>
        );
      })}
    </div>
  );
}
