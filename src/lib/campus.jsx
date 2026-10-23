// Campus: clases en directo (Tencent Meeting), calendario, deberes y entregas.
// Con VITE_API_URL usa el Worker (worker/src/campus.js), que valida el token de Clerk y filtra por rol.
// Sin backend funciona en "modo demo": los datos viven en este navegador y se puede cambiar de rol para probar.
import * as React from "react";
import { useAppAuth } from "./auth.jsx";

export const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
export const IS_DEMO = !API_URL;

const DEMO_KEY = "ai-espanol:campus-demo-v1";
const DEMO_ROLE_KEY = "ai-espanol:campus-demo-role";

export const ROLES = {
  admin: { es: "Administración", zh: "管理员" },
  teacher: { es: "Profesor/a", zh: "老师" },
  student: { es: "Estudiante", zh: "学生" },
};

const uid = (p) => `${p}_${Math.random().toString(36).slice(2, 9)}${Date.now().toString(36).slice(-3)}`;

function nextWeekday(dayOffset, hour, minute = 0) {
  const d = new Date();
  const monday = new Date(d);
  monday.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  monday.setHours(hour, minute, 0, 0);
  monday.setDate(monday.getDate() + dayOffset);
  return monday.toISOString();
}

function seedDemo() {
  const teachers = [
    { id: "t_lucia", nombre: "Lucía Martín", tipo: "nativo", email: "lucia@demo.es", ciudad: "Madrid", bio: "Profesora de ELE especializada en preparación DELE para estudiantes chinos.", bioZh: "西班牙语外教，专注中国学生DELE备考。", niveles: ["A1", "A2", "B1", "B2"], avatar: "👩🏻‍🏫", color: "#ff7a1a", precio: 220 },
    { id: "t_carlos", nombre: "Carlos Ruiz", tipo: "nativo", email: "carlos@demo.es", ciudad: "Barcelona", bio: "Especialista en conversación y pronunciación. Clases dinámicas y prácticas.", bioZh: "口语与发音专家，课堂生动实用。", niveles: ["A2", "B1", "B2"], avatar: "👨🏽‍🏫", color: "#3dd6ff", precio: 210 },
    { id: "t_wang", nombre: "王老师 Wang Fang", tipo: "chino", email: "wang@demo.cn", ciudad: "上海", bio: "Profesora china con máster en Salamanca. Explica la gramática en chino paso a paso.", bioZh: "萨拉曼卡大学硕士，用中文一步步讲解语法。", niveles: ["A1", "A2", "B1"], avatar: "👩🏻‍💼", color: "#ff3d8b", precio: 150 },
    { id: "t_li", nombre: "李老师 Li Wei", tipo: "chino", email: "li@demo.cn", ciudad: "北京", bio: "Preparación intensiva DELE y SIELE con simulacros corregidos.", bioZh: "DELE/SIELE 强化备考，模拟考试逐题批改。", niveles: ["A2", "B1", "B2"], avatar: "👨🏻‍💼", color: "#34d399", precio: 160 },
  ];
  const students = [
    { id: "s_mei", nombre: "Chen Mei 陈梅", email: "mei@demo.cn", nivel: "A2", teacherIds: ["t_lucia", "t_wang"], plan: "Pack 10 clases", clasesRestantes: 7 },
    { id: "s_hao", nombre: "Zhang Hao 张浩", email: "hao@demo.cn", nivel: "B1", teacherIds: ["t_carlos", "t_li"], plan: "Mensual intensivo", clasesRestantes: 5 },
    { id: "s_yu", nombre: "Liu Yu 刘雨", email: "yu@demo.cn", nivel: "A1", teacherIds: ["t_wang"], plan: "Pack 5 clases", clasesRestantes: 3 },
  ];
  const meet = (n) => `https://meeting.tencent.com/dm/demo${n}`;
  const classes = [
    { id: uid("c"), titulo: "Conversación A2 · Rutina diaria", teacherId: "t_lucia", studentIds: ["s_mei"], inicio: nextWeekday(0, 19), duracion: 60, meetingUrl: meet(1), meetingId: "123 456 789", passcode: "2026", nivel: "A2", moduloId: 28, notas: "Traer 5 frases sobre tu rutina." },
    { id: uid("c"), titulo: "Gramática en chino · Ser y estar", teacherId: "t_wang", studentIds: ["s_mei", "s_yu"], inicio: nextWeekday(1, 20), duracion: 50, meetingUrl: meet(2), meetingId: "234 567 891", passcode: "", nivel: "A1", moduloId: 75 },
    { id: uid("c"), titulo: "DELE B1 · Expresión escrita", teacherId: "t_li", studentIds: ["s_hao"], inicio: nextWeekday(2, 18, 30), duracion: 90, meetingUrl: meet(3), meetingId: "345 678 912", passcode: "dele", nivel: "B1", moduloId: 80 },
    { id: uid("c"), titulo: "Pronunciación: r / rr / l", teacherId: "t_carlos", studentIds: ["s_hao"], inicio: nextWeekday(3, 19), duracion: 45, meetingUrl: meet(4), meetingId: "456 789 123", passcode: "", nivel: "B1" },
    { id: uid("c"), titulo: "Conversación A2 · De compras", teacherId: "t_lucia", studentIds: ["s_mei"], inicio: nextWeekday(4, 19), duracion: 60, meetingUrl: meet(5), meetingId: "567 891 234", passcode: "", nivel: "A2", moduloId: 55 },
    { id: uid("c"), titulo: "Repaso semanal A1", teacherId: "t_wang", studentIds: ["s_yu"], inicio: nextWeekday(5, 10), duracion: 50, meetingUrl: meet(6), meetingId: "678 912 345", passcode: "", nivel: "A1", moduloId: 9 },
  ];
  const due = (d) => nextWeekday(d, 23, 59);
  const homework = [
    { id: "h1", titulo: "Escribe tu rutina (80 palabras)", descripcion: "Usa al menos 5 verbos reflexivos (levantarse, ducharse…). 用至少5个反身动词写你的日常。", teacherId: "t_lucia", studentIds: ["s_mei"], fechaEntrega: due(3), moduloId: 28, creado: new Date().toISOString() },
    { id: "h2", titulo: "Examen automático módulos 9–12", descripcion: "Examen de 20 preguntas. La nota se entrega sola al terminar.", teacherId: "t_wang", studentIds: ["s_yu", "s_mei"], fechaEntrega: due(5), examen: { modulos: [9, 10, 11, 12], total: 20, minutos: 25, conLectura: true, skills: ["vocabulario", "gramatica", "uso", "comprension"], seed: 4242 }, creado: new Date().toISOString() },
    { id: "h3", titulo: "Carta formal: solicitud de beca", descripcion: "Modelo tarea 1 DELE B1 (100–120 palabras). 写一封申请奖学金的正式信。", teacherId: "t_li", studentIds: ["s_hao"], fechaEntrega: due(6), moduloId: 62, creado: new Date().toISOString() },
  ];
  const submissions = [];
  const leads = [
    { id: uid("l"), nombre: "Wu Jing", contacto: "WeChat: wujing_es", tipo: "nativo", pack: "Pack 10", nivel: "A2", mensaje: "Quiero preparar el DELE A2 en marzo.", creado: new Date().toISOString(), estado: "nuevo" },
  ];
  return { teachers, students, classes, homework, submissions, leads };
}

