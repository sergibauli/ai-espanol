// Mide la nota de la IA contra la de un examinador acreditado.
// Uso (desde la raíz del repo): DEEPSEEK_API_KEY=… node .claude/skills/corrector-dele/calibracion/calibrar.mjs muestras.json [informe.json]
import fs from "fs";
import path from "path";
import { construirPrompt, contarPalabras, aplicarPenalizaciones } from "../../../../src/lib/correccionDele.js";

const [archivo, salida = "informe-calibracion.json"] = process.argv.slice(2);
const KEY = process.env.DEEPSEEK_API_KEY;
if (!archivo || !KEY) {
  console.error("Uso: DEEPSEEK_API_KEY=… node calibrar.mjs muestras.json [informe.json]");
  process.exit(1);
}
const muestras = JSON.parse(fs.readFileSync(path.resolve(archivo), "utf8")).filter((m) => typeof m.notaExaminador === "number" && m.texto);
if (!muestras.length) {
  console.error("No hay muestras con «notaExaminador». Rellena la plantilla con redacciones puntuadas por un examinador acreditado.");
  process.exit(1);
}

async function corregir(m) {
  const ctx = { nivel: m.nivel, puntosGuia: m.puntosGuia, minPalabras: m.minPalabras, maxPalabras: m.maxPalabras, rubrica: m.rubrica };
  const palabras = contarPalabras(m.texto);
  const prompt = `${construirPrompt(m.nivel, `${m.tarea || ""}. ${m.enunciado || ""}`, ctx)}\nPALABRAS DEL TEXTO (contadas por el sistema, exactas): ${palabras}`;
  const r = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${KEY}` },
    body: JSON.stringify({ model: "deepseek-chat", temperature: 0.2, max_tokens: 1600, response_format: { type: "json_object" }, messages: [{ role: "system", content: prompt }, { role: "user", content: m.texto }] }),
  });
  const o = JSON.parse((await r.json()).choices[0].message.content);
  return { ...aplicarPenalizaciones(o, palabras, ctx), criterios: o.criterios || [] };
}

const filas = [];
for (const m of muestras) {
  try {
    const ia = await corregir(m);
    filas.push({ id: m.id, nivel: m.nivel, examinador: m.notaExaminador, ia: ia.puntuacion, aptoExaminador: m.aptoExaminador ?? m.notaExaminador >= 60, aptoIA: ia.apto, dif: ia.puntuacion - m.notaExaminador });
    console.log(`${m.id} ${m.nivel}: examinador ${m.notaExaminador} · IA ${ia.puntuacion}`);
  } catch (e) {
    console.log(`${m.id}: error ${e.message}`);
  }
}
const n = filas.length;
const mae = filas.reduce((a, f) => a + Math.abs(f.dif), 0) / n;
const sesgo = filas.reduce((a, f) => a + f.dif, 0) / n;
const acuerdo = filas.filter((f) => f.aptoExaminador === f.aptoIA).length / n;
// Kappa de Cohen sobre APTO / NO APTO
const pe = (() => {
  const a1 = filas.filter((f) => f.aptoExaminador).length / n;
  const b1 = filas.filter((f) => f.aptoIA).length / n;
  return a1 * b1 + (1 - a1) * (1 - b1);
})();
const kappa = pe < 1 ? (acuerdo - pe) / (1 - pe) : 1;
const porNivel = Object.fromEntries([...new Set(filas.map((f) => f.nivel))].map((lv) => {
  const fs2 = filas.filter((f) => f.nivel === lv);
  return [lv, { n: fs2.length, mae: +(fs2.reduce((a, f) => a + Math.abs(f.dif), 0) / fs2.length).toFixed(1), sesgo: +(fs2.reduce((a, f) => a + f.dif, 0) / fs2.length).toFixed(1) }];
}));
const veredicto = mae <= 8 && acuerdo >= 0.85 ? "CALIBRADA" : "NECESITA AJUSTE";
const informe = { fecha: new Date().toISOString(), n, mae: +mae.toFixed(1), sesgo: +sesgo.toFixed(1), acuerdoApto: +(acuerdo * 100).toFixed(1), kappa: +kappa.toFixed(2), porNivel, veredicto, filas };
fs.writeFileSync(salida, JSON.stringify(informe, null, 1));
console.log(`\n${n} muestras · error medio ${informe.mae} puntos · sesgo ${informe.sesgo} (positivo = la IA es más generosa) · acuerdo APTO ${informe.acuerdoApto}% · kappa ${informe.kappa} → ${veredicto}`);
