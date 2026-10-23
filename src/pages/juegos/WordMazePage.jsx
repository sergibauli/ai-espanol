import {
  SparklesIcon,
  ZapIcon,
  LightbulbIcon,
  StarIcon,
  TrophyIcon,
  BookOpenIcon,
  ArrowLeftIcon,
  GitBranchIcon,
  LayersIcon,
  TimerIcon,
  GemIcon,
  SkullIcon,
  CrownIcon,
  ShieldIcon,
  FlameIcon,
  CloudSunIcon,
  CompassIcon,
  MountainIcon,
  SwordsIcon,
  WavesIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g as g_1, a as a_1 } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
const length = 10;
const Oe = 4;
function qe(espanol) {
  return espanol
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-ZÑ]/g, "")
    .trim();
}
function q(a) {
  const r = [...a];
  for (let l = r.length - 1; l > 0; l--) {
    const d = Math.floor(Math.random() * (l + 1));
    [r[l], r[d]] = [r[d], r[l]];
  }
  return r;
}
function be(grid, r, l) {
  const d = new Set();
  const c = [[r, l]];
  for (d.add(`${r},${l}`); c.length > 0;) {
    const [m, y] = c.shift();
    const w = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    for (const [j, n] of w) {
      const o = m + j;
      const x = y + n;
      if (o < 0 || o >= length || x < 0 || x >= length || grid[o][x].isWall) {
        continue;
      }
      const g = `${o},${x}`;
      if (!d.has(g)) {
        d.add(g);
        c.push([o, x]);
      }
    }
  }
  return d;
}
function ue(espanol) {
  const grid = Array.from(
    {
      length,
    },
    (n, r_2) =>
      Array.from(
        {
          length,
        },
        (x, c_1) => ({
          r: r_2,
          c: c_1,
          letter: null,
          order: null,
          isWall: false,
          isTrap: false,
        }),
      ),
  );
  for (let n = 0; n < length; n++) {
    for (let o = 0; o < length; o++) {
      if (Math.random() < 0.2) {
        grid[n][o].isWall = true;
      }
    }
  }
  grid[0][0].isWall = false;
  let playerPos = [0, 0];
  const d = espanol.split("");
  let c = be(grid, 0, 0);
  let m = 0;
  while (c.size < length * length * 0.5 && m < 100) {
    for (let n = 0; n < length; n++) {
      for (let o = 0; o < length; o++) {
        if (grid[n][o].isWall && Math.random() < 0.3) {
          grid[n][o].isWall = false;
        }
      }
    }
    c = be(grid, 0, 0);
    m++;
  }
  const y = Array.from(c).map((n) => n.split(",").map(Number));
  const w = q([...y]).slice(0, d.length);
  d.forEach((n, o) => {
    const [x, g] = w[o];
    grid[x][g].letter = n;
    grid[x][g].order = o + 1;
    grid[x][g].isWall = false;
    grid[x][g].isTrap = false;
  });
  const j = y.filter(([n, o]) => !grid[n][o].letter);
  q(j)
    .slice(0, Oe)
    .forEach(([n, o]) => {
      grid[n][o].isTrap = true;
    });
  return {
    grid,
    playerPos,
  };
}
function He1Component({ expression }) {
  const r =
    expression === "sad"
      ? "M22 32 Q26 28 30 32 M50 32 Q54 28 58 32"
      : expression === "excited"
        ? "M22 30 Q26 22 30 30 M50 30 Q54 22 58 30"
        : "M24 30 Q26 26 28 30 M52 30 Q54 26 56 30";
  const l =
    expression === "happy"
      ? "M32 44 Q40 52 48 44"
      : expression === "sad"
        ? "M32 48 Q40 42 48 48"
        : expression === "excited"
          ? "M32 42 Q40 56 48 42 Z"
          : "M36 46 Q40 48 44 46";
  const fill = expression === "excited" ? "#ff69b4" : expression === "happy" ? "#ff85a2" : "#ff99aa";
  const opacity = expression === "neutral" ? "0.5" : "0.8";
  const m =
    expression === "excited" ? "mascotBounce" : expression === "happy" ? "mascotBounceSoft" : "mascotFloat";
  return (
    <div
      className="fixed bottom-4 right-4 z-50 pointer-events-none"
      style={{
        animation: `${m} 3s ease-in-out infinite`,
      }}
    >
      <div className="relative">
        <svg
          width="100"
          height="100"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_20px_rgba(255,105,180,0.5)]"
        >
          <defs>
            <radialGradient id="bodyGrad" cx="40" cy="40" r="35" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fff0f5" />
              <stop offset="60%" stopColor="#ffcce0" />
              <stop offset="100%" stopColor="#ff99bb" />
            </radialGradient>
            <radialGradient id="earGrad" cx="10" cy="10" r="10" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffe0ec" />
              <stop offset="100%" stopColor="#ff99bb" />
            </radialGradient>
            <filter id="glowMascot">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <ellipse cx="18" cy="16" rx="10" ry="14" fill="url(#earGrad)" transform="rotate(-25 18 16)" />
          <ellipse cx="62" cy="16" rx="10" ry="14" fill="url(#earGrad)" transform="rotate(25 62 16)" />
          <ellipse cx="18" cy="16" rx="6" ry="9" fill="#ff69b4" opacity="0.6" transform="rotate(-25 18 16)" />
          <ellipse cx="62" cy="16" rx="6" ry="9" fill="#ff69b4" opacity="0.6" transform="rotate(25 62 16)" />
          <circle cx="40" cy="44" r="32" fill="url(#bodyGrad)" filter="url(#glowMascot)" />
          <path d={r} stroke="#2a1a2a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="26" cy="32" r="2" fill="#2a1a2a" />
          <circle cx="54" cy="32" r="2" fill="#2a1a2a" />
          <path
            d={l}
            stroke="#2a1a2a"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill={expression === "excited" ? "#ff4d6d" : "none"}
          />
          <circle cx="18" cy="42" r="6" fill={fill} opacity={opacity} />
          <circle cx="62" cy="42" r="6" fill={fill} opacity={opacity} />
          <ellipse cx="22" cy="70" rx="6" ry="4" fill="#ff99bb" />
          <ellipse cx="58" cy="70" rx="6" ry="4" fill="#ff99bb" />
          {expression === "excited" && (
            <>
              <circle cx="8" cy="24" r="2" fill="#ffd700">
                <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle cx="72" cy="20" r="1.5" fill="#ffd700">
                <animate attributeName="opacity" values="0;1;0" dur="0.8s" repeatCount="indefinite" />
              </circle>
              <circle cx="76" cy="50" r="2" fill="#00d4ff">
                <animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite" />
              </circle>
            </>
          )}
          {expression === "sad" && (
            <>
              <path d="M20 38 Q18 46 20 52" stroke="#00d4ff" strokeWidth="2" fill="none" opacity="0.8">
                <animate
                  attributeName="d"
                  values="M20 38 Q18 46 20 52;M20 42 Q18 50 20 56"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>
              <path d="M60 38 Q62 46 60 52" stroke="#00d4ff" strokeWidth="2" fill="none" opacity="0.8">
                <animate
                  attributeName="d"
                  values="M60 38 Q62 46 60 52;M60 42 Q62 50 60 56"
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              </path>
            </>
          )}
        </svg>
        <div className="absolute -top-10 -left-12 bg-white/90 rounded-xl px-3 py-1.5 text-[10px] font-black text-pink-600 shadow-[0_0_15px_rgba(255,105,180,0.3)] whitespace-nowrap animate-floatBubble">
          {expression === "happy" && "¡Bien hecho! ✨"}
          {expression === "sad" && "¡Cuidado! 💔"}
          {expression === "excited" && "¡Increíble! 🎉"}
          {expression === "neutral" && "¡Vamos! 🌟"}
          <div className="absolute -bottom-1 right-4 w-2 h-2 bg-white/90 rotate-45" />
        </div>
      </div>
    </div>
  );
}
function Ye1Component() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({
        length: 30,
      }).map((a, r) => (
        <div
          key={r}
          className="absolute rounded-full"
          style={{
            width: `${3 + Math.random() * 6}px`,
            height: `${3 + Math.random() * 6}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: [
              "#39ff14",
              "#00d4ff",
              "#ff00aa",
              "#ffd700",
              "#ff69b4",
              "#ff4d6d",
              "#00ff88",
              "#b829dd",
            ][r % 8],
            opacity: 0.2 + Math.random() * 0.5,
            animation: `particleFloat ${4 + Math.random() * 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            filter: Math.random() > 0.5 ? "blur(1px)" : "blur(0px)",
            boxShadow: `0 0 ${6 + Math.random() * 12}px currentColor`,
          }}
        />
      ))}
    </div>
  );
}
function HeComponent() {
  return (
    <div className="absolute -top-6 -left-6 pointer-events-none z-20">
      <div className="relative">
        <FlameIcon
          size={28}
          className="text-orange-400 drop-shadow-[0_0_10px_rgba(255,165,0,0.6)] animate-flicker"
        />
        <div className="absolute inset-0 bg-orange-400/20 blur-xl rounded-full animate-pulse" />
      </div>
    </div>
  );
}
function VeComponent() {
  return (
    <div className="absolute -top-6 -right-6 pointer-events-none z-20">
      <div className="relative">
        <FlameIcon
          size={28}
          className="text-orange-400 drop-shadow-[0_0_10px_rgba(255,165,0,0.6)] animate-flicker"
          style={{
            animationDelay: "0.5s",
          }}
        />
        <div
          className="absolute inset-0 bg-orange-400/20 blur-xl rounded-full animate-pulse"
          style={{
            animationDelay: "0.5s",
          }}
        />
      </div>
    </div>
  );
}
function $e() {
  const a = ["#39ff14", "#00d4ff", "#ff00aa", "#ffd700", "#ff69b4", "#ff4d6d", "#00ff88", "#b829dd"];
  const r = ["50%", "0%", "50% 0 50% 0"];
  for (let l = 0; l < 80; l++) {
    const d = document.createElement("div");
    const c = 6 + Math.random() * 10;
    const m = a[l % a.length];
    const y = r[l % r.length];
    d.style.cssText = `position:fixed;left:50%;top:50%;width:${c}px;height:${c}px;border-radius:${y};background:${m};pointer-events:none;z-index:9999;box-shadow:0 0 ${c}px ${m};`;
    document.body.appendChild(d);
    const w = (Math.PI * 2 * l) / 80 + (Math.random() - 0.5) * 0.5;
    const j = 4 + Math.random() * 18;
    let n = window.innerWidth / 2;
    let o = window.innerHeight / 2;
    let x = 1;
    let g = 0;
    const Y = Math.cos(w) * j;
    const v = Math.sin(w) * j - 6;
    const C = (Math.random() - 0.5) * 20;
    const k = () => {
      n += Y * 0.15;
      o += v * 0.15;
      g += C;
      x -= 0.008;
      d.style.left = `${n}px`;
      d.style.top = `${o}px`;
      d.style.opacity = String(x);
      d.style.transform = `rotate(${g}deg)`;
      if (x > 0) {
        requestAnimationFrame(k);
      } else {
        d.remove();
      }
    };
    requestAnimationFrame(k);
  }
}
function JeComponent({ show }) {
  if (show) {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-[200]"
        style={{
          animation: "collisionFlash 0.5s ease-out forwards",
          background:
            "radial-gradient(circle, rgba(255,56,96,.4) 0%, rgba(255,56,96,.15) 50%, transparent 70%)",
        }}
      />
    );
  }
  return null;
}
function KeComponent({ m: m_1, onClick }) {
  const [l, setL] = React.useState({
    x: 0,
    y: 0,
  });
  const cRef = React.useRef(null);
  const { playClick } = useSound();
  const onMouseMove = (j) => {
    if (!cRef.current) {
      return;
    }
    const n = cRef.current.getBoundingClientRect();
    const o = (j.clientX - n.left) / n.width;
    const x = (j.clientY - n.top) / n.height;
    setL({
      x: (x - 0.5) * -20,
      y: (o - 0.5) * 20,
    });
  };
  const onMouseLeave = () =>
    setL({
      x: 0,
      y: 0,
    });
  return (
    <button
      ref={cRef}
      onClick={() => {
        playClick();
        onClick();
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group rounded-2xl p-5 text-left transition-all relative overflow-hidden"
      style={{
        background: "linear-gradient(145deg, rgba(14,22,64,.7), rgba(5,8,27,.5))",
        border: `1px solid ${m_1.color}50`,
        transform: `perspective(600px) rotateX(${l.x}deg) rotateY(${l.y}deg) translateZ(10px)`,
        transformStyle: "preserve-3d",
        boxShadow: `0 10px 40px rgba(0,0,0,.5), 0 0 20px ${m_1.color}20`,
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
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <SparklesIcon
          size={16}
          style={{
            color: m_1.color,
          }}
          className="animate-spin-slow"
        />
      </div>
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-3 relative"
        style={{
          background: `linear-gradient(135deg, ${m_1.color}, ${m_1.color}66)`,
          transform: "translateZ(20px)",
          boxShadow: `0 0 20px ${m_1.color}40`,
        }}
      >
        <BookOpenIcon size={26} className="text-white drop-shadow-md" />
        <div
          className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle, ${m_1.color}60, transparent 70%)`,
          }}
        />
      </div>
      <h3
        className="text-white font-black text-base mb-1"
        style={{
          transform: "translateZ(15px)",
          textShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        {m_1.titulo}
      </h3>
      <p
        className="text-xs font-medium mb-1"
        style={{
          color: `${m_1.color}cc`,
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
function PaComponent() {
  const [a, setA] = React.useState("select");
  const [l, setL] = React.useState([]);
  const [c, setC] = React.useState(0);
  const [y, setY] = React.useState([]);
  const [j, setJ] = React.useState([0, 0]);
  const [o, setO] = React.useState(0);
  const [g, setG] = React.useState(new Set());
  const [v, setV] = React.useState(90);
  const [k, setK] = React.useState(0);
  const [ve, setVe] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("wordmaze_best") || "0");
    } catch {
      return 0;
    }
  });
  const [V, setV_1] = React.useState("");
  const [$, set$] = React.useState(false);
  const [I, setI] = React.useState(null);
  const [ee, setEe] = React.useState("neutral");
  const [b, setB] = React.useState(40);
  const ARef = React.useRef(null);
  const NeRef = React.useRef(0);
  const Se = g_1();
  const [ae, setAe] = React.useState("");
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const M = l[c];
  React.useEffect(() => {
    const s = () => {
      const t = Math.min(window.innerWidth - 32, 520);
      const p = Math.max(28, Math.floor(t / length) - 4);
      setB(p);
    };
    s();
    window.addEventListener("resize", s);
    return () => window.removeEventListener("resize", s);
  }, []);
  React.useEffect(() => {
    if (a !== "playing") {
      setEe(a === "gameover" ? "excited" : "neutral");
      return;
    }
    const s = setTimeout(() => setEe("neutral"), 2000);
    return () => clearTimeout(s);
  }, [ee, a]);
  const R = React.useCallback((s) => {
    let t = s ? a_1(s) : a_1();
    if (t.length === 0) {
      setAe(
        'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
      );
      return;
    }
    const p = q(
      t
        .filter((f) => f.espanol && f.chino)
        .map((f) => ({
          espanol: qe(f.espanol),
          chino: f.chino,
        }))
        .filter((f) => f.espanol.length >= 3 && f.espanol.length <= 8),
    );
    setL(p);
    setC(0);
    setO(0);
    setG(new Set());
    setV(90);
    setK(0);
    setV_1("");
    setEe("neutral");
    if (p.length > 0) {
      const { grid, playerPos } = ue(p[0].espanol);
      setY(grid);
      setJ(playerPos);
    }
    setA("playing");
  }, []);
  React.useEffect(() => {
    if (a === "playing" && v > 0) {
      ARef.current = setInterval(() => setV((s) => s - 1), 1000);
      return () => {
        if (ARef.current) {
          clearInterval(ARef.current);
        }
      };
    }
  }, [a, v]);
  React.useEffect(() => {
    if (a === "playing" && v <= 0) {
      setA("gameover");
      playLose();
      setEe("sad");
      setVe((s) => {
        const t = Math.max(s, k);
        localStorage.setItem("wordmaze_best", String(t));
        return t;
      });
    }
  }, [a, v, k, playLose]);
  const S = React.useCallback(
    (s, t) => {
      if (!(a !== "playing" || y.length === 0)) {
        playClick();
        setJ((p) => {
          const [f, z] = p;
          const u = f + s;
          const T = z + t;
          if (u < 0 || u >= length || T < 0 || T >= length) {
            return p;
          }
          const L = y[u][T];
          if (L.isWall) {
            return p;
          }
          setG((W) => new Set(W).add(`${u},${T}`));
          if (L.isTrap) {
            playWrong();
            setV((W) => Math.max(0, W - 10));
            setV_1("¡Trampa! -10s / 陷阱！");
            set$(true);
            setEe("sad");
            setTimeout(() => {
              set$(false);
              setV_1("");
            }, 1500);
          } else if (L.letter && L.order === o + 1) {
            playCorrect();
            const W = o + 1;
            setO(W);
            setK((F) => F + 50);
            setY((F) =>
              F.map((D) =>
                D.map((_) => {
                  if (_.r === u && _.c === T) {
                    return {
                      ..._,
                      letter: null,
                      order: null,
                    };
                  }
                  return _;
                }),
              ),
            );
            setEe("happy");
            if (W === M?.espanol.length) {
              const F = 100 + v * 2;
              const D = k + F;
              setK(D);
              setV_1("¡Palabra completada! / 单词完成！");
              setEe("excited");
              playWin();
              $e();
              ++NeRef.current;
              setI({
                show: true,
                text: `+${F}`,
                x: window.innerWidth / 2,
                y: window.innerHeight / 2 - 80,
              });
              setTimeout(() => setI(null), 1500);
              setTimeout(() => {
                setV_1("");
                setV(90);
                const _ = c + 1;
                if (_ < l.length) {
                  setC(_);
                  setO(0);
                  setG(new Set());
                  const { grid, playerPos } = ue(l[_].espanol);
                  setY(grid);
                  setJ(playerPos);
                  setEe("neutral");
                } else {
                  setA("gameover");
                  setEe("excited");
                  setVe((U) => {
                    const B = Math.max(U, D);
                    localStorage.setItem("wordmaze_best", String(B));
                    return B;
                  });
                }
              }, 1000);
            }
          }
          return [u, T];
        });
      }
    },
    [a, y, o, M, v, k, c, l, playClick, playCorrect, playWrong, playWin],
  );
  React.useEffect(() => {
    const s = (t) => {
      if (t.key === "ArrowUp") {
        S(-1, 0);
      } else if (t.key === "ArrowDown") {
        S(1, 0);
      } else if (t.key === "ArrowLeft") {
        S(0, -1);
      } else if (t.key === "ArrowRight") {
        S(0, 1);
      }
    };
    window.addEventListener("keydown", s);
    return () => window.removeEventListener("keydown", s);
  }, [S]);
  const X = v <= 15 && a === "playing";
  const Me = v <= 5 && a === "playing";
  const _e = M
    ? M.espanol.split("").map((ch, t) => ({
        ch,
        collected: t < o,
      }))
    : [];
  if (a === "select") {
    return (
      <StarfieldBackground>
        <Ye1Component />
        <div
          className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative z-10"
          style={{
            perspective: "1000px",
          }}
        >
          <SoundToggles />
          <He1Component expression="neutral" />
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/juegos"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold group"
            >
              <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver /
              返回
            </Link>
          </div>
          <div className="text-center mb-10">
            <div className="inline-block mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#39ff14] to-[#00d4ff] blur-2xl opacity-30 rounded-full" />
              <h1
                className="text-4xl md:text-6xl font-black mb-3 relative"
                style={{
                  textShadow:
                    "0 0 40px rgba(57,255,20,0.4), 0 0 80px rgba(0,212,255,0.2), 0 0 120px rgba(57,255,20,0.1)",
                  transform: "translateZ(30px)",
                }}
              >
                <GitBranchIcon
                  size={40}
                  className="inline mr-3 text-[#39ff14] drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]"
                />{" "}
                Word Maze
              </h1>
            </div>
            <p className="text-white/40 text-sm font-medium">
              Selecciona un módulo para jugar / 选择模块开始游戏
            </p>
            {ae && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold animate-fadeIn"
                style={{
                  background: "rgba(255,68,68,.12)",
                  border: "1px solid rgba(255,68,68,.3)",
                  color: "#ff6b35",
                }}
              >
                {ae}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => {
                playClick();
                setAe("");
                R(null);
              }}
              className="group rounded-2xl p-5 text-left transition-all relative overflow-hidden"
              style={{
                background: "linear-gradient(145deg, rgba(14,22,64,.7), rgba(5,8,27,.5))",
                border: "1px solid rgba(255,0,170,.4)",
                transform: "perspective(600px) translateZ(10px)",
                transformStyle: "preserve-3d",
                boxShadow: "0 10px 40px rgba(0,0,0,.5), 0 0 30px rgba(255,0,170,.15)",
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
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <SparklesIcon size={16} className="text-[#ff00aa] animate-spin-slow" />
              </div>
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-3 relative"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                  transform: "translateZ(20px)",
                  boxShadow: "0 0 20px rgba(255,0,170,0.4)",
                }}
              >
                <LayersIcon size={26} className="text-white drop-shadow-md" />
                <div
                  className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                  style={{
                    background: "radial-gradient(circle, rgba(255,0,170,0.6), transparent 70%)",
                  }}
                />
              </div>
              <h3
                className="text-white font-black text-base mb-1"
                style={{
                  transform: "translateZ(15px)",
                  textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                }}
              >
                Todos los módulos
              </h3>
              <p
                className="text-xs font-medium mb-1"
                style={{
                  color: "rgba(255,0,170,.8)",
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
            {Se.map((m) => (
              <KeComponent
                key={m.id}
                m={m}
                onClick={() => {
                  setAe("");
                  R(m.id);
                }}
              />
            ))}
          </div>
        </div>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <Ye1Component />
      <div
        className={`max-w-4xl mx-auto px-3 py-4 min-h-screen relative z-10 ${$ ? "animate-screenShake" : ""}`}
        style={{
          perspective: "1000px",
        }}
      >
        <SoundToggles />
        <He1Component expression={ee} />
        <JeComponent show={$} />
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold group"
          >
            <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver /
            返回
          </Link>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                playClick();
                setA("select");
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
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all"
              style={{
                background: "rgba(57,255,20,.15)",
                border: "2px solid rgba(57,255,20,.4)",
                color: "#39ff14",
                boxShadow:
                  "0 0 15px rgba(57,255,20,.25), 0 0 30px rgba(57,255,20,.1), inset 0 0 10px rgba(57,255,20,.1)",
                transform: "translateZ(10px)",
              }}
            >
              <ZapIcon size={12} className="inline mr-1" /> {k}
            </div>
            <div
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${Me ? "animate-pulse-fast" : ""}`}
              style={{
                background: X ? "rgba(255,68,68,.2)" : "rgba(0,212,255,.15)",
                border: X ? "2px solid rgba(255,68,68,.5)" : "2px solid rgba(0,212,255,.4)",
                color: X ? "#ff6b35" : "#00d4ff",
                boxShadow: X
                  ? "0 0 20px rgba(255,68,68,.3), 0 0 40px rgba(255,68,68,.15)"
                  : "0 0 15px rgba(0,212,255,.25), 0 0 30px rgba(0,212,255,.1)",
                transform: "translateZ(10px)",
              }}
            >
              <TimerIcon size={12} className="inline mr-1" /> {v}s
            </div>
          </div>
        </div>
        <div
          className="text-center mb-2"
          style={{
            transform: "translateZ(20px)",
          }}
        >
          <h1
            className="text-2xl md:text-4xl font-black mb-1"
            style={{
              background: "linear-gradient(135deg,#39ff14,#00d4ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 20px rgba(57,255,20,.4))",
            }}
          >
            <MountainIcon
              size={28}
              className="inline mr-2 text-[#39ff14] drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]"
            />
            Word Maze
          </h1>
          <p className="text-white/40 text-xs font-medium">Usa las flechas para moverte / 使用方向键移动</p>
        </div>
        {I && (
          <div
            className="fixed pointer-events-none z-[9998] font-black text-2xl -translate-x-1/2"
            style={{
              left: I.x,
              top: I.y,
              color: "#39ff14",
              textShadow: "0 0 20px #39ff14, 0 0 40px #39ff14",
              animation: "floatScoreMaze 1.5s ease-out forwards",
            }}
          >
            {I.text}
          </div>
        )}
        {M && (
          <div className="text-center mb-3">
            <div className="inline-flex items-center gap-1.5 flex-wrap justify-center">
              {_e.map((s, key) => (
                <div
                  key={key}
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center font-black text-sm md:text-base transition-all duration-300"
                  style={{
                    background: s.collected
                      ? "linear-gradient(135deg, rgba(57,255,20,.3), rgba(0,212,160,.25))"
                      : "rgba(255,255,255,.06)",
                    border: s.collected ? "2px solid rgba(57,255,20,.6)" : "1px solid rgba(255,255,255,.12)",
                    color: s.collected ? "#39ff14" : "rgba(255,255,255,.25)",
                    boxShadow: s.collected
                      ? "0 0 15px rgba(57,255,20,.4), 0 0 25px rgba(57,255,20,.2)"
                      : "none",
                    textShadow: s.collected ? "0 0 10px rgba(57,255,20,.6)" : "none",
                    transform: s.collected ? "translateZ(8px) scale(1.05)" : "translateZ(0px)",
                    animation: s.collected ? "popIn 0.4s ease-out" : "none",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {s.collected ? <GemIcon size={14} className="text-[#39ff14]" /> : s.ch}
                </div>
              ))}
            </div>
          </div>
        )}
        {M && (
          <div className="text-center mb-3">
            <div
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl font-black text-xl md:text-2xl relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(57,255,20,.2), rgba(0,212,160,.15))",
                border: "2px solid rgba(57,255,20,.4)",
                color: "#39ff14",
                boxShadow: "0 0 30px rgba(57,255,20,.25), 0 0 60px rgba(57,255,20,.15)",
                textShadow: "0 0 15px rgba(57,255,20,.5)",
                transform: "translateZ(10px)",
              }}
            >
              <div
                className="absolute -inset-[1px] rounded-2xl opacity-30 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, rgba(57,255,20,0), rgba(57,255,20), rgba(57,255,20,0))",
                  backgroundSize: "200% 100%",
                  animation: "borderRotate 3s linear infinite",
                  zIndex: -1,
                }}
              />
              <LightbulbIcon
                size={24}
                className="text-[#ffd600] drop-shadow-[0_0_8px_rgba(255,214,0,0.5)] animate-pulse-slow"
              />
              <span>Pista: {M.chino}</span>
              <span className="text-sm opacity-60">
                ({o}/{M.espanol.length})
              </span>
            </div>
          </div>
        )}
        <div className="flex justify-center mb-3">
          <div
            className="relative overflow-hidden rounded-2xl p-3 md:p-4"
            style={{
              background: "linear-gradient(180deg, rgba(14,22,64,.7), rgba(5,8,27,.5))",
              border: "2px solid rgba(57,255,20,.3)",
              backdropFilter: "blur(14px)",
              boxShadow:
                "0 0 50px rgba(57,255,20,.15), 0 20px 60px rgba(0,0,0,.5), inset 0 0 60px rgba(0,0,0,.3)",
              transform: "translateZ(15px) rotateX(5deg)",
              transformStyle: "preserve-3d",
              perspective: "800px",
              animation: "mazeFloat 6s ease-in-out infinite",
            }}
          >
            <div
              className="absolute -inset-[1px] rounded-2xl opacity-30 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, rgba(57,255,20,0), rgba(57,255,20), rgba(57,255,20,0))",
                backgroundSize: "200% 100%",
                animation: "borderRotate 3s linear infinite",
                zIndex: -1,
              }}
            />
            <HeComponent />
            <VeComponent />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `repeating-linear-gradient(0deg, transparent, transparent ${b - 1}px, rgba(57,255,20,.04) ${b - 1}px, rgba(57,255,20,.04) ${b}px), repeating-linear-gradient(90deg, transparent, transparent ${b - 1}px, rgba(57,255,20,.04) ${b - 1}px, rgba(57,255,20,.04) ${b}px)`,
                zIndex: 0,
                top: "12px",
                left: "12px",
                right: "12px",
                bottom: "12px",
              }}
            />
            <div
              className="grid gap-1 md:gap-1.5"
              style={{
                gridTemplateColumns: `repeat(${length}, ${b}px)`,
              }}
            >
              {y.map((s) =>
                s.map((t) => {
                  const p = j[0] === t.r && j[1] === t.c;
                  const f = g.has(`${t.r},${t.c}`);
                  const z = t.letter === null && t.order !== null;
                  const u = t.letter && t.order === o + 1;
                  return (
                    <div
                      key={`${t.r}-${t.c}`}
                      className="flex items-center justify-center font-black rounded-lg transition-all duration-200 relative"
                      style={{
                        width: `${b}px`,
                        height: `${b}px`,
                        fontSize: `${b * 0.45}px`,
                        background: p
                          ? "linear-gradient(135deg, rgba(57,255,20,.4), rgba(0,212,160,.35))"
                          : t.isWall
                            ? "linear-gradient(145deg, rgba(0,0,0,.7), rgba(20,20,35,.6))"
                            : t.isTrap
                              ? "linear-gradient(135deg, rgba(255,56,96,.35), rgba(180,30,60,.3))"
                              : z
                                ? "linear-gradient(135deg, rgba(57,255,20,.25), rgba(0,212,160,.2))"
                                : f
                                  ? "linear-gradient(135deg, rgba(0,212,160,.2), rgba(0,150,200,.15))"
                                  : "linear-gradient(145deg, rgba(255,255,255,.08), rgba(255,255,255,.03))",
                        border: p
                          ? "2px solid rgba(57,255,20,.8)"
                          : t.isWall
                            ? "1px solid rgba(80,80,110,.6)"
                            : t.isTrap
                              ? "1px solid rgba(255,56,96,.7)"
                              : u
                                ? "2px solid rgba(255,215,0,.8)"
                                : t.letter
                                  ? "1px solid rgba(57,255,20,.5)"
                                  : "1px solid rgba(255,255,255,.12)",
                        color: p
                          ? "#39ff14"
                          : t.isTrap
                            ? "#ff3860"
                            : u
                              ? "#ffd700"
                              : t.letter
                                ? "#39ff14"
                                : f
                                  ? "#00d4a0"
                                  : "transparent",
                        boxShadow: p
                          ? "0 0 25px rgba(57,255,20,.6), 0 0 50px rgba(57,255,20,.3), inset 0 0 15px rgba(57,255,20,.2)"
                          : u
                            ? "0 0 20px rgba(255,215,0,.5), 0 0 40px rgba(255,215,0,.3), 0 0 60px rgba(255,215,0,.15)"
                            : t.letter
                              ? "0 0 12px rgba(57,255,20,.4), 0 0 20px rgba(57,255,20,.2)"
                              : t.isTrap
                                ? "0 0 12px rgba(255,56,96,.4), 0 0 20px rgba(255,56,96,.2)"
                                : f
                                  ? "0 0 8px rgba(0,212,160,.3)"
                                  : "none",
                        textShadow: p
                          ? "0 0 12px rgba(57,255,20,.8), 0 0 20px rgba(57,255,20,.5)"
                          : u
                            ? "0 0 10px rgba(255,215,0,.8), 0 0 20px rgba(255,215,0,.5)"
                            : t.letter
                              ? "0 0 8px rgba(57,255,20,.6), 0 0 15px rgba(57,255,20,.4)"
                              : "none",
                        transform: p
                          ? "scale(1.1) translateZ(12px)"
                          : t.isWall
                            ? "translateZ(6px)"
                            : u
                              ? "translateZ(10px) scale(1.05)"
                              : "scale(1)",
                        transformStyle: "preserve-3d",
                        animation: p
                          ? "playerPulse 1.5s ease-in-out infinite"
                          : u
                            ? "targetFloat3D 2s ease-in-out infinite"
                            : t.letter
                              ? "letterGlow 2s ease-in-out infinite"
                              : f
                                ? "trailGlow 1.5s ease-in-out infinite"
                                : t.isWall
                                  ? "wallNeon 3s ease-in-out infinite"
                                  : "none",
                      }}
                    >
                      {t.isWall && (
                        <>
                          <div
                            className="absolute inset-0 opacity-40"
                            style={{
                              background:
                                "repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,.04) 3px, rgba(255,255,255,.04) 6px)",
                            }}
                          />
                          <div
                            className="absolute inset-0 opacity-20"
                            style={{
                              background: "linear-gradient(145deg, rgba(100,100,140,.3) 0%, transparent 50%)",
                            }}
                          />
                          <div
                            className="absolute -bottom-1 left-0 right-0 h-1 opacity-30"
                            style={{
                              background: "linear-gradient(to bottom, transparent, rgba(0,0,0,.5))",
                            }}
                          />
                        </>
                      )}
                      {t.isTrap && (
                        <div className="animate-float-icon">
                          <SkullIcon
                            size={b * 0.5}
                            className="text-red-400 drop-shadow-[0_0_5px_rgba(255,56,96,0.6)]"
                          />
                        </div>
                      )}
                      {!t.isTrap && !t.isWall && t.letter && (
                        <div
                          className="flex items-center justify-center"
                          style={{
                            transformStyle: "preserve-3d",
                          }}
                        >
                          {u ? (
                            <div
                              className="relative"
                              style={{
                                animation: "targetFloat3D 2s ease-in-out infinite",
                              }}
                            >
                              <CrownIcon
                                size={b * 0.55}
                                className="text-[#ffd700] drop-shadow-[0_0_10px_rgba(255,215,0,0.7)]"
                              />
                              <div className="absolute inset-0 bg-[#ffd700] blur-lg rounded-full opacity-40 animate-pulse" />
                              <div
                                className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-[#ffd700]"
                                style={{
                                  animation: "sparklePop 1s ease-in-out infinite",
                                }}
                              />
                              <div
                                className="absolute -bottom-1 -right-1 w-1.5 h-1.5 rounded-full bg-[#ff00aa]"
                                style={{
                                  animation: "sparklePop 1.2s ease-in-out infinite",
                                  animationDelay: "0.5s",
                                }}
                              />
                            </div>
                          ) : (
                            <span
                              style={{
                                animation: "letterGlow 2s ease-in-out infinite",
                                textShadow: "0 0 8px rgba(57,255,20,.6), 0 0 15px rgba(57,255,20,.4)",
                              }}
                            >
                              {t.letter}
                            </span>
                          )}
                        </div>
                      )}
                      {p && (
                        <div
                          className="flex items-center justify-center"
                          style={{
                            transformStyle: "preserve-3d",
                            animation: "playerSpin 3s linear infinite",
                          }}
                        >
                          <ShieldIcon
                            size={b * 0.6}
                            className="text-[#39ff14] drop-shadow-[0_0_10px_rgba(57,255,20,0.6)]"
                          />
                          <div
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: "radial-gradient(circle, rgba(57,255,20,.3), transparent 70%)",
                              animation: "playerPulse 1.5s ease-in-out infinite",
                            }}
                          />
                        </div>
                      )}
                      {z && (
                        <div
                          style={{
                            animation: "sparklePop 1.5s ease-in-out infinite",
                          }}
                        >
                          <StarIcon
                            size={b * 0.4}
                            className="text-[#39ff14] drop-shadow-[0_0_8px_rgba(57,255,20,0.6)]"
                          />
                        </div>
                      )}
                      {f && !p && !t.letter && !t.isTrap && !t.isWall && !z && (
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            background: "rgba(0,212,160,.6)",
                            boxShadow: "0 0 8px rgba(0,212,160,.5), 0 0 15px rgba(0,212,160,.3)",
                            animation: "trailGlow 1.5s ease-in-out infinite",
                          }}
                        />
                      )}
                    </div>
                  );
                }),
              )}
            </div>
            <div className="absolute bottom-1 left-2 pointer-events-none opacity-40">
              <WavesIcon size={14} className="text-[#00d4ff] animate-pulse-slow" />
            </div>
            <div className="absolute bottom-1 right-2 pointer-events-none opacity-40">
              <CloudSunIcon
                size={14}
                className="text-[#ffd700] animate-pulse-slow"
                style={{
                  animationDelay: "1s",
                }}
              />
            </div>
          </div>
        </div>
        {V && (
          <div className="text-center mb-3 animate-fadeIn">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl font-black text-sm"
              style={{
                background: "rgba(255,214,0,.12)",
                border: "1px solid rgba(255,214,0,.25)",
                color: "#ffd600",
                boxShadow: "0 0 15px rgba(255,214,0,.15)",
              }}
            >
              <SparklesIcon size={16} className="animate-spin-slow" />
              {V}
            </div>
          </div>
        )}
        <div className="flex flex-col items-center gap-2 mb-4 select-none">
          <button
            onClick={() => S(-1, 0)}
            className="w-14 h-14 md:w-16 md:h-16 rounded-2xl font-bold text-white transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
            style={{
              background: "linear-gradient(145deg, rgba(14,22,64,.5), rgba(5,8,27,.3))",
              border: "2px solid rgba(57,255,20,.3)",
              backdropFilter: "blur(10px)",
              boxShadow:
                "0 0 20px rgba(57,255,20,.2), 0 5px 20px rgba(0,0,0,.3), inset 0 0 15px rgba(57,255,20,.05)",
              transform: "translateZ(5px)",
            }}
          >
            <CompassIcon
              size={24}
              className="rotate-0 text-[#39ff14] drop-shadow-[0_0_5px_rgba(57,255,20,0.5)]"
            />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => S(0, -1)}
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl font-bold text-white transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
              style={{
                background: "linear-gradient(145deg, rgba(14,22,64,.5), rgba(5,8,27,.3))",
                border: "2px solid rgba(0,212,255,.3)",
                backdropFilter: "blur(10px)",
                boxShadow:
                  "0 0 20px rgba(0,212,255,.2), 0 5px 20px rgba(0,0,0,.3), inset 0 0 15px rgba(0,212,255,.05)",
                transform: "translateZ(5px)",
              }}
            >
              <SwordsIcon
                size={24}
                className="-rotate-90 text-[#00d4ff] drop-shadow-[0_0_5px_rgba(0,212,255,0.5)]"
              />
            </button>
            <button
              onClick={() => S(1, 0)}
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl font-bold text-white transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
              style={{
                background: "linear-gradient(145deg, rgba(14,22,64,.5), rgba(5,8,27,.3))",
                border: "2px solid rgba(57,255,20,.3)",
                backdropFilter: "blur(10px)",
                boxShadow:
                  "0 0 20px rgba(57,255,20,.2), 0 5px 20px rgba(0,0,0,.3), inset 0 0 15px rgba(57,255,20,.05)",
                transform: "translateZ(5px)",
              }}
            >
              <CompassIcon
                size={24}
                className="rotate-180 text-[#39ff14] drop-shadow-[0_0_5px_rgba(57,255,20,0.5)]"
              />
            </button>
            <button
              onClick={() => S(0, 1)}
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl font-bold text-white transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
              style={{
                background: "linear-gradient(145deg, rgba(14,22,64,.5), rgba(5,8,27,.3))",
                border: "2px solid rgba(0,212,255,.3)",
                backdropFilter: "blur(10px)",
                boxShadow:
                  "0 0 20px rgba(0,212,255,.2), 0 5px 20px rgba(0,0,0,.3), inset 0 0 15px rgba(0,212,255,.05)",
                transform: "translateZ(5px)",
              }}
            >
              <SwordsIcon
                size={24}
                className="rotate-90 text-[#00d4ff] drop-shadow-[0_0_5px_rgba(0,212,255,0.5)]"
              />
            </button>
          </div>
        </div>
        {a === "gameover" && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.92)",
              backdropFilter: "blur(20px)",
              perspective: "1000px",
            }}
          >
            <div
              className="text-center p-8 rounded-3xl max-w-sm mx-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(14,22,64,.9), rgba(5,8,27,.7))",
                border: "2px solid rgba(57,255,20,.35)",
                boxShadow: "0 0 80px rgba(57,255,20,.2), 0 30px 100px rgba(0,0,0,.6)",
                transform: "translateZ(50px) rotateX(0deg)",
                animation: "levelCompletePopup 1s ease-out",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-60"
                style={{
                  background: "linear-gradient(135deg, #39ff14, #00d4ff, #ff00aa, #ffd700)",
                  filter: "blur(30px)",
                  animation: "victoryGlow 2s ease-in-out infinite alternate",
                }}
              />
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                {Array.from({
                  length: 12,
                }).map((s, t) => (
                  <div
                    key={t}
                    className="absolute rounded-full"
                    style={{
                      width: `${4 + Math.random() * 4}px`,
                      height: `${4 + Math.random() * 4}px`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      background: ["#39ff14", "#00d4ff", "#ff00aa", "#ffd700"][t % 4],
                      opacity: 0.4,
                      animation: `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite`,
                      animationDelay: `${Math.random() * 3}s`,
                    }}
                  />
                ))}
              </div>
              <TrophyIcon
                size={56}
                className="mx-auto mb-4 text-[#ffd700] drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]"
                style={{
                  animation: "trophySpin 3s ease-in-out infinite",
                }}
              />
              <h2
                className="text-3xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg,#39ff14,#00d4ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 20px rgba(57,255,20,.4))",
                }}
              >
                ¡Tiempo!
              </h2>
              <p className="text-white/50 text-sm mb-6">时间到！</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(57,255,20,.12)",
                    border: "2px solid rgba(57,255,20,.3)",
                    boxShadow: "0 0 20px rgba(57,255,20,.15), 0 0 40px rgba(57,255,20,.1)",
                    transform: "perspective(400px) rotateX(5deg) translateZ(10px)",
                    transformStyle: "preserve-3d",
                    animation: "statCard3D 0.6s ease-out forwards",
                    animationDelay: "0.2s",
                    opacity: 0,
                  }}
                >
                  <ZapIcon
                    size={16}
                    className="mx-auto mb-1 text-[#39ff14] drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]"
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                      transform: "translateZ(5px)",
                    }}
                  >
                    Score
                  </p>
                  <p
                    className="text-lg font-black text-[#39ff14] drop-shadow-[0_0_10px_rgba(57,255,20,0.5)]"
                    style={{
                      transform: "translateZ(8px)",
                    }}
                  >
                    {k}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(0,212,160,.12)",
                    border: "2px solid rgba(0,212,160,.3)",
                    boxShadow: "0 0 20px rgba(0,212,160,.15), 0 0 40px rgba(0,212,160,.1)",
                    transform: "perspective(400px) rotateX(5deg) translateZ(10px)",
                    transformStyle: "preserve-3d",
                    animation: "statCard3D 0.6s ease-out forwards",
                    animationDelay: "0.4s",
                    opacity: 0,
                  }}
                >
                  <TrophyIcon
                    size={16}
                    className="mx-auto mb-1 text-[#00d4a0] drop-shadow-[0_0_8px_rgba(0,212,160,0.5)]"
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                      transform: "translateZ(5px)",
                    }}
                  >
                    Mejor
                  </p>
                  <p
                    className="text-lg font-black text-[#00d4a0] drop-shadow-[0_0_10px_rgba(0,212,160,0.5)]"
                    style={{
                      transform: "translateZ(8px)",
                    }}
                  >
                    {ve}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                <button
                  onClick={() => {
                    playClick();
                    R(null);
                  }}
                  className="px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg,#39ff14,#00d4a0)",
                    boxShadow: "0 0 30px rgba(57,255,20,.4), 0 5px 25px rgba(0,0,0,.4)",
                    transform: "translateZ(15px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  Jugar de nuevo / 再玩一次
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setA("select");
                  }}
                  className="px-4 py-3 rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: "rgba(255,255,255,.08)",
                    border: "1px solid rgba(255,255,255,.15)",
                    color: "#fff",
                    boxShadow: "0 0 15px rgba(255,255,255,.05)",
                    transform: "translateZ(10px)",
                  }}
                >
                  Cambiar / 切换
                </button>
              </div>
              <P currentGameId="word-maze" />
            </div>
          </div>
        )}
        <style>{`
          @keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
          @keyframes floatScoreMaze { 0%{transform:translateY(0) scale(1);opacity:1} 100%{transform:translateY(-80px) scale(1.3);opacity:0} }
          @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
          @keyframes screenShake { 0%,100%{transform:translateX(0)} 10%{transform:translateX(-8px)} 20%{transform:translateX(8px)} 30%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 50%{transform:translateX(-4px)} 60%{transform:translateX(4px)} 70%{transform:translateX(-2px)} 80%{transform:translateX(2px)} 90%{transform:translateX(-1px)} }
          @keyframes victoryBounce { 0%{transform:translateZ(50px) scale(0.8); opacity:0} 60%{transform:translateZ(50px) scale(1.02); opacity:1} 100%{transform:translateZ(50px) scale(1); opacity:1} }
          @keyframes victoryGlow { from{opacity:.3} to{opacity:.6} }
          @keyframes trophySpin { 0%,100%{transform:rotateY(0deg)} 50%{transform:rotateY(20deg)} }
          @keyframes particleFloat { 0%,100%{transform:translateY(0) translateX(0)} 25%{transform:translateY(-20px) translateX(10px)} 50%{transform:translateY(-10px) translateX(-10px)} 75%{transform:translateY(-30px) translateX(5px)} }
          @keyframes mascotFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
          @keyframes mascotBounce { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-12px) scale(1.05)} }
          @keyframes mascotBounceSoft { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
          @keyframes floatBubble { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
          @keyframes flicker { 0%,100%{opacity:1; transform:scale(1)} 50%{opacity:0.7; transform:scale(1.1)} }
          @keyframes pulse-glow { 0%,100%{box-shadow:0 0 20px rgba(57,255,20,.5), 0 0 40px rgba(57,255,20,.2)} 50%{box-shadow:0 0 30px rgba(57,255,20,.7), 0 0 60px rgba(57,255,20,.4)} }
          @keyframes glow-pulse { 0%,100%{box-shadow:0 0 15px rgba(255,215,0,.4), 0 0 30px rgba(255,215,0,.2)} 50%{box-shadow:0 0 25px rgba(255,215,0,.6), 0 0 50px rgba(255,215,0,.3)} }
          @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
          @keyframes pulse-slow { 0%,100%{opacity:1} 50%{opacity:0.6} }
          @keyframes pulse-fast { 0%,100%{opacity:1} 50%{opacity:0.5} }
          @keyframes popIn { 0%{transform:scale(0)} 60%{transform:scale(1.2)} 100%{transform:scale(1)} }
          @keyframes bounce-soft { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
          @keyframes float-icon { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-2px)} }
          @keyframes sparkle-icon { 0%,100%{transform:scale(1) rotate(0deg)} 50%{transform:scale(1.2) rotate(10deg)} }
          @keyframes playerPulse { 0%,100%{transform:scale(1.1) translateZ(12px); box-shadow:0 0 25px rgba(57,255,20,.6), 0 0 50px rgba(57,255,20,.3), inset 0 0 15px rgba(57,255,20,.2)} 50%{transform:scale(1.15) translateZ(14px); box-shadow:0 0 35px rgba(57,255,20,.8), 0 0 70px rgba(57,255,20,.4), inset 0 0 20px rgba(57,255,20,.3)} }
          @keyframes playerSpin { 0%{transform:rotateY(0deg)} 100%{transform:rotateY(360deg)} }
          @keyframes targetFloat3D { 0%,100%{transform:translateZ(10px) scale(1.05) rotateY(0deg)} 25%{transform:translateZ(14px) scale(1.08) rotateY(5deg)} 50%{transform:translateZ(10px) scale(1.05) rotateY(0deg)} 75%{transform:translateZ(14px) scale(1.08) rotateY(-5deg)} }
          @keyframes letterGlow { 0%,100%{text-shadow:0 0 8px rgba(57,255,20,.6), 0 0 15px rgba(57,255,20,.4); box-shadow:0 0 12px rgba(57,255,20,.4), 0 0 20px rgba(57,255,20,.2)} 50%{text-shadow:0 0 12px rgba(57,255,20,.8), 0 0 25px rgba(57,255,20,.5); box-shadow:0 0 18px rgba(57,255,20,.6), 0 0 30px rgba(57,255,20,.3)} }
          @keyframes trailGlow { 0%,100%{box-shadow:0 0 8px rgba(0,212,160,.3); background:linear-gradient(135deg, rgba(0,212,160,.2), rgba(0,150,200,.15))} 50%{box-shadow:0 0 15px rgba(0,212,160,.5); background:linear-gradient(135deg, rgba(0,212,160,.3), rgba(0,150,200,.2))} }
          @keyframes wallNeon { 0%,100%{box-shadow:0 0 5px rgba(80,80,110,.4), inset 0 0 5px rgba(0,0,0,.5); border-color:rgba(80,80,110,.6)} 50%{box-shadow:0 0 10px rgba(100,100,140,.5), inset 0 0 8px rgba(0,0,0,.5); border-color:rgba(100,100,140,.7)} }
          @keyframes collisionFlash { 0%{opacity:0.6} 100%{opacity:0} }
          @keyframes levelCompletePopup { 0%{transform:translateZ(50px) scale(0.5) rotateX(-15deg); opacity:0} 60%{transform:translateZ(50px) scale(1.05) rotateX(2deg); opacity:1} 100%{transform:translateZ(50px) scale(1) rotateX(0deg); opacity:1} }
          @keyframes statCard3D { 0%{transform:perspective(400px) rotateY(-90deg) translateZ(-20px); opacity:0} 100%{transform:perspective(400px) rotateY(0deg) translateZ(0px); opacity:1} }
          @keyframes mazeFloat { 0%,100%{transform:translateZ(15px) rotateX(5deg)} 50%{transform:translateZ(18px) rotateX(4deg)} }
          @keyframes sparklePop { 0%,100%{transform:scale(0); opacity:0} 50%{transform:scale(1); opacity:1} }
          .animate-flicker { animation: flicker 1.5s ease-in-out infinite }
          .animate-pulse-glow { animation: pulse-glow 1.5s ease-in-out infinite }
          .animate-glow-pulse { animation: glow-pulse 1.5s ease-in-out infinite }
          .animate-spin-slow { animation: spin-slow 4s linear infinite }
          .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite }
          .animate-pulse-fast { animation: pulse-fast 0.6s ease-in-out infinite }
          .animate-popIn { animation: popIn 0.4s ease-out }
          .animate-bounce-soft { animation: bounce-soft 1s ease-in-out infinite }
          .animate-float-icon { animation: float-icon 2s ease-in-out infinite }
          .animate-sparkle-icon { animation: sparkle-icon 1.5s ease-in-out infinite }
          .animate-floatBubble { animation: floatBubble 2s ease-in-out infinite }
        `}</style>
      </div>
    </StarfieldBackground>
  );
}
export { PaComponent as default };
