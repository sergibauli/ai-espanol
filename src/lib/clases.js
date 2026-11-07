// Clases de 50–60 minutos dentro de cada unidad (índice generado por scripts/build-clases.mjs).
// La unidad conserva su número, sus ids y su progreso: una clase es solo una «vista» filtrada del módulo.
import CLASES from "../data/modulos/clases.json";
import { getClassProgress, getModuleProgress, isClassCompleted, completeClass } from "./progress.js";

export const LECCIONES_POR_CLASE = 5;

// Si una unidad nueva aún no está en clases.json, se trata como una sola clase con todo su contenido
const UNA_CLASE = (numero) => [{ n: 1, titulo: "", tituloChino: "", todo: true, teoria: [], vocabulario: [], dialogos: [], ejercicios: {}, minutos: 60, numero }];

/** Lista de clases de la unidad `numero` */
export function clasesDe(numero) {
  const lista = CLASES[Number(numero)];
  return Array.isArray(lista) && lista.length ? lista : UNA_CLASE(Number(numero));
}
export const numClases = (numero) => clasesDe(numero).length;
export function claseDe(numero, n) {
  const lista = clasesDe(numero);
  return lista.find((c) => c.n === Number(n)) || null;
}
/** Normaliza el número de clase (1…total); cualquier otro valor → 1 */
export function claseValida(numero, n) {
  const k = Number(n);
  return Number.isInteger(k) && k >= 1 && k <= numClases(numero) ? k : 1;
}

/** Id de una lección: la clase 1 conserva los ids de siempre (m8-l0…) para no perder el progreso */
export const idLeccion = (numero, index, clase = 1) => (!clase || Number(clase) <= 1 ? `m${numero}-l${index}` : `m${numero}-c${clase}-l${index}`);

// ---------- Filtrado del contenido ----------
const porIds = (lista, ids) => {
  if (!Array.isArray(lista)) return [];
  const set = new Set(ids || []);
  return lista.filter((x) => set.has(x?.id));
};
const porIndices = (lista, indices) => {
  if (!Array.isArray(lista)) return lista;
  const set = new Set(indices || []);
  return lista.filter((_, i) => set.has(i));
};
const comoLista = (x) => (Array.isArray(x) ? x : x && typeof x === "object" ? [x] : []);

const cacheModulo = new WeakMap();
/**
 * Devuelve un módulo con la MISMA forma que `mod` pero solo con el contenido de la clase `n`
 * (teoría, vocabulario, diálogos, ejercicios y preguntas). Sin `n` (o «unidad») devuelve el módulo entero.
 * Añade `clase`, `totalClases` y `claseInfo` para quien los necesite.
 */
export function moduloDeClase(mod, n) {
  if (!mod || !n || n === "unidad") return mod;
  const info = claseDe(mod.numero, n);
  if (!info || info.todo) return { ...mod, clase: 1, totalClases: 1, claseInfo: info };
  let porClase = cacheModulo.get(mod);
  if (!porClase) cacheModulo.set(mod, (porClase = {}));
  if (porClase[info.n]) return porClase[info.n];
  const ejercicios = {};
  for (const [tipo, lista] of Object.entries(mod.ejercicios || {})) ejercicios[tipo] = porIds(comoLista(lista), info.ejercicios?.[tipo]);
  const filtrado = {
    ...mod,
    clase: info.n,
    totalClases: numClases(mod.numero),
    claseInfo: info,
    teoria: porIds(mod.teoria, info.teoria),
    vocabulario: porIds(mod.vocabulario, info.vocabulario),
    dialogos: porIds(mod.dialogos, info.dialogos),
    ejercicios,
    ejerciciosPracticos: porIds(mod.ejerciciosPracticos, info.ejerciciosPracticos),
    preguntasAbiertas: porIds(mod.preguntasAbiertas, info.preguntasAbiertas),
    preguntas: porIds(mod.preguntas, info.preguntas),
  };
  porClase[info.n] = filtrado;
  return filtrado;
}

/** El «plus» (lectura, objetivos, banco…) de la clase: arrays repartidos; lectura y reto en la última, cultura en la primera */
export function plusDeClase(plus, numero, n) {
  if (!plus || !n || n === "unidad") return plus;
  const info = claseDe(numero, n);
  if (!info || info.todo || !info.plus) return plus;
  const out = { ...plus };
  for (const [k, indices] of Object.entries(info.plus)) out[k] = porIndices(plus[k], indices);
  if (!info.lectura) delete out.lectura;
  if (!info.cultura) delete out.cultura;
  if (!info.reto) delete out.reto;
  return out;
}

// ---------- Progreso ----------
/**
 * Estado de cada clase: lecciones hechas (0–5), nota del examen de la clase y si está completada
 * (examen ≥ 80, las 5 lecciones hechas o la unidad ya completada antes).
 * `lessons` = game.lessons (useGame) o getGame().lessons.
 */
export function progresoUnidad(numero, lessons = {}) {
  const moduloId = `modulo-${numero}`;
  const cp = getClassProgress();
  const mp = getModuleProgress();
  const clases = clasesDe(numero).map((c) => {
    const lecciones = Array.from({ length: LECCIONES_POR_CLASE }, (_, i) => Boolean(lessons?.[idLeccion(numero, i, c.n)]));
    const hechas = lecciones.filter(Boolean).length;
    const reg = cp[`${moduloId}#c${c.n}`];
    const completada = isClassCompleted(moduloId, c.n, cp, mp) || hechas === LECCIONES_POR_CLASE;
    const fraccion = completada ? 1 : (hechas + (reg?.score >= 80 ? 1 : 0)) / (LECCIONES_POR_CLASE + 1);
    return { ...c, lecciones, hechas, nota: reg?.score ?? null, completada, fraccion };
  });
  const completadas = clases.filter((c) => c.completada).length;
  const pct = Math.round((clases.reduce((s, c) => s + c.fraccion, 0) / clases.length) * 100);
  const siguiente = clases.find((c) => !c.completada) || null;
  return { clases, total: clases.length, completadas, pct, completa: completadas === clases.length || Boolean(mp[moduloId]?.completed), siguiente };
}

/** Tras una lección: si ya están las 5 lecciones de la clase, la marca como completada (y la unidad, si era la última) */
export function sincronizarClase(numero, n, lessons = {}) {
  const hechas = Array.from({ length: LECCIONES_POR_CLASE }, (_, i) => lessons?.[idLeccion(numero, i, n)]).filter(Boolean);
  if (hechas.length < LECCIONES_POR_CLASE) return false;
  const media = Math.round(hechas.reduce((s, l) => s + (l.best ?? l.score ?? 100), 0) / hechas.length);
  completeClass(`modulo-${numero}`, n, media, numClases(numero));
  return true;
}

/** Clase que el alumno tenía abierta la última vez (se recuerda por unidad) */
const CLAVE_ULTIMA = (numero) => `dele_clase_actual_${numero}`;
export function ultimaClase(numero) {
  try {
    return claseValida(numero, localStorage.getItem(CLAVE_ULTIMA(numero)));
  } catch {
    return 1;
  }
}
export function recordarClase(numero, n) {
  try {
    localStorage.setItem(CLAVE_ULTIMA(numero), String(n));
  } catch {}
}

/** Texto corto «2 clases · 2课» */
export const etiquetaClases = (numero) => {
  const n = numClases(numero);
  return `${n} ${n === 1 ? "clase" : "clases"} · ${n}课`;
};
