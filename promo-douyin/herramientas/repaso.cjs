// Uso: node repaso.cjs <salida_oculta.png> <salida_revelada.png>
// Siembra tarjetas de ejemplo en dele_srs_v1 (solo en este navegador de captura) y fotografía el repaso.
const { chromium } = require('playwright');
(async () => {
  const [out1, out2] = process.argv.slice(2);
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, locale: 'zh-CN' });
  await ctx.addInitScript(() => {
    sessionStorage.setItem('dele_auth', 'true');
    sessionStorage.setItem('dele_expiry', String(Date.now() + 3e6));
    sessionStorage.setItem('mono-fab-pista', '1');
    if (localStorage.getItem('dele_srs_v1')) return;
    const D = 86400000, now = Date.now();
    const pal = [['¿Qué tal?','你好吗？',0],['la cuenta','账单',0],['el postre','甜点',0],['la carta','菜单',1],['la bebida','饮料',0],['el camarero','服务员',0],['la reserva','预订',0],['el pan','面包',2],['el agua','水',5],['la mesa','桌子',5],['el café','咖啡',5],['el desayuno','早餐',3],['la cena','晚餐',2],['el pollo','鸡肉',4],['la sopa','汤',1],['delicioso','好吃的',3],['la propina','小费',2],['el arroz','米饭',5],['la ensalada','沙拉',4],['el zumo','果汁',1],['pedir','点（菜）',3],['probar','品尝',2],['la terraza','露台',1],['el menú del día','今日套餐',0]];
    const cards = pal.map(([w, zh, box], i) => ({ word: w, chinese: zh, source: 'Unidad 29', level: 'A2', box, nextReview: box === 0 ? now - (i + 1) * 60000 : now + [0,1,3,7,14,30][box] * D, lastReview: now - D, correctCount: box * 2, wrongCount: box ? 1 : 0 }));
    localStorage.setItem('dele_srs_v1', JSON.stringify(cards));
  });
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:5173/#/memoria', { waitUntil: 'networkidle' }).catch(() => {});
  await page.waitForTimeout(2500);
  await page.evaluate(() => { document.querySelector('.jd-cifras').scrollIntoView({ block: 'start' }); window.scrollBy(0, +30); });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: out1 });
  await page.locator('.jd-ficha__cuerpo').click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: out2 });
  await browser.close();
})();
