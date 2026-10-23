import * as React from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "lucide-react";
import { Modal } from "./Forms.jsx";
import { fmtShort } from "../../lib/campus.jsx";

const AVATARS = ["👩🏻‍🏫", "👨🏽‍🏫", "👩🏻‍💼", "👨🏻‍💼", "👩🏼‍🎓", "🧑🏻‍🏫"];
const COLORS = ["#ff7a1a", "#3dd6ff", "#ff3d8b", "#34d399", "#c084fc", "#fbbf24"];

function TeacherForm({ initial, onSave, onClose }) {
  const [f, setF] = React.useState({ nombre: "", email: "", tipo: "nativo", ciudad: "", bio: "", bioZh: "", niveles: ["A1", "A2"], avatar: AVATARS[0], color: COLORS[0], precio: 200, ...initial });
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));
  return (
    <Modal title={initial?.id ? "Editar profesor/a" : "Nuevo profesor/a"} subtitle="老师资料" onClose={onClose}>
      <form
        className="ui-stack"
        style={{ gap: 14 }}
        onSubmit={async (e) => {
          e.preventDefault();
          await onSave({ ...f, precio: Number(f.precio) });
          onClose();
        }}
      >
        <div className="ui-grid cols-2">
          <label className="ui-label">
            Nombre
            <input className="ui-input" required value={f.nombre} onChange={set("nombre")} />
          </label>
          <label className="ui-label">
            Email de su cuenta (Clerk)
            <input className="ui-input" type="email" required value={f.email} onChange={set("email")} />
          </label>
        </div>
        <div className="ui-grid cols-3">
          <label className="ui-label">
            Tipo
            <select className="ui-select" value={f.tipo} onChange={set("tipo")}>
              <option value="nativo">Nativo · 西班牙外教</option>
              <option value="chino">Chino · 中文老师</option>
            </select>
          </label>
          <label className="ui-label">
            Ciudad
            <input className="ui-input" value={f.ciudad} onChange={set("ciudad")} />
          </label>
          <label className="ui-label">
            Precio/hora (¥)
            <input className="ui-input" type="number" min="0" value={f.precio} onChange={set("precio")} />
          </label>
        </div>
        <label className="ui-label">
          Presentación (ES)
          <textarea className="ui-textarea" style={{ minHeight: 70 }} value={f.bio} onChange={set("bio")} />
        </label>
        <label className="ui-label">
          Presentación (中文)
          <textarea className="ui-textarea" style={{ minHeight: 70 }} value={f.bioZh} onChange={set("bioZh")} />
        </label>
        <div className="ui-label">
          Niveles
          <div className="ui-row" style={{ gap: 6 }}>
            {["A1", "A2", "B1", "B2", "C1"].map((l) => (
              <button type="button" key={l} className={`ui-chip ${f.niveles.includes(l) ? "is-on" : ""}`} onClick={() => setF((x) => ({ ...x, niveles: x.niveles.includes(l) ? x.niveles.filter((n) => n !== l) : [...x.niveles, l] }))}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <div className="ui-row">
          {AVATARS.map((a) => (
            <button type="button" key={a} className={`ui-chip ${f.avatar === a ? "is-on" : ""}`} style={{ fontSize: 20 }} onClick={() => setF((x) => ({ ...x, avatar: a }))}>
              {a}
            </button>
          ))}
          {COLORS.map((c) => (
            <button type="button" key={c} aria-label={c} onClick={() => setF((x) => ({ ...x, color: c }))} style={{ width: 26, height: 26, borderRadius: 99, background: c, border: f.color === c ? "3px solid #fff" : "0", cursor: "pointer" }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="ui-btn primary">Guardar</button>
        </div>
      </form>
    </Modal>
  );
}

function StudentForm({ initial, teachers, onSave, onClose }) {
  const [f, setF] = React.useState({ nombre: "", email: "", nivel: "A1", teacherIds: [], plan: "Pack 10 clases", clasesRestantes: 10, wechat: "", ...initial });
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));
  return (
    <Modal title={initial?.id ? "Editar alumno/a" : "Nuevo alumno/a"} subtitle="学生资料" onClose={onClose}>
      <form
        className="ui-stack"
        style={{ gap: 14 }}
        onSubmit={async (e) => {
          e.preventDefault();
          await onSave({ ...f, clasesRestantes: Number(f.clasesRestantes) });
          onClose();
        }}
      >
        <div className="ui-grid cols-2">
          <label className="ui-label">
            Nombre
            <input className="ui-input" required value={f.nombre} onChange={set("nombre")} />
          </label>
          <label className="ui-label">
            Email de su cuenta (Clerk)
            <input className="ui-input" type="email" required value={f.email} onChange={set("email")} />
          </label>
        </div>
        <div className="ui-grid cols-3">
          <label className="ui-label">
            Nivel
            <select className="ui-select" value={f.nivel} onChange={set("nivel")}>
              {["A1", "A2", "B1", "B2", "C1"].map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </label>
          <label className="ui-label">
            Plan
            <input className="ui-input" value={f.plan} onChange={set("plan")} />
          </label>
          <label className="ui-label">
            Clases restantes
            <input className="ui-input" type="number" min="0" value={f.clasesRestantes} onChange={set("clasesRestantes")} />
          </label>
        </div>
        <label className="ui-label">
          WeChat
          <input className="ui-input" value={f.wechat} onChange={set("wechat")} />
        </label>
        <div className="ui-label">
          Profesores asignados
          <div className="ui-row" style={{ gap: 6 }}>
            {teachers.map((t) => {
              const on = f.teacherIds.includes(t.id);
              return (
                <button type="button" key={t.id} className={`ui-chip ${on ? "is-on" : ""}`} onClick={() => setF((x) => ({ ...x, teacherIds: on ? x.teacherIds.filter((i) => i !== t.id) : [...x.teacherIds, t.id] }))}>
                  {t.avatar} {t.nombre}
                </button>
              );
            })}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="ui-btn primary">Guardar</button>
        </div>
      </form>
    </Modal>
  );
}

export function PeoplePanel({ campus }) {
  const { role, data, saveTeacher, deleteTeacher, saveStudent, deleteStudent } = campus;
  const [editT, setEditT] = React.useState(null);
  const [editS, setEditS] = React.useState(null);
  const isAdmin = role === "admin";
  return (
    <div className="ui-stack" style={{ gap: 26 }}>
      {isAdmin && (
        <div>
          <div className="ui-between" style={{ marginBottom: 12 }}>
            <h3 className="ui-h2">Profesores · 老师 ({data.teachers.length})</h3>
            <button className="ui-btn primary sm" onClick={() => setEditT({})}>
              <PlusIcon size={15} /> Añadir
            </button>
          </div>
          <div className="ui-grid auto">
            {data.teachers.map((t) => {
              const n = data.classes.filter((c) => c.teacherId === t.id && new Date(c.inicio) > new Date()).length;
              return (
                <div key={t.id} className="ui-card" style={{ borderTop: `3px solid ${t.color}` }}>
                  <div className="ui-between">
                    <span style={{ fontSize: 30 }}>{t.avatar}</span>
                    <div className="ui-row" style={{ gap: 4 }}>
                      <button className="ui-btn sm ghost" onClick={() => setEditT(t)} aria-label="Editar">
                        <PencilIcon size={14} />
                      </button>
                      <button className="ui-btn sm ghost" onClick={() => confirm(`¿Eliminar a ${t.nombre}?`) && deleteTeacher(t.id)} aria-label="Eliminar">
                        <TrashIcon size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="ui-h3" style={{ marginTop: 8 }}>{t.nombre}</div>
                  <div className="ui-muted" style={{ fontSize: 13 }}>{t.email}</div>
                  <div className="ui-row" style={{ marginTop: 10, gap: 6 }}>
                    <span className="ui-chip">{t.tipo === "nativo" ? "🇪🇸 Nativo" : "🇨🇳 Chino"}</span>
                    <span className="ui-chip">{n} clases próximas</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div>
        <div className="ui-between" style={{ marginBottom: 12 }}>
          <h3 className="ui-h2">{isAdmin ? "Alumnos" : "Mis alumnos"} · 学生 ({data.students.length})</h3>
          {isAdmin && (
            <button className="ui-btn primary sm" onClick={() => setEditS({})}>
              <PlusIcon size={15} /> Añadir
            </button>
          )}
        </div>
        <div className="ui-card ui-table-wrap" style={{ padding: 6 }}>
          <table className="ui-table">
            <thead>
              <tr>
                <th>Alumno</th>
                <th>Nivel</th>
                <th>Plan</th>
                <th>Profesores</th>
                <th>Próx. clase</th>
                {isAdmin && <th />}
              </tr>
            </thead>
            <tbody>
              {data.students.map((s) => {
                const next = data.classes.filter((c) => c.studentIds.includes(s.id) && new Date(c.inicio) > new Date()).sort((a, b) => a.inicio.localeCompare(b.inicio))[0];
                return (
                  <tr key={s.id}>
                    <td>
                      <b>{s.nombre}</b>
                      <div className="ui-muted" style={{ fontSize: 12 }}>{s.email}{s.wechat ? ` · WeChat ${s.wechat}` : ""}</div>
                    </td>
                    <td>
                      <span className={`ui-chip lvl-${s.nivel}`}>{s.nivel}</span>
                    </td>
                    <td>
                      {s.plan}
                      <div className="ui-muted" style={{ fontSize: 12 }}>{s.clasesRestantes ?? "–"} clases restantes</div>
                    </td>
                    <td style={{ fontSize: 13 }}>{(s.teacherIds || []).map((id) => data.teachers.find((t) => t.id === id)?.nombre).filter(Boolean).join(", ")}</td>
                    <td style={{ fontSize: 13 }}>{next ? fmtShort(next.inicio) : "–"}</td>
                    {isAdmin && (
                      <td>
                        <div className="ui-row" style={{ gap: 4, flexWrap: "nowrap" }}>
                          <button className="ui-btn sm ghost" onClick={() => setEditS(s)} aria-label="Editar">
                            <PencilIcon size={14} />
                          </button>
                          <button className="ui-btn sm ghost" onClick={() => confirm(`¿Eliminar a ${s.nombre}?`) && deleteStudent(s.id)} aria-label="Eliminar">
                            <TrashIcon size={14} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {editT && <TeacherForm initial={editT} onSave={saveTeacher} onClose={() => setEditT(null)} />}
      {editS && <StudentForm initial={editS} teachers={data.teachers} onSave={saveStudent} onClose={() => setEditS(null)} />}
    </div>
  );
}

const LEAD_STATES = [
  ["nuevo", "Nuevo"],
  ["contactado", "Contactado"],
  ["prueba", "Clase de prueba"],
  ["cliente", "Cliente ✓"],
  ["descartado", "Descartado"],
];

export function LeadsPanel({ campus }) {
  const { data, updateLead } = campus;
  const leads = [...data.leads].sort((a, b) => (b.creado || "").localeCompare(a.creado || ""));
  return (
    <div className="ui-stack">
      <p className="ui-muted">Solicitudes de clase de prueba enviadas desde la página de profesores. 试听课申请。</p>
      {!leads.length && <div className="ui-empty">Todavía no hay solicitudes.</div>}
      {leads.map((l) => (
        <div key={l.id} className="ui-card">
          <div className="ui-between">
            <div>
              <div className="ui-h3">{l.nombre}</div>
              <div className="ui-muted" style={{ fontSize: 13 }}>
                {l.contacto} · {l.creado ? fmtShort(l.creado) : ""}
              </div>
            </div>
            <select className="ui-select" style={{ width: 180 }} value={l.estado || "nuevo"} onChange={(e) => updateLead({ id: l.id, estado: e.target.value })}>
              {LEAD_STATES.map(([v, t]) => (
                <option key={v} value={v}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="ui-row" style={{ marginTop: 10, gap: 6 }}>
            {l.tipo && <span className="ui-chip">{l.tipo === "nativo" ? "🇪🇸 Profesor nativo" : l.tipo === "chino" ? "🇨🇳 Profesor chino" : "Combinado"}</span>}
            {l.pack && <span className="ui-chip">{l.pack}</span>}
            {l.nivel && <span className={`ui-chip lvl-${l.nivel}`}>{l.nivel}</span>}
          </div>
          {l.mensaje && <p style={{ color: "var(--ui-text-2)" }}>{l.mensaje}</p>}
        </div>
      ))}
    </div>
  );
}
