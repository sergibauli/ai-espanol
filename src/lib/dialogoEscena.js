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

// Personajes ilustrados (public/dialogo/pj-<id>.webp, 1200 px de alto). Medidas en % de su imagen:
// cara = centro x entre los ojos, cabeza = alto de la cabeza (pelo a barbilla), ojos, boca y mandíbula (bajada máxima).
// mira: hacia dónde gesticula en la imagen ("izq" o "frente"); el escenario los voltea para que miren al centro.
export const PERSONAJES = {
  vendedor: {"w": 676, "cara": 62.2, "cabeza": 17.92, "mira": "izq", "ojos": [{"x": 57.99, "y": 10.0, "piel": "#feb792"}, {"x": 66.42, "y": 10.0, "piel": "#fcbb93"}], "ojo": [2.96, 1.44], "boca": {"x": 62.28, "y": 14.58, "w": 8.88, "labio": "#83332f", "mandibula": 1.0}, "mujer": false},
  chico: {"w": 566, "cara": 58.75, "cabeza": 16.67, "mira": "izq", "ojos": [{"x": 53.18, "y": 11.17, "piel": "#feb98e"}, {"x": 64.31, "y": 11.17, "piel": "#fdb48c"}], "ojo": [4.2, 1.72], "boca": {"x": 58.3, "y": 15.75, "w": 10.95, "labio": "#8a3a32", "mandibula": 1.03}, "mujer": false},
  senor: {"w": 569, "cara": 56.5, "cabeza": 16.42, "mira": "izq", "ojos": [{"x": 51.67, "y": 9.58, "piel": "#fdb988"}, {"x": 61.34, "y": 9.58, "piel": "#febb8d"}], "ojo": [3.51, 1.25], "boca": {"x": 56.59, "y": 13.75, "w": 9.67, "labio": "#8a3a32", "mandibula": 0.92}, "mujer": false},
  rosa: {"w": 690, "cara": 58.19, "cabeza": 28.17, "mira": "frente", "ojos": [{"x": 51.16, "y": 16.92, "piel": "#fec5b2"}, {"x": 65.22, "y": 18.5, "piel": "#fdc2af"}], "ojo": [6.88, 2.68], "boca": {"x": 56.09, "y": 24.67, "w": 9.28, "labio": "#df675b", "mandibula": 1.07}, "mujer": true},
  azul: {"w": 694, "cara": 50.65, "cabeza": 33.83, "mira": "frente", "ojos": [{"x": 42.36, "y": 21.5, "piel": "#fec9ab"}, {"x": 58.93, "y": 21.5, "piel": "#fecfb1"}], "ojo": [9.01, 2.88], "boca": {"x": 51.01, "y": 29.08, "w": 12.25, "labio": "#f08f7b", "mandibula": 1.42}, "mujer": true},
  senora: {"w": 403, "cara": 50.62, "cabeza": 15.42, "mira": "frente", "ojos": [{"x": 43.42, "y": 9.17, "piel": "#fccea8"}, {"x": 57.82, "y": 9.17, "piel": "#fecfad"}], "ojo": [4.96, 1.05], "boca": {"x": 50.87, "y": 13.42, "w": 10.42, "labio": "#cd3b39", "mandibula": 0.7}, "mujer": true},
  dependienta: {"w": 833, "cara": 60.92, "cabeza": 24.33, "mira": "izq", "ojos": [{"x": 54.86, "y": 16.0, "piel": "#fed6b5"}, {"x": 66.99, "y": 16.0, "piel": "#fed1b1"}], "ojo": [5.4, 2.11], "boca": {"x": 61.34, "y": 22.58, "w": 7.56, "labio": "#e6574d", "mandibula": 1.05}, "mujer": true},
  maestro: {"w": 447, "cara": 51.45, "cabeza": 12.67, "mira": "frente", "ojos": [{"x": 46.31, "y": 7.58, "piel": "#eba575"}, {"x": 56.6, "y": 7.58, "piel": "#efa77b"}], "ojo": [3.91, 0.77], "boca": {"x": 51.45, "y": 11.75, "w": 7.83, "labio": "#d08a72", "mandibula": 0.58}, "mujer": false},
  estudiante: {"w": 606, "cara": 48.84, "cabeza": 24.58, "mira": "izq", "ojos": [{"x": 41.25, "y": 14.92, "piel": "#fdbf92"}, {"x": 56.44, "y": 13.92, "piel": "#feb58a"}], "ojo": [7.43, 2.4], "boca": {"x": 49.34, "y": 20.67, "w": 9.57, "labio": "#f38a66", "mandibula": 0.97}, "mujer": false},
};

// Papel según el nombre del personaje en el diálogo (orden = preferencia)
const PAPELES = [
  [/vended|fruter|camarer|cociner|dependiente\b|tender|panader|carnicer|empleado|taxista|conductor|mec[aá]nico|zapater/i, ["vendedor", "chico"]],
  [/profesor\b|maestro|abuelo|anciano|m[eé]dico|doctor\b|farmac[eé]utico|dentista|^don\b/i, ["maestro", "senor"]],
  [/jefe|director\b|señor|^sr\.?|padre|anfitri|gerente|entrevistador|agente|polic[ií]a|cliente\b|recepcionista\b|banquero|cajero\b/i, ["senor", "vendedor"]],
  [/estudiante|alumn|hijo|niño|chico|compañero/i, ["estudiante", "chico"]],
  [/dependienta|vendedora|recepcionista|camarera|azafata|secretaria|enfermera|cajera|farmac[eé]utica|doctora|m[eé]dica|profesora|gu[ií]a|empleada|jefa|directora/i, ["dependienta", "senora"]],
  [/señora|^sra\.?|madre|clienta|abuela|doña|mujer/i, ["senora", "dependienta"]],
  [/estudiante|alumna|hija|niña|chica|compañera/i, ["azul", "rosa"]],
];
// Personajes genéricos (se rotan según el nombre) y, al final, los de oficio como último recurso
const HOMBRES = [["chico", "estudiante", "senor"], ["vendedor", "maestro"]];
const MUJERES = [["rosa", "azul"], ["senora", "dependienta"]];

function hash(s) {
  let h = 2166136261;
  for (const ch of String(s)) h = Math.imul(h ^ ch.codePointAt(0), 16777619) >>> 0;
  return h;
}

/** Asigna a cada nombre un personaje distinto, según su papel y su género (voz). */
export function repartoDe(nombres, esMujer) {
  const usados = new Set();
  return nombres.map((nombre) => {
    const mujer = esMujer(nombre);
    const [base, oficio] = mujer ? MUJERES : HOMBRES;
    const giro = hash(nombre) % base.length;
    const generico = [...base.slice(giro), ...base.slice(0, giro), ...oficio];
    const papel = (PAPELES.find(([re, ids]) => re.test(nombre) && PERSONAJES[ids[0]].mujer === mujer) || [null, []])[1];
    const id = [...papel, ...generico].find((x) => !usados.has(x)) || generico[0];
    usados.add(id);
    return { nombre, id, img: `pj-${id}`, ...PERSONAJES[id] };
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
