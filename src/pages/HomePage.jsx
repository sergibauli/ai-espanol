import * as React from "react";
import { Link } from "react-router";
import {
  BookMarkedIcon,
  Wand2Icon,
  AwardIcon,
  Gamepad2Icon,
  MicIcon,
  BookOpenIcon,
  LibraryIcon,
  MusicIcon,
  AudioLinesIcon,
  BrainIcon,
  ArrowRightIcon,
  FlameIcon,
  VideoIcon,
  ClipboardListIcon,
  GraduationCapIcon,
} from "lucide-react";
import { StarfieldBackground } from "../components/fx/StarfieldBackground.jsx";
import { useAppAuth } from "../lib/auth.jsx";
import { useCampus, classStatus } from "../lib/campus.jsx";
import { ClassCard } from "../components/campus/ClassCard.jsx";
import { getModuleProgress } from "../lib/progress.js";
import { getSrsStats } from "../lib/srs.js";
import { touchStreak, lastDays } from "../lib/streak.js";
import { loadExamHistory } from "../lib/examGenerator.js";
import CATALOG from "../data/modulos/catalog.json";

const LEVELS = [
  { key: "A1", es: "Principiante", zh: "入门", color: "var(--ui-a1)" },
  { key: "A2", es: "Elemental", zh: "初级", color: "var(--ui-a2)" },
  { key: "B1", es: "Intermedio", zh: "中级", color: "var(--ui-b1)" },
  { key: "B2", es: "Avanzado", zh: "中高级", color: "var(--ui-b2)" },
];

const TOOLS = [
  { to: "/modulos", icon: BookMarkedIcon, es: "Módulos", zh: "模块课程", color: "#f59e0b", desc: `${CATALOG.length} módulos A1–B2` },
  { to: "/examenes/generador", icon: Wand2Icon, es: "Generador de exámenes", zh: "自动出题", color: "#ff7a1a", desc: "Un examen nuevo cada vez" },
  { to: "/oficial", icon: AwardIcon, es: "DELE oficiales", zh: "DELE 官方真题", color: "#e0b566", desc: "Modelos completos A1–B2" },
  { to: "/examenes", icon: GraduationCapIcon, es: "DELE práctica", zh: "DELE 练习", color: "#ef4444", desc: "Por tareas y niveles" },
  { to: "/juegos", icon: Gamepad2Icon, es: "Juegos", zh: "游戏", color: "#06b6d4", desc: "47 juegos de vocabulario" },
  { to: "/pronunciacion", icon: MicIcon, es: "Pronunciación", zh: "发音", color: "#ec4899", desc: "r, rr, l, b/v, j…" },
  { to: "/diccionarios", icon: BookOpenIcon, es: "Diccionarios", zh: "词典", color: "#a855f7", desc: "Español–chino por nivel" },
  { to: "/gramatica", icon: LibraryIcon, es: "Gramática", zh: "语法", color: "#f97316", desc: "Explicada en chino" },
  { to: "/memoria", icon: BrainIcon, es: "Repaso inteligente", zh: "记忆复习", color: "#66e7ff", desc: "Repetición espaciada" },
  { to: "/karaoke", icon: MusicIcon, es: "Karaoke", zh: "卡拉OK", color: "#c084fc", desc: "Aprende con canciones" },
  { to: "/tutor-voz", icon: AudioLinesIcon, es: "Tutor de voz", zh: "语音导师", color: "#39ff14", desc: "Habla con la IA" },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 13) return ["Buenos días", "早上好"];
  if (h < 20) return ["Buenas tardes", "下午好"];
  return ["Buenas noches", "晚上好"];
}

