const SRS_KEY = "dele_srs_v1";
const DAY_MS = 1440 * 60 * 1000;
const SRS_INTERVAL_DAYS = [0, 1, 3, 7, 14, 30];
const SRS_MAX_BOX = SRS_INTERVAL_DAYS.length - 1;
function normalizeWord(i) {
  return i.trim().toLowerCase();
}
function getSrsCards() {
  try {
    const i = localStorage.getItem(SRS_KEY);
    return (i ? JSON.parse(i) : []).filter((c) => c && typeof c.word === "string");
  } catch {
    return [];
  }
}
function saveSrsCards(i) {
  try {
    localStorage.setItem(SRS_KEY, JSON.stringify(i));
  } catch {}
}
function addSrsCard(i, t, c, u) {
  const s = getSrsCards();
  const d = normalizeWord(i);
  if (s.some((m) => normalizeWord(m.word) === d)) {
    return false;
  }
  return (
    s.push({
      word: i,
      chinese: t,
      source: c,
      level: u,
      box: 0,
      nextReview: Date.now(),
      lastReview: 0,
      correctCount: 0,
      wrongCount: 0,
    }),
    saveSrsCards(s),
    true
  );
}
function removeSrsCard(i) {
  const t = normalizeWord(i);
  saveSrsCards(getSrsCards().filter((c) => normalizeWord(c.word) !== t));
}
function hasSrsCard(i) {
  const t = normalizeWord(i);
  return getSrsCards().some((c) => normalizeWord(c.word) === t);
}
function reviewSrsCard(i, t) {
  const c = normalizeWord(i);
  const u = getSrsCards();
  const s = u.find((d) => normalizeWord(d.word) === c);
  if (s) {
    if (t) {
      s.box = Math.min(SRS_MAX_BOX, s.box + 1);
      s.correctCount++;
    } else {
      s.box = Math.max(0, s.box - 1);
      s.wrongCount++;
    }
    s.lastReview = Date.now();
    s.nextReview = Date.now() + SRS_INTERVAL_DAYS[s.box] * DAY_MS;
    saveSrsCards(u);
  }
}
function getDueSrsCards() {
  const i = Date.now();
  return getSrsCards()
    .filter((t) => t.nextReview <= i)
    .sort((t, c) => t.nextReview - c.nextReview);
}
function getSrsStats() {
  const i = getSrsCards();
  return {
    total: i.length,
    due: i.filter((t) => t.nextReview <= Date.now()).length,
    mastered: i.filter((t) => t.box >= SRS_MAX_BOX).length,
    learning: i.filter((t) => t.box > 0 && t.box < SRS_MAX_BOX).length,
    new: i.filter((t) => t.box === 0).length,
  };
}
function importSrsCards(i) {
  let t = 0;
  for (const c of i) {
    if (addSrsCard(c.word, c.chinese, c.source, c.level)) {
      t++;
    }
  }
  return t;
}
const SRS_BOX_LABELS_ES = ["Nueva", "1 día", "3 días", "7 días", "14 días", "Dominada"];
const SRS_BOX_LABELS_ZH = ["新词", "1天", "3天", "7天", "14天", "已掌握"];
export {
  getSrsStats,
  getDueSrsCards,
  getSrsCards,
  SRS_BOX_LABELS_ES,
  SRS_BOX_LABELS_ZH,
  removeSrsCard,
  reviewSrsCard,
  importSrsCards,
  hasSrsCard,
  addSrsCard,
};
