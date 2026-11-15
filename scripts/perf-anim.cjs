// Uso: node scripts/perf-anim.cjs <ruta> → animaciones agrupadas por nombre, propiedades que animan y si el elemento está en pantalla
const { chromium } = require('playwright');
(async () => {
  const [,, ruta = '/ruta', w = 1366, h = 860] = process.argv;
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: +w, height: +h } });
  await p.addInitScript(() => { sessionStorage.setItem('dele_auth', 'true'); sessionStorage.setItem('dele_expiry', String(Date.now() + 3600e3)); });
  await p.goto('http://localhost:5173/#' + ruta);
  await p.waitForTimeout(7000);
  const r = await p.evaluate(() => {
    const g = {};
    for (const a of document.getAnimations()) {
      const el = a.effect?.target; if (!el) continue;
      const nombre = a.animationName || a.transitionProperty || 'waapi';
      const props = [...new Set((a.effect.getKeyframes?.() || []).flatMap((k) => Object.keys(k).filter((x) => !['offset', 'easing', 'composite', 'computedOffset'].includes(x))))].join(',');
      const rc = el.getBoundingClientRect(); const vis = rc.bottom > 0 && rc.top < innerHeight && rc.width > 0;
      const cls = (el.className?.baseVal ?? el.className ?? '').toString().split(' ')[0] || el.tagName;
      const k = `${nombre} [${props}] .${cls}`;
      g[k] = g[k] || { n: 0, vis: 0, inf: a.effect.getTiming().iterations === Infinity };
      g[k].n++; if (vis) g[k].vis++;
    }
    return Object.entries(g).sort((a, b) => b[1].n - a[1].n).slice(0, 28).map(([k, v]) => `${v.n}${v.inf ? '∞' : ''} (vis ${v.vis}) ${k}`);
  });
  console.log(r.join('\n'));
  await b.close();
})();
