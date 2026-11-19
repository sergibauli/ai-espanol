// Sincronización del progreso con la cuenta (Clerk) a través del Worker (GET/PUT /progress).
//
// - Un único punto de enganche: se intercepta localStorage.setItem/removeItem. Cualquier escritura en una
//   clave de progreso (ver syncReglas.js) queda marcada como pendiente con su fecha, sin tocar el código
//   de cada página ni cambiar el nombre o la forma de las claves.
// - Al iniciar sesión: descarga, fusiona clave a clave (syncReglas.fusionarClave) y sube lo que falte.
//   Después, cada cambio se sube con espera (debounce) y al ocultar la pestaña; sin conexión se reintenta.
// - Concurrencia: el servidor lleva un número de revisión; si otro dispositivo subió entre medias (409),
//   se vuelve a descargar y a fusionar.
// - Cuentas en un mismo navegador: se guarda a qué usuario pertenece lo local. Si entra otro, lo del
//   anterior se aparta en «ai-espanol:sync-stash:<id>» y se carga lo del nuevo.
// - Sin VITE_API_URL o con el admin local: todo sigue solo en local (no hay peticiones).
import * as React from "react";
import { seSincroniza, reglaDe, fusionarClave, anotarEventos, transformarAlEscribir } from "./syncReglas.js";

const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const META = "ai-espanol:sync-meta"; // { owner, u: {clave: fecha}, dirty: {clave: 1}, seq: {clave: n}, rev, at }
const EVENTOS = "ai-espanol:sync-del"; // { clave: { id: { d, t } } }
const BASES = "ai-espanol:sync-base"; // { clave: valor tras la última sincronización } (solo claves con base)
const STASH = (id) => `ai-espanol:sync-stash:${id}`;
const ESPERA_MS = 8000; // tras el último cambio
const MIN_ENTRE_SUBIDAS_MS = 45000; // como mucho una subida cada 45 s mientras se estudia (escrituras en KV)
const REINTENTOS_MS = [5000, 15000, 60000, 180000];

let ls = null;
let setOriginal = null;
let removeOriginal = null;
let silencio = 0; // >0 mientras la propia sincronización escribe
// Elementos que han llegado de otro dispositivo en esta página: si un componente con datos viejos los
// «borra» al guardar, no es un borrado del alumno (se vacía al cambiar de ruta).
const recibidos = new Map();

// ---------- Lectura y escritura del estado interno ----------
const leerJson = (k, porDefecto) => {
  try {
    const raw = ls.getItem(k);
    return raw ? JSON.parse(raw) : porDefecto;
  } catch {
    return porDefecto;
  }
};
const escribirInterno = (k, valor) => {
  try {
    if (valor == null) removeOriginal.call(ls, k);
    else setOriginal.call(ls, k, typeof valor === "string" ? valor : JSON.stringify(valor));
    return true;
  } catch {
    return false;
  }
};
const leerMeta = () => ({ owner: null, u: {}, dirty: {}, seq: {}, rev: 0, at: 0, ...leerJson(META, {}) });
const guardarMeta = (m) => escribirInterno(META, m);

function clavesLocales() {
  const out = [];
  for (let i = 0; i < ls.length; i++) {
    const k = ls.key(i);
    if (k && seSincroniza(k)) out.push(k);
  }
  return out;
}

// ---------- Enganche en localStorage ----------
function alEscribir(clave, rawAntes, rawDespues) {
  const meta = leerMeta();
  const ahora = Date.now();
  meta.u[clave] = ahora;
  meta.dirty[clave] = 1;
  meta.seq[clave] = (meta.seq[clave] || 0) + 1;
  guardarMeta(meta);
  if (reglaDe(clave)?.borrable) {
    const ev = leerJson(EVENTOS, {});
    ev[clave] = anotarEventos(clave, rawAntes, rawDespues, ev[clave], ahora, recibidos.get(clave));
    escribirInterno(EVENTOS, ev);
  }
  programar();
}

