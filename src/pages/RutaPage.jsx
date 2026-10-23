import * as React from "react";
import { Link, useSearchParams } from "react-router";
import { BookOpenIcon, LockIcon, CheckIcon, StarIcon } from "lucide-react";
import { StarfieldBackground } from "../components/fx/StarfieldBackground.jsx";
import { Emoji3D } from "../components/ui/Emoji3D.jsx";
import { GameStats, GoalRing } from "../components/ui/GameStats.jsx";
import { LessonPlayer } from "../components/lesson/LessonPlayer.jsx";
import { useGame, BADGES, setDailyGoal } from "../lib/gamification.js";
import { buildLesson, lessonId, LESSON_META, LESSONS_PER_MODULE } from "../lib/lessons.js";
import { loadAllModules, loadModulePlus } from "../lib/examGenerator.js";
import CATALOG from "../data/modulos/catalog.json";

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
    <StarfieldBackground>
      <div className="ruta-layout">
        <main className="ruta-main">
          <div className="ruta-levels">
            {LEVELS.map((l) => {
              const total = CATALOG.filter((m) => m.nivel === l.key).length * LESSONS_PER_MODULE;
              return (
                <button key={l.key} className={`ruta-level ${l.key === lv.key ? "on" : ""}`} style={{ "--c": l.color, "--d": l.dark }} onClick={() => setParams({ nivel: l.key })}>
                  <b>{l.key}</b>
                  <small>
                    {levelDone(l)}/{total}
                  </small>
                </button>
              );
            })}
          </div>

          {mods.map((m, idx) => (
            <section key={m.numero} className="ruta-unit">
              <div className="ruta-banner" style={{ "--c": lv.color, "--d": lv.dark }}>
                <div style={{ minWidth: 0 }}>
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
              <div className="ruta-path">
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
          <Link to="/profesores" className="ui-card is-link ruta-promo">
            <Emoji3D emoji="👩‍🏫" size={54} float />
            <div>
              <b>Clase con profesor</b>
              <div className="ui-muted" style={{ fontSize: 13 }}>Nativos y chinos · 免费试听</div>
            </div>
          </Link>
        </aside>
      </div>
      {lesson && <LessonPlayer lesson={lesson} onClose={() => setLesson(null)} />}
    </StarfieldBackground>
  );
}

function firstOpenLevel(lessons) {
  for (const l of LEVELS) {
    const mods = CATALOG.filter((m) => m.nivel === l.key);
    if (mods.some((m) => [0, 1, 2, 3, 4].some((i) => !lessons[lessonId(m.numero, i)]))) return l.key;
  }
  return "A1";
}
