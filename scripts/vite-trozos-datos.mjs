// Plugin de Vite: trocea los ficheros de datos grandes en módulos pequeños AL COMPILAR, sin duplicar nada en el repo.
// Los datos originales siguen siendo la única fuente (src/data/oficial/*.js, nuevos/*.json, src/data/modulos/modulos-*.js);
// el plugin los lee en Node y sirve módulos virtuales deterministas:
//
//   virtual:oficial-indice          → { RESUMEN: {A1: () => import(resumen)}, MODELOS: {A1: {1: () => import(modelo)}} }
//   (resumen de un nivel)           → lo que la lista de modelos necesita (resumenModelo de oficial-loader.js), sin el examen
//   (un modelo)                     → el examen tal cual está en los datos (se normaliza en el navegador como siempre)
//   virtual:modulos-indice          → { 1: () => import(unidad 1), … } una unidad por fichero (la unidad pesa ~1/20 del tramo)
//   virtual:modulos-vocabulario     → metadatos + vocabulario de todas las unidades (lo único que leen los juegos de palabras)
//   virtual:silabas-templo?solo=a,b → solo esas sílabas de data/silabas-templo.js (el resto se carga al abrir una familia)
//
// Así cada pantalla descarga solo lo suyo: la lista de un nivel no baja los 20 exámenes, un examen no baja el nivel entero
// y una unidad no baja las otras 19 de su tramo. Si cambian los datos, basta con volver a compilar (en `npm run dev` se recargan solos).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const RAIZ = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const DIR_OFICIAL = path.join(RAIZ, "src/data/oficial");
const DIR_NUEVOS = path.join(DIR_OFICIAL, "nuevos");
const DIR_MODULOS = path.join(RAIZ, "src/data/modulos");
const LOADER = path.join(RAIZ, "src/lib/oficial-loader.js");
const SILABAS = path.join(RAIZ, "src/data/silabas-templo.js");
const NIVELES = ["A1", "A2", "B1", "B2"];

// Ids internos con forma de fichero: así los trozos salen con nombres legibles en dist/assets (oficial-A1-03-xxxx.js)
const P = "\0datos/";
const ESPEC = "virtual:ae-datos/"; // cómo se importan los trozos desde el código generado
const ID = {
  indiceOficial: "virtual:oficial-indice",
  indiceModulos: "virtual:modulos-indice",
  vocabulario: "virtual:modulos-vocabulario",
};

// Importa un módulo ES de datos sin la caché de Node (para que `vite dev` vea los cambios)
async function importar(fichero) {
  const v = fs.statSync(fichero).mtimeMs;
  return import(`${pathToFileURL(fichero).href}?v=${v}`);
}
const ficherosNuevos = () =>
  fs.existsSync(DIR_NUEVOS)
    ? fs
        .readdirSync(DIR_NUEVOS)
        .filter((f) => f.endsWith(".json"))
        .sort()
    : [];
const ficherosModulos = () =>
  fs
    .readdirSync(DIR_MODULOS)
    .filter((f) => /^modulos-\d+-\d+\.js$/.test(f))
    .sort();

// JSON grande como cadena: el navegador analiza JSON.parse('…') bastante más rápido que un literal de objeto equivalente
const comoModulo = (dato) => `export default JSON.parse(${JSON.stringify(JSON.stringify(dato))});\n`;
const pad = (n) => String(n).padStart(2, "0");

