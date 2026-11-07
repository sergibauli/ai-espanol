// Unidades 81–85 (A1–A2): huecos del currículo. Cada unidad = 2 clases (t1–t2 y t3–t4).

const M81 = {
  id: "modulo-81",
  numero: 81,
  numeroTexto: "ochenta y uno",
  titulo: "Me Gusta... - Gustos y Preferencias",
  tituloChino: "我喜欢…… - 喜好与偏好",
  descripcion: "Aprende a decir qué te gusta y qué no te gusta con gustar y encantar, a preguntar por los gustos de otras personas y a reaccionar con «a mí también» y «a mí tampoco».",
  descripcionChino: "学习用 gustar 和 encantar 说出自己喜欢和不喜欢的东西，询问别人的喜好，并用 «a mí también»（我也是）和 «a mí tampoco»（我也不）作出回应。",
  icono: "❤️",
  color: "#e11d48",
  nivel: "A1",
  teoria: [
    {
      id: "t1",
      titulo: "Me gusta / Me gustan",
      tituloChino: "Me gusta / Me gustan（我喜欢）",
      descripcion: `En español no decimos «yo gusto el té». Decimos «me gusta el té»: la cosa que gusta es el sujeto del verbo.

Estructura:
• Me gusta + nombre en singular: Me gusta el té.
• Me gustan + nombre en plural: Me gustan las verduras.
• Me gusta + infinitivo: Me gusta leer. Me gusta bailar y cocinar.
• No me gusta / No me gustan: No me gusta el café.

📌 NOTA:
Con gustar usamos el artículo: me gusta el té, me gustan las películas. No digas «me gusta té».

❌ ERROR COMÚN:
En chino, la persona que siente el gusto es el sujeto de la frase. Por eso muchos estudiantes dicen «Yo gusto el té» ❌. Lo correcto es «Me gusta el té» ✅.`,
      descripcionChino: `西班牙语不说 «yo gusto el té»，而说 «me gusta el té»：被喜欢的东西才是动词的主语。

结构：
• Me gusta + 单数名词：Me gusta el té.（我喜欢茶。）
• Me gustan + 复数名词：Me gustan las verduras.（我喜欢蔬菜。）
• Me gusta + 动词原形：Me gusta leer.（我喜欢看书。）Me gusta bailar y cocinar.（我喜欢跳舞和做饭。）
• No me gusta / No me gustan：No me gusta el café.（我不喜欢咖啡。）

📌 注意：
gustar 后面的名词要带冠词：me gusta el té，me gustan las películas。不要说 «me gusta té»。

❌ 常见错误：
中文说“我喜欢茶”，“我”是主语。所以很多同学会说 «Yo gusto el té» ❌。正确的说法是 «Me gusta el té» ✅。`,
      ejemplos: [
        { espanol: "Me gusta el té verde.", chino: "我喜欢绿茶。" },
        { espanol: "Me gustan las películas chinas.", chino: "我喜欢中国电影。" },
        { espanol: "Me gusta cocinar.", chino: "我喜欢做饭。" },
        { espanol: "No me gusta el café.", chino: "我不喜欢咖啡。" },
      ],
    },
    {
      id: "t2",
      titulo: "¿Te gusta? Me, te, le, nos, os, les",
      tituloChino: "你喜欢吗？代词 me, te, le, nos, os, les",
      descripcion: `El pronombre indica a quién le gusta algo:

| Persona | Pronombre | Ejemplo |
| (a mí) | me | Me gusta la música. |
| (a ti) | te | ¿Te gusta el chocolate? |
| (a él / a ella / a usted) | le | Le gustan las películas. |
| (a nosotros / a nosotras) | nos | Nos gusta cocinar. |
| (a vosotros / a vosotras) | os | ¿Os gusta la comida picante? |
| (a ellos / a ellas / a ustedes) | les | Les gusta leer. |

Para preguntar: ¿Te gusta…? (tú) / ¿Le gusta…? (usted)
Para responder: Sí, me gusta. / No, no me gusta.

📌 NOTA:
«A mí», «a ti», «a Laura»… sirven para dar énfasis o aclarar: A Laura le gusta bailar. El pronombre «le» es obligatorio: «A Laura gusta bailar» ❌.

❌ ERROR COMÚN:
«¿Tú gustas el café?» ❌ → «¿Te gusta el café?» ✅. En la respuesta negativa hay dos «no»: «No, no me gusta» ✅.`,
      descripcionChino: `代词表示“谁”喜欢某样东西：

| 人称 | 代词 | 例句 |
| （我） | me | Me gusta la música.（我喜欢音乐。） |
| （你） | te | ¿Te gusta el chocolate?（你喜欢巧克力吗？） |
| （他 / 她 / 您） | le | Le gustan las películas.（他喜欢电影。） |
| （我们） | nos | Nos gusta cocinar.（我们喜欢做饭。） |
| （你们） | os | ¿Os gusta la comida picante?（你们喜欢吃辣吗？） |
| （他们 / 她们 / 诸位） | les | Les gusta leer.（他们喜欢看书。） |

提问：¿Te gusta…?（你）/ ¿Le gusta…?（您）
回答：Sí, me gusta.（喜欢。）/ No, no me gusta.（不，我不喜欢。）

📌 注意：
«a mí»、«a ti»、«a Laura»…… 用来强调或说明是谁：A Laura le gusta bailar.（劳拉喜欢跳舞。）代词 «le» 不能省略：«A Laura gusta bailar» ❌。

❌ 常见错误：
«¿Tú gustas el café?» ❌ → «¿Te gusta el café?» ✅。否定回答里有两个 «no»：«No, no me gusta» ✅。`,
      ejemplos: [
        { espanol: "¿Te gusta la comida picante?", chino: "你喜欢吃辣吗？" },
        { espanol: "A mi madre le gusta leer.", chino: "我妈妈喜欢看书。" },
        { espanol: "Nos gusta la música española.", chino: "我们喜欢西班牙音乐。" },
        { espanol: "No, no me gustan las verduras.", chino: "不，我不喜欢蔬菜。" },
      ],
    },
    {
      id: "t3",
      titulo: "Me encanta: los grados del gusto",
      tituloChino: "Me encanta：喜欢的程度",
      descripcion: `Para decir cuánto nos gusta algo, usamos esta escala (de más a menos):

• Me encanta / Me encantan = me gusta muchísimo: Me encanta viajar.
• Me gusta mucho / Me gustan mucho: Me gusta mucho el fútbol.
• Me gusta / Me gustan: Me gustan los perros.
• No me gusta mucho: No me gusta mucho nadar.
• No me gusta nada: No me gusta nada el karaoke.

«Encantar» funciona igual que «gustar»: me encanta el chocolate, me encantan los perros.

📌 NOTA:
Con «encantar» normalmente no decimos «mucho»: «Me encanta mucho» ❌ → «Me encanta» ✅. Ya es el grado más alto.

❌ ERROR COMÚN:
«Me muy gusta» o «Me gusta nada» ❌. El orden es: (no) + me + gusta + mucho / nada. «Me gusta mucho» ✅, «No me gusta nada» ✅ (con «nada» siempre va «no»).`,
      descripcionChino: `表达“有多喜欢”时，可以用下面这个程度表（从强到弱）：

• Me encanta / Me encantan = 非常非常喜欢：Me encanta viajar.（我超爱旅行。）
• Me gusta mucho / Me gustan mucho：Me gusta mucho el fútbol.（我很喜欢足球。）
• Me gusta / Me gustan：Me gustan los perros.（我喜欢狗。）
• No me gusta mucho：No me gusta mucho nadar.（我不太喜欢游泳。）
• No me gusta nada：No me gusta nada el karaoke.（我一点也不喜欢卡拉OK。）

«encantar» 的用法和 «gustar» 完全一样：me encanta el chocolate，me encantan los perros。

📌 注意：
«encantar» 一般不和 «mucho» 连用：«Me encanta mucho» ❌ → «Me encanta» ✅。它本身已经是最高程度。

❌ 常见错误：
«Me muy gusta» 或 «Me gusta nada» ❌。语序是：(no) + me + gusta + mucho / nada。«Me gusta mucho» ✅，«No me gusta nada» ✅（用 «nada» 时前面一定要有 «no»）。`,
      ejemplos: [
        { espanol: "Me encanta viajar en verano.", chino: "我超爱夏天去旅行。" },
        { espanol: "A Javier le gusta mucho el fútbol.", chino: "哈维尔很喜欢足球。" },
        { espanol: "No me gusta mucho nadar.", chino: "我不太喜欢游泳。" },
        { espanol: "No me gusta nada el karaoke.", chino: "我一点也不喜欢卡拉OK。" },
      ],
    },
    {
      id: "t4",
      titulo: "A mí también, a mí tampoco y preferir",
      tituloChino: "我也是、我也不，以及 preferir（更喜欢）",
      descripcion: `Para reaccionar a lo que dice otra persona:

| La otra persona dice | Estás de acuerdo | No estás de acuerdo |
| Me gusta el fútbol. (+) | A mí también. | A mí no. |
| No me gusta nadar. (−) | A mí tampoco. | A mí sí. |

Para elegir entre dos cosas usamos preferir (e → ie):
• prefiero, prefieres, prefiere, preferimos, preferís, prefieren
• ¿Qué prefieres, el té o el café? — Prefiero el té.
• Prefiero viajar en tren.

📌 NOTA:
«Preferir» es un verbo normal, como «comer»: yo prefiero, tú prefieres. No digas «me prefiere».

❌ ERROR COMÚN:
«No me gusta nadar. — Yo también no» ❌. Con frases negativas decimos «A mí tampoco» ✅. Con gustar decimos «A mí también», no «Yo también»; «Yo también» es para verbos normales: Prefiero el té. — Yo también.`,
      descripcionChino: `对别人说的话作出回应：

| 对方说 | 你同意 | 你不同意 |
| Me gusta el fútbol.（肯定） | A mí también.（我也是。） | A mí no.（我不喜欢。） |
| No me gusta nadar.（否定） | A mí tampoco.（我也不。） | A mí sí.（我喜欢。） |

在两样东西之间选择时用 preferir（e → ie）：
• prefiero, prefieres, prefiere, preferimos, preferís, prefieren
• ¿Qué prefieres, el té o el café?（你更喜欢茶还是咖啡？）— Prefiero el té.（我更喜欢茶。）
• Prefiero viajar en tren.（我更喜欢坐火车旅行。）

📌 注意：
«preferir» 是普通动词，和 «comer» 一样变位：yo prefiero，tú prefieres。不要说 «me prefiere»。

❌ 常见错误：
«No me gusta nadar. — Yo también no» ❌。回应否定句要说 «A mí tampoco» ✅。和 gustar 搭配时说 «A mí también»，不说 «Yo también»；«Yo también» 用于普通动词：Prefiero el té. — Yo también.`,
      ejemplos: [
        { espanol: "—Me encantan los perros. —A mí también.", chino: "——我超喜欢狗。——我也是。" },
        { espanol: "—No me gusta el karaoke. —A mí tampoco.", chino: "——我不喜欢卡拉OK。——我也不喜欢。" },
        { espanol: "—No me gusta nadar. —A mí sí.", chino: "——我不喜欢游泳。——我喜欢。" },
        { espanol: "¿Qué prefieres, el fútbol o el baloncesto?", chino: "你更喜欢足球还是篮球？" },
      ],
    },
  ],
  vocabulario: [
    { id: "v1", espanol: "gustar", chino: "喜欢（被喜欢的东西作主语）", ejemplo: "Me gusta el té verde." },
    { id: "v2", espanol: "el té", chino: "茶", ejemplo: "¿Te gusta el té chino?" },
    { id: "v3", espanol: "el café", chino: "咖啡", ejemplo: "No me gusta el café." },
    { id: "v4", espanol: "el chocolate", chino: "巧克力", ejemplo: "A Laura le gusta el chocolate." },
    { id: "v5", espanol: "la comida picante", chino: "辣的食物", ejemplo: "¿Os gusta la comida picante?" },
    { id: "v6", espanol: "las verduras", chino: "蔬菜", ejemplo: "Me gustan las verduras." },
    { id: "v7", espanol: "la música", chino: "音乐", ejemplo: "Nos gusta la música china." },
    { id: "v8", espanol: "las películas", chino: "电影", ejemplo: "Le gustan las películas de acción." },
    { id: "v9", espanol: "leer", chino: "看书；阅读", ejemplo: "Me gusta leer por la noche." },
    { id: "v10", espanol: "bailar", chino: "跳舞", ejemplo: "A Carmen le gusta bailar." },
    { id: "v11", espanol: "cocinar", chino: "做饭", ejemplo: "Nos gusta cocinar juntos." },
    { id: "v12", espanol: "encantar", chino: "非常喜欢；超爱", ejemplo: "Me encanta viajar." },
    { id: "v13", espanol: "mucho", chino: "很；非常（表示程度）", ejemplo: "Me gusta mucho el fútbol." },
    { id: "v14", espanol: "nada", chino: "（否定句中）一点也（不）", ejemplo: "No me gusta nada el karaoke." },
    { id: "v15", espanol: "también", chino: "也（用于肯定）", ejemplo: "—Me gusta viajar. —A mí también." },
    { id: "v16", espanol: "tampoco", chino: "也不（用于否定）", ejemplo: "—No me gusta nadar. —A mí tampoco." },
    { id: "v17", espanol: "preferir", chino: "更喜欢；宁愿", ejemplo: "Prefiero el té." },
    { id: "v18", espanol: "viajar", chino: "旅行", ejemplo: "Nos encanta viajar en verano." },
    { id: "v19", espanol: "nadar", chino: "游泳", ejemplo: "No me gusta mucho nadar." },
    { id: "v20", espanol: "el fútbol", chino: "足球", ejemplo: "A Javier le encanta el fútbol." },
    { id: "v21", espanol: "los perros", chino: "狗（复数）", ejemplo: "Me encantan los perros." },
    { id: "v22", espanol: "el karaoke", chino: "卡拉OK", ejemplo: "En China nos encanta el karaoke." },
  ],
  dialogos: [
    {
      id: "d1",
      titulo: "En una cafetería de Pekín",
      tituloChino: "在北京的一家咖啡馆",
      personajes: ["Laura", "Li Wei"],
      lineas: [
        { personaje: "Laura", texto: "Li Wei, ¿te gusta el café?", traduccion: "李伟，你喜欢咖啡吗？" },
        { personaje: "Li Wei", texto: "No, no me gusta el café. Me gusta el té.", traduccion: "不，我不喜欢咖啡。我喜欢茶。" },
        { personaje: "Laura", texto: "¿Qué té te gusta?", traduccion: "你喜欢什么茶？" },
        { personaje: "Li Wei", texto: "Me gusta el té verde de Hangzhou. ¿Y a ti?", traduccion: "我喜欢杭州的绿茶。你呢？" },
        { personaje: "Laura", texto: "A mí me gusta el café con leche. Y el chocolate, ¡claro!", traduccion: "我喜欢牛奶咖啡。当然还有巧克力！" },
        { personaje: "Li Wei", texto: "¡Mira, aquí hay pasteles de chocolate!", traduccion: "你看，这里有巧克力蛋糕！" },
        { personaje: "Laura", texto: "¡Perfecto! Un café con leche y un pastel, por favor.", traduccion: "太好了！请来一杯牛奶咖啡和一块蛋糕。" },
      ],
    },
    {
      id: "d2",
      titulo: "¿Qué te gusta hacer?",
      tituloChino: "你喜欢做什么？",
      personajes: ["Carmen", "Wang Lei"],
      lineas: [
        { personaje: "Carmen", texto: "Wang Lei, ¿qué te gusta hacer los fines de semana?", traduccion: "王磊，你周末喜欢做什么？" },
        { personaje: "Wang Lei", texto: "Me gusta cocinar. Me gustan las verduras y la comida picante.", traduccion: "我喜欢做饭。我喜欢蔬菜，也喜欢吃辣。" },
        { personaje: "Carmen", texto: "¡Claro, eres de Chengdu! A mí no me gusta la comida picante.", traduccion: "当然，你是成都人嘛！我不喜欢吃辣。" },
        { personaje: "Wang Lei", texto: "¿Y qué te gusta a ti?", traduccion: "那你喜欢什么？" },
        { personaje: "Carmen", texto: "Me gusta leer y me gusta bailar. Y me gustan las películas españolas.", traduccion: "我喜欢看书，也喜欢跳舞。我还喜欢西班牙电影。" },
        { personaje: "Wang Lei", texto: "¿Te gusta la música china?", traduccion: "你喜欢中国音乐吗？" },
        { personaje: "Carmen", texto: "Sí, me gusta. Es muy bonita.", traduccion: "喜欢，很好听。" },
      ],
    },
    {
      id: "d3",
      titulo: "Un fin de semana en Madrid",
      tituloChino: "在马德里的一个周末",
      personajes: ["Javier", "Zhang Min"],
      lineas: [
        { personaje: "Javier", texto: "Zhang Min, ¿qué planes tienes para el sábado?", traduccion: "张敏，你星期六有什么安排？" },
        { personaje: "Zhang Min", texto: "No sé. Me encanta viajar, pero este fin de semana estoy en Madrid.", traduccion: "不知道。我超爱旅行，但这个周末我在马德里。" },
        { personaje: "Javier", texto: "¿Te gusta el fútbol? Hay un partido del Real Madrid.", traduccion: "你喜欢足球吗？有一场皇家马德里的比赛。" },
        { personaje: "Zhang Min", texto: "Mmm… no me gusta mucho el fútbol.", traduccion: "嗯……我不太喜欢足球。" },
        { personaje: "Javier", texto: "¿Y nadar? Hay una piscina muy bonita cerca.", traduccion: "那游泳呢？附近有一个很漂亮的游泳池。" },
        { personaje: "Zhang Min", texto: "No me gusta nada. ¡Pero me encanta el karaoke!", traduccion: "我一点也不喜欢。但是我超爱卡拉OK！" },
        { personaje: "Javier", texto: "¿Karaoke? ¡Vale, vamos al karaoke el sábado!", traduccion: "卡拉OK？好，我们星期六去唱卡拉OK吧！" },
      ],
    },
    {
      id: "d4",
      titulo: "¿Perros o gatos?",
      tituloChino: "狗还是猫？",
      personajes: ["Pablo", "Mei"],
      lineas: [
        { personaje: "Pablo", texto: "Mei, me encantan los perros. ¿Y a ti?", traduccion: "小美，我超喜欢狗。你呢？" },
        { personaje: "Mei", texto: "A mí también. Tengo un perro pequeño en Shanghái.", traduccion: "我也是。我在上海有一只小狗。" },
        { personaje: "Pablo", texto: "¡Qué bien! A mí no me gustan mucho los gatos.", traduccion: "太好了！我不太喜欢猫。" },
        { personaje: "Mei", texto: "A mí sí. Me gustan los perros y los gatos.", traduccion: "我喜欢。狗和猫我都喜欢。" },
        { personaje: "Pablo", texto: "Para las vacaciones, ¿qué prefieres: viajar o estar en casa?", traduccion: "放假的时候，你更喜欢旅行还是待在家里？" },
        { personaje: "Mei", texto: "Prefiero viajar. ¿Y tú?", traduccion: "我更喜欢旅行。你呢？" },
        { personaje: "Pablo", texto: "Yo también. Pero no me gusta viajar en coche.", traduccion: "我也是。但是我不喜欢坐汽车旅行。" },
        { personaje: "Mei", texto: "A mí tampoco. ¡Prefiero el tren!", traduccion: "我也不喜欢。我更喜欢坐火车！" },
      ],
    },
  ],
  ejercicios: {
    completar: [
      { id: "c1", pregunta: "Me _____ las verduras.", preguntaChino: "我喜欢蔬菜。", respuestaCorrecta: "gustan", explicacion: "«Las verduras» es plural → gustan. · 被喜欢的是复数名词，所以用 gustan。", pista: "首字母是 g，6个字母", numeroLetras: 6 },
      { id: "c2", pregunta: "¿_____ gusta el chocolate, Laura?", preguntaChino: "劳拉，你喜欢巧克力吗？", respuestaCorrecta: "Te", explicacion: "Para «tú» el pronombre es «te»: ¿Te gusta…? · 问“你”喜不喜欢，用代词 te。", pista: "首字母是 T，2个字母", numeroLetras: 2 },
      { id: "c3", pregunta: "A Carmen _____ gusta bailar.", preguntaChino: "卡门喜欢跳舞。", respuestaCorrecta: "le", explicacion: "A ella → le. El pronombre es obligatorio. · “她”对应代词 le，不能省略。", pista: "首字母是 l，2个字母", numeroLetras: 2 },
      { id: "c4", pregunta: "Me _____ viajar. ¡Es mi pasión!", preguntaChino: "我超爱旅行，这是我最爱的事！", respuestaCorrecta: "encanta", explicacion: "«Encantar» = gustar muchísimo; con un infinitivo va en singular. · encantar 表示非常喜欢，后接动词原形时用单数。", pista: "首字母是 e，7个字母", numeroLetras: 7 },
      { id: "c5", pregunta: "—No me gusta el café. —A mí _____.", preguntaChino: "——我不喜欢咖啡。——我也不喜欢。", respuestaCorrecta: "tampoco", explicacion: "Para estar de acuerdo con una frase negativa: a mí tampoco. · 同意否定句，用 a mí tampoco。", pista: "首字母是 t，7个字母", numeroLetras: 7 },
      { id: "c6", pregunta: "¿Qué _____ tú, el té o el café?", preguntaChino: "你更喜欢什么，茶还是咖啡？", respuestaCorrecta: "prefieres", explicacion: "Preferir (e → ie), forma de tú: prefieres. · preferir 的“你”形式是 prefieres。", pista: "首字母是 p，9个字母", numeroLetras: 9 },
    ],
    seleccionar: [
      { id: "s1", pregunta: "Elige la frase correcta.", preguntaChino: "选出正确的句子。", opciones: ["Yo gusto el té.", "Me gusta el té.", "Me gusto el té.", "Yo me gusta té."], respuestaCorrecta: "Me gusta el té.", explicacion: "Lo que gusta (el té) es el sujeto: Me gusta el té. · 被喜欢的东西是主语。" },
      { id: "s2", pregunta: "A mis padres _____ gusta cocinar.", preguntaChino: "我父母喜欢做饭。", opciones: ["le", "les", "nos", "me"], respuestaCorrecta: "les", explicacion: "A ellos (mis padres) → les. · “他们”对应 les。" },
      { id: "s3", pregunta: "Me _____ las películas de acción.", preguntaChino: "我喜欢动作片。", opciones: ["gusta", "gusto", "gustan", "gustas"], respuestaCorrecta: "gustan", explicacion: "«Las películas» es plural → gustan. · 复数名词用 gustan。" },
      { id: "s4", pregunta: "—Me encanta el fútbol. —A mí _____. Es mi deporte favorito.", preguntaChino: "——我超爱足球。——我也是。这是我最喜欢的运动。", opciones: ["también", "tampoco", "no", "nada"], respuestaCorrecta: "también", explicacion: "Frase positiva + estás de acuerdo → a mí también. · 同意肯定句用 también。" },
      { id: "s5", pregunta: "—No me gusta nadar. —A mí _____. Me encanta el agua.", preguntaChino: "——我不喜欢游泳。——我喜欢。我超爱水。", opciones: ["sí", "también", "tampoco", "no"], respuestaCorrecta: "sí", explicacion: "Frase negativa + no estás de acuerdo → a mí sí. · 不同意否定句用 a mí sí。" },
      { id: "s6", pregunta: "¿Qué frase es correcta?", preguntaChino: "哪个句子是正确的？", opciones: ["Me gusta nada el karaoke.", "No me gusta nada el karaoke.", "Me muy gusta el karaoke.", "No me encanta nada mucho."], respuestaCorrecta: "No me gusta nada el karaoke.", explicacion: "Con «nada» necesitamos «no» delante: No me gusta nada. · 用 nada 时前面必须有 no。" },
    ],
    verdaderoFalso: [
      { id: "vf1", pregunta: "Se dice «Yo gusto la música».", preguntaChino: "可以说 «Yo gusto la música»。", respuestaCorrecta: false, explicacion: "Falso. Se dice «Me gusta la música». · 错。应该说 Me gusta la música。" },
      { id: "vf2", pregunta: "Con un nombre en plural usamos «gustan»: Me gustan las verduras.", preguntaChino: "名词是复数时用 «gustan»：Me gustan las verduras。", respuestaCorrecta: true, explicacion: "Verdadero. El verbo concuerda con lo que gusta. · 对。动词和被喜欢的东西保持一致。" },
      { id: "vf3", pregunta: "«Le gusta» sirve para él, ella y usted.", preguntaChino: "«Le gusta» 可以用于“他”“她”和“您”。", respuestaCorrecta: true, explicacion: "Verdadero. Le = a él, a ella, a usted. · 对。le 指他、她、您。" },
      { id: "vf4", pregunta: "«Me encanta» es más fuerte que «me gusta».", preguntaChino: "«Me encanta» 比 «me gusta» 程度更强。", respuestaCorrecta: true, explicacion: "Verdadero. Me encanta = me gusta muchísimo. · 对。encantar 表示非常喜欢。" },
      { id: "vf5", pregunta: "Si no estás de acuerdo con «No me gusta el café», dices «A mí tampoco».", preguntaChino: "如果你不同意 «No me gusta el café»，就说 «A mí tampoco»。", respuestaCorrecta: false, explicacion: "Falso. «A mí tampoco» es estar de acuerdo. Para no estar de acuerdo: «A mí sí». · 错。a mí tampoco 表示同意；不同意要说 a mí sí。" },
      { id: "vf6", pregunta: "«Preferir» funciona como «gustar»: «Me prefiere el té».", preguntaChino: "«preferir» 的用法和 «gustar» 一样：«Me prefiere el té»。", respuestaCorrecta: false, explicacion: "Falso. Preferir es un verbo normal: Prefiero el té. · 错。preferir 是普通动词：Prefiero el té。" },
    ],
    emparejar: [
      {
        id: "e1",
        pares: [
          { izquierda: "me gusta", derecha: "我喜欢（单数名词/动词）" },
          { izquierda: "me gustan", derecha: "我喜欢（复数名词）" },
          { izquierda: "te gusta", derecha: "你喜欢" },
          { izquierda: "le gusta", derecha: "他/她/您喜欢" },
          { izquierda: "nos gusta", derecha: "我们喜欢" },
          { izquierda: "me encanta", derecha: "我超爱；我非常喜欢" },
          { izquierda: "a mí también", derecha: "我也是（回应肯定句）" },
          { izquierda: "a mí tampoco", derecha: "我也不（回应否定句）" },
        ],
        explicacion: "将西班牙语表达与对应的中文意思配对。",
      },
    ],
    ordenar: [
      { id: "o1", palabras: ["gusta", "Me", "té", "el", "verde."], respuestaCorrecta: "Me gusta el té verde.", explicacion: "Me + gusta + el + nombre. · 我喜欢绿茶。" },
      { id: "o2", palabras: ["le", "A", "bailar.", "Carmen", "gusta"], respuestaCorrecta: "A Carmen le gusta bailar.", explicacion: "A + persona + le + gusta + infinitivo. · 卡门喜欢跳舞。" },
      { id: "o3", palabras: ["gustan", "No", "me", "las", "de", "películas", "terror."], respuestaCorrecta: "No me gustan las películas de terror.", explicacion: "No va delante del pronombre: No me gustan… · 我不喜欢恐怖片。" },
      { id: "o4", palabras: ["encanta", "Nos", "en", "viajar", "verano."], respuestaCorrecta: "Nos encanta viajar en verano.", explicacion: "Nos + encanta + infinitivo. · 我们超爱夏天去旅行。" },
      { id: "o5", palabras: ["prefiero", "Yo", "té", "el", "verde."], respuestaCorrecta: "Yo prefiero el té verde.", explicacion: "Preferir es un verbo normal: yo prefiero. · 我更喜欢绿茶。" },
    ],
    traducir: [
      { id: "t1", fraseChino: "我喜欢音乐。", respuestaEsperada: "Me gusta la música.", explicacion: "Me gusta + la + nombre singular. · 单数名词用 gusta，并加冠词。" },
      { id: "t2", fraseChino: "你喜欢吃辣吗？", respuestaEsperada: "¿Te gusta la comida picante?", explicacion: "¿Te gusta…? para preguntar a un amigo. · 问朋友用 ¿Te gusta…?" },
      { id: "t3", fraseChino: "我们喜欢做饭。", respuestaEsperada: "Nos gusta cocinar.", explicacion: "Nos gusta + infinitivo. · “我们”用 nos。" },
      { id: "t4", fraseChino: "我超喜欢狗。", respuestaEsperada: "Me encantan los perros.", explicacion: "«Los perros» es plural → encantan. · 复数名词用 encantan。" },
      { id: "t5", fraseChino: "我一点也不喜欢卡拉OK。", respuestaEsperada: "No me gusta nada el karaoke.", explicacion: "No + me gusta + nada. · “一点也不”= no… nada。" },
      { id: "t6", fraseChino: "我更喜欢茶。", respuestaEsperada: "Prefiero el té.", explicacion: "Preferir, forma de yo: prefiero. · preferir 的“我”形式是 prefiero。" },
    ],
  },
  ejerciciosPracticos: [
    {
      id: "ep1",
      tipo: "completarDialogo",
      titulo: "Completa el diálogo",
      tituloChino: "完成对话",
      instruccion: "Completa el diálogo con gusta o gustan.",
      instruccionChino: "用 gusta 或 gustan 完成对话。",
      dialogo: [
        { personaje: "A", texto: "¿Te _____ el té chino?", respuesta: "gusta" },
        { personaje: "B", texto: "Sí, me _____. ¿Y a ti?", respuesta: "gusta" },
        { personaje: "A", texto: "A mí no. Me _____ el café.", respuesta: "gusta" },
        { personaje: "B", texto: "¿Y las películas chinas? ¿Te _____?", respuesta: "gustan" },
        { personaje: "A", texto: "Sí, me gustan mucho.", respuesta: "" },
        { personaje: "B", texto: "A mi hermana también le _____ las películas chinas.", respuesta: "gustan" },
      ],
    },
    {
      id: "ep2",
      tipo: "responder",
      titulo: "Responde sobre tus gustos",
      tituloChino: "回答关于你喜好的问题",
      instruccion: "Responde a las preguntas con frases completas.",
      instruccionChino: "用完整的句子回答问题。",
      preguntas: [
        { pregunta: "¿Te gusta el karaoke?", respuestaEsperada: "Sí, me encanta. / No, no me gusta nada." },
        { pregunta: "¿Qué prefieres, el té o el café?", respuestaEsperada: "Prefiero el té. / Prefiero el café." },
        { pregunta: "Me gusta viajar. ¿Y a ti?", respuestaEsperada: "A mí también. / A mí no." },
        { pregunta: "No me gusta nadar. ¿Y a ti?", respuestaEsperada: "A mí tampoco. / A mí sí." },
      ],
    },
  ],
  preguntasAbiertas: [
    { id: "pa1", pregunta: "¿Qué comida te gusta y qué comida no te gusta?", preguntaChino: "你喜欢什么食物？不喜欢什么食物？", sugerencia: "Me gusta la comida china y me gustan las verduras. No me gusta la comida muy picante.", sugerenciaChino: "我喜欢中国菜，也喜欢蔬菜。我不喜欢太辣的菜。" },
    { id: "pa2", pregunta: "¿Qué te gusta hacer los fines de semana?", preguntaChino: "你周末喜欢做什么？", sugerencia: "Me gusta leer y cocinar. También me encanta ver películas con mis amigos.", sugerenciaChino: "我喜欢看书和做饭。我也超爱和朋友一起看电影。" },
    { id: "pa3", pregunta: "¿Qué le gusta a tu mejor amigo o amiga?", preguntaChino: "你最好的朋友喜欢什么？", sugerencia: "A mi amiga Mei le encantan los perros y le gusta mucho bailar.", sugerenciaChino: "我的朋友小美超喜欢狗，也很喜欢跳舞。" },
    { id: "pa4", pregunta: "¿Qué prefieres: viajar o estar en casa? ¿Por qué?", preguntaChino: "你更喜欢旅行还是待在家里？为什么？", sugerencia: "Prefiero viajar porque me encanta conocer ciudades nuevas.", sugerenciaChino: "我更喜欢旅行，因为我超爱认识新的城市。" },
  ],
  preguntas: [
    { id: "p1", pregunta: "Completa: Me ___ las verduras.", preguntaChino: "填空：Me ___ las verduras.（我喜欢蔬菜。）", respuestaSugerida: "gustan", respuestaSugeridaChino: "gustan（复数名词用 gustan）" },
    { id: "p2", pregunta: "Completa: A nosotros ___ gusta la música.", preguntaChino: "填空：A nosotros ___ gusta la música.（我们喜欢音乐。）", respuestaSugerida: "nos", respuestaSugeridaChino: "nos（“我们”对应的代词）" },
    { id: "p3", pregunta: "¿Qué respondes si estás de acuerdo con «No me gusta el café»?", preguntaChino: "如果你同意 «No me gusta el café»，该怎么回答？", respuestaSugerida: "A mí tampoco.", respuestaSugeridaChino: "A mí tampoco.（我也不喜欢。）" },
    { id: "p4", pregunta: "¿Qué es más fuerte: «me gusta» o «me encanta»?", preguntaChino: "«me gusta» 和 «me encanta» 哪个程度更强？", respuestaSugerida: "Me encanta.", respuestaSugeridaChino: "Me encanta（非常喜欢）程度更强。" },
  ],
};

