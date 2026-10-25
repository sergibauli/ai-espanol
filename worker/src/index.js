// AI Español · API del Campus (Cloudflare Worker)
// - Valida el token de sesión de Clerk (RS256, JWKS) en cada petición privada.
// - El rol se decide AQUÍ, nunca en el navegador: ADMIN_EMAILS → admin; email en profesores → teacher; resto → student.
// - Cada rol recibe solo sus datos: el alumno sus clases/deberes/entregas, el profesor los suyos, admin todo.
// Almacenamiento: KV (binding CAMPUS), un documento JSON "db" + caché de emails por usuario.
// - Proxy de IA (/ai/chat): la clave de DeepSeek vive aquí como secreto y nunca llega al navegador.
// Secretos: CLERK_SECRET_KEY, ADMIN_EMAILS, DEEPSEEK_API_KEY. Variables: ver wrangler.toml.

const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });
const fail = (status, error) => json({ error }, status);

const COLLECTIONS = ["teachers", "students", "classes", "homework", "submissions", "leads"];

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const cors = corsHeaders(req, env);
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    let res;
    try {
      res = await route(req, env, url);
    } catch (e) {
      if (!e.status) console.error(e);
      res = fail(e.status || 500, e.status ? e.message : "Error interno. Inténtalo de nuevo.");
    }
    for (const [k, v] of Object.entries(cors)) res.headers.set(k, v);
    return res;
  },
};

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
const deny = (msg = "No tienes permiso para esta acción.") => {
  throw new HttpError(403, msg);
};

async function route(req, env, url) {
  const path = url.pathname.replace(/\/+$/, "");
  if (path === "/campus/teachers" && req.method === "GET") {
    const db = await loadDb(env);
    return json({ teachers: db.teachers.map(publicTeacher) });
  }
  if (path === "/campus/lead" && req.method === "POST") return createLead(req, env);
  if (path === "/ai/chat" && req.method === "POST") return aiChat(req, env);

  const token = await authenticate(req, env);
  if (!token) return fail(401, "Inicia sesión para continuar.");
  const db = await loadDb(env);
  const me = await identify(env, db, token);

  // Calibración del banco de preguntas: aciertos y respuestas por ítem, de todos los alumnos
  if (path === "/items/answers" && req.method === "POST") {
    const body = await req.json().catch(() => ({}));
    const answers = (Array.isArray(body.answers) ? body.answers : []).filter((a) => /^[A-B][12]-\d{3}$/.test(a?.id)).slice(0, 50);
    for (const a of answers) {
      const k = `item:${a.id}`;
      const cur = (await env.CAMPUS.get(k, "json")) || { n: 0, ok: 0 };
      await env.CAMPUS.put(k, JSON.stringify({ n: cur.n + 1, ok: cur.ok + (a.ok ? 1 : 0) }));
    }
    return json({ saved: answers.length });
  }
  if (path === "/items/stats" && req.method === "GET") {
    const out = {};
    let cursor;
    do {
      const page = await env.CAMPUS.list({ prefix: "item:", cursor });
      for (const k of page.keys) out[k.name.slice(5)] = await env.CAMPUS.get(k.name, "json");
      cursor = page.list_complete ? undefined : page.cursor;
    } while (cursor);
    return json({ items: out });
  }
  if (path === "/campus/data" && req.method === "GET") {
    return json({ me: { role: me.role, profileId: me.profileId }, data: filterFor(db, me) });
  }
  const op = path.startsWith("/campus/") && req.method === "POST" ? path.slice("/campus/".length) : null;
  if (!op || !OPS[op]) return fail(404, "Ruta no encontrada");
  const body = await req.json().catch(() => ({}));
  const result = OPS[op](db, me, body);
  await saveDb(env, db);
  return json({ ok: true, result: result ?? null });
}

// ---------- Autenticación (Clerk) ----------
let jwksCache = { at: 0, keys: [] };

async function authenticate(req, env) {
  const token = (req.headers.get("authorization") || "").replace(/^Bearer /, "");
  if (!token) return null;
  const [h, p, s] = token.split(".");
  if (!s) return null;
  const header = JSON.parse(b64urlText(h));
  const payload = JSON.parse(b64urlText(p));
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp < now - 5 || (payload.nbf && payload.nbf > now + 5)) return null;
  if (env.CLERK_ISSUER && payload.iss !== env.CLERK_ISSUER) return null;
  if (Date.now() - jwksCache.at > 3600e3) {
    const r = await fetch(`${env.CLERK_ISSUER}/.well-known/jwks.json`);
    jwksCache = { at: Date.now(), keys: (await r.json()).keys };
  }
  const jwk = jwksCache.keys.find((k) => k.kid === header.kid);
  if (!jwk) return null;
  const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
  const ok = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64urlBytes(s), new TextEncoder().encode(`${h}.${p}`));
  return ok ? payload : null;
}

