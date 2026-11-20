// Captura alta de la ruta (mapa por mundos) para simular scroll: fullPage recortada a ~2530 px CSS (≤7600 px reales)
const { chromium } = require('playwright');
const [out, nivel = 'A1', alto = '2530'] = process.argv.slice(2);
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, locale: 'zh-CN' });
  await ctx.addInitScript(() => {
    sessionStorage.setItem('dele_auth', 'true');
    sessionStorage.setItem('dele_expiry', String(Date.now() + 3e6));
  });
  const page = await ctx.newPage();
  await page.goto(`http://127.0.0.1:5173/#/ruta?nivel=${nivel}`, { waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(5000);
  // recorre la página para que se construyan los caminos perezosos y vuelve arriba
  for (let y = 0; y < +alto + 1000; y += 400) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(250); }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(2500);
  await page.screenshot({ path: out, fullPage: true, clip: { x: 0, y: 0, width: 390, height: +alto } });
  await browser.close();
})();
