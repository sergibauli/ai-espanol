import { getModuleProgress, countCompletedModules } from "../../lib/progress.js";
import { getSrsStats } from "../../lib/srs.js";
import { MODULOS_01_20 } from "./modulos-01-20.js";
import { MODULOS_21_40 } from "./modulos-21-40.js";
import { MODULOS_41_60 } from "./modulos-41-60.js";
const ALL_MODULES = [...MODULOS_01_20, ...MODULOS_21_40, ...MODULOS_41_60].sort(
  (i, t) => i.numero - t.numero,
);
function levelForModuleNumber(numero) {
  if (numero <= 20) {
    return "A1";
  }
  if (numero <= 40) {
    return "A2";
  }
  if (numero <= 50) {
    return "B1";
  }
  return "B2";
}
function buildStudentProfile() {
  const i = getModuleProgress();
  const t = countCompletedModules();
  const c = getSrsStats();
  const u = ALL_MODULES.filter((g) => i[g.id]?.completed)
    .slice(-5)
    .map((g) => g.titulo);
  const s = {
    A1: 20,
    A2: 20,
    B1: 10,
    B2: 10,
  };
  const d = {
    A1: 0,
    A2: 0,
    B1: 0,
    B2: 0,
  };
  for (const g of ALL_MODULES) {
    if (i[g.id]?.completed) {
      d[levelForModuleNumber(g.numero)]++;
    }
  }
  const m = Object.entries(s).sort((g, v) => d[g[0]] / g[1] - d[v[0]] / v[1])[0][0];
  return [
    `Progreso del estudiante: ${t}/60 módulos completados.`,
    u.length ? `Últimos módulos completados: ${u.join("; ")}.` : "Aún no ha completado módulos.",
    `Nivel más débil (recomienda reforzarlo): ${m}.`,
    `Memoria espaciada (SRS): ${c.total} palabras (${c.mastered} dominadas, ${c.due} pendientes de repaso).`,
  ].join(`
`);
}
export { buildStudentProfile, ALL_MODULES };
