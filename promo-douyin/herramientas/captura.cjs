// Uso: node captura.cjs <ruta-hash> <salida.png> [espera_ms] [ancho] [alto] [dsf]
// Ej.: node captura.cjs "#/modulos" capturas/unidades.png 2500
// Abre la app local logueada (modo demo) a 390x844 y dsf 3 y guarda la captura.
const { chromium } = require('playwright');
(async () => {
  const [ruta = '#/', salida = 'captura.png', espera = '2500', w = '390', h = '844', dsf = '3'] = process.argv.slice(2);
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: +dsf, isMobile: true, hasTouch: true, locale: 'zh-CN' });
  await ctx.addInitScript(() => {
    sessionStorage.setItem('dele_auth', 'true');
    sessionStorage.setItem('dele_expiry', String(Date.now() + 3e6));
  });
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:5173/' + ruta, { waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(+espera);
  await page.screenshot({ path: salida });
  await browser.close();
})();
