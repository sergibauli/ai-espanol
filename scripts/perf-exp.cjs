// Experimento: ms por paso de scroll en una ruta con distintos CSS inyectados
const { chromium } = require('playwright');
(async () => {
  const [,, ruta = '/ruta'] = process.argv;
  const pruebas = JSON.parse(process.env.PRUEBAS || '{"base":""}');

  const b = await chromium.launch();
  for (const [nombre, css] of Object.entries(pruebas)) {
    const p = await b.newPage({ viewport: { width: 1366, height: 860 } });
    await p.addInitScript(() => { sessionStorage.setItem('dele_auth', 'true'); sessionStorage.setItem('dele_expiry', String(Date.now() + 3600e3)); });
    await p.goto('http://localhost:5173/#' + ruta);
    await p.waitForTimeout(6000);
    if (css) await p.addStyleTag({ content: css });
    await p.waitForTimeout(500);
    const ms = await p.evaluate(async () => {
      const sc = [...document.querySelectorAll('*')].find((e) => e.scrollHeight > e.clientHeight + 200 && /(auto|scroll)/.test(getComputedStyle(e).overflowY)) || document.scrollingElement;
      const t = performance.now();
      for (let i = 0; i < 30; i++) { sc.scrollBy(0, 50); await new Promise((r) => requestAnimationFrame(r)); }
      return Math.round((performance.now() - t) / 30) + 'ms/paso scroller=' + (sc.className || sc.tagName).toString().slice(0, 30);
    });
    console.log(nombre.padEnd(11), ms);
    await p.close();
  }
  await b.close();
})();
