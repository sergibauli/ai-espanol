import * as React from "react";
import { Link } from "react-router";
import { BookOpenIcon, HeadphonesIcon, PenLineIcon, MicIcon, LanguagesIcon, PuzzleIcon, CompassIcon, ArrowRightIcon, SparklesIcon, RotateCcwIcon } from "lucide-react";
import { LightShell } from "../components/layout/LightShell.jsx";
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

// Icono y numeral chino de cada destreza (los numerales son decorativos)
const ICONO_DESTREZA = { lectura: BookOpenIcon, audicion: HeadphonesIcon, escritura: PenLineIcon, oral: MicIcon, vocabulario: LanguagesIcon, gramatica: PuzzleIcon };
const PRUEBAS = ["lectura", "audicion", "escritura", "oral"];
const NUMERAL = { lectura: "一", audicion: "二", escritura: "三", oral: "四" };
const HERRAMIENTAS = [
  { to: "/audicion", icono: HeadphonesIcon, es: "Acentos", zh: "口音听力", desc: "Oye España y América · 听不同口音" },
  { to: "/examinador-oral", icono: MicIcon, es: "Examinador oral IA", zh: "AI口语考官", desc: "Ensaya la prueba oral · 模拟口试" },
];

// Anillo de la probabilidad de APTO (SVG con degradado dorado)
function AnilloApto({ valor }) {
  const radio = 84;
  const circunferencia = 2 * Math.PI * radio;
  const relleno = valor == null ? 0 : valor / 100;
  return (
    <div className="in-md-anillo" role="img" aria-label={valor == null ? "Probabilidad de APTO: sin datos" : `Probabilidad de APTO: ${valor} %`}>
      <svg viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <linearGradient id="in-md-oro" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff3c4" />
            <stop offset=".5" stopColor="#f2c14e" />
            <stop offset="1" stopColor="#c8961e" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="97" className="in-md-anillo__borde" />
        {Array.from({ length: 40 }, (_, i) => {
          const angulo = (i / 40) * Math.PI * 2;
          return <circle key={i} cx={100 + Math.cos(angulo) * 92} cy={100 + Math.sin(angulo) * 92} r="1.6" className="in-md-anillo__perla" />;
        })}
        <circle cx="100" cy="100" r={radio} className="in-md-anillo__pista" />
        <circle cx="100" cy="100" r={radio} className="in-md-anillo__valor" strokeDasharray={circunferencia} strokeDashoffset={circunferencia * (1 - relleno)} transform="rotate(-90 100 100)" />
      </svg>
      <div className="in-md-anillo__centro">
        <b translate="no">{valor == null ? "—" : `${valor}%`}</b>
        <span>Probabilidad de APTO</span>
        <small>通过概率</small>
      </div>
    </div>
  );
}

