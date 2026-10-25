import { buildStudentProfile } from "../data/modulos/profile.js";
import { getKnowledgeContext } from "./search.js";
export { historyWindow } from "./historial.js";
const CHAT_CACHE_KEY = "dele_chat_cache_v1";
const CHAT_CACHE_MAX = 60;
const CHAT_HISTORY_TURNS = 8;
function normalizeQuestion(i) {
  return i.trim().toLowerCase().replace(/\s+/g, " ");
}
function readChatCache() {
  try {
    return JSON.parse(localStorage.getItem(CHAT_CACHE_KEY) || "{}");
  } catch {
    return {};
  }
}
function writeChatCache(i) {
  try {
    localStorage.setItem(CHAT_CACHE_KEY, JSON.stringify(i));
  } catch {}
}
function getCachedAnswer(content) {
  return readChatCache()[normalizeQuestion(content)] ?? null;
}
function cacheAnswer(content, t) {
  const c = readChatCache();
  c[normalizeQuestion(content)] = t;
  const u = Object.keys(c);
  if (u.length > CHAT_CACHE_MAX) {
    for (const s of u.slice(0, u.length - CHAT_CACHE_MAX)) {
      delete c[s];
    }
  }
  writeChatCache(c);
}
const TUTOR_SYSTEM_PROMPT = `Eres un tutor de español amable y conversacional para hablantes de chino que preparan el examen DELE (A1-B2). Habla como un mentor cercano, NO como un libro de texto.

Reglas de estilo (MUY importantes):
- Responde BREVE: 1-3 frases por turno. Solo da explicaciones largas si el usuario lo pide.
- Haz preguntas para seguir la conversación (ej. "¿Quieres un ejemplo?" o "¿Qué nivel estás preparando?").
- Da ejemplos cortos y prácticos, no párrafos de teoría.
- Usa emojis con moderación (1-2 máximo).
- Si el usuario escribe en chino, responde en chino con las palabras clave en español. Si escribe en español, responde en español sencillo y claro.
- Corrige con amabilidad los errores de español del usuario.`;
// El mensaje de sistema no cambia entre turnos (DeepSeek cachea el prefijo repetido y lo cobra mucho más barato);
// el contexto que depende de cada pregunta viaja con el mensaje del alumno.
function buildTutorSystemPrompt() {
  return [
    TUTOR_SYSTEM_PROMPT,
    `PERFIL DEL ESTUDIANTE (progreso real en la app — adáptate a su nivel y repasa lo que ya estudió):
${buildStudentProfile()}`,
  ].join(`

`);
}
function buildTutorUserMessage(content) {
  const t = getKnowledgeContext(content);
  if (!t) return content;
  return `CONTEXTO DE LA APLICACIÓN (datos reales de AI Español — úsalos para responder con precisión, en español y chino):
${t}

PREGUNTA DEL ALUMNO:
${content}`;
}
function speakSpanish(i) {
  const window_speechSynthesis = window.speechSynthesis;
  if (!window_speechSynthesis || typeof window.SpeechSynthesisUtterance !== "function") {
    return;
  }
  window_speechSynthesis.cancel();
  const c = i.replace(/[*_#`]/g, "").trim();
  const u = new window.SpeechSynthesisUtterance(c);
  u.lang = "es-ES";
  window_speechSynthesis.speak(u);
}
export {
  getCachedAnswer,
  speakSpanish,
  buildTutorSystemPrompt,
  buildTutorUserMessage,
  CHAT_HISTORY_TURNS,
  cacheAnswer,
};
