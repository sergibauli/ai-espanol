import { Trash2Icon, XIcon, UserIcon, BotIcon, Volume2Icon, MicIcon, SendIcon } from "lucide-react";
import * as React from "react";
import {
  getCachedAnswer,
  speakSpanish,
  DEEPSEEK_API_KEY,
  buildTutorSystemPrompt,
  CHAT_HISTORY_TURNS,
  cacheAnswer,
} from "../lib/aiTutor.js";
function TutorAvatar({ size, talking }) {
  return (
    <>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "9999px",
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
          background: "#1a1330",
          boxShadow: talking
            ? "0 0 24px rgba(255,179,59,.65), 0 0 48px rgba(255,107,26,.3)"
            : "0 0 16px rgba(255,179,59,.35)",
          animation: talking ? "mascotTalk 0.35s ease-in-out infinite" : "none",
        }}
      >
        <video
          src="./mascota-reymono.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "9999px",
            boxShadow: "inset 0 0 10px rgba(0,0,0,.45)",
          }}
        />
      </div>
      <style>{`
        @keyframes mascotTalk {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }
      `}</style>
    </>
  );
}
const CHAT_HISTORY_KEY = "dele_chat_history_v1";
const TUTOR_GREETING =
  "¡Hola! 👋 Soy tu tutor de español. ¿Qué nivel DELE estás preparando? / 你好！我是你的西语导师，你在准备哪个级别？";
