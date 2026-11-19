import {
  ZapIcon,
  EyeIcon,
  Grid3x3Icon,
  ShuffleIcon,
  SearchIcon,
  HashIcon,
  CrownIcon,
  DicesIcon,
  Dice5Icon,
  PlayIcon,
  ClockIcon,
  SparklesIcon,
  HistoryIcon,
  XIcon,
  ArrowLeftIcon,
  NetworkIcon,
  DramaIcon,
  KeyRoundIcon,
  LayersIcon,
  TypeIcon,
  SpadeIcon,
  CompassIcon,
} from "lucide-react";
import * as React from "react";
import { flushSync } from "react-dom";
import { Link, useNavigate } from "react-router";
import { LightShell } from "../../components/layout/LightShell.jsx";
import { Portada } from "./PortadasJuegos.jsx";
import "../../styles/juegos-hub.css";
import "../../styles/movil-juegos.css";

// Los juegos de la app (el resto se retiró para quedarnos solo con los mejores).
// `gradient` e `icon` los usa también la pestaña de juegos de cada unidad (UnitPage).
export const READY_GAMES = new Set([
  "/juegos/kahoot",
  "/juegos/memory",
  "/juegos/ruleta",
  "/juegos/uno",
  "/juegos/scramble",
  "/juegos/sopa",
  "/juegos/ahorcado",
  "/juegos/apalabrados",
  "/juegos/mapa-mental",
  "/juegos/teatro",
  "/juegos/dragon-jade",
  "/juegos/escape-palacio",
  "/juegos/brisca",
]);

// Tonos de laca para los medallones (coherentes con la estética imperial)
const TONOS = {
  laca: "linear-gradient(145deg,#e0485a,#c8102e 45%,#8f0c21)",
  jade: "linear-gradient(145deg,#4fae78,#2f8f52 45%,#1d6339)",
  noche: "linear-gradient(145deg,#2c4f8f,#1d3768 45%,#0e1a33)",
  bronce: "linear-gradient(145deg,#e7b54a,#c8961e 45%,#8a5a1e)",
};

const CATEGORIAS = [
  { key: "todos", es: "Todos", zh: "全部" },
  { key: "concurso", es: "Concurso", zh: "竞答" },
  { key: "letras", es: "Letras", zh: "字母" },
  { key: "mesa", es: "Mesa y cartas", zh: "棋牌" },
  { key: "aventura", es: "Aventura", zh: "冒险" },
];

const NIVELES = {
  1: { es: "Fácil", zh: "简单" },
  2: { es: "Medio", zh: "中等" },
  3: { es: "Reto", zh: "挑战" },
};

