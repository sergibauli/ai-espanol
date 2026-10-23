import { getModuleProgress, countCompletedModules } from "../../lib/progress.js";
import { getSrsStats } from "../../lib/srs.js";
import CATALOG from "./catalog.json";
// Perfil del alumno para el tutor IA. Usa el índice ligero (catalog.json) para no cargar los 80 módulos completos.
const ALL_MODULES = CATALOG.map((m) => ({ ...m, id: `modulo-${m.numero}` }));
const levelForModuleNumber = (numero) => (numero <= 20 ? "A1" : numero <= 40 ? "A2" : numero <= 50 ? "B1" : "B2");
function buildStudentProfile() {
  const i = getModuleProgress();
  const t = countCompletedModules();
  const c = getSrsStats();
  const u = ALL_MODULES.filter((g) => i[g.id]?.completed)
    .slice(-5)
    .map((g) => g.titulo);
  const s = { A1: 0, A2: 0, B1: 0, B2: 0 };
  for (const g of ALL_MODULES) {
    s[g.nivel || levelForModuleNumber(g.numero)]++;
  }
  const d = {
    A1: 0,
    A2: 0,
    B1: 0,
    B2: 0,
  };
  for (const g of ALL_MODULES) {
    if (i[g.id]?.completed) {
      d[g.nivel || levelForModuleNumber(g.numero)]++;
    }
  }
  const m = Object.entries(s).sort((g, v) => d[g[0]] / g[1] - d[v[0]] / v[1])[0][0];
  return [
    `Progreso del estudiante: ${t}/${ALL_MODULES.length} módulos completados.`,
    u.length ? `Últimos módulos completados: ${u.join("; ")}.` : "Aún no ha completado módulos.",
    `Nivel más débil (recomienda reforzarlo): ${m}.`,
    `Memoria espaciada (SRS): ${c.total} palabras (${c.mastered} dominadas, ${c.due} pendientes de repaso).`,
  ].join(`
`);
}
export { buildStudentProfile };
