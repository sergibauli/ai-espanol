// Uso: node paso.cjs <ruta> <salida.png> [js_a_ejecutar] [espera_ms] [ayuda] [full]
// HIDE_MONO=1 oculta el Rey Mono flotante.
// Ejecuta js (async, en la página) tras cargar, espera y captura. ayuda = código de idioma de ayuda (zh, en, fr...).
const { chromium } = require('playwright');
(async () => {
  const [ruta, salida, js = '', espera = '2500', ayuda = '', full = ''] = process.argv.slice(2);
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, locale: 'zh-CN' });
  await ctx.addInitScript((ayuda) => {
    sessionStorage.setItem('dele_auth', 'true');
    sessionStorage.setItem('dele_expiry', String(Date.now() + 3e6));
    sessionStorage.setItem('mono-fab-pista', '1');
    if (ayuda) localStorage.setItem('ai-espanol:idioma-ayuda', ayuda);
  }, ayuda);
  if (process.env.HIDE_MONO) await ctx.addInitScript(() => { document.addEventListener('DOMContentLoaded', () => { const st = document.createElement('style'); st.textContent = '.mf{display:none!important}'; document.head.appendChild(st); }); });
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:5173/' + ruta, { waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(2500);
  if (js) {
    const r = await page.evaluate(`(async()=>{${js}})()`).catch((e) => 'ERR ' + e.message);
    if (r !== undefined) console.log('js:', typeof r === 'string' ? r : JSON.stringify(r));
  }
  await page.waitForTimeout(+espera);
  await page.screenshot({ path: salida, fullPage: !!full });
  await browser.close();
})();
