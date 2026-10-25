// Genera un simulacro DELE nuevo con el mismo formato que los modelos oficiales del nivel.
// Uso: node generar.mjs <A1|A2|B1|B2> [--tema "tema central"] [--dry]
// Cada prueba se genera por separado con DeepSeek (deepseek-v4-pro) usando como plantilla
// la prueba equivalente de un modelo oficial; las claves se calculan a partir de los ítems.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { validar } from "./validar.mjs";
import { medir, comprobarNivel } from "./nivel.mjs";
import { examinar } from "./examinar.mjs";
globalThis.__fs = fs;

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../../../..");
const NUEVOS = path.join(ROOT, "src/data/oficial/nuevos");
const DS = path.join(os.homedir(), ".claude/skills/deepseek/scripts/ds.py");
const nivel = String(process.argv[2] || "").toUpperCase();
const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
if (!["A1", "A2", "B1", "B2"].includes(nivel)) { console.error("Uso: node generar.mjs <A1|A2|B1|B2> [--tema \"...\"]"); process.exit(1); }

const oficiales = (await import(path.join(ROOT, `src/data/oficial/oficial-${nivel.toLowerCase()}.js`)))[`oficial${nivel.toLowerCase()}`];
const previos = fs.existsSync(NUEVOS) ? fs.readdirSync(NUEVOS).filter((f) => f.startsWith(nivel) && f.endsWith(".json")).map((f) => JSON.parse(fs.readFileSync(path.join(NUEVOS, f), "utf8"))) : [];
const usados = [...oficiales, ...previos].map((m) => m.temaCentral);
const reemplazar = arg("--reemplazar");
// --rehacer B1-21 --tareas P1T3,P2T1 --motivo "…": Claude pide rehacer tareas concretas de un simulacro guardado
const rehacerCodigo = arg("--rehacer");
const existente = rehacerCodigo ? JSON.parse(fs.readFileSync(path.join(NUEVOS, `${rehacerCodigo}.json`), "utf8")) : null;
const numero = existente ? existente.modelo : reemplazar ? Number(reemplazar.split("-")[1]) : 20 + previos.length + 1;
const REQ = JSON.parse(fs.readFileSync(path.join(ROOT, "src/data/requisitos-dele.json"), "utf8"))[nivel];
const CAL = JSON.parse(fs.readFileSync(path.join(HERE, "../calibracion-niveles.json"), "utf8"))[nivel];
const rango = (k, d = 1) => `${CAL[k].p10.toFixed(d)}–${CAL[k].p90.toFixed(d)}`;
const plantilla = existente ? oficiales.find((o) => `plantilla ${o.codigo}` === existente.generadoCon) || oficiales[0] : oficiales[Math.floor(Math.random() * oficiales.length)];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "dele-gen-"));

// Llamada a DeepSeek con margen para el razonamiento interno; si la respuesta llega vacía o cortada, reintenta
function deepseek(prompt, ficheros = [], maxTokens = 8000) {
  const intentos = [["deepseek-v4-pro", Math.max(maxTokens, 12000)], ["deepseek-v4-pro", Math.max(maxTokens, 12000) * 2], ["deepseek-chat", 8000]];
  for (const [modelo, tokens] of intentos) {
    const out = path.join(tmp, `r-${Date.now()}.json`);
    const args = [DS, "-m", modelo, "--json", "--max-tokens", String(tokens), "-t", "0.8", "--out", out, ...ficheros.flatMap((f) => ["-f", f]), prompt];
    const r = spawnSync("python3", args, { stdio: ["ignore", "ignore", "inherit"], timeout: 900000 });
    try {
      if (r.status !== 0) throw new Error("ds.py falló");
      const txt = fs.readFileSync(out, "utf8").replace(/^```(json)?|```$/gm, "").trim();
      return JSON.parse(txt);
    } catch {
      console.log(`    (respuesta vacía o incompleta con ${modelo}, reintento)`);
    }
  }
  throw new Error("DeepSeek no devolvió un JSON válido");
}

