// Sección TV · 电视: series propias con episodios cortos. Para añadir un episodio: copia el MP4 (H.264, <100 MB, con
// -movflags +faststart) y su póster JPG a public/tv/<serie>/ y añade una entrada a `episodios`.
export const SERIES = [
  {
    id: "rey-mono",
    titulo: "El Rey Mono y el Dragón Dorado",
    tituloZh: "美猴王与金龙",
    sinopsis: "El Rey Mono conoce a un dragón dorado entre las nubes y juntos buscan las piedras de luz que abren una puerta sellada.",
    sinopsisZh: "美猴王在云海中遇见金龙，一起寻找能打开封印之门的光之石。",
    episodios: [
      {
        n: 1,
        titulo: "El encuentro",
        tituloZh: "相遇",
        video: "./tv/rey-mono/ep1.mp4",
        poster: "./tv/rey-mono/ep1.jpg",
        duracion: "0:30",
        resumen: "Sobre el mar de nubes, el Rey Mono saluda a un dragón dorado. Se presentan y deciden viajar juntos a la montaña secreta.",
        resumenZh: "在云海之上，美猴王向金龙问好。他们互相介绍，决定一起去神秘的山。",
        frases: [
          { es: "¡Hola, dragón dorado! ¿De dónde eres?", zh: "你好，金龙！你来自哪里？" },
          { es: "Vengo del alto mar de nubes.", zh: "我来自高高的云海。" },
          { es: "¿Podemos aprender español juntos?", zh: "我们可以一起学西班牙语吗？" },
          { es: "¡Genial! Vamos juntos.", zh: "太棒了！我们一起去。" },
        ],
      },
      {
        n: 2,
        titulo: "La puerta sellada",
        tituloZh: "封印之门",
        video: "./tv/rey-mono/ep2.mp4",
        poster: "./tv/rey-mono/ep2.jpg",
        duracion: "0:30",
        resumen: "Una gran puerta dorada tiene un sello. Para abrirla necesitan las piedras que brillan: la primera está en una cueva oscura.",
        resumenZh: "一扇金色大门上有封印。要打开它，需要发光的石头：第一块在黑暗的山洞里。",
        frases: [
          { es: "Mira, hay un sello en la puerta.", zh: "看，门上有一个封印。" },
          { es: "Vamos a buscar las piedras que brillan.", zh: "我们去找发光石。" },
          { es: "¿Dónde está la piedra?", zh: "石头在哪里？" },
          { es: "¡La tengo! Es la primera.", zh: "我拿到了！这是第一块。" },
        ],
      },
      {
        n: 3,
        titulo: "Las piedras de luz",
        tituloZh: "光之石",
        video: "./tv/rey-mono/ep3.mp4",
        poster: "./tv/rey-mono/ep3.jpg",
        duracion: "0:43",
        resumen: "Siguen la luz hasta la segunda piedra, protegida por un hechizo. En el templo brilla la tercera… pero aparece un guardián.",
        resumenZh: "他们跟着光找到第二块被咒语保护的石头。神庙里第三块在发光……可是出现了一个守卫。",
        frases: [
          { es: "Sigue la luz.", zh: "跟着光芒走。" },
          { es: "¡Cuidado! Hay un hechizo.", zh: "小心！有咒语。" },
          { es: "¡La tengo! Ahora tenemos dos.", zh: "我拿到了！现在我们有两块。" },
          { es: "¡Alto! ¡Un guardián!", zh: "停下。一个守卫！" },
        ],
      },
    ],
    proximamente: { es: "Episodio 4 · Próximamente", zh: "第4集 · 即将推出" },
  },
];
