// Motor adaptativo: decide qué toca hoy, detecta puntos débiles y ajusta el nivel automáticamente.
import { LEVELS } from './data.js';

export const SKILL_LABEL = {
  lectura: 'Comprensión de lectura',
  audicion: 'Comprensión auditiva',
  vocabulario: 'Vocabulario',
  escritura: 'Expresión escrita',
  oral: 'Expresión oral',
};

export const SKILL_ROUTE = {
  lectura: 'lectura',
  audicion: 'audicion',
  vocabulario: 'vocab',
  escritura: 'escritura',
  oral: 'oral',
};

export function accuracy(sk) {
  return sk.total ? sk.ok / sk.total : null;
}

/** Habilidad con peor acierto (con un mínimo de respuestas para ser fiable). */
export function weakestSkill(skills) {
  let worst = null;
  for (const [k, v] of Object.entries(skills)) {
    const a = accuracy(v);
    if (a === null || v.total < 5) continue;
    if (!worst || a < worst.acc) worst = { skill: k, acc: a };
  }
  return worst;
}

export function dueCards(srs, now = Date.now()) {
  return Object.entries(srs).filter(([, c]) => c.due <= now).map(([id]) => id);
}

/** Siguiente tema sin terminar del nivel del alumno. */
export function nextTheme(themes, progress, level) {
  return themes.find(t => {
    const p = progress[`${level}-${t.id}`];
    return !p || !(p.lectura !== undefined && p.audicion !== undefined && p.vocab);
  }) ?? themes[0];
}

/** Recomendación de cambio de nivel según los últimos resultados del nivel actual. */
export function levelAdvice(state) {
  const { level } = state.profile;
  const recent = state.history.filter(h => h.total > 0 && h.ref?.includes(`${level}-`)).slice(-12);
  if (recent.length < 6) return null;
  const ok = recent.reduce((a, h) => a + h.ok, 0);
  const total = recent.reduce((a, h) => a + h.total, 0);
  const acc = ok / total;
  const i = LEVELS.indexOf(level);
  if (acc >= 0.85 && i < LEVELS.length - 1) return { dir: 'up', to: LEVELS[i + 1], acc };
  if (acc < 0.45 && i > 0) return { dir: 'down', to: LEVELS[i - 1], acc };
  return null;
}

/** Plan del día generado automáticamente a partir del perfil, el progreso y el tiempo disponible. */
export function dailyPlan(state, themes) {
  const { level, minutesPerDay, examDate } = state.profile;
  const tasks = [];
  const due = dueCards(state.srs);
  if (due.length) tasks.push({ id: 'review', kind: 'review', title: `Repasa ${Math.min(due.length, 20)} palabras`, sub: 'Repaso espaciado: justo antes de olvidarlas', minutes: 5, to: '/repaso' });

  const theme = themes?.length ? nextTheme(themes, state.themes, level) : null;
  const weak = weakestSkill(state.skills);
  if (theme) {
    const section = weak ? SKILL_ROUTE[weak.skill] : nextSection(state.themes[`${level}-${theme.id}`]);
    tasks.push({
      id: `theme-${level}-${theme.id}-${section}`,
      kind: 'theme',
      title: theme.theme,
      sub: weak ? `Refuerzo de ${SKILL_LABEL[weak.skill].toLowerCase()} (${Math.round(weak.acc * 100)} % de acierto)` : `Tema ${theme.id} · ${level}`,
      minutes: 10,
      to: `/modulos/${level}/${theme.id}?s=${section}`,
    });
  }

  if (minutesPerDay >= 20) tasks.push({ id: 'game', kind: 'game', title: 'Juego de vocabulario', sub: 'Fija las palabras del tema jugando', minutes: 5, to: '/juegos' });

  const days = examDate ? Math.ceil((new Date(examDate) - Date.now()) / 864e5) : null;
  const lastSim = state.oficiales.filter(o => o.level === level).at(-1);
  const simEvery = days !== null && days <= 30 ? 3 : 7;
  if (minutesPerDay >= 30 || (days !== null && days <= 60)) {
    if (!lastSim || Date.now() - lastSim.date > simEvery * 864e5) {
      tasks.push({ id: 'sim', kind: 'sim', title: `Simulacro oficial ${level}`, sub: days !== null ? `Faltan ${days} días para tu examen` : 'Mide tu nivel con un modelo completo', minutes: 25, to: `/oficial/${level}` });
    }
  }
  return tasks.map(t => ({ ...t, done: state.today.done.includes(t.id) }));
}

function nextSection(p = {}) {
  if (!p.vocab) return 'vocab';
  if (p.lectura === undefined) return 'lectura';
  if (p.audicion === undefined) return 'audicion';
  if (!p.escritura) return 'escritura';
  return 'oral';
}

/** Avisos automáticos para el panel. */
export function nudges(state) {
  const out = [];
  const advice = levelAdvice(state);
  if (advice) out.push({ kind: 'level', ...advice });
  const y = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
  if (state.streak.count >= 2 && state.streak.last === y) out.push({ kind: 'streak-risk', count: state.streak.count });
  if ([7, 14, 30].includes(state.streak.count) && state.streak.last === state.today.date) out.push({ kind: 'streak-milestone', count: state.streak.count });
  return out;
}

/** Prueba de nivel: preguntas tomadas de los temas reales de cada nivel. */
export function placementQuestions(themesByLevel, perLevel = 3) {
  const qs = [];
  for (const level of LEVELS) {
    const list = themesByLevel[level] || [];
    for (let i = 0; i < perLevel && list.length; i++) {
      const t = list[(i * 7 + 3) % list.length];
      const q = t.reading.questions[i % t.reading.questions.length];
      qs.push({ level, text: t.reading.text, title: t.reading.title, ...q });
    }
  }
  return qs;
}

export function placementResult(answers) {
  // Nivel = el más alto en el que acierta al menos 2 de 3
  let level = 'A1';
  for (const L of LEVELS) {
    const a = answers.filter(x => x.level === L);
    if (a.length && a.filter(x => x.ok).length >= Math.ceil(a.length * 0.66)) level = L;
    else break;
  }
  return level;
}
