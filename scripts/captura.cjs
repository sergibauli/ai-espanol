const { chromium } = require('playwright');
(async () => {
  const [,, route, out, w, h, clickText] = process.argv;
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: +w||1366, height: +h||860 } });
  await p.addInitScript(() => { sessionStorage.setItem('dele_auth','true'); sessionStorage.setItem('dele_expiry', String(Date.now()+3600e3)); });
  await p.goto('http://localhost:5173/#' + route); await p.waitForTimeout(+process.env.WAIT||12000);
  if (clickText) for (const t of clickText.split('|')) { try { await p.getByText(t, {exact:false}).first().click({timeout:4000}); await p.waitForTimeout(1500);} catch(e){ console.log('noclick',t); } }
  await p.screenshot({ path: out, fullPage: false });
  await b.close();
})();
