import * as React from "react";
import { Link } from "react-router";
import { ClipboardListIcon, PlusIcon, SendIcon, SparklesIcon, TrashIcon, ExternalLinkIcon, CheckCircle2Icon } from "lucide-react";
import { fmtShort, fmtTime } from "../../lib/campus.jsx";
import { generateExam } from "../../lib/examGenerator.js";
import { ExamRunner } from "../exam/ExamRunner.jsx";
import { Modal, HomeworkForm } from "./Forms.jsx";

function dueLabel(iso) {
  const ms = new Date(iso).getTime() - Date.now();
  if (ms < 0) return { text: "Plazo vencido · 已过期", cls: "bad" };
  const days = Math.floor(ms / 86400000);
  if (days === 0) return { text: "Entrega hoy · 今天截止", cls: "warn" };
  return { text: `${days === 1 ? "Falta 1 día" : `Faltan ${days} días`} · 还剩${days}天`, cls: days <= 2 ? "warn" : "" };
}

function SubmitModal({ hw, existing, onSubmit, onClose }) {
  const [texto, setTexto] = React.useState(existing?.texto || "");
  const [enlace, setEnlace] = React.useState(existing?.enlace || "");
  const [exam, setExam] = React.useState(null);
  const words = texto.trim() ? texto.trim().split(/\s+/).length : 0;

  React.useEffect(() => {
    if (hw.examen) generateExam(hw.examen).then(setExam);
  }, [hw]);

  if (hw.examen) {
    return (
      <Modal title={hw.titulo} subtitle="完成考试后成绩自动提交" onClose={onClose}>
        {exam ? (
          <ExamRunner
            exam={exam}
            compact
            onFinish={(r) => onSubmit({ homeworkId: hw.id, nota: r.nota, texto: `Examen automático: ${r.aciertos}/${r.total} (${r.nota}/100)` })}
          />
        ) : (
          <div className="ui-empty">Generando examen…</div>
        )}
      </Modal>
    );
  }
  return (
    <Modal title={hw.titulo} subtitle="提交作业" onClose={onClose}>
      <div className="ui-stack" style={{ gap: 14 }}>
        <div style={{ whiteSpace: "pre-line", color: "var(--ui-text-2)" }}>{hw.descripcion}</div>
        <label className="ui-label">
          Tu respuesta · 你的答案
          <textarea className="ui-textarea" style={{ minHeight: 200 }} value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Escribe aquí… 在这里写…" />
          <span className="ui-muted">{words} palabras</span>
        </label>
        <label className="ui-label">
          Enlace a archivo o audio (opcional) · 文件/音频链接
          <input className="ui-input" type="url" value={enlace} onChange={(e) => setEnlace(e.target.value)} placeholder="https://… (WeChat 微盘, Baidu 网盘, Google Drive)" />
        </label>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            className="ui-btn primary"
            disabled={!texto.trim() && !enlace.trim()}
            onClick={async () => {
              await onSubmit({ homeworkId: hw.id, texto, enlace });
              onClose();
            }}
          >
            <SendIcon size={15} /> {existing ? "Volver a entregar" : "Entregar · 提交"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function GradeRow({ sub, student, onGrade }) {
  const [cal, setCal] = React.useState(sub?.calificacion ?? (sub?.nota != null ? String(sub.nota) : ""));
  const [fb, setFb] = React.useState(sub?.feedback || "");
  const [saved, setSaved] = React.useState(false);
  return (
    <div className="ui-card" style={{ padding: 14, background: "rgba(255,255,255,0.025)" }}>
      <div className="ui-between">
        <b>{student?.nombre || "Alumno"}</b>
        {sub ? (
          <span className="ui-chip ok">
            Entregado {fmtShort(sub.entregado)} {fmtTime(sub.entregado)}
          </span>
        ) : (
          <span className="ui-chip warn">Sin entregar · 未提交</span>
        )}
      </div>
      {sub && (
        <>
          {sub.texto && <div style={{ whiteSpace: "pre-line", marginTop: 10, lineHeight: 1.6 }}>{sub.texto}</div>}
          {sub.enlace && (
            <a href={sub.enlace} target="_blank" rel="noopener noreferrer" className="ui-chip" style={{ marginTop: 8 }}>
              <ExternalLinkIcon size={12} /> Ver archivo
            </a>
          )}
          <div className="ui-grid" style={{ gridTemplateColumns: "120px 1fr auto", marginTop: 12, alignItems: "end" }}>
            <label className="ui-label">
              Nota
              <input className="ui-input" value={cal} onChange={(e) => setCal(e.target.value)} placeholder="8/10" />
            </label>
            <label className="ui-label">
              Comentario · 评语
              <input className="ui-input" value={fb} onChange={(e) => setFb(e.target.value)} placeholder="¡Muy bien! Revisa los acentos…" />
            </label>
            <button
              className="ui-btn ok"
              onClick={async () => {
                await onGrade({ id: sub.id, calificacion: cal, feedback: fb });
                setSaved(true);
                setTimeout(() => setSaved(false), 1500);
              }}
            >
              {saved ? "✓" : "Corregir"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export function HomeworkPanel({ campus, limit }) {
  const { role, data, submitHomework, gradeSubmission, createHomework, deleteHomework } = campus;
  const [submitting, setSubmitting] = React.useState(null);
  const [creating, setCreating] = React.useState(false);
  const [open, setOpen] = React.useState(null);
  const isStaff = role === "admin" || role === "teacher";
  const list = [...data.homework].sort((a, b) => a.fechaEntrega.localeCompare(b.fechaEntrega)).slice(0, limit || undefined);

  return (
    <div className="ui-stack">
      {isStaff && !limit && (
        <div>
          <button className="ui-btn primary" onClick={() => setCreating(true)}>
            <PlusIcon size={16} /> Asignar deberes · 布置作业
          </button>
        </div>
      )}
      {!list.length && <div className="ui-empty">No hay deberes esta semana 🎉 · 本周没有作业</div>}
      {list.map((hw) => {
        const teacher = data.teachers.find((t) => t.id === hw.teacherId);
        const due = dueLabel(hw.fechaEntrega);
        // Para un alumno, el servidor solo devuelve sus propias entregas
        const mySub = role === "student" ? data.submissions.find((s) => s.homeworkId === hw.id) : null;
        const subs = data.submissions.filter((s) => s.homeworkId === hw.id);
        return (
          <div key={hw.id} className="ui-card">
            <div className="ui-between" style={{ alignItems: "flex-start" }}>
              <div className="ui-row" style={{ alignItems: "flex-start", flexWrap: "nowrap", minWidth: 0 }}>
                <span className="ui-icon">{hw.examen ? <SparklesIcon size={20} /> : <ClipboardListIcon size={20} />}</span>
                <div style={{ minWidth: 0 }}>
                  <div className="ui-h3">{hw.titulo}</div>
                  <div className="ui-row ui-muted" style={{ gap: 10, fontSize: 13, marginTop: 4 }}>
                    <span>
                      {teacher?.avatar} {teacher?.nombre}
                    </span>
                    <span>
                      Entrega: {fmtShort(hw.fechaEntrega)} {fmtTime(hw.fechaEntrega)}
                    </span>
                    {hw.moduloId && <Link to={`/modulos/modulo-${hw.moduloId}`} style={{ color: "var(--ui-accent)" }}>Módulo {hw.moduloId}</Link>}
                  </div>
                </div>
              </div>
              <div className="ui-row">
                {role === "student" && mySub?.calificacion && <span className="ui-chip ok">Nota: {mySub.calificacion}</span>}
                {role === "student" && mySub && !mySub.calificacion && <span className="ui-chip ok"><CheckCircle2Icon size={12} /> Entregado</span>}
                {(!mySub || isStaff) && <span className={`ui-chip ${due.cls}`}>{due.text}</span>}
                {isStaff && (
                  <span className="ui-chip">
                    {subs.length}/{hw.studentIds.length} entregas
                  </span>
                )}
              </div>
            </div>
            {!limit && hw.descripcion && <p style={{ color: "var(--ui-text-2)", whiteSpace: "pre-line", lineHeight: 1.6 }}>{hw.descripcion}</p>}
            {role === "student" && mySub?.feedback && (
              <div className="ui-card" style={{ padding: 12, marginTop: 10, background: "rgba(52,211,153,0.08)", borderColor: "rgba(52,211,153,0.3)" }}>
                💬 <b>{teacher?.nombre}:</b> {mySub.feedback}
              </div>
            )}
            <div className="ui-row" style={{ marginTop: 12 }}>
              {hw.enlace && (
                <a className="ui-btn sm" href={hw.enlace} target="_blank" rel="noopener noreferrer">
                  <ExternalLinkIcon size={14} /> Material
                </a>
              )}
              {role === "student" && (
                <button className={`ui-btn sm ${mySub ? "" : "primary"}`} onClick={() => setSubmitting(hw)}>
                  {hw.examen ? <SparklesIcon size={14} /> : <SendIcon size={14} />}
                  {hw.examen ? (mySub ? `Repetir examen (nota ${mySub.nota})` : "Hacer examen · 开始考试") : mySub ? "Editar entrega" : "Entregar · 提交"}
                </button>
              )}
              {isStaff && !limit && (
                <>
                  <button className="ui-btn sm" onClick={() => setOpen(open === hw.id ? null : hw.id)}>
                    {open === hw.id ? "Ocultar entregas" : "Ver y corregir entregas"}
                  </button>
                  <button className="ui-btn sm ghost" onClick={() => confirm("¿Eliminar estos deberes y sus entregas?") && deleteHomework(hw.id)} aria-label="Eliminar">
                    <TrashIcon size={14} />
                  </button>
                </>
              )}
            </div>
            {open === hw.id && (
              <div className="ui-stack" style={{ marginTop: 14 }}>
                {hw.studentIds.map((sid) => (
                  <GradeRow
                    key={sid}
                    sub={subs.find((s) => s.studentId === sid)}
                    student={data.students.find((s) => s.id === sid)}
                    onGrade={gradeSubmission}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
      {submitting && (
        <SubmitModal
          hw={submitting}
          existing={data.submissions.find((s) => s.homeworkId === submitting.id)}
          onSubmit={submitHomework}
          onClose={() => setSubmitting(null)}
        />
      )}
      {creating && <HomeworkForm data={data} role={role} onSave={createHomework} onClose={() => setCreating(false)} />}
    </div>
  );
}