const M82 = {
  id: "modulo-82",
  numero: 82,
  numeroTexto: "ochenta y dos",
  titulo: "En Mi Barrio - Hay / Está / Están",
  tituloChino: "在我的街区 - Hay / Está / Están",
  descripcion: "Aprende a decir qué hay en tu barrio y dónde están las cosas: la diferencia entre «hay» (existencia) y «está / están» (localización), los artículos y expresiones como cerca de, lejos de, al lado de y enfrente de.",
  descripcionChino: "学习说出你的街区里有什么、东西在哪里：区分 «hay»（表示存在）和 «está / están»（表示位置），掌握冠词的用法，以及 cerca de、lejos de、al lado de、enfrente de 等表达。",
  icono: "🏘️",
  color: "#0d9488",
  nivel: "A1",
  teoria: [
    {
      id: "t1",
      titulo: "Hay: ¿qué hay en el barrio?",
      tituloChino: "Hay：街区里有什么？",
      descripcion: `«Hay» (del verbo haber) sirve para decir que algo existe en un lugar. Tiene una sola forma para el singular y el plural.

Estructura:
• Hay + un / una + nombre singular: En mi barrio hay un parque.
• Hay + número + nombre plural: Hay dos supermercados.
• Hay + nombre plural sin artículo: Hay restaurantes y panaderías.
• Pregunta: ¿Hay una farmacia por aquí?
• Negación: No hay estación de metro.

📌 NOTA:
En las frases negativas normalmente no usamos «un / una»: No hay banco en esta calle.

❌ ERROR COMÚN:
En chino se usa el mismo verbo para «tener» y para «existir». Por eso muchos estudiantes usan «tener»: «En mi barrio tiene un parque» ❌ → «En mi barrio hay un parque» ✅. Y «hay» no cambia en plural: «Hay dos bancos» ✅.`,
      descripcionChino: `«hay»（来自动词 haber）用来表示某个地方“有”某物（存在）。单数和复数都只用这一个形式。

结构：
• Hay + un / una + 单数名词：En mi barrio hay un parque.（我的街区有一个公园。）
• Hay + 数字 + 复数名词：Hay dos supermercados.（有两家超市。）
• Hay + 不带冠词的复数名词：Hay restaurantes y panaderías.（有餐馆和面包店。）
• 疑问：¿Hay una farmacia por aquí?（这附近有药店吗？）
• 否定：No hay estación de metro.（没有地铁站。）

📌 注意：
否定句里一般不用 «un / una»：No hay banco en esta calle.（这条街上没有银行。）

❌ 常见错误：
中文说“我的街区有一个公园”。很多同学把“有”译成 «tener»：«En mi barrio tiene un parque» ❌ → «En mi barrio hay un parque» ✅。而且 «hay» 在复数时不变：«Hay dos bancos» ✅。`,
      ejemplos: [
        { espanol: "En mi barrio hay un parque grande.", chino: "我的街区有一个大公园。" },
        { espanol: "En esta calle hay dos farmacias.", chino: "这条街上有两家药店。" },
        { espanol: "¿Hay un supermercado por aquí?", chino: "这附近有超市吗？" },
        { espanol: "No hay estación de metro en mi barrio.", chino: "我的街区没有地铁站。" },
      ],
    },
    {
      id: "t2",
      titulo: "¿Hay o está?",
      tituloChino: "用 hay 还是 está？",
      descripcion: `Comparamos dos preguntas diferentes:

• ¿Hay un banco por aquí? → No sé si existe. Pregunto por la existencia.
• ¿Dónde está el banco? → Sé que existe. Pregunto por el lugar.

Regla práctica:
| HAY | ESTÁ / ESTÁN |
| un, una, unos, unas, números, plural sin artículo | el, la, los, las, nombres propios |
| Hay una farmacia en la plaza. | La farmacia está en la plaza. |
| Hay dos parques. | Los parques están en la calle Sol. |

📌 NOTA:
Con nombres propios usamos «está»: El restaurante Lao Beijing está en esta calle.

❌ ERROR COMÚN:
«Hay el supermercado en mi calle» ❌. Nunca usamos «hay» + el / la / los / las. Lo correcto es «Hay un supermercado en mi calle» ✅ o «El supermercado está en mi calle» ✅.`,
      descripcionChino: `比较两个不同的问题：

• ¿Hay un banco por aquí?（这附近有银行吗？）→ 我不知道有没有，问的是“存在”。
• ¿Dónde está el banco?（银行在哪儿？）→ 我知道有银行，问的是“位置”。

实用规则：
| HAY | ESTÁ / ESTÁN |
| un, una, unos, unas、数字、不带冠词的复数 | el, la, los, las、专有名词 |
| Hay una farmacia en la plaza.（广场上有一家药店。） | La farmacia está en la plaza.（药店在广场上。） |
| Hay dos parques.（有两个公园。） | Los parques están en la calle Sol.（公园在太阳街。） |

📌 注意：
专有名词用 «está»：El restaurante Lao Beijing está en esta calle.（“老北京”餐馆在这条街上。）

❌ 常见错误：
«Hay el supermercado en mi calle» ❌。«hay» 后面永远不用 el / la / los / las。正确的说法是 «Hay un supermercado en mi calle» ✅ 或 «El supermercado está en mi calle» ✅。`,
      ejemplos: [
        { espanol: "Hay un banco en la plaza.", chino: "广场上有一家银行。" },
        { espanol: "El banco está en la plaza.", chino: "银行在广场上。" },
        { espanol: "¿Dónde está la estación de metro?", chino: "地铁站在哪儿？" },
        { espanol: "Las panaderías están en la calle Mayor.", chino: "面包店在主街上。" },
      ],
    },
    {
      id: "t3",
      titulo: "¿Dónde está? ¿Dónde están?",
      tituloChino: "在哪儿？（单数和复数）",
      descripcion: `Para decir dónde se encuentra algo usamos «estar»:
• Singular: El cine está cerca de la plaza.
• Plural: Las tiendas están en el centro.

Expresiones de lugar útiles:
• cerca de ≠ lejos de: La biblioteca está cerca de mi casa. El gimnasio está lejos.
• al lado de: La parada de autobús está al lado del banco.
• enfrente de: El cine está enfrente del parque.

Recuerda: de + el = del → al lado del parque (no «al lado de el parque»).

📌 NOTA:
Si no dices el punto de referencia, no usas «de»: Está cerca. Está lejos.

❌ ERROR COMÚN:
«El cine es cerca» ❌. Para la localización usamos «estar», no «ser»: «El cine está cerca» ✅. Y cuidado con el plural: «Los bancos está…» ❌ → «Los bancos están…» ✅.`,
      descripcionChino: `说某物在哪里，用 «estar»：
• 单数：El cine está cerca de la plaza.（电影院在广场附近。）
• 复数：Las tiendas están en el centro.（商店在市中心。）

常用的方位表达：
• cerca de（在……附近）≠ lejos de（离……远）：La biblioteca está cerca de mi casa.（图书馆在我家附近。）El gimnasio está lejos.（健身房很远。）
• al lado de（在……旁边）：La parada de autobús está al lado del banco.（公交车站在银行旁边。）
• enfrente de（在……对面）：El cine está enfrente del parque.（电影院在公园对面。）

记住：de + el = del → al lado del parque（不说 «al lado de el parque»）。

📌 注意：
如果不说参照物，就不用 «de»：Está cerca.（很近。）Está lejos.（很远。）

❌ 常见错误：
«El cine es cerca» ❌。表示位置用 «estar»，不用 «ser»：«El cine está cerca» ✅。还要注意复数：«Los bancos está…» ❌ → «Los bancos están…» ✅。`,
      ejemplos: [
        { espanol: "La biblioteca está cerca de mi casa.", chino: "图书馆在我家附近。" },
        { espanol: "El gimnasio está lejos del centro.", chino: "健身房离市中心很远。" },
        { espanol: "La parada de autobús está al lado del cine.", chino: "公交车站在电影院旁边。" },
        { espanol: "Los cines están enfrente de la plaza.", chino: "电影院在广场对面。" },
      ],
    },
    {
      id: "t4",
      titulo: "Describir el barrio",
      tituloChino: "描述你的街区",
      descripcion: `Para describir tu barrio, combina hay, está / están y adjetivos:

• Hay mucho / mucha + singular: Hay mucho tráfico. Hay mucha gente.
• Hay muchos / muchas + plural: Hay muchos restaurantes. Hay muchas tiendas.
• No hay + nombre: No hay cine.
• Mi barrio es tranquilo / ruidoso. (ser + adjetivo: cómo es)

Modelo:
Mi barrio es tranquilo. Hay un parque grande y muchas tiendas. El gimnasio está al lado de mi casa, pero el centro comercial está lejos.

📌 NOTA:
«Mucho» concuerda con el nombre: mucho tráfico, mucha gente, muchos bancos, muchas farmacias.

❌ ERROR COMÚN:
«Hay mucho restaurantes» ❌ → «Hay muchos restaurantes» ✅. Y para decir cómo es el barrio en general usamos «ser»: «Mi barrio es tranquilo» ✅. «Mi barrio está tranquilo» significa que hoy, en este momento, está tranquilo.`,
      descripcionChino: `描述你的街区时，可以把 hay、está / están 和形容词结合起来：

• Hay mucho / mucha + 单数名词：Hay mucho tráfico.（车很多。）Hay mucha gente.（人很多。）
• Hay muchos / muchas + 复数名词：Hay muchos restaurantes.（有很多餐馆。）Hay muchas tiendas.（有很多商店。）
• No hay + 名词：No hay cine.（没有电影院。）
• Mi barrio es tranquilo / ruidoso.（我的街区很安静 / 很吵。）（ser + 形容词：描述特点）

范例：
我的街区很安静。有一个大公园和很多商店。健身房就在我家旁边，但是购物中心很远。

📌 注意：
«mucho» 要和名词的性数一致：mucho tráfico，mucha gente，muchos bancos，muchas farmacias。

❌ 常见错误：
«Hay mucho restaurantes» ❌ → «Hay muchos restaurantes» ✅。描述街区平时的特点用 «ser»：«Mi barrio es tranquilo» ✅。«Mi barrio está tranquilo» 的意思是“今天、此刻很安静”。`,
      ejemplos: [
        { espanol: "Mi barrio es tranquilo y bonito.", chino: "我的街区又安静又漂亮。" },
        { espanol: "En el centro hay muchos restaurantes.", chino: "市中心有很多餐馆。" },
        { espanol: "Mi calle es muy ruidosa: hay mucho tráfico.", chino: "我住的街很吵：车很多。" },
        { espanol: "El centro comercial está lejos, pero hay una parada de autobús.", chino: "购物中心很远，不过有一个公交车站。" },
      ],
    },
  ],
  vocabulario: [
    { id: "v1", espanol: "hay", chino: "有（表示存在）", ejemplo: "En mi barrio hay un parque." },
    { id: "v2", espanol: "el barrio", chino: "街区；社区", ejemplo: "Mi barrio es muy bonito." },
    { id: "v3", espanol: "la calle", chino: "街道", ejemplo: "Vivo en la calle Mayor." },
    { id: "v4", espanol: "el supermercado", chino: "超市", ejemplo: "Hay un supermercado en mi calle." },
    { id: "v5", espanol: "la farmacia", chino: "药店", ejemplo: "¿Hay una farmacia por aquí?" },
    { id: "v6", espanol: "el banco", chino: "银行", ejemplo: "El banco está en la plaza." },
    { id: "v7", espanol: "el parque", chino: "公园", ejemplo: "No hay parque en esta calle." },
    { id: "v8", espanol: "la estación de metro", chino: "地铁站", ejemplo: "¿Dónde está la estación de metro?" },
    { id: "v9", espanol: "la plaza", chino: "广场", ejemplo: "Hay árboles en la plaza." },
    { id: "v10", espanol: "la panadería", chino: "面包店", ejemplo: "La panadería está en la plaza." },
    { id: "v11", espanol: "el restaurante", chino: "餐馆", ejemplo: "Hay un restaurante de jiaozi en mi barrio." },
    { id: "v12", espanol: "cerca de", chino: "在……附近", ejemplo: "La biblioteca está cerca de mi casa." },
    { id: "v13", espanol: "lejos de", chino: "离……远", ejemplo: "El gimnasio está lejos del centro." },
    { id: "v14", espanol: "al lado de", chino: "在……旁边", ejemplo: "La parada está al lado del banco." },
    { id: "v15", espanol: "enfrente de", chino: "在……对面", ejemplo: "El cine está enfrente del parque." },
    { id: "v16", espanol: "la biblioteca", chino: "图书馆", ejemplo: "La biblioteca está enfrente del cine." },
    { id: "v17", espanol: "el cine", chino: "电影院", ejemplo: "El cine está al lado del gimnasio." },
    { id: "v18", espanol: "el gimnasio", chino: "健身房", ejemplo: "El gimnasio está al lado de mi casa." },
    { id: "v19", espanol: "la parada de autobús", chino: "公交车站", ejemplo: "¿Hay una parada de autobús cerca?" },
    { id: "v20", espanol: "el centro comercial", chino: "购物中心", ejemplo: "El centro comercial está lejos." },
    { id: "v21", espanol: "tranquilo", chino: "安静的；平静的", ejemplo: "Mi barrio es muy tranquilo." },
    { id: "v22", espanol: "ruidoso", chino: "吵闹的", ejemplo: "Mi calle es ruidosa por la noche." },
  ],
  dialogos: [
    {
      id: "d1",
      titulo: "Nueva en el barrio",
      tituloChino: "刚搬来的新邻居",
      personajes: ["Mei", "Carlos"],
      lineas: [
        { personaje: "Mei", texto: "Perdona, soy nueva en el barrio. ¿Hay un supermercado por aquí?", traduccion: "不好意思，我刚搬到这个街区。这附近有超市吗？" },
        { personaje: "Carlos", texto: "Sí, hay un supermercado en esta calle, al final.", traduccion: "有，这条街的尽头就有一家超市。" },
        { personaje: "Mei", texto: "¡Genial! ¿Y hay una farmacia?", traduccion: "太好了！那有药店吗？" },
        { personaje: "Carlos", texto: "Sí, hay dos farmacias. Una está en la plaza.", traduccion: "有，有两家药店。其中一家在广场上。" },
        { personaje: "Mei", texto: "¿Y la estación de metro?", traduccion: "那地铁站呢？" },
        { personaje: "Carlos", texto: "En esta calle no hay metro, pero la estación está en la plaza también.", traduccion: "这条街上没有地铁，不过地铁站也在广场那边。" },
        { personaje: "Mei", texto: "Muchas gracias. ¡Me gusta este barrio!", traduccion: "非常感谢。我喜欢这个街区！" },
      ],
    },
    {
      id: "d2",
      titulo: "Un paseo por un hutong de Pekín",
      tituloChino: "在北京胡同里散步",
      personajes: ["Li Wei", "Ana"],
      lineas: [
        { personaje: "Li Wei", texto: "Este es mi barrio. Es un hutong antiguo.", traduccion: "这是我住的街区，是一条老胡同。" },
        { personaje: "Ana", texto: "¡Qué bonito! ¿Qué hay en la calle?", traduccion: "真漂亮！街上有什么？" },
        { personaje: "Li Wei", texto: "Hay una panadería, un restaurante de jiaozi y un banco.", traduccion: "有一家面包店、一家饺子馆和一家银行。" },
        { personaje: "Ana", texto: "¿Hay un parque?", traduccion: "有公园吗？" },
        { personaje: "Li Wei", texto: "No, no hay parque. Pero hay una plaza pequeña con árboles.", traduccion: "没有公园。不过有一个种着树的小广场。" },
        { personaje: "Ana", texto: "¿Y dónde está el restaurante de jiaozi? ¡Tengo hambre!", traduccion: "那饺子馆在哪儿？我饿了！" },
        { personaje: "Li Wei", texto: "Está aquí, en esta calle. ¡Vamos!", traduccion: "就在这儿，在这条街上。走吧！" },
      ],
    },
    {
      id: "d3",
      titulo: "¿Dónde está la biblioteca?",
      tituloChino: "图书馆在哪儿？",
      personajes: ["Sara", "Wang Lei"],
      lineas: [
        { personaje: "Sara", texto: "Wang Lei, ¿dónde está la biblioteca?", traduccion: "王磊，图书馆在哪儿？" },
        { personaje: "Wang Lei", texto: "Está enfrente del cine, en la calle Huaihai.", traduccion: "在电影院对面，在淮海路上。" },
        { personaje: "Sara", texto: "¿Está lejos de aquí?", traduccion: "离这儿远吗？" },
        { personaje: "Wang Lei", texto: "No, está cerca. A diez minutos a pie.", traduccion: "不远，很近。走路十分钟。" },
        { personaje: "Sara", texto: "¿Y hay una parada de autobús cerca?", traduccion: "附近有公交车站吗？" },
        { personaje: "Wang Lei", texto: "Sí, la parada está al lado del gimnasio.", traduccion: "有，车站在健身房旁边。" },
        { personaje: "Sara", texto: "Perfecto. ¡Gracias!", traduccion: "好极了，谢谢！" },
      ],
    },
    {
      id: "d4",
      titulo: "¿Cómo es tu barrio?",
      tituloChino: "你的街区怎么样？",
      personajes: ["Diego", "Chen Jing"],
      lineas: [
        { personaje: "Diego", texto: "Chen Jing, ¿cómo es tu barrio en Ciudad de México?", traduccion: "陈静，你在墨西哥城住的街区怎么样？" },
        { personaje: "Chen Jing", texto: "Es muy tranquilo. Hay muchos árboles y un parque grande.", traduccion: "很安静。有很多树，还有一个大公园。" },
        { personaje: "Diego", texto: "¿Hay tiendas?", traduccion: "有商店吗？" },
        { personaje: "Chen Jing", texto: "Sí, hay algunas tiendas pequeñas, pero el centro comercial está lejos.", traduccion: "有一些小商店，但是购物中心很远。" },
        { personaje: "Diego", texto: "Mi barrio es muy ruidoso. Hay mucho tráfico y muchos bares.", traduccion: "我的街区很吵。车很多，酒吧也很多。" },
        { personaje: "Chen Jing", texto: "Pero hay muchas cosas cerca, ¿no?", traduccion: "不过附近有很多东西，对吧？" },
        { personaje: "Diego", texto: "Sí, es verdad. El cine y el gimnasio están al lado de mi casa.", traduccion: "对，这倒是真的。电影院和健身房就在我家旁边。" },
      ],
    },
  ],
  ejercicios: {
    completar: [
      { id: "c1", pregunta: "En mi barrio _____ dos supermercados.", preguntaChino: "我的街区有两家超市。", respuestaCorrecta: "hay", explicacion: "Existencia + número → hay (no cambia en plural). · 表示存在用 hay，复数也不变。", pista: "首字母是 h，3个字母", numeroLetras: 3 },
      { id: "c2", pregunta: "¿_____ una farmacia por aquí?", preguntaChino: "这附近有药店吗？", respuestaCorrecta: "Hay", explicacion: "Pregunta por la existencia con «una» → hay. · 问“有没有”，后面是 una，用 hay。", pista: "首字母是 H，3个字母", numeroLetras: 3 },
      { id: "c3", pregunta: "La panadería _____ en la plaza.", preguntaChino: "面包店在广场上。", respuestaCorrecta: "está", explicacion: "«La panadería» (artículo determinado) + lugar → está. · 带定冠词的名词 + 位置，用 está。", pista: "首字母是 e，4个字母", numeroLetras: 4 },
      { id: "c4", pregunta: "Las tiendas _____ cerca de la estación.", preguntaChino: "商店在车站附近。", respuestaCorrecta: "están", explicacion: "Sujeto plural → están. · 主语是复数，用 están。", pista: "首字母是 e，5个字母", numeroLetras: 5 },
      { id: "c5", pregunta: "El gimnasio está al lado _____ parque.", preguntaChino: "健身房在公园旁边。", respuestaCorrecta: "del", explicacion: "De + el = del. · de 和 el 要缩合成 del。", pista: "首字母是 d，3个字母", numeroLetras: 3 },
      { id: "c6", pregunta: "Mi barrio no es ruidoso, es muy _____.", preguntaChino: "我的街区不吵，很安静。", respuestaCorrecta: "tranquilo", explicacion: "Lo contrario de «ruidoso» es «tranquilo». · ruidoso（吵）的反义词是 tranquilo（安静）。", pista: "首字母是 t，9个字母", numeroLetras: 9 },
    ],
    seleccionar: [
      { id: "s1", pregunta: "En esta calle _____ un banco.", preguntaChino: "这条街上有一家银行。", opciones: ["está", "hay", "es", "tiene"], respuestaCorrecta: "hay", explicacion: "Con «un» usamos hay. · 后面是 un，用 hay。" },
      { id: "s2", pregunta: "¿Dónde _____ el parque?", preguntaChino: "公园在哪儿？", opciones: ["hay", "está", "están", "es"], respuestaCorrecta: "está", explicacion: "Preguntamos por el lugar de algo conocido (singular) → está. · 问已知事物的位置，单数用 está。" },
      { id: "s3", pregunta: "_____ supermercado está en la calle Mayor.", preguntaChino: "超市在主街上。", opciones: ["Un", "El", "Hay", "Unos"], respuestaCorrecta: "El", explicacion: "Con «está» usamos el artículo determinado: el supermercado. · está 前面用定冠词。" },
      { id: "s4", pregunta: "Las paradas de autobús _____ enfrente de la biblioteca.", preguntaChino: "公交车站在图书馆对面。", opciones: ["está", "hay", "están", "son"], respuestaCorrecta: "están", explicacion: "Sujeto plural + lugar → están. · 复数主语 + 位置，用 están。" },
      { id: "s5", pregunta: "En el centro hay _____ restaurantes.", preguntaChino: "市中心有很多餐馆。", opciones: ["mucho", "mucha", "muchos", "muchas"], respuestaCorrecta: "muchos", explicacion: "«Restaurantes» es masculino plural → muchos. · 阳性复数名词用 muchos。" },
      { id: "s6", pregunta: "Lo contrario de «lejos» es…", preguntaChino: "«lejos»（远）的反义词是……", opciones: ["cerca", "enfrente", "ruidoso", "tranquilo"], respuestaCorrecta: "cerca", explicacion: "Lejos ≠ cerca. · 远 ≠ 近。" },
    ],
    verdaderoFalso: [
      { id: "vf1", pregunta: "«Hay» tiene una forma para el singular y otra para el plural.", preguntaChino: "«hay» 单数和复数有不同的形式。", respuestaCorrecta: false, explicacion: "Falso. «Hay» no cambia: hay un banco, hay dos bancos. · 错。hay 永远不变。" },
      { id: "vf2", pregunta: "Decimos «En mi barrio hay un parque».", preguntaChino: "我们说 «En mi barrio hay un parque»。", respuestaCorrecta: true, explicacion: "Verdadero. Para la existencia usamos hay, no tener. · 对。表示存在用 hay，不用 tener。" },
      { id: "vf3", pregunta: "«Hay el banco en la plaza» es correcto.", preguntaChino: "«Hay el banco en la plaza» 是正确的。", respuestaCorrecta: false, explicacion: "Falso. Se dice «Hay un banco…» o «El banco está…». · 错。hay 后面不用定冠词。" },
      { id: "vf4", pregunta: "Para preguntar por el lugar de algo conocido decimos «¿Dónde está…?».", preguntaChino: "问已知事物在哪里，说 «¿Dónde está…?»。", respuestaCorrecta: true, explicacion: "Verdadero. ¿Dónde está la farmacia? · 对。" },
      { id: "vf5", pregunta: "De + el = del: al lado del cine.", preguntaChino: "de + el 缩合成 del：al lado del cine（在电影院旁边）。", respuestaCorrecta: true, explicacion: "Verdadero. Es una contracción obligatoria. · 对。这是必须的缩合。" },
      { id: "vf6", pregunta: "Para decir dónde está algo usamos «ser»: «El cine es cerca».", preguntaChino: "表示位置用 «ser»：«El cine es cerca»。", respuestaCorrecta: false, explicacion: "Falso. Para la localización usamos estar: El cine está cerca. · 错。表示位置用 estar。" },
    ],
    emparejar: [
      {
        id: "e1",
        pares: [
          { izquierda: "la farmacia", derecha: "药店" },
          { izquierda: "el supermercado", derecha: "超市" },
          { izquierda: "la panadería", derecha: "面包店" },
          { izquierda: "la estación de metro", derecha: "地铁站" },
          { izquierda: "cerca de", derecha: "在……附近" },
          { izquierda: "lejos de", derecha: "离……远" },
          { izquierda: "al lado de", derecha: "在……旁边" },
          { izquierda: "enfrente de", derecha: "在……对面" },
        ],
        explicacion: "将地点和方位表达与对应的中文意思配对。",
      },
    ],
    ordenar: [
      { id: "o1", palabras: ["hay", "En", "barrio", "mi", "parque.", "un"], respuestaCorrecta: "En mi barrio hay un parque.", explicacion: "Lugar + hay + un + nombre. · 我的街区有一个公园。" },
      { id: "o2", palabras: ["no", "Aquí", "farmacia.", "hay"], respuestaCorrecta: "Aquí no hay farmacia.", explicacion: "En negativa, sin «una»: no hay farmacia. · 这里没有药店。" },
      { id: "o3", palabras: ["está", "El", "plaza.", "la", "en", "banco"], respuestaCorrecta: "El banco está en la plaza.", explicacion: "El + nombre + está + lugar. · 银行在广场上。" },
      { id: "o4", palabras: ["al", "La", "está", "lado", "del", "biblioteca", "cine."], respuestaCorrecta: "La biblioteca está al lado del cine.", explicacion: "Está + al lado del + nombre. · 图书馆在电影院旁边。" },
      { id: "o5", palabras: ["muchos", "Hay", "restaurantes", "centro.", "el", "en"], respuestaCorrecta: "Hay muchos restaurantes en el centro.", explicacion: "Hay + muchos + nombre plural. · 市中心有很多餐馆。" },
    ],
    traducir: [
      { id: "t1", fraseChino: "我的街区有一家面包店。", respuestaEsperada: "En mi barrio hay una panadería.", explicacion: "«有» (existencia) = hay. · 表示存在的“有”= hay。" },
      { id: "t2", fraseChino: "这附近有银行吗？", respuestaEsperada: "¿Hay un banco por aquí?", explicacion: "¿Hay + un / una…? · 问“有没有”。" },
      { id: "t3", fraseChino: "药店在广场上。", respuestaEsperada: "La farmacia está en la plaza.", explicacion: "Algo conocido + lugar → está. · 已知事物的位置用 está。" },
      { id: "t4", fraseChino: "电影院在公园对面。", respuestaEsperada: "El cine está enfrente del parque.", explicacion: "Enfrente de + el = enfrente del. · de + el = del。" },
      { id: "t5", fraseChino: "健身房很远。", respuestaEsperada: "El gimnasio está lejos.", explicacion: "Sin referencia, «lejos» va sin «de». · 不说参照物时，lejos 后面不加 de。" },
      { id: "t6", fraseChino: "我的街区很安静。", respuestaEsperada: "Mi barrio es tranquilo.", explicacion: "Cómo es el barrio → ser. · 描述街区的特点用 ser。" },
    ],
  },
  ejerciciosPracticos: [
    {
      id: "ep1",
      tipo: "completarDialogo",
      titulo: "Completa el diálogo",
      tituloChino: "完成对话",
      instruccion: "Completa el diálogo con hay, está o están.",
      instruccionChino: "用 hay、está 或 están 完成对话。",
      dialogo: [
        { personaje: "A", texto: "Perdone, ¿_____ un banco por aquí?", respuesta: "hay" },
        { personaje: "B", texto: "Sí, _____ uno en la calle Mayor.", respuesta: "hay" },
        { personaje: "A", texto: "¿Y dónde _____ la estación de metro?", respuesta: "está" },
        { personaje: "B", texto: "_____ en la plaza, al lado de la farmacia.", respuesta: "Está" },
        { personaje: "A", texto: "¿_____ supermercados en este barrio?", respuesta: "Hay" },
        { personaje: "B", texto: "Sí, hay dos, pero no _____ cerca.", respuesta: "están" },
      ],
    },
    {
      id: "ep2",
      tipo: "responder",
      titulo: "Habla de tu barrio",
      tituloChino: "谈谈你的街区",
      instruccion: "Responde a las preguntas sobre tu barrio.",
      instruccionChino: "回答关于你的街区的问题。",
      preguntas: [
        { pregunta: "¿Qué hay en tu barrio?", respuestaEsperada: "En mi barrio hay un parque, dos supermercados y muchos restaurantes." },
        { pregunta: "¿Hay una estación de metro cerca de tu casa?", respuestaEsperada: "Sí, hay una estación cerca de mi casa. / No, no hay." },
        { pregunta: "¿Dónde está el supermercado?", respuestaEsperada: "Está al lado de / enfrente de / cerca de…" },
        { pregunta: "¿Cómo es tu barrio?", respuestaEsperada: "Mi barrio es tranquilo. / Mi barrio es ruidoso." },
      ],
    },
  ],
  preguntasAbiertas: [
    { id: "pa1", pregunta: "Describe tu barrio: ¿qué hay y cómo es?", preguntaChino: "描述你的街区：有什么？是什么样的？", sugerencia: "Mi barrio es tranquilo. Hay un parque, una farmacia y muchas tiendas pequeñas.", sugerenciaChino: "我的街区很安静。有一个公园、一家药店和很多小商店。" },
    { id: "pa2", pregunta: "¿Qué no hay en tu barrio y qué necesitas?", preguntaChino: "你的街区没有什么？你需要什么？", sugerencia: "En mi barrio no hay biblioteca ni cine. Necesito un gimnasio cerca de casa.", sugerenciaChino: "我的街区没有图书馆，也没有电影院。我需要家附近有一个健身房。" },
    { id: "pa3", pregunta: "¿Dónde está tu lugar favorito del barrio?", preguntaChino: "你在街区里最喜欢的地方在哪儿？", sugerencia: "Mi lugar favorito es una panadería. Está enfrente del parque, al lado del banco.", sugerenciaChino: "我最喜欢的地方是一家面包店。它在公园对面，银行旁边。" },
    { id: "pa4", pregunta: "Compara tu barrio en China con un barrio español que conoces.", preguntaChino: "把你在中国住的街区和你知道的一个西班牙街区比较一下。", sugerencia: "En mi barrio de Shanghái hay muchos edificios altos. En el barrio de Madrid hay muchas plazas y bares.", sugerenciaChino: "我在上海住的街区有很多高楼。马德里的那个街区有很多广场和酒吧。" },
  ],
  preguntas: [
    { id: "p1", pregunta: "Completa: En la calle ___ dos bancos.", preguntaChino: "填空：En la calle ___ dos bancos.（街上有两家银行。）", respuestaSugerida: "hay", respuestaSugeridaChino: "hay（表示存在，复数也不变）" },
    { id: "p2", pregunta: "Completa: ¿Dónde ___ los cines?", preguntaChino: "填空：¿Dónde ___ los cines?（电影院在哪儿？）", respuestaSugerida: "están", respuestaSugeridaChino: "están（复数主语的位置）" },
    { id: "p3", pregunta: "¿Qué es lo contrario de «cerca de»?", preguntaChino: "«cerca de»（在……附近）的反义词是什么？", respuestaSugerida: "lejos de", respuestaSugeridaChino: "lejos de（离……远）" },
    { id: "p4", pregunta: "¿Es correcta la frase «Hay el parque»?", preguntaChino: "«Hay el parque» 这句话对吗？", respuestaSugerida: "No. Se dice «Hay un parque» o «El parque está…».", respuestaSugeridaChino: "不对。应该说 «Hay un parque» 或 «El parque está…»。" },
  ],
};

