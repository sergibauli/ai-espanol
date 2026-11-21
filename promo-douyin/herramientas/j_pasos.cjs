// Uso: node j_pasos.cjs <dir_salida> <dsf> '<json acciones>'
// acciones: {goto:"/juegos/x"} {click:"texto"} {css:"selector", n?:0} {xy:[x,y]} {wait:ms} {shot:"nombre"} {full:"nombre"} {list:true} {key:"Enter"} {eval:"js"}
const { chromium } = require('playwright');
const [OUT, dsf, json] = process.argv.slice(2);
const acciones = JSON.parse(json);
(async () => {
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'] });
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: +dsf, isMobile: true, hasTouch: true, locale: 'zh-CN' });
  await ctx.addInitScript(() => { sessionStorage.setItem('dele_auth','true'); sessionStorage.setItem('dele_expiry', String(Date.now()+3e9)); });
  const page = await ctx.newPage();
  page.on('pageerror', e => console.log('PAGEERR', String(e).slice(0,200)));
  for (const a of acciones) {
    try {
      if (a.goto) { await page.goto('http://127.0.0.1:5173/#' + a.goto, { waitUntil: 'domcontentloaded' }).catch(()=>{}); await page.waitForTimeout(3000); }
      if (a.click) await page.getByText(a.click, { exact: !!a.exact }).nth(a.n || 0).click({ timeout: 5000, force: !!a.force });
      if (a.btn) await page.locator('button', { hasText: a.btn }).nth(a.n || 0).click({ timeout: 5000, force: true });
      if (a.css) await page.locator(a.css).nth(a.n || 0).click({ timeout: 5000, force: true });
      if (a.tap) await page.locator(a.tap).nth(a.n || 0).tap({ timeout: 5000, force: true });
      if (a.xy) await page.mouse.click(a.xy[0], a.xy[1]);
      if (a.key) await page.keyboard.press(a.key);
      if (a.eval) console.log('EVAL', JSON.stringify(await page.evaluate(a.eval)).slice(0, 3000));
      if (a.wait) await page.waitForTimeout(a.wait);
      if (a.shot) await page.screenshot({ path: `${OUT}/${a.shot}.png` });
      if (a.full) await page.screenshot({ path: `${OUT}/${a.full}.png`, fullPage: true });
      if (a.list) console.log('BTN', JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('button, a, [role=button]')].filter(b => b.offsetParent).map(b => (b.innerText || b.getAttribute('aria-label') || '').replace(/\s+/g,' ').trim().slice(0,50)).filter(Boolean).slice(0, 60))));
    } catch (e) { console.log('FALLO', JSON.stringify(a), e.message.split('\n')[0]); }
  }
  await browser.close();
})();
