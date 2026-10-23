import {
  ZapIcon,
  BrainIcon,
  BookOpenIcon,
  CircleQuestionMarkIcon,
  Gamepad2Icon,
  SparklesIcon,
  ChevronRightIcon,
  EyeIcon,
  Grid3x3Icon,
  TypeIcon,
  ShuffleIcon,
  CreditCardIcon,
  KeyboardIcon,
  GitBranchIcon,
  BombIcon,
  TargetIcon,
  PenToolIcon,
  Link2Icon,
  ArrowUpIcon,
  WandSparklesIcon,
  LayoutGridIcon,
  CloudRainIcon,
  CircleIcon,
  OrbitIcon,
  WindIcon,
  LayersIcon,
  LockIcon,
  SquareIcon,
  GhostIcon,
  RocketIcon,
  DiamondIcon,
  CarIcon,
  ShieldIcon,
  CrosshairIcon,
  SwordIcon,
  CrownIcon,
  CandyIcon,
  HashIcon,
  MessageCircleIcon,
  ArrowLeftIcon,
  SearchIcon,
  SquareDashedIcon,
} from "lucide-react";
import * as React from "react";
import { Link, useNavigate } from "react-router";
import { SectionHero } from "../../components/ui/SectionHero.jsx";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { useLanguage } from "../../lib/i18n.jsx";
const i = [
  {
    id: "kahoot",
    name: "Kahoot Quiz",
    nameCn: "卡胡特问答",
    desc: "Compite respondiendo preguntas tipo quiz estilo Kahoot",
    descCn: "Kahoot风格问答竞赛",
    icon: ZapIcon,
    color: "#ff00aa",
    glow: "rgba(255,0,170,.45)",
    gradient: "linear-gradient(135deg,#ff3860,#ff00aa)",
    shadow: "0 0 40px rgba(255,0,170,.4)",
    hoverShadow: "0 0 60px rgba(255,0,170,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(255,0,170,.2),transparent 60%)",
    path: "/juegos/kahoot",
    tags: ["Quiz", "Competitivo"],
    category: "Quiz",
  },
  {
    id: "ahorcado",
    name: "Ahorcado",
    nameCn: "猜词游戏",
    desc: "Adivina la palabra antes de que sea tarde",
    descCn: "在来不及之前猜出单词",
    icon: EyeIcon,
    color: "#00d4ff",
    glow: "rgba(0,212,255,.45)",
    gradient: "linear-gradient(135deg,#00d4ff,#b829dd)",
    shadow: "0 0 40px rgba(0,212,255,.4)",
    hoverShadow: "0 0 60px rgba(0,212,255,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(0,212,255,.2),transparent 60%)",
    path: "/juegos/ahorcado",
    tags: ["Palabras", "Adivinanza"],
    category: "Palabras",
  },
  {
    id: "memory",
    name: "Memory Match",
    nameCn: "记忆配对",
    desc: "Encuentra las parejas de palabras y traducciones",
    descCn: "找到单词和翻译的配对",
    icon: Grid3x3Icon,
    color: "#ffd600",
    glow: "rgba(255,214,0,.45)",
    gradient: "linear-gradient(135deg,#ffd600,#ff6b35)",
    shadow: "0 0 40px rgba(255,214,0,.4)",
    hoverShadow: "0 0 60px rgba(255,214,0,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(255,214,0,.2),transparent 60%)",
    path: "/juegos/memory",
    tags: ["Memoria", "Parejas"],
    category: "Parejas",
  },
  {
    id: "crucigrama",
    name: "Crucigrama",
    nameCn: "填字游戏",
    desc: "Completa el crucigrama con palabras en español",
    descCn: "用西班牙语单词完成填字游戏",
    icon: TypeIcon,
    color: "#39ff14",
    glow: "rgba(57,255,20,.45)",
    gradient: "linear-gradient(135deg,#39ff14,#00d4ff)",
    shadow: "0 0 40px rgba(57,255,20,.4)",
    hoverShadow: "0 0 60px rgba(57,255,20,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(57,255,20,.2),transparent 60%)",
    path: "/juegos/crucigrama",
    tags: ["Palabras", "Pistas"],
    category: "Palabras",
  },
  {
    id: "sopa",
    name: "Sopa de Letras",
    nameCn: "字母搜索",
    desc: "Encuentra palabras escondidas en la sopa de letras",
    descCn: "在字母汤中找到隐藏的单词",
    icon: ShuffleIcon,
    color: "#2080ff",
    glow: "rgba(32,128,255,.45)",
    gradient: "linear-gradient(135deg,#2080ff,#b829dd)",
    shadow: "0 0 40px rgba(32,128,255,.4)",
    hoverShadow: "0 0 60px rgba(32,128,255,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(32,128,255,.2),transparent 60%)",
    path: "/juegos/sopa",
    tags: ["Busqueda", "Palabras"],
    category: "Palabras",
  },
  {
    id: "ruleta",
    name: "Ruleta de Palabras",
    nameCn: "单词轮盘",
    desc: "Gira la ruleta y aprende palabras nuevas",
    descCn: "转动轮盘学习新单词",
    icon: BrainIcon,
    color: "#ff6b35",
    glow: "rgba(255,107,53,.45)",
    gradient: "linear-gradient(135deg,#ff6b35,#ff00aa)",
    shadow: "0 0 40px rgba(255,107,53,.4)",
    hoverShadow: "0 0 60px rgba(255,107,53,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(255,107,53,.2),transparent 60%)",
    path: "/juegos/ruleta",
    tags: ["Ruleta", "Vocabulario"],
    category: "Arcade",
  },
  {
    id: "scramble",
    name: "Palabra Desordenada",
    nameCn: "单词重组",
    desc: "Ordena las letras y forma la palabra correcta",
    descCn: "重新排列字母组成正确单词",
    icon: BookOpenIcon,
    color: "#ffd36b",
    glow: "rgba(255,211,107,.45)",
    gradient: "linear-gradient(135deg,#ffd36b,#ff8a2a)",
    shadow: "0 0 40px rgba(255,211,107,.4)",
    hoverShadow: "0 0 60px rgba(255,211,107,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(255,211,107,.2),transparent 60%)",
    path: "/juegos/scramble",
    tags: ["Letras", "Ordenar"],
    category: "Palabras",
  },
  {
    id: "flashcards",
    name: "Flashcards 3D",
    nameCn: "3D闪卡",
    desc: "Estudia vocabulario con tarjetas 3D que se voltean",
    descCn: "用3D翻转卡片学习词汇",
    icon: CreditCardIcon,
    color: "#ff00aa",
    glow: "rgba(184,41,221,.45)",
    gradient: "linear-gradient(135deg,#b829dd,#ff00aa)",
    shadow: "0 0 40px rgba(184,41,221,.4)",
    hoverShadow: "0 0 60px rgba(184,41,221,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(184,41,221,.2),transparent 60%)",
    path: "/juegos/flashcards",
    tags: ["Memoria", "Estudio"],
    category: "Parejas",
  },
  {
    id: "typing-race",
    name: "Typing Race",
    nameCn: "打字竞赛",
    desc: "Escribe las palabras antes de que toquen el fondo",
    descCn: "在单词触底前输入它们",
    icon: KeyboardIcon,
    color: "#00d4ff",
    glow: "rgba(0,212,255,.45)",
    gradient: "linear-gradient(135deg,#00d4ff,#ff6b35)",
    shadow: "0 0 40px rgba(0,212,255,.4)",
    hoverShadow: "0 0 60px rgba(0,212,255,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(0,212,255,.2),transparent 60%)",
    path: "/juegos/typing-race",
    tags: ["Velocidad", "Reflejos"],
    category: "Acción",
  },
  {
    id: "word-snake",
    name: "Word Snake",
    nameCn: "单词贪吃蛇",
    desc: "Guía la serpiente para comer las letras en orden",
    descCn: "引导蛇按顺序吃掉字母",
    icon: GitBranchIcon,
    color: "#39ff14",
    glow: "rgba(57,255,20,.45)",
    gradient: "linear-gradient(135deg,#39ff14,#00d4a0)",
    shadow: "0 0 40px rgba(57,255,20,.4)",
    hoverShadow: "0 0 60px rgba(57,255,20,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(57,255,20,.2),transparent 60%)",
    path: "/juegos/word-snake",
    tags: ["Serpiente", "Letras"],
    category: "Arcade",
  },
  {
    id: "vocab-blast",
    name: "Vocabulario Blast",
    nameCn: "词汇大爆炸",
    desc: "Empareja palabras españolas y chinas contra el reloj",
    descCn: "限时配对西班牙语和中文",
    icon: BombIcon,
    color: "#ffd600",
    glow: "rgba(255,214,0,.45)",
    gradient: "linear-gradient(135deg,#ffd600,#ff6b35)",
    shadow: "0 0 40px rgba(255,214,0,.4)",
    hoverShadow: "0 0 60px rgba(255,214,0,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(255,214,0,.2),transparent 60%)",
    path: "/juegos/vocab-blast",
    tags: ["Parejas", "Contrarreloj"],
    category: "Parejas",
  },
  {
    id: "word-quiz",
    name: "Word Quiz Battle",
    nameCn: "单词问答战",
    desc: "Responde preguntas con multiplicadores de racha",
    descCn: "问答模式，连击加倍",
    icon: TargetIcon,
    color: "#ff3860",
    glow: "rgba(255,56,96,.45)",
    gradient: "linear-gradient(135deg,#ff3860,#2080ff)",
    shadow: "0 0 40px rgba(255,56,96,.4)",
    hoverShadow: "0 0 60px rgba(255,56,96,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(255,56,96,.2),transparent 60%)",
    path: "/juegos/word-quiz",
    tags: ["Quiz", "Poderes"],
    category: "Quiz",
  },
  {
    id: "fill-blanks",
    name: "Fill Blanks",
    nameCn: "填空游戏",
    desc: "Completa las frases con las palabras correctas",
    descCn: "用正确单词填空",
    icon: PenToolIcon,
    color: "#39ff14",
    glow: "rgba(57,255,20,.45)",
    gradient: "linear-gradient(135deg,#39ff14,#46ff9a)",
    shadow: "0 0 40px rgba(57,255,20,.4)",
    hoverShadow: "0 0 60px rgba(57,255,20,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(57,255,20,.2),transparent 60%)",
    path: "/juegos/fill-blanks",
    tags: ["Frases", "Escritura"],
    category: "Palabras",
  },
  {
    id: "word-pairs",
    name: "Word Pairs Race",
    nameCn: "配对竞速",
    desc: "Une palabras españolas con sus traducciones chinas",
    descCn: "配对西班牙语和中文",
    icon: Link2Icon,
    color: "#ff8a2a",
    glow: "rgba(255,138,42,.45)",
    gradient: "linear-gradient(135deg,#ff8a2a,#ffd600)",
    shadow: "0 0 40px rgba(255,138,42,.4)",
    hoverShadow: "0 0 60px rgba(255,138,42,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(255,138,42,.2),transparent 60%)",
    path: "/juegos/word-pairs",
    tags: ["Parejas", "Arrastrar"],
    category: "Parejas",
  },
  {
    id: "word-tower",
    name: "Word Tower",
    nameCn: "单词塔",
    desc: "Escribe la palabra antes de que toque el suelo",
    descCn: "在单词落地前输入",
    icon: ArrowUpIcon,
    color: "#00d4ff",
    glow: "rgba(0,212,255,.45)",
    gradient: "linear-gradient(135deg,#00d4ff,#b829dd)",
    shadow: "0 0 40px rgba(0,212,255,.4)",
    hoverShadow: "0 0 60px rgba(0,212,255,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(0,212,255,.2),transparent 60%)",
    path: "/juegos/word-tower",
    tags: ["Torre", "Reflejos"],
    category: "Acción",
  },
  {
    id: "spell-it",
    name: "Spell It",
    nameCn: "拼写单词",
    desc: "Deletrea la palabra letra por letra",
    descCn: "逐字母拼写单词",
    icon: WandSparklesIcon,
    color: "#ffd600",
    glow: "rgba(255,214,0,.45)",
    gradient: "linear-gradient(135deg,#ffd600,#ff8a2a)",
    shadow: "0 0 40px rgba(255,214,0,.4)",
    hoverShadow: "0 0 60px rgba(255,214,0,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(255,214,0,.2),transparent 60%)",
    path: "/juegos/spell-it",
    tags: ["Deletreo", "Letras"],
    category: "Palabras",
  },
  {
    id: "word-maze",
    name: "Word Maze",
    nameCn: "单词迷宫",
    desc: "Recoge las letras en orden por el laberinto",
    descCn: "按顺序在迷宫中收集字母",
    icon: GitBranchIcon,
    color: "#39ff14",
    glow: "rgba(57,255,20,.45)",
    gradient: "linear-gradient(135deg,#39ff14,#00d4a0)",
    shadow: "0 0 40px rgba(57,255,20,.4)",
    hoverShadow: "0 0 60px rgba(57,255,20,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(57,255,20,.2),transparent 60%)",
    path: "/juegos/word-maze",
    tags: ["Laberinto", "Navegacion"],
    category: "Arcade",
  },
  {
    id: "word-dash",
    name: "Word Dash",
    nameCn: "单词冲刺",
    desc: "Escribe las palabras lo más rápido posible",
    descCn: "尽快输入单词",
    icon: ZapIcon,
    color: "#2080ff",
    glow: "rgba(32,128,255,.45)",
    gradient: "linear-gradient(135deg,#2080ff,#ff00aa)",
    shadow: "0 0 40px rgba(32,128,255,.4)",
    hoverShadow: "0 0 60px rgba(32,128,255,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(32,128,255,.2),transparent 60%)",
    path: "/juegos/word-dash",
    tags: ["Velocidad", "Carrera"],
    category: "Acción",
  },
  {
    id: "word-puzzle",
    name: "Word Puzzle",
    nameCn: "单词拼图",
    desc: "Arma la palabra con las piezas del puzle",
    descCn: "用拼图块拼出单词",
    icon: LayoutGridIcon,
    color: "#b829dd",
    glow: "rgba(184,41,221,.45)",
    gradient: "linear-gradient(135deg,#b829dd,#ff00aa)",
    shadow: "0 0 40px rgba(184,41,221,.4)",
    hoverShadow: "0 0 60px rgba(184,41,221,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(184,41,221,.2),transparent 60%)",
    path: "/juegos/word-puzzle",
    tags: ["Puzzle", "Piezas"],
    category: "Arcade",
  },
  {
    id: "word-drop",
    name: "Word Drop",
    nameCn: "单词掉落",
    desc: "Escribe las palabras antes de que toquen el fondo",
    descCn: "在单词触底前输入它们",
    icon: CloudRainIcon,
    color: "#00d4ff",
    glow: "rgba(0,212,255,.45)",
    gradient: "linear-gradient(135deg,#00d4ff,#39ff14)",
    shadow: "0 0 40px rgba(0,212,255,.4)",
    hoverShadow: "0 0 60px rgba(0,212,255,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(0,212,255,.2),transparent 60%)",
    path: "/juegos/word-drop",
    tags: ["Velocidad", "Reflejos"],
    category: "Acción",
  },
  {
    id: "word-rush",
    name: "Word Rush",
    nameCn: "单词急速",
    desc: "Escribe las palabras lo más rápido posible",
    descCn: "尽快输入单词",
    icon: ZapIcon,
    color: "#ff00aa",
    glow: "rgba(255,0,170,.45)",
    gradient: "linear-gradient(135deg,#ff00aa,#ff3860)",
    shadow: "0 0 40px rgba(255,0,170,.4)",
    hoverShadow: "0 0 60px rgba(255,0,170,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(255,0,170,.2),transparent 60%)",
    path: "/juegos/word-rush",
    tags: ["Velocidad", "Carrera"],
    category: "Acción",
  },
  {
    id: "word-pop",
    name: "Word Pop",
    nameCn: "单词泡泡",
    desc: "Encuentra y pulsa la palabra española correcta",
    descCn: "找到并点击正确的西班牙语",
    icon: CircleIcon,
    color: "#b829dd",
    glow: "rgba(184,41,221,.45)",
    gradient: "linear-gradient(135deg,#b829dd,#ff00aa)",
    shadow: "0 0 40px rgba(184,41,221,.4)",
    hoverShadow: "0 0 60px rgba(184,41,221,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(184,41,221,.2),transparent 60%)",
    path: "/juegos/word-pop",
    tags: ["Burbujas", "Clic"],
    category: "Arcade",
  },
  {
    id: "word-orbit",
    name: "Word Orbit",
    nameCn: "单词轨道",
    desc: "Encuentra la palabra correcta en órbita",
    descCn: "找到轨道上正确的单词",
    icon: OrbitIcon,
    color: "#00d4ff",
    glow: "rgba(0,212,255,.45)",
    gradient: "linear-gradient(135deg,#00d4ff,#b829dd)",
    shadow: "0 0 40px rgba(0,212,255,.4)",
    hoverShadow: "0 0 60px rgba(0,212,255,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(0,212,255,.2),transparent 60%)",
    path: "/juegos/word-orbit",
    tags: ["Orbita", "3D"],
    category: "Arcade",
  },
  {
    id: "word-fusion",
    name: "Word Fusion",
    nameCn: "单词融合",
    desc: "Combina sílabas y forma palabras completas",
    descCn: "组合音节组成完整单词",
    icon: WandSparklesIcon,
    color: "#b829dd",
    glow: "rgba(184,41,221,.45)",
    gradient: "linear-gradient(135deg,#b829dd,#ff00aa)",
    shadow: "0 0 40px rgba(184,41,221,.4)",
    hoverShadow: "0 0 60px rgba(184,41,221,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(184,41,221,.2),transparent 60%)",
    path: "/juegos/word-fusion",
    tags: ["Fusion", "Sílabas"],
    category: "Palabras",
  },
  {
    id: "word-grid",
    name: "Word Grid",
    nameCn: "单词网格",
    desc: "Encuentra las parejas en la cuadrícula 3D",
    descCn: "在3D网格中找到配对",
    icon: LayoutGridIcon,
    color: "#39ff14",
    glow: "rgba(57,255,20,.45)",
    gradient: "linear-gradient(135deg,#39ff14,#00d4a0)",
    shadow: "0 0 40px rgba(57,255,20,.4)",
    hoverShadow: "0 0 60px rgba(57,255,20,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(57,255,20,.2),transparent 60%)",
    path: "/juegos/word-grid",
    tags: ["Grid", "3D"],
    category: "Parejas",
  },
  {
    id: "word-storm",
    name: "Word Storm",
    nameCn: "单词风暴",
    desc: "Escribe palabras antes de que la tormenta te golpee",
    descCn: "在暴风雨击中你之前输入单词",
    icon: WindIcon,
    color: "#ff00aa",
    glow: "rgba(255,0,170,.45)",
    gradient: "linear-gradient(135deg,#ff00aa,#ff3860)",
    shadow: "0 0 40px rgba(255,0,170,.4)",
    hoverShadow: "0 0 60px rgba(255,0,170,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(255,0,170,.2),transparent 60%)",
    path: "/juegos/word-storm",
    tags: ["Tormenta", "3D"],
    category: "Acción",
  },
  {
    id: "word-stack",
    name: "Word Stack",
    nameCn: "单词堆叠",
    desc: "Elige los bloques 3D en orden y forma la palabra",
    descCn: "按正确顺序选择3D方块组成单词",
    icon: LayersIcon,
    color: "#ffd600",
    glow: "rgba(255,214,0,.45)",
    gradient: "linear-gradient(135deg,#ffd600,#ff8a2a)",
    shadow: "0 0 40px rgba(255,214,0,.4)",
    hoverShadow: "0 0 60px rgba(255,214,0,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(255,214,0,.2),transparent 60%)",
    path: "/juegos/word-stack",
    tags: ["Bloques", "3D"],
    category: "Arcade",
  },
  {
    id: "word-cipher",
    name: "Word Cipher",
    nameCn: "单词密码",
    desc: "Descifra símbolos y revela la palabra secreta",
    descCn: "破解符号密码揭示秘密单词",
    icon: LockIcon,
    color: "#39ff14",
    glow: "rgba(57,255,20,.45)",
    gradient: "linear-gradient(135deg,#39ff14,#00d4a0)",
    shadow: "0 0 40px rgba(57,255,20,.4)",
    hoverShadow: "0 0 60px rgba(57,255,20,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(57,255,20,.2),transparent 60%)",
    path: "/juegos/word-cipher",
    tags: ["Hacker", "Código"],
    category: "Palabras",
  },
  {
    id: "word-trivia",
    name: "Word Trivia",
    nameCn: "单词问答",
    desc: "Trivia de vocabulario estilo Kahoot con bonus por tiempo",
    descCn: "Kahoot风格词汇问答，时间奖励",
    icon: CircleQuestionMarkIcon,
    color: "#ff3860",
    glow: "rgba(255,56,96,.45)",
    gradient: "linear-gradient(135deg,#ff3860,#2080ff)",
    shadow: "0 0 40px rgba(255,56,96,.4)",
    hoverShadow: "0 0 60px rgba(255,56,96,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(255,56,96,.2),transparent 60%)",
    path: "/juegos/word-trivia",
    tags: ["Quiz", "Kahoot"],
    category: "Quiz",
  },
  {
    id: "word-pinball",
    name: "Word Pinball",
    nameCn: "单词弹球",
    desc: "Pinball de palabras con efectos 3D",
    descCn: "单词弹球：带3D效果",
    icon: SquareDashedIcon,
    color: "#00d4ff",
    glow: "rgba(0,212,255,.45)",
    gradient: "linear-gradient(135deg,#00d4ff,#ff00aa)",
    shadow: "0 0 40px rgba(0,212,255,.4)",
    hoverShadow: "0 0 60px rgba(0,212,255,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(0,212,255,.2),transparent 60%)",
    path: "/juegos/word-pinball",
    tags: ["Pinball", "3D"],
    category: "Arcade",
  },
  {
    id: "word-tetris",
    name: "Word Tetris",
    nameCn: "单词方块",
    desc: "Forma palabras con letras que caen",
    descCn: "单词俄罗斯方块：用下落字母组成单词",
    icon: SquareIcon,
    color: "#39ff14",
    glow: "rgba(57,255,20,.45)",
    gradient: "linear-gradient(135deg,#39ff14,#00d4ff)",
    shadow: "0 0 40px rgba(57,255,20,.4)",
    hoverShadow: "0 0 60px rgba(57,255,20,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(57,255,20,.2),transparent 60%)",
    path: "/juegos/word-tetris",
    tags: ["Tetris", "Neón"],
    category: "Arcade",
  },
  {
    id: "word-pacman",
    name: "Word Pac-Man",
    nameCn: "单词吃豆人",
    desc: "Recoge letras en el laberinto y evita fantasmas",
    descCn: "在迷宫中收集字母并躲避幽灵",
    icon: GhostIcon,
    color: "#ffd700",
    glow: "rgba(255,215,0,.45)",
    gradient: "linear-gradient(135deg,#ffd700,#ff00aa)",
    shadow: "0 0 40px rgba(255,215,0,.4)",
    hoverShadow: "0 0 60px rgba(255,215,0,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(255,215,0,.2),transparent 60%)",
    path: "/juegos/word-pacman",
    tags: ["Pac-Man", "Arcade"],
    category: "Arcade",
  },
  {
    id: "word-shooter",
    name: "Word Shooter",
    nameCn: "单词射击",
    desc: "Destruye naves enemigas escribiendo palabras en 3D",
    descCn: "输入单词摧毁3D敌舰",
    icon: RocketIcon,
    color: "#00d4ff",
    glow: "rgba(0,212,255,.45)",
    gradient: "linear-gradient(135deg,#00d4ff,#39ff14)",
    shadow: "0 0 40px rgba(0,212,255,.4)",
    hoverShadow: "0 0 60px rgba(0,212,255,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(0,212,255,.2),transparent 60%)",
    path: "/juegos/word-shooter",
    tags: ["Shooter", "3D"],
    category: "Acción",
  },
  {
    id: "word-match-3d",
    name: "Word Match 3D",
    nameCn: "3D单词配对",
    desc: "Encuentra parejas español-chino en tarjetas de cristal",
    descCn: "在水晶卡片中找到西班牙语和中文配对",
    icon: DiamondIcon,
    color: "#ff00aa",
    glow: "rgba(255,0,170,.45)",
    gradient: "linear-gradient(135deg,#ff00aa,#ffd600)",
    shadow: "0 0 40px rgba(255,0,170,.4)",
    hoverShadow: "0 0 60px rgba(255,0,170,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(255,0,170,.2),transparent 60%)",
    path: "/juegos/word-match-3d",
    tags: ["Matching", "3D"],
    category: "Parejas",
  },
  {
    id: "word-racer",
    name: "Word Racer",
    nameCn: "单词赛车",
    desc: "Compite contra la IA en una pista 3D",
    descCn: "在3D赛道上与AI竞速",
    icon: CarIcon,
    color: "#ffd600",
    glow: "rgba(255,214,0,.45)",
    gradient: "linear-gradient(135deg,#ffd600,#ff6b35)",
    shadow: "0 0 40px rgba(255,214,0,.4)",
    hoverShadow: "0 0 60px rgba(255,214,0,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(255,214,0,.2),transparent 60%)",
    path: "/juegos/word-racer",
    tags: ["Carrera", "3D"],
    category: "Acción",
  },
  {
    id: "word-defender",
    name: "Word Defender",
    nameCn: "单词防御",
    desc: "Destruye asteroides con palabras antes de que golpeen la torre",
    descCn: "在陨石击中塔之前摧毁它们",
    icon: ShieldIcon,
    color: "#b829dd",
    glow: "rgba(184,41,221,.45)",
    gradient: "linear-gradient(135deg,#b829dd,#00d4ff)",
    shadow: "0 0 40px rgba(184,41,221,.4)",
    hoverShadow: "0 0 60px rgba(184,41,221,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(184,41,221,.2),transparent 60%)",
    path: "/juegos/word-defender",
    tags: ["Defensa", "3D"],
    category: "Acción",
  },
  {
    id: "word-slinger",
    name: "Word Slinger",
    nameCn: "单词牛仔",
    desc: "Dispara a los letreros con la palabra correcta",
    descCn: "射击带有正确单词的木牌",
    icon: CrosshairIcon,
    color: "#ff6b35",
    glow: "rgba(255,107,53,.45)",
    gradient: "linear-gradient(135deg,#ff6b35,#ffd600)",
    shadow: "0 0 40px rgba(255,107,53,.4)",
    hoverShadow: "0 0 60px rgba(255,107,53,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(255,107,53,.2),transparent 60%)",
    path: "/juegos/word-slinger",
    tags: ["Vaquero", "Disparar"],
    category: "Acción",
  },
  {
    id: "word-ninja",
    name: "Word Ninja",
    nameCn: "单词忍者",
    desc: "Corta las palabras que caen antes de que toquen el suelo",
    descCn: "在单词落地前斩断它们",
    icon: SwordIcon,
    color: "#ff3860",
    glow: "rgba(255,56,96,.45)",
    gradient: "linear-gradient(135deg,#ff3860,#ff00aa)",
    shadow: "0 0 40px rgba(255,56,96,.4)",
    hoverShadow: "0 0 60px rgba(255,56,96,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(255,56,96,.2),transparent 60%)",
    path: "/juegos/word-ninja",
    tags: ["Ninja", "Acción"],
    category: "Acción",
  },
  {
    id: "word-quest",
    name: "Word Quest",
    nameCn: "单词冒险",
    desc: "Derrota monstruos traduciendo palabras en tu aventura",
    descCn: "史诗RPG冒险：通过翻译单词击败怪物",
    icon: CrownIcon,
    color: "#ffd600",
    glow: "rgba(255,214,0,.45)",
    gradient: "linear-gradient(135deg,#ffd600,#ff6b35)",
    shadow: "0 0 40px rgba(255,214,0,.4)",
    hoverShadow: "0 0 60px rgba(255,214,0,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(255,214,0,.2),transparent 60%)",
    path: "/juegos/word-quest",
    tags: ["RPG", "Aventura"],
    category: "Arcade",
  },
  {
    id: "word-archer",
    name: "Word Archer",
    nameCn: "单词弓箭手",
    desc: "Dispara a dianas con palabras y acierta la traducción",
    descCn: "射击带有西班牙语单词的靶子，输入中文翻译命中",
    icon: TargetIcon,
    color: "#00d4ff",
    glow: "rgba(0,212,255,.45)",
    gradient: "linear-gradient(135deg,#00d4ff,#39ff14)",
    shadow: "0 0 40px rgba(0,212,255,.4)",
    hoverShadow: "0 0 60px rgba(0,212,255,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(0,212,255,.2),transparent 60%)",
    path: "/juegos/word-archer",
    tags: ["Arquero", "3D"],
    category: "Acción",
  },
  {
    id: "word-candy",
    name: "Word Candy",
    nameCn: "单词糖果",
    desc: "Intercambia dulces y forma palabras con explosiones",
    descCn: "交换糖果方块组成西班牙语单词，爆炸效果炫酷",
    icon: CandyIcon,
    color: "#ff00aa",
    glow: "rgba(255,0,170,.45)",
    gradient: "linear-gradient(135deg,#ff00aa,#ffd600)",
    shadow: "0 0 40px rgba(255,0,170,.4)",
    hoverShadow: "0 0 60px rgba(255,0,170,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(255,0,170,.2),transparent 60%)",
    path: "/juegos/word-candy",
    tags: ["Candy", "Match-3"],
    category: "Arcade",
  },
  {
    id: "apalabrados",
    name: "Apalabrados",
    nameCn: "西班牙语拼字",
    desc: "Coloca letras en el tablero y forma palabras con bonus",
    descCn: "在棋盘上放置字母组成单词，获得加分",
    icon: HashIcon,
    color: "#ffd600",
    glow: "rgba(255,214,0,.45)",
    gradient: "linear-gradient(135deg,#ffd600,#ff6b35)",
    shadow: "0 0 40px rgba(255,214,0,.4)",
    hoverShadow: "0 0 60px rgba(255,214,0,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(255,214,0,.2),transparent 60%)",
    path: "/juegos/apalabrados",
    tags: ["Scrabble", "Estrategia"],
    category: "Palabras",
  },
  {
    id: "word-chain",
    name: "Cadenas de Palabras",
    nameCn: "单词链",
    desc: "Encadena palabras por su última letra contra el reloj",
    descCn: "通过最后一个字母连接单词，限时",
    icon: Link2Icon,
    color: "#39ff14",
    glow: "rgba(57,255,20,.45)",
    gradient: "linear-gradient(135deg,#39ff14,#00d4a0)",
    shadow: "0 0 40px rgba(57,255,20,.4)",
    hoverShadow: "0 0 60px rgba(57,255,20,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(57,255,20,.2),transparent 60%)",
    path: "/juegos/word-chain",
    tags: ["Cadenas", "2 Jugadores"],
    category: "Palabras",
  },
  {
    id: "tic-tac-toe",
    name: "Tic Tac Toe",
    nameCn: "三子棋",
    desc: "Clásico 3 en raya contra un amigo o la IA",
    descCn: "经典三子棋：双人对战或三级AI难度",
    icon: Grid3x3Icon,
    color: "#ff00aa",
    glow: "rgba(255,0,170,.45)",
    gradient: "linear-gradient(135deg,#ff00aa,#ff3860)",
    shadow: "0 0 40px rgba(255,0,170,.4)",
    hoverShadow: "0 0 60px rgba(255,0,170,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(255,0,170,.2),transparent 60%)",
    path: "/juegos/tic-tac-toe",
    tags: ["Clásico", "2 Jugadores"],
    category: "Parejas",
  },
  {
    id: "uno",
    name: "UNO",
    nameCn: "UNO卡牌",
    desc: "Clásico UNO en español con cartas especiales",
    descCn: "经典UNO卡牌游戏：双人对战，特殊卡牌，词汇学习",
    icon: CrownIcon,
    color: "#ffd600",
    glow: "rgba(255,214,0,.45)",
    gradient: "linear-gradient(135deg,#ffd600,#ff3860)",
    shadow: "0 0 40px rgba(255,214,0,.4)",
    hoverShadow: "0 0 60px rgba(255,214,0,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(255,214,0,.2),transparent 60%)",
    path: "/juegos/uno",
    tags: ["Cartas", "2 Jugadores"],
    category: "Parejas",
  },
  {
    id: "pronunciacion",
    name: "Templo de las Silabas",
    nameCn: "音节圣殿",
    desc: "Practica la pronunciación de sílabas españolas",
    descCn: "练习西班牙语音节发音",
    icon: MessageCircleIcon,
    color: "#b829dd",
    glow: "rgba(184,41,221,.45)",
    gradient: "linear-gradient(135deg,#ff00aa,#b829dd)",
    shadow: "0 0 40px rgba(184,41,221,.4)",
    hoverShadow: "0 0 60px rgba(184,41,221,.3),0 25px 60px rgba(0,0,0,.5)",
    after: "radial-gradient(circle at 50% 0%,rgba(184,41,221,.2),transparent 60%)",
    path: "/pronunciacion",
    tags: ["Pronunciacion", "Silabas"],
    category: "Palabras",
  },
];
const p = [
  {
    key: "todos",
    label: "Todos",
    labelCn: "全部",
    color: "#ffb33b",
    test: () => true,
  },
  {
    key: "palabras",
    label: "Palabras",
    labelCn: "词汇",
    color: "#39ff14",
    test: (r) => r.category === "Palabras" || r.category === "Parejas",
  },
  {
    key: "ritmo",
    label: "Ritmo",
    labelCn: "节奏",
    color: "#00d4ff",
    test: (r) =>
      ["Velocidad", "Reflejos", "Carrera", "Contrarreloj", "Ritmo", "Música"].some((n) => r.tags.includes(n)),
  },
  {
    key: "arcade",
    label: "Arcade",
    labelCn: "街机",
    color: "#ff8a2a",
    test: (r) => r.category === "Arcade" || r.category === "Acción",
  },
  {
    key: "clasicos",
    label: "Clásicos",
    labelCn: "经典",
    color: "#ff00aa",
    test: (r) =>
      r.category === "Quiz" ||
      ["ahorcado", "crucigrama", "sopa", "tic-tac-toe", "uno", "tetris", "pinball"].includes(r.id),
  },
];
const RECENT_KEY = "ai-espanol:games-recent";
const normalize = (r) =>
  String(r || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
const searchText = (r) => `${r.name} ${r.desc || ""} ${(r.tags || []).join(" ")} ${String(r.nameCn ?? "")} ${String(r.descCn ?? "")}`;

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

function GameIcon({ game, size = 52 }) {
  const Icon = game.icon;
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.3,
        background: game.gradient,
        boxShadow: `0 10px 26px ${game.glow}`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Icon size={size * 0.46} color="#fff" />
    </span>
  );
}

