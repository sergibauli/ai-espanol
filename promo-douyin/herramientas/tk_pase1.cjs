const { abrir, estado, pulsar } = require('./tk_comun.cjs');
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);
const ff = async (page, ms, n = 1) => { for (let i = 0; i < n; i++) { await page.clock.fastForward(ms); await page.waitForTimeout(10); } };
(async () => {
  const { browser, page } = await abrir({ dsf: 1, query: '?auto=1&sim=1' });
  await page.waitForTimeout(3000);
  for (let i = 0; i < 60; i++) { await ff(page, 200); if (await page.evaluate(() => !!document.querySelector('.wk-titulo'))) break; }
  log('menu');
  await page.evaluate(() => document.querySelector('.wk-titulo').click()); await ff(page, 300, 4);
  log('sel', await pulsar(page, 'SELECCIONAR')); await ff(page, 300, 4);
  log('run', await pulsar(page, '¡A CORRER!'));
  let st;
  for (let i = 0; i < 300; i++) { await ff(page, 200); st = await estado(page); if (st === 'countdown') break; if (i % 20 === 0) log('esperando', st); }
  log('estado', st);
  await page.evaluate(() => window.__semilla(777));
  for (let f = 0; f < 240; f++) {
    await page.clock.fastForward(250);
    const info = await page.evaluate(() => {
      const g = window.__tkr.game; const r = g.race; const k = r?.karts?.[0]?.state;
      const reto = document.querySelector('.wk-reto:not(.oculto)');
      const aviso = document.querySelector('.wk-aviso:not(.oculto)');
      return { st: g.state, v: k ? Math.round(k.speed ?? 0) : null, reto: reto ? reto.innerText.replace(/\s+/g, ' ').slice(0, 80) : '', aviso: aviso ? aviso.innerText.replace(/\s+/g, ' ').slice(0, 60) : '' };
    });
    log((f * 0.25).toFixed(2), JSON.stringify(info));
  }
  await browser.close();
})();
