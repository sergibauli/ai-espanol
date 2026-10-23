import * as React from "react";
import { Link } from "react-router";
import { CheckIcon, VideoIcon, SendIcon, ChevronDownIcon } from "lucide-react";
import { StarfieldBackground } from "../components/fx/StarfieldBackground.jsx";
import { getPublicTeachers, sendLead, IS_DEMO } from "../lib/campus.jsx";
import { useAppAuth } from "../lib/auth.jsx";
import { PACKS, PASOS, FAQ, MONEDA } from "../data/oferta.js";

function LeadForm({ defaults }) {
  const [f, setF] = React.useState({ nombre: "", contacto: "", tipo: "combo", pack: "Clase de prueba", nivel: "A1", mensaje: "", ...defaults });
  const [state, setState] = React.useState("idle");
  React.useEffect(() => setF((x) => ({ ...x, ...defaults })), [defaults]);
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));
  if (state === "ok") {
    return (
      <div className="ui-card is-hero" style={{ textAlign: "center", padding: 36 }}>
        <div style={{ fontSize: 48 }}>🎉</div>
        <div className="ui-h2" style={{ marginTop: 10 }}>¡Solicitud enviada!</div>
        <p className="ui-lead" style={{ margin: "8px auto" }}>
          Te contactaremos en menos de 24 h para fijar tu clase de prueba.
          <br />
          <span className="ui-zh">我们会在24小时内联系你安排试听课。</span>
        </p>
      </div>
    );
  }
  return (
    <form
      id="reservar"
      className="ui-card is-hero ui-stack"
      style={{ gap: 14 }}
      onSubmit={async (e) => {
        e.preventDefault();
        setState("sending");
        try {
          await sendLead(f);
          setState("ok");
        } catch {
          setState("error");
        }
      }}
    >
      <div>
        <div className="ui-h2">Reserva tu clase de prueba gratis</div>
        <div className="ui-zh">免费预约试听课 · 25分钟</div>
      </div>
      <div className="ui-grid cols-2">
        <label className="ui-label">
          Nombre · 姓名
          <input className="ui-input" required value={f.nombre} onChange={set("nombre")} />
        </label>
        <label className="ui-label">
          WeChat o email · 微信或邮箱
          <input className="ui-input" required value={f.contacto} onChange={set("contacto")} placeholder="WeChat ID / email" />
        </label>
      </div>
      <div className="ui-grid cols-3">
        <label className="ui-label">
          Profesor · 老师
          <select className="ui-select" value={f.tipo} onChange={set("tipo")}>
            <option value="combo">Nativo + chino · 双师</option>
            <option value="nativo">Nativo · 外教</option>
            <option value="chino">Chino · 中文老师</option>
          </select>
        </label>
        <label className="ui-label">
          Plan · 套餐
          <select className="ui-select" value={f.pack} onChange={set("pack")}>
            {PACKS.map((p) => (
              <option key={p.key}>{p.nombre}</option>
            ))}
          </select>
        </label>
        <label className="ui-label">
          Nivel · 水平
          <select className="ui-select" value={f.nivel} onChange={set("nivel")}>
            {["Cero", "A1", "A2", "B1", "B2", "C1"].map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="ui-label">
        Objetivo y horario preferido · 学习目标和时间
        <textarea className="ui-textarea" style={{ minHeight: 80 }} value={f.mensaje} onChange={set("mensaje")} placeholder="Ej.: DELE B1 en mayo, tardes entre semana. 例：五月考DELE B1，工作日晚上。" />
      </label>
      {state === "error" && <div className="ui-banner">No se pudo enviar. Inténtalo de nuevo.</div>}
      <button className="ui-btn primary lg" disabled={state === "sending"}>
        <SendIcon size={18} /> {state === "sending" ? "Enviando…" : "Quiero mi clase gratis · 预约"}
      </button>
    </form>
  );
}

