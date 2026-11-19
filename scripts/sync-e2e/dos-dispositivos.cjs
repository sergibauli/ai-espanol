const { chromium } = require("playwright");
const APP = "http://localhost:5173/";
const USER = "user_e2e_" + Date.now();
(async () => {
  const browser = await chromium.launch();
  const abrir = async (nombre, semilla) => {
    const ctx = await browser.newContext({ viewport: { width: 1300, height: 900 } });
    const page = await ctx.newPage();
    page.on("console", (m) => m.type() === "error" && console.log(`[${nombre} console]`, m.text().slice(0, 200)));
    await page.goto(APP);
    await page.evaluate((s) => {
      sessionStorage.setItem("dele_auth", "true");
      sessionStorage.setItem("dele_expiry", String(Date.now() + 3600e3));
      for (const [k, v] of Object.entries(s)) localStorage.setItem(k, JSON.stringify(v));
    }, semilla);
    await page.goto(APP + "#/mi-dele");
    await page.reload();
    await page.waitForSelector(".in-md-hero", { timeout: 20000 });
    return page;
  };
  const entrar = (page, user) =>
    page.evaluate(async (user) => {
      const m = await import("/src/lib/syncProgreso.js");
      m.iniciarSesionSync({ userId: user, esClerk: true, getToken: () => fetch("http://127.0.0.1:8790/token?sub=" + user).then((r) => r.text()) });
      return m.primeraSincronizacion();
    }, user);
  const sync = (page) => page.evaluate(async () => (await import("/src/lib/syncProgreso.js")).sincronizar());
  const leer = (page) =>
    page.evaluate(() => {
      const g = JSON.parse(localStorage.getItem("ai-espanol:game-v1") || "{}");
      return {
        xp: g.xp,
        lecciones: Object.keys(g.lessons || {}).sort(),
        clases: Object.keys(JSON.parse(localStorage.getItem("dele_class_progress") || "{}")).sort(),
        favoritos: JSON.parse(localStorage.getItem("dele_favorites") || "[]").map((f) => f.word).sort(),
        dias: JSON.parse(localStorage.getItem("ai-espanol:active-days") || "[]"),
        indicador: document.querySelector(".estado-guardado")?.textContent || "(sin indicador)",
      };
    });
  const ok = (cond, msg) => { console.log((cond ? "✓ " : "✗ ") + msg); if (!cond) process.exitCode = 1; };

  // Dispositivo A (móvil) con progreso local previo, sin cuenta
  const A = await abrir("A", {
    "ai-espanol:game-v1": { xp: 60, daily: {}, lessons: { "m1-l1": { at: 1, best: 90 } }, badges: [], goal: 30, hearts: 5 },
    dele_class_progress: { "modulo-1#c1": { completed: true, score: 90, lastVisited: 1 } },
    dele_favorites: [{ word: "sol", timestamp: 1 }, { word: "luna", timestamp: 2 }],
    "ai-espanol:active-days": ["2026-11-17"],
  });
  // Dispositivo B (ordenador) con otro progreso
  const B = await abrir("B", {
    "ai-espanol:game-v1": { xp: 40, daily: {}, lessons: { "m2-l1": { at: 2, best: 80 } }, badges: [], goal: 30, hearts: 5 },
    dele_class_progress: { "modulo-2#c1": { completed: true, score: 80, lastVisited: 2 } },
    dele_favorites: [{ word: "mar", timestamp: 3 }],
    "ai-espanol:active-days": ["2026-11-18"],
  });

  console.log("A entra (migración):", await entrar(A, USER));
  console.log("B entra:", await entrar(B, USER));
  await sync(A);
  const a1 = await leer(A), b1 = await leer(B);
  console.log("A", a1); console.log("B", b1);
  for (const [n, d] of [["A", a1], ["B", b1]]) {
    ok(d.xp === 100, `${n}: XP 60+40 = 100`);
    ok(d.lecciones.join() === "m1-l1,m2-l1", `${n}: lecciones de los dos`);
    ok(d.clases.join() === "modulo-1#c1,modulo-2#c1", `${n}: clases de los dos`);
    ok(d.favoritos.join() === "luna,mar,sol", `${n}: favoritos de los dos`);
    ok(d.dias.includes("2026-11-17") && d.dias.includes("2026-11-18"), `${n}: racha unida`);
  }

  // A estudia más (funciones reales de la app) y borra un favorito; B lo recibe
  await A.evaluate(async () => {
    const g = await import("/src/lib/gamification.js");
    g.addXp(25, { lessonId: "m3-l1", score: 100 });
    const p = await import("/src/lib/progress.js");
    p.completeClass("modulo-3", 1, 95);
    const fav = JSON.parse(localStorage.getItem("dele_favorites")).filter((f) => f.word !== "sol");
    localStorage.setItem("dele_favorites", JSON.stringify(fav));
  });
  await sync(A);
  await sync(B);
  const b2 = await leer(B);
  ok(b2.xp === 125, "B recibe +25 XP de A (sin duplicar): 125");
  ok(b2.clases.includes("modulo-3#c1"), "B recibe la clase completada en A");
  ok(!b2.favoritos.includes("sol"), "el favorito borrado en A no resucita en B");
  await B.reload(); await B.waitForTimeout(2500);
  await B.screenshot({ path: process.argv[2] + "/dispositivo-B.png" });

  // Otro alumno en el navegador A: no se mezcla
  await entrar(A, USER + "_otro");
  const otro = await leer(A);
  ok(otro.xp === undefined && otro.clases.length === 0, "otro alumno en A empieza limpio (lo del anterior queda apartado)");
  await A.evaluate(async () => (await import("/src/lib/gamification.js")).addXp(7));
  await sync(A);
  await entrar(A, USER);
  const vuelta = await leer(A);
  ok(vuelta.xp === 125 && vuelta.clases.length === 3, "al volver el primer alumno recupera lo suyo (125 XP, 3 clases)");
  const prog = await A.evaluate(() => localStorage.getItem("ai-espanol:game-v1"));
  ok(JSON.parse(prog).xp === 125, "los 7 XP del otro alumno no se mezclan");
  await A.reload(); await A.waitForSelector(".in-md-hero", { timeout: 20000 });
  await entrar(A, USER);
  await A.waitForTimeout(500);
  console.log("indicador:", (await leer(A)).indicador);
  await A.screenshot({ path: process.argv[2] + "/dispositivo-A.png" });
  await browser.close();
})();
