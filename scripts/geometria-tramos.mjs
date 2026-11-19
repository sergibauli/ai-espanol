// Exporta la geometría de los tramos de la Ruta para el pintor (scripts/tramos-ruta.py): node scripts/geometria-tramos.mjs
// Una entrada por nivel × variante (0–2) × paradas (2–3) × fila (150 escritorio, 120 móvil), con las paradas y el
// recorrido muestreado cada 2 px (x, y, normal, longitud). Sale a scripts/.tramos-geometria.json (no se versiona).
import { writeFileSync } from "node:fs";
import * as g from "../src/components/ruta/geometria.js";

const salida = [];
for (const nivel of ["A1", "A2", "B1", "B2"]) {
  for (const fila of [150, 120]) {
    g.ajustarFila(fila === 120);
    for (const variante of [0, 1, 2]) {
      for (const paradas of [2, 3]) {
        const forma = g.formaDe(nivel, variante);
        const pts = g.puntosCamino(variante, paradas, forma);
        const m = g.muestrear(pts, forma, 2).map((q) => [q.x, q.y, q.nx, q.ny, q.s, q.seg]);
        const alto = g.ARRIBA + paradas * g.FILA + 78;
        salida.push({ nivel, tipo: forma.tipo, variante, paradas, fila, alto, pts, m });
      }
    }
  }
}
writeFileSync(new URL("./.tramos-geometria.json", import.meta.url), JSON.stringify(salida));
console.log(salida.length, "tramos");
