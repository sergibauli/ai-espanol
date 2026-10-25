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
const STOP = Object.fromEntries(STOPS.map((s) => [s.n, s]));
const REGION = { A1: ["Pekín y el norte", "北京与华北"], A2: ["La Ruta de la Seda", "丝绸之路"], B1: ["El este de China", "华东"], B2: ["El sur y el oeste", "西南与华南"] };

const LEVELS = [
  { key: "A1", es: "Principiante", zh: "入门", color: "#58cc02", dark: "#46a302" },
  { key: "A2", es: "Elemental", zh: "初级", color: "#1cb0f6", dark: "#1899d6" },
  { key: "B1", es: "Intermedio", zh: "中级", color: "#ff9600", dark: "#e08600" },
  { key: "B2", es: "Avanzado", zh: "中高级", color: "#ce82ff", dark: "#a568cc" },
];
// Desplazamiento horizontal en zigzag (como un camino)
const OFFSETS = [0, 52, 78, 52, 0, -52, -78, -52];

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
    setLesson(buildLesson(mod, plus, index));
    setLoading(false);
    setOpen(null);
  };

  const levelDone = (l) => CATALOG.filter((m) => m.nivel === l.key).reduce((n, m) => n + [0, 1, 2, 3, 4].filter((i) => done(m.numero, i)).length, 0);

  return (
    <LightShell>
      <div className="ruta-layout">
        <main className={`ruta-main map-${lv.key}`}>
          <span className="ruta-ink" aria-hidden="true" />
          <div className="ruta-region-title">
            <Emoji3D emoji="🗺️" size={34} />
            <span>
              <b>{REGION[lv.key][0]}</b> · {REGION[lv.key][1]}
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
                <span className="ruta-stop-art">
                  <Emoji3D emoji={STOP[m.numero]?.emoji || m.icono} size={58} />
                </span>
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
              <div className="ruta-path" style={{ position: "relative" }}>
                <span className="ruta-mascot" style={{ [idx % 2 ? "left" : "right"]: "6%" }}>
                  <img src={`./mono/${["saluda", "poder", "feliz", "guino"][idx % 4]}.png`} alt="" className="ruta-mono e3d-float" />
                </span>
                {LESSON_META.map((meta, i) => {
                  const isDone = done(m.numero, i);
                  const isOpen = unlocked(idx, i);
                  const isCurrent = current === `${m.numero}-${i}`;
                  const key = `${m.numero}-${i}`;
                  const best = game.lessons[lessonId(m.numero, i)]?.best;
                  return (
                    <div key={key} className="ruta-node-wrap" style={{ transform: `translateX(${OFFSETS[(idx * 5 + i) % OFFSETS.length]}px)` }} ref={isCurrent ? currentRef : null}>
                      {isCurrent && <div className="ruta-start">EMPEZAR · 开始</div>}
                      <button
                        className={`path-node ${isDone ? "done" : isOpen ? "open" : "locked"} ${isCurrent ? "current" : ""}`}
                        style={{ "--c": lv.color, "--d": lv.dark }}
                        onClick={() => setOpen(open === key ? null : key)}
                        aria-label={`${meta.es} · módulo ${m.numero}`}
                      >
                        {isDone ? best === 100 ? <StarIcon size={30} fill="currentColor" /> : <CheckIcon size={32} strokeWidth={3.5} /> : isOpen ? <Emoji3D emoji={i === 0 ? m.icono : meta.emoji} size={38} /> : <LockIcon size={26} />}
                      </button>
                      {open === key && (
                        <div className="ruta-pop" style={{ "--c": isOpen ? lv.color : "#37464f" }}>
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
                <Link to={`/modulos/modulo-${m.numero}?tab=examen`} className="ruta-chest" style={{ transform: `translateX(${OFFSETS[(idx * 5 + 5) % OFFSETS.length]}px)` }} title="Examen del módulo">
                  <Emoji3D emoji={done(m.numero, 4) ? "🏆" : "🎁"} size={64} float={done(m.numero, 4)} />
                </Link>
              </div>
            </section>
          ))}
        </main>

        <aside className="ruta-side">
          <GameStats />
          <div className="ui-card ruta-goal">
            <GoalRing pct={game.goalPct} size={74}>
              <Emoji3D emoji="🎯" size={34} />
            </GoalRing>
            <div style={{ flex: 1 }}>
              <div className="ui-h3">Meta diaria · 每日目标</div>
              <div className="ui-muted" style={{ fontSize: 14 }}>
                {game.dailyXp}/{game.goal} XP hoy
              </div>
              <div className="ui-row" style={{ gap: 6, marginTop: 8 }}>
                {[20, 30, 50].map((g) => (
                  <button key={g} className={`ui-chip ${game.goal === g ? "is-on" : ""}`} onClick={() => setDailyGoal(g)}>
                    {g} XP
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="ui-card ruta-passport">
            <div className="ui-row" style={{ gap: 10, flexWrap: "nowrap" }}>
              <Emoji3D emoji="🛂" size={42} />
              <div>
                <div className="ui-h3">Pasaporte del viaje · 旅行护照</div>
                <small>
                  {CATALOG.filter((m) => [0, 1, 2, 3, 4].every((i) => done(m.numero, i))).length}/80 sellos · 印章
                </small>
              </div>
            </div>
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
          </div>
          <div className="ui-card">
            <div className="ui-h3" style={{ marginBottom: 6 }}>Desafíos del día · 每日挑战</div>
            {dailyQuests(game).map((qq) => (
              <div key={qq.es} className="quest">
                <Emoji3D emoji={qq.emoji} size={40} />
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
          </div>
          <div className="ui-card">
            <div className="ui-between" style={{ marginBottom: 10 }}>
              <div className="ui-h3">Nivel {game.level}</div>
              <span className="ui-muted" style={{ fontSize: 13 }}>
                {game.into}/{game.need} XP
              </span>
            </div>
            <div className="ui-progress" style={{ height: 12 }}>
              <i style={{ width: `${game.pct}%`, background: "linear-gradient(90deg,#ffc800,#ff9600)" }} />
            </div>
          </div>
          <div className="ui-card">
            <div className="ui-h3" style={{ marginBottom: 12 }}>Logros · 成就</div>
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
          </div>
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
          <img src="./mono-face.png" alt="" className="mono-big e3d-float" style={{ width: 120, height: 120 }} />
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
