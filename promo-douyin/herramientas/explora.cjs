// node explora.cjs "<#/ruta>" salida.png [clicTexto1|clicTexto2...]  → captura y lista de botones visibles
const { chromium } = require('playwright');
(async () => {
  const [ruta, salida, clics = ''] = process.argv.slice(2);
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await ctx.addInitScript(() => { sessionStorage.setItem('dele_auth', 'true'); sessionStorage.setItem('dele_expiry', String(Date.now() + 3e6)); localStorage.setItem('dele_mono_oculto', '1'); });
  const p = await ctx.newPage();
  await p.goto('http://127.0.0.1:5173/' + ruta, { waitUntil: 'networkidle' }).catch(() => {});
  await p.waitForTimeout(2500);
  for (const c of clics.split('|').filter(Boolean)) {
    const el = p.getByText(c, { exact: false }).first();
    await el.click({ timeout: 4000 }).catch((e) => console.log('no clic', c));
    await p.waitForTimeout(1500);
  }
  await p.screenshot({ path: salida });
  const bot = await p.evaluate(() => [...document.querySelectorAll('button, a')].filter((e) => e.offsetParent).map((e) => e.innerText.replace(/\s+/g, ' ').trim()).filter(Boolean).slice(0, 40));
  console.log(bot.join(' | '));
  await b.close();
})();