export function instalarEnganche() {
  if (typeof window === "undefined" || setOriginal) return;
  try {
    ls = window.localStorage;
  } catch {
    return;
  }
  const proto = Object.getPrototypeOf(ls);
  setOriginal = proto.setItem;
  removeOriginal = proto.removeItem;
  proto.setItem = function (clave, valor) {
    if (this !== ls || silencio || !seSincroniza(String(clave))) return setOriginal.call(this, clave, valor);
    const k = String(clave);
    const antes = ls.getItem(k);
    let nuevo = String(valor);
    if (nuevo === antes) return setOriginal.call(this, k, nuevo);
    try {
      nuevo = transformarAlEscribir(k, antes, nuevo);
    } catch {}
    setOriginal.call(this, k, nuevo);
    alEscribir(k, antes, nuevo);
  };
  proto.removeItem = function (clave) {
    const k = String(clave);
    if (this !== ls || silencio || !seSincroniza(k)) return removeOriginal.call(this, clave);
    const antes = ls.getItem(k);
    removeOriginal.call(this, k);
    if (antes != null) alEscribir(k, antes, null);
  };
  window.addEventListener("online", () => programar(0));
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") volcar();
    else if (Date.now() - (estado.ultimaDescarga || 0) > 60000) programar(0);
  });
  window.addEventListener("pagehide", volcar);
  window.addEventListener("hashchange", () => recibidos.clear());
}

// ---------- Estado visible ----------
// fase: "local" (sin cuenta o sin servidor) · "sincronizando" · "guardado" · "pendiente" (sin conexión o error)
const estado = { fase: "local", sesion: null, ultimaDescarga: 0, version: 0 };
const oyentes = new Set();
function fijar(cambios) {
  Object.assign(estado, cambios);
  for (const f of oyentes) f({ ...estado });
}
export function useEstadoSync() {
  const [e, setE] = React.useState(() => ({ ...estado }));
  React.useEffect(() => {
    oyentes.add(setE);
    setE({ ...estado });
    return () => oyentes.delete(setE);
  }, []);
  return e;
}

// ---------- Cuentas en el mismo navegador ----------
function cambiarDePropietario(nuevo) {
  const meta = leerMeta();
  if (meta.owner === nuevo) return false;
  if (!meta.owner) {
    // Progreso sin dueño (de antes de esta versión): lo adopta el primer alumno que entra; el admin local no
    if (nuevo === "admin") return false;
    meta.owner = nuevo;
    guardarMeta(meta);
    return false;
  }
  // Apartar lo del anterior
  const claves = clavesLocales();
  const datos = Object.fromEntries(claves.map((k) => [k, ls.getItem(k)]));
  let apartado = { claves: datos, meta, eventos: leerJson(EVENTOS, {}), bases: leerJson(BASES, {}) };
  if (!escribirInterno(STASH(meta.owner), apartado)) {
    // Sin espacio: basta con guardar lo que aún no estaba en su cuenta
    apartado = { ...apartado, claves: Object.fromEntries(Object.entries(datos).filter(([k]) => meta.dirty[k])) };
    escribirInterno(STASH(meta.owner), apartado);
  }
  silencio++;
  try {
    for (const k of claves) removeOriginal.call(ls, k);
    const suyo = leerJson(STASH(nuevo), null);
    if (suyo) {
      for (const [k, v] of Object.entries(suyo.claves || {})) if (v != null) setOriginal.call(ls, k, v);
      escribirInterno(EVENTOS, suyo.eventos || {});
      escribirInterno(BASES, suyo.bases || {});
      guardarMeta({ ...suyo.meta, owner: nuevo });
      removeOriginal.call(ls, STASH(nuevo));
    } else {
      escribirInterno(EVENTOS, {});
      escribirInterno(BASES, {});
      guardarMeta({ owner: nuevo, u: {}, dirty: {}, seq: {}, rev: 0, at: 0 });
    }
  } finally {
    silencio--;
  }
  return true;
}

// ---------- Red ----------
async function pedir(metodo, cuerpo, { keepalive = false, token: tokenFijo } = {}) {
  const s = estado.sesion;
  const token = tokenFijo || (await s.getToken().catch(() => null));
  if (!token) throw Object.assign(new Error("sin token"), { red: true });
  let res;
  try {
    res = await fetch(`${API_URL}/progress`, {
      method: metodo,
      keepalive,
      headers: { authorization: `Bearer ${token}`, ...(cuerpo ? { "content-type": "application/json" } : {}) },
      body: cuerpo ? JSON.stringify(cuerpo) : undefined,
    });
  } catch (e) {
    throw Object.assign(e, { red: true });
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(body.error || `HTTP ${res.status}`), { status: res.status, body });
  return body;
}

// ---------- Ciclo descargar → fusionar → subir ----------
let temporizador = null;
let enCurso = null;
let intentosFallidos = 0;
let ultimaSubida = 0;

