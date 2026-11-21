// Saca fotogramas sueltos para revisar: node vistazo.cjs <pagina.html> <salida_prefijo> t1 t2 ...
const { chromium } = require('playwright');
(async () => {
  const [pag, pref, ...ts] = process.argv.slice(2);
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  p.on('console', (m) => { if (['error','warning'].includes(m.type())) console.log('[pág]', m.text()); });
  p.on('pageerror', (e) => console.log('[error]', e.message));
  await p.goto('http://127.0.0.1:8765/promo-douyin/film/' + pag);
  await p.waitForFunction(() => window.LISTO === true, null, { timeout: 120000 });
  for (const t of ts) { const t0 = Date.now(); await p.evaluate((x) => window.pintar(+x), t); await p.screenshot({ path: `${pref}_${t}.jpg`, type: 'jpeg', quality: 85 }); console.log(t, Date.now() - t0, 'ms'); }
  await b.close();
})();
