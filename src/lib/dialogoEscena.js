// Escenario de diálogos: fondos ilustrados, reparto de personajes y sincronía labial.
// Imágenes en public/dialogo/ (generadas con Doubao, recortadas con scratch scripts: fondo transparente y sin marca de agua).

const TEMAS = [
  ["botica", /m[ée]dic|farmacia|hospital|urgencia|dolor|salud|consulta|enferm|muelas|te pasa/i],
  ["viaje", /estaci[oó]n|aeropuerto|tren|avi[oó]n|viaje|hotel|maleta|equipaje|embarque|aduana|transporte|check|vacaciones|facturaci|destino/i],
  ["fonda", /caf[eé]|restaurante|comida|comer|cuenta$|mesa|cocina|vegetariano|men[uú]|cena|desayun/i],
  ["mercado", /tienda|mercado|supermercado|ropa|compr|fruter|zapat|rebaja|librer|precio|cuestan|regalo|probándose|muebles/i],
  ["academia", /clase|escuela|universidad|profesor|verbo|deberes|notas|beca|material|idioma|conjug|biblioteca/i],
  ["despacho", /oficina|trabajo|reuni[oó]n|entrevista|negocio|banco|cajero|transferencia|tarjeta|dinero|laboral|conferencia/i],
  ["fiesta", /fiesta|cumplea|concierto|festival|cine|pel[ií]cula|celebr|aniversario|m[uú]sica|premio/i],
  ["calle", /calle|direcci|indicaci|llegar|ciudad|barrio|museo|lugar|ubicaci|distancia|hutong|referencia|paseo/i],
  ["hogar", /casa|vecin|piso|habitaci|mudanza|familia|vivienda|ma[ñn]ana|dormir|rutina|madre|hijo/i],
];

export function temaDeDialogo(titulo = "", textos = "") {
  for (const [tema, re] of TEMAS) if (re.test(titulo)) return tema;
  for (const [tema, re] of TEMAS) if (re.test(textos)) return tema;
  return "calle";
}

// Fondos disponibles; los temas sin fondo propio usan la calle de los farolillos.
// suelo: altura (en % del escenario, desde abajo) a la que pisan los personajes.
const FONDOS = {
  calle: { img: "fondo-calle", es: "La calle de los farolillos", zh: "灯笼街", suelo: 12 },
  botica: { img: "fondo-botica", es: "La botica", zh: "药铺", suelo: 22 },
};
export const fondoDe = (tema) => FONDOS[tema] || FONDOS.calle;

// Personajes. Medidas en % de su imagen (1200 px de alto): ojos, boca, cara (centro x) y alto de la cabeza.
// mira: hacia dónde gesticula en la imagen original ("izq", "der" o "frente"); el escenario los voltea para que miren al centro.
export const PERSONAJES = {
  joven: {
    mujer: false, w: 624, cara: 65.2, cabeza: 13.8, mira: "izq",
    ojos: [{ x: 61.7, y: 8.08, piel: "#cf9871" }, { x: 68.59, y: 8.0, piel: "#f6be99" }], ojo: [3.4, 0.9],
    boca: { x: 65.22, y: 11.83, w: 5.6, labio: "#9b4c36", mandibula: 0.55 },
  },
  chica: {
    mujer: true, w: 543, cara: 54.3, cabeza: 18.8, mira: "der",
    ojos: [{ x: 46.41, y: 10.33, piel: "#e79277" }, { x: 60.04, y: 10.33, piel: "#fdbf9b" }], ojo: [5.6, 1.55],
    boca: { x: 54.33, y: 15.75, w: 7.4, labio: "#a5362c", mandibula: 0.75 },
  },
  dama: {
    mujer: true, w: 436, cara: 50.9, cabeza: 16.8, mira: "frente",
    ojos: [{ x: 44.04, y: 9.75, piel: "#c4896c" }, { x: 57.34, y: 9.67, piel: "#f7b28b" }], ojo: [5.1, 1.05],
    boca: { x: 50.92, y: 14.67, w: 7.8, labio: "#942b21", mandibula: 0.65 },
  },
};

const MAYOR = /^(abuel|señor|sra?\.|don |doña|anciano|director|jef|profesor|doctor|médico|madre|padre|recepcionista|dependienta|vendedora|farmac|enfermera|camarera|clienta|secretaria)/i;

/** Asigna a cada nombre un personaje (mujer joven, mujer adulta, hombre) y una variante de color si se repite. */
export function repartoDe(nombres, esMujer) {
  const usados = {};
  return nombres.map((nombre) => {
    let id = esMujer(nombre) ? (MAYOR.test(nombre) ? "dama" : "chica") : "joven";
    // Dos mujeres: una joven y una adulta antes que repetir
    if (id !== "joven" && usados[id] && !usados[id === "dama" ? "chica" : "dama"]) id = id === "dama" ? "chica" : "dama";
    const n = (usados[id] = (usados[id] || 0) + 1);
    return { nombre, id, img: `pj-${id}${n % 2 === 0 ? "b" : ""}`, ...PERSONAJES[id] };
  });
}

/** Apertura de la boca (0–1) y redondez para cada letra de la frase. */
export function visemas(es = "") {
  const t = es.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const out = [];
  for (const ch of t) {
    if (ch === "a") out.push([1, 0]);
    else if (ch === "e" || ch === "i") out.push([0.55, 0]);
    else if (ch === "o" || ch === "u") out.push([0.7, 1]);
    else if ("mbpv".includes(ch)) out.push([0, 0]);
    else if (/[.,;:!?]/.test(ch)) out.push([0, 0], [0, 0]);
    else if (/[a-zñ ]/.test(ch)) out.push([0.3, 0]);
  }
  return out.length ? out : [[0, 0]];
}
