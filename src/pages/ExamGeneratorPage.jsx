import * as React from "react";
import { useSearchParams, Link } from "react-router";
import { SparklesIcon, Share2Icon, ClipboardCheckIcon, HistoryIcon, ShuffleIcon, Wand2Icon, CheckIcon } from "lucide-react";
import { LightShell } from "../components/layout/LightShell.jsx";
import { ExamRunner } from "../components/exam/ExamRunner.jsx";
import { generateExam, SKILLS, encodeExamConfig, decodeExamConfig, loadExamHistory, saveExamResult } from "../lib/examGenerator.js";
import { getModuleProgress } from "../lib/progress.js";
import { useCampus } from "../lib/campus.jsx";
import CATALOG from "../data/modulos/catalog.json";

const LEVELS = ["A1", "A2", "B1", "B2"];
const PRESETS = [
  { key: "rapido", es: "Test rápido", zh: "快速测试", total: 10, minutos: 10, conLectura: false },
  { key: "estandar", es: "Examen estándar", zh: "标准考试", total: 25, minutos: 30, conLectura: true },
  { key: "simulacro", es: "Simulacro DELE", zh: "DELE 模拟", total: 40, minutos: 50, conLectura: true },
];

export default function ExamGeneratorPage() {
  const [params, setParams] = useSearchParams();
  const { role, createHomework } = useCampus();
  const [levels, setLevels] = React.useState(["A1"]);
  const [selected, setSelected] = React.useState(() => CATALOG.filter((m) => m.nivel === "A1").slice(0, 5).map((m) => m.numero));
  const [skills, setSkills] = React.useState(Object.keys(SKILLS));
  const [preset, setPreset] = React.useState("estandar");
  const [exam, setExam] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [copied, setCopied] = React.useState("");
  const [history, setHistory] = React.useState(loadExamHistory);

  const shared = params.get("c");
  React.useEffect(() => {
    if (!shared) return;
    const cfg = decodeExamConfig(shared);
    if (cfg?.modulos?.length) {
      setLoading(true);
      generateExam(cfg).then((e) => {
        setExam(e);
        setLoading(false);
      });
    }
  }, [shared]);

  const visible = CATALOG.filter((m) => levels.includes(m.nivel));
  const p = PRESETS.find((x) => x.key === preset);

  const buildConfig = (overrides = {}) => ({
    modulos: selected,
    total: p.total,
    minutos: p.minutos,
    conLectura: p.conLectura,
    skills,
    seed: Math.floor(Math.random() * 1e9),
    ...overrides,
  });

  const start = async (overrides) => {
    const cfg = buildConfig(overrides);
    if (!cfg.modulos.length) return;
    setLoading(true);
    const e = await generateExam(cfg);
    setExam(e);
    setLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const smart = (kind) => {
    const progress = getModuleProgress();
    if (kind === "completados") {
      const done = CATALOG.filter((m) => progress[`modulo-${m.numero}`]?.completed || progress[`modulo-${m.numero}`]?.lastVisited).map((m) => m.numero);
      const mods = done.length ? done : CATALOG.slice(0, 3).map((m) => m.numero);
      setSelected(mods);
      start({ modulos: mods });
    } else {
      const lvl = levels[0] || "A1";
      const mods = CATALOG.filter((m) => m.nivel === lvl).map((m) => m.numero);
      setSelected(mods);
      start({ modulos: mods, total: 40, minutos: 50, conLectura: true, titulo: `Simulacro ${lvl}` });
    }
  };

  const copyLink = (cfg) => {
    const url = `${location.origin}${location.pathname}#/examenes/generador?c=${encodeExamConfig(cfg)}`;
    navigator.clipboard?.writeText(url);
    setCopied("link");
    setTimeout(() => setCopied(""), 2000);
  };

  const assign = async () => {
    const cfg = buildConfig();
    await createHomework({
      titulo: `Examen: módulos ${cfg.modulos.slice(0, 6).join(", ")}${cfg.modulos.length > 6 ? "…" : ""}`,
      descripcion: `Examen automático de ${cfg.total} preguntas (${cfg.minutos} min). Al terminar, la nota se entrega sola.`,
      examen: cfg,
    });
    setCopied("assign");
    setTimeout(() => setCopied(""), 2500);
  };

  const onFinish = (r) => {
    const entry = { fecha: new Date().toISOString(), titulo: exam.titulo, nota: r.nota, total: r.total, aciertos: r.aciertos, config: exam.config };
    saveExamResult(entry);
    setHistory(loadExamHistory());
  };

  if (exam) {
    return (
      <LightShell>
        <div className="ui-page">
          <div className="ui-between no-print" style={{ marginBottom: 18 }}>
            <div>
              <div className="ui-eyebrow">
                <SparklesIcon size={14} /> Examen generado · 自动生成
              </div>
              <h1 className="ui-h2" style={{ marginTop: 6 }}>{exam.titulo}</h1>
              <div className="ui-row" style={{ marginTop: 8 }}>
                {exam.niveles.map((l) => (
                  <span key={l} className={`ui-chip lvl-${l}`}>{l}</span>
                ))}
                <span className="ui-chip">{(exam.lectura?.preguntas.length || 0) + exam.preguntas.length} preguntas</span>
                <span className="ui-chip">{exam.minutos} min</span>
              </div>
            </div>
            <div className="ui-row">
              <button className="ui-btn sm" onClick={() => copyLink(exam.config)}>
                {copied === "link" ? <CheckIcon size={15} /> : <Share2Icon size={15} />} Compartir mismo examen
              </button>
              <button
                className="ui-btn sm ghost"
                onClick={() => {
                  setExam(null);
                  if (shared) setParams({});
                }}
              >
                Salir
              </button>
            </div>
          </div>
          <ExamRunner
            key={exam.id}
            exam={exam}
            onFinish={onFinish}
            onRestart={() => {
              if (shared) setParams({});
              start({ modulos: exam.config.modulos, total: exam.config.total, minutos: exam.minutos, conLectura: exam.config.conLectura, skills: exam.config.skills });
            }}
          />
        </div>
      </LightShell>
    );
  }

  return (
    <LightShell>
      <div className="ui-page">
        <div className="ui-card is-hero">
          <div className="ui-eyebrow">
            <Wand2Icon size={14} /> Generador automático · 自动出题
          </div>
          <h1 className="ui-h1">
            Un examen nuevo <span className="ui-gradient-text">cada vez</span>
          </h1>
          <p className="ui-lead">
            Elige niveles y módulos: el generador combina más de 5.000 preguntas (vocabulario, gramática, uso de la lengua y
            comprensión lectora) y crea un examen distinto con corrección automática y explicaciones en chino.
            <br />
            <span className="ui-zh">选择级别和模块，系统会自动生成一份新试卷，自动批改并提供中文解析。</span>
          </p>
          <div className="ui-row" style={{ marginTop: 18 }}>
            <button className="ui-btn primary lg" disabled={loading || !selected.length} onClick={() => start()}>
              <SparklesIcon size={18} /> {loading ? "Generando…" : "Generar examen · 生成"}
            </button>
            <button className="ui-btn lg" onClick={() => smart("completados")}>
              <ShuffleIcon size={18} /> Repaso de mis módulos
            </button>
            <button className="ui-btn lg" onClick={() => smart("simulacro")}>
              🏆 Simulacro de nivel {levels[0] || "A1"}
            </button>
          </div>
        </div>

        <div className="ui-grid cols-3 ui-section">
          {PRESETS.map((x) => (
            <button key={x.key} className={`ui-card is-link`} onClick={() => setPreset(x.key)} style={{ textAlign: "left", borderColor: preset === x.key ? "var(--ui-brand)" : undefined, color: "inherit" }}>
              <div className="ui-between">
                <div className="ui-h3">{x.es}</div>
                {preset === x.key && <span className="ui-chip is-on">✓</span>}
              </div>
              <div className="ui-zh">{x.zh}</div>
              <div className="ui-row" style={{ marginTop: 10 }}>
                <span className="ui-chip">{x.total} preguntas</span>
                <span className="ui-chip">{x.minutos} min</span>
                {x.conLectura && <span className="ui-chip">+ lectura</span>}
              </div>
            </button>
          ))}
        </div>

        <div className="ui-section ui-card">
          <div className="ui-between">
            <div>
              <h2 className="ui-h2">1 · Niveles y destrezas</h2>
              <div className="ui-zh">级别与技能</div>
            </div>
          </div>
          <div className="ui-row" style={{ marginTop: 14 }}>
            {LEVELS.map((l) => (
              <button
                key={l}
                className={`ui-chip lvl-${l} ${levels.includes(l) ? "is-on" : ""}`}
                onClick={() => setLevels((ls) => (ls.includes(l) ? ls.filter((x) => x !== l) : [...ls, l]))}
                style={{ fontSize: 14, padding: "8px 16px" }}
              >
                {l}
              </button>
            ))}
            <span style={{ width: 16 }} />
            {Object.entries(SKILLS).map(([k, s]) => (
              <button key={k} className={`ui-chip ${skills.includes(k) ? "is-on" : ""}`} onClick={() => setSkills((ss) => (ss.includes(k) ? ss.filter((x) => x !== k) : [...ss, k]))}>
                {s.es} · {s.zh}
              </button>
            ))}
          </div>
        </div>

        <div className="ui-section ui-card">
          <div className="ui-between">
            <div>
              <h2 className="ui-h2">2 · Módulos ({selected.length})</h2>
              <div className="ui-zh">选择模块</div>
            </div>
            <div className="ui-row">
              <button className="ui-btn sm" onClick={() => setSelected([...new Set([...selected, ...visible.map((m) => m.numero)])])}>
                Todos los visibles
              </button>
              <button className="ui-btn sm ghost" onClick={() => setSelected([])}>
                Ninguno
              </button>
            </div>
          </div>
          <div className="ui-grid auto" style={{ marginTop: 14, gap: 10 }}>
            {visible.map((m) => {
              const on = selected.includes(m.numero);
              return (
                <button
                  key={m.numero}
                  onClick={() => setSelected((s) => (on ? s.filter((x) => x !== m.numero) : [...s, m.numero]))}
                  className="ui-option"
                  style={{ borderColor: on ? m.color : undefined, background: on ? `${m.color}22` : undefined, padding: "10px 12px" }}
                >
                  <span style={{ fontSize: 22 }}>{m.icono}</span>
                  <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {m.numero}. {m.titulo.split(" - ")[0]}
                    </span>
                    <span className="ui-zh" style={{ fontSize: 12 }}>{m.tituloChino.split(" - ")[0]}</span>
                  </span>
                  {on && <CheckIcon size={16} style={{ marginLeft: "auto", flexShrink: 0 }} />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="ui-section ui-row">
          <button className="ui-btn primary lg" disabled={loading || !selected.length} onClick={() => start()}>
            <SparklesIcon size={18} /> Generar examen
          </button>
          <button className="ui-btn lg" disabled={!selected.length} onClick={() => copyLink(buildConfig())}>
            {copied === "link" ? <CheckIcon size={18} /> : <Share2Icon size={18} />} {copied === "link" ? "¡Enlace copiado!" : "Copiar enlace para alumnos"}
          </button>
          {(role === "teacher" || role === "admin") && (
            <button className="ui-btn accent lg" disabled={!selected.length} onClick={assign}>
              <ClipboardCheckIcon size={18} /> {copied === "assign" ? "¡Asignado como deberes!" : "Asignar como deberes"}
            </button>
          )}
        </div>

        {history.length > 0 && (
          <div className="ui-section ui-card">
            <div className="ui-row" style={{ marginBottom: 12 }}>
              <HistoryIcon size={18} />
              <h2 className="ui-h2">Mis resultados · 我的成绩</h2>
            </div>
            <div className="ui-table-wrap">
              <table className="ui-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Examen</th>
                    <th>Nota</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {history.slice(0, 10).map((h, i) => (
                    <tr key={i}>
                      <td className="ui-muted">{new Date(h.fecha).toLocaleString("es-ES", { dateStyle: "short", timeStyle: "short" })}</td>
                      <td>{h.titulo}</td>
                      <td>
                        <span className={`ui-chip ${h.nota >= 60 ? "ok" : "bad"}`}>{h.nota}/100</span>
                      </td>
                      <td>
                        <button className="ui-btn sm" onClick={() => start({ ...h.config, seed: Math.floor(Math.random() * 1e9) })}>
                          Repetir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <p className="ui-muted ui-section" style={{ fontSize: 13 }}>
          ¿Prefieres modelos completos? <Link to="/oficial" style={{ color: "var(--ui-accent)" }}>Exámenes oficiales DELE</Link> ·{" "}
          <Link to="/examenes" style={{ color: "var(--ui-accent)" }}>Exámenes de práctica</Link>
        </p>
      </div>
    </LightShell>
  );
}
