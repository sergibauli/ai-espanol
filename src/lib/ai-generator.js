import { deepseekFetch } from "./deepseekClient.js";
export const D = "";
const s = "dele_ai_gen_cache_v1";
function o(t, e) {
  return `${t}::${e.trim().toLowerCase().replace(/\s+/g, " ")}`;
}
function i() {
  try {
    return JSON.parse(localStorage.getItem(s) || "{}");
  } catch {
    return {};
  }
}
function h(t) {
  try {
    localStorage.setItem(s, JSON.stringify(t));
  } catch {}
}
function u(t, e) {
  return i()[o(t, e)] ?? null;
}
function f(t, e, r) {
  const n = i();
  n[o(t, e)] = r;
  const a = Object.keys(n);
  if (a.length > 40) {
    for (const c of a.slice(0, a.length - 40)) {
      delete n[c];
    }
  }
  h(n);
}
async function d(t, e, max_tokens = 8000) {
  const n = await deepseekFetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: t,
        },
        {
          role: "user",
          content: e,
        },
      ],
      temperature: 0.7,
      max_tokens,
    }),
  });
  if (!n.ok) {
    const c = await n.json().catch(() => ({}));
    throw new Error(c.error?.message || `Error HTTP ${n.status}`);
  }
  return (await n.json()).choices?.[0]?.message?.content || "";
}
export async function c(t, e, r, n = 8000) {
  const a = u(t, e);
  if (a) {
    return a;
  }
  const c = await d(r, e, n);
  f(t, e, c);
  return c;
}
export function e(t) {
  if (!t) {
    return null;
  }
  let e = t.trim();
  e = e.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/, "");
  try {
    return JSON.parse(e);
  } catch {}
  const r = e.indexOf("{");
  const n = e.lastIndexOf("}");
  if (r >= 0 && n > r) {
    try {
      return JSON.parse(e.slice(r, n + 1));
    } catch {}
  }
  const a = e.indexOf("[");
  const c = e.lastIndexOf("]");
  if (a >= 0 && c > a) {
    try {
      return JSON.parse(e.slice(a, c + 1));
    } catch {}
  }
  return null;
}
export { d as a };
