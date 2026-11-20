// Renderiza la película fotograma a fotograma con Chromium (WebGL por SwiftShader).
// Uso: node herramientas/render.cjs <desde> <hasta> <carpeta> [escala]
//   p. ej. node herramientas/render.cjs 0 1700 fotogramas
// Requiere el servidor: node herramientas/servidor.cjs 8765
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const [desde = '0', hasta = '30', carpeta = 'fotogramas', escala = '1', calidad = '94'] = process.argv.slice(2);
  fs.mkdirSync(carpeta, { recursive: true });
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--disable-gpu-vsync'] });
  const page = await browser.newPage({ viewport: { width: Math.round(1080 * +escala), height: Math.round(1920 * +escala) }, deviceScaleFactor: 1 });
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') console.log('[pág]', m.text()); });
  page.on('pageerror', (e) => console.log('[error]', e.message));
  await page.goto(`http://127.0.0.1:8765/promo-douyin/film/index.html?escala=${escala}${process.env.VERSION === "corta" ? "&version=corta" : ""}`);
  await page.waitForFunction(() => window.LISTO === true, null, { timeout: 180000 });
  const FPS = await page.evaluate(() => window.FPS);
  const t0 = Date.now();
  for (let f = +desde; f < +hasta; f++) {
    await page.evaluate((t) => window.pintar(t), f / FPS);
    await page.screenshot({ path: path.join(carpeta, `f_${String(f).padStart(5, '0')}.jpg`), type: 'jpeg', quality: +calidad });
    if ((f - +desde) % 30 === 0) console.log(`fotograma ${f} · ${((Date.now() - t0) / (f - +desde + 1)).toFixed(0)} ms/f`);
  }
  await browser.close();
})();
