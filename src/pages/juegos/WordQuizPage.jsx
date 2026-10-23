import {
  BookOpenIcon,
  ZapIcon,
  TrophyIcon,
  ArrowLeftIcon,
  TargetIcon,
  LayersIcon,
  RotateCcwIcon,
  TimerIcon,
  SplitIcon,
  ClockIcon,
  SkipForwardIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g as g_1, a } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
function G(r) {
  const i = [...r];
  for (let c = i.length - 1; c > 0; c--) {
    const p = Math.floor(Math.random() * (c + 1));
    [i[c], i[p]] = [i[p], i[c]];
  }
  return i;
}
function ce(r = 80) {
  const i = ["#ff3860", "#2080ff", "#39ff14", "#ffd600", "#ff00aa", "#00d4ff"];
  for (let c = 0; c < r; c++) {
    const p = document.createElement("div");
    p.style.cssText = `position:fixed;left:50%;top:50%;width:8px;height:8px;border-radius:50%;background:${i[c % i.length]};pointer-events:none;z-index:9999;`;
    document.body.appendChild(p);
    const w = (Math.PI * 2 * c) / r;
    const u = 5 + Math.random() * 16;
    let h = window.innerWidth / 2;
    let m = window.innerHeight / 2;
    let N = 1;
    const b = Math.cos(w) * u;
    const C = Math.sin(w) * u;
    const g = () => {
      h += b;
      m += C + 2;
      N -= 0.014;
      p.style.left = `${h}px`;
      p.style.top = `${m}px`;
      p.style.opacity = String(N);
      if (N > 0) {
        requestAnimationFrame(g);
      } else {
        p.remove();
      }
    };
    requestAnimationFrame(g);
  }
}
const Te = [
  {
    bg: "#ff3860",
    glow: "rgba(255,56,96,.4)",
    label: "A",
  },
  {
    bg: "#2080ff",
    glow: "rgba(32,128,255,.4)",
    label: "B",
  },
  {
    bg: "#39ff14",
    glow: "rgba(57,255,20,.4)",
    label: "C",
  },
  {
    bg: "#ffd600",
    glow: "rgba(255,214,0,.4)",
    label: "D",
  },
];
function FeComponent({ mood }) {
  const rx = mood === "sad" ? 4 : mood === "excited" ? 6 : 5;
  const ry = mood === "sad" ? 3 : mood === "excited" ? 7 : 5;
  const d =
    mood === "happy"
      ? "M 18 22 Q 24 26 30 22"
      : mood === "sad"
        ? "M 18 24 Q 24 20 30 24"
        : mood === "excited"
          ? "M 18 22 Q 24 30 30 22"
          : "M 20 23 Q 24 25 28 23";
  const fill = mood === "happy" || mood === "excited" ? "rgba(255,105,180,0.5)" : "rgba(255,105,180,0.2)";
  const u =
    mood === "happy" ? "#46ff9a" : mood === "sad" ? "#ff4444" : mood === "excited" ? "#ffd600" : "#00d4ff";
  const animation =
    mood === "excited" ? "mascotExcited 0.4s ease-in-out infinite" : "mascotFloat 3s ease-in-out infinite";
  return (
    <div
      className="fixed bottom-4 right-4 z-50 pointer-events-none"
      style={{
        animation,
      }}
    >
      <div className="relative">
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-60"
          style={{
            background: u,
            width: "64px",
            height: "64px",
            animation: "mascotPulse 2s ease-in-out infinite",
          }}
        />
        <svg
          width="64"
          height="64"
          viewBox="0 0 48 48"
          fill="none"
          className="relative drop-shadow-[0_0_12px_rgba(0,212,255,0.6)]"
        >
          <circle cx="24" cy="24" r="20" fill="url(#blobGradQuiz)" stroke={u} strokeWidth="2" />
          <ellipse cx="16" cy="20" rx={rx} ry={ry} fill="white" />
          <ellipse cx="32" cy="20" rx={rx} ry={ry} fill="white" />
          <circle cx="16" cy="20" r="2.5" fill="#1a1a2e" />
          <circle cx="32" cy="20" r="2.5" fill="#1a1a2e" />
          <circle cx="17.5" cy="18.5" r="1" fill="white" opacity="0.8" />
          <circle cx="33.5" cy="18.5" r="1" fill="white" opacity="0.8" />
          <path d={d} stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="12" cy="26" r="3" fill={fill} />
          <circle cx="36" cy="26" r="3" fill={fill} />
          <defs>
            <linearGradient id="blobGradQuiz" x1="0" y1="0" x2="48" y2="48">
              <stop offset="0%" stopColor="#ff3860" />
              <stop offset="100%" stopColor="#2080ff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
function YeComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [u, setU] = React.useState("select");
  const [m, setM] = React.useState([]);
  const [b, setB] = React.useState(0);
  const [g, setG] = React.useState(10);
  const [q, setQ] = React.useState(0);
  const [X, setX] = React.useState(0);
  const [de, setDe] = React.useState(0);
  const [I, setI] = React.useState(null);
  const [o, setO] = React.useState(false);
  const [Y, setY] = React.useState(0);
  const [K, setK] = React.useState(0);
  const [v, setV] = React.useState({
    fifty: true,
    extraTime: true,
    skip: true,
  });
  const [F, setF] = React.useState(null);
  const [A, setA] = React.useState("neutral");
  const zRef = React.useRef(null);
  const xe = g_1();
  const [J, setJ] = React.useState("");
  const [fe, setFe] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("wordquiz_best") || "0");
    } catch {
      return 0;
    }
  });
  React.useEffect(() => {
    if (A === "happy" || A === "sad") {
      const t = setTimeout(() => setA("neutral"), 1500);
      return () => clearTimeout(t);
    }
  }, [A]);
  const W = React.useCallback((t) => {
    let s = t ? a(t) : a();
    if (s.length === 0) {
      setJ(
        'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
      );
      return;
    }
    const k = s.filter((n) => n.espanol && n.chino);
    const d = [];
    const x = G(k).slice(0, 20);
    for (let n = 0; n < x.length; n++) {
      const l = x[n];
      const mode = n % 2 === 0 ? "es-to-zh" : "zh-to-es";
      const correct = mode === "es-to-zh" ? l.chino : l.espanol;
      const he = G(k.filter((E) => E.espanol !== l.espanol))
        .slice(0, 6)
        .map((E) => {
          if (mode === "es-to-zh") {
            return E.chino;
          }
          return E.espanol;
        });
      const options = G([correct, ...he.slice(0, 3)]);
      d.push({
        word: mode === "es-to-zh" ? l.espanol : l.chino,
        correct,
        options,
        mode,
      });
    }
    setM(d);
    setB(0);
    setQ(0);
    setX(0);
    setDe(0);
    setY(0);
    setK(0);
    setI(null);
    setO(false);
    setG(10);
    setV({
      fifty: true,
      extraTime: true,
      skip: true,
    });
    setA("neutral");
    setU("playing");
  }, []);
  React.useEffect(() => {
    if (u === "playing" && !o && g > 0) {
      zRef.current = setInterval(() => setG((t) => t - 1), 1000);
      return () => {
        if (zRef.current) {
          clearInterval(zRef.current);
        }
      };
    }
    if (u === "playing" && !o && g <= 0) {
      U(-1);
    }
  }, [u, o, g]);
  const U = (t) => {
    if (o || !m[b]) {
      return;
    }
    setO(true);
    setI(t);
    if (zRef.current) {
      clearInterval(zRef.current);
    }
    const s = m[b];
    if (t >= 0 && s.options[t] === s.correct) {
      const d = Math.max(0, g) * 3;
      const x = Math.min(X + 1, 4);
      const n = 100 + d + x * 20;
      setQ((l) => l + n);
      setX((l) => {
        const f = l + 1;
        setDe(($) => Math.max($, f));
        return f;
      });
      setY((l) => l + 1);
      setF({
        show: true,
        text: `+${n}`,
        color: "#39ff14",
      });
      setA("happy");
      playCorrect();
      ce(40);
    } else {
      setX(0);
      setK((d) => d + 1);
      setA("sad");
      playWrong();
      setF({
        show: true,
        text: t < 0 ? "¡Tiempo!" : "¡Incorrecto!",
        color: "#ff3860",
      });
    }
    setTimeout(() => setF(null), 1000);
  };
  const ee = () => {
    if (b < m.length - 1) {
      setB((t) => t + 1);
      setI(null);
      setO(false);
      setG(10);
    } else {
      setU("results");
      setA("excited");
      setFe((t) => {
        const s = Math.max(t, q);
        localStorage.setItem("wordquiz_best", String(s));
        return s;
      });
      ce(120);
    }
  };
  const [y, setY_1] = React.useState(new Set());
  React.useEffect(() => {
    setY_1(new Set());
  }, [b]);
  const ue = () => {
    if (!v.fifty || o || !m[b]) {
      return;
    }
    const t = m[b];
    const s = t.options.map((d, x) => x).filter((d) => t.options[d] !== t.correct);
    const k = G(s).slice(0, 2);
    setV((d) => ({
      ...d,
      fifty: false,
    }));
    setY_1(new Set(k));
  };
  const me = () => {
    if (!(!v.extraTime || o)) {
      setG((t) => t + 10);
      setV((t) => ({
        ...t,
        extraTime: false,
      }));
    }
  };
  const be = () => {
    if (!(!v.skip || o)) {
      setV((t) => ({
        ...t,
        skip: false,
      }));
      ee();
    }
  };
  const j = m[b];
  const ge = Y + K > 0 ? Math.round((Y / (Y + K)) * 100) : 0;
  if (u === "select") {
    return (
      <StarfieldBackground>
        <div className="max-w-5xl mx-auto px-4 py-6 min-h-screen">
          <SoundToggles />
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/juegos"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
            >
              <ArrowLeftIcon size={16} /> Volver / 返回
            </Link>
          </div>
          <div className="text-center mb-10">
            <h1
              className="text-4xl md:text-5xl font-black mb-3"
              style={{
                textShadow: "0 0 40px rgba(0,212,255,0.3)",
              }}
            >
              <TargetIcon size={36} className="inline mr-3" /> Word Quiz Battle
            </h1>
            <p className="text-white/40 text-sm font-medium">
              Selecciona un módulo para jugar / 选择模块开始游戏
            </p>
            {J && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold"
                style={{
                  background: "rgba(255,68,68,.12)",
                  border: "1px solid rgba(255,68,68,.3)",
                  color: "#ff6b35",
                }}
              >
                {J}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => {
                setJ("");
                W(null);
              }}
              className="group rounded-xl p-5 text-left transition-all hover:scale-[1.02] hover:-translate-y-0.5"
              style={{
                background: "rgba(14,22,64,.6)",
                border: "1px solid rgba(255,0,170,.3)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
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
            {xe.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setJ("");
                  W(t.id);
                }}
                className="group rounded-xl p-5 text-left transition-all hover:scale-[1.02] hover:-translate-y-0.5"
                style={{
                  background: "rgba(14,22,64,.6)",
                  border: `1px solid ${t.color}40`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
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
            @keyframes mascotFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
            @keyframes mascotPulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
            @keyframes mascotExcited { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-12px) scale(1.1)} }
          `}</style>
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
          animation: "quizGridMove 20s linear infinite",
        }}
      />
      <div className="max-w-3xl mx-auto px-4 py-6 min-h-screen relative z-10">
        <SoundToggles />
        <FeComponent mood={A} />
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
          >
            <ArrowLeftIcon size={16} /> Volver / 返回
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setU("select")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "#fff",
              }}
            >
              <LayersIcon size={12} /> Cambiar módulo / 切换模块
            </button>
            <button
              onClick={() => W(null)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "#fff",
              }}
            >
              <RotateCcwIcon size={12} /> Reiniciar / 重置
            </button>
          </div>
        </div>
        <div className="text-center mb-6">
          <h1
            className="text-4xl md:text-5xl font-black mb-2"
            style={{
              background: "linear-gradient(135deg,#ff3860,#2080ff,#39ff14,#ffd600)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 20px rgba(255,56,96,.3))",
            }}
          >
            Word Quiz Battle
          </h1>
          <p className="text-white/40 text-sm font-medium">Elige la traducción correcta / 选择正确翻译</p>
        </div>
        <div className="flex gap-3 justify-center mb-4 flex-wrap">
          <div
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold"
            style={{
              background: "rgba(255,56,96,.1)",
              border: "1px solid rgba(255,56,96,.2)",
              color: "#ff3860",
            }}
          >
            <TimerIcon size={14} /> {g}s
          </div>
          <div
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold"
            style={{
              background: "rgba(32,128,255,.1)",
              border: "1px solid rgba(32,128,255,.2)",
              color: "#2080ff",
            }}
          >
            <ZapIcon size={14} /> {q}
          </div>
          <div
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold"
            style={{
              background: "rgba(57,255,20,.1)",
              border: "1px solid rgba(57,255,20,.2)",
              color: "#39ff14",
            }}
          >
            <TargetIcon size={14} /> {b + 1}/{m.length}
          </div>
          <div
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold"
            style={{
              background: "rgba(255,214,0,.1)",
              border: "1px solid rgba(255,214,0,.2)",
              color: "#ffd600",
            }}
          >
            <ZapIcon size={14} /> x
            {Math.min(X + (o && I !== null && j?.options[I] === j?.correct ? 1 : 0), 4)}
          </div>
        </div>
        <div
          className="max-w-md mx-auto h-2 rounded-full overflow-hidden mb-6"
          style={{
            background: "rgba(255,255,255,.05)",
          }}
        >
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${(g / 10) * 100}%`,
              background: g <= 3 ? "#ff3860" : "linear-gradient(90deg,#2080ff,#39ff14)",
              boxShadow: g <= 3 ? "0 0 15px rgba(255,56,96,.5)" : "0 0 15px rgba(32,128,255,.4)",
            }}
          />
        </div>
        <div className="flex gap-2 justify-center mb-6">
          <button
            onClick={ue}
            disabled={!v.fifty || o}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all hover:scale-105 disabled:opacity-30"
            style={{
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.12)",
              color: "#fff",
            }}
          >
            <SplitIcon size={12} /> 50/50
          </button>
          <button
            onClick={me}
            disabled={!v.extraTime || o}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all hover:scale-105 disabled:opacity-30"
            style={{
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.12)",
              color: "#fff",
            }}
          >
            <ClockIcon size={12} /> +10s
          </button>
          <button
            onClick={be}
            disabled={!v.skip || o}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all hover:scale-105 disabled:opacity-30"
            style={{
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.12)",
              color: "#fff",
            }}
          >
            <SkipForwardIcon size={12} /> Saltar
          </button>
        </div>
        {j && (
          <div
            className="rounded-3xl p-8 mb-6 relative overflow-hidden"
            style={{
              background: "linear-gradient(180deg,rgba(14,22,64,.7),rgba(5,8,27,.55))",
              border: "1px solid rgba(255,255,255,.12)",
              backdropFilter: "blur(14px)",
              boxShadow: "0 0 40px rgba(255,56,96,.08), 0 20px 60px rgba(0,0,0,.3)",
            }}
          >
            <div
              className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-40"
              style={{
                background: "linear-gradient(135deg,#ff3860,#2080ff,#39ff14,#ffd600)",
                filter: "blur(20px)",
              }}
            />
            <p
              className="text-xs font-bold uppercase tracking-wider mb-4 text-center"
              style={{
                color: "rgba(207,216,255,.4)",
              }}
            >
              {j.mode === "es-to-zh"
                ? "¿Cuál es la traducción al chino?"
                : "¿Cuál es la traducción al español?"}
            </p>
            <h2
              className="text-3xl md:text-4xl font-black text-center mb-2"
              style={{
                color: "#fff",
                textShadow: "0 0 30px rgba(255,255,255,.15), 0 0 60px rgba(0,212,255,.1)",
              }}
            >
              {j.word}
            </h2>
            <p
              className="text-center text-xs font-medium mb-6"
              style={{
                color: "rgba(207,216,255,.3)",
              }}
            >
              {j.mode === "es-to-zh" ? "中文翻译" : "Traducción española"}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {j.options.map((t, s) => {
                const k = I === s;
                const d = t === j.correct;
                const x = o && d;
                const n = o && k && !d;
                const l = Te[s];
                return (
                  <button
                    key={s}
                    onClick={() => !o && !y.has(s) && U(s)}
                    disabled={o || y.has(s)}
                    className="relative rounded-2xl p-5 text-center font-black text-sm transition-all duration-300 disabled:pointer-events-none"
                    style={{
                      background: x
                        ? "rgba(57,255,20,.15)"
                        : n
                          ? "rgba(255,56,96,.15)"
                          : y.has(s)
                            ? "rgba(255,255,255,.02)"
                            : `linear-gradient(135deg,${l.bg}20,${l.bg}10)`,
                      border: x
                        ? "1px solid rgba(57,255,20,.5)"
                        : n
                          ? "1px solid rgba(255,56,96,.5)"
                          : y.has(s)
                            ? "1px solid rgba(255,255,255,.04)"
                            : `1px solid ${l.bg}40`,
                      color: x ? "#39ff14" : n ? "#ff3860" : y.has(s) ? "rgba(255,255,255,.15)" : "#fff",
                      boxShadow: x
                        ? "0 0 30px rgba(57,255,20,.4)"
                        : n
                          ? "0 0 30px rgba(255,56,96,.4)"
                          : y.has(s)
                            ? "none"
                            : `0 0 15px ${l.glow}`,
                      transform: (!o && !y.has(s), "scale(1)"),
                      animation: x
                        ? "correctFlash 0.5s ease"
                        : n
                          ? "wrongShake 0.5s ease"
                          : "optionAppear 0.4s ease-out",
                      animationDelay: `${s * 0.08}s`,
                    }}
                    onMouseEnter={(f) => {
                      if (!o && !y.has(s)) {
                        f.currentTarget.style.transform = "scale(1.03) translateY(-2px)";
                        f.currentTarget.style.boxShadow = `0 0 25px ${l.glow}, 0 10px 30px rgba(0,0,0,.3)`;
                      }
                    }}
                    onMouseLeave={(f) => {
                      f.currentTarget.style.transform = "scale(1) translateY(0)";
                      f.currentTarget.style.boxShadow = x
                        ? "0 0 30px rgba(57,255,20,.4)"
                        : n
                          ? "0 0 30px rgba(255,56,96,.4)"
                          : y.has(s)
                            ? "none"
                            : `0 0 15px ${l.glow}`;
                    }}
                  >
                    <span className="absolute top-2 left-3 text-[10px] font-black opacity-40">{l.label}</span>
                    <span className="block">{t}</span>
                  </button>
                );
              })}
            </div>
            {F && (
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none font-black text-4xl z-20"
                style={{
                  color: F.color,
                  textShadow: `0 0 30px ${F.color}`,
                  animation: "floatScoreQuiz 1s ease-out forwards",
                }}
              >
                {F.text}
              </div>
            )}
          </div>
        )}
        {o && (
          <div className="text-center">
            <button
              onClick={ee}
              className="px-10 py-4 rounded-full text-white font-black text-lg transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg,#2080ff,#39ff14)",
                boxShadow: "0 0 30px rgba(32,128,255,.3)",
                animation: "nextBtnAppear 0.4s ease-out",
              }}
            >
              {b < m.length - 1 ? "Siguiente / 下一个" : "Ver resultados / 查看结果"}
            </button>
          </div>
        )}
        {u === "results" && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.88)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div
              className="text-center p-8 rounded-3xl max-w-sm mx-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.8),rgba(5,8,27,.6))",
                border: "1px solid rgba(255,214,0,.2)",
                boxShadow: "0 0 60px rgba(255,56,96,.1)",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-50"
                style={{
                  background: "linear-gradient(135deg,#ff3860,#2080ff)",
                  filter: "blur(25px)",
                }}
              />
              <TrophyIcon
                size={56}
                style={{
                  color: "#ffd600",
                  margin: "0 auto 16px",
                  filter: "drop-shadow(0 0 15px rgba(255,214,0,.5))",
                }}
              />
              <h2
                className="text-3xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg,#ff3860,#2080ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ¡Resultados!
              </h2>
              <p className="text-white/50 text-sm mb-6">结果</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div
                  className="p-3 rounded-xl"
                  style={{
                    background: "rgba(32,128,255,.1)",
                    border: "1px solid rgba(32,128,255,.15)",
                  }}
                >
                  <ZapIcon
                    size={16}
                    style={{
                      color: "#2080ff",
                      margin: "0 auto 4px",
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
                      color: "#2080ff",
                    }}
                  >
                    {q}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl"
                  style={{
                    background: "rgba(57,255,20,.1)",
                    border: "1px solid rgba(57,255,20,.15)",
                  }}
                >
                  <TargetIcon
                    size={16}
                    style={{
                      color: "#39ff14",
                      margin: "0 auto 4px",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Precisión
                  </p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#39ff14",
                    }}
                  >
                    {ge}%
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl"
                  style={{
                    background: "rgba(255,0,170,.1)",
                    border: "1px solid rgba(255,0,170,.15)",
                  }}
                >
                  <ZapIcon
                    size={16}
                    style={{
                      color: "#ff00aa",
                      margin: "0 auto 4px",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Mejor racha
                  </p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#ff00aa",
                    }}
                  >
                    {de}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl"
                  style={{
                    background: "rgba(255,214,0,.1)",
                    border: "1px solid rgba(255,214,0,.15)",
                  }}
                >
                  <TrophyIcon
                    size={16}
                    style={{
                      color: "#ffd600",
                      margin: "0 auto 4px",
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
                    className="text-lg font-black"
                    style={{
                      color: "#ffd600",
                    }}
                  >
                    {fe}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => W(null)}
                  className="px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg,#2080ff,#39ff14)",
                    boxShadow: "0 0 25px rgba(32,128,255,.3)",
                  }}
                >
                  Reintentar / 重试
                </button>
                <button
                  onClick={() => setU("select")}
                  className="px-4 py-3 rounded-full text-xs font-bold transition-all hover:scale-105"
                  style={{
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(255,255,255,.12)",
                    color: "#fff",
                  }}
                >
                  Cambiar / 切换
                </button>
                <P currentGameId="word-quiz" />
              </div>
            </div>
          </div>
        )}
        <style>{`
          @keyframes quizGridMove { 0%{background-position:0 0,0 0} 100%{background-position:60px 60px,60px 60px} }
          @keyframes optionAppear { from{transform:scale(0.8) translateY(20px);opacity:0} to{transform:scale(1) translateY(0);opacity:1} }
          @keyframes correctFlash { 0%{box-shadow:0 0 30px rgba(57,255,20,.4)} 50%{box-shadow:0 0 60px rgba(57,255,20,.8)} 100%{box-shadow:0 0 30px rgba(57,255,20,.4)} }
          @keyframes wrongShake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)} }
          @keyframes floatScoreQuiz { 0%{transform:translate(-50%,-50%) scale(1);opacity:1} 100%{transform:translate(-50%,-120%) scale(1.5);opacity:0} }
          @keyframes nextBtnAppear { from{transform:scale(0.8);opacity:0} to{transform:scale(1);opacity:1} }
          @keyframes mascotFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
          @keyframes mascotPulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
          @keyframes mascotExcited { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-12px) scale(1.1)} }
        `}</style>
      </div>
    </StarfieldBackground>
  );
}
export { YeComponent as default };
