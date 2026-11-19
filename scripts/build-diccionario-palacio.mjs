// Genera public/palabras/es.txt.gz: el diccionario completo del «Palacio de las palabras · 字母宫殿».
// Fuente: lista de palabras de Letterpress (atebits/Words, Words/es.txt, CC0 1.0), ~636 000 formas
// en minúsculas y sin tildes, con plurales, femeninos y conjugaciones. Ver public/palabras/README.md.
// Se añaden las formas con pronombre enclítico que aparecen en las unidades («acostarse», «cómpramelo»).
//
// Uso: node scripts/build-diccionario-palacio.mjs [ruta/a/es.txt]
//   (sin ruta, descarga la versión fijada abajo)
// Formato de salida (gzip de texto UTF-8, una palabra por línea, ordenadas, codificación por prefijo):
//   cada línea = carácter (48 + n) + resto, donde n = letras iniciales compartidas con la palabra anterior.
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const COMMIT = "f4976d6a6d34beb431dec8d4b443a138f4dc8bee";
const URL_FUENTE = `https://raw.githubusercontent.com/atebits/Words/${COMMIT}/Words/es.txt`;
const raiz = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const MAX = 13; // lado del tablero

const clave = (p) =>
  String(p).toLowerCase().replace(/ñ/g, "\u0001").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\u0001/g, "ñ");
const apta = (k) => k.length >= 2 && k.length <= MAX && /^[a-zñ]+$/.test(k) && !/[kw]/.test(k); // sin fichas K ni W

let texto;
if (process.argv[2]) texto = fs.readFileSync(process.argv[2], "utf8");
else {
  const r = await fetch(URL_FUENTE);
  if (!r.ok) throw new Error(`No se pudo descargar ${URL_FUENTE}: ${r.status}`);
  texto = await r.text();
}
const palabras = new Set(texto.split(/\r?\n/).map(clave).filter(apta));
const deFuente = palabras.size;

// Formas con enclíticos de las unidades (Letterpress no las trae): solo si la base es válida
const lexico = JSON.parse(fs.readFileSync(path.join(raiz, "src/data/palacio-lexico.json"), "utf8"));
const ENCL = /(me|te|se|lo|la|le|los|las|les|nos|os)$/;
const baseValida = (k, prof = 0) => {
  if (palabras.has(k) && /(r|[aeiou])$/.test(k)) return true;
  const m = k.match(ENCL);
  return !!m && prof < 2 && k.length - m[1].length >= 3 && baseValida(k.slice(0, -m[1].length), prof + 1);
};
let enclit = 0;
for (const k of Object.keys(lexico)) {
  if (!apta(k) || palabras.has(k)) continue;
  const m = k.match(ENCL);
  if (m && baseValida(k.slice(0, -m[1].length))) {
    palabras.add(k);
    enclit++;
  }
}

const orden = [...palabras].sort();
let previa = "";
const lineas = orden.map((w) => {
  let n = 0;
  while (n < previa.length && n < w.length && previa[n] === w[n]) n++;
  previa = w;
  return String.fromCharCode(48 + n) + w.slice(n);
});
const destino = path.join(raiz, "public/palabras/es.txt.gz");
fs.mkdirSync(path.dirname(destino), { recursive: true });
fs.writeFileSync(destino, zlib.gzipSync(lineas.join("\n"), { level: 9 }));
console.log(`${orden.length} palabras (${deFuente} de Letterpress + ${enclit} con enclíticos) → ${path.relative(raiz, destino)} (${(fs.statSync(destino).size / 1024).toFixed(0)} KB)`);
