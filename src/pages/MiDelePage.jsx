import * as React from "react";
import { Link } from "react-router";
import { LightShell } from "../components/layout/LightShell.jsx";
import { SectionHero } from "../components/ui/SectionHero.jsx";
import { LessonPlayer } from "../components/lesson/LessonPlayer.jsx";
import { getDele, setDele, predict, skillStats, errorNotebook, markReviewed, weekKey, monthKey, LEVELS, SKILLS } from "../lib/progresoDele.js";

const RUTAS = { "/ruta": "Ruta", "/modulos": "Unidades", "/examenes": "Práctica DELE", "/oficial": "Simulacro DELE", "/juegos": "Juegos", "/pronunciacion": "Pronunciación", "/diccionarios": "Diccionario", "/mi-dele": "Cuaderno de errores", "/examinador-oral": "Examinador oral IA", "/audicion": "Audición con acentos" };
const DIAS = ["Lunes · 周一", "Martes · 周二", "Miércoles · 周三", "Jueves · 周四", "Viernes · 周五", "Sábado · 周六", "Domingo · 周日"];

// Plan local (sin IA): refuerza las dos destrezas más flojas
function planLocal(stats) {
  const flojas = Object.entries(stats).filter(([k]) => SKILLS[k].prueba).sort((a, b) => (a[1].pct ?? 50) - (b[1].pct ?? 50)).map(([k]) => k);
  const ir = { lectura: "/examenes", audicion: "/examenes", escritura: "/examenes", oral: "/oficial" };
  return {
    consejo: { es: `Esta semana céntrate en ${SKILLS[flojas[0]].es.toLowerCase()}: 15 minutos al día valen más que 2 horas el domingo.`, zh: `本周重点练习${SKILLS[flojas[0]].zh}：每天15分钟比周末突击两小时更有效。` },
    plan: DIAS.map((d, i) => ({ dia: d, es: i === 6 ? "Simulacro corto y repaso del cuaderno de errores" : i % 2 ? `Práctica de ${SKILLS[flojas[1]].es.toLowerCase()}` : `Una lección de la ruta + ${SKILLS[flojas[0]].es.toLowerCase()}`, zh: i === 6 ? "小型模拟考 + 复习错题本" : i % 2 ? `${SKILLS[flojas[1]].zh}练习` : `学习一课 + ${SKILLS[flojas[0]].zh}`, ir: i === 6 ? "/mi-dele" : i % 2 ? ir[flojas[1]] : "/ruta" })),
  };
}

async function planIA(level, stats, errores) {
  const { deepseekFetch, isAIAvailable } = await import("../lib/deepseekClient.js");
  if (!isAIAvailable()) return null;
  const resumen = Object.entries(stats).map(([k, v]) => `${SKILLS[k].es}: ${v.pct ?? "sin datos"}% (${v.n} respuestas)`).join("; ");
  const errs = errores.slice(0, 8).map((e) => `«${e.prompt}» → ${e.correct}`).join(" | ");
  const prompt = `Eres tutor DELE ${level} de un estudiante chino. Su progreso: ${resumen}. Errores recientes: ${errs || "ninguno"}.
Devuelve SOLO JSON: {"consejo":{"es":"consejo de la semana, concreto y útil, máx. 30 palabras","zh":"traducción"},"plan":[{"dia":"Lunes · 周一","es":"tarea concreta de 15-20 min","zh":"traducción","ir":"una de: ${Object.keys(RUTAS).join(", ")}"}]} con 7 días (lunes a domingo), priorizando sus destrezas más flojas y sus errores.`;
  // El plan automático de la semana no gasta las consultas del alumno (uso «plan-semanal», gratis)
  const r = await deepseekFetch("", { uso: "plan-semanal", body: JSON.stringify({ messages: [{ role: "user", content: prompt }], temperature: 0.7, max_tokens: 900, response_format: { type: "json_object" } }) });
  const j = JSON.parse((await r.json())?.choices?.[0]?.message?.content || "{}");
  if (!j?.consejo?.es || !Array.isArray(j.plan) || j.plan.length < 5) return null;
  j.plan = j.plan.slice(0, 7).map((p, i) => ({ dia: p.dia || DIAS[i], es: String(p.es || ""), zh: String(p.zh || ""), ir: RUTAS[p.ir] ? p.ir : "/ruta" }));
  return j;
}

