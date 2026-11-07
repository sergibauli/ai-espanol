import * as React from "react";
import { CheckIcon, XIcon, ClockIcon, ChevronLeftIcon, ChevronRightIcon, FlagIcon, RotateCcwIcon, PrinterIcon, BookOpenIcon, LanguagesIcon, LightbulbIcon, ListChecksIcon } from "lucide-react";
import { isCorrect, scoreExam, SKILLS } from "../../lib/examGenerator.js";

// Examen con estética imperial (pergamino, laca roja y oro). Estilos: src/styles/v12-examenes.css (prefijo xm-).
const LETTERS = ["A", "B", "C", "D", "E"];

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

const hasAnswer = (value) => value !== undefined && value !== null && value !== "";

// Párrafos de la lectura: respeta los saltos de línea del texto original
function paragraphs(text) {
  return String(text || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function verdict(nota) {
  if (nota >= 90) return { es: "¡Sobresaliente!", zh: "太棒了！", mono: "trofeo" };
  if (nota >= 80) return { es: "¡Excelente trabajo!", zh: "非常好！", mono: "trofeo" };
  if (nota >= 60) return { es: "¡Aprobado!", zh: "通过了！继续努力", mono: "feliz" };
  if (nota >= 40) return { es: "Casi lo tienes", zh: "差一点就通过了", mono: "serio" };
  return { es: "Sigue practicando", zh: "继续加油，多多练习", mono: "serio" };
}

function Question({ question, index, total, answer, onAnswer, reviewing }) {
  const ok = reviewing && isCorrect(question, answer);
  const skill = SKILLS[question.skill];
  const state = reviewing ? (ok ? "is-ok" : "is-bad") : "";
  return (
    <div className={`xm-q-body ${state}`}>
      <header className="xm-q-head">
        <span className="xm-q-seal" aria-hidden="true" translate="no">
          <small>第</small>
          {index + 1}
          <small>题</small>
        </span>
        <div className="xm-q-meta">
          <span className="xm-q-count">
            Pregunta {index + 1} de {total} · 第{index + 1}/{total}题
          </span>
          <div className="xm-tags">
            {skill && (
              <span className={`xm-tag sk-${question.skill}`}>
                {skill.es} · {skill.zh}
              </span>
            )}
            {question.nivel && <span className={`xm-tag lvl lvl-${question.nivel}`}>{question.nivel}</span>}
            {question.modulo && <span className="xm-tag soft">Unidad {question.modulo} · 第{question.modulo}单元</span>}
          </div>
        </div>
        {reviewing && (
          <span className={`xm-verdict ${ok ? "ok" : "bad"}`}>
            {ok ? <CheckIcon size={16} strokeWidth={3} /> : <XIcon size={16} strokeWidth={3} />}
            {ok ? "Correcta · 正确" : "Incorrecta · 错误"}
          </span>
        )}
      </header>

      <h3 className="xm-q-title">{question.enunciado}</h3>
      {question.enunciadoZh && <p className="xm-q-zh">{question.enunciadoZh}</p>}

      {question.tipo === "escribir" ? (
        <div className="xm-write">
          <label className="xm-write-label" htmlFor={`xm-in-${question.id}`}>
            Tu respuesta · 你的答案
          </label>
          <input
            id={`xm-in-${question.id}`}
            className={`xm-input ${reviewing ? (ok ? "is-ok" : "is-bad") : ""}`}
            value={answer ?? ""}
            disabled={reviewing}
            placeholder="Escribe tu respuesta · 输入答案"
            onChange={(event) => onAnswer(event.target.value)}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          {!reviewing && question.pista && (
            <p className="xm-hint">
              <LightbulbIcon size={15} /> Pista · 提示: {question.pista}
            </p>
          )}
          {reviewing && !ok && (
            <p className="xm-solution">
              <CheckIcon size={16} strokeWidth={3} /> Respuesta correcta · 正确答案: <b>{question.respuesta}</b>
            </p>
          )}
          {reviewing && ok && answer && String(answer).trim().toLowerCase() !== String(question.respuesta).trim().toLowerCase() && (
            <p className="xm-hint warn">Revisa tildes o mayúsculas · 注意重音和大小写: {question.respuesta}</p>
          )}
        </div>
      ) : (
        <div className="xm-options" role="radiogroup" aria-label="Opciones · 选项">
          {question.opciones.map((option, optionIndex) => {
            let cls = "xm-option";
            const picked = hasAnswer(answer) && Number(answer) === optionIndex;
            if (reviewing) {
              if (optionIndex === question.correcta) cls += " is-right";
              else if (picked) cls += " is-wrong";
              else cls += " is-dim";
            } else if (picked) cls += " is-picked";
            return (
              <button
                key={optionIndex}
                type="button"
                role="radio"
                aria-checked={picked}
                className={cls}
                disabled={reviewing}
                onClick={() => onAnswer(optionIndex)}
              >
                <span className="xm-letter" translate="no">
                  {LETTERS[optionIndex]}
                </span>
                <span className="xm-option-text">{option}</span>
                {reviewing && optionIndex === question.correcta && (
                  <span className="xm-option-mark ok">
                    <CheckIcon size={18} strokeWidth={3} />
                  </span>
                )}
                {reviewing && picked && optionIndex !== question.correcta && (
                  <span className="xm-option-mark bad">
                    <XIcon size={18} strokeWidth={3} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {reviewing && question.explicacion && (
        <div className="xm-explain">
          <b>
            <LightbulbIcon size={15} /> Explicación · 解析
          </b>
          <p>{question.explicacion}</p>
        </div>
      )}
    </div>
  );
}

function ScoreRing({ nota, apto }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className={`xm-ring ${apto ? "apto" : "noapto"}`} role="img" aria-label={`Nota ${nota} de 100`}>
      <svg viewBox="0 0 128 128" aria-hidden="true">
        <circle className="xm-ring-track" cx="64" cy="64" r={radius} />
        <circle
          className="xm-ring-fill"
          cx="64"
          cy="64"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - Math.max(0, Math.min(100, nota)) / 100)}
        />
      </svg>
      <div className="xm-ring-text">
        <b>{nota}</b>
        <small>/ 100</small>
      </div>
    </div>
  );
}

/**
 * Ejecuta un examen generado. onFinish(resultado, respuestas) se llama una vez al entregar.
 * Props: exam, onFinish, onRestart, compact (sin barra fija; para unidades y deberes).
 */
export function ExamRunner({ exam, onFinish, onRestart, compact = false }) {
  const items = React.useMemo(() => [...(exam.lectura?.preguntas || []), ...exam.preguntas], [exam]);
  const lecturaCount = exam.lectura?.preguntas.length || 0;
  const totalSeconds = exam.minutos * 60;
  const [answers, setAnswers] = React.useState({});
  const [current, setCurrent] = React.useState(0);
  const [result, setResult] = React.useState(null);
  const [secondsLeft, setSecondsLeft] = React.useState(totalSeconds);
  const [showZh, setShowZh] = React.useState(false);
  const [usedSeconds, setUsedSeconds] = React.useState(0);
  const finishedRef = React.useRef(false);
  const rootRef = React.useRef(null);
  const questionRef = React.useRef(null);

  const finish = React.useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const scored = scoreExam(exam, answers);
    setResult(scored);
    setUsedSeconds(totalSeconds - Math.max(0, secondsLeft));
    setCurrent(0);
    onFinish?.(scored, answers);
    if (compact && rootRef.current) rootRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }, [exam, answers, onFinish, compact, totalSeconds, secondsLeft]);

  React.useEffect(() => {
    if (result) return;
    const timer = setInterval(() => setSecondsLeft((seconds) => seconds - 1), 1000);
    return () => clearInterval(timer);
  }, [result]);
  React.useEffect(() => {
    if (secondsLeft <= 0 && !result) finish();
  }, [secondsLeft, result, finish]);

  const question = items[current];
  const answeredCount = items.filter((item) => hasAnswer(answers[item.id])).length;
  const reviewing = !!result;
  const inReading = exam.lectura && current < lecturaCount;
  const timeShare = Math.max(0, secondsLeft) / totalSeconds;
  const timeState = secondsLeft < 60 ? "is-urgent" : timeShare < 0.2 ? "is-low" : "";

  const goTo = (index) => {
    setCurrent(index);
    // En móvil, lleva la pregunta a la vista al cambiar desde la barra de navegación
    requestAnimationFrame(() => {
      const card = questionRef.current;
      if (!card) return;
      const top = card.getBoundingClientRect().top;
      if (top < 70 || top > window.innerHeight * 0.6) card.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const submit = () => {
    const missing = items.length - answeredCount;
    if (missing > 0 && !confirm(`Te quedan ${missing} preguntas sin responder. ¿Entregar igualmente?\n还有 ${missing} 道题未作答，确定交卷吗？`)) return;
    finish();
  };

  const verdictInfo = result ? verdict(result.nota) : null;

  return (
    <div ref={rootRef} className={`xm-root gm-no-adapt ${compact ? "xm-compact" : ""} ${reviewing ? "xm-reviewing" : ""}`}>
      {result && (
        <section className={`xm-result ${result.apto ? "apto" : "noapto"}`} aria-live="polite">
          <div className="xm-result-inner">
            <div className="xm-result-mono">
              <img src={`./mono/${verdictInfo.mono}.png`} alt="" />
            </div>
            <div className="xm-result-main">
              <div className="xm-eyebrow">Resultado del examen · 考试成绩</div>
              <h2 className="xm-result-title">
                {verdictInfo.es} <span>{verdictInfo.zh}</span>
              </h2>
              <p className="xm-result-sub">{exam.titulo}</p>
              <div className="xm-result-score">
                <ScoreRing nota={result.nota} apto={result.apto} />
                <div className={`xm-stamp ${result.apto ? "apto" : "noapto"}`} aria-label={result.apto ? "Apto" : "No apto"}>
                  <b translate="no">{result.apto ? "通过" : "未过"}</b>
                  <small>{result.apto ? "APTO" : "NO APTO"}</small>
                </div>
              </div>
              <div className="xm-facts">
                <span>
                  <b>{result.aciertos}</b> aciertos · 正确
                </span>
                <span>
                  <b>{result.total - result.aciertos}</b> fallos · 错误
                </span>
                <span>
                  <b>{formatTime(usedSeconds)}</b> tiempo · 用时
                </span>
              </div>
            </div>
          </div>

          <div className="xm-skills">
            {Object.entries(result.porSkill).map(([key, value]) => {
              const pct = Math.round((value.ok / value.total) * 100);
              return (
                <div key={key} className={`xm-skill ${pct >= 60 ? "ok" : "bad"}`}>
                  <div className="xm-skill-head">
                    <span>
                      {SKILLS[key]?.es} <em>{SKILLS[key]?.zh}</em>
                    </span>
                    <b>
                      {value.ok}/{value.total}
                    </b>
                  </div>
                  <div className="xm-meter" aria-hidden="true">
                    <i style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="xm-result-actions no-print">
            <button type="button" className="xm-btn" onClick={() => questionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}>
              <ListChecksIcon size={18} /> Revisar respuestas · 查看答案
            </button>
            <button type="button" className="xm-btn" onClick={() => window.print()}>
              <PrinterIcon size={18} /> Imprimir · 打印
            </button>
            {onRestart && (
              <button type="button" className="xm-btn primary" onClick={onRestart}>
                <RotateCcwIcon size={18} /> Nuevo examen · 再考一次
              </button>
            )}
          </div>
        </section>
      )}

      {!result && (
        <div className={`xm-bar no-print ${compact ? "" : "is-sticky"}`}>
          <div className={`xm-timer ${timeState}`} role="timer" aria-label={`Tiempo restante ${formatTime(Math.max(0, secondsLeft))}`}>
            <ClockIcon size={18} />
            <span className="xm-timer-text">{formatTime(Math.max(0, secondsLeft))}</span>
            <small>Tiempo · 时间</small>
          </div>
          <div className="xm-bar-progress">
            <div className="xm-bar-label">
              <span>
                <b>{answeredCount}</b>/{items.length} respondidas · 已答
              </span>
              <span className="xm-bar-pct">{Math.round((answeredCount / items.length) * 100)}%</span>
            </div>
            <div className="xm-rail" aria-hidden="true">
              <i style={{ width: `${(answeredCount / items.length) * 100}%` }} />
              <em style={{ width: `${(1 - timeShare) * 100}%` }} />
            </div>
          </div>
          <button type="button" className="xm-btn primary xm-submit" onClick={submit}>
            <FlagIcon size={17} /> Entregar · 交卷
          </button>
        </div>
      )}

      <nav className="xm-nav no-print" aria-label="Preguntas · 题目">
        {items.map((item, index) => {
          const value = answers[item.id];
          let cls = "xm-dot";
          if (reviewing) cls += isCorrect(item, value) ? " is-ok" : " is-bad";
          else if (hasAnswer(value)) cls += " is-done";
          if (index === current) cls += " is-current";
          if (lecturaCount && index === lecturaCount) cls += " xm-dot-gap";
          return (
            <button
              key={item.id}
              type="button"
              className={cls}
              onClick={() => goTo(index)}
              aria-label={`Pregunta ${index + 1}${reviewing ? (isCorrect(item, value) ? ", correcta" : ", incorrecta") : hasAnswer(value) ? ", respondida" : ""}`}
              aria-current={index === current ? "step" : undefined}
            >
              {index + 1}
            </button>
          );
        })}
        <span className="xm-legend" aria-hidden="true">
          {reviewing ? (
            <>
              <i className="ok" /> Correcta · 对 <i className="bad" /> Incorrecta · 错
            </>
          ) : (
            <>
              <i className="done" /> Respondida · 已答 <i /> Pendiente · 未答
            </>
          )}
        </span>
      </nav>

      <div className={`xm-stage ${inReading ? "has-reading" : ""}`}>
        {inReading && (
          <section className="xm-scroll" aria-label="Lectura · 阅读">
            <span className="xm-roller top" aria-hidden="true" />
            <div className="xm-scroll-paper">
              <header className="xm-scroll-head">
                <span className="xm-scroll-icon" aria-hidden="true">
                  <BookOpenIcon size={20} />
                </span>
                <div className="xm-scroll-titles">
                  <span className="xm-eyebrow">Comprensión lectora · 阅读理解</span>
                  <h3>{exam.lectura.titulo}</h3>
                  {exam.lectura.tituloZh && <p className="xm-scroll-zh">{exam.lectura.tituloZh}</p>}
                </div>
                {exam.lectura.textoZh && (
                  <button type="button" className={`xm-zh-toggle ${showZh ? "on" : ""}`} aria-pressed={showZh} onClick={() => setShowZh((value) => !value)}>
                    <LanguagesIcon size={16} /> {showZh ? "Ver español" : "Ver 中文"}
                  </button>
                )}
              </header>
              <div className={`xm-reading ${showZh ? "is-zh" : ""}`} tabIndex={0} lang={showZh ? "zh-CN" : "es"}>
                {paragraphs(showZh ? exam.lectura.textoZh : exam.lectura.texto).map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph}</p>
                ))}
              </div>
              <p className="xm-scroll-foot">
                Preguntas 1–{lecturaCount} sobre este texto · 第1–{lecturaCount}题根据本文回答
              </p>
            </div>
            <span className="xm-roller bottom" aria-hidden="true" />
          </section>
        )}

        <article ref={questionRef} className="xm-q">
          {question && (
            <Question
              key={question.id}
              question={question}
              index={current}
              total={items.length}
              answer={answers[question.id]}
              reviewing={reviewing}
              onAnswer={(value) => setAnswers((prev) => ({ ...prev, [question.id]: value }))}
            />
          )}
          <footer className="xm-q-foot no-print">
            <button type="button" className="xm-btn ghost" disabled={current === 0} onClick={() => goTo(current - 1)}>
              <ChevronLeftIcon size={18} /> Anterior · 上一题
            </button>
            {current === items.length - 1 && !reviewing ? (
              <button type="button" className="xm-btn primary" onClick={submit}>
                <FlagIcon size={17} /> Entregar · 交卷
              </button>
            ) : (
              <button type="button" className="xm-btn gold" disabled={current === items.length - 1} onClick={() => goTo(current + 1)}>
                Siguiente · 下一题 <ChevronRightIcon size={18} />
              </button>
            )}
          </footer>
        </article>
      </div>
    </div>
  );
}
