// Uso: node scripts/cap2.cjs <ruta> <prefijo-salida> <w> <h> [paso1|paso2…]  · paso = texto a pulsar, "css:selector", "key:x" o "wait:ms"; captura tras cada paso
const { chromium } = require('playwright');
(async () => {
  const [,, route, out, w, h, pasos] = process.argv;
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: +w||1366, height: +h||860 } });
  p.on('pageerror', e => console.log('PAGEERROR', e.message));
  await p.addInitScript(() => { sessionStorage.setItem('dele_auth','true'); sessionStorage.setItem('dele_expiry', String(Date.now()+3600e3)); });
  await p.goto('http://localhost:5173/#' + route); await p.waitForTimeout(+process.env.WAIT||5000);
  await p.screenshot({ path: out + '-0.png' });
  let n = 1;
  for (const t of (pasos||'').split('|').filter(Boolean)) {
    try {
      if (t.startsWith('wait:')) await p.waitForTimeout(+t.slice(5));
      else if (t.startsWith('eval:')) console.log(await p.evaluate(t.slice(5)));
      else if (t.startsWith('key:')) await p.keyboard.press(t.slice(4));
      else if (t.startsWith('css:')) await p.locator(t.slice(4)).first().click({timeout:4000});
      else await p.getByText(t, {exact:false}).first().click({timeout:4000});
      await p.waitForTimeout(+process.env.STEP||1200);
    } catch(e){ console.log('noclick', t); }
    await p.screenshot({ path: out + '-' + (n++) + '.png' });
  }
  await b.close();
})();
