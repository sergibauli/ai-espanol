import {
  CalendarIcon,
  Trash2Icon,
  MailIcon,
  ArrowLeftIcon,
  PlusIcon,
  ClockIcon,
  Link2Icon,
  CheckIcon,
  Share2Icon,
  CopyIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../components/fx/StarfieldBackground.jsx";
import { l, b, e, r as r_2, a as a_1, c as c_2, d as d_1 } from "../data/clases.js";
function JComponent() {
  const [d, setD] = React.useState(l);
  const [x, setX] = React.useState(false);
  const [p, setP] = React.useState(null);
  const [s, setS] = React.useState({
    id: "",
    titulo: "",
    fecha: "",
    hora: "",
    enlace: "",
    deberes: "",
    profesor: "",
    profesorEmail: "",
    estudiantes: "",
  });
  const u = () => setD(l());
  const onClick = () => {
    if (!s.titulo.trim() || !s.fecha) {
      alert("Pon al menos título y fecha / 请填写标题和日期");
      return;
    }
    const a = {
      ...s,
      id: `c${Date.now()}`,
    };
    c_2(a);
    u();
    setS({
      id: "",
      titulo: "",
      fecha: "",
      hora: "",
      enlace: "",
      deberes: "",
      profesor: "",
      profesorEmail: "",
      estudiantes: "",
    });
    setX(false);
  };
  const f = async (a) => {
    const t = b(e(a));
    const l = d_1(a, t);
    try {
      await navigator.clipboard.writeText(l);
    } catch {
      const o = document.createElement("textarea");
      o.value = l;
      document.body.appendChild(o);
      o.select();
      document.execCommand("copy");
      o.remove();
    }
    setP(a.id);
    setTimeout(() => setP(null), 1500);
  };
  const v = async (a) => {
    const t = b(e(a));
    const text = d_1(a, t);
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Clase: ${a.titulo}`,
          text,
        });
      } catch {}
    } else {
      f(a);
    }
  };
  return (
    <StarfieldBackground>
      <div className="max-w-4xl mx-auto px-4 py-6 min-h-screen relative z-10">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-white/50 hover:text-cyan-400 transition-colors mb-6 text-sm font-bold"
        >
          <ArrowLeftIcon size={16} /> Volver / 返回
        </Link>
        <div className="fx-section-head mt-2">
          <span
            className="fx-kicker"
            style={{
              color: "#66e7ff",
              borderColor: "rgba(0,212,255,.35)",
              background: "rgba(0,212,255,.08)",
              boxShadow: "0 0 22px rgba(0,212,255,.14)",
            }}
          >
            <CalendarIcon size={13} />
            Planificador de Clases · 课程安排
          </span>
          <h1 className="fx-title text-4xl md:text-6xl font-black mb-2">Tus clases</h1>
          <p className="text-white/50 text-lg">
            Crea clases, envía invitaciones por email o WeChat, y recibe confirmaciones
          </p>
          <div className="fx-underline" />
        </div>
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setX((a) => !a)}
            className="fx-btn flex items-center gap-2 px-7 py-3 text-white font-black"
            style={{
              background: "linear-gradient(135deg,#00d4ff,#a855f7)",
              boxShadow: "0 0 30px rgba(0,212,255,.4)",
            }}
          >
            <PlusIcon size={18} /> {x ? "Cerrar formulario" : "Nueva clase / 新建课程"}
          </button>
        </div>
        {x && (
          <div
            className="fx-card p-6 mb-8 space-y-3"
            style={{
              "--fx-accent": "#00d4ff",
              borderColor: "rgba(0,212,255,.3)",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                value={s.titulo}
                onChange={(a) =>
                  setS((t) => ({
                    ...t,
                    titulo: a.target.value,
                  }))
                }
                placeholder="Título de la clase / 课程标题"
                className="px-4 py-3 rounded-xl text-white bg-black/30 border border-white/15 outline-none placeholder:text-white/30"
              />
              <input
                value={s.profesor}
                onChange={(a) =>
                  setS((t) => ({
                    ...t,
                    profesor: a.target.value,
                  }))
                }
                placeholder="Tu nombre (profesor/a) / 老师姓名"
                className="px-4 py-3 rounded-xl text-white bg-black/30 border border-white/15 outline-none placeholder:text-white/30"
              />
              <div className="flex gap-3">
                <input
                  type="date"
                  value={s.fecha}
                  onChange={(a) =>
                    setS((t) => ({
                      ...t,
                      fecha: a.target.value,
                    }))
                  }
                  className="flex-1 px-4 py-3 rounded-xl text-white bg-black/30 border border-white/15 outline-none"
                />
                <input
                  type="time"
                  value={s.hora}
                  onChange={(a) =>
                    setS((t) => ({
                      ...t,
                      hora: a.target.value,
                    }))
                  }
                  className="px-4 py-3 rounded-xl text-white bg-black/30 border border-white/15 outline-none"
                />
              </div>
              <input
                value={s.enlace}
                onChange={(a) =>
                  setS((t) => ({
                    ...t,
                    enlace: a.target.value,
                  }))
                }
                placeholder="Enlace reunión (Zoom/Meet) / 会议链接"
                className="px-4 py-3 rounded-xl text-white bg-black/30 border border-white/15 outline-none placeholder:text-white/30"
              />
              <input
                value={s.deberes}
                onChange={(a) =>
                  setS((t) => ({
                    ...t,
                    deberes: a.target.value,
                  }))
                }
                placeholder="Deberes (texto o enlace) / 作业"
                className="px-4 py-3 rounded-xl text-white bg-black/30 border border-white/15 outline-none placeholder:text-white/30"
              />
              <input
                value={s.profesorEmail}
                onChange={(a) =>
                  setS((t) => ({
                    ...t,
                    profesorEmail: a.target.value,
                  }))
                }
                placeholder="Tu email (para confirmaciones) / 老师邮箱"
                className="px-4 py-3 rounded-xl text-white bg-black/30 border border-white/15 outline-none placeholder:text-white/30"
              />
            </div>
            <input
              value={s.estudiantes}
              onChange={(a) =>
                setS((t) => ({
                  ...t,
                  estudiantes: a.target.value,
                }))
              }
              placeholder="Emails de estudiantes (separados por coma) / 学生邮箱（逗号分隔）"
              className="w-full px-4 py-3 rounded-xl text-white bg-black/30 border border-white/15 outline-none placeholder:text-white/30"
            />
            <button
              onClick={onClick}
              className="w-full py-3 rounded-xl text-white font-black transition-transform hover:scale-[1.01]"
              style={{
                background: "linear-gradient(135deg,#00d4ff,#39ff14)",
              }}
            >
              Crear clase / 创建课程
            </button>
          </div>
        )}
        <div className="space-y-4 fx-stagger">
          {d.length === 0 && (
            <p className="text-center text-white/30 py-10">Aún no hay clases. Crea la primera / 还没有课程</p>
          )}
          {d.map((a) => {
            const t = b(e(a));
            return (
              <div
                key={a.id}
                className="fx-card fx-tilt p-5"
                data-fx-tilt-max="3"
                style={{
                  "--fx-accent": "#00d4ff",
                }}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1">
                    <h3 className="text-white font-black text-lg">{a.titulo}</h3>
                    <p className="text-white/50 text-sm flex items-center gap-1.5">
                      <ClockIcon size={13} /> {a.fecha} · {a.hora}
                    </p>
                    {a.enlace && (
                      <p className="text-white/40 text-xs flex items-center gap-1.5 truncate">
                        <Link2Icon size={11} /> {a.enlace}
                      </p>
                    )}
                    {a.deberes && <p className="text-white/40 text-xs">📚 {a.deberes}</p>}
                  </div>
                  <button
                    onClick={() => {
                      r_2(a.id);
                      u();
                    }}
                    className="p-2 rounded-lg hover:bg-red-500/10 shrink-0"
                  >
                    <Trash2Icon
                      size={15}
                      style={{
                        color: "rgba(255,77,77,.5)",
                      }}
                    />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={a_1(a, t)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black transition-transform hover:scale-105"
                    style={{
                      background: "rgba(0,212,255,.15)",
                      border: "1px solid rgba(0,212,255,.4)",
                      color: "#66e7ff",
                    }}
                  >
                    <MailIcon size={13} /> Enviar por email
                  </a>
                  <button
                    onClick={() => f(a)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black transition-transform hover:scale-105"
                    style={{
                      background: "rgba(57,255,20,.12)",
                      border: "1px solid rgba(57,255,20,.35)",
                      color: "#39ff14",
                    }}
                  >
                    {p === a.id ? <CheckIcon size={13} /> : <CopyIcon size={13} />}{" "}
                    {p === a.id ? "Copiado" : "Copiar invitación"}
                  </button>
                  <button
                    onClick={() => v(a)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black transition-transform hover:scale-105"
                    style={{
                      background: "rgba(168,85,247,.15)",
                      border: "1px solid rgba(168,85,247,.4)",
                      color: "#c084fc",
                    }}
                  >
                    <Share2Icon size={13} /> Compartir (WeChat)
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </StarfieldBackground>
  );
}
export { JComponent as default };