function programar(ms) {
  if (!estado.sesion) return;
  clearTimeout(temporizador);
  let espera = ms ?? ESPERA_MS;
  if (ms == null) espera = Math.max(espera, MIN_ENTRE_SUBIDAS_MS - (Date.now() - ultimaSubida));
  if (estado.fase === "guardado") fijar({ fase: "pendiente-breve" });
  temporizador = setTimeout(() => sincronizar().catch(() => {}), espera);
}

export function sincronizar() {
  if (!estado.sesion) return Promise.resolve();
  if (enCurso) return enCurso.then(() => (leerMeta().dirty && Object.keys(leerMeta().dirty).length ? sincronizar() : undefined));
  enCurso = ciclo()
    .then(() => {
      intentosFallidos = 0;
      fijar({ fase: Object.keys(leerMeta().dirty).length ? "pendiente-breve" : "guardado" });
    })
    .catch((e) => {
      if (e?.status === 401 || e?.status === 403) console.warn("[sync] sin permiso:", e.message);
      else if (!e?.red) console.warn("[sync]", e);
      fijar({ fase: "pendiente" });
      const espera = REINTENTOS_MS[Math.min(intentosFallidos++, REINTENTOS_MS.length - 1)];
      clearTimeout(temporizador);
      temporizador = setTimeout(() => sincronizar().catch(() => {}), espera);
    })
    .finally(() => {
      enCurso = null;
    });
  return enCurso;
}

async function ciclo() {
  if (typeof navigator !== "undefined" && navigator.onLine === false) throw Object.assign(new Error("offline"), { red: true });
  fijar({ fase: "sincronizando" });
  for (let intento = 0; intento < 4; intento++) {
    const remoto = await pedir("GET");
    estado.ultimaDescarga = Date.now();
    const { parche, cambiosLocales, seqAntes } = fusionarTodo(remoto.claves || {});
    if (cambiosLocales.length) avisarCambios(cambiosLocales);
    const meta = leerMeta();
    if (!Object.keys(parche).length) {
      meta.rev = remoto.rev || 0;
      meta.at = Date.now();
      guardarMeta(meta);
      return;
    }
    try {
      const r = await pedir("PUT", { rev: remoto.rev || 0, claves: parche });
      ultimaSubida = Date.now();
      confirmarSubida(parche, seqAntes, r.rev);
      return;
    } catch (e) {
      if (e.status !== 409) throw e; // 409: otro dispositivo subió entre medias → otra vuelta
    }
  }
  throw new Error("Demasiados conflictos seguidos");
}

function fusionarTodo(remotas) {
  const meta = leerMeta();
  const eventos = leerJson(EVENTOS, {});
  const bases = leerJson(BASES, {});
  const claves = new Set([...clavesLocales(), ...Object.keys(meta.dirty), ...Object.keys(remotas).filter(seSincroniza)]);
  const parche = {};
  const cambiosLocales = [];
  const seqAntes = {};
  const ahora = Date.now();
  silencio++;
  try {
    for (const k of claves) {
      const regla = reglaDe(k);
      if (!regla) continue;
      const vLocal = ls.getItem(k);
      const local = { v: vLocal, u: meta.u[k] || 0, del: eventos[k] };
      const rem = remotas[k] || { v: null, u: 0 };
      const { v, del } = fusionarClave(k, local, rem, { base: bases[k] ?? null });
      seqAntes[k] = meta.seq[k] || 0;
      if (v !== vLocal) {
        // Lo que llega de fuera se apunta para no confundirlo con un borrado si un componente viejo reescribe
        if (regla.borrable) {
          const nuevos = new Set(recibidos.get(k) || []);
          const yaEstaban = new Set(safeList(vLocal).map(regla.id));
          for (const x of safeList(v)) if (!yaEstaban.has(regla.id(x))) nuevos.add(regla.id(x));
          recibidos.set(k, nuevos);
        }
        if (v == null) removeOriginal.call(ls, k);
        else if (!trySet(k, v)) continue;
        cambiosLocales.push(k);
      }
      if (del) eventos[k] = del;
      const delCambia = regla.borrable && JSON.stringify(del || {}) !== JSON.stringify(rem.del || {});
      const igualQueCuenta = v === (rem.v ?? null);
      // Fecha de la versión fusionada: la de la cuenta si no cambia; la local si ganó la local (LWW); ahora si es una mezcla
      const u = igualQueCuenta ? rem.u || meta.u[k] || ahora : Math.max(meta.u[k] || 0, rem.u || 0, regla.tipo === "lww" ? 0 : ahora);
      if ((!igualQueCuenta || delCambia) && !(v == null && rem.v == null)) parche[k] = { v, u, ...(regla.borrable ? { del: del || {} } : {}) };
      meta.u[k] = u;
      if (regla.base) bases[k] = v;
    }
  } finally {
    silencio--;
  }
  escribirInterno(EVENTOS, eventos);
  escribirInterno(BASES, bases);
  // Las claves sin cambio respecto a la cuenta dejan de estar pendientes
  for (const k of Object.keys(meta.dirty)) if (!parche[k] && (meta.seq[k] || 0) === seqAntes[k]) delete meta.dirty[k];
  guardarMeta(meta);
  return { parche, cambiosLocales, seqAntes };
}
const safeList = (raw) => {
  try {
    const x = JSON.parse(raw);
    return Array.isArray(x) ? x : [];
  } catch {
    return [];
  }
};
function trySet(k, v) {
  try {
    setOriginal.call(ls, k, v);
    return true;
  } catch {
    return false;
  }
}