export default function trozosDatos() {
  let cacheOficial = null;
  let cacheModulos = null;
  const vigilados = new Set();

  // Modelos de un nivel, en el mismo orden que el loader de siempre: oficiales y detrás los simulacros nuevos
  async function oficial() {
    if (cacheOficial) return cacheOficial;
    const { normalizarModelo, resumenModelo } = await importar(LOADER);
    const porNivel = {};
    for (const nivel of NIVELES) {
      const fichero = path.join(DIR_OFICIAL, `oficial-${nivel.toLowerCase()}.js`);
      vigilados.add(fichero);
      const mod = await importar(fichero);
      const base = Object.values(mod).find(Array.isArray) || [];
      const nuevos = ficherosNuevos()
        .map((f) => {
          const ruta = path.join(DIR_NUEVOS, f);
          vigilados.add(ruta);
          return JSON.parse(fs.readFileSync(ruta, "utf8"));
        })
        .filter((m) => m?.nivel === nivel);
      const modelos = new Map(); // número de modelo → examen original (el primero que aparezca, como hacía .find)
      const resumen = [];
      for (const bruto of [...base, ...nuevos]) {
        const normal = normalizarModelo(bruto, nivel);
        resumen.push(resumenModelo(normal));
        if (Number.isFinite(normal.modelo) && !modelos.has(normal.modelo)) modelos.set(normal.modelo, bruto);
      }
      porNivel[nivel] = { modelos, resumen };
    }
    cacheOficial = porNivel;
    return porNivel;
  }

  async function modulos() {
    if (cacheModulos) return cacheModulos;
    const todos = [];
    for (const f of ficherosModulos()) {
      const fichero = path.join(DIR_MODULOS, f);
      vigilados.add(fichero);
      const mod = await importar(fichero);
      todos.push(...(Object.values(mod).find(Array.isArray) || []));
    }
    // Mismo orden que ALL_MODULES (data/modulos/index.js)
    todos.sort((a, b) => a.numero - b.numero);
    const porNumero = new Map();
    for (const m of todos) if (m && !porNumero.has(m.numero)) porNumero.set(m.numero, m);
    cacheModulos = { todos, porNumero };
    return cacheModulos;
  }

  return {
    name: "ae-trozos-datos",
    resolveId(id) {
      if (id === ID.indiceOficial || id === ID.indiceModulos || id === ID.vocabulario) return P + id.slice("virtual:".length) + ".js";
      if (id.startsWith(ESPEC)) return P + id.slice(ESPEC.length) + ".js";
      if (id.startsWith("virtual:silabas-templo?solo=")) return `${P}silabas-templo-${id.split("=")[1].replace(/[^a-zñ,]/gi, "").replace(/,/g, "-")}.js`;
      return null;
    },
    async load(id) {
      if (!id.startsWith(P)) return null;
      const nombre = id.slice(P.length).replace(/\.js$/, "");
      const vigilar = () => vigilados.forEach((f) => this.addWatchFile(f));

      if (nombre === "oficial-indice") {
        const datos = await oficial();
        vigilar();
        const resumen = NIVELES.map((n) => `  ${n}: () => import(${JSON.stringify(`${ESPEC}oficial-${n}-lista`)}).then((m) => m.default),`).join("\n");
        const modelos = NIVELES.map((n) => {
          const filas = [...datos[n].modelos.keys()].map((k) => `    ${k}: () => import(${JSON.stringify(`${ESPEC}oficial-${n}-${pad(k)}`)}).then((m) => m.default),`);
          return `  ${n}: {\n${filas.join("\n")}\n  },`;
        }).join("\n");
        return `export const RESUMEN = {\n${resumen}\n};\nexport const MODELOS = {\n${modelos}\n};\n`;
      }
      let m = nombre.match(/^oficial-(A1|A2|B1|B2)-lista$/);
      if (m) {
        const datos = await oficial();
        vigilar();
        return comoModulo(datos[m[1]].resumen);
      }
      m = nombre.match(/^oficial-(A1|A2|B1|B2)-(\d+)$/);
      if (m) {
        const datos = await oficial();
        vigilar();
        return comoModulo(datos[m[1]].modelos.get(Number(m[2])) ?? null);
      }
      if (nombre === "modulos-indice") {
        const { porNumero } = await modulos();
        vigilar();
        const filas = [...porNumero.keys()].map((n) => `  ${n}: () => import(${JSON.stringify(`${ESPEC}unidad-${pad(n)}`)}).then((m) => m.default),`);
        return `export const UNIDADES = {\n${filas.join("\n")}\n};\n`;
      }
      m = nombre.match(/^unidad-(\d+)$/);
      if (m) {
        const { porNumero } = await modulos();
        vigilar();
        return comoModulo(porNumero.get(Number(m[1])) ?? null);
      }
      m = nombre.match(/^silabas-templo-(.+)$/);
      if (m) {
        this.addWatchFile(SILABAS);
        const todas = (await importar(SILABAS)).default;
        const solo = Object.fromEntries(m[1].split("-").filter((s) => todas[s]).map((s) => [s, todas[s]]));
        return `export default ${JSON.stringify(solo)};\n`;
      }
      if (nombre === "modulos-vocabulario") {
        const { todos } = await modulos();
        vigilar();
        const ligeros = todos.map((u) => ({
          id: u.id,
          numero: u.numero,
          titulo: u.titulo,
          tituloChino: u.tituloChino,
          nivel: u.nivel,
          color: u.color,
          icono: u.icono,
          vocabulario: u.vocabulario,
        }));
        return comoModulo(ligeros);
      }
      return null;
    },
    // En `vite dev`, si cambia un fichero de datos se recalcula todo en la siguiente petición
    watchChange(id) {
      if (vigilados.has(id) || id.startsWith(DIR_NUEVOS)) {
        cacheOficial = null;
        cacheModulos = null;
      }
    },
    handleHotUpdate({ file, server }) {
      if (!vigilados.has(file) && !file.startsWith(DIR_NUEVOS)) return;
      cacheOficial = null;
      cacheModulos = null;
      const afectados = [...server.moduleGraph.idToModuleMap.values()].filter((mod) => mod.id?.startsWith(P));
      afectados.forEach((mod) => server.moduleGraph.invalidateModule(mod));
    },
  };
}