export default function ProfesoresPage() {
  const { isAuthenticated } = useAppAuth();
  const [teachers, setTeachers] = React.useState([]);
  const [filter, setFilter] = React.useState("todos");
  const [open, setOpen] = React.useState(0);
  const [defaults, setDefaults] = React.useState({});
  React.useEffect(() => {
    getPublicTeachers().then(setTeachers);
  }, []);
  const list = teachers.filter((t) => filter === "todos" || t.tipo === filter);
  const pick = (patch) => {
    setDefaults(patch);
    document.getElementById("reservar")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <StarfieldBackground>
      <div className="ui-page">
        {!isAuthenticated && (
          <div className="ui-between" style={{ marginBottom: 20 }}>
            <Link to="/login" className="ui-row" style={{ color: "#fff", fontWeight: 900, textDecoration: "none" }}>
              <span className="brand-mark">AI</span> ESPAÑOL
            </Link>
            <Link to="/login" className="ui-btn sm">
              Entrar · 登录
            </Link>
          </div>
        )}
        <section className="ui-card is-hero" style={{ padding: "clamp(24px, 5vw, 48px)" }}>
          <div className="ui-eyebrow">
            <VideoIcon size={14} /> Clases en directo · 真人在线课
          </div>
          <h1 className="ui-h1" style={{ maxWidth: 820 }}>
            Aprende español con <span className="ui-gradient-text">profesores nativos y chinos</span>
          </h1>
          <p className="ui-lead">
            Clases 1 a 1 por Tencent Meeting, deberes corregidos cada semana y exámenes DELE automáticos. Gramática explicada en chino y
            conversación real con nativos.
            <br />
            <span className="ui-zh">腾讯会议一对一真人课，每周批改作业，DELE自动模拟考试。中文老师讲语法，外教练口语。</span>
          </p>
          <div className="ui-row" style={{ marginTop: 18 }}>
            <button className="ui-btn primary lg" onClick={() => pick({ pack: "Clase de prueba" })}>
              Clase de prueba gratis · 免费试听
            </button>
            <a className="ui-btn lg" href="#precios">
              Ver precios · 价格
            </a>
          </div>
          <div className="ui-row" style={{ marginTop: 22, gap: 18 }}>
            {[
              ["1 a 1", "clases individuales · 一对一"],
              ["🎥 Tencent Meeting", "sin VPN · 无需VPN"],
              ["🕗 8–23 h", "horario de Pekín · 北京时间"],
            ].map(([a, b]) => (
              <div key={a} className="ui-stat">
                <b style={{ fontSize: 20 }}>{a}</b>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="ui-section">
          <div className="ui-grid cols-4">
            {PASOS.map((p, i) => (
              <div key={i} className="ui-card">
                <div style={{ fontSize: 30 }}>{p.icon}</div>
                <div className="ui-muted" style={{ fontSize: 12, fontWeight: 800, marginTop: 8 }}>PASO {i + 1}</div>
                <div className="ui-h3" style={{ marginTop: 4 }}>{p.es}</div>
                <div className="ui-zh">{p.zh}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="ui-section">
          <div className="ui-between">
            <div>
              <h2 className="ui-h2">Nuestro equipo · 师资团队</h2>
              <div className="ui-zh">外教 + 中文老师</div>
            </div>
            <div className="ui-tabs">
              {[
                ["todos", "Todos · 全部"],
                ["nativo", "🇪🇸 Nativos · 外教"],
                ["chino", "🇨🇳 Chinos · 中文老师"],
              ].map(([k, t]) => (
                <button key={k} className={filter === k ? "is-on" : ""} onClick={() => setFilter(k)}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          {IS_DEMO && (
            <div className="ui-banner" style={{ marginTop: 14 }}>
              Perfiles de ejemplo. Sustitúyelos por tu equipo real desde Campus → Profesores y alumnos.
            </div>
          )}
          <div className="ui-grid cols-2" style={{ marginTop: 16 }}>
            {list.map((t) => (
              <div key={t.id} className="ui-card" style={{ display: "flex", gap: 16, borderTop: `3px solid ${t.color}` }}>
                <div style={{ fontSize: 54, lineHeight: 1 }}>{t.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="ui-between">
                    <div className="ui-h3">{t.nombre}</div>
                    <span className="ui-chip">{t.tipo === "nativo" ? "🇪🇸 Nativo" : "🇨🇳 Chino"}</span>
                  </div>
                  <div className="ui-muted" style={{ fontSize: 13 }}>
                    {t.ciudad} · {MONEDA}{t.precio}/h
                  </div>
                  <p style={{ margin: "10px 0 4px", lineHeight: 1.55 }}>{t.bio}</p>
                  <p className="ui-zh" style={{ margin: 0 }}>{t.bioZh}</p>
                  <div className="ui-between" style={{ marginTop: 12 }}>
                    <div className="ui-row" style={{ gap: 4 }}>
                      {(t.niveles || []).map((l) => (
                        <span key={l} className={`ui-chip lvl-${l}`}>{l}</span>
                      ))}
                    </div>
                    <button className="ui-btn sm primary" onClick={() => pick({ tipo: t.tipo, mensaje: `Me gustaría dar clase con ${t.nombre}.` })}>
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="ui-section" id="precios">
          <h2 className="ui-h2">Planes y precios · 课程价格</h2>
          <div className="ui-grid cols-4" style={{ marginTop: 16 }}>
            {PACKS.map((p) => (
              <div key={p.key} className={`ui-card ${p.destacado ? "is-hero" : ""}`} style={{ display: "flex", flexDirection: "column", gap: 10, borderColor: p.destacado ? "var(--ui-brand)" : undefined }}>
                {p.destacado && <span className="ui-chip is-on" style={{ alignSelf: "flex-start" }}>Más elegido · 最受欢迎</span>}
                <div>
                  <div className="ui-h3">{p.nombre}</div>
                  <div className="ui-zh">{p.nombreZh}</div>
                </div>
                <div style={{ fontFamily: "var(--ui-display)", fontSize: 32, fontWeight: 800 }}>
                  {p.precio ? `${MONEDA}${p.precio.toLocaleString("es-ES")}` : "Gratis"}
                </div>
                <div className="ui-muted" style={{ fontSize: 13 }}>
                  {p.detalle}
                  <br />
                  {p.detalleZh}
                </div>
                <div className="ui-stack" style={{ gap: 6, flex: 1 }}>
                  {p.incluye.map((x) => (
                    <div key={x} className="ui-row" style={{ gap: 8, fontSize: 14, flexWrap: "nowrap" }}>
                      <CheckIcon size={15} style={{ color: "var(--ui-ok)", flexShrink: 0 }} /> {x}
                    </div>
                  ))}
                </div>
                <button className={`ui-btn ${p.destacado ? "primary" : ""}`} onClick={() => pick({ pack: p.nombre })}>
                  Elegir · 选择
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="ui-section ui-grid cols-2" style={{ alignItems: "start" }}>
          <div className="ui-stack">
            <h2 className="ui-h2">Preguntas frecuentes · 常见问题</h2>
            {FAQ.map((f, i) => (
              <div key={i} className="ui-card" style={{ padding: 16 }}>
                <button onClick={() => setOpen(open === i ? -1 : i)} className="ui-between" style={{ width: "100%", background: "none", border: 0, color: "inherit", cursor: "pointer", textAlign: "left", padding: 0, fontFamily: "var(--ui-font)" }}>
                  <span>
                    <b>{f.q}</b>
                    <br />
                    <span className="ui-zh">{f.qZh}</span>
                  </span>
                  <ChevronDownIcon size={18} style={{ transform: open === i ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
                </button>
                {open === i && (
                  <p style={{ margin: "12px 0 0", lineHeight: 1.6, color: "var(--ui-text-2)" }}>
                    {f.a}
                    <br />
                    <span className="ui-zh">{f.aZh}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
          <LeadForm defaults={defaults} />
        </section>
      </div>
    </StarfieldBackground>
  );
}
