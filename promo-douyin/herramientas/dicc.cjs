// Uso: node dicc.cjs <consulta> <salida_resultados.png> <salida_ficha.png>
const { chromium } = require('playwright');
(async () => {
  const [q, out1, out2] = process.argv.slice(2);
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, locale: 'zh-CN' });
  await ctx.addInitScript(() => {
    sessionStorage.setItem('dele_auth', 'true');
    sessionStorage.setItem('dele_expiry', String(Date.now() + 3e6));
    sessionStorage.setItem('mono-fab-pista', '1');
  });
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:5173/#/diccionarios', { waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(2500);
  await page.fill('.dz-buscador input', q);
  await page.waitForTimeout(1500);
  await page.evaluate(() => { document.querySelector('.dz-portadilla').scrollIntoView({ block: 'start' }); window.scrollBy(0, 150); });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: out1 });
  await page.locator('.dz-ficha').first().click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: out2 });
  await browser.close();
})();
