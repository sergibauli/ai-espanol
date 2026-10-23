import { GRAMMAR_TOPICS } from "../data/gramatica.js";
import { SITE_INFO } from "../data/siteInfo.js";
function buildKnowledgeIndex() {
  const i = [];
  for (const c of GRAMMAR_TOPICS) {
    const u = [
      c.title,
      c.titleCn,
      c.explanation,
      c.explanationCn,
      ...c.examples.flatMap((d) => [d.es, d.zh]),
      c.commonError,
      c.commonErrorCn,
    ]
      .join(" ")
      .toLowerCase();
    const s = `【Gramática / 语法】${c.title} (${c.titleCn}) [${c.level}]
${c.explanationCn}
Ejemplos: ${c.examples.map((d) => `${d.es}（${d.zh}）`).join("；")}
Error común: ${c.commonErrorCn}
Consejo: ${c.tipCn}`;
    i.push({
      title: `${c.title} (${c.titleCn})`,
      keywords: u,
      content: s,
    });
  }
  for (const [c, u] of Object.entries(SITE_INFO.examThemes)) {
    const s = u.map((g) => `${g.es}（${g.zh}）`).join("、");
    const d =
      `${c} exámenes examenes temas ${u.map((g) => g.es).join(" ")} ${u.map((g) => g.zh).join(" ")}`.toLowerCase();
    const m = `【Exámenes ${c} / ${c} 考试】共 ${SITE_INFO.levels[c]?.count ?? "?"} 个模拟考试。主题：${s}。${SITE_INFO.examSections.zh}`;
    i.push({
      title: `Exámenes nivel ${c}`,
      keywords: d,
      content: m,
    });
  }
  const t = SITE_INFO.moduleTopics.join("、");
  i.push({
    title: "Módulos de aprendizaje (学习模块)",
    keywords: `módulos modulos temas lecciones ${t}`.toLowerCase(),
    content: `【Módulos / 模块】La app tiene 60+ módulos de aprendizaje: ${t}。Cada módulo incluye teoría, vocabulario, diálogos y ejercicios.`,
  });
  for (const [c, u] of Object.entries(SITE_INFO.dictionaryThemes)) {
    i.push({
      title: `Diccionario ${c}`,
      keywords: `diccionario ${c} vocabulario ${u.join(" ")}`.toLowerCase(),
      content: `【Diccionario ${c} / ${c} 词典】Temáticas: ${u.join("、")}。Cada palabra tiene traducción, explicación y frase de ejemplo en ES/中文.`,
    });
  }
  i.push({
    title: "Sobre la app",
    keywords: "app aplicación qué es ayuda sobre app es la aplicación 应用 是什么".toLowerCase(),
    content: `【AI Español / AI 西班牙语】${SITE_INFO.descriptionCn}。Niveles: A1 (42 exámenes), A2 (30), B1 (30), B2 (30). ${SITE_INFO.examSections.zh}`,
  });
  return i;
}
function searchKnowledge(i, t = 4) {
  const c = i.toLowerCase().trim();
  if (!c) {
    return [];
  }
  const u = c.split(/[\s,，。?!¿¡、/]+/).filter((m) => m.length > 1);
  return buildKnowledgeIndex()
    .map((entry) => {
      let score = 0;
      if (entry.keywords.includes(c)) {
        score += 6;
      }
      for (const v of u) {
        if (v.length >= 2 && entry.keywords.includes(v)) {
          score += 2;
        }
        if (entry.keywords.includes(v.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) {
          score += 1;
        }
      }
      return {
        entry,
        score,
      };
    })
    .filter((m) => m.score > 0)
    .sort((m, g) => g.score - m.score)
    .slice(0, t)
    .map((m) => ({
      title: m.entry.title,
      content: m.entry.content,
    }));
}
function getKnowledgeContext(i) {
  const t = searchKnowledge(i, 4);
  if (t.length === 0) {
    return "";
  }
  return t.map((c) => c.content).join(`

---

`);
}
export { getKnowledgeContext };
