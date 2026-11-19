// Genera src/data/palacio-lexico.json: las palabras que acepta «Palacio de las palabras · 字母宫殿».
// Fuentes: diccionarios ES–ZH (src/data/diccionarios/*) + vocabulario de las unidades (con traducción)
// + todas las palabras que aparecen en los textos en español de las unidades (formas conjugadas, plurales…).
// Ejecútalo tras cambiar el contenido: node scripts/build-lexico-palacio.mjs
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const importar = (rel) => import(pathToFileURL(path.join(raiz, rel)).href);

const CHINO = /[㐀-鿿]/;
const ARTICULOS = /^(el|la|los|las|un|una|unos|unas|lo)\s+/i;
// Clave del tablero: minúsculas, sin tildes (salvo la ñ), ü → u
export const clave = (p) =>
  String(p)
    .toLowerCase()
    .replace(/ñ/g, "\u0001")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\u0001/g, "ñ");
const valida = (k) => /^[a-zñ]{2,13}$/.test(k) && !/[kw]/.test(k);

const trad = new Map(); // clave → [forma con tildes, chino]
const formas = new Map(); // clave → forma con tildes (de los textos)
const minus = new Set(); // claves vistas alguna vez en minúscula (para descartar nombres propios)

function anadirTraduccion(es, zh, prioridad = false) {
  if (!es || !zh || CHINO.test(es)) return;
  const limpio = String(es).trim().replace(ARTICULOS, "").replace(/[¡!¿?.,;:()«»"]/g, "").trim();
  if (!limpio || /\s|\//.test(limpio)) return;
  if (limpio.length <= 5 && limpio === limpio.toUpperCase()) return; // siglas (FDA, ONU…)
  const k = clave(limpio);
  if (!valida(k)) return;
  const zhCorto = String(zh).split(/[；;，,（(]/)[0].trim().slice(0, 14);
  if (!zhCorto) return;
  if (prioridad || !trad.has(k)) trad.set(k, [limpio.toLowerCase(), zhCorto]);
  minus.add(k);
}

const INGLES = /\b(the|and|is|are|of|you|with|this|that|for|it|was|have|from|your)\b/i;
const vistas = new Map(); // clave → veces que aparece en los textos
function tokens(texto) {
  if (typeof texto !== "string" || CHINO.test(texto) || INGLES.test(texto)) return;
  for (const m of texto.matchAll(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+/g)) {
    const w = m[0];
    const antes = texto[m.index - 1] || " ";
    const despues = texto[m.index + w.length] || " ";
    // Trozos de palabra («vendr(é)», «-mente», «habl-o»): fuera
    if (/[-/(\[_*=+]/.test(antes) || /[-/(\[_*=+]/.test(despues)) continue;
    const k = clave(w);
    if (!valida(k)) continue;
    if (w.length > 1 && w === w.toUpperCase()) continue; // siglas
    if (w === w.toLowerCase()) minus.add(k);
    vistas.set(k, (vistas.get(k) || 0) + 1);
    if (!formas.has(k) || w === w.toLowerCase()) formas.set(k, w.toLowerCase());
  }
}

function recorrer(nodo) {
  if (typeof nodo === "string") return tokens(nodo);
  if (Array.isArray(nodo)) return nodo.forEach(recorrer);
  if (nodo && typeof nodo === "object") for (const [k, v] of Object.entries(nodo)) if (k !== "id" && k !== "color" && k !== "icono") recorrer(v);
}

const dic = [];
for (const n of ["a1", "a2", "b1", "b2"]) {
  const mod = await importar(`src/data/diccionarios/${n}Dictionary.js`);
  dic.push(...mod[`${n}Dictionary`]);
}
for (const e of dic) {
  anadirTraduccion(e.es, e.zh);
  tokens(e.exampleEs);
  tokens(e.es);
}
const ALL_MODULES = [];
for (const f of fs.readdirSync(path.join(raiz, "src/data/modulos")).filter((f) => /^modulos-\d+-\d+\.js$/.test(f))) {
  const mod = await importar(`src/data/modulos/${f}`);
  for (const v of Object.values(mod)) if (Array.isArray(v)) ALL_MODULES.push(...v);
}
for (const m of ALL_MODULES) {
  for (const v of m.vocabulario || []) anadirTraduccion(v.espanol, v.chino, true);
  recorrer({ v: m.vocabulario, t: m.teoria, d: m.dialogos, e: m.ejercicios });
}

// Palabras que no se aceptan aunque aparezcan (abreviaturas, siglas, restos de nombres)
const FUERA = new Set(["etc", "sr", "sra", "srta", "ud", "uds", "vd", "dr", "dra", "km", "kg", "cm", "ml", "mm", "ok", "pp", "pag", "ej", "tel", "av", "nº", "dele", "ia", "ai"]);

// Palabras de dos letras: solo las que existen en español
const DOS = new Set(["al", "de", "el", "en", "es", "ha", "he", "la", "le", "lo", "me", "mi", "no", "ni", "os", "se", "si", "su", "te", "tu", "un", "ya", "yo", "va", "ve", "vi", "di", "da", "fe", "oi", "ir", "id", "oh", "ay", "eh", "as", "ti", "dio", "re", "fa", "do", "mu", "ah", "ja"]);
// Final posible de una palabra española
const FINAL = /([aeiouy]|[lnrsdzjx]|ñ)$/;
// Palabras gramaticales frecuentes que los diccionarios no traen sueltas
const FUNCION = { un: "一个", una: "一个", unos: "一些", unas: "一些", el: "（阳性冠词）", los: "（复数冠词）", las: "（复数冠词）", de: "的；从", del: "的（de+el）", al: "到（a+el）", en: "在", con: "和；用", por: "因为；通过", para: "为了", sin: "没有", que: "那个；什么", es: "是", son: "是（他们）", mi: "我的", mis: "我的（复数）", tu: "你的", su: "他的；她的", se: "（自己）", me: "我（宾语）", te: "你（宾语）", lo: "它；他", le: "他；她（间接）", nos: "我们（宾语）", os: "你们（宾语）", ya: "已经", yo: "我", muy: "很", mas: "更", pero: "但是", si: "如果", no: "不", ni: "也不", ir: "去", ver: "看", dar: "给", ha: "已经（他）", he: "已经（我）", hay: "有", fue: "去了；曾是", era: "曾是", ser: "是", sus: "他的（复数）", este: "这个", esta: "这个", ese: "那个", esa: "那个", aqui: "这里", ahi: "那里", alli: "那里", bien: "好", mal: "不好", tan: "这么", todo: "全部", nada: "什么都没有", algo: "一些东西" };
for (const [k, zh] of Object.entries(FUNCION)) if (!trad.has(k) || !trad.get(k)[1]) trad.set(k, [formas.get(k) || k, zh]);
const salida = {};
const claves = new Set([...trad.keys(), ...[...formas.keys()].filter((k) => minus.has(k))]);
for (const k of [...claves].sort()) {
  if (FUERA.has(k)) continue;
  if (k.length === 2 && !DOS.has(k)) continue;
  if (!trad.has(k) && (!FINAL.test(k) || (vistas.get(k) || 0) < 2)) continue;
  let t = trad.get(k);
  // Plurales y femeninos: traducción de la forma base
  if (!t) for (const base of [k.replace(/s$/, ""), k.replace(/es$/, ""), k.replace(/ces$/, "z"), k.replace(/a$/, "o"), k.replace(/as$/, "os")]) if (base !== k && trad.has(base)) { t = [formas.get(k) || k, trad.get(base)[1]]; break; }
  salida[k] = t ? `${t[0]}|${t[1]}` : formas.get(k) || k;
}
const destino = path.join(raiz, "src/data/palacio-lexico.json");
fs.writeFileSync(destino, JSON.stringify(salida));
console.log(`${Object.keys(salida).length} palabras (${[...claves].filter((k) => trad.has(k)).length} con traducción) → ${path.relative(raiz, destino)} (${(fs.statSync(destino).size / 1024).toFixed(0)} KB)`);
