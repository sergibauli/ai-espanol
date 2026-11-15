// Exporta las cuatro rutas de «Aprender» (#/ruta?nivel=A1…B2) como HTML autónomo de un solo fichero
// (DOM renderizado + CSS usado + imágenes y fuentes en base64, sin scripts) y capturas de escritorio y móvil,
// para pasárselas a una IA de diseño (Doubao).
// Uso: con la app en marcha (VITE_SIN_CLERK=1 npx vite --port 5173):
//   node scripts/exportar-rutas-doubao.cjs <carpeta-salida>
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE || "http://localhost:5173/";
const SALIDA = path.resolve(process.argv[2] || "rutas-doubao");
const RUTAS = [
  ["A1", "A1-pekin-norte", "Ruta A1 · Pekín y el norte"],
  ["A2", "A2-ruta-seda", "Ruta A2 · La Ruta de la Seda"],
  ["B1", "B1-este-china", "Ruta B1 · El este de China"],
  ["B2", "B2-sur-oeste", "Ruta B2 · El sur y el oeste"],
];
const MAX_LADO = 1600; // px máximo de una imagen incrustada
const cache = new Map(); // url → data URI

async function sesion(pagina) {
  await pagina.addInitScript(() => {
    sessionStorage.setItem("dele_auth", "true");
    sessionStorage.setItem("dele_expiry", String(Date.now() + 3600e3));
    localStorage.setItem("ai-espanol:onboarded", "1");
  });
}

