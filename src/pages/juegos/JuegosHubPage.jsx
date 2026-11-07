import {
  ZapIcon,
  EyeIcon,
  Grid3x3Icon,
  ShuffleIcon,
  SearchIcon,
  BookOpenIcon,
  HashIcon,
  CrownIcon,
  DicesIcon,
  PlayIcon,
  ClockIcon,
  UsersIcon,
  SparklesIcon,
  HistoryIcon,
  XIcon,
  ArrowLeftIcon,
} from "lucide-react";
import * as React from "react";
import { Link, useNavigate } from "react-router";
import { LightShell } from "../../components/layout/LightShell.jsx";

// Los 8 juegos de la app (el resto se retiró para quedarnos solo con los mejores).
// `gradient` e `icon` los usa también la pestaña de juegos de cada unidad (UnitPage).
export const READY_GAMES = new Set(["/juegos/kahoot", "/juegos/memory", "/juegos/ruleta", "/juegos/uno", "/juegos/scramble", "/juegos/sopa", "/juegos/ahorcado", "/juegos/apalabrados"]);

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

// Medallón de laca con el icono en oro y un sello caligráfico
function Medallon({ game, grande = false }) {
  const Icon = game.icon;
  return (
    <span className={`jd-medallon${grande ? " is-grande" : ""}`} style={{ "--jd-tono": game.gradient }} aria-hidden="true">
      <span className="jd-medallon__aro" />
      <Icon className="jd-medallon__icono" strokeWidth={2.2} />
      <span className="jd-medallon__sello" translate="no">
        {game.sello}
      </span>
    </span>
  );
}

function Dificultad({ nivel }) {
  const etiqueta = NIVELES[nivel];
  return (
    <span className="jd-meta" title={`Dificultad · 难度: ${etiqueta.es} · ${etiqueta.zh}`}>
      <span className="jd-dots" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <i key={n} className={n <= nivel ? "is-on" : ""} />
        ))}
      </span>
      {etiqueta.es} · {etiqueta.zh}
    </span>
  );
}

function GameCard({ game, jugado, index }) {
  return (
    <Link to={game.path} onClick={() => rememberGame(game.id)} className={`jd-card jd-card--${game.tono}`} style={{ "--jd-i": index }} aria-label={`${game.name} · ${game.nameCn}`}>
      <span className="jd-card__filete" aria-hidden="true" />
      {jugado && (
        <span className="jd-card__cinta">
          <HistoryIcon size={12} /> Jugado · 玩过
        </span>
      )}
      <div className="jd-card__cabeza">
        <Medallon game={game} />
        <div className="jd-card__titulos">
          <h3 className="jd-card__titulo">{game.name}</h3>
          <div className="jd-card__zh">{game.nameCn}</div>
          <span className="jd-chip">
            {game.habilidad.es} · {game.habilidad.zh}
          </span>
        </div>
      </div>
      <p className="jd-card__desc">
        {game.desc}
        <span className="jd-card__desczh">{game.descCn}</span>
      </p>
      <div className="jd-card__pie">
        <Dificultad nivel={game.nivel} />
        <span className="jd-meta">
          <ClockIcon size={14} aria-hidden="true" /> {game.minutos} min
        </span>
        <span className="jd-meta">
          <UsersIcon size={14} aria-hidden="true" /> {game.jugadores}
        </span>
        <span className="jd-card__jugar" aria-hidden="true">
          <PlayIcon size={14} fill="currentColor" /> Jugar · 开始
        </span>
      </div>
    </Link>
  );
}

