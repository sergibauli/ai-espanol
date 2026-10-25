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

/**
 * Sustituto de fetch() para las llamadas de chat a DeepSeek. Acepta la misma URL/opciones que antes
 * (se ignoran la URL y la cabecera Authorization) y devuelve una Response con el formato de DeepSeek.
 */
export async function deepseekFetch(_url, init = {}) {
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
    b.model = "deepseek-chat";
    b.max_tokens = Math.min(Number(b.max_tokens) || 700, 1600);
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