async function abrir(contexto, nivel) {
  const pagina = await contexto.newPage();
  await sesion(pagina);
  await pagina.goto(BASE + "#/ruta?nivel=" + nivel);
  await pagina.waitForSelector(".rn-niveles", { timeout: 30000 });
  await pagina.waitForTimeout(3000);
  // Recorre la página para que se carguen las imágenes perezosas y termine la entrada animada
  await pagina.evaluate(async () => {
    const alto = document.documentElement.scrollHeight;
    for (let y = 0; y < alto; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await pagina.waitForLoadState("networkidle").catch(() => {});
  await pagina.waitForTimeout(2500);
  return pagina;
}

// Imagen → data URI optimizada (se re-codifica en el navegador: WebP, lado máx. MAX_LADO)
async function aDataUri(pagina, url) {
  if (cache.has(url)) return cache.get(url);
  const r = await pagina.context().request.get(url).catch(() => null);
  if (!r || !r.ok()) return cache.set(url, url).get(url);
  const tipo = (r.headers()["content-type"] || "").split(";")[0];
  const cuerpo = await r.body();
  let uri = "data:" + tipo + ";base64," + cuerpo.toString("base64");
  if (/^image\/(png|jpeg|webp)/.test(tipo) && cuerpo.length > 30000) {
    const optim = await pagina.evaluate(
      async ({ uri, max }) => {
        const img = new Image();
        img.src = uri;
        await img.decode();
        const k = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
        const c = document.createElement("canvas");
        c.width = Math.round(img.naturalWidth * k);
        c.height = Math.round(img.naturalHeight * k);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        return c.toDataURL("image/webp", 0.82);
      },
      { uri, max: MAX_LADO }
    );
    if (optim.length < uri.length) uri = optim;
  }
  cache.set(url, uri);
  return uri;
}

// Google Fonts: solo subconjuntos latinos, woff2 incrustados
async function fuentesGoogle(pagina, hrefs) {
  let css = "";
  for (const href of hrefs) {
    const r = await pagina.context().request.get(href).catch(() => null);
    if (!r || !r.ok()) continue;
    const texto = await r.text();
    const bloques = texto.split(/(?=\/\* [a-z-]+ \*\/)/);
    for (const b of bloques) {
      if (!/^\/\* (latin|latin-ext) \*\//.test(b)) continue;
      let bloque = b;
      for (const m of b.matchAll(/url\((https:[^)]+)\)/g)) {
        const f = await pagina.context().request.get(m[1]);
        bloque = bloque.split(m[1]).join("data:font/woff2;base64," + (await f.body()).toString("base64"));
      }
      css += bloque;
    }
  }
  return css;
}

async function htmlAutonomo(pagina, titulo) {
  const datos = await pagina.evaluate((titulo) => {
    // CSS de todas las hojas, con url() resueltas a absolutas
    const fuentes = [];
    let css = "";
    for (const hoja of document.styleSheets) {
      if (hoja.href && hoja.href.includes("fonts.googleapis.com")) {
        fuentes.push(hoja.href);
        continue;
      }
      let reglas;
      try {
        reglas = hoja.cssRules;
      } catch {
        continue;
      }
      const base = hoja.href || location.href;
      for (const regla of reglas) {
        css +=
          regla.cssText.replace(/url\(\s*(["']?)([^"')]+)\1\s*\)/g, (t, q, u) =>
            u.startsWith("data:") || u.startsWith("#") ? t : 'url("' + new URL(u, base).href + '")'
          ) + "\n";
      }
    }
    // Enlaces a Google Fonts en <link>
    document.querySelectorAll("link[rel=stylesheet][href*='fonts.googleapis.com']").forEach((l) => fuentes.includes(l.href) || fuentes.push(l.href));

    const copia = document.documentElement.cloneNode(true);
    const lienzos = document.querySelectorAll("canvas");
    copia.querySelectorAll("canvas").forEach((lienzo, i) => {
      try {
        const img = document.createElement("img");
        img.src = lienzos[i].toDataURL("image/png");
        img.setAttribute("style", lienzo.getAttribute("style") || "");
        img.className = lienzo.className;
        lienzo.replaceWith(img);
      } catch {}
    });
    copia
      .querySelectorAll("script, style, link, #initial-loader, noscript, iframe, audio, video, [data-vite-dev-id]")
      .forEach((n) => n.remove());
    // Atributos de evento fuera
    copia.querySelectorAll("*").forEach((n) => {
      for (const a of [...n.attributes]) if (/^on/i.test(a.name)) n.removeAttribute(a.name);
    });
    // img/src y srcset → absolutos; estilos en línea con url()
    copia.querySelectorAll("img[src], image[href], use[href], source[srcset], img[srcset]").forEach((n) => {
      for (const at of ["src", "href"]) {
        const v = n.getAttribute(at);
        if (v && !v.startsWith("data:") && !v.startsWith("#")) n.setAttribute(at, new URL(v, location.href).href);
      }
      if (n.hasAttribute("srcset")) n.removeAttribute("srcset");
      n.removeAttribute("loading");
    });
    copia.querySelectorAll("[style*='url(']").forEach((n) => {
      n.setAttribute(
        "style",
        n.getAttribute("style").replace(/url\(\s*(&quot;|["']?)([^"')&]+)\1\s*\)/g, (t, q, u) =>
          u.startsWith("data:") || u.startsWith("#") ? t : 'url("' + new URL(u, location.href).href + '")'
        )
      );
    });
    // Desplazamiento al principio y enlaces inertes
    copia.querySelectorAll("a[href]").forEach((a) => a.setAttribute("href", "#"));
    const head = copia.querySelector("head");
    const meta = document.createElement("meta");
    meta.setAttribute("charset", "utf-8");
    head.prepend(meta);
    const vp = document.createElement("meta");
    vp.setAttribute("name", "viewport");
    vp.setAttribute("content", "width=device-width, initial-scale=1");
    head.appendChild(vp);
    const t = document.createElement("title");
    t.textContent = "AI Español · " + titulo;
    head.appendChild(t);
    const estilo = document.createElement("style");
    estilo.id = "__css__";
    estilo.textContent = "/*CSS*/";
    head.appendChild(estilo);
    return { html: "<!doctype html>\n" + copia.outerHTML, css, fuentes };
  }, titulo);

  let { html, css } = datos;
  const fuentesCss = await fuentesGoogle(pagina, datos.fuentes);
  // Quita @font-face de CSS de la app que apunten a fuentes no latinas pesadas? (se incrustan igual)
  const origen = new URL(BASE).origin;
  const urls = new Set();
  for (const texto of [css, html])
    for (const m of texto.matchAll(/(?:url\(&quot;|url\("|(?:src|href)=")([^"&]+?)(?:&quot;\)|"\)|")/g))
      if (m[1].startsWith(origen)) urls.add(m[1]);
  for (const u of urls) {
    if (/\.(jsx?|mjs|tsx?|html)(\?|$)/.test(u) || u.includes("/@vite")) continue;
    const uri = await aDataUri(pagina, u);
    css = css.split(u).join(uri);
    html = html.split(u).join(uri);
  }
  // Enlaces internos que hayan quedado apuntando al servidor
  html = html.split(origen + "/").join("#");
  html = html.replace("/*CSS*/", () => fuentesCss + "\n" + css + "\nhtml{scroll-behavior:auto}");
  return html;
}

// Imágenes del mapa: el paisaje (MundoRuta) está fijo detrás y el camino pasa por encima al hacer scroll,
// así que se guardan pantallas tal como las ve el alumno (01 = al entrar, 02, 03… = bajando)
// y, además, el camino completo de arriba abajo (captura de página entera).
async function capturar(pagina, base, pantallas = 4) {
  const vp = pagina.viewportSize();
  for (let i = 0; i < pantallas; i++) {
    await pagina.evaluate((y) => window.scrollTo(0, y), Math.round(i * vp.height * 0.85));
    await pagina.waitForTimeout(1200);
    await pagina.screenshot({ path: `${base}-pantalla-0${i + 1}.jpg`, type: "jpeg", quality: 84 });
  }
  await pagina.evaluate(() => window.scrollTo(0, 0));
  await pagina.waitForTimeout(800);
  await pagina.screenshot({ path: base + "-camino-completo.jpg", type: "jpeg", quality: 78, fullPage: true, clip: undefined });
}

(async () => {
  const navegador = await chromium.launch();
  const escritorio = await navegador.newContext({ viewport: { width: 1366, height: 860 }, deviceScaleFactor: 1 });
  const movil = await navegador.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  for (const [nivel, carpeta, titulo] of RUTAS) {
    const dir = path.join(SALIDA, carpeta);
    fs.mkdirSync(dir, { recursive: true });
    console.log("→ " + nivel);
    const pe = await abrir(escritorio, nivel);
    await capturar(pe, path.join(dir, "escritorio"));
    fs.writeFileSync(path.join(dir, "ruta-" + nivel + ".html"), await htmlAutonomo(pe, titulo));
    await pe.close();
    const pm = await abrir(movil, nivel);
    await capturar(pm, path.join(dir, "movil"));
    await pm.close();
  }
  await navegador.close();
  console.log("Listo en " + SALIDA);
})();