const M83 = {
  id: "modulo-83",
  numero: 83,
  numeroTexto: "ochenta y tres",
  titulo: "En el Mercado - Cantidades, Pesos y Precios",
  tituloChino: "在市场 - 数量、重量和价格",
  descripcion: "Aprende a comprar en un mercado: pedir cantidades y pesos (un kilo de, medio kilo de, una docena de), preguntar el precio con «¿cuánto cuesta?», entender euros y céntimos y señalar productos con este, esta, ese, esa.",
  descripcionChino: "学习在市场买东西：说出数量和重量（un kilo de、medio kilo de、una docena de），用 «¿cuánto cuesta?» 问价格，听懂欧元和欧分，并用 este、esta、ese、esa 指出商品。",
  icono: "🧺",
  color: "#ea580c",
  nivel: "A1",
  teoria: [
    {
      id: "t1",
      titulo: "Cantidades y pesos",
      tituloChino: "数量和重量",
      descripcion: `En el mercado pedimos cantidades con «de» + nombre:

• un kilo de: un kilo de manzanas
• medio kilo de (500 gramos): medio kilo de tomates
• cien gramos de: cien gramos de jamón
• una docena de (12): una docena de huevos
• media docena de (6): media docena de huevos
• un kilo de patatas, dos kilos de manzanas

📌 NOTA:
«Medio» no lleva «un» delante: medio kilo ✅, un medio kilo ❌. «Docena» es femenino: una docena, media docena.

❌ ERROR COMÚN:
En chino no hay ninguna palabra entre la cantidad y el producto. En español la «de» es obligatoria: «un kilo manzanas» ❌ → «un kilo de manzanas» ✅.`,
      descripcionChino: `在市场上，我们用 «de» + 名词来说数量：

• un kilo de（一公斤）：un kilo de manzanas（一公斤苹果）
• medio kilo de（半公斤，500克）：medio kilo de tomates（半公斤西红柿）
• cien gramos de（一百克）：cien gramos de jamón（一百克火腿）
• una docena de（一打，12个）：una docena de huevos（一打鸡蛋）
• media docena de（半打，6个）：media docena de huevos（半打鸡蛋）
• un kilo de patatas（一公斤土豆），dos kilos de manzanas（两公斤苹果）

📌 注意：
«medio» 前面不加 «un»：medio kilo ✅，un medio kilo ❌。«docena» 是阴性：una docena，media docena。

❌ 常见错误：
中文说“一公斤苹果”，中间没有任何词。西班牙语里 «de» 不能省略：«un kilo manzanas» ❌ → «un kilo de manzanas» ✅。`,
      ejemplos: [
        { espanol: "Un kilo de manzanas, por favor.", chino: "请给我一公斤苹果。" },
        { espanol: "Quería medio kilo de tomates.", chino: "我想要半公斤西红柿。" },
        { espanol: "Una docena de huevos, por favor.", chino: "请给我一打鸡蛋。" },
        { espanol: "Necesito dos kilos de patatas.", chino: "我需要两公斤土豆。" },
      ],
    },
    {
      id: "t2",
      titulo: "¿Cuánto cuesta? ¿Cuánto cuestan?",
      tituloChino: "多少钱？（单数和复数）",
      descripcion: `Para preguntar el precio usamos el verbo costar (o → ue):

• ¿Cuánto cuesta + singular? ¿Cuánto cuesta el kilo de tomates?
• ¿Cuánto cuestan + plural? ¿Cuánto cuestan los huevos?
• ¿Cuánto es? = ¿Cuánto tengo que pagar en total?

Para decir el precio:
• Cuesta dos euros. / Cuestan tres euros el kilo.
• 1,50 € = un euro con cincuenta (céntimos)
• 0,80 € = ochenta céntimos
• En total son seis euros.
• En China: Cuesta diez yuanes.

📌 NOTA:
En España escribimos los decimales con coma: 2,50 €. Decimos «dos euros con cincuenta» o simplemente «dos cincuenta».

❌ ERROR COMÚN:
«¿Cuánto dinero es la manzana?» ❌ (traducción literal del chino). Lo natural es «¿Cuánto cuesta la manzana?» ✅ o «¿Cuánto es?» ✅. Y recuerda la -s: un euro, dos euros.`,
      descripcionChino: `问价格用动词 costar（o → ue）：

• ¿Cuánto cuesta + 单数？¿Cuánto cuesta el kilo de tomates?（西红柿一公斤多少钱？）
• ¿Cuánto cuestan + 复数？¿Cuánto cuestan los huevos?（鸡蛋多少钱？）
• ¿Cuánto es? = 一共要付多少钱？

说价格：
• Cuesta dos euros.（两欧元。）/ Cuestan tres euros el kilo.（三欧元一公斤。）
• 1,50 € = un euro con cincuenta (céntimos)（一欧元五十分）
• 0,80 € = ochenta céntimos（八十欧分）
• En total son seis euros.（一共六欧元。）
• 在中国：Cuesta diez yuanes.（十块钱。）

📌 注意：
在西班牙，小数点用逗号表示：2,50 €。读作 «dos euros con cincuenta»，或者简单说 «dos cincuenta»。

❌ 常见错误：
«¿Cuánto dinero es la manzana?» ❌（直译“苹果多少钱”）。自然的说法是 «¿Cuánto cuesta la manzana?» ✅ 或 «¿Cuánto es?» ✅。还要记住复数加 -s：un euro，dos euros。`,
      ejemplos: [
        { espanol: "¿Cuánto cuesta el kilo de patatas?", chino: "土豆一公斤多少钱？" },
        { espanol: "¿Cuánto cuestan los huevos?", chino: "鸡蛋多少钱？" },
        { espanol: "Cuestan dos euros con cincuenta.", chino: "两欧元五十分。" },
        { espanol: "¿Cuánto es? — Son seis euros.", chino: "一共多少钱？——六欧元。" },
      ],
    },
    {
      id: "t3",
      titulo: "Este, ese: los demostrativos",
      tituloChino: "este、ese：指示词",
      descripcion: `Usamos los demostrativos para señalar cosas:

| | Aquí (cerca de mí) | Ahí (cerca de ti) |
| masculino singular | este | ese |
| femenino singular | esta | esa |
| masculino plural | estos | esos |
| femenino plural | estas | esas |

• Este queso es muy bueno. (aquí, en mi mano)
• ¿Cuánto cuestan esas fresas? (ahí, cerca del vendedor)
• Sin nombre: Quiero este. / ¿Y esas?

📌 NOTA:
El demostrativo concuerda con el nombre: este pescado, esta naranja, estos quesos, estas fresas.

❌ ERROR COMÚN:
«Esto naranjas» o «este fresas» ❌. «Esto» no va delante de un nombre; se usa solo para cosas que no sabes nombrar: ¿Qué es esto? ✅. Lo correcto es «estas naranjas», «estas fresas» ✅.`,
      descripcionChino: `我们用指示词来指东西：

| | 这（离我近） | 那（离你近） |
| 阳性单数 | este | ese |
| 阴性单数 | esta | esa |
| 阳性复数 | estos | esos |
| 阴性复数 | estas | esas |

• Este queso es muy bueno.（这块奶酪很好吃。）（在这里，在我手上）
• ¿Cuánto cuestan esas fresas?（那些草莓多少钱？）（在那里，在摊主旁边）
• 不带名词：Quiero este.（我要这个。）/ ¿Y esas?（那些呢？）

📌 注意：
指示词要和名词性数一致：este pescado，esta naranja，estos quesos，estas fresas。

❌ 常见错误：
«Esto naranjas» 或 «este fresas» ❌。«esto» 不放在名词前面，只用来指叫不出名字的东西：¿Qué es esto?（这是什么？）✅。正确的说法是 «estas naranjas»、«estas fresas» ✅。`,
      ejemplos: [
        { espanol: "Este pescado está muy fresco.", chino: "这条鱼很新鲜。" },
        { espanol: "Estas naranjas son baratas.", chino: "这些橙子很便宜。" },
        { espanol: "¿Cuánto cuesta ese queso?", chino: "那块奶酪多少钱？" },
        { espanol: "Esas fresas son un poco caras.", chino: "那些草莓有点贵。" },
      ],
    },
    {
      id: "t4",
      titulo: "Comprar en un puesto del mercado",
      tituloChino: "在市场摊位上买东西",
      descripcion: `Un diálogo típico en un puesto:

1. Vendedor: ¡Hola! ¿Qué le pongo? / ¿Qué desea?
2. Cliente: Quería un kilo de naranjas, por favor. / Póngame medio kilo de fresas.
3. Vendedor: ¿Algo más?
4. Cliente: Sí, cien gramos de queso. / No, nada más, gracias.
5. Vendedor: ¿Quiere una bolsa?
6. Cliente: ¿Cuánto es?
7. Vendedor: Son cinco euros con veinte.

Para hablar del precio y la calidad:
• Es barato / Es caro → Las fresas son caras hoy.
• Está fresco → El pescado está muy fresco.

📌 NOTA:
«Quería» y «Póngame» son formas educadas y muy usadas en las tiendas de España. «Quiero» también es correcto, pero «quería» suena más amable.

❌ ERROR COMÚN:
Decir solo «Naranjas. Un kilo.» puede sonar brusco. Mejor: «Póngame un kilo de naranjas, por favor» o «Quería un kilo de naranjas» ✅.`,
      descripcionChino: `摊位上的典型对话：

1. 摊主：¡Hola! ¿Qué le pongo? / ¿Qué desea?（您好！您要点什么？）
2. 顾客：Quería un kilo de naranjas, por favor.（我想要一公斤橙子。）/ Póngame medio kilo de fresas.（给我来半公斤草莓。）
3. 摊主：¿Algo más?（还要别的吗？）
4. 顾客：Sí, cien gramos de queso.（要，一百克奶酪。）/ No, nada más, gracias.（不用了，就这些，谢谢。）
5. 摊主：¿Quiere una bolsa?（您要袋子吗？）
6. 顾客：¿Cuánto es?（一共多少钱？）
7. 摊主：Son cinco euros con veinte.（一共五欧元二十分。）

谈价格和质量：
• Es barato（便宜）/ Es caro（贵）→ Las fresas son caras hoy.（今天草莓很贵。）
• Está fresco（新鲜）→ El pescado está muy fresco.（鱼很新鲜。）

📌 注意：
«Quería» 和 «Póngame» 是西班牙商店里常用的礼貌说法。«Quiero» 也对，但 «quería» 听起来更客气。

❌ 常见错误：
只说 «Naranjas. Un kilo.» 听起来可能很生硬。更好的说法是：«Póngame un kilo de naranjas, por favor» 或 «Quería un kilo de naranjas» ✅。`,
      ejemplos: [
        { espanol: "¿Qué le pongo?", chino: "您要点什么？" },
        { espanol: "Póngame medio kilo de fresas, por favor.", chino: "请给我来半公斤草莓。" },
        { espanol: "No, nada más, gracias.", chino: "不用了，就这些，谢谢。" },
        { espanol: "Hoy el pescado es barato y está muy fresco.", chino: "今天鱼很便宜，而且很新鲜。" },
      ],
    },
  ],
  vocabulario: [
    { id: "v1", espanol: "el mercado", chino: "市场；菜市场", ejemplo: "Compro la fruta en el mercado." },
    { id: "v2", espanol: "el kilo", chino: "公斤", ejemplo: "Un kilo de manzanas, por favor." },
    { id: "v3", espanol: "medio", chino: "半（个）", ejemplo: "Quería medio kilo de tomates." },
    { id: "v4", espanol: "la docena", chino: "一打（十二个）", ejemplo: "Una docena de huevos, por favor." },
    { id: "v5", espanol: "los huevos", chino: "鸡蛋", ejemplo: "¿Cuánto cuestan los huevos?" },
    { id: "v6", espanol: "las manzanas", chino: "苹果", ejemplo: "Las manzanas cuestan dos euros el kilo." },
    { id: "v7", espanol: "los tomates", chino: "西红柿", ejemplo: "Medio kilo de tomates, por favor." },
    { id: "v8", espanol: "las patatas", chino: "土豆", ejemplo: "Necesito un kilo de patatas." },
    { id: "v9", espanol: "el euro", chino: "欧元", ejemplo: "Cuesta un euro." },
    { id: "v10", espanol: "el céntimo", chino: "欧分", ejemplo: "Son ochenta céntimos." },
    { id: "v11", espanol: "costar", chino: "价值；花费（多少钱）", ejemplo: "¿Cuánto cuesta el kilo?" },
    { id: "v12", espanol: "este / esta", chino: "这个（阳性 / 阴性）", ejemplo: "Este queso es muy bueno." },
    { id: "v13", espanol: "ese / esa", chino: "那个（阳性 / 阴性）", ejemplo: "¿Cuánto cuesta esa naranja?" },
    { id: "v14", espanol: "las naranjas", chino: "橙子", ejemplo: "Estas naranjas son de Valencia." },
    { id: "v15", espanol: "las fresas", chino: "草莓", ejemplo: "Esas fresas son caras." },
    { id: "v16", espanol: "el pescado", chino: "鱼（食用）", ejemplo: "Este pescado está muy fresco." },
    { id: "v17", espanol: "el queso", chino: "奶酪", ejemplo: "Cien gramos de queso, por favor." },
    { id: "v18", espanol: "barato", chino: "便宜的", ejemplo: "Las naranjas son baratas hoy." },
    { id: "v19", espanol: "caro", chino: "贵的", ejemplo: "¡Qué caro!" },
    { id: "v20", espanol: "fresco", chino: "新鲜的", ejemplo: "El pescado está fresco." },
    { id: "v21", espanol: "la bolsa", chino: "袋子", ejemplo: "¿Me da una bolsa, por favor?" },
    { id: "v22", espanol: "nada más", chino: "就这些；不要别的了", ejemplo: "No, nada más, gracias." },
  ],
  dialogos: [
    {
      id: "d1",
      titulo: "En un mercado de Valencia",
      tituloChino: "在瓦伦西亚的一个市场",
      personajes: ["Vendedor", "Li Wei"],
      lineas: [
        { personaje: "Vendedor", texto: "¡Buenos días! ¿Qué desea?", traduccion: "早上好！您要点什么？" },
        { personaje: "Li Wei", texto: "Hola. ¿Cuánto cuestan las manzanas?", traduccion: "你好。苹果多少钱？" },
        { personaje: "Vendedor", texto: "Cuestan dos euros el kilo.", traduccion: "两欧元一公斤。" },
        { personaje: "Li Wei", texto: "Un kilo de manzanas, por favor. Y medio kilo de tomates.", traduccion: "请给我一公斤苹果，再要半公斤西红柿。" },
        { personaje: "Vendedor", texto: "Aquí tiene. ¿Necesita patatas o huevos?", traduccion: "给您。您还需要土豆或者鸡蛋吗？" },
        { personaje: "Li Wei", texto: "Sí, un kilo de patatas y una docena de huevos.", traduccion: "要，一公斤土豆和一打鸡蛋。" },
        { personaje: "Vendedor", texto: "Son seis euros con cincuenta céntimos.", traduccion: "一共六欧元五十分。" },
        { personaje: "Li Wei", texto: "Aquí tiene. ¡Gracias!", traduccion: "给您。谢谢！" },
      ],
    },
    {
      id: "d2",
      titulo: "Precios en Shanghái y en Madrid",
      tituloChino: "上海和马德里的物价",
      personajes: ["Ana", "Wang Lei"],
      lineas: [
        { personaje: "Ana", texto: "Wang Lei, en Shanghái, ¿cuánto cuesta un kilo de manzanas?", traduccion: "王磊，在上海一公斤苹果多少钱？" },
        { personaje: "Wang Lei", texto: "Más o menos quince yuanes. ¿Y en Madrid?", traduccion: "大概十五块钱。马德里呢？" },
        { personaje: "Ana", texto: "Unos dos euros. ¿Y una docena de huevos?", traduccion: "两欧元左右。那一打鸡蛋呢？" },
        { personaje: "Wang Lei", texto: "Cuesta unos doce yuanes.", traduccion: "大约十二块钱。" },
        { personaje: "Ana", texto: "¿Y cuánto cuestan los tomates?", traduccion: "那西红柿多少钱？" },
        { personaje: "Wang Lei", texto: "Medio kilo, unos cuatro yuanes.", traduccion: "半公斤大约四块钱。" },
        { personaje: "Ana", texto: "En Madrid, un kilo de tomates cuesta un euro con ochenta céntimos.", traduccion: "在马德里，一公斤西红柿要一欧元八十分。" },
        { personaje: "Wang Lei", texto: "¡Uf! Necesito una calculadora.", traduccion: "哎呀！我需要一个计算器。" },
      ],
    },
    {
      id: "d3",
      titulo: "¿Cuánto cuestan estas fresas?",
      tituloChino: "这些草莓多少钱？",
      personajes: ["Vendedor", "Carmen"],
      lineas: [
        { personaje: "Vendedor", texto: "¡Hola, Carmen! ¿Qué le pongo hoy?", traduccion: "你好，卡门！今天要点什么？" },
        { personaje: "Carmen", texto: "Hola. ¿Cuánto cuestan estas fresas?", traduccion: "你好。这些草莓多少钱？" },
        { personaje: "Vendedor", texto: "Esas cuestan cuatro euros el kilo. Son de Huelva, muy frescas.", traduccion: "那些四欧元一公斤。是韦尔瓦产的，非常新鲜。" },
        { personaje: "Carmen", texto: "Uf, son un poco caras. ¿Y estas naranjas?", traduccion: "哎，有点贵。那这些橙子呢？" },
        { personaje: "Vendedor", texto: "Esas son muy baratas: un euro el kilo.", traduccion: "那些很便宜：一欧元一公斤。" },
        { personaje: "Carmen", texto: "Pues póngame dos kilos de naranjas y este queso.", traduccion: "那给我两公斤橙子和这块奶酪。" },
        { personaje: "Vendedor", texto: "¿Algo más?", traduccion: "还要别的吗？" },
        { personaje: "Carmen", texto: "No, nada más, gracias.", traduccion: "不用了，就这些，谢谢。" },
      ],
    },
    {
      id: "d4",
      titulo: "En un mercado de Ciudad de México",
      tituloChino: "在墨西哥城的一个市场",
      personajes: ["Mei", "Vendedor"],
      lineas: [
        { personaje: "Mei", texto: "Buenas tardes. ¿Este pescado es fresco?", traduccion: "下午好。这条鱼新鲜吗？" },
        { personaje: "Vendedor", texto: "Sí, señorita, es de hoy. Está muy fresco.", traduccion: "是的，小姐，今天的，非常新鲜。" },
        { personaje: "Mei", texto: "¿Cuánto cuesta?", traduccion: "多少钱？" },
        { personaje: "Vendedor", texto: "Noventa pesos el kilo.", traduccion: "九十比索一公斤。" },
        { personaje: "Mei", texto: "Quería medio kilo, por favor. ¿Y ese queso?", traduccion: "我要半公斤，谢谢。那块奶酪呢？" },
        { personaje: "Vendedor", texto: "Es queso Oaxaca. Es muy bueno y barato.", traduccion: "是瓦哈卡奶酪。很好吃，也很便宜。" },
        { personaje: "Mei", texto: "Perfecto, también ese queso. ¿Me da una bolsa?", traduccion: "好，那块奶酪也要。能给我一个袋子吗？" },
        { personaje: "Vendedor", texto: "Claro. ¿Algo más?", traduccion: "当然。还要别的吗？" },
        { personaje: "Mei", texto: "Nada más, gracias.", traduccion: "不用了，谢谢。" },
      ],
    },
  ],
  ejercicios: {
    completar: [
      { id: "c1", pregunta: "Quería un kilo _____ tomates.", preguntaChino: "我想要一公斤西红柿。", respuestaCorrecta: "de", explicacion: "Cantidad + de + nombre. · 数量和名词之间要加 de。", pista: "首字母是 d，2个字母", numeroLetras: 2 },
      { id: "c2", pregunta: "¿Cuánto _____ las manzanas?", preguntaChino: "苹果多少钱？", respuestaCorrecta: "cuestan", explicacion: "«Las manzanas» es plural → cuestan. · 复数名词用 cuestan。", pista: "首字母是 c，7个字母", numeroLetras: 7 },
      { id: "c3", pregunta: "Una _____ de huevos son doce huevos.", preguntaChino: "一打鸡蛋是十二个鸡蛋。", respuestaCorrecta: "docena", explicacion: "Una docena = 12. · 一打 = 12 个。", pista: "首字母是 d，6个字母", numeroLetras: 6 },
      { id: "c4", pregunta: "¿Cuánto cuestan _____ fresas? (aquí, cerca de mí)", preguntaChino: "这些草莓多少钱？（在我身边）", respuestaCorrecta: "estas", explicacion: "Femenino plural, cerca de mí → estas. · 阴性复数、离我近，用 estas。", pista: "首字母是 e，5个字母", numeroLetras: 5 },
      { id: "c5", pregunta: "¿Diez euros el kilo? ¡Qué _____!", preguntaChino: "一公斤十欧元？好贵啊！", respuestaCorrecta: "caro", explicacion: "Mucho dinero → caro. · 价钱高 = caro（贵）。", pista: "首字母是 c，4个字母", numeroLetras: 4 },
      { id: "c6", pregunta: "—¿Algo más? —No, nada _____, gracias.", preguntaChino: "——还要别的吗？——不用了，就这些，谢谢。", respuestaCorrecta: "más", explicacion: "Nada más = no quiero otra cosa. · nada más 表示不要别的了。", pista: "首字母是 m，3个字母", numeroLetras: 3 },
    ],
    seleccionar: [
      { id: "s1", pregunta: "Medio kilo son…", preguntaChino: "半公斤是……", opciones: ["100 gramos", "250 gramos", "500 gramos", "1000 gramos"], respuestaCorrecta: "500 gramos", explicacion: "Medio kilo = 500 gramos (一斤). · 半公斤 = 500 克，也就是一斤。" },
      { id: "s2", pregunta: "¿Cuánto _____ el kilo de patatas?", preguntaChino: "土豆一公斤多少钱？", opciones: ["cuesta", "cuestan", "cuestas", "costa"], respuestaCorrecta: "cuesta", explicacion: "«El kilo» es singular → cuesta. · 主语 el kilo 是单数，用 cuesta。" },
      { id: "s3", pregunta: "1,50 € se dice…", preguntaChino: "1,50 € 怎么读？", opciones: ["uno con cincuenta euros", "un euro con cincuenta", "uno euro cincuenta", "un euros cincuenta"], respuestaCorrecta: "un euro con cincuenta", explicacion: "Un euro con cincuenta (céntimos). · 读作 un euro con cincuenta。" },
      { id: "s4", pregunta: "_____ naranjas son muy dulces. (aquí)", preguntaChino: "这些橙子很甜。（在这里）", opciones: ["Este", "Esta", "Estos", "Estas"], respuestaCorrecta: "Estas", explicacion: "«Naranjas» es femenino plural → estas. · 阴性复数用 estas。" },
      { id: "s5", pregunta: "¿Y _____ pescado? (ahí, cerca de ti)", preguntaChino: "那条鱼呢？（在你那边）", opciones: ["ese", "esa", "esos", "esas"], respuestaCorrecta: "ese", explicacion: "«Pescado» es masculino singular, cerca de ti → ese. · 阳性单数、离你近，用 ese。" },
      { id: "s6", pregunta: "Para pedir con educación en una tienda dices:", preguntaChino: "在商店里礼貌地点东西，你说：", opciones: ["Quería un kilo de fresas.", "Yo un kilo fresas.", "Dar fresas un kilo.", "Fresas, ¡ya!"], respuestaCorrecta: "Quería un kilo de fresas.", explicacion: "«Quería…» es una forma educada. · quería 是礼貌说法。" },
    ],
    verdaderoFalso: [
      { id: "vf1", pregunta: "«Un kilo manzanas» es correcto.", preguntaChino: "«Un kilo manzanas» 是正确的。", respuestaCorrecta: false, explicacion: "Falso. Falta «de»: un kilo de manzanas. · 错。缺少 de。" },
      { id: "vf2", pregunta: "Una docena son doce unidades.", preguntaChino: "一打是十二个。", respuestaCorrecta: true, explicacion: "Verdadero. Una docena de huevos = 12 huevos. · 对。" },
      { id: "vf3", pregunta: "Decimos «un medio kilo de tomates».", preguntaChino: "我们说 «un medio kilo de tomates»。", respuestaCorrecta: false, explicacion: "Falso. Se dice «medio kilo», sin «un». · 错。medio 前面不加 un。" },
      { id: "vf4", pregunta: "«Estos» va con nombres masculinos plurales: estos tomates.", preguntaChino: "«estos» 用于阳性复数名词：estos tomates。", respuestaCorrecta: true, explicacion: "Verdadero. Estos tomates, estos quesos. · 对。" },
      { id: "vf5", pregunta: "Lo contrario de «caro» es «barato».", preguntaChino: "«caro»（贵）的反义词是 «barato»（便宜）。", respuestaCorrecta: true, explicacion: "Verdadero. Caro ≠ barato. · 对。" },
      { id: "vf6", pregunta: "«Esto naranjas» es correcto.", preguntaChino: "«Esto naranjas» 是正确的。", respuestaCorrecta: false, explicacion: "Falso. Se dice «estas naranjas». «Esto» no va con nombre. · 错。esto 不放在名词前。" },
    ],
    emparejar: [
      {
        id: "e1",
        pares: [
          { izquierda: "un kilo", derecha: "一公斤" },
          { izquierda: "medio kilo", derecha: "半公斤（一斤）" },
          { izquierda: "una docena", derecha: "一打（十二个）" },
          { izquierda: "¿Cuánto cuesta?", derecha: "多少钱？（单数）" },
          { izquierda: "barato", derecha: "便宜的" },
          { izquierda: "caro", derecha: "贵的" },
          { izquierda: "fresco", derecha: "新鲜的" },
          { izquierda: "¿Algo más?", derecha: "还要别的吗？" },
        ],
        explicacion: "将购物用语与对应的中文意思配对。",
      },
    ],
    ordenar: [
      { id: "o1", palabras: ["kilo", "Un", "de", "manzanas,", "por", "favor."], respuestaCorrecta: "Un kilo de manzanas, por favor.", explicacion: "Cantidad + de + nombre. · 请给我一公斤苹果。" },
      { id: "o2", palabras: ["¿Cuánto", "los", "cuestan", "huevos?"], respuestaCorrecta: "¿Cuánto cuestan los huevos?", explicacion: "¿Cuánto + cuestan + plural? · 鸡蛋多少钱？" },
      { id: "o3", palabras: ["euros", "Son", "con", "tres", "cincuenta."], respuestaCorrecta: "Son tres euros con cincuenta.", explicacion: "Son + precio total. · 一共三欧元五十分。" },
      { id: "o4", palabras: ["fresas", "Estas", "muy", "son", "frescas."], respuestaCorrecta: "Estas fresas son muy frescas.", explicacion: "Demostrativo + nombre + verbo. · 这些草莓很新鲜。" },
      { id: "o5", palabras: ["Póngame", "kilo", "medio", "de", "queso."], respuestaCorrecta: "Póngame medio kilo de queso.", explicacion: "Póngame + cantidad + de + nombre. · 给我来半公斤奶酪。" },
    ],
    traducir: [
      { id: "t1", fraseChino: "一公斤西红柿多少钱？", respuestaEsperada: "¿Cuánto cuesta un kilo de tomates?", explicacion: "«Un kilo» es singular → cuesta. · un kilo 是单数，用 cuesta。" },
      { id: "t2", fraseChino: "我想要一打鸡蛋。（用 quería）", respuestaEsperada: "Quería una docena de huevos.", explicacion: "Quería + cantidad + de + nombre. · 礼貌地点东西用 quería。" },
      { id: "t3", fraseChino: "一共六欧元。", respuestaEsperada: "Son seis euros.", explicacion: "Para el total decimos «son». · 说总价用 son。" },
      { id: "t4", fraseChino: "这些橙子很便宜。", respuestaEsperada: "Estas naranjas son baratas.", explicacion: "Estas + femenino plural; baratas concuerda. · 形容词也要用阴性复数。" },
      { id: "t5", fraseChino: "这条鱼很新鲜。", respuestaEsperada: "Este pescado está muy fresco.", explicacion: "Este + masculino singular; estar fresco. · 新鲜用 estar fresco。" },
      { id: "t6", fraseChino: "不用了，就这些，谢谢。", respuestaEsperada: "No, nada más, gracias.", explicacion: "Respuesta a «¿Algo más?». · 回答“还要别的吗？”。" },
    ],
  },
  ejerciciosPracticos: [
    {
      id: "ep1",
      tipo: "completarDialogo",
      titulo: "Completa el diálogo",
      tituloChino: "完成对话",
      instruccion: "Completa el diálogo en un puesto de fruta.",
      instruccionChino: "完成在水果摊上的对话。",
      dialogo: [
        { personaje: "A", texto: "¡Hola! ¿Qué le _____?", respuesta: "pongo" },
        { personaje: "B", texto: "Quería un kilo _____ naranjas.", respuesta: "de" },
        { personaje: "A", texto: "Aquí tiene. ¿Algo _____?", respuesta: "más" },
        { personaje: "B", texto: "Sí. ¿Cuánto _____ estas fresas?", respuesta: "cuestan" },
        { personaje: "A", texto: "Tres euros el kilo.", respuesta: "" },
        { personaje: "B", texto: "Medio kilo, por favor. ¿Cuánto _____ en total?", respuesta: "es" },
        { personaje: "A", texto: "_____ cuatro euros con cincuenta.", respuesta: "Son" },
      ],
    },
    {
      id: "ep2",
      tipo: "completarTabla",
      titulo: "Este o ese",
      tituloChino: "este 还是 ese",
      instruccion: "Escribe el demostrativo correcto: aquí (este…) y ahí (ese…).",
      instruccionChino: "写出正确的指示词：这里（este…）和那里（ese…）。",
      tabla: [
        { nombre: "el pescado", aqui: "este pescado", ahi: "ese pescado" },
        { nombre: "la naranja", aqui: "esta naranja", ahi: "esa naranja" },
        { nombre: "los tomates", aqui: "estos tomates", ahi: "esos tomates" },
        { nombre: "las fresas", aqui: "estas fresas", ahi: "esas fresas" },
      ],
    },
  ],
  preguntasAbiertas: [
    { id: "pa1", pregunta: "¿Dónde compras la fruta y la verdura?", preguntaChino: "你在哪里买水果和蔬菜？", sugerencia: "Compro la fruta en el mercado de mi barrio. Es fresca y barata.", sugerenciaChino: "我在我们街区的市场买水果。又新鲜又便宜。" },
    { id: "pa2", pregunta: "¿Qué compras normalmente en una semana? Di las cantidades.", preguntaChino: "你一周通常买什么？说出数量。", sugerencia: "Compro un kilo de manzanas, una docena de huevos y medio kilo de tomates.", sugerenciaChino: "我买一公斤苹果、一打鸡蛋和半公斤西红柿。" },
    { id: "pa3", pregunta: "¿Cuánto cuesta un kilo de manzanas en tu ciudad?", preguntaChino: "在你的城市，一公斤苹果多少钱？", sugerencia: "En Pekín, un kilo de manzanas cuesta unos quince yuanes.", sugerenciaChino: "在北京，一公斤苹果大约十五块钱。" },
    { id: "pa4", pregunta: "Escribe un diálogo corto en un puesto del mercado.", preguntaChino: "写一段在市场摊位上的简短对话。", sugerencia: "—¿Qué le pongo? —Quería medio kilo de fresas. —¿Algo más? —No, nada más. ¿Cuánto es? —Dos euros.", sugerenciaChino: "——您要点什么？——我想要半公斤草莓。——还要别的吗？——不用了。多少钱？——两欧元。" },
  ],
  preguntas: [
    { id: "p1", pregunta: "¿Cuántos huevos hay en una docena?", preguntaChino: "一打有几个鸡蛋？", respuestaSugerida: "Doce.", respuestaSugeridaChino: "十二个。" },
    { id: "p2", pregunta: "Completa: ¿Cuánto ___ los tomates?", preguntaChino: "填空：¿Cuánto ___ los tomates?（西红柿多少钱？）", respuestaSugerida: "cuestan", respuestaSugeridaChino: "cuestan（复数名词）" },
    { id: "p3", pregunta: "¿Cómo se lee 2,50 €?", preguntaChino: "2,50 € 怎么读？", respuestaSugerida: "Dos euros con cincuenta (céntimos).", respuestaSugeridaChino: "两欧元五十分。" },
    { id: "p4", pregunta: "¿Qué demostrativo usas con «fresas» si están cerca de ti?", preguntaChino: "如果草莓离你很近，用哪个指示词？", respuestaSugerida: "estas", respuestaSugeridaChino: "estas（阴性复数，离我近）" },
  ],
};

