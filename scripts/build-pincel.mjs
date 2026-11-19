// Genera src/data/pincel-dibujos.json para «Pincel mágico · 神笔»:
// la tabla curada (scripts/pincel-tabla.mjs) + los trazos (iconNode) de cada icono de lucide-react.
// Uso: node scripts/build-pincel.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { TABLA } from "./pincel-tabla.mjs";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dirIconos = path.join(raiz, "node_modules/lucide-react/dist/esm/icons");
const iconos = {};
const faltan = [];
for (const [, , icono] of TABLA) {
  if (iconos[icono]) continue;
  const f = path.join(dirIconos, `${icono}.js`);
  if (!fs.existsSync(f)) { faltan.push(icono); continue; }
  let src = fs.readFileSync(f, "utf8");
  // Alias: el fichero reexporta otro icono
  const alias = src.match(/from '\.\/([\w-]+)\.js'/);
  if (alias && !src.includes("__iconNode =")) src = fs.readFileSync(path.join(dirIconos, `${alias[1]}.js`), "utf8");
  const m = src.match(/const __iconNode = (\[[\s\S]*?\]);\nconst /);
  if (!m) { faltan.push(icono); continue; }
  const nodo = Function(`return ${m[1]}`)();
  iconos[icono] = nodo.map(([tag, { key, ...attrs }]) => [tag, attrs]);
}
if (faltan.length) { console.error("Iconos inexistentes:", [...new Set(faltan)].join(", ")); process.exit(1); }
const vistas = new Set();
const tabla = TABLA.filter(([es]) => (vistas.has(es) ? false : vistas.add(es)));
fs.writeFileSync(path.join(raiz, "src/data/pincel-dibujos.json"), JSON.stringify({ tabla, iconos }));
console.log(`${tabla.length} palabras, ${Object.keys(iconos).length} dibujos`);
