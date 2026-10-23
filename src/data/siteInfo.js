const SITE_INFO = {
  descriptionCn: "面向中国学生的 DELE（A1-B2）备考平台，含考试、词典、模块、发音、游戏和写作批改。",
  levels: {
    A1: {
      count: 42,
      desc: "入门：问候、家庭、食物、身体、时间、颜色、购物",
      descCn: "入门级：问候、家庭、食物、身体、时间、颜色、购物",
    },
    A2: {
      count: 30,
      desc: "基础：旅行、银行、酒店、网购、街区、健康、烹饪",
      descCn: "基础级：旅行、银行、酒店、网购、街区、健康、烹饪",
    },
    B1: {
      count: 30,
      desc: "进阶：工作、环境、教育、消费、城市、压力、休闲",
      descCn: "进阶级：工作、环境、教育、消费、城市、压力、休闲",
    },
    B2: {
      count: 30,
      desc: "高级：经济、AI、生物伦理、能源、隐私、文化遗产",
      descCn: "高级：经济、AI、生物伦理、能源、隐私、文化遗产",
    },
  },
  examThemes: {
    A1: [
      {
        es: "Presentaciones y saludos",
        zh: "自我介绍与问候",
      },
      {
        es: "La familia",
        zh: "家庭",
      },
      {
        es: "La casa y la rutina",
        zh: "家与日常",
      },
      {
        es: "La comida y bebida",
        zh: "食物与饮料",
      },
      {
        es: "La ropa y las estaciones",
        zh: "衣服与季节",
      },
      {
        es: "La ciudad y los lugares",
        zh: "城市与地点",
      },
      {
        es: "Los animales",
        zh: "动物",
      },
      {
        es: "La salud y el cuerpo",
        zh: "健康与身体",
      },
      {
        es: "Las profesiones",
        zh: "职业",
      },
      {
        es: "Los medios de transporte",
        zh: "交通工具",
      },
      {
        es: "Las vacaciones",
        zh: "假期",
      },
      {
        es: "Las fiestas y tradiciones",
        zh: "节日与传统",
      },
      {
        es: "La tecnología básica",
        zh: "基础科技",
      },
      {
        es: "Las emociones básicas",
        zh: "基础情绪",
      },
      {
        es: "El cuerpo y los sentidos",
        zh: "身体与感官",
      },
      {
        es: "Los colores y las formas",
        zh: "颜色与形状",
      },
      {
        es: "Los días y los meses",
        zh: "星期与月份",
      },
      {
        es: "Las comidas del día",
        zh: "一日三餐",
      },
      {
        es: "Las tareas del hogar",
        zh: "家务活",
      },
      {
        es: "En el supermercado",
        zh: "在超市",
      },
      {
        es: "La naturaleza y los parques",
        zh: "自然与公园",
      },
      {
        es: "Los juguetes y los juegos",
        zh: "玩具与游戏",
      },
      {
        es: "La música y los instrumentos",
        zh: "音乐与乐器",
      },
      {
        es: "La hora y los momentos del día",
        zh: "时间与一天的时刻",
      },
    ],
    A2: [
      {
        es: "La familia",
        zh: "家庭",
      },
      {
        es: "La casa y los muebles",
        zh: "家与家具",
      },
      {
        es: "La comida y restaurantes",
        zh: "食物与餐厅",
      },
      {
        es: "La ropa y las compras",
        zh: "衣服与购物",
      },
      {
        es: "La ciudad y los lugares",
        zh: "城市与地点",
      },
      {
        es: "Los viajes y el transporte",
        zh: "旅行与交通",
      },
      {
        es: "El tiempo atmosférico",
        zh: "天气",
      },
      {
        es: "Las mascotas y animales",
        zh: "宠物与动物",
      },
      {
        es: "La escuela y los estudios",
        zh: "学校与学习",
      },
      {
        es: "Las aficiones y el tiempo libre",
        zh: "爱好与休闲",
      },
      {
        es: "El médico y la farmacia",
        zh: "医生与药房",
      },
      {
        es: "El banco y el dinero",
        zh: "银行与金钱",
      },
      {
        es: "El hotel y las reservas",
        zh: "酒店与预订",
      },
      {
        es: "Las compras online",
        zh: "网上购物",
      },
      {
        es: "El barrio y los vecinos",
        zh: "社区与邻居",
      },
      {
        es: "Las noticias y el periódico",
        zh: "新闻与报纸",
      },
      {
        es: "Aprender idiomas",
        zh: "学习语言",
      },
      {
        es: "Mantenerse en forma",
        zh: "保持健康",
      },
      {
        es: "El fin de semana",
        zh: "周末",
      },
      {
        es: "La cocina y las recetas",
        zh: "烹饪与食谱",
      },
    ],
    B1: [
      {
        es: "El mundo laboral",
        zh: "职场世界",
      },
      {
        es: "El medio ambiente",
        zh: "环境",
      },
      {
        es: "La alimentación saludable",
        zh: "健康饮食",
      },
      {
        es: "La tecnología y redes sociales",
        zh: "科技与社交媒体",
      },
      {
        es: "La educación",
        zh: "教育",
      },
      {
        es: "Los viajes y el turismo",
        zh: "旅行与旅游",
      },
      {
        es: "La salud mental",
        zh: "心理健康",
      },
      {
        es: "El arte y la cultura",
        zh: "艺术与文化",
      },
      {
        es: "El deporte",
        zh: "运动",
      },
      {
        es: "La vivienda",
        zh: "住房",
      },
      {
        es: "La inmigración",
        zh: "移民",
      },
      {
        es: "La igualdad de género",
        zh: "性别平等",
      },
      {
        es: "La globalización",
        zh: "全球化",
      },
      {
        es: "El envejecimiento poblacional",
        zh: "人口老龄化",
      },
      {
        es: "La inteligencia artificial",
        zh: "人工智能",
      },
      {
        es: "El consumo responsable",
        zh: "理性消费",
      },
      {
        es: "El voluntariado y la solidaridad",
        zh: "志愿服务与互助",
      },
      {
        es: "El ocio y el tiempo libre",
        zh: "休闲与业余时间",
      },
      {
        es: "La conciliación familiar y laboral",
        zh: "家庭与工作平衡",
      },
      {
        es: "Las ciudades sostenibles",
        zh: "可持续城市",
      },
      {
        es: "Los hábitos de consumo",
        zh: "消费习惯",
      },
      {
        es: "La música en vivo y los festivales",
        zh: "现场音乐与音乐节",
      },
      {
        es: "El hábito de la lectura",
        zh: "阅读习惯",
      },
      {
        es: "El estrés y el descanso",
        zh: "压力与休息",
      },
      {
        es: "La vida en el campo y la ciudad",
        zh: "乡村与城市生活",
      },
    ],
    B2: [
      {
        es: "El medio ambiente y cambio climático",
        zh: "环境与气候变化",
      },
      {
        es: "La política y sociedad",
        zh: "政治与社会",
      },
      {
        es: "La economía y el dinero",
        zh: "经济与金钱",
      },
      {
        es: "La psicología y personalidad",
        zh: "心理学与个性",
      },
      {
        es: "La educación universitaria",
        zh: "大学教育",
      },
      {
        es: "El mercado laboral",
        zh: "劳动力市场",
      },
      {
        es: "La inmigración y cultura",
        zh: "移民与文化",
      },
      {
        es: "La tecnología e inteligencia artificial",
        zh: "科技与人工智能",
      },
      {
        es: "El arte y literatura",
        zh: "艺术与文学",
      },
      {
        es: "Los derechos humanos",
        zh: "人权",
      },
      {
        es: "El emprendimiento",
        zh: "创业",
      },
      {
        es: "La vivienda y gentrificación",
        zh: "住房与士绅化",
      },
      {
        es: "El turismo sostenible",
        zh: "可持续旅游",
      },
      {
        es: "La gastronomía mundial",
        zh: "世界美食",
      },
      {
        es: "Los medios de comunicación",
        zh: "传媒",
      },
      {
        es: "La ciencia y descubrimientos",
        zh: "科学与发现",
      },
      {
        es: "Las tradiciones en peligro",
        zh: "濒危传统",
      },
      {
        es: "La bioética y la genética",
        zh: "生命伦理与基因",
      },
      {
        es: "La ética de la inteligencia artificial",
        zh: "人工智能伦理",
      },
      {
        es: "La desigualdad económica",
        zh: "经济不平等",
      },
      {
        es: "El futuro del trabajo",
        zh: "工作的未来",
      },
      {
        es: "La privacidad y los datos personales",
        zh: "隐私与个人数据",
      },
      {
        es: "La energía y las energías renovables",
        zh: "能源与可再生能源",
      },
      {
        es: "La inteligencia emocional",
        zh: "情商",
      },
      {
        es: "La desinformación y la cultura digital",
        zh: "虚假信息与数字文化",
      },
      {
        es: "El patrimonio cultural y su conservación",
        zh: "文化遗产与保护",
      },
      {
        es: "La cooperación internacional",
        zh: "国际合作",
      },
    ],
  },
  moduleTopics: [
    "Saludos y cortesía",
    "Números y cantidades",
    "Nacionalidad y origen",
    "La vivienda",
    "Profesiones",
    "Días y meses",
    "La hora",
    "Colores",
    "La familia",
    "Comida y bebida",
    "La ropa",
    "El cuerpo humano",
    "Deportes",
    "Transporte",
    "El clima",
    "La ciudad",
    "Animales",
    "La música",
    "Tecnología",
    "Vacaciones",
    "Rutina diaria",
    "En el restaurante",
    "Verbos y conjugación",
    "Descripción física",
    "El cine",
    "Comparativos",
    "Futuro próximo",
    "Preposiciones de lugar",
    "Pronombres de objeto",
    "Presente",
    "Verbos irregulares",
    "Pretérito perfecto",
    "Direcciones",
    "Pretérito indefinido",
    "El imperfecto",
    "Futuro simple",
    "Imperativo",
    "Subjuntivo presente",
    "Condicional",
    "Oraciones condicionales",
    "Pluscuamperfecto",
    "Imperfecto de subjuntivo",
    "Estilo indirecto",
    "Medio ambiente",
    "Expresiones idiomáticas",
    "Falsos amigos",
    "Expresiones de tiempo",
    "Tiendas",
    "El hotel",
    "El aeropuerto",
    "La salud",
    "La educación",
    "Español de negocios",
  ],
  dictionaryThemes: {
    A1: [
      "Saludos y presentaciones",
      "Números y cantidades",
      "Familia y personas",
      "Casa y hogar",
      "Comida y bebida",
      "Tiempo y clima",
    ],
    A2: ["Viajes", "Compras", "Salud", "Trabajo", "Ocio", "Cuerpo"],
    B1: ["Sociedad", "Trabajo", "Medio ambiente", "Tecnología", "Educación", "Sentimientos"],
    B2: ["Economía", "Política", "Cultura", "Ciencia", "Medios", "Sociedad"],
  },
  examSections: {
    zh: "每个考试包括：词汇（10个词）、阅读（文章+10题）、听力（转写+10题）、写作（2个选项）、独白（2个话题）和互动（3个问题）。",
  },
};
export { SITE_INFO };
