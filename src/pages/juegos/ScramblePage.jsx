import {
  StarIcon,
  BookOpenIcon,
  ZapIcon,
  LightbulbIcon,
  SendIcon,
  TrophyIcon,
  SparklesIcon,
  ArrowLeftIcon,
  RocketIcon,
  LayersIcon,
  FlameIcon,
  SkipForwardIcon,
  TimerIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g, a } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
function Re(espanol) {
  return espanol
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-ZÑ]/g, "")
    .trim();
}
function Ie(word) {
  let n = [...word.split("")];
  let m = 0;
  do {
    for (let d = n.length - 1; d > 0; d--) {
      const x = Math.floor(Math.random() * (d + 1));
      [n[d], n[x]] = [n[x], n[d]];
    }
    m++;
  } while (n.join("") === word && m < 10);
  return n.join("");
}
function We(word) {
  if (word.length <= 5) {
    return "easy";
  }
  if (word.length <= 8) {
    return "medium";
  }
  return "hard";
}
function Ee() {
  const a = ["#ff00aa", "#00d4ff", "#ffd600", "#39ff14", "#ff6b35", "#b829dd", "#ff6ec7", "#7b61ff"];
  for (let o = 0; o < 120; o++) {
    const n = document.createElement("div");
    const m = 4 + Math.random() * 10;
    const d = Math.random() > 0.5 ? "50%" : "2px";
    n.style.cssText = `position:fixed;left:50%;top:45%;width:${m}px;height:${m}px;border-radius:${d};background:${a[o % a.length]};pointer-events:none;z-index:9999;box-shadow:0 0 10px ${a[o % a.length]};`;
    document.body.appendChild(n);
    const x = (Math.PI * 2 * o) / 120;
    const h = 5 + Math.random() * 20;
    let b = window.innerWidth / 2;
    let C = window.innerHeight * 0.45;
    let u = 1;
    const S = Math.cos(x) * h;
    const z = Math.sin(x) * h;
    const Y = Math.random() * 360;
    const j = (Math.random() - 0.5) * 20;
    let k = Y;
    const N = () => {
      b += S;
      C += z + 2;
      u -= 0.012;
      k += j;
      n.style.left = `${b}px`;
      n.style.top = `${C}px`;
      n.style.opacity = String(u);
      n.style.transform = `rotate(${k}deg)`;
      if (u > 0) {
        requestAnimationFrame(N);
      } else {
        n.remove();
      }
    };
    requestAnimationFrame(N);
  }
}
function Pe1Component() {
  const aRef = React.useRef([]);
  if (aRef.current.length === 0) {
    const o = ["#ffd36b", "#ff8a2a", "#ff3860", "#ffd600"];
    for (let id = 0; id < 20; id++) {
      aRef.current.push({
        id,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        speed: 3 + Math.random() * 7,
        opacity: 0.2 + Math.random() * 0.5,
        delay: Math.random() * 5,
        color: o[id % o.length],
      });
    }
  }
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {aRef.current.map((o) => (
        <div
          key={o.id}
          className="absolute"
          style={{
            left: `${o.x}%`,
            top: `${o.y}%`,
            animation: `energyFloat ${o.speed}s ease-in-out infinite ${o.delay}s`,
          }}
        >
          <SparklesIcon
            size={o.size}
            style={{
              color: o.color,
              opacity: o.opacity,
              filter: `drop-shadow(0 0 6px ${o.color})`,
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes energyFloat { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-20px) rotate(180deg) scale(1.2)} }
      `}</style>
    </div>
  );
}
function GeComponent({ mood }) {
  const rx = mood === "sad" ? 5 : mood === "excited" ? 7 : 6;
  const ry = mood === "sad" ? 3 : mood === "excited" ? 8 : 6;
  const d_1 =
    mood === "happy"
      ? "M 16 24 Q 24 30 32 24"
      : mood === "sad"
        ? "M 16 28 Q 24 22 32 28"
        : mood === "excited"
          ? "M 16 24 Q 24 34 32 24"
          : "M 18 26 Q 24 28 30 26";
  const fill = mood === "happy" || mood === "excited" ? "rgba(255,105,180,0.6)" : "rgba(255,105,180,0.15)";
  const x =
    mood === "happy" ? "#46ff9a" : mood === "sad" ? "#ff4444" : mood === "excited" ? "#ffd600" : "#00d4ff";
  const animation =
    mood === "excited" ? "mascotExcited 0.3s ease-in-out infinite" : "mascotFloat 3s ease-in-out infinite";
  const b = mood === "sad";
  return (
    <div
      className="fixed bottom-6 right-6 z-50 pointer-events-none"
      style={{
        animation,
      }}
    >
      <div className="relative">
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-70"
          style={{
            background: x,
            width: "80px",
            height: "80px",
            animation: "mascotPulse 2s ease-in-out infinite",
          }}
        />
        <svg
          width="80"
          height="80"
          viewBox="0 0 48 48"
          fill="none"
          className="relative"
          style={{
            filter: `drop-shadow(0 0 15px ${x}80)`,
          }}
        >
          <path
            d="M 8 14 L 4 6 L 14 12"
            fill="url(#scramGrad)"
            stroke={x}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M 40 14 L 44 6 L 34 12"
            fill="url(#scramGrad)"
            stroke={x}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path d="M 6 12 L 4 8 L 10 11" fill="rgba(255,182,193,0.4)" />
          <path d="M 42 12 L 44 8 L 38 11" fill="rgba(255,182,193,0.4)" />
          <ellipse cx="24" cy="28" rx="18" ry="16" fill="url(#scramGrad)" stroke={x} strokeWidth="1.5" />
          <ellipse cx="17" cy="24" rx={rx} ry={ry} fill="white" />
          <ellipse cx="31" cy="24" rx={rx} ry={ry} fill="white" />
          <circle cx="17" cy="24" r="2.5" fill="#1a1a2e" />
          <circle cx="31" cy="24" r="2.5" fill="#1a1a2e" />
          <circle cx="18.2" cy="22.8" r="1" fill="white" opacity="0.9" />
          <circle cx="32.2" cy="22.8" r="1" fill="white" opacity="0.9" />
          <circle cx="15.8" cy="25.2" r="0.5" fill="white" opacity="0.6" />
          <circle cx="29.8" cy="25.2" r="0.5" fill="white" opacity="0.6" />
          <path d={d_1} stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="12" cy="30" r="3" fill={fill} />
          <circle cx="36" cy="30" r="3" fill={fill} />
          {mood === "excited" && (
            <>
              <circle
                cx="4"
                cy="12"
                r="1.5"
                fill="#ffd600"
                style={{
                  animation: "sparkle 0.5s ease-in-out infinite",
                }}
              />
              <circle
                cx="44"
                cy="8"
                r="1"
                fill="#ff00aa"
                style={{
                  animation: "sparkle 0.7s ease-in-out infinite 0.2s",
                }}
              />
              <circle
                cx="42"
                cy="40"
                r="1.5"
                fill="#00d4ff"
                style={{
                  animation: "sparkle 0.6s ease-in-out infinite 0.4s",
                }}
              />
            </>
          )}
          {b && (
            <>
              <circle cx="12" cy="28" r="1.5" fill="#00d4ff" opacity="0.8">
                <animate attributeName="cy" from="28" to="38" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.8" to="0" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle cx="36" cy="28" r="1.5" fill="#00d4ff" opacity="0.8">
                <animate attributeName="cy" from="28" to="38" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.8" to="0" dur="1.2s" repeatCount="indefinite" />
              </circle>
            </>
          )}
          <defs>
            <linearGradient id="scramGrad" x1="0" y1="0" x2="48" y2="48">
              <stop offset="0%" stopColor="#ffd36b" />
              <stop offset="50%" stopColor="#ff8a2a" />
              <stop offset="100%" stopColor="#ff3860" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
function PeComponent({ ch, index, total }) {
  const m = index * 0.15;
  return (
    <div
      className="w-16 h-20 flex items-center justify-center text-3xl font-black rounded-2xl relative"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,211,107,.2), rgba(255,211,107,.08), rgba(255,56,96,.06))",
        border: "2px solid rgba(255,211,107,.4)",
        color: "#ffd36b",
        boxShadow:
          "0 0 25px rgba(255,211,107,.2), 0 0 50px rgba(255,211,107,.1), 0 8px 20px rgba(0,0,0,.3), inset 0 1px 1px rgba(255,255,255,.1)",
        animation: `letterLevitate 2s ease-in-out infinite ${m}s, letterReveal 0.6s cubic-bezier(.2,.9,.2,1) ${m}s both`,
        transformStyle: "preserve-3d",
        textShadow: "0 0 15px rgba(255,211,107,.5), 0 0 30px rgba(255,211,107,.3)",
      }}
    >
      <span className="relative z-10">{ch}</span>
      <div
        className="absolute inset-0 rounded-2xl opacity-50"
        style={{
          background: "linear-gradient(135deg, transparent, rgba(255,255,255,.05), transparent)",
          animation: "shimmer 3s linear infinite",
        }}
      />
    </div>
  );
}
function HeComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [x, setX] = React.useState("select");
  const [b, setB] = React.useState([]);
  const [u, setU] = React.useState(0);
  const [z, setZ] = React.useState("");
  const [j, setJ] = React.useState("");
  const [N, setN] = React.useState(0);
  const [_, set_] = React.useState(0);
  const [H, setH] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("scramble_best") || "0");
    } catch {
      return 0;
    }
  });
  const [K, setK] = React.useState(0);
  const [l, setL] = React.useState("playing");
  const [W, setW] = React.useState(false);
  const [V, setV] = React.useState("");
  const [Xe, setXe] = React.useState(false);
  const [G, setG] = React.useState([]);
  const [be, setBe] = React.useState(false);
  const [te, setTe] = React.useState(1);
  const [L, setL_1] = React.useState("neutral");
  const [A, setA] = React.useState([]);
  const [ue, setUe] = React.useState(false);
  const DRef = React.useRef(null);
  const geRef = React.useRef(null);
  const ORef = React.useRef(null);
  const heRef = React.useRef(0);
  const ye = g();
  const [re, setRe] = React.useState("");
  const QRef = React.useRef([]);
  React.useEffect(() => {
    if (G.length === 0) {
      return;
    }
    const t = setInterval(() => {
      setG((i) =>
        i
          .map((c) => ({
            ...c,
            y: c.y - 1,
            life: c.life - 0.02,
          }))
          .filter((c) => c.life > 0),
      );
    }, 30);
    return () => clearInterval(t);
  }, [G.length]);
  React.useEffect(() => {
    if (A.length === 0) {
      return;
    }
    const t = setInterval(() => {
      setA((i) =>
        i
          .map((c) => ({
            ...c,
            x: c.x + c.vx,
            y: c.y + c.vy,
            vy: c.vy + 0.3,
            life: c.life - 0.015,
          }))
          .filter((c) => c.life > 0),
      );
    }, 20);
    return () => clearInterval(t);
  }, [A.length]);
  React.useEffect(() => {
    if (L === "happy" || L === "sad") {
      const t = setTimeout(() => setL_1("neutral"), 1500);
      return () => clearTimeout(t);
    }
  }, [L]);
  const je = (x_1, y_1, c = 50) => {
    const g = ["#ffd36b", "#ff8a2a", "#ff3860", "#ff00aa", "#00d4ff", "#46ff9a", "#ffd600"];
    const f = [];
    for (let s = 0; s < c; s++) {
      const y = (Math.PI * 2 * s) / c;
      const M = 3 + Math.random() * 15;
      f.push({
        id: ++heRef.current,
        x: x_1,
        y: y_1,
        vx: Math.cos(y) * M,
        vy: Math.sin(y) * M - 4,
        color: g[s % g.length],
        life: 1 + Math.random() * 0.5,
        size: 3 + Math.random() * 8,
      });
    }
    setA((s) => [...s, ...f]);
  };
  const se = React.useCallback(
    (t) => {
      playClick();
      let i = t ? a(t) : a();
      if (i.length === 0) {
        setRe(
          'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
        );
        return;
      }
      const c = i
        .filter((s) => s.espanol && s.chino)
        .map((s) => ({
          word: Re(s.espanol),
          hint: s.espanol,
          hintCn: s.chino,
        }))
        .filter((s) => s.word.length >= 3 && s.word.length <= 12)
        .map((s) => ({
          ...s,
          difficulty: We(s.word),
        }));
      const g = new Set();
      const f = [];
      for (const s of c) {
        if (!g.has(s.word)) {
          g.add(s.word);
          f.push(s);
        }
      }
      setB(f);
      QRef.current = f.map((s, y) => y).sort(() => Math.random() - 0.5);
      setU(0);
      setN(0);
      set_(0);
      setK(0);
      setL("playing");
      setV("");
      setW(false);
      setJ("");
      setG([]);
      setA([]);
      setTe(1);
      setL_1("neutral");
      setX("playing");
    },
    [playClick],
  );
  const p = b[QRef.current[u]];
  React.useEffect(() => {
    if (x === "playing" && p) {
      setZ(Ie(p.word));
      setJ("");
      setL("playing");
      setW(false);
      setV("");
    }
  }, [u, x, p]);
  React.useEffect(() => {
    if (x === "playing") {
      DRef.current = setInterval(() => setK((t) => t + 1), 1000);
      return () => {
        if (DRef.current) {
          clearInterval(DRef.current);
        }
      };
    }
  }, [x]);
  const oe = () => {
    if (!j.trim() || l !== "playing" || !p) {
      return;
    }
    if (j.trim().toUpperCase() === p.word) {
      playCorrect();
      setL("correct");
      setL_1("happy");
      const i = _ * 10;
      const c = Math.floor((te - 1) * 50);
      const g = 100 + i + c;
      setN((f) => f + g);
      set_((f) => {
        const s = f + 1;
        setH((y) => {
          const M = Math.max(y, s);
          localStorage.setItem("scramble_best", String(M));
          return M;
        });
        return s;
      });
      setTe((f) => Math.min(f + 0.5, 3));
      Ee();
      setV("¡Correcto! / 答对了！");
      setUe(true);
      setTimeout(() => setUe(false), 1000);
      if (ORef.current) {
        const f = ORef.current.getBoundingClientRect();
        je(f.width / 2, f.height / 2 - 50, 60);
        setG((s) => [
          ...s,
          {
            id: Date.now() + Math.random(),
            x: f.width / 2 - 30,
            y: f.height / 2 - 50,
            text: `+${g}`,
            color: "#46ff9a",
            life: 1.5,
          },
        ]);
      }
    } else {
      playWrong();
      setL("wrong");
      setL_1("sad");
      set_(0);
      setTe(1);
      setXe(true);
      setBe(true);
      setTimeout(() => {
        setXe(false);
        setBe(false);
      }, 600);
      setV(`La respuesta era: ${p.word}`);
    }
  };
  const U = () => {
    playClick();
    if (u < b.length - 1) {
      setU((t) => t + 1);
    } else {
      setL("won");
      setL_1("excited");
      playWin();
    }
  };
  const onKeyDown = (t) => {
    if (t.key === "Enter") {
      if (l === "playing") {
        oe();
      } else if (l === "correct" || l === "wrong") {
        U();
      }
    }
  };
  const F = (t) => {
    switch (t) {
      case "easy":
        return "#46ff9a";
      case "medium":
        return "#ffd600";
      default:
        return "#ff4444";
    }
  };
  if (x === "select") {
    return (
      <StarfieldBackground>
        <Pe1Component />
        <div
          className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative z-10"
          style={{
            perspective: "1000px",
          }}
        >
          <SoundToggles />
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/juegos"
              onClick={() => playClick()}
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
            >
              <ArrowLeftIcon size={16} /> Volver / 返回
            </Link>
          </div>
          <div className="text-center mb-10">
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-4 relative"
              style={{
                background: "linear-gradient(135deg,#ffd36b,#ff8a2a)",
                boxShadow: "0 0 60px rgba(255,211,107,0.4), 0 0 120px rgba(255,138,42,0.2)",
                animation: "scrambleFloat 3s ease-in-out infinite",
              }}
            >
              <RocketIcon
                size={48}
                className="text-white"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))",
                }}
              />
              <div
                className="absolute -top-2 -right-2"
                style={{
                  animation: "sparkle 2s ease-in-out infinite",
                }}
              >
                <StarIcon
                  size={20}
                  style={{
                    color: "#ffd600",
                    fill: "#ffd600",
                  }}
                />
              </div>
            </div>
            <h1
              className="text-5xl md:text-7xl font-black mb-2"
              style={{
                background: "linear-gradient(135deg,#ffd36b 0%,#ff8a2a 50%,#ff3860 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 40px rgba(255,211,107,.4))",
                animation: "scrambleTitlePulse 3s ease-in-out infinite alternate",
              }}
            >
              Palabra Desordenada
            </h1>
            <p className="text-white/50 text-lg font-medium">
              Selecciona un módulo para jugar / 选择模块开始游戏
            </p>
            {re && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold"
                style={{
                  background: "rgba(255,68,68,.12)",
                  border: "1px solid rgba(255,68,68,.3)",
                  color: "#ff6b35",
                }}
              >
                {re}
              </div>
            )}
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            style={{
              perspective: "1000px",
            }}
          >
            <button
              onClick={() => {
                setRe("");
                se(null);
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
                t.currentTarget.style.boxShadow = "0 0 60px rgba(255,211,107,.3),0 25px 60px rgba(0,0,0,.5)";
                t.currentTarget.style.borderColor = "#ffd36b60";
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
                  background: "linear-gradient(90deg, #ffd36b00, #ffd36b, #ffd36b00)",
                  backgroundSize: "200% 100%",
                  animation: "borderRotate 3s linear infinite",
                  zIndex: -1,
                }}
              />
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                  boxShadow: "0 0 20px rgba(255,0,170,0.3)",
                }}
              >
                <LayersIcon size={24} className="text-white" />
              </div>
              <h3 className="text-white font-black text-base mb-1">Todos los módulos</h3>
              <p
                className="text-xs font-medium mb-1"
                style={{
                  color: "rgba(255,0,170,.7)",
                }}
              >
                所有模块
              </p>
              <p className="text-xs font-medium text-white/40">Mezcla todo el vocabulario</p>
            </button>
            {ye.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setRe("");
                  se(t.id);
                }}
                className="group relative rounded-2xl p-5 text-left cursor-pointer block overflow-hidden transition-all duration-500"
                style={{
                  background: "linear-gradient(180deg,rgba(14,22,64,.65),rgba(5,8,27,.5))",
                  border: "1px solid rgba(255,255,255,.14)",
                  backdropFilter: "blur(14px)",
                  transformStyle: "preserve-3d",
                }}
                onMouseEnter={(i) => {
                  i.currentTarget.style.transform =
                    "translateY(-12px) scale(1.03) rotateX(5deg) rotateY(2deg)";
                  i.currentTarget.style.boxShadow = `0 0 60px ${t.color}30,0 25px 60px rgba(0,0,0,.5)`;
                  i.currentTarget.style.borderColor = `${t.color}60`;
                }}
                onMouseLeave={(i) => {
                  i.currentTarget.style.transform = "";
                  i.currentTarget.style.boxShadow = "";
                  i.currentTarget.style.borderColor = "rgba(255,255,255,.14)";
                }}
              >
                <div
                  className="absolute -inset-[2px] rounded-[26px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, ${t.color}00, ${t.color}, ${t.color}00)`,
                    backgroundSize: "200% 100%",
                    animation: "borderRotate 3s linear infinite",
                    zIndex: -1,
                  }}
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
                    boxShadow: `0 0 20px ${t.color}40`,
                  }}
                >
                  <BookOpenIcon size={24} className="text-white" />
                </div>
                <h3 className="text-white font-black text-base mb-1">{t.titulo}</h3>
                <p
                  className="text-xs font-medium mb-1"
                  style={{
                    color: `${t.color}aa`,
                  }}
                >
                  {t.tituloChino}
                </p>
                <p className="text-xs font-medium text-white/40">{t.vocabularioCount} palabras / 词</p>
              </button>
            ))}
          </div>
          <style>{`
            @keyframes scrambleFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
            @keyframes scrambleTitlePulse { from{filter:drop-shadow(0 0 40px rgba(255,211,107,.4)) brightness(1)} to{filter:drop-shadow(0 0 80px rgba(255,211,107,.6)) brightness(1.15)} }
            @keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
            @keyframes mascotFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
            @keyframes mascotPulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
            @keyframes mascotExcited { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-12px) scale(1.1)} }
            @keyframes sparkle { 0%,100%{opacity:0.5; transform:scale(1)} 50%{opacity:1; transform:scale(1.3)} }
          `}</style>
        </div>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <Pe1Component />
      <div
        className="max-w-2xl mx-auto px-4 py-6 min-h-screen relative z-10"
        style={{
          transform: be ? `translate(${Math.random() * 8 - 4}px, ${Math.random() * 8 - 4}px)` : "none",
          transition: "transform 0.05s",
        }}
      >
        <SoundToggles />
        <GeComponent mood={L} />
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {A.map((t) => (
            <div
              key={t.id}
              className="absolute rounded-full"
              style={{
                left: t.x,
                top: t.y,
                width: t.size,
                height: t.size,
                background: t.color,
                opacity: t.life,
                boxShadow: `0 0 ${t.size * 2}px ${t.color}`,
                animation: "particleSpin 0.5s linear infinite",
              }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/juegos"
            onClick={() => playClick()}
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
          >
            <ArrowLeftIcon size={16} /> Volver / 返回
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playClick();
                setX("select");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "#fff",
              }}
            >
              <LayersIcon size={12} /> Cambiar módulo / 切换模块
            </button>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{
                background: "rgba(255,107,53,.1)",
                border: "1px solid rgba(255,107,53,.2)",
                color: "#ff6b35",
                boxShadow: "0 0 10px rgba(255,107,53,.1)",
              }}
            >
              <FlameIcon size={12} /> Racha: {_}
            </div>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{
                background: "rgba(255,0,170,.1)",
                border: "1px solid rgba(255,0,170,.2)",
                color: "#ff00aa",
                boxShadow: "0 0 10px rgba(255,0,170,.1)",
              }}
            >
              <ZapIcon size={12} /> x{te.toFixed(1)}
            </div>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{
                background: "rgba(255,214,0,.1)",
                border: "1px solid rgba(255,214,0,.2)",
                color: "#ffd600",
                boxShadow: "0 0 10px rgba(255,214,0,.1)",
              }}
            >
              <ZapIcon size={12} /> {N}
            </div>
          </div>
        </div>
        <div className="text-center mb-6">
          <h1
            className="text-5xl md:text-6xl font-black mb-2"
            style={{
              background: "linear-gradient(135deg,#ffd36b,#ff8a2a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(255,211,107,.3))",
            }}
          >
            Palabra Desordenada
          </h1>
          <p className="text-white/40 text-sm font-medium">Ordena las letras / 重新排列字母</p>
        </div>
        <div className="max-w-sm mx-auto mb-6">
          <div className="flex items-center justify-between mb-1">
            <span
              className="text-[10px] font-bold uppercase tracking-wider"
              style={{
                color: "#ffd36b",
                textShadow: "0 0 10px rgba(255,211,107,.3)",
              }}
            >
              Progreso
            </span>
            <span
              className="text-[10px] font-bold"
              style={{
                color: "rgba(207,216,255,.4)",
              }}
            >
              {u + 1} / {b.length}
            </span>
          </div>
          <div
            className="h-2.5 rounded-full overflow-hidden relative"
            style={{
              background: "rgba(255,255,255,.05)",
              boxShadow: "inset 0 0 5px rgba(0,0,0,.3)",
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-500 relative"
              style={{
                width: `${(u / b.length) * 100}%`,
                background: "linear-gradient(90deg,#ffd36b,#ff8a2a,#ff3860)",
                boxShadow: "0 0 10px rgba(255,211,107,.5), 0 0 20px rgba(255,138,42,.3)",
              }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,.3), transparent)",
                  animation: "shimmer 2s linear infinite",
                }}
              />
            </div>
          </div>
        </div>
        <div
          className="rounded-3xl p-8 relative overflow-hidden"
          style={{
            background: "linear-gradient(180deg,rgba(14,22,64,.6),rgba(5,8,27,.45))",
            border: "1px solid rgba(255,255,255,.12)",
            backdropFilter: "blur(14px)",
            transformStyle: "preserve-3d",
            boxShadow: ue
              ? "0 0 60px rgba(70,255,154,.4), 0 0 120px rgba(70,255,154,.2), 0 0 200px rgba(70,255,154,.1)"
              : "0 0 30px rgba(255,211,107,.1)",
          }}
          ref={ORef}
        >
          <div
            className="absolute -inset-[1px] rounded-[22px] opacity-40"
            style={{
              background: "linear-gradient(135deg,#ffd36b,#ff8a2a)",
              filter: "blur(15px)",
              zIndex: -1,
            }}
          />
          <div
            className="absolute top-4 right-4 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase"
            style={{
              background: `${F(p?.difficulty || "easy")}15`,
              border: `1px solid ${F(p?.difficulty || "easy")}30`,
              color: F(p?.difficulty || "easy"),
              boxShadow: `0 0 10px ${F(p?.difficulty || "easy")}20`,
            }}
          >
            {p?.difficulty || "easy"}
          </div>
          <div className="text-center mb-6">
            <p
              className="text-xs font-bold mb-3 uppercase tracking-wider"
              style={{
                color: "rgba(207,216,255,.3)",
              }}
            >
              Letras desordenadas / 打乱的字母
            </p>
            <div
              className="flex gap-2 justify-center flex-wrap"
              style={{
                perspective: "600px",
              }}
            >
              {z.split("").map((ch, i) => (
                <PeComponent key={i} ch={ch} index={i} total={z.length} />
              ))}
            </div>
          </div>
          <div className="relative h-8 mb-2">
            {G.map((t) => (
              <div
                key={t.id}
                className="absolute left-1/2 -translate-x-1/2 font-black text-2xl pointer-events-none"
                style={{
                  color: t.color,
                  textShadow: `0 0 20px ${t.color}80, 0 0 40px ${t.color}40`,
                  opacity: t.life,
                  transform: `translateY(-${(1.5 - t.life) * 30}px) translateZ(50px)`,
                }}
              >
                {t.text}
              </div>
            ))}
          </div>
          <div className="text-center mb-6">
            <button
              onClick={() => setW(!W)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255,214,0,.08)",
                border: "1px solid rgba(255,214,0,.15)",
                color: "#ffd600",
                boxShadow: "0 0 10px rgba(255,214,0,.1)",
              }}
            >
              <LightbulbIcon size={12} /> {W ? "Ocultar / 隐藏" : "Pista / 提示"}
            </button>
            {W && (
              <p
                className="mt-3 text-sm font-medium"
                style={{
                  color: "rgba(207,216,255,.6)",
                  animation: "fadeIn 0.3s ease",
                }}
              >
                {p?.hintCn}
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              ref={geRef}
              type="text"
              value={j}
              onChange={(t) => setJ(t.target.value.toUpperCase())}
              onKeyDown={onKeyDown}
              disabled={l !== "playing"}
              placeholder="Escribe la palabra / 输入单词..."
              className="w-full px-5 py-4 rounded-2xl text-center text-xl font-black tracking-widest uppercase transition-all outline-none"
              style={{
                background:
                  l === "correct"
                    ? "rgba(70,255,154,.12)"
                    : l === "wrong"
                      ? "rgba(255,68,68,.12)"
                      : "rgba(255,255,255,.04)",
                border:
                  l === "correct"
                    ? "2px solid rgba(70,255,154,.5)"
                    : l === "wrong"
                      ? "2px solid rgba(255,68,68,.5)"
                      : "1px solid rgba(255,255,255,.1)",
                color: l === "correct" ? "#46ff9a" : l === "wrong" ? "#ff4444" : "#fff",
                boxShadow:
                  l === "correct"
                    ? "0 0 30px rgba(70,255,154,.3), 0 0 60px rgba(70,255,154,.1), inset 0 0 20px rgba(70,255,154,.05)"
                    : l === "wrong"
                      ? "0 0 30px rgba(255,68,68,.3), 0 0 60px rgba(255,68,68,.1)"
                      : "0 0 15px rgba(255,211,107,.1)",
                animation:
                  l === "wrong"
                    ? "scrambleShake 0.5s ease"
                    : l === "correct"
                      ? "correctGlow 0.6s ease"
                      : "none",
                textShadow: l === "correct" ? "0 0 10px rgba(70,255,154,.4)" : "none",
              }}
            />
          </div>
          {V && (
            <div
              className="text-center mb-4 p-3 rounded-xl"
              style={{
                background: l === "correct" ? "rgba(70,255,154,.1)" : "rgba(255,68,68,.1)",
                border: l === "correct" ? "1px solid rgba(70,255,154,.2)" : "1px solid rgba(255,68,68,.2)",
                animation: "fadeIn 0.3s ease",
                boxShadow: l === "correct" ? "0 0 15px rgba(70,255,154,.1)" : "0 0 15px rgba(255,68,68,.1)",
              }}
            >
              <p
                className="text-sm font-bold"
                style={{
                  color: l === "correct" ? "#46ff9a" : "#ff4444",
                  textShadow:
                    l === "correct" ? "0 0 10px rgba(70,255,154,.4)" : "0 0 10px rgba(255,68,68,.4)",
                }}
              >
                {V}
              </p>
            </div>
          )}
          <div className="flex gap-3 justify-center">
            {l === "playing" ? (
              <>
                <button
                  onClick={oe}
                  disabled={!j.trim()}
                  className="px-6 py-3 rounded-full text-white font-black text-sm transition-all disabled:opacity-30 hover:scale-105 flex items-center gap-2"
                  style={{
                    background: "linear-gradient(135deg,#ffd36b,#ff8a2a)",
                    boxShadow: "0 0 20px rgba(255,211,107,.2), 0 0 40px rgba(255,211,107,.1)",
                  }}
                >
                  <SendIcon size={14} /> Comprobar / 检查
                </button>
                <button
                  onClick={U}
                  className="px-4 py-3 rounded-full text-xs font-bold transition-all hover:scale-105 flex items-center gap-1.5"
                  style={{
                    background: "rgba(255,255,255,.04)",
                    border: "1px solid rgba(255,255,255,.08)",
                    color: "rgba(207,216,255,.5)",
                  }}
                >
                  <SkipForwardIcon size={12} /> Saltar / 跳过
                </button>
              </>
            ) : (
              <button
                onClick={U}
                className="px-6 py-3 rounded-full text-white font-black text-sm transition-all hover:scale-105 flex items-center gap-2"
                style={{
                  background: "linear-gradient(135deg,#ffd36b,#ff8a2a)",
                  boxShadow: "0 0 20px rgba(255,211,107,.2), 0 0 40px rgba(255,211,107,.1)",
                }}
              >
                {u < b.length - 1 ? "Siguiente / 下一个" : "Ver resultado / 看结果"}
              </button>
            )}
          </div>
        </div>
        <div className="text-center mt-4">
          <p
            className="text-xs font-medium"
            style={{
              color: "rgba(207,216,255,.3)",
            }}
          >
            Mejor racha / 最佳连续: {H}
          </p>
        </div>
        {l === "won" && (
          <div
            className="rounded-3xl p-8 text-center relative overflow-hidden mt-6"
            style={{
              background: "linear-gradient(180deg,rgba(14,22,64,.8),rgba(5,8,27,.6))",
              border: "2px solid rgba(255,214,0,.3)",
              boxShadow: "0 0 60px rgba(255,214,0,.15), 0 0 120px rgba(255,214,0,.08)",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-50"
              style={{
                background: "linear-gradient(135deg,#ffd36b,#ff8a2a,#ff3860)",
                filter: "blur(25px)",
                animation: "victoryGlow 2s ease-in-out infinite alternate",
              }}
            />
            <TrophyIcon
              size={56}
              style={{
                color: "#ffd600",
                margin: "0 auto 16px",
                filter: "drop-shadow(0 0 15px rgba(255,214,0,.5))",
                animation: "trophySpin 3s ease-in-out infinite",
              }}
            />
            <h2
              className="text-4xl font-black mb-2"
              style={{
                background: "linear-gradient(135deg,#ffd36b,#ff8a2a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 20px rgba(255,211,107,.3))",
              }}
            >
              ¡Completado!
            </h2>
            <p className="text-white/50 text-sm mb-4">你完成了所有单词！</p>
            <div className="flex gap-4 justify-center mb-6">
              <div
                className="p-4 rounded-2xl"
                style={{
                  background: "rgba(0,212,255,.1)",
                  border: "1px solid rgba(0,212,255,.15)",
                  boxShadow: "0 0 10px rgba(0,212,255,.1)",
                }}
              >
                <ZapIcon
                  size={20}
                  style={{
                    color: "#00d4ff",
                    margin: "0 auto 8px",
                    filter: "drop-shadow(0 0 5px rgba(0,212,255,.5))",
                  }}
                />
                <p
                  className="text-2xl font-black"
                  style={{
                    color: "#00d4ff",
                    textShadow: "0 0 10px rgba(0,212,255,.3)",
                  }}
                >
                  {N}
                </p>
                <p
                  className="text-[10px]"
                  style={{
                    color: "rgba(207,216,255,.4)",
                  }}
                >
                  Score
                </p>
              </div>
              <div
                className="p-4 rounded-2xl"
                style={{
                  background: "rgba(255,0,170,.1)",
                  border: "1px solid rgba(255,0,170,.15)",
                  boxShadow: "0 0 10px rgba(255,0,170,.1)",
                }}
              >
                <FlameIcon
                  size={20}
                  style={{
                    color: "#ff00aa",
                    margin: "0 auto 8px",
                    filter: "drop-shadow(0 0 5px rgba(255,0,170,.5))",
                  }}
                />
                <p
                  className="text-2xl font-black"
                  style={{
                    color: "#ff00aa",
                    textShadow: "0 0 10px rgba(255,0,170,.3)",
                  }}
                >
                  {H}
                </p>
                <p
                  className="text-[10px]"
                  style={{
                    color: "rgba(207,216,255,.4)",
                  }}
                >
                  Mejor racha
                </p>
              </div>
              <div
                className="p-4 rounded-2xl"
                style={{
                  background: "rgba(57,255,20,.1)",
                  border: "1px solid rgba(57,255,20,.15)",
                  boxShadow: "0 0 10px rgba(57,255,20,.1)",
                }}
              >
                <TimerIcon
                  size={20}
                  style={{
                    color: "#39ff14",
                    margin: "0 auto 8px",
                    filter: "drop-shadow(0 0 5px rgba(57,255,20,.5))",
                  }}
                />
                <p
                  className="text-2xl font-black"
                  style={{
                    color: "#39ff14",
                    textShadow: "0 0 10px rgba(57,255,20,.3)",
                  }}
                >
                  {Math.floor(K / 60)}:{String(K % 60).padStart(2, "0")}
                </p>
                <p
                  className="text-[10px]"
                  style={{
                    color: "rgba(207,216,255,.4)",
                  }}
                >
                  Tiempo
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                playClick();
                QRef.current = b.map((t, i) => i).sort(() => Math.random() - 0.5);
                setU(0);
                setN(0);
                set_(0);
                setK(0);
                setL("playing");
                setL_1("neutral");
              }}
              className="px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg,#ffd36b,#ff8a2a)",
                boxShadow: "0 0 25px rgba(255,211,107,.3), 0 0 50px rgba(255,211,107,.1)",
              }}
            >
              Jugar de nuevo / 再玩一次
            </button>
            <P currentGameId="scramble" />
          </div>
        )}
        <style>{`
          @keyframes letterLevitate { 0%,100%{transform:translateY(0) rotateX(0deg)} 50%{transform:translateY(-6px) rotateX(5deg)} }
          @keyframes letterReveal { 0%{transform:translateY(-30px) rotateX(45deg) scale(0.3); opacity:0} 60%{transform:translateY(8px) rotateX(-5deg) scale(1.08)} 100%{transform:translateY(0) rotateX(0) scale(1); opacity:1} }
          @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
          @keyframes scrambleShake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-10px)} 40%{transform:translateX(10px)} 60%{transform:translateX(-8px)} 80%{transform:translateX(8px)} }
          @keyframes correctGlow { 0%{box-shadow:0 0 30px rgba(70,255,154,.3)} 50%{box-shadow:0 0 50px rgba(70,255,154,.5), 0 0 80px rgba(70,255,154,.2)} 100%{box-shadow:0 0 30px rgba(70,255,154,.3)} }
          @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
          @keyframes trophySpin { 0%,100%{transform:rotateY(0) scale(1)} 50%{transform:rotateY(180deg) scale(1.1)} }
          @keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
          @keyframes mascotFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
          @keyframes mascotPulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
          @keyframes mascotExcited { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-12px) scale(1.1)} }
          @keyframes sparkle { 0%,100%{opacity:0.5; transform:scale(1)} 50%{opacity:1; transform:scale(1.3)} }
          @keyframes victoryGlow { from{opacity:.3} to{opacity:.6} }
          @keyframes particleSpin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        `}</style>
      </div>
    </StarfieldBackground>
  );
}
export { HeComponent as default };
