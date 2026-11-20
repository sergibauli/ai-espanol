// Ruta (Aprender): demo de celebración y capturas desplazadas para una captura alta
const { chromium } = require('playwright');
const out = process.argv[2];
const modo = process.argv[3] || 'demo';
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, locale: 'zh-CN' });
  await ctx.addInitScript(() => {
    sessionStorage.setItem('dele_auth', 'true');
    sessionStorage.setItem('dele_expiry', String(Date.now() + 3e6));
  });
  const page = await ctx.newPage();
  if (modo === 'demo') {
    for (const d of ['clase', 'unidad']) {
      await page.goto(`http://127.0.0.1:5173/#/ruta?nivel=A1&demo=${d}`, { waitUntil: 'networkidle' }).catch(() => {});
      for (const t of [1500, 2500, 3500, 4500, 6000, 8000]) {
        await page.waitForTimeout(t - (page._t || 0)); page._t = t;
        await page.screenshot({ path: `${out}/demo-${d}-${t}.png` });
      }
      page._t = 0;
    }
  } else {
    await page.goto(`http://127.0.0.1:5173/#/ruta?nivel=${modo}`, { waitUntil: 'networkidle' }).catch(() => {});
    await page.waitForTimeout(5000);
    const info = await page.evaluate(() => {
      const els = [...document.querySelectorAll('*')].filter(e => { const s = getComputedStyle(e); return /(auto|scroll)/.test(s.overflowY) && e.scrollHeight > e.clientHeight + 50; });
      return { win: document.documentElement.scrollHeight, sY: scrollY, cont: els.map(e => e.className.toString().slice(0, 60) + ' ' + e.scrollHeight + '/' + e.clientHeight) };
    });
    console.log(JSON.stringify(info));
    let y0 = await page.evaluate(() => scrollY);
    for (let i = 0; i < 6; i++) {
      await page.screenshot({ path: `${out}/scroll-${modo}-${i}.png` });
      await page.evaluate(() => window.scrollBy(0, 560));
      await page.waitForTimeout(1800);
    }
  }
  await browser.close();
})();
