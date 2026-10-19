// Estado del alumno en localStorage con suscripción reactiva (useSyncExternalStore).
import { useSyncExternalStore } from 'react';

const KEY = 'aie_v2_state';

const initial = {
  profile: { onboarded: false, level: 'A1', goal: 'dele', minutesPerDay: 20, examDate: '', name: '' },
  xp: 0,
  streak: { count: 0, last: '' },
  today: { date: '', minutes: 0, xp: 0, done: [] },
  skills: {
    lectura: { ok: 0, total: 0 },
    audicion: { ok: 0, total: 0 },
    vocabulario: { ok: 0, total: 0 },
    escritura: { ok: 0, total: 0 },
    oral: { ok: 0, total: 0 },
  },
  themes: {}, // "A1-3": { lectura: 0.8, audicion: 0.6, vocab: true, ... }
  oficiales: [], // { level, modelo, date, score, max, parts }
  srs: {}, // cardId: { due, interval, ease, reps }
  usage: { date: '', ai: 0 },
  history: [], // eventos recientes para automatizaciones: { t, type, ... }
  settings: { theme: 'system', showZh: true },
};

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(initial);
    const s = JSON.parse(raw);
    return { ...structuredClone(initial), ...s, profile: { ...initial.profile, ...s.profile }, settings: { ...initial.settings, ...s.settings }, skills: { ...initial.skills, ...s.skills } };
  } catch {
    return structuredClone(initial);
  }
}

let state = read();
const listeners = new Set();

export const todayKey = (d = new Date()) => d.toISOString().slice(0, 10);

function rollDay(s) {
  const t = todayKey();
  if (s.today.date !== t) s.today = { date: t, minutes: 0, xp: 0, done: [] };
  if (s.usage.date !== t) s.usage = { date: t, ai: 0 };
  return s;
}

export function getState() { return state; }

export function update(fn) {
  const next = rollDay(structuredClone(state));
  fn(next);
  next.history = next.history.slice(-200);
  state = next;
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* modo privado */ }
  listeners.forEach(l => l());
}

export function useStore(selector = s => s) {
  const snap = useSyncExternalStore(cb => { listeners.add(cb); return () => listeners.delete(cb); }, () => state);
  return selector(snap);
}

// --- Acciones de alto nivel ---

function touchStreak(s) {
  const t = todayKey();
  if (s.streak.last === t) return;
  const y = todayKey(new Date(Date.now() - 864e5));
  s.streak = { count: s.streak.last === y ? s.streak.count + 1 : 1, last: t };
}

/** Registra una actividad: suma XP, racha, habilidad y evento para el motor adaptativo. */
export function recordActivity({ type, skill, ok = 0, total = 0, xp = 0, minutes = 0, ref }) {
  update(s => {
    touchStreak(s);
    s.xp += xp;
    s.today.xp += xp;
    s.today.minutes += minutes;
    if (ref && !s.today.done.includes(ref)) s.today.done.push(ref);
    if (skill && s.skills[skill]) {
      s.skills[skill].ok += ok;
      s.skills[skill].total += total;
    }
    s.history.push({ t: Date.now(), type, skill, ok, total, ref });
  });
}

export function setThemeProgress(level, id, section, value) {
  update(s => {
    const k = `${level}-${id}`;
    s.themes[k] = { ...(s.themes[k] || {}), [section]: value };
  });
}

export function addOficialResult(r) {
  update(s => { s.oficiales.push({ ...r, date: Date.now() }); });
}

export function countAiUse() {
  update(s => { s.usage.ai += 1; });
}

export function setProfile(p) {
  update(s => { s.profile = { ...s.profile, ...p }; });
}

export function setSettings(p) {
  update(s => { s.settings = { ...s.settings, ...p }; });
}

export function resetAll() {
  state = structuredClone(initial);
  try { localStorage.removeItem(KEY); } catch { /* ignorar */ }
  listeners.forEach(l => l());
}

// --- Repaso espaciado (SM-2 simplificado) ---
export function reviewCard(id, grade /* 0 fallo, 1 difícil, 2 bien, 3 fácil */) {
  update(s => {
    const c = s.srs[id] || { interval: 0, ease: 2.5, reps: 0, due: 0 };
    if (grade === 0) {
      c.reps = 0;
      c.interval = 0;
      c.ease = Math.max(1.3, c.ease - 0.2);
      c.due = Date.now() + 10 * 60e3;
    } else {
      c.reps += 1;
      c.ease = Math.max(1.3, c.ease + (grade - 2) * 0.15);
      c.interval = c.reps === 1 ? 1 : c.reps === 2 ? 3 : Math.round(c.interval * c.ease * (grade === 3 ? 1.3 : grade === 1 ? 0.8 : 1));
      c.due = Date.now() + c.interval * 864e5;
    }
    s.srs[id] = c;
  });
}

export function addCards(ids) {
  update(s => {
    for (const id of ids) if (!s.srs[id]) s.srs[id] = { interval: 0, ease: 2.5, reps: 0, due: Date.now() };
  });
}
