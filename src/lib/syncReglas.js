// Reglas de sincronización del progreso (módulo puro: sin window ni localStorage).
// Lo usan el cliente (src/lib/syncProgreso.js), el Worker (validación de claves) y las pruebas
// (scripts/test-sync.mjs). Inventario completo y motivos en docs/sincronizacion-progreso.md.
//
// Cada clave sincronizada guarda su valor tal cual (la cadena que escribe la app, sin cambiar su forma),
// la fecha del último cambio (u) y, en las colecciones donde se puede borrar, los últimos eventos
// alta/baja por elemento (del: { id: { d: 1|0, t } }) para que un borrado no «resucite» al fusionar.

export const VERSION_DOC = 1;
export const MAX_VALOR = 300_000; // bytes por clave
export const MAX_DOC = 2_000_000; // bytes del documento entero
export const MAX_CLAVES = 3000;
const MAX_EVENTOS = 600; // eventos alta/baja por clave

const norm = (s) => String(s ?? "").trim().toLowerCase();
const num = (x) => (Number.isFinite(Number(x)) ? Number(x) : 0);

// ---------- Qué se sincroniza ----------
// Orden importante: la primera regla que encaja manda.
export const REGLAS = [
  { re: /^dele_(module|class)_progress$/, tipo: "progreso" },
  { re: /^dele_srs_v1$/, tipo: "coleccion", borrable: true, id: (c) => norm(c?.word), gana: (a, b) => num(a.lastReview) - num(b.lastReview) || num(a.correctCount) + num(a.wrongCount) - num(b.correctCount) - num(b.wrongCount) },
  { re: /^dele_favorites$/, tipo: "coleccion", borrable: true, id: (f) => norm(f?.word), gana: (a, b) => num(a.timestamp) - num(b.timestamp) },
  { re: /^dele_guia_visto_\d+$/, tipo: "coleccion", borrable: true, id: (x) => String(x), gana: () => 0 },
  { re: /^ai-espanol:active-days$/, tipo: "coleccion", id: (x) => String(x), gana: () => 0, ordenar: (a, b) => (a < b ? -1 : a > b ? 1 : 0), limite: -400 },
  { re: /^dele_(pron_oidas|pron_dominadas|pron_perfectas|visited_silabas|tv_vistos)$/, tipo: "coleccion", id: (x) => String(x), gana: () => 0 },
  { re: /^ai-espanol:game-v1$/, tipo: "juego", base: true },
  { re: /^ai-espanol:dele-v1$/, tipo: "deleV1" },
  { re: /^ai-espanol:exam-history$/, tipo: "historial" },
  { re: /^oficial_res_(A1|A2|B1|B2)_[\w-]+$/, tipo: "oficial" },
  { re: /^(dele_tv_progreso|memory_best)$/, tipo: "mapaMax" },
  // Récords de juegos: en Escape y Mahjong gana el menor tiempo; en el resto, la puntuación más alta
  { re: /^dele_(escape|mahjong_[\w-]+)_record_[\w-]+$/, tipo: "min" },
  { re: /^dele_[a-z]+_record_[\w-]+$/, tipo: "max" },
  { re: /^(ahorcado_best|apalabrados_best|scramble_best|kahoot_beststreak)$/, tipo: "max" },
  // Último valor gana: indicadores y textos del alumno
  { re: /^(ai-espanol:onboarded|ai-espanol:tutor-level|dele_mahjong_tutorial_visto|dele_pizarra_notes)$/, tipo: "lww" },
  { re: /^dele_clase_actual_\d+$/, tipo: "lww" },
  { re: /^dele_mapa_mental_m\d+_(c\d+|u)$/, tipo: "lww" },
];

export function reglaDe(clave) {
  if (typeof clave !== "string" || clave.length > 120) return null;
  return REGLAS.find((r) => r.re.test(clave)) || null;
}
export const seSincroniza = (clave) => Boolean(reglaDe(clave));

const parse = (raw, porDefecto = null) => {
  if (raw == null) return porDefecto;
  try {
    return JSON.parse(raw);
  } catch {
    return porDefecto;
  }
};

// ---------- Eventos alta/baja (colecciones borrables) ----------
const idsDe = (regla, raw) => {
  const lista = parse(raw, []);
  return new Set((Array.isArray(lista) ? lista : []).map(regla.id).filter((x) => x !== "" && x != null));
};

