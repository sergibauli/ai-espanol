// Secuencia JPEG 30 fps del mapa de la ruta desplazándose (reloj controlado para que sea fluida y determinista)
const { chromium } = require('playwright');
const fs = require('fs');
const [out, nivel = 'A1', frames = '90', paso = '11'] = process.argv.slice(2);
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, locale: 'zh-CN' });
  await ctx.addInitScript(() => {
    sessionStorage.setItem('dele_auth', 'true');
    sessionStorage.setItem('dele_expiry', String(Date.now() + 3e6));
  });
  const page = await ctx.newPage();
  await page.clock.install();
  await page.goto(`http://127.0.0.1:5173/#/ruta?nivel=${nivel}`, { waitUntil: 'networkidle' }).catch(() => {});
  for (let i = 0; i < 40; i++) { await page.clock.runFor(200); await page.waitForTimeout(60); }
  // ease in-out del desplazamiento total
  const total = +frames * +paso;
  const y0 = await page.evaluate(() => scrollY);
  for (let f = 0; f < +frames; f++) {
    const p = f / (+frames - 1);
    const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(y0 + e * total));
    await page.clock.runFor(33.33);
    await page.screenshot({ path: `${out}/f${String(f).padStart(3, '0')}.jpg`, type: 'jpeg', quality: 90 });
  }
  await browser.close();
})();
