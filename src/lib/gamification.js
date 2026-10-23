import * as React from "react";

// Gamificación: XP, nivel, meta diaria, vidas, lecciones completadas y logros (localStorage).
// Cada cambio emite "ai-espanol:xp" para que la barra superior y las celebraciones se actualicen.

const KEY = "ai-espanol:game-v1";
const HEART_MAX = 5;
const HEART_REGEN_MS = 30 * 60 * 1000;
const today = () => new Date().toISOString().slice(0, 10);

const DEFAULT = { xp: 0, daily: {}, goal: 30, hearts: HEART_MAX, heartsAt: 0, lessons: {}, badges: [], perfect: 0 };

function read() {
  try {
    return { ...DEFAULT, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    return { ...DEFAULT };
  }
}
function write(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
  window.dispatchEvent(new CustomEvent("ai-espanol:xp", { detail: state }));
}

// Nivel del jugador: cada nivel cuesta un poco más (100, 150, 200…)
export function levelFromXp(xp) {
  let level = 1;
  let need = 100;
  let rest = xp;
  while (rest >= need) {
    rest -= need;
    level++;
    need += 50;
  }
  return { level, into: rest, need, pct: Math.round((rest / need) * 100) };
}

function regenHearts(s) {
  if (s.hearts >= HEART_MAX) return s;
  const gained = Math.floor((Date.now() - (s.heartsAt || Date.now())) / HEART_REGEN_MS);
  if (gained <= 0) return s;
  const hearts = Math.min(HEART_MAX, s.hearts + gained);
  return { ...s, hearts, heartsAt: hearts >= HEART_MAX ? 0 : s.heartsAt + gained * HEART_REGEN_MS };
}

export function getGame() {
  const s = regenHearts(read());
  const lv = levelFromXp(s.xp);
  const dailyXp = s.daily[today()] || 0;
  const nextHeartIn = s.hearts < HEART_MAX ? Math.max(0, HEART_REGEN_MS - (Date.now() - s.heartsAt)) : 0;
  return { ...s, ...lv, dailyXp, goalPct: Math.min(100, Math.round((dailyXp / s.goal) * 100)), heartMax: HEART_MAX, nextHeartIn };
}

export const BADGES = [
  { id: "first-lesson", emoji: "🎯", es: "Primera lección", zh: "第一课", test: (s) => Object.keys(s.lessons).length >= 1 },
  { id: "ten-lessons", emoji: "📚", es: "10 lecciones", zh: "完成10课", test: (s) => Object.keys(s.lessons).length >= 10 },
  { id: "fifty-lessons", emoji: "🎓", es: "50 lecciones", zh: "完成50课", test: (s) => Object.keys(s.lessons).length >= 50 },
  { id: "perfect", emoji: "💎", es: "Lección perfecta", zh: "满分课程", test: (s) => s.perfect >= 1 },
  { id: "perfect10", emoji: "👑", es: "10 perfectas", zh: "10次满分", test: (s) => s.perfect >= 10 },
  { id: "xp500", emoji: "⚡", es: "500 XP", zh: "500经验", test: (s) => s.xp >= 500 },
  { id: "xp2000", emoji: "🚀", es: "2.000 XP", zh: "2000经验", test: (s) => s.xp >= 2000 },
  { id: "goal7", emoji: "🔥", es: "Meta cumplida 7 días", zh: "7天达成目标", test: (s) => Object.values(s.daily).filter((x) => x >= s.goal).length >= 7 },
];

/** Suma XP y devuelve { gained, levelUp, newBadges } para celebrarlo */
export function addXp(amount, extra = {}) {
  const before = read();
  const s = { ...before, daily: { ...before.daily } };
  s.xp += amount;
  s.daily[today()] = (s.daily[today()] || 0) + amount;
  if (extra.lessonId) s.lessons = { ...s.lessons, [extra.lessonId]: { at: Date.now(), score: extra.score ?? 100, best: Math.max(extra.score ?? 0, before.lessons[extra.lessonId]?.best ?? 0) } };
  if (extra.perfect) s.perfect = (s.perfect || 0) + 1;
  const newBadges = BADGES.filter((b) => !s.badges.includes(b.id) && b.test(s));
  s.badges = [...s.badges, ...newBadges.map((b) => b.id)];
  write(s);
  const levelUp = levelFromXp(s.xp).level > levelFromXp(before.xp).level;
  const goalReached = (before.daily[today()] || 0) < s.goal && s.daily[today()] >= s.goal;
  return { gained: amount, levelUp, goalReached, newBadges };
}

export function loseHeart() {
  const s = regenHearts(read());
  if (s.hearts <= 0) return 0;
  const next = { ...s, hearts: s.hearts - 1, heartsAt: s.hearts === HEART_MAX ? Date.now() : s.heartsAt || Date.now() };
  write(next);
  return next.hearts;
}

export function refillHearts() {
  write({ ...read(), hearts: HEART_MAX, heartsAt: 0 });
}

export function setDailyGoal(goal) {
  write({ ...read(), goal });
}

export function isLessonDone(id) {
  return Boolean(read().lessons[id]);
}
export function lessonsDone() {
  return read().lessons;
}

export function useGame() {
  const [state, setState] = React.useState(getGame);
  React.useEffect(() => {
    const on = () => setState(getGame());
    window.addEventListener("ai-espanol:xp", on);
    const t = setInterval(on, 60000);
    return () => {
      window.removeEventListener("ai-espanol:xp", on);
      clearInterval(t);
    };
  }, []);
  return state;
}