export default function HomePage() {
  const { user } = useAppAuth();
  const campus = useCampus();
  const [streak] = React.useState(() => touchStreak());
  const week = lastDays(7);
  const progress = getModuleProgress();
  const srs = getSrsStats();
  const history = loadExamHistory();
  const [hola, holaZh] = greeting();

  const levelStats = LEVELS.map((l) => {
    const mods = CATALOG.filter((m) => m.nivel === l.key);
    const done = mods.filter((m) => progress[`modulo-${m.numero}`]?.completed).length;
    return { ...l, total: mods.length, done, pct: mods.length ? Math.round((done / mods.length) * 100) : 0 };
  });
  const currentLevel = levelStats.find((l) => l.pct < 100) || levelStats[3];

  const visited = CATALOG.filter((m) => progress[`modulo-${m.numero}`]?.lastVisited).sort(
    (a, b) => progress[`modulo-${b.numero}`].lastVisited - progress[`modulo-${a.numero}`].lastVisited,
  );
  const lastMod = visited[0];
  const nextMod = lastMod && progress[`modulo-${lastMod.numero}`]?.completed ? CATALOG.find((m) => m.numero === lastMod.numero + 1) || lastMod : lastMod || CATALOG[0];

  const nextClass = campus.data.classes.filter((c) => classStatus(c) !== "terminada").sort((a, b) => a.inicio.localeCompare(b.inicio))[0];
  const pendingHw = campus.role === "student" ? campus.data.homework.filter((h) => !campus.data.submissions.some((s) => s.homeworkId === h.id)) : [];
  const avg = history.length ? Math.round(history.slice(0, 5).reduce((s, h) => s + h.nota, 0) / Math.min(5, history.length)) : null;

  return (
    <StarfieldBackground>
      <div className="ui-page">
        <section className="ui-card is-hero" style={{ padding: "clamp(22px, 4vw, 36px)" }}>
          <div className="ui-grid cols-2" style={{ alignItems: "center" }}>
            <div>
              <div className="ui-eyebrow">
                {hola} · {holaZh}
              </div>
              <h1 className="ui-h1">
                <span className="ui-gradient-text">{user?.name || "Estudiante"}</span>, ¿seguimos?
              </h1>
              <p className="ui-lead" style={{ margin: "0 0 18px" }}>
                Tu nivel actual: <b>{currentLevel.key}</b> · {currentLevel.es} <span className="ui-zh">{currentLevel.zh}</span>
              </p>
              <div className="ui-row">
                <Link className="ui-btn primary lg" to="/ruta">
                  {nextMod.icono} {lastMod ? "Continuar mi ruta" : "Empezar mi ruta"} · 学习路线 <ArrowRightIcon size={18} />
                </Link>
                <Link className="ui-btn lg" to="/examenes/generador">
                  <Wand2Icon size={18} /> Examen rápido
                </Link>
              </div>
            </div>
            <div className="ui-grid cols-2 keep" style={{ gap: 12 }}>
              <div className="ui-card" style={{ background: "rgba(0,0,0,0.2)" }}>
                <div className="ui-row" style={{ gap: 8 }}>
                  <FlameIcon size={22} style={{ color: "#ff7a1a" }} />
                  <b style={{ fontFamily: "var(--ui-display)", fontSize: 28 }}>{streak}</b>
                </div>
                <div className="ui-muted" style={{ fontSize: 12, fontWeight: 700, marginTop: 4 }}>días seguidos · 连续天数</div>
                <div className="ui-row" style={{ gap: 4, marginTop: 10 }}>
                  {week.map((d, i) => (
                    <span key={i} title={d.date.toLocaleDateString("es-ES")} style={{ width: 16, height: 16, borderRadius: 5, background: d.active ? "linear-gradient(135deg,#ff7a1a,#ff3d8b)" : "rgba(255,255,255,0.08)" }} />
                  ))}
                </div>
              </div>
              <div className="ui-card ui-stat" style={{ background: "rgba(0,0,0,0.2)" }}>
                <b>{Object.values(progress).filter((p) => p.completed).length}</b>
                <span>módulos completados · 已完成</span>
              </div>
              <Link to="/memoria" className="ui-card is-link ui-stat" style={{ background: "rgba(0,0,0,0.2)" }}>
                <b>{srs.due}</b>
                <span>palabras para repasar hoy · 今日复习</span>
              </Link>
              <div className="ui-card ui-stat" style={{ background: "rgba(0,0,0,0.2)" }}>
                <b>{avg ?? "–"}</b>
                <span>nota media exámenes · 平均分</span>
              </div>
            </div>
          </div>
        </section>

        {(nextClass || pendingHw.length > 0) && (
          <section className="ui-section ui-grid cols-2" style={{ alignItems: "start" }}>
            <div>
              <div className="ui-between" style={{ marginBottom: 12 }}>
                <h2 className="ui-h2">
                  <VideoIcon size={20} style={{ display: "inline", marginRight: 6 }} />
                  Próxima clase · 下节课
                </h2>
                <Link to="/campus" className="ui-btn sm">
                  Campus
                </Link>
              </div>
              {nextClass ? <ClassCard c={nextClass} data={campus.data} /> : <div className="ui-empty">Sin clases programadas</div>}
            </div>
            <div>
              <div className="ui-between" style={{ marginBottom: 12 }}>
                <h2 className="ui-h2">
                  <ClipboardListIcon size={20} style={{ display: "inline", marginRight: 6 }} />
                  Deberes · 作业
                </h2>
                <Link to="/campus?tab=deberes" className="ui-btn sm">
                  Ver todos
                </Link>
              </div>
              <div className="ui-stack">
                {pendingHw.slice(0, 3).map((h) => (
                  <Link key={h.id} to="/campus?tab=deberes" className="ui-card is-link" style={{ padding: 14 }}>
                    <div className="ui-between">
                      <b>{h.titulo}</b>
                      <span className="ui-chip warn">{new Date(h.fechaEntrega).toLocaleDateString("es-ES", { weekday: "short", day: "numeric" })}</span>
                    </div>
                  </Link>
                ))}
                {!pendingHw.length && <div className="ui-empty">¡Todo entregado! 🎉 · 全部完成</div>}
              </div>
            </div>
          </section>
        )}

        <section className="ui-section">
          <div className="ui-between">
            <div>
              <h2 className="ui-h2">Tu ruta hacia el DELE · 你的DELE之路</h2>
              <div className="ui-zh">{CATALOG.length} módulos con teoría, vocabulario, diálogos, lectura, ejercicios, juegos y examen</div>
            </div>
            <Link to="/modulos" className="ui-btn sm">
              Todos los módulos
            </Link>
          </div>
          <div className="ui-grid cols-4" style={{ marginTop: 14 }}>
            {levelStats.map((l) => (
              <Link key={l.key} to="/modulos" className="ui-card is-link" style={{ borderTop: `3px solid ${l.color}` }}>
                <div className="ui-between">
                  <b style={{ fontFamily: "var(--ui-display)", fontSize: 26, color: l.color }}>{l.key}</b>
                  <span className="ui-chip">
                    {l.done}/{l.total}
                  </span>
                </div>
                <div style={{ fontWeight: 800, marginTop: 6 }}>{l.es}</div>
                <div className="ui-zh">{l.zh}</div>
                <div className="ui-progress" style={{ marginTop: 12 }}>
                  <i style={{ width: `${l.pct}%`, background: l.color }} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="ui-section">
          <h2 className="ui-h2" style={{ marginBottom: 14 }}>
            Herramientas · 学习工具
          </h2>
          <div className="ui-grid auto">
            {TOOLS.map((t) => {
              const Icon = t.icon;
              return (
                <Link key={t.to} to={t.to} className="ui-card is-link" style={{ display: "flex", gap: 14, alignItems: "center", padding: 16 }}>
                  <span className="ui-icon" style={{ color: t.color, background: `${t.color}1c`, borderColor: `${t.color}44` }}>
                    <Icon size={20} />
                  </span>
                  <span style={{ minWidth: 0 }}>
                    <span style={{ display: "block", fontWeight: 800 }}>{t.es}</span>
                    <span className="ui-zh" style={{ display: "block", fontSize: 12 }}>
                      {t.zh} · {t.desc}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="ui-section">
          <Link to="/profesores" className="ui-card is-link is-hero" style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ fontSize: 46 }}>👩🏻‍🏫👨🏻‍💼</div>
            <div style={{ flex: 1, minWidth: 240 }}>
              <div className="ui-h2">Clases en directo con profesores nativos y chinos</div>
              <div className="ui-zh" style={{ marginTop: 4 }}>外教 + 中文老师 · 腾讯会议一对一 · 免费试听</div>
            </div>
            <span className="ui-btn primary">
              Clase de prueba gratis <ArrowRightIcon size={16} />
            </span>
          </Link>
        </section>
      </div>
    </StarfieldBackground>
  );
}