const RETOS = [
  { titulo: "Mes del oído · 听力月", es: "Responde 150 preguntas de audición y lectura este mes.", zh: "本月完成150道听力和阅读题。", meta: 150 },
  { titulo: "Mes de la constancia · 坚持月", es: "Responde 300 preguntas este mes: unas 10 al día.", zh: "本月完成300道题：每天大约10道。", meta: 300 },
  { titulo: "Mes del examinador · 考官月", es: "Haz 200 preguntas y al menos 2 redacciones corregidas.", zh: "完成200道题并至少批改2篇作文。", meta: 200 },
];

export default function MiDelePage() {
  const [d, setD] = React.useState(getDele);
  const [level, setLevel] = React.useState(() => getDele().diag?.nivel || "A2");
  const [lesson, setLesson] = React.useState(null);
  const [filtro, setFiltro] = React.useState("");
  const stats = skillStats(level);
  const pr = predict(level);
  const errores = errorNotebook(60).filter((e) => !filtro || e.skill === filtro);
  const semana = weekKey();
  const mes = monthKey();

  // Plan y consejo de la semana: se generan una vez por semana y se guardan
  React.useEffect(() => {
    if (d.semanal?.semana === semana && d.semanal?.nivel === level) return;
    let vivo = true;
    (async () => {
      let p = null;
      try {
        p = await planIA(level, stats, errorNotebook(10));
      } catch {}
      const semanal = { semana, nivel: level, ia: Boolean(p), ...(p || planLocal(stats)) };
      if (vivo) setD(setDele({ semanal }));
    })();
    return () => (vivo = false);
  }, [semana, level]);

  const reto = RETOS[(new Date().getMonth()) % RETOS.length];
  const inicioMes = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();
  const hechasMes = d.answers.filter((a) => a.t >= inicioMes).length;

  const repasar = () => {
    const pool = errorNotebook(30).filter((e) => Array.isArray(e.options) && e.options.length >= 2 && Number.isInteger(e.answer));
    const pick = pool.slice(0, 10);
    if (!pick.length) return;
    setLesson({
      id: `repaso-errores-${Date.now()}`,
      modulo: 0,
      index: 9,
      es: "Repaso de errores",
      zh: "错题复习",
      emoji: "📕",
      steps: pick.map((e) => ({ type: e.type === "listen" ? "listen" : "choice", prompt: e.type === "listen" ? "Escucha y elige · 听音选择" : e.prompt, speak: e.speak, options: e.options, answer: e.answer, explain: e.explain, _t: e.t })),
    });
  };

  return (
    <LightShell>
      <div className="ui-page">
        <SectionHero eyebrow="Mi DELE · 我的DELE" title="Mi DELE" titleZh="你离通过还有多远？" description="Tu nota prevista en cada prueba, tu probabilidad de APTO, tu plan de la semana y tus errores para repasar. Se calcula con todo lo que haces en la app." descriptionZh="根据你在应用中的所有练习，预测各项分数、通过概率，并生成每周计划和错题本。" />

        <div className="md-levels">
          {LEVELS.map((l) => (
            <button key={l} className={l === level ? "on" : ""} onClick={() => setLevel(l)}>
              {l}
            </button>
          ))}
          <Link to="/audicion" className="md-diag">
            🎧 Acentos · 口音听力
          </Link>
          <Link to="/examinador-oral" className="md-diag">
            🎙️ Examinador oral IA · AI口语考官
          </Link>
          <Link to="/diagnostico" className="md-diag">
            {d.diag ? `Diagnóstico: ${d.diag.nivel} · 重新测试` : "Hacer el diagnóstico · 水平测试"}
          </Link>
        </div>

        <section className="md-top">
          <div className="md-prob">
            <div className="md-gauge" style={{ "--p": pr.prob ?? 0 }}>
              <b>{pr.prob == null ? "—" : `${pr.prob}%`}</b>
              <small>Probabilidad de APTO · 通过概率</small>
            </div>
            <p>{pr.prob == null ? "Aún faltan datos: haz el diagnóstico y algún ejercicio de cada prueba. · 数据不足，请先做测试和练习。" : `Estimación con ${pr.datos} respuestas. Aprobar exige 30/50 en cada grupo. · 每组需达到30/50。`}</p>
          </div>
          <div className="md-pruebas">
            {["lectura", "audicion", "escritura", "oral"].map((k) => (
              <div key={k} className="md-prueba">
                <span>
                  {SKILLS[k].es}
                  <small>{SKILLS[k].zh}</small>
                </span>
                <div className="md-bar">
                  <i style={{ width: `${((pr.pruebas[k] ?? 0) / 25) * 100}%` }} className={(pr.pruebas[k] ?? 0) >= 15 ? "ok" : "low"} />
                </div>
                <b>{pr.pruebas[k] == null ? "—" : `${pr.pruebas[k]}/25`}</b>
              </div>
            ))}
            <div className="md-grupos">
              <span className={pr.g1 >= 30 ? "ok" : ""}>Grupo 1 (lectura + escritura): {pr.g1 ?? "—"}/50</span>
              <span className={pr.g2 >= 30 ? "ok" : ""}>Grupo 2 (audición + oral): {pr.g2 ?? "—"}/50</span>
            </div>
          </div>
        </section>

        <section className="md-grid">
          <div className="md-panel">
            <h3>Consejo de la semana · 本周建议</h3>
            {d.semanal ? (
              <>
                <p className="md-tip">
                  {d.semanal.consejo.es}
                  <small>{d.semanal.consejo.zh}</small>
                </p>
                <h4>Plan semanal {d.semanal.ia ? "· IA" : ""} · 每周计划</h4>
                <ol className="md-plan">
                  {d.semanal.plan.map((p, i) => (
                    <li key={i} className={i === (new Date().getDay() + 6) % 7 ? "hoy" : ""}>
                      <b>{p.dia}</b>
                      <span>
                        {p.es}
                        <small>{p.zh}</small>
                      </span>
                      <Link to={p.ir}>Ir · 去</Link>
                    </li>
                  ))}
                </ol>
              </>
            ) : (
              <p>Preparando tu plan… · 正在生成计划…</p>
            )}
          </div>
          <div className="md-panel">
            <h3>Reto del mes · 本月挑战</h3>
            <div className="md-reto">
              <span className="seal">{reto.titulo}</span>
              <p>
                {reto.es}
                <small>{reto.zh}</small>
              </p>
              <div className="md-bar big">
                <i className={hechasMes >= reto.meta ? "ok" : "low"} style={{ width: `${Math.min(100, (hechasMes / reto.meta) * 100)}%` }} />
              </div>
              <b>
                {hechasMes}/{reto.meta} · {mes}
              </b>
            </div>
            <h3 style={{ marginTop: 18 }}>Destrezas · 各项能力 ({level})</h3>
            {Object.entries(stats).map(([k, v]) => (
              <div key={k} className="md-prueba small">
                <span>{SKILLS[k].es}</span>
                <div className="md-bar">
                  <i className={(v.pct ?? 0) >= 60 ? "ok" : "low"} style={{ width: `${v.pct ?? 0}%` }} />
                </div>
                <b>{v.pct == null ? "—" : `${v.pct}%`}</b>
              </div>
            ))}
          </div>
        </section>

        <section className="md-panel">
          <div className="md-head">
            <h3>Cuaderno de errores · 错题本 ({errores.length})</h3>
            <button className="wel-btn red" onClick={repasar} disabled={!errores.some((e) => Array.isArray(e.options))}>
              Repasar mis errores · 复习错题
            </button>
          </div>
          <div className="md-filtros">
            <button className={!filtro ? "on" : ""} onClick={() => setFiltro("")}>
              Todos · 全部
            </button>
            {Object.keys(SKILLS).map((k) => (
              <button key={k} className={filtro === k ? "on" : ""} onClick={() => setFiltro(k)}>
                {SKILLS[k].es}
              </button>
            ))}
          </div>
          {!errores.length ? (
            <p>¡Aún no hay errores guardados! Haz lecciones y exámenes y aquí aparecerá lo que tienes que repasar. · 暂无错题。</p>
          ) : (
            <div className="md-errores">
              {errores.map((e) => (
                <div key={e.t} className="md-error">
                  <small>
                    {SKILLS[e.skill]?.es} · {e.level} · {e.src} {e.repasos ? `· repasado ×${e.repasos}` : ""}
                  </small>
                  <b>{e.prompt}</b>
                  {e.given && <s>{e.given}</s>}
                  <span className="ok">{e.correct}</span>
                  {e.explain && <p>{e.explain}</p>}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
      {lesson && (
        <LessonPlayer
          lesson={lesson}
          onClose={() => {
            lesson.steps.forEach((s) => markReviewed(s._t));
            setLesson(null);
            setD(getDele());
          }}
        />
      )}
    </LightShell>
  );
}
