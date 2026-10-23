import {
  BookOpenIcon,
  StarIcon,
  ZapIcon,
  SparklesIcon,
  HeartIcon,
  TrophyIcon,
  ArrowLeftIcon,
  LayersIcon,
  CircleCheckIcon,
  RotateCcwIcon,
  PuzzleIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g, a as a_1 } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
function ye(espanol) {
  return espanol
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-ZÑ]/g, "")
    .trim();
}
function $(n) {
  const x = [...n];
  for (let i = x.length - 1; i > 0; i--) {
    const p = Math.floor(Math.random() * (i + 1));
    [x[i], x[p]] = [x[p], x[i]];
  }
  return x;
}
function ve(n, x) {
  const i = ["#00d4ff", "#ff00aa", "#ffd600", "#39ff14", "#b829dd", "#ff6b35", "#00ffcc"];
  for (let p = 0; p < 60; p++) {
    const s = document.createElement("div");
    const d = 4 + Math.random() * 6;
    s.style.cssText = `position:fixed;left:${n}px;top:${x}px;width:${d}px;height:${d}px;border-radius:50%;background:${i[p % i.length]};pointer-events:none;z-index:9999;box-shadow:0 0 8px ${i[p % i.length]};`;
    document.body.appendChild(s);
    const f = Math.random() * Math.PI * 2;
    const u = 3 + Math.random() * 14;
    let w = Math.cos(f) * u;
    let m = Math.sin(f) * u;
    let g = 1;
    let b = 0;
    const y = () => {
      w *= 0.94;
      m *= 0.94;
      m += 0.35;
      b += 8;
      s.style.left = `${parseFloat(s.style.left) + w}px`;
      s.style.top = `${parseFloat(s.style.top) + m}px`;
      s.style.transform = `rotate(${b}deg) scale(${g})`;
      g -= 0.018;
      s.style.opacity = String(g);
      if (g > 0) {
        requestAnimationFrame(y);
      } else {
        s.remove();
      }
    };
    requestAnimationFrame(y);
  }
}
function je(n, x) {
  const i = ["#00d4ff", "#ff00aa", "#ffd600", "#39ff14", "#b829dd", "#ff6b35", "#ff4444", "#00ffcc"];
  for (let p = 0; p < 120; p++) {
    const s = document.createElement("div");
    const d = Math.random() > 0.5;
    const f = 6 + Math.random() * 8;
    const u = i[Math.floor(Math.random() * i.length)];
    s.style.cssText = `position:fixed;left:${n}px;top:${x}px;width:${f}px;height:${d ? f * 0.6 : f}px;border-radius:${d ? "2px" : "50%"};background:${u};pointer-events:none;z-index:9999;box-shadow:0 0 6px ${u};`;
    document.body.appendChild(s);
    const w = Math.random() * Math.PI * 2;
    const m = 4 + Math.random() * 18;
    let g = Math.cos(w) * m;
    let b = Math.sin(w) * m - 8;
    let y = 1;
    let c = Math.random() * 360;
    let N = (Math.random() - 0.5) * 20;
    const k = () => {
      g *= 0.96;
      b += 0.4;
      c += N;
      s.style.left = `${parseFloat(s.style.left) + g}px`;
      s.style.top = `${parseFloat(s.style.top) + b}px`;
      s.style.transform = `rotate(${c}deg)`;
      y -= 0.012;
      s.style.opacity = String(y);
      if (y > 0) {
        requestAnimationFrame(k);
      } else {
        s.remove();
      }
    };
    requestAnimationFrame(k);
  }
}
function EeComponent({ expression }) {
  const x = React.useMemo(() => {
    switch (expression) {
      case "happy":
        return (
          <>
            <path
              d="M 55 95 Q 65 85 75 95"
              stroke="#1a1a2e"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 105 95 Q 115 85 125 95"
              stroke="#1a1a2e"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          </>
        );
      case "sad":
        return (
          <>
            <path
              d="M 55 100 Q 65 110 75 100"
              stroke="#1a1a2e"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 105 100 Q 115 110 125 100"
              stroke="#1a1a2e"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          </>
        );
      case "excited":
        return (
          <>
            <circle cx="65" cy="95" r="10" fill="#1a1a2e" />
            <circle cx="70" cy="90" r="3" fill="white" />
            <circle cx="115" cy="95" r="10" fill="#1a1a2e" />
            <circle cx="120" cy="90" r="3" fill="white" />
            <path
              d="M 55 80 Q 65 70 75 80"
              stroke="#1a1a2e"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 105 80 Q 115 70 125 80"
              stroke="#1a1a2e"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </>
        );
      default:
        return (
          <>
            <circle cx="65" cy="95" r="8" fill="#1a1a2e" />
            <circle cx="115" cy="95" r="8" fill="#1a1a2e" />
          </>
        );
    }
  }, [expression]);
  const i = React.useMemo(() => {
    switch (expression) {
      case "happy":
        return (
          <path
            d="M 75 115 Q 90 135 105 115"
            stroke="#1a1a2e"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        );
      case "sad":
        return (
          <path
            d="M 75 125 Q 90 115 105 125"
            stroke="#1a1a2e"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        );
      case "excited":
        return <ellipse cx="90" cy="125" rx="12" ry="15" fill="#1a1a2e" />;
      default:
        return (
          <path
            d="M 82 120 Q 90 125 98 120"
            stroke="#1a1a2e"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        );
    }
  }, [expression]);
  const p = React.useMemo(() => {
    if (expression === "sad") {
      return null;
    }
    return (
      <>
        <circle cx="50" cy="110" r="8" fill="#ff6b9d" opacity="0.4" />
        <circle cx="130" cy="110" r="8" fill="#ff6b9d" opacity="0.4" />
      </>
    );
  }, [expression]);
  const s = React.useMemo(() => {
    if (expression !== "excited") {
      return null;
    }
    return (
      <>
        <path d="M 20 40 L 25 30 L 30 40 L 25 50 Z" fill="#ffd600">
          <animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite" />
          <animateTransform
            attributeName="transform"
            type="scale"
            values="0.5;1.2;0.5"
            dur="1.2s"
            repeatCount="indefinite"
            additive="sum"
          />
        </path>
        <path d="M 150 30 L 155 20 L 160 30 L 155 40 Z" fill="#00d4ff">
          <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" begin="0.3s" />
          <animateTransform
            attributeName="transform"
            type="scale"
            values="0.5;1;0.5"
            dur="1s"
            repeatCount="indefinite"
            additive="sum"
          />
        </path>
        <path d="M 170 80 L 175 70 L 180 80 L 175 90 Z" fill="#39ff14">
          <animate attributeName="opacity" values="0;1;0" dur="1.4s" repeatCount="indefinite" begin="0.6s" />
          <animateTransform
            attributeName="transform"
            type="scale"
            values="0.5;1;0.5"
            dur="1.4s"
            repeatCount="indefinite"
            additive="sum"
          />
        </path>
      </>
    );
  }, [expression]);
  const d = expression === "excited" ? "animate-bounce" : "animate-float";
  return (
    <div
      className={`fixed bottom-4 right-4 z-50 pointer-events-none ${d}`}
      style={{
        animationDuration: expression === "excited" ? "0.6s" : "3s",
      }}
    >
      <svg
        width="100"
        height="100"
        viewBox="0 0 180 180"
        className="drop-shadow-[0_0_15px_rgba(0,212,255,0.5)]"
      >
        <defs>
          <linearGradient id="mascotBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#b829dd" />
          </linearGradient>
        </defs>
        <ellipse cx="50" cy="55" rx="22" ry="28" fill="url(#mascotBody)" opacity="0.9" />
        <ellipse cx="130" cy="55" rx="22" ry="28" fill="url(#mascotBody)" opacity="0.9" />
        <ellipse cx="50" cy="55" rx="12" ry="18" fill="#ff6b9d" opacity="0.5" />
        <ellipse cx="130" cy="55" rx="12" ry="18" fill="#ff6b9d" opacity="0.5" />
        <rect x="35" y="70" width="110" height="90" rx="45" ry="45" fill="url(#mascotBody)" />
        <rect x="50" y="85" width="80" height="60" rx="30" ry="30" fill="rgba(255,255,255,0.15)" />
        {x}
        {i}
        {p}
        {s}
        <ellipse cx="50" cy="145" rx="12" ry="8" fill="#ff6b9d" opacity="0.6" />
        <ellipse cx="130" cy="145" rx="12" ry="8" fill="#ff6b9d" opacity="0.6" />
      </svg>
    </div>
  );
}
function XeComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [d, setD] = React.useState("select");
  const [u, setU] = React.useState([]);
  const [m, setM] = React.useState(null);
  const [b, setB] = React.useState([]);
  const [c, setC] = React.useState([]);
  const [k, setK] = React.useState([]);
  const [D, setD_1] = React.useState(0);
  const [te, setTe] = React.useState(0);
  const [ae, setAe] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("wordpuzzle_best") || "0");
    } catch {
      return 0;
    }
  });
  const [S, setS] = React.useState("");
  const [Y, setY] = React.useState([]);
  const re = g();
  const [G, setG] = React.useState("");
  const [expression, setExpression] = React.useState("neutral");
  const [X, setX] = React.useState(false);
  const [L, setL] = React.useState(false);
  const vRef = React.useRef(null);
  const Z = React.useCallback((t) => {
    playClick();
    let a = t ? a_1(t) : a_1();
    if (a.length === 0) {
      setG(
        'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
      );
      return;
    }
    const r = $(
      a
        .filter((l) => l.espanol && l.chino)
        .map((l) => ({
          espanol: ye(l.espanol),
          chino: l.chino,
        }))
        .filter((l) => l.espanol.length >= 4 && l.espanol.length <= 10),
    );
    if (r.length === 0) {
      setG(
        'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
      );
      return;
    }
    setU(r);
    setD_1(0);
    setTe(0);
    setY([]);
    setS("");
    setG("");
    setD("playing");
    setExpression("neutral");
    setL(false);
  }, []);
  const I = React.useCallback(() => {
    if (u.length === 0) {
      return;
    }
    const t = u.filter((h) => !Y.includes(h.espanol));
    const a = t.length > 0 ? t : u;
    const r = a[Math.floor(Math.random() * a.length)];
    const l = t.length > 0 ? [...Y, r.espanol] : [r.espanol];
    setY(l);
    setM(r);
    const F = $(r.espanol.split(""));
    setB(F);
    setC([]);
    setK([]);
    setX(false);
    setL(false);
  }, [u, Y]);
  React.useEffect(() => {
    if (d === "playing" && u.length > 0) {
      I();
    }
  }, [d, u]);
  React.useEffect(
    () => () => {
      if (vRef.current) {
        window.clearTimeout(vRef.current);
      }
    },
    [],
  );
  const ne = (t, a) => {
    if (c.includes(t)) {
      return;
    }
    playClick();
    const r = [...c, t];
    setC(r);
    const l = m?.espanol || "";
    if (r.map((h) => b[h]).join("") === l) {
      playCorrect();
      setExpression("happy");
      const h = a.currentTarget.closest(".puzzle-container");
      if (h) {
        const j = h.getBoundingClientRect();
        ve(j.left + j.width / 2, j.top + j.height / 2);
      }
      setD_1((j) => j + 100 + l.length * 20);
      setTe((j) => j + 1);
      setX(true);
      setS("¡Correcto! / 正确！");
      if (vRef.current) {
        window.clearTimeout(vRef.current);
      }
      vRef.current = window.setTimeout(() => {
        setS("");
        setExpression("neutral");
        setX(false);
        I();
      }, 1200);
    } else {
      if (r.length === l.length) {
        playWrong();
        setExpression("sad");
        setL(true);
        setS("¡Incorrecto! / 错误！");
        if (vRef.current) {
          window.clearTimeout(vRef.current);
        }
        vRef.current = window.setTimeout(() => {
          setC([]);
          setS("");
          setExpression("neutral");
          setL(false);
        }, 1000);
      }
    }
  };
  const le = () => {
    if (!m || k.length >= m.espanol.length - 1) {
      return;
    }
    playClick();
    const k_length = k.length;
    setK([...k, k_length]);
    setC((a) => {
      const r = m.espanol[k_length];
      const l = b.findIndex((F, h) => F === r && !a.includes(h) && !k.includes(h));
      if (l >= 0) {
        return [...a, l];
      }
      return a;
    });
    setD_1((a) => Math.max(0, a - 20));
  };
  const ie = () => {
    playClick();
    playWin();
    setExpression("excited");
    setD("gameover");
    setAe((t) => {
      const a = Math.max(t, D);
      localStorage.setItem("wordpuzzle_best", String(a));
      return a;
    });
  };
  React.useEffect(() => {
    if (d === "gameover") {
      const t = window.setTimeout(() => {
        je(window.innerWidth / 2, window.innerHeight / 2);
      }, 300);
      return () => window.clearTimeout(t);
    }
  }, [d]);
  if (d === "select") {
    return (
      <StarfieldBackground>
        <EeComponent expression="neutral" />
        <div className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative">
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
            <h1
              className="text-4xl md:text-6xl font-black mb-3 animate-pulse"
              style={{
                textShadow: "0 0 40px rgba(0,212,255,0.5), 0 0 80px rgba(184,41,221,0.3)",
              }}
            >
              <PuzzleIcon
                size={40}
                className="inline mr-3 animate-spin-slow"
                style={{
                  animationDuration: "4s",
                }}
              />{" "}
              Word Puzzle
            </h1>
            <p className="text-white/50 text-sm font-medium">
              Selecciona un módulo para jugar / 选择模块开始游戏
            </p>
            {G && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-2xl text-sm font-bold animate-shake"
                style={{
                  background: "rgba(255,68,68,.15)",
                  border: "1px solid rgba(255,68,68,.4)",
                  color: "#ff6b35",
                  boxShadow: "0 0 20px rgba(255,68,68,.2)",
                }}
              >
                {G}
              </div>
            )}
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            style={{
              perspective: "1000px",
            }}
          >
            <button
              onClick={() => {
                playClick();
                setG("");
                Z(null);
              }}
              className="group relative rounded-2xl p-6 text-left transition-all duration-300 overflow-hidden module-card"
              style={{
                background: "rgba(14,22,64,.7)",
                border: "1px solid rgba(0,212,255,.4)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, rgba(0,212,255,0.1), rgba(184,41,221,0.1))",
                }}
              />
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 relative"
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #b829dd)",
                  boxShadow: "0 0 25px rgba(0,212,255,.4), 0 0 50px rgba(184,41,221,.2)",
                }}
              >
                <LayersIcon size={26} className="text-white drop-shadow-lg" />
              </div>
              <h3 className="text-white font-black text-lg mb-1 relative">Todos los módulos</h3>
              <p
                className="text-xs font-medium mb-1 relative"
                style={{
                  color: "rgba(0,212,255,.8)",
                }}
              >
                所有模块
              </p>
              <p className="text-xs font-medium text-white/40 relative">Mezcla todo el vocabulario</p>
              <div className="absolute -bottom-2 -right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <PuzzleIcon size={80} />
              </div>
            </button>
            {re.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  playClick();
                  setG("");
                  Z(t.id);
                }}
                className="group relative rounded-2xl p-6 text-left transition-all duration-300 overflow-hidden module-card"
                style={{
                  background: "rgba(14,22,64,.7)",
                  border: `1px solid ${t.color}55`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}15, ${t.color}05)`,
                  }}
                />
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 relative"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
                    boxShadow: `0 0 25px ${t.color}40, 0 0 50px ${t.color}20`,
                  }}
                >
                  <BookOpenIcon size={26} className="text-white drop-shadow-lg" />
                </div>
                <h3 className="text-white font-black text-lg mb-1 relative">{t.titulo}</h3>
                <p
                  className="text-xs font-medium mb-1 relative"
                  style={{
                    color: `${t.color}cc`,
                  }}
                >
                  {t.tituloChino}
                </p>
                <p className="text-xs font-medium text-white/40 relative">
                  {t.vocabularioCount} palabras / 词
                </p>
                <div
                  className="absolute -bottom-2 -right-2 opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{
                    color: t.color,
                  }}
                >
                  <StarIcon size={80} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <EeComponent expression={expression} />
      <div
        className={`max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6 min-h-screen relative z-10 ${L ? "animate-screen-shake" : ""}`}
      >
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-xs sm:text-sm font-bold group"
          >
            <ArrowLeftIcon size={14} className="group-hover:-translate-x-1 transition-transform" /> Volver /
            返回
          </Link>
          <div className="flex items-center gap-2 flex-wrap">
            <SoundToggles />
            <button
              onClick={() => {
                playClick();
                setD("select");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              style={{
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.15)",
                color: "#fff",
              }}
            >
              <LayersIcon size={12} /> Cambiar / 切换
            </button>
            <div
              className="score-pill px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5"
              style={{
                background: "rgba(0,212,255,.12)",
                border: "1px solid rgba(0,212,255,.3)",
                color: "#00d4ff",
                boxShadow: "0 0 15px rgba(0,212,255,.25), inset 0 0 10px rgba(0,212,255,.05)",
              }}
            >
              <ZapIcon size={12} className="animate-pulse" /> {D}
            </div>
            <div
              className="score-pill px-3 py-1.5 rounded-full text-xs font-bold transition-all"
              style={{
                background: "rgba(255,0,170,.12)",
                border: "1px solid rgba(255,0,170,.3)",
                color: "#ff00aa",
                boxShadow: "0 0 15px rgba(255,0,170,.25), inset 0 0 10px rgba(255,0,170,.05)",
              }}
            >
              Ronda: {te}
            </div>
          </div>
        </div>
        <div className="text-center mb-4 sm:mb-6">
          <h1
            className="text-2xl sm:text-3xl md:text-5xl font-black mb-2"
            style={{
              background: "linear-gradient(135deg,#00d4ff,#ff00aa,#ffd600)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 20px rgba(0,212,255,.4)) drop-shadow(0 0 40px rgba(184,41,221,.2))",
            }}
          >
            Word Puzzle
          </h1>
          <p className="text-white/40 text-xs sm:text-sm font-medium">
            Ordena las letras para formar la palabra / 排列字母组成单词
          </p>
        </div>
        <div
          style={{
            perspective: "1200px",
          }}
        >
          <div
            className={`puzzle-container puzzle-container-3d mx-auto rounded-3xl p-4 sm:p-8 border transition-all duration-500 relative overflow-hidden ${X ? "animate-glow-pulse" : ""} ${L ? "animate-shake-error animate-red-glow" : ""}`}
            style={{
              maxWidth: "640px",
              background: "linear-gradient(180deg,rgba(14,22,64,.85),rgba(5,8,27,.7))",
              backdropFilter: "blur(20px)",
              boxShadow: X
                ? "0 0 60px rgba(57,255,20,.4), 0 20px 60px rgba(0,0,0,.5)"
                : L
                  ? "0 0 60px rgba(255,68,68,.5), 0 20px 60px rgba(0,0,0,.5)"
                  : "0 0 40px rgba(0,212,255,.15), 0 20px 60px rgba(0,0,0,.5)",
              borderColor: X ? "rgba(57,255,20,.5)" : L ? "rgba(255,68,68,.5)" : "rgba(255,255,255,.12)",
            }}
          >
            {X && <div className="flash-overlay active" />}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                className="absolute w-2 h-2 rounded-full bg-[#00d4ff] opacity-20 animate-float"
                style={{
                  top: "10%",
                  left: "20%",
                  animationDuration: "4s",
                }}
              />
              <div
                className="absolute w-1.5 h-1.5 rounded-full bg-[#ff00aa] opacity-20 animate-float"
                style={{
                  top: "60%",
                  left: "80%",
                  animationDuration: "5s",
                  animationDelay: "1s",
                }}
              />
              <div
                className="absolute w-2 h-2 rounded-full bg-[#ffd600] opacity-15 animate-float"
                style={{
                  top: "30%",
                  left: "70%",
                  animationDuration: "6s",
                  animationDelay: "2s",
                }}
              />
              <div
                className="absolute w-1 h-1 rounded-full bg-[#39ff14] opacity-20 animate-float"
                style={{
                  top: "80%",
                  left: "40%",
                  animationDuration: "4.5s",
                  animationDelay: "0.5s",
                }}
              />
              <div
                className="absolute w-1.5 h-1.5 rounded-full bg-[#b829dd] opacity-15 animate-float"
                style={{
                  top: "20%",
                  left: "60%",
                  animationDuration: "5.5s",
                  animationDelay: "1.5s",
                }}
              />
            </div>
            <div className="text-center mb-4 sm:mb-6 relative">
              <p className="text-white/40 text-xs font-medium mb-2">Significado / 含义:</p>
              <p
                className="text-xl sm:text-3xl font-black animate-float"
                style={{
                  color: "#ffd600",
                  textShadow: "0 0 20px rgba(255,214,0,.5), 0 0 40px rgba(255,214,0,.2)",
                  animationDuration: "3s",
                }}
              >
                {m?.chino}
              </p>
            </div>
            <div
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6"
              style={{
                perspective: "800px",
              }}
            >
              {m?.espanol.split("").map((t, a) => {
                const r = c[a];
                const l = r !== undefined && a === c.length - 1;
                return (
                  <div
                    key={a}
                    className={`answer-slot relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center font-black text-lg sm:text-xl transition-all duration-300 ${r !== undefined ? "filled" : ""} ${l ? "animate-slot-pop" : ""}`}
                    style={{
                      background:
                        r !== undefined
                          ? "linear-gradient(135deg,rgba(0,212,255,.35),rgba(184,41,221,.35))"
                          : "rgba(255,255,255,.08)",
                      border:
                        r !== undefined ? "2px solid rgba(0,212,255,.6)" : "1px dashed rgba(255,255,255,.2)",
                      color: r !== undefined ? "#00d4ff" : "transparent",
                      boxShadow:
                        r !== undefined
                          ? "0 0 20px rgba(0,212,255,.3), inset 0 0 12px rgba(0,212,255,.1)"
                          : "inset 0 2px 4px rgba(0,0,0,.2)",
                      textShadow: r !== undefined ? "0 0 12px rgba(0,212,255,.6)" : "none",
                    }}
                  >
                    {r !== undefined ? b[r] : "_"}
                    {r !== undefined && (
                      <div
                        className="absolute inset-0 rounded-xl border-2 border-[#00d4ff] opacity-30 animate-ping"
                        style={{
                          animationDuration: "2s",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6"
              style={{
                perspective: "800px",
              }}
            >
              {b.map((t, a) => (
                <button
                  key={a}
                  onClick={(r) => ne(a, r)}
                  disabled={c.includes(a)}
                  className={`puzzle-piece relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl font-black text-lg sm:text-xl transition-all duration-200 disabled:cursor-not-allowed ${c.includes(a) ? "puzzle-piece-selected" : "animate-piece-float-3d"}`}
                  style={{
                    background: c.includes(a)
                      ? "rgba(255,255,255,.04)"
                      : "linear-gradient(145deg,rgba(0,212,255,.25),rgba(184,41,221,.25))",
                    border: c.includes(a)
                      ? "1px solid rgba(255,255,255,.06)"
                      : "2px solid rgba(0,212,255,.5)",
                    color: c.includes(a) ? "rgba(255,255,255,.15)" : "#fff",
                    boxShadow: c.includes(a)
                      ? "none"
                      : "0 6px 20px rgba(0,212,255,.2), 0 0 30px rgba(0,212,255,.1), inset 0 1px 0 rgba(255,255,255,.2)",
                    textShadow: c.includes(a) ? "none" : "0 0 10px rgba(255,255,255,.6)",
                    animationDelay: `${a * 0.1}s`,
                  }}
                >
                  {t}
                  {!c.includes(a) && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                  )}
                </button>
              ))}
            </div>
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={le}
                className="hint-btn group relative px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all hover:scale-105 overflow-hidden"
                style={{
                  background: "rgba(255,214,0,.12)",
                  border: "1px solid rgba(255,214,0,.4)",
                  color: "#ffd600",
                  boxShadow: "0 0 15px rgba(255,214,0,.15)",
                }}
              >
                <span className="relative flex items-center gap-1.5">
                  <SparklesIcon
                    size={14}
                    className="group-hover:animate-spin"
                    style={{
                      animationDuration: "2s",
                    }}
                  />{" "}
                  Pista / 提示
                </span>
              </button>
              <button
                onClick={ie}
                className="group relative px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(255,0,170,.3)] overflow-hidden"
                style={{
                  background: "rgba(255,0,170,.12)",
                  border: "1px solid rgba(255,0,170,.4)",
                  color: "#ff00aa",
                  boxShadow: "0 0 15px rgba(255,0,170,.15)",
                }}
              >
                <span className="relative flex items-center gap-1.5">
                  <CircleCheckIcon size={14} className="group-hover:animate-pulse" /> Terminar / 结束
                </span>
              </button>
            </div>
          </div>
        </div>
        {S && (
          <div
            className="text-center mt-4 sm:mt-5 text-sm sm:text-base font-black animate-bounce-in transition-all"
            style={{
              color: S.includes("Correcto") ? "#39ff14" : "#ff4444",
              textShadow: S.includes("Correcto")
                ? "0 0 15px rgba(57,255,20,.6), 0 0 30px rgba(57,255,20,.3)"
                : "0 0 15px rgba(255,68,68,.6), 0 0 30px rgba(255,68,68,.3)",
            }}
          >
            <span className="inline-flex items-center gap-2">
              {S.includes("Correcto") ? (
                <StarIcon
                  size={18}
                  className="animate-spin-slow"
                  style={{
                    animationDuration: "2s",
                  }}
                />
              ) : (
                <HeartIcon size={18} className="animate-pulse" />
              )}
              {S}
            </span>
          </div>
        )}
        {d === "gameover" && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.9)",
              backdropFilter: "blur(24px)",
              perspective: "1200px",
            }}
          >
            <div
              className="gameover-card text-center p-6 sm:p-8 rounded-3xl max-w-sm mx-4 relative overflow-hidden animate-bounce-in"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.9),rgba(5,8,27,.7))",
                border: "1px solid rgba(0,212,255,.3)",
                boxShadow: "0 0 80px rgba(0,212,255,.2), 0 20px 60px rgba(0,0,0,.6)",
              }}
            >
              <div
                className="absolute -inset-[3px] rounded-[26px] -z-10 opacity-70 border-gradient-animated"
                style={{
                  background: "linear-gradient(135deg,#00d4ff,#ff00aa,#ffd600,#00d4ff)",
                  filter: "blur(30px)",
                  backgroundSize: "200% 200%",
                }}
              />
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                  className="absolute w-3 h-3 rounded-full bg-[#ffd600] opacity-20 animate-float"
                  style={{
                    top: "15%",
                    left: "15%",
                    animationDuration: "3s",
                  }}
                />
                <div
                  className="absolute w-2 h-2 rounded-full bg-[#00d4ff] opacity-20 animate-float"
                  style={{
                    top: "70%",
                    left: "80%",
                    animationDuration: "4s",
                    animationDelay: "1s",
                  }}
                />
                <div
                  className="absolute w-2 h-2 rounded-full bg-[#ff00aa] opacity-15 animate-float"
                  style={{
                    top: "40%",
                    left: "30%",
                    animationDuration: "5s",
                    animationDelay: "2s",
                  }}
                />
              </div>
              <TrophyIcon
                size={56}
                className="mx-auto mb-4 animate-float"
                style={{
                  color: "#ffd600",
                  filter: "drop-shadow(0 0 20px rgba(255,214,0,.6))",
                  animationDuration: "2s",
                }}
              />
              <h2
                className="text-2xl sm:text-3xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg,#00d4ff,#ff00aa,#ffd600)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 10px rgba(0,212,255,.3))",
                }}
              >
                ¡Puzzle Completado!
              </h2>
              <p className="text-white/50 text-sm mb-6">拼图完成！</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div
                  className="stat-card p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(0,212,255,.12)",
                    border: "1px solid rgba(0,212,255,.2)",
                    boxShadow: "0 0 15px rgba(0,212,255,.1)",
                  }}
                >
                  <ZapIcon
                    size={18}
                    className="mx-auto mb-1 animate-pulse"
                    style={{
                      color: "#00d4ff",
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
                      color: "#00d4ff",
                      textShadow: "0 0 10px rgba(0,212,255,.4)",
                    }}
                  >
                    {D}
                  </p>
                </div>
                <div
                  className="stat-card p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(184,41,221,.12)",
                    border: "1px solid rgba(184,41,221,.2)",
                    boxShadow: "0 0 15px rgba(184,41,221,.1)",
                  }}
                >
                  <TrophyIcon
                    size={18}
                    className="mx-auto mb-1 animate-pulse"
                    style={{
                      color: "#b829dd",
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
                      color: "#b829dd",
                      textShadow: "0 0 10px rgba(184,41,221,.4)",
                    }}
                  >
                    {ae}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                <button
                  onClick={() => {
                    playClick();
                    Z(null);
                  }}
                  className="group px-6 sm:px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,212,255,.4)] flex items-center gap-2"
                  style={{
                    background: "linear-gradient(135deg,#00d4ff,#b829dd)",
                    boxShadow: "0 0 25px rgba(0,212,255,.3)",
                  }}
                >
                  <RotateCcwIcon
                    size={16}
                    className="group-hover:-rotate-180 transition-transform duration-500"
                  />{" "}
                  Jugar de nuevo / 再玩一次
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setD("select");
                  }}
                  className="px-4 py-3 rounded-full text-xs font-bold transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,.15)]"
                  style={{
                    background: "rgba(255,255,255,.08)",
                    border: "1px solid rgba(255,255,255,.15)",
                    color: "#fff",
                  }}
                >
                  Cambiar / 切换
                </button>
              </div>
              <P currentGameId="word-puzzle" />
            </div>
          </div>
        )}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          .animate-float { animation: float 3s ease-in-out infinite; }

          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow { animation: spin-slow 4s linear infinite; }

          @keyframes bounce-in {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.05); opacity: 1; }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-bounce-in { animation: bounce-in 0.5s ease-out both; }

          @keyframes glow-pulse {
            0%, 100% { box-shadow: 0 0 20px rgba(57,255,20,0.3); }
            50% { box-shadow: 0 0 40px rgba(57,255,20,0.6), 0 0 80px rgba(57,255,20,0.2); }
          }
          .animate-glow-pulse { animation: glow-pulse 1.5s ease-in-out infinite; }

          @keyframes slot-pop {
            0% { transform: translateY(0) scale(1) translateZ(0); }
            40% { transform: translateY(-8px) scale(1.25) translateZ(20px); }
            100% { transform: translateY(-3px) scale(1.05) translateZ(10px); }
          }
          .animate-slot-pop { animation: slot-pop 0.35s cubic-bezier(.2,.9,.2,1); }

          @keyframes piece-float-3d {
            0%, 100% { transform: translateY(0px) rotateX(-12deg) rotateY(12deg); }
            25% { transform: translateY(-4px) rotateX(-10deg) rotateY(14deg); }
            50% { transform: translateY(-8px) rotateX(-14deg) rotateY(10deg); }
            75% { transform: translateY(-4px) rotateX(-10deg) rotateY(14deg); }
          }
          .animate-piece-float-3d { animation: piece-float-3d 3s ease-in-out infinite; }

          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-8px); }
            40% { transform: translateX(8px); }
            60% { transform: translateX(-4px); }
            80% { transform: translateX(4px); }
          }
          .animate-shake { animation: shake 0.5s ease-in-out; }

          @keyframes shake-error {
            0%, 100% { transform: translateX(0) rotateX(3deg); }
            10% { transform: translateX(-12px) rotateX(3deg); }
            20% { transform: translateX(12px) rotateX(3deg); }
            30% { transform: translateX(-8px) rotateX(3deg); }
            40% { transform: translateX(8px) rotateX(3deg); }
            50% { transform: translateX(-4px) rotateX(3deg); }
            60% { transform: translateX(4px) rotateX(3deg); }
            70% { transform: translateX(-2px) rotateX(3deg); }
            80% { transform: translateX(2px) rotateX(3deg); }
            90% { transform: translateX(0) rotateX(3deg); }
          }
          .animate-shake-error { animation: shake-error 0.6s ease-in-out; }

          @keyframes red-glow-pulse {
            0%, 100% { box-shadow: 0 0 40px rgba(255,68,68,.3), 0 20px 60px rgba(0,0,0,.5); }
            50% { box-shadow: 0 0 80px rgba(255,68,68,.6), 0 20px 60px rgba(0,0,0,.5); }
          }
          .animate-red-glow { animation: red-glow-pulse 0.6s ease-in-out; }

          @keyframes screen-shake {
            0%, 100% { transform: translate(0, 0); }
            10% { transform: translate(-3px, 2px); }
            20% { transform: translate(3px, -2px); }
            30% { transform: translate(-2px, 1px); }
            40% { transform: translate(2px, -1px); }
            50% { transform: translate(0, 0); }
          }
          .animate-screen-shake { animation: screen-shake 0.5s ease-in-out; }

          @keyframes hint-pulse {
            0%, 100% { box-shadow: 0 0 10px rgba(255,214,0,0.2), 0 0 20px rgba(255,214,0,0.1); }
            50% { box-shadow: 0 0 25px rgba(255,214,0,0.5), 0 0 50px rgba(255,214,0,0.2); }
          }
          .hint-btn { animation: hint-pulse 2s ease-in-out infinite; }

          .module-card {
            transform: rotateX(8deg) rotateY(0deg) translateZ(0);
            transform-style: preserve-3d;
            transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease;
          }
          .module-card:hover {
            transform: rotateX(0deg) rotateY(-5deg) translateZ(20px) scale(1.03);
            box-shadow: 0 0 40px rgba(0,212,255,.3), 0 20px 40px rgba(0,0,0,.4) !important;
          }

          .puzzle-piece {
            transform-style: preserve-3d;
            transition: box-shadow 0.25s ease, background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
          }
          .puzzle-piece:hover:not(:disabled) {
            transform: rotateX(-20deg) rotateY(20deg) translateZ(25px) translateY(-5px) !important;
            box-shadow: 0 8px 30px rgba(0,212,255,.4), 0 0 40px rgba(0,212,255,.2), inset 0 1px 0 rgba(255,255,255,.3) !important;
            background: linear-gradient(145deg,rgba(0,212,255,.4),rgba(184,41,221,.4)) !important;
            border-color: rgba(0,212,255,.8) !important;
            color: #fff !important;
          }
          .puzzle-piece:active:not(:disabled) {
            transform: rotateX(-5deg) rotateY(5deg) translateZ(-5px) scale(0.95) !important;
          }
          .puzzle-piece-selected {
            transform: translateY(0) scale(0.95);
          }

          .answer-slot {
            transform-style: preserve-3d;
            transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          }
          .answer-slot.filled {
            transform: translateY(-3px) scale(1.05) translateZ(10px);
          }

          .score-pill {
            transform: perspective(600px) rotateX(-12deg) translateZ(5px);
            transform-style: preserve-3d;
            transition: transform 0.3s ease;
          }
          .score-pill:hover {
            transform: perspective(600px) rotateX(-8deg) translateZ(15px) scale(1.05);
          }

          .puzzle-container-3d {
            transform: rotateX(3deg);
            transform-style: preserve-3d;
            transition: transform 0.5s ease, box-shadow 0.5s ease;
          }

          .gameover-card {
            transform: rotateX(8deg) rotateY(0deg);
            transform-style: preserve-3d;
            transition: transform 0.5s ease;
          }
          .gameover-card:hover {
            transform: rotateX(4deg) rotateY(-2deg) translateZ(10px);
          }

          .stat-card {
            transform: perspective(600px) rotateX(5deg);
            transform-style: preserve-3d;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .stat-card:hover {
            transform: perspective(600px) rotateX(0deg) translateZ(15px);
            box-shadow: 0 0 25px rgba(0,212,255,.2) !important;
          }

          @keyframes border-rotate {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .border-gradient-animated {
            background-size: 200% 200%;
            animation: border-rotate 3s ease infinite;
          }

          @keyframes flash-correct {
            0% { opacity: 0; }
            20% { opacity: 0.4; }
            100% { opacity: 0; }
          }
          .flash-overlay {
            position: absolute;
            inset: 0;
            background: rgba(57, 255, 20, 0.15);
            pointer-events: none;
            z-index: 10;
            border-radius: 24px;
            opacity: 0;
          }
          .flash-overlay.active {
            animation: flash-correct 0.5s ease-out;
          }
        `}</style>
      </div>
    </StarfieldBackground>
  );
}
export { XeComponent as default };
