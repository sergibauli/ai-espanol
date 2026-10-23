const GRAMMAR_TOPICS = [
  {
    id: "ser-estar",
    title: "Ser vs Estar",
    titleCn: "Ser 与 Estar 的区别",
    level: "A1-A2",
    explanation:
      'En español hay dos verbos "to be". "Ser" se usa para características permanentes: identidad, origen, profesión, color, hora. "Estar" se usa para estados temporales: lugar, estado de ánimo, salud y acciones en curso.',
    explanationCn:
      '西班牙语有两个"是/在"动词。Ser 用于永久特征：身份、出身、职业、颜色、时间。Estar 用于暂时状态：位置、情绪、健康、正在进行的动作。',
    examples: [
      {
        es: "Soy estudiante y soy de China.",
        zh: "我是学生，我来自中国。",
      },
      {
        es: "Estoy cansado hoy.",
        zh: "我今天很累。",
      },
      {
        es: "La casa está en el centro.",
        zh: "房子在市中心。",
      },
    ],
    commonError: 'Los hablantes de chino suelen decir "Soy cansado" (错误) en lugar de "Estoy cansado".',
    commonErrorCn: '中文母语者常把"我累了"说成 Soy cansado（错误），正确是 Estoy cansado。',
    tip: "Regla rápida: ¿es permanente o temporal? Permanente = ser, temporal = estar.",
    tipCn: "快速判断：是永久还是暂时？永久用 ser，暂时用 estar。",
  },
  {
    id: "genero-numero",
    title: "Género y número de los sustantivos",
    titleCn: "名词的性与数",
    level: "A1",
    explanation:
      "Todos los sustantivos en español tienen género (masculino o femenino) y número (singular o plural). En general, -o es masculino y -a es femenino, pero hay excepciones (la mano, el día, el problema).",
    explanationCn:
      "西班牙语所有名词都有性（阳性或阴性）和数（单数或复数）。通常 -o 结尾是阳性，-a 结尾是阴性，但有例外（la mano 手、el día 天、el problema 问题）。",
    examples: [
      {
        es: "El libro es rojo. La casa es blanca.",
        zh: "书是红色的。房子是白色的。",
      },
      {
        es: "Los chicos y las chicas estudian.",
        zh: "男孩们和女孩们学习。",
      },
    ],
    commonError: 'Olvidar la concordancia del adjetivo: decir "la casa blanco" en lugar de "la casa blanca".',
    commonErrorCn: '忘记形容词与名词一致：把"白房子"说成 la casa blanco，正确是 la casa blanca。',
    tip: "Aprende cada palabra nueva con su artículo (el/la) para recordar su género.",
    tipCn: "学新单词时连冠词一起记（el/la），这样能记住它的性。",
  },
  {
    id: "articulos",
    title: "Los artículos",
    titleCn: "冠词",
    level: "A1",
    explanation:
      "El español usa artículos determinados (el, la, los, las = 特指) e indeterminados (un, una, unos, unas = 泛指). A diferencia del chino, el español casi siempre necesita un artículo antes del sustantivo.",
    explanationCn:
      "西班牙语用定冠词（el/la/los/las）和不定冠词（un/una/unos/unas）。和中文不同，西班牙语名词前几乎总要加冠词。",
    examples: [
      {
        es: "El perro es grande. Un perro está en el parque.",
        zh: "这只狗很大。公园里有一只狗。",
      },
      {
        es: "Me gustan las manzanas.",
        zh: "我喜欢苹果（泛指）。",
      },
    ],
    commonError: 'Omitir el artículo: decir "Perro es grande" en lugar de "El perro es grande".',
    commonErrorCn: '省略冠词：把"这只狗很大"说成 Perro es grande，正确是 El perro es grande。',
    tip: "En español el artículo es obligatorio la mayoría de las veces, incluso con conceptos generales.",
    tipCn: "西班牙语中冠词大多数时候是必需的，即使是泛指概念。",
  },
  {
    id: "presente",
    title: "El presente de indicativo",
    titleCn: "现在时",
    level: "A1-A2",
    explanation:
      "El presente expresa acciones habituales, hechos generales y acciones que ocurren ahora. Verbos regulares: -ar (hablo, hablas, habla...), -er (como, comes...), -ir (vivo, vives...). Hay muchos irregulares (tener, ir, hacer, ser, estar).",
    explanationCn:
      "现在时表示习惯性动作、普遍事实和正在发生的动作。规则动词：-ar（hablo, hablas, habla...）、-er（como, comes...）、-ir（vivo, vives...）。还有很多不规则动词（tener、ir、hacer、ser、estar）。",
    examples: [
      {
        es: "Estudio español todos los días.",
        zh: "我每天学西班牙语。",
      },
      {
        es: "¿Qué haces ahora?",
        zh: "你现在在做什么？",
      },
    ],
    commonError: "Olvidar conjugar el verbo según la persona, ya que en chino el verbo no cambia.",
    commonErrorCn: "忘记按人称变位，因为中文动词不变化。",
    tip: "Memoriza las terminaciones -o, -as/-es, -a/-e, -amos/-emos/-imos, -áis/-éis/-ís, -an/-en.",
    tipCn: "背熟词尾：-o, -as/-es, -a/-e, -amos/-emos/-imos, -áis/-éis/-ís, -an/-en。",
  },
  {
    id: "indefinido-imperfecto",
    title: "Pretérito indefinido vs imperfecto",
    titleCn: "简单过去时 与 过去未完成时",
    level: "B1",
    explanation:
      "El indefinido (fui, comí, viví) expresa acciones pasadas terminadas y puntuales. El imperfecto (iba, comía, vivía) describe hábitos del pasado, contextos, descripciones y acciones en desarrollo.",
    explanationCn:
      "简单过去时（fui, comí, viví）表示已完成的、一次性的过去动作。过去未完成时（iba, comía, vivía）描述过去的习惯、背景、描写和进行中的动作。",
    examples: [
      {
        es: "Ayer fui al cine (acción terminada).",
        zh: "昨天我去了电影院（已完成动作）。",
      },
      {
        es: "De niño, iba al parque cada día (hábito).",
        zh: "小时候我每天都去公园（习惯）。",
      },
    ],
    commonError: "Confundir los dos tiempos y usar siempre el indefinido para todo el pasado.",
    commonErrorCn: "混淆这两个时态，把一切过去动作都用简单过去时。",
    tip: "Piensa: ¿acción puntual y terminada? → indefinido. ¿Hábito, descripción o contexto? → imperfecto.",
    tipCn: "想一想：是一次性完成的动作？用简单过去时。是习惯、描写或背景？用过去未完成时。",
  },
  {
    id: "por-para",
    title: "Por vs Para",
    titleCn: "Por 与 Para 的区别",
    level: "A2-B1",
    explanation:
      '"Para" indica finalidad, destino, destinatario u opinión (para qué, hacia dónde). "Por" indica causa, medio, lugar aproximado, duración o intercambio (por qué, a través de).',
    explanationCn:
      "Para 表示目的、目的地、对象或看法（为了什么、去往哪里）。Por 表示原因、方式、大概地点、持续时间或交换（因为、通过）。",
    examples: [
      {
        es: "Estudio español para viajar (finalidad).",
        zh: "我学西班牙语是为了旅行（目的）。",
      },
      {
        es: "Voy a Madrid por tren (medio).",
        zh: "我坐火车去马德里（方式）。",
      },
      {
        es: "Gracias por tu ayuda (causa).",
        zh: "谢谢你的帮助（原因）。",
      },
    ],
    commonError: 'Intercambiar por y para, por ejemplo decir "Estudio por viajar" en lugar de "para viajar".',
    commonErrorCn:
      '把 por 和 para 弄反，例如把"为了旅行而学习"说成 Estudio por viajar，正确是 Estudio para viajar。',
    tip: "Para = destino/finalidad. Por = causa/medio. Pregúntate: ¿por qué? o ¿para qué?",
    tipCn: "Para = 目的/去向。Por = 原因/方式。问自己：为什么？还是为了什么？",
  },
  {
    id: "subjuntivo",
    title: "El subjuntivo: cuándo usarlo",
    titleCn: "虚拟式：什么时候用",
    level: "B1-B2",
    explanation:
      'El subjuntivo se usa después de expresiones de deseo (quiero que...), emoción (me alegro de que...), duda (no creo que...), y tras "cuando/para que" cuando hablamos del futuro o de algo no realizado.',
    explanationCn:
      '虚拟式用于表达愿望（quiero que... 我希望...）、情感（me alegro de que... 我很高兴...）、怀疑（no creo que... 我不认为...）之后，以及"cuando/para que"之后谈论未来或未实现的事情时。',
    examples: [
      {
        es: "Quiero que vengas a mi fiesta.",
        zh: "我希望你来参加我的聚会。",
      },
      {
        es: "Espero que estés bien.",
        zh: "我希望你一切都好。",
      },
      {
        es: "No creo que sea difícil.",
        zh: "我不认为这很难。",
      },
    ],
    commonError:
      'Usar el indicativo en lugar del subjuntivo: "Quiero que vienes" (错误) en lugar de "quiero que vengas".',
    commonErrorCn:
      '该用虚拟式时用了直陈式：把"我希望你来"说成 Quiero que vienes（错误），正确是 Quiero que vengas。',
    tip: 'El subjuntivo suele aparecer en oraciones con dos sujetos diferentes unidas por "que".',
    tipCn: "虚拟式常出现在用 que 连接、且主语不同的句子中。",
  },
  {
    id: "pronunciacion",
    title: "Pronunciación: la erre y otros sonidos",
    titleCn: "发音：大舌音和其他音",
    level: "A1",
    explanation:
      'La "r" simple (pero, cara) se pronuncia con un golpe suave de lengua; la "rr" o "r" inicial (perro, rojo) vibra. La "b" y la "v" suenan igual en español. La "ñ" suena como "ni". La "j/g" suena como una "h" fuerte (jamón).',
    explanationCn:
      '单颤音 r（pero, cara）用舌尖轻弹一下；双颤音 rr 或词首 r（perro, rojo）要颤动。西班牙语中 b 和 v 发音相同。ñ 发"尼"。j/g 发像"h"的重音（jamón 火腿）。',
    examples: [
      {
        es: "perro / pero",
        zh: "狗 / 但是（注意区别）",
      },
      {
        es: "rojo, rápido, carro",
        zh: "红色、快、汽车",
      },
    ],
    commonError: 'No distinguir "pero" (但是) de "perro" (狗), o no vibrar la erre inicial.',
    commonErrorCn: "分不清 pero（但是）和 perro（狗），或词首 r 不颤动。",
    tip: 'Para la erre: repite "td-td-td" rápido; el movimiento de la lengua se parece a la erre vibrante.',
    tipCn: '练大舌音：快速重复"特得-特得-特得"，舌头的动作类似颤音。',
  },
  {
    id: "orden-palabras",
    title: "Orden de palabras y sujeto omitido",
    titleCn: "语序与主语省略",
    level: "A1-A2",
    explanation:
      'El orden normal es Sujeto-Verbo-Objeto, pero es flexible. Como el verbo indica la persona, el sujeto se omite con frecuencia: "Hablo español" (= Yo hablo). El adjetivo suele ir después del sustantivo (una casa grande).',
    explanationCn:
      "正常语序是主-谓-宾，但很灵活。因为动词已经表明人称，主语经常省略：Hablo español（=我说西班牙语）。形容词通常放在名词后面（una casa grande 一座大房子）。",
    examples: [
      {
        es: "Hablo español y vivo en Madrid.",
        zh: "我说西班牙语，住在马德里。",
      },
      {
        es: "Tengo un coche rojo.",
        zh: "我有一辆红色的车。",
      },
    ],
    commonError: "Poner siempre el adjetivo antes del nombre, siguiendo el orden del chino/inglés.",
    commonErrorCn: "总是把形容词放在名词前，受中文/英文语序影响。",
    tip: "En español, el adjetivo después del nombre es lo normal; antes del nombre suele ser enfático o literario.",
    tipCn: "西班牙语中形容词放在名词后是正常语序；放在前面通常是强调或文学用法。",
  },
  {
    id: "falsos-amigos",
    title: "Falsos amigos y palabras engañosas",
    titleCn: "假朋友与易混淆词",
    level: "A2",
    explanation:
      'Algunas palabras españolas se parecen a otras pero significan otra cosa. "Embarazada" no es "avergonzada" sino "怀孕". "Actual" = 当前的 (no "real"). "Asistir" = 参加 (no "ayudar").',
    explanationCn:
      '有些西班牙语单词和别的词很像但意思不同。Embarazada 不是"尴尬"而是"怀孕"。Actual = 当前的（不是"真实的"）。Asistir = 参加（不是"帮助"）。',
    examples: [
      {
        es: "Está embarazada de ocho meses.",
        zh: "她怀孕八个月了。",
      },
      {
        es: "La situación actual es difícil.",
        zh: "当前的情况很困难。",
      },
    ],
    commonError: 'Traducir "embarazada" como "embarrassed" (尴尬) o "actual" como "real".',
    commonErrorCn: '把 embarazada 理解为"尴尬"，或把 actual 理解为"真实的"。',
    tip: "Cuando una palabra se parece a otra de tu idioma, verifica siempre su significado real.",
    tipCn: "当一个单词和你的母语某个词很像时，一定要查证它的真实意思。",
  },
  {
    id: "reflexivos",
    title: "Los verbos reflexivos",
    titleCn: "反身动词",
    level: "A1-A2",
    category: "verbos",
    explanation:
      'Un verbo reflexivo indica que la acción recae sobre el mismo sujeto. Se conjuga con los pronombres me, te, se, nos, os, se: "me levanto, te duchas, se acuesta".',
    explanationCn:
      "反身动词表示动作作用在主语自己身上。用代词 me, te, se, nos, os, se 变位：me levanto（我起床）、te duchas（你洗澡）、se acuesta（他睡觉）。",
    examples: [
      {
        es: "Me levanto a las siete y me ducho.",
        zh: "我七点起床并洗澡。",
      },
      {
        es: "Nos acostamos tarde los sábados.",
        zh: "我们周六很晚才睡。",
      },
    ],
    commonError: 'Olvidar el pronombre: decir "Levanto a las siete" en lugar de "Me levanto a las siete".',
    commonErrorCn: '忘记代词：把"我七点起床"说成 Levanto a las siete，正确是 Me levanto a las siete。',
    tip: "Aprende el verbo con su pronombre juntos: levantarse, ducharse, acostarse.",
    tipCn: "动词和代词一起记：levantarse、ducharse、acostarse。",
    practice: {
      question: "Completa: Yo ___ (levantarse) a las ocho.",
      questionCn: "填空：Yo ___ (levantarse) a las ocho.",
      answer: "me levanto",
      answerCn: "me levanto",
    },
  },
  {
    id: "gustar",
    title: "Gustar y verbos como gustar",
    titleCn: "Gustar 类动词",
    level: "A1-A2",
    category: "verbos",
    explanation:
      '"Gustar" no funciona como "like" en inglés. La cosa que gusta es el sujeto: "Me gusta el café" (= el café me gusta a mí). Con plural: "Me gustan los libros". Otros verbos iguales: encantar, interesar, molestar.',
    explanationCn:
      "Gustar 和英语的 like 用法不同。喜欢的东西是主语：Me gusta el café（咖啡让我喜欢）。复数：Me gustan los libros（书让我喜欢）。同类动词还有 encantar、interesar、molestar。",
    examples: [
      {
        es: "Me gusta la música española.",
        zh: "我喜欢西班牙音乐。",
      },
      {
        es: "Me encantan las películas de terror.",
        zh: "我非常喜欢恐怖电影。",
      },
    ],
    commonError: 'Decir "Yo gusto el café" (错误). La forma correcta es "Me gusta el café".',
    commonErrorCn: '把"我喜欢咖啡"说成 Yo gusto el café（错误），正确是 Me gusta el café。',
    tip: 'Piensa al revés: la cosa "gusta a" la persona. me/te/le + gusta(n) + cosa.',
    tipCn: '反过来想：东西"让"人喜欢。me/te/le + gusta(n) + 东西。',
    practice: {
      question: "Completa: A mí me ___ (gustar) los perros.",
      questionCn: "填空：A mí me ___ (gustar) los perros.",
      answer: "gustan",
      answerCn: "gustan",
    },
  },
  {
    id: "pronombres-objeto",
    title: "Pronombres de objeto directo e indirecto",
    titleCn: "直接/间接宾语代词",
    level: "A2-B1",
    category: "pronombres",
    explanation:
      'Objeto directo: lo, la, los, las (la cosa). Objeto indirecto: me, te, le, nos, os, les (la persona). Combinados: "se lo di" (se = le/les + lo/la).',
    explanationCn:
      "直接宾语：lo, la, los, las（指物）。间接宾语：me, te, le, nos, os, les（指人）。两者连用：se lo di（se 代替 le/les + lo/la）。",
    examples: [
      {
        es: "Compro el libro → Lo compro.",
        zh: "我买这本书 → 我买它。",
      },
      {
        es: "Doy el regalo a Ana → Se lo doy.",
        zh: "我把礼物给安娜 → 我把它给她。",
      },
    ],
    commonError: 'Confundir le y lo: "La veo" (a ella) vs "Le hablo" (a ella).',
    commonErrorCn: "混淆 le 和 lo：La veo（看见她）和 Le hablo（对她说话）。",
    tip: "Lo/la = la cosa (objeto directo). Le/les = la persona (objeto indirecto).",
    tipCn: "lo/la = 物（直接宾语）。le/les = 人（间接宾语）。",
    practice: {
      question: "Sustituye: Veo a María → La ___.",
      questionCn: "替换：Veo a María → La ___.",
      answer: "veo",
      answerCn: "veo",
    },
  },
  {
    id: "imperativo",
    title: "El imperativo",
    titleCn: "命令式",
    level: "A2-B1",
    category: "verbos",
    explanation:
      "El imperativo da órdenes o consejos. Afirmativo (tú): habla, come, vive. Negativo usa subjuntivo: no hables, no comas, no vivas. Irregular: haz, ven, pon, sal, di.",
    explanationCn:
      "命令式用来下命令或给建议。肯定（你）：habla, come, vive。否定用虚拟式：no hables, no comas, no vivas。不规则：haz, ven, pon, sal, di。",
    examples: [
      {
        es: "Habla más despacio, por favor.",
        zh: "请说慢一点。",
      },
      {
        es: "No hables tan alto.",
        zh: "别那么大声说话。",
      },
    ],
    commonError:
      'Usar el infinitivo en lugar del imperativo: "Hablar despacio" en lugar de "Habla despacio".',
    commonErrorCn: '该用命令式时用了动词原形：把"说慢点"说成 Hablar despacio，正确是 Habla despacio。',
    tip: 'El imperativo afirmativo de "tú" suele ser igual a la 3ª persona del presente: habla, come, vive.',
    tipCn: "肯定命令式（你）通常等于现在时第三人称：habla, come, vive。",
    practice: {
      question: 'Imperativo de "comer" (tú, afirmativo): ___.',
      questionCn: "comer 的命令式（你，肯定）：___.",
      answer: "come",
      answerCn: "come",
    },
  },
  {
    id: "perfecto-indefinido",
    title: "Pretérito perfecto vs indefinido",
    titleCn: "现在完成时 vs 简单过去时",
    level: "B1",
    category: "verbos",
    explanation:
      'El pretérito perfecto (he hablado) se usa con acciones del pasado relacionadas con el presente o con marcadores como "hoy, esta semana, ya, todavía". El indefinido (hablé) se usa con acciones terminadas y alejadas: "ayer, el año pasado".',
    explanationCn:
      '现在完成时（he hablado）用于与现在有关或带"hoy, esta semana, ya, todavía"的过去动作。简单过去时（hablé）用于已结束、与现在无关的动作："ayer, el año pasado"。',
    examples: [
      {
        es: "Hoy he comido paella (hoy, presente).",
        zh: "今天（还和现在相关）我吃了海鲜饭。",
      },
      {
        es: "Ayer comí paella (terminado).",
        zh: "昨天我吃了海鲜饭（已结束）。",
      },
    ],
    commonError: 'Usar siempre el indefinido: "Hoy fui al cine" en lugar de "Hoy he ido al cine".',
    commonErrorCn:
      '总是用简单过去时：把"今天去了电影院"说成 Hoy fui al cine，在西班牙常用 Hoy he ido al cine。',
    tip: 'Con "hoy, esta semana, este año, ya, todavía" → perfecto. Con "ayer, la semana pasada, en 2010" → indefinido.',
    tipCn: '带"今天、本周、今年、已经、还"用现在完成时；带"昨天、上周、2010年"用简单过去时。',
    practice: {
      question: "Elige: ___ (He comido / Comí) todavía no.",
      questionCn: "选择：___ (He comido / Comí) todavía no.",
      answer: "He comido",
      answerCn: "He comido",
    },
  },
  {
    id: "futuro",
    title: "El futuro simple",
    titleCn: "简单将来时",
    level: "A2-B1",
    category: "verbos",
    explanation:
      "El futuro simple expresa acciones futuras: hablaré, comerás, vivirá. Se forma añadiendo -é, -ás, -á, -emos, -éis, -án al infinitivo. Irregular: tendré, vendré, haré, diré.",
    explanationCn:
      "简单将来时表示将来动作：hablaré, comerás, vivirá。在动词原形后加 -é, -ás, -á, -emos, -éis, -án。不规则：tendré, vendré, haré, diré。",
    examples: [
      {
        es: "Mañana viajaré a Madrid.",
        zh: "明天我将去马德里。",
      },
      {
        es: "¿Vendrás a la fiesta?",
        zh: "你会来参加聚会吗？",
      },
    ],
    commonError: 'Usar solo "ir a" para todo; el futuro simple también se usa para hipótesis y promesas.',
    commonErrorCn: "什么都用 ir a；简单将来时也用于推测和承诺。",
    tip: 'Para planes cercanos usa "voy a + infinitivo"; para predicciones y promesas, futuro simple.',
    tipCn: "近期计划用 voy a + 原形；预测和承诺用简单将来时。",
    practice: {
      question: 'Futuro de "yo tener": ___.',
      questionCn: "yo tener 的将来时：___.",
      answer: "tendré",
      answerCn: "tendré",
    },
  },
  {
    id: "condicional",
    title: "El condicional",
    titleCn: "条件式",
    level: "B1-B2",
    category: "verbos",
    explanation:
      'El condicional (hablaría, comería) expresa deseos, cortesía y consejos: "Me gustaría...", "¿Podría...?". También se usa en oraciones condicionales: "Si tuviera dinero, viajaría".',
    explanationCn:
      '条件式（hablaría, comería）表示愿望、礼貌和建议："Me gustaría...（我想...）"、"¿Podría...?（能...吗？）"。也用于条件句："Si tuviera dinero, viajaría（如果我有钱，就会去旅行）"。',
    examples: [
      {
        es: "Me gustaría un café, por favor.",
        zh: "我想要一杯咖啡，谢谢。",
      },
      {
        es: "¿Podría ayudarme?",
        zh: "您能帮我吗？",
      },
    ],
    commonError:
      'Usar el presente en lugar del condicional para ser cortés: "Quiero un café" es más brusco que "Querría/Me gustaría un café".',
    commonErrorCn: '表示礼貌时用现在时而非条件式："Quiero un café" 比 "Querría/Me gustaría un café" 更生硬。',
    tip: 'Usa "me gustaría" y "¿podría...?" para pedir cosas con educación.',
    tipCn: "用 me gustaría 和 ¿podría...? 礼貌地请求。",
    practice: {
      question: 'Condicional de "yo poder": ___.',
      questionCn: "yo poder 的条件式：___.",
      answer: "podría",
      answerCn: "podría",
    },
  },
  {
    id: "gerundio",
    title: "Estar + gerundio",
    titleCn: "进行时",
    level: "A2",
    category: "verbos",
    explanation:
      '"Estar + gerundio" expresa una acción en desarrollo ahora: estoy hablando, estoy comiendo. Gerundio: -ar → -ando (hablando), -er/-ir → -iendo (comiendo, viviendo).',
    explanationCn:
      "Estar + 副动词表示正在进行的动作：estoy hablando（我正在说话）。副动词：-ar → -ando（hablando），-er/-ir → -iendo（comiendo, viviendo）。",
    examples: [
      {
        es: "Estoy estudiando español ahora.",
        zh: "我现在正在学西班牙语。",
      },
      {
        es: "¿Qué estás haciendo?",
        zh: "你正在做什么？",
      },
    ],
    commonError:
      'Usar el presente simple para la acción en curso: "Estudio ahora" en lugar de "Estoy estudiando ahora".',
    commonErrorCn:
      '用一般现在时表示正在进行的动作：把"我现在正在学习"说成 Estudio ahora，更自然的是 Estoy estudiando ahora。',
    tip: "Recuerda: estar (conjugado) + gerundio. El gerundio nunca cambia.",
    tipCn: "记住：estar（变位）+ 副动词。副动词本身不变。",
    practice: {
      question: 'Gerundio de "escribir": ___.',
      questionCn: "escribir 的副动词：___.",
      answer: "escribiendo",
      answerCn: "escribiendo",
    },
  },
  {
    id: "comparativos",
    title: "Comparativos y superlativos",
    titleCn: "比较级与最高级",
    level: "A2",
    category: "sintaxis",
    explanation:
      "Comparativo: más/menos + adjetivo + que (más alto que). Irregular: mejor, peor, mayor, menor. Superlativo: el/la más + adjetivo (el más alto).",
    explanationCn:
      "比较级：más/menos + 形容词 + que（más alto que 比...高）。不规则：mejor 更好、peor 更差、mayor 更大、menor 更小。最高级：el/la más + 形容词（el más alto 最高的）。",
    examples: [
      {
        es: "Mi hermano es más alto que yo.",
        zh: "我哥哥比我高。",
      },
      {
        es: "Esta es la mejor pizza de la ciudad.",
        zh: "这是城里最好的披萨。",
      },
    ],
    commonError: 'Decir "más mejor" (错误). "Mejor" ya es comparativo.',
    commonErrorCn: "说 más mejor（错误）。mejor 本身就是比较级。",
    tip: 'No combines "más" con mejor/peor/mayor/menor: son irregulares y ya incluyen la comparación.',
    tipCn: "不要把 más 和 mejor/peor/mayor/menor 连用，它们本身已含比较义。",
    practice: {
      question: "Completa: Este coche es ___ (más bueno / mejor) que aquel.",
      questionCn: "填空：Este coche es ___ (más bueno / mejor) que aquel.",
      answer: "mejor",
      answerCn: "mejor",
    },
  },
  {
    id: "preposiciones",
    title: "Preposiciones esenciales",
    titleCn: "基本介词",
    level: "A1-A2",
    category: "preposiciones",
    explanation:
      "A (dirección, hora, destino): voy a casa. En (lugar, tiempo): vivo en Madrid. De (origen, posesión): soy de China. Con (compañía, instrumento): con mi amigo. Sin: sin azúcar.",
    explanationCn:
      "A（方向、时间、目的地）：voy a casa 我回家。En（地点、时间）：vivo en Madrid 我住在马德里。De（来源、所属）：soy de China 我来自中国。Con（陪伴、工具）：con mi amigo 和朋友。Sin：sin azúcar 不加糖。",
    examples: [
      {
        es: "Voy a la escuela en autobús.",
        zh: "我坐公交车去学校。",
      },
      {
        es: "El libro de Juan está con mis cosas.",
        zh: "胡安的书和我的东西在一起。",
      },
    ],
    commonError: 'Confundir "a" y "en": "Voy en Madrid" (错误) en lugar de "Voy a Madrid".',
    commonErrorCn: '混淆 a 和 en：把"我去马德里"说成 Voy en Madrid（错误），正确是 Voy a Madrid。',
    tip: 'Con verbos de movimiento (ir, viajar) usa "a" para el destino.',
    tipCn: "移动动词（ir、viajar）的目的地用 a。",
    practice: {
      question: "Completa: Voy ___ (a / en) Barcelona mañana.",
      questionCn: "填空：Voy ___ (a / en) Barcelona mañana.",
      answer: "a",
      answerCn: "a",
    },
  },
  {
    id: "genero-dificil",
    title: "El género de palabras difíciles",
    titleCn: "难词性别",
    level: "B1",
    category: "sustantivos",
    explanation:
      "La mayoría de palabras en -o son masculinas y en -a femeninas, pero hay excepciones: el día, el mapa, el problema, el tema (masculinos); la mano, la foto, la moto (femeninos). Las palabras en -ma de origen griego suelen ser masculinas.",
    explanationCn:
      "大多数 -o 结尾是阳性，-a 是阴性，但有例外：el día 天、el mapa 地图、el problema 问题、el tema 主题（阳性）；la mano 手、la foto 照片、la moto 摩托车（阴性）。希腊语来源的 -ma 词通常是阳性。",
    examples: [
      {
        es: "El problema es difícil.",
        zh: "这个问题很难。",
      },
      {
        es: "La mano está fría.",
        zh: "手很冷。",
      },
    ],
    commonError: 'Decir "la problema" o "el mano" por generalizar la regla -a/-o.',
    commonErrorCn: "把规则一刀切，说成 la problema 或 el mano。",
    tip: "Aprende las excepciones como mini-lista: el día, el mapa, el problema, el tema, la mano, la foto, la moto.",
    tipCn: "把例外当小清单记：el día, el mapa, el problema, el tema, la mano, la foto, la moto。",
    practice: {
      question: "Elige: ___ (El / La) tema de hoy es interesante.",
      questionCn: "选择：___ (El / La) tema de hoy es interesante.",
      answer: "El",
      answerCn: "El",
    },
  },
  {
    id: "conectores-discurso",
    title: "Conectores del discurso",
    titleCn: "篇章连接词",
    level: "B1-B2",
    category: "conectores",
    explanation:
      "Los conectores estructuran un texto: añadir (además, asimismo), contrastar (sin embargo, no obstante), causar (por eso, por tanto), ordenar (en primer lugar, por último), concluir (en conclusión, en definitiva).",
    explanationCn:
      "连接词组织文章：添加（además 此外、asimismo 同样）、转折（sin embargo 然而、no obstante 尽管如此）、因果（por eso 因此、por tanto 所以）、顺序（en primer lugar 首先、por último 最后）、总结（en conclusión 总之、en definitiva 归根结底）。",
    examples: [
      {
        es: "Me gusta viajar; sin embargo, no tengo tiempo.",
        zh: "我喜欢旅行；然而我没有时间。",
      },
      {
        es: "En primer lugar, el cambio climático. Por último, la pobreza.",
        zh: "首先是气候变化。最后是贫困。",
      },
    ],
    commonError:
      'Repetir siempre "y, pero, porque" en la escritura; usar pocos conectores en textos formales.',
    commonErrorCn: "写作时总是重复 y、pero、porque，正式文章里连接词太少。",
    tip: "En la escritura del DELE, usa conectores variados para subir la nota de coherencia.",
    tipCn: "DELE 写作中多用变化的连接词，能提高连贯性得分。",
    practice: {
      question: "Elige: Llueve mucho; ___ (sin embargo / por eso) llevo paraguas.",
      questionCn: "选择：Llueve mucho; ___ (sin embargo / por eso) llevo paraguas.",
      answer: "por eso",
      answerCn: "por eso",
    },
  },
];
export { GRAMMAR_TOPICS };