const JUEGOS = [
  {
    id: "kahoot",
    name: "Kahoot Quiz",
    nameCn: "抢答竞赛",
    desc: "Responde rápido preguntas de vocabulario y suma puntos por velocidad.",
    descCn: "快速回答词汇题，越快得分越高。",
    icon: ZapIcon,
    sello: "答",
    tono: "laca",
    category: "concurso",
    habilidad: { es: "Vocabulario", zh: "词汇" },
    nivel: 2,
    minutos: 5,
    jugadores: "1",
    path: "/juegos/kahoot",
  },
  {
    id: "ruleta",
    name: "Ruleta de Palabras",
    nameCn: "单词轮盘",
    desc: "Gira la ruleta, escucha la palabra y elige su traducción.",
    descCn: "转动轮盘，听单词并选出翻译。",
    icon: DicesIcon,
    sello: "轮",
    tono: "bronce",
    category: "concurso",
    habilidad: { es: "Escucha", zh: "听力" },
    nivel: 1,
    minutos: 5,
    jugadores: "1",
    path: "/juegos/ruleta",
  },
  {
    id: "ahorcado",
    name: "Ahorcado",
    nameCn: "猜词游戏",
    desc: "Adivina la palabra letra a letra antes de que se acaben los intentos.",
    descCn: "一个字母一个字母地猜出单词。",
    icon: EyeIcon,
    sello: "猜",
    tono: "noche",
    category: "letras",
    habilidad: { es: "Ortografía", zh: "拼写" },
    nivel: 2,
    minutos: 4,
    jugadores: "1",
    path: "/juegos/ahorcado",
  },
  {
    id: "sopa",
    name: "Sopa de Letras",
    nameCn: "字母寻词",
    desc: "Encuentra las palabras escondidas en la cuadrícula.",
    descCn: "在字母方阵里找出隐藏的单词。",
    icon: SearchIcon,
    sello: "寻",
    tono: "jade",
    category: "letras",
    habilidad: { es: "Lectura", zh: "认读" },
    nivel: 1,
    minutos: 6,
    jugadores: "1",
    path: "/juegos/sopa",
  },
  {
    id: "scramble",
    name: "Palabra Desordenada",
    nameCn: "单词重组",
    desc: "Ordena las letras y forma la palabra correcta.",
    descCn: "把打乱的字母排成正确的单词。",
    icon: ShuffleIcon,
    sello: "序",
    tono: "laca",
    category: "letras",
    habilidad: { es: "Ortografía", zh: "拼写" },
    nivel: 2,
    minutos: 4,
    jugadores: "1",
    path: "/juegos/scramble",
  },
  {
    id: "memory",
    name: "Memory Match",
    nameCn: "记忆配对",
    desc: "Levanta las fichas y une cada palabra con su traducción.",
    descCn: "翻开卡片，把单词和翻译配成一对。",
    icon: Grid3x3Icon,
    sello: "忆",
    tono: "jade",
    category: "mesa",
    habilidad: { es: "Memoria", zh: "记忆" },
    nivel: 1,
    minutos: 5,
    jugadores: "1",
    path: "/juegos/memory",
  },
  {
    id: "apalabrados",
    name: "Apalabrados",
    nameCn: "拼字棋盘",
    desc: "Coloca letras en el tablero y forma palabras con casillas de bonus.",
    descCn: "在棋盘上摆字母组词，争取加分格。",
    icon: HashIcon,
    sello: "字",
    tono: "bronce",
    category: "mesa",
    habilidad: { es: "Estrategia", zh: "策略" },
    nivel: 3,
    minutos: 10,
    jugadores: "1–2",
    path: "/juegos/apalabrados",
  },
  {
    id: "uno",
    name: "UNO",
    nameCn: "UNO 卡牌",
    desc: "El clásico de cartas en español: colores, números y cartas especiales.",
    descCn: "西班牙语版经典卡牌：颜色、数字和功能牌。",
    icon: CrownIcon,
    sello: "牌",
    tono: "noche",
    category: "mesa",
    habilidad: { es: "Números y colores", zh: "数字与颜色" },
    nivel: 2,
    minutos: 8,
    jugadores: "1–2",
    path: "/juegos/uno",
  },
  {
    id: "mapa-mental",
    name: "Mapa mental",
    nameCn: "思维导图",
    desc: "Arrastra las palabras de la clase a su rama y únelas con flechas, o crea tu propio mapa y expórtalo.",
    descCn: "把本课单词拖到对应分支并连线，或创作自己的导图并导出。",
    icon: NetworkIcon,
    sello: "图",
    tono: "jade",
    category: "aventura",
    habilidad: { es: "Vocabulario y gramática", zh: "词汇与语法" },
    nivel: 2,
    minutos: 8,
    jugadores: "1",
    path: "/juegos/mapa-mental",
  },
  {
    id: "teatro",
    name: "Teatro de diálogos",
    nameCn: "对话剧场",
    desc: "Sube el telón: ordena el guion, elige la réplica correcta o dobla a un personaje con tu voz.",
    descCn: "拉开帷幕：排列台词、选择正确回答，或用你的声音为角色配音。",
    icon: DramaIcon,
    sello: "剧",
    tono: "laca",
    category: "aventura",
    habilidad: { es: "Comprensión y expresión oral", zh: "听说" },
    nivel: 2,
    minutos: 6,
    jugadores: "1",
    path: "/juegos/teatro",
  },
  {
    id: "dragon-jade",
    name: "Dragón de jade",
    nameCn: "玉龙",
    desc: "Guía al dragón por el cielo nocturno y cómete las perlas con la traducción correcta.",
    descCn: "引导玉龙穿越夜空，吃掉写着正确翻译的珍珠。",
    icon: SparklesIcon,
    sello: "龙",
    tono: "noche",
    category: "aventura",
    habilidad: { es: "Vocabulario rápido", zh: "快速词汇" },
    nivel: 3,
    minutos: 5,
    jugadores: "1",
    path: "/juegos/dragon-jade",
  },
  {
    id: "escape-palacio",
    name: "Escape del palacio",
    nameCn: "逃出紫禁城",
    desc: "Abre las cinco puertas del palacio resolviendo puzles con el contenido de la clase.",
    descCn: "用本课内容解开谜题，打开紫禁城的五道门。",
    icon: KeyRoundIcon,
    sello: "门",
    tono: "bronce",
    category: "aventura",
    habilidad: { es: "Repaso completo", zh: "综合复习" },
    nivel: 3,
    minutos: 10,
    jugadores: "1",
    path: "/juegos/escape-palacio",
  },
  {
    id: "brisca",
    name: "Brisca del Rey Mono",
    nameCn: "美猴王纸牌",
    desc: "La baraja española contra el Rey Mono: cada carta trae un reto de tu clase y aprendes oros, copas, espadas y bastos.",
    descCn: "用西班牙纸牌挑战美猴王：每张牌都有一道本课的题，还能学会金币、杯、剑、棍。",
    icon: SpadeIcon,
    sello: "悟",
    tono: "jade",
    category: "mesa",
    habilidad: { es: "Vocabulario y gramática", zh: "词汇与语法" },
    nivel: 2,
    minutos: 10,
    jugadores: "1",
    path: "/juegos/brisca",
  },
].map((game) => ({ ...game, gradient: TONOS[game.tono] }));

