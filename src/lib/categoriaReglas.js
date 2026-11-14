// Categoría gramatical de una palabra del vocabulario (para el mapa mental · 思维导图):
//   "verbo" (动词) · "sust" (名词) · "adj" (形容词) · "expr" (表达 · 短语: fórmulas, frases hechas,
//   adverbios, preposiciones, pronombres y conectores).
// Quien la usa consulta antes la tabla de excepciones revisada a mano (src/data/categorias-palabras.json,
// generada por scripts/build-categorias.mjs, ver `categoriaPalabra` en MapaMentalPage.jsx); si la palabra no
// está, se aplican estas reglas, de más a menos fiables (sin dependencias: también las usa el script en Node):
//   1) puntuación de frase (¿? ¡!) y fórmulas conocidas → expr
//   2) números → sust · formas verbales conjugadas conocidas o con pista china (我… / …了) → verbo
//   3) frases de varias palabras: artículo + nombre → sust; empieza por infinitivo o palabra
//      gramatical → expr; «nombre + adjetivo / de + nombre» → sust
//   4) una palabra: palabras gramaticales y -mente → expr; infinitivo (-ar/-er/-ir, sin tilde salvo -ír,
//      con pronombre enclítico) → verbo; traducción con 的, colores, gentilicios, sufijos de adjetivo
//      y lista de adjetivos frecuentes → adj; el resto → sust.
export const CATEGORIAS_PALABRA = ["verbo", "sust", "adj", "expr"];

/** Clave de una entrada de vocabulario en la tabla de excepciones: «español|chino» («bajo|贝斯» ≠ «bajo|矮的») */
export const claveCategoria = (v) =>
  `${String(v?.espanol ?? v?.es ?? "").toLowerCase().replace(/\s+/g, " ").trim()}|${String(v?.chino ?? v?.zh ?? "").replace(/\s+/g, " ").trim()}`;

const lista = (s) => new Set(s.split(/\s+/).filter(Boolean));

// Fórmulas sociales de una o pocas palabras
const FORMULAS = lista(`hola adiós adios chao chau gracias perdón perdon encantado encantada encantados bienvenido bienvenida bienvenidos
  vale salud disculpe disculpa perdone oiga oye felicidades enhorabuena atentamente cordialmente saludos ojalá igualmente
  quizás quizá tal genial claro venga anda vaya perdona`);
const FORMULAS_FRASE = new Set(["un saludo", "un abrazo", "un beso", "un fuerte abrazo", "un placer", "un momento", "de nada", "por favor", "lo siento", "mucho gusto"]);

// Palabras gramaticales: si una frase empieza por ellas, es una expresión; solas, también
const GRAMATICALES = lista(`a al ante bajo con contra de del desde durante en entre hacia hasta mediante para por según sin sobre tras
  y e o u ni pero sino que si porque como cuando donde mientras aunque pues entonces luego así además incluso
  yo tú tu él ella usted nosotros nosotras vosotros vosotras ellos ellas ustedes me te se le les lo la los las nos os mí ti conmigo contigo
  mi mis su sus nuestro nuestra vuestro vuestra este esta esto estos estas ese esa eso esos esas aquel aquella aquello
  qué cómo cuándo dónde cuál cuáles quién quiénes cuánto cuánta cuántos cuántas adónde
  muy más menos tan tanto mucho mucha muchos muchas poco poca pocos pocas bastante demasiado algo nada todo toda todos todas cada otro otra otros otras
  ya aún todavía siempre nunca jamás también tampoco sí no
  aquí ahí allí allá acá cerca lejos dentro fuera encima debajo delante detrás enfrente arriba abajo recto derecha izquierda
  hoy ayer anteayer anoche mañana pronto tarde temprano antes después ahora luego enseguida
  bien mal regular mejor peor solo sólo casi apenas quizás quizá acaso
  buen buena buenos buenas feliz mil hasta nos tal unos unas algún alguna algunos algunas ningún ninguna cierto cierta total`);
// Estas, solas, no son «expresión» aunque sean gramaticales en otra posición
const SOLAS_NO_GRAMATICALES = new Map([
  ["mañana", "sust"],
  ["tarde", "sust"],
  ["derecha", "sust"],
  ["izquierda", "sust"],
  ["regular", "adj"],
  ["mejor", "adj"],
  ["peor", "adj"],
  ["feliz", "adj"],
  ["buena", "adj"],
  ["bajo", "adj"],
]);

