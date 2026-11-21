// Abre la ruta, pulsa EMPEZAR, abre la ficha de clase y juega la lección contestando bien todo.
// Captura cada paso (antes y después de comprobar) y la pantalla final.
// Uso: node aprender-leccion.cjs <dir_salida> [nivel] [leccion_k]
const { chromium } = require('playwright');
const fs = require('fs');
const [out, nivel = 'A1', leccionK = ''] = process.argv.slice(2);
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, locale: 'zh-CN' });
  await ctx.addInitScript(() => {
    sessionStorage.setItem('dele_auth', 'true');
    sessionStorage.setItem('dele_expiry', String(Date.now() + 3e6));
    try { window.speechSynthesis.speak = () => {}; } catch {}
  });
  const page = await ctx.newPage();
  const shot = async (n) => { await page.screenshot({ path: `${out}/${n}.png` }); console.log('shot', n); };
  await page.goto(`http://127.0.0.1:5173/#/ruta?nivel=${nivel}`, { waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(5000);
  await page.locator('.rp-empezar').first().click({ force: true });
  await page.waitForTimeout(1500);
  await shot('00-ficha');
  if (leccionK !== '') await page.locator('.rf-leccion').nth(+leccionK).click();
  else await page.locator('.rf-cta').first().click();
  await page.waitForSelector('.lp-root', { timeout: 15000 });
  await page.waitForTimeout(1500);
  const lesson = await page.evaluate(() => {
    const el = document.querySelector('.lp-root');
    const k = Object.keys(el).find((x) => x.startsWith('__reactFiber'));
    let f = el[k];
    while (f && !(f.memoizedProps && f.memoizedProps.lesson)) f = f.return;
    return f && f.memoizedProps.lesson;
  });
  fs.writeFileSync(`${out}/lesson.json`, JSON.stringify(lesson, null, 1));
  console.log('steps', lesson.steps.map((s) => s.type).join(','));
  const TEACH = new Set(['learn', 'speak', 'tip', 'dialog']);
  for (let i = 0; i < lesson.steps.length; i++) {
    const s = lesson.steps[i];
    const n = String(i + 1).padStart(2, '0') + '-' + s.type;
    await page.waitForTimeout(900);
    await shot(n + '-a');
    if (TEACH.has(s.type)) {
      await page.locator('.lp-foot .lp-btn').click();
      continue;
    }
    if (s.type === 'match') {
      for (const p of s.pairs) {
        await page.locator('.ej-parejas__col').nth(0).locator('button', { hasText: p.a }).first().click();
        await page.waitForTimeout(150);
        await page.locator('.ej-parejas__col').nth(1).locator('button', { hasText: p.b }).first().click();
        await page.waitForTimeout(250);
        if (p === s.pairs[s.pairs.length - 2]) await shot(n + '-casi');
      }
      await page.waitForTimeout(800);
      continue;
    }
    if (['choice', 'listen'].includes(s.type)) await page.locator('.ej-opcion').nth(s.answer).click();
    else if (s.type === 'pictures') await page.locator('.ej-carta').nth(s.answer).click();
    else if (s.type === 'tf') await page.locator(s.answer ? '.es-verdad' : '.es-falso').click();
    else if (s.type === 'build') {
      const words = s.answer.split(/\s+/);
      const used = new Set();
      const norm = (x) => x.toLowerCase().replace(/[.,!?¡¿]/g, '');
      for (const w of words) {
        let idx = s.tiles.findIndex((t, j) => !used.has(j) && t === w);
        if (idx < 0) idx = s.tiles.findIndex((t, j) => !used.has(j) && norm(t) === norm(w));
        used.add(idx);
        await page.locator('.ej-fichas .ej-ficha').nth(idx).click();
        await page.waitForTimeout(120);
      }
    } else if (s.type === 'type') {
      await page.locator('.ej-input').fill(String(s.answer).split(/\s*\/\s*/)[0]);
    }
    await page.waitForTimeout(400);
    await shot(n + '-b');
    await page.locator('.lp-foot .lp-btn').click();
    for (const t of [250, 700, 1500]) { await page.waitForTimeout(t === 250 ? 250 : t - (t === 700 ? 250 : 700)); await shot(n + '-c' + t); }
    await page.locator('.lp-foot .lp-btn').click();
  }
  for (const t of [600, 1500, 3000]) { await page.waitForTimeout(t === 600 ? 600 : t - (t === 1500 ? 600 : 1500)); await shot('99-fin-' + t); }
  await browser.close();
})();
