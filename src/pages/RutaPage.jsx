import * as React from "react";
import { Link, useSearchParams } from "react-router";
import { BookOpenIcon, LockIcon, CheckIcon, StarIcon } from "lucide-react";
import { LightShell } from "../components/layout/LightShell.jsx";
import { Emoji3D } from "../components/ui/Emoji3D.jsx";
import { GameStats, GoalRing } from "../components/ui/GameStats.jsx";
import { LessonPlayer } from "../components/lesson/LessonPlayer.jsx";
import { useGame, BADGES, setDailyGoal } from "../lib/gamification.js";
import { buildLesson, lessonId, LESSON_META, LESSONS_PER_MODULE } from "../lib/lessons.js";
import { loadAllModules, loadModulePlus } from "../lib/examGenerator.js";
import CATALOG from "../data/modulos/catalog.json";
import STOPS from "../data/china-stops.json";
import { MonoNube, Moneda, PanelJade } from "../../packages/imperial/src/index.js";
const STOP = Object.fromEntries(STOPS.map((s) => [s.n, s]));
const REGION = { A1: ["Pekín y el norte", "北京与华北"], A2: ["La Ruta de la Seda", "丝绸之路"], B1: ["El este de China", "华东"], B2: ["El sur y el oeste", "西南与华南"] };

const LEVELS = [
  { key: "A1", es: "Principiante", zh: "入门", color: "#b81c2e", dark: "#8f0c21" },
  { key: "A2", es: "Elemental", zh: "初级", color: "#2f8f52", dark: "#1d6339" },
  { key: "B1", es: "Intermedio", zh: "中级", color: "#c8901e", dark: "#8a5a1e" },
  { key: "B2", es: "Avanzado", zh: "中高级", color: "#7a4fc4", dark: "#4f2f8a" },
];
// Desplazamiento horizontal en zigzag (como un camino)
const OFFSETS = [0, 48, 70, 48, 0, -48, -70, -48];
// Geometría del camino dorado: 5 lecciones + cofre, en un carril de ancho fijo
const TRACK_W = 300;
const ROW = 142;
const TOP = 100;
const puntosCamino = (idx) => Array.from({ length: LESSONS_PER_MODULE + 1 }, (_, i) => [TRACK_W / 2 + OFFSETS[(idx * 5 + i) % OFFSETS.length], TOP + i * ROW]);
const curva = ([fx, fy], [tx, ty]) => `C${fx} ${fy + (ty - fy) / 2} ${tx} ${ty - (ty - fy) / 2} ${tx} ${ty}`;
// Trazado desde la entrada (arriba, bajo la cabecera) hasta el punto `hasta`
const trazado = (pts, hasta = pts.length - 1) => {
  const inicio = [TRACK_W / 2, 0];
  let d = `M${inicio[0]} ${inicio[1]} ${curva(inicio, pts[0])}`;
  for (let i = 1; i <= hasta; i++) d += ` ${curva(pts[i - 1], pts[i])}`;
  return d;
};