function readDemo() {
  try {
    const raw = localStorage.getItem(DEMO_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  const data = seedDemo();
  writeDemo(data);
  return data;
}
function writeDemo(data) {
  try {
    localStorage.setItem(DEMO_KEY, JSON.stringify(data));
  } catch {}
}

// Identidad demo: cada rol "es" una persona concreta para que el filtrado se vea real
const DEMO_IDENTITY = { admin: null, teacher: "t_lucia", student: "s_mei" };

function filterFor(data, role, me) {
  if (role === "admin") return data;
  if (role === "teacher") {
    const classes = data.classes.filter((c) => c.teacherId === me);
    const homework = data.homework.filter((h) => h.teacherId === me);
    const studentIds = new Set(data.students.filter((s) => s.teacherIds?.includes(me)).map((s) => s.id));
    classes.forEach((c) => c.studentIds.forEach((id) => studentIds.add(id)));
    const hwIds = new Set(homework.map((h) => h.id));
    return {
      teachers: data.teachers,
      students: data.students.filter((s) => studentIds.has(s.id)),
      classes,
      homework,
      submissions: data.submissions.filter((s) => hwIds.has(s.homeworkId)),
      leads: [],
    };
  }
  const classes = data.classes.filter((c) => c.studentIds.includes(me));
  const homework = data.homework.filter((h) => h.studentIds.includes(me));
  return {
    teachers: data.teachers,
    students: data.students.filter((s) => s.id === me),
    classes,
    homework,
    submissions: data.submissions.filter((s) => s.studentId === me),
    leads: [],
  };
}

const EMPTY = { teachers: [], students: [], classes: [], homework: [], submissions: [], leads: [] };
const CampusContext = React.createContext(null);

export function CampusProvider({ children }) {
  const { isAuthenticated, isAdminLogin, getToken } = useAppAuth();
  const [demoRole, setDemoRoleState] = React.useState(() => {
    try {
      return localStorage.getItem(DEMO_ROLE_KEY) || "admin";
    } catch {
      return "admin";
    }
  });
  const [me, setMe] = React.useState({ role: null, profileId: null });
  const [data, setData] = React.useState(EMPTY);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const call = React.useCallback(
    async (path, options = {}) => {
      const token = getToken ? await getToken().catch(() => null) : null;
      const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(options.headers || {}),
        },
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || `Error ${res.status}`);
      return body;
    },
    [getToken],
  );

  const refresh = React.useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError("");
    try {
      if (IS_DEMO) {
        const role = isAdminLogin ? demoRole : demoRole === "admin" ? "student" : demoRole;
        const profileId = DEMO_IDENTITY[role];
        setMe({ role, profileId });
        setData(filterFor(structuredClone(readDemo()), role, profileId));
      } else {
        const res = await call("/campus/data");
        setMe(res.me);
        setData({ ...EMPTY, ...res.data });
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, isAdminLogin, demoRole, call]);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  // Operaciones: en demo se aplican al almacén local; con backend van al Worker
  const mutate = React.useCallback(
    async (op, payload) => {
      if (!IS_DEMO) {
        const res = await call(`/campus/${op}`, { method: "POST", body: JSON.stringify(payload) });
        await refresh();
        return res;
      }
      const db = readDemo();
      const col = (name) => db[name];
      const upsert = (name, item, prefix) => {
        const list = col(name);
        if (!item.id) item.id = uid(prefix);
        const i = list.findIndex((x) => x.id === item.id);
        if (i >= 0) list[i] = { ...list[i], ...item };
        else list.push(item);
        return item;
      };
      let result = null;
      switch (op) {
        case "class.save": {
          const { repetirSemanas = 1, ...cls } = payload;
          if (me.role === "teacher") cls.teacherId = me.profileId;
          if (!cls.id && repetirSemanas > 1) {
            const base = new Date(cls.inicio);
            for (let w = 0; w < repetirSemanas; w++) {
              const d = new Date(base);
              d.setDate(d.getDate() + w * 7);
              upsert("classes", { ...cls, inicio: d.toISOString(), serie: base.getTime() }, "c");
            }
          } else result = upsert("classes", cls, "c");
          break;
        }
        case "class.delete":
          db.classes = db.classes.filter((c) => c.id !== payload.id);
          break;
        case "homework.save": {
          const hw = { creado: new Date().toISOString(), ...payload };
          if (me.role === "teacher") hw.teacherId = me.profileId;
          hw.teacherId ??= db.teachers[0]?.id;
          // Desde el generador llega sin alumnos: se asigna a todos los del profesor
          if (!hw.studentIds?.length) {
            hw.studentIds = db.students.filter((s) => me.role === "admin" || s.teacherIds?.includes(me.profileId)).map((s) => s.id);
          }
          hw.fechaEntrega ??= new Date(Date.now() + 6 * 86400000).toISOString();
          result = upsert("homework", hw, "h");
          break;
        }
        case "homework.delete":
          db.homework = db.homework.filter((h) => h.id !== payload.id);
          db.submissions = db.submissions.filter((s) => s.homeworkId !== payload.id);
          break;
        case "submission.save": {
          const existing = db.submissions.find((s) => s.homeworkId === payload.homeworkId && s.studentId === me.profileId);
          result = upsert("submissions", { ...existing, ...payload, studentId: me.profileId, entregado: new Date().toISOString() }, "e");
          break;
        }
        case "submission.grade":
          result = upsert("submissions", { id: payload.id, calificacion: payload.calificacion, feedback: payload.feedback, corregido: new Date().toISOString() }, "e");
          break;
        case "teacher.save":
          result = upsert("teachers", payload, "t");
          break;
        case "teacher.delete":
          db.teachers = db.teachers.filter((t) => t.id !== payload.id);
          break;
        case "student.save":
          result = upsert("students", payload, "s");
          break;
        case "student.delete":
          db.students = db.students.filter((s) => s.id !== payload.id);
          break;
        case "lead.update":
          result = upsert("leads", payload, "l");
          break;
        case "demo.reset":
          writeDemo(seedDemo());
          await refresh();
          return null;
        default:
          throw new Error(`Operación desconocida: ${op}`);
      }
      writeDemo(db);
      await refresh();
      return result;
    },
    [call, refresh, me],
  );

  const setDemoRole = (r) => {
    try {
      localStorage.setItem(DEMO_ROLE_KEY, r);
    } catch {}
    setDemoRoleState(r);
  };

  const value = {
    ...me,
    data,
    loading,
    error,
    refresh,
    isDemo: IS_DEMO,
    canSwitchRole: IS_DEMO && isAdminLogin,
    demoRole,
    setDemoRole,
    saveClass: (c) => mutate("class.save", c),
    deleteClass: (id) => mutate("class.delete", { id }),
    createHomework: (h) => mutate("homework.save", h),
    saveHomework: (h) => mutate("homework.save", h),
    deleteHomework: (id) => mutate("homework.delete", { id }),
    submitHomework: (s) => mutate("submission.save", s),
    gradeSubmission: (s) => mutate("submission.grade", s),
    saveTeacher: (t) => mutate("teacher.save", t),
    deleteTeacher: (id) => mutate("teacher.delete", { id }),
    saveStudent: (s) => mutate("student.save", s),
    deleteStudent: (id) => mutate("student.delete", { id }),
    updateLead: (l) => mutate("lead.update", l),
    resetDemo: () => mutate("demo.reset"),
  };
  return <CampusContext.Provider value={value}>{children}</CampusContext.Provider>;
}

