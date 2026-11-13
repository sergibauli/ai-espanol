// Exporta cada pantalla de la app como HTML autónomo (DOM renderizado + CSS + recursos locales)
// y capturas de página completa en escritorio y móvil, para pasárselas a un diseñador.
// Uso: con el servidor de desarrollo en marcha (VITE_SIN_CLERK=1 npx vite --port 5173):
//   node scripts/exportar-disenos.cjs [carpeta-salida] [filtro]
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE || "http://localhost:5173/";
const SALIDA = path.resolve(process.argv[2] || "diseno-export");
const FILTRO = process.argv[3] || "";
const ALTO_MAX = 9000; // las páginas muy largas (rutas) se recortan a este alto en la captura

// [id, título, ruta, conSesión, textos a pulsar en orden, espera extra ms]
const PANTALLAS = [
  ["01-portada", "Portada (sin sesión)", "/", false],
  ["02-login", "Acceso / iniciar sesión", "/login", false],
  ["03-ruta-A1", "Ruta de aprendizaje · A1 (Pekín)", "/ruta?nivel=A1", true],
  ["04-ruta-A2", "Ruta de aprendizaje · A2 (Ruta de la Seda)", "/ruta?nivel=A2", true],
  ["05-ruta-B1", "Ruta de aprendizaje · B1 (Este de China)", "/ruta?nivel=B1", true],
  ["06-ruta-B2", "Ruta de aprendizaje · B2 (Sur y oeste)", "/ruta?nivel=B2", true],
  ["07-unidades", "Lista de unidades", "/modulos", true],
  ["08-unidad", "Unidad por dentro (clase 1: guía, lecciones, diálogos, ejercicios…)", "/modulos/modulo-8?clase=1", true],
  ["09-unidad-leccion", "Lección (reproductor de lección)", "/modulos/modulo-1?clase=1", true, ["Empezar"]],
  ["10-unidad-lectura-cultura", "Unidad · Lectura y cultura", "/modulos/modulo-1?clase=2", true, ["Lectura y cultura"]],
  ["11-unidad-examen", "Unidad · Examen de la clase", "/modulos/modulo-1?clase=1", true, ["Examen de la", "Empezar examen"]],
  ["12-dele-hub", "DELE · elegir nivel", "/oficial", true],
  ["13-dele-nivel", "DELE · nivel A2 (modelos)", "/oficial/A2", true],
  ["14-dele-examen-lectura", "DELE · examen oficial · Comprensión de lectura", "/oficial/A2/13", true],
  ["15-dele-examen-audicion", "DELE · examen oficial · Comprensión auditiva", "/oficial/A2/13", true, ["Comprensión auditiva", "Ver transcripción"]],
  ["16-dele-examen-escritura", "DELE · examen oficial · Expresión escrita", "/oficial/A2/13", true, ["Expresión e interacción escritas"]],
  ["17-dele-examen-oral", "DELE · examen oficial · Expresión oral", "/oficial/A2/13", true, ["Expresión e interacción orales"]],
  ["18-examenes-practica", "Exámenes de práctica", "/examenes", true],
  ["19-generador-examenes", "Generador de exámenes", "/examenes/generador", true],
  ["20-mi-dele", "Mi DELE (panel del alumno)", "/mi-dele", true],
  ["21-diagnostico", "Diagnóstico de nivel", "/diagnostico", true],
  ["22-juegos", "Juegos (hub)", "/juegos", true],
  ["23-juego-mapa-mental", "Juego · Mapa mental", "/juegos/mapa-mental?m=8&clase=1", true],
  ["24-juego-teatro", "Juego · Teatro de diálogos", "/juegos/teatro?m=3&clase=1", true],
  ["25-juego-dragon-jade", "Juego · Dragón de jade", "/juegos/dragon-jade?m=55&clase=1", true, ["Jugar"]],
  ["26-juego-escape-palacio", "Juego · Escape del palacio", "/juegos/escape-palacio?m=8&clase=1", true],
  ["27-juego-kahoot", "Juego · Kahoot", "/juegos/kahoot", true],
  ["28-juego-memory", "Juego · Memory", "/juegos/memory", true],
  ["29-juego-ahorcado", "Juego · Ahorcado", "/juegos/ahorcado", true],
  ["30-diccionario", "Diccionario", "/diccionarios", true],
  ["31-pronunciacion", "Pronunciación", "/pronunciacion", true],
  ["32-repaso", "Repaso (memoria / SRS)", "/memoria", true],
  ["33-tutor-ia", "Tutor IA", "/tutor-voz", true],
  ["34-examinador-oral", "Examinador oral", "/examinador-oral", true],
  ["35-gramatica", "Gramática", "/gramatica", true],
  ["36-consejos", "Consejos", "/consejos", true],
  ["37-ayudas", "Ayudas", "/ayudas", true],
  ["38-videos", "Vídeos", "/videos", true],
  ["39-audicion", "Audición (acentos)", "/audicion", true],
  ["40-promo", "Presentación (promo)", "/promo", true],
];

