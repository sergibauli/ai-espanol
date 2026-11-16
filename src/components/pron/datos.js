// Datos unificados de Pronunciación: familias (pronunciacion.json) + material del antiguo Templo de las Sílabas
import BASE from "../../data/pronunciacion.json";
// Del Templo de las Sílabas (370 KB) solo se incluyen de entrada las sílabas que forman familias; el resto del material
// (más palabras, frases y textos) llega con cargarSilabas() en cuanto la página está en reposo o se abre una familia.
import SILABAS_BASE from "virtual:silabas-templo?solo=ge,gi,ha,he,hi,ho,hu";

let SILABAS = SILABAS_BASE;
let carga = null;
export const silabasCargadas = () => SILABAS !== SILABAS_BASE;
export function cargarSilabas() {
  carga ??= import("../../data/silabas-templo.js")
    .then((m) => {
      SILABAS = m.default;
      return true;
    })
    .catch(() => {
      carga = null;
      return false;
    });
  return carga;
}

// «bajo/矮» → «矮»
export const traduccion = (texto) => (texto && texto.includes("/") ? texto.split("/")[1] : texto || "");

// Sílaba que solo existía en el templo → mismo formato que las de pronunciacion.json
function silabaDelTemplo(s) {
  const t = SILABAS[s];
  const [ej, zh] = t.palabras[0] || [s, s];
  return {
    s,
    ej,
    ejZh: traduccion(zh),
    palabras: t.palabras.slice(1, 7).map(([es, z]) => ({ es, zh: traduccion(z) })),
    frases: t.frases.slice(0, 2).map((f) => ({ es: f.es, zh: f.ch })),
  };
}

const EXTRA_GGJ = ["ge", "gi"].filter((s) => SILABAS[s]).map(silabaDelTemplo);
const FAMILIA_H = {
  id: "h",
  titulo: "H muda",
  tituloZh: "不发音的h",
  dificil: true,
  pista: "La h no suena nunca: lee solo la vocal (hola se dice «ola»).",
  consejoZh: "西班牙语的h不发音：hola读作“ola”。只读后面的元音。",
  silabas: ["ha", "he", "hi", "ho", "hu"].filter((s) => SILABAS[s]).map(silabaDelTemplo),
};

export const FAMILIAS = [...BASE.map((f) => (f.id === "ge-gi-j" ? { ...f, silabas: [...EXTRA_GGJ, ...f.silabas] } : f)), FAMILIA_H];

// Todo el material de una sílaba: palabras, frases y textos (sin repetir)
export function materialDe(silaba) {
  const t = SILABAS[silaba.s];
  const unicos = (lista) => {
    const vistos = new Set();
    return lista.filter((x) => {
      const k = x.es.toLowerCase();
      if (vistos.has(k)) return false;
      vistos.add(k);
      return true;
    });
  };
  return {
    palabras: unicos([{ es: silaba.ej, zh: silaba.ejZh }, ...(silaba.palabras || []), ...(t?.palabras || []).map(([es, zh]) => ({ es, zh: traduccion(zh) }))]),
    frases: unicos([...(silaba.frases || []), ...(t?.frases || []).map((f) => ({ es: f.es, zh: f.ch }))]),
    textos: (t?.textos || []).map((x) => ({ es: x.es, zh: x.ch })),
  };
}
