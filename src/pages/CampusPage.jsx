import * as React from "react";
import { useSearchParams, Link } from "react-router";
import { CalendarDaysIcon, ClipboardListIcon, UsersIcon, InboxIcon, PlusIcon, VideoIcon, SparklesIcon, InfoIcon, RotateCcwIcon } from "lucide-react";
import { StarfieldBackground } from "../components/fx/StarfieldBackground.jsx";
import { useCampus, ROLES, classStatus } from "../lib/campus.jsx";
import { useAppAuth } from "../lib/auth.jsx";
import { ClassCard } from "../components/campus/ClassCard.jsx";
import { WeekCalendar } from "../components/campus/WeekCalendar.jsx";
import { ClassForm } from "../components/campus/Forms.jsx";
import { HomeworkPanel } from "../components/campus/HomeworkPanel.jsx";
import { PeoplePanel, LeadsPanel } from "../components/campus/AdminPanel.jsx";

const TABS = [
  { key: "inicio", es: "Mi semana", zh: "本周", icon: VideoIcon },
  { key: "calendario", es: "Calendario", zh: "日历", icon: CalendarDaysIcon },
  { key: "deberes", es: "Deberes", zh: "作业", icon: ClipboardListIcon },
  { key: "personas", es: "Alumnos", zh: "学生", icon: UsersIcon, staff: true },
  { key: "solicitudes", es: "Solicitudes", zh: "咨询", icon: InboxIcon, admin: true },
];

