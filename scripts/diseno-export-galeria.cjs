// Genera index.html (galería) y copia el README dentro de la carpeta exportada por exportar-disenos.cjs
// Uso: node scripts/diseno-export-galeria.cjs [carpeta]
const fs = require("fs");
const path = require("path");
const carpeta = path.resolve(process.argv[2] || "diseno-export");
const pantallas = JSON.parse(fs.readFileSync(path.join(carpeta, "pantallas.json"), "utf8"));
fs.copyFileSync(path.join(__dirname, "diseno-export-README.md"), path.join(carpeta, "README.md"));
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const tarjetas = pantallas
  .map(
    (p) => `<article class="t">
  <header><span class="n">${esc(p.id.slice(0, 2))}</span><div><h2>${esc(p.titulo)}</h2><code>#${esc(p.ruta)}</code></div>
  <a class="b" href="html/${p.id}.html">Abrir HTML</a></header>
  <div class="c"><a href="capturas/escritorio/${p.id}.png"><img loading="lazy" src="capturas/escritorio/${p.id}.png" alt="${esc(p.titulo)} · escritorio"></a>
  <a class="m" href="capturas/movil/${p.id}.png"><img loading="lazy" src="capturas/movil/${p.id}.png" alt="${esc(p.titulo)} · móvil"></a></div>
</article>`,
  )
  .join("\n");
const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>AI Español · Pantallas</title>
<style>
:root{--laca:#c8102e;--oro:#c8961e;--tinta:#3b2416;--papel:#fbf1dc;--fondo:#0e1a33}
*{box-sizing:border-box}body{margin:0;background:var(--fondo);color:var(--papel);font:15px/1.5 system-ui,sans-serif;padding:24px 16px}
h1{font:700 28px/1.2 Georgia,serif;margin:0 0 6px;color:#f2c14e}p.i{margin:0 0 24px;max-width:70ch;color:#e9dcc0}
.g{display:grid;gap:20px;grid-template-columns:repeat(auto-fill,minmax(min(100%,520px),1fr))}
.t{background:var(--papel);color:var(--tinta);border-radius:14px;padding:14px;box-shadow:0 0 0 2px var(--oro)}
.t header{display:flex;gap:10px;align-items:center;margin-bottom:10px}.t h2{font-size:16px;margin:0}.t code{font-size:12px;color:#6b4a2b}
.n{background:var(--laca);color:#fff;font-weight:800;border-radius:8px;padding:4px 8px}.t header div{flex:1;min-width:0}
.b{background:var(--laca);color:#fff;text-decoration:none;font-weight:700;padding:8px 12px;border-radius:999px;white-space:nowrap}
.c{display:flex;gap:10px;align-items:flex-start;max-height:420px;overflow:hidden}.c img{width:100%;display:block;border-radius:8px;border:1px solid #e0c48a}
.c>a:first-child{flex:3}.c>a.m{flex:1}
</style></head><body>
<h1>AI Español · ${pantallas.length} pantallas actuales</h1>
<p class="i">Galería para el rediseño. Cada tarjeta muestra la captura de escritorio (1366 px) y de móvil (390 px); «Abrir HTML» abre la pantalla como HTML estático autónomo. Lee <a style="color:#f2c14e" href="README.md">README.md</a> para la estética, las restricciones y el formato de entrega.</p>
<main class="g">${tarjetas}</main></body></html>`;
fs.writeFileSync(path.join(carpeta, "index.html"), html);
console.log("index.html con " + pantallas.length + " pantallas");
