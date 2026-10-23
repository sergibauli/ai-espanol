import {
  BookOpenIcon,
  ZapIcon,
  SparklesIcon,
  StarIcon,
  TrophyIcon,
  ArrowLeftIcon,
  LayoutGridIcon,
  LayersIcon,
  TimerIcon,
  CrosshairIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g, a as a_1 } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
const X = 60;
const T = ["#00d4ff", "#ff00aa", "#ffd600", "#39ff14", "#ff6b35", "#b829dd", "#ff4757", "#7bed9f"];
function re(s) {
  const p = [...s];
  for (let o = p.length - 1; o > 0; o--) {
    const f = Math.floor(Math.random() * (o + 1));
    [p[o], p[f]] = [p[f], p[o]];
  }
  return p;
}
function Ge(espanol) {
  return espanol
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-ZÑ]/g, "")
    .trim();
}
function Ze(s, p, o) {
  const f = [o, "#ffffff", "#00d4ff", "#ff00aa", "#ffd600", "#39ff14"];
  for (let x = 0; x < 48; x++) {
    const r = document.createElement("div");
    const k = 4 + Math.random() * 6;
    const u = Math.random() > 0.5;
    r.style.cssText = `position:fixed;left:${s}px;top:${p}px;width:${k}px;height:${k}px;${u ? "" : "border-radius:50%;"}background:${f[x % f.length]};pointer-events:none;z-index:9999;box-shadow:0 0 8px ${f[x % f.length]};`;
    document.body.appendChild(r);
    const y = Math.random() * Math.PI * 2;
    const B = 3 + Math.random() * 14;
    let v = Math.cos(y) * B;
    let m = Math.sin(y) * B;
    let S = 1;
    let z = 0;
    let N = (Math.random() - 0.5) * 20;
    const C = () => {
      v *= 0.94;
      m *= 0.94;
      m += 0.4;
      r.style.left = `${parseFloat(r.style.left) + v}px`;
      r.style.top = `${parseFloat(r.style.top) + m}px`;
      S -= 0.018;
      r.style.opacity = String(S);
      z += N;
      r.style.transform = `rotate(${z}deg)`;
      if (S > 0) {
        requestAnimationFrame(C);
      } else {
        r.remove();
      }
    };
    requestAnimationFrame(C);
  }
}
function ze() {
  const s = ["#00d4ff", "#ff00aa", "#ffd600", "#39ff14", "#ff6b35", "#b829dd", "#ffffff"];
  for (let p = 0; p < 120; p++) {
    const o = document.createElement("div");
    const f = 6 + Math.random() * 8;
    const x = 6 + Math.random() * 8;
    const r = s[Math.floor(Math.random() * s.length)];
    const k = Math.random() * window.innerWidth;
    const u = -20;
    o.style.cssText = `position:fixed;left:${k}px;top:${u}px;width:${f}px;height:${x}px;background:${r};border-radius:2px;pointer-events:none;z-index:9999;box-shadow:0 0 10px ${r};`;
    document.body.appendChild(o);
    let y = k;
    let B = u;
    let v = (Math.random() - 0.5) * 6;
    let m = 2 + Math.random() * 6;
    let S = 0;
    let z = (Math.random() - 0.5) * 15;
    let N = 1;
    const C = () => {
      m += 0.12;
      y += v;
      B += m;
      v *= 0.995;
      S += z;
      o.style.left = `${y}px`;
      o.style.top = `${B}px`;
      o.style.transform = `rotate(${S}deg)`;
      o.style.opacity = String(N);
      N -= 0.006;
      if (N > 0 && B < window.innerHeight + 20) {
        requestAnimationFrame(C);
      } else {
        o.remove();
      }
    };
    requestAnimationFrame(C);
  }
}
function Se1Component({ expression }) {
  const p =
    expression === "sad"
      ? "M22 38 q3 -4 6 0 M42 38 q3 -4 6 0"
      : expression === "excited"
        ? "M20 36 q5 -6 10 0 q-5 6 -10 0 M40 36 q5 -6 10 0 q-5 6 -10 0"
        : "M24 38 q2 -3 4 0 M42 38 q2 -3 4 0";
  const o =
    expression === "sad"
      ? "M30 52 q4 4 8 0"
      : expression === "happy"
        ? "M28 50 q4 6 8 0 q4 -6 8 0"
        : expression === "excited"
          ? "M30 48 q6 10 12 0 q-6 -2 -12 0"
          : "M32 52 q4 2 8 0";
  const f =
    expression === "excited" || expression === "happy" ? (
      <>
        <circle cx="18" cy="46" r="5" fill="#ff6b81" opacity="0.6" />
        <circle cx="54" cy="46" r="5" fill="#ff6b81" opacity="0.6" />
      </>
    ) : null;
  const x =
    expression === "excited" ? (
      <>
        <polygon points="10,10 12,16 18,18 12,20 10,26 8,20 2,18 8,16" fill="#ffd600" />
        <polygon points="62,6 64,12 70,14 64,16 62,22 60,16 54,14 60,12" fill="#ffd600" />
        <polygon points="66,30 67,33 70,34 67,35 66,38 65,35 62,34 65,33" fill="#00d4ff" />
      </>
    ) : null;
  const animation =
    expression === "excited"
      ? "kawaiiBounce 0.5s ease infinite alternate"
      : expression === "happy"
        ? "kawaiiBounce 0.8s ease infinite alternate"
        : "kawaiiFloat 3s ease-in-out infinite";
  return (
    <div
      className="fixed bottom-4 right-4 z-50 pointer-events-none"
      style={{
        animation,
      }}
    >
      <svg
        width="72"
        height="72"
        viewBox="0 0 72 72"
        className="drop-shadow-[0_0_15px_rgba(255,105,180,0.5)]"
      >
        <defs>
          <radialGradient id="mascotBody" cx="0.3" cy="0.3">
            <stop offset="0%" stopColor="#ffe4f0" />
            <stop offset="100%" stopColor="#ffb3d9" />
          </radialGradient>
          <linearGradient id="mascotEarL" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffe4f0" />
            <stop offset="100%" stopColor="#ff99cc" />
          </linearGradient>
          <linearGradient id="mascotEarR" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffe4f0" />
            <stop offset="100%" stopColor="#ff99cc" />
          </linearGradient>
        </defs>
        {x}
        <ellipse cx="36" cy="62" rx="18" ry="4" fill="rgba(0,0,0,0.2)" />
        <path
          d="M14 18 Q8 4 22 12 Q28 4 36 14 Q44 4 50 12 Q64 4 58 18 Q64 30 58 44 Q56 58 36 60 Q16 58 14 44 Q8 30 14 18"
          fill="url(#mascotBody)"
          stroke="#ff69b4"
          strokeWidth="1.5"
        />
        <path d="M14 18 Q8 4 22 12 Q28 4 36 14" fill="url(#mascotEarL)" stroke="#ff69b4" strokeWidth="1" />
        <path d="M58 18 Q64 4 50 12 Q44 4 36 14" fill="url(#mascotEarR)" stroke="#ff69b4" strokeWidth="1" />
        <circle cx="36" cy="30" r="4" fill="#ff69b4" opacity="0.3" />
        <path d={p} fill="none" stroke="#2d3436" strokeWidth="2.5" strokeLinecap="round" />
        <path d={o} fill="none" stroke="#2d3436" strokeWidth="2.5" strokeLinecap="round" />
        {f}
      </svg>
    </div>
  );
}
function WeComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [r, setR] = React.useState("select");
  const [u, setU] = React.useState([]);
  const [B, setB] = React.useState([]);
  const [m, setM] = React.useState(0);
  const [z, setZ] = React.useState(0);
  const [C, setC] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("wordgrid_best") || "0");
    } catch {
      return 0;
    }
  });
  const [b, setB_1] = React.useState(X);
  const [oe, setOe] = React.useState(1);
  const [E, setE] = React.useState("");
  const [ne, setNe] = React.useState(null);
  const [expression, setExpression] = React.useState("neutral");
  const [d, setD] = React.useState(null);
  const DRef = React.useRef(null);
  const le = g();
  const [O, setO] = React.useState("");
  const deRef = React.useRef(null);
  const L = u.length > 0 && u.every((t) => t.matched);
  const W = React.useCallback((t) => {
    playClick();
    let c = t ? a_1(t) : a_1();
    if (c.length === 0) {
      setO(
        'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
      );
      return;
    }
    const g = re(
      c
        .filter((i) => i.espanol && i.chino)
        .map((i) => ({
          es: Ge(i.espanol),
          zh: i.chino,
        }))
        .filter((i) => i.es.length >= 3 && i.es.length <= 10),
    ).slice(0, 8);
    let h = 0;
    const a = [];
    g.forEach((i, pairId) => {
      a.push({
        id: h++,
        text: i.es,
        pairId,
        isSpanish: true,
        flipped: false,
        matched: false,
      });
      a.push({
        id: h++,
        text: i.zh,
        pairId,
        isSpanish: false,
        flipped: false,
        matched: false,
      });
    });
    setU(re(a));
    setB([]);
    setM(0);
    setZ(0);
    setB_1(X);
    setOe(1);
    setE("");
    setNe(null);
    setD(null);
    setExpression("neutral");
    setR("playing");
  }, []);
  React.useEffect(() => {
    if (r === "playing" && b > 0) {
      DRef.current = setInterval(() => setB_1((t) => t - 1), 1000);
      return () => {
        if (DRef.current) {
          clearInterval(DRef.current);
        }
      };
    }
  }, [r, b]);
  React.useEffect(() => {
    if (r === "playing" && b <= 0) {
      playLose();
      setExpression("sad");
      setR("gameover");
      setC((t) => {
        const c = Math.max(t, m);
        localStorage.setItem("wordgrid_best", String(c));
        return c;
      });
    }
  }, [r, b, m]);
  const ce = (t) => {
    playClick();
    if (!(t.matched || t.flipped || B.length >= 2 || r !== "playing")) {
      setU((c) =>
        c.map((g) => {
          if (g.id === t.id) {
            return {
              ...g,
              flipped: true,
            };
          }
          return g;
        }),
      );
      setB((c) => {
        const g = [...c, t.id];
        if (g.length === 2) {
          const [h, a] = g;
          const i = u.find((w) => w.id === h) || t;
          const Z = u.find((w) => w.id === a);
          if (Z && i.pairId === Z.pairId) {
            playCorrect();
            const w = document.getElementById(`grid-card-${h}`);
            const M = document.getElementById(`grid-card-${a}`);
            if (w && M) {
              const l = w.getBoundingClientRect();
              const j = M.getBoundingClientRect();
              const P = T[i.pairId % T.length];
              Ze(l.left + l.width / 2, l.top + l.height / 2, P);
              setD({
                x1: l.left + l.width / 2,
                y1: l.top + l.height / 2,
                x2: j.left + j.width / 2,
                y2: j.top + j.height / 2,
                color: P,
              });
              setTimeout(() => setD(null), 600);
            }
            setTimeout(() => {
              setU((l) =>
                l.map((j) => {
                  if (j.id === h || j.id === a) {
                    return {
                      ...j,
                      matched: true,
                      flipped: true,
                    };
                  }
                  return j;
                }),
              );
              setB([]);
            }, 400);
            const A = 100 * oe;
            setM((l) => l + A);
            setZ((l) => l + 1);
            setOe((l) => l + 1);
            setE("¡Match! / 匹配！");
            setExpression("excited");
            setTimeout(() => {
              setE("");
              setExpression("happy");
            }, 900);
          } else {
            playWrong();
            setNe(a);
            setTimeout(() => setNe(null), 500);
            setTimeout(() => {
              setU((w) =>
                w.map((M) => {
                  if (M.id === h || M.id === a) {
                    return {
                      ...M,
                      flipped: false,
                    };
                  }
                  return M;
                }),
              );
              setB([]);
            }, 800);
            setZ(0);
            setOe(1);
            setE("¡Error! / 错误！");
            setExpression("sad");
            setTimeout(() => {
              setE("");
              setExpression("neutral");
            }, 900);
          }
        }
        return g;
      });
    }
  };
  React.useEffect(() => {
    if (L && r === "playing") {
      playWin();
      setExpression("excited");
      ze();
      setR("gameover");
      setC((t) => {
        const c = Math.max(t, m);
        localStorage.setItem("wordgrid_best", String(c));
        return c;
      });
    }
  }, [L, r, m]);
  const pe = "1px solid rgba(255,0,170,.3)";
  const xe = "linear-gradient(135deg, #ff00aa, #b829dd)";
  const fe = "0 0 25px rgba(255,0,170,.4)";
  const me = "radial-gradient(circle at 50% 50%, rgba(255,0,170,0.15), transparent 70%)";
  const H = b <= 10 ? "#ff4444" : "#ffd600";
  const ge = b <= 10 ? "rgba(255,68,68,0.6)" : "rgba(255,214,0,0.5)";
  const he = b <= 10 ? "rgba(255,68,68,.15)" : "rgba(255,214,0,.12)";
  const be = b <= 10 ? "1px solid rgba(255,68,68,.3)" : "1px solid rgba(255,214,0,.25)";
  const ue = b <= 10 ? "0 0 15px rgba(255,68,68,.3)" : "0 0 15px rgba(255,214,0,.2)";
  const width = `${(b / X) * 100}%`;
  if (r === "select") {
    return (
      <StarfieldBackground>
        <Se1Component expression="neutral" />
        <div
          className="max-w-5xl mx-auto px-4 py-6 min-h-screen flex flex-col"
          style={{
            perspective: "1000px",
          }}
        >
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/juegos"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold group"
            >
              <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver /
              返回
            </Link>
            <SoundToggles />
          </div>
          <div className="text-center mb-10">
            <div className="inline-block mb-4 animate-float">
              <LayoutGridIcon
                size={48}
                className="text-[#39ecff] drop-shadow-[0_0_20px_rgba(57,236,255,0.5)]"
              />
            </div>
            <h1
              className="text-4xl md:text-6xl font-black mb-3 tracking-tight animate-depthFloat3D"
              style={{
                textShadow:
                  "0 0 40px rgba(0,212,255,0.4), 0 0 80px rgba(0,212,255,0.2), 0 0 120px rgba(0,212,255,0.1)",
                transformStyle: "preserve-3d",
              }}
            >
              Word Grid
            </h1>
            <p className="text-white/40 text-sm font-medium">
              Selecciona un módulo para jugar / 选择模块开始游戏
            </p>
            {O && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold animate-pulse"
                style={{
                  background: "rgba(255,68,68,.12)",
                  border: "1px solid rgba(255,68,68,.3)",
                  color: "#ff6b35",
                }}
              >
                {O}
              </div>
            )}
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            style={{
              perspective: "1200px",
            }}
          >
            <button
              onClick={() => {
                playClick();
                setO("");
                W(null);
              }}
              className="group relative rounded-2xl p-6 text-left overflow-hidden module-card-3d"
              style={{
                background: "rgba(14,22,64,.6)",
                border: pe,
                perspective: "800px",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: me,
                }}
              />
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "conic-gradient(from 0deg, transparent, rgba(255,0,170,0.3), transparent)",
                  animation: "neonBorderRotate 3s linear infinite",
                }}
              />
              <div className="relative z-10">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    background: xe,
                    boxShadow: fe,
                    transformStyle: "preserve-3d",
                    transform: "translateZ(15px)",
                  }}
                >
                  <LayersIcon size={28} className="text-white drop-shadow-lg" />
                </div>
                <h3 className="text-white font-black text-lg mb-1 group-hover:text-[#ff00aa] transition-colors">
                  Todos los módulos
                </h3>
                <p
                  className="text-xs font-medium mb-1"
                  style={{
                    color: "rgba(255,0,170,.8)",
                  }}
                >
                  所有模块
                </p>
                <p className="text-xs font-medium text-white/40">Mezcla todo el vocabulario</p>
              </div>
            </button>
            {le.map((t) => {
              const c = `1px solid ${t.color}40`;
              const g = `radial-gradient(circle at 50% 50%, ${t.color}15, transparent 70%)`;
              const h = `linear-gradient(135deg, ${t.color}, ${t.color}88)`;
              const a = `0 0 25px ${t.color}40`;
              const i = `${t.color}cc`;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    playClick();
                    setO("");
                    W(t.id);
                  }}
                  className="group relative rounded-2xl p-6 text-left overflow-hidden module-card-3d"
                  style={{
                    background: "rgba(14,22,64,.6)",
                    border: c,
                    perspective: "800px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: g,
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `conic-gradient(from 0deg, transparent, ${t.color}30, transparent)`,
                      animation: "neonBorderRotate 3s linear infinite",
                    }}
                  />
                  <div className="relative z-10">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        background: h,
                        boxShadow: a,
                        transformStyle: "preserve-3d",
                        transform: "translateZ(15px)",
                      }}
                    >
                      <BookOpenIcon size={28} className="text-white drop-shadow-lg" />
                    </div>
                    <h3 className="text-white font-black text-lg mb-1 group-hover:text-white transition-colors">
                      {t.titulo}
                    </h3>
                    <p
                      className="text-xs font-medium mb-1"
                      style={{
                        color: i,
                      }}
                    >
                      {t.tituloChino}
                    </p>
                    <p className="text-xs font-medium text-white/40">{t.vocabularioCount} palabras / 词</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <Se1Component expression={expression} />
      {d && (
        <svg
          className="fixed inset-0 z-40 pointer-events-none"
          style={{
            width: "100vw",
            height: "100vh",
          }}
        >
          <line
            x1={d.x1}
            y1={d.y1}
            x2={d.x2}
            y2={d.y2}
            stroke={d.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="8 6"
            className="animate-drawLine"
            style={{
              filter: `drop-shadow(0 0 8px ${d.color}) drop-shadow(0 0 12px ${d.color})`,
            }}
          />
          <circle
            cx={d.x1}
            cy={d.y1}
            r="6"
            fill={d.color}
            style={{
              filter: `drop-shadow(0 0 10px ${d.color})`,
            }}
            className="animate-ping"
          />
          <circle
            cx={d.x2}
            cy={d.y2}
            r="6"
            fill={d.color}
            style={{
              filter: `drop-shadow(0 0 10px ${d.color})`,
            }}
            className="animate-ping"
          />
        </svg>
      )}
      <div
        className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6 min-h-screen flex flex-col"
        style={{
          perspective: "1000px",
        }}
      >
        <div
          className="flex flex-wrap items-center justify-between mb-4 gap-2"
          style={{
            perspective: "800px",
          }}
        >
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold group"
          >
            <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver /
            返回
          </Link>
          <div
            className="flex items-center gap-2 flex-wrap justify-end"
            style={{
              perspective: "600px",
            }}
          >
            <SoundToggles />
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 score-badge-3d"
              style={{
                background: "rgba(57,255,20,.12)",
                border: "1px solid rgba(57,255,20,.25)",
                color: "#39ff14",
                boxShadow: "0 0 15px rgba(57,255,20,.2), 0 4px 15px rgba(0,0,0,.3)",
                transform: "translateZ(20px)",
                transformStyle: "preserve-3d",
              }}
            >
              <ZapIcon size={12} className="animate-pulse" /> {m}
            </div>
            <div
              className="relative"
              style={{
                perspective: "400px",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 timer-badge-3d"
                style={{
                  background: he,
                  border: be,
                  color: H,
                  boxShadow: ue,
                  transform: "translateZ(20px)",
                }}
              >
                <TimerIcon size={12} /> {b}s
              </div>
              <div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-full h-0.5 rounded-full overflow-hidden"
                style={{
                  width: "80%",
                }}
              >
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width,
                    background: H,
                    boxShadow: `0 0 8px ${ge}`,
                  }}
                />
              </div>
            </div>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 racha-badge-3d"
              style={{
                background: "rgba(255,0,170,.12)",
                border: "1px solid rgba(255,0,170,.25)",
                color: "#ff00aa",
                boxShadow: "0 0 15px rgba(255,0,170,.2), 0 4px 15px rgba(0,0,0,.3)",
                transform: "translateZ(20px)",
                transformStyle: "preserve-3d",
              }}
            >
              <CrosshairIcon size={12} /> Racha: {z}
            </div>
          </div>
        </div>
        <div
          className="text-center mb-3"
          style={{
            perspective: "600px",
          }}
        >
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-black mb-1 tracking-tight animate-titleGlow"
            style={{
              background: "linear-gradient(135deg,#39ff14,#00d4ff,#ff00aa)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradientShift 3s ease infinite, titleGlow 2s ease-in-out infinite alternate",
              transformStyle: "preserve-3d",
              transform: "translateZ(30px)",
            }}
          >
            Word Grid
          </h1>
          <p className="text-white/40 text-xs font-medium">
            Haz clic en las parejas correctas / 点击正确的配对
          </p>
        </div>
        {E && (
          <div
            className="text-center mb-3 text-sm font-black animate-message3DEntrance"
            style={{
              color: E.includes("Match") ? "#39ff14" : "#ff4444",
              textShadow: E.includes("Match")
                ? "0 0 12px rgba(57,255,20,.6), 0 0 24px rgba(57,255,20,.3), 0 0 48px rgba(57,255,20,.15)"
                : "0 0 12px rgba(255,68,68,.6), 0 0 24px rgba(255,68,68,.3), 0 0 48px rgba(255,68,68,.15)",
              transformStyle: "preserve-3d",
              perspective: "500px",
            }}
          >
            <span
              className="inline-flex items-center gap-2"
              style={{
                transform: "translateZ(40px)",
              }}
            >
              {E.includes("Match") ? (
                <SparklesIcon size={16} className="animate-spin-slow" />
              ) : (
                <CrosshairIcon size={16} />
              )}
              {E}
            </span>
          </div>
        )}
        <div className="flex justify-center flex-1" ref={deRef}>
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 w-full max-w-[800px] p-2 rounded-3xl"
            style={{
              perspective: "1200px",
              background: "rgba(0,0,0,0.2)",
              border: "1px solid rgba(0,212,255,0.1)",
              boxShadow: "0 0 40px rgba(0,212,255,0.05), inset 0 0 40px rgba(0,212,255,0.02)",
            }}
          >
            {u.map((t, c) => {
              const g = t.flipped || t.matched;
              const h = ne === t.id;
              const a = T[t.pairId % T.length];
              const i = t.matched
                ? `linear-gradient(145deg, ${a}18, ${a}08)`
                : "linear-gradient(145deg, rgba(14,22,64,.95), rgba(5,8,27,.85))";
              const Z = t.matched ? `1px solid ${a}80` : `1px solid ${a}55`;
              const w = t.matched
                ? `0 0 30px ${a}40, inset 0 0 20px ${a}10, 0 8px 32px rgba(0,0,0,.4)`
                : `0 0 20px ${a}20, inset 0 1px 1px rgba(255,255,255,.05), 0 8px 32px rgba(0,0,0,.4)`;
              const textShadow = t.matched
                ? `0 0 12px ${a}60, 0 0 24px ${a}30, 0 0 48px ${a}15`
                : `0 0 10px ${a}40`;
              const A = t.matched ? a : t.isSpanish ? "#00d4ff" : "#ffd600";
              const l = c * 0.06;
              return (
                <div
                  key={t.id}
                  id={`grid-card-${t.id}`}
                  onClick={() => ce(t)}
                  className="relative cursor-pointer group"
                  style={{
                    perspective: "800px",
                    width: "100%",
                    aspectRatio: "4/3",
                    animation: `gridEntrance 0.5s ease-out ${l}s both`,
                  }}
                >
                  <div
                    className="absolute inset-0 transition-all duration-500"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: g ? "rotateY(180deg)" : "rotateY(0deg)",
                      animation: h ? "gridShake 0.5s ease" : undefined,
                      perspective: "600px",
                    }}
                  >
                    <div
                      className="absolute inset-0 flex items-center justify-center font-black rounded-xl sm:rounded-2xl backface-hidden grid-card-front"
                      style={{
                        background: "linear-gradient(145deg, rgba(255,255,255,.1), rgba(255,255,255,.02))",
                        border: "1px solid rgba(255,255,255,.15)",
                        backfaceVisibility: "hidden",
                        boxShadow:
                          "0 8px 32px rgba(0,0,0,.4), inset 0 1px 1px rgba(255,255,255,.08), 0 0 0 1px rgba(255,255,255,.05)",
                      }}
                    >
                      <span
                        className="text-2xl sm:text-3xl md:text-4xl"
                        style={{
                          color: "rgba(255,255,255,.25)",
                          textShadow: "0 0 20px rgba(255,255,255,.1)",
                        }}
                      >
                        ?
                      </span>
                      <div
                        className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 50%, rgba(0,212,255,0.08), transparent 70%)",
                          border: "1px solid rgba(0,212,255,0.2)",
                        }}
                      />
                    </div>
                    <div
                      className={`absolute inset-0 flex items-center justify-center font-bold text-xs sm:text-sm md:text-base rounded-xl sm:rounded-2xl backface-hidden px-1 sm:px-2 text-center ${t.matched ? "animate-spectacularMatchFlash" : ""}${h ? " animate-wrongRedGlow" : ""}`}
                      style={{
                        background: i,
                        border: Z,
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg) translateZ(12px)",
                        color: A,
                        boxShadow: w,
                        textShadow,
                      }}
                    >
                      <span
                        className="leading-tight break-words"
                        style={{
                          transform: "translateZ(8px)",
                        }}
                      >
                        {t.text}
                      </span>
                      {t.matched && (
                        <div className="absolute -top-1 -right-1 animate-starSparkle">
                          <StarIcon
                            size={14}
                            fill={a}
                            stroke={a}
                            style={{
                              filter: `drop-shadow(0 0 6px ${a})`,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {r === "gameover" && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.9)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div
              className="text-center p-6 sm:p-8 rounded-3xl max-w-sm mx-4 relative overflow-hidden animate-floatModal"
              style={{
                background: "linear-gradient(180deg, rgba(14,22,64,.85), rgba(5,8,27,.65))",
                border: "1px solid rgba(57,255,20,.25)",
                boxShadow: "0 0 80px rgba(57,255,20,.15), 0 25px 50px rgba(0,0,0,.5)",
                transform: "rotateX(5deg)",
                perspective: "800px",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-70 animate-pulseGlow"
                style={{
                  background: "linear-gradient(135deg, #39ff14, #00d4ff, #ff00aa)",
                  filter: "blur(30px)",
                }}
              />
              <div className="mb-4 animate-trophySpin">
                <TrophyIcon
                  size={60}
                  style={{
                    color: "#ffd600",
                    margin: "0 auto",
                    filter: "drop-shadow(0 0 20px rgba(255,214,0,.6))",
                  }}
                />
              </div>
              <h2
                className="text-3xl sm:text-4xl font-black mb-2 tracking-tight"
                style={{
                  background: "linear-gradient(135deg, #39ff14, #00d4ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 10px rgba(57,255,20,.3))",
                }}
              >
                {L ? "¡Completado!" : "¡Tiempo!"}
              </h2>
              <p className="text-white/50 text-sm mb-6">{L ? "网格完成！" : "时间到了！"}</p>
              <div
                className="grid grid-cols-2 gap-3 mb-6"
                style={{
                  perspective: "600px",
                }}
              >
                <div
                  className="p-3 rounded-xl relative overflow-hidden group game-over-card-3d"
                  style={{
                    background: "rgba(57,255,20,.1)",
                    border: "1px solid rgba(57,255,20,.2)",
                    transform: "translateZ(20px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: "radial-gradient(circle, rgba(57,255,20,.15), transparent)",
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      background: "conic-gradient(from 0deg, transparent, rgba(57,255,20,0.3), transparent)",
                      animation: "neonBorderRotate 3s linear infinite",
                    }}
                  />
                  <ZapIcon
                    size={18}
                    style={{
                      color: "#39ff14",
                      margin: "0 auto 6px",
                      filter: "drop-shadow(0 0 6px rgba(57,255,20,.5))",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Score
                  </p>
                  <p
                    className="text-xl font-black"
                    style={{
                      color: "#39ff14",
                    }}
                  >
                    {m}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl relative overflow-hidden group game-over-card-3d"
                  style={{
                    background: "rgba(255,0,170,.1)",
                    border: "1px solid rgba(255,0,170,.2)",
                    transform: "translateZ(20px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: "radial-gradient(circle, rgba(255,0,170,.15), transparent)",
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      background: "conic-gradient(from 0deg, transparent, rgba(255,0,170,0.3), transparent)",
                      animation: "neonBorderRotate 3s linear infinite",
                    }}
                  />
                  <TrophyIcon
                    size={18}
                    style={{
                      color: "#ff00aa",
                      margin: "0 auto 6px",
                      filter: "drop-shadow(0 0 6px rgba(255,0,170,.5))",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Mejor
                  </p>
                  <p
                    className="text-xl font-black"
                    style={{
                      color: "#ff00aa",
                    }}
                  >
                    {C}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => {
                    playClick();
                    W(null);
                  }}
                  className="px-6 sm:px-8 py-3 rounded-full text-white font-black game-over-btn-3d"
                  style={{
                    background: "linear-gradient(135deg, #39ff14, #00d4a0)",
                    boxShadow: "0 0 25px rgba(57,255,20,.3), 0 8px 25px rgba(0,0,0,.3)",
                    transform: "translateZ(25px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  Jugar de nuevo / 再玩一次
                </button>
              </div>
              <P currentGameId="word-grid" />
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes gridEntrance {
          from { transform: scale(0) rotateY(0) translateZ(60px); opacity: 0; }
          to { transform: scale(1) rotateY(0) translateZ(12px); opacity: 1; }
        }
        @keyframes gridShake {
          0%, 100% { transform: translateX(0) rotateY(180deg); }
          20% { transform: translateX(-10px) rotateY(180deg); }
          40% { transform: translateX(10px) rotateY(180deg); }
          60% { transform: translateX(-7px) rotateY(180deg); }
          80% { transform: translateX(7px) rotateY(180deg); }
        }
        @keyframes kawaiiFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes kawaiiBounce {
          from { transform: translateY(0) scale(1); }
          to { transform: translateY(-12px) scale(1.05); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes titleGlow {
          from { filter: drop-shadow(0 0 10px rgba(57,255,20,.3)); }
          to { filter: drop-shadow(0 0 25px rgba(0,212,255,.5)); }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes floatModal {
          0%, 100% { transform: translateY(0) rotateX(5deg); }
          50% { transform: translateY(-6px) rotateX(5deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
        }
        @keyframes pop {
          0% { transform: scale(0); }
          80% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        @keyframes trophySpin {
          0% { transform: rotate(-10deg) scale(1); }
          50% { transform: rotate(10deg) scale(1.1); }
          100% { transform: rotate(-10deg) scale(1); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes drawLine {
          from { stroke-dashoffset: 200; opacity: 0; }
          to { stroke-dashoffset: 0; opacity: 1; }
        }
        /* NEW SPECTACULAR 3D ANIMATIONS */
        @keyframes depthFloat3D {
          0%, 100% { transform: translateY(0) translateZ(30px) rotateX(0deg); }
          50% { transform: translateY(-10px) translateZ(50px) rotateX(2deg); }
        }
        @keyframes neonPulseBorder {
          0%, 100% { border-color: rgba(0,212,255,0.25); box-shadow: 0 0 10px rgba(0,212,255,0.1), inset 0 0 10px rgba(0,212,255,0.02); }
          50% { border-color: rgba(0,212,255,0.6); box-shadow: 0 0 25px rgba(0,212,255,0.3), inset 0 0 20px rgba(0,212,255,0.05); }
        }
        @keyframes spectacularMatchFlash {
          0% { filter: brightness(1) saturate(1); box-shadow: 0 0 0 0 rgba(57,255,20,0); }
          15% { filter: brightness(4) saturate(2.5); box-shadow: 0 0 80px 40px rgba(57,255,20,0.5); }
          30% { filter: brightness(2) saturate(1.8); box-shadow: 0 0 50px 25px rgba(57,255,20,0.3); }
          100% { filter: brightness(1) saturate(1); box-shadow: 0 0 30px 10px rgba(57,255,20,0.15); }
        }
        @keyframes message3DEntrance {
          0% { transform: scale(0) rotateY(-90deg) translateZ(-80px); opacity: 0; }
          60% { transform: scale(1.15) rotateY(10deg) translateZ(30px); opacity: 1; }
          100% { transform: scale(1) rotateY(0deg) translateZ(0px); opacity: 1; }
        }
        @keyframes neonBorderRotate {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes wrongRedGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,68,68,0.3); }
          50% { box-shadow: 0 0 40px rgba(255,68,68,0.6); }
        }
        @keyframes starSparkle {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.4) rotate(180deg); opacity: 1; }
          100% { transform: scale(1) rotate(360deg); opacity: 1; }
        }
        @keyframes gridLinePulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.5; }
        }
        @keyframes scorePop3D {
          0% { transform: scale(1) translateZ(0); }
          50% { transform: scale(1.4) translateZ(30px); }
          100% { transform: scale(1) translateZ(0); }
        }
        @keyframes glassFloat3D {
          0%, 100% { transform: translateY(0) rotateX(0deg) translateZ(20px); }
          50% { transform: translateY(-6px) rotateX(2deg) translateZ(35px); }
        }
        @keyframes neonTextGlow {
          0%, 100% { text-shadow: 0 0 10px currentColor, 0 0 20px currentColor; }
          50% { text-shadow: 0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor; }
        }
        .animate-bounceIn { animation: bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .animate-float { animation: kawaiiFloat 3s ease-in-out infinite; }
        .animate-floatModal { animation: floatModal 4s ease-in-out infinite; }
        .animate-pulseGlow { animation: pulseGlow 2s ease-in-out infinite; }
        .animate-pop { animation: pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .animate-trophySpin { animation: trophySpin 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spinSlow 3s linear infinite; }
        .animate-drawLine { animation: drawLine 0.6s ease-out forwards; }
        /* NEW UTILITY CLASSES */
        .animate-depthFloat3D { animation: depthFloat3D 3s ease-in-out infinite; }
        .animate-neonPulseBorder { animation: neonPulseBorder 2s ease-in-out infinite; }
        .animate-spectacularMatchFlash { animation: spectacularMatchFlash 0.8s ease-out forwards; }
        .animate-message3DEntrance { animation: message3DEntrance 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }
        .animate-neonBorderRotate { animation: neonBorderRotate 3s ease infinite; }
        .animate-wrongRedGlow { animation: wrongRedGlow 0.5s ease-in-out infinite; }
        .animate-starSparkle { animation: starSparkle 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .animate-gridLinePulse { animation: gridLinePulse 2s ease-in-out infinite; }
        .animate-scorePop3D { animation: scorePop3D 0.3s ease-out; }
        .animate-glassFloat3D { animation: glassFloat3D 4s ease-in-out infinite; }
        .animate-neonTextGlow { animation: neonTextGlow 2s ease-in-out infinite; }
        .shadow-neon:hover { box-shadow: 0 0 20px rgba(0,212,255,0.3), 0 0 40px rgba(0,212,255,0.1), inset 0 0 10px rgba(0,212,255,0.05); }
        /* 3D hover effects */
        .module-card-3d { transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease; }
        .module-card-3d:hover { transform: rotateY(5deg) rotateX(-3deg) translateZ(20px) scale(1.03) translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(0,212,255,0.15); }
        .grid-card-front { transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease; transform: translateZ(12px); }
        .grid-card-front:hover { box-shadow: 0 8px 32px rgba(0,0,0,.4), inset 0 1px 1px rgba(255,255,255,.08), 0 0 0 1px rgba(255,255,255,.05), 0 0 30px rgba(0,212,255,0.2), 0 0 60px rgba(0,212,255,0.1); border: 1px solid rgba(0,212,255,0.3); transform: translateZ(20px) rotateX(-2deg) rotateY(2deg); }
        .score-badge-3d { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .score-badge-3d:hover { transform: translateZ(30px) scale(1.1); box-shadow: 0 0 25px rgba(57,255,20,.4), 0 8px 25px rgba(0,0,0,.3); }
        .timer-badge-3d { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .timer-badge-3d:hover { transform: translateZ(30px) scale(1.1); box-shadow: 0 0 20px rgba(255,214,0,.4), 0 8px 25px rgba(0,0,0,.3); }
        .racha-badge-3d { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .racha-badge-3d:hover { transform: translateZ(30px) scale(1.1); box-shadow: 0 0 25px rgba(255,0,170,.4), 0 8px 25px rgba(0,0,0,.3); }
        .game-over-card-3d { transition: transform 0.3s ease; }
        .game-over-card-3d:hover { transform: translateZ(35px) scale(1.05); }
        .game-over-btn-3d { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .game-over-btn-3d:hover { transform: translateZ(35px) scale(1.05); box-shadow: 0 0 40px rgba(57,255,20,.5), 0 12px 35px rgba(0,0,0,.4); }
        .game-over-btn-3d:active { transform: translateZ(15px) scale(0.95); }
      `}</style>
    </StarfieldBackground>
  );
}
export { WeComponent as default };
