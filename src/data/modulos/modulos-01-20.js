const MODULOS_01_20 = [
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
    teoria: [
      {
        id: "t1",
        titulo: "Saludos según la hora del día",
        tituloChino: "根据一天中的时间问候",
        descripcion: `En español usamos diferentes saludos según el momento del día:

• Buenos días = De la mañana hasta el mediodía (aprox. 12:00)
• Buenas tardes = Desde el mediodía hasta el anochecer
• Buenas noches = Por la noche (también para despedirse)

En España, la gente suele ser muy educada con los saludos. Es normal saludar a desconocidos en lugares como ascensores o tiendas pequeñas.

📌 NOTA IMPORTANTE:
- "Buenos días" se usa desde que te levantas hasta las 12:00 aproximadamente.
- "Buenas tardes" se usa desde las 12:00 hasta que anochece (alrededor de las 20:00-21:00).
- "Buenas noches" se usa cuando ya es de noche, y también para despedirse si es tarde.

❌ ERROR COMÚN:
Muchos estudiantes dicen "Buenas noches" para despedirse durante el día. ¡No lo hagas! Usa "Buenas noches" solo cuando ya es de noche o cuando te vas a dormir.`,
        descripcionChino: `在西班牙语中，我们根据一天中的不同时间使用不同的问候语：

• Buenos días = 从早上到中午（大约12:00）
• Buenas tardes = 从中午到傍晚
• Buenas noches = 晚上（也用于告别）

在西班牙，人们通常很有礼貌地打招呼。在电梯或小商店等地方向陌生人打招呼是很正常的。

📌 重要提示：
- "Buenos días" 从起床到大约12:00使用。
- "Buenas tardes" 从12:00到天黑（大约20:00-21:00）使用。
- "Buenas noches" 在天黑后使用，如果很晚了也可以用于告别。

❌ 常见错误：
很多学生在白天告别时说"Buenas noches"。不要这样做！只有在晚上或要去睡觉时才用"Buenas noches"。`,
        ejemplos: [
          {
            espanol: "Buenos días, ¿cómo estás?",
            chino: "早上好，你好吗？",
          },
          {
            espanol: "Buenas tardes, señor García.",
            chino: "下午好，加西亚先生。",
          },
          {
            espanol: "Buenas noches, familia.",
            chino: "晚上好，家人们。",
          },
          {
            espanol: "Buenos días a todos, ¿cómo amanecieron?",
            chino: "大家早上好，你们醒来怎么样？",
          },
          {
            espanol: "Buenas tardes, ¿qué tal el trabajo?",
            chino: "下午好，工作怎么样？",
          },
          {
            espanol: "Buenas noches, que descanses.",
            chino: "晚安，好好休息。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Despedidas comunes",
        tituloChino: "常见告别语",
        descripcion: `Las despedidas varían según el tiempo hasta el próximo encuentro:

• Adiós = Despedida general (formal e informal)
• Hasta luego = Nos veremos pronto (el más común en España)
• Hasta mañana = Nos veremos mañana
• Hasta pronto = Nos veremos pronto (sin fecha fija)
• Hasta la vista = Hasta la próxima (un poco anticuado, pero se entiende)
• Nos vemos = Nos veremos (informal)
• Chao / Chau = Muy informal, similar al italiano "ciao"
• Hasta nunca = ¡Cuidado! Significa que no quieres volver a ver a alguien
• Me voy = Me marcho (informal, para avisar que te vas)
• Cuídate = ¡Que te vaya bien! (cariñoso)

📊 TABLA DE FRECUENCIA (España):
1. Hasta luego → 80% de las situaciones
2. Adiós → 50% (formal o cuando no sabes cuándo volverás)
3. Chao → 30% (entre jóvenes y amigos)
4. Nos vemos → 40% (informal)

💡 CONSEJO: Si no sabes cuál usar, "Hasta luego" es siempre una opción segura.`,
        descripcionChino: `告别语根据下次见面时间的长短而变化：

• Adiós = 通用告别语（正式和非正式）
• Hasta luego = 回头见（很快会再见）- 西班牙最常见
• Hasta mañana = 明天见
• Hasta pronto = 很快见（没有固定日期）
• Hasta la vista = 下次见（有点过时，但能理解）
• Nos vemos = 再见（非正式）
• Chao / Chau = 拜拜（非常非正式）
• Hasta nunca = 小心！意思是再也不想见到某人
• Me voy = 我走了（非正式，用于告知你要离开）
• Cuídate = 保重（亲切的）

📊 频率表（西班牙）：
1. Hasta luego → 80% 的情况
2. Adiós → 50%（正式或不知道何时再见）
3. Chao → 30%（年轻人之间和朋友之间）
4. Nos vemos → 40%（非正式）

💡 建议：如果你不知道该用哪个，"Hasta luego" 总是安全的选择。`,
        ejemplos: [
          {
            espanol: "Hasta luego, nos vemos pronto.",
            chino: "回头见，很快见。",
          },
          {
            espanol: "Hasta mañana, que descanses.",
            chino: "明天见，好好休息。",
          },
          {
            espanol: "Adiós, cuídate mucho.",
            chino: "再见，保重。",
          },
          {
            espanol: "¡Chao! Nos vemos en clase.",
            chino: "拜拜！课堂上见。",
          },
          {
            espanol: "Me voy, que tengáis buen día.",
            chino: "我走了，祝你们有美好的一天。",
          },
          {
            espanol: "Hasta la vista, baby (famosa frase de Terminator).",
            chino: "下次见，宝贝（终结者名句）。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Preguntar cómo está alguien",
        tituloChino: "询问某人怎么样",
        descripcion: `Frases para preguntar y respuestas:

🔹 PREGUNTAS (formales e informales):

INFORMALES (con amigos, familia, gente joven):
• ¿Cómo estás?
• ¿Qué tal?
• ¿Cómo te va?
• ¿Todo bien?
• ¿Cómo andas? (coloquial - España)
• ¿Qué hay de nuevo? (cuando no te ves con alguien desde hace tiempo)
• ¿Cómo te trata la vida? (muy coloquial)

FORMALES (con jefes, mayores, desconocidos):
• ¿Cómo está usted?
• ¿Qué tal está usted?
• ¿Cómo se encuentra?

🔹 RESPUESTAS POSITIVAS:
• Muy bien, gracias
• Bien, ¿y tú?
• Fenomenal / Genial / Estupendamente
• Todo bien, gracias
• De maravilla
• Excelente

🔹 RESPUESTAS NEUTRALES:
• Así así
• Regular
• Tirando (coloquial - "más o menos")
• No me puedo quejar (no tengo motivos para quejarme)
• Ahí vamos (coloquial)

🔹 RESPUESTAS NEGATIVAS:
• Mal
• Muy mal
• No muy bien
• Cansado/a
• Enfermo/a
• Preocupado/a
• Fatal (muy mal)
• Con un poco de gripe

📌 NOTA: En español es normal responder con un "¿Y tú?" o "¿Y usted?" después de responder para mostrar interés en la otra persona.`,
        descripcionChino: `询问和回答的句子：

🔹 问题（正式和非正式）：

非正式（和朋友、家人、年轻人）：
• ¿Cómo estás? = 你好吗？
• ¿Qué tal? = 怎么样？
• ¿Cómo te va? = 你最近怎么样？
• ¿Todo bien? = 一切都好吗？
• ¿Cómo andas? = 你怎么样？（口语 - 西班牙）
• ¿Qué hay de nuevo? = 有什么新鲜事？（很久不见时）
• ¿Cómo te trata la vida? = 生活对你怎么样？（很口语化）

正式（和老板、长辈、陌生人）：
• ¿Cómo está usted? = 您好吗？
• ¿Qué tal está usted? = 您好吗？
• ¿Cómo se encuentra? = 您感觉如何？

🔹 积极回答：
• Muy bien, gracias = 很好，谢谢
• Bien, ¿y tú? = 好，你呢？
• Fenomenal / Genial = 棒极了
• Todo bien, gracias = 一切都好，谢谢
• De maravilla = 好极了
• Excelente = 非常好

🔹 中性回答：
• Así así = 一般般
• Regular = 一般
• Tirando = 还行（口语）
• No me puedo quejar = 还不错（没什么可抱怨的）
• Ahí vamos = 还行吧（口语）

🔹 消极回答：
• Mal = 不好
• Muy mal = 很不好
• No muy bien = 不太好
• Cansado/a = 累了
• Enfermo/a = 生病了
• Preocupado/a = 担心
• Fatal = 糟糕透了
• Con un poco de gripe = 有点感冒

📌 注意：在西班牙语中，回答后通常会加一个"¿Y tú?"或"¿Y usted?"来表示对对方的关心。`,
        ejemplos: [
          {
            espanol: "—¿Cómo estás? —Muy bien, ¿y tú?",
            chino: "—你好吗？—很好，你呢？",
          },
          {
            espanol: "—¿Qué tal? —Regular, he tenido un mal día.",
            chino: "—怎么样？—一般般，我今天过得很糟。",
          },
          {
            espanol: "—¿Cómo está usted, señor? —Bien, gracias.",
            chino: "—您好吗，先生？—很好，谢谢。",
          },
          {
            espanol: "—¿Cómo andas? —Ahí voy tirando, ¿y tú?",
            chino: "—你怎么样？—还行吧，你呢？",
          },
          {
            espanol: "—¿Todo bien? —Sí, de maravilla.",
            chino: "—一切都好吗？—是的，好极了。",
          },
          {
            espanol: "—¿Cómo te va en el nuevo trabajo? —Fatal, el jefe es muy exigente.",
            chino: "—新工作怎么样？—糟透了，老板要求很高。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Expresiones para situaciones específicas",
        tituloChino: "特定情况的表达",
        descripcion: `🔹 SALUDAR A ALGUIEN QUE NO VES HACE TIEMPO:
• ¡Cuánto tiempo sin verte!
• ¡Tanto tiempo!
• ¿Dónde te habías metido?
• ¡Qué alegría volver a verte!

🔹 PREGUNTAR POR ALGUIEN:
• ¿Qué tal está tu familia?
• ¿Cómo están tus padres?
• ¿Qué hay de tu hermana?
• ¿Sigue todo bien en casa?

🔹 AL DESPEDIRSE DE FORMA CARIÑOSA:
• Cuídate / Cuídese mucho
• Que tengas un buen día
• Que te vaya bien
• Hasta la próxima
• Un abrazo (muy común en España)
• Un beso (entre amigos y familia)

🔹 EN SITUACIONES FORMALES (negocios, desconocidos):
• Encantado/a de conocerle
• Mucho gusto
• Es un placer
• Ha sido un placer conocerle (al despedirse)`,
        descripcionChino: `🔹 问候很久不见的人：
• ¡Cuánto tiempo sin verte! = 好久不见！
• ¡Tanto tiempo! = 太久了！
• ¿Dónde te habías metido? = 你躲到哪里去了？
• ¡Qué alegría volver a verte! = 再见到你真高兴！

🔹 询问某人情况：
• ¿Qué tal está tu familia? = 你的家人怎么样？
• ¿Cómo están tus padres? = 你的父母怎么样？
• ¿Qué hay de tu hermana? = 你的妹妹怎么样了？
• ¿Sigue todo bien en casa? = 家里一切都好吗？

🔹 亲切地告别：
• Cuídate / Cuídese mucho = 多保重
• Que tengas un buen día = 祝你有美好的一天
• Que te vaya bien = 祝你一切顺利
• Hasta la próxima = 下次见
• Un abrazo = 一个拥抱（西班牙很常见）
• Un beso = 一个吻（朋友和家人之间）

🔹 正式场合（商务、陌生人）：
• Encantado/a de conocerle = 很高兴认识您
• Mucho gusto = 很高兴
• Es un placer = 很荣幸
• Ha sido un placer conocerle = 很高兴认识您（告别时）`,
        ejemplos: [
          {
            espanol: "¡Cuánto tiempo sin verte! ¿Cómo estás?",
            chino: "好久不见！你好吗？",
          },
          {
            espanol: "Que tengas un buen día, hasta luego.",
            chino: "祝你有美好的一天，回头见。",
          },
          {
            espanol: "Un abrazo, nos vemos pronto.",
            chino: "抱一下，很快见。",
          },
          {
            espanol: "Encantado de conocerle, señor López.",
            chino: "很高兴认识您，洛佩斯先生。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "Hola",
        chino: "你好",
        ejemplo: "¡Hola! ¿Qué tal?",
      },
      {
        id: "v2",
        espanol: "Buenos días",
        chino: "早上好",
        ejemplo: "Buenos días, ¿cómo está usted?",
      },
      {
        id: "v3",
        espanol: "Buenas tardes",
        chino: "下午好",
        ejemplo: "Buenas tardes, doctor.",
      },
      {
        id: "v4",
        espanol: "Buenas noches",
        chino: "晚上好/晚安",
        ejemplo: "Buenas noches, hasta mañana.",
      },
      {
        id: "v5",
        espanol: "Adiós",
        chino: "再见",
        ejemplo: "Adiós, nos vemos.",
      },
      {
        id: "v6",
        espanol: "Hasta luego",
        chino: "回头见",
        ejemplo: "Hasta luego, amigo.",
      },
      {
        id: "v7",
        espanol: "Hasta mañana",
        chino: "明天见",
        ejemplo: "Hasta mañana, profesor.",
      },
      {
        id: "v8",
        espanol: "Hasta pronto",
        chino: "很快见",
        ejemplo: "Hasta pronto, espero verte.",
      },
      {
        id: "v9",
        espanol: "Nos vemos",
        chino: "再见",
        ejemplo: "Nos vemos mañana.",
      },
      {
        id: "v10",
        espanol: "Chao",
        chino: "拜拜(口语)",
        ejemplo: "Chao, cuídate.",
      },
      {
        id: "v11",
        espanol: "¿Cómo estás?",
        chino: "你好吗？",
        ejemplo: "¿Cómo estás? Hace tiempo que no te veo.",
      },
      {
        id: "v12",
        espanol: "¿Qué tal?",
        chino: "怎么样？",
        ejemplo: "¿Qué tal? ¿Cómo va todo?",
      },
      {
        id: "v13",
        espanol: "¿Cómo te va?",
        chino: "你最近怎么样？",
        ejemplo: "¿Cómo te va en el trabajo?",
      },
      {
        id: "v14",
        espanol: "¿Todo bien?",
        chino: "一切都好吗？",
        ejemplo: "¿Todo bien en casa?",
      },
      {
        id: "v15",
        espanol: "bien",
        chino: "好",
        ejemplo: "Estoy bien, gracias.",
      },
      {
        id: "v16",
        espanol: "mal",
        chino: "不好",
        ejemplo: "Hoy estoy mal.",
      },
      {
        id: "v17",
        espanol: "regular",
        chino: "一般般",
        ejemplo: "Todo va regular.",
      },
      {
        id: "v18",
        espanol: "fenomenal",
        chino: "棒极了",
        ejemplo: "Estoy fenomenal, ¡gané la lotería!",
      },
      {
        id: "v19",
        espanol: "gracias",
        chino: "谢谢",
        ejemplo: "Estoy bien, gracias.",
      },
      {
        id: "v20",
        espanol: "cuídate",
        chino: "保重",
        ejemplo: "Cuídate mucho, hasta luego.",
      },
      {
        id: "v21",
        espanol: "cuánto tiempo",
        chino: "好久不见",
        ejemplo: "¡Cuánto tiempo sin verte!",
      },
      {
        id: "v22",
        espanol: "un abrazo",
        chino: "一个拥抱",
        ejemplo: "Un abrazo, nos vemos pronto.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Encontrarse en la calle por la mañana",
        tituloChino: "早上在街上相遇",
        personajes: ["María", "Carlos"],
        lineas: [
          {
            personaje: "María",
            texto: "¡Hola, Carlos! Buenos días. ¿Cómo estás?",
            traduccion: "你好，卡洛斯！早上好。你好吗？",
          },
          {
            personaje: "Carlos",
            texto: "¡Hola, María! Buenos días. Estoy muy bien, gracias. ¿Y tú?",
            traduccion: "你好，玛丽亚！早上好。我很好，谢谢。你呢？",
          },
          {
            personaje: "María",
            texto: "Bien también. Oye, ¿vas al trabajo?",
            traduccion: "也很好。嘿，你去上班吗？",
          },
          {
            personaje: "Carlos",
            texto: "Sí, voy un poco tarde. Bueno, hasta luego.",
            traduccion: "是的，我有点晚了。好，回头见。",
          },
          {
            personaje: "María",
            texto: "¡Hasta luego, Carlos! Que tengas buen día.",
            traduccion: "回头见，卡洛斯！祝你有美好的一天。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Despedida en la oficina",
        tituloChino: "在办公室告别",
        personajes: ["Jefe", "Empleado"],
        lineas: [
          {
            personaje: "Jefe",
            texto: "Buenas tardes, Pedro. Buen trabajo hoy.",
            traduccion: "下午好，佩德罗。今天工作不错。",
          },
          {
            personaje: "Empleado",
            texto: "Muchas gracias, jefe. ¿Hasta mañana?",
            traduccion: "非常感谢，老板。明天见？",
          },
          {
            personaje: "Jefe",
            texto: "Sí, hasta mañana a las nueve. Que descanses.",
            traduccion: "是的，明天九点见。好好休息。",
          },
          {
            personaje: "Empleado",
            texto: "Gracias, igualmente. Adiós.",
            traduccion: "谢谢，你也是。再见。",
          },
          {
            personaje: "Jefe",
            texto: "Adiós.",
            traduccion: "再见。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Encuentro casual en el supermercado",
        tituloChino: "在超市偶遇",
        personajes: ["Laura", "Ana"],
        lineas: [
          {
            personaje: "Laura",
            texto: "¡Hola, Ana! ¿Qué tal? Hace tiempo que no te veo.",
            traduccion: "你好，安娜！怎么样？好久不见你了。",
          },
          {
            personaje: "Ana",
            texto: "¡Laura! Qué sorpresa. Muy bien, ¿y tú?",
            traduccion: "劳拉！真惊喜。我很好，你呢？",
          },
          {
            personaje: "Laura",
            texto: "Regular, un poco cansada del trabajo.",
            traduccion: "一般般，工作有点累。",
          },
          {
            personaje: "Ana",
            texto: "Ánimo. Bueno, tengo prisa. ¡Nos vemos!",
            traduccion: "加油。好了，我赶时间。再见！",
          },
          {
            personaje: "Laura",
            texto: "¡Chao, Ana! Cuídate.",
            traduccion: "拜拜，安娜！保重。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Saludo formal en una reunión de negocios",
        tituloChino: "商务会议上的正式问候",
        personajes: ["Señor López", "Señora Gómez"],
        lineas: [
          {
            personaje: "Señor López",
            texto: "Buenos días, señora Gómez. ¿Cómo está usted?",
            traduccion: "早上好，戈麦斯女士。您好吗？",
          },
          {
            personaje: "Señora Gómez",
            texto: "Buenos días, señor López. Muy bien, gracias. ¿Y usted?",
            traduccion: "早上好，洛佩斯先生。很好，谢谢。您呢？",
          },
          {
            personaje: "Señor López",
            texto: "Bien también. Es un placer volver a verle.",
            traduccion: "也很好。很荣幸再次见到您。",
          },
          {
            personaje: "Señora Gómez",
            texto: "Igualmente. Hace tiempo que no nos veíamos.",
            traduccion: "我也是。我们很久没见了。",
          },
          {
            personaje: "Señor López",
            texto: "Sí, espero que todo vaya bien en su empresa.",
            traduccion: "是的，希望贵公司一切顺利。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Dos amigos que se despiden después de un café",
        tituloChino: "两个朋友喝完咖啡后告别",
        personajes: ["Pablo", "Sofía"],
        lineas: [
          {
            personaje: "Pablo",
            texto: "Bueno, Sofía, me voy. Ha sido genial verte.",
            traduccion: "好了，索菲亚，我走了。见到你真好。",
          },
          {
            personaje: "Sofía",
            texto: "Igualmente, Pablo. ¡Cuídate mucho!",
            traduccion: "我也是，巴勃罗。多保重！",
          },
          {
            personaje: "Pablo",
            texto: "Tú también. Un abrazo.",
            traduccion: "你也是。抱一下。",
          },
          {
            personaje: "Sofía",
            texto: "Un beso. Llámame cuando quieras.",
            traduccion: "亲一下。想我的时候打电话给我。",
          },
          {
            personaje: "Pablo",
            texto: "Claro. ¡Hasta luego!",
            traduccion: "当然。回头见！",
          },
          {
            personaje: "Sofía",
            texto: "¡Hasta luego!",
            traduccion: "回头见！",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "早上我们说：_____ días",
          preguntaChino: "早上我们说：_____ días",
          respuestaCorrecta: "Buenos",
          explicacion: "早上用'Buenos días'。",
          pista: "首字母是 B，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c2",
          pregunta: "晚上我们说：_____ noches",
          preguntaChino: "晚上我们说：_____ noches",
          respuestaCorrecta: "Buenas",
          explicacion: "晚上用'Buenas noches'。",
          pista: "首字母是 B，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c3",
          pregunta: "为了说'明天见'我们说：_____ mañana",
          preguntaChino: "为了说'明天见'我们说：_____ mañana",
          respuestaCorrecta: "Hasta",
          explicacion: "'Hasta mañana' = 明天见。",
          pista: "首字母是 H，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c4",
          pregunta: "下午好：Buenas _____",
          preguntaChino: "下午好：Buenas _____",
          respuestaCorrecta: "tardes",
          explicacion: "'Buenas tardes' = 下午好。",
          pista: "首字母是 t，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c5",
          pregunta: "你好吗？(informal) ¿Cómo _____ ?",
          preguntaChino: "你好吗？(非正式) ¿Cómo _____ ?",
          respuestaCorrecta: "estás",
          explicacion: "'¿Cómo estás?' = 你好吗？",
          pista: "首字母是 e，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c6",
          pregunta: "您好吗？(formal) ¿Cómo _____ usted?",
          preguntaChino: "您好吗？(正式) ¿Cómo _____ usted?",
          respuestaCorrecta: "está",
          explicacion: "'¿Cómo está usted?' = 您好吗？",
          pista: "首字母是 e，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c7",
          pregunta: "为了说'保重'我们说：_____",
          preguntaChino: "为了说'保重'我们说：_____",
          respuestaCorrecta: "Cuídate",
          explicacion: "'Cuídate' = 保重（非正式）。",
          pista: "首字母是 C，7个字母",
          numeroLetras: 7,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "早上9点正确的问候语是什么？",
          preguntaChino: "早上9点正确的问候语是什么？",
          opciones: ["Buenas noches", "Buenos días", "Adiós", "Buenas tardes"],
          respuestaCorrecta: "Buenos días",
          explicacion: "早上9点我们说'Buenos días'。",
        },
        {
          id: "s2",
          pregunta: "当你要和明天会见到的人告别时，你说什么？",
          preguntaChino: "当你要和明天会见到的人告别时，你说什么？",
          opciones: ["Adiós", "Hasta luego", "Chao", "Hasta mañana"],
          respuestaCorrecta: "Hasta mañana",
          explicacion: "如果明天会见某人，我们说'Hasta mañana'。",
        },
        {
          id: "s3",
          pregunta: "哪个是最非正式的告别语？",
          preguntaChino: "哪个是最非正式的告别语？",
          opciones: ["Hasta mañana", "Adiós", "Chao", "Hasta luego"],
          respuestaCorrecta: "Chao",
          explicacion: "'Chao'是最非正式的告别语。",
        },
        {
          id: "s4",
          pregunta: "¿Qué tal? 是什么意思？",
          preguntaChino: "¿Qué tal? 是什么意思？",
          opciones: ["你好吗？", "再见", "谢谢", "早上好"],
          respuestaCorrecta: "你好吗？",
          explicacion: "'¿Qué tal?' 是一种非正式的问好方式。",
        },
        {
          id: "s5",
          pregunta: "以下哪个是正式的问好方式？",
          preguntaChino: "以下哪个是正式的问好方式？",
          opciones: ["¿Qué tal?", "¿Cómo estás?", "¿Cómo está usted?", "¿Cómo andas?"],
          respuestaCorrecta: "¿Cómo está usted?",
          explicacion: "'¿Cómo está usted?' 是正式形式，用于对长辈或上级。",
        },
        {
          id: "s6",
          pregunta: "如果你很久没见一个朋友，你会说什么？",
          preguntaChino: "如果你很久没见一个朋友，你会说什么？",
          opciones: ["Hola", "Adiós", "¡Cuánto tiempo!", "Buenas noches"],
          respuestaCorrecta: "¡Cuánto tiempo!",
          explicacion: "'¡Cuánto tiempo!' 用于问候很久不见的人。",
        },
        {
          id: "s7",
          pregunta: "在西班牙，告别时朋友之间常说？",
          preguntaChino: "在西班牙，告别时朋友之间常说？",
          opciones: ["Un abrazo", "Que tenga un buen día", "Adiós señor", "Hasta nunca"],
          respuestaCorrecta: "Un abrazo",
          explicacion: "在西班牙，朋友之间告别时常说'Un abrazo'（一个拥抱）。",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Chao'比'Adiós'更正式。",
          preguntaChino: "'Chao'比'Adiós'更正式。",
          respuestaCorrecta: false,
          explicacion: "错。'Chao'比'Adiós'更非正式。",
        },
        {
          id: "vf2",
          pregunta: "我们用'Buenas noches'在晚上打招呼。",
          preguntaChino: "我们用'Buenas noches'在晚上打招呼。",
          respuestaCorrecta: true,
          explicacion: "对。'Buenas noches'用于晚上。",
        },
        {
          id: "vf3",
          pregunta: "'Buenos días'用于下午。",
          preguntaChino: "'Buenos días'用于下午。",
          respuestaCorrecta: false,
          explicacion: "错。'Buenos días'用于早上，不是下午。",
        },
        {
          id: "vf4",
          pregunta: "'Hasta luego'是西班牙最常见的告别语。",
          preguntaChino: "'Hasta luego'是西班牙最常见的告别语。",
          respuestaCorrecta: true,
          explicacion: "对。'Hasta luego' 在西班牙非常常用。",
        },
        {
          id: "vf5",
          pregunta: "'¿Cómo andas?'是一种非常正式的问好方式。",
          preguntaChino: "'¿Cómo andas?'是一种非常正式的问好方式。",
          respuestaCorrecta: false,
          explicacion: "错。'¿Cómo andas?' 是一种非常口语化、非正式的表达。",
        },
        {
          id: "vf6",
          pregunta: "在商务会议中，说'Un beso'告别是合适的。",
          preguntaChino: "在商务会议中，说'Un beso'告别是合适的。",
          respuestaCorrecta: false,
          explicacion: "错。'Un beso' 只用于朋友和家人，不适合正式场合。",
        },
        {
          id: "vf7",
          pregunta: "'Hasta nunca' 表达的是友好的告别。",
          preguntaChino: "'Hasta nunca' 表达的是友好的告别。",
          respuestaCorrecta: false,
          explicacion: "错。'Hasta nunca' 表示'再也不见'，通常是不友好的。",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "Buenos días",
              derecha: "早上好",
            },
            {
              izquierda: "Buenas tardes",
              derecha: "下午好",
            },
            {
              izquierda: "Buenas noches",
              derecha: "晚上好",
            },
            {
              izquierda: "Hasta mañana",
              derecha: "明天见",
            },
            {
              izquierda: "Hasta luego",
              derecha: "回头见",
            },
            {
              izquierda: "Adiós",
              derecha: "再见",
            },
            {
              izquierda: "Chao",
              derecha: "拜拜",
            },
            {
              izquierda: "Nos vemos",
              derecha: "再见",
            },
            {
              izquierda: "Cuídate",
              derecha: "保重",
            },
            {
              izquierda: "¿Cómo estás?",
              derecha: "你好吗？",
            },
          ],
          explicacion: "将问候语与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["tardes", "Buenas", "cómo", "estás", "?"],
          respuestaCorrecta: "Buenas tardes, ¿cómo estás?",
          explicacion: "正确的顺序是：Buenas tardes, ¿cómo estás?",
        },
        {
          id: "o2",
          palabras: ["luego", "Hasta", "amigo", ","],
          respuestaCorrecta: "Hasta luego, amigo.",
          explicacion: "正确的顺序是：Hasta luego, amigo.",
        },
        {
          id: "o3",
          palabras: ["estás", "Cómo", "¿", "usted", "?"],
          respuestaCorrecta: "¿Cómo está usted?",
          explicacion: "正确的顺序是：¿Cómo está usted?",
        },
        {
          id: "o4",
          palabras: ["mañana", "clase", "Nos", "en", "vemos", "."],
          respuestaCorrecta: "Nos vemos en clase mañana.",
          explicacion: "正确的顺序是：Nos vemos en clase mañana.",
        },
        {
          id: "o5",
          palabras: ["tiempo", "Cuánto", "!", "sin", "verte"],
          respuestaCorrecta: "¡Cuánto tiempo sin verte!",
          explicacion: "正确的顺序是：¡Cuánto tiempo sin verte!",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "你好！我很好，谢谢。再见！",
          respuestaEsperada: "¡Hola! Estoy bien, gracias. ¡Adiós!",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "早上好，你好吗？",
          respuestaEsperada: "Buenos días, ¿cómo estás?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "回头见，朋友。",
          respuestaEsperada: "Hasta luego, amigo.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "晚上好，祝你有美好的一天。",
          respuestaEsperada: "Buenas noches, que tengas un buen día.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "好久不见！你最近怎么样？",
          respuestaEsperada: "¡Cuánto tiempo sin verte! ¿Cómo te va?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "很高兴认识您，先生。保重。",
          respuestaEsperada: "Encantado de conocerle, señor. Cuídese.",
          explicacion: "西班牙语翻译",
        },
      ],
    },
    ejerciciosPracticos: [
      {
        id: "ep1",
        tipo: "completarDialogo",
        titulo: "完成对话",
        tituloChino: "完成对话",
        instruccion: "阅读对话并用适当的词语完成缺失的句子。",
        instruccionChino: "阅读对话并用适当的词语完成缺失的句子。",
        dialogo: [
          {
            personaje: "A",
            texto: "_____, ¿cómo estás?",
            respuesta: "Hola / Buenos días",
          },
          {
            personaje: "B",
            texto: "Muy bien, _____. ¿Y tú?",
            respuesta: "gracias",
          },
          {
            personaje: "A",
            texto: "Bien también. ¡_____!",
            respuesta: "Hasta luego / Adiós",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "crearDialogo",
        titulo: "Crea tu propio diálogo",
        tituloChino: "创建你自己的对话",
        instruccion: "Escribe un diálogo de 4 líneas entre dos amigos que se encuentran por la mañana.",
        instruccionChino: "写一个4行的对话，关于两个朋友在早上相遇。",
        ejemplo: `A: ¡Hola! Buenos días. ¿Cómo estás?
B: Muy bien, gracias. ¿Y tú?
A: Bien también.
B: ¡Hasta luego!`,
      },
      {
        id: "ep3",
        tipo: "situaciones",
        titulo: "¿Qué dices en cada situación?",
        tituloChino: "在每种情况下你会说什么？",
        instruccion: "Escribe la expresión adecuada para cada situación.",
        instruccionChino: "为每种情况写出合适的表达。",
        situaciones: [
          {
            situacion: "Son las 10 de la mañana y te encuentras con tu profesor.",
            respuestaEsperada: "Buenos días, profesor.",
          },
          {
            situacion: "Son las 8 de la noche y te vas a dormir.",
            respuestaEsperada: "Buenas noches.",
          },
          {
            situacion: "Ves a un amigo que no ves desde hace un año.",
            respuestaEsperada: "¡Cuánto tiempo sin verte!",
          },
          {
            situacion: "Te despides de tu abuela.",
            respuestaEsperada: "Cuídate, abuela. Hasta luego.",
          },
          {
            situacion: "Conoces a alguien importante en una reunión de negocios.",
            respuestaEsperada: "Encantado/a de conocerle.",
          },
        ],
      },
      {
        id: "ep4",
        tipo: "traducirSituaciones",
        titulo: "Traduce al español",
        tituloChino: "翻译成西班牙语",
        instruccion: "Traduce las siguientes situaciones al español.",
        instruccionChino: "将以下情景翻译成西班牙语。",
        situaciones: [
          {
            situacion: "Good morning, how are you?",
            respuestaEsperada: "Buenos días, ¿cómo estás?",
          },
          {
            situacion: "See you tomorrow, take care.",
            respuestaEsperada: "Hasta mañana, cuídate.",
          },
          {
            situacion: "Long time no see! How's it going?",
            respuestaEsperada: "¡Cuánto tiempo sin verte! ¿Cómo te va?",
          },
          {
            situacion: "Good night, have a good rest.",
            respuestaEsperada: "Buenas noches, que descanses.",
          },
        ],
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Cómo saludas a tu profesor por la mañana?",
        preguntaChino: "你早上怎么跟老师打招呼？",
        sugerencia: "你可以说：Buenos días, profesor.",
        sugerenciaChino: "你可以说：Buenos días, profesor.",
      },
      {
        id: "pa2",
        pregunta: "¿Qué le dices a un amigo cuando te despides?",
        preguntaChino: "你和朋友告别时说什么？",
        sugerencia: "你可以说：Hasta luego, Chao, Nos vemos.",
        sugerenciaChino: "你可以说：Hasta luego, Chao, Nos vemos.",
      },
      {
        id: "pa3",
        pregunta: "¿Qué preguntas si quieres saber cómo está alguien?",
        preguntaChino: "如果你想问某人怎么样，你会问什么？",
        sugerencia: "¿Cómo estás?, ¿Qué tal?, ¿Cómo te va?",
        sugerenciaChino: "¿Cómo estás?, ¿Qué tal?, ¿Cómo te va?",
      },
      {
        id: "pa4",
        pregunta: "¿Cuál es la diferencia entre 'Buenas tardes' y 'Buenas noches'?",
        preguntaChino: "'Buenas tardes' 和 'Buenas noches' 有什么区别？",
        sugerencia:
          "Buenas tardes se usa desde el mediodía hasta el anochecer. Buenas noches se usa por la noche.",
        sugerenciaChino: "Buenas tardes 从中午用到傍晚。Buenas noches 在晚上用。",
      },
      {
        id: "pa5",
        pregunta: "¿Qué significa 'Hasta nunca' y cuándo se usa?",
        preguntaChino: "'Hasta nunca' 是什么意思，什么时候用？",
        sugerencia:
          "Significa que no quieres volver a ver a alguien. Se usa cuando estás enfadado con esa persona.",
        sugerenciaChino: "意思是再也不想见到某人。用于当你对某人生气时。",
      },
      {
        id: "pa6",
        pregunta: "¿Cómo te despides de tu familia por la mañana antes de ir a trabajar?",
        preguntaChino: "早上上班前你怎么和家人告别？",
        sugerencia: "¡Adiós! ¡Hasta luego! ¡Que tengáis un buen día!",
        sugerenciaChino: "¡Adiós! ¡Hasta luego! ¡Que tengáis un buen día!",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '早上好' en español?",
        preguntaChino: "西班牙语中'早上好'怎么说？",
        respuestaSugerida: "Buenos días",
        respuestaSugeridaChino: "Buenos días",
      },
      {
        id: "p2",
        pregunta: "¿Cómo te despides de un amigo que verás pronto?",
        preguntaChino: "你怎么和很快会再见的朋友告别？",
        respuestaSugerida: "Hasta luego / Nos vemos",
        respuestaSugeridaChino: "Hasta luego / Nos vemos",
      },
      {
        id: "p3",
        pregunta: "¿Qué significa '¿Qué tal?'?",
        preguntaChino: "'¿Qué tal?' 是什么意思？",
        respuestaSugerida: "Es una forma informal de preguntar '¿cómo estás?'",
        respuestaSugeridaChino: "这是一种非正式的'你好吗？'的表达。",
      },
      {
        id: "p4",
        pregunta: "¿Cuándo usamos 'Buenas tardes'?",
        preguntaChino: "我们什么时候用 'Buenas tardes'？",
        respuestaSugerida: "Desde el mediodía hasta el anochecer.",
        respuestaSugeridaChino: "从中午到傍晚。",
      },
      {
        id: "p5",
        pregunta: "¿Cómo se dice '好久不见' en español?",
        preguntaChino: "西班牙语中'好久不见'怎么说？",
        respuestaSugerida: "¡Cuánto tiempo sin verte!",
        respuestaSugeridaChino: "¡Cuánto tiempo sin verte!",
      },
      {
        id: "p6",
        pregunta: "¿Qué es más formal: 'Adiós' o 'Chao'?",
        preguntaChino: "哪个更正式：'Adiós' 还是 'Chao'？",
        respuestaSugerida: "Adiós es más formal que Chao.",
        respuestaSugeridaChino: "Adiós 比 Chao 更正式。",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Las palabras mágicas",
        tituloChino: "神奇的词语",
        descripcion: `En español hay tres palabras mágicas fundamentales:

• POR FAVOR = Se usa al pedir algo educadamente
• GRACIAS = Se usa para agradecer
• DE NADA = Se usa para responder a un agradecimiento

📌 VARIACIONES DE "GRACIAS":

• Muchas gracias = Más enfático que "gracias"
• Muchísimas gracias = Mucho más enfático
• Mil gracias = "Un millón de gracias" (muy agradecido)
• Gracias por todo = Para agradecer todo lo que alguien ha hecho
• Gracias de todas formas = Cuando no conseguiste lo que querías, pero agradeces el intento
• Gracias de antemano = Para agradecer antes de que alguien te ayude
• Gracias igualmente = Cuando la otra persona también te ha agradecido

📌 VARIACIONES DE "DE NADA" (respuestas a gracias):

• De nada = La más común
• No hay de qué = Muy común también
• Un placer = Es un placer ayudarte
• El gusto es mío = El placer es mío
• A ti / A usted = Cuando la otra persona también te ha ayudado
• No te preocupes / No se preocupe = Para tranquilizar a alguien
• Para eso estamos = "Para eso están los amigos" (coloquial)

❌ ERROR COMÚN:
Muchos estudiantes ingleses dicen "Gracias you" mezclando inglés y español. ¡No lo hagas! En español es solo "Gracias" o "Muchas gracias".`,
        descripcionChino: `在西班牙语中有三个基本的神奇词语：

• POR FAVOR = 用于礼貌地请求某物
• GRACIAS = 用于感谢
• DE NADA = 用于回应感谢

📌 "GRACIAS" 的变体：

• Muchas gracias = 比 "gracias" 更强调
• Muchísimas gracias = 非常强调
• Mil gracias = "一千个谢谢"（非常感激）
• Gracias por todo = 感谢某人做的一切
• Gracias de todas formas = 当没有得到想要的东西时，但仍然感谢对方的努力
• Gracias de antemano = 在别人帮助你之前提前感谢
• Gracias igualmente = 当对方也感谢了你时

📌 "DE NADA" 的变体（对感谢的回答）：

• De nada = 最常用
• No hay de qué = 也很常用
• Un placer = 很高兴帮助你
• El gusto es mío = 荣幸的是我
• A ti / A usted = 当对方也帮助了你时
• No te preocupes / No se preocupe = 让对方放心
• Para eso estamos = "朋友就是用来做这个的"（口语）

❌ 常见错误：
许多说英语的学生说 "Gracias you"，把英语和西班牙语混在一起。不要这样做！西班牙语只用 "Gracias" 或 "Muchas gracias"。`,
        ejemplos: [
          {
            espanol: "Un café, por favor.",
            chino: "一杯咖啡，请。",
          },
          {
            espanol: "Muchas gracias por tu ayuda.",
            chino: "非常感谢你的帮助。",
          },
          {
            espanol: "De nada, con gusto.",
            chino: "不客气，很高兴。",
          },
          {
            espanol: "¡Mil gracias por todo lo que has hecho!",
            chino: "非常感谢你所做的一切！",
          },
          {
            espanol: "Gracias de antemano por tu colaboración.",
            chino: "提前感谢你的合作。",
          },
          {
            espanol: "—Gracias. —A ti por venir.",
            chino: "—谢谢。—谢谢你来了。",
          },
          {
            espanol: "—Muchas gracias. —No hay de qué, para eso estamos.",
            chino: "—非常感谢。—没什么，朋友就是用来做这个的。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Perdón, Disculpe y Lo siento",
        tituloChino: "抱歉、打扰一下和对不起",
        descripcion: `En español hay diferentes formas de disculparse según la situación:

🔹 PERDÓN (para errores pequeños o para llamar la atención):
• Cometes un error pequeño: ¡Perdón! Fue sin querer.
• Pisas a alguien en el metro: ¡Perdón!
• Interrumpes una conversación: Perdón, ¿puedo decir algo?
• No has entendido algo: ¿Perdón? (¿Puedes repetir?)

🔹 DISCULPE / DISCULPA (más formal, para llamar la atención):
• Disculpe (usted) = Formal
• Disculpa (tú) = Informal pero educado
• Para preguntar algo a un desconocido: Disculpe, ¿dónde está la estación?
• Para pedir permiso en una reunión: Disculpe, ¿puedo intervenir?

🔹 LO SIENTO (para cosas más serias):
• Has hecho daño a alguien: Lo siento mucho, no fue mi intención.
• Te dan una mala noticia: Lo siento mucho por tu pérdida.
• Cometes un error grave: Lo siento, fue mi culpa.

📊 TABLA COMPARATIVA:

| Situación | Palabra adecuada |
|-----------|------------------|
| Pisar a alguien | Perdón |
| No entender algo | ¿Perdón? |
| Preguntar a un desconocido | Disculpe / Disculpa |
| Interrumpir una reunión | Disculpe |
| Causar un daño grave | Lo siento |
| Dar el pésame | Lo siento mucho |

❌ ERROR COMÚN:
En inglés se dice "I'm sorry" para todo. En español, "Lo siento" es más serio. Para cosas pequeñas usa "Perdón".`,
        descripcionChino: `西班牙语中有不同的道歉方式，取决于情况：

🔹 PERDÓN（用于小错误或引起注意）：
- 犯了一个小错误：¡Perdón! Fue sin querer.（抱歉！不是故意的。）
- 在地铁里踩到别人：¡Perdón!
- 打断别人谈话：Perdón, ¿puedo decir algo?
- 没听明白：¿Perdón?（你能重复一下吗？）

🔹 DISCULPE / DISCULPA（更正式，用于引起注意）：
- Disculpe (usted) = 正式
- Disculpa (tú) = 非正式但有礼貌
- 向陌生人问路：Disculpe, ¿dónde está la estación?
- 在会议上请求发言：Disculpe, ¿puedo intervenir?

🔹 LO SIENTO（用于更严重的事情）：
- 伤害了某人：Lo siento mucho, no fue mi intención.
- 听到坏消息：Lo siento mucho por tu pérdida.
- 犯了严重错误：Lo siento, fue mi culpa.

📊 比较表：

| 情况 | 合适的词 |
|------|----------|
| 踩到别人 | Perdón |
| 没听明白 | ¿Perdón? |
| 向陌生人问路 | Disculpe / Disculpa |
| 打断会议 | Disculpe |
| 造成严重伤害 | Lo siento |
| 表达哀悼 | Lo siento mucho |

❌ 常见错误：
英语中 "I'm sorry" 可以用于所有情况。在西班牙语中，"Lo siento" 更严肃。小事用 "Perdón"。`,
        ejemplos: [
          {
            espanol: "Perdón, ¿qué hora es?",
            chino: "抱歉，几点了？",
          },
          {
            espanol: "Disculpe las molestias.",
            chino: "抱歉打扰了。",
          },
          {
            espanol: "Lo siento mucho por tu pérdida.",
            chino: "对你的损失我感到非常难过。",
          },
          {
            espanol: "¡Perdón! No te vi venir.",
            chino: "抱歉！我没看见你过来。",
          },
          {
            espanol: "Disculpa, ¿me puedes ayudar con esto?",
            chino: "打扰一下，你能帮我这个吗？",
          },
          {
            espanol: "Lo siento, no fue mi intención ofenderte.",
            chino: "对不起，我不是故意冒犯你的。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Con permiso y otras expresiones de cortesía",
        tituloChino: "借过和其他礼貌表达",
        descripcion: `🔹 CON PERMISO:
• Para pedir paso cuando alguien te bloquea: Con permiso, voy a pasar.
• Para salir de una habitación donde hay otras personas: Con permiso, voy al baño.
• Para interrumpir educadamente: Con permiso, ¿puedo decir algo?

🔹 Por favor (para enfatizar):
• Sí, por favor (cuando aceptas algo)
• No, por favor (cuando rechazas algo pero educadamente)

🔹 Expresiones de cortesía en situaciones específicas:

📌 CUANDO ESTORNUDAS:
• Salud (España - "health")
• Jesús (Latinoamérica)
• La persona que estornuda dice: ¡Perdón!

📌 CUANDO ALGUIEN ESTORNUDA, RESPONDE:
• Salud
• Jesús

📌 CUANDO ALGUIEN TE DA UN REGALO O TE INVITA A COMER:
• Qué detalle (Qué amable)
• No tenías que hacerlo
• La próxima vez invito yo

📌 EN LA MESA (ANTES DE COMER):
• ¡Buen provecho! (se dice a los demás antes de empezar a comer)
• ¡Que aproveche! (menos común, pero equivalente)`,
        descripcionChino: `🔹 CON PERMISO（借过）：
- 当有人挡住你时请求通过：Con permiso, voy a pasar.
- 从有其他人的房间离开：Con permiso, voy al baño.
- 礼貌地打断：Con permiso, ¿puedo decir algo?

🔹 Por favor（用于强调）：
- Sí, por favor（当你接受某事时）
- No, por favor（当你礼貌地拒绝某事时）

🔹 特定情况下的礼貌表达：

📌 当有人打喷嚏时：
- Salud（西班牙 - "健康"）
- Jesús（拉丁美洲）
- 打喷嚏的人说：¡Perdón!

📌 当别人打喷嚏时，回答：
- Salud
- Jesús

📌 当有人送你礼物或请你吃饭时：
- Qué detalle（真贴心）
- No tenías que hacerlo（你不必这样做的）
- La próxima vez invito yo（下次我请）

📌 在餐桌上（吃饭前）：
- ¡Buen provecho!（在开始吃饭前对别人说）
- ¡Que aproveche!（不太常见，但意思相同）`,
        ejemplos: [
          {
            espanol: "Con permiso, voy a salir un momento.",
            chino: "借过，我出去一下。",
          },
          {
            espanol: "—¿Quieres más café? —Sí, por favor.",
            chino: "—你想要更多咖啡吗？—好的，谢谢。",
          },
          {
            espanol: "—¡Buen provecho! —¡Gracias, igualmente!",
            chino: "—祝你好胃口！—谢谢，你也是！",
          },
          {
            espanol: "¡Qué detalle! Muchas gracias por el regalo.",
            chino: "真贴心！谢谢你的礼物。",
          },
          {
            espanol: "—Estornudo: ¡Achís! —Salud. —¡Perdón!",
            chino: "—打喷嚏：阿嚏！—健康。—抱歉！",
          },
        ],
      },
      {
        id: "t4",
        titulo: "La cortesía en España vs América Latina",
        tituloChino: "西班牙 vs 拉丁美洲的礼貌表达",
        descripcion: `Existen algunas diferencias importantes:

🔹 ESPAÑA:
• Se usa mucho "vale" como "ok" o "de acuerdo".
• "Perdón" y "Disculpa" se usan indistintamente.
• Al despedirse, es común "Un beso" o "Un abrazo" incluso entre conocidos.
• Para pedir algo: "Ponme un café" o "Dame una caña" es normal, no es maleducado.

🔹 LATINOAMÉRICA (México, Colombia, Argentina, etc.):
• Se usa más "Disculpe" que "Perdón" en situaciones formales.
• "Gracias" y "De nada" son extremadamente importantes.
• El trato de "usted" es mucho más común que en España.
• Para pedir: "Me regala un café" (México) o "¿Me podría dar un café?" (más formal).

📌 PALABRAS DE CORTESÍA COMUNES EN LATINOAMÉRICA:
• ¿Me permite? (formal para pedir permiso)
• Con su permiso (formal para pasar o salir)
• Muchísimas gracias (muy común)
• No, gracias (para rechazar educadamente)`,
        descripcionChino: `存在一些重要的差异：

🔹 西班牙：
- 常用 "vale" 表示 "好的" 或 "同意"
- "Perdón" 和 "Disculpa" 可以互换使用
- 告别时，即使在熟人之间，也常说 "Un beso"（亲一下）或 "Un abrazo"（拥抱）
- 点东西时："Ponme un café" 或 "Dame una caña" 是正常的，不是没礼貌

🔹 拉丁美洲（墨西哥、哥伦比亚、阿根廷等）：
- 在正式场合更常用 "Disculpe" 而不是 "Perdón"
- "Gracias" 和 "De nada" 极其重要
- 使用 "usted" 比西班牙常见得多
- 点东西时："Me regala un café"（墨西哥）或 "¿Me podría dar un café?"（更正式）

📌 拉丁美洲常见的礼貌用语：
- ¿Me permite?（正式请求许可）
- Con su permiso（正式通过或离开）
- Muchísimas gracias（非常常见）
- No, gracias（礼貌地拒绝）`,
        ejemplos: [
          {
            espanol: "En España: 'Ponme un café, por favor.'",
            chino: "在西班牙：'请给我一杯咖啡。'",
          },
          {
            espanol: "En México: 'Me regala un café, por favor.'",
            chino: "在墨西哥：'请给我一杯咖啡。'",
          },
          {
            espanol: "En España: 'Un beso, hasta luego.'",
            chino: "在西班牙：'亲一下，回头见。'",
          },
          {
            espanol: "En Colombia: 'Con su permiso, señor.'",
            chino: "在哥伦比亚：'先生，借过。'",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "Por favor",
        chino: "请",
        ejemplo: "Un agua, por favor.",
      },
      {
        id: "v2",
        espanol: "Gracias",
        chino: "谢谢",
        ejemplo: "Gracias por todo.",
      },
      {
        id: "v3",
        espanol: "Muchas gracias",
        chino: "非常感谢",
        ejemplo: "Muchas gracias por tu tiempo.",
      },
      {
        id: "v4",
        espanol: "Muchísimas gracias",
        chino: "非常感谢（强调）",
        ejemplo: "¡Muchísimas gracias por todo!",
      },
      {
        id: "v5",
        espanol: "Mil gracias",
        chino: "一千个谢谢",
        ejemplo: "Mil gracias por tu ayuda.",
      },
      {
        id: "v6",
        espanol: "De nada",
        chino: "不客气",
        ejemplo: "De nada, fue un placer.",
      },
      {
        id: "v7",
        espanol: "No hay de qué",
        chino: "没什么",
        ejemplo: "—Gracias. —No hay de qué.",
      },
      {
        id: "v8",
        espanol: "Un placer",
        chino: "很荣幸",
        ejemplo: "Un placer ayudarte.",
      },
      {
        id: "v9",
        espanol: "El gusto es mío",
        chino: "荣幸的是我",
        ejemplo: "—Gracias. —El gusto es mío.",
      },
      {
        id: "v10",
        espanol: "Perdón",
        chino: "抱歉",
        ejemplo: "Perdón, ¿qué hora es?",
      },
      {
        id: "v11",
        espanol: "Disculpe",
        chino: "打扰一下(正式)",
        ejemplo: "Disculpe, ¿puede repetir?",
      },
      {
        id: "v12",
        espanol: "Disculpa",
        chino: "打扰一下(非正式)",
        ejemplo: "Disculpa, ¿me ayudas?",
      },
      {
        id: "v13",
        espanol: "Lo siento",
        chino: "对不起",
        ejemplo: "Lo siento, no sabía.",
      },
      {
        id: "v14",
        espanol: "Con permiso",
        chino: "借过",
        ejemplo: "Con permiso, voy a pasar.",
      },
      {
        id: "v15",
        espanol: "¡Buen provecho!",
        chino: "祝你好胃口！",
        ejemplo: "¡Buen provecho! ¡Gracias!",
      },
      {
        id: "v16",
        espanol: "Salud",
        chino: "健康（打喷嚏时）",
        ejemplo: "—Achís. —Salud.",
      },
      {
        id: "v17",
        espanol: "Qué detalle",
        chino: "真贴心",
        ejemplo: "¡Qué detalle! Gracias por el regalo.",
      },
      {
        id: "v18",
        espanol: "No tenías que hacerlo",
        chino: "你不必这样做的",
        ejemplo: "No tenías que hacerlo, pero gracias.",
      },
      {
        id: "v19",
        espanol: "Gracias de antemano",
        chino: "提前感谢",
        ejemplo: "Gracias de antemano por tu colaboración.",
      },
      {
        id: "v20",
        espanol: "Gracias igualmente",
        chino: "也同样感谢",
        ejemplo: "—Gracias a ti. —Gracias igualmente.",
      },
      {
        id: "v21",
        espanol: "Para eso estamos",
        chino: "朋友就是用来做这个的",
        ejemplo: "Gracias por ayudarme. —Para eso estamos.",
      },
      {
        id: "v22",
        espanol: "A ti / A usted",
        chino: "你/您也是",
        ejemplo: "—Gracias. —A ti por venir.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "En una cafetería",
        tituloChino: "在咖啡馆",
        personajes: ["Cliente", "Camarero"],
        lineas: [
          {
            personaje: "Camarero",
            texto: "Buenos días, bienvenido. ¿Qué desea?",
            traduccion: "早上好，欢迎。您想要什么？",
          },
          {
            personaje: "Cliente",
            texto: "Buenos días. Un café con leche, por favor.",
            traduccion: "早上好。一杯拿铁咖啡，请。",
          },
          {
            personaje: "Camarero",
            texto: "¿Algo más?",
            traduccion: "还要别的吗？",
          },
          {
            personaje: "Cliente",
            texto: "Sí, un croissant también, por favor.",
            traduccion: "是的，还要一个牛角面包，请。",
          },
          {
            personaje: "Camarero",
            texto: "Aquí tiene. Son cuatro euros cincuenta.",
            traduccion: "给您。四欧元五十。",
          },
          {
            personaje: "Cliente",
            texto: "Gracias. Aquí tiene.",
            traduccion: "谢谢。给您。",
          },
          {
            personaje: "Camarero",
            texto: "Muchas gracias. ¡Buen provecho!",
            traduccion: "非常感谢。请慢用！",
          },
          {
            personaje: "Cliente",
            texto: "Gracias, igualmente.",
            traduccion: "谢谢，你也是。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Pidiendo ayuda",
        tituloChino: "寻求帮助",
        personajes: ["Turista", "Local"],
        lineas: [
          {
            personaje: "Turista",
            texto: "Disculpe, ¿puede ayudarme?",
            traduccion: "打扰一下，您能帮我吗？",
          },
          {
            personaje: "Local",
            texto: "Sí, claro. ¿En qué puedo ayudarle?",
            traduccion: "是的，当然。我能帮您什么？",
          },
          {
            personaje: "Turista",
            texto: "¿Dónde está la estación de metro, por favor?",
            traduccion: "请问地铁站在哪里？",
          },
          {
            personaje: "Local",
            texto: "Está a dos calles de aquí. Gire a la derecha.",
            traduccion: "离这里两个街区。向右转。",
          },
          {
            personaje: "Turista",
            texto: "Muchas gracias por su ayuda.",
            traduccion: "非常感谢您的帮助。",
          },
          {
            personaje: "Local",
            texto: "De nada, no hay de qué. ¡Hasta luego!",
            traduccion: "不客气，没什么。再见！",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Pidiendo disculpas por llegar tarde",
        tituloChino: "为迟到道歉",
        personajes: ["Ana", "Carlos"],
        lineas: [
          {
            personaje: "Ana",
            texto: "¡Perdón! Llegué tarde. Hay muchísimo tráfico.",
            traduccion: "抱歉！我迟到了。交通太堵了。",
          },
          {
            personaje: "Carlos",
            texto: "No te preocupes, no pasa nada. Lo importante es que estás aquí.",
            traduccion: "别担心，没关系。重要的是你在这里。",
          },
          {
            personaje: "Ana",
            texto: "Gracias por tu comprensión. Lo siento mucho.",
            traduccion: "谢谢你的理解。非常抱歉。",
          },
          {
            personaje: "Carlos",
            texto: "Tranquila, de verdad. ¿Quieres un café?",
            traduccion: "真的没关系。你想要一杯咖啡吗？",
          },
          {
            personaje: "Ana",
            texto: "Sí, por favor. Un café solo. Muchas gracias.",
            traduccion: "是的，请。一杯黑咖啡。非常感谢。",
          },
          {
            personaje: "Carlos",
            texto: "Para eso estamos. ¡Ahora mismo te lo pido!",
            traduccion: "朋友就是用来做这个的。我马上就点！",
          },
        ],
      },
      {
        id: "d4",
        titulo: "En una comida con amigos",
        tituloChino: "和朋友一起吃饭",
        personajes: ["María", "Pedro", "Laura"],
        lineas: [
          {
            personaje: "María",
            texto: "¡Qué bueno está todo! Gracias por cocinar, Pedro.",
            traduccion: "一切都太好吃了！谢谢你做饭，佩德罗。",
          },
          {
            personaje: "Pedro",
            texto: "No hay de qué, fue un placer. ¿Alguien quiere más?",
            traduccion: "没什么，很荣幸。有人想要更多吗？",
          },
          {
            personaje: "Laura",
            texto: "Yo sí, por favor. Está delicioso.",
            traduccion: "我想要，请。太好吃了。",
          },
          {
            personaje: "María",
            texto: "¡Buen provecho a todos!",
            traduccion: "祝大家好胃口！",
          },
          {
            personaje: "Pedro",
            texto: "¡Salud!",
            traduccion: "干杯！（或健康）",
          },
          {
            personaje: "Laura",
            texto: "¡Qué detalle! La próxima vez invito yo.",
            traduccion: "真贴心！下次我请。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Solicitando un favor de forma educada",
        tituloChino: "礼貌地请求帮助",
        personajes: ["Jefe", "Empleado"],
        lineas: [
          {
            personaje: "Jefe",
            texto: "Buenos días, Carlos. ¿Me puede ayudar con un informe?",
            traduccion: "早上好，卡洛斯。你能帮我做一个报告吗？",
          },
          {
            personaje: "Empleado",
            texto: "Buenos días, jefe. Sí, claro. ¿Para cuándo lo necesita?",
            traduccion: "早上好，老板。是的，当然。您什么时候需要？",
          },
          {
            personaje: "Jefe",
            texto: "Lo necesito para mañana por la mañana, por favor.",
            traduccion: "我明天早上需要，麻烦你了。",
          },
          {
            personaje: "Empleado",
            texto: "Muy bien. Lo tendré listo. Disculpe, ¿puedo irme un poco antes hoy?",
            traduccion: "好的。我会准备好的。打扰一下，我今天可以早点走吗？",
          },
          {
            personaje: "Jefe",
            texto: "Claro, sin problema. Muchas gracias por tu ayuda.",
            traduccion: "当然，没问题。非常感谢你的帮助。",
          },
          {
            personaje: "Empleado",
            texto: "Gracias a usted, jefe. Hasta mañana.",
            traduccion: "谢谢您，老板。明天见。",
          },
          {
            personaje: "Jefe",
            texto: "Hasta mañana, cuídese.",
            traduccion: "明天见，保重。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: '为了礼貌地请求某物，我们说："Un agua, _____ favor"',
          preguntaChino: '为了礼貌地请求某物，我们说："Un agua, _____ favor"',
          respuestaCorrecta: "por",
          explicacion: "'Por favor'用于礼貌地请求某物。",
          pista: "首字母是 p，3个字母",
          numeroLetras: 3,
        },
        {
          id: "c2",
          pregunta: "当有人帮助你时，你说：_____ gracias",
          preguntaChino: "当有人帮助你时，你说：_____ gracias",
          respuestaCorrecta: "Muchas",
          explicacion: "'Muchas gracias' = 非常感谢。",
          pista: "首字母是 M，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c3",
          pregunta: "为了回应'gracias'，我们说：_____ nada",
          preguntaChino: "为了回应'gracias'，我们说：_____ nada",
          respuestaCorrecta: "De",
          explicacion: "'De nada'是对'gracias'的回答。",
          pista: "首字母是 D，2个字母",
          numeroLetras: 2,
        },
        {
          id: "c4",
          pregunta: "为了借过，我们说：Con _____",
          preguntaChino: "为了借过，我们说：Con _____",
          respuestaCorrecta: "permiso",
          explicacion: "'Con permiso' = 借过。",
          pista: "首字母是 p，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c5",
          pregunta: "为了说'非常抱歉'，我们说：Lo _____ mucho",
          preguntaChino: "为了说'非常抱歉'，我们说：Lo _____ mucho",
          respuestaCorrecta: "siento",
          explicacion: "'Lo siento mucho' = 非常抱歉。",
          pista: "首字母是 s，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c6",
          pregunta: "为了说'不用谢'另一种方式，我们说：No hay de _____",
          preguntaChino: "为了说'不用谢'另一种方式，我们说：No hay de _____",
          respuestaCorrecta: "qué",
          explicacion: "'No hay de qué' = 不客气/没什么。",
          pista: "首字母是 q，3个字母",
          numeroLetras: 3,
        },
        {
          id: "c7",
          pregunta: "当有人打喷嚏时，我们说：_____",
          preguntaChino: "当有人打喷嚏时，我们说：_____",
          respuestaCorrecta: "Salud",
          explicacion: "'Salud' = 健康（对打喷嚏的人说）。",
          pista: "首字母是 S，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c8",
          pregunta: "为了说'提前感谢'，我们说：Gracias de _____",
          preguntaChino: "为了说'提前感谢'，我们说：Gracias de _____",
          respuestaCorrecta: "antemano",
          explicacion: "'Gracias de antemano' = 提前感谢。",
          pista: "首字母是 a，8个字母",
          numeroLetras: 8,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "当你不小心踩到某人时，你说什么？",
          preguntaChino: "当你不小心踩到某人时，你说什么？",
          opciones: ["Gracias", "De nada", "Por favor", "Perdón"],
          respuestaCorrecta: "Perdón",
          explicacion: "当我们犯错比如踩到某人时，我们说'Perdón'。",
        },
        {
          id: "s2",
          pregunta: "哪个更正式：'Perdón'还是'Disculpe'？",
          preguntaChino: "哪个更正式：'Perdón'还是'Disculpe'？",
          opciones: ["Perdón", "Son iguales", "Disculpe", "Ninguna"],
          respuestaCorrecta: "Disculpe",
          explicacion: "'Disculpe'比'Perdón'更正式。",
        },
        {
          id: "s3",
          pregunta: "当有人说'Gracias'时，你回答什么？",
          preguntaChino: "当有人说'Gracias'时，你回答什么？",
          opciones: ["Por favor", "Gracias", "Perdón", "De nada"],
          respuestaCorrecta: "De nada",
          explicacion: "对'Gracias'的回答是'De nada'。",
        },
        {
          id: "s4",
          pregunta: "如果你做了很严重的事情，你说什么？",
          preguntaChino: "如果你做了很严重的事情，你说什么？",
          opciones: ["Perdón", "Disculpe", "Lo siento", "Con permiso"],
          respuestaCorrecta: "Lo siento",
          explicacion: "'Lo siento' 用于更严重的事情。",
        },
        {
          id: "s5",
          pregunta: "如何回应'Gracias'如果你想表达'荣幸的是我'？",
          preguntaChino: "如何回应'Gracias'如果你想表达'荣幸的是我'？",
          opciones: ["De nada", "No hay de qué", "El gusto es mío", "Por favor"],
          respuestaCorrecta: "El gusto es mío",
          explicacion: "'El gusto es mío' = 荣幸的是我。",
        },
        {
          id: "s6",
          pregunta: "在西班牙，吃饭前你对别人说什么？",
          preguntaChino: "在西班牙，吃饭前你对别人说什么？",
          opciones: ["¡Salud!", "¡Buen provecho!", "¡Gracias!", "¡Por favor!"],
          respuestaCorrecta: "¡Buen provecho!",
          explicacion: "'¡Buen provecho!' 是在吃饭前对别人说的。",
        },
        {
          id: "s7",
          pregunta: "当你收到一份意想不到的礼物时，你会说什么？",
          preguntaChino: "当你收到一份意想不到的礼物时，你会说什么？",
          opciones: ["Lo siento", "Perdón", "¡Qué detalle!", "Con permiso"],
          respuestaCorrecta: "¡Qué detalle!",
          explicacion: "'¡Qué detalle!' 表示'真贴心'。",
        },
        {
          id: "s8",
          pregunta: "在拉丁美洲，正式场合更常用哪个词？",
          preguntaChino: "在拉丁美洲，正式场合更常用哪个词？",
          opciones: ["Perdón", "Chao", "Disculpe", "Vale"],
          respuestaCorrecta: "Disculpe",
          explicacion: "在拉丁美洲，正式场合更常用'Disculpe'。",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Por favor'用于感谢。",
          preguntaChino: "'Por favor'用于感谢。",
          respuestaCorrecta: false,
          explicacion: "错。'Por favor'用于请求，不是感谢。",
        },
        {
          id: "vf2",
          pregunta: "'Lo siento'表达情感或悲伤。",
          preguntaChino: "'Lo siento'表达情感或悲伤。",
          respuestaCorrecta: true,
          explicacion: "对。'Lo siento'用于表达情感或悲伤。",
        },
        {
          id: "vf3",
          pregunta: "'Con permiso' se usa para pedir paso.",
          preguntaChino: "'Con permiso'用于请求借过。",
          respuestaCorrecta: true,
          explicacion: "对。'Con permiso' = 借过。",
        },
        {
          id: "vf4",
          pregunta: "'Perdón' y 'Lo siento' son intercambiables siempre.",
          preguntaChino: "'Perdón'和'Lo siento'总是可以互换。",
          respuestaCorrecta: false,
          explicacion: "错。'Perdón'用于小错误，'Lo siento'用于更严重的事情。",
        },
        {
          id: "vf5",
          pregunta: "'No hay de qué' significa 'de nada'.",
          preguntaChino: "'No hay de qué'意思是'不客气'。",
          respuestaCorrecta: true,
          explicacion: "对。'No hay de qué' 是 'de nada' 的同义词。",
        },
        {
          id: "vf6",
          pregunta: "'Buen provecho' se dice después de comer.",
          preguntaChino: "'Buen provecho' 在吃饭后说。",
          respuestaCorrecta: false,
          explicacion: "错。'Buen provecho' 在吃饭前说。",
        },
        {
          id: "vf7",
          pregunta: "En España es común decir 'Un beso' al despedirse.",
          preguntaChino: "在西班牙，告别时常说'Un beso'。",
          respuestaCorrecta: true,
          explicacion: "对。在西班牙，朋友之间告别时常说'Un beso'。",
        },
        {
          id: "vf8",
          pregunta: "'Salud' se dice cuando alguien estornuda.",
          preguntaChino: "当有人打喷嚏时说'Salud'。",
          respuestaCorrecta: true,
          explicacion: "对。'Salud' 是对打喷嚏的人说的。",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "Por favor",
              derecha: "请",
            },
            {
              izquierda: "Gracias",
              derecha: "谢谢",
            },
            {
              izquierda: "De nada",
              derecha: "不客气",
            },
            {
              izquierda: "Perdón",
              derecha: "抱歉",
            },
            {
              izquierda: "Lo siento",
              derecha: "对不起",
            },
            {
              izquierda: "Con permiso",
              derecha: "借过",
            },
            {
              izquierda: "No hay de qué",
              derecha: "没什么",
            },
            {
              izquierda: "Buen provecho",
              derecha: "祝你好胃口",
            },
            {
              izquierda: "Salud",
              derecha: "健康（打喷嚏）",
            },
            {
              izquierda: "Gracias de antemano",
              derecha: "提前感谢",
            },
            {
              izquierda: "El gusto es mío",
              derecha: "荣幸的是我",
            },
          ],
          explicacion: "将礼貌用语与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["por", "café", "un", "favor", ","],
          respuestaCorrecta: "Un café, por favor.",
          explicacion: "正确的顺序是：Un café, por favor.",
        },
        {
          id: "o2",
          palabras: ["nada", "Gracias", "De", "—", "—"],
          respuestaCorrecta: "—Gracias. —De nada.",
          explicacion: "正确的顺序是：—Gracias. —De nada.",
        },
        {
          id: "o3",
          palabras: ["permiso", "Con", "voy", "a", "pasar", "."],
          respuestaCorrecta: "Con permiso, voy a pasar.",
          explicacion: "正确的顺序是：Con permiso, voy a pasar.",
        },
        {
          id: "o4",
          palabras: ["mucho", "siento", "Lo", "llegar", "tarde", "."],
          respuestaCorrecta: "Lo siento mucho por llegar tarde.",
          explicacion: "正确的顺序是：Lo siento mucho por llegar tarde.",
        },
        {
          id: "o5",
          palabras: ["provecho", "Buen", "!", "—", "—Gracias", "igualmente"],
          respuestaCorrecta: "—¡Buen provecho! —Gracias, igualmente.",
          explicacion: "正确的顺序是：—¡Buen provecho! —Gracias, igualmente.",
        },
        {
          id: "o6",
          palabras: ["qué", "No", "de", "hay", "—Gracias", "—"],
          respuestaCorrecta: "—Gracias. —No hay de qué.",
          explicacion: "正确的顺序是：—Gracias. —No hay de qué.",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "请给我一杯水。谢谢！不客气。",
          respuestaEsperada: "Un vaso de agua, por favor. ¡Gracias! De nada.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "对不起，我迟到了。",
          respuestaEsperada: "Lo siento, llegué tarde.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "非常感谢你的帮助。",
          respuestaEsperada: "Muchas gracias por tu ayuda.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "打扰一下，您能帮我吗？",
          respuestaEsperada: "Disculpe, ¿puede ayudarme?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "不客气，没什么。",
          respuestaEsperada: "No hay de qué.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "提前感谢你的合作。",
          respuestaEsperada: "Gracias de antemano por tu colaboración.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "真贴心！谢谢你的礼物。",
          respuestaEsperada: "¡Qué detalle! Gracias por el regalo.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "——阿嚏！——健康！——抱歉！",
          respuestaEsperada: "—¡Achís! —¡Salud! —¡Perdón!",
          explicacion: "西班牙语翻译",
        },
      ],
    },
    ejerciciosPracticos: [
      {
        id: "ep1",
        tipo: "completarDialogo",
        titulo: "完成对话",
        tituloChino: "完成对话",
        instruccion: "用适当的神奇词语完成对话。",
        instruccionChino: "用适当的神奇词语完成对话。",
        dialogo: [
          {
            personaje: "Cliente",
            texto: "_____, ¿cuánto cuesta esto?",
            respuesta: "Perdón / Disculpe",
          },
          {
            personaje: "Vendedor",
            texto: "Cuesta diez euros.",
            respuesta: "",
          },
          {
            personaje: "Cliente",
            texto: "Lo compro, _____.",
            respuesta: "por favor",
          },
          {
            personaje: "Vendedor",
            texto: "Aquí tiene. ¿Algo más?",
            respuesta: "",
          },
          {
            personaje: "Cliente",
            texto: "No, _____.",
            respuesta: "gracias",
          },
          {
            personaje: "Vendedor",
            texto: "_____. ¡Hasta luego!",
            respuesta: "De nada",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "responderSituaciones",
        titulo: "Responde a las siguientes situaciones",
        tituloChino: "回答以下情景",
        instruccion: "Responde en español a cada situación usando una expresión de cortesía.",
        instruccionChino: "用西班牙语礼貌表达回答每个情景。",
        situaciones: [
          {
            situacion: "Alguien te da las gracias.",
            respuestaEsperada: "De nada / No hay de qué / Un placer.",
          },
          {
            situacion: "Quieres pedir un café en una cafetería.",
            respuestaEsperada: "Un café, por favor.",
          },
          {
            situacion: "Llegas tarde a una reunión.",
            respuestaEsperada: "Lo siento por llegar tarde. / Perdón.",
          },
          {
            situacion: "Necesitas que alguien se quite del paso.",
            respuestaEsperada: "Con permiso.",
          },
          {
            situacion: "Alguien estornuda a tu lado.",
            respuestaEsperada: "¡Salud!",
          },
          {
            situacion: "Empiezas a comer con amigos.",
            respuestaEsperada: "¡Buen provecho!",
          },
          {
            situacion: "Alguien te regala un detalle inesperado.",
            respuestaEsperada: "¡Qué detalle! Muchas gracias.",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "completarFrases",
        titulo: "Completa las frases con la palabra adecuada",
        tituloChino: "用合适的词完成句子",
        instruccion: "Elige la palabra correcta para completar cada frase.",
        instruccionChino: "选择正确的词来完成每个句子。",
        frases: [
          {
            frase: "_____ por favor. (a) Disculpe  (b) Gracias  (c) Perdón",
            respuesta: "Disculpe / Perdón",
          },
          {
            frase: "_____, no quería hacerte daño. (a) Perdón  (b) Lo siento  (c) De nada",
            respuesta: "Lo siento",
          },
          {
            frase: "—Gracias. —No hay de _____. (a) qué  (b) nada  (c) favor",
            respuesta: "qué",
          },
          {
            frase: "_____ de antemano por tu ayuda. (a) Gracias  (b) De nada  (c) Perdón",
            respuesta: "Gracias",
          },
          {
            frase: "—Achís. —_____. (a) Salud  (b) Gracias  (c) Perdón",
            respuesta: "Salud",
          },
        ],
      },
      {
        id: "ep4",
        tipo: "clasificar",
        titulo: "Clasifica las expresiones",
        tituloChino: "分类表达",
        instruccion: "Clasifica cada expresión en la categoría correcta.",
        instruccionChino: "将每个表达分类到正确的类别中。",
        categorias: [
          {
            categoria: "Saludos",
            palabras: ["Hola", "Buenos días"],
          },
          {
            categoria: "Despedidas",
            palabras: ["Adiós", "Hasta luego"],
          },
          {
            categoria: "Disculpas",
            palabras: ["Perdón", "Lo siento", "Disculpe"],
          },
          {
            categoria: "Agradecimientos",
            palabras: ["Gracias", "Muchas gracias", "Mil gracias"],
          },
        ],
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Cómo pides un café en una cafetería?",
        preguntaChino: "你在咖啡馆怎么点咖啡？",
        sugerencia: "你可以说：Un café, por favor.",
        sugerenciaChino: "你可以说：Un café, por favor.",
      },
      {
        id: "pa2",
        pregunta: "¿Qué dices cuando alguien te da las gracias?",
        preguntaChino: "当有人对你说谢谢时，你说什么？",
        sugerencia: "你可以说：De nada, No hay de qué, Con gusto, Un placer.",
        sugerenciaChino: "你可以说：De nada, No hay de qué, Con gusto, Un placer.",
      },
      {
        id: "pa3",
        pregunta: "¿Cuál es la diferencia entre 'Perdón' y 'Lo siento'?",
        preguntaChino: "'Perdón' 和 'Lo siento' 有什么区别？",
        sugerencia: "Perdón es para errores pequeños. Lo siento es para cosas más serias.",
        sugerenciaChino: "Perdón 用于小错误。Lo siento 用于更严重的事情。",
      },
      {
        id: "pa4",
        pregunta: "¿Qué dices si quieres pasar porque alguien te bloquea el paso?",
        preguntaChino: "如果有人挡住了你的路，你想过去，你会说什么？",
        sugerencia: "Con permiso.",
        sugerenciaChino: "Con permiso.",
      },
      {
        id: "pa5",
        pregunta: "¿Qué se dice en España cuando alguien estornuda?",
        preguntaChino: "在西班牙，当有人打喷嚏时说什么？",
        sugerencia: "Se dice 'Salud'. La persona que estornuda dice 'Perdón'.",
        sugerenciaChino: "说'Salud'。打喷嚏的人说'Perdón'。",
      },
      {
        id: "pa6",
        pregunta: "¿Por qué es importante la cortesía en la cultura hispana?",
        preguntaChino: "为什么礼貌在西班牙文化中很重要？",
        sugerencia: "Porque muestra respeto y educación hacia los demás.",
        sugerenciaChino: "因为它显示对他人的尊重和教育。",
      },
      {
        id: "pa7",
        pregunta: "¿Qué diferencias hay entre la cortesía en España y en Latinoamérica?",
        preguntaChino: "西班牙和拉丁美洲的礼貌有什么区别？",
        sugerencia:
          "En Latinoamérica se usa más 'usted' y 'Disculpe'. En España es más común 'un beso' al despedirse.",
        sugerenciaChino: "在拉丁美洲更常用'usted'和'Disculpe'。在西班牙告别时更常说'un beso'。",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '请' en español?",
        preguntaChino: "西班牙语的'请'怎么说？",
        respuestaSugerida: "Por favor",
        respuestaSugeridaChino: "Por favor",
      },
      {
        id: "p2",
        pregunta: "¿Cuándo usas 'Lo siento'?",
        preguntaChino: "你什么时候使用'Lo siento'？",
        respuestaSugerida: "Cuando cometo un error grave o estoy triste",
        respuestaSugeridaChino: "当犯了严重错误或难过时",
      },
      {
        id: "p3",
        pregunta: "¿Qué significa 'No hay de qué'?",
        preguntaChino: "'No hay de qué' 是什么意思？",
        respuestaSugerida: "Es una forma de decir 'de nada'.",
        respuestaSugeridaChino: "这是'不客气'的另一种说法。",
      },
      {
        id: "p4",
        pregunta: "¿Cómo respondes a 'Gracias' si también quieres agradecer?",
        preguntaChino: "如果对方也帮助了你，你怎么回应'Gracias'？",
        respuestaSugerida: "A ti / A usted.",
        respuestaSugeridaChino: "A ti / A usted.",
      },
      {
        id: "p5",
        pregunta: "¿Qué significa 'Buen provecho'?",
        preguntaChino: "'Buen provecho' 是什么意思？",
        respuestaSugerida: "Se dice antes de comer para desear que disfrutes la comida.",
        respuestaSugeridaChino: "吃饭前说的，祝你用餐愉快。",
      },
      {
        id: "p6",
        pregunta: "¿Qué se dice cuando alguien estornuda?",
        preguntaChino: "当有人打喷嚏时说什么？",
        respuestaSugerida: "Salud",
        respuestaSugeridaChino: "Salud",
      },
      {
        id: "p7",
        pregunta: "¿Cómo se dice '借过' en español?",
        preguntaChino: "西班牙语中'借过'怎么说？",
        respuestaSugerida: "Con permiso",
        respuestaSugeridaChino: "Con permiso",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Cómo presentarte",
        tituloChino: "如何自我介绍",
        descripcion: `Para presentarte en español, usa estas frases:

🔹 FORMAS BÁSICAS:
• Me llamo + [nombre] = Mi nombre es... (la más común)
• Soy + [nombre] = Soy... (más directa, informal)
• Mi nombre es + [nombre] = Mi nombre es... (un poco más formal)

🔹 EXPRESIONES DE CORTESÍA DESPUÉS DE PRESENTARTE:
• Mucho gusto = Mucho placer en conocerte
• Encantado/a = Encantado/a de conocerte
• Es un placer = Es un placer conocerte
• Un placer = Forma corta de "Es un placer"

🔹 PREGUNTAR EL NOMBRE DE LA OTRA PERSONA:
• ¿Y tú? (después de presentarte - informal)
• ¿Y usted? (después de presentarte - formal)
• ¿Cómo te llamas? (informal)
• ¿Cómo se llama usted? (formal)
• ¿Cuál es tu nombre? (pregunta directa)
• ¿Puedo saber tu nombre? (muy educado)

🔹 DIFERENCIA ENTRE "ENCANTADO" Y "ENCANTADA":
• Encantado = lo dice un hombre
• Encantada = lo dice una mujer

📌 NOTA IMPORTANTE:
En los países hispanohablantes, cuando conoces a alguien por primera vez, es normal dar dos besos en el aire en la mejilla (en España y la mayoría de Latinoamérica). En situaciones formales, se da la mano.`,
        descripcionChino: `用西班牙语自我介绍时，使用这些句子：

🔹 基本形式：
• Me llamo + [名字] = 我叫...（最常见）
• Soy + [名字] = 我是...（更直接，非正式）
• Mi nombre es + [名字] = 我的名字是...（稍微正式一些）

🔹 自我介绍后的礼貌表达：
• Mucho gusto = 很高兴认识你
• Encantado/a = 很高兴认识你
• Es un placer = 很荣幸认识你
• Un placer = "Es un placer" 的简短形式

🔹 询问对方的名字：
• ¿Y tú?（自我介绍后 - 非正式）
• ¿Y usted?（自我介绍后 - 正式）
• ¿Cómo te llamas?（非正式）
• ¿Cómo se llama usted?（正式）
• ¿Cuál es tu nombre?（直接询问）
• ¿Puedo saber tu nombre?（非常有礼貌）

🔹 "ENCANTADO" 和 "ENCANTADA" 的区别：
• Encantado = 男性说
• Encantada = 女性说

📌 重要提示：
在西班牙语国家，第一次认识某人时，通常在脸颊上做两次亲吻（在西班牙和大部分拉丁美洲）。在正式场合，握手。`,
        ejemplos: [
          {
            espanol: "Me llamo Ana. ¿Y tú?",
            chino: "我叫安娜。你呢？",
          },
          {
            espanol: "Soy Carlos García. Mucho gusto.",
            chino: "我是卡洛斯·加西亚。很高兴。",
          },
          {
            espanol: "Encantada de conocerte.",
            chino: "很高兴认识你。(女性说)",
          },
          {
            espanol: "Mi nombre es María. Es un placer.",
            chino: "我的名字是玛丽亚。很荣幸。",
          },
          {
            espanol: "¿Cómo te llamas? —Me llamo Juan.",
            chino: "你叫什么名字？—我叫胡安。",
          },
          {
            espanol: "¿Puedo saber tu nombre? —Claro, me llamo Lucía.",
            chino: "我能知道你的名字吗？—当然，我叫露西亚。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Presentar a otros",
        tituloChino: "介绍他人",
        descripcion: `Para presentar a otra persona, usa estas frases:

🔹 FORMALES:
• Le presento a + [nombre] (formal - a una persona)
• Les presento a + [nombre] (formal - a varias personas)
• Permítame presentarle a + [nombre] (muy formal)

🔹 INFORMALES:
• Te presento a + [nombre] (a una persona)
• Os presento a + [nombre] (en España, a varias personas)
• Este / Esta es + [nombre] (directo)
• Quiero que conozcas a + [nombre] (con cariño)
• Mira, él/ella es + [nombre] (muy coloquial)

🔹 AL PRESENTAR, DI TAMBIÉN ALGO SOBRE LA PERSONA:
• Te presento a mi amigo Juan. Es médico.
• Esta es mi hermana María. Vive en Madrid.
• Le presento al señor López. Es mi jefe.

🔹 RESPUESTAS CUANDO TE PRESENTAN:
• Mucho gusto
• Encantado/a
• Un placer
• El gusto es mío (educado)
• Igualmente (respuesta rápida)

📌 NOTA SOBRE "ESTE" Y "ESTA":
• Este es = para presentar a un hombre
• Esta es = para presentar a una mujer
• Estos son / Estas son = para presentar a varias personas`,
        descripcionChino: `介绍他人时，使用这些句子：

🔹 正式：
• Le presento a + [名字]（正式 - 对一个人）
• Les presento a + [名字]（正式 - 对多个人）
• Permítame presentarle a + [名字]（非常正式）

🔹 非正式：
• Te presento a + [名字]（对一个人）
• Os presento a + [名字]（在西班牙，对多个人）
• Este / Esta es + [名字]（直接）
• Quiero que conozcas a + [名字]（亲切的）
• Mira, él/ella es + [名字]（很口语化）

🔹 介绍时，也说一些关于这个人的信息：
• Te presento a mi amigo Juan. Es médico. = 我给你介绍我的朋友胡安。他是医生。
• Esta es mi hermana María. Vive en Madrid. = 这是我的妹妹玛丽亚。她住在马德里。
• Le presento al señor López. Es mi jefe. = 我给您介绍洛佩斯先生。他是我的老板。

🔹 当你被介绍时的回答：
• Mucho gusto = 很高兴
• Encantado/a = 很高兴
• Un placer = 很荣幸
• El gusto es mío = 荣幸的是我（有礼貌）
• Igualmente = 我也一样（简短回答）

📌 关于"ESTE"和"ESTA"的注意：
• Este es = 用于介绍男性
• Esta es = 用于介绍女性
• Estos son / Estas son = 用于介绍多个人`,
        ejemplos: [
          {
            espanol: "Te presento a mi amigo Juan.",
            chino: "我给你介绍我的朋友胡安。",
          },
          {
            espanol: "Él es mi compañero de trabajo.",
            chino: "他是我的同事。",
          },
          {
            espanol: "Esta es mi hermana María.",
            chino: "这位是我的妹妹玛丽亚。",
          },
          {
            espanol: "Le presento al director de la empresa.",
            chino: "我给您介绍公司的董事。",
          },
          {
            espanol: "Quiero que conozcas a mi novio, Pablo.",
            chino: "我想让你认识我的男朋友，巴勃罗。",
          },
          {
            espanol: "—Te presento a Laura. —Mucho gusto. —El gusto es mío.",
            chino: "—我给你介绍劳拉。—很高兴。—荣幸的是我。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Preguntar por el nombre y origen",
        tituloChino: "询问名字和来源",
        descripcion: `🔹 PREGUNTAR EL NOMBRE:
• ¿Cómo te llamas? (informal)
• ¿Cómo se llama usted? (formal)
• ¿Cuál es tu nombre?
• ¿Cuál es su nombre? (formal)
• ¿Me puedes decir tu nombre? (educado)

🔹 PREGUNTAR DE DÓNDE ES:
• ¿De dónde eres? (informal)
• ¿De dónde es usted? (formal)
• ¿De qué país eres?
• ¿De qué país es usted?
• ¿Dónde naciste? / ¿Dónde nació usted?

🔹 PREGUNTAR POR LA PROFESIÓN (en contexto de presentación):
• ¿A qué te dedicas?
• ¿En qué trabajas?
• ¿Cuál es tu profesión?

🔹 CÓMO RESPONDER:
• Me llamo...
• Soy de... (ciudad o país)
• Vivo en...
• Soy... (profesión / nacionalidad)

📌 FRASES ÚTILES PARA CONTINUAR LA CONVERSACIÓN DESPUÉS DE PRESENTARSE:
• ¿Y tú? / ¿Y usted? = ¿Y tú cómo te llamas / de dónde eres?
• ¿Y qué haces aquí? = ¿Cuál es tu motivo para estar aquí?
• ¿Cuánto tiempo llevas en...? = ¿Desde cuándo estás en...?
• ¿Te gusta...? = Para seguir la conversación`,
        descripcionChino: `🔹 询问名字：
• ¿Cómo te llamas? (非正式)
• ¿Cómo se llama usted? (正式)
• ¿Cuál es tu nombre?
• ¿Cuál es su nombre? (正式)
• ¿Me puedes decir tu nombre? (有礼貌)

🔹 询问来自哪里：
• ¿De dónde eres? (非正式)
• ¿De dónde es usted? (正式)
• ¿De qué país eres?
• ¿De qué país es usted?
• ¿Dónde naciste? / ¿Dónde nació usted? (你在哪里出生？)

🔹 询问职业（在介绍语境中）：
• ¿A qué te dedicas? = 你是做什么工作的？
• ¿En qué trabajas? = 你在哪里工作？
• ¿Cuál es tu profesión? = 你的职业是什么？

🔹 如何回答：
• Me llamo... = 我叫...
• Soy de... = 我来自...（城市或国家）
• Vivo en... = 我住在...
• Soy... = 我是...（职业/国籍）

📌 自我介绍后继续对话的有用句子：
• ¿Y tú? / ¿Y usted? = 你呢？（你叫什么/你来自哪里）
• ¿Y qué haces aquí? = 你在这里做什么？
• ¿Cuánto tiempo llevas en...? = 你在...多久了？
• ¿Te gusta...? = 你喜欢...吗？（用于继续对话）`,
        ejemplos: [
          {
            espanol: "—Me llamo Ana. ¿Y tú? —Me llamo Carlos.",
            chino: "—我叫安娜。你呢？—我叫卡洛斯。",
          },
          {
            espanol: "—¿Cómo se llama usted? —Me llamo señor García.",
            chino: "—您叫什么名字？—我叫加西亚先生。",
          },
          {
            espanol: "—¿De dónde eres? —Soy de México. ¿Y tú?",
            chino: "—你来自哪里？—我来自墨西哥。你呢？",
          },
          {
            espanol: "—¿De dónde es usted, señora? —Soy de Colombia.",
            chino: "—您来自哪里，女士？—我来自哥伦比亚。",
          },
          {
            espanol: "—¿A qué te dedicas? —Soy profesor de español.",
            chino: "—你是做什么工作的？—我是西班牙语老师。",
          },
          {
            espanol: "—¿Cuánto tiempo llevas en Madrid? —Llevo dos años.",
            chino: "—你在马德里多久了？—我待了两年。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Presentaciones en contextos específicos",
        tituloChino: "特定场合的自我介绍",
        descripcion: `🔹 EN UNA ENTREVISTA DE TRABAJO (trabajo - formal):
• Buenos días, me llamo [nombre]. Soy licenciado en...
• Vengo a la entrevista para el puesto de...
• Aquí tiene mi currículum.
• Mucho gusto, encantado/a de conocerle.

🔹 EN LA UNIVERSIDAD (escuela - formal/informal):
• Hola, soy [nombre]. Estudio [carrera].
• ¿Tú también estudias [carrera]?
• ¿En qué año estás?
• ¿De dónde eres?

🔹 EN UNA FIESTA (fiesta - informal):
• ¡Hola! Soy [nombre]. ¿Y tú?
• ¿Cómo te llamas?
• ¿Vienes a menudo a estas fiestas?
• ¿Conoces a alguien aquí?

🔹 POR TELÉFONO O VIDEOLLAMADA:
• ¿Hola? Soy [nombre].
• ¿Puedo hablar con [nombre]?
• Al teléfono: "¿Quién es?"

🔹 EN REDES SOCIALES (internet):
• Hola a todos, soy [nombre] y...
• Me presento: me llamo [nombre] y soy de...
• Siguiendo la presentación, soy...`,
        descripcionChino: `🔹 在工作面试中（正式）：
• Buenos días, me llamo [nombre]. Soy licenciado en... = 早上好，我叫...我是...专业的毕业生。
• Vengo a la entrevista para el puesto de... = 我来面试...职位。
• Aquí tiene mi currículum. = 这是我的简历。
• Mucho gusto, encantado/a de conocerle. = 很高兴，很高兴认识您。

🔹 在大学里（正式/非正式）：
• Hola, soy [nombre]. Estudio [carrera]. = 你好，我叫...我学...专业。
• ¿Tú también estudias [carrera]? = 你也学...专业吗？
• ¿En qué año estás? = 你上大几？
• ¿De dónde eres? = 你来自哪里？

🔹 在派对上（非正式）：
• ¡Hola! Soy [nombre]. ¿Y tú? = 你好！我叫...你呢？
• ¿Cómo te llamas? = 你叫什么名字？
• ¿Vienes a menudo a estas fiestas? = 你经常来这种派对吗？
• ¿Conoces a alguien aquí? = 你在这里认识人吗？

🔹 在电话或视频通话中：
• ¿Hola? Soy [nombre]. = 喂？我是...
• ¿Puedo hablar con [nombre]? = 我能和...说话吗？
• Al teléfono: "¿Quién es?" = 电话里："你是谁？"

🔹 在社交媒体上：
• Hola a todos, soy [nombre] y... = 大家好，我是...
• Me presento: me llamo [nombre] y soy de... = 我自我介绍一下：我叫...我来自...
• Siguiendo la presentación, soy... = 接着自我介绍，我是...`,
        ejemplos: [
          {
            espanol: "Buenos días, me llamo Laura. Vengo a la entrevista para el puesto de diseñadora.",
            chino: "早上好，我叫劳拉。我来面试设计师的职位。",
          },
          {
            espanol: "¡Hola! Soy Pablo. ¿Y tú? —Hola, soy Marta. Mucho gusto.",
            chino: "你好！我是巴勃罗。你呢？—你好，我是玛尔塔。很高兴。",
          },
          {
            espanol: "¿Hola? Soy Ana, ¿puedo hablar con Carlos?",
            chino: "喂？我是安娜，我能和卡洛斯说话吗？",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "Me llamo",
        chino: "我叫",
        ejemplo: "Me llamo Pedro.",
      },
      {
        id: "v2",
        espanol: "Soy",
        chino: "我是",
        ejemplo: "Soy estudiante.",
      },
      {
        id: "v3",
        espanol: "Mi nombre es",
        chino: "我的名字是",
        ejemplo: "Mi nombre es Ana.",
      },
      {
        id: "v4",
        espanol: "Encantado",
        chino: "很高兴(男)",
        ejemplo: "Encantado de conocerte.",
      },
      {
        id: "v5",
        espanol: "Encantada",
        chino: "很高兴(女)",
        ejemplo: "Encantada de conocerte.",
      },
      {
        id: "v6",
        espanol: "Mucho gusto",
        chino: "很高兴认识你",
        ejemplo: "Mucho gusto, soy Ana.",
      },
      {
        id: "v7",
        espanol: "Es un placer",
        chino: "很荣幸",
        ejemplo: "Es un placer conocerte.",
      },
      {
        id: "v8",
        espanol: "Un placer",
        chino: "很荣幸(简短)",
        ejemplo: "—Soy Carlos. —Un placer.",
      },
      {
        id: "v9",
        espanol: "El gusto es mío",
        chino: "荣幸的是我",
        ejemplo: "—Mucho gusto. —El gusto es mío.",
      },
      {
        id: "v10",
        espanol: "Te presento a",
        chino: "我给你介绍",
        ejemplo: "Te presento a mi hermana.",
      },
      {
        id: "v11",
        espanol: "Le presento a",
        chino: "我给您介绍(正式)",
        ejemplo: "Le presento al señor López.",
      },
      {
        id: "v12",
        espanol: "Este es",
        chino: "这位是(男)",
        ejemplo: "Este es mi amigo Juan.",
      },
      {
        id: "v13",
        espanol: "Esta es",
        chino: "这位是(女)",
        ejemplo: "Esta es mi prima Laura.",
      },
      {
        id: "v14",
        espanol: "Él es",
        chino: "他是",
        ejemplo: "Él es mi profesor.",
      },
      {
        id: "v15",
        espanol: "Ella es",
        chino: "她是",
        ejemplo: "Ella es mi jefa.",
      },
      {
        id: "v16",
        espanol: "¿Cómo te llamas?",
        chino: "你叫什么名字？",
        ejemplo: "¿Cómo te llamas?",
      },
      {
        id: "v17",
        espanol: "¿Cómo se llama usted?",
        chino: "您叫什么名字？(正式)",
        ejemplo: "¿Cómo se llama usted, señora?",
      },
      {
        id: "v18",
        espanol: "¿De dónde eres?",
        chino: "你来自哪里？",
        ejemplo: "¿De dónde eres? —Soy de Perú.",
      },
      {
        id: "v19",
        espanol: "¿De dónde es usted?",
        chino: "您来自哪里？(正式)",
        ejemplo: "¿De dónde es usted, señor?",
      },
      {
        id: "v20",
        espanol: "Soy de...",
        chino: "我来自...",
        ejemplo: "Soy de Colombia.",
      },
      {
        id: "v21",
        espanol: "Vivo en...",
        chino: "我住在...",
        ejemplo: "Vivo en Barcelona.",
      },
      {
        id: "v22",
        espanol: "¿A qué te dedicas?",
        chino: "你是做什么工作的？",
        ejemplo: "¿A qué te dedicas? —Soy ingeniero.",
      },
      {
        id: "v23",
        espanol: "¿Y tú?",
        chino: "你呢？",
        ejemplo: "Me llamo Ana. ¿Y tú?",
      },
      {
        id: "v24",
        espanol: "¿Y usted?",
        chino: "您呢？(正式)",
        ejemplo: "Soy de Chile. ¿Y usted?",
      },
      {
        id: "v25",
        espanol: "Igualmente",
        chino: "我也一样",
        ejemplo: "—Mucho gusto. —Igualmente.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Primera vez en clase",
        tituloChino: "第一次在课堂",
        personajes: ["Profesor", "Estudiante"],
        lineas: [
          {
            personaje: "Profesor",
            texto: "Buenos días. ¿Cómo te llamas?",
            traduccion: "早上好。你叫什么名字？",
          },
          {
            personaje: "Estudiante",
            texto: "Me llamo Li Wei. Soy de China.",
            traduccion: "我叫李伟。我来自中国。",
          },
          {
            personaje: "Profesor",
            texto: "Mucho gusto, Li Wei. Yo soy el profesor Martínez.",
            traduccion: "很高兴，李伟。我是马丁内斯老师。",
          },
          {
            personaje: "Estudiante",
            texto: "Encantado de conocerle, profesor.",
            traduccion: "很高兴认识您，老师。",
          },
          {
            personaje: "Profesor",
            texto: "Bienvenido a la clase de español.",
            traduccion: "欢迎来到西班牙语课。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Presentando amigos",
        tituloChino: "介绍朋友",
        personajes: ["Ana", "Pedro", "María"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Hola Pedro, te presento a mi amiga María.",
            traduccion: "你好佩德罗，我给你介绍我的朋友玛丽亚。",
          },
          {
            personaje: "Pedro",
            texto: "Mucho gusto, María. Soy Pedro.",
            traduccion: "很高兴，玛丽亚。我是佩德罗。",
          },
          {
            personaje: "María",
            texto: "Encantada, Pedro. ¿De dónde eres?",
            traduccion: "很高兴，佩德罗。你来自哪里？",
          },
          {
            personaje: "Pedro",
            texto: "Soy de Madrid. ¿Y tú?",
            traduccion: "我来自马德里。你呢？",
          },
          {
            personaje: "María",
            texto: "Yo soy de Barcelona. ¡Qué coincidencia!",
            traduccion: "我来自巴塞罗那。真巧！",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Presentación formal en una reunión de negocios",
        tituloChino: "商务会议中的正式介绍",
        personajes: ["Señor López", "Señora Gómez", "Señor Ruiz"],
        lineas: [
          {
            personaje: "Señor López",
            texto: "Buenos días, señora Gómez. Le presento a mi socio, el señor Ruiz.",
            traduccion: "早上好，戈麦斯女士。我给您介绍我的合伙人，鲁伊斯先生。",
          },
          {
            personaje: "Señora Gómez",
            texto: "Mucho gusto, señor Ruiz. Soy María Gómez.",
            traduccion: "很高兴，鲁伊斯先生。我是玛丽亚·戈麦斯。",
          },
          {
            personaje: "Señor Ruiz",
            texto: "Encantado de conocerla, señora Gómez. He oído mucho de usted.",
            traduccion: "很高兴认识您，戈麦斯女士。我听说过很多关于您的事。",
          },
          {
            personaje: "Señora Gómez",
            texto: "El gusto es mío. ¿De dónde es usted, señor Ruiz?",
            traduccion: "荣幸的是我。您来自哪里，鲁伊斯先生？",
          },
          {
            personaje: "Señor Ruiz",
            texto: "Soy de Madrid. ¿Y usted?",
            traduccion: "我来自马德里。您呢？",
          },
          {
            personaje: "Señora Gómez",
            texto: "Yo soy de Barcelona. Un placer.",
            traduccion: "我来自巴塞罗那。很荣幸。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Conociendo a alguien en una fiesta",
        tituloChino: "在派对上认识某人",
        personajes: ["Laura", "David"],
        lineas: [
          {
            personaje: "Laura",
            texto: "¡Hola! Soy Laura. ¿Y tú?",
            traduccion: "你好！我是劳拉。你呢？",
          },
          {
            personaje: "David",
            texto: "Hola, Laura. Soy David. Mucho gusto.",
            traduccion: "你好，劳拉。我是大卫。很高兴。",
          },
          {
            personaje: "Laura",
            texto: "¿Eres amigo de Pablo?",
            traduccion: "你是巴勃罗的朋友吗？",
          },
          {
            personaje: "David",
            texto: "Sí, somos compañeros de trabajo. ¿Y tú?",
            traduccion: "是的，我们是同事。你呢？",
          },
          {
            personaje: "Laura",
            texto: "Yo soy prima de Pablo. Encantada.",
            traduccion: "我是巴勃罗的表妹。很高兴。",
          },
          {
            personaje: "David",
            texto: "Encantado. ¿A qué te dedicas, Laura?",
            traduccion: "很高兴。你是做什么工作的，劳拉？",
          },
          {
            personaje: "Laura",
            texto: "Soy profesora de inglés. ¿Y tú?",
            traduccion: "我是英语老师。你呢？",
          },
          {
            personaje: "David",
            texto: "Yo soy arquitecto.",
            traduccion: "我是建筑师。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "En la universidad",
        tituloChino: "在大学里",
        personajes: ["Carlos", "Elena"],
        lineas: [
          {
            personaje: "Carlos",
            texto: "Hola, ¿esta silla está libre?",
            traduccion: "你好，这个椅子空着吗？",
          },
          {
            personaje: "Elena",
            texto: "Sí, siéntate. Soy Elena, ¿y tú?",
            traduccion: "是的，坐吧。我是埃莱娜，你呢？",
          },
          {
            personaje: "Carlos",
            texto: "Me llamo Carlos. ¿Estudias medicina?",
            traduccion: "我叫卡洛斯。你学医学吗？",
          },
          {
            personaje: "Elena",
            texto: "Sí, primer año. ¿Y tú?",
            traduccion: "是的，第一年。你呢？",
          },
          {
            personaje: "Carlos",
            texto: "Yo también. ¿De dónde eres?",
            traduccion: "我也是。你来自哪里？",
          },
          {
            personaje: "Elena",
            texto: "Soy de Valencia. ¿Y tú?",
            traduccion: "我来自瓦伦西亚。你呢？",
          },
          {
            personaje: "Carlos",
            texto: "Soy de Madrid. Encantado de conocerte.",
            traduccion: "我来自马德里。很高兴认识你。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "为了说'我叫卡洛斯'：_____ llamo Carlos",
          preguntaChino: "为了说'我叫卡洛斯'：_____ llamo Carlos",
          respuestaCorrecta: "Me",
          explicacion: "'Me llamo' = 我叫。",
          pista: "首字母是 M，2个字母",
          numeroLetras: 2,
        },
        {
          id: "c2",
          pregunta: "为了说'他是老师'：_____ es profesor",
          preguntaChino: "为了说'他是老师'：_____ es profesor",
          respuestaCorrecta: "Él",
          explicacion: "'Él' = 他。",
          pista: "首字母是 É，3个字母",
          numeroLetras: 3,
        },
        {
          id: "c3",
          pregunta: "一个女人说：_____ de conocerte",
          preguntaChino: "一个女人说：_____ de conocerte",
          respuestaCorrecta: "Encantada",
          explicacion: "女性说'Encantada'。",
          pista: "首字母是 E，9个字母",
          numeroLetras: 9,
        },
        {
          id: "c4",
          pregunta: "为了说'我给您介绍'（正式）：Le _____ a",
          preguntaChino: "为了说'我给您介绍'（正式）：Le _____ a",
          respuestaCorrecta: "presento",
          explicacion: "'Le presento a' = 我给您介绍（正式）。",
          pista: "首字母是 p，8个字母",
          numeroLetras: 8,
        },
        {
          id: "c5",
          pregunta: "为了说'你来自哪里？'：¿De dónde _____?",
          preguntaChino: "为了说'你来自哪里？'：¿De dónde _____?",
          respuestaCorrecta: "eres",
          explicacion: "'¿De dónde eres?' = 你来自哪里？",
          pista: "首字母是 e，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c6",
          pregunta: "为了说'您来自哪里？'（正式）：¿De dónde _____ usted?",
          preguntaChino: "为了说'您来自哪里？'（正式）：¿De dónde _____ usted?",
          respuestaCorrecta: "es",
          explicacion: "'¿De dónde es usted?' = 您来自哪里？",
          pista: "首字母是 e，2个字母",
          numeroLetras: 2,
        },
        {
          id: "c7",
          pregunta: "为了说'很荣幸'，我们说：Es un _____",
          preguntaChino: "为了说'很荣幸'，我们说：Es un _____",
          respuestaCorrecta: "placer",
          explicacion: "'Es un placer' = 很荣幸。",
          pista: "首字母是 p，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c8",
          pregunta: "为了说'你呢？'（正式）：¿Y _____?",
          preguntaChino: "为了说'你呢？'（正式）：¿Y _____?",
          respuestaCorrecta: "usted",
          explicacion: "'¿Y usted?' = 您呢？",
          pista: "首字母是 u，5个字母",
          numeroLetras: 5,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "如何正式地自我介绍？",
          preguntaChino: "如何正式地自我介绍？",
          opciones: ["¡Hola!", "¿Qué tal?", "Me llamo...", "Adiós"],
          respuestaCorrecta: "Me llamo...",
          explicacion: "'Me llamo...'是最常见的自我介绍方式。",
        },
        {
          id: "s2",
          pregunta: "一个男人认识某人时说什么？",
          preguntaChino: "一个男人认识某人时说什么？",
          opciones: ["Encantada", "Muchas gracias", "Encantado", "De nada"],
          respuestaCorrecta: "Encantado",
          explicacion: "男性说'Encantado'，女性说'Encantada'。",
        },
        {
          id: "s3",
          pregunta: "你怎么介绍一个朋友？",
          preguntaChino: "你怎么介绍一个朋友？",
          opciones: ["Ella es...", "Te presento a...", "¿Cómo estás?", "Este es..."],
          respuestaCorrecta: "Te presento a...",
          explicacion: "'Te presento a...'用于介绍任何人。",
        },
        {
          id: "s4",
          pregunta: "如何正式地问'您叫什么名字？'",
          preguntaChino: "如何正式地问'您叫什么名字？'",
          opciones: ["¿Cómo te llamas?", "¿Cómo se llama usted?", "¿Qué tal?", "¿De dónde eres?"],
          respuestaCorrecta: "¿Cómo se llama usted?",
          explicacion: "'¿Cómo se llama usted?' 是正式形式。",
        },
        {
          id: "s5",
          pregunta: "'El gusto es mío' 是什么意思？",
          preguntaChino: "'El gusto es mío' 是什么意思？",
          opciones: ["我叫", "很高兴", "荣幸的是我", "你呢"],
          respuestaCorrecta: "荣幸的是我",
          explicacion: "'El gusto es mío' 是一种礼貌的回答。",
        },
        {
          id: "s6",
          pregunta: "如何介绍一位女性同事？",
          preguntaChino: "如何介绍一位女性同事？",
          opciones: ["Este es", "Esta es", "Él es", "Te presento al"],
          respuestaCorrecta: "Esta es",
          explicacion: "'Esta es' 用于介绍女性。",
        },
        {
          id: "s7",
          pregunta: "当你被介绍时，如何回答'Mucho gusto'？",
          preguntaChino: "当你被介绍时，如何回答'Mucho gusto'？",
          opciones: ["Igualmente", "Me llamo", "Soy de...", "¿Y tú?"],
          respuestaCorrecta: "Igualmente",
          explicacion: "'Igualmente' 是 'mucho gusto' 的常见回答。",
        },
        {
          id: "s8",
          pregunta: "如何问'你是做什么工作的？'",
          preguntaChino: "如何问'你是做什么工作的？'",
          opciones: ["¿De dónde eres?", "¿Cómo te llamas?", "¿A qué te dedicas?", "¿Qué tal?"],
          respuestaCorrecta: "¿A qué te dedicas?",
          explicacion: "'¿A qué te dedicas?' 询问职业。",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Soy'可以用于说你的名字。",
          preguntaChino: "'Soy'可以用于说你的名字。",
          respuestaCorrecta: true,
          explicacion: "对。'Soy María'是正确的。",
        },
        {
          id: "vf2",
          pregunta: "在西班牙，介绍时通常会亲吻两下。",
          preguntaChino: "在西班牙，介绍时通常会亲吻两下。",
          respuestaCorrecta: true,
          explicacion: "对。习惯是亲吻两下，每边脸颊一下。",
        },
        {
          id: "vf3",
          pregunta: "'Él es'用于介绍一个女人。",
          preguntaChino: "'Él es'用于介绍一个女人。",
          respuestaCorrecta: false,
          explicacion: "错。'Él es'用于男性，'Ella es'用于女性。",
        },
        {
          id: "vf4",
          pregunta: "'Encantado' 只能由女性说。",
          preguntaChino: "'Encantado' 只能由女性说。",
          respuestaCorrecta: false,
          explicacion: "错。'Encantado' 由男性说，'Encantada' 由女性说。",
        },
        {
          id: "vf5",
          pregunta: "'Le presento a' 是正式介绍方式。",
          preguntaChino: "'Le presento a' 是正式介绍方式。",
          respuestaCorrecta: true,
          explicacion: "对。'Le presento a' 用于正式场合。",
        },
        {
          id: "vf6",
          pregunta: "在商务场合，应该用'Tú'而不是'Usted'。",
          preguntaChino: "在商务场合，应该用'Tú'而不是'Usted'。",
          respuestaCorrecta: false,
          explicacion: "错。在商务场合应该用正式形式'Usted'。",
        },
        {
          id: "vf7",
          pregunta: "'¿Cómo te llamas?' 是正式形式。",
          preguntaChino: "'¿Cómo te llamas?' 是正式形式。",
          respuestaCorrecta: false,
          explicacion: "错。'¿Cómo te llamas?' 是非正式形式。",
        },
        {
          id: "vf8",
          pregunta: "'Mucho gusto' 和 'Encantado' 意思相似。",
          preguntaChino: "'Mucho gusto' 和 'Encantado' 意思相似。",
          respuestaCorrecta: true,
          explicacion: "对。两者都表示'很高兴认识你'。",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "Me llamo",
              derecha: "我叫",
            },
            {
              izquierda: "Soy",
              derecha: "我是",
            },
            {
              izquierda: "Encantado/a",
              derecha: "很高兴",
            },
            {
              izquierda: "Te presento a",
              derecha: "我给你介绍",
            },
            {
              izquierda: "Mucho gusto",
              derecha: "很高兴认识你",
            },
            {
              izquierda: "¿Cómo te llamas?",
              derecha: "你叫什么名字？",
            },
            {
              izquierda: "¿De dónde eres?",
              derecha: "你来自哪里？",
            },
            {
              izquierda: "El gusto es mío",
              derecha: "荣幸的是我",
            },
            {
              izquierda: "Le presento a",
              derecha: "我给您介绍",
            },
            {
              izquierda: "Igualmente",
              derecha: "我也一样",
            },
          ],
          explicacion: "将介绍用语与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["Ana", "Me", "llamo", "."],
          respuestaCorrecta: "Me llamo Ana.",
          explicacion: "正确的顺序是：Me llamo Ana.",
        },
        {
          id: "o2",
          palabras: ["presento", "Te", "a", "amigo", "mi", "."],
          respuestaCorrecta: "Te presento a mi amigo.",
          explicacion: "正确的顺序是：Te presento a mi amigo.",
        },
        {
          id: "o3",
          palabras: ["llamas", "cómo", "¿", "te", "?"],
          respuestaCorrecta: "¿Cómo te llamas?",
          explicacion: "正确的顺序是：¿Cómo te llamas?",
        },
        {
          id: "o4",
          palabras: ["eres", "dónde", "¿", "De", "?"],
          respuestaCorrecta: "¿De dónde eres?",
          explicacion: "正确的顺序是：¿De dónde eres?",
        },
        {
          id: "o5",
          palabras: ["gusto", "Mucho", "—", "—Igualmente", "."],
          respuestaCorrecta: "—Mucho gusto. —Igualmente.",
          explicacion: "正确的顺序是：—Mucho gusto. —Igualmente.",
        },
        {
          id: "o6",
          palabras: ["presenta", "cómo", "se", "¿", "él", "?"],
          respuestaCorrecta: "¿Cómo se presenta él?",
          explicacion: "正确的顺序是：¿Cómo se presenta él?",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我叫安娜。很高兴认识你。",
          respuestaEsperada: "Me llamo Ana. Encantada de conocerte.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "我给你介绍我的朋友卡洛斯。",
          respuestaEsperada: "Te presento a mi amigo Carlos.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "他是我的老师。",
          respuestaEsperada: "Él es mi profesor.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "你叫什么名字？—我叫佩德罗。",
          respuestaEsperada: "¿Cómo te llamas? —Me llamo Pedro.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "您来自哪里，女士？—我来自哥伦比亚。",
          respuestaEsperada: "¿De dónde es usted, señora? —Soy de Colombia.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "很高兴认识您。—荣幸的是我。",
          respuestaEsperada: "Mucho gusto. —El gusto es mío.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "这位是我的妹妹，她叫玛丽亚。",
          respuestaEsperada: "Esta es mi hermana, se llama María.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "你是做什么工作的？—我是工程师。",
          respuestaEsperada: "¿A qué te dedicas? —Soy ingeniero.",
          explicacion: "西班牙语翻译",
        },
      ],
    },
    ejerciciosPracticos: [
      {
        id: "ep1",
        tipo: "completarDialogo",
        titulo: "完成对话",
        tituloChino: "完成对话",
        instruccion: "完成介绍对话。",
        instruccionChino: "完成介绍对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "Hola, ¿cómo te _____?",
            respuesta: "llamas",
          },
          {
            personaje: "B",
            texto: "_____ Ana. ¿Y tú?",
            respuesta: "Me llamo / Soy",
          },
          {
            personaje: "A",
            texto: "_____ Pedro. Mucho _____.",
            respuesta: "Soy / gusto",
          },
          {
            personaje: "B",
            texto: "_____ de conocerte.",
            respuesta: "Encantada / Encantado",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "responderSituaciones",
        titulo: "Responde a las siguientes situaciones",
        tituloChino: "回答以下情景",
        instruccion: "Responde en español a cada situación.",
        instruccionChino: "用西班牙语回答每个情景。",
        situaciones: [
          {
            situacion: "Alguien te pregunta: ¿Cómo te llamas?",
            respuestaEsperada: "Me llamo [tu nombre].",
          },
          {
            situacion: "Alguien te dice: Mucho gusto.",
            respuestaEsperada: "Mucho gusto / Igualmente / El gusto es mío.",
          },
          {
            situacion: "Te preguntan: ¿De dónde eres?",
            respuestaEsperada: "Soy de [tu país/ciudad].",
          },
          {
            situacion: "Tienes que presentar a tu amigo Juan.",
            respuestaEsperada: "Te presento a mi amigo Juan.",
          },
          {
            situacion: "Te preguntan: ¿A qué te dedicas?",
            respuestaEsperada: "Soy [profesión] / estudiante.",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "completarFrases",
        titulo: "Completa las frases con la palabra adecuada",
        tituloChino: "用合适的词完成句子",
        instruccion: "Elige la palabra correcta.",
        instruccionChino: "选择正确的词。",
        frases: [
          {
            frase: "Me llamo Carlos. _____ (a) Y usted (b) Y tú (c) ¿De dónde?",
            respuesta: "Y tú",
          },
          {
            frase: "_____ (a) Este es (b) Esta es (c) Ellos son mi amigo Juan.",
            respuesta: "Este es",
          },
          {
            frase: "_____ (a) Encantado (b) Encantada (c) Encantados de conocerte (hombre hablando).",
            respuesta: "Encantado",
          },
          {
            frase: "¿De dónde _____ (a) eres (b) está (c) vives? —Soy de México.",
            respuesta: "eres",
          },
        ],
      },
      {
        id: "ep4",
        tipo: "escribirPresentacion",
        titulo: "Escribe tu presentación",
        tituloChino: "写出你的自我介绍",
        instruccion: "Escribe una breve presentación de ti mismo en español (4-5 líneas).",
        instruccionChino: "用西班牙语写一个简短的自我介绍（4-5行）。",
        ejemplo: "Hola, me llamo Ana. Soy de España, de Madrid. Soy profesora de español. Mucho gusto.",
        sugerenciaChino: "例子：你好，我叫安娜。我来自西班牙马德里。我是西班牙语老师。很高兴。",
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "Preséntate en español. Di tu nombre y de dónde eres.",
        preguntaChino: "用西班牙语自我介绍。说出你的名字和你来自哪里。",
        sugerencia: "你可以说：Me llamo... Soy de...",
        sugerenciaChino: "你可以说：Me llamo... Soy de...",
      },
      {
        id: "pa2",
        pregunta: "¿Cómo presentas a un amigo a otra persona?",
        preguntaChino: "你怎么把一个朋友介绍给另一个人？",
        sugerencia: "你可以说：Te presento a mi amigo/a...",
        sugerenciaChino: "你可以说：Te presento a mi amigo/a...",
      },
      {
        id: "pa3",
        pregunta: "¿Qué diferencias hay entre 'tú' y 'usted' en las presentaciones?",
        preguntaChino: "在自我介绍中，'tú' 和 'usted' 有什么区别？",
        sugerencia:
          "Tú es informal, para amigos y familia. Usted es formal, para jefes, mayores o desconocidos.",
        sugerenciaChino: "Tú 是非正式，用于朋友和家人。Usted 是正式，用于老板、长辈或陌生人。",
      },
      {
        id: "pa4",
        pregunta: "¿Qué preguntas puedes hacer para seguir una conversación después de presentarte?",
        preguntaChino: "自我介绍后，你可以问什么问题来继续对话？",
        sugerencia: "¿De dónde eres?, ¿A qué te dedicas?, ¿Cuánto tiempo llevas aquí?, ¿Te gusta la ciudad?",
        sugerenciaChino:
          "¿De dónde eres?, ¿A qué te dedicas?, ¿Cuánto tiempo llevas aquí?, ¿Te gusta la ciudad?",
      },
      {
        id: "pa5",
        pregunta: "¿Cómo te presentarías en una entrevista de trabajo?",
        preguntaChino: "在工作面试中你会怎么做自我介绍？",
        sugerencia:
          "Buenos días, me llamo [nombre]. Soy [profesión]. Vengo a la entrevista para el puesto de...",
        sugerenciaChino:
          "Buenos días, me llamo [nombre]. Soy [profesión]. Vengo a la entrevista para el puesto de...",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '我叫...' en español?",
        preguntaChino: "西班牙语中'我叫...'怎么说？",
        respuestaSugerida: "Me llamo...",
        respuestaSugeridaChino: "Me llamo...",
      },
      {
        id: "p2",
        pregunta: "¿Cómo presentas a un amigo?",
        preguntaChino: "你怎么介绍一个朋友？",
        respuestaSugerida: "Te presento a mi amigo...",
        respuestaSugeridaChino: "Te presento a mi amigo...",
      },
      {
        id: "p3",
        pregunta: "¿Qué dices cuando alguien te presenta?",
        preguntaChino: "当有人介绍你时，你说什么？",
        respuestaSugerida: "Mucho gusto / Encantado/a",
        respuestaSugeridaChino: "Mucho gusto / Encantado/a",
      },
      {
        id: "p4",
        pregunta: "¿Cuál es la diferencia entre '¿Cómo te llamas?' y '¿Cómo se llama usted?'?",
        preguntaChino: "'¿Cómo te llamas?' 和 '¿Cómo se llama usted?' 有什么区别？",
        respuestaSugerida: "El primero es informal, el segundo es formal.",
        respuestaSugeridaChino: "第一个是非正式，第二个是正式。",
      },
      {
        id: "p5",
        pregunta: "¿Cómo se dice '很高兴认识你' en español?",
        preguntaChino: "西班牙语中'很高兴认识你'怎么说？",
        respuestaSugerida: "Mucho gusto / Encantado/a de conocerte",
        respuestaSugeridaChino: "Mucho gusto / Encantado/a de conocerte",
      },
      {
        id: "p6",
        pregunta: "¿Qué significa 'El gusto es mío'?",
        preguntaChino: "'El gusto es mío' 是什么意思？",
        respuestaSugerida: "Es una respuesta educada a 'Mucho gusto'. Significa que el placer es mío.",
        respuestaSugeridaChino: "这是对'Mucho gusto'的有礼貌回答。意思是'荣幸的是我'。",
      },
      {
        id: "p7",
        pregunta: "¿Cómo se pregunta la profesión en español?",
        preguntaChino: "西班牙语中如何询问职业？",
        respuestaSugerida: "¿A qué te dedicas? / ¿En qué trabajas?",
        respuestaSugeridaChino: "¿A qué te dedicas? / ¿En qué trabajas?",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Números del 0 al 10",
        tituloChino: "数字0到10",
        descripcion: `Los números del 0 al 10 son fundamentales:

0 = cero (CER-o)
1 = uno (U-no)
2 = dos (dos)
3 = tres (tres)
4 = cuatro (CUA-tro)
5 = cinco (CIN-co)
6 = seis (seis)
7 = siete (SIE-te)
8 = ocho (O-cho)
9 = nueve (NUE-ve)
10 = diez (diez)

🔹 PRONUNCIACIÓN (acento en mayúsculas):
• Cero, Uno, Dos, Tres, Cuatro, Cinco, Seis, Siete, Ocho, Nueve, Diez

🔹 REGLA IMPORTANTE DE "UNO":
"Uno" cambia a "un" delante de sustantivo masculino:
• un libro (un libro)
• un perro (un perro)
• un año (un año)

"Uno" cambia a "una" delante de sustantivo femenino:
• una casa (una casa)
• una manzana (una manzana)
• una silla (una silla)

📌 EJEMPLOS PRÁCTICOS:
• Tengo un hermano. (Tengo un hermano)
• Tengo una hermana. (Tengo una hermana)
• Son las diez en punto. (Son las diez en punto)
• El número de la suerte es siete. (El número de la suerte es siete)

❌ ERROR COMÚN:
Decir "uno libro" en lugar de "un libro". Recuerda: "uno" solo se usa cuando el número está solo.`,
        descripcionChino: `0到10的数字是基础：

0 = cero
1 = uno
2 = dos
3 = tres
4 = cuatro
5 = cinco
6 = seis
7 = siete
8 = ocho
9 = nueve
10 = diez

🔹 发音提示：
• Cero, Uno, Dos, Tres, Cuatro, Cinco, Seis, Siete, Ocho, Nueve, Diez

🔹 "UNO" 的重要规则：
"Uno" 在阳性名词前变为 "un"：
• un libro = 一本书
• un perro = 一只狗
• un año = 一年

"Uno" 在阴性名词前变为 "una"：
• una casa = 一栋房子
• una manzana = 一个苹果
• una silla = 一把椅子

📌 实用例子：
• Tengo un hermano. = 我有一个兄弟。
• Tengo una hermana. = 我有一个姐妹。
• Son las diez en punto. = 现在是整十点。
• El número de la suerte es siete. = 幸运数字是七。

❌ 常见错误：
说 "uno libro" 而不是 "un libro"。记住："uno" 只在数字单独使用时使用。`,
        ejemplos: [
          {
            espanol: "Tengo un hermano.",
            chino: "我有一个兄弟。",
          },
          {
            espanol: "Tengo una hermana.",
            chino: "我有一个姐妹。",
          },
          {
            espanol: "Son las diez en punto.",
            chino: "现在是整十点。",
          },
          {
            espanol: "El número siete es mi favorito.",
            chino: "数字七是我的最爱。",
          },
          {
            espanol: "Cero grados.",
            chino: "零度。",
          },
          {
            espanol: "Cinco manzanas, por favor.",
            chino: "五个苹果，请。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Números del 11 al 20",
        tituloChino: "数字11到20",
        descripcion: `Los números del 11 al 20:

11 = once (ON-ce)
12 = doce (DO-ce)
13 = trece (TRE-ce)
14 = catorce (ca-TOR-ce)
15 = quince (QUIN-ce)
16 = dieciséis (die-ci-SEIS)
17 = diecisiete (die-ci-SIE-te)
18 = dieciocho (die-ci-O-cho)
19 = diecinueve (die-ci-NUE-ve)
20 = veinte (VEIN-te)

🔹 REGLAS DE FORMACIÓN:
• 11 al 15 → son palabras especiales (aprender de memoria)
• 16 al 19 → se forman con "dieci" + número (dieciséis, diecisiete, etc.)

📌 DETALLE IMPORTANTE:
Los números 16 al 19 se escriben en UNA SOLA PALABRA, no separados.
• Correcto: dieciséis
• Incorrecto: diez y seis

🔹 EJEMPLOS PRÁCTICOS:
• Tengo quince años. (Tengo quince años)
• Son las doce del mediodía. (Son las doce del mediodía)
• Necesito veinte euros. (Necesito veinte euros)
• La página diecisiete. (La página diecisiete)

❌ ERROR COMÚN:
Escribir "diez y seis" en lugar de "dieciséis". En español moderno, se escribe todo junto.`,
        descripcionChino: `11到20的数字：

11 = once
12 = doce
13 = trece
14 = catorce
15 = quince
16 = dieciséis
17 = diecisiete
18 = dieciocho
19 = diecinueve
20 = veinte

🔹 构成规则：
• 11到15 → 是特殊单词（需要记忆）
• 16到19 → 用 "dieci" + 数字构成

📌 重要细节：
16到19的数字写成一个词，不分开。
• 正确：dieciséis
• 错误：diez y seis

🔹 实用例子：
• Tengo quince años. = 我十五岁。
• Son las doce del mediodía. = 现在是中午十二点。
• Necesito veinte euros. = 我需要二十欧元。
• La página diecisiete. = 第十七页。

❌ 常见错误：
写 "diez y seis" 而不是 "dieciséis"。在现代西班牙语中，是连写的。`,
        ejemplos: [
          {
            espanol: "Tengo quince años.",
            chino: "我十五岁。",
          },
          {
            espanol: "Son las doce del mediodía.",
            chino: "现在是中午十二点。",
          },
          {
            espanol: "Necesito veinte euros.",
            chino: "我需要二十欧元。",
          },
          {
            espanol: "Vivo en el piso diecisiete.",
            chino: "我住在十七楼。",
          },
          {
            espanol: "La fiesta es a las once.",
            chino: "派对在十一点。",
          },
          {
            espanol: "El libro tiene catorce capítulos.",
            chino: "这本书有十四个章节。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Reglas importantes y usos de los números",
        tituloChino: "重要规则和数字的用法",
        descripcion: `🔹 REGLAS CLAVE:

1. "Uno" se convierte en "un" antes de sustantivo masculino.
   • un coche (un coche)
   • un año (un año)

2. "Uno" se convierte en "una" antes de sustantivo femenino.
   • una mesa (una mesa)
   • una flor (una flor)

3. Los números del 16 al 19 se escriben juntos (en una sola palabra).
   • dieciséis, diecisiete, dieciocho, diecinueve

4. Los números del 11 al 15 son especiales: once, doce, trece, catorce, quince.

5. Para preguntar la edad: ¿Cuántos años tienes?
   • Tengo + número + años

6. Para preguntar el precio: ¿Cuánto cuesta? / ¿Cuánto cuestan?
   • Cuesta + número + euros/dólares

🔹 USOS COMUNES DE LOS NÚMEROS:

• Edad: Tengo veinte años. (Tengo veinte años)
• Precio: Cuesta quince euros. (Cuesta quince euros)
• Hora: Son las diez. (Son las diez)
• Cantidad: Hay doce personas. (Hay doce personas)
• Dirección: Vivo en el número catorce. (Vivo en el número catorce)
• Página: Abre el libro por la página cinco. (Abre el libro por la página cinco)

📌 EXPRESIONES ÚTILES CON NÚMEROS:

• Uno a uno (one by one)
• De dos en dos (two by two)
• Por primera vez (for the first time)
• La primera vez (the first time)
• Cada dos días (every two days)
• Cada tres horas (every three hours)`,
        descripcionChino: `🔹 关键规则：

1. "Uno" 在阳性名词前变成 "un"。
2. "Uno" 在阴性名词前变成 "una"。
3. 16到19的数字是连写的。
4. 11到15是特殊形式：once, doce, trece, catorce, quince。
5. 询问年龄：¿Cuántos años tienes? → Tengo + 数字 + años
6. 询问价格：¿Cuánto cuesta? → Cuesta + 数字 + 欧元/美元

🔹 数字的常见用法：

• 年龄：Tengo veinte años. = 我二十岁。
• 价格：Cuesta quince euros. = 十五欧元。
• 时间：Son las diez. = 十点。
• 数量：Hay doce personas. = 有十二个人。
• 地址：Vivo en el número catorce. = 我住在十四号。
• 页码：Abre el libro por la página cinco. = 打开书第五页。

📌 有用的数字表达：

• Uno a uno = 一个接一个
• De dos en dos = 两个两个地
• Por primera vez = 第一次
• La primera vez = 第一次
• Cada dos días = 每两天
• Cada tres horas = 每三小时`,
        ejemplos: [
          {
            espanol: "un libro",
            chino: "一本书",
          },
          {
            espanol: "una silla",
            chino: "一把椅子",
          },
          {
            espanol: "diecisiete años",
            chino: "十七岁",
          },
          {
            espanol: "Por primera vez en España.",
            chino: "第一次在西班牙。",
          },
          {
            espanol: "Tomo medicina cada ocho horas.",
            chino: "我每八小时吃一次药。",
          },
          {
            espanol: "Los niños entraron de dos en dos.",
            chino: "孩子们两个两个地进来了。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Operaciones básicas con números",
        tituloChino: "数字的基本运算",
        descripcion: `🔹 SUMA (más):
• 1 + 1 = 2 → uno más uno son dos
• 5 + 3 = 8 → cinco más tres son ocho
• 10 + 7 = 17 → diez más siete son diecisiete

🔹 RESTA (menos):
• 5 - 2 = 3 → cinco menos dos son tres
• 10 - 4 = 6 → diez menos cuatro son seis
• 15 - 5 = 10 → quince menos cinco son diez

🔹 MULTIPLICACIÓN (por):
• 2 × 3 = 6 → dos por tres son seis
• 4 × 5 = 20 → cuatro por cinco son veinte
• 3 × 3 = 9 → tres por tres son nueve

🔹 DIVISIÓN (entre / dividido por):
• 10 ÷ 2 = 5 → diez entre dos son cinco
• 15 ÷ 3 = 5 → quince dividido por tres son cinco

🔹 CÓMO PREGUNTAR:
• ¿Cuánto es...? = ¿Cuánto es 5 + 3?
• ¿Cuánto son...? = ¿Cuánto son 5 y 3?
• ¿A cuánto equivalen...? = ¿A cuánto equivalen 10 y 10?`,
        descripcionChino: `🔹 加法 (más)：
• 1 + 1 = 2 → uno más uno son dos
• 5 + 3 = 8 → cinco más tres son ocho
• 10 + 7 = 17 → diez más siete son diecisiete

🔹 减法 (menos)：
• 5 - 2 = 3 → cinco menos dos son tres
• 10 - 4 = 6 → diez menos cuatro son seis
• 15 - 5 = 10 → quince menos cinco son diez

🔹 乘法 (por)：
• 2 × 3 = 6 → dos por tres son seis
• 4 × 5 = 20 → cuatro por cinco son veinte
• 3 × 3 = 9 → tres por tres son nueve

🔹 除法 (entre / dividido por)：
• 10 ÷ 2 = 5 → diez entre dos son cinco
• 15 ÷ 3 = 5 → quince dividido por tres son cinco

🔹 如何提问：
• ¿Cuánto es...? = ...等于多少？
• ¿Cuánto son...? = ...是多少？
• ¿A cuánto equivalen...? = ...相当于多少？`,
        ejemplos: [
          {
            espanol: "¿Cuánto es 5 + 7? —Doce.",
            chino: "5加7等于多少？—十二。",
          },
          {
            espanol: "Diez menos tres son siete.",
            chino: "十减三等于七。",
          },
          {
            espanol: "Tres por cinco son quince.",
            chino: "三乘以五等于十五。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "cero",
        chino: "零",
        ejemplo: "La temperatura es cero grados.",
      },
      {
        id: "v2",
        espanol: "uno / un / una",
        chino: "一",
        ejemplo: "Tengo un hermano. Tengo una hermana.",
      },
      {
        id: "v3",
        espanol: "dos",
        chino: "二",
        ejemplo: "Dos cafés, por favor.",
      },
      {
        id: "v4",
        espanol: "tres",
        chino: "三",
        ejemplo: "Tengo tres hermanos.",
      },
      {
        id: "v5",
        espanol: "cuatro",
        chino: "四",
        ejemplo: "Cuatro estaciones.",
      },
      {
        id: "v6",
        espanol: "cinco",
        chino: "五",
        ejemplo: "Cinco dedos en la mano.",
      },
      {
        id: "v7",
        espanol: "seis",
        chino: "六",
        ejemplo: "Seis días a la semana.",
      },
      {
        id: "v8",
        espanol: "siete",
        chino: "七",
        ejemplo: "Siete días tiene la semana.",
      },
      {
        id: "v9",
        espanol: "ocho",
        chino: "八",
        ejemplo: "Ocho horas de sueño.",
      },
      {
        id: "v10",
        espanol: "nueve",
        chino: "九",
        ejemplo: "Nueve vidas tiene un gato.",
      },
      {
        id: "v11",
        espanol: "diez",
        chino: "十",
        ejemplo: "Diez minutos más, por favor.",
      },
      {
        id: "v12",
        espanol: "once, doce, trece, catorce, quince",
        chino: "11,12,13,14,15",
        ejemplo: "Tengo quince años.",
      },
      {
        id: "v13",
        espanol: "dieciséis, diecisiete, dieciocho, diecinueve",
        chino: "16,17,18,19",
        ejemplo: "Tengo dieciocho años.",
      },
      {
        id: "v14",
        espanol: "veinte",
        chino: "二十",
        ejemplo: "Necesito veinte euros.",
      },
      {
        id: "v15",
        espanol: "número",
        chino: "数字",
        ejemplo: "El número siete.",
      },
      {
        id: "v16",
        espanol: "años",
        chino: "岁/年",
        ejemplo: "Tengo diez años.",
      },
      {
        id: "v17",
        espanol: "edad",
        chino: "年龄",
        ejemplo: "¿Cuál es tu edad?",
      },
      {
        id: "v18",
        espanol: "cantidad",
        chino: "数量",
        ejemplo: "Una gran cantidad.",
      },
      {
        id: "v19",
        espanol: "más",
        chino: "加",
        ejemplo: "Cinco más tres son ocho.",
      },
      {
        id: "v20",
        espanol: "menos",
        chino: "减",
        ejemplo: "Diez menos cuatro son seis.",
      },
      {
        id: "v21",
        espanol: "por",
        chino: "乘以",
        ejemplo: "Tres por cinco son quince.",
      },
      {
        id: "v22",
        espanol: "entre / dividido por",
        chino: "除以",
        ejemplo: "Diez entre dos son cinco.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "En la tienda",
        tituloChino: "在商店",
        personajes: ["Cliente", "Vendedor"],
        lineas: [
          {
            personaje: "Cliente",
            texto: "Buenos días. ¿Cuánto cuesta este libro?",
            traduccion: "早上好。这本书多少钱？",
          },
          {
            personaje: "Vendedor",
            texto: "Cuesta quince euros.",
            traduccion: "十五欧元。",
          },
          {
            personaje: "Cliente",
            texto: "¿Y estos cuadernos?",
            traduccion: "这些笔记本呢？",
          },
          {
            personaje: "Vendedor",
            texto: "Cada uno cuesta dos euros.",
            traduccion: "每个两欧元。",
          },
          {
            personaje: "Cliente",
            texto: "Perfecto. Quiero tres cuadernos y el libro.",
            traduccion: "很好。我要三个笔记本和这本书。",
          },
          {
            personaje: "Vendedor",
            texto: "Son veintiún euros en total.",
            traduccion: "总共二十一欧元。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Preguntando la edad",
        tituloChino: "询问年龄",
        personajes: ["Ana", "Luis"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Hola Luis, ¿cuántos años tienes?",
            traduccion: "你好路易斯，你多大了？",
          },
          {
            personaje: "Luis",
            texto: "Tengo diecinueve años. ¿Y tú?",
            traduccion: "我十九岁。你呢？",
          },
          {
            personaje: "Ana",
            texto: "Yo tengo veinte. Soy un poco mayor.",
            traduccion: "我二十岁。我大一点。",
          },
          {
            personaje: "Luis",
            texto: "¿En qué mes cumples años?",
            traduccion: "你哪个月过生日？",
          },
          {
            personaje: "Ana",
            texto: "En marzo. El quince de marzo.",
            traduccion: "三月。三月十五日。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "En la clase de matemáticas",
        tituloChino: "在数学课上",
        personajes: ["Profesor", "Estudiante"],
        lineas: [
          {
            personaje: "Profesor",
            texto: "¿Cuánto es cinco más siete?",
            traduccion: "五加七等于多少？",
          },
          {
            personaje: "Estudiante",
            texto: "Cinco más siete son doce.",
            traduccion: "五加七等于十二。",
          },
          {
            personaje: "Profesor",
            texto: "Muy bien. ¿Y diez menos tres?",
            traduccion: "很好。十减三呢？",
          },
          {
            personaje: "Estudiante",
            texto: "Diez menos tres son siete.",
            traduccion: "十减三等于七。",
          },
          {
            personaje: "Profesor",
            texto: "Perfecto. ¿Y tres por cinco?",
            traduccion: "完美。三乘以五呢？",
          },
          {
            personaje: "Estudiante",
            texto: "Tres por cinco son quince.",
            traduccion: "三乘以五等于十五。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "En una fiesta de cumpleaños",
        tituloChino: "在生日派对上",
        personajes: ["Madre", "Hija", "Invitado"],
        lineas: [
          {
            personaje: "Madre",
            texto: "¡Feliz cumpleaños, hija! Ahora tienes catorce años.",
            traduccion: "生日快乐，女儿！你现在十四岁了。",
          },
          {
            personaje: "Hija",
            texto: "¡Gracias, mamá! ¡Qué emoción!",
            traduccion: "谢谢妈妈！好激动啊！",
          },
          {
            personaje: "Invitado",
            texto: "¿Cuántas velas hay en la tarta?",
            traduccion: "蛋糕上有多少根蜡烛？",
          },
          {
            personaje: "Hija",
            texto: "Catorce velas, una por cada año.",
            traduccion: "十四根蜡烛，每年一根。",
          },
          {
            personaje: "Invitado",
            texto: "Entonces tienes catorce años, ¿verdad?",
            traduccion: "那么你十四岁，对吗？",
          },
          {
            personaje: "Hija",
            texto: "¡Sí! Dentro de seis años tendré veinte.",
            traduccion: "是的！六年后我就二十岁了。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "En el restaurante (pidiendo comida)",
        tituloChino: "在餐厅（点餐）",
        personajes: ["Cliente", "Camarero"],
        lineas: [
          {
            personaje: "Camarero",
            texto: "Buenas noches. ¿Qué van a tomar?",
            traduccion: "晚上好。你们要点什么？",
          },
          {
            personaje: "Cliente",
            texto: "Para mí, una ensalada y un filete.",
            traduccion: "给我一份沙拉和一个牛排。",
          },
          {
            personaje: "Camarero",
            texto: "¿Qué tipo de filete? Tenemos de ternera y de pollo.",
            traduccion: "什么类型的牛排？我们有牛肉和鸡肉。",
          },
          {
            personaje: "Cliente",
            texto: "De ternera, por favor. ¿Cuánto cuesta?",
            traduccion: "牛肉，请。多少钱？",
          },
          {
            personaje: "Camarero",
            texto: "Son dieciocho euros el filete. ¿Algo más?",
            traduccion: "牛排十八欧元。还要别的吗？",
          },
          {
            personaje: "Cliente",
            texto: "Y una botella de agua. ¿Cuánto es en total?",
            traduccion: "还有一瓶水。总共多少钱？",
          },
          {
            personaje: "Camarero",
            texto: "Veinte euros con cincuenta.",
            traduccion: "二十欧元五十。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "9后面的数字是：_____",
          preguntaChino: "9后面的数字是：_____",
          respuestaCorrecta: "diez",
          explicacion: "9（nueve）之后是10（diez）。",
          pista: "首字母是 d，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c2",
          pregunta: "5 + 7 = _____",
          preguntaChino: "5 + 7 = _____",
          respuestaCorrecta: "doce",
          explicacion: "5 + 7 = 12，西班牙语是'doce'。",
          pista: "首字母是 d，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c3",
          pregunta: "14和16之间的数字是：_____",
          preguntaChino: "14和16之间的数字是：_____",
          respuestaCorrecta: "quince",
          explicacion: "14（catorce）和16（dieciséis）之间是15（quince）。",
          pista: "首字母是 q，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c4",
          pregunta: "18的西班牙语是：_____",
          preguntaChino: "18的西班牙语是：_____",
          respuestaCorrecta: "dieciocho",
          explicacion: "18 = dieciocho（10 + 8）。",
          pista: "首字母是 d，9个字母",
          numeroLetras: 9,
        },
        {
          id: "c5",
          pregunta: "数字3的西班牙语是：_____",
          preguntaChino: "数字3的西班牙语是：_____",
          respuestaCorrecta: "tres",
          explicacion: "3 = tres。",
          pista: "首字母是 t，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c6",
          pregunta: "数字13的西班牙语是：_____",
          preguntaChino: "数字13的西班牙语是：_____",
          respuestaCorrecta: "trece",
          explicacion: "13 = trece。",
          pista: "首字母是 t，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c7",
          pregunta: "数字0的西班牙语是：_____",
          preguntaChino: "数字0的西班牙语是：_____",
          respuestaCorrecta: "cero",
          explicacion: "0 = cero。",
          pista: "首字母是 c，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c8",
          pregunta: "数字20的西班牙语是：_____",
          preguntaChino: "数字20的西班牙语是：_____",
          respuestaCorrecta: "veinte",
          explicacion: "20 = veinte。",
          pista: "首字母是 v，6个字母",
          numeroLetras: 6,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "西班牙语中'15'怎么说？",
          preguntaChino: "西班牙语中'15'怎么说？",
          opciones: ["catorce", "trece", "quince", "dieciséis"],
          respuestaCorrecta: "quince",
          explicacion: "15在西班牙语中是'quince'。",
        },
        {
          id: "s2",
          pregunta: "哪个数字对应'veinte'？",
          preguntaChino: "哪个数字对应'veinte'？",
          opciones: ["12", "20", "10", "2"],
          respuestaCorrecta: "20",
          explicacion: "'Veinte'意思是20。",
        },
        {
          id: "s3",
          pregunta: "数字16是如何构成的？",
          preguntaChino: "数字16是如何构成的？",
          opciones: ["diez y seis", "dieciséis", "once", "seis y diez"],
          respuestaCorrecta: "dieciséis",
          explicacion: "16由'dieci' + 'seis'构成。",
        },
        {
          id: "s4",
          pregunta: "西班牙语中'0'怎么说？",
          preguntaChino: "西班牙语中'0'怎么说？",
          opciones: ["uno", "diez", "nada", "cero"],
          respuestaCorrecta: "cero",
          explicacion: "'Cero' = 0。",
        },
        {
          id: "s5",
          pregunta: "西班牙语中'11'怎么说？",
          preguntaChino: "西班牙语中'11'怎么说？",
          opciones: ["doce", "once", "trece", "catorce"],
          respuestaCorrecta: "once",
          explicacion: "11在西班牙语中是'once'。",
        },
        {
          id: "s6",
          pregunta: "如何说'我有一本书'？",
          preguntaChino: "如何说'我有一本书'？",
          opciones: ["Tengo uno libro", "Tengo una libro", "Tengo un libro", "Tengo libro"],
          respuestaCorrecta: "Tengo un libro",
          explicacion: "'Un'用于阳性名词'libro'前。",
        },
        {
          id: "s7",
          pregunta: "如何说'我十五岁'？",
          preguntaChino: "如何说'我十五岁'？",
          opciones: ["Tengo quince años", "Tengo quince año", "Tengo quince", "Tengo años quince"],
          respuestaCorrecta: "Tengo quince años",
          explicacion: "'Tener + número + años' = 年龄。",
        },
        {
          id: "s8",
          pregunta: "¿Cuánto es 8 × 2?",
          preguntaChino: "8 × 2 等于多少？",
          opciones: ["diez", "dieciséis", "dieciocho", "diecinueve"],
          respuestaCorrecta: "dieciséis",
          explicacion: "8 × 2 = 16 = dieciséis。",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Uno'可以用在任何名词前。",
          preguntaChino: "'Uno'可以用在任何名词前。",
          respuestaCorrecta: false,
          explicacion: "错。'Uno'根据性别变为'un'或'una'。",
        },
        {
          id: "vf2",
          pregunta: "'Diecisiete'意思是17。",
          preguntaChino: "'Diecisiete'意思是17。",
          respuestaCorrecta: true,
          explicacion: "对。'Diecisiete' = 10 + 7 = 17。",
        },
        {
          id: "vf3",
          pregunta: "数字11在西班牙语中说'onze'。",
          preguntaChino: "数字11在西班牙语中说'onze'。",
          respuestaCorrecta: false,
          explicacion: "错。11是'once'，不是'onze'。",
        },
        {
          id: "vf4",
          pregunta: "'Quince'意思是15。",
          preguntaChino: "'Quince'意思是15。",
          respuestaCorrecta: true,
          explicacion: "对。'Quince' = 15。",
        },
        {
          id: "vf5",
          pregunta: "16到19的数字是分开写的。",
          preguntaChino: "16到19的数字是分开写的。",
          respuestaCorrecta: false,
          explicacion: "错。16-19是连写的。",
        },
        {
          id: "vf6",
          pregunta: "'Veinte' es el número 20.",
          preguntaChino: "'Veinte'是数字20。",
          respuestaCorrecta: true,
          explicacion: "对。Veinte = 20。",
        },
        {
          id: "vf7",
          pregunta: "Para decir '12', decimos 'doce'.",
          preguntaChino: "为了说'12'，我们说'doce'。",
          respuestaCorrecta: true,
          explicacion: "对。Doce = 12。",
        },
        {
          id: "vf8",
          pregunta: "数字14是'trece'。",
          preguntaChino: "数字14是'trece'。",
          respuestaCorrecta: false,
          explicacion: "错。14 = catorce, 13 = trece。",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "cinco",
              derecha: "5",
            },
            {
              izquierda: "doce",
              derecha: "12",
            },
            {
              izquierda: "quince",
              derecha: "15",
            },
            {
              izquierda: "veinte",
              derecha: "20",
            },
            {
              izquierda: "siete",
              derecha: "7",
            },
            {
              izquierda: "dieciocho",
              derecha: "18",
            },
            {
              izquierda: "tres",
              derecha: "3",
            },
            {
              izquierda: "cero",
              derecha: "0",
            },
            {
              izquierda: "once",
              derecha: "11",
            },
            {
              izquierda: "catorce",
              derecha: "14",
            },
          ],
          explicacion: "将西班牙语数字与数字配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["cinco", "tengo", "años", "."],
          respuestaCorrecta: "Tengo cinco años.",
          explicacion: "正确的顺序是：Tengo cinco años.（我五岁。）",
        },
        {
          id: "o2",
          palabras: ["euros", "doce", "cuesta", "."],
          respuestaCorrecta: "Cuesta doce euros.",
          explicacion: "正确的顺序是：Cuesta doce euros.（十二欧元。）",
        },
        {
          id: "o3",
          palabras: ["manzanas", "tres", "quiero", "."],
          respuestaCorrecta: "Quiero tres manzanas.",
          explicacion: "正确的顺序是：Quiero tres manzanas.（我要三个苹果。）",
        },
        {
          id: "o4",
          palabras: ["las", "diez", "son", "."],
          respuestaCorrecta: "Son las diez.",
          explicacion: "正确的顺序是：Son las diez.（十点。）",
        },
        {
          id: "o5",
          palabras: ["años", "diecisiete", "tiene", "Ella", "."],
          respuestaCorrecta: "Ella tiene diecisiete años.",
          explicacion: "正确的顺序是：Ella tiene diecisiete años.（她十七岁。）",
        },
        {
          id: "o6",
          palabras: ["dos", "son", "ocho", "Cuatro", "por", "."],
          respuestaCorrecta: "Cuatro por dos son ocho.",
          explicacion: "正确的顺序是：Cuatro por dos son ocho.（四乘以二等于八。）",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我有十五个苹果。",
          respuestaEsperada: "Tengo quince manzanas.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "这本书二十欧元。",
          respuestaEsperada: "Este libro cuesta veinte euros.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "她八岁。",
          respuestaEsperada: "Ella tiene ocho años.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "我要三个橙子。",
          respuestaEsperada: "Quiero tres naranjas.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "十二加八等于二十。",
          respuestaEsperada: "Doce más ocho son veinte.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "我住在那不勒斯，十三号。",
          respuestaEsperada: "Vivo en el número trece, Nápoles.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "六乘三等于十八。",
          respuestaEsperada: "Seis por tres son dieciocho.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "我需要二十支笔。",
          respuestaEsperada: "Necesito veinte bolígrafos.",
          explicacion: "西班牙语翻译",
        },
      ],
    },
    ejerciciosPracticos: [
      {
        id: "ep1",
        tipo: "completarDialogo",
        titulo: "完成对话",
        tituloChino: "完成对话",
        instruccion: "用正确的数字完成对话。",
        instruccionChino: "用正确的数字完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿Cuántos años tienes?",
            respuesta: "",
          },
          {
            personaje: "B",
            texto: "Tengo _____ años. ¿Y tú?",
            respuesta: "doce / trece / catorce / quince",
          },
          {
            personaje: "A",
            texto: "Yo tengo _____ años.",
            respuesta: "dieciséis / diecisiete / dieciocho",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "operaciones",
        titulo: "Calcula en español",
        tituloChino: "用西班牙语计算",
        instruccion: "Escribe el resultado de estas operaciones en español.",
        instruccionChino: "用西班牙语写出这些运算的结果。",
        operaciones: [
          {
            operacion: "4 + 6 =",
            resultado: "diez",
          },
          {
            operacion: "15 - 3 =",
            resultado: "doce",
          },
          {
            operacion: "3 × 5 =",
            resultado: "quince",
          },
          {
            operacion: "20 - 8 =",
            resultado: "doce",
          },
          {
            operacion: "7 + 7 =",
            resultado: "catorce",
          },
          {
            operacion: "18 ÷ 2 =",
            resultado: "nueve",
          },
          {
            operacion: "10 + 10 =",
            resultado: "veinte",
          },
          {
            operacion: "19 - 7 =",
            resultado: "doce",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "traducirNumeros",
        titulo: "Traduce los números",
        tituloChino: "翻译数字",
        instruccion: "Escribe los siguientes números en español.",
        instruccionChino: "用西班牙语写出以下数字。",
        numeros: [
          {
            numero: 1,
            espanol: "uno",
          },
          {
            numero: 4,
            espanol: "cuatro",
          },
          {
            numero: 7,
            espanol: "siete",
          },
          {
            numero: 11,
            espanol: "once",
          },
          {
            numero: 13,
            espanol: "trece",
          },
          {
            numero: 16,
            espanol: "dieciséis",
          },
          {
            numero: 19,
            espanol: "diecinueve",
          },
          {
            numero: 20,
            espanol: "veinte",
          },
        ],
      },
      {
        id: "ep4",
        tipo: "completarTabla",
        titulo: "Completa la tabla",
        tituloChino: "完成表格",
        instruccion: "Escribe el número en español.",
        instruccionChino: "用西班牙语写出数字。",
        tabla: [
          {
            numero: 2,
            espanol: "dos",
          },
          {
            numero: 5,
            espanol: "cinco",
          },
          {
            numero: 8,
            espanol: "ocho",
          },
          {
            numero: 10,
            espanol: "diez",
          },
          {
            numero: 12,
            espanol: "doce",
          },
          {
            numero: 14,
            espanol: "catorce",
          },
          {
            numero: 17,
            espanol: "diecisiete",
          },
        ],
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Cuántos años tienes? Responde en español.",
        preguntaChino: "你多大了？用西班牙语回答。",
        sugerencia: "你可以说：Tengo ___ años.",
        sugerenciaChino: "你可以说：Tengo ___ años.",
      },
      {
        id: "pa2",
        pregunta: "Escribe los números del 1 al 10 en español.",
        preguntaChino: "用西班牙语写出1到10的数字。",
        sugerencia: "uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez",
        sugerenciaChino: "uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez",
      },
      {
        id: "pa3",
        pregunta: "Escribe los números del 11 al 20 en español.",
        preguntaChino: "用西班牙语写出11到20的数字。",
        sugerencia:
          "once, doce, trece, catorce, quince, dieciséis, diecisiete, dieciocho, diecinueve, veinte",
        sugerenciaChino:
          "once, doce, trece, catorce, quince, dieciséis, diecisiete, dieciocho, diecinueve, veinte",
      },
      {
        id: "pa4",
        pregunta: "¿Cuál es la diferencia entre 'uno', 'un' y 'una'?",
        preguntaChino: "'uno'、'un'和'una'有什么区别？",
        sugerencia: "Uno es el número. Un se usa para masculino. Una se usa para femenino.",
        sugerenciaChino: "Uno是数字。Un用于阳性名词。Una用于阴性名词。",
      },
      {
        id: "pa5",
        pregunta: "Di tu edad y cuántos hermanos tienes en español.",
        preguntaChino: "用西班牙语说出你的年龄和你有多少个兄弟姐妹。",
        sugerencia: "Tengo ___ años. Tengo ___ hermanos.",
        sugerenciaChino: "Tengo ___ años. Tengo ___ hermanos.",
      },
      {
        id: "pa6",
        pregunta: "¿Cómo se pregunta el precio de algo en español?",
        preguntaChino: "西班牙语中如何询问某物的价格？",
        sugerencia: "¿Cuánto cuesta? / ¿Cuánto cuestan?",
        sugerenciaChino: "¿Cuánto cuesta? / ¿Cuánto cuestan?",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '5' en español?",
        preguntaChino: "西班牙语中'5'怎么说？",
        respuestaSugerida: "cinco",
        respuestaSugeridaChino: "cinco",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '12' en español?",
        preguntaChino: "西班牙语中'12'怎么说？",
        respuestaSugerida: "doce",
        respuestaSugeridaChino: "doce",
      },
      {
        id: "p3",
        pregunta: "¿Qué significa 'diecisiete'?",
        preguntaChino: "'diecisiete'是什么意思？",
        respuestaSugerida: "17",
        respuestaSugeridaChino: "17",
      },
      {
        id: "p4",
        pregunta: "¿Cómo se dice '我有一本书' en español?",
        preguntaChino: "西班牙语中'我有一本书'怎么说？",
        respuestaSugerida: "Tengo un libro.",
        respuestaSugeridaChino: "Tengo un libro.",
      },
      {
        id: "p5",
        pregunta: "¿Cuándo usas 'un' y cuándo usas 'una'?",
        preguntaChino: "什么时候用'un'，什么时候用'una'？",
        respuestaSugerida: "Un para masculino, una para femenino.",
        respuestaSugeridaChino: "Un用于阳性名词，una用于阴性名词。",
      },
      {
        id: "p6",
        pregunta: "¿Cómo se dice '20' en español?",
        preguntaChino: "西班牙语中'20'怎么说？",
        respuestaSugerida: "veinte",
        respuestaSugeridaChino: "veinte",
      },
      {
        id: "p7",
        pregunta: "¿Cuál es el resultado de 'diez más diez'?",
        preguntaChino: "'diez más diez'的结果是什么？",
        respuestaSugerida: "veinte",
        respuestaSugeridaChino: "veinte",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Decenas del 20 al 100",
        tituloChino: "20到100的整十数",
        descripcion: `Las decenas en español:

20 = veinte (VEIN-te)
30 = treinta (TREIN-ta)
40 = cuarenta (cua-REN-ta)
50 = cincuenta (cin-CUEN-ta)
60 = sesenta (se-SEN-ta)
70 = setenta (se-TEN-ta)
80 = ochenta (o-CHEN-ta)
90 = noventa (no-VEN-ta)
100 = cien (cien)

🔹 REGLAS DE FORMACIÓN PARA NÚMEROS INTERMEDIOS:

📌 NÚMEROS DEL 21 AL 29 (se escriben juntos en una sola palabra):
• 21 = veintiuno
• 22 = veintidós
• 23 = veintitrés
• 24 = veinticuatro
• 25 = veinticinco
• 26 = veintiséis
• 27 = veintisiete
• 28 = veintiocho
• 29 = veintinueve

📌 NÚMEROS DEL 31 AL 99 (se escriben con "y" entre decena y unidad):
• 31 = treinta y uno
• 32 = treinta y dos
• 33 = treinta y tres
• 34 = treinta y cuatro
• 35 = treinta y cinco
... y así sucesivamente.

📌 EJEMPLOS:
• 42 = cuarenta y dos
• 55 = cincuenta y cinco
• 67 = sesenta y siete
• 78 = setenta y ocho
• 89 = ochenta y nueve
• 99 = noventa y nueve`,
        descripcionChino: `西班牙语中的整十数：

20 = veinte
30 = treinta
40 = cuarenta
50 = cincuenta
60 = sesenta
70 = setenta
80 = ochenta
90 = noventa
100 = cien

🔹 中间数字的构成规则：

📌 21到29的数字（连写成一个词）：
• 21 = veintiuno
• 22 = veintidós
• 23 = veintitrés
• 24 = veinticuatro
• 25 = veinticinco
• 26 = veintiséis
• 27 = veintisiete
• 28 = veintiocho
• 29 = veintinueve

📌 31到99的数字（用 "y" 连接十位和个位）：
• 31 = treinta y uno
• 32 = treinta y dos
• 33 = treinta y tres
• 34 = treinta y cuatro
• 35 = treinta y cinco

📌 例子：
• 42 = cuarenta y dos
• 55 = cincuenta y cinco
• 67 = sesenta y siete
• 78 = setenta y ocho
• 89 = ochenta y nueve
• 99 = noventa y nueve`,
        ejemplos: [
          {
            espanol: "Tengo veinticinco años.",
            chino: "我二十五岁。",
          },
          {
            espanol: "Son las cuarenta y cinco.",
            chino: "现在是四十五分。",
          },
          {
            espanol: "Cuesta sesenta euros.",
            chino: "六十欧元。",
          },
          {
            espanol: "Mi padre tiene cincuenta años.",
            chino: "我父亲五十岁。",
          },
          {
            espanol: "Setenta y siete es mi número favorito.",
            chino: "七十七是我最喜欢的数字。",
          },
          {
            espanol: "Ochenta y ocho, el número de la suerte en China.",
            chino: "八十八，中国的幸运数字。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Reglas especiales de los números",
        tituloChino: "数字的特殊规则",
        descripcion: `🔹 REGLA 1: Cambio de género en números terminados en "uno"

Veintiuno, treinta y uno, etc. cambian según el género del sustantivo:
• Masculino: veintiún años (veintiún + masculino)
• Femenino: veintiuna personas (veintiuna + femenino)

📌 EJEMPLOS:
• Veintiún estudiantes (21 estudiantes - masculino)
• Veintiuna manzanas (21 manzanas - femenino)
• Treinta y un libros (31 libros - masculino)
• Treinta y una sillas (31 sillas - femenino)

🔹 REGLA 2: "Cien" vs "Ciento"

• CIEN = se usa para EXACTAMENTE 100
  • cien euros (100 euros)
  • cien personas (100 personas)
  • cien años (100 años)

• CIENTO = se usa cuando hay otros números después
  • ciento uno (101)
  • ciento veinte (120)
  • ciento cincuenta (150)
  • ciento noventa y nueve (199)

🔹 REGLA 3: La "y" en números
• Se usa "y" solo entre decenas y unidades del 31 al 99
• No se usa "y" dentro de la misma decena (ej. veintiuno, no veinte y uno)
• No se usa "y" entre centenas y decenas (ej. ciento veinte, no ciento y veinte)

📌 COMPARACIÓN:
• Correcto: treinta y dos
• Incorrecto: treinta dos
• Correcto: veintidós
• Incorrecto: veinte y dos`,
        descripcionChino: `🔹 规则1：以 "uno" 结尾的数字的性别变化

Veintiuno, treinta y uno 等根据名词的性别变化：
• 阳性：veintiún años (veintiún + 阳性名词)
• 阴性：veintiuna personas (veintiuna + 阴性名词)

📌 例子：
• Veintiún estudiantes = 21个学生（阳性）
• Veintiuna manzanas = 21个苹果（阴性）
• Treinta y un libros = 31本书（阳性）
• Treinta y una sillas = 31把椅子（阴性）

🔹 规则2："Cien" vs "Ciento"

• CIEN = 用于正好100
  • cien euros = 100欧元
  • cien personas = 100人
  • cien años = 100年

• CIENTO = 当后面有其他数字时使用
  • ciento uno = 101
  • ciento veinte = 120
  • ciento cincuenta = 150
  • ciento noventa y nueve = 199

🔹 规则3：数字中的 "y"
• "y" 只用于31到99之间的十位和个位之间
• 不在同一十位内使用 "y"（如 veintiuno，而不是 veinte y uno）
• 不在百位和十位之间使用 "y"（如 ciento veinte，而不是 ciento y veinte）

📌 比较：
• 正确：treinta y dos
• 错误：treinta dos
• 正确：veintidós
• 错误：veinte y dos`,
        ejemplos: [
          {
            espanol: "Hay veintiún estudiantes.",
            chino: "有二十一个学生。",
          },
          {
            espanol: "Son ciento veinte páginas.",
            chino: "一百二十页。",
          },
          {
            espanol: "Tengo treinta y cinco años.",
            chino: "我三十五岁。",
          },
          {
            espanol: "Cien metros es una distancia corta.",
            chino: "一百米是个短距离。",
          },
          {
            espanol: "Ciento treinta personas asistieron.",
            chino: "一百三十人参加了。",
          },
          {
            espanol: "Veintiuna flores para ti.",
            chino: "二十一朵花给你。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Números del 100 al 199",
        tituloChino: "100到199的数字",
        descripcion: `🔹 CIEN y CIENTO:

100 = cien
101 = ciento uno
102 = ciento dos
103 = ciento tres
...
110 = ciento diez
111 = ciento once
112 = ciento doce
...
120 = ciento veinte
121 = ciento veintiuno
130 = ciento treinta
140 = ciento cuarenta
150 = ciento cincuenta
160 = ciento sesenta
170 = ciento setenta
180 = ciento ochenta
190 = ciento noventa
199 = ciento noventa y nueve

📌 NOTA IMPORTANTE:
• A partir de 200, usamos doscientos, trescientos, etc.
• No se dice "cien uno", sino "ciento uno"
• "Cien" solo se usa cuando el número es exactamente 100`,
        descripcionChino: `🔹 CIEN 和 CIENTO：

100 = cien
101 = ciento uno
102 = ciento dos
103 = ciento tres
...
110 = ciento diez
111 = ciento once
112 = ciento doce
...
120 = ciento veinte
121 = ciento veintiuno
130 = ciento treinta
140 = ciento cuarenta
150 = ciento cincuenta
160 = ciento sesenta
170 = ciento setenta
180 = ciento ochenta
190 = ciento noventa
199 = ciento noventa y nueve

📌 重要提示：
• 从200开始，使用 doscientos, trescientos 等
• 不说 "cien uno"，而是 "ciento uno"
• "Cien" 只在数字正好是100时使用`,
        ejemplos: [
          {
            espanol: "El libro tiene ciento veinte páginas.",
            chino: "这本书有一百二十页。",
          },
          {
            espanol: "Ciento cinco personas en la sala.",
            chino: "房间里有105个人。",
          },
          {
            espanol: "Cien años de soledad es un libro famoso.",
            chino: "《百年孤独》是一本著名的书。",
          },
          {
            espanol: "Ciento noventa y nueve es un número primo.",
            chino: "一百九十九是质数。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Usos prácticos de los números",
        tituloChino: "数字的实用用法",
        descripcion: `🔹 PRECIOS (precios):
• ¿Cuánto cuesta esto? — Cuesta treinta euros.
• El vestido cuesta ochenta y cinco euros.
• Las entradas cuestan veinticinco euros.

🔹 EDADES (edades):
• Mi abuela tiene ochenta y cinco años.
• Mi padre tiene cincuenta y cinco.
• Mi hermano menor tiene veintidós.

🔹 DIRECCIONES (direcciones):
• Vivo en la calle Mayor, número treinta y cuatro.
• El apartamento está en el piso veintiocho.

🔹 CANTIDADES (cantidades):
• Hay cuarenta y dos estudiantes en la clase.
• Necesito treinta y seis huevos para la receta.

🔹 TELÉFONOS (números de teléfono):
• Mi número es el 91 234 56 78.
• Se lee: noventa y uno, doscientos treinta y cuatro, cincuenta y seis, setenta y ocho

🔹 AÑOS (años):
• Nací en mil novecientos noventa y cinco (1995).
• Estamos en el año dos mil veinticuatro (2024)`,
        descripcionChino: `🔹 价格：
• ¿Cuánto cuesta esto? — Cuesta treinta euros. = 这个多少钱？—三十欧元。
• El vestido cuesta ochenta y cinco euros. = 这条裙子八十五欧元。
• Las entradas cuestan veinticinco euros. = 门票二十五欧元。

🔹 年龄：
• Mi abuela tiene ochenta y cinco años. = 我祖母八十五岁。
• Mi padre tiene cincuenta y cinco. = 我父亲五十五岁。
• Mi hermano menor tiene veintidós. = 我弟弟二十二岁。

🔹 地址：
• Vivo en la calle Mayor, número treinta y cuatro. = 我住在马约尔街34号。
• El apartamento está en el piso veintiocho. = 公寓在28楼。

🔹 数量：
• Hay cuarenta y dos estudiantes en la clase. = 班里有42个学生。
• Necesito treinta y seis huevos para la receta. = 做这个菜我需要36个鸡蛋。

🔹 电话号码：
• Mi número es el 91 234 56 78. = 我的号码是91 234 56 78。
• 读作：noventa y uno, doscientos treinta y cuatro, cincuenta y seis, setenta y ocho

🔹 年份：
• Nací en mil novecientos noventa y cinco (1995). = 我出生于1995年。
• Estamos en el año dos mil veinticuatro (2024). = 现在是2024年。`,
        ejemplos: [
          {
            espanol: "¿Cuánto cuestan los zapatos? — Cincuenta euros.",
            chino: "这双鞋多少钱？—五十欧元。",
          },
          {
            espanol: "Tengo treinta y siete años.",
            chino: "我三十七岁。",
          },
          {
            espanol: "Vivo en el número veintidós.",
            chino: "我住在二十二号。",
          },
          {
            espanol: "El año dos mil veinticuatro.",
            chino: "二零二四年。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "veinte",
        chino: "二十",
        ejemplo: "Son veinte euros.",
      },
      {
        id: "v2",
        espanol: "treinta",
        chino: "三十",
        ejemplo: "Tengo treinta años.",
      },
      {
        id: "v3",
        espanol: "cuarenta",
        chino: "四十",
        ejemplo: "Son las cuarenta.",
      },
      {
        id: "v4",
        espanol: "cincuenta",
        chino: "五十",
        ejemplo: "Mi padre tiene cincuenta años.",
      },
      {
        id: "v5",
        espanol: "sesenta",
        chino: "六十",
        ejemplo: "Sesenta minutos son una hora.",
      },
      {
        id: "v6",
        espanol: "setenta",
        chino: "七十",
        ejemplo: "Setenta y siete.",
      },
      {
        id: "v7",
        espanol: "ochenta",
        chino: "八十",
        ejemplo: "Ochenta euros.",
      },
      {
        id: "v8",
        espanol: "noventa",
        chino: "九十",
        ejemplo: "Noventa y nueve.",
      },
      {
        id: "v9",
        espanol: "cien / ciento",
        chino: "一百",
        ejemplo: "Cien personas. Ciento uno.",
      },
      {
        id: "v10",
        espanol: "veintiuno / veintiún / veintiuna",
        chino: "二十一",
        ejemplo: "Veintiún años. Veintiuna personas.",
      },
      {
        id: "v11",
        espanol: "treinta y uno / treinta y un / treinta y una",
        chino: "三十一",
        ejemplo: "Treinta y un días. Treinta y una noches.",
      },
      {
        id: "v12",
        espanol: "cuarenta y dos",
        chino: "四十二",
        ejemplo: "Cuarenta y dos estudiantes.",
      },
      {
        id: "v13",
        espanol: "cincuenta y tres",
        chino: "五十三",
        ejemplo: "Cincuenta y tres euros.",
      },
      {
        id: "v14",
        espanol: "sesenta y cuatro",
        chino: "六十四",
        ejemplo: "Sesenta y cuatro cuadros.",
      },
      {
        id: "v15",
        espanol: "setenta y cinco",
        chino: "七十五",
        ejemplo: "Setenta y cinco personas.",
      },
      {
        id: "v16",
        espanol: "ochenta y seis",
        chino: "八十六",
        ejemplo: "Ochenta y seis años.",
      },
      {
        id: "v17",
        espanol: "noventa y siete",
        chino: "九十七",
        ejemplo: "Noventa y siete grados.",
      },
      {
        id: "v18",
        espanol: "ciento ocho",
        chino: "一百零八",
        ejemplo: "Ciento ocho páginas.",
      },
      {
        id: "v19",
        espanol: "ciento veinte",
        chino: "一百二十",
        ejemplo: "Ciento veinte minutos.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "En el mercado",
        tituloChino: "在市场",
        personajes: ["Comprador", "Vendedor"],
        lineas: [
          {
            personaje: "Comprador",
            texto: "Buenos días. ¿Cuánto cuestan estas naranjas?",
            traduccion: "早上好。这些橙子多少钱？",
          },
          {
            personaje: "Vendedor",
            texto: "Trescientos pesos el kilo.",
            traduccion: "每公斤三百比索。",
          },
          {
            personaje: "Comprador",
            texto: "¿Y las manzanas?",
            traduccion: "苹果呢？",
          },
          {
            personaje: "Vendedor",
            texto: "Las manzanas cuestan doscientos cuarenta pesos.",
            traduccion: "苹果二百四十比索。",
          },
          {
            personaje: "Comprador",
            texto: "Perfecto. Dame dos kilos de naranjas y uno de manzanas.",
            traduccion: "很好。给我两公斤橙子和一公斤苹果。",
          },
          {
            personaje: "Vendedor",
            texto: "Son ochocientos cuarenta pesos en total.",
            traduccion: "总共八百四十比索。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Hablando de edades",
        tituloChino: "谈论年龄",
        personajes: ["María", "Pedro"],
        lineas: [
          {
            personaje: "María",
            texto: "Mi abuela tiene ochenta y cinco años.",
            traduccion: "我奶奶八十五岁。",
          },
          {
            personaje: "Pedro",
            texto: "¡Qué bien! Mi abuelo tiene setenta y dos.",
            traduccion: "真好！我爷爷七十二岁。",
          },
          {
            personaje: "María",
            texto: "¿Y tus padres?",
            traduccion: "你父母呢？",
          },
          {
            personaje: "Pedro",
            texto: "Mi padre tiene cincuenta y mi madre cuarenta y ocho.",
            traduccion: "我父亲五十岁，母亲四十八岁。",
          },
          {
            personaje: "María",
            texto: "Mi madre también tiene cuarenta y ocho.",
            traduccion: "我母亲也是四十八岁。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Comprando entradas para un concierto",
        tituloChino: "购买演唱会门票",
        personajes: ["Cliente", "Taquillero"],
        lineas: [
          {
            personaje: "Cliente",
            texto: "Buenas tardes. ¿Cuánto cuestan las entradas?",
            traduccion: "下午好。门票多少钱？",
          },
          {
            personaje: "Taquillero",
            texto: "Las entradas normales cuestan treinta y cinco euros.",
            traduccion: "普通票三十五欧元。",
          },
          {
            personaje: "Cliente",
            texto: "¿Y las VIP?",
            traduccion: "VIP票呢？",
          },
          {
            personaje: "Taquillero",
            texto: "Las VIP cuestan setenta y cinco euros.",
            traduccion: "VIP票七十五欧元。",
          },
          {
            personaje: "Cliente",
            texto: "Quiero dos normales y una VIP, por favor.",
            traduccion: "我要两张普通票和一张VIP票。",
          },
          {
            personaje: "Taquillero",
            texto: "Son ciento cuarenta y cinco euros en total.",
            traduccion: "总共一百四十五欧元。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "En la frutería",
        tituloChino: "在水果店",
        personajes: ["Cliente", "Frutero"],
        lineas: [
          {
            personaje: "Frutero",
            texto: "Buenos días, ¿qué le pongo?",
            traduccion: "早上好，您要什么？",
          },
          {
            personaje: "Cliente",
            texto: "Dos kilos de naranjas y tres de manzanas.",
            traduccion: "两公斤橙子和三公斤苹果。",
          },
          {
            personaje: "Frutero",
            texto: "Las naranjas están a dos euros el kilo y las manzanas a uno cincuenta.",
            traduccion: "橙子每公斤两欧元，苹果每公斤一欧元五十。",
          },
          {
            personaje: "Cliente",
            texto: "Entonces, ¿cuánto es en total?",
            traduccion: "那么，总共多少钱？",
          },
          {
            personaje: "Frutero",
            texto:
              "Dos kilos de naranjas son cuatro euros. Tres kilos de manzanas son cuatro euros cincuenta. Total: ocho euros cincuenta.",
            traduccion: "两公斤橙子是四欧元。三公斤苹果是四欧元五十。总计：八欧元五十。",
          },
          {
            personaje: "Cliente",
            texto: "Aquí tiene. Muchas gracias.",
            traduccion: "给您。非常感谢。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Celebrando un cumpleaños",
        tituloChino: "庆祝生日",
        personajes: ["Sofía", "Carlos"],
        lineas: [
          {
            personaje: "Sofía",
            texto: "Carlos, ¿cuántos años vas a cumplir?",
            traduccion: "卡洛斯，你几岁了？",
          },
          {
            personaje: "Carlos",
            texto: "Voy a cumplir treinta y tres. ¿Y tú?",
            traduccion: "我要满三十三岁了。你呢？",
          },
          {
            personaje: "Sofía",
            texto: "Yo cumplo veintiocho. ¡Dentro de cinco años tendré treinta y tres como tú!",
            traduccion: "我满二十八。五年后我就会像你一样三十三岁了！",
          },
          {
            personaje: "Carlos",
            texto: "¡Qué rápido pasa el tiempo! Recuerdo cuando tenías veintiuno.",
            traduccion: "时间过得好快！我记得你二十一岁的时候。",
          },
          {
            personaje: "Sofía",
            texto: "Sí, y yo recuerdo tus cuarenta.",
            traduccion: "是的，我还记得你的四十岁。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "30 + 20 = _____",
          preguntaChino: "30 + 20 = _____",
          respuestaCorrecta: "cincuenta",
          explicacion: "30 + 20 = 50，西班牙语是'cincuenta'。",
          pista: "首字母是 c，9个字母",
          numeroLetras: 9,
        },
        {
          id: "c2",
          pregunta: "60后面的整十数是：_____",
          preguntaChino: "60后面的整十数是：_____",
          respuestaCorrecta: "setenta",
          explicacion: "60（sesenta）之后是70（setenta）。",
          pista: "首字母是 s，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c3",
          pregunta: "100用西班牙语说是：_____",
          preguntaChino: "100用西班牙语说是：_____",
          respuestaCorrecta: "cien",
          explicacion: "100在西班牙语中是'cien'。",
          pista: "首字母是 c，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c4",
          pregunta: "35用西班牙语说是：_____",
          preguntaChino: "35用西班牙语说是：_____",
          respuestaCorrecta: "treinta y cinco",
          explicacion: "35 = treinta y cinco（中间有'y'）。",
          pista: "首字母是 t",
          numeroLetras: 14,
        },
        {
          id: "c5",
          pregunta: "22用西班牙语说是：_____",
          preguntaChino: "22用西班牙语说是：_____",
          respuestaCorrecta: "veintidós",
          explicacion: "22 = veintidós（连写）。",
          pista: "首字母是 v，8个字母",
          numeroLetras: 8,
        },
        {
          id: "c6",
          pregunta: "99用西班牙语说是：_____",
          preguntaChino: "99用西班牙语说是：_____",
          respuestaCorrecta: "noventa y nueve",
          explicacion: "99 = noventa y nueve。",
          pista: "首字母是 n",
          numeroLetras: 14,
        },
        {
          id: "c7",
          pregunta: "101用西班牙语说是：_____",
          preguntaChino: "101用西班牙语说是：_____",
          respuestaCorrecta: "ciento uno",
          explicacion: "101 = ciento uno（不是cien uno）。",
          pista: "首字母是 c",
          numeroLetras: 9,
        },
        {
          id: "c8",
          pregunta: "150用西班牙语说是：_____",
          preguntaChino: "150用西班牙语说是：_____",
          respuestaCorrecta: "ciento cincuenta",
          explicacion: "150 = ciento cincuenta。",
          pista: "首字母是 c",
          numeroLetras: 15,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "西班牙语中'45'怎么说？",
          preguntaChino: "西班牙语中'45'怎么说？",
          opciones: ["cuarenta y cinco", "cincuenta y cuatro", "cuarenta y cuatro", "cincuenta y cinco"],
          respuestaCorrecta: "cuarenta y cinco",
          explicacion: "45是'cuarenta y cinco'（中间有'y'）。",
        },
        {
          id: "s2",
          pregunta: "21的正确形式是什么？",
          preguntaChino: "21的正确形式是什么？",
          opciones: ["veinte y uno", "veintiún", "veintiuno", "veinte uno"],
          respuestaCorrecta: "veintiuno",
          explicacion: "21是'veintiuno'（连写）。",
        },
        {
          id: "s3",
          pregunta: "什么时候用'ciento'而不是'cien'？",
          preguntaChino: "什么时候用'ciento'而不是'cien'？",
          opciones: ["总是", "当后面还有其他数字时", "从不", "只用于钱"],
          respuestaCorrecta: "当后面还有其他数字时",
          explicacion: "当有其他数字时用'ciento'：ciento uno, ciento veinte。",
        },
        {
          id: "s4",
          pregunta: "西班牙语中'73'怎么说？",
          preguntaChino: "西班牙语中'73'怎么说？",
          opciones: ["setenta y tres", "setenta tres", "ochenta y tres", "setenta y dos"],
          respuestaCorrecta: "setenta y tres",
          explicacion: "73 = setenta y tres（有'y'）。",
        },
        {
          id: "s5",
          pregunta: "西班牙语中'99'怎么说？",
          preguntaChino: "西班牙语中'99'怎么说？",
          opciones: ["noventa y nueve", "noventa y nueva", "noventa nueve", "novena y nueve"],
          respuestaCorrecta: "noventa y nueve",
          explicacion: "99 = noventa y nueve。",
        },
        {
          id: "s6",
          pregunta: "如何说'一百二十'？",
          preguntaChino: "如何说'一百二十'？",
          opciones: ["cien veinte", "cien y veinte", "ciento veinte", "cien veinte y"],
          respuestaCorrecta: "ciento veinte",
          explicacion: "120 = ciento veinte。",
        },
        {
          id: "s7",
          pregunta: "如何说'二十一本书'（阳性）？",
          preguntaChino: "如何说'二十一本书'（阳性）？",
          opciones: ["veintiuna libros", "veintiún libros", "veintiuno libros", "veinte y un libros"],
          respuestaCorrecta: "veintiún libros",
          explicacion: "'Veintiún'用于阳性名词前。",
        },
        {
          id: "s8",
          pregunta: "正确的形式是：",
          preguntaChino: "正确的形式是：",
          opciones: ["treinta y dos", "treinta dos", "treinta ydos", "treintaydos"],
          respuestaCorrecta: "treinta y dos",
          explicacion: "正确的写法是'treinta y dos'。",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Veintiún'是21的阳性形式。",
          preguntaChino: "'Veintiún'是21的阳性形式。",
          respuestaCorrecta: true,
          explicacion: "对。'Veintiún'是阳性，'veintiuna'是阴性。",
        },
        {
          id: "vf2",
          pregunta: "31说'treinta uno'，没有'y'。",
          preguntaChino: "31说'treinta uno'，没有'y'。",
          respuestaCorrecta: false,
          explicacion: "错。31是'treinta y uno'（有'y'）。",
        },
        {
          id: "vf3",
          pregunta: "80说'ochenta'。",
          preguntaChino: "80说'ochenta'。",
          respuestaCorrecta: true,
          explicacion: "对。80 = ochenta。",
        },
        {
          id: "vf4",
          pregunta: "100说'ciento'。",
          preguntaChino: "100说'ciento'。",
          respuestaCorrecta: false,
          explicacion: "错。100说'cien'，除非后面有其他数字。",
        },
        {
          id: "vf5",
          pregunta: "21到29是连写的。",
          preguntaChino: "21到29是连写的。",
          respuestaCorrecta: true,
          explicacion: "对。veintiuno, veintidós等都是连写的。",
        },
        {
          id: "vf6",
          pregunta: "199说'cien noventa y nueve'。",
          preguntaChino: "199说'cien noventa y nueve'。",
          respuestaCorrecta: false,
          explicacion: "错。199 = ciento noventa y nueve。",
        },
        {
          id: "vf7",
          pregunta: "'Cien' se usa cuando el número es exactamente 100.",
          preguntaChino: "'Cien'在数字正好是100时使用。",
          respuestaCorrecta: true,
          explicacion: "对。Cien personas = 100人。",
        },
        {
          id: "vf8",
          pregunta: "Los números del 31 al 99 se escriben sin 'y'.",
          preguntaChino: "31到99的数字不用'y'。",
          respuestaCorrecta: false,
          explicacion: "错。31-99用'y'连接：treinta y dos。",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "treinta",
              derecha: "30",
            },
            {
              izquierda: "cincuenta",
              derecha: "50",
            },
            {
              izquierda: "setenta",
              derecha: "70",
            },
            {
              izquierda: "noventa",
              derecha: "90",
            },
            {
              izquierda: "veintidós",
              derecha: "22",
            },
            {
              izquierda: "treinta y cinco",
              derecha: "35",
            },
            {
              izquierda: "ochenta y seis",
              derecha: "86",
            },
            {
              izquierda: "cien",
              derecha: "100",
            },
            {
              izquierda: "ciento veinte",
              derecha: "120",
            },
            {
              izquierda: "ciento cincuenta",
              derecha: "150",
            },
          ],
          explicacion: "将西班牙语数字与数字配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["treinta", "tengo", "años", "."],
          respuestaCorrecta: "Tengo treinta años.",
          explicacion: "正确的顺序是：Tengo treinta años.（我三十岁。）",
        },
        {
          id: "o2",
          palabras: ["cincuenta", "euros", "cuesta", "."],
          respuestaCorrecta: "Cuesta cincuenta euros.",
          explicacion: "正确的顺序是：Cuesta cincuenta euros.（五十欧元。）",
        },
        {
          id: "o3",
          palabras: ["y", "cinco", "treinta", "años", "tengo"],
          respuestaCorrecta: "Tengo treinta y cinco años.",
          explicacion: "正确的顺序是：Tengo treinta y cinco años.（我三十五岁。）",
        },
        {
          id: "o4",
          palabras: ["veintiún", "estudiantes", "hay", "."],
          respuestaCorrecta: "Hay veintiún estudiantes.",
          explicacion: "正确的顺序是：Hay veintiún estudiantes.（有二十一个学生。）",
        },
        {
          id: "o5",
          palabras: ["ciento", "ochenta", "son", "Las", "entradas", "euros", "."],
          respuestaCorrecta: "Las entradas son ciento ochenta euros.",
          explicacion: "正确的顺序是：Las entradas son ciento ochenta euros.（门票一百八十欧元。）",
        },
        {
          id: "o6",
          palabras: ["y", "ocho", "cuarenta", "son", "cuarenta", "?"],
          respuestaCorrecta: "¿Cuarenta y ocho son cuarenta?",
          explicacion: "正确的顺序是：¿Cuarenta y ocho son cuarenta?（四十八等于四十吗？）",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我有三十三岁。",
          respuestaEsperada: "Tengo treinta y tres años.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "这本书五十二欧元。",
          respuestaEsperada: "Este libro cuesta cincuenta y dos euros.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "这里有一百个人。",
          respuestaEsperada: "Hay cien personas aquí.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "我奶奶七十八岁。",
          respuestaEsperada: "Mi abuela tiene setenta y ocho años.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "八十六加十四等于一百。",
          respuestaEsperada: "Ochenta y seis más catorce son cien.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "一百二十公斤的西瓜。",
          respuestaEsperada: "Ciento veinte kilos de sandías.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "我需要九十九个气球。",
          respuestaEsperada: "Necesito noventa y nueve globos.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "他们四十一个人。",
          respuestaEsperada: "Ellos son cuarenta y una personas.",
          explicacion: "西班牙语翻译",
        },
      ],
    },
    ejerciciosPracticos: [
      {
        id: "ep1",
        tipo: "completarDialogo",
        titulo: "完成对话",
        tituloChino: "完成对话",
        instruccion: "用正确的数字完成对话。",
        instruccionChino: "用正确的数字完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿Cuántos años tiene tu abuela?",
            respuesta: "",
          },
          {
            personaje: "B",
            texto: "Mi abuela tiene _____ años.",
            respuesta: "setenta / ochenta / noventa",
          },
          {
            personaje: "A",
            texto: "¿Y tu abuelo?",
            respuesta: "",
          },
          {
            personaje: "B",
            texto: "Mi abuelo tiene _____ años.",
            respuesta: "setenta y cinco / ochenta y dos / noventa y tres",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "operaciones",
        titulo: "Calcula en español",
        tituloChino: "用西班牙语计算",
        instruccion: "Escribe el resultado de estas operaciones en español.",
        instruccionChino: "用西班牙语写出这些运算的结果。",
        operaciones: [
          {
            operacion: "25 + 30 =",
            resultado: "cincuenta y cinco",
          },
          {
            operacion: "60 - 15 =",
            resultado: "cuarenta y cinco",
          },
          {
            operacion: "40 + 20 =",
            resultado: "sesenta",
          },
          {
            operacion: "90 - 30 =",
            resultado: "sesenta",
          },
          {
            operacion: "50 + 25 =",
            resultado: "setenta y cinco",
          },
          {
            operacion: "100 - 20 =",
            resultado: "ochenta",
          },
          {
            operacion: "35 + 42 =",
            resultado: "setenta y siete",
          },
          {
            operacion: "89 - 34 =",
            resultado: "cincuenta y cinco",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "escribir",
        titulo: "Escribe los números",
        tituloChino: "写数字",
        instruccion: "Escribe los siguientes números en español.",
        instruccionChino: "用西班牙语写出以下数字。",
        numeros: [
          {
            numero: 27,
            espanol: "veintisiete",
          },
          {
            numero: 34,
            espanol: "treinta y cuatro",
          },
          {
            numero: 46,
            espanol: "cuarenta y seis",
          },
          {
            numero: 58,
            espanol: "cincuenta y ocho",
          },
          {
            numero: 61,
            espanol: "sesenta y uno",
          },
          {
            numero: 79,
            espanol: "setenta y nueve",
          },
          {
            numero: 82,
            espanol: "ochenta y dos",
          },
          {
            numero: 94,
            espanol: "noventa y cuatro",
          },
          {
            numero: 100,
            espanol: "cien",
          },
          {
            numero: 125,
            espanol: "ciento veinticinco",
          },
        ],
      },
      {
        id: "ep4",
        tipo: "completarTabla",
        title: "Completa la tabla de números",
        tituloChino: "完成数字表格",
        instruccion: "Escribe el número que falta en español.",
        instruccionChino: "用西班牙语写出缺失的数字。",
        tabla: [
          {
            espanol: "veintidós",
            numero: 22,
          },
          {
            espanol: "treinta y siete",
            numero: 37,
          },
          {
            espanol: "cuarenta y tres",
            numero: 43,
          },
          {
            espanol: "cincuenta y nueve",
            numero: 59,
          },
          {
            espanol: "sesenta y ocho",
            numero: 68,
          },
          {
            espanol: "ochenta y cuatro",
            numero: 84,
          },
          {
            espanol: "noventa y seis",
            numero: 96,
          },
          {
            espanol: "ciento trece",
            numero: 113,
          },
        ],
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Cuántos años tienes? Responde en español.",
        preguntaChino: "你多大了？用西班牙语回答。",
        sugerencia: "你可以说：Tengo ___ años.",
        sugerenciaChino: "你可以说：Tengo ___ años.",
      },
      {
        id: "pa2",
        pregunta: "¿Cuál es la diferencia entre 'cien' y 'ciento'?",
        preguntaChino: "'cien'和'ciento'有什么区别？",
        sugerencia: "Cien es para 100 solo. Ciento es para 100 con otros números.",
        sugerenciaChino: "Cien用于单独的100。Ciento用于100后面还有其他数字。",
      },
      {
        id: "pa3",
        pregunta: "Escribe los números del 20 al 30 en español.",
        preguntaChino: "用西班牙语写出20到30的数字。",
        sugerencia:
          "veinte, veintiuno, veintidós, veintitrés, veinticuatro, veinticinco, veintiséis, veintisiete, veintiocho, veintinueve, treinta",
        sugerenciaChino:
          "veinte, veintiuno, veintidós, veintitrés, veinticuatro, veinticinco, veintiséis, veintisiete, veintiocho, veintinueve, treinta",
      },
      {
        id: "pa4",
        pregunta: "¿Cómo se escribe el número 57 en español?",
        preguntaChino: "数字57用西班牙语怎么写？",
        sugerencia: "cincuenta y siete",
        sugerenciaChino: "cincuenta y siete",
      },
      {
        id: "pa5",
        pregunta: "Di la edad de tres miembros de tu familia en español.",
        preguntaChino: "用西班牙语说出你家三个成员的年龄。",
        sugerencia: "Mi padre tiene ___ años. Mi madre tiene ___ años. Mi hermano tiene ___ años.",
        sugerenciaChino: "Mi padre tiene ___ años. Mi madre tiene ___ años. Mi hermano tiene ___ años.",
      },
      {
        id: "pa6",
        pregunta: "¿Cómo se pregunta el precio de algo en español? Da un ejemplo.",
        preguntaChino: "西班牙语中如何询问价格？举个例子。",
        sugerencia: "¿Cuánto cuesta este libro? — Cuesta treinta y cinco euros.",
        sugerenciaChino: "¿Cuánto cuesta este libro? — Cuesta treinta y cinco euros.",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '30' en español?",
        preguntaChino: "西班牙语中'30'怎么说？",
        respuestaSugerida: "treinta",
        respuestaSugeridaChino: "treinta",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '45' en español?",
        preguntaChino: "西班牙语中'45'怎么说？",
        respuestaSugerida: "cuarenta y cinco",
        respuestaSugeridaChino: "cuarenta y cinco",
      },
      {
        id: "p3",
        pregunta: "¿Qué significa 'ciento veinte'?",
        preguntaChino: "'ciento veinte'是什么意思？",
        respuestaSugerida: "120",
        respuestaSugeridaChino: "120",
      },
      {
        id: "p4",
        pregunta: "¿Cómo se dice '22' en español?",
        preguntaChino: "西班牙语中'22'怎么说？",
        respuestaSugerida: "veintidós",
        respuestaSugeridaChino: "veintidós",
      },
      {
        id: "p5",
        pregunta: "¿Cuándo usas 'veintiún' y cuándo usas 'veintiuno'?",
        preguntaChino: "什么时候用'veintiún'，什么时候用'veintiuno'？",
        respuestaSugerida: "Veintiún delante de sustantivo, veintiuno solo.",
        respuestaSugeridaChino: "Veintiún用于名词前，veintiuno单独使用。",
      },
      {
        id: "p6",
        pregunta: "¿Cómo se dice '199' en español?",
        preguntaChino: "西班牙语中'199'怎么说？",
        respuestaSugerida: "ciento noventa y nueve",
        respuestaSugeridaChino: "ciento noventa y nueve",
      },
      {
        id: "p7",
        pregunta: "¿Qué número es 'setenta y siete'?",
        preguntaChino: "'setenta y siete'是什么数字？",
        respuestaSugerida: "77",
        respuestaSugeridaChino: "77",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Preguntar el origen",
        tituloChino: "询问来源",
        descripcion: `Para preguntar de dónde es alguien:

🔹 PREGUNTAS INFORMALES:
• ¿De dónde eres? (la más común)
• ¿De qué país eres?
• ¿Dónde naciste? (¿Dónde naciste?)
• ¿Cuál es tu nacionalidad?

🔹 PREGUNTAS FORMALES:
• ¿De dónde es usted?
• ¿De qué país es usted?
• ¿Dónde nació usted?
• ¿Cuál es su nacionalidad?

🔹 RESPUESTAS:
• Soy de + país/ciudad (Soy de España / Soy de Madrid)
• Soy + nacionalidad (Soy español / Soy española)
• Nací en + país/ciudad (Nací en Colombia)

📌 DIFERENCIA ENTRE "SER DE" Y "SER + NACIONALIDAD":
• "Soy de España" → indica origen (procedencia)
• "Soy español" → indica nacionalidad (pertenencia al país)

Ejemplos:
• Soy de Perú, pero vivo en Chile.
• Soy peruana, pero vivo en Chile.

❌ ERROR COMÚN:
No digas "Soy de español" (incorrecto). Di "Soy de España" o "Soy español".`,
        descripcionChino: `询问某人来自哪里：

🔹 非正式问题：
• ¿De dónde eres? = 你来自哪里？（最常见）
• ¿De qué país eres? = 你来自哪个国家？
• ¿Dónde naciste? = 你在哪里出生？
• ¿Cuál es tu nacionalidad? = 你的国籍是什么？

🔹 正式问题：
• ¿De dónde es usted? = 您来自哪里？
• ¿De qué país es usted? = 您来自哪个国家？
• ¿Dónde nació usted? = 您在哪里出生？
• ¿Cuál es su nacionalidad? = 您的国籍是什么？

🔹 回答：
• Soy de + 国家/城市 = 我来自...
• Soy + 国籍 = 我是...人
• Nací en + 国家/城市 = 我出生于...

📌 "SER DE" 和 "SER + 国籍" 的区别：
• "Soy de España" = 我来自西班牙（指出处）
• "Soy español" = 我是西班牙人（国籍归属）

例子：
• Soy de Perú, pero vivo en Chile. = 我来自秘鲁，但我住在智利。
• Soy peruana, pero vivo en Chile. = 我是秘鲁人，但我住在智利。

❌ 常见错误：
不要说 "Soy de español"（错误）。应该说 "Soy de España" 或 "Soy español"。`,
        ejemplos: [
          {
            espanol: "—¿De dónde eres? —Soy de China.",
            chino: "—你来自哪里？—我来自中国。",
          },
          {
            espanol: "—¿De dónde es usted? —Soy de España.",
            chino: "—您来自哪里？—我来自西班牙。",
          },
          {
            espanol: "Soy mexicano.",
            chino: "我是墨西哥人。",
          },
          {
            espanol: "Nací en Argentina, pero vivo en Uruguay.",
            chino: "我出生在阿根廷，但我住在乌拉圭。",
          },
          {
            espanol: "¿De qué país eres? —Soy de Brasil.",
            chino: "你来自哪个国家？—我来自巴西。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Países y nacionalidades",
        tituloChino: "国家和国籍",
        descripcion: `🔹 AMÉRICA LATINA:
País → Nacionalidad (masculino / femenino)

• México → mexicano / mexicana
• Argentina → argentino / argentina
• Colombia → colombiano / colombiana
• Perú → peruano / peruana
• Chile → chileno / chilena
• Venezuela → venezolano / venezolana
• Ecuador → ecuatoriano / ecuatoriana
• Bolivia → boliviano / boliviana
• Paraguay → paraguayo / paraguaya
• Uruguay → uruguayo / uruguaya
• Cuba → cubano / cubana
• Puerto Rico → puertorriqueño / puertorriqueña
• República Dominicana → dominicano / dominicana
• Costa Rica → costarricense (invariable)
• Nicaragua → nicaragüense (invariable)
• Honduras → hondureño / hondureña
• El Salvador → salvadoreño / salvadoreña
• Guatemala → guatemalteco / guatemalteca
• Panamá → panameño / panameña

🔹 EUROPA:
• España → español / española
• Francia → francés / francesa
• Italia → italiano / italiana
• Alemania → alemán / alemana
• Portugal → portugués / portuguesa
• Reino Unido → británico / británica
• Inglaterra → inglés / inglesa
• Países Bajos → neerlandés / neerlandesa / holandés / holandesa
• Bélgica → belga (invariable)
• Suiza → suizo / suiza
• Suecia → sueco / sueca
• Noruega → noruego / noruega
• Dinamarca → danés / danesa
• Finlandia → finlandés / finlandesa
• Grecia → griego / griega
• Rusia → ruso / rusa
• Polonia → polaco / polaca
• Ucrania → ucraniano / ucraniana
• Irlanda → irlandés / irlandesa

🔹 ASIA:
• China → chino / china
• Japón → japonés / japonesa
• Corea del Sur → surcoreano / surcoreana
• India → indio / india
• Tailandia → tailandés / tailandesa
• Vietnam → vietnamita (invariable)
• Filipinas → filipino / filipina
• Indonesia → indonesio / indonesia
• Turquía → turco / turca
• Israel → israelí (invariable)

🔹 ÁFRICA:
• Marruecos → marroquí (invariable)
• Egipto → egipcio / egipcia
• Sudáfrica → sudafricano / sudafricana
• Nigeria → nigeriano / nigeriana
• Senegal → senegalés / senegalesa

🔹 AMÉRICA DEL NORTE Y OCEANÍA:
• Estados Unidos → estadounidense (invariable)
• Canadá → canadiense (invariable)
• Australia → australiano / australiana
• Nueva Zelanda → neozelandés / neozelandesa`,
        descripcionChino: `🔹 拉丁美洲：
国家 → 国籍（阳性/阴性）

• 墨西哥 → mexicano / mexicana
• 阿根廷 → argentino / argentina
• 哥伦比亚 → colombiano / colombiana
• 秘鲁 → peruano / peruana
• 智利 → chileno / chilena
• 委内瑞拉 → venezolano / venezolana
• 厄瓜多尔 → ecuatoriano / ecuatoriana
• 玻利维亚 → boliviano / boliviana
• 巴拉圭 → paraguayo / paraguaya
• 乌拉圭 → uruguayo / uruguaya
• 古巴 → cubano / cubana
• 波多黎各 → puertorriqueño / puertorriqueña
• 多米尼加共和国 → dominicano / dominicana
• 哥斯达黎加 → costarricense（不变）
• 尼加拉瓜 → nicaragüense（不变）
• 洪都拉斯 → hondureño / hondureña
• 萨尔瓦多 → salvadoreño / salvadoreña
• 危地马拉 → guatemalteco / guatemalteca
• 巴拿马 → panameño / panameña

🔹 欧洲：
• 西班牙 → español / española
• 法国 → francés / francesa
• 意大利 → italiano / italiana
• 德国 → alemán / alemana
• 葡萄牙 → portugués / portuguesa
• 英国 → británico / británica
• 英格兰 → inglés / inglesa
• 荷兰 → neerlandés / neerlandesa / holandés / holandesa
• 比利时 → belga（不变）
• 瑞士 → suizo / suiza
• 瑞典 → sueco / sueca
• 挪威 → noruego / noruega
• 丹麦 → danés / danesa
• 芬兰 → finlandés / finlandesa
• 希腊 → griego / griega
• 俄罗斯 → ruso / rusa
• 波兰 → polaco / polaca
• 乌克兰 → ucraniano / ucraniana
• 爱尔兰 → irlandés / irlandesa

🔹 亚洲：
• 中国 → chino / china
• 日本 → japonés / japonesa
• 韩国 → surcoreano / surcoreana
• 印度 → indio / india
• 泰国 → tailandés / tailandesa
• 越南 → vietnamita（不变）
• 菲律宾 → filipino / filipina
• 印度尼西亚 → indonesio / indonesia
• 土耳其 → turco / turca
• 以色列 → israelí（不变）

🔹 非洲：
• 摩洛哥 → marroquí（不变）
• 埃及 → egipcio / egipcia
• 南非 → sudafricano / sudafricana
• 尼日利亚 → nigeriano / nigeriana
• 塞内加尔 → senegalés / senegalesa

🔹 北美和大洋洲：
• 美国 → estadounidense（不变）
• 加拿大 → canadiense（不变）
• 澳大利亚 → australiano / australiana
• 新西兰 → neozelandés / neozelandesa`,
        ejemplos: [
          {
            espanol: "Soy chino.",
            chino: "我是中国人（男）。",
          },
          {
            espanol: "Soy española.",
            chino: "我是西班牙人（女）。",
          },
          {
            espanol: "Ella es mexicana.",
            chino: "她是墨西哥人。",
          },
          {
            espanol: "Él es estadounidense.",
            chino: "他是美国人。",
          },
          {
            espanol: "Somos canadienses.",
            chino: "我们是加拿大人。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Reglas de género en nacionalidades",
        tituloChino: "国籍的性别规则",
        descripcion: `🔹 REGLA 1: Mayoría terminan en -o (masculino) y -a (femenino)
   • mexicano / mexicana
   • argentino / argentina
   • colombiano / colombiana
   • italiano / italiana

🔹 REGLA 2: Terminaciones en -és, -esa
   • francés / francesa
   • japonés / japonesa
   • portugués / portuguesa
   • inglés / inglesa
   • alemán / alemana

🔹 REGLA 3: Terminaciones en -e o consonante (invariables)
   • estadounidense
   • canadiense
   • belga
   • marroquí
   • israelí
   • vietnamita
   • costarricense

🔹 REGLA 4: Terminaciones en -ano, -ana
   • italiano / italiana
   • coreano / coreana
   • cubano / cubana
   • venezolano / venezolana

🔹 REGLA 5: Plural de nacionalidades
   • mexicano → mexicanos (masculino plural)
   • mexicana → mexicanas (femenino plural)
   • estadounidense → estadounidenses (invariable en plural)

📌 TABLA RESUMEN:

| Terminación masculina | Terminación femenina | Ejemplo |
|----------------------|---------------------|---------|
| -o | -a | mexicano/mexicana |
| -és | -esa | francés/francesa |
| -ano | -ana | italiano/italiana |
| -e | -e (invariable) | canadiense |
| consonante | -a | alemán/alemana |`,
        descripcionChino: `🔹 规则1：大多数以-o结尾（阳性），以-a结尾（阴性）
   • mexicano / mexicana = 墨西哥人
   • argentino / argentina = 阿根廷人
   • colombiano / colombiana = 哥伦比亚人
   • italiano / italiana = 意大利人

🔹 规则2：以-és结尾（阳性），-esa结尾（阴性）
   • francés / francesa = 法国人
   • japonés / japonesa = 日本人
   • portugués / portuguesa = 葡萄牙人
   • inglés / inglesa = 英国人
   • alemán / alemana = 德国人

🔹 规则3：以-e或辅音结尾（不变）
   • estadounidense = 美国人
   • canadiense = 加拿大人
   • belga = 比利时人
   • marroquí = 摩洛哥人
   • israelí = 以色列人
   • vietnamita = 越南人
   • costarricense = 哥斯达黎加人

🔹 规则4：以-ano结尾（阳性），-ana结尾（阴性）
   • italiano / italiana = 意大利人
   • coreano / coreana = 韩国人
   • cubano / cubana = 古巴人
   • venezolano / venezolana = 委内瑞拉人

🔹 规则5：国籍的复数形式
   • mexicano → mexicanos（阳性复数）
   • mexicana → mexicanas（阴性复数）
   • estadounidense → estadounidenses（复数不变）

📌 总结表：

| 阳性结尾 | 阴性结尾 | 例子 |
|---------|---------|------|
| -o | -a | mexicano/mexicana |
| -és | -esa | francés/francesa |
| -ano | -ana | italiano/italiana |
| -e | -e（不变） | canadiense |
| 辅音 | -a | alemán/alemana |`,
        ejemplos: [
          {
            espanol: "Él es canadiense. Ella es canadiense.",
            chino: "他是加拿大人。她是加拿大人。（不变）",
          },
          {
            espanol: "Él es japonés. Ella es japonesa.",
            chino: "他是日本人。她是日本人。（变化）",
          },
          {
            espanol: "Ellos son mexicanos. Ellas son mexicanas.",
            chino: "他们是墨西哥人（男）。她们是墨西哥人（女）。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Expresiones útiles para hablar de origen y nacionalidad",
        tituloChino: "谈论来源和国籍的有用表达",
        descripcion: `🔹 PREGUNTAR POR EL ORIGEN:
• ¿De dónde eres?
• ¿De dónde es tu familia? (¿De dónde es tu familia?)
• ¿Tus padres son de aquí? (¿Tus padres son de aquí?)
• ¿Cuánto tiempo llevas en este país? (¿Cuánto tiempo llevas en este país?)
• ¿Has vivido en otros países? (¿Has vivido en otros países?)

🔹 HABLAR DE TU ORIGEN:
• Nací en [país/ciudad], pero crecí en [país/ciudad]
• Mis padres son de [país], pero yo nací aquí
• Tengo nacionalidad [país] y [país] (doble nacionalidad)
• Soy de [país] de origen, pero vivo en [país]

🔹 HABLAR DE IDIOMAS:
• Hablo [idioma] con mis padres
• Mi lengua materna es [idioma]
• Aprendí [idioma] cuando era niño/a
• En mi país se habla [idioma]

🔹 EXPRESIONES CULTURALES:
• En mi cultura, es normal...
• En mi país, la gente suele...
• Una costumbre típica de mi país es...
• La comida típica de [país] es...`,
        descripcionChino: `🔹 询问来源：
• ¿De dónde eres? = 你来自哪里？
• ¿De dónde es tu familia? = 你的家人来自哪里？
• ¿Tus padres son de aquí? = 你父母是本地的吗？
• ¿Cuánto tiempo llevas en este país? = 你在这个国家多久了？
• ¿Has vivido en otros países? = 你在其他国家生活过吗？

🔹 谈论你的来源：
• Nací en [国家/城市], pero crecí en [国家/城市] = 我出生在...，但在...长大
• Mis padres son de [国家], pero yo nací aquí = 我父母来自...，但我出生在这里
• Tengo nacionalidad [国家] y [国家] = 我有...和...双重国籍
• Soy de [国家] de origen, pero vivo en [国家] = 我原籍...，但我住在...

🔹 谈论语言：
• Hablo [语言] con mis padres = 我和父母说...
• Mi lengua materna es [语言] = 我的母语是...
• Aprendí [语言] cuando era niño/a = 我小时候学了...
• En mi país se habla [语言] = 在我的国家说...

🔹 文化表达：
• En mi cultura, es normal... = 在我的文化中，...是正常的
• En mi país, la gente suele... = 在我的国家，人们通常...
• Una costumbre típica de mi país es... = 我的国家的一个典型习俗是...
• La comida típica de [国家] es... = ...的典型食物是...`,
        ejemplos: [
          {
            espanol: "Nací en Colombia, pero crecí en España.",
            chino: "我出生在哥伦比亚，但在西班牙长大。",
          },
          {
            espanol: "Mis padres son de China, pero yo nací en Estados Unidos.",
            chino: "我父母来自中国，但我出生在美国。",
          },
          {
            espanol: "Mi lengua materna es el español.",
            chino: "我的母语是西班牙语。",
          },
          {
            espanol: "En mi país, se come mucha carne.",
            chino: "在我的国家，人们吃很多肉。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "¿De dónde eres?",
        chino: "你来自哪里？",
        ejemplo: "¿De dónde eres?",
      },
      {
        id: "v2",
        espanol: "¿De dónde es usted?",
        chino: "您来自哪里？(正式)",
        ejemplo: "¿De dónde es usted, señor?",
      },
      {
        id: "v3",
        espanol: "Soy de...",
        chino: "我来自...",
        ejemplo: "Soy de China.",
      },
      {
        id: "v4",
        espanol: "Soy... (nacionalidad)",
        chino: "我是...人",
        ejemplo: "Soy español.",
      },
      {
        id: "v5",
        espanol: "Nací en...",
        chino: "我出生在...",
        ejemplo: "Nací en Madrid.",
      },
      {
        id: "v6",
        espanol: "China",
        chino: "中国",
        ejemplo: "Soy de China.",
      },
      {
        id: "v7",
        espanol: "España",
        chino: "西班牙",
        ejemplo: "Soy de España.",
      },
      {
        id: "v8",
        espanol: "México",
        chino: "墨西哥",
        ejemplo: "Soy de México.",
      },
      {
        id: "v9",
        espanol: "Argentina",
        chino: "阿根廷",
        ejemplo: "Soy de Argentina.",
      },
      {
        id: "v10",
        espanol: "Colombia",
        chino: "哥伦比亚",
        ejemplo: "Soy de Colombia.",
      },
      {
        id: "v11",
        espanol: "Perú",
        chino: "秘鲁",
        ejemplo: "Soy de Perú.",
      },
      {
        id: "v12",
        espanol: "Chile",
        chino: "智利",
        ejemplo: "Soy de Chile.",
      },
      {
        id: "v13",
        espanol: "Estados Unidos",
        chino: "美国",
        ejemplo: "Soy de Estados Unidos.",
      },
      {
        id: "v14",
        espanol: "Canadá",
        chino: "加拿大",
        ejemplo: "Soy de Canadá.",
      },
      {
        id: "v15",
        espanol: "Francia",
        chino: "法国",
        ejemplo: "Soy de Francia.",
      },
      {
        id: "v16",
        espanol: "Italia",
        chino: "意大利",
        ejemplo: "Soy de Italia.",
      },
      {
        id: "v17",
        espanol: "Alemania",
        chino: "德国",
        ejemplo: "Soy de Alemania.",
      },
      {
        id: "v18",
        espanol: "Japón",
        chino: "日本",
        ejemplo: "Soy de Japón.",
      },
      {
        id: "v19",
        espanol: "Corea",
        chino: "韩国",
        ejemplo: "Soy de Corea.",
      },
      {
        id: "v20",
        espanol: "Brasil",
        chino: "巴西",
        ejemplo: "Soy de Brasil.",
      },
      {
        id: "v21",
        espanol: "chino / china",
        chino: "中国人",
        ejemplo: "Soy chino. Soy china.",
      },
      {
        id: "v22",
        espanol: "español / española",
        chino: "西班牙人",
        ejemplo: "Soy español. Soy española.",
      },
      {
        id: "v23",
        espanol: "mexicano / mexicana",
        chino: "墨西哥人",
        ejemplo: "Soy mexicano. Soy mexicana.",
      },
      {
        id: "v24",
        espanol: "argentino / argentina",
        chino: "阿根廷人",
        ejemplo: "Soy argentino. Soy argentina.",
      },
      {
        id: "v25",
        espanol: "colombiano / colombiana",
        chino: "哥伦比亚人",
        ejemplo: "Soy colombiano. Soy colombiana.",
      },
      {
        id: "v26",
        espanol: "peruano / peruana",
        chino: "秘鲁人",
        ejemplo: "Soy peruano. Soy peruana.",
      },
      {
        id: "v27",
        espanol: "chileno / chilena",
        chino: "智利人",
        ejemplo: "Soy chileno. Soy chilena.",
      },
      {
        id: "v28",
        espanol: "estadounidense",
        chino: "美国人",
        ejemplo: "Soy estadounidense.",
      },
      {
        id: "v29",
        espanol: "canadiense",
        chino: "加拿大人",
        ejemplo: "Soy canadiense.",
      },
      {
        id: "v30",
        espanol: "francés / francesa",
        chino: "法国人",
        ejemplo: "Él es francés. Ella es francesa.",
      },
      {
        id: "v31",
        espanol: "italiano / italiana",
        chino: "意大利人",
        ejemplo: "Soy italiano. Soy italiana.",
      },
      {
        id: "v32",
        espanol: "alemán / alemana",
        chino: "德国人",
        ejemplo: "Él es alemán. Ella es alemana.",
      },
      {
        id: "v33",
        espanol: "japonés / japonesa",
        chino: "日本人",
        ejemplo: "Él es japonés. Ella es japonesa.",
      },
      {
        id: "v34",
        espanol: "brasileño / brasileña",
        chino: "巴西人",
        ejemplo: "Soy brasileño. Soy brasileña.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Conociendo a alguien en la universidad",
        tituloChino: "在大学认识某人",
        personajes: ["Liu Wei", "Carlos"],
        lineas: [
          {
            personaje: "Liu Wei",
            texto: "Hola, soy Liu Wei. ¿Cómo te llamas?",
            traduccion: "你好，我是刘伟。你叫什么名字？",
          },
          {
            personaje: "Carlos",
            texto: "Me llamo Carlos. Mucho gusto.",
            traduccion: "我叫卡洛斯。很高兴。",
          },
          {
            personaje: "Liu Wei",
            texto: "¿De dónde eres, Carlos?",
            traduccion: "卡洛斯，你来自哪里？",
          },
          {
            personaje: "Carlos",
            texto: "Soy de Madrid, España. ¿Y tú?",
            traduccion: "我来自西班牙马德里。你呢？",
          },
          {
            personaje: "Liu Wei",
            texto: "Soy de Pekín, China. ¡Qué lejos!",
            traduccion: "我来自中国北京。真远啊！",
          },
        ],
      },
      {
        id: "d2",
        titulo: "En una conferencia internacional",
        tituloChino: "在国际会议上",
        personajes: ["Ana", "John"],
        lineas: [
          {
            personaje: "Ana",
            texto: "¿De dónde eres?",
            traduccion: "你来自哪里？",
          },
          {
            personaje: "John",
            texto: "Soy de Estados Unidos. Soy estadounidense. ¿Y tú?",
            traduccion: "我来自美国。我是美国人。你呢？",
          },
          {
            personaje: "Ana",
            texto: "Soy de México. Soy mexicana.",
            traduccion: "我来自墨西哥。我是墨西哥人。",
          },
          {
            personaje: "John",
            texto: "¿Qué ciudad?",
            traduccion: "哪个城市？",
          },
          {
            personaje: "Ana",
            texto: "De la Ciudad de México.",
            traduccion: "墨西哥城。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Presentando a un amigo extranjero",
        tituloChino: "介绍一个外国朋友",
        personajes: ["María", "Luis", "Yuki"],
        lineas: [
          {
            personaje: "María",
            texto: "Luis, te presento a Yuki. Es de Japón.",
            traduccion: "路易斯，我给你介绍由纪。她来自日本。",
          },
          {
            personaje: "Luis",
            texto: "Hola Yuki, mucho gusto. ¿De qué ciudad de Japón?",
            traduccion: "你好由纪，很高兴。日本哪个城市？",
          },
          {
            personaje: "Yuki",
            texto: "Soy de Tokio. ¿Y tú, de dónde eres?",
            traduccion: "我来自东京。你呢，你来自哪里？",
          },
          {
            personaje: "Luis",
            texto: "Soy de Barcelona, España.",
            traduccion: "我来自西班牙巴塞罗那。",
          },
          {
            personaje: "Yuki",
            texto: "¡Qué bonita ciudad! Me encantaría visitarla.",
            traduccion: "好美丽的城市！我很想去。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "En la clase de idiomas",
        tituloChino: "在语言课上",
        personajes: ["Profesora", "Estudiante alemán", "Estudiante francés"],
        lineas: [
          {
            personaje: "Profesora",
            texto: "Buenos días a todos. Vamos a presentarnos. ¿De dónde eres tú?",
            traduccion: "大家早上好。我们来自我介绍。你来自哪里？",
          },
          {
            personaje: "Estudiante alemán",
            texto: "Soy de Berlín, Alemania. Soy alemán.",
            traduccion: "我来自德国柏林。我是德国人。",
          },
          {
            personaje: "Profesora",
            texto: "¿Y tú?",
            traduccion: "你呢？",
          },
          {
            personaje: "Estudiante francés",
            texto: "Yo soy de París, Francia. Soy francés.",
            traduccion: "我来自法国巴黎。我是法国人。",
          },
          {
            personaje: "Profesora",
            texto: "¿Cuál es tu nacionalidad?",
            traduccion: "你的国籍是什么？",
          },
          {
            personaje: "Estudiante alemán",
            texto: "Soy alemán, pero mi madre es española.",
            traduccion: "我是德国人，但我母亲是西班牙人。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Entrevista de trabajo sobre origen",
        tituloChino: "关于来源的工作面试",
        personajes: ["Entrevistador", "Candidata"],
        lineas: [
          {
            personaje: "Entrevistador",
            texto: "¿De dónde es usted, señorita?",
            traduccion: "您来自哪里，小姐？",
          },
          {
            personaje: "Candidata",
            texto: "Soy de Colombia, de la ciudad de Medellín.",
            traduccion: "我来自哥伦比亚，麦德林市。",
          },
          {
            personaje: "Entrevistador",
            texto: "¿Cuánto tiempo lleva en España?",
            traduccion: "您在西班牙多久了？",
          },
          {
            personaje: "Candidata",
            texto: "Llevo cinco años. Vine a estudiar un máster.",
            traduccion: "我待了五年。我来读硕士。",
          },
          {
            personaje: "Entrevistador",
            texto: "¿Tiene doble nacionalidad?",
            traduccion: "您有双重国籍吗？",
          },
          {
            personaje: "Candidata",
            texto: "Todavía no, pero voy a solicitarla.",
            traduccion: "还没有，但我会申请的。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "为了说'你来自哪里？'：¿De _____ eres?",
          preguntaChino: "为了说'你来自哪里？'：¿De _____ eres?",
          respuestaCorrecta: "dónde",
          explicacion: "'¿De dónde eres?' = 你来自哪里？",
          pista: "首字母是 d，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c2",
          pregunta: "为了说'我来自中国'：Soy de _____",
          preguntaChino: "为了说'我来自中国'：Soy de _____",
          respuestaCorrecta: "China",
          explicacion: "中国在西班牙语中是'China'。",
          pista: "首字母是 C，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c3",
          pregunta: "一个男人说'我是西班牙人'：Soy _____",
          preguntaChino: "一个男人说'我是西班牙人'：Soy _____",
          respuestaCorrecta: "español",
          explicacion: "西班牙人（阳性）是'español'。",
          pista: "首字母是 e，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c4",
          pregunta: "一个女人说'我是墨西哥人'：Soy _____",
          preguntaChino: "一个女人说'我是墨西哥人'：Soy _____",
          respuestaCorrecta: "mexicana",
          explicacion: "墨西哥人（阴性）是'mexicana'。",
          pista: "首字母是 m，8个字母",
          numeroLetras: 8,
        },
        {
          id: "c5",
          pregunta: "为了说'我是美国人'（不分性别）：Soy _____",
          preguntaChino: "为了说'我是美国人'（不分性别）：Soy _____",
          respuestaCorrecta: "estadounidense",
          explicacion: "美国人无论男女都是'estadounidense'。",
          pista: "首字母是 e，14个字母",
          numeroLetras: 14,
        },
        {
          id: "c6",
          pregunta: "为了说'我出生在西班牙'：_____ en España",
          preguntaChino: "为了说'我出生在西班牙'：_____ en España",
          respuestaCorrecta: "Nací",
          explicacion: "Nacer = 出生。Nací = 我出生了。",
          pista: "首字母是 N，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c7",
          pregunta: "为了说'你的国籍是什么？'：¿Cuál es tu _____?",
          preguntaChino: "为了说'你的国籍是什么？'：¿Cuál es tu _____?",
          respuestaCorrecta: "nacionalidad",
          explicacion: "Nacionalidad = 国籍。",
          pista: "首字母是 n，12个字母",
          numeroLetras: 12,
        },
        {
          id: "c8",
          pregunta: "为了正式地问'您来自哪里？'：¿De dónde _____ usted?",
          preguntaChino: "为了正式地问'您来自哪里？'：¿De dónde _____ usted?",
          respuestaCorrecta: "es",
          explicacion: "'¿De dónde es usted?' = 您来自哪里？",
          pista: "首字母是 e，2个字母",
          numeroLetras: 2,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "如何正式地问'您来自哪里？'",
          preguntaChino: "如何正式地问'您来自哪里？'",
          opciones: ["¿De dónde eres?", "¿De dónde es usted?", "¿Qué tal?", "¿Cómo te llamas?"],
          respuestaCorrecta: "¿De dónde es usted?",
          explicacion: "'¿De dónde es usted?'是正式形式。",
        },
        {
          id: "s2",
          pregunta: "'Soy de España'意思是...",
          preguntaChino: "'Soy de España'意思是...",
          opciones: ["我来自西班牙", "我是西班牙人", "我在西班牙", "我去西班牙"],
          respuestaCorrecta: "我来自西班牙",
          explicacion: "'Soy de España' = 我来自西班牙。",
        },
        {
          id: "s3",
          pregunta: "中国人在西班牙语中是...",
          preguntaChino: "中国人在西班牙语中是...",
          opciones: ["chino / china", "japonés", "coreano", "español"],
          respuestaCorrecta: "chino / china",
          explicacion: "中国人：chino（男）/ china（女）。",
        },
        {
          id: "s4",
          pregunta: "以下哪个国家名称是正确的？",
          preguntaChino: "以下哪个国家名称是正确的？",
          opciones: ["Méjico", "Mexico", "México", "Méjico"],
          respuestaCorrecta: "México",
          explicacion: "墨西哥的正确拼写是'México'。",
        },
        {
          id: "s5",
          pregunta: "'Soy japonés'是谁说的？",
          preguntaChino: "'Soy japonés'是谁说的？",
          opciones: ["一个女人", "一个男人", "一个孩子", "一个老人"],
          respuestaCorrecta: "一个男人",
          explicacion: "'Japonés'是阳性，所以是一个男人说的。",
        },
        {
          id: "s6",
          pregunta: "哪个国籍不变化性别？",
          preguntaChino: "哪个国籍不变化性别？",
          opciones: ["mexicano", "canadiense", "español", "italiano"],
          respuestaCorrecta: "canadiense",
          explicacion: "Canadiense 男女都一样，不变化。",
        },
        {
          id: "s7",
          pregunta: "如何问'你来自哪个城市？'",
          preguntaChino: "如何问'你来自哪个城市？'",
          opciones: ["¿De qué país eres?", "¿De qué ciudad eres?", "¿Dónde vives?", "¿Cómo te llamas?"],
          respuestaCorrecta: "¿De qué ciudad eres?",
          explicacion: "'¿De qué ciudad eres?' = 你来自哪个城市？",
        },
        {
          id: "s8",
          pregunta: "'Nací en Colombia' 是什么意思？",
          preguntaChino: "'Nací en Colombia' 是什么意思？",
          opciones: ["我住在哥伦比亚", "我去了哥伦比亚", "我出生在哥伦比亚", "我喜欢哥伦比亚"],
          respuestaCorrecta: "我出生在哥伦比亚",
          explicacion: "Nacer = 出生。",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'¿De dónde eres?'用于正式场合。",
          preguntaChino: "'¿De dónde eres?'用于正式场合。",
          respuestaCorrecta: false,
          explicacion: "错。'¿De dónde eres?'是非正式形式。",
        },
        {
          id: "vf2",
          pregunta: "国籍在西班牙语中根据性别变化。",
          preguntaChino: "国籍在西班牙语中根据性别变化。",
          respuestaCorrecta: true,
          explicacion: "对。大多数国籍有阳性（-o）和阴性（-a）形式。",
        },
        {
          id: "vf3",
          pregunta: "'Estadounidense'只用于男性。",
          preguntaChino: "'Estadounidense'只用于男性。",
          respuestaCorrecta: false,
          explicacion: "错。'Estadounidense'男女通用，没有变化。",
        },
        {
          id: "vf4",
          pregunta: "中国的西班牙语是'Chino'。",
          preguntaChino: "中国的西班牙语是'Chino'。",
          respuestaCorrecta: false,
          explicacion: "错。中国是'China'，'chino'是中国人。",
        },
        {
          id: "vf5",
          pregunta: "我们可以问'¿De qué país eres?'。",
          preguntaChino: "我们可以问'¿De qué país eres?'。",
          respuestaCorrecta: true,
          explicacion: "对。这也是问'你来自哪个国家？'的一种方式。",
        },
        {
          id: "vf6",
          pregunta: "'Soy de' se usa para indicar origen.",
          preguntaChino: "'Soy de'用于表示来源。",
          respuestaCorrecta: true,
          explicacion: "对。Soy de + país/ciudad = 我来自...",
        },
        {
          id: "vf7",
          pregunta: "'Francés' es la forma femenina de 'francés'.",
          preguntaChino: "'Francés'是'francés'的阴性形式。",
          respuestaCorrecta: false,
          explicacion: "错。Francés es masculino, francesa es femenino.",
        },
        {
          id: "vf8",
          pregunta: "Todas las nacionalidades cambian de género.",
          preguntaChino: "所有国籍都变化性别。",
          respuestaCorrecta: false,
          explicacion: "错。Algunas son invariables (estadounidense, canadiense).",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "China",
              derecha: "中国",
            },
            {
              izquierda: "España",
              derecha: "西班牙",
            },
            {
              izquierda: "México",
              derecha: "墨西哥",
            },
            {
              izquierda: "Argentina",
              derecha: "阿根廷",
            },
            {
              izquierda: "Colombia",
              derecha: "哥伦比亚",
            },
            {
              izquierda: "chino / china",
              derecha: "中国人",
            },
            {
              izquierda: "español / española",
              derecha: "西班牙人",
            },
            {
              izquierda: "mexicano / mexicana",
              derecha: "墨西哥人",
            },
            {
              izquierda: "argentino / argentina",
              derecha: "阿根廷人",
            },
            {
              izquierda: "¿De dónde eres?",
              derecha: "你来自哪里？",
            },
            {
              izquierda: "Soy de...",
              derecha: "我来自...",
            },
          ],
          explicacion: "将国家和国籍与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["España", "Soy", "de", "."],
          respuestaCorrecta: "Soy de España.",
          explicacion: "正确的顺序是：Soy de España.（我来自西班牙。）",
        },
        {
          id: "o2",
          palabras: ["eres", "dónde", "¿", "De", "?"],
          respuestaCorrecta: "¿De dónde eres?",
          explicacion: "正确的顺序是：¿De dónde eres?（你来自哪里？）",
        },
        {
          id: "o3",
          palabras: ["mexicana", "Soy", "."],
          respuestaCorrecta: "Soy mexicana.",
          explicacion: "正确的顺序是：Soy mexicana.（我是墨西哥人-女。）",
        },
        {
          id: "o4",
          palabras: ["china", "Soy", "y", "Pekín", "de", "soy"],
          respuestaCorrecta: "Soy de Pekín y soy china.",
          explicacion: "正确的顺序是：Soy de Pekín y soy china.（我来自北京，我是中国人。）",
        },
        {
          id: "o5",
          palabras: ["es", "Colombia", "Ella", "de", "."],
          respuestaCorrecta: "Ella es de Colombia.",
          explicacion: "正确的顺序是：Ella es de Colombia.（她来自哥伦比亚。）",
        },
        {
          id: "o6",
          palabras: ["canadiense", "Eres", "tú", "¿", "?"],
          respuestaCorrecta: "¿Eres tú canadiense?",
          explicacion: "正确的顺序是：¿Eres tú canadiense?（你是加拿大人吗？）",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我来自中国。我是中国人。",
          respuestaEsperada: "Soy de China. Soy chino.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "你来自哪个国家？",
          respuestaEsperada: "¿De qué país eres?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "她是墨西哥人。",
          respuestaEsperada: "Ella es mexicana.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "我们是美国人。",
          respuestaEsperada: "Somos estadounidenses.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "他来自法国。他是法国人。",
          respuestaEsperada: "Él es de Francia. Es francés.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "我出生在哥伦比亚。",
          respuestaEsperada: "Nací en Colombia.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "您的国籍是什么，先生？",
          respuestaEsperada: "¿Cuál es su nacionalidad, señor?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "我父母是意大利人。",
          respuestaEsperada: "Mis padres son italianos.",
          explicacion: "西班牙语翻译",
        },
      ],
    },
    ejerciciosPracticos: [
      {
        id: "ep1",
        tipo: "completarDialogo",
        titulo: "完成对话",
        tituloChino: "完成对话",
        instruccion: "用国家和国籍完成关于来源的对话。",
        instruccionChino: "用国家和国籍完成关于来源的对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "Hola, ¿de dónde _____?",
            respuesta: "eres",
          },
          {
            personaje: "B",
            texto: "_____ de China. ¿Y tú?",
            respuesta: "Soy",
          },
          {
            personaje: "A",
            texto: "Yo soy de _____. Soy mexicano.",
            respuesta: "México",
          },
          {
            personaje: "B",
            texto: "¿De qué ciudad de China _____?",
            respuesta: "eres",
          },
          {
            personaje: "A",
            texto: "Soy de _____.",
            respuesta: "Pekín",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "completarTabla",
        titulo: "完成表格",
        tituloChino: "完成表格",
        instruccion: "为每个国家写出正确的国籍。",
        instruccionChino: "为每个国家写出正确的国籍。",
        tabla: [
          {
            pais: "China",
            masculino: "chino",
            femenino: "china",
          },
          {
            pais: "España",
            masculino: "español",
            femenino: "española",
          },
          {
            pais: "México",
            masculino: "mexicano",
            femenino: "mexicana",
          },
          {
            pais: "Argentina",
            masculino: "argentino",
            femenino: "argentina",
          },
          {
            pais: "Colombia",
            masculino: "colombiano",
            femenino: "colombiana",
          },
          {
            pais: "Japón",
            masculino: "japonés",
            femenino: "japonesa",
          },
          {
            pais: "Francia",
            masculino: "francés",
            femenino: "francesa",
          },
          {
            pais: "Italia",
            masculino: "italiano",
            femenino: "italiana",
          },
          {
            pais: "Alemania",
            masculino: "alemán",
            femenino: "alemana",
          },
          {
            pais: "Estados Unidos",
            masculino: "estadounidense",
            femenino: "estadounidense",
          },
          {
            pais: "Canadá",
            masculino: "canadiense",
            femenino: "canadiense",
          },
          {
            pais: "Brasil",
            masculino: "brasileño",
            femenino: "brasileña",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "responder",
        titulo: "回答问题",
        tituloChino: "回答问题",
        instruccion: "用西班牙语回答以下关于你来源的问题。",
        instruccionChino: "用西班牙语回答以下关于你来源的问题。",
        preguntas: [
          {
            pregunta: "¿De dónde eres?",
            respuestaEsperada: "Soy de China.",
          },
          {
            pregunta: "¿Cuál es tu nacionalidad?",
            respuestaEsperada: "Soy chino / china.",
          },
          {
            pregunta: "¿De qué ciudad eres?",
            respuestaEsperada: "Soy de Pekín / Shanghái.",
          },
          {
            pregunta: "¿Dónde naciste?",
            respuestaEsperada: "Nací en [ciudad].",
          },
        ],
      },
      {
        id: "ep4",
        tipo: "clasificar",
        titulo: "Clasifica las nacionalidades",
        tituloChino: "分类国籍",
        instruccion: "Clasifica cada nacionalidad según su terminación.",
        instruccionChino: "根据结尾分类每个国籍。",
        nacionalidades: [
          {
            palabra: "mexicano",
            tipo: "-o / -a",
          },
          {
            palabra: "francés",
            tipo: "-és / -esa",
          },
          {
            palabra: "canadiense",
            tipo: "invariable",
          },
          {
            palabra: "alemán",
            tipo: "consonante",
          },
          {
            palabra: "italiano",
            tipo: "-o / -a",
          },
          {
            palabra: "estadounidense",
            tipo: "invariable",
          },
        ],
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "Preséntate en español. Di de dónde eres y tu nacionalidad.",
        preguntaChino: "用西班牙语自我介绍。说出你来自哪里和你的国籍。",
        sugerencia: "你可以说：Me llamo... Soy de... Soy...",
        sugerenciaChino: "你可以说：Me llamo... Soy de... Soy...",
      },
      {
        id: "pa2",
        pregunta: "¿Cómo preguntas '你来自哪里？' en español?",
        preguntaChino: "西班牙语中'你来自哪里？'怎么问？",
        sugerencia: "¿De dónde eres? (informal) / ¿De dónde es usted? (formal)",
        sugerenciaChino: "¿De dónde eres? (非正式) / ¿De dónde es usted? (正式)",
      },
      {
        id: "pa3",
        pregunta: "¿Cuál es la diferencia entre 'Soy de España' y 'Soy español'?",
        preguntaChino: "'Soy de España'和'Soy español'有什么区别？",
        sugerencia: "Uno indica origen, el otro indica nacionalidad.",
        sugerenciaChino: "一个表示来源，另一个表示国籍。",
      },
      {
        id: "pa4",
        pregunta: "¿Qué nacionalidades no cambian de género? Da un ejemplo.",
        preguntaChino: "哪些国籍不变化性别？举一个例子。",
        sugerencia: "Estadounidense, canadiense, belga, marroquí.",
        sugerenciaChino: "Estadounidense, canadiense, belga, marroquí等。",
      },
      {
        id: "pa5",
        pregunta: "Pregúntale a un compañero de dónde es y responde en español.",
        preguntaChino: "用西班牙语问一个同学他/她来自哪里，并回答。",
        sugerencia: "—¿De dónde eres? —Soy de...",
        sugerenciaChino: "—¿De dónde eres? —Soy de...",
      },
      {
        id: "pa6",
        pregunta: "¿Qué preguntas puedes hacer para saber más sobre el origen de una persona?",
        preguntaChino: "你可以问什么问题来了解更多关于一个人的来源？",
        sugerencia: "¿De qué ciudad eres?, ¿Dónde naciste?, ¿Cuánto tiempo llevas aquí?",
        sugerenciaChino: "¿De qué ciudad eres?, ¿Dónde naciste?, ¿Cuánto tiempo llevas aquí?",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '你来自哪里？' en español?",
        preguntaChino: "西班牙语中'你来自哪里？'怎么说？",
        respuestaSugerida: "¿De dónde eres?",
        respuestaSugeridaChino: "¿De dónde eres?",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '我来自中国' en español?",
        preguntaChino: "西班牙语中'我来自中国'怎么说？",
        respuestaSugerida: "Soy de China.",
        respuestaSugeridaChino: "Soy de China.",
      },
      {
        id: "p3",
        pregunta: "¿Cuál es la nacionalidad de una persona de México?",
        preguntaChino: "来自墨西哥的人的国籍是什么？",
        respuestaSugerida: "mexicano / mexicana",
        respuestaSugeridaChino: "mexicano / mexicana",
      },
      {
        id: "p4",
        pregunta: "¿Qué nacionalidad no cambia entre masculino y femenino?",
        preguntaChino: "哪个国籍在阳性和阴性之间不变化？",
        respuestaSugerida: "estadounidense",
        respuestaSugeridaChino: "estadounidense",
      },
      {
        id: "p5",
        pregunta: "¿Cómo preguntas '¿Y tú?' después de decir de dónde eres?",
        preguntaChino: "说完你来自哪里后，怎么问'你呢？'",
        respuestaSugerida: "¿Y tú?",
        respuestaSugeridaChino: "¿Y tú?",
      },
      {
        id: "p6",
        pregunta: "¿Qué significa 'Nací en...'?",
        preguntaChino: "'Nací en...'是什么意思？",
        respuestaSugerida: "Yo nací en... / I was born in...",
        respuestaSugeridaChino: "我出生在...",
      },
      {
        id: "p7",
        pregunta: "¿Cómo se dice '法国人' en español (femenino)?",
        preguntaChino: "西班牙语中'法国人'怎么说（阴性）？",
        respuestaSugerida: "francesa",
        respuestaSugeridaChino: "francesa",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Preguntar dónde se vive",
        tituloChino: "询问住在哪里",
        descripcion: `Para preguntar dónde vive alguien:

🔹 PREGUNTAS INFORMALES:
• ¿Dónde vives?
• ¿En qué ciudad vives?
• ¿En qué barrio vives?
• ¿Vives en casa o en apartamento?
• ¿Vives solo o acompañado?

🔹 PREGUNTAS FORMALES:
• ¿Dónde vive usted?
• ¿En qué ciudad vive usted?
• ¿En qué barrio vive?

🔹 CÓMO RESPONDER:
• Vivo en + ciudad/país/calle (Vivo en Madrid)
• Mi casa está en + lugar (Mi casa está en el centro)
• Vivo en un apartamento / una casa (Vivo en un piso)
• Vivo con mi familia / con amigos / solo/a (Vivo con mi familia)

📌 EJEMPLOS COMPLETOS:
• Vivo en Madrid, en el barrio de Salamanca.
• Mi casa está cerca de la estación de metro.
• Vivo en un piso compartido con dos amigos.
• Vivo solo desde hace dos años.

❌ ERROR COMÚN:
No digas "Vivo en un piso en Madrid centro" es correcto, pero cuidado con las preposiciones.`,
        descripcionChino: `询问某人住在哪里：

🔹 非正式问题：
• ¿Dónde vives? = 你住在哪里？
• ¿En qué ciudad vives? = 你住在哪个城市？
• ¿En qué barrio vives? = 你住在哪个社区？
• ¿Vives en casa o en apartamento? = 你住在房子还是公寓？
• ¿Vives solo o acompañado? = 你一个人住还是和别人一起住？

🔹 正式问题：
• ¿Dónde vive usted? = 您住在哪里？
• ¿En qué ciudad vive usted? = 您住在哪个城市？
• ¿En qué barrio vive? = 您住在哪个社区？

🔹 如何回答：
• Vivo en + 城市/国家/街道 = 我住在...
• Mi casa está en + 地方 = 我的房子在...
• Vivo en un apartamento / una casa = 我住在公寓/房子里
• Vivo con mi familia / con amigos / solo/a = 我和家人/朋友住/我一个人住

📌 完整例子：
• Vivo en Madrid, en el barrio de Salamanca. = 我住在马德里的萨拉曼卡区。
• Mi casa está cerca de la estación de metro. = 我的房子在地铁站附近。
• Vivo en un piso compartido con dos amigos. = 我和两个朋友合租公寓。
• Vivo solo desde hace dos años. = 我一个人住了两年。

❌ 常见错误：
不要混淆介词的使用。`,
        ejemplos: [
          {
            espanol: "—¿Dónde vives? —Vivo en Madrid.",
            chino: "—你住在哪里？—我住在马德里。",
          },
          {
            espanol: "—¿Vive usted en esta calle? —Sí, vivo aquí.",
            chino: "—您住在这条街上吗？—是的，我住在这里。",
          },
          {
            espanol: "Vivo en un apartamento pequeño.",
            chino: "我住在一个小公寓里。",
          },
          {
            espanol: "¿En qué barrio vives? —Vivo en el centro.",
            chino: "你住在哪个社区？—我住在市中心。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Tipos de vivienda",
        tituloChino: "住房类型",
        descripcion: `🔹 TIPOS DE VIVIENDA EN ESPAÑOL:

🏠 Casa (house) - vivienda unifamiliar
🏢 Apartamento / Piso (apartment) - en España se usa más "piso"
🏢 Dúplex (duplex) - dos plantas en un mismo apartamento
🌇 Ático (penthouse) - última planta, normalmente con terraza
📚 Estudio (studio) - una sola habitación
🏰 Chalet (chalet / villa) - casa grande con jardín
🌾 Casa rural (country house) - en el campo
🏫 Residencia estudiantil (student residence)
🏘️ Piso compartido (shared apartment)

🔹 PARTES DE LA VIVIENDA:
• salón / sala de estar = living room
• cocina = kitchen
• dormitorio / habitación = bedroom
• baño = bathroom
• comedor = dining room
• estudio / despacho = study / office
• terraza / balcón = terrace / balcony
• jardín = garden
• garaje = garage
• sótano = basement
• trastero = storage room
• recibidor / entrada = entrance hall

📌 NOTA CULTURAL:
En España, la mayoría de la gente vive en pisos en ciudades grandes. Las casas unifamiliares son más comunes en pueblos y afueras.`,
        descripcionChino: `🔹 西班牙语中的住房类型：

🏠 Casa = 房子（独户住宅）
🏢 Apartamento / Piso = 公寓（在西班牙更常用"piso"）
🏢 Dúplex = 复式公寓（同一公寓有两层）
🌇 Ático = 顶层公寓（顶楼，通常有露台）
📚 Estudio = 单间公寓（只有一个房间）
🏰 Chalet = 别墅（带花园的大房子）
🌾 Casa rural = 乡村别墅
🏫 Residencia estudiantil = 学生宿舍
🏘️ Piso compartido = 合租公寓

🔹 住房的各个部分：
• salón / sala de estar = 客厅
• cocina = 厨房
• dormitorio / habitación = 卧室
• baño = 浴室
• comedor = 餐厅
• estudio / despacho = 书房/办公室
• terraza / balcón = 阳台
• jardín = 花园
• garaje = 车库
• sótano = 地下室
• trastero = 储藏室
• recibidor / entrada = 门厅/入口

📌 文化提示：
在西班牙，大多数人住在城市的大公寓里。独户住宅在村庄和郊区更常见。`,
        ejemplos: [
          {
            espanol: "Vivo en un piso en el centro.",
            chino: "我住在市中心的一套公寓里。",
          },
          {
            espanol: "Mi casa tiene jardín.",
            chino: "我的房子有花园。",
          },
          {
            espanol: "Comparto piso con dos amigos.",
            chino: "我和两个朋友合租公寓。",
          },
          {
            espanol: "Vivo en un estudio porque es más barato.",
            chino: "我住在单间公寓里，因为更便宜。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Preposiciones de lugar",
        tituloChino: "地点介词",
        descripcion: `🔹 PREPOSICIONES DE LUGAR BÁSICAS:

• en = in / on / at (en la casa, en la mesa)
• sobre / encima de = on top of (sobre la mesa)
• debajo de = under (debajo de la silla)
• delante de = in front of (delante de la puerta)
• detrás de = behind (detrás del sofá)
• al lado de = next to (al lado de la ventana)
• cerca de = near (cerca del parque)
• lejos de = far from (lejos del centro)
• enfrente de = opposite (enfrente del banco)
• entre = between (entre la cocina y el comedor)
• dentro de = inside (dentro de la caja)
• fuera de = outside (fuera de la ciudad)

🔹 EJEMPLOS CON PREGUNTAS:
• ¿Dónde está el supermercado? — Está cerca de mi casa.
• ¿Dónde vives? — Vivo al lado del parque.
• ¿Tu habitación está en la primera planta? — No, está en la tercera.

📌 DIFERENCIA IMPORTANTE:
• Cerca de = cerca (en distancia)
• Al lado de = inmediatamente al lado, sin distancia

Ejemplo:
• El banco está cerca del supermercado (a 200 metros)
• El banco está al lado del supermercado (pared con pared)`,
        descripcionChino: `🔹 基本地点介词：

• en = 在...里面/上面/at
• sobre / encima de = 在...上面
• debajo de = 在...下面
• delante de = 在...前面
• detrás de = 在...后面
• al lado de = 在...旁边
• cerca de = 在...附近
• lejos de = 离...远
• enfrente de = 在...对面
• entre = 在...之间
• dentro de = 在...里面
• fuera de = 在...外面

🔹 带问题的例子：
• ¿Dónde está el supermercado? — Está cerca de mi casa. = 超市在哪里？—在我家附近。
• ¿Dónde vives? — Vivo al lado del parque. = 你住在哪里？—我住在公园旁边。
• ¿Tu habitación está en la primera planta? — No, está en la tercera. = 你的房间在一楼吗？—不，在三楼。

📌 重要区别：
• Cerca de = 附近（有一定距离）
• Al lado de = 紧挨着（紧邻）

例子：
• El banco está cerca del supermercado (a 200 metros) = 银行在超市附近（200米远）
• El banco está al lado del supermercado (pared con pared) = 银行在超市旁边（紧挨着）`,
        ejemplos: [
          {
            espanol: "El libro está sobre la mesa.",
            chino: "书在桌子上。",
          },
          {
            espanol: "El gato está debajo de la silla.",
            chino: "猫在椅子下面。",
          },
          {
            espanol: "Vivo cerca del parque.",
            chino: "我住在公园附近。",
          },
          {
            espanol: "Mi casa está enfrente del banco.",
            chino: "我的房子在银行对面。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Describir tu vivienda",
        tituloChino: "描述你的住房",
        descripcion: `🔹 CÓMO DESCRIBIR TU CASA O PISO:

TAMAÑO (tamaño):
• Mi casa es grande / pequeña / mediana.
• El piso tiene cien metros cuadrados.
• Tengo mucho espacio / poco espacio.

HABITACIONES (habitaciones):
• Mi apartamento tiene tres dormitorios y dos baños.
• La cocina es muy luminosa.
• El salón es amplio y cómodo.

UBICACIÓN (ubicación):
• Vivo en el centro de la ciudad.
• Mi casa está cerca del metro.
• El barrio es tranquilo / ruidoso.

EXTERIOR (exterior):
• Tenemos una terraza grande.
• El jardín es precioso.
• La casa tiene vistas al mar.

🔹 ADJETIVOS ÚTILES PARA DESCRIBIR:
• luminoso/a = bright
• amplio/a = spacious
• acogedor/a = cozy
• moderno/a = modern
• antiguo/a = old / antique
• reformado/a = renovated
• amueblado/a = furnished
• vacío/a = empty

🔹 EJEMPLOS COMPLETOS:
• Vivo en un piso amplio y luminoso en el centro.
• Mi casa es pequeña pero muy acogedora.
• El apartamento está amueblado y tiene terraza.
• Vivo en un barrio tranquilo cerca de la playa.`,
        descripcionChino: `🔹 如何描述你的房子或公寓：

大小：
• Mi casa es grande / pequeña / mediana. = 我的房子很大/很小/中等。
• El piso tiene cien metros cuadrados. = 公寓有一百平方米。
• Tengo mucho espacio / poco espacio. = 我有很大空间/空间很小。

房间：
• Mi apartamento tiene tres dormitorios y dos baños. = 我的公寓有三个卧室和两个浴室。
• La cocina es muy luminosa. = 厨房非常明亮。
• El salón es amplio y cómodo. = 客厅宽敞舒适。

位置：
• Vivo en el centro de la ciudad. = 我住在市中心。
• Mi casa está cerca del metro. = 我的房子在地铁附近。
• El barrio es tranquilo / ruidoso. = 社区安静/吵闹。

外部：
• Tenemos una terraza grande. = 我们有一个大露台。
• El jardín es precioso. = 花园很美。
• La casa tiene vistas al mar. = 房子能看到海景。

🔹 描述的有用形容词：
• luminoso/a = 明亮的
• amplio/a = 宽敞的
• acogedor/a = 舒适的
• moderno/a = 现代的
• antiguo/a = 古老的/旧的
• reformado/a = 翻新的
• amueblado/a = 带家具的
• vacío/a = 空的

🔹 完整例子：
• Vivo en un piso amplio y luminoso en el centro. = 我住在市中心一个宽敞明亮的公寓里。
• Mi casa es pequeña pero muy acogedora. = 我的房子很小但很舒适。
• El apartamento está amueblado y tiene terraza. = 公寓带家具，有露台。
• Vivo en un barrio tranquilo cerca de la playa. = 我住在海滩附近一个安静的社区。`,
        ejemplos: [
          {
            espanol: "Mi casa es grande y luminosa.",
            chino: "我的房子又大又明亮。",
          },
          {
            espanol: "El piso tiene tres habitaciones.",
            chino: "公寓有三个房间。",
          },
          {
            espanol: "Vivo en un barrio muy tranquilo.",
            chino: "我住在一个非常安静的社区。",
          },
          {
            espanol: "Mi apartamento está amueblado.",
            chino: "我的公寓带家具。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "vivir",
        chino: "住/生活",
        ejemplo: "Vivo en Madrid.",
      },
      {
        id: "v2",
        espanol: "¿Dónde vives?",
        chino: "你住在哪里？",
        ejemplo: "¿Dónde vives?",
      },
      {
        id: "v3",
        espanol: "¿Dónde vive usted?",
        chino: "您住在哪里？(正式)",
        ejemplo: "¿Dónde vive usted?",
      },
      {
        id: "v4",
        espanol: "casa",
        chino: "房子",
        ejemplo: "Mi casa es grande.",
      },
      {
        id: "v5",
        espanol: "apartamento / piso",
        chino: "公寓",
        ejemplo: "Vivo en un piso.",
      },
      {
        id: "v6",
        espanol: "estudio",
        chino: "单间公寓",
        ejemplo: "Vivo en un estudio pequeño.",
      },
      {
        id: "v7",
        espanol: "chalet",
        chino: "别墅",
        ejemplo: "Ellos tienen un chalet.",
      },
      {
        id: "v8",
        espanol: "ático",
        chino: "顶层公寓",
        ejemplo: "Vive en un ático con terraza.",
      },
      {
        id: "v9",
        espanol: "dúplex",
        chino: "复式公寓",
        ejemplo: "Compraron un dúplex.",
      },
      {
        id: "v10",
        espanol: "piso compartido",
        chino: "合租公寓",
        ejemplo: "Vivo en un piso compartido.",
      },
      {
        id: "v11",
        espanol: "calle",
        chino: "街道",
        ejemplo: "Vivo en la calle Mayor.",
      },
      {
        id: "v12",
        espanol: "ciudad",
        chino: "城市",
        ejemplo: "Vivo en una ciudad grande.",
      },
      {
        id: "v13",
        espanol: "barrio",
        chino: "社区",
        ejemplo: "El barrio es tranquilo.",
      },
      {
        id: "v14",
        espanol: "centro",
        chino: "市中心",
        ejemplo: "El centro está lejos.",
      },
      {
        id: "v15",
        espanol: "cerca de",
        chino: "在...附近",
        ejemplo: "Vivo cerca de la escuela.",
      },
      {
        id: "v16",
        espanol: "lejos de",
        chino: "离...远",
        ejemplo: "Vivo lejos del trabajo.",
      },
      {
        id: "v17",
        espanol: "al lado de",
        chino: "在...旁边",
        ejemplo: "Vivo al lado del parque.",
      },
      {
        id: "v18",
        espanol: "enfrente de",
        chino: "在...对面",
        ejemplo: "Vivo enfrente del banco.",
      },
      {
        id: "v19",
        espanol: "detrás de",
        chino: "在...后面",
        ejemplo: "El jardín está detrás de la casa.",
      },
      {
        id: "v20",
        espanol: "delante de",
        chino: "在...前面",
        ejemplo: "Hay un árbol delante de mi ventana.",
      },
      {
        id: "v21",
        espanol: "entre",
        chino: "在...之间",
        ejemplo: "Vivo entre la farmacia y el supermercado.",
      },
      {
        id: "v22",
        espanol: "amueblado",
        chino: "带家具的",
        ejemplo: "El piso está amueblado.",
      },
      {
        id: "v23",
        espanol: "luminoso",
        chino: "明亮的",
        ejemplo: "Mi habitación es luminosa.",
      },
      {
        id: "v24",
        espanol: "acogedor",
        chino: "舒适的",
        ejemplo: "Tu casa es muy acogedora.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Conociendo a un nuevo vecino",
        tituloChino: "认识新邻居",
        personajes: ["Ana", "Carlos"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Hola, soy Ana. Vivo en el piso 3. ¿Y tú?",
            traduccion: "你好，我是安娜。我住在3楼。你呢？",
          },
          {
            personaje: "Carlos",
            texto: "Hola, yo soy Carlos. Vivo en el piso 5. ¿De dónde eres?",
            traduccion: "你好，我是卡洛斯。我住在5楼。你来自哪里？",
          },
          {
            personaje: "Ana",
            texto: "Soy de Colombia, pero vivo aquí desde hace dos años.",
            traduccion: "我来自哥伦比亚，但在这里住了两年了。",
          },
          {
            personaje: "Carlos",
            texto: "¡Qué bien! ¿Te gusta el barrio?",
            traduccion: "真好！你喜欢这个社区吗？",
          },
          {
            personaje: "Ana",
            texto: "Sí, es muy tranquilo y está cerca del centro.",
            traduccion: "是的，很安静，离市中心很近。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Buscando piso",
        tituloChino: "找房子",
        personajes: ["Elena", "Agente"],
        lineas: [
          {
            personaje: "Agente",
            texto: "¿Qué tipo de piso buscas?",
            traduccion: "你在找什么样的公寓？",
          },
          {
            personaje: "Elena",
            texto: "Busco un piso pequeño, cerca de la universidad.",
            traduccion: "我在找一个小公寓，靠近大学。",
          },
          {
            personaje: "Agente",
            texto: "Tenemos un estudio en la calle Mayor. Es muy céntrico.",
            traduccion: "我们在马约尔街有一个单间公寓。很市中心。",
          },
          {
            personaje: "Elena",
            texto: "¿Está lejos del metro?",
            traduccion: "离地铁远吗？",
          },
          {
            personaje: "Agente",
            texto: "No, está al lado de la estación.",
            traduccion: "不远，就在地铁站旁边。",
          },
          {
            personaje: "Elena",
            texto: "Perfecto. ¿Cuánto cuesta?",
            traduccion: "完美。多少钱？",
          },
          {
            personaje: "Agente",
            texto: "Cuesta ochocientos euros al mes.",
            traduccion: "每月八百欧元。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Describiendo tu casa",
        tituloChino: "描述你的房子",
        personajes: ["María", "Pedro"],
        lineas: [
          {
            personaje: "María",
            texto: "Pedro, ¿cómo es tu nueva casa?",
            traduccion: "佩德罗，你的新房子怎么样？",
          },
          {
            personaje: "Pedro",
            texto: "Es un piso pequeño pero muy luminoso.",
            traduccion: "是一个小公寓，但非常明亮。",
          },
          {
            personaje: "María",
            texto: "¿Cuántas habitaciones tiene?",
            traduccion: "有几个房间？",
          },
          {
            personaje: "Pedro",
            texto: "Tiene dos dormitorios, un baño y un salón grande.",
            traduccion: "有两个卧室，一个浴室和一个大客厅。",
          },
          {
            personaje: "María",
            texto: "¿Tiene terraza?",
            traduccion: "有露台吗？",
          },
          {
            personaje: "Pedro",
            texto: "Sí, una pequeña. Desde allí se ve toda la ciudad.",
            traduccion: "是的，一个小露台。从那里可以看到整个城市。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Preguntando por la ubicación",
        tituloChino: "询问位置",
        personajes: ["Turista", "Local"],
        lineas: [
          {
            personaje: "Turista",
            texto: "Disculpe, ¿dónde está la Plaza Mayor?",
            traduccion: "打扰一下，马约尔广场在哪里？",
          },
          {
            personaje: "Local",
            texto: "Está cerca de aquí. Siga recto dos calles.",
            traduccion: "离这里很近。直走两条街。",
          },
          {
            personaje: "Turista",
            texto: "¿Hay algún supermercado cerca?",
            traduccion: "附近有超市吗？",
          },
          {
            personaje: "Local",
            texto: "Sí, hay uno al lado del banco, enfrente de la farmacia.",
            traduccion: "是的，银行旁边有一个，在药店对面。",
          },
          {
            personaje: "Turista",
            texto: "Muchas gracias por su ayuda.",
            traduccion: "非常感谢您的帮助。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Comparando viviendas",
        tituloChino: "比较住房",
        personajes: ["Laura", "Sofía"],
        lineas: [
          {
            personaje: "Laura",
            texto: "Sofía, ¿dónde vives ahora?",
            traduccion: "索菲亚，你现在住在哪里？",
          },
          {
            personaje: "Sofía",
            texto: "Vivo en un piso compartido con dos amigas.",
            traduccion: "我和两个朋友合租公寓。",
          },
          {
            personaje: "Laura",
            texto: "¿Y antes dónde vivías?",
            traduccion: "那你以前住在哪里？",
          },
          {
            personaje: "Sofía",
            texto: "Antes vivía sola en un estudio, pero era muy pequeño.",
            traduccion: "我以前一个人住在单间公寓，但太小了。",
          },
          {
            personaje: "Laura",
            texto: "¿Y ahora cómo es?",
            traduccion: "现在怎么样？",
          },
          {
            personaje: "Sofía",
            texto: "Ahora tengo más espacio y la zona es más tranquila.",
            traduccion: "现在我有更多空间，区域也更安静。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "为了问'你住在哪里？'：¿Dónde _____?",
          preguntaChino: "为了问'你住在哪里？'：¿Dónde _____?",
          respuestaCorrecta: "vives",
          explicacion: "'¿Dónde vives?' = 你住在哪里？",
          pista: "首字母是 v，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c2",
          pregunta: "为了回答'我住在马德里'：Vivo en _____",
          preguntaChino: "为了回答'我住在马德里'：Vivo en _____",
          respuestaCorrecta: "Madrid",
          explicacion: "Madrid是马德里。",
          pista: "首字母是 M，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c3",
          pregunta: "为了说'在...附近'：_____ de",
          preguntaChino: "为了说'在...附近'：_____ de",
          respuestaCorrecta: "cerca",
          explicacion: "'Cerca de' = 在...附近。",
          pista: "首字母是 c，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c4",
          pregunta: "为了说'离...远'：_____ de",
          preguntaChino: "为了说'离...远'：_____ de",
          respuestaCorrecta: "lejos",
          explicacion: "'Lejos de' = 离...远。",
          pista: "首字母是 l，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c5",
          pregunta: "为了说'在...旁边'：al _____ de",
          preguntaChino: "为了说'在...旁边'：al _____ de",
          respuestaCorrecta: "lado",
          explicacion: "'Al lado de' = 在...旁边。",
          pista: "首字母是 l，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c6",
          pregunta: "为了说'在...对面'：_____ de",
          preguntaChino: "为了说'在...对面'：_____ de",
          respuestaCorrecta: "enfrente",
          explicacion: "'Enfrente de' = 在...对面。",
          pista: "首字母是 e，8个字母",
          numeroLetras: 8,
        },
        {
          id: "c7",
          pregunta: "为了说'公寓带家具'：El piso está _____",
          preguntaChino: "为了说'公寓带家具'：El piso está _____",
          respuestaCorrecta: "amueblado",
          explicacion: "Amueblado = 带家具的。",
          pista: "首字母是 a，10个字母",
          numeroLetras: 10,
        },
        {
          id: "c8",
          pregunta: "为了正式地问'您住在哪里？'：¿Dónde _____ usted?",
          preguntaChino: "为了正式地问'您住在哪里？'：¿Dónde _____ usted?",
          respuestaCorrecta: "vive",
          explicacion: "'¿Dónde vive usted?' = 您住在哪里？",
          pista: "首字母是 v，4个字母",
          numeroLetras: 4,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "如何正式地问'您住在哪里？'",
          preguntaChino: "如何正式地问'您住在哪里？'",
          opciones: ["¿Dónde vives?", "¿Dónde vive usted?", "¿Cómo estás?", "¿Qué tal?"],
          respuestaCorrecta: "¿Dónde vive usted?",
          explicacion: "'¿Dónde vive usted?'是正式形式。",
        },
        {
          id: "s2",
          pregunta: "'Vivo en un piso'意思是...",
          preguntaChino: "'Vivo en un piso'意思是...",
          opciones: ["我住在房子里", "我住在公寓里", "我住在别墅里", "我住在学校里"],
          respuestaCorrecta: "我住在公寓里",
          explicacion: "'Piso'在西班牙是公寓的意思。",
        },
        {
          id: "s3",
          pregunta: "¿Qué significa 'cerca de'?",
          preguntaChino: "'cerca de'是什么意思？",
          opciones: ["在...里面", "在...附近", "离...远", "在...对面"],
          respuestaCorrecta: "在...附近",
          explicacion: "'Cerca de' = 在...附近。",
        },
        {
          id: "s4",
          pregunta: "¿Qué significa 'lejos de'?",
          preguntaChino: "'lejos de'是什么意思？",
          opciones: ["在...里面", "在...附近", "离...远", "在...旁边"],
          respuestaCorrecta: "离...远",
          explicacion: "'Lejos de' = 离...远。",
        },
        {
          id: "s5",
          pregunta: "¿Qué tipo de vivienda es un 'ático'?",
          preguntaChino: "'ático'是什么类型的住房？",
          opciones: ["地下室", "顶层公寓", "别墅", "学生宿舍"],
          respuestaCorrecta: "顶层公寓",
          explicacion: "'Ático' = 顶层公寓。",
        },
        {
          id: "s6",
          pregunta: "¿Qué significa 'amueblado'?",
          preguntaChino: "'amueblado'是什么意思？",
          opciones: ["空的", "翻新的", "带家具的", "明亮的"],
          respuestaCorrecta: "带家具的",
          explicacion: "Amueblado = 带家具的。",
        },
        {
          id: "s7",
          pregunta: "如何说'我住在市中心'？",
          preguntaChino: "如何说'我住在市中心'？",
          opciones: ["Vivo en el barrio", "Vivo en el centro", "Vivo en la calle", "Vivo en la ciudad"],
          respuestaCorrecta: "Vivo en el centro",
          explicacion: "Centro = 市中心。",
        },
        {
          id: "s8",
          pregunta: "¿Qué significa 'piso compartido'?",
          preguntaChino: "'piso compartido'是什么意思？",
          opciones: ["单人公寓", "合租公寓", "顶层公寓", "复式公寓"],
          respuestaCorrecta: "合租公寓",
          explicacion: "Piso compartido = 合租公寓。",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Vivo en Madrid' significa que vivo en Madrid.",
          preguntaChino: "'Vivo en Madrid'意思是我住在马德里。",
          respuestaCorrecta: true,
          explicacion: "对。'Vivo en Madrid' = 我住在马德里。",
        },
        {
          id: "vf2",
          pregunta: "'Al lado de' significa 'lejos de'.",
          preguntaChino: "'Al lado de'意思是'离...远'。",
          respuestaCorrecta: false,
          explicacion: "错。'Al lado de' = 在...旁边。",
        },
        {
          id: "vf3",
          pregunta: "En España se usa más 'apartamento' que 'piso'.",
          preguntaChino: "在西班牙，'apartamento'比'piso'更常用。",
          respuestaCorrecta: false,
          explicacion: "错。在西班牙，'piso'比'apartamento'更常用。",
        },
        {
          id: "vf4",
          pregunta: "'Delante de' significa 'in front of'.",
          preguntaChino: "'Delante de'意思是'在...前面'。",
          respuestaCorrecta: true,
          explicacion: "对。'Delante de' = 在...前面。",
        },
        {
          id: "vf5",
          pregunta: "'Entre' se usa para dos o más cosas.",
          preguntaChino: "'Entre'用于两个或多个事物之间。",
          respuestaCorrecta: true,
          explicacion: "对。'Entre' = 在...之间。",
        },
        {
          id: "vf6",
          pregunta: "Un 'estudio' es un apartamento con varias habitaciones.",
          preguntaChino: "Un 'estudio'是有多个房间的公寓。",
          respuestaCorrecta: false,
          explicacion: "错。Estudio = 单间公寓（只有一个房间）。",
        },
        {
          id: "vf7",
          pregunta: "'Cerca de' y 'al lado de' tienen el mismo significado.",
          preguntaChino: "'Cerca de'和'al lado de'意思相同。",
          respuestaCorrecta: false,
          explicacion: "错。Al lado de = 紧挨着，cerca de = 附近。",
        },
        {
          id: "vf8",
          pregunta: "'Enfrente de' significa 'en la acera de enfrente'.",
          preguntaChino: "'Enfrente de'意思是'在对面'。",
          respuestaCorrecta: true,
          explicacion: "对。Enfrente de = 在对面。",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "casa",
              derecha: "房子",
            },
            {
              izquierda: "piso",
              derecha: "公寓",
            },
            {
              izquierda: "ático",
              derecha: "顶层公寓",
            },
            {
              izquierda: "estudio",
              derecha: "单间公寓",
            },
            {
              izquierda: "chalet",
              derecha: "别墅",
            },
            {
              izquierda: "cerca de",
              derecha: "在...附近",
            },
            {
              izquierda: "lejos de",
              derecha: "离...远",
            },
            {
              izquierda: "al lado de",
              derecha: "在...旁边",
            },
            {
              izquierda: "delante de",
              derecha: "在...前面",
            },
            {
              izquierda: "detrás de",
              derecha: "在...后面",
            },
            {
              izquierda: "enfrente de",
              derecha: "在...对面",
            },
            {
              izquierda: "entre",
              derecha: "在...之间",
            },
            {
              izquierda: "¿Dónde vives?",
              derecha: "你住在哪里？",
            },
          ],
          explicacion: "将住房词汇与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["Madrid", "Vivo", "en", "."],
          respuestaCorrecta: "Vivo en Madrid.",
          explicacion: "正确的顺序是：Vivo en Madrid.（我住在马德里。）",
        },
        {
          id: "o2",
          palabras: ["vives", "dónde", "¿", "?"],
          respuestaCorrecta: "¿Dónde vives?",
          explicacion: "正确的顺序是：¿Dónde vives?（你住在哪里？）",
        },
        {
          id: "o3",
          palabras: ["parque", "cerca", "del", "está", "Mi", "casa"],
          respuestaCorrecta: "Mi casa está cerca del parque.",
          explicacion: "正确的顺序是：Mi casa está cerca del parque.（我的房子在公园附近。）",
        },
        {
          id: "o4",
          palabras: ["piso", "compartido", "Vivo", "un", "en", "."],
          respuestaCorrecta: "Vivo en un piso compartido.",
          explicacion: "正确的顺序是：Vivo en un piso compartido.（我住在合租公寓。）",
        },
        {
          id: "o5",
          palabras: ["metro", "está", "al", "lado", "del", "El", "banco"],
          respuestaCorrecta: "El banco está al lado del metro.",
          explicacion: "正确的顺序是：El banco está al lado del metro.（银行在地铁旁边。）",
        },
        {
          id: "o6",
          palabras: ["tu", "cerca", "casa", "está", "universidad", "¿", "de", "la", "?"],
          respuestaCorrecta: "¿Tu casa está cerca de la universidad?",
          explicacion: "正确的顺序是：¿Tu casa está cerca de la universidad?（你的房子在大学附近吗？）",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我住在巴塞罗那。",
          respuestaEsperada: "Vivo en Barcelona.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "我的房子在学校附近。",
          respuestaEsperada: "Mi casa está cerca de la escuela.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "你住在哪里？",
          respuestaEsperada: "¿Dónde vives?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "我和两个朋友合租公寓。",
          respuestaEsperada: "Comparto piso con dos amigos.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "银行在地铁站旁边。",
          respuestaEsperada: "El banco está al lado de la estación de metro.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "我的房子在药店对面。",
          respuestaEsperada: "Mi casa está enfrente de la farmacia.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "我住在一个非常安静的社区。",
          respuestaEsperada: "Vivo en un barrio muy tranquilo.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "公寓带家具吗？",
          respuestaEsperada: "¿El piso está amueblado?",
          explicacion: "西班牙语翻译",
        },
      ],
    },
    ejerciciosPracticos: [
      {
        id: "ep1",
        tipo: "completarDialogo",
        titulo: "完成对话",
        tituloChino: "完成对话",
        instruccion: "用正确的住房词汇完成对话。",
        instruccionChino: "用正确的住房词汇完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿Dónde _____?",
            respuesta: "vives",
          },
          {
            personaje: "B",
            texto: "Vivo en un _____ en el centro.",
            respuesta: "piso / apartamento",
          },
          {
            personaje: "A",
            texto: "¿Está _____ del metro?",
            respuesta: "cerca / lejos",
          },
          {
            personaje: "B",
            texto: "Sí, está _____ lado de la estación.",
            respuesta: "al",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "responder",
        titulo: "回答问题",
        tituloChino: "回答问题",
        instruccion: "用西班牙语回答以下关于你住处的问题。",
        instruccionChino: "用西班牙语回答以下关于你住处的问题。",
        preguntas: [
          {
            pregunta: "¿Dónde vives?",
            respuestaEsperada: "Vivo en [ciudad].",
          },
          {
            pregunta: "¿Vives en casa o en apartamento?",
            respuestaEsperada: "Vivo en un(a) (casa / apartamento / piso).",
          },
          {
            pregunta: "¿Tu casa está cerca del centro?",
            respuestaEsperada: "Sí, está cerca / No, está lejos.",
          },
          {
            pregunta: "¿Vives solo o acompañado?",
            respuestaEsperada: "Vivo solo / con mi familia / con amigos.",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "describir",
        titulo: "Describe tu casa o apartamento",
        tituloChino: "描述你的房子或公寓",
        instruccion: "Escribe 4-5 frases describiendo tu vivienda ideal.",
        instruccionChino: "写4-5句话描述你理想的住房。",
        ejemplo:
          "Mi casa ideal es grande y luminosa. Tiene tres dormitorios, un jardín y una terraza. Está cerca del centro pero en un barrio tranquilo. Me encantaría vivir allí algún día.",
      },
      {
        id: "ep4",
        tipo: "preposiciones",
        titulo: "Completa con la preposición correcta",
        tituloChino: "用正确的介词填空",
        instruccion: "Elige la preposición correcta para cada frase.",
        instruccionChino: "为每个句子选择正确的介词。",
        frases: [
          {
            frase: "El libro está _____ (sobre / debajo de / al lado de) la mesa.",
            respuesta: "sobre",
          },
          {
            frase: "Vivo _____ (cerca de / lejos de) la playa, a solo 5 minutos.",
            respuesta: "cerca de",
          },
          {
            frase: "El banco está _____ (delante de / detrás de / entre) la farmacia y el supermercado.",
            respuesta: "entre",
          },
        ],
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Dónde vives? Responde en español.",
        preguntaChino: "你住在哪里？用西班牙语回答。",
        sugerencia: "你可以说：Vivo en...",
        sugerenciaChino: "你可以说：Vivo en...",
      },
      {
        id: "pa2",
        pregunta: "Describe tu casa o apartamento en español.",
        preguntaChino: "用西班牙语描述你的房子或公寓。",
        sugerencia: "Mi casa es... Tiene... Está cerca de...",
        sugerenciaChino: "Mi casa es... Tiene... Está cerca de...",
      },
      {
        id: "pa3",
        pregunta: "¿Qué hay cerca de tu casa?",
        preguntaChino: "你家附近有什么？",
        sugerencia: "Cerca de mi casa hay un parque, un supermercado...",
        sugerenciaChino: "Cerca de mi casa hay un parque, un supermercado...",
      },
      {
        id: "pa4",
        pregunta: "¿Prefieres vivir en una casa o en un apartamento? ¿Por qué?",
        preguntaChino: "你更喜欢住房子还是公寓？为什么？",
        sugerencia: "Prefiero vivir en una casa porque tengo más espacio y jardín.",
        sugerenciaChino: "Prefiero vivir en una casa porque tengo más espacio y jardín.",
      },
      {
        id: "pa5",
        pregunta: "¿Cómo describirías tu barrio ideal?",
        preguntaChino: "你会如何描述你理想的社区？",
        sugerencia: "Mi barrio ideal es tranquilo, cerca del centro, con parques y tiendas.",
        sugerenciaChino: "Mi barrio ideal es tranquilo, cerca del centro, con parques y tiendas.",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '你住在哪里？' en español?",
        preguntaChino: "西班牙语中'你住在哪里？'怎么说？",
        respuestaSugerida: "¿Dónde vives?",
        respuestaSugeridaChino: "¿Dónde vives?",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '我住在公寓里' en español?",
        preguntaChino: "西班牙语中'我住在公寓里'怎么说？",
        respuestaSugerida: "Vivo en un apartamento / piso.",
        respuestaSugeridaChino: "Vivo en un apartamento / piso.",
      },
      {
        id: "p3",
        pregunta: "¿Qué significa 'cerca de'?",
        preguntaChino: "'cerca de'是什么意思？",
        respuestaSugerida: "En español significa 'near'.",
        respuestaSugeridaChino: "在...附近",
      },
      {
        id: "p4",
        pregunta: "¿Cómo preguntas formalmente '¿Dónde vive usted?'?",
        preguntaChino: "如何正式地问'您住在哪里？'",
        respuestaSugerida: "¿Dónde vive usted?",
        respuestaSugeridaChino: "¿Dónde vive usted?",
      },
      {
        id: "p5",
        pregunta: "¿Cuál es la diferencia entre 'cerca de' y 'al lado de'?",
        preguntaChino: "'cerca de' 和 'al lado de' 有什么区别？",
        respuestaSugerida: "Al lado de = inmediatamente al lado. Cerca de = a una distancia corta.",
        respuestaSugeridaChino: "Al lado de = 紧挨着。Cerca de = 附近有一定距离。",
      },
      {
        id: "p6",
        pregunta: "¿Qué significa 'piso compartido'?",
        preguntaChino: "'piso compartido'是什么意思？",
        respuestaSugerida: "Un apartamento que se vive con otras personas.",
        respuestaSugeridaChino: "和别人一起住的公寓。",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Profesiones comunes",
        tituloChino: "常见职业",
        descripcion: `🔹 PROFESIONES EN ESPAÑOL (masculino / femenino):

SALUD:
• médico / médica = doctor
• enfermero / enfermera = nurse
• dentista = dentist (invariable)
• veterinario / veterinaria = vet
• farmacéutico / farmacéutica = pharmacist
• psicólogo / psicóloga = psychologist

EDUCACIÓN:
• profesor / profesora = teacher
• maestro / maestra = primary teacher
• director / directora = principal / director
• orientador / orientadora = counselor

INGENIERÍA Y TÉCNICA:
• ingeniero / ingeniera = engineer
• arquitecto / arquitecta = architect
• informático / informática = IT specialist
• técnico / técnica = technician

DERECHO Y ADMINISTRACIÓN:
• abogado / abogada = lawyer
• juez / jueza = judge
• contable / contador / contadora = accountant
• secretario / secretaria = secretary
• administrativo / administrativa = administrative assistant

ARTES Y SERVICIOS:
• artista = artist (invariable)
• músico / música = musician
• escritor / escritora = writer
• periodista = journalist (invariable)
• diseñador / diseñadora = designer
• fotógrafo / fotógrafa = photographer

COMERCIO Y HOSTELERÍA:
• cocinero / cocinera = cook / chef
• camarero / camarera = waiter/waitress
• panadero / panadera = baker
• carnicero / carnicera = butcher
• dependiente / dependienta = shop assistant
• vendedor / vendedora = salesperson

OTROS:
• policía = police officer (invariable)
• bombero / bombera = firefighter
• taxista = taxi driver (invariable)
• conductor / conductora = driver
• piloto = pilot (invariable)
• azafato / azafata = flight attendant
• peluquero / peluquera = hairdresser
• estudiante = student (invariable)
• jubilado / jubilada = retired person

📌 NOTA: Las profesiones que terminan en -ista o en -e son invariables (periodista, taxista, estudiante).`,
        descripcionChino: `🔹 西班牙语中的职业（阳性/阴性）：

健康：
• médico / médica = 医生
• enfermero / enfermera = 护士
• dentista = 牙医（不变）
• veterinario / veterinaria = 兽医
• farmacéutico / farmacéutica = 药剂师
• psicólogo / psicóloga = 心理学家

教育：
• profesor / profesora = 老师
• maestro / maestra = 小学老师
• director / directora = 校长/主任
• orientador / orientadora = 辅导员

工程和技术：
• ingeniero / ingeniera = 工程师
• arquitecto / arquitecta = 建筑师
• informático / informática = IT专家
• técnico / técnica = 技术员

法律和行政：
• abogado / abogada = 律师
• juez / jueza = 法官
• contable / contador / contadora = 会计
• secretario / secretaria = 秘书
• administrativo / administrativa = 行政助理

艺术和服务：
• artista = 艺术家（不变）
• músico / música = 音乐家
• escritor / escritora = 作家
• periodista = 记者（不变）
• diseñador / diseñadora = 设计师
• fotógrafo / fotógrafa = 摄影师

商业和餐饮：
• cocinero / cocinera = 厨师
• camarero / camarera = 服务员
• panadero / panadera = 面包师
• carnicero / carnicera = 肉店老板
• dependiente / dependienta = 店员
• vendedor / vendedora = 销售员

其他：
• policía = 警察（不变）
• bombero / bombera = 消防员
• taxista = 出租车司机（不变）
• conductor / conductora = 司机
• piloto = 飞行员（不变）
• azafato / azafata = 空乘
• peluquero / peluquera = 理发师
• estudiante = 学生（不变）
• jubilado / jubilada = 退休人员

📌 注意：以-ista或-e结尾的职业是不变词（periodista, taxista, estudiante）。`,
        ejemplos: [
          {
            espanol: "Soy médico en un hospital.",
            chino: "我是医院的医生。",
          },
          {
            espanol: "Ella es profesora de español.",
            chino: "她是西班牙语老师。",
          },
          {
            espanol: "Mi hermano es ingeniero.",
            chino: "我兄弟是工程师。",
          },
          {
            espanol: "Trabajo de camarero en un restaurante italiano.",
            chino: "我在一家意大利餐厅做服务员。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Preguntar por la profesión",
        tituloChino: "询问职业",
        descripcion: `🔹 PREGUNTAS INFORMALES:
• ¿A qué te dedicas?
• ¿En qué trabajas?
• ¿Cuál es tu profesión?
• ¿Qué haces?
• ¿Dónde trabajas?

🔹 PREGUNTAS FORMALES:
• ¿A qué se dedica usted?
• ¿En qué trabaja usted?
• ¿Cuál es su profesión?
• ¿Cuál es su ocupación?

🔹 CÓMO RESPONDER:
• Soy + profesión (Soy médico)
• Trabajo de + profesión (Trabajo de enfermero)
• Trabajo en + lugar (Trabajo en un hospital)
• Me dedico a + sector/actividad (Me dedico a la enseñanza)

📌 DIFERENCIA ENTRE "SOY" Y "TRABAJO DE":
• "Soy + profesión" indica identidad profesional (Soy abogado)
• "Trabajo de + profesión" indica la actividad laboral (Trabajo de camarero mientras estudio)

🔹 PREGUNTAS ADICIONALES SOBRE EL TRABAJO:
• ¿Te gusta tu trabajo? (¿Te gusta tu trabajo?)
• ¿Cuántas horas trabajas al día? (¿Cuántas horas trabajas al día?)
• ¿Trabajas los fines de semana? (¿Trabajas los fines de semana?)
• ¿Desde cuándo trabajas allí? (¿Desde cuándo trabajas allí?)
• ¿Cuál es tu horario? (¿Cuál es tu horario?)`,
        descripcionChino: `🔹 非正式问题：
• ¿A qué te dedicas? = 你是做什么工作的？
• ¿En qué trabajas? = 你在哪里工作？
• ¿Cuál es tu profesión? = 你的职业是什么？
• ¿Qué haces? = 你做什么工作？
• ¿Dónde trabajas? = 你在哪里工作？

🔹 正式问题：
• ¿A qué se dedica usted? = 您是做什么工作的？
• ¿En qué trabaja usted? = 您在哪里工作？
• ¿Cuál es su profesión? = 您的职业是什么？
• ¿Cuál es su ocupación? = 您的职业是什么？

🔹 如何回答：
• Soy + 职业 = 我是...
• Trabajo de + 职业 = 我做...工作
• Trabajo en + 地方 = 我在...工作
• Me dedico a + 领域/活动 = 我从事...

📌 "SOY" 和 "TRABAJO DE" 的区别：
• "Soy + 职业" 表示职业身份
• "Trabajo de + 职业" 表示工作活动

🔹 关于工作的其他问题：
• ¿Te gusta tu trabajo? = 你喜欢你的工作吗？
• ¿Cuántas horas trabajas al día? = 你每天工作几小时？
• ¿Trabajas los fines de semana? = 你周末工作吗？
• ¿Desde cuándo trabajas allí? = 你在那里工作多久了？
• ¿Cuál es tu horario? = 你的工作时间是几点？`,
        ejemplos: [
          {
            espanol: "—¿A qué te dedicas? —Soy abogado.",
            chino: "—你是做什么工作的？—我是律师。",
          },
          {
            espanol: "—¿Dónde trabajas? —Trabajo en un banco.",
            chino: "—你在哪里工作？—我在银行工作。",
          },
          {
            espanol: "—¿En qué trabajas? —Trabajo de enfermera.",
            chino: "—你做什么工作？—我做护士工作。",
          },
          {
            espanol: "—¿Te gusta tu trabajo? —Sí, me encanta.",
            chino: "—你喜欢你的工作吗？—是的，我很喜欢。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Lugares de trabajo",
        tituloChino: "工作场所",
        descripcion: `🔹 LUGARES DE TRABAJO COMUNES:

• hospital (médicos, enfermeros)
• clínica (médicos, dentistas)
• escuela / colegio (profesores)
• universidad (profesores universitarios)
• oficina (oficinistas, administrativos, secretarios)
• juzgado (abogados, jueces)
• restaurante (camareros, cocineros)
• bar / cafetería (camareros)
• hotel (recepcionistas, camareros)
• comisaría / policía (policías)
• parque de bomberos (bomberos)
• fábrica (obreros, operarios)
• tienda / comercio (dependientes)
• banco (empleados de banco)
• consultorio (médicos, psicólogos)
• taller (mecánicos)
• peluquería (peluqueros)
• aeropuerto (pilotos, azafatos)
• construcción (albañiles, arquitectos)

🔹 VERBOS RELACIONADOS CON EL TRABAJO:
• trabajar = to work
• estudiar = to study
• contratar = to hire
• despedir = to fire
• cobrar = to get paid / to charge
• ascender = to get promoted
• jubilarse = to retire
• buscar trabajo = to look for a job
• encontrar trabajo = to find a job
• perder el trabajo = to lose the job

🔹 CÓMO HABLAR DE LA JORNADA LABORAL:
• Trabajo a tiempo completo (full time)
• Trabajo a tiempo parcial (part time)
• Tengo jornada continua (continuous shift)
• Tengo jornada partida (split shift)
• Hago horas extras (I do overtime)`,
        descripcionChino: `🔹 常见工作场所：

• hospital = 医院（医生、护士）
• clínica = 诊所（医生、牙医）
• escuela / colegio = 学校（老师）
• universidad = 大学（大学教授）
• oficina = 办公室（职员、行政人员、秘书）
• juzgado = 法院（律师、法官）
• restaurante = 餐厅（服务员、厨师）
• bar / cafetería = 酒吧/咖啡馆（服务员）
• hotel = 酒店（前台、服务员）
• comisaría / policía = 警察局（警察）
• parque de bomberos = 消防站（消防员）
• fábrica = 工厂（工人、操作员）
• tienda / comercio = 商店（店员）
• banco = 银行（银行职员）
• consultorio = 诊所（医生、心理学家）
• taller = 车间（机械师）
• peluquería = 理发店（理发师）
• aeropuerto = 机场（飞行员、空乘）
• construcción = 建筑工地（建筑工人、建筑师）

🔹 与工作相关的动词：
• trabajar = 工作
• estudiar = 学习
• contratar = 雇佣
• despedir = 解雇
• cobrar = 领工资
• ascender = 升职
• jubilarse = 退休
• buscar trabajo = 找工作
• encontrar trabajo = 找到工作
• perder el trabajo = 失去工作

🔹 如何谈论工作时间：
• Trabajo a tiempo completo = 全职工作
• Trabajo a tiempo parcial = 兼职工作
• Tengo jornada continua = 连续班（不午休）
• Tengo jornada partida = 分段班（午休时间长）
• Hago horas extras = 我加班`,
        ejemplos: [
          {
            espanol: "Mi padre trabaja en un hospital.",
            chino: "我父亲在医院工作。",
          },
          {
            espanol: "Ella trabaja en una oficina.",
            chino: "她在办公室工作。",
          },
          {
            espanol: "Los camareros trabajan en restaurantes.",
            chino: "服务员在餐厅工作。",
          },
          {
            espanol: "Estoy buscando trabajo.",
            chino: "我在找工作。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Expresiones útiles sobre el trabajo",
        tituloChino: "关于工作的有用表达",
        descripcion: `🔹 PARA HABLAR DE TU TRABAJO:
• Estoy desempleado/a = I'm unemployed
• Estoy en paro = I'm unemployed (España)
• Estoy buscando trabajo activamente = I'm actively looking for a job
• Trabajo por cuenta propia / autónomo = I'm self-employed
• Tengo un trabajo fijo = I have a permanent job
• Tengo un trabajo temporal = I have a temporary job
• Me han despedido = I've been fired
• He dejado el trabajo = I've quit my job
• Me he jubilado = I've retired

🔹 PARA PREGUNTAR SOBRE EL TRABAJO DE OTROS:
• ¿Te gusta tu trabajo? (¿Te gusta tu trabajo?)
• ¿Cómo es tu jefe? (¿Cómo es tu jefe?)
• ¿Cómo son tus compañeros? (¿Cómo son tus compañeros?)
• ¿Cuánto ganas? (¡Cuidado! Es una pregunta personal) (¿Cuánto ganas?)
• ¿Tienes vacaciones? (¿Tienes vacaciones?)

🔹 EXPRESIONES DE SATISFACCIÓN LABORAL:
• Me encanta mi trabajo (I love my job)
• Estoy muy contento/a con mi trabajo (I'm very happy with my job)
• Mi trabajo es muy gratificante (My job is very rewarding)
• Tengo suerte de tener este trabajo (I'm lucky to have this job)

🔹 EXPRESIONES DE INSATISFACCIÓN LABORAL:
• No me gusta mi trabajo (I don't like my job)
• Mi trabajo es muy estresante (My job is very stressful)
• Estoy cansado/a de mi trabajo (I'm tired of my job)
• El ambiente laboral es malo (The work environment is bad)`,
        descripcionChino: `🔹 谈论你的工作：
• Estoy desempleado/a = 我失业了
• Estoy en paro = 我失业了（西班牙）
• Estoy buscando trabajo activamente = 我正在积极找工作
• Trabajo por cuenta propia / autónomo = 我自己当老板/个体户
• Tengo un trabajo fijo = 我有固定工作
• Tengo un trabajo temporal = 我有临时工作
• Me han despedido = 我被解雇了
• He dejado el trabajo = 我辞职了
• Me he jubilado = 我退休了

🔹 询问别人的工作：
• ¿Te gusta tu trabajo? = 你喜欢你的工作吗？
• ¿Cómo es tu jefe? = 你的老板怎么样？
• ¿Cómo son tus compañeros? = 你的同事怎么样？
• ¿Cuánto ganas? = 你赚多少钱？（小心！这是私人问题）
• ¿Tienes vacaciones? = 你有假期吗？

🔹 工作满意度表达：
• Me encanta mi trabajo = 我热爱我的工作
• Estoy muy contento/a con mi trabajo = 我对我的工作很满意
• Mi trabajo es muy gratificante = 我的工作很有成就感
• Tengo suerte de tener este trabajo = 我很幸运拥有这份工作

🔹 工作不满表达：
• No me gusta mi trabajo = 我不喜欢我的工作
• Mi trabajo es muy estresante = 我的工作压力很大
• Estoy cansado/a de mi trabajo = 我厌倦了我的工作
• El ambiente laboral es malo = 工作环境不好`,
        ejemplos: [
          {
            espanol: "Estoy buscando trabajo desde hace tres meses.",
            chino: "我三个月前开始找工作。",
          },
          {
            espanol: "Trabajo por cuenta propia, tengo mi propia tienda.",
            chino: "我为自己工作，我拥有自己的店。",
          },
          {
            espanol: "Me encanta mi trabajo, es muy gratificante.",
            chino: "我热爱我的工作，非常有成就感。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "médico / médica",
        chino: "医生",
        ejemplo: "Soy médico.",
      },
      {
        id: "v2",
        espanol: "enfermero / enfermera",
        chino: "护士",
        ejemplo: "Mi hermana es enfermera.",
      },
      {
        id: "v3",
        espanol: "profesor / profesora",
        chino: "老师",
        ejemplo: "Mi madre es profesora.",
      },
      {
        id: "v4",
        espanol: "maestro / maestra",
        chino: "小学老师",
        ejemplo: "Ella es maestra.",
      },
      {
        id: "v5",
        espanol: "ingeniero / ingeniera",
        chino: "工程师",
        ejemplo: "Mi hermano es ingeniero.",
      },
      {
        id: "v6",
        espanol: "arquitecto / arquitecta",
        chino: "建筑师",
        ejemplo: "Él es arquitecto.",
      },
      {
        id: "v7",
        espanol: "abogado / abogada",
        chino: "律师",
        ejemplo: "Ella es abogada.",
      },
      {
        id: "v8",
        espanol: "juez / jueza",
        chino: "法官",
        ejemplo: "Es un juez muy justo.",
      },
      {
        id: "v9",
        espanol: "cocinero / cocinera",
        chino: "厨师",
        ejemplo: "Trabajo de cocinero.",
      },
      {
        id: "v10",
        espanol: "camarero / camarera",
        chino: "服务员",
        ejemplo: "Soy camarero.",
      },
      {
        id: "v11",
        espanol: "policía",
        chino: "警察",
        ejemplo: "Mi tío es policía.",
      },
      {
        id: "v12",
        espanol: "bombero / bombera",
        chino: "消防员",
        ejemplo: "Él es bombero.",
      },
      {
        id: "v13",
        espanol: "periodista",
        chino: "记者",
        ejemplo: "Ella es periodista.",
      },
      {
        id: "v14",
        espanol: "artista",
        chino: "艺术家",
        ejemplo: "Soy artista.",
      },
      {
        id: "v15",
        espanol: "músico / música",
        chino: "音乐家",
        ejemplo: "Mi padre es músico.",
      },
      {
        id: "v16",
        espanol: "escritor / escritora",
        chino: "作家",
        ejemplo: "Es una escritora famosa.",
      },
      {
        id: "v17",
        espanol: "diseñador / diseñadora",
        chino: "设计师",
        ejemplo: "Trabajo de diseñadora.",
      },
      {
        id: "v18",
        espanol: "fotógrafo / fotógrafa",
        chino: "摄影师",
        ejemplo: "Él es fotógrafo.",
      },
      {
        id: "v19",
        espanol: "dentista",
        chino: "牙医",
        ejemplo: "Mi dentista es muy bueno.",
      },
      {
        id: "v20",
        espanol: "veterinario / veterinaria",
        chino: "兽医",
        ejemplo: "Cuida de los animales.",
      },
      {
        id: "v21",
        espanol: "psicólogo / psicóloga",
        chino: "心理学家",
        ejemplo: "Ella es psicóloga.",
      },
      {
        id: "v22",
        espanol: "contable / contador",
        chino: "会计",
        ejemplo: "Mi tía es contable.",
      },
      {
        id: "v23",
        espanol: "secretario / secretaria",
        chino: "秘书",
        ejemplo: "Trabaja como secretaria.",
      },
      {
        id: "v24",
        espanol: "dependiente / dependienta",
        chino: "店员",
        ejemplo: "Es dependiente en una tienda.",
      },
      {
        id: "v25",
        espanol: "vendedor / vendedora",
        chino: "销售员",
        ejemplo: "Vende coches usados.",
      },
      {
        id: "v26",
        espanol: "taxista",
        chino: "出租车司机",
        ejemplo: "Conduce un taxi.",
      },
      {
        id: "v27",
        espanol: "piloto",
        chino: "飞行员",
        ejemplo: "Vuela aviones.",
      },
      {
        id: "v28",
        espanol: "azafato / azafata",
        chino: "空乘",
        ejemplo: "Trabaja en aviones.",
      },
      {
        id: "v29",
        espanol: "peluquero / peluquera",
        chino: "理发师",
        ejemplo: "Me corta el pelo.",
      },
      {
        id: "v30",
        espanol: "estudiante",
        chino: "学生",
        ejemplo: "Todavía soy estudiante.",
      },
      {
        id: "v31",
        espanol: "jubilado / jubilada",
        chino: "退休人员",
        ejemplo: "Mi abuelo es jubilado.",
      },
      {
        id: "v32",
        espanol: "¿A qué te dedicas?",
        chino: "你是做什么工作的？",
        ejemplo: "¿A qué te dedicas?",
      },
      {
        id: "v33",
        espanol: "trabajar",
        chino: "工作",
        ejemplo: "Trabajo en Madrid.",
      },
      {
        id: "v34",
        espanol: "oficina",
        chino: "办公室",
        ejemplo: "Trabajo en una oficina.",
      },
      {
        id: "v35",
        espanol: "hospital",
        chino: "医院",
        ejemplo: "Mi madre trabaja en un hospital.",
      },
      {
        id: "v36",
        espanol: "restaurante",
        chino: "餐厅",
        ejemplo: "Trabajo en un restaurante.",
      },
      {
        id: "v37",
        espanol: "autónomo",
        chino: "个体户",
        ejemplo: "Soy autónomo, tengo mi negocio.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Conociendo a alguien nuevo",
        tituloChino: "认识新朋友",
        personajes: ["Carlos", "Ana"],
        lineas: [
          {
            personaje: "Carlos",
            texto: "Hola, soy Carlos. ¿A qué te dedicas?",
            traduccion: "你好，我是卡洛斯。你是做什么工作的？",
          },
          {
            personaje: "Ana",
            texto: "Hola Carlos, soy Ana. Soy profesora de inglés. ¿Y tú?",
            traduccion: "你好卡洛斯，我是安娜。我是英语老师。你呢？",
          },
          {
            personaje: "Carlos",
            texto: "Yo soy médico. Trabajo en el hospital central.",
            traduccion: "我是医生。我在中心医院工作。",
          },
          {
            personaje: "Ana",
            texto: "¡Qué interesante! ¿Te gusta tu trabajo?",
            traduccion: "真有趣！你喜欢你的工作吗？",
          },
          {
            personaje: "Carlos",
            texto: "Sí, me encanta. Ayudar a la gente es muy gratificante.",
            traduccion: "是的，我很喜欢。帮助别人很有成就感。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "En una entrevista de trabajo",
        tituloChino: "在工作面试中",
        personajes: ["Entrevistador", "Candidato"],
        lineas: [
          {
            personaje: "Entrevistador",
            texto: "Buenos días. ¿Cuál es su profesión?",
            traduccion: "早上好。您的职业是什么？",
          },
          {
            personaje: "Candidato",
            texto: "Soy ingeniero informático.",
            traduccion: "我是计算机工程师。",
          },
          {
            personaje: "Entrevistador",
            texto: "¿Dónde trabajó antes?",
            traduccion: "您以前在哪里工作？",
          },
          {
            personaje: "Candidato",
            texto: "Trabajé en una empresa de tecnología durante cinco años.",
            traduccion: "我在一家科技公司工作了五年。",
          },
          {
            personaje: "Entrevistador",
            texto: "¿Por qué quiere trabajar aquí?",
            traduccion: "您为什么想在这里工作？",
          },
          {
            personaje: "Candidato",
            texto: "Porque me interesa el proyecto y quiero crecer profesionalmente.",
            traduccion: "因为我对这个项目感兴趣，我想在职业上成长。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Hablando de la familia",
        tituloChino: "谈论家庭",
        personajes: ["María", "Pedro"],
        lineas: [
          {
            personaje: "María",
            texto: "Pedro, ¿a qué se dedican tus padres?",
            traduccion: "佩德罗，你的父母是做什么工作的？",
          },
          {
            personaje: "Pedro",
            texto: "Mi padre es arquitecto y mi madre es enfermera.",
            traduccion: "我父亲是建筑师，我母亲是护士。",
          },
          {
            personaje: "María",
            texto: "¿Y tu hermana?",
            traduccion: "你的妹妹呢？",
          },
          {
            personaje: "Pedro",
            texto: "Mi hermana todavía es estudiante. Estudia medicina en la universidad.",
            traduccion: "我妹妹还是学生。她在大学学医。",
          },
          {
            personaje: "María",
            texto: "¡Qué bien! ¿Y tú qué haces?",
            traduccion: "真好！你呢？",
          },
          {
            personaje: "Pedro",
            texto: "Yo trabajo de camarero en un restaurante italiano.",
            traduccion: "我在一家意大利餐厅做服务员。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Hablando del trabajo ideal",
        tituloChino: "谈论理想工作",
        personajes: ["Laura", "David"],
        lineas: [
          {
            personaje: "Laura",
            texto: "David, ¿qué te gustaría ser de mayor?",
            traduccion: "大卫，你长大后想做什么？",
          },
          {
            personaje: "David",
            texto: "Me gustaría ser piloto. Siempre me han gustado los aviones.",
            traduccion: "我想当飞行员。我一直很喜欢飞机。",
          },
          {
            personaje: "Laura",
            texto: "¡Qué chulo! ¿Y qué estás estudiando?",
            traduccion: "真酷！你在学什么？",
          },
          {
            personaje: "David",
            texto: "Estoy estudiando para ser piloto. Es duro, pero me encanta.",
            traduccion: "我在学怎么当飞行员。很辛苦，但我很喜欢。",
          },
          {
            personaje: "Laura",
            texto: "Yo quiero ser diseñadora de moda. Me encanta la ropa.",
            traduccion: "我想当时装设计师。我喜欢衣服。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Cambio de trabajo",
        tituloChino: "换工作",
        personajes: ["Sofía", "Carlos"],
        lineas: [
          {
            personaje: "Sofía",
            texto: "Carlos, he escuchado que cambiaste de trabajo. ¿Es verdad?",
            traduccion: "卡洛斯，我听说你换工作了。是真的吗？",
          },
          {
            personaje: "Carlos",
            texto: "Sí, hace un mes. Ahora trabajo como contable en una empresa grande.",
            traduccion: "是的，一个月前。现在我在一家大公司做会计。",
          },
          {
            personaje: "Sofía",
            texto: "¿Y cómo te va?",
            traduccion: "怎么样？",
          },
          {
            personaje: "Carlos",
            texto: "Muy bien. El ambiente laboral es bueno y mis compañeros son simpáticos.",
            traduccion: "很好。工作环境很好，我的同事很友好。",
          },
          {
            personaje: "Sofía",
            texto: "¿Ganas más que antes?",
            traduccion: "你比以前赚得多吗？",
          },
          {
            personaje: "Carlos",
            texto: "Sí, un poco más. Además, tengo mejor horario.",
            traduccion: "是的，多一点。而且，我的时间安排更好了。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "Una persona que enseña en una escuela es: _____",
          preguntaChino: "在学校教书的人是：_____",
          respuestaCorrecta: "profesor",
          explicacion: "老师教书。",
          pista: "首字母是 p，8个字母",
          numeroLetras: 8,
        },
        {
          id: "c2",
          pregunta: "Una persona que cura a los enfermos es: _____",
          preguntaChino: "治疗病人的人是：_____",
          respuestaCorrecta: "médico",
          explicacion: "医生治疗病人。",
          pista: "首字母是 m，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c3",
          pregunta: "Para preguntar la profesión de forma informal: ¿A qué te _____?",
          preguntaChino: "非正式地问职业：¿A qué te _____?",
          respuestaCorrecta: "dedicas",
          explicacion: "'¿A qué te dedicas?' = 你是做什么工作的？",
          pista: "首字母是 d，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c4",
          pregunta: "Una mujer que sirve comida en un restaurante es: _____",
          preguntaChino: "在餐厅上菜的女性是：_____",
          respuestaCorrecta: "camarera",
          explicacion: "女服务员是'camarera'。",
          pista: "首字母是 c，8个字母",
          numeroLetras: 8,
        },
        {
          id: "c5",
          pregunta: "El lugar donde trabajan los médicos es el: _____",
          preguntaChino: "医生工作的地方是：_____",
          respuestaCorrecta: "hospital",
          explicacion: "医生在医院工作。",
          pista: "首字母是 h，8个字母",
          numeroLetras: 8,
        },
        {
          id: "c6",
          pregunta: "Una persona que diseña edificios es: _____",
          preguntaChino: "设计建筑的人是：_____",
          respuestaCorrecta: "arquitecto",
          explicacion: "Arquitecto = 建筑师。",
          pista: "首字母是 a，10个字母",
          numeroLetras: 10,
        },
        {
          id: "c7",
          pregunta: "Una persona que trabaja en un juzgado defendiendo a personas es: _____",
          preguntaChino: "在法院工作为人们辩护的人是：_____",
          respuestaCorrecta: "abogado",
          explicacion: "Abogado = 律师。",
          pista: "首字母是 a，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c8",
          pregunta: "Para preguntar la profesión de forma formal: ¿A qué se _____ usted?",
          preguntaChino: "正式地问职业：¿A qué se _____ usted?",
          respuestaCorrecta: "dedica",
          explicacion: "'¿A qué se dedica usted?' = 您是做什么工作的？",
          pista: "首字母是 d，6个字母",
          numeroLetras: 6,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "¿Quién trabaja en un restaurante?",
          preguntaChino: "谁在餐厅工作？",
          opciones: ["médico", "camarero", "profesor", "bombero"],
          respuestaCorrecta: "camarero",
          explicacion: "服务员在餐厅工作。",
        },
        {
          id: "s2",
          pregunta: "¿Cómo se dice '律师' en español?",
          preguntaChino: "西班牙语中'律师'怎么说？",
          opciones: ["médico", "abogado", "ingeniero", "cocinero"],
          respuestaCorrecta: "abogado",
          explicacion: "'Abogado' = 律师。",
        },
        {
          id: "s3",
          pregunta: "¿Qué profesión ayuda cuando hay fuego?",
          preguntaChino: "发生火灾时哪种职业会帮忙？",
          opciones: ["policía", "bombero", "médico", "camarero"],
          respuestaCorrecta: "bombero",
          explicacion: "消防员在火灾时帮忙。",
        },
        {
          id: "s4",
          pregunta: "¿Cuál es la forma correcta para una mujer: 'Soy _____'?",
          preguntaChino: "女性的正确形式是：'Soy _____'？",
          opciones: ["ingeniero", "ingeniera", "ingeniero", "ingenieros"],
          respuestaCorrecta: "ingeniera",
          explicacion: "女工程师是'ingeniera'。",
        },
        {
          id: "s5",
          pregunta: "¿Dónde trabaja un policía?",
          preguntaChino: "警察在哪里工作？",
          opciones: ["hospital", "escuela", "comisaría", "restaurante"],
          respuestaCorrecta: "comisaría",
          explicacion: "警察在警察局工作。",
        },
        {
          id: "s6",
          pregunta: "¿Qué significa 'autónomo'?",
          preguntaChino: "'autónomo'是什么意思？",
          opciones: ["退休人员", "个体户/自雇", "失业者", "实习生"],
          respuestaCorrecta: "个体户/自雇",
          explicacion: "Autónomo = 个体户/自雇。",
        },
        {
          id: "s7",
          pregunta: "¿Cómo se dice '我退休了' en español?",
          preguntaChino: "西班牙语中'我退休了'怎么说？",
          opciones: ["Estoy jubilado", "Estoy trabajando", "Estoy estudiando", "Estoy cansado"],
          respuestaCorrecta: "Estoy jubilado",
          explicacion: "Jubilado = 退休的。",
        },
        {
          id: "s8",
          pregunta: "¿Cuál de estas profesiones es invariable (no cambia de género)?",
          preguntaChino: "哪种职业是不变词（不变化性别）？",
          opciones: ["médico", "periodista", "abogado", "cocinero"],
          respuestaCorrecta: "periodista",
          explicacion: "Periodista es invariable.",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Profesor' solo puede ser hombre.",
          preguntaChino: "'Profesor'只能指男性。",
          respuestaCorrecta: false,
          explicacion: "错。'Profesor'是阳性，'profesora'是阴性。",
        },
        {
          id: "vf2",
          pregunta: "'Policía' es igual para hombre y mujer.",
          preguntaChino: "'Policía'男性和女性都一样。",
          respuestaCorrecta: true,
          explicacion: "对。'Policía'不变化性别。",
        },
        {
          id: "vf3",
          pregunta: "Un estudiante trabaja (generalmente).",
          preguntaChino: "学生通常工作。",
          respuestaCorrecta: false,
          explicacion: "错。学生学习，通常不工作。",
        },
        {
          id: "vf4",
          pregunta: "Un bombero apaga incendios.",
          preguntaChino: "消防员灭火。",
          respuestaCorrecta: true,
          explicacion: "对。'Bombero' = 消防员。",
        },
        {
          id: "vf5",
          pregunta: "Se dice 'Trabajo de médico' para decir '我当医生'.",
          preguntaChino: "为了说'我当医生'，我们说'Trabajo de médico'。",
          respuestaCorrecta: true,
          explicacion: "对。'Trabajo de + 职业' = 我当...",
        },
        {
          id: "vf6",
          pregunta: "'Taxista' cambia de género: taxisto / taxista.",
          preguntaChino: "'Taxista'变化性别：taxisto / taxista。",
          respuestaCorrecta: false,
          explicacion: "错。Taxista es invariable.",
        },
        {
          id: "vf7",
          pregunta: "Un 'arquitecto' diseña edificios.",
          preguntaChino: "'Arquitecto'设计建筑。",
          respuestaCorrecta: true,
          explicacion: "对。Arquitecto = 建筑师。",
        },
        {
          id: "vf8",
          pregunta: "'Jubilado' significa que la persona todavía trabaja.",
          preguntaChino: "'Jubilado'意思是那个人还在工作。",
          respuestaCorrecta: false,
          explicacion: "错。Jubilado = 退休的。",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "médico",
              derecha: "医生",
            },
            {
              izquierda: "profesor",
              derecha: "老师",
            },
            {
              izquierda: "ingeniero",
              derecha: "工程师",
            },
            {
              izquierda: "cocinero",
              derecha: "厨师",
            },
            {
              izquierda: "camarero",
              derecha: "服务员",
            },
            {
              izquierda: "policía",
              derecha: "警察",
            },
            {
              izquierda: "bombero",
              derecha: "消防员",
            },
            {
              izquierda: "abogado",
              derecha: "律师",
            },
            {
              izquierda: "arquitecto",
              derecha: "建筑师",
            },
            {
              izquierda: "periodista",
              derecha: "记者",
            },
            {
              izquierda: "dentista",
              derecha: "牙医",
            },
            {
              izquierda: "taxista",
              derecha: "出租车司机",
            },
          ],
          explicacion: "将职业与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["médico", "Soy", "."],
          respuestaCorrecta: "Soy médico.",
          explicacion: "正确的顺序是：Soy médico.（我是医生。）",
        },
        {
          id: "o2",
          palabras: ["te", "dedicas", "a", "qué", "¿", "?"],
          respuestaCorrecta: "¿A qué te dedicas?",
          explicacion: "正确的顺序是：¿A qué te dedicas?（你是做什么工作的？）",
        },
        {
          id: "o3",
          palabras: ["hospital", "en", "un", "Trabajo", "."],
          respuestaCorrecta: "Trabajo en un hospital.",
          explicacion: "正确的顺序是：Trabajo en un hospital.（我在医院工作。）",
        },
        {
          id: "o4",
          palabras: ["camarera", "es", "restaurante", "en", "un", "Ella"],
          respuestaCorrecta: "Ella es camarera en un restaurante.",
          explicacion: "正确的顺序是：Ella es camarera en un restaurante.（她在一家餐厅当服务员。）",
        },
        {
          id: "o5",
          palabras: ["gusta", "trabajo", "me", "Tu", "?"],
          respuestaCorrecta: "¿Te gusta tu trabajo?",
          explicacion: "正确的顺序是：¿Te gusta tu trabajo?（你喜欢你的工作吗？）",
        },
        {
          id: "o6",
          palabras: ["jubilado", "mi", "está", "abuelo", "."],
          respuestaCorrecta: "Mi abuelo está jubilado.",
          explicacion: "正确的顺序是：Mi abuelo está jubilado.（我爷爷退休了。）",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我是老师。我在学校工作。",
          respuestaEsperada: "Soy profesor. Trabajo en una escuela.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "她是一名医生。她在医院工作。",
          respuestaEsperada: "Ella es médica. Trabaja en un hospital.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "你想当工程师吗？",
          respuestaEsperada: "¿Quieres ser ingeniero?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "我的父母都退休了。",
          respuestaEsperada: "Mis padres están jubilados.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "我是一名记者。我喜欢我的工作。",
          respuestaEsperada: "Soy periodista. Me gusta mi trabajo.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "她在一家餐厅当服务员。",
          respuestaEsperada: "Ella trabaja de camarera en un restaurante.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "我的哥哥是建筑师。",
          respuestaEsperada: "Mi hermano mayor es arquitecto.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "你做什么工作？—我是个体户。",
          respuestaEsperada: "¿A qué te dedicas? —Soy autónomo.",
          explicacion: "西班牙语翻译",
        },
      ],
    },
    ejerciciosPracticos: [
      {
        id: "ep1",
        tipo: "completarDialogo",
        titulo: "完成对话",
        tituloChino: "完成对话",
        instruccion: "用正确的职业完成对话。",
        instruccionChino: "用正确的职业完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿A qué te _____?",
            respuesta: "dedicas",
          },
          {
            personaje: "B",
            texto: "Soy _____. ¿Y tú?",
            respuesta: "médico / profesor / ingeniero",
          },
          {
            personaje: "A",
            texto: "Yo trabajo de _____.",
            respuesta: "cocinero / camarero",
          },
          {
            personaje: "B",
            texto: "¿Dónde _____?",
            respuesta: "trabajas",
          },
          {
            personaje: "A",
            texto: "Trabajo en un _____.",
            respuesta: "restaurante / hospital",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "responder",
        titulo: "回答问题",
        tituloChino: "回答问题",
        instruccion: "用西班牙语回答以下关于你工作的问题。",
        instruccionChino: "用西班牙语回答以下关于你工作的问题。",
        preguntas: [
          {
            pregunta: "¿A qué te dedicas?",
            respuestaEsperada: "Soy (profesión).",
          },
          {
            pregunta: "¿Dónde trabajas?",
            respuestaEsperada: "Trabajo en (lugar).",
          },
          {
            pregunta: "¿Te gusta tu trabajo?",
            respuestaEsperada: "Sí, me gusta / No, no me gusta.",
          },
          {
            pregunta: "¿Cuál es tu horario de trabajo?",
            respuestaEsperada: "Trabajo de 9 a 6.",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "clasificar",
        titulo: "Clasifica las profesiones",
        tituloChino: "分类职业",
        instruccion: "Clasifica cada profesión en la categoría correcta (salud, educación, justicia, etc.).",
        instruccionChino: "将每个职业分类到正确的类别（健康、教育、司法等）。",
        profesiones: [
          {
            profesion: "médico",
            categoria: "salud",
          },
          {
            profesion: "profesor",
            categoria: "educación",
          },
          {
            profesion: "abogado",
            categoria: "justicia",
          },
          {
            profesion: "ingeniero",
            categoria: "técnica",
          },
          {
            profesion: "camarero",
            categoria: "hostelería",
          },
        ],
      },
      {
        id: "ep4",
        tipo: "completarTabla",
        titulo: "Completa la tabla de profesiones",
        tituloChino: "完成职业表格",
        instruccion: "Escribe la forma femenina de cada profesión.",
        instruccionChino: "写出每个职业的阴性形式。",
        tabla: [
          {
            masculino: "médico",
            femenino: "médica",
          },
          {
            masculino: "profesor",
            femenino: "profesora",
          },
          {
            masculino: "ingeniero",
            femenino: "ingeniera",
          },
          {
            masculino: "abogado",
            femenino: "abogada",
          },
          {
            masculino: "cocinero",
            femenino: "cocinera",
          },
          {
            masculino: "camarero",
            femenino: "camarera",
          },
          {
            masculino: "arquitecto",
            femenino: "arquitecta",
          },
        ],
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿A qué te dedicas? Responde en español.",
        preguntaChino: "你是做什么工作的？用西班牙语回答。",
        sugerencia: "你可以说：Soy (profesión).",
        sugerenciaChino: "你可以说：Soy (职业).",
      },
      {
        id: "pa2",
        pregunta: "Describe el trabajo de tus padres en español.",
        preguntaChino: "用西班牙语描述你父母的工作。",
        sugerencia: "Mi padre es... Mi madre es...",
        sugerenciaChino: "Mi padre es... Mi madre es...",
      },
      {
        id: "pa3",
        pregunta: "¿Qué profesión te gustaría tener en el futuro? ¿Por qué?",
        preguntaChino: "你未来想做什么职业？为什么？",
        sugerencia: "Me gustaría ser... porque...",
        sugerenciaChino: "Me gustaría ser... porque...",
      },
      {
        id: "pa4",
        pregunta: "¿Cuál es la diferencia entre 'Soy médico' y 'Trabajo de médico'?",
        preguntaChino: "'Soy médico'和'Trabajo de médico'有什么区别？",
        sugerencia:
          "Ambas frases significan lo mismo. 'Soy' indica profesión, 'trabajo de' indica la actividad.",
        sugerenciaChino: "两个句子意思相同。'Soy'表示职业，'trabajo de'表示工作活动。",
      },
      {
        id: "pa5",
        pregunta: "¿Qué preguntas puedes hacer para saber más sobre el trabajo de alguien?",
        preguntaChino: "你可以问什么问题来了解更多关于某人的工作？",
        sugerencia: "¿Dónde trabajas?, ¿Te gusta tu trabajo?, ¿Cuántas horas trabajas?",
        sugerenciaChino: "¿Dónde trabajas?, ¿Te gusta tu trabajo?, ¿Cuántas horas trabajas?",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '你是做什么工作的？' en español?",
        preguntaChino: "西班牙语中'你是做什么工作的？'怎么说？",
        respuestaSugerida: "¿A qué te dedicas?",
        respuestaSugeridaChino: "¿A qué te dedicas?",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '医生' en español?",
        preguntaChino: "西班牙语中'医生'怎么说？",
        respuestaSugerida: "médico / médica",
        respuestaSugeridaChino: "médico / médica",
      },
      {
        id: "p3",
        pregunta: "¿Qué significa 'Trabajo en un hospital'?",
        preguntaChino: "'Trabajo en un hospital'是什么意思？",
        respuestaSugerida: "我在医院工作",
        respuestaSugeridaChino: "I work in a hospital",
      },
      {
        id: "p4",
        pregunta: "¿Cuál es la forma femenina de 'ingeniero'?",
        preguntaChino: "'ingeniero'的阴性形式是什么？",
        respuestaSugerida: "ingeniera",
        respuestaSugeridaChino: "ingeniera",
      },
      {
        id: "p5",
        pregunta: "¿Qué profesión no cambia de género? Da un ejemplo.",
        preguntaChino: "哪种职业不变化性别？举一个例子。",
        respuestaSugerida: "policía, periodista, estudiante, taxista",
        respuestaSugeridaChino: "policía, periodista, estudiante, taxista",
      },
      {
        id: "p6",
        pregunta: "¿Cómo se dice '我退休了' en español?",
        preguntaChino: "西班牙语中'我退休了'怎么说？",
        respuestaSugerida: "Estoy jubilado.",
        respuestaSugeridaChino: "Estoy jubilado.",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Los días de la semana",
        tituloChino: "星期几",
        descripcion: `Los días de la semana en español:

• lunes (LU-nes)
• martes (MAR-tes)
• miércoles (MIER-co-les)
• jueves (JUE-ves)
• viernes (VIER-nes)
• sábado (SA-ba-do)
• domingo (do-MIN-go)

🔹 REGLAS IMPORTANTES:

1. Los días de la semana NO llevan mayúscula (excepto al principio de frase).
   ✅ Correcto: Voy al cine el lunes.
   ❌ Incorrecto: Voy al cine el Lunes.

2. Los días de la semana son TODOS masculinos.
   • el lunes, el martes, el miércoles...

3. El lunes es el PRIMER día de la semana en España y Latinoamérica.

4. El miércoles es el único día con acento en la 'e'.

🔹 PRONUNCIACIÓN:
• El acento siempre está en la penúltima sílaba, excepto miércoles y sábado.

📌 TRUCO PARA RECORDAR:
• Lunes = Luna (Moon day)
• Martes = Marte (Mars)
• Miércoles = Mercurio (Mercury)
• Jueves = Júpiter (Jupiter)
• Viernes = Venus
• Sábado = Sabbath (descanso)
• Domingo = Dominus (Lord's day)`,
        descripcionChino: `西班牙语中的星期几：

• lunes = 星期一
• martes = 星期二
• miércoles = 星期三
• jueves = 星期四
• viernes = 星期五
• sábado = 星期六
• domingo = 星期日

🔹 重要规则：

1. 星期几不大写（除非在句首）。
   ✅ 正确：Voy al cine el lunes.
   ❌ 错误：Voy al cine el Lunes.

2. 星期几都是阳性名词。
   • el lunes, el martes, el miércoles...

3. 在西班牙和拉丁美洲，星期一是每周的第一天。

4. 星期三是唯一一个字母'e'上有重音符号的。

🔹 发音提示：
• 重音通常在倒数第二个音节，除了 miércoles 和 sábado。

📌 记忆技巧：
• Lunes = 月亮日 (Luna)
• Martes = 火星 (Marte)
• Miércoles = 水星 (Mercurio)
• Jueves = 木星 (Júpiter)
• Viernes = 金星 (Venus)
• Sábado = 安息日 (descanso)
• Domingo = 主日 (Domingo)`,
        ejemplos: [
          {
            espanol: "Hoy es lunes.",
            chino: "今天是星期一。",
          },
          {
            espanol: "Mañana es martes.",
            chino: "明天是星期二。",
          },
          {
            espanol: "El domingo descanso.",
            chino: "星期日我休息。",
          },
          {
            espanol: "El miércoles es mi día favorito.",
            chino: "星期三是我最喜欢的一天。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Uso de artículos con días",
        tituloChino: "星期几与冠词的使用",
        descripcion: `En español usamos artículos con los días:

🔹 "EL" para un día específico (un día concreto):
• El lunes tengo una reunión. (This Monday I have a meeting)
• El martes voy al médico. (This Tuesday I go to the doctor)
• El viernes es mi cumpleaños. (This Friday is my birthday)

🔹 "LOS" para algo habitual (todos los días de la semana):
• Los lunes trabajo de 9 a 6. (Mondays I work from 9 to 6)
• Los martes voy al gimnasio. (Tuesdays I go to the gym)
• Los viernes salgo con amigos. (Fridays I go out with friends)

🔹 "CADA" para indicar frecuencia:
• Cada lunes estudio español. (Every Monday I study Spanish)
• Cada martes llamo a mi madre. (Every Tuesday I call my mother)

🔹 DIFERENCIA IMPORTANTE:
• "El lunes" = este lunes (específico)
• "Los lunes" = todos los lunes (hábito)

📌 EJEMPLOS COMPARATIVOS:
• El lunes pasado fui al cine. (Last Monday I went to the cinema)
• Los lunes siempre voy al cine. (Mondays I always go to the cinema)
• El próximo lunes tengo un examen. (Next Monday I have an exam)`,
        descripcionChino: `西班牙语中星期几与冠词的使用：

🔹 "EL" 用于特定的一天（具体的一天）：
• El lunes tengo una reunión. = 这个星期一我有一个会议
• El martes voy al médico. = 这个星期二我去看医生
• El viernes es mi cumpleaños. = 这个星期五是我的生日

🔹 "LOS" 用于习惯性的事情（每周的这一天）：
• Los lunes trabajo de 9 a 6. = 我星期一从9点工作到6点
• Los martes voy al gimnasio. = 我星期二去健身房
• Los viernes salgo con amigos. = 我星期五和朋友出去

🔹 "CADA" 用于表示频率：
• Cada lunes estudio español. = 我每个星期一学西班牙语
• Cada martes llamo a mi madre. = 我每个星期二给妈妈打电话

🔹 重要区别：
• "El lunes" = 这个星期一（具体的）
• "Los lunes" = 每个星期一（习惯）

📌 对比例子：
• El lunes pasado fui al cine. = 上周一我去了电影院
• Los lunes siempre voy al cine. = 我星期一总是去电影院
• El próximo lunes tengo un examen. = 下周一我有一个考试`,
        ejemplos: [
          {
            espanol: "Trabajo los lunes.",
            chino: "我星期一工作。（习惯）",
          },
          {
            espanol: "Nos vemos el viernes.",
            chino: "我们星期五见。（特定）",
          },
          {
            espanol: "Los sábados duermo hasta tarde.",
            chino: "我星期六睡到很晚。（习惯）",
          },
          {
            espanol: "Cada jueves tengo clase de español.",
            chino: "我每个星期四有西班牙语课。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Expresiones con días de la semana",
        tituloChino: "关于星期几的表达",
        descripcion: `🔹 EXPRESIONES COMUNES:

• el lunes pasado = last Monday
• el próximo lunes = next Monday
• el lunes que viene = next Monday
• este lunes = this Monday
• todos los lunes = every Monday
• cada lunes = each Monday

• de lunes a viernes = from Monday to Friday
• entre semana = on weekdays
• el fin de semana = the weekend

• el finde = the weekend (coloquial)
• a mitad de semana = midweek
• el fin de semana largo = long weekend

🔹 PREGUNTAR EL DÍA:
• ¿Qué día es hoy?
• ¿A qué día estamos?
• ¿Qué día es mañana?
• ¿Qué día fue ayer?

🔹 RESPONDER:
• Hoy es...
• Mañana es...
• Ayer fue...

📌 VOCABULARIO ADICIONAL:
• día laborable = working day / weekday
• día festivo = holiday / bank holiday
• día de fiesta = holiday
• fin de semana = weekend
• semana laboral = work week
• día entre semana = weekday`,
        descripcionChino: `🔹 常见表达：

• el lunes pasado = 上周一
• el próximo lunes = 下周一
• el lunes que viene = 下周一
• este lunes = 本周一
• todos los lunes = 每个星期一
• cada lunes = 每个星期一

• de lunes a viernes = 从周一到周五
• entre semana = 工作日
• el fin de semana = 周末

• el finde = 周末（口语）
• a mitad de semana = 周中
• el fin de semana largo = 长周末

🔹 询问星期几：
• ¿Qué día es hoy? = 今天是星期几？
• ¿A qué día estamos? = 今天是星期几？
• ¿Qué día es mañana? = 明天是星期几？
• ¿Qué día fue ayer? = 昨天是星期几？

🔹 回答：
• Hoy es... = 今天是...
• Mañana es... = 明天是...
• Ayer fue... = 昨天是...

📌 额外词汇：
• día laborable = 工作日
• día festivo = 假日/银行假日
• día de fiesta = 假日
• fin de semana = 周末
• semana laboral = 工作周
• día entre semana = 工作日`,
        ejemplos: [
          {
            espanol: "Trabajo de lunes a viernes.",
            chino: "我从周一到周五工作。",
          },
          {
            espanol: "El fin de semana descanso.",
            chino: "周末我休息。",
          },
          {
            espanol: "Nos vemos el próximo lunes.",
            chino: "我们下周一见。",
          },
          {
            espanol: "Este lunes no trabajo porque es festivo.",
            chino: "这个周一我不工作，因为是假日。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "La semana laboral y cultural",
        tituloChino: "工作周和文化",
        descripcion: `🔹 LA SEMANA LABORAL EN ESPAÑA:

• Días laborables (working days): lunes a viernes
• Fin de semana (weekend): sábado y domingo

🔹 HORARIOS TÍPICOS:
• Muchas tiendas cierran los domingos.
• Los bancos abren solo por la mañana (8:30-14:00).
• Los restaurantes pueden cerrar un día a la semana (normalmente domingo o lunes).

🔹 EXPRESIONES CULTURALES:
• "San Lunes" (expresión irónica cuando alguien no va a trabajar el lunes)
• "Viernes social" (los viernes se sale más)
• "Domingo de resaca" (domingo con resaca por la fiesta del sábado)

🔹 DÍAS ESPECIALES:
• lunes de Pascua = Easter Monday
• Viernes Santo = Good Friday
• Domingo de Ramos = Palm Sunday
• Domingo de Resurrección = Easter Sunday

📌 FRASES ÚTILES:
• ¿Trabajas los fines de semana?
• ¿Qué haces los lunes por la tarde?
• El miércoles es la mitad de la semana.
• ¡Por fin viernes! (Finally Friday!)
• ¡Ya es finde! (It's already weekend! - coloquial)`,
        descripcionChino: `🔹 西班牙的工作周：

• 工作日：星期一到星期五
• 周末：星期六和星期日

🔹 典型时间表：
• 许多商店星期日关门。
• 银行只在早上开门（8:30-14:00）。
• 餐厅可能每周休息一天（通常是星期日或星期一）。

🔹 文化表达：
• "San Lunes" = 当有人星期一不去工作时的讽刺表达
• "Viernes social" = 星期五更多的人出去社交
• "Domingo de resaca" = 因星期六派对而宿醉的星期日

🔹 特殊日子：
• lunes de Pascua = 复活节星期一
• Viernes Santo = 耶稣受难日
• Domingo de Ramos = 棕枝主日
• Domingo de Resurrección = 复活节星期日

📌 有用句子：
• ¿Trabajas los fines de semana? = 你周末工作吗？
• ¿Qué haces los lunes por la tarde? = 你星期一下午做什么？
• El miércoles es la mitad de la semana. = 星期三是一周的中间。
• ¡Por fin viernes! = 终于星期五了！
• ¡Ya es finde! = 已经是周末了！（口语）`,
        ejemplos: [
          {
            espanol: "En España, muchos comercios cierran los domingos.",
            chino: "在西班牙，许多商店星期日关门。",
          },
          {
            espanol: "¡Por fin viernes! Me voy de fiesta.",
            chino: "终于星期五了！我要去派对。",
          },
          {
            espanol: "El lunes es el día más difícil de la semana.",
            chino: "星期一是一周中最难的一天。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "lunes",
        chino: "星期一",
        ejemplo: "Los lunes trabajo.",
      },
      {
        id: "v2",
        espanol: "martes",
        chino: "星期二",
        ejemplo: "El martes tengo clase.",
      },
      {
        id: "v3",
        espanol: "miércoles",
        chino: "星期三",
        ejemplo: "Miércoles es mitad de semana.",
      },
      {
        id: "v4",
        espanol: "jueves",
        chino: "星期四",
        ejemplo: "Jueves, casi viernes.",
      },
      {
        id: "v5",
        espanol: "viernes",
        chino: "星期五",
        ejemplo: "¡Por fin viernes!",
      },
      {
        id: "v6",
        espanol: "sábado",
        chino: "星期六",
        ejemplo: "El sábado descanso.",
      },
      {
        id: "v7",
        espanol: "domingo",
        chino: "星期日",
        ejemplo: "El domingo voy al parque.",
      },
      {
        id: "v8",
        espanol: "hoy",
        chino: "今天",
        ejemplo: "Hoy es lunes.",
      },
      {
        id: "v9",
        espanol: "mañana",
        chino: "明天",
        ejemplo: "Mañana es martes.",
      },
      {
        id: "v10",
        espanol: "ayer",
        chino: "昨天",
        ejemplo: "Ayer fue domingo.",
      },
      {
        id: "v11",
        espanol: "pasado mañana",
        chino: "后天",
        ejemplo: "Pasado mañana es jueves.",
      },
      {
        id: "v12",
        espanol: "anteayer",
        chino: "前天",
        ejemplo: "Anteayer fue sábado.",
      },
      {
        id: "v13",
        espanol: "semana",
        chino: "星期/周",
        ejemplo: "La semana tiene siete días.",
      },
      {
        id: "v14",
        espanol: "fin de semana",
        chino: "周末",
        ejemplo: "El fin de semana descanso.",
      },
      {
        id: "v15",
        espanol: "finde",
        chino: "周末(口语)",
        ejemplo: "¡Ya es finde!",
      },
      {
        id: "v16",
        espanol: "día laborable",
        chino: "工作日",
        ejemplo: "Los días laborables trabajo.",
      },
      {
        id: "v17",
        espanol: "día festivo",
        chino: "假日",
        ejemplo: "El lunes es festivo.",
      },
      {
        id: "v18",
        espanol: "¿Qué día es hoy?",
        chino: "今天是星期几？",
        ejemplo: "¿Qué día es hoy?",
      },
      {
        id: "v19",
        espanol: "todos los días",
        chino: "每天",
        ejemplo: "Estudio todos los días.",
      },
      {
        id: "v20",
        espanol: "entre semana",
        chino: "工作日",
        ejemplo: "Trabajo entre semana.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Planeando una reunión",
        tituloChino: "计划聚会",
        personajes: ["Ana", "Carlos"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Hola Carlos, ¿qué día es hoy?",
            traduccion: "你好卡洛斯，今天是星期几？",
          },
          {
            personaje: "Carlos",
            texto: "Hoy es lunes. ¿Por qué?",
            traduccion: "今天是星期一。怎么了？",
          },
          {
            personaje: "Ana",
            texto: "¿Podemos quedar el miércoles?",
            traduccion: "我们星期三能见面吗？",
          },
          {
            personaje: "Carlos",
            texto: "El miércoles no puedo. ¿Y el viernes?",
            traduccion: "星期三不行。星期五呢？",
          },
          {
            personaje: "Ana",
            texto: "El viernes perfecto. ¿A qué hora?",
            traduccion: "星期五可以。几点？",
          },
          {
            personaje: "Carlos",
            texto: "A las siete. Nos vemos el viernes.",
            traduccion: "七点。我们星期五见。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Hablando de la rutina semanal",
        tituloChino: "谈论每周日常",
        personajes: ["María", "Pedro"],
        lineas: [
          {
            personaje: "María",
            texto: "Pedro, ¿trabajas los sábados?",
            traduccion: "佩德罗，你星期六工作吗？",
          },
          {
            personaje: "Pedro",
            texto: "No, trabajo de lunes a viernes.",
            traduccion: "不，我从星期一到星期五工作。",
          },
          {
            personaje: "María",
            texto: "¿Y los domingos?",
            traduccion: "星期日呢？",
          },
          {
            personaje: "Pedro",
            texto: "Los domingos descanso en casa.",
            traduccion: "星期日我在家休息。",
          },
          {
            personaje: "María",
            texto: "¿Qué haces los fines de semana?",
            traduccion: "你周末做什么？",
          },
          {
            personaje: "Pedro",
            texto: "Los sábados voy al cine y los domingos leo.",
            traduccion: "星期六我去看电影，星期日看书。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Preguntando el día en la calle",
        tituloChino: "在街上问今天星期几",
        personajes: ["Turista", "Local"],
        lineas: [
          {
            personaje: "Turista",
            texto: "Disculpe, ¿qué día es hoy?",
            traduccion: "打扰一下，今天是星期几？",
          },
          {
            personaje: "Local",
            texto: "Hoy es jueves.",
            traduccion: "今天是星期四。",
          },
          {
            personaje: "Turista",
            texto: "¿Y el museo abre los jueves?",
            traduccion: "博物馆星期四开门吗？",
          },
          {
            personaje: "Local",
            texto: "Sí, abre de martes a domingo. Los lunes cierra.",
            traduccion: "是的，从星期二到星期日开门。星期一关门。",
          },
          {
            personaje: "Turista",
            texto: "Perfecto, entonces voy hoy. ¡Gracias!",
            traduccion: "太好了，那我今天去。谢谢！",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Organizando el fin de semana",
        tituloChino: "组织周末",
        personajes: ["Laura", "David"],
        lineas: [
          {
            personaje: "Laura",
            texto: "David, ¿qué planes tienes para el fin de semana?",
            traduccion: "大卫，你周末有什么计划？",
          },
          {
            personaje: "David",
            texto: "El sábado quiero ir a la playa. ¿Te apuntas?",
            traduccion: "星期六我想去海滩。你来吗？",
          },
          {
            personaje: "Laura",
            texto: "El sábado no puedo, trabajo. ¿Y el domingo?",
            traduccion: "星期六不行，我工作。星期日呢？",
          },
          {
            personaje: "David",
            texto: "El domingo también puedo. ¿A qué hora?",
            traduccion: "星期日也可以。几点？",
          },
          {
            personaje: "Laura",
            texto: "A las diez de la mañana. ¡Nos vemos el domingo!",
            traduccion: "上午十点。星期日见！",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Hablando del día favorito",
        tituloChino: "谈论最喜欢的一天",
        personajes: ["Sofía", "Javier"],
        lineas: [
          {
            personaje: "Sofía",
            texto: "Javier, ¿cuál es tu día favorito de la semana?",
            traduccion: "哈维尔，你一周中最喜欢哪一天？",
          },
          {
            personaje: "Javier",
            texto: "El viernes, sin duda. Empieza el fin de semana.",
            traduccion: "无疑是星期五。周末开始了。",
          },
          {
            personaje: "Sofía",
            texto: "Yo prefiero el sábado. Puedo dormir hasta tarde.",
            traduccion: "我更喜欢星期六。我可以睡懒觉。",
          },
          {
            personaje: "Javier",
            texto: "¿Y el día que menos te gusta?",
            traduccion: "你最不喜欢哪一天？",
          },
          {
            personaje: "Sofía",
            texto: "El lunes, porque hay que volver a trabajar.",
            traduccion: "星期一，因为要回去工作。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "一周的第一天是：_____",
          preguntaChino: "一周的第一天是：_____",
          respuestaCorrecta: "lunes",
          explicacion: "在许多国家，星期一是每周的第一天。",
          pista: "首字母是 l，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c2",
          pregunta: "星期六的前一天是：_____",
          preguntaChino: "星期六的前一天是：_____",
          respuestaCorrecta: "viernes",
          explicacion: "星期五在星期六之前。",
          pista: "首字母是 v，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c3",
          pregunta: "一周的最后一天是：_____",
          preguntaChino: "一周的最后一天是：_____",
          respuestaCorrecta: "domingo",
          explicacion: "星期日是一周的最后一天。",
          pista: "首字母是 d，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c4",
          pregunta: "Hoy es miércoles. Mañana es _____",
          preguntaChino: "今天是星期三。明天是_____",
          respuestaCorrecta: "jueves",
          explicacion: "星期三之后是星期四。",
          pista: "首字母是 j，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c5",
          pregunta: "为了问'今天是星期几？'：¿Qué _____ es hoy?",
          preguntaChino: "为了问'今天是星期几？'：¿Qué _____ es hoy?",
          respuestaCorrecta: "día",
          explicacion: "'¿Qué día es hoy?' = 今天是星期几？",
          pista: "首字母是 d，3个字母",
          numeroLetras: 3,
        },
        {
          id: "c6",
          pregunta: "星期三是：_____",
          preguntaChino: "星期三是：_____",
          respuestaCorrecta: "miércoles",
          explicacion: "Miércoles = 星期三",
          pista: "首字母是 m，9个字母",
          numeroLetras: 9,
        },
        {
          id: "c7",
          pregunta: "周末是：sábado y _____",
          preguntaChino: "周末是：sábado y _____",
          respuestaCorrecta: "domingo",
          explicacion: "Sábado y domingo = 周末",
          pista: "首字母是 d，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c8",
          pregunta: "后天的西班牙语是：_____ mañana",
          preguntaChino: "后天的西班牙语是：_____ mañana",
          respuestaCorrecta: "pasado",
          explicacion: "Pasado mañana = 后天",
          pista: "首字母是 p，6个字母",
          numeroLetras: 6,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "一周中间是哪一天？",
          preguntaChino: "一周中间是哪一天？",
          opciones: ["martes", "miércoles", "jueves", "viernes"],
          respuestaCorrecta: "miércoles",
          explicacion: "星期三在一周的中间。",
        },
        {
          id: "s2",
          pregunta: "哪两天组成周末？",
          preguntaChino: "哪两天组成周末？",
          opciones: ["viernes y sábado", "sábado y domingo", "domingo y lunes", "jueves y viernes"],
          respuestaCorrecta: "sábado y domingo",
          explicacion: "周末是星期六和星期日。",
        },
        {
          id: "s3",
          pregunta: "哪一天有重音符号？",
          preguntaChino: "哪一天有重音符号？",
          opciones: ["lunes", "martes", "miércoles", "jueves"],
          respuestaCorrecta: "miércoles",
          explicacion: "'Miércoles'的'e'上有重音符号。",
        },
        {
          id: "s4",
          pregunta: "'Los viernes'是什么意思？",
          preguntaChino: "'Los viernes'是什么意思？",
          opciones: ["这个星期五", "每个星期五", "下个星期五", "上个星期五"],
          respuestaCorrecta: "每个星期五",
          explicacion: "'Los viernes' = 每个星期五（习惯）",
        },
        {
          id: "s5",
          pregunta: "星期四之后是哪一天？",
          preguntaChino: "星期四之后是哪一天？",
          opciones: ["miércoles", "viernes", "sábado", "domingo"],
          respuestaCorrecta: "viernes",
          explicacion: "星期四之后是星期五。",
        },
        {
          id: "s6",
          pregunta: "'El lunes que viene'是什么意思？",
          preguntaChino: "'El lunes que viene'是什么意思？",
          opciones: ["上周一", "本周一", "下周一", "每个周一"],
          respuestaCorrecta: "下周一",
          explicacion: "El lunes que viene = 下周一",
        },
        {
          id: "s7",
          pregunta: "¿Qué significa 'fin de semana'?",
          preguntaChino: "'fin de semana'是什么意思？",
          opciones: ["周末", "工作日", "一周结束", "假期"],
          respuestaCorrecta: "周末",
          explicacion: "Fin de semana = 周末",
        },
        {
          id: "s8",
          pregunta: "¿Cómo se dice '工作日' en español?",
          preguntaChino: "西班牙语中'工作日'怎么说？",
          opciones: ["fin de semana", "día festivo", "día laborable", "día libre"],
          respuestaCorrecta: "día laborable",
          explicacion: "Día laborable = 工作日",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "西班牙语中，星期几要大写。",
          preguntaChino: "西班牙语中，星期几要大写。",
          respuestaCorrecta: false,
          explicacion: "错。星期几不大写，除非在句首。",
        },
        {
          id: "vf2",
          pregunta: "'Los lunes'表示习惯（每个星期一）。",
          preguntaChino: "'Los lunes'表示一个习惯（每个星期一）。",
          respuestaCorrecta: true,
          explicacion: "对。'Los lunes'意思是每个星期一。",
        },
        {
          id: "vf3",
          pregunta: "一周有六天。",
          preguntaChino: "一周有六天。",
          respuestaCorrecta: false,
          explicacion: "错。一周有七天。",
        },
        {
          id: "vf4",
          pregunta: "星期六和星期日是周末。",
          preguntaChino: "星期六和星期日是周末。",
          respuestaCorrecta: true,
          explicacion: "对。周末 = sábado + domingo",
        },
        {
          id: "vf5",
          pregunta: "'El lunes'用于谈论特定的一个星期一。",
          preguntaChino: "'El lunes'用于谈论特定的一个星期一。",
          respuestaCorrecta: true,
          explicacion: "对。'El lunes' = 这个星期一（特定）",
        },
        {
          id: "vf6",
          pregunta: "Los días de la semana son femeninos.",
          preguntaChino: "星期几是阴性的。",
          respuestaCorrecta: false,
          explicacion: "错。Los días de la semana son masculinos (el lunes, el martes...)",
        },
        {
          id: "vf7",
          pregunta: "'Finde' es una forma coloquial de 'fin de semana'.",
          preguntaChino: "'Finde'是'fin de semana'的口语形式。",
          respuestaCorrecta: true,
          explicacion: "对。Finde = fin de semana",
        },
        {
          id: "vf8",
          pregunta: "En España, la semana comienza el domingo.",
          preguntaChino: "在西班牙，一周从星期日开始。",
          respuestaCorrecta: false,
          explicacion: "错。En España comienza el lunes.",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "lunes",
              derecha: "星期一",
            },
            {
              izquierda: "martes",
              derecha: "星期二",
            },
            {
              izquierda: "miércoles",
              derecha: "星期三",
            },
            {
              izquierda: "jueves",
              derecha: "星期四",
            },
            {
              izquierda: "viernes",
              derecha: "星期五",
            },
            {
              izquierda: "sábado",
              derecha: "星期六",
            },
            {
              izquierda: "domingo",
              derecha: "星期日",
            },
            {
              izquierda: "fin de semana",
              derecha: "周末",
            },
            {
              izquierda: "día laborable",
              derecha: "工作日",
            },
            {
              izquierda: "hoy",
              derecha: "今天",
            },
            {
              izquierda: "mañana",
              derecha: "明天",
            },
            {
              izquierda: "ayer",
              derecha: "昨天",
            },
          ],
          explicacion: "将星期几与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["es", "lunes", "Hoy", "."],
          respuestaCorrecta: "Hoy es lunes.",
          explicacion: "正确的顺序是：Hoy es lunes.（今天是星期一。）",
        },
        {
          id: "o2",
          palabras: ["mañana", "martes", "es", "."],
          respuestaCorrecta: "Mañana es martes.",
          explicacion: "正确的顺序是：Mañana es martes.（明天是星期二。）",
        },
        {
          id: "o3",
          palabras: ["los", "Trabajo", "viernes", "."],
          respuestaCorrecta: "Trabajo los viernes.",
          explicacion: "正确的顺序是：Trabajo los viernes.（我每个星期五工作。）",
        },
        {
          id: "o4",
          palabras: ["viene", "semana", "viajo", "que", "La", "."],
          respuestaCorrecta: "La semana que viene viajo.",
          explicacion: "正确的顺序是：La semana que viene viajo.（下周我去旅行。）",
        },
        {
          id: "o5",
          palabras: ["día", "hoy", "qué", "¿", "es", "?"],
          respuestaCorrecta: "¿Qué día es hoy?",
          explicacion: "正确的顺序是：¿Qué día es hoy?（今天是星期几？）",
        },
        {
          id: "o6",
          palabras: ["pasado", "jueves", "fue", "Ayer", "."],
          respuestaCorrecta: "Ayer fue jueves.",
          explicacion: "正确的顺序是：Ayer fue jueves.（昨天是星期四。）",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "今天是星期一。",
          respuestaEsperada: "Hoy es lunes.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "我每个星期六去健身房。",
          respuestaEsperada: "Voy al gimnasio los sábados.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "我们下个星期五见面。",
          respuestaEsperada: "Nos vemos el próximo viernes.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "我从星期一到星期五工作。",
          respuestaEsperada: "Trabajo de lunes a viernes.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "后天是星期六。",
          respuestaEsperada: "Pasado mañana es sábado.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "每个星期三我有西班牙语课。",
          respuestaEsperada: "Cada miércoles tengo clase de español.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "周末你做什么？",
          respuestaEsperada: "¿Qué haces el fin de semana?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "终于星期五了！",
          respuestaEsperada: "¡Por fin viernes!",
          explicacion: "西班牙语翻译",
        },
      ],
    },
    ejerciciosPracticos: [
      {
        id: "ep1",
        tipo: "completarDialogo",
        titulo: "完成对话",
        tituloChino: "完成对话",
        instruccion: "用正确的星期几完成对话。",
        instruccionChino: "用正确的星期几完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿Qué día es _____?",
            respuesta: "hoy",
          },
          {
            personaje: "B",
            texto: "Hoy es _____.",
            respuesta: "lunes / martes",
          },
          {
            personaje: "A",
            texto: "¿Y mañana?",
            respuesta: "",
          },
          {
            personaje: "B",
            texto: "Mañana es _____.",
            respuesta: "martes / miércoles",
          },
          {
            personaje: "A",
            texto: "¿Quedamos el _____?",
            respuesta: "viernes / sábado",
          },
          {
            personaje: "B",
            texto: "Perfecto. Nos vemos el _____.",
            respuesta: "viernes / sábado",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "calendario",
        titulo: "Completa el calendario",
        tituloChino: "完成日历",
        instruccion: "Si hoy es miércoles, responde las preguntas.",
        instruccionChino: "如果今天是星期三，回答问题。",
        preguntas: [
          {
            pregunta: "Hoy es miércoles. Mañana es...",
            respuesta: "jueves",
          },
          {
            pregunta: "Pasado mañana es...",
            respuesta: "viernes",
          },
          {
            pregunta: "Ayer fue...",
            respuesta: "martes",
          },
          {
            pregunta: "Anteayer fue...",
            respuesta: "lunes",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "planificar",
        titulo: "Planifica tu semana",
        tituloChino: "计划你的一周",
        instruccion: "Escribe qué haces cada día de la semana en español.",
        instruccionChino: "用西班牙语写出你每周每天做什么。",
        ejemplo: "Los lunes trabajo. Los martes voy al gimnasio. Los miércoles estudio español...",
      },
      {
        id: "ep4",
        tipo: "completarTabla",
        titulo: "Completa la tabla",
        tituloChino: "完成表格",
        instruccion: "Escribe el día que corresponde.",
        instruccionChino: "写出对应的星期几。",
        tabla: [
          {
            espanol: "el día después de martes",
            respuesta: "miércoles",
          },
          {
            espanol: "el día antes de viernes",
            respuesta: "jueves",
          },
          {
            espanol: "el primer día de la semana",
            respuesta: "lunes",
          },
          {
            espanol: "el último día de la semana",
            respuesta: "domingo",
          },
        ],
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Qué día es hoy? Responde en español.",
        preguntaChino: "今天是星期几？用西班牙语回答。",
        sugerencia: "你可以说：Hoy es (lunes/martes/...).",
        sugerenciaChino: "你可以说：Hoy es (lunes/martes/...).",
      },
      {
        id: "pa2",
        pregunta: "¿Qué días trabajas o estudias?",
        preguntaChino: "你哪几天工作或学习？",
        sugerencia: "Trabajo/Estudio de lunes a viernes.",
        sugerenciaChino: "Trabajo/Estudio de lunes a viernes.",
      },
      {
        id: "pa3",
        pregunta: "¿Qué haces los fines de semana?",
        preguntaChino: "你周末做什么？",
        sugerencia: "Los fines de semana descanso / salgo con amigos.",
        sugerenciaChino: "Los fines de semana descanso / salgo con amigos.",
      },
      {
        id: "pa4",
        pregunta: "Escribe los días de la semana en orden.",
        preguntaChino: "按顺序写出星期几。",
        sugerencia: "lunes, martes, miércoles, jueves, viernes, sábado, domingo",
        sugerenciaChino: "lunes, martes, miércoles, jueves, viernes, sábado, domingo",
      },
      {
        id: "pa5",
        pregunta: "¿Cuál es tu día favorito? ¿Por qué?",
        preguntaChino: "你最喜欢哪一天？为什么？",
        sugerencia: "Mi día favorito es el viernes porque empieza el fin de semana.",
        sugerenciaChino: "我最喜欢的一天是星期五，因为周末开始了。",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '星期一' en español?",
        preguntaChino: "西班牙语中'星期一'怎么说？",
        respuestaSugerida: "lunes",
        respuestaSugeridaChino: "lunes",
      },
      {
        id: "p2",
        pregunta: "¿Qué significa 'Los viernes'?",
        preguntaChino: "'Los viernes'是什么意思？",
        respuestaSugerida: "每个星期五",
        respuestaSugeridaChino: "Cada viernes / Todos los viernes",
      },
      {
        id: "p3",
        pregunta: "¿Cómo se dice '周末' en español?",
        preguntaChino: "西班牙语中'周末'怎么说？",
        respuestaSugerida: "fin de semana",
        respuestaSugeridaChino: "fin de semana",
      },
      {
        id: "p4",
        pregunta: "¿Qué día es después del jueves?",
        preguntaChino: "星期四之后是星期几？",
        respuestaSugerida: "viernes",
        respuestaSugeridaChino: "viernes",
      },
      {
        id: "p5",
        pregunta: "¿Cuál es la diferencia entre 'el lunes' y 'los lunes'?",
        preguntaChino: "'el lunes'和'los lunes'有什么区别？",
        respuestaSugerida: "El lunes es un día específico. Los lunes es un hábito.",
        respuestaSugeridaChino: "El lunes是特定的一天。Los lunes是习惯。",
      },
      {
        id: "p6",
        pregunta: "¿Cómo se dice '后天' en español?",
        preguntaChino: "西班牙语中'后天'怎么说？",
        respuestaSugerida: "pasado mañana",
        respuestaSugeridaChino: "pasado mañana",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Los meses del año",
        tituloChino: "一年中的月份",
        descripcion: `Los 12 meses del año en español:

1. enero (e-NE-ro)
2. febrero (fe-BRE-ro)
3. marzo (MAR-zo)
4. abril (a-BRIL)
5. mayo (MA-yo)
6. junio (JU-nio)
7. julio (JU-lio)
8. agosto (a-GOS-to)
9. septiembre (sep-TIEM-bre)
10. octubre (oc-TU-bre)
11. noviembre (no-VIEM-bre)
12. diciembre (di-CIEM-bre)

🔹 REGLAS IMPORTANTES:

1. Los meses tampoco llevan mayúscula (excepto al principio de frase).
   ✅ Correcto: Nací en enero.
   ❌ Incorrecto: Nací en Enero.

2. Todos los meses son masculinos.
   • el enero (pero normalmente no se usa el artículo)
   • Se dice: en enero, no "en el enero"

3. El artículo se usa cuando se especifica un mes concreto con adjetivos:
   • el próximo enero = next January
   • el enero pasado = last January

📌 TRUCO PARA RECORDAR:
• Enero = Enero (igual que en inglés)
• Febrero = Febrero (igual que en inglés)
• Marzo = March (M como Marzo)
• Abril = April (A como Abril)
• Mayo = May (M como Mayo)
• Junio = June (J)
• Julio = July (J)
• Agosto = August (A)
• Septiembre = September (S)
• Octubre = October (O)
• Noviembre = November (N)
• Diciembre = December (D)`,
        descripcionChino: `西班牙语中的12个月：

1. enero = 一月
2. febrero = 二月
3. marzo = 三月
4. abril = 四月
5. mayo = 五月
6. junio = 六月
7. julio = 七月
8. agosto = 八月
9. septiembre = 九月
10. octubre = 十月
11. noviembre = 十一月
12. diciembre = 十二月

🔹 重要规则：

1. 月份也不大写（除非在句首）。
   ✅ 正确：Nací en enero.
   ❌ 错误：Nací en Enero.

2. 所有月份都是阳性名词。
   • el enero（但通常不使用冠词）
   • 说：en enero，而不是 "en el enero"

3. 当用形容词指定某个具体的月份时，使用冠词：
   • el próximo enero = 明年一月
   • el enero pasado = 去年一月

📌 记忆技巧：
• Enero = 一月（同英语January）
• Febrero = 二月（同英语February）
• Marzo = 三月（M像March）
• Abril = 四月（A像April）
• Mayo = 五月（M像May）
• Junio = 六月（J像June）
• Julio = 七月（J像July）
• Agosto = 八月（A像August）
• Septiembre = 九月（S像September）
• Octubre = 十月（O像October）
• Noviembre = 十一月（N像November）
• Diciembre = 十二月（D像December）`,
        ejemplos: [
          {
            espanol: "Mi cumpleaños es en enero.",
            chino: "我的生日在一月。",
          },
          {
            espanol: "En agosto hace mucho calor.",
            chino: "八月很热。",
          },
          {
            espanol: "Diciembre es Navidad.",
            chino: "十二月是圣诞节。",
          },
          {
            espanol: "Febrero tiene 28 o 29 días.",
            chino: "二月有28或29天。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Las estaciones del año",
        tituloChino: "四季",
        descripcion: `Las cuatro estaciones en español:

🔹 PRIMAVERA (spring) - marzo, abril, mayo
• La primavera es la estación de las flores.
• En primavera el tiempo es agradable.

🔹 VERANO (summer) - junio, julio, agosto
• El verano es la estación más calurosa.
• En verano vamos a la playa.

🔹 OTOÑO (autumn/fall) - septiembre, octubre, noviembre
• En otoño caen las hojas de los árboles.
• El otoño es una estación colorida.

🔹 INVIERNO (winter) - diciembre, enero, febrero
• En invierno hace frío y nieva.
• El invierno es la estación más fría.

📌 PREGUNTAR POR LAS ESTACIONES:
• ¿Cuál es tu estación favorita?
• ¿En qué estación estamos?
• ¿Qué estación te gusta más?

📌 EXPRESIONES CON ESTACIONES:
• día de primavera = spring day
• vacaciones de verano = summer holidays
• ropa de invierno = winter clothes
• colores de otoño = autumn colors`,
        descripcionChino: `西班牙语中的四季：

🔹 PRIMAVERA（春天）- 三月、四月、五月
• 春天是花的季节。
• 春天天气宜人。

🔹 VERANO（夏天）- 六月、七月、八月
• 夏天是最热的季节。
• 夏天我们去海滩。

🔹 OTOÑO（秋天）- 九月、十月、十一月
• 秋天树叶落下。
• 秋天是一个多彩的季节。

🔹 INVIERNO（冬天）- 十二月、一月、二月
• 冬天很冷，下雪。
• 冬天是最冷的季节。

📌 询问季节：
• ¿Cuál es tu estación favorita? = 你最喜欢的季节是什么？
• ¿En qué estación estamos? = 现在是什么季节？
• ¿Qué estación te gusta más? = 你最喜欢哪个季节？

📌 关于季节的表达：
• día de primavera = 春日
• vacaciones de verano = 暑假
• ropa de invierno = 冬装
• colores de otoño = 秋色`,
        ejemplos: [
          {
            espanol: "En primavera florecen las flores.",
            chino: "春天花开。",
          },
          {
            espanol: "Me gusta el verano.",
            chino: "我喜欢夏天。",
          },
          {
            espanol: "En invierno nieva.",
            chino: "冬天下雪。",
          },
          {
            espanol: "El otoño es mi estación favorita.",
            chino: "秋天是我最喜欢的季节。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Escribir fechas",
        tituloChino: "写日期",
        descripcion: `🔹 CÓMO ESCRIBIR FECHAS EN ESPAÑOL:

Estructura: día + de + mes + de + año

• 15 de marzo de 2024
• 1 de enero
• 25 de diciembre

🔹 CÓMO PREGUNTAR LA FECHA:
• ¿Qué fecha es hoy?
• ¿Cuál es la fecha de hoy?
• ¿A cuántos estamos?

🔹 CÓMO RESPONDER:
• Hoy es 5 de mayo.
• Estamos a 5 de mayo.
• Hoy es martes, 5 de mayo de 2024.

🔹 DÍAS ESPECIALES (fechas importantes):
• 1 de enero = Año Nuevo (New Year's Day)
• 6 de enero = Día de Reyes (Three Kings' Day)
• 14 de febrero = San Valentín (Valentine's Day)
• 1 de abril = Día de los Inocentes (April Fools)
• 1 de mayo = Día del Trabajo (Labor Day)
• 12 de octubre = Día de la Hispanidad (Hispanic Day)
• 1 de noviembre = Día de Todos los Santos (All Saints' Day)
• 6 de diciembre = Día de la Constitución (Constitution Day)
• 8 de diciembre = Inmaculada Concepción (Immaculate Conception)
• 24 de diciembre = Nochebuena (Christmas Eve)
• 25 de diciembre = Navidad (Christmas)
• 31 de diciembre = Nochevieja (New Year's Eve)

📌 NOTA: En español, primero se escribe el día y luego el mes, al revés que en inglés.`,
        descripcionChino: `🔹 西班牙语中写日期的方式：

结构：日 + de + 月 + de + 年

• 15 de marzo de 2024 = 2024年3月15日
• 1 de enero = 1月1日
• 25 de diciembre = 12月25日

🔹 如何询问日期：
• ¿Qué fecha es hoy? = 今天是几号？
• ¿Cuál es la fecha de hoy? = 今天是几号？
• ¿A cuántos estamos? = 今天几号？

🔹 如何回答：
• Hoy es 5 de mayo. = 今天是5月5日。
• Estamos a 5 de mayo. = 今天是5月5日。
• Hoy es martes, 5 de mayo de 2024. = 今天是2024年5月5日，星期二。

🔹 特殊日子（重要日期）：
• 1月1日 = 新年
• 1月6日 = 三王节
• 2月14日 = 情人节
• 4月1日 = 愚人节
• 5月1日 = 劳动节
• 10月12日 = 西班牙国庆日
• 11月1日 = 万圣节
• 12月6日 = 宪法日
• 12月8日 = 圣母无染原罪瞻礼
• 12月24日 = 平安夜
• 12月25日 = 圣诞节
• 12月31日 = 新年前夜

📌 注意：在西班牙语中，先写日再写月，与英语相反。`,
        ejemplos: [
          {
            espanol: "Hoy es 5 de mayo.",
            chino: "今天是5月5日。",
          },
          {
            espanol: "Mi cumpleaños es el 10 de septiembre.",
            chino: "我的生日是9月10日。",
          },
          {
            espanol: "Navidad es el 25 de diciembre.",
            chino: "圣诞节是12月25日。",
          },
          {
            espanol: "¿Qué fecha es hoy? —Hoy es 15 de agosto.",
            chino: "今天是几号？—今天是8月15日。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Expresiones con meses y estaciones",
        tituloChino: "关于月份和季节的表达",
        descripcion: `🔹 PREGUNTAR POR EL MES:
• ¿En qué mes estamos?
• ¿Qué mes es?
• ¿Cuándo es tu cumpleaños?

🔹 RESPONDER:
• Estamos en enero.
• Mi cumpleaños es en marzo.

🔹 EXPRESIONES COMUNES:
• a principios de mes = at the beginning of the month
• a finales de mes = at the end of the month
• a mediados de mes = in the middle of the month
• el mes pasado = last month
• el mes que viene = next month
• el próximo mes = next month
• dentro de un mes = in a month
• hace un mes = a month ago

🔹 CON ESTACIONES:
• en primavera / verano / otoño / invierno
• al principio de la primavera = at the beginning of spring
• a finales del verano = at the end of summer
• durante el otoño = during autumn
• todo el invierno = all winter long

📌 FRASES ÚTILES:
• ¿Cuántos días tiene este mes?
• Este mes tiene 31 días.
• Febrero tiene 28 o 29 días.
• El año tiene doce meses.`,
        descripcionChino: `🔹 询问月份：
• ¿En qué mes estamos? = 现在是几月？
• ¿Qué mes es? = 几月了？
• ¿Cuándo es tu cumpleaños? = 你的生日是什么时候？

🔹 回答：
• Estamos en enero. = 现在是一月。
• Mi cumpleaños es en marzo. = 我的生日在三月。

🔹 常见表达：
• a principios de mes = 月初
• a finales de mes = 月末
• a mediados de mes = 月中
• el mes pasado = 上个月
• el mes que viene = 下个月
• el próximo mes = 下个月
• dentro de un mes = 一个月后
• hace un mes = 一个月前

🔹 关于季节：
• en primavera / verano / otoño / invierno = 在春天/夏天/秋天/冬天
• al principio de la primavera = 初春
• a finales del verano = 夏末
• durante el otoño = 整个秋天
• todo el invierno = 整个冬天

📌 有用句子：
• ¿Cuántos días tiene este mes? = 这个月有多少天？
• Este mes tiene 31 días. = 这个月有31天。
• Febrero tiene 28 o 29 días. = 二月有28或29天。
• El año tiene doce meses. = 一年有十二个月。`,
        ejemplos: [
          {
            espanol: "El mes pasado viajé a Madrid.",
            chino: "上个月我去了马德里旅行。",
          },
          {
            espanol: "El mes que viene empiezo un nuevo trabajo.",
            chino: "下个月我开始新工作。",
          },
          {
            espanol: "Dentro de un mes es mi cumpleaños.",
            chino: "一个月后是我的生日。",
          },
          {
            espanol: "A finales de agosto me voy de vacaciones.",
            chino: "八月底我去度假。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "enero",
        chino: "一月",
        ejemplo: "Enero es el primer mes.",
      },
      {
        id: "v2",
        espanol: "febrero",
        chino: "二月",
        ejemplo: "Febrero tiene 28 días.",
      },
      {
        id: "v3",
        espanol: "marzo",
        chino: "三月",
        ejemplo: "Marzo es primavera.",
      },
      {
        id: "v4",
        espanol: "abril",
        chino: "四月",
        ejemplo: "Abril tiene 30 días.",
      },
      {
        id: "v5",
        espanol: "mayo",
        chino: "五月",
        ejemplo: "Mayo es un mes bonito.",
      },
      {
        id: "v6",
        espanol: "junio",
        chino: "六月",
        ejemplo: "Junio empieza el verano.",
      },
      {
        id: "v7",
        espanol: "julio",
        chino: "七月",
        ejemplo: "Julio es muy caluroso.",
      },
      {
        id: "v8",
        espanol: "agosto",
        chino: "八月",
        ejemplo: "En agosto voy de vacaciones.",
      },
      {
        id: "v9",
        espanol: "septiembre",
        chino: "九月",
        ejemplo: "Septiembre es otoño.",
      },
      {
        id: "v10",
        espanol: "octubre",
        chino: "十月",
        ejemplo: "Octubre es Halloween.",
      },
      {
        id: "v11",
        espanol: "noviembre",
        chino: "十一月",
        ejemplo: "Noviembre es frío.",
      },
      {
        id: "v12",
        espanol: "diciembre",
        chino: "十二月",
        ejemplo: "Diciembre es Navidad.",
      },
      {
        id: "v13",
        espanol: "primavera",
        chino: "春天",
        ejemplo: "La primavera es hermosa.",
      },
      {
        id: "v14",
        espanol: "verano",
        chino: "夏天",
        ejemplo: "El verano es caluroso.",
      },
      {
        id: "v15",
        espanol: "otoño",
        chino: "秋天",
        ejemplo: "El otoño tiene hojas amarillas.",
      },
      {
        id: "v16",
        espanol: "invierno",
        chino: "冬天",
        ejemplo: "El invierno es frío.",
      },
      {
        id: "v17",
        espanol: "¿En qué mes estamos?",
        chino: "现在是几月？",
        ejemplo: "¿En qué mes estamos?",
      },
      {
        id: "v18",
        espanol: "fecha",
        chino: "日期",
        ejemplo: "¿Cuál es la fecha de hoy?",
      },
      {
        id: "v19",
        espanol: "el mes pasado",
        chino: "上个月",
        ejemplo: "El mes pasado estuve en París.",
      },
      {
        id: "v20",
        espanol: "el mes que viene",
        chino: "下个月",
        ejemplo: "El mes que viene viajaré.",
      },
      {
        id: "v21",
        espanol: "a principios de",
        chino: "在...初",
        ejemplo: "A principios de año.",
      },
      {
        id: "v22",
        espanol: "a finales de",
        chino: "在...末",
        ejemplo: "A finales de mes.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Hablando de cumpleaños",
        tituloChino: "谈论生日",
        personajes: ["Ana", "Luis"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Luis, ¿cuándo es tu cumpleaños?",
            traduccion: "路易斯，你的生日是什么时候？",
          },
          {
            personaje: "Luis",
            texto: "Mi cumpleaños es el 15 de julio. ¿Y el tuyo?",
            traduccion: "我的生日是7月15日。你呢？",
          },
          {
            personaje: "Ana",
            texto: "El mío es en diciembre, el 24 de diciembre.",
            traduccion: "我的是在十二月，12月24日。",
          },
          {
            personaje: "Luis",
            texto: "¡Qué bien! Cerca de Navidad.",
            traduccion: "真好！靠近圣诞节。",
          },
          {
            personaje: "Ana",
            texto: "Sí, siempre celebro las dos cosas juntas.",
            traduccion: "是的，我总是两个一起庆祝。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Hablando de las estaciones",
        tituloChino: "谈论季节",
        personajes: ["María", "Pedro"],
        lineas: [
          {
            personaje: "María",
            texto: "Pedro, ¿cuál es tu estación favorita?",
            traduccion: "佩德罗，你最喜欢的季节是什么？",
          },
          {
            personaje: "Pedro",
            texto: "Me gusta el verano porque hace calor.",
            traduccion: "我喜欢夏天，因为天气热。",
          },
          {
            personaje: "María",
            texto: "¿En qué meses es el verano?",
            traduccion: "夏天是哪几个月？",
          },
          {
            personaje: "Pedro",
            texto: "El verano es en junio, julio y agosto.",
            traduccion: "夏天在六月、七月和八月。",
          },
          {
            personaje: "María",
            texto: "A mí me gusta más la primavera.",
            traduccion: "我更喜欢春天。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Preguntando la fecha",
        tituloChino: "询问日期",
        personajes: ["Cliente", "Recepcionista"],
        lineas: [
          {
            personaje: "Cliente",
            texto: "Disculpe, ¿cuál es la fecha de hoy?",
            traduccion: "打扰一下，今天是几号？",
          },
          {
            personaje: "Recepcionista",
            texto: "Hoy es 5 de marzo de 2024.",
            traduccion: "今天是2024年3月5日。",
          },
          {
            personaje: "Cliente",
            texto: "Gracias. Necesito hacer una reserva para el 10 de marzo.",
            traduccion: "谢谢。我需要预订3月10日。",
          },
          {
            personaje: "Recepcionista",
            texto: "El 10 de marzo es domingo. ¿Le viene bien?",
            traduccion: "3月10日是星期日。您可以吗？",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Planes para el verano",
        tituloChino: "夏天的计划",
        personajes: ["Laura", "David"],
        lineas: [
          {
            personaje: "Laura",
            texto: "David, ¿qué vas a hacer en verano?",
            traduccion: "大卫，你夏天要做什么？",
          },
          {
            personaje: "David",
            texto: "En julio voy a ir a la playa con mi familia.",
            traduccion: "七月我要和家人去海滩。",
          },
          {
            personaje: "Laura",
            texto: "¿Y en agosto?",
            traduccion: "八月呢？",
          },
          {
            personaje: "David",
            texto: "En agosto me quedaré en casa. ¿Y tú?",
            traduccion: "八月我会待在家里。你呢？",
          },
          {
            personaje: "Laura",
            texto: "Yo voy a viajar a Italia en septiembre.",
            traduccion: "我九月要去意大利旅行。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Fechas importantes",
        tituloChino: "重要日期",
        personajes: ["Sofía", "Javier"],
        lineas: [
          {
            personaje: "Sofía",
            texto: "Javier, ¿sabes qué fecha es el 6 de enero en España?",
            traduccion: "哈维尔，你知道1月6日在西班牙是什么日子吗？",
          },
          {
            personaje: "Javier",
            texto: "Es el Día de Reyes. Los niños reciben regalos.",
            traduccion: "是三王节。孩子们收到礼物。",
          },
          {
            personaje: "Sofía",
            texto: "Y el 12 de octubre es el Día de la Hispanidad.",
            traduccion: "10月12日是西班牙国庆日。",
          },
          {
            personaje: "Javier",
            texto: "Correcto. Y el 1 de mayo es el Día del Trabajo.",
            traduccion: "正确。5月1日是劳动节。",
          },
          {
            personaje: "Sofía",
            texto: "¡Qué interesante!",
            traduccion: "真有趣！",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "一年的第一个月是：_____",
          preguntaChino: "一年的第一个月是：_____",
          respuestaCorrecta: "enero",
          explicacion: "一月是一年中的第一个月。",
          pista: "首字母是 e，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c2",
          pregunta: "十二月是：_____",
          preguntaChino: "十二月是：_____",
          respuestaCorrecta: "diciembre",
          explicacion: "十二月是一年中的最后一个月。",
          pista: "首字母是 d，9个字母",
          numeroLetras: 9,
        },
        {
          id: "c3",
          pregunta: "春天有30天的月份是：_____",
          preguntaChino: "春天里有30天的月份是：_____",
          respuestaCorrecta: "abril",
          explicacion: "四月有30天，是春天。",
          pista: "首字母是 a，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c4",
          pregunta: "为了问'现在是几月？'：¿En qué _____ estamos?",
          preguntaChino: "为了问'现在是几月？'：¿En qué _____ estamos?",
          respuestaCorrecta: "mes",
          explicacion: "'¿En qué mes estamos?' = 现在是几月？",
          pista: "首字母是 m，3个字母",
          numeroLetras: 3,
        },
        {
          id: "c5",
          pregunta: "天数最少的月份是：_____",
          preguntaChino: "天数最少的月份是：_____",
          respuestaCorrecta: "febrero",
          explicacion: "二月有28或29天。",
          pista: "首字母是 f，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c6",
          pregunta: "夏天是：junio, julio y _____",
          preguntaChino: "夏天是：junio, julio y _____",
          respuestaCorrecta: "agosto",
          explicacion: "Agosto = 八月",
          pista: "首字母是 a，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c7",
          pregunta: "上个月是：el _____ pasado",
          preguntaChino: "上个月是：el _____ pasado",
          respuestaCorrecta: "mes",
          explicacion: "El mes pasado = 上个月",
          pista: "首字母是 m，3个字母",
          numeroLetras: 3,
        },
        {
          id: "c8",
          pregunta: "下个月是：el _____ que viene",
          preguntaChino: "下个月是：el _____ que viene",
          respuestaCorrecta: "mes",
          explicacion: "El mes que viene = 下个月",
          pista: "首字母是 m，3个字母",
          numeroLetras: 3,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "哪个月份通常只有28天？",
          preguntaChino: "哪个月份通常只有28天？",
          opciones: ["enero", "febrero", "marzo", "abril"],
          respuestaCorrecta: "febrero",
          explicacion: "二月有28天（闰年29天）。",
        },
        {
          id: "s2",
          pregunta: "哪几个月是春天？",
          preguntaChino: "哪几个月是春天？",
          opciones: [
            "junio, julio, agosto",
            "marzo, abril, mayo",
            "septiembre, octubre, noviembre",
            "diciembre, enero, febrero",
          ],
          respuestaCorrecta: "marzo, abril, mayo",
          explicacion: "春天是三月、四月、五月。",
        },
        {
          id: "s3",
          pregunta: "圣诞节在几月？",
          preguntaChino: "圣诞节在几月？",
          opciones: ["noviembre", "diciembre", "enero", "octubre"],
          respuestaCorrecta: "diciembre",
          explicacion: "圣诞节是12月25日。",
        },
        {
          id: "s4",
          pregunta: "哪个月份有31天？",
          preguntaChino: "哪个月份有31天？",
          opciones: ["abril", "junio", "septiembre", "enero"],
          respuestaCorrecta: "enero",
          explicacion: "一月有31天。",
        },
        {
          id: "s5",
          pregunta: "冬天之后是哪个季节？",
          preguntaChino: "冬天之后是哪个季节？",
          opciones: ["primavera", "verano", "otoño", "invierno"],
          respuestaCorrecta: "primavera",
          explicacion: "冬天之后是春天。",
        },
        {
          id: "s6",
          pregunta: "'El mes que viene' significa...",
          preguntaChino: "'El mes que viene'意思是...",
          opciones: ["上个月", "这个月", "下个月", "下一年"],
          respuestaCorrecta: "下个月",
          explicacion: "El mes que viene = 下个月",
        },
        {
          id: "s7",
          pregunta: "¿Cómo se escribe la fecha 5 de mayo de 2024 en español?",
          preguntaChino: "2024年5月5日用西班牙语怎么写？",
          opciones: ["5/5/2024", "5 mayo 2024", "5 de mayo de 2024", "Mayo 5, 2024"],
          respuestaCorrecta: "5 de mayo de 2024",
          explicacion: "Formato correcto: día + de + mes + de + año",
        },
        {
          id: "s8",
          pregunta: "¿Qué mes tiene menos días?",
          preguntaChino: "哪个月天数最少？",
          opciones: ["enero", "febrero", "marzo", "abril"],
          respuestaCorrecta: "febrero",
          explicacion: "Febrero tiene 28 o 29 días.",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "西班牙语中，月份要大写。",
          preguntaChino: "西班牙语中，月份要大写。",
          respuestaCorrecta: false,
          explicacion: "错。月份不大写。",
        },
        {
          id: "vf2",
          pregunta: "七月和八月是夏季月份。",
          preguntaChino: "七月和八月是夏季月份。",
          respuestaCorrecta: true,
          explicacion: "对。七月和八月是夏季月份。",
        },
        {
          id: "vf3",
          pregunta: "一年有十个月。",
          preguntaChino: "一年有十个月。",
          respuestaCorrecta: false,
          explicacion: "错。一年有十二个月。",
        },
        {
          id: "vf4",
          pregunta: "秋天从九月开始。",
          preguntaChino: "秋天从九月开始。",
          respuestaCorrecta: true,
          explicacion: "对。秋天是九月、十月、十一月。",
        },
        {
          id: "vf5",
          pregunta: "二月总是有30天。",
          preguntaChino: "二月总是有30天。",
          respuestaCorrecta: false,
          explicacion: "错。二月有28或29天。",
        },
        {
          id: "vf6",
          pregunta: "Los meses son masculinos en español.",
          preguntaChino: "在西班牙语中，月份是阳性的。",
          respuestaCorrecta: true,
          explicacion: "对。Los meses son masculinos.",
        },
        {
          id: "vf7",
          pregunta: "El 1 de enero es el Día de Año Nuevo.",
          preguntaChino: "1月1日是新年。",
          respuestaCorrecta: true,
          explicacion: "对。Año Nuevo.",
        },
        {
          id: "vf8",
          pregunta: "En español, se escribe primero el mes y luego el día.",
          preguntaChino: "在西班牙语中，先写月份再写日子。",
          respuestaCorrecta: false,
          explicacion: "错。Primero el día, luego el mes.",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "enero",
              derecha: "一月",
            },
            {
              izquierda: "febrero",
              derecha: "二月",
            },
            {
              izquierda: "marzo",
              derecha: "三月",
            },
            {
              izquierda: "abril",
              derecha: "四月",
            },
            {
              izquierda: "mayo",
              derecha: "五月",
            },
            {
              izquierda: "junio",
              derecha: "六月",
            },
            {
              izquierda: "julio",
              derecha: "七月",
            },
            {
              izquierda: "agosto",
              derecha: "八月",
            },
            {
              izquierda: "septiembre",
              derecha: "九月",
            },
            {
              izquierda: "octubre",
              derecha: "十月",
            },
            {
              izquierda: "noviembre",
              derecha: "十一月",
            },
            {
              izquierda: "diciembre",
              derecha: "十二月",
            },
            {
              izquierda: "primavera",
              derecha: "春天",
            },
            {
              izquierda: "verano",
              derecha: "夏天",
            },
            {
              izquierda: "otoño",
              derecha: "秋天",
            },
            {
              izquierda: "invierno",
              derecha: "冬天",
            },
          ],
          explicacion: "将月份和季节与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["enero", "es", "primer", "El", "mes", "."],
          respuestaCorrecta: "El primer mes es enero.",
          explicacion: "正确的顺序是：El primer mes es enero.（第一个月是一月。）",
        },
        {
          id: "o2",
          palabras: ["en", "Mi", "mayo", "es", "cumpleaños", "."],
          respuestaCorrecta: "Mi cumpleaños es en mayo.",
          explicacion: "正确的顺序是：Mi cumpleaños es en mayo.（我的生日在五月。）",
        },
        {
          id: "o3",
          palabras: ["2024", "5", "Hoy", "es", "de", "mayo", "de", "."],
          respuestaCorrecta: "Hoy es 5 de mayo de 2024.",
          explicacion: "正确的顺序是：Hoy es 5 de mayo de 2024.（今天是2024年5月5日。）",
        },
        {
          id: "o4",
          palabras: ["estaciones", "hay", "cuatro", "año", "el", "En", "."],
          respuestaCorrecta: "En el año hay cuatro estaciones.",
          explicacion: "正确的顺序是：En el año hay cuatro estaciones.（一年有四季。）",
        },
        {
          id: "o5",
          palabras: ["viene", "Mes", "que", "viajaré", "el", "."],
          respuestaCorrecta: "El mes que viene viajaré.",
          explicacion: "正确的顺序是：El mes que viene viajaré.（下个月我会去旅行。）",
        },
        {
          id: "o6",
          palabras: ["fecha", "es", "hoy", "qué", "¿", "?"],
          respuestaCorrecta: "¿Qué fecha es hoy?",
          explicacion: "正确的顺序是：¿Qué fecha es hoy?（今天是几号？）",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我的生日在三月。",
          respuestaEsperada: "Mi cumpleaños es en marzo.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "今天是2024年8月15日。",
          respuestaEsperada: "Hoy es 15 de agosto de 2024.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "我喜欢春天。",
          respuestaEsperada: "Me gusta la primavera.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "十二月很冷。",
          respuestaEsperada: "Diciembre es muy frío.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "上个月我去了巴黎。",
          respuestaEsperada: "El mes pasado fui a París.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "下个月是新工作的开始。",
          respuestaEsperada: "El mes que viene empieza el nuevo trabajo.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "八月是夏天最热的月份。",
          respuestaEsperada: "Agosto es el mes más caluroso del verano.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "今天是几号？—今天是2月14日。",
          respuestaEsperada: "¿Qué fecha es hoy? —Hoy es 14 de febrero.",
          explicacion: "西班牙语翻译",
        },
      ],
    },
    ejerciciosPracticos: [
      {
        id: "ep1",
        tipo: "completarDialogo",
        titulo: "完成对话",
        tituloChino: "完成对话",
        instruccion: "用正确的月份完成对话。",
        instruccionChino: "用正确的月份完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿Cuándo es tu cumpleaños?",
            respuesta: "",
          },
          {
            personaje: "B",
            texto: "Mi cumpleaños es el 15 de _____.",
            respuesta: "enero / febrero / marzo",
          },
          {
            personaje: "A",
            texto: "¿Y en qué mes estamos ahora?",
            respuesta: "",
          },
          {
            personaje: "B",
            texto: "Estamos en _____.",
            respuesta: "abril / mayo / junio",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "completarTabla",
        titulo: "完成表格",
        tituloChino: "完成表格",
        instruccion: "用西班牙语写出正确的月份。",
        instruccionChino: "用西班牙语写出正确的月份。",
        tabla: [
          {
            chino: "一月",
            espanol: "enero",
          },
          {
            chino: "二月",
            espanol: "febrero",
          },
          {
            chino: "三月",
            espanol: "marzo",
          },
          {
            chino: "四月",
            espanol: "abril",
          },
          {
            chino: "五月",
            espanol: "mayo",
          },
          {
            chino: "六月",
            espanol: "junio",
          },
          {
            chino: "七月",
            espanol: "julio",
          },
          {
            chino: "八月",
            espanol: "agosto",
          },
          {
            chino: "九月",
            espanol: "septiembre",
          },
          {
            chino: "十月",
            espanol: "octubre",
          },
          {
            chino: "十一月",
            espanol: "noviembre",
          },
          {
            chino: "十二月",
            espanol: "diciembre",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "responder",
        titulo: "Responde las preguntas",
        tituloChino: "回答问题",
        instruccion: "Responde las siguientes preguntas en español.",
        instruccionChino: "用西班牙语回答以下问题。",
        preguntas: [
          {
            pregunta: "¿En qué mes estamos ahora?",
            respuestaEsperada: "Estamos en [mes].",
          },
          {
            pregunta: "¿Cuándo es tu cumpleaños?",
            respuestaEsperada: "Mi cumpleaños es el [día] de [mes].",
          },
          {
            pregunta: "¿Cuál es tu estación favorita?",
            respuestaEsperada: "Mi estación favorita es (primavera/verano/otoño/invierno).",
          },
        ],
      },
      {
        id: "ep4",
        tipo: "calendario",
        titulo: "Fechas importantes",
        tituloChino: "重要日期",
        instruccion: "Escribe en español las siguientes fechas importantes.",
        instruccionChino: "用西班牙语写出以下重要日期。",
        fechas: [
          {
            fecha: "1 de enero",
            espanol: "el primero de enero",
          },
          {
            fecha: "14 de febrero",
            espanol: "el catorce de febrero",
          },
          {
            fecha: "25 de diciembre",
            espanol: "el veinticinco de diciembre",
          },
        ],
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿En qué mes estamos ahora? Responde en español.",
        preguntaChino: "现在是几月？用西班牙语回答。",
        sugerencia: "Estamos en (mes).",
        sugerenciaChino: "Estamos en (mes).",
      },
      {
        id: "pa2",
        pregunta: "¿Cuándo es tu cumpleaños? Responde en español.",
        preguntaChino: "你的生日是什么时候？用西班牙语回答。",
        sugerencia: "Mi cumpleaños es el (día) de (mes).",
        sugerenciaChino: "Mi cumpleaños es el (día) de (mes).",
      },
      {
        id: "pa3",
        pregunta: "¿Cuál es tu estación favorita? ¿Por qué?",
        preguntaChino: "你最喜欢的季节是什么？为什么？",
        sugerencia: "Mi estación favorita es (primavera/verano/otoño/invierno) porque...",
        sugerenciaChino: "Mi estación favorita es (primavera/verano/otoño/invierno) porque...",
      },
      {
        id: "pa4",
        pregunta: "Escribe los meses del año en orden.",
        preguntaChino: "按顺序写出一年的月份。",
        sugerencia:
          "enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre",
        sugerenciaChino:
          "enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre",
      },
      {
        id: "pa5",
        pregunta: "¿Qué diferencias hay entre 'el mes pasado' y 'el mes que viene'?",
        preguntaChino: "'el mes pasado' 和 'el mes que viene' 有什么区别？",
        sugerencia: "El mes pasado es el mes anterior. El mes que viene es el próximo mes.",
        sugerenciaChino: "El mes pasado 是上个月。El mes que viene 是下个月。",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '一月' en español?",
        preguntaChino: "西班牙语中'一月'怎么说？",
        respuestaSugerida: "enero",
        respuestaSugeridaChino: "enero",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '八月' en español?",
        preguntaChino: "西班牙语中'八月'怎么说？",
        respuestaSugerida: "agosto",
        respuestaSugeridaChino: "agosto",
      },
      {
        id: "p3",
        pregunta: "¿Qué significa 'en agosto'?",
        preguntaChino: "'en agosto'是什么意思？",
        respuestaSugerida: "在八月",
        respuestaSugeridaChino: "En agosto",
      },
      {
        id: "p4",
        pregunta: "¿Cuál es la fecha de hoy? Responde en español.",
        preguntaChino: "今天是几号？用西班牙语回答。",
        respuestaSugerida: "Hoy es (día) de (mes) de (año)",
        respuestaSugeridaChino: "Hoy es (día) de (mes) de (año)",
      },
      {
        id: "p5",
        pregunta: "¿Qué meses tienen 31 días?",
        preguntaChino: "哪几个月有31天？",
        respuestaSugerida: "enero, marzo, mayo, julio, agosto, octubre, diciembre",
        respuestaSugeridaChino: "enero, marzo, mayo, julio, agosto, octubre, diciembre",
      },
      {
        id: "p6",
        pregunta: "¿Cómo se dice '上个月' en español?",
        preguntaChino: "西班牙语中'上个月'怎么说？",
        respuestaSugerida: "el mes pasado",
        respuestaSugeridaChino: "el mes pasado",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Cómo preguntar la hora",
        tituloChino: "如何问时间",
        descripcion: `Para preguntar la hora:

🔹 PREGUNTAS MÁS COMUNES:
• ¿Qué hora es? (la más común)
• ¿Tiene hora? (formal)
• ¿Me puedes decir la hora? (informal)
• ¿Sabe qué hora es? (formal, educado)

🔹 RESPUESTAS:
• Es la una (1:00) - singular
• Son las dos (2:00) - plural

🔹 REGLA IMPORTANTE:
✅ "Es la una" (singular) - solo para la 1:00
✅ "Son las..." (plural) - para todas las demás horas (2-12)

📌 EJEMPLOS:
• 1:00 → Es la una en punto
• 2:00 → Son las dos
• 3:00 → Son las tres
• 4:00 → Son las cuatro
• 5:00 → Son las cinco
• 6:00 → Son las seis
• 7:00 → Son las siete
• 8:00 → Son las ocho
• 9:00 → Son las nueve
• 10:00 → Son las diez
• 11:00 → Son las once
• 12:00 → Son las doce (mediodía) / Es la medianoche (12:00 am)

❌ ERROR COMÚN:
Decir "Son la una" (incorrecto) → Debes decir "Es la una".`,
        descripcionChino: `询问时间：

🔹 最常见的问题：
• ¿Qué hora es? = 几点了？（最常见）
• ¿Tiene hora? = 您有时间吗？（正式）
• ¿Me puedes decir la hora? = 你能告诉我时间吗？（非正式）
• ¿Sabe qué hora es? = 您知道几点了吗？（正式，有礼貌）

🔹 回答：
• Es la una (1:00) - 单数
• Son las dos (2:00) - 复数

🔹 重要规则：
✅ "Es la una"（单数）- 只用于1:00
✅ "Son las..."（复数）- 用于所有其他小时（2-12）

📌 例子：
• 1:00 → Es la una en punto
• 2:00 → Son las dos
• 3:00 → Son las tres
• 4:00 → Son las cuatro
• 5:00 → Son las cinco
• 6:00 → Son las seis
• 7:00 → Son las siete
• 8:00 → Son las ocho
• 9:00 → Son las nueve
• 10:00 → Son las diez
• 11:00 → Son las once
• 12:00 → Son las doce (中午) / Es la medianoche (午夜12点)

❌ 常见错误：
说 "Son la una"（错误）→ 应该说 "Es la una"。`,
        ejemplos: [
          {
            espanol: "—¿Qué hora es? —Es la una.",
            chino: "—几点了？—一点。",
          },
          {
            espanol: "—¿Qué hora es? —Son las tres.",
            chino: "—几点了？—三点。",
          },
          {
            espanol: "¿Me puedes decir la hora, por favor?",
            chino: "你能告诉我几点了吗？",
          },
          {
            espanol: "Disculpe, ¿tiene hora?",
            chino: "打扰一下，您知道时间吗？",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Minutos (1-30)",
        tituloChino: "分钟（1-30）",
        descripcion: `Para expresar los minutos del 1 al 30:

🔹 ESTRUCTURA: Son las + hora + y + minutos

• 1:05 → Es la una y cinco
• 2:10 → Son las dos y diez
• 3:15 → Son las tres y cuarto (15 minutos)
• 4:20 → Son las cuatro y veinte
• 5:25 → Son las cinco y veinticinco
• 6:30 → Son las seis y media (30 minutos)

🔹 FORMAS ESPECIALES:
• y cuarto = 15 minutos (un cuarto de hora)
• y media = 30 minutos (media hora)
• y veinticinco = 25 minutos

📌 EJEMPLOS COMPLETOS:
• 1:15 → Es la una y cuarto
• 2:30 → Son las dos y media
• 3:20 → Son las tres y veinte
• 4:45 → (NOTA: 45 minutos se dice "menos cuarto" - ver más abajo)

🔹 PREGUNTAR CON MINUTOS:
• ¿Qué hora es? — Son las cuatro y veinte.
• ¿A qué hora es la reunión? — A las tres y media.`,
        descripcionChino: `表达1到30分钟：

🔹 结构：Son las + 小时 + y + 分钟

• 1:05 → Es la una y cinco
• 2:10 → Son las dos y diez
• 3:15 → Son las tres y cuarto (15分钟)
• 4:20 → Son las cuatro y veinte
• 5:25 → Son las cinco y veinticinco
• 6:30 → Son las seis y media (30分钟)

🔹 特殊形式：
• y cuarto = 15分钟（一刻钟）
• y media = 30分钟（半小时）
• y veinticinco = 25分钟

📌 完整例子：
• 1:15 → Es la una y cuarto
• 2:30 → Son las dos y media
• 3:20 → Son las tres y veinte
• 4:45 → （注意：45分钟说"menos cuarto" - 见下文）

🔹 询问带分钟的时间：
• ¿Qué hora es? — Son las cuatro y veinte.
• ¿A qué hora es la reunión? — A las tres y media.`,
        ejemplos: [
          {
            espanol: "Son las dos y cuarto.",
            chino: "两点一刻。",
          },
          {
            espanol: "Son las cinco y media.",
            chino: "五点半。",
          },
          {
            espanol: "Es la una y diez.",
            chino: "一点十分。",
          },
          {
            espanol: "Son las ocho y veinticinco.",
            chino: "八点二十五分。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Minutos (31-59)",
        tituloChino: "分钟（31-59）",
        descripcion: `Para expresar los minutos del 31 al 59, usamos "menos":

🔹 ESTRUCTURA: Son las + (hora siguiente) + menos + (minutos que faltan)

• 2:35 → Son las tres menos veinticinco
• 3:40 → Son las cuatro menos veinte
• 4:45 → Son las cinco menos cuarto
• 5:50 → Son las seis menos diez
• 6:55 → Son las siete menos cinco

🔹 FORMAS ESPECIALES:
• menos cuarto = faltan 15 minutos (para la próxima hora)
• menos diez = faltan 10 minutos
• menos cinco = faltan 5 minutos

📌 TABLA DE REFERENCIA RÁPIDA:

| Hora | Forma "y" | Forma "menos" |
|------|-----------|---------------|
| 2:35 | Son las dos y treinta y cinco | Son las tres menos veinticinco |
| 3:40 | Son las tres y cuarenta | Son las cuatro menos veinte |
| 4:45 | Son las cuatro y cuarenta y cinco | Son las cinco menos cuarto |
| 5:50 | Son las cinco y cincuenta | Son las seis menos diez |
| 6:55 | Son las seis y cincuenta y cinco | Son las siete menos cinco |

❌ ERROR COMÚN:
Decir "Son las cuatro y cuarenta y cinco" es correcto pero menos común. Los nativos usan más "Son las cinco menos cuarto".`,
        descripcionChino: `表达31到59分钟，使用"menos"（差）：

🔹 结构：Son las + (下一个小时) + menos + (缺少的分钟)

• 2:35 → Son las tres menos veinticinco（差二十五分三点）
• 3:40 → Son las cuatro menos veinte（差二十分四点）
• 4:45 → Son las cinco menos cuarto（差一刻五点）
• 5:50 → Son las seis menos diez（差十分六点）
• 6:55 → Son las siete menos cinco（差五分七点）

🔹 特殊形式：
• menos cuarto = 差15分钟（差一刻）
• menos diez = 差10分钟
• menos cinco = 差5分钟

📌 快速参考表：

| 时间 | "y"形式 | "menos"形式 |
|------|---------|-------------|
| 2:35 | Son las dos y treinta y cinco | Son las tres menos veinticinco |
| 3:40 | Son las tres y cuarenta | Son las cuatro menos veinte |
| 4:45 | Son las cuatro y cuarenta y cinco | Son las cinco menos cuarto |
| 5:50 | Son las cinco y cincuenta | Son las seis menos diez |
| 6:55 | Son las seis y cincuenta y cinco | Son las siete menos cinco |

❌ 常见错误：
说"Son las cuatro y cuarenta y cinco"是正确的，但不常见。母语者更常用"Son las cinco menos cuarto"。`,
        ejemplos: [
          {
            espanol: "Son las tres menos cuarto.",
            chino: "差一刻三点（2:45）。",
          },
          {
            espanol: "Son las cinco menos veinte.",
            chino: "差二十分五点（4:40）。",
          },
          {
            espanol: "Son las ocho menos diez.",
            chino: "差十分八点（7:50）。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Horas del día (AM/PM)",
        tituloChino: "一天中的时间（上午/下午）",
        descripcion: `Para especificar si es de mañana, tarde o noche:

🔹 EXPRESIONES:
• de la mañana = desde las 1:00 hasta las 12:00 (madrugada y mañana)
• de la tarde = desde las 13:00 hasta las 20:00
• de la noche = desde las 21:00 hasta las 24:00
• de la madrugada = desde las 0:00 hasta las 6:00 (very early morning)

🔹 EJEMPLOS:
• 1:00 am → Es la una de la madrugada / de la mañana
• 8:00 am → Son las ocho de la mañana
• 12:00 pm → Es el mediodía / Son las doce del día
• 3:00 pm → Son las tres de la tarde
• 8:00 pm → Son las ocho de la noche
• 12:00 am → Es la medianoche

📌 PUNTOS CLAVE:
• mediodía = 12:00 pm (noon)
• medianoche = 12:00 am (midnight)

🔹 CÓMO PREGUNTAR:
• ¿A qué hora quedamos?
• ¿A las tres de la tarde?
• ¿A las ocho de la noche?

🔹 RESPUESTAS:
• Quedamos a las tres de la tarde.
• Nos vemos a las ocho de la noche.`,
        descripcionChino: `指定上午/下午/晚上：

🔹 表达：
• de la mañana = 上午（1:00-12:00）
• de la tarde = 下午（13:00-20:00）
• de la noche = 晚上（21:00-24:00）
• de la madrugada = 凌晨（0:00-6:00）

🔹 例子：
• 凌晨1:00 → Es la una de la madrugada / de la mañana
• 上午8:00 → Son las ocho de la mañana
• 中午12:00 → Es el mediodía / Son las doce del día
• 下午3:00 → Son las tres de la tarde
• 晚上8:00 → Son las ocho de la noche
• 午夜12:00 → Es la medianoche

📌 关键点：
• mediodía = 中午12点
• medianoche = 午夜12点

🔹 如何询问：
• ¿A qué hora quedamos? = 我们几点见？
• ¿A las tres de la tarde? = 下午三点吗？
• ¿A las ocho de la noche? = 晚上八点吗？

🔹 回答：
• Quedamos a las tres de la tarde. = 我们下午三点见。
• Nos vemos a las ocho de la noche. = 我们晚上八点见。`,
        ejemplos: [
          {
            espanol: "Son las diez de la mañana.",
            chino: "上午十点。",
          },
          {
            espanol: "Son las cuatro de la tarde.",
            chino: "下午四点。",
          },
          {
            espanol: "Son las once de la noche.",
            chino: "晚上十一点。",
          },
          {
            espanol: "Es la una de la madrugada.",
            chino: "凌晨一点。",
          },
        ],
      },
      {
        id: "t5",
        titulo: "A qué hora vs Qué hora es",
        tituloChino: "A qué hora vs Qué hora es",
        descripcion: `🔹 DIFERENCIA IMPORTANTE:

• ¿Qué hora es? = ¿Cuál es la hora actual? (What time is it now?)
• ¿A qué hora...? = ¿A qué hora del día ocurre algo? (At what time does something happen?)

🔹 EJEMPLOS CON "¿QUÉ HORA ES?" (pregunta por la hora actual):
• ¿Qué hora es? — Son las tres de la tarde.
• ¿Sabes qué hora es? — Es la una y media.
• ¿Me puedes decir qué hora es? — Son las ocho menos cuarto.

🔹 EJEMPLOS CON "¿A QUÉ HORA...?" (pregunta por el horario de un evento):
• ¿A qué hora es la reunión? — A las diez de la mañana.
• ¿A qué hora empieza la película? — A las ocho de la noche.
• ¿A qué hora abren el supermercado? — A las nueve de la mañana.
• ¿A qué hora quedamos? — A las siete y media.

📌 RESPONDER A "¿A QUÉ HORA?":
• La reunión es a las diez.
• Empieza a las ocho.
• Abren a las nueve.
• Quedamos a las siete y media.`,
        descripcionChino: `🔹 重要区别：

• ¿Qué hora es? = 现在是几点？（询问当前时间）
• ¿A qué hora...? = 某事发生在几点？（询问事件的时间）

🔹 "¿QUÉ HORA ES?" 的例子（询问当前时间）：
• ¿Qué hora es? — Son las tres de la tarde. = 几点了？—下午三点。
• ¿Sabes qué hora es? — Es la una y media. = 你知道几点了吗？—一点半。
• ¿Me puedes decir qué hora es? — Son las ocho menos cuarto. = 你能告诉我几点了吗？—差一刻八点。

🔹 "¿A QUÉ HORA...?" 的例子（询问事件的时间）：
• ¿A qué hora es la reunión? — A las diez de la mañana. = 会议几点？—上午十点。
• ¿A qué hora empieza la película? — A las ocho de la noche. = 电影几点开始？—晚上八点。
• ¿A qué hora abren el supermercado? — A las nueve de la mañana. = 超市几点开门？—上午九点。
• ¿A qué hora quedamos? — A las siete y media. = 我们几点见？—七点半。

📌 回答"¿A QUÉ HORA?"：
• La reunión es a las diez. = 会议在十点。
• Empieza a las ocho. = 八点开始。
• Abren a las nueve. = 九点开门。
• Quedamos a las siete y media. = 我们七点半见。`,
        ejemplos: [
          {
            espanol: "¿Qué hora es? — Son las dos.",
            chino: "几点了？—两点。",
          },
          {
            espanol: "¿A qué hora es la cena? — A las nueve.",
            chino: "晚餐几点？—九点。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "¿Qué hora es?",
        chino: "几点了？",
        ejemplo: "¿Qué hora es?",
      },
      {
        id: "v2",
        espanol: "la una",
        chino: "一点",
        ejemplo: "Es la una.",
      },
      {
        id: "v3",
        espanol: "las dos",
        chino: "两点",
        ejemplo: "Son las dos.",
      },
      {
        id: "v4",
        espanol: "en punto",
        chino: "整点",
        ejemplo: "Son las tres en punto.",
      },
      {
        id: "v5",
        espanol: "y cuarto",
        chino: "一刻",
        ejemplo: "Son las cuatro y cuarto.",
      },
      {
        id: "v6",
        espanol: "y media",
        chino: "半",
        ejemplo: "Son las cinco y media.",
      },
      {
        id: "v7",
        espanol: "menos cuarto",
        chino: "差一刻",
        ejemplo: "Son las seis menos cuarto.",
      },
      {
        id: "v8",
        espanol: "de la mañana",
        chino: "上午",
        ejemplo: "Son las ocho de la mañana.",
      },
      {
        id: "v9",
        espanol: "de la tarde",
        chino: "下午",
        ejemplo: "Son las tres de la tarde.",
      },
      {
        id: "v10",
        espanol: "de la noche",
        chino: "晚上",
        ejemplo: "Son las nueve de la noche.",
      },
      {
        id: "v11",
        espanol: "de la madrugada",
        chino: "凌晨",
        ejemplo: "Es la una de la madrugada.",
      },
      {
        id: "v12",
        espanol: "mediodía",
        chino: "中午",
        ejemplo: "Es el mediodía.",
      },
      {
        id: "v13",
        espanol: "medianoche",
        chino: "午夜",
        ejemplo: "Es la medianoche.",
      },
      {
        id: "v14",
        espanol: "minuto",
        chino: "分钟",
        ejemplo: "Faltan cinco minutos.",
      },
      {
        id: "v15",
        espanol: "hora",
        chino: "小时/时间",
        ejemplo: "Una hora es 60 minutos.",
      },
      {
        id: "v16",
        espanol: "segundo",
        chino: "秒",
        ejemplo: "Espera un segundo.",
      },
      {
        id: "v17",
        espanol: "reloj",
        chino: "钟表",
        ejemplo: "El reloj está parado.",
      },
      {
        id: "v18",
        espanol: "¿A qué hora...?",
        chino: "几点...？",
        ejemplo: "¿A qué hora es la fiesta?",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Preguntando la hora en la calle",
        tituloChino: "在街上问时间",
        personajes: ["Turista", "Local"],
        lineas: [
          {
            personaje: "Turista",
            texto: "Disculpe, ¿qué hora es?",
            traduccion: "打扰一下，几点了？",
          },
          {
            personaje: "Local",
            texto: "Son las dos y media.",
            traduccion: "两点半。",
          },
          {
            personaje: "Turista",
            texto: "¿De la tarde?",
            traduccion: "下午吗？",
          },
          {
            personaje: "Local",
            texto: "Sí, de la tarde.",
            traduccion: "是的，下午。",
          },
          {
            personaje: "Turista",
            texto: "Muchas gracias.",
            traduccion: "非常感谢。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Quedando con un amigo",
        tituloChino: "和朋友约时间",
        personajes: ["Ana", "Carlos"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Carlos, ¿a qué hora quedamos?",
            traduccion: "卡洛斯，我们几点见面？",
          },
          {
            personaje: "Carlos",
            texto: "¿Te viene bien a las seis?",
            traduccion: "六点方便吗？",
          },
          {
            personaje: "Ana",
            texto: "Las seis es un poco pronto. ¿Y a las siete y cuarto?",
            traduccion: "六点有点早。七点一刻呢？",
          },
          {
            personaje: "Carlos",
            texto: "Perfecto. Nos vemos a las siete y cuarto.",
            traduccion: "完美。我们七点一刻见。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "En la clase",
        tituloChino: "在课堂上",
        personajes: ["Profesor", "Estudiante"],
        lineas: [
          {
            personaje: "Estudiante",
            texto: "Profesor, ¿qué hora es?",
            traduccion: "老师，几点了？",
          },
          {
            personaje: "Profesor",
            texto: "Son las diez menos diez.",
            traduccion: "差十分十点。",
          },
          {
            personaje: "Estudiante",
            texto: "¿Cuándo termina la clase?",
            traduccion: "什么时候下课？",
          },
          {
            personaje: "Profesor",
            texto: "La clase termina a las once menos cuarto.",
            traduccion: "差一刻十一点下课。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Programando una cita",
        tituloChino: "安排约会",
        personajes: ["Laura", "David"],
        lineas: [
          {
            personaje: "Laura",
            texto: "David, ¿a qué hora podemos cenar mañana?",
            traduccion: "大卫，我们明天几点可以吃晚餐？",
          },
          {
            personaje: "David",
            texto: "¿Qué te parece a las nueve?",
            traduccion: "你觉得九点怎么样？",
          },
          {
            personaje: "Laura",
            texto: "Un poco tarde. ¿Podemos a las ocho y media?",
            traduccion: "有点晚。我们可以八点半吗？",
          },
          {
            personaje: "David",
            texto: "Vale. A las ocho y media de la noche. ¿Dónde quedamos?",
            traduccion: "好的。晚上八点半。我们在哪里见面？",
          },
          {
            personaje: "Laura",
            texto: "En el restaurante italiano. ¡Nos vemos!",
            traduccion: "在意大利餐厅。再见！",
          },
        ],
      },
      {
        id: "d5",
        titulo: "En casa por la mañana",
        tituloChino: "早上在家",
        personajes: ["Madre", "Hijo"],
        lineas: [
          {
            personaje: "Madre",
            texto: "¡Levántate! Son las ocho de la mañana.",
            traduccion: "起床了！早上八点了。",
          },
          {
            personaje: "Hijo",
            texto: "¿Ya son las ocho? No me lo puedo creer.",
            traduccion: "已经八点了？我不敢相信。",
          },
          {
            personaje: "Madre",
            texto: "Sí, y tienes clase a las nueve menos cuarto.",
            traduccion: "是的，你差一刻九点有课。",
          },
          {
            personaje: "Hijo",
            texto: "¡Voy tarde! ¿Qué hora es ahora?",
            traduccion: "我要迟到了！现在几点了？",
          },
          {
            personaje: "Madre",
            texto: "Son las ocho y veinticinco. ¡Date prisa!",
            traduccion: "八点二十五分了。快点！",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "为了问时间我们说：¿_____ hora es?",
          preguntaChino: "为了问时间我们说：¿_____ hora es?",
          respuestaCorrecta: "Qué",
          explicacion: "'¿Qué hora es?' = 几点了？",
          pista: "首字母是 Q，3个字母",
          numeroLetras: 3,
        },
        {
          id: "c2",
          pregunta: "1:30说：Es la una y _____",
          preguntaChino: "1:30说：Es la una y _____",
          respuestaCorrecta: "media",
          explicacion: "1:30 = 'Es la una y media'（一点半）。",
          pista: "首字母是 m，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c3",
          pregunta: "3:15说：Son las tres y _____",
          preguntaChino: "3:15说：Son las tres y _____",
          respuestaCorrecta: "cuarto",
          explicacion: "3:15 = 'Son las tres y cuarto'（三点一刻）。",
          pista: "首字母是 c，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c4",
          pregunta: "2:45说：Son las _____ menos cuarto",
          preguntaChino: "2:45说：Son las _____ menos cuarto",
          respuestaCorrecta: "tres",
          explicacion: "2:45 = 'Son las tres menos cuarto'（差一刻三点）。",
          pista: "首字母是 t，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c5",
          pregunta: "为了说'上午'我们说：de la _____",
          preguntaChino: "为了说'上午'我们说：de la _____",
          respuestaCorrecta: "mañana",
          explicacion: "'de la mañana' = 上午。",
          pista: "首字母是 m，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c6",
          pregunta: "中午12:00说：el _____",
          preguntaChino: "中午12:00说：el _____",
          respuestaCorrecta: "mediodía",
          explicacion: "Mediodía = 中午",
          pista: "首字母是 m，8个字母",
          numeroLetras: 8,
        },
        {
          id: "c7",
          pregunta: "午夜12:00说：la _____",
          preguntaChino: "午夜12:00说：la _____",
          respuestaCorrecta: "medianoche",
          explicacion: "Medianoche = 午夜",
          pista: "首字母是 m，10个字母",
          numeroLetras: 10,
        },
        {
          id: "c8",
          pregunta: "为了问'几点开会？'：¿A qué _____ es la reunión?",
          preguntaChino: "为了问'几点开会？'：¿A qué _____ es la reunión?",
          respuestaCorrecta: "hora",
          explicacion: "'¿A qué hora...?' = 几点...？",
          pista: "首字母是 h，4个字母",
          numeroLetras: 4,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "2:45怎么说？",
          preguntaChino: "2:45怎么说？",
          opciones: [
            "Son las dos y cuarenta y cinco",
            "Son las tres menos cuarto",
            "Son las dos y cuarto",
            "Son las tres",
          ],
          respuestaCorrecta: "Son las tres menos cuarto",
          explicacion: "2:45 = 'Son las tres menos cuarto'",
        },
        {
          id: "s2",
          pregunta: "1:00的正确形式是什么？",
          preguntaChino: "1:00的正确形式是什么？",
          opciones: ["Son las una", "Es la una", "Es uno", "Son las uno"],
          respuestaCorrecta: "Es la una",
          explicacion: "1:00用'Es la una'（单数）",
        },
        {
          id: "s3",
          pregunta: "'en punto'是什么意思？",
          preguntaChino: "'en punto'是什么意思？",
          opciones: ["大约", "整点", "半点", "一刻"],
          respuestaCorrecta: "整点",
          explicacion: "'en punto' = 整点",
        },
        {
          id: "s4",
          pregunta: "中午12:00怎么说？",
          preguntaChino: "中午12:00怎么说？",
          opciones: [
            "Es la medianoche",
            "Es el mediodía",
            "Son las doce de la noche",
            "Son las doce de la mañana",
          ],
          respuestaCorrecta: "Es el mediodía",
          explicacion: "中午12点 = 'el mediodía'",
        },
        {
          id: "s5",
          pregunta: "7:55怎么说？",
          preguntaChino: "7:55怎么说？",
          opciones: [
            "Son las ocho menos cinco",
            "Son las siete y cincuenta y cinco",
            "Son las siete y cinco",
            "Son las ocho y cinco",
          ],
          respuestaCorrecta: "Son las ocho menos cinco",
          explicacion: "7:55 = 'Son las ocho menos cinco'",
        },
        {
          id: "s6",
          pregunta: "如何问'电影几点开始？'",
          preguntaChino: "如何问'电影几点开始？'",
          opciones: [
            "¿Qué hora es?",
            "¿A qué hora empieza la película?",
            "¿Cuánto dura la película?",
            "¿Dónde es la película?",
          ],
          respuestaCorrecta: "¿A qué hora empieza la película?",
          explicacion: "Para preguntar el horario de un evento",
        },
        {
          id: "s7",
          pregunta: "5:20怎么说？",
          preguntaChino: "5:20怎么说？",
          opciones: [
            "Son las cinco y veinte",
            "Son las cinco y media",
            "Son las seis menos veinte",
            "Son las cinco menos veinte",
          ],
          respuestaCorrecta: "Son las cinco y veinte",
          explicacion: "5:20 = Son las cinco y veinte",
        },
        {
          id: "s8",
          pregunta: "凌晨3点怎么说？",
          preguntaChino: "凌晨3点怎么说？",
          opciones: [
            "Son las tres de la mañana",
            "Son las tres de la tarde",
            "Son las tres de la noche",
            "Son las tres de la madrugada",
          ],
          respuestaCorrecta: "Son las tres de la madrugada",
          explicacion: "Para horas muy tempranas (0-6) se usa 'de la madrugada'",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Son las una' para 1:00是正确的。",
          preguntaChino: "'Son las una' para 1:00是正确的。",
          respuestaCorrecta: false,
          explicacion: "错。应该是'Es la una'（单数）。",
        },
        {
          id: "vf2",
          pregunta: "'Y media'意思是30分钟。",
          preguntaChino: "'Y media'意思是30分钟。",
          respuestaCorrecta: true,
          explicacion: "对。'y media' = 30分钟",
        },
        {
          id: "vf3",
          pregunta: "'Menos cuarto'意思是差15分钟到下一个小时。",
          preguntaChino: "'Menos cuarto'意思是差15分钟到下一个小时。",
          respuestaCorrecta: true,
          explicacion: "对。'menos cuarto' = 差一刻",
        },
        {
          id: "vf4",
          pregunta: "对于凌晨2:00，我们说'Son las dos de la noche'。",
          preguntaChino: "对于凌晨2:00，我们说'Son las dos de la noche'。",
          respuestaCorrecta: false,
          explicacion: "错。凌晨2点通常说'de la madrugada'",
        },
        {
          id: "vf5",
          pregunta: "'Es la una y media'意思是1:30。",
          preguntaChino: "'Es la una y media'意思是1:30。",
          respuestaCorrecta: true,
          explicacion: "对。1:30 = 'Es la una y media'",
        },
        {
          id: "vf6",
          pregunta: "'¿A qué hora?' se usa para preguntar el horario de un evento.",
          preguntaChino: "'¿A qué hora?'用于询问事件的时间。",
          respuestaCorrecta: true,
          explicacion: "对。¿A qué hora es la fiesta?",
        },
        {
          id: "vf7",
          pregunta: "En España se usa el formato de 24 horas para hablar.",
          preguntaChino: "在西班牙，说话时使用24小时制。",
          respuestaCorrecta: false,
          explicacion: "错。Normalmente se usa el formato de 12 horas.",
        },
        {
          id: "vf8",
          pregunta: "'Son las doce del mediodía' es correcto.",
          preguntaChino: "'Son las doce del mediodía'是正确的。",
          respuestaCorrecta: true,
          explicacion: "对。También se dice 'Es el mediodía'.",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "y cuarto",
              derecha: "15分钟",
            },
            {
              izquierda: "y media",
              derecha: "30分钟",
            },
            {
              izquierda: "menos cuarto",
              derecha: "45分钟",
            },
            {
              izquierda: "en punto",
              derecha: "整点",
            },
            {
              izquierda: "de la mañana",
              derecha: "上午",
            },
            {
              izquierda: "de la tarde",
              derecha: "下午",
            },
            {
              izquierda: "de la noche",
              derecha: "晚上",
            },
            {
              izquierda: "de la madrugada",
              derecha: "凌晨",
            },
            {
              izquierda: "mediodía",
              derecha: "中午",
            },
            {
              izquierda: "medianoche",
              derecha: "午夜",
            },
          ],
          explicacion: "将时间表达与含义配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["las", "dos", "Son", "menos", "diez", "."],
          respuestaCorrecta: "Son las dos menos diez.",
          explicacion: "正确的顺序是：Son las dos menos diez.（差十分两点）",
        },
        {
          id: "o2",
          palabras: ["y", "cuarto", "las", "tres", "Son", "."],
          respuestaCorrecta: "Son las tres y cuarto.",
          explicacion: "正确的顺序是：Son las tres y cuarto.（三点一刻）",
        },
        {
          id: "o3",
          palabras: ["hora", "qué", "es", "¿", "?"],
          respuestaCorrecta: "¿Qué hora es?",
          explicacion: "正确的顺序是：¿Qué hora es?（几点了？）",
        },
        {
          id: "o4",
          palabras: ["hora", "A", "qué", "es", "la", "cena", "¿", "?"],
          respuestaCorrecta: "¿A qué hora es la cena?",
          explicacion: "正确的顺序是：¿A qué hora es la cena?（晚餐几点？）",
        },
        {
          id: "o5",
          palabras: ["menos", "Son", "siete", "las", "cinco", "."],
          respuestaCorrecta: "Son las siete menos cinco.",
          explicacion: "正确的顺序是：Son las siete menos cinco.（差五分七点）",
        },
        {
          id: "o6",
          palabras: ["la", "de", "noche", "once", "Son", "las", "."],
          respuestaCorrecta: "Son las once de la noche.",
          explicacion: "正确的顺序是：Son las once de la noche.（晚上十一点）",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "几点了？",
          respuestaEsperada: "¿Qué hora es?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "现在是下午三点半。",
          respuestaEsperada: "Son las tres y media de la tarde.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "差一刻十二点。",
          respuestaEsperada: "Son las doce menos cuarto.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "我们七点整见面。",
          respuestaEsperada: "Nos vemos a las siete en punto.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "电影晚上八点开始。",
          respuestaEsperada: "La película empieza a las ocho de la noche.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "现在凌晨两点。",
          respuestaEsperada: "Son las dos de la madrugada.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "会议是中午十二点。",
          respuestaEsperada: "La reunión es a las doce del mediodía.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "差十分九点。",
          respuestaEsperada: "Son las nueve menos diez.",
          explicacion: "西班牙语翻译",
        },
      ],
    },
    ejerciciosPracticos: [
      {
        id: "ep1",
        tipo: "reloj",
        titulo: "Lee el reloj",
        tituloChino: "读钟表",
        instruccion: "Escribe la hora que muestra cada reloj en español.",
        instruccionChino: "用西班牙语写出每个钟表显示的时间。",
        horas: [
          {
            hora: "1:00",
            espanol: "Es la una en punto",
          },
          {
            hora: "2:15",
            espanol: "Son las dos y cuarto",
          },
          {
            hora: "3:30",
            espanol: "Son las tres y media",
          },
          {
            hora: "4:45",
            espanol: "Son las cinco menos cuarto",
          },
          {
            hora: "5:10",
            espanol: "Son las cinco y diez",
          },
          {
            hora: "6:50",
            espanol: "Son las siete menos diez",
          },
          {
            hora: "7:55",
            espanol: "Son las ocho menos cinco",
          },
          {
            hora: "10:05",
            espanol: "Son las diez y cinco",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "completarDialogo",
        titulo: "完成对话",
        tituloChino: "完成对话",
        instruccion: "用正确的时间表达完成对话。",
        instruccionChino: "用正确的时间表达完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿_____ hora es?",
            respuesta: "Qué",
          },
          {
            personaje: "B",
            texto: "Son las _____ y _____.",
            respuesta: "cuatro / cuarto / media",
          },
          {
            personaje: "A",
            texto: "¿De la mañana o de la _____?",
            respuesta: "tarde",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "convertir",
        titulo: "Convierte las horas",
        tituloChino: "转换时间",
        instruccion: "Convierte las siguientes horas al formato español (usa 'y' o 'menos').",
        instruccionChino: "将以下时间转换为西班牙语格式（使用'y'或'menos'）。",
        horas: [
          {
            hora: "2:30",
            espanol: "Son las dos y media",
          },
          {
            hora: "3:45",
            espanol: "Son las cuatro menos cuarto",
          },
          {
            hora: "5:15",
            espanol: "Son las cinco y cuarto",
          },
          {
            hora: "8:20",
            espanol: "Son las ocho y veinte",
          },
          {
            hora: "10:40",
            espanol: "Son las once menos veinte",
          },
        ],
      },
      {
        id: "ep4",
        tipo: "responder",
        titulo: "Responde las preguntas",
        tituloChino: "回答问题",
        instruccion: "Responde las siguientes preguntas sobre la hora en español.",
        instruccionChino: "用西班牙语回答以下关于时间的问题。",
        preguntas: [
          {
            pregunta: "¿Qué hora es ahora?",
            respuestaEsperada: "Son las [hora].",
          },
          {
            pregunta: "¿A qué hora te levantas?",
            respuestaEsperada: "Me levanto a las [hora] de la mañana.",
          },
          {
            pregunta: "¿A qué hora empieza tu clase?",
            respuestaEsperada: "Mi clase empieza a las [hora].",
          },
        ],
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Qué hora es ahora? Responde en español.",
        preguntaChino: "现在几点？用西班牙语回答。",
        sugerencia: "Son las (hora) y (minutos).",
        sugerenciaChino: "Son las (hora) y (minutos).",
      },
      {
        id: "pa2",
        pregunta: "¿A qué hora te levantas?",
        preguntaChino: "你几点起床？",
        sugerencia: "Me levanto a las (hora) de la mañana.",
        sugerenciaChino: "Me levanto a las (hora) de la mañana.",
      },
      {
        id: "pa3",
        pregunta: "¿Cuál es la diferencia entre 'y cuarto' y 'menos cuarto'?",
        preguntaChino: "'y cuarto'和'menos cuarto'有什么区别？",
        sugerencia: "Y cuarto = 15 minutos después. Menos cuarto = 15 minutos antes.",
        sugerenciaChino: "Y cuarto = 过了15分钟。Menos cuarto = 差15分钟。",
      },
      {
        id: "pa4",
        pregunta: "¿Cómo se dice en español 'a las 8:45 de la mañana'?",
        preguntaChino: "西班牙语中'早上8:45'怎么说？",
        sugerencia: "Son las nueve menos cuarto de la mañana.",
        sugerenciaChino: "Son las nueve menos cuarto de la mañana.",
      },
      {
        id: "pa5",
        pregunta: "Describe tu horario diario usando las horas en español.",
        preguntaChino: "用西班牙语使用时间描述你的日常时间表。",
        sugerencia: "Me levanto a las 7:00. Desayuno a las 7:30. Trabajo de 9:00 a 18:00.",
        sugerenciaChino: "Me levanto a las 7:00. Desayuno a las 7:30. Trabajo de 9:00 a 18:00.",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se pregunta la hora en español?",
        preguntaChino: "如何用西班牙语问时间？",
        respuestaSugerida: "¿Qué hora es?",
        respuestaSugeridaChino: "¿Qué hora es?",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice 2:45 en español?",
        preguntaChino: "2:45用西班牙语怎么说？",
        respuestaSugerida: "Son las tres menos cuarto",
        respuestaSugeridaChino: "Son las tres menos cuarto",
      },
      {
        id: "p3",
        pregunta: "¿Qué significa 'Son las ocho de la mañana'?",
        preguntaChino: "'Son las ocho de la mañana'是什么意思？",
        respuestaSugerida: "上午八点",
        respuestaSugeridaChino: "上午八点",
      },
      {
        id: "p4",
        pregunta: "¿Cómo se dice '中午12点' en español?",
        preguntaChino: "西班牙语中'中午12点'怎么说？",
        respuestaSugerida: "mediodía",
        respuestaSugeridaChino: "mediodía",
      },
      {
        id: "p5",
        pregunta: "Escribe tres formas diferentes de decir la hora con minutos.",
        preguntaChino: "写出三种表达时间（带分钟）的方式。",
        respuestaSugerida: "y cuarto, y media, menos cuarto, y diez, menos cinco, etc.",
        respuestaSugeridaChino: "y cuarto, y media, menos cuarto, y diez, menos cinco等",
      },
      {
        id: "p6",
        pregunta: "¿Cómo se dice '差十分三点' en español?",
        preguntaChino: "西班牙语中'差十分三点'怎么说？",
        respuestaSugerida: "Son las tres menos diez.",
        respuestaSugeridaChino: "Son las tres menos diez.",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Números ordinales del 1 al 10",
        tituloChino: "序数词1到10",
        descripcion: `Los números ordinales en español (masculino / femenino):

1º = primero / primera
2º = segundo / segunda
3º = tercero / tercera
4º = cuarto / cuarta
5º = quinto / quinta
6º = sexto / sexta
7º = séptimo / séptima
8º = octavo / octava
9º = noveno / novena
10º = décimo / décima

🔹 REGLA DE APOCOPE (acortamiento):
"Primero" y "tercero" se acortan antes de un sustantivo masculino:
• primer lugar (primer + lugar)
• tercer piso (tercer + piso)

📌 EJEMPLOS:
• el primer día del año (the first day of the year)
• el tercer mes del año (the third month of the year)

❌ ERROR COMÚN:
No se acortan si el sustantivo es femenino:
✅ primera vez (correcto)
❌ primer vez (incorrecto)`,
        descripcionChino: `西班牙语序数词1到10：

1º = primero / primera - 第一
2º = segundo / segunda - 第二
3º = tercero / tercera - 第三
4º = cuarto / cuarta - 第四
5º = quinto / quinta - 第五
6º = sexto / sexta - 第六
7º = séptimo / séptima - 第七
8º = octavo / octava - 第八
9º = noveno / novena - 第九
10º = décimo / décima - 第十

🔹 缩略规则：
"primero"（第一）和"tercero"（第三）在阳性名词前面时，要去掉结尾的 -o：
• primer lugar（第一个位置）
• tercer piso（第三层楼）

📌 例子：
• el primer día del año = 一年的第一天
• el tercer mes del año = 一年的第三个月

❌ 常见错误：
如果名词是阴性，不要缩略：
✅ primera vez（正确）
❌ primer vez（错误）`,
        ejemplos: [
          {
            espanol: "El primer día de la semana es lunes.",
            chino: "一周的第一天是星期一。",
          },
          {
            espanol: "Vivo en el tercer piso.",
            chino: "我住在三楼。",
          },
          {
            espanol: "Ella es la primera en la clase.",
            chino: "她是班里的第一名。",
          },
          {
            espanol: "Esta es mi primera vez en España.",
            chino: "这是我第一次来西班牙。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Uso de los ordinales",
        tituloChino: "序数词的用法",
        descripcion: `🔹 CÓMO USAR LOS NÚMEROS ORDINALES:

1. Van ANTES del sustantivo
   • el primer libro (the first book)
   • la segunda vez (the second time)

2. Concuerdan en género y número con el sustantivo
   • primer piso (masculino singular)
   • primera vez (femenino singular)
   • primeros días (masculino plural - the first days)
   • primeras veces (femenino plural - the first times)

3. Después del sustantivo (menos común, pero posible):
   • el capítulo primero = el primer capítulo
   • la fila segunda = la segunda fila

🔹 USOS COMUNES DE LOS ORDINALES:

• POSICIONES: Llegó en primer lugar. (He arrived in first place)
• PISOS: Vivo en el cuarto piso. (I live on the fourth floor)
• ANIVERSARIOS: Es nuestro quinto aniversario. (It's our fifth anniversary)
• SIGLOS: El siglo veintiuno (The 21st century)
• REYES/PAPAS: Felipe VI (Felipe sexto), Juan Pablo II (Juan Pablo segundo)
• FECHAS: El 1 de enero se lee "el primero de enero"

📌 NOTA IMPORTANTE:
Para números más altos (11º en adelante), se usan menos los ordinales. En su lugar, se usan números cardinales:
• El piso once (no "el undécimo piso" - aunque existe, es menos común)
• El siglo veinte (no "el vigésimo siglo")`,
        descripcionChino: `🔹 如何正确使用序数词：

1. 位置：序数词必须放在名词的前面
   • el primer libro（第一本书）
   • la segunda vez（第二次）

2. 性数一致：序数词要和名词保持相同的性和数
   • primer piso（阳性单数）
   • primera vez（阴性单数）
   • primeros días（阳性复数 - 最初几天）
   • primeras veces（阴性复数 - 最初几次）

3. 放在名词后面（不太常见，但可能）：
   • el capítulo primero = el primer capítulo
   • la fila segunda = la segunda fila

🔹 序数词的常见用途：

• 排名和名次：Llegó en primer lugar.（他得了第一名）
• 楼层：Vivo en el cuarto piso.（我住在四楼）
• 周年纪念：Es nuestro quinto aniversario.（这是我们的五周年纪念）
• 世纪：El siglo veintiuno（二十一世纪）
• 国王/教皇：Felipe VI (Felipe sexto), Juan Pablo II (Juan Pablo segundo)
• 日期：El 1 de enero 读作 "el primero de enero"

📌 重要提示：
对于更高的数字（11º及以上），序数词使用较少。相反，使用基数词：
• El piso once（不是 "el undécimo piso" - 虽然存在，但不常见）
• El siglo veinte（不是 "el vigésimo siglo"）`,
        ejemplos: [
          {
            espanol: "Gané el primer premio.",
            chino: "我赢得了第一名。",
          },
          {
            espanol: "Llegó en segundo lugar.",
            chino: "他得了第二名。",
          },
          {
            espanol: "Vivo en el cuarto piso.",
            chino: "我住在四楼。",
          },
          {
            espanol: "Es nuestro quinto aniversario.",
            chino: "这是我们的五周年纪念。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Ordinales del 11 al 20",
        tituloChino: "序数词11到20",
        descripcion: `Números ordinales del 11 al 20:

11º = undécimo / undécima
12º = duodécimo / duodécima
13º = decimotercero / decimotercera
14º = decimocuarto / decimocuarta
15º = decimoquinto / decimoquinta
16º = decimosexto / decimosexta
17º = decimoséptimo / decimoséptima
18º = decimoctavo / decimoctava
19º = decimonoveno / decimonovena
20º = vigésimo / vigésima

🔹 REGLAS DE FORMACIÓN:
• Del 13 al 19: se forman con "decimo" + número ordinal
  • decimo + tercero = decimotercero
  • decimo + cuarto = decimocuarto

• "Primero" y "tercero" también se acortan:
  • decimotercer piso (decimotercer + piso)

📌 NOTA: En el habla cotidiana, para números altos (11º en adelante), es más común usar números cardinales:
• En lugar de "el undécimo capítulo" → "el capítulo once"
• En lugar de "el vigésimo piso" → "el piso veinte"`,
        descripcionChino: `序数词11到20：

11º = undécimo / undécima - 第十一
12º = duodécimo / duodécima - 第十二
13º = decimotercero / decimotercera - 第十三
14º = decimocuarto / decimocuarta - 第十四
15º = decimoquinto / decimoquinta - 第十五
16º = decimosexto / decimosexta - 第十六
17º = decimoséptimo / decimoséptima - 第十七
18º = decimoctavo / decimoctava - 第十八
19º = decimonoveno / decimonovena - 第十九
20º = vigésimo / vigésima - 第二十

🔹 构成规则：
• 13到19：由 "decimo" + 序数词构成
  • decimo + tercero = decimotercero
  • decimo + cuarto = decimocuarto

• "primero" 和 "tercero" 也会缩略：
  • decimotercer piso (decimotercer + piso)

📌 注意：在日常口语中，对于高数字（11º以上），更常用基数词：
• 不说 "el undécimo capítulo" → 说 "el capítulo once"
• 不说 "el vigésimo piso" → 说 "el piso veinte"`,
        ejemplos: [
          {
            espanol: "El capítulo undécimo es muy interesante.",
            chino: "第十一章很有趣。",
          },
          {
            espanol: "Vivo en el decimotercer piso.",
            chino: "我住在十三楼。",
          },
          {
            espanol: "Es el vigésimo aniversario de la empresa.",
            chino: "这是公司二十周年纪念。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Ordinales en fechas y posiciones",
        tituloChino: "日期和位置中的序数词",
        descripcion: `🔹 EN FECHAS (para el primer día del mes):
• 1 de enero = el primero de enero
• 1 de mayo = el primero de mayo
• 1 de diciembre = el primero de diciembre

📌 NOTA: Para los demás días del mes, se usan números cardinales:
• 2 de enero = el dos de enero
• 15 de abril = el quince de abril
• 31 de diciembre = el treinta y uno de diciembre

🔹 EN POSICIONES Y RANKINGS:
• Quedó en primer lugar en la carrera.
• Llegó en segundo puesto.
• Es la tercera vez que te lo digo.

🔹 EN DIRECCIONES:
• Vivo en la calle Primera.
• La Quinta Avenida es muy famosa.

🔹 EN REYES Y PAPAS:
• Felipe VI = Felipe sexto
• Juan Carlos I = Juan Carlos primero
• Benedicto XVI = Benedicto decimosexto
• Juan Pablo II = Juan Pablo segundo

🔹 EN SIGLOS:
• Siglo I = primer siglo
• Siglo XXI = siglo veintiuno (no "vigésimo primero")

📌 TRUCO PARA RECORDAR:
• Los ordinales se usan hasta el 10º.
• Del 11º en adelante, los cardinales son más comunes en la vida diaria.`,
        descripcionChino: `🔹 在日期中（用于每个月的第一天）：
• 1月1日 = el primero de enero
• 5月1日 = el primero de mayo
• 12月1日 = el primero de diciembre

📌 注意：对于每月的其他日子，使用基数词：
• 1月2日 = el dos de enero
• 4月15日 = el quince de abril
• 12月31日 = el treinta y uno de diciembre

🔹 在排名和名次中：
• Quedó en primer lugar en la carrera. = 他在比赛中得了第一名。
• Llegó en segundo puesto. = 他得了第二名。
• Es la tercera vez que te lo digo. = 这是我第三次告诉你了。

🔹 在地址中：
• Vivo en la calle Primera. = 我住在第一街。
• La Quinta Avenida es muy famosa. = 第五大道很有名。

🔹 在国王和教皇中：
• Felipe VI = 费利佩六世（sexto）
• Juan Carlos I = 胡安·卡洛斯一世（primero）
• Benedicto XVI = 本笃十六世（decimosexto）
• Juan Pablo II = 若望·保禄二世（segundo）

🔹 在世纪中：
• Siglo I = 第一世纪（primer siglo）
• Siglo XXI = 二十一世纪（siglo veintiuno，不是 "vigésimo primero"）

📌 记忆技巧：
• 序数词通常用到第10。
• 从第11开始，日常生活中更常用基数词。`,
        ejemplos: [
          {
            espanol: "El primero de mayo es el Día del Trabajo.",
            chino: "五月一日是劳动节。",
          },
          {
            espanol: "Vivo en el tercer piso.",
            chino: "我住在三楼。",
          },
          {
            espanol: "Felipe VI es el rey de España.",
            chino: "费利佩六世是西班牙国王。",
          },
          {
            espanol: "El siglo XXI empezó en el año 2001.",
            chino: "二十一世纪始于2001年。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "primero / primera",
        chino: "第一",
        ejemplo: "El primer día.",
      },
      {
        id: "v2",
        espanol: "segundo / segunda",
        chino: "第二",
        ejemplo: "La segunda vez.",
      },
      {
        id: "v3",
        espanol: "tercero / tercera",
        chino: "第三",
        ejemplo: "El tercer piso.",
      },
      {
        id: "v4",
        espanol: "cuarto / cuarta",
        chino: "第四",
        ejemplo: "La cuarta planta.",
      },
      {
        id: "v5",
        espanol: "quinto / quinta",
        chino: "第五",
        ejemplo: "El quinto aniversario.",
      },
      {
        id: "v6",
        espanol: "sexto / sexta",
        chino: "第六",
        ejemplo: "La sexta vez.",
      },
      {
        id: "v7",
        espanol: "séptimo / séptima",
        chino: "第七",
        ejemplo: "El séptimo día.",
      },
      {
        id: "v8",
        espanol: "octavo / octava",
        chino: "第八",
        ejemplo: "La octava maravilla.",
      },
      {
        id: "v9",
        espanol: "noveno / novena",
        chino: "第九",
        ejemplo: "El noveno mes.",
      },
      {
        id: "v10",
        espanol: "décimo / décima",
        chino: "第十",
        ejemplo: "La décima vez.",
      },
      {
        id: "v11",
        espanol: "undécimo / undécima",
        chino: "第十一",
        ejemplo: "El undécimo capítulo.",
      },
      {
        id: "v12",
        espanol: "duodécimo / duodécima",
        chino: "第十二",
        ejemplo: "El duodécimo mes.",
      },
      {
        id: "v13",
        espanol: "decimotercero / decimotercera",
        chino: "第十三",
        ejemplo: "La decimotercera edición.",
      },
      {
        id: "v14",
        espanol: "decimocuarto / decimocuarta",
        chino: "第十四",
        ejemplo: "El decimocuarto piso.",
      },
      {
        id: "v15",
        espanol: "vigésimo / vigésima",
        chino: "第二十",
        ejemplo: "El vigésimo aniversario.",
      },
      {
        id: "v16",
        espanol: "primer",
        chino: "第一(缩写)",
        ejemplo: "El primer lugar.",
      },
      {
        id: "v17",
        espanol: "tercer",
        chino: "第三(缩写)",
        ejemplo: "El tercer puesto.",
      },
      {
        id: "v18",
        espanol: "lugar",
        chino: "位置/名次",
        ejemplo: "Primer lugar.",
      },
      {
        id: "v19",
        espanol: "puesto",
        chino: "职位/名次",
        ejemplo: "Segundo puesto.",
      },
      {
        id: "v20",
        espanol: "posición",
        chino: "位置",
        ejemplo: "Tercera posición.",
      },
      {
        id: "v21",
        espanol: "aniversario",
        chino: "周年纪念",
        ejemplo: "Quinto aniversario.",
      },
      {
        id: "v22",
        espanol: "planta / piso",
        chino: "楼层",
        ejemplo: "Cuarta planta.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "En una carrera",
        tituloChino: "在一场比赛中",
        personajes: ["Periodista", "Atleta"],
        lineas: [
          {
            personaje: "Periodista",
            texto: "Felicidades. ¿En qué posición llegaste?",
            traduccion: "恭喜。你得了第几名？",
          },
          {
            personaje: "Atleta",
            texto: "Llegué en primer lugar. ¡Estoy muy feliz!",
            traduccion: "我得了第一名！我很开心！",
          },
          {
            personaje: "Periodista",
            texto: "¿Y tu compañero?",
            traduccion: "你的队友呢？",
          },
          {
            personaje: "Atleta",
            texto: "Mi compañero llegó en segundo lugar.",
            traduccion: "我的队友得了第二名。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "En un edificio",
        tituloChino: "在一栋楼里",
        personajes: ["Ana", "Portero"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Disculpe, ¿dónde vive el señor García?",
            traduccion: "打扰一下，加西亚先生住在哪里？",
          },
          {
            personaje: "Portero",
            texto: "Vive en el tercer piso, puerta 5.",
            traduccion: "他住在三楼，5号门。",
          },
          {
            personaje: "Ana",
            texto: "Gracias. ¿Y la oficina del administrador?",
            traduccion: "谢谢。管理员办公室在哪里？",
          },
          {
            personaje: "Portero",
            texto: "Está en el primer piso, al lado de la entrada.",
            traduccion: "在一楼，入口旁边。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Hablando de aniversarios",
        tituloChino: "谈论周年纪念",
        personajes: ["María", "Pedro"],
        lineas: [
          {
            personaje: "María",
            texto: "Pedro, ¿cuántos años lleváis casados?",
            traduccion: "佩德罗，你们结婚多少年了？",
          },
          {
            personaje: "Pedro",
            texto: "Este año es nuestro décimo aniversario.",
            traduccion: "今年是我们十周年纪念。",
          },
          {
            personaje: "María",
            texto: "¡Qué bien! ¿Vais a celebrarlo?",
            traduccion: "真好！你们要庆祝吗？",
          },
          {
            personaje: "Pedro",
            texto: "Sí, vamos a viajar. Será nuestra segunda luna de miel.",
            traduccion: "是的，我们要去旅行。这将是我们的第二次蜜月。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "En la escuela",
        tituloChino: "在学校",
        personajes: ["Profesor", "Estudiante"],
        lineas: [
          {
            personaje: "Profesor",
            texto: "¿Quién es el primero de la clase?",
            traduccion: "谁是班上的第一名？",
          },
          {
            personaje: "Estudiante",
            texto: "Laura es la primera, y Carlos es el segundo.",
            traduccion: "劳拉是第一，卡洛斯是第二。",
          },
          {
            personaje: "Profesor",
            texto: "¿Y el tercero?",
            traduccion: "第三名呢？",
          },
          {
            personaje: "Estudiante",
            texto: "El tercero es David. Yo soy el cuarto.",
            traduccion: "第三名是大卫。我是第四。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Fechas importantes",
        tituloChino: "重要日期",
        personajes: ["Sofía", "Javier"],
        lineas: [
          {
            personaje: "Sofía",
            texto: "Javier, ¿cuándo es tu cumpleaños?",
            traduccion: "哈维尔，你的生日是什么时候？",
          },
          {
            personaje: "Javier",
            texto: "Es el quince de abril. ¿Y el tuyo?",
            traduccion: "是四月十五日。你呢？",
          },
          {
            personaje: "Sofía",
            texto: "El primero de enero. ¡Soy más mayor que tú!",
            traduccion: "一月一日。我比你大！",
          },
          {
            personaje: "Javier",
            texto: "¿En serio? ¿Qué año naciste?",
            traduccion: "真的吗？你出生在哪一年？",
          },
          {
            personaje: "Sofía",
            texto: "Nací en el dos mil. ¿Y tú?",
            traduccion: "我出生在2000年。你呢？",
          },
          {
            personaje: "Javier",
            texto: "En el dos mil uno. ¡Eres un año mayor!",
            traduccion: "在2001年。你大一岁！",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "一周的第一天是：El _____ día es lunes.",
          preguntaChino: "一周的第一天是：El _____ día es lunes.",
          respuestaCorrecta: "primer",
          explicacion: "阳性单数名词前用'primer'。",
          pista: "首字母是 p，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c2",
          pregunta: "他住在三楼：Vive en el _____ piso.",
          preguntaChino: "他住在三楼：Vive en el _____ piso.",
          respuestaCorrecta: "tercer",
          explicacion: "阳性单数名词前'tercero'变为'tercer'。",
          pista: "首字母是 t，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c3",
          pregunta: "这是我的第一次：Esta es mi _____ vez.",
          preguntaChino: "这是我的第一次：Esta es mi _____ vez.",
          respuestaCorrecta: "primera",
          explicacion: "vez是阴性单数，用'primera'。",
          pista: "首字母是 p，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c4",
          pregunta: "她得了第二名：Ella llegó en _____ lugar.",
          preguntaChino: "她得了第二名：Ella llegó en _____ lugar.",
          respuestaCorrecta: "segundo",
          explicacion: "阳性单数名词用'segundo'。",
          pista: "首字母是 s，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c5",
          pregunta: "五周年纪念：El _____ aniversario.",
          preguntaChino: "五周年纪念：El _____ aniversario.",
          respuestaCorrecta: "quinto",
          explicacion: "阳性单数名词用'quinto'。",
          pista: "首字母是 q，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c6",
          pregunta: "第十一章：El capítulo _____.",
          preguntaChino: "第十一章：El capítulo _____.",
          respuestaCorrecta: "undécimo",
          explicacion: "Undécimo = 第十一",
          pista: "首字母是 u，8个字母",
          numeroLetras: 8,
        },
        {
          id: "c7",
          pregunta: "一月一日：El _____ de enero.",
          preguntaChino: "一月一日：El _____ de enero.",
          respuestaCorrecta: "primero",
          explicacion: "Para el primer día del mes se usa 'primero'",
          pista: "首字母是 p，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c8",
          pregunta: "第十五届：La _____ edición.",
          preguntaChino: "第十五届：La _____ edición.",
          respuestaCorrecta: "decimoquinta",
          explicacion: "Decimoquinta = 第十五（阴性）",
          pista: "首字母是 d，12个字母",
          numeroLetras: 12,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "如何说'第一层楼'？",
          preguntaChino: "如何说'第一层楼'？",
          opciones: ["primer piso", "primero piso", "primer suelo", "primera piso"],
          respuestaCorrecta: "primer piso",
          explicacion: "'Primero'在阳性名词前变为'primer'。",
        },
        {
          id: "s2",
          pregunta: "如何说'第三次'？",
          preguntaChino: "如何说'第三次'？",
          opciones: ["tercer vez", "tercera vez", "tercero vez", "terceras vez"],
          respuestaCorrecta: "tercera vez",
          explicacion: "'Vez'是阴性单数，用'tercera'。",
        },
        {
          id: "s3",
          pregunta: "哪个是'第四'的正确形式？",
          preguntaChino: "哪个是'第四'的正确形式？",
          opciones: ["cuarto", "cuarta", "cuartos", "cuartas"],
          respuestaCorrecta: "cuarto",
          explicacion: "阳性单数形式是'cuarto'。",
        },
        {
          id: "s4",
          pregunta: "如何说'第十次'？",
          preguntaChino: "如何说'第十次'？",
          opciones: ["décimo vez", "décimos vez", "décima vez", "décimas vez"],
          respuestaCorrecta: "décima vez",
          explicacion: "'Vez'是阴性单数，用'décima'。",
        },
        {
          id: "s5",
          pregunta: "哪个是'第二'的正确阴性形式？",
          preguntaChino: "哪个是'第二'的正确阴性形式？",
          opciones: ["segundo", "segunda", "segundos", "segundas"],
          respuestaCorrecta: "segunda",
          explicacion: "阴性单数形式是'segunda'。",
        },
        {
          id: "s6",
          pregunta: "如何说'一月一日'？",
          preguntaChino: "如何说'一月一日'？",
          opciones: ["uno de enero", "primero de enero", "primer de enero", "primera de enero"],
          respuestaCorrecta: "primero de enero",
          explicacion: "Para el primer día del mes se usa 'primero'",
        },
        {
          id: "s7",
          pregunta: "哪个是'第十一'的正确形式（阳性）？",
          preguntaChino: "哪个是'第十一'的正确形式（阳性）？",
          opciones: ["once", "onceavo", "undécimo", "décimo uno"],
          respuestaCorrecta: "undécimo",
          explicacion: "Undécimo = 第十一",
        },
        {
          id: "s8",
          pregunta: "如何说'费利佩六世'？",
          preguntaChino: "如何说'费利佩六世'？",
          opciones: ["Felipe seis", "Felipe sexto", "Felipe el seis", "Felipe VI"],
          respuestaCorrecta: "Felipe sexto",
          explicacion: "Los reyes se leen con ordinales: sexto",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Primero'在阳性名词前变为'primer'。",
          preguntaChino: "'Primero'在阳性名词前变为'primer'。",
          respuestaCorrecta: true,
          explicacion: "对。例如：primer día",
        },
        {
          id: "vf2",
          pregunta: "序数词放在名词后面。",
          preguntaChino: "序数词放在名词后面。",
          respuestaCorrecta: false,
          explicacion: "错。序数词放在名词前面。",
        },
        {
          id: "vf3",
          pregunta: "'Tercera'是'第三'的阴性形式。",
          preguntaChino: "'Tercera'是'第三'的阴性形式。",
          respuestaCorrecta: true,
          explicacion: "对。例如：tercera vez",
        },
        {
          id: "vf4",
          pregunta: "'Décimo'和'décima'都正确，取决于名词的性。",
          preguntaChino: "'Décimo'和'décima'都正确，取决于名词的性。",
          respuestaCorrecta: true,
          explicacion: "对。décimo用于阳性，décima用于阴性。",
        },
        {
          id: "vf5",
          pregunta: "序数词不需要和名词保持性数一致。",
          preguntaChino: "序数词不需要和名词保持性数一致。",
          respuestaCorrecta: false,
          explicacion: "错。序数词必须和名词保持性数一致。",
        },
        {
          id: "vf6",
          pregunta: "En español, se dice 'primer vez'.",
          preguntaChino: "在西班牙语中，说'primer vez'。",
          respuestaCorrecta: false,
          explicacion: "错。Debe ser 'primera vez' porque 'vez' es femenino.",
        },
        {
          id: "vf7",
          pregunta: "Para decir 'en la posición 15' se puede decir 'en la decimoquinta posición'.",
          preguntaChino: "为了说'在第15位'，可以说'en la decimoquinta posición'。",
          respuestaCorrecta: true,
          explicacion: "对。Es correcto aunque menos común.",
        },
        {
          id: "vf8",
          pregunta: "El siglo XXI se lee 'el siglo vigésimo primero'.",
          preguntaChino: "二十一世纪读作'el siglo vigésimo primero'。",
          respuestaCorrecta: false,
          explicacion: "错。Se dice 'el siglo veintiuno'.",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "primero",
              derecha: "第一",
            },
            {
              izquierda: "segundo",
              derecha: "第二",
            },
            {
              izquierda: "tercero",
              derecha: "第三",
            },
            {
              izquierda: "cuarto",
              derecha: "第四",
            },
            {
              izquierda: "quinto",
              derecha: "第五",
            },
            {
              izquierda: "sexto",
              derecha: "第六",
            },
            {
              izquierda: "séptimo",
              derecha: "第七",
            },
            {
              izquierda: "octavo",
              derecha: "第八",
            },
            {
              izquierda: "noveno",
              derecha: "第九",
            },
            {
              izquierda: "décimo",
              derecha: "第十",
            },
            {
              izquierda: "undécimo",
              derecha: "第十一",
            },
            {
              izquierda: "duodécimo",
              derecha: "第十二",
            },
            {
              izquierda: "vigésimo",
              derecha: "第二十",
            },
          ],
          explicacion: "将序数词与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["primer", "El", "es", "lunes", "día", "."],
          respuestaCorrecta: "El primer día es lunes.",
          explicacion: "正确的句子是：El primer día es lunes.（第一天是星期一。）",
        },
        {
          id: "o2",
          palabras: ["piso", "Vive", "tercer", "el", "en", "."],
          respuestaCorrecta: "Vive en el tercer piso.",
          explicacion: "正确的句子是：Vive en el tercer piso.（他住在三楼。）",
        },
        {
          id: "o3",
          palabras: ["vez", "primera", "Es", "mi", "esta", "."],
          respuestaCorrecta: "Esta es mi primera vez.",
          explicacion: "正确的句子是：Esta es mi primera vez.（这是我的第一次。）",
        },
        {
          id: "o4",
          palabras: ["segundo", "llegó", "lugar", "Ella", "en", "."],
          respuestaCorrecta: "Ella llegó en segundo lugar.",
          explicacion: "正确的句子是：Ella llegó en segundo lugar.（她得了第二名。）",
        },
        {
          id: "o5",
          palabras: ["el", "es", "aniversario", "décimo", "Hoy", "."],
          respuestaCorrecta: "Hoy es el décimo aniversario.",
          explicacion: "正确的句子是：Hoy es el décimo aniversario.（今天是十周年纪念。）",
        },
        {
          id: "o6",
          palabras: ["de", "primero", "El", "enero", "es", "año", "del", "día", "."],
          respuestaCorrecta: "El primero de enero es el primer día del año.",
          explicacion: "正确的句子是：El primero de enero es el primer día del año.",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "这是第一次。",
          respuestaEsperada: "Esta es la primera vez.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "我住在二楼。",
          respuestaEsperada: "Vivo en el segundo piso.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "他得了第三名。",
          respuestaEsperada: "Él llegó en tercer lugar.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "我们五周年了。",
          respuestaEsperada: "Es nuestro quinto aniversario.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "这是我第二次来西班牙。",
          respuestaEsperada: "Esta es mi segunda vez en España.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "今天是十二月一日。",
          respuestaEsperada: "Hoy es el primero de diciembre.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "她在比赛中得了第四名。",
          respuestaEsperada: "Ella quedó en cuarto lugar en la carrera.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "这是我们公司的十周年纪念。",
          respuestaEsperada: "Este es el décimo aniversario de nuestra empresa.",
          explicacion: "西班牙语翻译",
        },
      ],
    },
    ejerciciosPracticos: [
      {
        id: "ep1",
        tipo: "completarDialogo",
        titulo: "完成对话",
        tituloChino: "完成对话",
        instruccion: "用正确的序数词完成对话。",
        instruccionChino: "用正确的序数词完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿En qué posición llegaste en la carrera?",
            respuesta: "",
          },
          {
            personaje: "B",
            texto: "Llegué en _____ lugar.",
            respuesta: "primer / segundo / tercero",
          },
          {
            personaje: "A",
            texto: "¿Y tu amigo?",
            respuesta: "",
          },
          {
            personaje: "B",
            texto: "Mi amigo llegó en _____ lugar.",
            respuesta: "segundo / cuarto / quinto",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "escribir",
        titulo: "Escribe los ordinales",
        tituloChino: "写出序数词",
        instruccion: "Escribe los siguientes números ordinales en español.",
        instruccionChino: "用西班牙语写出以下序数词。",
        numeros: [
          {
            chino: "第一",
            espanol: "primero / primera",
          },
          {
            chino: "第二",
            espanol: "segundo / segunda",
          },
          {
            chino: "第三",
            espanol: "tercero / tercera",
          },
          {
            chino: "第四",
            espanol: "cuarto / cuarta",
          },
          {
            chino: "第五",
            espanol: "quinto / quinta",
          },
          {
            chino: "第六",
            espanol: "sexto / sexta",
          },
          {
            chino: "第七",
            espanol: "séptimo / séptima",
          },
          {
            chino: "第八",
            espanol: "octavo / octava",
          },
          {
            chino: "第九",
            espanol: "noveno / novena",
          },
          {
            chino: "第十",
            espanol: "décimo / décima",
          },
          {
            chino: "第十一",
            espanol: "undécimo / undécima",
          },
          {
            chino: "第十二",
            espanol: "duodécimo / duodécima",
          },
          {
            chino: "第二十",
            espanol: "vigésimo / vigésima",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "responder",
        titulo: "Responde las preguntas",
        tituloChino: "回答问题",
        instruccion: "Responde las siguientes preguntas usando números ordinales.",
        instruccionChino: "使用序数词回答以下问题。",
        preguntas: [
          {
            pregunta: "¿En qué piso vives?",
            respuestaEsperada: "Vivo en el [número] piso.",
          },
          {
            pregunta: "¿Qué lugar ocupas en tu clase?",
            respuestaEsperada: "Ocupo el [número] lugar.",
          },
          {
            pregunta: "¿Cuál es tu primer recuerdo de niño?",
            respuestaEsperada: "Mi primer recuerdo es...",
          },
        ],
      },
      {
        id: "ep4",
        tipo: "completarTabla",
        titulo: "Completa la tabla de ordinales",
        tituloChino: "完成序数词表格",
        instruccion: "Completa la tabla con la forma correcta del ordinal.",
        instruccionChino: "用正确的序数词形式完成表格。",
        tabla: [
          {
            numero: 1,
            masculino: "primer",
            femenino: "primera",
          },
          {
            numero: 2,
            masculino: "segundo",
            femenino: "segunda",
          },
          {
            numero: 3,
            masculino: "tercer",
            femenino: "tercera",
          },
          {
            numero: 4,
            masculino: "cuarto",
            femenino: "cuarta",
          },
          {
            numero: 5,
            masculino: "quinto",
            femenino: "quinta",
          },
          {
            numero: 10,
            masculino: "décimo",
            femenino: "décima",
          },
        ],
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿En qué piso vives? Responde en español.",
        preguntaChino: "你住在几楼？用西班牙语回答。",
        sugerencia: "Vivo en el _____ piso.",
        sugerenciaChino: "Vivo en el _____ piso.",
      },
      {
        id: "pa2",
        pregunta: "¿Cuál es tu primer recuerdo de niño?",
        preguntaChino: "你小时候的第一个记忆是什么？",
        sugerencia: "Mi primer recuerdo es...",
        sugerenciaChino: "Mi primer recuerdo es...",
      },
      {
        id: "pa3",
        pregunta: "Escribe los números ordinales del 1 al 10 en orden.",
        preguntaChino: "按顺序写出1到10的序数词。",
        sugerencia: "primero, segundo, tercero, cuarto, quinto, sexto, séptimo, octavo, noveno, décimo",
        sugerenciaChino: "primero, segundo, tercero, cuarto, quinto, sexto, séptimo, octavo, noveno, décimo",
      },
      {
        id: "pa4",
        pregunta: "¿Cómo se dice 'el día 1 de enero' en español?",
        preguntaChino: "西班牙语中'一月一日'怎么说？",
        sugerencia: "El primero de enero.",
        sugerenciaChino: "El primero de enero.",
      },
      {
        id: "pa5",
        pregunta: "¿Cuál es la diferencia entre 'primer' y 'primero'?",
        preguntaChino: "'primer' 和 'primero' 有什么区别？",
        sugerencia:
          "Primer se usa antes de un sustantivo masculino. Primero se usa solo o antes de sustantivo femenino.",
        sugerenciaChino: "Primer 用于阳性名词前面。Primero 单独使用或用于阴性名词前面。",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '第一' en español?",
        preguntaChino: "西班牙语中'第一'怎么说？",
        respuestaSugerida: "primero / primera",
        respuestaSugeridaChino: "primero / primera",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '第三层楼' en español?",
        preguntaChino: "西班牙语中'第三层楼'怎么说？",
        respuestaSugerida: "tercer piso",
        respuestaSugeridaChino: "tercer piso",
      },
      {
        id: "p3",
        pregunta: "¿Cuál es la diferencia entre 'primero' y 'primer'?",
        preguntaChino: "'primero'和'primer'有什么区别？",
        respuestaSugerida: "Primer se usa antes de un sustantivo masculino.",
        respuestaSugeridaChino: "Primer用于阳性名词前面。",
      },
      {
        id: "p4",
        pregunta: "¿Cómo se dice '第十次' en español?",
        preguntaChino: "西班牙语中'第十次'怎么说？",
        respuestaSugerida: "décima vez",
        respuestaSugeridaChino: "décima vez",
      },
      {
        id: "p5",
        pregunta: "¿Cómo se dice '一月一日' en español?",
        preguntaChino: "西班牙语中'一月一日'怎么说？",
        respuestaSugerida: "el primero de enero",
        respuestaSugeridaChino: "el primero de enero",
      },
      {
        id: "p6",
        pregunta: "¿Qué número ordinal es 'undécimo'?",
        preguntaChino: "'undécimo' 是第几？",
        respuestaSugerida: "Undécimo = 第十一",
        respuestaSugeridaChino: "Undécimo = 11th",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Colores básicos",
        tituloChino: "基本颜色",
        descripcion: `Los colores principales en español:

🔹 COLORES BÁSICOS:
• rojo (red)
• azul (blue)
• verde (green)
• amarillo (yellow)
• negro (black)
• blanco (white)
• naranja / anaranjado (orange)
• rosa / rosado (pink)
• morado / violeta (purple)
• marrón / café / pardo (brown)
• gris (gray)
• celeste (light blue / sky blue)

🔹 COLORES ADICIONALES:
• beige (beige)
• dorado (gold)
• plateado (silver)
• turquesa (turquoise)
• fucsia (fuchsia)
• lila (lilac)
• granate (maroon)
• burdeos (burgundy)
• caqui (khaki)
• mostaza (mustard yellow)

🔹 COLORES CLAROS Y OSCUROS:
• claro = light (azul claro = light blue)
• oscuro = dark (azul oscuro = dark blue)
• fuerte = strong/intense (rojo fuerte = intense red)
• pastel = pastel (rosa pastel = pastel pink)

📌 EJEMPLOS:
• Prefiero el azul claro para las paredes.
• Me gusta el verde oscuro para la ropa de invierno.
• El rojo fuerte es muy llamativo.`,
        descripcionChino: `西班牙语中的基本颜色：

🔹 基本颜色：
• rojo = 红色
• azul = 蓝色
• verde = 绿色
• amarillo = 黄色
• negro = 黑色
• blanco = 白色
• naranja / anaranjado = 橙色
• rosa / rosado = 粉色
• morado / violeta = 紫色
• marrón / café / pardo = 棕色
• gris = 灰色
• celeste = 天蓝色

🔹 额外颜色：
• beige = 米色
• dorado = 金色
• plateado = 银色
• turquesa = 蓝绿色/绿松石色
• fucsia = 紫红色
• lila = 淡紫色
• granate = 深红色
• burdeos = 酒红色
• caqui = 卡其色
• mostaza = 芥末黄

🔹 浅色和深色：
• claro = 浅色的（azul claro = 浅蓝色）
• oscuro = 深色的（azul oscuro = 深蓝色）
• fuerte = 强烈的/浓烈的（rojo fuerte = 浓烈的红色）
• pastel = 淡雅的（rosa pastel = 淡粉色）

📌 例子：
• Prefiero el azul claro para las paredes. = 墙壁我更喜欢浅蓝色。
• Me gusta el verde oscuro para la ropa de invierno. = 我喜欢冬天穿深绿色衣服。
• El rojo fuerte es muy llamativo. = 浓烈的红色很引人注目。`,
        ejemplos: [
          {
            espanol: "Una camisa roja.",
            chino: "一件红衬衫。",
          },
          {
            espanol: "El cielo es azul.",
            chino: "天空是蓝色的。",
          },
          {
            espanol: "La hierba es verde.",
            chino: "草是绿色的。",
          },
          {
            espanol: "Me gusta el color marrón.",
            chino: "我喜欢棕色。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Concordancia de género y número",
        tituloChino: "性数一致规则",
        descripcion: `En español, los colores deben concordar en género y número con el sustantivo:

🔹 COLORES QUE CAMBIAN (terminan en -o):
• rojo → roja
• blanco → blanca
• negro → negra
• amarillo → amarilla
• morado → morada
• rosa → rosa (no cambia, pero cuidado: la camisa rosa)
• violeta → violeta (no cambia)

🔹 COLORES QUE NO CAMBIAN:
• azul, verde, gris, marrón, naranja, rosa, violeta, celeste, beige

🔹 PLURAL DE COLORES:
• rojos / rojas (masculino/femenino plural)
• azules (invariable)
• verdes (invariable)

📌 TABLA DE EJEMPLOS:

| Sustantivo | Color | Frase correcta |
|------------|-------|----------------|
| coche (m) | rojo | un coche rojo |
| casa (f) | roja | una casa roja |
| coches (m pl) | rojos | coches rojos |
| casas (f pl) | rojas | casas rojas |
| coche (m) | azul | un coche azul |
| casa (f) | azul | una casa azul |
| coches (m pl) | azules | coches azules |

❌ ERROR COMÚN:
• No digas "la camisa blanco" → Di "la camisa blanca"
• No digas "los zapatos azul" → Di "los zapatos azules"`,
        descripcionChino: `西班牙语中，颜色需要与名词保持性数一致：

🔹 会变化的颜色（以-o结尾）：
• rojo → roja (红色)
• blanco → blanca (白色)
• negro → negra (黑色)
• amarillo → amarilla (黄色)
• morado → morada (紫色)
• rosa → rosa (不变，但注意：la camisa rosa)
• violeta → violeta (不变)

🔹 不变化的颜色：
• azul, verde, gris, marrón, naranja, rosa, violeta, celeste, beige

🔹 颜色的复数形式：
• rojos / rojas (阳性/阴性复数)
• azules (不变)
• verdes (不变)

📌 例子表格：

| 名词 | 颜色 | 正确句子 |
|------|------|----------|
| coche (阳) | rojo | un coche rojo |
| casa (阴) | roja | una casa roja |
| coches (阳复) | rojos | coches rojos |
| casas (阴复) | rojas | casas rojas |
| coche (阳) | azul | un coche azul |
| casa (阴) | azul | una casa azul |
| coches (阳复) | azules | coches azules |

❌ 常见错误：
• 不要说 "la camisa blanco" → 说 "la camisa blanca"
• 不要说 "los zapatos azul" → 说 "los zapatos azules"`,
        ejemplos: [
          {
            espanol: "Un coche rojo. Una casa roja.",
            chino: "一辆红色的车。一座红色的房子。",
          },
          {
            espanol: "Un libro azul. Una mochila azul.",
            chino: "一本蓝色的书。一个蓝色的书包。",
          },
          {
            espanol: "Unos zapatos negros. Unas flores negras.",
            chino: "一些黑色的鞋子。一些黑色的花。",
          },
          {
            espanol: "Las paredes blancas son elegantes.",
            chino: "白色的墙壁很优雅。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Preguntar por el color",
        tituloChino: "询问颜色",
        descripcion: `Para preguntar el color de algo:

🔹 PREGUNTAS:
• ¿De qué color es? (singular)
• ¿De qué color son? (plural)
• ¿Qué color tiene? (¿Qué color tiene tu coche?)
• ¿Cuál es tu color favorito? (¿Cuál es tu color favorito?)

🔹 RESPUESTAS:
• Es + color
• Son + color
• Mi color favorito es el + color

📌 EJEMPLOS:
• —¿De qué color es tu mochila? —Es azul.
• —¿De qué color son las manzanas? —Son rojas.
• —¿Cuál es tu color favorito? —Mi color favorito es el verde.

🔹 DESCRIBIR OBJETOS POR SU COLOR:
• Tengo un coche de color negro.
• La camisa de color blanco me queda bien.
• Busco un vestido de color rosa claro.`,
        descripcionChino: `询问某物的颜色：

🔹 问题：
• ¿De qué color es? = 它是什么颜色的？（单数）
• ¿De qué color son? = 它们是什么颜色的？（复数）
• ¿Qué color tiene? = 它是什么颜色的？（你的车是什么颜色的？）
• ¿Cuál es tu color favorito? = 你最喜欢的颜色是什么？

🔹 回答：
• Es + 颜色 = 它是...颜色
• Son + 颜色 = 它们是...颜色
• Mi color favorito es el + 颜色 = 我最喜欢的颜色是...

📌 例子：
• —¿De qué color es tu mochila? —Es azul. = 你的书包是什么颜色的？—是蓝色的。
• —¿De qué color son las manzanas? —Son rojas. = 苹果是什么颜色的？—是红色的。
• —¿Cuál es tu color favorito? —Mi color favorito es el verde. = 你最喜欢的颜色是什么？—我最喜欢的颜色是绿色。

🔹 用颜色描述物体：
• Tengo un coche de color negro. = 我有一辆黑色的车。
• La camisa de color blanco me queda bien. = 白色的衬衫很适合我。
• Busco un vestido de color rosa claro. = 我在找一件浅粉色的连衣裙。`,
        ejemplos: [
          {
            espanol: "¿De qué color es tu coche?",
            chino: "你的车是什么颜色的？",
          },
          {
            espanol: "Mi color favorito es el azul.",
            chino: "我最喜欢的颜色是蓝色。",
          },
          {
            espanol: "Las flores son amarillas.",
            chino: "花是黄色的。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Expresiones idiomáticas con colores",
        tituloChino: "关于颜色的习语表达",
        descripcion: `🔹 EXPRESIONES COMUNES CON COLORES:

• Ponerse rojo / roja = to blush (ponerse rojo de vergüenza)
• Ver todo de color rosa = to see everything through rose-colored glasses
• Tener la sangre azul = to have blue blood (to be noble)
• Ponerse verde de envidia = to be green with envy
• Estar verde = to be inexperienced / not ripe
• Dar luz verde = to give the green light (to approve)
• Ser un blanco fácil = to be an easy target
• En blanco y negro = in black and white
• Negro sobre blanco = in writing (clearly stated)
• Pasar la noche en blanco = to have a sleepless night
• Estar sin blanca = to be broke (without money)

📌 EJEMPLOS:
• Se puso rojo cuando le hicieron el cumplido.
• No todo es de color rosa en la vida.
• Estoy verde en este tema. Necesito aprender más.
• El jefe dio luz verde al proyecto.
• Anoche pasé la noche en blanco.`,
        descripcionChino: `🔹 关于颜色的常见习语：

• Ponerse rojo / roja = 脸红（因害羞而变红）
• Ver todo de color rosa = 戴玫瑰色眼镜看事物（乐观地看待一切）
• Tener la sangre azul = 有蓝色血液（贵族血统）
• Ponerse verde de envidia = 嫉妒得发绿
• Estar verde = 不熟练/不成熟
• Dar luz verde = 开绿灯（批准）
• Ser un blanco fácil = 是容易的目标
• En blanco y negro = 黑白相间
• Negro sobre blanco = 白纸黑字（清晰明确地）
• Pasar la noche en blanco = 度过一个不眠之夜
• Estar sin blanca = 身无分文

📌 例子：
• Se puso rojo cuando le hicieron el cumplido. = 当别人夸他时，他脸红了。
• No todo es de color rosa en la vida. = 生活中并非一切都是美好的。
• Estoy verde en este tema. Necesito aprender más. = 我对这个话题不熟练。我需要多学点。
• El jefe dio luz verde al proyecto. = 老板给项目开了绿灯。
• Anoche pasé la noche en blanco. = 昨晚我失眠了。`,
        ejemplos: [
          {
            espanol: "Me puse roja de vergüenza.",
            chino: "我羞红了脸。",
          },
          {
            espanol: "Tiene la sangre azul porque es de familia real.",
            chino: "他有贵族血统，因为他来自王室。",
          },
          {
            espanol: "El jefe dio luz verde al proyecto.",
            chino: "老板给项目开了绿灯。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "rojo / roja",
        chino: "红色",
        ejemplo: "Una manzana roja.",
      },
      {
        id: "v2",
        espanol: "azul",
        chino: "蓝色",
        ejemplo: "El mar es azul.",
      },
      {
        id: "v3",
        espanol: "verde",
        chino: "绿色",
        ejemplo: "Las plantas son verdes.",
      },
      {
        id: "v4",
        espanol: "amarillo / amarilla",
        chino: "黄色",
        ejemplo: "El sol es amarillo.",
      },
      {
        id: "v5",
        espanol: "negro / negra",
        chino: "黑色",
        ejemplo: "Un gato negro.",
      },
      {
        id: "v6",
        espanol: "blanco / blanca",
        chino: "白色",
        ejemplo: "La nieve es blanca.",
      },
      {
        id: "v7",
        espanol: "naranja / anaranjado",
        chino: "橙色",
        ejemplo: "Una naranja naranja.",
      },
      {
        id: "v8",
        espanol: "rosa / rosado",
        chino: "粉色",
        ejemplo: "Una flor rosa.",
      },
      {
        id: "v9",
        espanol: "morado / morada",
        chino: "紫色",
        ejemplo: "Una uva morada.",
      },
      {
        id: "v10",
        espanol: "violeta",
        chino: "紫色(不变)",
        ejemplo: "Una flor violeta.",
      },
      {
        id: "v11",
        espanol: "marrón / café",
        chino: "棕色",
        ejemplo: "Un perro marrón.",
      },
      {
        id: "v12",
        espanol: "gris",
        chino: "灰色",
        ejemplo: "Un día gris.",
      },
      {
        id: "v13",
        espanol: "celeste",
        chino: "天蓝色",
        ejemplo: "El cielo está celeste.",
      },
      {
        id: "v14",
        espanol: "claro",
        chino: "浅色的",
        ejemplo: "Azul claro.",
      },
      {
        id: "v15",
        espanol: "oscuro",
        chino: "深色的",
        ejemplo: "Verde oscuro.",
      },
      {
        id: "v16",
        espanol: "color",
        chino: "颜色",
        ejemplo: "¿De qué color es?",
      },
      {
        id: "v17",
        espanol: "¿De qué color?",
        chino: "什么颜色？",
        ejemplo: "¿De qué color es tu coche?",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "En una tienda de ropa",
        tituloChino: "在服装店",
        personajes: ["Cliente", "Dependiente"],
        lineas: [
          {
            personaje: "Cliente",
            texto: "Buenos días. ¿Tiene esta camisa en azul?",
            traduccion: "早上好。这件衬衫有蓝色的吗？",
          },
          {
            personaje: "Dependiente",
            texto: "Sí, tenemos en azul y en negro.",
            traduccion: "是的，我们有蓝色和黑色的。",
          },
          {
            personaje: "Cliente",
            texto: "¿De qué color es esta?",
            traduccion: "这件是什么颜色？",
          },
          {
            personaje: "Dependiente",
            texto: "Esta es roja. También tenemos verde.",
            traduccion: "这件是红色的。我们也有绿色的。",
          },
          {
            personaje: "Cliente",
            texto: "Prefiero la azul. ¿Puedo verla?",
            traduccion: "我喜欢蓝色的。可以看看吗？",
          },
          {
            personaje: "Dependiente",
            texto: "Claro. Aquí tiene.",
            traduccion: "当然。给您。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Describiendo objetos",
        tituloChino: "描述物品",
        personajes: ["María", "Pedro"],
        lineas: [
          {
            personaje: "María",
            texto: "Pedro, ¿de qué color es tu coche?",
            traduccion: "佩德罗，你的车是什么颜色的？",
          },
          {
            personaje: "Pedro",
            texto: "Mi coche es rojo. Es un color muy llamativo.",
            traduccion: "我的车是红色的。这是一个很醒目的颜色。",
          },
          {
            personaje: "María",
            texto: "¿Y tu casa?",
            traduccion: "你的房子呢？",
          },
          {
            personaje: "Pedro",
            texto: "Mi casa es blanca con las puertas verdes.",
            traduccion: "我的房子是白色的，门是绿色的。",
          },
          {
            personaje: "María",
            texto: "¡Qué bonita combinación!",
            traduccion: "多漂亮的组合啊！",
          },
        ],
      },
      {
        id: "d3",
        titulo: "En clase de arte",
        tituloChino: "在美术课上",
        personajes: ["Profesor", "Estudiante"],
        lineas: [
          {
            personaje: "Profesor",
            texto: "Hoy vamos a pintar. ¿De qué color es el cielo?",
            traduccion: "今天我们要画画。天空是什么颜色的？",
          },
          {
            personaje: "Estudiante",
            texto: "El cielo es azul, pero a veces es gris.",
            traduccion: "天空是蓝色的，但有时是灰色的。",
          },
          {
            personaje: "Profesor",
            texto: "Muy bien. ¿Y la hierba?",
            traduccion: "很好。草地呢？",
          },
          {
            personaje: "Estudiante",
            texto: "La hierba es verde.",
            traduccion: "草地是绿色的。",
          },
          {
            personaje: "Profesor",
            texto: "Perfecto. ¿Y las flores?",
            traduccion: "完美。花呢？",
          },
          {
            personaje: "Estudiante",
            texto: "Las flores pueden ser rojas, amarillas, rosas, moradas...",
            traduccion: "花可以是红色、黄色、粉色、紫色...",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Decorando una habitación",
        tituloChino: "装饰房间",
        personajes: ["Laura", "Sofía"],
        lineas: [
          {
            personaje: "Laura",
            texto: "Sofía, ¿de qué color quieres pintar tu habitación?",
            traduccion: "索菲亚，你想把你的房间漆成什么颜色？",
          },
          {
            personaje: "Sofía",
            texto: "Quiero las paredes de color rosa claro.",
            traduccion: "我想要浅粉色的墙壁。",
          },
          {
            personaje: "Laura",
            texto: "¿Y los muebles?",
            traduccion: "家具呢？",
          },
          {
            personaje: "Sofía",
            texto: "Los muebles blancos combinan muy bien con el rosa.",
            traduccion: "白色家具和粉色搭配得很好。",
          },
          {
            personaje: "Laura",
            texto: "¿Y las cortinas?",
            traduccion: "窗帘呢？",
          },
          {
            personaje: "Sofía",
            texto: "Cortinas grises o beige.",
            traduccion: "灰色或米色的窗帘。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Comprando pintura",
        tituloChino: "买油漆",
        personajes: ["Cliente", "Vendedor"],
        lineas: [
          {
            personaje: "Cliente",
            texto: "Buenas tardes. Necesito pintura para mi salón.",
            traduccion: "下午好。我需要客厅的油漆。",
          },
          {
            personaje: "Vendedor",
            texto: "¿De qué color lo quieres?",
            traduccion: "你想要什么颜色？",
          },
          {
            personaje: "Cliente",
            texto: "Quiero un color beige o crema. Algo cálido.",
            traduccion: "我想要米色或奶油色。温暖一点的颜色。",
          },
          {
            personaje: "Vendedor",
            texto: "Tenemos este tono 'arena' que es muy popular.",
            traduccion: "我们有这个'沙色'色调，很受欢迎。",
          },
          {
            personaje: "Cliente",
            texto: "¿Puedo verlo en la pared?",
            traduccion: "我可以在墙上看看吗？",
          },
          {
            personaje: "Vendedor",
            texto: "Claro, tenemos muestras.",
            traduccion: "当然，我们有样品。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "血的颜色是：_____",
          preguntaChino: "血的颜色是：_____",
          respuestaCorrecta: "rojo",
          explicacion: "血是红色的。",
          pista: "首字母是 r，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c2",
          pregunta: "天空通常是_____色。",
          preguntaChino: "天空通常是_____色。",
          respuestaCorrecta: "azul",
          explicacion: "天空是蓝色的。",
          pista: "首字母是 a，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c3",
          pregunta: "雪是_____色的。",
          preguntaChino: "雪是_____色的。",
          respuestaCorrecta: "blanca",
          explicacion: "雪是白色的。（注意阴性形式）",
          pista: "首字母是 b，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c4",
          pregunta: "成熟的苹果是_____色的。",
          preguntaChino: "成熟的苹果是_____色的。",
          respuestaCorrecta: "roja",
          explicacion: "成熟的苹果是红色的。（阴性）",
          pista: "首字母是 r，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c5",
          pregunta: "为了问颜色，我们说：¿De _____ color es?",
          preguntaChino: "为了问颜色，我们说：¿De _____ color es?",
          respuestaCorrecta: "qué",
          explicacion: "'¿De qué color es?' = 它是什么颜色的？",
          pista: "首字母是 q，3个字母",
          numeroLetras: 3,
        },
        {
          id: "c6",
          pregunta: "浅蓝色是：azul _____",
          preguntaChino: "浅蓝色是：azul _____",
          respuestaCorrecta: "claro",
          explicacion: "Claro = 浅的",
          pista: "首字母是 c，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c7",
          pregunta: "深绿色是：verde _____",
          preguntaChino: "深绿色是：verde _____",
          respuestaCorrecta: "oscuro",
          explicacion: "Oscuro = 深的",
          pista: "首字母是 o，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c8",
          pregunta: "我最喜欢的颜色是绿色：Mi color favorito es el _____",
          preguntaChino: "我最喜欢的颜色是绿色：Mi color favorito es el _____",
          respuestaCorrecta: "verde",
          explicacion: "Verde = 绿色",
          pista: "首字母是 v，5个字母",
          numeroLetras: 5,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "植物是什么颜色的？",
          preguntaChino: "植物是什么颜色的？",
          opciones: ["rojo", "azul", "verde", "amarillo"],
          respuestaCorrecta: "verde",
          explicacion: "植物是绿色的。",
        },
        {
          id: "s2",
          pregunta: "西班牙语中'粉色'怎么说？",
          preguntaChino: "西班牙语中'粉色'怎么说？",
          opciones: ["morado", "rosa", "rojo", "naranja"],
          respuestaCorrecta: "rosa",
          explicacion: "'Rosa' = 粉色。",
        },
        {
          id: "s3",
          pregunta: "哪个颜色在阴性形式中不变化？",
          preguntaChino: "哪个颜色在阴性形式中不变化？",
          opciones: ["rojo", "blanco", "azul", "negro"],
          respuestaCorrecta: "azul",
          explicacion: "'Azul'不变化，没有阴性形式。",
        },
        {
          id: "s4",
          pregunta: "雪是什么颜色的？",
          preguntaChino: "雪是什么颜色的？",
          opciones: ["negra", "blanca", "roja", "verde"],
          respuestaCorrecta: "blanca",
          explicacion: "雪是白色的。",
        },
        {
          id: "s5",
          pregunta: "哪个是正确的：'Una casa _____'？",
          preguntaChino: "哪个是正确的：'Una casa _____'？",
          opciones: ["blanco", "blanca", "blancos", "blancas"],
          respuestaCorrecta: "blanca",
          explicacion: "'Casa'是阴性单数，所以用'blanca'。",
        },
        {
          id: "s6",
          pregunta: "如何说'浅绿色'？",
          preguntaChino: "如何说'浅绿色'？",
          opciones: ["verde claro", "verde oscuro", "verde fuerte", "verde pastel"],
          respuestaCorrecta: "verde claro",
          explicacion: "Claro = 浅的",
        },
        {
          id: "s7",
          pregunta: "'Me puse rojo de vergüenza'是什么意思？",
          preguntaChino: "'Me puse rojo de vergüenza'是什么意思？",
          opciones: ["我变红了", "我羞红了脸", "我生气了", "我很开心"],
          respuestaCorrecta: "我羞红了脸",
          explicacion: "Expresión idiomática",
        },
        {
          id: "s8",
          pregunta: "哪个是正确的复数形式？",
          preguntaChino: "哪个是正确的复数形式？",
          opciones: ["flores rojas", "flores rojo", "flores rojos", "flor rojas"],
          respuestaCorrecta: "flores rojas",
          explicacion: "Flores es femenino plural → rojas",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Rojo'和'roja'是同一种颜色的不同形式。",
          preguntaChino: "'Rojo'和'roja'是同一种颜色的不同形式。",
          respuestaCorrecta: true,
          explicacion: "对。'Rojo'是阳性，'roja'是阴性。",
        },
        {
          id: "vf2",
          pregunta: "所有颜色都根据性别变化形式。",
          preguntaChino: "所有颜色都根据性别变化形式。",
          respuestaCorrecta: false,
          explicacion: "错。有些如'azul'和'verde'不变化。",
        },
        {
          id: "vf3",
          pregunta: "'Marrón'意思是棕色。",
          preguntaChino: "'Marrón'意思是棕色。",
          respuestaCorrecta: true,
          explicacion: "对。'marrón' = 棕色。",
        },
        {
          id: "vf4",
          pregunta: "我们说'Un coche azula'。",
          preguntaChino: "我们说'Un coche azula'。",
          respuestaCorrecta: false,
          explicacion: "错。'azul'不变化，所以是'Un coche azul'。",
        },
        {
          id: "vf5",
          pregunta: "'Las flores rosas'是正确的形式。",
          preguntaChino: "'Las flores rosas'是正确的形式。",
          respuestaCorrecta: true,
          explicacion: "对。'flores'是阴性复数，'rosas'也是阴性复数。",
        },
        {
          id: "vf6",
          pregunta: "El color 'celeste' no cambia de género.",
          preguntaChino: "颜色'celeste'不变化性别。",
          respuestaCorrecta: true,
          explicacion: "对。Celeste es invariable.",
        },
        {
          id: "vf7",
          pregunta: "Se dice 'un coche naranja' pero 'una casa anaranjada'.",
          preguntaChino: "说'un coche naranja'但'una casa anaranjada'。",
          respuestaCorrecta: true,
          explicacion: "对。Naranja es invariable, anaranjado cambia.",
        },
        {
          id: "vf8",
          pregunta: "'Estar verde' significa ser muy experimentado.",
          preguntaChino: "'Estar verde'意思是很有经验。",
          respuestaCorrecta: false,
          explicacion: "错。Significa ser inexperto o no estar maduro.",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "rojo",
              derecha: "红色",
            },
            {
              izquierda: "azul",
              derecha: "蓝色",
            },
            {
              izquierda: "verde",
              derecha: "绿色",
            },
            {
              izquierda: "amarillo",
              derecha: "黄色",
            },
            {
              izquierda: "negro",
              derecha: "黑色",
            },
            {
              izquierda: "blanco",
              derecha: "白色",
            },
            {
              izquierda: "rosa",
              derecha: "粉色",
            },
            {
              izquierda: "morado",
              derecha: "紫色",
            },
            {
              izquierda: "marrón",
              derecha: "棕色",
            },
            {
              izquierda: "gris",
              derecha: "灰色",
            },
            {
              izquierda: "naranja",
              derecha: "橙色",
            },
            {
              izquierda: "celeste",
              derecha: "天蓝色",
            },
          ],
          explicacion: "将颜色与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["rojo", "es", "coche", "Mi", "."],
          respuestaCorrecta: "Mi coche es rojo.",
          explicacion: "正确的句子是：Mi coche es rojo.（我的车是红色的。）",
        },
        {
          id: "o2",
          palabras: ["son", "Las", "flores", "rosas", "."],
          respuestaCorrecta: "Las flores son rosas.",
          explicacion: "正确的句子是：Las flores son rosas.（花是粉色的。）",
        },
        {
          id: "o3",
          palabras: ["color", "es", "tu", "favorito", "¿Cuál", "?"],
          respuestaCorrecta: "¿Cuál es tu color favorito?",
          explicacion: "正确的句子是：¿Cuál es tu color favorito?（你最喜欢的颜色是什么？）",
        },
        {
          id: "o4",
          palabras: ["paredes", "claro", "Las", "azul", "son", "."],
          respuestaCorrecta: "Las paredes son azul claro.",
          explicacion: "正确的句子是：Las paredes son azul claro.（墙壁是浅蓝色的。）",
        },
        {
          id: "o5",
          palabras: ["color", "son", "de", "flores", "qué", "las", "¿", "?"],
          respuestaCorrecta: "¿De qué color son las flores?",
          explicacion: "正确的顺序是：¿De qué color son las flores?",
        },
        {
          id: "o6",
          palabras: ["prefiero", "claro", "Yo", "azul", "el", "."],
          respuestaCorrecta: "Yo prefiero el azul claro.",
          explicacion: "正确的句子是：Yo prefiero el azul claro.",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我的车是红色的。",
          respuestaEsperada: "Mi coche es rojo.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "她的眼睛是蓝色的。",
          respuestaEsperada: "Sus ojos son azules.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "我喜欢黑色的鞋子。",
          respuestaEsperada: "Me gustan los zapatos negros.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "你最喜欢的颜色是什么？",
          respuestaEsperada: "¿Cuál es tu color favorito?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "我想要浅粉色的墙壁。",
          respuestaEsperada: "Quiero las paredes de color rosa claro.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "草是绿色的。",
          respuestaEsperada: "La hierba es verde.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "给我一件白色的衬衫。",
          respuestaEsperada: "Dame una camisa blanca.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "天空是深蓝色的。",
          respuestaEsperada: "El cielo es azul oscuro.",
          explicacion: "西班牙语翻译",
        },
      ],
    },
    ejerciciosPracticos: [
      {
        id: "ep1",
        tipo: "completarDialogo",
        titulo: "完成对话",
        tituloChino: "完成对话",
        instruccion: "用正确的颜色完成对话。",
        instruccionChino: "用正确的颜色完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿De qué color quieres la camisa?",
            respuesta: "",
          },
          {
            personaje: "B",
            texto: "La quiero _____.",
            respuesta: "roja / azul / verde / negra / blanca",
          },
          {
            personaje: "A",
            texto: "¿No la tienen en _____?",
            respuesta: "rojo / azul / verde / negro / blanco",
          },
          {
            personaje: "B",
            texto: "Sí, también tienen en _____.",
            respuesta: "rojo / azul / verde / negro / blanco",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "completarFrases",
        titulo: "完成句子",
        tituloChino: "完成句子",
        instruccion: "用颜色的正确形式完成句子。",
        instruccionChino: "用颜色的正确形式完成句子。",
        frases: [
          {
            frase: "Mi coche es _____ (rojo).",
            respuesta: "rojo",
          },
          {
            frase: "Mi hermana tiene una moto _____ (rojo).",
            respuesta: "roja",
          },
          {
            frase: "El cielo está _____ (azul).",
            respuesta: "azul",
          },
          {
            frase: "Las flores son _____ (azul).",
            respuesta: "azules",
          },
          {
            frase: "La nieve es _____ (blanco).",
            respuesta: "blanca",
          },
          {
            frase: "Los zapatos son _____ (negro).",
            respuesta: "negros",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "describir",
        titulo: "Describe tu objeto favorito",
        tituloChino: "描述你最喜欢的物品",
        instruccion: "Describe el color de tu objeto favorito en español.",
        instruccionChino: "用西班牙语描述你最喜欢的物品的颜色。",
        ejemplo: "Mi objeto favorito es una mochila azul. Es de color azul marino y tiene un bolsillo rojo.",
      },
      {
        id: "ep4",
        tipo: "clasificar",
        titulo: "Clasifica los colores",
        tituloChino: "分类颜色",
        instruccion: "Clasifica cada color como variable (cambia) o invariable (no cambia).",
        instruccionChino: "将每个颜色分类为可变（变化）或不变（不变化）。",
        colores: [
          {
            color: "rojo",
            tipo: "variable",
          },
          {
            color: "azul",
            tipo: "invariable",
          },
          {
            color: "verde",
            tipo: "invariable",
          },
          {
            color: "blanco",
            tipo: "variable",
          },
          {
            color: "negro",
            tipo: "variable",
          },
          {
            color: "rosa",
            tipo: "invariable",
          },
          {
            color: "gris",
            tipo: "invariable",
          },
          {
            color: "amarillo",
            tipo: "variable",
          },
        ],
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Cuál es tu color favorito? Responde en español.",
        preguntaChino: "你最喜欢的颜色是什么？用西班牙语回答。",
        sugerencia: "Mi color favorito es el (color).",
        sugerenciaChino: "Mi color favorito es el (color).",
      },
      {
        id: "pa2",
        pregunta: "Describe el color de tu casa o coche en español.",
        preguntaChino: "用西班牙语描述你的房子或车的颜色。",
        sugerencia: "Mi casa es... Mi coche es...",
        sugerenciaChino: "Mi casa es... Mi coche es...",
      },
      {
        id: "pa3",
        pregunta: "¿De qué color es el cielo hoy?",
        preguntaChino: "今天天空是什么颜色的？",
        sugerencia: "Hoy el cielo es (azul / gris / etc.).",
        sugerenciaChino: "Hoy el cielo es (azul / gris / etc.).",
      },
      {
        id: "pa4",
        pregunta: "¿Qué color te parece más elegante para una habitación?",
        preguntaChino: "你觉得什么颜色最适合房间？",
        sugerencia: "Creo que el blanco es elegante, pero prefiero tonos cálidos como el beige.",
        sugerenciaChino: "我认为白色很优雅，但我更喜欢像米色这样的暖色调。",
      },
      {
        id: "pa5",
        pregunta: "¿Qué significa la expresión 'ponerse rojo'?",
        preguntaChino: "表达'ponerse rojo'是什么意思？",
        sugerencia: "Significa sonrojarse por vergüenza o timidez.",
        sugerenciaChino: "意思是因害羞或难为情而脸红。",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '红色' en español?",
        preguntaChino: "西班牙语中'红色'怎么说？",
        respuestaSugerida: "rojo / roja",
        respuestaSugeridaChino: "rojo / roja",
      },
      {
        id: "p2",
        pregunta: "¿Cuál es la diferencia entre 'rojo' y 'roja'?",
        preguntaChino: "'rojo'和'roja'有什么区别？",
        respuestaSugerida: "Rojo es masculino, roja es femenino.",
        respuestaSugeridaChino: "Rojo是阳性，roja是阴性。",
      },
      {
        id: "p3",
        pregunta: "¿Qué color es 'celeste'?",
        preguntaChino: "'celeste'是什么颜色？",
        respuestaSugerida: "Azul claro / Sky blue",
        respuestaSugeridaChino: "天蓝色",
      },
      {
        id: "p4",
        pregunta: "¿Cómo preguntas el color de algo en español?",
        preguntaChino: "如何用西班牙语询问某物的颜色？",
        respuestaSugerida: "¿De qué color es?",
        respuestaSugeridaChino: "¿De qué color es?",
      },
      {
        id: "p5",
        pregunta: "¿Cuál es el plural de 'azul'?",
        preguntaChino: "'azul'的复数形式是什么？",
        respuestaSugerida: "azules",
        respuestaSugeridaChino: "azules",
      },
      {
        id: "p6",
        pregunta: "¿Qué significa 'estar sin blanca'?",
        preguntaChino: "'estar sin blanca'是什么意思？",
        respuestaSugerida: "No tener dinero / estar en bancarrota.",
        respuestaSugeridaChino: "没有钱/破产。",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Miembros de la familia",
        tituloChino: "家庭成员",
        descripcion: `🔹 FAMILIA INMEDIATA (familia inmediata):

PADRES (parents):
• padre = father
• madre = mother
• papá = dad (informal)
• mamá = mom (informal)

HIJOS (children):
• hijo = son
• hija = daughter

HERMANOS (siblings):
• hermano = brother
• hermana = sister
• hermano mayor = older brother
• hermano menor = younger brother
• hermana mayor = older sister
• hermana menor = younger sister

ABUELOS (grandparents):
• abuelo = grandfather
• abuela = grandmother

NIETOS (grandchildren):
• nieto = grandson
• nieta = granddaughter

🔹 FAMILIA EXTENDIDA (familia extendida):

• tío = uncle
• tía = aunt
• primo = cousin (male)
• prima = cousin (female)
• sobrino = nephew
• sobrina = niece

🔹 FAMILIA POLÍTICA (family by marriage):

• suegro = father-in-law
• suegra = mother-in-law
• yerno = son-in-law
• nuera = daughter-in-law
• cuñado = brother-in-law
• cuñada = sister-in-law

🔹 OTROS (others):

• padrastro = stepfather
• madrastra = stepmother
• hijastro = stepson
• hijastra = stepdaughter
• hermanastro = stepbrother
• hermanastra = stepsister
• medio hermano = half-brother
• media hermana = half-sister

📌 NOTA: En las familias hispanas, los lazos familiares son muy importantes. Es común tener relaciones cercanas con tíos, primos y abuelos.`,
        descripcionChino: `🔹 直系亲属：

父母：
• padre = 父亲
• madre = 母亲
• papá = 爸爸（非正式）
• mamá = 妈妈（非正式）

子女：
• hijo = 儿子
• hija = 女儿

兄弟姐妹：
• hermano = 兄弟
• hermana = 姐妹
• hermano mayor = 哥哥
• hermano menor = 弟弟
• hermana mayor = 姐姐
• hermana menor = 妹妹

祖父母：
• abuelo = 祖父/外公
• abuela = 祖母/外婆

孙辈：
• nieto = 孙子
• nieta = 孙女

🔹 旁系亲属：

• tío = 叔叔/舅舅/姑父/姨父
• tía = 阿姨/姑姑/舅妈/婶婶
• primo = 堂/表兄弟
• prima = 堂/表姐妹
• sobrino = 侄子/外甥
• sobrina = 侄女/外甥女

🔹 姻亲：

• suegro = 公公/岳父
• suegra = 婆婆/岳母
• yerno = 女婿
• nuera = 儿媳
• cuñado = 姐夫/妹夫/连襟
• cuñada = 嫂子/弟媳/妯娌

🔹 其他：

• padrastro = 继父
• madrastra = 继母
• hijastro = 继子
• hijastra = 继女
• hermanastro = 继兄弟
• hermanastra = 继姐妹
• medio hermano = 同父异母或同母异父的兄弟
• media hermana = 同父异母或同母异父的姐妹

📌 注意：在西班牙家庭中，家庭纽带非常重要。与叔叔、堂表兄弟姐妹和祖父母保持密切关系是很常见的。`,
        ejemplos: [
          {
            espanol: "Mi padre trabaja en un banco.",
            chino: "我父亲在银行工作。",
          },
          {
            espanol: "Tengo dos hermanas.",
            chino: "我有两个姐妹。",
          },
          {
            espanol: "Mis abuelos viven en el campo.",
            chino: "我的祖父母住在乡下。",
          },
          {
            espanol: "Mi tío es médico.",
            chino: "我的叔叔是医生。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Posesivos - Mi, tu, su, nuestro",
        tituloChino: "物主代词 - 我的，你的，他/她的，我们的",
        descripcion: `Los posesivos indican pertenencia:

🔹 POSESIVOS ÁTONOS (antes del sustantivo):

Singular:
• mi = my (mi padre)
• tu = your (informal) (tu hermana)
• su = his/her/their/your (formal) (su abuelo)

Plural:
• mis = my (mis padres)
• tus = your (tus hermanos)
• sus = his/her/their/your (formal) (sus abuelos)

🔹 POSESIVOS TÓNICOS (después del sustantivo o solos):

Singular:
• mío / mía = mine
• tuyo / tuya = yours (informal)
• suyo / suya = his/hers/yours (formal)/theirs

Plural:
• míos / mías = mine
• tuyos / tuyas = yours
• suyos / suyas = his/hers/yours/theirs

📌 EJEMPLOS:
• Este libro es mío. (This book is mine)
• La casa es nuestra. (The house is ours)
• ¿Dónde están los tuyos? (Where are yours?)

🔹 NUESTRO / NUESTRA (our):
• nuestro padre = our father
• nuestra madre = our mother
• nuestros padres = our parents
• nuestras hermanas = our sisters

❌ ERROR COMÚN:
En español, los posesivos concuerdan con el objeto poseído, no con el poseedor.
✅ Correcto: Mi padre y mi madre (my father and my mother)
❌ Incorrecto: Mis padre y madre`,
        descripcionChino: `物主代词表示所属关系：

🔹 非重读物主代词（放在名词前）：

单数：
• mi = 我的（mi padre）
• tu = 你的（非正式）（tu hermana）
• su = 他/她/他们/您的（正式）（su abuelo）

复数：
• mis = 我的（mis padres）
• tus = 你的（tus hermanos）
• sus = 他/她/他们/您的（sus abuelos）

🔹 重读物主代词（放在名词后或单独使用）：

单数：
• mío / mía = 我的
• tuyo / tuya = 你的（非正式）
• suyo / suya = 他/她/您/他们的

复数：
• míos / mías = 我的
• tuyos / tuyas = 你的
• suyos / suyas = 他/她/您/他们的

📌 例子：
• Este libro es mío. = 这本书是我的。
• La casa es nuestra. = 房子是我们的。
• ¿Dónde están los tuyos? = 你的（家人/东西）在哪里？

🔹 NUESTRO / NUESTRA（我们的）：
• nuestro padre = 我们的父亲
• nuestra madre = 我们的母亲
• nuestros padres = 我们的父母
• nuestras hermanas = 我们的姐妹

❌ 常见错误：
在西班牙语中，物主代词与被拥有的物保持性数一致，而不是与拥有者一致。
✅ 正确：Mi padre y mi madre
❌ 错误：Mis padre y madre`,
        ejemplos: [
          {
            espanol: "Mi hermano es médico.",
            chino: "我的兄弟是医生。",
          },
          {
            espanol: "¿Cómo se llama tu madre?",
            chino: "你的妈妈叫什么名字？",
          },
          {
            espanol: "Su familia es grande.",
            chino: "他/她的家庭很大。",
          },
          {
            espanol: "Nuestra casa es pequeña.",
            chino: "我们的房子很小。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Preguntar sobre la familia",
        tituloChino: "询问家庭情况",
        descripcion: `🔹 PREGUNTAS COMUNES:

• ¿Tienes hermanos? (Do you have siblings?)
• ¿Cuántos hermanos tienes? (How many siblings do you have?)
• ¿Cómo se llama tu madre? (What's your mother's name?)
• ¿Dónde viven tus padres? (Where do your parents live?)
• ¿Vives con tu familia? (Do you live with your family?)
• ¿Estás casado/a? (Are you married?)
• ¿Tienes hijos? (Do you have children?)
• ¿Cómo es tu familia? (What is your family like?)
• ¿Eres hijo único? (Are you an only child?)

🔹 RESPUESTAS COMUNES:

SOBRE HERMANOS:
• Tengo un hermano y una hermana.
• No tengo hermanos, soy hijo único / hija única.
• Tengo dos hermanos mayores y una hermana menor.
• Somos tres hermanos.

SOBRE PADRES:
• Mis padres viven en Madrid.
• Mi padre es ingeniero y mi madre es profesora.
• Mis padres están divorciados.
• Vivo solo con mi madre.

SOBRE ESTADO CIVIL:
• Estoy casado/a y tengo dos hijos.
• Estoy soltero/a.
• Estoy divorciado/a.
• Vivo con mi pareja.

📌 VOCABULARIO ADICIONAL:
• hijo único = only son
• hija única = only daughter
• familia numerosa = large family
• familia monoparental = single-parent family`,
        descripcionChino: `🔹 常见问题：

• ¿Tienes hermanos? = 你有兄弟姐妹吗？
• ¿Cuántos hermanos tienes? = 你有几个兄弟姐妹？
• ¿Cómo se llama tu madre? = 你妈妈叫什么名字？
• ¿Dónde viven tus padres? = 你父母住在哪里？
• ¿Vives con tu familia? = 你和家人住在一起吗？
• ¿Estás casado/a? = 你结婚了吗？
• ¿Tienes hijos? = 你有孩子吗？
• ¿Cómo es tu familia? = 你的家庭怎么样？
• ¿Eres hijo único? = 你是独生子吗？

🔹 常见回答：

关于兄弟姐妹：
• Tengo un hermano y una hermana. = 我有一个兄弟和一个姐妹。
• No tengo hermanos, soy hijo único / hija única. = 我没有兄弟姐妹，我是独生子/女。
• Tengo dos hermanos mayores y una hermana menor. = 我有两个哥哥和一个妹妹。
• Somos tres hermanos. = 我们是三兄妹。

关于父母：
• Mis padres viven en Madrid. = 我父母住在马德里。
• Mi padre es ingeniero y mi madre es profesora. = 我父亲是工程师，母亲是老师。
• Mis padres están divorciados. = 我父母离婚了。
• Vivo solo con mi madre. = 我只和母亲住在一起。

关于婚姻状况：
• Estoy casado/a y tengo dos hijos. = 我结婚了，有两个孩子。
• Estoy soltero/a. = 我单身。
• Estoy divorciado/a. = 我离婚了。
• Vivo con mi pareja. = 我和伴侣住在一起。

📌 额外词汇：
• hijo único = 独生子
• hija única = 独生女
• familia numerosa = 大家庭
• familia monoparental = 单亲家庭`,
        ejemplos: [
          {
            espanol: "—¿Tienes hermanos? —Sí, tengo una hermana.",
            chino: "—你有兄弟姐妹吗？—是的，我有一个姐妹。",
          },
          {
            espanol: "Soy hijo único, no tengo hermanos.",
            chino: "我是独生子，没有兄弟姐妹。",
          },
          {
            espanol: "Mis padres se divorciaron cuando yo tenía diez años.",
            chino: "我父母在我十岁时离婚了。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "El árbol genealógico y relaciones",
        tituloChino: "家谱和关系",
        descripcion: `🔹 RELACIONES FAMILIARES (explicadas):

• El padre de mi padre es mi abuelo.
• La madre de mi padre es mi abuela.
• El hermano de mi padre es mi tío.
• La hermana de mi padre es mi tía.
• El hijo de mi tío es mi primo.
• La hija de mi tía es mi prima.
• El hijo de mi hermana es mi sobrino.
• La hija de mi hermano es mi sobrina.
• La madre de mi esposo/esposa es mi suegra.
• El padre de mi esposo/esposa es mi suegro.
• El hermano de mi esposo/esposa es mi cuñado.
• La hermana de mi esposo/esposa es mi cuñada.

🔹 EJERCICIO DE RELACIONES:
• ¿Quién es el hijo de mi abuelo? → Mi padre o mi tío.
• ¿Quién es la madre de mi prima? → Mi tía.
• ¿Quién es el hermano de mi madre? → Mi tío.
• ¿Quién es la hermana de mi padre? → Mi tía.

📌 EXPRESIONES ÚTILES:
• Por parte de padre = on my father's side
• Por parte de madre = on my mother's side
• Soy el mayor / la mayor = I'm the oldest
• Soy el menor / la menor = I'm the youngest
• Somos muy unidos = We are very close
• Nos reunimos los domingos = We get together on Sundays`,
        descripcionChino: `🔹 家庭关系（解释）：

• 我父亲的父亲是我的祖父。
• 我父亲的母亲是我的祖母。
• 我父亲的兄弟是我的叔叔。
• 我父亲的姐妹是我的姑姑。
• 我叔叔的儿子是我的堂兄弟。
• 我阿姨的女儿是我的堂姐妹。
• 我姐妹的儿子是我的外甥。
• 我兄弟的女儿是我的侄女。
• 我配偶的母亲是我的岳母/婆婆。
• 我配偶的父亲是我的岳父/公公。
• 我配偶的兄弟是我的内兄/弟/姐夫/妹夫。
• 我配偶的姐妹是我的大/小姑子/大/小姨子。

🔹 关系练习：
• 我祖父的儿子是谁？→ 我父亲或叔叔。
• 我堂姐妹的母亲是谁？→ 我阿姨。
• 我母亲的兄弟是谁？→ 我舅舅。
• 我父亲的姐妹是谁？→ 我姑姑。

📌 有用表达：
• Por parte de padre = 父系
• Por parte de madre = 母系
• Soy el mayor / la mayor = 我是最大的
• Soy el menor / la menor = 我是最小的
• Somos muy unidos = 我们很亲密
• Nos reunimos los domingos = 我们星期日聚会`,
        ejemplos: [
          {
            espanol: "Mi abuelo por parte de padre era muy alto.",
            chino: "我祖父（父系）很高。",
          },
          {
            espanol: "Soy la mayor de tres hermanos.",
            chino: "我是三兄妹中最大的。",
          },
          {
            espanol: "En mi familia somos muy unidos.",
            chino: "在我的家庭中，我们很亲密。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "padre / papá",
        chino: "父亲/爸爸",
        ejemplo: "Mi padre es alto.",
      },
      {
        id: "v2",
        espanol: "madre / mamá",
        chino: "母亲/妈妈",
        ejemplo: "Mi madre es amable.",
      },
      {
        id: "v3",
        espanol: "hermano",
        chino: "兄弟",
        ejemplo: "Mi hermano es mayor.",
      },
      {
        id: "v4",
        espanol: "hermana",
        chino: "姐妹",
        ejemplo: "Mi hermana es menor.",
      },
      {
        id: "v5",
        espanol: "abuelo",
        chino: "祖父/外公",
        ejemplo: "Mi abuelo tiene ochenta años.",
      },
      {
        id: "v6",
        espanol: "abuela",
        chino: "祖母/外婆",
        ejemplo: "Mi abuela cocina muy bien.",
      },
      {
        id: "v7",
        espanol: "tío",
        chino: "叔叔/舅舅",
        ejemplo: "Mi tío vive en Madrid.",
      },
      {
        id: "v8",
        espanol: "tía",
        chino: "阿姨/姑姑",
        ejemplo: "Mi tía es doctora.",
      },
      {
        id: "v9",
        espanol: "primo",
        chino: "堂/表兄弟",
        ejemplo: "Mi primo estudia medicina.",
      },
      {
        id: "v10",
        espanol: "prima",
        chino: "堂/表姐妹",
        ejemplo: "Mi prima es bailarina.",
      },
      {
        id: "v11",
        espanol: "sobrino",
        chino: "侄子/外甥",
        ejemplo: "Mi sobrino tiene cinco años.",
      },
      {
        id: "v12",
        espanol: "sobrina",
        chino: "侄女/外甥女",
        ejemplo: "Mi sobrina es muy lista.",
      },
      {
        id: "v13",
        espanol: "nieto",
        chino: "孙子/外孙",
        ejemplo: "Mi nieto es pequeño.",
      },
      {
        id: "v14",
        espanol: "nieta",
        chino: "孙女/外孙女",
        ejemplo: "Mi nieta es rubia.",
      },
      {
        id: "v15",
        espanol: "suegro",
        chino: "公公/岳父",
        ejemplo: "Mi suegro es simpático.",
      },
      {
        id: "v16",
        espanol: "suegra",
        chino: "婆婆/岳母",
        ejemplo: "Mi suegra cocina bien.",
      },
      {
        id: "v17",
        espanol: "cuñado",
        chino: "姐夫/妹夫",
        ejemplo: "Mi cuñado es médico.",
      },
      {
        id: "v18",
        espanol: "cuñada",
        chino: "嫂子/弟媳",
        ejemplo: "Mi cuñada es profesora.",
      },
      {
        id: "v19",
        espanol: "yerno",
        chino: "女婿",
        ejemplo: "Mi yerno trabaja en un banco.",
      },
      {
        id: "v20",
        espanol: "nuera",
        chino: "儿媳",
        ejemplo: "Mi nuera es muy amable.",
      },
      {
        id: "v21",
        espanol: "familia",
        chino: "家庭",
        ejemplo: "Mi familia es grande.",
      },
      {
        id: "v22",
        espanol: "padres",
        chino: "父母",
        ejemplo: "Mis padres trabajan mucho.",
      },
      {
        id: "v23",
        espanol: "hijo",
        chino: "儿子",
        ejemplo: "Mi hijo tiene diez años.",
      },
      {
        id: "v24",
        espanol: "hija",
        chino: "女儿",
        ejemplo: "Mi hija es estudiante.",
      },
      {
        id: "v25",
        espanol: "esposo / marido",
        chino: "丈夫",
        ejemplo: "Mi esposo trabaja en casa.",
      },
      {
        id: "v26",
        espanol: "esposa / mujer",
        chino: "妻子",
        ejemplo: "Mi esposa es cocinera.",
      },
      {
        id: "v27",
        espanol: "pareja",
        chino: "伴侣",
        ejemplo: "Vivo con mi pareja.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Hablando de la familia",
        tituloChino: "谈论家庭",
        personajes: ["Ana", "Pedro"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Pedro, ¿tienes hermanos?",
            traduccion: "佩德罗，你有兄弟姐妹吗？",
          },
          {
            personaje: "Pedro",
            texto: "Sí, tengo un hermano mayor y una hermana menor.",
            traduccion: "是的，我有一个哥哥和一个妹妹。",
          },
          {
            personaje: "Ana",
            texto: "¿Cómo se llaman?",
            traduccion: "他们叫什么名字？",
          },
          {
            personaje: "Pedro",
            texto: "Mi hermano se llama Carlos y mi hermana se llama Sofía.",
            traduccion: "我哥哥叫卡洛斯，我妹妹叫索菲亚。",
          },
          {
            personaje: "Ana",
            texto: "¿Y tus padres? ¿Dónde viven?",
            traduccion: "你的父母呢？他们住在哪里？",
          },
          {
            personaje: "Pedro",
            texto: "Mis padres viven en Madrid. Yo vivo solo en Barcelona.",
            traduccion: "我父母住在马德里。我一个人住在巴塞罗那。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Presentando la familia",
        tituloChino: "介绍家人",
        personajes: ["María", "Luis"],
        lineas: [
          {
            personaje: "María",
            texto: "Luis, te presento a mi familia.",
            traduccion: "路易斯，我给你介绍我的家人。",
          },
          {
            personaje: "Luis",
            texto: "¡Qué familia tan grande!",
            traduccion: "多么大的家庭啊！",
          },
          {
            personaje: "María",
            texto: "Estos son mis padres: Juan y Carmen.",
            traduccion: "这是我的父母：胡安和卡门。",
          },
          {
            personaje: "Luis",
            texto: "Mucho gusto, señores.",
            traduccion: "很高兴认识你们，先生女士。",
          },
          {
            personaje: "María",
            texto: "Esta es mi hermana Laura.",
            traduccion: "这是我的妹妹劳拉。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Preguntando por la familia",
        tituloChino: "询问家庭情况",
        personajes: ["Carlos", "Sofía"],
        lineas: [
          {
            personaje: "Carlos",
            texto: "Sofía, ¿vives con tu familia?",
            traduccion: "索菲亚，你和家人住在一起吗？",
          },
          {
            personaje: "Sofía",
            texto: "No, vivo sola en un apartamento. Mis padres viven en otra ciudad.",
            traduccion: "不，我一个人住在公寓里。我父母住在另一个城市。",
          },
          {
            personaje: "Carlos",
            texto: "¿Tienes hermanos?",
            traduccion: "你有兄弟姐妹吗？",
          },
          {
            personaje: "Sofía",
            texto: "Sí, tengo un hermano menor. Él todavía vive con mis padres.",
            traduccion: "是的，我有一个弟弟。他还和我父母住在一起。",
          },
          {
            personaje: "Carlos",
            texto: "¿Y tus abuelos?",
            traduccion: "你的祖父母呢？",
          },
          {
            personaje: "Sofía",
            texto: "Mis abuelos viven en el pueblo. Los visito cada verano.",
            traduccion: "我的祖父母住在村子里。我每年夏天去看他们。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Relaciones familiares",
        tituloChino: "家庭关系",
        personajes: ["Laura", "David"],
        lineas: [
          {
            personaje: "Laura",
            texto: "David, ¿cómo se llama tu suegra?",
            traduccion: "大卫，你的岳母叫什么名字？",
          },
          {
            personaje: "David",
            texto: "Mi suegra se llama Elena. Es muy simpática.",
            traduccion: "我的岳母叫埃莱娜。她人很好。",
          },
          {
            personaje: "Laura",
            texto: "¿Y tu cuñado? ¿Trabaja?",
            traduccion: "你的姐夫呢？他工作吗？",
          },
          {
            personaje: "David",
            texto: "Sí, mi cuñado es arquitecto. Vive con mi suegra.",
            traduccion: "是的，我的姐夫是建筑师。他和我的岳母住在一起。",
          },
          {
            personaje: "Laura",
            texto: "¿Tienes sobrinos?",
            traduccion: "你有侄子/外甥吗？",
          },
          {
            personaje: "David",
            texto: "Sí, dos. Son muy traviesos.",
            traduccion: "是的，两个。他们很调皮。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Reunión familiar",
        tituloChino: "家庭聚会",
        personajes: ["Marta", "Javier"],
        lineas: [
          {
            personaje: "Marta",
            texto: "Javier, ¿vienen todos a la cena de Navidad?",
            traduccion: "哈维尔，大家都来参加圣诞晚餐吗？",
          },
          {
            personaje: "Javier",
            texto: "Sí, viene toda la familia. Mis padres, mis abuelos, mis tíos y primos.",
            traduccion: "是的，全家都来。我的父母、祖父母、叔叔阿姨和堂表兄弟姐妹。",
          },
          {
            personaje: "Marta",
            texto: "¿Cuántos sois en total?",
            traduccion: "你们总共有多少人？",
          },
          {
            personaje: "Javier",
            texto: "Somos veinticinco personas. ¡Es una familia grande!",
            traduccion: "我们是二十五个人。这是一个大家庭！",
          },
          {
            personaje: "Marta",
            texto: "¿Dónde celebráis?",
            traduccion: "你们在哪里庆祝？",
          },
          {
            personaje: "Javier",
            texto: "En casa de mis padres. Tienen un salón muy grande.",
            traduccion: "在我父母家。他们有一个很大的客厅。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "我父亲的父亲是我的：_____",
          preguntaChino: "我父亲的父亲是我的：_____",
          respuestaCorrecta: "abuelo",
          explicacion: "我父亲的父亲是我的祖父。",
          pista: "首字母是 a，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c2",
          pregunta: "我叔叔的女儿是我的：_____",
          preguntaChino: "我叔叔的女儿是我的：_____",
          respuestaCorrecta: "prima",
          explicacion: "我叔叔的女儿是我的堂/表姐妹。",
          pista: "首字母是 p，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c3",
          pregunta: "我母亲的母亲是我的：_____",
          preguntaChino: "我母亲的母亲是我的：_____",
          respuestaCorrecta: "abuela",
          explicacion: "我母亲的母亲是我的外祖母。",
          pista: "首字母是 a，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c4",
          pregunta: "我父亲的兄弟是我的：_____",
          preguntaChino: "我父亲的兄弟是我的：_____",
          respuestaCorrecta: "tío",
          explicacion: "我父亲的兄弟是我的叔叔/舅舅。",
          pista: "首字母是 t，3个字母",
          numeroLetras: 3,
        },
        {
          id: "c5",
          pregunta: "为了说'我的父母'：_____ padres",
          preguntaChino: "为了说'我的父母'：_____ padres",
          respuestaCorrecta: "Mis",
          explicacion: "'Mis'是'我的'的复数形式。",
          pista: "首字母是 M，3个字母",
          numeroLetras: 3,
        },
        {
          id: "c6",
          pregunta: "我姐妹的儿子是我的：_____",
          preguntaChino: "我姐妹的儿子是我的：_____",
          respuestaCorrecta: "sobrino",
          explicacion: "Sobrino = 侄子/外甥",
          pista: "首字母是 s，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c7",
          pregunta: "我配偶的母亲是我的：_____",
          preguntaChino: "我配偶的母亲是我的：_____",
          respuestaCorrecta: "suegra",
          explicacion: "Suegra = 婆婆/岳母",
          pista: "首字母是 s，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c8",
          pregunta: "为了说'我们是三个兄弟姐妹'：Somos _____ hermanos",
          preguntaChino: "为了说'我们是三个兄弟姐妹'：Somos _____ hermanos",
          respuestaCorrecta: "tres",
          explicacion: "Tres hermanos = 三个兄弟姐妹",
          pista: "首字母是 t，4个字母",
          numeroLetras: 4,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "我父亲的兄弟叫什么？",
          preguntaChino: "我父亲的兄弟叫什么？",
          opciones: ["primo", "tío", "abuelo", "sobrino"],
          respuestaCorrecta: "tío",
          explicacion: "我父亲的兄弟是我的叔叔。",
        },
        {
          id: "s2",
          pregunta: "西班牙语中'父母'怎么说？",
          preguntaChino: "西班牙语中'父母'怎么说？",
          opciones: ["padre", "madre", "padres", "familia"],
          respuestaCorrecta: "padres",
          explicacion: "'Padres' = 父母。",
        },
        {
          id: "s3",
          pregunta: "'hermana mayor'是什么意思？",
          preguntaChino: "'hermana mayor'是什么意思？",
          opciones: ["妹妹", "姐姐", "阿姨", "堂姐"],
          respuestaCorrecta: "姐姐",
          explicacion: "'Hermana mayor' = 姐姐。",
        },
        {
          id: "s4",
          pregunta: "哪个是正确的：'_____ hermano es médico'（我的兄弟是医生）",
          preguntaChino: "哪个是正确的：'_____ hermano es médico'（我的兄弟是医生）",
          opciones: ["Mi", "Mis", "Tu", "Su"],
          respuestaCorrecta: "Mi",
          explicacion: "'Mi'用于单数名词。",
        },
        {
          id: "s5",
          pregunta: "'soy hijo único'是什么意思？",
          preguntaChino: "'soy hijo único'是什么意思？",
          opciones: ["我是独生子", "我只有一个儿子", "我是大儿子", "我是小儿子"],
          respuestaCorrecta: "我是独生子",
          explicacion: "'Hijo único' = 独生子",
        },
        {
          id: "s6",
          pregunta: "¿Cómo se dice '我的祖父母' en español?",
          preguntaChino: "西班牙语中'我的祖父母'怎么说？",
          opciones: ["Mis abuelos", "Mi abuelo", "Mis abuelas", "Mi abuela"],
          respuestaCorrecta: "Mis abuelos",
          explicacion: "Abuelos incluye a ambos (abuelo y abuela)",
        },
        {
          id: "s7",
          pregunta: "¿Qué significa 'cuñado'?",
          preguntaChino: "'cuñado'是什么意思？",
          opciones: ["姐夫/妹夫", "兄弟", "叔叔", "祖父"],
          respuestaCorrecta: "姐夫/妹夫",
          explicacion: "Cuñado = brother-in-law",
        },
        {
          id: "s8",
          pregunta: "¿Cómo se dice '我父母离婚了' en español?",
          preguntaChino: "西班牙语中'我父母离婚了'怎么说？",
          opciones: [
            "Mis padres están divorciados",
            "Mis padres son divorciados",
            "Mis padres divorcian",
            "Mis padres se divorcian",
          ],
          respuestaCorrecta: "Mis padres están divorciados",
          explicacion: "Están divorciados = estado civil",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Primo'可以是阳性或阴性。",
          preguntaChino: "'Primo'可以是阳性或阴性。",
          respuestaCorrecta: false,
          explicacion: "错。'Primo'是阳性，'prima'是阴性。",
        },
        {
          id: "vf2",
          pregunta: "'Abuelos'包括祖父和祖母。",
          preguntaChino: "'Abuelos'包括祖父和祖母。",
          respuestaCorrecta: true,
          explicacion: "对。'Abuelos'是祖父和祖母的复数。",
        },
        {
          id: "vf3",
          pregunta: "'Tío'是我母亲的父亲。",
          preguntaChino: "'Tío'是我母亲的父亲。",
          respuestaCorrecta: false,
          explicacion: "错。'Tío'是我父亲或母亲的兄弟。",
        },
        {
          id: "vf4",
          pregunta: "'Mis padres'意思是'我的父母'。",
          preguntaChino: "'Mis padres'意思是'我的父母'。",
          respuestaCorrecta: true,
          explicacion: "对。'Mis padres' = 我的父母。",
        },
        {
          id: "vf5",
          pregunta: "'Sobrino'是我兄弟的儿子。",
          preguntaChino: "'Sobrino'是我兄弟的儿子。",
          respuestaCorrecta: true,
          explicacion: "对。'Sobrino' = 侄子。",
        },
        {
          id: "vf6",
          pregunta: "'Nuera' es la esposa de mi hijo.",
          preguntaChino: "'Nuera'是我儿子的妻子。",
          respuestaCorrecta: true,
          explicacion: "对。Nuera = 儿媳。",
        },
        {
          id: "vf7",
          pregunta: "'Suegro' es el padre de mi esposo/esposa.",
          preguntaChino: "'Suegro'是我配偶的父亲。",
          respuestaCorrecta: true,
          explicacion: "对。Suegro = 公公/岳父。",
        },
        {
          id: "vf8",
          pregunta: "En español, 'mis padres' puede significar 'my parents' o 'my fathers'.",
          preguntaChino: "在西班牙语中，'mis padres'可以表示'我的父母'或'我的父亲们'。",
          respuestaCorrecta: false,
          explicacion: "错。Padres = parents (father and mother)",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "padre",
              derecha: "父亲",
            },
            {
              izquierda: "madre",
              derecha: "母亲",
            },
            {
              izquierda: "hermano",
              derecha: "兄弟",
            },
            {
              izquierda: "hermana",
              derecha: "姐妹",
            },
            {
              izquierda: "abuelo",
              derecha: "祖父",
            },
            {
              izquierda: "abuela",
              derecha: "祖母",
            },
            {
              izquierda: "tío",
              derecha: "叔叔",
            },
            {
              izquierda: "tía",
              derecha: "阿姨",
            },
            {
              izquierda: "primo",
              derecha: "堂兄弟",
            },
            {
              izquierda: "prima",
              derecha: "堂姐妹",
            },
            {
              izquierda: "sobrino",
              derecha: "侄子",
            },
            {
              izquierda: "sobrina",
              derecha: "侄女",
            },
            {
              izquierda: "suegro",
              derecha: "公公/岳父",
            },
            {
              izquierda: "suegra",
              derecha: "婆婆/岳母",
            },
            {
              izquierda: "cuñado",
              derecha: "姐夫/妹夫",
            },
            {
              izquierda: "cuñada",
              derecha: "嫂子/弟媳",
            },
          ],
          explicacion: "将家庭成员与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["hermano", "Mi", "mayor", "es", "."],
          respuestaCorrecta: "Mi hermano es mayor.",
          explicacion: "正确的句子是：Mi hermano es mayor.（我的哥哥更大。）",
        },
        {
          id: "o2",
          palabras: ["tía", "es", "Mi", "médica", "."],
          respuestaCorrecta: "Mi tía es médica.",
          explicacion: "正确的句子是：Mi tía es médica.（我的阿姨是医生。）",
        },
        {
          id: "o3",
          palabras: ["tus", "viven", "¿Dónde", "padres", "?"],
          respuestaCorrecta: "¿Dónde viven tus padres?",
          explicacion: "正确的句子是：¿Dónde viven tus padres?（你的父母住在哪里？）",
        },
        {
          id: "o4",
          palabras: ["único", "soy", "hijo", "Yo", "."],
          respuestaCorrecta: "Yo soy hijo único.",
          explicacion: "正确的顺序是：Yo soy hijo único.（我是独生子。）",
        },
        {
          id: "o5",
          palabras: ["abuelos", "Mis", "pueblo", "en", "viven", "el", "."],
          respuestaCorrecta: "Mis abuelos viven en el pueblo.",
          explicacion: "正确的句子是：Mis abuelos viven en el pueblo.（我的祖父母住在村子里。）",
        },
        {
          id: "o6",
          palabras: ["familia", "grande", "una", "es", "Mi", "."],
          respuestaCorrecta: "Mi familia es una familia grande.",
          explicacion: "正确的顺序是：Mi familia es una familia grande.",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我有一个哥哥和一个妹妹。",
          respuestaEsperada: "Tengo un hermano mayor y una hermana menor.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "我的父母住在北京。",
          respuestaEsperada: "Mis padres viven en Pekín.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "我是独生子。",
          respuestaEsperada: "Soy hijo único.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "你结婚了吗？",
          respuestaEsperada: "¿Estás casado?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "我的祖父母住在乡下。",
          respuestaEsperada: "Mis abuelos viven en el campo.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "我妈妈的妹妹是我的阿姨。",
          respuestaEsperada: "La hermana de mi madre es mi tía.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "你的嫂子是医生吗？",
          respuestaEsperada: "¿Tu cuñada es médica?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "我父母离婚了。",
          respuestaEsperada: "Mis padres están divorciados.",
          explicacion: "西班牙语翻译",
        },
      ],
    },
    ejerciciosPracticos: [
      {
        id: "ep1",
        tipo: "completarDialogo",
        titulo: "完成对话",
        tituloChino: "完成对话",
        instruccion: "用正确的家庭词汇完成对话。",
        instruccionChino: "用正确的家庭词汇完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿Tienes _____?",
            respuesta: "hermanos",
          },
          {
            personaje: "B",
            texto: "Sí, tengo un _____ y una _____.",
            respuesta: "hermano / hermana",
          },
          {
            personaje: "A",
            texto: "¿Cómo se llama tu _____?",
            respuesta: "hermana",
          },
          {
            personaje: "B",
            texto: "Mi _____ se llama Ana.",
            respuesta: "hermana",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "completarArbol",
        titulo: "Completa el árbol genealógico",
        tituloChino: "完成家谱",
        instruccion: "Completa las relaciones familiares en español.",
        instruccionChino: "用西班牙语完成家庭关系。",
        arbol: [
          {
            relacion: "El padre de mi padre es mi...",
            respuesta: "abuelo",
          },
          {
            relacion: "La hija de mi hermana es mi...",
            respuesta: "sobrina",
          },
          {
            relacion: "El hijo de mi tío es mi...",
            respuesta: "primo",
          },
          {
            relacion: "La madre de mi madre es mi...",
            respuesta: "abuela",
          },
          {
            relacion: "El hermano de mi esposo es mi...",
            respuesta: "cuñado",
          },
          {
            relacion: "La madre de mi esposa es mi...",
            respuesta: "suegra",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "responder",
        titulo: "Responde las preguntas sobre tu familia",
        tituloChino: "回答关于你家庭的问题",
        instruccion: "Responde en español sobre tu propia familia.",
        instruccionChino: "用西班牙语回答关于你自己家庭的问题。",
        preguntas: [
          {
            pregunta: "¿Tienes hermanos? ¿Cuántos?",
            respuestaEsperada: "Tengo (número) hermanos.",
          },
          {
            pregunta: "¿Cómo se llaman tus padres?",
            respuestaEsperada: "Mi padre se llama... y mi madre se llama...",
          },
          {
            pregunta: "¿Dónde viven tus abuelos?",
            respuestaEsperada: "Mis abuelos viven en...",
          },
        ],
      },
      {
        id: "ep4",
        tipo: "dibujar",
        titulo: "Dibuja tu árbol genealógico",
        tituloChino: "画出你的家谱",
        instruccion: "Dibuja tu árbol genealógico y escribe los nombres en español.",
        instruccionChino: "画出你的家谱并用西班牙语写出名字。",
        ejemplo: "Yo, mis padres, mis abuelos, mis hermanos, mis tíos, mis primos.",
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Tienes hermanos? ¿Cuántos? Responde en español.",
        preguntaChino: "你有兄弟姐妹吗？有几个？用西班牙语回答。",
        sugerencia: "Tengo (número) hermano(s) y (número) hermana(s).",
        sugerenciaChino: "Tengo (número) hermano(s) y (número) hermana(s).",
      },
      {
        id: "pa2",
        pregunta: "¿Cómo se llaman tus padres?",
        preguntaChino: "你的父母叫什么名字？",
        sugerencia: "Mi padre se llama... y mi madre se llama...",
        sugerenciaChino: "Mi padre se llama... y mi madre se llama...",
      },
      {
        id: "pa3",
        pregunta: "¿Vives con tu familia?",
        preguntaChino: "你和家人住在一起吗？",
        sugerencia: "Sí, vivo con mi familia. / No, vivo solo/a.",
        sugerenciaChino: "Sí, vivo con mi familia. / No, vivo solo/a.",
      },
      {
        id: "pa4",
        pregunta: "Describe a tu familiar favorito en español.",
        preguntaChino: "用西班牙语描述你最喜欢的家人。",
        sugerencia: "Mi familiar favorito es mi (madre/padre/abuela...). Es muy...",
        sugerenciaChino: "我最喜欢的家人是我的（母亲/父亲/祖母...）。他很/她很...",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '我的家庭' en español?",
        preguntaChino: "西班牙语中'我的家庭'怎么说？",
        respuestaSugerida: "Mi familia",
        respuestaSugeridaChino: "Mi familia",
      },
      {
        id: "p2",
        pregunta: "¿Tienes hermanos? Responde en español.",
        preguntaChino: "你有兄弟姐妹吗？用西班牙语回答。",
        respuestaSugerida: "Sí, tengo un hermano / No, no tengo hermanos.",
        respuestaSugeridaChino: "Sí, tengo un hermano / No, no tengo hermanos.",
      },
      {
        id: "p3",
        pregunta: "¿Cómo se llama tu madre? Responde en español.",
        preguntaChino: "你妈妈叫什么名字？用西班牙语回答。",
        respuestaSugerida: "Mi madre se llama (nombre).",
        respuestaSugeridaChino: "Mi madre se llama (名字).",
      },
      {
        id: "p4",
        pregunta: "¿Qué significa 'sobrino'?",
        preguntaChino: "'sobrino'是什么意思？",
        respuestaSugerida: "Nephew / 侄子/外甥",
        respuestaSugeridaChino: "侄子/外甥",
      },
      {
        id: "p5",
        pregunta: "¿Cómo se dice '我父母的父母' en español?",
        preguntaChino: "西班牙语中'我父母的父母'怎么说？",
        respuestaSugerida: "Mis abuelos",
        respuestaSugeridaChino: "Mis abuelos",
      },
      {
        id: "p6",
        pregunta: "¿Qué significa 'familia numerosa'?",
        preguntaChino: "'familia numerosa'是什么意思？",
        respuestaSugerida: "Una familia con muchos hijos.",
        respuestaSugeridaChino: "一个有很多孩子的家庭。",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Habitaciones de la casa",
        tituloChino: "房间",
        descripcion: `Partes de una casa:

🔹 PRINCIPALES:
• salón / sala de estar = living room
• cocina = kitchen
• dormitorio / habitación = bedroom
• baño = bathroom
• comedor = dining room
• estudio / despacho = study / home office

🔹 EXTERIORES Y ADICIONALES:
• terraza / balcón = terrace / balcony
• jardín = garden
• garaje = garage
• sótano = basement
• trastero = storage room
• recibidor / entrada = entrance hall
• pasillo = hallway
• lavadero = laundry room
• buhardilla = attic
• ático = penthouse

🔹 PREGUNTAS SOBRE LA CASA:
• ¿Cómo es tu casa? (What is your house like?)
• ¿Cuántas habitaciones tiene? (How many bedrooms does it have?)
• ¿Tienes terraza? (Do you have a terrace?)
• ¿Tu casa tiene jardín? (Does your house have a garden?)

📌 NOTA CULTURAL:
En España, es común que los pisos tengan un "trastero" (un pequeño almacén en el sótano del edificio) y en muchos edificios hay un "ático" con terraza.`,
        descripcionChino: `房子的各个部分：

🔹 主要部分：
• salón / sala de estar = 客厅
• cocina = 厨房
• dormitorio / habitación = 卧室
• baño = 浴室
• comedor = 餐厅
• estudio / despacho = 书房/家庭办公室

🔹 外部和附加部分：
• terraza / balcón = 露台/阳台
• jardín = 花园
• garaje = 车库
• sótano = 地下室
• trastero = 储藏室
• recibidor / entrada = 门厅/入口
• pasillo = 走廊
• lavadero = 洗衣房
• buhardilla = 阁楼
• ático = 顶层公寓

🔹 关于房子的问题：
• ¿Cómo es tu casa? = 你的房子怎么样？
• ¿Cuántas habitaciones tiene? = 有几个卧室？
• ¿Tienes terraza? = 你有露台吗？
• ¿Tu casa tiene jardín? = 你的房子有花园吗？

📌 文化提示：
在西班牙，公寓通常有一个"trastero"（大楼地下室的小储藏室），许多建筑有带露台的"ático"（顶层公寓）。`,
        ejemplos: [
          {
            espanol: "Mi dormitorio está arriba.",
            chino: "我的卧室在楼上。",
          },
          {
            espanol: "La cocina es muy grande.",
            chino: "厨房很大。",
          },
          {
            espanol: "Tenemos un jardín con flores.",
            chino: "我们有一个带花的花园。",
          },
          {
            espanol: "El salón es muy luminoso.",
            chino: "客厅很明亮。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Muebles y objetos del hogar",
        tituloChino: "家具和家居物品",
        descripcion: `🔹 SALÓN (living room):
• sofá = sofa
• sillón = armchair
• mesa de centro = coffee table
• estantería = bookshelf
• televisión / tele = TV
• lámpara = lamp
• alfombra = rug
• cuadro = painting/picture
• cortinas = curtains
• equipo de música = stereo system

🔹 COCINA (kitchen):
• nevera / frigorífico = refrigerator
• congelador = freezer
• horno = oven
• microondas = microwave
• lavavajillas = dishwasher
• lavadora = washing machine
• secadora = dryer
• fogones / cocina = stove
• fregadero = sink
• mesa = table
• sillas = chairs
• armario = cupboard

🔹 DORMITORIO (bedroom):
• cama = bed
• mesilla / mesita de noche = nightstand
• armario = wardrobe/closet
• cómoda = dresser
• espejo = mirror
• lámpara de mesilla = bedside lamp
• ropero = closet

🔹 BAÑO (bathroom):
• ducha = shower
• bañera = bathtub
• lavabo = sink
• inodoro / váter = toilet
• espejo = mirror
• toallas = towels
• secador de pelo = hair dryer

📌 EJEMPLOS:
• El sofá es muy cómodo.
• Pon la leche en la nevera.
• La cama es de matrimonio.`,
        descripcionChino: `🔹 客厅：
• sofá = 沙发
• sillón = 扶手椅
• mesa de centro = 咖啡桌
• estantería = 书架
• televisión / tele = 电视
• lámpara = 灯
• alfombra = 地毯
• cuadro = 画/图片
• cortinas = 窗帘
• equipo de música = 音响设备

🔹 厨房：
• nevera / frigorífico = 冰箱
• congelador = 冰柜
• horno = 烤箱
• microondas = 微波炉
• lavavajillas = 洗碗机
• lavadora = 洗衣机
• secadora = 烘干机
• fogones / cocina = 炉灶
• fregadero = 水槽
• mesa = 桌子
• sillas = 椅子
• armario = 橱柜

🔹 卧室：
• cama = 床
• mesilla / mesita de noche = 床头柜
• armario = 衣柜
• cómoda = 五斗柜
• espejo = 镜子
• lámpara de mesilla = 床头灯
• ropero = 衣橱

🔹 浴室：
• ducha = 淋浴
• bañera = 浴缸
• lavabo = 洗手池
• inodoro / váter = 马桶
• espejo = 镜子
• toallas = 毛巾
• secador de pelo = 吹风机

📌 例子：
• El sofá es muy cómodo. = 这沙发很舒服。
• Pon la leche en la nevera. = 把牛奶放进冰箱。
• La cama es de matrimonio. = 这是双人床。`,
        ejemplos: [
          {
            espanol: "El sofá es muy cómodo.",
            chino: "这沙发很舒服。",
          },
          {
            espanol: "Pon la leche en la nevera.",
            chino: "把牛奶放进冰箱。",
          },
          {
            espanol: "La cama es de matrimonio.",
            chino: "这是双人床。",
          },
          {
            espanol: "Necesito un armario más grande.",
            chino: "我需要一个更大的衣柜。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Preposiciones de lugar",
        tituloChino: "地点介词",
        descripcion: `Preposiciones de lugar para describir dónde están las cosas:

🔹 BÁSICAS:
• en = in / on / at (en la caja, en la mesa)
• sobre / encima de = on top of (sobre la mesa)
• debajo de = under (debajo de la silla)

🔹 POSICIÓN:
• delante de = in front of (delante de la puerta)
• detrás de = behind (detrás del sofá)
• al lado de = next to (al lado de la ventana)
• cerca de = near (cerca del parque)
• lejos de = far from (lejos del centro)
• enfrente de = opposite (enfrente del banco)

🔹 DENTRO/FUERA:
• dentro de = inside (dentro del armario)
• fuera de = outside (fuera de la casa)

🔹 ENTRE:
• entre = between (entre la cama y la ventana)

📌 EJEMPLOS PRÁCTICOS:
• El libro está sobre la mesa.
• El gato está debajo de la silla.
• Vivo cerca del parque.
• El cine está al lado del centro comercial.
• La farmacia está enfrente del banco.`,
        descripcionChino: `描述物品位置的地点介词：

🔹 基本介词：
• en = 在...里面/上面
• sobre / encima de = 在...上面
• debajo de = 在...下面

🔹 位置：
• delante de = 在...前面
• detrás de = 在...后面
• al lado de = 在...旁边
• cerca de = 在...附近
• lejos de = 离...远
• enfrente de = 在...对面

🔹 里面/外面：
• dentro de = 在...里面
• fuera de = 在...外面

🔹 之间：
• entre = 在...之间

📌 实用例子：
• El libro está sobre la mesa. = 书在桌子上。
• El gato está debajo de la silla. = 猫在椅子下面。
• Vivo cerca del parque. = 我住在公园附近。
• El cine está al lado del centro comercial. = 电影院在购物中心旁边。
• La farmacia está enfrente del banco. = 药店在银行对面。`,
        ejemplos: [
          {
            espanol: "El libro está sobre la mesa.",
            chino: "书在桌子上。",
          },
          {
            espanol: "El gato está debajo de la silla.",
            chino: "猫在椅子下面。",
          },
          {
            espanol: "Vivo cerca del parque.",
            chino: "我住在公园附近。",
          },
          {
            espanol: "El supermercado está al lado del banco.",
            chino: "超市在银行旁边。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Describir la casa y la ubicación",
        tituloChino: "描述房子和位置",
        descripcion: `🔹 CÓMO DESCRIBIR UNA CASA:

TAMAÑO:
• Mi casa es grande / pequeña / mediana.
• El piso tiene cien metros cuadrados.
• Tenemos mucho espacio / poco espacio.

NÚMERO DE HABITACIONES:
• Mi apartamento tiene tres dormitorios y dos baños.
• La cocina es muy luminosa.
• El salón es amplio y cómodo.

UBICACIÓN:
• Vivo en el centro de la ciudad.
• Mi casa está cerca del metro.
• El barrio es tranquilo / ruidoso / céntrico.

EXTERIOR:
• Tenemos una terraza grande.
• El jardín es precioso.
• La casa tiene vistas al mar.

🔹 ADJETIVOS ÚTILES:
• luminoso/a = bright
• amplio/a = spacious
• acogedor/a = cozy
• moderno/a = modern
• antiguo/a = old / antique
• reformado/a = renovated
• amueblado/a = furnished
• vacío/a = empty

📌 EJEMPLOS COMPLETOS:
• Vivo en un piso amplio y luminoso en el centro de Madrid.
• Mi casa es pequeña pero muy acogedora.
• El apartamento está amueblado y tiene terraza.
• Vivo en un barrio tranquilo cerca de la playa.`,
        descripcionChino: `🔹 如何描述房子：

大小：
• Mi casa es grande / pequeña / mediana. = 我的房子很大/很小/中等。
• El piso tiene cien metros cuadrados. = 公寓有一百平方米。
• Tenemos mucho espacio / poco espacio. = 我们有很大空间/空间很小。

房间数量：
• Mi apartamento tiene tres dormitorios y dos baños. = 我的公寓有三个卧室和两个浴室。
• La cocina es muy luminosa. = 厨房非常明亮。
• El salón es amplio y cómodo. = 客厅宽敞舒适。

位置：
• Vivo en el centro de la ciudad. = 我住在市中心。
• Mi casa está cerca del metro. = 我的房子在地铁附近。
• El barrio es tranquilo / ruidoso / céntrico. = 社区安静/吵闹/中心化。

外部：
• Tenemos una terraza grande. = 我们有一个大露台。
• El jardín es precioso. = 花园很美。
• La casa tiene vistas al mar. = 房子能看到海景。

🔹 有用的形容词：
• luminoso/a = 明亮的
• amplio/a = 宽敞的
• acogedor/a = 舒适的
• moderno/a = 现代的
• antiguo/a = 古老的/旧的
• reformado/a = 翻新的
• amueblado/a = 带家具的
• vacío/a = 空的

📌 完整例子：
• Vivo en un piso amplio y luminoso en el centro de Madrid. = 我住在马德里市中心一个宽敞明亮的公寓里。
• Mi casa es pequeña pero muy acogedora. = 我的房子很小但很舒适。
• El apartamento está amueblado y tiene terraza. = 公寓带家具，有露台。
• Vivo en un barrio tranquilo cerca de la playa. = 我住在海滩附近一个安静的社区。`,
        ejemplos: [
          {
            espanol: "Mi casa es grande y luminosa.",
            chino: "我的房子又大又明亮。",
          },
          {
            espanol: "El piso tiene tres habitaciones.",
            chino: "公寓有三个房间。",
          },
          {
            espanol: "Vivo en un barrio muy tranquilo.",
            chino: "我住在一个非常安静的社区。",
          },
          {
            espanol: "Mi apartamento está amueblado.",
            chino: "我的公寓带家具。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "casa",
        chino: "房子",
        ejemplo: "Mi casa es grande.",
      },
      {
        id: "v2",
        espanol: "piso / apartamento",
        chino: "公寓",
        ejemplo: "Vivo en un piso.",
      },
      {
        id: "v3",
        espanol: "ático",
        chino: "顶层公寓",
        ejemplo: "Vive en un ático.",
      },
      {
        id: "v4",
        espanol: "chalet",
        chino: "别墅",
        ejemplo: "Tienen un chalet.",
      },
      {
        id: "v5",
        espanol: "salón",
        chino: "客厅",
        ejemplo: "Vamos al salón.",
      },
      {
        id: "v6",
        espanol: "cocina",
        chino: "厨房",
        ejemplo: "Estoy en la cocina.",
      },
      {
        id: "v7",
        espanol: "dormitorio",
        chino: "卧室",
        ejemplo: "Mi dormitorio es azul.",
      },
      {
        id: "v8",
        espanol: "baño",
        chino: "浴室",
        ejemplo: "El baño está ocupado.",
      },
      {
        id: "v9",
        espanol: "comedor",
        chino: "餐厅",
        ejemplo: "Comemos en el comedor.",
      },
      {
        id: "v10",
        espanol: "jardín",
        chino: "花园",
        ejemplo: "El jardín es bonito.",
      },
      {
        id: "v11",
        espanol: "terraza",
        chino: "露台",
        ejemplo: "Cenamos en la terraza.",
      },
      {
        id: "v12",
        espanol: "garaje",
        chino: "车库",
        ejemplo: "El coche está en el garaje.",
      },
      {
        id: "v13",
        espanol: "sofá",
        chino: "沙发",
        ejemplo: "El sofá es nuevo.",
      },
      {
        id: "v14",
        espanol: "mesa",
        chino: "桌子",
        ejemplo: "La mesa es de madera.",
      },
      {
        id: "v15",
        espanol: "silla",
        chino: "椅子",
        ejemplo: "Siéntate en la silla.",
      },
      {
        id: "v16",
        espanol: "cama",
        chino: "床",
        ejemplo: "Hago la cama cada día.",
      },
      {
        id: "v17",
        espanol: "armario",
        chino: "衣柜",
        ejemplo: "La ropa está en el armario.",
      },
      {
        id: "v18",
        espanol: "nevera",
        chino: "冰箱",
        ejemplo: "Hay comida en la nevera.",
      },
      {
        id: "v19",
        espanol: "televisión",
        chino: "电视",
        ejemplo: "Veo la televisión.",
      },
      {
        id: "v20",
        espanol: "lámpara",
        chino: "灯",
        ejemplo: "Enciende la lámpara.",
      },
      {
        id: "v21",
        espanol: "alfombra",
        chino: "地毯",
        ejemplo: "La alfombra es suave.",
      },
      {
        id: "v22",
        espanol: "cortina",
        chino: "窗帘",
        ejemplo: "Abre las cortinas.",
      },
      {
        id: "v23",
        espanol: "estantería",
        chino: "书架",
        ejemplo: "Los libros están en la estantería.",
      },
      {
        id: "v24",
        espanol: "microondas",
        chino: "微波炉",
        ejemplo: "Caliento la comida en el microondas.",
      },
      {
        id: "v25",
        espanol: "lavadora",
        chino: "洗衣机",
        ejemplo: "Pongo la ropa en la lavadora.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Describiendo la casa",
        tituloChino: "描述房子",
        personajes: ["Ana", "Carlos"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Carlos, ¿te gusta mi nueva casa?",
            traduccion: "卡洛斯，你喜欢我的新房子吗？",
          },
          {
            personaje: "Carlos",
            texto: "¡Sí, es preciosa! ¿Cuántos dormitorios tiene?",
            traduccion: "是的，很漂亮！有几个卧室？",
          },
          {
            personaje: "Ana",
            texto: "Tiene tres dormitorios y dos baños.",
            traduccion: "有三个卧室和两个浴室。",
          },
          {
            personaje: "Carlos",
            texto: "El salón es muy luminoso. Me encanta.",
            traduccion: "客厅很明亮。我喜欢。",
          },
          {
            personaje: "Ana",
            texto: "Sí, y el jardín es perfecto para hacer barbacoas.",
            traduccion: "是的，花园很适合烧烤。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Buscando cosas",
        tituloChino: "寻找东西",
        personajes: ["María", "Pedro"],
        lineas: [
          {
            personaje: "María",
            texto: "Pedro, ¿dónde están las llaves?",
            traduccion: "佩德罗，钥匙在哪里？",
          },
          {
            personaje: "Pedro",
            texto: "Están sobre la mesa del salón.",
            traduccion: "它们在客厅的桌子上。",
          },
          {
            personaje: "María",
            texto: "¿Y mi móvil? No lo encuentro.",
            traduccion: "我的手机呢？我找不到。",
          },
          {
            personaje: "Pedro",
            texto: "Creo que está en el dormitorio, encima de la cama.",
            traduccion: "我想在卧室里，在床上。",
          },
          {
            personaje: "María",
            texto: "Ah, sí. ¡Gracias!",
            traduccion: "啊，是的。谢谢！",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Buscando piso",
        tituloChino: "找房子",
        personajes: ["Laura", "Agente"],
        lineas: [
          {
            personaje: "Laura",
            texto: "Estoy buscando un piso de alquiler.",
            traduccion: "我在找公寓出租。",
          },
          {
            personaje: "Agente",
            texto: "¿Qué tipo de piso buscas?",
            traduccion: "你在找什么样的公寓？",
          },
          {
            personaje: "Laura",
            texto: "Busco un piso pequeño, cerca de la universidad.",
            traduccion: "我在找一个小公寓，靠近大学。",
          },
          {
            personaje: "Agente",
            texto: "Tenemos un estudio en la calle Mayor. Es muy céntrico.",
            traduccion: "我们在马约尔街有一个单间公寓。很市中心。",
          },
          {
            personaje: "Laura",
            texto: "¿Está lejos del metro?",
            traduccion: "离地铁远吗？",
          },
          {
            personaje: "Agente",
            texto: "No, está al lado de la estación.",
            traduccion: "不远，就在地铁站旁边。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Comprando muebles",
        tituloChino: "买家具",
        personajes: ["Sofía", "Vendedor"],
        lineas: [
          {
            personaje: "Sofía",
            texto: "Necesito un sofá para mi salón.",
            traduccion: "我需要一个沙发放在客厅。",
          },
          {
            personaje: "Vendedor",
            texto: "Tenemos estos modelos. ¿Qué tamaño necesita?",
            traduccion: "我们有这些型号。您需要什么尺寸？",
          },
          {
            personaje: "Sofía",
            texto: "El salón es pequeño, necesito algo no muy grande.",
            traduccion: "客厅很小，我需要不太大的。",
          },
          {
            personaje: "Vendedor",
            texto: "Este sofá de dos plazas es perfecto. Es cómodo y moderno.",
            traduccion: "这个双人沙发很完美。舒适又现代。",
          },
          {
            personaje: "Sofía",
            texto: "¿De qué color lo tienen?",
            traduccion: "有什么颜色？",
          },
          {
            personaje: "Vendedor",
            texto: "En gris, beige y azul oscuro.",
            traduccion: "灰色、米色和深蓝色。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Mudanza",
        tituloChino: "搬家",
        personajes: ["David", "Elena"],
        lineas: [
          {
            personaje: "David",
            texto: "Elena, ¿me ayudas con la mudanza el sábado?",
            traduccion: "埃莱娜，星期六你能帮我搬家吗？",
          },
          {
            personaje: "Elena",
            texto: "Claro. ¿Dónde está tu nuevo piso?",
            traduccion: "当然。你的新公寓在哪里？",
          },
          {
            personaje: "David",
            texto: "En el centro, cerca de la plaza mayor.",
            traduccion: "在市中心，靠近主广场。",
          },
          {
            personaje: "Elena",
            texto: "¿Ya tienes todos los muebles?",
            traduccion: "你已经有所有的家具了吗？",
          },
          {
            personaje: "David",
            texto: "Casi. Me falta una nevera y una lavadora.",
            traduccion: "差不多。还缺一个冰箱和一个洗衣机。",
          },
          {
            personaje: "Elena",
            texto: "Podemos comprarlas en la tienda de electrodomésticos.",
            traduccion: "我们可以在电器店买。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "我睡觉的房间是：_____",
          preguntaChino: "我睡觉的房间是：_____",
          respuestaCorrecta: "dormitorio",
          explicacion: "我们在卧室睡觉。",
          pista: "首字母是 d，10个字母",
          numeroLetras: 10,
        },
        {
          id: "c2",
          pregunta: "我做饭的房间是：_____",
          preguntaChino: "我做饭的房间是：_____",
          respuestaCorrecta: "cocina",
          explicacion: "我们在厨房做饭。",
          pista: "首字母是 c，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c3",
          pregunta: "我坐着的东西是：_____",
          preguntaChino: "我坐着的东西是：_____",
          respuestaCorrecta: "silla",
          explicacion: "我们坐在椅子上。",
          pista: "首字母是 s，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c4",
          pregunta: "我放衣服的地方是：_____",
          preguntaChino: "我放衣服的地方是：_____",
          respuestaCorrecta: "armario",
          explicacion: "我们把衣服放在衣柜里。",
          pista: "首字母是 a，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c5",
          pregunta: "为了说'在...旁边'：al _____ de",
          preguntaChino: "为了说'在...旁边'：al _____ de",
          respuestaCorrecta: "lado",
          explicacion: "'Al lado de' = 在...旁边。",
          pista: "首字母是 l，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c6",
          pregunta: "我放食物在冰箱里：La comida está en la _____",
          preguntaChino: "我放食物在冰箱里：La comida está en la _____",
          respuestaCorrecta: "nevera",
          explicacion: "Nevera = 冰箱",
          pista: "首字母是 n，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c7",
          pregunta: "为了说'在...前面'：_____ de",
          preguntaChino: "为了说'在...前面'：_____ de",
          respuestaCorrecta: "delante",
          explicacion: "Delante de = 在...前面",
          pista: "首字母是 d，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c8",
          pregunta: "我洗衣服的机器是：_____",
          preguntaChino: "我洗衣服的机器是：_____",
          respuestaCorrecta: "lavadora",
          explicacion: "Lavadora = 洗衣机",
          pista: "首字母是 l，8个字母",
          numeroLetras: 8,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "我在哪里看电视？",
          preguntaChino: "我在哪里看电视？",
          opciones: ["cocina", "baño", "salón", "garaje"],
          respuestaCorrecta: "salón",
          explicacion: "通常在客厅看电视。",
        },
        {
          id: "s2",
          pregunta: "我把牛奶放在哪里？",
          preguntaChino: "我把牛奶放在哪里？",
          opciones: ["armario", "nevera", "mesa", "silla"],
          respuestaCorrecta: "nevera",
          explicacion: "牛奶放在冰箱里。",
        },
        {
          id: "s3",
          pregunta: "我睡觉的家具是：",
          preguntaChino: "我睡觉的家具是：",
          opciones: ["sofá", "mesa", "cama", "silla"],
          respuestaCorrecta: "cama",
          explicacion: "我们在床上睡觉。",
        },
        {
          id: "s4",
          pregunta: "'Debajo de'是什么意思？",
          preguntaChino: "'Debajo de'是什么意思？",
          opciones: ["在上面", "在下面", "在旁边", "在里面"],
          respuestaCorrecta: "在下面",
          explicacion: "'Debajo de' = 在...下面。",
        },
        {
          id: "s5",
          pregunta: "哪个房间有马桶和淋浴？",
          preguntaChino: "哪个房间有马桶和淋浴？",
          opciones: ["cocina", "dormitorio", "salón", "baño"],
          respuestaCorrecta: "baño",
          explicacion: "浴室有马桶和淋浴。",
        },
        {
          id: "s6",
          pregunta: "¿Qué significa 'terraza'?",
          preguntaChino: "'terraza'是什么意思？",
          opciones: ["阳台", "花园", "车库", "地下室"],
          respuestaCorrecta: "阳台",
          explicacion: "Terraza = 阳台/露台",
        },
        {
          id: "s7",
          pregunta: "¿Dónde se guarda la ropa?",
          preguntaChino: "衣服放在哪里？",
          opciones: ["en el armario", "en la nevera", "en la lavadora", "en el sofá"],
          respuestaCorrecta: "en el armario",
          explicacion: "Ropa en el armario",
        },
        {
          id: "s8",
          pregunta: "¿Qué significa 'al lado de'?",
          preguntaChino: "'al lado de'是什么意思？",
          opciones: ["在对面", "在旁边", "在后面", "在前面"],
          respuestaCorrecta: "在旁边",
          explicacion: "Al lado de = next to",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "我在客厅睡觉。",
          preguntaChino: "我在客厅睡觉。",
          respuestaCorrecta: false,
          explicacion: "错。我们在卧室睡觉。",
        },
        {
          id: "vf2",
          pregunta: "洗衣机通常在厨房或浴室。",
          preguntaChino: "洗衣机通常在厨房或浴室。",
          respuestaCorrecta: true,
          explicacion: "对。洗衣机通常放在厨房或浴室。",
        },
        {
          id: "vf3",
          pregunta: "我在餐厅吃饭。",
          preguntaChino: "我在餐厅吃饭。",
          respuestaCorrecta: true,
          explicacion: "对。餐厅是用来吃饭的。",
        },
        {
          id: "vf4",
          pregunta: "'Sobre' significa 'debajo de'.",
          preguntaChino: "'Sobre'意思是'在...下面'。",
          respuestaCorrecta: false,
          explicacion: "错。'Sobre' = 在...上面。",
        },
        {
          id: "vf5",
          pregunta: "汽车停在车库里。",
          preguntaChino: "汽车停在车库里。",
          respuestaCorrecta: true,
          explicacion: "对。garaje = 车库。",
        },
        {
          id: "vf6",
          pregunta: "El 'ático' está en la última planta.",
          preguntaChino: "El 'ático' 在顶楼。",
          respuestaCorrecta: true,
          explicacion: "对。Ático = penthouse",
        },
        {
          id: "vf7",
          pregunta: "La 'lavadora' se usa para cocinar.",
          preguntaChino: "La 'lavadora' 用于做饭。",
          respuestaCorrecta: false,
          explicacion: "错。Lavadora = 洗衣机",
        },
        {
          id: "vf8",
          pregunta: "'Enfrente de' significa 'in front of'.",
          preguntaChino: "'Enfrente de' 意思是 'in front of'。",
          respuestaCorrecta: true,
          explicacion: "对。Enfrente de = opposite / in front of",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "cocina",
              derecha: "厨房",
            },
            {
              izquierda: "dormitorio",
              derecha: "卧室",
            },
            {
              izquierda: "baño",
              derecha: "浴室",
            },
            {
              izquierda: "salón",
              derecha: "客厅",
            },
            {
              izquierda: "comedor",
              derecha: "餐厅",
            },
            {
              izquierda: "jardín",
              derecha: "花园",
            },
            {
              izquierda: "garaje",
              derecha: "车库",
            },
            {
              izquierda: "terraza",
              derecha: "露台",
            },
            {
              izquierda: "sofá",
              derecha: "沙发",
            },
            {
              izquierda: "mesa",
              derecha: "桌子",
            },
            {
              izquierda: "cama",
              derecha: "床",
            },
            {
              izquierda: "nevera",
              derecha: "冰箱",
            },
            {
              izquierda: "lavadora",
              derecha: "洗衣机",
            },
          ],
          explicacion: "将房间和家具与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["cocina", "La", "grande", "es", "."],
          respuestaCorrecta: "La cocina es grande.",
          explicacion: "正确的句子是：La cocina es grande.（厨房很大。）",
        },
        {
          id: "o2",
          palabras: ["está", "El", "sofá", "salón", "en", "el", "."],
          respuestaCorrecta: "El sofá está en el salón.",
          explicacion: "正确的句子是：El sofá está en el salón.（沙发在客厅里。）",
        },
        {
          id: "o3",
          palabras: ["cama", "Mi", "cómoda", "es", "."],
          respuestaCorrecta: "Mi cama es cómoda.",
          explicacion: "正确的句子是：Mi cama es cómoda.（我的床很舒服。）",
        },
        {
          id: "o4",
          palabras: ["cerca", "está", "parque", "del", "Mi", "casa", "."],
          respuestaCorrecta: "Mi casa está cerca del parque.",
          explicacion: "正确的句子是：Mi casa está cerca del parque.（我的房子在公园附近。）",
        },
        {
          id: "o5",
          palabras: ["dormitorio", "tiene", "Mi", "tres", "apartamento", "."],
          respuestaCorrecta: "Mi apartamento tiene tres dormitorios.",
          explicacion: "正确的句子是：Mi apartamento tiene tres dormitorios.",
        },
        {
          id: "o6",
          palabras: ["debajo", "gato", "El", "está", "silla", "de", "la", "."],
          respuestaCorrecta: "El gato está debajo de la silla.",
          explicacion: "正确的句子是：El gato está debajo de la silla.",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我的房子有三间卧室。",
          respuestaEsperada: "Mi casa tiene tres dormitorios.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "书在桌子上。",
          respuestaEsperada: "El libro está sobre la mesa.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "冰箱里有食物。",
          respuestaEsperada: "Hay comida en la nevera.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "我住在学校附近。",
          respuestaEsperada: "Vivo cerca de la escuela.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "沙发在客厅里。",
          respuestaEsperada: "El sofá está en el salón.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "钥匙在桌子上。",
          respuestaEsperada: "Las llaves están sobre la mesa.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "我的公寓在市中心。",
          respuestaEsperada: "Mi apartamento está en el centro de la ciudad.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "洗衣机在浴室里。",
          respuestaEsperada: "La lavadora está en el baño.",
          explicacion: "西班牙语翻译",
        },
      ],
    },
    ejerciciosPracticos: [
      {
        id: "ep1",
        tipo: "completarDialogo",
        titulo: "完成对话",
        tituloChino: "完成对话",
        instruccion: "用正确的房间和家具词汇完成对话。",
        instruccionChino: "用正确的房间和家具词汇完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿Dónde está la _____?",
            respuesta: "nevera",
          },
          {
            personaje: "B",
            texto: "Está en la _____.",
            respuesta: "cocina",
          },
          {
            personaje: "A",
            texto: "¿Y el _____?",
            respuesta: "sofá",
          },
          {
            personaje: "B",
            texto: "Está en el _____.",
            respuesta: "salón",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "describir",
        titulo: "Describe tu casa ideal",
        tituloChino: "描述你理想的房子",
        instruccion: "Escribe 5-6 frases describiendo tu casa ideal en español.",
        instruccionChino: "用西班牙语写5-6句话描述你理想的房子。",
        ejemplo:
          "Mi casa ideal es grande y luminosa. Tiene tres dormitorios, un jardín y una terraza. La cocina es moderna y el salón es muy acogedor. Está cerca del centro pero en un barrio tranquilo.",
      },
      {
        id: "ep3",
        tipo: "ubicacion",
        titulo: "Describe la ubicación",
        tituloChino: "描述位置",
        instruccion: "Describe dónde están los siguientes objetos usando preposiciones de lugar.",
        instruccionChino: "使用地点介词描述以下物品的位置。",
        objetos: [
          {
            objeto: "el libro",
            ubicacion: "sobre la mesa",
            esperado: "El libro está sobre la mesa.",
          },
          {
            objeto: "el gato",
            ubicacion: "debajo de la silla",
            esperado: "El gato está debajo de la silla.",
          },
          {
            objeto: "las llaves",
            ubicacion: "al lado del teléfono",
            esperado: "Las llaves están al lado del teléfono.",
          },
        ],
      },
      {
        id: "ep4",
        tipo: "completarTabla",
        titulo: "Completa la tabla de muebles",
        tituloChino: "完成家具表格",
        instruccion: "Escribe el nombre del mueble en español.",
        instruccionChino: "用西班牙语写出家具的名称。",
        tabla: [
          {
            habitacion: "salón",
            muebles: "sofá, mesa de centro, estantería, televisión, lámpara",
          },
          {
            habitacion: "cocina",
            muebles: "nevera, horno, microondas, lavadora, mesa, sillas",
          },
          {
            habitacion: "dormitorio",
            muebles: "cama, armario, mesilla, cómoda, espejo",
          },
          {
            habitacion: "baño",
            muebles: "ducha, lavabo, inodoro, espejo, toallas",
          },
        ],
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Cómo es tu casa? Describe las habitaciones.",
        preguntaChino: "你的房子怎么样？描述一下房间。",
        sugerencia: "Mi casa tiene... (dormitorios, cocina, baño, salón)",
        sugerenciaChino: "Mi casa tiene... (dormitorios, cocina, baño, salón)",
      },
      {
        id: "pa2",
        pregunta: "¿Dónde están las cosas en tu habitación?",
        preguntaChino: "你房间里的东西都在哪里？",
        sugerencia: "Mi cama está... Mi armario está...",
        sugerenciaChino: "Mi cama está... Mi armario está...",
      },
      {
        id: "pa3",
        pregunta: "¿Qué hay en tu salón?",
        preguntaChino: "你的客厅里有什么？",
        sugerencia: "En mi salón hay un sofá, una mesa, una televisión...",
        sugerenciaChino: "En mi salón hay un sofá, una mesa, una televisión...",
      },
      {
        id: "pa4",
        pregunta: "¿Qué electrodomésticos tienes en tu cocina?",
        preguntaChino: "你的厨房里有什么电器？",
        sugerencia: "Tengo nevera, microondas, lavadora y horno.",
        sugerenciaChino: "Tengo nevera, microondas, lavadora y horno.",
      },
      {
        id: "pa5",
        pregunta: "¿Prefieres vivir en una casa o en un apartamento? ¿Por qué?",
        preguntaChino: "你更喜欢住房子还是公寓？为什么？",
        sugerencia: "Prefiero vivir en un apartamento porque es más cómodo y céntrico.",
        sugerenciaChino: "Prefiero vivir en un apartamento porque es más cómodo y céntrico.",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '卧室' en español?",
        preguntaChino: "西班牙语中'卧室'怎么说？",
        respuestaSugerida: "dormitorio / habitación",
        respuestaSugeridaChino: "dormitorio / habitación",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '冰箱' en español?",
        preguntaChino: "西班牙语中'冰箱'怎么说？",
        respuestaSugerida: "nevera / frigorífico",
        respuestaSugeridaChino: "nevera / frigorífico",
      },
      {
        id: "p3",
        pregunta: "¿Qué significa 'al lado de'?",
        preguntaChino: "'al lado de'是什么意思？",
        respuestaSugerida: "在旁边",
        respuestaSugeridaChino: "Al lado de = next to",
      },
      {
        id: "p4",
        pregunta: "¿Dónde está tu comedor?",
        preguntaChino: "你的餐厅在哪里？",
        respuestaSugerida: "Mi comedor está al lado de la cocina.",
        respuestaSugeridaChino: "Mi comedor está al lado de la cocina.",
      },
      {
        id: "p5",
        pregunta: "¿Cómo se dice '沙发' en español?",
        preguntaChino: "西班牙语中'沙发'怎么说？",
        respuestaSugerida: "sofá",
        respuestaSugeridaChino: "sofá",
      },
      {
        id: "p6",
        pregunta: "¿Qué significa 'terraza'?",
        preguntaChino: "'terraza'是什么意思？",
        respuestaSugerida: "Un balcón grande o un espacio al aire libre en una casa.",
        respuestaSugeridaChino: "大阳台或房子里的户外空间。",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Expresiones de hambre y sed",
        tituloChino: "饥饿和口渴的表达",
        descripcion: `Expresiones básicas para hablar de hambre y sed:

🔹 HAMBRE (hunger):
• Tengo hambre = I'm hungry
• Tengo mucha hambre = I'm very hungry
• Tengo un hambre de lobo = I'm starving (lit. "wolf hunger")
• Me muero de hambre = I'm dying of hunger
• Me comería un caballo = I could eat a horse

🔹 SED (thirst):
• Tengo sed = I'm thirsty
• Tengo mucha sed = I'm very thirsty
• Estoy sediento/a = I'm thirsty (more formal)
• Me muero de sed = I'm dying of thirst

🔹 LAS COMIDAS DEL DÍA (meals of the day):
• desayuno = breakfast (7:00-10:00)
• almuerzo / comida = lunch (14:00-15:00 en España)
• merienda = afternoon snack (17:00-18:00)
• cena = dinner (21:00-22:00 en España)

🔹 FRASES ÚTILES:
• Vamos a comer = Let's eat
• ¿Qué quieres comer? = What do you want to eat?
• ¿Qué quieres beber? = What do you want to drink?
• ¡Buen provecho! = Enjoy your meal!

📌 NOTA CULTURAL:
En España, la comida principal (el almuerzo) es entre las 14:00 y las 15:00, y la cena es tarde, sobre las 21:00 o 22:00. El desayuno suele ser ligero (café con leche y una tostada o galletas).`,
        descripcionChino: `谈论饥饿和口渴的基本表达：

🔹 饥饿：
• Tengo hambre = 我饿了
• Tengo mucha hambre = 我很饿
• Tengo un hambre de lobo = 我饿极了（字面意思"狼一样的饥饿"）
• Me muero de hambre = 我快饿死了
• Me comería un caballo = 我能吃下一匹马

🔹 口渴：
• Tengo sed = 我渴了
• Tengo mucha sed = 我很渴
• Estoy sediento/a = 我渴了（更正式）
• Me muero de sed = 我快渴死了

🔹 一天中的餐食：
• desayuno = 早餐（7:00-10:00）
• almuerzo / comida = 午餐（西班牙14:00-15:00）
• merienda = 下午茶/点心（17:00-18:00）
• cena = 晚餐（西班牙21:00-22:00）

🔹 有用句子：
• Vamos a comer = 我们去吃饭吧
• ¿Qué quieres comer? = 你想吃什么？
• ¿Qué quieres beber? = 你想喝什么？
• ¡Buen provecho! = 祝你好胃口！

📌 文化提示：
在西班牙，主餐（午餐）在下午2点到3点之间，晚餐很晚，大约在晚上9点或10点。早餐通常很清淡（拿铁咖啡和吐司或饼干）。`,
        ejemplos: [
          {
            espanol: "Tengo hambre. ¿Vamos a comer?",
            chino: "我饿了。我们去吃饭吗？",
          },
          {
            espanol: "Tengo sed. Quiero agua.",
            chino: "我渴了。我想喝水。",
          },
          {
            espanol: "El desayuno es importante.",
            chino: "早餐很重要。",
          },
          {
            espanol: "¡Tengo un hambre de lobo! ¿Qué hay para comer?",
            chino: "我饿极了！有什么吃的？",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Alimentos básicos",
        tituloChino: "基本食物",
        descripcion: `🔹 CARNES (meats):
• pollo = chicken
• carne de res / ternera = beef
• cerdo = pork
• cordero = lamb
• pavo = turkey
• conejo = rabbit

🔹 PESCADOS Y MARISCOS (fish and seafood):
• pescado = fish
• salmón = salmon
• atún = tuna
• sardinas = sardines
• gambas / camarones = shrimp
• mejillones = mussels
• pulpo = octopus

🔹 LÁCTEOS (dairy):
• leche = milk
• queso = cheese
• yogur = yogurt
• mantequilla = butter
• nata = cream

🔹 GRANOS Y PAN (grains and bread):
• pan = bread
• arroz = rice
• pasta = pasta
• harina = flour
• cereales = cereal

🔹 VERDURAS Y HORTALIZAS (vegetables):
• tomate = tomato
• lechuga = lettuce
• zanahoria = carrot
• cebolla = onion
• ajo = garlic
• pimiento = bell pepper
• pepino = cucumber
• brócoli = broccoli
• espinacas = spinach
• patata / papa = potato

🔹 FRUTAS (fruits):
• manzana = apple
• plátano / banana = banana
• naranja = orange
• fresa = strawberry
• uva = grape
• sandía = watermelon
• melón = melon
• piña = pineapple
• pera = pear
• cereza = cherry
• limón = lemon

🔹 OTROS (others):
• huevos = eggs
• sopa = soup
• ensalada = salad
• legumbres = legumes/beans
• lentejas = lentils
• garbanzos = chickpeas

📌 EJEMPLOS:
• Me gusta el pan con mantequilla.
• El pollo es mi carne favorita.
• La fruta es saludable.`,
        descripcionChino: `🔹 肉类：
• pollo = 鸡肉
• carne de res / ternera = 牛肉
• cerdo = 猪肉
• cordero = 羊肉
• pavo = 火鸡
• conejo = 兔肉

🔹 鱼和海鲜：
• pescado = 鱼
• salmón = 三文鱼
• atún = 金枪鱼
• sardinas = 沙丁鱼
• gambas / camarones = 虾
• mejillones = 贻贝
• pulpo = 章鱼

🔹 乳制品：
• leche = 牛奶
• queso = 奶酪
• yogur = 酸奶
• mantequilla = 黄油
• nata = 奶油

🔹 谷物和面包：
• pan = 面包
• arroz = 米饭
• pasta = 意大利面
• harina = 面粉
• cereales = 麦片

🔹 蔬菜：
• tomate = 西红柿
• lechuga = 生菜
• zanahoria = 胡萝卜
• cebolla = 洋葱
• ajo = 大蒜
• pimiento = 甜椒
• pepino = 黄瓜
• brócoli = 西兰花
• espinacas = 菠菜
• patata / papa = 土豆

🔹 水果：
• manzana = 苹果
• plátano / banana = 香蕉
• naranja = 橙子
• fresa = 草莓
• uva = 葡萄
• sandía = 西瓜
• melón = 甜瓜
• piña = 菠萝
• pera = 梨
• cereza = 樱桃
• limón = 柠檬

🔹 其他：
• huevos = 鸡蛋
• sopa = 汤
• ensalada = 沙拉
• legumbres = 豆类
• lentejas = 扁豆
• garbanzos = 鹰嘴豆

📌 例子：
• Me gusta el pan con mantequilla. = 我喜欢黄油面包。
• El pollo es mi carne favorita. = 鸡肉是我最喜欢的肉。
• La fruta es saludable. = 水果很健康。`,
        ejemplos: [
          {
            espanol: "Me gusta el pan con mantequilla.",
            chino: "我喜欢黄油面包。",
          },
          {
            espanol: "El pollo es mi carne favorita.",
            chino: "鸡肉是我最喜欢的肉。",
          },
          {
            espanol: "La fruta es saludable.",
            chino: "水果很健康。",
          },
          {
            espanol: "Para la ensalada necesito tomate, lechuga y cebolla.",
            chino: "做沙拉我需要西红柿、生菜和洋葱。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Bebidas",
        tituloChino: "饮料",
        descripcion: `🔹 BEBIDAS CALIENTES (hot drinks):
• café = coffee
• café con leche = coffee with milk / latte
• café solo = black coffee
• té = tea
• té verde = green tea
• té negro = black tea
• manzanilla = chamomile tea
• chocolate caliente = hot chocolate

🔹 BEBIDAS FRÍAS (cold drinks):
• agua = water
• agua con gas = sparkling water
• agua sin gas = still water
• zumo / jugo = juice
• zumo de naranja = orange juice
• zumo de manzana = apple juice
• refresco = soda / soft drink
• coca-cola = Coca-Cola
• cerveza = beer
• vino = wine
• vino tinto = red wine
• vino blanco = white wine
• vino rosado = rosé wine
• cava = sparkling wine (Spanish champagne)
• sangría = sangria

🔹 FRASES PARA PEDIR (ordering phrases):
• Un vaso de agua, por favor. = A glass of water, please.
• Una copa de vino, por favor. = A glass of wine, please.
• Un café con leche, por favor. = A latte, please.
• Una cerveza, por favor. = A beer, please.
• ¿Me pone un zumo de naranja? = Can I have an orange juice? (Spain)

📌 NOTA: En España, es muy común pedir "un café" después de comer. El "café solo" es espresso, y el "café con leche" es similar al latte.`,
        descripcionChino: `🔹 热饮：
• café = 咖啡
• café con leche = 拿铁
• café solo = 黑咖啡
• té = 茶
• té verde = 绿茶
• té negro = 红茶
• manzanilla = 洋甘菊茶
• chocolate caliente = 热巧克力

🔹 冷饮：
• agua = 水
• agua con gas = 气泡水
• agua sin gas = 纯净水
• zumo / jugo = 果汁
• zumo de naranja = 橙汁
• zumo de manzana = 苹果汁
• refresco = 汽水
• coca-cola = 可口可乐
• cerveza = 啤酒
• vino = 葡萄酒
• vino tinto = 红葡萄酒
• vino blanco = 白葡萄酒
• vino rosado = 桃红葡萄酒
• cava = 卡瓦酒（西班牙起泡酒）
• sangría = 桑格利亚

🔹 点单句子：
• Un vaso de agua, por favor. = 请给我一杯水。
• Una copa de vino, por favor. = 请给我一杯葡萄酒。
• Un café con leche, por favor. = 请给我一杯拿铁。
• Una cerveza, por favor. = 请给我一杯啤酒。
• ¿Me pone un zumo de naranja? = 能给我一杯橙汁吗？（西班牙）

📌 注意：在西班牙，饭后喝"un café"很常见。"Café solo"是浓缩咖啡，"café con leche"类似于拿铁。`,
        ejemplos: [
          {
            espanol: "Para beber, un café, por favor.",
            chino: "喝的，请给我一杯咖啡。",
          },
          {
            espanol: "¿Agua con gas o sin gas?",
            chino: "气泡水还是纯净水？",
          },
          {
            espanol: "En España se bebe mucho vino.",
            chino: "西班牙人喝很多葡萄酒。",
          },
          {
            espanol: "Una sangría para compartir, por favor.",
            chino: "请来一杯分享的桑格利亚。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "En el restaurante - Cómo pedir",
        tituloChino: "在餐厅 - 如何点餐",
        descripcion: `🔹 ANTES DE PEDIR (before ordering):
• ¿Me trae la carta, por favor? = Can you bring me the menu, please?
• ¿Cuál es el plato del día? = What is the dish of the day?
• ¿Qué me recomienda? = What do you recommend?
• ¿Tienen opciones vegetarianas? = Do you have vegetarian options?

🔹 CÓMO PEDIR (how to order):
• Para empezar, quiero... = To start, I want...
• De primero, voy a tomar... = For the first course, I'll have...
• De segundo, quiero... = For the main course, I want...
• De postre, me gustaría... = For dessert, I'd like...
• Para beber, voy a tomar... = To drink, I'll have...

🔹 PREGUNTAR SOBRE LOS INGREDIENTES:
• ¿Qué lleva este plato? = What does this dish contain?
• ¿Es picante? = Is it spicy?
• ¿Lleva carne / pescado / verduras? = Does it have meat/fish/vegetables?

🔹 PARA VEGETARIANOS:
• Soy vegetariano/a = I'm vegetarian
• Soy vegano/a = I'm vegan
• ¿Tiene opciones vegetarianas? = Do you have vegetarian options?
• ¿Puede hacerlo sin carne? = Can you make it without meat?

🔹 DURANTE LA COMIDA:
• Está muy bueno / delicioso = It's very good / delicious
• Está frío / caliente = It's cold / hot
• ¿Me puede traer más pan? = Can you bring me more bread?

🔹 AL FINALIZAR:
• ¿Me puede traer la cuenta? = Can you bring me the check?
• La cuenta, por favor. = The bill, please.
• ¿Aceptan tarjeta? = Do you accept card?
• ¿Puedo pagar en efectivo? = Can I pay in cash?
• ¿Lleva servicio incluido? = Is service included?
• Quédese con el cambio = Keep the change (dejar propina)`,
        descripcionChino: `🔹 点餐前：
• ¿Me trae la carta, por favor? = 请给我菜单好吗？
• ¿Cuál es el plato del día? = 今日特色菜是什么？
• ¿Qué me recomienda? = 您推荐什么？
• ¿Tienen opciones vegetarianas? = 有素食选择吗？

🔹 如何点餐：
• Para empezar, quiero... = 作为前菜，我想要...
• De primero, voy a tomar... = 第一道菜，我要...
• De segundo, quiero... = 主菜，我想要...
• De postre, me gustaría... = 甜点，我想要...
• Para beber, voy a tomar... = 饮料，我要...

🔹 询问食材：
• ¿Qué lleva este plato? = 这道菜里有什么？
• ¿Es picante? = 这道菜辣吗？
• ¿Lleva carne / pescado / verduras? = 里面有肉/鱼/蔬菜吗？

🔹 素食者用语：
• Soy vegetariano/a = 我是素食者
• Soy vegano/a = 我是纯素食者
• ¿Tiene opciones vegetarianas? = 有素食选项吗？
• ¿Puede hacerlo sin carne? = 可以不加肉吗？

🔹 用餐期间：
• Está muy bueno / delicioso = 很好吃/很美味
• Está frío / caliente = 凉了/热了
• ¿Me puede traer más pan? = 能再给我一些面包吗？

🔹 用餐结束：
• ¿Me puede traer la cuenta? = 可以给我账单吗？
• La cuenta, por favor. = 请结账。
• ¿Aceptan tarjeta? = 可以刷卡吗？
• ¿Puedo pagar en efectivo? = 可以用现金支付吗？
• ¿Lleva servicio incluido? = 包含服务费吗？
• Quédese con el cambio = 零钱不用找了（给小费）`,
        ejemplos: [
          {
            espanol: "¿Qué me recomienda? — La paella está muy buena.",
            chino: "您推荐什么？—海鲜饭很好吃。",
          },
          {
            espanol: "De primero, una ensalada. De segundo, pollo asado.",
            chino: "第一道菜，一份沙拉。主菜，烤鸡。",
          },
          {
            espanol: "Soy vegetariano, ¿tienen algo sin carne?",
            chino: "我是素食者，有不吃肉的吗？",
          },
          {
            espanol: "La cuenta, por favor. ¿Aceptan tarjeta?",
            chino: "请结账。可以刷卡吗？",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "hambre",
        chino: "饥饿",
        ejemplo: "Tengo hambre.",
      },
      {
        id: "v2",
        espanol: "sed",
        chino: "口渴",
        ejemplo: "Tengo sed.",
      },
      {
        id: "v3",
        espanol: "desayuno",
        chino: "早餐",
        ejemplo: "El desayuno es a las ocho.",
      },
      {
        id: "v4",
        espanol: "almuerzo / comida",
        chino: "午餐",
        ejemplo: "El almuerzo es a la una.",
      },
      {
        id: "v5",
        espanol: "merienda",
        chino: "下午茶",
        ejemplo: "La merienda es a las cinco.",
      },
      {
        id: "v6",
        espanol: "cena",
        chino: "晚餐",
        ejemplo: "La cena es a las nueve.",
      },
      {
        id: "v7",
        espanol: "pollo",
        chino: "鸡肉",
        ejemplo: "Como pollo asado.",
      },
      {
        id: "v8",
        espanol: "carne",
        chino: "肉",
        ejemplo: "No como carne roja.",
      },
      {
        id: "v9",
        espanol: "pescado",
        chino: "鱼",
        ejemplo: "Me gusta el pescado.",
      },
      {
        id: "v10",
        espanol: "pan",
        chino: "面包",
        ejemplo: "Una barra de pan.",
      },
      {
        id: "v11",
        espanol: "arroz",
        chino: "米饭",
        ejemplo: "Me gusta el arroz.",
      },
      {
        id: "v12",
        espanol: "pasta",
        chino: "意大利面",
        ejemplo: "Pasta con salsa de tomate.",
      },
      {
        id: "v13",
        espanol: "tomate",
        chino: "西红柿",
        ejemplo: "La ensalada lleva tomate.",
      },
      {
        id: "v14",
        espanol: "lechuga",
        chino: "生菜",
        ejemplo: "La lechuga es verde.",
      },
      {
        id: "v15",
        espanol: "zanahoria",
        chino: "胡萝卜",
        ejemplo: "Las zanahorias son anaranjadas.",
      },
      {
        id: "v16",
        espanol: "cebolla",
        chino: "洋葱",
        ejemplo: "La cebolla hace llorar.",
      },
      {
        id: "v17",
        espanol: "manzana",
        chino: "苹果",
        ejemplo: "Una manzana al día.",
      },
      {
        id: "v18",
        espanol: "plátano",
        chino: "香蕉",
        ejemplo: "El plátano está maduro.",
      },
      {
        id: "v19",
        espanol: "naranja",
        chino: "橙子",
        ejemplo: "Zumo de naranja.",
      },
      {
        id: "v20",
        espanol: "fresa",
        chino: "草莓",
        ejemplo: "Fresas con nata.",
      },
      {
        id: "v21",
        espanol: "uva",
        chino: "葡萄",
        ejemplo: "Uvas para Nochevieja.",
      },
      {
        id: "v22",
        espanol: "sandía",
        chino: "西瓜",
        ejemplo: "Sandía muy fresca.",
      },
      {
        id: "v23",
        espanol: "huevos",
        chino: "鸡蛋",
        ejemplo: "Huevos fritos.",
      },
      {
        id: "v24",
        espanol: "sopa",
        chino: "汤",
        ejemplo: "Sopa de verduras.",
      },
      {
        id: "v25",
        espanol: "ensalada",
        chino: "沙拉",
        ejemplo: "Ensalada mixta.",
      },
      {
        id: "v26",
        espanol: "agua",
        chino: "水",
        ejemplo: "Un vaso de agua.",
      },
      {
        id: "v27",
        espanol: "café",
        chino: "咖啡",
        ejemplo: "Café con leche.",
      },
      {
        id: "v28",
        espanol: "té",
        chino: "茶",
        ejemplo: "Té con limón.",
      },
      {
        id: "v29",
        espanol: "zumo / jugo",
        chino: "果汁",
        ejemplo: "Zumo de naranja natural.",
      },
      {
        id: "v30",
        espanol: "cerveza",
        chino: "啤酒",
        ejemplo: "Una cerveza fría.",
      },
      {
        id: "v31",
        espanol: "vino",
        chino: "葡萄酒",
        ejemplo: "Vino tinto español.",
      },
      {
        id: "v32",
        espanol: "sangría",
        chino: "桑格利亚",
        ejemplo: "Una jarra de sangría.",
      },
      {
        id: "v33",
        espanol: "vegetariano",
        chino: "素食者",
        ejemplo: "Soy vegetariano.",
      },
      {
        id: "v34",
        espanol: "¡Buen provecho!",
        chino: "祝你好胃口！",
        ejemplo: "¡Buen provecho, amigos!",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "En el restaurante",
        tituloChino: "在餐厅",
        personajes: ["Cliente", "Camarero"],
        lineas: [
          {
            personaje: "Camarero",
            texto: "Buenas tardes. ¿Qué van a tomar?",
            traduccion: "下午好。你们要点什么？",
          },
          {
            personaje: "Cliente",
            texto: "Tengo mucha hambre. ¿Qué me recomienda?",
            traduccion: "我很饿。您推荐什么？",
          },
          {
            personaje: "Camarero",
            texto: "El pollo asado es muy bueno.",
            traduccion: "烤鸡很好吃。",
          },
          {
            personaje: "Cliente",
            texto: "Perfecto. Pollo asado y una ensalada.",
            traduccion: "很好。烤鸡和一份沙拉。",
          },
          {
            personaje: "Camarero",
            texto: "¿Y para beber?",
            traduccion: "喝的呢？",
          },
          {
            personaje: "Cliente",
            texto: "Un vaso de agua y una copa de vino tinto.",
            traduccion: "一杯水和一杯红葡萄酒。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "En casa preparando la comida",
        tituloChino: "在家准备饭菜",
        personajes: ["María", "Pedro"],
        lineas: [
          {
            personaje: "María",
            texto: "Pedro, ¿tienes hambre?",
            traduccion: "佩德罗，你饿了吗？",
          },
          {
            personaje: "Pedro",
            texto: "Sí, mucha. ¿Qué hay para comer?",
            traduccion: "是的，很饿。有什么吃的？",
          },
          {
            personaje: "María",
            texto: "Hay arroz con pollo y ensalada.",
            traduccion: "有鸡肉饭和沙拉。",
          },
          {
            personaje: "Pedro",
            texto: "¡Perfecto! También tengo sed. ¿Hay algo de beber?",
            traduccion: "太好了！我还渴了。有什么喝的吗？",
          },
          {
            personaje: "María",
            texto: "Hay agua, zumo de naranja y cerveza.",
            traduccion: "有水、橙汁和啤酒。",
          },
          {
            personaje: "Pedro",
            texto: "Un zumo de naranja, por favor.",
            traduccion: "请给我一杯橙汁。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "En una cafetería",
        tituloChino: "在咖啡馆",
        personajes: ["Ana", "Camarero"],
        lineas: [
          {
            personaje: "Camarero",
            texto: "Buenos días. ¿Qué desea tomar?",
            traduccion: "早上好。您想喝什么？",
          },
          {
            personaje: "Ana",
            texto: "Un café con leche, por favor.",
            traduccion: "请给我一杯拿铁。",
          },
          {
            personaje: "Camarero",
            texto: "¿Algo para comer?",
            traduccion: "有吃的吗？",
          },
          {
            personaje: "Ana",
            texto: "Un croissant también, por favor.",
            traduccion: "还要一个牛角面包。",
          },
          {
            personaje: "Camarero",
            texto: "¿Quiere el croissant caliente?",
            traduccion: "牛角面包要热的吗？",
          },
          {
            personaje: "Ana",
            texto: "Sí, caliente. Gracias.",
            traduccion: "是的，热的。谢谢。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Cliente vegetariano en un restaurante",
        tituloChino: "素食者在餐厅",
        personajes: ["Cliente", "Camarero"],
        lineas: [
          {
            personaje: "Cliente",
            texto: "Buenas noches. Soy vegetariano. ¿Qué me recomienda?",
            traduccion: "晚上好。我是素食者。您推荐什么？",
          },
          {
            personaje: "Camarero",
            texto: "Tenemos una ensalada mixta, verduras a la plancha y pasta con tomate.",
            traduccion: "我们有混合沙拉、烤蔬菜和番茄意面。",
          },
          {
            personaje: "Cliente",
            texto: "La pasta, ¿qué lleva exactamente?",
            traduccion: "意面，具体有什么？",
          },
          {
            personaje: "Camarero",
            texto: "Lleva tomate, albahaca, ajo y aceite de oliva.",
            traduccion: "有西红柿、罗勒、大蒜和橄榄油。",
          },
          {
            personaje: "Cliente",
            texto: "Perfecto. La pasta para mí. Y de beber, una cerveza sin alcohol.",
            traduccion: "完美。给我意面。喝的无酒精啤酒。",
          },
          {
            personaje: "Camarero",
            texto: "Muy bien. Enseguida le traigo la comida.",
            traduccion: "很好。马上给您上菜。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Después de comer - La cuenta",
        tituloChino: "用餐后 - 结账",
        personajes: ["Cliente", "Camarero"],
        lineas: [
          {
            personaje: "Cliente",
            texto: "La comida ha estado deliciosa. ¡Buen provecho a todos!",
            traduccion: "食物很美味。祝大家好胃口！",
          },
          {
            personaje: "Camarero",
            texto: "Me alegra que les haya gustado. ¿Algo más?",
            traduccion: "很高兴你们喜欢。还要别的吗？",
          },
          {
            personaje: "Cliente",
            texto: "No, gracias. ¿Me puede traer la cuenta, por favor?",
            traduccion: "不用了，谢谢。请给我账单好吗？",
          },
          {
            personaje: "Camarero",
            texto: "Claro. Enseguida se la traigo.",
            traduccion: "当然。马上给您拿来。",
          },
          {
            personaje: "Camarero",
            texto: "Son cuarenta y cinco euros.",
            traduccion: "四十五欧元。",
          },
          {
            personaje: "Cliente",
            texto: "Aquí tiene cincuenta. Quédese con el cambio.",
            traduccion: "给您五十。零钱不用找了。",
          },
          {
            personaje: "Camarero",
            texto: "¡Muchas gracias! ¡Hasta luego!",
            traduccion: "非常感谢！再见！",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "早上我们吃：_____",
          preguntaChino: "早上我们吃：_____",
          respuestaCorrecta: "desayuno",
          explicacion: "早餐在早上吃。",
          pista: "首字母是 d，8个字母",
          numeroLetras: 8,
        },
        {
          id: "c2",
          pregunta: "当我们需要食物时说：_____ hambre",
          preguntaChino: "当我们需要食物时说：_____ hambre",
          respuestaCorrecta: "Tengo",
          explicacion: "'Tengo hambre' = 我饿了。",
          pista: "首字母是 T，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c3",
          pregunta: "当我们需要水时说：_____ sed",
          preguntaChino: "当我们需要水时说：_____ sed",
          respuestaCorrecta: "Tengo",
          explicacion: "'Tengo sed' = 我渴了。",
          pista: "首字母是 T，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c4",
          pregunta: "红色的水果是：_____",
          preguntaChino: "红色的水果是：_____",
          respuestaCorrecta: "manzana",
          explicacion: "苹果可以是红色的。",
          pista: "首字母是 m，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c5",
          pregunta: "为了向服务员要水：Un _____ de agua, por favor",
          preguntaChino: "为了向服务员要水：Un _____ de agua, por favor",
          respuestaCorrecta: "vaso",
          explicacion: "'Un vaso de agua' = 一杯水。",
          pista: "首字母是 v，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c6",
          pregunta: "黄色的长条形水果是：_____",
          preguntaChino: "黄色的长条形水果是：_____",
          respuestaCorrecta: "plátano",
          explicacion: "Plátano = 香蕉",
          pista: "首字母是 p，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c7",
          pregunta: "西班牙的国民饮料之一是：_____",
          preguntaChino: "西班牙的国民饮料之一是：_____",
          respuestaCorrecta: "sangría",
          explicacion: "Sangría = 桑格利亚",
          pista: "首字母是 s，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c8",
          pregunta: "为了说'祝你好胃口'：¡Buen _____!",
          preguntaChino: "为了说'祝你好胃口'：¡Buen _____!",
          respuestaCorrecta: "provecho",
          explicacion: "¡Buen provecho! = 祝你好胃口！",
          pista: "首字母是 p，7个字母",
          numeroLetras: 7,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "当我们想喝东西时说什么？",
          preguntaChino: "当我们想喝东西时说什么？",
          opciones: ["Tengo hambre", "Tengo sed", "Tengo frío", "Tengo calor"],
          respuestaCorrecta: "Tengo sed",
          explicacion: "'Tengo sed' = 我渴了。",
        },
        {
          id: "s2",
          pregunta: "哪个是饮料？",
          preguntaChino: "哪个是饮料？",
          opciones: ["pan", "arroz", "agua", "pollo"],
          respuestaCorrecta: "agua",
          explicacion: "水是一种饮料。",
        },
        {
          id: "s3",
          pregunta: "黄色的长条形水果是：",
          preguntaChino: "黄色的长条形水果是：",
          opciones: ["manzana", "naranja", "plátano", "fresa"],
          respuestaCorrecta: "plátano",
          explicacion: "香蕉是黄色的、长条形的。",
        },
        {
          id: "s4",
          pregunta: "哪种饮料是热的，早上喝的？",
          preguntaChino: "哪种饮料是热的，早上喝的？",
          opciones: ["cerveza", "agua", "café", "refresco"],
          respuestaCorrecta: "café",
          explicacion: "咖啡是热饮，通常在早上喝。",
        },
        {
          id: "s5",
          pregunta: "'¡Buen provecho!'是什么意思？",
          preguntaChino: "'¡Buen provecho!'是什么意思？",
          opciones: ["祝你好胃口", "谢谢", "再见", "你好"],
          respuestaCorrecta: "祝你好胃口",
          explicacion: "'¡Buen provecho!' = 祝你好胃口！",
        },
        {
          id: "s6",
          pregunta: "¿Qué significa 'Tengo un hambre de lobo'?",
          preguntaChino: "'Tengo un hambre de lobo'是什么意思？",
          opciones: ["我很饱", "我很饿", "我很渴", "我很困"],
          respuestaCorrecta: "我很饿",
          explicacion: "Expresión para decir que se tiene mucha hambre.",
        },
        {
          id: "s7",
          pregunta: "¿Cuál es la comida principal en España?",
          preguntaChino: "西班牙的主餐是什么？",
          opciones: ["desayuno", "almuerzo/comida", "merienda", "cena"],
          respuestaCorrecta: "almuerzo/comida",
          explicacion: "El almuerzo es la comida más importante.",
        },
        {
          id: "s8",
          pregunta: "¿Qué bebida se hace con vino y fruta?",
          preguntaChino: "什么饮料用葡萄酒和水果制作？",
          opciones: ["cerveza", "cava", "sangría", "zumo"],
          respuestaCorrecta: "sangría",
          explicacion: "Sangría = vino + fruta",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Tengo hambre'意思是我想吃东西。",
          preguntaChino: "'Tengo hambre'意思是我想吃东西。",
          respuestaCorrecta: true,
          explicacion: "对。'Tengo hambre' = 我饿了。",
        },
        {
          id: "vf2",
          pregunta: "咖啡是一餐饭。",
          preguntaChino: "咖啡是一餐饭。",
          respuestaCorrecta: false,
          explicacion: "错。咖啡是一种饮料。",
        },
        {
          id: "vf3",
          pregunta: "鱼是一种肉。",
          preguntaChino: "鱼是一种肉。",
          respuestaCorrecta: true,
          explicacion: "对。鱼通常被认为是肉类/蛋白质。",
        },
        {
          id: "vf4",
          pregunta: "苹果是一种水果。",
          preguntaChino: "苹果是一种水果。",
          respuestaCorrecta: true,
          explicacion: "对。苹果是水果。",
        },
        {
          id: "vf5",
          pregunta: "晚餐在早上吃。",
          preguntaChino: "晚餐在早上吃。",
          respuestaCorrecta: false,
          explicacion: "错。晚餐在晚上吃。",
        },
        {
          id: "vf6",
          pregunta: "En España, la cena se come temprano (sobre las 18:00).",
          preguntaChino: "在西班牙，晚餐吃得早（大约18:00）。",
          respuestaCorrecta: false,
          explicacion: "错。En España se cena tarde (21:00-22:00).",
        },
        {
          id: "vf7",
          pregunta: "El 'café con leche' es una bebida muy común en España.",
          preguntaChino: "'Café con leche'在西班牙是很常见的饮料。",
          respuestaCorrecta: true,
          explicacion: "对。Es el desayuno típico.",
        },
        {
          id: "vf8",
          pregunta: "Un vegetariano no come carne, pero puede comer pescado.",
          preguntaChino: "素食者不吃肉，但可以吃鱼。",
          respuestaCorrecta: false,
          explicacion: "错。Un vegetariano no come carne ni pescado.",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "desayuno",
              derecha: "早餐",
            },
            {
              izquierda: "almuerzo / comida",
              derecha: "午餐",
            },
            {
              izquierda: "merienda",
              derecha: "下午茶",
            },
            {
              izquierda: "cena",
              derecha: "晚餐",
            },
            {
              izquierda: "tengo hambre",
              derecha: "我饿了",
            },
            {
              izquierda: "tengo sed",
              derecha: "我渴了",
            },
            {
              izquierda: "agua",
              derecha: "水",
            },
            {
              izquierda: "café",
              derecha: "咖啡",
            },
            {
              izquierda: "manzana",
              derecha: "苹果",
            },
            {
              izquierda: "plátano",
              derecha: "香蕉",
            },
            {
              izquierda: "naranja",
              derecha: "橙子",
            },
            {
              izquierda: "pollo",
              derecha: "鸡肉",
            },
            {
              izquierda: "pescado",
              derecha: "鱼",
            },
            {
              izquierda: "ensalada",
              derecha: "沙拉",
            },
            {
              izquierda: "sopa",
              derecha: "汤",
            },
            {
              izquierda: "vino",
              derecha: "葡萄酒",
            },
            {
              izquierda: "cerveza",
              derecha: "啤酒",
            },
            {
              izquierda: "¡Buen provecho!",
              derecha: "祝你好胃口",
            },
          ],
          explicacion: "将食物和饮料词汇与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["hambre", "Tengo", "."],
          respuestaCorrecta: "Tengo hambre.",
          explicacion: "正确的句子是：Tengo hambre.（我饿了。）",
        },
        {
          id: "o2",
          palabras: ["agua", "Un", "de", "vaso", "favor", "por", "."],
          respuestaCorrecta: "Un vaso de agua, por favor.",
          explicacion: "正确的句子是：Un vaso de agua, por favor.（请给我一杯水。）",
        },
        {
          id: "o3",
          palabras: ["comer", "Vamos", "a", "."],
          respuestaCorrecta: "Vamos a comer.",
          explicacion: "正确的句子是：Vamos a comer.（我们去吃饭吧。）",
        },
        {
          id: "o4",
          palabras: ["vegetariano", "soy", "Soy", "no", "carne", "como", "que", "y", "pescado"],
          respuestaCorrecta: "Soy vegetariano, no como carne ni pescado.",
          explicacion: "正确的句子是：Soy vegetariano, no como carne ni pescado.",
        },
        {
          id: "o5",
          palabras: ["cuenta", "traer", "puede", "me", "la", "¿", "?"],
          respuestaCorrecta: "¿Me puede traer la cuenta?",
          explicacion: "正确的句子是：¿Me puede traer la cuenta?",
        },
        {
          id: "o6",
          palabras: ["de", "zumo", "naranja", "Un", "favor", "por", "."],
          respuestaCorrecta: "Un zumo de naranja, por favor.",
          explicacion: "正确的顺序是：Un zumo de naranja, por favor.",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我饿了。我们去吃饭吧。",
          respuestaEsperada: "Tengo hambre. Vamos a comer.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "我想要一杯咖啡加牛奶。",
          respuestaEsperada: "Quiero un café con leche.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "你喜欢吃水果吗？我喜欢苹果和香蕉。",
          respuestaEsperada: "¿Te gusta la fruta? Me gustan las manzanas y los plátanos.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "请给我一杯水。",
          respuestaEsperada: "Un vaso de agua, por favor.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "我是素食者，我不吃肉也不吃鱼。",
          respuestaEsperada: "Soy vegetariano, no como carne ni pescado.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "今天有什么特色菜？",
          respuestaEsperada: "¿Cuál es el plato del día?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "我饿极了。我能吃下一匹马。",
          respuestaEsperada: "Tengo un hambre de lobo. Me comería un caballo.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "祝你好胃口！谢谢，你也是！",
          respuestaEsperada: "¡Buen provecho! —¡Gracias, igualmente!",
          explicacion: "西班牙语翻译",
        },
      ],
    },
    ejerciciosPracticos: [
      {
        id: "ep1",
        tipo: "completarDialogo",
        titulo: "完成对话",
        tituloChino: "完成对话",
        instruccion: "用食物和饮料词汇完成对话。",
        instruccionChino: "用食物和饮料词汇完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿Qué vas a _____?",
            respuesta: "comer",
          },
          {
            personaje: "B",
            texto: "_____ hambre. Quiero _____.",
            respuesta: "Tengo / pollo",
          },
          {
            personaje: "A",
            texto: "¿Y para _____?",
            respuesta: "beber",
          },
          {
            personaje: "B",
            texto: "Un _____ de _____, por favor.",
            respuesta: "vaso / agua",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "clasificar",
        titulo: "Clasifica los alimentos",
        tituloChino: "分类食物",
        instruccion: "Clasifica los siguientes alimentos en frutas, verduras, carnes o bebidas.",
        instruccionChino: "将以下食物分类为水果、蔬菜、肉类或饮料。",
        items: [
          {
            item: "manzana",
            categoria: "fruta",
          },
          {
            item: "pollo",
            categoria: "carne",
          },
          {
            item: "zanahoria",
            categoria: "verdura",
          },
          {
            item: "café",
            categoria: "bebida",
          },
          {
            item: "plátano",
            categoria: "fruta",
          },
          {
            item: "pescado",
            categoria: "carne",
          },
          {
            item: "lechuga",
            categoria: "verdura",
          },
          {
            item: "vino",
            categoria: "bebida",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "crearMenu",
        titulo: "Crea tu menú",
        tituloChino: "创建你的菜单",
        instruccion: "Escribe un menú completo en español (primer plato, segundo plato, postre y bebida).",
        instruccionChino: "用西班牙语写一个完整的菜单（前菜、主菜、甜点和饮料）。",
        ejemplo:
          "De primero: ensalada mixta. De segundo: pollo asado con patatas. De postre: flan. Para beber: agua y vino tinto.",
      },
      {
        id: "ep4",
        tipo: "responder",
        titulo: "Responde las preguntas",
        tituloChino: "回答问题",
        instruccion: "Responde las siguientes preguntas sobre comida y bebida en español.",
        instruccionChino: "用西班牙语回答以下关于食物和饮料的问题。",
        preguntas: [
          {
            pregunta: "¿Qué comes normalmente en el desayuno?",
            respuestaEsperada: "Normalmente como pan con mantequilla y bebo café con leche.",
          },
          {
            pregunta: "¿Cuál es tu comida favorita?",
            respuestaEsperada: "Mi comida favorita es la paella / el pollo asado.",
          },
          {
            pregunta: "¿Eres vegetariano?",
            respuestaEsperada: "Sí, soy vegetariano. / No, como carne.",
          },
        ],
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Qué comes normalmente en el desayuno?",
        preguntaChino: "你早餐通常吃什么？",
        sugerencia: "Normalmente como (pan / cereales / fruta / tostada).",
        sugerenciaChino: "Normalmente como (pan / cereales / fruta / tostada).",
      },
      {
        id: "pa2",
        pregunta: "¿Cuál es tu comida favorita?",
        preguntaChino: "你最喜欢的食物是什么？",
        sugerencia: "Mi comida favorita es (pollo / pescado / paella / pasta).",
        sugerenciaChino: "Mi comida favorita es (pollo / pescado / paella / pasta).",
      },
      {
        id: "pa3",
        pregunta: "¿Tienes hambre ahora?",
        preguntaChino: "你现在饿吗？",
        sugerencia: "Sí, tengo hambre. / No, no tengo hambre.",
        sugerenciaChino: "Sí, tengo hambre. / No, no tengo hambre.",
      },
      {
        id: "pa4",
        pregunta: "¿Qué te gusta beber en verano?",
        preguntaChino: "你夏天喜欢喝什么？",
        sugerencia: "En verano me gusta beber agua fría, cerveza o sangría.",
        sugerenciaChino: "En verano me gusta beber agua fría, cerveza o sangría.",
      },
      {
        id: "pa5",
        pregunta: "Describe tu restaurante ideal.",
        preguntaChino: "描述你理想的餐厅。",
        sugerencia:
          "Mi restaurante ideal sirve comida mediterránea, tiene opciones vegetarianas y la atención es excelente.",
        sugerenciaChino:
          "Mi restaurante ideal sirve comida mediterránea, tiene opciones vegetarianas y la atención es excelente.",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '我饿了' en español?",
        preguntaChino: "西班牙语中'我饿了'怎么说？",
        respuestaSugerida: "Tengo hambre",
        respuestaSugeridaChino: "Tengo hambre",
      },
      {
        id: "p2",
        pregunta: "¿Cuál es tu comida favorita? Responde en español.",
        preguntaChino: "你最喜欢的食物是什么？用西班牙语回答。",
        respuestaSugerida: "Mi comida favorita es el pollo.",
        respuestaSugeridaChino: "Mi comida favorita es el pollo.",
      },
      {
        id: "p3",
        pregunta: "¿Qué sueles beber en el desayuno?",
        preguntaChino: "你早餐通常喝什么？",
        respuestaSugerida: "Suelo beber café / té / zumo de naranja.",
        respuestaSugeridaChino: "Suelo beber café / té / zumo de naranja.",
      },
      {
        id: "p4",
        pregunta: "¿Qué significa '¡Buen provecho!'?",
        preguntaChino: "'¡Buen provecho!'是什么意思？",
        respuestaSugerida: "祝你好胃口",
        respuestaSugeridaChino: "Enjoy your meal",
      },
      {
        id: "p5",
        pregunta: "¿Cómo se dice '素食者' en español?",
        preguntaChino: "西班牙语中'素食者'怎么说？",
        respuestaSugerida: "vegetariano / vegetariana",
        respuestaSugeridaChino: "vegetariano / vegetariana",
      },
      {
        id: "p6",
        pregunta: "¿Qué bebida típica española se hace con vino y frutas?",
        preguntaChino: "什么西班牙典型饮料用葡萄酒和水果制作？",
        respuestaSugerida: "La sangría.",
        respuestaSugeridaChino: "La sangría.",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Prendas de vestir",
        tituloChino: "服装",
        descripcion: `🔹 ROPA SUPERIOR (upper body):

• camiseta = T-shirt
• camisa = shirt
• blusa = blouse (women's)
• jersey / suéter = sweater / jumper
• chaqueta = jacket
• abrigo = coat (winter)
• americana / saco = blazer / suit jacket
• sudadera = hoodie / sweatshirt
• chaleco = vest / waistcoat
• kimono = kimono

🔹 ROPA INFERIOR (lower body):

• pantalón = trousers / pants
• vaqueros / jeans = jeans
• pantalón corto = shorts
• falda = skirt
• vestido = dress
• mono = jumpsuit / overalls
• leggins = leggings

🔹 ROPA INTERIOR (underwear):

• calzoncillos = men's underwear
• bragas = panties
• sujetador / sostén = bra
• camiseta interior = undershirt
• pijama = pajamas
• albornoz = bathrobe

🔹 CALZADO (footwear):

• zapatos = shoes
• zapatillas deportivas = sneakers / trainers
• botas = boots
• sandalias = sandals
• chanclas = flip-flops
• zapatos de tacón = high heels
• zapatos de vestir = dress shoes

🔹 ROPA DE INVIERNO (winter clothes):

• bufanda = scarf
• guantes = gloves
• gorro = beanie / winter hat
• orejeras = ear muffs
• chaquetón = heavy coat

🔹 ROPA DE VERANO (summer clothes):

• camiseta de manga corta = short-sleeve shirt
• pantalón corto = shorts
• bañador = swimsuit
• bikini = bikini
• gafas de sol = sunglasses
• sombrero = hat

📌 EJEMPLOS:
• Llevo una camisa blanca.
• Me pongo los vaqueros.
• Necesito un abrigo nuevo.`,
        descripcionChino: `🔹 上装：

• camiseta = T恤
• camisa = 衬衫
• blusa = 女衬衫
• jersey / suéter = 毛衣
• chaqueta = 夹克
• abrigo = 大衣（冬装）
• americana / saco = 西装外套
• sudadera = 卫衣
• chaleco = 背心/马甲
• kimono = 和服

🔹 下装：

• pantalón = 裤子
• vaqueros / jeans = 牛仔裤
• pantalón corto = 短裤
• falda = 裙子
• vestido = 连衣裙
• mono = 连体裤
• leggins = 紧身裤

🔹 内衣：

• calzoncillos = 男士内裤
• bragas = 女士内裤
• sujetador / sostén = 文胸
• camiseta interior = 内衣背心
• pijama = 睡衣
• albornoz = 浴袍

🔹 鞋类：

• zapatos = 鞋子
• zapatillas deportivas = 运动鞋
• botas = 靴子
• sandalias = 凉鞋
• chanclas = 人字拖
• zapatos de tacón = 高跟鞋
• zapatos de vestir = 正装鞋

🔹 冬装：

• bufanda = 围巾
• guantes = 手套
• gorro = 冬帽/保暖帽
• orejeras = 耳罩
• chaquetón = 厚外套

🔹 夏装：

• camiseta de manga corta = 短袖T恤
• pantalón corto = 短裤
• bañador = 泳衣
• bikini = 比基尼
• gafas de sol = 太阳镜
• sombrero = 帽子

📌 例子：
• Llevo una camisa blanca. = 我穿一件白衬衫。
• Me pongo los vaqueros. = 我穿上牛仔裤。
• Necesito un abrigo nuevo. = 我需要一件新外套。`,
        ejemplos: [
          {
            espanol: "Llevo una camisa blanca.",
            chino: "我穿一件白衬衫。",
          },
          {
            espanol: "Me pongo los vaqueros.",
            chino: "我穿上牛仔裤。",
          },
          {
            espanol: "Necesito un abrigo nuevo.",
            chino: "我需要一件新外套。",
          },
          {
            espanol: "En verano uso sandalias y gafas de sol.",
            chino: "夏天我穿凉鞋戴太阳镜。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Accesorios",
        tituloChino: "配饰",
        descripcion: `🔹 ACCESORIOS COMUNES (common accessories):

• corbata = tie
• pajarita = bow tie
• bufanda = scarf
• pañuelo = handkerchief / neckerchief
• guantes = gloves
• gorro / gorra = hat / cap
• cinturón = belt
• gafas / gafas de sol = glasses / sunglasses
• gafas de ver = prescription glasses
• pendientes = earrings
• collar = necklace
• pulsera = bracelet
• anillo = ring
• reloj = watch
• bolso = handbag / purse
• mochila = backpack
• cartera = wallet (men's)
• monedero = coin purse
• paraguas = umbrella
• chubasquero = raincoat

📌 EJEMPLOS:
• Me pongo los zapatos.
• Llevo gafas para leer.
• Me regaló un collar.
• Este cinturón combina bien con mis zapatos.

🔹 VERBOS RELACIONADOS:
• llevar = to wear (llevo una camisa)
• ponerse = to put on (me pongo los zapatos)
• quitarse = to take off (me quito la chaqueta)
• probarse = to try on (me pruebo el vestido)
• combinar = to match (estos colores combinan bien)`,
        descripcionChino: `🔹 常见配饰：

• corbata = 领带
• pajarita = 蝴蝶结领结
• bufanda = 围巾
• pañuelo = 手帕/围巾
• guantes = 手套
• gorro / gorra = 帽子
• cinturón = 腰带
• gafas / gafas de sol = 眼镜/太阳镜
• gafas de ver = 近视眼镜
• pendientes = 耳环
• collar = 项链
• pulsera = 手镯
• anillo = 戒指
• reloj = 手表
• bolso = 手提包
• mochila = 背包
• cartera = 钱包（男士）
• monedero = 零钱包
• paraguas = 雨伞
• chubasquero = 雨衣

📌 例子：
• Me pongo los zapatos. = 我穿上鞋子。
• Llevo gafas para leer. = 我戴眼镜看书。
• Me regaló un collar. = 他送我一条项链。
• Este cinturón combina bien con mis zapatos. = 这条腰带和我的鞋子很配。

🔹 相关动词：
• llevar = 穿着（llevo una camisa）
• ponerse = 穿上（me pongo los zapatos）
• quitarse = 脱下（me quito la chaqueta）
• probarse = 试穿（me pruebo el vestido）
• combinar = 搭配（estos colores combinan bien）`,
        ejemplos: [
          {
            espanol: "Este reloj es de mi abuelo.",
            chino: "这块手表是我爷爷的。",
          },
          {
            espanol: "Llevo gafas de sol porque hace sol.",
            chino: "我戴太阳镜因为有太阳。",
          },
          {
            espanol: "¿Qué bolso te gusta más?",
            chino: "你更喜欢哪个包？",
          },
        ],
      },
      {
        id: "t3",
        titulo: "En la tienda de ropa",
        tituloChino: "在服装店",
        descripcion: `🔹 FRASES PARA EL CLIENTE (customer phrases):

• ¿Cuánto cuesta? = How much does it cost?
• ¿Cuánto cuestan? = How much do they cost?
• ¿Puedo probármelo? = Can I try it on?
• ¿Tiene otra talla? = Do you have another size?
• ¿Tiene otro color? = Do you have another color?
• ¿Qué talla es esta? = What size is this?
• ¿Me queda bien? = Does it fit me well?
• Me gusta este / esta = I like this one
• Me llevo este / esta = I'll take this one
• ¿Hay descuento? = Is there a discount?
• ¿Está en rebajas? = Is it on sale?

🔹 TALLAS (sizes):

• XS = extra pequeña / extra small
• S = pequeña / small
• M = mediana / medium
• L = grande / large
• XL = extra grande / extra large
• XXL = dos extra grandes / double extra large

🔹 RESPUESTAS DEL VENDEDOR (salesperson responses):

• ¿En qué puedo ayudarle? = How can I help you?
• ¿Qué talla busca? = What size are you looking for?
• ¿Qué color prefiere? = What color do you prefer?
• Los probadores están allí = The fitting rooms are there
• Le queda muy bien = It fits you very well
• Le queda un poco grande/pequeño = It's a little big/small on you
• Está rebajado = It's discounted
• La talla que busca no nos queda = The size you're looking for is out of stock

📌 EJEMPLOS COMPLETOS:
• ¿Cuánto cuesta esta camisa? — Cuesta veinticinco euros.
• ¿Puedo probarme estos zapatos? — Claro, los probadores están al fondo.
• Me gusta este color, me lo llevo.
• ¿Aceptan tarjeta? — Sí, aceptamos tarjeta y efectivo.`,
        descripcionChino: `🔹 顾客用语：

• ¿Cuánto cuesta? = 多少钱？
• ¿Cuánto cuestan? = 多少钱？（复数）
• ¿Puedo probármelo? = 我可以试穿吗？
• ¿Tiene otra talla? = 有其他尺码吗？
• ¿Tiene otro color? = 有其他颜色吗？
• ¿Qué talla es esta? = 这是什么尺码？
• ¿Me queda bien? = 我穿合身吗？
• Me gusta este / esta = 我喜欢这件
• Me llevo este / esta = 我买这件
• ¿Hay descuento? = 有折扣吗？
• ¿Está en rebajas? = 在打折吗？

🔹 尺码：

• XS = 超小号
• S = 小号
• M = 中号
• L = 大号
• XL = 加大号
• XXL = 双加大号

🔹 售货员回答：

• ¿En qué puedo ayudarle? = 有什么可以帮您的？
• ¿Qué talla busca? = 您找什么尺码？
• ¿Qué color prefiere? = 您喜欢什么颜色？
• Los probadores están allí = 试衣间在那里
• Le queda muy bien = 很合身
• Le queda un poco grande/pequeño = 有点大/小
• Está rebajado = 打折了
• La talla que busca no nos queda = 您要找的尺码没有了

📌 完整例子：
• ¿Cuánto cuesta esta camisa? — Cuesta veinticinco euros. = 这件衬衫多少钱？—二十五欧元。
• ¿Puedo probarme estos zapatos? — Claro, los probadores están al fondo. = 我可以试穿这双鞋吗？—当然，试衣间在尽头。
• Me gusta este color, me lo llevo. = 我喜欢这个颜色，我买了。
• ¿Aceptan tarjeta? — Sí, aceptamos tarjeta y efectivo. = 可以刷卡吗？—是的，我们收卡和现金。`,
        ejemplos: [
          {
            espanol: "¿Cuánto cuesta esta camisa?",
            chino: "这件衬衫多少钱？",
          },
          {
            espanol: "¿Puedo probármelo?",
            chino: "我可以试穿吗？",
          },
          {
            espanol: "Me gusta este color.",
            chino: "我喜欢这个颜色。",
          },
          {
            espanol: "¿Aceptan tarjeta?",
            chino: "可以刷卡吗？",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Verbos y expresiones de vestir",
        tituloChino: "穿衣动词和表达",
        descripcion: `🔹 VERBOS IMPORTANTES:

• vestirse = to get dressed
• desvestirse = to get undressed
• llevar = to wear (llevo puesta una chaqueta)
• ponerse = to put on (me pongo los zapatos)
• quitarse = to take off (me quito el abrigo)
• probarse = to try on (me pruebo el vestido)
• combinar = to match (el rojo combina con el negro)
• quedar = to fit (me queda bien / me queda mal)

🔹 EXPRESIONES COMUNES:

• ¿Qué llevas puesto? = What are you wearing?
• Llevo puesto/a... = I'm wearing...
• ¿Me queda bien? = Does it fit me well?
• Te queda muy bien = It fits you very well
• Estás muy elegante = You look very elegant
• Estás muy guapo/a = You look very handsome/beautiful
• ¡Qué bien vestido vas! = You're very well dressed!

🔹 DESCRIBIR LO QUE LLEVAS puesto:

• Hoy llevo una camiseta azul y unos vaqueros.
• Llevo puesta una chaqueta de cuero.
• Voy vestido de negro.
• Me he puesto el traje para la boda.

📌 EJEMPLOS:
• ¿Qué llevas puesto hoy? — Hoy llevo una camisa blanca y pantalón negro.
• Este vestido me queda un poco grande.
• Para la fiesta, me pondré el traje azul.
• Estos zapatos combinan muy bien con el bolso.`,
        descripcionChino: `🔹 重要动词：

• vestirse = 穿衣服
• desvestirse = 脱衣服
• llevar = 穿着（llevo puesta una chaqueta）
• ponerse = 穿上（me pongo los zapatos）
• quitarse = 脱下（me quito el abrigo）
• probarse = 试穿（me pruebo el vestido）
• combinar = 搭配（el rojo combina con el negro）
• quedar = 合身（me queda bien / me queda mal）

🔹 常见表达：

• ¿Qué llevas puesto? = 你穿着什么？
• Llevo puesto/a... = 我穿着...
• ¿Me queda bien? = 我穿合身吗？
• Te queda muy bien = 很合身
• Estás muy elegante = 你看起来很优雅
• Estás muy guapo/a = 你看起来很帅/漂亮
• ¡Qué bien vestido vas! = 你穿得真好看！

🔹 描述你穿的衣服：

• Hoy llevo una camiseta azul y unos vaqueros. = 今天我穿蓝色T恤和牛仔裤。
• Llevo puesta una chaqueta de cuero. = 我穿着皮夹克。
• Voy vestido de negro. = 我穿黑色衣服。
• Me he puesto el traje para la boda. = 我为婚礼穿了西装。

📌 例子：
• ¿Qué llevas puesto hoy? — Hoy llevo una camisa blanca y pantalón negro. = 你今天穿什么？—今天我穿白衬衫和黑裤子。
• Este vestido me queda un poco grande. = 这条裙子有点大。
• Para la fiesta, me pondré el traje azul. = 为了派对，我会穿蓝色西装。
• Estos zapatos combinan muy bien con el bolso. = 这双鞋和包很配。`,
        ejemplos: [
          {
            espanol: "Hoy llevo una camiseta azul.",
            chino: "今天我穿蓝色T恤。",
          },
          {
            espanol: "Este vestido me queda perfecto.",
            chino: "这条裙子我穿很合身。",
          },
          {
            espanol: "Estás muy elegante con ese traje.",
            chino: "你穿那套西装很优雅。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "camiseta",
        chino: "T恤",
        ejemplo: "Una camiseta roja.",
      },
      {
        id: "v2",
        espanol: "camisa",
        chino: "衬衫",
        ejemplo: "Camisa de cuadros.",
      },
      {
        id: "v3",
        espanol: "pantalón",
        chino: "裤子",
        ejemplo: "Pantalón negro.",
      },
      {
        id: "v4",
        espanol: "vaqueros / jeans",
        chino: "牛仔裤",
        ejemplo: "Vaqueros azules.",
      },
      {
        id: "v5",
        espanol: "falda",
        chino: "裙子",
        ejemplo: "Falda corta.",
      },
      {
        id: "v6",
        espanol: "vestido",
        chino: "连衣裙",
        ejemplo: "Vestido elegante.",
      },
      {
        id: "v7",
        espanol: "chaqueta",
        chino: "夹克",
        ejemplo: "Chaqueta de cuero.",
      },
      {
        id: "v8",
        espanol: "abrigo",
        chino: "大衣",
        ejemplo: "Un abrigo de invierno.",
      },
      {
        id: "v9",
        espanol: "jersey / suéter",
        chino: "毛衣",
        ejemplo: "Un jersey de lana.",
      },
      {
        id: "v10",
        espanol: "sudadera",
        chino: "卫衣",
        ejemplo: "Sudadera con capucha.",
      },
      {
        id: "v11",
        espanol: "zapatos",
        chino: "鞋子",
        ejemplo: "Zapatos negros.",
      },
      {
        id: "v12",
        espanol: "zapatillas",
        chino: "运动鞋",
        ejemplo: "Zapatillas deportivas.",
      },
      {
        id: "v13",
        espanol: "botas",
        chino: "靴子",
        ejemplo: "Botas de montaña.",
      },
      {
        id: "v14",
        espanol: "sandalias",
        chino: "凉鞋",
        ejemplo: "Sandalias de verano.",
      },
      {
        id: "v15",
        espanol: "bufanda",
        chino: "围巾",
        ejemplo: "Bufanda de lana.",
      },
      {
        id: "v16",
        espanol: "guantes",
        chino: "手套",
        ejemplo: "Guantes de cuero.",
      },
      {
        id: "v17",
        espanol: "gorro",
        chino: "冬帽",
        ejemplo: "Gorro de lana.",
      },
      {
        id: "v18",
        espanol: "gorra",
        chino: "棒球帽",
        ejemplo: "Gorra deportiva.",
      },
      {
        id: "v19",
        espanol: "gafas",
        chino: "眼镜",
        ejemplo: "Gafas de sol.",
      },
      {
        id: "v20",
        espanol: "cinturón",
        chino: "腰带",
        ejemplo: "Un cinturón marrón.",
      },
      {
        id: "v21",
        espanol: "reloj",
        chino: "手表",
        ejemplo: "Un reloj de oro.",
      },
      {
        id: "v22",
        espanol: "pendientes",
        chino: "耳环",
        ejemplo: "Pendientes de plata.",
      },
      {
        id: "v23",
        espanol: "collar",
        chino: "项链",
        ejemplo: "Un collar de perlas.",
      },
      {
        id: "v24",
        espanol: "pulsera",
        chino: "手镯",
        ejemplo: "Pulsera de cuero.",
      },
      {
        id: "v25",
        espanol: "anillo",
        chino: "戒指",
        ejemplo: "Anillo de compromiso.",
      },
      {
        id: "v26",
        espanol: "bolso",
        chino: "手提包",
        ejemplo: "Bolso de mano.",
      },
      {
        id: "v27",
        espanol: "mochila",
        chino: "背包",
        ejemplo: "Mochila escolar.",
      },
      {
        id: "v28",
        espanol: "cartera",
        chino: "钱包",
        ejemplo: "Cartera de cuero.",
      },
      {
        id: "v29",
        espanol: "talla",
        chino: "尺码",
        ejemplo: "¿Qué talla usas?",
      },
      {
        id: "v30",
        espanol: "probador",
        chino: "试衣间",
        ejemplo: "Los probadores están allí.",
      },
      {
        id: "v31",
        espanol: "rebajas",
        chino: "打折",
        ejemplo: "Está en rebajas.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "En una tienda de ropa",
        tituloChino: "在服装店",
        personajes: ["Cliente", "Dependiente"],
        lineas: [
          {
            personaje: "Cliente",
            texto: "Buenos días. Busco una camisa para una boda.",
            traduccion: "早上好。我在找一件参加婚礼的衬衫。",
          },
          {
            personaje: "Dependiente",
            texto: "¿Qué talla lleva?",
            traduccion: "您穿什么尺码？",
          },
          {
            personaje: "Cliente",
            texto: "Llevo la talla M.",
            traduccion: "我穿M码。",
          },
          {
            personaje: "Dependiente",
            texto: "Tenemos esta en azul y en blanca.",
            traduccion: "我们有这件蓝色和白色的。",
          },
          {
            personaje: "Cliente",
            texto: "La blanca me gusta más. ¿Puedo probármela?",
            traduccion: "我更喜欢白色的。我可以试穿吗？",
          },
          {
            personaje: "Dependiente",
            texto: "Claro, los probadores están allí.",
            traduccion: "当然，试衣间在那里。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Comprando zapatos",
        tituloChino: "买鞋子",
        personajes: ["Ana", "Dependiente"],
        lineas: [
          {
            personaje: "Ana",
            texto: "¿Cuánto cuestan estos zapatos?",
            traduccion: "这双鞋多少钱？",
          },
          {
            personaje: "Dependiente",
            texto: "Cuestan sesenta euros.",
            traduccion: "六十欧元。",
          },
          {
            personaje: "Ana",
            texto: "¿Tienen descuento?",
            traduccion: "有折扣吗？",
          },
          {
            personaje: "Dependiente",
            texto: "Sí, hay veinte por ciento de descuento.",
            traduccion: "是的，打八折。",
          },
          {
            personaje: "Ana",
            texto: "Perfecto. Me los llevo. ¿Aceptan tarjeta?",
            traduccion: "完美。我买了。可以刷卡吗？",
          },
          {
            personaje: "Dependiente",
            texto: "Sí, aceptamos tarjeta.",
            traduccion: "是的，我们收卡。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Probándose ropa",
        tituloChino: "试穿衣服",
        personajes: ["María", "Laura"],
        lineas: [
          {
            personaje: "María",
            texto: "Laura, ¿qué te parece este vestido?",
            traduccion: "劳拉，你觉得这条裙子怎么样？",
          },
          {
            personaje: "Laura",
            texto: "¿Te lo has probado ya?",
            traduccion: "你试穿了吗？",
          },
          {
            personaje: "María",
            texto: "Sí, pero no sé si me queda bien.",
            traduccion: "是的，但我不知道是否合身。",
          },
          {
            personaje: "Laura",
            texto: "Déjame ver... Te queda muy bien. ¡Cómpatelo!",
            traduccion: "让我看看...很合身。买吧！",
          },
          {
            personaje: "María",
            texto: "¿Tú crees? ¿No es demasiado corto?",
            traduccion: "你觉得？不会太短吗？",
          },
          {
            personaje: "Laura",
            texto: "No, está perfecto. Además, es el último.",
            traduccion: "不，很完美。而且，这是最后一件了。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Describiendo lo que llevas puesto",
        tituloChino: "描述穿着",
        personajes: ["Carlos", "Sofía"],
        lineas: [
          {
            personaje: "Carlos",
            texto: "Sofía, ¿qué llevas puesto hoy? ¡Estás muy elegante!",
            traduccion: "索菲亚，你今天穿什么？你很优雅！",
          },
          {
            personaje: "Sofía",
            texto: "Gracias, Carlos. Llevo un vestido azul y unos zapatos de tacón.",
            traduccion: "谢谢，卡洛斯。我穿蓝色连衣裙和高跟鞋。",
          },
          {
            personaje: "Carlos",
            texto: "¿Y ese collar? Es precioso.",
            traduccion: "那条项链呢？很漂亮。",
          },
          {
            personaje: "Sofía",
            texto: "Me lo regaló mi abuela. Es de plata.",
            traduccion: "是我奶奶送我的。是银的。",
          },
          {
            personaje: "Carlos",
            texto: "Combina perfectamente con el vestido.",
            traduccion: "和连衣裙很配。",
          },
          {
            personaje: "Sofía",
            texto: "¿Y tú qué llevas? Una camisa blanca y pantalón negro.",
            traduccion: "你穿什么？白衬衫和黑裤子。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "En las rebajas",
        tituloChino: "打折季",
        personajes: ["Cliente", "Dependiente"],
        lineas: [
          {
            personaje: "Cliente",
            texto: "Buenas tardes. ¿Hay alguna oferta?",
            traduccion: "下午好。有什么优惠吗？",
          },
          {
            personaje: "Dependiente",
            texto: "Sí, estamos en rebajas. Todo tiene un treinta por ciento de descuento.",
            traduccion: "是的，我们在打折。所有商品打七折。",
          },
          {
            personaje: "Cliente",
            texto: "¿Y esta chaqueta de cuero?",
            traduccion: "这件皮夹克呢？",
          },
          {
            personaje: "Dependiente",
            texto: "Originalmente costaba doscientos euros. Con el descuento, ciento cuarenta.",
            traduccion: "原价两百欧元。打折后一百四十。",
          },
          {
            personaje: "Cliente",
            texto: "Me parece bien. ¿Puedo probármela?",
            traduccion: "我觉得可以。我可以试穿吗？",
          },
          {
            personaje: "Dependiente",
            texto: "Claro, los probadores están a la derecha.",
            traduccion: "当然，试衣间在右边。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "我穿在身上的白色衣服是：Una _____ blanca.",
          preguntaChino: "我穿在身上的白色衣服是：Una _____ blanca.",
          respuestaCorrecta: "camisa",
          explicacion: "Camisa = 衬衫。",
          pista: "首字母是 c，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c2",
          pregunta: "我穿的蓝色裤子是：Unos _____ azules.",
          preguntaChino: "我穿的蓝色裤子是：Unos _____ azules.",
          respuestaCorrecta: "vaqueros",
          explicacion: "Vaqueros = 牛仔裤。",
          pista: "首字母是 v，8个字母",
          numeroLetras: 8,
        },
        {
          id: "c3",
          pregunta: "我戴在眼睛上的东西是：_____",
          preguntaChino: "我戴在眼睛上的东西是：_____",
          respuestaCorrecta: "gafas",
          explicacion: "Gafas = 眼镜。",
          pista: "首字母是 g，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c4",
          pregunta: "为了问'多少钱？'：¿Cuánto _____?",
          preguntaChino: "为了问'多少钱？'：¿Cuánto _____?",
          respuestaCorrecta: "cuesta",
          explicacion: "'¿Cuánto cuesta?' = 多少钱？",
          pista: "首字母是 c，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c5",
          pregunta: "为了问'我可以试穿吗？'：¿Puedo _____?",
          preguntaChino: "为了问'我可以试穿吗？'：¿Puedo _____?",
          respuestaCorrecta: "probármelo",
          explicacion: "'Probármelo' = 试穿它。",
          pista: "首字母是 p，11个字母",
          numeroLetras: 11,
        },
        {
          id: "c6",
          pregunta: "冬天戴在脖子上的配饰是：_____",
          preguntaChino: "冬天戴在脖子上的配饰是：_____",
          respuestaCorrecta: "bufanda",
          explicacion: "Bufanda = 围巾。",
          pista: "首字母是 b，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c7",
          pregunta: "为了说'你穿着什么？'：¿Qué _____ puesto?",
          preguntaChino: "为了说'你穿着什么？'：¿Qué _____ puesto?",
          respuestaCorrecta: "llevas",
          explicacion: "Llevar = 穿着",
          pista: "首字母是 l，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c8",
          pregunta: "为了说'合身'：Te _____ bien",
          preguntaChino: "为了说'合身'：Te _____ bien",
          respuestaCorrecta: "queda",
          explicacion: "Quedar bien = 合身",
          pista: "首字母是 q，5个字母",
          numeroLetras: 5,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "你脚上穿什么？",
          preguntaChino: "你脚上穿什么？",
          opciones: ["camisa", "pantalón", "zapatos", "gafas"],
          respuestaCorrecta: "zapatos",
          explicacion: "鞋子穿在脚上。",
        },
        {
          id: "s2",
          pregunta: "'Vaqueros'是什么意思？",
          preguntaChino: "'Vaqueros'是什么意思？",
          opciones: ["衬衫", "牛仔裤", "夹克", "鞋子"],
          respuestaCorrecta: "牛仔裤",
          explicacion: "'Vaqueros' = 牛仔裤。",
        },
        {
          id: "s3",
          pregunta: "你戴在手腕上的配饰是：",
          preguntaChino: "你戴在手腕上的配饰是：",
          opciones: ["collar", "pendientes", "reloj", "gafas"],
          respuestaCorrecta: "reloj",
          explicacion: "手表戴在手腕上。",
        },
        {
          id: "s4",
          pregunta: "冬天你戴在脖子上的配饰是：",
          preguntaChino: "冬天你戴在脖子上的配饰是：",
          opciones: ["gorra", "bufanda", "cinturón", "guantes"],
          respuestaCorrecta: "bufanda",
          explicacion: "围巾戴在脖子上。",
        },
        {
          id: "s5",
          pregunta: "M尺码是什么意思？",
          preguntaChino: "M尺码是什么意思？",
          opciones: ["小号", "中号", "大号", "加大号"],
          respuestaCorrecta: "中号",
          explicacion: "M = mediana = 中号。",
        },
        {
          id: "s6",
          pregunta: "¿Qué significa 'probador'?",
          preguntaChino: "'probador'是什么意思？",
          opciones: ["收银台", "试衣间", "更衣室", "仓库"],
          respuestaCorrecta: "试衣间",
          explicacion: "Probador = 试衣间",
        },
        {
          id: "s7",
          pregunta: "¿Cómo se dice '打折' en español?",
          preguntaChino: "西班牙语中'打折'怎么说？",
          opciones: ["descuento", "rebajas", "oferta", "todas las anteriores"],
          respuestaCorrecta: "todas las anteriores",
          explicacion: "Descuento, rebajas, oferta = 打折",
        },
        {
          id: "s8",
          pregunta: "¿Qué significa 'Me queda bien'?",
          preguntaChino: "'Me queda bien'是什么意思？",
          opciones: ["我很合适", "我穿合身", "我喜欢", "我买"],
          respuestaCorrecta: "我穿合身",
          explicacion: "Quedar bien = 合身",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Camiseta'是上装。",
          preguntaChino: "'Camiseta'是上装。",
          respuestaCorrecta: true,
          explicacion: "对。T恤是上装。",
        },
        {
          id: "vf2",
          pregunta: "'Falda'是男性穿的。",
          preguntaChino: "'Falda'是男性穿的。",
          respuestaCorrecta: false,
          explicacion: "错。裙子通常是女性穿的。",
        },
        {
          id: "vf3",
          pregunta: "'Abrigo'冬天穿。",
          preguntaChino: "'Abrigo'冬天穿。",
          respuestaCorrecta: true,
          explicacion: "对。大衣是冬天穿的。",
        },
        {
          id: "vf4",
          pregunta: "'¿Puedo probármelo?'是问'我可以买吗？'",
          preguntaChino: "'¿Puedo probármelo?'是问'我可以买吗？'",
          respuestaCorrecta: false,
          explicacion: "错。是问'我可以试穿吗？'",
        },
        {
          id: "vf5",
          pregunta: "'Gafas de sol'是太阳镜。",
          preguntaChino: "'Gafas de sol'是太阳镜。",
          respuestaCorrecta: true,
          explicacion: "对。Gafas de sol = 太阳镜。",
        },
        {
          id: "vf6",
          pregunta: "En España, 'pantalón' es singular, pero 'pantalones' también se usa.",
          preguntaChino: "在西班牙，'pantalón'是单数，但'pantalones'也用。",
          respuestaCorrecta: true,
          explicacion: "对。Ambas formas son correctas.",
        },
        {
          id: "vf7",
          pregunta: "'Zapatillas' son zapatos formales.",
          preguntaChino: "'Zapatillas'是正装鞋。",
          respuestaCorrecta: false,
          explicacion: "错。Zapatillas = 运动鞋",
        },
        {
          id: "vf8",
          pregunta: "Las rebajas son épocas de descuentos en las tiendas.",
          preguntaChino: "Rebajas是商店打折的季节。",
          respuestaCorrecta: true,
          explicacion: "对。Generalmente en enero y julio.",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "camisa",
              derecha: "衬衫",
            },
            {
              izquierda: "pantalón",
              derecha: "裤子",
            },
            {
              izquierda: "vaqueros",
              derecha: "牛仔裤",
            },
            {
              izquierda: "zapatos",
              derecha: "鞋子",
            },
            {
              izquierda: "gafas",
              derecha: "眼镜",
            },
            {
              izquierda: "bufanda",
              derecha: "围巾",
            },
            {
              izquierda: "gorra",
              derecha: "帽子",
            },
            {
              izquierda: "vestido",
              derecha: "连衣裙",
            },
            {
              izquierda: "chaqueta",
              derecha: "夹克",
            },
            {
              izquierda: "abrigo",
              derecha: "大衣",
            },
            {
              izquierda: "reloj",
              derecha: "手表",
            },
            {
              izquierda: "cinturón",
              derecha: "腰带",
            },
          ],
          explicacion: "将服装与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["camisa", "Una", "blanca", "quiero", "."],
          respuestaCorrecta: "Quiero una camisa blanca.",
          explicacion: "正确的句子是：Quiero una camisa blanca.（我想要一件白衬衫。）",
        },
        {
          id: "o2",
          palabras: ["cuesta", "cuánto", "¿", "chaqueta", "esta", "?"],
          respuestaCorrecta: "¿Cuánto cuesta esta chaqueta?",
          explicacion: "正确的句子是：¿Cuánto cuesta esta chaqueta?（这件夹克多少钱？）",
        },
        {
          id: "o3",
          palabras: ["me", "lo", "llevo", "Este", "."],
          respuestaCorrecta: "Este me lo llevo.",
          explicacion: "正确的句子是：Este me lo llevo.（我买这件。）",
        },
        {
          id: "o4",
          palabras: ["pruebo", "vestido", "puedo", "el", "Me", "?"],
          respuestaCorrecta: "¿Me puedo probar el vestido?",
          explicacion: "正确的顺序是：¿Me puedo probar el vestido?",
        },
        {
          id: "o5",
          palabras: ["llevas", "hoy", "Qué", "puesto", "?"],
          respuestaCorrecta: "¿Qué llevas puesto hoy?",
          explicacion: "正确的顺序是：¿Qué llevas puesto hoy?",
        },
        {
          id: "o6",
          palabras: ["queda", "bien", "te", "Este", "vestido", "."],
          respuestaCorrecta: "Este vestido te queda bien.",
          explicacion: "正确的顺序是：Este vestido te queda bien.",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我想买一件红色T恤。",
          respuestaEsperada: "Quiero comprar una camiseta roja.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "这双鞋多少钱？",
          respuestaEsperada: "¿Cuánto cuestan estos zapatos?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "我可以试穿这件连衣裙吗？",
          respuestaEsperada: "¿Puedo probarme este vestido?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "我喜欢这件夹克。我买它。",
          respuestaEsperada: "Me gusta esta chaqueta. Me la llevo.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "你今天穿着什么？",
          respuestaEsperada: "¿Qué llevas puesto hoy?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "这条裙子很合身。",
          respuestaEsperada: "Este vestido me queda muy bien.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "我在打折时买了这双鞋。",
          respuestaEsperada: "Compré estos zapatos en rebajas.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "你的手表很漂亮。",
          respuestaEsperada: "Tu reloj es muy bonito.",
          explicacion: "西班牙语翻译",
        },
      ],
    },
    ejerciciosPracticos: [
      {
        id: "ep1",
        tipo: "completarDialogo",
        titulo: "完成对话",
        tituloChino: "完成对话",
        instruccion: "用正确的服装词汇完成对话。",
        instruccionChino: "用正确的服装词汇完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿Cuánto cuesta esta _____?",
            respuesta: "camisa / chaqueta / falda",
          },
          {
            personaje: "B",
            texto: "Cuesta _____ euros.",
            respuesta: "veinte / treinta / cuarenta",
          },
          {
            personaje: "A",
            texto: "¿Puedo _____?",
            respuesta: "probármelo",
          },
          {
            personaje: "B",
            texto: "Sí, los _____ están allí.",
            respuesta: "probadores",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "describir",
        titulo: "Describe tu ropa",
        tituloChino: "描述你的衣服",
        instruccion: "Describe lo que llevas puesto hoy en español (3-4 frases).",
        instruccionChino: "用西班牙语描述你今天穿的衣服（3-4句话）。",
        ejemplo:
          "Hoy llevo una camiseta azul, unos vaqueros y zapatillas blancas. Llevo también un reloj y una pulsera.",
      },
      {
        id: "ep3",
        tipo: "completarTabla",
        titulo: "Completa la tabla de prendas",
        tituloChino: "完成服装表格",
        instruccion: "Escribe el nombre de cada prenda en español.",
        instruccionChino: "用西班牙语写出每件衣服的名称。",
        tabla: [
          {
            espanol: "camiseta",
            chino: "T恤",
          },
          {
            espanol: "pantalón",
            chino: "裤子",
          },
          {
            espanol: "vestido",
            chino: "连衣裙",
          },
          {
            espanol: "chaqueta",
            chino: "夹克",
          },
          {
            espanol: "bufanda",
            chino: "围巾",
          },
          {
            espanol: "guantes",
            chino: "手套",
          },
        ],
      },
      {
        id: "ep4",
        tipo: "comprar",
        titulo: "Diálogo de compra",
        tituloChino: "购物对话",
        instruccion: "Escribe un diálogo breve entre un cliente y un vendedor comprando ropa.",
        instruccionChino: "写一个客户和售货员之间买衣服的简短对话。",
        ejemplo:
          "Cliente: Buenos días, busco una chaqueta. Vendedor: ¿Qué talla necesita? Cliente: La talla M. ¿Puedo probármela? Vendedor: Claro, los probadores están allí.",
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Qué llevas puesto hoy?",
        preguntaChino: "你今天穿什么？",
        sugerencia: "Hoy llevo (una camiseta, un pantalón, zapatos...).",
        sugerenciaChino: "Hoy llevo (una camiseta, un pantalón, zapatos...).",
      },
      {
        id: "pa2",
        pregunta: "¿Cuál es tu prenda de ropa favorita?",
        preguntaChino: "你最喜欢的衣服是什么？",
        sugerencia: "Mi prenda favorita es (mi chaqueta / mis zapatos / mi vestido).",
        sugerenciaChino: "Mi prenda favorita es (mi chaqueta / mis zapatos / mi vestido).",
      },
      {
        id: "pa3",
        pregunta: "¿Qué ropa necesitas para el invierno?",
        preguntaChino: "冬天你需要什么衣服？",
        sugerencia: "Necesito un abrigo, una bufanda, guantes y botas.",
        sugerenciaChino: "Necesito un abrigo, una bufanda, guantes y botas.",
      },
      {
        id: "pa4",
        pregunta: "¿Prefieres comprar ropa en tiendas o en línea? ¿Por qué?",
        preguntaChino: "你更喜欢在实体店还是网上买衣服？为什么？",
        sugerencia: "Prefiero comprar en tiendas porque puedo probarme la ropa.",
        sugerenciaChino: "Prefiero comprar en tiendas porque puedo probarme la ropa.",
      },
      {
        id: "pa5",
        pregunta: "¿Qué es lo que más te gusta llevar en verano?",
        preguntaChino: "夏天你最喜欢穿什么？",
        sugerencia: "En verano me gusta llevar camisetas, pantalón corto y sandalias.",
        sugerenciaChino: "En verano me gusta llevar camisetas, pantalón corto y sandalias.",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '衬衫' en español?",
        preguntaChino: "西班牙语中'衬衫'怎么说？",
        respuestaSugerida: "camisa",
        respuestaSugeridaChino: "camisa",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '牛仔裤' en español?",
        preguntaChino: "西班牙语中'牛仔裤'怎么说？",
        respuestaSugerida: "vaqueros / jeans",
        respuestaSugeridaChino: "vaqueros / jeans",
      },
      {
        id: "p3",
        pregunta: "¿Qué significa '¿Puedo probármelo?'?",
        preguntaChino: "'¿Puedo probármelo?'是什么意思？",
        respuestaSugerida: "我可以试穿吗？",
        respuestaSugeridaChino: "Can I try it on?",
      },
      {
        id: "p4",
        pregunta: "¿Qué talla usas? Responde en español.",
        preguntaChino: "你穿什么尺码？用西班牙语回答。",
        respuestaSugerida: "Uso la talla M / L / S.",
        respuestaSugeridaChino: "Uso la talla M / L / S.",
      },
      {
        id: "p5",
        pregunta: "¿Qué significa 'rebajas'?",
        preguntaChino: "'rebajas'是什么意思？",
        respuestaSugerida: "Período de descuentos en tiendas",
        respuestaSugeridaChino: "商店打折季",
      },
      {
        id: "p6",
        pregunta: "¿Cómo se dice '你穿着什么？' en español?",
        preguntaChino: "西班牙语中'你穿着什么？'怎么说？",
        respuestaSugerida: "¿Qué llevas puesto?",
        respuestaSugeridaChino: "¿Qué llevas puesto?",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Partes de la cabeza",
        tituloChino: "头部",
        descripcion: `Partes de la cabeza:

🔹 CABEZA Y CARA (head and face):
• cabeza = head
• cara = face
• frente = forehead
• mejilla = cheek
• barbilla / mentón = chin
• mandíbula = jaw

🔹 OJOS Y ALREDEDOR (eyes and around):
• ojo = eye
• ceja = eyebrow
• pestaña = eyelash
• párpado = eyelid

🔹 NARIZ (nose):
• nariz = nose
• fosa nasal = nostril

🔹 BOCA (mouth):
• boca = mouth
• labio = lip
• diente = tooth
• muela = molar
• lengua = tongue
• encía = gum

🔹 OREJAS (ears):
• oreja = ear (outer)
• oído = ear (inner)
• lóbulo = earlobe

🔹 PELO (hair):
• pelo / cabello = hair
• ceja = eyebrow
• pestaña = eyelash

📌 EJEMPLOS:
• Me duele la cabeza.
• Tiene los ojos azules.
• Me cepillo los dientes.
• Tengo el pelo largo.`,
        descripcionChino: `头部部位：

🔹 头和脸：
• cabeza = 头
• cara = 脸
• frente = 额头
• mejilla = 脸颊
• barbilla / mentón = 下巴
• mandíbula = 下颌

🔹 眼睛及周围：
• ojo = 眼睛
• ceja = 眉毛
• pestaña = 睫毛
• párpado = 眼睑

🔹 鼻子：
• nariz = 鼻子
• fosa nasal = 鼻孔

🔹 嘴巴：
• boca = 嘴巴
• labio = 嘴唇
• diente = 牙齿
• muela = 臼齿
• lengua = 舌头
• encía = 牙龈

🔹 耳朵：
• oreja = 耳朵（外部）
• oído = 耳朵（内部）
• lóbulo = 耳垂

🔹 毛发：
• pelo / cabello = 头发
• ceja = 眉毛
• pestaña = 睫毛

📌 例子：
• Me duele la cabeza. = 我头疼。
• Tiene los ojos azules. = 他有蓝色的眼睛。
• Me cepillo los dientes. = 我刷牙。
• Tengo el pelo largo. = 我头发长。`,
        ejemplos: [
          {
            espanol: "Me duele la cabeza.",
            chino: "我头疼。",
          },
          {
            espanol: "Tiene los ojos azules.",
            chino: "他有蓝色的眼睛。",
          },
          {
            espanol: "Me cepillo los dientes.",
            chino: "我刷牙。",
          },
          {
            espanol: "Tengo el pelo rizado.",
            chino: "我是卷发。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Partes del cuerpo",
        tituloChino: "身体部位",
        descripcion: `🔹 CUELLO Y HOMBROS (neck and shoulders):
• cuello = neck
• nuca = nape of the neck
• hombro = shoulder
• clavícula = collarbone

🔹 BRAZOS Y MANOS (arms and hands):
• brazo = arm
• codo = elbow
• antebrazo = forearm
• muñeca = wrist
• mano = hand
• dedo = finger
• pulgar = thumb
• índice = index finger
• corazón = middle finger
• anular = ring finger
• meñique = little finger
• uña = fingernail
• nudillo = knuckle

🔹 PECHO Y ESPALDA (chest and back):
• pecho = chest
• espalda = back
• hombro = shoulder
• costilla = rib
• columna = spine

🔹 ABDOMEN (abdomen):
• estómago = stomach
• vientre = belly
• ombligo = navel / belly button
• cintura = waist
• cadera = hip
• barriga = tummy (informal)

🔹 PIERNAS Y PIES (legs and feet):
• pierna = leg
• muslo = thigh
• rodilla = knee
• pantorrilla = calf
• tobillo = ankle
• pie = foot
• talón = heel
• planta del pie = sole of the foot
• dedo del pie = toe

📌 EJEMPLOS:
• Me duele la espalda.
• Se rompió la pierna.
• Tengo las manos frías.
• Me duele el cuello de tanto estudiar.`,
        descripcionChino: `🔹 脖子和肩膀：
• cuello = 脖子
• nuca = 后颈
• hombro = 肩膀
• clavícula = 锁骨

🔹 手臂和手：
• brazo = 手臂
• codo = 肘部
• antebrazo = 前臂
• muñeca = 手腕
• mano = 手
• dedo = 手指
• pulgar = 拇指
• índice = 食指
• corazón = 中指
• anular = 无名指
• meñique = 小指
• uña = 指甲
• nudillo = 指关节

🔹 胸部和背部：
• pecho = 胸部
• espalda = 背部
• costilla = 肋骨
• columna = 脊柱

🔹 腹部：
• estómago = 胃
• vientre = 腹部
• ombligo = 肚脐
• cintura = 腰
• cadera = 臀部
• barriga = 肚子（口语）

🔹 腿和脚：
• pierna = 腿
• muslo = 大腿
• rodilla = 膝盖
• pantorrilla = 小腿
• tobillo = 脚踝
• pie = 脚
• talón = 脚跟
• planta del pie = 脚底
• dedo del pie = 脚趾

📌 例子：
• Me duele la espalda. = 我背疼。
• Se rompió la pierna. = 他摔断了腿。
• Tengo las manos frías. = 我手冷。
• Me duele el cuello de tanto estudiar. = 学习太多我脖子疼。`,
        ejemplos: [
          {
            espanol: "Me duele la espalda.",
            chino: "我背疼。",
          },
          {
            espanol: "Se rompió la pierna.",
            chino: "他摔断了腿。",
          },
          {
            espanol: "Tengo las manos frías.",
            chino: "我手冷。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Expresar dolor",
        tituloChino: "表达疼痛",
        descripcion: `🔹 ESTRUCTURAS PARA EXPRESAR DOLOR:

• Me duele + parte del cuerpo (singular)
• Me duelen + parte del cuerpo (plural)

📌 EJEMPLOS:
• Me duele la cabeza. (singular)
• Me duelen los pies. (plural)
• Me duele el estómago. (singular)
• Me duelen las rodillas. (plural)

🔹 OTRAS EXPRESIONES DE MALESTAR:

• Tengo dolor de cabeza = I have a headache
• Tengo dolor de estómago = I have a stomach ache
• Tengo dolor de garganta = I have a sore throat
• Tengo dolor de espalda = I have back pain
• Tengo fiebre = I have a fever
• Tengo tos = I have a cough
• Tengo mareos = I'm dizzy
• Tengo náuseas = I feel nauseous
• Tengo alergia = I have an allergy
• Estoy resfriado/a = I have a cold
• Estoy acatarrado/a = I have a cold (Spain)
• Tengo gripe = I have the flu
• Estoy enfermo/a = I'm sick
• Me siento débil = I feel weak
• Me falta el aire = I'm short of breath
• Estoy congestionado/a = I'm congested

🔹 PREGUNTAS DEL MÉDICO (doctor's questions):
• ¿Qué le pasa? = What's wrong?
• ¿Dónde le duele? = Where does it hurt?
• ¿Desde cuándo? = Since when?
• ¿Tiene fiebre? = Do you have a fever?
• ¿Ha tomado algo? = Have you taken anything?

🔹 RESPUESTAS DEL PACIENTE:
• Me duele aquí = It hurts here
• Me duele al respirar = It hurts when I breathe
• Me duele al moverlo = It hurts when I move it
• Llevo varios días así = I've been like this for several days`,
        descripcionChino: `🔹 表达疼痛的结构：

• Me duele + 身体部位（单数）
• Me duelen + 身体部位（复数）

📌 例子：
• Me duele la cabeza. = 我头疼。（单数）
• Me duelen los pies. = 我脚疼。（复数）
• Me duele el estómago. = 我胃疼。（单数）
• Me duelen las rodillas. = 我膝盖疼。（复数）

🔹 其他不适表达：

• Tengo dolor de cabeza = 我头疼
• Tengo dolor de estómago = 我胃疼
• Tengo dolor de garganta = 我喉咙疼
• Tengo dolor de espalda = 我背疼
• Tengo fiebre = 我发烧了
• Tengo tos = 我咳嗽
• Tengo mareos = 我头晕
• Tengo náuseas = 我恶心
• Tengo alergia = 我过敏
• Estoy resfriado/a = 我感冒了
• Estoy acatarrado/a = 我感冒了（西班牙）
• Tengo gripe = 我得了流感
• Estoy enfermo/a = 我生病了
• Me siento débil = 我感到虚弱
• Me falta el aire = 我呼吸困难
• Estoy congestionado/a = 我鼻塞

🔹 医生的询问：
• ¿Qué le pasa? = 您怎么了？
• ¿Dónde le duele? = 哪里疼？
• ¿Desde cuándo? = 从什么时候开始的？
• ¿Tiene fiebre? = 您发烧吗？
• ¿Ha tomado algo? = 您吃过什么药吗？

🔹 病人的回答：
• Me duele aquí = 这里疼
• Me duele al respirar = 呼吸时疼
• Me duele al moverlo = 动的时候疼
• Llevo varios días así = 我好几天都这样了`,
        ejemplos: [
          {
            espanol: "Me duele la cabeza.",
            chino: "我头疼。",
          },
          {
            espanol: "Me duelen los pies.",
            chino: "我脚疼。",
          },
          {
            espanol: "Tengo dolor de estómago.",
            chino: "我胃疼。",
          },
          {
            espanol: "Estoy resfriado, tengo tos y fiebre.",
            chino: "我感冒了，咳嗽发烧。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Órganos internos y sistemas",
        tituloChino: "内部器官和系统",
        descripcion: `🔹 ÓRGANOS INTERNOS (internal organs):
• corazón = heart
• pulmón = lung
• hígado = liver
• riñón = kidney
• estómago = stomach
• intestino = intestine
• cerebro = brain
• páncreas = pancreas
• vejiga = bladder

🔹 SISTEMAS DEL CUERPO (body systems):
• sistema nervioso = nervous system
• sistema circulatorio = circulatory system
• sistema respiratorio = respiratory system
• sistema digestivo = digestive system
• sistema óseo = skeletal system
• sistema muscular = muscular system

🔹 PROFESIONALES DE LA SALUD (health professionals):
• médico / médica = doctor
• enfermero / enfermera = nurse
• dentista = dentist
• cardiólogo / cardióloga = cardiologist
• oftalmólogo / oftalmóloga = ophthalmologist
• dermatólogo / dermatóloga = dermatologist
• traumatólogo / traumatóloga = traumatologist
• psicólogo / psicóloga = psychologist

📌 EJEMPLOS:
• El corazón bombea la sangre.
• Los pulmones son para respirar.
• El cerebro controla todo el cuerpo.
• Necesito ir al cardiólogo porque me duele el pecho.`,
        descripcionChino: `🔹 内部器官：
• corazón = 心脏
• pulmón = 肺
• hígado = 肝脏
• riñón = 肾脏
• estómago = 胃
• intestino = 肠道
• cerebro = 大脑
• páncreas = 胰腺
• vejiga = 膀胱

🔹 身体系统：
• sistema nervioso = 神经系统
• sistema circulatorio = 循环系统
• sistema respiratorio = 呼吸系统
• sistema digestivo = 消化系统
• sistema óseo = 骨骼系统
• sistema muscular = 肌肉系统

🔹 健康专业人士：
• médico / médica = 医生
• enfermero / enfermera = 护士
• dentista = 牙医
• cardiólogo / cardióloga = 心脏病专家
• oftalmólogo / oftalmóloga = 眼科医生
• dermatólogo / dermatóloga = 皮肤科医生
• traumatólogo / traumatóloga = 创伤科医生
• psicólogo / psicóloga = 心理学家

📌 例子：
• El corazón bombea la sangre. = 心脏泵送血液。
• Los pulmones son para respirar. = 肺用于呼吸。
• El cerebro controla todo el cuerpo. = 大脑控制整个身体。
• Necesito ir al cardiólogo porque me duele el pecho. = 我需要去看心脏病专家，因为我胸口疼。`,
        ejemplos: [
          {
            espanol: "El corazón es un órgano vital.",
            chino: "心脏是重要器官。",
          },
          {
            espanol: "Los pulmones nos permiten respirar.",
            chino: "肺让我们呼吸。",
          },
          {
            espanol: "El cerebro controla el pensamiento.",
            chino: "大脑控制思维。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "cabeza",
        chino: "头",
        ejemplo: "Me duele la cabeza.",
      },
      {
        id: "v2",
        espanol: "cara",
        chino: "脸",
        ejemplo: "Lávate la cara.",
      },
      {
        id: "v3",
        espanol: "ojo",
        chino: "眼睛",
        ejemplo: "Tiene ojos marrones.",
      },
      {
        id: "v4",
        espanol: "nariz",
        chino: "鼻子",
        ejemplo: "Tiene la nariz grande.",
      },
      {
        id: "v5",
        espanol: "boca",
        chino: "嘴巴",
        ejemplo: "Abre la boca.",
      },
      {
        id: "v6",
        espanol: "diente",
        chino: "牙齿",
        ejemplo: "Me cepillo los dientes.",
      },
      {
        id: "v7",
        espanol: "lengua",
        chino: "舌头",
        ejemplo: "Saca la lengua.",
      },
      {
        id: "v8",
        espanol: "oreja",
        chino: "耳朵",
        ejemplo: "Me duele la oreja.",
      },
      {
        id: "v9",
        espanol: "cuello",
        chino: "脖子",
        ejemplo: "Me duele el cuello.",
      },
      {
        id: "v10",
        espanol: "hombro",
        chino: "肩膀",
        ejemplo: "Me duele el hombro.",
      },
      {
        id: "v11",
        espanol: "brazo",
        chino: "手臂",
        ejemplo: "Levanta el brazo.",
      },
      {
        id: "v12",
        espanol: "codo",
        chino: "肘部",
        ejemplo: "Me golpeé el codo.",
      },
      {
        id: "v13",
        espanol: "muñeca",
        chino: "手腕",
        ejemplo: "Me duele la muñeca.",
      },
      {
        id: "v14",
        espanol: "mano",
        chino: "手",
        ejemplo: "Dame la mano.",
      },
      {
        id: "v15",
        espanol: "dedo",
        chino: "手指",
        ejemplo: "Me corté el dedo.",
      },
      {
        id: "v16",
        espanol: "uña",
        chino: "指甲",
        ejemplo: "Me corto las uñas.",
      },
      {
        id: "v17",
        espanol: "pecho",
        chino: "胸部",
        ejemplo: "Me duele el pecho.",
      },
      {
        id: "v18",
        espanol: "espalda",
        chino: "背部",
        ejemplo: "Me duele la espalda.",
      },
      {
        id: "v19",
        espanol: "estómago",
        chino: "胃",
        ejemplo: "Tengo dolor de estómago.",
      },
      {
        id: "v20",
        espanol: "cintura",
        chino: "腰",
        ejemplo: "Tengo cintura pequeña.",
      },
      {
        id: "v21",
        espanol: "pierna",
        chino: "腿",
        ejemplo: "Me duele la pierna.",
      },
      {
        id: "v22",
        espanol: "rodilla",
        chino: "膝盖",
        ejemplo: "Me duele la rodilla.",
      },
      {
        id: "v23",
        espanol: "tobillo",
        chino: "脚踝",
        ejemplo: "Me torcí el tobillo.",
      },
      {
        id: "v24",
        espanol: "pie",
        chino: "脚",
        ejemplo: "Me duelen los pies.",
      },
      {
        id: "v25",
        espanol: "corazón",
        chino: "心脏",
        ejemplo: "Me late el corazón rápido.",
      },
      {
        id: "v26",
        espanol: "pulmón",
        chino: "肺",
        ejemplo: "Los pulmones son para respirar.",
      },
      {
        id: "v27",
        espanol: "me duele",
        chino: "我疼",
        ejemplo: "Me duele la cabeza.",
      },
      {
        id: "v28",
        espanol: "fiebre",
        chino: "发烧",
        ejemplo: "Tengo fiebre.",
      },
      {
        id: "v29",
        espanol: "tos",
        chino: "咳嗽",
        ejemplo: "Tengo tos seca.",
      },
      {
        id: "v30",
        espanol: "resfriado",
        chino: "感冒",
        ejemplo: "Estoy resfriado.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "En el médico",
        tituloChino: "看医生",
        personajes: ["Paciente", "Médico"],
        lineas: [
          {
            personaje: "Médico",
            texto: "Buenos días. ¿Qué le pasa?",
            traduccion: "早上好。您怎么了？",
          },
          {
            personaje: "Paciente",
            texto: "Me duele mucho la cabeza.",
            traduccion: "我头疼得厉害。",
          },
          {
            personaje: "Médico",
            texto: "¿Tiene fiebre?",
            traduccion: "您发烧吗？",
          },
          {
            personaje: "Paciente",
            texto: "Sí, un poco.",
            traduccion: "是的，有点。",
          },
          {
            personaje: "Médico",
            texto: "¿Y el estómago? ¿Le duele?",
            traduccion: "胃呢？疼吗？",
          },
          {
            personaje: "Paciente",
            texto: "No, solo me duele la cabeza.",
            traduccion: "不，只有头疼。",
          },
          {
            personaje: "Médico",
            texto: "Parece que tiene gripe. Descanse mucho y beba líquidos.",
            traduccion: "看起来您得了流感。多休息，多喝水。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Dolor de muelas",
        tituloChino: "牙疼",
        personajes: ["Ana", "Pedro"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Pedro, ¿qué te pasa? Te veo raro.",
            traduccion: "佩德罗，你怎么了？你看起来不对劲。",
          },
          {
            personaje: "Pedro",
            texto: "Me duele mucho una muela desde ayer.",
            traduccion: "我从昨天开始一颗牙疼得厉害。",
          },
          {
            personaje: "Ana",
            texto: "Deberías ir al dentista.",
            traduccion: "你应该去看牙医。",
          },
          {
            personaje: "Pedro",
            texto: "Lo sé, pero tengo miedo del dentista.",
            traduccion: "我知道，但我害怕牙医。",
          },
          {
            personaje: "Ana",
            texto: "No te preocupes, te acompaño yo.",
            traduccion: "别担心，我陪你去。",
          },
          {
            personaje: "Pedro",
            texto: "Gracias, Ana. Eres muy buena amiga.",
            traduccion: "谢谢，安娜。你真是好朋友。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Después de hacer deporte",
        tituloChino: "运动之后",
        personajes: ["Carlos", "Luis"],
        lineas: [
          {
            personaje: "Carlos",
            texto: "Luis, ¿estás bien? Te veo muy cansado.",
            traduccion: "路易斯，你还好吗？你看起来很累。",
          },
          {
            personaje: "Luis",
            texto: "Estoy agotado. Me duelen todas las piernas.",
            traduccion: "我筋疲力尽。我整条腿都疼。",
          },
          {
            personaje: "Carlos",
            texto: "¿Y las rodillas?",
            traduccion: "膝盖呢？",
          },
          {
            personaje: "Luis",
            texto: "También me duelen un poco.",
            traduccion: "也有点疼。",
          },
          {
            personaje: "Carlos",
            texto: "Deberías estirar los músculos para que no te duelan mañana.",
            traduccion: "你应该拉伸肌肉，这样明天就不会疼了。",
          },
          {
            personaje: "Luis",
            texto: "Tienes razón. Voy a estirar ahora mismo.",
            traduccion: "你说得对。我现在就拉伸。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "En la farmacia",
        tituloChino: "在药店",
        personajes: ["Cliente", "Farmacéutico"],
        lineas: [
          {
            personaje: "Cliente",
            texto: "Buenas tardes. Necesito algo para el dolor de garganta.",
            traduccion: "下午好。我需要治喉咙痛的药。",
          },
          {
            personaje: "Farmacéutico",
            texto: "¿Tiene fiebre o tos?",
            traduccion: "您发烧或咳嗽吗？",
          },
          {
            personaje: "Cliente",
            texto: "No, solo la garganta irritada.",
            traduccion: "不，只是喉咙发炎。",
          },
          {
            personaje: "Farmacéutico",
            texto: "Le recomiendo estas pastillas para chupar. Son muy efectivas.",
            traduccion: "我推荐这些含片。非常有效。",
          },
          {
            personaje: "Cliente",
            texto: "¿Cómo se toman?",
            traduccion: "怎么服用？",
          },
          {
            personaje: "Farmacéutico",
            texto: "Una pastilla cada cuatro horas.",
            traduccion: "每四小时一片。",
          },
          {
            personaje: "Cliente",
            texto: "Gracias. ¿Cuánto es?",
            traduccion: "谢谢。多少钱？",
          },
          {
            personaje: "Farmacéutico",
            texto: "Son ocho euros con cincuenta.",
            traduccion: "八欧元五十。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "En urgencias del hospital",
        tituloChino: "在医院急诊",
        personajes: ["Médico", "Paciente"],
        lineas: [
          {
            personaje: "Médico",
            texto: "Dígame, ¿qué le ha pasado?",
            traduccion: "告诉我，您怎么了？",
          },
          {
            personaje: "Paciente",
            texto: "Me he caído de la bicicleta y me duele mucho el brazo.",
            traduccion: "我从自行车上摔下来了，手臂很疼。",
          },
          {
            personaje: "Médico",
            texto: "¿Puede mover los dedos?",
            traduccion: "您能活动手指吗？",
          },
          {
            personaje: "Paciente",
            texto: "Sí, pero me duele al mover el brazo.",
            traduccion: "可以，但活动手臂时疼。",
          },
          {
            personaje: "Médico",
            texto: "Vamos a hacerle una radiografía. Puede que tenga una fractura.",
            traduccion: "我们给您拍个X光片。可能有骨折。",
          },
          {
            personaje: "Paciente",
            texto: "Ay, espero que no sea grave.",
            traduccion: "哎呀，希望不严重。",
          },
          {
            personaje: "Médico",
            texto: "Tranquilo, primero la radiografía y luego vemos.",
            traduccion: "别紧张，先拍X光片然后再说。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "我们用_____看东西。",
          preguntaChino: "我们用_____看东西。",
          respuestaCorrecta: "ojos",
          explicacion: "我们用眼睛看东西。",
          pista: "首字母是 o，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c2",
          pregunta: "为了表达疼痛：Me _____ la cabeza.",
          preguntaChino: "为了表达疼痛：Me _____ la cabeza.",
          respuestaCorrecta: "duele",
          explicacion: "'Me duele' = 我疼。",
          pista: "首字母是 d，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c3",
          pregunta: "当我们生病时说：Estoy _____",
          preguntaChino: "当我们生病时说：Estoy _____",
          respuestaCorrecta: "enfermo",
          explicacion: "'Estoy enfermo' = 我生病了。",
          pista: "首字母是 e，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c4",
          pregunta: "我们用_____走路。",
          preguntaChino: "我们用_____走路。",
          respuestaCorrecta: "pies",
          explicacion: "我们用脚走路。",
          pista: "首字母是 p，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c5",
          pregunta: "为了说'我发烧了'我们说：Tengo _____",
          preguntaChino: "为了说'我发烧了'我们说：Tengo _____",
          respuestaCorrecta: "fiebre",
          explicacion: "'Tengo fiebre' = 我发烧了。",
          pista: "首字母是 f，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c6",
          pregunta: "我们用来听音乐的身体部位是：_____",
          preguntaChino: "我们用来听音乐的身体部位是：_____",
          respuestaCorrecta: "orejas",
          explicacion: "Orejas = 耳朵",
          pista: "首字母是 o，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c7",
          pregunta: "我咳嗽：Tengo _____",
          preguntaChino: "我咳嗽：Tengo _____",
          respuestaCorrecta: "tos",
          explicacion: "Tos = 咳嗽",
          pista: "首字母是 t，3个字母",
          numeroLetras: 3,
        },
        {
          id: "c8",
          pregunta: "为了说'我胃疼'：Me duele el _____",
          preguntaChino: "为了说'我胃疼'：Me duele el _____",
          respuestaCorrecta: "estómago",
          explicacion: "Estómago = 胃",
          pista: "首字母是 e，8个字母",
          numeroLetras: 8,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "牙齿在哪里？",
          preguntaChino: "牙齿在哪里？",
          opciones: ["在手上", "在嘴巴里", "在脚上", "在手臂上"],
          respuestaCorrecta: "在嘴巴里",
          explicacion: "牙齿在嘴巴里。",
        },
        {
          id: "s2",
          pregunta: "你如何表达身体疼痛？",
          preguntaChino: "你如何表达身体疼痛？",
          opciones: ["Me gusta", "Me duele", "Me encanta", "Me parece"],
          respuestaCorrecta: "Me duele",
          explicacion: "'Me duele' = 我疼。",
        },
        {
          id: "s3",
          pregunta: "我们用什么走路？",
          preguntaChino: "我们用什么走路？",
          opciones: ["manos", "brazos", "pies", "ojos"],
          respuestaCorrecta: "pies",
          explicacion: "我们用脚走路。",
        },
        {
          id: "s4",
          pregunta: "'Tengo fiebre'是什么意思？",
          preguntaChino: "'Tengo fiebre'是什么意思？",
          opciones: ["我头痛", "我发烧", "我咳嗽", "我感冒"],
          respuestaCorrecta: "我发烧",
          explicacion: "'Tengo fiebre' = 我发烧了。",
        },
        {
          id: "s5",
          pregunta: "我们用什么闻气味？",
          preguntaChino: "我们用什么闻气味？",
          opciones: ["ojos", "orejas", "nariz", "boca"],
          respuestaCorrecta: "nariz",
          explicacion: "我们用鼻子闻气味。",
        },
        {
          id: "s6",
          pregunta: "¿Qué significa 'Me duelen los pies'?",
          preguntaChino: "'Me duelen los pies'是什么意思？",
          opciones: ["我头疼", "我脚疼", "我手疼", "我背疼"],
          respuestaCorrecta: "我脚疼",
          explicacion: "Pies = 脚",
        },
        {
          id: "s7",
          pregunta: "¿Cuál es el órgano que bombea la sangre?",
          preguntaChino: "哪个器官泵送血液？",
          opciones: ["cerebro", "pulmón", "corazón", "estómago"],
          respuestaCorrecta: "corazón",
          explicacion: "Corazón = 心脏",
        },
        {
          id: "s8",
          pregunta: "¿Cómo se dice '我感冒了' en español?",
          preguntaChino: "西班牙语中'我感冒了'怎么说？",
          opciones: ["Tengo frío", "Tengo gripe", "Estoy resfriado", "Tengo calor"],
          respuestaCorrecta: "Estoy resfriado",
          explicacion: "Resfriado = 感冒",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Me duele'用于表达疼痛。",
          preguntaChino: "'Me duele'用于表达疼痛。",
          respuestaCorrecta: true,
          explicacion: "对。'Me duele' = 我疼。",
        },
        {
          id: "vf2",
          pregunta: "眼睛在嘴巴里。",
          preguntaChino: "眼睛在嘴巴里。",
          respuestaCorrecta: false,
          explicacion: "错。眼睛在脸上，不在嘴巴里。",
        },
        {
          id: "vf3",
          pregunta: "'Tengo fiebre'意思是体温高。",
          preguntaChino: "'Tengo fiebre'意思是体温高。",
          respuestaCorrecta: true,
          explicacion: "对。发烧就是体温高。",
        },
        {
          id: "vf4",
          pregunta: "我们用耳朵看东西。",
          preguntaChino: "我们用耳朵看东西。",
          respuestaCorrecta: false,
          explicacion: "错。我们用耳朵听，用眼睛看。",
        },
        {
          id: "vf5",
          pregunta: "'Estoy resfriado'意思是'我感冒了'。",
          preguntaChino: "'Estoy resfriado'意思是'我感冒了'。",
          respuestaCorrecta: true,
          explicacion: "对。'Resfriado' = 感冒。",
        },
        {
          id: "vf6",
          pregunta: "El 'corazón' está en la cabeza.",
          preguntaChino: "'Corazón'在头部。",
          respuestaCorrecta: false,
          explicacion: "错。El corazón está en el pecho.",
        },
        {
          id: "vf7",
          pregunta: "El 'hígado' es un órgano interno.",
          preguntaChino: "'Hígado'是内部器官。",
          respuestaCorrecta: true,
          explicacion: "对。Hígado = 肝脏",
        },
        {
          id: "vf8",
          pregunta: "'Me duelen los dientes' es correcto para dolor de muelas.",
          preguntaChino: "'Me duelen los dientes'对于牙疼是正确的。",
          respuestaCorrecta: true,
          explicacion: "对。Dientes = 牙齿",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "cabeza",
              derecha: "头",
            },
            {
              izquierda: "ojo",
              derecha: "眼睛",
            },
            {
              izquierda: "nariz",
              derecha: "鼻子",
            },
            {
              izquierda: "boca",
              derecha: "嘴巴",
            },
            {
              izquierda: "mano",
              derecha: "手",
            },
            {
              izquierda: "pie",
              derecha: "脚",
            },
            {
              izquierda: "pierna",
              derecha: "腿",
            },
            {
              izquierda: "brazo",
              derecha: "手臂",
            },
            {
              izquierda: "corazón",
              derecha: "心脏",
            },
            {
              izquierda: "estómago",
              derecha: "胃",
            },
            {
              izquierda: "espalda",
              derecha: "背部",
            },
            {
              izquierda: "rodilla",
              derecha: "膝盖",
            },
          ],
          explicacion: "将身体部位与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["cabeza", "Me", "duele", "la", "."],
          respuestaCorrecta: "Me duele la cabeza.",
          explicacion: "正确的句子是：Me duele la cabeza.（我头疼。）",
        },
        {
          id: "o2",
          palabras: ["los", "Me", "pies", "duelen", "."],
          respuestaCorrecta: "Me duelen los pies.",
          explicacion: "正确的句子是：Me duelen los pies.（我脚疼。）",
        },
        {
          id: "o3",
          palabras: ["tiene", "Ella", "azules", "ojos", "."],
          respuestaCorrecta: "Ella tiene ojos azules.",
          explicacion: "正确的句子是：Ella tiene ojos azules.（她有蓝色的眼睛。）",
        },
        {
          id: "o4",
          palabras: ["tengo", "fiebre", "y", "tos", "."],
          respuestaCorrecta: "Tengo fiebre y tos.",
          explicacion: "正确的顺序是：Tengo fiebre y tos.",
        },
        {
          id: "o5",
          palabras: ["estómago", "Me", "duele", "el", "."],
          respuestaCorrecta: "Me duele el estómago.",
          explicacion: "正确的顺序是：Me duele el estómago.",
        },
        {
          id: "o6",
          palabras: ["resfriado", "Estoy", "porque", "tengo", "tos", "."],
          respuestaCorrecta: "Estoy resfriado porque tengo tos.",
          explicacion: "正确的顺序是：Estoy resfriado porque tengo tos.",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我头疼。",
          respuestaEsperada: "Me duele la cabeza.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "我发烧了。",
          respuestaEsperada: "Tengo fiebre.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "我背疼。",
          respuestaEsperada: "Me duele la espalda.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "我感冒了。",
          respuestaEsperada: "Estoy resfriado.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "我咳嗽。",
          respuestaEsperada: "Tengo tos.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "我胃疼。",
          respuestaEsperada: "Me duele el estómago.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "她头发很长。",
          respuestaEsperada: "Ella tiene el pelo largo.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "我摔断了腿。",
          respuestaEsperada: "Me rompí la pierna.",
          explicacion: "西班牙语翻译",
        },
      ],
    },
    ejerciciosPracticos: [
      {
        id: "ep1",
        tipo: "completarDialogo",
        titulo: "完成对话",
        tituloChino: "完成对话",
        instruccion: "用正确的身体部位词汇完成医疗对话。",
        instruccionChino: "用正确的身体部位词汇完成医疗对话。",
        dialogo: [
          {
            personaje: "Médico",
            texto: "¿Qué le _____?",
            respuesta: "pasa",
          },
          {
            personaje: "Paciente",
            texto: "Me duele la _____.",
            respuesta: "cabeza / espalda / pierna",
          },
          {
            personaje: "Médico",
            texto: "¿Tiene _____?",
            respuesta: "fiebre",
          },
          {
            personaje: "Paciente",
            texto: "Sí, un _____.",
            respuesta: "poco",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "completarFrases",
        titulo: "完成句子",
        tituloChino: "完成句子",
        instruccion: "用正确的身体部位完成句子。",
        instruccionChino: "用正确的身体部位完成句子。",
        frases: [
          {
            frase: "Me duele la _____ (头).",
            respuesta: "cabeza",
          },
          {
            frase: "Me duelen los _____ (脚).",
            respuesta: "pies",
          },
          {
            frase: "Me duele el _____ (胃).",
            respuesta: "estómago",
          },
          {
            frase: "Tiene los _____ azules (眼睛).",
            respuesta: "ojos",
          },
          {
            frase: "Tengo dolor de _____ (喉咙).",
            respuesta: "garganta",
          },
          {
            frase: "Me duelen las _____ (膝盖).",
            respuesta: "rodillas",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "describir",
        titulo: "Describe tu cuerpo",
        tituloChino: "描述你的身体",
        instruccion: "Describe 5 características físicas tuyas en español.",
        instruccionChino: "用西班牙语描述你的5个身体特征。",
        ejemplo: "Tengo ojos marrones, pelo castaño, nariz pequeña, boca grande y manos grandes.",
      },
      {
        id: "ep4",
        tipo: "enfermedades",
        titulo: "Enfermedades comunes",
        tituloChino: "常见疾病",
        instruccion: "Escribe qué síntomas tienes si estás resfriado.",
        instruccionChino: "写出如果你感冒了会有什么症状。",
        ejemplo: "Cuando estoy resfriado, tengo tos, fiebre, dolor de cabeza y me duele la garganta.",
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Qué parte del cuerpo te duele ahora?",
        preguntaChino: "你现在身体哪个部位疼？",
        sugerencia: "Me duele la (cabeza / espalda / pierna / etc.).",
        sugerenciaChino: "Me duele la (cabeza / espalda / pierna / etc.).",
      },
      {
        id: "pa2",
        pregunta: "Describe tu cara en español.",
        preguntaChino: "用西班牙语描述你的脸。",
        sugerencia: "Tengo los ojos marrones, la nariz pequeña y la boca grande.",
        sugerenciaChino: "Tengo los ojos marrones, la nariz pequeña y la boca grande.",
      },
      {
        id: "pa3",
        pregunta: "¿Qué haces cuando te duele la cabeza?",
        preguntaChino: "你头疼的时候做什么？",
        sugerencia: "Cuando me duele la cabeza, tomo una pastilla y descanso.",
        sugerenciaChino: "Cuando me duele la cabeza, tomo una pastilla y descanso.",
      },
      {
        id: "pa4",
        pregunta: "¿Qué haces para mantenerte sano/a?",
        preguntaChino: "你做什么来保持健康？",
        sugerencia: "Hago ejercicio, como fruta y verdura, y duermo bien.",
        sugerenciaChino: "Hago ejercicio, como fruta y verdura, y duermo bien.",
      },
      {
        id: "pa5",
        pregunta: "¿Cuál es la función del corazón?",
        preguntaChino: "心脏的功能是什么？",
        sugerencia: "El corazón bombea la sangre a todo el cuerpo.",
        sugerenciaChino: "El corazón bombea la sangre a todo el cuerpo.",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '头' en español?",
        preguntaChino: "西班牙语中'头'怎么说？",
        respuestaSugerida: "cabeza",
        respuestaSugeridaChino: "cabeza",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '我胃疼' en español?",
        preguntaChino: "西班牙语中'我胃疼'怎么说？",
        respuestaSugerida: "Me duele el estómago.",
        respuestaSugeridaChino: "Me duele el estómago.",
      },
      {
        id: "p3",
        pregunta: "¿Qué significa 'Tengo fiebre'?",
        preguntaChino: "'Tengo fiebre'是什么意思？",
        respuestaSugerida: "我发烧了",
        respuestaSugeridaChino: "I have a fever",
      },
      {
        id: "p4",
        pregunta: "¿Con qué parte del cuerpo escuchas música?",
        preguntaChino: "你用身体的哪个部位听音乐？",
        respuestaSugerida: "Con las orejas.",
        respuestaSugeridaChino: "Con las orejas.",
      },
      {
        id: "p5",
        pregunta: "¿Cómo se dice '咳嗽' en español?",
        preguntaChino: "西班牙语中'咳嗽'怎么说？",
        respuestaSugerida: "tos",
        respuestaSugeridaChino: "tos",
      },
      {
        id: "p6",
        pregunta: "¿Qué órgano es responsable de bombear la sangre?",
        preguntaChino: "哪个器官负责泵送血液？",
        respuestaSugerida: "El corazón.",
        respuestaSugeridaChino: "El corazón.",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Deportes populares",
        tituloChino: "流行运动",
        descripcion: `🔹 DEPORTES DE EQUIPO (team sports):
• fútbol = football / soccer
• baloncesto = basketball
• voleibol = volleyball
• balonmano = handball
• rugby = rugby
• hockey = hockey
• béisbol = baseball
• waterpolo = water polo

🔹 DEPORTES INDIVIDUALES (individual sports):
• tenis = tennis
• natación = swimming
• atletismo = athletics
• ciclismo = cycling
• golf = golf
• esquí = skiing
• snowboard = snowboarding
• patinaje = skating
• gimnasia = gymnastics
• yoga = yoga
• pilates = pilates
• boxeo = boxing
• judo = judo
• karate = karate
• esgrima = fencing
• tiro con arco = archery

🔹 DEPORTES DE RAQUETA (racket sports):
• tenis = tennis
• pádel = padel
• squash = squash
• bádminton = badminton

🔹 DEPORTES DE AVENTURA (adventure sports):
• senderismo = hiking
• escalada = climbing
• buceo = diving
• surf = surfing
• kitesurf = kitesurfing
• parapente = paragliding

🔹 VERBOS ÚTILES (useful verbs):
• jugar al + deporte (jugar al fútbol) = to play (team sports)
• practicar + deporte (practicar natación) = to practice
• hacer + deporte (hacer ejercicio) = to do (exercise)
• montar en + medio (montar en bici) = to ride

📌 EJEMPLOS:
• Juego al fútbol los fines de semana.
• Practico natación desde niño.
• Hago ejercicio cada mañana.
• ¿Juegas al tenis?`,
        descripcionChino: `🔹 团队运动：
• fútbol = 足球
• baloncesto = 篮球
• voleibol = 排球
• balonmano = 手球
• rugby = 橄榄球
• hockey = 曲棍球
• béisbol = 棒球
• waterpolo = 水球

🔹 个人运动：
• tenis = 网球
• natación = 游泳
• atletismo = 田径
• ciclismo = 自行车
• golf = 高尔夫
• esquí = 滑雪
• snowboard = 单板滑雪
• patinaje = 滑冰
• gimnasia = 体操
• yoga = 瑜伽
• pilates = 普拉提
• boxeo = 拳击
• judo = 柔道
• karate = 空手道
• esgrima = 击剑
• tiro con arco = 射箭

🔹 球拍运动：
• tenis = 网球
• pádel = 板式网球
• squash = 壁球
• bádminton = 羽毛球

🔹 冒险运动：
• senderismo = 徒步
• escalada = 攀岩
• buceo = 潜水
• surf = 冲浪
• kitesurf = 风筝冲浪
• parapente = 滑翔伞

🔹 有用动词：
• jugar al + 运动 = 打/玩...（团队运动）
• practicar + 运动 = 练习/从事...
• hacer + 运动 = 做...运动
• montar en + 交通工具 = 骑...

📌 例子：
• Juego al fútbol los fines de semana. = 我周末踢足球。
• Practico natación desde niño. = 我从小游泳。
• Hago ejercicio cada mañana. = 我每天早上锻炼。
• ¿Juegas al tenis? = 你打网球吗？`,
        ejemplos: [
          {
            espanol: "Juego al fútbol los fines de semana.",
            chino: "我周末踢足球。",
          },
          {
            espanol: "Practico natación desde niño.",
            chino: "我从小游泳。",
          },
          {
            espanol: "¿Juegas al tenis?",
            chino: "你打网球吗？",
          },
          {
            espanol: "Me gusta hacer senderismo en la montaña.",
            chino: "我喜欢在山上徒步。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "En el gimnasio",
        tituloChino: "在健身房",
        descripcion: `🔹 VOCABULARIO DEL GIMNASIO (gym vocabulary):
• gimnasio = gym
• entrenar = to train
• entrenamiento = training / workout
• ejercicio = exercise
• pesa = weight (dumbbell)
• mancuerna = dumbbell
• barra = bar
• máquina = machine
• cinta de correr = treadmill
• bicicleta estática = stationary bike
• elíptica = elliptical machine
• remo = rowing machine
• banco = bench
• colchoneta = mat

🔹 EJERCICIOS (exercises):
• sentadilla = squat
• flexión / lagartija = push-up
• abdominal = crunch / sit-up
• plancha = plank
• burpee = burpee
• zancada = lunge
• peso muerto = deadlift
• press de banca = bench press
• dominada = pull-up
• fondos = dips

🔹 FRASES ÚTILES (useful phrases):
• Voy al gimnasio tres veces por semana.
• Hago ejercicio cada día.
• Levanto pesas.
• Corro en la cinta durante 30 minutos.
• Hago series de abdominales.
• Entreno pierna y glúteo hoy.
• Estoy de vuelta al gimnasio después de un tiempo.

🔹 PARTES DEL CUERPO QUE SE ENTRENAN:
• entrenar piernas = leg day
• entrenar brazos = arm day
• entrenar pecho = chest day
• entrenar espalda = back day
• entrenar hombros = shoulder day
• entrenar core = core workout

📌 EJEMPLOS:
• Voy al gimnasio tres veces por semana.
• Hago sentadillas con pesas.
• Corro en la cinta durante 30 minutos.`,
        descripcionChino: `🔹 健身房词汇：
• gimnasio = 健身房
• entrenar = 训练/锻炼
• entrenamiento = 训练/锻炼
• ejercicio = 运动
• pesa = 哑铃/重量
• mancuerna = 哑铃
• barra = 杠铃杆
• máquina = 器械
• cinta de correr = 跑步机
• bicicleta estática = 健身车
• elíptica = 椭圆机
• remo = 划船机
• banco = 长凳
• colchoneta = 垫子

🔹 练习动作：
• sentadilla = 深蹲
• flexión / lagartija = 俯卧撑
• abdominal = 仰卧起坐
• plancha = 平板支撑
• burpee = 波比跳
• zancada = 弓步
• peso muerto = 硬拉
• press de banca = 卧推
• dominada = 引体向上
• fondos = 双杠臂屈伸

🔹 有用句子：
• Voy al gimnasio tres veces por semana. = 我每周去健身房三次。
• Hago ejercicio cada día. = 我每天锻炼。
• Levanto pesas. = 我举重。
• Corro en la cinta durante 30 minutos. = 我在跑步机上跑30分钟。
• Hago series de abdominales. = 我做几组仰卧起坐。
• Entreno pierna y glúteo hoy. = 今天我练腿和臀部。
• Estoy de vuelta al gimnasio después de un tiempo. = 一段时间后我回到了健身房。

🔹 锻炼的身体部位：
• entrenar piernas = 练腿日
• entrenar brazos = 练手臂日
• entrenar pecho = 练胸日
• entrenar espalda = 练背日
• entrenar hombros = 练肩日
• entrenar core = 核心训练

📌 例子：
• Voy al gimnasio tres veces por semana. = 我每周去健身房三次。
• Hago sentadillas con pesas. = 我做负重深蹲。
• Corro en la cinta durante 30 minutos. = 我在跑步机上跑30分钟。`,
        ejemplos: [
          {
            espanol: "Voy al gimnasio tres veces por semana.",
            chino: "我每周去健身房三次。",
          },
          {
            espanol: "Hago sentadillas con pesas.",
            chino: "我做负重深蹲。",
          },
          {
            espanol: "Corro en la cinta durante 30 minutos.",
            chino: "我在跑步机上跑30分钟。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Hablar de deportes",
        tituloChino: "谈论运动",
        descripcion: `🔹 PREGUNTAS COMUNES (common questions):
• ¿Practicas algún deporte?
• ¿Qué deporte te gusta?
• ¿Juegas al fútbol?
• ¿Con qué frecuencia haces ejercicio?
• ¿Cuál es tu deporte favorito?
• ¿Eres de algún equipo?
• ¿Ves los partidos por televisión?
• ¿Has ido a algún partido en el estadio?

🔹 RESPUESTAS COMUNES (common answers):
• Sí, juego al baloncesto.
• Me gusta la natación.
• Hago ejercicio tres veces por semana.
• Mi deporte favorito es el tenis.
• Soy del Real Madrid. (I'm a Real Madrid fan)
• Veo todos los partidos de mi equipo.
• He ido al estadio varias veces.

🔹 EXPRESIONES ÚTILES (useful expressions):
• Soy aficionado al fútbol. = I'm a football fan.
• Entreno todos los días. = I train every day.
• Voy al gimnasio con mis amigos. = I go to the gym with my friends.
• Me he apuntado a un equipo. = I've joined a team.
• Estoy en forma = I'm in shape
• Necesito ponerme en forma = I need to get in shape
• Me duele todo el cuerpo después de entrenar = My whole body hurts after training
• Hoy toca descanso = Today is rest day

🔹 VOCABULARIO DE COMPETICIONES:
• partido = match (football, basketball)
• encuentro = match
• torneo = tournament
• liga = league
• campeonato = championship
• final = final
• semifinal = semifinal
• cuartos de final = quarterfinal
• entrenamiento = training
• calentamiento = warm-up
• estiramiento = stretching`,
        descripcionChino: `🔹 常见问题：
• ¿Practicas algún deporte? = 你做运动吗？
• ¿Qué deporte te gusta? = 你喜欢什么运动？
• ¿Juegas al fútbol? = 你踢足球吗？
• ¿Con qué frecuencia haces ejercicio? = 你多久锻炼一次？
• ¿Cuál es tu deporte favorito? = 你最喜欢的运动是什么？
• ¿Eres de algún equipo? = 你是哪个球队的球迷？
• ¿Ves los partidos por televisión? = 你看电视转播的比赛吗？
• ¿Has ido a algún partido en el estadio? = 你去体育场看过比赛吗？

🔹 常见回答：
• Sí, juego al baloncesto. = 是的，我打篮球。
• Me gusta la natación. = 我喜欢游泳。
• Hago ejercicio tres veces por semana. = 我每周锻炼三次。
• Mi deporte favorito es el tenis. = 我最喜欢的运动是网球。
• Soy del Real Madrid. = 我是皇马球迷。
• Veo todos los partidos de mi equipo. = 我看我球队的所有比赛。
• He ido al estadio varias veces. = 我去过体育场好几次了。

🔹 有用表达：
• Soy aficionado al fútbol. = 我是足球迷。
• Entreno todos los días. = 我每天都训练。
• Voy al gimnasio con mis amigos. = 我和朋友一起去健身房。
• Me he apuntado a un equipo. = 我加入了一支球队。
• Estoy en forma = 我身材好/健康
• Necesito ponerme en forma = 我需要健身/恢复体型
• Me duele todo el cuerpo después de entrenar = 训练后我全身疼
• Hoy toca descanso = 今天休息日

🔹 比赛词汇：
• partido = 比赛（足球、篮球）
• encuentro = 比赛
• torneo = 锦标赛
• liga = 联赛
• campeonato = 冠军赛
• final = 决赛
• semifinal = 半决赛
• cuartos de final = 四分之一决赛
• entrenamiento = 训练
• calentamiento = 热身
• estiramiento = 拉伸`,
        ejemplos: [
          {
            espanol: "Mi deporte favorito es el fútbol.",
            chino: "我最喜欢的运动是足球。",
          },
          {
            espanol: "Entreno todos los días.",
            chino: "我每天都训练。",
          },
          {
            espanol: "Voy al gimnasio con mis amigos.",
            chino: "我和朋友一起去健身房。",
          },
          {
            espanol: "Estoy en forma gracias al deporte.",
            chino: "因为运动我身材很好。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Eventos deportivos y competiciones",
        tituloChino: "体育赛事和比赛",
        descripcion: `🔹 EVENTOS IMPORTANTES (important events):
• Juegos Olímpicos = Olympic Games
• Mundial de Fútbol = Football World Cup
• Eurocopa = European Championship
• Copa del Mundo = World Cup
• Champions League = Champions League
• Tour de Francia = Tour de France
• Roland Garros = Roland Garros
• Wimbledon = Wimbledon
• Super Bowl = Super Bowl

🔹 ROLES EN EL DEPORTE (roles in sports):
• deportista = sportsman/sportswoman
• atleta = athlete
• jugador / jugadora = player
• entrenador / entrenadora = coach
• árbitro / árbitra = referee
• capitán / capitana = captain
• aficionado / aficionada = fan
• espectador / espectadora = spectator

🔹 RESULTADOS (results):
• ganar = to win
• perder = to lose
• empatar = to tie / draw
• marcar un gol = to score a goal
• ganar el partido = to win the match
• perder la final = to lose the final
• campeón / campeona = champion
• subcampeón = runner-up

📌 EJEMPLOS:
• España ganó el Mundial de 2010.
• El equipo perdió la final por 2-1.
• El partido terminó en empate.
• Messi marcó dos goles en la final.`,
        descripcionChino: `🔹 重要赛事：
• Juegos Olímpicos = 奥林匹克运动会
• Mundial de Fútbol = 足球世界杯
• Eurocopa = 欧洲杯
• Copa del Mundo = 世界杯
• Champions League = 欧洲冠军联赛
• Tour de Francia = 环法自行车赛
• Roland Garros = 法国网球公开赛
• Wimbledon = 温布尔登网球锦标赛
• Super Bowl = 超级碗

🔹 体育中的角色：
• deportista = 运动员
• atleta = 田径运动员/运动员
• jugador / jugadora = 球员
• entrenador / entrenadora = 教练
• árbitro / árbitra = 裁判
• capitán / capitana = 队长
• aficionado / aficionada = 球迷
• espectador / espectadora = 观众

🔹 比赛结果：
• ganar = 赢
• perder = 输
• empatar = 平局
• marcar un gol = 进球
• ganar el partido = 赢得比赛
• perder la final = 输掉决赛
• campeón / campeona = 冠军
• subcampeón = 亚军

📌 例子：
• España ganó el Mundial de 2010. = 西班牙赢得了2010年世界杯。
• El equipo perdió la final por 2-1. = 球队以2-1输掉了决赛。
• El partido terminó en empate. = 比赛以平局结束。
• Messi marcó dos goles en la final. = 梅西在决赛中进了两个球。`,
        ejemplos: [
          {
            espanol: "El Mundial de fútbol se celebra cada cuatro años.",
            chino: "足球世界杯每四年举办一次。",
          },
          {
            espanol: "Mi equipo favorito ganó la Champions.",
            chino: "我喜欢的球队赢得了欧冠。",
          },
          {
            espanol: "El árbitro expulsó a un jugador.",
            chino: "裁判罚下了一名球员。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "fútbol",
        chino: "足球",
        ejemplo: "Juego al fútbol.",
      },
      {
        id: "v2",
        espanol: "baloncesto",
        chino: "篮球",
        ejemplo: "Juego al baloncesto.",
      },
      {
        id: "v3",
        espanol: "tenis",
        chino: "网球",
        ejemplo: "Juego al tenis.",
      },
      {
        id: "v4",
        espanol: "natación",
        chino: "游泳",
        ejemplo: "Practico natación.",
      },
      {
        id: "v5",
        espanol: "ciclismo",
        chino: "自行车",
        ejemplo: "Hago ciclismo.",
      },
      {
        id: "v6",
        espanol: "atletismo",
        chino: "田径",
        ejemplo: "Practico atletismo.",
      },
      {
        id: "v7",
        espanol: "voleibol",
        chino: "排球",
        ejemplo: "Juego al voleibol.",
      },
      {
        id: "v8",
        espanol: "balonmano",
        chino: "手球",
        ejemplo: "Juego al balonmano.",
      },
      {
        id: "v9",
        espanol: "esquí",
        chino: "滑雪",
        ejemplo: "Voy a esquiar.",
      },
      {
        id: "v10",
        espanol: "senderismo",
        chino: "徒步",
        ejemplo: "Hago senderismo.",
      },
      {
        id: "v11",
        espanol: "yoga",
        chino: "瑜伽",
        ejemplo: "Practico yoga.",
      },
      {
        id: "v12",
        espanol: "correr",
        chino: "跑步",
        ejemplo: "Salgo a correr.",
      },
      {
        id: "v13",
        espanol: "gimnasio",
        chino: "健身房",
        ejemplo: "Voy al gimnasio.",
      },
      {
        id: "v14",
        espanol: "entrenar",
        chino: "训练",
        ejemplo: "Entreno cada día.",
      },
      {
        id: "v15",
        espanol: "ejercicio",
        chino: "锻炼",
        ejemplo: "Hago ejercicio.",
      },
      {
        id: "v16",
        espanol: "pesa",
        chino: "哑铃",
        ejemplo: "Levanto pesas.",
      },
      {
        id: "v17",
        espanol: "sentadilla",
        chino: "深蹲",
        ejemplo: "Hago sentadillas.",
      },
      {
        id: "v18",
        espanol: "flexión",
        chino: "俯卧撑",
        ejemplo: "Hago flexiones.",
      },
      {
        id: "v19",
        espanol: "abdominal",
        chino: "仰卧起坐",
        ejemplo: "Hago abdominales.",
      },
      {
        id: "v20",
        espanol: "cinta de correr",
        chino: "跑步机",
        ejemplo: "Corro en la cinta.",
      },
      {
        id: "v21",
        espanol: "equipo",
        chino: "队伍",
        ejemplo: "Mi equipo favorito.",
      },
      {
        id: "v22",
        espanol: "partido",
        chino: "比赛",
        ejemplo: "Veo el partido.",
      },
      {
        id: "v23",
        espanol: "deporte",
        chino: "运动",
        ejemplo: "Practico deporte.",
      },
      {
        id: "v24",
        espanol: "ganar",
        chino: "赢",
        ejemplo: "Mi equipo ganó.",
      },
      {
        id: "v25",
        espanol: "perder",
        chino: "输",
        ejemplo: "Perdieron la final.",
      },
      {
        id: "v26",
        espanol: "empatar",
        chino: "平局",
        ejemplo: "El partido empató.",
      },
      {
        id: "v27",
        espanol: "campeón",
        chino: "冠军",
        ejemplo: "Son los campeones.",
      },
      {
        id: "v28",
        espanol: "aficionado",
        chino: "球迷",
        ejemplo: "Soy aficionado.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Hablando de deportes",
        tituloChino: "谈论运动",
        personajes: ["Ana", "Carlos"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Carlos, ¿practicas algún deporte?",
            traduccion: "卡洛斯，你做运动吗？",
          },
          {
            personaje: "Carlos",
            texto: "Sí, juego al fútbol los fines de semana.",
            traduccion: "是的，我周末踢足球。",
          },
          {
            personaje: "Ana",
            texto: "¡Qué bien! ¿Vas al gimnasio también?",
            traduccion: "真好！你也去健身房吗？",
          },
          {
            personaje: "Carlos",
            texto: "A veces, pero prefiero deportes al aire libre.",
            traduccion: "有时候，但我更喜欢户外运动。",
          },
          {
            personaje: "Ana",
            texto: "¿Cuál es tu equipo favorito?",
            traduccion: "你最喜欢的队伍是哪个？",
          },
          {
            personaje: "Carlos",
            texto: "Soy del Real Madrid.",
            traduccion: "我是皇马球迷。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "En el gimnasio",
        tituloChino: "在健身房",
        personajes: ["Entrenador", "Alumno"],
        lineas: [
          {
            personaje: "Entrenador",
            texto: "Buenos días. ¿Qué vas a entrenar hoy?",
            traduccion: "早上好。你今天要练什么？",
          },
          {
            personaje: "Alumno",
            texto: "Voy a hacer pierna y cardio.",
            traduccion: "我要练腿和有氧。",
          },
          {
            personaje: "Entrenador",
            texto: "Perfecto. ¿Cuántas sentadillas haces normalmente?",
            traduccion: "完美。你通常做多少个深蹲？",
          },
          {
            personaje: "Alumno",
            texto: "Hago tres series de quince.",
            traduccion: "我做三组，每组十五个。",
          },
          {
            personaje: "Entrenador",
            texto: "Muy bien. Después puedes correr en la cinta.",
            traduccion: "很好。之后你可以在跑步机上跑。",
          },
          {
            personaje: "Alumno",
            texto: "¿Cuánto tiempo recomienda?",
            traduccion: "您建议多长时间？",
          },
          {
            personaje: "Entrenador",
            texto: "Veinte minutos es suficiente para empezar.",
            traduccion: "二十分钟开始足够了。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Hablando del deporte favorito",
        tituloChino: "谈论最喜欢的运动",
        personajes: ["María", "Pedro"],
        lineas: [
          {
            personaje: "María",
            texto: "Pedro, ¿qué deporte te gusta más?",
            traduccion: "佩德罗，你最喜欢什么运动？",
          },
          {
            personaje: "Pedro",
            texto: "Me gusta mucho el baloncesto. Juego todos los martes.",
            traduccion: "我很喜欢篮球。我每个星期二都打。",
          },
          {
            personaje: "María",
            texto: "¿Y la natación? ¿Te gusta?",
            traduccion: "游泳呢？你喜欢吗？",
          },
          {
            personaje: "Pedro",
            texto: "Sí, pero no tengo tiempo. Solo voy a la piscina en verano.",
            traduccion: "喜欢，但我没时间。我只在夏天去游泳池。",
          },
          {
            personaje: "María",
            texto: "Yo prefiero el yoga. Es muy relajante.",
            traduccion: "我更喜欢瑜伽。很放松。",
          },
          {
            personaje: "Pedro",
            texto: "¿Vas a clases o lo practicas en casa?",
            traduccion: "你去上课还是在家练？",
          },
          {
            personaje: "María",
            texto: "Voy al estudio dos veces por semana. La profesora es genial.",
            traduccion: "我每周去瑜伽馆两次。老师很棒。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Resultados deportivos",
        tituloChino: "比赛结果",
        personajes: ["Luis", "Sofía"],
        lineas: [
          {
            personaje: "Luis",
            texto: "Sofía, ¿viste el partido de anoche?",
            traduccion: "索菲亚，你看了昨晚的比赛吗？",
          },
          {
            personaje: "Sofía",
            texto: "Sí, fue increíble. Mi equipo ganó 3-1.",
            traduccion: "看了，太棒了。我的球队3-1赢了。",
          },
          {
            personaje: "Luis",
            texto: "¿Quién marcó los goles?",
            traduccion: "谁进的球？",
          },
          {
            personaje: "Sofía",
            texto: "Messi marcó dos y Suárez uno.",
            traduccion: "梅西进了两个，苏亚雷斯进了一个。",
          },
          {
            personaje: "Luis",
            texto: "El otro equipo jugó mal. Perdieron muchos balones.",
            traduccion: "另一支球队踢得不好。他们丢了很多球。",
          },
          {
            personaje: "Sofía",
            texto: "Sí, por eso perdieron. ¡Qué emoción la final!",
            traduccion: "是的，所以他们输了。决赛真激动人心！",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Planes para hacer deporte",
        tituloChino: "做运动的计划",
        personajes: ["Laura", "David"],
        lineas: [
          {
            personaje: "Laura",
            texto: "David, ¿quieres salir a correr mañana por la mañana?",
            traduccion: "大卫，你明天早上想出去跑步吗？",
          },
          {
            personaje: "David",
            texto: "Buena idea. ¿A qué hora?",
            traduccion: "好主意。几点？",
          },
          {
            personaje: "Laura",
            texto: "A las ocho. Podemos correr por el parque.",
            traduccion: "八点。我们可以在公园里跑。",
          },
          {
            personaje: "David",
            texto: "Perfecto. ¿Cuántos kilómetros quieres hacer?",
            traduccion: "完美。你想跑多少公里？",
          },
          {
            personaje: "Laura",
            texto: "Unos cinco kilómetros. Necesito ponerme en forma.",
            traduccion: "大约五公里。我需要恢复体型。",
          },
          {
            personaje: "David",
            texto: "Después de correr podemos hacer estiramientos.",
            traduccion: "跑完后我们可以做拉伸。",
          },
          {
            personaje: "Laura",
            texto: "De acuerdo. Nos vemos mañana.",
            traduccion: "好的。明天见。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "我踢足球：Juego al _____",
          preguntaChino: "我踢足球：Juego al _____",
          respuestaCorrecta: "fútbol",
          explicacion: "足球 = fútbol。",
          pista: "首字母是 f，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c2",
          pregunta: "我打篮球：Juego al _____",
          preguntaChino: "我打篮球：Juego al _____",
          respuestaCorrecta: "baloncesto",
          explicacion: "篮球 = baloncesto。",
          pista: "首字母是 b，10个字母",
          numeroLetras: 10,
        },
        {
          id: "c3",
          pregunta: "我游泳：Practico _____",
          preguntaChino: "我游泳：Practico _____",
          respuestaCorrecta: "natación",
          explicacion: "游泳 = natación。",
          pista: "首字母是 n，8个字母",
          numeroLetras: 8,
        },
        {
          id: "c4",
          pregunta: "我去健身房：Voy al _____",
          preguntaChino: "我去健身房：Voy al _____",
          respuestaCorrecta: "gimnasio",
          explicacion: "健身房 = gimnasio。",
          pista: "首字母是 g，8个字母",
          numeroLetras: 8,
        },
        {
          id: "c5",
          pregunta: "我做深蹲：Hago _____",
          preguntaChino: "我做深蹲：Hago _____",
          respuestaCorrecta: "sentadillas",
          explicacion: "深蹲 = sentadillas。",
          pista: "首字母是 s，11个字母",
          numeroLetras: 11,
        },
        {
          id: "c6",
          pregunta: "我在跑步机上跑：Corro en la _____ de correr",
          preguntaChino: "我在跑步机上跑：Corro en la _____ de correr",
          respuestaCorrecta: "cinta",
          explicacion: "Cinta de correr = 跑步机",
          pista: "首字母是 c，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c7",
          pregunta: "我打排球：Juego al _____",
          preguntaChino: "我打排球：Juego al _____",
          respuestaCorrecta: "voleibol",
          explicacion: "Voleibol = 排球",
          pista: "首字母是 v，8个字母",
          numeroLetras: 8,
        },
        {
          id: "c8",
          pregunta: "为了说'我每周去健身房三次'：Voy al gimnasio tres _____ por semana",
          preguntaChino: "为了说'我每周去健身房三次'：Voy al gimnasio tres _____ por semana",
          respuestaCorrecta: "veces",
          explicacion: "Veces = 次",
          pista: "首字母是 v，5个字母",
          numeroLetras: 5,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "你用圆球在球场上玩的运动是什么？",
          preguntaChino: "你用圆球在球场上玩的运动是什么？",
          opciones: ["tenis", "fútbol", "baloncesto", "golf"],
          respuestaCorrecta: "fútbol",
          explicacion: "足球是用圆球在球场上玩的。",
        },
        {
          id: "s2",
          pregunta: "你在哪里用器械和哑铃锻炼？",
          preguntaChino: "你在哪里用器械和哑铃锻炼？",
          opciones: ["在游泳池", "在健身房", "在电影院", "在办公室"],
          respuestaCorrecta: "在健身房",
          explicacion: "健身房有器械和哑铃。",
        },
        {
          id: "s3",
          pregunta: "哪种运动在水里进行？",
          preguntaChino: "哪种运动在水里进行？",
          opciones: ["ciclismo", "natación", "tenis", "baloncesto"],
          respuestaCorrecta: "natación",
          explicacion: "游泳在水里进行。",
        },
        {
          id: "s4",
          pregunta: "瑜伽对身体有什么好处？",
          preguntaChino: "瑜伽对身体有什么好处？",
          opciones: ["增强力量", "提高柔韧性", "增加速度", "增强耐力"],
          respuestaCorrecta: "提高柔韧性",
          explicacion: "瑜伽提高柔韧性和放松。",
        },
        {
          id: "s5",
          pregunta: "哪个是团队运动？",
          preguntaChino: "哪个是团队运动？",
          opciones: ["natación", "golf", "fútbol", "yoga"],
          respuestaCorrecta: "fútbol",
          explicacion: "足球是团队运动。",
        },
        {
          id: "s6",
          pregunta: "¿Qué significa 'hacer ejercicio'?",
          preguntaChino: "'hacer ejercicio'是什么意思？",
          opciones: ["做运动", "看比赛", "买装备", "教体育"],
          respuestaCorrecta: "做运动",
          explicacion: "Hacer ejercicio = 做运动",
        },
        {
          id: "s7",
          pregunta: "¿Cómo se dice '深蹲' en español?",
          preguntaChino: "西班牙语中'深蹲'怎么说？",
          opciones: ["flexión", "abdominal", "sentadilla", "plancha"],
          respuestaCorrecta: "sentadilla",
          explicacion: "Sentadilla = 深蹲",
        },
        {
          id: "s8",
          pregunta: "¿Qué significa 'ganar el partido'?",
          preguntaChino: "'ganar el partido'是什么意思？",
          opciones: ["输掉比赛", "赢得比赛", "平局", "取消比赛"],
          respuestaCorrecta: "赢得比赛",
          explicacion: "Ganar = 赢",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "我们说'Jugar al fútbol'是正确的。",
          preguntaChino: "我们说'Jugar al fútbol'是正确的。",
          respuestaCorrecta: true,
          explicacion: "对。'Jugar al' + 运动。",
        },
        {
          id: "vf2",
          pregunta: "'Practicar natación'是正确的。",
          preguntaChino: "'Practicar natación'是正确的。",
          respuestaCorrecta: true,
          explicacion: "对。'Practicar' + 运动。",
        },
        {
          id: "vf3",
          pregunta: "网球是团队运动。",
          preguntaChino: "网球是团队运动。",
          respuestaCorrecta: false,
          explicacion: "错。网球是个人运动（或双打）。",
        },
        {
          id: "vf4",
          pregunta: "跑步机是健身房里的器械。",
          preguntaChino: "跑步机是健身房里的器械。",
          respuestaCorrecta: true,
          explicacion: "对。cinta de correr = 跑步机。",
        },
        {
          id: "vf5",
          pregunta: "瑜伽需要很多器械。",
          preguntaChino: "瑜伽需要很多器械。",
          respuestaCorrecta: false,
          explicacion: "错。瑜伽只需要垫子，不需要器械。",
        },
        {
          id: "vf6",
          pregunta: "El 'baloncesto' se juega con una pelota pequeña.",
          preguntaChino: "'Baloncesto'用小皮球玩。",
          respuestaCorrecta: false,
          explicacion: "错。El baloncesto se juega con una pelota grande.",
        },
        {
          id: "vf7",
          pregunta: "El 'entrenador' es la persona que dirige al equipo.",
          preguntaChino: "'Entrenador'是指导球队的人。",
          respuestaCorrecta: true,
          explicacion: "对。Entrenador = 教练",
        },
        {
          id: "vf8",
          pregunta: "El 'árbitro' es el que marca los goles.",
          preguntaChino: "'Árbitro'是进球的人。",
          respuestaCorrecta: false,
          explicacion: "错。El árbitro es el que aplica las reglas.",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "fútbol",
              derecha: "足球",
            },
            {
              izquierda: "baloncesto",
              derecha: "篮球",
            },
            {
              izquierda: "tenis",
              derecha: "网球",
            },
            {
              izquierda: "natación",
              derecha: "游泳",
            },
            {
              izquierda: "voleibol",
              derecha: "排球",
            },
            {
              izquierda: "ciclismo",
              derecha: "自行车",
            },
            {
              izquierda: "gimnasio",
              derecha: "健身房",
            },
            {
              izquierda: "yoga",
              derecha: "瑜伽",
            },
            {
              izquierda: "correr",
              derecha: "跑步",
            },
            {
              izquierda: "sentadilla",
              derecha: "深蹲",
            },
            {
              izquierda: "flexión",
              derecha: "俯卧撑",
            },
            {
              izquierda: "abdominal",
              derecha: "仰卧起坐",
            },
          ],
          explicacion: "将运动与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["al", "Juego", "fútbol", "."],
          respuestaCorrecta: "Juego al fútbol.",
          explicacion: "正确的句子是：Juego al fútbol.（我踢足球。）",
        },
        {
          id: "o2",
          palabras: ["gimnasio", "Voy", "al", "semana", "tres", "veces", "por", "."],
          respuestaCorrecta: "Voy al gimnasio tres veces por semana.",
          explicacion: "正确的句子是：Voy al gimnasio tres veces por semana.（我每周去健身房三次。）",
        },
        {
          id: "o3",
          palabras: ["gusta", "Me", "natación", "la", "."],
          respuestaCorrecta: "Me gusta la natación.",
          explicacion: "正确的句子是：Me gusta la natación.（我喜欢游泳。）",
        },
        {
          id: "o4",
          palabras: ["deporte", "favorito", "Mi", "es", "el", "tenis", "."],
          respuestaCorrecta: "Mi deporte favorito es el tenis.",
          explicacion: "正确的顺序是：Mi deporte favorito es el tenis.",
        },
        {
          id: "o5",
          palabras: ["hago", "pesas", "Levanto", "y", "sentadillas", "."],
          respuestaCorrecta: "Levanto pesas y hago sentadillas.",
          explicacion: "正确的顺序是：Levanto pesas y hago sentadillas.",
        },
        {
          id: "o6",
          palabras: ["vieron", "partido", "anoche", "el", "ustedes", "?"],
          respuestaCorrecta: "¿Ustedes vieron el partido anoche?",
          explicacion: "正确的顺序是：¿Ustedes vieron el partido anoche?",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我周末踢足球。",
          respuestaEsperada: "Juego al fútbol los fines de semana.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "我每周去健身房三次。",
          respuestaEsperada: "Voy al gimnasio tres veces por semana.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "我喜欢游泳。",
          respuestaEsperada: "Me gusta la natación.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "你打篮球吗？",
          respuestaEsperada: "¿Juegas al baloncesto?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "我的球队赢得了比赛。",
          respuestaEsperada: "Mi equipo ganó el partido.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "我需要恢复体型。",
          respuestaEsperada: "Necesito ponerme en forma.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "我每天做仰卧起坐。",
          respuestaEsperada: "Hago abdominales todos los días.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "比赛以2-2平局结束。",
          respuestaEsperada: "El partido terminó en empate 2-2.",
          explicacion: "西班牙语翻译",
        },
      ],
    },
    ejerciciosPracticos: [
      {
        id: "ep1",
        tipo: "completarDialogo",
        titulo: "完成对话",
        tituloChino: "完成对话",
        instruccion: "用正确的运动词汇完成对话。",
        instruccionChino: "用正确的运动词汇完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿Practicas algún _____?",
            respuesta: "deporte",
          },
          {
            personaje: "B",
            texto: "Sí, juego al _____.",
            respuesta: "fútbol / tenis / baloncesto",
          },
          {
            personaje: "A",
            texto: "¿Y vas al _____?",
            respuesta: "gimnasio",
          },
          {
            personaje: "B",
            texto: "Sí, voy tres veces por _____.",
            respuesta: "semana",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "responder",
        titulo: "Responde las preguntas",
        tituloChino: "回答问题",
        instruccion: "Responde las siguientes preguntas sobre deportes en español.",
        instruccionChino: "用西班牙语回答以下关于运动的问题。",
        preguntas: [
          {
            pregunta: "¿Practicas algún deporte?",
            respuestaEsperada: "Sí, juego al fútbol. / No, no practico deporte.",
          },
          {
            pregunta: "¿Cuál es tu deporte favorito?",
            respuestaEsperada: "Mi deporte favorito es el baloncesto.",
          },
          {
            pregunta: "¿Con qué frecuencia haces ejercicio?",
            respuestaEsperada: "Hago ejercicio tres veces por semana.",
          },
          {
            pregunta: "¿Vas al gimnasio?",
            respuestaEsperada: "Sí, voy al gimnasio. / No, no voy al gimnasio.",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "clasificar",
        titulo: "Clasifica los deportes",
        tituloChino: "分类运动",
        instruccion: "Clasifica cada deporte como 'de equipo' (team) o 'individual'.",
        instruccionChino: "将每个运动分类为'团队'或'个人'。",
        deportes: [
          {
            deporte: "fútbol",
            tipo: "de equipo",
          },
          {
            deporte: "tenis",
            tipo: "individual",
          },
          {
            deporte: "natación",
            tipo: "individual",
          },
          {
            deporte: "baloncesto",
            tipo: "de equipo",
          },
          {
            deporte: "voleibol",
            tipo: "de equipo",
          },
          {
            deporte: "golf",
            tipo: "individual",
          },
          {
            deporte: "ciclismo",
            tipo: "individual",
          },
        ],
      },
      {
        id: "ep4",
        tipo: "rutina",
        titulo: "Tu rutina de ejercicio",
        tituloChino: "你的锻炼日常",
        instruccion: "Escribe 5 frases sobre tu rutina de ejercicio semanal.",
        instruccionChino: "写5句话关于你每周的锻炼日常。",
        ejemplo:
          "Los lunes voy al gimnasio. Hago sentadillas y abdominales. Los martes salgo a correr. Los miércoles descanso...",
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Practicas algún deporte? ¿Cuál?",
        preguntaChino: "你做运动吗？做什么运动？",
        sugerencia: "Sí, juego al fútbol / baloncesto / tenis.",
        sugerenciaChino: "Sí, juego al fútbol / baloncesto / tenis.",
      },
      {
        id: "pa2",
        pregunta: "¿Con qué frecuencia haces ejercicio?",
        preguntaChino: "你多久锻炼一次？",
        sugerencia: "Hago ejercicio (tres veces por semana / todos los días).",
        sugerenciaChino: "Hago ejercicio (tres veces por semana / todos los días).",
      },
      {
        id: "pa3",
        pregunta: "¿Prefieres hacer deporte solo o en equipo? ¿Por qué?",
        preguntaChino: "你喜欢独自运动还是团队运动？为什么？",
        sugerencia: "Prefiero deportes de equipo porque me gusta jugar con amigos.",
        sugerenciaChino: "Prefiero deportes de equipo porque me gusta jugar con amigos.",
      },
      {
        id: "pa4",
        pregunta: "¿Cuál es tu equipo deportivo favorito?",
        preguntaChino: "你最喜欢的运动队是哪个？",
        sugerencia: "Mi equipo favorito es el Real Madrid / Barcelona / Lakers.",
        sugerenciaChino: "Mi equipo favorito es el Real Madrid / Barcelona / Lakers.",
      },
      {
        id: "pa5",
        pregunta: "¿Qué beneficios tiene hacer deporte?",
        preguntaChino: "做运动有什么好处？",
        sugerencia: "Hacer deporte mejora la salud, ayuda a estar en forma y reduce el estrés.",
        sugerenciaChino: "Hacer deporte mejora la salud, ayuda a estar en forma y reduce el estrés.",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '足球' en español?",
        preguntaChino: "西班牙语中'足球'怎么说？",
        respuestaSugerida: "fútbol",
        respuestaSugeridaChino: "fútbol",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '健身房' en español?",
        preguntaChino: "西班牙语中'健身房'怎么说？",
        respuestaSugerida: "gimnasio",
        respuestaSugeridaChino: "gimnasio",
      },
      {
        id: "p3",
        pregunta: "¿Qué significa 'Me gusta la natación'?",
        preguntaChino: "'Me gusta la natación'是什么意思？",
        respuestaSugerida: "我喜欢游泳",
        respuestaSugeridaChino: "I like swimming",
      },
      {
        id: "p4",
        pregunta: "¿Cuál es tu deporte favorito? Responde en español.",
        preguntaChino: "你最喜欢的运动是什么？用西班牙语回答。",
        respuestaSugerida: "Mi deporte favorito es el fútbol.",
        respuestaSugeridaChino: "Mi deporte favorito es el fútbol.",
      },
      {
        id: "p5",
        pregunta: "¿Qué significa 'hacer ejercicio'?",
        preguntaChino: "'hacer ejercicio'是什么意思？",
        respuestaSugerida: "做锻炼/运动",
        respuestaSugeridaChino: "To exercise",
      },
      {
        id: "p6",
        pregunta: "¿Cómo se dice '俯卧撑' en español?",
        preguntaChino: "西班牙语中'俯卧撑'怎么说？",
        respuestaSugerida: "flexión / lagartija",
        respuestaSugeridaChino: "flexión / lagartija",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Medios de transporte",
        tituloChino: "交通工具",
        descripcion: `🔹 TRANSPORTE TERRESTRE (land transport):

🚗 COCHE / AUTO / CARRO:
• coche = car (Spain)
• auto = car (Latin America)
• carro = car (Latin America)
• coche eléctrico = electric car
• taxi = taxi
• autobús / bus = bus
• microbús = minibus
• autocar = coach bus

🚆 TREN:
• tren = train
• metro = subway / metro
• tranvía = tram
• cercanías = commuter train
• AVE = high-speed train (Spain)
• regional = regional train

🏍️ MOTOS Y BICICLETAS:
• moto = motorcycle
• bicicleta / bici = bicycle
• patinete = scooter
• patinete eléctrico = electric scooter

🔹 TRANSPORTE AÉREO (air transport):
• avión = airplane
• helicóptero = helicopter
• jet = jet
• dron = drone

🔹 TRANSPORTE MARÍTIMO (maritime transport):
• barco = boat
• ferry = ferry
• crucero = cruise ship
• yate = yacht
• lancha = speedboat
• transatlántico = ocean liner

🔹 A PIE (on foot):
• andando / caminando = walking
• a pie = on foot

📌 EJEMPLOS:
• Voy al trabajo en coche.
• Cojo el autobús cada mañana.
• Prefiero ir en tren.
• Viajo en avión a menudo.`,
        descripcionChino: `🔹 陆路交通：

🚗 汽车：
• coche = 汽车（西班牙）
• auto = 汽车（拉丁美洲）
• carro = 汽车（拉丁美洲）
• coche eléctrico = 电动汽车
• taxi = 出租车
• autobús / bus = 公交车
• microbús = 小巴
• autocar = 长途大巴

🚆 火车：
• tren = 火车
• metro = 地铁
• tranvía = 有轨电车
• cercanías = 近郊火车
• AVE = 高铁（西班牙）
• regional = 区域火车

🏍️ 摩托车和自行车：
• moto = 摩托车
• bicicleta / bici = 自行车
• patinete = 滑板车
• patinete eléctrico = 电动滑板车

🔹 空中交通：
• avión = 飞机
• helicóptero = 直升机
• jet = 喷气式飞机
• dron = 无人机

🔹 水上交通：
• barco = 船
• ferry = 渡轮
• crucero = 游轮
• yate = 游艇
• lancha = 快艇
• transatlántico = 远洋客轮

🔹 步行：
• andando / caminando = 步行
• a pie = 步行

📌 例子：
• Voy al trabajo en coche. = 我开车去上班。
• Cojo el autobús cada mañana. = 我每天早上坐公交车。
• Prefiero ir en tren. = 我喜欢坐火车去。
• Viajo en avión a menudo. = 我经常坐飞机旅行。`,
        ejemplos: [
          {
            espanol: "Voy al trabajo en coche.",
            chino: "我开车去上班。",
          },
          {
            espanol: "Cojo el autobús cada mañana.",
            chino: "我每天早上坐公交车。",
          },
          {
            espanol: "Prefiero ir en tren.",
            chino: "我喜欢坐火车去。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Verbos relacionados con transporte",
        tituloChino: "与交通相关的动词",
        descripcion: `🔹 VERBOS ÚTILES (useful verbs):

• ir en + transporte = to go by (ir en coche)
• coger / tomar + transporte = to take (coger el tren) - España / Latinoamérica
• viajar en + transporte = to travel by (viajar en avión)
• conducir / manejar = to drive (conducir un coche)
• pilotar = to fly (pilotar un avión)
• montar en = to ride (montar en bicicleta)
• andar / caminar = to walk
• aparcar / estacionar = to park (aparcar el coche)
• subir a = to get on (subir al autobús)
• bajar de = to get off (bajar del tren)
• hacer transbordo = to transfer (hacer transbordo de metro)

📌 EJEMPLOS:
• Voy en autobús al trabajo.
• Cojo el tren para viajar.
• Conduzco mi coche.
• Monto en bici los fines de semana.

🔹 PREGUNTAS COMUNES (common questions):
• ¿Cómo vas al trabajo?
• ¿Cuánto tiempo tardas en coche?
• ¿Dónde se coge el autobús?
• ¿A qué hora sale el tren?
• ¿Dónde puedo comprar el billete?

🔹 RESPUESTAS:
• Voy en metro.
• Tardo veinte minutos en coche.
• El autobús se coge en la parada de la esquina.
• El tren sale a las ocho.
• Puedes comprar el billete en la máquina o en taquilla.`,
        descripcionChino: `🔹 有用动词：

• ir en + 交通工具 = 乘坐...去
• coger / tomar + 交通工具 = 搭乘...（西班牙/拉美）
• viajar en + 交通工具 = 乘坐...旅行
• conducir / manejar = 开车
• pilotar = 驾驶（飞机）
• montar en = 骑（自行车/摩托车）
• andar / caminar = 步行
• aparcar / estacionar = 停车
• subir a = 上车
• bajar de = 下车
• hacer transbordo = 换乘

📌 例子：
• Voy en autobús al trabajo. = 我坐公交车去上班。
• Cojo el tren para viajar. = 我坐火车旅行。
• Conduzco mi coche. = 我开我的车。
• Monto en bici los fines de semana. = 我周末骑自行车。

🔹 常见问题：
• ¿Cómo vas al trabajo? = 你怎么去上班？
• ¿Cuánto tiempo tardas en coche? = 开车需要多长时间？
• ¿Dónde se coge el autobús? = 在哪里坐公交车？
• ¿A qué hora sale el tren? = 火车几点出发？
• ¿Dónde puedo comprar el billete? = 我在哪里可以买票？

🔹 回答：
• Voy en metro. = 我坐地铁去。
• Tardo veinte minutos en coche. = 开车需要二十分钟。
• El autobús se coge en la parada de la esquina. = 公交车在拐角的车站坐。
• El tren sale a las ocho. = 火车八点出发。
• Puedes comprar el billete en la máquina o en taquilla. = 你可以在机器上或售票处买票。`,
        ejemplos: [
          {
            espanol: "Voy en autobús al trabajo.",
            chino: "我坐公交车去上班。",
          },
          {
            espanol: "Cojo el tren para viajar.",
            chino: "我坐火车旅行。",
          },
          {
            espanol: "Conduzco mi coche.",
            chino: "我开我的车。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "En la estación y en el aeropuerto",
        tituloChino: "在车站和机场",
        descripcion: `🔹 LUGARES (places):
• estación de tren = train station
• estación de autobuses = bus station
• parada (de autobús/metro) = bus/metro stop
• aeropuerto = airport
• puerto = port
• andén = platform (train)
• vía = track (train)
• terminal = terminal
• puerta de embarque = boarding gate
• sala de espera = waiting room
• mostrador de facturación = check-in counter
• cinta de equipaje = baggage carousel

🔹 FRASES ÚTILES (useful phrases):
• ¿Dónde está la parada de autobús?
• ¿A qué hora sale el tren?
• ¿Cuánto cuesta el billete?
• Quiero un billete de ida y vuelta.
• ¿Cuál es la puerta de embarque?
• ¿Cuánto tiempo dura el viaje?
• ¿Hay algún retraso?
• ¿Este tren va a Barcelona?
• ¿Tiene que hacer transbordo?

🔹 TIPOS DE BILLETES (types of tickets):
• billete sencillo / billete de ida = one-way ticket
• billete de ida y vuelta = round-trip ticket
• billete de temporada = season ticket
• bono = travel pass
• abono mensual = monthly pass
• tarjeta de transporte = transport card

📌 EJEMPLOS:
• ¿Dónde está la parada de autobús?
• Quiero un billete de ida y vuelta.
• ¿A qué hora sale el tren?`,
        descripcionChino: `🔹 地点：
• estación de tren = 火车站
• estación de autobuses = 公交总站
• parada = 车站（公交/地铁）
• aeropuerto = 机场
• puerto = 港口
• andén = 站台（火车）
• vía = 轨道（火车）
• terminal = 航站楼
• puerta de embarque = 登机口
• sala de espera = 候车/候机室
• mostrador de facturación = 值机柜台
• cinta de equipaje = 行李传送带

🔹 有用句子：
• ¿Dónde está la parada de autobús? = 公交车站在哪里？
• ¿A qué hora sale el tren? = 火车几点出发？
• ¿Cuánto cuesta el billete? = 票多少钱？
• Quiero un billete de ida y vuelta. = 我要往返票。
• ¿Cuál es la puerta de embarque? = 登机口是哪个？
• ¿Cuánto tiempo dura el viaje? = 旅程需要多长时间？
• ¿Hay algún retraso? = 有延误吗？
• ¿Este tren va a Barcelona? = 这趟火车去巴塞罗那吗？
• ¿Tiene que hacer transbordo? = 需要换乘吗？

🔹 票的类型：
• billete sencillo / billete de ida = 单程票
• billete de ida y vuelta = 往返票
• billete de temporada = 季票
• bono = 通票
• abono mensual = 月票
• tarjeta de transporte = 交通卡

📌 例子：
• ¿Dónde está la parada de autobús? = 公交车站在哪里？
• Quiero un billete de ida y vuelta. = 我要往返票。
• ¿A qué hora sale el tren? = 火车几点出发？`,
        ejemplos: [
          {
            espanol: "¿Dónde está la parada de autobús?",
            chino: "公交车站在哪里？",
          },
          {
            espanol: "Quiero un billete de ida y vuelta.",
            chino: "我要往返票。",
          },
          {
            espanol: "¿A qué hora sale el tren?",
            chino: "火车几点出发？",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Describir un viaje",
        tituloChino: "描述旅行",
        descripcion: `🔹 EXPRESIONES PARA DESCRIBIR UN VIAJE (expressions to describe a trip):

PLANIFICACIÓN (planning):
• He reservado un billete de avión.
• He comprado los billetes con antelación.
• Voy a viajar la próxima semana.
• Me voy de vacaciones en julio.

DURANTE EL VIAJE (during the trip):
• El vuelo dura tres horas.
• El tren va muy rápido.
• El viaje fue muy cómodo.
• Tuvimos que hacer transbordo en Madrid.

PROBLEMAS (problems):
• El vuelo se retrasó dos horas.
• Perdí el tren.
• Me robaron la maleta.
• No había asientos libres.

DESPUÉS DEL VIAJE (after the trip):
• El viaje fue increíble.
• Las vistas eran preciosas.
• Volveré el año que viene.
• Lo pasamos fenomenal.

📌 EJEMPLOS COMPLETOS:
• El vuelo a París dura dos horas. Salimos de la puerta B12.
• Perdí el tren porque llegué tarde a la estación.
• El viaje en coche fue muy cansado porque había mucho tráfico.
• Prefiero viajar en tren porque es más cómodo que el autobús.

❌ ERRORES COMUNES:
• No digas "voy a ir en bus" si puedes decir "voy en autobús".
• En España se dice "coger el tren", en Latinoamérica "tomar el tren".`,
        descripcionChino: `🔹 描述旅行的表达：

计划阶段：
• He reservado un billete de avión. = 我已经预订了机票。
• He comprado los billetes con antelación. = 我提前买了票。
• Voy a viajar la próxima semana. = 我下周要去旅行。
• Me voy de vacaciones en julio. = 我七月要去度假。

旅行期间：
• El vuelo dura tres horas. = 航班飞行三小时。
• El tren va muy rápido. = 火车开得很快。
• El viaje fue muy cómodo. = 旅行很舒适。
• Tuvimos que hacer transbordo en Madrid. = 我们不得不在马德里换乘。

问题：
• El vuelo se retrasó dos horas. = 航班延误了两小时。
• Perdí el tren. = 我没赶上火车。
• Me robaron la maleta. = 我的行李箱被偷了。
• No había asientos libres. = 没有空座位。

旅行之后：
• El viaje fue increíble. = 旅行太棒了。
• Las vistas eran preciosas. = 景色很美。
• Volveré el año que viene. = 我明年会再来。
• Lo pasamos fenomenal. = 我们玩得很开心。

📌 完整例子：
• El vuelo a París dura dos horas. Salimos de la puerta B12. = 飞往巴黎的航班飞行两小时。我们从B12登机口起飞。
• Perdí el tren porque llegué tarde a la estación. = 我没赶上火车，因为我到车站晚了。
• El viaje en coche fue muy cansado porque había mucho tráfico. = 开车旅行很累，因为交通很拥堵。
• Prefiero viajar en tren porque es más cómodo que el autobús. = 我更喜欢坐火车旅行，因为它比汽车更舒适。

❌ 常见错误：
• 不要说"voy a ir en bus"，应该说"voy en autobús"。
• 在西班牙说"coger el tren"，在拉丁美洲说"tomar el tren"。`,
        ejemplos: [
          {
            espanol: "El vuelo duró diez horas.",
            chino: "航班飞了十个小时。",
          },
          {
            espanol: "Perdí el tren por cinco minutos.",
            chino: "我差五分钟没赶上火车。",
          },
          {
            espanol: "El viaje fue espectacular.",
            chino: "旅行太棒了。",
          },
          {
            espanol: "Hicimos transbordo en Barcelona.",
            chino: "我们在巴塞罗那换了车。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "coche",
        chino: "汽车",
        ejemplo: "Voy en coche.",
      },
      {
        id: "v2",
        espanol: "autobús",
        chino: "公交车",
        ejemplo: "Cojo el autobús.",
      },
      {
        id: "v3",
        espanol: "tren",
        chino: "火车",
        ejemplo: "Viajo en tren.",
      },
      {
        id: "v4",
        espanol: "metro",
        chino: "地铁",
        ejemplo: "Tomo el metro.",
      },
      {
        id: "v5",
        espanol: "tranvía",
        chino: "有轨电车",
        ejemplo: "El tranvía pasa por aquí.",
      },
      {
        id: "v6",
        espanol: "avión",
        chino: "飞机",
        ejemplo: "Vuelo en avión.",
      },
      {
        id: "v7",
        espanol: "helicóptero",
        chino: "直升机",
        ejemplo: "Nunca he ido en helicóptero.",
      },
      {
        id: "v8",
        espanol: "barco",
        chino: "船",
        ejemplo: "Viajo en barco.",
      },
      {
        id: "v9",
        espanol: "ferry",
        chino: "渡轮",
        ejemplo: "Cogemos el ferry a la isla.",
      },
      {
        id: "v10",
        espanol: "crucero",
        chino: "游轮",
        ejemplo: "Me voy de crucero.",
      },
      {
        id: "v11",
        espanol: "taxi",
        chino: "出租车",
        ejemplo: "Llamo un taxi.",
      },
      {
        id: "v12",
        espanol: "moto",
        chino: "摩托车",
        ejemplo: "Voy en moto.",
      },
      {
        id: "v13",
        espanol: "bicicleta / bici",
        chino: "自行车",
        ejemplo: "Voy en bici.",
      },
      {
        id: "v14",
        espanol: "patinete",
        chino: "滑板车",
        ejemplo: "Un patinete eléctrico.",
      },
      {
        id: "v15",
        espanol: "a pie",
        chino: "步行",
        ejemplo: "Voy a pie.",
      },
      {
        id: "v16",
        espanol: "conducir",
        chino: "开车",
        ejemplo: "Conduzco un coche.",
      },
      {
        id: "v17",
        espanol: "estación",
        chino: "车站",
        ejemplo: "La estación de tren.",
      },
      {
        id: "v18",
        espanol: "aeropuerto",
        chino: "机场",
        ejemplo: "El aeropuerto.",
      },
      {
        id: "v19",
        espanol: "parada",
        chino: "车站",
        ejemplo: "La parada de autobús.",
      },
      {
        id: "v20",
        espanol: "andén",
        chino: "站台",
        ejemplo: "El andén 2.",
      },
      {
        id: "v21",
        espanol: "puerta de embarque",
        chino: "登机口",
        ejemplo: "Puerta B12.",
      },
      {
        id: "v22",
        espanol: "billete",
        chino: "票",
        ejemplo: "Compro el billete.",
      },
      {
        id: "v23",
        espanol: "ida y vuelta",
        chino: "往返",
        ejemplo: "Billete de ida y vuelta.",
      },
      {
        id: "v24",
        espanol: "sencillo / ida",
        chino: "单程",
        ejemplo: "Billete sencillo.",
      },
      {
        id: "v25",
        espanol: "retraso",
        chino: "延误",
        ejemplo: "Hay retraso.",
      },
      {
        id: "v26",
        espanol: "transbordo",
        chino: "换乘",
        ejemplo: "Tengo que hacer transbordo.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Preguntando cómo llegar",
        tituloChino: "询问路线",
        personajes: ["Turista", "Local"],
        lineas: [
          {
            personaje: "Turista",
            texto: "Disculpe, ¿cómo voy al centro?",
            traduccion: "打扰一下，我怎么去市中心？",
          },
          {
            personaje: "Local",
            texto: "Puede coger el autobús número 15.",
            traduccion: "您可以坐15路公交车。",
          },
          {
            personaje: "Turista",
            texto: "¿Dónde está la parada?",
            traduccion: "车站在哪里？",
          },
          {
            personaje: "Local",
            texto: "Está a la vuelta de la esquina.",
            traduccion: "在拐角处。",
          },
          {
            personaje: "Turista",
            texto: "¿Cuánto cuesta el billete?",
            traduccion: "票多少钱？",
          },
          {
            personaje: "Local",
            texto: "Cuesta un euro cincuenta.",
            traduccion: "一欧元五十。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "En la estación de tren",
        tituloChino: "在火车站",
        personajes: ["Cliente", "Taquillero"],
        lineas: [
          {
            personaje: "Cliente",
            texto: "Quiero un billete de ida y vuelta a Barcelona.",
            traduccion: "我要一张去巴塞罗那的往返票。",
          },
          {
            personaje: "Taquillero",
            texto: "¿Para qué día?",
            traduccion: "哪一天？",
          },
          {
            personaje: "Cliente",
            texto: "Para mañana, por favor.",
            traduccion: "明天，请。",
          },
          {
            personaje: "Taquillero",
            texto: "Son cincuenta euros.",
            traduccion: "五十欧元。",
          },
          {
            personaje: "Cliente",
            texto: "¿A qué hora sale el tren?",
            traduccion: "火车几点出发？",
          },
          {
            personaje: "Taquillero",
            texto: "A las ocho de la mañana. Anda 2, vía 3.",
            traduccion: "早上八点。2号站台，3号轨道。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "En el aeropuerto",
        tituloChino: "在机场",
        personajes: ["Pasajero", "Empleado"],
        lineas: [
          {
            personaje: "Pasajero",
            texto: "Buenos días. ¿Dónde facturo mi equipaje?",
            traduccion: "早上好。我在哪里托运行李？",
          },
          {
            personaje: "Empleado",
            texto: "En el mostrador número 12. ¿Cuál es su destino?",
            traduccion: "在12号柜台。您的目的地是哪里？",
          },
          {
            personaje: "Pasajero",
            texto: "Voy a París. ¿Cuál es mi puerta de embarque?",
            traduccion: "我去巴黎。我的登机口是哪个？",
          },
          {
            personaje: "Empleado",
            texto: "La puerta B24. El embarque comienza a las 9:30.",
            traduccion: "B24登机口。登机9:30开始。",
          },
          {
            personaje: "Pasajero",
            texto: "¿Hay algún retraso?",
            traduccion: "有延误吗？",
          },
          {
            personaje: "Empleado",
            texto: "No, el vuelo sale a su hora. Buen viaje.",
            traduccion: "没有，航班准时起飞。祝您旅途愉快。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Comparando medios de transporte",
        tituloChino: "比较交通工具",
        personajes: ["Ana", "Carlos"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Carlos, ¿cómo prefieres viajar: en coche o en tren?",
            traduccion: "卡洛斯，你更喜欢怎么旅行：开车还是坐火车？",
          },
          {
            personaje: "Carlos",
            texto: "Prefiero el tren. Es más cómodo y no hay atascos.",
            traduccion: "我更喜欢火车。更舒适，而且没有堵车。",
          },
          {
            personaje: "Ana",
            texto: "¿Y el avión?",
            traduccion: "飞机呢？",
          },
          {
            personaje: "Carlos",
            texto: "El avión es más rápido, pero el aeropuerto está lejos.",
            traduccion: "飞机更快，但机场很远。",
          },
          {
            personaje: "Ana",
            texto: "Yo suelo ir en coche porque puedo parar cuando quiero.",
            traduccion: "我通常开车去，因为我可以在想停的时候停下来。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Problemas con el transporte",
        tituloChino: "交通问题",
        personajes: ["María", "Pedro"],
        lineas: [
          {
            personaje: "María",
            texto: "Pedro, ¿por qué llegaste tarde?",
            traduccion: "佩德罗，你为什么迟到了？",
          },
          {
            personaje: "Pedro",
            texto: "Perdí el autobús. Tuve que esperar media hora al siguiente.",
            traduccion: "我没赶上公交车。我不得不等下一趟等了半小时。",
          },
          {
            personaje: "María",
            texto: "¿Por qué no cogiste el metro?",
            traduccion: "你为什么没坐地铁？",
          },
          {
            personaje: "Pedro",
            texto: "El metro también tenía retraso por obras.",
            traduccion: "地铁也因为施工延误了。",
          },
          {
            personaje: "María",
            texto: "Menos mal que no tenías una reunión importante.",
            traduccion: "幸好你没有重要的会议。",
          },
          {
            personaje: "Pedro",
            texto: "Mañana saldré con más tiempo de casa.",
            traduccion: "明天我会提前从家出发。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "我开车去上班：Voy al trabajo en _____",
          preguntaChino: "我开车去上班：Voy al trabajo en _____",
          respuestaCorrecta: "coche",
          explicacion: "汽车 = coche。",
          pista: "首字母是 c，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c2",
          pregunta: "我坐地铁：Tomo el _____",
          preguntaChino: "我坐地铁：Tomo el _____",
          respuestaCorrecta: "metro",
          explicacion: "地铁 = metro。",
          pista: "首字母是 m，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c3",
          pregunta: "我坐飞机旅行：Viajo en _____",
          preguntaChino: "我坐飞机旅行：Viajo en _____",
          respuestaCorrecta: "avión",
          explicacion: "飞机 = avión。",
          pista: "首字母是 a，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c4",
          pregunta: "我要一张往返票：Quiero un billete de _____ y vuelta",
          preguntaChino: "我要一张往返票：Quiero un billete de _____ y vuelta",
          respuestaCorrecta: "ida",
          explicacion: "ida y vuelta = 往返。",
          pista: "首字母是 i，3个字母",
          numeroLetras: 3,
        },
        {
          id: "c5",
          pregunta: "火车几点出发？¿A qué hora _____ el tren?",
          preguntaChino: "火车几点出发？¿A qué hora _____ el tren?",
          respuestaCorrecta: "sale",
          explicacion: "Salir = 出发。",
          pista: "首字母是 s，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c6",
          pregunta: "我骑自行车：Voy en _____",
          preguntaChino: "我骑自行车：Voy en _____",
          respuestaCorrecta: "bicicleta",
          explicacion: "Bicicleta = 自行车",
          pista: "首字母是 b，9个字母",
          numeroLetras: 9,
        },
        {
          id: "c7",
          pregunta: "我需要换乘：Tengo que hacer _____",
          preguntaChino: "我需要换乘：Tengo que hacer _____",
          respuestaCorrecta: "transbordo",
          explicacion: "Transbordo = 换乘",
          pista: "首字母是 t，10个字母",
          numeroLetras: 10,
        },
        {
          id: "c8",
          pregunta: "航班延误了：El vuelo tiene un _____",
          preguntaChino: "航班延误了：El vuelo tiene un _____",
          respuestaCorrecta: "retraso",
          explicacion: "Retraso = 延误",
          pista: "首字母是 r，7个字母",
          numeroLetras: 7,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "哪种交通工具走轨道？",
          preguntaChino: "哪种交通工具走轨道？",
          opciones: ["coche", "autobús", "tren", "avión"],
          respuestaCorrecta: "tren",
          explicacion: "火车走铁轨。",
        },
        {
          id: "s2",
          pregunta: "你从哪里坐飞机？",
          preguntaChino: "你从哪里坐飞机？",
          opciones: ["estación", "aeropuerto", "puerto", "parada"],
          respuestaCorrecta: "aeropuerto",
          explicacion: "飞机从机场起飞。",
        },
        {
          id: "s3",
          pregunta: "哪里可以叫出租车？",
          preguntaChino: "哪里可以叫出租车？",
          opciones: ["parada de taxi", "estación de tren", "aeropuerto", "todas las anteriores"],
          respuestaCorrecta: "todas las anteriores",
          explicacion: "出租车可以在很多地方叫到。",
        },
        {
          id: "s4",
          pregunta: "'Billete de ida y vuelta'是什么意思？",
          preguntaChino: "'Billete de ida y vuelta'是什么意思？",
          opciones: ["单程票", "往返票", "月票", "折扣票"],
          respuestaCorrecta: "往返票",
          explicacion: "Ida y vuelta = 往返。",
        },
        {
          id: "s5",
          pregunta: "我步行去学校：Voy a la escuela _____",
          preguntaChino: "我步行去学校：Voy a la escuela _____",
          opciones: ["en coche", "en autobús", "a pie", "en tren"],
          respuestaCorrecta: "a pie",
          explicacion: "'A pie' = 步行。",
        },
        {
          id: "s6",
          pregunta: "¿Qué significa 'hacer transbordo'?",
          preguntaChino: "'hacer transbordo'是什么意思？",
          opciones: ["换乘", "买票", "延误", "取消"],
          respuestaCorrecta: "换乘",
          explicacion: "Transbordo = 换乘",
        },
        {
          id: "s7",
          pregunta: "¿Cómo se dice '登机口' en español?",
          preguntaChino: "西班牙语中'登机口'怎么说？",
          opciones: ["andén", "puerta de embarque", "parada", "terminal"],
          respuestaCorrecta: "puerta de embarque",
          explicacion: "Puerta de embarque = 登机口",
        },
        {
          id: "s8",
          pregunta: "¿Cuál es el medio de transporte más rápido?",
          preguntaChino: "最快的交通工具是什么？",
          opciones: ["coche", "tren", "avión", "barco"],
          respuestaCorrecta: "avión",
          explicacion: "El avión es el más rápido.",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "地铁在地下行驶。",
          preguntaChino: "地铁在地下行驶。",
          respuestaCorrecta: true,
          explicacion: "对。地铁在地下隧道行驶。",
        },
        {
          id: "vf2",
          pregunta: "飞机在水上行驶。",
          preguntaChino: "飞机在水上行驶。",
          respuestaCorrecta: false,
          explicacion: "错。飞机在空中飞行。",
        },
        {
          id: "vf3",
          pregunta: "车站是我们等车的地方。",
          preguntaChino: "车站是我们等车的地方。",
          respuestaCorrecta: true,
          explicacion: "对。车站是等待公共交通的地方。",
        },
        {
          id: "vf4",
          pregunta: "自行车需要汽油。",
          preguntaChino: "自行车需要汽油。",
          respuestaCorrecta: false,
          explicacion: "错。自行车靠人力骑行。",
        },
        {
          id: "vf5",
          pregunta: "'Conducir'意思是'开车'。",
          preguntaChino: "'Conducir'意思是'开车'。",
          respuestaCorrecta: true,
          explicacion: "对。Conducir = 开车。",
        },
        {
          id: "vf6",
          pregunta: "El 'metro' es un medio de transporte terrestre.",
          preguntaChino: "'Metro'是一种陆路交通工具。",
          respuestaCorrecta: true,
          explicacion: "对。El metro viaja bajo tierra o en superficie.",
        },
        {
          id: "vf7",
          pregunta: "El 'andén' es donde se espera el autobús.",
          preguntaChino: "'Andén'是等公交车的地方。",
          respuestaCorrecta: false,
          explicacion: "错。Andén es para trenes.",
        },
        {
          id: "vf8",
          pregunta: "Un 'retraso' significa que el transporte llega tarde.",
          preguntaChino: "'Retraso'意味着交通工具迟到。",
          respuestaCorrecta: true,
          explicacion: "对。Retraso = delay",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "coche",
              derecha: "汽车",
            },
            {
              izquierda: "autobús",
              derecha: "公交车",
            },
            {
              izquierda: "tren",
              derecha: "火车",
            },
            {
              izquierda: "metro",
              derecha: "地铁",
            },
            {
              izquierda: "tranvía",
              derecha: "有轨电车",
            },
            {
              izquierda: "avión",
              derecha: "飞机",
            },
            {
              izquierda: "barco",
              derecha: "船",
            },
            {
              izquierda: "bicicleta",
              derecha: "自行车",
            },
            {
              izquierda: "moto",
              derecha: "摩托车",
            },
            {
              izquierda: "taxi",
              derecha: "出租车",
            },
            {
              izquierda: "a pie",
              derecha: "步行",
            },
            {
              izquierda: "billete de ida y vuelta",
              derecha: "往返票",
            },
            {
              izquierda: "billete sencillo",
              derecha: "单程票",
            },
          ],
          explicacion: "将交通工具与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["trabajo", "Voy", "coche", "al", "en", "."],
          respuestaCorrecta: "Voy al trabajo en coche.",
          explicacion: "正确的句子是：Voy al trabajo en coche.（我开车去上班。）",
        },
        {
          id: "o2",
          palabras: ["sale", "¿A", "qué", "hora", "el", "tren", "?"],
          respuestaCorrecta: "¿A qué hora sale el tren?",
          explicacion: "正确的句子是：¿A qué hora sale el tren?（火车几点出发？）",
        },
        {
          id: "o3",
          palabras: ["Quiero", "vuelta", "billete", "ida", "de", "y", "."],
          respuestaCorrecta: "Quiero un billete de ida y vuelta.",
          explicacion: "正确的句子是：Quiero un billete de ida y vuelta.（我要一张往返票。）",
        },
        {
          id: "o4",
          palabras: ["metro", "prefiero", "el", "Yo", "."],
          respuestaCorrecta: "Yo prefiero el metro.",
          explicacion: "正确的顺序是：Yo prefiero el metro.",
        },
        {
          id: "o5",
          palabras: ["puerta", "embarque", "es", "mi", "cuál", "de", "?"],
          respuestaCorrecta: "¿Cuál es mi puerta de embarque?",
          explicacion: "正确的顺序是：¿Cuál es mi puerta de embarque?",
        },
        {
          id: "o6",
          palabras: ["retraso", "el", "tiene", "vuelo", "un", "."],
          respuestaCorrecta: "El vuelo tiene un retraso.",
          explicacion: "正确的顺序是：El vuelo tiene un retraso.",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我坐公交车去上班。",
          respuestaEsperada: "Voy al trabajo en autobús.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "火车几点出发？",
          respuestaEsperada: "¿A qué hora sale el tren?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "我要一张去马德里的往返票。",
          respuestaEsperada: "Quiero un billete de ida y vuelta a Madrid.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "我步行去学校。",
          respuestaEsperada: "Voy a la escuela a pie.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "航班延误了两个小时。",
          respuestaEsperada: "El vuelo se retrasó dos horas.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "我在巴塞罗那换乘。",
          respuestaEsperada: "Hago transbordo en Barcelona.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "我更喜欢坐火车旅行。",
          respuestaEsperada: "Prefiero viajar en tren.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "地铁站在哪里？",
          respuestaEsperada: "¿Dónde está la estación de metro?",
          explicacion: "西班牙语翻译",
        },
      ],
    },
    ejerciciosPracticos: [
      {
        id: "ep1",
        tipo: "completarDialogo",
        titulo: "完成对话",
        tituloChino: "完成对话",
        instruccion: "用正确的交通词汇完成对话。",
        instruccionChino: "用正确的交通词汇完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿Cómo vas al _____?",
            respuesta: "trabajo / centro",
          },
          {
            personaje: "B",
            texto: "Voy en _____.",
            respuesta: "coche / autobús / metro",
          },
          {
            personaje: "A",
            texto: "¿Y al aeropuerto?",
            respuesta: "",
          },
          {
            personaje: "B",
            texto: "Voy en _____.",
            respuesta: "taxi / autobús / tren",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "responder",
        titulo: "Responde las preguntas",
        tituloChino: "回答问题",
        instruccion: "Responde las siguientes preguntas sobre transporte en español.",
        instruccionChino: "用西班牙语回答以下关于交通的问题。",
        preguntas: [
          {
            pregunta: "¿Cómo vas al trabajo o a la escuela?",
            respuestaEsperada: "Voy en (autobús / metro / coche / a pie).",
          },
          {
            pregunta: "¿Qué medio de transporte prefieres?",
            respuestaEsperada: "Prefiero el (tren / avión / coche).",
          },
          {
            pregunta: "¿Has viajado en avión?",
            respuestaEsperada: "Sí, he viajado en avión. / No, nunca he viajado en avión.",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "comparar",
        titulo: "Compara los medios de transporte",
        tituloChino: "比较交通工具",
        instruccion: "Escribe una frase comparando dos medios de transporte.",
        instruccionChino: "写一个句子比较两种交通工具。",
        ejemplo: "El tren es más cómodo que el autobús, pero el avión es más rápido.",
      },
      {
        id: "ep4",
        tipo: "planificar",
        titulo: "Planifica un viaje",
        tituloChino: "计划一次旅行",
        instruccion: "Escribe cómo planificarías un viaje de tu ciudad a Madrid.",
        instruccionChino: "写出你如何计划从你的城市到马德里的旅行。",
        ejemplo:
          "Para viajar a Madrid, puedo ir en coche (5 horas), en tren (AVE, 2.5 horas) o en avión (1 hora). Elijo el tren porque es cómodo y rápido.",
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Cómo vas al trabajo o a la escuela?",
        preguntaChino: "你怎么去上班或上学？",
        sugerencia: "Voy al trabajo en (coche / autobús / metro / a pie).",
        sugerenciaChino: "Voy al trabajo en (coche / autobús / metro / a pie).",
      },
      {
        id: "pa2",
        pregunta: "¿Cuál es tu medio de transporte favorito? ¿Por qué?",
        preguntaChino: "你最喜欢的交通工具是什么？为什么？",
        sugerencia: "Mi medio de transporte favorito es el tren porque es cómodo.",
        sugerenciaChino: "Mi medio de transporte favorito es el tren porque es cómodo.",
      },
      {
        id: "pa3",
        pregunta: "Describe un viaje que hiciste en avión o tren.",
        preguntaChino: "描述一次你坐飞机或火车的旅行。",
        sugerencia: "Viajé a España en avión. El vuelo duró doce horas.",
        sugerenciaChino: "Viajé a España en avión. El vuelo duró doce horas.",
      },
      {
        id: "pa4",
        pregunta: "¿Qué prefieres: viajar en coche o en tren? ¿Por qué?",
        preguntaChino: "你更喜欢开车还是坐火车旅行？为什么？",
        sugerencia: "Prefiero viajar en tren porque puedo leer y no me canso.",
        sugerenciaChino: "Prefiero viajar en tren porque puedo leer y no me canso.",
      },
      {
        id: "pa5",
        pregunta: "¿Qué haces si tu vuelo se retrasa?",
        preguntaChino: "如果你的航班延误了你会做什么？",
        sugerencia: "Si el vuelo se retrasa, espero en la sala de embarque y leo o escucho música.",
        sugerenciaChino: "Si el vuelo se retrasa, espero en la sala de embarque y leo o escucho música.",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '汽车' en español?",
        preguntaChino: "西班牙语中'汽车'怎么说？",
        respuestaSugerida: "coche / auto / carro",
        respuestaSugeridaChino: "coche / auto / carro",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '飞机' en español?",
        preguntaChino: "西班牙语中'飞机'怎么说？",
        respuestaSugerida: "avión",
        respuestaSugeridaChino: "avión",
      },
      {
        id: "p3",
        pregunta: "¿Qué significa 'ida y vuelta'?",
        preguntaChino: "'ida y vuelta'是什么意思？",
        respuestaSugerida: "往返",
        respuestaSugeridaChino: "Round trip",
      },
      {
        id: "p4",
        pregunta: "¿Cómo preguntas la hora de salida del tren?",
        preguntaChino: "你如何询问火车的出发时间？",
        respuestaSugerida: "¿A qué hora sale el tren?",
        respuestaSugeridaChino: "¿A qué hora sale el tren?",
      },
      {
        id: "p5",
        pregunta: "¿Qué significa 'retraso'?",
        preguntaChino: "'retraso'是什么意思？",
        respuestaSugerida: "Delay / 延误",
        respuestaSugeridaChino: "延误",
      },
      {
        id: "p6",
        pregunta: "¿Cómo se dice '换乘' en español?",
        preguntaChino: "西班牙语中'换乘'怎么说？",
        respuestaSugerida: "transbordo",
        respuestaSugeridaChino: "transbordo",
      },
    ],
  },
];
const modulos01to20Module = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      default: MODULOS_01_20,
    },
    Symbol.toStringTag,
    {
      value: "Module",
    },
  ),
);
export { MODULOS_01_20, modulos01to20Module };
