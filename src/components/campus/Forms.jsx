import * as React from "react";
import { XIcon, TrashIcon } from "lucide-react";

export function Modal({ title, subtitle, onClose, children }) {
  React.useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="ui-modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="ui-modal" role="dialog" aria-modal="true" aria-label={title}>
        <div className="ui-between" style={{ marginBottom: 16, alignItems: "flex-start" }}>
          <div>
            <div className="ui-h2">{title}</div>
            {subtitle && <div className="ui-zh">{subtitle}</div>}
          </div>
          <button className="ui-btn sm ghost" onClick={onClose} aria-label="Cerrar">
            <XIcon size={16} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

const toLocalInput = (iso) => {
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

function StudentPicker({ students, value, onChange }) {
  return (
    <div className="ui-row" style={{ gap: 6 }}>
      {students.map((s) => {
        const on = value.includes(s.id);
        return (
          <button type="button" key={s.id} className={`ui-chip ${on ? "is-on" : ""}`} onClick={() => onChange(on ? value.filter((x) => x !== s.id) : [...value, s.id])}>
            {on ? "✓ " : ""}
            {s.nombre}
          </button>
        );
      })}
      {!students.length && <span className="ui-muted">No hay alumnos todavía.</span>}
    </div>
  );
}

export function ClassForm({ initial, data, role, onSave, onDelete, onClose }) {
  const [f, setF] = React.useState(() => ({
    titulo: "",
    teacherId: role === "teacher" ? undefined : data.teachers[0]?.id,
    studentIds: [],
    duracion: 60,
    meetingUrl: "",
    meetingId: "",
    passcode: "",
    nivel: "A1",
    notas: "",
    moduloId: "",
    repetirSemanas: 1,
    ...initial,
    inicio: toLocalInput(initial?.inicio || new Date(Date.now() + 86400000).toISOString()),
  }));
  const [saving, setSaving] = React.useState(false);
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));
  const editing = !!initial?.id;

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onSave({
      ...f,
      inicio: new Date(f.inicio).toISOString(),
      duracion: Number(f.duracion),
      moduloId: f.moduloId ? Number(f.moduloId) : null,
      repetirSemanas: Number(f.repetirSemanas),
    });
    setSaving(false);
    onClose();
  };

  return (
    <Modal title={editing ? "Editar clase" : "Nueva clase"} subtitle={editing ? "编辑课程" : "新建课程"} onClose={onClose}>
      <form onSubmit={submit} className="ui-stack" style={{ gap: 14 }}>
        <label className="ui-label">
          Título · 标题
          <input className="ui-input" required value={f.titulo} onChange={set("titulo")} placeholder="Conversación A2 · De compras" />
        </label>
        <div className="ui-grid cols-2">
          <label className="ui-label">
            Fecha y hora · 时间
            <input className="ui-input" type="datetime-local" required value={f.inicio} onChange={set("inicio")} />
          </label>
          <label className="ui-label">
            Duración (min) · 时长
            <select className="ui-select" value={f.duracion} onChange={set("duracion")}>
              {[30, 45, 50, 60, 90, 120].map((m) => (
                <option key={m} value={m}>
                  {m} min
                </option>
              ))}
            </select>
          </label>
        </div>
        {role === "admin" && (
          <label className="ui-label">
            Profesor/a · 老师
            <select className="ui-select" value={f.teacherId} onChange={set("teacherId")}>
              {data.teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nombre} ({t.tipo === "nativo" ? "nativo" : "chino"})
                </option>
              ))}
            </select>
          </label>
        )}
        <div className="ui-label">
          Alumnos · 学生
          <StudentPicker students={data.students} value={f.studentIds} onChange={(v) => setF((x) => ({ ...x, studentIds: v }))} />
        </div>
        <label className="ui-label">
          Enlace de Tencent Meeting · 腾讯会议链接
          <input className="ui-input" type="url" value={f.meetingUrl} onChange={set("meetingUrl")} placeholder="https://meeting.tencent.com/dm/…" />
        </label>
        <div className="ui-grid cols-2">
          <label className="ui-label">
            ID de reunión · 会议号
            <input className="ui-input" value={f.meetingId} onChange={set("meetingId")} placeholder="123 456 789" />
          </label>
          <label className="ui-label">
            Contraseña · 密码
            <input className="ui-input" value={f.passcode} onChange={set("passcode")} />
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
            Módulo (opcional)
            <input className="ui-input" type="number" min="1" max="80" value={f.moduloId ?? ""} onChange={set("moduloId")} />
          </label>
          {!editing && (
            <label className="ui-label">
              Repetir · 每周重复
              <select className="ui-select" value={f.repetirSemanas} onChange={set("repetirSemanas")}>
                {[1, 2, 4, 8, 12].map((n) => (
                  <option key={n} value={n}>
                    {n === 1 ? "Solo una vez" : `${n} semanas`}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
        <label className="ui-label">
          Notas para el alumno · 备注
          <textarea className="ui-textarea" style={{ minHeight: 70 }} value={f.notas} onChange={set("notas")} />
        </label>
        <div className="ui-between">
          {editing && onDelete ? (
            <button
              type="button"
              className="ui-btn danger sm"
              onClick={async () => {
                if (confirm("¿Eliminar esta clase?")) {
                  await onDelete(initial.id);
                  onClose();
                }
              }}
            >
              <TrashIcon size={14} /> Eliminar
            </button>
          ) : (
            <span />
          )}
          <button className="ui-btn primary" disabled={saving || (role === "admin" && !f.teacherId)}>
            {saving ? "Guardando…" : "Guardar · 保存"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export function HomeworkForm({ initial, data, role, onSave, onClose }) {
  const [f, setF] = React.useState(() => ({
    titulo: "",
    descripcion: "",
    teacherId: role === "teacher" ? undefined : data.teachers[0]?.id,
    studentIds: data.students.map((s) => s.id),
    fechaEntrega: toLocalInput(new Date(Date.now() + 6 * 86400000).toISOString()),
    moduloId: "",
    enlace: "",
    examModulos: "",
    ...initial,
  }));
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    const mods = String(f.examModulos || "")
      .split(/[^0-9]+/)
      .map(Number)
      .filter((n) => n >= 1 && n <= 80);
    const { examModulos, ...rest } = f;
    await onSave({
      ...rest,
      fechaEntrega: new Date(f.fechaEntrega).toISOString(),
      moduloId: f.moduloId ? Number(f.moduloId) : null,
      examen: mods.length ? { modulos: mods, total: 20, minutos: 25, conLectura: true, skills: ["vocabulario", "gramatica", "uso", "comprension"], seed: Math.floor(Math.random() * 1e9) } : f.examen || null,
    });
    onClose();
  };
  return (
    <Modal title="Nuevos deberes" subtitle="布置作业" onClose={onClose}>
      <form onSubmit={submit} className="ui-stack" style={{ gap: 14 }}>
        <label className="ui-label">
          Título · 标题
          <input className="ui-input" required value={f.titulo} onChange={set("titulo")} placeholder="Redacción: mi fin de semana" />
        </label>
        <label className="ui-label">
          Instrucciones · 说明
          <textarea className="ui-textarea" value={f.descripcion} onChange={set("descripcion")} />
        </label>
        {role === "admin" && (
          <label className="ui-label">
            Profesor/a
            <select className="ui-select" value={f.teacherId} onChange={set("teacherId")}>
              {data.teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nombre}
                </option>
              ))}
            </select>
          </label>
        )}
        <div className="ui-label">
          Para · 学生
          <StudentPicker students={data.students} value={f.studentIds} onChange={(v) => setF((x) => ({ ...x, studentIds: v }))} />
        </div>
        <div className="ui-grid cols-2">
          <label className="ui-label">
            Fecha de entrega · 截止
            <input className="ui-input" type="datetime-local" required value={f.fechaEntrega} onChange={set("fechaEntrega")} />
          </label>
          <label className="ui-label">
            Módulo de referencia
            <input className="ui-input" type="number" min="1" max="80" value={f.moduloId ?? ""} onChange={set("moduloId")} />
          </label>
        </div>
        <label className="ui-label">
          Examen automático (módulos, opcional) · 自动考试
          <input className="ui-input" value={f.examModulos} onChange={set("examModulos")} placeholder="Ej.: 9, 10, 11" />
          <span className="ui-muted" style={{ fontWeight: 600 }}>
            Si lo rellenas, el alumno hace un examen generado y la nota se entrega automáticamente.
          </span>
        </label>
        <label className="ui-label">
          Enlace de material (opcional)
          <input className="ui-input" type="url" value={f.enlace} onChange={set("enlace")} placeholder="https://…" />
        </label>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="ui-btn primary" disabled={!f.studentIds.length}>
            Asignar · 布置
          </button>
        </div>
      </form>
    </Modal>
  );
}
