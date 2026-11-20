// Conversación simulada con el tutor (#/tutor-voz) para el vídeo: intercepta las llamadas al modelo y responde
// con textos fijos (no se llama a ningún servicio real). Uso: node tutor-simulado.cjs <dir_salida>
const { chromium } = require('playwright');
const path = require('path');
const RESPUESTAS = [
  '✏️ Corrección: «Hoy estoy cansado.» (表示暂时的状态用 estar，不用 ser。) ¡Buena pregunta! 💪 ¿Por qué estás cansado hoy?',
  '¡Perfecto, sin errores! 👏 ¿Qué estudiaste ayer?',
];
(async () => {
  const dir = process.argv[2] || '.';
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, locale: 'zh-CN' });
  await ctx.addInitScript(() => {
    sessionStorage.setItem('dele_auth', 'true');
    sessionStorage.setItem('dele_expiry', String(Date.now() + 3e6));
    sessionStorage.setItem('mono-fab-pista', '1');
    localStorage.setItem('ai-espanol:tutor-level', 'A2');
    const falsa = { s: btoa('\0'), k: btoa('simulada') }; // clave falsa: las llamadas se interceptan abajo
    Object.defineProperty(window, '__DS_KEY__', { get: () => falsa, set: () => {}, configurable: false });
    window.speechSynthesis && (window.speechSynthesis.speak = () => {});
    const st = () => { const s = document.createElement('style'); s.textContent = '.mf{display:none!important}'; document.head.appendChild(s); };
    if (document.head) st(); else document.addEventListener('DOMContentLoaded', st);
  });
  await ctx.addInitScript({ path: path.join(__dirname, 'semilla-progreso.js') });
  let n = 0;
  const responder = (route) => {
    const content = RESPUESTAS[Math.min(n++, RESPUESTAS.length - 1)];
    return route.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ choices: [{ message: { role: 'assistant', content }, finish_reason: 'stop' }] }) });
  };
  await ctx.route(/deepseek\.com/, responder);
  await ctx.route(/\/ai\/chat/, responder);
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:5173/#/tutor-voz', { waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(3000);
  const input = page.locator('.tutor-input input');
  await input.scrollIntoViewIfNeeded();
  for (const frase of ['Corrige: «Yo soy cansado hoy».', 'Porque ayer estudié mucho español.']) {
    await input.fill(frase);
    await page.locator('.tutor-send').click();
    await page.waitForTimeout(2500);
  }
  await page.evaluate(() => { const l = document.querySelector('.tutor-msgs'); const u = l.querySelector('.tutor-msg.user'); if (u) l.scrollTop += u.getBoundingClientRect().top - l.getBoundingClientRect().top - 8; document.querySelector('.tutor-chat').scrollIntoView({ block: 'end' }); window.scrollBy(0, 90); });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: path.join(dir, 'tutor_chat.png') });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(dir, 'tutor_top.png') });
  console.log('llamadas simuladas:', n);
  await browser.close();
})();
