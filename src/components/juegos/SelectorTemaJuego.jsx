// v18 · Selector de temática ÚNICO para todos los juegos del Pabellón (prefijo sj-):
// Ruleta, Ahorcado, Memory, Sopa, Palabra desordenada, Kahoot, Apalabrados, UNO (arrancan con onIniciar)
// y Dragón de jade, Escape del palacio, Mapa mental y Teatro de diálogos (navegan a ?m=N&clase=K).
// Portada del juego, modos (última · mezclar todas · mis unidades), mundos A1–B2, sellos de unidad
// con progreso, buscador y barra fija «¡A jugar!». Recuerda la última elección por juego.
import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  ArrowLeftIcon,
  SearchIcon,
  XIcon,
  PlayIcon,
  DicesIcon,
  EyeIcon,
  Grid3x3Icon,
  ShuffleIcon,
  ZapIcon,
  HashIcon,
  CrownIcon,
  NetworkIcon,
  DramaIcon,
  SparklesIcon,
  KeyRoundIcon,
  HistoryIcon,
  LayersIcon,
  CheckIcon,
  ClockIcon,
  TargetIcon,
} from "lucide-react";
import CATALOGO from "../../data/modulos/catalog.json";
import { clasesDe, progresoUnidad } from "../../lib/clases.js";
import { getGame } from "../../lib/gamification.js";
import { fijarMezcla, limpiarMezcla, mezclaActual } from "../../lib/mezclaJuego.js";
import { ESCENAS } from "../dele/EscenasNivel.jsx";
import { Portada } from "../../pages/juegos/PortadasJuegos.jsx";
import "../../styles/v14-fix-juegos.css";
import "../../styles/selector-juego.css";

const NIVELES = ["A1", "A2", "B1", "B2"];
const MUNDOS = {
  A1: { es: "Jardín de bambú", zh: "竹林", sello: "竹", zhNivel: "入门" },
  A2: { es: "Festival de linternas", zh: "灯会", sello: "灯", zhNivel: "初级" },
  B1: { es: "Montañas de tinta", zh: "墨山", sello: "墨", zhNivel: "中级" },
  B2: { es: "Ciudad Prohibida", zh: "紫禁城", sello: "宫", zhNivel: "中高级" },
};
const TONOS = { laca: "#c8102e", bronce: "#b8742a", noche: "#3a4f8f", jade: "#1f7a5a" };

