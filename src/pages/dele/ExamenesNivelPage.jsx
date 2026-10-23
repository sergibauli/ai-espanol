import {
  SparklesIcon,
  StarIcon,
  BookOpenIcon,
  MicIcon,
  ChevronRightIcon,
  HeartIcon,
  CalendarIcon,
  GlobeIcon,
  MusicIcon,
  CameraIcon,
  CrownIcon,
  FlameIcon,
  ArrowLeftIcon,
  LayersIcon,
  FileTextIcon,
  HeadphonesIcon,
  PenToolIcon,
  CarIcon,
  ClockIcon,
  SmartphoneIcon,
  BikeIcon,
  BriefcaseIcon,
  CoffeeIcon,
  DogIcon,
  DollarSignIcon,
  GiftIcon,
  HouseIcon,
  MapPinIcon,
  PlaneIcon,
  SchoolIcon,
  ShirtIcon,
  ShoppingBagIcon,
  SunIcon,
  TvIcon,
  UsersIcon,
  UtensilsIcon,
} from "lucide-react";
import * as React from "react";
import { useParams, Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { L as L_2 } from "../../components/LearningImpactScene.jsx";
import { l as l_1 } from "../../lib/exams-loader.js";
import { useLanguage } from "../../lib/i18n.jsx";
import "../../data/generated-content.js";
const Ba = {
  "Presentaciones y saludos": "自我介绍与问候",
  "La familia": "家庭",
  "La casa y la rutina": "家与日常",
  "La casa y los muebles": "家与家具",
  "La comida y bebida": "食物与饮料",
  "La comida y restaurantes": "食物与餐厅",
  "El tiempo libre y deportes": "休闲与运动",
  "Las aficiones y el tiempo libre": "爱好与休闲",
  "Los deportes": "运动",
  "La ropa y las estaciones": "衣服与季节",
  "La ropa y las compras": "衣服与购物",
  "La ciudad y los lugares": "城市与地点",
  "Los animales": "动物",
  "Las mascotas y animales": "宠物与动物",
  "La salud y el cuerpo": "健康与身体",
  "Las profesiones": "职业",
  "El trabajo y profesiones": "工作与职业",
  "Los medios de transporte": "交通工具",
  "Los viajes y el transporte": "旅行与交通",
  "Las vacaciones": "假期",
  "Las fiestas y tradiciones": "节日与传统",
  "La tecnología básica": "基础科技",
  "Los números y las horas": "数字与时间",
  "Los números y precios": "数字与价格",
  "Las emociones básicas": "基础情绪",
  "Las emociones y sentimientos": "情绪与感受",
  "El tiempo atmosférico": "天气",
  "La escuela y los estudios": "学校与学习",
  "El cine y la televisión": "电影与电视",
  "Las direcciones y el GPS": "方向与GPS",
  "La rutina diaria": "日常生活",
  "El mundo laboral": "职场世界",
  "El medio ambiente": "环境",
  "La alimentación saludable": "健康饮食",
  "La tecnología y redes sociales": "科技与社交媒体",
  "La educación": "教育",
  "Los viajes y el turismo": "旅行与旅游",
  "La salud mental": "心理健康",
  "El arte y la cultura": "艺术与文化",
  "El deporte": "运动",
  "La vivienda": "住房",
  "La inmigración": "移民",
  "La igualdad de género": "性别平等",
  "La globalización": "全球化",
  "El envejecimiento poblacional": "人口老龄化",
  "La inteligencia artificial": "人工智能",
  "La vivienda y el alquiler": "住房与租房",
  "El cine y las series": "电影与电视剧",
  "El deporte y sus valores": "运动与价值观",
  "Las redes sociales": "社交媒体",
  "El medio ambiente y cambio climático": "环境与气候变化",
  "La política y sociedad": "政治与社会",
  "La economía y el dinero": "经济与金钱",
  "La psicología y personalidad": "心理学与个性",
  "La educación universitaria": "大学教育",
  "El mercado laboral": "劳动力市场",
  "La inmigración y cultura": "移民与文化",
  "La tecnología e inteligencia artificial": "科技与人工智能",
  "El arte y literatura": "艺术与文学",
  "Los derechos humanos": "人权",
  "El emprendimiento": "创业",
  "La vivienda y gentrificación": "住房与士绅化",
  "El turismo sostenible": "可持续旅游",
  "La gastronomía mundial": "世界美食",
  "Los medios de comunicación": "传媒",
  "La ciencia y descubrimientos": "科学与发现",
  "Las tradiciones en peligro": "濒危传统",
  "El arte contemporáneo": "当代艺术",
  "El cine español": "西班牙电影",
  "El turismo responsable": "负责任旅游",
  "El voluntariado": "志愿服务",
  "El yoga y el bienestar": "瑜伽与健康",
  "La arquitectura": "建筑",
  "La astronomía": "天文学",
  "La ceramica y las artesanias tradicionales": "陶瓷与传统手工艺",
  "La cerámica y las artesanías tradicionales": "陶瓷与传统手工艺",
  "La ciencia y la sociedad": "科学与社会",
  "La comunicacion en la era digital": "数字时代的沟通",
  "La comunicación en la era digital": "数字时代的沟通",
  "La creatividad": "创造力",
  "La danza": "舞蹈",
  "La educación del futuro": "未来教育",
  "La fotografía": "摄影",
  "La gastronomía y cultura": "美食与文化",
  "La historia de España": "西班牙历史",
  "La jardinería urbana": "城市园艺",
  "La lectura y la literatura contemporanea": "阅读与当代文学",
  "La lectura y la literatura contemporánea": "阅读与当代文学",
  "La literatura española": "西班牙文学",
  "La moda sostenible": "可持续时尚",
  "La musica y las emociones": "音乐与情感",
  "La música y la sociedad": "音乐与社会",
  "La música y las emociones": "音乐与情感",
  "La psicología positiva": "积极心理学",
  "La tecnología y la sociedad": "科技与社会",
  "Los idiomas y la cultura": "语言与文化",
  "Los museos y el patrimonio": "博物馆与遗产",
  "Los videojuegos y la cultura": "电子游戏与文化",
  "El futuro de la humanidad": "人类未来",
  "El trabajo y la productividad": "工作与生产力",
  "La cultura y las tradiciones": "文化与传统",
  "La cultura y el arte": "文化与艺术",
  "La salud y el bienestar": "健康与养生",
  "Las relaciones personales": "人际关系",
  "El cuerpo y los sentidos": "身体与感官",
  "Los colores y las formas": "颜色与形状",
  "Los días y los meses": "星期与月份",
  "Las comidas del día": "一日三餐",
  "Las tareas del hogar": "家务活",
  "En el supermercado": "在超市",
  "La naturaleza y los parques": "自然与公园",
  "Los juguetes y los juegos": "玩具与游戏",
  "La música y los instrumentos": "音乐与乐器",
  "La hora y los momentos del día": "时间与一天的时刻",
  "El médico y la farmacia": "医生与药房",
  "El banco y el dinero": "银行与金钱",
  "El hotel y las reservas": "酒店与预订",
  "Las compras online": "网上购物",
  "El barrio y los vecinos": "社区与邻居",
  "Las noticias y el periódico": "新闻与报纸",
  "Aprender idiomas": "学习语言",
  "Mantenerse en forma": "保持健康",
  "El fin de semana": "周末",
  "La cocina y las recetas": "烹饪与食谱",
  "El consumo responsable": "理性消费",
  "El voluntariado y la solidaridad": "志愿服务与互助",
  "El ocio y el tiempo libre": "休闲与业余时间",
  "La conciliación familiar y laboral": "家庭与工作平衡",
  "Las ciudades sostenibles": "可持续城市",
  "Los hábitos de consumo": "消费习惯",
  "La música en vivo y los festivales": "现场音乐与音乐节",
  "El hábito de la lectura": "阅读习惯",
  "El estrés y el descanso": "压力与休息",
  "La vida en el campo y la ciudad": "乡村与城市生活",
  "La bioética y la genética": "生命伦理与基因",
  "La ética de la inteligencia artificial": "人工智能伦理",
  "La desigualdad económica": "经济不平等",
  "El futuro del trabajo": "工作的未来",
  "La privacidad y los datos personales": "隐私与个人数据",
  "La energía y las energías renovables": "能源与可再生能源",
  "La inteligencia emocional": "情商",
  "La desinformación y la cultura digital": "虚假信息与数字文化",
  "El patrimonio cultural y su conservación": "文化遗产与保护",
  "La cooperación internacional": "国际合作",
  "La playa y el mar": "海滩与大海",
  "El parque de atracciones": "游乐园",
  "El camping y la naturaleza": "露营与自然",
  "La moda y el estilo": "时尚与风格",
  "La protección de los animales": "动物保护",
  "La publicidad y el consumo": "广告与消费",
  "La exploración espacial": "太空探索",
  "El futuro de la medicina": "医学的未来",
  "Los objetos de la clase": "课堂用品",
  "Los regalos y las compras": "礼物与购物",
  "El reciclaje y los residuos": "回收与废弃物",
  "La justicia social": "社会正义",
  "En el restaurante": "在餐厅",
  "La montaña y el senderismo": "山与徒步",
  "El turismo de masas": "大众旅游",
  "La neurociencia": "神经科学",
  "Los amigos": "朋友",
  "La biblioteca y la lectura": "图书馆与阅读",
  "Los videojuegos y el ocio digital": "电子游戏与数字娱乐",
  "La economía circular": "循环经济",
  "En la granja": "在农场",
  "El mercado": "市场",
  "El arte urbano": "城市艺术",
  "La longevidad": "长寿",
  "Los deportes de agua": "水上运动",
  "El trabajo de verano": "暑期工作",
  "El consumo colaborativo": "共享消费",
  "La colonización de Marte": "火星殖民",
  "Las vacaciones de invierno": "寒假",
  "El autobús y el metro": "公交与地铁",
  "La gastronomía española": "西班牙美食",
  "La inteligencia artificial y el arte": "人工智能与艺术",
  "El deporte en equipo": "团队运动",
  "La educación en línea": "在线教育",
  "La biotecnología": "生物技术",
  "Los planes de futuro": "未来计划",
  "La vida en comunidad": "社区生活",
  "La filosofía y la vida": "哲学与人生",
  "Ayudar a los demás": "帮助他人",
  "El deporte profesional": "职业体育",
  "La psicología del consumidor": "消费者心理学",
  "Cuidar el medio ambiente": "保护环境",
  "La movilidad urbana": "城市出行",
  "El futuro de la humanidad": "人类未来",
  "El tiempo libre en casa": "居家休闲",
  "La familia moderna": "现代家庭",
  "La ética medioambiental": "环境伦理",
  "La comida sana": "健康饮食",
  "La vida saludable": "健康生活",
  "La sociedad del conocimiento": "知识社会",
  "La vida de estudiante": "学生生活",
  "Montar un negocio": "创业",
  "La ética de la ciencia": "科学伦理",
  "La tecnología en casa": "家居科技",
  "La vida en el extranjero": "海外生活",
  "La energía nuclear": "核能",
  "El viaje en tren": "火车旅行",
  "El aprendizaje de idiomas": "语言学习",
  "La filosofía de la ciencia": "科学哲学",
  "La infancia": "童年",
  "La vida sin tecnología": "没有科技的生活",
  "La estética y la belleza": "美学与美",
  "Las fotos y los recuerdos": "照片与回忆",
  "La libertad": "自由",
  "El transporte público": "公共交通",
  "Los planes y las citas": "计划与约会",
  "La felicidad": "幸福",
};
const W = [
  BookOpenIcon,
  StarIcon,
  FlameIcon,
  CrownIcon,
  SparklesIcon,
  FileTextIcon,
  HeadphonesIcon,
  PenToolIcon,
  MicIcon,
  UsersIcon,
  HouseIcon,
  HeartIcon,
  ShoppingBagIcon,
  UtensilsIcon,
  PlaneIcon,
  SunIcon,
  BriefcaseIcon,
  BikeIcon,
  ShirtIcon,
  CoffeeIcon,
  SmartphoneIcon,
  MusicIcon,
  ClockIcon,
  MapPinIcon,
  DogIcon,
  TvIcon,
  CarIcon,
  SchoolIcon,
  GiftIcon,
  DollarSignIcon,
];
const aa = [
  "#34d399",
  "#f472b6",
  "#fbbf24",
  "#fb923c",
  "#22d3ee",
  "#a78bfa",
  "#e879f9",
  "#60a5fa",
  "#f87171",
  "#818cf8",
  "#38bdf8",
  "#10b981",
  "#f59e0b",
  "#ec4899",
  "#06b6d4",
  "#84cc16",
  "#f43f5e",
  "#8b5cf6",
  "#14b8a6",
  "#d946ef",
  "#f97316",
  "#3b82f6",
  "#a855f7",
  "#ef4444",
  "#22c55e",
  "#6366f1",
  "#0ea5e9",
  "#f97316",
  "#10b981",
  "#f59e0b",
  "#ec4899",
  "#3b82f6",
  "#a855f7",
  "#22c55e",
  "#f97316",
];
function Ha(theme) {
  const b = {
    "Presentaciones y saludos": {
      icon: UsersIcon,
      color: "#34d399",
      bg: "rgba(52,211,153,0.15)",
    },
    "La familia": {
      icon: HeartIcon,
      color: "#f472b6",
      bg: "rgba(244,114,182,0.15)",
    },
    "La casa y la rutina": {
      icon: HouseIcon,
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.15)",
    },
    "La casa y los muebles": {
      icon: HouseIcon,
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.15)",
    },
    "La comida y bebida": {
      icon: UtensilsIcon,
      color: "#fb923c",
      bg: "rgba(251,146,60,0.15)",
    },
    "La comida y restaurantes": {
      icon: CoffeeIcon,
      color: "#fb923c",
      bg: "rgba(251,146,60,0.15)",
    },
    "El tiempo libre y deportes": {
      icon: BikeIcon,
      color: "#22d3ee",
      bg: "rgba(34,211,238,0.15)",
    },
    "Las aficiones y el tiempo libre": {
      icon: MusicIcon,
      color: "#a78bfa",
      bg: "rgba(167,139,250,0.15)",
    },
    "Los deportes": {
      icon: BikeIcon,
      color: "#22d3ee",
      bg: "rgba(34,211,238,0.15)",
    },
    "La ropa y las estaciones": {
      icon: ShirtIcon,
      color: "#e879f9",
      bg: "rgba(232,121,249,0.15)",
    },
    "La ropa y las compras": {
      icon: ShoppingBagIcon,
      color: "#e879f9",
      bg: "rgba(232,121,249,0.15)",
    },
    "La ciudad y los lugares": {
      icon: MapPinIcon,
      color: "#60a5fa",
      bg: "rgba(96,165,250,0.15)",
    },
    "Los animales": {
      icon: DogIcon,
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.15)",
    },
    "Las mascotas y animales": {
      icon: DogIcon,
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.15)",
    },
    "La salud y el cuerpo": {
      icon: HeartIcon,
      color: "#f87171",
      bg: "rgba(248,113,113,0.15)",
    },
    "Las profesiones": {
      icon: BriefcaseIcon,
      color: "#818cf8",
      bg: "rgba(129,140,248,0.15)",
    },
    "El trabajo y profesiones": {
      icon: BriefcaseIcon,
      color: "#818cf8",
      bg: "rgba(129,140,248,0.15)",
    },
    "Los medios de transporte": {
      icon: CarIcon,
      color: "#38bdf8",
      bg: "rgba(56,189,248,0.15)",
    },
    "Los viajes y el transporte": {
      icon: PlaneIcon,
      color: "#38bdf8",
      bg: "rgba(56,189,248,0.15)",
    },
    "Las vacaciones": {
      icon: SunIcon,
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.15)",
    },
    "Las fiestas y tradiciones": {
      icon: GiftIcon,
      color: "#f472b6",
      bg: "rgba(244,114,182,0.15)",
    },
    "La tecnología básica": {
      icon: SmartphoneIcon,
      color: "#a78bfa",
      bg: "rgba(167,139,250,0.15)",
    },
    "Los números y las horas": {
      icon: ClockIcon,
      color: "#34d399",
      bg: "rgba(52,211,153,0.15)",
    },
    "Los números y precios": {
      icon: DollarSignIcon,
      color: "#34d399",
      bg: "rgba(52,211,153,0.15)",
    },
    "Las emociones básicas": {
      icon: HeartIcon,
      color: "#f472b6",
      bg: "rgba(244,114,182,0.15)",
    },
    "Las emociones y sentimientos": {
      icon: HeartIcon,
      color: "#f472b6",
      bg: "rgba(244,114,182,0.15)",
    },
    "El tiempo atmosférico": {
      icon: SunIcon,
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.15)",
    },
    "La escuela y los estudios": {
      icon: SchoolIcon,
      color: "#60a5fa",
      bg: "rgba(96,165,250,0.15)",
    },
    "El cine y la televisión": {
      icon: TvIcon,
      color: "#a78bfa",
      bg: "rgba(167,139,250,0.15)",
    },
    "Las direcciones y el GPS": {
      icon: MapPinIcon,
      color: "#34d399",
      bg: "rgba(52,211,153,0.15)",
    },
    "La rutina diaria": {
      icon: ClockIcon,
      color: "#818cf8",
      bg: "rgba(129,140,248,0.15)",
    },
    "El mundo laboral": {
      icon: BriefcaseIcon,
      color: "#818cf8",
      bg: "rgba(129,140,248,0.15)",
    },
    "La salud mental": {
      icon: HeartIcon,
      color: "#f43f5e",
      bg: "rgba(244,63,94,0.15)",
    },
    "Los viajes y el turismo": {
      icon: PlaneIcon,
      color: "#38bdf8",
      bg: "rgba(56,189,248,0.15)",
    },
    "La tecnología y redes sociales": {
      icon: SmartphoneIcon,
      color: "#a78bfa",
      bg: "rgba(167,139,250,0.15)",
    },
    "La educación": {
      icon: SchoolIcon,
      color: "#60a5fa",
      bg: "rgba(96,165,250,0.15)",
    },
    "El medio ambiente": {
      icon: SunIcon,
      color: "#22c55e",
      bg: "rgba(34,197,94,0.15)",
    },
    "La alimentación saludable": {
      icon: UtensilsIcon,
      color: "#fb923c",
      bg: "rgba(251,146,60,0.15)",
    },
    "La política y sociedad": {
      icon: UsersIcon,
      color: "#818cf8",
      bg: "rgba(129,140,248,0.15)",
    },
    "La economía y el dinero": {
      icon: DollarSignIcon,
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.15)",
    },
    "La psicología y personalidad": {
      icon: HeartIcon,
      color: "#ec4899",
      bg: "rgba(236,72,153,0.15)",
    },
    "La educación universitaria": {
      icon: SchoolIcon,
      color: "#3b82f6",
      bg: "rgba(59,130,246,0.15)",
    },
    "El mercado laboral": {
      icon: BriefcaseIcon,
      color: "#818cf8",
      bg: "rgba(129,140,248,0.15)",
    },
    "La inmigración y cultura": {
      icon: UsersIcon,
      color: "#f97316",
      bg: "rgba(249,115,22,0.15)",
    },
    "La tecnología e inteligencia artificial": {
      icon: SmartphoneIcon,
      color: "#8b5cf6",
      bg: "rgba(139,92,246,0.15)",
    },
    "El arte y literatura": {
      icon: BookOpenIcon,
      color: "#f472b6",
      bg: "rgba(244,114,182,0.15)",
    },
    "Los derechos humanos": {
      icon: HeartIcon,
      color: "#f87171",
      bg: "rgba(248,113,113,0.15)",
    },
    "El emprendimiento": {
      icon: SparklesIcon,
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.15)",
    },
    "Las tradiciones en peligro": {
      icon: ClockIcon,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.15)",
    },
    "El turismo sostenible": {
      icon: PlaneIcon,
      color: "#22d3ee",
      bg: "rgba(34,211,238,0.15)",
    },
    "La gastronomía mundial": {
      icon: UtensilsIcon,
      color: "#fb923c",
      bg: "rgba(251,146,60,0.15)",
    },
    "Los medios de comunicación": {
      icon: TvIcon,
      color: "#60a5fa",
      bg: "rgba(96,165,250,0.15)",
    },
    "La ciencia y descubrimientos": {
      icon: StarIcon,
      color: "#06b6d4",
      bg: "rgba(6,182,212,0.15)",
    },
    "La gastronomía y cultura": {
      icon: CoffeeIcon,
      color: "#f97316",
      bg: "rgba(249,115,22,0.15)",
    },
    "La historia de España": {
      icon: ClockIcon,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.15)",
    },
    "Los videojuegos y la cultura": {
      icon: TvIcon,
      color: "#a78bfa",
      bg: "rgba(167,139,250,0.15)",
    },
    "La música y las emociones": {
      icon: MusicIcon,
      color: "#ec4899",
      bg: "rgba(236,72,153,0.15)",
    },
    "La música y la sociedad": {
      icon: MusicIcon,
      color: "#ec4899",
      bg: "rgba(236,72,153,0.15)",
    },
    "Los museos y el patrimonio": {
      icon: SchoolIcon,
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.15)",
    },
    "La vivienda y gentrificación": {
      icon: HouseIcon,
      color: "#f97316",
      bg: "rgba(249,115,22,0.15)",
    },
    "La moda sostenible": {
      icon: ShirtIcon,
      color: "#e879f9",
      bg: "rgba(232,121,249,0.15)",
    },
    "La fotografía": {
      icon: CameraIcon,
      color: "#8b5cf6",
      bg: "rgba(139,92,246,0.15)",
    },
    "La danza": {
      icon: MusicIcon,
      color: "#ec4899",
      bg: "rgba(236,72,153,0.15)",
    },
    "La creatividad": {
      icon: SparklesIcon,
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.15)",
    },
    "La arquitectura": {
      icon: HouseIcon,
      color: "#f97316",
      bg: "rgba(249,115,22,0.15)",
    },
    "La astronomía": {
      icon: SunIcon,
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.15)",
    },
    "El yoga y el bienestar": {
      icon: HeartIcon,
      color: "#34d399",
      bg: "rgba(52,211,153,0.15)",
    },
    "El voluntariado": {
      icon: UsersIcon,
      color: "#f472b6",
      bg: "rgba(244,114,182,0.15)",
    },
    "El cine español": {
      icon: TvIcon,
      color: "#a78bfa",
      bg: "rgba(167,139,250,0.15)",
    },
    "El arte contemporáneo": {
      icon: StarIcon,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.15)",
    },
    "La ciencia y la sociedad": {
      icon: BookOpenIcon,
      color: "#06b6d4",
      bg: "rgba(6,182,212,0.15)",
    },
    "Los idiomas y la cultura": {
      icon: BookOpenIcon,
      color: "#60a5fa",
      bg: "rgba(96,165,250,0.15)",
    },
    "La lectura y la literatura contemporanea": {
      icon: BookOpenIcon,
      color: "#f472b6",
      bg: "rgba(244,114,182,0.15)",
    },
    "La lectura y la literatura contemporánea": {
      icon: BookOpenIcon,
      color: "#f472b6",
      bg: "rgba(244,114,182,0.15)",
    },
    "La literatura española": {
      icon: BookOpenIcon,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.15)",
    },
    "La psicología positiva": {
      icon: HeartIcon,
      color: "#ec4899",
      bg: "rgba(236,72,153,0.15)",
    },
    "El futuro de la humanidad": {
      icon: UsersIcon,
      color: "#818cf8",
      bg: "rgba(129,140,248,0.15)",
    },
    "La jardinería urbana": {
      icon: SunIcon,
      color: "#22c55e",
      bg: "rgba(34,197,94,0.15)",
    },
    "La comunicacion en la era digital": {
      icon: SmartphoneIcon,
      color: "#8b5cf6",
      bg: "rgba(139,92,246,0.15)",
    },
    "La comunicación en la era digital": {
      icon: SmartphoneIcon,
      color: "#8b5cf6",
      bg: "rgba(139,92,246,0.15)",
    },
    "La ceramica y las artesanias tradicionales": {
      icon: GiftIcon,
      color: "#f97316",
      bg: "rgba(249,115,22,0.15)",
    },
    "La cerámica y las artesanías tradicionales": {
      icon: GiftIcon,
      color: "#f97316",
      bg: "rgba(249,115,22,0.15)",
    },
    "La globalización": {
      icon: GlobeIcon,
      color: "#38bdf8",
      bg: "rgba(56,189,248,0.15)",
    },
    "La vivienda": {
      icon: HouseIcon,
      color: "#f97316",
      bg: "rgba(249,115,22,0.15)",
    },
    "La vivienda y el alquiler": {
      icon: HouseIcon,
      color: "#f97316",
      bg: "rgba(249,115,22,0.15)",
    },
    "El deporte": {
      icon: BikeIcon,
      color: "#22d3ee",
      bg: "rgba(34,211,238,0.15)",
    },
    "El deporte y sus valores": {
      icon: BikeIcon,
      color: "#22d3ee",
      bg: "rgba(34,211,238,0.15)",
    },
    "La inmigración": {
      icon: UsersIcon,
      color: "#f97316",
      bg: "rgba(249,115,22,0.15)",
    },
    "La igualdad de género": {
      icon: UsersIcon,
      color: "#f472b6",
      bg: "rgba(244,114,182,0.15)",
    },
    "El envejecimiento poblacional": {
      icon: HeartIcon,
      color: "#f43f5e",
      bg: "rgba(244,63,94,0.15)",
    },
    "La inteligencia artificial": {
      icon: SmartphoneIcon,
      color: "#8b5cf6",
      bg: "rgba(139,92,246,0.15)",
    },
    "El cine y las series": {
      icon: TvIcon,
      color: "#a78bfa",
      bg: "rgba(167,139,250,0.15)",
    },
    "Las redes sociales": {
      icon: SmartphoneIcon,
      color: "#a78bfa",
      bg: "rgba(167,139,250,0.15)",
    },
    "La cultura y el arte": {
      icon: StarIcon,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.15)",
    },
    "La salud y el bienestar": {
      icon: HeartIcon,
      color: "#34d399",
      bg: "rgba(52,211,153,0.15)",
    },
    "Las relaciones personales": {
      icon: UsersIcon,
      color: "#f472b6",
      bg: "rgba(244,114,182,0.15)",
    },
    "El cuerpo y los sentidos": {
      icon: HeartIcon,
      color: "#f87171",
      bg: "rgba(248,113,113,0.15)",
    },
    "Los colores y las formas": {
      icon: SparklesIcon,
      color: "#e879f9",
      bg: "rgba(232,121,249,0.15)",
    },
    "Los días y los meses": {
      icon: ClockIcon,
      color: "#34d399",
      bg: "rgba(52,211,153,0.15)",
    },
    "Las comidas del día": {
      icon: UtensilsIcon,
      color: "#fb923c",
      bg: "rgba(251,146,60,0.15)",
    },
    "Las tareas del hogar": {
      icon: HouseIcon,
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.15)",
    },
    "En el supermercado": {
      icon: ShoppingBagIcon,
      color: "#60a5fa",
      bg: "rgba(96,165,250,0.15)",
    },
    "La naturaleza y los parques": {
      icon: SunIcon,
      color: "#22c55e",
      bg: "rgba(34,197,94,0.15)",
    },
    "Los juguetes y los juegos": {
      icon: GiftIcon,
      color: "#f472b6",
      bg: "rgba(244,114,182,0.15)",
    },
    "La música y los instrumentos": {
      icon: MusicIcon,
      color: "#a78bfa",
      bg: "rgba(167,139,250,0.15)",
    },
    "La hora y los momentos del día": {
      icon: ClockIcon,
      color: "#38bdf8",
      bg: "rgba(56,189,248,0.15)",
    },
    "El médico y la farmacia": {
      icon: HeartIcon,
      color: "#f43f5e",
      bg: "rgba(244,63,94,0.15)",
    },
    "El banco y el dinero": {
      icon: DollarSignIcon,
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.15)",
    },
    "El hotel y las reservas": {
      icon: HouseIcon,
      color: "#818cf8",
      bg: "rgba(129,140,248,0.15)",
    },
    "Las compras online": {
      icon: ShoppingBagIcon,
      color: "#a855f7",
      bg: "rgba(168,85,247,0.15)",
    },
    "El barrio y los vecinos": {
      icon: MapPinIcon,
      color: "#34d399",
      bg: "rgba(52,211,153,0.15)",
    },
    "Las noticias y el periódico": {
      icon: FileTextIcon,
      color: "#3b82f6",
      bg: "rgba(59,130,246,0.15)",
    },
    "Aprender idiomas": {
      icon: BookOpenIcon,
      color: "#60a5fa",
      bg: "rgba(96,165,250,0.15)",
    },
    "Mantenerse en forma": {
      icon: BikeIcon,
      color: "#22c55e",
      bg: "rgba(34,197,94,0.15)",
    },
    "El fin de semana": {
      icon: SunIcon,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.15)",
    },
    "La cocina y las recetas": {
      icon: UtensilsIcon,
      color: "#f97316",
      bg: "rgba(249,115,22,0.15)",
    },
    "El consumo responsable": {
      icon: ShoppingBagIcon,
      color: "#22c55e",
      bg: "rgba(34,197,94,0.15)",
    },
    "El voluntariado y la solidaridad": {
      icon: UsersIcon,
      color: "#f472b6",
      bg: "rgba(244,114,182,0.15)",
    },
    "El ocio y el tiempo libre": {
      icon: SunIcon,
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.15)",
    },
    "La conciliación familiar y laboral": {
      icon: BriefcaseIcon,
      color: "#818cf8",
      bg: "rgba(129,140,248,0.15)",
    },
    "Las ciudades sostenibles": {
      icon: MapPinIcon,
      color: "#10b981",
      bg: "rgba(16,185,129,0.15)",
    },
    "Los hábitos de consumo": {
      icon: ShoppingBagIcon,
      color: "#fb923c",
      bg: "rgba(251,146,60,0.15)",
    },
    "La música en vivo y los festivales": {
      icon: MusicIcon,
      color: "#ec4899",
      bg: "rgba(236,72,153,0.15)",
    },
    "El hábito de la lectura": {
      icon: BookOpenIcon,
      color: "#a78bfa",
      bg: "rgba(167,139,250,0.15)",
    },
    "El estrés y el descanso": {
      icon: HeartIcon,
      color: "#f43f5e",
      bg: "rgba(244,63,94,0.15)",
    },
    "La vida en el campo y la ciudad": {
      icon: HouseIcon,
      color: "#38bdf8",
      bg: "rgba(56,189,248,0.15)",
    },
    "La bioética y la genética": {
      icon: StarIcon,
      color: "#06b6d4",
      bg: "rgba(6,182,212,0.15)",
    },
    "La ética de la inteligencia artificial": {
      icon: SmartphoneIcon,
      color: "#8b5cf6",
      bg: "rgba(139,92,246,0.15)",
    },
    "La desigualdad económica": {
      icon: DollarSignIcon,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.15)",
    },
    "El futuro del trabajo": {
      icon: BriefcaseIcon,
      color: "#3b82f6",
      bg: "rgba(59,130,246,0.15)",
    },
    "La privacidad y los datos personales": {
      icon: SmartphoneIcon,
      color: "#6366f1",
      bg: "rgba(99,102,241,0.15)",
    },
    "La energía y las energías renovables": {
      icon: SunIcon,
      color: "#10b981",
      bg: "rgba(16,185,129,0.15)",
    },
    "La inteligencia emocional": {
      icon: HeartIcon,
      color: "#ec4899",
      bg: "rgba(236,72,153,0.15)",
    },
    "La desinformación y la cultura digital": {
      icon: TvIcon,
      color: "#a855f7",
      bg: "rgba(168,85,247,0.15)",
    },
    "El patrimonio cultural y su conservación": {
      icon: SchoolIcon,
      color: "#f97316",
      bg: "rgba(249,115,22,0.15)",
    },
    "La cooperación internacional": {
      icon: GlobeIcon,
      color: "#38bdf8",
      bg: "rgba(56,189,248,0.15)",
    },
    "La playa y el mar": {
      icon: SunIcon,
      color: "#38bdf8",
      bg: "rgba(56,189,248,0.15)",
    },
    "El parque de atracciones": {
      icon: GiftIcon,
      color: "#ec4899",
      bg: "rgba(236,72,153,0.15)",
    },
    "El camping y la naturaleza": {
      icon: SunIcon,
      color: "#22c55e",
      bg: "rgba(34,197,94,0.15)",
    },
    "La moda y el estilo": {
      icon: ShirtIcon,
      color: "#e879f9",
      bg: "rgba(232,121,249,0.15)",
    },
    "La protección de los animales": {
      icon: DogIcon,
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.15)",
    },
    "La publicidad y el consumo": {
      icon: ShoppingBagIcon,
      color: "#fb923c",
      bg: "rgba(251,146,60,0.15)",
    },
    "La exploración espacial": {
      icon: StarIcon,
      color: "#8b5cf6",
      bg: "rgba(139,92,246,0.15)",
    },
    "El futuro de la medicina": {
      icon: HeartIcon,
      color: "#f43f5e",
      bg: "rgba(244,63,94,0.15)",
    },
    "Los objetos de la clase": {
      icon: SchoolIcon,
      color: "#60a5fa",
      bg: "rgba(96,165,250,0.15)",
    },
    "Los regalos y las compras": {
      icon: GiftIcon,
      color: "#f472b6",
      bg: "rgba(244,114,182,0.15)",
    },
    "El reciclaje y los residuos": {
      icon: SunIcon,
      color: "#22c55e",
      bg: "rgba(34,197,94,0.15)",
    },
    "La justicia social": {
      icon: UsersIcon,
      color: "#818cf8",
      bg: "rgba(129,140,248,0.15)",
    },
    "En el restaurante": {
      icon: UtensilsIcon,
      color: "#fb923c",
      bg: "rgba(251,146,60,0.15)",
    },
    "La montaña y el senderismo": {
      icon: SunIcon,
      color: "#10b981",
      bg: "rgba(16,185,129,0.15)",
    },
    "El turismo de masas": {
      icon: PlaneIcon,
      color: "#38bdf8",
      bg: "rgba(56,189,248,0.15)",
    },
    "La neurociencia": {
      icon: StarIcon,
      color: "#8b5cf6",
      bg: "rgba(139,92,246,0.15)",
    },
    "Los amigos": {
      icon: UsersIcon,
      color: "#f472b6",
      bg: "rgba(244,114,182,0.15)",
    },
    "La biblioteca y la lectura": {
      icon: BookOpenIcon,
      color: "#60a5fa",
      bg: "rgba(96,165,250,0.15)",
    },
    "Los videojuegos y el ocio digital": {
      icon: TvIcon,
      color: "#a78bfa",
      bg: "rgba(167,139,250,0.15)",
    },
    "La economía circular": {
      icon: SunIcon,
      color: "#22c55e",
      bg: "rgba(34,197,94,0.15)",
    },
    "En la granja": {
      icon: HouseIcon,
      color: "#84cc16",
      bg: "rgba(132,204,22,0.15)",
    },
    "El mercado": {
      icon: ShoppingBagIcon,
      color: "#fb923c",
      bg: "rgba(251,146,60,0.15)",
    },
    "El arte urbano": {
      icon: StarIcon,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.15)",
    },
    "La longevidad": {
      icon: HeartIcon,
      color: "#f43f5e",
      bg: "rgba(244,63,94,0.15)",
    },
    "Los deportes de agua": {
      icon: SunIcon,
      color: "#38bdf8",
      bg: "rgba(56,189,248,0.15)",
    },
    "El trabajo de verano": {
      icon: BriefcaseIcon,
      color: "#818cf8",
      bg: "rgba(129,140,248,0.15)",
    },
    "El consumo colaborativo": {
      icon: UsersIcon,
      color: "#34d399",
      bg: "rgba(52,211,153,0.15)",
    },
    "La colonización de Marte": {
      icon: StarIcon,
      color: "#f97316",
      bg: "rgba(249,115,22,0.15)",
    },
    "Las vacaciones de invierno": {
      icon: SunIcon,
      color: "#22d3ee",
      bg: "rgba(34,211,238,0.15)",
    },
    "El autobús y el metro": {
      icon: CarIcon,
      color: "#60a5fa",
      bg: "rgba(96,165,250,0.15)",
    },
    "La gastronomía española": {
      icon: UtensilsIcon,
      color: "#fb923c",
      bg: "rgba(251,146,60,0.15)",
    },
    "La inteligencia artificial y el arte": {
      icon: SparklesIcon,
      color: "#a855f7",
      bg: "rgba(168,85,247,0.15)",
    },
    "El deporte en equipo": {
      icon: BikeIcon,
      color: "#22d3ee",
      bg: "rgba(34,211,238,0.15)",
    },
    "La educación en línea": {
      icon: SchoolIcon,
      color: "#60a5fa",
      bg: "rgba(96,165,250,0.15)",
    },
    "La biotecnología": {
      icon: HeartIcon,
      color: "#f43f5e",
      bg: "rgba(244,63,94,0.15)",
    },
    "Los planes de futuro": {
      icon: StarIcon,
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.15)",
    },
    "La vida en comunidad": {
      icon: UsersIcon,
      color: "#34d399",
      bg: "rgba(52,211,153,0.15)",
    },
    "La filosofía y la vida": {
      icon: BookOpenIcon,
      color: "#a78bfa",
      bg: "rgba(167,139,250,0.15)",
    },
    "Ayudar a los demás": {
      icon: HeartIcon,
      color: "#f43f5e",
      bg: "rgba(244,63,94,0.15)",
    },
    "El deporte profesional": {
      icon: BikeIcon,
      color: "#22d3ee",
      bg: "rgba(34,211,238,0.15)",
    },
    "La psicología del consumidor": {
      icon: ShoppingBagIcon,
      color: "#fb923c",
      bg: "rgba(251,146,60,0.15)",
    },
    "Cuidar el medio ambiente": {
      icon: SunIcon,
      color: "#22c55e",
      bg: "rgba(34,197,94,0.15)",
    },
    "La movilidad urbana": {
      icon: CarIcon,
      color: "#60a5fa",
      bg: "rgba(96,165,250,0.15)",
    },
    "El futuro de la humanidad": {
      icon: UsersIcon,
      color: "#818cf8",
      bg: "rgba(129,140,248,0.15)",
    },
    "El tiempo libre en casa": {
      icon: HouseIcon,
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.15)",
    },
    "La familia moderna": {
      icon: HeartIcon,
      color: "#f472b6",
      bg: "rgba(244,114,182,0.15)",
    },
    "La ética medioambiental": {
      icon: SunIcon,
      color: "#22c55e",
      bg: "rgba(34,197,94,0.15)",
    },
    "La comida sana": {
      icon: UtensilsIcon,
      color: "#84cc16",
      bg: "rgba(132,204,22,0.15)",
    },
    "La vida saludable": {
      icon: HeartIcon,
      color: "#10b981",
      bg: "rgba(16,185,129,0.15)",
    },
    "La sociedad del conocimiento": {
      icon: BookOpenIcon,
      color: "#60a5fa",
      bg: "rgba(96,165,250,0.15)",
    },
    "La vida de estudiante": {
      icon: SchoolIcon,
      color: "#60a5fa",
      bg: "rgba(96,165,250,0.15)",
    },
    "Montar un negocio": {
      icon: BriefcaseIcon,
      color: "#818cf8",
      bg: "rgba(129,140,248,0.15)",
    },
    "La ética de la ciencia": {
      icon: StarIcon,
      color: "#06b6d4",
      bg: "rgba(6,182,212,0.15)",
    },
    "La tecnología en casa": {
      icon: SmartphoneIcon,
      color: "#a78bfa",
      bg: "rgba(167,139,250,0.15)",
    },
    "La vida en el extranjero": {
      icon: PlaneIcon,
      color: "#38bdf8",
      bg: "rgba(56,189,248,0.15)",
    },
    "La energía nuclear": {
      icon: StarIcon,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.15)",
    },
    "El viaje en tren": {
      icon: PlaneIcon,
      color: "#60a5fa",
      bg: "rgba(96,165,250,0.15)",
    },
    "El aprendizaje de idiomas": {
      icon: BookOpenIcon,
      color: "#22d3ee",
      bg: "rgba(34,211,238,0.15)",
    },
    "La filosofía de la ciencia": {
      icon: StarIcon,
      color: "#8b5cf6",
      bg: "rgba(139,92,246,0.15)",
    },
    "La infancia": {
      icon: HeartIcon,
      color: "#f472b6",
      bg: "rgba(244,114,182,0.15)",
    },
    "La vida sin tecnología": {
      icon: ClockIcon,
      color: "#34d399",
      bg: "rgba(52,211,153,0.15)",
    },
    "La estética y la belleza": {
      icon: SparklesIcon,
      color: "#e879f9",
      bg: "rgba(232,121,249,0.15)",
    },
    "Las fotos y los recuerdos": {
      icon: CameraIcon,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.15)",
    },
    "La libertad": {
      icon: SunIcon,
      color: "#fbbf24",
      bg: "rgba(251,191,36,0.15)",
    },
    "El transporte público": {
      icon: CarIcon,
      color: "#60a5fa",
      bg: "rgba(96,165,250,0.15)",
    },
    "Los planes y las citas": {
      icon: CalendarIcon,
      color: "#f472b6",
      bg: "rgba(244,114,182,0.15)",
    },
    "La felicidad": {
      icon: HeartIcon,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.15)",
    },
  };
  if (b[theme]) {
    return b[theme];
  }
  const p = theme.split("").reduce((acc, item) => acc + item.charCodeAt(0), 0);
  const l = W[p % W.length];
  const color = aa[p % aa.length];
  return {
    icon: l,
    color,
    bg: `${color}15`,
  };
}
const oa = {
  A1: {
    title: "Nivel A1 - Acceso",
    sub: "入门级",
    color: "#10b981",
    glow: "#34d399",
    accent: "#059669",
    icon: StarIcon,
    gradient: "from-emerald-400 to-green-600",
  },
  A2: {
    title: "Nivel A2 - Plataforma",
    sub: "基础级",
    color: "#f97316",
    glow: "#fbbf24",
    accent: "#ea580c",
    icon: FlameIcon,
    gradient: "from-orange-400 to-red-600",
  },
  B1: {
    title: "Nivel B1 - Umbral",
    sub: "进阶级",
    color: "#3b82f6",
    glow: "#60a5fa",
    accent: "#2563eb",
    icon: CrownIcon,
    gradient: "from-blue-400 to-indigo-600",
  },
  B2: {
    title: "Nivel B2 - Avanzado",
    sub: "熟练级",
    color: "#a855f7",
    glow: "#c084fc",
    accent: "#9333ea",
    icon: SparklesIcon,
    gradient: "from-violet-400 to-purple-600",
  },
};
function WaComponent() {
  const { level } = useParams();
  const { t } = useLanguage();
  const p = level?.toUpperCase() || "A2";
  const l = oa[p];
  const [f, setF] = React.useState([]);
  const [B, setB] = React.useState(true);
  React.useEffect(() => {
    let r = false;
    setB(true);
    async function e() {
      try {
        const o = await l_1(p);
        if (!r) {
          setF(o || []);
          setB(false);
        }
      } catch (error) {
        console.error("Failed to load exams:", error);
        if (!r) {
          setF([]);
          setB(false);
        }
      }
    }
    e();
    return () => {
      r = true;
    };
  }, [p]);
  const [sa, setSa] = React.useState({});
  const [na, setNa] = React.useState(null);
  const TRef = React.useRef([]);
  React.useEffect(() => {
    if (!f.length) {
      return;
    }
    setSa({});
    const r = [];
    f.forEach((e, o) => {
      r.push(
        setTimeout(() => {
          setSa((v) => ({
            ...v,
            [o]: true,
          }));
        }, o * 100),
      );
    });
    return () => r.forEach(clearTimeout);
  }, [f]);
  const ta = (r, e) => {
    const o = TRef.current[e];
    if (!o) {
      return;
    }
    const v = o.getBoundingClientRect();
    const H = r.clientX - v.left;
    const X = r.clientY - v.top;
    const _ = v.width / 2;
    const m = v.height / 2;
    const G = ((X - m) / m) * -12;
    const ga = ((H - _) / _) * 12;
    o.style.transform = `perspective(1000px) rotateX(${G}deg) rotateY(${ga}deg) scale3d(1.03, 1.03, 1.03) translateZ(20px)`;
  };
  const da = (r) => {
    const e = TRef.current[r];
    if (e) {
      e.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0px)";
      setNa(null);
    }
  };
  if (!l) {
    return (
      <StarfieldBackground>
        <p className="text-white/40 flex items-center justify-center min-h-screen">
          {t("Nivel no encontrado", "未找到级别")}
        </p>
      </StarfieldBackground>
    );
  }
  const ba = [
    {
      icon: BookOpenIcon,
      label: "Vocab",
    },
    {
      icon: FileTextIcon,
      label: "Lectura",
    },
    {
      icon: HeadphonesIcon,
      label: "Audicion",
    },
    {
      icon: PenToolIcon,
      label: "Escritura",
    },
    {
      icon: MicIcon,
      label: "Monologo",
    },
  ];
  return (
    <StarfieldBackground>
      <style>{`
    @keyframes iconBounce { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.12); } }
    @keyframes floatY { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
    @keyframes gradientXY { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    @keyframes neonPulse { 0%, 100% { opacity: 0.8; } 50% { opacity: 1; } }
    @keyframes rotateBorder { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  `}</style>
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(ellipse at center, ${l.glow}30, transparent 70%)`,
          filter: "blur(60px)",
          zIndex: 6,
        }}
      />
      <div className="exam-experience max-w-6xl mx-auto px-4 py-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-white/50 hover:text-orange-400 transition-all mb-8 text-sm group"
        >
          <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" />
          {t("Volver al inicio", "返回首页")}
        </Link>
        <div className="exam-level-cinematic-hero text-center mb-10">
          <div className="flex justify-center -mt-5 -mb-5">
            <L_2 variant="exams" compact />
          </div>
          <div className="relative inline-block mb-5">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-2xl transition-all"
              style={{
                background: `linear-gradient(135deg, ${l.color}, ${l.accent})`,
                boxShadow: `0 0 40px ${l.glow}50, 0 8px 30px rgba(0,0,0,0.3)`,
              }}
            >
              <l.icon size={36} className="text-white" />
            </div>
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                border: `2px solid ${l.glow}30`,
                animation: "rotateBorder 8s linear infinite",
                margin: "-8px",
              }}
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">{l.title}</h1>
          <p
            className="text-lg"
            style={{
              color: `${l.glow}90`,
            }}
          >
            {l.sub} · {f.length} {t("examenes", "考试")}
          </p>
          <div
            className="w-32 h-1 rounded-full mx-auto mt-4"
            style={{
              background: `linear-gradient(90deg, transparent, ${l.glow}, transparent)`,
            }}
          />
          <div className="exam-level-stats mt-7">
            <div>
              <strong>{f.length}</strong>
              <span>{t("simulacros", "模拟考试")}</span>
            </div>
            <div>
              <strong>5</strong>
              <span>{t("competencias", "考试技能")}</span>
            </div>
            <div>
              <strong>{p}</strong>
              <span>{t("nivel activo", "当前等级")}</span>
            </div>
          </div>
        </div>
        <div className="exam-level-rail flex justify-start md:justify-center gap-4 mb-12 overflow-x-auto no-scrollbar pb-3">
          {Object.entries(oa).map(([r, e]) => {
            const o = r === p;
            return (
              <Link
                key={r}
                to={`/examenes-nivel/${r}`}
                className="exam-level-selector-card relative group"
                style={{
                  perspective: "800px",
                }}
              >
                <div
                  className="absolute -inset-[2px] rounded-3xl transition-all duration-500"
                  style={{
                    background: o
                      ? `linear-gradient(135deg, ${e.glow}, ${e.color}, ${e.accent})`
                      : `linear-gradient(135deg, ${e.color}40, ${e.color}20)`,
                    opacity: o ? 1 : 0,
                    transform: o ? "scale(1)" : "scale(0.95)",
                    filter: o ? "blur(1px)" : "none",
                  }}
                />
                <div
                  className="relative px-6 py-5 rounded-3xl text-center transition-all duration-500 overflow-hidden min-w-[120px]"
                  style={{
                    background: o
                      ? `linear-gradient(135deg, ${e.color}30 0%, ${e.accent}20 50%, rgba(15,24,60,0.9) 100%)`
                      : `linear-gradient(135deg, ${e.color}08 0%, rgba(15,24,60,0.8) 100%)`,
                    border: o ? `2px solid ${e.glow}` : `2px solid ${e.color}15`,
                    boxShadow: o
                      ? `0 0 40px ${e.glow}50, 0 0 80px ${e.glow}20, inset 0 0 30px ${e.glow}10`
                      : `0 0 10px ${e.color}05`,
                    transform: o ? "translateY(-4px) rotateY(0deg)" : "rotateY(0deg)",
                  }}
                >
                  <div
                    className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full blur-2xl transition-opacity duration-500"
                    style={{
                      background: e.glow,
                      opacity: o ? 0.4 : 0.1,
                    }}
                  />
                  <div
                    className="relative mb-3 mx-auto w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500"
                    style={{
                      background: o ? `linear-gradient(135deg, ${e.color}, ${e.accent})` : `${e.color}15`,
                      border: o ? `2px solid ${e.glow}` : `2px solid ${e.color}25`,
                      boxShadow: o ? `0 0 25px ${e.glow}60, 0 4px 15px rgba(0,0,0,0.3)` : "none",
                      animation: o ? "iconBounce 2s ease-in-out infinite" : "none",
                    }}
                  >
                    <e.icon size={32} className="text-white" />
                    {o && (
                      <div
                        className="absolute inset-0 rounded-2xl animate-ping opacity-20"
                        style={{
                          boxShadow: `0 0 20px ${e.glow}`,
                        }}
                      />
                    )}
                  </div>
                  <span
                    className="relative block text-3xl font-black transition-all duration-300"
                    style={{
                      color: o ? "#fff" : `${e.color}80`,
                      textShadow: o ? `0 0 20px ${e.glow}80, 0 2px 4px rgba(0,0,0,0.5)` : "none",
                    }}
                  >
                    {r}
                  </span>
                  <span
                    className="relative block text-xs font-bold mt-1 transition-all"
                    style={{
                      color: o ? `${e.glow}` : `${e.color}40`,
                    }}
                  >
                    {e.sub}
                  </span>
                  {o && (
                    <>
                      <div
                        className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full"
                        style={{
                          background: e.glow,
                          boxShadow: `0 0 6px ${e.glow}`,
                          animation: "floatY 2s ease-in-out infinite",
                        }}
                      />
                      <div
                        className="absolute top-4 right-3 w-1 h-1 rounded-full"
                        style={{
                          background: e.glow,
                          boxShadow: `0 0 4px ${e.glow}`,
                          animation: "floatY 2.5s ease-in-out infinite 0.5s",
                        }}
                      />
                      <div
                        className="absolute bottom-3 left-3 w-1 h-1 rounded-full"
                        style={{
                          background: e.glow,
                          boxShadow: `0 0 4px ${e.glow}`,
                          animation: "floatY 2s ease-in-out infinite 1s",
                        }}
                      />
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
        {B && (
          <div className="flex flex-col items-center justify-center py-20">
            <div
              className="w-16 h-16 border-4 border-white/10 border-t-white/60 rounded-full animate-spin mb-6"
              style={{
                boxShadow: `0 0 20px ${l.glow}30`,
              }}
            />
            <p className="text-white/50 font-bold text-lg animate-pulse">
              {t("Cargando examenes...", "加载考试中...")}
            </p>
          </div>
        )}
        {!B && f.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-white/50">
            <LayersIcon size={48} className="mb-4 opacity-30" />
            <p className="font-bold text-lg">
              {t("No hay exámenes disponibles para este nivel", "此级别暂无考试")}
            </p>
          </div>
        )}
        <div className="exam-mission-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {f.map((r, e) => {
            const o = Ha(r.theme);
            const V = o.icon || LayersIcon;
            const H = sa[e] || false;
            const X = na === e;
            const _ = (r.id * 37) % 100;
            return (
              <Link
                key={r.id}
                to={`/examenes/${p}/${r.id}`}
                className="exam-mission-card group block h-full"
                style={{
                  perspective: "1000px",
                }}
                onMouseEnter={() => setNa(e)}
              >
                <div
                  ref={(m) => {
                    TRef.current[e] = m;
                  }}
                  className="relative h-full transition-all duration-300 ease-out"
                  style={{
                    opacity: H ? 1 : 0,
                    transform: H
                      ? "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0px)"
                      : "perspective(1000px) rotateX(15deg) rotateY(-10deg) scale3d(0.9, 0.9, 0.9) translateZ(-50px)",
                    transition: "transform 0.4s ease-out, opacity 0.6s ease-out",
                  }}
                  onMouseMove={(m) => ta(m, e)}
                  onMouseLeave={() => da(e)}
                >
                  <div
                    className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden"
                    style={{
                      zIndex: 0,
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: `conic-gradient(from 0deg, ${o.color}, ${l.glow}, ${l.accent}, ${o.color})`,
                        animation: "rotateBorder 3s linear infinite",
                      }}
                    />
                    <div
                      className="absolute inset-[1px] rounded-2xl"
                      style={{
                        background: "rgba(10,12,30,0.95)",
                      }}
                    />
                  </div>
                  <div
                    className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, ${o.color}25, transparent 70%)`,
                      zIndex: -1,
                    }}
                  />
                  <div
                    className="relative h-full rounded-2xl flex flex-col overflow-hidden backdrop-blur-xl"
                    style={{
                      background: `linear-gradient(135deg, ${o.color}08 0%, rgba(255,255,255,0.02) 40%, rgba(15,24,60,0.9) 100%)`,
                      border: `1px solid ${o.color}20`,
                      boxShadow: X
                        ? `0 0 30px ${o.color}30, 0 0 60px ${l.glow}15, inset 0 1px 0 rgba(255,255,255,0.08)`
                        : "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
                      zIndex: 1,
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${o.color}, ${l.glow}, transparent)`,
                        backgroundSize: "200% 100%",
                        animation: "shimmer 2s linear infinite",
                      }}
                    />
                    <div
                      className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: `linear-gradient(to bottom, ${o.color}, ${l.glow}, ${l.accent})`,
                        boxShadow: `0 0 10px ${o.color}60`,
                      }}
                    />
                    <div
                      className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"
                      style={{
                        background: `${o.color}30`,
                      }}
                    />
                    <div className="exam-mission-content relative z-10 h-full flex flex-col pl-5 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className="text-xs font-bold px-3 py-1.5 rounded-xl text-white backdrop-blur-md"
                          style={{
                            background: `linear-gradient(135deg, ${o.color}40, ${o.color}20)`,
                            border: `1px solid ${o.color}40`,
                            boxShadow: `0 0 15px ${o.color}30`,
                          }}
                        >
                          {p}-{r.id}
                        </span>
                        <div className="relative transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                          <div
                            className="p-2.5 rounded-xl"
                            style={{
                              background: `${o.color}15`,
                              border: `1px solid ${o.color}30`,
                              boxShadow: `0 0 15px ${o.color}20`,
                            }}
                          >
                            <V
                              size={22}
                              style={{
                                color: o.color,
                                filter: `drop-shadow(0 0 6px ${o.color}80)`,
                              }}
                            />
                          </div>
                          <div
                            className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full animate-ping opacity-50"
                            style={{
                              background: o.color,
                              boxShadow: `0 0 8px ${o.color}`,
                            }}
                          />
                        </div>
                      </div>
                      <h3
                        className="font-black text-xl md:text-2xl mb-1 leading-tight text-white"
                        style={{
                          textShadow: `0 0 20px ${o.color}80, 0 0 40px ${o.color}40, 0 2px 4px rgba(0,0,0,0.5)`,
                          filter: `drop-shadow(0 0 8px ${o.color}60)`,
                        }}
                      >
                        {r.theme}
                      </h3>
                      <p
                        className="text-base font-bold mb-4"
                        style={{
                          color: `${o.color}ee`,
                          textShadow: `0 0 12px ${o.color}50, 0 1px 2px rgba(0,0,0,0.5)`,
                        }}
                      >
                        {Ba[r.theme] || ""}
                      </p>
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-1.5">
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider"
                            style={{
                              color: `${o.color}80`,
                            }}
                          >
                            {t("Progreso", "进度")}
                          </span>
                          <span
                            className="text-[10px] font-bold"
                            style={{
                              color: o.color,
                            }}
                          >
                            {_}%
                          </span>
                        </div>
                        <div
                          className="h-1.5 rounded-full overflow-hidden"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                          }}
                        >
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                              width: `${_}%`,
                              background: `linear-gradient(90deg, ${o.color}, ${l.glow})`,
                              boxShadow: `0 0 10px ${o.color}60, 0 0 20px ${o.color}30`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {ba.map((m, G) => (
                          <span
                            key={G}
                            className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-lg font-bold backdrop-blur-sm"
                            style={{
                              background: `${o.color}08`,
                              color: `${o.color}70`,
                              border: `1px solid ${o.color}15`,
                              boxShadow: `0 0 8px ${o.color}08`,
                            }}
                          >
                            <m.icon size={10} />
                            <span className="uppercase tracking-wide">{m.label}</span>
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div
                          className="flex items-center gap-1 text-xs font-bold opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0"
                          style={{
                            color: o.color,
                            textShadow: `0 0 8px ${o.color}40`,
                          }}
                        >
                          <span>{t("Abrir examen", "打开考试")}</span>
                          <ChevronRightIcon
                            size={12}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </div>
                        <div className="flex gap-0.5 opacity-20 group-hover:opacity-50 transition-opacity">
                          {[0, 1, 2].map((m) => (
                            <div
                              key={m}
                              className="w-3 h-4 rounded-sm"
                              style={{
                                background: `${o.color}20`,
                                border: `1px solid ${o.color}15`,
                                boxShadow: `0 0 4px ${o.color}10`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </StarfieldBackground>
  );
}
export { WaComponent as default };
