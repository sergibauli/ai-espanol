import {
  BookOpenIcon,
  ZapIcon,
  SparklesIcon,
  StarIcon,
  SendIcon,
  TrophyIcon,
  ArrowLeftIcon,
  LockIcon,
  LayersIcon,
  TimerIcon,
  EyeOffIcon,
  EyeIcon,
  LockOpenIcon,
  TerminalIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g as g_1, a } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
const ue = [
  "◆",
  "▲",
  "●",
  "■",
  "★",
  "♦",
  "♠",
  "♣",
  "♥",
  "☀",
  "☂",
  "☁",
  "⚡",
  "❄",
  "✦",
  "✧",
  "✪",
  "✯",
  "✰",
  "⬟",
  "⬢",
  "⬡",
  "◇",
  "○",
  "□",
  "△",
  "▽",
  "▷",
  "◁",
  "✿",
];
function ye(espanol) {
  return espanol
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-ZÑ]/g, "")
    .trim();
}
function V(t) {
  const a = [...t];
  for (let l = a.length - 1; l > 0; l--) {
    const n = Math.floor(Math.random() * (l + 1));
    [a[l], a[n]] = [a[n], a[l]];
  }
  return a;
}
function je(word) {
  const a = Array.from(new Set(word.split(""))).sort();
  const l = V([...ue]).slice(0, a.length);
  const cipherMap = {};
  a.forEach((i, x) => {
    cipherMap[i] = l[x];
  });
  const ciphered = word.split("").map((i) => cipherMap[i] || i);
  return {
    cipherMap,
    ciphered,
  };
}
function HComponent() {
  const tRef = React.useRef([]);
  if (tRef.current.length === 0) {
    for (let id = 0; id < 30; id++) {
      tRef.current.push({
        id,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 2 + Math.random() * 6,
        delay: Math.random() * 5,
        duration: 4 + Math.random() * 6,
        color: ["#39ff14", "#00d4ff", "#ff00aa", "#ffd600", "#ff4444"][Math.floor(Math.random() * 5)],
      });
    }
  }
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {tRef.current.map((a) => (
        <div
          key={a.id}
          className="absolute rounded-full opacity-40"
          style={{
            left: `${a.left}%`,
            top: `${a.top}%`,
            width: a.size,
            height: a.size,
            background: a.color,
            boxShadow: `0 0 ${a.size * 2}px ${a.color}`,
            animation: `floatParticle ${a.duration}s ease-in-out ${a.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
function we() {
  const t = ["#39ff14", "#00d4ff", "#ff00aa", "#ffd600", "#ff4444", "#b829dd", "#00d4a0"];
  const a = ["circle", "square", "triangle"];
  for (let l = 0; l < 120; l++) {
    const n = document.createElement("div");
    const r = t[Math.floor(Math.random() * t.length)];
    const i = a[Math.floor(Math.random() * a.length)];
    const x = 4 + Math.random() * 10;
    let f = "50%";
    let u = "none";
    if (i === "square") {
      f = "2px";
    }
    if (i === "triangle") {
      u = "polygon(50% 0%, 0% 100%, 100% 100%)";
    }
    n.style.cssText = `position:fixed;left:50%;top:50%;width:${x}px;height:${x}px;background:${r};pointer-events:none;z-index:9999;border-radius:${f};clip-path:${u};box-shadow:0 0 ${x}px ${r};`;
    document.body.appendChild(n);
    const p = (Math.PI * 2 * l) / 120 + (Math.random() - 0.5) * 1;
    const h = 6 + Math.random() * 18;
    let b = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let j = 1;
    let v = 0;
    const $ = Math.cos(p) * h;
    let w = Math.sin(p) * h - 4;
    const L = 0.25;
    const _ = (Math.random() - 0.5) * 20;
    const k = () => {
      b += $;
      y += w;
      w += L;
      j -= 0.008;
      v += _;
      n.style.left = `${b}px`;
      n.style.top = `${y}px`;
      n.style.opacity = String(j);
      n.style.transform = `rotate(${v}deg)`;
      if (j > 0) {
        requestAnimationFrame(k);
      } else {
        n.remove();
      }
    };
    requestAnimationFrame(k);
  }
}
function ve() {
  const t = ["#39ff14", "#00d4a0", "#00d4ff", "#ffd600", "#ff00aa"];
  for (let a = 0; a < 60; a++) {
    const l = document.createElement("div");
    l.style.cssText = `position:fixed;left:50%;top:50%;width:6px;height:6px;border-radius:50%;background:${t[a % t.length]};pointer-events:none;z-index:9999;box-shadow:0 0 8px ${t[a % t.length]};`;
    document.body.appendChild(l);
    const n = (Math.PI * 2 * a) / 60;
    const r = 4 + Math.random() * 16;
    let i = window.innerWidth / 2;
    let x = window.innerHeight / 2;
    let f = 1;
    const u = Math.cos(n) * r;
    const p = Math.sin(n) * r;
    const h = () => {
      i += u;
      x += p + 2;
      f -= 0.012;
      l.style.left = `${i}px`;
      l.style.top = `${x}px`;
      l.style.opacity = String(f);
      if (f > 0) {
        requestAnimationFrame(h);
      } else {
        l.remove();
      }
    };
    requestAnimationFrame(h);
  }
}
function OComponent({ expression }) {
  const a =
    expression === "excited" ? (
      <path d="M22 28 L26 32 L30 28 L26 34 Z" fill="#ff00aa" />
    ) : expression === "sad" ? (
      <path d="M20 30 Q24 26 28 30" stroke="#ff4444" strokeWidth="2.5" fill="none" />
    ) : expression === "happy" ? (
      <path d="M20 30 Q24 24 28 30" stroke="#39ff14" strokeWidth="2.5" fill="none" />
    ) : (
      <circle cx="24" cy="30" r="2.5" fill="#00d4ff" />
    );
  const l =
    expression === "excited" ? (
      <path d="M42 28 L46 32 L50 28 L46 34 Z" fill="#ff00aa" />
    ) : expression === "sad" ? (
      <path d="M40 30 Q44 26 48 30" stroke="#ff4444" strokeWidth="2.5" fill="none" />
    ) : expression === "happy" ? (
      <path d="M40 30 Q44 24 48 30" stroke="#39ff14" strokeWidth="2.5" fill="none" />
    ) : (
      <circle cx="44" cy="30" r="2.5" fill="#00d4ff" />
    );
  const n =
    expression === "excited" ? (
      <ellipse cx="34" cy="42" rx="6" ry="7" fill="#ff00aa" />
    ) : expression === "sad" ? (
      <path d="M28 46 Q34 40 40 46" stroke="#ff4444" strokeWidth="2.5" fill="none" />
    ) : expression === "happy" ? (
      <path d="M28 44 Q34 52 40 44" stroke="#39ff14" strokeWidth="2.5" fill="none" />
    ) : (
      <path d="M30 46 L38 46" stroke="#00d4ff" strokeWidth="2.5" fill="none" />
    );
  const r =
    expression === "happy"
      ? "#39ff14"
      : expression === "sad"
        ? "#ff4444"
        : expression === "excited"
          ? "#ff00aa"
          : "#00d4ff";
  const animation =
    expression === "excited"
      ? "mascotBounce 0.4s ease-in-out infinite alternate"
      : "mascotFloat 3s ease-in-out infinite alternate";
  return (
    <div
      className="fixed bottom-4 right-4 z-50 pointer-events-none"
      style={{
        animation,
      }}
    >
      <svg
        width="100"
        height="100"
        viewBox="0 0 68 68"
        style={{
          filter: `drop-shadow(0 0 12px ${r})`,
        }}
      >
        <defs>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0a20" />
            <stop offset="100%" stopColor="#1a0a2e" />
          </linearGradient>
        </defs>
        <circle
          cx="34"
          cy="34"
          r="32"
          fill={r}
          opacity="0.12"
          style={{
            animation: "mascotPulse 2s ease-in-out infinite",
          }}
        />
        <circle
          cx="34"
          cy="34"
          r="28"
          fill={r}
          opacity="0.08"
          style={{
            animation: "mascotPulse 2s ease-in-out 0.5s infinite",
          }}
        />
        <rect x="8" y="8" width="52" height="52" rx="16" fill="url(#bodyGrad)" stroke={r} strokeWidth="2" />
        <line x1="20" y1="8" x2="14" y2="-2" stroke={r} strokeWidth="2" strokeLinecap="round" />
        <circle
          cx="14"
          cy="-2"
          r="3"
          fill={r}
          style={{
            animation: "mascotBlink 1.5s ease-in-out infinite alternate",
          }}
        />
        <line x1="48" y1="8" x2="54" y2="-2" stroke={r} strokeWidth="2" strokeLinecap="round" />
        <circle
          cx="54"
          cy="-2"
          r="3"
          fill={r}
          style={{
            animation: "mascotBlink 1.5s ease-in-out 0.3s infinite alternate",
          }}
        />
        <ellipse cx="18" cy="38" rx="5" ry="3" fill={r} opacity="0.25" />
        <ellipse cx="50" cy="38" rx="5" ry="3" fill={r} opacity="0.25" />
        {a}
        {l}
        {n}
        {expression === "sad" && (
          <>
            <circle
              cx="20"
              cy="36"
              r="1.5"
              fill="#00d4ff"
              style={{
                animation: "mascotTear 1.2s ease-in infinite",
              }}
            />
            <circle
              cx="48"
              cy="36"
              r="1.5"
              fill="#00d4ff"
              style={{
                animation: "mascotTear 1.2s ease-in 0.4s infinite",
              }}
            />
          </>
        )}
        {expression === "happy" && (
          <path
            d="M34 18 Q36 14 38 18 Q40 14 42 18 Q42 22 38 26 Q34 22 34 18"
            fill="#ff00aa"
            style={{
              animation: "mascotHeart 1.2s ease-in-out infinite alternate",
            }}
          />
        )}
        {expression === "excited" && (
          <>
            <path
              d="M8 18 L10 22 L14 24 L10 26 L8 30 L6 26 L2 24 L6 22 Z"
              fill="#ffd600"
              style={{
                animation: "mascotSparkle 1s ease-in-out infinite alternate",
              }}
            />
            <path
              d="M58 50 L60 54 L64 56 L60 58 L58 62 L56 58 L52 56 L56 54 Z"
              fill="#ffd600"
              style={{
                animation: "mascotSparkle 1s ease-in-out 0.5s infinite alternate",
              }}
            />
          </>
        )}
      </svg>
    </div>
  );
}
function IeComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [i, setI] = React.useState("select");
  const [f, setF] = React.useState([]);
  const [p, setP] = React.useState(0);
  const [b, setB] = React.useState("");
  const [j, setJ] = React.useState(0);
  const [$, set$] = React.useState(0);
  const [L, setL] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("wordcipher_best") || "0");
    } catch {
      return 0;
    }
  });
  const [k, setK] = React.useState(0);
  const [c, setC] = React.useState("playing");
  const [C, setC_1] = React.useState(false);
  const [F, setF_1] = React.useState("");
  const [K, setK_1] = React.useState(0);
  const ee = g_1();
  const W = React.useCallback((s) => {
    playClick();
    let o = s ? a(s) : a();
    if (o.length === 0) {
      setF_1(
        'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
      );
      return;
    }
    const S = V(
      o
        .filter((m) => m.espanol && m.chino)
        .map((m) => {
          const word = ye(m.espanol);
          const { cipherMap, ciphered } = je(word);
          return {
            word,
            hint: m.chino,
            cipherMap,
            ciphered,
          };
        })
        .filter((m) => m.word.length >= 3 && m.word.length <= 10),
    );
    if (S.length === 0) {
      setF_1(
        'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
      );
      return;
    }
    setF(S);
    setP(0);
    setJ(0);
    set$(0);
    setK(0);
    setC("playing");
    setB("");
    setC_1(false);
    setF_1("");
    setI("playing");
  }, []);
  const g = f[p];
  React.useEffect(() => {
    if (i === "playing") {
      const s = setInterval(() => setK((o) => o + 1), 1000);
      return () => clearInterval(s);
    }
  }, [i]);
  React.useEffect(() => {
    if (i !== "playing") {
      return;
    }
    const s = setInterval(() => setK_1((o) => (o + 1) % 100), 50);
    return () => clearInterval(s);
  }, [i]);
  const T = () => {
    if (!b.trim() || !g) {
      return;
    }
    if (b.trim().toUpperCase() === g.word) {
      playCorrect();
      setC("correct");
      ve();
      setJ((o) => o + 100 + $ * 10);
      set$((o) => {
        const S = o + 1;
        setL((m) => {
          const M = Math.max(m, S);
          localStorage.setItem("wordcipher_best", String(M));
          return M;
        });
        return S;
      });
    } else {
      playWrong();
      setC("wrong");
      set$(0);
    }
  };
  const Y = () => {
    playClick();
    if (p < f.length - 1) {
      setP((s) => s + 1);
      setC("playing");
      setB("");
      setC_1(false);
    } else {
      playWin();
      we();
      setI("won");
    }
  };
  const onKeyDown = (s) => {
    if (s.key === "Enter") {
      if (c === "playing") {
        T();
      } else if (c === "correct" || c === "wrong") {
        Y();
      }
    }
  };
  const expression = i === "won" ? "excited" : c === "correct" ? "happy" : c === "wrong" ? "sad" : "neutral";
  if (i === "select") {
    return (
      <StarfieldBackground>
        <HComponent />
        <OComponent expression="neutral" />
        <div className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative z-10">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/juegos"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold hover:scale-105"
            >
              <ArrowLeftIcon size={16} /> Volver / 返回
            </Link>
            <SoundToggles />
          </div>
          <div className="text-center mb-10">
            <h1
              className="text-4xl md:text-6xl font-black mb-3 relative inline-block"
              style={{
                textShadow: "0 0 40px rgba(0,212,255,0.4), 0 0 80px rgba(57,255,20,0.2)",
              }}
            >
              <span className="relative">
                <LockIcon
                  size={40}
                  className="inline mr-3 animate-pulse"
                  style={{
                    filter: "drop-shadow(0 0 10px #39ff14)",
                  }}
                />{" "}
                Word Cipher
                <span
                  className="absolute -inset-2 rounded-2xl opacity-20"
                  style={{
                    background: "linear-gradient(135deg, #39ff14, #00d4ff)",
                    filter: "blur(20px)",
                  }}
                />
              </span>
            </h1>
            <p className="text-white/40 text-sm font-medium">
              Selecciona un módulo para jugar / 选择模块开始游戏
            </p>
            {F && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold animate-shake"
                style={{
                  background: "rgba(255,68,68,.12)",
                  border: "1px solid rgba(255,68,68,.3)",
                  color: "#ff6b35",
                }}
              >
                {F}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => {
                playClick();
                setF_1("");
                W(null);
              }}
              className="group rounded-xl p-5 text-left transition-all hover:scale-[1.03] hover:-translate-y-1 relative overflow-hidden"
              style={{
                background: "rgba(14,22,64,.6)",
                border: "1px solid rgba(255,0,170,.3)",
                transform: "translateZ(20px)",
                perspective: "800px",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, rgba(255,0,170,0.1), rgba(184,41,221,0.1))",
                }}
              />
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 relative"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                  boxShadow: "0 0 25px rgba(255,0,170,.4)",
                }}
              >
                <LayersIcon size={24} className="text-white" />
              </div>
              <h3 className="text-white font-black text-base mb-1 relative">Todos los módulos</h3>
              <p
                className="text-xs font-medium mb-1 relative"
                style={{
                  color: "rgba(255,0,170,.7)",
                }}
              >
                所有模块
              </p>
              <p className="text-xs font-medium text-white/40 relative">Mezcla todo el vocabulario</p>
            </button>
            {ee.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  playClick();
                  setF_1("");
                  W(s.id);
                }}
                className="group rounded-xl p-5 text-left transition-all hover:scale-[1.03] hover:-translate-y-1 relative overflow-hidden"
                style={{
                  background: "rgba(14,22,64,.6)",
                  border: `1px solid ${s.color}40`,
                  transform: "translateZ(20px)",
                  perspective: "800px",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${s.color}15, ${s.color}05)`,
                  }}
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 relative"
                  style={{
                    background: `linear-gradient(135deg, ${s.color}, ${s.color}88)`,
                    boxShadow: `0 0 25px ${s.color}40`,
                  }}
                >
                  <BookOpenIcon size={24} className="text-white" />
                </div>
                <h3 className="text-white font-black text-base mb-1 relative">{s.titulo}</h3>
                <p
                  className="text-xs font-medium mb-1 relative"
                  style={{
                    color: `${s.color}aa`,
                  }}
                >
                  {s.tituloChino}
                </p>
                <p className="text-xs font-medium text-white/40 relative">
                  {s.vocabularioCount} palabras / 词
                </p>
              </button>
            ))}
          </div>
        </div>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <HComponent />
      <OComponent expression={expression} />
      <div className="max-w-3xl mx-auto px-4 py-6 min-h-screen relative z-10">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold hover:scale-105"
          >
            <ArrowLeftIcon size={16} /> Volver / 返回
          </Link>
          <div className="flex items-center gap-2 flex-wrap">
            <SoundToggles />
            <button
              onClick={() => {
                playClick();
                setI("select");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(0,212,255,0.3)]"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "#fff",
              }}
            >
              <TerminalIcon size={12} /> Cambiar / 切换
            </button>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(57,255,20,.12)",
                border: "1px solid rgba(57,255,20,.3)",
                color: "#39ff14",
                boxShadow: "0 0 15px rgba(57,255,20,.3)",
              }}
            >
              <ZapIcon size={12} className="inline mr-1" /> {j}
            </div>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(0,212,255,.12)",
                border: "1px solid rgba(0,212,255,.3)",
                color: "#00d4ff",
                boxShadow: "0 0 15px rgba(0,212,255,.3)",
              }}
            >
              <TimerIcon size={12} className="inline mr-1" /> {k}s
            </div>
          </div>
        </div>
        <div className="text-center mb-6">
          <h1
            className="text-3xl md:text-5xl font-black mb-2 relative inline-block"
            style={{
              color: "#39ff14",
              textShadow:
                "0 0 20px rgba(57,255,20,.5), 0 0 40px rgba(57,255,20,.3), 0 0 80px rgba(57,255,20,.1)",
            }}
          >
            <TerminalIcon
              size={36}
              className="inline mr-2 animate-pulse"
              style={{
                filter: "drop-shadow(0 0 8px #39ff14)",
              }}
            />{" "}
            Word Cipher
          </h1>
          <p className="text-white/40 text-xs font-medium">
            Descifra la palabra usando los símbolos / 使用符号破解单词
          </p>
        </div>
        <div className="max-w-sm mx-auto mb-6">
          <div
            className="h-2.5 rounded-full overflow-hidden relative"
            style={{
              background: "rgba(255,255,255,.05)",
              border: "1px solid rgba(57,255,20,.25)",
              boxShadow: "0 0 10px rgba(57,255,20,.1)",
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-700 relative"
              style={{
                width: `${(p / f.length) * 100}%`,
                background: "linear-gradient(90deg,#39ff14,#00d4a0,#00d4ff)",
                boxShadow: "0 0 15px rgba(57,255,20,.5)",
              }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  animation: "shimmer 2s infinite",
                }}
              />
            </div>
          </div>
          <p
            className="text-center text-xs mt-1 font-medium"
            style={{
              color: "rgba(207,216,255,.3)",
            }}
          >
            {p + 1} / {f.length}
          </p>
        </div>
        {g && (
          <div
            className="rounded-3xl p-6 md:p-8 relative overflow-hidden transition-all"
            style={{
              background: "linear-gradient(180deg,rgba(5,15,5,.92),rgba(0,10,0,.85))",
              border: `1px solid ${c === "wrong" ? "rgba(255,68,68,.4)" : "rgba(57,255,20,.35)"}`,
              boxShadow: `0 0 50px ${c === "wrong" ? "rgba(255,68,68,.15)" : "rgba(57,255,20,.15)"}, 0 20px 60px rgba(0,0,0,.5)`,
              backdropFilter: "blur(14px)",
              transform: "translateZ(20px)",
              perspective: "800px",
            }}
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              <div
                className="absolute left-0 right-0 h-[2px]"
                style={{
                  top: `${K}%`,
                  background: "linear-gradient(90deg, transparent, rgba(57,255,20,.4), transparent)",
                  animation: "scanMove 3s linear infinite",
                }}
              />
            </div>
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(57,255,20,0.1) 20px, rgba(57,255,20,0.1) 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(57,255,20,0.1) 20px, rgba(57,255,20,0.1) 21px)",
              }}
            />
            <div
              className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 rounded-tl-3xl"
              style={{
                borderColor: "rgba(57,255,20,.5)",
              }}
            />
            <div
              className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 rounded-tr-3xl"
              style={{
                borderColor: "rgba(57,255,20,.5)",
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 rounded-bl-3xl"
              style={{
                borderColor: "rgba(57,255,20,.5)",
              }}
            />
            <div
              className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 rounded-br-3xl"
              style={{
                borderColor: "rgba(57,255,20,.5)",
              }}
            />
            <div className="text-center mb-6">
              <p
                className="text-xs font-bold mb-3 uppercase tracking-wider flex items-center justify-center gap-1"
                style={{
                  color: "rgba(57,255,20,.7)",
                }}
              >
                <LockIcon size={12} className="inline" /> Cifrado / 加密
              </p>
              <div
                className="flex gap-2 md:gap-3 justify-center flex-wrap"
                style={{
                  perspective: "600px",
                }}
              >
                {g.ciphered.map((s, o) => (
                  <div
                    key={o}
                    className="w-12 h-14 md:w-14 md:h-16 flex items-center justify-center text-xl md:text-2xl font-black rounded-xl transition-all"
                    style={{
                      background: "rgba(0,30,0,.5)",
                      border: "1px solid rgba(57,255,20,.45)",
                      color: "#39ff14",
                      boxShadow: "0 0 20px rgba(57,255,20,.2), inset 0 0 12px rgba(57,255,20,.08)",
                      textShadow: "0 0 12px rgba(57,255,20,.6), 0 0 24px rgba(57,255,20,.3)",
                      animation: `cipherGlow 1.5s ease-in-out ${o * 0.1}s infinite alternate, cipherFloat 3s ease-in-out ${o * 0.15}s infinite alternate`,
                      transformStyle: "preserve-3d",
                      transform: "translateZ(10px)",
                    }}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
            <div
              className="mb-6 p-4 rounded-2xl relative"
              style={{
                background: "rgba(0,20,0,.5)",
                border: "1px solid rgba(57,255,20,.25)",
                boxShadow: "inset 0 0 20px rgba(57,255,20,.05)",
              }}
            >
              <p
                className="text-xs font-bold mb-2 uppercase tracking-wider"
                style={{
                  color: "rgba(57,255,20,.55)",
                }}
              >
                Mapa de símbolos / 符号映射
              </p>
              <div className="flex gap-2 md:gap-3 flex-wrap justify-center">
                {Object.entries(g.cipherMap).map(([s, o]) => (
                  <div
                    key={s}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-110 hover:shadow-[0_0_10px_rgba(57,255,20,0.3)] cursor-default"
                    style={{
                      background: "rgba(57,255,20,.1)",
                      border: "1px solid rgba(57,255,20,.25)",
                      color: "#39ff14",
                      textShadow: "0 0 6px rgba(57,255,20,.4)",
                    }}
                  >
                    <span>{o}</span>
                    <span
                      style={{
                        color: "rgba(255,255,255,.4)",
                      }}
                    >
                      =
                    </span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mb-6">
              <button
                onClick={() => {
                  playClick();
                  setC_1(!C);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(255,214,0,0.2)]"
                style={{
                  background: "rgba(255,214,0,.1)",
                  border: "1px solid rgba(255,214,0,.2)",
                  color: "#ffd600",
                }}
              >
                {C ? <EyeOffIcon size={12} /> : <EyeIcon size={12} />}
                {C ? "Ocultar / 隐藏" : "Pista / 提示"}
              </button>
              {C && (
                <p
                  className="mt-3 text-lg md:text-xl font-black transition-all animate-fadeInUp"
                  style={{
                    color: "#ffd600",
                    textShadow: "0 0 15px rgba(255,214,0,.5), 0 0 30px rgba(255,214,0,.2)",
                    transform: "translateZ(10px)",
                  }}
                >
                  <SparklesIcon size={18} className="inline mr-1" />
                  {g.hint}
                </p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                value={b}
                onChange={(s) => setB(s.target.value.toUpperCase())}
                onKeyDown={onKeyDown}
                disabled={c !== "playing"}
                placeholder="Escribe la palabra descifrada / 输入解密后的单词..."
                className="w-full px-5 py-4 rounded-2xl text-center text-xl font-black tracking-widest uppercase transition-all outline-none"
                style={{
                  background:
                    c === "correct"
                      ? "rgba(0,40,0,.8)"
                      : c === "wrong"
                        ? "rgba(40,0,0,.8)"
                        : "rgba(0,20,0,.6)",
                  border:
                    c === "correct"
                      ? "1px solid rgba(57,255,20,.6)"
                      : c === "wrong"
                        ? "1px solid rgba(255,68,68,.6)"
                        : "1px solid rgba(57,255,20,.35)",
                  color: c === "correct" ? "#39ff14" : c === "wrong" ? "#ff4444" : "#39ff14",
                  boxShadow:
                    c === "correct"
                      ? "0 0 30px rgba(57,255,20,.4), 0 0 60px rgba(57,255,20,.15), inset 0 0 20px rgba(57,255,20,.05)"
                      : c === "wrong"
                        ? "0 0 30px rgba(255,68,68,.4), 0 0 60px rgba(255,68,68,.15), inset 0 0 20px rgba(255,68,68,.05)"
                        : "0 0 25px rgba(57,255,20,.15), 0 0 50px rgba(57,255,20,.08), inset 0 0 15px rgba(57,255,20,.03)",
                  fontFamily: "monospace",
                  textShadow: "0 0 10px rgba(57,255,20,.4)",
                }}
              />
            </div>
            {c === "correct" && (
              <div
                className="text-center mb-4 p-3 rounded-xl transition-all animate-fadeInUp"
                style={{
                  background: "rgba(57,255,20,.12)",
                  border: "1px solid rgba(57,255,20,.25)",
                  boxShadow: "0 0 20px rgba(57,255,20,.15)",
                  transform: "translateZ(10px)",
                }}
              >
                <p
                  className="text-sm font-bold flex items-center justify-center gap-1"
                  style={{
                    color: "#39ff14",
                    textShadow: "0 0 8px rgba(57,255,20,.5)",
                  }}
                >
                  <LockOpenIcon size={14} /> ¡Descifrado! / 破解成功！{" "}
                  <StarIcon
                    size={14}
                    className="animate-spin"
                    style={{
                      animationDuration: "2s",
                    }}
                  />
                </p>
              </div>
            )}
            {c === "wrong" && (
              <div
                className="text-center mb-4 p-3 rounded-xl transition-all animate-shake"
                style={{
                  background: "rgba(255,68,68,.12)",
                  border: "1px solid rgba(255,68,68,.25)",
                  boxShadow: "0 0 20px rgba(255,68,68,.15)",
                  transform: "translateZ(10px)",
                }}
              >
                <p
                  className="text-sm font-bold"
                  style={{
                    color: "#ff4444",
                    textShadow: "0 0 8px rgba(255,68,68,.5)",
                  }}
                >
                  La respuesta era: {g.word}
                </p>
              </div>
            )}
            <div className="flex gap-3 justify-center">
              {c === "playing" ? (
                <button
                  onClick={T}
                  disabled={!b.trim()}
                  className="px-6 py-3 rounded-full text-white font-black text-sm transition-all disabled:opacity-30 hover:scale-105 hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] flex items-center gap-2"
                  style={{
                    background: "linear-gradient(135deg,#39ff14,#00d4a0)",
                    boxShadow: "0 0 25px rgba(57,255,20,.3)",
                    textShadow: "0 0 6px rgba(0,0,0,0.3)",
                  }}
                >
                  <SendIcon size={14} /> Descifrar / 解密
                </button>
              ) : (
                <button
                  onClick={Y}
                  className="px-6 py-3 rounded-full text-white font-black text-sm transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] flex items-center gap-2 animate-pulse"
                  style={{
                    background: "linear-gradient(135deg,#39ff14,#00d4a0)",
                    boxShadow: "0 0 25px rgba(57,255,20,.3)",
                    textShadow: "0 0 6px rgba(0,0,0,0.3)",
                  }}
                >
                  {p < f.length - 1 ? "Siguiente / 下一个" : "Ver resultado / 看结果"}{" "}
                  <ArrowLeftIcon size={14} className="rotate-180" />
                </button>
              )}
            </div>
          </div>
        )}
        <div className="text-center mt-4">
          <p
            className="text-xs font-medium flex items-center justify-center gap-1"
            style={{
              color: "rgba(207,216,255,.3)",
            }}
          >
            <TrophyIcon size={12} /> Mejor racha / 最佳连续:{" "}
            <span
              className="font-bold"
              style={{
                color: "rgba(255,0,170,.7)",
              }}
            >
              {L}
            </span>
          </p>
        </div>
        {i === "won" && (
          <div
            className="rounded-3xl p-8 text-center relative overflow-hidden mt-6 animate-fadeInUp"
            style={{
              background: "linear-gradient(180deg,rgba(5,15,5,.92),rgba(0,10,0,.85))",
              border: "1px solid rgba(57,255,20,.35)",
              boxShadow: "0 0 60px rgba(57,255,20,.2), 0 0 120px rgba(57,255,20,.1)",
              transform: "rotateX(5deg)",
              perspective: "800px",
            }}
          >
            <div
              className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-60 animate-pulse"
              style={{
                background: "linear-gradient(135deg,#39ff14,#00d4a0,#00d4ff)",
                filter: "blur(25px)",
              }}
            />
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              {[...Array(8)].map((s, o) => (
                <div
                  key={o}
                  className="absolute rounded-full"
                  style={{
                    left: `${10 + o * 12}%`,
                    top: `${20 + (o % 3) * 25}%`,
                    width: 4 + (o % 3) * 3,
                    height: 4 + (o % 3) * 3,
                    background: ["#39ff14", "#00d4ff", "#ffd600", "#ff00aa"][o % 4],
                    boxShadow: `0 0 10px ${["#39ff14", "#00d4ff", "#ffd600", "#ff00aa"][o % 4]}`,
                    animation: `floatParticle 3s ease-in-out ${o * 0.3}s infinite alternate`,
                  }}
                />
              ))}
            </div>
            <TrophyIcon
              size={56}
              className="mx-auto mb-4 animate-bounce"
              style={{
                color: "#ffd600",
                filter: "drop-shadow(0 0 15px rgba(255,214,0,.6))",
              }}
            />
            <h2
              className="text-3xl md:text-4xl font-black mb-2"
              style={{
                color: "#39ff14",
                textShadow: "0 0 20px rgba(57,255,20,.5), 0 0 40px rgba(57,255,20,.3)",
              }}
            >
              ¡Sistema Descifrado!
            </h2>
            <p className="text-white/50 text-sm mb-6">系统破解成功！</p>
            <div className="flex gap-4 justify-center mb-6 flex-wrap">
              <div
                className="p-4 rounded-2xl min-w-[100px]"
                style={{
                  background: "rgba(57,255,20,.12)",
                  border: "1px solid rgba(57,255,20,.2)",
                  boxShadow: "0 0 20px rgba(57,255,20,.1)",
                }}
              >
                <ZapIcon
                  size={24}
                  className="mx-auto mb-2"
                  style={{
                    color: "#39ff14",
                    filter: "drop-shadow(0 0 6px rgba(57,255,20,.5))",
                  }}
                />
                <p
                  className="text-2xl font-black"
                  style={{
                    color: "#39ff14",
                    textShadow: "0 0 10px rgba(57,255,20,.4)",
                  }}
                >
                  {j}
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
                className="p-4 rounded-2xl min-w-[100px]"
                style={{
                  background: "rgba(255,0,170,.12)",
                  border: "1px solid rgba(255,0,170,.2)",
                  boxShadow: "0 0 20px rgba(255,0,170,.1)",
                }}
              >
                <TrophyIcon
                  size={24}
                  className="mx-auto mb-2"
                  style={{
                    color: "#ff00aa",
                    filter: "drop-shadow(0 0 6px rgba(255,0,170,.5))",
                  }}
                />
                <p
                  className="text-2xl font-black"
                  style={{
                    color: "#ff00aa",
                    textShadow: "0 0 10px rgba(255,0,170,.4)",
                  }}
                >
                  {L}
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
                className="p-4 rounded-2xl min-w-[100px]"
                style={{
                  background: "rgba(0,212,255,.12)",
                  border: "1px solid rgba(0,212,255,.2)",
                  boxShadow: "0 0 20px rgba(0,212,255,.1)",
                }}
              >
                <TimerIcon
                  size={24}
                  className="mx-auto mb-2"
                  style={{
                    color: "#00d4ff",
                    filter: "drop-shadow(0 0 6px rgba(0,212,255,.5))",
                  }}
                />
                <p
                  className="text-2xl font-black"
                  style={{
                    color: "#00d4ff",
                    textShadow: "0 0 10px rgba(0,212,255,.4)",
                  }}
                >
                  {k}s
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
                W(null);
              }}
              className="px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(57,255,20,0.4)]"
              style={{
                background: "linear-gradient(135deg,#39ff14,#00d4a0)",
                boxShadow: "0 0 30px rgba(57,255,20,.3)",
                textShadow: "0 0 6px rgba(0,0,0,0.3)",
              }}
            >
              Jugar de nuevo / 再玩一次
            </button>
            <P currentGameId="word-cipher" />
          </div>
        )}
        <style>{`
          @keyframes cipherGlow { from { box-shadow: 0 0 15px rgba(57,255,20,.2), inset 0 0 10px rgba(57,255,20,.05); transform: translateZ(10px); } to { box-shadow: 0 0 30px rgba(57,255,20,.5), inset 0 0 15px rgba(57,255,20,.1); transform: translateZ(20px); } }
          @keyframes cipherFloat { from { transform: translateY(0) translateZ(10px); } to { transform: translateY(-4px) translateZ(10px); } }
          @keyframes scanMove { 0% { top: 0%; } 100% { top: 100%; } }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
          @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
          @keyframes floatParticle { from { transform: translateY(0) scale(1); opacity: 0.3; } to { transform: translateY(-20px) scale(1.2); opacity: 0.6; } }
          @keyframes mascotFloat { from { transform: translateY(0); } to { transform: translateY(-10px); } }
          @keyframes mascotBounce { from { transform: translateY(0) scale(1); } to { transform: translateY(-16px) scale(1.05); } }
          @keyframes mascotPulse { 0%, 100% { opacity: 0.1; transform: scale(1); } 50% { opacity: 0.2; transform: scale(1.05); } }
          @keyframes mascotBlink { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
          @keyframes mascotTear { 0% { transform: translateY(0) scale(1); opacity: 0.8; } 100% { transform: translateY(12px) scale(0.5); opacity: 0; } }
          @keyframes mascotHeart { from { transform: scale(1); } to { transform: scale(1.2); } }
          @keyframes mascotSparkle { from { transform: scale(1) rotate(0deg); opacity: 0.7; } to { transform: scale(1.3) rotate(15deg); opacity: 1; } }
          @keyframes shake { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-6px); } 40% { transform: translateX(6px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(4px); } }
          .animate-fadeInUp { animation: fadeInUp 0.5s ease forwards; }
          .animate-shake { animation: shake 0.5s ease forwards; }
        `}</style>
      </div>
    </StarfieldBackground>
  );
}
export { IeComponent as default };
