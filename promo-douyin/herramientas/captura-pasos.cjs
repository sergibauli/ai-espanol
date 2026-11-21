// Uso: node captura-pasos.cjs "<#/ruta>" <salida.png> '<pasos JSON>' [--semilla] [--botones] [--alta]
// Pasos: [{"click":"texto"}|{"sel":"css"}|{"wait":ms}|{"scroll":y}|{"eval":"js"}|{"shot":"otra.png"}]
// Como captura.cjs (390x844, dsf 3, móvil, logueado). --semilla siembra progreso verosímil (herramientas/semilla-progreso.js).
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const args = process.argv.slice(2);
  const flags = new Set(args.filter((a) => a.startsWith('--')));
  const [ruta = '#/', salida = 'captura.png', pasosRaw = '[]'] = args.filter((a) => !a.startsWith('--'));
  const pasos = JSON.parse(pasosRaw);
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, locale: 'zh-CN' });
  await ctx.addInitScript(() => {
    sessionStorage.setItem('dele_auth', 'true');
    sessionStorage.setItem('dele_expiry', String(Date.now() + 3e6));
    sessionStorage.setItem('mono-fab-pista', '1');
  });
  if (flags.has('--sinmono')) await ctx.addInitScript(() => {
    const st = () => { const s = document.createElement('style'); s.textContent = '.mf{display:none!important}'; document.head.appendChild(s); };
    if (document.head) st(); else document.addEventListener('DOMContentLoaded', st);
  });
  if (flags.has('--semilla')) await ctx.addInitScript({ path: path.join(__dirname, 'semilla-progreso.js') });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => console.error('pageerror:', e.message));
  await page.goto('http://127.0.0.1:5173/' + ruta, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
  await page.waitForTimeout(2500);
  for (const p of pasos) {
    try {
      if (p.click) await page.getByText(p.click, { exact: !!p.exact }).nth(p.n || 0).click({ timeout: 8000 });
      if (p.sel) await page.locator(p.sel).nth(p.n || 0).click({ timeout: 8000 });
      if (p.wait) await page.waitForTimeout(p.wait);
      if (p.scroll != null) await page.evaluate((y) => window.scrollTo(0, y), p.scroll);
      if (p.into) await page.getByText(p.into).nth(p.n || 0).scrollIntoViewIfNeeded();
      if (p.eval) console.log('eval:', JSON.stringify(await page.evaluate(p.eval)));
      if (p.shot) await page.screenshot({ path: p.shot, timeout: 60000 });
    } catch (e) {
      console.error('paso fallido', JSON.stringify(p), e.message.split('\n')[0]);
    }
    await page.waitForTimeout(400);
  }
  await page.waitForTimeout(800);
  if (flags.has('--botones')) {
    const t = await page.evaluate(() => [...document.querySelectorAll('button,a')].filter((b) => b.offsetParent).map((b) => b.innerText.replace(/\s+/g, ' ').trim()).filter(Boolean).slice(0, 80));
    console.log('botones:', JSON.stringify(t));
  }
  // Palabras prohibidas en el vídeo (DELE, IA/AI): zonas visibles normalizadas 0–1 para taparlas
  const alta = flags.has('--alta');
  const tapar = await page.evaluate((alta) => {
    const re = /DELE|\bIA\b|\bAI|人工智能|智能/;
    const W = innerWidth, H = alta ? document.documentElement.scrollHeight : innerHeight, sy = alta ? scrollY : 0;
    const out = [];
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) {
      const n = w.currentNode;
      if (!re.test(n.textContent)) continue;
      const el = n.parentElement; const cs = el && getComputedStyle(el);
      if (!el || cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) continue;
      const r = document.createRange(); r.selectNodeContents(n);
      for (const b of r.getClientRects()) {
        const top = b.top + sy;
        if (b.width < 2 || b.bottom < 0 || (!alta && b.top > H) || b.right < 0 || b.left > W) continue;
        out.push({ texto: n.textContent.trim().slice(0, 60), x: +(Math.max(0, b.left - 4) / W).toFixed(3), y: +(Math.max(0, top - 4) / H).toFixed(3), w: +((b.width + 8) / W).toFixed(3), h: +((b.height + 8) / H).toFixed(3) });
      }
    }
    return out;
  }, alta);
  console.log('tapar:', JSON.stringify(tapar));
  await page.screenshot({ path: salida, fullPage: alta, timeout: 60000 });
  await browser.close();
})();