const recursosDescargados = new Map(); // url absoluta → ruta relativa dentro de recursos/

function rutaLocal(urlAbs) {
  const u = new URL(urlAbs);
  let p = decodeURIComponent(u.pathname).replace(/^\/+/, "");
  if (p.startsWith("@fs/")) p = "fs/" + path.basename(p);
  p = p.replace(/[?#].*$/, "").replace(/[^a-zA-Z0-9._\/-]/g, "_");
  if (!path.extname(p)) p += ".bin";
  return "recursos/" + p;
}

async function descargar(contexto, urlAbs) {
  if (recursosDescargados.has(urlAbs)) return recursosDescargados.get(urlAbs);
  const local = rutaLocal(urlAbs);
  recursosDescargados.set(urlAbs, local);
  try {
    const r = await contexto.request.get(urlAbs);
    if (r.ok()) {
      const destino = path.join(SALIDA, local);
      fs.mkdirSync(path.dirname(destino), { recursive: true });
      fs.writeFileSync(destino, await r.body());
    }
  } catch {}
  return local;
}

// Reescribe url(...), src, href y srcset que apunten al servidor local hacia ../recursos/...
async function localizar(contexto, texto, baseUrl) {
  const origen = new URL(BASE).origin;
  const encontrados = new Set();
  const patrones = [/url\(&quot;()([^&]+)&quot;\)/g, /url\(\s*(['"]?)([^'")&]+)\1\s*\)/g, /\s(?:src|href|poster)=("|')([^"']+)\1/g];
  for (const re of patrones) for (const m of texto.matchAll(re)) encontrados.add(m[2]);
  for (const m of texto.matchAll(/\ssrcset=("|')([^"']+)\1/g)) m[2].split(",").forEach((s) => encontrados.add(s.trim().split(/\s+/)[0]));
  for (const original of encontrados) {
    if (!original || original.startsWith("data:") || original.startsWith("#") || original.startsWith("%23") || original.startsWith("blob:") || original.startsWith("javascript:")) continue;
    let abs;
    try {
      abs = new URL(original.replace(/&amp;/g, "&"), baseUrl).href;
    } catch {
      continue;
    }
    if (!abs.startsWith(origen)) continue; // externos (Google Fonts…) se dejan tal cual
    if (/\.(jsx?|mjs|tsx?)(\?|$)/.test(abs) || abs.includes("/@vite") || abs.includes("/node_modules/.vite")) continue;
    const local = await descargar(contexto, abs);
    texto = texto.split(original).join("../" + local);
  }
  return texto;
}

async function prepararPagina(contexto, pantalla, viewport) {
  const [, , ruta, conSesion, clics = [], extra = 0] = pantalla;
  const pagina = await contexto.newPage({ viewport });
  if (conSesion)
    await pagina.addInitScript(() => {
      sessionStorage.setItem("dele_auth", "true");
      sessionStorage.setItem("dele_expiry", String(Date.now() + 3600e3));
    });
  await pagina.goto(BASE + "#" + ruta);
  await pagina.waitForTimeout(6500 + extra);
  for (const texto of clics) {
    try {
      await pagina.getByText(texto, { exact: false }).first().click({ timeout: 5000 });
      await pagina.waitForTimeout(2200);
    } catch {
      console.log("   (no se pudo pulsar «" + texto + "»)");
    }
  }
  return pagina;
}

async function capturar(pagina, archivo) {
  const alto = Math.min(ALTO_MAX, await pagina.evaluate(() => Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)));
  const ancho = pagina.viewportSize().width;
  // Las páginas con scroll interno se capturan a su alto real
  await pagina.screenshot({ path: archivo, clip: { x: 0, y: 0, width: ancho, height: Math.max(alto, pagina.viewportSize().height) }, fullPage: true });
}

async function htmlAutonomo(contexto, pagina, titulo) {
  const html = await pagina.evaluate((tituloPantalla) => {
    let css = "";
    for (const hoja of document.styleSheets) {
      try {
        css += Array.from(hoja.cssRules).map((r) => r.cssText).join("\n") + "\n";
      } catch {}
    }
    const copia = document.documentElement.cloneNode(true);
    // Lienzos → imagen fija (juegos y efectos)
    const originales = document.querySelectorAll("canvas");
    copia.querySelectorAll("canvas").forEach((lienzo, i) => {
      try {
        const img = document.createElement("img");
        img.src = originales[i].toDataURL("image/png");
        img.setAttribute("style", lienzo.getAttribute("style") || "");
        img.className = lienzo.className;
        img.width = originales[i].width;
        img.height = originales[i].height;
        lienzo.replaceWith(img);
      } catch {}
    });
    copia.querySelectorAll("script, style, link[rel=stylesheet][href^='/'], link[rel=modulepreload], link[rel=manifest], #initial-loader, noscript").forEach((n) => n.remove());
    copia.querySelectorAll("[data-vite-dev-id]").forEach((n) => n.remove());
    const head = copia.querySelector("head");
    const meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    meta.setAttribute("content", "Exportación estática de la pantalla «" + tituloPantalla + "» de AI Español (sin JavaScript).");
    head.prepend(meta);
    const estilo = document.createElement("style");
    estilo.textContent = css;
    head.appendChild(estilo);
    copia.querySelector("title") && (copia.querySelector("title").textContent = "AI Español · " + tituloPantalla);
    return "<!doctype html>\n" + copia.outerHTML;
  }, titulo);
  return localizar(contexto, html, pagina.url());
}

(async () => {
  fs.mkdirSync(path.join(SALIDA, "html"), { recursive: true });
  fs.mkdirSync(path.join(SALIDA, "capturas", "escritorio"), { recursive: true });
  fs.mkdirSync(path.join(SALIDA, "capturas", "movil"), { recursive: true });
  const navegador = await chromium.launch();
  const escritorio = await navegador.newContext({ viewport: { width: 1366, height: 860 }, deviceScaleFactor: 1 });
  const movil = await navegador.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const indice = [];
  for (const pantalla of PANTALLAS) {
    const [id, titulo, ruta] = pantalla;
    if (FILTRO && !id.includes(FILTRO)) continue;
    console.log("→ " + id + "  " + ruta);
    const pe = await prepararPagina(escritorio, pantalla, { width: 1366, height: 860 });
    await capturar(pe, path.join(SALIDA, "capturas", "escritorio", id + ".png"));
    fs.writeFileSync(path.join(SALIDA, "html", id + ".html"), await htmlAutonomo(escritorio, pe, titulo));
    await pe.close();
    const pm = await prepararPagina(movil, pantalla, { width: 390, height: 844 });
    await capturar(pm, path.join(SALIDA, "capturas", "movil", id + ".png"));
    await pm.close();
    indice.push({ id, titulo, ruta });
  }
  fs.writeFileSync(path.join(SALIDA, "pantallas.json"), JSON.stringify(indice, null, 2));
  await navegador.close();
  console.log("Listo: " + indice.length + " pantallas en " + SALIDA);
})();
