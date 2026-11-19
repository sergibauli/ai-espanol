// Pruebas de la fusión del progreso entre dispositivos: node scripts/test-sync.mjs
import assert from "node:assert/strict";
import { fusionarClave, anotarEventos, transformarAlEscribir, seSincroniza, validarParche } from "../src/lib/syncReglas.js";

let n = 0;
const caso = (nombre, fn) => {
  fn();
  n++;
  console.log(`✓ ${nombre}`);
};
const J = JSON.stringify;
const P = (r) => JSON.parse(r.v);

caso("clasificación de claves", () => {
  for (const k of ["dele_class_progress", "dele_module_progress", "dele_srs_v1", "dele_favorites", "ai-espanol:game-v1", "ai-espanol:active-days", "ai-espanol:dele-v1", "ai-espanol:exam-history", "oficial_res_B1_3", "dele_guia_visto_12", "dele_brisca_record_4_u", "dele_mahjong_tortuga_record_4_u", "memory_best", "ai-espanol:onboarded", "dele_pron_oidas", "dele_tv_vistos"]) assert.ok(seSincroniza(k), k);
  for (const k of ["ai-espanol:ia-cache-v1", "ai-espanol:conv-tutor-ia", "ai-espanol:campus-demo-v1", "ai-espanol:cielo", "ai-espanol:idioma-ayuda", "dele_auth", "dele_expiry", "dele_chat_history_v1", "ai-espanol:sync-meta", "dele_oficial_borrador_A1_1", "dele_pizarra_pos", "dele_sound_enabled"]) assert.ok(!seSincroniza(k), k);
});

caso("clases y unidades: unión, completada si lo está en uno, mejor nota", () => {
  const a = { "modulo-1#c1": { completed: true, score: 90, lastVisited: 10 }, "modulo-2#c1": { completed: false, score: 40, lastVisited: 30 } };
  const b = { "modulo-2#c1": { completed: true, score: 85, lastVisited: 20 }, "modulo-3#c2": { completed: true, score: 100, lastVisited: 5 } };
  const r = P(fusionarClave("dele_class_progress", { v: J(a), u: 1 }, { v: J(b), u: 2 }));
  assert.deepEqual(Object.keys(r).sort(), ["modulo-1#c1", "modulo-2#c1", "modulo-3#c2"]);
  assert.equal(r["modulo-2#c1"].completed, true);
  assert.equal(r["modulo-2#c1"].score, 85);
  assert.equal(r["modulo-2#c1"].lastVisited, 30);
});

caso("XP: se suman los avances de cada dispositivo sin duplicar", () => {
  const base = { xp: 100, perfect: 1, daily: { "2026-11-18": 100 }, lessons: { a: { at: 1, best: 80 } }, badges: ["first-lesson"], goal: 30, hearts: 5 };
  const movil = { ...base, xp: 150, perfect: 2, daily: { "2026-11-18": 100, "2026-11-19": 50 }, lessons: { ...base.lessons, b: { at: 5, best: 90 } } };
  const pc = { ...base, xp: 130, daily: { "2026-11-18": 100, "2026-11-19": 30 }, lessons: { ...base.lessons, c: { at: 6, best: 70 } }, badges: ["first-lesson", "xp500"] };
  const r = P(fusionarClave("ai-espanol:game-v1", { v: J(movil), u: 10 }, { v: J(pc), u: 11 }, { base: J(base) }));
  assert.equal(r.xp, 180); // 100 + 50 + 30
  assert.equal(r.perfect, 2);
  assert.equal(r.daily["2026-11-19"], 80);
  assert.equal(r.daily["2026-11-18"], 100);
  assert.deepEqual(Object.keys(r.lessons).sort(), ["a", "b", "c"]);
  assert.deepEqual(r.badges.sort(), ["first-lesson", "xp500"]);
  // Repetir la sincronización con la base ya actualizada no vuelve a sumar
  const otra = P(fusionarClave("ai-espanol:game-v1", { v: J(r), u: 12 }, { v: J(r), u: 12 }, { base: J(r) }));
  assert.equal(otra.xp, 180);
});

caso("XP: primer inicio de sesión en un segundo dispositivo con progreso propio (sin base) → suma", () => {
  const r = P(fusionarClave("ai-espanol:game-v1", { v: J({ xp: 40, daily: { d: 40 }, lessons: {}, badges: [] }), u: 1 }, { v: J({ xp: 200, daily: { d: 10 }, lessons: {}, badges: [] }), u: 2 }, { base: null }));
  assert.equal(r.xp, 240);
  assert.equal(r.daily.d, 50);
});

caso("racha: unión de días ordenada", () => {
  const r = P(fusionarClave("ai-espanol:active-days", { v: J(["2026-11-01", "2026-11-03"]) }, { v: J(["2026-11-02", "2026-11-03"]) }));
  assert.deepEqual(r, ["2026-11-01", "2026-11-02", "2026-11-03"]);
});

