// Corrección DELE: encargo para la IA y penalizaciones calculadas por el sistema.
// Lo usan la app (CorrectionDisplay) y el banco de calibración (skill corrector-dele), para medir exactamente lo mismo.
import REQUISITOS from "../data/requisitos-dele.json" with { type: "json" };

export function construirPrompt(t, a, s) {
  const i = (s?.nivel || t || "A2").toUpperCase();
  const r = [];
  r.push(
    `Eres corrector oficial de exámenes DELE del Instituto Cervantes. Corriges una prueba de producción del nivel ${i} (MCER).`,
  );
  // Qué corresponde a este nivel (mismos requisitos que usa el generador de simulacros)
  const q = REQUISITOS[i];
  if (q) {
    r.push(`NIVEL ${i}: ${q.mcer}`);
    r.push(`GRAMÁTICA ESPERADA EN ${i}: ${q.gramatica}`);
    r.push(`PROPIO DE NIVELES SUPERIORES (no lo exijas; si aparece bien usado, valóralo en «Alcance»): ${q.noEsperado}`);
    r.push(`LÉXICO DE ${i}: ${q.lexico}`);
    r.push(`QUÉ NECESITA CADA CRITERIO PARA SER APTO EN ${i}: Adecuación — ${q.corregir.adecuacion} Coherencia — ${q.corregir.coherencia} Corrección — ${q.corregir.correccion} Alcance — ${q.corregir.alcance}`);
  }
  if (a) {
    r.push(`TAREA: ${a}`);
  }
  if (s?.genero) {
    r.push(`GÉNERO DISCURSIVO: ${s.genero}`);
  }
  if (s?.situacion) {
    r.push(`SITUACIÓN: ${s.situacion}`);
  }
  if (s?.destinatario) {
    r.push(`DESTINATARIO: ${s.destinatario}`);
  }
  if (s?.proposito) {
    r.push(`PROPÓSITO: ${s.proposito}`);
  }
  if (s?.puntosGuia && s.puntosGuia.length) {
    r.push(`DEBE TRATAR (puntos obligatorios del enunciado): ${s.puntosGuia.join(" · ")}`);
    r.push("Para CADA punto obligatorio indica en «puntos» si está «tratado», «incompleto» o «no tratado». Un punto no tratado es un fallo grave de adecuación.");
  }
  if (s?.minPalabras || s?.maxPalabras) {
    r.push(
      `EXTENSIÓN EXIGIDA: ${s.minPalabras ?? "—"}-${s.maxPalabras ?? "—"} palabras (el sistema te da el recuento exacto; no lo recalcules). Si no cumple, dilo en «sugerencias».`,
    );
  }
  if (s?.rubrica && s.rubrica.length) {
    r.push("RÚBRICA OFICIAL DE ESTA TAREA — valora CADA criterio en su banda, no con criterios inventados, y devuélvelo en «criterios»:");
    for (const n of s.rubrica) {
      const m = n.bandas.map((l) => `${l.banda}: ${l.descriptor}`).join(" || ");
      r.push(`- ${n.criterio} → ${m}`);
    }
  }
  r.push(
    `CALIFICACIÓN: la puntuación final (0-100) es la nota ponderada de los criterios anteriores. Un criterio cuenta como logrado solo si alcanza su banda «Apto». El nivel de referencia es ${i}: NO exijas estructuras propias de un nivel superior, y valora como logro lo que corresponde a ${i}.`,
  );
  if (!(s?.rubrica && s.rubrica.length)) {
    r.push("Sin rúbrica específica: usa los criterios DELE «Adecuación a la tarea», «Coherencia y cohesión», «Corrección gramatical y léxica» y «Alcance», cada uno de 0 a 3.");
  }
  r.push(
    "Sé tan exigente como un examinador oficial: no regales puntos. Un texto que no responde a la tarea, que se sale del tema o que tiene errores que impiden entenderlo no puede aprobar. Apto = 60 o más.",
  );
  r.push(`FORMATO DE SALIDA: SOLO un objeto JSON válido, sin texto alrededor:
{"puntuacion":0-100,"apto":true,"criterios":[{"criterio":"","banda":"","nota":0,"comentario":""}],"puntos":[{"punto":"","estado":"tratado"}],"errores":[{"original":"","correccion":"","tipo":"gramática|vocabulario|ortografía|registro|coherencia","explicacion":""}],"sugerencias":[""],"fortalezas":[""],"nivelCERL":"${i}","textoCorregido":""}`);
  r.push(
    "Comentarios, explicaciones, sugerencias y fortalezas en chino (中文) y breves. Hasta 10 errores (los más importantes, de más a menos grave), 3 sugerencias y 2 fortalezas.",
  );
  if (s?.modeloRespuesta) {
    r.push(
      `MODELO DE REFERENCIA (solo para orientar tu valoración; no lo devuelvas como corrección): ${s.modeloRespuesta}`,
    );
  }
  return r.join(`
`);
}

export const contarPalabras = (txt) => (String(txt || "").match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) || []).length;

/** Aplica las penalizaciones de extensión y de puntos del enunciado a la respuesta de la IA */
export function aplicarPenalizaciones(o, palabras, b) {
  // Penalizaciones calculadas por el sistema (no dependen de la IA)
  const pen = [];
  let menos = 0;
  if (b?.minPalabras && palabras < b.minPalabras) {
    const p = Math.min(30, Math.round(((b.minPalabras - palabras) / b.minPalabras) * 40));
    menos += p;
    pen.push(`Extensión insuficiente: ${palabras}/${b.minPalabras} palabras (−${p}) · 字数不足`);
  }
  if (b?.maxPalabras && palabras > b.maxPalabras * 1.15) {
    menos += 10;
    pen.push(`Demasiado largo: ${palabras}/${b.maxPalabras} palabras (−10) · 字数超出`);
  }
  const puntos = Array.isArray(o.puntos) ? o.puntos.filter((x) => x && x.punto) : [];
  const noTratados = puntos.filter((x) => /no tratado/i.test(x.estado)).length;
  const incompletos = puntos.filter((x) => /incompleto/i.test(x.estado)).length;
  if (noTratados || incompletos) {
    const p = Math.min(35, noTratados * 10 + incompletos * 4);
    menos += p;
    pen.push(`Puntos del enunciado: ${noTratados} sin tratar, ${incompletos} incompletos (−${p}) · 题目要点未完成`);
  }
  const puntuacion = Math.max(0, Math.min(100, Math.round(o.puntuacion - menos)));
  return { puntuacion, pen, puntos, noTratados, apto: puntuacion >= 60 && noTratados === 0 };
}
