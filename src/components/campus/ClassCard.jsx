import * as React from "react";
import { Link } from "react-router";
import { VideoIcon, CopyIcon, ClockIcon, UsersIcon, PencilIcon, BookMarkedIcon } from "lucide-react";
import { classStatus, fmtShort, fmtTime } from "../../lib/campus.jsx";

export function useNow(intervalMs = 30000) {
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(t);
  }, [intervalMs]);
  return now;
}

function countdown(ms) {
  const min = Math.round(ms / 60000);
  if (min < 60) return `en ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `en ${h} h ${min % 60} min`;
  return `en ${Math.floor(h / 24)} días`;
}

export function ClassCard({ c, data, onEdit, highlight = false }) {
  const now = useNow();
  const status = classStatus(c, now);
  const teacher = data.teachers.find((t) => t.id === c.teacherId);
  const students = c.studentIds.map((id) => data.students.find((s) => s.id === id)?.nombre).filter(Boolean);
  const [copied, setCopied] = React.useState(false);
  const startsIn = new Date(c.inicio).getTime() - now;

  return (
    <div
      className={`ui-card ${highlight ? "is-hero" : ""}`}
      style={{ borderLeft: `4px solid ${teacher?.color || "var(--ui-brand)"}`, display: "flex", flexDirection: "column", gap: 12 }}
    >
      <div className="ui-between" style={{ alignItems: "flex-start" }}>
        <div style={{ minWidth: 0 }}>
          <div className="ui-row" style={{ gap: 8, marginBottom: 6 }}>
            <span className={`ui-chip ${status === "abierta" ? "ok" : status === "terminada" ? "" : "warn"}`}>
              {status === "abierta" ? "● En directo · 进行中" : status === "terminada" ? "Terminada · 已结束" : countdown(startsIn)}
            </span>
            {c.nivel && <span className={`ui-chip lvl-${c.nivel}`}>{c.nivel}</span>}
          </div>
          <div className={highlight ? "ui-h2" : "ui-h3"}>{c.titulo}</div>
          <div className="ui-row ui-muted" style={{ gap: 14, marginTop: 6, fontSize: 13 }}>
            <span className="ui-row" style={{ gap: 5 }}>
              <ClockIcon size={14} /> {fmtShort(c.inicio)} · {fmtTime(c.inicio)} ({c.duracion} min)
            </span>
            {teacher && (
              <span>
                {teacher.avatar} {teacher.nombre}
              </span>
            )}
            {students.length > 0 && (
              <span className="ui-row" style={{ gap: 5 }}>
                <UsersIcon size={14} /> {students.join(", ")}
              </span>
            )}
          </div>
        </div>
        {onEdit && (
          <button className="ui-btn sm ghost" onClick={() => onEdit(c)} aria-label="Editar clase">
            <PencilIcon size={14} />
          </button>
        )}
      </div>
      {c.notas && <div style={{ fontSize: 14, color: "var(--ui-text-2)" }}>📝 {c.notas}</div>}
      <div className="ui-row">
        {c.meetingUrl && status !== "terminada" && (
          <a
            className={`ui-btn ${status === "abierta" ? "ok" : ""} ${highlight ? "lg" : "sm"}`}
            href={c.meetingUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={status !== "abierta"}
          >
            <VideoIcon size={16} /> {status === "abierta" ? "Entrar a Tencent Meeting · 进入腾讯会议" : "Enlace de Tencent Meeting"}
          </a>
        )}
        {c.meetingId && (
          <button
            className="ui-chip"
            onClick={() => {
              navigator.clipboard?.writeText(c.meetingId.replace(/\s/g, ""));
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            title="Copiar ID de reunión"
          >
            <CopyIcon size={12} /> {copied ? "¡Copiado!" : `ID ${c.meetingId}`}
            {c.passcode ? ` · 密码 ${c.passcode}` : ""}
          </button>
        )}
        {c.moduloId && (
          <Link className="ui-chip" to={`/modulos/modulo-${c.moduloId}`}>
            <BookMarkedIcon size={12} /> Preparar: módulo {c.moduloId}
          </Link>
        )}
      </div>
    </div>
  );
}
