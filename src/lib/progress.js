const MODULE_PROGRESS_KEY = "dele_module_progress";
function readModuleProgress() {
  try {
    const i = localStorage.getItem(MODULE_PROGRESS_KEY);
    if (i) {
      return JSON.parse(i);
    }
    return {};
  } catch {
    return {};
  }
}
function writeModuleProgress(i) {
  try {
    localStorage.setItem(MODULE_PROGRESS_KEY, JSON.stringify(i));
  } catch {}
}
function getModuleProgress() {
  return readModuleProgress();
}
function markModuleVisited(i) {
  const t = readModuleProgress();
  const c = t[i] ?? {
    completed: false,
    score: 0,
    lastVisited: 0,
  };
  t[i] = {
    ...c,
    lastVisited: Date.now(),
  };
  writeModuleProgress(t);
}
function completeModule(i, t = 100) {
  const c = readModuleProgress();
  const u = c[i] ?? {
    score: 0,
  };
  c[i] = {
    completed: true,
    score: Math.max(u.score, t),
    lastVisited: Date.now(),
  };
  writeModuleProgress(c);
}
function recordModuleScore(i, t) {
  const c = readModuleProgress();
  const u = c[i] ?? {
    completed: false,
    score: 0,
  };
  t > u.score;
  c[i] = {
    completed: u.completed || t >= 80,
    score: Math.max(u.score, t),
    lastVisited: Date.now(),
  };
  writeModuleProgress(c);
}
function countCompletedModules() {
  return Object.values(readModuleProgress()).filter((i) => i.completed).length;
}
export { getModuleProgress, countCompletedModules, recordModuleScore, completeModule, markModuleVisited };
