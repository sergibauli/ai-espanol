// Portada sin sesión: congela el vídeo de la puerta en varios instantes y captura además las secciones de abajo
const { chromium } = require('playwright');
(async () => {
  const out = process.argv[2];
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, locale: 'zh-CN' });
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:5173/#/', { waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(7000);
  const dur = await page.evaluate(() => document.querySelector('video').duration);
  console.log('dur', dur);
  for (const t of [1.0, 1.8, 2.4, 2.8, 3.2, 3.6]) {
    await page.evaluate(async (t) => { const v = document.querySelector('video'); v.pause(); v.currentTime = t; await new Promise(r => v.addEventListener('seeked', r, { once: true })); }, t);
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${out}/puerta-${t}.png` });
  }
  for (const y of [700, 1300, 2000, 2700, 3400]) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `${out}/portada-scroll-${y}.png` });
  }
  console.log('alto', await page.evaluate(() => document.documentElement.scrollHeight));
  await browser.close();
})();
