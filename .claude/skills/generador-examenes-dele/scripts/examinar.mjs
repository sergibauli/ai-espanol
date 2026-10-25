// Segundo examinador (IA independiente del generador): evalúa el nivel MCER real de cada texto y
// revisa cada ítem de comprensión (una sola respuesta defendible, distractores adecuados al nivel).
// Devuelve una lista de problemas; vacía = aprobado.
import { textosDe } from "./nivel.mjs";

const NIVELES = ["A1", "A2", "B1", "B2", "C1"];
const limpiar = (g) => String(g || "").replace(/\[[^\]]*\]/g, " ").replace(/\s+/g, " ").trim();

// Todo lo que el alumno ve en la tarea: texto(s), guion, banco de opciones (bloques, enunciados, fragmentos, parejas, clips)
const plano = (v) => (v == null ? "" : typeof v === "string" ? v : Array.isArray(v) ? v.map(plano).join(" \n ") : typeof v === "object" ? Object.entries(v).filter(([k]) => !["tipo", "sobrantes", "correcta", "justificacion", "fraseSoporte"].includes(k)).map(([k, x]) => (/^(letra|id)$/.test(k) ? `${x})` : plano(x))).join(" ") : String(v));
export function resumenParaExaminar(m, soloTareas = null) {
  return (m.pruebas || []).slice(0, 2).map((p, pi) => ({
    prueba: p.nombre,
    tareas: (p.tareas || []).filter((t) => !soloTareas || soloTareas.has(`${pi}-${t.num}`)).map((t) => ({
      tarea: t.num,
      tipo: t.tipo,
      texto: limpiar(plano(t.texto)).slice(0, 6000),
      guion: limpiar(t.guion).slice(0, 6000) || undefined,
      bancoDeOpciones: limpiar([plano(t.material?.bloques), plano(t.material?.enunciados), plano(t.material?.fragmentos), plano(t.parejas), plano(t.clips)].filter(Boolean).join(" \n ")).slice(0, 6000) || undefined,
      items: (t.items || []).map((it) => ({ num: it.num, enunciado: it.enunciado, opciones: it.opciones, correcta: it.correcta })),
    })),
  }));
}

export function examinar(m, req, deepseek, ficheroTmp, soloTareas = null) {
  const fs = globalThis.__fs;
  fs.writeFileSync(ficheroTmp, JSON.stringify(resumenParaExaminar(m, soloTareas), null, 1));
  const r = deepseek(`Eres examinador jefe del DELE (Instituto Cervantes) y revisas un simulacro de nivel ${m.nivel} antes de publicarlo. NO lo has escrito tú: sé crítico.
Requisitos oficiales del nivel ${m.nivel}: ${JSON.stringify(req)}
Para el JSON adjunto (pruebas de comprensión de lectura y auditiva; en las tareas de relacionar y huecos las opciones A, B, C… están en «bancoDeOpciones» y «correcta» es el índice 0-based de la letra elegida):
1. Para cada tarea indica el nivel MCER real del texto (A1, A2, B1, B2 o C1) según su gramática, léxico, longitud de frase y grado de inferencia necesario.
2. Revisa cada ítem: ¿tiene UNA sola respuesta correcta defendible con el texto y coincide con "correcta" (índice 0-based)? ¿Algún distractor también es correcto? ¿La dificultad del ítem (literal, paráfrasis, inferencia) es la del nivel?
Responde SOLO con JSON: {"tareas":[{"prueba":"","tarea":1,"nivelTexto":"A1","comentario":""}],"itemsProblematicos":[{"prueba":"","tarea":1,"num":1,"problema":""}]}`, [ficheroTmp], 12000);
  // Calibrado con modelos oficiales: el examinador valora tareas oficiales de A1 como A2 y de B1 como A2,
  // así que solo bloquea una diferencia de 2 niveles o más. Sus avisos de ítems los decide Claude al final.
  const graves = [];
  const objetivo = NIVELES.indexOf(m.nivel);
  for (const t of r.tareas || []) {
    const n = NIVELES.indexOf(String(t.nivelTexto || "").toUpperCase().slice(0, 2));
    if (n >= 0 && Math.abs(n - objetivo) >= 2) graves.push(`examinador: ${t.prueba} tarea ${t.tarea} tiene nivel ${t.nivelTexto} (se pide ${m.nivel}) · ${t.comentario || ""}`);
  }
  const avisos = (r.itemsProblematicos || []).map((it) => `examinador: ${it.prueba} tarea ${it.tarea} ítem ${it.num}: ${it.problema}`);
  return { graves, avisos, problemas: [...graves, ...avisos], informe: r };
}

export { textosDe };
