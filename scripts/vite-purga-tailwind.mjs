// Plugin de Vite: al COMPILAR quita de src/styles/app.css (Tailwind ya compilado, ~246 KB) las reglas cuyas
// clases no aparecen en ningún fichero del proyecto. El fichero del repo no se toca y en `npm run dev` se sirve
// entero: sigue siendo la referencia de «clases que existen». Si mañana el código usa una clase que está en
// app.css, el siguiente build la conserva sola.
//
// Criterio (conservador): un selector se queda si TODAS sus clases aparecen como palabra en el código (src/ entero,
// datos incluidos, e index.html). Las reglas sin clases (*, html, :root, @keyframes, @font-face…) se quedan siempre.
// Clases que se forman por partes en tiempo de ejecución: añádelas a SIEMPRE.
import fs from "node:fs";
import path from "node:path";
import postcss from "postcss";

const RAIZ = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const OBJETIVO = path.join(RAIZ, "src/styles/app.css");
const SIEMPRE = new Set(["dark", "group", "peer"]);

function palabrasDelCodigo() {
  const palabras = new Set();
  const leer = (fichero) => {
    for (const t of fs.readFileSync(fichero, "utf8").match(/[A-Za-z0-9_:/.\-[\]#%!]+/g) || []) palabras.add(t);
  };
  const recorrer = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) recorrer(p);
      else if (/\.(jsx?|mjs|json|html)$/.test(e.name)) leer(p);
    }
  };
  recorrer(path.join(RAIZ, "src"));
  leer(path.join(RAIZ, "index.html"));
  return palabras;
}

const clasesDe = (selector) => (selector.match(/\.((?:\\.|[A-Za-z0-9_-])+)/g) || []).map((c) => c.slice(1).replace(/\\(.)/g, "$1"));

export default function purgaTailwind() {
  let compilando = false;
  return {
    name: "ae-purga-tailwind",
    enforce: "pre",
    configResolved(config) {
      compilando = config.command === "build";
    },
    transform(codigo, id) {
      if (!compilando || id.split("?")[0] !== OBJETIVO) return null;
      const palabras = palabrasDelCodigo();
      const usada = (c) => SIEMPRE.has(c) || palabras.has(c);
      const raiz = postcss.parse(codigo);
      let quitadas = 0;
      raiz.walkRules((regla) => {
        if (regla.parent?.type === "atrule" && /keyframes$/i.test(regla.parent.name)) return;
        const vivos = regla.selectors.filter((s) => clasesDe(s).every(usada));
        if (vivos.length === regla.selectors.length) return;
        if (vivos.length) regla.selectors = vivos;
        else {
          regla.remove();
          quitadas++;
        }
      });
      // @media / @supports que se han quedado vacíos
      raiz.walkAtRules((at) => {
        if (at.nodes && at.nodes.length === 0) at.remove();
      });
      const salida = raiz.toString();
      this.info?.(`app.css: ${quitadas} reglas sin uso fuera (${Math.round(codigo.length / 1024)} → ${Math.round(salida.length / 1024)} KB)`);
      return { code: salida, map: null };
    },
  };
}
