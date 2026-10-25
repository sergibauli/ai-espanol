// Hoja de revisión compacta de un simulacro para que Claude lo revise entero gastando pocos tokens:
// medidas de nivel, arranque de cada texto y cada ítem con su respuesta correcta y la frase que la justifica.
// Uso: node resumen.mjs src/data/oficial/nuevos/B1-21.json
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { medir, comprobarNivel } from "./nivel.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const m = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const cal = JSON.parse(fs.readFileSync(path.join(HERE, "../calibracion-niveles.json"), "utf8"))[m.nivel];
const corta = (s, n) => { const t = String(s || "").replace(/\[[^\]]*\]/g, " ").replace(/\s+/g, " ").trim(); return t.length > n ? t.slice(0, n) + "…" : t; };
const med = medir(m);
const out = [];
out.push(`${m.codigo} · ${m.temaCentral} (${m.ambito}) · ${m.generadoCon}`);
out.push(`Medidas: frase ${med.palabrasPorFrase.toFixed(1)} (oficiales ${cal.palabrasPorFrase.p10.toFixed(1)}–${cal.palabrasPorFrase.p90.toFixed(1)}) · literalidad ${med.literalidad.toFixed(2)} (${cal.literalidad.p10.toFixed(2)}–${cal.literalidad.p90.toFixed(2)}) · palabras largas ${med.palabrasLargas.toFixed(1)} % · subj ${med.subjuntivo.toFixed(1)} · cond ${med.condicional.toFixed(1)} · plusc ${med.pluscuamperfecto.toFixed(1)}`);
const dif = comprobarNivel(med, cal);
out.push(dif.length ? "Dificultad: " + dif.join(" | ") : "Dificultad: dentro del rango oficial");
if (m.avisosExaminador?.length) out.push("AVISOS DEL EXAMINADOR (decide Claude: rehacer o aceptar):\n" + m.avisosExaminador.map((a) => "  ! " + a).join("\n"));
m.pruebas.forEach((p, i) => {
  out.push(`\n## P${i + 1} ${p.nombre} (${p.duracion} min)`);
  p.tareas.forEach((t, j) => {
    const fuente = t.texto || t.guion || (t.material?.bloques || []).map((b) => `${b.letra}) ${b.texto}`).join(" ") || t.situacion || t.instrucciones;
    out.push(`P${i + 1}T${j + 1} [${t.tipo || t.titulo}] ${corta(t.titulo, 60)} — ${corta(fuente, i < 2 ? 260 : 200)}`);
    if (t.puntosGuia?.length) out.push(`   puntos: ${t.puntosGuia.join(" / ")}`);
    const banco = [...(t.material?.enunciados || []), ...(t.material?.fragmentos || []), ...(t.parejas || [])].map((x) => (typeof x === "string" ? x : `${x.letra || x.id || ""}) ${x.texto || x.enunciado || x.frase || ""}`));
    if (banco.length) out.push(`   banco: ${banco.map((b) => corta(b, 70)).join(" | ")}`);
    (t.items || []).forEach((it) => {
      const ops = (it.opciones || []).map((o, k) => (k === it.correcta ? `*${corta(o, 50)}*` : corta(o, 50))).join(" | ");
      out.push(`   ${it.num}. ${corta(it.enunciado, 90)} → ${ops}  ⟵ «${corta(it.fraseSoporte, 110)}»`);
    });
  });
});
console.log(out.join("\n"));
