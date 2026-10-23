import {
  BookOpenIcon,
  ZapIcon,
  StarIcon,
  SparklesIcon,
  HeartIcon,
  TrophyIcon,
  ArrowLeftIcon,
  WandSparklesIcon,
  LayersIcon,
  TimerIcon,
  FlameIcon,
  PartyPopperIcon,
  RotateCcwIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g, a as a_1 } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
const se = 90;
const re = [
  "#00d4ff",
  "#ff00aa",
  "#ffd600",
  "#39ff14",
  "#ff6b35",
  "#b829dd",
  "#ff4757",
  "#2ed573",
  "#ffa502",
  "#7bed9f",
];
function B(l) {
  const d = [...l];
  for (let n = d.length - 1; n > 0; n--) {
    const u = Math.floor(Math.random() * (n + 1));
    [d[n], d[u]] = [d[u], d[n]];
  }
  return d;
}
function Se(espanol) {
  return espanol
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-ZÑ]/g, "")
    .trim();
}
function Me(espanol) {
  const l_length = espanol.length;
  if (l_length <= 4) {
    return [espanol.slice(0, Math.floor(l_length / 2)), espanol.slice(Math.floor(l_length / 2))];
  }
  if (l_length <= 7) {
    return [espanol.slice(0, 2), espanol.slice(2, 4), espanol.slice(4)];
  }
  return [espanol.slice(0, 3), espanol.slice(3, 5), espanol.slice(5)];
}
function ze(l, d) {
  const n = ["#00d4ff", "#ff00aa", "#ffd600", "#39ff14", "#ff6b35", "#b829dd", "#ff4757", "#2ed573"];
  for (let u = 0; u < 80; u++) {
    const o = document.createElement("div");
    const t = 4 + Math.random() * 8;
    const m = Math.random() > 0.5 ? "50%" : "2px";
    o.style.cssText = `position:fixed;left:${l}px;top:${d}px;width:${t}px;height:${t}px;border-radius:${m};background:${n[u % n.length]};pointer-events:none;z-index:9999;box-shadow:0 0 6px ${n[u % n.length]};`;
    document.body.appendChild(o);
    const x = Math.random() * Math.PI * 2;
    const r = 2 + Math.random() * 16;
    let b = Math.cos(x) * r;
    let k = Math.sin(x) * r;
    let v = 1;
    let N = 0;
    let $ = (Math.random() - 0.5) * 20;
    const S = () => {
      b *= 0.94;
      k *= 0.94;
      k += 0.35;
      N += $;
      o.style.left = `${parseFloat(o.style.left) + b}px`;
      o.style.top = `${parseFloat(o.style.top) + k}px`;
      o.style.transform = `rotate(${N}deg)`;
      v -= 0.015;
      o.style.opacity = String(v);
      if (v > 0) {
        requestAnimationFrame(S);
      } else {
        o.remove();
      }
    };
    requestAnimationFrame(S);
  }
}
function Ne1Component({ mood }) {
  const n = {
    happy: {
      eye: "M-6,-2 Q-3,2 0,-2 Q3,2 6,-2",
      mouth: "M-4,6 Q0,10 4,6",
      blush: 1,
      star: 0,
      sweat: 0,
      tear: 0,
      brow: 0,
    },
    sad: {
      eye: "M-6,2 Q-3,-2 0,2 Q3,-2 6,2",
      mouth: "M-4,8 Q0,4 4,8",
      blush: 0,
      star: 0,
      sweat: 0,
      tear: 1,
      brow: 1,
    },
    excited: {
      eye: "M-6,-3 L-2,-3 L-4,-7 Z M2,-3 L6,-3 L4,-7 Z",
      mouth: "M-4,5 Q0,11 4,5",
      blush: 1,
      star: 1,
      sweat: 0,
      tear: 0,
      brow: 0,
    },
    neutral: {
      eye: "M-6,0 L-2,0 M2,0 L6,0",
      mouth: "M-3,6 L3,6",
      blush: 0,
      star: 0,
      sweat: 0,
      tear: 0,
      brow: 0,
    },
    think: {
      eye: "M-6,-1 Q-3,1 0,-1 Q3,1 6,-1",
      mouth: "M-2,6 L2,6",
      blush: 0,
      star: 0,
      sweat: 1,
      tear: 0,
      brow: 0,
    },
  }[mood];
  return (
    <div
      className="fixed bottom-4 right-4 z-50 pointer-events-none"
      style={{
        animation: "mascotBounce 3s ease-in-out infinite",
      }}
    >
      <svg width="80" height="80" viewBox="0 0 80 80" className="drop-shadow-[0_0_12px_rgba(255,0,170,0.5)]">
        <defs>
          <linearGradient id="gradBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff7eb3" />
            <stop offset="100%" stopColor="#ff00aa" />
          </linearGradient>
          <linearGradient id="gradEar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffd6e8" />
            <stop offset="100%" stopColor="#ff7eb3" />
          </linearGradient>
        </defs>
        <path d="M22,18 Q16,-6 30,14" fill="url(#gradEar)" stroke="#ff00aa" strokeWidth="2" />
        <path d="M58,18 Q64,-6 50,14" fill="url(#gradEar)" stroke="#ff00aa" strokeWidth="2" />
        <ellipse cx="40" cy="46" rx="28" ry="24" fill="url(#gradBody)" stroke="#ff00aa" strokeWidth="2" />
        <g transform="translate(40,42) scale(0.9)">
          <path d={n.eye} fill="none" stroke="#2d0a1e" strokeWidth="2.5" strokeLinecap="round" />
          <path d={n.mouth} fill="none" stroke="#2d0a1e" strokeWidth="2.5" strokeLinecap="round" />
          {n.blush > 0 && (
            <>
              <circle cx="-12" cy="4" r="4" fill="#ff99cc" opacity="0.6" />
              <circle cx="12" cy="4" r="4" fill="#ff99cc" opacity="0.6" />
            </>
          )}
          {n.tear > 0 && (
            <path d="M-8,6 Q-10,12 -8,14 Q-6,12 -8,6" fill="#00d4ff" opacity="0.8">
              <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite" />
            </path>
          )}
          {n.sweat > 0 && (
            <circle cx="14" cy="-6" r="3" fill="#00d4ff" opacity="0.7">
              <animate attributeName="cy" values="-6;2" dur="1.2s" repeatCount="indefinite" />
            </circle>
          )}
        </g>
        <ellipse cx="22" cy="64" rx="6" ry="4" fill="#ffd6e8" />
        <ellipse cx="58" cy="64" rx="6" ry="4" fill="#ffd6e8" />
        {n.star > 0 && (
          <>
            <polygon
              points="10,10 12,16 18,16 13,20 15,26 10,22 5,26 7,20 2,16 8,16"
              fill="#ffd600"
              opacity="0.9"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 10 18"
                to="360 10 18"
                dur="2s"
                repeatCount="indefinite"
              />
            </polygon>
            <polygon
              points="70,14 72,20 78,20 73,24 75,30 70,26 65,30 67,24 62,20 68,20"
              fill="#ffd600"
              opacity="0.9"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 70 24"
                to="-360 70 24"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </polygon>
          </>
        )}
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; 0,-4; 0,0"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </svg>
    </div>
  );
}
function useE() {
  const lRef = React.useRef(null);
  const dRef = React.useRef([]);
  const nRef = React.useRef(0);
  const spawn = React.useCallback((o, t, m) => {
    const x = [
      "#00d4ff",
      "#ff00aa",
      "#ffd600",
      "#39ff14",
      "#ff6b35",
      "#b829dd",
      "#ff4757",
      "#2ed573",
      "#ffa502",
      "#7bed9f",
    ];
    for (let r = 0; r < o; r++) {
      dRef.current.push({
        x: t ?? Math.random() * window.innerWidth,
        y: m ?? Math.random() * window.innerHeight * 0.3,
        vx: (Math.random() - 0.5) * 12,
        vy: Math.random() * 10 + 2,
        life: 1,
        color: x[Math.floor(Math.random() * x.length)],
        size: 3 + Math.random() * 6,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 15,
      });
    }
  }, []);
  React.useEffect(() => {
    const lRef_current = lRef.current;
    if (!lRef_current) {
      return;
    }
    const t = lRef_current.getContext("2d");
    if (!t) {
      return;
    }
    const m = () => {
      lRef_current.width = window.innerWidth;
      lRef_current.height = window.innerHeight;
    };
    m();
    window.addEventListener("resize", m);
    const x = () => {
      t.clearRect(0, 0, lRef_current.width, lRef_current.height);
      dRef.current = dRef.current.filter((r) => {
        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.25;
        r.vx *= 0.98;
        r.life -= 0.008;
        r.rot += r.rotSpeed;
        if (r.life <= 0) {
          return false;
        }
        return (
          t.save(),
          t.translate(r.x, r.y),
          t.rotate((r.rot * Math.PI) / 180),
          (t.fillStyle = r.color),
          (t.globalAlpha = r.life),
          (t.shadowColor = r.color),
          (t.shadowBlur = 10),
          t.fillRect(-r.size / 2, -r.size / 2, r.size, r.size),
          t.restore(),
          true
        );
      });
      nRef.current = requestAnimationFrame(x);
    };
    nRef.current = requestAnimationFrame(x);
    return () => {
      cancelAnimationFrame(nRef.current);
      window.removeEventListener("resize", m);
    };
  }, []);
  return {
    canvasRef: lRef,
    spawn,
  };
}
function GeComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [t, setT] = React.useState("select");
  const [x, setX] = React.useState([]);
  const [b, setB] = React.useState(0);
  const [v, setV] = React.useState([]);
  const [$, set$] = React.useState([]);
  const [y, setY] = React.useState(0);
  const [oe, setOe] = React.useState(0);
  const [T, setT_1] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("wordfusion_best") || "0");
    } catch {
      return 0;
    }
  });
  const [h, setH] = React.useState(se);
  const [L, setL] = React.useState(1);
  const [M, setM] = React.useState("");
  const [I, setI] = React.useState(false);
  const ERef = React.useRef(null);
  const le = g();
  const [O, setO] = React.useState("");
  const { canvasRef, spawn } = useE();
  const [w, setW] = React.useState(false);
  const [ie, setIe] = React.useState(false);
  const mood = React.useMemo(() => {
    if (t === "gameover") {
      if (y > T) {
        return "excited";
      }
      if (y > 0) {
        return "happy";
      }
      return "neutral";
    }
    if (t === "select") {
      return "neutral";
    }
    if (w) {
      return "sad";
    }
    if (I) {
      return "excited";
    }
    if (v.length > 0) {
      return "think";
    }
    return "happy";
  }, [t, y, T, w, I, v.length]);
  const A = React.useCallback((a) => {
    playClick();
    let i = a ? a_1(a) : a_1();
    if (i.length === 0) {
      setO(
        'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
      );
      return;
    }
    const c = B(
      i
        .filter((f) => f.espanol && f.chino)
        .map((f) => {
          const espanol = Se(f.espanol);
          return {
            id: 0,
            espanol,
            chino: f.chino,
            parts: Me(espanol),
          };
        })
        .filter((f) => f.espanol.length >= 4 && f.espanol.length <= 9),
    );
    const j = [];
    const g = new Set();
    for (const f of c) {
      if (!g.has(f.espanol)) {
        g.add(f.espanol);
        j.push({
          ...f,
          id: j.length,
        });
      }
    }
    setX(j.slice(0, 20));
    setB(0);
    setY(0);
    setOe(0);
    setH(se);
    setL(1);
    setM("");
    setT("playing");
    setW(false);
  }, []);
  React.useEffect(() => {
    if (t === "playing" && h > 0) {
      ERef.current = setInterval(() => setH((a) => a - 1), 1000);
      return () => {
        if (ERef.current) {
          clearInterval(ERef.current);
        }
      };
    }
  }, [t, h]);
  React.useEffect(() => {
    if (t === "playing" && h <= 0) {
      playLose();
      setT("gameover");
      setT_1((a) => {
        const i = Math.max(a, y);
        localStorage.setItem("wordfusion_best", String(i));
        return i;
      });
    }
  }, [t, h, y]);
  React.useEffect(() => {
    if (t !== "playing" || x.length === 0) {
      return;
    }
    const a = x[b];
    if (!a) {
      playWin();
      setT("gameover");
      setT_1((i) => {
        const c = Math.max(i, y);
        localStorage.setItem("wordfusion_best", String(c));
        return c;
      });
      return;
    }
    setV([]);
    set$(B([...a.parts]));
  }, [t, b, x]);
  React.useEffect(() => {
    if (t === "gameover") {
      setTimeout(() => spawn(150), 300);
      setIe(true);
    } else {
      setIe(false);
    }
  }, [t, spawn]);
  React.useEffect(() => {
    if (h <= 10 && h > 0 && t === "playing") {
      const a = setInterval(() => setW(true), 500);
      const i = setTimeout(() => clearInterval(a), 10000);
      return () => {
        clearInterval(a);
        clearTimeout(i);
      };
    }
  }, [h, t]);
  React.useEffect(() => {
    if (w) {
      const a = setTimeout(() => setW(false), 400);
      return () => clearTimeout(a);
    }
  }, [w]);
  const de = (a, i) => {
    if (t !== "playing") {
      return;
    }
    playClick();
    const c = x[b];
    if (!c) {
      return;
    }
    const j = [...v, a];
    setV(j);
    set$((f) => f.filter((p, F) => F !== i));
    const g = j.join("");
    if (g === c.espanol) {
      playCorrect();
      const f = 150 * L;
      setY((p) => p + f);
      setOe((p) => p + 1);
      setL((p) => p + 1);
      setM("¡Fusión! / 融合！");
      setI(true);
      spawn(40, window.innerWidth / 2, window.innerHeight / 2);
      setTimeout(() => setI(false), 800);
      if (b < x.length - 1) {
        setTimeout(() => setB((p) => p + 1), 600);
      } else {
        playWin();
        setTimeout(() => {
          setT("gameover");
          setT_1((p) => {
            const F = Math.max(p, y + f);
            localStorage.setItem("wordfusion_best", String(F));
            return F;
          });
        }, 800);
      }
    } else {
      if (g.length >= c.espanol.length && g !== c.espanol) {
        playWrong();
        setW(true);
        setOe(0);
        setL(1);
        setM("¡Error! / 错误！");
        setV([]);
        set$(B([...c.parts]));
        setTimeout(() => setM(""), 800);
      }
    }
  };
  const ce = x[b];
  const xe = x.length ? (b / x.length) * 100 : 0;
  const z = h <= 10 && h > 0;
  if (t === "select") {
    return (
      <StarfieldBackground>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-40" />
        <Ne1Component mood={mood} />
        <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-6 min-h-screen relative z-10">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <Link
              to="/juegos"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold drop-shadow-[0_0_8px_rgba(0,212,255,0.3)]"
            >
              <ArrowLeftIcon size={16} /> <span className="hidden sm:inline">Volver / 返回</span>
            </Link>
            <SoundToggles />
          </div>
          <div className="text-center mb-8 sm:mb-10">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 relative inline-block"
              style={{
                textShadow: "0 0 40px rgba(0,212,255,0.4), 0 0 80px rgba(184,41,221,0.2)",
              }}
            >
              <WandSparklesIcon
                size={36}
                className="inline-block mr-2 animate-pulse"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(0,212,255,0.8))",
                }}
              />
              Word Fusion
            </h1>
            <p className="text-white/40 text-sm font-medium tracking-wider">
              Selecciona un módulo para jugar / 选择模块开始游戏
            </p>
            {O && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold animate-pulse"
                style={{
                  background: "rgba(255,68,68,.12)",
                  border: "1px solid rgba(255,68,68,.3)",
                  color: "#ff6b35",
                  boxShadow: "0 0 20px rgba(255,68,68,.2)",
                }}
              >
                {O}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => {
                playClick();
                setO("");
                A(null);
              }}
              className="group relative rounded-2xl p-5 sm:p-6 text-left transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 overflow-hidden"
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
                  background: "radial-gradient(circle at 50% 50%, rgba(255,0,170,0.08), transparent 70%)",
                }}
              />
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 relative"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                  boxShadow: "0 0 25px rgba(255,0,170,.4)",
                }}
              >
                <LayersIcon size={24} className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
              </div>
              <h3 className="text-white font-black text-base mb-1 relative">Todos los módulos</h3>
              <p
                className="text-xs font-medium mb-1 relative"
                style={{
                  color: "rgba(255,0,170,.8)",
                }}
              >
                所有模块
              </p>
              <p className="text-xs font-medium text-white/40 relative">Mezcla todo el vocabulario</p>
            </button>
            {le.map((a) => (
              <button
                key={a.id}
                onClick={() => {
                  playClick();
                  setO("");
                  A(a.id);
                }}
                className="group relative rounded-2xl p-5 sm:p-6 text-left transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 overflow-hidden"
                style={{
                  background: "rgba(14,22,64,.6)",
                  border: `1px solid ${a.color}40`,
                  transform: "translateZ(20px)",
                  perspective: "800px",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${a.color}12, transparent 70%)`,
                  }}
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 relative"
                  style={{
                    background: `linear-gradient(135deg, ${a.color}, ${a.color}88)`,
                    boxShadow: `0 0 25px ${a.color}40`,
                  }}
                >
                  <BookOpenIcon
                    size={24}
                    className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                  />
                </div>
                <h3 className="text-white font-black text-base mb-1 relative">{a.titulo}</h3>
                <p
                  className="text-xs font-medium mb-1 relative"
                  style={{
                    color: `${a.color}cc`,
                  }}
                >
                  {a.tituloChino}
                </p>
                <p className="text-xs font-medium text-white/40 relative">
                  {a.vocabularioCount} palabras / 词
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
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-40" />
      <Ne1Component mood={mood} />
      <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6 min-h-screen relative z-10">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
          >
            <ArrowLeftIcon size={16} /> <span className="hidden sm:inline">Volver / 返回</span>
          </Link>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <SoundToggles />
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 flex items-center gap-1.5"
              style={{
                background: "rgba(184,41,221,.12)",
                border: "1px solid rgba(184,41,221,.25)",
                color: "#b829dd",
                boxShadow: "0 0 15px rgba(184,41,221,.25)",
              }}
            >
              <ZapIcon size={12} className="drop-shadow-[0_0_4px_rgba(184,41,221,0.8)]" /> {y}
            </div>
            <div
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 flex items-center gap-1.5 ${z ? "animate-pulse" : ""}`}
              style={{
                background: z ? "rgba(255,68,68,.15)" : "rgba(255,214,0,.12)",
                border: `1px solid ${z ? "rgba(255,68,68,.3)" : "rgba(255,214,0,.25)"}`,
                color: z ? "#ff4757" : "#ffd600",
                boxShadow: `0 0 15px ${z ? "rgba(255,68,68,.3)" : "rgba(255,214,0,.25)"}`,
              }}
            >
              <TimerIcon size={12} className="drop-shadow-[0_0_4px_rgba(255,214,0,0.8)]" /> {h}s
            </div>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 flex items-center gap-1.5"
              style={{
                background: "rgba(255,0,170,.12)",
                border: "1px solid rgba(255,0,170,.25)",
                color: "#ff00aa",
                boxShadow: "0 0 15px rgba(255,0,170,.25)",
              }}
            >
              <FlameIcon size={12} className="drop-shadow-[0_0_4px_rgba(255,0,170,0.8)]" /> {oe}
            </div>
            {L > 1 && (
              <div
                className="px-3 py-1.5 rounded-full text-xs font-bold transition-all animate-bounce flex items-center gap-1.5"
                style={{
                  background: "rgba(57,255,20,.12)",
                  border: "1px solid rgba(57,255,20,.25)",
                  color: "#39ff14",
                  boxShadow: "0 0 15px rgba(57,255,20,.25)",
                }}
              >
                <StarIcon size={12} className="drop-shadow-[0_0_4px_rgba(57,255,20,0.8)]" /> x{L}
              </div>
            )}
          </div>
        </div>
        <div className="text-center mb-4 sm:mb-6">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-black mb-1 relative inline-block"
            style={{
              background: "linear-gradient(135deg,#b829dd,#ff00aa,#00d4ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 20px rgba(184,41,221,.4))",
            }}
          >
            Word Fusion
          </h1>
          <p className="text-white/40 text-xs font-medium tracking-wider">
            Ordena las partes para formar la palabra / 排列部分组成单词
          </p>
        </div>
        <div className="max-w-sm mx-auto mb-4 sm:mb-6">
          <div
            className="h-2.5 rounded-full overflow-hidden relative"
            style={{
              background: "rgba(255,255,255,.06)",
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.3)",
            }}
          >
            <div
              className="h-full rounded-full transition-all duration-700 relative overflow-hidden"
              style={{
                width: `${xe}%`,
                background: "linear-gradient(90deg,#b829dd,#ff00aa,#ffd600)",
                boxShadow: "0 0 15px rgba(184,41,221,.5), 0 0 30px rgba(255,0,170,.3)",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)",
                  animation: "shimmer 1.5s infinite",
                }}
              />
            </div>
          </div>
          <p
            className="text-center text-xs mt-1.5 font-medium tracking-wider"
            style={{
              color: "rgba(207,216,255,.35)",
            }}
          >
            {b + 1} / {x.length}
          </p>
        </div>
        <div className="text-center mb-4 sm:mb-6">
          <div
            className={`inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-black text-xl sm:text-2xl transition-all duration-300 ${w ? "animate-shake" : ""}`}
            style={{
              background: "linear-gradient(180deg,rgba(14,22,64,.85),rgba(5,8,27,.65))",
              border: "1px solid rgba(255,214,0,.35)",
              color: "#ffd600",
              boxShadow:
                "0 0 30px rgba(255,214,0,.25), 0 0 60px rgba(255,214,0,.1), inset 0 0 20px rgba(255,214,0,.05)",
              textShadow: "0 0 15px rgba(255,214,0,.5), 0 0 30px rgba(255,214,0,.3)",
              backdropFilter: "blur(14px)",
              transform: w ? "translateZ(20px)" : "translateZ(20px) translateY(0)",
              animation: w ? "none" : "floatClue 3s ease-in-out infinite",
            }}
          >
            <SparklesIcon
              size={28}
              style={{
                color: "#ff00aa",
                filter: "drop-shadow(0 0 8px rgba(255,0,170,0.6))",
              }}
              className="animate-spin-slow"
            />
            <span className="drop-shadow-[0_0_10px_rgba(255,214,0,0.6)]">{ce?.chino}</span>
          </div>
        </div>
        {M && (
          <div
            className="text-center mb-3 sm:mb-4 text-sm font-black animate-bounce transition-all tracking-wider"
            style={{
              color: M.includes("Fusión") ? "#39ff14" : "#ff4757",
              textShadow: M.includes("Fusión")
                ? "0 0 15px rgba(57,255,20,.7), 0 0 30px rgba(57,255,20,.4)"
                : "0 0 15px rgba(255,68,68,.7), 0 0 30px rgba(255,68,68,.4)",
            }}
          >
            {M.includes("Fusión") ? (
              <PartyPopperIcon size={18} className="inline mr-1" />
            ) : (
              <HeartIcon size={18} className="inline mr-1" />
            )}
            {M}
          </div>
        )}
        <div
          className="flex gap-2 justify-center mb-6 sm:mb-8 min-h-[52px] sm:min-h-[56px] flex-wrap"
          style={{
            perspective: "600px",
          }}
        >
          {v.map((a, i) => (
            <div
              key={i}
              className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl font-black text-base sm:text-lg transition-all relative overflow-hidden"
              style={{
                background: "rgba(57,255,20,.15)",
                border: "1px solid rgba(57,255,20,.5)",
                color: "#39ff14",
                boxShadow:
                  "0 0 20px rgba(57,255,20,.3), 0 0 40px rgba(57,255,20,.1), inset 0 0 10px rgba(57,255,20,.05)",
                textShadow: "0 0 10px rgba(57,255,20,.6)",
                animation: `fuseIn 0.5s ease ${i * 0.08}s both, fuseGlowPulse 1.5s ease-in-out infinite ${i * 0.2}s`,
                transform: "translateZ(10px)",
              }}
            >
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: "linear-gradient(180deg,transparent,rgba(57,255,20,0.15),transparent)",
                }}
              />
              {a}
            </div>
          ))}
        </div>
        <div
          className="flex gap-2 sm:gap-3 justify-center flex-wrap"
          style={{
            perspective: "800px",
          }}
        >
          {$.map((a, i) => {
            const c = re[i % re.length];
            return (
              <button
                key={i}
                onClick={(j) => {
                  const g = j.currentTarget.getBoundingClientRect();
                  ze(g.left + g.width / 2, g.top + g.height / 2);
                  de(a, i);
                }}
                className="relative px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-black text-base sm:text-lg transition-all duration-200 hover:scale-110 active:scale-95 overflow-hidden group"
                style={{
                  background: `linear-gradient(135deg, ${c}18, ${c}08)`,
                  border: `1px solid ${c}70`,
                  color: "#fff",
                  boxShadow: `0 0 20px ${c}35, 0 0 40px ${c}15, inset 0 0 10px ${c}08`,
                  textShadow: `0 0 10px ${c}90`,
                  animation: `fuseFloat 2.5s ease-in-out infinite ${i * 0.15}s, fuseNeonPulse 2s ease-in-out infinite ${i * 0.3}s`,
                  transform: "translateZ(20px)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${c}20, transparent 70%)`,
                  }}
                />
                <span className="relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">{a}</span>
              </button>
            );
          })}
        </div>
        {I && (
          <div
            className="fixed inset-0 pointer-events-none z-50"
            style={{
              background: "radial-gradient(circle, rgba(57,255,20,.18), transparent 60%)",
              animation: "fuseGlow 0.8s ease-out",
            }}
          />
        )}
        {ie && t === "gameover" && (
          <div
            className="fixed inset-0 pointer-events-none z-30"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(184,41,221,0.06), transparent 70%)",
              animation: "neonPulse 2s ease-in-out infinite",
            }}
          />
        )}
        {t === "gameover" && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.9)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div
              className="text-center p-6 sm:p-8 rounded-3xl max-w-sm mx-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.85),rgba(5,8,27,.65))",
                border: "1px solid rgba(184,41,221,.25)",
                boxShadow:
                  "0 0 60px rgba(184,41,221,.2), 0 0 120px rgba(255,0,170,.1), inset 0 0 30px rgba(184,41,221,.05)",
                transform: "rotateX(5deg)",
                perspective: "800px",
                animation: "modalIn 0.6s ease-out",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-60"
                style={{
                  background: "linear-gradient(135deg,#b829dd,#ff00aa,#00d4ff)",
                  filter: "blur(30px)",
                  animation: "neonPulse 3s ease-in-out infinite",
                }}
              />
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: "linear-gradient(90deg,transparent,#b829dd,transparent)",
                  opacity: 0.6,
                }}
              />
              <TrophyIcon
                size={56}
                style={{
                  color: "#ffd600",
                  margin: "0 auto 16px",
                  filter: "drop-shadow(0 0 20px rgba(255,214,0,.6))",
                }}
                className="animate-bounce"
              />
              <h2
                className="text-3xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg,#b829dd,#ff00aa,#00d4ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 10px rgba(184,41,221,0.4))",
                }}
              >
                ¡Fusión!
              </h2>
              <p className="text-white/50 text-sm mb-6 tracking-wider">融合完成！</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(184,41,221,.1)",
                    border: "1px solid rgba(184,41,221,.2)",
                    boxShadow: "0 0 15px rgba(184,41,221,.15)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: "linear-gradient(180deg,transparent,rgba(184,41,221,0.1),transparent)",
                    }}
                  />
                  <ZapIcon
                    size={16}
                    style={{
                      color: "#b829dd",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 6px rgba(184,41,221,0.5))",
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
                      color: "#b829dd",
                      textShadow: "0 0 10px rgba(184,41,221,0.5)",
                    }}
                  >
                    {y}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(255,0,170,.1)",
                    border: "1px solid rgba(255,0,170,.2)",
                    boxShadow: "0 0 15px rgba(255,0,170,.15)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: "linear-gradient(180deg,transparent,rgba(255,0,170,0.1),transparent)",
                    }}
                  />
                  <TrophyIcon
                    size={16}
                    style={{
                      color: "#ff00aa",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 6px rgba(255,0,170,0.5))",
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
                      color: "#ff00aa",
                      textShadow: "0 0 10px rgba(255,0,170,0.5)",
                    }}
                  >
                    {T}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => {
                    playClick();
                    A(null);
                  }}
                  className="px-6 sm:px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105 flex items-center gap-2 relative overflow-hidden group"
                  style={{
                    background: "linear-gradient(135deg,#b829dd,#ff00aa)",
                    boxShadow: "0 0 30px rgba(184,41,221,.4), 0 0 60px rgba(255,0,170,.2)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.15), transparent)",
                    }}
                  />
                  <RotateCcwIcon size={18} className="relative z-10" />
                  <span className="relative z-10">Jugar de nuevo / 再玩一次</span>
                </button>
              </div>
              <P currentGameId="word-fusion" />
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes fuseIn {
          from { transform: scale(0) rotateY(90deg) translateZ(40px); opacity: 0; }
          to { transform: scale(1) rotateY(0) translateZ(10px); opacity: 1; }
        }
        @keyframes fuseFloat {
          0%, 100% { transform: translateY(0) translateZ(20px); }
          50% { transform: translateY(-8px) translateZ(30px); }
        }
        @keyframes fuseGlow { 0% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes fuseGlowPulse { 0%, 100% { box-shadow: 0 0 20px rgba(57,255,20,.3), 0 0 40px rgba(57,255,20,.1); } 50% { box-shadow: 0 0 30px rgba(57,255,20,.5), 0 0 60px rgba(57,255,20,.2); } }
        @keyframes fuseNeonPulse { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.2); } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes floatClue { 0%, 100% { transform: translateZ(20px) translateY(0); } 50% { transform: translateZ(20px) translateY(-4px); } }
        @keyframes shake { 0%, 100% { transform: translateX(0) translateZ(20px); } 20% { transform: translateX(-6px) translateZ(20px); } 40% { transform: translateX(6px) translateZ(20px); } 60% { transform: translateX(-4px) translateZ(20px); } 80% { transform: translateX(4px) translateZ(20px); } }
        @keyframes modalIn { from { transform: scale(0.8) rotateX(10deg); opacity: 0; } to { transform: scale(1) rotateX(5deg); opacity: 1; } }
        @keyframes neonPulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes mascotBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .animate-spin-slow { animation: spin 4s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      `}</style>
    </StarfieldBackground>
  );
}
export { GeComponent as default };