// El Rey Mono en su nube viaja por la curva del camino hasta la lección actual
function MonoViajero({ desde, hasta, pose }) {
  const ref = React.useRef(null);
  const lado = hasta[0] > TRACK_W / 2 ? -1 : 1;
  const [pos, setPos] = React.useState(desde);
  const [viajando, setViajando] = React.useState(false);
  React.useEffect(() => {
    const path = ref.current;
    if (!path || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return setPos(hasta);
    const total = path.getTotalLength();
    let raf;
    let t0;
    const paso = (t) => {
      t0 ??= t;
      const k = Math.min(1, (t - t0) / 1900);
      const e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
      const p = path.getPointAtLength(total * e);
      setPos([p.x, p.y]);
      if (k < 1) raf = requestAnimationFrame(paso);
      else setViajando(false);
    };
    const inicio = setTimeout(() => {
      setViajando(true);
      raf = requestAnimationFrame(paso);
    }, 700);
    return () => {
      clearTimeout(inicio);
      cancelAnimationFrame(raf);
    };
  }, [desde[0], desde[1], hasta[0], hasta[1]]);
  return (
    <>
      <svg className="ruta-medida" width="0" height="0" aria-hidden="true">
        <path ref={ref} d={`M${desde[0]} ${desde[1]} ${curva(desde, hasta)}`} />
      </svg>
      <MonoNube pose={pose} tamano={118} estela={viajando} className="ruta-viajero" style={{ left: pos[0] + lado * 100, top: pos[1] - 34 }} />
    </>
  );
}

export default function RutaPage() {
  const game = useGame();
  const [params, setParams] = useSearchParams();
  const level = params.get("nivel") || firstOpenLevel(game.lessons);
  const lv = LEVELS.find((l) => l.key === level) || LEVELS[0];
  const mods = CATALOG.filter((m) => m.nivel === lv.key);
  const [open, setOpen] = React.useState(null);
  const [lesson, setLesson] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const currentRef = React.useRef(null);
  const [onboarded, setOnboarded] = React.useState(() => {
    try {
      const created = window.Clerk?.user?.createdAt ? new Date(window.Clerk.user.createdAt).getTime() : 0;
      const isNewAccount = created && Date.now() - created < 30 * 60 * 1000;
      return !isNewAccount || localStorage.getItem("ai-espanol:onboarded") === "1" || Object.keys(game.lessons).length > 0;
    } catch {
      return true;
    }
  });

  // Estado de cada nodo: hecho, disponible (el siguiente) o bloqueado
  const done = (m, i) => Boolean(game.lessons[lessonId(m, i)]);
  const unlocked = (idx, i) => {
    const m = mods[idx].numero;
    if (done(m, i)) return true;
    if (i > 0) return done(m, i - 1);
    return idx === 0 || done(mods[idx - 1].numero, LESSONS_PER_MODULE - 1);
  };
  let current = null;
  mods.forEach((m, idx) => {
    for (let i = 0; i < LESSONS_PER_MODULE; i++) if (!current && unlocked(idx, i) && !done(m.numero, i)) current = `${m.numero}-${i}`;
  });

  React.useEffect(() => {
    const t = setTimeout(() => currentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 400);
    return () => clearTimeout(t);
  }, [level]);

  const start = async (numero, index) => {
    setLoading(true);
    const [all, plus] = await Promise.all([loadAllModules(), loadModulePlus(numero)]);
    const mod = all.find((m) => m.numero === numero);
    setLesson(buildLesson(mod, plus, index, Date.now(), Boolean(game.lessons[lessonId(numero, index)])));
    setLoading(false);
    setOpen(null);
  };

  const modActual = mods.find((m) => current?.startsWith(`${m.numero}-`)) || mods[0];
  const levelDone = (l) => CATALOG.filter((m) => m.nivel === l.key).reduce((n, m) => n + [0, 1, 2, 3, 4].filter((i) => done(m.numero, i)).length, 0);

  return (
    <LightShell>
      <div className="ruta-layout">
        <main className={`ruta-main map-${lv.key}`}>
          <span className="ruta-ink" aria-hidden="true" />
          <span className="ruta-dragon d1" aria-hidden="true" />
          <span className="ruta-dragon d2" aria-hidden="true" />
          <div className="ruta-region-title">
            <span>
              <b>{REGION[lv.key][0]}</b> <i>{REGION[lv.key][1]}</i>
              <em>{modActual?.titulo.split(" - ")[0]}</em>
              <small>Viaja parada a parada: cada unidad es un lugar de China · 每个单元都是中国的一站</small>
            </span>
          </div>
          <div className="ruta-levels">
            {LEVELS.map((l) => {
              const total = CATALOG.filter((m) => m.nivel === l.key).length * LESSONS_PER_MODULE;
              return (
                <button key={l.key} className={`ruta-level ${l.key === lv.key ? "on" : ""}`} style={{ "--c": l.color, "--d": l.dark }} onClick={() => setParams({ nivel: l.key })}>
                  <b>{l.key}</b>
                  <em className="ruta-region">{REGION[l.key][0]}</em>
                  <small>
                    {levelDone(l)}/{total}
                  </small>
                </button>
              );
            })}
          </div>

          {mods.map((m, idx) => (
            <section key={m.numero} id={`ruta-u${m.numero}`} className="ruta-unit">
              <div className="ruta-banner" style={{ "--c": lv.color, "--d": lv.dark }}>
                <Moneda className="ruta-stop-art" tamano={70} tono="oro" brillo>
                  <Emoji3D emoji={STOP[m.numero]?.emoji || m.icono} size={34} />
                </Moneda>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <span className="ruta-stop">
                    📍 {STOP[m.numero]?.ciudad} · {STOP[m.numero]?.lugar} <i>{STOP[m.numero]?.ciudadZh}·{STOP[m.numero]?.lugarZh}</i>
                  </span>
                  <small>
                    {lv.key} · UNIDAD {m.numero} · 第{m.numero}单元
                  </small>
                  <h2>{m.titulo.split(" - ")[0]}</h2>
                  <span>{m.tituloChino.split(" - ")[0]}</span>
                </div>
                <Link to={`/modulos/modulo-${m.numero}`} className="ruta-guide" title="Teoría, vocabulario, diálogos y juegos del módulo">
                  <BookOpenIcon size={18} /> Guía
                </Link>
              </div>
              {(() => {
                const pts = puntosCamino(idx);
                const hechas = [0, 1, 2, 3, 4].filter((i) => done(m.numero, i)).length;
                const alcanzada = unlocked(idx, 0);
                const iCur = LESSON_META.findIndex((_, i) => current === `${m.numero}-${i}`);
                const alto = TOP + LESSONS_PER_MODULE * ROW + 70;
                return (
                  <div className="ruta-camino-wrap" style={{ height: alto }}>
                    <span className={`ruta-farol ${idx % 2 ? "izq" : "der"}`} aria-hidden="true" />
                    <span className={`ruta-farol peq ${idx % 2 ? "der" : "izq"}`} aria-hidden="true" />
                    <span className="ruta-nube n1" aria-hidden="true" />
                    <span className="ruta-nube n2" aria-hidden="true" />
                    <div className="ruta-camino" style={{ width: TRACK_W, height: alto }}>
                      <svg className="ruta-carretera" width={TRACK_W} height={alto} aria-hidden="true">
                        <path className="borde" d={trazado(pts)} />
                        <path className="piedra" d={trazado(pts)} />
                        {alcanzada && (
                          <>
                            <path className="halo" d={trazado(pts, Math.min(hechas, LESSONS_PER_MODULE))} />
                            <path className="oro" d={trazado(pts, Math.min(hechas, LESSONS_PER_MODULE))} />
                            <path className="luz" d={trazado(pts, Math.min(hechas, LESSONS_PER_MODULE))} />
                          </>
                        )}
                      </svg>
                      {LESSON_META.map((meta, i) => {
                        const isDone = done(m.numero, i);
                        const isOpen = unlocked(idx, i);
                        const isCurrent = current === `${m.numero}-${i}`;
                        const key = `${m.numero}-${i}`;
                        const best = game.lessons[lessonId(m.numero, i)]?.best;
                        return (
                          <div key={key} className={`ruta-node-wrap ${open === key ? "abierto" : ""}`} style={{ left: pts[i][0], top: pts[i][1] }} ref={isCurrent ? currentRef : null}>
                            {isCurrent && <div className="ruta-start">EMPEZAR · 开始</div>}
                            <button
                              className={`path-node ${isDone ? "done" : isOpen ? "open" : "locked"} ${isCurrent ? "current" : ""}`}
                              onClick={() => setOpen(open === key ? null : key)}
                              aria-label={`${meta.es} · módulo ${m.numero}`}
                            >
                              <Moneda tamano={isCurrent ? 92 : 78} tono={isDone ? "oro" : isCurrent ? "jade" : isOpen ? "oro" : "bronce"} brillo={isDone || isCurrent}>
                                {isDone ? best === 100 ? <StarIcon size={26} fill="currentColor" /> : <CheckIcon size={28} strokeWidth={3.5} /> : isCurrent ? null : isOpen ? <Emoji3D emoji={i === 0 ? m.icono : meta.emoji} size={32} /> : <LockIcon size={20} />}
                              </Moneda>
                            </button>
                            {open === key && (
                              <div className="ruta-pop" style={{ "--c": isOpen ? lv.color : "#4a3a2a", "--dx": `${TRACK_W / 2 - pts[i][0]}px` }}>
                                <b>{meta.es}</b>
                                <span>
                                  {meta.zh} · Lección {i + 1} de 5
                                </span>
                                {isOpen ? (
                                  <button className="btn3d" style={{ "--c": "#fff", "--d": "rgba(0,0,0,.25)", color: lv.dark, padding: "12px 16px" }} disabled={loading} onClick={() => start(m.numero, i)}>
                                    {loading ? "Cargando…" : isDone ? "Practicar otra vez · +10 XP" : "Empezar · +10 XP"}
                                  </button>
                                ) : (
                                  <span style={{ opacity: 0.9 }}>🔒 Completa la lección anterior para desbloquearla.</span>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                      <Link to={`/modulos/modulo-${m.numero}?tab=examen`} className={`ruta-chest ${done(m.numero, 4) ? "ganado" : ""}`} style={{ left: pts[5][0], top: pts[5][1] }} title="Examen del módulo">
                        <Moneda tamano={96} tono={done(m.numero, 4) ? "oro" : "bronce"} brillo={done(m.numero, 4)}>
                          <Emoji3D emoji={done(m.numero, 4) ? "🏆" : "🎁"} size={44} float={done(m.numero, 4)} />
                        </Moneda>
                      </Link>
                      {iCur >= 0 && <MonoViajero desde={iCur ? pts[iCur - 1] : [TRACK_W / 2, 0]} hasta={pts[iCur]} pose={["saluda", "poder", "feliz", "guino"][idx % 4]} />}
                    </div>
                  </div>
                );
              })()}
            </section>
          ))}
        </main>

        <aside className="ruta-side">
          <span className="ruta-dragon d3" aria-hidden="true" />
          <GameStats />
          <PanelJade as="div" className="ruta-goal">
            <GoalRing pct={game.goalPct} size={78}>
              <Moneda tamano={58} tono="oro">
                <Emoji3D emoji="🎯" size={28} />
              </Moneda>
            </GoalRing>
            <div style={{ flex: 1 }}>
              <h3 className="im-jade__titulo">
                Meta diaria <span className="im-zh">每日目标</span>
              </h3>
              <div className="ruta-jade-dato">
                {game.dailyXp}/{game.goal} XP hoy · 今日
              </div>
              <div className="ui-row" style={{ gap: 6, marginTop: 8 }}>
                {[20, 30, 50].map((g) => (
                  <button key={g} className={`ui-chip ${game.goal === g ? "is-on" : ""}`} onClick={() => setDailyGoal(g)}>
                    {g} XP
                  </button>
                ))}
              </div>
            </div>
          </PanelJade>
          <PanelJade as="div" className="ruta-passport" titulo="Pasaporte del viaje" tituloZh="旅行护照" icono={<Emoji3D emoji="🛂" size={26} />}>
            <small className="ruta-jade-dato">
              {CATALOG.filter((m) => [0, 1, 2, 3, 4].every((i) => done(m.numero, i))).length}/80 sellos · 印章
            </small>
            <div className="ruta-stamps">
              {CATALOG.filter((m) => m.nivel === lv.key).map((m) => {
                const got = [0, 1, 2, 3, 4].every((i) => done(m.numero, i));
                return (
                  <span key={m.numero} className={`ruta-stamp ${got ? "got" : ""}`} title={`${STOP[m.numero]?.ciudad} · ${STOP[m.numero]?.lugar}`}>
                    <Emoji3D emoji={STOP[m.numero]?.emoji || "🏯"} size={24} />
                  </span>
                );
              })}
            </div>
          </PanelJade>
          <PanelJade as="div" titulo="Desafíos del día" tituloZh="每日挑战">
            {dailyQuests(game).map((qq) => (
              <div key={qq.es} className="quest">
                <Emoji3D emoji={qq.emoji} size={36} />
                <div style={{ flex: 1 }}>
                  <b style={{ fontSize: 14 }}>{qq.es}</b>
                  <div className="quest-bar">
                    <i style={{ width: `${Math.min(100, (qq.have / qq.need) * 100)}%` }} />
                    <em>
                      {Math.min(qq.have, qq.need)} / {qq.need}
                    </em>
                  </div>
                </div>
                <Emoji3D emoji={qq.have >= qq.need ? "🏆" : "🎁"} size={30} />
              </div>
            ))}
          </PanelJade>
          <PanelJade as="div" titulo={`Nivel ${game.level}`} tituloZh="等级">
            <div className="ui-between" style={{ marginBottom: 8 }}>
              <span className="ruta-jade-dato">Experiencia · 经验</span>
              <span className="ruta-jade-dato">
                {game.into}/{game.need} XP
              </span>
            </div>
            <div className="quest-bar">
              <i style={{ width: `${game.pct}%` }} />
            </div>
          </PanelJade>
          <PanelJade as="div" titulo="Logros" tituloZh="成就">
            <div className="ruta-badges">
              {BADGES.map((b) => {
                const got = game.badges.includes(b.id);
                return (
                  <div key={b.id} className={`ruta-badge ${got ? "got" : ""}`} title={`${b.es} · ${b.zh}`}>
                    <Emoji3D emoji={b.emoji} size={40} />
                    <small>{b.es}</small>
                  </div>
                );
              })}
            </div>
          </PanelJade>
        </aside>
      </div>
      {!onboarded && <Onboarding onDone={(lvl) => { setOnboarded(true); setParams({ nivel: lvl }); }} />}
      {lesson && <LessonPlayer lesson={lesson} onClose={() => setLesson(null)} />}
    </LightShell>
  );
}

function firstOpenLevel(lessons) {
  for (const l of LEVELS) {
    const mods = CATALOG.filter((m) => m.nivel === l.key);
    if (mods.some((m) => [0, 1, 2, 3, 4].some((i) => !lessons[lessonId(m.numero, i)]))) return l.key;
  }
  return "A1";
}

// Bienvenida de la primera vez (motivo, nivel y meta diaria), como en las apps de idiomas
const REASONS = [
  ["🎓", "Aprobar el DELE", "通过DELE考试"],
  ["💼", "Trabajo", "工作"],
  ["✈️", "Viajar", "旅行"],
  ["🏫", "Estudiar en España", "去西班牙留学"],
  ["🎵", "Cultura y ocio", "文化娱乐"],
  ["🧠", "Ejercitar la mente", "锻炼大脑"],
];
const START = [
  ["🌱", "Empiezo de cero", "零基础", "A1"],
  ["📖", "Conozco algunas palabras", "会一些单词", "A1"],
  ["💬", "Puedo tener conversaciones básicas", "能进行简单对话", "A2"],
  ["🗣️", "Hablo con soltura sobre muchos temas", "能流利交流", "B1"],
  ["🏆", "Preparo el DELE B2", "准备DELE B2", "B2"],
];
const GOALS = [
  [10, "Casual · 5 min/día", "轻松"],
  [20, "Normal · 10 min/día", "普通"],
  [30, "Serio · 15 min/día", "认真"],
  [50, "Intenso · 20 min/día", "高强度"],
];

function Onboarding({ onDone }) {
  const [step, setStep] = React.useState(0);
  const [pick, setPick] = React.useState(null);
  const [level, setLevel] = React.useState("A1");
  const questions = [
    ["¿Para qué aprendes español?", "你为什么学西班牙语？"],
    ["¿Cuánto español sabes?", "你的西班牙语水平如何？"],
    ["¿Cuál es tu meta diaria?", "你的每日目标是什么？"],
  ];
  const opts = step === 0 ? REASONS : step === 1 ? START : GOALS;
  const next = () => {
    if (step === 1) setLevel(START[pick][3]);
    if (step === 2) {
      setDailyGoal(GOALS[pick][0]);
      try {
        localStorage.setItem("ai-espanol:onboarded", "1");
      } catch {}
      return onDone(level);
    }
    setStep((s) => s + 1);
    setPick(null);
  };
  return (
    <div className="onb">
      <header className="lp-top">
        <div className="lp-bar" style={{ background: "#e5e5e5" }}>
          <i style={{ width: `${((step + 1) / 3) * 100}%` }} />
        </div>
      </header>
      <main className="onb-main">
        <div className="onb-q">
          <img src="./mono-face.webp" alt="" className="mono-big e3d-float" style={{ width: 120, height: 120 }} />
          <div className="lp-char-bubble" style={{ fontSize: 20 }}>
            <span>
              {questions[step][0]}
              <br />
              <small style={{ color: "#777", fontWeight: 600 }}>{questions[step][1]}</small>
            </span>
          </div>
        </div>
        <div className={`onb-opts ${step === 0 ? "grid2" : ""}`}>
          {opts.map((o, i) => (
            <button key={i} className={`lp-option ${pick === i ? "picked" : ""}`} style={{ background: pick === i ? "#ddf4ff" : "#fff", borderColor: pick === i ? "#84d8ff" : "#e5e5e5", color: "#4b4b4b" }} onClick={() => setPick(i)}>
              {typeof o[0] === "number" ? <Emoji3D emoji={["🌱", "🔥", "⚡", "🚀"][i]} size={36} /> : <Emoji3D emoji={o[0]} size={36} />}
              <span>
                {o[1]}
                <br />
                <small style={{ color: "#777", fontWeight: 600 }}>{o[2]}</small>
              </span>
            </button>
          ))}
        </div>
      </main>
      <footer className="lp-foot" style={{ background: "#fff", borderColor: "#e5e5e5" }}>
        <div className="lp-foot-inner">
          <button className="lp-btn" disabled={pick === null} onClick={next} style={pick === null ? { "--c": "#e5e5e5", "--d": "#cecece", color: "#afafaf" } : undefined}>
            Continuar · 继续
          </button>
        </div>
      </footer>
    </div>
  );
}

// Desafíos diarios calculados a partir de la actividad de hoy
function dailyQuests(game) {
  const today = new Date().toDateString();
  const todayLessons = Object.entries(game.lessons).filter(([, v]) => new Date(v.at).toDateString() === today);
  const stories = todayLessons.filter(([k]) => k.startsWith("story-")).length;
  const perfect = todayLessons.filter(([k, v]) => !k.startsWith("story-") && v.score === 100).length;
  return [
    { emoji: "⚡", es: `Gana ${game.goal} XP · 获得${game.goal}经验`, have: game.dailyXp, need: game.goal },
    { emoji: "🎯", es: "Completa 2 lecciones · 完成2课", have: todayLessons.length - stories, need: 2 },
    { emoji: "💎", es: "Haz 1 lección perfecta · 1次满分", have: perfect, need: 1 },
    { emoji: "📖", es: "Lee 1 historia · 读1个故事", have: stories, need: 1 },
  ];
}
