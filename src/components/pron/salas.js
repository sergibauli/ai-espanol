// Salas del templo de los sonidos: cada familia de sílabas vive en una sala según dónde se articula.
// Cada sala tiene su forma de tarjeta (abanico, bambú, tambor, campana, montaña, linterna), su color y su escena.
export const SALAS = [
  {
    id: "labios",
    es: "Puerta de los labios",
    zh: "唇之门",
    rasgo: "Los labios",
    rasgoZh: "唇音",
    pista: "Junta o acerca los labios y suelta el aire de golpe.",
    pistaZh: "双唇闭合或靠近，再把气流一下子放出。",
    familias: ["b", "p", "v", "f"],
    color: "#c8102e",
    tinta: "#5e0614",
    sello: "唇",
  },
  {
    id: "bambu",
    es: "Pabellón de bambú",
    zh: "竹之亭",
    rasgo: "Lengua y dientes",
    rasgoZh: "舌尖与牙齿",
    pista: "Apoya la punta de la lengua detrás de los dientes de arriba.",
    pistaZh: "舌尖抵住上齿背，气流从舌尖送出。",
    familias: ["t", "d", "s", "z", "ce-ci-z", "ch"],
    color: "#3d7a4a",
    tinta: "#14361d",
    sello: "齿",
  },
  {
    id: "trueno",
    es: "Tambor del trueno",
    zh: "雷鼓",
    rasgo: "La lengua vibra",
    rasgoZh: "舌尖颤动",
    pista: "La punta de la lengua golpea el paladar: una vez (r) o muchas veces (rr).",
    pistaZh: "舌尖轻弹上颚：r 弹一次，rr 连续颤动。",
    familias: ["r-suave", "rr"],
    color: "#a3122a",
    tinta: "#3d0610",
    sello: "雷",
  },
  {
    id: "campana",
    es: "Campana de jade",
    zh: "玉钟",
    rasgo: "Suena la nariz",
    rasgoZh: "鼻音",
    pista: "Cierra la boca o apoya la lengua y deja que la voz suene por la nariz.",
    pistaZh: "闭口或舌抵上颚，让声音从鼻腔共鸣。",
    familias: ["m", "n", "ñ"],
    color: "#1f7a72",
    tinta: "#0b3531",
    sello: "鼻",
  },
  {
    id: "montana",
    es: "Montaña de la garganta",
    zh: "喉之山",
    rasgo: "El fondo de la boca",
    rasgoZh: "舌根音",
    pista: "Levanta la parte de atrás de la lengua hacia el fondo del paladar.",
    pistaZh: "舌根抬起，靠近软腭。",
    familias: ["c-qu", "g-gu", "ge-gi-j", "x"],
    color: "#34406b",
    tinta: "#151b33",
    sello: "喉",
  },
  {
    id: "linterna",
    es: "Linterna del paladar",
    zh: "腭之灯",
    rasgo: "La lengua roza el paladar",
    rasgoZh: "舌面贴上颚",
    pista: "Apoya la lengua en el paladar y deja pasar el aire por los lados.",
    pistaZh: "舌头贴住上颚，让气流从两侧通过。",
    familias: ["l", "ll-y", "h"],
    color: "#c8961e",
    tinta: "#5a3d08",
    sello: "腭",
  },
];

const POR_FAMILIA = new Map(SALAS.flatMap((sala) => sala.familias.map((id) => [id, sala])));

export const salaDeFamilia = (id) => POR_FAMILIA.get(id) || SALAS[SALAS.length - 1];

// Sala de una sílaba suelta (Templo de las Sílabas): por su consonante inicial
export function salaDeSilaba(silaba) {
  const s = String(silaba || "").toLowerCase();
  const id = (() => {
    if (s.startsWith("ch")) return "bambu";
    if (s.startsWith("ll") || s.startsWith("y") || s.startsWith("l") || s.startsWith("h")) return "linterna";
    if (s.startsWith("r")) return "trueno";
    if (/^(qu|c[aou]|g|j|x)/.test(s)) return "montana";
    if (/^(c[ei]|z|s|t|d)/.test(s)) return "bambu";
    if (/^[mnñ]/.test(s)) return "campana";
    return "labios";
  })();
  return SALAS.find((sala) => sala.id === id);
}

// Duración aproximada de un audio para animar la onda mientras suena (speak no avisa al terminar)
export const duracionVoz = (texto, velocidad = 0.85) => Math.min(9000, (550 + String(texto || "").length * 80) / Math.max(velocidad, 0.5));

export const reducido = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
