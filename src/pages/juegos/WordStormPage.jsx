import {
  BookOpenIcon,
  ZapIcon,
  HeartIcon,
  SparklesIcon,
  TrophyIcon,
  ArrowLeftIcon,
  WindIcon,
  LayersIcon,
  ShieldIcon,
  CrosshairIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g, a } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
function Ce(espanol) {
  return espanol
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-ZÑ]/g, "")
    .trim();
}
function Ye(r) {
  const o = [...r];
  for (let n = o.length - 1; n > 0; n--) {
    const p = Math.floor(Math.random() * (n + 1));
    [o[n], o[p]] = [o[p], o[n]];
  }
  return o;
}
function Xe(r, o) {
  const n = ["#ff4444", "#ff6b35", "#ffd600", "#ffffff", "#39ff14", "#00d4ff", "#ff00aa", "#b829dd"];
  for (let p = 0; p < 60; p++) {
    const i = document.createElement("div");
    i.style.cssText = `position:fixed;left:${r}px;top:${o}px;width:${4 + Math.random() * 6}px;height:${4 + Math.random() * 6}px;border-radius:50%;background:${n[p % n.length]};pointer-events:none;z-index:9999;`;
    document.body.appendChild(i);
    const f = Math.random() * Math.PI * 2;
    const m = 3 + Math.random() * 14;
    let h = Math.cos(f) * m;
    let w = Math.sin(f) * m;
    let u = 1;
    const b = () => {
      h *= 0.9;
      w *= 0.9;
      w += 0.35;
      i.style.left = `${parseFloat(i.style.left) + h}px`;
      i.style.top = `${parseFloat(i.style.top) + w}px`;
      u -= 0.015;
      i.style.opacity = String(u);
      if (u > 0) {
        requestAnimationFrame(b);
      } else {
        i.remove();
      }
    };
    requestAnimationFrame(b);
  }
}
function ze() {
  const r = ["#ff00aa", "#ff3860", "#ffd600", "#39ff14", "#00d4ff", "#b829dd", "#ff6b35"];
  for (let o = 0; o < 120; o++) {
    const n = document.createElement("div");
    const p = 6 + Math.random() * 8;
    const i = window.innerWidth / 2 + (Math.random() - 0.5) * 300;
    const f = window.innerHeight / 2 + (Math.random() - 0.5) * 200;
    n.style.cssText = `position:fixed;left:${i}px;top:${f}px;width:${p}px;height:${p}px;border-radius:${Math.random() > 0.5 ? "50%" : "2px"};background:${r[Math.floor(Math.random() * r.length)]};pointer-events:none;z-index:9999;`;
    document.body.appendChild(n);
    let m = (Math.random() - 0.5) * 16;
    let h = -8 - Math.random() * 12;
    let w = Math.random() * 360;
    let u = (Math.random() - 0.5) * 20;
    let b = 1;
    const v = () => {
      m *= 0.98;
      h += 0.4;
      w += u;
      n.style.left = `${parseFloat(n.style.left) + m}px`;
      n.style.top = `${parseFloat(n.style.top) + h}px`;
      n.style.transform = `rotate(${w}deg)`;
      b -= 0.012;
      n.style.opacity = String(b);
      if (b > 0) {
        requestAnimationFrame(v);
      } else {
        n.remove();
      }
    };
    requestAnimationFrame(v);
  }
}
function Te1Component({ expression }) {
  const rx = expression === "sad" ? 4 : expression === "excited" ? 6 : 5;
  const ry = expression === "sad" ? 2 : expression === "excited" ? 7 : 5;
  const d =
    expression === "happy"
      ? "M 22 30 Q 32 38 42 30"
      : expression === "sad"
        ? "M 22 34 Q 32 26 42 34"
        : expression === "excited"
          ? "M 20 28 Q 32 46 44 28 Z"
          : "M 26 32 Q 32 36 38 32";
  const fill = expression === "happy" ? "#ff8fa3" : expression === "excited" ? "#ff6b9d" : "#ffadc4";
  const f =
    expression === "excited"
      ? "mascotBounceExcited 0.4s ease-in-out infinite alternate"
      : expression === "happy"
        ? "mascotBounce 0.6s ease-in-out infinite alternate"
        : expression === "sad"
          ? "mascotSway 1s ease-in-out infinite alternate"
          : "mascotFloat 2s ease-in-out infinite alternate";
  const m =
    expression === "happy"
      ? "#39ff14"
      : expression === "excited"
        ? "#ffd600"
        : expression === "sad"
          ? "#ff4444"
          : "#00d4ff";
  return (
    <div
      className="fixed bottom-4 right-4 z-50 pointer-events-none"
      style={{
        animation: f,
      }}
    >
      <div
        style={{
          filter: `drop-shadow(0 0 12px ${m}80) drop-shadow(0 0 30px ${m}40)`,
          animation: "mascotGlow 1.5s ease-in-out infinite alternate",
        }}
      >
        <svg width="72" height="72" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse
            cx="14"
            cy="14"
            rx="10"
            ry="14"
            fill="#fce4ec"
            stroke="#f8bbd0"
            strokeWidth="2"
            transform="rotate(-20 14 14)"
          />
          <ellipse
            cx="50"
            cy="14"
            rx="10"
            ry="14"
            fill="#fce4ec"
            stroke="#f8bbd0"
            strokeWidth="2"
            transform="rotate(20 50 14)"
          />
          <ellipse cx="14" cy="14" rx="5" ry="8" fill="#f8bbd0" transform="rotate(-20 14 14)" />
          <ellipse cx="50" cy="14" rx="5" ry="8" fill="#f8bbd0" transform="rotate(20 50 14)" />
          <circle cx="32" cy="36" r="22" fill="#fff0f5" stroke="#f8bbd0" strokeWidth="2" />
          <ellipse cx="14" cy="38" rx="5" ry="3" fill={fill} opacity="0.6" />
          <ellipse cx="50" cy="38" rx="5" ry="3" fill={fill} opacity="0.6" />
          <ellipse cx="22" cy="30" rx={rx} ry={ry} fill="#1a1a2e" />
          <ellipse cx="42" cy="30" rx={rx} ry={ry} fill="#1a1a2e" />
          <circle cx="24" cy="28" r="2" fill="#fff" />
          <circle cx="44" cy="28" r="2" fill="#fff" />
          <path
            d={d}
            stroke="#1a1a2e"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill={expression === "excited" ? "#ff6b9d" : "none"}
          />
          <circle cx="6" cy="24" r="2" fill="#ffd600" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1s" repeatCount="indefinite" />
          </circle>
          <circle cx="58" cy="18" r="1.5" fill="#00d4ff" opacity="0.8">
            <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="56" cy="48" r="2" fill="#ff00aa" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.1;0.7" dur="0.8s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    </div>
  );
}
const Fe = Array.from(
  {
    length: 40,
  },
  (r, o) => ({
    left: (o * 2.5) % 100,
    delay: (o * 0.06) % 1.8,
    duration: 0.4 + (o % 6) * 0.12,
    opacity: 0.2 + (o % 5) * 0.08,
    height: 12 + (o % 4) * 6,
  }),
);
const Te = [
  {
    left: -10,
    top: -5,
    width: 50,
    height: 25,
    opacity: 0.35,
    delay: 0,
    duration: 12,
  },
  {
    left: 30,
    top: -8,
    width: 60,
    height: 30,
    opacity: 0.25,
    delay: 1,
    duration: 15,
  },
  {
    left: 60,
    top: -3,
    width: 45,
    height: 22,
    opacity: 0.3,
    delay: 2,
    duration: 10,
  },
  {
    left: 80,
    top: -6,
    width: 55,
    height: 28,
    opacity: 0.2,
    delay: 0.5,
    duration: 14,
  },
];
function DeComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [f, setF] = React.useState("select");
  const [h, setH] = React.useState([]);
  const [u, setU] = React.useState([]);
  const [v, setV] = React.useState("");
  const [S, setS] = React.useState(0);
  const [j, setJ] = React.useState(3);
  const [ae, setAe] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("wordstorm_best") || "0");
    } catch {
      return 0;
    }
  });
  const [M, setM] = React.useState(1);
  const [E, setE] = React.useState("");
  const [A, setA] = React.useState("");
  const [expression, setExpression] = React.useState("neutral");
  const [I, setI] = React.useState(0);
  const oeRef = React.useRef(0);
  const RRef = React.useRef(null);
  const ne = g();
  const [le, setLe] = React.useState(false);
  const [ie, setIe] = React.useState(false);
  const [L, setL] = React.useState(false);
  const z = React.useCallback((t, s = 1500) => {
    setExpression(t);
    setTimeout(() => setExpression("neutral"), s);
  }, []);
  const F = React.useCallback((t) => {
    playClick();
    let s = t ? a(t) : a();
    if (s.length === 0) {
      setA(
        'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
      );
      return;
    }
    const x = Ye(
      s
        .filter((a) => a.espanol && a.chino)
        .map((a) => ({
          espanol: Ce(a.espanol),
          chino: a.chino,
        }))
        .filter((a) => a.espanol.length >= 3 && a.espanol.length <= 12),
    );
    if (x.length === 0) {
      setA(
        'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
      );
      return;
    }
    setH(x);
    setU([]);
    oeRef.current = 0;
    setV("");
    setS(0);
    setJ(3);
    setM(1);
    setE("");
    setA("");
    setI(0);
    setF("playing");
    setExpression("excited");
    setTimeout(() => setExpression("neutral"), 2000);
  }, []);
  React.useEffect(() => {
    if (f !== "playing") {
      return;
    }
    const t = Math.max(1500, 3500 - (M - 1) * 150);
    const s = setInterval(() => {
      if (h.length === 0) {
        return;
      }
      const x = h[Math.floor(Math.random() * h.length)];
      const RRef_current = RRef.current;
      const d = RRef_current ? RRef_current.clientWidth : 800;
      const g = RRef_current ? RRef_current.clientHeight : 500;
      const c = {
        id: Date.now() + Math.random(),
        espanol: x.espanol,
        chino: x.chino,
        z: -800,
        x: Math.random() * (d - 120) + 60,
        y: Math.random() * (g - 100) + 50,
        rotateX: Math.random() * 360,
        rotateY: Math.random() * 360,
        speed: 1.5 + M * 0.3 + Math.random() * 0.5,
        hit: false,
      };
      setU((y) => [...y, c].slice(-12));
    }, t);
    return () => clearInterval(s);
  }, [f, M, h]);
  React.useEffect(() => {
    if (f !== "playing") {
      return;
    }
    const t = setInterval(() => {
      let s = 0;
      setU((x) =>
        x
          .map((a) => {
            const z_1 = a.z + a.speed * 4;
            if (z_1 >= 0 && !a.hit) {
              return (
                s++,
                {
                  ...a,
                  z: z_1,
                  hit: true,
                }
              );
            }
            return {
              ...a,
              z: z_1,
            };
          })
          .filter((a) => a.z < 200),
      );
      if (s > 0) {
        playWrong();
        setI(0);
        z("sad", 1200);
        setIe(true);
        setTimeout(() => setIe(false), 400);
        setJ((x) => {
          const a = Math.max(0, x - s);
          if (a <= 0) {
            playLose();
            setF("gameover");
            setExpression("sad");
            setAe((d) => {
              const g = Math.max(d, S);
              localStorage.setItem("wordstorm_best", String(g));
              return g;
            });
          }
          return a;
        });
      }
    }, 50);
    return () => clearInterval(t);
  }, [f, S]);
  const V = (t) => {
    const s = t
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^A-ZÑ]/g, "")
      .trim();
    setV(s);
    if (!s) {
      return;
    }
    const x = u.findIndex((a) => a.espanol === s && !a.hit);
    if (x >= 0) {
      playCorrect();
      const a = u[x];
      const d = document.getElementById(`storm-word-${a.id}`);
      if (d) {
        const c = d.getBoundingClientRect();
        Xe(c.left + c.width / 2, c.top + c.height / 2);
      }
      setU((c) => c.filter((y, T) => T !== x));
      const g = 100 + Math.floor(Math.abs(a.z) / 10);
      setS((c) => c + g);
      setM((c) => Math.min(c + 1, 20));
      setV("");
      setI((c) => {
        const y = c + 1;
        if (y >= 3) {
          z("excited", 1200);
          ze();
          setE(`¡Racha x${y}! / 连击 x${y}! 🔥`);
        } else {
          z("happy", 800);
          setE("¡Destruido! / 击毁！ 💥");
        }
        return y;
      });
      setTimeout(() => setE(""), 800);
      setLe(true);
      setL(true);
      setTimeout(() => setLe(false), 250);
      setTimeout(() => setL(false), 800);
    }
  };
  const onKeyDown = (t) => {
    if (t.key === "Enter") {
      V(v);
    }
  };
  if (f === "select") {
    return (
      <StarfieldBackground>
        <div className="max-w-5xl mx-auto px-4 py-6 min-h-screen">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/juegos"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
            >
              <ArrowLeftIcon size={16} /> Volver / 返回
            </Link>
            <SoundToggles />
          </div>
          <div className="text-center mb-10">
            <h1
              className="text-4xl md:text-5xl font-black mb-3"
              style={{
                textShadow: "0 0 40px rgba(0,212,255,0.3), 0 0 80px rgba(255,0,170,0.15)",
              }}
            >
              <WindIcon size={36} className="inline mr-3 animate-pulse" /> Word Storm
            </h1>
            <p className="text-white/40 text-sm font-medium">
              Selecciona un módulo para jugar / 选择模块开始游戏
            </p>
            {A && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold animate-shake"
                style={{
                  background: "rgba(255,68,68,.12)",
                  border: "1px solid rgba(255,68,68,.3)",
                  color: "#ff6b35",
                }}
              >
                {A}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => {
                playClick();
                setA("");
                F(null);
              }}
              className="group rounded-xl p-5 text-left transition-all hover:scale-[1.02] hover:-translate-y-0.5"
              style={{
                background: "rgba(14,22,64,.6)",
                border: "1px solid rgba(255,0,170,.3)",
                transform: "translateZ(20px)",
                perspective: "800px",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                  boxShadow: "0 0 20px rgba(255,0,170,.3), 0 0 40px rgba(255,0,170,.15)",
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
            {ne.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  playClick();
                  setA("");
                  F(t.id);
                }}
                className="group rounded-xl p-5 text-left transition-all hover:scale-[1.02] hover:-translate-y-0.5"
                style={{
                  background: "rgba(14,22,64,.6)",
                  border: `1px solid ${t.color}40`,
                  transform: "translateZ(20px)",
                  perspective: "800px",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
                    boxShadow: `0 0 20px ${t.color}30, 0 0 40px ${t.color}15`,
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
          <Te1Component expression="neutral" />
        </div>
        <style>{`
          @keyframes mascotBounce { from { transform: translateY(0) } to { transform: translateY(-12px) } }
          @keyframes mascotBounceExcited { from { transform: translateY(0) scale(1) } to { transform: translateY(-18px) scale(1.1) } }
          @keyframes mascotSway { from { transform: translateY(0) rotate(-3deg) } to { transform: translateY(-4px) rotate(3deg) } }
          @keyframes mascotFloat { from { transform: translateY(0) } to { transform: translateY(-8px) } }
          @keyframes mascotGlow { from { filter: drop-shadow(0 0 12px currentColor) drop-shadow(0 0 30px currentColor) } to { filter: drop-shadow(0 0 20px currentColor) drop-shadow(0 0 50px currentColor) } }
          @keyframes stormLetterPulse { from { opacity: 0.6; text-shadow: 0 0 5px currentColor } to { opacity: 1; text-shadow: 0 0 15px currentColor, 0 0 30px currentColor } }
          @keyframes overlayPop { 0%{transform:scale(0.8) rotateX(10deg);opacity:0} 100%{transform:scale(1) rotateX(5deg);opacity:1} }
          @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
          .animate-shake { animation: shake 0.4s ease-in-out; }
        `}</style>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <div
        className={`max-w-5xl mx-auto px-4 py-6 min-h-screen relative z-10 ${ie ? "animate-thunder-shake" : ""}`}
      >
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
          >
            <ArrowLeftIcon size={16} /> Volver / 返回
          </Link>
          <div className="flex items-center gap-2 flex-wrap">
            <SoundToggles />
            <button
              onClick={() => {
                playClick();
                setF("select");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "#fff",
              }}
            >
              <WindIcon size={12} /> Cambiar / 切换
            </button>
            <div
              className="px-4 py-2 rounded-2xl text-xs font-black transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, rgba(255,0,170,.15), rgba(0,212,255,.15))",
                border: "1px solid rgba(255,0,170,.3)",
                color: "#ff00aa",
                boxShadow:
                  "0 0 15px rgba(255,0,170,.2), 0 0 30px rgba(0,212,255,.1), inset 0 0 15px rgba(255,0,170,.05)",
                transform: "translateZ(30px) rotateX(5deg)",
                perspective: "600px",
                textShadow: "0 0 10px rgba(255,0,170,.5)",
                animation: "scoreFloat 3s ease-in-out infinite alternate",
              }}
            >
              <ZapIcon size={12} className="inline mr-1" /> {S}
            </div>
            <div
              className="px-4 py-2 rounded-2xl text-xs font-black transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, rgba(255,68,68,.15), rgba(255,107,53,.15))",
                border: "1px solid rgba(255,68,68,.3)",
                color: "#ff4444",
                boxShadow:
                  "0 0 15px rgba(255,68,68,.2), 0 0 30px rgba(255,107,53,.1), inset 0 0 15px rgba(255,68,68,.05)",
                transform: "translateZ(30px) rotateX(5deg)",
                perspective: "600px",
                textShadow: "0 0 10px rgba(255,68,68,.5)",
                animation: "scoreFloat 3s ease-in-out infinite alternate 0.5s",
              }}
            >
              <HeartIcon size={12} className="inline mr-1" /> {j}
            </div>
            <div
              className="px-4 py-2 rounded-2xl text-xs font-black transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, rgba(57,255,20,.15), rgba(0,212,255,.15))",
                border: "1px solid rgba(57,255,20,.3)",
                color: "#39ff14",
                boxShadow:
                  "0 0 15px rgba(57,255,20,.2), 0 0 30px rgba(0,212,255,.1), inset 0 0 15px rgba(57,255,20,.05)",
                transform: "translateZ(30px) rotateX(5deg)",
                perspective: "600px",
                textShadow: "0 0 10px rgba(57,255,20,.5)",
                animation: "scoreFloat 3s ease-in-out infinite alternate 1s",
              }}
            >
              <SparklesIcon size={12} className="inline mr-1" /> Nivel {M}
            </div>
            {I >= 2 && (
              <div
                className="px-3 py-1.5 rounded-full text-xs font-bold transition-all animate-pulse"
                style={{
                  background: "rgba(255,214,0,.1)",
                  border: "1px solid rgba(255,214,0,.2)",
                  color: "#ffd600",
                  boxShadow: "0 0 10px rgba(255,214,0,.2), 0 0 25px rgba(255,214,0,.1)",
                  transform: "translateZ(20px)",
                  textShadow: "0 0 8px rgba(255,214,0,.5)",
                }}
              >
                🔥 x{I}
              </div>
            )}
          </div>
        </div>
        <div className="text-center mb-4">
          <h1
            className="text-3xl md:text-4xl font-black mb-2"
            style={{
              background: "linear-gradient(135deg,#ff00aa,#ff3860,#ffd600)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 20px rgba(255,0,170,.3))",
            }}
          >
            Word Storm
          </h1>
          <p className="text-white/40 text-xs font-medium">
            Escribe la palabra en ESPAÑOL antes de que te golpee / 在被击中前输入西班牙语单词
          </p>
        </div>
        <div className="flex items-center justify-center gap-1 mb-4">
          {Array.from({
            length: 3,
          }).map((t, s) => (
            <HeartIcon
              key={s}
              size={20}
              className={s < j ? "animate-pulse" : ""}
              style={{
                color: s < j ? "#ff4444" : "rgba(255,255,255,.15)",
                fill: s < j ? "#ff4444" : "transparent",
                transition: "all 0.3s",
                filter: s < j ? "drop-shadow(0 0 8px rgba(255,68,68,.5))" : "none",
              }}
            />
          ))}
        </div>
        <div
          ref={RRef}
          className="relative mx-auto rounded-3xl overflow-hidden border border-white/10 transition-all"
          style={{
            height: "clamp(320px, 60vh, 500px)",
            perspective: "1000px",
            background: "linear-gradient(180deg, rgba(8,12,40,.8), rgba(3,5,20,.9))",
            backdropFilter: "blur(14px)",
            boxShadow:
              "0 0 40px rgba(255,0,170,.1), 0 0 80px rgba(0,212,255,.05), 0 20px 60px rgba(0,0,0,.4)",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(255,0,170,.08), transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(0,212,255,.06), transparent 50%), radial-gradient(ellipse at 80% 60%, rgba(184,41,221,.05), transparent 50%)",
              animation: "stormBg 4s ease-in-out infinite alternate",
            }}
          />
          {le && (
            <div
              key={`lightning-${Date.now()}`}
              className="absolute inset-0 pointer-events-none z-50"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,.9), rgba(0,212,255,.6), rgba(184,41,221,.3))",
                mixBlendMode: "screen",
                animation: "lightningFlash 0.25s ease-out forwards",
              }}
            />
          )}
          {Te.map((t, s) => (
            <div
              key={`cloud-${s}`}
              className="absolute pointer-events-none"
              style={{
                left: `${t.left}%`,
                top: `${t.top}%`,
                width: `${t.width}%`,
                height: `${t.height}%`,
                background: `radial-gradient(ellipse, rgba(30,30,60,${t.opacity}), transparent 70%)`,
                filter: "blur(20px)",
                animation: `cloudDrift ${t.duration}s ease-in-out infinite alternate ${t.delay}s`,
                borderRadius: "50%",
              }}
            />
          ))}
          <div
            className="absolute top-0 left-1/4 w-px h-24 pointer-events-none opacity-0"
            style={{
              background: "linear-gradient(180deg, transparent, #00d4ff, #fff, transparent)",
              boxShadow: "0 0 20px #00d4ff, 0 0 40px #00d4ff",
              animation: "lightningBolt 3s ease-in-out infinite",
              animationDelay: "0.5s",
            }}
          />
          <div
            className="absolute top-0 left-2/3 w-px h-32 pointer-events-none opacity-0"
            style={{
              background: "linear-gradient(180deg, transparent, #ff00aa, #fff, transparent)",
              boxShadow: "0 0 20px #ff00aa, 0 0 40px #ff00aa",
              animation: "lightningBolt 4s ease-in-out infinite",
              animationDelay: "2s",
            }}
          />
          <div
            className="absolute top-0 left-1/2 w-px h-20 pointer-events-none opacity-0"
            style={{
              background: "linear-gradient(180deg, transparent, #ffd600, #fff, transparent)",
              boxShadow: "0 0 20px #ffd600, 0 0 40px #ffd600",
              animation: "lightningBolt 2.5s ease-in-out infinite",
              animationDelay: "1.2s",
            }}
          />
          {Fe.map((t, s) => (
            <div
              key={`rain-${s}`}
              className="absolute pointer-events-none"
              style={{
                left: `${t.left}%`,
                top: "-5%",
                width: "1px",
                height: `${t.height}px`,
                background: `linear-gradient(180deg, transparent, rgba(0,212,255,${t.opacity}), rgba(0,212,255,${t.opacity * 0.5}))`,
                borderRadius: "1px",
                boxShadow: `0 0 3px rgba(0,212,255,${t.opacity})`,
                animation: `rainFall ${t.duration}s linear infinite`,
                animationDelay: `${t.delay}s`,
              }}
            />
          ))}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,212,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,.15) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div
            className="absolute bottom-0 left-1/2 pointer-events-none"
            style={{
              transform: "translateX(-50%) translateZ(60px) rotateX(15deg)",
              perspective: "800px",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              style={{
                width: "180px",
                height: "60px",
                background: "linear-gradient(180deg, rgba(0,212,255,.12), rgba(0,212,255,.04))",
                border: "2px solid rgba(0,212,255,.35)",
                borderRadius: "90px 90px 0 0",
                boxShadow:
                  "0 0 30px rgba(0,212,255,.15), 0 0 60px rgba(0,212,255,.05), inset 0 0 20px rgba(0,212,255,.05)",
              }}
            >
              <div className="flex items-center justify-center h-full">
                <ShieldIcon
                  size={20}
                  style={{
                    color: "rgba(0,212,255,.7)",
                    filter: "drop-shadow(0 0 8px rgba(0,212,255,.5))",
                  }}
                />
              </div>
            </div>
            <div
              className="absolute -top-14 left-1/2"
              style={{
                transform: "translateX(-50%)",
                width: "220px",
                height: "110px",
                borderRadius: "110px 110px 0 0",
                border: "2px solid rgba(57,255,20,0.25)",
                background: `radial-gradient(ellipse at 50% 100%, rgba(57,255,20,${L ? "0.25" : "0.08"}), transparent 70%)`,
                boxShadow: L
                  ? "0 0 50px rgba(57,255,20,.4), 0 0 80px rgba(57,255,20,.2), 0 0 120px rgba(57,255,20,.1), inset 0 0 30px rgba(57,255,20,.1)"
                  : "0 0 25px rgba(57,255,20,.15), 0 0 50px rgba(57,255,20,.05), inset 0 0 15px rgba(57,255,20,.05)",
                transition: "all 0.3s ease-out",
              }}
            />
            <div
              className="absolute bottom-0 -left-2"
              style={{
                width: "4px",
                height: "70px",
                background: "linear-gradient(180deg, rgba(0,212,255,.6), rgba(0,212,255,.1))",
                boxShadow: "0 0 15px rgba(0,212,255,.4)",
                borderRadius: "2px",
              }}
            />
            <div
              className="absolute bottom-0 -right-2"
              style={{
                width: "4px",
                height: "70px",
                background: "linear-gradient(180deg, rgba(255,0,170,.6), rgba(255,0,170,.1))",
                boxShadow: "0 0 15px rgba(255,0,170,.4)",
                borderRadius: "2px",
              }}
            />
          </div>
          {u.map((t) => {
            const s = Math.max(0.3, Math.min(1.5, (t.z + 800) / 800));
            const opacity = Math.max(0.2, Math.min(1, (t.z + 800) / 600));
            const a = t.z > -100;
            const d = t.z > -50;
            const color = d ? "#ff4444" : a ? "#ff6b6b" : "#fff";
            const background = d ? "rgba(255,68,68,.35)" : a ? "rgba(255,68,68,.2)" : "rgba(0,212,255,.18)";
            const border = d
              ? "2px solid rgba(255,68,68,.8)"
              : a
                ? "1px solid rgba(255,68,68,.6)"
                : "1px solid rgba(0,212,255,.5)";
            const boxShadow = d
              ? "0 0 40px rgba(255,68,68,.5), 0 0 80px rgba(255,68,68,.2), inset 0 0 20px rgba(255,68,68,.1)"
              : a
                ? "0 0 30px rgba(255,68,68,.4), 0 0 60px rgba(255,68,68,.15)"
                : "0 0 20px rgba(0,212,255,.3), 0 0 40px rgba(0,212,255,.15), inset 0 0 15px rgba(0,212,255,.05)";
            const zIndex = Math.floor(t.z + 1000);
            const xe = a
              ? "wordShake 0.3s ease-in-out infinite alternate"
              : "wordWindToss 2.5s ease-in-out infinite alternate";
            const { rotateX, rotateY, z, x: x_1, y: y_1 } = t;
            return (
              <div
                key={t.id}
                id={`storm-word-${t.id}`}
                className="absolute flex flex-col items-center justify-center px-4 py-3 rounded-2xl font-black text-sm pointer-events-none"
                style={{
                  left: x_1,
                  top: y_1,
                  transform: `translateZ(${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${s})`,
                  opacity,
                  background,
                  border,
                  color: "#fff",
                  boxShadow,
                  textShadow: `0 0 10px rgba(255,255,255,.5), 0 0 20px ${color}40`,
                  transition: "transform 0.05s linear",
                  zIndex,
                  animation: xe,
                  transformStyle: "preserve-3d",
                }}
              >
                <span
                  className="text-xs mb-1"
                  style={{
                    color: "rgba(255,214,0,.9)",
                    textShadow: "0 0 6px rgba(255,214,0,.5), 0 0 12px rgba(255,214,0,.3)",
                  }}
                >
                  <CrosshairIcon size={12} className="inline mr-1" />
                  {t.chino}
                </span>
                <span className="text-lg tracking-widest">
                  {t.espanol.split("").map((he, _) => {
                    const ue = _ * 0.05;
                    return (
                      <span
                        key={_}
                        style={{
                          animation: `stormLetterPulse 0.8s ease-in-out ${ue}s infinite alternate`,
                          color,
                          textShadow: `0 0 8px ${color}80, 0 0 16px ${color}40`,
                        }}
                      >
                        {he}
                      </span>
                    );
                  })}
                </span>
                {d && (
                  <div
                    className="absolute -inset-1 rounded-2xl animate-ping opacity-30"
                    style={{
                      border: "2px solid rgba(255,68,68,.6)",
                    }}
                  />
                )}
                <div
                  className="absolute -left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{
                    width: "20px",
                    height: "2px",
                    background: `linear-gradient(90deg, ${color}60, transparent)`,
                    borderRadius: "1px",
                    opacity: 0.5,
                    animation: "windTrail 1s linear infinite",
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="mt-4 max-w-md mx-auto relative">
          <input
            type="text"
            value={v}
            onChange={(t) => V(t.target.value)}
            onKeyDown={onKeyDown}
            className="w-full px-6 py-4 rounded-2xl font-black text-lg text-center bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#ff00aa] transition-all"
            style={{
              boxShadow:
                "0 0 20px rgba(255,0,170,.1), 0 0 40px rgba(255,0,170,.05), inset 0 0 20px rgba(255,0,170,.02)",
              textShadow: "0 0 10px rgba(255,255,255,.2)",
            }}
            placeholder="Escribe en español / 输入西班牙语..."
            autoFocus
          />
          {v.length > 0 && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{
                  background: "#ff00aa",
                  boxShadow: "0 0 10px #ff00aa, 0 0 20px rgba(255,0,170,.5)",
                }}
              />
            </div>
          )}
        </div>
        {E && (
          <div
            className="text-center mt-3 text-sm font-black animate-bounce transition-all"
            style={{
              color: "#39ff14",
              textShadow:
                "0 0 10px rgba(57,255,20,.5), 0 0 20px rgba(57,255,20,.3), 0 0 40px rgba(57,255,20,.2)",
            }}
          >
            {E}
          </div>
        )}
        {f === "gameover" && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.92)",
              backdropFilter: "blur(25px)",
            }}
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div
                className="absolute top-1/4 left-1/4 w-px h-40 opacity-40"
                style={{
                  background: "linear-gradient(180deg, transparent, #ff00aa, #fff, transparent)",
                  boxShadow: "0 0 30px #ff00aa, 0 0 60px #ff00aa",
                  animation: "lightningBolt 2s ease-in-out infinite",
                }}
              />
              <div
                className="absolute top-1/3 right-1/3 w-px h-48 opacity-30"
                style={{
                  background: "linear-gradient(180deg, transparent, #00d4ff, #fff, transparent)",
                  boxShadow: "0 0 30px #00d4ff, 0 0 60px #00d4ff",
                  animation: "lightningBolt 2.5s ease-in-out infinite",
                  animationDelay: "0.8s",
                }}
              />
            </div>
            <div
              className="text-center p-8 rounded-3xl max-w-sm mx-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(14,22,64,.85), rgba(5,8,27,.7))",
                border: "1px solid rgba(255,0,170,.25)",
                boxShadow:
                  "0 0 60px rgba(255,0,170,.2), 0 0 120px rgba(255,0,170,.08), 0 0 200px rgba(0,212,255,.05)",
                animation: "overlayPop 0.5s cubic-bezier(.2,.9,.2,1)",
                transform: "rotateX(5deg)",
                perspective: "800px",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-60"
                style={{
                  background: "linear-gradient(135deg,#ff00aa,#ff3860)",
                  filter: "blur(25px)",
                }}
              />
              <TrophyIcon
                size={56}
                className="mx-auto mb-4 animate-bounce"
                style={{
                  color: "#ffd600",
                  filter: "drop-shadow(0 0 15px rgba(255,214,0,.6)) drop-shadow(0 0 30px rgba(255,214,0,.3))",
                }}
              />
              <h2
                className="text-3xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg,#ff00aa,#ff3860,#ffd600)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 20px rgba(255,0,170,.3))",
                }}
              >
                ¡Tormenta Terminada!
              </h2>
              <p className="text-white/50 text-sm mb-6">风暴结束了！</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div
                  className="p-4 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(255,0,170,.08)",
                    border: "1px solid rgba(255,0,170,.2)",
                    boxShadow: "0 0 25px rgba(255,0,170,.1), inset 0 0 20px rgba(255,0,170,.05)",
                    transform: "translateZ(20px) rotateY(-5deg)",
                    perspective: "600px",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,0,170,.1), transparent 60%)",
                    }}
                  />
                  <ZapIcon
                    size={16}
                    style={{
                      color: "#ff00aa",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 6px rgba(255,0,170,.5))",
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
                      color: "#ff00aa",
                      textShadow: "0 0 10px rgba(255,0,170,.5)",
                    }}
                  >
                    {S}
                  </p>
                </div>
                <div
                  className="p-4 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(255,214,0,.08)",
                    border: "1px solid rgba(255,214,0,.2)",
                    boxShadow: "0 0 25px rgba(255,214,0,.1), inset 0 0 20px rgba(255,214,0,.05)",
                    transform: "translateZ(20px) rotateY(5deg)",
                    perspective: "600px",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,214,0,.1), transparent 60%)",
                    }}
                  />
                  <TrophyIcon
                    size={16}
                    style={{
                      color: "#ffd600",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 6px rgba(255,214,0,.5))",
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
                      textShadow: "0 0 10px rgba(255,214,0,.5)",
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
                    F(null);
                  }}
                  className="px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg,#ff00aa,#ff3860)",
                    boxShadow:
                      "0 0 25px rgba(255,0,170,.4), 0 0 50px rgba(255,0,170,.2), 0 0 80px rgba(255,0,170,.1)",
                    textShadow: "0 0 10px rgba(255,255,255,.3)",
                  }}
                >
                  Jugar de nuevo / 再玩一次
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setF("select");
                  }}
                  className="px-4 py-3 rounded-full text-xs font-bold transition-all hover:scale-105"
                  style={{
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(255,255,255,.12)",
                    color: "#fff",
                    boxShadow: "0 0 15px rgba(255,255,255,.05)",
                  }}
                >
                  Cambiar / 切换
                </button>
              </div>
              <P currentGameId="word-storm" />
            </div>
          </div>
        )}
        <Te1Component expression={expression} />
        <style>{`
          @keyframes stormLetterPulse { from { opacity: 0.6; text-shadow: 0 0 5px currentColor } to { opacity: 1; text-shadow: 0 0 15px currentColor, 0 0 30px currentColor } }
          @keyframes overlayPop { 0%{transform:scale(0.8) rotateX(10deg);opacity:0} 100%{transform:scale(1) rotateX(5deg);opacity:1} }
          @keyframes mascotBounce { from { transform: translateY(0) } to { transform: translateY(-12px) } }
          @keyframes mascotBounceExcited { from { transform: translateY(0) scale(1) } to { transform: translateY(-18px) scale(1.1) } }
          @keyframes mascotSway { from { transform: translateY(0) rotate(-3deg) } to { transform: translateY(-4px) rotate(3deg) } }
          @keyframes mascotFloat { from { transform: translateY(0) } to { transform: translateY(-8px) } }
          @keyframes mascotGlow { from { filter: drop-shadow(0 0 12px currentColor) drop-shadow(0 0 30px currentColor) } to { filter: drop-shadow(0 0 20px currentColor) drop-shadow(0 0 50px currentColor) } }
          @keyframes wordShake { from { transform: translateX(-2px) } to { transform: translateX(2px) } }
          @keyframes wordFloat { from { transform: translateY(0) } to { transform: translateY(-4px) } }
          @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
          .animate-shake { animation: shake 0.4s ease-in-out; }
          
          /* New Storm Effects */
          @keyframes stormBg { 
            0% { opacity: 0.7; transform: scale(1) } 
            100% { opacity: 1; transform: scale(1.05) } 
          }
          @keyframes lightningFlash { 
            0% { opacity: 0.9 } 
            20% { opacity: 0.3 } 
            40% { opacity: 0.8 } 
            60% { opacity: 0.2 } 
            100% { opacity: 0 } 
          }
          @keyframes lightningBolt { 
            0%, 90% { opacity: 0 } 
            92% { opacity: 1; transform: scaleY(1) } 
            94% { opacity: 0.3; transform: scaleY(1.2) } 
            96% { opacity: 1 } 
            100% { opacity: 0; transform: scaleY(1) } 
          }
          @keyframes rainFall { 
            0% { transform: translateY(0) translateZ(0) rotate(0deg); opacity: 0 } 
            10% { opacity: 1 } 
            90% { opacity: 0.8 } 
            100% { transform: translateY(500px) translateZ(20px) rotate(5deg); opacity: 0 } 
          }
          @keyframes cloudDrift { 
            0% { transform: translateX(-20px) scale(1) } 
            100% { transform: translateX(20px) scale(1.05) } 
          }
          @keyframes scoreFloat { 
            0% { transform: translateZ(30px) rotateX(5deg) translateY(0) } 
            100% { transform: translateZ(30px) rotateX(5deg) translateY(-4px) } 
          }
          @keyframes wordWindToss { 
            0% { transform: translateX(0) translateY(0) rotateZ(0deg) } 
            25% { transform: translateX(3px) translateY(-2px) rotateZ(1deg) } 
            50% { transform: translateX(-2px) translateY(1px) rotateZ(-1deg) } 
            75% { transform: translateX(1px) translateY(-1px) rotateZ(0.5deg) } 
            100% { transform: translateX(-1px) translateY(2px) rotateZ(-0.5deg) } 
          }
          @keyframes windTrail { 
            0% { transform: scaleX(0); opacity: 0 } 
            50% { transform: scaleX(1); opacity: 0.5 } 
            100% { transform: scaleX(0); opacity: 0 } 
          }
          @keyframes thunderShake { 
            0%, 100% { transform: translateX(0) translateY(0) } 
            10% { transform: translateX(-8px) translateY(2px) } 
            20% { transform: translateX(6px) translateY(-2px) } 
            30% { transform: translateX(-4px) translateY(1px) } 
            40% { transform: translateX(4px) translateY(-1px) } 
            50% { transform: translateX(-2px) translateY(0) } 
            60% { transform: translateX(2px) translateY(0) } 
            70% { transform: translateX(-1px) translateY(0) } 
            80% { transform: translateX(1px) translateY(0) } 
            90% { transform: translateX(0) translateY(0) } 
          }
          .animate-thunder-shake { animation: thunderShake 0.4s ease-in-out; }
          @keyframes shieldPulse { 
            0% { box-shadow: 0 0 25px rgba(57,255,20,.15), 0 0 50px rgba(57,255,20,.05) } 
            50% { box-shadow: 0 0 60px rgba(57,255,20,.5), 0 0 100px rgba(57,255,20,.3) } 
            100% { box-shadow: 0 0 25px rgba(57,255,20,.15), 0 0 50px rgba(57,255,20,.05) } 
          }
        `}</style>
      </div>
    </StarfieldBackground>
  );
}
export { DeComponent as default };
