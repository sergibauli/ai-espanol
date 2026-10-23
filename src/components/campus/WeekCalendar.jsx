import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "lucide-react";
import { startOfWeek, fmtTime, classStatus } from "../../lib/campus.jsx";

const DAYS = [
  ["Lun", "周一"],
  ["Mar", "周二"],
  ["Mié", "周三"],
  ["Jue", "周四"],
  ["Vie", "周五"],
  ["Sáb", "周六"],
  ["Dom", "周日"],
];

export function WeekCalendar({ data, onSelect, onCreate, teacherFilter = "" }) {
  const [weekStart, setWeekStart] = React.useState(() => startOfWeek());
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });
  const end = new Date(weekStart);
  end.setDate(end.getDate() + 7);
  const classes = data.classes
    .filter((c) => {
      const t = new Date(c.inicio);
      return t >= weekStart && t < end && (!teacherFilter || c.teacherId === teacherFilter);
    })
    .sort((a, b) => a.inicio.localeCompare(b.inicio));
  const homeworkDue = data.homework.filter((h) => {
    const t = new Date(h.fechaEntrega);
    return t >= weekStart && t < end;
  });
  const today = new Date().toDateString();
  const move = (n) =>
    setWeekStart((w) => {
      const d = new Date(w);
      d.setDate(d.getDate() + n * 7);
      return d;
    });

  return (
    <div className="ui-card" style={{ padding: 16 }}>
      <div className="ui-between" style={{ marginBottom: 14 }}>
        <div className="ui-row">
          <button className="ui-btn sm" onClick={() => move(-1)} aria-label="Semana anterior">
            <ChevronLeftIcon size={16} />
          </button>
          <button className="ui-btn sm" onClick={() => setWeekStart(startOfWeek())}>
            Hoy · 今天
          </button>
          <button className="ui-btn sm" onClick={() => move(1)} aria-label="Semana siguiente">
            <ChevronRightIcon size={16} />
          </button>
          <b style={{ marginLeft: 6 }}>
            {weekStart.toLocaleDateString("es-ES", { day: "numeric", month: "long" })} –{" "}
            {days[6].toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
          </b>
        </div>
        <span className="ui-muted" style={{ fontSize: 13 }}>
          {classes.length} clases · {homeworkDue.length} entregas
        </span>
      </div>
      <div style={{ overflowX: "auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(130px, 1fr))", gap: 8, minWidth: 920 }}>
          {days.map((d, i) => {
            const key = d.toDateString();
            const dayClasses = classes.filter((c) => new Date(c.inicio).toDateString() === key);
            const dayHw = homeworkDue.filter((h) => new Date(h.fechaEntrega).toDateString() === key);
            const isToday = key === today;
            return (
              <div
                key={key}
                style={{
                  minHeight: 220,
                  borderRadius: 14,
                  padding: 8,
                  background: isToday ? "rgba(255,122,26,0.08)" : "rgba(255,255,255,0.025)",
                  border: `1px solid ${isToday ? "rgba(255,122,26,0.45)" : "var(--ui-border)"}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <div className="ui-between" style={{ padding: "2px 4px 6px" }}>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: 13 }}>
                      {DAYS[i][0]} {d.getDate()}
                    </div>
                    <div className="ui-zh" style={{ fontSize: 11 }}>{DAYS[i][1]}</div>
                  </div>
                  {onCreate && (
                    <button
                      className="ui-btn sm ghost"
                      style={{ minHeight: 26, padding: "0 8px" }}
                      onClick={() => {
                        const s = new Date(d);
                        s.setHours(19, 0, 0, 0);
                        onCreate(s);
                      }}
                      aria-label="Añadir clase"
                    >
                      <PlusIcon size={13} />
                    </button>
                  )}
                </div>
                {dayClasses.map((c) => {
                  const t = data.teachers.find((x) => x.id === c.teacherId);
                  const st = classStatus(c);
                  return (
                    <button
                      key={c.id}
                      onClick={() => onSelect?.(c)}
                      style={{
                        textAlign: "left",
                        border: 0,
                        borderLeft: `3px solid ${t?.color || "#ff7a1a"}`,
                        background: `${t?.color || "#ff7a1a"}1f`,
                        borderRadius: 10,
                        padding: "7px 8px",
                        color: "var(--ui-text)",
                        cursor: "pointer",
                        opacity: st === "terminada" ? 0.55 : 1,
                        fontFamily: "var(--ui-font)",
                      }}
                    >
                      <div style={{ fontSize: 11, fontWeight: 900, color: t?.color }}>
                        {fmtTime(c.inicio)} {st === "abierta" && "· ●"}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.3 }}>{c.titulo}</div>
                      <div className="ui-muted" style={{ fontSize: 11 }}>{t?.nombre}</div>
                    </button>
                  );
                })}
                {dayHw.map((h) => (
                  <div key={h.id} style={{ fontSize: 11, padding: "6px 8px", borderRadius: 10, border: "1px dashed rgba(251,191,36,0.5)", color: "#fde68a" }}>
                    📌 Entrega: {h.titulo}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
