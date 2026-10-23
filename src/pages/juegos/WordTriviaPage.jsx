import {
  LightbulbIcon,
  SparklesIcon,
  BookOpenIcon,
  StarIcon,
  ZapIcon,
  TrophyIcon,
  AwardIcon,
  ArrowLeftIcon,
  LayersIcon,
  RotateCcwIcon,
  TargetIcon,
  FlameIcon,
  CrownIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g, b as b_1, c } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
function L(o) {
  const i = [...o];
  for (let x = i.length - 1; x > 0; x--) {
    const c = Math.floor(Math.random() * (x + 1));
    [i[x], i[c]] = [i[c], i[x]];
  }
  return i;
}
function le(o = 80) {
  const i = ["#ff3860", "#2080ff", "#39ff14", "#ffd600", "#ff00aa", "#00d4ff", "#ff6b35", "#a855f7"];
  for (let x = 0; x < o; x++) {
    const c = document.createElement("div");
    const f = 6 + Math.random() * 8;
    const m = Math.random() > 0.5;
    c.style.cssText = `position:fixed;left:50%;top:50%;width:${f}px;height:${f}px;border-radius:${m ? "2px" : "50%"};background:${i[x % i.length]};pointer-events:none;z-index:9999;transform:rotate(${Math.random() * 360}deg);`;
    document.body.appendChild(c);
    const y = (Math.PI * 2 * x) / o;
    const a = 5 + Math.random() * 18;
    let v = window.innerWidth / 2;
    let p = window.innerHeight / 2;
    let j = 1;
    let u = Math.random() * 360;
    const Z = Math.cos(y) * a;
    const z = Math.sin(y) * a;
    const C = () => {
      v += Z;
      p += z + 2;
      j -= 0.012;
      u += 8;
      c.style.left = `${v}px`;
      c.style.top = `${p}px`;
      c.style.opacity = String(j);
      c.style.transform = `rotate(${u}deg)`;
      if (j > 0) {
        requestAnimationFrame(C);
      } else {
        c.remove();
      }
    };
    requestAnimationFrame(C);
  }
}
function MeComponent({ expression }) {
  const i = expression === "sad" ? 3 : expression === "excited" ? -2 : 0;
  const d =
    expression === "happy"
      ? "M 12 22 Q 20 28 28 22"
      : expression === "excited"
        ? "M 12 22 Q 20 32 28 22"
        : expression === "sad"
          ? "M 12 26 Q 20 20 28 26"
          : "M 16 24 Q 20 26 24 24";
  const c =
    expression === "happy" || expression === "excited" ? (
      <>
        <circle cx="8" cy="24" r="4" fill="rgba(255,100,100,0.4)" />
        <circle cx="32" cy="24" r="4" fill="rgba(255,100,100,0.4)" />
      </>
    ) : null;
  const f =
    expression === "excited" ? (
      <>
        <polygon
          points="0,8 2,12 6,12 3,15 4,19 0,17 -4,19 -3,15 -6,12 -2,12"
          fill="#ffd600"
          style={{
            animation: "kawaiiStar1 1.2s ease-in-out infinite",
          }}
        />
        <polygon
          points="40,4 42,8 46,8 43,11 44,15 40,13 36,15 37,11 34,8 38,8"
          fill="#ffd600"
          style={{
            animation: "kawaiiStar2 1.4s ease-in-out infinite",
          }}
        />
      </>
    ) : null;
  const m =
    expression === "sad" ? (
      <circle
        cx="28"
        cy="22"
        r="2.5"
        fill="#00d4ff"
        style={{
          animation: "kawaiiTear 1.2s ease-in-out infinite",
        }}
      />
    ) : null;
  return (
    <svg width="80" height="80" viewBox="0 0 40 40" fill="none" className="kawaii-mascot">
      {f}
      <ellipse cx="20" cy="20" rx="18" ry="16" fill="#0f172a" stroke="url(#mascotGrad)" strokeWidth="1.5" />
      <defs>
        <linearGradient id="mascotGrad" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#ff00aa" />
          <stop offset="50%" stopColor="#2080ff" />
          <stop offset="100%" stopColor="#39ff14" />
        </linearGradient>
      </defs>
      <circle cx="12" cy={18 + i} r="2.5" fill="#fff" />
      <circle cx="28" cy={18 + i} r="2.5" fill="#fff" />
      <circle cx="12" cy={18 + i} r="1" fill="#000" />
      <circle cx="28" cy={18 + i} r="1" fill="#000" />
      <path d={d} stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
      {c}
      {m}
    </svg>
  );
}
function YeComponent({ timeLeft, maxTime }) {
  const c = 2 * Math.PI * 16;
  const f = Math.max(0, timeLeft) / maxTime;
  const m = c * (1 - f);
  const y = timeLeft <= 3;
  const a = y ? "#ff3860" : timeLeft <= 5 ? "#ffd600" : "#00d4ff";
  const v = y ? "rgba(255,56,96,.5)" : "rgba(0,212,255,.4)";
  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold transition-all"
      style={{
        background: "rgba(0,0,0,.25)",
        border: `2px solid ${a}40`,
        boxShadow: `0 0 20px ${a}30, inset 0 0 15px ${a}10, 0 4px 15px rgba(0,0,0,.3)`,
        transform: "translateZ(15px)",
        animation: y ? "timerGaugePulse 0.5s ease-in-out infinite" : "none",
      }}
    >
      <div
        className="relative"
        style={{
          width: 36,
          height: 36,
          filter: `drop-shadow(0 0 8px ${v})`,
        }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          style={{
            transform: "rotate(-90deg)",
          }}
        >
          <circle cx="18" cy="18" r={16} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
          <circle
            cx="18"
            cy="18"
            r={16}
            fill="none"
            stroke={a}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={String(c)}
            strokeDashoffset={String(m)}
            style={{
              filter: `drop-shadow(0 0 6px ${a})`,
              transition: "stroke-dashoffset 1s linear",
            }}
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center text-[10px] font-black"
          style={{
            color: a,
            textShadow: `0 0 10px ${a}`,
          }}
        >
          {timeLeft}
        </span>
      </div>
      <span
        style={{
          color: a,
          textShadow: `0 0 8px ${a}`,
        }}
      >
        s
      </span>
    </div>
  );
}
const Te = [
  {
    bg: "#ff3860",
    glow: "rgba(255,56,96,.5)",
    label: "A",
  },
  {
    bg: "#2080ff",
    glow: "rgba(32,128,255,.5)",
    label: "B",
  },
  {
    bg: "#39ff14",
    glow: "rgba(57,255,20,.5)",
    label: "C",
  },
  {
    bg: "#ffd600",
    glow: "rgba(255,214,0,.5)",
    label: "D",
  },
];
const Fe = 10;
const maxTime = 10;
function EeComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [m, setM] = React.useState("select");
  const [a, setA] = React.useState([]);
  const [p, setP] = React.useState(0);
  const [u, setU] = React.useState(maxTime);
  const [z, setZ] = React.useState(0);
  const [T, setT] = React.useState(0);
  const [ie, setIe] = React.useState(0);
  const [F, setF] = React.useState(null);
  const [b, setB] = React.useState(false);
  const [k, setK] = React.useState(0);
  const [q, setQ] = React.useState(0);
  const [N, setN] = React.useState(null);
  const MRef = React.useRef(null);
  const ce = g();
  const [V, setV] = React.useState("");
  const [de, setDe] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("wordtrivia_best") || "0");
    } catch {
      return 0;
    }
  });
  const [fe, setFe] = React.useState([]);
  const peRef = React.useRef(0);
  const expression = React.useMemo(() => {
    if (m === "results") {
      if (k >= a.length / 2) {
        return "excited";
      }
      return "sad";
    }
    if (b) {
      if (F !== null && a[p] && a[p].options[F] === a[p].correct) {
        return "happy";
      }
      return "sad";
    }
    return "neutral";
  }, [m, b, F, p, a, k]);
  const ge = React.useCallback((x, y) => {
    const w = ["#ff3860", "#2080ff", "#39ff14", "#ffd600", "#ff00aa", "#00d4ff", "#a855f7"];
    const h = Array.from(
      {
        length: 12,
      },
      (d, s) => ({
        id: peRef.current++,
        x,
        y,
        color: w[s % w.length],
        delay: s * 0.05,
      }),
    );
    setFe((d) => [...d.slice(-30), ...h]);
    setTimeout(() => setFe((d) => d.filter((s) => !h.find((r) => r.id === s.id))), 1500);
  }, []);
  const I = React.useCallback((t) => {
    playClick();
    let n = t ? b_1(t) : c();
    if (n.length === 0) {
      setV(
        'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
      );
      return;
    }
    const w = n.filter((s) => s.espanol && s.chino);
    if (w.length < 4) {
      setV("No hay suficientes palabras en este módulo para generar preguntas.");
      return;
    }
    const h = [];
    const d = L(w).slice(0, Fe);
    for (let s = 0; s < d.length; s++) {
      const r = d[s];
      const mode = s % 2 === 0 ? "es-to-zh" : "zh-to-es";
      const correct = mode === "es-to-zh" ? r.chino : r.espanol;
      const he = L(w.filter((X) => X.espanol !== r.espanol))
        .slice(0, 6)
        .map((X) => {
          if (mode === "es-to-zh") {
            return X.chino;
          }
          return X.espanol;
        });
      const options = L([correct, ...he.slice(0, 3)]);
      h.push({
        word: mode === "es-to-zh" ? r.espanol : r.chino,
        correct,
        options,
        mode,
      });
    }
    setA(h);
    setP(0);
    setZ(0);
    setT(0);
    setIe(0);
    setK(0);
    setQ(0);
    setF(null);
    setB(false);
    setU(maxTime);
    setM("playing");
  }, []);
  React.useEffect(() => {
    if (m === "playing" && !b && u > 0) {
      MRef.current = setInterval(() => setU((t) => t - 1), 1000);
      return () => {
        if (MRef.current) {
          clearInterval(MRef.current);
        }
      };
    }
    if (m === "playing" && !b && u <= 0) {
      K(-1);
    }
  }, [m, b, u]);
  const K = (t) => {
    if (b || !a[p]) {
      return;
    }
    setB(true);
    setF(t);
    if (MRef.current) {
      clearInterval(MRef.current);
    }
    const n = a[p];
    if (t >= 0 && n.options[t] === n.correct) {
      playCorrect();
      const h = Math.max(0, u) * 10;
      const d = Math.min(T + 1, 5) * 20;
      const s = 100 + h + d;
      setZ((r) => r + s);
      setT((r) => {
        const g = r + 1;
        setIe((B) => Math.max(B, g));
        return g;
      });
      setK((r) => r + 1);
      setN({
        show: true,
        text: `+${s}`,
        color: "#39ff14",
      });
      le(40);
      ge(window.innerWidth / 2, window.innerHeight / 2);
    } else {
      playWrong();
      setT(0);
      setQ((h) => h + 1);
      setN({
        show: true,
        text: t < 0 ? "¡Tiempo!" : "¡Incorrecto!",
        color: "#ff3860",
      });
    }
    setTimeout(() => setN(null), 1000);
  };
  const onClick = () => {
    playClick();
    setN(null);
    if (p < a.length - 1) {
      setP((t) => t + 1);
      setF(null);
      setB(false);
      setU(maxTime);
    } else {
      if (k >= a.length / 2) {
        playWin();
      } else {
        playLose();
      }
      setM("results");
      setDe((t) => {
        const n = Math.max(t, z);
        localStorage.setItem("wordtrivia_best", String(n));
        return n;
      });
      le(120);
    }
  };
  const S = a[p];
  const be = k + q > 0 ? Math.round((k / (k + q)) * 100) : 0;
  if (m === "select") {
    return (
      <StarfieldBackground>
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
          <div className="text-center mb-10 relative">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-20"
              style={{
                background: "radial-gradient(circle, rgba(255,0,170,0.3) 0%, transparent 70%)",
                filter: "blur(40px)",
                animation: "heroGlow3D 4s ease-in-out infinite",
              }}
            />
            <h1
              className="text-4xl md:text-6xl font-black mb-3 relative"
              style={{
                textShadow: "0 0 40px rgba(0,212,255,0.3), 0 0 80px rgba(255,0,170,0.2)",
                animation: "titleFloat 3s ease-in-out infinite",
              }}
            >
              <span
                className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl mr-3 align-middle"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #2080ff)",
                  boxShadow: "0 0 30px rgba(255,0,170,0.4)",
                  animation: "iconPulse 2s ease-in-out infinite",
                }}
              >
                <LightbulbIcon size={28} className="text-white" />
              </span>
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #ff3860, #2080ff, #39ff14, #ffd600)",
                }}
              >
                Word Trivia
              </span>
            </h1>
            <p className="text-white/40 text-sm md:text-base font-medium">
              Selecciona un módulo para jugar / 选择模块开始游戏
            </p>
            {V && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold"
                style={{
                  background: "rgba(255,68,68,.12)",
                  border: "1px solid rgba(255,68,68,.3)",
                  color: "#ff6b35",
                  animation: "errorPulse 2s ease-in-out infinite",
                }}
              >
                {V}
              </div>
            )}
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            style={{
              perspective: "1200px",
            }}
          >
            <button
              onClick={() => {
                playClick();
                setV("");
                I(null);
              }}
              className="group rounded-2xl p-6 text-left transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(14,22,64,.7), rgba(5,8,27,.55))",
                border: "1px solid rgba(255,0,170,.4)",
                boxShadow: "0 0 30px rgba(255,0,170,.15), 0 10px 40px rgba(0,0,0,.3)",
                transformStyle: "preserve-3d",
                transform: "translateZ(20px)",
                animation: "selectCardFloat 5s ease-in-out 0s infinite",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[18px] -z-10 opacity-0 group-hover:opacity-80 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #2080ff, #39ff14)",
                  filter: "blur(20px)",
                }}
              />
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-6"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                  boxShadow: "0 0 25px rgba(255,0,170,.4)",
                  transform: "translateZ(30px)",
                }}
              >
                <LayersIcon size={28} className="text-white" />
              </div>
              <h3
                className="text-white font-black text-lg mb-1 group-hover:text-[#ff00aa] transition-colors"
                style={{
                  transform: "translateZ(25px)",
                }}
              >
                Todos los módulos
              </h3>
              <p
                className="text-xs font-medium mb-1"
                style={{
                  color: "rgba(255,0,170,.7)",
                  transform: "translateZ(25px)",
                }}
              >
                所有模块
              </p>
              <p
                className="text-xs font-medium text-white/40"
                style={{
                  transform: "translateZ(25px)",
                }}
              >
                Mezcla todo el vocabulario
              </p>
              <SparklesIcon
                size={16}
                className="absolute top-4 right-4 text-white/20 group-hover:text-[#ffd600] group-hover:scale-125 transition-all duration-300"
              />
            </button>
            {ce.map((t, n) => (
              <button
                key={t.id}
                onClick={() => {
                  playClick();
                  setV("");
                  I(t.id);
                }}
                className="group rounded-2xl p-6 text-left transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(14,22,64,.7), rgba(5,8,27,.55))",
                  border: `1px solid ${t.color}50`,
                  boxShadow: `0 0 30px ${t.color}15, 0 10px 40px rgba(0,0,0,.3)`,
                  transformStyle: "preserve-3d",
                  transform: "translateZ(20px)",
                  animation: `selectCardFloat 5s ease-in-out ${String(n * 0.1)}s infinite`,
                }}
              >
                <div
                  className="absolute -inset-[2px] rounded-[18px] -z-10 opacity-0 group-hover:opacity-80 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
                    filter: "blur(20px)",
                  }}
                />
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-6"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
                    boxShadow: `0 0 25px ${t.color}40`,
                    transform: "translateZ(30px)",
                  }}
                >
                  <BookOpenIcon size={28} className="text-white" />
                </div>
                <h3
                  className="text-white font-black text-lg mb-1 group-hover:text-white transition-colors"
                  style={{
                    textShadow: `0 0 15px ${t.color}60`,
                    transform: "translateZ(25px)",
                  }}
                >
                  {t.titulo}
                </h3>
                <p
                  className="text-xs font-medium mb-1"
                  style={{
                    color: `${t.color}aa`,
                    transform: "translateZ(25px)",
                  }}
                >
                  {t.tituloChino}
                </p>
                <p
                  className="text-xs font-medium text-white/40"
                  style={{
                    transform: "translateZ(25px)",
                  }}
                >
                  {t.vocabularioCount} palabras / 词
                </p>
                <StarIcon
                  size={16}
                  className="absolute top-4 right-4 text-white/20 group-hover:text-[#ffd600] group-hover:scale-125 transition-all duration-300"
                />
              </button>
            ))}
          </div>
        </div>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          animation: "triviaGridMove 20s linear infinite",
        }}
      />
      <div
        className="fixed bottom-4 right-4 z-50 pointer-events-none"
        style={{
          animation: "mascotFloat 3s ease-in-out infinite",
          filter: "drop-shadow(0 0 15px rgba(255,0,170,0.4))",
        }}
      >
        <MeComponent expression={expression} />
      </div>
      {fe.map((t) => (
        <div
          key={t.id}
          className="fixed pointer-events-none z-40 rounded-full"
          style={{
            left: t.x,
            top: t.y,
            width: 8,
            height: 8,
            background: t.color,
            animation: "particleBurst 1.2s ease-out forwards",
            animationDelay: `${String(t.delay)}s`,
          }}
        />
      ))}
      <div className="max-w-3xl mx-auto px-4 py-6 min-h-screen relative z-10">
        <div
          className="flex items-center justify-between mb-6 flex-wrap gap-2"
          style={{
            perspective: "800px",
          }}
        >
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold group"
            style={{
              transform: "translateZ(10px)",
            }}
          >
            <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver /
            返回
          </Link>
          <div
            className="flex items-center gap-2 flex-wrap justify-end"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <div
              style={{
                transform: "translateZ(15px)",
              }}
            >
              <SoundToggles />
            </div>
            <button
              onClick={() => {
                playClick();
                setM("select");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 hover:shadow-lg"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "#fff",
                boxShadow: "0 0 10px rgba(255,255,255,.05), 0 4px 15px rgba(0,0,0,.2)",
                transform: "translateZ(15px)",
              }}
            >
              <RotateCcwIcon size={12} /> Cambiar / 切换
            </button>
            <div
              style={{
                transform: "translateZ(20px)",
              }}
            >
              <YeComponent timeLeft={u} maxTime={maxTime} />
            </div>
            <div
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(32,128,255,.12)",
                border: "1px solid rgba(32,128,255,.25)",
                color: "#2080ff",
                boxShadow: "0 0 15px rgba(32,128,255,.2), 0 4px 15px rgba(0,0,0,.2)",
                transform: "translateZ(15px)",
                animation: "scoreFloat3D 3s ease-in-out infinite",
              }}
            >
              <ZapIcon size={14} className="animate-pulse" /> {z}
            </div>
            <div
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(57,255,20,.12)",
                border: "1px solid rgba(57,255,20,.25)",
                color: "#39ff14",
                boxShadow: "0 0 15px rgba(57,255,20,.2), 0 4px 15px rgba(0,0,0,.2)",
                transform: "translateZ(15px)",
              }}
            >
              <TargetIcon size={14} /> {p + 1}/{a.length}
            </div>
            {T > 1 && (
              <div
                key={T}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{
                  background: "rgba(255,214,0,.15)",
                  border: "1px solid rgba(255,214,0,.3)",
                  color: "#ffd600",
                  boxShadow: "0 0 20px rgba(255,214,0,.3), 0 4px 15px rgba(0,0,0,.2)",
                  transform: "translateZ(25px)",
                  animation: "comboBadge3D 0.6s ease-out",
                }}
              >
                <FlameIcon size={12} /> x{T}
              </div>
            )}
          </div>
        </div>
        <div className="text-center mb-6 relative">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full opacity-15"
            style={{
              background: "radial-gradient(circle, rgba(255,0,170,0.3) 0%, transparent 70%)",
              filter: "blur(40px)",
              animation: "heroGlow3D 3s ease-in-out infinite",
            }}
          />
          <h1
            className="text-3xl md:text-5xl font-black mb-2 relative"
            style={{
              background: "linear-gradient(135deg,#ff3860,#2080ff,#39ff14,#ffd600)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 20px rgba(255,56,96,.3))",
              animation: "titleFloat 3s ease-in-out infinite",
            }}
          >
            <LightbulbIcon
              size={32}
              className="inline mr-2 text-[#ffd600]"
              style={{
                filter: "drop-shadow(0 0 10px rgba(255,214,0,.5))",
                animation: "lightbulbGlowPulse 2s ease-in-out infinite",
              }}
            />
            Word Trivia
          </h1>
          <p className="text-white/40 text-sm font-medium">Elige la traducción correcta / 选择正确翻译</p>
        </div>
        <div
          className="max-w-md mx-auto h-3 rounded-full overflow-hidden mb-6 relative"
          style={{
            background: "rgba(255,255,255,.05)",
            boxShadow: "0 0 15px rgba(255,255,255,.08), 0 4px 15px rgba(0,0,0,.2)",
            transform: "translateZ(10px)",
          }}
        >
          <div
            className="h-full rounded-full transition-all duration-1000 relative"
            style={{
              width: `${String((u / maxTime) * 100)}%`,
              background:
                u <= 3 ? "linear-gradient(90deg,#ff3860,#ff6b35)" : "linear-gradient(90deg,#2080ff,#39ff14)",
              boxShadow: u <= 3 ? "0 0 25px rgba(255,56,96,.8)" : "0 0 25px rgba(32,128,255,.6)",
              animation:
                u <= 3 ? "timerPulse 0.5s ease-in-out infinite" : "progressPulse 2s ease-in-out infinite",
            }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                animation: "shimmer 1.5s ease-in-out infinite",
              }}
            />
          </div>
        </div>
        {S && (
          <div
            className="mb-6 relative"
            style={{
              perspective: "1000px",
            }}
          >
            <div
              key={p}
              className="rounded-3xl p-6 md:p-8 relative overflow-hidden transition-all"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.7),rgba(5,8,27,.55))",
                border: "1px solid rgba(255,255,255,.15)",
                backdropFilter: "blur(14px)",
                boxShadow: "0 0 50px rgba(255,56,96,.12), 0 20px 60px rgba(0,0,0,.3)",
                transform: "rotateX(3deg) translateZ(30px)",
                transformStyle: "preserve-3d",
                animation: "cardAppear3D 0.6s ease-out",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-50"
                style={{
                  background: "linear-gradient(135deg,#ff3860,#2080ff,#39ff14,#ffd600)",
                  filter: "blur(20px)",
                  animation: "neonBorderRotate 6s linear infinite",
                }}
              />
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <BookOpenIcon
                  size={48}
                  className="text-white"
                  style={{
                    animation: "iconFloat 4s ease-in-out infinite",
                    filter: "drop-shadow(0 0 10px rgba(255,255,255,.3))",
                  }}
                />
              </div>
              <p
                className="text-xs font-bold uppercase tracking-wider mb-4 text-center"
                style={{
                  color: "rgba(207,216,255,.5)",
                }}
              >
                <LightbulbIcon
                  size={14}
                  className="inline mr-1 text-[#ffd600]"
                  style={{
                    animation: "lightbulbGlowPulse 2s ease-in-out infinite",
                  }}
                />{" "}
                {S.mode === "es-to-zh"
                  ? "¿Qué palabra significa esto en chino?"
                  : "¿Cuál es la traducción al español?"}
              </p>
              <h2
                className="text-2xl md:text-4xl font-black text-center mb-2"
                style={{
                  color: "#fff",
                  textShadow:
                    "0 0 30px rgba(255,255,255,.2), 0 0 60px rgba(0,212,255,.15), 0 0 90px rgba(255,0,170,.1)",
                  animation: "questionWordPulse 2s ease-in-out infinite",
                }}
              >
                {S.word}
              </h2>
              <p
                className="text-center text-xs font-medium mb-6"
                style={{
                  color: "rgba(207,216,255,.4)",
                }}
              >
                {S.mode === "es-to-zh" ? "中文翻译" : "Traducción española"}
              </p>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                style={{
                  perspective: "600px",
                }}
              >
                {S.options.map((t, n) => {
                  const w = F === n;
                  const h = t === S.correct;
                  const d = b && h;
                  const s = b && w && !h;
                  const r = Te[n];
                  return (
                    <button
                      key={n}
                      onClick={() => !b && K(n)}
                      disabled={b}
                      className="relative rounded-2xl p-5 text-center font-black text-sm transition-all duration-300 disabled:pointer-events-none group overflow-hidden"
                      style={{
                        background: d
                          ? "linear-gradient(135deg, rgba(57,255,20,.2), rgba(57,255,20,.05))"
                          : s
                            ? "linear-gradient(135deg, rgba(255,56,96,.2), rgba(255,56,96,.05))"
                            : `linear-gradient(135deg,${r.bg}22,${r.bg}08)`,
                        border: d
                          ? "2px solid rgba(57,255,20,.6)"
                          : s
                            ? "2px solid rgba(255,56,96,.6)"
                            : `1.5px solid ${r.bg}60`,
                        color: d ? "#39ff14" : s ? "#ff3860" : "#fff",
                        boxShadow: d
                          ? "0 0 40px rgba(57,255,20,.5), inset 0 0 20px rgba(57,255,20,.1)"
                          : s
                            ? "0 0 40px rgba(255,56,96,.5), inset 0 0 20px rgba(255,56,96,.1)"
                            : `0 0 20px ${r.glow}, inset 0 0 15px ${r.glow}10`,
                        transform: "scale(1) translateZ(0)",
                        transformStyle: "preserve-3d",
                        animation: d
                          ? "correctBurst3D 0.8s ease"
                          : s
                            ? "wrongShake3D 0.7s ease"
                            : "optionAppear3D 0.5s ease-out",
                        animationDelay: `${String(n * 0.1)}s`,
                        transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease",
                      }}
                      onMouseEnter={(g) => {
                        if (!b) {
                          g.currentTarget.style.transform =
                            "scale(1.04) translateY(-5px) translateZ(40px) rotateX(-2deg)";
                          g.currentTarget.style.boxShadow = `0 0 30px ${r.glow}, 0 15px 40px rgba(0,0,0,.4), inset 0 0 25px ${r.glow}20`;
                        }
                      }}
                      onMouseLeave={(g) => {
                        g.currentTarget.style.transform = "scale(1) translateY(0) translateZ(0) rotateX(0)";
                        g.currentTarget.style.boxShadow = d
                          ? "0 0 40px rgba(57,255,20,.5), inset 0 0 20px rgba(57,255,20,.1)"
                          : s
                            ? "0 0 40px rgba(255,56,96,.5), inset 0 0 20px rgba(255,56,96,.1)"
                            : `0 0 20px ${r.glow}, inset 0 0 15px ${r.glow}10`;
                      }}
                    >
                      <span
                        className="absolute top-2 left-3 text-[10px] font-black opacity-50 group-hover:opacity-80 transition-opacity"
                        style={{
                          transform: "translateZ(10px)",
                        }}
                      >
                        {r.label}
                      </span>
                      <span
                        className="block relative z-10"
                        style={{
                          transform: "translateZ(15px)",
                        }}
                      >
                        {t}
                      </span>
                      {d && (
                        <SparklesIcon
                          size={16}
                          className="absolute top-2 right-3 text-[#39ff14] animate-pulse"
                          style={{
                            transform: "translateZ(20px)",
                          }}
                        />
                      )}
                      {s && (
                        <span
                          className="absolute top-2 right-3 text-[#ff3860] text-xs font-black"
                          style={{
                            transform: "translateZ(20px)",
                          }}
                        >
                          ✕
                        </span>
                      )}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background: `linear-gradient(135deg, ${r.bg}10, transparent)`,
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
            {N && (
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none font-black text-4xl md:text-5xl z-20"
                style={{
                  color: N.color,
                  textShadow: `0 0 40px ${N.color}, 0 0 80px ${N.color}50, 0 0 120px ${N.color}30`,
                  animation: "floatScoreQuiz 1.2s ease-out forwards",
                }}
              >
                {N.text}
              </div>
            )}
          </div>
        )}
        {b && (
          <div
            className="text-center"
            style={{
              animation: "nextBtnAppear3D 0.4s ease-out",
              perspective: "600px",
            }}
          >
            <button
              onClick={onClick}
              className="px-10 py-4 rounded-full text-white font-black text-lg transition-all hover:scale-105 relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg,#2080ff,#39ff14)",
                boxShadow: "0 0 40px rgba(32,128,255,.4), 0 10px 30px rgba(0,0,0,.3)",
                transform: "translateZ(25px)",
                transformStyle: "preserve-3d",
              }}
            >
              <span
                className="relative z-10 flex items-center gap-2"
                style={{
                  transform: "translateZ(10px)",
                }}
              >
                {p < a.length - 1 ? (
                  <>
                    <ArrowLeftIcon size={18} className="rotate-180" /> Siguiente / 下一个
                  </>
                ) : (
                  <>
                    <TrophyIcon size={18} /> Ver resultados / 查看结果
                  </>
                )}
              </span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  animation: "shimmer 1.5s ease-in-out infinite",
                }}
              />
            </button>
          </div>
        )}
        {m === "results" && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.9)",
              backdropFilter: "blur(25px)",
              perspective: "1000px",
            }}
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({
                length: 20,
              }).map((t, n) => (
                <div
                  key={n}
                  className="absolute rounded-full opacity-30"
                  style={{
                    width: `${String(3 + Math.random() * 5)}px`,
                    height: `${String(3 + Math.random() * 5)}px`,
                    left: `${String(Math.random() * 100)}%`,
                    top: `${String(Math.random() * 100)}%`,
                    background: ["#ff3860", "#2080ff", "#39ff14", "#ffd600", "#ff00aa", "#00d4ff"][n % 6],
                    animation: `floatingParticle ${String(5 + Math.random() * 10)}s linear infinite`,
                    animationDelay: `${String(Math.random() * 5)}s`,
                  }}
                />
              ))}
            </div>
            <div
              className="text-center p-6 md:p-8 rounded-3xl max-w-sm mx-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.85),rgba(5,8,27,.65))",
                border: "1px solid rgba(255,214,0,.25)",
                boxShadow: "0 0 80px rgba(255,56,96,.15), 0 20px 60px rgba(0,0,0,.4)",
                transform: "rotateX(8deg) translateZ(0)",
                transformStyle: "preserve-3d",
                animation: "resultsCardFloat 4s ease-in-out infinite",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-60"
                style={{
                  background: "linear-gradient(135deg,#ff3860,#2080ff,#39ff14,#ffd600)",
                  filter: "blur(25px)",
                  animation: "neonBorderRotate 8s linear infinite",
                }}
              />
              <div className="mb-4 relative">
                <TrophyIcon
                  size={64}
                  className="mx-auto"
                  style={{
                    color: "#ffd600",
                    filter: "drop-shadow(0 0 20px rgba(255,214,0,.6))",
                    animation: "trophyBounce 1.5s ease-in-out infinite",
                  }}
                />
                <CrownIcon
                  size={24}
                  className="absolute -top-1 left-1/2 -translate-x-1/2"
                  style={{
                    color: "#ff00aa",
                    filter: "drop-shadow(0 0 10px rgba(255,0,170,.5))",
                    animation: "crownFloat 2s ease-in-out infinite",
                  }}
                />
              </div>
              <h2
                className="text-3xl md:text-4xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg,#ff3860,#2080ff,#39ff14)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 15px rgba(255,56,96,.3))",
                }}
              >
                ¡Resultados!
              </h2>
              <p className="text-white/50 text-sm mb-6">结果</p>
              <div
                className="grid grid-cols-2 gap-3 mb-6"
                style={{
                  perspective: "800px",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="p-4 rounded-2xl transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, rgba(32,128,255,.12), rgba(32,128,255,.05))",
                    border: "1px solid rgba(32,128,255,.2)",
                    boxShadow: "0 0 20px rgba(32,128,255,.1)",
                    transform: "translateZ(15px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <ZapIcon
                    size={20}
                    className="mx-auto mb-1"
                    style={{
                      color: "#2080ff",
                      filter: "drop-shadow(0 0 8px rgba(32,128,255,.5))",
                    }}
                  />
                  <p
                    className="text-xs font-medium"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Score
                  </p>
                  <p
                    className="text-xl font-black"
                    style={{
                      color: "#2080ff",
                      textShadow: "0 0 15px rgba(32,128,255,.4)",
                    }}
                  >
                    {z}
                  </p>
                </div>
                <div
                  className="p-4 rounded-2xl transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, rgba(57,255,20,.12), rgba(57,255,20,.05))",
                    border: "1px solid rgba(57,255,20,.2)",
                    boxShadow: "0 0 20px rgba(57,255,20,.1)",
                    transform: "translateZ(15px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <TargetIcon
                    size={20}
                    className="mx-auto mb-1"
                    style={{
                      color: "#39ff14",
                      filter: "drop-shadow(0 0 8px rgba(57,255,20,.5))",
                    }}
                  />
                  <p
                    className="text-xs font-medium"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Precisión
                  </p>
                  <p
                    className="text-xl font-black"
                    style={{
                      color: "#39ff14",
                      textShadow: "0 0 15px rgba(57,255,20,.4)",
                    }}
                  >
                    {be}%
                  </p>
                </div>
                <div
                  className="p-4 rounded-2xl transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,0,170,.12), rgba(255,0,170,.05))",
                    border: "1px solid rgba(255,0,170,.2)",
                    boxShadow: "0 0 20px rgba(255,0,170,.1)",
                    transform: "translateZ(15px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <FlameIcon
                    size={20}
                    className="mx-auto mb-1"
                    style={{
                      color: "#ff00aa",
                      filter: "drop-shadow(0 0 8px rgba(255,0,170,.5))",
                    }}
                  />
                  <p
                    className="text-xs font-medium"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Mejor racha
                  </p>
                  <p
                    className="text-xl font-black"
                    style={{
                      color: "#ff00aa",
                      textShadow: "0 0 15px rgba(255,0,170,.4)",
                    }}
                  >
                    {ie}
                  </p>
                </div>
                <div
                  className="p-4 rounded-2xl transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,214,0,.12), rgba(255,214,0,.05))",
                    border: "1px solid rgba(255,214,0,.2)",
                    boxShadow: "0 0 20px rgba(255,214,0,.1)",
                    transform: "translateZ(15px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <AwardIcon
                    size={20}
                    className="mx-auto mb-1"
                    style={{
                      color: "#ffd600",
                      filter: "drop-shadow(0 0 8px rgba(255,214,0,.5))",
                    }}
                  />
                  <p
                    className="text-xs font-medium"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Mejor
                  </p>
                  <p
                    className="text-xl font-black"
                    style={{
                      color: "#ffd600",
                      textShadow: "0 0 15px rgba(255,214,0,.4)",
                    }}
                  >
                    {de}
                  </p>
                </div>
              </div>
              <div
                className="flex gap-3 justify-center mb-4"
                style={{
                  perspective: "600px",
                }}
              >
                <button
                  onClick={() => {
                    playClick();
                    I(null);
                  }}
                  className="px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105 relative overflow-hidden group"
                  style={{
                    background: "linear-gradient(135deg,#2080ff,#39ff14)",
                    boxShadow: "0 0 30px rgba(32,128,255,.4)",
                    transform: "translateZ(20px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <span
                    className="relative z-10 flex items-center gap-2"
                    style={{
                      transform: "translateZ(10px)",
                    }}
                  >
                    <RotateCcwIcon size={16} /> Reintentar / 重试
                  </span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                      animation: "shimmer 1.5s ease-in-out infinite",
                    }}
                  />
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setM("select");
                  }}
                  className="px-4 py-3 rounded-full text-xs font-bold transition-all hover:scale-105"
                  style={{
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(255,255,255,.15)",
                    color: "#fff",
                    boxShadow: "0 0 15px rgba(255,255,255,.05)",
                    transform: "translateZ(15px)",
                  }}
                >
                  Cambiar / 切换
                </button>
              </div>
              <P currentGameId="word-trivia" />
            </div>
          </div>
        )}
        <style>{`
          @keyframes triviaGridMove { 0%{background-position:0 0,0 0} 100%{background-position:60px 60px,60px 60px} }
          @keyframes optionAppear3D { from{transform:scale(0.8) translateY(30px) translateZ(80px) rotateX(-15deg);opacity:0} to{transform:scale(1) translateY(0) translateZ(0) rotateX(0);opacity:1} }
          @keyframes correctBurst3D { 0%{box-shadow:0 0 40px rgba(57,255,20,.5), inset 0 0 20px rgba(57,255,20,.1); transform:scale(1) translateZ(0)} 25%{box-shadow:0 0 80px rgba(57,255,20,.9), inset 0 0 30px rgba(57,255,20,.2); transform:scale(1.06) translateZ(30px)} 50%{box-shadow:0 0 100px rgba(57,255,20,1), inset 0 0 50px rgba(57,255,20,.3); transform:scale(1.03) translateZ(40px)} 100%{box-shadow:0 0 40px rgba(57,255,20,.5), inset 0 0 20px rgba(57,255,20,.1); transform:scale(1) translateZ(0)} }
          @keyframes wrongShake3D { 0%,100%{transform:translateX(0) rotateY(0) translateZ(0)} 12%{transform:translateX(-14px) rotateY(-8deg) translateZ(10px)} 25%{transform:translateX(14px) rotateY(8deg) translateZ(10px)} 37%{transform:translateX(-10px) rotateY(-5deg) translateZ(5px)} 50%{transform:translateX(10px) rotateY(5deg) translateZ(5px)} 62%{transform:translateX(-6px) rotateY(-3deg) translateZ(0)} 75%{transform:translateX(6px) rotateY(3deg) translateZ(0)} 87%{transform:translateX(-3px) rotateY(-1deg) translateZ(0)} }
          @keyframes floatScoreQuiz { 0%{transform:translate(-50%,-50%) scale(1) translateZ(0);opacity:1} 100%{transform:translate(-50%,-160%) scale(2) translateZ(100px);opacity:0} }
          @keyframes nextBtnAppear3D { from{transform:scale(0.8) translateZ(-50px);opacity:0} to{transform:scale(1) translateZ(25px);opacity:1} }
          @keyframes heroGlow3D { 0%,100%{opacity:0.2; transform:scale(1) translateZ(0)} 50%{opacity:0.5; transform:scale(1.2) translateZ(30px)} }
          @keyframes titleFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
          @keyframes iconPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
          @keyframes errorPulse { 0%,100%{box-shadow:0 0 0 rgba(255,68,68,0)} 50%{box-shadow:0 0 20px rgba(255,68,68,.3)} }
          @keyframes timerPulse { 0%,100%{box-shadow:0 0 15px rgba(255,56,96,.2)} 50%{box-shadow:0 0 30px rgba(255,56,96,.5)} }
          @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
          @keyframes cardAppear3D { 0%{transform:rotateY(90deg) rotateX(10deg) scale(0.8) translateZ(-100px); opacity:0} 60%{transform:rotateY(-5deg) rotateX(3deg) scale(1.02) translateZ(40px); opacity:1} 100%{transform:rotateY(0) rotateX(3deg) scale(1) translateZ(30px); opacity:1} }
          @keyframes neonBorderRotate { 0%{filter:blur(20px) hue-rotate(0deg)} 100%{filter:blur(20px) hue-rotate(360deg)} }
          @keyframes iconFloat { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(5deg)} }
          @keyframes questionWordPulse { 0%,100%{text-shadow:0 0 30px rgba(255,255,255,.2), 0 0 60px rgba(0,212,255,.15), 0 0 90px rgba(255,0,170,.1)} 50%{text-shadow:0 0 50px rgba(255,255,255,.4), 0 0 100px rgba(0,212,255,.3), 0 0 150px rgba(255,0,170,.2)} }
          @keyframes resultsCardFloat { 0%,100%{transform:rotateX(8deg) translateY(0) translateZ(0)} 50%{transform:rotateX(8deg) translateY(-6px) translateZ(25px)} }
          @keyframes trophyBounce { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-8px) scale(1.05)} }
          @keyframes crownFloat { 0%,100%{transform:translate(-50%,0)} 50%{transform:translate(-50%,-6px)} }
          @keyframes floatingParticle { 0%{transform:translateY(100vh) scale(0);opacity:0} 10%{opacity:0.3} 90%{opacity:0.3} 100%{transform:translateY(-100px) scale(1);opacity:0} }
          @keyframes mascotFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
          @keyframes kawaiiStar1 { 0%,100%{transform:scale(1) rotate(0deg)} 50%{transform:scale(1.3) rotate(180deg)} }
          @keyframes kawaiiStar2 { 0%,100%{transform:scale(1) rotate(0deg)} 50%{transform:scale(1.2) rotate(-180deg)} }
          @keyframes kawaiiTear { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(8px);opacity:0} }
          @keyframes particleBurst { 0%{transform:translate(-50%,-50%) scale(1);opacity:1} 100%{transform:translate(calc(-50% + var(--tx, 0px)), calc(-50% + var(--ty, 0px))) scale(0);opacity:0} }
          @keyframes comboBadge3D { 0%{transform:scale(0) rotateZ(-15deg) translateZ(-30px);opacity:0} 40%{transform:scale(1.3) rotateZ(5deg) translateZ(30px);opacity:1} 70%{transform:scale(1.1) rotateZ(-2deg) translateZ(20px);opacity:1} 100%{transform:scale(1) rotateZ(0) translateZ(15px);opacity:1} }
          @keyframes scoreFloat3D { 0%{transform:translateZ(10px)} 50%{transform:translateZ(25px) translateY(-3px)} 100%{transform:translateZ(10px)} }
          @keyframes progressPulse { 0%,100%{box-shadow:0 0 15px rgba(32,128,255,.6)} 50%{box-shadow:0 0 30px rgba(32,128,255,.9)} }
          @keyframes lightbulbGlowPulse { 0%,100%{filter:drop-shadow(0 0 5px rgba(255,214,0,.3))} 50%{filter:drop-shadow(0 0 20px rgba(255,214,0,.8)) drop-shadow(0 0 40px rgba(255,214,0,.4))} }
          @keyframes selectCardFloat { 0%,100%{transform:translateY(0) rotateX(0) rotateY(0) translateZ(20px)} 50%{transform:translateY(-6px) rotateX(2deg) rotateY(-2deg) translateZ(30px)} }
          @keyframes timerGaugePulse { 0%,100%{filter:drop-shadow(0 0 10px rgba(255,56,96,.3))} 50%{filter:drop-shadow(0 0 25px rgba(255,56,96,.7))} }
          .kawaii-mascot { filter: drop-shadow(0 0 10px rgba(255,0,170,0.3)); }
        `}</style>
      </div>
    </StarfieldBackground>
  );
}
export { EeComponent as default };
