// Exporta el CÓDIGO de las cuatro rutas de «Aprender» para una IA de diseño (Doubao):
// por nivel, HTML legible (escritorio y móvil, DOM renderizado sin scripts), estilos.css con SOLO las
// reglas que usa la pantalla (incl. @media, @keyframes y @font-face necesarios), imágenes en img/
// y layout-spec.md con medidas, tipografías y colores reales de cada bloque.
// Uso: VITE_SIN_CLERK=1 npx vite --port 5173
//      BEAUTIFY=<ruta a node_modules/js-beautify> node scripts/exportar-rutas-codigo.cjs <salida>
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const beautify = require(process.env.BEAUTIFY || "js-beautify");

const BASE = process.env.BASE || "http://localhost:5173/";
const SALIDA = path.resolve(process.argv[2] || "rutas-codigo");
const RUTAS = [
  ["A1", "A1-pekin-norte", "Pekín y el norte", 1],
  ["A2", "A2-ruta-seda", "La Ruta de la Seda", 21],
  ["B1", "B1-este-china", "El este de China", 41],
  ["B2", "B2-sur-oeste", "El sur y el oeste", 61],
];
const DISPOSITIVOS = [
  ["escritorio", { viewport: { width: 1366, height: 860 }, deviceScaleFactor: 1 }],
  ["movil", { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }],
];
// Bloques que se miden para la especificación de layout
const BLOQUES = [
  ["Fondo de la app", ".v18-fondo"],
  ["Barra lateral izquierda (menú)", "nav.side-nav"],
  ["Enlace del menú (activo)", ".side-link.on"],
  ["Barra superior (móvil)", ".light-top"],
  ["Contenedor de 2 columnas", ".ruta-layout"],
  ["Columna del mapa", ".ruta-main"],
  ["Paisaje fijo del nivel (sticky)", ".mr-fijo"],
  ["Dragón izquierdo", ".ruta-dragon.d1"],
  ["Título de la ruta", ".ruta-region-title"],
  ["Título · nombre", ".ruta-region-title b"],
  ["Título · subtítulo (unidad actual)", ".ruta-region-title em"],
  ["Cajas de nivel (nav)", ".rn-niveles"],
  ["Caja de nivel (activa)", ".rn-nivel.on"],
  ["Caja de nivel (inactiva)", ".rn-nivel:not(.on)"],
  ["Unidad (sección)", ".ruta-unit"],
  ["Banner de unidad", ".ru-estandarte"],
  ["Banner · medallón", ".ru-medallon"],
  ["Banner · lugar", ".ru-lugar"],
  ["Banner · título", ".ru-titulo"],
  ["Banner · sello rojo", ".ru-sello"],
  ["Banner · botón Guía", ".ru-guia"],
  ["Tramo del camino", ".ruta-camino"],
  ["Viñeta de paisaje", ".mr-vineta"],
  ["Parada actual (nodo)", ".rp-parada.actual"],
  ["Botón EMPEZAR", ".rp-empezar"],
  ["Parada hecha", ".rp-parada.done"],
  ["Parada bloqueada", ".rp-parada.locked"],
  ["Sello 第N课 bajo la moneda", ".ruta-clase-sello"],
  ["Rey Mono viajero", ".mono-viajero, [class*='mono-v']"],
  ["Columna derecha", ".ruta-side"],
  ["Botón flotante del tutor (Rey Mono)", ".tp-chat-fab"],
];

