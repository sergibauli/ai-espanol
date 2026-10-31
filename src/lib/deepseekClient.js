// Cliente único para DeepSeek. Ningún componente debe llamar a api.deepseek.com directamente.
//
// 1. Con VITE_API_URL (Worker desplegado): la petición va al Worker (/ai/chat) y la clave vive allí
//    como secreto. Es la única opción realmente segura: la clave nunca llega al navegador.
// 2. Sin Worker: se usa la clave inyectada en el build (DEEPSEEK_API_KEY), cifrada con XOR y una sal
//    aleatoria por build (vite.config.js). Evita que aparezca en claro en el código publicado y que la
//    detecten los bots que rastrean "sk-…", pero quien depure la web con conocimientos puede recuperarla.

/* global __DS_KEY__ */
const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";

let cachedKey = null;
function embeddedKey() {
  if (cachedKey !== null) return cachedKey;
  try {
    const { s, k } = typeof __DS_KEY__ === "object" && __DS_KEY__ ? __DS_KEY__ : {};
    if (!s || !k) return (cachedKey = "");
    const salt = Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
    const data = Uint8Array.from(atob(k), (c) => c.charCodeAt(0));
    cachedKey = new TextDecoder().decode(data.map((b, i) => b ^ salt[i % salt.length]));
  } catch {
    cachedKey = "";
  }
  return cachedKey;
}

export function isAIAvailable() {
  return Boolean(API_URL || embeddedKey());
}

async function sessionToken() {
  try {
    return (await window.Clerk?.session?.getToken?.()) || null;
  } catch {
    return null;
  }
}

// Respuestas deterministas (temperatura ≤ 0,3: correcciones, evaluaciones) guardadas en el navegador: repetir la misma
// petición (volver a abrir una corrección, reintentar) no gasta tokens. 40 entradas, 7 días.
const CACHE_KEY = "ai-espanol:ia-cache-v1";
const CACHE_MAX = 40;
const CACHE_TTL = 7 * 864e5;
async function cacheId(body) {
  try {
    const h = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(body));
    return [...new Uint8Array(h)].slice(0, 12).map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch {
    return null;
  }
}
function readCache() {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
  } catch {
    return {};
  }
}
function cacheable(body) {
  try {
    const t = JSON.parse(body || "{}").temperature;
    return typeof t === "number" && t <= 0.3;
  } catch {
    return false;
  }
}

