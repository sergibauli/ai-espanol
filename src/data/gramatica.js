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
  // Temas B2 (generados con DeepSeek y revisados)
  {
    "id": "imperfecto-subjuntivo",
    "title": "El imperfecto de subjuntivo",
    "titleCn": "虚拟式过去未完成时",
    "level": "B2",
    "category": "subjuntivo",
    "explanation": "El imperfecto de subjuntivo se forma a partir de la tercera persona del plural del pretérito indefinido: hablaron → hablara/hablase. Se usa en oraciones subordinadas cuando el verbo principal está en pasado o condicional, para expresar deseos, dudas, emociones o acciones no reales: Quería que vinieras. También aparece en condicionales irreales (Si tuviera dinero, viajaría) y en fórmulas de cortesía (Quisiera pedirle un favor).",
    "explanationCn": "虚拟式过去未完成时由简单过去时第三人称复数词干构成：hablaron → hablara/hablase。当主句动词是过去时或条件式时，从句用它表示愿望、怀疑、情感或非现实动作：Quería que vinieras（我希望你来）。也用于非现实条件句（Si tuviera dinero, viajaría）和礼貌表达（Quisiera pedirle un favor）。",
    "examples": [
      {
        "es": "Si tuviera tiempo, estudiaría más.",
        "zh": "如果我有时间，我会学得更多。"
      },
      {
        "es": "Me pidió que le enviara el informe.",
        "zh": "他让我把报告发给他。"
      },
      {
        "es": "Ojalá lloviera mañana.",
        "zh": "但愿明天下雨。"
      },
      {
        "es": "Quisiera hacerle una pregunta.",
        "zh": "我想问您一个问题。"
      }
    ],
    "commonError": "Usar el presente de subjuntivo tras un verbo en pasado: *Me pidió que le envíe el informe.",
    "commonErrorCn": "主句是过去时却用现在虚拟式：*Me pidió que le envíe el informe。",
    "tip": "Memoriza la regla: pasado/condicional en la principal → imperfecto de subjuntivo en la subordinada.",
    "tipCn": "记住规则：主句用过去时或条件式 → 从句用虚拟式过去未完成时。",
    "practice": {
      "question": "Completa: Si ___ (tener) más dinero, compraría una casa.",
      "questionCn": "填空：Si ___ (tener) más dinero, compraría una casa.",
      "answer": "tuviera",
      "answerCn": "tuviera"
    }
  },
  {
    "id": "condicionales-irreales",
    "title": "Oraciones condicionales irreales",
    "titleCn": "非现实条件句",
    "level": "B2",
    "category": "oraciones",
    "explanation": "Las condicionales irreales expresan situaciones hipotéticas que no se cumplen. Hay dos tipos: si + imperfecto de subjuntivo + condicional simple (hipótesis presente/futura): Si estudiaras, aprobarías; y si + pluscuamperfecto de subjuntivo + condicional compuesto (hipótesis pasada): Si hubieras estudiado, habrías aprobado. También se usan para dar consejos o expresar deseos de forma atenuada.",
    "explanationCn": "非现实条件句表达不成立的假设。两种类型：si + 虚拟式过去未完成时 + 简单条件式（现在/将来假设）：Si estudiaras, aprobarías（如果你学习，就会通过）；si + 虚拟式过去完成时 + 复合条件式（过去假设）：Si hubieras estudiado, habrías aprobado（如果你当时学习了，就会通过）。也用于委婉建议或愿望。",
    "examples": [
      {
        "es": "Si fuera rico, viajaría por todo el mundo.",
        "zh": "如果我是富人，我会环游世界。"
      },
      {
        "es": "Si hubieras venido, te habrías divertido.",
        "zh": "如果你来了，你会玩得很开心。"
      },
      {
        "es": "Si yo fuera tú, hablaría con ella.",
        "zh": "如果我是你，我会和她谈谈。"
      },
      {
        "es": "Si hubiéramos salido antes, no habríamos perdido el tren.",
        "zh": "如果我们早点出发，就不会错过火车了。"
      }
    ],
    "commonError": "Usar el condicional en la prótasis: *Si tendría dinero, viajaría.",
    "commonErrorCn": "在条件从句中用条件式：*Si tendría dinero, viajaría。",
    "tip": "Nunca uses el condicional después de si; usa imperfecto o pluscuamperfecto de subjuntivo.",
    "tipCn": "si 后面永远不用条件式；用虚拟式过去未完成时或过去完成时。",
    "practice": {
      "question": "Completa: Si ___ (saber) la respuesta, te la diría.",
      "questionCn": "填空：Si ___ (saber) la respuesta, te la diría.",
      "answer": "supiera",
      "answerCn": "supiera"
    }
  },
  {
    "id": "estilo-indirecto",
    "title": "Estilo indirecto y correlación de tiempos",
    "titleCn": "间接引语与时态呼应",
    "level": "B2",
    "category": "discurso",
    "explanation": "El estilo indirecto reproduce palabras ajenas con verbos como decir, preguntar, pedir. Si el verbo introductor está en presente, los tiempos no cambian; si está en pasado, se produce una correlación: presente → imperfecto, pretérito → pluscuamperfecto, futuro → condicional. También cambian pronombres, posesivos y marcadores temporales (hoy → ese día, mañana → al día siguiente).",
    "explanationCn": "间接引语用 decir、preguntar、pedir 等动词转述他人的话。若引导动词是现在时，时态不变；若是过去时，则需时态呼应：现在时 → 过去未完成时，简单过去时 → 过去完成时，将来时 → 条件式。代词、物主代词和时间标记也要改变（hoy → ese día，mañana → al día siguiente）。",
    "examples": [
      {
        "es": "«Estoy cansado» → Dijo que estaba cansado.",
        "zh": "“我累了” → 他说他累了。"
      },
      {
        "es": "«Vendré mañana» → Prometió que vendría al día siguiente.",
        "zh": "“我明天来” → 他答应第二天来。"
      },
      {
        "es": "«¿Dónde vives?» → Me preguntó dónde vivía.",
        "zh": "“你住哪儿？” → 他问我住哪儿。"
      },
      {
        "es": "«Ya he terminado» → Comentó que ya había terminado.",
        "zh": "“我已经完成了” → 他说他已经完成了。"
      }
    ],
    "commonError": "No cambiar los tiempos cuando el verbo introductor está en pasado: *Dijo que está cansado.",
    "commonErrorCn": "引导动词是过去时却不改变时态：*Dijo que está cansado。",
    "tip": "Haz una tabla de equivalencias: presente→imperfecto, pretérito→pluscuamperfecto, futuro→condicional.",
    "tipCn": "做一张时态对应表：现在时→过去未完成时，简单过去时→过去完成时，将来时→条件式。",
    "practice": {
      "question": "Transforma: «Iré contigo» → Ella dijo que ___ conmigo.",
      "questionCn": "转换：«Iré contigo» → Ella dijo que ___ conmigo.",
      "answer": "iría",
      "answerCn": "iría"
    }
  },
  {
    "id": "pasiva-y-pasiva-refleja",
    "title": "La voz pasiva y la pasiva refleja",
    "titleCn": "被动语态与自复被动",
    "level": "B2",
    "category": "voz",
    "explanation": "La voz pasiva se forma con ser + participio + por: El libro fue escrito por Cervantes. La pasiva refleja usa se + verbo en tercera persona: Se venden pisos. La pasiva refleja es más frecuente en español oral y escrito, sobre todo con cosas. El agente no se expresa con se. La concordancia en la pasiva refleja es con el sujeto: Se vende casa / Se venden casas.",
    "explanationCn": "被动语态由 ser + 过去分词 + por 构成：El libro fue escrito por Cervantes。自复被动用 se + 第三人称动词：Se venden pisos（出售公寓）。自复被动在西班牙语口语和书面语中更常用，尤其涉及事物。se 结构不表达施动者。自复被动要与主语一致：Se vende casa / Se venden casas。",
    "examples": [
      {
        "es": "La novela fue publicada en 1980.",
        "zh": "这部小说于1980年出版。"
      },
      {
        "es": "Se venden entradas en la taquilla.",
        "zh": "售票处有票出售。"
      },
      {
        "es": "El edificio será construido por una empresa china.",
        "zh": "这座大楼将由一家中国公司建造。"
      },
      {
        "es": "Se habla español en muchos países.",
        "zh": "许多国家讲西班牙语。"
      }
    ],
    "commonError": "Usar se + verbo en singular con sujeto plural: *Se vende pisos.",
    "commonErrorCn": "主语复数却用 se + 单数动词：*Se vende pisos。",
    "tip": "Con cosas, prefiere la pasiva refleja (se vende); reserva ser + participio para textos formales o cuando menciones el agente.",
    "tipCn": "涉及事物时优先用自复被动（se vende）；ser + 过去分词用于正式文本或需要指出施动者时。",
    "practice": {
      "question": "Elige: ___ (Se vende / Se venden) coches usados.",
      "questionCn": "选择：___ (Se vende / Se venden) coches usados.",
      "answer": "Se venden",
      "answerCn": "Se venden"
    }
  },
  {
    "id": "usos-de-se",
    "title": "Los usos de se",
    "titleCn": "se 的用法",
    "level": "B2",
    "category": "pronombres",
    "explanation": "El pronombre se tiene varios valores: reflexivo (María se lava), recíproco (Se quieren), dativo de interés (Se comió toda la tarta), pasiva refleja (Se construyen casas), impersonal (Se come bien aquí), pronominal (Se arrepintió), y como sustituto de le/les ante lo/la/los/las (Se lo di). Identificar el uso ayuda a evitar errores de concordancia y de pronombres.",
    "explanationCn": "代词 se 有多种用法：反身（María se lava）、相互（Se quieren）、利益与格（Se comió toda la tarta）、自复被动（Se construyen casas）、无人称（Se come bien aquí）、代词化（Se arrepintió），以及在 lo/la/los/las 前代替 le/les（Se lo di）。辨别用法有助于避免一致性和代词错误。",
    "examples": [
      {
        "es": "Se lo dije ayer.",
        "zh": "我昨天告诉了他。"
      },
      {
        "es": "Se come muy bien en ese restaurante.",
        "zh": "那家餐厅吃得很好。"
      },
      {
        "es": "Ana y Luis se escriben correos.",
        "zh": "安娜和路易斯互相写邮件。"
      },
      {
        "es": "Se mudó a otra ciudad.",
        "zh": "他搬到了另一个城市。"
      }
    ],
    "commonError": "Decir *Le lo dije en lugar de Se lo dije.",
    "commonErrorCn": "说成 *Le lo dije 而不是 Se lo dije。",
    "tip": "Cuando coinciden le/les + lo/la/los/las, el primer pronombre se convierte en se.",
    "tipCn": "当 le/les 与 lo/la/los/las 同时出现时，第一个代词变成 se。",
    "practice": {
      "question": "Completa: ___ (Le / Se) lo expliqué todo.",
      "questionCn": "填空：___ (Le / Se) lo expliqué todo.",
      "answer": "Se",
      "answerCn": "Se"
    }
  },
  {
    "id": "oraciones-relativo",
    "title": "Las oraciones de relativo",
    "titleCn": "关系从句",
    "level": "B2",
    "category": "oraciones",
    "explanation": "Las oraciones de relativo modifican un antecedente con que, quien, el cual, cuyo o donde. Que es el más común; quien se usa con personas tras preposición; el cual/la cual concuerda en género y número y suele aparecer tras preposición o en estilo formal; cuyo indica posesión y concuerda con lo poseído; donde se refiere a lugares. El modo (indicativo/subjuntivo) depende de si el antecedente es conocido o no.",
    "explanationCn": "关系从句用 que、quien、el cual、cuyo 或 donde 修饰先行词。que 最常用；quien 用于介词后指人；el cual/la cual 与先行词性数一致，多用于介词后或正式文体；cuyo 表示所属，与所拥有之物一致；donde 指地点。式（陈述式/虚拟式）取决于先行词是否确定。",
    "examples": [
      {
        "es": "El libro que leí es interesante.",
        "zh": "我读的那本书很有意思。"
      },
      {
        "es": "La persona con quien hablé era muy amable.",
        "zh": "和我说话的人非常友好。"
      },
      {
        "es": "El autor cuyo libro ganó el premio es joven.",
        "zh": "其书获奖的那位作者很年轻。"
      },
      {
        "es": "La ciudad donde nací es pequeña.",
        "zh": "我出生的城市很小。"
      }
    ],
    "commonError": "Usar que en lugar de cuyo: *El autor que su libro ganó el premio.",
    "commonErrorCn": "用 que 代替 cuyo：*El autor que su libro ganó el premio。",
    "tip": "Con preposición y persona, usa quien o el cual; para posesión, cuyo concuerda con el sustantivo poseído.",
    "tipCn": "介词后指人用 quien 或 el cual；表示所属用 cuyo，与所拥有的名词一致。",
    "practice": {
      "question": "Completa: La chica ___ (que / cuyo) padre es médico estudia conmigo.",
      "questionCn": "填空：La chica ___ (que / cuyo) padre es médico estudia conmigo.",
      "answer": "cuyo",
      "answerCn": "cuyo"
    }
  },
  {
    "id": "subjuntivo-temporales",
    "title": "Subjuntivo en oraciones temporales",
    "titleCn": "时间从句中的虚拟式",
    "level": "B2",
    "category": "subjuntivo",
    "explanation": "Las oraciones temporales con cuando, en cuanto, antes de que, hasta que, mientras usan subjuntivo cuando expresan futuro o acción no realizada: Cuando llegues, avísame. Si expresan hábito o pasado, usan indicativo: Cuando llego a casa, ceno. Antes de que siempre lleva subjuntivo. Después de que puede llevar indicativo o subjuntivo según el tiempo.",
    "explanationCn": "时间从句由 cuando、en cuanto、antes de que、hasta que、mientras 引导，表达将来或未完成的动作时用虚拟式：Cuando llegues, avísame（你到了告诉我）。表达习惯或过去时用陈述式：Cuando llego a casa, ceno。antes de que 总是接虚拟式。después de que 根据时态可用陈述式或虚拟式。",
    "examples": [
      {
        "es": "Cuando termines, llámame.",
        "zh": "你完成后给我打电话。"
      },
      {
        "es": "En cuanto llegue, te aviso.",
        "zh": "他一到我就通知你。"
      },
      {
        "es": "Antes de que te vayas, dime la verdad.",
        "zh": "你走之前，告诉我真相。"
      },
      {
        "es": "Cuando era niño, jugaba en la calle.",
        "zh": "我小时候在街上玩。"
      }
    ],
    "commonError": "Usar indicativo para futuro: *Cuando terminas, llámame.",
    "commonErrorCn": "将来动作却用陈述式：*Cuando terminas, llámame。",
    "tip": "Si la acción temporal es futura o no realizada, usa subjuntivo; si es habitual o pasada, indicativo.",
    "tipCn": "时间动作是将来或未实现时用虚拟式；是习惯或过去时用陈述式。",
    "practice": {
      "question": "Completa: En cuanto ___ (llegar) a casa, te llamo.",
      "questionCn": "填空：En cuanto ___ (llegar) a casa, te llamo.",
      "answer": "llegue",
      "answerCn": "llegue"
    }
  },
  {
    "id": "concesivas",
    "title": "Oraciones concesivas",
    "titleCn": "让步从句",
    "level": "B2",
    "category": "oraciones",
    "explanation": "Las concesivas expresan una dificultad que no impide la acción principal: aunque, a pesar de que, por mucho que, si bien. Aunque puede llevar indicativo (hecho real) o subjuntivo (hipótesis): Aunque llueve, salgo / Aunque llueva, saldré. A pesar de que suele ir con indicativo; por mucho que + subjuntivo expresa insistencia. También existen conectores como aun así.",
    "explanationCn": "让步从句表达不阻碍主句动作的困难：aunque、a pesar de que、por mucho que、si bien。aunque 可接陈述式（事实）或虚拟式（假设）：Aunque llueve, salgo / Aunque llueva, saldré。a pesar de que 多接陈述式；por mucho que + 虚拟式表示强调。还有 aun así 等连接词。",
    "examples": [
      {
        "es": "Aunque está cansado, sigue trabajando.",
        "zh": "尽管他累了，他仍继续工作。"
      },
      {
        "es": "Aunque llueva, iremos al parque.",
        "zh": "即使下雨，我们也要去公园。"
      },
      {
        "es": "A pesar de que estudió mucho, no aprobó.",
        "zh": "尽管他学了很多，还是没通过。"
      },
      {
        "es": "Por mucho que insistas, no cambiaré de opinión.",
        "zh": "无论你怎么坚持，我都不会改变主意。"
      }
    ],
    "commonError": "Usar siempre indicativo con aunque en contextos hipotéticos: *Aunque llueve mañana, saldremos.",
    "commonErrorCn": "在假设语境中 aunque 总用陈述式：*Aunque llueve mañana, saldremos。",
    "tip": "Indicativo = hecho real; subjuntivo = hipótesis o futuro. Por mucho que siempre pide subjuntivo.",
    "tipCn": "陈述式 = 真实事实；虚拟式 = 假设或将来。por mucho que 总是接虚拟式。",
    "practice": {
      "question": "Completa: Aunque ___ (tener) dinero, no lo gastaría.",
      "questionCn": "填空：Aunque ___ (tener) dinero, no lo gastaría.",
      "answer": "tuviera",
      "answerCn": "tuviera"
    }
  },
  {
    "id": "perifrasis-verbales",
    "title": "Perífrasis verbales de uso frecuente",
    "titleCn": "常用动词短语",
    "level": "B2",
    "category": "verbos",
    "explanation": "Las perífrasis verbales combinan un verbo auxiliar con infinitivo, gerundio o participio. Llevar + gerundio indica duración: Llevo dos años estudiando. Acabar de + infinitivo expresa pasado inmediato: Acabo de llegar. Volver a + infinitivo indica repetición: Volvió a llamar. Dejar de + infinitivo significa cesar: Dejó de fumar. Ponerse a + infinitivo indica inicio: Se puso a llorar.",
    "explanationCn": "动词短语由助动词加不定式、副动词或分词构成。llevar + 副动词表示持续：Llevo dos años estudiando（我学了两年了）。acabar de + 不定式表示刚过去：Acabo de llegar（我刚到）。volver a + 不定式表示重复：Volvió a llamar（他又打电话了）。dejar de + 不定式表示停止：Dejó de fumar（他戒烟了）。ponerse a + 不定式表示开始：Se puso a llorar（他哭了起来）。",
    "examples": [
      {
        "es": "Llevo tres horas esperando.",
        "zh": "我已经等了三个小时。"
      },
      {
        "es": "Acabo de terminar el examen.",
        "zh": "我刚考完试。"
      },
      {
        "es": "Volvió a olvidar las llaves.",
        "zh": "他又忘了钥匙。"
      },
      {
        "es": "Se puso a estudiar a las ocho.",
        "zh": "他八点开始学习。"
      }
    ],
    "commonError": "Decir *Llevo tres horas espero en lugar de Llevo tres horas esperando.",
    "commonErrorCn": "说成 *Llevo tres horas espero 而不是 Llevo tres horas esperando。",
    "tip": "Memoriza la estructura: llevar + tiempo + gerundio; acabar de + infinitivo; volver a + infinitivo.",
    "tipCn": "记住结构：llevar + 时间 + 副动词；acabar de + 不定式；volver a + 不定式。",
    "practice": {
      "question": "Completa: ___ (Acabar) de salir; no está en casa.",
      "questionCn": "填空：___ (Acabar) de salir; no está en casa.",
      "answer": "Acaba",
      "answerCn": "Acaba"
    }
  },
  {
    "id": "futuro-perfecto-condicional-compuesto",
    "title": "Futuro perfecto y condicional compuesto para hipótesis",
    "titleCn": "将来完成时与复合条件式表示推测",
    "level": "B2",
    "category": "tiempos",
    "explanation": "El futuro perfecto (habrá + participio) y el condicional compuesto (habría + participio) expresan hipótesis sobre el pasado. Futuro perfecto: suposición de algo ya ocurrido: Habrá llegado ya. Condicional compuesto: hipótesis no realizada o consecuencia de una condición pasada: Habría venido, pero estaba enfermo. También se usan para conjeturas: ¿Dónde estará? / ¿Qué habrá pasado?",
    "explanationCn": "将来完成时（habrá + 过去分词）和复合条件式（habría + 过去分词）表示对过去的推测。将来完成时：对已发生事情的猜测：Habrá llegado ya（他应该已经到了）。复合条件式：未实现的假设或过去条件的结果：Habría venido, pero estaba enfermo（他本来会来的，但病了）。也用于猜测：¿Dónde estará? / ¿Qué habrá pasado?",
    "examples": [
      {
        "es": "A estas horas ya habrá terminado.",
        "zh": "这个时间他应该已经完成了。"
      },
      {
        "es": "Habría ido a la fiesta, pero no me invitaron.",
        "zh": "我本来会去派对的，但他们没邀请我。"
      },
      {
        "es": "¿Qué habrá pasado? No contesta.",
        "zh": "会发生什么事呢？他不接电话。"
      },
      {
        "es": "Yo habría dicho otra cosa.",
        "zh": "我本来会说别的。"
      }
    ],
    "commonError": "Confundir el condicional simple con el compuesto para pasado: *Habría venido si me lo pides (por hubiera/hubiese pedido).",
    "commonErrorCn": "过去假设中误用简单条件式代替复合条件式：*Habría venido si me lo pides（应为 hubiera/hubiese pedido）。",
    "tip": "Futuro perfecto = conjetura sobre el pasado; condicional compuesto = hipótesis no realizada en el pasado.",
    "tipCn": "将来完成时 = 对过去的猜测；复合条件式 = 过去未实现的假设。",
    "practice": {
      "question": "Completa: No sé dónde está; ___ (haber) salido temprano.",
      "questionCn": "填空：No sé dónde está; ___ (haber) salido temprano.",
      "answer": "habrá",
      "answerCn": "habrá"
    }
  },
];
export { GRAMMAR_TOPICS };