const GAMES = JUEGOS.filter((game) => READY_GAMES.has(game.path));

const RECENT_KEY = "ai-espanol:games-recent";
const normalize = (text) =>
  String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
const searchText = (game) => `${game.name} ${game.nameCn} ${game.desc} ${game.descCn} ${game.habilidad.es} ${game.habilidad.zh}`;

function readRecent() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
  } catch {
    return [];
  }
}
function rememberGame(id) {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify([id, ...readRecent().filter((x) => x !== id)].slice(0, 6)));
  } catch {}
}

// Identidad visual de cada categoría: sello caligráfico, color e icono
const IDENTIDAD = {
  todos: { glifo: "全", icono: LayersIcon },
  concurso: { glifo: "竞", icono: ZapIcon },
  letras: { glifo: "字", icono: TypeIcon },
  mesa: { glifo: "棋", icono: SpadeIcon },
  aventura: { glifo: "险", icono: CompassIcon },
};

const sinMovimiento = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Inclinación 3D al pasar el ratón: solo variables CSS (transform), una vez por evento y con rAF
function inclinar(e) {
  if (e.pointerType !== "mouse" || sinMovimiento()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  cancelAnimationFrame(el._jhRaf);
  el._jhRaf = requestAnimationFrame(() => {
    el.style.setProperty("--jh-x", x.toFixed(3));
    el.style.setProperty("--jh-y", y.toFixed(3));
  });
}
function soltar(e) {
  const el = e.currentTarget;
  cancelAnimationFrame(el._jhRaf);
  el.style.removeProperty("--jh-x");
  el.style.removeProperty("--jh-y");
}

function Dificultad({ nivel }) {
  const etiqueta = NIVELES[nivel];
  return (
    <span className="jh-meta" title={`Dificultad · 难度: ${etiqueta.es} · ${etiqueta.zh}`}>
      <span className="jh-dots" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <i key={n} className={n <= nivel ? "is-on" : ""} />
        ))}
      </span>
      {etiqueta.es} · {etiqueta.zh}
    </span>
  );
}

function GameCard({ game, jugado, index }) {
  const cat = IDENTIDAD[game.category];
  return (
    <Link
      to={game.path}
      onClick={() => rememberGame(game.id)}
      onPointerMove={inclinar}
      onPointerLeave={soltar}
      className={`jh-card jh-cat--${game.category}`}
      style={{ "--jh-i": index, viewTransitionName: `jh-${game.id}` }}
      aria-label={`${game.name} · ${game.nameCn}`}
    >
      <span className="jh-card__brillo" aria-hidden="true" />
      <div className="jh-card__portada">
        <Portada id={game.id} />
        <span className="jh-card__catsello" translate="no" aria-hidden="true">
          {cat.glifo}
        </span>
        <span className="jh-card__sello" translate="no" aria-hidden="true">
          {game.sello}
        </span>
        {jugado && (
          <span className="jh-card__cinta">
            <HistoryIcon size={12} aria-hidden="true" /> Jugado · 玩过
          </span>
        )}
        <span className="jh-card__jugar" aria-hidden="true">
          <PlayIcon size={14} fill="currentColor" /> Jugar · 开始
        </span>
      </div>
      <div className="jh-card__cuerpo">
        <h3 className="jh-card__titulo">{game.name}</h3>
        <div className="jh-card__zh">{game.nameCn}</div>
        <p className="jh-card__desc">{game.desc}</p>
        <div className="jh-card__pie">
          <span className="jh-chip">
            {game.habilidad.es} · {game.habilidad.zh}
          </span>
          <Dificultad nivel={game.nivel} />
          <span className="jh-meta">
            <ClockIcon size={13} aria-hidden="true" /> {game.minutos} min
          </span>
        </div>
      </div>
    </Link>
  );
}

