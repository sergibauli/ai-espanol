// Tiempo desde que se pulsa un enlace del menú hasta que la nueva pantalla tiene contenido (CPU x4, móvil o escritorio)
const { chromium } = require('playwright');
(async () => {
  const w = +(process.env.W || 390), h = +(process.env.H || 844);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.addInitScript(() => { sessionStorage.setItem('dele_auth', 'true'); sessionStorage.setItem('dele_expiry', String(Date.now() + 3600e3)); });
  await p.goto('http://localhost:5173/#/juegos'); await p.waitForTimeout(8000);
  const cdp = await p.context().newCDPSession(p);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  const destinos = (process.env.DESTINOS || '/modulos,/oficial,/mi-dele,/juegos,/diccionarios,/pronunciacion,/memoria,/ruta,/juegos').split(',');
  for (const d of destinos) {
    const ms = await p.evaluate(async (d) => {
      const enlace = [...document.querySelectorAll(`a[href="#${d}"]`)].find((a) => a.offsetParent);
      if (!enlace) return 'sin enlace visible';
      const antes = location.hash;
      const textoAntes = document.querySelector('main')?.innerText.slice(0, 300);
      const t = performance.now();
      enlace.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
      enlace.click();
      // primer frame con la ruta nueva y sin cargador
      for (let i = 0; i < 400; i++) {
        await new Promise((r) => requestAnimationFrame(r));
        const cargando = document.querySelector('.page-loader, [class*="loader"]:not(.initial-loader)');
        const texto = document.querySelector('main')?.innerText || '';
        if (location.hash !== antes && !cargando && texto.length > 80 && texto.slice(0, 300) !== textoAntes) return Math.round(performance.now() - t) + ' ms';
      }
      return 'más de 400 frames';
    }, d);
    console.log(d.padEnd(16), ms);
    await p.waitForTimeout(1500);
  }
  await b.close();
})();
