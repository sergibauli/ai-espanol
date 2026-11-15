// Imagen larga con TODO el recorrido de cada ruta (A1, A2, B1, B2), tal como se ve al bajar con el scroll.
// El paisaje de fondo es sticky (100vh) y el camino pasa por encima, así que se hacen capturas de pantalla
// consecutivas y se cosen (con Python/Pillow). En escritorio se recorta a la columna del mapa (.ruta-main).
// Uso: VITE_SIN_CLERK=1 npx vite --port 5173  y luego  node scripts/exportar-rutas-recorrido.cjs <salida>
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const BASE = process.env.BASE || "http://localhost:5173/";
const SALIDA = path.resolve(process.argv[2] || "rutas-doubao");
const RUTAS = [["A1", "A1-pekin-norte"], ["A2", "A2-ruta-seda"], ["B1", "B1-este-china"], ["B2", "B2-sur-oeste"]];

async function recorrido(contexto, nivel, destino, recortar) {
  const p = await contexto.newPage();
  await p.addInitScript(() => {
    sessionStorage.setItem("dele_auth", "true");
    sessionStorage.setItem("dele_expiry", String(Date.now() + 3600e3));
    localStorage.setItem("ai-espanol:onboarded", "1");
  });
  await p.goto(BASE + "#/ruta?nivel=" + nivel);
  await p.waitForSelector(".rn-niveles", { timeout: 30000 });
  await p.waitForTimeout(4000);
  const vp = p.viewportSize();
  const tmp = fs.mkdtempSync(path.join(require("os").tmpdir(), "rec-"));
  const trozos = [];
  const total = await p.evaluate(() => document.scrollingElement.scrollHeight);
  for (let y = 0, i = 0; ; y += vp.height, i++) {
    const real = await p.evaluate((y) => (window.scrollTo(0, y), window.scrollY), y);
    await p.waitForTimeout(1300);
    if (i === 1)
      // Tras la primera pantalla se ocultan barras fijas/sticky (salvo el paisaje) para que no se repitan
      await p.evaluate(() => {
        document.querySelectorAll("body *").forEach((n) => {
          const pos = getComputedStyle(n).position;
          if ((pos === "fixed" || pos === "sticky") && !n.closest(".mr-mundo")) n.style.visibility = "hidden";
        });
      });
    let clip = { x: 0, y: 0, width: vp.width, height: vp.height };
    if (recortar) {
      const r = await p.evaluate(() => {
        const b = document.querySelector(".ruta-main").getBoundingClientRect();
        return { x: Math.max(0, b.left), w: b.width };
      });
      clip = { x: Math.round(r.x), y: 0, width: Math.round(Math.min(r.w, vp.width - r.x)), height: vp.height };
    }
    const f = path.join(tmp, `t${String(i).padStart(3, "0")}.png`);
    await p.screenshot({ path: f, clip });
    trozos.push([f, real]);
    if (real + vp.height >= total || real < y) break;
  }
  await p.close();
  fs.writeFileSync(path.join(tmp, "trozos.json"), JSON.stringify(trozos));
  execFileSync("python3", ["-I", "-c", `
import json,sys
from PIL import Image
tr=json.load(open(sys.argv[1])); ims=[(Image.open(f).convert('RGB'),y) for f,y in tr]
k=ims[0][0].height/${vp.height}
W=ims[0][0].width; H=int((tr[-1][1])*k)+ims[-1][0].height
out=Image.new('RGB',(W,H))
for im,y in ims: out.paste(im,(0,int(y*k)))
if H>60000: out=out.resize((W*60000//H,60000))
out.save(sys.argv[2],quality=80,optimize=True,progressive=True)
print(out.size)`, path.join(tmp, "trozos.json"), destino], { stdio: "inherit" });
  fs.rmSync(tmp, { recursive: true });
}

(async () => {
  const nav = await chromium.launch();
  const esc = await nav.newContext({ viewport: { width: 1366, height: 860 }, deviceScaleFactor: 1 });
  const mov = await nav.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  for (const [nivel, carpeta] of RUTAS) {
    const dir = path.join(SALIDA, carpeta);
    fs.mkdirSync(dir, { recursive: true });
    console.log("→ " + nivel);
    await recorrido(esc, nivel, path.join(dir, `recorrido-completo-${nivel}-escritorio.jpg`), true);
    await recorrido(mov, nivel, path.join(dir, `recorrido-completo-${nivel}-movil.jpg`), false);
  }
  await nav.close();
})();
