// Genera src/data/categorias-palabras.json: tabla de excepciones (revisadas a mano) para el mapa mental.
// Uso: node scripts/build-categorias.mjs
//
// Las reglas viven en src/lib/categoriaReglas.js (verbo · sust · adj · expr). Aquí está la lista REVISADA de
// palabras del vocabulario en las que las reglas fallan; el JSON solo guarda las que de verdad difieren de las
// reglas, con clave «español|chino» (la misma entrada puede ser nombre en una unidad y adjetivo en otra).
// Al final mide la precisión con la muestra revisada a mano de scripts/categorias-muestra.json.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { categoriaPorReglas, claveCategoria, CATEGORIAS_PALABRA } from "../src/lib/categoriaReglas.js";

// «español|chino» → categoría correcta (revisado a mano)
const REVISADAS = {
  "contable / contador|会计": "sust",
  "constipado|感冒了": "adj",
  "embarazada|怀孕了": "adj",
  "casado|已婚": "adj",
  "igual (coloquial)|说不定（口语）": "expr",
  "estimado/a…|尊敬的……": "expr",
  "preposición a|前置词 a": "sust",
  "fenomenal|棒极了": "expr",
  "regular|一般般": "expr",
  "soy... (nacionalidad)|我是...人": "expr",
  "¿diga? / ¿dígame?|喂？（西班牙接电话用语）": "expr",
  "¿podrías…?|你能不能……？（委婉）": "expr",
  "fuera|他是(假设)": "verbo",
  "solo|孤独的": "adj",
  "oscar|奥斯卡": "sust",
  "bajo|贝斯": "sust",
  "singular|单数": "sust",
  "preservativo|避孕套": "sust",
  "informativo|新闻节目": "sust",
  "muchísimas gracias|非常感谢（强调）": "expr",
  "un día|有一天": "expr",
  "genial|太棒了；极好的": "expr",
};

const dir = path.resolve("src/data/modulos");
const vocab = [];
for (const f of fs.readdirSync(dir).filter((x) => /^modulos-\d+-\d+\.js$/.test(x)).sort()) {
  const mod = await import(pathToFileURL(path.join(dir, f)).href);
  for (const u of Object.values(mod).find(Array.isArray) || []) for (const v of u.vocabulario || []) vocab.push({ ...v, unidad: u.numero });
}

const tabla = {};
const usadas = new Set();
for (const v of vocab) {
  const clave = claveCategoria(v);
  const revisada = REVISADAS[clave];
  if (!revisada) continue;
  usadas.add(clave);
  if (!CATEGORIAS_PALABRA.includes(revisada)) throw new Error(`Categoría desconocida para ${clave}: ${revisada}`);
  if (revisada !== categoriaPorReglas(v)) tabla[clave] = revisada;
}
const sobran = Object.keys(REVISADAS).filter((k) => !usadas.has(k));
if (sobran.length) console.warn(`⚠️  Revisadas que ya no están en el vocabulario: ${sobran.join(" · ")}`);

const ordenada = Object.fromEntries(Object.entries(tabla).sort(([a], [b]) => a.localeCompare(b, "es")));
fs.writeFileSync(path.resolve("src/data/categorias-palabras.json"), `${JSON.stringify(ordenada, null, 1)}\n`);

// ---------- Estadísticas ----------
const final = (v) => tabla[claveCategoria(v)] || categoriaPorReglas(v);
const reparto = {};
for (const v of vocab) reparto[final(v)] = (reparto[final(v)] || 0) + 1;
console.log(`categorias-palabras.json: ${Object.keys(ordenada).length} excepciones · ${vocab.length} palabras →`, reparto);
const pocas = [...new Set(vocab.map((v) => v.unidad))].filter((n) => new Set(vocab.filter((v) => v.unidad === n).map(final)).size < 2);
console.log(`unidades con menos de 2 ramas (el mapa por categorías no se ofrece): ${pocas.length ? pocas.join(", ") : "ninguna"}`);

const muestraRuta = path.resolve("scripts/categorias-muestra.json");
if (fs.existsSync(muestraRuta)) {
  const muestra = JSON.parse(fs.readFileSync(muestraRuta, "utf8"));
  const pct = (lista, f) => `${lista.filter((m) => f(m) === m.gold).length}/${lista.length} (${((100 * lista.filter((m) => f(m) === m.gold).length) / lista.length).toFixed(1)} %)`;
  const comoVocab = (m) => ({ espanol: m.es, chino: m.zh });
  for (const [nombre, lista] of [["diseño", muestra.diseno], ["control", muestra.control]]) {
    console.log(`muestra ${nombre}: antes ${pct(lista, (m) => m.vieja)} · reglas ${pct(lista, (m) => categoriaPorReglas(comoVocab(m)))} · reglas + excepciones ${pct(lista, (m) => final(comoVocab(m)))}`);
  }
}
