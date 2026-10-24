import * as React from "react";
import { Link, useParams } from "react-router";
import { ArrowLeftIcon, Volume2Icon, ChevronDownIcon, PlayIcon, CheckIcon } from "lucide-react";
import { LightShell } from "../components/layout/LightShell.jsx";
import { Emoji3D } from "../components/ui/Emoji3D.jsx";
import { LessonPlayer } from "../components/lesson/LessonPlayer.jsx";
import { StoryPlayer, CAST } from "../components/lesson/StoryPlayer.jsx";
import { speak } from "../components/lesson/fx.js";
import { useGame } from "../lib/gamification.js";
import { buildLesson, lessonId, LESSON_META, buildPractice, PRACTICE_TYPES, dialogToStory } from "../lib/lessons.js";
import { loadAllModules, loadModulePlus } from "../lib/examGenerator.js";
import { markModuleVisited } from "../lib/progress.js";
import CATALOG from "../data/modulos/catalog.json";

import { GAMES } from "./juegos/JuegosHubPage.jsx";
const ModuloJuegos = React.lazy(() => import("./modulo/ModuloJuegos.jsx"));
const ModuloExamen = React.lazy(() => import("./modulo/ModuloExamen.jsx"));
const ModuloDescubre = React.lazy(() => import("./modulo/ModuloDescubre.jsx"));
const STORIES = import.meta.glob("../data/stories/*.json", { import: "default" });
const LEVEL_COLORS = { A1: ["#58cc02", "#46a302"], A2: ["#1cb0f6", "#1899d6"], B1: ["#ff9600", "#e08600"], B2: ["#ce82ff", "#a568cc"] };

