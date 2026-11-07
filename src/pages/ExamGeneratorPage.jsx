import * as React from "react";
import { useSearchParams, Link } from "react-router";
import { SparklesIcon, Share2Icon, ClipboardCheckIcon, HistoryIcon, ShuffleIcon, Wand2Icon, CheckIcon, TrophyIcon, LogOutIcon, RotateCcwIcon } from "lucide-react";
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
      generateExam(cfg).then((generated) => {
        setExam(generated);
        setLoading(false);
      });
    }
  }, [shared]);

  const visible = CATALOG.filter((m) => levels.includes(m.nivel));
  const currentPreset = PRESETS.find((item) => item.key === preset);

  const buildConfig = (overrides = {}) => ({
    modulos: selected,
    total: currentPreset.total,
    minutos: currentPreset.minutos,
    conLectura: currentPreset.conLectura,
    skills,
    seed: Math.floor(Math.random() * 1e9),
    ...overrides,
  });

  const start = async (overrides) => {
    const cfg = buildConfig(overrides);
    if (!cfg.modulos.length) return;
    setLoading(true);
    const generated = await generateExam(cfg);
    setExam(generated);
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

  const totalPreguntas = exam ? (exam.lectura?.preguntas.length || 0) + exam.preguntas.length : 0;

  if (exam) {
    return (
      <LightShell>
        <div className="ui-page xm-gen gm-no-adapt">
          <header className="xm-gen-examhead no-print">
            <div className="xm-gen-examhead-text">
              <span className="xm-eyebrow">
                <SparklesIcon size={14} /> Examen generado · 自动生成
              </span>
              <h1>{exam.titulo}</h1>
              <div className="xm-gen-pills">
                {exam.niveles.map((nivel) => (
                  <span key={nivel} className={`xm-tag lvl lvl-${nivel}`}>{nivel}</span>
                ))}
                <span className="xm-tag">{totalPreguntas} preguntas · 题</span>
                <span className="xm-tag">{exam.minutos} min · 分钟</span>
              </div>
            </div>
            <div className="xm-gen-examhead-actions">
              <button type="button" className="xm-btn" onClick={() => copyLink(exam.config)}>
                {copied === "link" ? <CheckIcon size={16} /> : <Share2Icon size={16} />} {copied === "link" ? "¡Copiado! · 已复制" : "Compartir · 分享"}
              </button>
              <button
                type="button"
                className="xm-btn ghost"
                onClick={() => {
                  setExam(null);
                  if (shared) setParams({});
                }}
              >
                <LogOutIcon size={16} /> Salir · 退出
              </button>
            </div>
          </header>
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
      <div className="ui-page xm-gen gm-no-adapt">
        <section className="xm-gen-hero">
          <div className="xm-gen-hero-text">
            <span className="xm-eyebrow">
              <Wand2Icon size={14} /> Generador automático · 自动出题
            </span>
            <h1>
              Un examen nuevo <em>cada vez</em>
            </h1>
            <p className="xm-gen-kai" translate="no">每次一份新试卷</p>
            <p className="xm-gen-lead">
              Elige niveles y módulos: el generador combina más de 5.000 preguntas (vocabulario, gramática, uso de la lengua y comprensión lectora) y crea un
              examen distinto con corrección automática y explicaciones en chino.
            </p>
            <p className="xm-gen-lead zh">选择级别和模块，系统会自动生成一份新试卷，自动批改并提供中文解析。</p>
            <div className="xm-gen-actions">
              <button type="button" className="xm-btn primary" disabled={loading || !selected.length} onClick={() => start()}>
                <SparklesIcon size={18} /> {loading ? "Generando… · 生成中" : "Generar examen · 生成"}
              </button>
              <button type="button" className="xm-btn" onClick={() => smart("completados")}>
                <ShuffleIcon size={18} /> Repaso de mis módulos · 复习
              </button>
              <button type="button" className="xm-btn gold" onClick={() => smart("simulacro")}>
                <TrophyIcon size={18} /> Simulacro {levels[0] || "A1"} · 模拟考
              </button>
            </div>
          </div>
          <div className="xm-gen-hero-art" aria-hidden="true">
            <img src="./mono/poder.png" alt="" />
          </div>
        </section>

        <div className="xm-gen-presets" role="radiogroup" aria-label="Tipo de examen · 考试类型">
          {PRESETS.map((item, index) => (
            <button
              key={item.key}
              type="button"
              role="radio"
              aria-checked={preset === item.key}
              className={`xm-preset ${preset === item.key ? "on" : ""}`}
              onClick={() => setPreset(item.key)}
            >
              <span className="xm-preset-seal" translate="no">{["快", "标", "模"][index]}</span>
              <span className="xm-preset-body">
                <b>{item.es}</b>
                <small>{item.zh}</small>
                <span className="xm-gen-pills">
                  <span className="xm-tag">{item.total} preguntas · 题</span>
                  <span className="xm-tag">{item.minutos} min</span>
                  {item.conLectura && <span className="xm-tag">+ lectura · 阅读</span>}
                </span>
              </span>
              {preset === item.key && (
                <span className="xm-preset-check">
                  <CheckIcon size={16} strokeWidth={3} />
                </span>
              )}
            </button>
          ))}
        </div>

        <section className="xm-panel">
          <header className="xm-panel-head">
            <span className="xm-step" translate="no">一</span>
            <div>
              <h2>Niveles y destrezas</h2>
              <small>级别与技能</small>
            </div>
          </header>
          <div className="xm-gen-row">
            {LEVELS.map((nivel) => (
              <button
                key={nivel}
                type="button"
                aria-pressed={levels.includes(nivel)}
                className={`xm-toggle lvl lvl-${nivel} ${levels.includes(nivel) ? "on" : ""}`}
                onClick={() => setLevels((current) => (current.includes(nivel) ? current.filter((x) => x !== nivel) : [...current, nivel]))}
              >
                {nivel}
              </button>
            ))}
            <span className="xm-gen-sep" aria-hidden="true" />
            {Object.entries(SKILLS).map(([key, skill]) => (
              <button
                key={key}
                type="button"
                aria-pressed={skills.includes(key)}
                className={`xm-toggle ${skills.includes(key) ? "on" : ""}`}
                onClick={() => setSkills((current) => (current.includes(key) ? current.filter((x) => x !== key) : [...current, key]))}
              >
                {skills.includes(key) && <CheckIcon size={15} strokeWidth={3} />} {skill.es} · {skill.zh}
              </button>
            ))}
          </div>
        </section>

        <section className="xm-panel">
          <header className="xm-panel-head">
            <span className="xm-step" translate="no">二</span>
            <div>
              <h2>Módulos ({selected.length})</h2>
              <small>选择模块</small>
            </div>
            <div className="xm-panel-tools">
              <button type="button" className="xm-btn ghost sm" onClick={() => setSelected([...new Set([...selected, ...visible.map((modulo) => modulo.numero)])])}>
                Todos · 全选
              </button>
              <button type="button" className="xm-btn ghost sm" onClick={() => setSelected([])}>
                Ninguno · 清空
              </button>
            </div>
          </header>
          <div className="xm-mods">
            {visible.map((modulo) => {
              const on = selected.includes(modulo.numero);
              return (
                <button
                  key={modulo.numero}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setSelected((current) => (on ? current.filter((x) => x !== modulo.numero) : [...current, modulo.numero]))}
                  className={`xm-mod ${on ? "on" : ""}`}
                  style={{ "--mc": modulo.color }}
                >
                  <span className="xm-mod-icon" aria-hidden="true">{modulo.icono}</span>
                  <span className="xm-mod-text">
                    <b>
                      {modulo.numero}. {modulo.titulo.split(" - ")[0]}
                    </b>
                    <small>{modulo.tituloChino.split(" - ")[0]}</small>
                  </span>
                  <span className="xm-mod-check" aria-hidden="true">
                    {on && <CheckIcon size={14} strokeWidth={3} />}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="xm-gen-cta">
          <div className="xm-gen-summary">
            <b>{selected.length}</b> módulos · 模块 <span aria-hidden="true">·</span> <b>{currentPreset.total}</b> preguntas · 题 <span aria-hidden="true">·</span>{" "}
            <b>{currentPreset.minutos}</b> min
          </div>
          <div className="xm-gen-actions">
            <button type="button" className="xm-btn primary" disabled={loading || !selected.length} onClick={() => start()}>
              <SparklesIcon size={18} /> {loading ? "Generando… · 生成中" : "Generar examen · 生成"}
            </button>
            <button type="button" className="xm-btn" disabled={!selected.length} onClick={() => copyLink(buildConfig())}>
              {copied === "link" ? <CheckIcon size={18} /> : <Share2Icon size={18} />} {copied === "link" ? "¡Enlace copiado! · 已复制" : "Enlace para alumnos · 分享链接"}
            </button>
            {(role === "teacher" || role === "admin") && (
              <button type="button" className="xm-btn gold" disabled={!selected.length} onClick={assign}>
                <ClipboardCheckIcon size={18} /> {copied === "assign" ? "¡Asignado! · 已布置" : "Asignar como deberes · 布置作业"}
              </button>
            )}
          </div>
        </section>

        {history.length > 0 && (
          <section className="xm-panel">
            <header className="xm-panel-head">
              <span className="xm-step" translate="no">
                <HistoryIcon size={20} />
              </span>
              <div>
                <h2>Mis resultados</h2>
                <small>我的成绩</small>
              </div>
            </header>
            <ul className="xm-history">
              {history.slice(0, 10).map((entry, index) => (
                <li key={index}>
                  <span className={`xm-history-score ${entry.nota >= 60 ? "ok" : "bad"}`}>{entry.nota}</span>
                  <span className="xm-history-text">
                    <b>{entry.titulo}</b>
                    <small>{new Date(entry.fecha).toLocaleString("es-ES", { dateStyle: "short", timeStyle: "short" })}</small>
                  </span>
                  <button type="button" className="xm-btn ghost sm" onClick={() => start({ ...entry.config, seed: Math.floor(Math.random() * 1e9) })}>
                    <RotateCcwIcon size={15} /> Repetir · 重做
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
        <p className="xm-gen-links">
          ¿Prefieres modelos completos? · 想做完整模拟题？ <Link to="/oficial">Exámenes oficiales DELE · 官方模拟</Link>
          <Link to="/examenes">Exámenes de práctica · 练习</Link>
        </p>
      </div>
    </LightShell>
  );
}