function b64urlBytes(s) {
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}
const b64urlText = (s) => new TextDecoder().decode(b64urlBytes(s));

// El token de sesión de Clerk no trae el email: se pide una vez a la API de Clerk y se guarda en KV
async function userInfo(env, sub) {
  const cached = await env.CAMPUS.get(`user:${sub}`, "json");
  if (cached) return cached;
  const r = await fetch(`https://api.clerk.com/v1/users/${sub}`, { headers: { authorization: `Bearer ${env.CLERK_SECRET_KEY}` } });
  if (!r.ok) throw new HttpError(500, "No se pudo leer el usuario de Clerk.");
  const u = await r.json();
  const primary = u.email_addresses?.find((e) => e.id === u.primary_email_address_id) || u.email_addresses?.[0];
  const info = { email: (primary?.email_address || "").toLowerCase(), name: [u.first_name, u.last_name].filter(Boolean).join(" ") || u.username || "" };
  await env.CAMPUS.put(`user:${sub}`, JSON.stringify(info), { expirationTtl: 86400 });
  return info;
}

async function identify(env, db, token) {
  const { email, name } = await userInfo(env, token.sub);
  const admins = (env.ADMIN_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  if (email && admins.includes(email)) return { role: "admin", profileId: null, email };
  const teacher = db.teachers.find((t) => t.email?.toLowerCase() === email);
  if (teacher) return { role: "teacher", profileId: teacher.id, email };
  let student = db.students.find((s) => s.email?.toLowerCase() === email);
  if (!student && email) {
    // Primer acceso: se crea la ficha para que administración pueda asignarle profesor y plan
    student = { id: uid("s"), nombre: name || email, email, nivel: "A1", teacherIds: [], plan: "", clasesRestantes: 0, creado: new Date().toISOString() };
    db.students.push(student);
    await saveDb(env, db);
  }
  return { role: "student", profileId: student?.id || null, email };
}

// ---------- Datos ----------
async function loadDb(env) {
  const db = (await env.CAMPUS.get("db", "json")) || {};
  for (const c of COLLECTIONS) db[c] ??= [];
  return db;
}
const saveDb = (env, db) => env.CAMPUS.put("db", JSON.stringify(db));
const uid = (p) => `${p}_${crypto.randomUUID().slice(0, 12)}`;

const publicTeacher = ({ email, ...t }) => t;

function filterFor(db, me) {
  if (me.role === "admin") return db;
  if (me.role === "teacher") {
    const classes = db.classes.filter((c) => c.teacherId === me.profileId);
    const homework = db.homework.filter((h) => h.teacherId === me.profileId);
    const studentIds = new Set(db.students.filter((s) => s.teacherIds?.includes(me.profileId)).map((s) => s.id));
    classes.forEach((c) => c.studentIds.forEach((id) => studentIds.add(id)));
    const hw = new Set(homework.map((h) => h.id));
    return {
      teachers: db.teachers.map(publicTeacher),
      students: db.students.filter((s) => studentIds.has(s.id)),
      classes,
      homework,
      submissions: db.submissions.filter((s) => hw.has(s.homeworkId)),
      leads: [],
    };
  }
  const id = me.profileId;
  return {
    teachers: db.teachers.map(publicTeacher),
    students: db.students.filter((s) => s.id === id),
    classes: db.classes.filter((c) => c.studentIds.includes(id)),
    homework: db.homework.filter((h) => h.studentIds.includes(id)),
    submissions: db.submissions.filter((s) => s.studentId === id),
    leads: [],
  };
}

// ---------- Operaciones con permisos ----------
const str = (v, max = 2000) => String(v ?? "").slice(0, max);
const isStaff = (me) => me.role === "admin" || me.role === "teacher";
const onlyAdmin = (me) => me.role === "admin" || deny();

function upsert(list, item, prefix) {
  if (!item.id) item.id = uid(prefix);
  const i = list.findIndex((x) => x.id === item.id);
  if (i >= 0) list[i] = { ...list[i], ...item };
  else list.push(item);
  return item;
}

function ownedBy(me, item) {
  return me.role === "admin" || (me.role === "teacher" && item?.teacherId === me.profileId);
}

function cleanClass(b) {
  return {
    id: b.id,
    titulo: str(b.titulo, 200),
    teacherId: str(b.teacherId, 60),
    studentIds: Array.isArray(b.studentIds) ? b.studentIds.map((s) => str(s, 60)).slice(0, 50) : [],
    inicio: new Date(b.inicio).toISOString(),
    duracion: Math.min(240, Math.max(15, Number(b.duracion) || 60)),
    meetingUrl: /^https:\/\//.test(b.meetingUrl || "") ? str(b.meetingUrl, 500) : "",
    meetingId: str(b.meetingId, 40),
    passcode: str(b.passcode, 40),
    nivel: str(b.nivel, 4),
    moduloId: b.moduloId ? Number(b.moduloId) : null,
    notas: str(b.notas, 1000),
  };
}

const OPS = {
  "class.save"(db, me, b) {
    if (!isStaff(me)) deny();
    const cls = cleanClass(b);
    if (me.role === "teacher") cls.teacherId = me.profileId;
    if (cls.id && !ownedBy(me, db.classes.find((c) => c.id === cls.id))) deny();
    const weeks = Math.min(16, Math.max(1, Number(b.repetirSemanas) || 1));
    if (!cls.id && weeks > 1) {
      const base = new Date(cls.inicio);
      for (let w = 0; w < weeks; w++) {
        const d = new Date(base);
        d.setDate(d.getDate() + w * 7);
        upsert(db.classes, { ...cls, id: undefined, inicio: d.toISOString(), serie: base.getTime() }, "c");
      }
      return null;
    }
    return upsert(db.classes, cls, "c");
  },
  "class.delete"(db, me, b) {
    if (!ownedBy(me, db.classes.find((c) => c.id === b.id))) deny();
    db.classes = db.classes.filter((c) => c.id !== b.id);
  },
  "homework.save"(db, me, b) {
    if (!isStaff(me)) deny();
    const hw = {
      id: b.id,
      titulo: str(b.titulo, 200),
      descripcion: str(b.descripcion, 4000),
      teacherId: me.role === "teacher" ? me.profileId : str(b.teacherId, 60),
      studentIds: Array.isArray(b.studentIds) ? b.studentIds.map((s) => str(s, 60)) : [],
      fechaEntrega: new Date(b.fechaEntrega || Date.now() + 6 * 864e5).toISOString(),
      moduloId: b.moduloId ? Number(b.moduloId) : null,
      enlace: /^https:\/\//.test(b.enlace || "") ? str(b.enlace, 500) : "",
      examen: b.examen && Array.isArray(b.examen.modulos) ? b.examen : null,
      creado: b.creado || new Date().toISOString(),
    };
    if (hw.id && !ownedBy(me, db.homework.find((h) => h.id === hw.id))) deny();
    // Desde el generador de exámenes llega sin alumnos: se asigna a todos los del profesor
    if (!hw.studentIds.length) {
      hw.studentIds = db.students.filter((s) => me.role === "admin" || s.teacherIds?.includes(me.profileId)).map((s) => s.id);
    }
    if (!hw.teacherId && db.teachers[0]) hw.teacherId = db.teachers[0].id;
    return upsert(db.homework, hw, "h");
  },
  "homework.delete"(db, me, b) {
    if (!ownedBy(me, db.homework.find((h) => h.id === b.id))) deny();
    db.homework = db.homework.filter((h) => h.id !== b.id);
    db.submissions = db.submissions.filter((s) => s.homeworkId !== b.id);
  },
  "submission.save"(db, me, b) {
    if (me.role !== "student" || !me.profileId) deny();
    const hw = db.homework.find((h) => h.id === b.homeworkId);
    if (!hw?.studentIds.includes(me.profileId)) deny();
    const prev = db.submissions.find((s) => s.homeworkId === hw.id && s.studentId === me.profileId);
    return upsert(
      db.submissions,
      {
        id: prev?.id,
        homeworkId: hw.id,
        studentId: me.profileId,
        texto: str(b.texto, 20000),
        enlace: /^https:\/\//.test(b.enlace || "") ? str(b.enlace, 500) : "",
        nota: b.nota != null ? Math.max(0, Math.min(100, Number(b.nota))) : prev?.nota ?? null,
        entregado: new Date().toISOString(),
      },
      "e",
    );
  },
  "submission.grade"(db, me, b) {
    const sub = db.submissions.find((s) => s.id === b.id);
    const hw = sub && db.homework.find((h) => h.id === sub.homeworkId);
    if (!ownedBy(me, hw)) deny();
    return upsert(db.submissions, { id: sub.id, calificacion: str(b.calificacion, 20), feedback: str(b.feedback, 2000), corregido: new Date().toISOString() }, "e");
  },
  "teacher.save"(db, me, b) {
    onlyAdmin(me);
    const t = {
      id: b.id,
      nombre: str(b.nombre, 120),
      email: str(b.email, 200).toLowerCase(),
      tipo: b.tipo === "chino" ? "chino" : "nativo",
      ciudad: str(b.ciudad, 80),
      bio: str(b.bio, 600),
      bioZh: str(b.bioZh, 600),
      niveles: Array.isArray(b.niveles) ? b.niveles.map((n) => str(n, 4)) : [],
      avatar: str(b.avatar, 16),
      color: /^#[0-9a-f]{6}$/i.test(b.color) ? b.color : "#ff7a1a",
      precio: Number(b.precio) || 0,
    };
    return upsert(db.teachers, t, "t");
  },
  "teacher.delete"(db, me, b) {
    onlyAdmin(me);
    db.teachers = db.teachers.filter((t) => t.id !== b.id);
  },
  "student.save"(db, me, b) {
    onlyAdmin(me);
    const s = {
      id: b.id,
      nombre: str(b.nombre, 120),
      email: str(b.email, 200).toLowerCase(),
      nivel: str(b.nivel, 4),
      teacherIds: Array.isArray(b.teacherIds) ? b.teacherIds.map((x) => str(x, 60)) : [],
      plan: str(b.plan, 120),
      clasesRestantes: Number(b.clasesRestantes) || 0,
      wechat: str(b.wechat, 80),
    };
    return upsert(db.students, s, "s");
  },
  "student.delete"(db, me, b) {
    onlyAdmin(me);
    db.students = db.students.filter((s) => s.id !== b.id);
  },
  "lead.update"(db, me, b) {
    onlyAdmin(me);
    return upsert(db.leads, { id: b.id, estado: str(b.estado, 20) }, "l");
  },
};

// ---------- Proxy de DeepSeek ----------
// Cuota diaria: usuarios con sesión de Clerk AI_DAILY_USER (200), visitantes sin sesión AI_DAILY_ANON (20) por IP.
async function aiChat(req, env) {
  if (!env.DEEPSEEK_API_KEY) return fail(503, "IA no configurada");
  const token = await authenticate(req, env).catch(() => null);
  const who = token ? `u:${token.sub}` : `ip:${req.headers.get("cf-connecting-ip") || "anon"}`;
  const limit = Number(token ? env.AI_DAILY_USER || 200 : env.AI_DAILY_ANON || 20);
  const key = `ai:${who}:${new Date().toISOString().slice(0, 10)}`;
  const used = Number(await env.CAMPUS.get(key)) || 0;
  if (used >= limit) return fail(429, "Has llegado al límite diario de IA. Vuelve mañana. 今天的AI次数已用完。");
  const b = await req.json().catch(() => ({}));
  const messages = Array.isArray(b.messages) ? b.messages.slice(-30).map((m) => ({ role: ["system", "user", "assistant"].includes(m.role) ? m.role : "user", content: str(m.content, 12000) })) : [];
  if (!messages.length) return fail(400, "Faltan mensajes.");
  await env.CAMPUS.put(key, String(used + 1), { expirationTtl: 172800 });
  const r = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${env.DEEPSEEK_API_KEY}` },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages,
      temperature: Math.min(1.5, Math.max(0, Number(b.temperature ?? 0.7))),
      max_tokens: Math.min(2000, Number(b.max_tokens) || 1200),
      ...(b.response_format?.type === "json_object" ? { response_format: { type: "json_object" } } : {}),
    }),
  });
  return new Response(await r.text(), { status: r.status, headers: { "content-type": "application/json" } });
}

// Formulario público: limitado por IP para evitar spam
async function createLead(req, env) {
  const ip = req.headers.get("cf-connecting-ip") || "anon";
  const key = `rl:${ip}:${new Date().toISOString().slice(0, 13)}`;
  const count = Number(await env.CAMPUS.get(key)) || 0;
  if (count >= 5) return fail(429, "Demasiadas solicitudes. Inténtalo más tarde.");
  await env.CAMPUS.put(key, String(count + 1), { expirationTtl: 3600 });
  const b = await req.json().catch(() => ({}));
  if (!b.nombre || !b.contacto) return fail(400, "Faltan nombre y contacto.");
  const db = await loadDb(env);
  const lead = {
    id: uid("l"),
    nombre: str(b.nombre, 120),
    contacto: str(b.contacto, 200),
    tipo: str(b.tipo, 20),
    pack: str(b.pack, 60),
    nivel: str(b.nivel, 10),
    mensaje: str(b.mensaje, 2000),
    creado: new Date().toISOString(),
    estado: "nuevo",
  };
  db.leads.unshift(lead);
  await saveDb(env, db);
  return json({ ok: true });
}

function corsHeaders(req, env) {
  const origin = req.headers.get("origin") || "";
  const allowed = (env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim());
  return {
    "access-control-allow-origin": allowed.includes(origin) ? origin : allowed[0] || "",
    "access-control-allow-headers": "authorization, content-type",
    "access-control-allow-methods": "GET, POST, OPTIONS",
    vary: "origin",
  };
}
