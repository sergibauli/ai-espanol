const { chromium } = require('playwright');
const OUT = process.argv[2]; const rutas = process.argv.slice(3);
(async () => {
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'] });
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, locale: 'zh-CN' });
  await ctx.addInitScript(() => { sessionStorage.setItem('dele_auth','true'); sessionStorage.setItem('dele_expiry', String(Date.now()+3e9)); });
  const page = await ctx.newPage();
  for (const r of rutas) {
    await page.goto('http://127.0.0.1:5173/#' + r, { waitUntil: 'domcontentloaded' }).catch(()=>{});
    await page.waitForTimeout(3500);
    const name = r.replace(/[^a-z0-9]+/gi, '_');
    await page.screenshot({ path: `${OUT}/${name}.png` });
    const btns = await page.evaluate(() => [...document.querySelectorAll('button, a')].filter(b => b.offsetParent).map(b => b.innerText.replace(/\s+/g,' ').trim()).filter(Boolean).slice(0, 30));
    console.log(r, JSON.stringify(btns));
  }
  await browser.close();
})();
