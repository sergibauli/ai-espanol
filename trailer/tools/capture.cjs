// Captura pantallas reales de la app (móvil 390×844 @3x = 1170×2532).  node tools/capture.cjs <dirSalida> /ruta1 /ruta2 …
// Opcional: CLICK="Texto1|Texto2" pulsa esos textos tras cargar; WAIT=ms. La app compilada se sirve en http://localhost:5173
const { chromium } = require(process.env.PW || 'playwright');
(async () => {
  const [, , out, ...routes] = process.argv;
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  await ctx.addInitScript(() => { sessionStorage.setItem('dele_auth', 'true'); sessionStorage.setItem('dele_expiry', String(Date.now() + 3600e3)); });
  for (const r of routes) {
    const p = await ctx.newPage();
    try {
      await p.goto('http://localhost:5173/#' + r); await p.waitForTimeout(+process.env.WAIT || 9000);
      if (process.env.CLICK) for (const t of process.env.CLICK.split('|')) { try { await p.getByText(t, { exact: false }).first().click({ timeout: 4000 }); await p.waitForTimeout(2000); } catch { console.log('noclick', t); } }
      await p.screenshot({ path: out + '/' + (r.replace(/[\/?=&]/g, '_').slice(1) || 'home') + '.jpg', type: 'jpeg', quality: 92 }); console.log('ok', r);
    } catch (e) { console.log('fail', r, e.message.slice(0, 80)); }
    await p.close();
  }
  await b.close();
})();