const NUMEROS = lista(`cero uno una un dos tres cuatro cinco seis siete ocho nueve diez once doce trece catorce quince dieciséis diecisiete
  dieciocho diecinueve veinte veintiuno veintiuna veintidós veintitrés veinticuatro veinticinco veintiséis veintisiete veintiocho veintinueve
  treinta cuarenta cincuenta sesenta setenta ochenta noventa cien ciento doscientos trescientos cuatrocientos quinientos seiscientos
  setecientos ochocientos novecientos mil millón millones`);

// Formas verbales conjugadas frecuentes (las que el vocabulario de gramática presenta sueltas)
const CONJUGADAS = lista(`soy eres es somos sois son estoy estás está estamos estáis están tengo tienes tiene tenemos tenéis tienen
  voy vas va vamos vais van hay he has ha hemos habéis han había habías habíamos habían hubo hubiera
  fui fuiste fue fuimos fuisteis fueron era eras éramos eran iba ibas íbamos iban
  tuve tuviste tuvo tuvimos tuvieron hice hiciste hizo hicimos hicieron dije dijiste dijo dijeron vi viste vio vimos vieron
  puse pusiste puso pude pudo quise quiso vine estuve estuvo supe supo dio dimos dieron trajo conduje
  haré harás hará tendré tendrás tendrá saldré saldrás saldrá podré podrás podrá diré dirás dirá querré sabré pondré vendré valdré
  seré será sería serías tendría haría podría diría querría habría iría vendría saldría pondría sabría gustaría encantaría debería
  quisiera quisieras hiciera tuviera fuera fueras estuviera pudiera dijera viviera hablara comiera
  sea seas seamos sean esté estés estemos estén tenga tengas haga hagas vaya vayas diga digas pueda puedas quiera quieras sepa
  quiero quieres quiere queremos puedo puedes puede podemos pueden vivo vives vive vivimos viven hago haces hace hacemos hacen
  digo dices dice sé sabes sabe salgo sales sale pongo pones pone vengo vienes viene oigo oyes oye conozco conoces conoce
    hablo hablas habla hablamos habláis hablan como comes come comemos coméis comen`);
// Imperativos sueltos («¡Di!», «¡Ven!»): solo cuentan entre signos de exclamación (sal, ve, di… son también otras palabras)
const IMPERATIVOS = lista(`di haz pon sal ten ven ve sé dime dame mira escucha habla come bebe abre cierra lee escribe`);
const ORDINALES = lista(`primero primera segundo segunda tercero tercera cuarto cuarta quinto quinta sexto sexta séptimo séptima octavo octava
  noveno novena décimo décima undécimo undécima duodécimo duodécima primer tercer`);

const PAISES = /^(中国|日本|韩国|西班牙|法国|德国|英国|美国|意大利|葡萄牙|俄罗斯|墨西哥|加拿大|阿根廷|秘鲁|哥伦比亚|巴西|智利|古巴|委内瑞拉|厄瓜多尔|玻利维亚|乌拉圭|巴拉圭|哥斯达黎加|巴拿马|多米尼加|波多黎各|洪都拉斯|危地马拉|萨尔瓦多|尼加拉瓜|摩洛哥|印度|埃及|澳大利亚|荷兰|比利时|瑞士|瑞典|挪威|丹麦|希腊|爱尔兰|波兰|土耳其|越南|泰国|菲律宾)人$/;
const COLORES = lista(`rojo roja azul verde amarillo amarilla blanco blanca negro negra gris marrón rosa rosado rosada morado morada
  violeta celeste beige dorado dorada plateado plateada naranja anaranjado claro clara oscuro oscura`);

