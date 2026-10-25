// Comprueba que un simulacro nuevo tiene exactamente el formato del modelo oficial usado como plantilla.
// Uso directo: node validar.mjs <fichero.json> (compara con el modelo 01 del mismo nivel)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const palabras = (s) => String(s || "").trim().split(/\s+/).filter(Boolean).length;

export function validar(m, p) {
  const err = [];
  const ok = (c, msg) => { if (!c) err.push(msg); };
  ok(m.nivel === p.nivel, "nivel distinto");
  ok(m.temaCentral && m.temaCentral !== p.temaCentral, "tema central vacío o copiado");
  ok(Array.isArray(m.pruebas) && m.pruebas.length === p.pruebas.length, `pruebas: ${m.pruebas?.length} ≠ ${p.pruebas.length}`);
  p.pruebas.forEach((pp, i) => {
    const mp = m.pruebas?.[i];
    if (!mp) return;
    ok(mp.nombre === pp.nombre, `prueba ${i + 1}: nombre «${mp.nombre}»`);
    ok(mp.duracion === pp.duracion, `prueba ${i + 1}: duración ${mp.duracion} ≠ ${pp.duracion}`);
    ok(mp.tareas?.length === pp.tareas.length, `prueba ${i + 1}: ${mp.tareas?.length} tareas ≠ ${pp.tareas.length}`);
    pp.tareas.forEach((pt, j) => {
      const mt = mp.tareas?.[j];
      const tag = `P${i + 1}T${j + 1}`;
      if (!mt) return;
      ok(mt.tipo === pt.tipo, `${tag}: tipo «${mt.tipo}» ≠ «${pt.tipo}»`);
      for (const k of Object.keys(pt)) ok(k in mt, `${tag}: falta la clave «${k}»`);
      ok((mt.items || []).length === (pt.items || []).length, `${tag}: ${(mt.items || []).length} ítems ≠ ${(pt.items || []).length}`);
      (mt.items || []).forEach((it, k) => {
        const pi = pt.items[k];
        if (!pi) return;
        ok(Array.isArray(it.opciones) && it.opciones.length === pi.opciones.length, `${tag} ítem ${k + 1}: ${it.opciones?.length} opciones ≠ ${pi.opciones.length}`);
        ok(Number.isInteger(it.correcta) && it.correcta >= 0 && it.correcta < (it.opciones || []).length, `${tag} ítem ${k + 1}: «correcta» fuera de rango`);
        ok(it.enunciado && it.justificacion, `${tag} ítem ${k + 1}: falta enunciado o justificación`);
        if (typeof it.opciones?.[0] === "string" && it.opciones.length > 1) ok(new Set(it.opciones).size === it.opciones.length, `${tag} ítem ${k + 1}: opciones repetidas`);
      });
      if (pt.texto) {
        const a = palabras(mt.texto), b = palabras(pt.texto);
        ok(a >= b * 0.75 && a <= b * 1.3, `${tag}: texto de ${a} palabras (plantilla ${b})`);
        ok(mt.texto !== pt.texto, `${tag}: texto copiado de la plantilla`);
      }
      if (pt.guion) ok(/\[AUDIO \d+\]/.test(mt.guion || "") && /\[VOZ \d+/.test(mt.guion || ""), `${tag}: el guion no tiene marcas [AUDIO n]/[VOZ n]`);
      if (pt.material?.bloques) ok(mt.material?.bloques?.length === pt.material.bloques.length, `${tag}: ${mt.material?.bloques?.length} bloques ≠ ${pt.material.bloques.length}`);
      if (Array.isArray(pt.puntosGuia)) ok(mt.puntosGuia?.length === pt.puntosGuia.length, `${tag}: ${mt.puntosGuia?.length} puntos guía ≠ ${pt.puntosGuia.length}`);
    });
  });
  // Relacionar: las correctas no pueden ir en orden consecutivo (A, B, C…), se resolvería sin comprender
  m.pruebas?.slice(0, 2).forEach((pr, i) => pr.tareas?.forEach((t, j) => {
    const pos = (t.items || []).map((x) => x.correcta);
    if (pos.length >= 4 && pos.every((v, k) => k === 0 || v === pos[k - 1] + 1)) err.push(`P${i + 1}T${j + 1}: las respuestas van en orden consecutivo (${pos.join(",")}); mezcla el banco de opciones`);
  }));
  // Posición de la correcta: no siempre la misma en una tarea
  m.pruebas?.slice(0, 2).forEach((pr, i) => pr.tareas?.forEach((t, j) => {
    const pos = (t.items || []).map((x) => x.correcta);
    if (pos.length >= 4) ok(new Set(pos).size > 1, `P${i + 1}T${j + 1}: la respuesta correcta está siempre en la misma posición`);
  }));
  return err;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const f = process.argv[2];
  const m = JSON.parse(fs.readFileSync(f, "utf8"));
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
  const of = (await import(path.join(root, `src/data/oficial/oficial-${m.nivel.toLowerCase()}.js`)))[`oficial${m.nivel.toLowerCase()}`];
  const plantilla = of.find((x) => `plantilla ${x.codigo}` === m.generadoCon) || of[0];
  const e = validar(m, plantilla);
  console.log(e.length ? "✗ " + e.join("\n✗ ") : `✓ ${m.codigo} cumple el formato de ${plantilla.codigo}`);
  process.exit(e.length ? 1 : 0);
}