const M84 = {
  id: "modulo-84",
  numero: 84,
  numeroTexto: "ochenta y cuatro",
  titulo: "Al Teléfono - Llamar, Dejar Recados y Quedar",
  tituloChino: "打电话 - 打电话、留言和约见面",
  descripcion: "Aprende a llamar y contestar al teléfono, a preguntar por alguien y dejar un recado, a decir qué está haciendo una persona con estar + gerundio y a quedar con amigos: proponer un plan, aceptarlo o rechazarlo con educación.",
  descripcionChino: "学习打电话和接电话、找人和留口信，用 estar + 副动词说某人正在做什么，以及和朋友约见面：提出计划、接受或礼貌地拒绝。",
  icono: "📞",
  color: "#4f46e5",
  nivel: "A2",
  teoria: [
    {
      id: "t1",
      titulo: "Llamar y contestar al teléfono",
      tituloChino: "打电话和接电话",
      descripcion: `Frases típicas en una llamada:

• Contestar: ¿Diga? / ¿Dígame? (España) · ¿Bueno? (México) · ¿Aló? (otros países)
• Presentarse: Hola, soy Li Wei.
• Preguntar por alguien: ¿Está Marta, por favor? / ¿Puedo hablar con Marta?
• Preguntar quién llama: ¿De parte de quién?
• Pedir esperar: Un momento, por favor.
• Si la persona no está: Ahora mismo no está. ¿Quieres dejar un recado?
• Dejar un recado: Sí, dile que ha llamado Li Wei, por favor.
• Número incorrecto: Perdone, se ha equivocado de número.

📌 NOTA:
En España, al contestar no decimos «Hola, ¿quién eres?». Decimos «¿Diga?» o «¿Sí?», y la persona que llama se presenta: «Hola, soy…».

❌ ERROR COMÚN:
«¿Quién eres?» (traducción literal del chino) suena brusco al teléfono. Lo educado es «¿De parte de quién?» ✅ o «¿Quién es, por favor?» ✅.`,
      descripcionChino: `电话里的常用句子：

• 接电话：¿Diga? / ¿Dígame?（西班牙）· ¿Bueno?（墨西哥）· ¿Aló?（其他国家）
• 自我介绍：Hola, soy Li Wei.（你好，我是李伟。）
• 找人：¿Está Marta, por favor?（请问玛尔塔在吗？）/ ¿Puedo hablar con Marta?（我可以和玛尔塔通话吗？）
• 问对方是谁：¿De parte de quién?（请问您是哪位？）
• 请对方稍等：Un momento, por favor.（请稍等。）
• 要找的人不在：Ahora mismo no está. ¿Quieres dejar un recado?（她现在不在。你要留个口信吗？）
• 留口信：Sí, dile que ha llamado Li Wei, por favor.（好的，请告诉她李伟来过电话。）
• 打错电话：Perdone, se ha equivocado de número.（对不起，您打错了。）

📌 注意：
在西班牙，接电话时不说 «Hola, ¿quién eres?»，而是说 «¿Diga?» 或 «¿Sí?»，由打电话的人先介绍自己：«Hola, soy…»。

❌ 常见错误：
«¿Quién eres?»（直译“你是谁？”）在电话里听起来很生硬。礼貌的说法是 «¿De parte de quién?» ✅ 或 «¿Quién es, por favor?» ✅。`,
      ejemplos: [
        { espanol: "¿Diga? — Hola, soy Li Wei.", chino: "喂？——你好，我是李伟。" },
        { espanol: "¿Está Marta, por favor?", chino: "请问玛尔塔在吗？" },
        { espanol: "Un momento, por favor.", chino: "请稍等。" },
        { espanol: "¿Quieres dejar un recado?", chino: "你要留个口信吗？" },
      ],
    },
    {
      id: "t2",
      titulo: "Estar + gerundio: ¿qué estás haciendo?",
      tituloChino: "estar + 副动词：你正在做什么？",
      descripcion: `Usamos estar + gerundio para acciones que están pasando ahora mismo:
• Ahora mismo estoy cocinando.
• Marta no puede contestar: está trabajando.

Formación del gerundio:
• -ar → -ando: hablar → hablando, trabajar → trabajando
• -er / -ir → -iendo: comer → comiendo, escribir → escribiendo
• Irregulares frecuentes: leer → leyendo, dormir → durmiendo, oír → oyendo

estar: estoy, estás, está, estamos, estáis, están + gerundio

Con verbos reflexivos: Se está duchando = Está duchándose.

📌 NOTA:
Al teléfono es muy útil: «Ahora no puede ponerse, está durmiendo. ¿Quieres dejar un recado?»

❌ ERROR COMÚN:
En chino el verbo no cambia para decir «ahora mismo». En español hay que conjugar «estar» y cambiar el verbo: «Yo estar comer» ❌ → «Estoy comiendo» ✅. Y no se usa para el futuro: «Mañana estoy viajando» ❌ → «Mañana viajo» ✅.`,
      descripcionChino: `estar + 副动词（gerundio）表示此刻正在发生的动作：
• Ahora mismo estoy cocinando.（我现在正在做饭。）
• Marta no puede contestar: está trabajando.（玛尔塔没法接电话：她正在工作。）

副动词的构成：
• -ar → -ando：hablar → hablando，trabajar → trabajando
• -er / -ir → -iendo：comer → comiendo，escribir → escribiendo
• 常见不规则：leer → leyendo，dormir → durmiendo，oír → oyendo

estar 的变位：estoy, estás, está, estamos, estáis, están + 副动词

自复动词：Se está duchando = Está duchándose.（他正在洗澡。）

📌 注意：
打电话时很有用：«Ahora no puede ponerse, está durmiendo. ¿Quieres dejar un recado?»（他现在不能接电话，正在睡觉。你要留个口信吗？）

❌ 常见错误：
中文用“正在”+ 动词，动词本身不变。西班牙语要给 «estar» 变位，动词也要变成副动词：«Yo estar comer» ❌ → «Estoy comiendo» ✅。而且不用它表示将来的计划：«Mañana estoy viajando» ❌ → «Mañana viajo» ✅。`,
      ejemplos: [
        { espanol: "¿Qué estás haciendo?", chino: "你正在做什么？" },
        { espanol: "Estoy estudiando para el examen.", chino: "我正在为考试复习。" },
        { espanol: "Mi madre está durmiendo.", chino: "我妈妈正在睡觉。" },
        { espanol: "Ahora no puede ponerse: está duchándose.", chino: "他现在不能接电话：正在洗澡。" },
      ],
    },
    {
      id: "t3",
      titulo: "Proponer un plan: ¿quedamos?",
      tituloChino: "提出计划：我们见个面吧？",
      descripcion: `«Quedar» = ponerse de acuerdo para verse en un lugar y a una hora.

Para proponer:
• ¿Tienes planes para el sábado?
• ¿Quedamos el sábado?
• ¿Te apetece ir al cine? (apetecer funciona como gustar: me apetece, te apetece…)
• ¿Por qué no vamos a cenar juntos?
• ¿Qué tal si tomamos un café?

Para concretar:
• ¿A qué hora quedamos? — A las siete.
• ¿Dónde quedamos? — En la puerta del cine.

📌 NOTA:
«Quedar con alguien»: Quedo con Marta a las cinco. «Quedar en + lugar»: Quedamos en la plaza.

❌ ERROR COMÚN:
«¿Tú apeteces ir al cine?» ❌. Como «gustar»: «¿Te apetece ir al cine?» ✅. Tampoco digas «¿Tenemos una cita?» a un amigo: «cita» suena a médico o a algo romántico. Mejor «¿Quedamos?» ✅.`,
      descripcionChino: `«quedar» = 约好在某个地点、某个时间见面。

提出建议：
• ¿Tienes planes para el sábado?（你星期六有安排吗？）
• ¿Quedamos el sábado?（我们星期六见面吧？）
• ¿Te apetece ir al cine?（你想去看电影吗？）（apetecer 的用法和 gustar 一样：me apetece, te apetece…）
• ¿Por qué no vamos a cenar juntos?（我们为什么不一起去吃晚饭呢？）
• ¿Qué tal si tomamos un café?（我们去喝杯咖啡怎么样？）

确定细节：
• ¿A qué hora quedamos?（我们几点见？）— A las siete.（七点。）
• ¿Dónde quedamos?（我们在哪儿见？）— En la puerta del cine.（在电影院门口。）

📌 注意：
«quedar con alguien»（和某人约见面）：Quedo con Marta a las cinco. «quedar en + 地点»（约在某地）：Quedamos en la plaza.

❌ 常见错误：
«¿Tú apeteces ir al cine?» ❌。和 «gustar» 一样：«¿Te apetece ir al cine?» ✅。也不要对朋友说 «¿Tenemos una cita?»：«cita» 听起来像看病预约或约会。更好的说法是 «¿Quedamos?» ✅。`,
      ejemplos: [
        { espanol: "¿Quedamos el sábado por la tarde?", chino: "我们星期六下午见面吧？" },
        { espanol: "¿Te apetece tomar un café?", chino: "你想喝杯咖啡吗？" },
        { espanol: "¿A qué hora quedamos?", chino: "我们几点见？" },
        { espanol: "Quedamos a las siete en la puerta del cine.", chino: "我们七点在电影院门口见。" },
      ],
    },
    {
      id: "t4",
      titulo: "Aceptar y rechazar",
      tituloChino: "接受和拒绝",
      descripcion: `Para aceptar:
• ¡Vale! / De acuerdo. / ¡Genial! / ¡Me parece muy bien!

Para rechazar con educación (con una excusa):
• Lo siento, no puedo. Es que tengo que estudiar.
• Me encantaría, pero estoy ocupado / ocupada.

Para proponer otra opción:
• ¿Y otro día? / ¿Qué tal el domingo?
• El sábado estoy libre.

📌 NOTA:
En español casi siempre damos una excusa con «es que…». Un «no» solo puede sonar demasiado directo.

❌ ERROR COMÚN:
«Soy libre el sábado» ❌ → «Estoy libre el sábado» ✅: tener tiempo es un estado, por eso usamos estar. Y «gratis» significa «sin pagar»: «¿Estás gratis?» ❌ → «¿Estás libre?» ✅.`,
      descripcionChino: `接受：
• ¡Vale!（好！）/ De acuerdo.（同意。）/ ¡Genial!（太棒了！）/ ¡Me parece muy bien!（我觉得很好！）

礼貌地拒绝（并说明理由）：
• Lo siento, no puedo. Es que tengo que estudiar.（抱歉，我去不了。因为我得学习。）
• Me encantaría, pero estoy ocupado / ocupada.（我很想去，但是我很忙。）

提出别的选择：
• ¿Y otro día?（改天呢？）/ ¿Qué tal el domingo?（星期天怎么样？）
• El sábado estoy libre.（我星期六有空。）

📌 注意：
西班牙语里拒绝时几乎总要用 «es que…» 说明理由。只说一个 «no» 可能显得太直接。

❌ 常见错误：
«Soy libre el sábado» ❌ → «Estoy libre el sábado» ✅：有空是一种状态，所以用 estar。«gratis» 的意思是“免费”：«¿Estás gratis?» ❌ → «¿Estás libre?» ✅。`,
      ejemplos: [
        { espanol: "¡Vale, de acuerdo!", chino: "好的，没问题！" },
        { espanol: "Lo siento, no puedo. Es que tengo clase.", chino: "抱歉，我去不了。因为我有课。" },
        { espanol: "El viernes estoy ocupada, pero el sábado estoy libre.", chino: "我星期五很忙，但星期六有空。" },
        { espanol: "¡Qué pena! ¿Y otro día?", chino: "真可惜！那改天呢？" },
      ],
    },
  ],
  vocabulario: [
    { id: "v1", espanol: "llamar (por teléfono)", chino: "打电话", ejemplo: "Te llamo esta noche." },
    { id: "v2", espanol: "contestar", chino: "接（电话）；回答", ejemplo: "Pablo no contesta el móvil." },
    { id: "v3", espanol: "el móvil", chino: "手机", ejemplo: "¿Tienes mi número de móvil?" },
    { id: "v4", espanol: "la llamada", chino: "电话；通话", ejemplo: "Tengo una llamada de mi madre." },
    { id: "v5", espanol: "¿Diga? / ¿Dígame?", chino: "喂？（西班牙接电话用语）", ejemplo: "¿Diga? — Hola, soy Ana." },
    { id: "v6", espanol: "¿De parte de quién?", chino: "请问您是哪位？", ejemplo: "—¿Está Marta? —¿De parte de quién?" },
    { id: "v7", espanol: "un momento", chino: "稍等；一会儿", ejemplo: "Un momento, por favor." },
    { id: "v8", espanol: "el recado", chino: "口信；留言", ejemplo: "¿Quieres dejar un recado?" },
    { id: "v9", espanol: "dejar", chino: "留下；让", ejemplo: "Quiero dejar un recado para Marta." },
    { id: "v10", espanol: "equivocarse", chino: "弄错；搞错", ejemplo: "Perdone, se ha equivocado de número." },
    { id: "v11", espanol: "ahora mismo", chino: "现在；此刻", ejemplo: "Ahora mismo está durmiendo." },
    { id: "v12", espanol: "quedar", chino: "约好见面", ejemplo: "¿Quedamos el sábado?" },
    { id: "v13", espanol: "apetecer", chino: "想要；有兴致（用法同 gustar）", ejemplo: "¿Te apetece ir al cine?" },
    { id: "v14", espanol: "el plan", chino: "计划；安排", ejemplo: "¿Tienes planes para el domingo?" },
    { id: "v15", espanol: "vale", chino: "好的；行（西班牙口语）", ejemplo: "¡Vale! Quedamos a las siete." },
    { id: "v16", espanol: "de acuerdo", chino: "同意；好的", ejemplo: "De acuerdo, hasta mañana." },
    { id: "v17", espanol: "genial", chino: "太棒了；极好的", ejemplo: "¡Genial! Me encanta la idea." },
    { id: "v18", espanol: "lo siento", chino: "对不起；抱歉", ejemplo: "Lo siento, no puedo." },
    { id: "v19", espanol: "es que…", chino: "因为……；是这样的……（说明理由）", ejemplo: "Es que tengo que trabajar." },
    { id: "v20", espanol: "otro día", chino: "改天；另一天", ejemplo: "¿Y otro día?" },
    { id: "v21", espanol: "ocupado", chino: "忙的；没空的", ejemplo: "El viernes estoy muy ocupado." },
    { id: "v22", espanol: "libre", chino: "有空的；空闲的", ejemplo: "El sábado estoy libre." },
  ],
  dialogos: [
    {
      id: "d1",
      titulo: "¿Está Marta?",
      tituloChino: "玛尔塔在吗？",
      personajes: ["Madre", "Li Wei"],
      lineas: [
        { personaje: "Madre", texto: "¿Diga?", traduccion: "喂？" },
        { personaje: "Li Wei", texto: "Hola, buenas tardes. ¿Está Marta, por favor?", traduccion: "您好，下午好。请问玛尔塔在吗？" },
        { personaje: "Madre", texto: "¿De parte de quién?", traduccion: "请问您是哪位？" },
        { personaje: "Li Wei", texto: "Soy Li Wei, un compañero de clase.", traduccion: "我是李伟，她的同学。" },
        { personaje: "Madre", texto: "Un momento… Ay, ahora mismo se está duchando.", traduccion: "稍等……哎呀，她现在正在洗澡。" },
        { personaje: "Li Wei", texto: "Ah, no pasa nada.", traduccion: "啊，没关系。" },
        { personaje: "Madre", texto: "¿Quieres dejarle un recado?", traduccion: "你要给她留个口信吗？" },
        { personaje: "Li Wei", texto: "Sí, por favor. Dígale que ha llamado Li Wei. Ella tiene mi número.", traduccion: "好的，麻烦您。请告诉她李伟来过电话。她有我的号码。" },
        { personaje: "Madre", texto: "Muy bien, yo se lo digo. ¡Adiós!", traduccion: "好的，我会转告她。再见！" },
      ],
    },
    {
      id: "d2",
      titulo: "¿Qué estás haciendo?",
      tituloChino: "你在干什么呢？",
      personajes: ["Pablo", "Zhang Min"],
      lineas: [
        { personaje: "Pablo", texto: "¿Sí?", traduccion: "喂？" },
        { personaje: "Zhang Min", texto: "Hola, Pablo, soy Zhang Min. ¿Qué estás haciendo?", traduccion: "你好，巴勃罗，我是张敏。你在干什么呢？" },
        { personaje: "Pablo", texto: "Estoy cocinando, y mi hermano está viendo la tele.", traduccion: "我在做饭，我弟弟在看电视。" },
        { personaje: "Zhang Min", texto: "¿Puedes hablar ahora mismo?", traduccion: "你现在方便说话吗？" },
        { personaje: "Pablo", texto: "Un momento… ¡Ya! Ahora sí.", traduccion: "稍等……好了！现在可以了。" },
        { personaje: "Zhang Min", texto: "Te llamo al móvil porque no contestas mis mensajes.", traduccion: "我打你手机是因为你不回我的消息。" },
        { personaje: "Pablo", texto: "¡Perdona! Estoy trabajando mucho esta semana.", traduccion: "抱歉！这周我工作很忙。" },
        { personaje: "Zhang Min", texto: "Tranquilo. Te llamo esta noche, entonces.", traduccion: "没事。那我今晚再给你打电话。" },
      ],
    },
    {
      id: "d3",
      titulo: "¿Quedamos el sábado?",
      tituloChino: "我们星期六见面吧？",
      personajes: ["Sofía", "Wang Lei"],
      lineas: [
        { personaje: "Sofía", texto: "Hola, Wang Lei. ¿Tienes planes para el sábado?", traduccion: "你好，王磊。你星期六有安排吗？" },
        { personaje: "Wang Lei", texto: "No, estoy libre. ¿Por qué?", traduccion: "没有，我有空。怎么了？" },
        { personaje: "Sofía", texto: "¿Te apetece ir al cine? Hay una película china nueva.", traduccion: "你想去看电影吗？有一部新的中国电影。" },
        { personaje: "Wang Lei", texto: "¡Genial! ¿A qué hora quedamos?", traduccion: "太好了！我们几点见？" },
        { personaje: "Sofía", texto: "La película es a las ocho. ¿Quedamos a las siete y media en la puerta del cine?", traduccion: "电影八点开始。我们七点半在电影院门口见，好吗？" },
        { personaje: "Wang Lei", texto: "Vale, de acuerdo. ¿Y después cenamos juntos?", traduccion: "好的，没问题。看完以后一起吃晚饭吧？" },
        { personaje: "Sofía", texto: "¡Perfecto! Hasta el sábado.", traduccion: "太好了！星期六见。" },
      ],
    },
    {
      id: "d4",
      titulo: "Lo siento, no puedo",
      tituloChino: "抱歉，我去不了",
      personajes: ["Diego", "Mei"],
      lineas: [
        { personaje: "Diego", texto: "Mei, ¿qué tal si vamos a la playa el domingo?", traduccion: "小美，我们星期天去海边怎么样？" },
        { personaje: "Mei", texto: "Lo siento, no puedo. Es que el lunes tengo un examen y el domingo tengo que estudiar.", traduccion: "抱歉，我去不了。因为星期一我有考试，星期天得复习。" },
        { personaje: "Diego", texto: "¡Qué pena! ¿Y el sábado?", traduccion: "真可惜！那星期六呢？" },
        { personaje: "Mei", texto: "El sábado por la mañana estoy ocupada, pero por la tarde estoy libre.", traduccion: "星期六上午我很忙，但是下午有空。" },
        { personaje: "Diego", texto: "¿Te apetece tomar un café en el centro?", traduccion: "你想去市中心喝杯咖啡吗？" },
        { personaje: "Mei", texto: "¡Vale! ¿Quedamos a las cinco en la plaza?", traduccion: "好！我们五点在广场见？" },
        { personaje: "Diego", texto: "De acuerdo. Y otro día vamos a la playa.", traduccion: "好的。改天我们再去海边。" },
        { personaje: "Mei", texto: "¡Genial! Hasta el sábado.", traduccion: "太好了！星期六见。" },
      ],
    },
  ],
  ejercicios: {
    completar: [
      { id: "c1", pregunta: "—¿Diga? —Hola, ¿_____ Marta, por favor?", preguntaChino: "——喂？——你好，请问玛尔塔在吗？", respuestaCorrecta: "está", explicacion: "Para preguntar si alguien está en casa: ¿Está…? · 问某人在不在，用 ¿Está…?", pista: "首字母是 e，4个字母", numeroLetras: 4 },
      { id: "c2", pregunta: "—¿De _____ de quién? —De Li Wei.", preguntaChino: "——请问您是哪位？——我是李伟。", respuestaCorrecta: "parte", explicacion: "Expresión fija: ¿De parte de quién? · 固定说法。", pista: "首字母是 p，5个字母", numeroLetras: 5 },
      { id: "c3", pregunta: "No puede ponerse: está _____ (comer).", preguntaChino: "他现在不能接电话：正在吃饭。", respuestaCorrecta: "comiendo", explicacion: "Verbo en -er → -iendo: comiendo. · -er 动词的副动词以 -iendo 结尾。", pista: "首字母是 c，8个字母", numeroLetras: 8 },
      { id: "c4", pregunta: "¿Te _____ ir al cine esta noche? (apetecer)", preguntaChino: "你今晚想去看电影吗？", respuestaCorrecta: "apetece", explicacion: "Apetecer funciona como gustar: te apetece + infinitivo. · apetecer 用法同 gustar。", pista: "首字母是 a，7个字母", numeroLetras: 7 },
      { id: "c5", pregunta: "¿_____ el sábado a las seis? (nosotros, quedar)", preguntaChino: "我们星期六六点见面吧？", respuestaCorrecta: "Quedamos", explicacion: "Quedar, forma de nosotros: quedamos. · quedar 的“我们”形式。", pista: "首字母是 Q，8个字母", numeroLetras: 8 },
      { id: "c6", pregunta: "Lo siento, no puedo. _____ que tengo que trabajar.", preguntaChino: "抱歉，我去不了。因为我得工作。", respuestaCorrecta: "Es", explicacion: "Para dar una excusa: es que… · 说明理由用 es que…", pista: "首字母是 E，2个字母", numeroLetras: 2 },
    ],
    seleccionar: [
      { id: "s1", pregunta: "Contestas el teléfono en España. Dices:", preguntaChino: "你在西班牙接电话，你说：", opciones: ["¿Diga?", "¿Quién eres?", "¿Qué quieres?", "¡Adiós!"], respuestaCorrecta: "¿Diga?", explicacion: "En España contestamos con «¿Diga?» o «¿Dígame?». · 西班牙人接电话说 ¿Diga?" },
      { id: "s2", pregunta: "El gerundio de «leer» es…", preguntaChino: "«leer» 的副动词是……", opciones: ["leiendo", "leyendo", "leendo", "lendo"], respuestaCorrecta: "leyendo", explicacion: "Leer → leyendo (la i se convierte en y). · i 变成 y。" },
      { id: "s3", pregunta: "Ahora mismo mis padres _____ durmiendo.", preguntaChino: "我父母现在正在睡觉。", opciones: ["está", "están", "estamos", "son"], respuestaCorrecta: "están", explicacion: "Mis padres = ellos → están. · “他们”用 están。" },
      { id: "s4", pregunta: "¿_____ quedamos? — En la puerta del cine.", preguntaChino: "我们在哪儿见？——在电影院门口。", opciones: ["Cuándo", "Dónde", "Qué", "Quién"], respuestaCorrecta: "Dónde", explicacion: "La respuesta es un lugar → ¿Dónde? · 回答是地点，用 dónde。" },
      { id: "s5", pregunta: "Para aceptar una propuesta dices:", preguntaChino: "接受建议时你说：", opciones: ["Es que no puedo.", "¡Vale, genial!", "Lo siento.", "Estoy ocupado."], respuestaCorrecta: "¡Vale, genial!", explicacion: "Vale y genial sirven para aceptar. · vale 和 genial 表示接受。" },
      { id: "s6", pregunta: "El sábado no trabajo, estoy _____.", preguntaChino: "我星期六不上班，有空。", opciones: ["libre", "gratis", "ocupado", "equivocado"], respuestaCorrecta: "libre", explicacion: "Tener tiempo = estar libre. «Gratis» = sin pagar. · 有空 = estar libre；gratis 是免费。" },
    ],
    verdaderoFalso: [
      { id: "vf1", pregunta: "«¿De parte de quién?» sirve para preguntar quién llama.", preguntaChino: "«¿De parte de quién?» 用来问是谁打来的电话。", respuestaCorrecta: true, explicacion: "Verdadero. Es la forma educada. · 对。这是礼貌的问法。" },
      { id: "vf2", pregunta: "El gerundio de «comer» es «comando».", preguntaChino: "«comer» 的副动词是 «comando»。", respuestaCorrecta: false, explicacion: "Falso. Es «comiendo» (-er → -iendo). · 错。是 comiendo。" },
      { id: "vf3", pregunta: "«Se ha equivocado» significa que la persona ha llamado a un número incorrecto.", preguntaChino: "«Se ha equivocado» 表示对方打错了电话。", respuestaCorrecta: true, explicacion: "Verdadero. Se ha equivocado de número. · 对。" },
      { id: "vf4", pregunta: "Decimos «Yo apetezco ir al cine».", preguntaChino: "我们说 «Yo apetezco ir al cine»。", respuestaCorrecta: false, explicacion: "Falso. Como gustar: Me apetece ir al cine. · 错。用法同 gustar。" },
      { id: "vf5", pregunta: "«Soy libre el sábado» es la forma correcta de decir que tienes tiempo.", preguntaChino: "说自己有空，正确的说法是 «Soy libre el sábado»。", respuestaCorrecta: false, explicacion: "Falso. Se dice «Estoy libre el sábado». · 错。应该用 estar。" },
      { id: "vf6", pregunta: "Para rechazar con educación es normal dar una excusa con «es que…».", preguntaChino: "礼貌地拒绝时，通常用 «es que…» 说明理由。", respuestaCorrecta: true, explicacion: "Verdadero. Lo siento, es que tengo clase. · 对。" },
    ],
    emparejar: [
      {
        id: "e1",
        pares: [
          { izquierda: "¿Diga?", derecha: "喂？（西班牙接电话）" },
          { izquierda: "¿De parte de quién?", derecha: "请问您是哪位？" },
          { izquierda: "Un momento", derecha: "请稍等" },
          { izquierda: "dejar un recado", derecha: "留口信" },
          { izquierda: "Se ha equivocado", derecha: "您打错了" },
          { izquierda: "¿Quedamos?", derecha: "我们见个面吧？" },
          { izquierda: "¿Te apetece…?", derecha: "你想不想……？" },
          { izquierda: "Estoy ocupado", derecha: "我很忙" },
        ],
        explicacion: "将电话和约见面用语与对应的中文意思配对。",
      },
    ],
    ordenar: [
      { id: "o1", palabras: ["¿Está", "por", "Marta,", "favor?"], respuestaCorrecta: "¿Está Marta, por favor?", explicacion: "¿Está + persona, por favor? · 请问玛尔塔在吗？" },
      { id: "o2", palabras: ["estoy", "Ahora", "mismo", "cocinando."], respuestaCorrecta: "Ahora mismo estoy cocinando.", explicacion: "Estar + gerundio. · 我现在正在做饭。" },
      { id: "o3", palabras: ["¿Quieres", "un", "dejar", "recado?"], respuestaCorrecta: "¿Quieres dejar un recado?", explicacion: "Querer + infinitivo. · 你要留个口信吗？" },
      { id: "o4", palabras: ["siete", "Quedamos", "a", "las", "en", "la", "plaza."], respuestaCorrecta: "Quedamos a las siete en la plaza.", explicacion: "Quedamos + hora + lugar. · 我们七点在广场见。" },
      { id: "o5", palabras: ["no", "Lo", "puedo.", "siento,"], respuestaCorrecta: "Lo siento, no puedo.", explicacion: "Rechazar con educación. · 抱歉，我去不了。" },
    ],
    traducir: [
      { id: "t1", fraseChino: "请稍等。", respuestaEsperada: "Un momento, por favor.", explicacion: "Para pedir esperar al teléfono. · 电话里请对方稍等。" },
      { id: "t2", fraseChino: "我正在学习西班牙语。", respuestaEsperada: "Estoy estudiando español.", explicacion: "Estar + gerundio (estudiar → estudiando). · estar + 副动词。" },
      { id: "t3", fraseChino: "她现在正在睡觉。", respuestaEsperada: "Ahora está durmiendo.", explicacion: "Dormir → durmiendo (irregular). · dormir 的副动词不规则。" },
      { id: "t4", fraseChino: "我们星期六见面吧？", respuestaEsperada: "¿Quedamos el sábado?", explicacion: "Proponer con «¿Quedamos…?». · 用 ¿Quedamos…? 提议见面。" },
      { id: "t5", fraseChino: "你想去看电影吗？", respuestaEsperada: "¿Te apetece ir al cine?", explicacion: "¿Te apetece + infinitivo? · 用 apetecer 提出邀请。" },
      { id: "t6", fraseChino: "抱歉，我去不了。", respuestaEsperada: "Lo siento, no puedo.", explicacion: "Rechazo educado. · 礼貌的拒绝。" },
    ],
  },
  ejerciciosPracticos: [
    {
      id: "ep1",
      tipo: "completarDialogo",
      titulo: "Completa la llamada",
      tituloChino: "完成电话对话",
      instruccion: "Completa la llamada con las palabras de la unidad.",
      instruccionChino: "用本单元学过的词完成电话对话。",
      dialogo: [
        { personaje: "A", texto: "¿_____? (contestar en España)", respuesta: "Diga" },
        { personaje: "B", texto: "Hola, ¿está Pedro, por favor?", respuesta: "" },
        { personaje: "A", texto: "¿De _____ de quién?", respuesta: "parte" },
        { personaje: "B", texto: "Soy Lucía, una amiga.", respuesta: "" },
        { personaje: "A", texto: "Un momento… Lo siento, está _____ (dormir).", respuesta: "durmiendo" },
        { personaje: "B", texto: "Vale. ¿Puedo dejar un _____?", respuesta: "recado" },
      ],
    },
    {
      id: "ep2",
      tipo: "responder",
      titulo: "Acepta o rechaza",
      tituloChino: "接受或拒绝",
      instruccion: "Responde a cada propuesta. Acepta o rechaza con una excusa.",
      instruccionChino: "回应每个提议：接受，或者说明理由后拒绝。",
      preguntas: [
        { pregunta: "¿Quedamos mañana a las seis?", respuestaEsperada: "¡Vale! ¿Dónde quedamos?" },
        { pregunta: "¿Te apetece ir a la playa el domingo?", respuestaEsperada: "Lo siento, no puedo. Es que tengo que estudiar." },
        { pregunta: "¿Qué estás haciendo ahora mismo?", respuestaEsperada: "Estoy estudiando español." },
        { pregunta: "¿Estás libre el viernes por la tarde?", respuestaEsperada: "Sí, estoy libre. / No, estoy ocupado." },
      ],
    },
  ],
  preguntasAbiertas: [
    { id: "pa1", pregunta: "Escribe lo que dices cuando llamas a casa de un amigo y contesta su madre.", preguntaChino: "写下你打电话到朋友家、他妈妈接电话时你会说的话。", sugerencia: "Hola, buenas tardes. Soy Li Wei, un compañero de clase. ¿Está Marta, por favor?", sugerenciaChino: "您好，下午好。我是李伟，她的同学。请问玛尔塔在吗？" },
    { id: "pa2", pregunta: "¿Qué están haciendo ahora las personas de tu familia?", preguntaChino: "你的家人现在正在做什么？", sugerencia: "Mi padre está trabajando, mi madre está cocinando y mi hermano está jugando.", sugerenciaChino: "我爸爸正在工作，我妈妈正在做饭，我弟弟正在玩。" },
    { id: "pa3", pregunta: "Invita a un compañero a hacer algo el fin de semana: propón el plan, la hora y el lugar.", preguntaChino: "邀请一位同学周末做点什么：说出计划、时间和地点。", sugerencia: "¿Te apetece ir al museo el sábado? Quedamos a las once en la estación de metro.", sugerenciaChino: "你星期六想去博物馆吗？我们十一点在地铁站见。" },
    { id: "pa4", pregunta: "Rechaza una invitación con educación y propón otro día.", preguntaChino: "礼貌地拒绝一个邀请，并提议改天。", sugerencia: "Lo siento, el sábado no puedo. Es que tengo que trabajar. ¿Qué tal el domingo?", sugerenciaChino: "抱歉，我星期六去不了，因为我得工作。星期天怎么样？" },
  ],
  preguntas: [
    { id: "p1", pregunta: "¿Cómo contestan el teléfono en México?", preguntaChino: "墨西哥人怎么接电话？", respuestaSugerida: "¿Bueno?", respuestaSugeridaChino: "¿Bueno?（墨西哥的“喂？”）" },
    { id: "p2", pregunta: "¿Cuál es el gerundio de «dormir»?", preguntaChino: "«dormir» 的副动词是什么？", respuestaSugerida: "durmiendo", respuestaSugeridaChino: "durmiendo（不规则：o 变 u）" },
    { id: "p3", pregunta: "Completa: ¿A qué hora ___? (nosotros, quedar)", preguntaChino: "填空：¿A qué hora ___?（我们几点见？）", respuestaSugerida: "quedamos", respuestaSugeridaChino: "quedamos（quedar 的“我们”形式）" },
    { id: "p4", pregunta: "¿Con qué expresión empezamos una excusa?", preguntaChino: "我们用什么表达开始说明理由？", respuestaSugerida: "Es que…", respuestaSugeridaChino: "Es que…（因为……）" },
  ],
};