caso("SRS: por tarjeta gana la repasada más recientemente; las que solo están en uno se conservan", () => {
  const a = [{ word: "Hola", box: 3, lastReview: 100, correctCount: 3, wrongCount: 0 }, { word: "casa", box: 0, lastReview: 0 }];
  const b = [{ word: "hola", box: 1, lastReview: 50, correctCount: 1, wrongCount: 1 }, { word: "perro", box: 2, lastReview: 70 }];
  const r = P(fusionarClave("dele_srs_v1", { v: J(a) }, { v: J(b) }));
  assert.equal(r.length, 3);
  assert.equal(r.find((c) => c.word.toLowerCase() === "hola").box, 3);
});

caso("favoritos: un borrado no resucita al fusionar; volver a añadir sí gana", () => {
  const antes = [{ word: "sol", timestamp: 1 }, { word: "luna", timestamp: 2 }];
  const despues = [{ word: "luna", timestamp: 2 }];
  const ev = anotarEventos("dele_favorites", J(antes), J(despues), {}, 1000);
  assert.equal(ev.sol.d, 1);
  // El otro dispositivo aún tiene «sol» y ha añadido «mar»
  const otro = [...antes, { word: "mar", timestamp: 3 }];
  const r = fusionarClave("dele_favorites", { v: J(despues), del: ev }, { v: J(otro), del: {} });
  assert.deepEqual(P(r).map((f) => f.word).sort(), ["luna", "mar"]);
  // Más tarde lo vuelve a añadir en el otro dispositivo
  const ev2 = anotarEventos("dele_favorites", J(P(r)), J([...P(r), { word: "sol", timestamp: 9 }]), r.del, 2000);
  const r2 = fusionarClave("dele_favorites", { v: J([...P(r), { word: "sol", timestamp: 9 }]), del: ev2 }, { v: J(P(r)), del: r.del });
  assert.ok(P(r2).some((f) => f.word === "sol"));
});

caso("un componente con datos viejos no borra lo que acaba de llegar de otro dispositivo", () => {
  const ev = anotarEventos("dele_favorites", J([{ word: "a" }, { word: "b" }]), J([{ word: "a" }]), {}, 1, new Set(["b"]));
  assert.equal(ev.b, undefined);
});

caso("notas DELE: unión de respuestas, errores (máximo de repasos) y tareas", () => {
  const a = { answers: [{ t: 1, skill: "lectura", ok: true, src: "x" }], errors: [{ t: 5, prompt: "p", repasos: 2 }], tasks: [{ t: 7, skill: "oral", score: 60 }], meta: "a" };
  const b = { answers: [{ t: 2, skill: "audicion", ok: false, src: "y" }, { t: 1, skill: "lectura", ok: true, src: "x" }], errors: [{ t: 5, prompt: "p", repasos: 0 }], tasks: [{ t: 8, skill: "escritura", score: 70 }] };
  const r = P(fusionarClave("ai-espanol:dele-v1", { v: J(a), u: 2 }, { v: J(b), u: 1 }));
  assert.equal(r.answers.length, 2);
  assert.equal(r.errors.length, 1);
  assert.equal(r.errors[0].repasos, 2);
  assert.equal(r.tasks.length, 2);
  assert.equal(r.meta, "a");
});

caso("historial de exámenes: todos los intentos", () => {
  const r = P(fusionarClave("ai-espanol:exam-history", { v: J([{ fecha: "2026-11-02", titulo: "A", nota: 70 }]) }, { v: J([{ fecha: "2026-11-01", titulo: "B", nota: 50 }, { fecha: "2026-11-02", titulo: "A", nota: 70 }]) }));
  assert.deepEqual(r.map((x) => x.titulo), ["A", "B"]);
});

caso("modelo oficial: último resultado arriba, todos los intentos y mejor nota", () => {
  const v1 = transformarAlEscribir("oficial_res_A2_1", null, J({ lectura: 80, audicion: 60, total: 70, fecha: "2026-11-01T10:00:00Z" }));
  // Corrección de otra prueba del mismo examen (minutos después) → mismo intento
  const v1b = transformarAlEscribir("oficial_res_A2_1", v1, J({ lectura: 80, audicion: 64, total: 72, fecha: "2026-11-01T10:20:00Z" }));
  assert.equal(JSON.parse(v1b).intentos.length, 1);
  const pc = transformarAlEscribir("oficial_res_A2_1", null, J({ lectura: 90, audicion: 90, total: 90, fecha: "2026-11-05T10:00:00Z" }));
  const movil = transformarAlEscribir("oficial_res_A2_1", v1b, J({ lectura: 50, audicion: 50, total: 50, fecha: "2026-11-08T10:00:00Z" }));
  const r = P(fusionarClave("oficial_res_A2_1", { v: movil }, { v: pc }));
  assert.equal(r.total, 50); // el último (lo que muestra la página)
  assert.equal(r.intentos.length, 3);
  assert.equal(r.mejor.total, 90);
});