export function useCampus() {
  return React.useContext(CampusContext) || { role: null, data: EMPTY, loading: false, createHomework: async () => {} };
}

// Formulario público de la página de profesores (no requiere sesión)
export async function sendLead(lead) {
  const item = { ...lead, id: uid("l"), creado: new Date().toISOString(), estado: "nuevo" };
  if (IS_DEMO) {
    const db = readDemo();
    db.leads.unshift(item);
    writeDemo(db);
    return item;
  }
  const res = await fetch(`${API_URL}/campus/lead`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) });
  if (!res.ok) throw new Error("No se pudo enviar");
  return res.json();
}

export function getPublicTeachers() {
  if (IS_DEMO) return Promise.resolve(readDemo().teachers);
  return fetch(`${API_URL}/campus/teachers`)
    .then((r) => r.json())
    .then((r) => r.teachers || [])
    .catch(() => []);
}

// Utilidades de fecha y estado de clase
export function classStatus(c, now = Date.now()) {
  const start = new Date(c.inicio).getTime();
  const end = start + (c.duracion || 60) * 60000;
  if (now > end) return "terminada";
  if (now >= start - 15 * 60000) return "abierta"; // se puede entrar 15 min antes
  return "programada";
}

export function startOfWeek(date = new Date()) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}

export const fmtDay = (iso) => new Date(iso).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
export const fmtTime = (iso) => new Date(iso).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
export const fmtShort = (iso) => new Date(iso).toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short" });
