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
import { l as l_1 } from "../../lib/exams-loader.js";
import "../../data/generated-content.js";
import "../../styles/v14-fix-examenes.css";
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
const NIVELES_PRACTICA = {
  A1: { nombre: "Acceso", zh: "入门级", sello: "竹", icon: StarIcon },
  A2: { nombre: "Plataforma", zh: "基础级", sello: "灯", icon: FlameIcon },
  B1: { nombre: "Umbral", zh: "进阶级", sello: "山", icon: CrownIcon },
  B2: { nombre: "Avanzado", zh: "熟练级", sello: "龙", icon: SparklesIcon },
};
const PARTES_SIMULACRO = [
  { icon: BookOpenIcon, es: "Vocabulario", zh: "词汇" },
  { icon: FileTextIcon, es: "Lectura", zh: "阅读" },
  { icon: HeadphonesIcon, es: "Audición", zh: "听力" },
  { icon: PenToolIcon, es: "Escritura", zh: "写作" },
  { icon: MicIcon, es: "Oral", zh: "口语" },
];
function WaComponent() {
  const { level } = useParams();
  const nivel = level?.toUpperCase() || "A2";
  const config = NIVELES_PRACTICA[nivel];
  const [examenes, setExamenes] = React.useState([]);
  const [cargando, setCargando] = React.useState(true);
  const [fallo, setFallo] = React.useState(false);
  React.useEffect(() => {
    let cancelado = false;
    setCargando(true);
    setFallo(false);
    if (!config) {
      setCargando(false);
      return undefined;
    }
    l_1(nivel)
      .then((lista) => {
        if (cancelado) return;
        setExamenes(lista || []);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Failed to load exams:", error);
        if (cancelado) return;
        setExamenes([]);
        setFallo(true);
        setCargando(false);
      });
    return () => {
      cancelado = true;
    };
  }, [nivel, config]);
  if (!config) {
    return (
      <StarfieldBackground>
        <div className="xn gm-no-adapt">
          <div className="xn-vacio" role="alert">
            <span className="ofx-sello" aria-hidden="true" translate="no">无</span>
            <p>
              Nivel no encontrado
              <span lang="zh-CN">未找到该级别</span>
            </p>
            <Link to="/examenes-nivel/A1" className="ofx-btn ofx-btn-laca">
              <ArrowLeftIcon size={16} aria-hidden="true" /> Ir al nivel A1 · 前往A1级
            </Link>
          </div>
        </div>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <div className="xn gm-no-adapt" data-nivel={nivel}>
        <Link to="/dashboard" className="xn-volver">
          <ArrowLeftIcon size={16} aria-hidden="true" /> Volver al inicio · <span lang="zh-CN">返回首页</span>
        </Link>
        <header className="xn-hero">
          <div className="xn-hero-sello" aria-hidden="true" translate="no">
            <span>{config.sello}</span>
            <b>{nivel}</b>
          </div>
          <div className="xn-hero-txt">
            <p className="xn-hero-kicker">
              Simulacros de práctica · <span lang="zh-CN">练习模拟考试</span>
            </p>
            <h1 className="xn-hero-tit">
              Nivel {nivel} · {config.nombre}
              <span lang="zh-CN">{config.zh}</span>
            </h1>
            <ul className="xn-hero-datos">
              <li>
                <b>{cargando ? "…" : examenes.length}</b> simulacros · <span lang="zh-CN">套模拟题</span>
              </li>
              <li>
                <b>5</b> competencias · <span lang="zh-CN">项技能</span>
              </li>
            </ul>
          </div>
        </header>
        <nav className="xn-niveles" aria-label="Niveles · 级别">
          {Object.entries(NIVELES_PRACTICA).map(([clave, datos]) => {
            const activo = clave === nivel;
            return (
              <Link
                key={clave}
                to={`/examenes-nivel/${clave}`}
                className={`xn-nivel ${activo ? "on" : ""}`}
                aria-current={activo ? "page" : undefined}
              >
                <span className="xn-nivel-sello" aria-hidden="true" translate="no">
                  {datos.sello}
                </span>
                <span className="xn-nivel-txt">
                  <b>{clave}</b>
                  <small lang="zh-CN">{datos.zh}</small>
                </span>
              </Link>
            );
          })}
        </nav>
        {cargando && (
          <div className="xn-vacio" role="status">
            <span className="ofx-spinner" aria-hidden="true" />
            <p>
              Cargando exámenes…
              <span lang="zh-CN">正在加载考试…</span>
            </p>
          </div>
        )}
        {!cargando && examenes.length === 0 && (
          <div className="xn-vacio" role={fallo ? "alert" : undefined}>
            <LayersIcon size={40} aria-hidden="true" />
            <p>
              {fallo ? "No se pudieron cargar los exámenes" : "No hay exámenes disponibles para este nivel"}
              <span lang="zh-CN">{fallo ? "考试加载失败，请稍后重试" : "此级别暂无考试"}</span>
            </p>
          </div>
        )}
        {!cargando && examenes.length > 0 && (
          <ul className="xn-lista">
            {examenes.map((examen, indice) => {
              const IconoTema = Ha(examen.theme || "").icon || LayersIcon;
              const temaZh = Ba[examen.theme] || examen.themeZh || examen.themeChinese || "";
              return (
                <li key={examen.id} style={{ animationDelay: `${Math.min(indice, 14) * 40}ms` }}>
                  <Link to={`/examenes/${nivel}/${examen.id}`} className="xn-carta">
                    <span className="xn-carta-num">
                      <small>N.º · 号</small>
                      <b>{String(examen.id).padStart(2, "0")}</b>
                    </span>
                    <span className="xn-carta-cuerpo">
                      <span className="xn-carta-cab">
                        <span className="xn-carta-cod">
                          {nivel}-{examen.id}
                        </span>
                        <IconoTema size={20} aria-hidden="true" className="xn-carta-ico" />
                      </span>
                      <span className="xn-carta-tema">{examen.theme}</span>
                      {temaZh && (
                        <span className="xn-carta-zh" lang="zh-CN">
                          {temaZh}
                        </span>
                      )}
                      <span className="xn-carta-partes">
                        {PARTES_SIMULACRO.map((parte) => (
                          <span key={parte.es} className="xn-parte">
                            <parte.icon size={13} aria-hidden="true" />
                            {parte.es}
                          </span>
                        ))}
                      </span>
                      <span className="xn-carta-ir">
                        Abrir examen · <span lang="zh-CN">打开考试</span>
                        <ChevronRightIcon size={16} aria-hidden="true" />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </StarfieldBackground>
  );
}
export { WaComponent as default };