/** Al escribir en local: anota qué elementos se han añadido o quitado (solo colecciones borrables) */
export function anotarEventos(clave, rawAntes, rawDespues, eventos = {}, ahora = Date.now(), ignorar = null) {
  const regla = reglaDe(clave);
  if (!regla?.borrable) return eventos;
  const antes = idsDe(regla, rawAntes);
  const despues = idsDe(regla, rawDespues);
  const out = { ...eventos };
  for (const id of antes) if (!despues.has(id) && !ignorar?.has(id)) out[id] = { d: 1, t: ahora };
  for (const id of despues) if (!antes.has(id)) out[id] = { d: 0, t: ahora };
  return recortarEventos(out);
}
export function unirEventos(a = {}, b = {}) {
  const out = { ...(a || {}) };
  for (const [id, e] of Object.entries(b || {})) if (!out[id] || num(e?.t) > num(out[id].t)) out[id] = { d: e?.d ? 1 : 0, t: num(e?.t) };
  return recortarEventos(out);
}
function recortarEventos(ev) {
  const lista = Object.entries(ev);
  if (lista.length <= MAX_EVENTOS) return ev;
  return Object.fromEntries(lista.sort((x, y) => y[1].t - x[1].t).slice(0, MAX_EVENTOS));
}

// ---------- Escritura local con historial (resultados de exámenes oficiales) ----------
// La página guarda solo el último resultado; aquí se le añaden `intentos` (todos) y `mejor` (mejor nota)
// sin cambiar los campos que ya lee (lectura, audicion, total, fecha).
const MAX_INTENTOS = 40;
const intentoDe = (o) => (o && o.fecha ? { lectura: o.lectura ?? null, audicion: o.audicion ?? null, total: num(o.total), fecha: o.fecha } : null);
function conIntentos(ultimo, intentos) {
  const porFecha = new Map();
  for (const it of intentos) if (it?.fecha) porFecha.set(it.fecha, it);
  const lista = [...porFecha.values()].sort((a, b) => (a.fecha < b.fecha ? -1 : 1)).slice(-MAX_INTENTOS);
  const mejor = lista.reduce((m, it) => (!m || it.total > m.total ? it : m), null);
  return { ...ultimo, intentos: lista, mejor };
}
export function transformarAlEscribir(clave, rawAntes, rawNuevo) {
  const regla = reglaDe(clave);
  if (regla?.tipo !== "oficial" || rawNuevo == null) return rawNuevo;
  const nuevo = parse(rawNuevo);
  if (!nuevo || typeof nuevo !== "object" || !nuevo.fecha) return rawNuevo;
  const antes = parse(rawAntes);
  let previos = antes ? (Array.isArray(antes.intentos) ? antes.intentos : [intentoDe(antes)].filter(Boolean)) : [];
  if (Array.isArray(nuevo.intentos)) previos = [...previos, ...nuevo.intentos];
  // La página reescribe el resultado al corregir cada prueba del mismo examen: dentro de 3 h es el mismo intento
  const ultimoPrevio = previos[previos.length - 1];
  if (ultimoPrevio && Math.abs(Date.parse(nuevo.fecha) - Date.parse(ultimoPrevio.fecha)) < 3 * 3600e3) previos = previos.slice(0, -1);
  const { intentos: _i, mejor: _m, ...campos } = nuevo;
  return JSON.stringify(conIntentos(campos, [...previos, intentoDe(nuevo)]));
}

// ---------- Fusión ----------
/**
 * Fusiona el valor local y el de la cuenta de una clave.
 * @param {string} clave
 * @param {{v: string|null, u?: number, del?: object}} local
 * @param {{v: string|null, u?: number, del?: object}} remota
 * @param {{base?: string|null}} ctx  base = valor de esta clave tras la última sincronización de este dispositivo
 * @returns {{v: string|null, del?: object}}
 */