// «Juego del día»: tarjeta grande con rayos dorados girando y sello de 今日
function JuegoDelDia({ game }) {
  return (
    <Link
      to={game.path}
      onClick={() => rememberGame(game.id)}
      onPointerMove={inclinar}
      onPointerLeave={soltar}
      className={`jh-card jh-dia jh-cat--${game.category}`}
      style={{ viewTransitionName: "jh-dia" }}
      aria-label={`Juego del día · 今日推荐: ${game.name} · ${game.nameCn}`}
    >
      <span className="jh-card__brillo" aria-hidden="true" />
      <div className="jh-dia__portada">
        <span className="jh-dia__rayos" aria-hidden="true" />
        <Portada id={game.id} className="is-grande" />
        <span className="jh-destello is-1" aria-hidden="true" />
        <span className="jh-destello is-2" aria-hidden="true" />
        <span className="jh-destello is-3" aria-hidden="true" />
        <span className="jh-destello is-4" aria-hidden="true" />
        <span className="jh-dia__sello" translate="no" aria-hidden="true">
          今日
          <br />
          推荐
        </span>
      </div>
      <img className="jh-dia__mono" src="./mono/trofeo.webp" alt="" aria-hidden="true" />
      <div className="jh-dia__cuerpo">
        <span className="jh-dia__ceja">
          <SparklesIcon size={14} aria-hidden="true" /> Juego del día · 今日推荐
        </span>
        <h2 className="jh-dia__titulo">{game.name}</h2>
        <div className="jh-dia__zh">{game.nameCn}</div>
        <p className="jh-dia__desc">
          {game.desc}
          <span>{game.descCn}</span>
        </p>
        <div className="jh-dia__pie">
          <span className="jh-btn-laca">
            <PlayIcon size={16} fill="currentColor" aria-hidden="true" /> ¡A jugar! · 开始玩
          </span>
          <span className="jh-meta is-claro">
            <ClockIcon size={14} aria-hidden="true" /> {game.minutos} min
          </span>
          <Dificultad nivel={game.nivel} />
        </div>
      </div>
    </Link>
  );
}

// Piezas flotantes del salón: ficha de mahjong, cartas, dado, abanico y moneda
function PiezasSalon() {
  return (
    <div className="jh-hero__piezas" aria-hidden="true">
      <span className="jh-pieza jh-pieza--mahjong" translate="no">
        中
      </span>
      <span className="jh-pieza jh-pieza--mahjong is-b" translate="no">
        發
      </span>
      <span className="jh-pieza jh-pieza--carta" translate="no">
        A
      </span>
      <span className="jh-pieza jh-pieza--carta is-b" translate="no">
        ñ
      </span>
      <span className="jh-pieza jh-pieza--dado">
        <i />
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="jh-pieza jh-pieza--moneda" />
      {Array.from({ length: 10 }, (_, i) => (
        <span key={i} className="jh-chispa" style={{ "--i": i }} />
      ))}
    </div>
  );
}