export default function CampusPage() {
  const campus = useCampus();
  const { user } = useAppAuth();
  const { role, data, loading, error, isDemo, canSwitchRole, demoRole, setDemoRole, saveClass, deleteClass, resetDemo } = campus;
  const [params, setParams] = useSearchParams();
  const tab = params.get("tab") || "inicio";
  const setTab = (t) => setParams({ tab: t });
  const [editing, setEditing] = React.useState(null);
  const [teacherFilter, setTeacherFilter] = React.useState("");
  const isStaff = role === "admin" || role === "teacher";

  const now = Date.now();
  const upcoming = data.classes
    .filter((c) => classStatus(c, now) !== "terminada")
    .sort((a, b) => a.inicio.localeCompare(b.inicio));
  const next = upcoming[0];
  const weekEnd = now + 7 * 86400000;
  const thisWeek = upcoming.filter((c) => new Date(c.inicio).getTime() < weekEnd);
  const pendingHw =
    role === "student"
      ? data.homework.filter((h) => !data.submissions.some((s) => s.homeworkId === h.id))
      : data.submissions.filter((s) => !s.calificacion);
  const me = role === "teacher" ? data.teachers.find((t) => t.id === campus.profileId) : role === "student" ? data.students.find((s) => s.id === campus.profileId) : null;

  const tabs = TABS.filter((t) => (!t.staff || isStaff) && (!t.admin || role === "admin"));

  return (
    <StarfieldBackground>
      <div className="ui-page">
        {isDemo && (
          <div className="ui-banner" style={{ marginBottom: 18 }}>
            <InfoIcon size={18} style={{ flexShrink: 0, marginTop: 1 }} />
            <div style={{ flex: 1 }}>
              <b>Modo demostración.</b> Los datos se guardan solo en este navegador. Al activar el servidor del campus (ver README), cada
              alumno verá sus clases desde su cuenta, cada profesor las suyas y la administración todo.
              {canSwitchRole && (
                <div className="ui-row" style={{ marginTop: 8, gap: 6 }}>
                  <span>Ver como:</span>
                  {Object.entries(ROLES).map(([k, r]) => (
                    <button key={k} className={`ui-chip ${demoRole === k ? "is-on" : ""}`} onClick={() => setDemoRole(k)}>
                      {r.es} · {r.zh}
                    </button>
                  ))}
                  <button className="ui-chip" onClick={() => confirm("¿Restaurar los datos de ejemplo?") && resetDemo()}>
                    <RotateCcwIcon size={12} /> Restaurar demo
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="ui-between" style={{ alignItems: "flex-end" }}>
          <div>
            <div className="ui-eyebrow">
              Campus en directo · 在线课堂 {role && <span className="ui-chip" style={{ marginLeft: 6 }}>{ROLES[role]?.es} · {ROLES[role]?.zh}</span>}
            </div>
            <h1 className="ui-h1">
              Hola, <span className="ui-gradient-text">{me?.nombre?.split(" ")[0] || user?.name || "bienvenido/a"}</span>
            </h1>
            <p className="ui-lead" style={{ margin: 0 }}>
              {role === "admin" && "Toda la academia: clases, profesores, alumnos, deberes y nuevas solicitudes."}
              {role === "teacher" && "Tus clases, tus alumnos y los deberes que tienes que corregir."}
              {role === "student" && "Tus clases en Tencent Meeting y tus deberes de la semana. 你的课程和本周作业。"}
            </p>
          </div>
          {isStaff && (
            <button className="ui-btn primary" onClick={() => setEditing({})}>
              <PlusIcon size={16} /> Programar clase
            </button>
          )}
        </div>

        <div className="ui-grid cols-4 ui-section" style={{ marginTop: 22 }}>
          <div className="ui-card ui-stat">
            <b>{thisWeek.length}</b>
            <span>Clases esta semana · 本周课程</span>
          </div>
          <div className="ui-card ui-stat">
            <b>{pendingHw.length}</b>
            <span>{role === "student" ? "Deberes pendientes · 待交作业" : "Entregas por corregir · 待批改"}</span>
          </div>
          {role === "student" ? (
            <div className="ui-card ui-stat">
              <b>{me?.clasesRestantes ?? "–"}</b>
              <span>Clases restantes · {me?.plan || "plan"}</span>
            </div>
          ) : (
            <div className="ui-card ui-stat">
              <b>{data.students.length}</b>
              <span>Alumnos · 学生</span>
            </div>
          )}
          {role === "admin" ? (
            <div className="ui-card ui-stat">
              <b>{data.leads.filter((l) => (l.estado || "nuevo") === "nuevo").length}</b>
              <span>Solicitudes nuevas · 新咨询</span>
            </div>
          ) : (
            <Link to="/examenes/generador" className="ui-card is-link ui-stat">
              <b>
                <SparklesIcon size={24} />
              </b>
              <span>Generar examen · 生成考试</span>
            </Link>
          )}
        </div>

        <div className="ui-section">
          <div className="ui-tabs" role="tablist">
            {tabs.map((t) => (
              <button key={t.key} role="tab" aria-selected={tab === t.key} className={tab === t.key ? "is-on" : ""} onClick={() => setTab(t.key)}>
                {t.key === "personas" && role === "admin" ? "Profesores y alumnos" : t.es} · {t.zh}
              </button>
            ))}
          </div>
        </div>

        {error && <div className="ui-banner" style={{ marginTop: 16 }}>No se pudo cargar el campus: {error}</div>}
        {loading && !data.classes.length ? (
          <div className="ui-empty ui-section">Cargando…</div>
        ) : (
          <div className="ui-section" style={{ marginTop: 20 }}>
            {tab === "inicio" && (
              <div className="ui-stack" style={{ gap: 22 }}>
                {next ? (
                  <ClassCard c={next} data={data} highlight onEdit={isStaff ? setEditing : null} />
                ) : (
                  <div className="ui-empty">
                    No tienes clases programadas. {role === "student" && <Link to="/profesores" style={{ color: "var(--ui-accent)" }}>Reserva una clase con un profesor →</Link>}
                  </div>
                )}
                {thisWeek.length > 1 && (
                  <div>
                    <h2 className="ui-h2" style={{ marginBottom: 12 }}>Próximas clases · 接下来的课</h2>
                    <div className="ui-grid cols-2">
                      {thisWeek.slice(1).map((c) => (
                        <ClassCard key={c.id} c={c} data={data} onEdit={isStaff ? setEditing : null} />
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <div className="ui-between" style={{ marginBottom: 12 }}>
                    <h2 className="ui-h2">Deberes · 作业</h2>
                    <button className="ui-btn sm" onClick={() => setTab("deberes")}>
                      Ver todos
                    </button>
                  </div>
                  <HomeworkPanel campus={campus} limit={3} />
                </div>
              </div>
            )}
            {tab === "calendario" && (
              <div className="ui-stack">
                {role === "admin" && (
                  <div className="ui-row">
                    <span className="ui-muted">Profesor:</span>
                    <button className={`ui-chip ${!teacherFilter ? "is-on" : ""}`} onClick={() => setTeacherFilter("")}>
                      Todos
                    </button>
                    {data.teachers.map((t) => (
                      <button key={t.id} className={`ui-chip ${teacherFilter === t.id ? "is-on" : ""}`} onClick={() => setTeacherFilter(t.id)}>
                        <span style={{ width: 8, height: 8, borderRadius: 9, background: t.color, display: "inline-block" }} /> {t.nombre}
                      </button>
                    ))}
                  </div>
                )}
                <WeekCalendar
                  data={data}
                  teacherFilter={teacherFilter}
                  onSelect={(c) => (isStaff ? setEditing(c) : setEditing({ ...c, _view: true }))}
                  onCreate={isStaff ? (d) => setEditing({ inicio: d.toISOString() }) : null}
                />
              </div>
            )}
            {tab === "deberes" && <HomeworkPanel campus={campus} />}
            {tab === "personas" && isStaff && <PeoplePanel campus={campus} />}
            {tab === "solicitudes" && role === "admin" && <LeadsPanel campus={campus} />}
          </div>
        )}

        {editing && !editing._view && (
          <ClassForm initial={editing} data={data} role={role} onSave={saveClass} onDelete={deleteClass} onClose={() => setEditing(null)} />
        )}
        {editing?._view && (
          <div className="ui-modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setEditing(null)}>
            <div className="ui-modal">
              <ClassCard c={editing} data={data} highlight />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
                <button className="ui-btn" onClick={() => setEditing(null)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </StarfieldBackground>
  );
}
