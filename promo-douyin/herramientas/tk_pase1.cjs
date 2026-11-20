const { abrir, avanzar, estado } = require('./tk_comun.cjs');
(async () => {
  const t0 = Date.now();
  const { browser, page } = await abrir({ dsf: 1, query: '?auto=1' });
  await page.waitForTimeout(3000);
  await avanzar(page, 4000, 100, 30);
  console.log('tras carga', await page.evaluate(() => document.querySelector('.wk-titulo') ? 'menu' : 'no'));
  await page.mouse.click(195, 760); await avanzar(page, 1200);
  await page.getByText('SELECCIONAR').click({ timeout: 5000 }); await avanzar(page, 1200);
  await page.getByText('¡A CORRER!').click({ timeout: 5000 });
  let st;
  for (let i = 0; i < 400; i++) { await avanzar(page, 100, 100, 20); st = await estado(page); if (st === 'countdown') break; }
  console.log('countdown en', (Date.now() - t0) / 1000, 's reales');
  await page.evaluate(() => window.__semilla(777));
  let f = 0;
  const tReal = Date.now();
  for (; f < 30 * 60; f++) {
    await page.clock.runFor(33.333);
    if (f % 15 === 0) {
      const info = await page.evaluate(() => {
        const g = window.__tkr.game; const r = g.race; const k = r?.karts?.[0]?.state;
        const reto = document.querySelector('.wk-reto:not(.oculto)');
        const aviso = document.querySelector('.wk-aviso:not(.oculto)');
        return { st: g.state, v: k ? Math.round(k.speed ?? 0) : null, reto: reto ? reto.innerText.replace(/\s+/g, ' ').slice(0, 80) : '', aviso: aviso ? aviso.innerText.replace(/\s+/g, ' ').slice(0, 60) : '' };
      });
      console.log(f, JSON.stringify(info));
    }
  }
  console.log('real/frame', (Date.now() - tReal) / f, 'ms');
  await browser.close();
})();
