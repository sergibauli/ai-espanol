// Progreso falso pero verosímil para las capturas del vídeo (se inyecta con addInitScript; solo en el navegador de captura).
(() => {
  if (localStorage.getItem('__semilla_promo')) return;
  const dia = (n) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);
  // Racha de 23 días seguidos (+ algunos sueltos antes)
  const dias = [40, 38, 35, 33, 31, 29, 27, 26, 25, 24, 23].map(dia).concat(Array.from({ length: 23 }, (_, i) => dia(22 - i)));
  localStorage.setItem('ai-espanol:active-days', JSON.stringify(dias));
  // XP, meta diaria, lecciones y logros
  const daily = {};
  dias.forEach((d, i) => (daily[d] = 25 + ((i * 17) % 40)));
  daily[dia(0)] = 45;
  const lessons = {};
  for (let m = 1; m <= 14; m++) for (let l = 1; l <= 5; l++) lessons[`m${m}-l${l}`] = { at: Date.now() - (15 - m) * 864e5, score: 80 + ((m * l) % 21), best: 90 + ((m + l) % 11) };
  localStorage.setItem('ai-espanol:game-v1', JSON.stringify({ xp: 2460, daily, goal: 30, hearts: 5, heartsAt: 0, lessons, badges: ['first-lesson', 'ten-lessons', 'fifty-lessons', 'perfect', 'perfect10', 'xp500', 'xp2000', 'goal7'], perfect: 12 }));
  // Unidades
  const mp = {};
  for (let m = 1; m <= 14; m++) mp[`modulo-${m}`] = { completed: m <= 12, score: m <= 12 ? 78 + ((m * 7) % 22) : 0, lastVisited: Date.now() - (15 - m) * 864e5 };
  localStorage.setItem('dele_module_progress', JSON.stringify(mp));
  const cp = {};
  for (let m = 1; m <= 12; m++) for (let c = 1; c <= 2; c++) cp[`modulo-${m}#c${c}`] = { completed: true, score: 85 + ((m + c) % 15), lastVisited: Date.now() - (15 - m) * 864e5 };
  localStorage.setItem('dele_class_progress', JSON.stringify(cp));
  // Exámenes por nivel: A1 casi terminado, A2 empezado
  const notasA1 = [92, 88, 95, 84, 90, 79, 86, 93, 81, 89, 94, 87];
  notasA1.forEach((n, i) => localStorage.setItem(`oficial_res_A1_${i + 1}`, JSON.stringify({ lectura: n + 2 > 100 ? 100 : n + 2, audicion: n - 3, total: n, fecha: dia(30 - i * 2) + 'T10:00:00.000Z' })));
  [78, 85, 72, 88, 81].forEach((n, i) => localStorage.setItem(`oficial_res_A2_${i + 1}`, JSON.stringify({ lectura: n + 4, audicion: n - 4, total: n, fecha: dia(6 - i) + 'T10:00:00.000Z' })));
  localStorage.setItem('oficial_res_B1_1', JSON.stringify({ lectura: 70, audicion: 62, total: 66, fecha: dia(1) + 'T10:00:00.000Z' }));
  // Respuestas por destreza (nivel A2) para la previsión de aprobado
  const skills = { lectura: 0.76, audicion: 0.7, vocabulario: 0.8, gramatica: 0.72, escritura: 0.7, oral: 0.66 };
  const answers = [];
  let k = 0;
  for (const [s, p] of Object.entries(skills)) for (let i = 0; i < 50; i++) answers.push({ t: Date.now() - (300 - k++) * 36e5, skill: s, level: i % 5 === 0 ? 'A1' : 'A2', ok: ((i * 37) % 100) / 100 < p, src: 'examen' });
  answers.sort((a, b) => a.t - b.t);
  const tasks = [
    { skill: 'escritura', score: 64 }, { skill: 'escritura', score: 70 }, { skill: 'escritura', score: 76 },
    { skill: 'oral', score: 60 }, { skill: 'oral', score: 68 }, { skill: 'oral', score: 74 },
  ].map((x, i) => ({ ...x, t: Date.now() - (10 - i) * 864e5, level: 'A2', criterios: [], src: 'tarea' }));
  const errors = [
    { prompt: 'Ayer yo *estoy* en casa de mi abuela.', correct: 'Ayer yo estuve en casa de mi abuela.', explain: '“ayer”表示过去已完成的时间，用简单过去时 estuve。', skill: 'gramatica', tipo: 'gramática' },
    { prompt: 'Me gusta *los* gatos.', correct: 'Me gustan los gatos.', explain: 'gustar 与后面的名词一致：复数用 gustan。', skill: 'gramatica', tipo: 'gramática' },
    { prompt: 'Soy *en* Madrid.', correct: 'Estoy en Madrid.', explain: '表示位置用 estar，不用 ser。', skill: 'gramatica', tipo: 'gramática' },
  ].map((e, i) => ({ ...e, t: Date.now() - (3 - i) * 864e5, level: 'A2', src: 'examen', repasos: 0 }));
  localStorage.setItem('ai-espanol:dele-v1', JSON.stringify({ answers, errors, tasks }));
  localStorage.setItem('ai-espanol:onboarded', '1');
  localStorage.setItem('dele_tv_vistos', JSON.stringify(['rey-mono-1', 'rey-mono-2', 'rey-mono-3']));
  localStorage.setItem('__semilla_promo', '1');
})();
