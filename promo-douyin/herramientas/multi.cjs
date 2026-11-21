// Uso: node multi.cjs <dir> ruta1=nombre1 ruta2=nombre2 ... (espera 3500)
const { chromium } = require('playwright');
(async () => {
  const [dir, ...pares] = process.argv.slice(2);
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, locale: 'zh-CN' });
  await ctx.addInitScript(() => {
    sessionStorage.setItem('dele_auth', 'true');
    sessionStorage.setItem('dele_expiry', String(Date.now() + 3e6));
  });
  for (const p of pares) {
    const i = p.lastIndexOf('=');
    const ruta = p.slice(0, i), nombre = p.slice(i + 1);
    const page = await ctx.newPage();
    await page.goto('http://127.0.0.1:5173/' + ruta, { waitUntil: 'networkidle' }).catch(() => {});
    await page.waitForTimeout(3500);
    await page.screenshot({ path: `${dir}/${nombre}.png` });
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    console.log(nombre, 'scrollHeight', h);
    await page.close();
  }
  await browser.close();
})();