const REGLAS = `Eres examinador experto del Instituto Cervantes. Creas simulacros del DELE ${nivel} para estudiantes chinos.
Reglas obligatorias:
- Mismo formato y condiciones que el examen oficial del nivel ${nivel}: mismas tareas, mismo número de ítems, mismo tipo de tarea, mismas instrucciones oficiales, misma duración y extensión de textos (±15 % de palabras respecto a la plantilla).
- Nivel ${nivel} (MCER): ${REQ.mcer}
- Textos: ${REQ.textos}
- Gramática esperada: ${REQ.gramatica} NO uses: ${REQ.noEsperado}
- Léxico: ${REQ.lexico}
- Audio: ${REQ.audio}
- Preguntas: ${REQ.preguntas}
- Cifras medidas en los 20 modelos oficiales del nivel que tu texto DEBE cumplir: ${rango("palabrasPorFrase")} palabras por frase de media; ${rango("palabrasLargas")} % de palabras de 9 letras o más; literalidad de la respuesta correcta respecto a su fraseSoporte ${rango("literalidad", 2)} (1 = repite las mismas palabras del texto, 0,4 = paráfrasis completa).
- Español de España salvo que la plantilla indique otra variedad.
- Contenido NUEVO: no copies textos, nombres, situaciones ni preguntas de la plantilla; sólo su estructura.
- Ítems de opción múltiple: una única respuesta correcta inequívoca, distractores plausibles que aparezcan en el texto pero no respondan; "correcta" es el índice (0-based) de la opción; "justificacion" y "fraseSoporte" citan literalmente el texto.
- Varía la posición de la respuesta correcta entre ítems.
- Responde SOLO con JSON válido.`;

console.log(`» ${nivel} · simulacro nuevo ${numero} (plantilla ${plantilla.codigo})`);
// 1. Plan del modelo: tema central nuevo y matriz
fs.writeFileSync(path.join(tmp, "matriz.json"), JSON.stringify({ temaCentral: plantilla.temaCentral, ambito: plantilla.ambito, matriz: plantilla.matriz }, null, 1));
const plan = existente ? { temaCentral: existente.temaCentral, ambito: existente.ambito, matriz: existente.matriz } : deepseek(`${REGLAS}
Temas ya usados (no los repitas ni hagas variantes evidentes): ${usados.join(" | ")}.
${arg("--tema") ? `Tema central pedido: ${arg("--tema")}.` : "Elige un tema central nuevo, cotidiano y adecuado al nivel."}
Devuelve un JSON con las mismas claves que el adjunto (temaCentral, ambito, matriz) para el nuevo modelo: mismos géneros y tipos de audio que la plantilla pero con situaciones nuevas.`, [path.join(tmp, "matriz.json")], 3000);

// 2. Cada tarea por separado con la tarea equivalente de la plantilla (piezas pequeñas: no se cortan)
function generarTarea(p, t, aviso = "") {
  const f = path.join(tmp, `t-${p.prueba}-${t.num}.json`);
  fs.writeFileSync(f, JSON.stringify(t, null, 1));
  console.log(`  ${p.nombre} · tarea ${t.num}${aviso ? " (corrigiendo)" : ""}…`);
  const nueva = deepseek(`${REGLAS}
Plan del nuevo modelo: ${JSON.stringify(plan)}
Prueba: "${p.nombre}" (${p.duracion} min). Genera la TAREA ${t.num} del nuevo modelo con EXACTAMENTE la misma estructura JSON que la tarea plantilla adjunta: mismas claves, mismo número de ítems, opciones y bloques de material; mismos valores de "num", "tipo" e "instrucciones". Rellena todos los textos con contenido nuevo coherente con el plan.${t.guion ? ' El "guion" sigue el mismo formato con marcas [AUDIO n] y [VOZ n - sexo, edad, país] para poder sintetizarlo.' : ""}${aviso ? `\nLA VERSIÓN ANTERIOR FUE RECHAZADA. Corrige exactamente esto: ${aviso}` : ""}`, [f], 12000);
  return { ...nueva, num: t.num, tipo: t.tipo, instrucciones: t.instrucciones };
}
let pruebas;
if (existente) {
  pruebas = existente.pruebas;
  const motivo = arg("--motivo") || "revisión de Claude";
  for (const cod of String(arg("--tareas") || "").split(",").filter(Boolean)) {
    const [, pi, tj] = cod.match(/P(\d)T(\d)/i) || [];
    if (!pi) continue;
    const p = plantilla.pruebas[pi - 1];
    pruebas[pi - 1].tareas[tj - 1] = generarTarea(p, p.tareas[tj - 1], motivo);
  }
} else pruebas = plantilla.pruebas.map((p) => ({ ...p, tareas: p.tareas.map((t) => generarTarea(p, t)) }));

