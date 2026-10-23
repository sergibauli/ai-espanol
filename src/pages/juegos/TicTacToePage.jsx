import {
  UserIcon,
  XIcon,
  BotIcon,
  ZapIcon,
  TrophyIcon,
  ArrowLeftIcon,
  Grid3x3Icon,
  CircleIcon,
  LayersIcon,
  RotateCcwIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { useSound } from "../../lib/sound.jsx";
function ZComponent() {
  const tRef = React.useRef(null);
  React.useEffect(() => {
    const tRef_current = tRef.current;
    if (!tRef_current) {
      return;
    }
    const s = tRef_current.getContext("2d");
    if (!s) {
      return;
    }
    let c;
    const n = [];
    const x = ["255,42,109", "255,140,0", "255,234,0", "0,245,255", "188,19,254", "57,255,20"];
    const i = () => {
      const r = window.devicePixelRatio || 1;
      tRef_current.width = window.innerWidth * r;
      tRef_current.height = window.innerHeight * r;
      tRef_current.style.width = `${window.innerWidth}px`;
      tRef_current.style.height = `${window.innerHeight}px`;
      s.setTransform(r, 0, 0, r, 0, 0);
      n.length = 0;
      const m = Math.min(80, Math.floor(window.innerWidth / 15));
      for (let u = 0; u < m; u++) {
        n.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: Math.random() * 3 + 0.5,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          a: Math.random() * 0.6 + 0.2,
          c: x[Math.floor(Math.random() * x.length)],
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
        });
      }
    };
    const l = () => {
      s.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const r of n) {
        r.x += r.vx;
        r.y += r.vy;
        r.pulse += r.pulseSpeed;
        if (r.x < -30) {
          r.x = window.innerWidth + 30;
        }
        if (r.x > window.innerWidth + 30) {
          r.x = -30;
        }
        if (r.y < -30) {
          r.y = window.innerHeight + 30;
        }
        if (r.y > window.innerHeight + 30) {
          r.y = -30;
        }
        const m = r.a * (0.5 + 0.5 * Math.sin(r.pulse));
        const u = r.r * (0.8 + 0.2 * Math.sin(r.pulse));
        s.beginPath();
        s.fillStyle = `rgba(${r.c},${m})`;
        s.shadowBlur = 20;
        s.shadowColor = `rgba(${r.c},.8)`;
        s.arc(r.x, r.y, u, 0, Math.PI * 2);
        s.fill();
      }
      s.shadowBlur = 0;
      c = requestAnimationFrame(l);
    };
    i();
    window.addEventListener("resize", i);
    l();
    return () => {
      cancelAnimationFrame(c);
      window.removeEventListener("resize", i);
    };
  }, []);
  return (
    <canvas
      ref={tRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
function Q1Component({ expression }) {
  const cy = expression === "excited" ? 22 : expression === "sad" ? 30 : 26;
  const d =
    expression === "happy" || expression === "excited" || expression === "cool"
      ? "M22,42 Q30,50 38,42"
      : expression === "sad"
        ? "M24,48 Q30,42 36,48"
        : "M26,46 Q30,48 34,46";
  const opacity = expression === "happy" || expression === "excited" || expression === "cool" ? 0.5 : 0.2;
  const n = expression === "excited";
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: "drop-shadow(0 4px 12px rgba(255,0,170,0.4))",
      }}
    >
      <defs>
        <radialGradient id="tttBody" cx="0.5" cy="0.4" r="0.5">
          <stop offset="0%" stopColor="#ff8aff" />
          <stop offset="100%" stopColor="#ff00aa" />
        </radialGradient>
        <filter id="tttGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <ellipse cx="30" cy="34" rx="22" ry="20" fill="url(#tttBody)" filter="url(#tttGlow)" opacity="0.9" />
      <ellipse cx="30" cy="34" rx="22" ry="20" fill="url(#tttBody)" opacity="0.95" />
      <circle cx="14" cy="38" r="5" fill="#ff6b9d" opacity={opacity} />
      <circle cx="46" cy="38" r="5" fill="#ff6b9d" opacity={opacity} />
      {n ? (
        <>
          <polygon
            points="18,24 20,29 25,29 21,32 23,37 18,34 13,37 15,32 11,29 16,29"
            fill="#0a0a1a"
            transform="translate(0, 2)"
          />
          <polygon
            points="42,24 44,29 49,29 45,32 47,37 42,34 37,37 39,32 35,29 40,29"
            fill="#0a0a1a"
            transform="translate(0, 2)"
          />
        </>
      ) : (
        <>
          <ellipse cx="20" cy={cy} rx="3.5" ry={expression === "sad" ? 2.5 : 4} fill="#0a0a1a" />
          <ellipse cx="40" cy={cy} rx="3.5" ry={expression === "sad" ? 2.5 : 4} fill="#0a0a1a" />
          <circle cx="21.5" cy={cy - 1.5} r="1.3" fill="white" opacity="0.8" />
          <circle cx="41.5" cy={cy - 1.5} r="1.3" fill="white" opacity="0.8" />
        </>
      )}
      <path d={d} stroke="#0a0a1a" strokeWidth="2" strokeLinecap="round" fill="none" />
      {n && (
        <>
          <circle cx="6" cy="12" r="1.5" fill="#ffd600" />
          <circle cx="54" cy="8" r="2" fill="#00d4ff" />
          <circle cx="8" cy="52" r="1.5" fill="#ff00aa" />
          <circle cx="52" cy="50" r="1.5" fill="#39ff14" />
        </>
      )}
    </svg>
  );
}
function ie() {
  const t = ["#ff00aa", "#ffd600", "#00d4ff", "#39ff14", "#ff6b35", "#bd00ff"];
  for (let a = 0; a < 120; a++) {
    const s = document.createElement("div");
    const c = 4 + Math.random() * 10;
    s.style.cssText = `position:fixed;left:50%;top:50%;width:${c}px;height:${c}px;border-radius:50%;background:${t[a % t.length]};pointer-events:none;z-index:99999;box-shadow:0 0 12px ${t[a % t.length]},0 0 24px ${t[a % t.length]};`;
    document.body.appendChild(s);
    const n = (Math.PI * 2 * a) / 120 + (Math.random() - 0.5) * 0.5;
    const x = 5 + Math.random() * 20;
    let i = window.innerWidth / 2;
    let l = window.innerHeight / 2;
    let r = 1;
    const m = Math.cos(n) * x;
    const u = Math.sin(n) * x;
    const h = 0.15 + Math.random() * 0.2;
    let y = 0;
    const f = () => {
      y++;
      i += m * 0.97 ** y;
      l += u * 0.97 ** y + h * y;
      r -= 0.007;
      s.style.left = `${i}px`;
      s.style.top = `${l}px`;
      s.style.opacity = String(r);
      s.style.transform = `rotate(${y * 4}deg) scale(${r})`;
      if (r > 0) {
        requestAnimationFrame(f);
      } else {
        s.remove();
      }
    };
    requestAnimationFrame(f);
  }
}
function LeComponent({ cells, winner }) {
  const c = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ].findIndex((l) => l.every((r) => cells.includes(r)));
  if (c === -1) {
    return null;
  }
  const n = [
    "top-[16.67%]",
    "top-[50%]",
    "top-[83.33%]",
    "left-[16.67%] rotate-90",
    "left-[50%] rotate-90",
    "left-[83.33%] rotate-90",
    "rotate-45 scale-[1.42]",
    "rotate-[-45deg] scale-[1.42]",
  ];
  const x = winner === "X" ? "#ff0040" : "#2080ff";
  const i = winner === "X" ? "#00d4ff" : "#bd00ff";
  return (
    <div
      className={`absolute ${n[c]} w-full h-[5px] rounded-full pointer-events-none z-20`}
      style={{
        background: `linear-gradient(90deg, transparent, ${x}, ${i}, ${x}, transparent)`,
        boxShadow: `0 0 20px ${x}, 0 0 40px ${i}, 0 0 80px ${x}, 0 0 120px ${i}`,
        animation: "winLineGrow 0.6s ease-out forwards, winLineShimmer 1.5s ease-in-out infinite",
      }}
    />
  );
}
function J(t) {
  const a = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [s, c, n] of a) {
    if (t[s] && t[s] === t[c] && t[s] === t[n]) {
      return {
        winner: t[s],
        line: [s, c, n],
      };
    }
  }
  return {
    winner: null,
    line: null,
  };
}
function X(t) {
  return t
    .map((a, s) => {
      if (a === null) {
        return s;
      }
      return -1;
    })
    .filter((a) => a !== -1);
}
function O(t, a, s, c, n) {
  const { winner } = J(t);
  if (winner === c) {
    return 10 - a;
  }
  if (winner === n) {
    return a - 10;
  }
  if (X(t).length === 0 || a > 4) {
    return 0;
  }
  if (s) {
    let i = -Infinity;
    for (const l of X(t)) {
      t[l] = c;
      i = Math.max(i, O(t, a + 1, false, c, n));
      t[l] = null;
    }
    return i;
  } else {
    let i = Infinity;
    for (const l of X(t)) {
      t[l] = n;
      i = Math.min(i, O(t, a + 1, true, c, n));
      t[l] = null;
    }
    return i;
  }
}
function Q(t, a, s, c) {
  const n = X(t);
  if (n.length === 0) {
    return -1;
  }
  if (a === "easy") {
    return n[Math.floor(Math.random() * n.length)];
  }
  if (a === "medium") {
    if (Math.random() > 0.5) {
      return Q(t, "hard", s, c);
    }
    return n[Math.floor(Math.random() * n.length)];
  }
  let x = -Infinity;
  let i = n[0];
  for (const l of n) {
    t[l] = s;
    const r = O(t, 0, false, s, c);
    t[l] = null;
    if (r > x) {
      x = r;
      i = l;
    }
  }
  return i;
}
function BeComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [x, setX] = React.useState("select");
  const [l, setL] = React.useState("pvp");
  const [m, setM] = React.useState("medium");
  const [h, setH] = React.useState(Array(9).fill(null));
  const [f, setF] = React.useState("X");
  const [o, setO] = React.useState(null);
  const [S, setS] = React.useState(null);
  const [j, setJ] = React.useState({
    X: 0,
    O: 0,
    draws: 0,
  });
  const [V, setV] = React.useState(null);
  const [I, setI] = React.useState(false);
  const [U, setU] = React.useState(false);
  const $RefRef = React.useRef(null);
  const expression =
    o === "X" ? "excited" : o === "O" && l === "ai" ? "sad" : o === "O" ? "excited" : I ? "neutral" : "happy";
  const M = React.useCallback(() => {
    setH(Array(9).fill(null));
    setF("X");
    setO(null);
    setS(null);
    setI(false);
    setU(false);
  }, []);
  const B = React.useCallback(
    (d, g) => {
      playClick();
      setL(d);
      if (g) {
        setM(g);
      }
      M();
      setX("playing");
    },
    [playClick, M],
  );
  React.useEffect(() => {
    if (x === "playing" && l === "ai" && f === "O" && !o) {
      $RefRef.current = setTimeout(
        () => {
          const d = Q([...h], m, "O", "X");
          if (d !== -1) {
            E(d);
          }
        },
        600 + Math.random() * 400,
      );
    }
    return () => {
      if ($RefRef.current) {
        clearTimeout($RefRef.current);
      }
    };
  }, [f, o, l, m, h, x]);
  const E = (d) => {
    if (h[d] || o || (l === "ai" && f === "O" && x === "playing")) {
      if (h[d]) {
        playWrong();
      }
      return;
    }
    playClick();
    const g = [...h];
    g[d] = f;
    setH(g);
    setV(d);
    setTimeout(() => setV(null), 400);
    const { winner, line } = J(g);
    if (winner) {
      setO(winner);
      setS(line);
      if (winner === "X") {
        playWin();
        setJ((b) => ({
          ...b,
          X: b.X + 1,
        }));
      } else {
        playLose();
        setJ((b) => ({
          ...b,
          O: b.O + 1,
        }));
      }
      ie();
      setTimeout(() => setX("gameover"), 1500);
      return;
    }
    if (X(g).length === 0) {
      setI(true);
      playWrong();
      setJ((b) => ({
        ...b,
        draws: b.draws + 1,
      }));
      setTimeout(() => setX("gameover"), 1500);
      return;
    }
    setF((b) => {
      if (b === "X") {
        return "O";
      }
      return "X";
    });
  };
  const ee = (d) => {
    if (!(l === "ai" && f === "O")) {
      E(d);
    }
  };
  if (x === "select") {
    return (
      <StarfieldBackground>
        <ZComponent />
        <div className="max-w-4xl mx-auto px-4 py-6 min-h-screen relative z-10">
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
              className="text-4xl md:text-6xl font-black mb-3"
              style={{
                textShadow: "0 0 40px rgba(255,0,170,0.4), 0 0 80px rgba(0,212,255,0.2)",
              }}
            >
              <Grid3x3Icon
                size={40}
                className="inline mr-3 mb-1 animate-pulse"
                style={{
                  filter: "drop-shadow(0 0 15px rgba(255,0,170,0.6))",
                }}
              />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff00aa] via-[#ffd600] to-[#00d4ff]">
                Tic Tac Toe
              </span>
            </h1>
            <p className="text-white/40 text-sm font-medium">3 en raya con estilo neón / 霓虹风格三子棋</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <button
              onClick={() => B("pvp")}
              className="group rounded-3xl p-8 text-left transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(14,22,64,.7), rgba(5,8,27,.5))",
                border: "1px solid rgba(255,0,170,.35)",
                boxShadow: "0 0 40px rgba(255,0,170,.15), 0 10px 40px rgba(0,0,0,.3)",
              }}
            >
              <div
                className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, rgba(255,0,170,0), rgba(255,0,170), rgba(255,0,170,0))",
                  backgroundSize: "200% 100%",
                  animation: "borderRotate 3s linear infinite",
                  zIndex: -1,
                }}
              />
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 relative"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                  boxShadow: "0 0 30px rgba(255,0,170,.4)",
                }}
              >
                <UserIcon size={32} className="text-white" />
                <XIcon
                  size={20}
                  className="text-white absolute -top-1 -right-1"
                  style={{
                    filter: "drop-shadow(0 0 4px rgba(255,0,170,0.8))",
                  }}
                />
              </div>
              <h3 className="text-white font-black text-xl mb-1">2 Jugadores</h3>
              <p
                className="text-xs font-medium"
                style={{
                  color: "rgba(255,0,170,.7)",
                }}
              >
                2 players / 双人
              </p>
              <p className="text-xs font-medium text-white/40 mt-1">
                Juega con un amigo en el mismo dispositivo
              </p>
            </button>
            <button
              onClick={() => B("ai", m)}
              className="group rounded-3xl p-8 text-left transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(14,22,64,.7), rgba(5,8,27,.5))",
                border: "1px solid rgba(0,212,255,.35)",
                boxShadow: "0 0 40px rgba(0,212,255,.15), 0 10px 40px rgba(0,0,0,.3)",
              }}
            >
              <div
                className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, rgba(0,212,255,0), rgba(0,212,255), rgba(0,212,255,0))",
                  backgroundSize: "200% 100%",
                  animation: "borderRotate 3s linear infinite",
                  zIndex: -1,
                }}
              />
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 relative"
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #2080ff)",
                  boxShadow: "0 0 30px rgba(0,212,255,.4)",
                }}
              >
                <BotIcon size={32} className="text-white" />
                <CircleIcon
                  size={20}
                  className="text-white absolute -top-1 -right-1"
                  style={{
                    filter: "drop-shadow(0 0 4px rgba(0,212,255,0.8))",
                  }}
                />
              </div>
              <h3 className="text-white font-black text-xl mb-1">vs IA</h3>
              <p
                className="text-xs font-medium"
                style={{
                  color: "rgba(0,212,255,.7)",
                }}
              >
                vs AI / 对电脑
              </p>
              <p className="text-xs font-medium text-white/40 mt-1">Elige la dificultad y desafía a la IA</p>
              <div className="flex gap-2 mt-3">
                {["easy", "medium", "hard"].map((d) => (
                  <button
                    key={d}
                    onClick={(g) => {
                      g.stopPropagation();
                      setM(d);
                    }}
                    className="px-3 py-1 rounded-full text-[10px] font-bold transition-all"
                    style={{
                      background: m === d ? "rgba(0,212,255,.2)" : "rgba(255,255,255,.05)",
                      border: `1px solid ${m === d ? "rgba(0,212,255,.5)" : "rgba(255,255,255,.1)"}`,
                      color: m === d ? "#00d4ff" : "rgba(255,255,255,.4)",
                    }}
                  >
                    {d === "easy" ? "Fácil" : d === "medium" ? "Medio" : "Difícil"}
                  </button>
                ))}
              </div>
            </button>
          </div>
          <div className="fixed bottom-4 right-4 z-50 pointer-events-none hidden md:block">
            <div className="animate-float">
              <Q1Component expression="happy" />
            </div>
            <div className="mt-1 text-center">
              <div
                className="text-[10px] font-black px-2 py-0.5 rounded-full inline-block"
                style={{
                  background: "rgba(255,0,170,.15)",
                  border: "1px solid rgba(255,0,170,.25)",
                  color: "#ff00aa",
                  boxShadow: "0 0 10px rgba(255,0,170,.15)",
                }}
              >
                ¡A jugar!
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
          @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
          .animate-float { animation: float 3s ease-in-out infinite; }
        `}</style>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <ZComponent />
      <div className={`max-w-3xl mx-auto px-4 py-4 min-h-screen relative z-10 ${U ? "animate-shake" : ""}`}>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold group"
          >
            <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver /
            返回
          </Link>
          <div className="flex items-center gap-2 flex-wrap">
            <SoundToggles />
            <button
              onClick={() => {
                playClick();
                setX("select");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.15)",
                color: "#fff",
                boxShadow: "0 0 15px rgba(255,255,255,.05)",
              }}
            >
              <LayersIcon size={12} /> Menú / 菜单
            </button>
            <button
              onClick={() => {
                playClick();
                M();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.15)",
                color: "#fff",
                boxShadow: "0 0 15px rgba(255,255,255,.05)",
              }}
            >
              <RotateCcwIcon size={12} /> Reiniciar / 重置
            </button>
          </div>
        </div>
        <div className="text-center mb-4">
          <h1
            className="text-3xl md:text-5xl font-black mb-2"
            style={{
              background: "linear-gradient(135deg, #ff00aa, #ffd600, #00d4ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 25px rgba(255,0,170,0.4))",
            }}
          >
            Tic Tac Toe
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div
              className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"
              style={{
                background: "rgba(255,0,170,.12)",
                border: "1px solid rgba(255,0,170,.25)",
                color: "#ff00aa",
                boxShadow: "0 0 10px rgba(255,0,170,.15)",
              }}
            >
              <XIcon size={12} /> X: {j.X}
            </div>
            <div
              className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"
              style={{
                background: "rgba(0,212,255,.12)",
                border: "1px solid rgba(0,212,255,.25)",
                color: "#00d4ff",
                boxShadow: "0 0 10px rgba(0,212,255,.15)",
              }}
            >
              <CircleIcon size={12} /> O: {j.O}
            </div>
            <div
              className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5"
              style={{
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.15)",
                color: "rgba(255,255,255,.5)",
                boxShadow: "0 0 10px rgba(255,255,255,.05)",
              }}
            >
              <ZapIcon size={12} /> Empates: {j.draws}
            </div>
          </div>
        </div>
        <div className="text-center mb-6">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-black transition-all duration-300"
            style={{
              background: f === "X" ? "rgba(255,0,170,.12)" : "rgba(0,212,255,.12)",
              border: `1px solid ${f === "X" ? "rgba(255,0,170,.3)" : "rgba(0,212,255,.3)"}`,
              color: f === "X" ? "#ff00aa" : "#00d4ff",
              boxShadow: `0 0 20px ${f === "X" ? "rgba(255,0,170,.2)" : "rgba(0,212,255,.2)"}`,
            }}
          >
            {f === "X" ? <XIcon size={16} /> : <CircleIcon size={16} />}Turno de {f === "X" ? "X" : "O"}
            {l === "ai" && f === "O" && <span className="ml-1 animate-pulse">(IA pensando...)</span>}
          </div>
        </div>
        <div
          className="relative mx-auto mb-6"
          style={{
            width: "min(380px, 90vw)",
            height: "min(380px, 90vw)",
            perspective: "900px",
          }}
        >
          <div
            className="absolute -inset-5 rounded-[2rem] opacity-40 blur-2xl pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(255,0,64,.4), rgba(0,212,255,.3), rgba(189,0,255,.2), transparent 70%)",
              animation: "boardGlowPulse 3s ease-in-out infinite",
            }}
          />
          <div
            className="relative w-full h-full grid grid-cols-3 grid-rows-3 gap-2 p-3 rounded-3xl"
            style={{
              background: "linear-gradient(180deg, rgba(14,22,64,.9), rgba(5,8,27,.7))",
              border: "2px solid rgba(255,255,255,.2)",
              boxShadow:
                "0 0 80px rgba(255,0,64,.2), 0 0 120px rgba(0,212,255,.15), 0 20px 60px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.15)",
              transform: "rotateX(8deg)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="absolute inset-0 pointer-events-none z-10 rounded-3xl overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: `
                    linear-gradient(90deg, transparent 32.5%, rgba(255,0,64,.5) 33%, rgba(255,0,64,.5) 34%, transparent 34.5%, transparent 65.5%, rgba(0,212,255,.5) 66%, rgba(0,212,255,.5) 67%, transparent 67.5%),
                    linear-gradient(0deg, transparent 32.5%, rgba(255,0,64,.5) 33%, rgba(255,0,64,.5) 34%, transparent 34.5%, transparent 65.5%, rgba(0,212,255,.5) 66%, rgba(0,212,255,.5) 67%, transparent 67.5%)
                  `,
                  boxShadow: "inset 0 0 40px rgba(255,0,64,.1), inset 0 0 80px rgba(0,212,255,.08)",
                }}
              />
            </div>
            {h.map((d, g) => {
              const w = S?.includes(g);
              const v = V === g;
              return (
                <button
                  key={g}
                  onClick={() => ee(g)}
                  disabled={!!d || !!o || (l === "ai" && f === "O")}
                  className={`relative rounded-2xl flex items-center justify-center transition-all duration-300 overflow-hidden group ${v ? "animate-cell-pop" : ""}`}
                  style={{
                    background: w
                      ? "linear-gradient(135deg, rgba(57,255,20,.4), rgba(255,214,0,.3))"
                      : "rgba(255,255,255,.04)",
                    border: w ? "2px solid rgba(57,255,20,.8)" : "1px solid rgba(255,255,255,.1)",
                    boxShadow: w
                      ? "0 0 40px rgba(57,255,20,.6), 0 0 80px rgba(255,214,0,.3), inset 0 0 30px rgba(57,255,20,.2)"
                      : "0 2px 10px rgba(0,0,0,.2)",
                    transform: w ? "scale(1.08) translateZ(25px)" : "scale(1)",
                  }}
                >
                  {d === "X" && (
                    <XIcon
                      size={52}
                      strokeWidth={3}
                      className="transition-all duration-300"
                      style={{
                        color: "#ff0040",
                        filter:
                          "drop-shadow(0 0 16px rgba(255,0,64,0.9)) drop-shadow(0 0 32px rgba(0,212,255,0.5)) drop-shadow(0 0 48px rgba(255,0,64,0.3))",
                        animation: v ? "symbolAppearX 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)" : "none",
                      }}
                    />
                  )}
                  {d === "O" && (
                    <CircleIcon
                      size={52}
                      strokeWidth={3}
                      className="transition-all duration-300"
                      style={{
                        color: "#2080ff",
                        filter:
                          "drop-shadow(0 0 16px rgba(32,128,255,0.9)) drop-shadow(0 0 32px rgba(189,0,255,0.5)) drop-shadow(0 0 48px rgba(32,128,255,0.3))",
                        animation: v ? "symbolAppearO 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)" : "none",
                      }}
                    />
                  )}
                  {!d && !o && (
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: f === "X" ? "rgba(255,0,64,.12)" : "rgba(32,128,255,.12)",
                        boxShadow: `inset 0 0 30px ${f === "X" ? "rgba(255,0,64,.2)" : "rgba(32,128,255,.2)"}`,
                      }}
                    />
                  )}
                </button>
              );
            })}
            {S && o && <LeComponent cells={S} winner={o} />}
            {I && (
              <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                <div
                  className="text-2xl font-black animate-draw-pulse"
                  style={{
                    color: "#ffd600",
                    textShadow: "0 0 30px rgba(255,214,0,0.6), 0 0 60px rgba(255,214,0,0.3)",
                  }}
                >
                  <ZapIcon size={32} className="inline mr-2" /> EMPATE
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold"
            style={{
              background: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.12)",
              color: "rgba(255,255,255,.5)",
            }}
          >
            {l === "pvp" ? <UserIcon size={12} /> : <BotIcon size={12} />}
            {l === "pvp"
              ? "2 Jugadores"
              : `vs IA (${m === "easy" ? "Fácil" : m === "medium" ? "Medio" : "Difícil"})`}
          </div>
        </div>
        {x === "gameover" && (
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
                background: "linear-gradient(180deg, rgba(14,22,64,.9), rgba(5,8,27,.7))",
                border:
                  o === "X"
                    ? "2px solid rgba(255,0,64,.5)"
                    : o === "O"
                      ? "2px solid rgba(32,128,255,.5)"
                      : "2px solid rgba(255,214,0,.4)",
                boxShadow:
                  o === "X"
                    ? "0 0 100px rgba(255,0,64,.3), 0 0 60px rgba(0,212,255,.2), 0 0 40px rgba(255,0,64,.15)"
                    : o === "O"
                      ? "0 0 100px rgba(32,128,255,.3), 0 0 60px rgba(189,0,255,.2), 0 0 40px rgba(32,128,255,.15)"
                      : "0 0 100px rgba(255,214,0,.3), 0 0 60px rgba(255,107,53,.2), 0 0 40px rgba(255,214,0,.15)",
                transform: "translateZ(50px)",
                animation: "victoryBounce 0.8s ease-out",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-70"
                style={{
                  background:
                    o === "X"
                      ? "linear-gradient(135deg, #ff0040, #00d4ff)"
                      : o === "O"
                        ? "linear-gradient(135deg, #2080ff, #bd00ff)"
                        : "linear-gradient(135deg, #ffd600, #ff6b35)",
                  filter: "blur(30px)",
                  animation: "victoryGlow 2s ease-in-out infinite alternate",
                }}
              />
              {Array.from({
                length: 20,
              }).map((d, key) => (
                <div
                  key={key}
                  className="absolute w-2 h-2 rounded-full pointer-events-none"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: o === "X" ? "#ff0040" : o === "O" ? "#2080ff" : "#ffd600",
                    boxShadow: `0 0 10px ${o === "X" ? "#ff0040" : o === "O" ? "#2080ff" : "#ffd600"}`,
                    animation: `floatParticle ${3 + Math.random() * 4}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                    opacity: 0.6,
                  }}
                />
              ))}
              <TrophyIcon
                size={64}
                style={{
                  color: o === "X" ? "#ff0040" : o === "O" ? "#2080ff" : "#ffd600",
                  margin: "0 auto 16px",
                  filter: `drop-shadow(0 0 25px ${o === "X" ? "rgba(255,0,64,0.8)" : o === "O" ? "rgba(32,128,255,0.8)" : "rgba(255,214,0,0.8)"})`,
                  animation: "trophySpin 3s ease-in-out infinite",
                }}
              />
              <h2
                className="text-3xl md:text-4xl font-black mb-2"
                style={{
                  background:
                    o === "X"
                      ? "linear-gradient(135deg, #ff0040, #00d4ff)"
                      : o === "O"
                        ? "linear-gradient(135deg, #2080ff, #bd00ff)"
                        : "linear-gradient(135deg, #ffd600, #ff6b35)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 20px rgba(255,255,255,0.2))",
                }}
              >
                {o ? `¡Gana ${o}!` : "¡Empate!"}
              </h2>
              <p className="text-white/50 text-sm mb-6">
                {o ? "Victoria espectacular!" : "Nadie gana esta vez"}
              </p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div
                  className="p-3 rounded-xl"
                  style={{
                    background: "rgba(255,0,64,.15)",
                    border: "1px solid rgba(255,0,64,.3)",
                    boxShadow: "0 0 15px rgba(255,0,64,.1)",
                  }}
                >
                  <XIcon
                    size={18}
                    strokeWidth={3}
                    style={{
                      color: "#ff0040",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 6px rgba(255,0,64,0.5))",
                    }}
                  />
                  <p className="text-xs text-white/40">X</p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#ff0040",
                    }}
                  >
                    {j.X}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl"
                  style={{
                    background: "rgba(32,128,255,.15)",
                    border: "1px solid rgba(32,128,255,.3)",
                    boxShadow: "0 0 15px rgba(32,128,255,.1)",
                  }}
                >
                  <CircleIcon
                    size={18}
                    strokeWidth={3}
                    style={{
                      color: "#2080ff",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 6px rgba(32,128,255,0.5))",
                    }}
                  />
                  <p className="text-xs text-white/40">O</p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#2080ff",
                    }}
                  >
                    {j.O}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl"
                  style={{
                    background: "rgba(255,214,0,.15)",
                    border: "1px solid rgba(255,214,0,.3)",
                    boxShadow: "0 0 15px rgba(255,214,0,.1)",
                  }}
                >
                  <ZapIcon
                    size={18}
                    style={{
                      color: "#ffd600",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 6px rgba(255,214,0,0.5))",
                    }}
                  />
                  <p className="text-xs text-white/40">Empates</p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#ffd600",
                    }}
                  >
                    {j.draws}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                <button
                  onClick={() => {
                    playClick();
                    M();
                    setX("playing");
                  }}
                  className="px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #ff0040, #ffd600, #2080ff)",
                    boxShadow:
                      "0 0 30px rgba(255,0,64,.3), 0 0 60px rgba(0,212,255,.2), 0 0 90px rgba(32,128,255,.1)",
                  }}
                >
                  Revancha / 再战
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setX("select");
                  }}
                  className="px-4 py-3 rounded-full text-xs font-bold transition-all hover:scale-105"
                  style={{
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(255,255,255,.15)",
                    color: "#fff",
                  }}
                >
                  Menú / 菜单
                </button>
                <P currentGameId="tic-tac-toe" />
              </div>
            </div>
          </div>
        )}
        <div className="fixed bottom-4 right-4 z-50 pointer-events-none hidden md:block">
          <div className="animate-float">
            <Q1Component expression={expression} />
          </div>
        </div>
        <style>{`
          @keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
          @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
          .animate-float { animation: float 3s ease-in-out infinite; }
          @keyframes symbolAppearX { 0%{transform:scale(0) rotate(-180deg); opacity:0; filter:drop-shadow(0 0 0px rgba(255,0,64,0))} 60%{transform:scale(1.3) rotate(10deg); opacity:1; filter:drop-shadow(0 0 20px rgba(255,0,64,0.8))} 100%{transform:scale(1) rotate(0deg); opacity:1; filter:drop-shadow(0 0 16px rgba(255,0,64,0.9))} }
          @keyframes symbolAppearO { 0%{transform:scale(0) rotate(180deg); opacity:0; filter:drop-shadow(0 0 0px rgba(32,128,255,0))} 60%{transform:scale(1.3) rotate(-10deg); opacity:1; filter:drop-shadow(0 0 20px rgba(32,128,255,0.8))} 100%{transform:scale(1) rotate(0deg); opacity:1; filter:drop-shadow(0 0 16px rgba(32,128,255,0.9))} }
          @keyframes cell-pop { 0%{transform:scale(0.8)} 50%{transform:scale(1.15)} 100%{transform:scale(1)} }
          @keyframes winLineGrow { 0%{transform:scaleX(0)} 100%{transform:scaleX(1)} }
          @keyframes winLineShimmer { 0%{background-position:0% 50%; opacity:1} 50%{opacity:0.8} 100%{background-position:200% 50%; opacity:1} }
          @keyframes draw-pulse { 0%,100%{transform:scale(1); opacity:1} 50%{transform:scale(1.1); opacity:0.8} }
          @keyframes boardGlowPulse { 0%,100%{opacity:0.3} 50%{opacity:0.6} }
          @keyframes floatParticle { 0%,100%{transform:translateY(0) translateX(0)} 25%{transform:translateY(-15px) translateX(5px)} 50%{transform:translateY(-8px) translateX(-5px)} 75%{transform:translateY(-20px) translateX(3px)} }
          @keyframes victoryGlow { from{opacity:.3} to{opacity:.7} }
          @keyframes trophySpin { 0%,100%{transform:rotateY(0deg)} 50%{transform:rotateY(25deg)} }
          @keyframes shake { 0%,100%{transform:translateX(0)} 10%{transform:translateX(-8px)} 20%{transform:translateX(8px)} 30%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 50%{transform:translateX(-4px)} 60%{transform:translateX(4px)} 70%{transform:translateX(-2px)} 80%{transform:translateX(2px)} 90%{transform:translateX(-1px)} }
          .animate-shake { animation: shake 0.6s ease-out; }
        `}</style>
      </div>
    </StarfieldBackground>
  );
}
export { BeComponent as default };
