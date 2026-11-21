// Portada sin sesión: capturas a varios tiempos para elegir el mejor fotograma del vídeo de la puerta
const { chromium } = require('playwright');
(async () => {
  const out = process.argv[2] || '/tmp';
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, locale: 'zh-CN' });
  const page = await ctx.newPage();
  page.on('console', m => { if (m.type() === 'error') console.log('ERR', m.text().slice(0, 200)); });
  await page.goto('http://127.0.0.1:5173/#/', { waitUntil: 'networkidle' }).catch(() => {});
  for (const t of [1500, 3000, 5000, 8000]) {
    await page.waitForTimeout(t - (page._last || 0)); page._last = t;
    const info = await page.evaluate(() => [...document.querySelectorAll('video')].map(v => ({ src: v.currentSrc, t: v.currentTime, paused: v.paused, rs: v.readyState, err: v.error && v.error.code })));
    console.log(t, JSON.stringify(info));
    await page.screenshot({ path: `${out}/portada-t${t}.png` });
  }
  await browser.close();
})();
