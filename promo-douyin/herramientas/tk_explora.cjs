const { chromium } = require('playwright');
const OUT = process.argv[2];
(async () => {
  const browser = await chromium.launch({args:['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, locale: 'zh-CN' });
  await ctx.addInitScript(() => { sessionStorage.setItem('dele_auth','true'); sessionStorage.setItem('dele_expiry', String(Date.now()+3e6)); });
  const page = await ctx.newPage();
  page.on('console', m => { if (m.type()==='error') console.log('ERR', m.text().slice(0,200)); });
  await page.goto('http://127.0.0.1:5173/#/juegos/turbo-kart', { waitUntil: 'networkidle' }).catch(()=>{});
  await page.waitForTimeout(2000);
  await page.screenshot({ path: OUT+'/a_elegir.png' });
  await page.goto('http://127.0.0.1:5173/#/juegos/turbo-kart?m=3', { waitUntil: 'networkidle' }).catch(()=>{});
  await page.waitForTimeout(6000);
  await page.screenshot({ path: OUT+'/b_portada.png' });
  await page.mouse.click(195, 700);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: OUT+'/c_pilotos.png' });
  await page.getByText('SELECCIONAR').click().catch(e=>console.log('sel',e.message));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: OUT+'/d_circuitos.png' });
  await page.getByText('¡A CORRER!').click().catch(e=>console.log('run',e.message));
  for (let i=0;i<8;i++){ await page.waitForTimeout(1500); await page.screenshot({ path: OUT+`/e_carrera${i}.png` }); }
  await browser.close();
})();
