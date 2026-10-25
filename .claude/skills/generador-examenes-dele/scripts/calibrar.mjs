// Calibra las medidas de dificultad con los 20 modelos oficiales de cada nivel.
// Uso: node calibrar.mjs  → escribe ../calibracion-niveles.json (rango p10–p90 y media por nivel)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { medir } from "./nivel.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../../../..");
const pct = (a, p) => { const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.max(0, Math.round((p / 100) * (s.length - 1))))]; };
const salida = {};
for (const n of ["A1", "A2", "B1", "B2"]) {
  const modelos = (await import(path.join(ROOT, `src/data/oficial/oficial-${n.toLowerCase()}.js`)))[`oficial${n.toLowerCase()}`];
  const medidas = modelos.map(medir);
  salida[n] = {};
  for (const k of Object.keys(medidas[0])) {
    const v = medidas.map((m) => m[k]);
    salida[n][k] = { media: v.reduce((a, b) => a + b, 0) / v.length, p10: pct(v, 10), p90: pct(v, 90) };
  }
}
fs.writeFileSync(path.join(HERE, "../calibracion-niveles.json"), JSON.stringify(salida, null, 1));
const filas = Object.keys(salida.A1).map((k) => `${k.padEnd(18)} ${["A1", "A2", "B1", "B2"].map((n) => `${salida[n][k].p10.toFixed(2)}–${salida[n][k].p90.toFixed(2)}`.padStart(14)).join("")}`);
console.log(`${"medida".padEnd(18)}${["A1", "A2", "B1", "B2"].map((n) => n.padStart(14)).join("")}\n${filas.join("\n")}`);