async function abrir(contexto, nivel, primera) {
  const p = await contexto.newPage();
  // Progreso de ejemplo para que se vean los tres estados: unidad 1 terminada, clase 1 de la unidad 2 hecha
  await p.addInitScript((primera) => {
    sessionStorage.setItem("dele_auth", "true");
    sessionStorage.setItem("dele_expiry", String(Date.now() + 3600e3));
    localStorage.setItem("ai-espanol:onboarded", "1");
    const cp = {};
    for (let c = 1; c <= 8; c++) cp[`modulo-${primera}#c${c}`] = { completed: true, score: c === 1 ? 100 : 90 };
    cp[`modulo-${primera + 1}#c1`] = { completed: true, score: 90 };
    localStorage.setItem("dele_class_progress", JSON.stringify(cp));
  }, primera);
  await p.goto(BASE + "#/ruta?nivel=" + nivel);
  await p.waitForSelector(".rn-niveles", { timeout: 30000 });
  await p.waitForTimeout(3000);
  await p.evaluate(async () => {
    for (let y = 0; y < document.scrollingElement.scrollHeight; y += 700) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await p.waitForTimeout(2500);
  return p;
}

// Reglas CSS que usa el DOM actual: [{clave, orden, texto}] + @keyframes/@font-face/@property aparte
async function cssUsado(p) {
  return p.evaluate(() => {
    const limpiar = (s) =>
      s
        .replace(/::?(before|after|placeholder|selection|marker|backdrop|first-letter|first-line|file-selector-button|-webkit-[a-z-]+|-moz-[a-z-]+)(\([^)]*\))?/g, "")
        .replace(/:(hover|focus-visible|focus-within|focus|active|visited|checked|disabled|enabled|target|link|any-link|placeholder-shown|user-invalid|invalid|valid)\b/g, "")
        .replace(/:(is|where|not|has)\(\s*\)/g, "")
        .trim();
    const usado = (sel) =>
      sel.split(/,(?![^(]*\))/).some((s) => {
        const t = limpiar(s) || "*";
        if (/^(html|body|:root|\*)$/.test(t)) return true;
        try {
          return Boolean(document.querySelector(t));
        } catch {
          return true;
        }
      });
    const reglas = [];
    const extras = [];
    const nombreHoja = (h, i) => h.ownerNode?.getAttribute?.("data-vite-dev-id")?.replace(/^.*\/src\//, "src/") || h.href || "hoja-" + i;
    const recorrer = (lista) => {
      const salida = [];
      for (const r of lista) {
        if (r instanceof CSSStyleRule) {
          if (usado(r.selectorText)) salida.push(r.cssText);
        } else if (r instanceof CSSKeyframesRule || r instanceof CSSFontFaceRule || (window.CSSPropertyRule && r instanceof CSSPropertyRule)) {
          extras.push(r.cssText);
        } else if (r.cssRules) {
          const dentro = recorrer(r.cssRules);
          if (dentro.length) {
            const cabecera = r.cssText.slice(0, r.cssText.indexOf("{")).trim();
            salida.push(cabecera + " {\n" + dentro.join("\n") + "\n}");
          }
        }
      }
      return salida;
    };
    [...document.styleSheets].forEach((h, i) => {
      if (h.href && h.href.includes("fonts.googleapis")) return;
      let lista;
      try {
        lista = h.cssRules;
      } catch {
        return;
      }
      const base = h.href || location.href;
      const hoja = nombreHoja(h, i);
      [...lista].forEach((r, k) => {
        const texto = recorrer([r]).join("\n");
        if (texto)
          reglas.push({
            clave: hoja + "#" + k,
            hoja,
            k,
            texto: texto.replace(/url\(\s*(["']?)([^"')]+)\1\s*\)/g, (t, q, u) => (u.startsWith("data:") || u.startsWith("#") ? t : 'url("' + new URL(u, base).href + '")')),
          });
      });
    });
    const hojas = [...document.styleSheets].map((h, i) => nombreHoja(h, i));
    return { reglas, extras: [...new Set(extras)], hojas };
  });
}

async function htmlLimpio(p, titulo) {
  return p.evaluate((titulo) => {
    const copia = document.documentElement.cloneNode(true);
    copia.querySelectorAll("script, style, link, noscript, iframe, audio, video, #initial-loader, meta").forEach((n) => n.remove());
    copia.querySelectorAll("*").forEach((n) => {
      for (const a of [...n.attributes]) if (/^on/i.test(a.name) || a.name === "data-vite-dev-id") n.removeAttribute(a.name);
    });
    copia.querySelectorAll("[src], [href], image").forEach((n) => {
      for (const at of ["src", "href", "xlink:href"]) {
        const v = n.getAttribute(at);
        if (!v || v.startsWith("data:") || v.startsWith("#")) continue;
        if (n.tagName === "A") n.setAttribute("href", "#" + v.replace(/^#/, ""));
        else n.setAttribute(at, new URL(v, location.href).href);
      }
      n.removeAttribute("srcset");
    });
    copia.querySelectorAll("[style*='url(']").forEach((n) =>
      n.setAttribute("style", n.getAttribute("style").replace(/url\(\s*(&quot;|["']?)([^"')&]+)\1\s*\)/g, (t, q, u) => (u.startsWith("data:") || u.startsWith("#") ? t : 'url("' + new URL(u, location.href).href + '")')))
    );
    const head = copia.querySelector("head");
    head.innerHTML =
      '<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>' +
      titulo +
      '</title>\n<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Unbounded:wght@500;700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap">\n<link rel="stylesheet" href="estilos.css">';
    return "<!doctype html>\n" + copia.outerHTML;
  }, titulo);
}

async function medir(p) {
  return p.evaluate((bloques) => {
    const fila = (nombre, sel) => {
      const n = document.querySelector(sel);
      if (!n) return null;
      const r = n.getBoundingClientRect();
      const cs = getComputedStyle(n);
      const corto = (v) => (v && v !== "none" && v !== "normal" && v !== "rgba(0, 0, 0, 0)" ? v.replace(/url\("[^"]*\/([^"/]+)"\)/g, "url($1)").slice(0, 140) : "");
      return {
        nombre,
        sel,
        caja: `${Math.round(r.x)}, ${Math.round(r.y + scrollY)} · ${Math.round(r.width)}×${Math.round(r.height)}`,
        position: cs.position,
        display: cs.display + (cs.display.includes("grid") ? " · " + cs.gridTemplateColumns : "") + (cs.display.includes("flex") ? " · " + cs.flexDirection + " gap " + cs.gap : ""),
        padding: cs.padding,
        fuente: `${cs.fontFamily.split(",")[0].replace(/"/g, "")} ${cs.fontWeight} ${cs.fontSize}/${cs.lineHeight}`,
        color: cs.color,
        fondo: corto(cs.backgroundColor) + " " + corto(cs.backgroundImage),
        borde: corto(cs.border) + (cs.borderRadius !== "0px" ? " radio " + cs.borderRadius : ""),
        sombra: corto(cs.boxShadow),
      };
    };
    return bloques.map(([n, s]) => fila(n, s)).filter(Boolean);
  }, BLOQUES);
}

async function guardarImagenes(contexto, textos, dir) {
  const origen = new URL(BASE).origin;
  const urls = new Set();
  for (const t of textos) for (const m of t.matchAll(/(?:url\(&quot;|url\("|(?:src|href)=")([^"&]+?)(?:&quot;\)|"\)|")/g)) if (m[1].startsWith(origen) && !/\.(jsx?|mjs|css|html)(\?|$)/.test(m[1])) urls.add(m[1]);
  const mapa = new Map();
  const usados = new Set();
  fs.mkdirSync(path.join(dir, "img"), { recursive: true });
  for (const u of urls) {
    const r = await contexto.request.get(u).catch(() => null);
    if (!r || !r.ok()) continue;
    let nombre = path.basename(new URL(u).pathname).replace(/[^a-zA-Z0-9._-]/g, "_");
    const carpeta = path.basename(path.dirname(new URL(u).pathname));
    if (usados.has(nombre)) nombre = carpeta + "-" + nombre;
    usados.add(nombre);
    fs.writeFileSync(path.join(dir, "img", nombre), await r.body());
    mapa.set(u, "img/" + nombre);
  }
  return (t) => {
    for (const [u, local] of mapa) t = t.split(u).join(local);
    return t.split(origen + "/").join("");
  };
}

function tablaSpec(filas) {
  const cab = "| Bloque | Selector | x, y · ancho×alto | position | display | padding | fuente | color | fondo | borde | sombra |\n|---|---|---|---|---|---|---|---|---|---|---|\n";
  return cab + filas.map((f) => `| ${f.nombre} | \`${f.sel}\` | ${f.caja} | ${f.position} | ${f.display} | ${f.padding} | ${f.fuente} | ${f.color} | ${f.fondo.trim()} | ${f.borde} | ${f.sombra} |`.replace(/\n/g, " ")).join("\n");
}

(async () => {
  const nav = await chromium.launch();
  const contextos = {};
  for (const [nombre, op] of DISPOSITIVOS) contextos[nombre] = await nav.newContext(op);
  for (const [nivel, carpeta, region, primera] of RUTAS) {
    const dir = path.join(SALIDA, carpeta);
    fs.mkdirSync(dir, { recursive: true });
    console.log("→ " + nivel);
    const htmls = {};
    const specs = {};
    const todas = new Map();
    let extras = new Set();
    let ordenHojas = [];
    for (const [disp] of DISPOSITIVOS) {
      const p = await abrir(contextos[disp], nivel, primera);
      const css = await cssUsado(p);
      css.hojas.forEach((h) => ordenHojas.includes(h) || ordenHojas.push(h));
      css.reglas.forEach((r) => todas.set(r.clave, r));
      css.extras.forEach((e) => extras.add(e));
      htmls[disp] = await htmlLimpio(p, `AI Español · Ruta ${nivel} · ${region} (${disp})`);
      specs[disp] = await medir(p);
      await p.screenshot({ path: path.join(dir, `captura-${disp}.jpg`), type: "jpeg", quality: 82 });
      await p.close();
    }
    // CSS: en el orden original de las hojas; por hoja, un comentario con su fichero de origen
    const reglas = [...todas.values()].sort((a, b) => ordenHojas.indexOf(a.hoja) - ordenHojas.indexOf(b.hoja) || a.k - b.k);
    let css = "";
    let hojaActual = "";
    for (const r of reglas) {
      if (r.hoja !== hojaActual) css += `\n\n/* ===== ${(hojaActual = r.hoja)} ===== */\n`;
      css += r.texto + "\n";
    }
    // @keyframes y @font-face solo si se usan
    const usadosExtra = [...extras].filter((e) => {
      const kf = e.match(/^@keyframes\s+([\w-]+)/);
      if (kf) return new RegExp("\\b" + kf[1] + "\\b").test(css);
      const ff = e.match(/font-family:\s*"?([^";]+)"?/);
      if (e.startsWith("@font-face") && ff) return css.includes(ff[1]);
      return true;
    });
    css = `/* AI Español · Ruta ${nivel} (${region}) — solo las reglas que usa esta pantalla, extraídas del CSS real de la app.\n   Cada bloque indica el fichero de origen en src/styles. */\n` + css + "\n\n/* ===== @keyframes / @font-face / @property usados ===== */\n" + usadosExtra.join("\n");
    const localizar = await guardarImagenes(contextos.escritorio, [css, ...Object.values(htmls)], dir);
    fs.writeFileSync(path.join(dir, "estilos.css"), beautify.css(localizar(css), { indent_size: 2 }));
    for (const [disp, html] of Object.entries(htmls))
      fs.writeFileSync(path.join(dir, `index-${disp}.html`), beautify.html(localizar(html), { indent_size: 2, wrap_line_length: 0, preserve_newlines: false, inline: [], extra_liners: [] }));
    fs.writeFileSync(
      path.join(dir, "layout-spec.md"),
      `# Layout spec · Ruta ${nivel} · ${region}\n\nMedidas reales tomadas en el navegador (px; «y» es desde el principio de la página). Progreso de ejemplo: unidad ${primera} terminada y la clase 1 de la unidad ${primera + 1} hecha, para que se vean los estados hecha / actual / bloqueada.\n\n## Escritorio (1366×860)\n\n${tablaSpec(specs.escritorio)}\n\n## Móvil (390×844)\n\n${tablaSpec(specs.movil)}\n`
    );
  }
  await nav.close();
  console.log("Listo en " + SALIDA);
})();
