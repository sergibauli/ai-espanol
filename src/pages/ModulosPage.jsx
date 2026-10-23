import {
  BookMarkedIcon,
  BookOpenIcon,
  LightbulbIcon,
  BrainIcon,
  ZapIcon,
  Gamepad2Icon,
  EyeOffIcon,
  EyeIcon,
  CheckIcon,
  FileTextIcon,
  MessageCircleIcon,
  PenToolIcon,
  ArrowLeftIcon,
} from "lucide-react";
import * as React from "react";
import { CompassIcon, FileCheckIcon } from "lucide-react";
import MODULE_CATALOG from "../data/modulos/catalog.json";
import { SectionHero } from "../components/ui/SectionHero.jsx";
import { useParams } from "react-router";
import { StarfieldBackground } from "../components/fx/StarfieldBackground.jsx";
import { L as L_1 } from "../components/LearningImpactScene.jsx";
import { a } from "../data/generated-content.js";
import { useLanguage } from "../lib/i18n.jsx";
import {
  getModuleProgress,
  countCompletedModules,
  completeModule,
  markModuleVisited,
} from "../lib/progress.js";
const wo = [
  {
    id: "modulo-1",
    numero: 1,
    numeroTexto: "uno",
    titulo: "Hola y Adiós - Saludos Básicos",
    tituloChino: "你好和再见 - 基本问候",
    descripcion: "学习西班牙语最基本的问候语，包括如何根据时间打招呼、如何告别以及如何问候他人。",
    descripcionChino: "学习西班牙语最基本的问候语",
    icono: "👋",
    color: "#3498db",
    teoriaCount: 10,
    vocabularioCount: 22,
    dialogosCount: 5,
  },
  {
    id: "modulo-2",
    numero: 2,
    numeroTexto: "dos",
    titulo: "Por Favor y Gracias - Cortesía",
    tituloChino: "请和谢谢 - 礼貌用语",
    descripcion: "学习西班牙语中最基本的礼貌用语，包括如何请求、感谢、道歉和回应。",
    descripcionChino: "学习西班牙语中最基本的礼貌用语",
    icono: "🙏",
    color: "#e74c3c",
    teoriaCount: 12,
    vocabularioCount: 22,
    dialogosCount: 5,
  },
  {
    id: "modulo-3",
    numero: 3,
    numeroTexto: "tres",
    titulo: "Me Llamo... - Presentaciones",
    tituloChino: "我叫... - 自我介绍",
    descripcion: "学习如何用西班牙语自我介绍、介绍他人以及询问别人的名字和来源。",
    descripcionChino: "学习如何用西班牙语自我介绍和介绍他人",
    icono: "🎭",
    color: "#9b59b6",
    teoriaCount: 12,
    vocabularioCount: 25,
    dialogosCount: 5,
  },
  {
    id: "modulo-4",
    numero: 4,
    numeroTexto: "cuatro",
    titulo: "Uno, Dos, Tres - Números 0-20",
    tituloChino: "一，二，三 - 数字0-20",
    descripcion: "学习用西班牙语从0数到20，包括数字的写法和用法。",
    descripcionChino: "学习用西班牙语从0数到20",
    icono: "🔢",
    color: "#f39c12",
    teoriaCount: 12,
    vocabularioCount: 22,
    dialogosCount: 5,
  },
  {
    id: "modulo-5",
    numero: 5,
    numeroTexto: "cinco",
    titulo: "Veintiuno, Treinta... - Números 20-100",
    tituloChino: "二十一，三十... - 数字20-100",
    descripcion: "学习用西班牙语从20数到100，包括整十数和中间数字的构成。",
    descripcionChino: "学习用西班牙语从20数到100",
    icono: "💯",
    color: "#1abc9c",
    teoriaCount: 12,
    vocabularioCount: 19,
    dialogosCount: 5,
  },
  {
    id: "modulo-6",
    numero: 6,
    numeroTexto: "seis",
    titulo: "¿De Dónde Eres? - Origen y Nacionalidad",
    tituloChino: "你来自哪里？ - 国籍和来源",
    descripcion: "学习用西班牙语询问和回答国籍与来源地。",
    descripcionChino: "学习用西班牙语询问和回答国籍与来源地",
    icono: "🌍",
    color: "#3498db",
    teoriaCount: 12,
    vocabularioCount: 34,
    dialogosCount: 5,
  },
  {
    id: "modulo-7",
    numero: 7,
    numeroTexto: "siete",
    titulo: "¿Dónde Vives? - La Vivienda",
    tituloChino: "你住在哪里？ - 住所",
    descripcion: "学习用西班牙语询问和回答住处、住房类型和位置。",
    descripcionChino: "学习用西班牙语询问和回答住处、住房类型和位置",
    icono: "🏠",
    color: "#e74c3c",
    teoriaCount: 12,
    vocabularioCount: 24,
    dialogosCount: 5,
  },
  {
    id: "modulo-8",
    numero: 8,
    numeroTexto: "ocho",
    titulo: "¿A Qué Te Dedicas? - Profesiones",
    tituloChino: "你是做什么工作的？ - 职业",
    descripcion: "学习用西班牙语谈论职业、询问工作内容和地点。",
    descripcionChino: "学习用西班牙语谈论职业、询问工作内容和地点",
    icono: "💼",
    color: "#607d8b",
    teoriaCount: 12,
    vocabularioCount: 37,
    dialogosCount: 5,
  },
  {
    id: "modulo-9",
    numero: 9,
    numeroTexto: "nueve",
    titulo: "Lunes, Martes... - Días de la Semana",
    tituloChino: "星期一，星期二... - 星期几",
    descripcion: "学习西班牙语中一周七天的名称、用法和常见表达。",
    descripcionChino: "学习西班牙语中一周七天的名称、用法和常见表达",
    icono: "📅",
    color: "#3498db",
    teoriaCount: 12,
    vocabularioCount: 20,
    dialogosCount: 5,
  },
  {
    id: "modulo-10",
    numero: 10,
    numeroTexto: "diez",
    titulo: "Enero, Febrero... - Meses del Año",
    tituloChino: "一月，二月... - 月份",
    descripcion: "学习西班牙语中12个月的名称、季节和日期表达。",
    descripcionChino: "学习西班牙语中12个月的名称、季节和日期表达",
    icono: "📆",
    color: "#e74c3c",
    teoriaCount: 12,
    vocabularioCount: 22,
    dialogosCount: 5,
  },
  {
    id: "modulo-11",
    numero: 11,
    numeroTexto: "once",
    titulo: "¿Qué Hora Es? - La Hora",
    tituloChino: "几点了？ - 时间",
    descripcion: "学习用西班牙语询问和表达时间，包括整点、分钟和上下午。",
    descripcionChino: "学习用西班牙语询问和表达时间，包括整点、分钟和上下午",
    icono: "🕐",
    color: "#9b59b6",
    teoriaCount: 13,
    vocabularioCount: 18,
    dialogosCount: 5,
  },
  {
    id: "modulo-12",
    numero: 12,
    numeroTexto: "doce",
    titulo: "Primero, Segundo, Tercero - Números Ordinales",
    tituloChino: "第一，第二，第三 - 序数词",
    descripcion: "学习用西班牙语表达顺序和排名：第一、第二、第三等。",
    descripcionChino: "学习用西班牙语表达顺序和排名：第一、第二、第三等",
    icono: "🥇",
    color: "#f1c40f",
    teoriaCount: 12,
    vocabularioCount: 22,
    dialogosCount: 5,
  },
  {
    id: "modulo-13",
    numero: 13,
    numeroTexto: "trece",
    titulo: "Rojo, Azul, Verde - Colores",
    tituloChino: "红色，蓝色，绿色 - 颜色",
    descripcion: "学习西班牙语中基本颜色的名称和用法。",
    descripcionChino: "学习西班牙语中基本颜色的名称和用法",
    icono: "🎨",
    color: "#e91e63",
    teoriaCount: 12,
    vocabularioCount: 17,
    dialogosCount: 5,
  },
  {
    id: "modulo-14",
    numero: 14,
    numeroTexto: "catorce",
    titulo: "Mi Familia - La Familia",
    tituloChino: "我的家庭 - 家庭",
    descripcion: "学习用西班牙语谈论家庭成员、介绍家人和询问家庭情况。",
    descripcionChino: "学习用西班牙语谈论家庭成员、介绍家人和询问家庭情况",
    icono: "👨‍👩‍👧‍👦",
    color: "#ff9800",
    teoriaCount: 12,
    vocabularioCount: 27,
    dialogosCount: 5,
  },
  {
    id: "modulo-15",
    numero: 15,
    numeroTexto: "quince",
    titulo: "Mi Casa - Habitaciones y Muebles",
    tituloChino: "我的家 - 房间和家具",
    descripcion: "学习用西班牙语描述房子的房间、家具和物品位置。",
    descripcionChino: "学习用西班牙语描述房子的房间、家具和物品位置",
    icono: "🏠",
    color: "#8d6e63",
    teoriaCount: 12,
    vocabularioCount: 25,
    dialogosCount: 5,
  },
  {
    id: "modulo-16",
    numero: 16,
    numeroTexto: "dieciséis",
    titulo: "Tengo Hambre - Comida y Bebida",
    tituloChino: "我饿了 - 食物和饮料",
    descripcion: "学习用西班牙语谈论食物、饮料和用餐表达。",
    descripcionChino: "学习用西班牙语谈论食物、饮料和用餐表达",
    icono: "🍽️",
    color: "#8bc34a",
    teoriaCount: 12,
    vocabularioCount: 34,
    dialogosCount: 5,
  },
  {
    id: "modulo-17",
    numero: 17,
    numeroTexto: "diecisiete",
    titulo: "Mi Ropa - Prendas de Vestir",
    tituloChino: "我的衣服 - 服装",
    descripcion: "学习用西班牙语描述衣服、配饰和购物用语。",
    descripcionChino: "学习用西班牙语描述衣服、配饰和购物用语",
    icono: "👕",
    color: "#3b82f6",
    teoriaCount: 12,
    vocabularioCount: 31,
    dialogosCount: 5,
  },
  {
    id: "modulo-18",
    numero: 18,
    numeroTexto: "dieciocho",
    titulo: "El Cuerpo Humano - Partes del Cuerpo",
    tituloChino: "人体 - 身体部位",
    descripcion: "学习用西班牙语说出身体各部位的名称和表达疼痛。",
    descripcionChino: "学习用西班牙语说出身体各部位的名称和表达疼痛",
    icono: "🧍",
    color: "#ef5350",
    teoriaCount: 12,
    vocabularioCount: 30,
    dialogosCount: 5,
  },
  {
    id: "modulo-19",
    numero: 19,
    numeroTexto: "diecinueve",
    titulo: "Practico Deporte - Deportes y Ejercicio",
    tituloChino: "我做运动 - 运动和锻炼",
    descripcion: "学习用西班牙语谈论运动、锻炼和体育活动。",
    descripcionChino: "学习用西班牙语谈论运动、锻炼和体育活动",
    icono: "⚽",
    color: "#4caf50",
    teoriaCount: 12,
    vocabularioCount: 28,
    dialogosCount: 5,
  },
  {
    id: "modulo-20",
    numero: 20,
    numeroTexto: "veinte",
    titulo: "Medios de Transporte - Viajar",
    tituloChino: "交通工具 - 旅行",
    descripcion: "学习用西班牙语谈论交通工具、出行方式和旅行用语。",
    descripcionChino: "学习用西班牙语谈论交通工具、出行方式和旅行用语",
    icono: "🚗",
    color: "#2196f3",
    teoriaCount: 12,
    vocabularioCount: 26,
    dialogosCount: 5,
  },
  {
    id: "modulo-21",
    numero: 21,
    numeroTexto: "veintiuno",
    titulo: "¿Qué Tiempo Hace? - El Clima",
    tituloChino: "天气怎么样？ - 气候",
    descripcion: "学习用西班牙语谈论天气、气候和季节变化。",
    descripcionChino: "学习用西班牙语谈论天气、气候和季节变化",
    icono: "🌤️",
    color: "#42a5f5",
    teoriaCount: 12,
    vocabularioCount: 20,
    dialogosCount: 5,
  },
  {
    id: "modulo-22",
    numero: 22,
    numeroTexto: "veintidós",
    titulo: "La Ciudad - Lugares y Direcciones",
    tituloChino: "城市 - 地点和方向",
    descripcion: "学习用西班牙语说出城市中的各种地点和问路指路。",
    descripcionChino: "学习用西班牙语说出城市中的各种地点和问路指路",
    icono: "🏙️",
    color: "#3f51b5",
    teoriaCount: 12,
    vocabularioCount: 28,
    dialogosCount: 5,
  },
  {
    id: "modulo-23",
    numero: 23,
    numeroTexto: "veintitrés",
    titulo: "Animales - Mascotas y Animales Salvajes",
    tituloChino: "动物 - 宠物和野生动物",
    descripcion: "学习用西班牙语说出各种动物的名称和描述动物特征。",
    descripcionChino: "学习用西班牙语说出各种动物的名称和描述动物特征",
    icono: "🐕",
    color: "#84cc16",
    teoriaCount: 12,
    vocabularioCount: 34,
    dialogosCount: 5,
  },
  {
    id: "modulo-24",
    numero: 24,
    numeroTexto: "veinticuatro",
    titulo: "La Música - Géneros e Instrumentos",
    tituloChino: "音乐 - 流派和乐器",
    descripcion: "学习用西班牙语谈论音乐类型、乐器和音乐喜好。",
    descripcionChino: "学习用西班牙语谈论音乐类型、乐器和音乐喜好",
    icono: "🎵",
    color: "#e91e63",
    teoriaCount: 12,
    vocabularioCount: 28,
    dialogosCount: 5,
  },
  {
    id: "modulo-25",
    numero: 25,
    numeroTexto: "veinticinco",
    titulo: "Tecnología - Móvil, Ordenador e Internet",
    tituloChino: "科技 - 手机、电脑和互联网",
    descripcion: "学习用西班牙语谈论科技设备、应用程序和在线活动。",
    descripcionChino: "学习用西班牙语谈论科技设备、应用程序和在线活动",
    icono: "📱",
    color: "#6366f1",
    teoriaCount: 12,
    vocabularioCount: 29,
    dialogosCount: 5,
  },
  {
    id: "modulo-26",
    numero: 26,
    numeroTexto: "veintiséis",
    titulo: "El Tiempo Libre y las Aficiones",
    tituloChino: "休闲时光与爱好",
    descripcion: "学习用西班牙语谈论你的爱好、休闲活动和空闲时间。",
    descripcionChino: "学习用西班牙语谈论你的爱好、休闲活动和空闲时间",
    icono: "🎨",
    color: "#e67e22",
    teoriaCount: 4,
    vocabularioCount: 20,
    dialogosCount: 5,
  },
  {
    id: "modulo-27",
    numero: 27,
    numeroTexto: "veintisiete",
    titulo: "Vacaciones y Viajes - Planes y Destinos",
    tituloChino: "假期和旅行 - 计划和目的地",
    descripcion: "学习用西班牙语谈论假期计划、旅行目的地和旅行体验。",
    descripcionChino: "学习用西班牙语谈论假期计划、旅行目的地和旅行体验",
    icono: "✈️",
    color: "#00bcd4",
    teoriaCount: 12,
    vocabularioCount: 24,
    dialogosCount: 5,
  },
  {
    id: "modulo-28",
    numero: 28,
    numeroTexto: "veintiocho",
    titulo: "Mi Rutina Diaria - Verbos Reflexivos",
    tituloChino: "我的日常生活 - 反身动词",
    descripcion: "学习用西班牙语描述日常作息和习惯性活动。",
    descripcionChino: "学习用西班牙语描述日常作息和习惯性活动",
    icono: "🌅",
    color: "#ff7043",
    teoriaCount: 12,
    vocabularioCount: 25,
    dialogosCount: 5,
  },
  {
    id: "modulo-29",
    numero: 29,
    numeroTexto: "veintinueve",
    titulo: "En el Restaurante - Pedir Comida",
    tituloChino: "在餐厅 - 点餐",
    descripcion: "学习用西班牙语在餐厅点餐、询问菜品和结账。",
    descripcionChino: "学习用西班牙语在餐厅点餐、询问菜品和结账",
    icono: "🍽️",
    color: "#ff5722",
    teoriaCount: 12,
    vocabularioCount: 18,
    dialogosCount: 5,
  },
  {
    id: "modulo-30",
    numero: 30,
    numeroTexto: "treinta",
    titulo: "Los Verbos - Introducción a la Conjugación",
    tituloChino: "动词 - 变位介绍",
    descripcion: "学习西班牙语动词的基本概念：三种变位类型、动词原形和基本用法。",
    descripcionChino: "学习西班牙语动词的基本概念：三种变位类型、动词原形和基本用法",
    icono: "📝",
    color: "#7cb342",
    teoriaCount: 12,
    vocabularioCount: 15,
    dialogosCount: 5,
  },
  {
    id: "modulo-31",
    numero: 31,
    numeroTexto: "treinta y uno",
    titulo: "La Descripción Física - ¿Cómo eres?",
    tituloChino: "外貌描述 - 你长什么样？",
    descripcion: "学习用西班牙语描述人的外貌特征：身高、体型、头发、眼睛等。",
    descripcionChino: "学习用西班牙语描述人的外貌特征：身高、体型、头发、眼睛等",
    icono: "👤",
    color: "#ff9800",
    teoriaCount: 12,
    vocabularioCount: 26,
    dialogosCount: 5,
  },
  {
    id: "modulo-32",
    numero: 32,
    numeroTexto: "treinta y dos",
    titulo: "El Cine - Películas y Géneros",
    tituloChino: "电影 - 影片和类型",
    descripcion: "学习用西班牙语谈论电影类型、演员和观影体验。",
    descripcionChino: "学习用西班牙语谈论电影类型、演员和观影体验",
    icono: "🎬",
    color: "#3f51b5",
    teoriaCount: 12,
    vocabularioCount: 26,
    dialogosCount: 5,
  },
  {
    id: "modulo-33",
    numero: 33,
    numeroTexto: "treinta y tres",
    titulo: "Comparativos y Superlativos - Comparar",
    tituloChino: "比较级和最高级 - 比较",
    descripcion: "学习用西班牙语比较人和事物，表达最高级。",
    descripcionChino: "学习用西班牙语比较人和事物，表达最高级",
    icono: "⚖️",
    color: "#26a69a",
    teoriaCount: 12,
    vocabularioCount: 14,
    dialogosCount: 5,
  },
  {
    id: "modulo-34",
    numero: 34,
    numeroTexto: "treinta y cuatro",
    titulo: "Futuro Próximo - Voy a...",
    tituloChino: "最近将来时 - 我要...",
    descripcion: "学习用西班牙语表达即将发生的动作和未来计划。",
    descripcionChino: "学习用西班牙语表达即将发生的动作和未来计划",
    icono: "🔮",
    color: "#7e57c2",
    teoriaCount: 12,
    vocabularioCount: 14,
    dialogosCount: 5,
  },
  {
    id: "modulo-35",
    numero: 35,
    numeroTexto: "treinta y cinco",
    titulo: "Preposiciones de Lugar - ¿Dónde está?",
    tituloChino: "地点介词 - 在哪里？",
    descripcion: "学习用西班牙语描述物体的位置和方向。",
    descripcionChino: "学习用西班牙语描述物体的位置和方向",
    icono: "📍",
    color: "#ff9800",
    teoriaCount: 12,
    vocabularioCount: 23,
    dialogosCount: 5,
  },
  {
    id: "modulo-36",
    numero: 36,
    numeroTexto: "treinta y seis",
    titulo: "Pronombres de Objeto - Me, Te, Lo, La, Le, Nos, Os, Los, Las, Les",
    tituloChino: "宾语代词 - 我，你，他，她，它，我们，你们，他们",
    descripcion: "学习用西班牙语使用直接宾语和间接宾语代词。",
    descripcionChino: "学习用西班牙语使用直接宾语和间接宾语代词",
    icono: "🎯",
    color: "#00897b",
    teoriaCount: 12,
    vocabularioCount: 14,
    dialogosCount: 5,
  },
  {
    id: "modulo-37",
    numero: 37,
    numeroTexto: "treinta y siete",
    titulo: "El Presente - Verbos Regulares",
    tituloChino: "现在时 - 规则动词",
    descripcion: "学习用西班牙语动词现在时的变位和用法。",
    descripcionChino: "学习用西班牙语动词现在时的变位和用法",
    icono: "📝",
    color: "#795548",
    teoriaCount: 12,
    vocabularioCount: 15,
    dialogosCount: 5,
  },
  {
    id: "modulo-38",
    numero: 38,
    numeroTexto: "treinta y ocho",
    titulo: "Verbos Irregulares - Ser, Estar, Tener, Ir",
    tituloChino: "不规则动词 - Ser, Estar, Tener, Ir",
    descripcion: "学习西班牙语中最常用的四个不规则动词的变位和用法。",
    descripcionChino: "学习西班牙语中最常用的四个不规则动词的变位和用法",
    icono: "⚡",
    color: "#7cb342",
    teoriaCount: 12,
    vocabularioCount: 24,
    dialogosCount: 5,
  },
  {
    id: "modulo-39",
    numero: 39,
    numeroTexto: "treinta y nueve",
    titulo: "Pretérito Perfecto - He hablado, He comido",
    tituloChino: "现在完成时 - 我已经说了，我已经吃了",
    descripcion: "学习用西班牙语表达过去发生的动作，但结果延续到现在。",
    descripcionChino: "学习用西班牙语表达过去发生的动作，但结果延续到现在",
    icono: "⏰",
    color: "#5e35b1",
    teoriaCount: 12,
    vocabularioCount: 21,
    dialogosCount: 5,
  },
  {
    id: "modulo-40",
    numero: 40,
    numeroTexto: "cuarenta",
    titulo: "Direcciones y Cómo Llegar - Preguntar y Dar Indicaciones",
    tituloChino: "方向和如何到达 - 问路和指路",
    descripcion: "学习用西班牙语问路、指路和描述位置。",
    descripcionChino: "学习用西班牙语问路、指路和描述位置",
    icono: "🗺️",
    color: "#42a5f5",
    teoriaCount: 12,
    vocabularioCount: 20,
    dialogosCount: 5,
  },
  {
    id: "modulo-41",
    numero: 41,
    numeroTexto: "cuarenta y uno",
    titulo: "Pretérito Indefinido - Acciones Pasadas Completadas",
    tituloChino: "简单过去时 - 已完成的过去动作",
    descripcion: "学习用西班牙语表达过去发生的、已经完成的动作。",
    descripcionChino: "学习用西班牙语表达过去发生的、已经完成的动作",
    icono: "⏮️",
    color: "#5c6bc0",
    teoriaCount: 12,
    vocabularioCount: 19,
    dialogosCount: 5,
  },
  {
    id: "modulo-42",
    numero: 42,
    numeroTexto: "cuarenta y dos",
    titulo: "El Imperfecto - Hábitos y Descripciones en el Pasado",
    tituloChino: "过去未完成时 - 过去的习惯和描述",
    descripcion: "学习用西班牙语描述过去的习惯性动作和背景。",
    descripcionChino: "学习用西班牙语描述过去的习惯性动作和背景",
    icono: "🕰️",
    color: "#ef5350",
    teoriaCount: 12,
    vocabularioCount: 14,
    dialogosCount: 5,
  },
  {
    id: "modulo-43",
    numero: 43,
    numeroTexto: "cuarenta y tres",
    titulo: "Futuro Simple - Hablar del Futuro",
    tituloChino: "简单将来时 - 谈论未来",
    descripcion: "学习用西班牙语表达将来的动作和计划。",
    descripcionChino: "学习用西班牙语表达将来的动作和计划",
    icono: "🔮",
    color: "#ffa726",
    teoriaCount: 12,
    vocabularioCount: 15,
    dialogosCount: 5,
  },
  {
    id: "modulo-44",
    numero: 44,
    numeroTexto: "cuarenta y cuatro",
    titulo: "Imperativo - Dar Órdenes y Consejos",
    tituloChino: "命令式 - 发出命令和建议",
    descripcion: "学习用西班牙语发出命令、请求、建议和指示。",
    descripcionChino: "学习用西班牙语发出命令、请求、建议和指示",
    icono: "📢",
    color: "#ef5350",
    teoriaCount: 12,
    vocabularioCount: 15,
    dialogosCount: 5,
  },
  {
    id: "modulo-45",
    numero: 45,
    numeroTexto: "cuarenta y cinco",
    titulo: "Subjuntivo Presente - Deseos, Dudas y Emociones",
    tituloChino: "虚拟式现在时 - 愿望、怀疑和情感",
    descripcion: "学习用西班牙语表达愿望、怀疑、情感和可能性。",
    descripcionChino: "学习用西班牙语表达愿望、怀疑、情感和可能性",
    icono: "💭",
    color: "#9b59b6",
    teoriaCount: 21,
    vocabularioCount: 25,
    dialogosCount: 10,
  },
  {
    id: "modulo-46",
    numero: 46,
    numeroTexto: "cuarenta y seis",
    titulo: "Condicional Simple",
    tituloChino: "简单条件式",
    descripcion: "学习西班牙语简单条件式的构成和用法，表达假设、愿望和礼貌请求。",
    descripcionChino: "学习西班牙语简单条件式的构成和用法，表达假设、愿望和礼貌请求",
    icono: "🎭",
    color: "#ab47bc",
    teoriaCount: 12,
    vocabularioCount: 15,
    dialogosCount: 5,
  },
  {
    id: "modulo-47",
    numero: 47,
    numeroTexto: "cuarenta y siete",
    titulo: "Oraciones Condicionales - Si + ...",
    tituloChino: "条件句 - 如果...",
    descripcion: "学习用西班牙语表达条件和假设。",
    descripcionChino: "学习用西班牙语表达条件和假设",
    icono: "🔀",
    color: "#ab47bc",
    teoriaCount: 12,
    vocabularioCount: 7,
    dialogosCount: 5,
  },
  {
    id: "modulo-48",
    numero: 48,
    numeroTexto: "cuarenta y ocho",
    titulo: "Pretérito Pluscuamperfecto - Había hablado, Había comido",
    tituloChino: "过去完成时 - 我已经说了，我已经吃了",
    descripcion: "学习用西班牙语表达过去之前发生的动作（过去的过去）。",
    descripcionChino: "学习用西班牙语表达过去之前发生的动作（过去的过去）",
    icono: "⏪",
    color: "#5c6bc0",
    teoriaCount: 12,
    vocabularioCount: 12,
    dialogosCount: 5,
  },
  {
    id: "modulo-49",
    numero: 49,
    numeroTexto: "cuarenta y nueve",
    titulo: "Imperfecto de Subjuntivo - Deseos en el Pasado",
    tituloChino: "虚拟式过去未完成时 - 过去的愿望",
    descripcion: "学习用西班牙语表达过去的愿望、怀疑和假设。",
    descripcionChino: "学习用西班牙语表达过去的愿望、怀疑和假设",
    icono: "⏳",
    color: "#7e57c2",
    teoriaCount: 12,
    vocabularioCount: 10,
    dialogosCount: 5,
  },
  {
    id: "modulo-50",
    numero: 50,
    numeroTexto: "cincuenta",
    titulo: "Estilo Indirecto - Decir, Preguntar, Pedir",
    tituloChino: "间接引语 - 说、问、请求",
    descripcion: "学习用西班牙语转述别人说的话、问题和请求。",
    descripcionChino: "学习用西班牙语转述别人说的话、问题和请求",
    icono: "🗣️",
    color: "#ff9800",
    teoriaCount: 12,
    vocabularioCount: 10,
    dialogosCount: 5,
  },
  {
    id: "modulo-51",
    numero: 51,
    numeroTexto: "cincuenta y uno",
    titulo: "El Medio Ambiente - Ecología y Sostenibilidad",
    tituloChino: "环境 - 生态和可持续性",
    descripcion: "学习用西班牙语谈论环境问题、生态保护和可持续性。",
    descripcionChino: "学习用西班牙语谈论环境问题、生态保护和可持续性",
    icono: "🌍",
    color: "#4caf50",
    teoriaCount: 10,
    vocabularioCount: 20,
    dialogosCount: 5,
  },
  {
    id: "modulo-52",
    numero: 52,
    numeroTexto: "cincuenta y dos",
    titulo: "Expresiones Idiomáticas - Hablar como un Nativo",
    tituloChino: "习语表达 - 像母语者一样说话",
    descripcion: "学习西班牙语中最常用的口语表达和习语。",
    descripcionChino: "学习西班牙语中最常用的口语表达和习语",
    icono: "🗣️",
    color: "#f39c12",
    teoriaCount: 12,
    vocabularioCount: 20,
    dialogosCount: 5,
  },
  {
    id: "modulo-53",
    numero: 53,
    numeroTexto: "cincuenta y tres",
    titulo: "Falsos Amigos - Palabras que Engañan",
    tituloChino: "假朋友 - 容易混淆的词",
    descripcion: "学习西班牙语中与英语相似但意思不同的单词，避免常见错误。",
    descripcionChino: "学习西班牙语中与英语相似但意思不同的单词，避免常见错误",
    icono: "⚠️",
    color: "#e74c3c",
    teoriaCount: 10,
    vocabularioCount: 22,
    dialogosCount: 5,
  },
  {
    id: "modulo-54",
    numero: 54,
    numeroTexto: "cincuenta y cuatro",
    titulo: "Expresiones de Tiempo - Cuando, Mientras, Después",
    tituloChino: "时间表达 - 当...时，同时，之后",
    descripcion: "学习用西班牙语表达时间顺序和同时发生的动作。",
    descripcionChino: "学习用西班牙语表达时间顺序和同时发生的动作",
    icono: "⏰",
    color: "#42a5f5",
    teoriaCount: 12,
    vocabularioCount: 18,
    dialogosCount: 5,
  },
  {
    id: "modulo-55",
    numero: 55,
    numeroTexto: "cincuenta y cinco",
    titulo: "Tiendas y Comercios - Dónde Comprar",
    tituloChino: "商店和商场 - 在哪里买东西",
    descripcion: "学习用西班牙语说出各种商店的名称和购物用语。",
    descripcionChino: "学习用西班牙语说出各种商店的名称和购物用语",
    icono: "🛒",
    color: "#ff9800",
    teoriaCount: 10,
    vocabularioCount: 20,
    dialogosCount: 5,
  },
  {
    id: "modulo-56",
    numero: 56,
    numeroTexto: "cincuenta y seis",
    titulo: "En el Banco - Dinero y Pagos",
    tituloChino: "在银行 - 金钱与支付",
    descripcion: "学习用西班牙语在银行开户、取钱、存钱、换汇和支付。",
    descripcionChino: "学习用西班牙语在银行开户、取钱、存钱、换汇和支付",
    icono: "🏦",
    color: "#27ae60",
    teoriaCount: 5,
    vocabularioCount: 20,
    dialogosCount: 5,
  },
  {
    id: "modulo-57",
    numero: 57,
    numeroTexto: "cincuenta y siete",
    titulo: "El Hotel - Alojamiento y Reservas",
    tituloChino: "酒店 - 住宿和预订",
    descripcion: "学习用西班牙语预订酒店、办理入住和退房。",
    descripcionChino: "学习用西班牙语预订酒店、办理入住和退房",
    icono: "🏨",
    color: "#00bcd4",
    teoriaCount: 10,
    vocabularioCount: 22,
    dialogosCount: 5,
  },
  {
    id: "modulo-58",
    numero: 58,
    numeroTexto: "cincuenta y ocho",
    titulo: "El Aeropuerto - Viajar en Avión",
    tituloChino: "机场 - 乘飞机旅行",
    descripcion: "学习用西班牙语在机场办理登机、过安检和登机。",
    descripcionChino: "学习用西班牙语在机场办理登机、过安检和登机",
    icono: "✈️",
    color: "#03a9f4",
    teoriaCount: 10,
    vocabularioCount: 19,
    dialogosCount: 5,
  },
  {
    id: "modulo-59",
    numero: 59,
    numeroTexto: "cincuenta y nueve",
    titulo: "La Salud - En el Médico y el Hospital",
    tituloChino: "健康 - 看医生和去医院",
    descripcion: "学习用西班牙语描述症状、看医生和买药。",
    descripcionChino: "学习用西班牙语描述症状、看医生和买药",
    icono: "🏥",
    color: "#f44336",
    teoriaCount: 10,
    vocabularioCount: 18,
    dialogosCount: 5,
  },
  {
    id: "modulo-60",
    numero: 60,
    numeroTexto: "sesenta",
    titulo: "La Educación - Escuela y Universidad",
    tituloChino: "教育 - 学校和大学",
    descripcion: "学习用西班牙语谈论教育体系、学校和大学生活。",
    descripcionChino: "学习用西班牙语谈论教育体系、学校和大学生活",
    icono: "📚",
    color: "#4caf50",
    teoriaCount: 10,
    vocabularioCount: 20,
    dialogosCount: 5,
  },
  {
    id: "modulo-101",
    numero: 101,
    numeroTexto: "ciento uno",
    titulo: "Español de Negocios - Introducción",
    tituloChino: "商务西班牙语 - 入门",
    descripcion:
      "Aprende a presentar tu empresa Sunson Energy, hablar de productos y tener reuniones de negocios en español.",
    descripcionChino: "学习用西班牙语介绍你的Sunson Energy公司、谈论产品和进行商务会议。",
    icono: "💼",
    color: "#e67e22",
    teoriaCount: 4,
    vocabularioCount: 15,
    dialogosCount: 2,
  },
  {
    id: "modulo-102",
    numero: 102,
    numeroTexto: "ciento dos",
    titulo: "Baterías de Litio - Producto Estrella",
    tituloChino: "锂电池 - 明星产品",
    descripcion: "Domina el vocabulario técnico y comercial para vender baterías de litio en español.",
    descripcionChino: "掌握用西班牙语销售锂电池的技术和商业词汇。",
    icono: "🔋",
    color: "#27ae60",
    teoriaCount: 4,
    vocabularioCount: 15,
    dialogosCount: 2,
  },
  {
    id: "modulo-103",
    numero: 103,
    numeroTexto: "ciento tres",
    titulo: "Paneles Solares - Energía Fotovoltaica",
    tituloChino: "太阳能板 - 光伏能源",
    descripcion: "Aprende a hablar de paneles solares, eficiencia, instalación y mantenimiento en español.",
    descripcionChino: "学习用西班牙语谈论太阳能板、效率、安装和维护。",
    icono: "☀️",
    color: "#f39c12",
    teoriaCount: 4,
    vocabularioCount: 15,
    dialogosCount: 2,
  },
  {
    id: "modulo-104",
    numero: 104,
    numeroTexto: "ciento cuatro",
    titulo: "Negociar con Proveedores",
    tituloChino: "与供应商谈判",
    descripcion:
      "Aprende a negociar con proveedores de materiales, componentes y servicios para tu empresa en español.",
    descripcionChino: "学习用西班牙语与材料、组件和服务供应商谈判。",
    icono: "🤝",
    color: "#9b59b6",
    teoriaCount: 3,
    vocabularioCount: 15,
    dialogosCount: 1,
  },
  {
    id: "modulo-105",
    numero: 105,
    numeroTexto: "ciento cinco",
    titulo: "Atraer Nuevos Clientes",
    tituloChino: "吸引新客户",
    descripcion:
      "Aprende estrategias y frases en español para captar nuevos clientes para tus productos solares y baterías.",
    descripcionChino: "学习用西班牙语吸引新客户购买你的太阳能产品和电池的策略和话术。",
    icono: "🎯",
    color: "#e74c3c",
    teoriaCount: 3,
    vocabularioCount: 15,
    dialogosCount: 1,
  },
  {
    id: "modulo-106",
    numero: 106,
    numeroTexto: "ciento seis",
    titulo: "Paneles Solares y Sistemas Inteligentes",
    tituloChino: "太阳能板和智能系统",
    descripcion:
      "Domina el vocabulario técnico y comercial para vender paneles solares y sistemas inteligentes en español.",
    descripcionChino: "掌握用西班牙语销售太阳能板和智能系统的技术和商业词汇。",
    icono: "☀️",
    color: "#f39c12",
    teoriaCount: 3,
    vocabularioCount: 15,
    dialogosCount: 1,
  },
  {
    id: "modulo-107",
    numero: 107,
    numeroTexto: "ciento siete",
    titulo: "Pedidos y Entregas",
    tituloChino: "订单和交货",
    descripcion:
      "Aprende a gestionar pedidos, plazos, stock y logística con clientes y proveedores en español.",
    descripcionChino: "学习用西班牙语与客户和供应商管理订单、交货期、库存和物流。",
    icono: "📦",
    color: "#3498db",
    teoriaCount: 3,
    vocabularioCount: 15,
    dialogosCount: 1,
  },
  {
    id: "modulo-108",
    numero: 108,
    numeroTexto: "ciento ocho",
    titulo: "Facturación y Pagos",
    tituloChino: "开票和付款",
    descripcion:
      "Aprende a gestionar facturas, pagos, métodos de pago internacional y chasing de cobros en español.",
    descripcionChino: "学习用西班牙语管理发票、付款、国际支付方式和催款。",
    icono: "💳",
    color: "#2ecc71",
    teoriaCount: 3,
    vocabularioCount: 15,
    dialogosCount: 1,
  },
  {
    id: "modulo-109",
    numero: 109,
    numeroTexto: "ciento nueve",
    titulo: "Atención al Cliente",
    tituloChino: "客户服务",
    descripcion:
      "Aprende a resolver dudas, quejas y problemas técnicos de clientes en español con profesionalidad.",
    descripcionChino: "学习用西班牙语专业地解决客户的疑问、投诉和技术问题。",
    icono: "🎧",
    color: "#9b59b6",
    teoriaCount: 3,
    vocabularioCount: 15,
    dialogosCount: 1,
  },
  {
    id: "modulo-110",
    numero: 110,
    numeroTexto: "ciento diez",
    titulo: "Ferias y Exposiciones",
    tituloChino: "展会和展览",
    descripcion:
      "Aprende a preparar, presentar y seguir leads en ferias comerciales del sector solar en español.",
    descripcionChino: "学习用西班牙语准备、展示和跟进太阳能行业商业展会的线索。",
    icono: "🏢",
    color: "#e67e22",
    teoriaCount: 3,
    vocabularioCount: 15,
    dialogosCount: 1,
  },
  {
    id: "modulo-111",
    numero: 111,
    numeroTexto: "ciento once",
    titulo: "Reuniones de Negocios",
    tituloChino: "商务会议",
    descripcion: "Domina el protocolo, vocabulario y dinámica de reuniones de negocios en español.",
    descripcionChino: "掌握西班牙语商务会议的礼仪、词汇和动态。",
    icono: "📊",
    color: "#1abc9c",
    teoriaCount: 3,
    vocabularioCount: 15,
    dialogosCount: 1,
  },
  {
    id: "modulo-112",
    numero: 112,
    numeroTexto: "ciento doce",
    titulo: "Presentación de Producto",
    tituloChino: "产品介绍",
    descripcion: "Aprende a presentar baterías, paneles y sistemas de forma persuasiva en español.",
    descripcionChino: "学习用西班牙语有说服力地介绍电池、太阳能板和系统。",
    icono: "📱",
    color: "#f39c12",
    teoriaCount: 3,
    vocabularioCount: 15,
    dialogosCount: 1,
  },
  {
    id: "modulo-113",
    numero: 113,
    numeroTexto: "ciento trece",
    titulo: "Marketing Digital",
    tituloChino: "数字营销",
    descripcion:
      "Aprende vocabulario y estrategias de marketing digital para promocionar productos solares en español.",
    descripcionChino: "学习用西班牙语推广太阳能产品的数字营销词汇和策略。",
    icono: "📢",
    color: "#e91e63",
    teoriaCount: 3,
    vocabularioCount: 15,
    dialogosCount: 1,
  },
  {
    id: "modulo-114",
    numero: 114,
    numeroTexto: "ciento catorce",
    titulo: "Especificaciones Técnicas",
    tituloChino: "技术规格",
    descripcion: "Domina el vocabulario técnico para describir baterías, paneles y sistemas en español.",
    descripcionChino: "掌握用西班牙语描述电池、太阳能板和系统的技术词汇。",
    icono: "⚙️",
    color: "#607d8b",
    teoriaCount: 3,
    vocabularioCount: 15,
    dialogosCount: 1,
  },
  {
    id: "modulo-115",
    numero: 115,
    numeroTexto: "ciento quince",
    titulo: "Servicio Post-venta",
    tituloChino: "售后服务",
    descripcion:
      "Aprende a gestionar garantías, mantenimiento, reparaciones y relación a largo plazo con clientes en español.",
    descripcionChino: "学习用西班牙语管理保修、维护、维修和与客户的长期关系。",
    icono: "🔧",
    color: "#34495e",
    teoriaCount: 3,
    vocabularioCount: 15,
    dialogosCount: 1,
  },
  {
    id: "modulo-116",
    numero: 116,
    numeroTexto: "ciento dieciséis",
    titulo: "Email Profesional en Español",
    tituloChino: "西班牙语商务邮件",
    descripcion: "Aprende a escribir emails formales, cotizaciones, reclamos y seguimientos en español.",
    descripcionChino: "学习用西班牙语写正式邮件、报价、投诉和跟进。",
    icono: "📧",
    color: "#00bcd4",
    teoriaCount: 4,
    vocabularioCount: 15,
    dialogosCount: 2,
  },
  {
    id: "modulo-117",
    numero: 117,
    numeroTexto: "ciento diecisiete",
    titulo: "Contratos y Acuerdos",
    tituloChino: "合同和协议",
    descripcion:
      "Aprende vocabulario legal y frases para negociar contratos de distribución y suministro en español.",
    descripcionChino: "学习用西班牙语谈判分销和供应合同的法律词汇和句子。",
    icono: "📜",
    color: "#ff9800",
    teoriaCount: 4,
    vocabularioCount: 15,
    dialogosCount: 2,
  },
  {
    id: "modulo-118",
    numero: 118,
    numeroTexto: "ciento dieciocho",
    titulo: "Logística Internacional",
    tituloChino: "国际物流",
    descripcion: "Aprende a gestionar envíos internacionales, aduanas, incoterms y seguros en español.",
    descripcionChino: "学习用西班牙语管理国际货运、海关、贸易术语和保险。",
    icono: "🚢",
    color: "#03a9f4",
    teoriaCount: 4,
    vocabularioCount: 15,
    dialogosCount: 2,
  },
  {
    id: "modulo-119",
    numero: 119,
    numeroTexto: "ciento diecinueve",
    titulo: "Expansión a Nuevos Mercados",
    tituloChino: "开拓新市场",
    descripcion:
      "Aprende estrategias y vocabulario para expandir tu negocio a nuevos países hispanohablantes.",
    descripcionChino: "学习开拓新西班牙语国家市场的策略和词汇。",
    icono: "🌎",
    color: "#4caf50",
    teoriaCount: 4,
    vocabularioCount: 15,
    dialogosCount: 2,
  },
  {
    id: "modulo-120",
    numero: 120,
    numeroTexto: "ciento veinte",
    titulo: "Español para Ejecutivos",
    tituloChino: "高管西班牙语",
    descripcion:
      "Aprende español avanzado para reuniones de dirección, presentaciones a inversores y networking ejecutivo.",
    descripcionChino: "学习用于董事会会议、投资者演讲和高管人脉的高级西班牙语。",
    icono: "👔",
    color: "#5e35b1",
    teoriaCount: 4,
    vocabularioCount: 15,
    dialogosCount: 2,
  },
];
const No = {
  "1-20": () => import("../data/modulos/modulos-01-20.js").then((i) => i.modulos01to20Module),
  "21-40": () => import("../data/modulos/modulos-21-40.js").then((i) => i.modulos21to40Module),
  "41-60": () => import("../data/modulos/modulos-41-60.js").then((i) => i.modulos41to60Module),
  "61-80": () => import("../data/modulos/modulos-61-80.js").then((i) => i.modulos61to80Module),
};
function Eo(i) {
  if (i >= 1 && i <= 20) {
    return "1-20";
  }
  if (i >= 21 && i <= 40) {
    return "21-40";
  }
  if (i >= 41 && i <= 60) {
    return "41-60";
  }
  if (i >= 61 && i <= 80) {
    return "61-80";
  }
  return null;
}
const D = {};
async function oo(i) {
  const n = a().find((p) => p.id === i);
  if (n) {
    return n;
  }
  const e = i.match(/modulo-(\d+)/);
  if (!e) {
    return null;
  }
  const C = parseInt(e[1], 10);
  const t = Eo(C);
  if (!t) {
    return null;
  }
  if (!D[t]) {
    const p = No[t];
    if (!p) {
      return null;
    }
    const j = await p();
    D[t] = j.default || [];
  }
  return D[t].find((p) => p.id === i) || null;
}
async function Mo() {
  const i = [
    ...wo.filter((e) => e.numero >= 1 && e.numero <= 60),
    ...MODULE_CATALOG.filter((e) => e.numero > 60).map((e) => ({ ...e, id: `modulo-${e.numero}` })),
  ].sort((e, C) => e.numero - C.numero);
  const n = a().map((e) => ({
    id: e.id,
    numero: e.numero,
    numeroTexto: e.numeroTexto,
    titulo: e.titulo,
    tituloChino: e.tituloChino,
    descripcion: e.descripcion,
    descripcionChino: e.descripcionChino,
    icono: e.icono,
    color: e.color,
    teoriaCount: (e.teoria || []).length,
    vocabularioCount: (e.vocabulario || []).length,
    dialogosCount: (e.dialogos || []).length,
  }));
  return [...i, ...n];
}
const ModuloTeoria = React.lazy(() => import("./modulo/ModuloTeoria.jsx"));
const ModuloVocabulario = React.lazy(() => import("./modulo/ModuloVocabulario.jsx"));
const ModuloDialogos = React.lazy(() => import("./modulo/ModuloDialogos.jsx"));
const ModuloEjercicios = React.lazy(() => import("./modulo/ModuloEjercicios.jsx"));
const ModuloJuegos = React.lazy(() => import("./modulo/ModuloJuegos.jsx"));
const ModuloGramatica = React.lazy(() => import("./modulo/ModuloGramatica.jsx"));
const ModuloRepaso = React.lazy(() => import("./modulo/ModuloRepaso.jsx"));
const ModuloEjerciciosGenerados = React.lazy(() => import("./modulo/ModuloEjerciciosGenerados.jsx"));
const LAST_VISITED = () => {
  const entries = Object.entries(getModuleProgress()).filter(([, v]) => v?.lastVisited);
  return entries.sort((a, b) => b[1].lastVisited - a[1].lastVisited)[0]?.[0] || null;
};
const ModuloDescubre = React.lazy(() => import("./modulo/ModuloDescubre.jsx"));
const ModuloExamen = React.lazy(() => import("./modulo/ModuloExamen.jsx"));
let eo = false;
function useO() {
  React.useEffect(() => {
    if (eo) {
      return;
    }
    eo = true;
    const i = document.createElement("link");
    i.rel = "stylesheet";
    i.href =
      "https://fonts.googleapis.com/css2?family=Sora:wght@400;600;800&family=Space+Grotesk:wght@500;700&display=swap";
    document.head.appendChild(i);
    const n = document.createElement("style");
    n.setAttribute("data-mx-spectacular", "true");
    n.textContent = `
      @keyframes mxCometTravel {
        0%   { left: 0%;   opacity: 0; }
        6%   { opacity: 1; }
        94%  { opacity: 1; }
        100% { left: 100%; opacity: 0; }
      }
      @keyframes mxOrbitSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes mxOrbitSpinRev { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
      @keyframes mxCardRise {
        from { opacity: 0; transform: translateY(28px) scale(.96); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes mxRingDraw { from { stroke-dashoffset: var(--mx-ring-len); } to { stroke-dashoffset: var(--mx-ring-offset); } }
      @keyframes mxChroma {
        0%, 100% { transform: translate(0,0); }
        50% { transform: translate(1.5px,-1px); }
      }
      @keyframes mxWarpSpin {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.15); }
        100% { transform: rotate(360deg) scale(1); }
      }
      .mx-font-display { font-family: 'Sora', system-ui, sans-serif; }
      .mx-font-mono { font-family: 'Space Grotesk', system-ui, sans-serif; letter-spacing: .04em; }
      .mx-card-tilt { transition: transform .18s ease-out, box-shadow .3s ease; will-change: transform; }
      .mx-card-enter { animation: mxCardRise .6s cubic-bezier(.16,1,.3,1) both; }
      .mx-chroma-behind { animation: mxChroma 3.2s ease-in-out infinite; }
    `;
    document.head.appendChild(n);
  }, []);
}
function Io1Component() {
  const iRef = React.useRef(null);
  React.useEffect(() => {
    const iRef_current = iRef.current;
    if (!iRef_current) {
      return;
    }
    const e = iRef_current.getContext("2d");
    if (!e) {
      return;
    }
    let C = 0;
    const t = [];
    const p = ["#ff00aa", "#00d4ff", "#ffd600", "#ff8a2a", "#39ff14"];
    function j() {
      iRef_current.width = iRef_current.offsetWidth;
      iRef_current.height = iRef_current.offsetHeight;
    }
    j();
    window.addEventListener("resize", j);
    for (let r = 0; r < 34; r++) {
      const x = Math.random() * 0.4 + 0.12;
      t.push({
        x: Math.random() * iRef_current.width,
        y: Math.random() * iRef_current.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        alpha: x,
        baseAlpha: x,
        tw: Math.random() * Math.PI * 2,
        col: p[Math.floor(Math.random() * p.length)],
      });
    }
    function g() {
      if (document.hidden) {
        C = requestAnimationFrame(g);
        return;
      }
      e.clearRect(0, 0, iRef_current.width, iRef_current.height);
      t.forEach((r) => {
        r.x += r.vx;
        r.y += r.vy;
        r.tw += 0.02;
        r.alpha = r.baseAlpha + Math.sin(r.tw) * 0.15;
        if (r.x < 0) {
          r.x = iRef_current.width;
        }
        if (r.x > iRef_current.width) {
          r.x = 0;
        }
        if (r.y < 0) {
          r.y = iRef_current.height;
        }
        if (r.y > iRef_current.height) {
          r.y = 0;
        }
        e.beginPath();
        e.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        e.fillStyle = r.col;
        e.globalAlpha = Math.max(0, r.alpha);
        e.fill();
        e.globalAlpha = 1;
      });
      for (let r = 0; r < t.length; r++) {
        for (let x = r + 1; x < t.length; x++) {
          const T = t[r].x - t[x].x;
          const k = t[r].y - t[x].y;
          if (T * T + k * k < 14400) {
            e.beginPath();
            e.moveTo(t[r].x, t[r].y);
            e.lineTo(t[x].x, t[x].y);
            e.strokeStyle = "rgba(0,212,255,0.06)";
            e.lineWidth = 0.5;
            e.stroke();
          }
        }
      }
      C = requestAnimationFrame(g);
    }
    g();
    return () => {
      cancelAnimationFrame(C);
      window.removeEventListener("resize", j);
    };
  }, []);
  return (
    <canvas
      ref={iRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 0,
      }}
    />
  );
}
function RoComponent({ steps }) {
  return (
    <div className="relative mt-7 max-w-2xl mx-auto" aria-label="Recorrido de aprendizaje">
      <div
        className="relative h-[3px] rounded-full mx-6 overflow-hidden"
        style={{
          background:
            "linear-gradient(90deg, rgba(57,255,20,.35), rgba(0,212,255,.35), rgba(255,138,42,.35), rgba(255,0,170,.35))",
        }}
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,.9), rgba(0,212,255,.5) 40%, transparent 70%)",
            filter: "blur(2px)",
            animation: "mxCometTravel 5.5s ease-in-out infinite",
            marginLeft: "-20px",
            marginTop: "0px",
          }}
        />
      </div>
      <div className="flex items-start justify-between mt-3 px-0">
        {steps.map((n, e) => {
          const C = ["#39ff14", "#00d4ff", "#ff8a2a", "#ff00aa"];
          return (
            <div key={n} className="flex flex-col items-center flex-1 gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background: C[e % 4],
                  boxShadow: `0 0 10px ${C[e % 4]}`,
                }}
              />
              <span className="mx-font-mono text-[10px] font-bold uppercase tracking-widest text-white/45">
                {n}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
const LEVEL_COLORS = { A1: "#39ff14", A2: "#00d4ff", B1: "#ff8a2a", B2: "#ff00aa" };
function P(i) {
  const fromCatalog = i > 60 && MODULE_CATALOG.find((m) => m.numero === i);
  if (fromCatalog) {
    return { label: fromCatalog.nivel, color: LEVEL_COLORS[fromCatalog.nivel] };
  }
  if (i <= 20) {
    return {
      label: "A1",
      color: "#39ff14",
    };
  }
  if (i <= 40) {
    return {
      label: "A2",
      color: "#00d4ff",
    };
  }
  if (i <= 50) {
    return {
      label: "B1",
      color: "#ff8a2a",
    };
  }
  return {
    label: "B2",
    color: "#ff00aa",
  };
}
function onMouseMove(i) {
  const i_currentTarget = i.currentTarget;
  const e = i_currentTarget.getBoundingClientRect();
  const C = (i.clientX - e.left) / e.width;
  const p = ((i.clientY - e.top) / e.height - 0.5) * -10;
  const j = (C - 0.5) * 10;
  i_currentTarget.style.transform = `perspective(900px) rotateX(${p}deg) rotateY(${j}deg) translateY(-10px) scale(1.02)`;
}
function onMouseLeave(i) {
  i.currentTarget.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
}
function KoComponent() {
  const { moduloId } = useParams();
  useO();
  const { t: t_1 } = useLanguage();
  const [e, setE] = React.useState([]);
  const [t, setT] = React.useState(null);
  const [j, setJ] = React.useState(false);
  const [r, setR] = React.useState(true);
  const [T, setT_1] = React.useState("list");
  const [E, setE_1] = React.useState(0);
  const [b, setB] = React.useState("teoria");
  const [R, setR_1] = React.useState(false);
  const [c, setC] = React.useState(false);
  const [O, setO] = React.useState(false);
  const [L, setL] = React.useState("Todos");
  const FRef = React.useRef([]);
  const [Fo, setFo] = React.useState({
    left: 0,
    width: 0,
  });
  React.useEffect(() => {
    async function s() {
      try {
        const m = await Mo();
        setE(m);
        if (moduloId && m.length > 0) {
          const f = m.findIndex((u) => u.id === moduloId);
          if (f >= 0) {
            setE_1(f);
            setT_1("detail");
            setR(true);
            setJ(false);
            try {
              const u = await oo(moduloId);
              if (u) {
                setT(u);
                markModuleVisited(u.id);
                setO(!!getModuleProgress()[u.id]?.completed);
              } else {
                setJ(true);
              }
            } catch (error) {
              console.error("Error loading modulo:", error);
              setJ(true);
            }
            setR(false);
          }
        }
        setR(false);
        setR_1(true);
      } catch (error) {
        console.error("Error loading index:", error);
        setR(false);
      }
    }
    s();
  }, [moduloId]);
  const B = async (s) => {
    const m = e[E];
    const f = s || m?.id;
    if (!(!f || t?.id === f)) {
      setR(true);
      setJ(false);
      try {
        const u = await oo(f);
        if (u) {
          setT(u);
          markModuleVisited(u.id);
          setO(!!getModuleProgress()[u.id]?.completed);
        } else {
          setJ(true);
        }
      } catch (error) {
        console.error("Error loading modulo:", error);
        setJ(true);
      }
      setR(false);
    }
  };
  const ao = async (s) => {
    setE_1(s);
    setT_1("detail");
    setB("teoria");
    setR_1(false);
    setT(null);
    await B(e[s]?.id);
    setTimeout(() => setR_1(true), 50);
  };
  const onClick = () => {
    setT_1("list");
    setR_1(false);
    setT(null);
    setJ(false);
    setTimeout(() => setR_1(true), 100);
  };
  const H = React.useCallback((s, m) => {
    const f = m.findIndex((_) => _.key === s);
    const u = FRef.current[f];
    if (u) {
      setFo({
        left: u.offsetLeft,
        width: u.offsetWidth,
      });
    }
  }, []);
  React.useLayoutEffect(() => {
    if (T !== "detail") {
      return;
    }
    const s = [
      {
        key: "teoria",
      },
      {
        key: "descubre",
      },
      {
        key: "vocabulario",
      },
      {
        key: "dialogos",
      },
      {
        key: "ejercicios",
      },
      {
        key: "gramatica",
      },
      {
        key: "repaso",
      },
      {
        key: "generar",
      },
      {
        key: "juegos",
      },
      {
        key: "examen",
      },
    ];
    const m = () => H(b, s);
    m();
    window.addEventListener("resize", m);
    return () => window.removeEventListener("resize", m);
  }, [b, H, E, T]);
  if (T === "list") {
    const s = [
      {
        label: "Todos",
        color: "#ffb33b",
      },
      {
        label: "A1",
        color: "#39ff14",
      },
      {
        label: "A2",
        color: "#00d4ff",
      },
      {
        label: "B1",
        color: "#ff8a2a",
      },
      {
        label: "B2",
        color: "#ff00aa",
      },
    ];
    const m = e.filter((a) => L === "Todos" || P(a.numero).label === L);
    const f = getModuleProgress();
    const u = countCompletedModules();
    const _ = Math.min(100, (u / Math.max(1, e.length)) * 100);
    return (
      <StarfieldBackground>
        <Io1Component />
        <div className="module-experience relative z-10 mx-auto w-full max-w-[1400px] px-3 sm:px-4 pb-14 pt-3">
          <div style={{ marginBottom: 16, fontFamily: "var(--ui-font)", color: "var(--ui-text)" }}>
            <SectionHero
              icon={BookMarkedIcon}
              accent="#f59e0b"
              eyebrow="Módulos · 学习模块"
              title="Tu curso de español, de A1 a B2"
              titleZh="从A1到B2的完整课程"
              description="Cada módulo trae teoría, vocabulario, diálogos, lectura, errores típicos, ejercicios, juegos y un examen que cambia cada vez."
              descriptionZh="每个模块包括语法、词汇、对话、阅读、常见错误、练习、游戏和每次不同的考试。"
              stats={[
                { value: e.length || "…", label: "módulos · 模块" },
                { value: u, label: "completados · 已完成" },
                { value: `${Math.round(_)}%`, label: "del curso · 课程进度" },
              ]}
              actions={
                <a className="ui-btn primary" href={`#/modulos/${LAST_VISITED() || "modulo-1"}`}>
                  {LAST_VISITED() ? "Continuar donde lo dejé · 继续学习" : "Empezar por el módulo 1 · 开始"}
                </a>
              }
            >
              <div className="ui-progress" style={{ marginTop: 16 }}>
                <i style={{ width: `${_}%` }} />
              </div>
            </SectionHero>
          </div>
          <div
            className="sticky top-1 z-30 -mx-3 sm:mx-0 px-3 sm:px-0 py-2 mb-3 backdrop-blur-md"
            style={{
              background:
                "linear-gradient(180deg, rgba(6,8,24,.94) 0%, rgba(6,8,24,.72) 65%, rgba(6,8,24,0) 100%)",
            }}
          >
            <div className="mx-noscroll flex items-center gap-2 overflow-x-auto">
              {s.map((a) => {
                const M = L === a.label;
                return (
                  <button
                    key={a.label}
                    onClick={() => setL(a.label)}
                    aria-pressed={M}
                    className="shrink-0 h-10 px-4 rounded-full text-xs font-black transition-all duration-300 hover:-translate-y-0.5"
                    style={
                      M
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
                    {a.label === "Todos" ? t_1("Todos", "全部") : a.label}
                    <span className="ml-1.5 opacity-60 font-bold">
                      {a.label === "Todos" ? e.length : e.filter((v) => P(v.numero).label === a.label).length}
                    </span>
                  </button>
                );
              })}
              <button
                onClick={() => setC((a) => !a)}
                aria-pressed={c}
                className="shrink-0 h-10 px-3.5 rounded-full text-xs font-black transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center gap-1.5"
                style={{
                  background: c ? "rgba(0,212,255,.14)" : "rgba(255,255,255,.04)",
                  border: `1px solid ${c ? "rgba(0,212,255,.48)" : "rgba(255,255,255,.1)"}`,
                  color: c ? "#66e7ff" : "rgba(255,255,255,.5)",
                }}
              >
                {c ? <EyeOffIcon size={14} /> : <EyeIcon size={14} />}
                <span className="hidden sm:inline">
                  {c ? t_1("Ocultar chino", "隐藏中文") : t_1("Mostrar chino", "显示中文")}
                </span>
              </button>
            </div>
          </div>
          {r && e.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="relative w-12 h-12 mb-3">
                <div
                  className="absolute inset-0 rounded-full border-2 border-t-transparent animate-spin"
                  style={{
                    borderColor: "rgba(255,179,59,.35)",
                    borderTopColor: "transparent",
                  }}
                />
                <div
                  className="absolute inset-2 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(255,179,59,.5), transparent 70%)",
                  }}
                />
              </div>
              <p className="mx-font-mono text-white/60 font-bold text-xs animate-pulse">
                {t_1("Cargando módulos...", "正在加载模块...")}
              </p>
            </div>
          )}
          {e.length > 0 && (
            <div
              className="mod-grid"
              style={{
                perspective: "1200px",
              }}
            >
              {m.map((a, M) => {
                const v = P(a.numero);
                const S = f[a.id];
                const mo = S?.completed ? 100 : Math.max(S?.score || 0, S?.lastVisited ? 25 : 0);
                return (
                  <button
                    key={a.id}
                    onClick={() => ao(e.findIndex((po) => po.id === a.id))}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    title={a.titulo}
                    className="module-tile mx-card-tilt mx-card-enter group relative flex flex-col rounded-2xl text-left transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: "linear-gradient(180deg, rgba(20,24,68,.68), rgba(10,14,48,.55))",
                      border: `1px solid ${v.color}2e`,
                      boxShadow: "0 4px 16px rgba(0,0,0,.35)",
                      transformStyle: "preserve-3d",
                      animationDelay: `${Math.min(M, 24) * 35}ms`,
                    }}
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                      style={{
                        background: `radial-gradient(120% 80% at 50% 0%, ${v.color}2e, transparent 70%)`,
                        boxShadow: `0 0 20px ${v.color}40`,
                      }}
                    />
                    <span className="relative flex items-center justify-between">
                      <span
                        className="mx-tile-num mx-font-mono font-black"
                        style={{
                          color: v.color,
                        }}
                      >
                        {String(a.numero).padStart(2, "0")}
                      </span>
                      {S?.completed ? (
                        <CheckIcon size={12} color="#39ff14" />
                      ) : (
                        <span
                          className="mx-tile-lv font-black"
                          style={{
                            color: `${v.color}aa`,
                          }}
                        >
                          {v.label}
                        </span>
                      )}
                    </span>
                    <span className="mx-tile-icon relative">{a.icono}</span>
                    {a.numeroTexto && <span className="mx-tile-word relative">{a.numeroTexto}</span>}
                    <span className="mx-tile-title relative">{String(a.titulo).split(" - ")[0]}</span>
                    {String(a.titulo).includes(" - ") && (
                      <span className="mx-tile-sub relative">
                        {String(a.titulo).split(" - ").slice(1).join(" - ")}
                      </span>
                    )}
                    {c && (
                      <span className="mx-tile-cn relative font-bold text-white/40">{a.tituloChino}</span>
                    )}
                    <span className="mx-tile-bar relative block">
                      <span
                        className="block h-1 overflow-hidden rounded-full"
                        style={{
                          background: "rgba(255,255,255,.07)",
                        }}
                      >
                        <span
                          className="block h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${mo}%`,
                            background: `linear-gradient(90deg, ${v.color}, ${v.color}66)`,
                            boxShadow: `0 0 8px ${v.color}59`,
                          }}
                        />
                      </span>
                    </span>
                    <span className="mx-tile-desc relative hidden text-white/40 lg:block lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:duration-300 lg:group-hover:max-h-20 lg:group-hover:opacity-100">
                      {a.descripcion}
                    </span>
                    <span className="mx-tile-counts relative flex items-center font-bold text-white/35 lg:hidden">
                      <span className="inline-flex items-center gap-0.5">
                        <FileTextIcon size={9} />
                        {a.teoriaCount}
                      </span>
                      <span className="inline-flex items-center gap-0.5">
                        <BookOpenIcon size={9} />
                        {a.vocabularioCount}
                      </span>
                      <span className="inline-flex items-center gap-0.5">
                        <MessageCircleIcon size={9} />
                        {a.dialogosCount}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}
          {e.length > 0 && m.length === 0 && (
            <p className="mx-font-mono py-14 text-center text-sm text-white/45">
              {t_1("No hay módulos en este nivel todavía.", "该级别暂无模块。")}
            </p>
          )}
          <style>{`
            .mx-noscroll::-webkit-scrollbar { display: none; }
            .mx-noscroll { -ms-overflow-style: none; scrollbar-width: none; }
            /* Densidad acotada: los estilos heredados de la app inflaban cada hijo (~26 px)
               y la fila del grid estiraba todas las tarjetas. Se resetea SOLO dentro de .module-tile. */
            .module-tile { padding: 9px !important; gap: 3px !important; align-content: flex-start !important; min-height: 104px !important; row-gap: 3px !important; }
            .module-tile > span { padding: 0 !important; margin: 0 !important; line-height: 1.15 !important; min-height: 0 !important; }
            .module-tile > span.mx-tile-icon { font-size: 21px !important; line-height: 1 !important; }
            .module-tile > span.mx-tile-title { display: -webkit-box !important; -webkit-box-orient: vertical !important; -webkit-line-clamp: 2 !important; overflow: hidden !important; font-size: 10.5px !important; line-height: 1.2 !important; }
            .module-tile > span.mx-tile-cn { font-size: 9px !important; line-height: 1.2 !important; -webkit-line-clamp: 1 !important; display: -webkit-box !important; -webkit-box-orient: vertical !important; overflow: hidden !important; }
            .module-tile > span.mx-tile-bar { margin-top: auto !important; }
            .module-tile > span.mx-tile-desc { font-size: 10px !important; line-height: 1.25 !important; }
            .module-tile > span.mx-tile-counts { font-size: 9px !important; line-height: 1.2 !important; gap: 6px !important; }
            .module-tile .mx-tile-num { font-size: 10px !important; line-height: 1 !important; }
            .module-tile .mx-tile-lv { font-size: 9px !important; line-height: 1 !important; }
          `}</style>
        </div>
      </StarfieldBackground>
    );
  }
  const h = e[E];
  const d = h?.color || "#3498db";
  const w = P(h?.numero || 1);
  const so = (h?.teoriaCount || 0) + (h?.vocabularioCount || 0) + (h?.dialogosCount || 0);
  const co = Math.min(1, so / 50);
  const strokeDasharray = 2 * Math.PI * 34;
  const uo = [
    {
      key: "teoria",
      label: "Teoría / 理论",
      icon: LightbulbIcon,
      count: h?.teoriaCount,
    },
    {
      key: "descubre",
      label: "Descubre / 拓展",
      icon: CompassIcon,
    },
    {
      key: "vocabulario",
      label: "Vocabulario / 词汇",
      icon: BookOpenIcon,
      count: h?.vocabularioCount,
    },
    {
      key: "dialogos",
      label: "Diálogos / 对话",
      icon: MessageCircleIcon,
      count: h?.dialogosCount,
    },
    {
      key: "ejercicios",
      label: "Ejercicios / 练习",
      icon: PenToolIcon,
    },
    {
      key: "gramatica",
      label: "Gramática / 语法",
      icon: BookMarkedIcon,
    },
    {
      key: "repaso",
      label: "Repaso / 复习",
      icon: BrainIcon,
    },
    {
      key: "generar",
      label: "Generar / 生成",
      icon: ZapIcon,
    },
    {
      key: "juegos",
      label: "Juegos / 游戏",
      icon: Gamepad2Icon,
      count: h?.vocabularioCount,
    },
    {
      key: "examen",
      label: "Examen / 考试",
      icon: FileCheckIcon,
    },
  ];
  return (
    <StarfieldBackground>
      <Io1Component />
      <div className="module-experience relative z-10">
        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none opacity-15"
          style={{
            background: `radial-gradient(ellipse at center, ${d}25, transparent 70%)`,
            filter: "blur(60px)",
            zIndex: 6,
          }}
        />
        <div>
          <div
            className="relative overflow-hidden"
            style={{
              background: `linear-gradient(180deg, ${d}08 0%, transparent 60%)`,
            }}
          >
            <div className="max-w-5xl mx-auto px-4 py-6 relative z-10">
              <button
                onClick={onClick}
                className="flex items-center gap-2 text-white/40 hover:text-orange-400 transition-all text-sm mb-6 group"
              >
                <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver
                a módulos / 返回模块列表
              </button>
              <div
                className={`flex flex-col md:flex-row md:items-center gap-5 transition-all duration-500 ${R ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              >
                <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                  <div
                    className="absolute inset-0 rounded-full border border-dashed"
                    style={{
                      borderColor: `${d}45`,
                      animation: "mxOrbitSpin 14s linear infinite",
                    }}
                  />
                  <div
                    className="absolute inset-1.5 rounded-full border"
                    style={{
                      borderColor: `${d}25`,
                      animation: "mxOrbitSpinRev 20s linear infinite",
                    }}
                  />
                  <svg width="88" height="88" viewBox="0 0 88 88" className="absolute inset-0">
                    <circle
                      cx="44"
                      cy="44"
                      r="34"
                      fill="none"
                      stroke="rgba(255,255,255,.08)"
                      strokeWidth="3"
                    />
                    <circle
                      cx="44"
                      cy="44"
                      r="34"
                      fill="none"
                      stroke={d}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDasharray * (1 - co)}
                      transform="rotate(-90 44 44)"
                      style={{
                        filter: `drop-shadow(0 0 6px ${d})`,
                        transition: "stroke-dashoffset 1s cubic-bezier(.16,1,.3,1)",
                      }}
                    />
                  </svg>
                  <div
                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center text-4xl"
                    style={{
                      background: `${d}20`,
                      border: `2px solid ${d}40`,
                      boxShadow: `0 0 60px ${d}20`,
                    }}
                  >
                    {h?.icono}
                    <div
                      className="absolute inset-0 rounded-2xl animate-pulse opacity-20"
                      style={{
                        boxShadow: `0 0 30px ${d}`,
                      }}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="mx-font-mono text-[10px] font-mono px-2 py-0.5 rounded-md font-bold"
                      style={{
                        background: `${d}25`,
                        color: d,
                      }}
                    >
                      MODULO #{h?.numero}
                    </span>
                    <span
                      className="text-[10px] font-black px-2 py-0.5 rounded-md"
                      style={{
                        background: `${w.color}20`,
                        color: w.color,
                        border: `1px solid ${w.color}40`,
                      }}
                    >
                      {w.label}
                    </span>
                  </div>
                  <h1 className="mx-font-display text-3xl md:text-4xl font-bold text-white mt-1">
                    {h?.titulo}
                  </h1>
                  {c && <p className="text-white/55 text-sm mt-1">{h?.tituloChino}</p>}
                  {(c || !/[\u3400-\u9fff]/.test(h?.descripcion || "")) && (
                    <p className="text-white/45 text-sm mt-3 max-w-2xl leading-relaxed">
                      {h?.descripcion}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setC((s) => !s)}
                  className="module-language-toggle flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-black transition-all hover:-translate-y-1"
                  style={{
                    background: c ? "rgba(0,212,255,.16)" : "rgba(255,255,255,.05)",
                    border: `1px solid ${c ? "rgba(0,212,255,.55)" : "rgba(255,255,255,.14)"}`,
                    color: c ? "#66e7ff" : "rgba(255,255,255,.65)",
                    boxShadow: c ? "0 0 24px rgba(0,212,255,.18)" : "none",
                  }}
                  aria-pressed={c}
                >
                  {c ? <EyeOffIcon size={17} /> : <EyeIcon size={17} />}
                  {c ? "Ocultar chino" : "Mostrar chino"}
                </button>
                <button
                  onClick={() => {
                    if (t) {
                      completeModule(t.id);
                      setO(true);
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-black transition-all hover:-translate-y-1"
                  style={
                    O
                      ? {
                          background: "rgba(57,255,20,.15)",
                          border: "1px solid rgba(57,255,20,.4)",
                          color: "#39ff14",
                          boxShadow: "0 0 24px rgba(57,255,20,.15)",
                        }
                      : {
                          background: "rgba(255,255,255,.05)",
                          border: "1px solid rgba(255,255,255,.14)",
                          color: "rgba(255,255,255,.65)",
                        }
                  }
                >
                  <CheckIcon size={17} /> {O ? "Completado / 已完成" : "Marcar completado / 标记完成"}
                </button>
              </div>
              <div className="relative flex flex-wrap gap-3 mt-6 pb-1">
                {uo.map((s, m) => (
                  <button
                    key={s.key}
                    ref={(f) => {
                      FRef.current[m] = f;
                    }}
                    onClick={() => setB(s.key)}
                    className="relative z-10 flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all"
                    style={
                      b === s.key
                        ? {
                            color: "#fff",
                            background: `linear-gradient(135deg, ${d}20, ${d}08)`,
                            border: `1px solid ${d}`,
                            boxShadow: `0 0 25px ${d}30`,
                          }
                        : {
                            color: "rgba(255,255,255,0.35)",
                            border: "1px solid transparent",
                          }
                    }
                  >
                    <s.icon
                      size={15}
                      className="transition-transform duration-300"
                      style={
                        b === s.key
                          ? {
                              color: d,
                              filter: `drop-shadow(0 0 4px ${d})`,
                              transform: "scale(1.1)",
                            }
                          : {}
                      }
                    />
                    <span className="mx-font-mono relative">{s.label}</span>
                    {s.count !== undefined && <span className="opacity-40">({s.count})</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="max-w-5xl mx-auto px-4 py-6 relative z-10">
            {r && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative w-14 h-14 mb-4">
                  <div
                    className="absolute inset-0 rounded-full border-2"
                    style={{
                      borderColor: "rgba(255,179,59,.25)",
                      borderTopColor: "#ffb33b",
                      animation: "mxWarpSpin 1.4s linear infinite",
                    }}
                  />
                </div>
                <p className="mx-font-mono text-white/60 font-bold">Cargando contenido...</p>
                <p className="text-white/30 text-sm">加载内容中...</p>
              </div>
            )}
            {!r && j && (
              <div className="text-center py-20">
                <p className="text-white/40 font-bold mb-4">
                  Error al cargar el contenido / 加载内容出错
                </p>
                <button
                  onClick={() => B()}
                  className="px-6 py-3 rounded-full text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,107,26,.3), rgba(255,0,170,.2))",
                    border: "1px solid rgba(255,107,26,.4)",
                  }}
                >
                  Reintentar / 重试
                </button>
              </div>
            )}
            {!r && !j && t && (
              <>
                <React.Suspense
                  fallback={
                    <div className="flex items-center justify-center py-20">
                      <div
                        className="w-10 h-10 border-3 rounded-full animate-spin"
                        style={{
                          borderColor: "rgba(255,179,59,.2)",
                          borderTopColor: "#ffb33b",
                        }}
                      />
                    </div>
                  }
                >
                  {b === "teoria" && (
                    <ModuloTeoria
                      teoria={t.teoria || []}
                      moduloTitulo={t.titulo}
                      moduloNumero={t.numero}
                      showChineseGlobal={c}
                    />
                  )}
                  {b === "vocabulario" && (
                    <ModuloVocabulario vocabulario={t.vocabulario || []} showChinese={c} level={w.label} />
                  )}
                  {b === "dialogos" && (
                    <ModuloDialogos dialogos={t.dialogos || []} moduloId={t.id} showChinese={c} />
                  )}
                  {b === "ejercicios" && (
                    <ModuloEjercicios
                      ejercicios={{
                        ...(t.ejercicios || {}),
                        ejerciciosPracticos: t.ejerciciosPracticos || [],
                        preguntasAbiertas: t.preguntasAbiertas || [],
                        preguntas: t.preguntas || [],
                      }}
                      vocabulario={t.vocabulario || []}
                      showChinese={c}
                    />
                  )}
                  {b === "gramatica" && <ModuloGramatica level={w.label} showChinese={c} />}
                  {b === "repaso" && <ModuloRepaso numero={t.numero} showChinese={c} moduloId={t.id} />}
                  {b === "generar" && <ModuloEjerciciosGenerados vocabulario={t.vocabulario || []} />}
                  {b === "juegos" && <ModuloJuegos vocabulario={t.vocabulario || []} moduloId={t.id} />}
                  {b === "descubre" && <ModuloDescubre numero={t.numero} showChinese={c} />}
                  {b === "examen" && <ModuloExamen numero={t.numero} moduloId={t.id} />}
                </React.Suspense>
              </>
            )}
          </div>
        </div>
      </div>
    </StarfieldBackground>
  );
}
export { KoComponent as default };
