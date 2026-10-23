import {
  SparklesIcon,
  ZapIcon,
  HeartIcon,
  TrophyIcon,
  BookOpenIcon,
  ArrowLeftIcon,
  TargetIcon,
  LayersIcon,
  FlameIcon,
  TimerIcon,
  WindIcon,
  TreePineIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g as g_1, a as a_1 } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
function Ke(o) {
  const p = [...o];
  for (let i = p.length - 1; i > 0; i--) {
    const h = Math.floor(Math.random() * (i + 1));
    [p[i], p[h]] = [p[h], p[i]];
  }
  return p;
}
function je(o, p) {
  const i = [
    "#ff00aa",
    "#00d4ff",
    "#ffd600",
    "#39ff14",
    "#ff6b35",
    "#b829dd",
    "#ff4444",
    "#ffffff",
    "#ff00ff",
    "#00ff88",
  ];
  const h = ["circle", "square", "triangle"];
  const c = o ?? window.innerWidth / 2;
  const m = p ?? window.innerHeight / 2;
  for (let f = 0; f < 120; f++) {
    const b = document.createElement("div");
    const N = h[f % h.length];
    const g = 6 + Math.random() * 10;
    let w = "";
    switch (N) {
      case "circle":
        w = `border-radius:50%;width:${g}px;height:${g}px;background:${i[f % i.length]};`;
        break;
      case "square":
        w = `border-radius:2px;width:${g}px;height:${g}px;background:${i[f % i.length]};`;
        break;
      default:
        w = `width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:12px solid ${i[f % i.length]};background:transparent;`;
    }
    b.style.cssText = `position:fixed;left:${c}px;top:${m}px;${w}pointer-events:none;z-index:9999;`;
    document.body.appendChild(b);
    const S = (Math.PI * 2 * f) / 120 + (Math.random() - 0.5) * 0.8;
    const C = 4 + Math.random() * 20;
    let j = c;
    let M = m;
    let L = 1;
    let T = 0;
    let F = (Math.random() - 0.5) * 25;
    const P = Math.cos(S) * C;
    const X = Math.sin(S) * C;
    const W = () => {
      j += P;
      M += X + 3;
      T += F;
      L -= 0.012;
      b.style.left = `${j}px`;
      b.style.top = `${M}px`;
      b.style.opacity = String(L);
      if (N !== "triangle") {
        b.style.transform = `rotate(${T}deg)`;
      }
      if (L > 0) {
        requestAnimationFrame(W);
      } else {
        b.remove();
      }
    };
    requestAnimationFrame(W);
  }
}
function Ke1Component({ expression, scale = 1 }) {
  const i = expression === "happy" ? 2 : expression === "excited" ? 3 : expression === "sad" ? -1 : 0;
  const d =
    expression === "happy"
      ? "M 12 30 Q 20 40 28 30"
      : expression === "excited"
        ? "M 12 28 Q 20 45 28 28"
        : expression === "sad"
          ? "M 12 38 Q 20 28 28 38"
          : "M 14 34 Q 20 37 26 34";
  const opacity = expression === "happy" || expression === "excited" ? 0.7 : expression === "sad" ? 0.2 : 0.4;
  const m = expression === "excited";
  const f = expression === "excited" || expression === "happy";
  return (
    <div
      className={f ? "animate-mascot-bounce" : "animate-mascot-float"}
      style={{
        filter: "drop-shadow(0 0 12px rgba(57,255,20,.6)) drop-shadow(0 0 30px rgba(57,255,20,.3))",
      }}
    >
      <svg width={90 * scale} height={100 * scale} viewBox="0 0 40 48" className="overflow-visible">
        <defs>
          <linearGradient id="hoodGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a8a5a" />
            <stop offset="100%" stopColor="#1a5a3a" />
          </linearGradient>
          <linearGradient id="faceGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffe8d8" />
            <stop offset="100%" stopColor="#ffd0b0" />
          </linearGradient>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a9a6a" />
            <stop offset="100%" stopColor="#2a6a4a" />
          </linearGradient>
        </defs>
        <ellipse cx="20" cy="47" rx="12" ry="2" fill="rgba(0,0,0,0.3)" />
        <path d="M 4 18 L -2 10 L 6 14 Z" fill="#ffe8d8" stroke="#e0c0a0" strokeWidth="0.5" />
        <path d="M 36 18 L 42 10 L 34 14 Z" fill="#ffe8d8" stroke="#e0c0a0" strokeWidth="0.5" />
        <path
          d="M 6 16 Q 20 2 34 16 Q 36 28 34 36 L 6 36 Q 4 28 6 16 Z"
          fill="url(#hoodGrad)"
          stroke="#1a6a3a"
          strokeWidth="1"
        />
        <path d="M 12 10 Q 20 6 28 10" fill="none" stroke="#1a6a3a" strokeWidth="1" opacity="0.5" />
        <path d="M 28 8 Q 32 2 36 6 Q 34 10 30 10 Z" fill="#ff6b35" stroke="#cc4400" strokeWidth="0.5" />
        <path d="M 28 8 Q 32 2 36 6" fill="none" stroke="#ffd600" strokeWidth="0.5" />
        <ellipse cx="20" cy="24" rx="13" ry="12" fill="url(#faceGrad)" />
        <ellipse
          cx="10"
          cy="29"
          rx="3.5"
          ry="2.5"
          fill="#ff8899"
          opacity={opacity}
          className="animate-pulse-slow"
        />
        <ellipse
          cx="30"
          cy="29"
          rx="3.5"
          ry="2.5"
          fill="#ff8899"
          opacity={opacity}
          className="animate-pulse-slow"
        />
        {m ? (
          <>
            <polygon points="11,18 13,23 18,23 14,26 15,31 11,27 7,31 8,26 4,23 9,23" fill="#39ff14" />
            <polygon points="29,18 31,23 36,23 32,26 33,31 29,27 25,31 26,26 22,23 27,23" fill="#39ff14" />
            <circle cx="11" cy="25" r="1" fill="white" />
            <circle cx="29" cy="25" r="1" fill="white" />
          </>
        ) : expression === "happy" ? (
          <>
            <path
              d="M 10 22 Q 14 18 18 22"
              fill="none"
              stroke="#1a1a2e"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 22 22 Q 26 18 30 22"
              fill="none"
              stroke="#1a1a2e"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            <ellipse cx="14" cy={22 + i} rx="3" ry={expression === "sad" ? 2.5 : 4} fill="#1a1a2e" />
            <ellipse cx="26" cy={22 + i} rx="3" ry={expression === "sad" ? 2.5 : 4} fill="#1a1a2e" />
            <circle cx="15.5" cy={20.5 + i} r="1.2" fill="white" />
            <circle cx="27.5" cy={20.5 + i} r="1.2" fill="white" />
            {expression === "sad" && (
              <>
                <path d="M 10 18 Q 14 20 18 18" fill="none" stroke="#1a1a2e" strokeWidth="1" opacity="0.5" />
                <path d="M 22 18 Q 26 20 30 18" fill="none" stroke="#1a1a2e" strokeWidth="1" opacity="0.5" />
              </>
            )}
          </>
        )}
        {expression === "sad" && (
          <>
            <circle cx="11" cy="28" r="1.5" fill="#00d4ff" opacity="0.7">
              <animate attributeName="cy" values="28;32;28" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0;0.7" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="29" cy="28" r="1.5" fill="#00d4ff" opacity="0.7">
              <animate attributeName="cy" values="28;32;28" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0;0.7" dur="2.5s" repeatCount="indefinite" />
            </circle>
          </>
        )}
        <path d={d} fill="none" stroke="#c45c6a" strokeWidth="1.5" strokeLinecap="round" />
        <path
          d="M 8 34 L 6 46 Q 20 50 34 46 L 32 34 Z"
          fill="url(#bodyGrad)"
          stroke="#2a6a3a"
          strokeWidth="1"
        />
        <rect x="18" y="40" width="4" height="4" rx="1" fill="#ffd600" />
        <path d="M 28 40 Q 38 34 38 44 Q 38 54 28 48" fill="none" stroke="#8b6a4a" strokeWidth="2" />
        <line x1="33" y1="34" x2="33" y2="54" stroke="#c0a060" strokeWidth="1" />
        <path d="M 33 34 L 33 38" stroke="#ffd600" strokeWidth="2" />
        <path d="M 31 38 L 35 38 L 33 42 Z" fill="#ffd600" />
      </svg>
    </div>
  );
}
function UeComponent({ m: m_1, onClick }) {
  const [i, setI] = React.useState({
    x: 0,
    y: 0,
  });
  const cRef = React.useRef(null);
  const { playClick } = useSound();
  const onMouseMove = (N) => {
    if (!cRef.current) {
      return;
    }
    const g = cRef.current.getBoundingClientRect();
    const w = (N.clientX - g.left) / g.width;
    const S = (N.clientY - g.top) / g.height;
    setI({
      x: (S - 0.5) * -20,
      y: (w - 0.5) * 20,
    });
  };
  const onMouseLeave = () =>
    setI({
      x: 0,
      y: 0,
    });
  return (
    <button
      ref={cRef}
      onClick={() => {
        playClick();
        onClick();
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group rounded-xl p-5 text-left transition-all relative overflow-hidden block w-full"
      style={{
        background: "linear-gradient(180deg,rgba(14,22,64,.65),rgba(5,8,27,.5))",
        border: `1px solid ${m_1.color}40`,
        transform: `perspective(600px) rotateX(${i.x}deg) rotateY(${i.y}deg) translateZ(10px)`,
        transformStyle: "preserve-3d",
        boxShadow: "0 10px 40px rgba(0,0,0,.4)",
      }}
    >
      <div
        className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, ${m_1.color}00, ${m_1.color}, ${m_1.color}00)`,
          backgroundSize: "200% 100%",
          animation: "borderRotate 2s linear infinite",
          zIndex: -1,
        }}
      />
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
        style={{
          background: `linear-gradient(135deg, ${m_1.color}, ${m_1.color}88)`,
          transform: "translateZ(20px)",
        }}
      >
        <BookOpenIcon size={24} className="text-white" />
      </div>
      <h3
        className="text-white font-black text-base mb-1"
        style={{
          transform: "translateZ(15px)",
        }}
      >
        {m_1.titulo}
      </h3>
      <p
        className="text-xs font-medium mb-1"
        style={{
          color: `${m_1.color}aa`,
          transform: "translateZ(10px)",
        }}
      >
        {m_1.tituloChino}
      </p>
      <p
        className="text-xs font-medium text-white/40"
        style={{
          transform: "translateZ(5px)",
        }}
      >
        {m_1.vocabularioCount} palabras / 词
      </p>
    </button>
  );
}
function LtComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [m, setM] = React.useState("select");
  const [b, setB] = React.useState([]);
  const [g, setG] = React.useState([]);
  const [S, setS] = React.useState([]);
  const [j, setJ] = React.useState("");
  const [L, setL] = React.useState(0);
  const [F, setF] = React.useState(5);
  const [X, setX] = React.useState(0);
  const [Se, setSe] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("wordarcher_bestcombo") || "0");
    } catch {
      return 0;
    }
  });
  const [$, set$] = React.useState(90);
  const [I, setI] = React.useState(1);
  const [Z, setZ] = React.useState(0);
  const [E, setE] = React.useState([]);
  const [Me, setMe] = React.useState(false);
  const [R, setR] = React.useState({
    x: 0,
    y: 0,
  });
  const ARef = React.useRef(0);
  const [x, setX_1] = React.useState(0);
  const BRef = React.useRef(null);
  const neRef = React.useRef(1);
  const QRef = React.useRef(null);
  const ORef = React.useRef(null);
  const DRef = React.useRef(null);
  const Le = g_1();
  const [le, setLe] = React.useState("");
  const HRef = React.useRef(0);
  const zRef = React.useRef(0);
  const [expression, setExpression] = React.useState("neutral");
  const VRef = React.useRef(null);
  const [ze, setZe] = React.useState(false);
  const [Ce, setCe] = React.useState(false);
  const [Fe, setFe] = React.useState(new Set());
  const fe = (t) => {
    setExpression(t);
    if (VRef.current) {
      clearTimeout(VRef.current);
    }
    VRef.current = setTimeout(() => setExpression("neutral"), 1200);
  };
  const K = React.useCallback(
    (t) => {
      playClick();
      let a = t ? a_1(t) : a_1();
      if (a.length === 0) {
        setLe('Este módulo no tiene palabras válidas. Prueba con otro o selecciona "Todos los módulos".');
        return;
      }
      const r = Ke(
        a
          .filter((d) => d.espanol && d.chino)
          .map((d) => ({
            espanol: d.espanol
              .toUpperCase()
              .replace(/[¿?¡!.,;:'"]/g, "")
              .trim(),
            chino: d.chino.trim(),
          }))
          .filter((d) => d.espanol.length >= 3 && d.espanol.length <= 12),
      );
      const n = [];
      const l = new Set();
      for (const d of r) {
        if (!l.has(d.espanol)) {
          l.add(d.espanol);
          n.push(d);
        }
      }
      setB(n);
      setG([]);
      setS([]);
      setJ("");
      setL(0);
      HRef.current = 0;
      setF(5);
      setX(0);
      zRef.current = 0;
      setI(1);
      set$(90);
      setZ(0);
      setE([]);
      setR({
        x: 0,
        y: 0,
      });
      ARef.current = 0;
      neRef.current = 1;
      setExpression("neutral");
      setM("playing");
    },
    [playClick],
  );
  React.useEffect(() => {
    if (m === "playing") {
      QRef.current = setInterval(() => {
        set$((t) => {
          if (t <= 1) {
            return (
              setM("gameover"),
              playLose(),
              setSe((a) => {
                const r = Math.max(a, zRef.current);
                localStorage.setItem("wordarcher_bestcombo", String(r));
                return r;
              }),
              0
            );
          }
          return t - 1;
        });
      }, 1000);
      return () => {
        if (QRef.current) {
          clearInterval(QRef.current);
        }
      };
    }
  }, [m, playLose]);
  React.useEffect(() => {
    if (m !== "playing") {
      return;
    }
    const t = setInterval(() => {
      ARef.current += 0.1;
      const ARef_current = ARef.current;
      setR({
        x: Math.sin(ARef_current) * 15,
        y: Math.cos(ARef_current * 0.7) * 5,
      });
    }, 100);
    return () => clearInterval(t);
  }, [m]);
  React.useEffect(() => {
    if (m === "playing") {
      ORef.current = setInterval(
        () => {
          setG((t) => {
            if (t.length >= 5) {
              return t;
            }
            const BRef_current = BRef.current;
            if (!BRef_current) {
              return t;
            }
            const { clientWidth, clientHeight } = BRef_current;
            const l = b[Math.floor(Math.random() * b.length)];
            if (!l) {
              return t;
            }
            const ring = Math.floor(Math.random() * 5) + 1;
            return [
              ...t,
              {
                id: neRef.current++,
                espanol: l.espanol,
                chino: l.chino,
                x: 60 + Math.random() * Math.max(20, clientWidth - 180),
                y: 40 + Math.random() * Math.max(20, clientHeight - 200),
                hit: false,
                ring,
                stuckArrows: [],
              },
            ];
          });
        },
        Math.max(3500 - I * 150, 1800),
      );
      return () => {
        if (ORef.current) {
          clearInterval(ORef.current);
        }
      };
    }
  }, [m, b, I]);
  React.useEffect(() => {
    if (S.length !== 0) {
      DRef.current = setInterval(() => {
        setS((t) =>
          t
            .map((r) => {
              const progress = r.progress + 0.06;
              if (progress >= 1) {
                return null;
              }
              return {
                ...r,
                progress,
              };
            })
            .filter(Boolean),
        );
      }, 30);
      return () => {
        if (DRef.current) {
          clearInterval(DRef.current);
        }
      };
    }
  }, [S.length]);
  React.useEffect(() => {
    if (E.length === 0) {
      return;
    }
    const t = setInterval(() => {
      setE((a) =>
        a
          .map((r) => ({
            ...r,
            y: r.y - 1,
            life: r.life - 0.02,
          }))
          .filter((r) => r.life > 0),
      );
    }, 30);
    return () => clearInterval(t);
  }, [E.length]);
  React.useEffect(() => {
    if (j.length > 0) {
      setX_1(Math.min(1, j.length / 4));
    } else {
      setX_1(0);
    }
  }, [j]);
  const onChange = (t) => {
    const a = t.target.value.trim();
    setJ(a);
    if (!a) {
      return;
    }
    const r = g.find((n) => n.chino === a && !n.hit);
    if (r) {
      const n = BRef.current;
      if (n) {
        const u = n.getBoundingClientRect();
        const x_1 = u.width / 2;
        const y_1 = u.height - 60;
        const targetX = r.x + 50;
        const targetY = r.y + 50;
        setS((Ie) => [
          ...Ie,
          {
            id: Date.now() + Math.random(),
            x: x_1,
            y: y_1,
            targetX,
            targetY,
            progress: 0,
            windX: R.x,
            windY: R.y,
          },
        ]);
      }
      setG((u) =>
        u.map((y) => {
          if (y.id === r.id) {
            return {
              ...y,
              hit: true,
              stuckArrows: [
                ...y.stuckArrows,
                {
                  id: Date.now() + Math.random(),
                  angle: Math.random() * 20 - 10 + (R.x > 0 ? 15 : -15),
                  offsetX: 30 + Math.random() * 20,
                  offsetY: 20 + Math.random() * 20,
                },
              ],
            };
          }
          return y;
        }),
      );
      setTimeout(() => {
        setG((u) => u.filter((y) => y.id !== r.id));
      }, 900);
      const l = r.ring === 1;
      const d = l ? 300 : 100;
      const k = zRef.current * 25;
      const Y = d + k;
      HRef.current += Y;
      setL(HRef.current);
      zRef.current += 1;
      setX(zRef.current);
      setZ((u) => u + 1);
      playCorrect();
      if (l) {
        const u = BRef.current;
        if (u) {
          const y = u.getBoundingClientRect();
          je(y.left + r.x + 50, y.top + r.y + 50);
        } else {
          je();
        }
      }
      setE((u) => [
        ...u,
        {
          id: Date.now() + Math.random() + 2000,
          x: r.x + 50,
          y: r.y,
          text: l ? `🎯 +${Y} BULLSEYE!` : `+${Y}`,
          color: l ? "#ffd600" : "#00d4ff",
          life: 1.5,
        },
      ]);
      fe(l ? "excited" : "happy");
      setZe(true);
      setTimeout(() => setZe(false), 300);
      setJ("");
    }
  };
  const onKeyDown = (t) => {
    if (t.key === "Enter") {
      const a = j.trim();
      if (!a) {
        return;
      }
      if (!g.find((n) => n.chino === a && !n.hit)) {
        playWrong();
        setMe(true);
        setCe(true);
        setTimeout(() => {
          setMe(false);
          setCe(false);
        }, 400);
        setFe(new Set(g.filter((n) => !n.hit).map((n) => n.id)));
        setTimeout(() => setFe(new Set()), 600);
        setX(0);
        zRef.current = 0;
        setF((n) => {
          const l = n - 1;
          if (l <= 0) {
            setM("gameover");
            playLose();
            setSe((d) => {
              const k = Math.max(d, zRef.current);
              localStorage.setItem("wordarcher_bestcombo", String(k));
              return k;
            });
          }
          return Math.max(l, 0);
        });
        setJ("");
        fe("sad");
      }
    }
  };
  React.useEffect(() => {
    const t = Math.floor(Z / 5) + 1;
    setI(t);
  }, [Z]);
  const onClick = () => {
    playClick();
    K(null);
  };
  const v = (ring) => ["#ffd600", "#ff6b35", "#ff3860", "#00d4ff", "#39ff14"][ring - 1] || "#ffd600";
  const Re = (ring) => [28, 44, 60, 76, 92][ring - 1] || 92;
  const Ye = (t) => {
    const t_progress = t.progress;
    const r = t.targetX - t.x;
    const n = t.targetY - t.y;
    const cx = t.x + r * t_progress + t.windX * Math.sin(t_progress * Math.PI) * 0.8;
    const cy = t.y + n * t_progress + t.windY * Math.sin(t_progress * Math.PI) * 0.5;
    const k = 0.01;
    const Y = t.x + r * (t_progress + k) + t.windX * Math.sin((t_progress + k) * Math.PI) * 0.8;
    const u = t.y + n * (t_progress + k) + t.windY * Math.sin((t_progress + k) * Math.PI) * 0.5;
    const angle = (Math.atan2(u - cy, Y - cx) * 180) / Math.PI;
    return {
      cx,
      cy,
      angle,
    };
  };
  if (m === "select") {
    return (
      <StarfieldBackground>
        <div
          className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative"
          style={{
            perspective: "1000px",
          }}
        >
          <SoundToggles />
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/juegos"
              onClick={() => playClick()}
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold group"
            >
              <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver /
              返回
            </Link>
          </div>
          <div className="text-center mb-10 relative">
            <div
              className="relative w-28 h-28 mx-auto mb-4 md:w-36 md:h-36"
              style={{
                animation: "archerFloat 3s ease-in-out infinite",
              }}
            >
              <div
                className="absolute inset-0 rounded-3xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg,#00d4ff,#39ff14)",
                  boxShadow:
                    "0 0 60px rgba(0,212,255,0.7), 0 0 100px rgba(57,255,20,0.4), 0 0 150px rgba(0,212,255,0.2), inset 0 0 20px rgba(255,255,255,0.1)",
                }}
              >
                <TargetIcon
                  size={48}
                  className="text-white relative z-10 md:w-14 md:h-14"
                  style={{
                    filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-3xl animate-pulse-neon opacity-50"
                  style={{
                    background: "linear-gradient(135deg,transparent,rgba(255,255,255,0.2))",
                  }}
                />
              </div>
              <div
                className="absolute -right-2 top-1/2 -translate-y-1/2"
                style={{
                  width: "44px",
                  height: "64px",
                  border: "3px solid rgba(255,255,255,0.4)",
                  borderRadius: "0 50% 50% 0",
                  borderLeft: "none",
                  filter: "drop-shadow(0 0 8px #00d4ff)",
                }}
              />
              <div
                className="absolute -top-4 -left-4 w-8 h-8 rounded-full animate-firefly"
                style={{
                  background: "radial-gradient(circle, #ffd600, transparent)",
                  filter: "blur(4px)",
                }}
              />
              <div
                className="absolute -bottom-2 -right-6 w-6 h-6 rounded-full animate-firefly-delayed"
                style={{
                  background: "radial-gradient(circle, #00d4ff, transparent)",
                  filter: "blur(3px)",
                  animationDelay: "1s",
                }}
              />
            </div>
            <h1
              className="text-4xl md:text-6xl font-black mb-2 relative inline-block"
              style={{
                background: "linear-gradient(135deg,#00d4ff 0%,#39ff14 50%,#ffd600 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 40px rgba(0,212,255,.5))",
              }}
            >
              Word Archer
              <SparklesIcon
                size={20}
                className="absolute -top-2 -right-6 text-[#ffd600] animate-spin-slow hidden md:block"
              />
            </h1>
            <p className="text-white/50 text-base md:text-lg max-w-md mx-auto">
              Escribe la traducción china para disparar / 输入中文翻译来射箭
            </p>
            <div className="flex items-center justify-center gap-2 mt-3">
              <TreePineIcon size={16} className="text-[#39ff14] opacity-50" />
              <span className="text-xs text-white/30 font-medium">Temática Medieval / 中世纪主题</span>
              <TreePineIcon size={16} className="text-[#39ff14] opacity-50" />
            </div>
            {le && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold animate-shake"
                style={{
                  background: "rgba(255,68,68,.12)",
                  border: "1px solid rgba(255,68,68,.3)",
                  color: "#ff6b35",
                }}
              >
                {le}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => {
                setLe("");
                K(null);
              }}
              className="group relative rounded-2xl p-5 text-left cursor-pointer block overflow-hidden transition-all duration-500"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.65),rgba(5,8,27,.5))",
                border: "1px solid rgba(255,255,255,.14)",
                backdropFilter: "blur(14px)",
                transformStyle: "preserve-3d",
              }}
              onMouseEnter={(t) => {
                t.currentTarget.style.transform = "translateY(-12px) scale(1.03) rotateX(5deg) rotateY(2deg)";
                t.currentTarget.style.boxShadow = "0 0 60px rgba(0,212,255,.3),0 25px 60px rgba(0,0,0,.5)";
                t.currentTarget.style.borderColor = "#00d4ff60";
              }}
              onMouseLeave={(t) => {
                t.currentTarget.style.transform = "";
                t.currentTarget.style.boxShadow = "";
                t.currentTarget.style.borderColor = "rgba(255,255,255,.14)";
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, #00d4ff00, #00d4ff, #00d4ff00)",
                  backgroundSize: "200% 100%",
                  animation: "borderRotate 3s linear infinite",
                  zIndex: -1,
                }}
              />
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                  transform: "translateZ(20px)",
                }}
              >
                <LayersIcon size={24} className="text-white" />
              </div>
              <h3
                className="text-white font-black text-base mb-1"
                style={{
                  transform: "translateZ(15px)",
                }}
              >
                Todos los módulos
              </h3>
              <p
                className="text-xs font-medium mb-1"
                style={{
                  color: "rgba(255,0,170,.7)",
                  transform: "translateZ(10px)",
                }}
              >
                所有模块
              </p>
              <p
                className="text-xs font-medium text-white/40"
                style={{
                  transform: "translateZ(5px)",
                }}
              >
                Mezcla todo el vocabulario
              </p>
            </button>
            {Le.map((m_1) => (
              <UeComponent
                key={m_1.id}
                m={m_1}
                onClick={() => {
                  setLe("");
                  K(m_1.id);
                }}
              />
            ))}
          </div>
          <style>{`
            @keyframes archerFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
            @keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
            @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
            @keyframes firefly { 0%,100%{opacity:0.2;transform:translateY(0)} 50%{opacity:1;transform:translateY(-10px)} }
            @keyframes firefly-delayed { 0%,100%{opacity:0.2;transform:translateY(0)} 50%{opacity:1;transform:translateY(-10px)} }
            @keyframes pulse-neon { 0%,100%{opacity:0.3} 50%{opacity:0.6} }
            @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 75%{transform:translateX(5px)} }
            .animate-spin-slow { animation: spin-slow 4s linear infinite; }
            .animate-firefly { animation: firefly 3s ease-in-out infinite; }
            .animate-firefly-delayed { animation: firefly-delayed 3s ease-in-out infinite 1s; }
            .animate-pulse-neon { animation: pulse-neon 2s ease-in-out infinite; }
            .animate-shake { animation: shake 0.4s ease-in-out; }
          `}</style>
        </div>
        <div className="fixed bottom-4 right-4 z-50 pointer-events-none transition-all duration-500">
          <Ke1Component expression="neutral" scale={1.2} />
        </div>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <div
        className="max-w-5xl mx-auto px-2 md:px-4 py-4 md:py-6 min-h-screen flex flex-col relative z-10"
        style={{
          transform: Me ? `translate(${Math.random() * 8 - 4}px, ${Math.random() * 8 - 4}px)` : "none",
          transition: "transform 0.05s",
        }}
      >
        <SoundToggles />
        <div className="flex flex-wrap items-center justify-between mb-3 md:mb-4 gap-2">
          <Link
            to="/juegos"
            onClick={() => playClick()}
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold group"
          >
            <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver /
            返回
          </Link>
          <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
            <button
              onClick={() => {
                playClick();
                setM("select");
              }}
              className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#00d4ff]/20"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "#fff",
              }}
            >
              <LayersIcon size={12} /> <span className="hidden sm:inline">Cambiar módulo / 切换模块</span>
              <span className="sm:hidden">Módulos</span>
            </button>
            <div
              className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-full text-xs font-bold animate-pulse-fire"
              style={{
                background: "rgba(255,107,53,.15)",
                border: "1px solid rgba(255,107,53,.3)",
                color: "#ff6b35",
                boxShadow: "0 0 15px rgba(255,107,53,.2)",
              }}
            >
              <FlameIcon size={12} className={X >= 5 ? "animate-fire-flicker" : ""} /> x{X}
            </div>
            <div
              className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-full text-xs font-bold"
              style={{
                background: "rgba(0,212,255,.1)",
                border: "1px solid rgba(0,212,255,.2)",
                color: "#00d4ff",
                boxShadow: "0 0 15px rgba(0,212,255,.15)",
              }}
            >
              <ZapIcon size={12} className={L > 0 ? "animate-pulse" : ""} /> {L}
            </div>
            <div
              className="flex items-center gap-1 px-2 md:px-3 py-1.5 rounded-full text-xs font-bold"
              style={{
                background: "rgba(255,0,0,.1)",
                border: "1px solid rgba(255,0,0,.2)",
                color: "#ff4444",
                boxShadow: "0 0 15px rgba(255,0,0,.15)",
              }}
            >
              {Array.from(
                {
                  length: 5,
                },
                (t, a) => (
                  <HeartIcon
                    key={a}
                    size={12}
                    fill={a < F ? "#ff4444" : "transparent"}
                    style={{
                      color: a < F ? "#ff4444" : "rgba(255,255,255,.2)",
                      filter: a < F ? "drop-shadow(0 0 4px #ff4444)" : "none",
                    }}
                    className={a < F ? "animate-pulse-slow" : ""}
                  />
                ),
              )}
            </div>
            <div
              className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-full text-xs font-bold"
              style={{
                background: "rgba(255,214,0,.1)",
                border: "1px solid rgba(255,214,0,.2)",
                color: "#ffd600",
                boxShadow: "0 0 15px rgba(255,214,0,.15)",
              }}
            >
              <TimerIcon size={12} className={$ <= 10 ? "animate-pulse-fast" : ""} /> {$}s
            </div>
          </div>
        </div>
        <div className="text-center mb-3 md:mb-4">
          <h1
            className="text-3xl md:text-5xl font-black mb-1"
            style={{
              background: "linear-gradient(135deg,#00d4ff,#39ff14)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(0,212,255,.5))",
            }}
          >
            <TargetIcon
              size={28}
              className="inline mr-2 md:w-8 md:h-8"
              style={{
                color: "#00d4ff",
                filter: "drop-shadow(0 0 8px rgba(0,212,255,.5))",
              }}
            />{" "}
            Word Archer
          </h1>
          <p className="text-white/40 text-xs md:text-sm font-medium">
            Escribe la traducción china para disparar / 输入中文翻译射箭
          </p>
        </div>
        <div className="max-w-md mx-auto w-full mb-3 md:mb-4">
          <div className="flex items-center justify-between mb-1">
            <span
              className="text-[10px] font-bold uppercase tracking-wider"
              style={{
                color: "#00d4ff",
              }}
            >
              Nivel {I}
            </span>
            <span
              className="text-[10px] font-bold"
              style={{
                color: "rgba(207,216,255,.4)",
              }}
            >
              {Z} dianas
            </span>
          </div>
          <div
            className="h-2.5 rounded-full overflow-hidden relative"
            style={{
              background: "rgba(255,255,255,.06)",
              boxShadow: "inset 0 0 8px rgba(0,0,0,.3)",
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-500 relative"
              style={{
                width: `${((Z % 5) / 5) * 100}%`,
                background: "linear-gradient(90deg,#00d4ff,#39ff14)",
                boxShadow: "0 0 20px rgba(0,212,255,.6), 0 0 40px rgba(57,255,20,.4)",
              }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent)",
                  animation: "shimmer 2s linear infinite",
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <div
            className="relative flex items-center justify-center"
            style={{
              perspective: "200px",
            }}
          >
            <WindIcon
              size={14}
              style={{
                color: "#00d4ff",
                transform: `rotate(${ARef.current * 30}deg)`,
                transition: "transform 0.1s",
                filter: "drop-shadow(0 0 4px #00d4ff)",
              }}
            />
            <div
              className="absolute -inset-2 rounded-full opacity-0 animate-pulse"
              style={{
                background: "radial-gradient(circle, rgba(0,212,255,.3), transparent)",
                animation: "windPulse 2s ease-in-out infinite",
              }}
            />
          </div>
          <span
            className="text-[10px] font-bold"
            style={{
              color: "rgba(0,212,255,.6)",
            }}
          >
            Viento: {R.x > 0 ? "→" : "←"} {Math.abs(R.x).toFixed(0)}
          </span>
        </div>
        <div
          ref={BRef}
          className="relative flex-1 rounded-3xl overflow-hidden mb-3 md:mb-4"
          style={{
            background: "linear-gradient(180deg,#0a1a2e 0%,#1a3a2e 50%,#0d2a15 100%)",
            border: "2px solid rgba(0,212,255,.3)",
            minHeight: "250px",
            perspective: "1200px",
            boxShadow:
              "0 0 50px rgba(0,212,255,.1), 0 20px 60px rgba(0,0,0,.4), inset 0 0 60px rgba(0,0,0,.2)",
          }}
        >
          <div
            className="absolute top-6 right-8 md:right-16 w-12 h-12 md:w-16 md:h-16 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, #ffeb99 0%, #ffc800 40%, transparent 70%)",
              boxShadow: "0 0 40px #ffc80088, 0 0 80px #ffc80044",
              opacity: 0.7,
              animation: "moonPulse 4s ease-in-out infinite",
            }}
          />
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({
              length: 20,
            }).map((t, a) => (
              <div
                key={`star-${a}`}
                className="absolute rounded-full"
                style={{
                  width: `${1 + Math.random() * 2}px`,
                  height: `${1 + Math.random() * 2}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 60}%`,
                  background: "#ffffff",
                  animation: `starTwinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                  boxShadow: "0 0 4px #ffffff",
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({
              length: 12,
            }).map((t, a) => (
              <div
                key={`firefly-${a}`}
                className="absolute rounded-full"
                style={{
                  width: `${3 + Math.random() * 2}px`,
                  height: `${3 + Math.random() * 2}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${20 + Math.random() * 80}%`,
                  background: "#ffd600",
                  animation: `fireflyMove ${4 + Math.random() * 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 3}s`,
                  boxShadow: "0 0 8px #ffd600, 0 0 16px #ffd60088",
                }}
              />
            ))}
          </div>
          <svg
            className="absolute bottom-0 left-0 pointer-events-none opacity-40 md:opacity-60"
            width="80"
            height="120"
            viewBox="0 0 80 120"
            style={{
              animation: "treeSway 6s ease-in-out infinite",
            }}
          >
            <path
              d="M 40 10 L 10 50 L 30 50 L 5 90 L 25 90 L 0 120 L 80 120 L 55 90 L 75 90 L 50 50 L 70 50 Z"
              fill="#0a2a0a"
            />
          </svg>
          <svg
            className="absolute bottom-0 left-8 md:left-16 pointer-events-none opacity-30 md:opacity-50"
            width="60"
            height="90"
            viewBox="0 0 60 90"
            style={{
              animation: "treeSway 5s ease-in-out infinite 0.5s",
            }}
          >
            <path
              d="M 30 5 L 8 35 L 22 35 L 4 65 L 18 65 L 0 90 L 60 90 L 42 65 L 56 65 L 38 35 L 52 35 Z"
              fill="#0a2a0a"
            />
          </svg>
          <svg
            className="absolute bottom-0 right-0 pointer-events-none opacity-40 md:opacity-60"
            width="80"
            height="120"
            viewBox="0 0 80 120"
            style={{
              animation: "treeSway 7s ease-in-out infinite 1s",
            }}
          >
            <path
              d="M 40 10 L 10 50 L 30 50 L 5 90 L 25 90 L 0 120 L 80 120 L 55 90 L 75 90 L 50 50 L 70 50 Z"
              fill="#0a2a0a"
            />
          </svg>
          <svg
            className="absolute bottom-0 right-8 md:right-16 pointer-events-none opacity-30 md:opacity-50"
            width="60"
            height="90"
            viewBox="0 0 60 90"
            style={{
              animation: "treeSway 5.5s ease-in-out infinite 1.5s",
            }}
          >
            <path
              d="M 30 5 L 8 35 L 22 35 L 4 65 L 18 65 L 0 90 L 60 90 L 42 65 L 56 65 L 38 35 L 52 35 Z"
              fill="#0a2a0a"
            />
          </svg>
          <div
            className="absolute bottom-0 left-0 right-0 h-6 md:h-8 pointer-events-none"
            style={{
              background: "linear-gradient(180deg, transparent, #0a3a0a)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-2 pointer-events-none"
            style={{
              background: "#0a2a0a",
              opacity: 0.6,
            }}
          />
          <div
            className="absolute bottom-2 left-4 pointer-events-none"
            style={{
              animation: "grassWave 3s ease-in-out infinite",
            }}
          >
            <svg width="20" height="10" viewBox="0 0 20 10">
              <path
                d="M 5 10 L 5 2 M 10 10 L 10 0 M 15 10 L 15 3"
                stroke="#0a4a0a"
                strokeWidth="1"
                fill="none"
                opacity="0.6"
              />
            </svg>
          </div>
          <div
            className="absolute bottom-2 right-8 pointer-events-none"
            style={{
              animation: "grassWave 4s ease-in-out infinite 1s",
            }}
          >
            <svg width="20" height="10" viewBox="0 0 20 10">
              <path
                d="M 5 10 L 5 3 M 10 10 L 10 1 M 15 10 L 15 2"
                stroke="#0a4a0a"
                strokeWidth="1"
                fill="none"
                opacity="0.6"
              />
            </svg>
          </div>
          <div className="absolute inset-0 pointer-events-none opacity-30">
            {Array.from({
              length: 30,
            }).map((t, a) => (
              <div
                key={`particle-${a}`}
                className="absolute rounded-full"
                style={{
                  width: `${2 + Math.random() * 3}px`,
                  height: `${2 + Math.random() * 3}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: Math.random() > 0.5 ? "#00d4ff" : "#39ff14",
                  animation: `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                  opacity: 0.4 + Math.random() * 0.4,
                  boxShadow: `0 0 6px ${Math.random() > 0.5 ? "#00d4ff" : "#39ff14"}`,
                }}
              />
            ))}
          </div>
          {ze && (
            <div
              className="absolute inset-0 pointer-events-none z-40 animate-hit-flash"
              style={{
                background: "radial-gradient(circle, rgba(255,214,0,0.3) 0%, transparent 70%)",
              }}
            />
          )}
          {Ce && (
            <div
              className="absolute inset-0 pointer-events-none z-40 animate-miss-flash"
              style={{
                background: "radial-gradient(circle, rgba(255,0,0,0.25) 0%, transparent 70%)",
                mixBlendMode: "screen",
              }}
            />
          )}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
            style={{
              width: "100px",
              height: "120px",
              perspective: "400px",
            }}
          >
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-3 rounded-full"
              style={{
                background: "rgba(0,0,0,0.4)",
                filter: "blur(4px)",
              }}
            />
            <div
              className="absolute bottom-3 left-1/2 -translate-x-1/2"
              style={{
                width: "40px",
                height: "30px",
              }}
            >
              <div
                className="absolute left-0 bottom-0 w-3 h-10 rounded-full"
                style={{
                  background: "linear-gradient(180deg,#3a4a6a,#1a2540)",
                  transform: "rotate(-10deg)",
                }}
              />
              <div
                className="absolute right-0 bottom-0 w-3 h-10 rounded-full"
                style={{
                  background: "linear-gradient(180deg,#3a4a6a,#1a2540)",
                  transform: "rotate(10deg)",
                }}
              />
            </div>
            <div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 w-10 h-16 rounded-lg"
              style={{
                background: "linear-gradient(180deg,#5a7a9a,#3a5a7a)",
                boxShadow:
                  "0 4px 15px rgba(0,0,0,.5), 0 0 20px rgba(0,212,255,.3), 0 0 40px rgba(0,212,255,.15)",
                border: "1px solid rgba(255,255,255,.3)",
              }}
            >
              <div
                className="absolute top-2 left-1/2 -translate-x-1/2 w-5 h-8 rounded"
                style={{
                  background: "linear-gradient(135deg, rgba(0,212,255,.4), rgba(57,255,20,.3))",
                  boxShadow: "0 0 15px rgba(0,212,255,.5), 0 0 30px rgba(0,212,255,.25)",
                  border: "1px solid rgba(255,255,255,.2)",
                }}
              />
              <div
                className="absolute bottom-2 left-0 right-0 h-2"
                style={{
                  background: "linear-gradient(90deg, #8b6a4a, #c0a060)",
                  border: "1px solid rgba(0,0,0,.3)",
                }}
              />
              <div
                className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                style={{
                  background: "#ffd600",
                  boxShadow: "0 0 4px #ffd600, 0 0 8px #ffd600",
                }}
              />
            </div>
            <div
              className="absolute bottom-28 left-1/2 -translate-x-1/2 w-8 h-10 rounded-full"
              style={{
                background: "linear-gradient(135deg, #f0d8b0, #d0b890)",
                boxShadow:
                  "0 2px 8px rgba(0,0,0,.4), 0 0 12px rgba(0,212,255,.3), 0 0 24px rgba(0,212,255,.15)",
                border: "1px solid rgba(255,255,255,.4)",
              }}
            >
              <div
                className="absolute top-2 right-1.5 w-1.5 h-1.5 rounded-full bg-white/90"
                style={{
                  boxShadow: "0 0 4px white",
                }}
              />
              <div
                className="absolute -top-1 -left-1 -right-1 h-5 rounded-t-full"
                style={{
                  background: "linear-gradient(180deg,#4a6a8a,#2a4a6a)",
                  border: "1px solid rgba(255,255,255,.2)",
                }}
              />
              <div
                className="absolute -top-2 left-1/2 w-2 h-4 rounded-full"
                style={{
                  background: "linear-gradient(180deg,#ff6b35,#cc4400)",
                  transform: "rotate(-15deg)",
                  boxShadow: "0 0 4px #ff6b35, 0 0 8px #ff6b35",
                }}
              />
            </div>
            <div
              className="absolute bottom-18 left-1/2 translate-x-1"
              style={{
                width: "22px",
                height: "4px",
                background: "linear-gradient(90deg,#5a7a9a,#4a6a8a)",
                borderRadius: "2px",
                transform: "rotate(-15deg)",
                transformOrigin: "left center",
                boxShadow: "0 1px 4px rgba(0,0,0,.3)",
              }}
            />
            <div
              className="absolute bottom-18 right-1/2 -translate-x-1"
              style={{
                width: `${20 + x * 8}px`,
                height: "4px",
                background: "linear-gradient(90deg,#4a6a8a,#5a7a9a)",
                borderRadius: "2px",
                transform: `rotate(15deg) translateX(${-x * 6}px)`,
                transformOrigin: "right center",
                transition: "width 0.1s, transform 0.1s",
                boxShadow: "0 1px 4px rgba(0,0,0,.3)",
              }}
            />
            <div
              className="absolute bottom-14 left-1/2 translate-x-3"
              style={{
                width: "50px",
                height: "60px",
                border: "3px solid #8b6a4a",
                borderRadius: "0 50% 50% 0",
                borderLeft: "none",
                boxShadow:
                  "0 0 20px rgba(0,212,255,.6), 0 0 40px rgba(0,212,255,.3), 0 0 60px rgba(0,212,255,.15), inset 0 0 5px rgba(0,0,0,.3)",
                transform: "rotate(-5deg)",
              }}
            />
            <div
              className="absolute bottom-14 left-1/2 translate-x-3"
              style={{
                width: "2px",
                height: `${56 - x * 8}px`,
                background:
                  x > 0.5
                    ? "linear-gradient(180deg, rgba(0,212,255,.9), rgba(57,255,20,.6))"
                    : "linear-gradient(180deg, rgba(255,255,255,.9), rgba(200,200,200,.6))",
                marginLeft: `${x * 6}px`,
                transition: "height 0.1s, margin-left 0.1s, background 0.1s",
                transformOrigin: "top center",
                boxShadow:
                  x > 0.3
                    ? "0 0 8px rgba(0,212,255,.8), 0 0 16px rgba(57,255,20,.4)"
                    : "0 0 4px rgba(255,255,255,.5)",
              }}
            />
            {x > 0.3 && (
              <div
                className="absolute bottom-14 left-1/2 z-10"
                style={{
                  transform: `translateX(${6 + x * 8}px)`,
                  transition: "transform 0.1s",
                }}
              >
                <div
                  className="w-8 h-0.5 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #c0a060, #ffd600)",
                    boxShadow: "0 0 10px rgba(255,214,0,.8), 0 0 20px rgba(255,214,0,.4)",
                  }}
                />
                <div
                  className="absolute right-0 -top-1"
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "5px solid #ffd600",
                    borderTop: "2px solid transparent",
                    borderBottom: "2px solid transparent",
                  }}
                />
                <div
                  className="absolute left-0 -top-1.5 w-3 h-3"
                  style={{
                    background: "linear-gradient(135deg, #ff4444, #cc0000)",
                    clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                  }}
                />
                <div
                  className="absolute left-0 -top-0.5 w-6 h-1 rounded-full opacity-60"
                  style={{
                    background: "linear-gradient(90deg, rgba(255,214,0,.5), transparent)",
                    filter: "blur(2px)",
                  }}
                />
              </div>
            )}
            <div
              className="absolute bottom-20 left-1/2 -translate-x-8 w-5 h-10 rounded-lg"
              style={{
                background: "linear-gradient(180deg, #6a4a2a, #4a2a0a)",
                transform: "rotate(-20deg)",
                boxShadow: "0 2px 8px rgba(0,0,0,.4), 0 0 12px rgba(255,214,0,.2)",
                border: "1px solid rgba(255,255,255,.1)",
              }}
            >
              <div
                className="absolute top-1 left-1 w-1 h-6 rounded-full"
                style={{
                  background: "#ffd600",
                  opacity: 0.6,
                  boxShadow: "0 0 4px #ffd600",
                }}
              />
              <div
                className="absolute top-2 left-2.5 w-1 h-5 rounded-full"
                style={{
                  background: "#ffd600",
                  opacity: 0.6,
                  boxShadow: "0 0 4px #ffd600",
                }}
              />
            </div>
          </div>
          {g
            .filter((t) => !t.hit || t.stuckArrows.length > 0)
            .map((t) => {
              const background = v(t.ring);
              const r = Re(t.ring);
              const n = Fe.has(t.id);
              return (
                <div
                  key={t.id}
                  className="absolute flex items-center justify-center pointer-events-none"
                  style={{
                    left: t.x,
                    top: t.y,
                    width: 100,
                    height: 100,
                    opacity: t.hit ? 0.6 : 1,
                    transition: "opacity 0.3s",
                    animation: n
                      ? "targetWobble 0.6s ease-out"
                      : t.hit
                        ? "targetShake 0.5s ease-out"
                        : "targetFloat 3s ease-in-out infinite",
                    perspective: "300px",
                  }}
                >
                  <div
                    className="absolute rounded-full flex items-center justify-center"
                    style={{
                      width: 92,
                      height: 92,
                      border: "2px solid rgba(139,106,74,.5)",
                      boxShadow:
                        "0 0 30px rgba(139,106,74,.3), 0 0 60px rgba(139,106,74,.15), inset 0 0 10px rgba(0,0,0,.3)",
                      background: "radial-gradient(circle, rgba(139,106,74,.15), transparent)",
                      transform: "rotateX(20deg) rotateY(5deg)",
                    }}
                  >
                    <div
                      className="absolute rounded-full flex items-center justify-center"
                      style={{
                        width: 76,
                        height: 76,
                        border: "2px solid rgba(255,255,255,.2)",
                        boxShadow: "0 0 20px rgba(255,255,255,.1), 0 0 40px rgba(255,255,255,.05)",
                      }}
                    >
                      <div
                        className="absolute rounded-full flex items-center justify-center"
                        style={{
                          width: 60,
                          height: 60,
                          border: "2px solid rgba(255,255,255,.25)",
                          boxShadow: "0 0 20px rgba(255,255,255,.12), 0 0 40px rgba(255,255,255,.06)",
                        }}
                      >
                        <div
                          className="absolute rounded-full flex items-center justify-center"
                          style={{
                            width: 44,
                            height: 44,
                            border: "2px solid rgba(255,255,255,.3)",
                            boxShadow: "0 0 20px rgba(255,255,255,.15), 0 0 40px rgba(255,255,255,.08)",
                          }}
                        >
                          <div
                            className="absolute rounded-full"
                            style={{
                              width: r,
                              height: r,
                              background,
                              boxShadow: `0 0 30px ${background}dd, 0 0 60px ${background}88, 0 0 100px ${background}44, 0 0 150px ${background}22, inset 0 0 15px rgba(255,255,255,.4)`,
                              border: `2px solid ${background}`,
                              animation: t.hit
                                ? "bullseyePulse 0.5s ease-out"
                                : "neonPulse 2s ease-in-out infinite",
                              transform: "translateZ(10px)",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {t.stuckArrows.map((l) => (
                    <div
                      key={l.id}
                      className="absolute z-30"
                      style={{
                        left: l.offsetX,
                        top: l.offsetY,
                        width: "20px",
                        height: "2px",
                        background: "linear-gradient(90deg,#ffd600,transparent)",
                        boxShadow: "0 0 8px #ffd600, 0 0 16px rgba(255,214,0,.5)",
                        transform: `rotate(${l.angle}deg)`,
                        transformOrigin: "left center",
                        animation: "arrowStick 0.3s ease-out forwards",
                      }}
                    >
                      <div
                        className="absolute right-0 top-1/2 -translate-y-1/2"
                        style={{
                          width: 0,
                          height: 0,
                          borderLeft: "5px solid #ffd600",
                          borderTop: "2px solid transparent",
                          borderBottom: "2px solid transparent",
                        }}
                      />
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-3"
                        style={{
                          background: "linear-gradient(135deg, #ff4444, #cc0000)",
                          clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                        }}
                      />
                    </div>
                  ))}
                  <div
                    className="absolute -top-10 px-3 py-1.5 rounded-lg text-xs md:text-sm font-black whitespace-nowrap"
                    style={{
                      background: "rgba(0,212,255,.2)",
                      border: "1px solid rgba(0,212,255,.4)",
                      color: "#00d4ff",
                      textShadow: "0 0 8px rgba(0,212,255,.8), 0 0 16px rgba(0,212,255,.4)",
                      boxShadow:
                        "0 0 20px rgba(0,212,255,.2), 0 4px 15px rgba(0,0,0,.3), 0 0 40px rgba(0,212,255,.1)",
                      backdropFilter: "blur(4px)",
                      transform: "translateZ(30px) rotateX(-10deg)",
                      animation: "labelFloat 2s ease-in-out infinite",
                    }}
                  >
                    {t.espanol}
                  </div>
                </div>
              );
            })}
          {S.map((t) => {
            const { cx: left, cy: top, angle } = Ye(t);
            return (
              <div
                key={t.id}
                className="absolute pointer-events-none z-20"
                style={{
                  left,
                  top,
                  width: "24px",
                  height: "2px",
                  background: "linear-gradient(90deg,#ffd600,transparent)",
                  boxShadow:
                    "0 0 10px #ffd600, 0 0 20px rgba(255,214,0,.5), 0 0 30px rgba(255,214,0,.3), 0 0 40px rgba(255,214,0,.15)",
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: "left center",
                }}
              >
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "7px solid #ffd600",
                    borderTop: "3px solid transparent",
                    borderBottom: "3px solid transparent",
                  }}
                />
                <div
                  className="absolute left-0 -top-1.5 w-3 h-3"
                  style={{
                    background: "linear-gradient(135deg, #ff4444, #cc0000)",
                    clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                    animation: "arrowSpin 0.3s linear infinite",
                  }}
                />
                {t.progress > 0.2 && t.progress < 0.9 && (
                  <>
                    <div
                      className="absolute -left-4 top-0 w-8 h-0.5 opacity-50 rounded-full"
                      style={{
                        background: "linear-gradient(90deg, rgba(0,212,255,.5), transparent)",
                        filter: "blur(1px)",
                      }}
                    />
                    <div
                      className="absolute -left-8 top-0 w-6 h-0.5 opacity-30 rounded-full"
                      style={{
                        background: "linear-gradient(90deg, rgba(0,212,255,.3), transparent)",
                        filter: "blur(2px)",
                      }}
                    />
                    <div
                      className="absolute -left-12 top-0 w-4 h-0.5 opacity-15 rounded-full"
                      style={{
                        background: "linear-gradient(90deg, rgba(0,212,255,.2), transparent)",
                        filter: "blur(3px)",
                      }}
                    />
                  </>
                )}
                <div
                  className="absolute -left-6 -top-0.5 w-8 h-1 rounded-full opacity-40"
                  style={{
                    background: "linear-gradient(90deg, rgba(0,212,255,.6), transparent)",
                    filter: "blur(3px)",
                  }}
                />
              </div>
            );
          })}
          {g
            .filter((t) => t.hit)
            .map((t) => (
              <div
                key={`hit-${t.id}`}
                className="absolute flex items-center justify-center pointer-events-none"
                style={{
                  left: t.x + 50,
                  top: t.y + 50,
                  animation: "hitExplode 0.6s ease-out forwards",
                }}
              >
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 20,
                    height: 20,
                    border: `2px solid ${v(t.ring)}`,
                    boxShadow: `0 0 20px ${v(t.ring)}, 0 0 40px ${v(t.ring)}88`,
                    animation: "shockWave 0.6s ease-out forwards",
                  }}
                />
                {Array.from({
                  length: 12,
                }).map((a, r) => (
                  <div
                    key={r}
                    className="absolute rounded-full"
                    style={{
                      width: 4 + r * 3,
                      height: 4 + r * 3,
                      background: v(t.ring),
                      opacity: 0.6 - r * 0.05,
                      boxShadow: `0 0 12px ${v(t.ring)}, 0 0 24px ${v(t.ring)}88, 0 0 36px ${v(t.ring)}44`,
                      animation: `hitParticle 0.6s ease-out ${r * 0.03}s both`,
                    }}
                  />
                ))}
                {Array.from({
                  length: 8,
                }).map((a, r) => (
                  <div
                    key={`spark-${r}`}
                    className="absolute w-6 h-0.5 rounded-full pointer-events-none"
                    style={{
                      background: `linear-gradient(90deg, ${v(t.ring)}, transparent)`,
                      transform: `rotate(${r * 45}deg) translateX(10px)`,
                      animation: `sparkLine 0.5s ease-out ${r * 0.02}s both`,
                      opacity: 0.8,
                    }}
                  />
                ))}
                {Array.from({
                  length: 6,
                }).map((a, r) => (
                  <div
                    key={`star-${r}`}
                    className="absolute pointer-events-none"
                    style={{
                      transform: `rotate(${r * 60}deg)`,
                      animation: `starBurst 0.5s ease-out ${r * 0.03}s both`,
                    }}
                  >
                    <div
                      className="w-4 h-1 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${v(t.ring)}, transparent)`,
                        boxShadow: `0 0 8px ${v(t.ring)}`,
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          {E.map((t) => (
            <div
              key={t.id}
              className="absolute pointer-events-none font-black text-lg md:text-xl"
              style={{
                left: t.x,
                top: t.y,
                color: t.color,
                textShadow: `0 0 20px ${t.color}, 0 0 40px ${t.color}80, 0 0 60px ${t.color}44`,
                opacity: t.life,
                transform: `translateZ(50px) scale(${1 + (1.5 - t.life) * 0.3}) rotateX(-15deg)`,
                animation: "floatScore 1s ease-out forwards",
              }}
            >
              {t.text}
            </div>
          ))}
          {X >= 3 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none z-30 animate-combo-pop">
              <div
                className="text-2xl md:text-4xl font-black px-4 py-2 rounded-full"
                style={{
                  color: "#ff6b35",
                  textShadow: "0 0 20px #ff6b35, 0 0 40px #ff6b3588, 0 0 60px #ff6b3544",
                  border: "2px solid rgba(255,107,53,.3)",
                  background: "rgba(255,107,53,.1)",
                  backdropFilter: "blur(4px)",
                  transform: "translateZ(40px) rotateX(-10deg)",
                  boxShadow: "0 0 30px rgba(255,107,53,.3), 0 0 60px rgba(255,107,53,.15)",
                }}
              >
                🔥 {X}x COMBO! 🔥
              </div>
            </div>
          )}
        </div>
        <div className="max-w-md mx-auto w-full mb-3">
          <div className="flex items-center justify-center">
            <div
              className="relative flex items-center justify-center"
              style={{
                width: 120,
                height: 12,
                perspective: "200px",
              }}
            >
              <div
                className="absolute inset-0 rounded-full overflow-hidden"
                style={{
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.1)",
                  boxShadow: "inset 0 0 8px rgba(0,0,0,.3)",
                }}
              >
                <div
                  className="h-full rounded-full transition-all duration-200"
                  style={{
                    width: `${x * 100}%`,
                    background:
                      x > 0.8
                        ? "linear-gradient(90deg,#ff00aa,#ff6b35)"
                        : "linear-gradient(90deg,#00d4ff,#39ff14)",
                    boxShadow:
                      x > 0.8
                        ? "0 0 20px rgba(255,0,170,.6), 0 0 40px rgba(255,107,53,.4)"
                        : "0 0 15px rgba(0,212,255,.4), 0 0 30px rgba(57,255,20,.2)",
                    animation: x > 0.8 ? "gaugePulse 0.5s ease-in-out infinite" : "none",
                  }}
                />
              </div>
              <div
                className="absolute -bottom-4 text-[10px] font-bold tracking-wider"
                style={{
                  color: x > 0.8 ? "#ff00aa" : "rgba(0,212,255,.6)",
                  textShadow: x > 0.8 ? "0 0 8px rgba(255,0,170,.5)" : "none",
                }}
              >
                {x > 0.8 ? "MAX POWER" : x > 0.5 ? "POWER" : "AIM"}
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-md mx-auto w-full mb-3 md:mb-4">
          <input
            type="text"
            value={j}
            onChange={onChange}
            onKeyDown={onKeyDown}
            autoFocus
            placeholder="Escribe la traducción china / 输入中文..."
            className="w-full px-4 md:px-5 py-3 md:py-4 rounded-2xl text-center text-lg md:text-xl font-black tracking-widest transition-all outline-none"
            style={{
              background: "rgba(0,212,255,.08)",
              border: "2px solid rgba(0,212,255,.3)",
              color: "#00d4ff",
              boxShadow:
                j.length > 0
                  ? "0 0 30px rgba(0,212,255,.3), 0 0 60px rgba(0,212,255,.15), inset 0 0 20px rgba(0,212,255,.05)"
                  : "0 0 25px rgba(0,212,255,.15), inset 0 0 15px rgba(0,212,255,.03)",
              textShadow: "0 0 10px rgba(0,212,255,.3)",
            }}
          />
        </div>
        {m === "gameover" && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.88)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div
              className="text-center p-6 md:p-8 rounded-3xl max-w-sm mx-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.8),rgba(5,8,27,.6))",
                border: "2px solid rgba(255,68,68,.3)",
                boxShadow: "0 0 80px rgba(255,68,68,.25), 0 0 150px rgba(255,68,68,.1)",
                animation: "overlayPop 0.5s cubic-bezier(.2,.9,.2,1)",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-60"
                style={{
                  background: "linear-gradient(135deg,#ff4444,#ff6b35)",
                  filter: "blur(25px)",
                }}
              />
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                {Array.from({
                  length: 20,
                }).map((t, key) => (
                  <div
                    key={key}
                    className="absolute rounded-full"
                    style={{
                      width: `${2 + Math.random() * 3}px`,
                      height: `${2 + Math.random() * 3}px`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      background: "#ff4444",
                      opacity: 0.4,
                      boxShadow: "0 0 6px #ff4444",
                      animation: `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>
              <TrophyIcon
                size={56}
                className="mx-auto mb-4 md:w-16 md:h-16"
                style={{
                  color: "#ff4444",
                  filter: "drop-shadow(0 0 20px rgba(255,68,68,.6))",
                }}
              />
              <h2
                className="text-2xl md:text-3xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg,#ff4444,#ff6b35)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ¡Game Over!
              </h2>
              <p className="text-white/50 text-sm mb-6">游戏结束！</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(0,212,255,.1)",
                    border: "1px solid rgba(0,212,255,.15)",
                    boxShadow: "0 0 20px rgba(0,212,255,.1), 0 0 40px rgba(0,212,255,.05)",
                    transform: "translateZ(20px) rotateX(5deg)",
                    perspective: "300px",
                  }}
                >
                  <div
                    className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(0,212,255,.3), transparent)",
                      backgroundSize: "200% 100%",
                      animation: "glassShine 3s linear infinite",
                    }}
                  />
                  <ZapIcon
                    size={16}
                    className="mx-auto mb-1"
                    style={{
                      color: "#00d4ff",
                      filter: "drop-shadow(0 0 8px rgba(0,212,255,.5))",
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
                    className="text-lg font-black"
                    style={{
                      color: "#00d4ff",
                      textShadow: "0 0 12px rgba(0,212,255,.5)",
                    }}
                  >
                    {L}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(255,0,170,.1)",
                    border: "1px solid rgba(255,0,170,.15)",
                    boxShadow: "0 0 20px rgba(255,0,170,.1), 0 0 40px rgba(255,0,170,.05)",
                    transform: "translateZ(20px) rotateX(5deg)",
                    perspective: "300px",
                  }}
                >
                  <div
                    className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,0,170,.3), transparent)",
                      backgroundSize: "200% 100%",
                      animation: "glassShine 3s linear infinite 1.5s",
                    }}
                  />
                  <TrophyIcon
                    size={16}
                    className="mx-auto mb-1"
                    style={{
                      color: "#ff00aa",
                      filter: "drop-shadow(0 0 8px rgba(255,0,170,.5))",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Mejor Combo
                  </p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#ff00aa",
                      textShadow: "0 0 12px rgba(255,0,170,.5)",
                    }}
                  >
                    {Se}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(255,214,0,.1)",
                    border: "1px solid rgba(255,214,0,.15)",
                    boxShadow: "0 0 20px rgba(255,214,0,.1), 0 0 40px rgba(255,214,0,.05)",
                    transform: "translateZ(20px) rotateX(5deg)",
                    perspective: "300px",
                  }}
                >
                  <div
                    className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,214,0,.3), transparent)",
                      backgroundSize: "200% 100%",
                      animation: "glassShine 3s linear infinite 0.75s",
                    }}
                  />
                  <TargetIcon
                    size={16}
                    className="mx-auto mb-1"
                    style={{
                      color: "#ffd600",
                      filter: "drop-shadow(0 0 8px rgba(255,214,0,.5))",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Dianas
                  </p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#ffd600",
                      textShadow: "0 0 12px rgba(255,214,0,.5)",
                    }}
                  >
                    {Z}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(57,255,20,.1)",
                    border: "1px solid rgba(57,255,20,.15)",
                    boxShadow: "0 0 20px rgba(57,255,20,.1), 0 0 40px rgba(57,255,20,.05)",
                    transform: "translateZ(20px) rotateX(5deg)",
                    perspective: "300px",
                  }}
                >
                  <div
                    className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(57,255,20,.3), transparent)",
                      backgroundSize: "200% 100%",
                      animation: "glassShine 3s linear infinite 2.25s",
                    }}
                  />
                  <FlameIcon
                    size={16}
                    className="mx-auto mb-1"
                    style={{
                      color: "#39ff14",
                      filter: "drop-shadow(0 0 8px rgba(57,255,20,.5))",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Combo Final
                  </p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#39ff14",
                      textShadow: "0 0 12px rgba(57,255,20,.5)",
                    }}
                  >
                    {X}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={onClick}
                  className="px-6 md:px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#ff4444]/30"
                  style={{
                    background: "linear-gradient(135deg,#ff4444,#ff6b35)",
                    boxShadow: "0 0 30px rgba(255,68,68,.4), 0 0 60px rgba(255,68,68,.2)",
                  }}
                >
                  Reintentar / 重试
                </button>
              </div>
              <P currentGameId="word-archer" />
            </div>
          </div>
        )}
        <style>{`
          @keyframes archerFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
          @keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
          @keyframes particleFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
          @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
          @keyframes hitExplode { 0%{transform:scale(0)} 50%{transform:scale(1.2)} 100%{transform:scale(1)} }
          @keyframes hitParticle { 0%{opacity:0.6;transform:scale(1)} 100%{opacity:0;transform:scale(2)} }
          @keyframes overlayPop { 0%{transform:scale(0.8);opacity:0} 100%{transform:scale(1);opacity:1} }
          @keyframes arrowStick { 0%{transform:scale(0) rotate(-45deg)} 50%{transform:scale(1.2) rotate(5deg)} 100%{transform:scale(1) rotate(var(--angle, 0deg))} }
          @keyframes bullseyePulse { 0%{transform:scale(1) translateZ(10px)} 50%{transform:scale(1.3) translateZ(20px)} 100%{transform:scale(1) translateZ(10px)} }
          @keyframes neonPulse { 0%,100%{opacity:0.7} 50%{opacity:1} }
          @keyframes targetShake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-3px)} 75%{transform:translateX(3px)} }
          @keyframes targetFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
          @keyframes sparkLine { 0%{opacity:0.8;transform:rotate(var(--angle,0deg)) translateX(10px) scaleX(1)} 100%{opacity:0;transform:rotate(var(--angle,0deg)) translateX(30px) scaleX(0)} }
          @keyframes floatScore { 0%{transform:translateY(0) scale(1) rotateX(-15deg)} 100%{transform:translateY(-30px) scale(1.2) rotateX(-15deg)} }
          @keyframes combo-pop { 0%{transform:translateX(-50%) scale(0)} 50%{transform:translateX(-50%) scale(1.2)} 100%{transform:translateX(-50%) scale(1)} }
          @keyframes mascotFloat { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-12px) rotate(2deg)} }
          @keyframes mascotBounce { 0%,100%{transform:translateY(0) scale(1)} 25%{transform:translateY(-16px) scale(1.05) rotate(-3deg)} 50%{transform:translateY(-8px) scale(1.1) rotate(3deg)} 75%{transform:translateY(-14px) scale(1.05) rotate(-2deg)} }
          @keyframes pulseSlow { 0%,100%{opacity:0.6} 50%{opacity:1} }
          @keyframes pulseFast { 0%,100%{opacity:1} 50%{opacity:0.3} }
          @keyframes fireFlicker { 0%,100%{transform:scale(1)} 50%{transform:scale(1.2)} }
          @keyframes treeSway { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(2deg)} }
          @keyframes grassWave { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }
          @keyframes fireflyMove { 0%,100%{opacity:0.2;transform:translate(0,0)} 25%{opacity:1;transform:translate(10px,-15px)} 50%{opacity:0.4;transform:translate(-5px,-8px)} 75%{opacity:0.8;transform:translate(15px,-20px)} }
          @keyframes starTwinkle { 0%,100%{opacity:0.2} 50%{opacity:1} }
          @keyframes moonPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
          @keyframes hitFlash { 0%{opacity:0.6} 100%{opacity:0} }
          @keyframes missFlash { 0%{opacity:0.6} 100%{opacity:0} }
          @keyframes windPulse { 0%,100%{opacity:0} 50%{opacity:1} }
          @keyframes arrowSpin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
          @keyframes targetWobble { 0%{transform:translateX(0) rotateZ(0deg)} 20%{transform:translateX(-5px) rotateZ(-3deg)} 40%{transform:translateX(5px) rotateZ(3deg)} 60%{transform:translateX(-3px) rotateZ(-2deg)} 80%{transform:translateX(3px) rotateZ(2deg)} 100%{transform:translateX(0) rotateZ(0deg)} }
          @keyframes shockWave { 0%{transform:scale(0);opacity:0.8} 100%{transform:scale(4);opacity:0} }
          @keyframes starBurst { 0%{opacity:0;transform:translateX(0)} 50%{opacity:1;transform:translateX(15px)} 100%{opacity:0;transform:translateX(30px)} }
          @keyframes labelFloat { 0%,100%{transform:translateZ(30px) rotateX(-10deg) translateY(0)} 50%{transform:translateZ(30px) rotateX(-10deg) translateY(-3px)} }
          @keyframes gaugePulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
          @keyframes glassShine { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
          .animate-mascot-float { animation: mascotFloat 3s ease-in-out infinite; }
          .animate-mascot-bounce { animation: mascotBounce 0.8s ease-in-out infinite; }
          .animate-pulse-slow { animation: pulseSlow 2s ease-in-out infinite; }
          .animate-pulse-fast { animation: pulseFast 0.8s ease-in-out infinite; }
          .animate-fire-flicker { animation: fireFlicker 0.5s ease-in-out infinite; }
          .animate-combo-pop { animation: combo-pop 0.5s ease-out forwards; }
          .animate-hit-flash { animation: hitFlash 0.3s ease-out forwards; }
          .animate-miss-flash { animation: missFlash 0.4s ease-out forwards; }
        `}</style>
      </div>
      <div className="fixed bottom-4 right-4 z-50 pointer-events-none transition-all duration-500 scale-75 md:scale-100">
        <Ke1Component expression={expression} scale={1.3} />
      </div>
    </StarfieldBackground>
  );
}
export { LtComponent as default };
