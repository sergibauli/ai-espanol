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
const numero = 20 + previos.length + 1;
const plantilla = oficiales[Math.floor(Math.random() * oficiales.length)];
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
- Vocabulario, gramática y funciones propios del nivel ${nivel} según el Plan Curricular del Instituto Cervantes. Español de España salvo que la plantilla indique otra variedad.
- Contenido NUEVO: no copies textos, nombres, situaciones ni preguntas de la plantilla; sólo su estructura.
- Ítems de opción múltiple: una única respuesta correcta inequívoca, distractores plausibles que aparezcan en el texto pero no respondan; "correcta" es el índice (0-based) de la opción; "justificacion" y "fraseSoporte" citan literalmente el texto.
- Varía la posición de la respuesta correcta entre ítems.
- Responde SOLO con JSON válido.`;

console.log(`» ${nivel} · simulacro nuevo ${numero} (plantilla ${plantilla.codigo})`);
// 1. Plan del modelo: tema central nuevo y matriz
fs.writeFileSync(path.join(tmp, "matriz.json"), JSON.stringify({ temaCentral: plantilla.temaCentral, ambito: plantilla.ambito, matriz: plantilla.matriz }, null, 1));
const plan = deepseek(`${REGLAS}
Temas ya usados (no los repitas ni hagas variantes evidentes): ${usados.join(" | ")}.
${arg("--tema") ? `Tema central pedido: ${arg("--tema")}.` : "Elige un tema central nuevo, cotidiano y adecuado al nivel."}
Devuelve un JSON con las mismas claves que el adjunto (temaCentral, ambito, matriz) para el nuevo modelo: mismos géneros y tipos de audio que la plantilla pero con situaciones nuevas.`, [path.join(tmp, "matriz.json")], 3000);

// 2. Cada tarea por separado con la tarea equivalente de la plantilla (piezas pequeñas: no se cortan)
const pruebas = plantilla.pruebas.map((p, i) => {
  const { tareas, ...cabecera } = p;
  return {
    ...cabecera,
    tareas: tareas.map((t, j) => {
      const f = path.join(tmp, `p${i}-t${j}.json`);
      fs.writeFileSync(f, JSON.stringify(t, null, 1));
      console.log(`  ${p.nombre} · tarea ${t.num}…`);
      {
        {
          const nueva = deepseek(`${REGLAS}
Plan del nuevo modelo: ${JSON.stringify(plan)}
Prueba: "${p.nombre}" (${p.duracion} min). Genera la TAREA ${t.num} del nuevo modelo con EXACTAMENTE la misma estructura JSON que la tarea plantilla adjunta: mismas claves, mismo número de ítems, opciones y bloques de material; mismos valores de "num", "tipo" e "instrucciones". Rellena todos los textos con contenido nuevo coherente con el plan.${t.guion ? ' El "guion" sigue el mismo formato con marcas [AUDIO n] y [VOZ n - sexo, edad, país] para poder sintetizarlo.' : ""}`, [f], 12000);
          return { ...nueva, num: t.num, tipo: t.tipo, instrucciones: t.instrucciones };
        }
      }
    }),
  };
});

// 3. Montaje, claves derivadas de los ítems y evaluación oficial del nivel
const claves = {};
for (const [k, idx] of [["lectura", 0], ["auditiva", 1]]) claves[k] = pruebas[idx].tareas.map((t) => ({ tarea: t.num, items: (t.items || []).map((it) => ({ num: it.num, correcta: it.correcta, justificacion: it.justificacion, fraseSoporte: it.fraseSoporte })) }));
const modelo = {
  nivel, modelo: numero, codigo: `${nivel}-${String(numero).padStart(2, "0")}`, titulo: `DELE ${nivel} · Simulacro nuevo ${numero}`,
  temaCentral: plan.temaCentral, ambito: plan.ambito, matriz: plan.matriz, pruebas, claves, evaluacion: plantilla.evaluacion,
  nuevo: true, fecha: new Date().toISOString().slice(0, 10), generadoCon: `plantilla ${plantilla.codigo}`,
};

// 4. Validación estricta contra la plantilla
const errores = validar(modelo, plantilla);
if (errores.length) { console.error("✗ No supera la validación:\n - " + errores.join("\n - ")); fs.writeFileSync(path.join(tmp, "rechazado.json"), JSON.stringify(modelo, null, 1)); console.error("  (borrador en " + tmp + "/rechazado.json)"); process.exit(2); }
if (process.argv.includes("--dry")) { console.log("✓ válido (dry run, no se guarda)"); process.exit(0); }
const fichero = path.join(NUEVOS, `${modelo.codigo}.json`);
fs.writeFileSync(fichero, JSON.stringify(modelo));
// 5. Índice que carga la app
const todos = fs.readdirSync(NUEVOS).filter((f) => /^[AB][12]-\d+\.json$/.test(f)).sort();
const idx = todos.map((f, i) => `import m${i} from "./${f}";`).join("\n") + `\n\nconst todos = [${todos.map((_, i) => `m${i}`).join(", ")}];\nexport const NUEVOS = { A1: [], A2: [], B1: [], B2: [] };\nfor (const m of todos) NUEVOS[m.nivel].push(m);\n`;
fs.writeFileSync(path.join(NUEVOS, "index.js"), `// Generado por .claude/skills/generador-examenes-dele: simulacros nuevos con formato oficial\n${idx}`);
console.log(`✓ ${modelo.codigo} «${modelo.temaCentral}» guardado en src/data/oficial/nuevos/`);
