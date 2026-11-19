const { chromium } = require("playwright");
const APP = "http://localhost:5173/", USER = "user_off_" + Date.now();
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1300, height: 900 }, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  await p.goto(APP);
  await p.evaluate(() => { sessionStorage.setItem("dele_auth", "true"); sessionStorage.setItem("dele_expiry", String(Date.now() + 3600e3)); });
  await p.goto(APP + "#/mi-dele"); await p.reload(); await p.waitForSelector(".in-md-hero");
  await p.evaluate(async (u) => { const m = await import("/src/lib/syncProgreso.js"); m.iniciarSesionSync({ userId: u, esClerk: true, getToken: () => fetch("http://127.0.0.1:8790/token?sub=" + u).then((r) => r.text()) }); await m.primeraSincronizacion(); }, USER);
  await ctx.setOffline(true);
  await p.evaluate(async () => { (await import("/src/lib/gamification.js")).addXp(33); await (await import("/src/lib/syncProgreso.js")).sincronizar(); });
  const txt = await p.textContent(".estado-guardado");
  console.log("offline:", txt, "| pendientes:", await p.evaluate(() => Object.keys(JSON.parse(localStorage.getItem("ai-espanol:sync-meta")).dirty)));
  await p.locator(".in-md-hero").screenshot({ path: process.argv[2] + "/indicador-offline.png" });
  await ctx.setOffline(false);
  await p.waitForTimeout(3000); // evento online → reintento
  console.log("online:", await p.textContent(".estado-guardado"));
  const T = await (await fetch("http://127.0.0.1:8790/token?sub=" + USER)).text();
  const doc = await (await fetch("http://127.0.0.1:8787/progress", { headers: { authorization: "Bearer " + T } })).json();
  console.log("XP en la cuenta:", JSON.parse(doc.claves["ai-espanol:game-v1"].v).xp);
  await p.locator(".in-md-hero").screenshot({ path: process.argv[2] + "/indicador-online.png" });
  await b.close();
})();
