import {
  CpuIcon,
  SparklesIcon,
  BotIcon,
  ArrowLeftIcon,
  ListChecksIcon,
  TargetIcon,
  LoaderCircleIcon,
  CheckIcon,
  PlayIcon,
  GavelIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { c as c_1, e, a as a_1 } from "../../lib/ai-generator.js";
const le = ["A1", "A2", "B1", "B2"];
const ce = [
  {
    key: "planificador",
    label: "Planificador",
    labelZh: "规划者",
    icon: ListChecksIcon,
    color: "#66e7ff",
  },
  {
    key: "generador",
    label: "Generador",
    labelZh: "生成者",
    icon: SparklesIcon,
    color: "#c084fc",
  },
  {
    key: "evaluador",
    label: "Evaluador",
    labelZh: "评估者",
    icon: TargetIcon,
    color: "#39ff14",
  },
  {
    key: "corrector",
    label: "Corrector",
    labelZh: "批改者",
    icon: GavelIcon,
    color: "#ffb33b",
  },
];
const _ =
  "Eres el agente Planificador de un enjambre de agentes de estudio de español. Devuelve SOLO JSON válido, sin markdown.";
const I = "Eres el agente Generador de ejercicios de español. Devuelve SOLO JSON válido, sin markdown.";
const ie = "Eres el agente Corrector de español. Devuelve SOLO JSON válido, sin markdown.";
function HeComponent() {
  const [p, setP] = React.useState("input");
  const [N, setN] = React.useState("");
  const [g, setG] = React.useState("A2");
  const [i, setI] = React.useState([]);
  const [l, setL] = React.useState(0);
  const [f, setF] = React.useState([]);
  const [E, setE] = React.useState({});
  const [j, setJ] = React.useState({});
  const [x, setX] = React.useState(null);
  const [Z, setZ] = React.useState({});
  const [A, setA] = React.useState("");
  const [z, setZ_1] = React.useState(0);
  const o = (a, s) =>
    setZ((r) => ({
      ...r,
      [a]: s,
    }));
  const V = async () => {
    if (!N.trim()) {
      setA("Escribe tu objetivo / 请输入目标");
      return;
    }
    setA("");
    setP("planning");
    o("planificador", "running");
    try {
      const a = `Crea un plan de estudio de 3 pasos para lograr: "${N.trim()}" (nivel ${g}). Devuelve SOLO JSON con esta estructura: {"plan":["paso 1","paso 2","paso 3"]}. Los pasos deben ser concretos y progresivos.`;
      const s = await c_1("enjambre-plan", a, _);
      let r = e(s);
      if (!r?.plan?.length) {
        r = e(await a_1(_, a));
      }
      if (!r?.plan?.length) {
        throw new Error("Plan no válido");
      }
      setI(r.plan.slice(0, 3));
      o("planificador", "done");
      setP("plan");
    } catch (error) {
      setA(error.message);
      setP("input");
      o("planificador", "pending");
    }
  };
  const G = async (a) => {
    setP("practice");
    o("generador", "running");
    setF([]);
    setE({});
    setJ({});
    setX(null);
    try {
      const s = `Genera 4 ejercicios interactivos de español nivel ${g} para practicar: "${a}". Devuelve SOLO JSON con esta estructura: {"ejercicios":[{"tipo":"seleccionar","pregunta":"...","opciones":["a) ...","b) ...","c) ...","d) ..."],"respuesta":0},{"tipo":"completar","pregunta":"Completa: ...","respuesta":"palabra"}]}. Mezcla los dos tipos. "respuesta" en seleccionar es el índice 0-3 de la opción correcta.`;
      const r = await c_1("enjambre-gen", s, I);
      let t = e(r);
      if (!t?.ejercicios?.length) {
        t = e(await a_1(I, s));
      }
      if (!t?.ejercicios?.length) {
        throw new Error("No se pudieron generar ejercicios");
      }
      setF(t.ejercicios.slice(0, 4));
      o("generador", "done");
      o("evaluador", "running");
    } catch (error) {
      setA(error.message);
      setP("plan");
      o("generador", "pending");
    }
  };
  const Y = async () => {
    setP("correcting");
    o("corrector", "running");
    try {
      const a = f.map(
        (t, d) => `Ejercicio ${d + 1} (${t.tipo}): ${t.pregunta}
Respuesta esperada: ${t.tipo === "seleccionar" ? (t.opciones || [])[t.respuesta] : t.respuesta}
Respuesta del estudiante: ${E[d] ?? "(sin responder)"}`,
      ).join(`

`);
      const s = await a_1(
        ie,
        `Corrige estas respuestas de un estudiante de español nivel ${g}:

${a}

Devuelve SOLO JSON: {"nota":0-10,"aciertos":N,"feedback":"2 frases en español de feedback y ánimo"}.`,
      );
      const r = e(s);
      setX(
        r || {
          nota: 5,
          aciertos: 0,
          feedback: "No se pudo corregir.",
        },
      );
      setZ_1((t) => t + (r?.nota || 0));
      o("corrector", "done");
      o("evaluador", "done");
      setP("done");
    } catch (error) {
      setX({
        nota: 5,
        aciertos: 0,
        feedback: `Error al corregir: ${error.message}`,
      });
      o("corrector", "done");
      setP("done");
    }
  };
  const q = () => {
    const a = l + 1;
    if (a >= i.length) {
      setL(a);
      return;
    }
    setL(a);
    G(i[a]);
  };
  const F = () => {
    setP("input");
    setN("");
    setI([]);
    setL(0);
    setF([]);
    setE({});
    setJ({});
    setX(null);
    setZ({});
    setA("");
    setZ_1(0);
  };
  return (
    <StarfieldBackground>
      <div className="max-w-3xl mx-auto px-4 py-6 min-h-screen relative z-10">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-white/50 hover:text-cyan-400 transition-colors mb-6 text-sm font-bold"
        >
          <ArrowLeftIcon size={16} /> Volver / 返回
        </Link>
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-4"
            style={{
              background: "rgba(0,212,255,.14)",
              border: "1px solid rgba(0,212,255,.35)",
            }}
          >
            <CpuIcon
              size={16}
              style={{
                color: "#66e7ff",
              }}
            />
            <span className="text-sm font-black text-white">Enjambre de Agentes · 智能体集群</span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-black text-white mb-2"
            style={{
              textShadow: "0 0 30px rgba(0,212,255,.3)",
            }}
          >
            Enjambre IA
          </h1>
          <p className="text-white/50 text-lg">
            4 agentes autónomos que planifican, generan, evalúan y corrigen por ti
          </p>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-8">
          {ce.map((a) => {
            const s = Z[a.key] || "pending";
            return (
              <div
                key={a.key}
                className="rounded-2xl p-3 text-center"
                style={{
                  background:
                    s === "done"
                      ? `${a.color}15`
                      : s === "running"
                        ? `${a.color}25`
                        : "rgba(255,255,255,.03)",
                  border: `1px solid ${s === "done" || s === "running" ? a.color : "rgba(255,255,255,.1)"}`,
                  boxShadow: s === "running" ? `0 0 25px ${a.color}55` : "none",
                }}
              >
                <a.icon
                  size={18}
                  style={{
                    color: s === "pending" ? "rgba(255,255,255,.3)" : a.color,
                    margin: "0 auto 4px",
                    animation: s === "running" ? "spin 1.5s linear infinite" : "none",
                  }}
                />
                <p
                  className="text-[10px] font-black"
                  style={{
                    color: s === "pending" ? "rgba(255,255,255,.4)" : "#fff",
                  }}
                >
                  {a.label}
                </p>
                <p
                  className="text-[9px]"
                  style={{
                    color: a.color,
                  }}
                >
                  {s === "done" ? "✓" : s === "running" ? "…" : "—"}
                </p>
              </div>
            );
          })}
        </div>
        {p === "input" && (
          <div
            className="rounded-3xl p-8"
            style={{
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.1)",
            }}
          >
            <p className="text-white font-black mb-3">🎯 ¿Qué quieres lograr? / 你的目标是什么？</p>
            <input
              value={N}
              onChange={(a) => setN(a.target.value)}
              placeholder={'Ej: "Dominar el pretérito indefinido" / "Aprender vocabulario de viajes"'}
              className="w-full px-4 py-3 rounded-xl text-white font-bold bg-black/30 border border-white/15 outline-none placeholder:text-white/30 focus:border-cyan-400/50 mb-4"
            />
            <div className="flex gap-2 mb-5">
              {le.map((a) => (
                <button
                  key={a}
                  onClick={() => setG(a)}
                  className="px-5 py-2 rounded-xl text-sm font-black transition-all"
                  style={
                    g === a
                      ? {
                          background: "rgba(0,212,255,.2)",
                          border: "1px solid rgba(0,212,255,.5)",
                          color: "#66e7ff",
                        }
                      : {
                          background: "rgba(255,255,255,.04)",
                          border: "1px solid rgba(255,255,255,.1)",
                          color: "rgba(255,255,255,.5)",
                        }
                  }
                >
                  {a}
                </button>
              ))}
            </div>
            <button
              onClick={V}
              className="flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-black transition-transform hover:scale-105 mx-auto"
              style={{
                background: "linear-gradient(135deg,#00d4ff,#a855f7)",
                boxShadow: "0 0 30px rgba(0,212,255,.4)",
              }}
            >
              <BotIcon size={18} /> Desplegar enjambre / 启动集群
            </button>
            {A && <p className="mt-3 text-red-400 text-sm font-bold">{A}</p>}
          </div>
        )}
        {p === "planning" && (
          <div
            className="rounded-3xl p-10 text-center"
            style={{
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(0,212,255,.3)",
            }}
          >
            <LoaderCircleIcon
              size={32}
              className="animate-spin mx-auto mb-3"
              style={{
                color: "#66e7ff",
              }}
            />
            <p className="text-white font-black">
              El Planificador está creando tu plan... / 规划者正在制定计划
            </p>
          </div>
        )}
        {p === "plan" && (
          <div
            className="rounded-3xl p-8"
            style={{
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(57,255,20,.3)",
            }}
          >
            <h3 className="text-white font-black mb-4">📋 Plan del enjambre / 集群计划</h3>
            <div className="space-y-2 mb-6">
              {i.map((a, s) => (
                <div
                  key={s}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{
                    background: s <= l ? "rgba(57,255,20,.08)" : "rgba(255,255,255,.03)",
                    border: `1px solid ${s <= l ? "rgba(57,255,20,.3)" : "rgba(255,255,255,.08)"}`,
                  }}
                >
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                    style={{
                      background: "rgba(0,212,255,.15)",
                      color: "#66e7ff",
                    }}
                  >
                    {s + 1}
                  </span>
                  <p className="text-white/80 text-sm font-bold flex-1">{a}</p>
                  {s < l && <CheckIcon size={15} color="#39ff14" />}
                </div>
              ))}
            </div>
            {l < i.length ? (
              <button
                onClick={() => G(i[l])}
                className="flex items-center gap-2 px-7 py-3 rounded-full text-white font-black transition-transform hover:scale-105 mx-auto"
                style={{
                  background: "linear-gradient(135deg,#39ff14,#00d4ff)",
                }}
              >
                <PlayIcon size={16} /> Paso {l + 1}: generar práctica / 生成练习
              </button>
            ) : (
              <p className="text-center text-green-400 font-black">
                ✓ Todos los pasos completados. Nota total: {z} / {i.length * 10}
              </p>
            )}
          </div>
        )}
        {p === "practice" && (
          <div
            className="rounded-3xl p-8"
            style={{
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(168,85,247,.3)",
            }}
          >
            <h3 className="text-white font-black mb-2">
              ✍️ Paso {l + 1}: {i[l]}
            </h3>
            <p className="text-white/40 text-xs mb-5">El Generador creó estos ejercicios · 回答下面的练习</p>
            <div className="space-y-3 mb-6">
              {f.map((a, s) => (
                <div
                  key={s}
                  className="p-4 rounded-xl"
                  style={{
                    background: "rgba(0,0,0,.25)",
                  }}
                >
                  <p className="text-white font-bold text-sm mb-2">
                    {s + 1}. {a.pregunta}
                  </p>
                  {a.tipo === "seleccionar" &&
                    (a.opciones || []).map((r, t) => {
                      const d = E[s];
                      const Q = t === a.respuesta;
                      let background = "rgba(255,255,255,.04)";
                      let border = "1px solid rgba(255,255,255,.1)";
                      let color = "rgba(255,255,255,.8)";
                      if (j[s]) {
                        if (Q) {
                          background = "rgba(57,255,20,.15)";
                          border = "1px solid rgba(57,255,20,.5)";
                          color = "#39ff14";
                        } else if (d === t) {
                          background = "rgba(255,77,77,.15)";
                          border = "1px solid rgba(255,77,77,.5)";
                          color = "#ff4d4d";
                        } else {
                          color = "rgba(255,255,255,.35)";
                        }
                      } else if (d === t) {
                        background = "rgba(0,212,255,.2)";
                        border = "1px solid rgba(0,212,255,.6)";
                        color = "#66e7ff";
                      }
                      return (
                        <button
                          key={t}
                          type="button"
                          disabled={j[s]}
                          onClick={() =>
                            setE((H) => ({
                              ...H,
                              [s]: t,
                            }))
                          }
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold mb-1 transition-all"
                          style={{
                            background,
                            border,
                            color,
                          }}
                        >
                          <span
                            style={{
                              color: d === t ? "#66e7ff" : "inherit",
                            }}
                          >
                            {d === t && !j[s] ? "✓ " : ""}
                            {r}
                          </span>
                        </button>
                      );
                    })}
                  {a.tipo === "completar" && (
                    <input
                      value={E[s] || ""}
                      onChange={(r) =>
                        setE((t) => ({
                          ...t,
                          [s]: r.target.value,
                        }))
                      }
                      className="w-full px-3 py-2.5 rounded-xl text-white text-sm bg-black/30 border border-white/15 outline-none focus:border-purple-400/50"
                      placeholder="Tu respuesta / 你的答案"
                    />
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={Y}
              className="flex items-center gap-2 px-7 py-3 rounded-full text-white font-black transition-transform hover:scale-105 mx-auto"
              style={{
                background: "linear-gradient(135deg,#ffb33b,#ff6b35)",
              }}
            >
              <GavelIcon size={16} /> Corregir con el Corrector / AI批改
            </button>
          </div>
        )}
        {p === "correcting" && (
          <div
            className="rounded-3xl p-10 text-center"
            style={{
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,179,59,.3)",
            }}
          >
            <LoaderCircleIcon
              size={32}
              className="animate-spin mx-auto mb-3"
              style={{
                color: "#ffb33b",
              }}
            />
            <p className="text-white font-black">El Corrector evalúa tus respuestas... / 批改者正在评分</p>
          </div>
        )}
        {p === "done" && x && (
          <div
            className="rounded-3xl p-8"
            style={{
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(57,255,20,.3)",
            }}
          >
            <div className="text-center mb-4">
              <p
                className="text-5xl font-black"
                style={{
                  color: x.nota >= 7 ? "#39ff14" : x.nota >= 5 ? "#ffd600" : "#ff4d4d",
                }}
              >
                {x.nota}
              </p>
              <p className="text-white/50 text-sm">/ 10 · aciertos: {x.aciertos}</p>
            </div>
            <div
              className="rounded-xl p-4 mb-4"
              style={{
                background: "rgba(0,0,0,.25)",
              }}
            >
              <p className="text-white/80 text-sm leading-relaxed">{x.feedback}</p>
            </div>
            <div className="mb-5">
              <button
                onClick={() => setJ(Object.fromEntries(f.map((a, s) => [s, true])))}
                className="text-xs font-black text-cyan-300 hover:text-cyan-200"
              >
                Ver soluciones / 查看答案
              </button>
              {f.map(
                (a, s) =>
                  j[s] && (
                    <p
                      key={s}
                      className="text-xs mt-1"
                      style={{
                        color: "#39ff14",
                      }}
                    >
                      {s + 1}. {a.tipo === "seleccionar" ? (a.opciones || [])[a.respuesta] : a.respuesta}
                    </p>
                  ),
              )}
            </div>
            <div className="flex gap-3 justify-center">
              {l + 1 < i.length ? (
                <button
                  onClick={q}
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-black transition-transform hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg,#39ff14,#00d4ff)",
                  }}
                >
                  <PlayIcon size={15} /> Siguiente paso / 下一步
                </button>
              ) : (
                <p className="text-green-400 font-black self-center">
                  🎉 Enjambre completado. Nota total: {z} / {i.length * 10}
                </p>
              )}
              <button
                onClick={F}
                className="px-5 py-3 rounded-full text-sm font-black"
                style={{
                  background: "rgba(255,255,255,.05)",
                  border: "1px solid rgba(255,255,255,.12)",
                  color: "rgba(255,255,255,.6)",
                }}
              >
                Reiniciar / 重来
              </button>
            </div>
          </div>
        )}
        <style>{`
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </StarfieldBackground>
  );
}
export { HeComponent as default };
