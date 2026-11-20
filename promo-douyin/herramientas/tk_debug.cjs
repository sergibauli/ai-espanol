const { abrir, avanzar, estado, pulsar } = require('./tk_comun.cjs');
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);
(async () => {
  const { browser, page } = await abrir({ dsf: 1, query: '?auto=1' });
  await page.waitForTimeout(3000);
  for (let i = 0; i < 60; i++) { await avanzar(page, 200, 100, 30); if (await page.evaluate(() => !!document.querySelector('.wk-titulo'))) break; }
  log('menu');
  await page.evaluate(() => { setTimeout(() => document.querySelector('.wk-titulo').click(), 0); }); log('clicked');
  for (let i = 0; i < 12; i++) { const t = Date.now(); await page.clock.runFor(100); log('runFor', i, Date.now() - t); }
  await page.screenshot({ path: '/tmp/claude-0/-home-user-wukong-espanol/c1aef8ec-85a0-52ac-a980-960c55d24b6d/scratchpad/tk/dbg1.png' }); log('shot');
  await browser.close();
})();
