// Racha real de días de estudio (se registra al abrir la app)
const KEY = "ai-espanol:active-days";
const dayKey = (d = new Date()) => d.toISOString().slice(0, 10);

function readDays() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function touchStreak() {
  const days = readDays();
  const today = dayKey();
  if (days[days.length - 1] !== today) {
    days.push(today);
    try {
      localStorage.setItem(KEY, JSON.stringify(days.slice(-400)));
    } catch {}
  }
  return getStreak();
}

export function getStreak() {
  const set = new Set(readDays());
  let n = 0;
  const d = new Date();
  if (!set.has(dayKey(d))) d.setDate(d.getDate() - 1);
  while (set.has(dayKey(d))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

export function lastDays(count = 7) {
  const set = new Set(readDays());
  return Array.from({ length: count }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (count - 1 - i));
    return { date: d, active: set.has(dayKey(d)) };
  });
}