function loadChatHistory() {
  try {
    const i = localStorage.getItem(CHAT_HISTORY_KEY);
    if (i) {
      const t = JSON.parse(i);
      if (Array.isArray(t) && t.length > 0) {
        return t;
      }
    }
  } catch {}
  return [
    {
      role: "assistant",
      content: TUTOR_GREETING,
      timestamp: Date.now(),
    },
  ];
}
function TutorChat() {
  const [i, setI] = React.useState(false);
  const [c, setC] = React.useState(loadChatHistory);
  const [s, setS] = React.useState("");
  const [m, setM] = React.useState(false);
  const [v, setV] = React.useState(false);
  const ERef = React.useRef(null);
  const jRef = React.useRef(null);
  const _RefRef = React.useRef(null);
  React.useEffect(() => {
    try {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(c.slice(-50)));
    } catch {}
  }, [c]);
  React.useEffect(() => {
    ERef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [c, i]);
  React.useEffect(() => {
    if (i && jRef.current) {
      setTimeout(() => jRef.current?.focus(), 300);
    }
  }, [i]);
  const A = async (P) => {
    const H = (P ?? s).trim();
    if (!H || m) {
      return;
    }
    const Q = {
      role: "user",
      content: H,
      timestamp: Date.now(),
    };
    setC((X) => [...X, Q]);
    setS("");
    setM(true);
    const ae = getCachedAnswer(Q.content);
    if (ae) {
      setC((X) => [
        ...X,
        {
          role: "assistant",
          content: ae,
          timestamp: Date.now(),
        },
      ]);
      speakSpanish(ae);
      setM(false);
      return;
    }
    try {
      const X = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: buildTutorSystemPrompt(Q.content),
            },
            ...c
              .filter((ce) => ce.role !== "system")
              .slice(-CHAT_HISTORY_TURNS)
              .map((ce) => ({
                role: ce.role,
                content: ce.content,
              })),
            {
              role: "user",
              content: Q.content,
            },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });
      if (!X.ok) {
        const ce = await X.json().catch(() => ({}));
        throw new Error(ce.error?.message || `Error HTTP ${X.status}`);
      }
      const G =
        (await X.json()).choices?.[0]?.message?.content || "Lo siento, no pude generar una respuesta.";
      setC((ce) => [
        ...ce,
        {
          role: "assistant",
          content: G,
          timestamp: Date.now(),
        },
      ]);
      cacheAnswer(Q.content, G);
      speakSpanish(G);
    } catch (error) {
      setC((se) => [
        ...se,
        {
          role: "assistant",
          content: `❌ Error: ${error.message}

请稍后重试。`,
          timestamp: Date.now(),
        },
      ]);
    }
    setM(false);
  };
  const onKeyDown = (P) => {
    if (P.key === "Enter" && !P.shiftKey) {
      P.preventDefault();
      A();
    }
  };
  const z = () => {
    const P = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!P) {
      alert("Tu navegador no soporta reconocimiento de voz / 浏览器不支持语音识别");
      return;
    }
    if (v) {
      _RefRef.current?.stop();
      setV(false);
      return;
    }
    const H = new P();
    H.lang = "es-ES";
    H.interimResults = false;
    H.maxAlternatives = 1;
    H.onresult = (Q) => {
      const ae = Q.results?.[0]?.[0]?.transcript || "";
      if (ae) {
        setS(ae);
        A(ae);
      }
    };
    H.onend = () => setV(false);
    H.onerror = () => setV(false);
    _RefRef.current = H;
    try {
      H.start();
      setV(true);
    } catch {
      setV(false);
    }
  };
  const R = () => {
    setC([
      {
        role: "assistant",
        content: TUTOR_GREETING,
        timestamp: Date.now(),
      },
    ]);
    try {
      localStorage.removeItem(CHAT_HISTORY_KEY);
    } catch {}
  };
  return (
    <>
      {!i && (
        <button
          onClick={() => setI(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          style={{
            background: "linear-gradient(135deg, #1a365d 0%, #0d1b2a 50%, #1a365d 100%)",
            border: "2px solid rgba(100, 180, 255, 0.4)",
            boxShadow: "0 0 30px rgba(0, 150, 255, 0.3), inset 0 0 20px rgba(0, 100, 200, 0.1)",
          }}
        >
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{
              background: "rgba(0, 150, 255, 0.5)",
            }}
          />
          <TutorAvatar size={52} talking={m} />
        </button>
      )}
      {i && (
        <div
          className="fixed bottom-6 right-6 z-50 w-[380px] h-[550px] rounded-2xl flex flex-col overflow-hidden transition-all duration-300"
          style={{
            background: "linear-gradient(180deg, #0a0e27 0%, #050814 100%)",
            border: "1px solid rgba(100, 180, 255, 0.2)",
            boxShadow: "0 0 60px rgba(0, 100, 255, 0.15), 0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{
              background: "linear-gradient(135deg, rgba(30, 58, 138, 0.4), rgba(15, 23, 42, 0.6))",
              borderBottom: "1px solid rgba(100, 180, 255, 0.15)",
            }}
          >
            <div className="flex items-center gap-2">
              <TutorAvatar size={32} talking={m} />
              <div>
                <h3 className="text-white font-bold text-sm">DeepSeek Tutor</h3>
                <p className="text-blue-400/60 text-[10px]">AI Español · DELE Prep</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={R}
                className="p-1.5 rounded-lg transition-all hover:bg-white/10"
                title="Limpiar chat"
              >
                <Trash2Icon
                  size={14}
                  style={{
                    color: "rgba(255,255,255,0.5)",
                  }}
                />
              </button>
              <button
                onClick={() => setI(false)}
                className="p-1.5 rounded-lg transition-all hover:bg-white/10"
              >
                <XIcon
                  size={16}
                  style={{
                    color: "rgba(255,255,255,0.5)",
                  }}
                />
              </button>
            </div>
          </div>
          <div
            className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
            style={{
              scrollbarWidth: "thin",
            }}
          >
            {c.map((P, H) => (
              <div key={H} className={`flex gap-2 ${P.role === "user" ? "flex-row-reverse" : ""}`}>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    background:
                      P.role === "user"
                        ? "linear-gradient(135deg, #f97316, #ea580c)"
                        : "linear-gradient(135deg, #1e40af, #3b82f6)",
                    boxShadow:
                      P.role === "user"
                        ? "0 0 10px rgba(249, 115, 22, 0.3)"
                        : "0 0 10px rgba(59, 130, 246, 0.3)",
                  }}
                >
                  {P.role === "user" ? (
                    <UserIcon size={12} color="#fff" />
                  ) : (
                    <BotIcon size={12} color="#fff" />
                  )}
                </div>
                <div
                  className="max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap"
                  style={{
                    background:
                      P.role === "user"
                        ? "linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(234, 88, 12, 0.08))"
                        : "linear-gradient(135deg, rgba(30, 58, 138, 0.2), rgba(15, 23, 42, 0.15))",
                    border:
                      P.role === "user"
                        ? "1px solid rgba(249, 115, 22, 0.2)"
                        : "1px solid rgba(100, 180, 255, 0.15)",
                    color: P.role === "user" ? "#fdba74" : "#e2e8f0",
                    borderRadius: P.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  }}
                >
                  {P.content}
                  {P.role === "assistant" && (
                    <button
                      onClick={() => speakSpanish(P.content)}
                      className="flex items-center gap-1 mt-1.5 px-2 py-1 rounded-lg text-[10px] font-bold transition-all hover:scale-105"
                      style={{
                        background: "rgba(59,130,246,0.15)",
                        border: "1px solid rgba(100,180,255,0.2)",
                        color: "#93c5fd",
                      }}
                      title="Escuchar / 朗读"
                    >
                      <Volume2Icon size={11} /> Escuchar
                    </button>
                  )}
                </div>
              </div>
            ))}
            {m && (
              <div className="flex gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #1e40af, #3b82f6)",
                  }}
                >
                  <BotIcon size={12} color="#fff" />
                </div>
                <div
                  className="px-3 py-2 rounded-2xl"
                  style={{
                    background: "rgba(30, 58, 138, 0.15)",
                    border: "1px solid rgba(100, 180, 255, 0.1)",
                    borderRadius: "16px 16px 16px 4px",
                  }}
                >
                  <div className="flex gap-1">
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"
                      style={{
                        animationDelay: "0ms",
                      }}
                    />
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"
                      style={{
                        animationDelay: "150ms",
                      }}
                    />
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"
                      style={{
                        animationDelay: "300ms",
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={ERef} />
          </div>
          <div
            className="px-3 py-3 shrink-0"
            style={{
              borderTop: "1px solid rgba(100, 180, 255, 0.1)",
              background: "linear-gradient(180deg, transparent, rgba(10, 14, 39, 0.8))",
            }}
          >
            <div className="flex gap-2">
              <input
                ref={jRef}
                value={s}
                onChange={(P) => setS(P.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Escribe en español o 中文..."
                className="flex-1 px-4 py-2.5 rounded-xl text-xs text-white outline-none transition-all"
                style={{
                  background: "rgba(0, 0, 0, 0.4)",
                  border: "1px solid rgba(100, 180, 255, 0.15)",
                }}
                disabled={m}
              />
              <button
                onClick={z}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-105 shrink-0 ${v ? "animate-pulse" : ""}`}
                style={{
                  background: v ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.06)",
                  border: `1px solid ${v ? "rgba(239,68,68,0.5)" : "rgba(100,180,255,0.15)"}`,
                }}
                title="Hablar / 语音输入"
              >
                <MicIcon size={14} color={v ? "#ff4d4d" : "#93c5fd"} />
              </button>
              <button
                onClick={() => A()}
                disabled={!s.trim() || m}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-30 hover:scale-105"
                style={{
                  background:
                    s.trim() && !m ? "linear-gradient(135deg, #2563eb, #1d4ed8)" : "rgba(100, 100, 100, 0.2)",
                  boxShadow: s.trim() && !m ? "0 0 15px rgba(37, 99, 235, 0.3)" : "none",
                }}
              >
                <SendIcon size={14} color="#fff" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export { TutorChat };
