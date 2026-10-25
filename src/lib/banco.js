// Banco de preguntas tipo DELE (generadas por IA y revisadas por una segunda IA) con calibración por uso real
import A1 from "../data/banco/banco-a1.json";
import A2 from "../data/banco/banco-a2.json";
import B1 from "../data/banco/banco-b1.json";
import B2 from "../data/banco/banco-b2.json";

const BANCO = { A1, A2, B1, B2 };
const API = import.meta.env.VITE_API_URL;
const COLA = "ai-espanol:banco-cola";
let global = null;

async function token() {
  try {
    return (await window.Clerk?.session?.getToken?.()) || null;
  } catch {
    return null;
  }
}

// Envía las respuestas pendientes al servidor (si existe); si no, se quedan en este navegador
export async function registrarItem(id, ok) {
  let cola = [];
  try {
    cola = JSON.parse(localStorage.getItem(COLA) || "[]");
  } catch {}
  cola.push({ id, ok: Boolean(ok), t: Date.now() });
  try {
    localStorage.setItem(COLA, JSON.stringify(cola.slice(-500)));
  } catch {}
  if (!API || cola.length < 5) return;
  try {
    const t = await token();
    const r = await fetch(`${API}/items/answers`, { method: "POST", headers: { "Content-Type": "application/json", ...(t ? { Authorization: `Bearer ${t}` } : {}) }, body: JSON.stringify({ answers: cola.slice(-50) }) });
    if (r.ok) localStorage.setItem(COLA, "[]");
  } catch {}
}

// Dificultad real de cada ítem (proporción de aciertos) a partir de todos los alumnos, o de este navegador
export async function estadisticas() {
  if (global) return global;
  if (API) {
    try {
      const t = await token();
      const r = await fetch(`${API}/items/stats`, { headers: t ? { Authorization: `Bearer ${t}` } : {} });
      if (r.ok) return (global = (await r.json()).items || {});
    } catch {}
  }
  const local = {};
  try {
    for (const a of JSON.parse(localStorage.getItem(COLA) || "[]")) {
      local[a.id] = local[a.id] || { n: 0, ok: 0 };
      local[a.id].n++;
      local[a.id].ok += a.ok ? 1 : 0;
    }
  } catch {}
  return (global = local);
}

/** Ítems de un nivel, retirando los mal calibrados: con ≥30 respuestas, casi nadie o casi todos aciertan */
export async function bancoNivel(nivel) {
  const st = await estadisticas();
  return (BANCO[nivel] || []).filter((it) => {
    const s = st[it.id];
    if (!s || s.n < 30) return true;
    const p = s.ok / s.n;
    return p >= 0.15 && p <= 0.97;
  });
}
