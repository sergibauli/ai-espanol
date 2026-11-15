// Uso: node scripts/perf.cjs <ruta> [ancho] [alto] → tareas largas al cargar, FPS al hacer scroll y coste de animaciones (CPU x4 como un móvil)
const { chromium } = require('playwright');
(async () => {
  const [,, ruta = '/ruta', w = 1366, h = 860] = process.argv;
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: +w, height: +h } });
  await p.addInitScript(() => {
    sessionStorage.setItem('dele_auth', 'true'); sessionStorage.setItem('dele_expiry', String(Date.now() + 3600e3));
    window.__largas = [];
    new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__largas.push(e.duration))).observe({ type: 'longtask', buffered: true });
  });
  const cdp = await p.context().newCDPSession(p);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: +(process.env.CPU || 4) });
  const t0 = Date.now();
  await p.goto(process.env.BASE || 'http://localhost:5173/#' + ruta, { waitUntil: 'load' });
  await p.waitForTimeout(6000);
  const carga = await p.evaluate(() => ({ largas: window.__largas.length, msBloqueo: Math.round(window.__largas.reduce((a, d) => a + Math.max(0, d - 50), 0)), max: Math.round(Math.max(0, ...window.__largas)) }));
  // FPS en reposo y haciendo scroll
  const fps = async (accion) => p.evaluate(async (accion) => {
    const marcos = []; let fin = false; let ult = performance.now();
    const bucle = (t) => { marcos.push(t - ult); ult = t; if (!fin) requestAnimationFrame(bucle); };
    requestAnimationFrame(bucle);
    const sc = [...document.querySelectorAll('*')].find((e) => e.scrollHeight > e.clientHeight + 200 && /(auto|scroll)/.test(getComputedStyle(e).overflowY)) || document.scrollingElement;
    if (accion === 'scroll') { for (let i = 0; i < 40; i++) { sc.scrollBy(0, 60); await new Promise((r) => setTimeout(r, 25)); } for (let i = 0; i < 40; i++) { sc.scrollBy(0, -60); await new Promise((r) => setTimeout(r, 25)); } }
    else await new Promise((r) => setTimeout(r, 2000));
    fin = true;
    const m = marcos.slice(2); const media = m.reduce((a, b) => a + b, 0) / m.length;
    return { fps: Math.round(1000 / media), lentos: m.filter((x) => x > 34).length, peor: Math.round(Math.max(...m)) };
  }, accion);
  const reposo = await fps('reposo');
  const scroll = await fps('scroll');
  const anim = await p.evaluate(() => ({ animaciones: document.getAnimations().length, nodos: document.querySelectorAll('*').length, blur: [...document.querySelectorAll('*')].filter((e) => { const c = getComputedStyle(e); return c.backdropFilter && c.backdropFilter !== 'none'; }).length }));
  console.log(ruta, JSON.stringify({ seg: Math.round((Date.now() - t0) / 100) / 10, ...carga, reposo, scroll, ...anim }));
  await b.close();
})();
