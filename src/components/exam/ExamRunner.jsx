import * as React from "react";
import { CheckCircle2Icon, XCircleIcon, ClockIcon, ChevronLeftIcon, ChevronRightIcon, FlagIcon, RotateCcwIcon, PrinterIcon, BookOpenIcon } from "lucide-react";
import { isCorrect, scoreExam, SKILLS } from "../../lib/examGenerator.js";

const LETTERS = ["A", "B", "C", "D", "E"];

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function Question({ q, index, answer, onAnswer, reviewing }) {
  const ok = reviewing && isCorrect(q, answer);
  return (
    <div className="ui-stack" style={{ gap: 14 }}>
      <div className="ui-row" style={{ gap: 8 }}>
        <span className="ui-chip">#{index + 1}</span>
        <span className="ui-chip">{SKILLS[q.skill]?.es} · {SKILLS[q.skill]?.zh}</span>
        <span className={`ui-chip lvl-${q.nivel}`}>{q.nivel}</span>
        <span className="ui-chip ui-muted">M{q.modulo}</span>
      </div>
      <div>
        <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.4 }}>{q.enunciado}</div>
        {q.enunciadoZh && <div className="ui-zh" style={{ marginTop: 6 }}>{q.enunciadoZh}</div>}
      </div>
      {q.tipo === "escribir" ? (
        <div className="ui-stack">
          <input
            className="ui-input"
            value={answer ?? ""}
            disabled={reviewing}
            placeholder="Escribe tu respuesta · 输入答案"
            onChange={(e) => onAnswer(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            style={reviewing ? { borderColor: ok ? "var(--ui-ok)" : "var(--ui-bad)" } : undefined}
          />
          {!reviewing && q.pista && <span className="ui-muted" style={{ fontSize: 13 }}>Pista · 提示: {q.pista}</span>}
          {reviewing && !ok && (
            <span style={{ color: "var(--ui-ok)", fontWeight: 800 }}>✓ {q.respuesta}</span>
          )}
          {reviewing && ok && answer && String(answer).trim().toLowerCase() !== String(q.respuesta).trim().toLowerCase() && (
            <span className="ui-chip warn">Revisa tildes o mayúsculas · 注意重音: {q.respuesta}</span>
          )}
        </div>
      ) : (
        <div className="ui-stack" style={{ gap: 10 }}>
          {q.opciones.map((op, i) => {
            let cls = "ui-option";
            if (reviewing) {
              if (i === q.correcta) cls += " is-right";
              else if (Number(answer) === i) cls += " is-wrong";
            } else if (Number(answer) === i && answer !== undefined && answer !== "") cls += " is-picked";
            return (
              <button key={i} type="button" className={cls} disabled={reviewing} onClick={() => onAnswer(i)}>
                <span className="ui-letter">{LETTERS[i]}</span>
                <span>{op}</span>
              </button>
            );
          })}
        </div>
      )}
      {reviewing && q.explicacion && (
        <div className="ui-card" style={{ padding: 14, background: "rgba(61,214,255,0.07)", borderColor: "rgba(61,214,255,0.25)" }}>
          <b style={{ fontSize: 12, letterSpacing: ".1em" }}>EXPLICACIÓN · 解析</b>
          <div style={{ marginTop: 6, lineHeight: 1.6 }}>{q.explicacion}</div>
        </div>
      )}
    </div>
  );
}

/**
 * Ejecuta un examen generado. onFinish(resultado, respuestas) se llama una vez al entregar.
 */