function GameCard({ game }) {
  return (
    <Link to={game.path} onClick={() => rememberGame(game.id)} className="ui-card is-link" style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>
      <div className="ui-row" style={{ flexWrap: "nowrap", gap: 12 }}>
        <GameIcon game={game} />
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 15 }}>{game.name}</div>
          <div className="ui-zh" style={{ fontSize: 12 }}>{game.nameCn}</div>
        </div>
      </div>
      <div style={{ fontSize: 13, color: "var(--ui-text-2)", lineHeight: 1.45, flex: 1 }}>
        {game.desc}
        <div className="ui-zh" style={{ fontSize: 12, marginTop: 2 }}>{game.descCn}</div>
      </div>
      <div className="ui-between">
        <div className="ui-row" style={{ gap: 4 }}>
          {(game.tags || []).slice(0, 2).map((t) => (
            <span key={t} className="ui-chip" style={{ fontSize: 11, padding: "2px 8px" }}>
              {t}
            </span>
          ))}
        </div>
        <span style={{ color: game.color, fontWeight: 900, fontSize: 13 }}>Jugar →</span>
      </div>
    </Link>
  );
}

function JuegosHubPage() {
  const navigate = useNavigate();
  const [category, setCategory] = React.useState("todos");
  const [query, setQuery] = React.useState("");
  const recent = readRecent()
    .map((id) => i.find((g) => g.id === id))
    .filter(Boolean);
  const daySeed = Math.floor(Date.now() / 86400000);
  const featured = i[daySeed % i.length];
  const cat = p.find((c) => c.key === category) || p[0];
  const q = normalize(query.trim());
  const list = i.filter((g) => cat.test(g) && (!q || normalize(searchText(g)).includes(q)));

  return (
    <StarfieldBackground>
      <div className="ui-page">
        <SectionHero
          icon={Gamepad2Icon}
          accent="#06b6d4"
          eyebrow="Juegos · 游戏"
          title="Aprende jugando"
          titleZh="边玩边学西班牙语"
          description="Juegos de vocabulario con las palabras de tus módulos: elige un módulo dentro de cada juego y repasa sin darte cuenta."
          descriptionZh="用模块词汇玩游戏，在每个游戏里选择模块，轻松复习。"
          stats={[
            { value: i.length, label: "juegos · 个游戏" },
            { value: p.length - 1, label: "categorías · 类别" },
            { value: recent.length, label: "jugados · 玩过" },
          ]}
          actions={
            <button
              className="ui-btn primary"
              onClick={() => {
                const g = i[Math.floor(Math.random() * i.length)];
                rememberGame(g.id);
                navigate(g.path);
              }}
            >
              <ShuffleIcon size={16} /> Partida rápida · 随机
            </button>
          }
        />

        <section className="ui-section ui-grid cols-2" style={{ alignItems: "stretch" }}>
          <Link
            to={featured.path}
            onClick={() => rememberGame(featured.id)}
            className="ui-card is-link"
            style={{ display: "flex", gap: 18, alignItems: "center", background: `radial-gradient(120% 140% at 0% 0%, ${featured.color}33, transparent 60%), var(--ui-surface)` }}
          >
            <GameIcon game={featured} size={78} />
            <div style={{ minWidth: 0 }}>
              <div className="ui-eyebrow" style={{ color: featured.color }}>
                <SparklesIcon size={13} /> Juego del día · 今日推荐
              </div>
              <div className="ui-h2" style={{ marginTop: 6 }}>{featured.name}</div>
              <div className="ui-zh">{featured.nameCn}</div>
              <div style={{ fontSize: 14, color: "var(--ui-text-2)", marginTop: 6 }}>{featured.desc}</div>
            </div>
          </Link>
          <div className="ui-card">
            <div className="ui-h3" style={{ marginBottom: 12 }}>Seguir jugando · 继续玩</div>
            {recent.length ? (
              <div className="ui-row" style={{ gap: 12 }}>
                {recent.map((g) => (
                  <Link key={g.id} to={g.path} onClick={() => rememberGame(g.id)} title={g.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: 78, textDecoration: "none", color: "inherit" }}>
                    <GameIcon game={g} size={50} />
                    <span style={{ fontSize: 11, fontWeight: 700, textAlign: "center", lineHeight: 1.2 }}>{g.name}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="ui-muted" style={{ fontSize: 14 }}>Aquí aparecerán los últimos juegos que abras. 这里会显示你最近玩过的游戏。</div>
            )}
          </div>
        </section>

        <section className="ui-section">
          <div className="ui-between" style={{ marginBottom: 14 }}>
            <div className="ui-tabs">
              {p.map((c) => (
                <button key={c.key} className={category === c.key ? "is-on" : ""} onClick={() => setCategory(c.key)}>
                  {c.label} · {c.labelCn} <span style={{ opacity: 0.6 }}>{i.filter(c.test).length}</span>
                </button>
              ))}
            </div>
            <label className="ui-row" style={{ position: "relative", flex: "0 1 320px" }}>
              <SearchIcon size={16} style={{ position: "absolute", left: 12, opacity: 0.6 }} />
              <input className="ui-input" style={{ paddingLeft: 36 }} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar juego · 搜索游戏" />
            </label>
          </div>
          {list.length ? (
            <div className="ui-grid auto" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
              {list.map((g) => (
                <GameCard key={g.id} game={g} />
              ))}
            </div>
          ) : (
            <div className="ui-empty">No hay juegos con «{query}».</div>
          )}
        </section>
      </div>
    </StarfieldBackground>
  );
}
export { JuegosHubPage as default };
