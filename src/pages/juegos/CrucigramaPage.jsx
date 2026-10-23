import {
  StarIcon,
  LightbulbIcon,
  TrophyIcon,
  ZapIcon,
  BookOpenIcon,
  ArrowLeftIcon,
  DiamondIcon,
  LayersIcon,
  RotateCcwIcon,
  CircleCheckBigIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { g, a } from "../../lib/juegos-utils.js";
const length = 15;
function _(espanol) {
  return espanol
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-ZÑ]/g, "")
    .trim();
}
function he(n) {
  const grid = Array.from(
    {
      length,
    },
    () => Array(length).fill(""),
  );
  const numbers = Array.from(
    {
      length,
    },
    () => Array(length).fill(0),
  );
  const placements = [];
  const w = n
    .map((c) => ({
      word: _(c.espanol),
      hintCn: c.chino,
    }))
    .filter((c) => c.word.length >= 3 && c.word.length <= 12)
    .sort((c, d) => d.word.length - c.word.length);
  const j = new Set();
  const b = [];
  for (const c of w) {
    if (!j.has(c.word)) {
      j.add(c.word);
      b.push(c);
    }
  }
  let h = 1;
  const S = (c, d, i, p) => {
    if (p === "across") {
      if (
        i < 0 ||
        i + c.length > length ||
        (i > 0 && grid[d][i - 1]) ||
        (i + c.length < length && grid[d][i + c.length])
      ) {
        return false;
      }
    } else if (
      d < 0 ||
      d + c.length > length ||
      (d > 0 && grid[d - 1][i]) ||
      (d + c.length < length && grid[d + c.length][i])
    ) {
      return false;
    }
    for (let u = 0; u < c.length; u++) {
      const m = p === "across" ? d : d + u;
      const k = p === "across" ? i + u : i;
      if (grid[m][k] && grid[m][k] !== c[u]) {
        return false;
      }
      if (p === "across") {
        if ((m > 0 && grid[m - 1][k] && !grid[m][k]) || (m < length - 1 && grid[m + 1][k] && !grid[m][k])) {
          return false;
        }
      } else if (
        (k > 0 && grid[m][k - 1] && !grid[m][k]) ||
        (k < length - 1 && grid[m][k + 1] && !grid[m][k])
      ) {
        return false;
      }
    }
    return true;
  };
  const C = (word, row, col, dir) => {
    for (let u = 0; u < word.length; u++) {
      const m = dir === "across" ? row : row + u;
      const k = dir === "across" ? col + u : col;
      grid[m][k] = word[u];
    }
    if (!numbers[row][col]) {
      numbers[row][col] = h;
    }
    placements.push({
      word,
      hintCn: n.find((u) => _(u.espanol) === word)?.chino || "",
      row,
      col,
      dir,
      num: numbers[row][col],
    });
    h++;
  };
  if (b.length > 0) {
    const c = b[0];
    const d = Math.floor((length - c.word.length) / 2);
    const i = Math.floor(length / 2);
    C(c.word, i, d, "across");
  }
  for (let c = 1; c < b.length; c++) {
    const d = b[c].word;
    let i = false;
    for (const p of placements) {
      for (let u = 0; u < p.word.length && !i; u++) {
        const m = p.word[u];
        const k = d
          .split("")
          .map((ch, j_1) => ({
            ch,
            j: j_1,
          }))
          .filter((M) => M.ch === m);
        for (const M of k) {
          let $;
          let G;
          if (p.dir === "across") {
            $ = p.row - M.j;
            G = p.col + u;
          } else {
            $ = p.row + u;
            G = p.col - M.j;
          }
          const Z = p.dir === "across" ? "down" : "across";
          if (S(d, $, G, Z)) {
            C(d, $, G, Z);
            i = true;
            break;
          }
        }
      }
      if (i) {
        break;
      }
    }
    if (!i) {
      for (let p = 0; p < length && !i; p++) {
        let u = true;
        for (let m = 0; m < length; m++) {
          if (grid[p][m]) {
            u = false;
            break;
          }
        }
        if (u) {
          const m = Math.floor((length - d.length) / 2);
          if (S(d, p, m, "across")) {
            C(d, p, m, "across");
            i = true;
          }
        }
      }
    }
  }
  return {
    grid,
    numbers,
    placements,
  };
}
function ye() {
  const n = ["#ff00aa", "#00d4ff", "#ffd600", "#39ff14", "#ff6b35", "#b829dd", "#ff6ec7", "#7b61ff"];
  for (let a = 0; a < 120; a++) {
    const o = document.createElement("div");
    const N = 4 + Math.random() * 10;
    const w = Math.random() > 0.5 ? "50%" : "2px";
    o.style.cssText = `position:fixed;left:50%;top:50%;width:${N}px;height:${N}px;border-radius:${w};background:${n[a % n.length]};pointer-events:none;z-index:9999;box-shadow:0 0 10px ${n[a % n.length]};`;
    document.body.appendChild(o);
    const j = (Math.PI * 2 * a) / 120;
    const b = 5 + Math.random() * 20;
    let h = window.innerWidth / 2;
    let S = window.innerHeight / 2;
    let C = 1;
    const c = Math.cos(j) * b;
    const d = Math.sin(j) * b;
    const i = Math.random() * 360;
    const p = (Math.random() - 0.5) * 20;
    let u = i;
    const m = () => {
      h += c;
      S += d + 2;
      C -= 0.012;
      u += p;
      o.style.left = `${h}px`;
      o.style.top = `${S}px`;
      o.style.opacity = String(C);
      o.style.transform = `rotate(${u}deg)`;
      if (C > 0) {
        requestAnimationFrame(m);
      } else {
        o.remove();
      }
    };
    requestAnimationFrame(m);
  }
}
function JComponent() {
  const nRef = React.useRef([]);
  if (nRef.current.length === 0) {
    const a = ["#39ff14", "#00d4ff", "#ffd600", "#ff00aa", "#b829dd"];
    for (let id = 0; id < 20; id++) {
      nRef.current.push({
        id,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        speed: 4 + Math.random() * 8,
        opacity: 0.2 + Math.random() * 0.5,
        delay: Math.random() * 5,
        color: a[id % a.length],
      });
    }
  }
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {nRef.current.map((a) => (
        <div
          key={a.id}
          className="absolute"
          style={{
            left: `${a.x}%`,
            top: `${a.y}%`,
            animation: `crystalFloat ${a.speed}s ease-in-out infinite ${a.delay}s`,
          }}
        >
          <DiamondIcon
            size={a.size}
            style={{
              color: a.color,
              opacity: a.opacity,
              filter: `drop-shadow(0 0 6px ${a.color})`,
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes crystalFloat { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-20px) rotate(45deg) scale(1.2)} }
      `}</style>
    </div>
  );
}
function WeComponent({ mood }) {
  const rx = mood === "sad" ? 5 : mood === "excited" ? 7 : 6;
  const ry = mood === "sad" ? 3 : mood === "excited" ? 8 : 6;
  const d =
    mood === "happy"
      ? "M 16 24 Q 24 30 32 24"
      : mood === "sad"
        ? "M 16 28 Q 24 22 32 28"
        : mood === "excited"
          ? "M 16 24 Q 24 34 32 24"
          : "M 18 26 Q 24 28 30 26";
  const fill = mood === "happy" || mood === "excited" ? "rgba(255,105,180,0.6)" : "rgba(255,105,180,0.15)";
  const j =
    mood === "happy" ? "#46ff9a" : mood === "sad" ? "#ff4444" : mood === "excited" ? "#ffd600" : "#00d4ff";
  const animation =
    mood === "excited" ? "mascotExcited 0.3s ease-in-out infinite" : "mascotFloat 3s ease-in-out infinite";
  const h = mood === "sad";
  return (
    <div
      className="fixed bottom-6 right-6 z-50 pointer-events-none"
      style={{
        animation,
      }}
    >
      <div className="relative">
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-70"
          style={{
            background: j,
            width: "80px",
            height: "80px",
            animation: "mascotPulse 2s ease-in-out infinite",
          }}
        />
        <svg
          width="80"
          height="80"
          viewBox="0 0 48 48"
          fill="none"
          className="relative"
          style={{
            filter: `drop-shadow(0 0 15px ${j}80)`,
          }}
        >
          <path
            d="M 10 12 L 8 2 L 16 10"
            fill="url(#crossGrad)"
            stroke={j}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M 38 12 L 40 2 L 32 10"
            fill="url(#crossGrad)"
            stroke={j}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <circle
            cx="8"
            cy="4"
            r="2"
            fill="#ffd600"
            style={{
              filter: "drop-shadow(0 0 3px #ffd600)",
            }}
          />
          <circle
            cx="40"
            cy="4"
            r="2"
            fill="#ffd600"
            style={{
              filter: "drop-shadow(0 0 3px #ffd600)",
            }}
          />
          <ellipse cx="24" cy="28" rx="18" ry="16" fill="url(#crossGrad)" stroke={j} strokeWidth="1.5" />
          <ellipse cx="17" cy="24" rx={rx} ry={ry} fill="white" />
          <ellipse cx="31" cy="24" rx={rx} ry={ry} fill="white" />
          <circle cx="17" cy="24" r="2.5" fill="#1a1a2e" />
          <circle cx="31" cy="24" r="2.5" fill="#1a1a2e" />
          <circle cx="18.2" cy="22.8" r="1" fill="white" opacity="0.9" />
          <circle cx="32.2" cy="22.8" r="1" fill="white" opacity="0.9" />
          <circle cx="15.8" cy="25.2" r="0.5" fill="white" opacity="0.6" />
          <circle cx="29.8" cy="25.2" r="0.5" fill="white" opacity="0.6" />
          <path d={d} stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="12" cy="30" r="3" fill={fill} />
          <circle cx="36" cy="30" r="3" fill={fill} />
          {mood === "excited" && (
            <>
              <circle
                cx="24"
                cy="6"
                r="2"
                fill="#ffd600"
                style={{
                  filter: "drop-shadow(0 0 4px #ffd600)",
                  animation: "sparkle 0.5s ease-in-out infinite",
                }}
              />
              <circle
                cx="4"
                cy="12"
                r="1.5"
                fill="#00d4ff"
                style={{
                  animation: "sparkle 0.7s ease-in-out infinite 0.2s",
                }}
              />
              <circle
                cx="44"
                cy="8"
                r="1"
                fill="#ff00aa"
                style={{
                  animation: "sparkle 0.6s ease-in-out infinite 0.4s",
                }}
              />
            </>
          )}
          {h && (
            <>
              <circle cx="12" cy="28" r="1.5" fill="#00d4ff" opacity="0.8">
                <animate attributeName="cy" from="28" to="38" dur="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.8" to="0" dur="1s" repeatCount="indefinite" />
              </circle>
              <circle cx="36" cy="28" r="1.5" fill="#00d4ff" opacity="0.8">
                <animate attributeName="cy" from="28" to="38" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.8" to="0" dur="1.2s" repeatCount="indefinite" />
              </circle>
            </>
          )}
          <defs>
            <linearGradient id="crossGrad" x1="0" y1="0" x2="48" y2="48">
              <stop offset="0%" stopColor="#39ff14" />
              <stop offset="50%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#b829dd" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
function JeComponent({ m, onClick }) {
  const [o, setO] = React.useState({
    x: 0,
    y: 0,
  });
  const wRef = React.useRef(null);
  const onMouseMove = (h) => {
    if (!wRef.current) {
      return;
    }
    const S = wRef.current.getBoundingClientRect();
    const C = (h.clientX - S.left) / S.width;
    const c = (h.clientY - S.top) / S.height;
    setO({
      x: (c - 0.5) * -20,
      y: (C - 0.5) * 20,
    });
  };
  const onMouseLeave = () =>
    setO({
      x: 0,
      y: 0,
    });
  return (
    <button
      ref={wRef}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group rounded-xl p-5 text-left transition-all relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(14,22,64,.6), rgba(5,8,27,.5))",
        border: `1px solid ${m.color}40`,
        transform: `perspective(600px) rotateX(${o.x}deg) rotateY(${o.y}deg) translateZ(10px)`,
        transformStyle: "preserve-3d",
        boxShadow: "0 10px 40px rgba(0,0,0,.4)",
      }}
    >
      <div
        className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, ${m.color}00, ${m.color}, ${m.color}00)`,
          backgroundSize: "200% 100%",
          animation: "borderRotate 2s linear infinite",
          zIndex: -1,
        }}
      />
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
        style={{
          background: `linear-gradient(135deg, ${m.color}, ${m.color}88)`,
          transform: "translateZ(20px)",
          boxShadow: `0 0 15px ${m.color}40`,
        }}
      >
        <BookOpenIcon size={24} className="text-white" />
      </div>
      <h3
        className="text-white font-black text-base mb-1"
        style={{
          transform: "translateZ(15px)",
        }}
      >
        {m.titulo}
      </h3>
      <p
        className="text-xs font-medium mb-1"
        style={{
          color: `${m.color}aa`,
          transform: "translateZ(10px)",
        }}
      >
        {m.tituloChino}
      </p>
      <p
        className="text-xs font-medium text-white/40"
        style={{
          transform: "translateZ(5px)",
        }}
      >
        {m.vocabularioCount} palabras / 词
      </p>
    </button>
  );
}
function GeComponent() {
  const [n, setN] = React.useState("select");
  const [o, setO] = React.useState({
    grid: [],
    numbers: [],
    placements: [],
  });
  const [w, setW] = React.useState(() =>
    Array.from(
      {
        length,
      },
      () => Array(length).fill(""),
    ),
  );
  const [b, setB] = React.useState(null);
  const [S, setS] = React.useState("across");
  const [c, setC] = React.useState(false);
  const [i, setI] = React.useState(0);
  const [u, setU] = React.useState(false);
  const [k, setK] = React.useState(false);
  const [$, set$] = React.useState(0);
  const [Z, setZ] = React.useState(false);
  const [mood, setMood] = React.useState("neutral");
  const [T, setT] = React.useState([]);
  const [ee, setEe] = React.useState(new Set());
  const [te, setTe] = React.useState(new Set());
  const reRef = React.useRef(0);
  React.useEffect(() => {
    if (T.length === 0) {
      return;
    }
    const t = setInterval(() => {
      setT((r) =>
        r
          .map((s) => ({
            ...s,
            x: s.x + s.vx,
            y: s.y + s.vy,
            vy: s.vy + 0.2,
            life: s.life - 0.015,
          }))
          .filter((s) => s.life > 0),
      );
    }, 20);
    return () => clearInterval(t);
  }, [T.length]);
  const ae = g();
  const [Y, setY] = React.useState("");
  const D = React.useCallback((t) => {
    const r = t ? a(t) : a();
    if (r.length === 0) {
      setY(
        'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
      );
      return;
    }
    const s = he(r);
    setO(s);
    setW(
      Array.from(
        {
          length,
        },
        () => Array(length).fill(""),
      ),
    );
    setB(null);
    setC(false);
    setI(0);
    setK(false);
    set$(0);
    setMood("neutral");
    setT([]);
    setEe(new Set());
    setTe(new Set());
    setN("playing");
  }, []);
  const se = (t, r) => {
    if (o.grid[t][r]) {
      if (b && b[0] === t && b[1] === r) {
        setS((s) => {
          if (s === "across") {
            return "down";
          }
          return "across";
        });
      } else {
        setB([t, r]);
      }
    }
  };
  const E = React.useCallback(
    (t) => {
      if (!b) {
        return;
      }
      const [r, s] = b;
      const x = t.key.toUpperCase();
      if ((x.length === 1 && x >= "A" && x <= "Z") || x === "Ñ") {
        const l = w.map((v) => [...v]);
        l[r][s] = x;
        setW(l);
        setC(false);
        const g = `${r}-${s}`;
        setEe((v) => new Set(v).add(g));
        setTe((v) => new Set(v).add(g));
        setTimeout(
          () =>
            setEe((v) => {
              const z = new Set(v);
              z.delete(g);
              return z;
            }),
          500,
        );
        setTimeout(
          () =>
            setTe((v) => {
              const z = new Set(v);
              z.delete(g);
              return z;
            }),
          600,
        );
        if (S === "across" && s + 1 < length && o.grid[r][s + 1]) {
          setB([r, s + 1]);
        } else if (S === "down" && r + 1 < length && o.grid[r + 1][s]) {
          setB([r + 1, s]);
        }
      } else if (t.key === "Backspace") {
        const l = w.map((g) => [...g]);
        l[r][s] = "";
        setW(l);
        if (S === "across" && s > 0) {
          setB([r, s - 1]);
        } else if (S === "down" && r > 0) {
          setB([r - 1, s]);
        }
      } else {
        if (t.key === "ArrowRight") {
          if (s + 1 < length && o.grid[r][s + 1]) {
            setB([r, s + 1]);
          }
        } else if (t.key === "ArrowLeft") {
          if (s > 0 && o.grid[r][s - 1]) {
            setB([r, s - 1]);
          }
        } else if (t.key === "ArrowDown") {
          if (r + 1 < length && o.grid[r + 1][s]) {
            setB([r + 1, s]);
          }
        } else if (t.key === "ArrowUp" && r > 0 && o.grid[r - 1][s]) {
          setB([r - 1, s]);
        }
      }
    },
    [b, S, w, o],
  );
  React.useEffect(() => {
    window.addEventListener("keydown", E);
    return () => window.removeEventListener("keydown", E);
  }, [E]);
  const ne = () => {
    let t = 0;
    let r = 0;
    for (let x = 0; x < length; x++) {
      for (let l = 0; l < length; l++) {
        if (o.grid[x][l]) {
          r++;
          if (w[x][l] === o.grid[x][l]) {
            t++;
          }
        }
      }
    }
    const s = Math.max(Math.round((t / r) * 100) - $ * 5, 0);
    setI(s);
    setC(true);
    if (t === r) {
      setK(true);
      setMood("excited");
      ye();
      const x = document.querySelector("[data-crossword-grid]");
      if (x) {
        const l = x.getBoundingClientRect();
        oe(l.left + l.width / 2, l.top + l.height / 2, 80);
      }
    } else {
      setMood("sad");
      setZ(true);
      setTimeout(() => setZ(false), 500);
    }
  };
  const oe = (x_1, y, s = 50) => {
    const x = ["#39ff14", "#00d4ff", "#ffd600", "#ff00aa", "#b829dd", "#46ff9a"];
    const l = [];
    for (let g = 0; g < s; g++) {
      const v = (Math.PI * 2 * g) / s;
      const z = 3 + Math.random() * 15;
      l.push({
        id: ++reRef.current,
        x: x_1,
        y,
        vx: Math.cos(v) * z,
        vy: Math.sin(v) * z - 4,
        color: x[g % x.length],
        life: 1 + Math.random() * 0.5,
        size: 3 + Math.random() * 8,
      });
    }
    setT((g) => [...g, ...l]);
  };
  const ie = () => {
    if (!b) {
      return;
    }
    const [t, r] = b;
    if (!o.grid[t][r]) {
      return;
    }
    const s = w.map((l) => [...l]);
    s[t][r] = o.grid[t][r];
    setW(s);
    set$((l) => l + 1);
    const x = `${t}-${r}`;
    setEe((l) => new Set(l).add(x));
    setTe((l) => new Set(l).add(x));
    setTimeout(
      () =>
        setEe((l) => {
          const g = new Set(l);
          g.delete(x);
          return g;
        }),
      800,
    );
    setTimeout(
      () =>
        setTe((l) => {
          const g = new Set(l);
          g.delete(x);
          return g;
        }),
      900,
    );
  };
  const I = () => {
    setW(
      Array.from(
        {
          length,
        },
        () => Array(length).fill(""),
      ),
    );
    setB(null);
    setC(false);
    setI(0);
    setK(false);
    set$(0);
    setZ(false);
    setT([]);
    setEe(new Set());
    setTe(new Set());
    setMood("neutral");
  };
  const le = (t, r) => {
    if (o.grid[t][r]) {
      if (!w[t][r] || !c) {
        return "neutral";
      }
      if (w[t][r] === o.grid[t][r]) {
        return "correct";
      }
      return "wrong";
    }
    return "empty";
  };
  if (n === "select") {
    return (
      <StarfieldBackground>
        <JComponent />
        <div
          className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative z-10"
          style={{
            perspective: "1000px",
          }}
        >
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/juegos"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
            >
              <ArrowLeftIcon size={16} /> Volver / 返回
            </Link>
          </div>
          <div className="text-center mb-10">
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-4 relative"
              style={{
                background: "linear-gradient(135deg,#39ff14,#00d4ff)",
                boxShadow: "0 0 60px rgba(57,255,20,0.4), 0 0 120px rgba(0,212,255,0.2)",
                animation: "crossFloat 3s ease-in-out infinite",
              }}
            >
              <DiamondIcon
                size={48}
                className="text-white"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))",
                }}
              />
              <div
                className="absolute -top-2 -right-2"
                style={{
                  animation: "sparkle 2s ease-in-out infinite",
                }}
              >
                <StarIcon
                  size={20}
                  style={{
                    color: "#ffd600",
                    fill: "#ffd600",
                  }}
                />
              </div>
            </div>
            <h1
              className="text-5xl md:text-7xl font-black mb-2"
              style={{
                background: "linear-gradient(135deg,#39ff14 0%,#00d4ff 50%,#b829dd 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 40px rgba(57,255,20,.3))",
                animation: "crossTitlePulse 3s ease-in-out infinite alternate",
              }}
            >
              Crucigrama
            </h1>
            <p className="text-white/50 text-lg font-medium">
              Selecciona un módulo para jugar / 选择模块开始游戏
            </p>
            {Y && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold"
                style={{
                  background: "rgba(255,68,68,.12)",
                  border: "1px solid rgba(255,68,68,.3)",
                  color: "#ff6b35",
                }}
              >
                {Y}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => {
                setY("");
                D(null);
              }}
              className="group rounded-xl p-5 text-left transition-all relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(14,22,64,.6), rgba(5,8,27,.5))",
                border: "1px solid rgba(255,0,170,.3)",
                transform: "perspective(600px) translateZ(10px)",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, rgba(255,0,170,0), rgba(255,0,170), rgba(255,0,170,0))",
                  backgroundSize: "200% 100%",
                  animation: "borderRotate 2s linear infinite",
                  zIndex: -1,
                }}
              />
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                  transform: "translateZ(20px)",
                  boxShadow: "0 0 15px rgba(255,0,170,0.3)",
                }}
              >
                <LayersIcon size={24} className="text-white" />
              </div>
              <h3
                className="text-white font-black text-base mb-1"
                style={{
                  transform: "translateZ(15px)",
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
            {ae.map((m) => (
              <JeComponent
                key={m.id}
                m={m}
                onClick={() => {
                  setY("");
                  D(m.id);
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
      <JComponent />
      <div
        className={`max-w-5xl mx-auto px-4 py-6 min-h-screen relative z-10 ${Z ? "animate-screenShake" : ""}`}
        style={{
          perspective: "1000px",
        }}
      >
        <WeComponent mood={mood} />
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {T.map((t) => (
            <div
              key={t.id}
              className="absolute rounded-full"
              style={{
                left: t.x,
                top: t.y,
                width: t.size,
                height: t.size,
                background: t.color,
                opacity: t.life,
                boxShadow: `0 0 ${t.size * 2}px ${t.color}`,
                animation: "particleSpin 0.5s linear infinite",
              }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
          >
            <ArrowLeftIcon size={16} /> Volver / 返回
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setN("select")}
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
              onClick={ie}
              disabled={!b}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all disabled:opacity-30 hover:scale-105"
              style={{
                background: "rgba(255,214,0,.1)",
                border: "1px solid rgba(255,214,0,.2)",
                color: "#ffd600",
                boxShadow: "0 0 10px rgba(255,214,0,.1)",
              }}
            >
              <LightbulbIcon size={12} /> Pista / 提示
            </button>
            <button
              onClick={I}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "#fff",
              }}
            >
              <RotateCcwIcon size={12} /> Reiniciar
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
            className="text-5xl md:text-6xl font-black mb-2"
            style={{
              background: "linear-gradient(135deg,#39ff14,#00d4ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(57,255,20,.3))",
            }}
          >
            Crucigrama
          </h1>
          <p className="text-white/40 text-sm font-medium">Completa las palabras / 完成单词</p>
        </div>
        <div className="flex flex-col xl:flex-row gap-6">
          <div className="flex justify-center xl:flex-none overflow-x-auto pb-2">
            <div
              className="rounded-3xl p-3 md:p-5 relative"
              style={{
                background: "linear-gradient(180deg, rgba(14,22,64,.7), rgba(5,8,27,.5))",
                border: "2px solid transparent",
                backgroundClip: "padding-box",
                backdropFilter: "blur(20px)",
                transform: "translateZ(15px) perspective(1200px) rotateX(2deg)",
                boxShadow:
                  "0 0 40px rgba(57,255,20,.15), 0 0 80px rgba(57,255,20,.08), 0 0 120px rgba(0,212,255,.05), inset 0 0 40px rgba(57,255,20,.03)",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-3xl -z-10 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, #39ff14, #00d4ff, #b829dd, #39ff14)",
                  backgroundSize: "300% 300%",
                  animation: "neonBorder 4s linear infinite",
                  opacity: 0.6,
                  filter: "blur(1px)",
                }}
              />
              <div
                className="absolute -inset-[2px] rounded-3xl -z-10 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, #39ff14, #00d4ff, #b829dd, #39ff14)",
                  backgroundSize: "300% 300%",
                  animation: "neonBorder 4s linear infinite",
                  opacity: 0.3,
                  filter: "blur(8px)",
                }}
              />
              <div
                data-crossword-grid
                className="grid gap-[3px]"
                style={{
                  gridTemplateColumns: `repeat(${length}, min(32px, 6.5vw))`,
                }}
              >
                {Array.from(
                  {
                    length,
                  },
                  (t, r) =>
                    Array.from(
                      {
                        length,
                      },
                      (s, x) => {
                        const l = le(r, x);
                        const g = b?.[0] === r && b?.[1] === x;
                        const disabled = l === "empty";
                        const z = ee.has(`${r}-${x}`);
                        const L = te.has(`${r}-${x}`);
                        const U = "min(32px, 6.5vw)";
                        return (
                          <button
                            key={`${r}-${x}`}
                            onClick={() => se(r, x)}
                            disabled={disabled}
                            className="relative flex items-center justify-center font-black transition-all duration-150 overflow-hidden"
                            style={{
                              width: U,
                              height: U,
                              borderRadius: "8px",
                              cursor: disabled ? "default" : "pointer",
                              fontSize: g ? "16px" : "min(14px, 3.2vw)",
                              fontWeight: 900,
                              letterSpacing: "0.5px",
                              background: disabled
                                ? "transparent"
                                : l === "correct"
                                  ? "linear-gradient(135deg, rgba(70,255,154,.25), rgba(70,255,154,.1))"
                                  : l === "wrong"
                                    ? "linear-gradient(135deg, rgba(255,68,68,.25), rgba(255,68,68,.1))"
                                    : g
                                      ? "linear-gradient(135deg, rgba(0,212,255,.35), rgba(0,212,255,.15))"
                                      : "linear-gradient(135deg, rgba(255,255,255,.07), rgba(255,255,255,.02))",
                              border: disabled
                                ? "none"
                                : l === "correct"
                                  ? "2px solid rgba(70,255,154,.6)"
                                  : l === "wrong"
                                    ? "2px solid rgba(255,68,68,.6)"
                                    : g
                                      ? "2px solid rgba(0,212,255,.8)"
                                      : z
                                        ? "2px solid rgba(255,214,0,.7)"
                                        : "1px solid rgba(255,255,255,.12)",
                              color:
                                l === "correct"
                                  ? "#46ff9a"
                                  : l === "wrong"
                                    ? "#ff4444"
                                    : g
                                      ? "#00f0ff"
                                      : "#e0e7ff",
                              boxShadow: g
                                ? "0 0 20px rgba(0,212,255,.4), 0 0 40px rgba(0,212,255,.2), inset 0 0 10px rgba(0,212,255,.15)"
                                : L
                                  ? "0 0 20px rgba(255,214,0,.5), 0 0 40px rgba(255,214,0,.25)"
                                  : z
                                    ? "0 0 15px rgba(255,214,0,.3), 0 0 30px rgba(255,214,0,.15)"
                                    : l === "correct"
                                      ? "0 0 15px rgba(70,255,154,.25), inset 0 0 8px rgba(70,255,154,.1)"
                                      : l === "wrong"
                                        ? "0 0 15px rgba(255,68,68,.25), inset 0 0 8px rgba(255,68,68,.1)"
                                        : "0 0 0 transparent",
                              textShadow: g
                                ? "0 0 12px rgba(0,212,255,.8), 0 0 24px rgba(0,212,255,.4)"
                                : L
                                  ? "0 0 12px rgba(255,214,0,.8), 0 0 24px rgba(255,214,0,.4)"
                                  : l === "correct"
                                    ? "0 0 10px rgba(70,255,154,.6)"
                                    : l === "wrong"
                                      ? "0 0 10px rgba(255,68,68,.6)"
                                      : "0 0 4px rgba(224,231,255,.2)",
                              transform: g ? "scale(1.08) translateZ(10px)" : L ? "scale(1.12)" : "scale(1)",
                              animation: L
                                ? "letterWritePop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
                                : z
                                  ? "cellGlowPulse 0.5s ease"
                                  : "none",
                            }}
                          >
                            {g && (
                              <div
                                className="absolute inset-0 rounded-lg pointer-events-none"
                                style={{
                                  background:
                                    "linear-gradient(135deg, rgba(0,212,255,.1), transparent, rgba(0,212,255,.1))",
                                  animation: "selectedShimmer 1.5s ease-in-out infinite",
                                }}
                              />
                            )}
                            {o.numbers[r][x] > 0 && (
                              <span
                                className="absolute top-[1px] left-[2px] text-[7px] md:text-[8px] font-bold z-10"
                                style={{
                                  color: "rgba(207,216,255,.6)",
                                  textShadow: "0 0 2px rgba(0,0,0,.5)",
                                }}
                              >
                                {o.numbers[r][x]}
                              </span>
                            )}
                            <span className="relative z-10">{w[r][x] || ""}</span>
                          </button>
                        );
                      },
                    ),
                )}
              </div>
            </div>
          </div>
          <div
            className="space-y-4 flex-1 min-w-0 max-h-[70vh] xl:max-h-[80vh] overflow-y-auto"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,.1) transparent",
              transform: "translateZ(10px)",
            }}
          >
            <button
              onClick={ne}
              className="w-full py-3 rounded-2xl text-white font-black text-sm transition-all hover:scale-[1.02] flex items-center justify-center gap-2 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #39ff14, #00d4ff)",
                boxShadow:
                  "0 0 25px rgba(57,255,20,.2), 0 0 50px rgba(57,255,20,.1), 0 0 80px rgba(0,212,255,.05)",
                textShadow: "0 0 10px rgba(255,255,255,.3)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,.2), transparent)",
                  animation: "shimmer 2s linear infinite",
                }}
              />
              <CircleCheckBigIcon size={16} /> Verificar / 检查答案
            </button>
            {c && (
              <div
                className="p-4 rounded-2xl text-center"
                style={{
                  background:
                    i === 100 ? "rgba(70,255,154,.1)" : i >= 50 ? "rgba(255,214,0,.1)" : "rgba(255,68,68,.1)",
                  border: `1px solid ${i === 100 ? "rgba(70,255,154,.2)" : i >= 50 ? "rgba(255,214,0,.2)" : "rgba(255,68,68,.2)"}`,
                  boxShadow:
                    i === 100
                      ? "0 0 15px rgba(70,255,154,.1)"
                      : i >= 50
                        ? "0 0 15px rgba(255,214,0,.1)"
                        : "0 0 15px rgba(255,68,68,.1)",
                }}
              >
                <p
                  className="text-lg font-black"
                  style={{
                    color: i === 100 ? "#46ff9a" : i >= 50 ? "#ffd600" : "#ff4444",
                    textShadow:
                      i === 100
                        ? "0 0 10px rgba(70,255,154,.3)"
                        : i >= 50
                          ? "0 0 10px rgba(255,214,0,.3)"
                          : "0 0 10px rgba(255,68,68,.3)",
                  }}
                >
                  {i === 100
                    ? "¡Perfecto! / 完美！"
                    : i >= 50
                      ? "¡Bien hecho! / 做得好！"
                      : "Sigue intentando / 继续努力"}
                </p>
                <p
                  className="text-sm"
                  style={{
                    color: "rgba(207,216,255,.5)",
                  }}
                >
                  Score: {i}/100
                </p>
              </div>
            )}
            <div
              className="rounded-2xl p-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(14,22,64,.5), rgba(5,8,27,.35))",
                border: "1px solid rgba(0,212,255,.25)",
                boxShadow: "0 0 15px rgba(0,212,255,.08), inset 0 0 20px rgba(0,212,255,.03)",
              }}
            >
              <div
                className="absolute -inset-[1px] rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, rgba(0,212,255,0), rgba(0,212,255), rgba(0,212,255,0))",
                  backgroundSize: "200% 100%",
                  animation: "borderRotate 2s linear infinite",
                  zIndex: -1,
                }}
              />
              <h3
                className="text-sm font-black mb-3 flex items-center gap-2"
                style={{
                  color: "#00d4ff",
                  textShadow: "0 0 10px rgba(0,212,255,.3)",
                }}
              >
                <span
                  className="w-5 h-5 rounded flex items-center justify-center text-[10px]"
                  style={{
                    background: "rgba(0,212,255,.15)",
                    color: "#00d4ff",
                    boxShadow: "0 0 8px rgba(0,212,255,.2)",
                  }}
                >
                  →
                </span>
                Horizontal / 横
              </h3>
              <div className="space-y-2">
                {o.placements
                  .filter((t) => t.dir === "across")
                  .map((t) => (
                    <div
                      key={t.num}
                      className="flex gap-2 text-xs p-2 rounded-lg transition-all hover:bg-white/5 cursor-pointer group"
                      style={{
                        border: "1px solid transparent",
                      }}
                      onClick={() => {
                        setB([t.row, t.col]);
                        setS("across");
                      }}
                    >
                      <span
                        className="font-black shrink-0"
                        style={{
                          color: "rgba(0,212,255,.6)",
                          textShadow: "0 0 5px rgba(0,212,255,.2)",
                        }}
                      >
                        {t.num}.
                      </span>
                      <span
                        className="font-bold text-sm"
                        style={{
                          color: "rgba(255,255,255,.9)",
                        }}
                      >
                        {t.hintCn}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            <div
              className="rounded-2xl p-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(14,22,64,.5), rgba(5,8,27,.35))",
                border: "1px solid rgba(184,41,221,.25)",
                boxShadow: "0 0 15px rgba(184,41,221,.08), inset 0 0 20px rgba(184,41,221,.03)",
              }}
            >
              <div
                className="absolute -inset-[1px] rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(184,41,221,0), rgba(184,41,221), rgba(184,41,221,0))",
                  backgroundSize: "200% 100%",
                  animation: "borderRotate 2s linear infinite",
                  zIndex: -1,
                }}
              />
              <h3
                className="text-sm font-black mb-3 flex items-center gap-2"
                style={{
                  color: "#b829dd",
                  textShadow: "0 0 10px rgba(184,41,221,.3)",
                }}
              >
                <span
                  className="w-5 h-5 rounded flex items-center justify-center text-[10px]"
                  style={{
                    background: "rgba(184,41,221,.15)",
                    color: "#b829dd",
                    boxShadow: "0 0 8px rgba(184,41,221,.2)",
                  }}
                >
                  ↓
                </span>
                Vertical / 竖
              </h3>
              <div className="space-y-2">
                {o.placements
                  .filter((t) => t.dir === "down")
                  .map((t) => (
                    <div
                      key={t.num}
                      className="flex gap-2 text-xs p-2 rounded-lg transition-all hover:bg-white/5 cursor-pointer group"
                      style={{
                        border: "1px solid transparent",
                      }}
                      onClick={() => {
                        setB([t.row, t.col]);
                        setS("down");
                      }}
                    >
                      <span
                        className="font-black shrink-0"
                        style={{
                          color: "rgba(184,41,221,.6)",
                          textShadow: "0 0 5px rgba(184,41,221,.2)",
                        }}
                      >
                        {t.num}.
                      </span>
                      <span
                        className="font-bold text-sm"
                        style={{
                          color: "rgba(255,255,255,.9)",
                        }}
                      >
                        {t.hintCn}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        {k && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.85)",
              backdropFilter: "blur(20px)",
              perspective: "1000px",
            }}
          >
            <div
              className="text-center p-8 rounded-3xl max-w-sm mx-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(14,22,64,.8), rgba(5,8,27,.6))",
                border: "2px solid rgba(57,255,20,.3)",
                boxShadow:
                  "0 0 60px rgba(57,255,20,.2), 0 0 120px rgba(57,255,20,.1), 0 0 200px rgba(0,212,255,.05)",
                transform: "translateZ(50px)",
                animation: "victoryBounce 1s ease-out",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-50"
                style={{
                  background: "linear-gradient(135deg, #39ff14, #00d4ff, #b829dd)",
                  filter: "blur(25px)",
                  animation: "victoryGlow 2s ease-in-out infinite alternate",
                }}
              />
              <TrophyIcon
                size={56}
                style={{
                  color: "#ffd600",
                  margin: "0 auto 16px",
                  filter: "drop-shadow(0 0 15px rgba(255,214,0,.5))",
                  animation: "trophySpin 3s ease-in-out infinite",
                }}
              />
              <h2
                className="text-4xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg, #39ff14, #00d4ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 20px rgba(57,255,20,.3))",
                }}
              >
                ¡Excelente!
              </h2>
              <p className="text-white/50 text-sm mb-4">你完成了所有单词！</p>
              <div className="flex gap-4 justify-center mb-6">
                <div
                  className="p-4 rounded-2xl"
                  style={{
                    background: "rgba(0,212,255,.1)",
                    border: "1px solid rgba(0,212,255,.15)",
                    boxShadow: "0 0 10px rgba(0,212,255,.1)",
                  }}
                >
                  <ZapIcon
                    size={20}
                    style={{
                      color: "#00d4ff",
                      margin: "0 auto 8px",
                      filter: "drop-shadow(0 0 5px rgba(0,212,255,.5))",
                    }}
                  />
                  <p
                    className="text-2xl font-black"
                    style={{
                      color: "#00d4ff",
                      textShadow: "0 0 10px rgba(0,212,255,.3)",
                    }}
                  >
                    {i}
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
                  className="p-4 rounded-2xl"
                  style={{
                    background: "rgba(57,255,20,.1)",
                    border: "1px solid rgba(57,255,20,.15)",
                    boxShadow: "0 0 10px rgba(57,255,20,.1)",
                  }}
                >
                  <DiamondIcon
                    size={20}
                    style={{
                      color: "#39ff14",
                      margin: "0 auto 8px",
                      filter: "drop-shadow(0 0 5px rgba(57,255,20,.5))",
                    }}
                  />
                  <p
                    className="text-2xl font-black"
                    style={{
                      color: "#39ff14",
                      textShadow: "0 0 10px rgba(57,255,20,.3)",
                    }}
                  >
                    {o.placements.length}
                  </p>
                  <p
                    className="text-[10px]"
                    style={{
                      color: "rgba(207,216,255,.4)",
                    }}
                  >
                    Palabras
                  </p>
                </div>
              </div>
              <button
                onClick={I}
                className="px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #39ff14, #00d4ff)",
                  boxShadow: "0 0 25px rgba(57,255,20,.3), 0 0 50px rgba(57,255,20,.1)",
                }}
              >
                Jugar de nuevo / 再玩一次
              </button>
              <P currentGameId="crucigrama" />
            </div>
          </div>
        )}
        <style>{`
          @keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
          @keyframes screenShake { 0%,100%{transform:translateX(0)} 10%{transform:translateX(-8px)} 20%{transform:translateX(8px)} 30%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 50%{transform:translateX(-4px)} 60%{transform:translateX(4px)} 70%{transform:translateX(-2px)} 80%{transform:translateX(2px)} 90%{transform:translateX(-1px)} }
          @keyframes victoryBounce { 0%{transform:translateZ(50px) scale(0.8); opacity:0} 60%{transform:translateZ(50px) scale(1.02); opacity:1} 100%{transform:translateZ(50px) scale(1); opacity:1} }
          @keyframes victoryGlow { from{opacity:.3} to{opacity:.6} }
          @keyframes trophySpin { 0%,100%{transform:rotateY(0deg)} 50%{transform:rotateY(20deg)} }
          @keyframes cellGlowPulse { 0%{transform:scale(1); box-shadow:0 0 15px rgba(255,214,0,.3)} 50%{transform:scale(1.05); box-shadow:0 0 25px rgba(255,214,0,.5), 0 0 40px rgba(255,214,0,.2)} 100%{transform:scale(1); box-shadow:0 0 15px rgba(255,214,0,.3)} }
          @keyframes crossFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
          @keyframes crossTitlePulse { from{filter:drop-shadow(0 0 40px rgba(57,255,20,.3)) brightness(1)} to{filter:drop-shadow(0 0 80px rgba(57,255,20,.5)) brightness(1.15)} }
          @keyframes mascotFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
          @keyframes mascotPulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
          @keyframes mascotExcited { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-12px) scale(1.1)} }
          @keyframes sparkle { 0%,100%{opacity:0.5; transform:scale(1)} 50%{opacity:1; transform:scale(1.3)} }
          @keyframes particleSpin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
          @keyframes neonBorder { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
          @keyframes letterWritePop { 0%{transform:scale(1)} 50%{transform:scale(1.2)} 100%{transform:scale(1.08)} }
          @keyframes selectedShimmer { 0%{background-position:0% 0%} 100%{background-position:200% 200%} }
          @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
          .animate-screenShake { animation: screenShake 0.5s ease-in-out; }
        `}</style>
      </div>
    </StarfieldBackground>
  );
}
export { GeComponent as default };