export function ExamRunner({ exam, onFinish, onRestart, compact = false }) {
  const items = React.useMemo(() => [...(exam.lectura?.preguntas || []), ...exam.preguntas], [exam]);
  const lecturaCount = exam.lectura?.preguntas.length || 0;
  const [answers, setAnswers] = React.useState({});
  const [current, setCurrent] = React.useState(0);
  const [result, setResult] = React.useState(null);
  const [left, setLeft] = React.useState(exam.minutos * 60);
  const [showZh, setShowZh] = React.useState(false);
  const finishedRef = React.useRef(false);

  const finish = React.useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const r = scoreExam(exam, answers);
    setResult(r);
    setCurrent(0);
    onFinish?.(r, answers);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [exam, answers, onFinish]);

  React.useEffect(() => {
    if (result) return;
    const t = setInterval(() => setLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [result]);
  React.useEffect(() => {
    if (left <= 0 && !result) finish();
  }, [left, result, finish]);

  const q = items[current];
  const answered = items.filter((it) => answers[it.id] !== undefined && answers[it.id] !== "").length;
  const reviewing = !!result;
  const inReading = exam.lectura && current < lecturaCount;

  return (
    <div className="ui-stack" style={{ gap: 18 }}>
      {result && (
        <div className="ui-card is-hero">
          <div className="ui-between">
            <div>
              <div className="ui-eyebrow">Resultado · 成绩</div>
              <div className="ui-h1" style={{ margin: "8px 0 4px" }}>
                <span className="ui-gradient-text">{result.nota}</span>/100
              </div>
              <div className="ui-row">
                <span className={`ui-chip ${result.apto ? "ok" : "bad"}`}>
                  {result.apto ? "APTO · 通过" : "NO APTO · 未通过"}
                </span>
                <span className="ui-chip">
                  {result.aciertos}/{result.total} aciertos · 正确
                </span>
              </div>
            </div>
            <div className="ui-row no-print">
              <button className="ui-btn" onClick={() => window.print()}>
                <PrinterIcon size={16} /> Imprimir
              </button>
              {onRestart && (
                <button className="ui-btn primary" onClick={onRestart}>
                  <RotateCcwIcon size={16} /> Nuevo examen
                </button>
              )}
            </div>
          </div>
          <div className="ui-grid cols-4" style={{ marginTop: 20 }}>
            {Object.entries(result.porSkill).map(([k, v]) => (
              <div key={k} className="ui-stack" style={{ gap: 6 }}>
                <span style={{ fontWeight: 800, fontSize: 13 }}>
                  {SKILLS[k]?.es} <span className="ui-zh">{SKILLS[k]?.zh}</span>
                </span>
                <div className="ui-progress">
                  <i style={{ width: `${(v.ok / v.total) * 100}%` }} />
                </div>
                <span className="ui-muted" style={{ fontSize: 12 }}>
                  {v.ok}/{v.total}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!result && (
        <div className="ui-card no-print" style={{ padding: 14, position: compact ? "static" : "sticky", top: 76, zIndex: 5, background: "rgba(10,13,30,0.88)" }}>
          <div className="ui-between">
            <div className="ui-row">
              <span className="ui-chip" style={{ color: left < 60 ? "var(--ui-bad)" : undefined }}>
                <ClockIcon size={14} /> {formatTime(Math.max(0, left))}
              </span>
              <span className="ui-chip">
                {answered}/{items.length} respondidas · 已答
              </span>
            </div>
            <button className="ui-btn primary sm" onClick={() => (answered < items.length && !confirm(`Te quedan ${items.length - answered} preguntas sin responder. ¿Entregar igualmente?\n还有未答题目，确定交卷吗？`) ? null : finish())}>
              <FlagIcon size={15} /> Entregar · 交卷
            </button>
          </div>
          <div className="ui-progress" style={{ marginTop: 12 }}>
            <i style={{ width: `${(answered / items.length) * 100}%` }} />
          </div>
        </div>
      )}

      <div className="ui-row no-print" style={{ gap: 6 }}>
        {items.map((it, i) => {
          const a = answers[it.id];
          const has = a !== undefined && a !== "";
          let bg = has ? "rgba(61,214,255,0.18)" : "var(--ui-surface)";
          if (reviewing) bg = isCorrect(it, a) ? "rgba(52,211,153,0.25)" : "rgba(248,113,113,0.22)";
          return (
            <button
              key={it.id}
              onClick={() => setCurrent(i)}
              aria-label={`Pregunta ${i + 1}`}
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                border: i === current ? "2px solid #fff" : "1px solid var(--ui-border)",
                background: bg,
                color: "var(--ui-text)",
                fontWeight: 800,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <div className={inReading ? "ui-grid cols-2" : ""} style={{ alignItems: "start" }}>
        {inReading && (
          <div className="ui-card" style={{ position: compact ? "static" : "sticky", top: 190 }}>
            <div className="ui-between" style={{ marginBottom: 10 }}>
              <div className="ui-row" style={{ gap: 8 }}>
                <BookOpenIcon size={18} />
                <div>
                  <div className="ui-h3">{exam.lectura.titulo}</div>
                  <div className="ui-zh">{exam.lectura.tituloZh}</div>
                </div>
              </div>
              <button className="ui-chip" onClick={() => setShowZh((v) => !v)}>
                {showZh ? "Ocultar 中文" : "Ver 中文"}
              </button>
            </div>
            <div className="ui-reading" style={{ maxHeight: 460, overflow: "auto" }}>
              {showZh ? exam.lectura.textoZh : exam.lectura.texto}
            </div>
          </div>
        )}
        <div className="ui-card">
          {q && (
            <Question
              q={q}
              index={current}
              answer={answers[q.id]}
              reviewing={reviewing}
              onAnswer={(v) => setAnswers((prev) => ({ ...prev, [q.id]: v }))}
            />
          )}
          <div className="ui-between no-print" style={{ marginTop: 20 }}>
            <button className="ui-btn sm" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>
              <ChevronLeftIcon size={16} /> Anterior
            </button>
            {reviewing && q && (
              <span className={`ui-chip ${isCorrect(q, answers[q.id]) ? "ok" : "bad"}`}>
                {isCorrect(q, answers[q.id]) ? <CheckCircle2Icon size={14} /> : <XCircleIcon size={14} />}
                {isCorrect(q, answers[q.id]) ? "Correcta" : "Incorrecta"}
              </span>
            )}
            <button className="ui-btn sm" disabled={current === items.length - 1} onClick={() => setCurrent((c) => c + 1)}>
              Siguiente <ChevronRightIcon size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
