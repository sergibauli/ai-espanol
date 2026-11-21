// Turbo Rush sin reloj falso: portada, pilotos, y ráfaga de JPEG en carrera lo más rápido posible.
const { abrir, estado, pulsar } = require('./tk_comun.cjs');
const fs = require('fs');
const O = '/home/user/wukong-espanol/promo-douyin/capturas/juegos';
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);
(async () => {
  fs.mkdirSync(O + '/turbo', { recursive: true });
  const { browser, page } = await abrir({ dsf: 3, query: '?auto=1', reloj: false });
  for (let i = 0; i < 60; i++) { await page.waitForTimeout(500); if (await page.evaluate(() => !!document.querySelector('.wk-titulo'))) break; }
  await page.waitForTimeout(3000);
  await page.screenshot({ path: O + '/turbo_portada.png', timeout: 180000 }); log('portada');
  await page.evaluate(() => document.querySelector('.wk-titulo').click()); await page.waitForTimeout(2500);
  await page.screenshot({ path: O + '/turbo_pilotos.png', timeout: 180000 }); log('pilotos');
  await pulsar(page, 'SELECCIONAR'); await page.waitForTimeout(2500);
  await page.screenshot({ path: O + '/turbo_circuitos.png', timeout: 180000 }); log('circuitos');
  await pulsar(page, '¡A CORRER!');
  for (let i = 0; i < 240; i++) { await page.waitForTimeout(500); if ((await estado(page)) === 'racing') break; }
  log('racing');
  await page.waitForTimeout(4000);
  const t0 = Date.now(); let n = 0;
  while (n < 75 && Date.now() - t0 < 300000) {
    n++;
    await page.screenshot({ path: `${O}/turbo/f_${String(n).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 88, timeout: 180000 });
    if (n % 20 === 0) {
      const info = await page.evaluate(() => { const r = document.querySelector('.wk-reto:not(.oculto)'); return r ? r.innerText.replace(/\s+/g,' ').slice(0,60) : ''; });
      log(n, (Date.now() - t0) / n, 'ms/frame', info);
    }
  }
  log('fin', n, (Date.now() - t0) / n);
  await browser.close();
})();
