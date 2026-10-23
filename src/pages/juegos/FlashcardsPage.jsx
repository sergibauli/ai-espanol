import {
  BookOpenIcon,
  AwardIcon,
  TrophyIcon,
  ZapIcon,
  ArrowRightIcon,
  StarIcon,
  SparklesIcon,
  ArrowLeftIcon,
  CreditCardIcon,
  LayersIcon,
  RotateCcwIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P as P_1 } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g as g_1, b, c as c_1 } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
function D(s = 120) {
  const r = ["#ff00aa", "#00d4ff", "#ffd600", "#39ff14", "#b829dd", "#ff4444", "#46ff9a", "#ff6b35"];
  const n = ["circle", "square", "star"];
  for (let m = 0; m < s; m++) {
    const t = document.createElement("div");
    const l = n[Math.floor(Math.random() * n.length)];
    const x = r[Math.floor(Math.random() * r.length)];
    const o = 6 + Math.random() * 10;
    t.style.position = "fixed";
    t.style.left = "50%";
    t.style.top = "40%";
    t.style.width = `${o}px`;
    t.style.height = `${o}px`;
    t.style.background = l === "star" ? "transparent" : x;
    switch (l) {
      case "star":
        t.style.clipPath =
          "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
        t.style.background = x;
        break;
      case "square":
        t.style.borderRadius = "2px";
        break;
      default:
        t.style.borderRadius = "50%";
    }
    t.style.pointerEvents = "none";
    t.style.zIndex = "9999";
    document.body.appendChild(t);
    const b = Math.random() * Math.PI * 2;
    const i = 4 + Math.random() * 18;
    let u = window.innerWidth / 2;
    let g = window.innerHeight * 0.4;
    let p = 1;
    let y = 0;
    const N = Math.cos(b) * i;
    const S = Math.sin(b) * i - 6;
    let w = 1;
    const v = () => {
      u += N;
      g += S + (1 - w) * 6;
      p -= 0.008;
      y += 8;
      t.style.left = `${u}px`;
      t.style.top = `${g}px`;
      t.style.opacity = String(p);
      t.style.transform = `rotate(${y}deg)`;
      w -= 0.008;
      if (p > 0) {
        requestAnimationFrame(v);
      } else {
        t.remove();
      }
    };
    requestAnimationFrame(v);
  }
}
function Q(s) {
  for (let r = 0; r < 30; r++) {
    const n = document.createElement("div");
    const m = 4 + Math.random() * 6;
    n.style.cssText = `position:fixed;left:50%;top:50%;width:${m}px;height:${m}px;border-radius:50%;background:${s};pointer-events:none;z-index:9999;`;
    document.body.appendChild(n);
    const t = Math.random() * Math.PI * 2;
    const l = 3 + Math.random() * 10;
    let x = window.innerWidth / 2;
    let o = window.innerHeight / 2;
    let b = 1;
    const i = Math.cos(t) * l;
    const u = Math.sin(t) * l;
    const g = () => {
      x += i;
      o += u + 2;
      b -= 0.02;
      n.style.left = `${x}px`;
      n.style.top = `${o}px`;
      n.style.opacity = String(b);
      if (b > 0) {
        requestAnimationFrame(g);
      } else {
        n.remove();
      }
    };
    requestAnimationFrame(g);
  }
}
function Q1Component() {
  const s = React.useMemo(
    () =>
      Array.from({
        length: 40,
      }).map((r, id) => ({
        id,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 5,
        opacity: 0.15 + Math.random() * 0.35,
        color: Math.random() > 0.5 ? "#fff" : "#b829dd",
      })),
    [],
  );
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {s.map((r) => (
        <div
          key={r.id}
          className="absolute rounded-full"
          style={{
            left: `${r.left}%`,
            top: `${r.top}%`,
            width: `${r.size}px`,
            height: `${r.size}px`,
            background: r.color,
            opacity: r.opacity,
            boxShadow: `0 0 ${r.size * 2}px ${r.color}`,
            animation: `particleFloat ${r.duration}s ease-in-out ${r.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
function NeComponent({ mood }) {
  const rx = mood === "sad" ? 6 : mood === "excited" ? 9 : 7;
  const ry = mood === "sad" ? 4 : mood === "excited" ? 10 : 7;
  const d =
    mood === "happy"
      ? "M 28 48 Q 40 56 52 48"
      : mood === "sad"
        ? "M 30 52 Q 40 44 50 52"
        : mood === "excited"
          ? "M 28 48 Q 40 62 52 48"
          : "M 32 50 Q 40 52 48 50";
  const fill = mood === "happy" || mood === "excited" ? "rgba(255,105,180,0.6)" : "rgba(255,105,180,0.25)";
  const l =
    mood === "happy" ? "#46ff9a" : mood === "sad" ? "#ff4444" : mood === "excited" ? "#ffd600" : "#00d4ff";
  const animation =
    mood === "excited" ? "mascotExcited 0.4s ease-in-out infinite" : "mascotFloat 3s ease-in-out infinite";
  return (
    <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
      <div
        className="relative w-20 h-20 md:w-28 md:h-28"
        style={{
          animation,
        }}
      >
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-60"
          style={{
            background: l,
            animation: "mascotPulse 2s ease-in-out infinite",
          }}
        />
        {(mood === "happy" || mood === "excited") && (
          <>
            <div
              className="absolute -top-1 left-0"
              style={{
                animation: "sparkleSpin 2s linear infinite",
              }}
            >
              <StarIcon size={12} className="text-yellow-300" fill="currentColor" />
            </div>
            <div
              className="absolute top-1 -right-1"
              style={{
                animation: "sparkleSpin 2.5s linear infinite reverse",
              }}
            >
              <StarIcon size={10} className="text-pink-400" fill="currentColor" />
            </div>
            <div
              className="absolute -bottom-1 left-2"
              style={{
                animation: "sparkleSpin 3s linear infinite",
              }}
            >
              <SparklesIcon size={10} className="text-cyan-300" />
            </div>
          </>
        )}
        {mood === "sad" && (
          <>
            <div
              className="absolute top-4 -left-3"
              style={{
                animation: "tearDrop 1.2s ease-in infinite",
              }}
            >
              <div className="w-1.5 h-2 rounded-full bg-cyan-300 opacity-70" />
            </div>
            <div
              className="absolute top-6 -right-2"
              style={{
                animation: "tearDrop 1.5s ease-in infinite 0.3s",
              }}
            >
              <div className="w-1.5 h-2 rounded-full bg-cyan-300 opacity-70" />
            </div>
          </>
        )}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 80 80"
          fill="none"
          className="relative drop-shadow-[0_0_15px_rgba(0,212,255,0.5)]"
        >
          <defs>
            <linearGradient id="blobGradFlash" x1="0" y1="0" x2="80" y2="80">
              <stop offset="0%" stopColor="#b829dd" />
              <stop offset="100%" stopColor="#ff00aa" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <ellipse
            cx="22"
            cy="18"
            rx="8"
            ry="10"
            fill="url(#blobGradFlash)"
            stroke={l}
            strokeWidth="1.5"
            opacity="0.9"
          />
          <ellipse
            cx="58"
            cy="18"
            rx="8"
            ry="10"
            fill="url(#blobGradFlash)"
            stroke={l}
            strokeWidth="1.5"
            opacity="0.9"
          />
          <circle cx="22" cy="18" r="4" fill="rgba(255,255,255,0.2)" />
          <circle cx="58" cy="18" r="4" fill="rgba(255,255,255,0.2)" />
          <circle
            cx="40"
            cy="44"
            r="32"
            fill="url(#blobGradFlash)"
            stroke={l}
            strokeWidth="2"
            filter="url(#glow)"
          />
          <ellipse cx="28" cy="38" rx={rx} ry={ry} fill="white" />
          <ellipse cx="52" cy="38" rx={rx} ry={ry} fill="white" />
          <circle cx="28" cy="38" r="3.5" fill="#1a1a2e" />
          <circle cx="52" cy="38" r="3.5" fill="#1a1a2e" />
          <circle cx="29.5" cy="36.5" r="1.2" fill="white" opacity="0.9" />
          <circle cx="53.5" cy="36.5" r="1.2" fill="white" opacity="0.9" />
          {mood === "sad" && (
            <>
              <path
                d="M 22 28 Q 28 24 34 28"
                stroke={l}
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 46 28 Q 52 24 58 28"
                stroke={l}
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </>
          )}
          {mood === "excited" && (
            <>
              <path
                d="M 22 26 Q 28 20 34 26"
                stroke={l}
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 46 26 Q 52 20 58 26"
                stroke={l}
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </>
          )}
          <path d={d} stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="20" cy="46" r="4" fill={fill} />
          <circle cx="60" cy="46" r="4" fill={fill} />
        </svg>
      </div>
    </div>
  );
}
function BeComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [l, setL] = React.useState("select");
  const [o, setO] = React.useState([]);
  const [i, setI] = React.useState(0);
  const [g, setG] = React.useState(false);
  const [y, setY] = React.useState(0);
  const [S, setS] = React.useState(0);
  const [v, setV] = React.useState(null);
  const [C, setC] = React.useState("neutral");
  const V = g_1();
  const [P, setP] = React.useState("");
  const F = React.useCallback(
    (a) => {
      playClick();
      let c = a ? b(a) : c_1();
      if (c.length === 0) {
        setP(
          'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
        );
        return;
      }
      const H = c
        .filter((j) => j.espanol && j.chino)
        .map((j) => ({
          espanol: j.espanol.trim(),
          chino: j.chino.trim(),
          ejemplo: j.ejemplo || "",
        }))
        .sort(() => Math.random() - 0.5);
      setO(H);
      setI(0);
      setG(false);
      setY(0);
      setS(0);
      setC("neutral");
      setL("playing");
    },
    [playClick],
  );
  const h = o[i];
  const _ = o.length > 0 ? (i / o.length) * 100 : 0;
  const z = () => {
    playClick();
    if (i < o.length - 1) {
      setV("right");
      setG(false);
      setTimeout(() => {
        setI((a) => a + 1);
        setV(null);
      }, 300);
    }
  };
  const W = () => {
    playClick();
    if (i > 0) {
      setV("left");
      setG(false);
      setTimeout(() => {
        setI((a) => a - 1);
        setV(null);
      }, 300);
    }
  };
  const X = () => {
    playCorrect();
    Q("#46ff9a");
    setY((a) => a + 1);
    setC("happy");
    if (i < o.length - 1) {
      z();
    } else {
      D();
      playWin();
      setC("excited");
    }
  };
  const A = () => {
    playWrong();
    Q("#ff4444");
    setS((a) => a + 1);
    setC("sad");
    if (i < o.length - 1) {
      z();
    } else {
      D();
      playWin();
      setC("excited");
    }
  };
  React.useEffect(() => {
    const a = (c) => {
      if (l === "playing") {
        if (c.key === "ArrowRight" || c.key === " ") {
          z();
        }
        if (c.key === "ArrowLeft") {
          W();
        }
        if (c.key === "ArrowUp" || c.key === "f") {
          setG((f) => !f);
        }
        if (c.key === "k") {
          X();
        }
        if (c.key === "u") {
          A();
        }
      }
    };
    window.addEventListener("keydown", a);
    return () => window.removeEventListener("keydown", a);
  }, [l, i, o.length]);
  React.useEffect(() => {
    if (C === "happy" || C === "sad") {
      const a = setTimeout(() => setC("neutral"), 1500);
      return () => clearTimeout(a);
    }
  }, [C]);
  const T = i >= o.length - 1 && y + S >= o.length && o.length > 0;
  if (l === "select") {
    return (
      <StarfieldBackground>
        <Q1Component />
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
          <div
            className="text-center mb-10"
            style={{
              animation: "popIn 0.6s ease-out",
            }}
          >
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4"
              style={{
                background: "linear-gradient(135deg,#b829dd,#ff00aa)",
                boxShadow: "0 0 50px rgba(184,41,221,0.6), 0 0 100px rgba(255,0,170,0.2)",
                animation: "flashcardFloat 3s ease-in-out infinite",
              }}
            >
              <CreditCardIcon size={40} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            </div>
            <h1
              className="text-4xl md:text-6xl font-black mb-2"
              style={{
                background: "linear-gradient(135deg,#b829dd 0%,#ff00aa 50%,#ffd600 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 40px rgba(184,41,221,.4))",
                animation: "flashcardTitlePulse 3s ease-in-out infinite alternate",
              }}
            >
              Flashcards 3D
            </h1>
            <p className="text-white/50 text-lg">Selecciona un módulo para jugar / 选择模块开始游戏</p>
            {P && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold"
                style={{
                  background: "rgba(255,68,68,.12)",
                  border: "1px solid rgba(255,68,68,.3)",
                  color: "#ff6b35",
                }}
              >
                {P}
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
                setP("");
                F(null);
              }}
              className="group relative rounded-2xl p-5 text-left cursor-pointer block overflow-hidden transition-all duration-500"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.65),rgba(5,8,27,.5))",
                border: "1px solid rgba(255,255,255,.14)",
                backdropFilter: "blur(14px)",
                transformStyle: "preserve-3d",
                animation: "popIn 0.5s ease-out backwards",
              }}
              onMouseEnter={(a) => {
                a.currentTarget.style.transform = "translateY(-12px) scale(1.03) rotateX(5deg) rotateY(2deg)";
                a.currentTarget.style.boxShadow = "0 0 60px rgba(184,41,221,.4),0 25px 60px rgba(0,0,0,.5)";
                a.currentTarget.style.borderColor = "#b829dd90";
              }}
              onMouseLeave={(a) => {
                a.currentTarget.style.transform = "";
                a.currentTarget.style.boxShadow = "";
                a.currentTarget.style.borderColor = "rgba(255,255,255,.14)";
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, #b829dd00, #b829dd, #ff00aa, #b829dd00)",
                  backgroundSize: "300% 100%",
                  animation: "borderRotate 3s linear infinite",
                  zIndex: -1,
                }}
              />
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                  boxShadow: "0 0 20px rgba(184,41,221,0.4)",
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
            {V.map((a, c) => (
              <button
                key={a.id}
                onClick={() => {
                  setP("");
                  F(a.id);
                }}
                className="group relative rounded-2xl p-5 text-left cursor-pointer block overflow-hidden transition-all duration-500"
                style={{
                  background: "linear-gradient(180deg,rgba(14,22,64,.65),rgba(5,8,27,.5))",
                  border: "1px solid rgba(255,255,255,.14)",
                  backdropFilter: "blur(14px)",
                  transformStyle: "preserve-3d",
                  animation: `popIn 0.5s ease-out ${0.1 + c * 0.08}s backwards`,
                }}
                onMouseEnter={(f) => {
                  f.currentTarget.style.transform =
                    "translateY(-12px) scale(1.03) rotateX(5deg) rotateY(2deg)";
                  f.currentTarget.style.boxShadow = `0 0 60px ${a.color}40,0 25px 60px rgba(0,0,0,.5)`;
                  f.currentTarget.style.borderColor = `${a.color}90`;
                }}
                onMouseLeave={(f) => {
                  f.currentTarget.style.transform = "";
                  f.currentTarget.style.boxShadow = "";
                  f.currentTarget.style.borderColor = "rgba(255,255,255,.14)";
                }}
              >
                <div
                  className="absolute -inset-[2px] rounded-[26px] opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, ${a.color}00, ${a.color}, ${a.color}88, ${a.color}00)`,
                    backgroundSize: "300% 100%",
                    animation: "borderRotate 3s linear infinite",
                    zIndex: -1,
                  }}
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                  style={{
                    background: `linear-gradient(135deg, ${a.color}, ${a.color}88)`,
                    boxShadow: `0 0 20px ${a.color}40`,
                  }}
                >
                  <BookOpenIcon size={24} className="text-white" />
                </div>
                <h3 className="text-white font-black text-base mb-1">{a.titulo}</h3>
                <p
                  className="text-xs font-medium mb-1"
                  style={{
                    color: `${a.color}aa`,
                  }}
                >
                  {a.tituloChino}
                </p>
                <p className="text-xs font-medium text-white/40">{a.vocabularioCount} palabras / 词</p>
              </button>
            ))}
          </div>
          <style>{`
            @keyframes flashcardFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
            @keyframes flashcardTitlePulse { from{filter:drop-shadow(0 0 40px rgba(184,41,221,.4)) brightness(1)} to{filter:drop-shadow(0 0 80px rgba(184,41,221,.6)) brightness(1.15)} }
            @keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:300% 50%} }
            @keyframes mascotFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
            @keyframes mascotPulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
            @keyframes mascotExcited { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-12px) scale(1.1)} }
            @keyframes sparkleSpin { 0%{transform:rotate(0deg) scale(1)} 50%{transform:rotate(180deg) scale(1.2)} 100%{transform:rotate(360deg) scale(1)} }
            @keyframes tearDrop { 0%{transform:translateY(0) scale(1); opacity:0.7} 80%{transform:translateY(12px) scale(0.8); opacity:0} 100%{opacity:0} }
            @keyframes particleFloat { 0%,100%{transform:translateY(0) translateX(0)} 25%{transform:translateY(-20px) translateX(10px)} 50%{transform:translateY(-10px) translateX(-10px)} 75%{transform:translateY(-30px) translateX(5px)} }
            @keyframes popIn { 0%{transform:scale(0.9); opacity:0} 100%{transform:scale(1); opacity:1} }
            @keyframes shine { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
            @keyframes cardFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
            @keyframes neonPulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
          `}</style>
        </div>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <Q1Component />
      <div
        className="max-w-3xl mx-auto px-4 py-6 min-h-screen flex flex-col relative z-10"
        style={{
          perspective: "1000px",
        }}
      >
        <SoundToggles />
        <NeComponent mood={C} />
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
                setL("select");
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
                background: "rgba(184,41,221,.1)",
                border: "1px solid rgba(184,41,221,.2)",
                color: "#b829dd",
                boxShadow: "0 0 10px rgba(184,41,221,0.15)",
              }}
            >
              <AwardIcon size={12} /> {y}/{o.length}
            </div>
          </div>
        </div>
        <div
          className="text-center mb-6"
          style={{
            animation: "popIn 0.5s ease-out",
          }}
        >
          <h1
            className="text-3xl md:text-5xl font-black mb-2"
            style={{
              background: "linear-gradient(135deg,#b829dd,#ff00aa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 20px rgba(184,41,221,.3))",
            }}
          >
            Flashcards 3D
          </h1>
          <p className="text-white/40 text-sm font-medium">Haz clic para voltear / 点击翻转</p>
        </div>
        <div className="max-w-md mx-auto mb-6 w-full">
          <div className="flex items-center justify-between mb-1">
            <span
              className="text-[10px] font-bold uppercase tracking-wider"
              style={{
                color: "#b829dd",
                textShadow: "0 0 8px rgba(184,41,221,0.4)",
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
              {i + 1} / {o.length}
            </span>
          </div>
          <div
            className="h-2.5 rounded-full overflow-hidden relative"
            style={{
              background: "rgba(255,255,255,.05)",
              boxShadow: "inset 0 0 8px rgba(0,0,0,.4), 0 0 10px rgba(184,41,221,0.1)",
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-700 relative"
              style={{
                width: `${_}%`,
                background: "linear-gradient(90deg,#b829dd,#ff00aa)",
                boxShadow: "0 0 15px rgba(184,41,221,.6), 0 0 30px rgba(255,0,170,.3)",
              }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent)",
                  animation: "shimmer 2s linear infinite",
                }}
              />
            </div>
          </div>
        </div>
        <div
          className="flex-1 flex items-center justify-center mb-6"
          style={{
            perspective: "1000px",
          }}
        >
          {h && !T && (
            <div
              className="relative w-full max-w-sm md:max-w-md mx-auto"
              style={{
                animation: "cardFloat 4s ease-in-out infinite",
                perspective: "1000px",
              }}
            >
              <div
                className="relative w-full cursor-pointer"
                style={{
                  transformStyle: "preserve-3d",
                  transform: g
                    ? "rotateY(180deg) scale(1.02)"
                    : v === "left"
                      ? "translateX(40px) rotateY(-15deg)"
                      : v === "right"
                        ? "translateX(-40px) rotateY(15deg)"
                        : "rotateY(0) scale(1)",
                  transition: "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                }}
                onClick={() => {
                  playClick();
                  setG((a) => !a);
                }}
              >
                <div
                  className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-70"
                  style={{
                    background: "linear-gradient(90deg, #b829dd, #ff00aa, #00d4ff, #b829dd)",
                    backgroundSize: "300% 300%",
                    animation: "borderRotate 3s linear infinite",
                    filter: "blur(8px)",
                  }}
                />
                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none z-10">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 70%)",
                      animation: "shine 3s ease-in-out infinite",
                    }}
                  />
                </div>
                <div
                  className="relative w-full rounded-3xl p-6 md:p-10 flex flex-col items-center justify-center text-center min-h-[280px] md:min-h-[380px]"
                  style={{
                    backfaceVisibility: "hidden",
                    background: "linear-gradient(180deg,rgba(184,41,221,.12),rgba(5,8,27,.5))",
                    border: "1px solid rgba(184,41,221,.3)",
                    boxShadow:
                      "0 0 40px rgba(184,41,221,.2), 0 20px 60px rgba(0,0,0,.5), inset 0 1px 1px rgba(255,255,255,.05)",
                    backdropFilter: "blur(14px)",
                  }}
                >
                  <div
                    className="absolute -inset-[2px] rounded-3xl -z-10 opacity-50"
                    style={{
                      background: "linear-gradient(135deg,#b829dd,#ff00aa)",
                      filter: "blur(20px)",
                    }}
                  />
                  <span
                    className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-6"
                    style={{
                      background: "rgba(184,41,221,.15)",
                      border: "1px solid rgba(184,41,221,.2)",
                      color: "#b829dd",
                      boxShadow: "0 0 10px rgba(184,41,221,0.1)",
                    }}
                  >
                    Español / 西班牙语
                  </span>
                  <h2
                    className="text-2xl md:text-4xl font-black text-white mb-4"
                    style={{
                      textShadow: "0 0 30px rgba(184,41,221,.4), 0 0 60px rgba(184,41,221,.2)",
                    }}
                  >
                    {h.espanol}
                  </h2>
                  {h.ejemplo && (
                    <p
                      className="text-sm font-medium max-w-xs"
                      style={{
                        color: "rgba(207,216,255,.5)",
                      }}
                    >
                      {h.ejemplo}
                    </p>
                  )}
                  <p
                    className="text-xs mt-6"
                    style={{
                      color: "rgba(207,216,255,.3)",
                    }}
                  >
                    Clic para voltear / 点击翻转
                  </p>
                </div>
                <div
                  className="absolute inset-0 w-full rounded-3xl p-6 md:p-10 flex flex-col items-center justify-center text-center min-h-[280px] md:min-h-[380px]"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    background: "linear-gradient(180deg,rgba(255,0,170,.12),rgba(5,8,27,.5))",
                    border: "1px solid rgba(255,0,170,.3)",
                    boxShadow:
                      "0 0 40px rgba(255,0,170,.2), 0 20px 60px rgba(0,0,0,.5), inset 0 1px 1px rgba(255,255,255,.05)",
                    backdropFilter: "blur(14px)",
                  }}
                >
                  <div
                    className="absolute -inset-[2px] rounded-3xl -z-10 opacity-50"
                    style={{
                      background: "linear-gradient(135deg,#ff00aa,#b829dd)",
                      filter: "blur(20px)",
                    }}
                  />
                  <span
                    className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-6"
                    style={{
                      background: "rgba(255,0,170,.15)",
                      border: "1px solid rgba(255,0,170,.2)",
                      color: "#ff00aa",
                      boxShadow: "0 0 10px rgba(255,0,170,0.1)",
                    }}
                  >
                    Chino / 中文
                  </span>
                  <h2
                    className="text-2xl md:text-4xl font-black mb-2"
                    style={{
                      color: "#ff00aa",
                      textShadow: "0 0 30px rgba(255,0,170,.4), 0 0 60px rgba(255,0,170,.2)",
                    }}
                  >
                    {h.chino}
                  </h2>
                  <p
                    className="text-sm font-medium"
                    style={{
                      color: "rgba(207,216,255,.4)",
                    }}
                  >
                    Pinyin:{" "}
                    <span
                      style={{
                        color: "rgba(207,216,255,.6)",
                      }}
                    >
                      ({h.chino})
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
          {T && (
            <div
              className="text-center p-8 rounded-3xl max-w-sm mx-auto relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.8),rgba(5,8,27,.6))",
                border: "1px solid rgba(255,0,170,.2)",
                boxShadow: "0 0 60px rgba(255,0,170,.2), 0 20px 60px rgba(0,0,0,.5)",
                transformStyle: "preserve-3d",
                animation: "popIn 0.6s ease-out",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-60"
                style={{
                  background: "linear-gradient(135deg,#b829dd,#ff00aa)",
                  filter: "blur(25px)",
                }}
              />
              <TrophyIcon
                size={48}
                style={{
                  color: "#ff00aa",
                  margin: "0 auto 16px",
                  filter: "drop-shadow(0 0 10px rgba(255,0,170,.5))",
                  animation: "trophySpin 3s ease-in-out infinite",
                }}
              />
              <h2
                className="text-3xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg,#b829dd,#ff00aa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ¡Completado!
              </h2>
              <p className="text-white/50 text-sm mb-4">完成！</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div
                  className="p-3 rounded-xl"
                  style={{
                    background: "rgba(70,255,154,.1)",
                    border: "1px solid rgba(70,255,154,.15)",
                    boxShadow: "0 0 15px rgba(70,255,154,0.1)",
                  }}
                >
                  <ZapIcon
                    size={16}
                    style={{
                      color: "#46ff9a",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 5px rgba(70,255,154,0.4))",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Sabidas
                  </p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#46ff9a",
                    }}
                  >
                    {y}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl"
                  style={{
                    background: "rgba(255,68,68,.1)",
                    border: "1px solid rgba(255,68,68,.15)",
                    boxShadow: "0 0 15px rgba(255,68,68,0.1)",
                  }}
                >
                  <ZapIcon
                    size={16}
                    style={{
                      color: "#ff4444",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 5px rgba(255,68,68,0.4))",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Repasar
                  </p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#ff4444",
                    }}
                  >
                    {S}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  playClick();
                  F(null);
                }}
                className="px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg,#b829dd,#ff00aa)",
                  boxShadow: "0 0 30px rgba(184,41,221,.4), 0 0 60px rgba(255,0,170,.2)",
                }}
              >
                Jugar de nuevo / 再玩一次
              </button>
              <P_1 currentGameId="flashcards" />
            </div>
          )}
        </div>
        {!T && h && (
          <div className="max-w-md mx-auto w-full space-y-4 relative z-20">
            <div className="flex items-center justify-between gap-2 md:gap-3">
              <button
                onClick={W}
                disabled={i === 0}
                className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full transition-all hover:scale-110 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 disabled:active:scale-100"
                style={{
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.12)",
                  color: "#fff",
                  boxShadow: "0 0 10px rgba(255,255,255,0.05)",
                }}
              >
                <ArrowLeftIcon size={18} />
              </button>
              <div className="flex gap-2 md:gap-3 flex-1">
                <button
                  onClick={A}
                  className="flex-1 py-3 rounded-full text-xs font-black transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: "rgba(255,68,68,.12)",
                    border: "1px solid rgba(255,68,68,.25)",
                    color: "#ff4444",
                    boxShadow: "0 0 15px rgba(255,68,68,0.1)",
                  }}
                >
                  Repasar / 复习
                </button>
                <button
                  onClick={X}
                  className="flex-1 py-3 rounded-full text-xs font-black transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: "rgba(70,255,154,.12)",
                    border: "1px solid rgba(70,255,154,.25)",
                    color: "#46ff9a",
                    boxShadow: "0 0 15px rgba(70,255,154,0.1)",
                  }}
                >
                  ¡Sé! / 会了
                </button>
              </div>
              <button
                onClick={z}
                disabled={i >= o.length - 1}
                className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full transition-all hover:scale-110 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 disabled:active:scale-100"
                style={{
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.12)",
                  color: "#fff",
                  boxShadow: "0 0 10px rgba(255,255,255,0.05)",
                }}
              >
                <ArrowRightIcon size={18} />
              </button>
            </div>
            <div className="text-center">
              <button
                onClick={() => {
                  playClick();
                  setG((a) => !a);
                }}
                className="px-5 py-2 rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "rgba(184,41,221,.1)",
                  border: "1px solid rgba(184,41,221,.2)",
                  color: "#b829dd",
                  boxShadow: "0 0 10px rgba(184,41,221,0.1)",
                }}
              >
                <RotateCcwIcon size={12} className="inline mr-1" /> Voltear / 翻转 (Space)
              </button>
            </div>
          </div>
        )}
        <style>{`
          @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
          @keyframes trophySpin { 0%,100%{transform:rotateY(0) scale(1)} 50%{transform:rotateY(180deg) scale(1.1)} }
          @keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:300% 50%} }
          @keyframes flashcardFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
          @keyframes flashcardTitlePulse { from{filter:drop-shadow(0 0 40px rgba(184,41,221,.4)) brightness(1)} to{filter:drop-shadow(0 0 80px rgba(184,41,221,.6)) brightness(1.15)} }
          @keyframes mascotFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
          @keyframes mascotPulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
          @keyframes mascotExcited { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-12px) scale(1.1)} }
          @keyframes sparkleSpin { 0%{transform:rotate(0deg) scale(1)} 50%{transform:rotate(180deg) scale(1.2)} 100%{transform:rotate(360deg) scale(1)} }
          @keyframes tearDrop { 0%{transform:translateY(0) scale(1); opacity:0.7} 80%{transform:translateY(12px) scale(0.8); opacity:0} 100%{opacity:0} }
          @keyframes particleFloat { 0%,100%{transform:translateY(0) translateX(0)} 25%{transform:translateY(-20px) translateX(10px)} 50%{transform:translateY(-10px) translateX(-10px)} 75%{transform:translateY(-30px) translateX(5px)} }
          @keyframes popIn { 0%{transform:scale(0.9); opacity:0} 100%{transform:scale(1); opacity:1} }
          @keyframes shine { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
          @keyframes cardFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
          @keyframes neonPulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        `}</style>
      </div>
    </StarfieldBackground>
  );
}
export { BeComponent as default };