// Límite semanal: cada alumno tiene LIMITE_SEMANAL usos de IA por semana (de lunes a domingo, hora de China).
// Un «uso» es una corrección, un plan, un reto o una conversación entera con el tutor (todas sus preguntas
// comparten el mismo identificador `uso`). El Worker aplica el mismo límite en el servidor.
export const LIMITE_SEMANAL = 5;
const CUOTA_KEY = "ai-espanol:ia-semana";
export function semanaActual(ahora = Date.now()) {
  const d = new Date(ahora + 8 * 36e5); // UTC+8
  const dia = (d.getUTCDay() + 6) % 7; // lunes = 0
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - dia)).toISOString().slice(0, 10);
}
function leerCuota() {
  try {
    const c = JSON.parse(localStorage.getItem(CUOTA_KEY) || "{}");
    if (c.semana === semanaActual() && Array.isArray(c.usos)) return c;
  } catch {}
  return { semana: semanaActual(), usos: [] };
}
export function cuotaIA() {
  const c = leerCuota();
  const lunes = new Date(`${c.semana}T00:00:00+08:00`).getTime() + 7 * 864e5;
  return { usadas: Math.min(c.usos.length, LIMITE_SEMANAL), limite: LIMITE_SEMANAL, restantes: Math.max(0, LIMITE_SEMANAL - c.usos.length), reinicio: new Date(lunes) };
}
function apuntarUso(id) {
  const c = leerCuota();
  if (!c.usos.includes(id)) c.usos.push(id);
  try {
    localStorage.setItem(CUOTA_KEY, JSON.stringify(c));
  } catch {}
  window.dispatchEvent(new Event("cuota-ia"));
}
const USOS_GRATIS = ["plan-semanal"]; // automáticos: el Worker los limita aparte
export const nuevoUso = () => `u${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
// Una conversación (tutor, examinador oral) cuenta como un solo uso: mismo id durante una hora
export function usoConversacion(nombre) {
  const k = `ai-espanol:conv-${nombre}`;
  try {
    const c = JSON.parse(sessionStorage.getItem(k) || "null");
    if (c && Date.now() - c.t < 36e5) return c.id;
    const id = `${nombre}-${nuevoUso()}`;
    sessionStorage.setItem(k, JSON.stringify({ id, t: Date.now() }));
    return id;
  } catch {
    return `${nombre}-${semanaActual()}`;
  }
}
export const MENSAJE_LIMITE = `Has usado tus ${LIMITE_SEMANAL} consultas de IA de esta semana. Se renuevan el lunes. 本周${LIMITE_SEMANAL}次AI已用完，周一更新。`;
function respuestaLimite() {
  return new Response(JSON.stringify({ error: { message: MENSAJE_LIMITE, code: "limite_semanal" } }), { status: 429, headers: { "Content-Type": "application/json" } });
}

/**
 * Sustituto de fetch() para las llamadas de chat a DeepSeek. Acepta la misma URL/opciones que antes
 * (se ignoran la URL y la cabecera Authorization) y devuelve una Response con el formato de DeepSeek.
 */
export async function deepseekFetch(_url, init = {}) {
  const id = cacheable(init.body) ? await cacheId(init.body) : null;
  const guardada = id && readCache()[id];
  if (guardada && Date.now() - guardada.t < CACHE_TTL) {
    return new Response(guardada.r, { status: 200, headers: { "Content-Type": "application/json" } });
  }
  // Las respuestas guardadas no gastan cuota; una petición nueva sí (una vez por «uso»)
  const uso = init.uso || nuevoUso();
  const gratis = USOS_GRATIS.includes(uso);
  const cuota = leerCuota();
  if (!gratis && !cuota.usos.includes(uso) && cuota.usos.length >= LIMITE_SEMANAL) return respuestaLimite();
  try {
    const b = JSON.parse(init.body || "{}");
    b.uso = uso;
    init = { ...init, body: JSON.stringify(b) };
  } catch {}
  const res = await llamar(init);
  if (res.ok && !gratis) apuntarUso(uso);
  if (id && res.ok) {
    const texto = await res.clone().text();
    try {
      if (JSON.parse(texto)?.choices?.[0]?.finish_reason === "length") return res; // respuesta cortada: no se guarda
      const c = readCache();
      c[id] = { t: Date.now(), r: texto };
      const claves = Object.keys(c).sort((a, b) => c[a].t - c[b].t);
      for (const k of claves.slice(0, Math.max(0, claves.length - CACHE_MAX))) delete c[k];
      localStorage.setItem(CACHE_KEY, JSON.stringify(c));
    } catch {}
  }
  return res;
}

async function llamar(init) {
  if (API_URL) {
    const token = await sessionToken();
    return fetch(`${API_URL}/ai/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: init.body,
    });
  }
  // Ahorro de tokens: modelo barato, respuestas cortas y solo los últimos mensajes del chat
  try {
    const b = JSON.parse(init.body || "{}");
    delete b.uso;
    b.model = "deepseek-chat";
    b.max_tokens = Math.min(Number(b.max_tokens) || 700, 4000);
    if (Array.isArray(b.messages) && b.messages.length > 9) b.messages = [b.messages[0], ...b.messages.slice(-8)];
    init = { ...init, body: JSON.stringify(b) };
  } catch {}
  const key = embeddedKey();
  if (!key) {
    return new Response(JSON.stringify({ error: { message: "IA no configurada" } }), { status: 503, headers: { "Content-Type": "application/json" } });
  }
  return fetch(DEEPSEEK_URL, {
    ...init,
    method: "POST",
    headers: { ...(init.headers || {}), "Content-Type": "application/json", Authorization: `Bearer ${key}` },
  });
}
