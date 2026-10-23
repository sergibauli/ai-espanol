import {
  ZapIcon,
  TrophyIcon,
  HeartIcon,
  StarIcon,
  BookOpenIcon,
  ArrowLeftIcon,
  Link2Icon,
  LayersIcon,
  RotateCcwIcon,
  TimerIcon,
  CheckIcon,
  GitMergeIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P as P_1 } from "../../components/PostGameNav.jsx";
import { g, a as a_1 } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
function ne(t) {
  const n = [...t];
  for (let r = n.length - 1; r > 0; r--) {
    const c = Math.floor(Math.random() * (r + 1));
    [n[r], n[c]] = [n[c], n[r]];
  }
  return n;
}
function le(t, n, r = 50) {
  const c = ["#ff8a2a", "#ffd600", "#ff6b35", "#ff00aa", "#39ff14", "#00f0ff", "#bd00ff"];
  const o = ["50%", "0%", "0% 50% 50% 0"];
  for (let m = 0; m < r; m++) {
    const i = document.createElement("div");
    const u = o[m % o.length];
    const f = 4 + Math.random() * 8;
    i.style.cssText = `position:fixed;left:${t}px;top:${n}px;width:${f}px;height:${f}px;border-radius:${u};background:${c[m % c.length]};pointer-events:none;z-index:9999;box-shadow:0 0 6px ${c[m % c.length]};`;
    document.body.appendChild(i);
    const x = (Math.PI * 2 * m) / r + (Math.random() - 0.5) * 0.5;
    const p = 3 + Math.random() * 16;
    let w = t;
    let N = n;
    let S = 1;
    let b = 0;
    const T = Math.cos(x) * p;
    let z = Math.sin(x) * p;
    const $ = 0.15 + Math.random() * 0.2;
    const Y = () => {
      w += T * 0.95;
      N += z + $;
      z += $ * 0.02;
      S -= 0.008 + Math.random() * 0.005;
      b += (Math.random() - 0.5) * 20;
      i.style.left = `${w}px`;
      i.style.top = `${N}px`;
      i.style.opacity = String(S);
      i.style.transform = `rotate(${b}deg)`;
      if (S > 0) {
        requestAnimationFrame(Y);
      } else {
        i.remove();
      }
    };
    requestAnimationFrame(Y);
  }
}
function IeComponent() {
  const [t, setT] = React.useState([]);
  React.useEffect(() => {
    const r = Array.from({
      length: 18,
    }).map((c, o) => ({
      id: o,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
      size: 8 + Math.random() * 14,
      color: ["#ff00aa", "#ff8a2a", "#ffd600", "#39ff14", "#00f0ff"][Math.floor(Math.random() * 5)],
    }));
    setT(r);
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {t.map((r) => (
        <div
          key={r.id}
          className="absolute opacity-20"
          style={{
            left: `${r.x}%`,
            bottom: "-20px",
            fontSize: `${r.size}px`,
            color: r.color,
            animation: `floatHeartUp ${r.duration}s linear ${r.delay}s infinite`,
            filter: `drop-shadow(0 0 6px ${r.color})`,
          }}
        >
          <HeartIcon fill={r.color} size={r.size} />
        </div>
      ))}
    </div>
  );
}
function FeComponent({ x: x_1, y }) {
  const [r, setR] = React.useState([]);
  React.useEffect(() => {
    const o = Array.from({
      length: 20,
    }).map((i, u) => {
      const f = (Math.PI * 2 * u) / 12;
      const x = 50 + Math.random() * 80;
      return {
        id: u,
        dx: Math.cos(f) * x,
        dy: Math.sin(f) * x - 40,
        color: ["#ff00aa", "#ff8a2a", "#ffd600", "#39ff14", "#00f0ff", "#bd00ff"][u % 6],
        delay: Math.random() * 0.1,
      };
    });
    setR(o);
    const m = setTimeout(() => setR([]), 1500);
    return () => clearTimeout(m);
  }, [x_1, y]);
  return (
    <div
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: x_1,
        top: y,
      }}
    >
      {r.map((o) => (
        <div
          key={o.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: o.color,
            boxShadow: `0 0 8px ${o.color}`,
            animation: `matchParticle 0.8s ease-out ${o.delay}s forwards`,
            transform: `translate(${o.dx}px, ${o.dy}px)`,
          }}
        />
      ))}
    </div>
  );
}
function TeComponent({ leftId, rightId }) {
  const [r, setR] = React.useState(null);
  const oRef = React.useRef(0);
  React.useEffect(() => {
    if (leftId === null || rightId === null) {
      setR(null);
      return;
    }
    const m = () => {
      const i = document.getElementById(`left-card-${leftId}`);
      const u = document.getElementById(`right-card-${rightId}`);
      if (!i || !u) {
        return;
      }
      const f = i.getBoundingClientRect();
      const x = u.getBoundingClientRect();
      setR({
        x1: f.right,
        y1: f.top + f.height / 2,
        x2: x.left,
        y2: x.top + x.height / 2,
      });
      oRef.current = requestAnimationFrame(m);
    };
    oRef.current = requestAnimationFrame(m);
    return () => cancelAnimationFrame(oRef.current);
  }, [leftId, rightId]);
  if (r) {
    return (
      <svg
        className="fixed inset-0 pointer-events-none z-[60]"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        <defs>
          <linearGradient id="connGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff8a2a" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#ffd600" stopOpacity="1" />
            <stop offset="100%" stopColor="#ff00aa" stopOpacity="0.95" />
          </linearGradient>
        </defs>
        <line
          x1={r.x1}
          y1={r.y1}
          x2={r.x2}
          y2={r.y2}
          stroke="url(#connGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="10 8"
          style={{
            filter: "drop-shadow(0 0 10px #ffd600) drop-shadow(0 0 20px #ff8a2a)",
            animation: "connDash 0.5s linear infinite",
          }}
        />
        <circle
          cx={r.x1}
          cy={r.y1}
          r="7"
          fill="#ff8a2a"
          style={{
            filter: "drop-shadow(0 0 12px #ff8a2a)",
          }}
        />
        <circle
          cx={r.x2}
          cy={r.y2}
          r="7"
          fill="#ffd600"
          style={{
            filter: "drop-shadow(0 0 12px #ffd600)",
          }}
        />
      </svg>
    );
  }
  return null;
}
function Ce1Component({ mood }) {
  const n =
    mood === "sad"
      ? "M 30 48 Q 35 45 40 48"
      : mood === "excited"
        ? "M 28 42 Q 35 30 42 42"
        : "M 30 45 Q 35 42 40 45";
  const r =
    mood === "sad"
      ? "M 60 48 Q 65 45 70 48"
      : mood === "excited"
        ? "M 58 42 Q 65 30 72 42"
        : "M 60 45 Q 65 42 70 45";
  const c =
    mood === "happy"
      ? "M 42 58 Q 50 66 58 58"
      : mood === "sad"
        ? "M 42 64 Q 50 58 58 64"
        : mood === "excited"
          ? "M 40 60 Q 50 70 60 60"
          : "M 45 62 Q 50 65 55 62";
  const fill = mood === "worried" || mood === "sad" ? "rgba(255,0,170,0.2)" : "rgba(255,0,170,0.4)";
  const animation =
    mood === "excited"
      ? "mascotBounceFast 0.5s ease-in-out infinite alternate"
      : mood === "happy"
        ? "mascotBounce 0.8s ease-in-out infinite alternate"
        : "mascotFloat 3s ease-in-out infinite";
  const i =
    mood === "excited"
      ? "0 0 30px rgba(255,0,170,0.5), 0 0 60px rgba(255,138,42,0.3)"
      : mood === "happy"
        ? "0 0 20px rgba(57,255,20,0.4)"
        : mood === "sad"
          ? "0 0 20px rgba(100,100,255,0.3)"
          : "0 0 20px rgba(255,0,170,0.2)";
  const u = mood === "excited" || mood === "happy";
  return (
    <div
      className="fixed bottom-4 right-4 z-50 pointer-events-none"
      style={{
        animation,
        filter: `drop-shadow(${i})`,
      }}
    >
      <svg width="100" height="100" viewBox="0 0 100 100" className="overflow-visible">
        <ellipse cx="50" cy="60" rx="38" ry="34" fill="#1a1a40" stroke="#ff00aa" strokeWidth="2" />
        <ellipse cx="50" cy="60" rx="38" ry="34" fill="url(#mascotGrad)" opacity="0.3" />
        <circle
          cx="28"
          cy="58"
          r="6"
          fill={fill}
          style={{
            filter: "blur(3px)",
          }}
        />
        <circle
          cx="72"
          cy="58"
          r="6"
          fill={fill}
          style={{
            filter: "blur(3px)",
          }}
        />
        <path d={n} stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d={r} stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="35" cy="46" r="2" fill="#ff00aa" opacity={mood === "excited" ? 0.8 : 0.6} />
        <circle cx="65" cy="46" r="2" fill="#ff00aa" opacity={mood === "excited" ? 0.8 : 0.6} />
        <path d={c} stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <line x1="35" y1="28" x2="25" y2="10" stroke="#ff00aa" strokeWidth="2" strokeLinecap="round" />
        <line x1="65" y1="28" x2="75" y2="10" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" />
        <circle
          cx="25"
          cy="10"
          r="4"
          fill="#ff00aa"
          style={{
            filter: "drop-shadow(0 0 4px #ff00aa)",
            animation: "antennaPulse 1.5s ease-in-out infinite alternate",
          }}
        />
        <circle
          cx="75"
          cy="10"
          r="4"
          fill="#00f0ff"
          style={{
            filter: "drop-shadow(0 0 4px #00f0ff)",
            animation: "antennaPulse 1.5s ease-in-out infinite alternate 0.5s",
          }}
        />
        <defs>
          <linearGradient id="mascotGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff00aa" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {u && (
          <>
            <StarIcon
              cx="10"
              cy="20"
              r="3"
              fill="#ffd600"
              style={{
                animation: "starTwinkle 1s ease-in-out infinite alternate",
              }}
            />
            <StarIcon
              cx="90"
              cy="30"
              r="2.5"
              fill="#39ff14"
              style={{
                animation: "starTwinkle 1.2s ease-in-out infinite alternate 0.3s",
              }}
            />
            <StarIcon
              cx="15"
              cy="80"
              r="2"
              fill="#00f0ff"
              style={{
                animation: "starTwinkle 0.8s ease-in-out infinite alternate 0.6s",
              }}
            />
          </>
        )}
        {mood === "sad" && (
          <>
            <circle
              cx="30"
              cy="52"
              r="2.5"
              fill="#00f0ff"
              opacity="0.7"
              style={{
                animation: "tearDrop 1.2s ease-in infinite",
              }}
            />
            <circle
              cx="70"
              cy="52"
              r="2.5"
              fill="#00f0ff"
              opacity="0.7"
              style={{
                animation: "tearDrop 1.2s ease-in infinite 0.3s",
              }}
            />
          </>
        )}
      </svg>
    </div>
  );
}
function YeComponent({ m: m_1, onClick }) {
  const [r, setR] = React.useState({
    x: 0,
    y: 0,
  });
  const oRef = React.useRef(null);
  const { playClick } = useSound();
  const onMouseMove = (f) => {
    if (!oRef.current) {
      return;
    }
    const x = oRef.current.getBoundingClientRect();
    const p = (f.clientX - x.left) / x.width;
    const w = (f.clientY - x.top) / x.height;
    setR({
      x: (w - 0.5) * -20,
      y: (p - 0.5) * 20,
    });
  };
  const onMouseLeave = () =>
    setR({
      x: 0,
      y: 0,
    });
  return (
    <button
      ref={oRef}
      onClick={() => {
        playClick();
        onClick();
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group rounded-2xl p-6 text-left transition-all relative overflow-hidden"
      style={{
        background: "rgba(14,22,64,.6)",
        border: `1px solid ${m_1.color}40`,
        transform: `perspective(600px) rotateX(${r.x}deg) rotateY(${r.y}deg) translateZ(10px)`,
        transformStyle: "preserve-3d",
        boxShadow: `0 10px 40px rgba(0,0,0,.4), 0 0 20px ${m_1.color}15`,
      }}
    >
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, ${m_1.color}00, ${m_1.color}, ${m_1.color}00)`,
          backgroundSize: "200% 100%",
          animation: "borderRotate 2s linear infinite",
          zIndex: -1,
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${m_1.color}, transparent 70%)`,
        }}
      />
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-3 relative"
        style={{
          background: `linear-gradient(135deg, ${m_1.color}, ${m_1.color}88)`,
          transform: "translateZ(20px)",
        }}
      >
        <BookOpenIcon
          size={26}
          className="text-white"
          style={{
            filter: "drop-shadow(0 0 4px rgba(255,255,255,0.5))",
          }}
        />
      </div>
      <h3
        className="text-white font-black text-base mb-1"
        style={{
          transform: "translateZ(15px)",
          textShadow: `0 0 10px ${m_1.color}40`,
        }}
      >
        {m_1.titulo}
      </h3>
      <p
        className="text-xs font-medium mb-1"
        style={{
          color: `${m_1.color}aa`,
          transform: "translateZ(10px)",
        }}
      >
        {m_1.tituloChino}
      </p>
      <p
        className="text-xs font-medium text-white/40"
        style={{
          transform: "translateZ(5px)",
        }}
      >
        {m_1.vocabularioCount} palabras / 词
      </p>
    </button>
  );
}
function AeComponent() {
  const [t, setT] = React.useState("select");
  const [r, setR] = React.useState([]);
  const [o, setO] = React.useState([]);
  const [i, setI] = React.useState(null);
  const [f, setF] = React.useState(null);
  const [p, setP] = React.useState(60);
  const [N, setN] = React.useState(0);
  const [b, setB] = React.useState(0);
  const [z, setZ] = React.useState(false);
  const [Y, setY] = React.useState(false);
  const [A, setA] = React.useState([]);
  const [P, setP_1] = React.useState(null);
  const [L, setL] = React.useState(null);
  const RRef = React.useRef(null);
  const feRef = React.useRef(0);
  const xe = g();
  const [Q, setQ] = React.useState("");
  const [mood, setMood] = React.useState("neutral");
  const [F, setF_1] = React.useState(0);
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [ue, setUe] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("wordpairs_best") || "0");
    } catch {
      return 0;
    }
  });
  const Z = React.useCallback((a) => {
    let g = a ? a_1(a) : a_1();
    if (g.length === 0) {
      setQ(
        'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
      );
      return;
    }
    const l = ne(g.filter((v) => v.espanol && v.chino)).slice(0, 8);
    const h = l.map((v, C) => ({
      id: C,
      es: v.espanol,
      zh: v.chino,
      matched: false,
      selected: false,
    }));
    const y = ne(
      l.map((v, C) => ({
        id: C,
        es: v.espanol,
        zh: v.chino,
        matched: false,
        selected: false,
      })),
    );
    setR(h);
    setO(y);
    setI(null);
    setF(null);
    setP(60);
    setN(0);
    setB(0);
    setA([]);
    setMood("neutral");
    setF_1(0);
    setT("playing");
  }, []);
  React.useEffect(() => {
    if (t === "playing" && p > 0 && b < 8) {
      RRef.current = setInterval(() => setP((a) => a - 1), 1000);
      return () => {
        if (RRef.current) {
          clearInterval(RRef.current);
        }
      };
    }
  }, [t, p, b]);
  React.useEffect(() => {
    if (p <= 10 && p > 0 && t === "playing") {
      setMood("worried");
    } else if (t === "playing" && b > 0 && !z && p > 10) {
      setMood("neutral");
    }
  }, [p, t, b, z]);
  React.useEffect(() => {
    if (t === "playing" && (p <= 0 || b >= 8)) {
      setT("gameover");
      if (b >= 8) {
        setMood("excited");
        playWin();
        le(window.innerWidth / 2, window.innerHeight / 2, 120);
      } else {
        setMood("sad");
        playLose();
      }
      setUe((a) => {
        const g = Math.max(a, N);
        localStorage.setItem("wordpairs_best", String(g));
        return g;
      });
    }
  }, [t, p, b, N, playWin, playLose]);
  const he = (a) => {
    playClick();
    if (!r.find((g) => g.id === a)?.matched) {
      if (i === a) {
        setI(null);
        return;
      }
      setI(a);
      if (f !== null) {
        U(a, f);
      }
    }
  };
  const be = (a) => {
    playClick();
    if (!o.find((g) => g.id === a)?.matched) {
      if (f === a) {
        setF(null);
        return;
      }
      setF(a);
      if (i !== null) {
        U(i, a);
      }
    }
  };
  const U = (a, g) => {
    const l = r.find((y) => y.id === a);
    const h = o.find((y) => y.id === g);
    if (!(!l || !h)) {
      if (l.zh === h.zh) {
        playCorrect();
        const y = F + 1;
        setF_1(y);
        const v = Math.min(y * 10, 50);
        setN((d) => d + 50 + v);
        setB((d) => d + 1);
        setR((d) =>
          d.map((k) => {
            if (k.id === a) {
              return {
                ...k,
                matched: true,
              };
            }
            return k;
          }),
        );
        setO((d) =>
          d.map((k) => {
            if (k.id === g) {
              return {
                ...k,
                matched: true,
              };
            }
            return k;
          }),
        );
        setA((d) => [
          ...d,
          {
            es: l.es,
            zh: l.zh,
            id: Date.now(),
          },
        ]);
        const C = document.getElementById(`left-card-${a}`);
        if (C) {
          const d = C.getBoundingClientRect();
          le(d.left + d.width / 2, d.top + d.height / 2, 45);
          setL({
            x: d.left + d.width / 2,
            y: d.top + d.height / 2,
          });
          ++feRef.current;
          const text = v > 0 ? `+${50 + v} COMBO x${y}` : "+50";
          setP_1({
            show: true,
            text,
            x: d.left + d.width / 2,
            y: d.top,
          });
          setTimeout(() => setP_1(null), 1500);
        }
        if (b + 1 >= 8 || y >= 3) {
          setMood("excited");
        } else {
          setMood("happy");
        }
        setTimeout(() => setL(null), 1500);
      } else {
        playWrong();
        setN((y) => Math.max(0, y - 10));
        setZ(true);
        setY(true);
        setF_1(0);
        setMood("sad");
        setTimeout(() => {
          setZ(false);
          setY(false);
          setMood("neutral");
        }, 600);
      }
      setI(null);
      setF(null);
    }
  };
  const ye = (p / 60) * 100;
  const background =
    p > 20
      ? "linear-gradient(90deg,#ff8a2a,#ffd600)"
      : p > 10
        ? "linear-gradient(90deg,#ff6b35,#ff8a2a)"
        : "linear-gradient(90deg,#ff003c,#ff6b35)";
  const boxShadow =
    p > 20
      ? "0 0 15px rgba(255,138,42,.4)"
      : p > 10
        ? "0 0 20px rgba(255,107,53,.5)"
        : "0 0 30px rgba(255,0,60,.6)";
  if (t === "select") {
    return (
      <StarfieldBackground>
        <div
          className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative"
          style={{
            perspective: "1000px",
          }}
        >
          <IeComponent />
          <Ce1Component mood={mood} />
          <div className="flex items-center justify-between mb-8 relative z-10">
            <Link
              to="/juegos"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold hover:scale-105 active:scale-95"
            >
              <ArrowLeftIcon size={16} /> Volver / 返回
            </Link>
          </div>
          <div className="text-center mb-10 relative z-10">
            <h1
              className="text-4xl md:text-6xl font-black mb-3"
              style={{
                textShadow: "0 0 40px rgba(0,212,255,0.4), 0 0 80px rgba(255,0,170,0.2)",
                transform: "translateZ(30px)",
              }}
            >
              <Link2Icon
                size={36}
                className="inline-block mr-2 animate-pulse"
                style={{
                  filter: "drop-shadow(0 0 8px #ff8a2a)",
                }}
              />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff8a2a] via-[#ffd600] to-[#ff00aa]">
                Word Pairs Race
              </span>
            </h1>
            <p className="text-white/40 text-sm font-medium">
              Selecciona un módulo para jugar / 选择模块开始游戏
            </p>
            {Q && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold animate-shake"
                style={{
                  background: "rgba(255,68,68,.12)",
                  border: "1px solid rgba(255,68,68,.3)",
                  color: "#ff6b35",
                  boxShadow: "0 0 20px rgba(255,68,68,.1)",
                }}
              >
                {Q}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
            <button
              onClick={() => {
                playClick();
                setQ("");
                Z(null);
              }}
              className="group rounded-2xl p-6 text-left transition-all relative overflow-hidden hover:scale-[1.02] active:scale-95"
              style={{
                background: "rgba(14,22,64,.6)",
                border: "1px solid rgba(255,0,170,.3)",
                transform: "perspective(600px) translateZ(10px)",
                transformStyle: "preserve-3d",
                boxShadow: "0 10px 40px rgba(0,0,0,.4), 0 0 20px rgba(255,0,170,0.1)",
              }}
            >
              <div
                className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, rgba(255,0,170,0), rgba(255,0,170), rgba(255,0,170,0))",
                  backgroundSize: "200% 100%",
                  animation: "borderRotate 2s linear infinite",
                  zIndex: -1,
                }}
              />
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 50% 50%, #ff00aa, transparent 70%)",
                }}
              />
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-3 relative"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                  transform: "translateZ(20px)",
                }}
              >
                <LayersIcon
                  size={26}
                  className="text-white"
                  style={{
                    filter: "drop-shadow(0 0 4px rgba(255,255,255,0.5))",
                  }}
                />
              </div>
              <h3
                className="text-white font-black text-base mb-1"
                style={{
                  transform: "translateZ(15px)",
                  textShadow: "0 0 10px rgba(255,0,170,0.4)",
                }}
              >
                Todos los módulos
              </h3>
              <p
                className="text-xs font-medium mb-1"
                style={{
                  color: "rgba(255,0,170,.7)",
                  transform: "translateZ(10px)",
                }}
              >
                所有模块
              </p>
              <p
                className="text-xs font-medium text-white/40"
                style={{
                  transform: "translateZ(5px)",
                }}
              >
                Mezcla todo el vocabulario
              </p>
            </button>
            {xe.map((m) => (
              <YeComponent
                key={m.id}
                m={m}
                onClick={() => {
                  setQ("");
                  Z(m.id);
                }}
              />
            ))}
          </div>
          <style>{`
            @keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
            @keyframes mascotFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
            @keyframes mascotBounce { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-15px) scale(1.05)} }
            @keyframes mascotBounceFast { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-20px) scale(1.1)} }
            @keyframes antennaPulse { 0%,100%{opacity:0.6; transform:scale(1)} 50%{opacity:1; transform:scale(1.3)} }
            @keyframes starTwinkle { 0%,100%{opacity:0.3; transform:scale(0.8)} 50%{opacity:1; transform:scale(1.2)} }
            @keyframes tearDrop { 0%{transform:translateY(0) scale(1); opacity:0.7} 100%{transform:translateY(20px) scale(0.3); opacity:0} }
            @keyframes floatHeartUp { 0%{transform:translateY(0) rotate(0deg); opacity:0.15} 50%{opacity:0.25} 100%{transform:translateY(-110vh) rotate(360deg); opacity:0} }
            @keyframes animate-shake { 0%,100%{transform:translateX(0)} 10%{transform:translateX(-4px)} 20%{transform:translateX(4px)} 30%{transform:translateX(-2px)} 40%{transform:translateX(2px)} 50%{transform:translateX(-1px)} 60%{transform:translateX(1px)} }
          `}</style>
        </div>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <IeComponent />
      <Ce1Component mood={mood} />
      {L && <FeComponent x={L.x} y={L.y} />}
      <TeComponent leftId={i} rightId={f} />
      <div
        className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${Y ? "animate-screenShake" : ""}`}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: "400px",
            height: "400px",
            left: "-100px",
            top: "10%",
            background: "radial-gradient(circle,rgba(255,138,42,.3),transparent 70%)",
            filter: "blur(40px)",
            animation: "orbFloat1 12s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: "350px",
            height: "350px",
            right: "-80px",
            top: "40%",
            background: "radial-gradient(circle,rgba(255,214,0,.25),transparent 70%)",
            filter: "blur(40px)",
            animation: "orbFloat2 15s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: "300px",
            height: "300px",
            left: "30%",
            bottom: "-100px",
            background: "radial-gradient(circle,rgba(255,107,53,.2),transparent 70%)",
            filter: "blur(40px)",
            animation: "orbFloat3 10s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: "250px",
            height: "250px",
            right: "20%",
            top: "5%",
            background: "radial-gradient(circle,rgba(255,0,170,.15),transparent 70%)",
            filter: "blur(40px)",
            animation: "orbFloat4 14s ease-in-out infinite alternate",
          }}
        />
      </div>
      {z && (
        <div
          className="fixed inset-0 pointer-events-none z-[50]"
          style={{
            background: "rgba(255,56,96,.2)",
            animation: "redFlashPairs 0.5s ease-out",
            mixBlendMode: "screen",
          }}
        />
      )}
      {P && (
        <div
          className="fixed pointer-events-none z-[9998] font-black text-xl md:text-2xl -translate-x-1/2"
          style={{
            left: P.x,
            top: P.y,
            color: F > 1 ? "#ff00aa" : "#ffd600",
            textShadow: F > 1 ? "0 0 20px #ff00aa, 0 0 40px #ff00aa" : "0 0 20px #ffd600, 0 0 40px #ff8a2a",
            animation: "floatScorePairs 1.5s ease-out forwards",
          }}
        >
          {P.text}
        </div>
      )}
      <div
        className="max-w-4xl mx-auto px-4 py-6 min-h-screen relative z-10"
        style={{
          perspective: "1000px",
        }}
      >
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold hover:scale-105 active:scale-95"
          >
            <ArrowLeftIcon size={16} /> Volver / 返回
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playClick();
                setT("select");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "#fff",
                boxShadow: "0 0 10px rgba(255,255,255,.05)",
              }}
            >
              <LayersIcon size={12} /> Cambiar / 切换
            </button>
            <button
              onClick={() => {
                playClick();
                Z(null);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "#fff",
                boxShadow: "0 0 10px rgba(255,255,255,.05)",
              }}
            >
              <RotateCcwIcon size={12} /> Reiniciar / 重置
            </button>
          </div>
        </div>
        <div
          className="text-center mb-6"
          style={{
            transform: "translateZ(20px)",
          }}
        >
          <h1
            className="text-4xl md:text-5xl font-black mb-2"
            style={{
              background: "linear-gradient(135deg,#ff8a2a,#ffd600,#ff00aa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 20px rgba(255,138,42,.4))",
            }}
          >
            Word Pairs Race
          </h1>
          <p className="text-white/40 text-sm font-medium">
            Selecciona una palabra de cada lado / 从两边选择匹配的单词
          </p>
          {F > 1 && (
            <div
              className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black animate-pulse"
              style={{
                background: "rgba(255,0,170,.15)",
                border: "1px solid rgba(255,0,170,.3)",
                color: "#ff00aa",
                boxShadow: "0 0 15px rgba(255,0,170,.2)",
              }}
            >
              <ZapIcon size={12} /> COMBO x{F}
            </div>
          )}
        </div>
        <div className="flex gap-3 justify-center mb-6 flex-wrap">
          <div
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105"
            style={{
              background: "rgba(255,138,42,.1)",
              border: "1px solid rgba(255,138,42,.25)",
              color: "#ff8a2a",
              boxShadow: "0 0 15px rgba(255,138,42,.1)",
            }}
          >
            <TimerIcon
              size={14}
              style={{
                filter: "drop-shadow(0 0 4px #ff8a2a)",
              }}
            />{" "}
            {p}s
          </div>
          <div
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105"
            style={{
              background: "rgba(255,214,0,.1)",
              border: "1px solid rgba(255,214,0,.25)",
              color: "#ffd600",
              boxShadow: "0 0 15px rgba(255,214,0,.1)",
            }}
          >
            <ZapIcon
              size={14}
              style={{
                filter: "drop-shadow(0 0 4px #ffd600)",
              }}
            />{" "}
            {N}
          </div>
          <div
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105"
            style={{
              background: "rgba(57,255,20,.1)",
              border: "1px solid rgba(57,255,20,.25)",
              color: "#39ff14",
              boxShadow: "0 0 15px rgba(57,255,20,.1)",
            }}
          >
            <GitMergeIcon
              size={14}
              style={{
                filter: "drop-shadow(0 0 4px #39ff14)",
              }}
            />{" "}
            {b}/8
          </div>
        </div>
        <div
          className="max-w-sm mx-auto h-3 rounded-full overflow-hidden mb-6 relative"
          style={{
            background: "rgba(255,255,255,.05)",
            boxShadow: "inset 0 0 10px rgba(0,0,0,.3)",
          }}
        >
          <div
            className="h-full rounded-full transition-all duration-1000 relative"
            style={{
              width: `${ye}%`,
              background,
              boxShadow,
            }}
          >
            <div
              className="absolute inset-0 rounded-full opacity-30"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                animation: "shimmer 2s linear infinite",
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div
            className="rounded-3xl p-5 relative overflow-hidden"
            style={{
              background: "linear-gradient(180deg,rgba(14,22,64,.6),rgba(5,8,27,.45))",
              border: "1px solid rgba(255,138,42,.2)",
              backdropFilter: "blur(14px)",
              boxShadow: "0 0 40px rgba(255,138,42,.1), 0 10px 40px rgba(0,0,0,.3)",
              transform: "translateZ(15px)",
            }}
          >
            <div
              className="absolute inset-0 rounded-3xl opacity-5 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 0%, #ff8a2a, transparent 70%)",
              }}
            />
            <h3
              className="text-sm font-black mb-4 text-center relative z-10"
              style={{
                color: "#ff8a2a",
                textShadow: "0 0 15px rgba(255,138,42,0.3)",
              }}
            >
              Español / 西班牙语
            </h3>
            <div className="space-y-3">
              {r.map((a, g) => {
                const l = i === a.id && !a.matched;
                i !== null && f !== null && !a.matched && a.id;
                return (
                  <button
                    key={a.id}
                    id={`left-card-${a.id}`}
                    onClick={() => he(a.id)}
                    disabled={a.matched}
                    className={`w-full rounded-xl p-4 text-left font-bold text-sm transition-all duration-300 disabled:pointer-events-none relative overflow-hidden group ${a.matched ? "animate-matchedCard" : ""}`}
                    style={{
                      background: a.matched
                        ? "rgba(57,255,20,.12)"
                        : l
                          ? "linear-gradient(135deg,rgba(255,138,42,.25),rgba(255,214,0,.2))"
                          : "linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,255,255,.03))",
                      border: a.matched
                        ? "1px solid rgba(57,255,20,.5)"
                        : l
                          ? "1px solid rgba(255,138,42,.6)"
                          : "1px solid rgba(255,255,255,.1)",
                      color: a.matched ? "#39ff14" : l ? "#ffd600" : "#fff",
                      boxShadow: l
                        ? "0 0 30px rgba(255,138,42,.6), 0 0 60px rgba(255,138,42,.3), 0 4px 20px rgba(0,0,0,.3)"
                        : a.matched
                          ? "0 0 25px rgba(57,255,20,.5), 0 0 50px rgba(57,255,20,.25), 0 0 80px rgba(57,255,20,.1)"
                          : "0 2px 10px rgba(0,0,0,.2)",
                      transform: l
                        ? "scale(1.03) translateX(4px) translateZ(8px)"
                        : a.matched
                          ? "scale(0.97)"
                          : "scale(1)",
                      animation: a.matched
                        ? "matchedCardFly 0.5s ease-out"
                        : `cardAppear 0.4s ease-out ${g * 0.05}s both`,
                    }}
                    onMouseEnter={(h) => {
                      if (!a.matched && !l) {
                        h.currentTarget.style.transform = "scale(1.03) translateY(-4px) translateZ(12px)";
                        h.currentTarget.style.boxShadow =
                          "0 0 30px rgba(255,138,42,.5), 0 0 60px rgba(255,138,42,.2), 0 8px 30px rgba(0,0,0,.3)";
                      }
                    }}
                    onMouseLeave={(h) => {
                      h.currentTarget.style.transform = a.matched
                        ? "scale(0.97)"
                        : l
                          ? "scale(1.03) translateX(4px) translateZ(8px)"
                          : "scale(1)";
                      h.currentTarget.style.boxShadow = l
                        ? "0 0 30px rgba(255,138,42,.6), 0 0 60px rgba(255,138,42,.3), 0 4px 20px rgba(0,0,0,.3)"
                        : a.matched
                          ? "0 0 25px rgba(57,255,20,.5), 0 0 50px rgba(57,255,20,.25), 0 0 80px rgba(57,255,20,.1)"
                          : "0 2px 10px rgba(0,0,0,.2)";
                    }}
                  >
                    <div className="flex items-center gap-2 relative z-10">
                      {a.matched ? (
                        <div
                          className="flex items-center justify-center w-5 h-5 rounded-full"
                          style={{
                            background: "rgba(57,255,20,.2)",
                          }}
                        >
                          <CheckIcon
                            size={14}
                            style={{
                              color: "#39ff14",
                              filter: "drop-shadow(0 0 2px #39ff14)",
                            }}
                          />
                        </div>
                      ) : (
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-colors"
                          style={{
                            background: l ? "rgba(255,138,42,.3)" : "rgba(255,138,42,.15)",
                            color: "#ff8a2a",
                          }}
                        >
                          {a.id + 1}
                        </span>
                      )}
                      <span className={a.matched ? "line-through opacity-60" : ""}>{a.es}</span>
                    </div>
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,138,42,0.3), transparent)",
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
          <div
            className="rounded-3xl p-5 relative overflow-hidden"
            style={{
              background: "linear-gradient(180deg,rgba(14,22,64,.6),rgba(5,8,27,.45))",
              border: "1px solid rgba(255,214,0,.2)",
              backdropFilter: "blur(14px)",
              boxShadow: "0 0 40px rgba(255,214,0,.1), 0 10px 40px rgba(0,0,0,.3)",
              transform: "translateZ(15px)",
            }}
          >
            <div
              className="absolute inset-0 rounded-3xl opacity-5 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 0%, #ffd600, transparent 70%)",
              }}
            />
            <h3
              className="text-sm font-black mb-4 text-center relative z-10"
              style={{
                color: "#ffd600",
                textShadow: "0 0 15px rgba(255,214,0,0.3)",
              }}
            >
              Chino / 中文
            </h3>
            <div className="space-y-3">
              {o.map((a, g) => {
                const l = f === a.id && !a.matched;
                return (
                  <button
                    key={a.id}
                    id={`right-card-${a.id}`}
                    onClick={() => be(a.id)}
                    disabled={a.matched}
                    className={`w-full rounded-xl p-4 text-left font-bold text-sm transition-all duration-300 disabled:pointer-events-none relative overflow-hidden group ${a.matched ? "animate-matchedCard" : ""}`}
                    style={{
                      background: a.matched
                        ? "rgba(57,255,20,.12)"
                        : l
                          ? "linear-gradient(135deg,rgba(255,214,0,.25),rgba(255,138,42,.2))"
                          : "linear-gradient(135deg,rgba(255,255,255,.08),rgba(255,255,255,.03))",
                      border: a.matched
                        ? "1px solid rgba(57,255,20,.5)"
                        : l
                          ? "1px solid rgba(255,214,0,.6)"
                          : "1px solid rgba(255,255,255,.1)",
                      color: a.matched ? "#39ff14" : l ? "#ffd600" : "#fff",
                      boxShadow: l
                        ? "0 0 30px rgba(255,214,0,.6), 0 0 60px rgba(255,214,0,.3), 0 4px 20px rgba(0,0,0,.3)"
                        : a.matched
                          ? "0 0 25px rgba(57,255,20,.5), 0 0 50px rgba(57,255,20,.25), 0 0 80px rgba(57,255,20,.1)"
                          : "0 2px 10px rgba(0,0,0,.2)",
                      transform: l
                        ? "scale(1.03) translateX(-4px) translateZ(8px)"
                        : a.matched
                          ? "scale(0.97)"
                          : "scale(1)",
                      animation: a.matched
                        ? "matchedCardFly 0.5s ease-out"
                        : `cardAppear 0.4s ease-out ${g * 0.05}s both`,
                    }}
                    onMouseEnter={(h) => {
                      if (!a.matched && !l) {
                        h.currentTarget.style.transform = "scale(1.03) translateY(-4px) translateZ(12px)";
                        h.currentTarget.style.boxShadow =
                          "0 0 30px rgba(255,214,0,.5), 0 0 60px rgba(255,214,0,.2), 0 8px 30px rgba(0,0,0,.3)";
                      }
                    }}
                    onMouseLeave={(h) => {
                      h.currentTarget.style.transform = a.matched
                        ? "scale(0.97)"
                        : l
                          ? "scale(1.03) translateX(-4px) translateZ(8px)"
                          : "scale(1)";
                      h.currentTarget.style.boxShadow = l
                        ? "0 0 30px rgba(255,214,0,.6), 0 0 60px rgba(255,214,0,.3), 0 4px 20px rgba(0,0,0,.3)"
                        : a.matched
                          ? "0 0 25px rgba(57,255,20,.5), 0 0 50px rgba(57,255,20,.25), 0 0 80px rgba(57,255,20,.1)"
                          : "0 2px 10px rgba(0,0,0,.2)";
                    }}
                  >
                    <div className="flex items-center gap-2 relative z-10">
                      {a.matched ? (
                        <div
                          className="flex items-center justify-center w-5 h-5 rounded-full"
                          style={{
                            background: "rgba(57,255,20,.2)",
                          }}
                        >
                          <CheckIcon
                            size={14}
                            style={{
                              color: "#39ff14",
                              filter: "drop-shadow(0 0 2px #39ff14)",
                            }}
                          />
                        </div>
                      ) : (
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-colors"
                          style={{
                            background: l ? "rgba(255,214,0,.3)" : "rgba(255,214,0,.15)",
                            color: "#ffd600",
                          }}
                        >
                          {a.id + 1}
                        </span>
                      )}
                      <span className={a.matched ? "line-through opacity-60" : ""}>{a.zh}</span>
                    </div>
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,214,0,0.3), transparent)",
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {A.length > 0 && (
          <div
            className="rounded-3xl p-4 relative overflow-hidden"
            style={{
              background: "linear-gradient(180deg,rgba(14,22,64,.5),rgba(5,8,27,.35))",
              border: "1px solid rgba(57,255,20,.2)",
              backdropFilter: "blur(14px)",
              transform: "translateZ(10px)",
              boxShadow: "0 0 30px rgba(57,255,20,.08)",
            }}
          >
            <div
              className="absolute inset-0 rounded-3xl opacity-5 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 0%, #39ff14, transparent 70%)",
              }}
            />
            <h3
              className="text-xs font-black mb-3 text-center uppercase tracking-wider relative z-10"
              style={{
                color: "#39ff14",
                textShadow: "0 0 10px rgba(57,255,20,0.3)",
              }}
            >
              Parejas completadas / 完成的配对
            </h3>
            <div className="flex flex-wrap gap-2 justify-center relative z-10">
              {A.map((a, g) => (
                <div
                  key={a.id}
                  className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all hover:scale-105"
                  style={{
                    background: "rgba(57,255,20,.12)",
                    border: "1px solid rgba(57,255,20,.35)",
                    color: "#39ff14",
                    boxShadow: "0 0 12px rgba(57,255,20,.15)",
                    animation: "matchedPairAppear 0.5s ease-out",
                  }}
                >
                  <span>{a.es}</span>
                  <Link2Icon
                    size={10}
                    style={{
                      filter: "drop-shadow(0 0 2px #39ff14)",
                    }}
                  />
                  <span>{a.zh}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {t === "gameover" && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.92)",
              backdropFilter: "blur(24px)",
              perspective: "1000px",
            }}
          >
            <div
              className="text-center p-8 rounded-3xl max-w-sm mx-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.9),rgba(5,8,27,.7))",
                border: "1px solid rgba(255,138,42,.3)",
                boxShadow: "0 0 80px rgba(255,138,42,.2), 0 0 40px rgba(255,0,170,.1)",
                transform: "translateZ(50px)",
                animation: "victoryBounce 1s ease-out",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-60"
                style={{
                  background: "linear-gradient(135deg,#ff8a2a,#ffd600,#ff00aa)",
                  filter: "blur(30px)",
                  animation: "victoryGlow 2s ease-in-out infinite alternate",
                }}
              />
              <div
                className="absolute inset-0 rounded-[22px] opacity-10 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 50% 30%, #ff8a2a, transparent 70%)",
                }}
              />
              <TrophyIcon
                size={60}
                style={{
                  color: "#ffd600",
                  margin: "0 auto 16px",
                  filter: "drop-shadow(0 0 20px rgba(255,214,0,.6))",
                  animation: "trophySpin 3s ease-in-out infinite",
                }}
              />
              <h2
                className="text-3xl md:text-4xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg,#ff8a2a,#ffd600,#ff00aa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 20px rgba(255,138,42,.3))",
                }}
              >
                {b >= 8 ? "¡Completado!" : "¡Tiempo!"}
              </h2>
              <p className="text-white/50 text-sm mb-6">{b >= 8 ? "完成！" : "时间到！"}</p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div
                  className="p-3 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: "rgba(255,138,42,.12)",
                    border: "1px solid rgba(255,138,42,.2)",
                    boxShadow: "0 0 15px rgba(255,138,42,.1)",
                  }}
                >
                  <ZapIcon
                    size={18}
                    style={{
                      color: "#ff8a2a",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 4px #ff8a2a)",
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
                      color: "#ff8a2a",
                      textShadow: "0 0 10px rgba(255,138,42,0.3)",
                    }}
                  >
                    {N}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: "rgba(255,214,0,.12)",
                    border: "1px solid rgba(255,214,0,.2)",
                    boxShadow: "0 0 15px rgba(255,214,0,.1)",
                  }}
                >
                  <GitMergeIcon
                    size={18}
                    style={{
                      color: "#ffd600",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 4px #ffd600)",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Parejas
                  </p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#ffd600",
                      textShadow: "0 0 10px rgba(255,214,0,0.3)",
                    }}
                  >
                    {b}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: "rgba(57,255,20,.12)",
                    border: "1px solid rgba(57,255,20,.2)",
                    boxShadow: "0 0 15px rgba(57,255,20,.1)",
                  }}
                >
                  <TrophyIcon
                    size={18}
                    style={{
                      color: "#39ff14",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 4px #39ff14)",
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
                      color: "#39ff14",
                      textShadow: "0 0 10px rgba(57,255,20,0.3)",
                    }}
                  >
                    {ue}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                <button
                  onClick={() => {
                    playClick();
                    Z(null);
                  }}
                  className="px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg,#ff8a2a,#ffd600,#ff00aa)",
                    boxShadow: "0 0 30px rgba(255,138,42,.4), 0 0 60px rgba(255,0,170,.2)",
                  }}
                >
                  Jugar de nuevo / 再玩一次
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setT("select");
                  }}
                  className="px-4 py-3 rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(255,255,255,.15)",
                    color: "#fff",
                    boxShadow: "0 0 15px rgba(255,255,255,.05)",
                  }}
                >
                  Cambiar / 切换
                </button>
                <P_1 currentGameId="word-pairs" />
              </div>
            </div>
          </div>
        )}
        <style>{`
          @keyframes orbFloat1 { from{transform:translate(0,0) scale(1)} to{transform:translate(30px,-20px) scale(1.1)} }
          @keyframes orbFloat2 { from{transform:translate(0,0) scale(1)} to{transform:translate(-20px,30px) scale(1.05)} }
          @keyframes orbFloat3 { from{transform:translate(0,0) scale(1)} to{transform:translate(20px,20px) scale(1.08)} }
          @keyframes orbFloat4 { from{transform:translate(0,0) scale(1)} to{transform:translate(-15px,-25px) scale(1.12)} }
          @keyframes redFlashPairs { 0%{opacity:1} 100%{opacity:0} }
          @keyframes floatScorePairs { 0%{transform:translateY(0) scale(1);opacity:1} 50%{transform:translateY(-30px) scale(1.2);opacity:1} 100%{transform:translateY(-60px) scale(1.4);opacity:0} }
          @keyframes cardAppear { from{transform:scale(0.9) translateY(10px);opacity:0} to{transform:scale(1) translateY(0);opacity:1} }
          @keyframes matchedCardFly { 0%{transform:scale(1)} 50%{transform:scale(1.08) translateY(-6px)} 100%{transform:scale(0.97)} }
          @keyframes matchedPairAppear { from{transform:scale(0.6);opacity:0} 60%{transform:scale(1.05);opacity:1} 100%{transform:scale(1);opacity:1} }
          @keyframes connDash { to { stroke-dashoffset: -36; } }
          @keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
          @keyframes screenShake { 0%,100%{transform:translateX(0)} 10%{transform:translateX(-8px)} 20%{transform:translateX(8px)} 30%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 50%{transform:translateX(-4px)} 60%{transform:translateX(4px)} 70%{transform:translateX(-2px)} 80%{transform:translateX(2px)} 90%{transform:translateX(-1px)} }
          @keyframes victoryBounce { 0%{transform:translateZ(50px) scale(0.8); opacity:0} 60%{transform:translateZ(50px) scale(1.02); opacity:1} 100%{transform:translateZ(50px) scale(1); opacity:1} }
          @keyframes victoryGlow { from{opacity:.3} to{opacity:.7} }
          @keyframes trophySpin { 0%,100%{transform:rotateY(0deg)} 50%{transform:rotateY(25deg)} }
          @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
          @keyframes matchParticle { 0%{transform:translate(0,0) scale(1); opacity:1} 100%{transform:translate(var(--dx,20px), var(--dy,-30px)) scale(0); opacity:0} }
          @keyframes floatHeartUp { 0%{transform:translateY(0) rotate(0deg); opacity:0.15} 50%{opacity:0.25} 100%{transform:translateY(-110vh) rotate(360deg); opacity:0} }
          @keyframes mascotFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
          @keyframes mascotBounce { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-15px) scale(1.05)} }
          @keyframes mascotBounceFast { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-20px) scale(1.1)} }
          @keyframes antennaPulse { 0%,100%{opacity:0.6; transform:scale(1)} 50%{opacity:1; transform:scale(1.3)} }
          @keyframes starTwinkle { 0%,100%{opacity:0.3; transform:scale(0.8)} 50%{opacity:1; transform:scale(1.2)} }
          @keyframes tearDrop { 0%{transform:translateY(0) scale(1); opacity:0.7} 100%{transform:translateY(20px) scale(0.3); opacity:0} }
        `}</style>
      </div>
    </StarfieldBackground>
  );
}
export { AeComponent as default };
