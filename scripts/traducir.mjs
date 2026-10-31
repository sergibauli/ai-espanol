// Genera las traducciones de la web a otros idiomas de apoyo (además del chino) con DeepSeek.
//
//   node scripts/traducir.mjs                    # todos los idiomas, todo lo que falte
//   node scripts/traducir.mjs --langs en,fr      # solo esos idiomas
//   node scripts/traducir.mjs --solo ui          # solo la interfaz (ui) o un módulo (m12)
//
// Salida en public/i18n/<idioma>/:
//   ui.json   { "<trozo en chino>": "<traducción>" }  textos de la interfaz (src/pages, src/components, App.jsx)
//   m<N>.json { dict: {…}, teoria: { <id>: { titulo, descripcion, ejemplos: [] } } }  contenido del módulo N
// Es reanudable: solo traduce lo que aún no está en los ficheros. Llama a ds.py con la entrada cerrada.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { segmentosZh } from "../src/lib/segmentosZh.js";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DS = path.join(os.homedir(), ".claude/skills/deepseek/scripts/ds.py");
const SALIDA = path.join(RAIZ, "public/i18n");
const IDIOMAS = { en: "English", fr: "French (français)", ru: "Russian (русский)", ja: "Japanese (日本語)", de: "German (Deutsch)", nl: "Dutch (Nederlands)" };

const arg = (n) => {
  const i = process.argv.indexOf(n);
  return i > 0 ? process.argv[i + 1] : null;
};
const langs = (arg("--langs") || Object.keys(IDIOMAS).join(",")).split(",");
const solo = arg("--solo");
const PARALELO = Number(arg("--workers") || 16);
const TROZO_UI = 120;

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "traducir-"));
let activas = 0;
const cola = [];
const turno = () => new Promise((r) => (activas < PARALELO ? (activas++, r()) : cola.push(r)));
const liberar = () => (cola.length ? cola.shift()() : activas--);
let llamadas = 0;

function ejecutar(args) {
  return new Promise((res) => {
    const c = spawn("python3", args, { stdio: ["ignore", "ignore", "ignore"] });
    const t = setTimeout(() => c.kill(), 300000);
    c.on("close", (code) => (clearTimeout(t), res(code)));
  });
}

async function deepseek(sistema, datos, maxTokens = 8000) {
  const entrada = path.join(tmp, `in-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.json`);
  fs.writeFileSync(entrada, JSON.stringify(datos, null, 1));
  for (let intento = 0; intento < 3; intento++) {
    const out = entrada.replace("in-", `out${intento}-`);
    await turno();
    llamadas++;
    const code = await ejecutar([DS, "-m", "deepseek-chat", "--json", "--max-tokens", String(maxTokens), "-t", "0.2", "-s", sistema, "--out", out, "-f", entrada, "Translate the JSON values in the attached file. Answer with JSON only."]).finally(liberar);
    try {
      if (code !== 0) throw new Error("ds.py");
      return JSON.parse(fs.readFileSync(out, "utf8").replace(/^```(json)?|```$/gm, "").trim());
    } catch {}
  }
  return null;
}

const sistemaTrozos = (lang) =>
  `You translate the interface and explanations of a web app that teaches Spanish (DELE exam A1-B2). The texts are in Simplified Chinese.
Translate every JSON value from Chinese into ${IDIOMAS[lang]}. Keep the same JSON keys.
Rules: keep any Spanish words or sentences exactly as they are (they are what the student learns); keep numbers, emoji, symbols and quotes; be as short and natural as the original (buttons stay short); when the Chinese is the translation of a Spanish word, give the ${IDIOMAS[lang]} equivalent; never add notes or explanations.`;

const sistemaTeoria = (lang) =>
  `You translate grammar and vocabulary explanations of a Spanish course for foreign learners from Spanish into ${IDIOMAS[lang]}. Keep the same JSON structure and keys.
Rules: translate the explanation, but keep in Spanish every Spanish example, word, phrase or form being taught (quoted words, conjugations, sentences after "=", example lists); keep line breaks, bullets (•, -), emoji (📌 ❌ ✅) and capitalised headings (translate the heading words). Do not shorten. No notes.`;

const leer = (f, def) => {
  try {
    return JSON.parse(fs.readFileSync(f, "utf8"));
  } catch {
    return def;
  }
};
const guardar = (f, d) => {
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, JSON.stringify(d));
};