/** Identidad de cada juego (la misma que en el Pabellón de juegos) */
export const JUEGOS_CLASICOS = {
  ruleta: { titulo: "Ruleta de Palabras", tituloZh: "单词轮盘", sello: "轮", Icono: DicesIcon, tono: "bronce", mono: "guino", habilidad: "Escucha · 听力", minutos: 5, desc: "Gira la ruleta y adivina la palabra letra a letra.", descZh: "转动轮盘，逐个字母猜出单词。" },
  ahorcado: { titulo: "Ahorcado", tituloZh: "猜词游戏", sello: "猜", Icono: EyeIcon, tono: "noche", mono: "serio", habilidad: "Ortografía · 拼写", minutos: 4, desc: "Adivina la palabra antes de que se acaben los intentos.", descZh: "在机会用完之前猜出单词。" },
  memory: { titulo: "Memory", tituloZh: "记忆配对", sello: "忆", Icono: Grid3x3Icon, tono: "jade", mono: "feliz", habilidad: "Memoria · 记忆", minutos: 5, desc: "Levanta las fichas y une cada palabra con su traducción.", descZh: "翻开卡片，把单词和翻译配成对。" },
  sopa: { titulo: "Sopa de Letras", tituloZh: "字母寻词", sello: "寻", Icono: SearchIcon, tono: "jade", mono: "saluda", habilidad: "Lectura · 认读", minutos: 6, desc: "Encuentra las palabras escondidas en la cuadrícula.", descZh: "在字母方阵中找出隐藏的单词。" },
  scramble: { titulo: "Palabra Desordenada", tituloZh: "单词重组", sello: "序", Icono: ShuffleIcon, tono: "laca", mono: "poder", habilidad: "Ortografía · 拼写", minutos: 4, desc: "Ordena las letras y forma la palabra correcta.", descZh: "把字母排好，拼出正确的单词。" },
  kahoot: { titulo: "Kahoot Quiz", tituloZh: "抢答竞赛", sello: "答", Icono: ZapIcon, tono: "laca", mono: "trofeo", habilidad: "Vocabulario · 词汇", minutos: 5, desc: "Responde rápido: cuanto antes aciertes, más puntos.", descZh: "快速作答，越快得分越高。" },
  apalabrados: { titulo: "Apalabrados", tituloZh: "拼字棋盘", sello: "字", Icono: HashIcon, tono: "bronce", mono: "serio", habilidad: "Estrategia · 策略", minutos: 10, desc: "Coloca fichas en el tablero y forma palabras en español.", descZh: "在棋盘上摆放字母，组成西班牙语单词。" },
  uno: { titulo: "UNO", tituloZh: "UNO 卡牌", sello: "牌", Icono: CrownIcon, tono: "noche", mono: "guino", habilidad: "Números y colores · 数字与颜色", minutos: 8, desc: "El clásico de cartas: acierta la palabra para poder jugar tu carta.", descZh: "经典卡牌游戏：答对单词才能出牌。" },
  "mapa-mental": { titulo: "Mapa mental", tituloZh: "思维导图", sello: "图", Icono: NetworkIcon, tono: "jade", mono: "saluda", habilidad: "Vocabulario y gramática · 词汇与语法", minutos: 8, desc: "Ordena el vocabulario de la clase en ramas, une español y chino o crea tu propio mapa.", descZh: "把词汇分到分支、连接中西文，或创作你自己的导图。" },
  teatro: { titulo: "Teatro de diálogos", tituloZh: "对话剧场", sello: "剧", Icono: DramaIcon, tono: "laca", mono: "feliz", habilidad: "Comprensión oral · 听说", minutos: 6, desc: "Sube al escenario: ordena el guion, elige la réplica correcta o dobla a un personaje.", descZh: "登上舞台：排列台词、选择回答，或为角色配音。" },
  "dragon-jade": { titulo: "Dragón de jade", tituloZh: "玉龙", sello: "龙", Icono: SparklesIcon, tono: "noche", mono: "poder", habilidad: "Vocabulario rápido · 快速词汇", minutos: 5, desc: "Guía al dragón y cómete las perlas con la traducción correcta.", descZh: "引导玉龙吃掉写着正确翻译的珍珠。" },
  "escape-palacio": { titulo: "Escape del palacio", tituloZh: "逃出紫禁城", sello: "门", Icono: KeyRoundIcon, tono: "bronce", mono: "serio", habilidad: "Repaso completo · 综合复习", minutos: 10, desc: "Abre las cinco puertas del palacio resolviendo enigmas con tu clase.", descZh: "用本课内容解开谜题，打开紫禁城的五道门。" },
};

