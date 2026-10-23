// Genera src/data/modulos/catalog.json (índice ligero de módulos) a partir de los archivos de datos.
// Uso: node scripts/build-catalog.mjs
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const dir = path.resolve("src/data/modulos");
const files = [
  ["modulos-01-20.js", "MODULOS_01_20"],
  ["modulos-21-40.js", "MODULOS_21_40"],
  ["modulos-41-60.js", "MODULOS_41_60"],
  ["modulos-61-80.js", "MODULOS_61_80"],
];
const level = (n) => (n <= 20 ? "A1" : n <= 40 ? "A2" : n <= 50 ? "B1" : "B2");
const all = [];
for (const [file, name] of files) {
  const mod = await import(pathToFileURL(path.join(dir, file)).href);
  all.push(...mod[name]);
}
const catalog = all
  .sort((a, b) => a.numero - b.numero)
  .map((m) => ({
    numero: m.numero,
    titulo: m.titulo,
    tituloChino: m.tituloChino,
    icono: m.icono,
    color: m.color,
    nivel: m.nivel || level(m.numero),
    descripcion: m.descripcion,
    descripcionChino: m.descripcionChino,
    numeroTexto: m.numeroTexto,
    teoriaCount: (m.teoria || []).length,
    vocabularioCount: (m.vocabulario || []).length,
    dialogosCount: (m.dialogos || []).length,
  }));
fs.writeFileSync(path.join(dir, "catalog.json"), JSON.stringify(catalog));
console.log(`catalog.json: ${catalog.length} módulos`);
