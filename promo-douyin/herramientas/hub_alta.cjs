const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, locale: 'zh-CN' });
  await ctx.addInitScript(() => { sessionStorage.setItem('dele_auth','true'); sessionStorage.setItem('dele_expiry', String(Date.now()+3e9)); });
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:5173/#/juegos', { waitUntil: 'domcontentloaded' }).catch(()=>{});
  await page.waitForTimeout(6000);
  // Oculta lo fijo (barra inferior) para que no se repita en la captura alta.
  await page.addStyleTag({ content: '*{scroll-behavior:auto!important}' });
  await page.evaluate(() => { for (const el of document.querySelectorAll('body *')) { const s = getComputedStyle(el); if (s.position === 'fixed' && el.getBoundingClientRect().top > 500) el.style.display = 'none'; } });
  for (let y = 0; y < 2900; y += 400) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(250); }
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(800);
  await page.screenshot({ path: '/home/user/wukong-espanol/promo-douyin/capturas/juegos/pabellon_alta.png', fullPage: true, clip: { x: 0, y: 0, width: 390, height: 2530 }, timeout: 120000 });
  await browser.close();
})();