const reducido = () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
const normalizar = (t) =>
  String(t || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/** Unidad y clase que llegan en la ruta (#/juegos/x?m=N&clase=K) */
function leerRuta(search) {
  const params = new URLSearchParams(search);
  const numero = Number(params.get("m")) || null;
  const claseTexto = params.get("clase");
  const clase = claseTexto && claseTexto !== "unidad" ? Number(claseTexto) || null : null;
  return { numero, clase };
}

// Última elección por juego (y una común como respaldo)
const claveUltima = (juego) => `dele_juego_ultima_${juego}`;
function leerUltima(juego) {
  for (const clave of [claveUltima(juego), "dele_juego_ultima"]) {
    try {
      const v = JSON.parse(localStorage.getItem(clave) || "null");
      if (v && (v.tipo === "todas" || v.tipo === "hechas" || (v.tipo === "unidad" && CATALOGO.some((u) => u.numero === v.numero)))) return v;
    } catch {}
  }
  return null;
}
function guardarUltima(juego, sel) {
  try {
    const texto = JSON.stringify(sel);
    localStorage.setItem(claveUltima(juego), texto);
    localStorage.setItem("dele_juego_ultima", texto);
  } catch {}
}

// Entrada de la ruta que ya arrancó una partida (por location.key): al volver al selector desde el juego
// no se vuelve a arrancar sola, pero una navegación nueva (otra clase, otra unidad) sí.
let entradaIniciada = null;

/** Sello rojo con caligrafía (número de unidad o carácter) */
export function SelloJuego({ children, grande = false, className = "" }) {
  return (
    <span className={`sj-sello ${grande ? "sj-sello--grande" : ""} ${className}`} translate="no" aria-hidden="true">
      {children}
    </span>
  );
}

const etiquetaSel = (sel, hechas) => {
  if (!sel) return { es: "Elige una unidad", zh: "请选择单元", sello: "?" };
  if (sel.tipo === "todas") return { es: "Mezcla de todas las unidades", zh: "全部单元混合 · A1–B2", sello: "全" };
  if (sel.tipo === "hechas") return { es: `Mis unidades (${hechas})`, zh: `我学过的单元 · ${hechas}个`, sello: "学" };
  const u = CATALOGO.find((x) => x.numero === sel.numero);
  const c = sel.clase ? clasesDe(sel.numero).find((x) => x.n === sel.clase) : null;
  return {
    es: `Unidad ${sel.numero} · ${c ? `Clase ${c.n}` : "Toda la unidad"}`,
    zh: `${u?.nivel || ""} · ${c ? `第${c.n}课 · ${c.tituloChino || c.titulo || ""}` : u?.tituloChino || ""}`,
    sello: sel.numero,
  };
};

/**
 * Pantalla de elección de temática, la misma para todos los juegos.
 * - `juego`: clave de JUEGOS_CLASICOS.
 * - `onIniciar(moduloId | null)`: arranca la partida con la unidad (`modulo-N`) o sin unidad (todas / mis unidades).
 *   Si no se pasa, el selector navega a ?m=N&clase=K (o ?m=todas si `permiteTodas`) y el juego lee la ruta.
 * - `permiteTodas`: ofrece «Mezclar todas» y «Mis unidades» (por defecto sí).
 * - `error`: aviso (p. ej. la unidad no tiene palabras válidas para este juego).
 * - `sinUnidades`: el juego no se juega por unidad (Apalabrados): portada + `children`.
 */
export function SelectorTemaJuego({ juego, onIniciar, error = "", sinUnidades = false, permiteTodas = true, children }) {
  const info = JUEGOS_CLASICOS[juego] || JUEGOS_CLASICOS.ruleta;
  const { Icono } = info;
  const location = useLocation();
  const navigate = useNavigate();
  const ruta = leerRuta(location.search);
  const porRuta = typeof onIniciar !== "function";
  const iniciarRef = React.useRef(onIniciar);
  iniciarRef.current = onIniciar;
  const animar = !reducido();

  // Llegada desde una clase o una unidad (?m=N&clase=K): los juegos con onIniciar arrancan directamente.
  React.useLayoutEffect(() => {
    if (porRuta || sinUnidades || !ruta.numero) return;
    if (entradaIniciada === location.key) return;
    entradaIniciada = location.key;
    iniciarRef.current(`modulo-${ruta.numero}`);
  }, [location.key, ruta.numero, sinUnidades, porRuta]);

  const progreso = React.useMemo(() => {
    const lecciones = getGame()?.lessons || {};
    const mapa = {};
    for (const u of CATALOGO) {
      try {
        const p = progresoUnidad(u.numero, lecciones);
        mapa[u.numero] = { pct: p.pct, completa: p.completa };
      } catch {
        mapa[u.numero] = { pct: 0, completa: false };
      }
    }
    return mapa;
  }, []);
  const hechas = React.useMemo(() => CATALOGO.filter((u) => progreso[u.numero]?.pct > 0).map((u) => u.numero), [progreso]);

  const ultima = React.useMemo(() => leerUltima(juego), [juego]);
  const [sel, setSel] = React.useState(() => {
    if (ruta.numero) return { tipo: "unidad", numero: ruta.numero, clase: ruta.clase };
    if (ultima && (permiteTodas || ultima.tipo === "unidad") && (ultima.tipo !== "hechas" || hechas.length)) return ultima;
    return permiteTodas ? { tipo: "todas" } : null;
  });
  const unidadSel = sel?.tipo === "unidad" ? CATALOGO.find((u) => u.numero === sel.numero) : null;
  const [nivel, setNivel] = React.useState(() => unidadSel?.nivel || "A1");
  const [busqueda, setBusqueda] = React.useState("");
  const buscarRef = React.useRef(null);
  const [pulso, setPulso] = React.useState(0);

  const unidades = React.useMemo(() => {
    const texto = normalizar(busqueda.trim());
    if (texto) return CATALOGO.filter((u) => normalizar(`${u.numero} ${u.titulo} ${u.tituloChino}`).includes(texto));
    return CATALOGO.filter((u) => u.nivel === nivel);
  }, [nivel, busqueda]);
  const cuentaNivel = React.useMemo(
    () => Object.fromEntries(NIVELES.map((n) => [n, { total: CATALOGO.filter((u) => u.nivel === n).length, hechas: CATALOGO.filter((u) => u.nivel === n && progreso[u.numero]?.pct > 0).length }])),
    [progreso],
  );

  // «/» enfoca el buscador; Esc lo vacía
  React.useEffect(() => {
    if (sinUnidades) return;
    const tecla = (e) => {
      if (e.key === "/" && !/input|textarea|select/i.test(document.activeElement?.tagName || "")) {
        e.preventDefault();
        buscarRef.current?.focus();
      }
    };
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, [sinUnidades]);

  const jugar = (eleccion = sel) => {
    if (!eleccion) return;
    guardarUltima(juego, eleccion);
    if (eleccion.tipo === "unidad") {
      const destino = `?m=${eleccion.numero}${eleccion.clase ? `&clase=${eleccion.clase}` : ""}`;
      if (porRuta) {
        navigate(`${location.pathname}${destino}`);
      } else if (destino === location.search) {
        entradaIniciada = location.key;
        iniciarRef.current(`modulo-${eleccion.numero}`);
      } else {
        navigate(`${location.pathname}${destino}`);
      }
      return;
    }
    if (eleccion.tipo === "hechas" && hechas.length) fijarMezcla(hechas);
    else limpiarMezcla();
    if (porRuta) {
      navigate(`${location.pathname}?m=todas`);
    } else {
      if (location.search) navigate(location.pathname, { replace: true });
      iniciarRef.current(null);
    }
  };

  const elegirUnidad = (u) => {
    // Segundo toque sobre la unidad ya elegida: a jugar
    if (sel?.tipo === "unidad" && sel.numero === u.numero) return jugar(sel);
    setSel({ tipo: "unidad", numero: u.numero, clase: null });
    setPulso((n) => n + 1);
  };

  // Flechas en los mundos (patrón tablist)
  const teclaMundos = (e) => {
    const i = NIVELES.indexOf(nivel);
    let j = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") j = (i + 1) % NIVELES.length;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") j = (i + NIVELES.length - 1) % NIVELES.length;
    if (e.key === "Home") j = 0;
    if (e.key === "End") j = NIVELES.length - 1;
    if (j === null) return;
    e.preventDefault();
    setNivel(NIVELES[j]);
    setBusqueda("");
    e.currentTarget.querySelectorAll('[role="tab"]')[j]?.focus();
  };

  const clasesSel = unidadSel ? clasesDe(unidadSel.numero) : [];
  const etiqueta = etiquetaSel(sel, hechas.length);
  const Escena = ESCENAS[nivel] || ESCENAS.A1;
  const mundo = MUNDOS[nivel];
  const ultimaEtiqueta = ultima ? etiquetaSel(ultima, hechas.length) : null;
  const esUltima = ultima && sel && JSON.stringify(ultima) === JSON.stringify(sel);

  return (
    <div className={`sj-raiz gm-no-adapt ${animar ? "sj-anima" : ""}`} data-juego={juego} data-nivel={nivel} style={{ "--sj-acento": TONOS[info.tono] || TONOS.laca }}>
      <div className="sj-barra">
        <Link to="/juegos" className="sj-volver" aria-label="Volver a juegos · 返回游戏">
          <ArrowLeftIcon size={20} aria-hidden="true" />
          <span>Juegos · 游戏</span>
        </Link>
      </div>

      <header className="sj-hero">
        <div className="sj-portada">
          <Portada id={juego} className="is-grande" />
          <span className="sj-portada-marco" aria-hidden="true" />
          <SelloJuego grande className="sj-portada-sello">
            {info.sello}
          </SelloJuego>
        </div>
        <div className="sj-hero-txt">
          <p className="sj-kicker">
            <Icono size={16} aria-hidden="true" /> Pabellón de juegos · <span translate="no">游戏馆</span>
          </p>
          <h1>{info.titulo}</h1>
          <p className="sj-hero-zh" translate="no">
            {info.tituloZh}
          </p>
          <p className="sj-hero-desc">
            {info.desc} <span>{info.descZh}</span>
          </p>
          <ul className="sj-datos">
            <li>
              <TargetIcon size={14} aria-hidden="true" /> {info.habilidad}
            </li>
            <li>
              <ClockIcon size={14} aria-hidden="true" /> {info.minutos} min · 分钟
            </li>
          </ul>
        </div>
        <img className="sj-mono" src={`./mono/${info.mono}.png`} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      </header>

      {error && (
        <p className="sj-error" role="alert">
          {error}
          <span> · 这个单元没有适合本游戏的单词，请换一个单元或选择「全部混合」。</span>
        </p>
      )}

      {sinUnidades ? (
        <div className="sj-libre">{children}</div>
      ) : (
        <>
          <h2 className="sj-paso">
            <span className="sj-paso-n" translate="no">
              一
            </span>
            ¿Con qué palabras juegas? <span translate="no">用哪些单词玩？</span>
          </h2>

          <div className="sj-modos" role="radiogroup" aria-label="Modo de juego · 游戏模式">
            {ultimaEtiqueta && ultima.tipo === "unidad" && (
              <button type="button" role="radio" aria-checked={!!esUltima} className={`sj-modo ${esUltima ? "is-on" : ""}`} onClick={() => (esUltima ? jugar(ultima) : (setSel(ultima), setNivel(CATALOGO.find((u) => u.numero === ultima.numero)?.nivel || nivel)))}>
                <span className="sj-modo-ico" aria-hidden="true">
                  <HistoryIcon size={22} />
                </span>
                <span className="sj-modo-txt">
                  <small>La última · 上次选择</small>
                  <b>{ultimaEtiqueta.es}</b>
                  <i translate="no">{ultimaEtiqueta.zh}</i>
                </span>
              </button>
            )}
            {permiteTodas && (
              <button type="button" role="radio" aria-checked={sel?.tipo === "todas"} className={`sj-modo ${sel?.tipo === "todas" ? "is-on" : ""}`} onClick={() => (sel?.tipo === "todas" ? jugar() : setSel({ tipo: "todas" }))}>
                <span className="sj-modo-ico" aria-hidden="true">
                  <LayersIcon size={22} />
                </span>
                <span className="sj-modo-txt">
                  <small>A1–B2 · {CATALOGO.length} unidades</small>
                  <b>Mezclar todas</b>
                  <i translate="no">全部混合</i>
                </span>
              </button>
            )}
            {permiteTodas && (
              <button
                type="button"
                role="radio"
                aria-checked={sel?.tipo === "hechas"}
                disabled={!hechas.length}
                className={`sj-modo ${sel?.tipo === "hechas" ? "is-on" : ""}`}
                onClick={() => (sel?.tipo === "hechas" ? jugar() : setSel({ tipo: "hechas" }))}
              >
                <span className="sj-modo-ico" aria-hidden="true">
                  <CheckIcon size={22} />
                </span>
                <span className="sj-modo-txt">
                  <small>{hechas.length ? `${hechas.length} unidades empezadas · 已学${hechas.length}个` : "Aún ninguna · 还没有开始"}</small>
                  <b>Unidades que ya he hecho</b>
                  <i translate="no">我学过的单元</i>
                </span>
              </button>
            )}
          </div>

          <h2 className="sj-paso">
            <span className="sj-paso-n" translate="no">
              二
            </span>
            {permiteTodas ? "O elige una unidad" : "Elige una unidad"} <span translate="no">{permiteTodas ? "或选择一个单元" : "选择一个单元"}</span>
          </h2>

          <div className="sj-mundos" role="tablist" aria-label="Nivel · 级别" onKeyDown={teclaMundos}>
            {NIVELES.map((n) => (
              <button
                key={n}
                type="button"
                role="tab"
                aria-selected={nivel === n && !busqueda}
                tabIndex={nivel === n ? 0 : -1}
                className={`sj-mundo sj-mundo--${n} ${nivel === n && !busqueda ? "is-on" : ""}`}
                onClick={() => {
                  setNivel(n);
                  setBusqueda("");
                }}
              >
                <span className="sj-mundo-sello" translate="no" aria-hidden="true">
                  {MUNDOS[n].sello}
                </span>
                <span className="sj-mundo-txt">
                  <b>{n}</b>
                  <small>
                    {MUNDOS[n].es} · <span translate="no">{MUNDOS[n].zh}</span>
                  </small>
                </span>
                <span className="sj-mundo-cuenta">
                  {cuentaNivel[n].hechas}/{cuentaNivel[n].total}
                </span>
              </button>
            ))}
          </div>

          <section className="sj-panel" aria-label={`${mundo.es} · ${mundo.zh}`}>
            <div className="sj-panorama" key={busqueda ? "q" : nivel} aria-hidden="true">
              <Escena />
            </div>
            <div className="sj-panel-cab">
              <div className="sj-panel-titulo">
                {busqueda ? (
                  <>
                    <b>Resultados · 搜索结果</b>
                    <small>
                      {unidades.length} unidades · {unidades.length}个单元
                    </small>
                  </>
                ) : (
                  <>
                    <b>
                      {nivel} · {mundo.es}
                    </b>
                    <small translate="no">
                      {mundo.zhNivel} · {mundo.zh}
                    </small>
                  </>
                )}
              </div>
              <label className="sj-buscar">
                <SearchIcon size={18} aria-hidden="true" />
                <input
                  ref={buscarRef}
                  type="search"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  onKeyDown={(e) => e.key === "Escape" && setBusqueda("")}
                  placeholder="Buscar tema o número · 搜索主题"
                  aria-label="Buscar tema · 搜索主题"
                />
                {busqueda ? (
                  <button type="button" onClick={() => setBusqueda("")} aria-label="Borrar búsqueda · 清除">
                    <XIcon size={16} />
                  </button>
                ) : (
                  <kbd aria-hidden="true">/</kbd>
                )}
              </label>
            </div>

            <ul className="sj-unidades" key={`${nivel}|${busqueda ? "q" : ""}`}>
              {unidades.map((u, i) => {
                const p = progreso[u.numero] || { pct: 0 };
                const elegida = sel?.tipo === "unidad" && sel.numero === u.numero;
                const [principal, sub] = String(u.titulo).split(/\s+-\s+/);
                return (
                  <li key={u.numero} style={{ "--i": Math.min(i, 18) }}>
                    <button type="button" className={`sj-unidad ${elegida ? "is-on" : ""} ${p.completa ? "is-hecha" : ""}`} aria-pressed={elegida} onClick={() => elegirUnidad(u)}>
                      <span className="sj-unidad-sello" translate="no" aria-hidden="true">
                        <span>{u.numero}</span>
                      </span>
                      <span className="sj-unidad-txt">
                        <b>{principal}</b>
                        {sub && <small>{sub}</small>}
                        <i translate="no">{u.tituloChino}</i>
                      </span>
                      <span className="sj-unidad-pie">
                        <em className={`sj-nivel sj-nivel--${u.nivel}`}>{u.nivel}</em>
                        <span>{u.vocabularioCount || 0} palabras · 词</span>
                        <span className="sj-progreso" aria-label={`Progreso ${p.pct}% · 进度`}>
                          <span style={{ width: `${p.pct}%` }} />
                        </span>
                      </span>
                      {p.completa && (
                        <span className="sj-unidad-hecha" aria-label="Completada · 已完成">
                          <CheckIcon size={14} strokeWidth={3} />
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
            {unidades.length === 0 && <p className="sj-vacio">No hay temas con «{busqueda}» · 没有找到相关主题</p>}
          </section>

          <div className={`sj-accion ${pulso % 2 ? "is-pulso-a" : pulso ? "is-pulso-b" : ""}`} role="region" aria-label="Tu elección · 你的选择">
            <div className="sj-accion-sel">
              <SelloJuego className="sj-accion-sello">{etiqueta.sello}</SelloJuego>
              <span className="sj-accion-txt">
                <small>Vas a jugar con · 你将使用</small>
                <b>{etiqueta.es}</b>
                <i translate="no">{etiqueta.zh}</i>
              </span>
            </div>
            {clasesSel.length > 1 && (
              <div className="sj-clases" role="radiogroup" aria-label="Clase · 课">
                <button type="button" role="radio" aria-checked={!sel.clase} className={`sj-clase ${!sel.clase ? "is-on" : ""}`} onClick={() => setSel({ ...sel, clase: null })}>
                  <b>Toda</b>
                  <small translate="no">整个单元</small>
                </button>
                {clasesSel.map((c) => (
                  <button key={c.n} type="button" role="radio" aria-checked={sel.clase === c.n} className={`sj-clase ${sel.clase === c.n ? "is-on" : ""}`} onClick={() => setSel({ ...sel, clase: c.n })} title={`${c.titulo || ""} ${c.tituloChino || ""}`}>
                    <b>Clase {c.n}</b>
                    <small translate="no">第{c.n}课</small>
                  </button>
                ))}
              </div>
            )}
            <button type="button" className="sj-jugar" disabled={!sel} onClick={() => jugar()}>
              <PlayIcon size={22} fill="currentColor" aria-hidden="true" />
              <span>
                <b>¡A jugar!</b>
                <small translate="no">开始游戏</small>
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/** Cinta con la unidad / clase de la partida en curso (para las fases de juego) */
export function CintaTemaJuego() {
  const location = useLocation();
  const { numero, clase } = leerRuta(location.search);
  const unidad = numero ? CATALOGO.find((u) => u.numero === numero) : null;
  // La marca (oculta) permite aplicar el tema imperial v14 solo a los juegos clásicos (.app-stage:has(.v14j-marca))
  if (!unidad) {
    const mezcla = mezclaActual();
    if (!mezcla) return <span className="v14j-marca" hidden />;
    return (
      <p className="v14j-cinta v14j-marca gm-no-adapt">
        <span translate="no">学</span> Mis unidades · 我学过的单元 <b>{mezcla.size}</b>
      </p>
    );
  }
  const info = clase ? clasesDe(numero).find((c) => c.n === clase) : null;
  return (
    <p className="v14j-cinta v14j-marca gm-no-adapt">
      <span translate="no">{unidad.nivel}</span> Unidad {numero}
      {info ? ` · Clase ${info.n} · 第${info.n}课` : ` · 第${numero}单元`}
      <b>{info?.titulo || unidad.titulo}</b>
    </p>
  );
}
