const MODULOS_21_40 = [
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
    teoria: [
      {
        id: "t1",
        titulo: "Expresiones con 'hacer'",
        tituloChino: "用'hacer'的表达",
        descripcion: `Para describir el tiempo atmosférico usamos diferentes verbos:

🔹 EXPRESIONES CON "HACER" (general/temperatura):
• hace sol = it's sunny
• hace calor = it's hot
• hace frío = it's cold
• hace viento = it's windy
• hace buen tiempo = the weather is good
• hace mal tiempo = the weather is bad
• hace fresco = it's cool
• hace mucho calor = it's very hot
• hace muchísimo frío = it's extremely cold
• hace un calor terrible = it's terribly hot
• hace un frío que pela = it's freezing cold (colloquial)

🔹 EXPRESIONES CON "ESTAR" (condición momentánea):
• está nublado = it's cloudy
• está despejado = it's clear
• está soleado = it's sunny
• está lloviendo = it's raining
• está nevando = it's snowing
• está granizando = it's hailing
• está ventoso = it's windy

🔹 EXPRESIONES CON "HAY" (fenómenos):
• hay tormenta = there's a storm
• hay niebla = it's foggy
• hay nubes = it's cloudy
• hay lluvia = there's rain
• hay nieve = there's snow
• hay granizo = there's hail
• hay un temporal = there's a storm (strong)
• hay una ola de calor = there's a heatwave
• hay una ola de frío = there's a cold snap

📌 EJEMPLOS:
• Hace mucho calor hoy.
• Está nublado, puede que llueva.
• Nieva en invierno.
• Hay una tormenta eléctrica.`,
        descripcionChino: `描述天气时我们使用不同的动词：

🔹 用"HACER"的表达（一般/温度）：
• hace sol = 晴天
• hace calor = 热
• hace frío = 冷
• hace viento = 有风
• hace buen tiempo = 天气好
• hace mal tiempo = 天气不好
• hace fresco = 凉爽
• hace mucho calor = 很热
• hace muchísimo frío = 极冷
• hace un calor terrible = 热得要命
• hace un frío que pela = 冷得要命（口语）

🔹 用"ESTAR"的表达（瞬时状态）：
• está nublado = 多云
• está despejado = 晴朗
• está soleado = 阳光明媚
• está lloviendo = 正在下雨
• está nevando = 正在下雪
• está granizando = 正在下冰雹
• está ventoso = 有风

🔹 用"HAY"的表达（现象）：
• hay tormenta = 有暴风雨
• hay niebla = 有雾
• hay nubes = 多云
• hay lluvia = 有雨
• hay nieve = 有雪
• hay granizo = 有冰雹
• hay un temporal = 有风暴
• hay una ola de calor = 有热浪
• hay una ola de frío = 有寒潮

📌 例子：
• Hace mucho calor hoy. = 今天很热。
• Está nublado, puede que llueva. = 多云，可能会下雨。
• Nieva en invierno. = 冬天下雪。
• Hay una tormenta eléctrica. = 有雷暴。`,
        ejemplos: [
          {
            espanol: "Hace mucho calor hoy.",
            chino: "今天很热。",
          },
          {
            espanol: "Está nublado, puede que llueva.",
            chino: "多云，可能会下雨。",
          },
          {
            espanol: "Nieva en invierno.",
            chino: "冬天下雪。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Fenómenos meteorológicos",
        tituloChino: "气象现象",
        descripcion: `🔹 FENÓMENOS METEOROLÓGICOS (weather phenomena):

• lluvia = rain
• llovizna = drizzle
• chubasco = shower (sudden rain)
• tormenta = storm
• tormenta eléctrica = thunderstorm
• rayo = lightning bolt
• trueno = thunder
• relámpago = lightning flash
• nieve = snow
• nevada = snowfall
• ventisca = blizzard
• granizo = hail
• niebla = fog
• neblina = mist
• escarcha = frost
• hielo = ice
• gota fría = cold drop (Mediterranean phenomenon)
• huracán = hurricane
• tornado = tornado
• tifón = typhoon
• ciclón = cyclone
• inundación = flood
• sequía = drought
• terremoto = earthquake

🔹 ADJETIVOS PARA DESCRIBIR EL CLIMA (adjectives):
• lluvioso/a = rainy
• nublado/a = cloudy
• soleado/a = sunny
• ventoso/a = windy
• tormentoso/a = stormy
• húmedo/a = humid
• seco/a = dry
• caluroso/a = hot (weather)
• frío/a = cold (weather)
• templado/a = mild
• fresco/a = cool

📌 EJEMPLOS:
• Hay mucho viento hoy.
• Después de la lluvia sale el arcoíris.
• El trueno es muy fuerte.
• En el norte de España es más lluvioso que en el sur.`,
        descripcionChino: `🔹 气象现象：

• lluvia = 雨
• llovizna = 毛毛雨
• chubasco = 阵雨
• tormenta = 暴风雨
• tormenta eléctrica = 雷暴
• rayo = 闪电（击中地面的）
• trueno = 雷声
• relámpago = 闪电（光）
• nieve = 雪
• nevada = 降雪
• ventisca = 暴风雪
• granizo = 冰雹
• niebla = 雾
• neblina = 薄雾
• escarcha = 霜
• hielo = 冰
• gota fría = 冷滴（地中海现象）
• huracán = 飓风
• tornado = 龙卷风
• tifón = 台风
• ciclón = 气旋
• inundación = 洪水
• sequía = 干旱
• terremoto = 地震

🔹 描述天气的形容词：
• lluvioso/a = 多雨的
• nublado/a = 多云的
• soleado/a = 阳光明媚的
• ventoso/a = 多风的
• tormentoso/a = 暴风雨的
• húmedo/a = 潮湿的
• seco/a = 干燥的
• caluroso/a = 炎热的
• frío/a = 寒冷的
• templado/a = 温和的
• fresco/a = 凉爽的

📌 例子：
• Hay mucho viento hoy. = 今天风很大。
• Después de la lluvia sale el arcoíris. = 雨后出现彩虹。
• El trueno es muy fuerte. = 雷声很大。
• En el norte de España es más lluvioso que en el sur. = 西班牙北部比南部多雨。`,
        ejemplos: [
          {
            espanol: "Hay mucho viento hoy.",
            chino: "今天风很大。",
          },
          {
            espanol: "Después de la lluvia sale el arcoíris.",
            chino: "雨后出现彩虹。",
          },
          {
            espanol: "El trueno es muy fuerte.",
            chino: "雷声很大。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Preguntar sobre el tiempo",
        tituloChino: "询问天气",
        descripcion: `🔹 PREGUNTAS COMUNES (common questions):
• ¿Qué tiempo hace?
• ¿Cómo está el tiempo?
• ¿Va a llover?
• ¿Va a nevar?
• ¿Qué temperatura hace?
• ¿Cuál es la previsión del tiempo? (What's the weather forecast?)
• ¿Hay alerta meteorológica? (Is there a weather alert?)

🔹 CÓMO RESPONDER (how to answer):
• Hace veinte grados.
• La temperatura es de veinte grados.
• Llueve mucho.
• Nieva en las montañas.
• Se esperan lluvias para mañana.
• El fin de semana mejorará el tiempo.

🔹 TEMPERATURA (temperature):
• grados centígrados / Celsius = degrees Celsius
• bajo cero = below zero
• temperatura máxima = maximum temperature
• temperatura mínima = minimum temperature
• sensación térmica = feels like temperature

🔹 PRONÓSTICO DEL TIEMPO (weather forecast):
• soleado = sunny
• parcialmente nublado = partly cloudy
• cubierto = overcast
• lluvias débiles = light rain
• lluvias fuertes = heavy rain
• tormentas = thunderstorms
• nieve = snow
• viento = wind
• calima = dust haze (Canary Islands)

📌 EJEMPLOS:
• ¿Qué tiempo hace hoy?
• Hace veinte grados.
• Va a llover esta tarde.
• La previsión dice que mañana hará sol.`,
        descripcionChino: `🔹 常见问题：
• ¿Qué tiempo hace? = 天气怎么样？
• ¿Cómo está el tiempo? = 天气如何？
• ¿Va a llover? = 会下雨吗？
• ¿Va a nevar? = 会下雪吗？
• ¿Qué temperatura hace? = 温度是多少？
• ¿Cuál es la previsión del tiempo? = 天气预报是什么？
• ¿Hay alerta meteorológica? = 有天气警报吗？

🔹 如何回答：
• Hace veinte grados. = 二十度。
• La temperatura es de veinte grados. = 温度是二十度。
• Llueve mucho. = 雨下得很大。
• Nieva en las montañas. = 山上下雪。
• Se esperan lluvias para mañana. = 预计明天有雨。
• El fin de semana mejorará el tiempo. = 周末天气会好转。

🔹 温度：
• grados centígrados / Celsius = 摄氏度
• bajo cero = 零下
• temperatura máxima = 最高温度
• temperatura mínima = 最低温度
• sensación térmica = 体感温度

🔹 天气预报：
• soleado = 晴朗
• parcialmente nublado = 局部多云
• cubierto = 阴天
• lluvias débiles = 小雨
• lluvias fuertes = 大雨
• tormentas = 雷暴
• nieve = 雪
• viento = 风
• calima = 沙尘雾（加那利群岛）

📌 例子：
• ¿Qué tiempo hace hoy? = 今天天气怎么样？
• Hace veinte grados. = 二十度。
• Va a llover esta tarde. = 今天下午会下雨。
• La previsión dice que mañana hará sol. = 天气预报说明天会是晴天。`,
        ejemplos: [
          {
            espanol: "¿Qué tiempo hace hoy?",
            chino: "今天天气怎么样？",
          },
          {
            espanol: "Hace veinte grados.",
            chino: "二十度。",
          },
          {
            espanol: "Va a llover esta tarde.",
            chino: "今天下午会下雨。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "El clima en España",
        tituloChino: "西班牙的气候",
        descripcion: `🔹 CLIMA EN ESPAÑA (climate in Spain):

• Clima mediterráneo (Mediterranean climate): veranos calurosos y secos, inviernos suaves. Costa Mediterránea, Andalucía, Cataluña, Valencia, Murcia.

• Clima oceánico (Oceanic climate): veranos suaves, inviernos frescos, lluvias frecuentes. Norte de España: Galicia, Asturias, Cantabria, País Vasco.

• Clima continental (Continental climate): veranos calurosos, inviernos fríos. Interior: Madrid, Castilla y León, Aragón.

• Clima subtropical (Subtropical climate): temperaturas suaves todo el año. Islas Canarias.

• Clima de montaña (Mountain climate): inviernos fríos con nieve, veranos frescos. Pirineos, Sierra Nevada.

🔹 REFRANES SOBRE EL TIEMPO (sayings):
• "Abril, aguas mil." (April, thousand waters)
• "Hasta el cuarenta de mayo, no te quites el sayo." (Until May 40th, don't take off your coat)
• "En enero, busca el sol en el cielo." (In January, look for the sun in the sky)

📌 EJEMPLOS:
• En Madrid el clima es continental: mucho frío en invierno y mucho calor en verano.
• En la costa mediterránea el verano es muy caluroso.
• En el norte de España llueve con frecuencia.`,
        descripcionChino: `🔹 西班牙的气候：

• 地中海气候：夏季炎热干燥，冬季温和。地中海沿岸、安达卢西亚、加泰罗尼亚、瓦伦西亚、穆尔西亚。

• 海洋性气候：夏季温和，冬季凉爽，降雨频繁。西班牙北部：加利西亚、阿斯图里亚斯、坎塔布里亚、巴斯克地区。

• 大陆性气候：夏季炎热，冬季寒冷。内陆：马德里、卡斯蒂利亚-莱昂、阿拉贡。

• 亚热带气候：全年温度温和。加那利群岛。

• 山地气候：冬季寒冷有雪，夏季凉爽。比利牛斯山、内华达山。

🔹 关于天气的谚语：
• "Abril, aguas mil." = 四月，千场雨。
• "Hasta el cuarenta de mayo, no te quites el sayo." = 五月四十号之前，别脱外套。（意思是五月底之前都可能有冷天）
• "En enero, busca el sol en el cielo." = 一月里，在天空找太阳。

📌 例子：
• En Madrid el clima es continental: mucho frío en invierno y mucho calor en verano. = 马德里的气候是大陆性的：冬天很冷，夏天很热。
• En la costa mediterránea el verano es muy caluroso. = 地中海沿岸夏天很热。
• En el norte de España llueve con frecuencia. = 西班牙北部经常下雨。`,
        ejemplos: [
          {
            espanol: "En Madrid el invierno es muy frío.",
            chino: "马德里的冬天很冷。",
          },
          {
            espanol: "En la costa mediterránea el verano es caluroso.",
            chino: "地中海沿岸的夏天很热。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "sol",
        chino: "太阳",
        ejemplo: "Hace sol.",
      },
      {
        id: "v2",
        espanol: "lluvia",
        chino: "雨",
        ejemplo: "Llueve mucho.",
      },
      {
        id: "v3",
        espanol: "nieve",
        chino: "雪",
        ejemplo: "Nieva en invierno.",
      },
      {
        id: "v4",
        espanol: "viento",
        chino: "风",
        ejemplo: "Hace viento.",
      },
      {
        id: "v5",
        espanol: "nube",
        chino: "云",
        ejemplo: "Hay nubes.",
      },
      {
        id: "v6",
        espanol: "frío",
        chino: "冷",
        ejemplo: "Hace frío.",
      },
      {
        id: "v7",
        espanol: "calor",
        chino: "热",
        ejemplo: "Hace calor.",
      },
      {
        id: "v8",
        espanol: "tormenta",
        chino: "暴风雨",
        ejemplo: "Hay tormenta.",
      },
      {
        id: "v9",
        espanol: "niebla",
        chino: "雾",
        ejemplo: "Hay niebla.",
      },
      {
        id: "v10",
        espanol: "granizo",
        chino: "冰雹",
        ejemplo: "Está granizando.",
      },
      {
        id: "v11",
        espanol: "arcoíris",
        chino: "彩虹",
        ejemplo: "Mira el arcoíris.",
      },
      {
        id: "v12",
        espanol: "temperatura",
        chino: "温度",
        ejemplo: "La temperatura es alta.",
      },
      {
        id: "v13",
        espanol: "grado",
        chino: "度",
        ejemplo: "Hace 20 grados.",
      },
      {
        id: "v14",
        espanol: "despejado",
        chino: "晴朗的",
        ejemplo: "El cielo está despejado.",
      },
      {
        id: "v15",
        espanol: "nublado",
        chino: "多云的",
        ejemplo: "Está nublado.",
      },
      {
        id: "v16",
        espanol: "soleado",
        chino: "阳光明媚的",
        ejemplo: "Día soleado.",
      },
      {
        id: "v17",
        espanol: "lluvioso",
        chino: "多雨的",
        ejemplo: "Un día lluvioso.",
      },
      {
        id: "v18",
        espanol: "ventoso",
        chino: "多风的",
        ejemplo: "Día ventoso.",
      },
      {
        id: "v19",
        espanol: "¿Qué tiempo hace?",
        chino: "天气怎么样？",
        ejemplo: "¿Qué tiempo hace?",
      },
      {
        id: "v20",
        espanol: "previsión",
        chino: "预报",
        ejemplo: "La previsión del tiempo.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Hablando del tiempo",
        tituloChino: "谈论天气",
        personajes: ["Ana", "Carlos"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Carlos, ¿qué tiempo hace hoy?",
            traduccion: "卡洛斯，今天天气怎么样？",
          },
          {
            personaje: "Carlos",
            texto: "Hace sol pero también hace viento.",
            traduccion: "晴天但是有风。",
          },
          {
            personaje: "Ana",
            texto: "¿Hace frío?",
            traduccion: "冷吗？",
          },
          {
            personaje: "Carlos",
            texto: "Un poco. Lleva un abrigo.",
            traduccion: "有点。带件外套。",
          },
          {
            personaje: "Ana",
            texto: "Gracias. Espero que no llueva.",
            traduccion: "谢谢。希望不要下雨。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Planes de viaje",
        tituloChino: "旅行计划",
        personajes: ["María", "Pedro"],
        lineas: [
          {
            personaje: "María",
            texto: "Pedro, ¿qué tiempo hará mañana en Madrid?",
            traduccion: "佩德罗，明天马德里天气怎么样？",
          },
          {
            personaje: "Pedro",
            texto: "Parece que hará buen tiempo.",
            traduccion: "看起来天气会很好。",
          },
          {
            personaje: "María",
            texto: "¡Perfecto! Vamos a hacer una excursión.",
            traduccion: "太好了！我们去远足。",
          },
          {
            personaje: "Pedro",
            texto: "Sí, pero lleva agua por si acaso.",
            traduccion: "好的，但带瓶水以防万一。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Viendo el pronóstico",
        tituloChino: "看天气预报",
        personajes: ["Hijo", "Madre"],
        lineas: [
          {
            personaje: "Hijo",
            texto: "Mamá, ¿va a llover hoy?",
            traduccion: "妈妈，今天会下雨吗？",
          },
          {
            personaje: "Madre",
            texto: "Sí, han dicho que habrá tormenta por la tarde.",
            traduccion: "是的，天气预报说下午有暴风雨。",
          },
          {
            personaje: "Hijo",
            texto: "Entonces no podemos ir al parque.",
            traduccion: "那我们不能去公园了。",
          },
          {
            personaje: "Madre",
            texto: "No, mejor quedarnos en casa.",
            traduccion: "是的，最好待在家里。",
          },
          {
            personaje: "Hijo",
            texto: "¿Y mañana?",
            traduccion: "明天呢？",
          },
          {
            personaje: "Madre",
            texto: "Mañana hará sol.",
            traduccion: "明天会是晴天。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Clima en diferentes ciudades",
        tituloChino: "不同城市的气候",
        personajes: ["Laura", "David"],
        lineas: [
          {
            personaje: "Laura",
            texto: "David, ¿cómo es el clima en tu ciudad?",
            traduccion: "大卫，你所在城市的气候怎么样？",
          },
          {
            personaje: "David",
            texto: "En mi ciudad hace mucho frío en invierno y mucho calor en verano.",
            traduccion: "我的城市冬天很冷，夏天很热。",
          },
          {
            personaje: "Laura",
            texto: "¿Y en primavera y otoño?",
            traduccion: "春天和秋天呢？",
          },
          {
            personaje: "David",
            texto: "Son más suaves. La temperatura es agradable.",
            traduccion: "更温和。温度宜人。",
          },
          {
            personaje: "Laura",
            texto: "Aquí en la costa el invierno no es tan frío.",
            traduccion: "在这里的海边，冬天没那么冷。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Preparándose para el mal tiempo",
        tituloChino: "为坏天气做准备",
        personajes: ["Sofía", "Javier"],
        lineas: [
          {
            personaje: "Sofía",
            texto: "Javier, ¿has visto el pronóstico para mañana?",
            traduccion: "哈维尔，你看明天的天气预报了吗？",
          },
          {
            personaje: "Javier",
            texto: "Sí, van a haber lluvias fuertes y viento.",
            traduccion: "看了，会有大雨和大风。",
          },
          {
            personaje: "Sofía",
            texto: "Entonces mejor no salir en coche.",
            traduccion: "那最好不要开车出去。",
          },
          {
            personaje: "Javier",
            texto: "Tienes razón. Tomaremos el tren.",
            traduccion: "你说得对。我们坐火车吧。",
          },
          {
            personaje: "Sofía",
            texto: "No olvides el paraguas.",
            traduccion: "别忘了带伞。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "当有太阳时，我们说：Hace _____",
          preguntaChino: "当有太阳时，我们说：Hace _____",
          respuestaCorrecta: "sol",
          explicacion: "'Hace sol' = 晴天。",
          pista: "首字母是 s，3个字母",
          numeroLetras: 3,
        },
        {
          id: "c2",
          pregunta: "当下雨时，我们说：_____",
          preguntaChino: "当下雨时，我们说：_____",
          respuestaCorrecta: "llueve",
          explicacion: "'Llueve' = 下雨。",
          pista: "首字母是 l，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c3",
          pregunta: "当天气很热时，我们说：Hace _____",
          preguntaChino: "当天气很热时，我们说：Hace _____",
          respuestaCorrecta: "calor",
          explicacion: "'Hace calor' = 天气热。",
          pista: "首字母是 c，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c4",
          pregunta: "当有风时，我们说：Hace _____",
          preguntaChino: "当有风时，我们说：Hace _____",
          respuestaCorrecta: "viento",
          explicacion: "'Hace viento' = 有风。",
          pista: "首字母是 v，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c5",
          pregunta: "当有雾时，我们说：Hay _____",
          preguntaChino: "当有雾时，我们说：Hay _____",
          respuestaCorrecta: "niebla",
          explicacion: "'Hay niebla' = 有雾。",
          pista: "首字母是 n，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c6",
          pregunta: "当天气多云时，我们说：Está _____",
          preguntaChino: "当天气多云时，我们说：Está _____",
          respuestaCorrecta: "nublado",
          explicacion: "Nublado = 多云的",
          pista: "首字母是 n，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c7",
          pregunta: "当天气晴朗时，我们说：Está _____",
          preguntaChino: "当天气晴朗时，我们说：Está _____",
          respuestaCorrecta: "despejado",
          explicacion: "Despejado = 晴朗的",
          pista: "首字母是 d，9个字母",
          numeroLetras: 9,
        },
        {
          id: "c8",
          pregunta: "为了问'温度是多少？'：¿Qué _____ hace?",
          preguntaChino: "为了问'温度是多少？'：¿Qué _____ hace?",
          respuestaCorrecta: "temperatura",
          explicacion: "Temperatura = 温度",
          pista: "首字母是 t，11个字母",
          numeroLetras: 11,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "当有很多云时，天气怎么样？",
          preguntaChino: "当有很多云时，天气怎么样？",
          opciones: ["Hace sol", "Está nublado", "Hace calor", "Está despejado"],
          respuestaCorrecta: "Está nublado",
          explicacion: "有云时，是阴天。",
        },
        {
          id: "s2",
          pregunta: "最热的季节是什么？",
          preguntaChino: "最热的季节是什么？",
          opciones: ["Invierno", "Primavera", "Verano", "Otoño"],
          respuestaCorrecta: "Verano",
          explicacion: "夏天是最热的季节。",
        },
        {
          id: "s3",
          pregunta: "冬天非常冷的时候，天上会落下什么？",
          preguntaChino: "冬天非常冷的时候，天上会落下什么？",
          opciones: ["Lluvia", "Nieve", "Sol", "Viento"],
          respuestaCorrecta: "Nieve",
          explicacion: "天气很冷时会下雪。",
        },
        {
          id: "s4",
          pregunta: "'Hace frío'是什么意思？",
          preguntaChino: "'Hace frío'是什么意思？",
          opciones: ["天气热", "天气冷", "天气好", "天气不好"],
          respuestaCorrecta: "天气冷",
          explicacion: "'Hace frío' = 天气冷。",
        },
        {
          id: "s5",
          pregunta: "下雨后有时会出现什么？",
          preguntaChino: "下雨后有时会出现什么？",
          opciones: ["Tormenta", "Nieve", "Arcoíris", "Niebla"],
          respuestaCorrecta: "Arcoíris",
          explicacion: "雨后有时会出现彩虹。",
        },
        {
          id: "s6",
          pregunta: "¿Qué significa 'Hay tormenta'?",
          preguntaChino: "'Hay tormenta'是什么意思？",
          opciones: ["有雨", "有雪", "有暴风雨", "有雾"],
          respuestaCorrecta: "有暴风雨",
          explicacion: "Tormenta = 暴风雨",
        },
        {
          id: "s7",
          pregunta: "¿Cómo se dice '摄氏20度' en español?",
          preguntaChino: "西班牙语中'摄氏20度'怎么说？",
          opciones: [
            "20 grados Fahrenheit",
            "20 grados Celsius",
            "20 grados centígrados",
            "20 grados bajo cero",
          ],
          respuestaCorrecta: "20 grados centígrados",
          explicacion: "Grados centígrados / Celsius",
        },
        {
          id: "s8",
          pregunta: "¿Qué significa 'previsión del tiempo'?",
          preguntaChino: "'previsión del tiempo'是什么意思？",
          opciones: ["天气预报", "天气变化", "气候", "温度"],
          respuestaCorrecta: "天气预报",
          explicacion: "Previsión del tiempo = 天气预报",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Hace frío'意思是温度低。",
          preguntaChino: "'Hace frío'意思是温度低。",
          respuestaCorrecta: true,
          explicacion: "对。'Frío' = 冷。",
        },
        {
          id: "vf2",
          pregunta: "夏天天气很冷。",
          preguntaChino: "夏天天气很冷。",
          respuestaCorrecta: false,
          explicacion: "错。夏天天气热。",
        },
        {
          id: "vf3",
          pregunta: "春天在冬天之后。",
          preguntaChino: "春天在冬天之后。",
          respuestaCorrecta: true,
          explicacion: "对。冬天之后是春天。",
        },
        {
          id: "vf4",
          pregunta: "'Hay tormenta'意味着有暴风雨。",
          preguntaChino: "'Hay tormenta'意味着有暴风雨。",
          respuestaCorrecta: true,
          explicacion: "对。Tormenta = 暴风雨。",
        },
        {
          id: "vf5",
          pregunta: "'Está despejado'意味着多云。",
          preguntaChino: "'Está despejado'意味着多云。",
          respuestaCorrecta: false,
          explicacion: "错。'Despejado' = 晴朗。",
        },
        {
          id: "vf6",
          pregunta: "El 'arcoíris' aparece después de la lluvia.",
          preguntaChino: "'Arcoíris'出现在雨后。",
          respuestaCorrecta: true,
          explicacion: "对。彩虹通常在雨后出现。",
        },
        {
          id: "vf7",
          pregunta: "En España, el norte es más lluvioso que el sur.",
          preguntaChino: "在西班牙，北部比南部多雨。",
          respuestaCorrecta: true,
          explicacion: "对。El norte tiene clima oceánico.",
        },
        {
          id: "vf8",
          pregunta: "La 'niebla' es un fenómeno peligroso para conducir.",
          preguntaChino: "'Niebla'对开车是危险的现象。",
          respuestaCorrecta: true,
          explicacion: "对。La niebla reduce la visibilidad.",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "hace sol",
              derecha: "晴天",
            },
            {
              izquierda: "hace calor",
              derecha: "热",
            },
            {
              izquierda: "hace frío",
              derecha: "冷",
            },
            {
              izquierda: "llueve",
              derecha: "下雨",
            },
            {
              izquierda: "nieva",
              derecha: "下雪",
            },
            {
              izquierda: "está nublado",
              derecha: "多云",
            },
            {
              izquierda: "hay tormenta",
              derecha: "有暴风雨",
            },
            {
              izquierda: "hay niebla",
              derecha: "有雾",
            },
            {
              izquierda: "hace viento",
              derecha: "有风",
            },
            {
              izquierda: "está despejado",
              derecha: "晴朗",
            },
          ],
          explicacion: "将天气表达与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["calor", "Hace", "mucho", "."],
          respuestaCorrecta: "Hace mucho calor.",
          explicacion: "正确的句子是：Hace mucho calor.（天气很热。）",
        },
        {
          id: "o2",
          palabras: ["qué", "hace", "tiempo", "¿", "?"],
          respuestaCorrecta: "¿Qué tiempo hace?",
          explicacion: "正确的句子是：¿Qué tiempo hace?（天气怎么样？）",
        },
        {
          id: "o3",
          palabras: ["va", "a", "llover", "Hoy", "."],
          respuestaCorrecta: "Hoy va a llover.",
          explicacion: "正确的句子是：Hoy va a llover.（今天会下雨。）",
        },
        {
          id: "o4",
          palabras: ["grados", "veinte", "Hace", "."],
          respuestaCorrecta: "Hace veinte grados.",
          explicacion: "正确的顺序是：Hace veinte grados.（二十度。）",
        },
        {
          id: "o5",
          palabras: ["nublado", "cielo", "está", "El", "."],
          respuestaCorrecta: "El cielo está nublado.",
          explicacion: "正确的顺序是：El cielo está nublado.",
        },
        {
          id: "o6",
          palabras: ["tormenta", "por", "Habrá", "tarde", "la", "."],
          respuestaCorrecta: "Habrá tormenta por la tarde.",
          explicacion: "正确的顺序是：Habrá tormenta por la tarde.",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "今天很热。",
          respuestaEsperada: "Hace mucho calor hoy.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "明天会下雨吗？",
          respuestaEsperada: "¿Va a llover mañana?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "冬天下雪。",
          respuestaEsperada: "En invierno nieva.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "今天温度是二十五度。",
          respuestaEsperada: "Hoy la temperatura es de veinticinco grados.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "天气多云，可能会下雨。",
          respuestaEsperada: "Está nublado, puede que llueva.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "西班牙北部冬天很冷。",
          respuestaEsperada: "En el norte de España el invierno es muy frío.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "天气预报说明天会放晴。",
          respuestaEsperada: "El pronóstico dice que mañana hará sol.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "今天风很大。",
          respuestaEsperada: "Hoy hace mucho viento.",
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
        instruccion: "用正确的天气词汇完成对话。",
        instruccionChino: "用正确的天气词汇完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿Qué _____ hace hoy?",
            respuesta: "tiempo",
          },
          {
            personaje: "B",
            texto: "Hace _____ y hace _____.",
            respuesta: "sol / viento / calor / frío",
          },
          {
            personaje: "A",
            texto: "¿Va a _____?",
            respuesta: "llover / nevar",
          },
          {
            personaje: "B",
            texto: "No, está _____.",
            respuesta: "despejado / soleado",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "responder",
        titulo: "Responde las preguntas",
        tituloChino: "回答问题",
        instruccion: "Responde las siguientes preguntas sobre el tiempo en español.",
        instruccionChino: "用西班牙语回答以下关于天气的问题。",
        preguntas: [
          {
            pregunta: "¿Qué tiempo hace hoy?",
            respuestaEsperada: "Hace (sol / calor / frío / viento / nublado).",
          },
          {
            pregunta: "¿Cuál es tu estación favorita?",
            respuestaEsperada: "Mi estación favorita es (primavera / verano / otoño / invierno).",
          },
          {
            pregunta: "¿Dónde nieva en invierno?",
            respuestaEsperada: "Nieva en las montañas.",
          },
          {
            pregunta: "¿Qué temperatura hace ahora?",
            respuestaEsperada: "Ahora hace (número) grados.",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "prevision",
        titulo: "Escribe el pronóstico",
        tituloChino: "写天气预报",
        instruccion: "Escribe un pequeño pronóstico del tiempo para mañana en tu ciudad.",
        instruccionChino: "为你所在的城市写一个简短的天气预报。",
        ejemplo:
          "Mañana en Madrid hará sol por la mañana, pero por la tarde habrá nubes y puede que llueva. La temperatura máxima será de 22 grados.",
      },
      {
        id: "ep4",
        tipo: "clasificar",
        titulo: "Clasifica las expresiones climáticas",
        tituloChino: "分类天气表达",
        instruccion: "Clasifica cada expresión según el verbo que usa (hacer, estar, hay).",
        instruccionChino: "根据使用的动词（hacer, estar, hay）对每个表达进行分类。",
        expresiones: [
          {
            expresion: "hace sol",
            verbo: "hacer",
          },
          {
            expresion: "está nublado",
            verbo: "estar",
          },
          {
            expresion: "hay niebla",
            verbo: "haber",
          },
          {
            expresion: "hace viento",
            verbo: "hacer",
          },
          {
            expresion: "está lloviendo",
            verbo: "estar",
          },
          {
            expresion: "hay tormenta",
            verbo: "haber",
          },
        ],
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Qué tiempo hace hoy en tu ciudad?",
        preguntaChino: "你今天所在的城市天气怎么样？",
        sugerencia: "Hoy hace (sol / calor / frío / viento / nublado).",
        sugerenciaChino: "Hoy hace (sol / calor / frío / viento / nublado).",
      },
      {
        id: "pa2",
        pregunta: "¿Cuál es tu estación favorita? ¿Por qué?",
        preguntaChino: "你最喜欢的季节是什么？为什么？",
        sugerencia: "Mi estación favorita es la primavera porque hace buen tiempo.",
        sugerenciaChino: "Mi estación favorita es la primavera porque hace buen tiempo.",
      },
      {
        id: "pa3",
        pregunta: "¿Qué temperatura hace ahora?",
        preguntaChino: "现在温度是多少？",
        sugerencia: "Ahora hace (número) grados.",
        sugerenciaChino: "Ahora hace (número) grados.",
      },
      {
        id: "pa4",
        pregunta: "¿Cómo es el clima en tu país?",
        preguntaChino: "你所在国家的气候怎么样？",
        sugerencia: "En mi país, los veranos son calurosos y los inviernos son fríos.",
        sugerenciaChino: "En mi país, los veranos son calurosos y los inviernos son fríos.",
      },
      {
        id: "pa5",
        pregunta: "¿Qué llevas cuando hace mucho frío?",
        preguntaChino: "天气很冷时你会穿什么？",
        sugerencia: "Cuando hace mucho frío, llevo un abrigo, bufanda, guantes y gorro.",
        sugerenciaChino: "Cuando hace mucho frío, llevo un abrigo, bufanda, guantes y gorro.",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '天气怎么样？' en español?",
        preguntaChino: "西班牙语中'天气怎么样？'怎么说？",
        respuestaSugerida: "¿Qué tiempo hace?",
        respuestaSugeridaChino: "¿Qué tiempo hace?",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '下雨' en español?",
        preguntaChino: "西班牙语中'下雨'怎么说？",
        respuestaSugerida: "llueve",
        respuestaSugeridaChino: "llueve",
      },
      {
        id: "p3",
        pregunta: "¿Qué significa 'Hace viento'?",
        preguntaChino: "'Hace viento'是什么意思？",
        respuestaSugerida: "有风",
        respuestaSugeridaChino: "It's windy",
      },
      {
        id: "p4",
        pregunta: "¿Qué estación hace más calor?",
        preguntaChino: "哪个季节最热？",
        respuestaSugerida: "El verano.",
        respuestaSugeridaChino: "El verano.",
      },
      {
        id: "p5",
        pregunta: "¿Cómo se dice '摄氏度' en español?",
        preguntaChino: "西班牙语中'摄氏度'怎么说？",
        respuestaSugerida: "grados centígrados / Celsius",
        respuestaSugeridaChino: "grados centígrados / Celsius",
      },
      {
        id: "p6",
        pregunta: "¿Qué significa 'arcoíris'?",
        preguntaChino: "'arcoíris'是什么意思？",
        respuestaSugerida: "Rainbow / 彩虹",
        respuestaSugeridaChino: "彩虹",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Lugares en la ciudad",
        tituloChino: "城市地点",
        descripcion: `🔹 LUGARES URBANOS PRINCIPALES:

CENTRO Y CALLES:
• centro = city center / downtown
• plaza = square
• calle = street
• avenida = avenue
• paseo = promenade
• callejón = alley
• ronda = ring road
• glorieta = roundabout

SERVICIOS PÚBLICOS:
• ayuntamiento = town hall
• comisaría / policía = police station
• hospital = hospital
• centro de salud = health center
• biblioteca = library
• museo = museum
• teatro = theater
• cine = cinema
• parque = park
• jardín = garden

TRANSPORTE:
• estación de tren = train station
• estación de autobuses = bus station
• parada (de autobús/metro) = stop
• aeropuerto = airport
• puerto = port
• estación de taxi = taxi stand

COMERCIOS:
• tienda / comercio = shop
• supermercado = supermarket
• mercado = market
• centro comercial = shopping center / mall
• farmacia = pharmacy
• banco = bank
• restaurante = restaurant
• cafetería = café
• bar = bar

EDUCACIÓN:
• escuela / colegio = school
• instituto = high school
• universidad = university
• guardería = nursery

RELIGIÓN:
• iglesia = church
• catedral = cathedral
• sinagoga = synagogue
• mezquita = mosque

OTROS:
• estadio = stadium
• piscina = swimming pool
• gimnasio = gym
• polideportivo = sports center
• cementerio = cemetery
• parque de bomberos = fire station

📌 EJEMPLOS:
• Vivo en el centro de la ciudad.
• La plaza mayor está cerca.
• Hay un parque bonito aquí.`,
        descripcionChino: `🔹 主要城市地点：

中心和街道：
• centro = 市中心
• plaza = 广场
• calle = 街道
• avenida = 大道
• paseo = 林荫大道
• callejón = 小巷
• ronda = 环城路
• glorieta = 环岛

公共服务：
• ayuntamiento = 市政厅
• comisaría / policía = 警察局
• hospital = 医院
• centro de salud = 健康中心
• biblioteca = 图书馆
• museo = 博物馆
• teatro = 剧院
• cine = 电影院
• parque = 公园
• jardín = 花园

交通：
• estación de tren = 火车站
• estación de autobuses = 公交总站
• parada = 车站
• aeropuerto = 机场
• puerto = 港口
• estación de taxi = 出租车站

商店：
• tienda / comercio = 商店
• supermercado = 超市
• mercado = 市场
• centro comercial = 购物中心
• farmacia = 药店
• banco = 银行
• restaurante = 餐厅
• cafetería = 咖啡馆
• bar = 酒吧

教育：
• escuela / colegio = 学校
• instituto = 中学
• universidad = 大学
• guardería = 托儿所

宗教：
• iglesia = 教堂
• catedral = 大教堂
• sinagoga = 犹太教堂
• mezquita = 清真寺

其他：
• estadio = 体育场
• piscina = 游泳池
• gimnasio = 健身房
• polideportivo = 体育中心
• cementerio = 公墓
• parque de bomberos = 消防站

📌 例子：
• Vivo en el centro de la ciudad. = 我住在市中心。
• La plaza mayor está cerca. = 主广场很近。
• Hay un parque bonito aquí. = 这里有个漂亮的公园。`,
        ejemplos: [
          {
            espanol: "Vivo en el centro de la ciudad.",
            chino: "我住在市中心。",
          },
          {
            espanol: "La plaza mayor está cerca.",
            chino: "大广场很近。",
          },
          {
            espanol: "Hay un parque bonito aquí.",
            chino: "这里有个漂亮的公园。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Dar direcciones",
        tituloChino: "指路",
        descripcion: `🔹 VERBOS Y FRASES PARA DAR DIRECCIONES:

• seguir recto = go straight
• girar a la izquierda = turn left
• girar a la derecha = turn right
• cruzar la calle = cross the street
• tomar la primera calle = take the first street
• tomar la segunda calle = take the second street
• llegar a = arrive at / reach
• pasar por = go through / pass by
• continuar = continue

🔹 PREGUNTAS COMUNES:
• ¿Dónde está...?
• ¿Cómo llego a...?
• ¿Hay un banco por aquí?
• ¿Está lejos?
• ¿A qué distancia está?
• ¿Cuánto tiempo se tarda?

🔹 RESPUESTAS:
• Está a dos cuadras.
• Está a cinco minutos a pie.
• Está muy cerca.
• Está bastante lejos.
• Tome la segunda calle a la derecha.
• Siga recto hasta el semáforo.
• Gire a la izquierda en el parque.
• En la glorieta, tome la tercera salida.

🔹 VOCABULARIO ÚTIL:
• cuadra = block
• semáforo = traffic light
• esquina = corner
• acera = sidewalk
• calzada = roadway
• paso de cebra = crosswalk
• rotonda = roundabout
• calle peatonal = pedestrian street

📌 EJEMPLOS:
• Sigue recto dos cuadras.
• Gira a la izquierda en el semáforo.
• Está al lado del banco.`,
        descripcionChino: `🔹 指路的动词和短语：

• seguir recto = 直走
• girar a la izquierda = 左转
• girar a la derecha = 右转
• cruzar la calle = 过马路
• tomar la primera calle = 走第一条街
• tomar la segunda calle = 走第二条街
• llegar a = 到达
• pasar por = 经过
• continuar = 继续

🔹 常见问题：
• ¿Dónde está...? = ...在哪里？
• ¿Cómo llego a...? = 我怎么去...？
• ¿Hay un banco por aquí? = 这附近有银行吗？
• ¿Está lejos? = 远吗？
• ¿A qué distancia está? = 有多远？
• ¿Cuánto tiempo se tarda? = 需要多长时间？

🔹 回答：
• Está a dos cuadras. = 在两个街区外。
• Está a cinco minutos a pie. = 步行五分钟。
• Está muy cerca. = 很近。
• Está bastante lejos. = 相当远。
• Tome la segunda calle a la derecha. = 在第二条街右转。
• Siga recto hasta el semáforo. = 直走到红绿灯。
• Gire a la izquierda en el parque. = 在公园左转。
• En la glorieta, tome la tercera salida. = 在环岛，走第三个出口。

🔹 有用词汇：
• cuadra = 街区
• semáforo = 红绿灯
• esquina = 拐角
• acera = 人行道
• calzada = 车道
• paso de cebra = 斑马线
• rotonda = 环岛
• calle peatonal = 步行街

📌 例子：
• Sigue recto dos cuadras. = 直走两个街区。
• Gira a la izquierda en el semáforo. = 在红绿灯左转。
• Está al lado del banco. = 在银行旁边。`,
        ejemplos: [
          {
            espanol: "Sigue recto y gira a la izquierda.",
            chino: "直走然后左转。",
          },
          {
            espanol: "Está al final de la calle.",
            chino: "在街的尽头。",
          },
          {
            espanol: "Toma la segunda calle a la derecha.",
            chino: "在第二条街右转。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Preguntar direcciones",
        tituloChino: "问路",
        descripcion: `🔹 FRASES PARA PREGUNTAR DIRECCIONES:

• ¿Dónde está...? = Where is...?
• ¿Cómo llego a...? = How do I get to...?
• ¿Hay un/una... por aquí? = Is there a... around here?
• ¿Está lejos? = Is it far?
• ¿A qué distancia está? = How far is it?
• ¿Cuánto tiempo se tarda? = How long does it take?
• ¿Puede ayudarme? = Can you help me?
• ¿Va por aquí? = Is it this way?

🔹 RESPUESTAS ÚTILES:
• Está a dos cuadras.
• Está a cinco minutos a pie.
• Está muy cerca / bastante lejos.
• Siga todo recto.
• Gire a la izquierda/derecha.
• Cruce la calle.
• Está a la vuelta de la esquina.
• No está lejos, puede ir andando.
• Le recomiendo coger el autobús.

🔹 PREGUNTAR SOBRE DISTANCIA:
• ¿Cuántos kilómetros hay?
• ¿En coche, cuánto se tarda?
• ¿En transporte público?
• ¿Hay algún autobús que vaya?

📌 EJEMPLOS:
• ¿Dónde está el banco?
• ¿Cómo llego a la estación?
• Está a cinco minutos a pie.`,
        descripcionChino: `🔹 问路的句子：

• ¿Dónde está...? = ...在哪里？
• ¿Cómo llego a...? = 我怎么去...？
• ¿Hay un/una... por aquí? = 这附近有...吗？
• ¿Está lejos? = 远吗？
• ¿A qué distancia está? = 有多远？
• ¿Cuánto tiempo se tarda? = 需要多长时间？
• ¿Puede ayudarme? = 您能帮我吗？
• ¿Va por aquí? = 是这边吗？

🔹 有用的回答：
• Está a dos cuadras. = 在两个街区外。
• Está a cinco minutos a pie. = 步行五分钟。
• Está muy cerca / bastante lejos. = 很近/相当远。
• Siga todo recto. = 一直直走。
• Gire a la izquierda/derecha. = 左转/右转。
• Cruce la calle. = 过马路。
• Está a la vuelta de la esquina. = 在拐角处。
• No está lejos, puede ir andando. = 不远，可以步行。
• Le recomiendo coger el autobús. = 我建议您坐公交车。

🔹 询问距离：
• ¿Cuántos kilómetros hay? = 有多少公里？
• ¿En coche, cuánto se tarda? = 开车需要多长时间？
• ¿En transporte público? = 公共交通呢？
• ¿Hay algún autobús que vaya? = 有公交车去那里吗？

📌 例子：
• ¿Dónde está el banco? = 银行在哪里？
• ¿Cómo llego a la estación? = 我怎么去车站？
• Está a cinco minutos a pie. = 步行五分钟。`,
        ejemplos: [
          {
            espanol: "¿Dónde está el banco?",
            chino: "银行在哪里？",
          },
          {
            espanol: "¿Cómo llego a la estación?",
            chino: "我怎么去车站？",
          },
          {
            espanol: "¿Hay un supermercado por aquí?",
            chino: "这附近有超市吗？",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Describiendo tu ciudad",
        tituloChino: "描述你的城市",
        descripcion: `🔹 VOCABULARIO PARA DESCRIBIR UNA CIUDAD:

• grande / pequeña = big / small
• moderna / antigua = modern / old
• ruidosa / tranquila = noisy / quiet
• cara / barata = expensive / cheap
• turística = touristy
• industrial = industrial
• cosmopolita = cosmopolitan
• residencial = residential

🔹 QUÉ HAY EN TU CIUDAD:
• Mi ciudad tiene muchos parques.
• Hay varios museos interesantes.
• El centro está lleno de tiendas.
• La vida nocturna es muy animada.
• El transporte público es bueno.

🔹 LO QUE TE GUSTA/NO TE GUSTA:
• Me gusta mi ciudad porque...
• No me gusta el tráfico.
• Echo de menos la naturaleza.
• Prefiero vivir en una ciudad pequeña.

📌 EJEMPLOS:
• Mi ciudad es grande y moderna.
• Hay mucho tráfico en las horas punta.
• El centro peatonal es muy agradable.`,
        descripcionChino: `🔹 描述城市的词汇：

• grande / pequeña = 大/小
• moderna / antigua = 现代/古老
• ruidosa / tranquila = 吵闹/安静
• cara / barata = 昂贵/便宜
• turística = 旅游的
• industrial = 工业的
• cosmopolita = 国际化的
• residencial = 住宅区的

🔹 你的城市有什么：
• Mi ciudad tiene muchos parques. = 我的城市有很多公园。
• Hay varios museos interesantes. = 有几个有趣的博物馆。
• El centro está lleno de tiendas. = 市中心到处都是商店。
• La vida nocturna es muy animada. = 夜生活很热闹。
• El transporte público es bueno. = 公共交通很好。

🔹 你喜欢/不喜欢的地方：
• Me gusta mi ciudad porque... = 我喜欢我的城市，因为...
• No me gusta el tráfico. = 我不喜欢交通堵塞。
• Echo de menos la naturaleza. = 我想念大自然。
• Prefiero vivir en una ciudad pequeña. = 我更喜欢住在小城市。

📌 例子：
• Mi ciudad es grande y moderna. = 我的城市又大又现代。
• Hay mucho tráfico en las horas punta. = 高峰时段交通很拥堵。
• El centro peatonal es muy agradable. = 步行街非常宜人。`,
        ejemplos: [
          {
            espanol: "Mi ciudad es grande y moderna.",
            chino: "我的城市又大又现代。",
          },
          {
            espanol: "Hay mucho tráfico en las horas punta.",
            chino: "高峰时段交通很拥堵。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "ciudad",
        chino: "城市",
        ejemplo: "La ciudad es grande.",
      },
      {
        id: "v2",
        espanol: "centro",
        chino: "市中心",
        ejemplo: "El centro está lejos.",
      },
      {
        id: "v3",
        espanol: "plaza",
        chino: "广场",
        ejemplo: "La plaza mayor.",
      },
      {
        id: "v4",
        espanol: "calle",
        chino: "街道",
        ejemplo: "La calle es ancha.",
      },
      {
        id: "v5",
        espanol: "avenida",
        chino: "大道",
        ejemplo: "La avenida principal.",
      },
      {
        id: "v6",
        espanol: "parque",
        chino: "公园",
        ejemplo: "El parque es bonito.",
      },
      {
        id: "v7",
        espanol: "hospital",
        chino: "医院",
        ejemplo: "El hospital está cerca.",
      },
      {
        id: "v8",
        espanol: "biblioteca",
        chino: "图书馆",
        ejemplo: "La biblioteca es grande.",
      },
      {
        id: "v9",
        espanol: "museo",
        chino: "博物馆",
        ejemplo: "El museo de arte.",
      },
      {
        id: "v10",
        espanol: "cine",
        chino: "电影院",
        ejemplo: "Vamos al cine.",
      },
      {
        id: "v11",
        espanol: "teatro",
        chino: "剧院",
        ejemplo: "Vamos al teatro.",
      },
      {
        id: "v12",
        espanol: "restaurante",
        chino: "餐厅",
        ejemplo: "Cenamos en el restaurante.",
      },
      {
        id: "v13",
        espanol: "supermercado",
        chino: "超市",
        ejemplo: "Compro en el supermercado.",
      },
      {
        id: "v14",
        espanol: "mercado",
        chino: "市场",
        ejemplo: "Voy al mercado.",
      },
      {
        id: "v15",
        espanol: "farmacia",
        chino: "药店",
        ejemplo: "La farmacia está abierta.",
      },
      {
        id: "v16",
        espanol: "banco",
        chino: "银行",
        ejemplo: "Voy al banco.",
      },
      {
        id: "v17",
        espanol: "escuela",
        chino: "学校",
        ejemplo: "Los niños van a la escuela.",
      },
      {
        id: "v18",
        espanol: "universidad",
        chino: "大学",
        ejemplo: "Estudio en la universidad.",
      },
      {
        id: "v19",
        espanol: "iglesia",
        chino: "教堂",
        ejemplo: "La iglesia es antigua.",
      },
      {
        id: "v20",
        espanol: "estación",
        chino: "车站",
        ejemplo: "La estación de tren.",
      },
      {
        id: "v21",
        espanol: "aeropuerto",
        chino: "机场",
        ejemplo: "El aeropuerto está lejos.",
      },
      {
        id: "v22",
        espanol: "centro comercial",
        chino: "购物中心",
        ejemplo: "Vamos al centro comercial.",
      },
      {
        id: "v23",
        espanol: "izquierda",
        chino: "左边",
        ejemplo: "Gira a la izquierda.",
      },
      {
        id: "v24",
        espanol: "derecha",
        chino: "右边",
        ejemplo: "Gira a la derecha.",
      },
      {
        id: "v25",
        espanol: "recto",
        chino: "直走",
        ejemplo: "Sigue recto.",
      },
      {
        id: "v26",
        espanol: "cuadra",
        chino: "街区",
        ejemplo: "A dos cuadras.",
      },
      {
        id: "v27",
        espanol: "semáforo",
        chino: "红绿灯",
        ejemplo: "En el semáforo gira.",
      },
      {
        id: "v28",
        espanol: "esquina",
        chino: "拐角",
        ejemplo: "En la esquina.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Pidiendo direcciones",
        tituloChino: "问路",
        personajes: ["Turista", "Local"],
        lineas: [
          {
            personaje: "Turista",
            texto: "Disculpe, ¿dónde está el banco?",
            traduccion: "打扰一下，银行在哪里？",
          },
          {
            personaje: "Local",
            texto: "Sigue recto por esta calle.",
            traduccion: "沿着这条街直走。",
          },
          {
            personaje: "Turista",
            texto: "¿Está lejos?",
            traduccion: "远吗？",
          },
          {
            personaje: "Local",
            texto: "No, está cerca. A cinco minutos.",
            traduccion: "不远，很近。五分钟。",
          },
          {
            personaje: "Turista",
            texto: "Muchas gracias.",
            traduccion: "非常感谢。",
          },
          {
            personaje: "Local",
            texto: "De nada.",
            traduccion: "不客气。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Buscando un lugar",
        tituloChino: "找地方",
        personajes: ["Ana", "Pedro"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Necesito ir a la farmacia.",
            traduccion: "我需要去药店。",
          },
          {
            personaje: "Pedro",
            texto: "Hay una cerca de aquí.",
            traduccion: "这附近有一家。",
          },
          {
            personaje: "Ana",
            texto: "¿Dónde exactamente?",
            traduccion: "具体在哪里？",
          },
          {
            personaje: "Pedro",
            texto: "Está al lado del supermercado.",
            traduccion: "在超市旁边。",
          },
          {
            personaje: "Ana",
            texto: "¡Ah, ya la veo! Gracias.",
            traduccion: "啊，我看见了！谢谢。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Yendo al museo",
        tituloChino: "去博物馆",
        personajes: ["María", "Juan"],
        lineas: [
          {
            personaje: "María",
            texto: "Juan, ¿cómo llego al museo de arte?",
            traduccion: "胡安，我怎么去艺术博物馆？",
          },
          {
            personaje: "Juan",
            texto: "Es muy fácil. Toma la primera calle a la derecha.",
            traduccion: "很简单。在第一条街右转。",
          },
          {
            personaje: "María",
            texto: "¿Y después?",
            traduccion: "然后呢？",
          },
          {
            personaje: "Juan",
            texto: "Sigue recto hasta la plaza. El museo está enfrente de la iglesia.",
            traduccion: "直走到广场。博物馆在教堂对面。",
          },
          {
            personaje: "María",
            texto: "Gracias por tu ayuda.",
            traduccion: "谢谢你的帮助。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Describiendo tu ciudad",
        tituloChino: "描述你的城市",
        personajes: ["Laura", "David"],
        lineas: [
          {
            personaje: "Laura",
            texto: "David, ¿cómo es tu ciudad?",
            traduccion: "大卫，你的城市怎么样？",
          },
          {
            personaje: "David",
            texto: "Es una ciudad grande y muy animada.",
            traduccion: "这是一个很大很热闹的城市。",
          },
          {
            personaje: "Laura",
            texto: "¿Qué lugares interesantes hay?",
            traduccion: "有什么有趣的地方？",
          },
          {
            personaje: "David",
            texto: "Hay muchos museos, parques y un centro comercial enorme.",
            traduccion: "有很多博物馆、公园和一个巨大的购物中心。",
          },
          {
            personaje: "Laura",
            texto: "¿Y el transporte público?",
            traduccion: "公共交通呢？",
          },
          {
            personaje: "David",
            texto: "El metro y el autobús funcionan muy bien.",
            traduccion: "地铁和公交车运行得很好。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Dando indicaciones detalladas",
        tituloChino: "给出详细指示",
        personajes: ["Cliente", "Recepcionista"],
        lineas: [
          {
            personaje: "Cliente",
            texto: "Disculpe, ¿cómo se va a la estación de tren?",
            traduccion: "打扰一下，请问去火车站怎么走？",
          },
          {
            personaje: "Recepcionista",
            texto: "Salga del hotel, gire a la izquierda y siga dos calles.",
            traduccion: "出酒店，左转，直走两条街。",
          },
          {
            personaje: "Cliente",
            texto: "¿Y luego?",
            traduccion: "然后呢？",
          },
          {
            personaje: "Recepcionista",
            texto: "En la plaza, gire a la derecha. La estación está al final.",
            traduccion: "在广场，右转。火车站在尽头。",
          },
          {
            personaje: "Cliente",
            texto: "¿Cuánto se tarda?",
            traduccion: "需要多长时间？",
          },
          {
            personaje: "Recepcionista",
            texto: "Unos quince minutos andando.",
            traduccion: "步行约十五分钟。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "银行在哪里？¿Dónde está el _____?",
          preguntaChino: "银行在哪里？¿Dónde está el _____?",
          respuestaCorrecta: "banco",
          explicacion: "银行 = banco。",
          pista: "首字母是 b，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c2",
          pregunta: "直走：Sigue _____",
          preguntaChino: "直走：Sigue _____",
          respuestaCorrecta: "recto",
          explicacion: "'Sigue recto' = 直走。",
          pista: "首字母是 r，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c3",
          pregunta: "左转：Gira a la _____",
          preguntaChino: "左转：Gira a la _____",
          respuestaCorrecta: "izquierda",
          explicacion: "左边 = izquierda。",
          pista: "首字母是 i，9个字母",
          numeroLetras: 9,
        },
        {
          id: "c4",
          pregunta: "右转：Gira a la _____",
          preguntaChino: "右转：Gira a la _____",
          respuestaCorrecta: "derecha",
          explicacion: "右边 = derecha。",
          pista: "首字母是 d，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c5",
          pregunta: "超市在哪里？¿Dónde está el _____?",
          preguntaChino: "超市在哪里？¿Dónde está el _____?",
          respuestaCorrecta: "supermercado",
          explicacion: "超市 = supermercado。",
          pista: "首字母是 s，12个字母",
          numeroLetras: 12,
        },
        {
          id: "c6",
          pregunta: "在红绿灯：en el _____",
          preguntaChino: "在红绿灯：en el _____",
          respuestaCorrecta: "semáforo",
          explicacion: "Semáforo = 红绿灯",
          pista: "首字母是 s，8个字母",
          numeroLetras: 8,
        },
        {
          id: "c7",
          pregunta: "在拐角处：en la _____",
          preguntaChino: "在拐角处：en la _____",
          respuestaCorrecta: "esquina",
          explicacion: "Esquina = 拐角",
          pista: "首字母是 e，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c8",
          pregunta: "过马路：_____ la calle",
          preguntaChino: "过马路：_____ la calle",
          respuestaCorrecta: "Cruza",
          explicacion: "Cruzar la calle = 过马路",
          pista: "首字母是 C，5个字母",
          numeroLetras: 5,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "你在哪里买药？",
          preguntaChino: "你在哪里买药？",
          opciones: ["supermercado", "farmacia", "banco", "cine"],
          respuestaCorrecta: "farmacia",
          explicacion: "在药店买药。",
        },
        {
          id: "s2",
          pregunta: "你在哪里借书？",
          preguntaChino: "你在哪里借书？",
          opciones: ["museo", "biblioteca", "teatro", "restaurante"],
          respuestaCorrecta: "biblioteca",
          explicacion: "在图书馆借书。",
        },
        {
          id: "s3",
          pregunta: "'Sigue recto'是什么意思？",
          preguntaChino: "'Sigue recto'是什么意思？",
          opciones: ["左转", "右转", "直走", "过马路"],
          respuestaCorrecta: "直走",
          explicacion: "'Sigue recto' = 直走。",
        },
        {
          id: "s4",
          pregunta: "警察在哪里工作？",
          preguntaChino: "警察在哪里工作？",
          opciones: ["hospital", "escuela", "comisaría", "biblioteca"],
          respuestaCorrecta: "comisaría",
          explicacion: "警察在警察局工作。",
        },
        {
          id: "s5",
          pregunta: "在哪里可以取钱？",
          preguntaChino: "在哪里可以取钱？",
          opciones: ["banco", "farmacia", "supermercado", "cine"],
          respuestaCorrecta: "banco",
          explicacion: "在银行取钱。",
        },
        {
          id: "s6",
          pregunta: "¿Qué significa 'cuadra'?",
          preguntaChino: "'cuadra'是什么意思？",
          opciones: ["街区", "街道", "角落", "十字路口"],
          respuestaCorrecta: "街区",
          explicacion: "Cuadra = 街区",
        },
        {
          id: "s7",
          pregunta: "¿Dónde se puede ver una película?",
          preguntaChino: "在哪里可以看电影？",
          opciones: ["en el teatro", "en el cine", "en el museo", "en la biblioteca"],
          respuestaCorrecta: "en el cine",
          explicacion: "Cine = 电影院",
        },
        {
          id: "s8",
          pregunta: "¿Qué significa 'paso de cebra'?",
          preguntaChino: "'paso de cebra'是什么意思？",
          opciones: ["斑马线", "人行道", "车道", "红绿灯"],
          respuestaCorrecta: "斑马线",
          explicacion: "Paso de cebra = 斑马线",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Gira a la izquierda'意思是右转。",
          preguntaChino: "'Gira a la izquierda'意思是右转。",
          respuestaCorrecta: false,
          explicacion: "错。'Izquierda' = 左边。",
        },
        {
          id: "vf2",
          pregunta: "'Está cerca'意味着不远。",
          preguntaChino: "'Está cerca'意味着不远。",
          respuestaCorrecta: true,
          explicacion: "对。'Cerca'是'lejos'的反义词。",
        },
        {
          id: "vf3",
          pregunta: "银行是吃饭的地方。",
          preguntaChino: "银行是吃饭的地方。",
          respuestaCorrecta: false,
          explicacion: "错。银行是存钱的，餐厅是吃饭的。",
        },
        {
          id: "vf4",
          pregunta: "博物馆是看艺术品的地方。",
          preguntaChino: "博物馆是看艺术品的地方。",
          respuestaCorrecta: true,
          explicacion: "对。博物馆有艺术品。",
        },
        {
          id: "vf5",
          pregunta: "学校是学生学习的地方。",
          preguntaChino: "学校是学生学习的地方。",
          respuestaCorrecta: true,
          explicacion: "对。学校是学习的场所。",
        },
        {
          id: "vf6",
          pregunta: "El 'centro comercial' es un lugar para hacer ejercicio.",
          preguntaChino: "'Centro comercial'是锻炼的地方。",
          respuestaCorrecta: false,
          explicacion: "错。Es para comprar.",
        },
        {
          id: "vf7",
          pregunta: "El 'semáforo' regula el tráfico.",
          preguntaChino: "'Semáforo'调节交通。",
          respuestaCorrecta: true,
          explicacion: "对。Semáforo = 红绿灯",
        },
        {
          id: "vf8",
          pregunta: "La 'acera' es donde circulan los coches.",
          preguntaChino: "'Acera'是汽车行驶的地方。",
          respuestaCorrecta: false,
          explicacion: "错。Acera = sidewalk (peatones)",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "banco",
              derecha: "银行",
            },
            {
              izquierda: "hospital",
              derecha: "医院",
            },
            {
              izquierda: "escuela",
              derecha: "学校",
            },
            {
              izquierda: "biblioteca",
              derecha: "图书馆",
            },
            {
              izquierda: "farmacia",
              derecha: "药店",
            },
            {
              izquierda: "supermercado",
              derecha: "超市",
            },
            {
              izquierda: "restaurante",
              derecha: "餐厅",
            },
            {
              izquierda: "cine",
              derecha: "电影院",
            },
            {
              izquierda: "museo",
              derecha: "博物馆",
            },
            {
              izquierda: "parque",
              derecha: "公园",
            },
            {
              izquierda: "estación",
              derecha: "车站",
            },
            {
              izquierda: "aeropuerto",
              derecha: "机场",
            },
          ],
          explicacion: "将地点与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["banco", "está", "El", "cerca", "."],
          respuestaCorrecta: "El banco está cerca.",
          explicacion: "正确的句子是：El banco está cerca.（银行很近。）",
        },
        {
          id: "o2",
          palabras: ["derecha", "Gira", "a", "la", "semáforo", "en", "el", "."],
          respuestaCorrecta: "Gira a la derecha en el semáforo.",
          explicacion: "正确的句子是：Gira a la derecha en el semáforo.（在红绿灯右转。）",
        },
        {
          id: "o3",
          palabras: ["dónde", "está", "¿", "farmacia", "la", "?"],
          respuestaCorrecta: "¿Dónde está la farmacia?",
          explicacion: "正确的句子是：¿Dónde está la farmacia?（药店在哪里？）",
        },
        {
          id: "o4",
          palabras: ["está", "El", "supermercado", "lado", "farmacia", "al", "de", "la", "."],
          respuestaCorrecta: "El supermercado está al lado de la farmacia.",
          explicacion: "正确的顺序是：El supermercado está al lado de la farmacia.",
        },
        {
          id: "o5",
          palabras: ["pie", "minutos", "cinco", "Está", "a", "."],
          respuestaCorrecta: "Está a cinco minutos a pie.",
          explicacion: "正确的顺序是：Está a cinco minutos a pie.",
        },
        {
          id: "o6",
          palabras: ["calle", "cruza", "la", "semáforo", "el", "en", "."],
          respuestaCorrecta: "Cruza la calle en el semáforo.",
          explicacion: "正确的顺序是：Cruza la calle en el semáforo.",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "直走两个街区。",
          respuestaEsperada: "Sigue recto dos cuadras.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "图书馆在哪里？",
          respuestaEsperada: "¿Dónde está la biblioteca?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "在红绿灯左转。",
          respuestaEsperada: "Gira a la izquierda en el semáforo.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "超市在药店旁边。",
          respuestaEsperada: "El supermercado está al lado de la farmacia.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "步行需要十分钟。",
          respuestaEsperada: "Se tarda diez minutos a pie.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "我的城市又大又现代。",
          respuestaEsperada: "Mi ciudad es grande y moderna.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "警察局在哪里？",
          respuestaEsperada: "¿Dónde está la comisaría?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "在第一条街右转。",
          respuestaEsperada: "Toma la primera calle a la derecha.",
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
        instruccion: "用正确的地点词汇完成对话。",
        instruccionChino: "用正确的地点词汇完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "Disculpe, ¿dónde está el _____?",
            respuesta: "banco / hospital / museo",
          },
          {
            personaje: "B",
            texto: "Sigue _____ dos cuadras.",
            respuesta: "recto",
          },
          {
            personaje: "A",
            texto: "¿Está _____?",
            respuesta: "lejos / cerca",
          },
          {
            personaje: "B",
            texto: "No, está a cinco minutos a _____.",
            respuesta: "pie",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "darDirecciones",
        titulo: "Dar direcciones",
        tituloChino: "指路",
        instruccion: "Escribe las direcciones desde tu casa a la escuela o trabajo.",
        instruccionChino: "写出从你家到学校或工作地点的路线。",
        ejemplo:
          "Desde mi casa, sigo recto dos cuadras, giro a la izquierda en el parque y luego a la derecha en el semáforo. La escuela está al final de la calle.",
      },
      {
        id: "ep3",
        tipo: "describir",
        titulo: "Describe tu ciudad",
        tituloChino: "描述你的城市",
        instruccion: "Escribe 5-6 frases describiendo tu ciudad en español.",
        instruccionChino: "用西班牙语写5-6句话描述你的城市。",
        ejemplo:
          "Mi ciudad se llama Madrid. Es grande y moderna. Hay muchos museos, parques y restaurantes. El transporte público funciona muy bien. Me gusta vivir aquí porque hay mucha vida.",
      },
      {
        id: "ep4",
        tipo: "responder",
        titulo: "Responde las preguntas",
        tituloChino: "回答问题",
        instruccion: "Responde las siguientes preguntas sobre tu ciudad.",
        instruccionChino: "回答以下关于你城市的问题。",
        preguntas: [
          {
            pregunta: "¿Cómo se llama tu ciudad?",
            respuestaEsperada: "Mi ciudad se llama (nombre).",
          },
          {
            pregunta: "¿Qué lugares interesantes hay?",
            respuestaEsperada: "Hay (museos, parques, monumentos...).",
          },
          {
            pregunta: "¿Te gusta tu ciudad? ¿Por qué?",
            respuestaEsperada: "Sí, me gusta porque... / No, no me gusta porque...",
          },
        ],
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Dónde está el banco más cercano a tu casa?",
        preguntaChino: "离你家最近的银行在哪里？",
        sugerencia: "El banco está en la calle..., cerca de...",
        sugerenciaChino: "El banco está en la calle..., cerca de...",
      },
      {
        id: "pa2",
        pregunta: "¿Cómo se va de tu casa a la escuela o trabajo?",
        preguntaChino: "从你家怎么去学校或工作地点？",
        sugerencia: "Salgo de casa, sigo recto, giro a la izquierda...",
        sugerenciaChino: "Salgo de casa, sigo recto, giro a la izquierda...",
      },
      {
        id: "pa3",
        pregunta: "Describe tu ciudad o barrio favorito.",
        preguntaChino: "描述你最喜欢的城市或社区。",
        sugerencia: "Mi ciudad tiene una plaza grande, un parque bonito y muchos restaurantes.",
        sugerenciaChino: "Mi ciudad tiene una plaza grande, un parque bonito y muchos restaurantes.",
      },
      {
        id: "pa4",
        pregunta: "¿Qué lugares recomiendas visitar en tu ciudad?",
        preguntaChino: "你推荐在你的城市参观哪些地方？",
        sugerencia: "Recomiendo visitar el museo, el parque y la plaza principal.",
        sugerenciaChino: "Recomiendo visitar el museo, el parque y la plaza principal.",
      },
      {
        id: "pa5",
        pregunta: "¿Prefieres el centro o las afueras? ¿Por qué?",
        preguntaChino: "你更喜欢市中心还是郊区？为什么？",
        sugerencia:
          "Prefiero el centro porque está cerca de todo. / Prefiero las afueras porque es más tranquilo.",
        sugerenciaChino:
          "Prefiero el centro porque está cerca de todo. / Prefiero las afueras porque es más tranquilo.",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '银行' en español?",
        preguntaChino: "西班牙语中'银行'怎么说？",
        respuestaSugerida: "banco",
        respuestaSugeridaChino: "banco",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '左转' en español?",
        preguntaChino: "西班牙语中'左转'怎么说？",
        respuestaSugerida: "girar a la izquierda",
        respuestaSugeridaChino: "girar a la izquierda",
      },
      {
        id: "p3",
        pregunta: "¿Qué significa 'Sigue recto'?",
        preguntaChino: "'Sigue recto'是什么意思？",
        respuestaSugerida: "直走",
        respuestaSugeridaChino: "Go straight",
      },
      {
        id: "p4",
        pregunta: "¿Dónde está la farmacia más cercana a tu casa?",
        preguntaChino: "离你家最近的药店在哪里？",
        respuestaSugerida: "Está en la calle...",
        respuestaSugeridaChino: "Está en la calle...",
      },
      {
        id: "p5",
        pregunta: "¿Qué significa 'semáforo'?",
        preguntaChino: "'semáforo'是什么意思？",
        respuestaSugerida: "Traffic light / 红绿灯",
        respuestaSugeridaChino: "红绿灯",
      },
      {
        id: "p6",
        pregunta: "¿Cómo se dice '步行街' en español?",
        preguntaChino: "西班牙语中'步行街'怎么说？",
        respuestaSugerida: "calle peatonal",
        respuestaSugeridaChino: "calle peatonal",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Animales domésticos (mascotas)",
        tituloChino: "家养动物（宠物）",
        descripcion: `🔹 MASCOTAS COMUNES (common pets):

• perro = dog
• gato = cat
• pájaro = bird
• pez = fish
• conejo = rabbit
• hámster = hamster
• cobaya / conejillo de indias = guinea pig
• tortuga = turtle
• loro = parrot
• hurón = ferret
• ratón = mouse
• serpiente = snake (exotic pet)

🔹 VERBOS RELACIONADOS CON MASCOTAS:
• ladrar (el perro) = to bark
• maullar (el gato) = to meow
• volar (el pájaro) = to fly
• nadar (el pez) = to swim
• saltar (el conejo) = to jump
• comer = to eat
• dormir = to sleep
• jugar = to play

🔹 CUIDADO DE MASCOTAS:
• pasear al perro = to walk the dog
• alimentar = to feed
• cepillar = to brush
• bañar = to bathe
• llevar al veterinario = to take to the vet

📌 EJEMPLOS:
• Tengo un perro muy juguetón.
• Mi gato duerme todo el día.
• Los peces necesitan agua limpia.`,
        descripcionChino: `🔹 常见的宠物：

• perro = 狗
• gato = 猫
• pájaro = 鸟
• pez = 鱼
• conejo = 兔子
• hámster = 仓鼠
• cobaya / conejillo de indias = 豚鼠
• tortuga = 乌龟
• loro = 鹦鹉
• hurón = 雪貂
• ratón = 老鼠
• serpiente = 蛇（异域宠物）

🔹 与宠物相关的动词：
• ladrar（狗）= 叫
• maullar（猫）= 喵喵叫
• volar（鸟）= 飞
• nadar（鱼）= 游
• saltar（兔子）= 跳
• comer = 吃
• dormir = 睡
• jugar = 玩

🔹 宠物护理：
• pasear al perro = 遛狗
• alimentar = 喂食
• cepillar = 刷毛
• bañar = 洗澡
• llevar al veterinario = 带去看兽医

📌 例子：
• Tengo un perro muy juguetón. = 我有一只很爱玩的狗。
• Mi gato duerme todo el día. = 我的猫整天睡觉。
• Los peces necesitan agua limpia. = 鱼需要干净的水。`,
        ejemplos: [
          {
            espanol: "Tengo un perro muy juguetón.",
            chino: "我有一只很爱玩的狗。",
          },
          {
            espanol: "Mi gato duerme todo el día.",
            chino: "我的猫整天睡觉。",
          },
          {
            espanol: "Los peces necesitan agua limpia.",
            chino: "鱼需要干净的水。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Animales salvajes",
        tituloChino: "野生动物",
        descripcion: `🔹 ANIMALES SALVAJES (wild animals):

MAMÍFEROS (mammals):
• león = lion
• leona = lioness
• tigre = tiger
• elefante = elephant
• jirafa = giraffe
• mono = monkey
• oso = bear
• lobo = wolf
• zorro = fox
• ciervo = deer
• cebra = zebra
• hipopótamo = hippopotamus
• rinoceronte = rhinoceros
• canguro = kangaroo
• koala = koala
• panda = panda
• jaguar = jaguar
• pantera = panther
• hiena = hyena

AVES (birds):
• águila = eagle
• búho = owl
• lechuza = barn owl
• pingüino = penguin
• flamenco = flamingo
• avestruz = ostrich

REPTILES Y ANFIBIOS (reptiles and amphibians):
• serpiente = snake
• cocodrilo = crocodile
• lagarto = lizard
• rana = frog
• sapo = toad

ANIMALES MARINOS (marine animals):
• delfín = dolphin
• ballena = whale
• tiburón = shark
• pulpo = octopus
• calamar = squid
• medusa = jellyfish

INSECTOS (insects):
• abeja = bee
• mariposa = butterfly
• hormiga = ant
• araña = spider
• mosquito = mosquito
• libélula = dragonfly

🔹 CARACTERÍSTICAS:
• El león es el rey de la selva.
• La jirafa tiene el cuello largo.
• El elefante es muy grande.`,
        descripcionChino: `🔹 野生动物：

哺乳动物：
• león = 狮子
• leona = 母狮
• tigre = 老虎
• elefante = 大象
• jirafa = 长颈鹿
• mono = 猴子
• oso = 熊
• lobo = 狼
• zorro = 狐狸
• ciervo = 鹿
• cebra = 斑马
• hipopótamo = 河马
• rinoceronte = 犀牛
• canguro = 袋鼠
• koala = 考拉
• panda = 熊猫
• jaguar = 美洲豹
• pantera = 黑豹
• hiena = 鬣狗

鸟类：
• águila = 鹰
• búho = 猫头鹰
• lechuza = 仓鸮
• pingüino = 企鹅
• flamenco = 火烈鸟
• avestruz = 鸵鸟

爬行动物和两栖动物：
• serpiente = 蛇
• cocodrilo = 鳄鱼
• lagarto = 蜥蜴
• rana = 青蛙
• sapo = 蟾蜍

海洋动物：
• delfín = 海豚
• ballena = 鲸鱼
• tiburón = 鲨鱼
• pulpo = 章鱼
• calamar = 鱿鱼
• medusa = 水母

昆虫：
• abeja = 蜜蜂
• mariposa = 蝴蝶
• hormiga = 蚂蚁
• araña = 蜘蛛
• mosquito = 蚊子
• libélula = 蜻蜓

🔹 特征：
• El león es el rey de la selva. = 狮子是丛林之王。
• La jirafa tiene el cuello largo. = 长颈鹿有长脖子。
• El elefante es muy grande. = 大象非常大。`,
        ejemplos: [
          {
            espanol: "El león es el rey de la selva.",
            chino: "狮子是丛林之王。",
          },
          {
            espanol: "Los elefantes tienen buena memoria.",
            chino: "大象记忆力很好。",
          },
          {
            espanol: "La jirafa tiene el cuello muy largo.",
            chino: "长颈鹿的脖子很长。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Animales de granja",
        tituloChino: "农场动物",
        descripcion: `🔹 ANIMALES DE GRANJA (farm animals):

• vaca = cow
• toro = bull
• ternero = calf
• cerdo = pig
• caballo = horse
• oveja = sheep
• cordero = lamb
• gallina = hen
• gallo = rooster
• pollito = chick
• pato = duck
• cabra = goat
• burro = donkey
• mula = mule

🔹 PRODUCTOS DE LOS ANIMALES (animal products):
• la vaca da leche = cow gives milk
• la gallina da huevos = hen gives eggs
• la oveja da lana = sheep gives wool
• el cerdo da carne = pig gives meat

🔹 SONIDOS DE ANIMALES (animal sounds):
• la vaca muge = cow moos
• el caballo relincha = horse neighs
• la oveja bala = sheep bleats
• el gallo canta (quiquiriquí) = rooster crows (cock-a-doodle-doo)
• el perro ladra (guau guau) = dog barks (woof woof)
• el gato maúlla (miau) = cat meows (meow)
• el pato hace "cuac cuac" = duck says "quack quack"
• la rana croa (croac croac) = frog croaks (ribbit)

📌 EJEMPLOS:
• Las vacas dan leche.
• Los caballos corren rápido.
• El gallo canta por la mañana.`,
        descripcionChino: `🔹 农场动物：

• vaca = 牛
• toro = 公牛
• ternero = 小牛
• cerdo = 猪
• caballo = 马
• oveja = 羊
• cordero = 羔羊
• gallina = 母鸡
• gallo = 公鸡
• pollito = 小鸡
• pato = 鸭子
• cabra = 山羊
• burro = 驴
• mula = 骡子

🔹 动物产品：
• la vaca da leche = 牛产奶
• la gallina da huevos = 母鸡下蛋
• la oveja da lana = 羊产羊毛
• el cerdo da carne = 猪提供肉

🔹 动物的叫声：
• la vaca muge = 牛叫（哞）
• el caballo relincha = 马嘶
• la oveja bala = 羊叫（咩）
• el gallo canta (quiquiriquí) = 公鸡打鸣（喔喔喔）
• el perro ladra (guau guau) = 狗叫（汪汪）
• el gato maúlla (miau) = 猫叫（喵喵）
• el pato hace "cuac cuac" = 鸭子叫（嘎嘎）
• la rana croa (croac croac) = 青蛙叫（呱呱）

📌 例子：
• Las vacas dan leche. = 牛产奶。
• Los caballos corren rápido. = 马跑得很快。
• El gallo canta por la mañana. = 公鸡早上打鸣。`,
        ejemplos: [
          {
            espanol: "Las vacas dan leche.",
            chino: "牛产奶。",
          },
          {
            espanol: "Los caballos corren rápido.",
            chino: "马跑得很快。",
          },
          {
            espanol: "El gallo canta por la mañana.",
            chino: "公鸡早上打鸣。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Hablar de animales",
        tituloChino: "谈论动物",
        descripcion: `🔹 PREGUNTAS COMUNES (common questions):
• ¿Tienes mascota? (Do you have a pet?)
• ¿Qué animales te gustan? (What animals do you like?)
• ¿Cuál es tu animal favorito? (What's your favorite animal?)
• ¿Tienes miedo a algún animal? (Are you afraid of any animal?)
• ¿Has visitado un zoo? (Have you visited a zoo?)

🔹 RESPUESTAS:
• Sí, tengo un perro que se llama...
• Me gustan los gatos porque son independientes.
• Mi animal favorito es el delfín.
• Le tengo miedo a las serpientes.
• He visitado el zoo varias veces.

🔹 DESCRIBIR ANIMALES (describing animals):
• Es grande / pequeño = It's big / small
• Tiene el pelo largo / corto = It has long / short hair
• Es de color... = It's... color
• Puede volar / nadar / correr = It can fly / swim / run
• Vive en la selva / el mar / la granja = It lives in the jungle / sea / farm

🔹 ADJETIVOS PARA DESCRIBIR ANIMALES:
• feroz = fierce
• dócil = tame
• salvaje = wild
• doméstico = domestic
• exótico = exotic
• peligroso = dangerous
• inofensivo = harmless
• rápido = fast
• lento = slow

📌 EJEMPLOS:
• Mi animal favorito es el perro porque es fiel.
• El tiburón es peligroso.
• Las tortugas son lentas.`,
        descripcionChino: `🔹 常见问题：
• ¿Tienes mascota? = 你有宠物吗？
• ¿Qué animales te gustan? = 你喜欢什么动物？
• ¿Cuál es tu animal favorito? = 你最喜欢的动物是什么？
• ¿Tienes miedo a algún animal? = 你害怕任何动物吗？
• ¿Has visitado un zoo? = 你去过动物园吗？

🔹 回答：
• Sí, tengo un perro que se llama... = 是的，我有一只狗叫...
• Me gustan los gatos porque son independientes. = 我喜欢猫，因为它们独立。
• Mi animal favorito es el delfín. = 我最喜欢的动物是海豚。
• Le tengo miedo a las serpientes. = 我害怕蛇。
• He visitado el zoo varias veces. = 我去过动物园好几次。

🔹 描述动物：
• Es grande / pequeño = 它很大/很小
• Tiene el pelo largo / corto = 它有长/短毛
• Es de color... = 它是...颜色的
• Puede volar / nadar / correr = 它会飞/游泳/跑
• Vive en la selva / el mar / la granja = 它生活在丛林/大海/农场

🔹 描述动物的形容词：
• feroz = 凶猛的
• dócil = 温顺的
• salvaje = 野生的
• doméstico = 家养的
• exótico = 异域的
• peligroso = 危险的
• inofensivo = 无害的
• rápido = 快的
• lento = 慢的

📌 例子：
• Mi animal favorito es el perro porque es fiel. = 我最喜欢的动物是狗，因为它忠诚。
• El tiburón es peligroso. = 鲨鱼是危险的。
• Las tortugas son lentas. = 乌龟很慢。`,
        ejemplos: [
          {
            espanol: "Mi animal favorito es el perro.",
            chino: "我最喜欢的动物是狗。",
          },
          {
            espanol: "El tiburón es un animal peligroso.",
            chino: "鲨鱼是一种危险的动物。",
          },
          {
            espanol: "Las tortugas son muy lentas.",
            chino: "乌龟很慢。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "perro",
        chino: "狗",
        ejemplo: "Mi perro es grande.",
      },
      {
        id: "v2",
        espanol: "gato",
        chino: "猫",
        ejemplo: "El gato es negro.",
      },
      {
        id: "v3",
        espanol: "pájaro",
        chino: "鸟",
        ejemplo: "El pájaro canta.",
      },
      {
        id: "v4",
        espanol: "pez",
        chino: "鱼",
        ejemplo: "El pez nada.",
      },
      {
        id: "v5",
        espanol: "conejo",
        chino: "兔子",
        ejemplo: "El conejo salta.",
      },
      {
        id: "v6",
        espanol: "hámster",
        chino: "仓鼠",
        ejemplo: "El hámster es pequeño.",
      },
      {
        id: "v7",
        espanol: "tortuga",
        chino: "乌龟",
        ejemplo: "La tortuga es lenta.",
      },
      {
        id: "v8",
        espanol: "loro",
        chino: "鹦鹉",
        ejemplo: "El loro habla.",
      },
      {
        id: "v9",
        espanol: "león",
        chino: "狮子",
        ejemplo: "El león ruge.",
      },
      {
        id: "v10",
        espanol: "leona",
        chino: "母狮",
        ejemplo: "La leona caza.",
      },
      {
        id: "v11",
        espanol: "tigre",
        chino: "老虎",
        ejemplo: "El tigre es rayado.",
      },
      {
        id: "v12",
        espanol: "elefante",
        chino: "大象",
        ejemplo: "El elefante es grande.",
      },
      {
        id: "v13",
        espanol: "jirafa",
        chino: "长颈鹿",
        ejemplo: "La jirafa es alta.",
      },
      {
        id: "v14",
        espanol: "mono",
        chino: "猴子",
        ejemplo: "El mono trepa.",
      },
      {
        id: "v15",
        espanol: "oso",
        chino: "熊",
        ejemplo: "El oso hiberna.",
      },
      {
        id: "v16",
        espanol: "lobo",
        chino: "狼",
        ejemplo: "El lobo aúlla.",
      },
      {
        id: "v17",
        espanol: "zorro",
        chino: "狐狸",
        ejemplo: "El zorro es astuto.",
      },
      {
        id: "v18",
        espanol: "vaca",
        chino: "牛",
        ejemplo: "La vaca da leche.",
      },
      {
        id: "v19",
        espanol: "cerdo",
        chino: "猪",
        ejemplo: "El cerdo es rosa.",
      },
      {
        id: "v20",
        espanol: "caballo",
        chino: "马",
        ejemplo: "El caballo corre.",
      },
      {
        id: "v21",
        espanol: "oveja",
        chino: "羊",
        ejemplo: "La oveja es blanca.",
      },
      {
        id: "v22",
        espanol: "gallina",
        chino: "母鸡",
        ejemplo: "La gallina pone huevos.",
      },
      {
        id: "v23",
        espanol: "gallo",
        chino: "公鸡",
        ejemplo: "El gallo canta.",
      },
      {
        id: "v24",
        espanol: "pato",
        chino: "鸭子",
        ejemplo: "El pato nada.",
      },
      {
        id: "v25",
        espanol: "cabra",
        chino: "山羊",
        ejemplo: "La cabra salta.",
      },
      {
        id: "v26",
        espanol: "delfín",
        chino: "海豚",
        ejemplo: "El delfín es inteligente.",
      },
      {
        id: "v27",
        espanol: "ballena",
        chino: "鲸鱼",
        ejemplo: "La ballena es enorme.",
      },
      {
        id: "v28",
        espanol: "tiburón",
        chino: "鲨鱼",
        ejemplo: "El tiburón es peligroso.",
      },
      {
        id: "v29",
        espanol: "abeja",
        chino: "蜜蜂",
        ejemplo: "La abeja hace miel.",
      },
      {
        id: "v30",
        espanol: "mariposa",
        chino: "蝴蝶",
        ejemplo: "La mariposa vuela.",
      },
      {
        id: "v31",
        espanol: "araña",
        chino: "蜘蛛",
        ejemplo: "La araña teje telarañas.",
      },
      {
        id: "v32",
        espanol: "mascota",
        chino: "宠物",
        ejemplo: "Mi mascota es un perro.",
      },
      {
        id: "v33",
        espanol: "zoológico",
        chino: "动物园",
        ejemplo: "Vamos al zoológico.",
      },
      {
        id: "v34",
        espanol: "veterinario",
        chino: "兽医",
        ejemplo: "Llevo al perro al veterinario.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Hablando de mascotas",
        tituloChino: "谈论宠物",
        personajes: ["Ana", "Carlos"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Carlos, ¿tienes mascotas?",
            traduccion: "卡洛斯，你有宠物吗？",
          },
          {
            personaje: "Carlos",
            texto: "Sí, tengo un perro y un gato.",
            traduccion: "是的，我有一只狗和一只猫。",
          },
          {
            personaje: "Ana",
            texto: "¡Qué suerte! ¿Cómo se llaman?",
            traduccion: "真幸运！它们叫什么名字？",
          },
          {
            personaje: "Carlos",
            texto: "El perro se llama Max y el gato Luna.",
            traduccion: "狗叫Max，猫叫Luna。",
          },
          {
            personaje: "Ana",
            texto: "¿Te gustan los animales?",
            traduccion: "你喜欢动物吗？",
          },
          {
            personaje: "Carlos",
            texto: "Me encantan, especialmente los perros.",
            traduccion: "我很喜欢，特别是狗。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "En el zoológico",
        tituloChino: "在动物园",
        personajes: ["Niño", "Madre"],
        lineas: [
          {
            personaje: "Niño",
            texto: "Mamá, ¡mira ese elefante! Es enorme.",
            traduccion: "妈妈，看那头大象！好大啊。",
          },
          {
            personaje: "Madre",
            texto: "Sí, y mira la jirafa. Tiene el cuello muy largo.",
            traduccion: "是的，看那只长颈鹿。脖子很长。",
          },
          {
            personaje: "Niño",
            texto: "¿Podemos ver los leones ahora?",
            traduccion: "我们现在能去看狮子吗？",
          },
          {
            personaje: "Madre",
            texto: "Claro, vamos a la zona de los felinos.",
            traduccion: "当然，我们去猫科动物区。",
          },
          {
            personaje: "Niño",
            texto: "¡El león está rugiendo! Qué fuerte.",
            traduccion: "狮子在吼叫！好大声。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "En la granja",
        tituloChino: "在农场",
        personajes: ["María", "Granjero"],
        lineas: [
          {
            personaje: "María",
            texto: "¿Qué animales tiene en la granja?",
            traduccion: "您的农场里有什么动物？",
          },
          {
            personaje: "Granjero",
            texto: "Tengo vacas, caballos, ovejas y gallinas.",
            traduccion: "我有牛、马、羊和母鸡。",
          },
          {
            personaje: "María",
            texto: "¿Las vacas dan leche?",
            traduccion: "牛产奶吗？",
          },
          {
            personaje: "Granjero",
            texto: "Sí, todas las mañanas. Y las gallinas ponen huevos.",
            traduccion: "是的，每天早上。母鸡下蛋。",
          },
          {
            personaje: "María",
            texto: "¡Qué interesante! Me encanta la vida en el campo.",
            traduccion: "真有趣！我喜欢乡村生活。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Animales favoritos",
        tituloChino: "最喜欢的动物",
        personajes: ["Laura", "David"],
        lineas: [
          {
            personaje: "Laura",
            texto: "David, ¿cuál es tu animal favorito?",
            traduccion: "大卫，你最喜欢的动物是什么？",
          },
          {
            personaje: "David",
            texto: "Mi animal favorito es el delfín. Son muy inteligentes.",
            traduccion: "我最喜欢的动物是海豚。它们非常聪明。",
          },
          {
            personaje: "Laura",
            texto: "¿Has visto alguno en vivo?",
            traduccion: "你见过活的吗？",
          },
          {
            personaje: "David",
            texto: "Sí, en un acuario. Nadaban muy rápido.",
            traduccion: "是的，在一个水族馆。它们游得非常快。",
          },
          {
            personaje: "Laura",
            texto: "Yo prefiero los perros. Son fieles y juguetones.",
            traduccion: "我更喜欢狗。它们忠诚又爱玩。",
          },
          {
            personaje: "David",
            texto: "¿Tienes perro?",
            traduccion: "你有狗吗？",
          },
          {
            personaje: "Laura",
            texto: "Sí, una perrita que se llama Lola.",
            traduccion: "是的，一只母狗叫Lola。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Miedo a los animales",
        tituloChino: "害怕动物",
        personajes: ["Sofía", "Javier"],
        lineas: [
          {
            personaje: "Sofía",
            texto: "Javier, ¿tienes miedo a algún animal?",
            traduccion: "哈维尔，你害怕任何动物吗？",
          },
          {
            personaje: "Javier",
            texto: "Sí, les tengo miedo a las serpientes. Me dan escalofríos.",
            traduccion: "是的，我害怕蛇。它们让我起鸡皮疙瘩。",
          },
          {
            personaje: "Sofía",
            texto: "Yo también. Y también a las arañas.",
            traduccion: "我也是。还有蜘蛛。",
          },
          {
            personaje: "Javier",
            texto: "Pero los perros y los gatos me encantan.",
            traduccion: "但我喜欢狗和猫。",
          },
          {
            personaje: "Sofía",
            texto: "¿Quieres tener una mascota?",
            traduccion: "你想要养宠物吗？",
          },
          {
            personaje: "Javier",
            texto: "Me gustaría un gato. Son más independientes.",
            traduccion: "我想要一只猫。它们更独立。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "狗汪汪叫：El perro _____",
          preguntaChino: "狗汪汪叫：El perro _____",
          respuestaCorrecta: "ladra",
          explicacion: "Ladrar = 叫（狗）",
          pista: "首字母是 l，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c2",
          pregunta: "猫喵喵叫：El gato _____",
          preguntaChino: "猫喵喵叫：El gato _____",
          respuestaCorrecta: "maúlla",
          explicacion: "Maullar = 喵喵叫",
          pista: "首字母是 m，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c3",
          pregunta: "鸟飞：El pájaro _____",
          preguntaChino: "鸟飞：El pájaro _____",
          respuestaCorrecta: "vuela",
          explicacion: "Volar = 飞",
          pista: "首字母是 v，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c4",
          pregunta: "鱼游：El pez _____",
          preguntaChino: "鱼游：El pez _____",
          respuestaCorrecta: "nada",
          explicacion: "Nadar = 游",
          pista: "首字母是 n，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c5",
          pregunta: "牛哞哞叫：La vaca _____",
          preguntaChino: "牛哞哞叫：La vaca _____",
          respuestaCorrecta: "muge",
          explicacion: "Mugir = 牛叫",
          pista: "首字母是 m，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c6",
          pregunta: "马嘶：El caballo _____",
          preguntaChino: "马嘶：El caballo _____",
          respuestaCorrecta: "relincha",
          explicacion: "Relinchar = 马嘶",
          pista: "首字母是 r，8个字母",
          numeroLetras: 8,
        },
        {
          id: "c7",
          pregunta: "羊咩咩叫：La oveja _____",
          preguntaChino: "羊咩咩叫：La oveja _____",
          respuestaCorrecta: "bala",
          explicacion: "Balar = 羊叫",
          pista: "首字母是 b，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c8",
          pregunta: "公鸡打鸣：El gallo _____",
          preguntaChino: "公鸡打鸣：El gallo _____",
          respuestaCorrecta: "canta",
          explicacion: "Cantar = 叫/唱歌（公鸡）",
          pista: "首字母是 c，5个字母",
          numeroLetras: 5,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "哪个动物是'人类最好的朋友'？",
          preguntaChino: "哪个动物是'人类最好的朋友'？",
          opciones: ["gato", "perro", "pájaro", "pez"],
          respuestaCorrecta: "perro",
          explicacion: "狗是公认的人类最好的朋友",
        },
        {
          id: "s2",
          pregunta: "哪种动物有长脖子？",
          preguntaChino: "哪种动物有长脖子？",
          opciones: ["elefante", "jirafa", "león", "tigre"],
          respuestaCorrecta: "jirafa",
          explicacion: "长颈鹿有长脖子",
        },
        {
          id: "s3",
          pregunta: "哪种动物产奶？",
          preguntaChino: "哪种动物产奶？",
          opciones: ["gallina", "vaca", "cerdo", "caballo"],
          respuestaCorrecta: "vaca",
          explicacion: "牛产奶",
        },
        {
          id: "s4",
          pregunta: "哪种动物会飞？",
          preguntaChino: "哪种动物会飞？",
          opciones: ["pez", "perro", "pájaro", "conejo"],
          respuestaCorrecta: "pájaro",
          explicacion: "鸟会飞",
        },
        {
          id: "s5",
          pregunta: "动物园里可以看到哪种动物？",
          preguntaChino: "动物园里可以看到哪种动物？",
          opciones: ["vaca", "gallina", "león", "oveja"],
          respuestaCorrecta: "león",
          explicacion: "狮子通常生活在动物园或野外",
        },
        {
          id: "s6",
          pregunta: "¿Qué animal es el 'rey de la selva'?",
          preguntaChino: "哪个动物是'丛林之王'？",
          opciones: ["tigre", "león", "elefante", "jirafa"],
          respuestaCorrecta: "león",
          explicacion: "El león es el rey de la selva",
        },
        {
          id: "s7",
          pregunta: "¿Qué animal pone huevos?",
          preguntaChino: "哪种动物下蛋？",
          opciones: ["vaca", "oveja", "gallina", "caballo"],
          respuestaCorrecta: "gallina",
          explicacion: "La gallina pone huevos",
        },
        {
          id: "s8",
          pregunta: "¿Cómo se dice 'dolphin' en español?",
          preguntaChino: "西班牙语中'dolphin'怎么说？",
          opciones: ["ballena", "tiburón", "delfín", "pulpo"],
          respuestaCorrecta: "delfín",
          explicacion: "Delfín = 海豚",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "鱼会飞。",
          preguntaChino: "鱼会飞。",
          respuestaCorrecta: false,
          explicacion: "错。鱼会游泳，不会飞。",
        },
        {
          id: "vf2",
          pregunta: "猫喵喵叫。",
          preguntaChino: "猫喵喵叫。",
          respuestaCorrecta: true,
          explicacion: "对。El gato maúlla.",
        },
        {
          id: "vf3",
          pregunta: "牛产羊毛。",
          preguntaChino: "牛产羊毛。",
          respuestaCorrecta: false,
          explicacion: "错。牛产奶，羊产羊毛。",
        },
        {
          id: "vf4",
          pregunta: "狮子是丛林之王。",
          preguntaChino: "狮子是丛林之王。",
          respuestaCorrecta: true,
          explicacion: "对。El león es el rey de la selva.",
        },
        {
          id: "vf5",
          pregunta: "鸡会游泳。",
          preguntaChino: "鸡会游泳。",
          respuestaCorrecta: false,
          explicacion: "错。鸡不会游泳，鸭子会游泳。",
        },
        {
          id: "vf6",
          pregunta: "El elefante es el animal más grande de la tierra.",
          preguntaChino: "大象是陆地上最大的动物。",
          respuestaCorrecta: true,
          explicacion: "对。El elefante es muy grande.",
        },
        {
          id: "vf7",
          pregunta: "Los pingüinos pueden volar.",
          preguntaChino: "企鹅会飞。",
          respuestaCorrecta: false,
          explicacion: "错。Los pingüinos no vuelan.",
        },
        {
          id: "vf8",
          pregunta: "Las abejas producen miel.",
          preguntaChino: "蜜蜂产蜂蜜。",
          respuestaCorrecta: true,
          explicacion: "对。Las abejas hacen miel.",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "perro",
              derecha: "狗",
            },
            {
              izquierda: "gato",
              derecha: "猫",
            },
            {
              izquierda: "pájaro",
              derecha: "鸟",
            },
            {
              izquierda: "pez",
              derecha: "鱼",
            },
            {
              izquierda: "león",
              derecha: "狮子",
            },
            {
              izquierda: "elefante",
              derecha: "大象",
            },
            {
              izquierda: "jirafa",
              derecha: "长颈鹿",
            },
            {
              izquierda: "vaca",
              derecha: "牛",
            },
            {
              izquierda: "caballo",
              derecha: "马",
            },
            {
              izquierda: "gallina",
              derecha: "母鸡",
            },
            {
              izquierda: "delfín",
              derecha: "海豚",
            },
            {
              izquierda: "tiburón",
              derecha: "鲨鱼",
            },
            {
              izquierda: "abeja",
              derecha: "蜜蜂",
            },
            {
              izquierda: "mariposa",
              derecha: "蝴蝶",
            },
          ],
          explicacion: "将动物与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["perro", "Mi", "llama", "Max", "se", "."],
          respuestaCorrecta: "Mi perro se llama Max.",
          explicacion: "正确的句子是：Mi perro se llama Max.（我的狗叫Max。）",
        },
        {
          id: "o2",
          palabras: ["jirafa", "La", "cuello", "largo", "tiene", "."],
          respuestaCorrecta: "La jirafa tiene el cuello largo.",
          explicacion: "正确的句子是：La jirafa tiene el cuello largo.（长颈鹿有长脖子。）",
        },
        {
          id: "o3",
          palabras: ["leche", "Las", "vacas", "dan", "."],
          respuestaCorrecta: "Las vacas dan leche.",
          explicacion: "正确的句子是：Las vacas dan leche.（牛产奶。）",
        },
        {
          id: "o4",
          palabras: ["mascota", "tener", "me", "gustaría", "una", "."],
          respuestaCorrecta: "Me gustaría tener una mascota.",
          explicacion: "正确的顺序是：Me gustaría tener una mascota.",
        },
        {
          id: "o5",
          palabras: ["animal", "favorito", "delfín", "Mi", "es", "el", "."],
          respuestaCorrecta: "Mi animal favorito es el delfín.",
          explicacion: "正确的顺序是：Mi animal favorito es el delfín.",
        },
        {
          id: "o6",
          palabras: ["miedo", "arañas", "les", "tengo", "a", "las", "."],
          respuestaCorrecta: "Les tengo miedo a las arañas.",
          explicacion: "正确的顺序是：Les tengo miedo a las arañas.",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我有一只狗。",
          respuestaEsperada: "Tengo un perro.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "猫在睡觉。",
          respuestaEsperada: "El gato duerme.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "大象很大。",
          respuestaEsperada: "El elefante es grande.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "农场里有牛和马。",
          respuestaEsperada: "En la granja hay vacas y caballos.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "我最喜欢的动物是海豚。",
          respuestaEsperada: "Mi animal favorito es el delfín.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "我害怕蛇。",
          respuestaEsperada: "Les tengo miedo a las serpientes.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "鸟会飞。",
          respuestaEsperada: "Los pájaros vuelan.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "乌龟很慢。",
          respuestaEsperada: "Las tortugas son lentas.",
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
        instruccion: "用正确的动物词汇完成对话。",
        instruccionChino: "用正确的动物词汇完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿Tienes _____?",
            respuesta: "mascotas",
          },
          {
            personaje: "B",
            texto: "Sí, tengo un _____ y un _____.",
            respuesta: "perro / gato",
          },
          {
            personaje: "A",
            texto: "¿Cómo se _____?",
            respuesta: "llaman",
          },
          {
            personaje: "B",
            texto: "Se llaman Max y _____.",
            respuesta: "Luna",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "responder",
        titulo: "Responde las preguntas",
        tituloChino: "回答问题",
        instruccion: "Responde las siguientes preguntas sobre animales en español.",
        instruccionChino: "用西班牙语回答以下关于动物的问题。",
        preguntas: [
          {
            pregunta: "¿Tienes mascota? ¿Cuál?",
            respuestaEsperada: "Sí, tengo un perro. / No, no tengo mascota.",
          },
          {
            pregunta: "¿Cuál es tu animal favorito?",
            respuestaEsperada: "Mi animal favorito es (el perro / el gato / el león).",
          },
          {
            pregunta: "¿Qué animales hay en la granja?",
            respuestaEsperada: "En la granja hay vacas, caballos, ovejas y gallinas.",
          },
          {
            pregunta: "¿Has visitado un zoológico?",
            respuestaEsperada: "Sí, he visitado el zoológico. / No, nunca he ido.",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "clasificar",
        titulo: "Clasifica los animales",
        tituloChino: "分类动物",
        instruccion: "Clasifica cada animal como doméstico, salvaje o de granja.",
        instruccionChino: "将每个动物分类为家养、野生动物或农场动物。",
        animales: [
          {
            animal: "perro",
            tipo: "doméstico",
          },
          {
            animal: "león",
            tipo: "salvaje",
          },
          {
            animal: "vaca",
            tipo: "granja",
          },
          {
            animal: "gato",
            tipo: "doméstico",
          },
          {
            animal: "elefante",
            tipo: "salvaje",
          },
          {
            animal: "gallina",
            tipo: "granja",
          },
          {
            animal: "tiburón",
            tipo: "salvaje",
          },
          {
            animal: "conejo",
            tipo: "doméstico",
          },
        ],
      },
      {
        id: "ep4",
        tipo: "describir",
        titulo: "Describe tu mascota o animal favorito",
        tituloChino: "描述你的宠物或最喜欢的动物",
        instruccion: "Escribe 5-6 frases describiendo tu mascota o animal favorito.",
        instruccionChino: "写5-6句话描述你的宠物或最喜欢的动物。",
        ejemplo:
          "Mi mascota es un perro. Se llama Max. Es grande y marrón. Le gusta jugar en el parque. Es muy cariñoso y fiel.",
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Tienes mascota? Describe tu mascota si la tienes.",
        preguntaChino: "你有宠物吗？如果有，描述一下你的宠物。",
        sugerencia: "Tengo un perro. Se llama Max. Es grande y marrón.",
        sugerenciaChino: "Tengo un perro. Se llama Max. Es grande y marrón.",
      },
      {
        id: "pa2",
        pregunta: "¿Cuál es tu animal favorito y por qué?",
        preguntaChino: "你最喜欢的动物是什么？为什么？",
        sugerencia: "Mi animal favorito es el perro porque es fiel y juguetón.",
        sugerenciaChino: "Mi animal favorito es el perro porque es fiel y juguetón.",
      },
      {
        id: "pa3",
        pregunta: "¿Prefieres los animales domésticos o los salvajes? ¿Por qué?",
        preguntaChino: "你更喜欢家养动物还是野生动物？为什么？",
        sugerencia: "Prefiero los animales domésticos porque son cariñosos.",
        sugerenciaChino: "Prefiero los animales domésticos porque son cariñosos.",
      },
      {
        id: "pa4",
        pregunta: "¿Qué animal te da miedo? ¿Por qué?",
        preguntaChino: "什么动物让你害怕？为什么？",
        sugerencia: "Me dan miedo las serpientes porque son peligrosas.",
        sugerenciaChino: "Me dan miedo las serpientes porque son peligrosas.",
      },
      {
        id: "pa5",
        pregunta: "¿Qué animales has visto en la naturaleza o en el zoológico?",
        preguntaChino: "你在自然界或动物园里见过什么动物？",
        sugerencia: "He visto leones, elefantes, jirafas y monos en el zoológico.",
        sugerenciaChino: "He visto leones, elefantes, jirafas y monos en el zoológico.",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '狗' en español?",
        preguntaChino: "西班牙语中'狗'怎么说？",
        respuestaSugerida: "perro",
        respuestaSugeridaChino: "perro",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '猫' en español?",
        preguntaChino: "西班牙语中'猫'怎么说？",
        respuestaSugerida: "gato",
        respuestaSugeridaChino: "gato",
      },
      {
        id: "p3",
        pregunta: "¿Qué animal da leche?",
        preguntaChino: "哪种动物产奶？",
        respuestaSugerida: "la vaca",
        respuestaSugeridaChino: "la vaca",
      },
      {
        id: "p4",
        pregunta: "¿Cómo se dice '大象' en español?",
        preguntaChino: "西班牙语中'大象'怎么说？",
        respuestaSugerida: "elefante",
        respuestaSugeridaChino: "elefante",
      },
      {
        id: "p5",
        pregunta: "¿Qué animal es conocido como 'el rey de la selva'?",
        preguntaChino: "哪个动物被称为'丛林之王'？",
        respuestaSugerida: "El león",
        respuestaSugeridaChino: "El león",
      },
      {
        id: "p6",
        pregunta: "¿Cómo se dice 'dolphin' en español?",
        preguntaChino: "西班牙语中'dolphin'怎么说？",
        respuestaSugerida: "delfín",
        respuestaSugeridaChino: "delfín",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Géneros musicales",
        tituloChino: "音乐类型",
        descripcion: `🔹 GÉNEROS MUSICALES PRINCIPALES (main music genres):

POPULARES:
• pop = pop music
• rock = rock music
• indie = indie music
• folk = folk music
• country = country music
• blues = blues
• jazz = jazz
• soul = soul
• funk = funk
• R&B = rhythm and blues
• hip-hop / rap = hip-hop / rap
• reggae = reggae
• ska = ska
• punk = punk
• metal = metal
• electrónica / EDM = electronic music
• house = house music
• techno = techno
• drum and bass = drum and bass

LATINOS (Latin genres):
• salsa = salsa
• merengue = merengue
• bachata = bachata
• reggaetón = reggaeton
• cumbia = cumbia
• tango = tango (Argentina)
• flamenco = flamenco (Spain)
• bossa nova = bossa nova (Brazil)
• samba = samba (Brazil)
• ranchera = ranchera (Mexico)
• mariachi = mariachi (Mexico)
• vallenato = vallenato (Colombia)

CLÁSICA Y TRADICIONAL:
• música clásica = classical music
• ópera = opera
• música de cámara = chamber music
• sinfónica = symphonic
• música tradicional = traditional music

🔹 EJEMPLOS:
• Me gusta la música pop.
• El flamenco es español.
• Escucho rock clásico.`,
        descripcionChino: `🔹 主要音乐类型：

流行类：
• pop = 流行音乐
• rock = 摇滚乐
• indie = 独立音乐
• folk = 民谣
• country = 乡村音乐
• blues = 蓝调
• jazz = 爵士乐
• soul = 灵魂乐
• funk = 放克
• R&B = 节奏蓝调
• hip-hop / rap = 嘻哈/说唱
• reggae = 雷鬼
• ska = 斯卡
• punk = 朋克
• metal = 金属乐
• electrónica / EDM = 电子音乐
• house = 浩室音乐
• techno = 铁克诺音乐
• drum and bass = 鼓打贝斯

拉丁类：
• salsa = 萨尔萨
• merengue = 梅伦格
• bachata = 巴恰塔
• reggaetón = 雷鬼动
• cumbia = 昆比亚
• tango = 探戈（阿根廷）
• flamenco = 弗拉门戈（西班牙）
• bossa nova = 波萨诺瓦（巴西）
• samba = 桑巴（巴西）
• ranchera = 兰切拉（墨西哥）
• mariachi = 马里亚奇（墨西哥）
• vallenato = 巴耶纳托（哥伦比亚）

古典和传统：
• música clásica = 古典音乐
• ópera = 歌剧
• música de cámara = 室内乐
• sinfónica = 交响乐
• música tradicional = 传统音乐

🔹 例子：
• Me gusta la música pop. = 我喜欢流行音乐。
• El flamenco es español. = 弗拉门戈是西班牙的。
• Escucho rock clásico. = 我听经典摇滚。`,
        ejemplos: [
          {
            espanol: "Me gusta la música pop.",
            chino: "我喜欢流行音乐。",
          },
          {
            espanol: "El flamenco es español.",
            chino: "弗拉门戈是西班牙的。",
          },
          {
            espanol: "Escucho rock clásico.",
            chino: "我听经典摇滚。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Instrumentos musicales",
        tituloChino: "乐器",
        descripcion: `🔹 INSTRUMENTOS DE CUERDA (string instruments):
• guitarra = guitar
• guitarra eléctrica = electric guitar
• guitarra acústica = acoustic guitar
• bajo = bass guitar
• violín = violin
• viola = viola
• violonchelo / chelo = cello
• contrabajo = double bass
• arpa = harp
• ukelele = ukulele
• mandolina = mandolin
• banjo = banjo

🔹 INSTRUMENTOS DE VIENTO (wind instruments):
• flauta = flute
• flauta travesera = transverse flute
• saxofón = saxophone
• clarinete = clarinet
• trompeta = trumpet
• trombón = trombone
• tuba = tuba
• oboe = oboe
• fagot = bassoon
• armónica = harmonica
• gaita = bagpipes

🔹 INSTRUMENTOS DE PERCUSIÓN (percussion instruments):
• batería = drum set
• tambor = drum
• bombo = bass drum
• platillos = cymbals
• pandereta = tambourine
• maracas = maracas
• güiro = güiro
• xilófono = xylophone
• timbales = timbales
• campanas = bells

🔹 INSTRUMENTOS DE TECLADO (keyboard instruments):
• piano = piano
• teclado = keyboard
• órgano = organ
• acordeón = accordion

🔹 VERBOS:
• tocar un instrumento = to play an instrument
• cantar = to sing
• componer = to compose
• grabar = to record
• ensayar = to rehearse

📌 EJEMPLOS:
• Toco la guitarra.
• Ella canta muy bien.
• Me gusta el piano.`,
        descripcionChino: `🔹 弦乐器：
• guitarra = 吉他
• guitarra eléctrica = 电吉他
• guitarra acústica = 木吉他
• bajo = 贝斯
• violín = 小提琴
• viola = 中提琴
• violonchelo / chelo = 大提琴
• contrabajo = 低音提琴
• arpa = 竖琴
• ukelele = 尤克里里
• mandolina = 曼陀林
• banjo = 班卓琴

🔹 管乐器：
• flauta = 笛子
• flauta travesera = 长笛
• saxofón = 萨克斯风
• clarinete = 单簧管
• trompeta = 小号
• trombón = 长号
• tuba = 大号
• oboe = 双簧管
• fagot = 巴松管
• armónica = 口琴
• gaita = 风笛

🔹 打击乐器：
• batería = 架子鼓
• tambor = 鼓
• bombo = 低音鼓
• platillos = 钹
• pandereta = 铃鼓
• maracas = 沙锤
• güiro = 刮瓜
• xilófono = 木琴
• timbales = 定音鼓
• campanas = 铃铛

🔹 键盘乐器：
• piano = 钢琴
• teclado = 电子琴
• órgano = 管风琴
• acordeón = 手风琴

🔹 动词：
• tocar un instrumento = 演奏乐器
• cantar = 唱歌
• componer = 作曲
• grabar = 录音
• ensayar = 排练

📌 例子：
• Toco la guitarra. = 我弹吉他。
• Ella canta muy bien. = 她唱得很好。
• Me gusta el piano. = 我喜欢钢琴。`,
        ejemplos: [
          {
            espanol: "Toco la guitarra.",
            chino: "我弹吉他。",
          },
          {
            espanol: "Ella canta muy bien.",
            chino: "她唱得很好。",
          },
          {
            espanol: "Me gusta el piano.",
            chino: "我喜欢钢琴。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Hablar de música",
        tituloChino: "谈论音乐",
        descripcion: `🔹 PREGUNTAS COMUNES (common questions):
• ¿Qué tipo de música te gusta?
• ¿Cuál es tu género favorito?
• ¿Cuál es tu grupo favorito?
• ¿Cuál es tu cantante favorito?
• ¿Tocas algún instrumento?
• ¿Has ido a algún concierto?
• ¿Qué canción te gusta más?
• ¿Escuchas música mientras estudias?

🔹 RESPUESTAS (answers):
• Me gusta / Me encanta...
• No me gusta...
• Odio...
• Mi género favorito es el rock.
• Mi grupo favorito se llama...
• Mi cantante favorito es...
• Sí, toco la guitarra / el piano.
• He ido a varios conciertos.

🔹 EXPRESIONES ÚTILES (useful expressions):
• Tiene buena voz. = He/she has a good voice.
• La letra es bonita. = The lyrics are beautiful.
• El ritmo es pegadizo. = The rhythm is catchy.
• La melodía es muy bonita. = The melody is very pretty.
• Me pongo los auriculares y me desconecto. = I put on headphones and disconnect.
• La música me relaja. = Music relaxes me.
• Me ayuda a concentrarme. = It helps me concentrate.

🔹 PROFESIONES RELACIONADAS (related professions):
• cantante = singer
• músico / música = musician
• compositor / compositora = composer
• guitarrista = guitarist
• pianista = pianist
• batería = drummer
• bajista = bassist
• violinista = violinist
• productor musical = music producer
• DJ = DJ

📌 EJEMPLOS:
• Mi cantante favorito es Rosalía.
• He ido a dos conciertos.
• La letra de esta canción es muy bonita.`,
        descripcionChino: `🔹 常见问题：
• ¿Qué tipo de música te gusta? = 你喜欢什么类型的音乐？
• ¿Cuál es tu género favorito? = 你最喜欢的流派是什么？
• ¿Cuál es tu grupo favorito? = 你最喜欢的乐队是哪个？
• ¿Cuál es tu cantante favorito? = 你最喜欢的歌手是谁？
• ¿Tocas algún instrumento? = 你会演奏乐器吗？
• ¿Has ido a algún concierto? = 你去过演唱会吗？
• ¿Qué canción te gusta más? = 你最喜欢哪首歌？
• ¿Escuchas música mientras estudias? = 你学习的时候听音乐吗？

🔹 回答：
• Me gusta / Me encanta... = 我喜欢/我热爱...
• No me gusta... = 我不喜欢...
• Odio... = 我讨厌...
• Mi género favorito es el rock. = 我最喜欢的流派是摇滚。
• Mi grupo favorito se llama... = 我最喜欢的乐队叫...
• Mi cantante favorito es... = 我最喜欢的歌手是...
• Sí, toco la guitarra / el piano. = 是的，我弹吉他/钢琴。
• He ido a varios conciertos. = 我去过好几个演唱会。

🔹 有用表达：
• Tiene buena voz. = 他/她声音很好。
• La letra es bonita. = 歌词很美。
• El ritmo es pegadizo. = 节奏很上口。
• La melodía es muy bonita. = 旋律很美。
• Me pongo los auriculares y me desconecto. = 我戴上耳机，与外界隔绝。
• La música me relaja. = 音乐让我放松。
• Me ayuda a concentrarme. = 音乐帮助我集中注意力。

🔹 相关职业：
• cantante = 歌手
• músico / música = 音乐家
• compositor / compositora = 作曲家
• guitarrista = 吉他手
• pianista = 钢琴家
• batería = 鼓手
• bajista = 贝斯手
• violinista = 小提琴手
• productor musical = 音乐制作人
• DJ = DJ

📌 例子：
• Mi cantante favorito es Rosalía. = 我最喜欢的歌手是Rosalía。
• He ido a dos conciertos. = 我去过两场演唱会。
• La letra de esta canción es muy bonita. = 这首歌的歌词很美。`,
        ejemplos: [
          {
            espanol: "Mi cantante favorito es Rosalía.",
            chino: "我最喜欢的歌手是Rosalía。",
          },
          {
            espanol: "He ido a dos conciertos.",
            chino: "我去过两场演唱会。",
          },
          {
            espanol: "La letra de esta canción es muy bonita.",
            chino: "这首歌的歌词很美。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Eventos musicales y conciertos",
        tituloChino: "音乐活动和演唱会",
        descripcion: `🔹 VOCABULARIO DE CONCIERTOS (concert vocabulary):
• concierto = concert
• festival de música = music festival
• gira = tour
• escenario = stage
• público = audience
• entrada / boleto = ticket
• taquilla = box office
• butaca = seat
• entrada general = general admission
• zona VIP = VIP area
• camiseta del concierto = concert t-shirt
• setlist = setlist
• bis / encore = encore

🔹 FRASES ÚTILES:
• ¿Cuánto cuesta la entrada?
• ¿Dónde puedo comprar las entradas?
• ¿A qué hora empieza el concierto?
• ¿Cuánto dura el concierto?
• ¿Quién es el telonero? (Who is the opening act?)
• El concierto fue increíble.
• El cantante interactuó con el público.
• Cantamos todas las canciones.
• El bis duró veinte minutos.

🔹 TIPOS DE EVENTOS:
• festival = festival
• macroconcierto = huge concert
• concierto benéfico = charity concert
• concierto acústico = acoustic concert
• concierto sinfónico = symphonic concert
• ópera = opera
• musical = musical theater

📌 EJEMPLOS:
• Las entradas para el concierto se agotaron en una hora.
• El festival de música duró tres días.
• En el bis tocaron mi canción favorita.`,
        descripcionChino: `🔹 演唱会词汇：
• concierto = 演唱会
• festival de música = 音乐节
• gira = 巡演
• escenario = 舞台
• público = 观众
• entrada / boleto = 门票
• taquilla = 售票处
• butaca = 座位
• entrada general = 普通票
• zona VIP = VIP区
• camiseta del concierto = 演唱会T恤
• setlist = 曲目列表
• bis / encore = 返场

🔹 有用句子：
• ¿Cuánto cuesta la entrada? = 门票多少钱？
• ¿Dónde puedo comprar las entradas? = 我在哪里可以买到票？
• ¿A qué hora empieza el concierto? = 演唱会几点开始？
• ¿Cuánto dura el concierto? = 演唱会持续多长时间？
• ¿Quién es el telonero? = 暖场嘉宾是谁？
• El concierto fue increíble. = 演唱会太棒了。
• El cantante interactuó con el público. = 歌手与观众互动。
• Cantamos todas las canciones. = 我们唱了所有的歌。
• El bis duró veinte minutos. = 返场持续了二十分钟。

🔹 活动类型：
• festival = 音乐节
• macroconcierto = 大型演唱会
• concierto benéfico = 慈善演唱会
• concierto acústico = 不插电演唱会
• concierto sinfónico = 交响音乐会
• ópera = 歌剧
• musical = 音乐剧

📌 例子：
• Las entradas para el concierto se agotaron en una hora. = 演唱会门票一小时内售罄。
• El festival de música duró tres días. = 音乐节持续了三天。
• En el bis tocaron mi canción favorita. = 返场时他们演奏了我最喜欢的歌。`,
        ejemplos: [
          {
            espanol: "Las entradas se agotaron rápidamente.",
            chino: "门票很快就卖光了。",
          },
          {
            espanol: "El concierto fue espectacular.",
            chino: "演唱会非常精彩。",
          },
          {
            espanol: "El bis duró quince minutos.",
            chino: "返场持续了十五分钟。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "música",
        chino: "音乐",
        ejemplo: "Escucho música.",
      },
      {
        id: "v2",
        espanol: "canción",
        chino: "歌曲",
        ejemplo: "Una buena canción.",
      },
      {
        id: "v3",
        espanol: "cantante",
        chino: "歌手",
        ejemplo: "Mi cantante favorito.",
      },
      {
        id: "v4",
        espanol: "grupo / banda",
        chino: "乐队",
        ejemplo: "Un grupo famoso.",
      },
      {
        id: "v5",
        espanol: "concierto",
        chino: "演唱会",
        ejemplo: "Voy a un concierto.",
      },
      {
        id: "v6",
        espanol: "guitarra",
        chino: "吉他",
        ejemplo: "Toco la guitarra.",
      },
      {
        id: "v7",
        espanol: "piano",
        chino: "钢琴",
        ejemplo: "Toco el piano.",
      },
      {
        id: "v8",
        espanol: "batería",
        chino: "鼓",
        ejemplo: "Toco la batería.",
      },
      {
        id: "v9",
        espanol: "violín",
        chino: "小提琴",
        ejemplo: "El violín suena bonito.",
      },
      {
        id: "v10",
        espanol: "bajo",
        chino: "贝斯",
        ejemplo: "El bajo da ritmo.",
      },
      {
        id: "v11",
        espanol: "flauta",
        chino: "笛子",
        ejemplo: "Toca la flauta.",
      },
      {
        id: "v12",
        espanol: "saxofón",
        chino: "萨克斯风",
        ejemplo: "El saxofón suena genial.",
      },
      {
        id: "v13",
        espanol: "letra",
        chino: "歌词",
        ejemplo: "La letra de la canción.",
      },
      {
        id: "v14",
        espanol: "ritmo",
        chino: "节奏",
        ejemplo: "Tiene buen ritmo.",
      },
      {
        id: "v15",
        espanol: "melodía",
        chino: "旋律",
        ejemplo: "La melodía es bonita.",
      },
      {
        id: "v16",
        espanol: "voz",
        chino: "声音",
        ejemplo: "Tiene buena voz.",
      },
      {
        id: "v17",
        espanol: "pop",
        chino: "流行音乐",
        ejemplo: "Escucho pop.",
      },
      {
        id: "v18",
        espanol: "rock",
        chino: "摇滚乐",
        ejemplo: "Me gusta el rock.",
      },
      {
        id: "v19",
        espanol: "jazz",
        chino: "爵士乐",
        ejemplo: "El jazz es relajante.",
      },
      {
        id: "v20",
        espanol: "música clásica",
        chino: "古典音乐",
        ejemplo: "La música clásica es elegante.",
      },
      {
        id: "v21",
        espanol: "flamenco",
        chino: "弗拉门戈",
        ejemplo: "El flamenco es español.",
      },
      {
        id: "v22",
        espanol: "reggaetón",
        chino: "雷鬼动",
        ejemplo: "El reggaetón es bailable.",
      },
      {
        id: "v23",
        espanol: "tocar",
        chino: "演奏",
        ejemplo: "Toco la guitarra.",
      },
      {
        id: "v24",
        espanol: "cantar",
        chino: "唱歌",
        ejemplo: "Me gusta cantar.",
      },
      {
        id: "v25",
        espanol: "escuchar",
        chino: "听",
        ejemplo: "Escucho música a diario.",
      },
      {
        id: "v26",
        espanol: "auriculares",
        chino: "耳机",
        ejemplo: "Uso auriculares.",
      },
      {
        id: "v27",
        espanol: "entrada",
        chino: "门票",
        ejemplo: "Compro la entrada.",
      },
      {
        id: "v28",
        espanol: "festival",
        chino: "音乐节",
        ejemplo: "Voy al festival.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Hablando de gustos musicales",
        tituloChino: "谈论音乐喜好",
        personajes: ["Ana", "Carlos"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Carlos, ¿qué tipo de música te gusta?",
            traduccion: "卡洛斯，你喜欢什么类型的音乐？",
          },
          {
            personaje: "Carlos",
            texto: "Me encanta el rock clásico. ¿Y a ti?",
            traduccion: "我喜欢经典摇滚。你呢？",
          },
          {
            personaje: "Ana",
            texto: "A mí me gusta el pop y la música electrónica.",
            traduccion: "我喜欢流行音乐和电子音乐。",
          },
          {
            personaje: "Carlos",
            texto: "¿Cuál es tu grupo favorito?",
            traduccion: "你最喜欢的乐队是哪个？",
          },
          {
            personaje: "Ana",
            texto: "Me gusta mucho Coldplay. ¿Has ido a algún concierto?",
            traduccion: "我很喜欢酷玩乐队。你去过演唱会吗？",
          },
          {
            personaje: "Carlos",
            texto: "Sí, fui a uno el año pasado. Fue increíble.",
            traduccion: "是的，我去年去过一个。太棒了。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Hablando de instrumentos",
        tituloChino: "谈论乐器",
        personajes: ["María", "Pedro"],
        lineas: [
          {
            personaje: "María",
            texto: "Pedro, ¿tocas algún instrumento?",
            traduccion: "佩德罗，你会演奏乐器吗？",
          },
          {
            personaje: "Pedro",
            texto: "Sí, toco la guitarra desde niño. ¿Y tú?",
            traduccion: "是的，我从小弹吉他。你呢？",
          },
          {
            personaje: "María",
            texto: "Yo toco el piano. Me relaja mucho.",
            traduccion: "我弹钢琴。很放松。",
          },
          {
            personaje: "Pedro",
            texto: "¡Qué bien! ¿Has compuesto alguna canción?",
            traduccion: "真好！你写过歌吗？",
          },
          {
            personaje: "María",
            texto: "Algunas, pero solo para mí. No soy profesional.",
            traduccion: "一些，但只给自己写。我不是专业的。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "En un concierto",
        tituloChino: "在演唱会上",
        personajes: ["Luis", "Sofía"],
        lineas: [
          {
            personaje: "Luis",
            texto: "Sofía, ¿has ido al concierto de Rosalía?",
            traduccion: "索菲亚，你去看Rosalía的演唱会了吗？",
          },
          {
            personaje: "Sofía",
            texto: "¡Sí! Fue espectacular. Canta muy bien.",
            traduccion: "去了！太精彩了。她唱得很好。",
          },
          {
            personaje: "Luis",
            texto: "¿Qué canciones tocó?",
            traduccion: "她唱了什么歌？",
          },
          {
            personaje: "Sofía",
            texto: "Todas sus canciones famosas. El ritmo era pegadizo.",
            traduccion: "所有她的著名歌曲。节奏很上口。",
          },
          {
            personaje: "Luis",
            texto: "¿Cuánto duró el concierto?",
            traduccion: "演唱会持续了多久？",
          },
          {
            personaje: "Sofía",
            texto: "Casi dos horas. Y hubo bis.",
            traduccion: "差不多两个小时。还有返场。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Música para estudiar",
        tituloChino: "学习时的音乐",
        personajes: ["Laura", "David"],
        lineas: [
          {
            personaje: "Laura",
            texto: "David, ¿escuchas música mientras estudias?",
            traduccion: "大卫，你学习的时候听音乐吗？",
          },
          {
            personaje: "David",
            texto: "Sí, siempre. Me ayuda a concentrarme.",
            traduccion: "是的，总是。它帮助我集中注意力。",
          },
          {
            personaje: "Laura",
            texto: "¿Qué tipo de música escuchas?",
            traduccion: "你听什么类型的音乐？",
          },
          {
            personaje: "David",
            texto: "Generalmente música clásica o jazz suave.",
            traduccion: "通常是古典音乐或轻柔爵士。",
          },
          {
            personaje: "Laura",
            texto: "Yo no puedo. Me distrae. Prefiero el silencio.",
            traduccion: "我不能。会分散我的注意力。我更喜欢安静。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Planes para un festival",
        tituloChino: "音乐节计划",
        personajes: ["Sofía", "Javier"],
        lineas: [
          {
            personaje: "Sofía",
            texto: "Javier, ¿vas al festival de música este verano?",
            traduccion: "哈维尔，你今年夏天去音乐节吗？",
          },
          {
            personaje: "Javier",
            texto: "¡Claro! Ya tengo las entradas. ¿Tú no?",
            traduccion: "当然！我已经有票了。你没有吗？",
          },
          {
            personaje: "Sofía",
            texto: "Todavía no. ¿Qué grupos tocan?",
            traduccion: "还没有。哪些乐队表演？",
          },
          {
            personaje: "Javier",
            texto: "Tocan grupos de rock, indie y electrónica. ¡Va a ser genial!",
            traduccion: "有摇滚、独立和电子乐队。会很好玩的！",
          },
          {
            personaje: "Sofía",
            texto: "Entonces compraré la entrada esta semana.",
            traduccion: "那我这周就买票。",
          },
          {
            personaje: "Javier",
            texto: "¡Apúrate que se agotan rápido!",
            traduccion: "快点，票很快就卖光了！",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "为了说'我非常喜欢'：Me _____",
          preguntaChino: "为了说'我非常喜欢'：Me _____",
          respuestaCorrecta: "encanta",
          explicacion: "'Me encanta' = 我非常喜欢。",
          pista: "首字母是 e，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c2",
          pregunta: "为了说'我不喜欢'：No me _____",
          preguntaChino: "为了说'我不喜欢'：No me _____",
          respuestaCorrecta: "gusta",
          explicacion: "'No me gusta' = 我不喜欢。",
          pista: "首字母是 g，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c3",
          pregunta: "为了说'演奏乐器'，用动词：_____",
          preguntaChino: "为了说'演奏乐器'，用动词：_____",
          respuestaCorrecta: "tocar",
          explicacion: "'Tocar'用于乐器。",
          pista: "首字母是 t，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c4",
          pregunta: "为了说'总是'：_____",
          preguntaChino: "为了说'总是'：_____",
          respuestaCorrecta: "siempre",
          explicacion: "'Siempre' = 总是。",
          pista: "首字母是 s，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c5",
          pregunta: "为了说'从不'：_____",
          preguntaChino: "为了说'从不'：_____",
          respuestaCorrecta: "nunca",
          explicacion: "'Nunca' = 从不。",
          pista: "首字母是 n，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c6",
          pregunta: "吉他手是：_____",
          preguntaChino: "吉他手是：_____",
          respuestaCorrecta: "guitarrista",
          explicacion: "Guitarrista = 吉他手",
          pista: "首字母是 g，11个字母",
          numeroLetras: 11,
        },
        {
          id: "c7",
          pregunta: "歌词是：_____",
          preguntaChino: "歌词是：_____",
          respuestaCorrecta: "letra",
          explicacion: "Letra = 歌词",
          pista: "首字母是 l，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c8",
          pregunta: "为了说'演唱会门票'：_____ del concierto",
          preguntaChino: "为了说'演唱会门票'：_____ del concierto",
          respuestaCorrecta: "entradas",
          explicacion: "Entradas = 门票",
          pista: "首字母是 e，8个字母",
          numeroLetras: 8,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "哪个动词用于乐器？",
          preguntaChino: "哪个动词用于乐器？",
          opciones: ["jugar", "tocar", "hacer", "ver"],
          respuestaCorrecta: "tocar",
          explicacion: "我们说'tocar la guitarra'，不是'jugar'。",
        },
        {
          id: "s2",
          pregunta: "如果你非常喜欢某件事，你说：",
          preguntaChino: "如果你非常喜欢某件事，你说：",
          opciones: ["me gusta", "me encanta", "no me gusta", "odio"],
          respuestaCorrecta: "me encanta",
          explicacion: "'Me encanta'比'me gusta'更强烈。",
        },
        {
          id: "s3",
          pregunta: "'Leo libros'是什么意思？",
          preguntaChino: "'Leo libros'是什么意思？",
          opciones: ["我写书", "我读书", "我买书", "我卖书"],
          respuestaCorrecta: "我读书",
          explicacion: "'Leer' = 阅读。",
        },
        {
          id: "s4",
          pregunta: "哪个表达频率最高？",
          preguntaChino: "哪个表达频率最高？",
          opciones: ["a veces", "nunca", "siempre", "raramente"],
          respuestaCorrecta: "siempre",
          explicacion: "'Siempre' = 总是（100%）。",
        },
        {
          id: "s5",
          pregunta: "'Hacer deporte'的意思是：",
          preguntaChino: "'Hacer deporte'的意思是：",
          opciones: ["做运动", "看比赛", "买装备", "教体育"],
          respuestaCorrecta: "做运动",
          explicacion: "'Hacer deporte' = 做运动。",
        },
        {
          id: "s6",
          pregunta: "¿Qué significa 'la letra de la canción'?",
          preguntaChino: "'la letra de la canción'是什么意思？",
          opciones: ["歌曲的旋律", "歌曲的歌词", "歌曲的节奏", "歌曲的标题"],
          respuestaCorrecta: "歌曲的歌词",
          explicacion: "Letra = 歌词",
        },
        {
          id: "s7",
          pregunta: "¿Cómo se dice '我弹吉他' en español?",
          preguntaChino: "西班牙语中'我弹吉他'怎么说？",
          opciones: ["Juego la guitarra", "Toco la guitarra", "Hago la guitarra", "Canto la guitarra"],
          respuestaCorrecta: "Toco la guitarra",
          explicacion: "Tocar + instrumento",
        },
        {
          id: "s8",
          pregunta: "¿Qué significa 'bis' en un concierto?",
          preguntaChino: "演唱会中的'bis'是什么意思？",
          opciones: ["开场", "返场", "中场休息", "结束"],
          respuestaCorrecta: "返场",
          explicacion: "Bis = encore",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Jugar'用于运动和游戏。",
          preguntaChino: "'Jugar'用于运动和游戏。",
          respuestaCorrecta: true,
          explicacion: "对。'Jugar al fútbol', 'jugar a cartas'。",
        },
        {
          id: "vf2",
          pregunta: "我们说'tocar deporte'。",
          preguntaChino: "我们说'tocar deporte'。",
          respuestaCorrecta: false,
          explicacion: "错。我们说'hacer deporte'。",
        },
        {
          id: "vf3",
          pregunta: "'Me encanta'比'me gusta'更强烈。",
          preguntaChino: "'Me encanta'比'me gusta'更强烈。",
          respuestaCorrecta: true,
          explicacion: "对。'Encantar'比'gustar'更强烈。",
        },
        {
          id: "vf4",
          pregunta: "'Nunca'意思是'有时'。",
          preguntaChino: "'Nunca'意思是'有时'。",
          respuestaCorrecta: false,
          explicacion: "错。'Nunca' = 从不。",
        },
        {
          id: "vf5",
          pregunta: "周末用西班牙语说'fin de semana'。",
          preguntaChino: "周末用西班牙语说'fin de semana'。",
          respuestaCorrecta: true,
          explicacion: "对。'Fin de semana' = 周末。",
        },
        {
          id: "vf6",
          pregunta: "El flamenco es un género musical de España.",
          preguntaChino: "弗拉门戈是西班牙的一种音乐流派。",
          respuestaCorrecta: true,
          explicacion: "对。El flamenco es de Andalucía.",
        },
        {
          id: "vf7",
          pregunta: "Un 'batería' toca el violín.",
          preguntaChino: "'Batería'演奏小提琴。",
          respuestaCorrecta: false,
          explicacion: "错。El batería toca la batería.",
        },
        {
          id: "vf8",
          pregunta: "La 'entrada' es el billete para un concierto.",
          preguntaChino: "'Entrada'是演唱会的票。",
          respuestaCorrecta: true,
          explicacion: "对。Entrada = ticket",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "guitarra",
              derecha: "吉他",
            },
            {
              izquierda: "piano",
              derecha: "钢琴",
            },
            {
              izquierda: "batería",
              derecha: "鼓",
            },
            {
              izquierda: "violín",
              derecha: "小提琴",
            },
            {
              izquierda: "cantante",
              derecha: "歌手",
            },
            {
              izquierda: "concierto",
              derecha: "演唱会",
            },
            {
              izquierda: "canción",
              derecha: "歌曲",
            },
            {
              izquierda: "música",
              derecha: "音乐",
            },
            {
              izquierda: "rock",
              derecha: "摇滚",
            },
            {
              izquierda: "pop",
              derecha: "流行音乐",
            },
            {
              izquierda: "jazz",
              derecha: "爵士",
            },
            {
              izquierda: "flamenco",
              derecha: "弗拉门戈",
            },
            {
              izquierda: "letra",
              derecha: "歌词",
            },
            {
              izquierda: "ritmo",
              derecha: "节奏",
            },
            {
              izquierda: "melodía",
              derecha: "旋律",
            },
          ],
          explicacion: "将音乐词汇与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["música", "Me", "la", "gusta", "clásica", "."],
          respuestaCorrecta: "Me gusta la música clásica.",
          explicacion: "正确的句子是：Me gusta la música clásica.（我喜欢古典音乐。）",
        },
        {
          id: "o2",
          palabras: ["guitarra", "la", "Toco", "."],
          respuestaCorrecta: "Toco la guitarra.",
          explicacion: "正确的句子是：Toco la guitarra.（我弹吉他。）",
        },
        {
          id: "o3",
          palabras: ["cantante", "es", "favorito", "Mi", "Rosalía", "."],
          respuestaCorrecta: "Mi cantante favorito es Rosalía.",
          explicacion: "正确的句子是：Mi cantante favorito es Rosalía.（我最喜欢的歌手是Rosalía。）",
        },
        {
          id: "o4",
          palabras: ["concierto", "fui", "al", "ayer", "."],
          respuestaCorrecta: "Ayer fui al concierto.",
          explicacion: "正确的顺序是：Ayer fui al concierto.",
        },
        {
          id: "o5",
          palabras: ["agotaron", "se", "entradas", "Las", "rápidamente", "."],
          respuestaCorrecta: "Las entradas se agotaron rápidamente.",
          explicacion: "正确的顺序是：Las entradas se agotaron rápidamente.",
        },
        {
          id: "o6",
          palabras: ["bonita", "muy", "La", "es", "canción", "esta", "."],
          respuestaCorrecta: "Esta canción es muy bonita.",
          explicacion: "正确的顺序是：Esta canción es muy bonita.",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我喜欢听音乐。",
          respuestaEsperada: "Me gusta escuchar música.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "你会弹钢琴吗？",
          respuestaEsperada: "¿Sabes tocar el piano?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "这首歌的歌词很美。",
          respuestaEsperada: "La letra de esta canción es muy bonita.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "我上周去了一场演唱会。",
          respuestaEsperada: "Fui a un concierto la semana pasada.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "我最喜欢的歌手是...",
          respuestaEsperada: "Mi cantante favorito es...",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "我每天戴耳机听音乐。",
          respuestaEsperada: "Escucho música con auriculares todos los días.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "演唱会的票已经卖光了。",
          respuestaEsperada: "Las entradas para el concierto ya se agotaron.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "音乐帮助我放松。",
          respuestaEsperada: "La música me ayuda a relajarme.",
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
        instruccion: "用正确的音乐词汇完成对话。",
        instruccionChino: "用正确的音乐词汇完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿Qué tipo de _____ te gusta?",
            respuesta: "música",
          },
          {
            personaje: "B",
            texto: "Me gusta el _____. ¿Y a ti?",
            respuesta: "rock / pop / jazz",
          },
          {
            personaje: "A",
            texto: "¿Tocas algún _____?",
            respuesta: "instrumento",
          },
          {
            personaje: "B",
            texto: "Sí, toco la _____.",
            respuesta: "guitarra / piano",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "responder",
        titulo: "Responde las preguntas",
        tituloChino: "回答问题",
        instruccion: "Responde las siguientes preguntas sobre música en español.",
        instruccionChino: "用西班牙语回答以下关于音乐的问题。",
        preguntas: [
          {
            pregunta: "¿Qué tipo de música te gusta?",
            respuestaEsperada: "Me gusta el (pop / rock / jazz).",
          },
          {
            pregunta: "¿Tocas algún instrumento? ¿Cuál?",
            respuestaEsperada: "Sí, toco la guitarra. / No, no toco ningún instrumento.",
          },
          {
            pregunta: "¿Cuál es tu cantante favorito?",
            respuestaEsperada: "Mi cantante favorito es (nombre).",
          },
          {
            pregunta: "¿Has ido a algún concierto?",
            respuestaEsperada: "Sí, he ido a varios conciertos. / No, nunca he ido.",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "clasificar",
        titulo: "Clasifica los géneros musicales",
        tituloChino: "分类音乐流派",
        instruccion: "Clasifica cada género como 'rock/pop', 'latino' o 'clásico'.",
        instruccionChino: "将每个流派分类为'摇滚/流行'、'拉丁'或'古典'。",
        generos: [
          {
            genero: "rock",
            tipo: "rock/pop",
          },
          {
            genero: "salsa",
            tipo: "latino",
          },
          {
            genero: "música clásica",
            tipo: "clásico",
          },
          {
            genero: "pop",
            tipo: "rock/pop",
          },
          {
            genero: "flamenco",
            tipo: "latino",
          },
          {
            genero: "jazz",
            tipo: "rock/pop",
          },
          {
            genero: "reggaetón",
            tipo: "latino",
          },
        ],
      },
      {
        id: "ep4",
        tipo: "describir",
        titulo: "Describe tu canción favorita",
        tituloChino: "描述你最喜欢的歌",
        instruccion: "Escribe 5-6 frases describiendo tu canción favorita en español.",
        instruccionChino: "用西班牙语写5-6句话描述你最喜欢的歌。",
        ejemplo:
          "Mi canción favorita es 'Shape of You' de Ed Sheeran. Es de género pop. La letra es bonita y el ritmo es muy pegadizo. La escucho cuando voy al gimnasio. Me encanta porque me da energía.",
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Qué tipo de música te gusta? ¿Por qué?",
        preguntaChino: "你喜欢什么类型的音乐？为什么？",
        sugerencia: "Me gusta el rock porque tiene mucha energía.",
        sugerenciaChino: "Me gusta el rock porque tiene mucha energía.",
      },
      {
        id: "pa2",
        pregunta: "¿Tocas algún instrumento? Si no, ¿cuál te gustaría aprender?",
        preguntaChino: "你会演奏乐器吗？如果不会，你想学什么？",
        sugerencia: "Me gustaría aprender a tocar la guitarra.",
        sugerenciaChino: "Me gustaría aprender a tocar la guitarra.",
      },
      {
        id: "pa3",
        pregunta: "¿Has ido a algún concierto? ¿Cuál fue tu experiencia?",
        preguntaChino: "你去过演唱会吗？你的体验如何？",
        sugerencia: "Sí, fui a un concierto de (nombre). Fue increíble.",
        sugerenciaChino: "Sí, fui a un concierto de (nombre). Fue increíble.",
      },
      {
        id: "pa4",
        pregunta: "¿Escuchas música mientras estudias o trabajas? ¿Por qué?",
        preguntaChino: "你学习或工作时听音乐吗？为什么？",
        sugerencia: "Sí, escucho música porque me ayuda a concentrarme.",
        sugerenciaChino: "Sí, escucho música porque me ayuda a concentrarme.",
      },
      {
        id: "pa5",
        pregunta: "¿Cuál es tu canción favorita y por qué?",
        preguntaChino: "你最喜欢的歌曲是什么？为什么？",
        sugerencia: "Mi canción favorita es... porque la letra es bonita y el ritmo me gusta.",
        sugerenciaChino: "Mi canción favorita es... porque la letra es bonita y el ritmo me gusta.",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '音乐' en español?",
        preguntaChino: "西班牙语中'音乐'怎么说？",
        respuestaSugerida: "música",
        respuestaSugeridaChino: "música",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '歌手' en español?",
        preguntaChino: "西班牙语中'歌手'怎么说？",
        respuestaSugerida: "cantante",
        respuestaSugeridaChino: "cantante",
      },
      {
        id: "p3",
        pregunta: "¿Qué significa 'tocar la guitarra'?",
        preguntaChino: "'tocar la guitarra'是什么意思？",
        respuestaSugerida: "弹吉他",
        respuestaSugeridaChino: "Play the guitar",
      },
      {
        id: "p4",
        pregunta: "¿Cuál es tu canción favorita? Responde en español.",
        preguntaChino: "你最喜欢的歌曲是什么？用西班牙语回答。",
        respuestaSugerida: "Mi canción favorita es (nombre de la canción).",
        respuestaSugeridaChino: "Mi canción favorita es (歌名).",
      },
      {
        id: "p5",
        pregunta: "¿Qué significa 'bis' en un concierto?",
        preguntaChino: "演唱会中的'bis'是什么意思？",
        respuestaSugerida: "Encore / 返场",
        respuestaSugeridaChino: "返场",
      },
      {
        id: "p6",
        pregunta: "¿Cómo se dice '耳机' en español?",
        preguntaChino: "西班牙语中'耳机'怎么说？",
        respuestaSugerida: "auriculares",
        respuestaSugeridaChino: "auriculares",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Dispositivos tecnológicos",
        tituloChino: "科技设备",
        descripcion: `🔹 DISPOSITIVOS Y APARATOS (devices and gadgets):

TELÉFONOS Y COMUNICACIÓN:
• teléfono móvil / celular = mobile phone / cell phone
• smartphone = smartphone
• teléfono fijo = landline
• teléfono inteligente = smartphone
• teléfono plegable = foldable phone

COMPUTADORES:
• ordenador = computer (Spain)
• computadora = computer (Latin America)
• portátil = laptop
• sobremesa = desktop computer
• tablet = tablet
• pantalla = screen
• monitor = monitor

ACCESORIOS:
• auriculares = headphones
• cascos = headphones/headset
• altavoz = speaker
• cargador = charger
• batería = battery
• batería externa / power bank = power bank
• ratón = mouse
• teclado = keyboard
• ratón inalámbrico = wireless mouse
• alfombrilla de ratón = mouse pad
• funda = case
• protector de pantalla = screen protector

ALMACENAMIENTO:
• memoria USB / pendrive = USB flash drive
• disco duro = hard drive
• disco duro externo = external hard drive
• tarjeta de memoria = memory card
• CD / DVD = CD / DVD
• nube = cloud

OTROS:
• impresora = printer
• escáner = scanner
• fotocopiadora = photocopier
• webcam = webcam
• micrófono = microphone
• router = router
• altavoz inteligente = smart speaker
• reloj inteligente = smartwatch

📌 EJEMPLOS:
• Mi móvil tiene poca batería.
• Necesito un cargador nuevo.
• Trabajo con el ordenador.`,
        descripcionChino: `🔹 设备和装置：

电话和通信：
• teléfono móvil / celular = 手机
• smartphone = 智能手机
• teléfono fijo = 座机
• teléfono inteligente = 智能手机
• teléfono plegable = 折叠屏手机

电脑：
• ordenador = 电脑（西班牙）
• computadora = 电脑（拉丁美洲）
• portátil = 笔记本电脑
• sobremesa = 台式电脑
• tablet = 平板电脑
• pantalla = 屏幕
• monitor = 显示器

配件：
• auriculares = 耳机
• cascos = 头戴式耳机
• altavoz = 扬声器
• cargador = 充电器
• batería = 电池
• batería externa / power bank = 充电宝
• ratón = 鼠标
• teclado = 键盘
• ratón inalámbrico = 无线鼠标
• alfombrilla de ratón = 鼠标垫
• funda = 保护壳
• protector de pantalla = 屏幕保护膜

存储：
• memoria USB / pendrive = U盘
• disco duro = 硬盘
• disco duro externo = 移动硬盘
• tarjeta de memoria = 存储卡
• CD / DVD = 光盘
• nube = 云

其他：
• impresora = 打印机
• escáner = 扫描仪
• fotocopiadora = 复印机
• webcam = 网络摄像头
• micrófono = 麦克风
• router = 路由器
• altavoz inteligente = 智能音箱
• reloj inteligente = 智能手表

📌 例子：
• Mi móvil tiene poca batería. = 我的手机电量不足。
• Necesito un cargador nuevo. = 我需要一个新充电器。
• Trabajo con el ordenador. = 我用电脑工作。`,
        ejemplos: [
          {
            espanol: "Mi móvil tiene poca batería.",
            chino: "我的手机电量不足。",
          },
          {
            espanol: "Necesito un cargador nuevo.",
            chino: "我需要一个新充电器。",
          },
          {
            espanol: "Trabajo con el ordenador.",
            chino: "我用电脑工作。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Internet y aplicaciones",
        tituloChino: "互联网和应用程序",
        descripcion: `🔹 VOCABULARIO DE INTERNET (internet vocabulary):
• internet = internet
• WiFi = WiFi
• datos móviles = mobile data
• contraseña = password
• usuario = username
• correo electrónico / email = email
• dirección IP = IP address
• navegador = browser
• buscador = search engine (Google, Bing)
• enlace / link = link
• página web = webpage
• sitio web = website
• descargar = to download
• subir = to upload
• instalar = to install
• actualizar = to update
• guardar = to save
• borrar / eliminar = to delete
• compartir = to share
• enviar = to send
• recibir = to receive
• buscar = to search
• navegar = to browse

🔹 APLICACIONES Y REDES SOCIALES (apps and social media):
• aplicación / app = app
• WhatsApp = WhatsApp
• Telegram = Telegram
• Instagram = Instagram
• Facebook = Facebook
• Twitter / X = Twitter / X
• TikTok = TikTok
• YouTube = YouTube
• LinkedIn = LinkedIn
• Snapchat = Snapchat
• Pinterest = Pinterest
• Spotify = Spotify
• Netflix = Netflix
• Amazon Prime = Amazon Prime
• Disney+ = Disney+

🔹 FRASES ÚTILES:
• ¿Cuál es la contraseña del WiFi?
• Necesito descargar esta aplicación.
• ¿Cómo se llama tu usuario?
• Te voy a enviar un mensaje.
• ¿Puedes compartir este archivo?
• He perdido mi contraseña.
• La conexión es muy lenta.

📌 EJEMPLOS:
• ¿Cuál es la contraseña del WiFi?
• Necesito descargar esta aplicación.
• Comparto fotos en Instagram.`,
        descripcionChino: `🔹 互联网词汇：
• internet = 互联网
• WiFi = 无线网络
• datos móviles = 移动数据
• contraseña = 密码
• usuario = 用户名
• correo electrónico / email = 电子邮件
• dirección IP = IP地址
• navegador = 浏览器
• buscador = 搜索引擎
• enlace / link = 链接
• página web = 网页
• sitio web = 网站
• descargar = 下载
• subir = 上传
• instalar = 安装
• actualizar = 更新
• guardar = 保存
• borrar / eliminar = 删除
• compartir = 分享
• enviar = 发送
• recibir = 接收
• buscar = 搜索
• navegar = 浏览

🔹 应用程序和社交媒体：
• aplicación / app = 应用程序
• WhatsApp = WhatsApp
• Telegram = Telegram
• Instagram = Instagram
• Facebook = Facebook
• Twitter / X = Twitter / X
• TikTok = TikTok
• YouTube = YouTube
• LinkedIn = LinkedIn
• Snapchat = Snapchat
• Pinterest = Pinterest
• Spotify = Spotify
• Netflix = Netflix
• Amazon Prime = Amazon Prime
• Disney+ = Disney+

🔹 有用句子：
• ¿Cuál es la contraseña del WiFi? = WiFi密码是什么？
• Necesito descargar esta aplicación. = 我需要下载这个应用程序。
• ¿Cómo se llama tu usuario? = 你的用户名是什么？
• Te voy a enviar un mensaje. = 我要给你发消息。
• ¿Puedes compartir este archivo? = 你能分享这个文件吗？
• He perdido mi contraseña. = 我忘记密码了。
• La conexión es muy lenta. = 网络连接很慢。

📌 例子：
• ¿Cuál es la contraseña del WiFi? = WiFi密码是什么？
• Necesito descargar esta aplicación. = 我需要下载这个应用程序。
• Comparto fotos en Instagram. = 我在Instagram上分享照片。`,
        ejemplos: [
          {
            espanol: "¿Cuál es la contraseña del WiFi?",
            chino: "WiFi密码是什么？",
          },
          {
            espanol: "Necesito descargar esta aplicación.",
            chino: "我需要下载这个应用程序。",
          },
          {
            espanol: "Comparto fotos en Instagram.",
            chino: "我在Instagram上分享照片。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Acciones comunes en redes sociales",
        tituloChino: "社交网络上的常见操作",
        descripcion: `🔹 ACCIONES EN REDES SOCIALES (social media actions):
• publicar / postear = to post
• compartir = to share
• dar like / me gusta = to like
• comentar = to comment
• seguir = to follow
• dejar de seguir = to unfollow
• etiquetar = to tag
• enviar un mensaje = to send a message
• hacer una historia = to post a story
• hacer un directo / en vivo = to go live
• bloquear = to block
• reportar = to report
• silenciar = to mute
• guardar = to save
• retuitear = to retweet
• suscribirse = to subscribe

🔹 FRASES ÚTILES (useful phrases):
• Sígueme en Instagram. = Follow me on Instagram.
• Dame like en mi foto. = Like my photo.
• Comparte este video. = Share this video.
• Te etiqueté en la foto. = I tagged you in the photo.
• ¿Has visto mi última historia? = Have you seen my latest story?
• ¿Cuántos seguidores tienes? = How many followers do you have?
• Me he hecho una cuenta nueva. = I've created a new account.
• Tengo que actualizar la aplicación. = I need to update the app.

🔹 SUSTANTIVOS RELACIONADOS:
• seguidor / seguidora = follower
• like / me gusta = like
• comentario = comment
• publicación = post
• historia = story
• perfil = profile
• foto de perfil = profile picture
• biografía = bio
• feed = feed
• tendencia = trend
• hashtag = hashtag
• mención = mention

📌 EJEMPLOS:
• Voy a publicar una foto.
• Comenta algo bonito.
• Te sigo en Instagram.`,
        descripcionChino: `🔹 社交网络上的操作：
• publicar / postear = 发布
• compartir = 分享
• dar like / me gusta = 点赞
• comentar = 评论
• seguir = 关注
• dejar de seguir = 取消关注
• etiquetar = 标记
• enviar un mensaje = 发消息
• hacer una historia = 发故事
• hacer un directo / en vivo = 直播
• bloquear = 屏蔽
• reportar = 举报
• silenciar = 静音
• guardar = 保存
• retuitear = 转发
• suscribirse = 订阅

🔹 有用句子：
• Sígueme en Instagram. = 在Instagram上关注我。
• Dame like en mi foto. = 给我的照片点赞。
• Comparte este video. = 分享这个视频。
• Te etiqueté en la foto. = 我在照片上标记了你。
• ¿Has visto mi última historia? = 你看到我最新发的故事了吗？
• ¿Cuántos seguidores tienes? = 你有多少粉丝？
• Me he hecho una cuenta nueva. = 我创建了一个新账号。
• Tengo que actualizar la aplicación. = 我需要更新这个应用程序。

🔹 相关名词：
• seguidor / seguidora = 粉丝/关注者
• like / me gusta = 点赞
• comentario = 评论
• publicación = 帖子
• historia = 故事
• perfil = 个人资料
• foto de perfil = 头像
• biografía = 个人简介
• feed = 动态流
• tendencia = 趋势
• hashtag = 话题标签
• mención = 提及

📌 例子：
• Voy a publicar una foto. = 我要发布一张照片。
• Comenta algo bonito. = 评论一些美好的东西。
• Te sigo en Instagram. = 我在Instagram上关注你。`,
        ejemplos: [
          {
            espanol: "Voy a publicar una foto.",
            chino: "我要发布一张照片。",
          },
          {
            espanol: "Comenta algo bonito.",
            chino: "评论一些美好的东西。",
          },
          {
            espanol: "Te sigo en Instagram.",
            chino: "我在Instagram上关注你。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Problemas técnicos y soluciones",
        tituloChino: "技术问题和解决方案",
        descripcion: `🔹 PROBLEMAS COMUNES (common problems):
• No tengo cobertura = I have no signal
• No tengo batería = I have no battery
• Se me ha olvidado la contraseña = I forgot my password
• El móvil se ha quedado congelado = My phone froze
• No se conecta al WiFi = It doesn't connect to WiFi
• El internet va muy lento = The internet is very slow
• La página no carga = The page doesn't load
• La aplicación falla = The app crashes
• No tengo espacio en el móvil = I don't have space on my phone
• El cargador no funciona = The charger doesn't work
• La pantalla está rota = The screen is broken
• Me han hackeado la cuenta = My account has been hacked

🔹 SOLUCIONES (solutions):
• Reinicia el móvil = Restart your phone
• Cierra la aplicación y vuelve a abrirla = Close the app and reopen it
• Actualiza el sistema = Update the system
• Borra la caché = Clear the cache
• Libera espacio = Free up space
• Cambia la contraseña = Change your password
• Restablece la configuración de fábrica = Factory reset
• Lleva el móvil al servicio técnico = Take your phone to tech support

🔹 FRASES ÚTILES:
• ¿Cómo puedo restablecer mi contraseña?
• He olvidado mi patrón de desbloqueo.
• ¿Puedes ayudarme con la configuración?
• La batería se agota muy rápido.
• Necesito más memoria en mi teléfono.

📌 EJEMPLOS:
• No tengo cobertura en el metro.
• El móvil se me ha quedado sin batería.
• Tengo que actualizar el sistema.`,
        descripcionChino: `🔹 常见问题：
• No tengo cobertura = 我没有信号
• No tengo batería = 我没电了
• Se me ha olvidado la contraseña = 我忘记密码了
• El móvil se ha quedado congelado = 手机卡住了/死机了
• No se conecta al WiFi = 连不上WiFi
• El internet va muy lento = 网络很慢
• La página no carga = 页面加载不出来
• La aplicación falla = 应用程序崩溃/出问题
• No tengo espacio en el móvil = 手机空间不足
• El cargador no funciona = 充电器坏了
• La pantalla está rota = 屏幕碎了
• Me han hackeado la cuenta = 我的账号被盗了

🔹 解决方案：
• Reinicia el móvil = 重启手机
• Cierra la aplicación y vuelve a abrirla = 关闭应用再重新打开
• Actualiza el sistema = 更新系统
• Borra la caché = 清除缓存
• Libera espacio = 释放空间
• Cambia la contraseña = 更改密码
• Restablece la configuración de fábrica = 恢复出厂设置
• Lleva el móvil al servicio técnico = 把手机拿到维修店

🔹 有用句子：
• ¿Cómo puedo restablecer mi contraseña? = 我怎样才能重置密码？
• He olvidado mi patrón de desbloqueo. = 我忘记了锁屏图案。
• ¿Puedes ayudarme con la configuración? = 你能帮我设置一下吗？
• La batería se agota muy rápido. = 电池耗电很快。
• Necesito más memoria en mi teléfono. = 我需要手机有更多内存。

📌 例子：
• No tengo cobertura en el metro. = 地铁里没信号。
• El móvil se me ha quedado sin batería. = 我的手机没电了。
• Tengo que actualizar el sistema. = 我需要更新系统。`,
        ejemplos: [
          {
            espanol: "No tengo cobertura en el metro.",
            chino: "地铁里没信号。",
          },
          {
            espanol: "El móvil se me ha quedado sin batería.",
            chino: "我的手机没电了。",
          },
          {
            espanol: "Tengo que actualizar el sistema.",
            chino: "我需要更新系统。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "móvil / celular",
        chino: "手机",
        ejemplo: "Mi móvil es nuevo.",
      },
      {
        id: "v2",
        espanol: "ordenador / computadora",
        chino: "电脑",
        ejemplo: "Trabajo con el ordenador.",
      },
      {
        id: "v3",
        espanol: "portátil",
        chino: "笔记本电脑",
        ejemplo: "Tengo un portátil.",
      },
      {
        id: "v4",
        espanol: "tablet",
        chino: "平板电脑",
        ejemplo: "Leo libros en la tablet.",
      },
      {
        id: "v5",
        espanol: "pantalla",
        chino: "屏幕",
        ejemplo: "La pantalla es táctil.",
      },
      {
        id: "v6",
        espanol: "auriculares",
        chino: "耳机",
        ejemplo: "Uso auriculares para escuchar música.",
      },
      {
        id: "v7",
        espanol: "cargador",
        chino: "充电器",
        ejemplo: "¿Tienes el cargador?",
      },
      {
        id: "v8",
        espanol: "batería",
        chino: "电池",
        ejemplo: "La batería está baja.",
      },
      {
        id: "v9",
        espanol: "ratón",
        chino: "鼠标",
        ejemplo: "El ratón no funciona.",
      },
      {
        id: "v10",
        espanol: "teclado",
        chino: "键盘",
        ejemplo: "El teclado es mecánico.",
      },
      {
        id: "v11",
        espanol: "impresora",
        chino: "打印机",
        ejemplo: "Imprimo el documento.",
      },
      {
        id: "v12",
        espanol: "internet",
        chino: "互联网",
        ejemplo: "Necesito internet.",
      },
      {
        id: "v13",
        espanol: "WiFi",
        chino: "无线网络",
        ejemplo: "El WiFi no funciona.",
      },
      {
        id: "v14",
        espanol: "contraseña",
        chino: "密码",
        ejemplo: "Olvidé mi contraseña.",
      },
      {
        id: "v15",
        espanol: "aplicación / app",
        chino: "应用程序",
        ejemplo: "Esta aplicación es útil.",
      },
      {
        id: "v16",
        espanol: "descargar",
        chino: "下载",
        ejemplo: "Voy a descargar el archivo.",
      },
      {
        id: "v17",
        espanol: "subir",
        chino: "上传",
        ejemplo: "Subo fotos a la nube.",
      },
      {
        id: "v18",
        espanol: "actualizar",
        chino: "更新",
        ejemplo: "Debes actualizar el sistema.",
      },
      {
        id: "v19",
        espanol: "guardar",
        chino: "保存",
        ejemplo: "Guarda el documento.",
      },
      {
        id: "v20",
        espanol: "compartir",
        chino: "分享",
        ejemplo: "Comparte la publicación.",
      },
      {
        id: "v21",
        espanol: "enviar",
        chino: "发送",
        ejemplo: "Te envío un mensaje.",
      },
      {
        id: "v22",
        espanol: "recibir",
        chino: "接收",
        ejemplo: "Recibo tu correo.",
      },
      {
        id: "v23",
        espanol: "buscar",
        chino: "搜索",
        ejemplo: "Busco información en Google.",
      },
      {
        id: "v24",
        espanol: "seguir",
        chino: "关注",
        ejemplo: "Te sigo en Instagram.",
      },
      {
        id: "v25",
        espanol: "like / me gusta",
        chino: "点赞",
        ejemplo: "Dale like a mi foto.",
      },
      {
        id: "v26",
        espanol: "comentar",
        chino: "评论",
        ejemplo: "Comenta el video.",
      },
      {
        id: "v27",
        espanol: "publicar",
        chino: "发布",
        ejemplo: "Publico una foto al día.",
      },
      {
        id: "v28",
        espanol: "conectarse",
        chino: "连接",
        ejemplo: "Me conecto a internet.",
      },
      {
        id: "v29",
        espanol: "navegar",
        chino: "浏览",
        ejemplo: "Navego por internet.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Problemas con el móvil",
        tituloChino: "手机问题",
        personajes: ["Ana", "Luis"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Luis, ¿me prestas tu cargador?",
            traduccion: "路易斯，你能借我充电器吗？",
          },
          {
            personaje: "Luis",
            texto: "Claro, ¿qué te pasa con el tuyo?",
            traduccion: "当然，你的怎么了？",
          },
          {
            personaje: "Ana",
            texto: "Se me olvidó en casa y mi batería está al 5%.",
            traduccion: "我忘在家里了，我的电量只有5%。",
          },
          {
            personaje: "Luis",
            texto: "Toma, aquí tienes. ¿Sabes la contraseña del WiFi?",
            traduccion: "给你。你知道WiFi密码吗？",
          },
          {
            personaje: "Ana",
            texto: "Sí, es 'cafeteria2024'. Gracias.",
            traduccion: "是的，是'cafeteria2024'。谢谢。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Instalando una aplicación",
        tituloChino: "安装应用程序",
        personajes: ["Pedro", "María"],
        lineas: [
          {
            personaje: "Pedro",
            texto: "María, ¿tienes esta aplicación?",
            traduccion: "玛丽亚，你有这个应用程序吗？",
          },
          {
            personaje: "María",
            texto: "No, ¿para qué sirve?",
            traduccion: "没有，它是做什么用的？",
          },
          {
            personaje: "Pedro",
            texto: "Es para editar fotos. Es muy fácil de usar.",
            traduccion: "是用来编辑照片的。很容易使用。",
          },
          {
            personaje: "María",
            texto: "Voy a descargarla ahora mismo.",
            traduccion: "我现在就下载。",
          },
          {
            personaje: "Pedro",
            texto: "Te va a encantar. Yo la uso todos los días.",
            traduccion: "你会喜欢的。我每天都用。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Hablando de redes sociales",
        tituloChino: "谈论社交媒体",
        personajes: ["Sofía", "Diego"],
        lineas: [
          {
            personaje: "Sofía",
            texto: "Diego, ¿viste mi última foto en Instagram?",
            traduccion: "迭戈，你看到我在Instagram上的最新照片了吗？",
          },
          {
            personaje: "Diego",
            texto: "Sí, le di like. ¿Cuántos seguidores tienes ya?",
            traduccion: "是的，我点赞了。你现在有多少粉丝了？",
          },
          {
            personaje: "Sofía",
            texto: "Tengo casi dos mil. ¿Y tú?",
            traduccion: "快两千了。你呢？",
          },
          {
            personaje: "Diego",
            texto: "Yo tengo menos, unos quinientos.",
            traduccion: "我比较少，大约五百。",
          },
          {
            personaje: "Sofía",
            texto: "Deberías publicar más. Tus fotos son muy buenas.",
            traduccion: "你应该多发点。你的照片很好。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Problemas técnicos",
        tituloChino: "技术问题",
        personajes: ["Carlos", "Ana"],
        lineas: [
          {
            personaje: "Carlos",
            texto: "Ana, el WiFi no me funciona. ¿Qué puedo hacer?",
            traduccion: "安娜，我的WiFi不工作。我能怎么办？",
          },
          {
            personaje: "Ana",
            texto: "¿Has reiniciado el router?",
            traduccion: "你重启路由器了吗？",
          },
          {
            personaje: "Carlos",
            texto: "Todavía no. Voy a probar.",
            traduccion: "还没。我试试看。",
          },
          {
            personaje: "Ana",
            texto: "A veces solo necesitas reiniciar el dispositivo.",
            traduccion: "有时你只需要重启设备。",
          },
          {
            personaje: "Carlos",
            texto: "¡Funcionó! Gracias por el consejo.",
            traduccion: "成功了！谢谢你的建议。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Comprando un teléfono nuevo",
        tituloChino: "买新手机",
        personajes: ["Laura", "Vendedor"],
        lineas: [
          {
            personaje: "Laura",
            texto: "Buenos días. Busco un teléfono nuevo.",
            traduccion: "早上好。我在找新手机。",
          },
          {
            personaje: "Vendedor",
            texto: "¿Qué tipo de teléfono le interesa?",
            traduccion: "您对什么类型的手机感兴趣？",
          },
          {
            personaje: "Laura",
            texto: "Quiero uno con buena cámara y mucha batería.",
            traduccion: "我想要一个相机好、电池耐用的。",
          },
          {
            personaje: "Vendedor",
            texto: "Este modelo tiene cámara de 108 megapíxeles y batería de 5000 mAh.",
            traduccion: "这个型号有108兆像素摄像头和5000毫安电池。",
          },
          {
            personaje: "Laura",
            texto: "¿Cuánto cuesta?",
            traduccion: "多少钱？",
          },
          {
            personaje: "Vendedor",
            texto: "Cuesta 400 euros. ¿Le interesa?",
            traduccion: "400欧元。您感兴趣吗？",
          },
          {
            personaje: "Laura",
            texto: "Sí, me lo llevo. ¿Aceptan tarjeta?",
            traduccion: "是的，我买了。可以刷卡吗？",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "我需要下载这首歌：Necesito _____ esta canción.",
          preguntaChino: "我需要下载这首歌：Necesito _____ esta canción.",
          respuestaCorrecta: "descargar",
          explicacion: "Descargar = 下载",
          pista: "首字母是 d，9个字母",
          numeroLetras: 9,
        },
        {
          id: "c2",
          pregunta: "我的电池没电了：Mi _____ está baja.",
          preguntaChino: "我的电池没电了：Mi _____ está baja.",
          respuestaCorrecta: "batería",
          explicacion: "Batería = 电池",
          pista: "首字母是 b，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c3",
          pregunta: "我忘了密码：Olvidé mi _____.",
          preguntaChino: "我忘了密码：Olvidé mi _____.",
          respuestaCorrecta: "contraseña",
          explicacion: "Contraseña = 密码",
          pista: "首字母是 c，10个字母",
          numeroLetras: 10,
        },
        {
          id: "c4",
          pregunta: "你应该更新系统：Debes _____ el sistema.",
          preguntaChino: "你应该更新系统：Debes _____ el sistema.",
          respuestaCorrecta: "actualizar",
          explicacion: "Actualizar = 更新",
          pista: "首字母是 a，10个字母",
          numeroLetras: 10,
        },
        {
          id: "c5",
          pregunta: "关注我：_____me en Instagram.",
          preguntaChino: "关注我：_____me en Instagram.",
          respuestaCorrecta: "Sigue",
          explicacion: "Seguir = 关注",
          pista: "首字母是 S，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c6",
          pregunta: "我需要一个充电器：Necesito un _____.",
          preguntaChino: "我需要一个充电器：Necesito un _____.",
          respuestaCorrecta: "cargador",
          explicacion: "Cargador = 充电器",
          pista: "首字母是 c，8个字母",
          numeroLetras: 8,
        },
        {
          id: "c7",
          pregunta: "我在Google上搜索信息：_____ información en Google.",
          preguntaChino: "我在Google上搜索信息：_____ información en Google.",
          respuestaCorrecta: "Busco",
          explicacion: "Buscar = 搜索",
          pista: "首字母是 B，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c8",
          pregunta: "我把文件保存在U盘里：Guardo el archivo en la memoria _____.",
          preguntaChino: "我把文件保存在U盘里：Guardo el archivo en la memoria _____.",
          respuestaCorrecta: "USB",
          explicacion: "Memoria USB = U盘",
          pista: "首字母是 U，3个字母",
          numeroLetras: 3,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "哪个是手机？",
          preguntaChino: "哪个是手机？",
          opciones: ["ordenador", "móvil", "tablet", "portátil"],
          respuestaCorrecta: "móvil",
          explicacion: "Móvil = 手机",
        },
        {
          id: "s2",
          pregunta: "你在哪里连接互联网？",
          preguntaChino: "你在哪里连接互联网？",
          opciones: ["cargador", "batería", "WiFi", "pantalla"],
          respuestaCorrecta: "WiFi",
          explicacion: "WiFi连接互联网",
        },
        {
          id: "s3",
          pregunta: "'Descargar'是什么意思？",
          preguntaChino: "'Descargar'是什么意思？",
          opciones: ["上传", "下载", "保存", "删除"],
          respuestaCorrecta: "下载",
          explicacion: "Descargar = 下载",
        },
        {
          id: "s4",
          pregunta: "你在社交媒体上'关注'某人怎么说？",
          preguntaChino: "你在社交媒体上'关注'某人怎么说？",
          opciones: ["like", "compartir", "seguir", "etiquetar"],
          respuestaCorrecta: "seguir",
          explicacion: "Seguir = 关注",
        },
        {
          id: "s5",
          pregunta: "哪个是鼠标？",
          preguntaChino: "哪个是鼠标？",
          opciones: ["teclado", "pantalla", "ratón", "impresora"],
          respuestaCorrecta: "ratón",
          explicacion: "Ratón = 鼠标",
        },
        {
          id: "s6",
          pregunta: "¿Cómo se dice '重启手机' en español?",
          preguntaChino: "西班牙语中'重启手机'怎么说？",
          opciones: ["Apagar el móvil", "Reiniciar el móvil", "Cerrar el móvil", "Actualizar el móvil"],
          respuestaCorrecta: "Reiniciar el móvil",
          explicacion: "Reiniciar = 重启",
        },
        {
          id: "s7",
          pregunta: "¿Qué significa 'hackear'?",
          preguntaChino: "'hackear'是什么意思？",
          opciones: ["保护", "攻击", "黑客入侵", "修复"],
          respuestaCorrecta: "黑客入侵",
          explicacion: "Hackear = 入侵",
        },
        {
          id: "s8",
          pregunta: "¿Cómo se dice '密码' en español?",
          preguntaChino: "西班牙语中'密码'怎么说？",
          opciones: ["usuario", "contraseña", "correo", "enlace"],
          respuestaCorrecta: "contraseña",
          explicacion: "Contraseña = 密码",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Actualizar'意思是更新。",
          preguntaChino: "'Actualizar'意思是更新。",
          respuestaCorrecta: true,
          explicacion: "对。Actualizar = update",
        },
        {
          id: "vf2",
          pregunta: "'Borrar'意思是保存。",
          preguntaChino: "'Borrar'意思是保存。",
          respuestaCorrecta: false,
          explicacion: "错。Borrar = 删除",
        },
        {
          id: "vf3",
          pregunta: "WiFi是无线网络连接。",
          preguntaChino: "WiFi是无线网络连接。",
          respuestaCorrecta: true,
          explicacion: "对。WiFi = conexión inalámbrica",
        },
        {
          id: "vf4",
          pregunta: "'Portátil'是台式电脑。",
          preguntaChino: "'Portátil'是台式电脑。",
          respuestaCorrecta: false,
          explicacion: "错。Portátil = 笔记本电脑",
        },
        {
          id: "vf5",
          pregunta: "Instagram是一个社交媒体平台。",
          preguntaChino: "Instagram是一个社交媒体平台。",
          respuestaCorrecta: true,
          explicacion: "对。Instagram es una red social",
        },
        {
          id: "vf6",
          pregunta: "La 'memoria USB' se usa para almacenar datos.",
          preguntaChino: "'Memoria USB'用于存储数据。",
          respuestaCorrecta: true,
          explicacion: "对。Memoria USB = USB drive",
        },
        {
          id: "vf7",
          pregunta: "El 'teclado' sirve para hacer clic.",
          preguntaChino: "'Teclado'用于点击。",
          respuestaCorrecta: false,
          explicacion: "错。El teclado es para escribir.",
        },
        {
          id: "vf8",
          pregunta: "La 'batería externa' se usa para cargar el móvil sin enchufe.",
          preguntaChino: "'Batería externa'用于在没有插座的情况下给手机充电。",
          respuestaCorrecta: true,
          explicacion: "对。Power bank = batería externa",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "móvil",
              derecha: "手机",
            },
            {
              izquierda: "ordenador",
              derecha: "电脑",
            },
            {
              izquierda: "portátil",
              derecha: "笔记本电脑",
            },
            {
              izquierda: "tablet",
              derecha: "平板电脑",
            },
            {
              izquierda: "ratón",
              derecha: "鼠标",
            },
            {
              izquierda: "teclado",
              derecha: "键盘",
            },
            {
              izquierda: "auriculares",
              derecha: "耳机",
            },
            {
              izquierda: "cargador",
              derecha: "充电器",
            },
            {
              izquierda: "batería",
              derecha: "电池",
            },
            {
              izquierda: "descargar",
              derecha: "下载",
            },
            {
              izquierda: "subir",
              derecha: "上传",
            },
            {
              izquierda: "guardar",
              derecha: "保存",
            },
            {
              izquierda: "borrar",
              derecha: "删除",
            },
            {
              izquierda: "seguir",
              derecha: "关注",
            },
            {
              izquierda: "compartir",
              derecha: "分享",
            },
            {
              izquierda: "contraseña",
              derecha: "密码",
            },
            {
              izquierda: "WiFi",
              derecha: "无线网络",
            },
          ],
          explicacion: "将科技词汇与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["batería", "Mi", "tiene", "poca", "móvil", "."],
          respuestaCorrecta: "Mi móvil tiene poca batería.",
          explicacion: "正确的句子是：Mi móvil tiene poca batería.（我的手机电量不足。）",
        },
        {
          id: "o2",
          palabras: ["contraseña", "es", "la", "WiFi", "¿Cuál", "?"],
          respuestaCorrecta: "¿Cuál es la contraseña del WiFi?",
          explicacion: "正确的句子是：¿Cuál es la contraseña del WiFi?（WiFi密码是什么？）",
        },
        {
          id: "o3",
          palabras: ["Instagram", "Te", "sigo", "en", "."],
          respuestaCorrecta: "Te sigo en Instagram.",
          explicacion: "正确的句子是：Te sigo en Instagram.（我在Instagram上关注你。）",
        },
        {
          id: "o4",
          palabras: ["móvil", "reiniciar", "Tengo", "que", "el", "."],
          respuestaCorrecta: "Tengo que reiniciar el móvil.",
          explicacion: "正确的顺序是：Tengo que reiniciar el móvil.",
        },
        {
          id: "o5",
          palabras: ["la", "actualizar", "Debo", "aplicación", "."],
          respuestaCorrecta: "Debo actualizar la aplicación.",
          explicacion: "正确的顺序是：Debo actualizar la aplicación.",
        },
        {
          id: "o6",
          palabras: ["puedo", "cómo", "contraseña", "recuperar", "¿", "mi", "?"],
          respuestaCorrecta: "¿Cómo puedo recuperar mi contraseña?",
          explicacion: "正确的顺序是：¿Cómo puedo recuperar mi contraseña?",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我的手机没电了。",
          respuestaEsperada: "Mi móvil no tiene batería.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "我需要下载这个应用程序。",
          respuestaEsperada: "Necesito descargar esta aplicación.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "请给我点赞。",
          respuestaEsperada: "Dame like, por favor.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "我把文件保存在U盘里。",
          respuestaEsperada: "Guardo el archivo en la memoria USB.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "WiFi密码是什么？",
          respuestaEsperada: "¿Cuál es la contraseña del WiFi?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "我每天发布一张照片。",
          respuestaEsperada: "Publico una foto al día.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "你必须更新系统。",
          respuestaEsperada: "Debes actualizar el sistema.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "我忘记了我的密码。",
          respuestaEsperada: "Olvidé mi contraseña.",
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
        instruccion: "用正确的科技词汇完成对话。",
        instruccionChino: "用正确的科技词汇完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿Cuál es la _____ del WiFi?",
            respuesta: "contraseña",
          },
          {
            personaje: "B",
            texto: "Es 'cafeteria2024'. ¿Necesitas el _____?",
            respuesta: "cargador",
          },
          {
            personaje: "A",
            texto: "Sí, mi _____ está baja.",
            respuesta: "batería",
          },
          {
            personaje: "B",
            texto: "Aquí tienes. No olvides _____ el sistema.",
            respuesta: "actualizar",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "responder",
        titulo: "Responde las preguntas",
        tituloChino: "回答问题",
        instruccion: "Responde las siguientes preguntas sobre tecnología en español.",
        instruccionChino: "用西班牙语回答以下关于科技的问题。",
        preguntas: [
          {
            pregunta: "¿Qué aplicación usas más?",
            respuestaEsperada: "Uso más WhatsApp / Instagram / YouTube.",
          },
          {
            pregunta: "¿Cuánto tiempo pasas en el móvil cada día?",
            respuestaEsperada: "Pasó (dos / tres / cuatro) horas al día.",
          },
          {
            pregunta: "¿Tienes redes sociales? ¿Cuáles?",
            respuestaEsperada: "Sí, tengo Instagram y TikTok. / No, no tengo redes sociales.",
          },
          {
            pregunta: "¿Qué haces si te quedas sin batería?",
            respuestaEsperada: "Busco un cargador o una batería externa.",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "consejos",
        titulo: "Consejos de seguridad en internet",
        tituloChino: "互联网安全建议",
        instruccion: "Escribe 3 consejos para proteger tu información en internet.",
        instruccionChino: "写出3条保护你在互联网上信息的建议。",
        ejemplo:
          "1. No compartas tu contraseña con nadie. 2. Usa contraseñas seguras con letras, números y símbolos. 3. No hagas clic en enlaces sospechosos.",
      },
      {
        id: "ep4",
        tipo: "completarTabla",
        titulo: "Completa la tabla de dispositivos",
        tituloChino: "完成设备表格",
        instruccion: "Escribe el nombre del dispositivo en español.",
        instruccionChino: "用西班牙语写出设备的名称。",
        tabla: [
          {
            espanol: "teléfono móvil",
            chino: "手机",
          },
          {
            espanol: "ordenador portátil",
            chino: "笔记本电脑",
          },
          {
            espanol: "tablet",
            chino: "平板电脑",
          },
          {
            espanol: "auriculares",
            chino: "耳机",
          },
          {
            espanol: "cargador",
            chino: "充电器",
          },
          {
            espanol: "ratón",
            chino: "鼠标",
          },
          {
            espanol: "teclado",
            chino: "键盘",
          },
        ],
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Qué dispositivos tecnológicos tienes?",
        preguntaChino: "你有什么科技设备？",
        sugerencia: "Tengo un móvil, un ordenador portátil y unos auriculares.",
        sugerenciaChino: "Tengo un móvil, un ordenador portátil y unos auriculares.",
      },
      {
        id: "pa2",
        pregunta: "¿Qué redes sociales usas? ¿Para qué las usas?",
        preguntaChino: "你用什么社交媒体？用来做什么？",
        sugerencia: "Uso Instagram para ver fotos y WhatsApp para hablar con amigos.",
        sugerenciaChino: "Uso Instagram para ver fotos y WhatsApp para hablar con amigos.",
      },
      {
        id: "pa3",
        pregunta: "¿Cómo proteges tu información en internet?",
        preguntaChino: "你如何保护你在互联网上的信息？",
        sugerencia: "Uso contraseñas seguras y no las comparto con nadie.",
        sugerenciaChino: "Uso contraseñas seguras y no las comparto con nadie.",
      },
      {
        id: "pa4",
        pregunta: "¿Qué haces cuando tu móvil se queda sin batería?",
        preguntaChino: "当你的手机没电时你会做什么？",
        sugerencia: "Busco un cargador o uso una batería externa.",
        sugerenciaChino: "Busco un cargador o uso una batería externa.",
      },
      {
        id: "pa5",
        pregunta: "¿Qué opinas de pasar mucho tiempo en redes sociales?",
        preguntaChino: "你如何看待花很多时间在社交媒体上？",
        sugerencia: "Creo que es bueno usarlas con moderación, sin excederse.",
        sugerenciaChino: "Creo que es bueno usarlas con moderación, sin excederse.",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '手机' en español?",
        preguntaChino: "西班牙语中'手机'怎么说？",
        respuestaSugerida: "móvil / celular",
        respuestaSugeridaChino: "móvil / celular",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '下载' en español?",
        preguntaChino: "西班牙语中'下载'怎么说？",
        respuestaSugerida: "descargar",
        respuestaSugeridaChino: "descargar",
      },
      {
        id: "p3",
        pregunta: "¿Qué significa 'actualizar'?",
        preguntaChino: "'actualizar'是什么意思？",
        respuestaSugerida: "更新",
        respuestaSugeridaChino: "Update",
      },
      {
        id: "p4",
        pregunta: "¿Cómo pides la contraseña del WiFi en español?",
        preguntaChino: "你如何用西班牙语问WiFi密码？",
        respuestaSugerida: "¿Cuál es la contraseña del WiFi?",
        respuestaSugeridaChino: "¿Cuál es la contraseña del WiFi?",
      },
      {
        id: "p5",
        pregunta: "¿Qué significa 'hackear'?",
        preguntaChino: "'hackear'是什么意思？",
        respuestaSugerida: "Entrar en una cuenta sin permiso / 黑客入侵",
        respuestaSugeridaChino: "Entrar en una cuenta sin permiso",
      },
      {
        id: "p6",
        pregunta: "¿Cómo se dice '笔记本电脑' en español?",
        preguntaChino: "西班牙语中'笔记本电脑'怎么说？",
        respuestaSugerida: "portátil",
        respuestaSugeridaChino: "portátil",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Aficiones y hobbies",
        tituloChino: "爱好和兴趣",
        descripcion: `🔹 AFICIONES COMUNES (common hobbies):
• leer = to read
• escuchar música = to listen to music
• dibujar = to draw
• pintar = to paint
• cocinar = to cook
• bailar = to dance
• cantar = to sing
• tocar un instrumento = to play an instrument
• jugar al fútbol / al baloncesto / al tenis = to play football / basketball / tennis
• ver películas = to watch movies
• jugar a videojuegos = to play video games
• hacer fotos = to take photos
• pasear = to go for a walk
• viajar = to travel
• descansar = to rest

📌 EJEMPLOS:
• Me gusta leer libros de aventuras.
• En mi tiempo libre escucho música.
• Los fines de semana juego al fútbol con mis amigos.`,
        descripcionChino: `🔹 常见爱好：
• leer = 阅读
• escuchar música = 听音乐
• dibujar = 画画
• pintar = 绘画
• cocinar = 烹饪
• bailar = 跳舞
• cantar = 唱歌
• tocar un instrumento = 演奏乐器
• jugar al fútbol / al baloncesto / al tenis = 踢足球/打篮球/打网球
• ver películas = 看电影
• jugar a videojuegos = 玩电子游戏
• hacer fotos = 拍照
• pasear = 散步
• viajar = 旅行
• descansar = 休息

📌 例子：
• Me gusta leer libros de aventuras. = 我喜欢读冒险小说。
• En mi tiempo libre escucho música. = 我空闲时听音乐。
• Los fines de semana juego al fútbol con mis amigos. = 周末我和朋友踢足球。`,
        ejemplos: [
          {
            espanol: "Me gusta leer libros de aventuras.",
            chino: "我喜欢读冒险小说。",
          },
          {
            espanol: "En mi tiempo libre escucho música.",
            chino: "我空闲时听音乐。",
          },
          {
            espanol: "Los fines de semana juego al fútbol con mis amigos.",
            chino: "周末我和朋友踢足球。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Gustar y encantar",
        tituloChino: "Gustar 和 encantar",
        descripcion: `🔹 EXPRESAR GUSTOS (expressing likes):
• Me gusta + infinitivo = I like + verb
• Me encanta + infinitivo = I love + verb
• Me gusta + sustantivo = I like + noun
• Me gustan + sustantivo plural = I like + plural noun
• No me gusta = I don't like
• Odio = I hate

📌 RECUERDA:
"Gustar" funciona de forma especial: lo que gusta es el sujeto.
• Me gusta el café. (= el café me gusta a mí)
• Me gustan los libros. (= los libros me gustan a mí)
• Me gusta bailar. (= bailar me gusta a mí)
• A mi amigo le gusta el fútbol.

📌 EJEMPLOS:
• Me encanta escuchar música clásica.
• No me gusta cocinar, prefiero comer fuera.
• A mi hermana le gustan las películas de terror.`,
        descripcionChino: `🔹 表达喜好：
• Me gusta + 动词原形 = 我喜欢……
• Me encanta + 动词原形 = 我非常喜欢……
• Me gusta + 名词 = 我喜欢……
• Me gustan + 复数名词 = 我喜欢（复数）……
• No me gusta = 我不喜欢
• Odio = 我讨厌

📌 记住：
"Gustar" 用法特殊：喜欢的东西是主语。
• Me gusta el café. = 咖啡让我喜欢（我喜欢咖啡）。
• Me gustan los libros. = 书让我喜欢（我喜欢书）。
• Me gusta bailar. = 跳舞让我喜欢（我喜欢跳舞）。
• A mi amigo le gusta el fútbol. = 我的朋友喜欢足球。

📌 例子：
• Me encanta escuchar música clásica. = 我非常喜欢听古典音乐。
• No me gusta cocinar, prefiero comer fuera. = 我不喜欢做饭，我更喜欢出去吃。
• A mi hermana le gustan las películas de terror. = 我妹妹喜欢恐怖电影。`,
        ejemplos: [
          {
            espanol: "Me encanta escuchar música clásica.",
            chino: "我非常喜欢听古典音乐。",
          },
          {
            espanol: "No me gusta cocinar, prefiero comer fuera.",
            chino: "我不喜欢做饭，我更喜欢出去吃。",
          },
          {
            espanol: "A mi hermana le gustan las películas de terror.",
            chino: "我妹妹喜欢恐怖电影。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Preguntar por aficiones",
        tituloChino: "询问爱好",
        descripcion: `🔹 PREGUNTAS SOBRE AFICIONES (asking about hobbies):
• ¿Qué te gusta hacer en tu tiempo libre? = What do you like to do in your free time?
• ¿Cuáles son tus aficiones? = What are your hobbies?
• ¿Te gusta...? = Do you like...?
• ¿Qué haces los fines de semana? = What do you do on weekends?
• ¿Practicas algún deporte? = Do you play any sport?
• ¿Qué tipo de música te gusta? = What kind of music do you like?

📌 RESPUESTAS:
• Me gusta... = I like...
• Mi afición favorita es... = My favorite hobby is...
• En mi tiempo libre... = In my free time...
• Sí, me encanta. / No, no me gusta mucho.
• Juego al tenis. / Hago natación.

📌 EJEMPLOS:
• ¿Qué te gusta hacer en tu tiempo libre?
• ¿Practicas algún deporte?
• Mi afición favorita es la fotografía.`,
        descripcionChino: `🔹 询问爱好：
• ¿Qué te gusta hacer en tu tiempo libre? = 你空闲时间喜欢做什么？
• ¿Cuáles son tus aficiones? = 你的爱好是什么？
• ¿Te gusta...? = 你喜欢……吗？
• ¿Qué haces los fines de semana? = 你周末做什么？
• ¿Practicas algún deporte? = 你做什么运动吗？
• ¿Qué tipo de música te gusta? = 你喜欢什么类型的音乐？

📌 回答：
• Me gusta... = 我喜欢……
• Mi afición favorita es... = 我最喜欢的爱好是……
• En mi tiempo libre... = 在我空闲时间……
• Sí, me encanta. / No, no me gusta mucho. = 是的，非常喜欢。/ 不，不太喜欢。
• Juego al tenis. / Hago natación. = 我打网球。/ 我游泳。

📌 例子：
• ¿Qué te gusta hacer en tu tiempo libre? = 你空闲时间喜欢做什么？
• ¿Practicas algún deporte? = 你做什么运动吗？
• Mi afición favorita es la fotografía. = 我最喜欢的爱好是摄影。`,
        ejemplos: [
          {
            espanol: "¿Qué te gusta hacer en tu tiempo libre?",
            chino: "你空闲时间喜欢做什么？",
          },
          {
            espanol: "¿Practicas algún deporte?",
            chino: "你做什么运动吗？",
          },
          {
            espanol: "Mi afición favorita es la fotografía.",
            chino: "我最喜欢的爱好是摄影。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Frecuencia y tiempo libre",
        tituloChino: "频率与空闲时间",
        descripcion: `🔹 ADVERBIOS DE FRECUENCIA (frequency adverbs):
• siempre = always
• casi siempre = almost always
• normalmente = normally
• a menudo = often
• a veces = sometimes
• casi nunca = almost never
• nunca = never

📌 EXPRESIONES DE TIEMPO:
• todos los días = every day
• los fines de semana = on weekends
• por las tardes = in the afternoons
• en mi tiempo libre = in my free time
• cuando tengo tiempo = when I have time

📌 EJEMPLOS:
• Siempre leo antes de dormir.
• A veces juego a videojuegos por la noche.
• Nunca veo la televisión, prefiero leer.
• Los fines de semana salgo con mis amigos.`,
        descripcionChino: `🔹 频率副词：
• siempre = 总是
• casi siempre = 几乎总是
• normalmente = 通常
• a menudo = 经常
• a veces = 有时
• casi nunca = 几乎从不
• nunca = 从不

📌 时间表达：
• todos los días = 每天
• los fines de semana = 周末
• por las tardes = 下午
• en mi tiempo libre = 在我空闲时间
• cuando tengo tiempo = 当我有时间时

📌 例子：
• Siempre leo antes de dormir. = 我睡觉前总是阅读。
• A veces juego a videojuegos por la noche. = 我有时晚上玩电子游戏。
• Nunca veo la televisión, prefiero leer. = 我从不看电视，我更喜欢阅读。
• Los fines de semana salgo con mis amigos. = 周末我和朋友出去。`,
        ejemplos: [
          {
            espanol: "Siempre leo antes de dormir.",
            chino: "我睡觉前总是阅读。",
          },
          {
            espanol: "A veces juego a videojuegos por la noche.",
            chino: "我有时晚上玩电子游戏。",
          },
          {
            espanol: "Los fines de semana salgo con mis amigos.",
            chino: "周末我和朋友出去。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "el tiempo libre",
        chino: "空闲时间",
        ejemplo: "En mi tiempo libre leo.",
      },
      {
        id: "v2",
        espanol: "la afición",
        chino: "爱好",
        ejemplo: "Mi afición favorita es dibujar.",
      },
      {
        id: "v3",
        espanol: "leer",
        chino: "阅读",
        ejemplo: "Me gusta leer novelas.",
      },
      {
        id: "v4",
        espanol: "escuchar música",
        chino: "听音乐",
        ejemplo: "Escucho música cada día.",
      },
      {
        id: "v5",
        espanol: "dibujar",
        chino: "画画",
        ejemplo: "Mi hija dibuja muy bien.",
      },
      {
        id: "v6",
        espanol: "pintar",
        chino: "绘画",
        ejemplo: "Pinto paisajes los domingos.",
      },
      {
        id: "v7",
        espanol: "cocinar",
        chino: "烹饪",
        ejemplo: "Me gusta cocinar platos chinos.",
      },
      {
        id: "v8",
        espanol: "bailar",
        chino: "跳舞",
        ejemplo: "Bailo salsa los sábados.",
      },
      {
        id: "v9",
        espanol: "cantar",
        chino: "唱歌",
        ejemplo: "Canto en la ducha.",
      },
      {
        id: "v10",
        espanol: "tocar la guitarra",
        chino: "弹吉他",
        ejemplo: "Toco la guitarra con mis amigos.",
      },
      {
        id: "v11",
        espanol: "jugar al fútbol",
        chino: "踢足球",
        ejemplo: "Juego al fútbol los fines de semana.",
      },
      {
        id: "v12",
        espanol: "hacer deporte",
        chino: "做运动",
        ejemplo: "Hago deporte tres veces por semana.",
      },
      {
        id: "v13",
        espanol: "ver películas",
        chino: "看电影",
        ejemplo: "Me gusta ver películas de acción.",
      },
      {
        id: "v14",
        espanol: "jugar a videojuegos",
        chino: "玩电子游戏",
        ejemplo: "Juego a videojuegos por la noche.",
      },
      {
        id: "v15",
        espanol: "hacer fotos",
        chino: "拍照",
        ejemplo: "Me gusta hacer fotos de la naturaleza.",
      },
      {
        id: "v16",
        espanol: "pasear",
        chino: "散步",
        ejemplo: "Paseo por el parque cada tarde.",
      },
      {
        id: "v17",
        espanol: "descansar",
        chino: "休息",
        ejemplo: "El domingo descanso en casa.",
      },
      {
        id: "v18",
        espanol: "a veces",
        chino: "有时",
        ejemplo: "A veces salgo a correr.",
      },
      {
        id: "v19",
        espanol: "los fines de semana",
        chino: "周末",
        ejemplo: "Los fines de semana viajo.",
      },
      {
        id: "v20",
        espanol: "¿Qué te gusta hacer?",
        chino: "你喜欢做什么？",
        ejemplo: "¿Qué te gusta hacer en tu tiempo libre?",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Hablando de aficiones",
        tituloChino: "谈论爱好",
        personajes: ["Ana", "Luis"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Hola, Luis. ¿Qué te gusta hacer en tu tiempo libre?",
            traduccion: "你好，路易斯。你空闲时间喜欢做什么？",
          },
          {
            personaje: "Luis",
            texto: "Me gusta jugar al fútbol y escuchar música.",
            traduccion: "我喜欢踢足球和听音乐。",
          },
          {
            personaje: "Ana",
            texto: "¡Qué bien! ¿Juegas al fútbol todos los días?",
            traduccion: "太好了！你每天都踢足球吗？",
          },
          {
            personaje: "Luis",
            texto: "No, solo los fines de semana. ¿Y a ti?",
            traduccion: "不，只有周末。你呢？",
          },
          {
            personaje: "Ana",
            texto: "A mí me encanta dibujar y hacer fotos.",
            traduccion: "我非常喜欢画画和拍照。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Gustos musicales",
        tituloChino: "音乐品味",
        personajes: ["Pedro", "María"],
        lineas: [
          {
            personaje: "Pedro",
            texto: "¿Qué tipo de música te gusta, María?",
            traduccion: "玛丽亚，你喜欢什么类型的音乐？",
          },
          {
            personaje: "María",
            texto: "Me encanta la música clásica y el jazz.",
            traduccion: "我非常喜欢古典音乐和爵士乐。",
          },
          {
            personaje: "Pedro",
            texto: "Yo prefiero el rock. ¿Tocas algún instrumento?",
            traduccion: "我更喜欢摇滚。你会演奏乐器吗？",
          },
          {
            personaje: "María",
            texto: "Sí, toco el piano desde pequeña.",
            traduccion: "会，我从小弹钢琴。",
          },
          {
            personaje: "Pedro",
            texto: "¡Qué interesante! Yo toco la guitarra.",
            traduccion: "真有趣！我弹吉他。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Planes para el fin de semana",
        tituloChino: "周末计划",
        personajes: ["Sara", "Diego"],
        lineas: [
          {
            personaje: "Sara",
            texto: "¿Qué haces este fin de semana, Diego?",
            traduccion: "迭戈，这个周末你做什么？",
          },
          {
            personaje: "Diego",
            texto: "El sábado voy a un concierto. ¿Quieres venir?",
            traduccion: "周六我去看演唱会。你想来吗？",
          },
          {
            personaje: "Sara",
            texto: "¡Me encantaría! ¿A qué hora empieza?",
            traduccion: "我很想去！几点开始？",
          },
          {
            personaje: "Diego",
            texto: "A las ocho de la tarde. Quedamos a las siete.",
            traduccion: "晚上八点。我们七点见。",
          },
          {
            personaje: "Sara",
            texto: "Perfecto. El domingo descanso en casa.",
            traduccion: "完美。周日我在家休息。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "El deporte",
        tituloChino: "运动",
        personajes: ["Carlos", "Elena"],
        lineas: [
          {
            personaje: "Carlos",
            texto: "¿Practicas algún deporte, Elena?",
            traduccion: "埃琳娜，你做什么运动吗？",
          },
          {
            personaje: "Elena",
            texto: "Sí, hago natación dos veces por semana.",
            traduccion: "是的，我每周游泳两次。",
          },
          {
            personaje: "Carlos",
            texto: "Yo juego al baloncesto con mis compañeros.",
            traduccion: "我和同事们打篮球。",
          },
          {
            personaje: "Elena",
            texto: "¿Con qué frecuencia juegas?",
            traduccion: "你多久打一次？",
          },
          {
            personaje: "Carlos",
            texto: "Casi todos los viernes por la tarde.",
            traduccion: "几乎每周五下午。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Pasear por el parque",
        tituloChino: "在公园散步",
        personajes: ["Marta", "Jorge"],
        lineas: [
          {
            personaje: "Marta",
            texto: "Me gusta pasear por el parque los domingos.",
            traduccion: "我喜欢周日去公园散步。",
          },
          {
            personaje: "Jorge",
            texto: "A mí también. ¿Sueles ir por la mañana?",
            traduccion: "我也是。你通常早上去吗？",
          },
          {
            personaje: "Marta",
            texto: "Sí, temprano, cuando hay poca gente.",
            traduccion: "是的，很早，人少的时候。",
          },
          {
            personaje: "Jorge",
            texto: "Yo a veces hago fotos de las flores.",
            traduccion: "我有时给花拍照。",
          },
          {
            personaje: "Marta",
            texto: "¡Qué bonito! El parque es muy tranquilo.",
            traduccion: "真美！公园很安静。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "Me gusta _____ libros de aventuras.",
          preguntaChino: "我喜欢读冒险小说。",
          respuestaCorrecta: "leer",
          explicacion: "Leer = 阅读",
          pista: "l e e r",
          numeroLetras: 4,
        },
        {
          id: "c2",
          pregunta: "En mi tiempo libre escucho _____.",
          preguntaChino: "我空闲时间听音乐。",
          respuestaCorrecta: "música",
          explicacion: "Música = 音乐",
          pista: "m ú s i c a",
          numeroLetras: 6,
        },
        {
          id: "c3",
          pregunta: "Los fines de semana juego al _____.",
          preguntaChino: "周末我踢足球。",
          respuestaCorrecta: "fútbol",
          explicacion: "Fútbol = 足球",
          pista: "f ú t b o l",
          numeroLetras: 6,
        },
        {
          id: "c4",
          pregunta: "Me _____ dibujar y pintar.",
          preguntaChino: "我喜欢画画和绘画。",
          respuestaCorrecta: "gusta",
          explicacion: "Gustar = 喜欢",
          pista: "g u s t a",
          numeroLetras: 5,
        },
        {
          id: "c5",
          pregunta: "¿Qué te gusta hacer en tu _____ libre?",
          preguntaChino: "你空闲时间喜欢做什么？",
          respuestaCorrecta: "tiempo",
          explicacion: "Tiempo libre = 空闲时间",
          pista: "t i e m p o",
          numeroLetras: 6,
        },
        {
          id: "c6",
          pregunta: "_____ leo antes de dormir.",
          preguntaChino: "我睡觉前总是阅读。",
          respuestaCorrecta: "Siempre",
          explicacion: "Siempre = 总是",
          pista: "s i e m p r e",
          numeroLetras: 7,
        },
        {
          id: "c7",
          pregunta: "Mi afición favorita es la _____.",
          preguntaChino: "我最喜欢的爱好是摄影。",
          respuestaCorrecta: "fotografía",
          explicacion: "Fotografía = 摄影",
          pista: "f o t o g r a f í a",
          numeroLetras: 10,
        },
        {
          id: "c8",
          pregunta: "Me encanta _____ la guitarra.",
          preguntaChino: "我非常喜欢弹吉他。",
          respuestaCorrecta: "tocar",
          explicacion: "Tocar = 演奏",
          pista: "t o c a r",
          numeroLetras: 5,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "¿Cómo se dice '空闲时间' en español?",
          preguntaChino: "西班牙语中'空闲时间'怎么说？",
          opciones: ["el tiempo libre", "el fin de semana", "el trabajo", "la hora"],
          respuestaCorrecta: "el tiempo libre",
          explicacion: "Tiempo libre = 空闲时间",
        },
        {
          id: "s2",
          pregunta: "¿Qué significa 'Me encanta bailar'?",
          preguntaChino: "'Me encanta bailar'是什么意思？",
          opciones: ["我不喜欢跳舞", "我非常喜欢跳舞", "我会跳舞", "我讨厌跳舞"],
          respuestaCorrecta: "我非常喜欢跳舞",
          explicacion: "Encantar = 非常喜欢",
        },
        {
          id: "s3",
          pregunta: "¿Cómo se dice '画画' en español?",
          preguntaChino: "西班牙语中'画画'怎么说？",
          opciones: ["cocinar", "dibujar", "cantar", "viajar"],
          respuestaCorrecta: "dibujar",
          explicacion: "Dibujar = 画画",
        },
        {
          id: "s4",
          pregunta: "¿Qué significa 'a veces'?",
          preguntaChino: "'a veces'是什么意思？",
          opciones: ["总是", "从不", "有时", "经常"],
          respuestaCorrecta: "有时",
          explicacion: "A veces = 有时",
        },
        {
          id: "s5",
          pregunta: "¿Qué significa 'nunca'?",
          preguntaChino: "'nunca'是什么意思？",
          opciones: ["总是", "从不", "有时", "通常"],
          respuestaCorrecta: "从不",
          explicacion: "Nunca = 从不",
        },
        {
          id: "s6",
          pregunta: "¿Cómo se dice '唱歌' en español?",
          preguntaChino: "西班牙语中'唱歌'怎么说？",
          opciones: ["bailar", "cantar", "leer", "pintar"],
          respuestaCorrecta: "cantar",
          explicacion: "Cantar = 唱歌",
        },
        {
          id: "s7",
          pregunta: "¿Qué verbo usas para 'tocar la guitarra'?",
          preguntaChino: "'弹吉他'用哪个动词？",
          opciones: ["jugar", "hacer", "tocar", "ver"],
          respuestaCorrecta: "tocar",
          explicacion: "Tocar la guitarra = 弹吉他",
        },
        {
          id: "s8",
          pregunta: "¿Cómo se dice '拍照' en español?",
          preguntaChino: "西班牙语中'拍照'怎么说？",
          opciones: ["hacer fotos", "ver fotos", "dibujar", "pintar"],
          respuestaCorrecta: "hacer fotos",
          explicacion: "Hacer fotos = 拍照",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Leer' significa 阅读.",
          preguntaChino: "'Leer'意思是阅读。",
          respuestaCorrecta: true,
          explicacion: "对。Leer = 阅读",
        },
        {
          id: "vf2",
          pregunta: "'Bailar' significa 唱歌.",
          preguntaChino: "'Bailar'意思是唱歌。",
          respuestaCorrecta: false,
          explicacion: "错。Bailar = 跳舞，Cantar = 唱歌",
        },
        {
          id: "vf3",
          pregunta: "'Me encanta' expresa un gusto muy fuerte.",
          preguntaChino: "'Me encanta'表达非常强烈的喜欢。",
          respuestaCorrecta: true,
          explicacion: "对。Encantar = 非常喜欢",
        },
        {
          id: "vf4",
          pregunta: "'Nunca' significa 总是.",
          preguntaChino: "'Nunca'意思是总是。",
          respuestaCorrecta: false,
          explicacion: "错。Nunca = 从不，Siempre = 总是",
        },
        {
          id: "vf5",
          pregunta: "'Los fines de semana' significa 周末.",
          preguntaChino: "'Los fines de semana'意思是周末。",
          respuestaCorrecta: true,
          explicacion: "对。Fin de semana = 周末",
        },
        {
          id: "vf6",
          pregunta: "'Cocinar' significa 打扫.",
          preguntaChino: "'Cocinar'意思是打扫。",
          respuestaCorrecta: false,
          explicacion: "错。Cocinar = 烹饪",
        },
        {
          id: "vf7",
          pregunta: "Para jugar al fútbol usamos el verbo 'jugar'.",
          preguntaChino: "踢足球用动词'jugar'。",
          respuestaCorrecta: true,
          explicacion: "对。Jugar al fútbol = 踢足球",
        },
        {
          id: "vf8",
          pregunta: "'A menudo' significa 有时.",
          preguntaChino: "'A menudo'意思是有时。",
          respuestaCorrecta: false,
          explicacion: "错。A menudo = 经常，A veces = 有时",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "leer",
              derecha: "阅读",
            },
            {
              izquierda: "dibujar",
              derecha: "画画",
            },
            {
              izquierda: "cocinar",
              derecha: "烹饪",
            },
            {
              izquierda: "bailar",
              derecha: "跳舞",
            },
            {
              izquierda: "cantar",
              derecha: "唱歌",
            },
            {
              izquierda: "tocar la guitarra",
              derecha: "弹吉他",
            },
            {
              izquierda: "jugar al fútbol",
              derecha: "踢足球",
            },
            {
              izquierda: "hacer fotos",
              derecha: "拍照",
            },
            {
              izquierda: "pasear",
              derecha: "散步",
            },
            {
              izquierda: "descansar",
              derecha: "休息",
            },
            {
              izquierda: "tiempo libre",
              derecha: "空闲时间",
            },
            {
              izquierda: "afición",
              derecha: "爱好",
            },
          ],
          explicacion: "将爱好词汇与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["gusta", "Me", "leer", "."],
          respuestaCorrecta: "Me gusta leer.",
          explicacion: "正确的句子是：Me gusta leer.",
        },
        {
          id: "o2",
          palabras: ["tiempo", "libre", "mi", "leo", "En", "."],
          respuestaCorrecta: "En mi tiempo libre leo.",
          explicacion: "正确的句子是：En mi tiempo libre leo.",
        },
        {
          id: "o3",
          palabras: ["fútbol", "juego", "al", "Los", "sábados", "."],
          respuestaCorrecta: "Los sábados juego al fútbol.",
          explicacion: "正确的句子是：Los sábados juego al fútbol.",
        },
        {
          id: "o4",
          palabras: ["música", "escuchar", "encanta", "Me", "."],
          respuestaCorrecta: "Me encanta escuchar música.",
          explicacion: "正确的句子是：Me encanta escuchar música.",
        },
        {
          id: "o5",
          palabras: ["te", "¿Qué", "gusta", "hacer", "?"],
          respuestaCorrecta: "¿Qué te gusta hacer?",
          explicacion: "正确的句子是：¿Qué te gusta hacer?",
        },
        {
          id: "o6",
          palabras: ["a", "veces", "videojuegos", "A", "juego", "."],
          respuestaCorrecta: "A veces juego a videojuegos.",
          explicacion: "正确的句子是：A veces juego a videojuegos.",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我空闲时间喜欢阅读。",
          respuestaEsperada: "Me gusta leer en mi tiempo libre.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "我非常喜欢听音乐。",
          respuestaEsperada: "Me encanta escuchar música.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "周末我和朋友踢足球。",
          respuestaEsperada: "Los fines de semana juego al fútbol con mis amigos.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "你空闲时间喜欢做什么？",
          respuestaEsperada: "¿Qué te gusta hacer en tu tiempo libre?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "我有时画画。",
          respuestaEsperada: "A veces dibujo.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "我从不看电视。",
          respuestaEsperada: "Nunca veo la televisión.",
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
        instruccion: "用正确的爱好词汇完成对话。",
        instruccionChino: "用正确的爱好词汇完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿Qué te gusta hacer en tu tiempo libre?",
            respuesta: "",
          },
          {
            personaje: "B",
            texto: "Me gusta _____.",
            respuesta: "leer",
          },
          {
            personaje: "A",
            texto: "¿Y los fines de semana?",
            respuesta: "",
          },
          {
            personaje: "B",
            texto: "Juego al _____.",
            respuesta: "fútbol",
          },
          {
            personaje: "A",
            texto: "¿Te gusta la música?",
            respuesta: "",
          },
          {
            personaje: "B",
            texto: "Sí, me encanta _____ música.",
            respuesta: "escuchar",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "completarTabla",
        titulo: "Completa la tabla",
        tituloChino: "完成表格",
        instruccion: "Escribe la traducción en español.",
        instruccionChino: "写出西班牙语翻译。",
        tabla: [
          {
            tienda: "leer",
            producto: "阅读",
          },
          {
            tienda: "dibujar",
            producto: "画画",
          },
          {
            tienda: "cocinar",
            producto: "烹饪",
          },
          {
            tienda: "bailar",
            producto: "跳舞",
          },
          {
            tienda: "cantar",
            producto: "唱歌",
          },
          {
            tienda: "tocar la guitarra",
            producto: "弹吉他",
          },
          {
            tienda: "jugar al fútbol",
            producto: "踢足球",
          },
          {
            tienda: "hacer fotos",
            producto: "拍照",
          },
          {
            tienda: "pasear",
            producto: "散步",
          },
          {
            tienda: "descansar",
            producto: "休息",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "responder",
        titulo: "Responde las preguntas",
        tituloChino: "回答问题",
        instruccion: "Responde las siguientes preguntas sobre tus aficiones.",
        instruccionChino: "用西班牙语回答以下关于你爱好的问题。",
        preguntas: [
          {
            pregunta: "¿Qué te gusta hacer en tu tiempo libre?",
            respuestaEsperada: "En mi tiempo libre me gusta leer y escuchar música.",
          },
          {
            pregunta: "¿Practicas algún deporte?",
            respuestaEsperada: "Sí, juego al fútbol los fines de semana.",
          },
          {
            pregunta: "¿Cuál es tu afición favorita?",
            respuestaEsperada: "Mi afición favorita es la fotografía.",
          },
        ],
      },
      {
        id: "ep4",
        tipo: "dialogo",
        titulo: "Crea un diálogo sobre aficiones",
        tituloChino: "创建关于爱好的对话",
        instruccion: "Escribe un breve diálogo entre dos amigos hablando de sus aficiones.",
        instruccionChino: "写两个朋友谈论爱好的简短对话。",
        ejemplo:
          "A: ¿Qué te gusta hacer en tu tiempo libre? B: Me encanta dibujar y escuchar música. ¿Y a ti? A: A mí me gusta jugar al fútbol.",
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Qué te gusta hacer en tu tiempo libre?",
        preguntaChino: "你空闲时间喜欢做什么？",
        sugerencia: "En mi tiempo libre me gusta leer y escuchar música.",
        sugerenciaChino: "我空闲时间喜欢阅读和听音乐。",
      },
      {
        id: "pa2",
        pregunta: "¿Practicas algún deporte? ¿Cuál?",
        preguntaChino: "你做什么运动？什么运动？",
        sugerencia: "Sí, juego al fútbol los fines de semana.",
        sugerenciaChino: "是的，我周末踢足球。",
      },
      {
        id: "pa3",
        pregunta: "¿Cuál es tu afición favorita?",
        preguntaChino: "你最喜欢的爱好是什么？",
        sugerencia: "Mi afición favorita es la fotografía.",
        sugerenciaChino: "我最喜欢的爱好是摄影。",
      },
      {
        id: "pa4",
        pregunta: "¿Qué haces normalmente los fines de semana?",
        preguntaChino: "你周末通常做什么？",
        sugerencia: "Los fines de semana salgo con mis amigos y descanso.",
        sugerenciaChino: "周末我和朋友出去并休息。",
      },
      {
        id: "pa5",
        pregunta: "¿Prefieres actividades en casa o al aire libre?",
        preguntaChino: "你更喜欢室内还是户外活动？",
        sugerencia: "Prefiero actividades al aire libre, como pasear o hacer deporte.",
        sugerenciaChino: "我更喜欢户外活动，比如散步或运动。",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '空闲时间' en español?",
        preguntaChino: "西班牙语中'空闲时间'怎么说？",
        respuestaSugerida: "el tiempo libre",
        respuestaSugeridaChino: "el tiempo libre",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '画画' en español?",
        preguntaChino: "西班牙语中'画画'怎么说？",
        respuestaSugerida: "dibujar",
        respuestaSugeridaChino: "dibujar",
      },
      {
        id: "p3",
        pregunta: "¿Qué significa 'Me encanta'?",
        preguntaChino: "'Me encanta'是什么意思？",
        respuestaSugerida: "我非常喜欢",
        respuestaSugeridaChino: "我非常喜欢",
      },
      {
        id: "p4",
        pregunta: "¿Qué significa 'a veces'?",
        preguntaChino: "'a veces'是什么意思？",
        respuestaSugerida: "有时",
        respuestaSugeridaChino: "有时",
      },
      {
        id: "p5",
        pregunta: "¿Cómo se dice '弹吉他' en español?",
        preguntaChino: "西班牙语中'弹吉他'怎么说？",
        respuestaSugerida: "tocar la guitarra",
        respuestaSugeridaChino: "tocar la guitarra",
      },
      {
        id: "p6",
        pregunta: "¿Cómo se dice '踢足球' en español?",
        preguntaChino: "西班牙语中'踢足球'怎么说？",
        respuestaSugerida: "jugar al fútbol",
        respuestaSugeridaChino: "jugar al fútbol",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Planes de vacaciones",
        tituloChino: "假期计划",
        descripcion: `🔹 FRASES PARA HABLAR DE PLANES (phrases to talk about plans):

• Voy a viajar a... = I'm going to travel to...
• Quiero ir a... = I want to go to...
• Me gustaría visitar... = I would like to visit...
• Tengo previsto... = I plan to...
• Este verano voy a... = This summer I'm going to...
• El año que viene quiero... = Next year I want to...
• Estoy planeando un viaje a... = I'm planning a trip to...
• Me voy de vacaciones a... = I'm going on vacation to...
• He reservado un hotel en... = I've booked a hotel in...

🔹 DESTINOS COMUNES (common destinations):
• la playa = the beach
• la montaña = the mountain
• la ciudad = the city
• el campo = the countryside
• el extranjero = abroad
• la costa = the coast
• la isla = the island
• el pueblo = the village
• la capital = the capital

🔹 TIPOS DE VIAJE (types of trips):
• viaje de negocios = business trip
• viaje de placer = leisure trip
• viaje con amigos = trip with friends
• viaje en familia = family trip
• viaje de aventura = adventure trip
• viaje organizado = organized tour
• escapada de fin de semana = weekend getaway
• luna de miel = honeymoon
• viaje de estudios = study trip
• crucero = cruise

📌 EJEMPLOS:
• Voy a viajar a España este verano.
• Quiero ir a la playa.
• Me gustaría visitar Barcelona.`,
        descripcionChino: `🔹 谈论计划的句子：

• Voy a viajar a... = 我要去...旅行
• Quiero ir a... = 我想去...
• Me gustaría visitar... = 我想参观...
• Tengo previsto... = 我计划...
• Este verano voy a... = 今年夏天我要...
• El año que viene quiero... = 明年我想...
• Estoy planeando un viaje a... = 我正在计划去...旅行
• Me voy de vacaciones a... = 我要去...度假
• He reservado un hotel en... = 我已经预订了...的酒店

🔹 常见目的地：
• la playa = 海滩
• la montaña = 山
• la ciudad = 城市
• el campo = 乡村
• el extranjero = 国外
• la costa = 海岸
• la isla = 岛屿
• el pueblo = 村庄
• la capital = 首都

🔹 旅行类型：
• viaje de negocios = 商务旅行
• viaje de placer = 休闲旅行
• viaje con amigos = 和朋友旅行
• viaje en familia = 家庭旅行
• viaje de aventura = 探险旅行
• viaje organizado = 跟团游
• escapada de fin de semana = 周末短途旅行
• luna de miel = 蜜月
• viaje de estudios = 游学
• crucero = 游轮旅行

📌 例子：
• Voy a viajar a España este verano. = 我今年夏天要去西班牙旅行。
• Quiero ir a la playa. = 我想去海滩。
• Me gustaría visitar Barcelona. = 我想参观巴塞罗那。`,
        ejemplos: [
          {
            espanol: "Voy a viajar a España este verano.",
            chino: "我今年夏天要去西班牙旅行。",
          },
          {
            espanol: "Quiero ir a la playa.",
            chino: "我想去海滩。",
          },
          {
            espanol: "Me gustaría visitar Barcelona.",
            chino: "我想参观巴塞罗那。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Preparativos del viaje",
        tituloChino: "旅行准备",
        descripcion: `🔹 VOCABULARIO DE PREPARATIVOS (preparation vocabulary):

• hacer la maleta = to pack (the suitcase)
• reservar el hotel = to book the hotel
• comprar el billete = to buy the ticket
• sacar el pasaporte = to take out the passport
• contratar un seguro = to take out insurance
• cambiar dinero = to exchange money
• mirar el tiempo = to check the weather
• imprimir la reserva = to print the booking
• cancelar la reserva = to cancel the booking
• buscar vuelos = to search for flights
• comparar precios = to compare prices

🔹 DOCUMENTOS NECESARIOS (necessary documents):
• pasaporte = passport
• DNI = ID card
• visado = visa
• billete de avión/tren = plane/train ticket
• reserva del hotel = hotel booking
• carnet de conducir internacional = international driver's license
• tarjeta sanitaria = health insurance card

🔹 OBJETOS IMPORTANTES (important items):
• maleta = suitcase
• mochila = backpack
• bolsa de mano = handbag
• cámara de fotos = camera
• cargador = charger
• adaptador de corriente = power adapter
• crema solar = sunscreen
• gafas de sol = sunglasses
• sombrero = hat
• repelente de mosquitos = mosquito repellent
• botiquín = first aid kit
• medicamentos = medication
• toalla = towel
• bañador = swimsuit
• ropa de abrigo = warm clothes
• paraguas = umbrella

📌 EJEMPLOS:
• Tengo que hacer la maleta.
• Ya compré los billetes de avión.
• No olvides el pasaporte.`,
        descripcionChino: `🔹 准备词汇：

• hacer la maleta = 收拾行李
• reservar el hotel = 预订酒店
• comprar el billete = 买票
• sacar el pasaporte = 拿出护照
• contratar un seguro = 购买保险
• cambiar dinero = 换钱
• mirar el tiempo = 查看天气
• imprimir la reserva = 打印预订信息
• cancelar la reserva = 取消预订
• buscar vuelos = 搜索航班
• comparar precios = 比较价格

🔹 所需文件：
• pasaporte = 护照
• DNI = 身份证
• visado = 签证
• billete de avión/tren = 飞机/火车票
• reserva del hotel = 酒店预订
• carnet de conducir internacional = 国际驾照
• tarjeta sanitaria = 医保卡

🔹 重要物品：
• maleta = 行李箱
• mochila = 背包
• bolsa de mano = 手提包
• cámara de fotos = 相机
• cargador = 充电器
• adaptador de corriente = 转换插头
• crema solar = 防晒霜
• gafas de sol = 太阳镜
• sombrero = 帽子
• repelente de mosquitos = 驱蚊剂
• botiquín = 急救包
• medicamentos = 药品
• toalla = 毛巾
• bañador = 泳衣
• ropa de abrigo = 保暖衣物
• paraguas = 雨伞

📌 例子：
• Tengo que hacer la maleta. = 我得收拾行李了。
• Ya compré los billetes de avión. = 我已经买了机票。
• No olvides el pasaporte. = 别忘了护照。`,
        ejemplos: [
          {
            espanol: "Tengo que hacer la maleta.",
            chino: "我得收拾行李了。",
          },
          {
            espanol: "Ya compré los billetes de avión.",
            chino: "我已经买了机票。",
          },
          {
            espanol: "No olvides el pasaporte.",
            chino: "别忘了护照。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Durante el viaje",
        tituloChino: "旅行期间",
        descripcion: `🔹 FRASES ÚTILES DURANTE EL VIAJE (useful phrases during the trip):

• ¿Dónde está el hotel? = Where is the hotel?
• ¿Cómo llego a la playa? = How do I get to the beach?
• ¿Cuánto cuesta la entrada? = How much is the entrance ticket?
• ¿A qué hora sale el tren? = What time does the train leave?
• ¿Dónde puedo comer? = Where can I eat?
• ¿Hay visitas guiadas? = Are there guided tours?
• ¿Qué monumentos puedo visitar? = What monuments can I visit?
• ¿Dónde puedo comprar recuerdos? = Where can I buy souvenirs?

🔹 ACTIVIDADES COMUNES (common activities):
• hacer turismo = sightseeing
• visitar museos = visit museums
• tomar fotos = take photos
• probar la comida local = try local food
• comprar recuerdos = buy souvenirs
• nadar en la playa = swim at the beach
• hacer senderismo = hike
• salir de noche = go out at night
• ir de compras = go shopping
• relajarse = relax
• tomar el sol = sunbathe
• bucear = dive
• hacer una excursión = take a day trip

🔹 EVALUAR EL VIAJE (evaluating the trip):
• Me encantó el viaje. = I loved the trip.
• Las vistas son increíbles. = The views are incredible.
• La comida es deliciosa. = The food is delicious.
• La gente es muy amable. = The people are very friendly.
• Quiero volver. = I want to come back.
• El viaje fue increíble. = The trip was amazing.
• Lo pasamos fenomenal. = We had a great time.
• Lo recomiendo mucho. = I highly recommend it.
• Repetiría sin duda. = I would definitely repeat it.

📌 EJEMPLOS:
• Hicimos turismo por la ciudad.
• Las vistas son increíbles.
• Quiero volver el año que viene.`,
        descripcionChino: `🔹 旅行期间的有用句子：

• ¿Dónde está el hotel? = 酒店在哪里？
• ¿Cómo llego a la playa? = 我怎么去海滩？
• ¿Cuánto cuesta la entrada? = 门票多少钱？
• ¿A qué hora sale el tren? = 火车几点出发？
• ¿Dónde puedo comer? = 我在哪里可以吃饭？
• ¿Hay visitas guiadas? = 有导游陪同的游览吗？
• ¿Qué monumentos puedo visitar? = 我可以参观哪些古迹？
• ¿Dónde puedo comprar recuerdos? = 我在哪里可以买纪念品？

🔹 常见活动：
• hacer turismo = 观光
• visitar museos = 参观博物馆
• tomar fotos = 拍照
• probar la comida local = 品尝当地美食
• comprar recuerdos = 买纪念品
• nadar en la playa = 在海滩游泳
• hacer senderismo = 徒步
• salir de noche = 夜生活
• ir de compras = 购物
• relajarse = 放松
• tomar el sol = 晒太阳
• bucear = 潜水
• hacer una excursión = 短途旅行

🔹 评价旅行：
• Me encantó el viaje. = 我超爱这次旅行。
• Las vistas son increíbles. = 景色令人难以置信。
• La comida es deliciosa. = 食物很美味。
• La gente es muy amable. = 人们非常友好。
• Quiero volver. = 我想再来。
• El viaje fue increíble. = 旅行太棒了。
• Lo pasamos fenomenal. = 我们玩得很开心。
• Lo recomiendo mucho. = 我非常推荐。
• Repetiría sin duda. = 我肯定会再去。

📌 例子：
• Hicimos turismo por la ciudad. = 我们在城市里观光。
• Las vistas son increíbles. = 景色令人难以置信。
• Quiero volver el año que viene. = 我想明年再来。`,
        ejemplos: [
          {
            espanol: "Hicimos turismo por la ciudad.",
            chino: "我们在城市里观光。",
          },
          {
            espanol: "Las vistas son increíbles.",
            chino: "景色令人难以置信。",
          },
          {
            espanol: "Quiero volver el año que viene.",
            chino: "我想明年再来。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Problemas durante el viaje",
        tituloChino: "旅行中的问题",
        descripcion: `🔹 PROBLEMAS COMUNES (common problems):

• He perdido el pasaporte. = I've lost my passport.
• Me han robado la cartera. = My wallet has been stolen.
• He perdido el vuelo. = I've missed the flight.
• Mi maleta no ha llegado. = My suitcase hasn't arrived.
• Me he equivocado de hotel. = I've booked the wrong hotel.
• No encuentro el alojamiento. = I can't find the accommodation.
• Me siento mal / enfermo/a. = I feel sick.
• Tengo que ir a la farmacia. = I need to go to the pharmacy.

🔹 SOLUCIONES (solutions):
• Ir a la oficina de objetos perdidos. = Go to the lost and found office.
• Llamar a la embajada. = Call the embassy.
• Contactar con la compañía aérea. = Contact the airline.
• Pedir ayuda en información turística. = Ask for help at tourist information.
• Llamar al número de emergencias. = Call the emergency number.

🔹 EMERGENCIAS (emergencies):
• Necesito un médico. = I need a doctor.
• Llame a una ambulancia. = Call an ambulance.
• He tenido un accidente. = I've had an accident.
• Necesito ayuda. = I need help.
• ¿Dónde está el hospital más cercano? = Where is the nearest hospital?
• ¿Cuál es el número de emergencias? = What is the emergency number?

📌 NOTA: En España y la mayoría de países hispanohablantes, el número de emergencias es el 112.`,
        descripcionChino: `🔹 常见问题：

• He perdido el pasaporte. = 我丢了护照。
• Me han robado la cartera. = 我的钱包被偷了。
• He perdido el vuelo. = 我误了航班。
• Mi maleta no ha llegado. = 我的行李箱还没到。
• Me he equivocado de hotel. = 我订错了酒店。
• No encuentro el alojamiento. = 我找不到住宿的地方。
• Me siento mal / enfermo/a. = 我感觉不舒服/生病了。
• Tengo que ir a la farmacia. = 我需要去药店。

🔹 解决方案：
• Ir a la oficina de objetos perdidos. = 去失物招领处。
• Llamar a la embajada. = 给大使馆打电话。
• Contactar con la compañía aérea. = 联系航空公司。
• Pedir ayuda en información turística. = 在游客信息中心寻求帮助。
• Llamar al número de emergencias. = 拨打紧急电话号码。

🔹 紧急情况：
• Necesito un médico. = 我需要医生。
• Llame a una ambulancia. = 叫救护车。
• He tenido un accidente. = 我出事故了。
• Necesito ayuda. = 我需要帮助。
• ¿Dónde está el hospital más cercano? = 最近的医院在哪里？
• ¿Cuál es el número de emergencias? = 紧急电话号码是多少？

📌 注意：在西班牙和大多数西班牙语国家，紧急电话号码是112。`,
        ejemplos: [
          {
            espanol: "He perdido mi pasaporte. ¿Qué hago?",
            chino: "我丢了护照。我该怎么办？",
          },
          {
            espanol: "Mi maleta no ha llegado a la cinta.",
            chino: "我的行李箱没有到传送带上。",
          },
          {
            espanol: "Necesito ayuda, por favor.",
            chino: "我需要帮助，请。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "vacaciones",
        chino: "假期",
        ejemplo: "Me voy de vacaciones.",
      },
      {
        id: "v2",
        espanol: "viajar",
        chino: "旅行",
        ejemplo: "Me gusta viajar.",
      },
      {
        id: "v3",
        espanol: "destino",
        chino: "目的地",
        ejemplo: "Mi destino es Madrid.",
      },
      {
        id: "v4",
        espanol: "playa",
        chino: "海滩",
        ejemplo: "Vamos a la playa.",
      },
      {
        id: "v5",
        espanol: "montaña",
        chino: "山",
        ejemplo: "Me gusta la montaña.",
      },
      {
        id: "v6",
        espanol: "campo",
        chino: "乡村",
        ejemplo: "Vivir en el campo.",
      },
      {
        id: "v7",
        espanol: "ciudad",
        chino: "城市",
        ejemplo: "La ciudad es grande.",
      },
      {
        id: "v8",
        espanol: "extranjero",
        chino: "国外",
        ejemplo: "Viajar al extranjero.",
      },
      {
        id: "v9",
        espanol: "hotel",
        chino: "酒店",
        ejemplo: "Reservé un hotel.",
      },
      {
        id: "v10",
        espanol: "hostal",
        chino: "旅馆",
        ejemplo: "Me alojo en un hostal.",
      },
      {
        id: "v11",
        espanol: "billete",
        chino: "票",
        ejemplo: "Compré los billetes.",
      },
      {
        id: "v12",
        espanol: "pasaporte",
        chino: "护照",
        ejemplo: "Mi pasaporte está vigente.",
      },
      {
        id: "v13",
        espanol: "maleta",
        chino: "行李箱",
        ejemplo: "Hago la maleta.",
      },
      {
        id: "v14",
        espanol: "mochila",
        chino: "背包",
        ejemplo: "Llevo una mochila.",
      },
      {
        id: "v15",
        espanol: "cámara",
        chino: "相机",
        ejemplo: "Llevo la cámara.",
      },
      {
        id: "v16",
        espanol: "crema solar",
        chino: "防晒霜",
        ejemplo: "No olvides la crema solar.",
      },
      {
        id: "v17",
        espanol: "gafas de sol",
        chino: "太阳镜",
        ejemplo: "Uso gafas de sol.",
      },
      {
        id: "v18",
        espanol: "recuerdo",
        chino: "纪念品",
        ejemplo: "Compro recuerdos.",
      },
      {
        id: "v19",
        espanol: "turismo",
        chino: "观光",
        ejemplo: "Hacemos turismo.",
      },
      {
        id: "v20",
        espanol: "avión",
        chino: "飞机",
        ejemplo: "Viajo en avión.",
      },
      {
        id: "v21",
        espanol: "tren",
        chino: "火车",
        ejemplo: "Prefiero el tren.",
      },
      {
        id: "v22",
        espanol: "reservar",
        chino: "预订",
        ejemplo: "Reservo el hotel.",
      },
      {
        id: "v23",
        espanol: "hacer la maleta",
        chino: "收拾行李",
        ejemplo: "Tengo que hacer la maleta.",
      },
      {
        id: "v24",
        espanol: "equipaje",
        chino: "行李",
        ejemplo: "El equipaje de mano.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Planeando las vacaciones",
        tituloChino: "计划假期",
        personajes: ["Ana", "Carlos"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Carlos, ¿qué vas a hacer este verano?",
            traduccion: "卡洛斯，你这个夏天要做什么？",
          },
          {
            personaje: "Carlos",
            texto: "Voy a viajar a Italia con mi familia.",
            traduccion: "我要和家人去意大利旅行。",
          },
          {
            personaje: "Ana",
            texto: "¡Qué bien! ¿Vais a la playa?",
            traduccion: "真好！你们要去海滩吗？",
          },
          {
            personaje: "Carlos",
            texto: "Sí, vamos a la costa. También visitaremos Roma.",
            traduccion: "是的，我们要去海边。我们还会参观罗马。",
          },
          {
            personaje: "Ana",
            texto: "¿Ya reservasteis el hotel?",
            traduccion: "你们已经预订酒店了吗？",
          },
          {
            personaje: "Carlos",
            texto: "Sí, hace un mes. Y los billetes de avión también.",
            traduccion: "是的，一个月前就订了。机票也买了。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Preparando la maleta",
        tituloChino: "收拾行李",
        personajes: ["María", "Pedro"],
        lineas: [
          {
            personaje: "María",
            texto: "Pedro, ¿has hecho ya la maleta?",
            traduccion: "佩德罗，你收拾好行李了吗？",
          },
          {
            personaje: "Pedro",
            texto: "Casi. Me falta poner la cámara y el cargador.",
            traduccion: "差不多了。还差放相机和充电器。",
          },
          {
            personaje: "María",
            texto: "¿Tienes el pasaporte?",
            traduccion: "你有护照吗？",
          },
          {
            personaje: "Pedro",
            texto: "Sí, lo tengo aquí. ¿Y las gafas de sol?",
            traduccion: "是的，在这里。太阳镜呢？",
          },
          {
            personaje: "María",
            texto: "Las puse en la mochila. No te olvides de la crema solar.",
            traduccion: "我放在背包里了。别忘了防晒霜。",
          },
          {
            personaje: "Pedro",
            texto: "Vale. Creo que ya está todo.",
            traduccion: "好的。我想都齐了。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "De regreso del viaje",
        tituloChino: "旅行归来",
        personajes: ["Luis", "Sofía"],
        lineas: [
          {
            personaje: "Luis",
            texto: "Sofía, ¿qué tal el viaje a México?",
            traduccion: "索菲亚，墨西哥之旅怎么样？",
          },
          {
            personaje: "Sofía",
            texto: "¡Increíble! Me encantó. Las playas son preciosas.",
            traduccion: "太棒了！我超爱。海滩很美。",
          },
          {
            personaje: "Luis",
            texto: "¿Qué hiciste allí?",
            traduccion: "你在那里做了什么？",
          },
          {
            personaje: "Sofía",
            texto: "Hicimos turismo, visitamos ruinas mayas y probamos la comida local.",
            traduccion: "我们观光、参观了玛雅遗址，还品尝了当地美食。",
          },
          {
            personaje: "Luis",
            texto: "¿Volverías?",
            traduccion: "你还会再去吗？",
          },
          {
            personaje: "Sofía",
            texto: "¡Claro! Quiero volver el año que viene.",
            traduccion: "当然！我想明年再去。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Problemas en el viaje",
        tituloChino: "旅行中的问题",
        personajes: ["Laura", "David"],
        lineas: [
          {
            personaje: "Laura",
            texto: "David, ¿qué te pasó en el aeropuerto?",
            traduccion: "大卫，你在机场怎么了？",
          },
          {
            personaje: "David",
            texto: "Perdí mi maleta. No apareció en la cinta.",
            traduccion: "我丢了行李箱。它没出现在传送带上。",
          },
          {
            personaje: "Laura",
            texto: "¿Has ido a la oficina de objetos perdidos?",
            traduccion: "你去失物招领处了吗？",
          },
          {
            personaje: "David",
            texto: "Sí, ya he puesto la reclamación. Me la mandarán a casa.",
            traduccion: "是的，我已经提了索赔。他们会寄到我家。",
          },
          {
            personaje: "Laura",
            texto: "Menos mal. ¿Qué tenías dentro?",
            traduccion: "谢天谢地。你里面有什么？",
          },
          {
            personaje: "David",
            texto: "Ropa y algunos recuerdos. Espero que llegue pronto.",
            traduccion: "衣服和一些纪念品。希望它快点到。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Recomendando un destino",
        tituloChino: "推荐目的地",
        personajes: ["Sofía", "Javier"],
        lineas: [
          {
            personaje: "Sofía",
            texto: "Javier, ¿qué destino me recomiendas para el verano?",
            traduccion: "哈维尔，你推荐我夏天去哪里？",
          },
          {
            personaje: "Javier",
            texto: "Te recomiendo la costa de Cádiz. Las playas son espectaculares.",
            traduccion: "我推荐加的斯海岸。海滩很壮观。",
          },
          {
            personaje: "Sofía",
            texto: "¿Hace mucho calor?",
            traduccion: "很热吗？",
          },
          {
            personaje: "Javier",
            texto: "Sí, pero se está muy bien. Además, la comida es excelente.",
            traduccion: "是的，但很好。而且，食物很出色。",
          },
          {
            personaje: "Sofía",
            texto: "¿Hay muchas cosas que visitar?",
            traduccion: "有很多可以参观的地方吗？",
          },
          {
            personaje: "Javier",
            texto: "Sí, hay pueblos blancos preciosos y también puedes hacer senderismo.",
            traduccion: "是的，有漂亮的白色村庄，还可以徒步。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "我要去西班牙旅行：Voy a _____ a España.",
          preguntaChino: "我要去西班牙旅行：Voy a _____ a España.",
          respuestaCorrecta: "viajar",
          explicacion: "Viajar = 旅行",
          pista: "首字母是 v，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c2",
          pregunta: "我夏天去海滩：Voy a la _____ este verano.",
          preguntaChino: "我夏天去海滩：Voy a la _____ este verano.",
          respuestaCorrecta: "playa",
          explicacion: "Playa = 海滩",
          pista: "首字母是 p，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c3",
          pregunta: "我需要收拾行李：Tengo que hacer la _____.",
          preguntaChino: "我需要收拾行李：Tengo que hacer la _____.",
          respuestaCorrecta: "maleta",
          explicacion: "Hacer la maleta = 收拾行李",
          pista: "首字母是 m，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c4",
          pregunta: "我买了飞机票：Compré los _____ de avión.",
          preguntaChino: "我买了飞机票：Compré los _____ de avión.",
          respuestaCorrecta: "billetes",
          explicacion: "Billete = 票",
          pista: "首字母是 b，8个字母",
          numeroLetras: 8,
        },
        {
          id: "c5",
          pregunta: "景色太美了：Las _____ son increíbles.",
          preguntaChino: "景色太美了：Las _____ son increíbles.",
          respuestaCorrecta: "vistas",
          explicacion: "Vistas = 景色",
          pista: "首字母是 v，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c6",
          pregunta: "我想买纪念品：Quiero comprar _____.",
          preguntaChino: "我想买纪念品：Quiero comprar _____.",
          respuestaCorrecta: "recuerdos",
          explicacion: "Recuerdos = 纪念品",
          pista: "首字母是 r，8个字母",
          numeroLetras: 8,
        },
        {
          id: "c7",
          pregunta: "我们做观光：Hacemos _____.",
          preguntaChino: "我们做观光：Hacemos _____.",
          respuestaCorrecta: "turismo",
          explicacion: "Turismo = 观光",
          pista: "首字母是 t，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c8",
          pregunta: "别忘了防晒霜：No olvides la _____ solar.",
          preguntaChino: "别忘了防晒霜：No olvides la _____ solar.",
          respuestaCorrecta: "crema",
          explicacion: "Crema solar = 防晒霜",
          pista: "首字母是 c，5个字母",
          numeroLetras: 5,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "你要去哪里度假？",
          preguntaChino: "你要去哪里度假？",
          opciones: ["trabajo", "escuela", "playa", "oficina"],
          respuestaCorrecta: "playa",
          explicacion: "度假去海滩",
        },
        {
          id: "s2",
          pregunta: "你在哪里预订酒店？",
          preguntaChino: "你在哪里预订酒店？",
          opciones: ["en la maleta", "en internet", "en el avión", "en la playa"],
          respuestaCorrecta: "en internet",
          explicacion: "在网上预订酒店",
        },
        {
          id: "s3",
          pregunta: "'Hacer la maleta'是什么意思？",
          preguntaChino: "'Hacer la maleta'是什么意思？",
          opciones: ["买行李箱", "收拾行李", "打包行李", "打开行李箱"],
          respuestaCorrecta: "收拾行李",
          explicacion: "Hacer la maleta = 收拾行李",
        },
        {
          id: "s4",
          pregunta: "哪个文件是出国旅行必需的？",
          preguntaChino: "哪个文件是出国旅行必需的？",
          opciones: ["DNI", "pasaporte", "carnet", "tarjeta"],
          respuestaCorrecta: "pasaporte",
          explicacion: "出国需要护照",
        },
        {
          id: "s5",
          pregunta: "'Quiero volver'是什么意思？",
          preguntaChino: "'Quiero volver'是什么意思？",
          opciones: ["我想去", "我想回来", "我想离开", "我想留下"],
          respuestaCorrecta: "我想回来",
          explicacion: "Volver = 回来/返回",
        },
        {
          id: "s6",
          pregunta: "¿Qué significa 'hacer una excursión'?",
          preguntaChino: "'hacer una excursión'是什么意思？",
          opciones: ["做运动", "短途旅行", "买票", "收拾行李"],
          respuestaCorrecta: "短途旅行",
          explicacion: "Excursión = 短途旅行",
        },
        {
          id: "s7",
          pregunta: "¿Cómo se dice '防晒霜' en español?",
          preguntaChino: "西班牙语中'防晒霜'怎么说？",
          opciones: ["crema hidratante", "crema solar", "protector labial", "loción corporal"],
          respuestaCorrecta: "crema solar",
          explicacion: "Crema solar = 防晒霜",
        },
        {
          id: "s8",
          pregunta: "¿Qué significa 'lo pasamos fenomenal'?",
          preguntaChino: "'lo pasamos fenomenal'是什么意思？",
          opciones: ["我们玩得很开心", "我们玩得不好", "我们很累", "我们很无聊"],
          respuestaCorrecta: "我们玩得很开心",
          explicacion: "Pasarlo bien/fenomenal = 玩得开心",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "度假时我们会做观光。",
          preguntaChino: "度假时我们会做观光。",
          respuestaCorrecta: true,
          explicacion: "对。Hacer turismo = 观光",
        },
        {
          id: "vf2",
          pregunta: "买纪念品是旅行的一部分。",
          preguntaChino: "买纪念品是旅行的一部分。",
          respuestaCorrecta: true,
          explicacion: "对。Comprar recuerdos = 买纪念品",
        },
        {
          id: "vf3",
          pregunta: "飞机票只能在机场买。",
          preguntaChino: "飞机票只能在机场买。",
          respuestaCorrecta: false,
          explicacion: "错。也可以在网上买。",
        },
        {
          id: "vf4",
          pregunta: "护照是旅行必需的。",
          preguntaChino: "护照是旅行必需的。",
          respuestaCorrecta: true,
          explicacion: "对。Pasaporte = 护照",
        },
        {
          id: "vf5",
          pregunta: "度假时我们只工作。",
          preguntaChino: "度假时我们只工作。",
          respuestaCorrecta: false,
          explicacion: "错。度假是为了放松和享受。",
        },
        {
          id: "vf6",
          pregunta: "El 'equipaje de mano' se factura en el mostrador.",
          preguntaChino: "'Equipaje de mano'在柜台托运。",
          respuestaCorrecta: false,
          explicacion: "错。El equipaje de mano se lleva en la cabina.",
        },
        {
          id: "vf7",
          pregunta: "La 'luna de miel' es el viaje después de la boda.",
          preguntaChino: "'Luna de miel'是婚后的旅行。",
          respuestaCorrecta: true,
          explicacion: "对。Luna de miel = 蜜月",
        },
        {
          id: "vf8",
          pregunta: "El 'turismo' es viajar por placer, no por trabajo.",
          preguntaChino: "'Turismo'是为了娱乐而不是工作而旅行。",
          respuestaCorrecta: true,
          explicacion: "对。Turismo = 观光旅游",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "playa",
              derecha: "海滩",
            },
            {
              izquierda: "montaña",
              derecha: "山",
            },
            {
              izquierda: "hotel",
              derecha: "酒店",
            },
            {
              izquierda: "hostal",
              derecha: "旅馆",
            },
            {
              izquierda: "pasaporte",
              derecha: "护照",
            },
            {
              izquierda: "maleta",
              derecha: "行李箱",
            },
            {
              izquierda: "mochila",
              derecha: "背包",
            },
            {
              izquierda: "avión",
              derecha: "飞机",
            },
            {
              izquierda: "tren",
              derecha: "火车",
            },
            {
              izquierda: "viajar",
              derecha: "旅行",
            },
            {
              izquierda: "vacaciones",
              derecha: "假期",
            },
            {
              izquierda: "recuerdo",
              derecha: "纪念品",
            },
            {
              izquierda: "crema solar",
              derecha: "防晒霜",
            },
          ],
          explicacion: "将旅行词汇与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["a", "viajar", "Voy", "España", "."],
          respuestaCorrecta: "Voy a viajar a España.",
          explicacion: "正确的句子是：Voy a viajar a España.（我要去西班牙旅行。）",
        },
        {
          id: "o2",
          palabras: ["la", "hacer", "Tengo", "que", "maleta", "."],
          respuestaCorrecta: "Tengo que hacer la maleta.",
          explicacion: "正确的句子是：Tengo que hacer la maleta.（我得收拾行李。）",
        },
        {
          id: "o3",
          palabras: ["son", "increíbles", "Las", "vistas", "."],
          respuestaCorrecta: "Las vistas son increíbles.",
          explicacion: "正确的句子是：Las vistas son increíbles.（景色令人难以置信。）",
        },
        {
          id: "o4",
          palabras: ["viaje", "encantó", "Me", "el", "."],
          respuestaCorrecta: "Me encantó el viaje.",
          explicacion: "正确的顺序是：Me encantó el viaje.",
        },
        {
          id: "o5",
          palabras: ["pasaporte", "olvides", "el", "No", "."],
          respuestaCorrecta: "No olvides el pasaporte.",
          explicacion: "正确的顺序是：No olvides el pasaporte.",
        },
        {
          id: "o6",
          palabras: ["volver", "Quiero", "próximo", "el", "año", "."],
          respuestaCorrecta: "Quiero volver el próximo año.",
          explicacion: "正确的顺序是：Quiero volver el próximo año.",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我今年夏天要去海滩。",
          respuestaEsperada: "Voy a la playa este verano.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "我已经订了酒店。",
          respuestaEsperada: "Ya he reservado el hotel.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "别忘了护照。",
          respuestaEsperada: "No olvides el pasaporte.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "我想明年再来。",
          respuestaEsperada: "Quiero volver el año que viene.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "我们玩得很开心。",
          respuestaEsperada: "Lo pasamos fenomenal.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "我推荐你参观这座城市。",
          respuestaEsperada: "Te recomiendo visitar esta ciudad.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "我的行李箱丢了。",
          respuestaEsperada: "He perdido mi maleta.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "我们去海边度假。",
          respuestaEsperada: "Nos vamos de vacaciones a la playa.",
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
        instruccion: "用正确的旅行词汇完成对话。",
        instruccionChino: "用正确的旅行词汇完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿Qué vas a hacer este _____?",
            respuesta: "verano",
          },
          {
            personaje: "B",
            texto: "Voy a _____ a la playa.",
            respuesta: "viajar / ir",
          },
          {
            personaje: "A",
            texto: "¿Ya _____ el hotel?",
            respuesta: "reservaste",
          },
          {
            personaje: "B",
            texto: "Sí, y también los _____ de avión.",
            respuesta: "billetes",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "responder",
        titulo: "Responde las preguntas",
        tituloChino: "回答问题",
        instruccion: "Responde las siguientes preguntas sobre viajes en español.",
        instruccionChino: "用西班牙语回答以下关于旅行的问题。",
        preguntas: [
          {
            pregunta: "¿Adónde te gusta viajar?",
            respuestaEsperada: "Me gusta viajar a (la playa / la montaña / el extranjero).",
          },
          {
            pregunta: "¿Qué haces antes de un viaje?",
            respuestaEsperada: "Hago la maleta, reservo el hotel y compro los billetes.",
          },
          {
            pregunta: "¿Cuál ha sido tu mejor viaje?",
            respuestaEsperada: "Mi mejor viaje fue a (país / ciudad).",
          },
          {
            pregunta: "¿Qué llevas siempre en tu maleta?",
            respuestaEsperada: "Siempre llevo ropa cómoda, crema solar y mi pasaporte.",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "planificar",
        titulo: "Planifica tu viaje ideal",
        tituloChino: "计划你理想的旅行",
        instruccion:
          "Escribe un plan de viaje para tus próximas vacaciones (destino, alojamiento, transporte, actividades).",
        instruccionChino: "为你下次假期写一个旅行计划（目的地、住宿、交通、活动）。",
        ejemplo:
          "Para mis próximas vacaciones quiero ir a la playa. Me alojaré en un hotel cerca del mar. Viajaré en avión. Durante el día nadaré, tomaré el sol y haré excursiones. Por la noche cenaré en restaurantes locales.",
      },
      {
        id: "ep4",
        tipo: "lista",
        titulo: "Lista de equipaje",
        tituloChino: "行李清单",
        instruccion: "Escribe una lista de 10 cosas que meterías en tu maleta para un viaje a la playa.",
        instruccionChino: "写出你去海滩旅行时行李箱里会放的10样东西。",
        ejemplo:
          "1. bañador, 2. toalla, 3. crema solar, 4. gafas de sol, 5. sombrero, 6. sandalias, 7. camisetas, 8. pantalón corto, 9. libro, 10. cargador del móvil.",
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Adónde te gusta viajar? ¿Por qué?",
        preguntaChino: "你喜欢去哪里旅行？为什么？",
        sugerencia: "Me gusta viajar a la playa porque me relaja.",
        sugerenciaChino: "Me gusta viajar a la playa porque me relaja.",
      },
      {
        id: "pa2",
        pregunta: "¿Cuál es tu próximo destino de viaje?",
        preguntaChino: "你的下一个旅行目的地是哪里？",
        sugerencia: "Mi próximo destino es (ciudad / país).",
        sugerenciaChino: "Mi próximo destino es (ciudad / país).",
      },
      {
        id: "pa3",
        pregunta: "¿Qué cosas no pueden faltar en tu maleta?",
        preguntaChino: "你的行李箱里不能少什么？",
        sugerencia: "En mi maleta no pueden faltar el pasaporte, la cámara y la crema solar.",
        sugerenciaChino: "En mi maleta no pueden faltar el pasaporte, la cámara y la crema solar.",
      },
      {
        id: "pa4",
        pregunta: "¿Prefieres viajar en avión o en tren? ¿Por qué?",
        preguntaChino: "你更喜欢坐飞机还是火车旅行？为什么？",
        sugerencia: "Prefiero viajar en tren porque puedo ver el paisaje y es más cómodo.",
        sugerenciaChino: "Prefiero viajar en tren porque puedo ver el paisaje y es más cómodo.",
      },
      {
        id: "pa5",
        pregunta: "¿Qué haces si pierdes tu maleta en el aeropuerto?",
        preguntaChino: "如果你在机场丢了行李箱你会做什么？",
        sugerencia: "Voy a la oficina de objetos perdidos y pongo una reclamación.",
        sugerenciaChino: "Voy a la oficina de objetos perdidos y pongo una reclamación.",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '假期' en español?",
        preguntaChino: "西班牙语中'假期'怎么说？",
        respuestaSugerida: "vacaciones",
        respuestaSugeridaChino: "vacaciones",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '收拾行李' en español?",
        preguntaChino: "西班牙语中'收拾行李'怎么说？",
        respuestaSugerida: "hacer la maleta",
        respuestaSugeridaChino: "hacer la maleta",
      },
      {
        id: "p3",
        pregunta: "¿Qué significa 'Me encantó el viaje'?",
        preguntaChino: "'Me encantó el viaje'是什么意思？",
        respuestaSugerida: "我超爱这次旅行",
        respuestaSugeridaChino: "I loved the trip",
      },
      {
        id: "p4",
        pregunta: "¿Dónde prefieres alojarte cuando viajas?",
        preguntaChino: "旅行时你更喜欢住在哪里？",
        respuestaSugerida: "Prefiero alojarme en un hotel / en un hostal.",
        respuestaSugeridaChino: "Prefiero alojarme en un hotel / en un hostal.",
      },
      {
        id: "p5",
        pregunta: "¿Cómo se dice '防晒霜' en español?",
        preguntaChino: "西班牙语中'防晒霜'怎么说？",
        respuestaSugerida: "crema solar",
        respuestaSugeridaChino: "crema solar",
      },
      {
        id: "p6",
        pregunta: "¿Qué significa 'hacer turismo'?",
        preguntaChino: "'hacer turismo'是什么意思？",
        respuestaSugerida: "Visitar lugares de interés / 观光",
        respuestaSugeridaChino: "Visitar lugares de interés",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Verbos reflexivos de la rutina diaria",
        tituloChino: "日常反身动词",
        descripcion: `🔹 VERBOS REFLEXIVOS PARA LA RUTINA DIARIA:

MAÑANA (morning):
• despertarse = to wake up
• levantarse = to get up
• estirarse = to stretch
• bostezar (no reflexivo) = to yawn
• ducharse = to shower
• bañarse = to bathe
• lavarse la cara = to wash face
• lavarse los dientes = to brush teeth
• afeitarse = to shave
• maquillarse = to put on makeup
• peinarse = to comb hair
• secarse el pelo = to dry hair
• vestirse = to get dressed
• ponerse la ropa = to put on clothes

MEDIO DÍA / TARDE (midday / afternoon):
• desayunar (no reflexivo) = to have breakfast
• ir al trabajo / a la escuela = to go to work/school
• trabajar / estudiar = to work / study
• almorzar / comer = to have lunch
• hacer la siesta = to take a nap (Spain)
• volver a casa = to return home

NOCHE (evening/night):
• cenar = to have dinner
• ver la televisión = to watch TV
• leer = to read
• escuchar música = to listen to music
• relajarse = to relax
• desvestirse = to get undressed
• ponerse el pijama = to put on pajamas
• acostarse = to go to bed
• dormirse = to fall asleep

🔹 PRONOMBRES REFLEXIVOS (reflexive pronouns):
• me = myself (yo)
• te = yourself (tú)
• se = himself/herself/yourself (él/ella/usted)
• nos = ourselves (nosotros)
• os = yourselves (vosotros)
• se = themselves/yourselves (ellos/ellas/ustedes)

📌 EJEMPLOS:
• Me despierto a las siete.
• Me ducho por la mañana.
• Me acuesto a las once.`,
        descripcionChino: `🔹 日常反身动词：

早上：
• despertarse = 醒来
• levantarse = 起床
• estirarse = 伸展
• bostezar = 打哈欠（非反身）
• ducharse = 淋浴
• bañarse = 泡澡
• lavarse la cara = 洗脸
• lavarse los dientes = 刷牙
• afeitarse = 刮胡子
• maquillarse = 化妆
• peinarse = 梳头
• secarse el pelo = 吹干头发
• vestirse = 穿衣服
• ponerse la ropa = 穿上衣服

中午/下午：
• desayunar = 吃早餐（非反身）
• ir al trabajo / a la escuela = 去上班/上学
• trabajar / estudiar = 工作/学习
• almorzar / comer = 吃午餐
• hacer la siesta = 午睡（西班牙）
• volver a casa = 回家

晚上：
• cenar = 吃晚餐
• ver la televisión = 看电视
• leer = 阅读
• escuchar música = 听音乐
• relajarse = 放松
• desvestirse = 脱衣服
• ponerse el pijama = 穿上睡衣
• acostarse = 上床睡觉
• dormirse = 入睡

🔹 反身代词：
• me = 我自己（yo）
• te = 你自己（tú）
• se = 他/她/您自己（él/ella/usted）
• nos = 我们自己（nosotros）
• os = 你们自己（vosotros）
• se = 他们/她们/您们自己（ellos/ellas/ustedes）

📌 例子：
• Me despierto a las siete. = 我七点醒来。
• Me ducho por la mañana. = 我早上淋浴。
• Me acuesto a las once. = 我十一点睡觉。`,
        ejemplos: [
          {
            espanol: "Me despierto a las siete.",
            chino: "我七点醒来。",
          },
          {
            espanol: "Me ducho por la mañana.",
            chino: "我早上淋浴。",
          },
          {
            espanol: "Me acuesto a las once.",
            chino: "我十一点睡觉。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "La rutina diaria completa",
        tituloChino: "完整的日常作息",
        descripcion: `🔹 EJEMPLO DE RUTINA DIARIA COMPLETA:

🌅 POR LA MAÑANA (in the morning):
• Me despierto a las 7:00.
• Me levanto a las 7:05.
• Me ducho (o me baño).
• Me seco el pelo.
• Me visto.
• Me peino.
• Me lavo los dientes.
• Desayuno a las 7:30.
• Salgo de casa a las 8:00.

🌞 POR LA TARDE (in the afternoon):
• Trabajo / estudio de 9:00 a 14:00.
• Almuerzo a las 14:30.
• A veces hago la siesta.
• Vuelvo a trabajar / estudiar.
• Termino de trabajar a las 18:00.
• Vuelvo a casa.

🌙 POR LA NOCHE (at night):
• Ceno a las 21:00.
• Veo la televisión o leo.
• Me relajo.
• Me desvisto.
• Me pongo el pijama.
• Me lavo los dientes otra vez.
• Me acuesto a las 23:00.
• Me duermo sobre las 23:30.

🔹 EXPRESIONES DE TIEMPO (time expressions):
• por la mañana = in the morning
• por la tarde = in the afternoon
• por la noche = at night
• por la madrugada = in the early morning
• todos los días = every day
• de lunes a viernes = from Monday to Friday
• los fines de semana = on weekends
• a menudo = often
• a veces = sometimes
• raramente = rarely
• normalmente = normally
• generalmente = generally

📌 EJEMPLOS:
• Me levanto a las ocho.
• Desayuno en casa.
• Vuelvo a casa a las seis.`,
        descripcionChino: `🔹 完整日常作息例子：

🌅 早上：
• Me despierto a las 7:00. = 我七点醒来。
• Me levanto a las 7:05. = 我七点零五分起床。
• Me ducho (o me baño). = 我淋浴（或泡澡）。
• Me seco el pelo. = 我吹干头发。
• Me visto. = 我穿衣服。
• Me peino. = 我梳头。
• Me lavo los dientes. = 我刷牙。
• Desayuno a las 7:30. = 我七点半吃早餐。
• Salgo de casa a las 8:00. = 我八点出门。

🌞 下午：
• Trabajo / estudio de 9:00 a 14:00. = 我从九点到两点工作/学习。
• Almuerzo a las 14:30. = 我两点半吃午餐。
• A veces hago la siesta. = 我有时午睡。
• Vuelvo a trabajar / estudiar. = 我回去工作/学习。
• Termino de trabajar a las 18:00. = 我六点结束工作。
• Vuelvo a casa. = 我回家。

🌙 晚上：
• Ceno a las 21:00. = 我九点吃晚餐。
• Veo la televisión o leo. = 我看电视或阅读。
• Me relajo. = 我放松。
• Me desvisto. = 我脱衣服。
• Me pongo el pijama. = 我穿上睡衣。
• Me lavo los dientes otra vez. = 我再刷一次牙。
• Me acuesto a las 23:00. = 我十一点上床。
• Me duermo sobre las 23:30. = 我大约十一点半入睡。

🔹 时间表达：
• por la mañana = 早上
• por la tarde = 下午
• por la noche = 晚上
• por la madrugada = 凌晨
• todos los días = 每天
• de lunes a viernes = 从周一到周五
• los fines de semana = 周末
• a menudo = 经常
• a veces = 有时
• raramente = 很少
• normalmente = 通常
• generalmente = 一般来说

📌 例子：
• Me levanto a las ocho. = 我八点起床。
• Desayuno en casa. = 我在家吃早餐。
• Vuelvo a casa a las seis. = 我六点回家。`,
        ejemplos: [
          {
            espanol: "Me levanto a las ocho.",
            chino: "我八点起床。",
          },
          {
            espanol: "Desayuno en casa.",
            chino: "我在家吃早餐。",
          },
          {
            espanol: "Vuelvo a casa a las seis.",
            chino: "我六点回家。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Preguntar sobre la rutina",
        tituloChino: "询问日常作息",
        descripcion: `🔹 PREGUNTAS COMUNES (common questions):

• ¿A qué hora te despiertas?
• ¿A qué hora te levantas?
• ¿Qué haces por la mañana?
• ¿Dónde desayunas?
• ¿Cómo vas al trabajo / a la escuela?
• ¿A qué hora vuelves a casa?
• ¿Qué haces antes de acostarte?
• ¿Qué haces los fines de semana?
• ¿Cuántas horas duermes al día?
• ¿Haces ejercicio a menudo?
• ¿Cenas temprano o tarde?

🔹 CONECTORES PARA HABLAR DE RUTINA (connectors):
• primero = first
• luego / después = then / after
• más tarde = later
• finalmente = finally
• antes de = before
• después de = after
• mientras = while
• durante = during
• al mismo tiempo = at the same time

🔹 RESPUESTAS COMUNES (common answers):
• Me despierto a las siete y media.
• Primero me ducho, luego desayuno.
• Antes de acostarme, leo un libro.
• Después de trabajar, vuelvo a casa.
• Los fines de semana me levanto más tarde.

📌 EJEMPLOS:
• Primero me levanto, luego desayuno.
• Antes de acostarme, leo un libro.
• Después de trabajar, vuelvo a casa.`,
        descripcionChino: `🔹 常见问题：

• ¿A qué hora te despiertas? = 你几点醒来？
• ¿A qué hora te levantas? = 你几点起床？
• ¿Qué haces por la mañana? = 你早上做什么？
• ¿Dónde desayunas? = 你在哪里吃早餐？
• ¿Cómo vas al trabajo / a la escuela? = 你怎么去上班/上学？
• ¿A qué hora vuelves a casa? = 你几点回家？
• ¿Qué haces antes de acostarte? = 你睡觉前做什么？
• ¿Qué haces los fines de semana? = 你周末做什么？
• ¿Cuántas horas duermes al día? = 你每天睡几个小时？
• ¿Haces ejercicio a menudo? = 你经常锻炼吗？
• ¿Cenas temprano o tarde? = 你吃晚餐早还是晚？

🔹 描述日常的连接词：
• primero = 首先
• luego / después = 然后/之后
• más tarde = 稍后
• finalmente = 最后
• antes de = 在...之前
• después de = 在...之后
• mientras = 在...的同时
• durante = 在...期间
• al mismo tiempo = 同时

🔹 常见回答：
• Me despierto a las siete y media. = 我七点半醒来。
• Primero me ducho, luego desayuno. = 首先我淋浴，然后吃早餐。
• Antes de acostarme, leo un libro. = 睡觉前，我读一本书。
• Después de trabajar, vuelvo a casa. = 工作后，我回家。
• Los fines de semana me levanto más tarde. = 周末我起床更晚。

📌 例子：
• Primero me levanto, luego desayuno. = 首先我起床，然后吃早餐。
• Antes de acostarme, leo un libro. = 睡觉前，我读一本书。
• Después de trabajar, vuelvo a casa. = 工作后，我回家。`,
        ejemplos: [
          {
            espanol: "Primero me levanto, luego desayuno.",
            chino: "首先我起床，然后吃早餐。",
          },
          {
            espanol: "Antes de acostarme, leo un libro.",
            chino: "睡觉前，我读一本书。",
          },
          {
            espanol: "Después de trabajar, vuelvo a casa.",
            chino: "工作后，我回家。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Rutina entre semana vs fin de semana",
        tituloChino: "工作日 vs 周末的日常",
        descripcion: `🔹 ENTRE SEMANA (weekdays) vs FIN DE SEMANA (weekend):

ENTRE SEMANA:
• Me levanto temprano (a las 7:00)
• Desayuno rápido
• Voy al trabajo o a la escuela
• Trabajo 8 horas
• Almuerzo fuera de casa
• Vuelvo a casa tarde
• Me acuesto más temprano

FIN DE SEMANA:
• Me levanto más tarde (sobre las 10:00)
• Desayuno tranquilamente
• No trabajo / no estudio
• Hago planes con amigos
• Almuerzo en familia
• Me acuesto más tarde

🔹 FRASES ÚTILES:
• Los días de semana me levanto a las 7, pero los fines de semana me levanto a las 10.
• Entre semana como en el trabajo, los fines de semana como en casa.
• El sábado salgo con amigos, el domingo descanso.
• Mi rutina cambia completamente los fines de semana.

📌 EJEMPLOS:
• Entre semana me ducho por la mañana, pero los fines de semana me ducho por la noche.
• Los sábados no me pongo el despertador.`,
        descripcionChino: `🔹 工作日 vs 周末：

工作日：
• Me levanto temprano (a las 7:00) = 我早起（7点）
• Desayuno rápido = 我快速吃早餐
• Voy al trabajo o a la escuela = 我去上班或上学
• Trabajo 8 horas = 我工作8小时
• Almuerzo fuera de casa = 我在外面吃午餐
• Vuelvo a casa tarde = 我晚回家
• Me acuesto más temprano = 我较早睡觉

周末：
• Me levanto más tarde (sobre las 10:00) = 我起得更晚（大约10点）
• Desayuno tranquilamente = 我悠闲地吃早餐
• No trabajo / no estudio = 我不工作/不学习
• Hago planes con amigos = 我和朋友有安排
• Almuerzo en familia = 我和家人吃午餐
• Me acuesto más tarde = 我睡得更晚

🔹 有用句子：
• Los días de semana me levanto a las 7, pero los fines de semana me levanto a las 10. = 工作日我7点起床，但周末我10点起床。
• Entre semana como en el trabajo, los fines de semana como en casa. = 工作日我在工作的地方吃饭，周末我在家吃。
• El sábado salgo con amigos, el domingo descanso. = 星期六我和朋友出去，星期日我休息。
• Mi rutina cambia completamente los fines de semana. = 我的日常在周末完全改变。

📌 例子：
• Entre semana me ducho por la mañana, pero los fines de semana me ducho por la noche. = 工作日我早上淋浴，但周末我晚上淋浴。
• Los sábados no me pongo el despertador. = 星期六我不定闹钟。`,
        ejemplos: [
          {
            espanol: "Entre semana me ducho por la mañana.",
            chino: "工作日我早上淋浴。",
          },
          {
            espanol: "Los sábados no me pongo el despertador.",
            chino: "星期六我不定闹钟。",
          },
          {
            espanol: "El domingo desayuno con mi familia.",
            chino: "星期日我和家人吃早餐。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "despertarse",
        chino: "醒来",
        ejemplo: "Me despierto temprano.",
      },
      {
        id: "v2",
        espanol: "levantarse",
        chino: "起床",
        ejemplo: "Me levanto a las ocho.",
      },
      {
        id: "v3",
        espanol: "ducharse",
        chino: "淋浴",
        ejemplo: "Me ducho cada mañana.",
      },
      {
        id: "v4",
        espanol: "bañarse",
        chino: "泡澡",
        ejemplo: "Me baño los domingos.",
      },
      {
        id: "v5",
        espanol: "vestirse",
        chino: "穿衣服",
        ejemplo: "Me visto rápido.",
      },
      {
        id: "v6",
        espanol: "desvestirse",
        chino: "脱衣服",
        ejemplo: "Me desvisto por la noche.",
      },
      {
        id: "v7",
        espanol: "peinarse",
        chino: "梳头",
        ejemplo: "Me peino antes de salir.",
      },
      {
        id: "v8",
        espanol: "lavarse",
        chino: "洗",
        ejemplo: "Me lavo las manos.",
      },
      {
        id: "v9",
        espanol: "lavarse la cara",
        chino: "洗脸",
        ejemplo: "Me lavo la cara con agua fría.",
      },
      {
        id: "v10",
        espanol: "lavarse los dientes",
        chino: "刷牙",
        ejemplo: "Me lavo los dientes después de comer.",
      },
      {
        id: "v11",
        espanol: "afeitarse",
        chino: "刮胡子",
        ejemplo: "Mi padre se afeita cada día.",
      },
      {
        id: "v12",
        espanol: "maquillarse",
        chino: "化妆",
        ejemplo: "Ella se maquilla por la mañana.",
      },
      {
        id: "v13",
        espanol: "secarse el pelo",
        chino: "吹干头发",
        ejemplo: "Me seco el pelo con el secador.",
      },
      {
        id: "v14",
        espanol: "acostarse",
        chino: "上床睡觉",
        ejemplo: "Me acuesto tarde.",
      },
      {
        id: "v15",
        espanol: "dormirse",
        chino: "入睡",
        ejemplo: "Me duermo rápidamente.",
      },
      {
        id: "v16",
        espanol: "desayunar",
        chino: "吃早餐",
        ejemplo: "Desayuno a las nueve.",
      },
      {
        id: "v17",
        espanol: "almorzar / comer",
        chino: "吃午餐",
        ejemplo: "Almuerzo con compañeros.",
      },
      {
        id: "v18",
        espanol: "cenar",
        chino: "吃晚餐",
        ejemplo: "Ceno con mi familia.",
      },
      {
        id: "v19",
        espanol: "hacer la siesta",
        chino: "午睡",
        ejemplo: "En España se hace la siesta.",
      },
      {
        id: "v20",
        espanol: "relajarse",
        chino: "放松",
        ejemplo: "Me relajo viendo una serie.",
      },
      {
        id: "v21",
        espanol: "todos los días",
        chino: "每天",
        ejemplo: "Estudio todos los días.",
      },
      {
        id: "v22",
        espanol: "por la mañana",
        chino: "早上",
        ejemplo: "Trabajo por la mañana.",
      },
      {
        id: "v23",
        espanol: "por la tarde",
        chino: "下午",
        ejemplo: "Estudio por la tarde.",
      },
      {
        id: "v24",
        espanol: "por la noche",
        chino: "晚上",
        ejemplo: "Veo la tele por la noche.",
      },
      {
        id: "v25",
        espanol: "entre semana",
        chino: "工作日",
        ejemplo: "Trabajo entre semana.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Describiendo la rutina",
        tituloChino: "描述日常作息",
        personajes: ["Ana", "Carlos"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Carlos, ¿a qué hora te levantas?",
            traduccion: "卡洛斯，你几点起床？",
          },
          {
            personaje: "Carlos",
            texto: "Normalmente me levanto a las siete.",
            traduccion: "我通常七点起床。",
          },
          {
            personaje: "Ana",
            texto: "¿Y qué haces después?",
            traduccion: "然后你做什么？",
          },
          {
            personaje: "Carlos",
            texto: "Me ducho, desayuno y voy al trabajo.",
            traduccion: "我淋浴、吃早餐然后去上班。",
          },
          {
            personaje: "Ana",
            texto: "¿A qué hora vuelves a casa?",
            traduccion: "你几点回家？",
          },
          {
            personaje: "Carlos",
            texto: "Vuelvo sobre las seis y ceno con mi familia.",
            traduccion: "我大约六点回来，然后和家人吃晚餐。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Rutina de fin de semana",
        tituloChino: "周末作息",
        personajes: ["María", "Pedro"],
        lineas: [
          {
            personaje: "María",
            texto: "Pedro, ¿te levantas tarde los fines de semana?",
            traduccion: "佩德罗，你周末起得晚吗？",
          },
          {
            personaje: "Pedro",
            texto: "Sí, siempre duermo hasta las diez.",
            traduccion: "是的，我总是睡到十点。",
          },
          {
            personaje: "María",
            texto: "¿Y qué haces después?",
            traduccion: "然后你做什么？",
          },
          {
            personaje: "Pedro",
            texto: "Desayuno tranquilamente y luego hago deporte.",
            traduccion: "我悠闲地吃早餐，然后做运动。",
          },
          {
            personaje: "María",
            texto: "¡Qué bien! Yo nunca tengo tiempo.",
            traduccion: "真好！我从没时间。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Rutina antes de dormir",
        tituloChino: "睡前 routine",
        personajes: ["Luis", "Sofía"],
        lineas: [
          {
            personaje: "Luis",
            texto: "Sofía, ¿qué haces antes de acostarte?",
            traduccion: "索菲亚，你睡觉前做什么？",
          },
          {
            personaje: "Sofía",
            texto: "Primero me lavo los dientes, luego me pongo el pijama.",
            traduccion: "首先我刷牙，然后穿上睡衣。",
          },
          {
            personaje: "Luis",
            texto: "¿Y después?",
            traduccion: "然后呢？",
          },
          {
            personaje: "Sofía",
            texto: "Leo un poco antes de dormir. Me relaja.",
            traduccion: "睡觉前我读一会儿书。很放松。",
          },
          {
            personaje: "Luis",
            texto: "Yo veo series en el móvil, pero no es buena costumbre.",
            traduccion: "我用手机看电视剧，但不是好习惯。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Cambios en la rutina",
        tituloChino: "日常的变化",
        personajes: ["Laura", "David"],
        lineas: [
          {
            personaje: "Laura",
            texto: "David, ¿tu rutina ha cambiado con el nuevo trabajo?",
            traduccion: "大卫，你的日常因为新工作改变了吗？",
          },
          {
            personaje: "David",
            texto: "Mucho. Ahora me levanto a las seis y media.",
            traduccion: "很多。现在我六点半起床。",
          },
          {
            personaje: "Laura",
            texto: "¿Y antes a qué hora te levantabas?",
            traduccion: "那你以前几点起床？",
          },
          {
            personaje: "David",
            texto: "Antes me levantaba a las ocho. Era más cómodo.",
            traduccion: "以前我八点起床。更舒服。",
          },
          {
            personaje: "Laura",
            texto: "¿Y ahora cuándo te acuestas?",
            traduccion: "现在你几点睡觉？",
          },
          {
            personaje: "David",
            texto: "Sobre las once. Antes me acostaba a la una.",
            traduccion: "大约十一点。以前我一点睡。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Comparando rutinas",
        tituloChino: "比较日常作息",
        personajes: ["Sofía", "Javier"],
        lineas: [
          {
            personaje: "Sofía",
            texto: "Javier, ¿en qué se diferencia tu rutina entre semana del fin de semana?",
            traduccion: "哈维尔，你的工作日和周末日常有什么区别？",
          },
          {
            personaje: "Javier",
            texto: "Entre semana me levanto a las 7. Los fines de semana a las 10 o 11.",
            traduccion: "工作日我7点起床。周末我10点或11点起床。",
          },
          {
            personaje: "Sofía",
            texto: "¿Y el desayuno?",
            traduccion: "早餐呢？",
          },
          {
            personaje: "Javier",
            texto: "Entre semana desayuno rápido. Los fines de semana desayuno tranquilo con mi familia.",
            traduccion: "工作日我快速吃早餐。周末我和家人悠闲地吃早餐。",
          },
          {
            personaje: "Sofía",
            texto: "Yo hago lo mismo. Los sábados no me pongo el despertador.",
            traduccion: "我也一样。星期六我不定闹钟。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "我七点醒来：Me _____ a las siete.",
          preguntaChino: "我七点醒来：Me _____ a las siete.",
          respuestaCorrecta: "despierto",
          explicacion: "Despertarse = 醒来",
          pista: "首字母是 d，9个字母",
          numeroLetras: 9,
        },
        {
          id: "c2",
          pregunta: "我八点起床：Me _____ a las ocho.",
          preguntaChino: "我八点起床：Me _____ a las ocho.",
          respuestaCorrecta: "levanto",
          explicacion: "Levantarse = 起床",
          pista: "首字母是 l，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c3",
          pregunta: "我早上淋浴：Me _____ por la mañana.",
          preguntaChino: "我早上淋浴：Me _____ por la mañana.",
          respuestaCorrecta: "ducho",
          explicacion: "Ducharse = 淋浴",
          pista: "首字母是 d，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c4",
          pregunta: "我十一点睡觉：Me _____ a las once.",
          preguntaChino: "我十一点睡觉：Me _____ a las once.",
          respuestaCorrecta: "acuesto",
          explicacion: "Acostarse = 上床睡觉",
          pista: "首字母是 a，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c5",
          pregunta: "早上我们说：por la _____",
          preguntaChino: "早上我们说：por la _____",
          respuestaCorrecta: "mañana",
          explicacion: "Por la mañana = 早上",
          pista: "首字母是 m，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c6",
          pregunta: "我刷牙：Me lavo los _____",
          preguntaChino: "我刷牙：Me lavo los _____",
          respuestaCorrecta: "dientes",
          explicacion: "Dientes = 牙齿",
          pista: "首字母是 d，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c7",
          pregunta: "我穿衣服：Me _____",
          preguntaChino: "我穿衣服：Me _____",
          respuestaCorrecta: "visto",
          explicacion: "Vestirse = 穿衣服",
          pista: "首字母是 v，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c8",
          pregunta: "我入睡：Me _____",
          preguntaChino: "我入睡：Me _____",
          respuestaCorrecta: "duermo",
          explicacion: "Dormirse = 入睡",
          pista: "首字母是 d，6个字母",
          numeroLetras: 6,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "你起床后第一件事做什么？",
          preguntaChino: "你起床后第一件事做什么？",
          opciones: ["me acuesto", "me ducho", "me levanto", "me duermo"],
          respuestaCorrecta: "me levanto",
          explicacion: "起床后第一件事是起床",
        },
        {
          id: "s2",
          pregunta: "什么时候吃早餐？",
          preguntaChino: "什么时候吃早餐？",
          opciones: ["por la noche", "por la tarde", "por la mañana", "por la madrugada"],
          respuestaCorrecta: "por la mañana",
          explicacion: "早餐在早上吃",
        },
        {
          id: "s3",
          pregunta: "'Me ducho'是什么意思？",
          preguntaChino: "'Me ducho'是什么意思？",
          opciones: ["我起床", "我淋浴", "我穿衣服", "我睡觉"],
          respuestaCorrecta: "我淋浴",
          explicacion: "Ducharse = 淋浴",
        },
        {
          id: "s4",
          pregunta: "哪个是反身代词？",
          preguntaChino: "哪个是反身代词？",
          opciones: ["me", "yo", "mi", "conmigo"],
          respuestaCorrecta: "me",
          explicacion: "反身代词有 me, te, se, nos, os",
        },
        {
          id: "s5",
          pregunta: "'Antes de acostarme'是什么意思？",
          preguntaChino: "'Antes de acostarme'是什么意思？",
          opciones: ["起床前", "睡觉前", "吃饭前", "出门前"],
          respuestaCorrecta: "睡觉前",
          explicacion: "Acostarse = 上床睡觉",
        },
        {
          id: "s6",
          pregunta: "¿Cómo se dice '我梳头' en español?",
          preguntaChino: "西班牙语中'我梳头'怎么说？",
          opciones: ["Me peino", "Me lavo", "Me visto", "Me ducho"],
          respuestaCorrecta: "Me peino",
          explicacion: "Peinarse = 梳头",
        },
        {
          id: "s7",
          pregunta: "¿Qué significa 'me relajo'?",
          preguntaChino: "'me relajo'是什么意思？",
          opciones: ["我紧张", "我放松", "我工作", "我学习"],
          respuestaCorrecta: "我放松",
          explicacion: "Relajarse = 放松",
        },
        {
          id: "s8",
          pregunta: "¿Cuál es la forma correcta del reflexivo para 'ellos'?",
          preguntaChino: "'ellos'的反身代词正确形式是什么？",
          opciones: ["me", "te", "nos", "se"],
          respuestaCorrecta: "se",
          explicacion: "Ellos se duchan, ellos se levantan",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Me visto'意思是穿衣服。",
          preguntaChino: "'Me visto'意思是穿衣服。",
          respuestaCorrecta: true,
          explicacion: "对。Vestirse = 穿衣服",
        },
        {
          id: "vf2",
          pregunta: "晚餐在早上吃。",
          preguntaChino: "晚餐在早上吃。",
          respuestaCorrecta: false,
          explicacion: "错。晚餐在晚上吃。",
        },
        {
          id: "vf3",
          pregunta: "'A veces'意思是'有时'。",
          preguntaChino: "'A veces'意思是'有时'。",
          respuestaCorrecta: true,
          explicacion: "对。A veces = sometimes",
        },
        {
          id: "vf4",
          pregunta: "反身动词需要反身代词。",
          preguntaChino: "反身动词需要反身代词。",
          respuestaCorrecta: true,
          explicacion: "对。如 me lavo, te duchas",
        },
        {
          id: "vf5",
          pregunta: "'Por la noche'意思是'早上'。",
          preguntaChino: "'Por la noche'意思是'早上'。",
          respuestaCorrecta: false,
          explicacion: "错。Por la noche = 晚上",
        },
        {
          id: "vf6",
          pregunta: "El verbo 'acostarse' significa 'levantarse'.",
          preguntaChino: "动词'acostarse'意思是'起床'。",
          respuestaCorrecta: false,
          explicacion: "错。Acostarse = 睡觉",
        },
        {
          id: "vf7",
          pregunta: "'Hacer la siesta' es típico en España.",
          preguntaChino: "'Hacer la siesta'在西班牙很典型。",
          respuestaCorrecta: true,
          explicacion: "对。La siesta es costumbre española.",
        },
        {
          id: "vf8",
          pregunta: "Los verbos reflexivos siempre terminan en -se en infinitivo.",
          preguntaChino: "反身动词原形总是以-se结尾。",
          respuestaCorrecta: true,
          explicacion: "对。Ej: levantarse, ducharse",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "despertarse",
              derecha: "醒来",
            },
            {
              izquierda: "levantarse",
              derecha: "起床",
            },
            {
              izquierda: "ducharse",
              derecha: "淋浴",
            },
            {
              izquierda: "bañarse",
              derecha: "泡澡",
            },
            {
              izquierda: "vestirse",
              derecha: "穿衣服",
            },
            {
              izquierda: "peinarse",
              derecha: "梳头",
            },
            {
              izquierda: "lavarse los dientes",
              derecha: "刷牙",
            },
            {
              izquierda: "afeitarse",
              derecha: "刮胡子",
            },
            {
              izquierda: "maquillarse",
              derecha: "化妆",
            },
            {
              izquierda: "acostarse",
              derecha: "上床睡觉",
            },
            {
              izquierda: "dormirse",
              derecha: "入睡",
            },
            {
              izquierda: "desayunar",
              derecha: "吃早餐",
            },
            {
              izquierda: "almorzar",
              derecha: "吃午餐",
            },
            {
              izquierda: "cenar",
              derecha: "吃晚餐",
            },
          ],
          explicacion: "将日常动词与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["las", "Me", "siete", "a", "despierto", "."],
          respuestaCorrecta: "Me despierto a las siete.",
          explicacion: "正确的句子是：Me despierto a las siete.（我七点醒来。）",
        },
        {
          id: "o2",
          palabras: ["después", "Me", "ducho", "levanto", "me", "."],
          respuestaCorrecta: "Me levanto y después me ducho.",
          explicacion: "正确的句子是：Me levanto y después me ducho.（我起床然后淋浴。）",
        },
        {
          id: "o3",
          palabras: ["acostarte", "haces", "Qué", "antes", "de", "?"],
          respuestaCorrecta: "¿Qué haces antes de acostarte?",
          explicacion: "正确的句子是：¿Qué haces antes de acostarte?（你睡觉前做什么？）",
        },
        {
          id: "o4",
          palabras: ["visto", "me", "Rápidamente", "."],
          respuestaCorrecta: "Rápidamente me visto.",
          explicacion: "正确的顺序是：Rápidamente me visto.",
        },
        {
          id: "o5",
          palabras: ["los", "peino", "me", "dientes", "Me", "lavo", "y", "luego", "pelo", "el"],
          respuestaCorrecta: "Me lavo los dientes y luego me peino el pelo.",
          explicacion: "正确的顺序是：Me lavo los dientes y luego me peino el pelo.",
        },
        {
          id: "o6",
          palabras: ["tarde", "nunca", "me", "acuesto", "Los", "entre", "semana", "."],
          respuestaCorrecta: "Entre semana nunca me acuesto tarde.",
          explicacion: "正确的顺序是：Entre semana nunca me acuesto tarde.",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我七点醒来。",
          respuestaEsperada: "Me despierto a las siete.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "我早上淋浴。",
          respuestaEsperada: "Me ducho por la mañana.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "你几点睡觉？",
          respuestaEsperada: "¿A qué hora te acuestas?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "我睡前读书。",
          respuestaEsperada: "Leo antes de acostarme.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "周末我起得更晚。",
          respuestaEsperada: "Los fines de semana me levanto más tarde.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "我洗脸刷牙然后吃早餐。",
          respuestaEsperada: "Me lavo la cara y los dientes y luego desayuno.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "我每天工作八小时。",
          respuestaEsperada: "Trabajo ocho horas al día.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "睡觉前我放松看电视剧。",
          respuestaEsperada: "Antes de acostarme me relajo viendo una serie.",
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
        instruccion: "用正确的反身动词完成对话。",
        instruccionChino: "用正确的反身动词完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿A qué hora te _____?",
            respuesta: "despiertas / levantas",
          },
          {
            personaje: "B",
            texto: "Me _____ a las siete.",
            respuesta: "despierto / levanto",
          },
          {
            personaje: "A",
            texto: "¿Y luego qué haces?",
            respuesta: "",
          },
          {
            personaje: "B",
            texto: "Me _____ y luego _____.",
            respuesta: "ducho / desayuno",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "responder",
        titulo: "Responde las preguntas",
        tituloChino: "回答问题",
        instruccion: "Responde las siguientes preguntas sobre tu rutina diaria en español.",
        instruccionChino: "用西班牙语回答以下关于你日常作息的问题。",
        preguntas: [
          {
            pregunta: "¿A qué hora te levantas?",
            respuestaEsperada: "Me levanto a las (hora).",
          },
          {
            pregunta: "¿Qué haces por la mañana?",
            respuestaEsperada: "Por la mañana me ducho, desayuno y voy al trabajo.",
          },
          {
            pregunta: "¿A qué hora te acuestas?",
            respuestaEsperada: "Me acuesto a las (hora).",
          },
          {
            pregunta: "¿Qué haces los fines de semana diferente?",
            respuestaEsperada: "Los fines de semana me levanto más tarde y salgo con amigos.",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "escribir",
        titulo: "Escribe tu rutina diaria",
        tituloChino: "写出你的日常作息",
        instruccion: "Escribe un texto de 8-10 líneas describiendo tu rutina diaria completa.",
        instruccionChino: "写一段8-10行的文字描述你完整的日常作息。",
        ejemplo:
          "Me despierto a las 7 de la mañana. Me levanto inmediatamente y me ducho. Después me seco el pelo y me visto. Desayuno café con leche y tostadas. A las 8 salgo de casa y voy al trabajo. Trabajo de 9 a 6. Vuelvo a casa a las 6:30, ceno y veo la televisión. Me acuesto sobre las 11 y me duermo rápidamente.",
      },
      {
        id: "ep4",
        tipo: "comparar",
        titulo: "Compara tu rutina con la de un compañero",
        tituloChino: "比较你和同学的日常",
        instruccion: "Escribe 5 diferencias entre tu rutina y la de un compañero imaginario.",
        instruccionChino: "写出你的日常和一个想象中的同学的5个不同之处。",
        ejemplo:
          "1. Yo me levanto a las 7, mi compañero se levanta a las 8. 2. Yo desayuno en casa, él desayuna en el trabajo. 3. Yo voy al trabajo en coche, él va en autobús...",
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "Describe tu rutina diaria por la mañana.",
        preguntaChino: "描述你早上的日常作息。",
        sugerencia: "Por la mañana me despierto a las..., luego me levanto...",
        sugerenciaChino: "Por la mañana me despierto a las..., luego me levanto...",
      },
      {
        id: "pa2",
        pregunta: "¿Qué haces los fines de semana diferente?",
        preguntaChino: "你周末做什么不同的事情？",
        sugerencia: "Los fines de semana me levanto más tarde y salgo con amigos.",
        sugerenciaChino: "Los fines de semana me levanto más tarde y salgo con amigos.",
      },
      {
        id: "pa3",
        pregunta: "¿Cuál es tu momento favorito del día? ¿Por qué?",
        preguntaChino: "你一天中最喜欢的时间是什么？为什么？",
        sugerencia: "Mi momento favorito es la noche porque me relajo y veo series.",
        sugerenciaChino: "Mi momento favorito es la noche porque me relajo y veo series.",
      },
      {
        id: "pa4",
        pregunta: "¿Qué haces antes de dormir?",
        preguntaChino: "你睡觉前做什么？",
        sugerencia: "Antes de dormir, me lavo los dientes, me pongo el pijama y leo un poco.",
        sugerenciaChino: "Antes de dormir, me lavo los dientes, me pongo el pijama y leo un poco.",
      },
      {
        id: "pa5",
        pregunta: "¿Cómo es tu rutina entre semana?",
        preguntaChino: "你工作日的日常是什么样的？",
        sugerencia: "Entre semana me levanto temprano, trabajo, y por la noche ceno y descanso.",
        sugerenciaChino: "Entre semana me levanto temprano, trabajo, y por la noche ceno y descanso.",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '我起床' en español?",
        preguntaChino: "西班牙语中'我起床'怎么说？",
        respuestaSugerida: "Me levanto",
        respuestaSugeridaChino: "Me levanto",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '我淋浴' en español?",
        preguntaChino: "西班牙语中'我淋浴'怎么说？",
        respuestaSugerida: "Me ducho",
        respuestaSugeridaChino: "Me ducho",
      },
      {
        id: "p3",
        pregunta: "¿Qué significa 'Me acuesto tarde'?",
        preguntaChino: "'Me acuesto tarde'是什么意思？",
        respuestaSugerida: "我晚睡",
        respuestaSugeridaChino: "I go to bed late",
      },
      {
        id: "p4",
        pregunta: "¿A qué hora te despiertas normalmente?",
        preguntaChino: "你通常几点醒来？",
        respuestaSugerida: "Normalmente me despierto a las (hora).",
        respuestaSugeridaChino: "Normalmente me despierto a las (hora).",
      },
      {
        id: "p5",
        pregunta: "¿Qué significa 'hacer la siesta'?",
        preguntaChino: "'hacer la siesta'是什么意思？",
        respuestaSugerida: "Dormir después de comer / 午睡",
        respuestaSugeridaChino: "午睡",
      },
      {
        id: "p6",
        pregunta: "¿Cómo se dice '我刷牙' en español?",
        preguntaChino: "西班牙语中'我刷牙'怎么说？",
        respuestaSugerida: "Me lavo los dientes",
        respuestaSugeridaChino: "Me lavo los dientes",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Llegar al restaurante y pedir mesa",
        tituloChino: "到达餐厅和要桌子",
        descripcion: `Frases para llegar y pedir mesa:

🔹 LLEGAR AL RESTAURANTE (arriving at the restaurant):
• ¿Tiene una mesa para dos? = Do you have a table for two?
• ¿Tiene una mesa para cuatro? = Do you have a table for four?
• ¿Hay alguna mesa libre? = Is there any free table?
• ¿Cuánto tiempo hay que esperar? = How long do we have to wait?
• Tengo una reserva a nombre de... = I have a reservation under the name of...
• ¿Puedo sentarme al lado de la ventana? = Can I sit by the window?
• Prefiero una mesa en la terraza = I prefer a table on the terrace
• ¿Puedo sentarme en la barra? = Can I sit at the bar?

🔹 VOCABULARIO DEL RESTAURANTE (restaurant vocabulary):
• la carta = menu
• la bebida = drink
• el plato = dish
• el primer plato = first course (starter)
• el segundo plato = second course (main)
• el postre = dessert
• la cuenta = bill
• el camarero / la camarera = waiter / waitress
• el jefe de sala = head waiter
• la propina = tip
• la reserva = reservation
• la terraza = terrace
• el menú del día = set menu (fixed price)
• la carta de vinos = wine list

📌 NOTA CULTURAL:
En España, el "menú del día" es muy común en los restaurantes para el almuerzo. Incluye primer plato, segundo plato, postre y bebida por un precio fijo (normalmente entre 10 y 15 euros).`,
        descripcionChino: `到达餐厅和要桌子的常用句子：

🔹 到达餐厅：
• ¿Tiene una mesa para dos? = 请问有两人桌吗？
• ¿Tiene una mesa para cuatro? = 请问有四人桌吗？
• ¿Hay alguna mesa libre? = 有空桌吗？
• ¿Cuánto tiempo hay que esperar? = 需要等多久？
• Tengo una reserva a nombre de... = 我有预订，名字是...
• ¿Puedo sentarme al lado de la ventana? = 我可以坐在窗边吗？
• Prefiero una mesa en la terraza = 我更喜欢露台上的桌子
• ¿Puedo sentarme en la barra? = 我可以坐吧台吗？

🔹 餐厅相关词汇：
• la carta = 菜单
• la bebida = 饮料
• el plato = 菜肴
• el primer plato = 第一道菜（前菜）
• el segundo plato = 第二道菜（主菜）
• el postre = 甜点
• la cuenta = 账单
• el camarero / la camarera = 服务员
• el jefe de sala = 餐厅主管
• la propina = 小费
• la reserva = 预订
• la terraza = 露台
• el menú del día = 当日套餐（固定价格）
• la carta de vinos = 酒水单

📌 文化提示：
在西班牙，餐厅午餐时很常见"menú del día"（当日套餐）。包括前菜、主菜、甜点和饮料，价格固定（通常在10到15欧元之间）。`,
        ejemplos: [
          {
            espanol: "Una mesa para dos, por favor.",
            chino: "请给我一张两人桌。",
          },
          {
            espanol: "Tengo una reserva.",
            chino: "我有预订。",
          },
          {
            espanol: "¿Me trae la carta, por favor?",
            chino: "请给我菜单。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Pedir la comida",
        tituloChino: "点餐",
        descripcion: `Frases para pedir:

🔹 ANTES DE PEDIR (before ordering):
• ¿Qué me recomienda? = What do you recommend?
• ¿Cuál es el plato del día? = What is the dish of the day?
• ¿Qué lleva este plato? = What does this dish contain?
• ¿Es picante? = Is it spicy?
• ¿Cuál es la especialidad de la casa? = What is the house specialty?

🔹 CÓMO PEDIR (how to order):
• Para empezar, quiero... = To start, I want...
• De primero, voy a tomar... = For the first course, I'll have...
• De segundo, quiero... = For the main course, I want...
• De postre, me gustaría... = For dessert, I'd like...
• Para beber, voy a tomar... = To drink, I'll have...

🔹 PREGUNTAR POR LOS INGREDIENTES (asking about ingredients):
• ¿Qué lleva este plato? = What does this dish have?
• ¿Es picante? = Is it spicy?
• ¿Lleva carne / pescado / verduras? = Does it have meat/fish/vegetables?
• ¿Tiene gluten? = Does it have gluten?
• ¿Tiene lactosa? = Does it have lactose?
• ¿Tiene frutos secos? = Does it have nuts?

🔹 PARA VEGETARIANOS Y VEGANOS:
• Soy vegetariano/a = I'm vegetarian
• Soy vegano/a = I'm vegan
• ¿Tiene opciones vegetarianas? = Do you have vegetarian options?
• ¿Puede hacerlo sin carne? = Can you make it without meat?
• ¿Tiene leche o huevo? = Does it have milk or egg?
• ¿Qué platos no llevan carne? = Which dishes don't have meat?

📌 EJEMPLOS:
• ¿Qué me recomienda?
• Para mí, la paella.
• Soy vegetariano.`,
        descripcionChino: `点餐常用句子：

🔹 点餐前：
• ¿Qué me recomienda? = 您推荐什么？
• ¿Cuál es el plato del día? = 今天的特色菜是什么？
• ¿Qué lleva este plato? = 这道菜里有什么？
• ¿Es picante? = 这道菜辣吗？
• ¿Cuál es la especialidad de la casa? = 餐厅的特色菜是什么？

🔹 点餐：
• Para empezar, quiero... = 作为前菜，我想要...
• De primero, voy a tomar... = 第一道菜，我要...
• De segundo, quiero... = 主菜，我要...
• De postre, me gustaría... = 甜点，我想要...
• Para beber, voy a tomar... = 饮料，我要...

🔹 询问食材：
• ¿Qué lleva este plato? = 这道菜里有什么？
• ¿Es picante? = 辣吗？
• ¿Lleva carne / pescado / verduras? = 里面有肉/鱼/蔬菜吗？
• ¿Tiene gluten? = 含麸质吗？
• ¿Tiene lactosa? = 含乳糖吗？
• ¿Tiene frutos secos? = 含坚果吗？

🔹 素食者和纯素食者用语：
• Soy vegetariano/a = 我是素食者
• Soy vegano/a = 我是纯素食者
• ¿Tiene opciones vegetarianas? = 有素食选项吗？
• ¿Puede hacerlo sin carne? = 可以不加肉吗？
• ¿Tiene leche o huevo? = 有牛奶或鸡蛋吗？
• ¿Qué platos no llevan carne? = 哪些菜没有肉？

📌 例子：
• ¿Qué me recomienda? = 您推荐什么？
• Para mí, la paella. = 给我海鲜饭。
• Soy vegetariano. = 我是素食者。`,
        ejemplos: [
          {
            espanol: "¿Qué me recomienda?",
            chino: "您推荐什么？",
          },
          {
            espanol: "Para mí, la paella.",
            chino: "给我海鲜饭。",
          },
          {
            espanol: "Soy vegetariano.",
            chino: "我是素食者。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Durante y después de la comida",
        tituloChino: "用餐期间和之后",
        descripcion: `Frases útiles:

🔹 DURANTE LA COMIDA (during the meal):
• Está muy bueno / delicioso = It's very good / delicious
• Está frío / caliente = It's cold / hot
• La comida está excelente = The food is excellent
• ¿Me puede traer más pan? = Can you bring me more bread?
• ¿Me puede traer sal / aceite? = Can you bring me salt/oil?
• ¿Puede repetirme el plato? = Can you repeat the dish? (no)
• Perdón, me han traído otro plato = Excuse me, they brought me the wrong dish

🔹 PEDIR LA CUENTA (asking for the bill):
• ¿Me puede traer la cuenta? = Can you bring me the bill?
• La cuenta, por favor = The bill, please
• ¿Cuánto es? = How much is it?
• ¿Está incluido el servicio? = Is service included?
• ¿Aceptan tarjeta? = Do you accept card?
• ¿Puedo pagar en efectivo? = Can I pay in cash?
• ¿Puedo pagar con tarjeta de crédito? = Can I pay with credit card?

🔹 LA PROPINA (the tip):
• ¿Se deja propina en España? = Do you leave a tip in Spain?
• Quédese con el cambio = Keep the change
• La propina no es obligatoria, pero se agradece = Tip is not mandatory, but appreciated

🔹 EXPRESIONES DE SATISFACCIÓN:
• La comida estaba excelente = The food was excellent
• Todo estuvo perfecto = Everything was perfect
• Volveré / Volveremos = I'll come back / We'll come back
• Se lo recomendaré a mis amigos = I'll recommend it to my friends

📌 NOTA CULTURAL:
En España, no es obligatorio dejar propina. En los bares y cafeterías, a veces se deja el cambio pequeño (unas monedas). En restaurantes, dejar el 5-10% es considerado generoso.`,
        descripcionChino: `有用句子：

🔹 用餐期间：
• Está muy bueno / delicioso = 很好吃/很美味
• Está frío / caliente = 凉了/热了
• La comida está excelente = 食物非常好
• ¿Me puede traer más pan? = 能再给我一些面包吗？
• ¿Me puede traer sal / aceite? = 能给我盐/油吗？
• ¿Puede repetirme el plato? = 能再给我一份吗？（不）
• Perdón, me han traído otro plato = 抱歉，他们给我上错了菜

🔹 结账：
• ¿Me puede traer la cuenta? = 可以给我账单吗？
• La cuenta, por favor = 请结账
• ¿Cuánto es? = 多少钱？
• ¿Está incluido el servicio? = 包含服务费吗？
• ¿Aceptan tarjeta? = 可以刷卡吗？
• ¿Puedo pagar en efectivo? = 可以用现金支付吗？
• ¿Puedo pagar con tarjeta de crédito? = 可以用信用卡支付吗？

🔹 小费：
• ¿Se deja propina en España? = 在西班牙要给小费吗？
• Quédese con el cambio = 零钱不用找了
• La propina no es obligatoria, pero se agradece = 小费不是强制性的，但会感谢

🔹 满意表达：
• La comida estaba excelente = 食物非常好
• Todo estuvo perfecto = 一切都完美
• Volveré / Volveremos = 我会再来的/我们会再来的
• Se lo recomendaré a mis amigos = 我会推荐给我的朋友

📌 文化提示：
在西班牙，给小费不是强制性的。在酒吧和咖啡馆，有时会留下小额零钱（一些硬币）。在餐厅，留下5-10%被认为是慷慨的。`,
        ejemplos: [
          {
            espanol: "Está delicioso, gracias.",
            chino: "很美味，谢谢。",
          },
          {
            espanol: "La cuenta, por favor.",
            chino: "请结账。",
          },
          {
            espanol: "¿Aceptan tarjeta?",
            chino: "可以刷卡吗？",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Problemas comunes en el restaurante",
        tituloChino: "餐厅里的常见问题",
        descripcion: `🔹 PROBLEMAS Y SOLUCIONES:

• La comida está fría = The food is cold
  → ¿Puede calentarlo, por favor? = Can you heat it up, please?

• Me han traído otro plato = They brought me the wrong dish
  → Perdón, yo pedí pollo, no pescado = Excuse me, I ordered chicken, not fish

• Falta un plato = A dish is missing
  → Todavía no ha llegado mi plato = My dish hasn't arrived yet

• La bebida no ha llegado = The drink hasn't arrived
  → ¿Me puede traer la bebida, por favor? = Can you bring me my drink, please?

• Hay algo en la comida = There's something in the food
  → Perdón, hay un pelo en la sopa = Excuse me, there's a hair in the soup

🔹 RECLAMACIONES (complaints):
• Quiero hablar con el jefe de sala = I want to speak with the head waiter
• No voy a pagar por este plato = I'm not paying for this dish
• ¿Me puede hacer un descuento? = Can you give me a discount?

📌 EJEMPLOS:
• La sopa está fría, ¿puede calentarla?
• Perdón, yo pedí carne, no pescado.
• Todavía no ha llegado mi segundo plato.`,
        descripcionChino: `🔹 问题和解决方案：

• 食物凉了：La comida está fría
  → ¿Puede calentarlo, por favor? = 请帮忙加热一下好吗？

• 上错了菜：Me han traído otro plato
  → Perdón, yo pedí pollo, no pescado = 抱歉，我点了鸡肉，不是鱼

• 少了一道菜：Falta un plato
  → Todavía no ha llegado mi plato = 我的菜还没上

• 饮料没上：La bebida no ha llegado
  → ¿Me puede traer la bebida, por favor? = 请把我的饮料拿来好吗？

• 食物里有东西：Hay algo en la comida
  → Perdón, hay un pelo en la sopa = 抱歉，汤里有根头发

🔹 投诉：
• Quiero hablar con el jefe de sala = 我想和餐厅主管谈谈
• No voy a pagar por este plato = 我不会为这道菜付款
• ¿Me puede hacer un descuento? = 能给我打折吗？

📌 例子：
• La sopa está fría, ¿puede calentarla? = 汤凉了，能加热一下吗？
• Perdón, yo pedí carne, no pescado. = 抱歉，我点了肉，不是鱼。
• Todavía no ha llegado mi segundo plato. = 我的主菜还没上。`,
        ejemplos: [
          {
            espanol: "La sopa está fría.",
            chino: "汤凉了。",
          },
          {
            espanol: "Me han traído el plato equivocado.",
            chino: "他们上错了菜。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "la carta",
        chino: "菜单",
        ejemplo: "¿Me trae la carta?",
      },
      {
        id: "v2",
        espanol: "la cuenta",
        chino: "账单",
        ejemplo: "La cuenta, por favor.",
      },
      {
        id: "v3",
        espanol: "la bebida",
        chino: "饮料",
        ejemplo: "¿Qué bebida quieres?",
      },
      {
        id: "v4",
        espanol: "el plato",
        chino: "菜肴",
        ejemplo: "El plato del día.",
      },
      {
        id: "v5",
        espanol: "el primer plato",
        chino: "第一道菜",
        ejemplo: "De primero, una sopa.",
      },
      {
        id: "v6",
        espanol: "el segundo plato",
        chino: "主菜",
        ejemplo: "De segundo, pollo.",
      },
      {
        id: "v7",
        espanol: "el postre",
        chino: "甜点",
        ejemplo: "De postre, flan.",
      },
      {
        id: "v8",
        espanol: "el menú del día",
        chino: "当日套餐",
        ejemplo: "Hoy hay menú del día.",
      },
      {
        id: "v9",
        espanol: "la especialidad de la casa",
        chino: "餐厅特色菜",
        ejemplo: "La paella es la especialidad.",
      },
      {
        id: "v10",
        espanol: "el camarero / la camarera",
        chino: "服务员",
        ejemplo: "Llama al camarero.",
      },
      {
        id: "v11",
        espanol: "la reserva",
        chino: "预订",
        ejemplo: "Tengo una reserva.",
      },
      {
        id: "v12",
        espanol: "la propina",
        chino: "小费",
        ejemplo: "Dejo propina.",
      },
      {
        id: "v13",
        espanol: "vegetariano / vegetariana",
        chino: "素食者",
        ejemplo: "Soy vegetariana.",
      },
      {
        id: "v14",
        espanol: "vegano / vegana",
        chino: "纯素食者",
        ejemplo: "Soy vegano.",
      },
      {
        id: "v15",
        espanol: "picante",
        chino: "辣的",
        ejemplo: "¿Este plato es picante?",
      },
      {
        id: "v16",
        espanol: "delicioso",
        chino: "美味的",
        ejemplo: "La comida está deliciosa.",
      },
      {
        id: "v17",
        espanol: "recomendar",
        chino: "推荐",
        ejemplo: "¿Qué me recomienda?",
      },
      {
        id: "v18",
        espanol: "probar",
        chino: "品尝",
        ejemplo: "Quiero probar la paella.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "En el restaurante - pidiendo comida",
        tituloChino: "在餐厅点餐",
        personajes: ["Cliente", "Camarero"],
        lineas: [
          {
            personaje: "Camarero",
            texto: "Buenas tardes. ¿Qué van a tomar?",
            traduccion: "下午好。你们要点什么？",
          },
          {
            personaje: "Cliente",
            texto: "Para empezar, una ensalada.",
            traduccion: "先来个沙拉。",
          },
          {
            personaje: "Camarero",
            texto: "¿Y de segundo?",
            traduccion: "主菜呢？",
          },
          {
            personaje: "Cliente",
            texto: "El pollo asado, por favor.",
            traduccion: "请给我烤鸡。",
          },
          {
            personaje: "Camarero",
            texto: "¿Y para beber?",
            traduccion: "喝什么呢？",
          },
          {
            personaje: "Cliente",
            texto: "Una botella de agua, por favor.",
            traduccion: "请给我一瓶水。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Pidiendo la cuenta",
        tituloChino: "结账",
        personajes: ["Cliente", "Camarero"],
        lineas: [
          {
            personaje: "Cliente",
            texto: "Perdone, ¿me puede traer la cuenta?",
            traduccion: "打扰一下，可以给我账单吗？",
          },
          {
            personaje: "Camarero",
            texto: "Enseguida. ¿Todo estuvo bien?",
            traduccion: "马上。一切都好吗？",
          },
          {
            personaje: "Cliente",
            texto: "Sí, estaba todo delicioso.",
            traduccion: "是的，都很美味。",
          },
          {
            personaje: "Camarero",
            texto: "Son treinta y cinco euros.",
            traduccion: "三十五欧元。",
          },
          {
            personaje: "Cliente",
            texto: "Tome. Quédese con el cambio.",
            traduccion: "拿着。零钱不用找了。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Cliente vegetariano",
        tituloChino: "素食者点餐",
        personajes: ["Ana", "Camarero"],
        lineas: [
          {
            personaje: "Ana",
            texto: "¿Qué platos vegetarianos tienen?",
            traduccion: "你们有什么素食菜？",
          },
          {
            personaje: "Camarero",
            texto: "Tenemos ensalada, verduras asadas y pasta.",
            traduccion: "我们有沙拉、烤蔬菜和意大利面。",
          },
          {
            personaje: "Ana",
            texto: "La pasta, ¿qué lleva?",
            traduccion: "意大利面有什么？",
          },
          {
            personaje: "Camarero",
            texto: "Lleva tomate, albahaca y queso.",
            traduccion: "有西红柿、罗勒和奶酪。",
          },
          {
            personaje: "Ana",
            texto: "Perfecto, la pasta para mí.",
            traduccion: "完美，给我意大利面。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Problema con la comida",
        tituloChino: "食物问题",
        personajes: ["Cliente", "Camarero"],
        lineas: [
          {
            personaje: "Cliente",
            texto: "Disculpe, la sopa está fría.",
            traduccion: "打扰一下，汤凉了。",
          },
          {
            personaje: "Camarero",
            texto: "Lo siento mucho. Se la cambio ahora mismo.",
            traduccion: "非常抱歉。我马上给您换。",
          },
          {
            personaje: "Cliente",
            texto: "Gracias. También el pollo está un poco seco.",
            traduccion: "谢谢。鸡肉也有点干。",
          },
          {
            personaje: "Camarero",
            texto: "Le traeré otro. Disculpe las molestias.",
            traduccion: "我给您换一份。抱歉给您带来不便。",
          },
          {
            personaje: "Cliente",
            texto: "No se preocupe. La comida está buena, solo estos detalles.",
            traduccion: "别担心。食物很好吃，只是这些小问题。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Reservando una mesa",
        tituloChino: "预订桌子",
        personajes: ["Cliente", "Recepcionista"],
        lineas: [
          {
            personaje: "Cliente",
            texto: "Buenos días. Quiero reservar una mesa para dos.",
            traduccion: "早上好。我想预订一张两人桌。",
          },
          {
            personaje: "Recepcionista",
            texto: "¿Para qué día y a qué hora?",
            traduccion: "哪一天，几点？",
          },
          {
            personaje: "Cliente",
            texto: "Para el sábado a las nueve de la noche.",
            traduccion: "星期六晚上九点。",
          },
          {
            personaje: "Recepcionista",
            texto: "Tenemos mesa en la terraza o dentro. ¿Qué prefiere?",
            traduccion: "我们有露台或室内的桌子。您喜欢哪个？",
          },
          {
            personaje: "Cliente",
            texto: "En la terraza, por favor.",
            traduccion: "请给我露台。",
          },
          {
            personaje: "Recepcionista",
            texto: "Perfecto. ¿A nombre de quién?",
            traduccion: "完美。以谁的名义？",
          },
          {
            personaje: "Cliente",
            texto: "A nombre de García.",
            traduccion: "以García的名义。",
          },
          {
            personaje: "Recepcionista",
            texto: "Muy bien. Tiene la reserva confirmada.",
            traduccion: "很好。您的预订已确认。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "为了要账单：La _____, por favor.",
          preguntaChino: "为了要账单：La _____, por favor.",
          respuestaCorrecta: "cuenta",
          explicacion: "La cuenta = 账单",
          pista: "首字母是 c，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c2",
          pregunta: "服务员是：_____",
          preguntaChino: "服务员是：_____",
          respuestaCorrecta: "camarero",
          explicacion: "Camarero = 服务员",
          pista: "首字母是 c，8个字母",
          numeroLetras: 8,
        },
        {
          id: "c3",
          pregunta: "为了问'您推荐什么？'：¿Qué me _____?",
          preguntaChino: "为了问'您推荐什么？'：¿Qué me _____?",
          respuestaCorrecta: "recomienda",
          explicacion: "Recomendar = 推荐",
          pista: "首字母是 r，10个字母",
          numeroLetras: 10,
        },
        {
          id: "c4",
          pregunta: "为了说'很好吃'：Está muy _____",
          preguntaChino: "为了说'很好吃'：Está muy _____",
          respuestaCorrecta: "bueno",
          explicacion: "Bueno = 好",
          pista: "首字母是 b，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c5",
          pregunta: "为了问'可以刷卡吗？'：¿Aceptan _____?",
          preguntaChino: "为了问'可以刷卡吗？'：¿Aceptan _____?",
          respuestaCorrecta: "tarjeta",
          explicacion: "Tarjeta = 卡",
          pista: "首字母是 t，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c6",
          pregunta: "餐厅的特色菜是：la _____ de la casa",
          preguntaChino: "餐厅的特色菜是：la _____ de la casa",
          respuestaCorrecta: "especialidad",
          explicacion: "Especialidad = 特色菜",
          pista: "首字母是 e，12个字母",
          numeroLetras: 12,
        },
        {
          id: "c7",
          pregunta: "小费是：la _____",
          preguntaChino: "小费是：la _____",
          respuestaCorrecta: "propina",
          explicacion: "Propina = 小费",
          pista: "首字母是 p，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c8",
          pregunta: "为了问'今天的特色菜是什么？'：¿Cuál es el _____ del día?",
          preguntaChino: "为了问'今天的特色菜是什么？'：¿Cuál es el _____ del día?",
          respuestaCorrecta: "plato",
          explicacion: "Plato del día = 当日特色菜",
          pista: "首字母是 p，5个字母",
          numeroLetras: 5,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "你在哪里看菜单？",
          preguntaChino: "你在哪里看菜单？",
          opciones: ["en la cuenta", "en la carta", "en la mesa", "en la propina"],
          respuestaCorrecta: "en la carta",
          explicacion: "La carta = 菜单",
        },
        {
          id: "s2",
          pregunta: "如何问'有两人桌吗？'",
          preguntaChino: "如何问'有两人桌吗？'",
          opciones: [
            "¿Tiene una mesa para dos?",
            "¿Tiene una silla?",
            "¿Dónde está la mesa?",
            "¿Cuánto cuesta?",
          ],
          respuestaCorrecta: "¿Tiene una mesa para dos?",
          explicacion: "Preguntar por mesa",
        },
        {
          id: "s3",
          pregunta: "吃完饭你付什么？",
          preguntaChino: "吃完饭你付什么？",
          opciones: ["la carta", "la propina", "la cuenta", "el plato"],
          respuestaCorrecta: "la cuenta",
          explicacion: "La cuenta = 账单",
        },
        {
          id: "s4",
          pregunta: "'Soy vegetariano'是什么意思？",
          preguntaChino: "'Soy vegetariano'是什么意思？",
          opciones: ["我是素食者", "我喜欢吃肉", "我是厨师", "我饿了"],
          respuestaCorrecta: "我是素食者",
          explicacion: "Vegetariano = 素食者",
        },
        {
          id: "s5",
          pregunta: "如何说'请给我菜单'？",
          preguntaChino: "如何说'请给我菜单'？",
          opciones: [
            "¿Me trae la cuenta?",
            "¿Me trae la carta?",
            "¿Me trae el plato?",
            "¿Me trae la bebida?",
          ],
          respuestaCorrecta: "¿Me trae la carta?",
          explicacion: "La carta = 菜单",
        },
        {
          id: "s6",
          pregunta: "¿Qué significa 'la especialidad de la casa'?",
          preguntaChino: "'la especialidad de la casa'是什么意思？",
          opciones: ["当日套餐", "餐厅特色菜", "家常菜", "素食菜"],
          respuestaCorrecta: "餐厅特色菜",
          explicacion: "Especialidad de la casa = 餐厅特色菜",
        },
        {
          id: "s7",
          pregunta: "¿Cómo se dice '小费' en español?",
          preguntaChino: "西班牙语中'小费'怎么说？",
          opciones: ["la cuenta", "la carta", "la propina", "el servicio"],
          respuestaCorrecta: "la propina",
          explicacion: "Propina = 小费",
        },
        {
          id: "s8",
          pregunta: "¿Qué significa 'Quédese con el cambio'?",
          preguntaChino: "'Quédese con el cambio'是什么意思？",
          opciones: ["请找零", "零钱不用找了", "请刷卡", "请开发票"],
          respuestaCorrecta: "零钱不用找了",
          explicacion: "Forma de dejar propina",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Delicioso'意思是'很美味'。",
          preguntaChino: "'Delicioso'意思是'很美味'。",
          respuestaCorrecta: true,
          explicacion: "对。Delicioso = 美味",
        },
        {
          id: "vf2",
          pregunta: "我们点餐前先要菜单。",
          preguntaChino: "我们点餐前先要菜单。",
          respuestaCorrecta: true,
          explicacion: "对。先看菜单再点餐",
        },
        {
          id: "vf3",
          pregunta: "小费在西班牙是必须的。",
          preguntaChino: "小费在西班牙是必须的。",
          respuestaCorrecta: false,
          explicacion: "错。在西班牙小费不是必须的",
        },
        {
          id: "vf4",
          pregunta: "'La cuenta'是'菜单'的意思。",
          preguntaChino: "'La cuenta'是'菜单'的意思。",
          respuestaCorrecta: false,
          explicacion: "错。La cuenta = 账单",
        },
        {
          id: "vf5",
          pregunta: "素食者不吃肉。",
          preguntaChino: "素食者不吃肉。",
          respuestaCorrecta: true,
          explicacion: "对。Vegetariano = 不吃肉",
        },
        {
          id: "vf6",
          pregunta: "El 'menú del día' tiene precio fijo.",
          preguntaChino: "'Menú del día'有固定价格。",
          respuestaCorrecta: true,
          explicacion: "对。Incluye varios platos por un precio fijo",
        },
        {
          id: "vf7",
          pregunta: "En España es obligatorio dejar propina del 10%.",
          preguntaChino: "在西班牙给10%的小费是必须的。",
          respuestaCorrecta: false,
          explicacion: "错。No es obligatorio",
        },
        {
          id: "vf8",
          pregunta: "'Picante' significa que la comida tiene especias que arden.",
          preguntaChino: "'Picante'意味着食物有辛辣的香料。",
          respuestaCorrecta: true,
          explicacion: "对。Picante = spicy",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "la carta",
              derecha: "菜单",
            },
            {
              izquierda: "la cuenta",
              derecha: "账单",
            },
            {
              izquierda: "el camarero",
              derecha: "服务员",
            },
            {
              izquierda: "el primer plato",
              derecha: "第一道菜",
            },
            {
              izquierda: "el segundo plato",
              derecha: "主菜",
            },
            {
              izquierda: "el postre",
              derecha: "甜点",
            },
            {
              izquierda: "la propina",
              derecha: "小费",
            },
            {
              izquierda: "la reserva",
              derecha: "预订",
            },
            {
              izquierda: "el menú del día",
              derecha: "当日套餐",
            },
            {
              izquierda: "la especialidad",
              derecha: "特色菜",
            },
          ],
          explicacion: "将餐厅词汇与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["mesa", "una", "dos", "para", "Tiene", "?"],
          respuestaCorrecta: "¿Tiene una mesa para dos?",
          explicacion: "正确的句子是：¿Tiene una mesa para dos?（有两人桌吗？）",
        },
        {
          id: "o2",
          palabras: ["cuenta", "la", "traer", "puede", "me", "¿", "?"],
          respuestaCorrecta: "¿Me puede traer la cuenta?",
          explicacion: "正确的句子是：¿Me puede traer la cuenta?（可以给我账单吗？）",
        },
        {
          id: "o3",
          palabras: ["vegetariano", "soy", "."],
          respuestaCorrecta: "Soy vegetariano.",
          explicacion: "正确的句子是：Soy vegetariano.（我是素食者。）",
        },
        {
          id: "o4",
          palabras: ["recomienda", "me", "qué", "¿", "?"],
          respuestaCorrecta: "¿Qué me recomienda?",
          explicacion: "正确的顺序是：¿Qué me recomienda?",
        },
        {
          id: "o5",
          palabras: ["cuenta", "la", "trae", "Me", "puede", "?"],
          respuestaCorrecta: "¿Me puede traer la cuenta?",
          explicacion: "正确的顺序是：¿Me puede traer la cuenta?",
        },
        {
          id: "o6",
          palabras: ["es", "deliciosa", "La", "comida", "."],
          respuestaCorrecta: "La comida es deliciosa.",
          explicacion: "正确的顺序是：La comida es deliciosa.",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "请给我一张两人桌。",
          respuestaEsperada: "Una mesa para dos, por favor.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "这道菜辣吗？",
          respuestaEsperada: "¿Es picante?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "可以刷卡吗？",
          respuestaEsperada: "¿Aceptan tarjeta?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "食物非常好吃。",
          respuestaEsperada: "La comida estaba deliciosa.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "今天的特色菜是什么？",
          respuestaEsperada: "¿Cuál es el plato del día?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "我是素食者，有不含肉的菜吗？",
          respuestaEsperada: "Soy vegetariano, ¿tiene algún plato sin carne?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "零钱不用找了。",
          respuestaEsperada: "Quédese con el cambio.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "您推荐什么菜？",
          respuestaEsperada: "¿Qué plato me recomienda?",
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
        instruccion: "用正确的餐厅词汇完成对话。",
        instruccionChino: "用正确的餐厅词汇完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿Tiene una _____ para dos?",
            respuesta: "mesa",
          },
          {
            personaje: "B",
            texto: "Sí, por aquí. ¿Qué desea _____?",
            respuesta: "pedir",
          },
          {
            personaje: "A",
            texto: "¿Me trae la _____, por favor?",
            respuesta: "carta",
          },
          {
            personaje: "B",
            texto: "Claro. ¿Para beber?",
            respuesta: "",
          },
          {
            personaje: "A",
            texto: "Una botella de _____, por favor.",
            respuesta: "agua",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "responder",
        titulo: "Responde las preguntas",
        tituloChino: "回答问题",
        instruccion: "Responde las siguientes preguntas sobre restaurantes en español.",
        instruccionChino: "用西班牙语回答以下关于餐厅的问题。",
        preguntas: [
          {
            pregunta: "¿Qué sueles pedir en un restaurante?",
            respuestaEsperada: "Suelo pedir (pollo / pescado / pasta).",
          },
          {
            pregunta: "¿Dejas propina normalmente?",
            respuestaEsperada: "Sí, dejo propina / No, no dejo propina.",
          },
          {
            pregunta: "¿Prefieres comer en restaurantes o en casa?",
            respuestaEsperada: "Prefiero comer en casa porque es más barato.",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "crearMenu",
        titulo: "Crea tu menú del día",
        tituloChino: "创建你的当日套餐",
        instruccion:
          "Escribe un menú del día completo en español (primer plato, segundo plato, postre y bebida).",
        instruccionChino: "用西班牙语写一个完整的当日套餐（前菜、主菜、甜点和饮料）。",
        ejemplo:
          "De primero: ensalada mixta. De segundo: pollo asado con patatas. De postre: flan casero. Para beber: agua o vino incluido. Precio: 12 euros.",
      },
      {
        id: "ep4",
        tipo: "dialogo",
        titulo: "Escribe un diálogo en el restaurante",
        tituloChino: "写一个餐厅对话",
        instruccion: "Escribe un breve diálogo entre un cliente y un camarero (8-10 líneas).",
        instruccionChino: "写一个客户和服务员之间的简短对话（8-10行）。",
        ejemplo:
          "Camarero: Buenas noches, ¿qué van a tomar? Cliente: ¿Qué me recomienda? Camarero: El pescado del día está muy bueno. Cliente: Perfecto, de primero una sopa y de segundo pescado. Camarero: ¿Algo para beber? Cliente: Una copa de vino blanco...",
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Cuál es tu plato favorito para pedir en un restaurante?",
        preguntaChino: "你在餐厅最喜欢点什么菜？",
        sugerencia: "Mi plato favorito es...",
        sugerenciaChino: "Mi plato favorito es...",
      },
      {
        id: "pa2",
        pregunta: "Describe una experiencia en un restaurante.",
        preguntaChino: "描述一次在餐厅的经历。",
        sugerencia: "Una vez fui a un restaurante español y pedí paella...",
        sugerenciaChino: "Una vez fui a un restaurante español y pedí paella...",
      },
      {
        id: "pa3",
        pregunta: "¿Qué preguntas haces antes de pedir la comida?",
        preguntaChino: "点餐前你会问什么问题？",
        sugerencia: "Pregunto qué me recomienda y qué lleva el plato.",
        sugerenciaChino: "Pregunto qué me recomienda y qué lleva el plato.",
      },
      {
        id: "pa4",
        pregunta: "¿Qué haces si la comida no está buena?",
        preguntaChino: "如果食物不好吃你会怎么做？",
        sugerencia: "Lo comento al camarero y pido que me lo cambien.",
        sugerenciaChino: "Lo comento al camarero y pido que me lo cambien.",
      },
      {
        id: "pa5",
        pregunta: "¿Prefieres comer en un restaurante elegante o en una terraza informal?",
        preguntaChino: "你更喜欢在优雅的餐厅还是非正式的露台吃饭？",
        sugerencia: "Prefiero la terraza porque es más relajado.",
        sugerenciaChino: "Prefiero la terraza porque es más relajado.",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '菜单' en español?",
        preguntaChino: "西班牙语中'菜单'怎么说？",
        respuestaSugerida: "la carta",
        respuestaSugeridaChino: "la carta",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '账单' en español?",
        preguntaChino: "西班牙语中'账单'怎么说？",
        respuestaSugerida: "la cuenta",
        respuestaSugeridaChino: "la cuenta",
      },
      {
        id: "p3",
        pregunta: "¿Qué significa '¿Aceptan tarjeta?'?",
        preguntaChino: "'¿Aceptan tarjeta?'是什么意思？",
        respuestaSugerida: "可以刷卡吗？",
        respuestaSugeridaChino: "Do you accept card?",
      },
      {
        id: "p4",
        pregunta: "¿Cómo preguntas por una mesa para dos personas?",
        preguntaChino: "如何询问两人桌？",
        respuestaSugerida: "¿Tiene una mesa para dos?",
        respuestaSugeridaChino: "¿Tiene una mesa para dos?",
      },
      {
        id: "p5",
        pregunta: "¿Qué significa 'Quédese con el cambio'?",
        preguntaChino: "'Quédese con el cambio'是什么意思？",
        respuestaSugerida: "零钱不用找了（小费）",
        respuestaSugeridaChino: "Keep the change (tip)",
      },
      {
        id: "p6",
        pregunta: "¿Cómo se dice '特色菜' en español?",
        preguntaChino: "西班牙语中'特色菜'怎么说？",
        respuestaSugerida: "la especialidad",
        respuestaSugeridaChino: "la especialidad",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "¿Qué son los verbos?",
        tituloChino: "什么是动词？",
        descripcion: `Los verbos son palabras que expresan acciones, estados o procesos.

🔹 EJEMPLOS DE VERBOS EN ESPAÑOL:
• comer = to eat
• beber = to drink
• vivir = to live
• hablar = to speak
• estudiar = to study
• trabajar = to work
• correr = to run
• dormir = to sleep

🔹 PARTES DEL VERBO (parts of the verb):
Todo verbo en español tiene:

1. RAÍZ (root) = la parte que no cambia (o cambia poco)
2. TERMINACIÓN (ending) = la parte que cambia según la persona

Ejemplo con HABLAR:
• Raíz: HABL-
• Terminación: -AR

🔹 LOS TRES TIPOS DE VERBOS EN ESPAÑOL:
• Verbos terminados en -AR (hablar, cantar, bailar)
• Verbos terminados en -ER (comer, beber, correr)
• Verbos terminados en -IR (vivir, escribir, partir)

📌 IMPORTANTE:
En español, los verbos cambian su terminación según la persona que realiza la acción (yo, tú, él, etc.). Esto se llama CONJUGACIÓN.`,
        descripcionChino: `动词是表达动作、状态或过程的词。

🔹 西班牙语动词的例子：
• comer = 吃
• beber = 喝
• vivir = 住/生活
• hablar = 说
• estudiar = 学习
• trabajar = 工作
• correr = 跑
• dormir = 睡

🔹 动词的组成部分：
每个西班牙语动词都有：

1. 词根 = 不变（或少变）的部分
2. 词尾 = 根据人称变化的部分

以HABLAR为例：
• 词根：HABL-
• 词尾：-AR

🔹 西班牙语动词的三种类型：
• 以 -AR 结尾的动词（hablar, cantar, bailar）
• 以 -ER 结尾的动词（comer, beber, correr）
• 以 -IR 结尾的动词（vivir, escribir, partir）

📌 重要提示：
在西班牙语中，动词根据执行动作的人称（我、你、他等）变化词尾。这叫做变位。`,
        ejemplos: [
          {
            espanol: "Comer es una acción.",
            chino: "吃是一个动作。",
          },
          {
            espanol: "Vivir es un estado.",
            chino: "生活是一种状态。",
          },
          {
            espanol: "Los verbos en -AR son los más comunes.",
            chino: "以-AR结尾的动词最常见。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Las personas gramaticales",
        tituloChino: "语法人称",
        descripcion: `En español hay seis personas gramaticales:

🔹 SINGULAR:
1. YO = I
2. TÚ = you (informal, singular)
3. ÉL / ELLA / USTED = he / she / you (formal, singular)

🔹 PLURAL:
4. NOSOTROS / NOSOTRAS = we (masculine/feminine)
5. VOSOTROS / VOSOTRAS = you all (informal, plural - Spain only)
6. ELLOS / ELLAS / USTEDES = they (masculine/feminine) / you all (formal - Latin America)

🔹 LOS PRONOMBRES SUJETO (subject pronouns):
• yo = I
• tú = you (informal)
• él = he
• ella = she
• usted = you (formal)
• nosotros / nosotras = we
• vosotros / vosotras = you all (Spain)
• ellos / ellas = they
• ustedes = you all (formal / Latin America)

📌 NOTA IMPORTANTE:
En español, no siempre es necesario usar el pronombre sujeto porque la conjugación del verbo ya indica la persona.
Ejemplo: "Hablo español" (yo) es suficiente, no hace falta decir "Yo hablo español".

❌ ERROR COMÚN:
Usar el pronombre sujeto todo el tiempo suena poco natural. Los nativos lo omiten a menos que quieran enfatizar.`,
        descripcionChino: `西班牙语有六个人称：

🔹 单数：
1. YO = 我
2. TÚ = 你（非正式，单数）
3. ÉL / ELLA / USTED = 他/她/您（正式，单数）

🔹 复数：
4. NOSOTROS / NOSOTRAS = 我们（阳性/阴性）
5. VOSOTROS / VOSOTRAS = 你们（非正式，复数 - 仅西班牙）
6. ELLOS / ELLAS / USTEDES = 他们/她们/您们（正式 - 拉丁美洲）

🔹 主语代词：
• yo = 我
• tú = 你（非正式）
• él = 他
• ella = 她
• usted = 您（正式）
• nosotros / nosotras = 我们
• vosotros / vosotras = 你们（西班牙）
• ellos / ellas = 他们/她们
• ustedes = 您们（正式/拉丁美洲）

📌 重要提示：
在西班牙语中，并不总是需要使用主语代词，因为动词的变位已经表明人称。
例子："Hablo español"（我说西班牙语）已经足够，不需要说"Yo hablo español"。

❌ 常见错误：
一直使用主语代词听起来不自然。母语者会省略它们，除非想要强调。`,
        ejemplos: [
          {
            espanol: "Yo hablo español.",
            chino: "我说西班牙语。",
          },
          {
            espanol: "Tú comes paella.",
            chino: "你吃海鲜饭。",
          },
          {
            espanol: "Él vive en Madrid.",
            chino: "他住在马德里。",
          },
          {
            espanol: "Nosotros estudiamos.",
            chino: "我们学习。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "La conjugación de verbos regulares en presente",
        tituloChino: "规则动词的现在时变位",
        descripcion: `Para conjugar un verbo regular en presente:

1. Quita la terminación -AR, -ER o -IR
2. Añade la terminación correspondiente

🔹 VERBOS EN -AR (ejemplo: HABLAR = to speak):

• yo habl- **O**
• tú habl- **AS**
• él/ella/usted habl- **A**
• nosotros habl- **AMOS**
• vosotros habl- **ÁIS**
• ellos/ellas/ustedes habl- **AN**

🔹 VERBOS EN -ER (ejemplo: COMER = to eat):

• yo com- **O**
• tú com- **ES**
• él/ella/usted com- **E**
• nosotros com- **EMOS**
• vosotros com- **ÉIS**
• ellos/ellas/ustedes com- **EN**

🔹 VERBOS EN -IR (ejemplo: VIVIR = to live):

• yo viv- **O**
• tú viv- **ES**
• él/ella/usted viv- **E**
• nosotros viv- **IMOS**
• vosotros viv- **ÍS**
• ellos/ellas/ustedes viv- **EN**

📌 TABLA RESUMEN DE TERMINACIONES:

| Persona | -AR | -ER | -IR |
|---------|-----|-----|-----|
| yo | -o | -o | -o |
| tú | -as | -es | -es |
| él/ella/usted | -a | -e | -e |
| nosotros | -amos | -emos | -imos |
| vosotros | -áis | -éis | -ís |
| ellos/ellas/ustedes | -an | -en | -en |

📌 EJEMPLOS:
• Yo hablo español.
• Tú comes paella.
• Ella vive en Madrid.`,
        descripcionChino: `要变位规则动词的现在时：

1. 去掉词尾 -AR、-ER 或 -IR
2. 加上相应的结尾

🔹 -AR动词（例子：HABLAR = 说）：

• yo habl- **O**
• tú habl- **AS**
• él/ella/usted habl- **A**
• nosotros habl- **AMOS**
• vosotros habl- **ÁIS**
• ellos/ellas/ustedes habl- **AN**

🔹 -ER动词（例子：COMER = 吃）：

• yo com- **O**
• tú com- **ES**
• él/ella/usted com- **E**
• nosotros com- **EMOS**
• vosotros com- **ÉIS**
• ellos/ellas/ustedes com- **EN**

🔹 -IR动词（例子：VIVIR = 住）：

• yo viv- **O**
• tú viv- **ES**
• él/ella/usted viv- **E**
• nosotros viv- **IMOS**
• vosotros viv- **ÍS**
• ellos/ellas/ustedes viv- **EN**

📌 词尾总结表：

| 人称 | -AR | -ER | -IR |
|------|-----|-----|-----|
| yo | -o | -o | -o |
| tú | -as | -es | -es |
| él/ella/usted | -a | -e | -e |
| nosotros | -amos | -emos | -imos |
| vosotros | -áis | -éis | -ís |
| ellos/ellas/ustedes | -an | -en | -en |

📌 例子：
• Yo hablo español. = 我说西班牙语。
• Tú comes paella. = 你吃海鲜饭。
• Ella vive en Madrid. = 她住在马德里。`,
        ejemplos: [
          {
            espanol: "Yo hablo español.",
            chino: "我说西班牙语。",
          },
          {
            espanol: "Tú estudias mucho.",
            chino: "你学习很努力。",
          },
          {
            espanol: "Nosotros vivimos en Madrid.",
            chino: "我们住在马德里。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Verbos importantes: Ser, Estar, Tener, Haber",
        tituloChino: "重要动词：Ser, Estar, Tener, Haber",
        descripcion: `🔹 SER (to be - esencial/permanente):
• yo SOY
• tú ERES
• él/ella/usted ES
• nosotros SOMOS
• vosotros SOIS
• ellos/ellas/ustedes SON

Usos: identidad, origen, profesión, características, hora, fecha, material.

🔹 ESTAR (to be - estado/temporal):
• yo ESTOY
• tú ESTÁS
• él/ella/usted ESTÁ
• nosotros ESTAMOS
• vosotros ESTÁIS
• ellos/ellas/ustedes ESTÁN

Usos: ubicación, emociones, estados temporales, acciones en progreso.

🔹 TENER (to have):
• yo TENGO
• tú TIENES
• él/ella/usted TIENE
• nosotros TENEMOS
• vosotros TENÉIS
• ellos/ellas/ustedes TIENEN

Usos: posesión, edad, expresiones (hambre, sed, sueño, calor, frío, prisa).

🔹 HABER (to have - auxiliar):
• yo HE
• tú HAS
• él/ella/usted HA
• nosotros HEMOS
• vosotros HABÉIS
• ellos/ellas/ustedes HAN

Usos: tiempos compuestos (pretérito perfecto), existencia impersonal (hay).

📌 EJEMPLOS COMPARATIVOS:
• Soy médico (profesión - SER)
• Estoy en el hospital (ubicación - ESTAR)
• Tengo hambre (expresión - TENER)
• He comido (pretérito perfecto - HABER)`,
        descripcionChino: `🔹 SER（是 - 本质/永久）：
• yo SOY
• tú ERES
• él/ella/usted ES
• nosotros SOMOS
• vosotros SOIS
• ellos/ellas/ustedes SON

用法：身份、来源、职业、特征、时间、日期、材料。

🔹 ESTAR（在/是 - 状态/临时）：
• yo ESTOY
• tú ESTÁS
• él/ella/usted ESTÁ
• nosotros ESTAMOS
• vosotros ESTÁIS
• ellos/ellas/ustedes ESTÁN

用法：位置、情绪、临时状态、正在进行的动作。

🔹 TENER（有）：
• yo TENGO
• tú TIENES
• él/ella/usted TIENE
• nosotros TENEMOS
• vosotros TENÉIS
• ellos/ellas/ustedes TIENEN

用法：拥有、年龄、表达（饿、渴、困、热、冷、赶时间）。

🔹 HABER（有 - 助动词）：
• yo HE
• tú HAS
• él/ella/usted HA
• nosotros HEMOS
• vosotros HABÉIS
• ellos/ellas/ustedes HAN

用法：复合时态（现在完成时），无人称存在（hay）。

📌 对比例子：
• Soy médico = 我是医生（职业 - SER）
• Estoy en el hospital = 我在医院（位置 - ESTAR）
• Tengo hambre = 我饿了（表达 - TENER）
• He comido = 我吃了（现在完成时 - HABER）`,
        ejemplos: [
          {
            espanol: "Soy estudiante.",
            chino: "我是学生。",
          },
          {
            espanol: "Estoy cansado.",
            chino: "我累了。",
          },
          {
            espanol: "Tengo veinte años.",
            chino: "我二十岁。",
          },
          {
            espanol: "He terminado.",
            chino: "我完成了。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "verbo",
        chino: "动词",
        ejemplo: "El verbo 'hablar'.",
      },
      {
        id: "v2",
        espanol: "conjugar",
        chino: "变位",
        ejemplo: "Conjugar verbos.",
      },
      {
        id: "v3",
        espanol: "raíz",
        chino: "词根",
        ejemplo: "La raíz de 'hablar' es 'habl-'.",
      },
      {
        id: "v4",
        espanol: "terminación",
        chino: "词尾",
        ejemplo: "La terminación de 'hablar' es '-ar'.",
      },
      {
        id: "v5",
        espanol: "persona",
        chino: "人称",
        ejemplo: "Primera persona: yo.",
      },
      {
        id: "v6",
        espanol: "singular",
        chino: "单数",
        ejemplo: "Yo, tú, él, ella, usted.",
      },
      {
        id: "v7",
        espanol: "plural",
        chino: "复数",
        ejemplo: "Nosotros, vosotros, ellos, ustedes.",
      },
      {
        id: "v8",
        espanol: "hablar",
        chino: "说",
        ejemplo: "Hablo español.",
      },
      {
        id: "v9",
        espanol: "comer",
        chino: "吃",
        ejemplo: "Como paella.",
      },
      {
        id: "v10",
        espanol: "vivir",
        chino: "住",
        ejemplo: "Vivo en Madrid.",
      },
      {
        id: "v11",
        espanol: "ser",
        chino: "是(本质)",
        ejemplo: "Soy médico.",
      },
      {
        id: "v12",
        espanol: "estar",
        chino: "在/是(状态)",
        ejemplo: "Estoy en casa.",
      },
      {
        id: "v13",
        espanol: "tener",
        chino: "有",
        ejemplo: "Tengo un perro.",
      },
      {
        id: "v14",
        espanol: "haber",
        chino: "有(助动词)",
        ejemplo: "He comido.",
      },
      {
        id: "v15",
        espanol: "pronombre",
        chino: "代词",
        ejemplo: "Yo, tú, él.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Aprendiendo verbos en clase",
        tituloChino: "在课堂上学习动词",
        personajes: ["Profesor", "Estudiante"],
        lineas: [
          {
            personaje: "Profesor",
            texto: "Hoy vamos a aprender los verbos en español.",
            traduccion: "今天我们要学习西班牙语动词。",
          },
          {
            personaje: "Estudiante",
            texto: "¿Cuántos tipos de verbos hay?",
            traduccion: "有几种类型的动词？",
          },
          {
            personaje: "Profesor",
            texto: "Hay tres tipos: verbos en -AR, -ER y -IR.",
            traduccion: "有三种：以-AR、-ER和-IR结尾的动词。",
          },
          {
            personaje: "Estudiante",
            texto: "¿Cómo sé a qué tipo pertenece un verbo?",
            traduccion: "我怎么知道一个动词属于哪种类型？",
          },
          {
            personaje: "Profesor",
            texto: "Por su terminación en infinitivo. Por ejemplo, 'hablar' termina en -AR.",
            traduccion: "通过它的原形词尾。例如，'hablar'以-AR结尾。",
          },
          {
            personaje: "Estudiante",
            texto: "Entonces, ¿'comer' es -ER y 'vivir' es -IR?",
            traduccion: "那么，'comer'是-ER，'vivir'是-IR？",
          },
          {
            personaje: "Profesor",
            texto: "¡Exacto! Muy bien.",
            traduccion: "完全正确！很好。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Conjugando verbos",
        tituloChino: "变位动词",
        personajes: ["Ana", "Carlos"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Carlos, ¿puedes conjugar el verbo 'hablar'?",
            traduccion: "卡洛斯，你能变位动词'hablar'吗？",
          },
          {
            personaje: "Carlos",
            texto: "Sí: yo hablo, tú hablas, él habla...",
            traduccion: "是的：我说话，你说话，他说话...",
          },
          {
            personaje: "Ana",
            texto: "¿Y el verbo 'comer'?",
            traduccion: "动词'comer'呢？",
          },
          {
            personaje: "Carlos",
            texto: "Yo como, tú comes, él come, nosotros comemos...",
            traduccion: "我吃，你吃，他吃，我们吃...",
          },
          {
            personaje: "Ana",
            texto: "¿Y 'vivir'?",
            traduccion: "'vivir'呢？",
          },
          {
            personaje: "Carlos",
            texto: "Yo vivo, tú vives, él vive, nosotros vivimos...",
            traduccion: "我住，你住，他住，我们住...",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Usando Ser y Estar",
        tituloChino: "使用Ser和Estar",
        personajes: ["María", "Pedro"],
        lineas: [
          {
            personaje: "María",
            texto: "Pedro, ¿cuándo usamos 'ser' y cuándo 'estar'?",
            traduccion: "佩德罗，我们什么时候用'ser'，什么时候用'estar'？",
          },
          {
            personaje: "Pedro",
            texto: "'Ser' es para características permanentes. 'Estar' es para estados temporales.",
            traduccion: "'Ser'用于永久特征。'Estar'用于临时状态。",
          },
          {
            personaje: "María",
            texto: "Por ejemplo, 'yo soy alto' (permanente) y 'yo estoy cansado' (temporal).",
            traduccion: "例如，'我高'（永久的）和'我累了'（临时的）。",
          },
          {
            personaje: "Pedro",
            texto: "¡Exacto! También 'estar' se usa para ubicación: 'estoy en casa'.",
            traduccion: "完全正确！'Estar'也用于位置：'我在家'。",
          },
          {
            personaje: "María",
            texto: "Y 'ser' para la hora: 'son las tres'.",
            traduccion: "'Ser'用于时间：'三点'。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Expresiones con Tener",
        tituloChino: "Tener的表达",
        personajes: ["Laura", "David"],
        lineas: [
          {
            personaje: "Laura",
            texto: "David, ¿cómo se dice 'tengo hambre' en español?",
            traduccion: "大卫，西班牙语里'tengo hambre'是什么意思？",
          },
          {
            personaje: "David",
            texto: "Significa 'I'm hungry'. Es una expresión con el verbo 'tener'.",
            traduccion: "意思是'我饿了'。这是用动词'tener'的一个表达。",
          },
          {
            personaje: "Laura",
            texto: "¿Qué otras expresiones hay con 'tener'?",
            traduccion: "还有哪些用'tener'的表达？",
          },
          {
            personaje: "David",
            texto: "Tener sed, tener sueño, tener calor, tener frío, tener prisa, tener cuidado...",
            traduccion: "渴、困、热、冷、赶时间、小心...",
          },
          {
            personaje: "Laura",
            texto: "Entonces, 'tener' no solo significa poseer.",
            traduccion: "那么，'tener'不仅仅表示拥有。",
          },
          {
            personaje: "David",
            texto: "Exacto. Es un verbo muy importante.",
            traduccion: "没错。这是一个非常重要的动词。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "El verbo Haber",
        tituloChino: "动词Haber",
        personajes: ["Sofía", "Javier"],
        lineas: [
          {
            personaje: "Sofía",
            texto: "Javier, ¿qué es el verbo 'haber'?",
            traduccion: "哈维尔，动词'haber'是什么？",
          },
          {
            personaje: "Javier",
            texto: "'Haber' se usa como auxiliar para formar tiempos compuestos.",
            traduccion: "'Haber'用作助动词构成复合时态。",
          },
          {
            personaje: "Sofía",
            texto: "¿Como en 'he comido' o 'has vivido'?",
            traduccion: "就像'he comido'或'has vivido'？",
          },
          {
            personaje: "Javier",
            texto: "Exacto. También se usa en forma impersonal: 'hay' (there is / there are).",
            traduccion: "没错。它也用于无人称形式：'hay'（有）。",
          },
          {
            personaje: "Sofía",
            texto: "Entonces, 'hay un libro' significa 'there is a book'.",
            traduccion: "那么，'hay un libro'意思是'有一本书'。",
          },
          {
            personaje: "Javier",
            texto: "Perfecto. Ya lo has entendido.",
            traduccion: "完美。你已经理解了。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "动词'hablar'的词根是：_____",
          preguntaChino: "动词'hablar'的词根是：_____",
          respuestaCorrecta: "habl",
          explicacion: "Hablar → raíz habl-",
          pista: "首字母是 h，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c2",
          pregunta: "动词'comer'属于第_____种变位类型？",
          preguntaChino: "动词'comer'属于第_____种变位类型？",
          respuestaCorrecta: "ER",
          explicacion: "Comer termina en -ER",
          pista: "首字母是 E，2个字母",
          numeroLetras: 2,
        },
        {
          id: "c3",
          pregunta: "为了说'我们吃'：Nosotros _____",
          preguntaChino: "为了说'我们吃'：Nosotros _____",
          respuestaCorrecta: "comemos",
          explicacion: "Comer, nosotros → comemos",
          pista: "Termina en -emos",
          numeroLetras: 7,
        },
        {
          id: "c4",
          pregunta: "为了说'他们住'：Ellos _____",
          preguntaChino: "为了说'他们住'：Ellos _____",
          respuestaCorrecta: "viven",
          explicacion: "Vivir, ellos → viven",
          pista: "Termina en -en",
          numeroLetras: 5,
        },
        {
          id: "c5",
          pregunta: "为了说'我是学生'：Yo _____ estudiante",
          preguntaChino: "为了说'我是学生'：Yo _____ estudiante",
          respuestaCorrecta: "soy",
          explicacion: "Ser, yo → soy",
          pista: "Termina en -oy",
          numeroLetras: 3,
        },
        {
          id: "c6",
          pregunta: "为了说'我在家'：Yo _____ en casa",
          preguntaChino: "为了说'我在家'：Yo _____ en casa",
          respuestaCorrecta: "estoy",
          explicacion: "Estar, yo → estoy",
          pista: "Termina en -oy",
          numeroLetras: 5,
        },
        {
          id: "c7",
          pregunta: "为了说'我有一本书'：Yo _____ un libro",
          preguntaChino: "为了说'我有一本书'：Yo _____ un libro",
          respuestaCorrecta: "tengo",
          explicacion: "Tener, yo → tengo",
          pista: "Termina en -go",
          numeroLetras: 5,
        },
        {
          id: "c8",
          pregunta: "为了说'我已经吃了'：Yo _____ comido",
          preguntaChino: "为了说'我已经吃了'：Yo _____ comido",
          respuestaCorrecta: "he",
          explicacion: "Haber, yo → he",
          pista: "Termina en -e",
          numeroLetras: 2,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "¿Cuál es la terminación de los verbos en español?",
          preguntaChino: "西班牙语动词的词尾是什么？",
          opciones: ["-AR, -ER, -IR", "-AR, -OR, -UR", "-AN, -EN, -IN", "-AS, -ES, -IS"],
          respuestaCorrecta: "-AR, -ER, -IR",
          explicacion: "Los verbos en infinitivo terminan en -AR, -ER o -IR",
        },
        {
          id: "s2",
          pregunta: "¿Cuál es la forma correcta de 'hablar' para 'tú'?",
          preguntaChino: "'hablar'的'tú'正确形式是什么？",
          opciones: ["hablo", "hablas", "habla", "hablamos"],
          respuestaCorrecta: "hablas",
          explicacion: "Hablar, tú → hablas",
        },
        {
          id: "s3",
          pregunta: "¿Qué verbo se usa para la ubicación?",
          preguntaChino: "哪个动词用于位置？",
          opciones: ["ser", "estar", "tener", "haber"],
          respuestaCorrecta: "estar",
          explicacion: "Estar se usa para ubicación",
        },
        {
          id: "s4",
          pregunta: "¿Cómo se dice 'tengo veinte años'?",
          preguntaChino: "'tengo veinte años'是什么意思？",
          opciones: ["我二十岁了", "我有二十年", "我二十岁", "我二十年"],
          respuestaCorrecta: "我二十岁",
          explicacion: "Expresar edad con tener",
        },
        {
          id: "s5",
          pregunta: "¿Qué verbo se usa como auxiliar?",
          preguntaChino: "哪个动词用作助动词？",
          opciones: ["ser", "estar", "tener", "haber"],
          respuestaCorrecta: "haber",
          explicacion: "Haber es el verbo auxiliar",
        },
        {
          id: "s6",
          pregunta: "¿Cuál es la forma de 'ser' para 'nosotros'?",
          preguntaChino: "'ser'的'nosotros'形式是什么？",
          opciones: ["soy", "eres", "es", "somos"],
          respuestaCorrecta: "somos",
          explicacion: "Ser, nosotros → somos",
        },
        {
          id: "s7",
          pregunta: "¿Qué significa 'hay'?",
          preguntaChino: "'hay'是什么意思？",
          opciones: ["有", "是", "在", "做"],
          respuestaCorrecta: "有",
          explicacion: "Hay = there is / there are",
        },
        {
          id: "s8",
          pregunta: "¿Cuál es la terminación para 'ellos' en verbos -ER?",
          preguntaChino: "对于-ER动词，'ellos'用什么结尾？",
          opciones: ["-o", "-es", "-e", "-en"],
          respuestaCorrecta: "-en",
          explicacion: "Ellos comen, beben, corren",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "Los verbos en español tienen tres conjugaciones.",
          preguntaChino: "西班牙语动词有三种变位。",
          respuestaCorrecta: true,
          explicacion: "对。Verbos en -AR, -ER, -IR",
        },
        {
          id: "vf2",
          pregunta: "El pronombre sujeto siempre es obligatorio.",
          preguntaChino: "主语代词总是必须的。",
          respuestaCorrecta: false,
          explicacion: "错。En español se puede omitir",
        },
        {
          id: "vf3",
          pregunta: "'Ser' se usa para características permanentes.",
          preguntaChino: "'Ser'用于永久特征。",
          respuestaCorrecta: true,
          explicacion: "对。Ej: Soy alto",
        },
        {
          id: "vf4",
          pregunta: "'Estar' se usa para la profesión.",
          preguntaChino: "'Estar'用于职业。",
          respuestaCorrecta: false,
          explicacion: "错。Ser + profesión",
        },
        {
          id: "vf5",
          pregunta: "'Tener' se usa para expresar edad.",
          preguntaChino: "'Tener'用于表达年龄。",
          respuestaCorrecta: true,
          explicacion: "对。Tengo veinte años",
        },
        {
          id: "vf6",
          pregunta: "'Haber' se usa solo como auxiliar.",
          preguntaChino: "'Haber'只用作助动词。",
          respuestaCorrecta: false,
          explicacion: "错。También impersonal: hay",
        },
        {
          id: "vf7",
          pregunta: "La raíz del verbo es la parte que cambia.",
          preguntaChino: "动词的词根是会变化的部分。",
          respuestaCorrecta: false,
          explicacion: "错。La raíz es la parte que no cambia",
        },
        {
          id: "vf8",
          pregunta: "'Vosotros' se usa en España pero no en Latinoamérica.",
          preguntaChino: "'Vosotros'在西班牙使用，但在拉丁美洲不用。",
          respuestaCorrecta: true,
          explicacion: "对。En Latinoamérica se usa 'ustedes'",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "hablar",
              derecha: "说",
            },
            {
              izquierda: "comer",
              derecha: "吃",
            },
            {
              izquierda: "vivir",
              derecha: "住",
            },
            {
              izquierda: "ser",
              derecha: "是(本质)",
            },
            {
              izquierda: "estar",
              derecha: "在/是(状态)",
            },
            {
              izquierda: "tener",
              derecha: "有",
            },
            {
              izquierda: "haber",
              derecha: "有(助动词)",
            },
            {
              izquierda: "yo",
              derecha: "我",
            },
            {
              izquierda: "tú",
              derecha: "你",
            },
            {
              izquierda: "nosotros",
              derecha: "我们",
            },
            {
              izquierda: "ellos",
              derecha: "他们",
            },
          ],
          explicacion: "将动词和代词与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["español", "hablo", "Yo", "."],
          respuestaCorrecta: "Yo hablo español.",
          explicacion: "正确的句子是：Yo hablo español.",
        },
        {
          id: "o2",
          palabras: ["Madrid", "en", "Vivo", "."],
          respuestaCorrecta: "Vivo en Madrid.",
          explicacion: "正确的句子是：Vivo en Madrid.",
        },
        {
          id: "o3",
          palabras: ["hermano", "un", "tengo", "."],
          respuestaCorrecta: "Tengo un hermano.",
          explicacion: "正确的句子是：Tengo un hermano.",
        },
        {
          id: "o4",
          palabras: ["estudiante", "soy", "."],
          respuestaCorrecta: "Soy estudiante.",
          explicacion: "正确的顺序是：Soy estudiante.",
        },
        {
          id: "o5",
          palabras: ["cansado", "estoy", "."],
          respuestaCorrecta: "Estoy cansado.",
          explicacion: "正确的顺序是：Estoy cansado.",
        },
        {
          id: "o6",
          palabras: ["comido", "he", "Ya", "."],
          respuestaCorrecta: "Ya he comido.",
          explicacion: "正确的顺序是：Ya he comido.",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我说西班牙语。",
          respuestaEsperada: "Yo hablo español.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "你吃很多。",
          respuestaEsperada: "Tú comes mucho.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "他住在马德里。",
          respuestaEsperada: "Él vive en Madrid.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "我是老师。",
          respuestaEsperada: "Soy profesor.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "我在家。",
          respuestaEsperada: "Estoy en casa.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "我有一辆车。",
          respuestaEsperada: "Tengo un coche.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "我已经吃了。",
          respuestaEsperada: "Ya he comido.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "有一本书在桌子上。",
          respuestaEsperada: "Hay un libro sobre la mesa.",
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
        instruccion: "用正确的动词形式完成对话。",
        instruccionChino: "用正确的动词形式完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿Qué idioma _____ (hablar)?",
            respuesta: "hablas",
          },
          {
            personaje: "B",
            texto: "_____ (hablar) español e inglés.",
            respuesta: "Hablo",
          },
          {
            personaje: "A",
            texto: "¿Dónde _____ (vivir)?",
            respuesta: "vives",
          },
          {
            personaje: "B",
            texto: "_____ (vivir) en Madrid.",
            respuesta: "Vivo",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "conjugar",
        titulo: "Conjuga los verbos",
        tituloChino: "变位动词",
        instruccion: "Completa la conjugación de los siguientes verbos en presente.",
        instruccionChino: "完成以下动词的现在时变位。",
        tabla: [
          {
            verbo: "hablar",
            yo: "hablo",
            tu: "hablas",
            el: "habla",
            nosotros: "hablamos",
            ellos: "hablan",
          },
          {
            verbo: "comer",
            yo: "como",
            tu: "comes",
            el: "come",
            nosotros: "comemos",
            ellos: "comen",
          },
          {
            verbo: "vivir",
            yo: "vivo",
            tu: "vives",
            el: "vive",
            nosotros: "vivimos",
            ellos: "viven",
          },
          {
            verbo: "ser",
            yo: "soy",
            tu: "eres",
            el: "es",
            nosotros: "somos",
            ellos: "son",
          },
          {
            verbo: "estar",
            yo: "estoy",
            tu: "estás",
            el: "está",
            nosotros: "estamos",
            ellos: "están",
          },
          {
            verbo: "tener",
            yo: "tengo",
            tu: "tienes",
            el: "tiene",
            nosotros: "tenemos",
            ellos: "tienen",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "clasificar",
        titulo: "Clasifica los verbos",
        tituloChino: "分类动词",
        instruccion: "Clasifica cada verbo según su terminación (-AR, -ER, -IR).",
        instruccionChino: "根据词尾将每个动词分类（-AR, -ER, -IR）。",
        verbos: [
          {
            verbo: "hablar",
            tipo: "-AR",
          },
          {
            verbo: "comer",
            tipo: "-ER",
          },
          {
            verbo: "vivir",
            tipo: "-IR",
          },
          {
            verbo: "estudiar",
            tipo: "-AR",
          },
          {
            verbo: "beber",
            tipo: "-ER",
          },
          {
            verbo: "escribir",
            tipo: "-IR",
          },
        ],
      },
      {
        id: "ep4",
        tipo: "completarFrases",
        titulo: "Completa las frases con el verbo correcto",
        tituloChino: "用正确的动词完成句子",
        instruccion: "Elige el verbo correcto (ser, estar, tener, haber) para cada frase.",
        instruccionChino: "为每个句子选择正确的动词（ser, estar, tener, haber）。",
        frases: [
          {
            frase: "Yo _____ estudiante.",
            respuesta: "soy",
          },
          {
            frase: "Ella _____ en Barcelona.",
            respuesta: "vive",
          },
          {
            frase: "Nosotros _____ mucha hambre.",
            respuesta: "tenemos",
          },
          {
            frase: "_____ un libro en la mesa.",
            respuesta: "Hay",
          },
        ],
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Qué son los verbos y para qué sirven?",
        preguntaChino: "什么是动词，它们有什么作用？",
        sugerencia: "Los verbos expresan acciones, estados o procesos.",
        sugerenciaChino: "Los verbos expresan acciones, estados o procesos.",
      },
      {
        id: "pa2",
        pregunta: "¿Cuáles son los tres tipos de verbos en español?",
        preguntaChino: "西班牙语动词有哪三种类型？",
        sugerencia: "Verbos en -AR, -ER y -IR.",
        sugerenciaChino: "Verbos en -AR, -ER y -IR.",
      },
      {
        id: "pa3",
        pregunta: "¿Cuál es la diferencia entre 'ser' y 'estar'?",
        preguntaChino: "'ser'和'estar'有什么区别？",
        sugerencia: "Ser es para características permanentes. Estar es para estados temporales y ubicación.",
        sugerenciaChino:
          "Ser es para características permanentes. Estar es para estados temporales y ubicación.",
      },
      {
        id: "pa4",
        pregunta: "¿Qué expresa el verbo 'tener' además de posesión?",
        preguntaChino: "除了拥有，动词'tener'还表达什么？",
        sugerencia: "Expresa edad (tener años) y sensaciones (hambre, sed, calor, frío).",
        sugerenciaChino: "Expresa edad (tener años) y sensaciones (hambre, sed, calor, frío).",
      },
      {
        id: "pa5",
        pregunta: "¿Para qué se usa el verbo 'haber'?",
        preguntaChino: "动词'haber'用来做什么？",
        sugerencia: "Se usa como auxiliar (he comido) y en forma impersonal (hay).",
        sugerenciaChino: "Se usa como auxiliar (he comido) y en forma impersonal (hay).",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '动词' en español?",
        preguntaChino: "西班牙语中'动词'怎么说？",
        respuestaSugerida: "verbo",
        respuestaSugeridaChino: "verbo",
      },
      {
        id: "p2",
        pregunta: "¿Cuáles son las tres terminaciones de los verbos?",
        preguntaChino: "动词的三个词尾是什么？",
        respuestaSugerida: "-AR, -ER, -IR",
        respuestaSugeridaChino: "-AR, -ER, -IR",
      },
      {
        id: "p3",
        pregunta: "¿Qué significa 'conjugar un verbo'?",
        preguntaChino: "'conjugar un verbo'是什么意思？",
        respuestaSugerida: "Cambiar la terminación según la persona.",
        respuestaSugeridaChino: "根据人称改变词尾。",
      },
      {
        id: "p4",
        pregunta: "¿Cómo se dice '我' como sujeto en español?",
        preguntaChino: "西班牙语中作为主语的'我'怎么说？",
        respuestaSugerida: "yo",
        respuestaSugeridaChino: "yo",
      },
      {
        id: "p5",
        pregunta: "¿Qué verbo se usa para la edad?",
        preguntaChino: "哪个动词用于年龄？",
        respuestaSugerida: "tener",
        respuestaSugeridaChino: "tener",
      },
      {
        id: "p6",
        pregunta: "¿Qué significa 'hay' en español?",
        preguntaChino: "西班牙语中'hay'是什么意思？",
        respuestaSugerida: "There is / There are",
        respuestaSugeridaChino: "有",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Preguntar por la apariencia física",
        tituloChino: "询问外貌",
        descripcion: `Frases para preguntar cómo es alguien físicamente:

🔹 PREGUNTAS COMUNES:
• ¿Cómo eres? = What do you look like?
• ¿Cómo es él/ella? = What does he/she look like?
• ¿Cómo es físicamente? = What does he/she look like physically?
• ¿Qué aspecto tiene? = What does he/she look like?
• Descríbete físicamente = Describe yourself physically

🔹 ESTRUCTURA PARA RESPONDER:
• Soy + adjetivo (Soy alto, soy delgado)
• Tengo + sustantivo (Tengo el pelo largo, tengo los ojos azules)
• Llevo + sustantivo (Llevo gafas, llevo barba)

📌 VERBO SER vs VERBO TENER en descripciones:
• SER + adjetivo = para características generales (altura, complexión)
• TENER + sustantivo = para partes específicas (pelo, ojos, barba)

📌 EJEMPLOS:
• ¿Cómo eres? — Soy alto, moreno y tengo los ojos marrones.
• ¿Cómo es tu hermano? — Es bajo y tiene el pelo rizado.`,
        descripcionChino: `询问某人外貌的句子：

🔹 常见问题：
• ¿Cómo eres? = 你长什么样？
• ¿Cómo es él/ella? = 他/她长什么样？
• ¿Cómo es físicamente? = 他/她外貌如何？
• ¿Qué aspecto tiene? = 他/她看起来什么样？
• Descríbete físicamente = 描述一下你的外貌

🔹 回答的结构：
• Soy + 形容词（我高，我瘦）
• Tengo + 名词（我有长发，我有蓝眼睛）
• Llevo + 名词（我戴眼镜，我留胡子）

📌 描述中SER vs TENER：
• SER + 形容词 = 用于一般特征（身高、体型）
• TENER + 名词 = 用于具体部位（头发、眼睛、胡子）

📌 例子：
• ¿Cómo eres? — Soy alto, moreno y tengo los ojos marrones. = 你长什么样？—我高，皮肤黑，有棕色的眼睛。
• ¿Cómo es tu hermano? — Es bajo y tiene el pelo rizado. = 你兄弟长什么样？—他矮，有卷发。`,
        ejemplos: [
          {
            espanol: "¿Cómo eres? — Soy alto y delgado.",
            chino: "你长什么样？—我高，瘦。",
          },
          {
            espanol: "¿Cómo es ella? — Es baja y tiene el pelo largo.",
            chino: "她长什么样？—她矮，有长发。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Altura y complexión",
        tituloChino: "身高和体型",
        descripcion: `🔹 ALTURA (height):

• alto / alta = tall
• bajo / baja = short
• mediano / mediana = medium height
• de estatura media = of medium height

🔹 COMPLEXIÓN (build):

• delgado / delgada = thin / slim
• flaco / flaca = skinny (sometimes negative)
• gordo / gorda = fat
• relleno / rellena = plump
• fuerte = strong / sturdy
• atlético / atlética = athletic
• musculoso / musculosa = muscular
• robusto / robusta = robust
• corpulento / corpulenta = large build

🔹 EJEMPLOS:
• Mi padre es alto y delgado.
• Ella es baja y un poco rellena.
• Él es de estatura media y atlético.
• Soy fuerte porque voy al gimnasio.

📌 PREGUNTAS SOBRE ALTURA Y COMPLEXIÓN:
• ¿Eres alto o bajo?
• ¿Cómo es de complexión?
• ¿Es delgado o gordo?`,
        descripcionChino: `🔹 身高：

• alto / alta = 高的
• bajo / baja = 矮的
• mediano / mediana = 中等身高的
• de estatura media = 中等身材的

🔹 体型：

• delgado / delgada = 瘦的/苗条的
• flaco / flaca = 瘦的（有时带贬义）
• gordo / gorda = 胖的
• relleno / rellena = 丰满的
• fuerte = 结实的/强壮的
• atlético / atlética = 健美的
• musculoso / musculosa = 肌肉发达的
• robusto / robusta = 结实的
• corpulento / corpulenta = 魁梧的

📌 例子：
• Mi padre es alto y delgado. = 我父亲高而瘦。
• Ella es baja y un poco rellena. = 她矮，有点丰满。
• Él es de estatura media y atlético. = 他中等身材，健美。
• Soy fuerte porque voy al gimnasio. = 我强壮因为我去健身房。

📌 关于身高和体型的问题：
• ¿Eres alto o bajo? = 你高还是矮？
• ¿Cómo es de complexión? = 他/她体型怎么样？
• ¿Es delgado o gordo? = 他/她瘦还是胖？`,
        ejemplos: [
          {
            espanol: "Mi padre es alto y delgado.",
            chino: "我父亲高而瘦。",
          },
          {
            espanol: "Ella es baja y tiene una complexión robusta.",
            chino: "她矮，体型结实。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "El cabello (pelo)",
        tituloChino: "头发",
        descripcion: `🔹 LONGITUD (length):

• pelo largo = long hair
• pelo corto = short hair
• pelo medio / semi-largo = medium hair
• pelo hasta los hombros = shoulder-length hair

🔹 COLOR (color):

• pelo negro = black hair
• pelo moreno / castaño = brown hair / dark hair
• pelo rubio = blonde hair
• pelo pelirrojo = red hair
• pelo gris / canoso = gray hair
• pelo blanco = white hair

🔹 TIPO (type):

• pelo liso = straight hair
• pelo rizado = curly hair
• pelo ondulado = wavy hair
• pelo con rulos = curly (with curls)

🔹 OTROS (others):
• calvo = bald
• con entradas = receding hairline
• trenzas = braids
• coleta = ponytail
• moño = bun
• flequillo = bangs / fringe

🔹 EJEMPLOS:
• Tengo el pelo largo y liso.
• Él es calvo desde joven.
• Mi hermana tiene el pelo rizado y pelirrojo.
• Llevo el pelo recogido en una coleta.

📌 VERBO TENER vs VERBO LLEVAR:
• Tengo el pelo largo = I have long hair (permanent)
• Llevo el pelo recogido = I have my hair up (temporary)`,
        descripcionChino: `🔹 长度：

• pelo largo = 长发
• pelo corto = 短发
• pelo medio / semi-largo = 中长发
• pelo hasta los hombros = 齐肩发

🔹 颜色：

• pelo negro = 黑发
• pelo moreno / castaño = 棕发/深色头发
• pelo rubio = 金发
• pelo pelirrojo = 红发
• pelo gris / canoso = 灰发
• pelo blanco = 白发

🔹 类型：

• pelo liso = 直发
• pelo rizado = 卷发
• pelo ondulado = 波浪发
• pelo con rulos = 有卷的头发

🔹 其他：

• calvo = 秃头的
• con entradas = 发际线后移的
• trenzas = 辫子
• coleta = 马尾辫
• moño = 发髻
• flequillo = 刘海

📌 例子：
• Tengo el pelo largo y liso. = 我有长直发。
• Él es calvo desde joven. = 他从小秃头。
• Mi hermana tiene el pelo rizado y pelirrojo. = 我妹妹有红色卷发。
• Llevo el pelo recogido en una coleta. = 我把头发扎成马尾辫。

📌 TENER vs LLEVAR：
• Tengo el pelo largo = 我有长发（永久的）
• Llevo el pelo recogido = 我把头发扎起来了（暂时的）`,
        ejemplos: [
          {
            espanol: "Tengo el pelo largo y liso.",
            chino: "我有长直发。",
          },
          {
            espanol: "Él es calvo y tiene barba.",
            chino: "他秃头，有胡子。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Ojos, piel y otros rasgos",
        tituloChino: "眼睛、皮肤和其他特征",
        descripcion: `🔹 OJOS (eyes):

• ojos azules = blue eyes
• ojos verdes = green eyes
• ojos marrones / castaños = brown eyes
• ojos negros = black eyes
• ojos grises = gray eyes
• ojos grandes / pequeños = big / small eyes
• ojos rasgados = almond-shaped eyes
• ojos redondos = round eyes

🔹 PIEL (skin):

• piel blanca = white skin
• piel morena = tan / brown skin
• piel oscura = dark skin
• piel clara = fair skin
• pecas = freckles
• lunares = moles

🔹 OTROS RASGOS (other features):

• barba = beard
• bigote = mustache
• perilla = goatee
• patillas = sideburns
• gafas = glasses
• lentillas / lentes de contacto = contact lenses
• cicatriz = scar
• tatuajes = tattoos
• piercings = piercings

🔹 EJEMPLOS:
• Tiene los ojos verdes y el pelo pelirrojo.
• Mi hermana tiene pecas en la cara.
• Él lleva gafas y tiene barba.
• Tiene la piel morena porque vive en la playa.

📌 PREGUNTAS SOBRE RASGOS FACIALES:
• ¿De qué color tienes los ojos?
• ¿Tienes pecas o lunares?
• ¿Llevas gafas?
• ¿Tienes barba o bigote?`,
        descripcionChino: `🔹 眼睛：

• ojos azules = 蓝眼睛
• ojos verdes = 绿眼睛
• ojos marrones / castaños = 棕色眼睛
• ojos negros = 黑色眼睛
• ojos grises = 灰色眼睛
• ojos grandes / pequeños = 大眼睛/小眼睛
• ojos rasgados = 丹凤眼/细长眼
• ojos redondos = 圆眼睛

🔹 皮肤：

• piel blanca = 白皮肤
• piel morena = 棕褐色皮肤
• piel oscura = 深色皮肤
• piel clara = 浅色皮肤
• pecas = 雀斑
• lunares = 痣

🔹 其他特征：

• barba = 胡须
• bigote = 小胡子
• perilla = 山羊胡
• patillas = 鬓角
• gafas = 眼镜
• lentillas / lentes de contacto = 隐形眼镜
• cicatriz = 疤痕
• tatuajes = 纹身
• piercings = 穿环/钉

📌 例子：
• Tiene los ojos verdes y el pelo pelirrojo. = 他有绿眼睛和红头发。
• Mi hermana tiene pecas en la cara. = 我妹妹脸上有雀斑。
• Él lleva gafas y tiene barba. = 他戴眼镜，有胡子。
• Tiene la piel morena porque vive en la playa. = 他皮肤是棕褐色的，因为他住在海滩边。

📌 关于面部特征的问题：
• ¿De qué color tienes los ojos? = 你的眼睛是什么颜色的？
• ¿Tienes pecas o lunares? = 你有雀斑或痣吗？
• ¿Llevas gafas? = 你戴眼镜吗？
• ¿Tienes barba o bigote? = 你有胡子或小胡子吗？`,
        ejemplos: [
          {
            espanol: "Tiene los ojos verdes y el pelo pelirrojo.",
            chino: "他有绿眼睛和红头发。",
          },
          {
            espanol: "Él lleva gafas y tiene barba.",
            chino: "他戴眼镜，有胡子。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "alto / alta",
        chino: "高的",
        ejemplo: "Soy alto.",
      },
      {
        id: "v2",
        espanol: "bajo / baja",
        chino: "矮的",
        ejemplo: "Ella es baja.",
      },
      {
        id: "v3",
        espanol: "delgado / delgada",
        chino: "瘦的",
        ejemplo: "Mi hermano es delgado.",
      },
      {
        id: "v4",
        espanol: "gordo / gorda",
        chino: "胖的",
        ejemplo: "No soy gordo.",
      },
      {
        id: "v5",
        espanol: "fuerte",
        chino: "强壮的",
        ejemplo: "Es muy fuerte.",
      },
      {
        id: "v6",
        espanol: "atlético / atlética",
        chino: "健美的",
        ejemplo: "Tiene cuerpo atlético.",
      },
      {
        id: "v7",
        espanol: "pelo largo",
        chino: "长发",
        ejemplo: "Tengo el pelo largo.",
      },
      {
        id: "v8",
        espanol: "pelo corto",
        chino: "短发",
        ejemplo: "Él tiene pelo corto.",
      },
      {
        id: "v9",
        espanol: "pelo liso",
        chino: "直发",
        ejemplo: "Mi hermana tiene pelo liso.",
      },
      {
        id: "v10",
        espanol: "pelo rizado",
        chino: "卷发",
        ejemplo: "Tengo el pelo rizado.",
      },
      {
        id: "v11",
        espanol: "pelo rubio",
        chino: "金发",
        ejemplo: "Ella es rubia.",
      },
      {
        id: "v12",
        espanol: "pelo moreno",
        chino: "棕发",
        ejemplo: "Soy moreno.",
      },
      {
        id: "v13",
        espanol: "pelo negro",
        chino: "黑发",
        ejemplo: "Tiene el pelo negro.",
      },
      {
        id: "v14",
        espanol: "calvo",
        chino: "秃头的",
        ejemplo: "Mi abuelo es calvo.",
      },
      {
        id: "v15",
        espanol: "ojos azules",
        chino: "蓝眼睛",
        ejemplo: "Tiene ojos azules.",
      },
      {
        id: "v16",
        espanol: "ojos verdes",
        chino: "绿眼睛",
        ejemplo: "Sus ojos son verdes.",
      },
      {
        id: "v17",
        espanol: "ojos marrones",
        chino: "棕色眼睛",
        ejemplo: "Tengo ojos marrones.",
      },
      {
        id: "v18",
        espanol: "barba",
        chino: "胡须",
        ejemplo: "Él tiene barba.",
      },
      {
        id: "v19",
        espanol: "bigote",
        chino: "小胡子",
        ejemplo: "Lleva bigote.",
      },
      {
        id: "v20",
        espanol: "gafas",
        chino: "眼镜",
        ejemplo: "Llevo gafas.",
      },
      {
        id: "v21",
        espanol: "pecas",
        chino: "雀斑",
        ejemplo: "Tiene pecas en la cara.",
      },
      {
        id: "v22",
        espanol: "lunar",
        chino: "痣",
        ejemplo: "Tiene un lunar en la mejilla.",
      },
      {
        id: "v23",
        espanol: "piel blanca",
        chino: "白皮肤",
        ejemplo: "Tiene la piel blanca.",
      },
      {
        id: "v24",
        espanol: "piel morena",
        chino: "棕褐色皮肤",
        ejemplo: "Soy de piel morena.",
      },
      {
        id: "v25",
        espanol: "cicatriz",
        chino: "疤痕",
        ejemplo: "Tiene una cicatriz en la frente.",
      },
      {
        id: "v26",
        espanol: "tatuaje",
        chino: "纹身",
        ejemplo: "Lleva un tatuaje en el brazo.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Describiendo a una persona",
        tituloChino: "描述一个人",
        personajes: ["Ana", "Carlos"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Carlos, ¿cómo es tu hermano?",
            traduccion: "卡洛斯，你的兄弟长什么样？",
          },
          {
            personaje: "Carlos",
            texto: "Mi hermano es alto y delgado. Tiene el pelo castaño y los ojos marrones.",
            traduccion: "我的兄弟高而瘦。他有棕色头发和棕色眼睛。",
          },
          {
            personaje: "Ana",
            texto: "¿Y tu hermana?",
            traduccion: "你的妹妹呢？",
          },
          {
            personaje: "Carlos",
            texto: "Mi hermana es más baja. Es rubia y tiene los ojos verdes.",
            traduccion: "我妹妹更矮。她是金发，有绿眼睛。",
          },
          {
            personaje: "Ana",
            texto: "¿Se parecen?",
            traduccion: "他们像吗？",
          },
          {
            personaje: "Carlos",
            texto: "Un poco, pero ella es más delgada.",
            traduccion: "有一点，但她更瘦。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Describiéndose a sí mismo",
        tituloChino: "描述自己",
        personajes: ["María", "Pedro"],
        lineas: [
          {
            personaje: "María",
            texto: "Pedro, ¿cómo eres? Descríbete.",
            traduccion: "佩德罗，你长什么样？描述一下你自己。",
          },
          {
            personaje: "Pedro",
            texto: "Soy de estatura media, ni alto ni bajo.",
            traduccion: "我中等身高，不高不矮。",
          },
          {
            personaje: "María",
            texto: "¿Y de complexión?",
            traduccion: "体型呢？",
          },
          {
            personaje: "Pedro",
            texto: "Soy delgado, un poco atlético porque voy al gimnasio.",
            traduccion: "我瘦，有点健美因为我去健身房。",
          },
          {
            personaje: "María",
            texto: "¿Tienes barba?",
            traduccion: "你有胡子吗？",
          },
          {
            personaje: "Pedro",
            texto: "Sí, tengo barba corta y bigote.",
            traduccion: "是的，我有短胡子和胡子。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Describiendo a una celebridad",
        tituloChino: "描述一位名人",
        personajes: ["Laura", "David"],
        lineas: [
          {
            personaje: "Laura",
            texto: "David, ¿cómo es el actor de esa película?",
            traduccion: "大卫，那部电影的演员长什么样？",
          },
          {
            personaje: "David",
            texto: "Es alto, moreno y tiene los ojos marrones.",
            traduccion: "他高，棕褐色皮肤，有棕色眼睛。",
          },
          {
            personaje: "Laura",
            texto: "¿Tiene el pelo largo o corto?",
            traduccion: "他头发长还是短？",
          },
          {
            personaje: "David",
            texto: "Tiene el pelo corto y liso.",
            traduccion: "他有短直发。",
          },
          {
            personaje: "Laura",
            texto: "¿Lleva gafas?",
            traduccion: "他戴眼镜吗？",
          },
          {
            personaje: "David",
            texto: "No, no lleva gafas, pero tiene un lunar en la mejilla.",
            traduccion: "不，他不戴眼镜，但脸颊上有一颗痣。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "En la peluquería",
        tituloChino: "在理发店",
        personajes: ["Cliente", "Peluquero"],
        lineas: [
          {
            personaje: "Peluquero",
            texto: "Buenos días. ¿Cómo quiere el pelo?",
            traduccion: "早上好。您想要什么样的发型？",
          },
          {
            personaje: "Cliente",
            texto: "Quiero cortármelo un poco. Me lo dejo más o menos a la altura de los hombros.",
            traduccion: "我想剪短一点。留到大概肩膀的高度。",
          },
          {
            personaje: "Peluquero",
            texto: "¿Lleva flequillo?",
            traduccion: "您有刘海吗？",
          },
          {
            personaje: "Cliente",
            texto: "Sí, pero solo un poco. No muy corto.",
            traduccion: "是的，但只一点点。不要太短。",
          },
          {
            personaje: "Peluquero",
            texto: "Perfecto. ¿Alguna otra cosa?",
            traduccion: "完美。还有别的吗？",
          },
          {
            personaje: "Cliente",
            texto: "No, gracias. También me gustaría hacerme mechas rubias.",
            traduccion: "不用，谢谢。我还想做金色挑染。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Comparando físicamente dos personas",
        tituloChino: "比较两个人的外貌",
        personajes: ["Sofía", "Javier"],
        lineas: [
          {
            personaje: "Sofía",
            texto: "Javier, ¿en qué se parecen tus padres?",
            traduccion: "哈维尔，你父母哪里像？",
          },
          {
            personaje: "Javier",
            texto: "Los dos son morenos y tienen los ojos marrones.",
            traduccion: "两人都是棕褐色皮肤，有棕色眼睛。",
          },
          {
            personaje: "Sofía",
            texto: "¿Y en qué se diferencian?",
            traduccion: "哪里不同？",
          },
          {
            personaje: "Javier",
            texto:
              "Mi padre es más alto y tiene el pelo rizado. Mi madre es más bajita y tiene el pelo liso.",
            traduccion: "我父亲更高，有卷发。我母亲更矮，有直发。",
          },
          {
            personaje: "Sofía",
            texto: "¿Y tú a quién te pareces más?",
            traduccion: "你更像谁？",
          },
          {
            personaje: "Javier",
            texto: "Me parezco más a mi madre. Soy bajo y tengo el pelo liso como ella.",
            traduccion: "我更像我的母亲。我矮，像她一样有直发。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "为了问'你长什么样？'：¿Cómo _____?",
          preguntaChino: "为了问'你长什么样？'：¿Cómo _____?",
          respuestaCorrecta: "eres",
          explicacion: "'¿Cómo eres?' = 你长什么样？",
          pista: "首字母是 e，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c2",
          pregunta: "我高：Soy _____",
          preguntaChino: "我高：Soy _____",
          respuestaCorrecta: "alto",
          explicacion: "Alto = 高的",
          pista: "首字母是 a，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c3",
          pregunta: "她有长头发：Ella tiene el pelo _____",
          preguntaChino: "她有长头发：Ella tiene el pelo _____",
          respuestaCorrecta: "largo",
          explicacion: "Largo = 长的",
          pista: "首字母是 l，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c4",
          pregunta: "我的眼睛是蓝色的：Tengo los ojos _____",
          preguntaChino: "我的眼睛是蓝色的：Tengo los ojos _____",
          respuestaCorrecta: "azules",
          explicacion: "Azules = 蓝色的（复数）",
          pista: "首字母是 a，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c5",
          pregunta: "他戴眼镜：Él lleva _____",
          preguntaChino: "他戴眼镜：Él lleva _____",
          respuestaCorrecta: "gafas",
          explicacion: "Gafas = 眼镜",
          pista: "首字母是 g，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c6",
          pregunta: "她有雀斑：Ella tiene _____ en la cara",
          preguntaChino: "她有雀斑：Ella tiene _____ en la cara",
          respuestaCorrecta: "pecas",
          explicacion: "Pecas = 雀斑",
          pista: "首字母是 p，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c7",
          pregunta: "他有胡子：Él tiene _____",
          preguntaChino: "他有胡子：Él tiene _____",
          respuestaCorrecta: "barba",
          explicacion: "Barba = 胡子",
          pista: "首字母是 b，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c8",
          pregunta: "我中等身高：Soy de estatura _____",
          preguntaChino: "我中等身高：Soy de estatura _____",
          respuestaCorrecta: "media",
          explicacion: "Estatura media = 中等身高",
          pista: "首字母是 m，5个字母",
          numeroLetras: 5,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "¿Cómo se dice '他高' en español?",
          preguntaChino: "西班牙语中'他高'怎么说？",
          opciones: ["Él es bajo", "Él es alto", "Él es delgado", "Él es gordo"],
          respuestaCorrecta: "Él es alto",
          explicacion: "Alto = 高的",
        },
        {
          id: "s2",
          pregunta: "¿Qué significa 'Tiene el pelo rizado'?",
          preguntaChino: "'Tiene el pelo rizado'是什么意思？",
          opciones: ["他有直发", "他有卷发", "他有长发", "他有短发"],
          respuestaCorrecta: "他有卷发",
          explicacion: "Rizado = 卷的",
        },
        {
          id: "s3",
          pregunta: "¿Cómo se dice '金发' en español?",
          preguntaChino: "西班牙语中'金发'怎么说？",
          opciones: ["moreno", "rubio", "pelirrojo", "canoso"],
          respuestaCorrecta: "rubio",
          explicacion: "Rubio = 金发",
        },
        {
          id: "s4",
          pregunta: "¿Qué significa 'Tiene los ojos verdes'?",
          preguntaChino: "'Tiene los ojos verdes'是什么意思？",
          opciones: ["他有蓝眼睛", "他有绿眼睛", "他有棕眼睛", "他有灰眼睛"],
          respuestaCorrecta: "他有绿眼睛",
          explicacion: "Verdes = 绿色的",
        },
        {
          id: "s5",
          pregunta: "¿Cómo se dice '她戴眼镜' en español?",
          preguntaChino: "西班牙语中'她戴眼镜'怎么说？",
          opciones: ["Ella tiene gafas", "Ella lleva gafas", "Ella es gafas", "Ella mira gafas"],
          respuestaCorrecta: "Ella lleva gafas",
          explicacion: "Llevar gafas = 戴眼镜",
        },
        {
          id: "s6",
          pregunta: "¿Qué significa 'Es calvo'?",
          preguntaChino: "'Es calvo'是什么意思？",
          opciones: ["他是秃头", "他头发很多", "他是卷发", "他是直发"],
          respuestaCorrecta: "他是秃头",
          explicacion: "Calvo = 秃头的",
        },
        {
          id: "s7",
          pregunta: "¿Cómo se dice '她有雀斑' en español?",
          preguntaChino: "西班牙语中'她有雀斑'怎么说？",
          opciones: ["Ella tiene pecas", "Ella tiene lunares", "Ella tiene cicatrices", "Ella tiene gafas"],
          respuestaCorrecta: "Ella tiene pecas",
          explicacion: "Pecas = 雀斑",
        },
        {
          id: "s8",
          pregunta: "¿Qué significa 'Él tiene barba'?",
          preguntaChino: "'Él tiene barba'是什么意思？",
          opciones: ["他有胡子", "他戴眼镜", "他纹身", "他是秃头"],
          respuestaCorrecta: "他有胡子",
          explicacion: "Barba = 胡子",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Alto' significa '矮'。",
          preguntaChino: "'Alto' significa '矮'。",
          respuestaCorrecta: false,
          explicacion: "错。Alto = 高",
        },
        {
          id: "vf2",
          pregunta: "'Pelo largo' significa '长发'。",
          preguntaChino: "'Pelo largo' significa '长发'。",
          respuestaCorrecta: true,
          explicacion: "对。Pelo largo = 长发",
        },
        {
          id: "vf3",
          pregunta: "'Ojos azules' significa '绿眼睛'。",
          preguntaChino: "'Ojos azules' significa '绿眼睛'。",
          respuestaCorrecta: false,
          explicacion: "错。Ojos azules = 蓝眼睛",
        },
        {
          id: "vf4",
          pregunta: "'Delgado' significa '胖'。",
          preguntaChino: "'Delgado' significa '胖'。",
          respuestaCorrecta: false,
          explicacion: "错。Delgado = 瘦",
        },
        {
          id: "vf5",
          pregunta: "'Llevar gafas' significa '戴眼镜'。",
          preguntaChino: "'Llevar gafas' significa '戴眼镜'。",
          respuestaCorrecta: true,
          explicacion: "对。Llevar gafas = 戴眼镜",
        },
        {
          id: "vf6",
          pregunta: "Para describir el color de pelo se usa el verbo 'tener'.",
          preguntaChino: "描述头发颜色用动词'tener'。",
          respuestaCorrecta: true,
          explicacion: "对。Tengo el pelo rubio",
        },
        {
          id: "vf7",
          pregunta: "'Pelo rizado' es lo mismo que 'pelo liso'.",
          preguntaChino: "'Pelo rizado'和'pelo liso'一样。",
          respuestaCorrecta: false,
          explicacion: "错。Rizado = 卷发, liso = 直发",
        },
        {
          id: "vf8",
          pregunta: "Se puede usar 'ser' y 'tener' para describir la altura.",
          preguntaChino: "描述身高可以用'ser'和'tener'。",
          respuestaCorrecta: true,
          explicacion: "对。Soy alto / Tengo una altura media",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "alto",
              derecha: "高的",
            },
            {
              izquierda: "bajo",
              derecha: "矮的",
            },
            {
              izquierda: "delgado",
              derecha: "瘦的",
            },
            {
              izquierda: "gordo",
              derecha: "胖的",
            },
            {
              izquierda: "pelo largo",
              derecha: "长发",
            },
            {
              izquierda: "pelo corto",
              derecha: "短发",
            },
            {
              izquierda: "pelo liso",
              derecha: "直发",
            },
            {
              izquierda: "pelo rizado",
              derecha: "卷发",
            },
            {
              izquierda: "rubio",
              derecha: "金发",
            },
            {
              izquierda: "moreno",
              derecha: "棕发",
            },
            {
              izquierda: "ojos azules",
              derecha: "蓝眼睛",
            },
            {
              izquierda: "ojos verdes",
              derecha: "绿眼睛",
            },
            {
              izquierda: "ojos marrones",
              derecha: "棕色眼睛",
            },
            {
              izquierda: "barba",
              derecha: "胡子",
            },
            {
              izquierda: "gafas",
              derecha: "眼镜",
            },
            {
              izquierda: "pecas",
              derecha: "雀斑",
            },
            {
              izquierda: "calvo",
              derecha: "秃头",
            },
          ],
          explicacion: "将外貌描述词汇与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["alto", "soy", "."],
          respuestaCorrecta: "Soy alto.",
          explicacion: "正确的句子是：Soy alto.（我高。）",
        },
        {
          id: "o2",
          palabras: ["tiene", "Ella", "largo", "pelo", "."],
          respuestaCorrecta: "Ella tiene el pelo largo.",
          explicacion: "正确的句子是：Ella tiene el pelo largo.（她有长发。）",
        },
        {
          id: "o3",
          palabras: ["ojos", "Tengo", "marrones", "los", "."],
          respuestaCorrecta: "Tengo los ojos marrones.",
          explicacion: "正确的句子是：Tengo los ojos marrones.（我有棕色眼睛。）",
        },
        {
          id: "o4",
          palabras: ["gafas", "lleva", "Él", "."],
          respuestaCorrecta: "Él lleva gafas.",
          explicacion: "正确的顺序是：Él lleva gafas.",
        },
        {
          id: "o5",
          palabras: ["barba", "tiene", "y", "bigote", "."],
          respuestaCorrecta: "Tiene barba y bigote.",
          explicacion: "正确的顺序是：Tiene barba y bigote.",
        },
        {
          id: "o6",
          palabras: ["describirte", "Cómo", "físicamente", "?"],
          respuestaCorrecta: "¿Cómo describirte físicamente?",
          explicacion: "正确的顺序是：¿Cómo describirte físicamente?",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我高而且瘦。",
          respuestaEsperada: "Soy alto y delgado.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "她有长直发。",
          respuestaEsperada: "Ella tiene el pelo largo y liso.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "他有蓝眼睛。",
          respuestaEsperada: "Él tiene los ojos azules.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "我母亲戴眼镜。",
          respuestaEsperada: "Mi madre lleva gafas.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "他是秃头，有胡子。",
          respuestaEsperada: "Él es calvo y tiene barba.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "我妹妹有雀斑。",
          respuestaEsperada: "Mi hermana tiene pecas.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "你长什么样？",
          respuestaEsperada: "¿Cómo eres?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "他中等身高，有棕色皮肤。",
          respuestaEsperada: "Es de estatura media y tiene la piel morena.",
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
        instruccion: "用正确的描述词汇完成对话。",
        instruccionChino: "用正确的描述词汇完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿Cómo _____ físicamente?",
            respuesta: "eres",
          },
          {
            personaje: "B",
            texto: "Soy _____. Tengo el pelo _____ y los ojos _____.",
            respuesta: "alto / bajo / delgado / gordo",
          },
          {
            personaje: "A",
            texto: "¿Llevas _____?",
            respuesta: "gafas",
          },
          {
            personaje: "B",
            texto: "Sí, llevo gafas. ¿Y tú?",
            respuesta: "",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "describir",
        titulo: "Describe a una persona",
        tituloChino: "描述一个人",
        instruccion: "Describe físicamente a un miembro de tu familia o a un amigo (5-6 líneas).",
        instruccionChino: "描述你的一个家庭成员或朋友的外貌（5-6行）。",
        ejemplo:
          "Mi hermano se llama Carlos. Es alto, moreno y delgado. Tiene el pelo corto y rizado. Sus ojos son marrones. Lleva gafas y tiene una pequeña cicatriz en la barbilla.",
      },
      {
        id: "ep3",
        tipo: "comparar",
        titulo: "Compara dos personas",
        tituloChino: "比较两个人",
        instruccion: "Escribe 5 diferencias físicas entre dos personas que conoces.",
        instruccionChino: "写出你认识的两个人之间的5个外貌差异。",
        ejemplo:
          "Mi padre es más alto que mi madre. Él tiene el pelo canoso, ella tiene el pelo moreno. Él tiene los ojos marrones, ella los tiene verdes...",
      },
      {
        id: "ep4",
        tipo: "responder",
        titulo: "Responde las preguntas",
        tituloChino: "回答问题",
        instruccion: "Responde las siguientes preguntas sobre tu apariencia física en español.",
        instruccionChino: "用西班牙语回答以下关于你外貌的问题。",
        preguntas: [
          {
            pregunta: "¿Cómo eres físicamente?",
            respuestaEsperada: "Soy (alto / bajo / mediano) y (delgado / gordo / atlético).",
          },
          {
            pregunta: "¿De qué color tienes el pelo?",
            respuestaEsperada: "Tengo el pelo (negro / moreno / rubio).",
          },
          {
            pregunta: "¿Tienes el pelo largo o corto?",
            respuestaEsperada: "Tengo el pelo (largo / corto / medio).",
          },
          {
            pregunta: "¿De qué color tienes los ojos?",
            respuestaEsperada: "Tengo los ojos (azules / verdes / marrones).",
          },
          {
            pregunta: "¿Llevas gafas?",
            respuestaEsperada: "Sí, llevo gafas. / No, no llevo gafas.",
          },
        ],
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Cómo eres físicamente? Descríbete.",
        preguntaChino: "你长什么样？描述一下自己。",
        sugerencia: "Soy... Tengo... Llevo...",
        sugerenciaChino: "Soy... Tengo... Llevo...",
      },
      {
        id: "pa2",
        pregunta: "Describe a tu mejor amigo o amiga físicamente.",
        preguntaChino: "描述你最好的朋友的外貌。",
        sugerencia: "Mi mejor amigo es... Tiene...",
        sugerenciaChino: "Mi mejor amigo es... Tiene...",
      },
      {
        id: "pa3",
        pregunta: "¿En qué te pareces a tus padres físicamente?",
        preguntaChino: "你外貌上哪里像你的父母？",
        sugerencia: "Me parezco a mi madre en los ojos, y a mi padre en el pelo.",
        sugerenciaChino: "Me parezco a mi madre en los ojos, y a mi padre en el pelo.",
      },
      {
        id: "pa4",
        pregunta: "¿Qué color de pelo te gusta más? ¿Por qué?",
        preguntaChino: "你最喜欢什么颜色的头发？为什么？",
        sugerencia: "Me gusta el pelo rubio porque es muy llamativo.",
        sugerenciaChino: "Me gusta el pelo rubio porque es muy llamativo.",
      },
      {
        id: "pa5",
        pregunta: "¿Crees que la apariencia física es importante? ¿Por qué?",
        preguntaChino: "你认为外貌重要吗？为什么？",
        sugerencia: "La apariencia es importante al principio, pero lo más importante es la personalidad.",
        sugerenciaChino:
          "La apariencia es importante al principio, pero lo más importante es la personalidad.",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se pregunta '你长什么样？' en español?",
        preguntaChino: "西班牙语中'你长什么样？'怎么问？",
        respuestaSugerida: "¿Cómo eres?",
        respuestaSugeridaChino: "¿Cómo eres?",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '我有长头发' en español?",
        preguntaChino: "西班牙语中'我有长头发'怎么说？",
        respuestaSugerida: "Tengo el pelo largo.",
        respuestaSugeridaChino: "Tengo el pelo largo.",
      },
      {
        id: "p3",
        pregunta: "¿Qué significa 'Tiene los ojos verdes'?",
        preguntaChino: "'Tiene los ojos verdes'是什么意思？",
        respuestaSugerida: "他有绿色的眼睛。",
        respuestaSugeridaChino: "He has green eyes.",
      },
      {
        id: "p4",
        pregunta: "¿Cómo se dice '他戴眼镜' en español?",
        preguntaChino: "西班牙语中'他戴眼镜'怎么说？",
        respuestaSugerida: "Él lleva gafas.",
        respuestaSugeridaChino: "Él lleva gafas.",
      },
      {
        id: "p5",
        pregunta: "¿Qué significa 'calvo'?",
        preguntaChino: "'calvo'是什么意思？",
        respuestaSugerida: "Sin pelo en la cabeza / Bald",
        respuestaSugeridaChino: "秃头的",
      },
      {
        id: "p6",
        pregunta: "¿Cómo se dice '雀斑' en español?",
        preguntaChino: "西班牙语中'雀斑'怎么说？",
        respuestaSugerida: "pecas",
        respuestaSugeridaChino: "pecas",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Géneros de películas",
        tituloChino: "电影类型",
        descripcion: `🔹 GÉNEROS CINEMATOGRÁFICOS (movie genres):

• acción = action
• comedia = comedy
• drama = drama
• terror / horror = horror
• ciencia ficción = science fiction
• romance = romance
• animación = animation
• documental = documentary
• thriller / suspense = thriller / suspense
• aventuras = adventure
• western = western
• musical = musical
• bélico = war movie
• histórico = historical
• policíaco = police / crime
• misterio = mystery
• fantasía = fantasy
• catástrofe = disaster movie

📌 EJEMPLOS:
• Me gustan las películas de acción.
• Prefiero la comedia al drama.
• Los niños ven animación.`,
        descripcionChino: `🔹 电影类型：

• acción = 动作片
• comedia = 喜剧片
• drama = 剧情片
• terror / horror = 恐怖片
• ciencia ficción = 科幻片
• romance = 爱情片
• animación = 动画片
• documental = 纪录片
• thriller / suspense = 惊悚片
• aventuras = 冒险片
• western = 西部片
• musical = 音乐片
• bélico = 战争片
• histórico = 历史片
• policíaco = 警匪片
• misterio = 悬疑片
• fantasía = 奇幻片
• catástrofe = 灾难片

📌 例子：
• Me gustan las películas de acción. = 我喜欢动作片。
• Prefiero la comedia al drama. = 比起剧情片我更喜欢喜剧。
• Los niños ven animación. = 孩子们看动画片。`,
        ejemplos: [
          {
            espanol: "Me gustan las películas de acción.",
            chino: "我喜欢动作片。",
          },
          {
            espanol: "Prefiero la comedia al drama.",
            chino: "比起剧情片我更喜欢喜剧。",
          },
          {
            espanol: "Los niños ven animación.",
            chino: "孩子们看动画片。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Profesiones del cine",
        tituloChino: "电影行业职业",
        descripcion: `🔹 PERSONAS QUE TRABAJAN EN EL CINE:

• actor / actriz = actor / actress
• director / directora = director
• guionista = screenwriter
• productor / productora = producer
• camarógrafo / camarógrafa = cinematographer
• montador / montadora = editor
• doble (de acción) = stunt double
• ayudante de dirección = assistant director
• sonidista = sound technician
• maquillador / maquilladora = makeup artist
• vestuarista = costume designer
• figurante = extra

🔹 VOCABULARIO RELACIONADO (related vocabulary):
• película = film / movie
• escena = scene
• diálogo = dialogue
• banda sonora = soundtrack
• efectos especiales = special effects
• secuela = sequel
• precuela = prequel
• remake = remake
• película original = original movie
• versión original = original version (VO)
• versión doblada = dubbed version
• subtítulos = subtitles
• rodaje = shooting
• estreno = premiere / release
• taquilla = box office
• nominación = nomination
• premio = award (Oscar, Goya)

📌 EJEMPLOS:
• Un actor famoso.
• El director de la película.
• Los efectos especiales son increíbles.`,
        descripcionChino: `🔹 电影行业工作者：

• actor / actriz = 男演员/女演员
• director / directora = 导演
• guionista = 编剧
• productor / productora = 制片人
• camarógrafo / camarógrafa = 摄影师
• montador / montadora = 剪辑师
• doble (de acción) = 替身
• ayudante de dirección = 助理导演
• sonidista = 音效师
• maquillador / maquilladora = 化妆师
• vestuarista = 服装设计师
• figurante = 群众演员

🔹 相关词汇：
• película = 电影
• escena = 场景
• diálogo = 对话
• banda sonora = 原声带
• efectos especiales = 特效
• secuela = 续集
• precuela = 前传
• remake = 翻拍
• película original = 原创电影
• versión original = 原声版（VO）
• versión doblada = 配音版
• subtítulos = 字幕
• rodaje = 拍摄
• estreno = 首映/上映
• taquilla = 票房
• nominación = 提名
• premio = 奖项（奥斯卡、戈雅奖）

📌 例子：
• Un actor famoso. = 一位著名男演员。
• El director de la película. = 电影的导演。
• Los efectos especiales son increíbles. = 特效令人难以置信。`,
        ejemplos: [
          {
            espanol: "Un actor famoso.",
            chino: "一位著名男演员。",
          },
          {
            espanol: "El director de la película.",
            chino: "电影的导演。",
          },
          {
            espanol: "Los efectos especiales son increíbles.",
            chino: "特效令人难以置信。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Ir al cine",
        tituloChino: "去电影院",
        descripcion: `🔹 FRASES ÚTILES (useful phrases):

• ¿Quieres ir al cine? = Do you want to go to the cinema?
• ¿Qué película quieres ver? = What movie do you want to see?
• ¿A qué hora empieza? = What time does it start?
• ¿Quién dirige la película? = Who directed the movie?
• ¿Quién actúa? = Who stars in it?

🔹 EN EL CINE (at the cinema):
• comprar la entrada = to buy the ticket
• elegir la butaca = to choose the seat
• comprar palomitas = to buy popcorn
• comprar bebida = to buy a drink
• ver la película en versión original = to watch the movie in original version
• ver la película doblada = to watch the movie dubbed
• ver la película con subtítulos = to watch with subtitles

🔹 EXPRESAR OPINIÓN SOBRE LA PELÍCULA:
• Me ha gustado mucho = I liked it a lot
• Es la mejor película del año = It's the best movie of the year
• El final es sorprendente = The ending is surprising
• Me ha decepcionado = It disappointed me
• La recomiendo / No la recomiendo = I recommend it / I don't recommend it
• La película es muy entretenida = The movie is very entertaining
• El argumento es original = The plot is original
• La actuación es excelente = The acting is excellent

📌 EJEMPLOS:
• ¿Quieres ir al cine?
• Compro palomitas.
• La recomiendo mucho.`,
        descripcionChino: `🔹 有用句子：

• ¿Quieres ir al cine? = 你想去看电影吗？
• ¿Qué película quieres ver? = 你想看什么电影？
• ¿A qué hora empieza? = 几点开始？
• ¿Quién dirige la película? = 谁导演了这部电影？
• ¿Quién actúa? = 谁演的？

🔹 在电影院：
• comprar la entrada = 买票
• elegir la butaca = 选座位
• comprar palomitas = 买爆米花
• comprar bebida = 买饮料
• ver la película en versión original = 看原声版
• ver la película doblada = 看配音版
• ver la película con subtítulos = 看带字幕版

🔹 表达对电影的看法：
• Me ha gustado mucho = 我很喜欢
• Es la mejor película del año = 这是今年最好的电影
• El final es sorprendente = 结局令人惊讶
• Me ha decepcionado = 让我失望了
• La recomiendo / No la recomiendo = 我推荐/我不推荐
• La película es muy entretenida = 电影很有趣
• El argumento es original = 剧情很原创
• La actuación es excelente = 表演很出色

📌 例子：
• ¿Quieres ir al cine? = 你想去看电影吗？
• Compro palomitas. = 我买爆米花。
• La recomiendo mucho. = 我非常推荐。`,
        ejemplos: [
          {
            espanol: "¿Quieres ir al cine?",
            chino: "你想去看电影吗？",
          },
          {
            espanol: "Compro palomitas.",
            chino: "我买爆米花。",
          },
          {
            espanol: "La recomiendo mucho.",
            chino: "我非常推荐。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Premios y festivales de cine",
        tituloChino: "电影奖项和电影节",
        descripcion: `🔹 FESTIVALES DE CINE (film festivals):
• Festival de Cannes = Cannes Film Festival
• Festival de Venecia = Venice Film Festival
• Festival de Berlín = Berlin Film Festival
• Festival de San Sebastián = San Sebastián Film Festival
• Festival de Sitges = Sitges Film Festival (fantasy/horror)

🔹 PREMIOS IMPORTANTES (important awards):
• Premios Oscar = Academy Awards (Oscars)
• Premios Goya = Goya Awards (Spain)
• Premios Ariel = Ariel Awards (Mexico)
• Palma de Oro = Palme d'Or (Cannes)
• Oso de Oro = Golden Bear (Berlin)
• León de Oro = Golden Lion (Venice)
• Concha de Oro = Golden Shell (San Sebastián)

🔹 VOCABULARIO DE PREMIOS:
• nominado / nominada = nominated
• ganador / ganadora = winner
• mejor película = best film
• mejor director = best director
• mejor actor = best actor
• mejor actriz = best actress
• mejor actor de reparto = best supporting actor
• mejor actriz de reparto = best supporting actress
• mejor guión = best screenplay

📌 EJEMPLOS:
• La película ganó el Oscar a la mejor película extranjera.
• El director fue nominado al Goya.
• El festival de Cannes es muy famoso.`,
        descripcionChino: `🔹 电影节：
• Festival de Cannes = 戛纳电影节
• Festival de Venecia = 威尼斯电影节
• Festival de Berlín = 柏林电影节
• Festival de San Sebastián = 圣塞巴斯蒂安电影节
• Festival de Sitges = 锡切斯电影节（奇幻/恐怖）

🔹 重要奖项：
• Premios Oscar = 奥斯卡奖
• Premios Goya = 戈雅奖（西班牙）
• Premios Ariel = 阿里尔奖（墨西哥）
• Palma de Oro = 金棕榈奖（戛纳）
• Oso de Oro = 金熊奖（柏林）
• León de Oro = 金狮奖（威尼斯）
• Concha de Oro = 金贝壳奖（圣塞巴斯蒂安）

🔹 奖项词汇：
• nominado / nominada = 提名的
• ganador / ganadora = 获奖者
• mejor película = 最佳影片
• mejor director = 最佳导演
• mejor actor = 最佳男演员
• mejor actriz = 最佳女演员
• mejor actor de reparto = 最佳男配角
• mejor actriz de reparto = 最佳女配角
• mejor guión = 最佳剧本

📌 例子：
• La película ganó el Oscar a la mejor película extranjera. = 这部电影获得了奥斯卡最佳外语片奖。
• El director fue nominado al Goya. = 导演获得了戈雅奖提名。
• El festival de Cannes es muy famoso. = 戛纳电影节非常有名。`,
        ejemplos: [
          {
            espanol: "La película ganó el Oscar.",
            chino: "这部电影获得了奥斯卡奖。",
          },
          {
            espanol: "El director fue nominado al Goya.",
            chino: "导演获得了戈雅奖提名。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "cine",
        chino: "电影院",
        ejemplo: "Voy al cine.",
      },
      {
        id: "v2",
        espanol: "película",
        chino: "电影",
        ejemplo: "Una buena película.",
      },
      {
        id: "v3",
        espanol: "actor",
        chino: "男演员",
        ejemplo: "Un actor famoso.",
      },
      {
        id: "v4",
        espanol: "actriz",
        chino: "女演员",
        ejemplo: "Una actriz talentosa.",
      },
      {
        id: "v5",
        espanol: "director",
        chino: "导演",
        ejemplo: "El director de la película.",
      },
      {
        id: "v6",
        espanol: "guionista",
        chino: "编剧",
        ejemplo: "El guionista escribió la historia.",
      },
      {
        id: "v7",
        espanol: "entrada",
        chino: "电影票",
        ejemplo: "Compro la entrada.",
      },
      {
        id: "v8",
        espanol: "palomitas",
        chino: "爆米花",
        ejemplo: "Compro palomitas.",
      },
      {
        id: "v9",
        espanol: "butaca",
        chino: "座位",
        ejemplo: "Elige la butaca.",
      },
      {
        id: "v10",
        espanol: "escena",
        chino: "场景",
        ejemplo: "Una escena emocionante.",
      },
      {
        id: "v11",
        espanol: "final",
        chino: "结局",
        ejemplo: "El final sorprendente.",
      },
      {
        id: "v12",
        espanol: "argumento",
        chino: "剧情",
        ejemplo: "El argumento es interesante.",
      },
      {
        id: "v13",
        espanol: "efectos especiales",
        chino: "特效",
        ejemplo: "Los efectos especiales son buenos.",
      },
      {
        id: "v14",
        espanol: "banda sonora",
        chino: "原声带",
        ejemplo: "La banda sonora es increíble.",
      },
      {
        id: "v15",
        espanol: "acción",
        chino: "动作片",
        ejemplo: "Película de acción.",
      },
      {
        id: "v16",
        espanol: "comedia",
        chino: "喜剧片",
        ejemplo: "Una comedia divertida.",
      },
      {
        id: "v17",
        espanol: "terror",
        chino: "恐怖片",
        ejemplo: "No me gusta el terror.",
      },
      {
        id: "v18",
        espanol: "animación",
        chino: "动画片",
        ejemplo: "Los niños ven animación.",
      },
      {
        id: "v19",
        espanol: "ciencia ficción",
        chino: "科幻片",
        ejemplo: "Me gusta la ciencia ficción.",
      },
      {
        id: "v20",
        espanol: "documental",
        chino: "纪录片",
        ejemplo: "Un documental interesante.",
      },
      {
        id: "v21",
        espanol: "estreno",
        chino: "首映/上映",
        ejemplo: "El estreno es el viernes.",
      },
      {
        id: "v22",
        espanol: "versión original",
        chino: "原声版",
        ejemplo: "Prefiero versión original.",
      },
      {
        id: "v23",
        espanol: "doblada",
        chino: "配音版",
        ejemplo: "La película doblada.",
      },
      {
        id: "v24",
        espanol: "subtítulos",
        chino: "字幕",
        ejemplo: "Con subtítulos en español.",
      },
      {
        id: "v25",
        espanol: "Oscar",
        chino: "奥斯卡",
        ejemplo: "Ganó un Oscar.",
      },
      {
        id: "v26",
        espanol: "Goya",
        chino: "戈雅奖",
        ejemplo: "Premio Goya.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Planeando ir al cine",
        tituloChino: "计划去看电影",
        personajes: ["Ana", "Carlos"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Carlos, ¿quieres ir al cine hoy?",
            traduccion: "卡洛斯，你今天想去看电影吗？",
          },
          {
            personaje: "Carlos",
            texto: "¡Sí! ¿Qué película quieres ver?",
            traduccion: "好啊！你想看什么电影？",
          },
          {
            personaje: "Ana",
            texto: "Hay una de acción nueva. Se llama 'Misión Imposible'.",
            traduccion: "有一部新的动作片。叫'碟中谍'。",
          },
          {
            personaje: "Carlos",
            texto: "Mejor una comedia, ¿no?",
            traduccion: "喜剧更好，对吧？",
          },
          {
            personaje: "Ana",
            texto: "Vale, comedia entonces. ¿A qué hora empieza?",
            traduccion: "好，那就喜剧吧。几点开始？",
          },
          {
            personaje: "Carlos",
            texto: "A las ocho. Nos vemos en el cine.",
            traduccion: "八点。电影院见。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Hablando de una película",
        tituloChino: "谈论电影",
        personajes: ["María", "Pedro"],
        lineas: [
          {
            personaje: "María",
            texto: "Pedro, ¿has visto la última película de Amenábar?",
            traduccion: "佩德罗，你看过阿梅纳巴尔的最新电影吗？",
          },
          {
            personaje: "Pedro",
            texto: "No todavía. ¿Es buena?",
            traduccion: "还没。好看吗？",
          },
          {
            personaje: "María",
            texto: "Sí, me gustó mucho. Es un thriller psicológico.",
            traduccion: "是的，我很喜欢。是心理惊悚片。",
          },
          {
            personaje: "Pedro",
            texto: "¿Quién actúa?",
            traduccion: "谁演的？",
          },
          {
            personaje: "María",
            texto: "Actúa un actor español muy famoso. El final es sorprendente.",
            traduccion: "一位非常著名的西班牙男演员演的。结局令人惊讶。",
          },
          {
            personaje: "Pedro",
            texto: "Entonces la veré este fin de semana.",
            traduccion: "那我这周末看。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "En el cine",
        tituloChino: "在电影院",
        personajes: ["Luis", "Sofía"],
        lineas: [
          {
            personaje: "Luis",
            texto: "Sofía, ¿quieres palomitas?",
            traduccion: "索菲亚，你想要爆米花吗？",
          },
          {
            personaje: "Sofía",
            texto: "Sí, una pequeña. Y también una bebida.",
            traduccion: "是的，小份的。还要一杯饮料。",
          },
          {
            personaje: "Luis",
            texto: "Vale. ¿En qué butaca nos sentamos?",
            traduccion: "好的。我们坐哪个座位？",
          },
          {
            personaje: "Sofía",
            texto: "En la fila del medio, mejor.",
            traduccion: "最好在中间排。",
          },
          {
            personaje: "Luis",
            texto: "De acuerdo. La película empieza en cinco minutos.",
            traduccion: "好的。电影五分钟后开始。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Dando una opinión sobre una película",
        tituloChino: "对电影发表看法",
        personajes: ["Laura", "David"],
        lineas: [
          {
            personaje: "Laura",
            texto: "David, ¿viste la película de la que te hablé?",
            traduccion: "大卫，你看我跟你说的那部电影了吗？",
          },
          {
            personaje: "David",
            texto: "Sí, la vi anoche. Me pareció muy entretenida.",
            traduccion: "是的，我昨晚看了。我觉得很有趣。",
          },
          {
            personaje: "Laura",
            texto: "¿Qué te pareció el final?",
            traduccion: "你觉得结局怎么样？",
          },
          {
            personaje: "David",
            texto: "El final fue sorprendente, no me lo esperaba.",
            traduccion: "结局令人惊讶，我没料到。",
          },
          {
            personaje: "Laura",
            texto: "A mí también me gustó. Los actores están geniales.",
            traduccion: "我也喜欢。演员们很棒。",
          },
          {
            personaje: "David",
            texto: "La recomendaré a mis amigos.",
            traduccion: "我会推荐给我的朋友。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Premios de cine",
        tituloChino: "电影奖项",
        personajes: ["Sofía", "Javier"],
        lineas: [
          {
            personaje: "Sofía",
            texto: "Javier, ¿has visto la gala de los Oscar?",
            traduccion: "哈维尔，你看奥斯卡颁奖典礼了吗？",
          },
          {
            personaje: "Javier",
            texto: "Sí, fue emocionante. ¿Sabes qué película ganó?",
            traduccion: "看了，很激动人心。你知道哪部电影赢了吗？",
          },
          {
            personaje: "Sofía",
            texto: "Creo que ganó 'Oppenheimer' como mejor película.",
            traduccion: "我想《奥本海默》赢得了最佳影片。",
          },
          {
            personaje: "Javier",
            texto: "Sí, y también ganó mejor director y mejor actor.",
            traduccion: "是的，还赢得了最佳导演和最佳男演员。",
          },
          {
            personaje: "Sofía",
            texto: "Merecido. Fue una gran película.",
            traduccion: "实至名归。是一部伟大的电影。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "我想去看电影：Quiero ir al _____",
          preguntaChino: "我想去看电影：Quiero ir al _____",
          respuestaCorrecta: "cine",
          explicacion: "Cine = 电影院",
          pista: "首字母是 c，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c2",
          pregunta: "这部电影很好看：Esta _____ es muy buena.",
          preguntaChino: "这部电影很好看：Esta _____ es muy buena.",
          respuestaCorrecta: "película",
          explicacion: "Película = 电影",
          pista: "首字母是 p，8个字母",
          numeroLetras: 8,
        },
        {
          id: "c3",
          pregunta: "男演员是：_____",
          preguntaChino: "男演员是：_____",
          respuestaCorrecta: "actor",
          explicacion: "Actor = 男演员",
          pista: "首字母是 a，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c4",
          pregunta: "女演员是：_____",
          preguntaChino: "女演员是：_____",
          respuestaCorrecta: "actriz",
          explicacion: "Actriz = 女演员",
          pista: "首字母是 a，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c5",
          pregunta: "我买爆米花：Compro _____",
          preguntaChino: "我买爆米花：Compro _____",
          respuestaCorrecta: "palomitas",
          explicacion: "Palomitas = 爆米花",
          pista: "首字母是 p，9个字母",
          numeroLetras: 9,
        },
        {
          id: "c6",
          pregunta: "电影的结局：el _____ de la película",
          preguntaChino: "电影的结局：el _____ de la película",
          respuestaCorrecta: "final",
          explicacion: "Final = 结局",
          pista: "首字母是 f，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c7",
          pregunta: "电影的原声带：la _____ sonora",
          preguntaChino: "电影的原声带：la _____ sonora",
          respuestaCorrecta: "banda",
          explicacion: "Banda sonora = 原声带",
          pista: "首字母是 b，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c8",
          pregunta: "电影的特效：los _____ especiales",
          preguntaChino: "电影的特效：los _____ especiales",
          respuestaCorrecta: "efectos",
          explicacion: "Efectos especiales = 特效",
          pista: "首字母是 e，7个字母",
          numeroLetras: 7,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "哪部电影让你笑？",
          preguntaChino: "哪部电影让你笑？",
          opciones: ["acción", "drama", "comedia", "terror"],
          respuestaCorrecta: "comedia",
          explicacion: "喜剧片让人笑",
        },
        {
          id: "s2",
          pregunta: "谁导演电影？",
          preguntaChino: "谁导演电影？",
          opciones: ["actor", "director", "guionista", "productor"],
          respuestaCorrecta: "director",
          explicacion: "导演导演电影",
        },
        {
          id: "s3",
          pregunta: "你在哪里买电影票？",
          preguntaChino: "你在哪里买电影票？",
          opciones: ["en la butaca", "en la taquilla", "en la pantalla", "en la escena"],
          respuestaCorrecta: "en la taquilla",
          explicacion: "在售票处买票",
        },
        {
          id: "s4",
          pregunta: "哪种电影让人害怕？",
          preguntaChino: "哪种电影让人害怕？",
          opciones: ["comedia", "romance", "terror", "animación"],
          respuestaCorrecta: "terror",
          explicacion: "恐怖片让人害怕",
        },
        {
          id: "s5",
          pregunta: "你如何说'我很喜欢这部电影'？",
          preguntaChino: "你如何说'我很喜欢这部电影'？",
          opciones: ["No me gusta", "Me ha gustado mucho", "Es aburrida", "La recomiendo"],
          respuestaCorrecta: "Me ha gustado mucho",
          explicacion: "Me ha gustado mucho = 我很喜欢",
        },
        {
          id: "s6",
          pregunta: "¿Qué significa 'versión original'?",
          preguntaChino: "'versión original'是什么意思？",
          opciones: ["配音版", "原声版", "剪辑版", "导演剪辑版"],
          respuestaCorrecta: "原声版",
          explicacion: "Versión original = 原声版",
        },
        {
          id: "s7",
          pregunta: "¿Cómo se dice '字幕' en español?",
          preguntaChino: "西班牙语中'字幕'怎么说？",
          opciones: ["doblaje", "subtítulos", "diálogo", "escena"],
          respuestaCorrecta: "subtítulos",
          explicacion: "Subtítulos = 字幕",
        },
        {
          id: "s8",
          pregunta: "¿Qué premio es el más importante en Hollywood?",
          preguntaChino: "好莱坞最重要的奖项是什么？",
          opciones: ["Goya", "Oscar", "Palma de Oro", "Concha de Oro"],
          respuestaCorrecta: "Oscar",
          explicacion: "El Oscar es el premio más importante de Hollywood",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "动作片有很多打斗场面。",
          preguntaChino: "动作片有很多打斗场面。",
          respuestaCorrecta: true,
          explicacion: "对。Película de acción = 动作片",
        },
        {
          id: "vf2",
          pregunta: "导演是写剧本的人。",
          preguntaChino: "导演是写剧本的人。",
          respuestaCorrecta: false,
          explicacion: "错。导演指导拍摄，编剧写剧本",
        },
        {
          id: "vf3",
          pregunta: "动画片适合儿童。",
          preguntaChino: "动画片适合儿童。",
          respuestaCorrecta: true,
          explicacion: "对。Animación = 动画片",
        },
        {
          id: "vf4",
          pregunta: "爆米花通常在电影院吃。",
          preguntaChino: "爆米花通常在电影院吃。",
          respuestaCorrecta: true,
          explicacion: "对。Palomitas = 爆米花",
        },
        {
          id: "vf5",
          pregunta: "纪录片是虚构的故事。",
          preguntaChino: "纪录片是虚构的故事。",
          respuestaCorrecta: false,
          explicacion: "错。纪录片是真实的，不是虚构的",
        },
        {
          id: "vf6",
          pregunta: "El 'guionista' escribe la historia de la película.",
          preguntaChino: "'Guionista'写电影的故事。",
          respuestaCorrecta: true,
          explicacion: "对。Guionista = 编剧",
        },
        {
          id: "vf7",
          pregunta: "La 'secuela' es la primera película de una saga.",
          preguntaChino: "'Secuela'是系列的第一部电影。",
          respuestaCorrecta: false,
          explicacion: "错。Secuela = 续集",
        },
        {
          id: "vf8",
          pregunta: "Los 'efectos especiales' son importantes en las películas de ciencia ficción.",
          preguntaChino: "'Efectos especiales'在科幻片中很重要。",
          respuestaCorrecta: true,
          explicacion: "对。特效在科幻片中很常见",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "acción",
              derecha: "动作片",
            },
            {
              izquierda: "comedia",
              derecha: "喜剧片",
            },
            {
              izquierda: "terror",
              derecha: "恐怖片",
            },
            {
              izquierda: "animación",
              derecha: "动画片",
            },
            {
              izquierda: "ciencia ficción",
              derecha: "科幻片",
            },
            {
              izquierda: "documental",
              derecha: "纪录片",
            },
            {
              izquierda: "thriller",
              derecha: "惊悚片",
            },
            {
              izquierda: "romance",
              derecha: "爱情片",
            },
            {
              izquierda: "drama",
              derecha: "剧情片",
            },
            {
              izquierda: "actor",
              derecha: "男演员",
            },
            {
              izquierda: "actriz",
              derecha: "女演员",
            },
            {
              izquierda: "director",
              derecha: "导演",
            },
            {
              izquierda: "película",
              derecha: "电影",
            },
            {
              izquierda: "cine",
              derecha: "电影院",
            },
          ],
          explicacion: "将电影词汇与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["cine", "ir", "al", "quieres", "¿", "?"],
          respuestaCorrecta: "¿Quieres ir al cine?",
          explicacion: "正确的句子是：¿Quieres ir al cine?（你想去看电影吗？）",
        },
        {
          id: "o2",
          palabras: ["acción", "me", "gustan", "Las", "películas", "de", "."],
          respuestaCorrecta: "Me gustan las películas de acción.",
          explicacion: "正确的句子是：Me gustan las películas de acción.（我喜欢动作片。）",
        },
        {
          id: "o3",
          palabras: ["final", "sorprendente", "El", "es", "."],
          respuestaCorrecta: "El final es sorprendente.",
          explicacion: "正确的句子是：El final es sorprendente.（结局令人惊讶。）",
        },
        {
          id: "o4",
          palabras: ["estreno", "es", "viernes", "El", "el", "."],
          respuestaCorrecta: "El estreno es el viernes.",
          explicacion: "正确的顺序是：El estreno es el viernes.",
        },
        {
          id: "o5",
          palabras: ["versión", "prefiero", "Yo", "original", "."],
          respuestaCorrecta: "Yo prefiero la versión original.",
          explicacion: "正确的顺序是：Yo prefiero la versión original.",
        },
        {
          id: "o6",
          palabras: ["Oscar", "ganó", "La", "mejor", "película", "el", "."],
          respuestaCorrecta: "La mejor película ganó el Oscar.",
          explicacion: "正确的顺序是：La mejor película ganó el Oscar.",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我们去看电影吧。",
          respuestaEsperada: "Vamos al cine.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "这部电影很有趣。",
          respuestaEsperada: "Esta película es muy divertida.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "我最喜欢的男演员是...",
          respuestaEsperada: "Mi actor favorito es...",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "电影几点开始？",
          respuestaEsperada: "¿A qué hora empieza la película?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "我喜欢看原声版带字幕的电影。",
          respuestaEsperada: "Me gusta ver películas en versión original con subtítulos.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "这部电影的特效令人难以置信。",
          respuestaEsperada: "Los efectos especiales de esta película son increíbles.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "这部电影的结局很令人惊讶。",
          respuestaEsperada: "El final de esta película es muy sorprendente.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "他获得了奥斯卡最佳男主角提名。",
          respuestaEsperada: "Fue nominado al Oscar al mejor actor.",
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
        instruccion: "用正确的电影词汇完成对话。",
        instruccionChino: "用正确的电影词汇完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿Quieres ir al _____?",
            respuesta: "cine",
          },
          {
            personaje: "B",
            texto: "Sí, ¿qué _____ quieres ver?",
            respuesta: "película",
          },
          {
            personaje: "A",
            texto: "Una de _____. ¿Te gusta?",
            respuesta: "acción / comedia",
          },
          {
            personaje: "B",
            texto: "Vale. ¿A qué hora _____?",
            respuesta: "empieza",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "responder",
        titulo: "Responde las preguntas",
        tituloChino: "回答问题",
        instruccion: "Responde las siguientes preguntas sobre cine en español.",
        instruccionChino: "用西班牙语回答以下关于电影的问题。",
        preguntas: [
          {
            pregunta: "¿Qué tipo de películas te gustan?",
            respuestaEsperada: "Me gustan las películas de (acción / comedia / ciencia ficción).",
          },
          {
            pregunta: "¿Cuál es tu película favorita?",
            respuestaEsperada: "Mi película favorita es (título).",
          },
          {
            pregunta: "¿Quién es tu actor favorito?",
            respuestaEsperada: "Mi actor favorito es (nombre).",
          },
          {
            pregunta: "¿Prefieres ver películas en el cine o en casa?",
            respuestaEsperada: "Prefiero verlas en (casa / el cine) porque...",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "recomendar",
        titulo: "Recomienda una película",
        tituloChino: "推荐一部电影",
        instruccion: "Escribe una recomendación de una película que te guste (6-8 líneas).",
        instruccionChino: "写一篇你喜欢的电影的推荐（6-8行）。",
        ejemplo:
          "Te recomiendo la película 'El secreto de sus ojos'. Es un thriller argentino muy emocionante. La historia trata sobre un crimen sin resolver. Los actores están fantásticos. El final es sorprendente. La recomiendo mucho a todos los que les gusta el suspenso.",
      },
      {
        id: "ep4",
        tipo: "comparar",
        titulo: "Compara dos películas",
        tituloChino: "比较两部电影",
        instruccion: "Escribe 5 diferencias entre dos películas que hayas visto.",
        instruccionChino: "写出你看过的两部电影的5个不同之处。",
        ejemplo:
          "1. Una es de acción y la otra es de comedia. 2. Una es americana y la otra es española. 3. El final de una es feliz y el de la otra es triste...",
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Cuál es tu género de película favorito? ¿Por qué?",
        preguntaChino: "你最喜欢的电影类型是什么？为什么？",
        sugerencia: "Mi género favorito es la comedia porque me hace reír.",
        sugerenciaChino: "Mi género favorito es la comedia porque me hace reír.",
      },
      {
        id: "pa2",
        pregunta: "Describe la última película que viste.",
        preguntaChino: "描述你最近看的一部电影。",
        sugerencia: "La última película que vi fue... Trata sobre... Me gustó porque...",
        sugerenciaChino: "La última película que vi fue... Trata sobre... Me gustó porque...",
      },
      {
        id: "pa3",
        pregunta: "¿Prefieres ver películas en el cine o en casa? ¿Por qué?",
        preguntaChino: "你更喜欢在电影院还是在家看电影？为什么？",
        sugerencia: "Prefiero ver películas en casa porque es más cómodo.",
        sugerenciaChino: "Prefiero ver películas en casa porque es más cómodo.",
      },
      {
        id: "pa4",
        pregunta: "¿Qué opinas de ver películas en versión original con subtítulos?",
        preguntaChino: "你怎么看看原声版带字幕的电影？",
        sugerencia: "Me parece mejor porque se escuchan las voces reales de los actores.",
        sugerenciaChino: "Me parece mejor porque se escuchan las voces reales de los actores.",
      },
      {
        id: "pa5",
        pregunta: "¿Cuál es la mejor película que has visto este año?",
        preguntaChino: "你今年看过最好的电影是什么？",
        sugerencia: "La mejor película que he visto este año es... porque...",
        sugerenciaChino: "La mejor película que he visto este año es... porque...",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '电影' en español?",
        preguntaChino: "西班牙语中'电影'怎么说？",
        respuestaSugerida: "película",
        respuestaSugeridaChino: "película",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '电影院' en español?",
        preguntaChino: "西班牙语中'电影院'怎么说？",
        respuestaSugerida: "cine",
        respuestaSugeridaChino: "cine",
      },
      {
        id: "p3",
        pregunta: "¿Qué significa 'El final es sorprendente'?",
        preguntaChino: "'El final es sorprendente'是什么意思？",
        respuestaSugerida: "结局令人惊讶",
        respuestaSugeridaChino: "The ending is surprising",
      },
      {
        id: "p4",
        pregunta: "¿Cómo recomiendas una película a un amigo?",
        preguntaChino: "你如何向朋友推荐一部电影？",
        respuestaSugerida: "Te recomiendo esta película, es muy buena.",
        respuestaSugeridaChino: "Te recomiendo esta película, es muy buena.",
      },
      {
        id: "p5",
        pregunta: "¿Qué significa 'versión original'?",
        preguntaChino: "'versión original'是什么意思？",
        respuestaSugerida: "Original version with original audio",
        respuestaSugeridaChino: "原声版",
      },
      {
        id: "p6",
        pregunta: "¿Cómo se dice '爆米花' en español?",
        preguntaChino: "西班牙语中'爆米花'怎么说？",
        respuestaSugerida: "palomitas",
        respuestaSugeridaChino: "palomitas",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Comparativos de superioridad (más... que)",
        tituloChino: "优越性比较级（比...更）",
        descripcion: `Para decir que algo es MÁS que otra cosa:

🔹 ESTRUCTURA: más + adjetivo/adverbio/sustantivo + que

📌 EJEMPLOS CON ADJETIVOS:
• María es más alta que Pedro.
• Este coche es más rápido que el otro.
• Mi casa es más grande que la tuya.
• El invierno es más frío que la primavera.

📌 EJEMPLOS CON ADVERBIOS:
• Juan corre más rápido que Carlos.
• Ella estudia más intensamente que su compañero.

📌 EJEMPLOS CON SUSTANTIVOS:
• Tengo más libros que tú.
• Hay más gente hoy que ayer.
• Gano más dinero que mi hermano.

📌 FORMA NEGATIVA:
• No soy más alto que tú.
• Este libro no es más interesante que el otro.

❌ ERROR COMÚN:
No confundas "más... que" con "más... de". "Más... de" se usa con números: más de diez personas.`,
        descripcionChino: `表示某物比另一物更多/更厉害：

🔹 结构：más + 形容词/副词/名词 + que

📌 形容词例子：
• María es más alta que Pedro. = 玛丽亚比佩德罗高。
• Este coche es más rápido que el otro. = 这辆车比另一辆快。
• Mi casa es más grande que la tuya. = 我的房子比你的大。
• El invierno es más frío que la primavera. = 冬天比春天冷。

📌 副词例子：
• Juan corre más rápido que Carlos. = 胡安比卡洛斯跑得快。
• Ella estudia más intensamente que su compañero. = 她比她的同学学得更专注。

📌 名词例子：
• Tengo más libros que tú. = 我比你书多。
• Hay más gente hoy que ayer. = 今天的人比昨天多。
• Gano más dinero que mi hermano. = 我比我哥哥赚得多。

📌 否定形式：
• No soy más alto que tú. = 我不比你高。
• Este libro no es más interesante que el otro. = 这本书不比另一本有趣。

❌ 常见错误：
不要混淆 "más... que" 和 "más... de"。"Más... de" 用于数字：más de diez personas（超过十个人）。`,
        ejemplos: [
          {
            espanol: "María es más alta que Pedro.",
            chino: "玛丽亚比佩德罗高。",
          },
          {
            espanol: "Este coche es más rápido.",
            chino: "这辆车更快。",
          },
          {
            espanol: "Tengo más libros que tú.",
            chino: "我比你书多。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Comparativos de inferioridad e igualdad",
        tituloChino: "劣等性和相等性比较级",
        descripcion: `🔹 INFERIORIDAD (menos... que):
Estructura: menos + adjetivo/adverbio/sustantivo + que

📌 EJEMPLOS:
• Este libro es menos interesante que el otro.
• Juan corre menos rápido que Carlos.
• Tengo menos dinero que tú.
• Esta ciudad es menos grande que Madrid.

🔹 IGUALDAD (tan... como / tanto... como):

Para ADJETIVOS y ADVERBIOS:
• tan + adjetivo/adverbio + como
  • Soy tan alto como mi padre.
  • Ella corre tan rápido como él.
  • Esta película es tan buena como la otra.

Para SUSTANTIVOS:
• tanto/a/os/as + sustantivo + como
  • Tengo tantos libros como tú.
  • Ella tiene tanta paciencia como su madre.
  • Hay tantas personas como ayer.

📌 EJEMPLOS COMPLETOS:
• Este móvil es menos caro que el tuyo.
• Mi perro es tan grande como el tuyo.
• Tengo tanto interés como tú en aprender.`,
        descripcionChino: `🔹 劣等性（比...少）：
结构：menos + 形容词/副词/名词 + que

📌 例子：
• Este libro es menos interesante que el otro. = 这本书不如另一本有趣。
• Juan corre menos rápido que Carlos. = 胡安跑得不如卡洛斯快。
• Tengo menos dinero que tú. = 我的钱比你少。
• Esta ciudad es menos grande que Madrid. = 这个城市不如马德里大。

🔹 相等性（和...一样）：

形容词和副词：
• tan + 形容词/副词 + como = 和...一样...
  • Soy tan alto como mi padre. = 我和我父亲一样高。
  • Ella corre tan rápido como él. = 她和他跑得一样快。
  • Esta película es tan buena como la otra. = 这部电影和另一部一样好。

名词：
• tanto/a/os/as + 名词 + como = 和...一样多的...
  • Tengo tantos libros como tú. = 我和你书一样多。
  • Ella tiene tanta paciencia como su madre. = 她和她妈妈一样有耐心。
  • Hay tantas personas como ayer. = 人数和昨天一样多。

📌 完整例子：
• Este móvil es menos caro que el tuyo. = 这部手机比你的便宜。
• Mi perro es tan grande como el tuyo. = 我的狗和你的狗一样大。
• Tengo tanto interés como tú en aprender. = 我和你对学习一样有兴趣。`,
        ejemplos: [
          {
            espanol: "Este libro es menos interesante.",
            chino: "这本书没那么有趣。",
          },
          {
            espanol: "Soy tan alto como mi padre.",
            chino: "我和我父亲一样高。",
          },
          {
            espanol: "Tengo tantos libros como tú.",
            chino: "我和你书一样多。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Comparativos irregulares",
        tituloChino: "不规则比较级",
        descripcion: `Algunos adjetivos tienen formas especiales:

🔹 TABLA DE COMPARATIVOS IRREGULARES:

| Adjetivo | Comparativo | Significado |
|----------|-------------|-------------|
| bueno (good) | mejor | better |
| malo (bad) | peor | worse |
| grande (big/old) | mayor | bigger/older |
| pequeño (small/young) | menor | smaller/younger |

📌 EJEMPLOS:

• Este libro es mejor que el otro. (no "más bueno")
• Esta película es peor que la de ayer. (no "más mala")
• Mi hermano es mayor que yo. (older)
• Mi hermana es menor que yo. (younger)

🔹 COMPARATIVOS CON "MEJOR" Y "PEOR":
• Mejor = better (bueno → mejor)
• Peor = worse (malo → peor)

🔹 COMPARATIVOS CON "MAYOR" Y "MENOR":
• Mayor = older (edad) / bigger (tamaño)
• Menor = younger (edad) / smaller (tamaño)

📌 IMPORTANTE:
"Mayor" y "menor" se usan principalmente para edad y tamaño. Para tamaño también se puede usar "más grande" y "más pequeño".

❌ ERROR COMÚN:
No digas "más bueno" o "más malo" en lugar de "mejor" y "peor". Son incorrectos en comparativos.`,
        descripcionChino: `一些形容词有特殊的形式：

🔹 不规则比较级表：

| 形容词 | 比较级 | 意思 |
|--------|--------|------|
| bueno (好) | mejor | 更好 |
| malo (坏) | peor | 更坏 |
| grande (大/年长) | mayor | 更大/更年长 |
| pequeño (小/年轻) | menor | 更小/更年轻 |

📌 例子：

• Este libro es mejor que el otro. = 这本书比另一本更好。（不是 "más bueno"）
• Esta película es peor que la de ayer. = 这部电影比昨天的更差。（不是 "más mala"）
• Mi hermano es mayor que yo. = 我哥哥比我大。
• Mi hermana es menor que yo. = 我妹妹比我小。

🔹 "MEJOR" 和 "PEOR" 的比较级：
• Mejor = 更好（bueno → mejor）
• Peor = 更差（malo → peor）

🔹 "MAYOR" 和 "MENOR" 的比较级：
• Mayor = 更年长（年龄）/ 更大（尺寸）
• Menor = 更年轻（年龄）/ 更小（尺寸）

📌 重要提示：
"Mayor" 和 "menor" 主要用于年龄和尺寸。对于尺寸，也可以使用 "más grande" 和 "más pequeño"。

❌ 常见错误：
不要用 "más bueno" 或 "más malo" 代替 "mejor" 和 "peor"。它们在比较级中是错误的。`,
        ejemplos: [
          {
            espanol: "Este libro es mejor.",
            chino: "这本书更好。",
          },
          {
            espanol: "Mi hermano es mayor que yo.",
            chino: "我哥哥比我大。",
          },
          {
            espanol: "Ella es la menor.",
            chino: "她是最小的。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Superlativos",
        tituloChino: "最高级",
        descripcion: `🔹 SUPERLATIVO RELATIVO (el/la más... de):
Expresa que algo es el máximo dentro de un grupo.

Estructura: el/la/los/las + más/menos + adjetivo + de

📌 EJEMPLOS:
• Pedro es el más alto de la clase.
• María es la más inteligente de su familia.
• Estos son los mejores días de mi vida.
• Esta es la película menos interesante de todas.

🔹 SUPERLATIVO ABSOLUTO (muy + adjetivo / adjetivo + -ísimo):
Expresa un grado muy alto sin comparación.

Estructura 1: muy + adjetivo
• muy bueno = very good
• muy interesante = very interesting

Estructura 2: adjetivo + -ísimo/a/os/as
• buenísimo = extremely good
• interesantísimo = extremely interesting
• altísimo = extremely tall
• riquísimo = extremely rich / delicious

📌 EJEMPLOS DE -ÍSIMO:
• La comida está buenísima. (muy buena)
• Es un hombre altísimo. (muy alto)
• Tu casa es grandísima. (muy grande)
• La película fue malísima. (muy mala)

🔹 SUPERLATIVOS IRREGULARES:

| Adjetivo | Superlativo |
|----------|-------------|
| bueno | óptimo / buenísimo |
| malo | pésimo / malísimo |
| grande | máximo / grandísimo |
| pequeño | mínimo / pequeñísimo |

📌 EJEMPLOS:
• Es un óptimo profesional. (el mejor)
• La calidad es pésima. (muy mala)
• Este es el máximo responsable. (el más grande)
• El riesgo es mínimo. (el más pequeño)

❌ ERROR COMÚN:
No confundas el superlativo relativo (el más alto de la clase) con el absoluto (altísimo).`,
        descripcionChino: `🔹 相对最高级（el/la más... de）：
表示某物在某个群体中是最...的。

结构：el/la/los/las + más/menos + 形容词 + de

📌 例子：
• Pedro es el más alto de la clase. = 佩德罗是班里最高的。
• María es la más inteligente de su familia. = 玛丽亚是她家最聪明的。
• Estos son los mejores días de mi vida. = 这些是我生命中最好的日子。
• Esta es la película menos interesante de todas. = 这是所有电影中最不有趣的。

🔹 绝对最高级（muy + 形容词 / 形容词 + -ísimo）：
表达一个非常高的程度，不进行比较。

结构1：muy + 形容词
• muy bueno = 非常好
• muy interesante = 非常有趣

结构2：形容词 + -ísimo/a/os/as
• buenísimo = 极好
• interesantísimo = 极其有趣
• altísimo = 极高
• riquísimo = 极其富有/美味

📌 -ÍSIMO 的例子：
• La comida está buenísima. = 食物好极了。（muy buena）
• Es un hombre altísimo. = 他是一个非常高的人。（muy alto）
• Tu casa es grandísima. = 你的房子非常大。（muy grande）
• La película fue malísima. = 电影糟透了。（muy mala）

🔹 不规则最高级：

| 形容词 | 最高级 |
|--------|--------|
| bueno | óptimo / buenísimo |
| malo | pésimo / malísimo |
| grande | máximo / grandísimo |
| pequeño | mínimo / pequeñísimo |

📌 例子：
• Es un óptimo profesional. = 他是一个优秀的专业人士。（最好的）
• La calidad es pésima. = 质量极差。（非常差）
• Este es el máximo responsable. = 这是最高负责人。（最大的）
• El riesgo es mínimo. = 风险很小。（最小的）

❌ 常见错误：
不要混淆相对最高级（el más alto de la clase）和绝对最高级（altísimo）。`,
        ejemplos: [
          {
            espanol: "Pedro es el más alto de la clase.",
            chino: "佩德罗是班里最高的。",
          },
          {
            espanol: "Es altísimo.",
            chino: "他非常高。",
          },
          {
            espanol: "Es un día buenísimo.",
            chino: "这是非常好的一天。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "más... que",
        chino: "比...更",
        ejemplo: "Más alto que.",
      },
      {
        id: "v2",
        espanol: "menos... que",
        chino: "比...少",
        ejemplo: "Menos interesante que.",
      },
      {
        id: "v3",
        espanol: "tan... como",
        chino: "和...一样",
        ejemplo: "Tan alto como.",
      },
      {
        id: "v4",
        espanol: "tanto... como",
        chino: "和...一样多",
        ejemplo: "Tantos libros como.",
      },
      {
        id: "v5",
        espanol: "mejor",
        chino: "更好",
        ejemplo: "Este es mejor.",
      },
      {
        id: "v6",
        espanol: "peor",
        chino: "更差",
        ejemplo: "Ese es peor.",
      },
      {
        id: "v7",
        espanol: "mayor",
        chino: "更大/更老",
        ejemplo: "Mi hermano mayor.",
      },
      {
        id: "v8",
        espanol: "menor",
        chino: "更小/更年轻",
        ejemplo: "Mi hermana menor.",
      },
      {
        id: "v9",
        espanol: "el más",
        chino: "最(阳性)",
        ejemplo: "El más alto.",
      },
      {
        id: "v10",
        espanol: "la más",
        chino: "最(阴性)",
        ejemplo: "La más inteligente.",
      },
      {
        id: "v11",
        espanol: "muy",
        chino: "非常",
        ejemplo: "Muy bueno.",
      },
      {
        id: "v12",
        espanol: "-ísimo",
        chino: "极其",
        ejemplo: "Buenísimo.",
      },
      {
        id: "v13",
        espanol: "óptimo",
        chino: "极好",
        ejemplo: "Un óptimo trabajo.",
      },
      {
        id: "v14",
        espanol: "pésimo",
        chino: "极差",
        ejemplo: "Una pésima idea.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Comparando ciudades",
        tituloChino: "比较城市",
        personajes: ["Ana", "Carlos"],
        lineas: [
          {
            personaje: "Ana",
            texto: "¿Prefieres Madrid o Barcelona?",
            traduccion: "你喜欢马德里还是巴塞罗那？",
          },
          {
            personaje: "Carlos",
            texto: "Madrid es más grande que Barcelona.",
            traduccion: "马德里比巴塞罗那大。",
          },
          {
            personaje: "Ana",
            texto: "Sí, pero Barcelona tiene menos tráfico.",
            traduccion: "是的，但巴塞罗那交通更少。",
          },
          {
            personaje: "Carlos",
            texto: "Barcelona es tan interesante como Madrid.",
            traduccion: "巴塞罗那和马德里一样有趣。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Comparando precios",
        tituloChino: "比较价格",
        personajes: ["María", "Pedro"],
        lineas: [
          {
            personaje: "María",
            texto: "¿Dónde compras la ropa?",
            traduccion: "你在哪里买衣服？",
          },
          {
            personaje: "Pedro",
            texto: "En el centro. Es más barato.",
            traduccion: "在市中心。更便宜。",
          },
          {
            personaje: "María",
            texto: "¿Tienen tanta variedad?",
            traduccion: "他们有这么多种类吗？",
          },
          {
            personaje: "Pedro",
            texto: "Sí, tantas opciones como las grandes tiendas.",
            traduccion: "是的，和大店一样多的选择。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Comparando personas",
        tituloChino: "比较人物",
        personajes: ["Luis", "Sofía"],
        lineas: [
          {
            personaje: "Luis",
            texto: "Sofía, ¿quién es la más alta?",
            traduccion: "索菲亚，谁最高？",
          },
          {
            personaje: "Sofía",
            texto: "Laura es la más alta. Tú eres el más bajo.",
            traduccion: "劳拉最高。你是最矮的。",
          },
          {
            personaje: "Luis",
            texto: "Carlos es el más inteligente.",
            traduccion: "卡洛斯最聪明。",
          },
          {
            personaje: "Sofía",
            texto: "No, yo soy más inteligente que Carlos.",
            traduccion: "不，我比卡洛斯聪明。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Superlativos absolutos",
        tituloChino: "绝对最高级",
        personajes: ["Laura", "David"],
        lineas: [
          {
            personaje: "Laura",
            texto: "David, ¿qué te pareció la comida?",
            traduccion: "大卫，你觉得食物怎么样？",
          },
          {
            personaje: "David",
            texto: "Estaba buenísima. Nunca había comido algo tan rico.",
            traduccion: "好极了。我从未吃过这么好吃的东西。",
          },
          {
            personaje: "Laura",
            texto: "¿Y el servicio?",
            traduccion: "服务呢？",
          },
          {
            personaje: "David",
            texto: "Fue pésimo. Tardaron muchísimo en traer la comida.",
            traduccion: "糟透了。他们花了很长时间才上菜。",
          },
          {
            personaje: "Laura",
            texto: "¿Volverías?",
            traduccion: "你会再去吗？",
          },
          {
            personaje: "David",
            texto: "Por la comida sí, por el servicio no.",
            traduccion: "为了食物会，为了服务不会。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Comparando edades",
        tituloChino: "比较年龄",
        personajes: ["Sofía", "Javier"],
        lineas: [
          {
            personaje: "Sofía",
            texto: "Javier, ¿cuántos años tiene tu hermano?",
            traduccion: "哈维尔，你哥哥多大了？",
          },
          {
            personaje: "Javier",
            texto: "Mi hermano es mayor que yo. Tiene 30 años.",
            traduccion: "我哥哥比我大。他30岁了。",
          },
          {
            personaje: "Sofía",
            texto: "¿Y tu hermana?",
            traduccion: "你妹妹呢？",
          },
          {
            personaje: "Javier",
            texto: "Mi hermana es menor. Tiene 22 años.",
            traduccion: "我妹妹更小。她22岁。",
          },
          {
            personaje: "Sofía",
            texto: "Entonces tú eres el mediano.",
            traduccion: "那么你是中间的那个。",
          },
          {
            personaje: "Javier",
            texto: "Sí, tengo 26 años. Estoy entre los dos.",
            traduccion: "是的，我26岁。介于两者之间。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "为了说'比...更'：más + 形容词 + _____",
          preguntaChino: "为了说'比...更'：más + 形容词 + _____",
          respuestaCorrecta: "que",
          explicacion: "Estructura: más... que",
          pista: "首字母是 q，3个字母",
          numeroLetras: 3,
        },
        {
          id: "c2",
          pregunta: "为了说'和...一样'：tan + 形容词 + _____",
          preguntaChino: "为了说'和...一样'：tan + 形容词 + _____",
          respuestaCorrecta: "como",
          explicacion: "Estructura: tan... como",
          pista: "首字母是 c，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c3",
          pregunta: "比较级'更好'是：_____",
          preguntaChino: "比较级'更好'是：_____",
          respuestaCorrecta: "mejor",
          explicacion: "Bueno → mejor",
          pista: "首字母是 m，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c4",
          pregunta: "比较级'更差'是：_____",
          preguntaChino: "比较级'更差'是：_____",
          respuestaCorrecta: "peor",
          explicacion: "Malo → peor",
          pista: "首字母是 p，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c5",
          pregunta: "为了说'最...' (阳性)：el _____",
          preguntaChino: "为了说'最...' (阳性)：el _____",
          respuestaCorrecta: "más",
          explicacion: "El más + adjetivo",
          pista: "首字母是 m，3个字母",
          numeroLetras: 3,
        },
        {
          id: "c6",
          pregunta: "为了说'非常好'：muy _____",
          preguntaChino: "为了说'非常好'：muy _____",
          respuestaCorrecta: "bueno",
          explicacion: "Muy bueno = 非常好",
          pista: "首字母是 b，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c7",
          pregunta: "为了说'好极了' (绝对最高级)：buen_____",
          preguntaChino: "为了说'好极了' (绝对最高级)：buen_____",
          respuestaCorrecta: "ísimo",
          explicacion: "Bueno → buenísimo",
          pista: "首字母是 í，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c8",
          pregunta: "为了说'比...少'：menos + 形容词 + _____",
          preguntaChino: "为了说'比...少'：menos + 形容词 + _____",
          respuestaCorrecta: "que",
          explicacion: "Menos... que = 比...少",
          pista: "首字母是 q，3个字母",
          numeroLetras: 3,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "如何说'玛丽亚比佩德罗高'？",
          preguntaChino: "如何说'玛丽亚比佩德罗高'？",
          opciones: [
            "María es más alta que Pedro",
            "María es tan alta como Pedro",
            "María es menos alta que Pedro",
            "María es la más alta",
          ],
          respuestaCorrecta: "María es más alta que Pedro",
          explicacion: "más + alta + que",
        },
        {
          id: "s2",
          pregunta: "如何说'我和我父亲一样高'？",
          preguntaChino: "如何说'我和我父亲一样高'？",
          opciones: [
            "Soy más alto que mi padre",
            "Soy tan alto como mi padre",
            "Soy menos alto que mi padre",
            "Soy el más alto",
          ],
          respuestaCorrecta: "Soy tan alto como mi padre",
          explicacion: "tan + alto + como",
        },
        {
          id: "s3",
          pregunta: "哪个是'更好'的比较级？",
          preguntaChino: "哪个是'更好'的比较级？",
          opciones: ["bueno", "mejor", "buenísimo", "óptimo"],
          respuestaCorrecta: "mejor",
          explicacion: "Bueno → mejor",
        },
        {
          id: "s4",
          pregunta: "如何说'佩德罗是班里最高的'？",
          preguntaChino: "如何说'佩德罗是班里最高的'？",
          opciones: [
            "Pedro es más alto",
            "Pedro es muy alto",
            "Pedro es el más alto de la clase",
            "Pedro es altísimo",
          ],
          respuestaCorrecta: "Pedro es el más alto de la clase",
          explicacion: "el más alto de la clase",
        },
        {
          id: "s5",
          pregunta: "哪个是'非常好'的绝对最高级？",
          preguntaChino: "哪个是'非常好'的绝对最高级？",
          opciones: ["bueno", "mejor", "muy bueno", "buenísimo"],
          respuestaCorrecta: "buenísimo",
          explicacion: "adjetivo + -ísimo",
        },
        {
          id: "s6",
          pregunta: "如何说'这本书比那本更差'？",
          preguntaChino: "如何说'这本书比那本更差'？",
          opciones: [
            "Este libro es mejor que ese",
            "Este libro es peor que ese",
            "Este libro es tan bueno como ese",
            "Este libro es menos bueno",
          ],
          respuestaCorrecta: "Este libro es peor que ese",
          explicacion: "Peor = 更差",
        },
        {
          id: "s7",
          pregunta: "如何说'我有和你一样多的钱'？",
          preguntaChino: "如何说'我有和你一样多的钱'？",
          opciones: [
            "Tengo más dinero que tú",
            "Tengo tan dinero como tú",
            "Tengo tanto dinero como tú",
            "Tengo menos dinero que tú",
          ],
          respuestaCorrecta: "Tengo tanto dinero como tú",
          explicacion: "Tanto + sustantivo + como",
        },
        {
          id: "s8",
          pregunta: "哪个是正确的最高级形式？",
          preguntaChino: "哪个是正确的最高级形式？",
          opciones: ["grande → grandísimo", "bueno → buenísimo", "malo → malísimo", "todas las anteriores"],
          respuestaCorrecta: "todas las anteriores",
          explicacion: "Todas son formas correctas",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Más... que'用于比较优越性。",
          preguntaChino: "'Más... que'用于比较优越性。",
          respuestaCorrecta: true,
          explicacion: "对。más... que = 比...更",
        },
        {
          id: "vf2",
          pregunta: "不规则比较级'mejor'来自'malo'。",
          preguntaChino: "不规则比较级'mejor'来自'malo'。",
          respuestaCorrecta: false,
          explicacion: "错。Mejor来自bueno",
        },
        {
          id: "vf3",
          pregunta: "'Tan... como'表示'和...一样'。",
          preguntaChino: "'Tan... como'表示'和...一样'。",
          respuestaCorrecta: true,
          explicacion: "对。tan... como = 和...一样",
        },
        {
          id: "vf4",
          pregunta: "最高级'el más'用于比较两个东西。",
          preguntaChino: "最高级'el más'用于比较两个东西。",
          respuestaCorrecta: false,
          explicacion: "错。最高级用于三个或以上",
        },
        {
          id: "vf5",
          pregunta: "'Mayor'可以表示'更大'或'更年长'。",
          preguntaChino: "'Mayor'可以表示'更大'或'更年长'。",
          respuestaCorrecta: true,
          explicacion: "对。mayor有两个意思",
        },
        {
          id: "vf6",
          pregunta: "'Menor' es lo opuesto de 'mayor'.",
          preguntaChino: "'Menor'是'mayor'的反义词。",
          respuestaCorrecta: true,
          explicacion: "对。Menor = 更小/更年轻",
        },
        {
          id: "vf7",
          pregunta: "El superlativo absoluto con -ísimo es para comparar.",
          preguntaChino: "以-ísimo结尾的绝对最高级用于比较。",
          respuestaCorrecta: false,
          explicacion: "错。Es para enfatizar sin comparar",
        },
        {
          id: "vf8",
          pregunta: "'Óptimo' es el superlativo de 'bueno'.",
          preguntaChino: "'Óptimo'是'bueno'的最高级。",
          respuestaCorrecta: true,
          explicacion: "对。Bueno → óptimo",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "más... que",
              derecha: "比...更",
            },
            {
              izquierda: "menos... que",
              derecha: "比...少",
            },
            {
              izquierda: "tan... como",
              derecha: "和...一样(形容词)",
            },
            {
              izquierda: "tanto... como",
              derecha: "和...一样多(名词)",
            },
            {
              izquierda: "mejor",
              derecha: "更好",
            },
            {
              izquierda: "peor",
              derecha: "更差",
            },
            {
              izquierda: "mayor",
              derecha: "更大/更老",
            },
            {
              izquierda: "menor",
              derecha: "更小/更年轻",
            },
            {
              izquierda: "el más",
              derecha: "最(阳性)",
            },
            {
              izquierda: "la más",
              derecha: "最(阴性)",
            },
            {
              izquierda: "muy",
              derecha: "非常",
            },
            {
              izquierda: "-ísimo",
              derecha: "极其",
            },
            {
              izquierda: "óptimo",
              derecha: "极好",
            },
            {
              izquierda: "pésimo",
              derecha: "极差",
            },
          ],
          explicacion: "将比较级表达与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["más", "es", "María", "que", "alta", "Pedro", "."],
          respuestaCorrecta: "María es más alta que Pedro.",
          explicacion: "正确的句子是：María es más alta que Pedro.",
        },
        {
          id: "o2",
          palabras: ["tan", "Soy", "como", "alto", "padre", "mi", "."],
          respuestaCorrecta: "Soy tan alto como mi padre.",
          explicacion: "正确的句子是：Soy tan alto como mi padre.",
        },
        {
          id: "o3",
          palabras: ["la", "clase", "es", "de", "más", "El", "alto", "."],
          respuestaCorrecta: "El más alto de la clase.",
          explicacion: "正确的句子是：El más alto de la clase.",
        },
        {
          id: "o4",
          palabras: ["libro", "mejor", "Este", "es", "que", "ese", "."],
          respuestaCorrecta: "Este libro es mejor que ese.",
          explicacion: "正确的顺序是：Este libro es mejor que ese.",
        },
        {
          id: "o5",
          palabras: ["comida", "está", "La", "buenísima", "."],
          respuestaCorrecta: "La comida está buenísima.",
          explicacion: "正确的顺序是：La comida está buenísima.",
        },
        {
          id: "o6",
          palabras: ["tanto", "tengo", "Yo", "como", "tú", "dinero", "."],
          respuestaCorrecta: "Yo tengo tanto dinero como tú.",
          explicacion: "正确的顺序是：Yo tengo tanto dinero como tú.",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我的房子比你的大。",
          respuestaEsperada: "Mi casa es más grande que la tuya.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "这本书更好。",
          respuestaEsperada: "Este libro es mejor.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "她是我妹妹。她比我小。",
          respuestaEsperada: "Ella es mi hermana. Es menor que yo.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "他是班里最高的。",
          respuestaEsperada: "Él es el más alto de la clase.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "我和你有一样多的书。",
          respuestaEsperada: "Tengo tantos libros como tú.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "食物好极了。",
          respuestaEsperada: "La comida está buenísima.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "这台电脑比那台更便宜。",
          respuestaEsperada: "Este ordenador es más barato que ese.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "她是他遇到过最聪明的女孩。",
          respuestaEsperada: "Ella es la chica más inteligente que ha conocido.",
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
        instruccion: "用正确的比较级完成对话。",
        instruccionChino: "用正确的比较级完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿Madrid es más grande _____ Barcelona?",
            respuesta: "que",
          },
          {
            personaje: "B",
            texto: "Sí, Madrid es más grande. Pero Barcelona tiene _____ tráfico.",
            respuesta: "menos",
          },
          {
            personaje: "A",
            texto: "¿Son igual de bonitas?",
            respuesta: "",
          },
          {
            personaje: "B",
            texto: "Sí, Barcelona es tan bonita _____ Madrid.",
            respuesta: "como",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "comparar",
        titulo: "Compara los objetos",
        tituloChino: "比较物品",
        instruccion: "Compara las dos cosas usando 'más... que' o 'menos... que'.",
        instruccionChino: "用'más... que'或'menos... que'比较两样东西。",
        comparaciones: [
          {
            a: "el coche",
            b: "la bicicleta",
            adjetivo: "rápido",
            esperado: "El coche es más rápido que la bicicleta.",
          },
          {
            a: "el invierno",
            b: "el verano",
            adjetivo: "frío",
            esperado: "El invierno es más frío que el verano.",
          },
          {
            a: "el cine",
            b: "la tele",
            adjetivo: "interesante",
            esperado: "El cine es más interesante que la tele.",
          },
          {
            a: "el tren",
            b: "el autobús",
            adjetivo: "cómodo",
            esperado: "El tren es más cómodo que el autobús.",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "superlativo",
        titulo: "Escribe superlativos",
        tituloChino: "写出最高级",
        instruccion: "Escribe el superlativo absoluto (-ísimo) de estos adjetivos.",
        instruccionChino: "写出这些形容词的绝对最高级（-ísimo）。",
        adjetivos: [
          {
            adjetivo: "bueno",
            superlativo: "buenísimo",
          },
          {
            adjetivo: "malo",
            superlativo: "malísimo",
          },
          {
            adjetivo: "grande",
            superlativo: "grandísimo",
          },
          {
            adjetivo: "pequeño",
            superlativo: "pequeñísimo",
          },
          {
            adjetivo: "alto",
            superlativo: "altísimo",
          },
          {
            adjetivo: "bajo",
            superlativo: "bajísimo",
          },
          {
            adjetivo: "rico",
            superlativo: "riquísimo",
          },
          {
            adjetivo: "feo",
            superlativo: "feísimo",
          },
        ],
      },
      {
        id: "ep4",
        tipo: "responder",
        titulo: "Responde las preguntas",
        tituloChino: "回答问题",
        instruccion: "Responde las siguientes preguntas usando comparativos o superlativos.",
        instruccionChino: "使用比较级或最高级回答以下问题。",
        preguntas: [
          {
            pregunta: "¿Qué es más caro, un coche o una bicicleta?",
            respuestaEsperada: "Un coche es más caro que una bicicleta.",
          },
          {
            pregunta: "¿Quién es la persona más importante en tu vida?",
            respuestaEsperada: "La persona más importante en mi vida es (mi madre / mi padre).",
          },
          {
            pregunta: "¿Qué prefieres, el café o el té?",
            respuestaEsperada: "Prefiero el café porque es más fuerte.",
          },
        ],
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "Compara tu ciudad con otra ciudad que conozcas.",
        preguntaChino: "比较你所在的城市和你认识的其他城市。",
        sugerencia: "Mi ciudad es más grande/pequeña/cara/barata que...",
        sugerenciaChino: "Mi ciudad es más grande/pequeña/cara/barata que...",
      },
      {
        id: "pa2",
        pregunta: "¿Quién es la persona más importante en tu vida? ¿Por qué?",
        preguntaChino: "谁是你生命中最重要的人？为什么？",
        sugerencia: "La persona más importante en mi vida es... porque...",
        sugerenciaChino: "La persona más importante en mi vida es... porque...",
      },
      {
        id: "pa3",
        pregunta: "Compara el español con el inglés o tu idioma nativo.",
        preguntaChino: "比较西班牙语和你母语。",
        sugerencia: "El español es más fácil/difícil que el chino porque...",
        sugerenciaChino: "El español es más fácil/difícil que el chino porque...",
      },
      {
        id: "pa4",
        pregunta: "¿Qué es lo mejor de vivir en tu ciudad?",
        preguntaChino: "住在你所在城市最好的是什么？",
        sugerencia: "Lo mejor de vivir en mi ciudad es que...",
        sugerenciaChino: "Lo mejor de vivir en mi ciudad es que...",
      },
      {
        id: "pa5",
        pregunta: "¿Cuál es la mejor película que has visto?",
        preguntaChino: "你看过的最好电影是什么？",
        sugerencia: "La mejor película que he visto es... porque...",
        sugerenciaChino: "La mejor película que he visto es... porque...",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '比...更' en español?",
        preguntaChino: "西班牙语中'比...更'怎么说？",
        respuestaSugerida: "más... que",
        respuestaSugeridaChino: "más... que",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '更好' en español?",
        preguntaChino: "西班牙语中'更好'怎么说？",
        respuestaSugerida: "mejor",
        respuestaSugeridaChino: "mejor",
      },
      {
        id: "p3",
        pregunta: "¿Qué significa 'el más alto de la clase'?",
        preguntaChino: "'el más alto de la clase'是什么意思？",
        respuestaSugerida: "班里最高的",
        respuestaSugeridaChino: "The tallest in the class",
      },
      {
        id: "p4",
        pregunta: "¿Cómo comparas dos cosas que son iguales?",
        preguntaChino: "如何比较两样相同的东西？",
        respuestaSugerida: "tan + adjetivo + como",
        respuestaSugeridaChino: "tan + 形容词 + como",
      },
      {
        id: "p5",
        pregunta: "¿Cuál es la diferencia entre 'muy bueno' y 'buenísimo'?",
        preguntaChino: "'muy bueno'和'buenísimo'有什么区别？",
        respuestaSugerida: "Ambos significan 'very good', pero 'buenísimo' es más enfático.",
        respuestaSugeridaChino: "两者都表示'非常好'，但'buenísimo'更强调。",
      },
      {
        id: "p6",
        pregunta: "¿Cómo se dice '极差' en español?",
        preguntaChino: "西班牙语中'极差'怎么说？",
        respuestaSugerida: "pésimo / malísimo",
        respuestaSugeridaChino: "pésimo / malísimo",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Estructura del futuro próximo",
        tituloChino: "最近将来时的结构",
        descripcion: `Para hablar de acciones que van a ocurrir pronto:

🔹 ESTRUCTURA: verbo IR + a + infinitivo

Conjugación del verbo IR:
• yo VOY
• tú VAS
• él/ella/usted VA
• nosotros VAMOS
• vosotros VAIS
• ellos/ellas/ustedes VAN

📌 EJEMPLOS:
• Voy a estudiar español. (I'm going to study Spanish)
• Vas a viajar a España. (You're going to travel to Spain)
• Ella va a comer paella. (She's going to eat paella)
• Vamos a salir esta noche. (We're going to go out tonight)
• Van a llegar tarde. (They're going to arrive late)

🔹 FORMA NEGATIVA:
• No + voy/vas/va/vamos/vais/van + a + infinitivo

📌 EJEMPLOS NEGATIVOS:
• No voy a estudiar hoy.
• No vamos a salir esta noche.
• Ella no va a venir a la fiesta.

❌ ERROR COMÚN:
No confundas "voy a" (futuro próximo) con "voy" (presente de ir). "Voy a comer" = I'm going to eat. "Voy al cine" = I'm going to the cinema.`,
        descripcionChino: `表达即将发生的动作：

🔹 结构：动词 IR + a + 动词原形

动词IR的变位：
• yo VOY = 我去/我要
• tú VAS = 你去/你要
• él/ella/usted VA = 他/她/您去/要
• nosotros VAMOS = 我们去/我们要
• vosotros VAIS = 你们去/你们要
• ellos/ellas/ustedes VAN = 他们/她们/您们去/要

📌 例子：
• Voy a estudiar español. = 我要学西班牙语。
• Vas a viajar a España. = 你要去西班牙旅行。
• Ella va a comer paella. = 她要去吃海鲜饭。
• Vamos a salir esta noche. = 我们今晚要出去。
• Van a llegar tarde. = 他们要迟到了。

🔹 否定形式：
• No + voy/vas/va/vamos/vais/van + a + 动词原形

📌 否定例子：
• No voy a estudiar hoy. = 我今天不学习。
• No vamos a salir esta noche. = 我们今晚不出去。
• Ella no va a venir a la fiesta. = 她不来派对。

❌ 常见错误：
不要混淆 "voy a"（最近将来时）和 "voy"（ir的现在时）。"Voy a comer" = 我要去吃。"Voy al cine" = 我去电影院。`,
        ejemplos: [
          {
            espanol: "Voy a estudiar español.",
            chino: "我要学西班牙语。",
          },
          {
            espanol: "Mañana voy a ir al cine.",
            chino: "明天我要去看电影。",
          },
          {
            espanol: "¿Qué vas a hacer este fin de semana?",
            chino: "你这个周末要做什么？",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Expresiones de tiempo para el futuro",
        tituloChino: "将来的时间表达",
        descripcion: `Marcadores temporales para el futuro:

🔹 TIEMPO ESPECÍFICO:
• mañana = tomorrow
• pasado mañana = the day after tomorrow
• esta tarde / esta noche = this afternoon / tonight
• este fin de semana = this weekend
• la semana que viene = next week
• el mes que viene = next month
• el año que viene = next year
• dentro de + tiempo = in + time (dentro de dos días)

🔹 TIEMPO INDEFINIDO:
• más tarde = later
• pronto = soon
• algún día = someday
• en el futuro = in the future
• más adelante = further on

📌 EJEMPLOS:
• Voy a estudiar mañana.
• La semana que viene vamos a viajar.
• Dentro de dos días voy a llamarte.
• Algún día voy a visitar Japón.

📌 PREGUNTAS CON EXPRESIONES DE TIEMPO:
• ¿Qué vas a hacer mañana?
• ¿Cuándo vas a viajar?
• ¿Dónde vas a comer esta noche?
• ¿Con quién vas a ir al concierto?

❌ ERROR COMÚN:
No uses el presente para el futuro inmediato en español. "Mañana como paella" es correcto pero menos común que "Mañana voy a comer paella".`,
        descripcionChino: `将来的时间标志：

🔹 具体时间：
• mañana = 明天
• pasado mañana = 后天
• esta tarde / esta noche = 今天下午/今晚
• este fin de semana = 这个周末
• la semana que viene = 下周
• el mes que viene = 下个月
• el año que viene = 明年
• dentro de + 时间 = 在...之后

🔹 不具体时间：
• más tarde = 稍后
• pronto = 很快
• algún día = 有一天
• en el futuro = 在未来
• más adelante = 以后

📌 例子：
• Voy a estudiar mañana. = 我明天要学习。
• La semana que viene vamos a viajar. = 我们下周要去旅行。
• Dentro de dos días voy a llamarte. = 两天后我会打电话给你。
• Algún día voy a visitar Japón. = 有一天我要去日本旅游。

📌 带时间表达的问题：
• ¿Qué vas a hacer mañana? = 你明天要做什么？
• ¿Cuándo vas a viajar? = 你什么时候去旅行？
• ¿Dónde vas a comer esta noche? = 你今晚在哪里吃饭？
• ¿Con quién vas a ir al concierto? = 你和谁去音乐会？

❌ 常见错误：
在西班牙语中不要用现在时表达即将发生的动作。"Mañana como paella"是正确的，但不如"Mañana voy a comer paella"常用。`,
        ejemplos: [
          {
            espanol: "Mañana voy a trabajar.",
            chino: "明天我要工作。",
          },
          {
            espanol: "El año que viene voy a aprender chino.",
            chino: "明年我要学中文。",
          },
          {
            espanol: "Dentro de una hora voy a salir.",
            chino: "一小时后我要出去。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Preguntar sobre planes futuros",
        tituloChino: "询问未来计划",
        descripcion: `🔹 PREGUNTAS COMUNES:

• ¿Qué vas a hacer?
• ¿Vas a venir a la fiesta?
• ¿Cuándo vas a viajar?
• ¿Dónde vas a comer?
• ¿Con quién vas a ir?
• ¿A qué hora vas a llegar?
• ¿Cuánto tiempo vas a quedarte?
• ¿Qué vas a estudiar?

🔹 RESPUESTAS COMUNES:

RESPUESTAS AFIRMATIVAS:
• Voy a estudiar.
• Sí, voy a ir.
• Voy a viajar en julio.
• Voy a comer en casa.
• Voy a ir con mis amigos.
• Voy a llegar a las ocho.
• Me voy a quedar una semana.
• Voy a estudiar medicina.

RESPUESTAS NEGATIVAS:
• No, no voy a ir.
• No voy a estudiar hoy.
• No vamos a salir esta noche.
• No voy a comer fuera.
• No me voy a quedar mucho tiempo.

📌 EJEMPLOS COMPLETOS:
• ¿Vas a venir a la fiesta? — Sí, voy a ir.
• ¿Qué vas a hacer mañana? — Voy a estudiar por la mañana y salir con amigos por la tarde.
• ¿Dónde vas a comer? — Voy a comer en un restaurante italiano.
• ¿Con quién vas a viajar? — Voy a viajar con mi familia.`,
        descripcionChino: `🔹 常见问题：

• ¿Qué vas a hacer? = 你要做什么？
• ¿Vas a venir a la fiesta? = 你要来派对吗？
• ¿Cuándo vas a viajar? = 你什么时候去旅行？
• ¿Dónde vas a comer? = 你在哪里吃饭？
• ¿Con quién vas a ir? = 你和谁一起去？
• ¿A qué hora vas a llegar? = 你几点到？
• ¿Cuánto tiempo vas a quedarte? = 你要待多久？
• ¿Qué vas a estudiar? = 你要学什么？

🔹 常见回答：

肯定回答：
• Voy a estudiar. = 我要学习。
• Sí, voy a ir. = 是的，我要去。
• Voy a viajar en julio. = 我七月去旅行。
• Voy a comer en casa. = 我在家吃饭。
• Voy a ir con mis amigos. = 我和朋友一起去。
• Voy a llegar a las ocho. = 我八点到。
• Me voy a quedar una semana. = 我要待一周。
• Voy a estudiar medicina. = 我要学医。

否定回答：
• No, no voy a ir. = 不，我不去。
• No voy a estudiar hoy. = 我今天不学习。
• No vamos a salir esta noche. = 我们今晚不出去。
• No voy a comer fuera. = 我不在外面吃。
• No me voy a quedar mucho tiempo. = 我不会待很久。

📌 完整例子：
• ¿Vas a venir a la fiesta? — Sí, voy a ir. = 你要来派对吗？—是的，我要去。
• ¿Qué vas a hacer mañana? — Voy a estudiar por la mañana y salir con amigos por la tarde. = 你明天要做什么？—我早上学习，下午和朋友出去。
• ¿Dónde vas a comer? — Voy a comer en un restaurante italiano. = 你在哪里吃饭？—我要在一家意大利餐厅吃饭。
• ¿Con quién vas a viajar? — Voy a viajar con mi familia. = 你和谁去旅行？—我要和家人一起去。`,
        ejemplos: [
          {
            espanol: "—¿Vas a venir? —Sí, voy a ir.",
            chino: "—你要来吗？—是的，我要去。",
          },
          {
            espanol: "No voy a comer fuera.",
            chino: "我不在外面吃。",
          },
          {
            espanol: "¿Qué vas a hacer mañana?",
            chino: "你明天要做什么？",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Futuro próximo vs Futuro simple",
        tituloChino: "最近将来时 vs 简单将来时",
        descripcion: `🔹 DIFERENCIAS IMPORTANTES:

FUTURO PRÓXIMO (ir a + infinitivo):
• Más común en el habla cotidiana
• Expresa intención o plan inmediato
• Más cercano en el tiempo

Ejemplos:
• Voy a llamar a mi madre ahora mismo.
• Esta tarde voy a ir al supermercado.

FUTURO SIMPLE (infinitivo + terminaciones):
• Más formal
• Expresa predicciones o suposiciones
• Acciones más lejanas en el tiempo

Ejemplos:
• Llamaré a mi madre mañana.
• En el futuro, los coches volarán.

📌 TABLA COMPARATIVA:

| Situación | Futuro Próximo | Futuro Simple |
|-----------|----------------|----------------|
| Plan inmediato | Voy a comer ahora | — |
| Predicción | — | Lloverá mañana |
| Plan lejano | Voy a estudiar el año que viene | Estudiaré el año que viene |
| Promesa | Te voy a llamar | Te llamaré |

📌 NOTA:
En el habla cotidiana, el futuro próximo es mucho más común que el futuro simple para expresar planes.`,
        descripcionChino: `🔹 重要区别：

最近将来时（ir a + 动词原形）：
• 日常口语中更常见
• 表达意图或近期的计划
• 时间上更近

例子：
• Voy a llamar a mi madre ahora mismo. = 我现在要给我妈妈打电话。
• Esta tarde voy a ir al supermercado. = 今天下午我要去超市。

简单将来时（动词原形 + 结尾）：
• 更正式
• 表达预测或假设
• 时间上更远

例子：
• Llamaré a mi madre mañana. = 我明天会给我妈妈打电话。
• En el futuro, los coches volarán. = 在未来，汽车会飞。

📌 比较表：

| 情况 | 最近将来时 | 简单将来时 |
|------|-----------|-----------|
| 近期计划 | Voy a comer ahora | — |
| 预测 | — | Lloverá mañana |
| 远期计划 | Voy a estudiar el año que viene | Estudiaré el año que viene |
| 承诺 | Te voy a llamar | Te llamaré |

📌 注意：
在日常口语中，表达计划时最近将来时比简单将来时常见得多。`,
        ejemplos: [
          {
            espanol: "Voy a comer ahora.",
            chino: "我现在要吃。",
          },
          {
            espanol: "Mañana voy a estudiar.",
            chino: "明天我要学习。",
          },
          {
            espanol: "Te llamaré mañana.",
            chino: "我明天会打电话给你。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "voy a",
        chino: "我要",
        ejemplo: "Voy a estudiar.",
      },
      {
        id: "v2",
        espanol: "vas a",
        chino: "你要",
        ejemplo: "Vas a viajar.",
      },
      {
        id: "v3",
        espanol: "va a",
        chino: "他/她要",
        ejemplo: "Ella va a comer.",
      },
      {
        id: "v4",
        espanol: "vamos a",
        chino: "我们要",
        ejemplo: "Vamos a salir.",
      },
      {
        id: "v5",
        espanol: "van a",
        chino: "他们/她们要",
        ejemplo: "Van a llegar.",
      },
      {
        id: "v6",
        espanol: "mañana",
        chino: "明天",
        ejemplo: "Voy mañana.",
      },
      {
        id: "v7",
        espanol: "pasado mañana",
        chino: "后天",
        ejemplo: "Voy pasado mañana.",
      },
      {
        id: "v8",
        espanol: "la semana que viene",
        chino: "下周",
        ejemplo: "La semana que viene viajo.",
      },
      {
        id: "v9",
        espanol: "el mes que viene",
        chino: "下个月",
        ejemplo: "El mes que viene empiezo.",
      },
      {
        id: "v10",
        espanol: "el año que viene",
        chino: "明年",
        ejemplo: "El año que viene estudio.",
      },
      {
        id: "v11",
        espanol: "este fin de semana",
        chino: "这个周末",
        ejemplo: "Este fin de semana descanso.",
      },
      {
        id: "v12",
        espanol: "dentro de",
        chino: "在...之后",
        ejemplo: "Dentro de poco termino.",
      },
      {
        id: "v13",
        espanol: "pronto",
        chino: "很快",
        ejemplo: "Pronto voy a terminar.",
      },
      {
        id: "v14",
        espanol: "algún día",
        chino: "有一天",
        ejemplo: "Algún día viajaré.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Planes para el fin de semana",
        tituloChino: "周末计划",
        personajes: ["Ana", "Carlos"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Carlos, ¿qué vas a hacer este fin de semana?",
            traduccion: "卡洛斯，你这个周末要做什么？",
          },
          {
            personaje: "Carlos",
            texto: "Voy a viajar a la playa con mi familia.",
            traduccion: "我要和家人去海滩旅行。",
          },
          {
            personaje: "Ana",
            texto: "¡Qué bien! ¿Vais a nadar?",
            traduccion: "真好！你们要去游泳吗？",
          },
          {
            personaje: "Carlos",
            texto: "Sí, vamos a nadar y tomar el sol.",
            traduccion: "是的，我们要游泳和晒太阳。",
          },
          {
            personaje: "Ana",
            texto: "¿Y qué vas a comer?",
            traduccion: "你要吃什么？",
          },
          {
            personaje: "Carlos",
            texto: "Vamos a comer pescado fresco.",
            traduccion: "我们要吃新鲜鱼。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Planes para el futuro",
        tituloChino: "未来计划",
        personajes: ["María", "Pedro"],
        lineas: [
          {
            personaje: "María",
            texto: "Pedro, ¿tienes planes para el futuro?",
            traduccion: "佩德罗，你对未来有计划吗？",
          },
          {
            personaje: "Pedro",
            texto: "Sí, voy a estudiar ingeniería el año que viene.",
            traduccion: "是的，明年我要学工程。",
          },
          {
            personaje: "María",
            texto: "¿Dónde vas a estudiar?",
            traduccion: "你要在哪里学习？",
          },
          {
            personaje: "Pedro",
            texto: "Voy a estudiar en Madrid.",
            traduccion: "我要在马德里学习。",
          },
          {
            personaje: "María",
            texto: "¡Qué bien! Yo voy a trabajar en una empresa.",
            traduccion: "真好！我要在一家公司工作。",
          },
          {
            personaje: "Pedro",
            texto: "¿Vas a quedarte en tu ciudad?",
            traduccion: "你要留在你的城市吗？",
          },
          {
            personaje: "María",
            texto: "Sí, no voy a mudarme.",
            traduccion: "是的，我不搬家。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Planes para esta noche",
        tituloChino: "今晚的计划",
        personajes: ["Luis", "Sofía"],
        lineas: [
          {
            personaje: "Luis",
            texto: "Sofía, ¿vas a venir a la fiesta esta noche?",
            traduccion: "索菲亚，你今晚要来派对吗？",
          },
          {
            personaje: "Sofía",
            texto: "Sí, voy a ir. ¿A qué hora vas a llegar?",
            traduccion: "是的，我要去。你几点到？",
          },
          {
            personaje: "Luis",
            texto: "Voy a llegar a las nueve. ¿Vas a traer algo?",
            traduccion: "我九点到。你要带东西吗？",
          },
          {
            personaje: "Sofía",
            texto: "Voy a traer una botella de vino.",
            traduccion: "我要带一瓶酒。",
          },
          {
            personaje: "Luis",
            texto: "Perfecto. Te voy a esperar.",
            traduccion: "完美。我会等你。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Planes de viaje",
        tituloChino: "旅行计划",
        personajes: ["Laura", "David"],
        lineas: [
          {
            personaje: "Laura",
            texto: "David, ¿cuándo vas a viajar a España?",
            traduccion: "大卫，你什么时候要去西班牙旅行？",
          },
          {
            personaje: "David",
            texto: "Voy a viajar en julio. ¿Y tú?",
            traduccion: "我七月要去。你呢？",
          },
          {
            personaje: "Laura",
            texto: "Yo voy a ir en agosto. ¿Vas a visitar Madrid?",
            traduccion: "我八月要去。你要参观马德里吗？",
          },
          {
            personaje: "David",
            texto: "Sí, voy a pasar tres días en Madrid. Luego voy a ir a Barcelona.",
            traduccion: "是的，我要在马德里待三天。然后我要去巴塞罗那。",
          },
          {
            personaje: "Laura",
            texto: "¿Vas a alojarte en un hotel?",
            traduccion: "你要住酒店吗？",
          },
          {
            personaje: "David",
            texto: "Voy a alquilar un apartamento. Es más económico.",
            traduccion: "我要租一个公寓。更经济。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Cancelando planes",
        tituloChino: "取消计划",
        personajes: ["Sofía", "Javier"],
        lineas: [
          {
            personaje: "Sofía",
            texto: "Javier, ¿vamos a ir al cine esta noche?",
            traduccion: "哈维尔，我们今晚去看电影吗？",
          },
          {
            personaje: "Javier",
            texto: "Lo siento, no voy a poder. Tengo que trabajar.",
            traduccion: "抱歉，我不能去。我得工作。",
          },
          {
            personaje: "Sofía",
            texto: "¿Vas a trabajar hasta tarde?",
            traduccion: "你要工作到很晚吗？",
          },
          {
            personaje: "Javier",
            texto: "Sí, voy a terminar sobre las diez.",
            traduccion: "是的，我大概十点结束。",
          },
          {
            personaje: "Sofía",
            texto: "Entonces ¿vamos a ir mañana?",
            traduccion: "那我们明天去？",
          },
          {
            personaje: "Javier",
            texto: "Sí, mañana sí voy a poder. ¿Vamos a las ocho?",
            traduccion: "好的，明天我可以。我们八点去？",
          },
          {
            personaje: "Sofía",
            texto: "Perfecto. Nos vemos mañana.",
            traduccion: "完美。明天见。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "为了说'我要学习'：_____ a estudiar.",
          preguntaChino: "为了说'我要学习'：_____ a estudiar.",
          respuestaCorrecta: "Voy",
          explicacion: "Yo voy = 我要",
          pista: "首字母是 V，3个字母",
          numeroLetras: 3,
        },
        {
          id: "c2",
          pregunta: "为了说'你要旅行'：_____ a viajar.",
          preguntaChino: "为了说'你要旅行'：_____ a viajar.",
          respuestaCorrecta: "Vas",
          explicacion: "Tú vas = 你要",
          pista: "首字母是 V，3个字母",
          numeroLetras: 3,
        },
        {
          id: "c3",
          pregunta: "为了说'我们要出去'：_____ a salir.",
          preguntaChino: "为了说'我们要出去'：_____ a salir.",
          respuestaCorrecta: "Vamos",
          explicacion: "Nosotros vamos = 我们要",
          pista: "首字母是 V，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c4",
          pregunta: "明天：_____",
          preguntaChino: "明天：_____",
          respuestaCorrecta: "mañana",
          explicacion: "Mañana = 明天",
          pista: "首字母是 m，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c5",
          pregunta: "下周：la _____ que viene",
          preguntaChino: "下周：la _____ que viene",
          respuestaCorrecta: "semana",
          explicacion: "La semana que viene = 下周",
          pista: "首字母是 s，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c6",
          pregunta: "为了说'他们要去'：Ellos _____ a llegar tarde.",
          preguntaChino: "为了说'他们要去'：Ellos _____ a llegar tarde.",
          respuestaCorrecta: "van",
          explicacion: "Ellos van = 他们要去",
          pista: "首字母是 v，3个字母",
          numeroLetras: 3,
        },
        {
          id: "c7",
          pregunta: "为了说'他不打算来'：Él no _____ a venir.",
          preguntaChino: "为了说'他不打算来'：Él no _____ a venir.",
          respuestaCorrecta: "va",
          explicacion: "Él va = 他要去",
          pista: "首字母是 v，2个字母",
          numeroLetras: 2,
        },
        {
          id: "c8",
          pregunta: "后天：_____ mañana",
          preguntaChino: "后天：_____ mañana",
          respuestaCorrecta: "pasado",
          explicacion: "Pasado mañana = 后天",
          pista: "首字母是 p，6个字母",
          numeroLetras: 6,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "如何说'我要学西班牙语'？",
          preguntaChino: "如何说'我要学西班牙语'？",
          opciones: [
            "Estudio español",
            "Voy a estudiar español",
            "He estudiado español",
            "Estudiaba español",
          ],
          respuestaCorrecta: "Voy a estudiar español",
          explicacion: "Futuro próximo: voy a + infinitivo",
        },
        {
          id: "s2",
          pregunta: "¿Vas a venir?的否定回答是什么？",
          preguntaChino: "¿Vas a venir?的否定回答是什么？",
          opciones: ["Sí, voy", "No, no voy", "Sí, voy a ir", "No, voy"],
          respuestaCorrecta: "No, no voy",
          explicacion: "否定形式：no + voy",
        },
        {
          id: "s3",
          pregunta: "'La semana que viene'是什么意思？",
          preguntaChino: "'La semana que viene'是什么意思？",
          opciones: ["上周", "这周", "下周", "下周?"],
          respuestaCorrecta: "下周",
          explicacion: "La semana que viene = 下周",
        },
        {
          id: "s4",
          pregunta: "如何说'她要去吃海鲜饭'？",
          preguntaChino: "如何说'她要去吃海鲜饭'？",
          opciones: ["Ella come paella", "Ella comió paella", "Ella va a comer paella", "Ella comerá paella"],
          respuestaCorrecta: "Ella va a comer paella",
          explicacion: "Futuro próximo",
        },
        {
          id: "s5",
          pregunta: "如何问'你明天要做什么？'",
          preguntaChino: "如何问'你明天要做什么？'",
          opciones: [
            "¿Qué haces mañana?",
            "¿Qué hiciste ayer?",
            "¿Qué vas a hacer mañana?",
            "¿Qué harás mañana?",
          ],
          respuestaCorrecta: "¿Qué vas a hacer mañana?",
          explicacion: "Pregunta con futuro próximo",
        },
        {
          id: "s6",
          pregunta: "¿Cómo se dice '后天' en español?",
          preguntaChino: "西班牙语中'后天'怎么说？",
          opciones: ["mañana", "pasado mañana", "ayer", "anteayer"],
          respuestaCorrecta: "pasado mañana",
          explicacion: "Pasado mañana = 后天",
        },
        {
          id: "s7",
          pregunta: "¿Cuál es la forma correcta de 'nosotros' en futuro próximo?",
          preguntaChino: "'nosotros'在最近将来时的正确形式是什么？",
          opciones: ["vamos a", "vais a", "van a", "va a"],
          respuestaCorrecta: "vamos a",
          explicacion: "Nosotros vamos a + infinitivo",
        },
        {
          id: "s8",
          pregunta: "¿Qué significa 'Dentro de una semana voy a viajar'?",
          preguntaChino: "'Dentro de una semana voy a viajar'是什么意思？",
          opciones: ["我一周后要去旅行", "我旅行了一周", "我下周旅行", "我旅行了一周后"],
          respuestaCorrecta: "我一周后要去旅行",
          explicacion: "Dentro de = 在...之后",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Voy a' se usa para el futuro próximo.",
          preguntaChino: "'Voy a'用于最近将来时。",
          respuestaCorrecta: true,
          explicacion: "对。Voy a + infinitivo = 我要...",
        },
        {
          id: "vf2",
          pregunta: "未来计划用'voy a'表达。",
          preguntaChino: "未来计划用'voy a'表达。",
          respuestaCorrecta: true,
          explicacion: "对。Futuro próximo para planes",
        },
        {
          id: "vf3",
          pregunta: "否定形式是'No voy a' + infinitivo。",
          preguntaChino: "否定形式是'No voy a' + 动词原形。",
          respuestaCorrecta: true,
          explicacion: "对。No voy a estudiar",
        },
        {
          id: "vf4",
          pregunta: "'Mañana'表示'昨天'。",
          preguntaChino: "'Mañana'表示'昨天'。",
          respuestaCorrecta: false,
          explicacion: "错。Mañana = 明天",
        },
        {
          id: "vf5",
          pregunta: "'Vamos a comer'意思是'我们要吃饭'。",
          preguntaChino: "'Vamos a comer'意思是'我们要吃饭'。",
          respuestaCorrecta: true,
          explicacion: "对。Vamos a + infinitivo",
        },
        {
          id: "vf6",
          pregunta: "El futuro próximo es más común que el futuro simple en el habla cotidiana.",
          preguntaChino: "在日常口语中，最近将来时比简单将来时更常见。",
          respuestaCorrecta: true,
          explicacion: "对。Para planes inmediatos",
        },
        {
          id: "vf7",
          pregunta: "Se puede usar 'voy a' para predicciones.",
          preguntaChino: "'Voy a'可以用于预测。",
          respuestaCorrecta: false,
          explicacion: "错。Para predicciones se usa futuro simple",
        },
        {
          id: "vf8",
          pregunta: "'Dentro de dos días' significa 'hace dos días'.",
          preguntaChino: "'Dentro de dos días'意思是'两天前'。",
          respuestaCorrecta: false,
          explicacion: "错。Dentro de = 在...之后",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "voy a",
              derecha: "我要",
            },
            {
              izquierda: "vas a",
              derecha: "你要",
            },
            {
              izquierda: "va a",
              derecha: "他/她要",
            },
            {
              izquierda: "vamos a",
              derecha: "我们要",
            },
            {
              izquierda: "van a",
              derecha: "他们/她们要",
            },
            {
              izquierda: "mañana",
              derecha: "明天",
            },
            {
              izquierda: "pasado mañana",
              derecha: "后天",
            },
            {
              izquierda: "la semana que viene",
              derecha: "下周",
            },
            {
              izquierda: "el mes que viene",
              derecha: "下个月",
            },
            {
              izquierda: "el año que viene",
              derecha: "明年",
            },
            {
              izquierda: "dentro de",
              derecha: "在...之后",
            },
          ],
          explicacion: "将未来表达与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["a", "Voy", "estudiar", "español", "."],
          respuestaCorrecta: "Voy a estudiar español.",
          explicacion: "正确的句子是：Voy a estudiar español.",
        },
        {
          id: "o2",
          palabras: ["qué", "vas", "a", "hacer", "mañana", "¿", "?"],
          respuestaCorrecta: "¿Qué vas a hacer mañana?",
          explicacion: "正确的句子是：¿Qué vas a hacer mañana?",
        },
        {
          id: "o3",
          palabras: ["No", "a", "voy", "salir", "hoy", "."],
          respuestaCorrecta: "No voy a salir hoy.",
          explicacion: "正确的句子是：No voy a salir hoy.",
        },
        {
          id: "o4",
          palabras: ["a", "va", "Ella", "venir", "no", "."],
          respuestaCorrecta: "Ella no va a venir.",
          explicacion: "正确的顺序是：Ella no va a venir.",
        },
        {
          id: "o5",
          palabras: ["semana", "viajar", "que", "La", "vamos", "a", "viene", "."],
          respuestaCorrecta: "La semana que viene vamos a viajar.",
          explicacion: "正确的顺序是：La semana que viene vamos a viajar.",
        },
        {
          id: "o6",
          palabras: ["dos", "a", "voy", "días", "dentro", "de", "llamar", "te", "."],
          respuestaCorrecta: "Dentro de dos días voy a llamarte.",
          explicacion: "正确的顺序是：Dentro de dos días voy a llamarte.",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我明天要去电影院。",
          respuestaEsperada: "Mañana voy a ir al cine.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "你要来参加派对吗？",
          respuestaEsperada: "¿Vas a venir a la fiesta?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "我们下周要去旅行。",
          respuestaEsperada: "La semana que viene vamos a viajar.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "她今晚不学习。",
          respuestaEsperada: "Ella no va a estudiar esta noche.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "后天我要去看医生。",
          respuestaEsperada: "Pasado mañana voy a ir al médico.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "我们什么时候去吃晚饭？",
          respuestaEsperada: "¿Cuándo vamos a cenar?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "他们不打算来这里。",
          respuestaEsperada: "Ellos no van a venir aquí.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "一年后我要去西班牙。",
          respuestaEsperada: "Dentro de un año voy a ir a España.",
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
        instruccion: "用正确的未来形式完成对话。",
        instruccionChino: "用正确的未来形式完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿Qué _____ a hacer este fin de semana?",
            respuesta: "vas",
          },
          {
            personaje: "B",
            texto: "_____ a viajar a la montaña.",
            respuesta: "Voy",
          },
          {
            personaje: "A",
            texto: "¿_____ a ir solo?",
            respuesta: "Vas",
          },
          {
            personaje: "B",
            texto: "No, _____ a ir con mis amigos.",
            respuesta: "voy",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "planes",
        titulo: "Escribe tus planes",
        tituloChino: "写出你的计划",
        instruccion: "Escribe 5 cosas que vas a hacer esta semana usando 'ir a + infinitivo'.",
        instruccionChino: "使用'ir a + 动词原形'写出你这周要做的5件事。",
        ejemplo:
          "1. Voy a estudiar español. 2. Voy a ir al cine. 3. Voy a llamar a mi familia. 4. Voy a hacer ejercicio. 5. Voy a cocinar algo rico.",
      },
      {
        id: "ep3",
        tipo: "transformar",
        titulo: "Transforma las frases",
        tituloChino: "转换句子",
        instruccion: "Transforma las siguientes frases al futuro próximo (ir a + infinitivo).",
        instruccionChino: "将以下句子转换为最近将来时（ir a + 动词原形）。",
        frases: [
          {
            original: "Estudio español mañana.",
            esperado: "Voy a estudiar español mañana.",
          },
          {
            original: "Cenamos en casa.",
            esperado: "Vamos a cenar en casa.",
          },
          {
            original: "Viajan a París el mes que viene.",
            esperado: "Van a viajar a París el mes que viene.",
          },
        ],
      },
      {
        id: "ep4",
        tipo: "responder",
        titulo: "Responde las preguntas",
        tituloChino: "回答问题",
        instruccion: "Responde las siguientes preguntas sobre tus planes futuros.",
        instruccionChino: "回答以下关于你未来计划的问题。",
        preguntas: [
          {
            pregunta: "¿Qué vas a hacer mañana por la mañana?",
            respuestaEsperada: "Mañana por la mañana voy a (estudiar / trabajar / descansar).",
          },
          {
            pregunta: "¿Vas a viajar este verano?",
            respuestaEsperada: "Sí, voy a viajar a (lugar). / No, no voy a viajar.",
          },
          {
            pregunta: "¿Qué vas a estudiar en el futuro?",
            respuestaEsperada: "Voy a estudiar (carrera / idioma).",
          },
        ],
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Qué vas a hacer este fin de semana?",
        preguntaChino: "你这个周末要做什么？",
        sugerencia: "Este fin de semana voy a...",
        sugerenciaChino: "Este fin de semana voy a...",
      },
      {
        id: "pa2",
        pregunta: "¿Vas a estudiar o trabajar el año que viene?",
        preguntaChino: "你明年要学习还是工作？",
        sugerencia: "El año que viene voy a...",
        sugerenciaChino: "El año que viene voy a...",
      },
      {
        id: "pa3",
        pregunta: "¿Qué vas a hacer mañana por la mañana?",
        preguntaChino: "你明天早上要做什么？",
        sugerencia: "Mañana por la mañana voy a...",
        sugerenciaChino: "Mañana por la mañana voy a...",
      },
      {
        id: "pa4",
        pregunta: "¿Cuándo vas a viajar la próxima vez?",
        preguntaChino: "你下次什么时候去旅行？",
        sugerencia: "La próxima vez que voy a viajar es en...",
        sugerenciaChino: "La próxima vez que voy a viajar es en...",
      },
      {
        id: "pa5",
        pregunta: "¿Qué no vas a hacer esta semana?",
        preguntaChino: "你这周不打算做什么？",
        sugerencia: "Esta semana no voy a (salir / trabajar / estudiar).",
        sugerenciaChino: "Esta semana no voy a (salir / trabajar / estudiar).",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se forma el futuro próximo?",
        preguntaChino: "最近将来时如何构成？",
        respuestaSugerida: "Verbo IR + a + infinitivo",
        respuestaSugeridaChino: "动词 IR + a + 动词原形",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '我要' en español?",
        preguntaChino: "西班牙语中'我要'怎么说？",
        respuestaSugerida: "Voy a",
        respuestaSugeridaChino: "Voy a",
      },
      {
        id: "p3",
        pregunta: "¿Cómo se dice '明天' en español?",
        preguntaChino: "西班牙语中'明天'怎么说？",
        respuestaSugerida: "mañana",
        respuestaSugeridaChino: "mañana",
      },
      {
        id: "p4",
        pregunta: "¿Qué significa 'La semana que viene'?",
        preguntaChino: "'La semana que viene'是什么意思？",
        respuestaSugerida: "下周",
        respuestaSugeridaChino: "Next week",
      },
      {
        id: "p5",
        pregunta: "¿Cómo preguntas '你打算做什么？' en español?",
        preguntaChino: "西班牙语中'你打算做什么？'怎么问？",
        respuestaSugerida: "¿Qué vas a hacer?",
        respuestaSugeridaChino: "¿Qué vas a hacer?",
      },
      {
        id: "p6",
        pregunta: "¿Cuál es la diferencia entre 'voy a' y 'voy'?",
        preguntaChino: "'voy a'和'voy'有什么区别？",
        respuestaSugerida: "Voy a + infinitivo = futuro. Voy + lugar = presente de ir.",
        respuestaSugeridaChino: "Voy a + 动词原形 = 将来。Voy + 地点 = ir的现在时。",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Preposiciones de lugar básicas",
        tituloChino: "基本地点介词",
        descripcion: `Preposiciones de lugar para describir dónde están las cosas:

🔹 POSICIÓN BÁSICA:
• en = in / on / at (en la caja, en la mesa, en el cine)
• sobre / encima de = on top of (sobre la mesa, encima del armario)
• debajo de = under (debajo de la silla, debajo de la cama)

🔹 POSICIÓN RELATIVA:
• delante de = in front of (delante de la puerta, delante de mí)
• detrás de = behind (detrás del sofá, detrás de la casa)
• al lado de = next to (al lado de la ventana, al lado del parque)
• cerca de = near (cerca de la escuela, cerca del centro)
• lejos de = far from (lejos de aquí, lejos del trabajo)

🔹 POSICIÓN FRONTAL:
• enfrente de = opposite (enfrente del banco, enfrente de la iglesia)
• frente a = facing / opposite (frente a la plaza)

🔹 POSICIÓN INTERNA/EXTERNA:
• dentro de = inside (dentro del armario, dentro de la caja)
• fuera de = outside (fuera de la casa, fuera de la ciudad)

🔹 POSICIÓN ENTRE:
• entre = between (entre la cama y la ventana, entre tú y yo)

🔹 POSICIÓN ALREDEDOR:
• alrededor de = around (alrededor de la plaza, alrededor del parque)

📌 EJEMPLOS:
• El libro está sobre la mesa.
• El gato está debajo de la silla.
• Vivo cerca del parque.
• El cine está al lado del centro comercial.
• La farmacia está enfrente del banco.`,
        descripcionChino: `描述物品位置的地点介词：

🔹 基本位置：
• en = 在...里面/上面/at
• sobre / encima de = 在...上面
• debajo de = 在...下面

🔹 相对位置：
• delante de = 在...前面
• detrás de = 在...后面
• al lado de = 在...旁边
• cerca de = 在...附近
• lejos de = 离...远

🔹 正面位置：
• enfrente de = 在...对面
• frente a = 在...对面

🔹 内部/外部位置：
• dentro de = 在...里面
• fuera de = 在...外面

🔹 之间位置：
• entre = 在...之间

🔹 周围位置：
• alrededor de = 在...周围

📌 例子：
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
        id: "t2",
        titulo: "Adverbios de lugar",
        tituloChino: "地点副词",
        descripcion: `Adverbios de lugar para indicar posición sin un objeto de referencia:

🔹 DISTANCIA CERCANA:
• aquí / acá = here (aquí = exact location, acá = more general)
• ahí = there (near the person you're speaking to)
• allí / allá = there (far from both speaker and listener)

🔹 POSICIÓN VERTICAL:
• arriba = up / upstairs (está arriba, vive arriba)
• abajo = down / downstairs (está abajo, el baño está abajo)
• en la planta de arriba = on the upper floor
• en la planta de abajo = on the lower floor

🔹 POSICIÓN INTERNA/EXTERNA:
• dentro = inside (está dentro, entra dentro)
• afuera = outside (está afuera, espera afuera)

🔹 OTRAS POSICIONES:
• alrededor = around (mira alrededor, hay gente alrededor)
• enfrente = opposite (vive enfrente, el banco está enfrente)
• detrás = behind (se escondió detrás)
• delante = in front (él va delante)
• cerca = close / near (está cerca, vive cerca)
• lejos = far (está lejos, la playa está lejos)

📌 EJEMPLOS:
• Ven aquí, por favor.
• Allí está tu casa.
• El baño está arriba.
• La cocina está abajo.
• Deja las llaves ahí.
• No me gusta vivir tan lejos.

❌ ERROR COMÚN:
No confundas "aquí" (aquí mismo) con "acá" (hacia aquí, más general). También "allí" y "allá" tienen diferencias sutiles.`,
        descripcionChino: `地点副词，用于在没有参照物的情况下指示位置：

🔹 近距离：
• aquí / acá = 这里（aquí = 确切位置，acá = 更泛指）
• ahí = 那里（离听话人近）
• allí / allá = 那边（离说话人和听话人都远）

🔹 垂直位置：
• arriba = 上面/楼上
• abajo = 下面/楼下
• en la planta de arriba = 在楼上
• en la planta de abajo = 在楼下

🔹 内部/外部位置：
• dentro = 里面
• afuera = 外面

🔹 其他位置：
• alrededor = 周围
• enfrente = 对面
• detrás = 后面
• delante = 前面
• cerca = 近
• lejos = 远

📌 例子：
• Ven aquí, por favor. = 请来这里。
• Allí está tu casa. = 那边是你的房子。
• El baño está arriba. = 洗手间在上面。
• La cocina está abajo. = 厨房在下面。
• Deja las llaves ahí. = 把钥匙放在那里。
• No me gusta vivir tan lejos. = 我不喜欢住得那么远。

❌ 常见错误：
不要混淆"aquí"（就在这里）和"acá"（到这里来，更泛指）。"allí"和"allá"也有细微差别。`,
        ejemplos: [
          {
            espanol: "Ven aquí, por favor.",
            chino: "请来这里。",
          },
          {
            espanol: "Allí está tu casa.",
            chino: "那边是你的房子。",
          },
          {
            espanol: "El baño está arriba.",
            chino: "洗手间在上面。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Preguntar y dar direcciones",
        tituloChino: "问路和指路",
        descripcion: `🔹 PARA PREGUNTAR (to ask):

• ¿Dónde está...? = Where is...?
• ¿Cómo llego a...? = How do I get to...?
• ¿Hay un banco por aquí? = Is there a bank around here?
• ¿Está lejos? = Is it far?
• ¿A qué distancia está? = How far is it?
• ¿Cuánto tiempo se tarda? = How long does it take?
• ¿Puede ayudarme? = Can you help me?
• ¿Va por aquí? = Is it this way?

🔹 PARA DAR DIRECCIONES (to give directions):

MOVIMIENTO:
• sigue recto = go straight
• gira a la izquierda = turn left
• gira a la derecha = turn right
• cruza la calle = cross the street
• toma la primera calle = take the first street
• toma la segunda calle = take the second street
• continúa = continue

UBICACIÓN DEL DESTINO:
• está a la izquierda = it's on the left
• está a la derecha = it's on the right
• está al final de la calle = it's at the end of the street
• está en la esquina = it's on the corner
• está a la vuelta de la esquina = it's around the corner
• está a dos cuadras = it's two blocks away

DISTANCIA:
• está a cinco minutos a pie = it's a five-minute walk
• está a diez minutos en coche = it's a ten-minute drive
• está muy cerca = it's very close
• está bastante lejos = it's quite far

📌 EJEMPLOS:
• Sigue recto y gira a la izquierda.
• Está al final de la calle.
• Toma la segunda calle a la derecha.`,
        descripcionChino: `🔹 问路：

• ¿Dónde está...? = ...在哪里？
• ¿Cómo llego a...? = 我怎么去...？
• ¿Hay un banco por aquí? = 这附近有银行吗？
• ¿Está lejos? = 远吗？
• ¿A qué distancia está? = 有多远？
• ¿Cuánto tiempo se tarda? = 需要多长时间？
• ¿Puede ayudarme? = 您能帮我吗？
• ¿Va por aquí? = 是这边吗？

🔹 指路：

移动方向：
• sigue recto = 直走
• gira a la izquierda = 左转
• gira a la derecha = 右转
• cruza la calle = 过马路
• toma la primera calle = 走第一条街
• toma la segunda calle = 走第二条街
• continúa = 继续

目的地位置：
• está a la izquierda = 在左边
• está a la derecha = 在右边
• está al final de la calle = 在街的尽头
• está en la esquina = 在拐角处
• está a la vuelta de la esquina = 在拐角附近
• está a dos cuadras = 在两个街区外

距离：
• está a cinco minutos a pie = 步行五分钟
• está a diez minutos en coche = 开车十分钟
• está muy cerca = 很近
• está bastante lejos = 相当远

📌 例子：
• Sigue recto y gira a la izquierda. = 直走然后左转。
• Está al final de la calle. = 在街的尽头。
• Toma la segunda calle a la derecha. = 在第二条街右转。`,
        ejemplos: [
          {
            espanol: "Sigue recto y gira a la izquierda.",
            chino: "直走然后左转。",
          },
          {
            espanol: "Está al final de la calle.",
            chino: "在街的尽头。",
          },
          {
            espanol: "Está a cinco minutos a pie.",
            chino: "步行五分钟。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Preposiciones compuestas y expresiones",
        tituloChino: "复合介词和表达",
        descripcion: `🔹 PREPOSICIONES COMPUESTAS:

• en medio de = in the middle of (en medio de la plaza)
• en el centro de = in the center of (en el centro de la ciudad)
• en la esquina de = on the corner of (en la esquina de la calle)
• al fondo de = at the back of (al fondo del pasillo)
• a la entrada de = at the entrance of (a la entrada del parque)
• a la salida de = at the exit of (a la salida del metro)
• alrededor de = around (alrededor de la mesa)
• junto a = next to (junto a la ventana)
• enfrente de = opposite (enfrente del supermercado)
• frente a = facing (frente al mar)

🔹 EXPRESIONES ÚTILES:

• a la derecha de = to the right of
• a la izquierda de = to the left of
• arriba de = above (arriba del armario)
• abajo de = below (abajo del puente)
• dentro de = inside (dentro de la caja)
• fuera de = outside (fuera del edificio)

📌 EJEMPLOS:
• Hay una fuente en medio de la plaza.
• El banco está a la derecha del supermercado.
• Mi casa está al fondo del pasillo.
• Estación de metro está a la salida del parque.

📌 MAPA MENTAL DE PREPOSICIONES:

        ARRIBA
           |
   IZQUIERDA --- DERECHA
           |
        ABAJO

• Delante = frente
• Detrás = espalda`,
        descripcionChino: `🔹 复合介词：

• en medio de = 在...中间
• en el centro de = 在...中心
• en la esquina de = 在...拐角处
• al fondo de = 在...尽头
• a la entrada de = 在...入口处
• a la salida de = 在...出口处
• alrededor de = 在...周围
• junto a = 紧挨着
• enfrente de = 在...对面
• frente a = 面对...

🔹 有用表达：

• a la derecha de = 在...右边
• a la izquierda de = 在...左边
• arriba de = 在...上面
• abajo de = 在...下面
• dentro de = 在...里面
• fuera de = 在...外面

📌 例子：
• Hay una fuente en medio de la plaza. = 广场中间有一个喷泉。
• El banco está a la derecha del supermercado. = 银行在超市右边。
• Mi casa está al fondo del pasillo. = 我的房子在走廊尽头。
• La estación de metro está a la salida del parque. = 地铁站在公园出口处。

📌 介词思维导图：

        上面
          |
   左边 --- 右边
          |
        下面

• Delante = 前面
• Detrás = 后面`,
        ejemplos: [
          {
            espanol: "Hay una fuente en medio de la plaza.",
            chino: "广场中间有一个喷泉。",
          },
          {
            espanol: "El banco está a la derecha del supermercado.",
            chino: "银行在超市右边。",
          },
          {
            espanol: "Mi casa está al fondo del pasillo.",
            chino: "我的房子在走廊尽头。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "en",
        chino: "在...里/上",
        ejemplo: "En la mesa.",
      },
      {
        id: "v2",
        espanol: "sobre",
        chino: "在...上",
        ejemplo: "Sobre la mesa.",
      },
      {
        id: "v3",
        espanol: "debajo de",
        chino: "在...下",
        ejemplo: "Debajo de la mesa.",
      },
      {
        id: "v4",
        espanol: "delante de",
        chino: "在...前",
        ejemplo: "Delante de la casa.",
      },
      {
        id: "v5",
        espanol: "detrás de",
        chino: "在...后",
        ejemplo: "Detrás de la puerta.",
      },
      {
        id: "v6",
        espanol: "al lado de",
        chino: "在...旁",
        ejemplo: "Al lado de mí.",
      },
      {
        id: "v7",
        espanol: "cerca de",
        chino: "在...附近",
        ejemplo: "Cerca del parque.",
      },
      {
        id: "v8",
        espanol: "lejos de",
        chino: "离...远",
        ejemplo: "Lejos de aquí.",
      },
      {
        id: "v9",
        espanol: "enfrente de",
        chino: "在...对面",
        ejemplo: "Enfrente del banco.",
      },
      {
        id: "v10",
        espanol: "entre",
        chino: "在...之间",
        ejemplo: "Entre tú y yo.",
      },
      {
        id: "v11",
        espanol: "dentro de",
        chino: "在...里面",
        ejemplo: "Dentro de la caja.",
      },
      {
        id: "v12",
        espanol: "fuera de",
        chino: "在...外面",
        ejemplo: "Fuera de la ciudad.",
      },
      {
        id: "v13",
        espanol: "alrededor de",
        chino: "在...周围",
        ejemplo: "Alrededor de la plaza.",
      },
      {
        id: "v14",
        espanol: "aquí",
        chino: "这里",
        ejemplo: "Ven aquí.",
      },
      {
        id: "v15",
        espanol: "allí",
        chino: "那里",
        ejemplo: "Allí está.",
      },
      {
        id: "v16",
        espanol: "ahí",
        chino: "那里(近)",
        ejemplo: "Déjalo ahí.",
      },
      {
        id: "v17",
        espanol: "arriba",
        chino: "上面",
        ejemplo: "Mira arriba.",
      },
      {
        id: "v18",
        espanol: "abajo",
        chino: "下面",
        ejemplo: "Está abajo.",
      },
      {
        id: "v19",
        espanol: "izquierda",
        chino: "左边",
        ejemplo: "Gira a la izquierda.",
      },
      {
        id: "v20",
        espanol: "derecha",
        chino: "右边",
        ejemplo: "Gira a la derecha.",
      },
      {
        id: "v21",
        espanol: "recto",
        chino: "直走",
        ejemplo: "Sigue recto.",
      },
      {
        id: "v22",
        espanol: "la esquina",
        chino: "拐角",
        ejemplo: "En la esquina.",
      },
      {
        id: "v23",
        espanol: "la cuadra",
        chino: "街区",
        ejemplo: "A dos cuadras.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Preguntando direcciones",
        tituloChino: "问路",
        personajes: ["Turista", "Local"],
        lineas: [
          {
            personaje: "Turista",
            texto: "Disculpe, ¿dónde está el museo?",
            traduccion: "打扰一下，博物馆在哪里？",
          },
          {
            personaje: "Local",
            texto: "Está al lado de la biblioteca.",
            traduccion: "它在图书馆旁边。",
          },
          {
            personaje: "Turista",
            texto: "¿Está lejos de aquí?",
            traduccion: "离这里远吗？",
          },
          {
            personaje: "Local",
            texto: "No, está muy cerca. Siga todo recto.",
            traduccion: "不，很近。一直往前走。",
          },
          {
            personaje: "Turista",
            texto: "¿A la derecha o a la izquierda?",
            traduccion: "右边还是左边？",
          },
          {
            personaje: "Local",
            texto: "A la derecha, enfrente del parque.",
            traduccion: "右边，公园对面。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Buscando objetos",
        tituloChino: "寻找物品",
        personajes: ["Ana", "Carlos"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Carlos, ¿dónde están las llaves?",
            traduccion: "卡洛斯，钥匙在哪里？",
          },
          {
            personaje: "Carlos",
            texto: "Están sobre la mesa del salón.",
            traduccion: "它们在客厅的桌子上。",
          },
          {
            personaje: "Ana",
            texto: "No las veo. ¿Están debajo de algo?",
            traduccion: "我没看见。它们在什么东西下面吗？",
          },
          {
            personaje: "Carlos",
            texto: "Mira detrás del sofá.",
            traduccion: "看看沙发后面。",
          },
          {
            personaje: "Ana",
            texto: "¡Ah, sí! Aquí están. Gracias.",
            traduccion: "啊，是的！在这里。谢谢。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Describiendo ubicación",
        tituloChino: "描述位置",
        personajes: ["María", "Pedro"],
        lineas: [
          {
            personaje: "María",
            texto: "Pedro, ¿dónde está tu casa?",
            traduccion: "佩德罗，你的房子在哪里？",
          },
          {
            personaje: "Pedro",
            texto: "Está cerca de la universidad, entre el banco y la farmacia.",
            traduccion: "在大学附近，在银行和药店之间。",
          },
          {
            personaje: "María",
            texto: "¿Hay un supermercado cerca?",
            traduccion: "附近有超市吗？",
          },
          {
            personaje: "Pedro",
            texto: "Sí, está enfrente de mi casa.",
            traduccion: "是的，在我家对面。",
          },
          {
            personaje: "María",
            texto: "¡Qué bien! Es muy cómodo.",
            traduccion: "真好！很方便。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Dando indicaciones detalladas",
        tituloChino: "给出详细指示",
        personajes: ["Laura", "David"],
        lineas: [
          {
            personaje: "Laura",
            texto: "David, ¿cómo llego a la estación de tren?",
            traduccion: "大卫，我怎么去火车站？",
          },
          {
            personaje: "David",
            texto: "Sal de casa y gira a la izquierda.",
            traduccion: "出家然后左转。",
          },
          {
            personaje: "Laura",
            texto: "¿Y después?",
            traduccion: "然后呢？",
          },
          {
            personaje: "David",
            texto: "Sigue recto dos cuadras. Pasarás por una farmacia a la derecha.",
            traduccion: "直走两个街区。你会经过右边的一家药店。",
          },
          {
            personaje: "Laura",
            texto: "¿Y luego?",
            traduccion: "然后呢？",
          },
          {
            personaje: "David",
            texto: "En el semáforo, gira a la derecha. La estación está al final de la calle.",
            traduccion: "在红绿灯处右转。火车站在街的尽头。",
          },
          {
            personaje: "Laura",
            texto: "¿Cuánto tiempo se tarda?",
            traduccion: "需要多长时间？",
          },
          {
            personaje: "David",
            texto: "Unos quince minutos andando.",
            traduccion: "步行约十五分钟。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Ubicando objetos en una habitación",
        tituloChino: "定位房间里的物品",
        personajes: ["Sofía", "Javier"],
        lineas: [
          {
            personaje: "Sofía",
            texto: "Javier, ¿dónde está mi móvil?",
            traduccion: "哈维尔，我的手机在哪里？",
          },
          {
            personaje: "Javier",
            texto: "Está encima de la mesa, al lado del ordenador.",
            traduccion: "在桌子上，电脑旁边。",
          },
          {
            personaje: "Sofía",
            texto: "No lo encuentro. ¿No estará debajo de los papeles?",
            traduccion: "我没找到。会不会在文件下面？",
          },
          {
            personaje: "Javier",
            texto: "Mira dentro del cajón. A veces lo dejas ahí.",
            traduccion: "看看抽屉里面。你有时把它放在那里。",
          },
          {
            personaje: "Sofía",
            texto: "Ah, sí. Gracias. También necesito las gafas. ¿Están cerca?",
            traduccion: "啊，是的。谢谢。我还需要眼镜。它们近吗？",
          },
          {
            personaje: "Javier",
            texto: "Las gafas están detrás de la lámpara, en la mesita de noche.",
            traduccion: "眼镜在灯后面，在床头柜上。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "为了说'在...上面'：_____ de",
          preguntaChino: "为了说'在...上面'：_____ de",
          respuestaCorrecta: "encima",
          explicacion: "Encima de = 在...上面",
          pista: "首字母是 e，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c2",
          pregunta: "为了说'在...下面'：_____ de",
          preguntaChino: "为了说'在...下面'：_____ de",
          respuestaCorrecta: "debajo",
          explicacion: "Debajo de = 在...下面",
          pista: "首字母是 d，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c3",
          pregunta: "为了说'在...前面'：_____ de",
          preguntaChino: "为了说'在...前面'：_____ de",
          respuestaCorrecta: "delante",
          explicacion: "Delante de = 在...前面",
          pista: "首字母是 d，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c4",
          pregunta: "为了说'在...后面'：_____ de",
          preguntaChino: "为了说'在...后面'：_____ de",
          respuestaCorrecta: "detrás",
          explicacion: "Detrás de = 在...后面",
          pista: "首字母是 d，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c5",
          pregunta: "为了说'在...旁边'：al _____ de",
          preguntaChino: "为了说'在...旁边'：al _____ de",
          respuestaCorrecta: "lado",
          explicacion: "Al lado de = 在...旁边",
          pista: "首字母是 l，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c6",
          pregunta: "为了说'在...对面'：_____ de",
          preguntaChino: "为了说'在...对面'：_____ de",
          respuestaCorrecta: "enfrente",
          explicacion: "Enfrente de = 在...对面",
          pista: "首字母是 e，8个字母",
          numeroLetras: 8,
        },
        {
          id: "c7",
          pregunta: "为了说'在...中间'：en _____ de",
          preguntaChino: "为了说'在...中间'：en _____ de",
          respuestaCorrecta: "medio",
          explicacion: "En medio de = 在...中间",
          pista: "首字母是 m，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c8",
          pregunta: "为了说'在...角落'：en la _____ de",
          preguntaChino: "为了说'在...角落'：en la _____ de",
          respuestaCorrecta: "esquina",
          explicacion: "En la esquina = 在拐角处",
          pista: "首字母是 e，7个字母",
          numeroLetras: 7,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "'Sobre'是什么意思？",
          preguntaChino: "'Sobre'是什么意思？",
          opciones: ["在...下面", "在...上面", "在...旁边", "在...后面"],
          respuestaCorrecta: "在...上面",
          explicacion: "Sobre = 在...上面",
        },
        {
          id: "s2",
          pregunta: "如何说'猫在椅子下面'？",
          preguntaChino: "如何说'猫在椅子下面'？",
          opciones: [
            "El gato está sobre la silla",
            "El gato está debajo de la silla",
            "El gato está al lado de la silla",
            "El gato está detrás de la silla",
          ],
          respuestaCorrecta: "El gato está debajo de la silla",
          explicacion: "Debajo de = 在...下面",
        },
        {
          id: "s3",
          pregunta: "'Gira a la izquierda'是什么意思？",
          preguntaChino: "'Gira a la izquierda'是什么意思？",
          opciones: ["右转", "左转", "直走", "后退"],
          respuestaCorrecta: "左转",
          explicacion: "Izquierda = 左边",
        },
        {
          id: "s4",
          pregunta: "如何说'银行在药店旁边'？",
          preguntaChino: "如何说'银行在药店旁边'？",
          opciones: [
            "El banco está lejos de la farmacia",
            "El banco está al lado de la farmacia",
            "El banco está detrás de la farmacia",
            "El banco está encima de la farmacia",
          ],
          respuestaCorrecta: "El banco está al lado de la farmacia",
          explicacion: "Al lado de = 在...旁边",
        },
        {
          id: "s5",
          pregunta: "'Aquí'和'allí'的区别是什么？",
          preguntaChino: "'Aquí'和'allí'的区别是什么？",
          opciones: [
            "Aquí es lejos, allí es cerca",
            "Aquí es cerca, allí es lejos",
            "Ambos son iguales",
            "Aquí es arriba, allí es abajo",
          ],
          respuestaCorrecta: "Aquí es cerca, allí es lejos",
          explicacion: "Aquí = 这里（近），allí = 那里（远）",
        },
        {
          id: "s6",
          pregunta: "¿Qué significa 'al fondo de'?",
          preguntaChino: "'al fondo de'是什么意思？",
          opciones: ["在...前面", "在...尽头", "在...旁边", "在...对面"],
          respuestaCorrecta: "在...尽头",
          explicacion: "Al fondo de = at the end of",
        },
        {
          id: "s7",
          pregunta: "¿Cómo se dice '在拐角处' en español?",
          preguntaChino: "西班牙语中'在拐角处'怎么说？",
          opciones: ["en la calle", "en la esquina", "en la acera", "en el semáforo"],
          respuestaCorrecta: "en la esquina",
          explicacion: "Esquina = 拐角",
        },
        {
          id: "s8",
          pregunta: "¿Qué significa 'a la vuelta de la esquina'?",
          preguntaChino: "'a la vuelta de la esquina'是什么意思？",
          opciones: ["在拐角处", "在拐角附近", "在街对面", "在尽头"],
          respuestaCorrecta: "在拐角附近",
          explicacion: "A la vuelta de la esquina = around the corner",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Debajo de' significa 'encima de'.",
          preguntaChino: "'Debajo de' significa 'encima de'.",
          respuestaCorrecta: false,
          explicacion: "错。Debajo de = 在...下面",
        },
        {
          id: "vf2",
          pregunta: "'Cerca de' es lo opuesto de 'lejos de'.",
          preguntaChino: "'Cerca de' es lo opuesto de 'lejos de'.",
          respuestaCorrecta: true,
          explicacion: "对。Cerca = 近，lejos = 远",
        },
        {
          id: "vf3",
          pregunta: "'Delante de' significa 'behind'.",
          preguntaChino: "'Delante de' significa 'behind'.",
          respuestaCorrecta: false,
          explicacion: "错。Delante de = 在...前面",
        },
        {
          id: "vf4",
          pregunta: "'Sigue recto' significa 'go straight'.",
          preguntaChino: "'Sigue recto' significa 'go straight'.",
          respuestaCorrecta: true,
          explicacion: "对。Sigue recto = 直走",
        },
        {
          id: "vf5",
          pregunta: "'Entre' se usa para dos o más cosas.",
          preguntaChino: "'Entre' se usa para dos o más cosas.",
          respuestaCorrecta: true,
          explicacion: "对。Entre = 在...之间",
        },
        {
          id: "vf6",
          pregunta: "'Enfrente de' significa 'behind'.",
          preguntaChino: "'Enfrente de'意思是'在后面'。",
          respuestaCorrecta: false,
          explicacion: "错。Enfrente de = 在对面",
        },
        {
          id: "vf7",
          pregunta: "'Alrededor de' significa 'around'.",
          preguntaChino: "'Alrededor de'意思是'在...周围'。",
          respuestaCorrecta: true,
          explicacion: "对。Alrededor de = around",
        },
        {
          id: "vf8",
          pregunta: "'Dentro de' es lo opuesto de 'fuera de'.",
          preguntaChino: "'Dentro de'是'fuera de'的反义词。",
          respuestaCorrecta: true,
          explicacion: "对。Dentro = 里面，fuera = 外面",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "encima de",
              derecha: "在...上面",
            },
            {
              izquierda: "debajo de",
              derecha: "在...下面",
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
              izquierda: "al lado de",
              derecha: "在...旁边",
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
              izquierda: "enfrente de",
              derecha: "在...对面",
            },
            {
              izquierda: "entre",
              derecha: "在...之间",
            },
            {
              izquierda: "dentro de",
              derecha: "在...里面",
            },
            {
              izquierda: "fuera de",
              derecha: "在...外面",
            },
            {
              izquierda: "alrededor de",
              derecha: "在...周围",
            },
            {
              izquierda: "en medio de",
              derecha: "在...中间",
            },
            {
              izquierda: "al fondo de",
              derecha: "在...尽头",
            },
          ],
          explicacion: "将介词与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["está", "libro", "El", "mesa", "la", "sobre", "."],
          respuestaCorrecta: "El libro está sobre la mesa.",
          explicacion: "正确的句子是：El libro está sobre la mesa.",
        },
        {
          id: "o2",
          palabras: ["gato", "El", "silla", "debajo", "está", "de", "la", "."],
          respuestaCorrecta: "El gato está debajo de la silla.",
          explicacion: "正确的句子是：El gato está debajo de la silla.",
        },
        {
          id: "o3",
          palabras: ["farmacia", "El", "está", "banco", "al", "lado", "de", "la", "."],
          respuestaCorrecta: "El banco está al lado de la farmacia.",
          explicacion: "正确的句子是：El banco está al lado de la farmacia.",
        },
        {
          id: "o4",
          palabras: ["parque", "está", "El", "museo", "enfrente", "del", "."],
          respuestaCorrecta: "El museo está enfrente del parque.",
          explicacion: "正确的顺序是：El museo está enfrente del parque.",
        },
        {
          id: "o5",
          palabras: ["calle", "final", "al", "está", "La", "tienda", "de", "la", "."],
          respuestaCorrecta: "La tienda está al final de la calle.",
          explicacion: "正确的顺序是：La tienda está al final de la calle.",
        },
        {
          id: "o6",
          palabras: ["iglesia", "está", "centro", "El", "en", "la", "plaza", "de", "la", "."],
          respuestaCorrecta: "La iglesia está en el centro de la plaza.",
          explicacion: "正确的顺序是：La iglesia está en el centro de la plaza.",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "书在桌子上。",
          respuestaEsperada: "El libro está sobre la mesa.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "猫在椅子下面。",
          respuestaEsperada: "El gato está debajo de la silla.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "银行在药店旁边。",
          respuestaEsperada: "El banco está al lado de la farmacia.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "学校离这里很远。",
          respuestaEsperada: "La escuela está lejos de aquí.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "药店在邮局对面。",
          respuestaEsperada: "La farmacia está enfrente de la oficina de correos.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "钥匙在抽屉里。",
          respuestaEsperada: "Las llaves están dentro del cajón.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "我的房子在银行和药店之间。",
          respuestaEsperada: "Mi casa está entre el banco y la farmacia.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "超市在拐角处。",
          respuestaEsperada: "El supermercado está en la esquina.",
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
        instruccion: "用正确的地点介词完成对话。",
        instruccionChino: "用正确的地点介词完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿Dónde está el supermercado?",
            respuesta: "",
          },
          {
            personaje: "B",
            texto: "Está _____ de la farmacia.",
            respuesta: "al lado",
          },
          {
            personaje: "A",
            texto: "¿Está _____ de aquí?",
            respuesta: "lejos",
          },
          {
            personaje: "B",
            texto: "No, está muy _____.",
            respuesta: "cerca",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "describir",
        titulo: "Describe tu habitación",
        tituloChino: "描述你的房间",
        instruccion: "Describe tu habitación usando preposiciones de lugar (5-6 frases).",
        instruccionChino: "用地点介词描述你的房间（5-6句话）。",
        ejemplo:
          "Mi cama está al lado de la ventana. La lámpara está sobre la mesita de noche. El armario está detrás de la puerta. El ordenador está encima del escritorio. Las cortinas son azules. Hay una alfombra debajo de la cama.",
      },
      {
        id: "ep3",
        tipo: "direcciones",
        titulo: "Da direcciones",
        tituloChino: "指路",
        instruccion:
          "Escribe las direcciones desde tu casa hasta el lugar más cercano (supermercado, parque, etc.).",
        instruccionChino: "写出从你家到最近的地方（超市、公园等）的路线。",
        ejemplo:
          "Desde mi casa, sigo recto hasta el semáforo. Giro a la izquierda y cruzo la calle. El supermercado está a la derecha, al lado de la farmacia.",
      },
      {
        id: "ep4",
        tipo: "completarTabla",
        titulo: "Completa la tabla de preposiciones",
        tituloChino: "完成介词表格",
        instruccion: "Escribe la preposición de lugar correcta según la imagen (descrita en palabras).",
        instruccionChino: "根据描述写出正确的地点介词。",
        tabla: [
          {
            situacion: "El libro está ___ la mesa.",
            respuesta: "sobre",
          },
          {
            situacion: "El gato está ___ la silla.",
            respuesta: "debajo de",
          },
          {
            situacion: "La farmacia está ___ el banco.",
            respuesta: "al lado de",
          },
          {
            situacion: "La escuela está ___ la iglesia.",
            respuesta: "enfrente de",
          },
          {
            situacion: "La tienda está ___ la calle.",
            respuesta: "al final de",
          },
        ],
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "Describe dónde están los objetos en tu habitación.",
        preguntaChino: "描述你房间里的物品在哪里。",
        sugerencia: "Mi cama está... Mi escritorio está... La lámpara está...",
        sugerenciaChino: "Mi cama está... Mi escritorio está... La lámpara está...",
      },
      {
        id: "pa2",
        pregunta: "¿Cómo se va de tu casa a la escuela o trabajo?",
        preguntaChino: "从你家怎么去学校或工作地点？",
        sugerencia: "Salgo de casa, sigo recto, giro a la izquierda...",
        sugerenciaChino: "Salgo de casa, sigo recto, giro a la izquierda...",
      },
      {
        id: "pa3",
        pregunta: "¿Qué hay cerca de tu casa?",
        preguntaChino: "你家附近有什么？",
        sugerencia: "Cerca de mi casa hay un parque, un supermercado y una farmacia.",
        sugerenciaChino: "Cerca de mi casa hay un parque, un supermercado y una farmacia.",
      },
      {
        id: "pa4",
        pregunta: "¿Dónde está el banco más cercano a tu casa?",
        preguntaChino: "离你家最近的银行在哪里？",
        sugerencia: "El banco más cercano está en la calle..., cerca de...",
        sugerenciaChino: "El banco más cercano está en la calle..., cerca de...",
      },
      {
        id: "pa5",
        pregunta: "¿Qué diferencias hay entre 'cerca de' y 'al lado de'?",
        preguntaChino: "'cerca de'和'al lado de'有什么区别？",
        sugerencia:
          "Al lado de = inmediatamente junto. Cerca de = a una distancia corta pero no necesariamente junto.",
        sugerenciaChino: "Al lado de = 紧挨着。Cerca de = 在附近但不一定紧挨着。",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '在...上面' en español?",
        preguntaChino: "西班牙语中'在...上面'怎么说？",
        respuestaSugerida: "encima de / sobre",
        respuestaSugeridaChino: "encima de / sobre",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '在...旁边' en español?",
        preguntaChino: "西班牙语中'在...旁边'怎么说？",
        respuestaSugerida: "al lado de",
        respuestaSugeridaChino: "al lado de",
      },
      {
        id: "p3",
        pregunta: "¿Qué significa 'Sigue recto'?",
        preguntaChino: "'Sigue recto'是什么意思？",
        respuestaSugerida: "直走",
        respuestaSugeridaChino: "Go straight",
      },
      {
        id: "p4",
        pregunta: "¿Cómo preguntas 'Where is the bank?' en español?",
        preguntaChino: "西班牙语中'银行在哪里？'怎么问？",
        respuestaSugerida: "¿Dónde está el banco?",
        respuestaSugeridaChino: "¿Dónde está el banco?",
      },
      {
        id: "p5",
        pregunta: "¿Cuál es la diferencia entre 'aquí' y 'acá'?",
        preguntaChino: "'aquí'和'acá'有什么区别？",
        respuestaSugerida: "Aquí es más preciso, acá es más general.",
        respuestaSugeridaChino: "Aquí更精确，acá更泛指。",
      },
      {
        id: "p6",
        pregunta: "¿Cómo se dice '在拐角处' en español?",
        preguntaChino: "西班牙语中'在拐角处'怎么说？",
        respuestaSugerida: "en la esquina",
        respuestaSugeridaChino: "en la esquina",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Pronombres de objeto directo (OD)",
        tituloChino: "直接宾语代词",
        descripcion: `Los pronombres de objeto directo responden a la pregunta "¿qué?" o "¿a quién?".

🔹 PRONOMBRES OD:

| Persona | Pronombre | Ejemplo |
|---------|-----------|---------|
| yo | me | Me ves (tú me ves a mí) |
| tú | te | Te veo (yo te veo a ti) |
| él/ella/usted | lo / la | Lo veo (a él) / La veo (a ella) |
| nosotros | nos | Nos ven (ellos nos ven) |
| vosotros | os | Os veo (yo os veo) |
| ellos/ellas/ustedes | los / las | Los veo (a ellos) / Las veo (a ellas) |

🔹 REGLAS IMPORTANTES:
• "Lo" se usa para sustantivos masculinos singulares
• "La" se usa para sustantivos femeninos singulares
• "Los" se usa para sustantivos masculinos plurales
• "Las" se usa para sustantivos femeninos plurales

🔹 EJEMPLOS:
• Veo el coche → Lo veo.
• Como la manzana → La como.
• Leo los libros → Los leo.
• Compro las manzanas → Las compro.
• Conozco a María → La conozco.
• Conozco a Pedro → Lo conozco.

📌 POSICIÓN:
Los pronombres OD se colocan ANTES del verbo conjugado:
• Lo veo (correcto)
• Veolo (incorrecto)

❌ ERROR COMÚN:
No confundas "lo" (objeto directo) con "le" (objeto indirecto).`,
        descripcionChino: `直接宾语代词回答"什么？"或"谁？"的问题。

🔹 直接宾语代词：

| 人称 | 代词 | 例子 |
|------|------|------|
| 我 | me | Me ves (你看见我) |
| 你 | te | Te veo (我看见你) |
| 他/她/您 | lo / la | Lo veo (看见他) / La veo (看见她) |
| 我们 | nos | Nos ven (他们看见我们) |
| 你们 | os | Os veo (我看见你们) |
| 他们/她们/您们 | los / las | Los veo (看见他们) / Las veo (看见她们) |

🔹 重要规则：
• "Lo" 用于阳性单数名词
• "La" 用于阴性单数名词
• "Los" 用于阳性复数名词
• "Las" 用于阴性复数名词

🔹 例子：
• Veo el coche (我看见车) → Lo veo (我看见它)
• Como la manzana (我吃苹果) → La como (我吃它)
• Leo los libros (我读书) → Los leo (我读它们)
• Compro las manzanas (我买苹果) → Las compro (我买它们)
• Conozco a María (我认识玛丽亚) → La conozco (我认识她)
• Conozco a Pedro (我认识佩德罗) → Lo conozco (我认识他)

📌 位置：
宾语代词放在变位动词之前：
• Lo veo (正确)
• Veolo (错误)

❌ 常见错误：
不要混淆"lo"（直接宾语）和"le"（间接宾语）。`,
        ejemplos: [
          {
            espanol: "¿Ves la película? → Sí, la veo.",
            chino: "你看电影吗？→ 是的，我看。",
          },
          {
            espanol: "Compro los libros → Los compro.",
            chino: "我买书 → 我买它们。",
          },
          {
            espanol: "Conozco a Juan → Lo conozco.",
            chino: "我认识胡安 → 我认识他。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Pronombres de objeto indirecto (OI)",
        tituloChino: "间接宾语代词",
        descripcion: `Los pronombres de objeto indirecto responden a la pregunta "¿a quién?" o "¿para quién?".

🔹 PRONOMBRES OI:

| Persona | Pronombre | Ejemplo |
|---------|-----------|---------|
| yo | me | Me da el libro (él me da el libro a mí) |
| tú | te | Te doy el regalo (yo te doy el regalo a ti) |
| él/ella/usted | le | Le doy el libro (a él/ella/usted) |
| nosotros | nos | Nos dan la información (a nosotros) |
| vosotros | os | Os compro un regalo (a vosotros) |
| ellos/ellas/ustedes | les | Les envío un mensaje (a ellos/ellas/ustedes) |

🔹 EJEMPLOS:
• Doy el libro a María → Le doy el libro.
• Envío un mensaje a ellos → Les envío un mensaje.
• Compro un regalo para ti → Te compro un regalo.
• Presto dinero a Juan → Le presto dinero.

📌 DIFERENCIA ENTRE OD Y OI:
• OD responde a "¿qué?" o "¿a quién?" (directamente)
• OI responde a "¿a quién?" o "¿para quién?" (indirectamente)

Ejemplo:
• Doy el libro (OD: el libro) a María (OI: a María)

❌ ERROR COMÚN:
No confundas "le" (OI singular) con "les" (OI plural) o "lo/la" (OD).`,
        descripcionChino: `间接宾语代词回答"给谁？"或"为了谁？"的问题。

🔹 间接宾语代词：

| 人称 | 代词 | 例子 |
|------|------|------|
| 我 | me | Me da el libro (他给我书) |
| 你 | te | Te doy el regalo (我给你礼物) |
| 他/她/您 | le | Le doy el libro (我给他/她书) |
| 我们 | nos | Nos dan la información (他们给我们信息) |
| 你们 | os | Os compro un regalo (我给你们买礼物) |
| 他们/她们/您们 | les | Les envío un mensaje (我给他们发消息) |

🔹 例子：
• Doy el libro a María (我给玛丽亚书) → Le doy el libro (我给她书)
• Envío un mensaje a ellos (我给他们发消息) → Les envío un mensaje
• Compro un regalo para ti (我给你买礼物) → Te compro un regalo
• Presto dinero a Juan (我借钱给胡安) → Le presto dinero

📌 直接宾语和间接宾语的区别：
• 直接宾语回答"什么？"或"谁？"（直接）
• 间接宾语回答"给谁？"或"为了谁？"（间接）

例子：
• Doy el libro (直接宾语：el libro) a María (间接宾语：a María)

❌ 常见错误：
不要混淆"le"（单数间接宾语）和"les"（复数间接宾语）或"lo/la"（直接宾语）。`,
        ejemplos: [
          {
            espanol: "Digo la verdad a Juan → Le digo la verdad.",
            chino: "我跟胡安说真话 → 我跟他说真话。",
          },
          {
            espanol: "Me compró un regalo.",
            chino: "他给我买了礼物。",
          },
          {
            espanol: "Les escribo una carta.",
            chino: "我给他们写一封信。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "OD + OI juntos (dos pronombres)",
        tituloChino: "直接宾语 + 间接宾语一起用",
        descripcion: `Cuando usamos OD y OI juntos:

🔹 REGLAS:
1. El OI va PRIMERO, luego el OD.
2. "le" y "les" se cambian a "SE" antes de "lo/la/los/las".

📌 ESTRUCTURA: OI + OD + verbo

🔹 EJEMPLOS:
• Doy el libro a María → Se lo doy.
  (le + lo → se lo)

• Envío la carta a Juan → Se la envío.
  (le + la → se la)

• Compro los regalos para los niños → Se los compro.
  (les + los → se los)

• Vendo las flores a mi madre → Se las vendo.
  (le + las → se las)

🔹 TABLA DE COMBINACIONES:

| OI + OD | Resultado | Ejemplo |
|---------|-----------|---------|
| le + lo | se lo | Se lo doy |
| le + la | se la | Se la envío |
| le + los | se los | Se los compro |
| le + las | se las | Se las vendo |
| les + lo | se lo | Se lo digo a ellos |
| les + la | se la | Se la mando |
| les + los | se los | Se los regalo |
| les + las | se las | Se las presto |

📌 EJEMPLOS COMPLETOS:
• ¿Tienes el libro? → Sí, se lo doy a María.
• ¿Tienes la carta? → Sí, se la envío a Juan.
• ¿Tienes los regalos? → Sí, se los compro a los niños.

❌ ERROR COMÚN:
No digas "le lo doy". Siempre cambia a "se lo doy".`,
        descripcionChino: `同时使用直接宾语和间接宾语时：

🔹 规则：
1. 间接宾语在前，直接宾语在后
2. "le"和"les"在"lo/la/los/las"前面要变成"se"

📌 结构：间接宾语 + 直接宾语 + 动词

🔹 例子：
• Doy el libro a María (我给玛丽亚书) → Se lo doy (我把它给她)
  (le + lo → se lo)

• Envío la carta a Juan (我寄信给胡安) → Se la envío (我把它寄给他)
  (le + la → se la)

• Compro los regalos para los niños (我给孩子们买礼物) → Se los compro
  (les + los → se los)

• Vendo las flores a mi madre (我卖花给我妈妈) → Se las vendo
  (le + las → se las)

🔹 组合表：

| 间接宾语 + 直接宾语 | 结果 | 例子 |
|-------------------|------|------|
| le + lo | se lo | Se lo doy |
| le + la | se la | Se la envío |
| le + los | se los | Se los compro |
| le + las | se las | Se las vendo |
| les + lo | se lo | Se lo digo a ellos |
| les + la | se la | Se la mando |
| les + los | se los | Se los regalo |
| les + las | se las | Se las presto |

📌 完整例子：
• ¿Tienes el libro? → Sí, se lo doy a María. = 你有书吗？→ 是的，我把它给玛丽亚。
• ¿Tienes la carta? → Sí, se la envío a Juan. = 你有信吗？→ 是的，我把它寄给胡安。
• ¿Tienes los regalos? → Sí, se los compro a los niños. = 你有礼物吗？→ 是的，我买给孩子们。

❌ 常见错误：
不要说"le lo doy"。总是改为"se lo doy"。`,
        ejemplos: [
          {
            espanol: "¿Tienes el libro? → Sí, se lo doy a María.",
            chino: "你有书吗？→ 是的，我把它给玛丽亚。",
          },
          {
            espanol: "Se lo compré ayer.",
            chino: "我昨天买给他了。",
          },
          {
            espanol: "¿Me prestas el dinero? → Sí, te lo presto.",
            chino: "你能借钱给我吗？→ 是的，我借给你。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Posición de los pronombres",
        tituloChino: "代词的位置",
        descripcion: `Los pronombres pueden ir en diferentes posiciones según el tipo de verbo:

🔹 1. CON VERBOS CONJUGADOS (presente, pasado, etc.):
• Los pronombres van ANTES del verbo.

Ejemplos:
• Lo veo. (I see it)
• Te quiero. (I love you)
• Se lo dije. (I told him/her)
• Me lo compró. (He bought it for me)

🔹 2. CON INFINITIVOS (verbos en -ar, -er, -ir):
• Los pronombres se PEGAN al final del infinitivo.

Ejemplos:
• Voy a comprarlo. (I'm going to buy it)
• Quiero verte. (I want to see you)
• Puedo hacerlo. (I can do it)
• Necesito decírtelo. (I need to tell you it)

🔹 3. CON GERUNDIOS (-ando, -iendo):
• Los pronombres se PEGAN al final del gerundio.

Ejemplos:
• Estoy comprándolo. (I'm buying it)
• Está haciéndolo. (He/She is doing it)
• Estaban mirándonos. (They were watching us)

🔹 4. CON IMPERATIVOS AFIRMATIVOS (mandatos):
• Los pronombres se PEGAN al final del imperativo.

Ejemplos:
• Cómpramelo. (Buy it for me)
• Dime la verdad. (Tell me the truth)
• Hazlo ahora. (Do it now)

🔹 5. CON IMPERATIVOS NEGATIVOS:
• Los pronombres van ANTES del verbo.

Ejemplos:
• No me lo compres. (Don't buy it for me)
• No me digas eso. (Don't tell me that)
• No lo hagas. (Don't do it)

📌 TABLA RESUMEN:

| Tipo de verbo | Posición | Ejemplo |
|---------------|----------|---------|
| Conjugado | Antes | Lo veo |
| Infinitivo | Pegado al final | Verlo |
| Gerundio | Pegado al final | Viéndolo |
| Imperativo afirmativo | Pegado al final | Cómpramelo |
| Imperativo negativo | Antes | No me lo compres |

❌ ERROR COMÚN:
No digas "lo voy a ver" cuando quieras decir "Voy a verlo". Ambas son correctas, pero la segunda es más natural en España.`,
        descripcionChono: `根据动词类型，代词可以放在不同位置：

🔹 1. 变位动词（现在时、过去时等）：
• 代词放在动词之前。

例子：
• Lo veo. = 我看见它。
• Te quiero. = 我爱你。
• Se lo dije. = 我告诉他/她了。
• Me lo compró. = 他买给我了。

🔹 2. 动词原形（以-ar、-er、-ir结尾）：
• 代词粘贴在动词原形末尾。

例子：
• Voy a comprarlo. = 我要去买它。
• Quiero verte. = 我想见你。
• Puedo hacerlo. = 我能做它。
• Necesito decírtelo. = 我需要告诉你。

🔹 3. 副动词（-ando、-iendo）：
• 代词粘贴在副动词末尾。

例子：
• Estoy comprándolo. = 我正在买它。
• Está haciéndolo. = 他/她正在做。
• Estaban mirándonos. = 他们正在看我们。

🔹 4. 肯定命令式：
• 代词粘贴在命令式末尾。

例子：
• Cómpramelo. = 买给我。
• Dime la verdad. = 告诉我真相。
• Hazlo ahora. = 现在做。

🔹 5. 否定命令式：
• 代词放在动词之前。

例子：
• No me lo compres. = 别买给我。
• No me digas eso. = 别告诉我那个。
• No lo hagas. = 别做。

📌 总结表：

| 动词类型 | 位置 | 例子 |
|---------|------|------|
| 变位动词 | 之前 | Lo veo |
| 动词原形 | 末尾 | Verlo |
| 副动词 | 末尾 | Viéndolo |
| 肯定命令式 | 末尾 | Cómpramelo |
| 否定命令式 | 之前 | No me lo compres |

❌ 常见错误：
不要说"lo voy a ver"当你想说"Voy a verlo"。两种说法都正确，但第二种在西班牙更自然。`,
        ejemplos: [
          {
            espanol: "Lo veo todos los días.",
            chino: "我每天都看见它。",
          },
          {
            espanol: "Voy a comprarlo mañana.",
            chino: "我明天要去买它。",
          },
          {
            espanol: "Estoy escribiéndolo ahora.",
            chino: "我正在写它。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "me",
        chino: "我(宾语)",
        ejemplo: "Me ve.",
      },
      {
        id: "v2",
        espanol: "te",
        chino: "你(宾语)",
        ejemplo: "Te quiero.",
      },
      {
        id: "v3",
        espanol: "lo",
        chino: "他/它(阳性)",
        ejemplo: "Lo veo.",
      },
      {
        id: "v4",
        espanol: "la",
        chino: "她/它(阴性)",
        ejemplo: "La veo.",
      },
      {
        id: "v5",
        espanol: "nos",
        chino: "我们",
        ejemplo: "Nos llaman.",
      },
      {
        id: "v6",
        espanol: "os",
        chino: "你们",
        ejemplo: "Os espero.",
      },
      {
        id: "v7",
        espanol: "los",
        chino: "他们(阳性)",
        ejemplo: "Los conozco.",
      },
      {
        id: "v8",
        espanol: "las",
        chino: "她们(阴性)",
        ejemplo: "Las conozco.",
      },
      {
        id: "v9",
        espanol: "le",
        chino: "给他/她",
        ejemplo: "Le doy el libro.",
      },
      {
        id: "v10",
        espanol: "les",
        chino: "给他们",
        ejemplo: "Les escribo.",
      },
      {
        id: "v11",
        espanol: "se lo",
        chino: "把它给他",
        ejemplo: "Se lo di.",
      },
      {
        id: "v12",
        espanol: "se la",
        chino: "把它给她",
        ejemplo: "Se la compré.",
      },
      {
        id: "v13",
        espanol: "se los",
        chino: "把它们给他",
        ejemplo: "Se los regalé.",
      },
      {
        id: "v14",
        espanol: "se las",
        chino: "把它们给她",
        ejemplo: "Se las presté.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "En la tienda",
        tituloChino: "在商店",
        personajes: ["Cliente", "Dependiente"],
        lineas: [
          {
            personaje: "Cliente",
            texto: "¿Tiene esta camisa en azul?",
            traduccion: "这件衬衫有蓝色的吗？",
          },
          {
            personaje: "Dependiente",
            texto: "Sí, se la traigo ahora.",
            traduccion: "有的，我现在给您拿来。",
          },
          {
            personaje: "Cliente",
            texto: "Gracias. ¿Cuánto cuesta?",
            traduccion: "谢谢。多少钱？",
          },
          {
            personaje: "Dependiente",
            texto: "Le cuesta veinte euros.",
            traduccion: "卖您20欧元。",
          },
          {
            personaje: "Cliente",
            texto: "Perfecto, me la llevo.",
            traduccion: "完美，我买了。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Hablando de regalos",
        tituloChino: "谈论礼物",
        personajes: ["Ana", "Carlos"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Carlos, ¿compraste el regalo para María?",
            traduccion: "卡洛斯，你给玛丽亚买礼物了吗？",
          },
          {
            personaje: "Carlos",
            texto: "Sí, se lo compré ayer.",
            traduccion: "是的，我昨天买给她了。",
          },
          {
            personaje: "Ana",
            texto: "¿Qué le compraste?",
            traduccion: "你给她买了什么？",
          },
          {
            personaje: "Carlos",
            texto: "Le compré un libro. Se lo voy a dar esta noche.",
            traduccion: "我给她买了一本书。我今晚要给她。",
          },
          {
            personaje: "Ana",
            texto: "Seguro que le gusta.",
            traduccion: "她肯定会喜欢。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "En el restaurante",
        tituloChino: "在餐厅",
        personajes: ["Cliente", "Camarero"],
        lineas: [
          {
            personaje: "Cliente",
            texto: "¿Me trae la carta, por favor?",
            traduccion: "请给我菜单。",
          },
          {
            personaje: "Camarero",
            texto: "Claro, se la traigo ahora.",
            traduccion: "好的，我现在给您拿来。",
          },
          {
            personaje: "Cliente",
            texto: "Gracias. ¿Nos recomienda algún plato?",
            traduccion: "谢谢。您给我们推荐什么菜吗？",
          },
          {
            personaje: "Camarero",
            texto: "Les recomiendo la paella.",
            traduccion: "我给你们推荐海鲜饭。",
          },
          {
            personaje: "Cliente",
            texto: "Perfecto, la vamos a pedir.",
            traduccion: "完美，我们就要这个。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Pidiendo prestado",
        tituloChino: "借东西",
        personajes: ["Laura", "David"],
        lineas: [
          {
            personaje: "Laura",
            texto: "David, ¿me prestas tu coche mañana?",
            traduccion: "大卫，你明天能借我你的车吗？",
          },
          {
            personaje: "David",
            texto: "Lo siento, lo necesito yo por la mañana. ¿Te lo presto por la tarde?",
            traduccion: "抱歉，我早上需要。我下午借给你？",
          },
          {
            personaje: "Laura",
            texto: "Vale. ¿A qué hora me lo das?",
            traduccion: "好的。你几点给我？",
          },
          {
            personaje: "David",
            texto: "Te lo daré después de comer, sobre las tres.",
            traduccion: "我午饭后给你，大约三点。",
          },
          {
            personaje: "Laura",
            texto: "Perfecto. No te preocupes, te lo devolveré por la noche.",
            traduccion: "完美。别担心，我晚上还给你。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Instrucciones",
        tituloChino: "指示",
        personajes: ["Madre", "Hijo"],
        lineas: [
          {
            personaje: "Madre",
            texto: "Hijo, ¿puedes ayudarme con la compra?",
            traduccion: "儿子，你能帮我买东西吗？",
          },
          {
            personaje: "Hijo",
            texto: "Claro, ¿qué necesitas que compre?",
            traduccion: "当然，你需要我买什么？",
          },
          {
            personaje: "Madre",
            texto: "Necesito leche, pan y huevos. ¿Puedes traérmelos?",
            traduccion: "我需要牛奶、面包和鸡蛋。你能给我带来吗？",
          },
          {
            personaje: "Hijo",
            texto: "Sí, te los traeré en una hora.",
            traduccion: "好的，我一小时后给你带来。",
          },
          {
            personaje: "Madre",
            texto: "Gracias. No te olvides de comprarlos.",
            traduccion: "谢谢。别忘了买。",
          },
          {
            personaje: "Hijo",
            texto: "No te preocupes, mamá. Lo haré.",
            traduccion: "别担心，妈妈。我会做的。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "Veo el coche → _____ veo.",
          preguntaChino: "Veo el coche → _____ veo.",
          respuestaCorrecta: "Lo",
          explicacion: "'Lo' reemplaza a 'el coche' (阳性)",
          pista: "首字母是 L，2个字母",
          numeroLetras: 2,
        },
        {
          id: "c2",
          pregunta: "Como la manzana → _____ como.",
          preguntaChino: "Como la manzana → _____ como.",
          respuestaCorrecta: "La",
          explicacion: "'La' reemplaza a 'la manzana' (阴性)",
          pista: "首字母是 L，2个字母",
          numeroLetras: 2,
        },
        {
          id: "c3",
          pregunta: "Doy el libro a María → _____ doy el libro.",
          preguntaChino: "Doy el libro a María → _____ doy el libro.",
          respuestaCorrecta: "Le",
          explicacion: "'Le' reemplaza a 'a María'",
          pista: "首字母是 L，2个字母",
          numeroLetras: 2,
        },
        {
          id: "c4",
          pregunta: "Doy el libro a María → Se _____ doy.",
          preguntaChino: "Doy el libro a María → Se _____ doy.",
          respuestaCorrecta: "lo",
          explicacion: "Se lo doy = 我把它给她",
          pista: "首字母是 l，2个字母",
          numeroLetras: 2,
        },
        {
          id: "c5",
          pregunta: "Me compró un regalo → _____ lo compró.",
          preguntaChino: "Me compró un regalo → _____ lo compró.",
          respuestaCorrecta: "Me",
          explicacion: "'Me' es el objeto indirecto",
          pista: "首字母是 M，2个字母",
          numeroLetras: 2,
        },
        {
          id: "c6",
          pregunta: "Compramos los libros → _____ compramos.",
          preguntaChino: "Compramos los libros → _____ compramos.",
          respuestaCorrecta: "Los",
          explicacion: "'Los' reemplaza a 'los libros'",
          pista: "首字母是 L，3个字母",
          numeroLetras: 3,
        },
        {
          id: "c7",
          pregunta: "Escribo una carta a mis padres → _____ escribo.",
          preguntaChino: "Escribo una carta a mis padres → _____ escribo.",
          respuestaCorrecta: "Les",
          explicacion: "'Les' reemplaza a 'a mis padres'",
          pista: "首字母是 L，3个字母",
          numeroLetras: 3,
        },
        {
          id: "c8",
          pregunta: "Escribo una carta a mis padres → Se _____ escribo.",
          preguntaChino: "Escribo una carta a mis padres → Se _____ escribo.",
          respuestaCorrecta: "la",
          explicacion: "Se la escribo = 我把它写给他们",
          pista: "首字母是 l，2个字母",
          numeroLetras: 2,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "哪个代词替代'el libro'（阳性）？",
          preguntaChino: "哪个代词替代'el libro'（阳性）？",
          opciones: ["lo", "la", "le", "me"],
          respuestaCorrecta: "lo",
          explicacion: "'Lo'替代阳性直接宾语",
        },
        {
          id: "s2",
          pregunta: "哪个代词表示'to him/her'？",
          preguntaChino: "哪个代词表示'to him/her'？",
          opciones: ["lo", "le", "la", "los"],
          respuestaCorrecta: "le",
          explicacion: "'Le' = 给他/她（间接宾语）",
        },
        {
          id: "s3",
          pregunta: "在'Me lo dijo'中，'me'是什么？",
          preguntaChino: "在'Me lo dijo'中，'me'是什么？",
          opciones: ["主语", "直接宾语", "间接宾语", "动词"],
          respuestaCorrecta: "间接宾语",
          explicacion: "'Me'是间接宾语（给我）",
        },
        {
          id: "s4",
          pregunta: "如何说'我把它给玛丽亚'？",
          preguntaChino: "如何说'我把它给玛丽亚'？",
          opciones: ["Lo le doy", "Se lo doy", "Le lo doy", "Se la doy"],
          respuestaCorrecta: "Se lo doy",
          explicacion: "间接宾语+直接宾语: se + lo",
        },
        {
          id: "s5",
          pregunta: "'Le'变成'se'在什么前面？",
          preguntaChino: "'Le'变成'se'在什么前面？",
          opciones: ["动词前面", "名词前面", "lo/la/los/las前面", "形容词前面"],
          respuestaCorrecta: "lo/la/los/las前面",
          explicacion: "le + lo → se lo",
        },
        {
          id: "s6",
          pregunta: "¿Cuál es el pronombre OD para 'las manzanas'?",
          preguntaChino: "'las manzanas'的直接宾语代词是什么？",
          opciones: ["lo", "la", "los", "las"],
          respuestaCorrecta: "las",
          explicacion: "Las manzanas (femenino plural) → las",
        },
        {
          id: "s7",
          pregunta: "¿Cómo se dice '我们给你' en español?",
          preguntaChino: "西班牙语中'我们给你'怎么说？",
          opciones: ["Te nos", "Nos te", "Te damos", "Nos damos"],
          respuestaCorrecta: "Te damos",
          explicacion: "Te (OI) + damos (verbo)",
        },
        {
          id: "s8",
          pregunta: "¿Qué significa 'Dímelo'?",
          preguntaChino: "'Dímelo'是什么意思？",
          opciones: ["告诉我", "告诉我它", "告诉我它给我", "给我"],
          respuestaCorrecta: "告诉我它",
          explicacion: "Di (decir) + me (a mí) + lo (eso)",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Lo'只能是直接宾语。",
          preguntaChino: "'Lo'只能是直接宾语。",
          respuestaCorrecta: true,
          explicacion: "对。'Lo'是直接宾语代词",
        },
        {
          id: "vf2",
          pregunta: "'Le'替代直接宾语。",
          preguntaChino: "'Le'替代直接宾语。",
          respuestaCorrecta: false,
          explicacion: "错。'Le'是间接宾语代词",
        },
        {
          id: "vf3",
          pregunta: "代词放在变位动词之前。",
          preguntaChino: "代词放在变位动词之前。",
          respuestaCorrecta: true,
          explicacion: "对。例如：Lo veo.",
        },
        {
          id: "vf4",
          pregunta: "间接宾语在直接宾语前面。",
          preguntaChino: "间接宾语在直接宾语前面。",
          respuestaCorrecta: true,
          explicacion: "对。先OI后OD",
        },
        {
          id: "vf5",
          pregunta: "'Se lo'中'se'替代'le'。",
          preguntaChino: "'Se lo'中'se'替代'le'。",
          respuestaCorrecta: true,
          explicacion: "对。le + lo → se lo",
        },
        {
          id: "vf6",
          pregunta: "Los pronombres siempre van antes del verbo.",
          preguntaChino: "代词总是放在动词之前。",
          respuestaCorrecta: false,
          explicacion: "错。Con infinitivos y gerundios van pegados",
        },
        {
          id: "vf7",
          pregunta: "'Les lo' es correcto.",
          preguntaChino: "'Les lo'是正确的。",
          respuestaCorrecta: false,
          explicacion: "错。Debe ser 'se lo'",
        },
        {
          id: "vf8",
          pregunta: "En 'Voy a comprarlo', el pronombre va pegado al infinitivo.",
          preguntaChino: "在'Voy a comprarlo'中，代词粘贴在动词原形末尾。",
          respuestaCorrecta: true,
          explicacion: "对。Es correcto",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "me",
              derecha: "我",
            },
            {
              izquierda: "te",
              derecha: "你",
            },
            {
              izquierda: "lo",
              derecha: "它(阳性)",
            },
            {
              izquierda: "la",
              derecha: "它(阴性)",
            },
            {
              izquierda: "le",
              derecha: "给他/她",
            },
            {
              izquierda: "nos",
              derecha: "我们",
            },
            {
              izquierda: "os",
              derecha: "你们",
            },
            {
              izquierda: "les",
              derecha: "给他们",
            },
            {
              izquierda: "se lo",
              derecha: "把它给他",
            },
            {
              izquierda: "se la",
              derecha: "把它给她",
            },
            {
              izquierda: "me lo",
              derecha: "把它给我",
            },
            {
              izquierda: "te lo",
              derecha: "把它给你",
            },
          ],
          explicacion: "将代词与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["lo", "veo", "Yo", "."],
          respuestaCorrecta: "Yo lo veo.",
          explicacion: "正确的句子是：Yo lo veo.",
        },
        {
          id: "o2",
          palabras: ["doy", "lo", "Se", "."],
          respuestaCorrecta: "Se lo doy.",
          explicacion: "正确的句子是：Se lo doy.",
        },
        {
          id: "o3",
          palabras: ["compró", "Me", "regalo", "un", "."],
          respuestaCorrecta: "Me compró un regalo.",
          explicacion: "正确的句子是：Me compró un regalo.",
        },
        {
          id: "o4",
          palabras: ["ver", "la", "quiero", "."],
          respuestaCorrecta: "La quiero ver.",
          explicacion: "正确的顺序是：La quiero ver.",
        },
        {
          id: "o5",
          palabras: ["comprar", "Voy", "lo", "a", "."],
          respuestaCorrecta: "Voy a comprarlo.",
          explicacion: "正确的顺序是：Voy a comprarlo.",
        },
        {
          id: "o6",
          palabras: ["dímelo", "por", "favor", ","],
          respuestaCorrecta: "Dímelo, por favor.",
          explicacion: "正确的顺序是：Dímelo, por favor.",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我看见它。",
          respuestaEsperada: "Lo veo.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "我给她一本书。",
          respuestaEsperada: "Le doy un libro.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "我把它给她。",
          respuestaEsperada: "Se lo doy.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "他给我买了礼物。",
          respuestaEsperada: "Me compró un regalo.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "我们看见他们。",
          respuestaEsperada: "Los vemos.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "我给他们写信。",
          respuestaEsperada: "Les escribo.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "我把它寄给你们。",
          respuestaEsperada: "Se la envío.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "告诉我。",
          respuestaEsperada: "Dime.",
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
        instruccion: "用正确的代词完成对话。",
        instruccionChino: "用正确的代词完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿Tienes el libro?",
            respuesta: "",
          },
          {
            personaje: "B",
            texto: "Sí, _____ tengo.",
            respuesta: "lo",
          },
          {
            personaje: "A",
            texto: "¿Vas a dar _____ a María?",
            respuesta: "lo",
          },
          {
            personaje: "B",
            texto: "Sí, _____ voy a dar.",
            respuesta: "se lo",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "transformar",
        titulo: "Transforma las frases",
        tituloChino: "转换句子",
        instruccion: "Reemplaza el objeto con el pronombre correcto.",
        instruccionChino: "用正确的代词替换宾语。",
        frases: [
          {
            original: "Veo el coche.",
            esperado: "Lo veo.",
          },
          {
            original: "Doy la carta a Juan.",
            esperado: "Se la doy.",
          },
          {
            original: "Compro los regalos para los niños.",
            esperado: "Se los compro.",
          },
          {
            original: "Leo el libro.",
            esperado: "Lo leo.",
          },
          {
            original: "Envío las flores a mi madre.",
            esperado: "Se las envío.",
          },
          {
            original: "Presto el dinero a mi amigo.",
            esperado: "Se lo presto.",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "posicion",
        titulo: "Coloca el pronombre correctamente",
        tituloChino: "正确放置代词",
        instruccion: "Escribe la frase con el pronombre en la posición correcta.",
        instruccionChino: "将代词放在正确位置写出句子。",
        frases: [
          {
            original: "Quiero comprar (el libro).",
            esperado: "Quiero comprarlo.",
          },
          {
            original: "Estoy leyendo (la carta).",
            esperado: "Estoy leyéndola.",
          },
          {
            original: "No (me) compres (el regalo).",
            esperado: "No me lo compres.",
          },
          {
            original: "(Nosotros) (te) damos (el dinero).",
            esperado: "Te damos el dinero.",
          },
        ],
      },
      {
        id: "ep4",
        tipo: "responder",
        titulo: "Responde las preguntas",
        tituloChino: "回答问题",
        instruccion: "Responde las siguientes preguntas usando pronombres.",
        instruccionChino: "使用代词回答以下问题。",
        preguntas: [
          {
            pregunta: "¿Tienes el libro?",
            respuestaEsperada: "Sí, lo tengo. / No, no lo tengo.",
          },
          {
            pregunta: "¿Le diste el regalo a María?",
            respuestaEsperada: "Sí, se lo di. / No, no se lo di.",
          },
          {
            pregunta: "¿Me prestas tu coche?",
            respuestaEsperada: "Sí, te lo presto. / No, no te lo presto.",
          },
        ],
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "Di algo que compraste ayer usando pronombres.",
        preguntaChino: "用代词说你昨天买的东西。",
        sugerencia: "Lo compré ayer. / Se lo compré a mi madre.",
        sugerenciaChino: "Lo compré ayer. / Se lo compré a mi madre.",
      },
      {
        id: "pa2",
        pregunta: "Describe algo que alguien te ha dado.",
        preguntaChino: "描述别人给你的东西。",
        sugerencia: "Mi amigo me lo dio. / Me lo regaló mi madre.",
        sugerenciaChino: "Mi amigo me lo dio. / Me lo regaló mi madre.",
      },
      {
        id: "pa3",
        pregunta: "Escribe una frase usando 'se lo'.",
        preguntaChino: "用'se lo'写一个句子。",
        sugerencia: "Se lo di ayer. / Se lo voy a dar mañana.",
        sugerenciaChino: "Se lo di ayer. / Se lo voy a dar mañana.",
      },
      {
        id: "pa4",
        pregunta: "¿Cuál es la diferencia entre 'lo' y 'le'?",
        preguntaChino: "'lo'和'le'有什么区别？",
        sugerencia: "Lo es objeto directo (lo veo). Le es objeto indirecto (le doy un libro).",
        sugerenciaChino: "Lo是直接宾语，Le是间接宾语。",
      },
      {
        id: "pa5",
        pregunta: "¿Dónde colocas los pronombres con un imperativo afirmativo?",
        preguntaChino: "在肯定命令式中，代词放在哪里？",
        sugerencia: "Se pegan al final del verbo: 'Dímelo', 'Cómpramelo'.",
        sugerenciaChino: "Se pegan al final del verbo: 'Dímelo', 'Cómpramelo'.",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '我' como objeto directo?",
        preguntaChino: "作为直接宾语，'我'怎么说？",
        respuestaSugerida: "me",
        respuestaSugeridaChino: "me",
      },
      {
        id: "p2",
        pregunta: "¿Qué pronombre usas para 'to him'?",
        preguntaChino: "用什么代词表示'给他'？",
        respuestaSugerida: "le",
        respuestaSugeridaChino: "le",
      },
      {
        id: "p3",
        pregunta: "¿Cómo se dice '我把它给她' en español?",
        preguntaChino: "西班牙语中'我把它给她'怎么说？",
        respuestaSugerida: "Se lo doy.",
        respuestaSugeridaChino: "Se lo doy.",
      },
      {
        id: "p4",
        pregunta: "¿Cuándo cambias 'le' a 'se'?",
        preguntaChino: "什么时候把'le'变成'se'？",
        respuestaSugerida: "Cuando va seguido de lo/la/los/las.",
        respuestaSugeridaChino: "当后面跟着lo/la/los/las时。",
      },
      {
        id: "p5",
        pregunta: "¿Cuál es el pronombre OD para 'las casas'?",
        preguntaChino: "'las casas'的直接宾语代词是什么？",
        respuestaSugerida: "las",
        respuestaSugeridaChino: "las",
      },
      {
        id: "p6",
        pregunta: "¿Cómo se dice '给我们' en español?",
        preguntaChino: "西班牙语中'给我们'怎么说？",
        respuestaSugerida: "nos",
        respuestaSugeridaChino: "nos",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Verbos terminados en -AR",
        tituloChino: "以-AR结尾的动词",
        descripcion: `Para conjugar verbos -AR en presente:

Raíz + terminaciones:
• -o (yo)
• -as (tú)
• -a (él/ella/usted)
• -amos (nosotros)
• -áis (vosotros)
• -an (ellos/ellas/ustedes)

🔹 EJEMPLO CON HABLAR (habl-):
• yo hablo
• tú hablas
• él/ella/usted habla
• nosotros hablamos
• vosotros habláis
• ellos/ellas/ustedes hablan

🔹 OTROS VERBOS -AR:
• estudiar → estudio, estudias, estudia, estudiamos, estudiáis, estudian
• trabajar → trabajo, trabajas, trabaja, trabajamos, trabajáis, trabajan
• cantar → canto, cantas, canta, cantamos, cantáis, cantan
• bailar → bailo, bailas, baila, bailamos, bailáis, bailan
• mirar → miro, miras, mira, miramos, miráis, miran

🔹 CUANDO SE USA EL PRESENTE:
1. Acciones habituales: Todos los días estudio español.
2. Verdades generales: El agua hierve a 100 grados.
3. Acciones ahora mismo: Ahora como una manzana.
4. El futuro próximo (con expresiones de tiempo): Mañana voy al cine.
5. Mandatos (sugerencias): Tomas el autobús y llegas en 10 minutos.

📌 EJEMPLOS:
• Yo hablo español.
• Tú estudias mucho.
• Ella trabaja en un hospital.`,
        descripcionChino: `现在时变位规则动词（以-AR结尾）：

去掉词尾 -ar，加上以下结尾：
- -o (我)
- -as (你)
- -a (他/她/您)
- -amos (我们)
- -áis (你们 - 西班牙)
- -an (他们/她们/您们)

🔹 例子：HABLAR (说) → 去掉 habl-：
- yo hablo (我说)
- tú hablas (你说)
- él/ella/usted habla (他/她说)
- nosotros hablamos (我们说)
- vosotros habláis (你们说)
- ellos/ellas/ustedes hablan (他们说)

🔹 其他 -AR动词：
• estudiar → estudio, estudias, estudia, estudiamos, estudiáis, estudian
• trabajar → trabajo, trabajas, trabaja, trabajamos, trabajáis, trabajan
• cantar → canto, cantas, canta, cantamos, cantáis, cantan
• bailar → bailo, bailas, baila, bailamos, bailáis, bailan
• mirar → miro, miras, mira, miramos, miráis, miran

🔹 现在时的用法：
1. 习惯性动作：Todos los días estudio español. (我每天都学西班牙语)
2. 普遍真理：El agua hierve a 100 grados. (水在100度沸腾)
3. 此刻的动作：Ahora como una manzana. (我现在在吃苹果)
4. 近期将来（与时间表达连用）：Mañana voy al cine. (明天我去电影院)
5. 命令/建议：Tomas el autobús y llegas en 10 minutos. (你坐公交车，10分钟就到)

📌 例子：
• Yo hablo español. = 我说西班牙语。
• Tú estudias mucho. = 你学习很努力。
• Ella trabaja en un hospital. = 她在医院工作。`,
        ejemplos: [
          {
            espanol: "Yo hablo español.",
            chino: "我说西班牙语。",
          },
          {
            espanol: "Tú estudias mucho.",
            chino: "你学习很努力。",
          },
          {
            espanol: "Ella trabaja en un hospital.",
            chino: "她在医院工作。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Verbos terminados en -ER",
        tituloChino: "以-ER结尾的动词",
        descripcion: `Para conjugar verbos -ER en presente:

Raíz + terminaciones:
• -o (yo)
• -es (tú)
• -e (él/ella/usted)
• -emos (nosotros)
• -éis (vosotros)
• -en (ellos/ellas/ustedes)

🔹 EJEMPLO CON COMER (com-):
• yo como
• tú comes
• él/ella/usted come
• nosotros comemos
• vosotros coméis
• ellos/ellas/ustedes comen

🔹 OTROS VERBOS -ER:
• beber → bebo, bebes, bebe, bebemos, bebéis, beben
• correr → corro, corres, corre, corremos, corréis, corren
• leer → leo, lees, lee, leemos, leéis, leen
• vender → vendo, vendes, vende, vendemos, vendéis, venden
• aprender → aprendo, aprendes, aprende, aprendemos, aprendéis, aprenden

📌 EJEMPLOS:
• Yo como paella.
• Tú corres rápido.
• Ellos beben agua.`,
        descripcionChino: `现在时变位规则动词（以-ER结尾）：

去掉词尾 -er，加上以下结尾：
- -o (我)
- -es (你)
- -e (他/她/您)
- -emos (我们)
- -éis (你们 - 西班牙)
- -en (他们/她们/您们)

🔹 例子：COMER (吃) → 去掉 com-：
- yo como (我吃)
- tú comes (你吃)
- él/ella/usted come (他/她吃)
- nosotros comemos (我们吃)
- vosotros coméis (你们吃)
- ellos/ellas/ustedes comen (他们吃)

🔹 其他 -ER动词：
• beber (喝) → bebo, bebes, bebe, bebemos, bebéis, beben
• correr (跑) → corro, corres, corre, corremos, corréis, corren
• leer (读) → leo, lees, lee, leemos, leéis, leen
• vender (卖) → vendo, vendes, vende, vendemos, vendéis, venden
• aprender (学习) → aprendo, aprendes, aprende, aprendemos, aprendéis, aprenden

📌 例子：
• Yo como paella. = 我吃海鲜饭。
• Tú corres rápido. = 你跑得快。
• Ellos beben agua. = 他们喝水。`,
        ejemplos: [
          {
            espanol: "Yo como paella.",
            chino: "我吃海鲜饭。",
          },
          {
            espanol: "Tú corres rápido.",
            chino: "你跑得快。",
          },
          {
            espanol: "Ellos beben agua.",
            chino: "他们喝水。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Verbos terminados en -IR",
        tituloChino: "以-IR结尾的动词",
        descripcion: `Para conjugar verbos -IR en presente:

Raíz + terminaciones:
• -o (yo)
• -es (tú)
• -e (él/ella/usted)
• -imos (nosotros)
• -ís (vosotros)
• -en (ellos/ellas/ustedes)

🔹 EJEMPLO CON VIVIR (viv-):
• yo vivo
• tú vives
• él/ella/usted vive
• nosotros vivimos
• vosotros vivís
• ellos/ellas/ustedes viven

🔹 OTROS VERBOS -IR:
• escribir → escribo, escribes, escribe, escribimos, escribís, escriben
• recibir → recibo, recibes, recibe, recibimos, recibís, reciben
• abrir → abro, abres, abre, abrimos, abrís, abren
• partir → parto, partes, parte, partimos, partís, parten
• subir → subo, subes, sube, subimos, subís, suben

📌 TABLA COMPARATIVA -ER vs -IR:

| Persona | -ER (COMER) | -IR (VIVIR) |
|---------|-------------|-------------|
| yo | como | vivo |
| tú | comes | vives |
| él/ella/usted | come | vive |
| nosotros | comemos | vivimos |
| vosotros | coméis | vivís |
| ellos/ellas/ustedes | comen | viven |

❌ DIFERENCIA CLAVE:
La única diferencia entre verbos -ER y -IR está en las formas de "nosotros" (-emos vs -imos) y "vosotros" (-éis vs -ís).

📌 EJEMPLOS:
• Yo vivo en Madrid.
• Tú escribes una carta.
• Ella recibe un regalo.`,
        descripcionChino: `现在时变位规则动词（以-IR结尾）：

去掉词尾 -ir，加上以下结尾：
- -o (我)
- -es (你)
- -e (他/她/您)
- -imos (我们)
- -ís (你们 - 西班牙)
- -en (他们/她们/您们)

🔹 例子：VIVIR (住) → 去掉 viv-：
- yo vivo (我住)
- tú vives (你住)
- él/ella/usted vive (他/她住)
- nosotros vivimos (我们住)
- vosotros vivís (你们住)
- ellos/ellas/ustedes viven (他们住)

🔹 其他 -IR动词：
• escribir (写) → escribo, escribes, escribe, escribimos, escribís, escriben
• recibir (收到) → recibo, recibes, recibe, recibimos, recibís, reciben
• abrir (打开) → abro, abres, abre, abrimos, abrís, abren
• partir (离开/分开) → parto, partes, parte, partimos, partís, parten
• subir (上升/上) → subo, subes, sube, subimos, subís, suben

📌 -ER vs -IR 比较表：

| 人称 | -ER (COMER) | -IR (VIVIR) |
|------|-------------|-------------|
| yo | como | vivo |
| tú | comes | vives |
| él/ella/usted | come | vive |
| nosotros | comemos | vivimos |
| vosotros | coméis | vivís |
| ellos/ellas/ustedes | comen | viven |

❌ 关键区别：
-ER和-IR动词的唯一区别在于"nosotros"（-emos vs -imos）和"vosotros"（-éis vs -ís）的形式。

📌 例子：
• Yo vivo en Madrid. = 我住在马德里。
• Tú escribes una carta. = 你写一封信。
• Ella recibe un regalo. = 她收到一份礼物。`,
        ejemplos: [
          {
            espanol: "Yo vivo en Madrid.",
            chino: "我住在马德里。",
          },
          {
            espanol: "Tú escribes una carta.",
            chino: "你写一封信。",
          },
          {
            espanol: "Ella recibe un regalo.",
            chino: "她收到一份礼物。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Lista de verbos regulares comunes",
        tituloChino: "常见规则动词列表",
        descripcion: `🔹 VERBOS -AR MÁS COMUNES:
• hablar (to speak)
• estudiar (to study)
• trabajar (to work)
• cantar (to sing)
• bailar (to dance)
• mirar (to look/watch)
• escuchar (to listen)
• preguntar (to ask)
• contestar (to answer)
• ayudar (to help)
• caminar (to walk)
• viajar (to travel)
• cocinar (to cook)
• limpiar (to clean)
• llamar (to call)
• empezar (to start)
• terminar (to finish)

🔹 VERBOS -ER MÁS COMUNES:
• comer (to eat)
• beber (to drink)
• correr (to run)
• leer (to read)
• vender (to sell)
• aprender (to learn)
• comprender (to understand)
• deber (to owe / should)
• prometer (to promise)
• temer (to fear)
• romper (to break)
• esconder (to hide)

🔹 VERBOS -IR MÁS COMUNES:
• vivir (to live)
• escribir (to write)
• recibir (to receive)
• abrir (to open)
• partir (to leave / split)
• subir (to go up)
• permitir (to permit)
• decidir (to decide)
• describir (to describe)
• discutir (to discuss)
• imprimir (to print)
• ocurrir (to happen)

📌 EJEMPLOS EN CONTEXTO:
• ¿Dónde vives? — Vivo en Madrid.
• ¿Qué estudias? — Estudio medicina.
• ¿A qué hora comes? — Como a las dos.
• ¿Cuánto ganas? — Gano mil euros al mes.`,
        descripcionChino: `🔹 最常见的-AR动词：
• hablar = 说
• estudiar = 学习
• trabajar = 工作
• cantar = 唱歌
• bailar = 跳舞
• mirar = 看
• escuchar = 听
• preguntar = 问
• contestar = 回答
• ayudar = 帮助
• caminar = 走路
• viajar = 旅行
• cocinar = 做饭
• limpiar = 打扫
• llamar = 打电话
• empezar = 开始
• terminar = 结束

🔹 最常见的-ER动词：
• comer = 吃
• beber = 喝
• correr = 跑
• leer = 阅读
• vender = 卖
• aprender = 学习
• comprender = 理解
• deber = 欠/应该
• prometer = 承诺
• temer = 害怕
• romper = 打破
• esconder = 躲藏

🔹 最常见的-IR动词：
• vivir = 住
• escribir = 写
• recibir = 收到
• abrir = 打开
• partir = 离开/分开
• subir = 上升
• permitir = 允许
• decidir = 决定
• describir = 描述
• discutir = 讨论
• imprimir = 打印
• ocurrir = 发生

📌 上下文中的例子：
• ¿Dónde vives? — Vivo en Madrid. = 你住在哪里？—我住在马德里。
• ¿Qué estudias? — Estudio medicina. = 你学什么？—我学医。
• ¿A qué hora comes? — Como a las dos. = 你几点吃午饭？—我两点吃。
• ¿Cuánto ganas? — Gano mil euros al mes. = 你赚多少钱？—我每月赚一千欧元。`,
        ejemplos: [
          {
            espanol: "¿Dónde vives? — Vivo en Madrid.",
            chino: "你住在哪里？—我住在马德里。",
          },
          {
            espanol: "¿Qué estudias? — Estudio medicina.",
            chino: "你学什么？—我学医。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "hablar",
        chino: "说",
        ejemplo: "Yo hablo español.",
      },
      {
        id: "v2",
        espanol: "estudiar",
        chino: "学习",
        ejemplo: "Tú estudias mucho.",
      },
      {
        id: "v3",
        espanol: "trabajar",
        chino: "工作",
        ejemplo: "Ella trabaja en un hospital.",
      },
      {
        id: "v4",
        espanol: "comer",
        chino: "吃",
        ejemplo: "Yo como paella.",
      },
      {
        id: "v5",
        espanol: "beber",
        chino: "喝",
        ejemplo: "Ellos beben agua.",
      },
      {
        id: "v6",
        espanol: "correr",
        chino: "跑",
        ejemplo: "Tú corres rápido.",
      },
      {
        id: "v7",
        espanol: "vivir",
        chino: "住",
        ejemplo: "Yo vivo en Madrid.",
      },
      {
        id: "v8",
        espanol: "escribir",
        chino: "写",
        ejemplo: "Tú escribes una carta.",
      },
      {
        id: "v9",
        espanol: "recibir",
        chino: "收到",
        ejemplo: "Ella recibe un regalo.",
      },
      {
        id: "v10",
        espanol: "abrir",
        chino: "打开",
        ejemplo: "Yo abro la puerta.",
      },
      {
        id: "v11",
        espanol: "aprender",
        chino: "学习",
        ejemplo: "Nosotros aprendemos español.",
      },
      {
        id: "v12",
        espanol: "leer",
        chino: "阅读",
        ejemplo: "Ellos leen el periódico.",
      },
      {
        id: "v13",
        espanol: "cantar",
        chino: "唱歌",
        ejemplo: "Ella canta muy bien.",
      },
      {
        id: "v14",
        espanol: "bailar",
        chino: "跳舞",
        ejemplo: "Tú bailas salsa.",
      },
      {
        id: "v15",
        espanol: "viajar",
        chino: "旅行",
        ejemplo: "Nosotros viajamos cada año.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "En la cafetería",
        tituloChino: "在咖啡馆",
        personajes: ["Ana", "Carlos"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Carlos, ¿qué tomas?",
            traduccion: "卡洛斯，你喝什么？",
          },
          {
            personaje: "Carlos",
            texto: "Yo tomo un café con leche. ¿Y tú?",
            traduccion: "我喝拿铁。你呢？",
          },
          {
            personaje: "Ana",
            texto: "Yo bebo un zumo de naranja.",
            traduccion: "我喝橙汁。",
          },
          {
            personaje: "Carlos",
            texto: "¿Dónde trabajas?",
            traduccion: "你在哪里工作？",
          },
          {
            personaje: "Ana",
            texto: "Trabajo en una oficina. ¿Y tú?",
            traduccion: "我在办公室工作。你呢？",
          },
          {
            personaje: "Carlos",
            texto: "Yo estudio en la universidad.",
            traduccion: "我在大学学习。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Hablando de hábitos",
        tituloChino: "谈论习惯",
        personajes: ["María", "Pedro"],
        lineas: [
          {
            personaje: "María",
            texto: "Pedro, ¿qué haces los fines de semana?",
            traduccion: "佩德罗，你周末做什么？",
          },
          {
            personaje: "Pedro",
            texto: "Normalmente salgo con mis amigos. ¿Y tú?",
            traduccion: "我通常和朋友出去。你呢？",
          },
          {
            personaje: "María",
            texto: "Yo descanso en casa. Leo libros y veo series.",
            traduccion: "我在家休息。我看书和看电视剧。",
          },
          {
            personaje: "Pedro",
            texto: "¿Dónde vives?",
            traduccion: "你住在哪里？",
          },
          {
            personaje: "María",
            texto: "Vivo en el centro de la ciudad.",
            traduccion: "我住在市中心。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "En el restaurante",
        tituloChino: "在餐厅",
        personajes: ["Luis", "Sofía"],
        lineas: [
          {
            personaje: "Luis",
            texto: "Sofía, ¿qué comes?",
            traduccion: "索菲亚，你吃什么？",
          },
          {
            personaje: "Sofía",
            texto: "Yo como pescado. ¿Y tú?",
            traduccion: "我吃鱼。你呢？",
          },
          {
            personaje: "Luis",
            texto: "Yo como pollo asado.",
            traduccion: "我吃烤鸡。",
          },
          {
            personaje: "Sofía",
            texto: "¿Bebes vino?",
            traduccion: "你喝酒吗？",
          },
          {
            personaje: "Luis",
            texto: "No, yo bebo agua.",
            traduccion: "不，我喝水。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Describiendo la rutina",
        tituloChino: "描述日常",
        personajes: ["Laura", "David"],
        lineas: [
          {
            personaje: "Laura",
            texto: "David, ¿a qué hora te levantas?",
            traduccion: "大卫，你几点起床？",
          },
          {
            personaje: "David",
            texto: "Me levanto a las siete. ¿Y tú?",
            traduccion: "我七点起床。你呢？",
          },
          {
            personaje: "Laura",
            texto: "Yo me levanto a las ocho. ¿Desayunas en casa?",
            traduccion: "我八点起床。你在家吃早餐吗？",
          },
          {
            personaje: "David",
            texto: "Sí, desayuno antes de salir. ¿Tú también?",
            traduccion: "是的，我出门前吃早餐。你也一样吗？",
          },
          {
            personaje: "Laura",
            texto: "No, yo desayuno en el trabajo.",
            traduccion: "不，我在工作的地方吃早餐。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Planes y rutina",
        tituloChino: "计划和日常",
        personajes: ["Sofía", "Javier"],
        lineas: [
          {
            personaje: "Sofía",
            texto: "Javier, ¿qué haces después de trabajar?",
            traduccion: "哈维尔，你下班后做什么？",
          },
          {
            personaje: "Javier",
            texto: "Normalmente voy al gimnasio. ¿Y tú?",
            traduccion: "我通常去健身房。你呢？",
          },
          {
            personaje: "Sofía",
            texto: "Yo estudio español por las tardes.",
            traduccion: "我下午学西班牙语。",
          },
          {
            personaje: "Javier",
            texto: "¿Dónde estudias?",
            traduccion: "你在哪里学习？",
          },
          {
            personaje: "Sofía",
            texto: "Estudio en una academia cerca de mi casa.",
            traduccion: "我在家附近的一所学院学习。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "Yo _____ (hablar) español.",
          preguntaChino: "Yo _____ (hablar) español.",
          respuestaCorrecta: "hablo",
          explicacion: "Verbo -AR, yo → -o",
          pista: "Termina en -o",
          numeroLetras: 5,
        },
        {
          id: "c2",
          pregunta: "Tú _____ (estudiar) mucho.",
          preguntaChino: "Tú _____ (estudiar) mucho.",
          respuestaCorrecta: "estudias",
          explicacion: "Verbo -AR, tú → -as",
          pista: "Termina en -as",
          numeroLetras: 8,
        },
        {
          id: "c3",
          pregunta: "Ella _____ (comer) paella.",
          preguntaChino: "Ella _____ (comer) paella.",
          respuestaCorrecta: "come",
          explicacion: "Verbo -ER, ella → -e",
          pista: "Termina en -e",
          numeroLetras: 4,
        },
        {
          id: "c4",
          pregunta: "Nosotros _____ (vivir) en Madrid.",
          preguntaChino: "Nosotros _____ (vivir) en Madrid.",
          respuestaCorrecta: "vivimos",
          explicacion: "Verbo -IR, nosotros → -imos",
          pista: "Termina en -imos",
          numeroLetras: 7,
        },
        {
          id: "c5",
          pregunta: "Ellos _____ (beber) agua.",
          preguntaChino: "Ellos _____ (beber) agua.",
          respuestaCorrecta: "beben",
          explicacion: "Verbo -ER, ellos → -en",
          pista: "Termina en -en",
          numeroLetras: 5,
        },
        {
          id: "c6",
          pregunta: "Usted _____ (trabajar) en un banco.",
          preguntaChino: "Usted _____ (trabajar) en un banco.",
          respuestaCorrecta: "trabaja",
          explicacion: "Verbo -AR, usted → -a",
          pista: "Termina en -a",
          numeroLetras: 7,
        },
        {
          id: "c7",
          pregunta: "Vosotros _____ (escribir) una carta.",
          preguntaChino: "Vosotros _____ (escribir) una carta.",
          respuestaCorrecta: "escribís",
          explicacion: "Verbo -IR, vosotros → -ís",
          pista: "Termina en -ís",
          numeroLetras: 8,
        },
        {
          id: "c8",
          pregunta: "Ellas _____ (leer) el periódico.",
          preguntaChino: "Ellas _____ (leer) el periódico.",
          respuestaCorrecta: "leen",
          explicacion: "Verbo -ER, ellas → -en",
          pista: "Termina en -en",
          numeroLetras: 4,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "¿Cómo se dice '我说话' en español?",
          preguntaChino: "如何说'我说话'？",
          opciones: ["Yo hablo", "Yo hablas", "Yo habla", "Yo hablan"],
          respuestaCorrecta: "Yo hablo",
          explicacion: "Hablar, yo → hablo",
        },
        {
          id: "s2",
          pregunta: "¿Cuál es la forma correcta de 'comer' para 'tú'?",
          preguntaChino: "'comer'对于'tú'的正确形式是什么？",
          opciones: ["como", "comes", "come", "comen"],
          respuestaCorrecta: "comes",
          explicacion: "Comer, tú → comes",
        },
        {
          id: "s3",
          pregunta: "¿Cómo se dice '我们工作' en español?",
          preguntaChino: "如何说'我们工作'？",
          opciones: ["Yo trabajo", "Tú trabajas", "Nosotros trabajamos", "Ellos trabajan"],
          respuestaCorrecta: "Nosotros trabajamos",
          explicacion: "Trabajar, nosotros → trabajamos",
        },
        {
          id: "s4",
          pregunta: "¿Cuál es el infinitivo de 'vivo'?",
          preguntaChino: "'vivo'的原形是什么？",
          opciones: ["vivar", "viver", "vivir", "vive"],
          respuestaCorrecta: "vivir",
          explicacion: "Vivo viene de vivir",
        },
        {
          id: "s5",
          pregunta: "¿Qué terminación usas para 'ellos' con verbos -ER?",
          preguntaChino: "对于-ER动词，'ellos'用什么结尾？",
          opciones: ["-o", "-es", "-e", "-en"],
          respuestaCorrecta: "-en",
          explicacion: "Ellos comen, beben, corren",
        },
        {
          id: "s6",
          pregunta: "¿Cuál es la forma correcta de 'estudiar' para 'nosotros'?",
          preguntaChino: "'estudiar'的'nosotros'正确形式是什么？",
          opciones: ["estudio", "estudias", "estudia", "estudiamos"],
          respuestaCorrecta: "estudiamos",
          explicacion: "Estudiar, nosotros → estudiamos",
        },
        {
          id: "s7",
          pregunta: "¿Cómo se dice '他们喝' en español?",
          preguntaChino: "西班牙语中'他们喝'怎么说？",
          opciones: ["Ellos bebo", "Ellos bebes", "Ellos bebe", "Ellos beben"],
          respuestaCorrecta: "Ellos beben",
          explicacion: "Beber, ellos → beben",
        },
        {
          id: "s8",
          pregunta: "¿Cuál es la diferencia entre verbos -ER y -IR?",
          preguntaChino: "-ER和-IR动词有什么区别？",
          opciones: ["Solo en yo", "Solo en nosotros", "Solo en ellos", "No hay diferencia"],
          respuestaCorrecta: "Solo en nosotros",
          explicacion: "Nosotros: -emos vs -imos",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "Los verbos -AR en presente terminan en -o para 'yo'.",
          preguntaChino: "-AR动词现在时中'yo'的结尾是-o。",
          respuestaCorrecta: true,
          explicacion: "对。Yo hablo, trabajo, estudio",
        },
        {
          id: "vf2",
          pregunta: "Para 'tú', los verbos -ER terminan en -as.",
          preguntaChino: "对于'tú'，-ER动词的结尾是-as。",
          respuestaCorrecta: false,
          explicacion: "错。Tú comes, bebes (-es)",
        },
        {
          id: "vf3",
          pregunta: "'Nosotros comemos' es correcto.",
          preguntaChino: "'Nosotros comemos'是正确的。",
          respuestaCorrecta: true,
          explicacion: "对。Comer, nosotros → comemos",
        },
        {
          id: "vf4",
          pregunta: "Los verbos -IR y -ER tienen las mismas terminaciones excepto en nosotros.",
          preguntaChino: "-IR和-ER动词除了nosotros外有相同的结尾。",
          respuestaCorrecta: true,
          explicacion: "对。Nosotros: -ER → -emos, -IR → -imos",
        },
        {
          id: "vf5",
          pregunta: "El presente se usa para acciones habituales.",
          preguntaChino: "现在时用于习惯性动作。",
          respuestaCorrecta: true,
          explicacion: "对。例如：Todos los días estudio.",
        },
        {
          id: "vf6",
          pregunta: "El verbo 'abrir' es de la conjugación -ER.",
          preguntaChino: "动词'abrir'属于-ER变位。",
          respuestaCorrecta: false,
          explicacion: "错。Abrir es -IR",
        },
        {
          id: "vf7",
          pregunta: "La terminación para 'vosotros' en verbos -AR es -áis.",
          preguntaChino: "-AR动词中'vosotros'的结尾是-áis。",
          respuestaCorrecta: true,
          explicacion: "对。Hablar, vosotros → habláis",
        },
        {
          id: "vf8",
          pregunta: "En el presente, la forma de 'yo' es igual para todos los verbos.",
          preguntaChino: "在现在时中，所有动词的'yo'形式都一样。",
          respuestaCorrecta: false,
          explicacion: "错。Aunque todos terminan en -o, la raíz es diferente",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "hablar",
              derecha: "说",
            },
            {
              izquierda: "comer",
              derecha: "吃",
            },
            {
              izquierda: "vivir",
              derecha: "住",
            },
            {
              izquierda: "trabajar",
              derecha: "工作",
            },
            {
              izquierda: "estudiar",
              derecha: "学习",
            },
            {
              izquierda: "beber",
              derecha: "喝",
            },
            {
              izquierda: "escribir",
              derecha: "写",
            },
            {
              izquierda: "correr",
              derecha: "跑",
            },
            {
              izquierda: "leer",
              derecha: "阅读",
            },
            {
              izquierda: "abrir",
              derecha: "打开",
            },
            {
              izquierda: "recibir",
              derecha: "收到",
            },
            {
              izquierda: "aprender",
              derecha: "学习",
            },
          ],
          explicacion: "将动词与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["español", "hablo", "Yo", "."],
          respuestaCorrecta: "Yo hablo español.",
          explicacion: "正确的句子是：Yo hablo español.",
        },
        {
          id: "o2",
          palabras: ["en", "Vivo", "Madrid", "yo", "."],
          respuestaCorrecta: "Yo vivo en Madrid.",
          explicacion: "正确的句子是：Yo vivo en Madrid.",
        },
        {
          id: "o3",
          palabras: ["comen", "paella", "Ellos", "."],
          respuestaCorrecta: "Ellos comen paella.",
          explicacion: "正确的句子是：Ellos comen paella.",
        },
        {
          id: "o4",
          palabras: ["trabajas", "dónde", "Tú", "?"],
          respuestaCorrecta: "¿Dónde trabajas?",
          explicacion: "正确的顺序是：¿Dónde trabajas?",
        },
        {
          id: "o5",
          palabras: ["escribimos", "Nosotros", "una", "carta", "."],
          respuestaCorrecta: "Nosotros escribimos una carta.",
          explicacion: "正确的顺序是：Nosotros escribimos una carta.",
        },
        {
          id: "o6",
          palabras: ["leéis", "vosotros", "libro", "el", "?"],
          respuestaCorrecta: "¿Vosotros leéis el libro?",
          explicacion: "正确的顺序是：¿Vosotros leéis el libro?",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我说西班牙语。",
          respuestaEsperada: "Yo hablo español.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "你学习很多。",
          respuestaEsperada: "Tú estudias mucho.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "她住在马德里。",
          respuestaEsperada: "Ella vive en Madrid.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "我们吃海鲜饭。",
          respuestaEsperada: "Nosotros comemos paella.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "你们工作吗？",
          respuestaEsperada: "¿Vosotros trabajáis?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "他们喝咖啡。",
          respuestaEsperada: "Ellos beben café.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "我们学习西班牙语。",
          respuestaEsperada: "Nosotros aprendemos español.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "你打开门。",
          respuestaEsperada: "Tú abres la puerta.",
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
        instruccion: "用正确的动词形式完成对话。",
        instruccionChino: "用正确的动词形式完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿Dónde _____ (vivir)?",
            respuesta: "vives",
          },
          {
            personaje: "B",
            texto: "Yo _____ (vivir) en Madrid. ¿Y tú?",
            respuesta: "vivo",
          },
          {
            personaje: "A",
            texto: "Yo _____ (vivir) en Barcelona.",
            respuesta: "vivo",
          },
          {
            personaje: "B",
            texto: "¿Qué _____ (hacer)?",
            respuesta: "haces",
          },
          {
            personaje: "A",
            texto: "_____ (trabajar) en un banco.",
            respuesta: "Trabajo",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "conjugar",
        titulo: "Conjuga los verbos",
        tituloChino: "变位动词",
        instruccion: "Completa la conjugación de los siguientes verbos en presente.",
        instruccionChino: "完成以下动词的现在时变位。",
        tabla: [
          {
            verbo: "hablar",
            yo: "hablo",
            tu: "hablas",
            el: "habla",
            nosotros: "hablamos",
            ellos: "hablan",
          },
          {
            verbo: "comer",
            yo: "como",
            tu: "comes",
            el: "come",
            nosotros: "comemos",
            ellos: "comen",
          },
          {
            verbo: "vivir",
            yo: "vivo",
            tu: "vives",
            el: "vive",
            nosotros: "vivimos",
            ellos: "viven",
          },
          {
            verbo: "trabajar",
            yo: "trabajo",
            tu: "trabajas",
            el: "trabaja",
            nosotros: "trabajamos",
            ellos: "trabajan",
          },
          {
            verbo: "escribir",
            yo: "escribo",
            tu: "escribes",
            el: "escribe",
            nosotros: "escribimos",
            ellos: "escriben",
          },
          {
            verbo: "leer",
            yo: "leo",
            tu: "lees",
            el: "lee",
            nosotros: "leemos",
            ellos: "leen",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "clasificar",
        titulo: "Clasifica los verbos",
        tituloChino: "分类动词",
        instruccion: "Clasifica cada verbo según su terminación (-AR, -ER, -IR).",
        instruccionChino: "根据词尾将每个动词分类（-AR, -ER, -IR）。",
        verbos: [
          {
            verbo: "comer",
            tipo: "-ER",
          },
          {
            verbo: "vivir",
            tipo: "-IR",
          },
          {
            verbo: "hablar",
            tipo: "-AR",
          },
          {
            verbo: "beber",
            tipo: "-ER",
          },
          {
            verbo: "abrir",
            tipo: "-IR",
          },
          {
            verbo: "estudiar",
            tipo: "-AR",
          },
        ],
      },
      {
        id: "ep4",
        tipo: "completarFrases",
        titulo: "Completa las frases",
        tituloChino: "完成句子",
        instruccion: "Completa las frases con la forma correcta del verbo en presente.",
        instruccionChino: "用正确的现在时动词形式完成句子。",
        frases: [
          {
            frase: "Yo _____ (hablar) tres idiomas.",
            respuesta: "hablo",
          },
          {
            frase: "Ella _____ (trabajar) en un hospital.",
            respuesta: "trabaja",
          },
          {
            frase: "Nosotros _____ (vivir) cerca del parque.",
            respuesta: "vivimos",
          },
          {
            frase: "Ellos _____ (comer) en el restaurante.",
            respuesta: "comen",
          },
          {
            frase: "Tú _____ (estudiar) mucho.",
            respuesta: "estudias",
          },
        ],
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Qué haces todos los días?",
        preguntaChino: "你每天都做什么？",
        sugerencia: "Todos los días me levanto a las... estudio... trabajo...",
        sugerenciaChino: "Todos los días me levanto a las... estudio... trabajo...",
      },
      {
        id: "pa2",
        pregunta: "¿Dónde vives y dónde trabajas/estudias?",
        preguntaChino: "你住在哪里？在哪里工作/学习？",
        sugerencia: "Vivo en... y trabajo/estudio en...",
        sugerenciaChino: "Vivo en... y trabajo/estudio en...",
      },
      {
        id: "pa3",
        pregunta: "¿Qué comes normalmente en el desayuno?",
        preguntaChino: "你早餐通常吃什么？",
        sugerencia: "Normalmente como... y bebo...",
        sugerenciaChino: "Normalmente como... y bebo...",
      },
      {
        id: "pa4",
        pregunta: "¿Cómo es tu rutina diaria?",
        preguntaChino: "你的日常生活是怎样的？",
        sugerencia: "Me levanto a las..., desayuno, trabajo, ceno, me acuesto...",
        sugerenciaChino: "Me levanto a las..., desayuno, trabajo, ceno, me acuesto...",
      },
      {
        id: "pa5",
        pregunta: "¿Qué haces los fines de semana?",
        preguntaChino: "你周末做什么？",
        sugerencia: "Los fines de semana descanso, salgo con amigos, veo películas...",
        sugerenciaChino: "Los fines de semana descanso, salgo con amigos, veo películas...",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '我吃' en español?",
        preguntaChino: "西班牙语中'我吃'怎么说？",
        respuestaSugerida: "Yo como",
        respuestaSugeridaChino: "Yo como",
      },
      {
        id: "p2",
        pregunta: "¿Cuál es la terminación para 'nosotros' en verbos -AR?",
        preguntaChino: "'nosotros'在-AR动词中的结尾是什么？",
        respuestaSugerida: "-amos",
        respuestaSugeridaChino: "-amos",
      },
      {
        id: "p3",
        pregunta: "¿Cómo se dice '他们住在西班牙' en español?",
        preguntaChino: "西班牙语中'他们住在西班牙'怎么说？",
        respuestaSugerida: "Ellos viven en España.",
        respuestaSugeridaChino: "Ellos viven en España.",
      },
      {
        id: "p4",
        pregunta: "¿Cuál es la diferencia entre verbos -ER y -IR?",
        preguntaChino: "-ER和-IR动词有什么区别？",
        respuestaSugerida: "Solo cambia en nosotros: -emos vs -imos.",
        respuestaSugeridaChino: "只在nosotros不同：-emos vs -imos。",
      },
      {
        id: "p5",
        pregunta: "¿Cómo se dice '你工作' en español?",
        preguntaChino: "西班牙语中'你工作'怎么说？",
        respuestaSugerida: "Tú trabajas",
        respuestaSugeridaChino: "Tú trabajas",
      },
      {
        id: "p6",
        pregunta: "¿Qué significa 'Nosotros aprendemos español'?",
        preguntaChino: "'Nosotros aprendemos español'是什么意思？",
        respuestaSugerida: "我们学西班牙语",
        respuestaSugeridaChino: "We learn Spanish",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "El verbo SER (to be - esencial/permanente)",
        tituloChino: "动词SER（是 - 本质/永久性）",
        descripcion: `Conjugación del verbo SER en presente:

• yo SOY
• tú ERES
• él/ella/usted ES
• nosotros SOMOS
• vosotros SOIS
• ellos/ellas/ustedes SON

🔹 USOS DE SER (cuándo usamos SER):

1. IDENTIDAD (identidad):
   • Soy María. (I am María)
   • Somos estudiantes. (We are students)

2. ORIGEN (origin):
   • Soy de España. (I am from Spain)
   • Ellos son de México. (They are from Mexico)

3. PROFESIÓN (profession):
   • Soy médico. (I am a doctor)
   • Ella es profesora. (She is a teacher)

4. CARACTERÍSTICAS FÍSICAS Y DE PERSONALIDAD:
   • Es alto. (He is tall)
   • Son muy amables. (They are very kind)

5. POSESIÓN (posesión):
   • Es mi libro. (It is my book)
   • Son sus gafas. (They are his/her glasses)

6. HORA Y FECHA (time and date):
   • Son las tres. (It's three o'clock)
   • Hoy es lunes. (Today is Monday)

7. MATERIAL (material):
   • Es de madera. (It's made of wood)
   • Son de plástico. (They are made of plastic)

8. EVENTOS (events):
   • La fiesta es en mi casa. (The party is at my house)
   • El concierto es el sábado. (The concert is on Saturday)

📌 EJEMPLOS:
• Yo soy estudiante.
• Ella es inteligente.
• Somos de China.`,
        descripcionChino: `动词SER的现在时变位：

- yo SOY = 我是
- tú ERES = 你是
- él/ella/usted ES = 他/她/您是
- nosotros SOMOS = 我们是
- vosotros SOIS = 你们是（西班牙）
- ellos/ellas/ustedes SON = 他们/她们/您们是

🔹 SER的用法（何时使用SER）：

1. 身份：
   • Soy María. = 我是玛丽亚。
   • Somos estudiantes. = 我们是学生。

2. 来源：
   • Soy de España. = 我来自西班牙。
   • Ellos son de México. = 他们来自墨西哥。

3. 职业：
   • Soy médico. = 我是医生。
   • Ella es profesora. = 她是老师。

4. 身体和性格特征：
   • Es alto. = 他很高。
   • Son muy amables. = 他们很友善。

5. 拥有：
   • Es mi libro. = 这是我的书。
   • Son sus gafas. = 这是他的/她的眼镜。

6. 时间和日期：
   • Son las tres. = 三点钟。
   • Hoy es lunes. = 今天是星期一。

7. 材料：
   • Es de madera. = 它是木头的。
   • Son de plástico. = 它们是塑料的。

8. 事件：
   • La fiesta es en mi casa. = 派对在我家举行。
   • El concierto es el sábado. = 音乐会在星期六。

📌 例子：
• Yo soy estudiante. = 我是学生。
• Ella es inteligente. = 她很聪明。
• Somos de China. = 我们来自中国。`,
        ejemplos: [
          {
            espanol: "Yo soy estudiante.",
            chino: "我是学生。",
          },
          {
            espanol: "Ella es inteligente.",
            chino: "她很聪明。",
          },
          {
            espanol: "Somos de China.",
            chino: "我们来自中国。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "El verbo ESTAR (to be - estado/temporal)",
        tituloChino: "动词ESTAR（在/是 - 状态/临时性）",
        descripcion: `Conjugación del verbo ESTAR en presente:

• yo ESTOY
• tú ESTÁS
• él/ella/usted ESTÁ
• nosotros ESTAMOS
• vosotros ESTÁIS
• ellos/ellas/ustedes ESTÁN

🔹 USOS DE ESTAR (cuándo usamos ESTAR):

1. UBICACIÓN (location):
   • Estoy en casa. (I am at home)
   • El libro está en la mesa. (The book is on the table)

2. ESTADOS FÍSICOS Y EMOCIONALES TEMPORALES:
   • Estoy cansado. (I am tired)
   • Está feliz. (He/She is happy)
   • Estamos preocupados. (We are worried)

3. CONDICIONES (conditions):
   • La sopa está caliente. (The soup is hot)
   • El agua está fría. (The water is cold)

4. ACCIONES EN PROGRESO (gerundio):
   • Estoy comiendo. (I am eating)
   • Estamos estudiando. (We are studying)

5. CLIMA (weather - con ciertas expresiones):
   • Está soleado. (It's sunny)
   • Está nublado. (It's cloudy)

📌 DIFERENCIA SER vs ESTAR:

| Concepto | SER | ESTAR |
|----------|-----|-------|
| Identidad | Soy María | — |
| Origen | Soy de España | — |
| Profesión | Soy médico | — |
| Característica permanente | Es alto | — |
| Ubicación | — | Estoy en casa |
| Estado temporal | — | Estoy cansado |
| Emoción | — | Estoy feliz |
| Hora | Son las tres | — |

📌 EJEMPLOS:
• Yo estoy en Madrid.
• Ella está cansada.
• Estamos felices.`,
        descripcionChino: `动词ESTAR的现在时变位：

- yo ESTOY = 我在/我是（状态）
- tú ESTÁS = 你在/你是
- él/ella/usted ESTÁ = 他/她/您在
- nosotros ESTAMOS = 我们在
- vosotros ESTÁIS = 你们在
- ellos/ellas/ustedes ESTÁN = 他们/她们/您们在

🔹 ESTAR的用法（何时使用ESTAR）：

1. 位置：
   • Estoy en casa. = 我在家。
   • El libro está en la mesa. = 书在桌子上。

2. 临时的身体和情绪状态：
   • Estoy cansado. = 我累了。
   • Está feliz. = 他/她很高兴。
   • Estamos preocupados. = 我们担心。

3. 条件/状况：
   • La sopa está caliente. = 汤是热的。
   • El agua está fría. = 水是冷的。

4. 正在进行的动作（副动词）：
   • Estoy comiendo. = 我正在吃。
   • Estamos estudiando. = 我们正在学习。

5. 天气（与某些表达连用）：
   • Está soleado. = 天气晴朗。
   • Está nublado. = 多云。

📌 SER vs ESTAR 的区别：

| 概念 | SER | ESTAR |
|------|-----|-------|
| 身份 | Soy María | — |
| 来源 | Soy de España | — |
| 职业 | Soy médico | — |
| 永久特征 | Es alto | — |
| 位置 | — | Estoy en casa |
| 临时状态 | — | Estoy cansado |
| 情绪 | — | Estoy feliz |
| 时间 | Son las tres | — |

📌 例子：
• Yo estoy en Madrid. = 我在马德里。
• Ella está cansada. = 她累了。
• Estamos felices. = 我们很高兴。`,
        ejemplos: [
          {
            espanol: "Yo estoy en Madrid.",
            chino: "我在马德里。",
          },
          {
            espanol: "Ella está cansada.",
            chino: "她累了。",
          },
          {
            espanol: "Estamos felices.",
            chino: "我们很高兴。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "El verbo TENER (to have)",
        tituloChino: "动词TENER（有）",
        descripcion: `Conjugación del verbo TENER en presente:

• yo TENGO
• tú TIENES
• él/ella/usted TIENE
• nosotros TENEMOS
• vosotros TENÉIS
• ellos/ellas/ustedes TIENEN

🔹 USOS DE TENER:

1. POSESIÓN (posesión):
   • Tengo un coche. (I have a car)
   • Tienen una casa grande. (They have a big house)

2. EDAD (edad):
   • Tengo veinte años. (I am twenty years old)
   • Mi hermana tiene quince años. (My sister is fifteen)

3. EXPRESIONES COMUNES CON TENER:

   • tener hambre = to be hungry
   • tener sed = to be thirsty
   • tener sueño = to be sleepy
   • tener calor = to be hot
   • tener frío = to be cold
   • tener prisa = to be in a hurry
   • tener cuidado = to be careful
   • tener razón = to be right
   • tener suerte = to be lucky
   • tener miedo = to be afraid
   • tener vergüenza = to be embarrassed
   • tener éxito = to be successful
   • tener ganas de = to feel like (doing something)

📌 EJEMPLOS:
• Yo tengo dos hermanos.
• Ella tiene hambre.
• Tienes razón.

📌 NOTA: En español NO se usa el verbo "to be" para expresar hambre, sed, etc. Se usa TENER.`,
        descripcionChino: `动词TENER的现在时变位：

- yo TENGO = 我有
- tú TIENES = 你有
- él/ella/usted TIENE = 他/她/您有
- nosotros TENEMOS = 我们有
- vosotros TENÉIS = 你们有
- ellos/ellas/ustedes TIENEN = 他们/她们/您们有

🔹 TENER的用法：

1. 拥有：
   • Tengo un coche. = 我有一辆车。
   • Tienen una casa grande. = 他们有一所大房子。

2. 年龄：
   • Tengo veinte años. = 我二十岁。
   • Mi hermana tiene quince años. = 我妹妹十五岁。

3. TENER的常见表达：

   • tener hambre = 饿了
   • tener sed = 渴了
   • tener sueño = 困了
   • tener calor = 热
   • tener frío = 冷
   • tener prisa = 赶时间
   • tener cuidado = 小心
   • tener razón = 有道理/正确
   • tener suerte = 幸运
   • tener miedo = 害怕
   • tener vergüenza = 尴尬/羞愧
   • tener éxito = 成功
   • tener ganas de = 想要/想做某事

📌 例子：
• Yo tengo dos hermanos. = 我有两个兄弟。
• Ella tiene hambre. = 她饿了。
• Tienes razón. = 你有道理。

📌 注意：在西班牙语中，表达饥饿、口渴等不使用"to be"，而使用TENER。`,
        ejemplos: [
          {
            espanol: "Yo tengo dos hermanos.",
            chino: "我有两个兄弟。",
          },
          {
            espanol: "Ella tiene hambre.",
            chino: "她饿了。",
          },
          {
            espanol: "Tienes razón.",
            chino: "你是对的。",
          },
        ],
      },
      {
        id: "t4",
        titulo: "El verbo IR (to go)",
        tituloChino: "动词IR（去）",
        descripcion: `Conjugación del verbo IR en presente:

• yo VOY
• tú VAS
• él/ella/usted VA
• nosotros VAMOS
• vosotros VAIS
• ellos/ellas/ustedes VAN

🔹 USOS DE IR:

1. MOVIMIENTO (movement):
   • Voy al trabajo. (I go to work)
   • Van a la playa. (They go to the beach)

2. FUTURO PRÓXIMO (immediate future) - ir + a + infinitivo:
   • Voy a estudiar. (I am going to study)
   • Vamos a comer. (We are going to eat)

3. PREGUNTAS CON IR:
   • ¿Adónde vas? (Where are you going?)
   • ¿Cómo vas al trabajo? (How do you go to work?)
   • ¿Con quién vas? (Who are you going with?)

📌 DIFERENCIA ENTRE "IR" Y "IR A":
• IR + lugar = movimiento hacia un lugar
• IR A + infinitivo = futuro próximo

📌 EJEMPLOS:
• Yo voy al cine.
• Ellos van a la playa.
• Vamos a comer.

📌 EXPRESIONES COMUNES CON IR:
• ir de compras = to go shopping
• ir de vacaciones = to go on vacation
• ir a pie = to go on foot
• ir en coche = to go by car
• ir de viaje = to go on a trip

📌 TABLA RESUMEN DE LOS 4 VERBOS:

| Persona | SER | ESTAR | TENER | IR |
|---------|-----|-------|-------|----|
| yo | soy | estoy | tengo | voy |
| tú | eres | estás | tienes | vas |
| él/ella/usted | es | está | tiene | va |
| nosotros | somos | estamos | tenemos | vamos |
| vosotros | sois | estáis | tenéis | vais |
| ellos/ellas/ustedes | son | están | tienen | van |`,
        descripcionChino: `动词IR的现在时变位：

- yo VOY = 我去
- tú VAS = 你去
- él/ella/usted VA = 他/她/您去
- nosotros VAMOS = 我们去
- vosotros VAIS = 你们去
- ellos/ellas/ustedes VAN = 他们/她们/您们去

🔹 IR的用法：

1. 移动：
   • Voy al trabajo. = 我去上班。
   • Van a la playa. = 他们去海滩。

2. 最近将来时 - ir + a + 动词原形：
   • Voy a estudiar. = 我要学习。
   • Vamos a comer. = 我们要吃饭。

3. 用IR提问：
   • ¿Adónde vas? = 你去哪里？
   • ¿Cómo vas al trabajo? = 你怎么去上班？
   • ¿Con quién vas? = 你和谁一起去？

📌 "IR" 和 "IR A" 的区别：
• IR + 地点 = 向某地移动
• IR A + 动词原形 = 最近将来时

📌 例子：
• Yo voy al cine. = 我去电影院。
• Ellos van a la playa. = 他们去海滩。
• Vamos a comer. = 我们去吃饭。

📌 与IR的常见表达：
• ir de compras = 去购物
• ir de vacaciones = 去度假
• ir a pie = 步行去
• ir en coche = 开车去
• ir de viaje = 去旅行

📌 四个动词的总结表：

| 人称 | SER | ESTAR | TENER | IR |
|------|-----|-------|-------|-----|
| yo | soy | estoy | tengo | voy |
| tú | eres | estás | tienes | vas |
| él/ella/usted | es | está | tiene | va |
| nosotros | somos | estamos | tenemos | vamos |
| vosotros | sois | estáis | tenéis | vais |
| ellos/ellas/ustedes | son | están | tienen | van |`,
        ejemplos: [
          {
            espanol: "Yo voy al cine.",
            chino: "我去电影院。",
          },
          {
            espanol: "Ellos van a la playa.",
            chino: "他们去海滩。",
          },
          {
            espanol: "Vamos a comer.",
            chino: "我们去吃饭。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "ser",
        chino: "是(本质)",
        ejemplo: "Yo soy estudiante.",
      },
      {
        id: "v2",
        espanol: "estar",
        chino: "在/是(状态)",
        ejemplo: "Yo estoy en casa.",
      },
      {
        id: "v3",
        espanol: "tener",
        chino: "有",
        ejemplo: "Yo tengo un perro.",
      },
      {
        id: "v4",
        espanol: "ir",
        chino: "去",
        ejemplo: "Yo voy al trabajo.",
      },
      {
        id: "v5",
        espanol: "soy",
        chino: "我是",
        ejemplo: "Soy de China.",
      },
      {
        id: "v6",
        espanol: "eres",
        chino: "你是",
        ejemplo: "Eres muy inteligente.",
      },
      {
        id: "v7",
        espanol: "es",
        chino: "他是",
        ejemplo: "Él es médico.",
      },
      {
        id: "v8",
        espanol: "somos",
        chino: "我们是",
        ejemplo: "Somos amigos.",
      },
      {
        id: "v9",
        espanol: "son",
        chino: "他们是",
        ejemplo: "Ellos son hermanos.",
      },
      {
        id: "v10",
        espanol: "estoy",
        chino: "我在",
        ejemplo: "Estoy cansado.",
      },
      {
        id: "v11",
        espanol: "estás",
        chino: "你在",
        ejemplo: "¿Estás bien?",
      },
      {
        id: "v12",
        espanol: "está",
        chino: "他在",
        ejemplo: "Está en casa.",
      },
      {
        id: "v13",
        espanol: "estamos",
        chino: "我们在",
        ejemplo: "Estamos listos.",
      },
      {
        id: "v14",
        espanol: "están",
        chino: "他们在",
        ejemplo: "Están ocupados.",
      },
      {
        id: "v15",
        espanol: "tengo",
        chino: "我有",
        ejemplo: "Tengo hambre.",
      },
      {
        id: "v16",
        espanol: "tienes",
        chino: "你有",
        ejemplo: "¿Tienes tiempo?",
      },
      {
        id: "v17",
        espanol: "tiene",
        chino: "他有",
        ejemplo: "Ella tiene frío.",
      },
      {
        id: "v18",
        espanol: "tenemos",
        chino: "我们有",
        ejemplo: "Tenemos prisa.",
      },
      {
        id: "v19",
        espanol: "tienen",
        chino: "他们有",
        ejemplo: "Ellos tienen sueño.",
      },
      {
        id: "v20",
        espanol: "voy",
        chino: "我去",
        ejemplo: "Voy a la escuela.",
      },
      {
        id: "v21",
        espanol: "vas",
        chino: "你去",
        ejemplo: "¿Vas a venir?",
      },
      {
        id: "v22",
        espanol: "va",
        chino: "他去",
        ejemplo: "Él va al cine.",
      },
      {
        id: "v23",
        espanol: "vamos",
        chino: "我们去",
        ejemplo: "Vamos a la playa.",
      },
      {
        id: "v24",
        espanol: "van",
        chino: "他们去",
        ejemplo: "Ellos van a viajar.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Conociendo a alguien nuevo",
        tituloChino: "认识新朋友",
        personajes: ["Ana", "Carlos"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Hola, soy Ana. ¿Cómo te llamas?",
            traduccion: "你好，我是安娜。你叫什么名字？",
          },
          {
            personaje: "Carlos",
            texto: "Soy Carlos. Mucho gusto.",
            traduccion: "我是卡洛斯。很高兴。",
          },
          {
            personaje: "Ana",
            texto: "¿De dónde eres?",
            traduccion: "你来自哪里？",
          },
          {
            personaje: "Carlos",
            texto: "Soy de México. ¿Y tú?",
            traduccion: "我来自墨西哥。你呢？",
          },
          {
            personaje: "Ana",
            texto: "Soy de España. ¿Dónde estás ahora?",
            traduccion: "我来自西班牙。你现在在哪里？",
          },
          {
            personaje: "Carlos",
            texto: "Estoy en Madrid estudiando español.",
            traduccion: "我在马德里学习西班牙语。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Describiendo estados",
        tituloChino: "描述状态",
        personajes: ["María", "Pedro"],
        lineas: [
          {
            personaje: "María",
            texto: "Pedro, ¿cómo estás hoy?",
            traduccion: "佩德罗，你今天怎么样？",
          },
          {
            personaje: "Pedro",
            texto: "Estoy cansado. Trabajé mucho.",
            traduccion: "我累了。我工作了很多。",
          },
          {
            personaje: "María",
            texto: "¿Tienes hambre?",
            traduccion: "你饿吗？",
          },
          {
            personaje: "Pedro",
            texto: "Sí, tengo mucha hambre.",
            traduccion: "是的，我很饿。",
          },
          {
            personaje: "María",
            texto: "Vamos a comer algo.",
            traduccion: "我们去吃点东西吧。",
          },
          {
            personaje: "Pedro",
            texto: "Buena idea. ¿Dónde vamos?",
            traduccion: "好主意。我们去哪里？",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Planes y posesiones",
        tituloChino: "计划和拥有",
        personajes: ["Luis", "Sofía"],
        lineas: [
          {
            personaje: "Luis",
            texto: "Sofía, ¿tienes hermanos?",
            traduccion: "索菲亚，你有兄弟姐妹吗？",
          },
          {
            personaje: "Sofía",
            texto: "Sí, tengo un hermano.",
            traduccion: "是的，我有一个兄弟。",
          },
          {
            personaje: "Luis",
            texto: "¿Qué vas a hacer este fin de semana?",
            traduccion: "你这个周末要做什么？",
          },
          {
            personaje: "Sofía",
            texto: "Voy a ir al cine con mi hermano.",
            traduccion: "我要和我兄弟去看电影。",
          },
          {
            personaje: "Luis",
            texto: "Yo voy a estudiar. Tengo un examen el lunes.",
            traduccion: "我要学习。我周一有考试。",
          },
          {
            personaje: "Sofía",
            texto: "¡Suerte! Estoy seguro de que vas a aprobar.",
            traduccion: "祝你好运！我相信你会通过的。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Comparando SER y ESTAR",
        tituloChino: "比较SER和ESTAR",
        personajes: ["Laura", "David"],
        lineas: [
          {
            personaje: "Laura",
            texto: "David, ¿cómo es tu hermano?",
            traduccion: "大卫，你的兄弟怎么样？",
          },
          {
            personaje: "David",
            texto: "Es alto y simpático. Ahora está un poco cansado porque ha trabajado mucho.",
            traduccion: "他高，很友好。现在他有点累，因为他工作了很多。",
          },
          {
            personaje: "Laura",
            texto: "¿Y tu hermana? ¿Cómo es?",
            traduccion: "你的妹妹呢？她怎么样？",
          },
          {
            personaje: "David",
            texto: "Ella es muy inteligente. Hoy está feliz porque ha aprobado un examen.",
            traduccion: "她很聪明。今天她很开心，因为她通过了一个考试。",
          },
          {
            personaje: "Laura",
            texto: "¡Qué bien! ¿Dónde están ahora tus padres?",
            traduccion: "真好！你父母现在在哪里？",
          },
          {
            personaje: "David",
            texto: "Están de vacaciones en la playa.",
            traduccion: "他们在海滩度假。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Usando IR y TENER",
        tituloChino: "使用IR和TENER",
        personajes: ["Sofía", "Javier"],
        lineas: [
          {
            personaje: "Sofía",
            texto: "Javier, ¿adónde vas esta tarde?",
            traduccion: "哈维尔，你今天下午去哪里？",
          },
          {
            personaje: "Javier",
            texto: "Voy al gimnasio. ¿Y tú?",
            traduccion: "我去健身房。你呢？",
          },
          {
            personaje: "Sofía",
            texto: "Yo voy a la biblioteca a estudiar. Tengo un examen la semana que viene.",
            traduccion: "我去图书馆学习。我下周有考试。",
          },
          {
            personaje: "Javier",
            texto: "¿Tienes miedo del examen?",
            traduccion: "你害怕考试吗？",
          },
          {
            personaje: "Sofía",
            texto: "Un poco. Pero tengo suerte porque mi profesor me ayuda mucho.",
            traduccion: "有一点。但我很幸运，因为我的老师很帮助我。",
          },
          {
            personaje: "Javier",
            texto: "Vas a aprobar seguro. Tienes razón.",
            traduccion: "你肯定会通过的。你说得对。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "Yo _____ (ser) estudiante.",
          preguntaChino: "Yo _____ (ser) estudiante.",
          respuestaCorrecta: "soy",
          explicacion: "Ser, yo → soy",
          pista: "首字母是 s，3个字母",
          numeroLetras: 3,
        },
        {
          id: "c2",
          pregunta: "Tú _____ (estar) en casa.",
          preguntaChino: "Tú _____ (estar) en casa.",
          respuestaCorrecta: "estás",
          explicacion: "Estar, tú → estás",
          pista: "首字母是 e，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c3",
          pregunta: "Ella _____ (tener) veinte años.",
          preguntaChino: "Ella _____ (tener) veinte años.",
          respuestaCorrecta: "tiene",
          explicacion: "Tener, ella → tiene",
          pista: "首字母是 t，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c4",
          pregunta: "Nosotros _____ (ir) al cine.",
          preguntaChino: "Nosotros _____ (ir) al cine.",
          respuestaCorrecta: "vamos",
          explicacion: "Ir, nosotros → vamos",
          pista: "首字母是 v，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c5",
          pregunta: "Ellos _____ (ser) de España.",
          preguntaChino: "Ellos _____ (ser) de España.",
          respuestaCorrecta: "son",
          explicacion: "Ser, ellos → son",
          pista: "首字母是 s，3个字母",
          numeroLetras: 3,
        },
        {
          id: "c6",
          pregunta: "Vosotros _____ (estar) cansados.",
          preguntaChino: "Vosotros _____ (estar) cansados.",
          respuestaCorrecta: "estáis",
          explicacion: "Estar, vosotros → estáis",
          pista: "首字母是 e，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c7",
          pregunta: "Ellas _____ (tener) prisa.",
          preguntaChino: "Ellas _____ (tener) prisa.",
          respuestaCorrecta: "tienen",
          explicacion: "Tener, ellas → tienen",
          pista: "首字母是 t，6个字母",
          numeroLetras: 6,
        },
        {
          id: "c8",
          pregunta: "Yo _____ (ir) a estudiar.",
          preguntaChino: "Yo _____ (ir) a estudiar.",
          respuestaCorrecta: "voy",
          explicacion: "Ir, yo → voy",
          pista: "首字母是 v，3个字母",
          numeroLetras: 3,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "¿Cuál es la forma correcta de 'ser' para 'yo'?",
          preguntaChino: "'ser'对于'yo'的正确形式是什么？",
          opciones: ["soy", "eres", "es", "son"],
          respuestaCorrecta: "soy",
          explicacion: "Yo soy",
        },
        {
          id: "s2",
          pregunta: "¿Cómo se dice '我在家' en español?",
          preguntaChino: "西班牙语中'我在家'怎么说？",
          opciones: ["Soy en casa", "Estoy en casa", "Tengo en casa", "Voy en casa"],
          respuestaCorrecta: "Estoy en casa",
          explicacion: "Estar para ubicación",
        },
        {
          id: "s3",
          pregunta: "¿Cómo se dice '我饿了' en español?",
          preguntaChino: "西班牙语中'我饿了'怎么说？",
          opciones: ["Soy hambre", "Estoy hambre", "Tengo hambre", "Voy hambre"],
          respuestaCorrecta: "Tengo hambre",
          explicacion: "Expresión con tener",
        },
        {
          id: "s4",
          pregunta: "¿Cómo se dice '我们去吃饭' en español?",
          preguntaChino: "西班牙语中'我们去吃饭'怎么说？",
          opciones: ["Somos a comer", "Estamos a comer", "Tenemos a comer", "Vamos a comer"],
          respuestaCorrecta: "Vamos a comer",
          explicacion: "Ir a + infinitivo",
        },
        {
          id: "s5",
          pregunta: "¿Qué verbo usas para la profesión?",
          preguntaChino: "职业用什么动词？",
          opciones: ["ser", "estar", "tener", "ir"],
          respuestaCorrecta: "ser",
          explicacion: "Ser + profesión",
        },
        {
          id: "s6",
          pregunta: "¿Cómo se dice '你有多大了？' en español?",
          preguntaChino: "西班牙语中'你有多大了？'怎么说？",
          opciones: [
            "¿Cuántos años eres?",
            "¿Cuántos años estás?",
            "¿Cuántos años tienes?",
            "¿Cuántos años vas?",
          ],
          respuestaCorrecta: "¿Cuántos años tienes?",
          explicacion: "Tener + años",
        },
        {
          id: "s7",
          pregunta: "¿Qué verbo usas para la ubicación?",
          preguntaChino: "位置用什么动词？",
          opciones: ["ser", "estar", "tener", "ir"],
          respuestaCorrecta: "estar",
          explicacion: "Estar para ubicación",
        },
        {
          id: "s8",
          pregunta: "¿Cómo se dice 'Ellos son altos' en español?",
          preguntaChino: "'Ellos son altos'是什么意思？",
          opciones: ["他们高", "他们在高处", "他们有高度", "他们去高处"],
          respuestaCorrecta: "他们高",
          explicacion: "Ser + característica permanente",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Ser' se usa para características permanentes.",
          preguntaChino: "'Ser'用于永久特征。",
          respuestaCorrecta: true,
          explicacion: "对。例如：Es alto.",
        },
        {
          id: "vf2",
          pregunta: "'Estar' se usa para la ubicación.",
          preguntaChino: "'Estar'用于位置。",
          respuestaCorrecta: true,
          explicacion: "对。例如：Estoy en casa.",
        },
        {
          id: "vf3",
          pregunta: "'Tener' se usa para expresar edad.",
          preguntaChino: "'Tener'用于表达年龄。",
          respuestaCorrecta: true,
          explicacion: "对。Tengo veinte años.",
        },
        {
          id: "vf4",
          pregunta: "'Ir' nunca se usa para futuro.",
          preguntaChino: "'Ir'从不用于将来时。",
          respuestaCorrecta: false,
          explicacion: "错。Ir a + infinitivo = futuro próximo",
        },
        {
          id: "vf5",
          pregunta: "'Soy' y 'estoy' significan lo mismo.",
          preguntaChino: "'Soy'和'estoy'意思相同。",
          respuestaCorrecta: false,
          explicacion: "错。Soy es permanente, estoy es temporal",
        },
        {
          id: "vf6",
          pregunta: "Se dice 'Tengo razón' para decir 'I'm right'.",
          preguntaChino: "说'Tengo razón'表示'我是对的'。",
          respuestaCorrecta: true,
          explicacion: "对。Tener razón = 有道理",
        },
        {
          id: "vf7",
          pregunta: "'Vamos a' se usa para el futuro inmediato.",
          preguntaChino: "'Vamos a'用于近期将来。",
          respuestaCorrecta: true,
          explicacion: "对。Vamos a comer",
        },
        {
          id: "vf8",
          pregunta: "Los verbos ser, estar, tener e ir son regulares.",
          preguntaChino: "动词ser, estar, tener和ir是规则的。",
          respuestaCorrecta: false,
          explicacion: "错。Son completamente irregulares",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "soy",
              derecha: "我是",
            },
            {
              izquierda: "eres",
              derecha: "你是",
            },
            {
              izquierda: "es",
              derecha: "他是",
            },
            {
              izquierda: "somos",
              derecha: "我们是",
            },
            {
              izquierda: "son",
              derecha: "他们是",
            },
            {
              izquierda: "estoy",
              derecha: "我在",
            },
            {
              izquierda: "estás",
              derecha: "你在",
            },
            {
              izquierda: "está",
              derecha: "他在",
            },
            {
              izquierda: "estamos",
              derecha: "我们在",
            },
            {
              izquierda: "están",
              derecha: "他们在",
            },
            {
              izquierda: "tengo",
              derecha: "我有",
            },
            {
              izquierda: "tienes",
              derecha: "你有",
            },
            {
              izquierda: "tiene",
              derecha: "他有",
            },
            {
              izquierda: "tenemos",
              derecha: "我们有",
            },
            {
              izquierda: "tienen",
              derecha: "他们有",
            },
            {
              izquierda: "voy",
              derecha: "我去",
            },
            {
              izquierda: "vas",
              derecha: "你去",
            },
            {
              izquierda: "va",
              derecha: "他去",
            },
            {
              izquierda: "vamos",
              derecha: "我们去",
            },
            {
              izquierda: "van",
              derecha: "他们去",
            },
          ],
          explicacion: "将动词形式与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["estudiante", "soy", "Yo", "."],
          respuestaCorrecta: "Yo soy estudiante.",
          explicacion: "正确的句子是：Yo soy estudiante.",
        },
        {
          id: "o2",
          palabras: ["cansado", "estoy", "hoy", "Yo", "."],
          respuestaCorrecta: "Yo estoy cansado hoy.",
          explicacion: "正确的句子是：Yo estoy cansado hoy.",
        },
        {
          id: "o3",
          palabras: ["hambre", "tengo", "mucha", "Yo", "."],
          respuestaCorrecta: "Yo tengo mucha hambre.",
          explicacion: "正确的句子是：Yo tengo mucha hambre.",
        },
        {
          id: "o4",
          palabras: ["cine", "Vamos", "al", "."],
          respuestaCorrecta: "Vamos al cine.",
          explicacion: "正确的顺序是：Vamos al cine.",
        },
        {
          id: "o5",
          palabras: ["casa", "está", "en", "Ella", "."],
          respuestaCorrecta: "Ella está en casa.",
          explicacion: "正确的顺序是：Ella está en casa.",
        },
        {
          id: "o6",
          palabras: ["años", "tiene", "Ella", "treinta", "."],
          respuestaCorrecta: "Ella tiene treinta años.",
          explicacion: "正确的顺序是：Ella tiene treinta años.",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我是老师。",
          respuestaEsperada: "Yo soy profesor.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "我在家。",
          respuestaEsperada: "Yo estoy en casa.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "我有两个兄弟。",
          respuestaEsperada: "Yo tengo dos hermanos.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "我去学校。",
          respuestaEsperada: "Yo voy a la escuela.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "你是对的。",
          respuestaEsperada: "Tú tienes razón.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "我们来自中国。",
          respuestaEsperada: "Nosotros somos de China.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "她累了。",
          respuestaEsperada: "Ella está cansada.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "我们要去海滩。",
          respuestaEsperada: "Vamos a la playa.",
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
        instruccion: "用正确的动词形式完成对话。",
        instruccionChino: "用正确的动词形式完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿De dónde _____ (ser)?",
            respuesta: "eres",
          },
          {
            personaje: "B",
            texto: "Yo _____ (ser) de México. ¿Y tú?",
            respuesta: "soy",
          },
          {
            personaje: "A",
            texto: "Yo _____ (ser) de España.",
            respuesta: "soy",
          },
          {
            personaje: "B",
            texto: "¿Dónde _____ (estar) ahora?",
            respuesta: "estás",
          },
          {
            personaje: "A",
            texto: "_____ (estar) en Madrid.",
            respuesta: "Estoy",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "completarTabla",
        titulo: "Completa la conjugación",
        tituloChino: "完成变位表",
        instruccion: "Completa la conjugación de los verbos en presente.",
        instruccionChino: "完成动词的现在时变位。",
        tabla: [
          {
            verbo: "ser",
            yo: "soy",
            tu: "eres",
            el: "es",
            nosotros: "somos",
            ellos: "son",
          },
          {
            verbo: "estar",
            yo: "estoy",
            tu: "estás",
            el: "está",
            nosotros: "estamos",
            ellos: "están",
          },
          {
            verbo: "tener",
            yo: "tengo",
            tu: "tienes",
            el: "tiene",
            nosotros: "tenemos",
            ellos: "tienen",
          },
          {
            verbo: "ir",
            yo: "voy",
            tu: "vas",
            el: "va",
            nosotros: "vamos",
            ellos: "van",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "completarFrases",
        titulo: "Completa las frases",
        tituloChino: "完成句子",
        instruccion: "Elige el verbo correcto (ser, estar, tener, ir) para cada frase.",
        instruccionChino: "为每个句子选择正确的动词（ser, estar, tener, ir）。",
        frases: [
          {
            frase: "Yo _____ (ser/estar) estudiante.",
            respuesta: "soy",
          },
          {
            frase: "Ellos _____ (ser/estar) en la playa.",
            respuesta: "están",
          },
          {
            frase: "Nosotros _____ (tener/ir) hambre.",
            respuesta: "tenemos",
          },
          {
            frase: "Ella _____ (ir/tener) al cine.",
            respuesta: "va",
          },
          {
            frase: "Tú _____ (ser/estar) muy inteligente.",
            respuesta: "eres",
          },
          {
            frase: "Yo _____ (tener/ir) veinte años.",
            respuesta: "tengo",
          },
        ],
      },
      {
        id: "ep4",
        tipo: "responder",
        titulo: "Responde las preguntas",
        tituloChino: "回答问题",
        instruccion: "Responde las siguientes preguntas usando los verbos ser, estar, tener o ir.",
        instruccionChino: "使用动词ser、estar、tener或ir回答以下问题。",
        preguntas: [
          {
            pregunta: "¿De dónde eres?",
            respuestaEsperada: "Soy de [país].",
          },
          {
            pregunta: "¿Cómo estás hoy?",
            respuestaEsperada: "Estoy (bien / cansado / feliz).",
          },
          {
            pregunta: "¿Cuántos años tienes?",
            respuestaEsperada: "Tengo (número) años.",
          },
          {
            pregunta: "¿Adónde vas ahora?",
            respuestaEsperada: "Voy a (la escuela / el trabajo / casa).",
          },
        ],
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "Preséntate usando el verbo SER.",
        preguntaChino: "用动词SER自我介绍。",
        sugerencia: "Yo soy... Soy de... Soy estudiante...",
        sugerenciaChino: "Yo soy... Soy de... Soy estudiante...",
      },
      {
        id: "pa2",
        pregunta: "Describe cómo estás hoy usando ESTAR.",
        preguntaChino: "用ESTAR描述你今天的状态。",
        sugerencia: "Hoy estoy (cansado / feliz / nervioso / tranquilo).",
        sugerenciaChino: "Hoy estoy (cansado / feliz / nervioso / tranquilo).",
      },
      {
        id: "pa3",
        pregunta: "¿Qué planes tienes para mañana? Usa IR A.",
        preguntaChino: "你明天有什么计划？用IR A表达。",
        sugerencia: "Mañana voy a (estudiar / trabajar / viajar).",
        sugerenciaChino: "Mañana voy a (estudiar / trabajar / viajar).",
      },
      {
        id: "pa4",
        pregunta: "¿Qué cosas tienes? Usa TENER.",
        preguntaChino: "你有什么东西？用TENER表达。",
        sugerencia: "Tengo un coche, una casa y un perro.",
        sugerenciaChino: "Tengo un coche, una casa y un perro.",
      },
      {
        id: "pa5",
        pregunta: "¿Cuál es la diferencia entre SER y ESTAR?",
        preguntaChino: "SER和ESTAR有什么区别？",
        sugerencia:
          "SER es para características permanentes (origen, profesión). ESTAR es para estados temporales y ubicación.",
        sugerenciaChino: "SER用于永久特征，ESTAR用于临时状态和位置。",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '我是' en español?",
        preguntaChino: "西班牙语中'我是'怎么说？",
        respuestaSugerida: "soy",
        respuestaSugeridaChino: "soy",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '我在' en español?",
        preguntaChino: "西班牙语中'我在'怎么说？",
        respuestaSugerida: "estoy",
        respuestaSugeridaChino: "estoy",
      },
      {
        id: "p3",
        pregunta: "¿Cómo se dice '我饿了' en español?",
        preguntaChino: "西班牙语中'我饿了'怎么说？",
        respuestaSugerida: "Tengo hambre",
        respuestaSugeridaChino: "Tengo hambre",
      },
      {
        id: "p4",
        pregunta: "¿Cuál es la diferencia entre SER y ESTAR?",
        preguntaChino: "SER和ESTAR有什么区别？",
        respuestaSugerida: "SER es permanente, ESTAR es temporal.",
        respuestaSugeridaChino: "SER是永久的，ESTAR是临时的。",
      },
      {
        id: "p5",
        pregunta: "¿Cómo se dice '我们去' en español?",
        preguntaChino: "西班牙语中'我们去'怎么说？",
        respuestaSugerida: "vamos",
        respuestaSugeridaChino: "vamos",
      },
      {
        id: "p6",
        pregunta: "¿Qué significa 'Tengo razón'?",
        preguntaChino: "'Tengo razón'是什么意思？",
        respuestaSugerida: "我是对的",
        respuestaSugeridaChino: "I'm right",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Estructura del pretérito perfecto",
        tituloChino: "现在完成时的结构",
        descripcion: `El pretérito perfecto se forma con:

HABER (presente) + participio del verbo

Conjugación de HABER:
• yo HE
• tú HAS
• él/ella/usted HA
• nosotros HEMOS
• vosotros HABÉIS
• ellos/ellas/ustedes HAN

Participios regulares:
• -AR → -ADO: hablado, estudiado, trabajado, cantado, bailado
• -ER → -IDO: comido, bebido, corrido, leído, aprendido
• -IR → -IDO: vivido, escrito, recibido, abierto, partido

🔹 EJEMPLOS:
• Yo he hablado con María. (I have spoken with María)
• Tú has comido paella. (You have eaten paella)
• Ella ha vivido en Madrid. (She has lived in Madrid)
• Nosotros hemos estudiado. (We have studied)
• Ellos han llegado tarde. (They have arrived late)

📌 ESTRUCTURA: HABER + participio

❌ ERROR COMÚN:
No olvides conjugar HABER correctamente según la persona. No digas "Yo ha hablado" (incorrecto). Di "Yo he hablado".`,
        descripcionChino: `现在完成时的构成：

HABER（现在时）+ 动词的过去分词

HABER的变位：
- yo HE = 我已经
- tú HAS = 你已经
- él/ella/usted HA = 他/她/您已经
- nosotros HEMOS = 我们已经
- vosotros HABÉIS = 你们已经
- ellos/ellas/ustedes HAN = 他们/她们/您们已经

规则动词的过去分词：
- -AR动词 → -ADO：hablado (说了), estudiado (学习了), trabajado (工作了)
- -ER动词 → -IDO：comido (吃了), bebido (喝了), corrido (跑了)
- -IR动词 → -IDO：vivido (住了), recibido (收到了), abierto (打开了)

🔹 例子：
• Yo he hablado con María. = 我和玛丽亚说过话了。
• Tú has comido paella. = 你吃过海鲜饭了。
• Ella ha vivido en Madrid. = 她在马德里住过。
• Nosotros hemos estudiado. = 我们学习过了。
• Ellos han llegado tarde. = 他们迟到了。

📌 结构：HABER + 过去分词

❌ 常见错误：
不要忘记根据人称正确变位HABER。不要说"Yo ha hablado"（错误）。要说"Yo he hablado"。`,
        ejemplos: [
          {
            espanol: "Yo he estudiado español.",
            chino: "我学过西班牙语了。",
          },
          {
            espanol: "Tú has comido mucho.",
            chino: "你吃了很多。",
          },
          {
            espanol: "Ella ha viajado a España.",
            chino: "她去西班牙旅行过。",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Participios irregulares",
        tituloChino: "不规则过去分词",
        descripcion: `Participios irregulares más comunes:

🔹 LISTA DE PARTICIPIOS IRREGULARES:

• abrir → abierto (open)
• cubrir → cubierto (covered)
• decir → dicho (said)
• escribir → escrito (written)
• hacer → hecho (done/made)
• morir → muerto (died)
• poner → puesto (put)
• romper → roto (broken)
• ver → visto (seen)
• volver → vuelto (returned)
• freír → frito (fried)
• resolver → resuelto (solved)
• devolver → devuelto (returned)
• descubrir → descubierto (discovered)

🔹 EJEMPLOS:
• He abierto la puerta. (I have opened the door)
• ¿Has visto la película? (Have you seen the movie?)
• Ella ha escrito una carta. (She has written a letter)
• Hemos hecho la tarea. (We have done the homework)
• El花瓶 se ha roto. (The vase has broken)

📌 TRUCO PARA RECORDAR:
La mayoría de los participios irregulares terminan en -to, -so, -cho:
• -to: abierto, cubierto, muerto, roto
• -so: puesto, impreso
• -cho: dicho, hecho

❌ ERROR COMÚN:
No confundas el participio irregular "hecho" con el adjetivo "hecho" (done). En el pretérito perfecto, siempre se usa el participio.`,
        descripcionChino: `最常见的不规则过去分词：

🔹 不规则过去分词列表：

• abrir (打开) → abierto
• cubrir (覆盖) → cubierto
• decir (说) → dicho
• escribir (写) → escrito
• hacer (做) → hecho
• morir (死) → muerto
• poner (放) → puesto
• romper (打破) → roto
• ver (看) → visto
• volver (回来) → vuelto
• freír (炸) → frito
• resolver (解决) → resuelto
• devolver (归还) → devuelto
• descubrir (发现) → descubierto

🔹 例子：
• He abierto la puerta. = 我打开了门。
• ¿Has visto la película? = 你看过这部电影了吗？
• Ella ha escrito una carta. = 她写了一封信。
• Hemos hecho la tarea. = 我们做了作业。
• El jarrón se ha roto. = 花瓶破了。

📌 记忆技巧：
大多数不规则过去分词以 -to、-so、-cho 结尾：
• -to：abierto, cubierto, muerto, roto
• -so：puesto, impreso
• -cho：dicho, hecho

❌ 常见错误：
不要混淆不规则过去分词"hecho"和形容词"hecho"（完成的）。在现在完成时中，总是使用过去分词。`,
        ejemplos: [
          {
            espanol: "He visto esa película.",
            chino: "我看过那部电影了。",
          },
          {
            espanol: "¿Has hecho la cama?",
            chino: "你铺床了吗？",
          },
          {
            espanol: "Ella ha dicho la verdad.",
            chino: "她说了实话。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Usos del pretérito perfecto",
        tituloChino: "现在完成时的用法",
        descripcion: `Se usa el pretérito perfecto para:

🔹 1. EXPERIENCIAS PASADAS (sin especificar cuándo):
   • He visitado París. (I have visited Paris)
   • ¿Has probado la paella? (Have you tried paella?)
   • Nunca he estado en China. (I have never been to China)

🔹 2. ACCIONES RECIENTES (con "acabar de"):
   • Acabo de terminar. (I have just finished)
   • Hemos llegado hace cinco minutos. (We arrived five minutes ago)

🔹 3. ACCIONES SIN TIEMPO ESPECÍFICO (con marcadores temporales):
   • Hoy he trabajado mucho. (Today I have worked a lot)
   • Esta semana he estudiado español. (This week I have studied Spanish)
   • Este año he viajado tres veces. (This year I have traveled three times)

🔹 4. CON YA, TODAVÍA NO, NUNCA, ALGUNA VEZ:
   • Ya he comido. (I have already eaten)
   • Todavía no he visto la película. (I haven't seen the movie yet)
   • ¿Alguna vez has viajado a Europa? (Have you ever traveled to Europe?)

📌 MARCADORES TEMPORALES TÍPICOS:

| Marcador | Significado | Ejemplo |
|----------|-------------|---------|
| ya | already | Ya he comido |
| todavía no | not yet | Todavía no he salido |
| nunca | never | Nunca he visto eso |
| alguna vez | ever | ¿Alguna vez has ido? |
| hoy | today | Hoy he trabajado |
| esta semana | this week | Esta semana he estudiado |
| este mes | this month | Este mes he viajado |
| este año | this year | Este año he aprendido |

❌ ERROR COMÚN:
No uses el pretérito perfecto con "ayer", "la semana pasada" u otras expresiones de tiempo pasado completado. Para eso se usa el pretérito indefinido.`,
        descripcionChino: `现在完成时的用法：

🔹 1. 过去的经历（不指定时间）：
   • He visitado París. = 我去过巴黎。
   • ¿Has probado la paella? = 你尝过海鲜饭吗？
   • Nunca he estado en China. = 我从未去过中国。

🔹 2. 最近发生的动作（与"acabar de"连用）：
   • Acabo de terminar. = 我刚完成。
   • Hemos llegado hace cinco minutos. = 我们五分钟前到了。

🔹 3. 没有具体时间的动作（与时间标志连用）：
   • Hoy he trabajado mucho. = 今天我工作了很多。
   • Esta semana he estudiado español. = 这周我学了西班牙语。
   • Este año he viajado tres veces. = 今年我旅行了三次。

🔹 4. 与YA、TODAVÍA NO、NUNCA、ALGUNA VEZ连用：
   • Ya he comido. = 我已经吃过了。
   • Todavía no he visto la película. = 我还没看过那部电影。
   • ¿Alguna vez has viajado a Europa? = 你曾经去过欧洲吗？

📌 典型时间标志：

| 标志 | 意思 | 例子 |
|------|------|------|
| ya | 已经 | Ya he comido |
| todavía no | 还没有 | Todavía no he salido |
| nunca | 从不 | Nunca he visto eso |
| alguna vez | 曾经 | ¿Alguna vez has ido? |
| hoy | 今天 | Hoy he trabajado |
| esta semana | 这周 | Esta semana he estudiado |
| este mes | 这个月 | Este mes he viajado |
| este año | 今年 | Este año he aprendido |

❌ 常见错误：
不要将现在完成时与"ayer"（昨天）、"la semana pasada"（上周）或其他表示已完成过去时间的表达连用。这些情况使用简单过去时。`,
        ejemplos: [
          {
            espanol: "Ya he terminado.",
            chino: "我已经完成了。",
          },
          {
            espanol: "Nunca he comido sushi.",
            chino: "我从未吃过寿司。",
          },
          {
            espanol: "¿Has viajado alguna vez?",
            chino: "你曾经旅行过吗？",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Pretérito perfecto vs Pretérito indefinido",
        tituloChino: "现在完成时 vs 简单过去时",
        descripcion: `🔹 DIFERENCIAS CLAVE:

| Aspecto | Pretérito Perfecto | Pretérito Indefinido |
|---------|-------------------|---------------------|
| Temporalidad | Pasado reciente / relevante hoy | Pasado lejano / completado |
| Marcadores | hoy, esta semana, este año, ya, todavía no | ayer, la semana pasada, el año pasado |
| Ejemplo | He comido hoy | Comí ayer |
| Experiencia | He visitado París (en mi vida) | Visité París en 2019 |

🔹 EJEMPLOS COMPARATIVOS:

• Hoy he desayunado a las 8. (today - perfecto)
• Ayer desayuné a las 7. (yesterday - indefinido)

• Esta semana he trabajado mucho. (this week - perfecto)
• La semana pasada trabajé mucho. (last week - indefinido)

• ¿Has visto la última película de Almodóvar? (perfecto)
• Viste la película conmigo el mes pasado. (indefinido)

📌 EN ESPAÑA:
El pretérito perfecto es muy común, incluso para acciones de hoy o esta semana.

📌 EN LATINOAMÉRICA:
Se usa más el pretérito indefinido, incluso para acciones recientes.

❌ ERROR COMÚN:
No uses el pretérito perfecto con "el año pasado". Usa el indefinido.`,
        descripcionChino: `🔹 关键区别：

| 方面 | 现在完成时 | 简单过去时 |
|------|-----------|-----------|
| 时间性 | 近期过去/与今天相关 | 遥远过去/已完成 |
| 时间标志 | hoy, esta semana, ya | ayer, la semana pasada |
| 例子 | He comido hoy | Comí ayer |
| 经历 | He visitado París | Visité París en 2019 |

🔹 对比例子：

• Hoy he desayunado a las 8. = 今天我8点吃了早餐。（今天 - 现在完成时）
• Ayer desayuné a las 7. = 昨天我7点吃了早餐。（昨天 - 简单过去时）

• Esta semana he trabajado mucho. = 这周我工作了很多。（这周 - 现在完成时）
• La semana pasada trabajé mucho. = 上周我工作了很多。（上周 - 简单过去时）

• ¿Has visto la última película de Almodóvar? = 你看过阿尔莫多瓦的最新电影吗？（现在完成时）
• Viste la película conmigo el mes pasado. = 你上个月和我一起看了那部电影。（简单过去时）

📌 在西班牙：
现在完成时很常用，甚至用于今天或这周的动作。

📌 在拉丁美洲：
简单过去时更常用，即使对于近期的动作。

❌ 常见错误：
不要将现在完成时与"el año pasado"（去年）连用。使用简单过去时。`,
        ejemplos: [
          {
            espanol: "Hoy he desayunado a las 8.",
            chino: "今天我8点吃了早餐。",
          },
          {
            espanol: "Ayer desayuné a las 7.",
            chino: "昨天我7点吃了早餐。",
          },
          {
            espanol: "¿Has visto la película?",
            chino: "你看过那部电影了吗？",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "he",
        chino: "我已经",
        ejemplo: "He hablado.",
      },
      {
        id: "v2",
        espanol: "has",
        chino: "你已经",
        ejemplo: "Has comido.",
      },
      {
        id: "v3",
        espanol: "ha",
        chino: "他已经",
        ejemplo: "Ha llegado.",
      },
      {
        id: "v4",
        espanol: "hemos",
        chino: "我们已经",
        ejemplo: "Hemos estudiado.",
      },
      {
        id: "v5",
        espanol: "habéis",
        chino: "你们已经",
        ejemplo: "Habéis salido.",
      },
      {
        id: "v6",
        espanol: "han",
        chino: "他们已经",
        ejemplo: "Han salido.",
      },
      {
        id: "v7",
        espanol: "hablado",
        chino: "说了",
        ejemplo: "He hablado con ella.",
      },
      {
        id: "v8",
        espanol: "comido",
        chino: "吃了",
        ejemplo: "He comido paella.",
      },
      {
        id: "v9",
        espanol: "vivido",
        chino: "住了",
        ejemplo: "He vivido en Madrid.",
      },
      {
        id: "v10",
        espanol: "hecho",
        chino: "做了",
        ejemplo: "He hecho la tarea.",
      },
      {
        id: "v11",
        espanol: "dicho",
        chino: "说了",
        ejemplo: "He dicho la verdad.",
      },
      {
        id: "v12",
        espanol: "visto",
        chino: "看了",
        ejemplo: "He visto la película.",
      },
      {
        id: "v13",
        espanol: "escrito",
        chino: "写了",
        ejemplo: "He escrito un mensaje.",
      },
      {
        id: "v14",
        espanol: "abierto",
        chino: "打开了",
        ejemplo: "He abierto la puerta.",
      },
      {
        id: "v15",
        espanol: "puesto",
        chino: "放了",
        ejemplo: "He puesto el libro aquí.",
      },
      {
        id: "v16",
        espanol: "roto",
        chino: "打破了",
        ejemplo: "He roto un vaso.",
      },
      {
        id: "v17",
        espanol: "vuelto",
        chino: "回来了",
        ejemplo: "He vuelto a casa.",
      },
      {
        id: "v18",
        espanol: "ya",
        chino: "已经",
        ejemplo: "Ya he comido.",
      },
      {
        id: "v19",
        espanol: "todavía no",
        chino: "还没有",
        ejemplo: "Todavía no he terminado.",
      },
      {
        id: "v20",
        espanol: "nunca",
        chino: "从不",
        ejemplo: "Nunca he estado allí.",
      },
      {
        id: "v21",
        espanol: "alguna vez",
        chino: "曾经",
        ejemplo: "¿Alguna vez has viajado?",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Hablando de experiencias",
        tituloChino: "谈论经历",
        personajes: ["Ana", "Carlos"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Carlos, ¿has viajado a España alguna vez?",
            traduccion: "卡洛斯，你曾经去过西班牙吗？",
          },
          {
            personaje: "Carlos",
            texto: "Sí, he viajado dos veces. ¿Y tú?",
            traduccion: "是的，我去过两次。你呢？",
          },
          {
            personaje: "Ana",
            texto: "Yo nunca he estado en España, pero me encantaría.",
            traduccion: "我从未去过西班牙，但我会很喜欢。",
          },
          {
            personaje: "Carlos",
            texto: "¿Has comido paella?",
            traduccion: "你吃过海鲜饭吗？",
          },
          {
            personaje: "Ana",
            texto: "No, todavía no he probado la paella auténtica.",
            traduccion: "没有，我还没尝过正宗的海鲜饭。",
          },
          {
            personaje: "Carlos",
            texto: "Deberías ir. España es increíble.",
            traduccion: "你应该去。西班牙很棒。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Qué has hecho hoy",
        tituloChino: "今天做了什么",
        personajes: ["María", "Pedro"],
        lineas: [
          {
            personaje: "María",
            texto: "Pedro, ¿qué has hecho hoy?",
            traduccion: "佩德罗，你今天做了什么？",
          },
          {
            personaje: "Pedro",
            texto: "He trabajado toda la mañana. ¿Y tú?",
            traduccion: "我工作了一整个上午。你呢？",
          },
          {
            personaje: "María",
            texto: "Yo he estudiado español y he visto una película.",
            traduccion: "我学了西班牙语，还看了一部电影。",
          },
          {
            personaje: "Pedro",
            texto: "¿Has comido ya?",
            traduccion: "你已经吃过了吗？",
          },
          {
            personaje: "María",
            texto: "No, todavía no he comido. ¿Vamos a comer?",
            traduccion: "没有，我还没吃。我们去吃饭吧？",
          },
          {
            personaje: "Pedro",
            texto: "Buena idea. He oído que hay un nuevo restaurante.",
            traduccion: "好主意。我听说有一家新餐厅。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Deberes y tareas",
        tituloChino: "作业和任务",
        personajes: ["Luis", "Sofía"],
        lineas: [
          {
            personaje: "Luis",
            texto: "Sofía, ¿has hecho los deberes?",
            traduccion: "索菲亚，你做完作业了吗？",
          },
          {
            personaje: "Sofía",
            texto: "Sí, ya los he hecho. ¿Y tú?",
            traduccion: "是的，我已经做完了。你呢？",
          },
          {
            personaje: "Luis",
            texto: "Todavía no he empezado. No he tenido tiempo.",
            traduccion: "我还没开始。我没有时间。",
          },
          {
            personaje: "Sofía",
            texto: "¿Qué has hecho entonces?",
            traduccion: "那你做了什么？",
          },
          {
            personaje: "Luis",
            texto: "He visto una serie en Netflix.",
            traduccion: "我在Netflix上看了一部电视剧。",
          },
          {
            personaje: "Sofía",
            texto: "¡Deberías hacer los deberes primero!",
            traduccion: "你应该先做作业！",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Experiencias de viaje",
        tituloChino: "旅行经历",
        personajes: ["Laura", "David"],
        lineas: [
          {
            personaje: "Laura",
            texto: "David, ¿has estado alguna vez en Asia?",
            traduccion: "大卫，你曾经去过亚洲吗？",
          },
          {
            personaje: "David",
            texto: "Sí, he estado en Japón y en Tailandia. ¿Y tú?",
            traduccion: "是的，我去过日本和泰国。你呢？",
          },
          {
            personaje: "Laura",
            texto: "Nunca he salido de Europa. Pero he visitado muchos países aquí.",
            traduccion: "我从未离开过欧洲。但我去过这里的许多国家。",
          },
          {
            personaje: "David",
            texto: "¿Has estado en España?",
            traduccion: "你去过西班牙吗？",
          },
          {
            personaje: "Laura",
            texto: "Sí, he ido tres veces. Me encanta la comida española.",
            traduccion: "是的，我去过三次。我喜欢西班牙菜。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Cambios recientes",
        tituloChino: "近期变化",
        personajes: ["Sofía", "Javier"],
        lineas: [
          {
            personaje: "Sofía",
            texto: "Javier, ¿has cambiado algo en tu vida recientemente?",
            traduccion: "哈维尔，你最近生活有什么变化吗？",
          },
          {
            personaje: "Javier",
            texto: "Sí, he empezado a hacer ejercicio y he dejado de fumar.",
            traduccion: "是的，我开始锻炼了，也戒烟了。",
          },
          {
            personaje: "Sofía",
            texto: "¡Qué bien! ¿Has notado algún cambio?",
            traduccion: "真好！你注意到有什么变化吗？",
          },
          {
            personaje: "Javier",
            texto: "Me siento con más energía y he perdido peso.",
            traduccion: "我感觉更有精力了，体重也减轻了。",
          },
          {
            personaje: "Sofía",
            texto: "¿Has ido al médico para que te revise?",
            traduccion: "你去看医生检查了吗？",
          },
          {
            personaje: "Javier",
            texto: "Todavía no, pero tengo pensado ir la semana que viene.",
            traduccion: "还没有，但我打算下周去。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "Yo _____ (hablar) con María.",
          preguntaChino: "Yo _____ (hablar) con María.",
          respuestaCorrecta: "he hablado",
          explicacion: "Pretérito perfecto: he + participio",
          pista: "he + hablado",
          numeroLetras: 10,
        },
        {
          id: "c2",
          pregunta: "Tú _____ (comer) paella.",
          preguntaChino: "Tú _____ (comer) paella.",
          respuestaCorrecta: "has comido",
          explicacion: "Pretérito perfecto: has + comido",
          pista: "has + comido",
          numeroLetras: 10,
        },
        {
          id: "c3",
          pregunta: "Ella _____ (ver) la película.",
          preguntaChino: "Ella _____ (ver) la película.",
          respuestaCorrecta: "ha visto",
          explicacion: "Ver → visto (irregular)",
          pista: "ha + visto",
          numeroLetras: 8,
        },
        {
          id: "c4",
          pregunta: "Nosotros _____ (hacer) la tarea.",
          preguntaChino: "Nosotros _____ (hacer) la tarea.",
          respuestaCorrecta: "hemos hecho",
          explicacion: "Hacer → hecho (irregular)",
          pista: "hemos + hecho",
          numeroLetras: 10,
        },
        {
          id: "c5",
          pregunta: "Ellos _____ (llegar) tarde.",
          preguntaChino: "Ellos _____ (llegar) tarde.",
          respuestaCorrecta: "han llegado",
          explicacion: "Pretérito perfecto: han + llegado",
          pista: "han + llegado",
          numeroLetras: 11,
        },
        {
          id: "c6",
          pregunta: "Vosotros _____ (escribir) un correo.",
          preguntaChino: "Vosotros _____ (escribir) un correo.",
          respuestaCorrecta: "habéis escrito",
          explicacion: "Escribir → escrito (irregular)",
          pista: "habéis + escrito",
          numeroLetras: 13,
        },
        {
          id: "c7",
          pregunta: "Yo _____ (abrir) la ventana.",
          preguntaChino: "Yo _____ (abrir) la ventana.",
          respuestaCorrecta: "he abierto",
          explicacion: "Abrir → abierto (irregular)",
          pista: "he + abierto",
          numeroLetras: 9,
        },
        {
          id: "c8",
          pregunta: "Ellas _____ (volver) a casa.",
          preguntaChino: "Ellas _____ (volver) a casa.",
          respuestaCorrecta: "han vuelto",
          explicacion: "Volver → vuelto (irregular)",
          pista: "han + vuelto",
          numeroLetras: 9,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "如何说'我已经说过'？",
          preguntaChino: "如何说'我已经说过'？",
          opciones: ["He hablo", "He hablado", "Has hablado", "Ha hablado"],
          respuestaCorrecta: "He hablado",
          explicacion: "Pretérito perfecto: he + hablado",
        },
        {
          id: "s2",
          pregunta: "¿Cuál es el participio de 'escribir'?",
          preguntaChino: "'escribir'的过去分词是什么？",
          opciones: ["escribido", "escrito", "escribo", "escribía"],
          respuestaCorrecta: "escrito",
          explicacion: "Escribir → escrito",
        },
        {
          id: "s3",
          pregunta: "¿Cómo se dice '我已经看过了' en español?",
          preguntaChino: "西班牙语中'我已经看过了'怎么说？",
          opciones: ["He visto", "He ver", "He veo", "He viendo"],
          respuestaCorrecta: "He visto",
          explicacion: "Ver → visto",
        },
        {
          id: "s4",
          pregunta: "¿Qué marcador temporal se usa con pretérito perfecto?",
          preguntaChino: "哪个时间标志与现在完成时连用？",
          opciones: ["ayer", "la semana pasada", "hoy", "el año pasado"],
          respuestaCorrecta: "hoy",
          explicacion: "Hoy, esta semana, este año",
        },
        {
          id: "s5",
          pregunta: "¿Cómo se dice '你吃过饭了吗？' en español?",
          preguntaChino: "西班牙语中'你吃过饭了吗？'怎么说？",
          opciones: ["¿Comiste?", "¿Has comido?", "¿Comías?", "¿Comerás?"],
          respuestaCorrecta: "¿Has comido?",
          explicacion: "Pretérito perfecto para preguntar",
        },
        {
          id: "s6",
          pregunta: "¿Cuál es el participio de 'hacer'?",
          preguntaChino: "'hacer'的过去分词是什么？",
          opciones: ["hacido", "hecho", "hago", "hacía"],
          respuestaCorrecta: "hecho",
          explicacion: "Hacer → hecho",
        },
        {
          id: "s7",
          pregunta: "¿Qué significa 'Todavía no he terminado'?",
          preguntaChino: "'Todavía no he terminado'是什么意思？",
          opciones: ["我已经完成了", "我还没完成", "我完成了", "我将完成"],
          respuestaCorrecta: "我还没完成",
          explicacion: "Todavía no = 还没有",
        },
        {
          id: "s8",
          pregunta: "¿Cuándo usamos el pretérito perfecto?",
          preguntaChino: "什么时候使用现在完成时？",
          opciones: [
            "Para acciones pasadas completadas",
            "Para experiencias sin fecha",
            "Para acciones habituales",
            "Para el futuro",
          ],
          respuestaCorrecta: "Para experiencias sin fecha",
          explicacion: "Experiencias pasadas sin especificar cuándo",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "El pretérito perfecto usa el verbo HABER.",
          preguntaChino: "现在完成时使用动词HABER。",
          respuestaCorrecta: true,
          explicacion: "对。He, has, ha, hemos, habéis, han",
        },
        {
          id: "vf2",
          pregunta: "El participio de 'abrir' es 'abrido'.",
          preguntaChino: "'abrir'的过去分词是'abrido'。",
          respuestaCorrecta: false,
          explicacion: "错。Abrir → abierto",
        },
        {
          id: "vf3",
          pregunta: "Se usa pretérito perfecto con 'ayer'.",
          preguntaChino: "现在完成时与'ayer'连用。",
          respuestaCorrecta: false,
          explicacion: "错。Ayer es para pretérito indefinido",
        },
        {
          id: "vf4",
          pregunta: "'He hecho' es correcto.",
          preguntaChino: "'He hecho'是正确的。",
          respuestaCorrecta: true,
          explicacion: "对。Hacer → hecho",
        },
        {
          id: "vf5",
          pregunta: "Nunca' se usa con pretérito perfecto.",
          preguntaChino: "'Nunca'与现在完成时连用。",
          respuestaCorrecta: true,
          explicacion: "对。Nunca he estado",
        },
        {
          id: "vf6",
          pregunta: "El participio de 'romper' es 'rompido'.",
          preguntaChino: "'romper'的过去分词是'rompido'。",
          respuestaCorrecta: false,
          explicacion: "错。Romper → roto",
        },
        {
          id: "vf7",
          pregunta: "'Todavía no' se usa con pretérito perfecto.",
          preguntaChino: "'Todavía no'与现在完成时连用。",
          respuestaCorrecta: true,
          explicacion: "对。Todavía no he comido",
        },
        {
          id: "vf8",
          pregunta: "En España se usa más el pretérito perfecto que en Latinoamérica.",
          preguntaChino: "在西班牙，现在完成时比在拉丁美洲用得更多。",
          respuestaCorrecta: true,
          explicacion: "对。En España es más común",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "he hablado",
              derecha: "我已经说了",
            },
            {
              izquierda: "has comido",
              derecha: "你已经吃了",
            },
            {
              izquierda: "ha visto",
              derecha: "他已经看了",
            },
            {
              izquierda: "hemos hecho",
              derecha: "我们已经做了",
            },
            {
              izquierda: "habéis escrito",
              derecha: "你们已经写了",
            },
            {
              izquierda: "han llegado",
              derecha: "他们已经到了",
            },
            {
              izquierda: "hecho",
              derecha: "做了",
            },
            {
              izquierda: "visto",
              derecha: "看了",
            },
            {
              izquierda: "dicho",
              derecha: "说了",
            },
            {
              izquierda: "abierto",
              derecha: "打开了",
            },
            {
              izquierda: "puesto",
              derecha: "放了",
            },
            {
              izquierda: "roto",
              derecha: "打破了",
            },
          ],
          explicacion: "将现在完成时形式与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["he", "Yo", "español", "estudiado", "."],
          respuestaCorrecta: "Yo he estudiado español.",
          explicacion: "正确的句子是：Yo he estudiado español.",
        },
        {
          id: "o2",
          palabras: ["has", "paella", "comido", "Tú", "?"],
          respuestaCorrecta: "¿Has comido paella?",
          explicacion: "正确的句子是：¿Has comido paella?",
        },
        {
          id: "o3",
          palabras: ["no", "Todavía", "he", "terminado", "."],
          respuestaCorrecta: "Todavía no he terminado.",
          explicacion: "正确的句子是：Todavía no he terminado.",
        },
        {
          id: "o4",
          palabras: ["Nunca", "he", "visto", "esto", "."],
          respuestaCorrecta: "Nunca he visto esto.",
          explicacion: "正确的顺序是：Nunca he visto esto.",
        },
        {
          id: "o5",
          palabras: ["hecho", "Ya", "he", "la", "tarea", "."],
          respuestaCorrecta: "Ya he hecho la tarea.",
          explicacion: "正确的顺序是：Ya he hecho la tarea.",
        },
        {
          id: "o6",
          palabras: ["España", "has", "¿Alguna", "vez", "estado", "en", "?"],
          respuestaCorrecta: "¿Alguna vez has estado en España?",
          explicacion: "正确的顺序是：¿Alguna vez has estado en España?",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "我已经学过了西班牙语。",
          respuestaEsperada: "He estudiado español.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "你看过那部电影了吗？",
          respuestaEsperada: "¿Has visto esa película?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "我还没吃饭。",
          respuestaEsperada: "Todavía no he comido.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "我从未去过中国。",
          respuestaEsperada: "Nunca he estado en China.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "我已经完成了作业。",
          respuestaEsperada: "Ya he hecho los deberes.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "你们已经吃过晚饭了吗？",
          respuestaEsperada: "¿Habéis cenado ya?",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "她今天没来上班。",
          respuestaEsperada: "Ella no ha venido a trabajar hoy.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "我们今年去过很多地方。",
          respuestaEsperada: "Hemos viajado mucho este año.",
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
        instruccion: "用现在完成时完成对话。",
        instruccionChino: "用现在完成时完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "¿Qué _____ (hacer) hoy?",
            respuesta: "has hecho",
          },
          {
            personaje: "B",
            texto: "Yo _____ (estudiar) español.",
            respuesta: "he estudiado",
          },
          {
            personaje: "A",
            texto: "¿_____ (comer) ya?",
            respuesta: "Has comido",
          },
          {
            personaje: "B",
            texto: "No, todavía no _____ (comer).",
            respuesta: "he comido",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "completarTabla",
        titulo: "Completa la conjugación",
        tituloChino: "完成变位表",
        instruccion: "Conjuga los siguientes verbos en pretérito perfecto.",
        instruccionChino: "将以下动词变为现在完成时。",
        tabla: [
          {
            verbo: "hablar",
            yo: "he hablado",
            tu: "has hablado",
            el: "ha hablado",
            nosotros: "hemos hablado",
            ellos: "han hablado",
          },
          {
            verbo: "comer",
            yo: "he comido",
            tu: "has comido",
            el: "ha comido",
            nosotros: "hemos comido",
            ellos: "han comido",
          },
          {
            verbo: "vivir",
            yo: "he vivido",
            tu: "has vivido",
            el: "ha vivido",
            nosotros: "hemos vivido",
            ellos: "han vivido",
          },
          {
            verbo: "hacer",
            yo: "he hecho",
            tu: "has hecho",
            el: "ha hecho",
            nosotros: "hemos hecho",
            ellos: "han hecho",
          },
          {
            verbo: "ver",
            yo: "he visto",
            tu: "has visto",
            el: "ha visto",
            nosotros: "hemos visto",
            ellos: "han visto",
          },
        ],
      },
      {
        id: "ep3",
        tipo: "completarFrases",
        titulo: "Completa las frases",
        tituloChino: "完成句子",
        instruccion: "Completa las frases con el pretérito perfecto del verbo entre paréntesis.",
        instruccionChino: "用括号中动词的现在完成时完成句子。",
        frases: [
          {
            frase: "Yo _____ (terminar) el libro.",
            respuesta: "he terminado",
          },
          {
            frase: "Ella _____ (abrir) la ventana.",
            respuesta: "ha abierto",
          },
          {
            frase: "Nosotros _____ (ver) esa película.",
            respuesta: "hemos visto",
          },
          {
            frase: "Ellos _____ (escribir) un poema.",
            respuesta: "han escrito",
          },
          {
            frase: "Tú _____ (hacer) la cama.",
            respuesta: "has hecho",
          },
        ],
      },
      {
        id: "ep4",
        tipo: "responder",
        titulo: "Responde las preguntas",
        tituloChino: "回答问题",
        instruccion: "Responde las siguientes preguntas usando el pretérito perfecto.",
        instruccionChino: "使用现在完成时回答以下问题。",
        preguntas: [
          {
            pregunta: "¿Has viajado a algún país extranjero?",
            respuestaEsperada: "Sí, he viajado a... / No, nunca he viajado.",
          },
          {
            pregunta: "¿Qué has hecho hoy?",
            respuestaEsperada: "Hoy he (estudiado / trabajado / comido / etc.).",
          },
          {
            pregunta: "¿Has visto alguna buena película recientemente?",
            respuestaEsperada: "Sí, he visto... / No, no he visto ninguna.",
          },
        ],
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "¿Qué has hecho hoy?",
        preguntaChino: "你今天做了什么？",
        sugerencia: "Hoy he (estudiado, trabajado, comido, visto una película).",
        sugerenciaChino: "Hoy he (estudiado, trabajado, comido, visto una película).",
      },
      {
        id: "pa2",
        pregunta: "¿Has viajado a algún país extranjero? ¿Cuál?",
        preguntaChino: "你去过外国吗？去过哪个？",
        sugerencia: "Sí, he viajado a... / No, nunca he viajado a otro país.",
        sugerenciaChino: "Sí, he viajado a... / No, nunca he viajado a otro país.",
      },
      {
        id: "pa3",
        pregunta: "¿Qué películas has visto recientemente?",
        preguntaChino: "你最近看过什么电影？",
        sugerencia: "Recientemente he visto...",
        sugerenciaChino: "Recientemente he visto...",
      },
      {
        id: "pa4",
        pregunta: "¿Has hecho algo nuevo este año?",
        preguntaChino: "你今年做了什么新的事情吗？",
        sugerencia: "Este año he aprendido a... / he empezado a...",
        sugerenciaChino: "Este año he aprendido a... / he empezado a...",
      },
      {
        id: "pa5",
        pregunta: "¿Qué has comido hoy?",
        preguntaChino: "你今天吃了什么？",
        sugerencia: "Hoy he comido (paella, ensalada, pollo...).",
        sugerenciaChino: "Hoy he comido (paella, ensalada, pollo...).",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se forma el pretérito perfecto?",
        preguntaChino: "现在完成时如何构成？",
        respuestaSugerida: "Haber + participio",
        respuestaSugeridaChino: "Haber + 过去分词",
      },
      {
        id: "p2",
        pregunta: "¿Cuál es el participio de 'hacer'?",
        preguntaChino: "'hacer'的过去分词是什么？",
        respuestaSugerida: "hecho",
        respuestaSugeridaChino: "hecho",
      },
      {
        id: "p3",
        pregunta: "¿Cómo se dice '我已经吃过饭了' en español?",
        preguntaChino: "西班牙语中'我已经吃过饭了'怎么说？",
        respuestaSugerida: "Ya he comido.",
        respuestaSugeridaChino: "Ya he comido.",
      },
      {
        id: "p4",
        pregunta: "¿Qué significa 'Todavía no he terminado'?",
        preguntaChino: "'Todavía no he terminado'是什么意思？",
        respuestaSugerida: "我还没完成。",
        respuestaSugeridaChino: "I haven't finished yet.",
      },
      {
        id: "p5",
        pregunta: "¿Cuál es el participio de 'abrir'?",
        preguntaChino: "'abrir'的过去分词是什么？",
        respuestaSugerida: "abierto",
        respuestaSugeridaChino: "abierto",
      },
      {
        id: "p6",
        pregunta: "¿Qué diferencia hay entre pretérito perfecto e indefinido?",
        preguntaChino: "现在完成时和简单过去时有什么区别？",
        respuestaSugerida:
          "Perfecto para acciones recientes o relevantes hoy. Indefinido para acciones pasadas completadas.",
        respuestaSugeridaChino: "现在完成时用于近期或与今天相关的动作。简单过去时用于已完成的过去动作。",
      },
    ],
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
    teoria: [
      {
        id: "t1",
        titulo: "Preguntar direcciones",
        tituloChino: "问路",
        descripcion: `Frases para preguntar direcciones:

🔹 PREGUNTAS COMUNES:
• ¿Dónde está...? = Where is...?
• ¿Cómo llego a...? = How do I get to...?
• ¿Hay un/una... por aquí? = Is there a... around here?
• ¿Está lejos? = Is it far?
• ¿Cuánto tiempo se tarda? = How long does it take?
• ¿Puede ayudarme? = Can you help me?
• ¿Va por aquí? = Is it this way?
• ¿A qué distancia está? = How far is it?
• ¿Qué autobús/ metro puedo coger? = Which bus/metro can I take?

🔹 EJEMPLOS:
• ¿Dónde está la farmacia? (Where is the pharmacy?)
• ¿Cómo llego al museo? (How do I get to the museum?)
• ¿Hay un restaurante por aquí? (Is there a restaurant around here?)
• ¿Está lejos la estación? (Is the station far?)
• ¿Cuánto se tarda en coche? (How long does it take by car?)

📌 NOTA CULTURAL:
En los países hispanohablantes, es normal pedir indicaciones a desconocidos, especialmente en tiendas pequeñas o en la calle. La gente suele ser muy amable y dispuesta a ayudar.`,
        descripcionChino: `问路的常用句子：

🔹 常见问题：
• ¿Dónde está...? = ...在哪里？
• ¿Cómo llego a...? = 我怎么去...？
• ¿Hay un/una... por aquí? = 这附近有...吗？
• ¿Está lejos? = 远吗？
• ¿Cuánto tiempo se tarda? = 需要多长时间？
• ¿Puede ayudarme? = 您能帮我吗？
• ¿Va por aquí? = 是这边吗？
• ¿A qué distancia está? = 有多远？
• ¿Qué autobús/ metro puedo coger? = 我可以坐哪路公交/地铁？

🔹 例子：
• ¿Dónde está la farmacia? = 药店在哪里？
• ¿Cómo llego al museo? = 我怎么去博物馆？
• ¿Hay un restaurante por aquí? = 这附近有餐厅吗？
• ¿Está lejos la estación? = 车站远吗？
• ¿Cuánto se tarda en coche? = 开车需要多长时间？

📌 文化提示：
在西班牙语国家，向陌生人问路是很正常的，尤其是在小商店或街上。人们通常很友好，乐于帮助。`,
        ejemplos: [
          {
            espanol: "¿Dónde está la farmacia?",
            chino: "药店在哪里？",
          },
          {
            espanol: "¿Cómo llego al museo?",
            chino: "我怎么去博物馆？",
          },
          {
            espanol: "¿Hay un restaurante por aquí?",
            chino: "这附近有餐厅吗？",
          },
        ],
      },
      {
        id: "t2",
        titulo: "Dar direcciones",
        tituloChino: "指路",
        descripcion: `Frases para dar direcciones:

🔹 MOVIMIENTO Y DIRECCIÓN:
• sigue todo recto = go straight
• gira a la izquierda = turn left
• gira a la derecha = turn right
• toma la primera calle a la derecha = take the first street on the right
• toma la segunda calle a la izquierda = take the second street on the left
• cruza la calle = cross the street
• continúa = continue
• pasa de largo = go past
• da la vuelta = turn around

🔹 UBICACIÓN DEL DESTINO:
• está a la izquierda = it's on the left
• está a la derecha = it's on the right
• está al final de la calle = it's at the end of the street
• está en la esquina = it's on the corner
• está a la vuelta de la esquina = it's around the corner
• está enfrente de = it's opposite
• está detrás de = it's behind
• está al lado de = it's next to
• está entre... y... = it's between... and...

🔹 DISTANCIA:
• está a dos cuadras = it's two blocks away
• está a cinco minutos a pie = it's a five-minute walk
• está a diez minutos en coche = it's a ten-minute drive
• está muy cerca = it's very close
• está bastante lejos = it's quite far

📌 EJEMPLOS:
• Sigue recto dos cuadras.
• Gira a la izquierda en el semáforo.
• Está a la derecha, al lado del banco.
• Toma la primera calle y luego sigue recto.`,
        descripcionChino: `指路的常用句子：

🔹 移动和方向：
• sigue todo recto = 一直直走
• gira a la izquierda = 左转
• gira a la derecha = 右转
• toma la primera calle a la derecha = 在第一条街右转
• toma la segunda calle a la izquierda = 在第二条街左转
• cruza la calle = 过马路
• continúa = 继续
• pasa de largo = 经过/路过
• da la vuelta = 掉头

🔹 目的地位置：
• está a la izquierda = 在左边
• está a la derecha = 在右边
• está al final de la calle = 在街的尽头
• está en la esquina = 在拐角处
• está a la vuelta de la esquina = 在拐角附近
• está enfrente de = 在...对面
• está detrás de = 在...后面
• está al lado de = 在...旁边
• está entre... y... = 在...和...之间

🔹 距离：
• está a dos cuadras = 在两个街区外
• está a cinco minutos a pie = 步行五分钟
• está a diez minutos en coche = 开车十分钟
• está muy cerca = 很近
• está bastante lejos = 相当远

📌 例子：
• Sigue recto dos cuadras. = 直走两个街区。
• Gira a la izquierda en el semáforo. = 在红绿灯左转。
• Está a la derecha, al lado del banco. = 在右边，银行旁边。
• Toma la primera calle y luego sigue recto. = 走第一条街，然后直走。`,
        ejemplos: [
          {
            espanol: "Sigue recto y gira a la izquierda.",
            chino: "直走然后左转。",
          },
          {
            espanol: "Está al final de la calle.",
            chino: "在街的尽头。",
          },
          {
            espanol: "Toma la segunda calle a la derecha.",
            chino: "在第二条街右转。",
          },
        ],
      },
      {
        id: "t3",
        titulo: "Expresiones de distancia y tiempo",
        tituloChino: "距离和时间表达",
        descripcion: `Expresiones útiles:

🔹 DISTANCIA:
• está muy cerca = it's very close
• está bastante lejos = it's quite far
• está a cinco minutos a pie = it's a five-minute walk
• está a diez minutos en coche = it's a ten-minute drive
• está a dos manzanas / cuadras = it's two blocks away
• está a 500 metros = it's 500 meters away
• no está lejos = it's not far
• puedes ir andando = you can walk there

🔹 TIEMPO:
• tarda unos quince minutos = it takes about fifteen minutes
• se tarda media hora en autobús = it takes half an hour by bus
• en coche tardas diez minutos = by car it takes ten minutes
• puedes ir andando en cinco minutos = you can walk there in five minutes
• es mejor ir en autobús = it's better to go by bus
• el tráfico puede ser malo = traffic can be bad

🔹 PREGUNTAS DE DISTANCIA Y TIEMPO:
• ¿A cuánto queda? = How far is it?
• ¿Cuánto se tarda? = How long does it take?
• ¿Puedo ir andando? = Can I walk there?
• ¿Cuántos kilómetros hay? = How many kilometers are there?
• ¿Hay mucho tráfico? = Is there a lot of traffic?

📌 EJEMPLOS:
• Está a cinco minutos a pie.
• Está muy cerca de aquí.
• ¿Cuánto se tarda en coche?`,
        descripcionChino: `有用表达：

🔹 距离：
• está muy cerca = 很近
• está bastante lejos = 相当远
• está a cinco minutos a pie = 步行五分钟
• está a diez minutos en coche = 开车十分钟
• está a dos manzanas / cuadras = 两个街区
• está a 500 metros = 五百米远
• no está lejos = 不远
• puedes ir andando = 你可以步行去

🔹 时间：
• tarda unos quince minutos = 大约需要十五分钟
• se tarda media hora en autobús = 坐公交车需要半小时
• en coche tardas diez minutos = 开车需要十分钟
• puedes ir andando en cinco minutos = 步行五分钟可以到
• es mejor ir en autobús = 最好坐公交车去
• el tráfico puede ser malo = 交通可能不好

🔹 距离和时间问题：
• ¿A cuánto queda? = 还有多远？
• ¿Cuánto se tarda? = 需要多长时间？
• ¿Puedo ir andando? = 我可以步行去吗？
• ¿Cuántos kilómetros hay? = 有多少公里？
• ¿Hay mucho tráfico? = 交通拥堵吗？

📌 例子：
• Está a cinco minutos a pie. = 步行五分钟。
• Está muy cerca de aquí. = 离这里很近。
• ¿Cuánto se tarda en coche? = 开车需要多长时间？`,
        ejemplos: [
          {
            espanol: "Está a cinco minutos a pie.",
            chino: "步行五分钟。",
          },
          {
            espanol: "Está muy cerca de aquí.",
            chino: "离这里很近。",
          },
          {
            espanol: "¿Cuánto se tarda en coche?",
            chino: "开车需要多长时间？",
          },
        ],
      },
      {
        id: "t4",
        titulo: "Puntos de referencia (landmarks)",
        tituloChino: "地标",
        descripcion: `Puntos de referencia útiles para dar direcciones:

🔹 LUGARES COMUNES:
• la plaza = the square
• la iglesia = the church
• la catedral = the cathedral
• el parque = the park
• el mercado = the market
• la estación de tren = the train station
• la estación de metro = the metro station
• la parada de autobús = the bus stop
• el semáforo = the traffic light
• la rotonda / glorieta = the roundabout
• el puente = the bridge
• la fuente = the fountain
• el ayuntamiento = the town hall
• el hospital = the hospital
• la farmacia = the pharmacy
• el supermercado = the supermarket

🔹 EJEMPLOS CON PUNTOS DE REFERENCIA:
• Sigue recto hasta la plaza.
• Gira a la izquierda en la iglesia.
• Está detrás del mercado.
• El banco está al lado de la farmacia, enfrente del supermercado.

📌 VOCABULARIO ADICIONAL:
• a la altura de = at the level of
• pasando el = past the
• antes del = before the
• después del = after the
• justo en = right at

📌 EJEMPLOS:
• Gira a la izquierda en la iglesia.
• Está detrás del mercado.
• El banco está al lado de la farmacia.`,
        descripcionChino: `指路时有用的地标：

🔹 常见地点：
• la plaza = 广场
• la iglesia = 教堂
• la catedral = 大教堂
• el parque = 公园
• el mercado = 市场
• la estación de tren = 火车站
• la estación de metro = 地铁站
• la parada de autobús = 公交车站
• el semáforo = 红绿灯
• la rotonda / glorieta = 环岛
• el puente = 桥
• la fuente = 喷泉
• el ayuntamiento = 市政厅
• el hospital = 医院
• la farmacia = 药店
• el supermercado = 超市

🔹 带地标的例子：
• Sigue recto hasta la plaza. = 直走到广场。
• Gira a la izquierda en la iglesia. = 在教堂左转。
• Está detrás del mercado. = 在市场后面。
• El banco está al lado de la farmacia, enfrente del supermercado. = 银行在药店旁边，超市对面。

📌 额外词汇：
• a la altura de = 在...的高度/位置
• pasando el = 过了...之后
• antes del = 在...之前
• después del = 在...之后
• justo en = 正好在

📌 例子：
• Gira a la izquierda en la iglesia. = 在教堂左转。
• Está detrás del mercado. = 在市场后面。
• El banco está al lado de la farmacia. = 银行在药店旁边。`,
        ejemplos: [
          {
            espanol: "Gira a la izquierda en la iglesia.",
            chino: "在教堂左转。",
          },
          {
            espanol: "Está detrás del mercado.",
            chino: "在市场后面。",
          },
          {
            espanol: "El banco está al lado de la farmacia.",
            chino: "银行在药店旁边。",
          },
        ],
      },
    ],
    vocabulario: [
      {
        id: "v1",
        espanol: "¿Dónde está...?",
        chino: "...在哪里？",
        ejemplo: "¿Dónde está el banco?",
      },
      {
        id: "v2",
        espanol: "¿Cómo llego a...?",
        chino: "我怎么去...？",
        ejemplo: "¿Cómo llego al museo?",
      },
      {
        id: "v3",
        espanol: "sigue recto",
        chino: "直走",
        ejemplo: "Sigue recto dos cuadras.",
      },
      {
        id: "v4",
        espanol: "gira a la izquierda",
        chino: "左转",
        ejemplo: "Gira a la izquierda.",
      },
      {
        id: "v5",
        espanol: "gira a la derecha",
        chino: "右转",
        ejemplo: "Gira a la derecha.",
      },
      {
        id: "v6",
        espanol: "toma la primera calle",
        chino: "走第一条街",
        ejemplo: "Toma la primera calle.",
      },
      {
        id: "v7",
        espanol: "toma la segunda calle",
        chino: "走第二条街",
        ejemplo: "Toma la segunda calle.",
      },
      {
        id: "v8",
        espanol: "cruza la calle",
        chino: "过马路",
        ejemplo: "Cruza la calle.",
      },
      {
        id: "v9",
        espanol: "la esquina",
        chino: "拐角",
        ejemplo: "Está en la esquina.",
      },
      {
        id: "v10",
        espanol: "el final de la calle",
        chino: "街的尽头",
        ejemplo: "Al final de la calle.",
      },
      {
        id: "v11",
        espanol: "cerca",
        chino: "近",
        ejemplo: "Está cerca.",
      },
      {
        id: "v12",
        espanol: "lejos",
        chino: "远",
        ejemplo: "Está lejos.",
      },
      {
        id: "v13",
        espanol: "a pie",
        chino: "步行",
        ejemplo: "Se tarda 5 minutos a pie.",
      },
      {
        id: "v14",
        espanol: "en coche",
        chino: "开车",
        ejemplo: "10 minutos en coche.",
      },
      {
        id: "v15",
        espanol: "cuadra / manzana",
        chino: "街区",
        ejemplo: "Dos cuadras.",
      },
      {
        id: "v16",
        espanol: "el semáforo",
        chino: "红绿灯",
        ejemplo: "En el semáforo gira.",
      },
      {
        id: "v17",
        espanol: "la rotonda / glorieta",
        chino: "环岛",
        ejemplo: "En la rotonda.",
      },
      {
        id: "v18",
        espanol: "la plaza",
        chino: "广场",
        ejemplo: "Sigue hasta la plaza.",
      },
      {
        id: "v19",
        espanol: "la iglesia",
        chino: "教堂",
        ejemplo: "Gira en la iglesia.",
      },
      {
        id: "v20",
        espanol: "el puente",
        chino: "桥",
        ejemplo: "Cruza el puente.",
      },
    ],
    dialogos: [
      {
        id: "d1",
        titulo: "Preguntando direcciones en la calle",
        tituloChino: "在街上问路",
        personajes: ["Turista", "Local"],
        lineas: [
          {
            personaje: "Turista",
            texto: "Disculpe, ¿dónde está la estación de tren?",
            traduccion: "打扰一下，火车站在哪里？",
          },
          {
            personaje: "Local",
            texto: "Siga recto dos cuadras. En el semáforo, gire a la derecha.",
            traduccion: "直走两个街区。在红绿灯处右转。",
          },
          {
            personaje: "Turista",
            texto: "¿Está lejos?",
            traduccion: "远吗？",
          },
          {
            personaje: "Local",
            texto: "No, está bastante cerca. Unos diez minutos a pie.",
            traduccion: "不，相当近。步行大约十分钟。",
          },
          {
            personaje: "Turista",
            texto: "¿Está en la misma calle?",
            traduccion: "在同一条街上吗？",
          },
          {
            personaje: "Local",
            texto: "Sí, está al final de la calle, en la esquina.",
            traduccion: "是的，在街的尽头，拐角处。",
          },
          {
            personaje: "Turista",
            texto: "Muchas gracias por su ayuda.",
            traduccion: "非常感谢您的帮助。",
          },
        ],
      },
      {
        id: "d2",
        titulo: "Buscando un lugar",
        tituloChino: "找地方",
        personajes: ["Ana", "Carlos"],
        lineas: [
          {
            personaje: "Ana",
            texto: "Carlos, ¿sabes dónde hay un banco por aquí?",
            traduccion: "卡洛斯，你知道这附近哪里有银行吗？",
          },
          {
            personaje: "Carlos",
            texto: "Sí, hay uno cerca. Toma la primera calle a la izquierda.",
            traduccion: "是的，附近有一家。在第一条街左转。",
          },
          {
            personaje: "Ana",
            texto: "¿Y después?",
            traduccion: "然后呢？",
          },
          {
            personaje: "Carlos",
            texto: "Luego sigue recto. El banco está a la derecha, al lado de la farmacia.",
            traduccion: "然后直走。银行在右边，药店旁边。",
          },
          {
            personaje: "Ana",
            texto: "¿Puedo ir andando?",
            traduccion: "我可以步行去吗？",
          },
          {
            personaje: "Carlos",
            texto: "Sí, está a solo cinco minutos.",
            traduccion: "是的，只有五分钟。",
          },
        ],
      },
      {
        id: "d3",
        titulo: "Distancia y tiempo",
        tituloChino: "距离和时间",
        personajes: ["María", "Pedro"],
        lineas: [
          {
            personaje: "María",
            texto: "Pedro, ¿cuánto se tarda en llegar al aeropuerto?",
            traduccion: "佩德罗，去机场需要多长时间？",
          },
          {
            personaje: "Pedro",
            texto: "En coche, unos veinte minutos. En autobús, media hora.",
            traduccion: "开车大约二十分钟。坐公交车半小时。",
          },
          {
            personaje: "María",
            texto: "¿Cómo llego en transporte público?",
            traduccion: "坐公共交通怎么去？",
          },
          {
            personaje: "Pedro",
            texto: "Coge el autobús número 5. La parada está al lado del parque.",
            traduccion: "坐5路公交车。车站在公园旁边。",
          },
          {
            personaje: "María",
            texto: "¿El autobús pasa con frecuencia?",
            traduccion: "公交车频繁吗？",
          },
          {
            personaje: "Pedro",
            texto: "Sí, pasa cada diez minutos.",
            traduccion: "是的，每十分钟一班。",
          },
        ],
      },
      {
        id: "d4",
        titulo: "Dando indicaciones detalladas",
        tituloChino: "给出详细指示",
        personajes: ["Laura", "David"],
        lineas: [
          {
            personaje: "Laura",
            texto: "David, ¿cómo se va al centro comercial?",
            traduccion: "大卫，怎么去购物中心？",
          },
          {
            personaje: "David",
            texto: "Sal del hotel, gira a la izquierda y camina hasta la plaza.",
            traduccion: "出酒店，左转，一直走到广场。",
          },
          {
            personaje: "Laura",
            texto: "¿Y luego?",
            traduccion: "然后呢？",
          },
          {
            personaje: "David",
            texto:
              "En la plaza, verás una fuente. El centro comercial está enfrente, al otro lado de la calle.",
            traduccion: "在广场上，你会看到一个喷泉。购物中心在对面，街的另一边。",
          },
          {
            personaje: "Laura",
            texto: "¿Hay algún punto de referencia?",
            traduccion: "有什么地标吗？",
          },
          {
            personaje: "David",
            texto: "Sí, está al lado de la iglesia. No te lo puedes perder.",
            traduccion: "是的，在教堂旁边。你不会错过的。",
          },
          {
            personaje: "Laura",
            texto: "Gracias por las indicaciones.",
            traduccion: "谢谢你的指示。",
          },
        ],
      },
      {
        id: "d5",
        titulo: "Usando puntos de referencia",
        tituloChino: "使用地标",
        personajes: ["Sofía", "Javier"],
        lineas: [
          {
            personaje: "Sofía",
            texto: "Javier, ¿dónde está la farmacia que te compró las medicinas?",
            traduccion: "哈维尔，给你买药的那个药店在哪里？",
          },
          {
            personaje: "Javier",
            texto: "Está en la calle Mayor, entre el banco y la panadería.",
            traduccion: "在马约尔街，在银行和面包店之间。",
          },
          {
            personaje: "Sofía",
            texto: "¿Hay algún semáforo cerca?",
            traduccion: "附近有红绿灯吗？",
          },
          {
            personaje: "Javier",
            texto: "Sí, en la esquina. La farmacia está justo en la esquina, enfrente del parque.",
            traduccion: "是的，在拐角处。药店正好在拐角处，公园对面。",
          },
          {
            personaje: "Sofía",
            texto: "Perfecto, creo que puedo encontrarla.",
            traduccion: "完美，我想我能找到。",
          },
          {
            personaje: "Javier",
            texto: "Si pasas el puente, te has pasado. Es antes del puente.",
            traduccion: "如果你过了桥，就走过了。在桥之前。",
          },
        ],
      },
    ],
    ejercicios: {
      completar: [
        {
          id: "c1",
          pregunta: "为了问'银行在哪里？'：¿Dónde _____ el banco?",
          preguntaChino: "为了问'银行在哪里？'：¿Dónde _____ el banco?",
          respuestaCorrecta: "está",
          explicacion: "Está = 在",
          pista: "首字母是 e，4个字母",
          numeroLetras: 4,
        },
        {
          id: "c2",
          pregunta: "为了说'直走'：Sigue _____",
          preguntaChino: "为了说'直走'：Sigue _____",
          respuestaCorrecta: "recto",
          explicacion: "Recto = 直",
          pista: "首字母是 r，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c3",
          pregunta: "为了说'左转'：Gira a la _____",
          preguntaChino: "为了说'左转'：Gira a la _____",
          respuestaCorrecta: "izquierda",
          explicacion: "Izquierda = 左边",
          pista: "首字母是 i，9个字母",
          numeroLetras: 9,
        },
        {
          id: "c4",
          pregunta: "为了说'右转'：Gira a la _____",
          preguntaChino: "为了说'右转'：Gira a la _____",
          respuestaCorrecta: "derecha",
          explicacion: "Derecha = 右边",
          pista: "首字母是 d，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c5",
          pregunta: "为了说'在拐角处'：Está en la _____",
          preguntaChino: "为了说'在拐角处'：Está en la _____",
          respuestaCorrecta: "esquina",
          explicacion: "Esquina = 拐角",
          pista: "首字母是 e，7个字母",
          numeroLetras: 7,
        },
        {
          id: "c6",
          pregunta: "为了说'过马路'：_____ la calle",
          preguntaChino: "为了说'过马路'：_____ la calle",
          respuestaCorrecta: "Cruza",
          explicacion: "Cruzar = 穿过",
          pista: "首字母是 C，5个字母",
          numeroLetras: 5,
        },
        {
          id: "c7",
          pregunta: "为了说'在红绿灯处'：en el _____",
          preguntaChino: "为了说'在红绿灯处'：en el _____",
          respuestaCorrecta: "semáforo",
          explicacion: "Semáforo = 红绿灯",
          pista: "首字母是 s，8个字母",
          numeroLetras: 8,
        },
        {
          id: "c8",
          pregunta: "为了问'远吗？'：¿Está _____?",
          preguntaChino: "为了问'远吗？'：¿Está _____?",
          respuestaCorrecta: "lejos",
          explicacion: "Lejos = 远",
          pista: "首字母是 l，5个字母",
          numeroLetras: 5,
        },
      ],
      seleccionar: [
        {
          id: "s1",
          pregunta: "如何问'博物馆在哪里？'",
          preguntaChino: "如何问'博物馆在哪里？'",
          opciones: [
            "¿Dónde está el museo?",
            "¿Cómo llego al museo?",
            "¿Hay un museo?",
            "¿Cuánto cuesta el museo?",
          ],
          respuestaCorrecta: "¿Dónde está el museo?",
          explicacion: "Preguntar ubicación",
        },
        {
          id: "s2",
          pregunta: "如何说'直走两个街区'？",
          preguntaChino: "如何说'直走两个街区'？",
          opciones: ["Gira dos cuadras", "Cruza dos cuadras", "Sigue dos cuadras", "Toma dos cuadras"],
          respuestaCorrecta: "Sigue dos cuadras",
          explicacion: "Sigue = 直走",
        },
        {
          id: "s3",
          pregunta: "'Está a cinco minutos a pie'是什么意思？",
          preguntaChino: "'Está a cinco minutos a pie'是什么意思？",
          opciones: ["开车五分钟", "步行五分钟", "骑车五分钟", "坐车五分钟"],
          respuestaCorrecta: "步行五分钟",
          explicacion: "A pie = 步行",
        },
        {
          id: "s4",
          pregunta: "如何说'在街的尽头'？",
          preguntaChino: "如何说'在街的尽头'？",
          opciones: ["en la esquina", "al final de la calle", "al lado del banco", "detrás del parque"],
          respuestaCorrecta: "al final de la calle",
          explicacion: "Final = 尽头",
        },
        {
          id: "s5",
          pregunta: "如何问'远吗？'",
          preguntaChino: "如何问'远吗？'",
          opciones: ["¿Está cerca?", "¿Está lejos?", "¿Está aquí?", "¿Está allí?"],
          respuestaCorrecta: "¿Está lejos?",
          explicacion: "Lejos = 远",
        },
        {
          id: "s6",
          pregunta: "¿Qué significa 'toma la primera calle'?",
          preguntaChino: "'toma la primera calle'是什么意思？",
          opciones: ["走第一条街", "走第二条街", "左转", "右转"],
          respuestaCorrecta: "走第一条街",
          explicacion: "Primera calle = 第一条街",
        },
        {
          id: "s7",
          pregunta: "¿Cómo se dice '环岛' en español?",
          preguntaChino: "西班牙语中'环岛'怎么说？",
          opciones: ["semáforo", "rotonda", "esquina", "puente"],
          respuestaCorrecta: "rotonda",
          explicacion: "Rotonda / glorieta = 环岛",
        },
        {
          id: "s8",
          pregunta: "¿Qué significa '¿Cuánto se tarda?'?",
          preguntaChino: "'¿Cuánto se tarda?'是什么意思？",
          opciones: ["多少钱", "多远", "需要多长时间", "几点到"],
          respuestaCorrecta: "需要多长时间",
          explicacion: "Preguntar tiempo",
        },
      ],
      verdaderoFalso: [
        {
          id: "vf1",
          pregunta: "'Gira a la izquierda'意思是右转。",
          preguntaChino: "'Gira a la izquierda'意思是右转。",
          respuestaCorrecta: false,
          explicacion: "错。Izquierda = 左边",
        },
        {
          id: "vf2",
          pregunta: "'Sigue recto'意思是直走。",
          preguntaChino: "'Sigue recto'意思是直走。",
          respuestaCorrecta: true,
          explicacion: "对。Recto = 直",
        },
        {
          id: "vf3",
          pregunta: "'Cruza la calle'意思是过马路。",
          preguntaChino: "'Cruza la calle'意思是过马路。",
          respuestaCorrecta: true,
          explicacion: "对。Cruzar = 穿过",
        },
        {
          id: "vf4",
          pregunta: "'La esquina'意思是'街的尽头'。",
          preguntaChino: "'La esquina'意思是'街的尽头'。",
          respuestaCorrecta: false,
          explicacion: "错。Esquina = 拐角",
        },
        {
          id: "vf5",
          pregunta: "'Está lejos'意思是'很近'。",
          preguntaChino: "'Está lejos'意思是'很近'。",
          respuestaCorrecta: false,
          explicacion: "错。Lejos = 远",
        },
        {
          id: "vf6",
          pregunta: "En una rotonda, se toman salidas.",
          preguntaChino: "在环岛中，要选择出口。",
          respuestaCorrecta: true,
          explicacion: "对。Tomar una salida = 选择一个出口",
        },
        {
          id: "vf7",
          pregunta: "'Puedes ir andando' significa que puedes ir a pie.",
          preguntaChino: "'Puedes ir andando'意味着可以步行。",
          respuestaCorrecta: true,
          explicacion: "对。Andando = 步行",
        },
        {
          id: "vf8",
          pregunta: "'La parada de autobús' es donde se coge el tren.",
          preguntaChino: "'La parada de autobús'是坐火车的地方。",
          respuestaCorrecta: false,
          explicacion: "错。Es para autobuses",
        },
      ],
      emparejar: [
        {
          id: "e1",
          pares: [
            {
              izquierda: "sigue recto",
              derecha: "直走",
            },
            {
              izquierda: "gira a la izquierda",
              derecha: "左转",
            },
            {
              izquierda: "gira a la derecha",
              derecha: "右转",
            },
            {
              izquierda: "cruza la calle",
              derecha: "过马路",
            },
            {
              izquierda: "la esquina",
              derecha: "拐角",
            },
            {
              izquierda: "el final de la calle",
              derecha: "街的尽头",
            },
            {
              izquierda: "cerca",
              derecha: "近",
            },
            {
              izquierda: "lejos",
              derecha: "远",
            },
            {
              izquierda: "el semáforo",
              derecha: "红绿灯",
            },
            {
              izquierda: "la rotonda",
              derecha: "环岛",
            },
            {
              izquierda: "la plaza",
              derecha: "广场",
            },
            {
              izquierda: "el puente",
              derecha: "桥",
            },
          ],
          explicacion: "将方向词汇与中文翻译配对。",
        },
      ],
      ordenar: [
        {
          id: "o1",
          palabras: ["está", "museo", "dónde", "el", "¿", "?"],
          respuestaCorrecta: "¿Dónde está el museo?",
          explicacion: "正确的句子是：¿Dónde está el museo?",
        },
        {
          id: "o2",
          palabras: ["recto", "Sigue", "izquierda", "y", "gira", "la", "a", "."],
          respuestaCorrecta: "Sigue recto y gira a la izquierda.",
          explicacion: "正确的句子是：Sigue recto y gira a la izquierda.",
        },
        {
          id: "o3",
          palabras: ["calle", "final", "está", "al", "la", "de", "."],
          respuestaCorrecta: "Está al final de la calle.",
          explicacion: "正确的句子是：Está al final de la calle.",
        },
        {
          id: "o4",
          palabras: ["semáforo", "gira", "el", "en", "derecha", "a", "la", "."],
          respuestaCorrecta: "Gira a la derecha en el semáforo.",
          explicacion: "正确的顺序是：Gira a la derecha en el semáforo.",
        },
        {
          id: "o5",
          palabras: ["minutos", "cinco", "está", "a", "pie", "a", "."],
          respuestaCorrecta: "Está a cinco minutos a pie.",
          explicacion: "正确的顺序是：Está a cinco minutos a pie.",
        },
        {
          id: "o6",
          palabras: ["calle", "del", "está", "El", "final", "supermercado", "la", "al", "."],
          respuestaCorrecta: "El supermercado está al final de la calle.",
          explicacion: "正确的顺序是：El supermercado está al final de la calle.",
        },
      ],
      traducir: [
        {
          id: "t1",
          fraseChino: "直走两个街区。",
          respuestaEsperada: "Sigue dos cuadras.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t2",
          fraseChino: "在红绿灯左转。",
          respuestaEsperada: "Gira a la izquierda en el semáforo.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t3",
          fraseChino: "银行在药店旁边。",
          respuestaEsperada: "El banco está al lado de la farmacia.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t4",
          fraseChino: "步行需要十分钟。",
          respuestaEsperada: "Se tarda diez minutos a pie.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t5",
          fraseChino: "在第二条街右转。",
          respuestaEsperada: "Toma la segunda calle a la derecha.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t6",
          fraseChino: "超市在教堂对面。",
          respuestaEsperada: "El supermercado está enfrente de la iglesia.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t7",
          fraseChino: "穿过广场，你会看到博物馆。",
          respuestaEsperada: "Cruza la plaza y verás el museo.",
          explicacion: "西班牙语翻译",
        },
        {
          id: "t8",
          fraseChino: "在环岛走第二个出口。",
          respuestaEsperada: "En la rotonda, toma la segunda salida.",
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
        instruccion: "用正确的方向词汇完成对话。",
        instruccionChino: "用正确的方向词汇完成对话。",
        dialogo: [
          {
            personaje: "A",
            texto: "Disculpe, ¿dónde _____ el banco?",
            respuesta: "está",
          },
          {
            personaje: "B",
            texto: "Sigue _____ dos cuadras.",
            respuesta: "recto",
          },
          {
            personaje: "A",
            texto: "¿A la izquierda o a la _____?",
            respuesta: "derecha",
          },
          {
            personaje: "B",
            texto: "A la _____, al lado de la farmacia.",
            respuesta: "derecha",
          },
        ],
      },
      {
        id: "ep2",
        tipo: "darDirecciones",
        titulo: "Dar direcciones",
        tituloChino: "指路",
        instruccion: "Escribe las direcciones desde tu casa hasta el lugar más cercano.",
        instruccionChino: "写出从你家到最近的地方的路线。",
        ejemplo:
          "Desde mi casa, sigo recto dos cuadras, giro a la izquierda en el parque y luego a la derecha en el semáforo. La escuela está al final de la calle.",
      },
      {
        id: "ep3",
        tipo: "responder",
        titulo: "Responde las preguntas",
        tituloChino: "回答问题",
        instruccion: "Responde las siguientes preguntas sobre direcciones en español.",
        instruccionChino: "用西班牙语回答以下关于方向的问题。",
        preguntas: [
          {
            pregunta: "¿Cómo se llega desde tu casa a la estación de metro más cercana?",
            respuestaEsperada: "Desde mi casa, sigo recto... giro... está a... minutos.",
          },
          {
            pregunta: "¿Qué hay cerca de tu casa?",
            respuestaEsperada: "Cerca de mi casa hay un supermercado, una farmacia y un parque.",
          },
          {
            pregunta: "¿Está lejos tu escuela o trabajo?",
            respuestaEsperada: "Está a (número) minutos a pie / en coche.",
          },
        ],
      },
      {
        id: "ep4",
        tipo: "mapa",
        titulo: "Dibuja y describe",
        tituloChino: "画图并描述",
        instruccion: "Dibuja un mapa simple de tu barrio y describe cómo llegar de un lugar a otro.",
        instruccionChino: "画一个你社区的简单地图，并描述如何从一个地方到另一个地方。",
        ejemplo:
          "Para ir de la plaza al museo, sigue recto por la calle principal. En el semáforo, gira a la izquierda. El museo está a la derecha, al lado de la biblioteca.",
      },
    ],
    preguntasAbiertas: [
      {
        id: "pa1",
        pregunta: "Describe cómo llegar desde tu casa a la estación de tren/metro más cercana.",
        preguntaChino: "描述从你家怎么去最近的地铁/火车站。",
        sugerencia: "Desde mi casa, sigo recto... luego giro... está a... minutos.",
        sugerenciaChino: "Desde mi casa, sigo recto... luego giro... está a... minutos.",
      },
      {
        id: "pa2",
        pregunta: "¿Qué lugares hay cerca de tu casa?",
        preguntaChino: "你家附近有什么地方？",
        sugerencia: "Cerca de mi casa hay un supermercado, una farmacia y un parque.",
        sugerenciaChino: "Cerca de mi casa hay un supermercado, una farmacia y un parque.",
      },
      {
        id: "pa3",
        pregunta: "Si alguien te pregunta cómo llegar a la escuela, ¿qué le dices?",
        preguntaChino: "如果有人问你如何到学校，你会说什么？",
        sugerencia: "Sigue recto, gira a la derecha y la escuela está al final de la calle.",
        sugerenciaChino: "Sigue recto, gira a la derecha y la escuela está al final de la calle.",
      },
      {
        id: "pa4",
        pregunta: "¿Qué punto de referencia usas para dar direcciones en tu ciudad?",
        preguntaChino: "你在你的城市用什么地标来指路？",
        sugerencia: "Uso la plaza, la iglesia, el parque o el supermercado como referencia.",
        sugerenciaChino: "Uso la plaza, la iglesia, el parque o el supermercado como referencia.",
      },
      {
        id: "pa5",
        pregunta: "¿Prefieres preguntar direcciones o usar el móvil? ¿Por qué?",
        preguntaChino: "你更喜欢问路还是用手机？为什么？",
        sugerencia: "Prefiero usar el móvil porque es más rápido, pero a veces pregunto si no tengo batería.",
        sugerenciaChino:
          "Prefiero usar el móvil porque es más rápido, pero a veces pregunto si no tengo batería.",
      },
    ],
    preguntas: [
      {
        id: "p1",
        pregunta: "¿Cómo se dice '银行在哪里？' en español?",
        preguntaChino: "西班牙语中'银行在哪里？'怎么说？",
        respuestaSugerida: "¿Dónde está el banco?",
        respuestaSugeridaChino: "¿Dónde está el banco?",
      },
      {
        id: "p2",
        pregunta: "¿Cómo se dice '左转' en español?",
        preguntaChino: "西班牙语中'左转'怎么说？",
        respuestaSugerida: "gira a la izquierda",
        respuestaSugeridaChino: "gira a la izquierda",
      },
      {
        id: "p3",
        pregunta: "¿Qué significa 'Está a cinco minutos a pie'?",
        preguntaChino: "'Está a cinco minutos a pie'是什么意思？",
        respuestaSugerida: "步行五分钟",
        respuestaSugeridaChino: "It's a five-minute walk.",
      },
      {
        id: "p4",
        pregunta: "¿Cómo preguntas '远吗？' en español?",
        preguntaChino: "西班牙语中'远吗？'怎么问？",
        respuestaSugerida: "¿Está lejos?",
        respuestaSugeridaChino: "¿Está lejos?",
      },
      {
        id: "p5",
        pregunta: "¿Qué significa 'toma la primera calle'?",
        preguntaChino: "'toma la primera calle'是什么意思？",
        respuestaSugerida: "走第一条街",
        respuestaSugeridaChino: "Take the first street",
      },
      {
        id: "p6",
        pregunta: "¿Cómo se dice '环岛' en español?",
        preguntaChino: "西班牙语中'环岛'怎么说？",
        respuestaSugerida: "rotonda / glorieta",
        respuestaSugeridaChino: "rotonda / glorieta",
      },
    ],
  },
];
const modulos21to40Module = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      default: MODULOS_21_40,
    },
    Symbol.toStringTag,
    {
      value: "Module",
    },
  ),
);
export { MODULOS_21_40, modulos21to40Module };