export default function MiDelePage() {
  const [datos, setDatos] = React.useState(getDele);
  const [nivel, setNivel] = React.useState(() => getDele().diag?.nivel || "A2");
  const [leccion, setLeccion] = React.useState(null);
  const [filtro, setFiltro] = React.useState("");
  const estadisticas = skillStats(nivel);
  const prevision = predict(nivel);
  const errores = errorNotebook(60).filter((error) => !filtro || error.skill === filtro);
  const semana = weekKey();
  const mes = monthKey();
  const hoyIndice = (new Date().getDay() + 6) % 7;

  // Plan y consejo de la semana: se generan una vez por semana y se guardan
  React.useEffect(() => {
    if (datos.semanal?.semana === semana && datos.semanal?.nivel === nivel) return;
    let vivo = true;
    (async () => {
      let plan = null;
      try {
        plan = await planIA(nivel, estadisticas, errorNotebook(10));
      } catch {}
      const semanal = { semana, nivel, ia: Boolean(plan), ...(plan || planLocal(estadisticas)) };
      if (vivo) setDatos(setDele({ semanal }));
    })();
    return () => (vivo = false);
  }, [semana, nivel]);

  const reto = RETOS[new Date().getMonth() % RETOS.length];
  const inicioMes = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();
  const hechasMes = datos.answers.filter((respuesta) => respuesta.t >= inicioMes).length;
  const retoPct = Math.min(100, Math.round((hechasMes / reto.meta) * 100));
  const tareaHoy = datos.semanal?.plan?.[hoyIndice];
  const hayRepasables = errorNotebook(60).some((error) => Array.isArray(error.options) && error.options.length >= 2);
  const poseMono = prevision.prob == null ? "serio" : prevision.prob >= 60 ? "feliz" : "poder";

  const repasar = () => {
    const pool = errorNotebook(30).filter((error) => Array.isArray(error.options) && error.options.length >= 2 && Number.isInteger(error.answer));
    const elegidos = pool.slice(0, 10);
    if (!elegidos.length) return;
    setLeccion({
      id: `repaso-errores-${Date.now()}`,
      modulo: 0,
      index: 9,
      es: "Repaso de errores",
      zh: "错题复习",
      emoji: "📕",
      steps: elegidos.map((error) => ({ type: error.type === "listen" ? "listen" : "choice", prompt: error.type === "listen" ? "Escucha y elige · 听音选择" : error.prompt, speak: error.speak, options: error.options, answer: error.answer, explain: error.explain, _t: error.t })),
    });
  };

  return (
    <LightShell>
      <div className="ui-page in-md gm-no-adapt">
        {/* ---------- Héroe lacado: probabilidad de APTO y la tarea de hoy ---------- */}
        <header className="in-md-hero">
          <span className="in-md-hero__dragon" aria-hidden="true" />
          <span className="in-md-hero__sello" aria-hidden="true" translate="no">
            考
          </span>
          <div className="in-md-hero__texto">
            <p className="in-ceja">
              Mi DELE <span lang="zh">· 我的DELE</span>
            </p>
            <h1>Tu camino al APTO</h1>
            <p className="in-md-hero__zh" lang="zh">
              你离通过还有多远？
            </p>
            <p className="in-md-hero__desc">
              Tu nota prevista en cada prueba, tu plan de la semana y tus errores para repasar, calculados con todo lo que haces en la app.
              <small lang="zh">根据你的所有练习，预测各项分数并生成每周计划和错题本。</small>
            </p>
            <div className="in-md-niveles" role="radiogroup" aria-label="Nivel del examen · 考试级别">
              <span className="in-md-niveles__et">Nivel · 级别</span>
              {LEVELS.map((codigo) => (
                <button key={codigo} type="button" role="radio" aria-checked={codigo === nivel} className={codigo === nivel ? "on" : ""} onClick={() => setNivel(codigo)}>
                  {codigo}
                </button>
              ))}
            </div>
            {tareaHoy ? (
              <Link to={tareaHoy.ir} className="in-boton-oro in-md-hero__cta">
                <span className="in-boton-oro__et">Tarea de hoy · 今日任务</span>
                <span className="in-boton-oro__txt">{tareaHoy.es}</span>
                <ArrowRightIcon size={22} strokeWidth={2.8} aria-hidden="true" />
              </Link>
            ) : (
              <span className="in-boton-oro in-md-hero__cta is-cargando" aria-live="polite">
                <span className="in-boton-oro__et">Tarea de hoy · 今日任务</span>
                <span className="in-boton-oro__txt">Preparando tu plan… · 正在生成计划…</span>
              </span>
            )}
          </div>
          <div className="in-md-hero__medidor">
            <AnilloApto valor={prevision.prob} />
            <img className="in-md-hero__mono" src={`./mono/${poseMono}.png`} alt="" />
            <p className="in-md-hero__nota">
              {prevision.prob == null ? (
                <>
                  Faltan datos: haz el diagnóstico y algún ejercicio de cada prueba.
                  <small lang="zh">数据不足，请先做测试和练习。</small>
                </>
              ) : (
                <>
                  Con {prevision.datos} respuestas. Aprobar exige 30/50 en cada grupo.
                  <small lang="zh">每组需达到30/50。</small>
                </>
              )}
            </p>
          </div>
        </header>

        {/* ---------- Accesos secundarios ---------- */}
        <nav className="in-md-herr" aria-label="Herramientas DELE · 考试工具">
          {HERRAMIENTAS.map((herramienta) => {
            const Icono = herramienta.icono;
            return (
              <Link key={herramienta.to} to={herramienta.to} className="in-md-herr__item">
                <span className="in-medallon" aria-hidden="true">
                  <Icono size={22} strokeWidth={2.4} />
                </span>
                <span>
                  <b>
                    {herramienta.es} <span lang="zh">· {herramienta.zh}</span>
                  </b>
                  <small>{herramienta.desc}</small>
                </span>
              </Link>
            );
          })}
          <Link to="/diagnostico" className="in-md-herr__item">
            <span className="in-medallon" aria-hidden="true">
              <CompassIcon size={22} strokeWidth={2.4} />
            </span>
            <span>
              <b>{datos.diag ? `Diagnóstico: ${datos.diag.nivel}` : "Diagnóstico"} <span lang="zh">· 水平测试</span></b>
              <small>{datos.diag ? "Repetir la prueba · 重新测试" : "15 preguntas, 5 minutos · 5分钟"}</small>
            </span>
          </Link>
        </nav>

        {/* ---------- Las cuatro pruebas ---------- */}
        <section className="in-md-bloque" aria-labelledby="in-md-pruebas-t">
          <h2 className="in-titulo" id="in-md-pruebas-t">
            <span>Las cuatro pruebas</span> <small lang="zh">四项考试 · {nivel}</small>
          </h2>
          <div className="in-md-pruebas">
            {PRUEBAS.map((clave) => {
              const Icono = ICONO_DESTREZA[clave];
              const nota = prevision.pruebas[clave];
              const aprueba = (nota ?? 0) >= 15;
              return (
                <article key={clave} className={`in-md-prueba ${nota == null ? "is-vacia" : aprueba ? "is-ok" : "is-baja"}`}>
                  <span className="in-md-prueba__num" aria-hidden="true" translate="no">
                    {NUMERAL[clave]}
                  </span>
                  <span className="in-medallon" aria-hidden="true">
                    <Icono size={22} strokeWidth={2.4} />
                  </span>
                  <h3>
                    {SKILLS[clave].es}
                    <small lang="zh">{SKILLS[clave].zh}</small>
                  </h3>
                  <p className="in-md-prueba__nota">
                    <b>{nota == null ? "—" : nota}</b>
                    <span>/25</span>
                  </p>
                  <div className="in-barra-oro" role="progressbar" aria-valuemin={0} aria-valuemax={25} aria-valuenow={nota ?? 0} aria-label={SKILLS[clave].es}>
                    <i style={{ width: `${((nota ?? 0) / 25) * 100}%` }} />
                    <em style={{ left: "60%" }} title="15/25" />
                  </div>
                  <small className="in-md-prueba__estado">{nota == null ? "Sin datos · 暂无数据" : aprueba ? "Vas bien · 不错" : "A reforzar · 需加强"}</small>
                </article>
              );
            })}
          </div>
          <div className="in-md-grupos">
            <span className={prevision.g1 >= 30 ? "ok" : ""}>
              Grupo 1 · 第一组 (lectura + escritura): <b>{prevision.g1 ?? "—"}/50</b>
            </span>
            <span className={prevision.g2 >= 30 ? "ok" : ""}>
              Grupo 2 · 第二组 (audición + oral): <b>{prevision.g2 ?? "—"}/50</b>
            </span>
          </div>
        </section>

        {/* ---------- Plan semanal y reto del mes ---------- */}
        <div className="in-md-rejilla">
          <section className="in-md-papel" aria-labelledby="in-md-plan-t">
            <h2 className="in-titulo" id="in-md-plan-t">
              <span>Plan de la semana</span> <small lang="zh">本周计划</small>
              {datos.semanal?.ia && (
                <em className="in-chip-ia">
                  <SparklesIcon size={14} aria-hidden="true" /> IA
                </em>
              )}
            </h2>
            {datos.semanal ? (
              <>
                <blockquote className="in-md-consejo">
                  <span className="in-md-consejo__sello" aria-hidden="true" translate="no">
                    师
                  </span>
                  <p>
                    {datos.semanal.consejo.es}
                    <small lang="zh">{datos.semanal.consejo.zh}</small>
                  </p>
                </blockquote>
                <ol className="in-md-plan">
                  {datos.semanal.plan.map((tarea, indice) => (
                    <li key={indice} className={indice === hoyIndice ? "hoy" : indice < hoyIndice ? "pasado" : ""}>
                      <span className="in-md-plan__dia">
                        {tarea.dia.split(" · ")[0]}
                        <small lang="zh">{tarea.dia.split(" · ")[1]}</small>
                      </span>
                      <span className="in-md-plan__tarea">
                        {tarea.es}
                        <small lang="zh">{tarea.zh}</small>
                      </span>
                      {indice === hoyIndice && (
                        <span className="in-md-plan__hoy" aria-label="Hoy">
                          今日
                        </span>
                      )}
                      <Link to={tarea.ir} className="in-md-plan__ir" aria-label={`Ir: ${tarea.es}`}>
                        Ir · 去
                      </Link>
                    </li>
                  ))}
                </ol>
              </>
            ) : (
              <div className="in-cargando" aria-live="polite">
                <span className="in-cargando__moneda" aria-hidden="true" />
                Preparando tu plan… · 正在生成计划…
              </div>
            )}
          </section>

          <aside className="in-md-papel in-md-lado">
            <h2 className="in-titulo">
              <span>Reto del mes</span> <small lang="zh">本月挑战</small>
            </h2>
            <div className="in-md-reto">
              <div className="in-md-reto__moneda" style={{ "--p": retoPct }} aria-hidden="true">
                <b>{retoPct}%</b>
              </div>
              <div>
                <span className="in-md-reto__sello">{reto.titulo}</span>
                <p>
                  {reto.es}
                  <small lang="zh">{reto.zh}</small>
                </p>
                <b className="in-md-reto__cuenta">
                  {hechasMes}/{reto.meta} <small>· {mes}</small>
                </b>
              </div>
            </div>
            <h2 className="in-titulo in-titulo--sub">
              <span>Destrezas</span> <small lang="zh">各项能力 · {nivel}</small>
            </h2>
            <ul className="in-md-destrezas">
              {Object.entries(estadisticas).map(([clave, valor]) => {
                const Icono = ICONO_DESTREZA[clave];
                return (
                  <li key={clave}>
                    <Icono size={16} strokeWidth={2.4} aria-hidden="true" />
                    <span>
                      {SKILLS[clave].es}
                      <small lang="zh">{SKILLS[clave].zh}</small>
                    </span>
                    <div className={`in-barra-oro fina ${(valor.pct ?? 0) >= 60 ? "ok" : ""}`}>
                      <i style={{ width: `${valor.pct ?? 0}%` }} />
                    </div>
                    <b>{valor.pct == null ? "—" : `${valor.pct}%`}</b>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>

        {/* ---------- Cuaderno de errores ---------- */}
        <section className="in-md-papel in-md-errores" aria-labelledby="in-md-err-t">
          <div className="in-md-errores__cab">
            <h2 className="in-titulo" id="in-md-err-t">
              <span>Cuaderno de errores</span> <small lang="zh">错题本 ({errores.length})</small>
            </h2>
            <button type="button" className="in-boton-laca" onClick={repasar} disabled={!hayRepasables}>
              <RotateCcwIcon size={18} strokeWidth={2.6} aria-hidden="true" /> Repasar mis errores · 复习错题
            </button>
          </div>
          <div className="in-md-filtros" role="group" aria-label="Filtrar por destreza · 按能力筛选">
            <button type="button" className={!filtro ? "on" : ""} aria-pressed={!filtro} onClick={() => setFiltro("")}>
              Todos · 全部
            </button>
            {Object.keys(SKILLS).map((clave) => (
              <button key={clave} type="button" className={filtro === clave ? "on" : ""} aria-pressed={filtro === clave} onClick={() => setFiltro(clave)}>
                {SKILLS[clave].es}
              </button>
            ))}
          </div>
          {!errores.length ? (
            <div className="in-vacio">
              <img src="./mono/guino.png" alt="" />
              <div>
                <b>¡Tu cuaderno está limpio!</b>
                <p>
                  Haz lecciones y exámenes: aquí aparecerá lo que tienes que repasar.
                  <small lang="zh">暂无错题。做练习和考试后，错题会出现在这里。</small>
                </p>
                <Link to="/ruta" className="in-boton-crema">
                  Ir a aprender · 去学习 <ArrowRightIcon size={16} strokeWidth={2.6} aria-hidden="true" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="in-md-lista">
              {errores.map((error) => (
                <article key={error.t} className="in-md-error">
                  <small>
                    {SKILLS[error.skill]?.es} · {error.level} · {error.src} {error.repasos ? `· repasado ×${error.repasos}` : ""}
                  </small>
                  <b>{error.prompt}</b>
                  {error.given && (
                    <s>
                      <span className="in-sr">Tu respuesta: </span>
                      {error.given}
                    </s>
                  )}
                  <span className="ok">
                    <span className="in-sr">Correcta: </span>
                    {error.correct}
                  </span>
                  {error.explain && <p>{error.explain}</p>}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
      {leccion && (
        <LessonPlayer
          lesson={leccion}
          onClose={() => {
            leccion.steps.forEach((paso) => markReviewed(paso._t));
            setLeccion(null);
            setDatos(getDele());
          }}
        />
      )}
    </LightShell>
  );
}
