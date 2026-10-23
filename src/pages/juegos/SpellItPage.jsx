import {
  BookOpenIcon,
  ZapIcon,
  HeartIcon,
  SparklesIcon,
  StarIcon,
  TrophyIcon,
  ArrowLeftIcon,
  WandSparklesIcon,
  LayersIcon,
  CrownIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g, a as a_1 } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
const ye = ["QWERTYUIOP", "ASDFGHJKLÑ", "ZXCVBNM"];
function je(espanol) {
  return espanol
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-ZÑ]/g, "")
    .trim();
}
function we(l) {
  const o = [...l];
  for (let n = o.length - 1; n > 0; n--) {
    const x = Math.floor(Math.random() * (n + 1));
    [o[n], o[x]] = [o[x], o[n]];
  }
  return o;
}
function ke() {
  const l = ["#ffd600", "#ff8a2a", "#ff6b35", "#ff00aa", "#00ff88", "#39ecff", "#b829dd"];
  for (let o = 0; o < 100; o++) {
    const n = document.createElement("div");
    const x = 4 + Math.random() * 10;
    const c = Math.random() > 0.5 ? "50%" : "2px";
    n.style.cssText = `position:fixed;left:50%;top:50%;width:${x}px;height:${x}px;border-radius:${c};background:${l[o % l.length]};pointer-events:none;z-index:9999;box-shadow:0 0 10px ${l[o % l.length]};`;
    document.body.appendChild(n);
    const d = (Math.PI * 2 * o) / 100 + (Math.random() - 0.5) * 1;
    const g = 6 + Math.random() * 18;
    let v = window.innerWidth / 2;
    let N = window.innerHeight / 2;
    let b = 1;
    let u = 0;
    let h = (Math.random() - 0.5) * 20;
    const y = Math.cos(d) * g;
    const f = Math.sin(d) * g - 4;
    const j = () => {
      v += y;
      N += f;
      u += h;
      b -= 0.008;
      n.style.left = `${v}px`;
      n.style.top = `${N}px`;
      n.style.opacity = String(b);
      n.style.transform = `rotate(${u}deg)`;
      if (b > 0) {
        requestAnimationFrame(j);
      } else {
        n.remove();
      }
    };
    requestAnimationFrame(j);
  }
}
function EeComponent() {
  const l = Array.from(
    {
      length: 20,
    },
    (o, id) => ({
      id,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      color: ["#ffd600", "#ff8a2a", "#ff00aa", "#39ecff", "#00ff88"][Math.floor(Math.random() * 5)],
    }),
  );
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {l.map((o) => (
        <div
          key={o.id}
          className="absolute rounded-full animate-particle-float"
          style={{
            left: o.left,
            top: o.top,
            width: o.size,
            height: o.size,
            background: o.color,
            boxShadow: `0 0 ${o.size * 3}px ${o.color}`,
            animationDelay: `${o.delay}s`,
            animationDuration: `${o.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
function TeComponent({ expression }) {
  const o =
    expression === "sad"
      ? "M 30 38 Q 36 32 42 38"
      : expression === "excited"
        ? "M 28 32 Q 36 24 44 32"
        : "M 32 34 Q 36 30 40 34";
  const n =
    expression === "sad"
      ? "M 58 38 Q 64 32 70 38"
      : expression === "excited"
        ? "M 56 32 Q 64 24 72 32"
        : "M 60 34 Q 64 30 68 34";
  const x =
    expression === "happy"
      ? "M 42 52 Q 50 60 58 52"
      : expression === "sad"
        ? "M 42 58 Q 50 50 58 58"
        : expression === "excited"
          ? "M 44 50 Q 50 64 56 50"
          : "M 46 52 Q 50 54 54 52";
  const opacity = expression === "happy" || expression === "excited" ? "0.5" : "0.2";
  const d =
    expression === "excited" ? "mascot-excited" : expression === "happy" ? "mascot-happy" : "mascot-float";
  return (
    <div
      className={`fixed bottom-4 right-4 z-50 pointer-events-none ${d}`}
      style={{
        width: "120px",
        height: "120px",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width="120"
        height="120"
        className="drop-shadow-2xl"
        style={{
          filter: "drop-shadow(0 0 20px rgba(255,0,170,0.4))",
        }}
      >
        <defs>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff6bcb" />
            <stop offset="100%" stopColor="#b829dd" />
          </linearGradient>
          <linearGradient id="earGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff8a2a" />
            <stop offset="100%" stopColor="#ff6b35" />
          </linearGradient>
        </defs>
        <ellipse cx="22" cy="18" rx="8" ry="16" fill="url(#earGrad)" transform="rotate(-20 22 18)" />
        <ellipse cx="78" cy="18" rx="8" ry="16" fill="url(#earGrad)" transform="rotate(20 78 18)" />
        <circle cx="50" cy="50" r="36" fill="url(#bodyGrad)" />
        <circle cx="36" cy="44" r="6" fill="#fff" opacity="0.4" />
        <circle cx="64" cy="44" r="6" fill="#fff" opacity="0.4" />
        <path d={o} stroke="#1a0a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d={n} stroke="#1a0a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="30" cy="48" r="4" fill="#ff3860" opacity={opacity} />
        <circle cx="70" cy="48" r="4" fill="#ff3860" opacity={opacity} />
        <path d={x} stroke="#1a0a2e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="50" cy="62" r="3" fill="#ff3860" opacity="0.6" />
      </svg>
    </div>
  );
}
function EComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [d, setD] = React.useState("select");
  const [v, setV] = React.useState([]);
  const [b, setB] = React.useState(0);
  const [h, setH] = React.useState([]);
  const [f, setF] = React.useState(3);
  const [z, setZ] = React.useState(0);
  const [ae, setAe] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("spellit_best") || "0");
    } catch {
      return 0;
    }
  });
  const [re, setRe] = React.useState(null);
  const [oe, setOe] = React.useState(null);
  const [le, setLe] = React.useState(null);
  const [_, set_] = React.useState(false);
  const [S, setS] = React.useState(0);
  const ne = g();
  const [T, setT] = React.useState("");
  React.useRef(null);
  const ie = () => {
    if (d === "gameover") {
      return "sad";
    }
    if (_) {
      return "excited";
    }
    if (S >= 3) {
      return "happy";
    }
    return "neutral";
  };
  const ce = (a) => {
    const r = ["#ffd600", "#ff8a2a", "#39ecff", "#00ff88"];
    const s = document.querySelector(`[data-slot="${a}"]`);
    if (!s) {
      return;
    }
    const t = s.getBoundingClientRect();
    for (let p = 0; p < 12; p++) {
      const m = document.createElement("div");
      m.style.cssText = `position:fixed;left:${t.left + t.width / 2}px;top:${t.top + t.height / 2}px;width:6px;height:6px;border-radius:50%;background:${r[p % r.length]};pointer-events:none;z-index:9999;box-shadow:0 0 8px ${r[p % r.length]};`;
      document.body.appendChild(m);
      const P = (Math.PI * 2 * p) / 12;
      const E = 3 + Math.random() * 6;
      let I = t.left + t.width / 2;
      let B = t.top + t.height / 2;
      let L = 1;
      const de = Math.cos(P) * E;
      const xe = Math.sin(P) * E;
      const Q = () => {
        I += de;
        B += xe + 1;
        L -= 0.03;
        m.style.left = `${I}px`;
        m.style.top = `${B}px`;
        m.style.opacity = String(L);
        if (L > 0) {
          requestAnimationFrame(Q);
        } else {
          m.remove();
        }
      };
      requestAnimationFrame(Q);
    }
  };
  const G = React.useCallback((a) => {
    playClick();
    let r = a ? a_1(a) : a_1();
    if (r.length === 0) {
      setT(
        'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
      );
      return;
    }
    const s = we(
      r
        .filter((t) => t.espanol && t.chino)
        .map((t) => ({
          espanol: je(t.espanol),
          chino: t.chino,
        }))
        .filter((t) => t.espanol.length >= 3 && t.espanol.length <= 10),
    );
    setV(s);
    setB(0);
    setH([]);
    setF(3);
    setZ(0);
    setRe(null);
    setOe(null);
    setLe(null);
    set_(false);
    setS(0);
    setD("playing");
  }, []);
  const w = v[b];
  const k = w ? w.espanol.split("") : [];
  const C = (a) => {
    if (d !== "playing" || !w || f <= 0) {
      return;
    }
    const h_length = h.length;
    if (!(h_length >= k.length)) {
      if (k[h_length] === a) {
        playCorrect();
        setH((s) => [...s, h_length]);
        setOe(h_length);
        setS((s) => s + 1);
        ce(h_length);
        setTimeout(() => setOe(null), 350);
        if (h_length === k.length - 1) {
          const s = 100 + k.length * 20 + S * 15;
          setZ((t) => t + s);
          set_(true);
          setTimeout(() => {
            set_(false);
            setB((t) => t + 1);
            setH([]);
            setS(0);
            ke();
          }, 700);
        }
      } else {
        playWrong();
        setS(0);
        setF((s) => {
          const t = s - 1;
          if (t <= 0) {
            playLose();
            setD("gameover");
            setAe((p) => {
              const m = Math.max(p, z);
              localStorage.setItem("spellit_best", String(m));
              return m;
            });
          }
          return t;
        });
        setRe(a);
        setLe(h.length);
        setTimeout(() => {
          setRe(null);
          setLe(null);
        }, 450);
      }
    }
  };
  React.useEffect(() => {
    const a = (r) => {
      const s = r.key.toUpperCase();
      if (s.length === 1 && ((s >= "A" && s <= "Z") || s === "Ñ")) {
        C(s);
      }
    };
    window.addEventListener("keydown", a);
    return () => window.removeEventListener("keydown", a);
  }, [C]);
  if (d === "select") {
    return (
      <StarfieldBackground>
        <EeComponent />
        <TeComponent expression="neutral" />
        <div className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative z-10">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/juegos"
              className="inline-flex items-center gap-2 text-white/60 hover:text-[#39ecff] transition-all duration-300 text-sm font-bold group"
            >
              <ArrowLeftIcon size={18} className="group-hover:-translate-x-1 transition-transform" /> Volver /
              返回
            </Link>
            <SoundToggles />
          </div>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4 animate-float">
              <WandSparklesIcon
                size={40}
                className="text-[#ff00aa] drop-shadow-[0_0_15px_rgba(255,0,170,0.6)]"
              />
              <h1
                className="text-5xl md:text-7xl font-black tracking-tight"
                style={{
                  textShadow: "0 0 40px rgba(0,212,255,0.4), 0 0 80px rgba(255,0,170,0.2)",
                  background: "linear-gradient(135deg,#39ecff,#ff00aa,#ffd600)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Spell It
              </h1>
              <WandSparklesIcon
                size={40}
                className="text-[#39ecff] drop-shadow-[0_0_15px_rgba(57,236,255,0.6)]"
              />
            </div>
            <p className="text-white/50 text-sm font-medium tracking-widest uppercase">
              Selecciona un módulo para jugar / 选择模块开始游戏
            </p>
            {T && (
              <div className="mt-6 mx-auto max-w-lg p-5 rounded-2xl text-sm font-bold animate-shake border border-red-400/30 bg-red-500/10 text-red-400">
                {T}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <button
              onClick={() => {
                playClick();
                setT("");
                G(null);
              }}
              className="group relative rounded-2xl p-6 text-left transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 overflow-hidden"
              style={{
                background: "rgba(14,22,64,.7)",
                border: "1px solid rgba(255,0,170,.35)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg,rgba(255,0,170,.1),rgba(184,41,221,.05))",
                }}
              />
              <div className="relative">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                    boxShadow: "0 0 30px rgba(255,0,170,.4)",
                  }}
                >
                  <LayersIcon size={28} className="text-white" />
                </div>
                <h3 className="text-white font-black text-lg mb-1">Todos los módulos</h3>
                <p className="text-xs font-medium mb-1 text-[#ff00aa]/80">所有模块</p>
                <p className="text-xs font-medium text-white/40">Mezcla todo el vocabulario</p>
              </div>
            </button>
            {ne.map((a) => (
              <button
                key={a.id}
                onClick={() => {
                  playClick();
                  setT("");
                  G(a.id);
                }}
                className="group relative rounded-2xl p-6 text-left transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 overflow-hidden"
                style={{
                  background: "rgba(14,22,64,.7)",
                  border: `1px solid ${a.color}40`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg,${a.color}15,${a.color}05)`,
                  }}
                />
                <div className="relative">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      background: `linear-gradient(135deg, ${a.color}, ${a.color}88)`,
                      boxShadow: `0 0 30px ${a.color}40`,
                    }}
                  >
                    <BookOpenIcon size={28} className="text-white" />
                  </div>
                  <h3 className="text-white font-black text-lg mb-1">{a.titulo}</h3>
                  <p
                    className="text-xs font-medium mb-1"
                    style={{
                      color: `${a.color}aa`,
                    }}
                  >
                    {a.tituloChino}
                  </p>
                  <p className="text-xs font-medium text-white/40">{a.vocabularioCount} palabras / 词</p>
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
      <EeComponent />
      <TeComponent expression={ie()} />
      <div className="max-w-3xl mx-auto px-4 py-4 min-h-screen relative z-10">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#39ecff] transition-all duration-300 text-sm font-bold group"
          >
            <ArrowLeftIcon size={18} className="group-hover:-translate-x-1 transition-transform" /> Volver /
            返回
          </Link>
          <div className="flex items-center gap-2 flex-wrap">
            <SoundToggles />
            <button
              onClick={() => {
                playClick();
                setD("select");
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 hover:scale-105 hover:bg-white/10"
              style={{
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.15)",
                color: "#fff",
              }}
            >
              <LayersIcon size={14} /> Cambiar / 切换
            </button>
            <div
              className="px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 hover:scale-105 flex items-center gap-1.5 animate-pulse-glow"
              style={{
                background: "rgba(255,214,0,.12)",
                border: "1px solid rgba(255,214,0,.25)",
                color: "#ffd600",
                boxShadow: "0 0 20px rgba(255,214,0,.25)",
              }}
            >
              <ZapIcon size={14} className="animate-bounce-slow" /> {z}
            </div>
          </div>
        </div>
        <div className="text-center mb-6">
          <h1
            className="text-4xl md:text-5xl font-black mb-2 tracking-tight animate-float"
            style={{
              background: "linear-gradient(135deg,#ffd600,#ff8a2a,#ff6b35)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 25px rgba(255,214,0,.4))",
            }}
          >
            Spell It
          </h1>
          <p className="text-white/40 text-xs font-medium tracking-widest uppercase">
            Deletrea la palabra española / 拼写西班牙语单词
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 mb-6">
          {Array.from({
            length: 3,
          }).map((a, r) => (
            <HeartIcon
              key={r}
              size={24}
              fill={r < f ? "#ff3860" : "transparent"}
              className={`transition-all duration-300 ${r < f ? "animate-heartbeat drop-shadow-[0_0_10px_rgba(255,56,96,0.6)]" : "opacity-30"}`}
              style={{
                color: r < f ? "#ff3860" : "rgba(255,255,255,.15)",
              }}
            />
          ))}
        </div>
        {w && (
          <div className="text-center mb-8">
            <div
              className={`inline-block px-8 py-4 rounded-2xl font-black text-2xl md:text-4xl transition-all duration-500 ${_ ? "animate-word-glow scale-110" : "animate-float-slow"}`}
              style={{
                background: "linear-gradient(135deg,rgba(255,214,0,.2),rgba(255,138,42,.12))",
                border: "1px solid rgba(255,214,0,.4)",
                color: "#ffd600",
                boxShadow: _
                  ? "0 0 60px rgba(255,214,0,.5), 0 0 100px rgba(255,138,42,.3)"
                  : "0 0 30px rgba(255,214,0,.25)",
                textShadow: "0 0 20px rgba(255,214,0,.5), 0 2px 4px rgba(0,0,0,.3)",
                transform: "translateZ(20px)",
                perspective: "800px",
              }}
            >
              <span className="flex items-center gap-2">
                <CrownIcon size={28} className="text-[#ffd600] drop-shadow-[0_0_10px_rgba(255,214,0,0.6)]" />
                {w.chino}
                <CrownIcon size={28} className="text-[#ffd600] drop-shadow-[0_0_10px_rgba(255,214,0,0.6)]" />
              </span>
            </div>
          </div>
        )}
        <div className="flex gap-2 justify-center mb-8 flex-wrap px-2">
          {k.map((a, r) => {
            const s = h.includes(r);
            const t = oe === r;
            const p = le === r && !s;
            return (
              <div
                key={r}
                data-slot={r}
                className={`flex items-center justify-center text-2xl md:text-4xl font-black transition-all select-none ${t ? "animate-slot-pop" : ""} ${p ? "animate-slot-shake" : ""}`}
                style={{
                  width: "clamp(44px, 12vw, 64px)",
                  height: "clamp(52px, 14vw, 72px)",
                  borderRadius: "16px",
                  background: s
                    ? "linear-gradient(135deg, rgba(255,214,0,.2), rgba(255,138,42,.12))"
                    : "rgba(255,255,255,.06)",
                  border: s ? "2px solid rgba(255,214,0,.5)" : "1px solid rgba(255,255,255,.12)",
                  color: s ? "#ffd600" : "transparent",
                  boxShadow: s
                    ? "0 0 25px rgba(255,214,0,.4), inset 0 0 15px rgba(255,214,0,.1)"
                    : "0 4px 15px rgba(0,0,0,.2), inset 0 1px 0 rgba(255,255,255,.05)",
                  textShadow: s ? "0 0 15px rgba(255,214,0,.6), 0 2px 4px rgba(0,0,0,.4)" : "none",
                  transform: t ? "scale(1.15) translateY(-5px)" : "scale(1)",
                  backdropFilter: "blur(5px)",
                }}
              >
                {s ? a : ""}
              </div>
            );
          })}
        </div>
        <div className="mobile-letter-keyboard flex flex-col gap-2.5 items-center mb-6">
          {ye.map((a, key) => (
            <div key={key} className="mobile-letter-row flex gap-1.5 md:gap-2 justify-center">
              {a.split("").map((s) => {
                const t = re === s;
                return (
                  <button
                    key={s}
                    onClick={() => C(s)}
                    disabled={d !== "playing" || f <= 0}
                    className={`mobile-letter-key min-w-[36px] md:min-w-[44px] px-2 md:px-3 py-2.5 md:py-3 rounded-xl text-base md:text-lg font-bold transition-all duration-150 disabled:opacity-25 hover:scale-110 hover:-translate-y-1 active:scale-95 active:translate-y-0 ${t ? "animate-key-shake" : ""}`}
                    style={{
                      background: t
                        ? "linear-gradient(135deg, rgba(255,56,96,.25), rgba(255,56,96,.1))"
                        : "linear-gradient(180deg, rgba(255,255,255,.1), rgba(255,255,255,.04))",
                      border: t ? "2px solid rgba(255,56,96,.6)" : "1px solid rgba(255,255,255,.15)",
                      color: t ? "#ff3860" : "#fff",
                      boxShadow: t
                        ? "0 0 20px rgba(255,56,96,.4), 0 4px 15px rgba(0,0,0,.2)"
                        : "0 4px 15px rgba(0,0,0,.2), inset 0 1px 0 rgba(255,255,255,.08)",
                      textShadow: t ? "0 0 10px rgba(255,56,96,.5)" : "0 0 8px rgba(255,255,255,.2)",
                      transform: t ? "translateX(4px) rotate(2deg)" : "translateX(0)",
                      backdropFilter: "blur(5px)",
                    }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          ))}
          <div className="flex gap-1.5 md:gap-2 justify-center mt-1">
            {["Á", "É", "Í", "Ó", "Ú", "Ü"].map((a) => (
              <button
                key={a}
                onClick={() => C(a)}
                disabled={d !== "playing" || f <= 0}
                className="px-2.5 md:px-3 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all duration-150 disabled:opacity-25 hover:scale-110 hover:-translate-y-1 active:scale-95"
                style={{
                  background: "linear-gradient(180deg, rgba(255,214,0,.12), rgba(255,214,0,.04))",
                  border: "1px solid rgba(255,214,0,.25)",
                  color: "#ffd600",
                  boxShadow: "0 4px 10px rgba(0,0,0,.2), inset 0 1px 0 rgba(255,214,0,.08)",
                  textShadow: "0 0 8px rgba(255,214,0,.3)",
                }}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
        {S > 2 && (
          <div className="text-center mb-4 animate-combo-pop">
            <span
              className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-xs font-black"
              style={{
                background: "rgba(255,214,0,.15)",
                border: "1px solid rgba(255,214,0,.3)",
                color: "#ffd600",
                boxShadow: "0 0 20px rgba(255,214,0,.3)",
                textShadow: "0 0 10px rgba(255,214,0,.5)",
              }}
            >
              <SparklesIcon size={14} /> ¡Combo x{S}! <StarIcon size={14} />
            </span>
          </div>
        )}
        {d === "gameover" && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.92)",
              backdropFilter: "blur(30px)",
            }}
          >
            <div
              className="text-center p-8 md:p-10 rounded-3xl max-w-sm mx-4 relative overflow-hidden animate-modal-in"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.9),rgba(5,8,27,.7))",
                border: "1px solid rgba(255,214,0,.25)",
                boxShadow: "0 0 80px rgba(255,214,0,.2), 0 0 160px rgba(255,138,42,.1)",
                transform: "rotateX(5deg)",
                perspective: "800px",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-70 animate-pulse-slow"
                style={{
                  background: "linear-gradient(135deg,#ffd600,#ff8a2a,#ff6b35)",
                  filter: "blur(30px)",
                }}
              />
              <TrophyIcon
                size={64}
                className="mx-auto mb-4 animate-bounce-slow"
                style={{
                  color: "#ffd600",
                  filter: "drop-shadow(0 0 20px rgba(255,214,0,.6))",
                }}
              />
              <h2
                className="text-4xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg,#ffd600,#ff8a2a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 15px rgba(255,214,0,.4))",
                }}
              >
                ¡Fin!
              </h2>
              <p className="text-white/50 text-sm mb-8 tracking-widest uppercase">游戏结束！</p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div
                  className="p-4 rounded-2xl transition-all hover:scale-105"
                  style={{
                    background: "rgba(255,214,0,.12)",
                    border: "1px solid rgba(255,214,0,.2)",
                    boxShadow: "0 0 20px rgba(255,214,0,.1)",
                  }}
                >
                  <ZapIcon
                    size={18}
                    className="mx-auto mb-2"
                    style={{
                      color: "#ffd600",
                      filter: "drop-shadow(0 0 8px rgba(255,214,0,.5))",
                    }}
                  />
                  <p
                    className="text-xs font-medium mb-1"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Score
                  </p>
                  <p
                    className="text-2xl font-black"
                    style={{
                      color: "#ffd600",
                      textShadow: "0 0 10px rgba(255,214,0,.5)",
                    }}
                  >
                    {z}
                  </p>
                </div>
                <div
                  className="p-4 rounded-2xl transition-all hover:scale-105"
                  style={{
                    background: "rgba(255,138,42,.12)",
                    border: "1px solid rgba(255,138,42,.2)",
                    boxShadow: "0 0 20px rgba(255,138,42,.1)",
                  }}
                >
                  <TrophyIcon
                    size={18}
                    className="mx-auto mb-2"
                    style={{
                      color: "#ff8a2a",
                      filter: "drop-shadow(0 0 8px rgba(255,138,42,.5))",
                    }}
                  />
                  <p
                    className="text-xs font-medium mb-1"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Mejor
                  </p>
                  <p
                    className="text-2xl font-black"
                    style={{
                      color: "#ff8a2a",
                      textShadow: "0 0 10px rgba(255,138,42,.5)",
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
                    G(null);
                  }}
                  className="px-8 py-3.5 rounded-full text-white font-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,214,0,0.4)] active:scale-95"
                  style={{
                    background: "linear-gradient(135deg,#ffd600,#ff8a2a)",
                    boxShadow: "0 0 30px rgba(255,214,0,.3)",
                    textShadow: "0 1px 2px rgba(0,0,0,.3)",
                  }}
                >
                  Jugar de nuevo / 再玩一次
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setD("select");
                  }}
                  className="px-5 py-3.5 rounded-full text-xs font-bold transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    background: "rgba(255,255,255,.08)",
                    border: "1px solid rgba(255,255,255,.15)",
                    color: "#fff",
                  }}
                >
                  Cambiar / 切换
                </button>
              </div>
              <div className="mt-4">
                <P currentGameId="spell-it" />
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes spellPop {
          0% { transform: scale(0.5) translateY(10px); opacity: 0.5; }
          50% { transform: scale(1.2) translateY(-8px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes particle-float {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.6; }
          25% { transform: translateY(-20px) translateX(10px) scale(1.2); opacity: 1; }
          50% { transform: translateY(-10px) translateX(-10px) scale(0.8); opacity: 0.4; }
          75% { transform: translateY(-30px) translateX(5px) scale(1.1); opacity: 0.8; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(1deg); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          15% { transform: scale(1.25); }
          30% { transform: scale(1); }
          45% { transform: scale(1.15); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 15px rgba(255,214,0,.2); }
          50% { box-shadow: 0 0 30px rgba(255,214,0,.5), 0 0 50px rgba(255,138,42,.2); }
        }
        @keyframes word-glow {
          0%, 100% { transform: scale(1.1); filter: brightness(1); }
          50% { transform: scale(1.15); filter: brightness(1.3); }
        }
        @keyframes slot-pop {
          0% { transform: scale(0.6) translateY(15px); opacity: 0.5; }
          40% { transform: scale(1.25) translateY(-10px); opacity: 1; }
          70% { transform: scale(0.95) translateY(2px); }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes slot-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px) rotate(-2deg); }
          40% { transform: translateX(8px) rotate(2deg); }
          60% { transform: translateX(-5px) rotate(-1deg); }
          80% { transform: translateX(5px) rotate(1deg); }
        }
        @keyframes key-shake {
          0%, 100% { transform: translateX(0) rotate(0); }
          25% { transform: translateX(-4px) rotate(-2deg); }
          50% { transform: translateX(4px) rotate(2deg); }
          75% { transform: translateX(-2px) rotate(-1deg); }
        }
        @keyframes combo-pop {
          0% { transform: scale(0) translateY(20px); opacity: 0; }
          50% { transform: scale(1.2) translateY(-5px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes modal-in {
          0% { transform: scale(0.8) rotateX(10deg); opacity: 0; }
          100% { transform: scale(1) rotateX(5deg); opacity: 1; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes mascot-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes mascot-happy {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          25% { transform: translateY(-12px) rotate(-3deg) scale(1.05); }
          50% { transform: translateY(-6px) rotate(3deg) scale(1.08); }
          75% { transform: translateY(-14px) rotate(-2deg) scale(1.05); }
        }
        @keyframes mascot-excited {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          20% { transform: translateY(-16px) rotate(-5deg) scale(1.1); }
          40% { transform: translateY(-4px) rotate(5deg) scale(1.15); }
          60% { transform: translateY(-18px) rotate(-3deg) scale(1.1); }
          80% { transform: translateY(-8px) rotate(3deg) scale(1.12); }
        }
        .animate-particle-float { animation: particle-float linear infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-heartbeat { animation: heartbeat 1.2s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-word-glow { animation: word-glow 0.7s ease-in-out infinite; }
        .animate-slot-pop { animation: slot-pop 0.35s cubic-bezier(.2,.9,.2,1); }
        .animate-slot-shake { animation: slot-shake 0.45s ease-in-out; }
        .animate-key-shake { animation: key-shake 0.4s ease-in-out; }
        .animate-combo-pop { animation: combo-pop 0.5s cubic-bezier(.2,.9,.2,1); }
        .animate-modal-in { animation: modal-in 0.5s cubic-bezier(.2,.9,.2,1); }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-shake { animation: slot-shake 0.5s ease-in-out; }
        .mascot-float { animation: mascot-float 3s ease-in-out infinite; }
        .mascot-happy { animation: mascot-happy 1.5s ease-in-out infinite; }
        .mascot-excited { animation: mascot-excited 0.8s ease-in-out infinite; }
      `}</style>
    </StarfieldBackground>
  );
}
export { EComponent as default };