const M85 = {
  id: "modulo-85",
  numero: 85,
  numeroTexto: "ochenta y cinco",
  titulo: "Me Duele la Cabeza - Salud y Consejos Básicos",
  tituloChino: "我头疼 - 健康与基本建议",
  descripcion: "Aprende a decir qué te duele con el verbo doler, a explicar tus síntomas (tengo fiebre, estoy resfriado) y a dar consejos con tener que, deber, hay que y el imperativo afirmativo de tú.",
  descripcionChino: "学习用动词 doler 说出哪里疼，描述症状（tengo fiebre、estoy resfriado），并用 tener que、deber、hay que 和 tú 的肯定命令式给别人提建议。",
  icono: "🤒",
  color: "#16a34a",
  nivel: "A2",
  teoria: [
    {
      id: "t1",
      titulo: "Me duele, me duelen",
      tituloChino: "Me duele, me duelen（我……疼）",
      descripcion: `«Doler» funciona como «gustar»: lo que duele es el sujeto.

• Me duele + singular: Me duele la cabeza. Me duele el estómago.
• Me duelen + plural: Me duelen los ojos. Me duelen los pies.

| (a mí) me duele | (a nosotros) nos duele |
| (a ti) te duele | (a vosotros) os duele |
| (a él / ella / usted) le duele | (a ellos / ustedes) les duele |

• ¿Te duele la garganta? — Sí, me duele mucho.
• A mi padre le duele la espalda.

📌 NOTA:
Con las partes del cuerpo usamos el artículo (el, la, los, las), no el posesivo: «Me duele la cabeza» ✅, no «Me duele mi cabeza» ❌.

❌ ERROR COMÚN:
«Yo duelo la cabeza» ❌ (traducción literal del chino). Lo correcto es «Me duele la cabeza» ✅. Y en plural: «Me duele los ojos» ❌ → «Me duelen los ojos» ✅.`,
      descripcionChino: `«doler» 的用法和 «gustar» 一样：疼的部位是主语。

• Me duele + 单数：Me duele la cabeza.（我头疼。）Me duele el estómago.（我胃疼。）
• Me duelen + 复数：Me duelen los ojos.（我眼睛疼。）Me duelen los pies.（我脚疼。）

| （我）me duele | （我们）nos duele |
| （你）te duele | （你们）os duele |
| （他 / 她 / 您）le duele | （他们 / 诸位）les duele |

• ¿Te duele la garganta?（你嗓子疼吗？）— Sí, me duele mucho.（疼，很疼。）
• A mi padre le duele la espalda.（我爸爸背疼。）

📌 注意：
说身体部位时用冠词（el, la, los, las），不用物主形容词：«Me duele la cabeza» ✅，不说 «Me duele mi cabeza» ❌。

❌ 常见错误：
«Yo duelo la cabeza» ❌（直译“我头疼”）。正确的说法是 «Me duele la cabeza» ✅。复数要用 duelen：«Me duele los ojos» ❌ → «Me duelen los ojos» ✅。`,
      ejemplos: [
        { espanol: "Me duele la cabeza.", chino: "我头疼。" },
        { espanol: "Me duelen los pies.", chino: "我脚疼。" },
        { espanol: "¿Te duele la garganta?", chino: "你嗓子疼吗？" },
        { espanol: "A mi abuela le duele la espalda.", chino: "我奶奶背疼。" },
      ],
    },
    {
      id: "t2",
      titulo: "¿Qué te pasa? Hablar de los síntomas",
      tituloChino: "你怎么了？描述症状",
      descripcion: `Para preguntar:
• ¿Qué te pasa? (tú) / ¿Qué le pasa? (usted)
• ¿Cómo estás? / ¿Cómo te encuentras?

Para responder:
• Me encuentro mal. / No me encuentro bien.
• Me duele + parte del cuerpo: Me duele la garganta.
• Tengo + nombre: Tengo fiebre. Tengo tos. Tengo dolor de cabeza.
• Estoy + adjetivo: Estoy resfriado / resfriada. Estoy cansado / cansada.

📌 NOTA:
«Tengo dolor de cabeza» = «Me duele la cabeza». Las dos formas son correctas.

❌ ERROR COMÚN:
«Estoy fiebre» o «Soy resfriado» ❌. Recuerda: tener + nombre (fiebre, tos, dolor) y estar + adjetivo (resfriado, cansado) ✅.`,
      descripcionChino: `提问：
• ¿Qué te pasa?（你怎么了？）/ ¿Qué le pasa?（您怎么了？）
• ¿Cómo estás? / ¿Cómo te encuentras?（你感觉怎么样？）

回答：
• Me encuentro mal.（我不舒服。）/ No me encuentro bien.（我感觉不太好。）
• Me duele + 身体部位：Me duele la garganta.（我嗓子疼。）
• Tengo + 名词：Tengo fiebre.（我发烧。）Tengo tos.（我咳嗽。）Tengo dolor de cabeza.（我头疼。）
• Estoy + 形容词：Estoy resfriado / resfriada.（我感冒了。）Estoy cansado / cansada.（我很累。）

📌 注意：
«Tengo dolor de cabeza» = «Me duele la cabeza»，两种说法都对。

❌ 常见错误：
«Estoy fiebre» 或 «Soy resfriado» ❌。记住：tener + 名词（fiebre, tos, dolor），estar + 形容词（resfriado, cansado）✅。`,
      ejemplos: [
        { espanol: "¿Qué te pasa? — Me encuentro mal.", chino: "你怎么了？——我不舒服。" },
        { espanol: "Tengo fiebre y tos.", chino: "我发烧，还咳嗽。" },
        { espanol: "Estoy resfriada.", chino: "我感冒了。（女性）" },
        { espanol: "Tengo un dolor fuerte en el estómago.", chino: "我胃疼得很厉害。" },
      ],
    },
    {
      id: "t3",
      titulo: "Dar consejos: tener que, deber, hay que",
      tituloChino: "提建议：tener que、deber、hay que",
      descripcion: `Para dar consejos u obligaciones usamos un verbo + infinitivo:

• tener que + infinitivo (obligación o consejo fuerte): Tienes que ir al médico.
• deber + infinitivo (consejo): Debes descansar. No debes beber café.
• hay que + infinitivo (regla general, para todos): Hay que beber mucha agua.

| tener que | deber |
| tengo que | debo |
| tienes que | debes |
| tiene que | debe |
| tenemos que | debemos |
| tenéis que | debéis |
| tienen que | deben |

📌 NOTA:
«Hay que» no cambia nunca y no tiene sujeto: Hay que dormir ocho horas.

❌ ERROR COMÚN:
«Tienes ir al médico» ❌: falta «que» → «Tienes que ir al médico» ✅. Para dar un consejo, «deber» va sin «de»: «Debes descansar» ✅.`,
      descripcionChino: `表示建议或必须做的事，用“动词 + 原形动词”：

• tener que + 原形（必须；强烈建议）：Tienes que ir al médico.（你得去看医生。）
• deber + 原形（应该；建议）：Debes descansar.（你应该休息。）No debes beber café.（你不应该喝咖啡。）
• hay que + 原形（一般规则，对所有人）：Hay que beber mucha agua.（要多喝水。）

| tener que | deber |
| tengo que | debo |
| tienes que | debes |
| tiene que | debe |
| tenemos que | debemos |
| tenéis que | debéis |
| tienen que | deben |

📌 注意：
«hay que» 永远不变，也没有主语：Hay que dormir ocho horas.（要睡八个小时。）

❌ 常见错误：
«Tienes ir al médico» ❌：少了 «que» → «Tienes que ir al médico» ✅。提建议时 «deber» 后面不加 «de»：«Debes descansar» ✅。`,
      ejemplos: [
        { espanol: "Tienes que ir al médico.", chino: "你得去看医生。" },
        { espanol: "Debes descansar un poco.", chino: "你应该休息一下。" },
        { espanol: "Hay que beber mucha agua.", chino: "要多喝水。" },
        { espanol: "No debes tomar café por la noche.", chino: "你晚上不应该喝咖啡。" },
      ],
    },
    {
      id: "t4",
      titulo: "El imperativo de tú para dar consejos",
      tituloChino: "用 tú 的命令式提建议",
      descripcion: `Para dar un consejo directo a un amigo usamos el imperativo afirmativo de «tú»:

• Verbos en -ar → -a: descansar → descansa, tomar → toma
• Verbos en -er / -ir → -e: beber → bebe, comer → come, abrir → abre
• Irregulares útiles: dormir → duerme, ir → ve, hacer → haz, tener → ten

Ejemplos:
• Toma una pastilla y descansa.
• Bebe té caliente con miel.
• Ve al médico mañana.

Con usted (el médico, el farmacéutico) oirás: tome, beba, descanse. Lo estudiarás más en la unidad 44.

📌 NOTA:
La forma regular de «tú» es igual que la 3.ª persona del presente: él toma → ¡toma!, él bebe → ¡bebe!

❌ ERROR COMÚN:
«Tú descansar» ❌ (traducción literal del chino). En español el verbo cambia: «Descansa» ✅. Y para despedirte de una persona enferma, di: «¡Que te mejores!» ✅.`,
      descripcionChino: `直接给朋友提建议时，用 «tú» 的肯定命令式：

• -ar 动词 → -a：descansar → descansa（休息），tomar → toma（吃/喝）
• -er / -ir 动词 → -e：beber → bebe（喝），comer → come（吃），abrir → abre（打开）
• 常用不规则：dormir → duerme（睡），ir → ve（去），hacer → haz（做），tener → ten（拿着）

例句：
• Toma una pastilla y descansa.（吃一片药，休息一下。）
• Bebe té caliente con miel.（喝点加蜂蜜的热茶。）
• Ve al médico mañana.（明天去看医生。）

医生、药剂师对你说话用 usted，你会听到：tome, beba, descanse。第44单元会详细学习。

📌 注意：
tú 的规则命令式和现在时第三人称单数一样：él toma → ¡toma!，él bebe → ¡bebe!

❌ 常见错误：
«Tú descansar» ❌（像中文“你休息吧”）。西班牙语的动词要变化：«Descansa» ✅。和生病的人告别时说：«¡Que te mejores!»（祝你早日康复！）✅。`,
      ejemplos: [
        { espanol: "Toma una pastilla y descansa.", chino: "吃一片药，休息一下。" },
        { espanol: "Bebe té caliente con miel.", chino: "喝点加蜂蜜的热茶。" },
        { espanol: "Duerme ocho horas.", chino: "睡八个小时。" },
        { espanol: "Ve al médico mañana. ¡Que te mejores!", chino: "明天去看医生。祝你早日康复！" },
      ],
    },
  ],
  vocabulario: [
    { id: "v1", espanol: "doler", chino: "疼（用法同 gustar）", ejemplo: "Me duele la cabeza." },
    { id: "v2", espanol: "la cabeza", chino: "头", ejemplo: "Me duele mucho la cabeza." },
    { id: "v3", espanol: "la garganta", chino: "喉咙；嗓子", ejemplo: "¿Te duele la garganta?" },
    { id: "v4", espanol: "el estómago", chino: "胃；肚子", ejemplo: "Me duele el estómago." },
    { id: "v5", espanol: "la espalda", chino: "背", ejemplo: "A mi padre le duele la espalda." },
    { id: "v6", espanol: "el dolor", chino: "疼痛", ejemplo: "Tengo dolor de cabeza." },
    { id: "v7", espanol: "la fiebre", chino: "发烧", ejemplo: "Tengo fiebre." },
    { id: "v8", espanol: "la tos", chino: "咳嗽", ejemplo: "Tengo tos desde ayer." },
    { id: "v9", espanol: "resfriado", chino: "感冒的", ejemplo: "Estoy resfriado." },
    { id: "v10", espanol: "¿Qué te pasa?", chino: "你怎么了？", ejemplo: "¿Qué te pasa? Tienes mala cara." },
    { id: "v11", espanol: "encontrarse mal", chino: "感觉不舒服", ejemplo: "Me encuentro mal desde ayer." },
    { id: "v12", espanol: "tener que", chino: "必须；得", ejemplo: "Tienes que descansar." },
    { id: "v13", espanol: "deber", chino: "应该", ejemplo: "Debes dormir más." },
    { id: "v14", espanol: "hay que", chino: "要；必须（无人称）", ejemplo: "Hay que beber mucha agua." },
    { id: "v15", espanol: "descansar", chino: "休息", ejemplo: "Descansa un poco." },
    { id: "v16", espanol: "beber", chino: "喝", ejemplo: "Bebe agua caliente." },
    { id: "v17", espanol: "tomar", chino: "吃（药）；喝", ejemplo: "Toma una pastilla." },
    { id: "v18", espanol: "la pastilla", chino: "药片", ejemplo: "Tome una pastilla cada ocho horas." },
    { id: "v19", espanol: "el jarabe", chino: "糖浆（止咳药水）", ejemplo: "Este jarabe es para la tos." },
    { id: "v20", espanol: "el médico", chino: "医生", ejemplo: "Tienes que ir al médico." },
    { id: "v21", espanol: "la miel", chino: "蜂蜜", ejemplo: "Bebe té con miel." },
    { id: "v22", espanol: "¡Que te mejores!", chino: "祝你早日康复！", ejemplo: "Descansa mucho. ¡Que te mejores!" },
  ],
  dialogos: [
    {
      id: "d1",
      titulo: "¿Qué te pasa, Li Wei?",
      tituloChino: "李伟，你怎么了？",
      personajes: ["Ana", "Li Wei"],
      lineas: [
        { personaje: "Ana", texto: "Li Wei, ¿qué te pasa? Tienes mala cara.", traduccion: "李伟，你怎么了？你脸色不好。" },
        { personaje: "Li Wei", texto: "Me encuentro mal. Me duele mucho la cabeza.", traduccion: "我不舒服。我头很疼。" },
        { personaje: "Ana", texto: "¿Tienes fiebre?", traduccion: "你发烧吗？" },
        { personaje: "Li Wei", texto: "Creo que sí, un poco. Y tengo tos.", traduccion: "我觉得有一点。我还咳嗽。" },
        { personaje: "Ana", texto: "¿Te duele la garganta?", traduccion: "你嗓子疼吗？" },
        { personaje: "Li Wei", texto: "Sí, me duele la garganta y también la espalda.", traduccion: "疼，嗓子疼，背也疼。" },
        { personaje: "Ana", texto: "Creo que estás resfriado.", traduccion: "我觉得你感冒了。" },
      ],
    },
    {
      id: "d2",
      titulo: "En la consulta",
      tituloChino: "在诊室里",
      personajes: ["Doctora", "Wang Lei"],
      lineas: [
        { personaje: "Doctora", texto: "Buenos días. Siéntese. ¿Qué le pasa?", traduccion: "早上好，请坐。您哪里不舒服？" },
        { personaje: "Wang Lei", texto: "Buenos días, doctora. Me encuentro mal desde ayer.", traduccion: "早上好，医生。我从昨天开始就不舒服。" },
        { personaje: "Doctora", texto: "¿Dónde le duele?", traduccion: "您哪里疼？" },
        { personaje: "Wang Lei", texto: "Me duele el estómago. Tengo un dolor muy fuerte aquí.", traduccion: "我胃疼。这里疼得很厉害。" },
        { personaje: "Doctora", texto: "¿Tiene fiebre?", traduccion: "您发烧吗？" },
        { personaje: "Wang Lei", texto: "No, fiebre no tengo. Pero ayer comí mucha comida picante…", traduccion: "没有，不发烧。但是我昨天吃了很多辣的东西……" },
        { personaje: "Doctora", texto: "Ya veo. No es grave.", traduccion: "我明白了。不严重。" },
      ],
    },
    {
      id: "d3",
      titulo: "Consejos de una amiga",
      tituloChino: "朋友的建议",
      personajes: ["Pablo", "Chen Jing"],
      lineas: [
        { personaje: "Pablo", texto: "Chen Jing, estoy resfriado y mañana tengo un examen.", traduccion: "陈静，我感冒了，明天还有考试。" },
        { personaje: "Chen Jing", texto: "¡Ay, Pablo! Tienes que descansar esta tarde.", traduccion: "哎呀，巴勃罗！你今天下午得好好休息。" },
        { personaje: "Pablo", texto: "Pero tengo que estudiar…", traduccion: "可是我得复习……" },
        { personaje: "Chen Jing", texto: "Primero la salud. Bebe mucha agua caliente.", traduccion: "健康第一。多喝热水。" },
        { personaje: "Pablo", texto: "¿Agua caliente? En España tomamos té con miel.", traduccion: "热水？在西班牙我们喝蜂蜜茶。" },
        { personaje: "Chen Jing", texto: "Bueno, pues toma té con miel. Y debes dormir ocho horas.", traduccion: "好吧，那就喝蜂蜜茶。而且你应该睡八个小时。" },
        { personaje: "Pablo", texto: "¿Y una pastilla?", traduccion: "那要不要吃药片？" },
        { personaje: "Chen Jing", texto: "Hay que preguntar en la farmacia. ¡Que te mejores!", traduccion: "得去药店问问。祝你早日康复！" },
      ],
    },
    {
      id: "d4",
      titulo: "En la farmacia",
      tituloChino: "在药店",
      personajes: ["María", "Farmacéutico"],
      lineas: [
        { personaje: "María", texto: "Buenas tardes. Tengo tos y me duele la garganta. ¿Qué puedo tomar?", traduccion: "下午好。我咳嗽，嗓子疼。我可以吃什么药？" },
        { personaje: "Farmacéutico", texto: "Puede tomar este jarabe tres veces al día.", traduccion: "您可以喝这种糖浆，一天三次。" },
        { personaje: "María", texto: "¿Y para el dolor de cabeza?", traduccion: "那头疼呢？" },
        { personaje: "Farmacéutico", texto: "Tome una pastilla cada ocho horas, después de comer.", traduccion: "每八小时吃一片，饭后服用。" },
        { personaje: "María", texto: "¿Tengo que ir al médico?", traduccion: "我需要去看医生吗？" },
        { personaje: "Farmacéutico", texto: "Si tiene fiebre más de tres días, sí, debe ir al médico.", traduccion: "如果发烧超过三天，那就应该去看医生。" },
        { personaje: "María", texto: "Muchas gracias.", traduccion: "非常感谢。" },
        { personaje: "Farmacéutico", texto: "De nada. ¡Que se mejore!", traduccion: "不客气。祝您早日康复！" },
      ],
    },
  ],
  ejercicios: {
    completar: [
      { id: "c1", pregunta: "Me _____ la cabeza.", preguntaChino: "我头疼。", respuestaCorrecta: "duele", explicacion: "«La cabeza» es singular → duele. · 单数部位用 duele。", pista: "首字母是 d，5个字母", numeroLetras: 5 },
      { id: "c2", pregunta: "Me _____ los ojos.", preguntaChino: "我眼睛疼。", respuestaCorrecta: "duelen", explicacion: "«Los ojos» es plural → duelen. · 复数部位用 duelen。", pista: "首字母是 d，6个字母", numeroLetras: 6 },
      { id: "c3", pregunta: "Tengo _____ y tos: 38,5 grados.", preguntaChino: "我发烧还咳嗽：38.5度。", respuestaCorrecta: "fiebre", explicacion: "38,5 grados = fiebre. Usamos tener: tengo fiebre. · 发烧用 tener fiebre。", pista: "首字母是 f，6个字母", numeroLetras: 6 },
      { id: "c4", pregunta: "Estás muy cansado: tienes _____ descansar.", preguntaChino: "你很累：你得休息。", respuestaCorrecta: "que", explicacion: "Tener que + infinitivo. · tener 后面要加 que。", pista: "首字母是 q，3个字母", numeroLetras: 3 },
      { id: "c5", pregunta: "Para el resfriado, _____ mucha agua. (tú, beber)", preguntaChino: "感冒了，要多喝水。（对朋友说）", respuestaCorrecta: "bebe", explicacion: "Imperativo de tú: beber → bebe. · beber 的 tú 命令式是 bebe。", pista: "首字母是 b，4个字母", numeroLetras: 4 },
      { id: "c6", pregunta: "Para la tos, toma este _____ dos veces al día.", preguntaChino: "治咳嗽，这种糖浆一天喝两次。", respuestaCorrecta: "jarabe", explicacion: "El jarabe es una medicina líquida para la tos. · jarabe 是止咳糖浆。", pista: "首字母是 j，6个字母", numeroLetras: 6 },
    ],
    seleccionar: [
      { id: "s1", pregunta: "A mi madre le _____ la espalda.", preguntaChino: "我妈妈背疼。", opciones: ["duele", "duelen", "duelo", "dolor"], respuestaCorrecta: "duele", explicacion: "«La espalda» es singular → duele. · 单数用 duele。" },
      { id: "s2", pregunta: "¿Qué te _____? — Me encuentro mal.", preguntaChino: "你怎么了？——我不舒服。", opciones: ["pasa", "pasas", "pasan", "tienes"], respuestaCorrecta: "pasa", explicacion: "Expresión fija: ¿Qué te pasa? · 固定说法。" },
      { id: "s3", pregunta: "Estoy _____: tengo tos y me duele la garganta.", preguntaChino: "我感冒了：咳嗽，嗓子疼。", opciones: ["resfriado", "fiebre", "dolor", "tos"], respuestaCorrecta: "resfriado", explicacion: "Estar + adjetivo: estoy resfriado. · estar 后面接形容词。" },
      { id: "s4", pregunta: "Si tienes fiebre muchos días, _____ ir al médico.", preguntaChino: "如果你发烧很多天，应该去看医生。", opciones: ["debes", "deber", "tienes", "hay"], respuestaCorrecta: "debes", explicacion: "Deber (tú) + infinitivo: debes ir. «Tienes» necesita «que». · tener 后面缺 que。" },
      { id: "s5", pregunta: "Imperativo de «descansar» (tú):", preguntaChino: "«descansar» 的 tú 命令式：", opciones: ["descansa", "descansas", "descansar", "descansamos"], respuestaCorrecta: "descansa", explicacion: "-ar → -a: descansa. · -ar 动词变 -a。" },
      { id: "s6", pregunta: "Imperativo de «ir» (tú): ¡_____ al médico!", preguntaChino: "«ir» 的 tú 命令式：去看医生！", opciones: ["Va", "Ve", "Ir", "Vas"], respuestaCorrecta: "Ve", explicacion: "Ir → ve (irregular). · ir 的命令式不规则：ve。" },
    ],
    verdaderoFalso: [
      { id: "vf1", pregunta: "«Doler» funciona como «gustar».", preguntaChino: "«doler» 的用法和 «gustar» 一样。", respuestaCorrecta: true, explicacion: "Verdadero. Me duele la cabeza, me duelen los pies. · 对。" },
      { id: "vf2", pregunta: "Decimos «Me duele mi cabeza».", preguntaChino: "我们说 «Me duele mi cabeza»。", respuestaCorrecta: false, explicacion: "Falso. Con partes del cuerpo usamos el artículo: Me duele la cabeza. · 错。身体部位用冠词。" },
      { id: "vf3", pregunta: "«Tengo fiebre» y «Estoy fiebre» son correctas.", preguntaChino: "«Tengo fiebre» 和 «Estoy fiebre» 都对。", respuestaCorrecta: false, explicacion: "Falso. Solo «Tengo fiebre»: tener + nombre. · 错。只能说 Tengo fiebre。" },
      { id: "vf4", pregunta: "«Hay que» no cambia: Hay que descansar.", preguntaChino: "«hay que» 不变：Hay que descansar。", respuestaCorrecta: true, explicacion: "Verdadero. Es impersonal, sin sujeto. · 对。无人称，没有主语。" },
      { id: "vf5", pregunta: "El imperativo de «beber» para tú es «bebe».", preguntaChino: "«beber» 的 tú 命令式是 «bebe»。", respuestaCorrecta: true, explicacion: "Verdadero. -er → -e: bebe. · 对。" },
      { id: "vf6", pregunta: "«Tienes ir al médico» es correcto.", preguntaChino: "«Tienes ir al médico» 是正确的。", respuestaCorrecta: false, explicacion: "Falso. Falta «que»: Tienes que ir al médico. · 错。缺少 que。" },
    ],
    emparejar: [
      {
        id: "e1",
        pares: [
          { izquierda: "la cabeza", derecha: "头" },
          { izquierda: "la garganta", derecha: "喉咙；嗓子" },
          { izquierda: "el estómago", derecha: "胃" },
          { izquierda: "la espalda", derecha: "背" },
          { izquierda: "la fiebre", derecha: "发烧" },
          { izquierda: "la tos", derecha: "咳嗽" },
          { izquierda: "el jarabe", derecha: "糖浆（止咳药水）" },
          { izquierda: "la pastilla", derecha: "药片" },
        ],
        explicacion: "将身体部位、症状和药品与对应的中文意思配对。",
      },
    ],
    ordenar: [
      { id: "o1", palabras: ["duele", "Me", "garganta.", "la"], respuestaCorrecta: "Me duele la garganta.", explicacion: "Me + duele + la + parte del cuerpo. · 我嗓子疼。" },
      { id: "o2", palabras: ["dolor", "Tengo", "de", "estómago."], respuestaCorrecta: "Tengo dolor de estómago.", explicacion: "Tener + dolor de + parte del cuerpo. · 我胃疼。" },
      { id: "o3", palabras: ["que", "Tienes", "al", "ir", "médico."], respuestaCorrecta: "Tienes que ir al médico.", explicacion: "Tener que + infinitivo. · 你得去看医生。" },
      { id: "o4", palabras: ["Bebe", "con", "té", "miel."], respuestaCorrecta: "Bebe té con miel.", explicacion: "Imperativo + complemento. · 喝蜂蜜茶。" },
      { id: "o5", palabras: ["Debes", "horas.", "ocho", "dormir"], respuestaCorrecta: "Debes dormir ocho horas.", explicacion: "Deber + infinitivo. · 你应该睡八个小时。" },
    ],
    traducir: [
      { id: "t1", fraseChino: "我头疼。", respuestaEsperada: "Me duele la cabeza.", explicacion: "Doler como gustar; artículo «la». · doler 用法同 gustar，部位前加冠词。" },
      { id: "t2", fraseChino: "你怎么了？", respuestaEsperada: "¿Qué te pasa?", explicacion: "Pregunta fija para un amigo. · 问朋友的固定说法。" },
      { id: "t3", fraseChino: "我感冒了。（男生说）", respuestaEsperada: "Estoy resfriado.", explicacion: "Estar + adjetivo (masculino). · estar + 形容词（阳性）。" },
      { id: "t4", fraseChino: "你得休息。", respuestaEsperada: "Tienes que descansar.", explicacion: "Tener que + infinitivo. · tener que + 原形。" },
      { id: "t5", fraseChino: "吃一片药吧。（对朋友说）", respuestaEsperada: "Toma una pastilla.", explicacion: "Imperativo de tú: tomar → toma. · tú 命令式。" },
      { id: "t6", fraseChino: "祝你早日康复！", respuestaEsperada: "¡Que te mejores!", explicacion: "Fórmula para despedirse de un enfermo. · 和病人告别的固定说法。" },
    ],
  },
  ejerciciosPracticos: [
    {
      id: "ep1",
      tipo: "completarDialogo",
      titulo: "Completa el diálogo",
      tituloChino: "完成对话",
      instruccion: "Completa el diálogo después de un día en la Gran Muralla.",
      instruccionChino: "完成这段爬完长城之后的对话。",
      dialogo: [
        { personaje: "A", texto: "¿Qué te _____?", respuesta: "pasa" },
        { personaje: "B", texto: "Me _____ mucho los pies.", respuesta: "duelen" },
        { personaje: "A", texto: "¿Y tienes _____?", respuesta: "fiebre" },
        { personaje: "B", texto: "No, pero me _____ muy cansado.", respuesta: "encuentro" },
        { personaje: "A", texto: "Normal. Hoy hemos caminado quince kilómetros por la Gran Muralla.", respuesta: "" },
        { personaje: "B", texto: "Sí. Esta noche _____ que dormir mucho.", respuesta: "tengo" },
      ],
    },
    {
      id: "ep2",
      tipo: "responder",
      titulo: "Da un consejo",
      tituloChino: "提个建议",
      instruccion: "Da un consejo a tu amigo con tener que, deber o el imperativo.",
      instruccionChino: "用 tener que、deber 或命令式给朋友提建议。",
      preguntas: [
        { pregunta: "Me duele la cabeza.", respuestaEsperada: "Toma una pastilla y descansa." },
        { pregunta: "Tengo tos.", respuestaEsperada: "Bebe té con miel. / Tienes que tomar un jarabe." },
        { pregunta: "Estoy muy cansado.", respuestaEsperada: "Debes dormir más." },
        { pregunta: "Tengo fiebre desde hace tres días.", respuestaEsperada: "Tienes que ir al médico." },
      ],
    },
  ],
  preguntasAbiertas: [
    { id: "pa1", pregunta: "¿Qué haces cuando estás resfriado o resfriada?", preguntaChino: "你感冒的时候会做什么？", sugerencia: "Cuando estoy resfriado, bebo mucha agua caliente, descanso y duermo mucho.", sugerenciaChino: "我感冒的时候，会多喝热水、休息、多睡觉。" },
    { id: "pa2", pregunta: "¿Qué te duele cuando estudias muchas horas?", preguntaChino: "你学习很长时间以后，哪里会疼？", sugerencia: "Cuando estudio muchas horas, me duelen los ojos y la espalda.", sugerenciaChino: "我学习很长时间以后，眼睛和背会疼。" },
    { id: "pa3", pregunta: "Da tres consejos a un amigo que duerme poco.", preguntaChino: "给一个睡得很少的朋友提三个建议。", sugerencia: "Tienes que dormir ocho horas. No debes tomar café por la noche. Haz deporte.", sugerenciaChino: "你得睡八个小时。你晚上不应该喝咖啡。多运动。" },
    { id: "pa4", pregunta: "¿Qué remedios caseros se usan en tu familia? ¿Son iguales en España?", preguntaChino: "你家里用什么土方法治小病？和西班牙一样吗？", sugerencia: "En mi familia bebemos agua caliente y sopa de jengibre. En España toman té con miel y limón.", sugerenciaChino: "我们家会喝热水和姜汤。在西班牙，人们喝加蜂蜜和柠檬的茶。" },
  ],
  preguntas: [
    { id: "p1", pregunta: "Completa: Me ___ las piernas.", preguntaChino: "填空：Me ___ las piernas.（我腿疼。）", respuestaSugerida: "duelen", respuestaSugeridaChino: "duelen（复数部位）" },
    { id: "p2", pregunta: "¿Cuál es el imperativo de «hacer» para tú?", preguntaChino: "«hacer» 的 tú 命令式是什么？", respuestaSugerida: "haz", respuestaSugeridaChino: "haz（不规则）" },
    { id: "p3", pregunta: "Completa: Tienes ___ ir al médico.", preguntaChino: "填空：Tienes ___ ir al médico.（你得去看医生。）", respuestaSugerida: "que", respuestaSugeridaChino: "que（tener que + 原形）" },
    { id: "p4", pregunta: "¿Qué le dices a un amigo enfermo para despedirte?", preguntaChino: "和生病的朋友告别时，你说什么？", respuestaSugerida: "¡Que te mejores!", respuestaSugeridaChino: "¡Que te mejores!（祝你早日康复！）" },
  ],
};

export const MODULOS_81_85 = [M81, M82, M83, M84, M85];
