// v14 · Selector de temática (unidad / clase) común a los juegos clásicos del hub:
// Ruleta, Ahorcado, Memory, Sopa de letras, Palabra desordenada, Kahoot, Apalabrados y UNO.
// Pantalla tipo app: cabecera con el emblema del juego, búsqueda, chips de nivel A1–B2,
// «Todas las unidades» destacada y tarjetas con sello caligráfico, nivel, palabras y progreso.
import * as React from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router";
import {
  ArrowLeftIcon,
  SearchIcon,
  XIcon,
  LayersIcon,
  PlayIcon,
  ChevronRightIcon,
  DicesIcon,
  EyeIcon,
  Grid3x3Icon,
  ShuffleIcon,
  ZapIcon,
  HashIcon,
  CrownIcon,
  BookOpenIcon,
} from "lucide-react";
import CATALOGO from "../../data/modulos/catalog.json";
import { clasesDe, progresoUnidad } from "../../lib/clases.js";
import { getGame } from "../../lib/gamification.js";
import "../../styles/v14-fix-juegos.css";

const NIVELES = ["A1", "A2", "B1", "B2"];
const NIVEL_ZH = { A1: "入门", A2: "初级", B1: "中级", B2: "中高级" };

export const JUEGOS_CLASICOS = {
  ruleta: { titulo: "Ruleta de Palabras", tituloZh: "单词轮盘", sello: "轮", Icono: DicesIcon, desc: "Gira la ruleta y adivina la palabra letra a letra.", descZh: "转动轮盘，逐个字母猜出单词。" },
  ahorcado: { titulo: "Ahorcado", tituloZh: "猜词游戏", sello: "猜", Icono: EyeIcon, desc: "Adivina la palabra antes de que se acaben los intentos.", descZh: "在机会用完之前猜出单词。" },
  memory: { titulo: "Memory", tituloZh: "记忆配对", sello: "忆", Icono: Grid3x3Icon, desc: "Levanta las fichas y une cada palabra con su traducción.", descZh: "翻开卡片，把单词和翻译配成对。" },
  sopa: { titulo: "Sopa de Letras", tituloZh: "字母寻词", sello: "寻", Icono: SearchIcon, desc: "Encuentra las palabras escondidas en la cuadrícula.", descZh: "在字母方阵中找出隐藏的单词。" },
  scramble: { titulo: "Palabra Desordenada", tituloZh: "单词重组", sello: "序", Icono: ShuffleIcon, desc: "Ordena las letras y forma la palabra correcta.", descZh: "把字母排好，拼出正确的单词。" },
  kahoot: { titulo: "Kahoot Quiz", tituloZh: "抢答竞赛", sello: "答", Icono: ZapIcon, desc: "Responde rápido: cuanto antes aciertes, más puntos.", descZh: "快速作答，越快得分越高。" },
  apalabrados: { titulo: "Apalabrados", tituloZh: "拼字棋盘", sello: "字", Icono: HashIcon, desc: "Coloca fichas en el tablero y forma palabras en español.", descZh: "在棋盘上摆放字母，组成西班牙语单词。" },
  uno: { titulo: "UNO", tituloZh: "UNO 卡牌", sello: "牌", Icono: CrownIcon, desc: "El clásico de cartas: acierta la palabra para poder jugar tu carta.", descZh: "经典卡牌游戏：答对单词才能出牌。" },
};

