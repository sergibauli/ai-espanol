import {
  Volume2Icon,
  MicIcon,
  UserIcon,
  HeadphonesIcon,
  SkipBackIcon,
  PauseIcon,
  PlayIcon,
  SkipForwardIcon,
  GaugeIcon,
  FileTextIcon,
  RadioIcon,
} from "lucide-react";
import * as React from "react";
import { useLanguage } from "../lib/i18n.jsx";
function KComponent() {
  return (
    <style>{`
      @keyframes gradientRotate {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `}</style>
  );
}
function XComponent() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
      }}
    />
  );
}
function EeComponent() {
  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] pointer-events-none z-50"
      style={{
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
      }}
    />
  );
}
const $ = [
  {
    id: 1,
    title: "Presentaciones / 自我介绍",
    titleCn: "自我介绍",
    audioUrl: "",
    duration: 180,
    transcription:
      "Buenos dias. Me llamo Ana y soy de Madrid. Tengo veinticinco anos y trabajo como profesora de espanol. Me gusta mucho viajar y conocer gente nueva. En mi tiempo libre, me encanta leer libros y escuchar musica. Hoy os voy a hablar de mi ciudad favorita: Barcelona. Barcelona es una ciudad maravillosa situada en la costa mediterranea de Espana. Es famosa por su arquitectura, especialmente las obras de Antoni Gaudi como la Sagrada Familia. El clima es muy agradable durante todo el ano y la comida es excelente. Os recomiendo visitar el Barrio Gotico y probar la paella en un restaurante junto al mar.",
    questions: [
      {
        q: "Cuantos anos tiene Ana? / Ana几岁了？",
        options: ["20 anos", "25 anos", "30 anos", "35 anos"],
        correct: 1,
      },
      {
        q: "De donde es Ana? / Ana来自哪里？",
        options: ["Barcelona", "Valencia", "Madrid", "Sevilla"],
        correct: 2,
      },
      {
        q: "Cual es su profesion? / 她的职业是什么？",
        options: ["Doctora", "Profesora", "Ingeniera", "Abogada"],
        correct: 1,
      },
    ],
    difficulty: "easy",
  },
  {
    id: 2,
    title: "En el restaurante / 在餐厅",
    titleCn: "在餐厅",
    audioUrl: "",
    duration: 240,
    transcription:
      "Buenas tardes. ?Tienen mesa para dos personas? Si, por supuesto. ?Pueden seguirme, por favor? Aqui tienen la carta. Les traigo algo de beber mientras eligen. ?Que van a tomar? Yo quiero una cerveza fria, por favor. Y para mi, un vaso de agua sin gas. Muy bien. ?Ya saben que van a comer? Me gustaria probar la paella valenciana. Y yo, el pescado del dia con verduras a la plancha. Excelente eleccion. ?Les gustaria algun postre? No, gracias. Solo el cafe. Para mi, la cuenta, por favor.",
    questions: [
      {
        q: "Cuantas personas son? / 几个人？",
        options: ["Una", "Dos", "Tres", "Cuatro"],
        correct: 1,
      },
      {
        q: "Que bebe la primera persona? / 第一个人喝什么？",
        options: ["Agua", "Vino", "Cerveza", "Zumo"],
        correct: 2,
      },
      {
        q: "Que pide la segunda persona de comer? / 第二个人点什么吃的？",
        options: ["Paella", "Pescado", "Carne", "Pasta"],
        correct: 1,
      },
    ],
    difficulty: "easy",
  },
  {
    id: 3,
    title: "Dar direcciones / 指路",
    titleCn: "指路",
    audioUrl: "",
    duration: 200,
    transcription:
      "Perdone, ?sabe donde esta la estacion de tren? Si, claro. Siga todo recto por esta calle hasta llegar al semaforo. Alli, gire a la derecha y continue dos calles mas. Vera un gran edificio blanco a su izquierda, esa es la estacion. No puede perdersela. Si prefiere, tambien puede tomar el autobus numero 15, que le deja justo enfrente. El viaje dura unos diez minutos. Muchas gracias por su ayuda. De nada, que tenga un buen dia.",
    questions: [
      {
        q: "Donde debe girar? / 应该在哪里转弯？",
        options: ["A la izquierda", "A la derecha", "Todo recto", "De vuelta"],
        correct: 1,
      },
      {
        q: "Que numero de autobus puede tomar? / 可以坐几路公交车？",
        options: ["10", "12", "15", "20"],
        correct: 2,
      },
      {
        q: "Cuanto dura el viaje en autobus? / 公交旅程多久？",
        options: ["5 minutos", "10 minutos", "15 minutos", "20 minutos"],
        correct: 1,
      },
    ],
    difficulty: "medium",
  },
];
function useAe() {
  const [n, setN] = React.useState([]);
  React.useEffect(() => {
    const x = () => {
      const u = window.speechSynthesis.getVoices();
      const r = u
        .filter((t) => t.lang.startsWith("es"))
        .map((voice, c) => ({
          name: voice.name,
          voice,
          label: voice.name.replace(/Microsoft |Google |Spanish /gi, "").slice(0, 20),
          gender: voice.name.match(/female|Helena|Laura|Paulina/i)
            ? "F"
            : voice.name.match(/male|Pablo|Roberto|Diego/i)
              ? "M"
              : c % 2
                ? "F"
                : "M",
          pace: voice.name.match(/premium|enhanced/i)
            ? "Calmada"
            : voice.name.match(/standard/i)
              ? "Normal"
              : ["Paussada", "Calmada", "Natural", "Fluida"][c % 4],
        }));
      setN(
        r.length > 0
          ? r
          : [
              {
                name: "default",
                voice: u[0],
                label: "Por defecto",
                gender: "F",
                pace: "Natural",
              },
            ],
      );
    };
    x();
    window.speechSynthesis.onvoiceschanged = x;
  }, []);
  return n;
}
function SeComponent({ isPlaying }) {
  const s = React.useMemo(
    () =>
      Array.from(
        {
          length: 60,
        },
        (o, id) => ({
          id,
          baseHeight: 15 + Math.sin(id * 0.3) * 25 + Math.random() * 20,
        }),
      ),
    [],
  );
  const [x, setX] = React.useState(s.map((o) => o.baseHeight * 0.3));
  React.useEffect(() => {
    if (!isPlaying) {
      setX(s.map((r) => r.baseHeight * 0.3));
      return;
    }
    const o = setInterval(() => {
      setX(s.map((r) => r.baseHeight + Math.random() * 55));
    }, 80);
    return () => clearInterval(o);
  }, [isPlaying]);
  return (
    <div className="h-28 flex items-center justify-center gap-[2px] px-4 overflow-hidden">
      {s.map((o, r) => (
        <div
          key={o.id}
          className="w-[3px] rounded-full transition-all duration-75"
          style={{
            height: `${Math.min(x[r], 100)}%`,
            background: isPlaying
              ? "linear-gradient(to top, #059669, #34d399, #a7f3d0)"
              : "rgba(255,255,255,0.08)",
            opacity: isPlaying ? 0.6 + x[r] / 200 : 0.4,
          }}
        />
      ))}
    </div>
  );
}
function TeComponent({ voices, selectedVoice, onSelect }) {
  const u = ["#10b981", "#06b6d4", "#8b5cf6", "#ec4899", "#f59e0b", "#f97316"];
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {voices.map((o, r) => {
        const t = u[r % u.length];
        const c = selectedVoice === r;
        return (
          <button
            key={r}
            onClick={() => onSelect(r)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105"
            style={{
              background: c ? `${t}15` : "rgba(255,255,255,0.03)",
              border: `1px solid ${c ? `${t}40` : "rgba(255,255,255,0.06)"}`,
              color: c ? t : "rgba(255,255,255,0.3)",
              boxShadow: c ? `0 0 12px ${t}10` : "none",
            }}
          >
            <UserIcon
              size={12}
              style={{
                color: t,
              }}
            />
            <span>{o.label}</span>
            <span
              className="text-[9px] px-1.5 py-0.5 rounded"
              style={{
                background: c ? `${t}20` : "rgba(255,255,255,0.03)",
                color: c ? `${t}80` : "rgba(255,255,255,0.15)",
              }}
            >
              {o.gender === "F" ? "F" : "M"}
            </span>
            <span className="text-[9px] opacity-60">{o.pace}</span>
          </button>
        );
      })}
    </div>
  );
}
function XeComponent() {
  const { t } = useLanguage();
  const [s, setS] = React.useState($[0]);
  const [u, setU] = React.useState(false);
  const [r, setR] = React.useState(0);
  const [c, setC] = React.useState(1);
  const [v, setV] = React.useState(false);
  const [w, setW] = React.useState(false);
  const [h, setH] = React.useState([]);
  const [p, setP] = React.useState(false);
  const [S, setS_1] = React.useState(0);
  const bRef = React.useRef(null);
  const TRef = React.useRef(null);
  const voices = useAe();
  React.useEffect(
    () => () => {
      if (bRef.current) {
        clearInterval(bRef.current);
      }
      window.speechSynthesis.cancel();
    },
    [],
  );
  React.useEffect(() => {
    setR(0);
    setU(false);
    setH([]);
    setP(false);
    window.speechSynthesis.cancel();
  }, [s]);
  const onClick = () => {
    if (!("speechSynthesis" in window)) {
      return;
    }
    if (u) {
      window.speechSynthesis.cancel();
      if (bRef.current) {
        clearInterval(bRef.current);
      }
      setU(false);
      return;
    }
    const a = new SpeechSynthesisUtterance(s.transcription);
    a.lang = "es-ES";
    a.rate = c;
    if (voices[S]?.voice) {
      a.voice = voices[S].voice;
    }
    TRef.current = a;
    const l = Date.now();
    const d = (s.duration * 1000) / c;
    setU(true);
    a.onend = () => {
      setU(false);
      setR(100);
      if (bRef.current) {
        clearInterval(bRef.current);
      }
    };
    a.onerror = () => {
      setU(false);
      if (bRef.current) {
        clearInterval(bRef.current);
      }
    };
    bRef.current = setInterval(() => {
      const m = Date.now() - l;
      setR(Math.min((m / d) * 100, 100));
    }, 100);
    window.speechSynthesis.speak(a);
  };
  const H = (a, l) => {
    const d = [...h];
    d[a] = l;
    setH(d);
  };
  const y = s.questions.reduce((acc, question, index) => acc + (h[index] === question.correct ? 1 : 0), 0);
  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f183c 0%, #1a1a4e 40%, #141440 100%)",
      }}
    >
      <KComponent />
      <EeComponent />
      <XComponent count={40} colors={["16,185,129", "34,211,238", "52,211,153", "20,184,166"]} />
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
              style={{
                background: "linear-gradient(135deg, #10b981, #14b8a6)",
                boxShadow: "0 0 30px rgba(16,185,129,0.3)",
              }}
            >
              <HeadphonesIcon size={28} className="text-white" />
            </div>
            <div
              className="absolute inset-0 rounded-2xl animate-ping opacity-20"
              style={{
                background: "#10b981",
                margin: "-4px",
              }}
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              {t("Audicion / Listening", "听力练习")}
            </span>
          </h1>
          <p className="text-white/50">{t("Practica tu comprension auditiva", "练习你的听力理解")}</p>
          <div
            className="w-40 h-1 rounded-full mx-auto mt-4"
            style={{
              background: "linear-gradient(90deg, #10b981, #14b8a6, #06b6d4)",
            }}
          />
        </div>
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {$.map((a, l) => {
            const d = ["#10b981", "#f59e0b", "#3b82f6"][l % 3];
            return (
              <button
                key={a.id}
                onClick={() => setS(a)}
                className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
                style={
                  s.id === a.id
                    ? {
                        background: `${d}15`,
                        border: `1px solid ${d}40`,
                        color: d,
                        boxShadow: `0 0 15px ${d}20`,
                      }
                    : {
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.4)",
                      }
                }
              >
                <RadioIcon size={12} className="inline mr-1.5" />
                {a.title}
              </button>
            );
          })}
        </div>
        <div
          className="relative rounded-3xl overflow-hidden mb-6"
          style={{
            background:
              "linear-gradient(135deg, rgba(16,185,129,0.05) 0%, rgba(255,255,255,0.03) 50%, rgba(6,182,212,0.05) 100%)",
            border: "1px solid rgba(16,185,129,0.12)",
            boxShadow: "0 0 40px rgba(16,185,129,0.05)",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: "linear-gradient(90deg, transparent, #10b98180, #06b6d480, transparent)",
            }}
          />
          <div className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(16,185,129,0.1)",
                    border: "1px solid rgba(16,185,129,0.2)",
                  }}
                >
                  <RadioIcon size={18} className="text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">{s.title}</h2>
                  <p className="text-white/40 text-xs">{s.titleCn}</p>
                </div>
              </div>
              <span
                className={`text-xs px-3 py-1 rounded-lg font-bold ${s.difficulty === "easy" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : s.difficulty === "medium" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}
              >
                {s.difficulty.toUpperCase()}
              </span>
            </div>
            <div
              className="rounded-2xl mb-5 overflow-hidden"
              style={{
                background: "rgba(0,0,0,0.2)",
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <SeComponent isPlaying={u} />
            </div>
            <div className="mb-5">
              <div
                className="h-2 bg-white/5 rounded-full overflow-hidden"
                style={{
                  boxShadow: "inset 0 1px 2px rgba(0,0,0,0.2)",
                }}
              >
                <div
                  className="h-full rounded-full transition-all relative"
                  style={{
                    width: `${r}%`,
                    background: "linear-gradient(90deg, #059669, #34d399, #22d3ee)",
                  }}
                >
                  <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white"
                    style={{
                      boxShadow: "0 0 10px rgba(52,211,153,0.5)",
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-xs mt-2">
                <span
                  className="font-mono"
                  style={{
                    color: "#34d39980",
                  }}
                >
                  {Math.floor(((r / 100) * s.duration) / 60)}:
                  {String(Math.floor(((r / 100) * s.duration) % 60)).padStart(2, "0")}
                </span>
                <span className="font-mono text-white/20">
                  {Math.floor(s.duration / 60)}:{String(s.duration % 60).padStart(2, "0")}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-5 mb-5">
              <button
                className="p-3 rounded-xl transition-all hover:scale-110"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <SkipBackIcon size={20} className="text-white/50" />
              </button>
              <button
                onClick={onClick}
                className="relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #10b981, #14b8a6)",
                  boxShadow: u ? "0 0 30px rgba(16,185,129,0.4)" : "0 0 20px rgba(16,185,129,0.2)",
                }}
              >
                <span
                  className="absolute inset-0 animate-pulse opacity-20 rounded-2xl"
                  style={{
                    boxShadow: "0 0 40px rgba(52,211,153,0.5)",
                  }}
                />
                {u ? (
                  <PauseIcon size={28} className="text-white relative" />
                ) : (
                  <PlayIcon size={28} className="text-white relative ml-1" />
                )}
              </button>
              <button
                className="p-3 rounded-xl transition-all hover:scale-110"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <SkipForwardIcon size={20} className="text-white/50" />
              </button>
            </div>
            {voices.length > 1 && (
              <div className="mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Volume2Icon size={12} className="text-emerald-400/50" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/30">
                    {t("Seleccionar voz / 选择声音", "选择声音")}
                  </span>
                </div>
                <TeComponent voices={voices} selectedVoice={S} onSelect={setS_1} />
              </div>
            )}
            <div className="flex items-center justify-center gap-3">
              <div
                className="flex items-center gap-2 rounded-xl p-1"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <GaugeIcon size={14} className="text-white/30 ml-2" />
                {[0.5, 0.75, 1, 1.25, 1.5].map((a) => (
                  <button
                    key={a}
                    onClick={() => setC(a)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${c === a ? "text-white" : "text-white/30 hover:text-white/60"}`}
                    style={
                      c === a
                        ? {
                            background: "rgba(16,185,129,0.15)",
                            color: "#34d399",
                          }
                        : {}
                    }
                  >
                    {a}x
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  window.speechSynthesis.cancel();
                  setU(false);
                  setR(0);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105 text-white/30 hover:text-white/60"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {t("Reiniciar", "重新开始")}
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-3 mb-6">
          {[
            {
              key: "transcript",
              icon: FileTextIcon,
              label: t("Transcripcion", "转录"),
            },
            {
              key: "questions",
              icon: MicIcon,
              label: t("Preguntas", "问题"),
            },
          ].map((a) => {
            const l = a.key === "transcript" ? v : w;
            return (
              <button
                key={a.key}
                onClick={() => {
                  if (a.key === "transcript") {
                    return setV(!v);
                  }
                  return setW(!w);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-105"
                style={
                  l
                    ? {
                        background: "rgba(16,185,129,0.1)",
                        border: "1px solid rgba(16,185,129,0.25)",
                        color: "#34d399",
                        boxShadow: "0 0 15px rgba(16,185,129,0.1)",
                      }
                    : {
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        color: "rgba(255,255,255,0.35)",
                      }
                }
              >
                <a.icon size={15} /> {a.label}
              </button>
            );
          })}
        </div>
        {v && (
          <div
            className="rounded-2xl p-6 mb-6 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(16,185,129,0.04), rgba(0,0,0,0.1))",
              border: "1px solid rgba(16,185,129,0.1)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: "linear-gradient(90deg, transparent, #10b98140, transparent)",
              }}
            />
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <FileTextIcon size={16} className="text-emerald-400" />
              {t("Transcripcion", "转录文本")}
            </h3>
            <p className="text-white/70 text-base leading-[2] whitespace-pre-line font-medium">
              {s.transcription}
            </p>
          </div>
        )}
        {w && (
          <div
            className="rounded-2xl p-6 mb-6 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(6,182,212,0.04), rgba(0,0,0,0.1))",
              border: "1px solid rgba(6,182,212,0.1)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: "linear-gradient(90deg, transparent, #06b6d440, transparent)",
              }}
            />
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-bold flex items-center gap-2">
                <MicIcon size={16} className="text-cyan-400" />
                {t("Preguntas de comprension", "理解问题")}
              </h3>
              {p && (
                <span
                  className="text-sm font-bold px-3 py-1 rounded-lg"
                  style={{
                    background: y === s.questions.length ? "rgba(34,197,94,0.1)" : "rgba(245,158,11,0.1)",
                    color: y === s.questions.length ? "#4ade80" : "#fbbf24",
                    border: `1px solid ${y === s.questions.length ? "rgba(34,197,94,0.2)" : "rgba(245,158,11,0.2)"}`,
                  }}
                >
                  {y}/{s.questions.length} {t("correctas", "正确")}
                </span>
              )}
            </div>
            <div className="space-y-5">
              {s.questions.map((a, l) => {
                const d = ["#06b6d4", "#22d3ee", "#67e8f9"];
                const m = d[l % d.length];
                return (
                  <div
                    key={l}
                    className="rounded-xl p-4"
                    style={{
                      background: "rgba(0,0,0,0.08)",
                      border: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black"
                        style={{
                          background: `${m}12`,
                          border: `1px solid ${m}20`,
                          color: m,
                        }}
                      >
                        {l + 1}
                      </span>
                      <p className="text-white/80 text-base font-bold leading-relaxed flex-1">{a.q}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {a.options.map((U, g) => {
                        const C = ["#ef4444", "#3b82f6", "#22c55e", "#f59e0b"];
                        const q = C[g % C.length];
                        const M = h[l] === g;
                        const j = g === a.correct;
                        return (
                          <button
                            key={g}
                            onClick={() => !p && H(l, g)}
                            className="p-4 rounded-xl text-sm transition-all border-2 font-bold flex items-center gap-3"
                            style={{
                              background: M
                                ? p
                                  ? j
                                    ? "rgba(34,197,94,0.08)"
                                    : "rgba(239,68,68,0.08)"
                                  : `${m}10`
                                : p && j
                                  ? "rgba(34,197,94,0.08)"
                                  : "rgba(255,255,255,0.02)",
                              borderColor: M
                                ? p
                                  ? j
                                    ? "rgba(34,197,94,0.3)"
                                    : "rgba(239,68,68,0.3)"
                                  : `${m}30`
                                : p && j
                                  ? "rgba(34,197,94,0.3)"
                                  : "rgba(255,255,255,0.05)",
                            }}
                          >
                            <span
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0"
                              style={{
                                background: `${q}15`,
                                color: q,
                              }}
                            >
                              {String.fromCharCode(65 + g)}
                            </span>
                            <span className="text-white/80">{U}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            {p ? (
              <button
                onClick={() => {
                  setP(false);
                  setH([]);
                }}
                className="mt-5 px-6 py-3 rounded-2xl text-white/50 font-bold transition-all hover:text-white hover:scale-105"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {t("Reintentar", "重试")}
              </button>
            ) : (
              <button
                onClick={() => setP(true)}
                disabled={h.length < s.questions.length}
                className="mt-5 px-6 py-3 rounded-2xl text-white font-bold transition-all disabled:opacity-30 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #06b6d4, #0891b2)",
                  boxShadow: "0 0 20px rgba(6,182,212,0.2)",
                }}
              >
                {t("Comprobar respuestas", "检查答案")}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export { XeComponent as default };
