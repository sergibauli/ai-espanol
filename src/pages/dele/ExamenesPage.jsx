import {
  GraduationCapIcon,
  SparklesIcon,
  AwardIcon,
  ChevronRightIcon,
  StarIcon,
  BookOpenIcon,
  MicIcon,
  ArrowLeftIcon,
  FlameIcon,
  CrownIcon,
  FileTextIcon,
  HeadphonesIcon,
  PenToolIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { L as L_2 } from "../../components/LearningImpactScene.jsx";
import { useLanguage } from "../../lib/i18n.jsx";
const x = [
  {
    key: "A1",
    title: "Nivel A1 - Acceso",
    sub: "入门级",
    desc: "Presentaciones, familia, comida, tiempo libre",
    descZh: "自我介绍、家庭、食物、休闲",
    color: "#10b981",
    glow: "#34d399",
    accent: "#059669",
    icon: StarIcon,
    examCount: 50,
    node: {
      x: 60,
      y: 140,
    },
  },
  {
    key: "A2",
    title: "Nivel A2 - Plataforma",
    sub: "基础级",
    desc: "Viajes, compras, rutina, descripciones",
    descZh: "旅行、购物、日常、描述",
    color: "#f97316",
    glow: "#fbbf24",
    accent: "#ea580c",
    icon: FlameIcon,
    examCount: 50,
    node: {
      x: 340,
      y: 100,
    },
  },
  {
    key: "B1",
    title: "Nivel B1 - Umbral",
    sub: "进阶级",
    desc: "Trabajo, sociedad, tecnologia, medio ambiente",
    descZh: "工作、社会、科技、环境",
    color: "#3b82f6",
    glow: "#60a5fa",
    accent: "#2563eb",
    icon: CrownIcon,
    examCount: 50,
    node: {
      x: 660,
      y: 60,
    },
  },
  {
    key: "B2",
    title: "Nivel B2 - Avanzado",
    sub: "熟练级",
    desc: "Politica, cultura, IA, globalizacion",
    descZh: "政治、文化、人工智能、全球化",
    color: "#a855f7",
    glow: "#c084fc",
    accent: "#9333ea",
    icon: SparklesIcon,
    examCount: 50,
    node: {
      x: 940,
      y: 20,
    },
  },
];
const X = [
  {
    icon: BookOpenIcon,
    label: "Vocabulario",
  },
  {
    icon: FileTextIcon,
    label: "Lectura",
  },
  {
    icon: HeadphonesIcon,
    label: "Audicion",
  },
  {
    icon: PenToolIcon,
    label: "Escritura",
  },
  {
    icon: MicIcon,
    label: "Monologo",
  },
];
const d = "M60,140 Q200,140 340,100 Q480,60 660,60 Q820,20 940,20";
function WComponent() {
  const { t: t_1 } = useLanguage();
  const [w, setW] = React.useState(null);
  const [j, setJ] = React.useState([false, false, false, false]);
  const lRef = React.useRef([]);
  const uRef = React.useRef([]);
  React.useEffect(() => {
    const e = new IntersectionObserver(
      (t) => {
        t.forEach((n) => {
          const s = Number(n.target.getAttribute("data-idx"));
          if (n.isIntersecting) {
            setJ((o) => {
              if (o[s]) {
                return o;
              }
              const i = [...o];
              i[s] = true;
              return i;
            });
          }
        });
      },
      {
        threshold: 0.2,
      },
    );
    uRef.current.forEach((t) => t && e.observe(t));
    return () => e.disconnect();
  }, []);
  const N = (e, t) => {
    const n = lRef.current[t];
    if (!n) {
      return;
    }
    const s = n.getBoundingClientRect();
    const o = e.clientX - s.left;
    const i = e.clientY - s.top;
    const f = s.width / 2;
    const g = s.height / 2;
    const v = ((i - g) / g) * -12;
    const S = ((o - f) / f) * 12;
    n.style.transform = `perspective(1200px) rotateX(${v}deg) rotateY(${S}deg) scale3d(1.04, 1.04, 1.04) translateZ(40px)`;
    n.style.setProperty("--mx", `${(o / s.width) * 100}%`);
    n.style.setProperty("--my", `${(i / s.height) * 100}%`);
  };
  const $ = (e) => {
    const t = lRef.current[e];
    if (t) {
      t.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0px)";
      setW(null);
    }
  };
  return (
    <StarfieldBackground>
      <style>{`
        @keyframes iconBounce { 0%, 100% { transform: translateZ(50px) scale(1); } 50% { transform: translateZ(50px) scale(1.1) rotate(4deg); } }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes rotateBorder { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes floatParticle { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-10px) scale(1.2); } }
        @keyframes nodePulse { 0%, 100% { box-shadow: 0 0 0 0 var(--np-color); transform: scale(1); } 50% { box-shadow: 0 0 22px 6px var(--np-color); transform: scale(1.12); } }
        @keyframes ringSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes cometTravel {
          0% { offset-distance: 0%; opacity: 0; }
          8% { opacity: 1; }
          92% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes pathGlow { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
        @keyframes titleShine { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        @keyframes cardRise {
          from { opacity: 0; transform: perspective(1200px) translateY(60px) rotateX(18deg); }
          to { opacity: 1; transform: perspective(1200px) translateY(0) rotateX(0deg); }
        }
        @keyframes medalSheen { 0% { transform: translateX(-120%) rotate(20deg); } 100% { transform: translateX(220%) rotate(20deg); } }

        .dele-comet {
          offset-path: path('${d}');
          offset-rotate: auto;
          animation: cometTravel 4.5s ease-in-out infinite;
        }
        .dele-card-enter {
          opacity: 0;
        }
        .dele-card-visible {
          animation: cardRise 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .dele-medal-inner {
          transition: transform 0.7s cubic-bezier(0.2, 0.9, 0.3, 1);
          transform-style: preserve-3d;
        }
        .group\\/medal:hover .dele-medal-inner {
          transform: rotateY(180deg);
        }
        .dele-medal-face {
          backface-visibility: hidden;
        }
        .dele-medal-back {
          transform: rotateY(180deg);
        }
        @media (prefers-reduced-motion: reduce) {
          .dele-comet, .dele-card-visible, [style*="animation"] { animation: none !important; }
        }
      `}</style>
      <div className="exam-experience max-w-6xl mx-auto px-4 py-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-white/50 hover:text-orange-400 transition-all mb-8 text-sm group"
        >
          <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" />
          {t_1("Volver al inicio", "返回首页")}
        </Link>
        <div className="text-center mb-6">
          <div className="flex justify-center items-center gap-3 mb-4">
            <L_2 variant="exams" compact />
            <span
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full"
              style={{
                color: "#fbbf24",
                border: "1px solid rgba(251,191,36,0.3)",
                background: "rgba(251,191,36,0.06)",
                boxShadow: "0 0 18px rgba(251,191,36,0.15)",
              }}
            >
              <GraduationCapIcon size={12} /> MCER · CEFR
            </span>
          </div>
          <h1
            className="text-4xl md:text-6xl font-black mb-3 text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(90deg, #ffffff, #fde68a, #ffffff, #fbbf24, #ffffff)",
              backgroundSize: "300% auto",
              animation: "titleShine 6s linear infinite",
              filter: "drop-shadow(0 0 25px rgba(249,115,22,0.25))",
              letterSpacing: "-0.02em",
            }}
          >
            {t_1("DELE para practicar", "DELE 练习")}
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            {t_1(
              "Cuatro niveles, un mismo camino. Elige tu punto de partida.",
              "四个级别，一条道路。选择你的起点。",
            )}
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mt-7 max-w-2xl mx-auto text-left">
            <div
              className="rounded-2xl p-4"
              style={{
                background: "linear-gradient(135deg, rgba(52,211,153,.16), rgba(16,185,129,.06))",
                border: "1px solid rgba(52,211,153,.42)",
                boxShadow: "0 0 26px rgba(52,211,153,.14)",
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <SparklesIcon
                  size={15}
                  style={{
                    color: "#6ee7b7",
                  }}
                />
                <span className="text-[13.5px] font-black text-white/95">
                  {t_1("DELE para practicar", "DELE 练习")}
                </span>
                <span
                  className="ml-auto text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(52,211,153,.2)",
                    color: "#6ee7b7",
                  }}
                >
                  {t_1("Estás aquí", "当前")}
                </span>
              </div>
              <span className="block text-[11.5px] font-bold text-white/45 leading-snug">
                {t_1(
                  "Ejercicios por destreza para entrenar cada prueba a tu ritmo.",
                  "按技能练习，逐项训练。",
                )}
              </span>
            </div>
            <Link
              to="/oficial"
              className="group rounded-2xl p-4 transition-transform hover:scale-[1.015]"
              style={{
                background: "linear-gradient(135deg, rgba(224,181,102,.16), rgba(179,56,47,.08))",
                border: "1px solid rgba(224,181,102,.42)",
                boxShadow: "0 0 26px rgba(224,181,102,.14)",
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <AwardIcon
                  size={15}
                  style={{
                    color: "#f6dfa8",
                  }}
                />
                <span className="text-[13.5px] font-black text-white/95">
                  {t_1("DELE Exámenes Oficiales", "DELE 官方考试")}
                </span>
                <ChevronRightIcon
                  size={15}
                  className="ml-auto text-amber-200/70 transition-transform group-hover:translate-x-1"
                />
              </div>
              <span className="block text-[11.5px] font-bold text-white/45 leading-snug">
                {t_1(
                  "80 modelos completos —20 por nivel— con la estructura oficial y corrección.",
                  "80 套完整模型，每级 20 套。",
                )}
              </span>
            </Link>
          </div>
        </div>
        <div className="relative w-full h-40 md:h-56 mb-14 select-none" aria-hidden="true">
          <svg viewBox="0 0 1000 160" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="pathGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="33%" stopColor="#fbbf24" />
                <stop offset="66%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
            <path
              d={d}
              fill="none"
              stroke="url(#pathGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{
                animation: "pathGlow 3.5s ease-in-out infinite",
                opacity: 0.6,
              }}
            />
            <path
              d={d}
              fill="none"
              stroke="url(#pathGrad)"
              strokeWidth="0.5"
              strokeDasharray="2 6"
              strokeLinecap="round"
            />
          </svg>
          <div
            className="dele-comet absolute w-3 h-3 rounded-full"
            style={{
              background: "white",
              boxShadow: "0 0 12px 4px #fde68a, 0 0 30px 10px rgba(251,191,36,0.4)",
            }}
          />
          {x.map((e, t) => {
            const n = (e.node.x / 1000) * 100;
            const s = (e.node.y / 160) * 100;
            const o = t % 2 === 1;
            return (
              <div
                key={e.key}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${n}%`,
                  top: `${s}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {o && (
                  <span
                    className="mb-2 text-[11px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap"
                    style={{
                      color: e.glow,
                      background: `${e.color}15`,
                      border: `1px solid ${e.color}30`,
                    }}
                  >
                    {e.key}
                  </span>
                )}
                <span
                  className="relative block w-3.5 h-3.5 md:w-4 md:h-4 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 35% 30%, #fff, ${e.glow} 45%, ${e.accent})`,
                    "--np-color": `${e.glow}80`,
                    animation: `nodePulse 2.4s ease-in-out infinite ${t * 0.4}s`,
                  }}
                />
                {!o && (
                  <span
                    className="mt-2 text-[11px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap"
                    style={{
                      color: e.glow,
                      background: `${e.color}15`,
                      border: `1px solid ${e.color}30`,
                    }}
                  >
                    {e.key}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className="exam-type-grid grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {x.map((e, t) => {
            const Icon = e.icon;
            const s = w === t;
            return (
              <div
                key={e.key}
                data-idx={t}
                ref={(o) => {
                  uRef.current[t] = o;
                }}
                className={j[t] ? "dele-card-visible" : "dele-card-enter"}
                style={{
                  animationDelay: `${t * 0.12}s`,
                }}
              >
                <Link to={`/examenes-nivel/${e.key}`} className="exam-type-card group block">
                  <div
                    ref={(o) => {
                      lRef.current[t] = o;
                    }}
                    className="relative h-full transition-transform duration-300 ease-out"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                    onMouseMove={(o) => N(o, t)}
                    onMouseEnter={() => setW(t)}
                    onMouseLeave={() => $(t)}
                  >
                    <div
                      className="absolute -inset-[2px] rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden"
                      style={{
                        zIndex: 0,
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-3xl"
                        style={{
                          background: `conic-gradient(from 0deg, ${e.glow}, ${e.color}, ${e.accent}, ${e.glow})`,
                          animation: "rotateBorder 3s linear infinite",
                        }}
                      />
                      <div
                        className="absolute inset-[1px] rounded-3xl"
                        style={{
                          background: "rgba(10,12,30,0.95)",
                        }}
                      />
                    </div>
                    <div
                      className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at center, ${e.glow}30, transparent 70%)`,
                        zIndex: -1,
                      }}
                    />
                    <div
                      className="relative h-full rounded-3xl overflow-hidden backdrop-blur-xl transition-all duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${e.color}10 0%, rgba(15,24,60,0.95) 50%, ${e.accent}08 100%)`,
                        border: `1px solid ${s ? e.glow : `${e.color}20`}`,
                        boxShadow: s
                          ? `0 0 40px ${e.glow}40, 0 0 80px ${e.color}15, inset 0 1px 0 rgba(255,255,255,0.08)`
                          : `0 8px 32px rgba(0,0,0,0.3), 0 0 20px ${e.color}08`,
                        zIndex: 1,
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background: `radial-gradient(220px circle at var(--mx,50%) var(--my,50%), ${e.glow}12, transparent 70%)`,
                        }}
                      />
                      <div
                        className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${e.glow}, ${e.color}, ${e.glow}, transparent)`,
                          backgroundSize: "200% 100%",
                          animation: "shimmer 2s linear infinite",
                        }}
                      />
                      <div
                        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{
                          background: `${e.glow}15`,
                        }}
                      />
                      <div
                        className="absolute top-4 right-20 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          background: e.glow,
                          boxShadow: `0 0 6px ${e.glow}`,
                          animation: "floatParticle 2s ease-in-out infinite",
                        }}
                      />
                      <div
                        className="absolute bottom-6 right-8 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          background: e.glow,
                          boxShadow: `0 0 4px ${e.glow}`,
                          animation: "floatParticle 2.5s ease-in-out infinite 0.5s",
                        }}
                      />
                      <div
                        className="absolute top-1/2 left-4 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          background: e.glow,
                          boxShadow: `0 0 4px ${e.glow}`,
                          animation: "floatParticle 2s ease-in-out infinite 1s",
                        }}
                      />
                      <div className="exam-type-content relative z-10 p-6 md:p-8">
                        <div className="exam-type-header flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div
                              className="group/medal relative w-16 h-16"
                              style={{
                                perspective: "600px",
                              }}
                            >
                              <div className="dele-medal-inner relative w-full h-full">
                                <div
                                  className="dele-medal-face absolute inset-0 rounded-2xl flex items-center justify-center overflow-hidden"
                                  style={{
                                    background: `linear-gradient(135deg, ${e.color}, ${e.accent})`,
                                    boxShadow: `0 0 25px ${e.glow}60, 0 4px 15px rgba(0,0,0,0.3), 0 0 40px ${e.color}30`,
                                    animation: s ? "none" : "iconBounce 3s ease-in-out infinite",
                                  }}
                                >
                                  <Icon
                                    size={30}
                                    className="text-white"
                                    style={{
                                      filter: `drop-shadow(0 0 8px ${e.glow})`,
                                    }}
                                  />
                                  <div
                                    className="absolute inset-0 w-1/3 opacity-40"
                                    style={{
                                      background:
                                        "linear-gradient(115deg, transparent, rgba(255,255,255,0.6), transparent)",
                                      animation: "medalSheen 2.8s ease-in-out infinite",
                                    }}
                                  />
                                </div>
                                <div
                                  className="dele-medal-face dele-medal-back absolute inset-0 rounded-2xl flex items-center justify-center"
                                  style={{
                                    background: `radial-gradient(circle at 30% 30%, ${e.glow}, ${e.accent})`,
                                    boxShadow: `0 0 25px ${e.glow}70, inset 0 0 15px rgba(255,255,255,0.3)`,
                                  }}
                                >
                                  <span
                                    className="font-mono font-black text-lg text-white"
                                    style={{
                                      textShadow: `0 0 10px ${e.glow}`,
                                    }}
                                  >
                                    {e.key}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h3
                                className="text-white font-black text-2xl"
                                style={{
                                  textShadow: `0 0 15px ${e.glow}30`,
                                }}
                              >
                                {e.title}
                              </h3>
                              <p
                                className="text-sm font-bold"
                                style={{
                                  color: `${e.glow}90`,
                                }}
                              >
                                {e.sub}
                              </p>
                            </div>
                          </div>
                          <span
                            className="font-mono text-3xl font-black px-4 py-2 rounded-2xl backdrop-blur-md"
                            style={{
                              background: `${e.color}15`,
                              border: `2px solid ${e.color}40`,
                              color: e.glow,
                              textShadow: `0 0 10px ${e.glow}60, 0 0 20px ${e.color}40`,
                              boxShadow: `0 0 20px ${e.glow}20`,
                              transform: "translateZ(30px)",
                            }}
                          >
                            {e.key}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mb-4">
                          {x.map((o, i) => (
                            <span
                              key={i}
                              className="h-1 rounded-full transition-all duration-500"
                              style={{
                                width: i === t ? "22px" : "8px",
                                background: i <= t ? e.glow : "rgba(255,255,255,0.12)",
                                boxShadow: i === t ? `0 0 8px ${e.glow}` : "none",
                              }}
                            />
                          ))}
                          <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-white/30">
                            {t_1(`Nivel ${t + 1} de 4`, `第 ${t + 1} / 4 级`)}
                          </span>
                        </div>
                        <p className="exam-type-description text-white/50 text-base font-medium mb-1">
                          {e.desc}
                        </p>
                        <p
                          className="exam-type-description text-sm font-bold mb-5"
                          style={{
                            color: `${e.glow}50`,
                          }}
                        >
                          {e.descZh}
                        </p>
                        <div className="exam-type-skills flex flex-wrap gap-2 mb-5">
                          {X.map((o, key) => (
                            <span
                              key={key}
                              className="flex items-center gap-1 text-[10px] px-2.5 py-1.5 rounded-lg font-bold uppercase tracking-wider backdrop-blur-sm"
                              style={{
                                background: `${e.color}08`,
                                color: `${e.glow}50`,
                                border: `1px solid ${e.color}10`,
                                boxShadow: `0 0 8px ${e.color}05`,
                              }}
                            >
                              <o.icon size={10} /> {o.label}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span
                            className="text-xs font-bold px-3 py-1.5 rounded-xl text-white backdrop-blur-md"
                            style={{
                              background: `linear-gradient(135deg, ${e.color}30, ${e.accent}20)`,
                              border: `1px solid ${e.color}40`,
                              boxShadow: `0 0 15px ${e.glow}40`,
                              textShadow: `0 0 8px ${e.glow}40`,
                            }}
                          >
                            {e.examCount} {t_1("examenes", "考试")}
                          </span>
                          <div
                            className="flex items-center gap-1 text-xs font-bold opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0"
                            style={{
                              color: e.glow,
                              textShadow: `0 0 8px ${e.glow}60`,
                            }}
                          >
                            <span>{t_1("Ver examenes", "查看考试")}</span>
                            <ChevronRightIcon
                              size={12}
                              className="transition-transform group-hover:translate-x-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="text-center py-8">
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <GraduationCapIcon size={18} className="text-white/20" />
            <p className="text-white/30 text-sm font-medium">
              {t_1(
                "Selecciona un nivel para ver todos los examenes disponibles",
                "选择一个级别查看所有可用考试",
              )}
            </p>
          </div>
        </div>
      </div>
    </StarfieldBackground>
  );
}
export { WComponent as default };
