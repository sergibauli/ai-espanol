import {
  UserIcon,
  CalendarIcon,
  BookOpenIcon,
  XIcon,
  MailIcon,
  ClockIcon,
  Link2Icon,
  CheckIcon,
} from "lucide-react";
import * as React from "react";
import { useSearchParams, Link } from "react-router";
import { StarfieldBackground } from "../components/fx/StarfieldBackground.jsx";
import { f, g } from "../data/clases.js";
function WComponent() {
  const [c] = useSearchParams();
  const s = f(c.get("d") || "");
  const [a, setA] = React.useState(null);
  if (s) {
    return (
      <StarfieldBackground>
        <div className="max-w-lg mx-auto px-4 py-10 min-h-screen relative z-10">
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(0,212,255,.3)",
              boxShadow: "0 0 50px rgba(0,212,255,.12)",
            }}
          >
            <div
              className="p-8 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(0,212,255,.15), rgba(168,85,247,.1))",
              }}
            >
              <p className="text-xs font-black uppercase tracking-wider text-cyan-300 mb-2">
                Invitación a clase · 课程邀请
              </p>
              <h1 className="text-3xl font-black text-white mb-2">{s.titulo}</h1>
              <p className="text-white/50 text-sm flex items-center justify-center gap-1.5">
                <UserIcon size={13} /> {s.profesor || "Tu profesor/a"}
              </p>
            </div>
            <div className="p-8 space-y-4">
              <div
                className="flex items-center gap-3 p-4 rounded-2xl"
                style={{
                  background: "rgba(0,0,0,.25)",
                }}
              >
                <CalendarIcon
                  size={18}
                  style={{
                    color: "#66e7ff",
                  }}
                />
                <div>
                  <p className="text-white/40 text-xs font-bold">Fecha / 日期</p>
                  <p className="text-white font-black">{s.fecha}</p>
                </div>
              </div>
              <div
                className="flex items-center gap-3 p-4 rounded-2xl"
                style={{
                  background: "rgba(0,0,0,.25)",
                }}
              >
                <ClockIcon
                  size={18}
                  style={{
                    color: "#ffb33b",
                  }}
                />
                <div>
                  <p className="text-white/40 text-xs font-bold">Hora / 时间</p>
                  <p className="text-white font-black">{s.hora}</p>
                </div>
              </div>
              {s.enlace && (
                <a
                  href={s.enlace}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-4 rounded-2xl transition-all hover:scale-[1.01]"
                  style={{
                    background: "rgba(57,255,20,.08)",
                    border: "1px solid rgba(57,255,20,.25)",
                  }}
                >
                  <Link2Icon
                    size={18}
                    style={{
                      color: "#39ff14",
                    }}
                  />
                  <div className="flex-1">
                    <p className="text-white/40 text-xs font-bold">Enlace de la reunión / 会议链接</p>
                    <p className="text-green-400 font-bold truncate">{s.enlace}</p>
                  </div>
                </a>
              )}
              {s.deberes && (
                <div
                  className="flex items-start gap-3 p-4 rounded-2xl"
                  style={{
                    background: "rgba(0,0,0,.25)",
                  }}
                >
                  <BookOpenIcon
                    size={18}
                    style={{
                      color: "#c084fc",
                    }}
                  />
                  <div className="flex-1">
                    <p className="text-white/40 text-xs font-bold">Deberes / 作业</p>
                    <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line">{s.deberes}</p>
                  </div>
                </div>
              )}
              {a ? (
                <div
                  className="rounded-2xl p-4 text-center"
                  style={{
                    background: "rgba(57,255,20,.08)",
                    border: "1px solid rgba(57,255,20,.25)",
                  }}
                >
                  <MailIcon
                    size={18}
                    style={{
                      color: "#39ff14",
                      margin: "0 auto 6px",
                    }}
                  />
                  <p className="text-green-400 font-black text-sm">
                    {a === "accept"
                      ? "¡Genial! Se abrirá tu email para confirmar asistencia."
                      : "Se abrirá tu email para notificar que no puedes asistir."}
                  </p>
                  <p className="text-white/40 text-xs mt-1">
                    Envía el email para que tu profesor/a reciba la confirmación.
                  </p>
                </div>
              ) : (
                <div className="flex gap-3 pt-2">
                  <a
                    href={g(s, true)}
                    onClick={() => setA("accept")}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-black transition-transform hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg,#39ff14,#00d4ff)",
                      color: "#04150a",
                    }}
                  >
                    <CheckIcon size={18} /> Aceptar / 接受
                  </a>
                  <a
                    href={g(s, false)}
                    onClick={() => setA("decline")}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl font-black transition-transform hover:scale-105"
                    style={{
                      background: "rgba(255,77,77,.15)",
                      border: "1px solid rgba(255,77,77,.4)",
                      color: "#ff4d4d",
                    }}
                  >
                    <XIcon size={18} /> Rechazar / 拒绝
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <div className="max-w-lg mx-auto px-4 py-20 text-center relative z-10">
        <p className="text-5xl mb-4">🤔</p>
        <h1 className="text-white font-black text-2xl mb-2">Invitación no válida / 无效邀请</h1>
        <p className="text-white/40 text-sm">El enlace no contiene datos de clase válidos.</p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 rounded-full text-white font-black text-sm"
          style={{
            background: "linear-gradient(135deg,#00d4ff,#a855f7)",
          }}
        >
          Ir al inicio / 返回首页
        </Link>
      </div>
    </StarfieldBackground>
  );
}
export { WComponent as default };