function confirmarSubida(parche, seqAntes, rev) {
  const meta = leerMeta();
  for (const k of Object.keys(parche)) if ((meta.seq[k] || 0) === seqAntes[k]) delete meta.dirty[k];
  meta.rev = rev;
  meta.at = Date.now();
  guardarMeta(meta);
}

// Avisa a la app de que han cambiado datos (barra de XP, mapa de clases…)
function avisarCambios(claves) {
  try {
    window.dispatchEvent(new CustomEvent("ai-espanol:xp"));
    window.dispatchEvent(new Event("progreso-clases"));
    window.dispatchEvent(new CustomEvent("ai-espanol:sync-datos", { detail: { claves } }));
  } catch {}
}

// Al ocultar la pestaña: subida rápida de lo pendiente (sin fusionar; si alguien subió antes, el 409
// deja las claves pendientes y se fusionan en la siguiente visita)
let tokenReciente = null;
function volcar() {
  if (!estado.sesion || !tokenReciente) return;
  const meta = leerMeta();
  const pendientes = Object.keys(meta.dirty);
  if (!pendientes.length) return;
  const eventos = leerJson(EVENTOS, {});
  const claves = Object.fromEntries(pendientes.filter(seSincroniza).map((k) => [k, { v: ls.getItem(k), u: meta.u[k] || Date.now(), ...(reglaDe(k)?.borrable ? { del: eventos[k] || {} } : {}) }]));
  if (JSON.stringify(claves).length > 60000) return; // keepalive admite ~64 KB
  pedir("PUT", { rev: meta.rev || 0, claves }, { keepalive: true, token: tokenReciente })
    .then((r) => confirmarSubida(claves, Object.fromEntries(pendientes.map((k) => [k, meta.seq[k] || 0])), r.rev))
    .catch(() => {});
}

// ---------- Arranque por sesión ----------
/**
 * Llamar cuando cambia la identidad. userId: id de Clerk, "admin" para el admin local o null sin sesión.
 * Devuelve true si se ha cambiado de alumno (la app debe volver a montar las páginas).
 */
export function iniciarSesionSync({ userId, getToken, esClerk }) {
  instalarEnganche();
  if (!ls) return false;
  clearTimeout(temporizador);
  let cambio = false;
  if (userId) cambio = cambiarDePropietario(userId);
  const remoto = Boolean(API_URL && esClerk && userId && getToken);
  if (!remoto) {
    fijar({ fase: "local", sesion: null });
    return cambio;
  }
  const sesion = {
    userId,
    getToken: async () => {
      const t = await getToken();
      if (t) tokenReciente = t;
      return t;
    },
  };
  fijar({ sesion, fase: "sincronizando" });
  // Token fresco para el volcado al cerrar (Clerk lo renueva cada minuto)
  sesion.getToken().catch(() => {});
  const refresco = setInterval(() => (estado.sesion === sesion ? sesion.getToken().catch(() => {}) : clearInterval(refresco)), 50000);
  return cambio;
}

/** Primera sincronización tras entrar: resuelve con true si han llegado datos de la cuenta */
export function primeraSincronizacion() {
  if (!estado.sesion) return Promise.resolve(false);
  let llegaron = false;
  const f = (e) => (llegaron = llegaron || Boolean(e.detail?.claves?.length));
  window.addEventListener("ai-espanol:sync-datos", f);
  return sincronizar().then(
    () => (window.removeEventListener("ai-espanol:sync-datos", f), llegaron),
    () => (window.removeEventListener("ai-espanol:sync-datos", f), llegaron),
  );
}

export const SYNC_ACTIVA = Boolean(API_URL);

// El enganche se instala al importar este módulo (main.jsx lo importa el primero)
instalarEnganche();
