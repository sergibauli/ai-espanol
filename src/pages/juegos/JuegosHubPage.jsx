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
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { useLanguage } from "../../lib/i18n.jsx";
const i = [
  {
    id: "kahoot",
    name: "Kahoot Quiz",
    nameCn: "卡胡特问答",
    desc: "Compite con preguntas tipo quiz al estilo Kahoot",
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
    nameCn: "Hangman",
    desc: "Adivina la palabra antes de que sea demasiado tarde",
    descCn: "在太迟之前猜出单词",
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
    desc: "Completa el crucigrama con palabras en espanol",
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
    nameCn: "单词搜索",
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
    desc: "Gira la ruleta y aprende nuevas palabras",
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
    desc: "Ordena las letras para formar la palabra correcta",
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
    desc: "Estudia vocabulario con tarjetas en 3D que se voltean",
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
    desc: "Empareja palabras españolas con chinas contra el tiempo",
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
    desc: "Responde preguntas tipo quiz con multiplicadores de racha",
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
    desc: "Recoge las letras en orden en el laberinto",
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
    desc: "Escribe las palabras lo mas rapido posible",
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
    desc: "Arma la palabra con las piezas del puzzle",
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
    nameCn: "单词冲刺",
    desc: "Escribe las palabras lo mas rapido posible",
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
    desc: "Encuentra y haz clic en el español correcto",
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
    desc: "Encuentra la palabra que orbita correcta",
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
    desc: "Combina las sílabas para formar palabras completas",
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
    desc: "Escribe las palabras antes de que la tormenta te golpee",
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
    desc: "Selecciona los bloques 3D en el orden correcto para formar la palabra",
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
    desc: "Descifra el código de símbolos para revelar la palabra secreta",
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
    desc: "Trivia de vocabulario con preguntas tipo Kahoot y bonus por tiempo",
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
    desc: "Pinball de palabras: selecciona el bloque correcto con efectos 3D",
    descCn: "单词弹球：选择正确的3D方块",
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
    desc: "Tetris de palabras: forma palabras con letras que caen",
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
    desc: "Pac-Man de palabras: recoge letras en el laberinto mientras evitas fantasmas",
    descCn: "单词吃豆人：在迷宫中收集字母并躲避幽灵",
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
    desc: "Shooter espacial: destruye naves enemigas escribiendo palabras en 3D",
    descCn: "太空射击：输入单词摧毁3D敌舰",
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
    desc: "Matching 3D: Encuentra parejas español↔chino en tarjetas de cristal",
    descCn: "3D配对：在水晶卡片中找到西班牙语和中文配对",
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
    desc: "Carrera de palabras: compite contra la IA en una pista 3D",
    descCn: "单词赛车：在3D赛道上与AI竞速",
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
    desc: "Defensa de torre: destruye asteroides con palabras antes de que golpeen la torre",
    descCn: "塔防游戏：在陨石击中塔之前摧毁它们",
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
    desc: "Vaquero del Oeste: dispara letreros con la palabra correcta",
    descCn: "西部牛仔：射击带有正确单词的木牌",
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
    desc: "Ninja espadachín: corta palabras que caen antes de que toquen el suelo",
    descCn: "忍者剑客：在单词落地前斩断它们",
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
    desc: "Aventura RPG épica: derrota monstruos traduciendo palabras en tu búsqueda",
    descCn: "史诗RPG冒险：通过翻译单词击败怪物的旅程",
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
    desc: "Un arquero dispara flechas a dianas con palabras españolas. Escribe la traducción china para acertar",
    descCn: "弓箭手射击带有西班牙语单词的靶子，输入中文翻译命中",
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
    desc: "Candy Crush de palabras: intercambia dulces para formar palabras en español con explosiones espectaculares",
    descCn: "糖果单词消消乐：交换糖果方块组成西班牙语单词， spectacular爆炸效果",
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
    desc: "Scrabble en español: coloca letras en el tablero 15x15 para formar palabras con bonus espectaculares",
    descCn: "西班牙语拼字游戏：在15x15棋盘上放置字母组成单词， spectacular加分",
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
    desc: "Alterna palabras conectadas por su última letra. Sin repeticiones, contra el reloj.",
    descCn: "通过最后一个字母连接单词，不许重复，限时",
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
    desc: "Clásico 3 en raya. Juega con un amigo o contra la IA con 3 niveles de dificultad.",
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
    desc: "Juego clásico de UNO en español. Dos jugadores, cartas especiales y palabras de vocabulario.",
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
    desc: "Practica la pronunciacion de silabas espanolas",
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
const S = 24;
const k = (r) =>
  String(r || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
const fa = (r) =>
  `${r.name} ${r.desc || ""} ${(r.tags || []).join(" ")} ${String(r.nameCn ?? "")} ${String(r.descCn ?? "")}`;
function YaComponent() {
  const { t } = useLanguage();
  const [n, setN] = React.useState("todos");
  const [d, setD] = React.useState("");
  const [l, setL] = React.useState(false);
  const [c, setC] = React.useState(false);
  React.useEffect(() => {
    const a = window.setTimeout(() => setC(true), 30);
    return () => window.clearTimeout(a);
  }, []);
  React.useEffect(() => {
    setL(false);
  }, [n, d]);
  const h = p.find((a) => a.key === n) || p[0];
  const s = React.useMemo(() => {
    const a = k(d.trim());
    return i.filter((o) => h.test(o) && (!a || k(fa(o)).includes(a)));
  }, [h, d]);
  const D = l ? s : s.slice(0, S);
  return (
    <StarfieldBackground>
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-3 pb-16 pt-4 sm:px-4">
        <div
          className={`mb-3 flex items-center gap-2.5 transition-all duration-700 sm:mb-4 ${c ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <Link
            to="/dashboard"
            aria-label={t("Volver", "返回")}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/60 transition-colors hover:text-white"
            style={{
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.1)",
            }}
          >
            <ArrowLeftIcon size={16} />
          </Link>
          <div className="min-w-0">
            <h1
              className="mx-font-display truncate text-xl font-extrabold sm:text-3xl"
              style={{
                background: "linear-gradient(135deg, #ffb33b 0%, #ff6b1a 45%, #ff36d7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 24px rgba(255,179,59,.35))",
              }}
            >
              <Gamepad2Icon className="mr-1.5 inline align-[-3px]" size={18} /> {t("Juegos", "游戏")}
            </h1>
            <p className="mx-font-mono text-[11px] text-white/40">
              {i.length} {t("juegos disponibles", "个游戏")} · {t("elige y juega", "选一个开始")}
            </p>
          </div>
        </div>
        <div className="relative mb-2.5">
          <SearchIcon
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/35"
            size={16}
          />
          <input
            value={d}
            onChange={(a) => setD(a.target.value)}
            type="search"
            inputMode="search"
            enterKeyHint="search"
            aria-label={t("Buscar juegos", "搜索游戏")}
            placeholder={t("Buscar juego...", "搜索游戏...")}
            className="h-11 w-full rounded-2xl pl-10 pr-20 text-sm font-bold text-white outline-none placeholder:text-white/30"
            style={{
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(255,255,255,.12)",
            }}
          />
          {d.length > 0 && (
            <button
              onClick={() => setD("")}
              className="absolute right-2 top-1/2 h-10 -translate-y-1/2 rounded-full px-3.5 text-[11px] font-black text-white/60 transition-colors hover:text-white"
              style={{
                background: "rgba(255,255,255,.07)",
              }}
            >
              {t("Borrar", "清除")}
            </button>
          )}
        </div>
        <div className="mx-noscroll mb-3 flex items-center gap-2 overflow-x-auto pb-1">
          {p.map((a) => {
            const o = a.key === n;
            const z = a.key === "todos" ? i.length : i.filter(a.test).length;
            return (
              <button
                key={a.key}
                onClick={() => setN(a.key)}
                aria-pressed={o}
                className="h-10 shrink-0 rounded-full px-4 text-xs font-black transition-all duration-300 hover:-translate-y-0.5"
                style={
                  o
                    ? {
                        background: `${a.color}1f`,
                        border: `1px solid ${a.color}`,
                        color: a.color,
                        boxShadow: `0 0 16px ${a.color}59`,
                      }
                    : {
                        background: "rgba(255,255,255,.04)",
                        border: "1px solid rgba(255,255,255,.1)",
                        color: "rgba(255,255,255,.5)",
                      }
                }
              >
                {t(a.label, a.labelCn)}
                <span className="ml-1.5 font-bold opacity-60">{z}</span>
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
          {D.map((a, o) => (
            <Link
              key={a.id}
              to={a.path}
              title={`${a.name} — ${a.desc || ""}`}
              className="group flex flex-col items-center gap-1.5 rounded-2xl p-2 text-center transition-transform duration-300 hover:-translate-y-1"
              style={{
                opacity: c ? 1 : 0,
                transform: c ? "none" : "translateY(10px)",
                transition: "opacity .5s ease, transform .5s ease",
                transitionDelay: `${Math.min(o, 20) * 22}ms`,
              }}
            >
              <span
                className="relative flex h-14 w-14 items-center justify-center rounded-2xl sm:h-16 sm:w-16"
                style={{
                  background: a.gradient,
                  boxShadow: a.shadow,
                  animation: `mxFloat 3.6s ease-in-out ${(o % 7) * 0.28}s infinite`,
                }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: a.after,
                  }}
                />
                <a.icon
                  size={26}
                  className="relative text-white"
                  style={{
                    filter: "drop-shadow(0 2px 6px rgba(0,0,0,.45))",
                  }}
                />
              </span>
              <span className="line-clamp-2 text-[10px] font-bold leading-tight text-white/85 sm:text-[11px]">
                {a.name}
              </span>
            </Link>
          ))}
        </div>
        {s.length === 0 && (
          <p className="mx-font-mono py-14 text-center text-sm text-white/45">
            {t("Ningún juego coincide con esa búsqueda.", "没有匹配的游戏。")}
          </p>
        )}
        {s.length > S && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setL((a) => !a)}
              className="h-11 rounded-full px-5 text-xs font-black transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "rgba(255,179,59,.12)",
                border: "1px solid rgba(255,179,59,.4)",
                color: "#ffd36b",
                boxShadow: "0 0 18px rgba(255,179,59,.18)",
              }}
            >
              <SparklesIcon className="mr-1.5 inline align-[-3px]" size={13} />
              {l
                ? t("Ver menos", "收起")
                : `${t("Ver los", "显示全部")} ${s.length} ${t("juegos", "个游戏")}`}
              <ChevronRightIcon
                className={`ml-1 inline align-[-3px] transition-transform duration-300 ${l ? "rotate-90" : ""}`}
                size={13}
              />
            </button>
          </div>
        )}
        <style>{`
          .mx-noscroll::-webkit-scrollbar { display: none; }
          .mx-noscroll { -ms-overflow-style: none; scrollbar-width: none; }
          @keyframes mxFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
          @media (prefers-reduced-motion: reduce) { .mx-noscroll, a { animation: none !important; } }
        `}</style>
      </div>
    </StarfieldBackground>
  );
}
export { YaComponent as default };
