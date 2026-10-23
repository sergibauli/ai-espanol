import {
  Volume2Icon,
  XIcon,
  Trash2Icon,
  SquareIcon,
  HeadphonesIcon,
  PlusIcon,
  SaveIcon,
  MessageSquarePlusIcon,
} from "lucide-react";
import * as React from "react";
const H = ["👨", "👩", "👴", "👧", "👦", "👵", "👩‍💼", "👨‍💼", "👮", "👩‍🔬"];
const h = [
  "linear-gradient(135deg, rgba(0,212,255,0.22), rgba(0,212,255,0.08))",
  "linear-gradient(135deg, rgba(255,0,170,0.22), rgba(255,0,170,0.08))",
  "linear-gradient(135deg, rgba(255,214,0,0.22), rgba(255,214,0,0.08))",
  "linear-gradient(135deg, rgba(57,255,20,0.22), rgba(57,255,20,0.08))",
  "linear-gradient(135deg, rgba(255,107,53,0.22), rgba(255,107,53,0.08))",
];
const i = [
  "rgba(0,212,255,0.45)",
  "rgba(255,0,170,0.45)",
  "rgba(255,214,0,0.45)",
  "rgba(57,255,20,0.45)",
  "rgba(255,107,53,0.45)",
];
function VeComponent({ dialogos, moduloId, showChinese = false }) {
  const [b, setB] = React.useState(0);
  const [U, setU] = React.useState({});
  const [k, setK] = React.useState([]);
  const [G, setG] = React.useState(false);
  const [u, setU_1] = React.useState(false);
  const [K, setK_1] = React.useState({});
  const [X, setX] = React.useState({});
  const [Q, setQ] = React.useState(null);
  const [x, setX_1] = React.useState(false);
  const [f, setF] = React.useState("");
  const [F, setF_1] = React.useState("");
  const [c, setC] = React.useState("");
  const [p, setP] = React.useState("");
  const [d, setD] = React.useState([
    {
      personaje: "",
      texto: "",
      traduccion: "",
    },
  ]);
  const S = moduloId ? `dele_custom_dialogos_${moduloId}` : "dele_custom_dialogos_global";
  React.useEffect(() => {
    try {
      const s = localStorage.getItem(S);
      if (s) {
        setK(JSON.parse(s));
      }
    } catch (error) {
      console.error("Error loading custom dialogos:", error);
    }
  }, [S]);
  React.useEffect(
    () => () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    },
    [],
  );
  const C = [...dialogos, ...k];
  const n = C[b] ?? null;
  React.useEffect(() => {
    setU({});
    if (!n?.lineas) {
      return;
    }
    const s = [];
    n.lineas.forEach((t, a) => {
      s.push(
        setTimeout(() => {
          setU((r) => ({
            ...r,
            [a]: true,
          }));
        }, a * 180),
      );
    });
    return () => s.forEach(clearTimeout);
  }, [b, n]);
  const W = (s, personaje) => {
    const r = (s.personajes ?? []).indexOf(personaje);
    if (r >= 0) {
      return r;
    }
    return 0;
  };
  const y = React.useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setQ(null);
    setX_1(false);
  }, []);
  const Z = React.useCallback(
    (s, t) => {
      if (typeof window === "undefined" || !window.speechSynthesis) {
        return;
      }
      y();
      const a = new SpeechSynthesisUtterance(s);
      a.lang = "es-ES";
      a.rate = 0.9;
      a.onstart = () => setQ(t);
      a.onend = () => setQ(null);
      a.onerror = () => setQ(null);
      window.speechSynthesis.speak(a);
    },
    [y],
  );
  const ee = React.useCallback(
    (s) => {
      if (typeof window === "undefined" || !window.speechSynthesis) {
        return;
      }
      y();
      const t = s.lineas || [];
      if (t.length === 0) {
        return;
      }
      setX_1(true);
      let a = 0;
      const r = () => {
        if (a >= t.length) {
          setX_1(false);
          setQ(null);
          return;
        }
        const m = t[a];
        const l = new SpeechSynthesisUtterance(m.texto);
        l.lang = "es-ES";
        l.rate = 0.9;
        l.onstart = () => setQ(a);
        l.onend = () => {
          a++;
          setTimeout(r, 400);
        };
        l.onerror = () => {
          setX_1(false);
          setQ(null);
        };
        window.speechSynthesis.speak(l);
      };
      r();
    },
    [y],
  );
  const te = () => {
    setF("");
    setF_1("");
    setC("");
    setP("");
    setD([
      {
        personaje: "",
        texto: "",
        traduccion: "",
      },
    ]);
  };
  const se = () => {
    te();
    setG(true);
  };
  const V = () => {
    setG(false);
  };
  const ae = () => {
    const s = d.length % 2 === 0 ? c : p;
    setD([
      ...d,
      {
        personaje: s || "",
        texto: "",
        traduccion: "",
      },
    ]);
  };
  const oe = (s) => {
    if (!(d.length <= 1)) {
      setD(d.filter((t, a) => a !== s));
    }
  };
  const J = (s, t, a) => {
    const r = [...d];
    r[s] = {
      ...r[s],
      [t]: a,
    };
    setD(r);
  };
  const le = (s) => {
    const t = [...d];
    const a = t[s].personaje || c;
    t[s] = {
      ...t[s],
      personaje: a === c ? p : c,
    };
    setD(t);
  };
  const re = () => {
    if (!f.trim() || !c.trim() || !p.trim()) {
      return;
    }
    const s = {
      id: `custom-${Date.now()}`,
      titulo: f.trim(),
      tituloChino: F.trim() || f.trim(),
      personajes: [c.trim(), p.trim()],
      lineas: d
        .filter((a) => a.texto.trim())
        .map((a) => ({
          personaje: (a.personaje || c).trim(),
          texto: a.texto.trim(),
          traduccion: a.traduccion.trim(),
        })),
    };
    const t = [...k, s];
    setK(t);
    localStorage.setItem(S, JSON.stringify(t));
    setB(dialogos.length + k.length);
    V();
  };
  const ne = (s) => {
    const t = d[s];
    if (t.personaje) {
      return t.personaje;
    }
    if (s % 2 === 0) {
      return c;
    }
    return p;
  };
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <style>{`
        @keyframes chatPopIn {
          0% { opacity: 0; transform: translateY(20px) scale(0.92); }
          60% { transform: translateY(-4px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes typingDots {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-4px); }
        }
        @keyframes neonPulse {
          0%, 100% { box-shadow: 0 0 5px rgba(255,0,170,0.3), 0 0 10px rgba(255,0,170,0.2); }
          50% { box-shadow: 0 0 15px rgba(255,0,170,0.5), 0 0 30px rgba(255,0,170,0.3); }
        }
        .chat-typing::after {
          content: '...';
          display: inline-block;
          animation: typingDots 1.2s infinite;
          letter-spacing: 2px;
        }
        .glass-modal {
          background: linear-gradient(180deg, rgba(20,24,68,0.95), rgba(10,14,48,0.92));
          border: 1px solid rgba(255,0,170,0.4);
          box-shadow: 0 0 40px rgba(255,0,170,0.15), 0 8px 32px rgba(0,0,0,0.4);
        }
        .neon-input:focus {
          outline: none;
          border-color: rgba(255,0,170,0.6);
          box-shadow: 0 0 12px rgba(255,0,170,0.2);
        }
        .listen-glow {
          animation: neonPulse 2s ease-in-out infinite;
        }
      `}</style>
      <div className="mb-10 text-center">
        <h1
          className="text-4xl md:text-5xl font-black text-white mb-3"
          style={{
            textShadow: "0 0 40px rgba(255,0,170,0.25), 0 0 80px rgba(255,0,170,0.1)",
          }}
        >
          Diálogos
        </h1>
        <div
          className="h-1.5 w-32 mx-auto rounded-full mb-4"
          style={{
            background: "linear-gradient(90deg, #ff00aa, #ffd600)",
          }}
        />
      </div>
      <div className="flex justify-center mb-6">
        <button
          onClick={se}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold text-white transition-all hover:scale-105"
          style={{
            background: "linear-gradient(135deg, rgba(255,0,170,0.2), rgba(255,107,53,0.15))",
            border: "1px solid rgba(255,0,170,0.4)",
            boxShadow: "0 0 20px rgba(255,0,170,0.15)",
          }}
        >
          <MessageSquarePlusIcon size={18} />
          Crear diálogo / 创建对话
        </button>
      </div>
      {C.length > 1 && (
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {C.map((s, t) => {
            const a = t >= dialogos.length;
            return (
              <button
                key={t}
                onClick={() => setB(t)}
                className="px-5 py-2.5 rounded-2xl text-base md:text-lg font-bold transition-all"
                style={{
                  background: b === t ? "rgba(255,0,170,0.15)" : "rgba(255,255,255,0.04)",
                  border: b === t ? "1px solid rgba(255,0,170,0.4)" : "1px solid rgba(255,255,255,0.06)",
                  color: b === t ? "#ff00aa" : a ? "rgba(255,214,0,0.7)" : "rgba(255,255,255,0.5)",
                  backdropFilter: "blur(12px)",
                  transform: b === t ? "translateY(-2px) scale(1.03)" : "none",
                  boxShadow: b === t ? "0 0 24px rgba(255,0,170,0.15)" : "none",
                }}
              >
                {s.titulo}
                {a && <span className="ml-2 text-xs opacity-60">✨</span>}
              </button>
            );
          })}
        </div>
      )}
      {n && (
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{n.titulo}</h2>
          {showChinese && (
            <p
              className="text-base md:text-lg font-bold"
              style={{
                color: "#00d4ff",
                textShadow: "0 0 12px rgba(0,212,255,0.3)",
              }}
            >
              {n.tituloChino}
            </p>
          )}
          <div className="flex gap-2 justify-center mt-4 flex-wrap">
            {(n.personajes ?? []).map((s, t) => (
              <span
                key={t}
                className="px-4 py-1.5 rounded-full text-sm font-bold"
                style={{
                  background: h[t % h.length],
                  border: `1px solid ${i[t % i.length]}`,
                  color: "#fff",
                  boxShadow: `0 0 12px ${i[t % i.length]}40`,
                }}
              >
                {s}
              </span>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => {
                if (x) {
                  return y();
                }
                return ee(n);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 ${x ? "listen-glow" : ""}`}
              style={{
                background: x ? "rgba(255,0,170,0.2)" : "rgba(0,212,255,0.1)",
                border: x ? "1px solid rgba(255,0,170,0.5)" : "1px solid rgba(0,212,255,0.3)",
                color: x ? "#ff00aa" : "#00d4ff",
                boxShadow: x ? "0 0 20px rgba(255,0,170,0.2)" : "0 0 15px rgba(0,212,255,0.15)",
              }}
            >
              {x ? <SquareIcon size={16} /> : <HeadphonesIcon size={16} />}
              {x ? "Detener / 停止" : "Escuchar diálogo / 听对话"}
            </button>
            <button
              onClick={() => {
                setU_1((s) => !s);
                setK_1({});
                setX({});
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 ${u ? "listen-glow" : ""}`}
              style={{
                background: u ? "rgba(57,255,20,0.2)" : "rgba(255,255,255,0.06)",
                border: u ? "1px solid rgba(57,255,20,0.5)" : "1px solid rgba(255,255,255,0.15)",
                color: u ? "#39ff14" : "rgba(255,255,255,0.7)",
                boxShadow: u ? "0 0 20px rgba(57,255,20,0.2)" : "none",
              }}
            >
              <MessageSquarePlusIcon size={16} />
              {u ? "Modo práctica ON / 练习中" : "Practicar role-play / 角色扮演"}
            </button>
          </div>
        </div>
      )}
      {n?.lineas && (
        <div className="space-y-4">
          {n.lineas.map((s, t) => {
            const a = W(n, s.personaje);
            const r = t % 2 === 0;
            const m = a === 1;
            const l = a % h.length;
            const Y = U[t];
            const w = Q === t;
            return (
              <div
                key={t}
                className="flex flex-col"
                style={{
                  alignItems: r ? "flex-start" : "flex-end",
                  opacity: Y ? 1 : 0,
                  animation: Y ? `chatPopIn 0.6s ease-out ${t * 0.08}s both` : "none",
                }}
              >
                <div className="max-w-[85%] md:max-w-[75%]">
                  <div className="flex items-center gap-2 mb-1 px-2">
                    <span
                      className="w-9 h-9 rounded-full flex items-center justify-center text-base"
                      style={{
                        background: h[l],
                        border: `2px solid ${i[l]}`,
                        boxShadow: `0 0 16px ${i[l]}60`,
                      }}
                    >
                      {H[a % H.length]}
                    </span>
                    <span
                      className="text-sm font-bold"
                      style={{
                        color: i[l],
                      }}
                    >
                      {s.personaje}
                    </span>
                  </div>
                  <div
                    className="relative rounded-2xl px-5 py-4 md:px-6 md:py-5"
                    style={{
                      background: h[l],
                      border: `1.5px solid ${i[l]}`,
                      backdropFilter: "blur(12px)",
                      boxShadow: `0 8px 32px rgba(0,0,0,0.25), 0 0 20px ${i[l]}30, inset 0 1px 0 rgba(255,255,255,0.08)`,
                    }}
                  >
                    <button
                      onClick={() => Z(s.texto, t)}
                      className={`absolute top-2 right-2 p-1.5 rounded-full transition-all hover:scale-110 ${w ? "listen-glow" : ""}`}
                      style={{
                        background: w ? "rgba(255,0,170,0.25)" : "rgba(255,255,255,0.06)",
                        border: w ? "1px solid rgba(255,0,170,0.5)" : "1px solid rgba(255,255,255,0.1)",
                        boxShadow: w ? "0 0 12px rgba(255,0,170,0.4)" : "none",
                      }}
                      title="Escuchar / 听"
                    >
                      <Volume2Icon
                        size={14}
                        style={{
                          color: w ? "#ff00aa" : "rgba(255,255,255,0.5)",
                        }}
                      />
                    </button>
                    {u && m && !X[t] ? (
                      <div className="pr-2">
                        <input
                          value={K[t] || ""}
                          onChange={(E) =>
                            setK_1((ie) => ({
                              ...ie,
                              [t]: E.target.value,
                            }))
                          }
                          placeholder="Tu respuesta / 写下你的回答..."
                          className="w-full px-3 py-2 rounded-xl text-white text-sm font-bold bg-black/30 border border-white/15 focus:border-pink-400/50 focus:outline-none placeholder:text-white/30"
                        />
                        <button
                          onClick={() =>
                            setX((E) => ({
                              ...E,
                              [t]: true,
                            }))
                          }
                          className="mt-2 text-xs font-bold"
                          style={{
                            color: "#ff00aa",
                          }}
                        >
                          Ver respuesta / 显示答案
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="text-base md:text-lg text-white font-bold leading-relaxed mb-1 pr-8">
                          {s.texto}
                        </p>
                        {showChinese && (
                          <p
                            className="text-sm md:text-base font-medium"
                            style={{
                              color: "rgba(255,255,255,0.55)",
                            }}
                          >
                            {s.traduccion}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {!n && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4 opacity-30">💬</div>
          <p className="text-white/40 font-medium">No hay diálogos disponibles</p>
        </div>
      )}
      {G && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="glass-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 md:p-8 relative">
            <button
              onClick={V}
              className="absolute top-4 right-4 p-2 rounded-full transition-all hover:scale-110"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <XIcon
                size={18}
                style={{
                  color: "rgba(255,255,255,0.6)",
                }}
              />
            </button>
            <h2
              className="text-2xl md:text-3xl font-black text-white mb-1 text-center"
              style={{
                textShadow: "0 0 20px rgba(255,0,170,0.3)",
              }}
            >
              Crear diálogo
            </h2>
            <p
              className="text-center text-sm font-bold mb-6"
              style={{
                color: "rgba(255,255,255,0.4)",
              }}
            >
              创建对话
            </p>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-white/60 mb-1.5">
                  Título del diálogo / 对话标题
                </label>
                <input
                  type="text"
                  value={f}
                  onChange={(s) => setF(s.target.value)}
                  placeholder="Ej: En el restaurante"
                  className="neon-input w-full px-4 py-3 rounded-xl text-white text-sm font-medium bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] transition-all placeholder:text-white/30"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/60 mb-1.5">
                  Título en chino / 中文标题
                </label>
                <input
                  type="text"
                  value={F}
                  onChange={(s) => setF_1(s.target.value)}
                  placeholder="在餐厅"
                  className="neon-input w-full px-4 py-3 rounded-xl text-white text-sm font-medium bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] transition-all placeholder:text-white/30"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white/60 mb-1.5">Personaje 1 / 角色1</label>
                  <input
                    type="text"
                    value={c}
                    onChange={(s) => setC(s.target.value)}
                    placeholder="María"
                    className="neon-input w-full px-4 py-3 rounded-xl text-white text-sm font-medium bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] transition-all placeholder:text-white/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/60 mb-1.5">Personaje 2 / 角色2</label>
                  <input
                    type="text"
                    value={p}
                    onChange={(s) => setP(s.target.value)}
                    placeholder="Juan"
                    className="neon-input w-full px-4 py-3 rounded-xl text-white text-sm font-medium bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] transition-all placeholder:text-white/30"
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-white/80">Líneas del diálogo / 对话内容</h3>
                <button
                  onClick={ae}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white transition-all hover:scale-105"
                  style={{
                    background: "rgba(0,212,255,0.15)",
                    border: "1px solid rgba(0,212,255,0.3)",
                  }}
                >
                  <PlusIcon size={14} /> Añadir línea / 添加行
                </button>
              </div>
              <div className="space-y-3">
                {d.map((s, t) => {
                  const a = ne(t);
                  const r = a === p ? 1 : 0;
                  const m = r % h.length;
                  return (
                    <div
                      key={t}
                      className="rounded-xl p-3 transition-all"
                      style={{
                        background: h[m],
                        border: `1.5px solid ${i[m]}`,
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <button
                          onClick={() => le(t)}
                          className="px-2 py-0.5 rounded-md text-xs font-bold transition-all hover:scale-105"
                          style={{
                            background: "rgba(0,0,0,0.2)",
                            color: "#fff",
                            border: `1px solid ${i[m]}`,
                          }}
                        >
                          {a || `P${r + 1}`}
                        </button>
                        {d.length > 1 && (
                          <button
                            onClick={() => oe(t)}
                            className="p-1 rounded-md transition-all hover:scale-110"
                            style={{
                              background: "rgba(255,0,0,0.15)",
                              border: "1px solid rgba(255,0,0,0.3)",
                            }}
                          >
                            <Trash2Icon
                              size={12}
                              style={{
                                color: "rgba(255,100,100,0.8)",
                              }}
                            />
                          </button>
                        )}
                      </div>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={s.texto}
                          onChange={(l) => J(t, "texto", l.target.value)}
                          placeholder="Texto en español / 西班牙语文本"
                          className="neon-input w-full px-3 py-2 rounded-lg text-white text-sm font-medium bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.1)] transition-all placeholder:text-white/30"
                        />
                        <input
                          type="text"
                          value={s.traduccion}
                          onChange={(l) => J(t, "traduccion", l.target.value)}
                          placeholder="Traducción al chino / 中文翻译"
                          className="neon-input w-full px-3 py-2 rounded-lg text-white text-sm font-medium bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.1)] transition-all placeholder:text-white/30"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={re}
                disabled={!f.trim() || !c.trim() || !p.trim()}
                className="flex items-center gap-2 px-8 py-3 rounded-2xl text-sm font-bold text-white transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  background: "linear-gradient(135deg, rgba(255,0,170,0.25), rgba(0,212,255,0.2))",
                  border: "1px solid rgba(255,0,170,0.5)",
                  boxShadow: "0 0 25px rgba(255,0,170,0.2)",
                }}
              >
                <SaveIcon size={18} />
                Guardar diálogo / 保存对话
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export { VeComponent as default };