function trozosDe(texto, set) {
  for (const s of segmentosZh(texto)) set.add(s.texto);
}
// Código fuente: cada literal de cadena por separado (las plantillas se cortan en ${…}) y el texto JSX que queda fuera.
function trozosDeCodigo(src, set) {
  const LIT = /"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`/g;
  const resto = src.replace(LIT, (m) => {
    const cuerpo = m.slice(1, -1).replace(/\\n/g, "\n").replace(/\\(["'`\\])/g, "$1");
    for (const parte of m[0] === "`" ? cuerpo.split(/\$\{[^}]*\}/) : [cuerpo]) trozosDe(parte, set);
    return '""';
  });
  for (const parte of resto.split(/[{}<>]/)) trozosDe(parte, set);
}
// Datos: cada cadena del objeto por separado
function trozosDeDatos(obj, set, saltar = () => false) {
  if (typeof obj === "string") return trozosDe(obj, set);
  if (Array.isArray(obj)) return obj.forEach((v) => trozosDeDatos(v, set, saltar));
  if (obj && typeof obj === "object") for (const [k, v] of Object.entries(obj)) if (!saltar(k)) trozosDeDatos(v, set, saltar);
}
function recorrer(dir, set) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) recorrer(p, set);
    else if (/\.jsx?$/.test(f)) trozosDeCodigo(fs.readFileSync(p, "utf8"), set);
    else if (/\.json$/.test(f)) trozosDeDatos(leer(p, null), set);
  }
}

// --- qué hay que traducir
const ui = new Set();
recorrer(path.join(RAIZ, "src/pages"), ui);
recorrer(path.join(RAIZ, "src/components"), ui);
recorrer(path.join(RAIZ, "src/lib"), ui);
for (const f of ["china-stops.json", "requisitos-dele.json"]) trozosDeDatos(leer(path.join(RAIZ, "src/data", f), null), ui);
trozosDeCodigo(fs.readFileSync(path.join(RAIZ, "src/App.jsx"), "utf8"), ui);

const ALL_MODULES = [];
for (const r of ["01-20", "21-40", "41-60", "61-80"]) {
  const mod = await import(path.join(RAIZ, `src/data/modulos/modulos-${r}.js`));
  ALL_MODULES.push(...Object.values(mod).find(Array.isArray));
}
const modulos = ALL_MODULES.map((m) => {
  const n = m.numero;
  const set = new Set();
  trozosDeDatos(m, set, (k) => k === "descripcionChino");
  for (const extra of [`src/data/plus/modulo-${n}.json`, `src/data/stories/modulo-${n}.json`]) {
    const p = path.join(RAIZ, extra);
    if (fs.existsSync(p)) trozosDeDatos(leer(p, null), set);
  }
  for (const t of ui) set.delete(t);
  const teoria = (m.teoria || []).map((b) => ({ id: b.id, titulo: b.titulo, descripcion: b.descripcion, ejemplos: (b.ejemplos || []).map((e) => e.espanol) }));
  return { n, trozos: [...set], teoria };
});

async function traducirTrozos(lang, lista, fichero, campo) {
  const datos = leer(fichero, campo ? {} : {});
  const dict = campo ? (datos[campo] ||= {}) : datos;
  const faltan = lista.filter((t) => !(t in dict));
  const tareas = [];
  for (let i = 0; i < faltan.length; i += TROZO_UI) {
    const parte = faltan.slice(i, i + TROZO_UI);
    const entrada = Object.fromEntries(parte.map((t, j) => [String(j + 1), t]));
    tareas.push(
      deepseek(sistemaTrozos(lang), entrada).then((r) => {
        if (!r) return;
        parte.forEach((t, j) => {
          const v = r[String(j + 1)];
          if (typeof v === "string" && v.trim()) dict[t] = v.trim();
        });
      }),
    );
  }
  await Promise.all(tareas);
  guardar(fichero, datos);
  return faltan.length;
}

async function traducirTeoria(lang, mod, fichero) {
  const datos = leer(fichero, {});
  datos.teoria ||= {};
  const faltan = mod.teoria.filter((b) => !datos.teoria[b.id]);
  await Promise.all(
    faltan.map((b) =>
      deepseek(sistemaTeoria(lang), { titulo: b.titulo, descripcion: b.descripcion, ejemplos: b.ejemplos }).then((r) => {
        if (r && typeof r.descripcion === "string") datos.teoria[b.id] = { titulo: r.titulo || b.titulo, descripcion: r.descripcion, ejemplos: Array.isArray(r.ejemplos) ? r.ejemplos : [] };
      }),
    ),
  );
  return { datos, faltan: faltan.length };
}

console.log(`UI: ${ui.size} trozos · módulos: ${modulos.length} · idiomas: ${langs.join(", ")}`);
const t0 = Date.now();
await Promise.all(
  langs.map(async (lang) => {
    if (!solo || solo === "ui") {
      const n = await traducirTrozos(lang, [...ui], path.join(SALIDA, lang, "ui.json"));
      console.log(`[${lang}] ui: ${n} nuevos`);
    }
    for (const mod of modulos) {
      if (solo && solo !== `m${mod.n}`) continue;
      const f = path.join(SALIDA, lang, `m${mod.n}.json`);
      const { datos, faltan } = await traducirTeoria(lang, mod, f);
      guardar(f, datos);
      const n = await traducirTrozos(lang, mod.trozos, f, "dict");
      console.log(`[${lang}] m${mod.n}: teoría ${faltan} · trozos ${n}`);
    }
  }),
);
console.log(`Hecho en ${Math.round((Date.now() - t0) / 60000)} min · ${llamadas} llamadas`);
