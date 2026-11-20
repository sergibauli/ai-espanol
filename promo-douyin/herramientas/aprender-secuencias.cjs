// Secuencias JPEG 30 fps con reloj controlado: (1) sello «正确» al acertar el ejercicio de imágenes «Hola»,
// (2) pantalla final «¡Lección perfecta!» con confeti y monedas.
// Uso: node aprender-secuencias.cjs <dir_acierto> <dir_fin>
const { chromium } = require('playwright');
const fs = require('fs');
const [dirAcierto, dirFin, hora = '2026-11-20T10:00:00'] = process.argv.slice(2);
(async () => {
  fs.mkdirSync(dirAcierto, { recursive: true });
  fs.mkdirSync(dirFin, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, locale: 'zh-CN' });
  await ctx.addInitScript(() => {
    sessionStorage.setItem('dele_auth', 'true');
    sessionStorage.setItem('dele_expiry', String(Date.now() + 3e6));
    try { window.speechSynthesis.speak = () => {}; } catch {}
  });
  const page = await ctx.newPage();
  await page.clock.install({ time: new Date(hora) });
  const tick = async (ms) => { for (let t = 0; t < ms; t += 100) { await page.clock.runFor(100); await page.waitForTimeout(40); } };
  const clic = async (sel, n = 0) => {
    const ok = await page.evaluate(([s, n]) => { const e = document.querySelectorAll(s)[n]; if (e) e.click(); return !!e; }, [sel, n]);
    if (!ok) throw new Error('no ' + sel);
  };
  const espera = async (sel) => { for (let i = 0; i < 100; i++) { if (await page.$(sel)) return; await tick(200); } throw new Error('timeout ' + sel); };
  const grabar = async (dir, frames) => {
    for (let f = 0; f < frames; f++) {
      await page.clock.runFor(33.33);
      await page.screenshot({ path: `${dir}/f${String(f).padStart(3, '0')}.jpg`, type: 'jpeg', quality: 90 });
    }
  };
  await page.goto('http://127.0.0.1:5173/#/ruta?nivel=A1', { waitUntil: 'networkidle' }).catch(() => {});
  await tick(5000);
  await espera('.rp-empezar');
  await clic('.rp-empezar');
  await tick(1500);
  await espera('.rf-cta');
  await clic('.rf-cta');
  await espera('.lp-root');
  await tick(1500);
  const lesson = await page.evaluate(() => {
    const el = document.querySelector('.lp-root');
    const k = Object.keys(el).find((x) => x.startsWith('__reactFiber'));
    let f = el[k];
    while (f && !(f.memoizedProps && f.memoizedProps.lesson)) f = f.return;
    return f && f.memoizedProps.lesson;
  });
  const TEACH = new Set(['learn', 'speak', 'tip', 'dialog']);
  // La lección se baraja con Date.now(): solo sirve si el primer ejercicio de imágenes tiene la respuesta en la fila de arriba
  const primeraImg = lesson.steps.find((x) => x.type === 'pictures');
  console.log('pictures', primeraImg && primeraImg.prompt, primeraImg && primeraImg.answer);
  if (!primeraImg || primeraImg.answer > 1) { await browser.close(); process.exit(2); }
  let grabadoAcierto = false;
  for (let i = 0; i < lesson.steps.length; i++) {
    const s = lesson.steps[i];
    await tick(900);
    if (TEACH.has(s.type)) { await clic('.lp-foot .lp-btn'); continue; }
    if (s.type === 'match') {
      for (const p of s.pairs) {
        for (const [col, txt] of [[0, p.a], [1, p.b]]) {
          await page.evaluate(([col, txt]) => {
            const c = document.querySelectorAll('.ej-parejas__col')[col];
            [...c.querySelectorAll('button')].find((b) => b.textContent.trim() === txt).click();
          }, [col, txt]);
          await tick(200);
        }
      }
      break; // la última pareja cierra la lección sola (onDone)
    }
    if (['choice', 'listen'].includes(s.type)) await clic('.ej-opcion', s.answer);
    else if (s.type === 'pictures') await clic('.ej-carta', s.answer);
    else if (s.type === 'tf') await clic(s.answer ? '.es-verdad' : '.es-falso');
    else if (s.type === 'build') {
      const used = new Set();
      for (const w of s.answer.split(/\s+/)) {
        const idx = s.tiles.findIndex((t, j) => !used.has(j) && t === w);
        used.add(idx);
        await clic('.ej-fichas .ej-ficha', idx);
        await tick(150);
      }
    } else if (s.type === 'type') {
      await page.fill('.ej-input', String(s.answer).split(/\s*\/\s*/)[0], { force: true });
    }
    await tick(500);
    if (s.type === 'pictures' && !grabadoAcierto) {
      // 0,4 s con la opción elegida, pulsar «Comprobar» y 2,6 s de sello y feedback
      await grabar(dirAcierto, 12);
      await clic('.lp-foot .lp-btn');
      for (let f = 12; f < 90; f++) {
        await page.clock.runFor(33.33);
        await page.screenshot({ path: `${dirAcierto}/f${String(f).padStart(3, '0')}.jpg`, type: 'jpeg', quality: 90 });
      }
      grabadoAcierto = true;
    } else {
      await clic('.lp-foot .lp-btn');
    }
    await tick(800);
    await clic('.lp-foot .lp-btn');
  }
  // fin: la última pareja llama a onDone a los 650 ms; graba desde ahí
  await page.clock.runFor(600);
  for (let i = 0; i < 20 && !(await page.$('.lp-end')); i++) await page.clock.runFor(33.33);
  await grabar(dirFin, 90);
  await browser.close();
})();
