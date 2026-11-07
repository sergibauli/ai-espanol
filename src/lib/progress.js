// Progreso de las unidades (clave «dele_module_progress», por id «modulo-N») y de sus clases
// (clave «dele_class_progress», por id interno «modulo-N#cK»). Las dos son independientes: lo que
// ya existía no cambia de forma y las páginas que solo cuentan unidades siguen funcionando igual.
const MODULE_PROGRESS_KEY = "dele_module_progress";
const CLASS_PROGRESS_KEY = "dele_class_progress";

function readJson(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) || {} : {};
  } catch {
    return {};
  }
}
function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
  try {
    window.dispatchEvent(new Event("progreso-clases"));
  } catch {}
}
const readModuleProgress = () => readJson(MODULE_PROGRESS_KEY);
const writeModuleProgress = (progress) => writeJson(MODULE_PROGRESS_KEY, progress);

function getModuleProgress() {
  return readModuleProgress();
}
function markModuleVisited(moduloId) {
  const progress = readModuleProgress();
  const prev = progress[moduloId] ?? { completed: false, score: 0, lastVisited: 0 };
  progress[moduloId] = { ...prev, lastVisited: Date.now() };
  writeModuleProgress(progress);
}
function completeModule(moduloId, score = 100) {
  const progress = readModuleProgress();
  const prev = progress[moduloId] ?? { score: 0 };
  progress[moduloId] = { ...prev, completed: true, score: Math.max(prev.score || 0, score), lastVisited: Date.now() };
  writeModuleProgress(progress);
}
function recordModuleScore(moduloId, score) {
  const progress = readModuleProgress();
  const prev = progress[moduloId] ?? { completed: false, score: 0 };
  progress[moduloId] = { ...prev, completed: prev.completed || score >= 80, score: Math.max(prev.score || 0, score), lastVisited: Date.now() };
  writeModuleProgress(progress);
}
function countCompletedModules() {
  return Object.values(readModuleProgress()).filter((p) => p.completed).length;
}
function isModuleCompleted(moduloId) {
  return Boolean(readModuleProgress()[moduloId]?.completed);
}

// ---------- Clases ----------
const classKey = (moduloId, clase) => `${moduloId}#c${clase}`;
function getClassProgress() {
  return readJson(CLASS_PROGRESS_KEY);
}
// Una clase cuenta como hecha si se completó o si la unidad entera ya estaba completada (compatibilidad)
function isClassCompleted(moduloId, clase, classProgress = getClassProgress(), moduleProgress = readModuleProgress()) {
  return Boolean(moduleProgress[moduloId]?.completed || classProgress[classKey(moduloId, clase)]?.completed);
}
// Si con esta clase quedan hechas todas las de la unidad, la unidad pasa a completada
function syncModuleFromClasses(moduloId, totalClases) {
  if (!totalClases) return false;
  const classes = getClassProgress();
  const keys = Array.from({ length: totalClases }, (_, i) => classKey(moduloId, i + 1));
  if (!keys.every((k) => classes[k]?.completed)) return false;
  if (!isModuleCompleted(moduloId)) {
    const media = Math.round(keys.reduce((s, k) => s + (classes[k].score || 0), 0) / keys.length);
    completeModule(moduloId, media || 100);
  }
  return true;
}
function recordClassScore(moduloId, clase, score, totalClases) {
  const classes = getClassProgress();
  const key = classKey(moduloId, clase);
  const prev = classes[key] ?? { completed: false, score: 0 };
  classes[key] = { ...prev, completed: prev.completed || score >= 80, score: Math.max(prev.score || 0, score), lastVisited: Date.now() };
  writeJson(CLASS_PROGRESS_KEY, classes);
  return syncModuleFromClasses(moduloId, totalClases);
}
function completeClass(moduloId, clase, score = 100, totalClases) {
  const classes = getClassProgress();
  const key = classKey(moduloId, clase);
  const prev = classes[key] ?? { score: 0 };
  classes[key] = { ...prev, completed: true, score: Math.max(prev.score || 0, score), lastVisited: Date.now() };
  writeJson(CLASS_PROGRESS_KEY, classes);
  return syncModuleFromClasses(moduloId, totalClases);
}

export {
  getModuleProgress,
  countCompletedModules,
  recordModuleScore,
  completeModule,
  markModuleVisited,
  isModuleCompleted,
  classKey,
  getClassProgress,
  isClassCompleted,
  recordClassScore,
  completeClass,
};