caso("récords: máximo en puntos y mínimo en tiempo", () => {
  assert.equal(fusionarClave("dele_brisca_record_3_u", { v: "40" }, { v: "55" }).v, "55");
  assert.equal(fusionarClave("dele_escape_record_3_u", { v: "40" }, { v: "55" }).v, "40");
  assert.equal(fusionarClave("dele_mahjong_tortuga_record_3_u", { v: "0" }, { v: "80" }).v, "80");
  assert.deepEqual(P(fusionarClave("memory_best", { v: J({ x: 3, y: 1 }) }, { v: J({ x: 2, z: 4 }) })), { x: 3, y: 1, z: 4 });
});

caso("conjuntos de pronunciación: unión", () => {
  assert.deepEqual(P(fusionarClave("dele_pron_oidas", { v: J(["ca", "ce"]) }, { v: J(["ce", "ci"]) })).sort(), ["ca", "ce", "ci"]);
});

caso("último valor gana en textos e indicadores", () => {
  assert.equal(fusionarClave("dele_pizarra_notes", { v: "viejo", u: 1 }, { v: "nuevo", u: 2 }).v, "nuevo");
  assert.equal(fusionarClave("dele_pizarra_notes", { v: "local", u: 3 }, { v: "nuevo", u: 2 }).v, "local");
  assert.equal(fusionarClave("dele_mapa_mental_m3_u", { v: "x", u: 1 }, { v: null, u: 5 }).v, null);
});

caso("solo en un lado → se conserva tal cual", () => {
  assert.equal(fusionarClave("dele_class_progress", { v: null }, { v: '{"a":1}' }).v, '{"a":1}');
  assert.equal(fusionarClave("ai-espanol:game-v1", { v: '{"xp":5}' }, {}).v, '{"xp":5}');
});

caso("JSON roto: no se rompe (último valor gana)", () => {
  assert.equal(fusionarClave("dele_class_progress", { v: "{roto", u: 1 }, { v: '{"a":{"completed":true}}', u: 2 }).v, '{"a":{"completed":true}}');
});

caso("validación del Worker", () => {
  assert.equal(validarParche({ dele_favorites: { v: "[]", u: 1 } }), null);
  assert.match(validarParche({ "ai-espanol:ia-cache-v1": { v: "{}", u: 1 } }), /no permitida/);
  assert.match(validarParche({ dele_favorites: { v: 5, u: 1 } }), /no válido/);
  assert.match(validarParche({ dele_favorites: { v: "x".repeat(400000), u: 1 } }), /grande/);
});

// Escenario completo: dos dispositivos con progreso distinto, cada uno sincroniza contra la cuenta
caso("escenario: dos dispositivos → unión sin perder nada y convergen", () => {
  const cuenta = {};
  const sync = (disp) => {
    for (const k of new Set([...Object.keys(disp.datos), ...Object.keys(cuenta)])) {
      const r = fusionarClave(k, { v: disp.datos[k] ?? null, u: disp.u[k] || 0 }, cuenta[k] || { v: null, u: 0 }, { base: disp.base[k] ?? null });
      if (r.v != null) disp.datos[k] = r.v;
      disp.base[k] = r.v;
      cuenta[k] = { v: r.v, u: Math.max(disp.u[k] || 0, cuenta[k]?.u || 0) };
    }
  };
  const movil = { datos: { "ai-espanol:game-v1": J({ xp: 60, daily: {}, lessons: { m1: { at: 1 } }, badges: [] }), dele_class_progress: J({ "modulo-1#c1": { completed: true, score: 90 } }), "ai-espanol:active-days": J(["2026-11-17"]) }, u: {}, base: {} };
  const pc = { datos: { "ai-espanol:game-v1": J({ xp: 40, daily: {}, lessons: { p1: { at: 2 } }, badges: [] }), dele_class_progress: J({ "modulo-2#c1": { completed: true, score: 80 } }), "ai-espanol:active-days": J(["2026-11-18"]) }, u: {}, base: {} };
  sync(movil); // migración: sube lo del móvil
  sync(pc); // el PC fusiona con la cuenta
  sync(movil); // el móvil recibe lo del PC
  for (const d of [movil, pc]) {
    const g = JSON.parse(d.datos["ai-espanol:game-v1"]);
    assert.equal(g.xp, 100);
    assert.deepEqual(Object.keys(g.lessons).sort(), ["m1", "p1"]);
    assert.deepEqual(Object.keys(JSON.parse(d.datos.dele_class_progress)).sort(), ["modulo-1#c1", "modulo-2#c1"]);
    assert.deepEqual(JSON.parse(d.datos["ai-espanol:active-days"]), ["2026-11-17", "2026-11-18"]);
  }
  // Más estudio en el móvil y otra ronda: suma solo lo nuevo
  const g = JSON.parse(movil.datos["ai-espanol:game-v1"]);
  movil.datos["ai-espanol:game-v1"] = J({ ...g, xp: g.xp + 25 });
  sync(movil);
  sync(pc);
  assert.equal(JSON.parse(pc.datos["ai-espanol:game-v1"]).xp, 125);
});

console.log(`\n${n} pruebas correctas`);