// 3. Montaje, claves derivadas de los ítems y evaluación oficial del nivel
function montar() {
  const claves = {};
  for (const [k, idx] of [["lectura", 0], ["auditiva", 1]]) claves[k] = pruebas[idx].tareas.map((t) => ({ tarea: t.num, items: (t.items || []).map((it) => ({ num: it.num, correcta: it.correcta, justificacion: it.justificacion, fraseSoporte: it.fraseSoporte })) }));
  return {
    nivel, modelo: numero, codigo: `${nivel}-${String(numero).padStart(2, "0")}`, titulo: `DELE ${nivel} · Simulacro nuevo ${numero}`,
    temaCentral: plan.temaCentral, ambito: plan.ambito, matriz: plan.matriz, pruebas, claves, evaluacion: plantilla.evaluacion,
    nuevo: true, fecha: new Date().toISOString().slice(0, 10), generadoCon: `plantilla ${plantilla.codigo}`,
  };
}

// 4. Control de calidad en hasta 3 rondas: formato, dificultad medida y segundo examinador.
//    Solo se regeneran las tareas con problemas, diciendo al generador qué corregir.
let modelo;
for (let ronda = 1; ; ronda++) {
  modelo = montar();
  const formato = validar(modelo, plantilla);
  const medidas = medir(modelo);
  const dificultad = comprobarNivel(medidas, CAL);
  const examen = formato.length ? { graves: [], avisos: [], problemas: [] } : examinar(modelo, REQ, deepseek, path.join(tmp, `examinar-${ronda}.json`));
  const bloqueantes = [...formato, ...dificultad, ...examen.graves];
  const problemas = [...bloqueantes, ...examen.avisos];
  console.log(`  ronda ${ronda}: ${problemas.length ? `${bloqueantes.length} bloqueante(s), ${examen.avisos.length} aviso(s) del examinador` : "aprobado"} · frase ${medidas.palabrasPorFrase.toFixed(1)} palabras · literalidad ${medidas.literalidad.toFixed(2)}`);
  problemas.forEach((x) => console.log("    - " + x));
  // Sin bloqueantes y (sin avisos o ya en la última ronda útil): se guarda; los avisos restantes los decide Claude
  if (!bloqueantes.length && (!examen.avisos.length || ronda >= 2)) { modelo.avisosExaminador = examen.avisos; break; }
  if (ronda >= 3) { fs.writeFileSync(path.join(tmp, "rechazado.json"), JSON.stringify(modelo, null, 1)); console.error(`✗ No supera el control de calidad tras 3 rondas (borrador en ${tmp}/rechazado.json)`); process.exit(2); }
  // Qué tareas rehacer: las señaladas por formato o examinador; si falla la dificultad global, todas las de comprensión
  const rehacer = new Map();
  const marca = (pi, num, msg) => { const k = `${pi}-${num}`; rehacer.set(k, [...(rehacer.get(k) || []), msg]); };
  for (const x of formato) { const m = x.match(/^P(\d)T(\d)/); if (m) marca(+m[1] - 1, +m[2], x); }
  for (const x of examen.problemas) { const pi = /auditiva/i.test(x) ? 1 : 0; const m = x.match(/tarea (\d+)/); if (m) marca(pi, +m[1], x); }
  if (dificultad.length) for (const pi of [0, 1]) for (const t of plantilla.pruebas[pi].tareas) marca(pi, t.num, dificultad.join("; "));
  for (const [k, msgs] of rehacer) {
    const [pi, num] = k.split("-").map(Number);
    const p = plantilla.pruebas[pi];
    const j = p.tareas.findIndex((t) => t.num === num);
    if (j >= 0) pruebas[pi].tareas[j] = generarTarea(p, p.tareas[j], msgs.join(" | "));
  }
}
if (process.argv.includes("--dry")) { console.log("✓ aprobado (dry run, no se guarda)"); process.exit(0); }
const fichero = path.join(NUEVOS, `${modelo.codigo}.json`);
fs.writeFileSync(fichero, JSON.stringify(modelo));
// 5. Índice que carga la app
const todos = fs.readdirSync(NUEVOS).filter((f) => /^[AB][12]-\d+\.json$/.test(f)).sort();
const idx = todos.map((f, i) => `import m${i} from "./${f}";`).join("\n") + `\n\nconst todos = [${todos.map((_, i) => `m${i}`).join(", ")}];\nexport const NUEVOS = { A1: [], A2: [], B1: [], B2: [] };\nfor (const m of todos) NUEVOS[m.nivel].push(m);\n`;
fs.writeFileSync(path.join(NUEVOS, "index.js"), `// Generado por .claude/skills/generador-examenes-dele: simulacros nuevos con formato oficial\n${idx}`);
console.log(`✓ ${modelo.codigo} «${modelo.temaCentral}» guardado en src/data/oficial/nuevos/`);