function JuegosHubPage() {
  const navigate = useNavigate();
  const [category, setCategory] = React.useState("todos");
  const [query, setQuery] = React.useState("");
  const [dado, setDado] = React.useState(false);
  const recentIds = readRecent();
  const recent = recentIds.map((id) => GAMES.find((game) => game.id === id)).filter(Boolean);
  const daySeed = Math.floor(Date.now() / 86400000);
  const featured = GAMES[daySeed % GAMES.length];
  const normalizedQuery = normalize(query.trim());
  const conDestacado = category === "todos" && !normalizedQuery;
  const list = GAMES.filter((game) => (category === "todos" || game.category === category) && (!normalizedQuery || normalize(searchText(game)).includes(normalizedQuery)) && !(conDestacado && game.id === featured.id));
  const countOf = (key) => GAMES.filter((game) => key === "todos" || game.category === key).length;

  // Al cambiar de categoría las tarjetas se recolocan con View Transitions (si el navegador lo admite)
  const elegirCategoria = (key) => {
    if (key === category) return;
    if (document.startViewTransition && !sinMovimiento()) document.startViewTransition(() => flushSync(() => setCategory(key)));
    else setCategory(key);
  };

  const partidaRapida = () => {
    const game = GAMES[Math.floor(Math.random() * GAMES.length)];
    rememberGame(game.id);
    if (sinMovimiento()) return navigate(game.path);
    setDado(true);
    window.setTimeout(() => navigate(game.path), 550);
  };

  return (
    <LightShell>
      <div className="ui-page jh">
        {/* Cabecera: salón imperial de juegos, compacta y viva */}
        <section className="jh-hero" aria-labelledby="jh-titulo">
          <span className="jh-hero__marco" aria-hidden="true" />
          <span className="jh-hero__dragon" aria-hidden="true" />
          <span className="jh-fuego is-1" aria-hidden="true" />
          <span className="jh-fuego is-2" aria-hidden="true" />
          <span className="jh-fuego is-3" aria-hidden="true" />
          <span className="jh-nube-viaje" aria-hidden="true" />
          <svg className="jh-alero" viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 0h1000v14c-14 0-24 6-34 16-6-10-16-14-30-14H64c-14 0-24 4-30 14C24 20 14 14 0 14z" fill="#3a0510" />
            <path d="M0 14c14 0 24 6 34 16 6-10 16-14 30-14h872c14 0 24 4 30 14 10-10 20-16 34-16" fill="none" stroke="#f2c14e" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
            <path d="M40 6h920" stroke="#7a0a1c" strokeWidth="9" strokeDasharray="7 3" />
            <path d="M0 1.5h1000" stroke="#f2c14e" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            <path d="M64 13h872" stroke="#f2c14e" strokeWidth="1" strokeDasharray="2 8" vectorEffect="non-scaling-stroke" opacity=".8" />
          </svg>
          <span className="jh-esquina is-ii" aria-hidden="true" />
          <span className="jh-esquina is-id" aria-hidden="true" />
          <span className="jh-linterna is-1" aria-hidden="true" />
          <span className="jh-linterna is-2" aria-hidden="true" />
          <span className="jh-linterna is-3" aria-hidden="true" />
          <PiezasSalon />
          <div className="jh-hero__texto">
            <Link to="/dashboard" className="jh-volver no-print">
              <ArrowLeftIcon size={13} aria-hidden="true" /> Inicio · 首页
            </Link>
            <span className="jh-hero__ceja">
              <span className="jh-sello-mini" translate="no">
                戏
              </span>
              Pabellón de juegos · 游戏阁
            </span>
            <h1 id="jh-titulo" className="jh-hero__titulo">
              Aprende jugando <span className="jh-hero__zh">边玩边学</span>
            </h1>
            <p className="jh-hero__desc">
              {GAMES.length} juegos con las palabras de tus unidades. <span>{GAMES.length} 个游戏，用你学过的单元词汇。</span>
            </p>
            <div className="jh-hero__acciones">
              <button type="button" className={`jh-btn-oro${dado ? " is-tirando" : ""}`} onClick={partidaRapida}>
                <Dice5Icon size={18} className="jh-btn-oro__dado" aria-hidden="true" />
                <span>
                  Partida rápida<span className="jh-btn__sep"> · </span>
                  <span className="jh-btn__zh">随机一局</span>
                </span>
              </button>
              <Link to={featured.path} onClick={() => rememberGame(featured.id)} className="jh-btn-linea">
                <SparklesIcon size={16} aria-hidden="true" />
                <span>
                  Juego del día<span className="jh-btn__sep"> · </span>
                  <span className="jh-btn__zh">今日推荐</span>
                </span>
              </Link>
            </div>
          </div>
          <div className="jh-hero__escena" aria-hidden="true">
            <span className="jh-hero__halo" />
            <img className="jh-hero__nube" src="./theme/nube-oro.png" alt="" />
            <img className="jh-hero__mono" src="./mono/poder.webp" alt="" />
          </div>
          <div className="jh-seguir">
            <span className="jh-seguir__titulo">
              <HistoryIcon size={15} aria-hidden="true" /> Seguir jugando · 继续玩
            </span>
            {recent.length ? (
              <div className="jh-seguir__lista">
                {recent.slice(0, 4).map((game) => (
                  <Link key={game.id} to={game.path} onClick={() => rememberGame(game.id)} className="jh-seguir__item" title={`${game.name} · ${game.nameCn}`}>
                    <Portada id={game.id} className="is-mini" />
                    <span>
                      {game.name}
                      <small>{game.nameCn}</small>
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <span className="jh-seguir__vacio">
                Aquí verás tus últimas partidas. <span>这里会显示你最近玩过的游戏。</span>
              </span>
            )}
          </div>
        </section>

        {/* Catálogo: filtros con identidad + portadas */}
        <section className="jh-catalogo" aria-labelledby="jh-catalogo-titulo">
          <div className="jh-barra">
            <h2 id="jh-catalogo-titulo" className="jh-barra__titulo">
              <span className="jh-sello-mini" translate="no">
                全
              </span>
              Todos los juegos · 全部游戏
            </h2>
            <div className="jh-tabs" role="tablist" aria-label="Categorías · 类别">
              {CATEGORIAS.map((cat) => {
                const id = IDENTIDAD[cat.key];
                const Icono = id.icono;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    role="tab"
                    aria-selected={category === cat.key}
                    className={`jh-tab jh-cat--${cat.key}${category === cat.key ? " is-on" : ""}`}
                    onClick={() => elegirCategoria(cat.key)}
                  >
                    <span className="jh-tab__sello" translate="no" aria-hidden="true">
                      {id.glifo}
                    </span>
                    <Icono size={15} className="jh-tab__icono" aria-hidden="true" />
                    <span className="jh-tab__txt">
                      {cat.es} <small>{cat.zh}</small>
                    </span>
                    <span className="jh-tab__n">{countOf(cat.key)}</span>
                  </button>
                );
              })}
            </div>
            <label className="jh-buscar">
              <SearchIcon size={17} aria-hidden="true" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar juego · 搜索游戏" aria-label="Buscar juego · 搜索游戏" />
              {query && (
                <button type="button" onClick={() => setQuery("")} aria-label="Borrar · 清除">
                  <XIcon size={16} />
                </button>
              )}
            </label>
          </div>

          {conDestacado || list.length ? (
            <div className="jh-grid">
              {conDestacado && <JuegoDelDia game={featured} />}
              {list.map((game, index) => (
                <GameCard key={game.id} game={game} index={index} jugado={recentIds.includes(game.id)} />
              ))}
              {conDestacado && (
                <button type="button" className="jh-card jh-azar jh-cat--todos" style={{ "--jh-i": list.length, viewTransitionName: "jh-azar" }} onClick={partidaRapida} onPointerMove={inclinar} onPointerLeave={soltar}>
                  <span className="jh-card__brillo" aria-hidden="true" />
                  <span className="jh-azar__dados" aria-hidden="true">
                    <span className="jh-azar__dado">?</span>
                    <span className="jh-azar__dado is-b" translate="no">
                      戏
                    </span>
                  </span>
                  <span className="jh-azar__titulo">Partida rápida</span>
                  <span className="jh-azar__zh">随机一局</span>
                  <span className="jh-azar__desc">
                    Deja que el dado elija el juego.
                    <span>让骰子帮你选游戏。</span>
                  </span>
                </button>
              )}
            </div>
          ) : (
            <div className="jh-vacio">
              <img src="./mono/serio.webp" alt="" />
              <p>
                No hay juegos con «{query}». <span>没有找到相关游戏。</span>
              </p>
              <button
                type="button"
                className="jh-btn-laca"
                onClick={() => {
                  setQuery("");
                  setCategory("todos");
                }}
              >
                Ver todos · 查看全部
              </button>
            </div>
          )}
        </section>
      </div>
    </LightShell>
  );
}

export { JuegosHubPage as default, GAMES };
// Juegos ya rediseñados con la estética imperial (hoy son todos los del catálogo)
export const isReadyGame = (game) => READY_GAMES.has(game.path);
