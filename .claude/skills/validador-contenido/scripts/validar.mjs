// Revisa el contenido de AI Español y escribe un informe: node validar.mjs [salida.json]  (desde la raíz del repo)
import fs from "fs";
const R = process.cwd();
const out = process.argv[2] || "informe-contenido.json";
const fnv = (t) => { let h = 0x811c9dc5; for (const b of new TextEncoder().encode(t)) { h ^= b; h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16).padStart(8, "0"); };
const strip = (t) => String(t).toLowerCase().normalize("NFD").replace(/[̀-̂̄-ͯ]/g, "");
const M = new Set(JSON.parse(fs.readFileSync(`${R}/src/data/audio-index.json`)));
const F = new Set(JSON.parse(fs.readFileSync(`${R}/src/data/audio-index-f.json`)));
// Misma lista de nombres femeninos que usa la app (src/lib/lessons.js)
const femSrc = fs.readFileSync(`${R}/src/lib/lessons.js`, "utf8").match(/const FEMENINOS = \/(.+)\/i;/);
const FEM = femSrc ? new RegExp(femSrc[1].replace(/\\\\/g, "\\"), "i") : /^$/;
const esMujer = (n) => FEM.test(String(n || "").trim());
const rep = { modulos: [], pronunciacion: [], examenes: [], audio: { faltaHombre: [], faltaMujer: [] } };
const add = (k, msg) => rep[k].push(msg);
const need = (t, f) => { t = String(t || "").trim(); if (!t) return; if (f ? !F.has(fnv("F|" + t)) : !M.has(fnv(t))) rep.audio[f ? "faltaMujer" : "faltaHombre"].push(t); };

for (const file of fs.readdirSync(`${R}/src/data/modulos`).filter((f) => /^modulos-.*\.js$/.test(f))) {
  const mod = await import(`${R}/src/data/modulos/${file}`);
  for (const m of Object.values(mod).flat().filter((x) => x && x.numero)) {
    const tag = `U${m.numero}`;
    (m.vocabulario || []).forEach((v, i) => { if (!v.espanol || !v.chino) add("modulos", `${tag} vocabulario[${i}] sin español o chino`); });
    (m.teoria || []).forEach((t) => {
      const lines = String(t.descripcion || "").split("\n").map((l) => l.trim()).filter(Boolean);
      if (lines.some((l) => l.length > 260)) add("modulos", `${tag} teoría «${t.titulo}»: párrafo muy largo (la guía lo mostrará como bloque)`);
      if (!t.descripcionChino) add("modulos", `${tag} teoría «${t.titulo}» sin traducción china`);
    });
    (m.dialogos || []).forEach((d) => (d.lineas || []).forEach((l) => need(l.texto, esMujer(l.personaje))));
    (m.ejercicios?.seleccionar || []).forEach((q, i) => { if (!q.opciones?.includes(q.respuestaCorrecta)) add("modulos", `${tag} ejercicios.seleccionar[${i}]: la respuesta no está entre las opciones`); });
  }
}
for (const fam of JSON.parse(fs.readFileSync(`${R}/src/data/pronunciacion.json`))) for (const s of fam.silabas) {
  for (const p of s.palabras || []) if (!strip(p.es).includes(strip(s.s))) add("pronunciacion", `${fam.id}/${s.s}: «${p.es}» no contiene la sílaba`);
  if ((s.palabras || []).length < 3) add("pronunciacion", `${fam.id}/${s.s}: solo ${(s.palabras || []).length} palabras`);
  [s.s, s.ej, ...(s.palabras || []).map((p) => p.es), ...(s.frases || []).map((f) => f.es)].forEach((t) => need(t, false));
}
for (const file of fs.readdirSync(`${R}/src/data/examenes`)) {
  const ex = await import(`${R}/src/data/examenes/${file}`);
  const walk = (o, path) => { if (Array.isArray(o)) o.forEach((x, i) => walk(x, `${path}[${i}]`)); else if (o && typeof o === "object") { if (Array.isArray(o.options) && typeof o.correctAnswer === "number" && !o.options[o.correctAnswer]) add("examenes", `${file} ${path}: correctAnswer fuera de rango`); for (const [k, v] of Object.entries(o)) walk(v, `${path}.${k}`); } };
  walk(ex, file);
}
for (const file of fs.readdirSync(`${R}/src/data/diccionarios`)) {
  const d = await import(`${R}/src/data/diccionarios/${file}`);
  for (const arr of Object.values(d)) if (Array.isArray(arr)) arr.forEach((w) => { need(w.es, false); need(w.exampleEs, false); });
}
rep.audio.faltaHombre = [...new Set(rep.audio.faltaHombre)];
rep.audio.faltaMujer = [...new Set(rep.audio.faltaMujer)];
fs.writeFileSync(out, JSON.stringify(rep, null, 1));
console.log(`módulos: ${rep.modulos.length} avisos · pronunciación: ${rep.pronunciacion.length} · exámenes: ${rep.examenes.length} · audio que falta: ${rep.audio.faltaHombre.length} voz profesor, ${rep.audio.faltaMujer.length} voz femenina → ${out}`);
