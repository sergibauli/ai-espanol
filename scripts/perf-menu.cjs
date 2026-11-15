// Mide ms por paso al desplazar la barra lateral (escritorio, pantalla baja) y el menú «Más» en móvil
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const medir = async (p, sel) => p.evaluate(async (sel) => {
    const el = document.querySelector(sel); if (!el) return 'no existe ' + sel;
    const t = performance.now();
    for (let i = 0; i < 20; i++) { el.scrollBy(0, 30); await new Promise((r) => requestAnimationFrame(r)); }
    for (let i = 0; i < 20; i++) { el.scrollBy(0, -30); await new Promise((r) => requestAnimationFrame(r)); }
    return Math.round((performance.now() - t) / 40) + ' ms/paso (alto ' + el.scrollHeight + '/' + el.clientHeight + ')';
  }, sel);
  for (const [w, h, ruta, sel, abrir] of [[1366, 640, '/juegos', '.side-nav', null], [1366, 640, '/ruta', '.side-nav', null], [390, 700, '/juegos', '.in-mas, .in-mas__lista, [class*="in-mas"]', '.in-barra a:last-child, .in-barra button:last-child']]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.addInitScript(() => { sessionStorage.setItem('dele_auth', 'true'); sessionStorage.setItem('dele_expiry', String(Date.now() + 3600e3)); });
    await p.goto('http://localhost:5173/#' + ruta); await p.waitForTimeout(5500);
    if (abrir) { try { await p.locator(abrir).first().click({ timeout: 3000 }); await p.waitForTimeout(800); } catch (e) { console.log('no abre', abrir); } }
    const sc = await p.evaluate((sel) => { const c = [...document.querySelectorAll(sel + ', ' + sel + ' *')].find((e) => e.scrollHeight > e.clientHeight + 20 && /(auto|scroll)/.test(getComputedStyle(e).overflowY)); if (c) c.setAttribute('data-medir', ''); return c ? c.className.toString().slice(0, 40) : 'ninguno'; }, sel);
    console.log(w + 'x' + h, ruta, 'scroller:', sc, await medir(p, '[data-medir]'));
    await p.close();
  }
  await b.close();
})();