function JuegosHubPage() {
  const navigate = useNavigate();
  const [category, setCategory] = React.useState("todos");
  const [query, setQuery] = React.useState("");
  const recentIds = readRecent();
  const recent = recentIds.map((id) => GAMES.find((game) => game.id === id)).filter(Boolean);
  const daySeed = Math.floor(Date.now() / 86400000);
  const featured = GAMES[daySeed % GAMES.length];
  const normalizedQuery = normalize(query.trim());
  const list = GAMES.filter((game) => (category === "todos" || game.category === category) && (!normalizedQuery || normalize(searchText(game)).includes(normalizedQuery)));
  const countOf = (key) => GAMES.filter((game) => key === "todos" || game.category === key).length;

  const partidaRapida = () => {
    const game = GAMES[Math.floor(Math.random() * GAMES.length)];
    rememberGame(game.id);
    navigate(game.path);
  };

  return (
    <LightShell>
      <div className="ui-page jd-hub">
        <Link to="/dashboard" className="sh-back no-print jd-back">
          <ArrowLeftIcon size={14} /> Inicio · 首页
        </Link>

        {/* Héroe: pabellón de los juegos con el Rey Mono */}
        <section className="jd-hero" aria-labelledby="jd-hero-titulo">
          <span className="jd-hero__linterna is-izq" aria-hidden="true" />
          <span className="jd-hero__linterna is-der" aria-hidden="true" />
          <div className="jd-hero__texto">
            <span className="jd-hero__ceja">
              <span className="jd-sello-mini" translate="no">
                戏
              </span>
              Pabellón de juegos · 游戏阁
            </span>
            <h1 id="jd-hero-titulo" className="jd-hero__titulo">
              Aprende jugando
            </h1>
            <div className="jd-hero__zh">边玩边学西班牙语</div>
            <p className="jd-hero__desc">
              Ocho juegos con las palabras de tus unidades: elige una unidad dentro de cada juego y repasa sin darte cuenta.
              <span>八个游戏，用你学过的单元词汇，玩着玩着就复习好了。</span>
            </p>
            <div className="jd-hero__acciones">
              <button type="button" className="jd-btn-oro" onClick={partidaRapida}>
                <ShuffleIcon size={18} /> Partida rápida · 随机一局
              </button>
              <Link to={featured.path} onClick={() => rememberGame(featured.id)} className="jd-btn-linea">
                <SparklesIcon size={16} /> Juego del día · 今日推荐
              </Link>
            </div>
            <div className="jd-hero__stats">
              <span>
                <b>{GAMES.length}</b> juegos · 个游戏
              </span>
              <span>
                <b>{CATEGORIAS.length - 1}</b> categorías · 类别
              </span>
              <span>
                <b>{recent.length}</b> jugados · 玩过
              </span>
            </div>
          </div>
          <div className="jd-hero__escena" aria-hidden="true">
            <span className="jd-hero__halo" />
            <img className="jd-hero__nube" src="./theme/nube-oro.png" alt="" />
            <img className="jd-hero__mono" src="./mono/poder.png" alt="" />
          </div>
        </section>

        {/* Juego del día + seguir jugando */}
        <section className="jd-destacados">
          <Link to={featured.path} onClick={() => rememberGame(featured.id)} className="jd-pergamino" aria-label={`Juego del día: ${featured.name} · ${featured.nameCn}`}>
            <span className="jd-pergamino__rodillo is-arriba" aria-hidden="true" />
            <div className="jd-pergamino__cuerpo">
              <Medallon game={featured} grande />
              <div className="jd-pergamino__texto">
                <span className="jd-eyebrow">
                  <SparklesIcon size={13} /> Juego del día · 今日推荐
                </span>
                <h2 className="jd-pergamino__titulo">{featured.name}</h2>
                <div className="jd-pergamino__zh">{featured.nameCn}</div>
                <p className="jd-pergamino__desc">
                  {featured.desc} <span>{featured.descCn}</span>
                </p>
                <span className="jd-btn-laca">
                  <PlayIcon size={16} fill="currentColor" /> ¡A jugar! · 开始玩
                </span>
              </div>
            </div>
            <span className="jd-pergamino__rodillo is-abajo" aria-hidden="true" />
          </Link>

          <div className="jd-recientes">
            <h2 className="jd-h3">
              <HistoryIcon size={18} /> Seguir jugando · 继续玩
            </h2>
            {recent.length ? (
              <div className="jd-recientes__lista">
                {recent.map((game) => (
                  <Link key={game.id} to={game.path} onClick={() => rememberGame(game.id)} className="jd-reciente" title={`${game.name} · ${game.nameCn}`}>
                    <Medallon game={game} />
                    <span className="jd-reciente__nombre">{game.name}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="jd-recientes__vacio">
                <img src="./mono/guino.png" alt="" />
                <p>
                  Aquí aparecerán los últimos juegos que abras. ¡Empieza por el juego del día!
                  <span>这里会显示你最近玩过的游戏。先试试今日推荐吧！</span>
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Filtros */}
        <section className="jd-catalogo" aria-labelledby="jd-catalogo-titulo">
          <div className="jd-catalogo__cabeza">
            <h2 id="jd-catalogo-titulo" className="jd-h2">
              <span className="jd-sello-mini" translate="no">
                全
              </span>
              Todos los juegos · 全部游戏
            </h2>
            <div className="jd-filtros">
              <div className="jd-tabs" role="tablist" aria-label="Categorías · 类别">
                {CATEGORIAS.map((cat) => (
                  <button key={cat.key} type="button" role="tab" aria-selected={category === cat.key} className={category === cat.key ? "is-on" : ""} onClick={() => setCategory(cat.key)}>
                    {cat.es} · {cat.zh}
                    <span className="jd-tabs__n">{countOf(cat.key)}</span>
                  </button>
                ))}
              </div>
              <label className="jd-buscar">
                <SearchIcon size={17} aria-hidden="true" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar juego · 搜索游戏" aria-label="Buscar juego · 搜索游戏" />
                {query && (
                  <button type="button" onClick={() => setQuery("")} aria-label="Borrar · 清除">
                    <XIcon size={16} />
                  </button>
                )}
              </label>
            </div>
          </div>

          {list.length ? (
            <div className="jd-grid">
              {list.map((game, index) => (
                <GameCard key={game.id} game={game} index={index} jugado={recentIds.includes(game.id)} />
              ))}
            </div>
          ) : (
            <div className="jd-vacio">
              <BookOpenIcon size={22} /> No hay juegos con «{query}». · 没有找到相关游戏。
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