function bullets(text) {
  return String(text || "")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => /^[•\-–]/.test(l))
    .map((l) => l.replace(/^[•\-–]\s*/, "").replace(/\s=\s[A-Za-z' ,.()/!?-]+$/, ""));
}

function WordCard({ v, color }) {
  const [flip, setFlip] = React.useState(false);
  return (
    <button
      className={`unit-word ${flip ? "flip" : ""}`}
      style={{ "--c": color }}
      onClick={() => {
        setFlip((f) => !f);
        if (!flip) speak(v.espanol);
      }}
    >
      <span className="unit-word-in">
        <span className="front">
          <b>{v.espanol}</b>
          <Volume2Icon size={15} />
        </span>
        <span className="back">
          <b>{v.chino}</b>
          {v.ejemplo && <small>{v.ejemplo}</small>}
        </span>
      </span>
    </button>
  );
}

function GuideCard({ t, index, color }) {
  const [open, setOpen] = React.useState(index === 0);
  const es = bullets(t.descripcion);
  const zh = bullets(t.descripcionChino);
  const same = es.length === zh.length;
  return (
    <div className={`unit-guide ${open ? "open" : ""}`} style={{ "--c": color }}>
      <button className="unit-guide-head" onClick={() => setOpen((o) => !o)}>
        <span className="unit-guide-n">{index + 1}</span>
        <span style={{ flex: 1, textAlign: "left" }}>
          <b>{t.titulo}</b>
          <small>{t.tituloChino}</small>
        </span>
        <ChevronDownIcon size={20} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
      </button>
      {open && (
        <div className="unit-guide-body">
          {(es.length ? es.slice(0, 6) : [String(t.descripcion).split("\n").find(Boolean)]).map((p, i) => (
            <div key={i} className="lp-point" style={{ animationDelay: `${i * 60}ms` }}>
              <b>{p}</b>
              {same && zh[i] && <span>{zh[i]}</span>}
            </div>
          ))}
          {(t.ejemplos || []).slice(0, 3).map((e, i) => (
            <button key={i} className="unit-example" onClick={() => speak(e.espanol)}>
              <Volume2Icon size={16} />
              <span>
                <b>{e.espanol}</b>
                <small>{e.chino}</small>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Piezas 3D recortadas de las maquetas (public/theme)
const THEME = `${import.meta.env.BASE_URL}theme/`;

export default function UnitPage() {
  const { moduloId } = useParams();
  const numero = Number(String(moduloId).replace(/\D/g, ""));
  const meta = CATALOG.find((m) => m.numero === numero);
  const [mod, setMod] = React.useState(null);
  const [plus, setPlus] = React.useState(null);
  const [story, setStory] = React.useState(undefined);
  const [lesson, setLesson] = React.useState(null);
  const [playStory, setPlayStory] = React.useState(false);
  const [dialog, setDialog] = React.useState(null);
  const [types, setTypes] = React.useState(PRACTICE_TYPES.map((t) => t.key));
  const [extra, setExtra] = React.useState(() => new URLSearchParams(window.location.hash.split("?")[1] || "").get("tab"));
  const game = useGame();
  const [c1, c2] = LEVEL_COLORS[meta?.nivel] || LEVEL_COLORS.A1;

  React.useEffect(() => {
    if (!meta) return;
    markModuleVisited(`modulo-${numero}`);
    window.scrollTo(0, 0);
    loadAllModules().then((all) => setMod(all.find((m) => m.numero === numero)));
    loadModulePlus(numero).then(setPlus);
    const load = STORIES[`../data/stories/modulo-${numero}.json`];
    load ? load().then((s) => setStory({ ...s, modulo: numero })) : setStory(null);
  }, [numero]);

  if (!meta) return <div className="ui-page">Módulo no encontrado</div>;
  const done = LESSON_META.map((_, i) => Boolean(game.lessons[lessonId(numero, i)]));
  const nextIdx = done.findIndex((d) => !d);
  const pct = Math.round((done.filter(Boolean).length / 5) * 100);
  const prev = CATALOG.find((m) => m.numero === numero - 1);
  const next = CATALOG.find((m) => m.numero === numero + 1);
  const start = (i) => mod && setLesson(buildLesson(mod, plus, i));

  return (
    <LightShell>
      <div className="unit-page">
        <Link to={`/ruta?nivel=${meta.nivel}`} className="unit-back">
          <ArrowLeftIcon size={16} /> Ruta {meta.nivel} · 学习路线
        </Link>

        <section className="unit-hero imperial-frame" style={{ "--c": c1, "--d": c2 }}>
          <span className="imperial-cloud c1" />
          <span className="imperial-cloud c2" />
          <span className="unit-seal">
            第{numero}
            <br />
            单元
          </span>
          <div className="unit-hero-text">
            <small>
              {meta.nivel} · UNIDAD {numero} · 第{numero}单元
            </small>
            <h1>{meta.titulo.split(" - ")[0]}</h1>
            <p>{meta.titulo.split(" - ")[1] || ""}</p>
            <span className="unit-zh">{meta.tituloChino}</span>
            <div className="unit-hero-progress">
              <div className="lp-bar" style={{ background: "rgba(0,0,0,.2)" }}>
                <i style={{ width: `${pct}%`, background: "linear-gradient(180deg,#fff,#e8e8e8)" }} />
              </div>
              <b>{pct}%</b>
            </div>
            <button className="btn3d unit-cta" style={{ "--c": "#fff", "--d": "rgba(0,0,0,.25)", color: c2 }} disabled={!mod} onClick={() => start(nextIdx === -1 ? 4 : nextIdx)}>
              <PlayIcon size={20} fill="currentColor" /> {!mod ? "Cargando…" : nextIdx === -1 ? "Repasar · 复习" : `${nextIdx === 0 ? "Empezar" : "Continuar"} · ${LESSON_META[nextIdx].es}`}
            </button>
          </div>
          <div className="unit-hero-art jade-plinth">
            <Emoji3D emoji={meta.icono} size={150} float />
          </div>
        </section>
        <span className="unit-stamp" aria-hidden="true">
          第<span className="tcy">{numero}</span>单元
        </span>

        <nav className="unit-jump" aria-label="Secciones">
          {[["lecciones", "🎯 Lecciones"], ["historia", "📖 Historia"], ["dialogos", "💬 Diálogos"], ["ejercicios", "💪 Ejercicios"], ["juegos", "🎮 Juegos"], ["palabras", "🔤 Palabras"], ["guia", "💡 Guía"]].map(([id, label]) => (
            <button key={id} onClick={() => document.getElementById(`u-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" })}>
              {label}
            </button>
          ))}
        </nav>

        <h2 className="unit-h2" id="u-lecciones">Lecciones · 课程</h2>
        <div className="unit-lessons">
          {LESSON_META.map((l, i) => {
            const open = i === 0 || done[i - 1] || done[i];
            return (
              <button key={l.key} className={`unit-lesson ${done[i] ? "done" : ""} ${open ? "" : "locked"} ${i === nextIdx ? "current" : ""}`} style={{ "--c": c1, "--d": c2 }} disabled={!mod} onClick={() => start(i)}>
                <span className="unit-lesson-icon disc">
                  <img src={`${THEME}${done[i] ? "lazo-oro" : open ? "disco-jade" : "disco-cerrado"}.png`} alt="" />
                  {done[i] && <CheckIcon className="disc-check" size={16} strokeWidth={4} />}
                </span>
                <b>{l.es}</b>
                <small>{l.zh}</small>
                <em>{done[i] ? "Hecha ✓" : "+10 XP"}</em>
              </button>
            );
          })}
        </div>

        {story && (
          <>
            <h2 className="unit-h2" id="u-historia">Historia · 故事</h2>
            <button className="unit-story" onClick={() => setPlayStory(true)}>
              <Emoji3D emoji={story.escena} size={96} float />
              <span style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                <small>HISTORIA INTERACTIVA · +15 XP</small>
                <b>{story.titulo}</b>
                <span className="lp-zh">{story.tituloZh}</span>
                <span className="unit-cast">
                  {[...new Set(story.lineas.map((l) => l.quien))]
                    .filter((q) => CAST[q] && q !== "narrador")
                    .map((q) => (
                      <span key={q} title={CAST[q].name}>
                        <Emoji3D emoji={CAST[q].emoji} size={34} />
                        {CAST[q].name}
                      </span>
                    ))}
                </span>
              </span>
              <span className="unit-play">
                <PlayIcon size={26} fill="currentColor" />
              </span>
            </button>
          </>
        )}

        {mod?.dialogos?.length > 0 && (
          <>
            <h2 className="unit-h2" id="u-dialogos">Diálogos · 对话 <small>({mod.dialogos.length} conversaciones con voz)</small></h2>
            <div className="unit-dialogs">
              {mod.dialogos.map((d, i) => (
                <button key={d.id || i} className="unit-dialog" onClick={() => setDialog(dialogToStory(d, numero, story?.escena))}>
                  <span className="unit-dialog-faces">
                    <Emoji3D emoji={["👩‍🦰", "🧔", "👧", "👨", "👵"][i % 5]} size={44} />
                    <Emoji3D emoji={["👨", "👧", "👵", "👩‍🦰", "🧔"][i % 5]} size={44} />
                  </span>
                  <span style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                    <b>{d.titulo}</b>
                    <small>
                      {d.tituloChino} · {(d.lineas || []).length} frases
                    </small>
                  </span>
                  <PlayIcon size={20} fill="currentColor" />
                </button>
              ))}
            </div>
          </>
        )}

        {mod && (
          <>
            <h2 className="unit-h2" id="u-ejercicios">Ejercicios · 练习 <small>(elige los tipos; cambian de orden en cada intento)</small></h2>
            <div className="unit-practice">
              <div className="unit-practice-types">
                {PRACTICE_TYPES.filter((t) => (mod.ejercicios?.[t.key] || []).length).map((t) => {
                  const on = types.includes(t.key);
                  return (
                    <button key={t.key} className={`unit-ptype ${on ? "on" : ""}`} style={{ "--c": c1 }} onClick={() => setTypes((ts) => (on ? ts.filter((x) => x !== t.key) : [...ts, t.key]))}>
                      <Emoji3D emoji={t.emoji} size={30} />
                      <span>
                        {t.es}
                        <small>
                          {t.zh} · {(mod.ejercicios?.[t.key] || []).length}
                        </small>
                      </span>
                    </button>
                  );
                })}
              </div>
              <button className="btn3d unit-practice-go" style={{ "--c": c1, "--d": c2 }} disabled={!types.length} onClick={() => setLesson(buildPractice(mod, types))}>
                💪 Practicar ahora · 开始练习
              </button>
            </div>

            <h2 className="unit-h2" id="u-juegos">Juegos · 游戏 <small>(con las palabras de esta unidad)</small></h2>
            <div className="unit-games">
              {GAMES.map((g) => {
                const Icon = g.icon;
                return (
                  <Link key={g.id} to={`${g.path}?m=${numero}`} className="unit-game">
                    <span className="unit-game-icon" style={{ background: g.gradient }}>
                      <Icon size={24} color="#fff" />
                    </span>
                    <b>{g.name}</b>
                    <small>{g.nameCn}</small>
                  </Link>
                );
              })}
            </div>

            <h2 className="unit-h2" id="u-palabras">Palabras · 词汇 <small>(toca para girar y escuchar)</small></h2>
            <div className="unit-words">
              {(mod.vocabulario || []).slice(0, 24).map((v) => (
                <WordCard key={v.id || v.espanol} v={v} color={c1} />
              ))}
            </div>

            <h2 className="unit-h2" id="u-guia">Guía rápida · 语法要点</h2>
            <div className="unit-guides">
              {(mod.teoria || []).map((t, i) => (
                <GuideCard key={i} t={t} index={i} color={c1} />
              ))}
            </div>
          </>
        )}

        <h2 className="unit-h2">Practica más · 更多练习</h2>
        <div className="unit-more">
          {[
            ["descubre", "📖", "Lectura y cultura", "阅读与文化"],
            ["examen", "📝", "Examen del módulo", "模块考试"],
          ].map(([k, e, es, zh]) => (
            <button key={k} className={`unit-more-card ${extra === k ? "on" : ""}`} style={{ "--c": c1 }} onClick={() => setExtra(extra === k ? null : k)}>
              <Emoji3D emoji={e} size={52} />
              <b>{es}</b>
              <small>{zh}</small>
            </button>
          ))}
        </div>
        {extra && mod && (
          <div className="unit-extra">
            <React.Suspense fallback={<div className="ui-empty">Cargando…</div>}>
              {extra === "descubre" && <ModuloDescubre numero={numero} showChinese />}
              {extra === "juegos" && <ModuloJuegos vocabulario={mod.vocabulario || []} moduloId={mod.id} />}
              {extra === "examen" && <ModuloExamen numero={numero} moduloId={mod.id} />}
            </React.Suspense>
          </div>
        )}

        <div className="unit-nav">
          {prev ? (
            <Link to={`/modulos/modulo-${prev.numero}`} className="unit-nav-btn">
              ← {prev.numero}. {prev.titulo.split(" - ")[0]}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link to={`/modulos/modulo-${next.numero}`} className="unit-nav-btn">
              {next.numero}. {next.titulo.split(" - ")[0]} →
            </Link>
          )}
        </div>
      </div>
      {lesson && <LessonPlayer lesson={lesson} onClose={() => setLesson(null)} />}
      {playStory && story && <StoryPlayer story={story} onClose={() => setPlayStory(false)} />}
      {dialog && <StoryPlayer story={dialog} onClose={() => setDialog(null)} />}
    </LightShell>
  );
}
