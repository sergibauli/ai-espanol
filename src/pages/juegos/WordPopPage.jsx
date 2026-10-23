import {
  BookOpenIcon,
  TrophyIcon,
  ZapIcon,
  HeartIcon,
  ArrowLeftIcon,
  CircleIcon,
  TimerIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { b as b_1, c as c_1, g as g_1 } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
const Z = ["#ff00aa", "#00d4ff", "#ffd600", "#39ff14", "#ff6b35", "#b829dd"];
function ge(o, h, color) {
  for (let n = 0; n < 40; n++) {
    const r = document.createElement("div");
    const d = 4 + Math.random() * 8;
    r.style.cssText = `position:fixed;left:${o}px;top:${h}px;width:${d}px;height:${d}px;border-radius:50%;background:${color};pointer-events:none;z-index:9999;`;
    document.body.appendChild(r);
    const x = (Math.PI * 2 * n) / 40;
    const y = 3 + Math.random() * 14;
    let m = o;
    let i = h;
    let u = 1;
    const b = Math.cos(x) * y;
    const v = Math.sin(x) * y;
    const c = () => {
      m += b;
      i += v + 1;
      u -= 0.015;
      r.style.left = `${m}px`;
      r.style.top = `${i}px`;
      r.style.opacity = String(u);
      if (u > 0) {
        requestAnimationFrame(c);
      } else {
        r.remove();
      }
    };
    requestAnimationFrame(c);
  }
}
function he(o, h, color) {
  for (let n = 0; n < 12; n++) {
    const r = document.createElement("div");
    r.style.cssText = `position:fixed;left:${o}px;top:${h}px;width:6px;height:6px;border-radius:50%;background:${color};pointer-events:none;z-index:9998;`;
    document.body.appendChild(r);
    const d = Math.PI * 2 * Math.random();
    const x = 2 + Math.random() * 6;
    let y = o;
    let m = h;
    let i = 1;
    let u = 1;
    const b = Math.cos(d) * x;
    const v = Math.sin(d) * x - 3;
    const c = () => {
      y += b;
      m += v + 0.15;
      i -= 0.02;
      u -= 0.015;
      r.style.left = `${y}px`;
      r.style.top = `${m}px`;
      r.style.opacity = String(i);
      r.style.transform = `scale(${Math.max(0, u)})`;
      if (i > 0) {
        requestAnimationFrame(c);
      } else {
        r.remove();
      }
    };
    requestAnimationFrame(c);
  }
}
function AComponent({ mood }) {
  const h = {
    neutral: "M 28 35 Q 32 38 36 35 M 44 35 Q 48 38 52 35",
    happy: "M 28 34 Q 32 40 36 34 M 44 34 Q 48 40 52 34",
    excited: "M 28 34 Q 32 42 36 34 M 44 34 Q 48 42 52 34",
    sad: "M 28 36 Q 32 33 36 36 M 44 36 Q 48 33 52 36",
  };
  const w = {
    neutral: "M 36 46 Q 40 50 44 46",
    happy: "M 35 46 Q 40 54 45 46",
    excited: "M 34 46 Q 40 56 46 46",
    sad: "M 36 50 Q 40 46 44 50",
  };
  const n = {
    neutral: 0.4,
    happy: 0.7,
    excited: 0.9,
    sad: 0.2,
  };
  const animation =
    mood === "excited"
      ? "mascot-jump 0.6s ease-in-out infinite"
      : mood === "happy"
        ? "mascot-bounce 0.8s ease-in-out infinite"
        : mood === "sad"
          ? "mascot-sway 2s ease-in-out infinite"
          : "mascot-float 3s ease-in-out infinite";
  return (
    <div
      className="fixed bottom-4 right-4 z-50 pointer-events-none"
      style={{
        animation,
      }}
    >
      <svg
        width="90"
        height="90"
        viewBox="0 0 80 80"
        className="drop-shadow-[0_0_15px_rgba(255,105,180,0.6)]"
      >
        <defs>
          <radialGradient id="mascotBody" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffe4ec" />
            <stop offset="100%" stopColor="#ff9ec4" />
          </radialGradient>
          <radialGradient id="mascotEar" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffe4ec" />
            <stop offset="100%" stopColor="#ff8ab0" />
          </radialGradient>
        </defs>
        <ellipse cx="20" cy="20" rx="8" ry="16" fill="url(#mascotEar)" transform="rotate(-20 20 30)" />
        <ellipse cx="60" cy="20" rx="8" ry="16" fill="url(#mascotEar)" transform="rotate(20 60 30)" />
        <circle cx="40" cy="45" r="28" fill="url(#mascotBody)" />
        <circle cx="28" cy="38" r="3.5" fill="#2a1a10" />
        <circle cx="52" cy="38" r="3.5" fill="#2a1a10" />
        <circle cx="29.5" cy="36.5" r="1.2" fill="white" />
        <circle cx="53.5" cy="36.5" r="1.2" fill="white" />
        <path d={h[mood]} stroke="#2a1a10" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d={w[mood]} stroke="#2a1a10" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <circle cx="22" cy="46" r="4" fill="#ff6b9d" opacity={n[mood]} />
        <circle cx="58" cy="46" r="4" fill="#ff6b9d" opacity={n[mood]} />
        <ellipse cx="40" cy="65" rx="6" ry="4" fill="#ffb8d0" opacity="0.5" />
      </svg>
    </div>
  );
}
function SeComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [d, setD] = React.useState("select");
  const [y, setY] = React.useState([]);
  const [i, setI] = React.useState(0);
  const [b, setB] = React.useState(3);
  const [c, setC] = React.useState(90);
  const [k, setK] = React.useState(false);
  const [Q, setQ] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("wordpop_best") || "0");
    } catch {
      return 0;
    }
  });
  const [value, setValue] = React.useState("");
  const [g, setG] = React.useState(0);
  const [mood, setMood] = React.useState("neutral");
  const [ye, setYe] = React.useState([]);
  const ORef = React.useRef(0);
  const FRef = React.useRef([]);
  const ERef = React.useRef(null);
  const MRef = React.useRef(null);
  const zRef = React.useRef(3);
  const BRef = React.useRef(0);
  const S = React.useCallback((t, f = 1500) => {
    setMood(t);
    if (MRef.current) {
      clearTimeout(MRef.current);
    }
    MRef.current = setTimeout(() => setMood("neutral"), f);
  }, []);
  React.useEffect(
    () => () => {
      if (MRef.current) {
        clearTimeout(MRef.current);
      }
    },
    [],
  );
  React.useEffect(() => {
    if (d === "gameover") {
      setMood("sad");
    } else if (d === "select") {
      setMood("neutral");
    }
  }, [d]);
  React.useEffect(() => {
    if (g > BRef.current && g > 3) {
      S("excited", 2000);
    }
    BRef.current = g;
  }, [g, S]);
  React.useEffect(() => {
    if (b < zRef.current && b > 0) {
      S("sad", 2000);
    }
    zRef.current = b;
  }, [b, S]);
  const U = React.useCallback(
    (t) => {
      playClick();
      const l = (t ? b_1(t) : c_1())
        .map((s) => ({
          es: s.espanol.trim(),
          zh: s.chino.trim(),
        }))
        .filter((s) => s.es && s.zh && !s.es.includes(" "));
      if (l.length < 5) {
        alert("Este módulo no tiene suficientes palabras simples");
        return;
      }
      FRef.current = l;
      setI(0);
      setB(3);
      setC(90);
      setY([]);
      setValue("");
      setG(0);
      setYe([]);
      setD("playing");
      setK(true);
      ORef.current = 0;
      zRef.current = 3;
      BRef.current = 0;
      setMood("neutral");
    },
    [playClick],
  );
  React.useEffect(() => {
    if (k) {
      ERef.current = setInterval(() => {
        setC((t) => {
          if (t <= 1) {
            return (setK(false), setD("gameover"), playLose(), 0);
          }
          return t - 1;
        });
      }, 1000);
      return () => {
        if (ERef.current) {
          clearInterval(ERef.current);
        }
      };
    }
  }, [k, playLose]);
  React.useEffect(() => {
    if (!k) {
      return;
    }
    const t = setInterval(() => {
      const FRef_current = FRef.current;
      if (!FRef_current.length) {
        return;
      }
      const l = FRef_current[Math.floor(Math.random() * FRef_current.length)];
      const id = ++ORef.current;
      const color = Z[id % Z.length];
      setY((j) => [
        ...j,
        {
          id,
          word: l.zh,
          translation: l.es,
          x: 15 + Math.random() * 70,
          y: 105,
          r: 35 + Math.random() * 15,
          color,
          speed: 0.2 + Math.random() * 0.3,
          wobble: Math.random() * Math.PI * 2,
        },
      ]);
    }, 1800);
    return () => clearInterval(t);
  }, [k]);
  React.useEffect(() => {
    if (!k) {
      return;
    }
    const t = setInterval(() => {
      setY((f) =>
        f
          .map((s) => ({
            ...s,
            y: s.y - s.speed,
            x: s.x + Math.sin(s.y * 0.05 + s.wobble) * 0.3,
          }))
          .filter((s) => {
            if (s.y < -15) {
              return (
                setB((p) => {
                  const j = p - 1;
                  if (j <= 0) {
                    setK(false);
                    setD("gameover");
                    playLose();
                  }
                  return j;
                }),
                false
              );
            }
            return true;
          }),
      );
    }, 50);
    return () => clearInterval(t);
  }, [k, playLose]);
  const onChange = (t) => {
    const value = t.target.value;
    setValue(value);
    const l = y.find((s) => s.translation.toLowerCase() === value.toLowerCase());
    if (l) {
      playCorrect();
      const p = document.getElementById(`bubble-${l.id}`)?.getBoundingClientRect();
      const j = p ? p.left + p.width / 2 : window.innerWidth / 2;
      const W = p ? p.top + p.height / 2 : window.innerHeight / 2;
      ge(j, W, l.color);
      he(j, W, l.color);
      setY((Y) => Y.filter((ne) => ne.id !== l.id));
      setYe((Y) => [...Y, l.id]);
      setValue("");
      const R = g + 1;
      setG(R);
      const oe = 100 + R * 20;
      setI((Y) => Y + oe);
      S(R > 2 ? "excited" : "happy", 1500);
    }
  };
  const onClick = () => {
    setD("select");
    setK(false);
  };
  const ee = g_1();
  const te = (color) =>
    `radial-gradient(circle at 28% 25%, ${color}55 0%, ${color}20 40%, ${color}08 70%, transparent 100%)`;
  const ae = (color) => `2.5px solid ${color}70`;
  const se = (color) =>
    `0 0 25px ${color}40, 0 8px 30px ${color}25, inset 0 -6px 12px ${color}15, inset 0 4px 10px rgba(255,255,255,0.15)`;
  const re = (t) => `0 0 8px ${t}60, 0 0 18px ${t}30`;
  if (d === "select") {
    return (
      <StarfieldBackground>
        <style>{`
          @keyframes mascot-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
          @keyframes mascot-bounce { 0%,100%{transform:translateY(0)} 30%{transform:translateY(-10px)} 60%{transform:translateY(2px)} }
          @keyframes mascot-jump { 0%,100%{transform:translateY(0) scale(1)} 25%{transform:translateY(-14px) scale(1.05)} 50%{transform:translateY(0) scale(1)} 75%{transform:translateY(-7px) scale(1.02)} }
          @keyframes mascot-sway { 0%,100%{transform:translateY(0) rotate(0deg)} 25%{transform:translateY(-2px) rotate(-3deg)} 75%{transform:translateY(-2px) rotate(3deg)} }
          @keyframes neon-pulse { 0%,100%{box-shadow:0 0 20px rgba(57,255,20,0.3),0 0 40px rgba(0,212,255,0.2)} 50%{box-shadow:0 0 30px rgba(57,255,20,0.5),0 0 60px rgba(0,212,255,0.35)} }
          @keyframes title-glow { 0%,100%{text-shadow:0 0 30px rgba(57,255,20,0.25),0 0 60px rgba(0,212,255,0.15)} 50%{text-shadow:0 0 50px rgba(57,255,20,0.45),0 0 90px rgba(0,212,255,0.3)} }
          @keyframes card-shine { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
          @keyframes bubble-float { 0%,100%{transform:translate(-50%,-50%) translateY(0)} 50%{transform:translate(-50%,-50%) translateY(-5px)} }
          @keyframes bubble-scale { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.04)} }
          @keyframes pop-scale { 0%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.3)} 100%{transform:translate(-50%,-50%) scale(0)} }
          @keyframes combo-pop { 0%{transform:scale(0.6)} 60%{transform:scale(1.15)} 100%{transform:scale(1)} }
          @keyframes score-tick { 0%{transform:scale(1)} 50%{transform:scale(1.2)} 100%{transform:scale(1)} }
        `}</style>
        <AComponent mood={mood} />
        <div className="max-w-5xl mx-auto px-4 py-6 min-h-screen flex flex-col">
          <SoundToggles />
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/juegos"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
            >
              <ArrowLeftIcon size={16} /> Volver / 返回
            </Link>
          </div>
          <div className="text-center mb-10 flex-1 flex flex-col justify-center">
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-5 relative"
              style={{
                background: "linear-gradient(135deg,#39ff14,#00d4ff)",
                animation: "neon-pulse 2s ease-in-out infinite",
              }}
            >
              <CircleIcon size={44} className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <div
                className="absolute -inset-1 rounded-3xl opacity-40 blur-lg"
                style={{
                  background: "linear-gradient(135deg,#39ff14,#00d4ff)",
                }}
              />
            </div>
            <h1
              className="text-5xl md:text-7xl font-black text-white mb-3 tracking-tight"
              style={{
                animation: "title-glow 3s ease-in-out infinite",
              }}
            >
              Word Pop
            </h1>
            <p className="text-white/60 text-lg md:text-xl font-medium">
              ¡Escribe para reventar burbujas! / 输入翻译戳破泡泡！
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-8">
            {ee.map((t) => (
              <button
                key={t.id}
                onClick={() => U(t.id)}
                className="group relative rounded-2xl p-5 text-left transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 overflow-hidden"
                style={{
                  background: "linear-gradient(180deg,rgba(14,22,64,.65),rgba(5,8,27,.5))",
                  border: `1.5px solid ${t.color}50`,
                  backdropFilter: "blur(14px)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${t.color}30, transparent)`,
                    backgroundSize: "200% 100%",
                    animation: "card-shine 1.5s linear infinite",
                  }}
                />
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-lg mb-3 relative"
                  style={{
                    background: `${t.color}18`,
                    boxShadow: `0 0 12px ${t.color}25`,
                  }}
                >
                  <BookOpenIcon
                    size={22}
                    style={{
                      color: t.color,
                    }}
                  />
                </div>
                <p className="text-sm font-black text-white mb-0.5">{t.titulo}</p>
                <p
                  className="text-xs font-medium"
                  style={{
                    color: `${t.color}cc`,
                  }}
                >
                  {t.tituloChino}
                </p>
              </button>
            ))}
          </div>
        </div>
      </StarfieldBackground>
    );
  }
  if (d === "gameover") {
    const t = i > Q;
    if (t) {
      try {
        localStorage.setItem("wordpop_best", String(i));
        setQ(i);
      } catch {}
    }
    return (
      <StarfieldBackground>
        <style>{`
          @keyframes mascot-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
          @keyframes mascot-bounce { 0%,100%{transform:translateY(0)} 30%{transform:translateY(-10px)} 60%{transform:translateY(2px)} }
          @keyframes mascot-jump { 0%,100%{transform:translateY(0) scale(1)} 25%{transform:translateY(-14px) scale(1.05)} 50%{transform:translateY(0) scale(1)} 75%{transform:translateY(-7px) scale(1.02)} }
          @keyframes mascot-sway { 0%,100%{transform:translateY(0) rotate(0deg)} 25%{transform:translateY(-2px) rotate(-3deg)} 75%{transform:translateY(-2px) rotate(3deg)} }
          @keyframes trophy-shine { 0%,100%{transform:rotate(-5deg) scale(1)} 50%{transform:rotate(5deg) scale(1.08)} }
          @keyframes result-glow { 0%,100%{box-shadow:0 0 30px rgba(255,214,0,0.25)} 50%{box-shadow:0 0 50px rgba(255,214,0,0.45)} }
          @keyframes new-best-pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.1);opacity:0.85} }
        `}</style>
        <AComponent mood={mood} />
        <div className="max-w-2xl mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center text-center">
          <SoundToggles />
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center mb-6 relative"
            style={{
              background: "linear-gradient(135deg,#ffd600,#39ff14)",
              animation: "trophy-shine 2s ease-in-out infinite",
              boxShadow: "0 0 50px rgba(255,214,0,0.35)",
            }}
          >
            <TrophyIcon size={56} className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <div
              className="absolute -inset-1 rounded-full opacity-30 blur-lg"
              style={{
                background: "linear-gradient(135deg,#ffd600,#39ff14)",
              }}
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-2 tracking-tight">¡Resultados!</h1>
          {t && (
            <div
              className="text-sm font-black uppercase tracking-widest mb-6 px-4 py-1 rounded-full"
              style={{
                background: "linear-gradient(90deg,#ffd600,#ff6b35)",
                color: "#1a0a00",
                animation: "new-best-pulse 1.2s ease-in-out infinite",
              }}
            >
              ¡Nuevo Récord!
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 w-full mb-8">
            <div
              className="rounded-2xl p-6 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.7),rgba(5,8,27,.55))",
                border: "1.5px solid rgba(255,214,0,.2)",
                animation: "result-glow 3s ease-in-out infinite",
              }}
            >
              <div
                className="absolute top-0 left-0 w-full h-1"
                style={{
                  background: "linear-gradient(90deg,transparent,#ffd600,transparent)",
                  opacity: 0.6,
                }}
              />
              <p className="text-sm text-white/50 mb-1 font-bold">Score</p>
              <p
                className="text-5xl font-black"
                style={{
                  color: "#ffd600",
                  textShadow: "0 0 20px rgba(255,214,0,0.4)",
                }}
              >
                {i}
              </p>
            </div>
            <div
              className="rounded-2xl p-6 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.7),rgba(5,8,27,.55))",
                border: "1.5px solid rgba(57,255,20,.2)",
              }}
            >
              <div
                className="absolute top-0 left-0 w-full h-1"
                style={{
                  background: "linear-gradient(90deg,transparent,#39ff14,transparent)",
                  opacity: 0.6,
                }}
              />
              <p className="text-sm text-white/50 mb-1 font-bold">Mejor</p>
              <p
                className="text-5xl font-black"
                style={{
                  color: "#39ff14",
                  textShadow: "0 0 20px rgba(57,255,20,0.4)",
                }}
              >
                {Q}
              </p>
            </div>
          </div>
          <button
            onClick={onClick}
            className="px-10 py-4 rounded-full text-white font-black text-sm transition-all hover:scale-105 hover:brightness-110 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg,#39ff14,#00d4ff)",
              boxShadow: "0 0 40px rgba(57,255,20,0.5), 0 0 80px rgba(0,212,255,0.25)",
            }}
          >
            <span className="relative z-10">Jugar de nuevo / 再玩一次</span>
          </button>
          <P currentGameId="word-pop" />
        </div>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <style>{`
        @keyframes mascot-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes mascot-bounce { 0%,100%{transform:translateY(0)} 30%{transform:translateY(-10px)} 60%{transform:translateY(2px)} }
        @keyframes mascot-jump { 0%,100%{transform:translateY(0) scale(1)} 25%{transform:translateY(-14px) scale(1.05)} 50%{transform:translateY(0) scale(1)} 75%{transform:translateY(-7px) scale(1.02)} }
        @keyframes mascot-sway { 0%,100%{transform:translateY(0) rotate(0deg)} 25%{transform:translateY(-2px) rotate(-3deg)} 75%{transform:translateY(-2px) rotate(3deg)} }
        @keyframes bubble-float { 0%,100%{transform:translate(-50%,-50%) translateY(0) scale(1)} 50%{transform:translate(-50%,-50%) translateY(-4px) scale(1.03)} }
        @keyframes bubble-wobble { 0%,100%{transform:translate(-50%,-50%) rotate(-1deg)} 50%{transform:translate(-50%,-50%) rotate(1deg)} }
        @keyframes pop-scale { 0%{transform:translate(-50%,-50%) scale(1);opacity:1} 50%{transform:translate(-50%,-50%) scale(1.3);opacity:0.8} 100%{transform:translate(-50%,-50%) scale(0);opacity:0} }
        @keyframes combo-pop { 0%{transform:scale(0.5);opacity:0} 60%{transform:scale(1.15)} 100%{transform:scale(1);opacity:1} }
        @keyframes score-tick { 0%{transform:scale(1)} 50%{transform:scale(1.2)} 100%{transform:scale(1)} }
        @keyframes pulse-ring { 0%{transform:scale(0.8);opacity:0.6} 100%{transform:scale(1.6);opacity:0} }
        @keyframes timer-warning { 0%,100%{color:#00d4ff} 50%{color:#ff3860} }
        @keyframes input-glow { 0%,100%{box-shadow:0 0 20px rgba(57,255,20,.12), inset 0 0 8px rgba(57,255,20,.04)} 50%{box-shadow:0 0 35px rgba(57,255,20,.25), inset 0 0 12px rgba(57,255,20,.08)} }
      `}</style>
      <AComponent mood={mood} />
      <div className="max-w-5xl mx-auto px-4 py-4 md:py-6 min-h-screen flex flex-col">
        <SoundToggles />
        <div className="flex flex-wrap items-center justify-between mb-4 md:mb-6 gap-3">
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
          >
            <ArrowLeftIcon size={16} /> Volver / 返回
          </Link>
          <div className="flex items-center gap-2 md:gap-3">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all"
              style={{
                background: "rgba(255,214,0,.12)",
                border: "1.5px solid rgba(255,214,0,.25)",
                color: "#ffd600",
                boxShadow: "0 0 12px rgba(255,214,0,.15)",
              }}
            >
              <ZapIcon size={12} /> {i}
            </div>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{
                background: "rgba(255,56,96,.12)",
                border: "1.5px solid rgba(255,56,96,.25)",
                color: "#ff3860",
                boxShadow: "0 0 12px rgba(255,56,96,.15)",
              }}
            >
              <HeartIcon size={12} /> {b}
            </div>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{
                background: c <= 15 ? "rgba(255,56,96,.12)" : "rgba(0,212,255,.12)",
                border: c <= 15 ? "1.5px solid rgba(255,56,96,.3)" : "1.5px solid rgba(0,212,255,.25)",
                color: c <= 15 ? "#ff3860" : "#00d4ff",
                boxShadow: c <= 15 ? "0 0 12px rgba(255,56,96,.2)" : "0 0 12px rgba(0,212,255,.15)",
                animation: c <= 15 ? "timer-warning 1s ease-in-out infinite" : "none",
              }}
            >
              <TimerIcon size={12} /> {c}s
            </div>
            {g > 1 && (
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black"
                style={{
                  background: "rgba(255,214,0,.15)",
                  border: "1.5px solid rgba(255,214,0,.35)",
                  color: "#ffd600",
                  animation: "combo-pop 0.4s ease-out",
                  boxShadow: "0 0 15px rgba(255,214,0,.25)",
                }}
              >
                <ZapIcon size={12} /> {g}x COMBO
              </div>
            )}
          </div>
        </div>
        <div
          className="relative flex-1 min-h-[50vh] md:min-h-0 rounded-3xl mb-4 md:mb-6 overflow-hidden"
          style={{
            background: "linear-gradient(180deg,rgba(0,20,50,.5),rgba(0,8,25,.35))",
            border: "1.5px solid rgba(0,212,255,.2)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 0 40px rgba(0,212,255,.08), inset 0 0 60px rgba(0,212,255,.04)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background: "radial-gradient(circle at 50% 100%, rgba(0,212,255,.15), transparent 70%)",
            }}
          />
          {y.map((t) => (
            <div
              key={t.id}
              id={`bubble-${t.id}`}
              className="absolute flex items-center justify-center text-center rounded-full"
              style={{
                left: `${t.x}%`,
                top: `${t.y}%`,
                width: `${t.r * 2}px`,
                height: `${t.r * 2}px`,
                transform: "translate(-50%, -50%)",
                background: te(t.color),
                border: ae(t.color),
                boxShadow: se(t.color),
                animation: "bubble-float 3s ease-in-out infinite, bubble-wobble 4s ease-in-out infinite",
                transition: "all 0.05s linear",
              }}
            >
              <span
                className="text-xs md:text-sm font-black text-white px-2"
                style={{
                  textShadow: `0 0 10px ${t.color}, 0 0 20px ${t.color}80`,
                  lineHeight: 1.1,
                }}
              >
                {t.word}
              </span>
              <div
                className="absolute top-[12%] left-[22%] w-[18%] h-[10%] rounded-full"
                style={{
                  background: "rgba(255,255,255,.45)",
                  filter: "blur(1.5px)",
                  transform: "rotate(-15deg)",
                }}
              />
              <div
                className="absolute bottom-[15%] right-[20%] w-[12%] h-[6%] rounded-full"
                style={{
                  background: "rgba(255,255,255,.15)",
                  filter: "blur(2px)",
                }}
              />
              <div
                className="absolute inset-0 rounded-full opacity-40"
                style={{
                  background: `radial-gradient(circle at 70% 70%, ${t.color}30, transparent 50%)`,
                }}
              />
            </div>
          ))}
          {g > 4 && (
            <div
              className="absolute top-3 right-3 md:top-4 md:right-4 px-3 py-1 rounded-full text-xs font-black"
              style={{
                background: "rgba(255,214,0,.2)",
                border: "1.5px solid rgba(255,214,0,.4)",
                color: "#ffd600",
                animation: "combo-pop 0.4s ease-out",
                boxShadow: `0 0 20px rgba(255,214,0,.3), ${re("#ffd600")}`,
              }}
            >
              🔥 {g}x COMBO
            </div>
          )}
        </div>
        <div className="max-w-lg mx-auto w-full pb-6 md:pb-0">
          <div className="relative">
            <input
              type="text"
              value={value}
              onChange={onChange}
              className="w-full px-6 py-4 md:py-5 rounded-2xl text-white font-black text-base md:text-lg text-center outline-none transition-all duration-300"
              style={{
                background: "rgba(14,22,64,.65)",
                border: "1.5px solid rgba(57,255,20,.35)",
                boxShadow: "0 0 25px rgba(57,255,20,.12), inset 0 0 10px rgba(57,255,20,.06)",
                animation: "input-glow 2.5s ease-in-out infinite",
              }}
              placeholder="Escribe la traducción / 输入翻译..."
              autoFocus
            />
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 focus-within:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow: "0 0 30px rgba(57,255,20,.25), 0 0 60px rgba(0,212,255,.15)",
              }}
            />
          </div>
          <p className="text-center text-white/30 text-xs mt-2 font-medium">
            Pulsa enter o escribe directamente / 直接输入即可
          </p>
        </div>
      </div>
    </StarfieldBackground>
  );
}
export { SeComponent as default };
