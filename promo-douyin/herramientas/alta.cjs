// Uso: node alta.cjs <ruta> <salida.png> <alto_css> [scroll_inicio_css]
// Captura alta (simula scroll): 390 x alto_css a dsf 3 (alto_css <= 2533 para N <= 7600 px).
const { chromium } = require('playwright');
(async () => {
  const [ruta, salida, alto = '2500', desde = '0'] = process.argv.slice(2);
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, locale: 'zh-CN' });
  await ctx.addInitScript(() => {
    sessionStorage.setItem('dele_auth', 'true');
    sessionStorage.setItem('dele_expiry', String(Date.now() + 3e6));
    sessionStorage.setItem('mono-fab-pista', '1');
    document.addEventListener('DOMContentLoaded', () => { const st = document.createElement('style'); st.textContent = '.mf{display:none!important}'; document.head.appendChild(st); });
  });
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:5173/' + ruta, { waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(2500);
  // Recorre la página para disparar cargas perezosas y animaciones de entrada
  for (let y = 0; y < +desde + +alto; y += 400) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(400); }
  await page.evaluate(() => window.scrollTo(0, 0));
  // Oculta lo fijo de la mitad inferior (barra de navegación) para que no salga a media captura
  await page.evaluate(() => { for (const el of document.querySelectorAll('body *')) { const cs = getComputedStyle(el); if (cs.position === 'fixed' && el.getBoundingClientRect().top > 400) el.style.setProperty('display', 'none', 'important'); } });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: salida, fullPage: true, clip: { x: 0, y: +desde, width: 390, height: +alto } });
  await browser.close();
})();