export function fusionarClave(clave, local = {}, remota = {}, ctx = {}) {
  const regla = reglaDe(clave);
  const L = local || {};
  const R = remota || {};
  const del = regla?.borrable ? unirEventos(L.del, R.del) : undefined;
  const lww = () => (num(R.u) > num(L.u) ? R.v ?? null : L.v ?? null);
  if (!regla || regla.tipo === "lww") return { v: lww() };
  if (L.v == null && R.v == null) return { v: null, del };
  try {
    const v = FUSION[regla.tipo](regla, L, R, ctx, del);
    return { v: v === undefined ? lww() : v, del };
  } catch {
    return { v: lww(), del };
  }
}

const unoSolo = (L, R) => (L.v == null ? R.v : R.v == null ? L.v : undefined);

const FUSION = {
  // { id: { completed, score, lastVisited, … } } → completada si lo está en alguno, mejor nota, última visita
  progreso(regla, L, R) {
    const s = unoSolo(L, R);
    if (s !== undefined) return s;
    const a = parse(L.v, {}) || {};
    const b = parse(R.v, {}) || {};
    const out = { ...b };
    for (const [id, x] of Object.entries(a)) {
      const y = b[id];
      if (!y) {
        out[id] = x;
        continue;
      }
      const reciente = num(x.lastVisited) >= num(y.lastVisited) ? x : y;
      out[id] = { ...y, ...x, ...reciente, completed: Boolean(x.completed || y.completed), score: Math.max(num(x.score), num(y.score)), lastVisited: Math.max(num(x.lastVisited), num(y.lastVisited)) };
    }
    return JSON.stringify(out);
  },

  // Lista de elementos con id: unión; si el mismo id está en los dos, gana el más reciente; se quitan los dados de baja
  coleccion(regla, L, R, ctx, del) {
    const a = parse(L.v, []);
    const b = parse(R.v, []);
    if (!Array.isArray(a) || !Array.isArray(b)) return undefined;
    const porId = new Map();
    for (const x of [...a, ...b]) {
      const id = regla.id(x);
      if (id === "" || id == null) continue;
      const prev = porId.get(id);
      if (!prev || regla.gana(x, prev) > 0) porId.set(id, x);
    }
    let lista = [...porId.entries()].filter(([id]) => !(del && del[id]?.d)).map(([, x]) => x);
    if (regla.ordenar) lista.sort(regla.ordenar);
    if (regla.limite) lista = lista.slice(regla.limite);
    return JSON.stringify(lista);
  },

  // XP y contadores: se suman los avances de cada dispositivo desde la última sincronización (no se pierden ni se duplican)
  juego(regla, L, R, ctx) {
    const s = unoSolo(L, R);
    if (s !== undefined) return s;
    const a = parse(L.v, {}) || {};
    const b = parse(R.v, {}) || {};
    const base = parse(ctx.base, null) || { xp: 0, perfect: 0, daily: {}, goal: undefined };
    const delta = (x, y) => Math.max(0, num(x) - num(y));
    const daily = { ...(b.daily || {}) };
    for (const [dia, n] of Object.entries(a.daily || {})) daily[dia] = num(daily[dia]) + delta(n, base.daily?.[dia]);
    const lessons = { ...(b.lessons || {}) };
    for (const [id, x] of Object.entries(a.lessons || {})) {
      const y = lessons[id];
      lessons[id] = !y ? x : { ...(num(x.at) >= num(y.at) ? x : y), best: Math.max(num(x.best), num(y.best)) };
    }
    const reciente = num(L.u) >= num(R.u) ? a : b;
    return JSON.stringify({
      ...b,
      ...a,
      xp: num(b.xp) + delta(a.xp, base.xp),
      perfect: num(b.perfect) + delta(a.perfect, base.perfect),
      daily,
      lessons,
      badges: [...new Set([...(b.badges || []), ...(a.badges || [])])],
      goal: a.goal !== base.goal && a.goal != null ? a.goal : (b.goal ?? a.goal),
      hearts: reciente.hearts ?? a.hearts,
      heartsAt: reciente.heartsAt ?? a.heartsAt,
    });
  },

  // Respuestas, errores y tareas: unión por momento (t); en los errores, el mayor número de repasos
  deleV1(regla, L, R) {
    const s = unoSolo(L, R);
    if (s !== undefined) return s;
    const a = parse(L.v, {}) || {};
    const b = parse(R.v, {}) || {};
    const unir = (x = [], y = [], idDe, mezclar, max) => {
      const m = new Map();
      for (const it of [...(y || []), ...(x || [])]) {
        if (!it) continue;
        const id = idDe(it);
        m.set(id, m.has(id) && mezclar ? mezclar(m.get(id), it) : it);
      }
      return [...m.values()].sort((p, q) => num(p.t) - num(q.t)).slice(-max);
    };
    const reciente = num(L.u) >= num(R.u) ? a : b;
    return JSON.stringify({
      ...(reciente === a ? b : a),
      ...reciente,
      answers: unir(a.answers, b.answers, (x) => `${x.t}|${x.skill}|${x.src}|${x.ok}`, null, 1500),
      errors: unir(a.errors, b.errors, (x) => `${x.t}|${x.prompt}`, (p, q) => ({ ...p, ...q, repasos: Math.max(num(p.repasos), num(q.repasos)) }), 400),
      tasks: unir(a.tasks, b.tasks, (x) => `${x.t}|${x.skill}|${x.src}`, null, 200),
    });
  },

  // Historial del generador de exámenes: todos los intentos (los 50 más recientes)
  historial(regla, L, R) {
    const a = parse(L.v, []);
    const b = parse(R.v, []);
    if (!Array.isArray(a) || !Array.isArray(b)) return undefined;
    const m = new Map();
    for (const x of [...a, ...b]) if (x) m.set(`${x.fecha}|${x.titulo}`, x);
    return JSON.stringify([...m.values()].sort((x, y) => (String(x.fecha) < String(y.fecha) ? 1 : -1)).slice(0, 50));
  },

  // Resultado de un modelo oficial: el último arriba (como lo lee la app), todos los intentos y la mejor nota
  oficial(regla, L, R) {
    const s = unoSolo(L, R);
    if (s !== undefined) return s;
    const a = parse(L.v);
    const b = parse(R.v);
    if (!a || !b) return undefined;
    const todos = [...(a.intentos || [intentoDe(a)]), ...(b.intentos || [intentoDe(b)])].filter(Boolean);
    const ultimo = String(a.fecha) >= String(b.fecha) ? a : b;
    const { intentos: _i, mejor: _m, ...campos } = ultimo;
    return JSON.stringify(conIntentos(campos, todos));
  },

  // { clave: número } → el mayor por clave
  mapaMax(regla, L, R) {
    const a = parse(L.v, {}) || {};
    const b = parse(R.v, {}) || {};
    const out = { ...b };
    for (const [k, x] of Object.entries(a)) out[k] = Math.max(num(x), num(b[k]));
    return JSON.stringify(out);
  },

  max(regla, L, R) {
    const s = unoSolo(L, R);
    if (s !== undefined) return s;
    return num(L.v) >= num(R.v) ? L.v : R.v;
  },
  min(regla, L, R) {
    const s = unoSolo(L, R);
    if (s !== undefined) return s;
    const a = num(L.v);
    const b = num(R.v);
    if (!(a > 0)) return R.v;
    if (!(b > 0)) return L.v;
    return a <= b ? L.v : R.v;
  },
};

// ---------- Validación del documento (Worker) ----------
/** Comprueba un parche { claves: { clave: { v, u, del? } } }. Devuelve un mensaje de error o null. */
export function validarParche(claves, ahora = Date.now()) {
  if (!claves || typeof claves !== "object" || Array.isArray(claves)) return "Formato no válido";
  const lista = Object.entries(claves);
  if (lista.length > MAX_CLAVES) return "Demasiadas claves";
  for (const [k, e] of lista) {
    if (!seSincroniza(k)) return `Clave no permitida: ${k.slice(0, 60)}`;
    if (!e || typeof e !== "object") return `Entrada no válida: ${k}`;
    if (e.v !== null && typeof e.v !== "string") return `Valor no válido: ${k}`;
    if (typeof e.v === "string" && e.v.length > MAX_VALOR) return `Valor demasiado grande: ${k}`;
    if (!Number.isFinite(e.u) || e.u < 0 || e.u > ahora + 86400e3) return `Fecha no válida: ${k}`;
    if (e.del != null && (typeof e.del !== "object" || Array.isArray(e.del) || Object.keys(e.del).length > MAX_EVENTOS)) return `Eventos no válidos: ${k}`;
  }
  return null;
}
