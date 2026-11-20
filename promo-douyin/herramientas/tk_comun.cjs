// Utilidades comunes para capturar Wukong Turbo Rush (reloj falso, login demo, azar con semilla).
const { chromium } = require('playwright');
const BASE = 'http://127.0.0.1:5173/';
async function abrir({ w = 390, h = 844, dsf = 3, query = '', ruta = '#/juegos/turbo-kart?m=3', reloj = true } = {}) {
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: dsf, isMobile: true, hasTouch: true, locale: 'zh-CN' });
  await ctx.addInitScript(() => {
    sessionStorage.setItem('dele_auth', 'true');
    sessionStorage.setItem('dele_expiry', String(Date.now() + 3e9));
    // Azar reproducible y re-sembrable.
    let s = 20261120;
    window.__semilla = (n) => { s = n >>> 0; };
    Math.random = () => { s |= 0; s = (s + 0x6d2b79f5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    // Sin síntesis de voz: los retos salen siempre con la palabra en chino.
    try { delete Window.prototype.speechSynthesis; } catch {}
    try { Object.defineProperty(window, 'speechSynthesis', { value: undefined, configurable: true }); delete window.speechSynthesis; } catch {}
  });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => console.log('PAGEERR', String(e).slice(0, 200)));
  if (reloj) await page.clock.install({ time: new Date('2026-11-20T10:00:00') });
  page.goto(BASE + query + ruta, { waitUntil: 'commit' }).catch(() => {});
  return { browser, ctx, page };
}
// Avanza el reloj falso dejando respirar a la red/JS real entre pasos.
async function avanzar(page, ms, paso = 100, real = 15) {
  for (let t = 0; t < ms; t += paso) { await page.clock.runFor(Math.min(paso, ms - t)); if (real) await page.waitForTimeout(real); }
}
const estado = (page) => page.evaluate(() => window.__tkr?.game?.state ?? null);
module.exports = { abrir, avanzar, estado };