const reducido = () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Unidad y clase que llegan en la ruta (#/juegos/x?m=N&clase=K) */
function leerRuta(search) {
  const params = new URLSearchParams(search);
  const numero = Number(params.get("m")) || null;
  const claseTexto = params.get("clase");
  const clase = claseTexto && claseTexto !== "unidad" ? Number(claseTexto) || null : null;
  return { numero, clase };
}

// Entrada de la ruta que ya arrancó una partida (por location.key): al volver al selector desde el juego
// no se vuelve a arrancar sola, pero una navegación nueva (otra clase, otra unidad) sí.
let entradaIniciada = null;

/** Sello rojo con caligrafía (número de unidad o carácter) */
export function SelloJuego({ children, grande = false, className = "" }) {
  return (
    <span className={`v14j-sello ${grande ? "v14j-sello--grande" : ""} ${className}`} translate="no" aria-hidden="true">
      {children}
    </span>
  );
}

/** Anillo de progreso dorado */
function AnilloProgreso({ pct }) {
  const r = 17;
  const c = 2 * Math.PI * r;
  return (
    <span className="v14j-anillo" aria-label={`Progreso ${pct}% · 进度`}>
      <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
        <circle cx="20" cy="20" r={r} className="v14j-anillo-fondo" />
        <circle cx="20" cy="20" r={r} className="v14j-anillo-valor" strokeDasharray={`${(c * pct) / 100} ${c}`} />
      </svg>
      <b>{pct}%</b>
    </span>
  );
}

/**
 * Pantalla de elección de temática.
 * - `juego`: clave de JUEGOS_CLASICOS.
 * - `onIniciar(moduloId | null)`: arranca la partida con la unidad (`modulo-N`) o con todas (null).
 *   Si la ruta trae ?clase=K, las utilidades de juegos ya filtran el vocabulario a esa clase.
 * - `error`: aviso (p. ej. la unidad no tiene palabras válidas para este juego).
 * - `sinUnidades`: el juego no se juega por unidad (Apalabrados): solo cabecera + `children`.
 */
export function SelectorTemaJuego({ juego, onIniciar, error = "", sinUnidades = false, children }) {
  const info = JUEGOS_CLASICOS[juego] || JUEGOS_CLASICOS.ruleta;
  const { Icono } = info;
  const location = useLocation();
  const navigate = useNavigate();
  const [nivel, setNivel] = React.useState("todos");
  const [busqueda, setBusqueda] = React.useState("");
  const [unidadAbierta, setUnidadAbierta] = React.useState(null);
  const iniciarRef = React.useRef(onIniciar);
  iniciarRef.current = onIniciar;
  const ruta = leerRuta(location.search);

  // Llegada desde una clase o una unidad (?m=N&clase=K): arranca directamente con ese contenido.
  // useLayoutEffect: antes de que el auto-clic heredado de App.jsx (PageTransition) pulse una tarjeta.
  React.useLayoutEffect(() => {
    if (sinUnidades || !ruta.numero) return;
    if (entradaIniciada === location.key) return;
    entradaIniciada = location.key;
    iniciarRef.current(`modulo-${ruta.numero}`);
  }, [location.key, ruta.numero, sinUnidades]);

  const progreso = React.useMemo(() => {
    const lecciones = getGame()?.lessons || {};
    const mapa = {};
    for (const u of CATALOGO) {
      try {
        mapa[u.numero] = progresoUnidad(u.numero, lecciones).pct;
      } catch {
        mapa[u.numero] = 0;
      }
    }
    return mapa;
  }, []);

  const unidades = React.useMemo(() => {
    const texto = busqueda
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "");
    return CATALOGO.filter((u) => (nivel === "todos" || u.nivel === nivel) && (!texto || `${u.numero} ${u.titulo} ${u.tituloChino}`.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").includes(texto)));
  }, [nivel, busqueda]);

  const cuentaNivel = React.useMemo(() => Object.fromEntries(NIVELES.map((n) => [n, CATALOGO.filter((u) => u.nivel === n).length])), []);

  const ir = (numero, clase) => {
    setUnidadAbierta(null);
    const destino = `?m=${numero}${clase ? `&clase=${clase}` : ""}`;
    if (destino === location.search) {
      entradaIniciada = location.key;
      iniciarRef.current(`modulo-${numero}`);
    } else {
      navigate(`${location.pathname}${destino}`);
    }
  };
  const irTodas = () => {
    if (location.search) navigate(location.pathname, { replace: true });
    iniciarRef.current(null);
  };
  const elegirUnidad = (u) => (clasesDe(u.numero).length > 1 ? setUnidadAbierta(u) : ir(u.numero, null));

  const unidadRuta = ruta.numero ? CATALOGO.find((u) => u.numero === ruta.numero) : null;
  const claseRuta = unidadRuta && ruta.clase ? clasesDe(unidadRuta.numero).find((c) => c.n === ruta.clase) : null;
  const animar = !reducido();

  return (
    <div className="v14j-selector gm-no-adapt" data-juego={juego}>
      <div className="v14j-barra">
        <Link to="/juegos" className="v14j-volver" aria-label="Volver a juegos · 返回游戏">
          <ArrowLeftIcon size={20} aria-hidden="true" />
          <span>Juegos · 游戏</span>
        </Link>
      </div>

      <header className="v14j-hero">
        <div className="v14j-emblema" aria-hidden="true">
          <span className="v14j-emblema-aro">
            <Icono size={30} strokeWidth={2.2} />
          </span>
          <SelloJuego grande>{info.sello}</SelloJuego>
        </div>
        <div className="v14j-hero-texto">
          <h1>{info.titulo}</h1>
          <p className="v14j-hero-zh" translate="no">
            {info.tituloZh}
          </p>
          <p className="v14j-hero-desc">
            {info.desc} <span>{info.descZh}</span>
          </p>
        </div>
      </header>

      {error && (
        <p className="v14j-error" role="alert">
          {error}
          <span> · 这个单元没有适合本游戏的单词，请换一个单元或选择「全部单元」。</span>
        </p>
      )}

      {sinUnidades ? (
        <div className="v14j-libre">{children}</div>
      ) : (
        <>
          {unidadRuta && (
            <button type="button" className="v14j-destacada v14j-destacada--clase" onClick={() => ir(unidadRuta.numero, ruta.clase)}>
              <SelloJuego>{unidadRuta.numero}</SelloJuego>
              <span className="v14j-destacada-txt">
                <small>{claseRuta ? `Tu clase · 你的课 · Clase ${claseRuta.n} · 第${claseRuta.n}课` : `Tu unidad · 你的单元`}</small>
                <b>{claseRuta?.titulo || unidadRuta.titulo}</b>
                <i translate="no">{claseRuta?.tituloChino || unidadRuta.tituloChino}</i>
              </span>
              <span className="v14j-jugar" aria-hidden="true">
                <PlayIcon size={20} fill="currentColor" />
              </span>
            </button>
          )}

          <button type="button" className="v14j-destacada" onClick={irTodas}>
            <SelloJuego>全</SelloJuego>
            <span className="v14j-destacada-txt">
              <small>Mezcla todo · 混合全部词汇</small>
              <b>Todas las unidades</b>
              <i translate="no">全部单元 · A1–B2</i>
            </span>
            <span className="v14j-jugar" aria-hidden="true">
              <LayersIcon size={20} />
            </span>
          </button>

          <div className="v14j-filtros">
            <label className="v14j-buscar">
              <SearchIcon size={18} aria-hidden="true" />
              <input type="search" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar tema o número · 搜索主题" aria-label="Buscar tema · 搜索主题" />
              {busqueda && (
                <button type="button" onClick={() => setBusqueda("")} aria-label="Borrar búsqueda · 清除">
                  <XIcon size={16} />
                </button>
              )}
            </label>
            <div className="v14j-chips" role="tablist" aria-label="Nivel · 级别">
              <button type="button" role="tab" aria-selected={nivel === "todos"} className={`v14j-chip ${nivel === "todos" ? "is-on" : ""}`} onClick={() => setNivel("todos")}>
                <b>Todos</b>
                <small>全部 · {CATALOGO.length}</small>
              </button>
              {NIVELES.map((n) => (
                <button key={n} type="button" role="tab" aria-selected={nivel === n} className={`v14j-chip ${nivel === n ? "is-on" : ""}`} onClick={() => setNivel(n)}>
                  <b>{n}</b>
                  <small>
                    {NIVEL_ZH[n]} · {cuentaNivel[n]}
                  </small>
                </button>
              ))}
            </div>
          </div>

          <ul className="v14j-lista" key={`${nivel}|${busqueda ? "q" : ""}`}>
            {unidades.map((u, i) => {
              const pct = progreso[u.numero] || 0;
              const nClases = clasesDe(u.numero).length;
              return (
                <li key={u.numero} className={animar ? "v14j-entra" : ""} style={{ "--i": Math.min(i, 14) }}>
                  <button type="button" className="v14j-tarjeta" onClick={() => elegirUnidad(u)}>
                    <SelloJuego>{u.numero}</SelloJuego>
                    <span className="v14j-tarjeta-txt">
                      <b>{u.titulo}</b>
                      <i translate="no">{u.tituloChino}</i>
                      <span className="v14j-meta">
                        <em className={`v14j-nivel v14j-nivel--${u.nivel}`}>{u.nivel}</em>
                        <span>
                          {u.vocabularioCount || 0} palabras · 词
                        </span>
                        {nClases > 1 && <span>{nClases} clases · 课</span>}
                      </span>
                    </span>
                    <AnilloProgreso pct={pct} />
                  </button>
                </li>
              );
            })}
          </ul>
          {unidades.length === 0 && (
            <p className="v14j-vacio">
              No hay temas con «{busqueda}» · 没有找到相关主题
            </p>
          )}
        </>
      )}

      {unidadAbierta &&
        createPortal(
          <div className="v14j-hoja-fondo gm-no-adapt" onClick={() => setUnidadAbierta(null)}>
            <div className="v14j-hoja" role="dialog" aria-modal="true" aria-label="Elegir clase · 选择课" onClick={(e) => e.stopPropagation()}>
              <span className="v14j-hoja-asa" aria-hidden="true" />
              <button type="button" className="v14j-hoja-cerrar" onClick={() => setUnidadAbierta(null)} aria-label="Cerrar · 关闭">
                <XIcon size={20} />
              </button>
              <div className="v14j-hoja-cab">
                <SelloJuego>{unidadAbierta.numero}</SelloJuego>
                <div>
                  <small>
                    {unidadAbierta.nivel} · Unidad {unidadAbierta.numero} · 第{unidadAbierta.numero}单元
                  </small>
                  <h2>{unidadAbierta.titulo}</h2>
                  <p translate="no">{unidadAbierta.tituloChino}</p>
                </div>
              </div>
              <p className="v14j-hoja-paso">¿Con qué palabras juegas? · 用哪些单词玩？</p>
              <div className="v14j-hoja-clases">
                {clasesDe(unidadAbierta.numero).map((c) => (
                  <button key={c.n} type="button" className="v14j-clase" onClick={() => ir(unidadAbierta.numero, c.n)}>
                    <span className="v14j-clase-n" translate="no">
                      第{c.n}课
                    </span>
                    <span className="v14j-clase-txt">
                      <b>{c.titulo || `Clase ${c.n}`}</b>
                      <small>
                        Clase {c.n} · {(c.vocabulario || []).length} palabras · 词{c.tituloChino ? ` · ${c.tituloChino}` : ""}
                      </small>
                    </span>
                    <ChevronRightIcon size={18} aria-hidden="true" />
                  </button>
                ))}
                <button type="button" className="v14j-clase v14j-clase--todo" onClick={() => ir(unidadAbierta.numero, null)}>
                  <span className="v14j-clase-n" aria-hidden="true">
                    <BookOpenIcon size={20} />
                  </span>
                  <span className="v14j-clase-txt">
                    <b>Toda la unidad</b>
                    <small>整个单元 · {unidadAbierta.vocabularioCount || 0} palabras · 词</small>
                  </span>
                  <ChevronRightIcon size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

/** Cinta con la unidad / clase de la partida en curso (para las fases de juego) */
export function CintaTemaJuego() {
  const location = useLocation();
  const { numero, clase } = leerRuta(location.search);
  const unidad = numero ? CATALOGO.find((u) => u.numero === numero) : null;
  if (!unidad) return null;
  const info = clase ? clasesDe(numero).find((c) => c.n === clase) : null;
  return (
    <p className="v14j-cinta gm-no-adapt">
      <span translate="no">{unidad.nivel}</span> Unidad {numero}
      {info ? ` · Clase ${info.n} · 第${info.n}课` : ` · 第${numero}单元`}
      <b>{info?.titulo || unidad.titulo}</b>
    </p>
  );
}
