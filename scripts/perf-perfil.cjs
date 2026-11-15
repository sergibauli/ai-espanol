// Uso: node scripts/perf-perfil.cjs <ruta> → en reposo: funciones JS que más tiempo gastan y reparto JS/estilo/pintado (traza)
const { chromium } = require('playwright');
(async () => {
  const [,, ruta = '/ruta'] = process.argv;
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1366, height: 860 } });
  await p.addInitScript(() => { sessionStorage.setItem('dele_auth', 'true'); sessionStorage.setItem('dele_expiry', String(Date.now() + 3600e3)); });
  await p.goto('http://localhost:5173/#' + ruta);
  await p.waitForTimeout(7000);
  const cdp = await p.context().newCDPSession(p);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: +(process.env.CPU || 1) });
  await p.evaluate(() => console.log(document.querySelectorAll('.ruta-unit').length));
  console.log('cv', await p.evaluate(() => [...document.querySelectorAll('.ruta-unit')].map((u) => getComputedStyle(u).contentVisibility[0]).join('')));
  await cdp.send('Profiler.enable');
  await cdp.send('Profiler.start');
  await b.startTracing(p, { categories: ['devtools.timeline'] });
  if (process.env.SCROLL) await p.evaluate(async () => { const sc = [...document.querySelectorAll('*')].find((e) => e.scrollHeight > e.clientHeight + 200 && /(auto|scroll)/.test(getComputedStyle(e).overflowY)) || document.scrollingElement; for (let i = 0; i < 60; i++) { sc.scrollBy(0, 50); await new Promise((r) => setTimeout(r, 30)); } });
  else await p.waitForTimeout(3000);
  const traza = JSON.parse((await b.stopTracing()).toString());
  const { profile } = await cdp.send('Profiler.stop');
  const porNodo = new Map(profile.nodes.map((n) => [n.id, n]));
  const propio = new Map();
  const dt = profile.timeDeltas; profile.samples.forEach((id, i) => { const n = porNodo.get(id); const k = `${n.callFrame.functionName || '(anón)'} ${n.callFrame.url.split('/').pop().split('?')[0]}:${n.callFrame.lineNumber + 1}`; propio.set(k, (propio.get(k) || 0) + (dt[i] || 0) / 1000); });
  console.log('JS en 3 s (ms propios):'); [...propio].sort((a, b) => b[1] - a[1]).slice(0, 14).forEach(([k, v]) => console.log('  ', Math.round(v), k));
  const suma = {}; for (const e of traza.traceEvents) if (e.ph === 'X' && e.dur) suma[e.name] = (suma[e.name] || 0) + e.dur / 1000;
  console.log('Traza (ms):', Object.entries(suma).filter(([k]) => /UpdateLayoutTree|Layout|Paint|Composite|RecalculateStyles|FunctionCall|TimerFire|FireAnimationFrame|EventDispatch|ParseHTML|HitTest|PrePaint|Layerize|RasterTask|ScrollLayer/.test(k)).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([k, v]) => `${k}=${Math.round(v)}`).join('  '));
  await b.close();
})();