// Adjetivos frecuentes cuya traducción no siempre lleva 的
const ADJETIVOS = lista(`alto alta bajo baja gordo gorda delgado delgada grande pequeño pequeña joven viejo vieja mayor menor
  bonito feo guapo guapa simpático simpática antipático antipática inteligente tonto amable alegre triste contento contenta
  cansado cansada enfermo enferma aburrido aburrida divertido divertida nervioso nerviosa tranquilo tranquila preocupado preocupada
  enfadado enfadada sorprendido sorprendida orgulloso orgullosa celoso celosa tímido tímida trabajador trabajadora perezoso perezosa
  serio seria gracioso graciosa generoso generosa egoísta optimista pesimista sincero sincera honesto honesta educado educada
  caro barato barata nuevo nueva antiguo antigua moderno moderna limpio limpia sucio sucia rápido rápida lento lenta
  fácil difícil importante interesante necesario necesaria posible imposible probable seguro segura libre ocupado ocupada
  caliente fresco fresca rico rica sabroso sabrosa delicioso deliciosa dulce salado salada picante amargo
  largo larga corto corta ancho estrecho rubio rubia moreno morena pelirrojo calvo liso rizado
  óptimo pésimo máximo mínimo mejor peor superior inferior sano sana fuerte débil feliz infeliz
  ecológico sostenible actual típico típica tradicional popular famoso famosa`);
const SUFIJO_ADJ = /(ble|bles|ivo|ivos|ístico)$/;
const SUFIJO_SUST = /(ción|sión|dad|tad|tud|umbre|aje|ismo|miento|ncia|eza|ura|ería|ista|ero|era|ario|aria|or|ora|ores|oras|ción)$/;

// No son infinitivos aunque acaben en -ar/-er/-ir
const NO_VERBOS = lista(`mujer lugar mar bar hogar collar placer taller alquiler ayer anteayer militar familiar altar pilar par nivel
  azar lunar billar dólar amanecer atardecer anochecer menester cráter alfiler elixir primer tercer`);
const AR_ADJ = lista(`popular regular similar particular escolar solar peculiar celular muscular polar singular vulgar nuclear estelar
  rectangular circular`);

const PRONOMBRE_ZH = /^(我|你|您|他|她|它|我们|你们|他们|她们|咱们)(?!的)/;

function normalizar(v) {
  const original = String(v.espanol ?? v.es ?? "").trim();
  const es = original
    .toLowerCase()
    .replace(/[（(].*?[)）]/g, "")
    .replace(/(\.\.\.|…)/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const zh = String(v.chino ?? v.zh ?? "")
    .replace(/[（(].*?[)）]/g, "")
    .split(/[；;/]/)[0]
    .trim();
  // Primera variante: «médico / médica» → «médico»; «educado/a» → «educado»; «once, doce…» → «once»
  const primero = es.split(/\s*[/,;]\s*/)[0].trim();
  return { original, es, zh, primero, palabras: primero.split(" ").filter(Boolean) };
}

// Infinitivo: -ar/-er/-ir sin tilde (salvo -ír: reír, oír) y, como mucho, un pronombre enclítico
// («ducharse», «conectarse»); con «me/te/lo…» solo si lo que queda es un infinitivo largo («fuer-te» no).
const INFINITIVO = /^(ir|[a-zñü]+(ar|er|ir)|[a-zñü]+ír)$/;
const esInfinitivo = (w) => {
  if (NO_VERBOS.has(w) || AR_ADJ.has(w)) return false;
  if (INFINITIVO.test(w)) return true;
  const reflexivo = w.match(/^(.+)se$/);
  if (reflexivo && INFINITIVO.test(reflexivo[1]) && reflexivo[1].length >= 4) return true;
  const enclitico = w.match(/^(.+?)(me|te|nos|le|les|lo|la|los|las)$/); // sin «os»: «vaquer-os» no
  return Boolean(enclitico && INFINITIVO.test(enclitico[1]) && enclitico[1].length >= 5);
};
const esConjugada = (w, zh) => {
  if (CONJUGADAS.has(w)) return true;
  if (/^[a-záéíóúñ]{3,}(aba|abas|ábamos|aban)$/.test(w)) return true;
  if (/^[a-záéíóúñ]{2,}(ré|rás|rá|remos|réis|rán)$/.test(w) && !/(puré|refrán|azafrán)$/.test(w)) return true;
  if (/^[a-záéíóúñ]{2,}[^e]ría(s|mos|is|n)?$/.test(w) && /^(会|应该|可能|能|想|将)/.test(zh)) return true;
  if (/^[a-záéíóúñ]{2,}ería(s|mos|is|n)?$/.test(w) && /^(会|应该|可能|能|想|将)/.test(zh)) return true;
  if (/^[a-záéíóúñ]{2,}(ara|aras|áramos|aran|iera|ieras|iéramos|ieran)$/.test(w) && /(假设|如果|想要|礼貌|虚拟)/.test(zh)) return true;
  return false;
};

/** Categoría por reglas (sin la tabla de excepciones) */
export function categoriaPorReglas(v) {
  const { original, es, zh, primero, palabras } = normalizar(v);
  if (!primero) return "sust";
  const zhVerbo = PRONOMBRE_ZH.test(zh) && !/的$/.test(zh);
  if (/[¿?¡!]/.test(original)) {
    // «¡Di!», «¡Ven!»: imperativo suelto
    const limpia = primero.replace(/[¿?¡!.]/g, "").trim();
    if (!limpia.includes(" ") && (CONJUGADAS.has(limpia) || IMPERATIVOS.has(limpia) || zhVerbo)) return "verbo";
    // Imperativo con pronombre: «¡Levántate!», «¡Siéntese!», «¡Dímelo!»
    if (!limpia.includes(" ") && /[áéíóú]/.test(limpia) && /(te|se|me|nos|lo|la|le|los|las)$/.test(limpia)) return "verbo";
    return "expr";
  }
  if (FORMULAS_FRASE.has(primero) || (palabras.length === 1 && FORMULAS.has(primero) && !/色/.test(zh))) return "expr";
  if (palabras.every((w) => NUMEROS.has(w) || w === "y")) return "sust";

  if (palabras.length > 1) {
    const [p0, p1] = palabras;
    const ultima = palabras[palabras.length - 1];
    if (/^(el|la|los|las|un|una|unos|unas)$/.test(p0)) {
      if (palabras.length > 5 || palabras.slice(1).some((w) => CONJUGADAS.has(w))) return "expr";
      if (/(pasad[oa]s?|próxim[oa]s?|que viene)$/.test(primero)) return "expr";
      if (palabras.slice(1).every((w) => GRAMATICALES.has(w))) return "expr"; // «la más», «lo mismo»
      return "sust";
    }
    if (esInfinitivo(p0) || FORMULAS.has(p0)) return "expr"; // «ir al grano», «Gracias de antemano»
    if (GRAMATICALES.has(p0) || CONJUGADAS.has(p0) || NUMEROS.has(p0)) return "expr";
    if (GRAMATICALES.has(ultima) && !/^(al|del)$/.test(ultima)) return "expr";
    if (/^(el|la|los|las|un|una|lo|le|me|te|se|nos)$/.test(p1)) return "expr";
    if (/mente$/.test(p0)) return "expr";
    if (palabras.length <= 4) return "sust";
    return "expr";
  }

  const w = primero;
  if (w === "mañana" && /明天/.test(zh)) return "expr"; // «mañana» = 明天 (adverbio); la mañana = 早上 (nombre)
  if (SOLAS_NO_GRAMATICALES.has(w)) return SOLAS_NO_GRAMATICALES.get(w);
  if (GRAMATICALES.has(w) || /mente$/.test(w)) return "expr";
  if (NUMEROS.has(w)) return "sust";
  if ((ORDINALES.has(w) || /(ésim[oa]|^decimo.+)$/.test(w)) && /^第/.test(zh)) return "adj";
  if (esConjugada(w, zh)) return "verbo";
  if (zhVerbo || (/[了过]$/.test(zh) && !/的/.test(zh))) return "verbo";
  if (/的$/.test(zh) && !/目的$/.test(zh)) return "adj"; // 目的 = «finalidad» (nombre)
  if (esInfinitivo(w)) return "verbo";
  if (COLORES.has(w) && /色$/.test(zh) && zh !== "颜色") return "adj";
  if (PAISES.test(zh) && /^[a-záéíóúñ]/.test(original)) return "adj";
  if (ADJETIVOS.has(w) || AR_ADJ.has(w)) return "adj";
  if (SUFIJO_ADJ.test(w) && !SUFIJO_SUST.test(w)) return "adj";
  return "sust";
}
