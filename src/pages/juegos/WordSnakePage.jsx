import {
  BookOpenIcon,
  ZapIcon,
  TrophyIcon,
  StarIcon,
  ChevronRightIcon,
  SparklesIcon,
  ArrowRightIcon,
  HeartIcon,
  ArrowLeftIcon,
  GitBranchIcon,
  LayersIcon,
  CrosshairIcon,
  ShieldIcon,
  ClockIcon,
  SkullIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  EyeIcon,
  RotateCcwIcon,
  MagnetIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P as P_1 } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g as g_1, a as a_1 } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
const T = 15;
const P = 12;
const be = 180;
function It() {
  const n = ["#ff4444", "#ff6b35", "#ff00aa", "#ffd600", "#ffffff"];
  for (let h = 0; h < 80; h++) {
    const m = document.createElement("div");
    const y = 3 + Math.random() * 8;
    m.style.cssText = `position:fixed;left:50%;top:50%;width:${y}px;height:${y}px;border-radius:50%;background:${n[h % n.length]};pointer-events:none;z-index:99999;box-shadow:0 0 15px ${n[h % n.length]};`;
    document.body.appendChild(m);
    const l = Math.random() * Math.PI * 2;
    const p = 6 + Math.random() * 18;
    let b = window.innerWidth / 2;
    let k = window.innerHeight / 2;
    let $ = 1;
    const X = Math.cos(l) * p;
    const I = Math.sin(l) * p;
    const g = () => {
      b += X * 0.96;
      k += I * 0.96 + 0.3;
      $ -= 0.015;
      m.style.left = `${b}px`;
      m.style.top = `${k}px`;
      m.style.opacity = String($);
      m.style.transform = `scale(${0.2 + $ * 0.8})`;
      if ($ > 0) {
        requestAnimationFrame(g);
      } else {
        m.remove();
      }
    };
    requestAnimationFrame(g);
  }
}
function Ve(n, h, m, y = 36) {
  const l = [m, "#ffffff", "#00d4ff", "#ff00aa", "#ffd600", "#39ff14"];
  for (let p = 0; p < y; p++) {
    const b = document.createElement("div");
    const k = 3 + Math.random() * 7;
    b.style.cssText = `position:fixed;left:${n}px;top:${h}px;width:${k}px;height:${k}px;border-radius:50%;background:${l[p % l.length]};pointer-events:none;z-index:99999;box-shadow:0 0 10px ${l[p % l.length]};`;
    document.body.appendChild(b);
    const $ = Math.random() * Math.PI * 2;
    const X = 4 + Math.random() * 16;
    let I = Math.cos($) * X;
    let g = Math.sin($) * X;
    let B = 1;
    const V = () => {
      I *= 0.93;
      g *= 0.93;
      g += 0.3;
      b.style.left = `${parseFloat(b.style.left) + I}px`;
      b.style.top = `${parseFloat(b.style.top) + g}px`;
      B -= 0.02;
      b.style.opacity = String(B);
      b.style.transform = `scale(${B})`;
      if (B > 0) {
        requestAnimationFrame(V);
      } else {
        b.remove();
      }
    };
    requestAnimationFrame(V);
  }
}
function De(n, h, m, y = "#ffd600") {
  const l = document.createElement("div");
  l.textContent = m;
  l.style.cssText = `position:fixed;left:${n}px;top:${h}px;pointer-events:none;z-index:99999;font-weight:900;font-size:1.4rem;color:${y};text-shadow:0 0 20px ${y},0 0 40px ${y};transform:translate(-50%,-50%);`;
  document.body.appendChild(l);
  let p = 1;
  let b = 0;
  const k = () => {
    b -= 2;
    p -= 0.015;
    l.style.top = `${h + b}px`;
    l.style.opacity = String(p);
    l.style.transform = `translate(-50%,-50%) scale(${1 + (1 - p) * 0.5})`;
    if (p > 0) {
      requestAnimationFrame(k);
    } else {
      l.remove();
    }
  };
  requestAnimationFrame(k);
}
function Tt(n, h) {
  const m = ["#ff4444", "#ff6b35", "#ffd600", "#ffffff"];
  for (let y = 0; y < 20; y++) {
    const l = document.createElement("div");
    const p = 2 + Math.random() * 5;
    l.style.cssText = `position:fixed;left:${n}px;top:${h}px;width:${p}px;height:${p}px;border-radius:50%;background:${m[y % m.length]};pointer-events:none;z-index:99999;box-shadow:0 0 8px ${m[y % m.length]};`;
    document.body.appendChild(l);
    const b = Math.random() * Math.PI * 2;
    const k = 3 + Math.random() * 10;
    let $ = Math.cos(b) * k;
    let X = Math.sin(b) * k;
    let I = 1;
    const g = () => {
      $ *= 0.92;
      X *= 0.92;
      l.style.left = `${parseFloat(l.style.left) + $}px`;
      l.style.top = `${parseFloat(l.style.top) + X}px`;
      I -= 0.03;
      l.style.opacity = String(I);
      if (I > 0) {
        requestAnimationFrame(g);
      } else {
        l.remove();
      }
    };
    requestAnimationFrame(g);
  }
}
function Ee(n, h = T, m = P) {
  let y = 0;
  while (y < 300) {
    const l = Math.floor(Math.random() * h);
    const p = Math.floor(Math.random() * m);
    if (!n.some((b) => b.x === l && b.y === p)) {
      return {
        x: l,
        y: p,
      };
    }
    y++;
  }
  return {
    x: 0,
    y: 0,
  };
}
function KeComponent({ expression, size = 72 }) {
  const cy = expression === "excited" || expression === "celebrating" ? 26 : expression === "sad" ? 34 : 30;
  const d =
    expression === "happy" || expression === "celebrating"
      ? "M22,42 Q30,50 38,42"
      : expression === "sad"
        ? "M24,48 Q30,42 36,48"
        : expression === "excited"
          ? "M24,44 Q30,54 36,44"
          : expression === "shocked"
            ? "M26,44 Q30,50 34,44"
            : expression === "cool"
              ? "M26,46 Q30,44 34,46"
              : "M26,46 Q30,48 34,46";
  const opacity =
    expression === "happy" || expression === "celebrating" || expression === "excited"
      ? 0.6
      : expression === "shocked"
        ? 0.2
        : 0.3;
  const p = expression === "excited" || expression === "celebrating";
  const b = expression === "cool";
  const k = expression === "shocked";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mascot-svg"
    >
      <defs>
        <radialGradient id="mascotBody" cx="0.5" cy="0.4" r="0.5">
          <stop offset="0%" stopColor="#b8ff4a" />
          <stop offset="100%" stopColor="#39ff14" />
        </radialGradient>
        <filter id="mascotGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="mascotStrongGlow">
          <feGaussianBlur stdDeviation="5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <ellipse
        cx="30"
        cy="34"
        rx="22"
        ry="20"
        fill="url(#mascotBody)"
        filter="url(#mascotGlow)"
        opacity="0.9"
      />
      <ellipse cx="30" cy="34" rx="22" ry="20" fill="url(#mascotBody)" opacity="0.95" />
      <circle cx="14" cy="38" r="5" fill="#ff6b9d" opacity={opacity} />
      <circle cx="46" cy="38" r="5" fill="#ff6b9d" opacity={opacity} />
      {b ? (
        <>
          <rect x="12" y="24" width="16" height="10" rx="3" fill="#0a0a1a" />
          <rect x="32" y="24" width="16" height="10" rx="3" fill="#0a0a1a" />
          <line x1="28" y1="28" x2="32" y2="28" stroke="#0a0a1a" strokeWidth="2" />
          <rect x="14" y="26" width="12" height="4" rx="1" fill="rgba(255,255,255,0.3)" />
          <rect x="34" y="26" width="12" height="4" rx="1" fill="rgba(255,255,255,0.3)" />
        </>
      ) : p ? (
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
      {(expression === "celebrating" || expression === "excited") && (
        <>
          <circle cx="6" cy="12" r="1.5" fill="#ffd600" className="sparkle-1" />
          <circle cx="54" cy="8" r="2" fill="#00d4ff" className="sparkle-2" />
          <circle cx="8" cy="52" r="1.5" fill="#ff00aa" className="sparkle-3" />
          <circle cx="52" cy="50" r="1.5" fill="#39ff14" className="sparkle-1" />
          <circle cx="30" cy="4" r="1.5" fill="#ffffff" className="sparkle-2" />
          <circle cx="4" cy="30" r="1" fill="#ffd600" className="sparkle-3" />
        </>
      )}
      {k && <ellipse cx="52" cy="16" rx="2" ry="3" fill="#00d4ff" opacity="0.7" className="animate-sweat" />}
    </svg>
  );
}
function ZtComponent({ dir }) {
  const m = {
    up: {
      cx: 0,
      cy: -1.5,
    },
    down: {
      cx: 0,
      cy: 1.5,
    },
    left: {
      cx: -1.5,
      cy: 0,
    },
    right: {
      cx: 1.5,
      cy: 0,
    },
  }[dir];
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      className="animate-head-eyes-glow"
      style={{
        position: "absolute",
        top: "-8px",
        right: "-8px",
        zIndex: 10,
        pointerEvents: "none",
        filter: "drop-shadow(0 0 6px rgba(255,255,255,0.9))",
      }}
    >
      <circle cx="7" cy="7" r="5" fill="#fff" />
      <circle cx={7 + m.cx} cy={7 + m.cy} r="2.5" fill="#0a0a1a" />
      <circle cx={8 + m.cx} cy={6 + m.cy} r="1" fill="white" opacity="0.9" />
    </svg>
  );
}
function DtComponent({ dir }) {
  const h = {
    up: "M7,0 L4,-6 L7,-4 L10,-6 Z",
    down: "M7,14 L4,20 L7,18 L10,20 Z",
    left: "M0,7 L-6,4 L-4,7 L-6,10 Z",
    right: "M14,7 L20,4 L18,7 L20,10 Z",
  };
  return (
    <svg
      width="24"
      height="24"
      viewBox="-6 -6 24 24"
      style={{
        position: "absolute",
        zIndex: 10,
        pointerEvents: "none",
        filter: "drop-shadow(0 0 5px rgba(255,0,0,0.8))",
      }}
    >
      <path d={h[dir]} fill="#ff4444" className="animate-tongue-flick" />
    </svg>
  );
}
function EtComponent({ type }) {
  const h = {
    shield: <ShieldIcon size={12} className="text-[#00d4ff]" />,
    slow: <ClockIcon size={12} className="text-[#ffd600]" />,
    double: <StarIcon size={12} className="text-[#ff00aa]" />,
    magnet: <MagnetIcon size={12} className="text-[#39ff14]" />,
  };
  const m = {
    shield: "0 0 10px #00d4ff, 0 0 20px #00d4ff",
    slow: "0 0 10px #ffd600, 0 0 20px #ffd600",
    double: "0 0 10px #ff00aa, 0 0 20px #ff00aa",
    magnet: "0 0 10px #39ff14, 0 0 20px #39ff14",
  };
  return (
    <div
      className="w-full h-full flex items-center justify-center animate-powerup-pulse"
      style={{
        filter: `drop-shadow(${m[type]})`,
      }}
    >
      {h[type]}
    </div>
  );
}
function KtComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [p, setP] = React.useState("select");
  const [k, setK] = React.useState([]);
  const [X, setX] = React.useState(0);
  const [g, setG] = React.useState([
    {
      x: 7,
      y: 6,
    },
  ]);
  const [dir, setDir] = React.useState("right");
  const [O, setO] = React.useState("right");
  const [F, setF] = React.useState([]);
  const [he, setHe] = React.useState(0);
  const [ye, setYe] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("snake_best") || "0");
    } catch {
      return 0;
    }
  });
  const [N, setN] = React.useState("playing");
  const [re, setRe] = React.useState(0);
  const [w, setW] = React.useState([]);
  const [Le, setLe] = React.useState(be);
  const [Pe, setPe] = React.useState(false);
  const [_, set_] = React.useState(true);
  const [G, setG_1] = React.useState(0);
  const [oe, setOe] = React.useState(0);
  const [je, setJe] = React.useState(1);
  const [K, setK_1] = React.useState([]);
  const [j, setJ] = React.useState(null);
  const [R, setR] = React.useState([]);
  const [at, setAt] = React.useState([]);
  const [ee, setEe] = React.useState(false);
  const [ie, setIe] = React.useState([]);
  const [te, setTe] = React.useState(null);
  const MeRef = React.useRef(null);
  const DRef = React.useRef(null);
  const rt = g_1();
  const [We, setWe] = React.useState("");
  React.useRef(0);
  const zeRef = React.useRef(null);
  const [Ae, setAe] = React.useState(null);
  const [$e, set$e] = React.useState(false);
  const [Xe, setXe] = React.useState(false);
  const Ie = k[X];
  const E = Ie?.word?.toUpperCase() || "";
  const w_length = w.length;
  const lt = E[w_length] || "";
  const q = j?.type === "shield" && Date.now() < j.expiresAt;
  const it = j?.type === "slow" && Date.now() < j.expiresAt;
  const de = j?.type === "double" && Date.now() < j.expiresAt;
  j?.type === "magnet" && Date.now() < j.expiresAt;
  const Re = it ? Math.min(Le * 1.6, be) : Le;
  const expression =
    N === "lost"
      ? "sad"
      : $e || N === "won"
        ? "celebrating"
        : q
          ? "cool"
          : ee
            ? "shocked"
            : G >= 5
              ? "excited"
              : G >= 2
                ? "happy"
                : "neutral";
  const Ue = React.useCallback((a) => {
    playClick();
    setAe(a);
    set$e(false);
    let t = a ? a_1(a) : a_1();
    if (t.length === 0) {
      setWe(
        'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
      );
      return;
    }
    const r = t
      .filter((x) => x.espanol && x.chino)
      .map((x) => ({
        word: x.espanol
          .toUpperCase()
          .replace(/[¿?¡!.,;:'"]/g, "")
          .trim(),
        chino: x.chino.trim(),
      }))
      .filter((x) => x.word.length >= 3 && x.word.length <= 8);
    const s = [];
    const f = new Set();
    for (const x of r) {
      if (!f.has(x.word)) {
        f.add(x.word);
        s.push(x);
      }
    }
    const d = s.sort(() => Math.random() - 0.5).slice(0, 20);
    setK(d);
    setX(0);
    setG([
      {
        x: 7,
        y: 6,
      },
    ]);
    setDir("right");
    setO("right");
    setHe(0);
    setRe(0);
    setW([]);
    setG_1(0);
    setOe(0);
    setJe(1);
    setLe(be);
    setK_1([]);
    setJ(null);
    setR([]);
    setAt([]);
    setEe(false);
    setIe([]);
    setN("playing");
    setP("playing");
    set_(true);
    setTimeout(() => set_(false), 1200);
  }, []);
  const ct = React.useCallback(() => {
    playClick();
    if (X < k.length - 1) {
      setX((a) => a + 1);
    } else {
      const t = (Ae ? a_1(Ae) : a_1())
        .filter((d) => d.espanol && d.chino)
        .map((d) => ({
          word: d.espanol
            .toUpperCase()
            .replace(/[¿?¡!.,;:'"]/g, "")
            .trim(),
          chino: d.chino.trim(),
        }))
        .filter((d) => d.word.length >= 3 && d.word.length <= 8);
      const r = [];
      const s = new Set();
      for (const d of t) {
        if (!s.has(d.word)) {
          s.add(d.word);
          r.push(d);
        }
      }
      const f = r.sort(() => Math.random() - 0.5).slice(0, 20);
      setK(f);
      setX(0);
    }
    setDir("right");
    setO("right");
    setW([]);
    set_(true);
    setTimeout(() => set_(false), 800);
    set$e(false);
    setN("playing");
  }, [X, k.length, Ae, playClick]);
  React.useCallback(() => {
    playClick();
    setP("select");
    set$e(false);
    setN("playing");
  }, [playClick]);
  React.useEffect(() => {
    if (p !== "playing" || !E) {
      return;
    }
    const a = [];
    const t = [...g, ...R];
    for (let r = 0; r < E.length; r++) {
      const s = Ee(t);
      a.push({
        x: s.x,
        y: s.y,
        letter: E[r],
        index: r,
        id: r,
      });
      t.push(s);
    }
    setF(a);
  }, [X, p, E, R]);
  React.useEffect(() => {
    if (!(p !== "playing" || N !== "playing")) {
      zeRef.current = setInterval(() => {
        if (Math.random() > 0.35) {
          return;
        }
        const a = ["shield", "slow", "double", "magnet"];
        const type = a[Math.floor(Math.random() * a.length)];
        const r = [
          ...g,
          ...F.map((f) => ({
            x: f.x,
            y: f.y,
          })),
          ...R,
          ...K.map((f) => ({
            x: f.x,
            y: f.y,
          })),
        ];
        const s = Ee(r);
        setK_1((f) => {
          if (f.length >= 2) {
            return f;
          }
          return [
            ...f,
            {
              x: s.x,
              y: s.y,
              type,
              id: Date.now() + Math.random(),
              spawnTime: Date.now(),
            },
          ];
        });
      }, 8000);
      return () => {
        if (zeRef.current) {
          clearInterval(zeRef.current);
        }
      };
    }
  }, [p, N, g, F, R, K]);
  React.useEffect(() => {
    if (p !== "playing") {
      return;
    }
    const a = setInterval(() => {
      setK_1((t) => t.filter((r) => Date.now() - r.spawnTime < 12000));
    }, 1000);
    return () => clearInterval(a);
  }, [p]);
  React.useEffect(() => {
    if (!j) {
      return;
    }
    const a = setInterval(() => {
      if (Date.now() >= j.expiresAt) {
        setJ(null);
      }
    }, 200);
    return () => clearInterval(a);
  }, [j]);
  React.useEffect(() => {
    if (ie.length === 0) {
      return;
    }
    let a;
    const t = () => {
      setIe((r) =>
        r
          .map((s) => ({
            ...s,
            x: s.x + s.vx,
            y: s.y + s.vy,
            vy: s.vy + 0.15,
            life: s.life - 0.02,
          }))
          .filter((s) => s.life > 0),
      );
      a = requestAnimationFrame(t);
    };
    a = requestAnimationFrame(t);
    return () => cancelAnimationFrame(a);
  }, [ie.length]);
  React.useEffect(() => {
    if (!(p !== "playing" || N !== "playing")) {
      MeRef.current = setInterval(() => {
        setDir(O);
        setG((a) => {
          const t = a[a.length - 1];
          let r = t.x;
          let s = t.y;
          if (O === "up") {
            s -= 1;
          }
          if (O === "down") {
            s += 1;
          }
          if (O === "left") {
            r -= 1;
          }
          if (O === "right") {
            r += 1;
          }
          if (r < 0 || r >= T || s < 0 || s >= P) {
            if (q) {
              if (r < 0) {
                r = T - 1;
              }
              if (r >= T) {
                r = 0;
              }
              if (s < 0) {
                s = P - 1;
              }
              if (s >= P) {
                s = 0;
              }
            } else {
              if (DRef.current) {
                const side = r < 0 ? "left" : r >= T ? "right" : s < 0 ? "top" : "bottom";
                setTe({
                  side,
                  time: Date.now(),
                });
                const C = DRef.current.querySelectorAll("[data-cell]");
                const v = Array.from(C).filter((i) => {
                  const u = parseInt(i.dataset.x || "0");
                  const z = parseInt(i.dataset.y || "0");
                  switch (side) {
                    case "left":
                      return u === 0;
                    case "right":
                      return u === T - 1;
                    case "top":
                      return z === 0;
                    default:
                      return z === P - 1;
                  }
                });
                if (v[0]) {
                  const i = v[0].getBoundingClientRect();
                  Tt(i.left + i.width / 2, i.top + i.height / 2);
                }
              }
              playLose();
              setEe(true);
              setTimeout(() => {
                setN("lost");
                setEe(false);
              }, 1200);
              setG_1(0);
              setOe(0);
              return a;
            }
          }
          if (!q && a.some((c) => c.x === r && c.y === s)) {
            playLose();
            setEe(true);
            setTimeout(() => {
              setN("lost");
              setEe(false);
            }, 1200);
            setG_1(0);
            setOe(0);
            return a;
          }
          if (!q && R.some((c) => c.x === r && c.y === s)) {
            playLose();
            setEe(true);
            setTimeout(() => {
              setN("lost");
              setEe(false);
            }, 1200);
            setG_1(0);
            setOe(0);
            return a;
          }
          const f = {
            x: r,
            y: s,
          };
          const d = [...a, f];
          setAt((c) => [...c.slice(-8), t]);
          const x = K.find((c) => c.x === r && c.y === s);
          if (x) {
            setK_1((C) => C.filter((v) => v.id !== x.id));
            setJ({
              type: x.type,
              expiresAt: Date.now() + 6000,
            });
            Ve(
              DRef.current
                ? (() => {
                    const C = DRef.current.querySelectorAll("[data-cell]");
                    const v = Array.from(C).find(
                      (i) => parseInt(i.dataset.x || "0") === r && parseInt(i.dataset.y || "0") === s,
                    );
                    if (v) {
                      const i = v.getBoundingClientRect();
                      return {
                        x: i.left + i.width / 2,
                        y: i.top + i.height / 2,
                      };
                    }
                    return {
                      x: 0,
                      y: 0,
                    };
                  })().x
                : 0,
              DRef.current
                ? (() => {
                    const C = DRef.current.querySelectorAll("[data-cell]");
                    const v = Array.from(C).find(
                      (i) => parseInt(i.dataset.x || "0") === r && parseInt(i.dataset.y || "0") === s,
                    );
                    if (v) {
                      const i = v.getBoundingClientRect();
                      return {
                        x: i.left + i.width / 2,
                        y: i.top + i.height / 2,
                      };
                    }
                    return {
                      x: 0,
                      y: 0,
                    };
                  })().y
                : 0,
              x.type === "shield"
                ? "#00d4ff"
                : x.type === "slow"
                  ? "#ffd600"
                  : x.type === "double"
                    ? "#ff00aa"
                    : "#39ff14",
              24,
            );
            const c = {
              shield: "¡ESCUDO!",
              slow: "¡LENTO!",
              double: "¡x2 PUNTOS!",
              magnet: "¡IMÁN!",
            };
            if (DRef.current) {
              const C = DRef.current.querySelectorAll("[data-cell]");
              const v = Array.from(C).find(
                (i) => parseInt(i.dataset.x || "0") === r && parseInt(i.dataset.y || "0") === s,
              );
              if (v) {
                const i = v.getBoundingClientRect();
                De(i.left + i.width / 2, i.top, c[x.type], "#ffffff");
              }
            }
            playCorrect();
          }
          const M = F.find((c) => c.x === r && c.y === s && c.index === w.length);
          if (M) {
            playCorrect();
            const c = Math.min(G, 10) * 15;
            const C = Math.min(oe, 5) * 10;
            const v = 50 + c + C;
            const i = de ? v * 2 : v;
            setW((u) => [...u, M.letter]);
            setHe((u) => u + i);
            setG_1((u) => u + 1);
            setOe((u) => u + 1);
            setF((u) =>
              u.map((z) => {
                if (z.id === M.id) {
                  return {
                    ...z,
                    collected: true,
                  };
                }
                return z;
              }),
            );
            if (DRef.current) {
              const u = DRef.current.querySelectorAll("[data-cell]");
              const z = Array.from(u).find((A) => A.dataset.x === String(r) && A.dataset.y === String(s));
              if (z) {
                const A = z.getBoundingClientRect();
                Ve(A.left + A.width / 2, A.top + A.height / 2, "#39ff14", 48);
                De(A.left + A.width / 2, A.top, `+${i}`);
                if (de) {
                  De(A.left + A.width / 2 + 20, A.top - 20, "x2", "#ff00aa");
                }
              }
            }
          } else {
            d.shift();
            setOe(0);
            setG_1(0);
          }
          return d;
        });
      }, Re);
      return () => {
        if (MeRef.current) {
          clearInterval(MeRef.current);
        }
      };
    }
  }, [p, N, O, Re, F, w.length, G, oe, q, de, K, R]);
  React.useEffect(() => {
    if (!(p !== "playing" || !E) && w.length === E.length) {
      playWin();
      const a = E.length * 25;
      setHe((r) => r + 200 + a);
      setRe((r) => r + 1);
      setG_1(0);
      setOe(0);
      setPe(true);
      setXe(true);
      setTimeout(() => {
        setPe(false);
        setXe(false);
      }, 1500);
      const t = Math.floor(re / 3) + 1;
      setJe(t);
      if (t > 1) {
        const r = Math.min(t - 1, 6);
        const s = [
          ...g,
          ...F.map((d) => ({
            x: d.x,
            y: d.y,
          })),
        ];
        const f = [];
        for (let d = 0; d < r; d++) {
          const x = Ee([...s, ...f]);
          f.push({
            x: x.x,
            y: x.y,
            id: Date.now() + d,
          });
        }
        setR(f);
      }
      setN("wordcomplete");
      set$e(true);
    }
  }, [w.length, E, X, k.length, p, he, re, g, F]);
  React.useEffect(() => {
    const a = (t) => {
      if (p !== "playing" || N !== "playing") {
        return;
      }
      const t_key = t.key;
      if (t_key === "ArrowUp" || t_key === "w" || t_key === "W") {
        setO((s) => {
          if (s !== "down") {
            return "up";
          }
          return s;
        });
      }
      if (t_key === "ArrowDown" || t_key === "s" || t_key === "S") {
        setO((s) => {
          if (s !== "up") {
            return "down";
          }
          return s;
        });
      }
      if (t_key === "ArrowLeft" || t_key === "a" || t_key === "A") {
        setO((s) => {
          if (s !== "right") {
            return "left";
          }
          return s;
        });
      }
      if (t_key === "ArrowRight" || t_key === "d" || t_key === "D") {
        setO((s) => {
          if (s !== "left") {
            return "right";
          }
          return s;
        });
      }
    };
    window.addEventListener("keydown", a);
    return () => window.removeEventListener("keydown", a);
  }, [p, N]);
  const xt = () => {
    playClick();
    setX(0);
    setG([
      {
        x: 7,
        y: 6,
      },
    ]);
    setDir("right");
    setO("right");
    setHe(0);
    setRe(0);
    setW([]);
    setG_1(0);
    setOe(0);
    setJe(1);
    setLe(be);
    setK_1([]);
    setJ(null);
    setR([]);
    setAt([]);
    setEe(false);
    setIe([]);
    setN("playing");
    set$e(false);
    set_(true);
    setTimeout(() => set_(false), 1200);
  };
  const ft = N === "lost" || N === "won";
  React.useEffect(() => {
    if (ee) {
      It();
    }
  }, [ee]);
  const pt = (a, t) => {
    const r = t > 1 ? a / (t - 1) : 0;
    const s = 57;
    const f = Math.floor(255 - r * 60);
    const d = Math.floor(20 + r * 180);
    const x = Math.floor(30 + (1 - r) * 45);
    return `rgba(${s},${f},${d},0.${x})`;
  };
  const mt = (a, t) => {
    const r = t > 1 ? a / (t - 1) : 0;
    const s = Math.floor(255 - r * 80);
    const f = Math.floor(20 + r * 200);
    return `rgba(57,${s},${f},0.${Math.floor(50 + (1 - r) * 50)})`;
  };
  const gt = (a, t) => {
    const r = t > 1 ? a / (t - 1) : 0;
    const s = 1 - r;
    return `0 0 ${Math.floor(12 + s * 40)}px rgba(57,255,${Math.floor(20 + r * 120)},${0.5 + s * 0.7})`;
  };
  const ce = (type) =>
    ({
      shield: "#00d4ff",
      slow: "#ffd600",
      double: "#ff00aa",
      magnet: "#39ff14",
    })[type];
  const bt = j
    ? {
        shield: "ESCUDO",
        slow: "LENTO",
        double: "x2",
        magnet: "IMÁN",
      }[j.type]
    : null;
  const color = j
    ? {
        shield: "#00d4ff",
        slow: "#ffd600",
        double: "#ff00aa",
        magnet: "#39ff14",
      }[j.type]
    : null;
  const qe = j ? Math.max(0, Math.ceil((j.expiresAt - Date.now()) / 1000)) : 0;
  if (p === "select") {
    return (
      <StarfieldBackground>
        <div className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative">
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
          <div className="text-center mb-10 relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-72 h-72 rounded-full opacity-20 blur-3xl animate-pulse-slow"
                style={{
                  background: "radial-gradient(circle, rgba(57,255,20,.4), transparent 70%)",
                }}
              />
            </div>
            <h1
              className="text-4xl md:text-6xl font-black mb-3 relative"
              style={{
                textShadow:
                  "0 0 40px rgba(57,255,20,.4), 0 0 80px rgba(57,255,20,.2), 0 0 120px rgba(0,212,255,.15)",
              }}
            >
              <GitBranchIcon
                size={40}
                className="inline mr-3 mb-1 animate-pulse"
                style={{
                  filter: "drop-shadow(0 0 15px rgba(57,255,20,.6))",
                }}
              />{" "}
              Word Snake
            </h1>
            <p className="text-white/40 text-sm md:text-base font-medium">
              Selecciona un módulo para jugar / 选择模块开始游戏
            </p>
            {We && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold animate-shake"
                style={{
                  background: "rgba(255,68,68,.12)",
                  border: "1px solid rgba(255,68,68,.3)",
                  color: "#ff6b35",
                }}
              >
                {We}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => {
                playClick();
                setWe("");
                Ue(null);
              }}
              className="group rounded-2xl p-5 md:p-6 text-left transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(14,22,64,.7), rgba(5,8,27,.6))",
                border: "1px solid rgba(255,0,170,.35)",
                boxShadow: "0 0 30px rgba(255,0,170,.1), 0 10px 40px rgba(0,0,0,.3)",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(255,0,170,.05), transparent)",
                }}
              />
              <div
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-3 relative"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                  boxShadow: "0 0 25px rgba(255,0,170,.4), 0 0 50px rgba(255,0,170,.2)",
                }}
              >
                <LayersIcon size={24} className="text-white" />
              </div>
              <h3 className="text-white font-black text-base md:text-lg mb-1">Todos los módulos</h3>
              <p
                className="text-xs font-medium mb-1"
                style={{
                  color: "rgba(255,0,170,.8)",
                }}
              >
                所有模块
              </p>
              <p className="text-xs font-medium text-white/40">Mezcla todo el vocabulario</p>
            </button>
            {rt.map((a) => (
              <button
                key={a.id}
                onClick={() => {
                  playClick();
                  setWe("");
                  Ue(a.id);
                }}
                className="group rounded-2xl p-5 md:p-6 text-left transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(14,22,64,.7), rgba(5,8,27,.6))",
                  border: `1px solid ${a.color}50`,
                  boxShadow: `0 0 30px ${a.color}15, 0 10px 40px rgba(0,0,0,.3)`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${a.color}10, transparent)`,
                  }}
                />
                <div
                  className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-3 relative"
                  style={{
                    background: `linear-gradient(135deg, ${a.color}, ${a.color}88)`,
                    boxShadow: `0 0 25px ${a.color}40, 0 0 50px ${a.color}20`,
                  }}
                >
                  <BookOpenIcon size={24} className="text-white" />
                </div>
                <h3 className="text-white font-black text-base md:text-lg mb-1">{a.titulo}</h3>
                <p
                  className="text-xs font-medium mb-1"
                  style={{
                    color: `${a.color}cc`,
                  }}
                >
                  {a.tituloChino}
                </p>
                <p className="text-xs font-medium text-white/40">{a.vocabularioCount} palabras / 词</p>
              </button>
            ))}
          </div>
          <div className="fixed bottom-4 right-4 z-50 pointer-events-none hidden md:block">
            <div className="animate-float">
              <KeComponent expression="happy" size={80} />
            </div>
            <div className="mt-1 text-center">
              <div
                className="text-[10px] font-black px-2 py-0.5 rounded-full inline-block"
                style={{
                  background: "rgba(57,255,20,.15)",
                  border: "1px solid rgba(57,255,20,.25)",
                  color: "#39ff14",
                  boxShadow: "0 0 10px rgba(57,255,20,.15)",
                }}
              >
                ¡Vamos a jugar!
              </div>
            </div>
          </div>
        </div>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <div className="max-w-3xl mx-auto px-2 md:px-4 py-3 md:py-5 min-h-screen flex flex-col relative">
        <div className="flex items-center justify-between mb-2 md:mb-3 flex-wrap gap-2">
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
                setP("select");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 hover:shadow-lg"
              style={{
                background: "rgba(255,255,255,.08)",
                border: "1px solid rgba(255,255,255,.15)",
                color: "#fff",
                boxShadow: "0 0 15px rgba(255,255,255,.05)",
              }}
            >
              <LayersIcon size={12} /> Cambiar módulo / 切换模块
            </button>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 animate-pulse-glow animate-score-float-3d"
              style={{
                background: "rgba(57,255,20,.12)",
                border: "1px solid rgba(57,255,20,.25)",
                color: "#39ff14",
                boxShadow: "0 0 15px rgba(57,255,20,.25), 0 0 30px rgba(57,255,20,.15)",
              }}
            >
              <ZapIcon size={12} className="animate-zap" /> {he}
            </div>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(0,212,255,.12)",
                border: "1px solid rgba(0,212,255,.25)",
                color: "#00d4ff",
                boxShadow: "0 0 15px rgba(0,212,255,.2)",
              }}
            >
              {re}/{k.length}
            </div>
            {ye > 0 && (
              <div
                className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{
                  background: "rgba(255,214,0,.1)",
                  border: "1px solid rgba(255,214,0,.2)",
                  color: "#ffd600",
                  boxShadow: "0 0 10px rgba(255,214,0,.15)",
                }}
              >
                <TrophyIcon size={10} /> {ye}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mb-2 md:mb-3">
          <div
            className="px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5"
            style={{
              background: "rgba(57,255,20,.1)",
              border: "1px solid rgba(57,255,20,.25)",
              color: "#39ff14",
              boxShadow: "0 0 10px rgba(57,255,20,.15)",
            }}
          >
            <CrosshairIcon size={12} /> Nivel {je}
          </div>
          {j && qe > 0 && (
            <div
              className="px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 animate-pulse-glow"
              style={{
                background: `${color}18`,
                border: `1px solid ${color}40`,
                color,
                boxShadow: `0 0 15px ${color}30`,
              }}
            >
              {j.type === "shield" && <ShieldIcon size={12} />}
              {j.type === "slow" && <ClockIcon size={12} />}
              {j.type === "double" && <StarIcon size={12} />}
              {j.type === "magnet" && <MagnetIcon size={12} />}
              {bt} {qe}s
            </div>
          )}
          {oe > 1 && (
            <div
              className="px-3 py-1 rounded-full text-xs font-black flex items-center gap-1"
              style={{
                background: "rgba(255,0,170,.1)",
                border: "1px solid rgba(255,0,170,.25)",
                color: "#ff00aa",
                boxShadow: "0 0 10px rgba(255,0,170,.15)",
              }}
            >
              <ChevronRightIcon size={12} /> Racha {oe}
            </div>
          )}
        </div>
        <div className="text-center mb-2 md:mb-4">
          <h1
            className="text-2xl md:text-4xl font-black mb-2 md:mb-3 relative inline-block"
            style={{
              background: "linear-gradient(135deg,#39ff14,#00d4a0,#ffd600)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 25px rgba(57,255,20,.4))",
            }}
          >
            <SparklesIcon
              size={28}
              className="inline mr-2 mb-1 animate-pulse"
              style={{
                filter: "drop-shadow(0 0 10px rgba(57,255,20,.6))",
              }}
            />{" "}
            Word Snake
          </h1>
          {Ie && (
            <div
              className={`inline-flex items-center gap-3 md:gap-4 px-5 md:px-8 py-3 md:py-4 rounded-2xl transition-all duration-700 ${_ ? "scale-110" : "scale-100"}`}
              style={{
                background: "linear-gradient(180deg, rgba(14,22,64,.85), rgba(5,8,27,.7))",
                border: "1px solid rgba(57,255,20,.35)",
                boxShadow:
                  "0 0 40px rgba(57,255,20,.25), 0 0 80px rgba(57,255,20,.1), inset 0 1px 0 rgba(255,255,255,.05)",
                backdropFilter: "blur(14px)",
                transform: _ ? "scale(1.1) translateZ(30px)" : "scale(1) translateZ(0)",
              }}
            >
              <div
                className="text-xs font-bold uppercase tracking-wider"
                style={{
                  color: "rgba(207,216,255,.5)",
                }}
              >
                Pista / 提示
              </div>
              <div
                className="text-2xl md:text-4xl font-black"
                style={{
                  color: "#ffd600",
                  textShadow:
                    "0 0 20px rgba(255,214,0,.6), 0 0 40px rgba(255,214,0,.3), 0 0 60px rgba(255,214,0,.15)",
                }}
              >
                {Ie.chino}
              </div>
            </div>
          )}
        </div>
        <div className="text-center mb-2 md:mb-4">
          <div className="flex gap-1 md:gap-1.5 justify-center flex-wrap">
            {E.split("").map((a, t) => (
              <div
                key={t}
                className={`w-7 h-8 md:w-9 md:h-11 flex items-center justify-center text-sm md:text-lg font-black rounded-lg transition-all duration-300 ${t < w.length ? "animate-pop" : ""} ${t === w.length ? "animate-pulse-glow" : ""}`}
                style={{
                  background:
                    t < w.length
                      ? "linear-gradient(135deg, rgba(57,255,20,.25), rgba(0,212,160,.25))"
                      : t === w.length
                        ? "linear-gradient(135deg, rgba(255,214,0,.2), rgba(255,0,170,.1))"
                        : "rgba(255,255,255,.04)",
                  border:
                    t < w.length
                      ? "1px solid rgba(57,255,20,.5)"
                      : t === w.length
                        ? "1px solid rgba(255,214,0,.6)"
                        : "1px solid rgba(255,255,255,.08)",
                  color: t < w.length ? "#39ff14" : t === w.length ? "#ffd600" : "rgba(255,255,255,.2)",
                  boxShadow:
                    t === w.length
                      ? "0 0 20px rgba(255,214,0,.4), 0 0 40px rgba(255,214,0,.15), inset 0 0 10px rgba(255,214,0,.05)"
                      : t < w.length
                        ? "0 0 12px rgba(57,255,20,.3), 0 0 25px rgba(57,255,20,.1)"
                        : "none",
                  transform:
                    t === w.length && _ ? "translateZ(15px) scale(1.25)" : "translateZ(8px) scale(1)",
                  textShadow:
                    t === w.length
                      ? "0 0 15px rgba(255,214,0,1), 0 0 30px rgba(255,214,0,.6)"
                      : t < w.length
                        ? "0 0 12px rgba(57,255,20,.7)"
                        : "none",
                }}
              >
                {a}
              </div>
            ))}
          </div>
          <p className="text-xs mt-2 font-medium flex items-center justify-center gap-1">
            <span
              style={{
                color: "rgba(207,216,255,.4)",
              }}
            >
              Próxima letra / 下一个字母:
            </span>
            <span
              className="inline-block px-2 py-0.5 rounded-md font-black text-sm md:text-base animate-next-letter-bounce"
              style={{
                color: "#ffd600",
                background: "rgba(255,214,0,.1)",
                border: "1px solid rgba(255,214,0,.25)",
                boxShadow: "0 0 10px rgba(255,214,0,.2)",
                textShadow: "0 0 10px rgba(255,214,0,.5)",
              }}
            >
              {lt}
            </span>
          </p>
          {G > 1 && (
            <div
              className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black animate-pulse-glow"
              style={{
                background: "rgba(255,0,170,.12)",
                border: "1px solid rgba(255,0,170,.3)",
                color: "#ff00aa",
                boxShadow: "0 0 15px rgba(255,0,170,.2)",
              }}
            >
              <ZapIcon size={12} /> Combo x{G}!
            </div>
          )}
        </div>
        <div
          className="flex-1 flex items-center justify-center mb-2 md:mb-3 relative"
          style={{
            perspective: "1200px",
            perspectiveOrigin: "50% 40%",
          }}
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({
              length: 40,
            }).map((a, t) => (
              <div
                key={t}
                className="absolute rounded-full animate-bg-particle"
                style={{
                  left: `${(t * 37) % 100}%`,
                  top: `${(t * 23) % 100}%`,
                  width: `${2 + (t % 3)}px`,
                  height: `${2 + (t % 3)}px`,
                  background: ["#39ff14", "#00d4ff", "#ffd600", "#ff00aa", "#ffffff"][t % 5],
                  opacity: 0.2 + ((t * 7) % 5) * 0.1,
                  animationDelay: `${(t * 0.3) % 5}s`,
                  animationDuration: `${3 + (t % 4)}s`,
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-full max-w-md aspect-[5/4] rounded-3xl opacity-60 blur-3xl animate-pulse-slow"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(57,255,20,.25), rgba(0,212,255,.15), transparent 70%)",
              }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-full max-w-md aspect-[5/4] rounded-3xl opacity-50"
              style={{
                background: "linear-gradient(90deg, #39ff14, #00d4ff, #ffd600, #ff00aa, #39ff14)",
                backgroundSize: "400% 400%",
                animation: "borderGradientShift 6s ease infinite",
                filter: "blur(25px)",
              }}
            />
          </div>
          <div
            ref={DRef}
            className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${Pe ? "animate-shake-3d" : ""} ${ee ? "animate-death-fade" : ""} ${Xe ? "animate-word-glow" : ""}`}
            style={{
              background: "linear-gradient(180deg, rgba(14,22,64,.6), rgba(5,8,27,.5))",
              border: Xe ? "2px solid rgba(57,255,20,.9)" : "1px solid rgba(57,255,20,.5)",
              boxShadow: Xe
                ? "0 0 120px rgba(57,255,20,1), 0 0 200px rgba(0,212,255,.8), 0 0 280px rgba(255,214,0,.6), 0 20px 60px rgba(0,0,0,.5), inset 0 0 80px rgba(57,255,20,.2)"
                : Pe
                  ? "0 0 100px rgba(57,255,20,.8), 0 0 150px rgba(57,255,20,.4), 0 20px 60px rgba(0,0,0,.5), inset 0 0 60px rgba(57,255,20,.12)"
                  : "0 0 60px rgba(57,255,20,.4), 0 0 120px rgba(57,255,20,.2), 0 0 180px rgba(0,212,255,.1), 0 20px 60px rgba(0,0,0,.5), inset 0 0 50px rgba(57,255,20,.08)",
              transform: `rotateX(${_ ? 25 : 5}deg) rotateY(${_ ? -3 : 0}deg) scale(${_ ? 0.88 : 1})`,
              transformStyle: "preserve-3d",
              transition: "transform 0.8s cubic-bezier(.2,.9,.2,1), box-shadow 0.4s, border 0.4s",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(57,255,20,.06) 2px, rgba(57,255,20,.06) 4px)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(57,255,20,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,.03) 1px, transparent 1px)",
                backgroundSize: "100% 8.33%, 6.66% 100%",
                opacity: 0.3,
                animation: "neon-grid-lines 3s ease-in-out infinite",
              }}
            />
            {te && Date.now() - te.time < 400 && (
              <div
                className="absolute inset-0 pointer-events-none z-20 animate-wall-flash"
                style={{
                  background:
                    te.side === "left"
                      ? "linear-gradient(90deg, rgba(255,68,68,.3), transparent 30%)"
                      : te.side === "right"
                        ? "linear-gradient(270deg, rgba(255,68,68,.3), transparent 30%)"
                        : te.side === "top"
                          ? "linear-gradient(180deg, rgba(255,68,68,.3), transparent 30%)"
                          : "linear-gradient(0deg, rgba(255,68,68,.3), transparent 30%)",
                }}
              />
            )}
            {ie.length > 0 && (
              <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                {ie.map((a, key) => (
                  <div
                    key={key}
                    className="absolute rounded-full"
                    style={{
                      left: a.x,
                      top: a.y,
                      width: a.size,
                      height: a.size,
                      background: a.color,
                      opacity: a.life,
                      boxShadow: `0 0 ${a.size * 2}px ${a.color}`,
                    }}
                  />
                ))}
              </div>
            )}
            <div
              className="grid gap-[1px] md:gap-[2px] p-1.5 md:p-2 relative z-10 preserve-3d"
              style={{
                gridTemplateColumns: `repeat(${String(T)}, 1fr)`,
                gridTemplateRows: `repeat(${String(P)}, 1fr)`,
              }}
            >
              {Array.from({
                length: P,
              }).map((a, t) =>
                Array.from({
                  length: T,
                }).map((r, s) => {
                  const f = g.some((S) => S.x === s && S.y === t);
                  const d = g[g.length - 1]?.x === s && g[g.length - 1]?.y === t;
                  const x = F.find((S) => S.x === s && S.y === t);
                  const M = x && x.index === w.length;
                  const c = x && x.index < w.length;
                  const C = g.findIndex((S) => S.x === s && S.y === t);
                  const v = at.some((S) => S.x === s && S.y === t) && !f;
                  const i = R.find((S) => S.x === s && S.y === t);
                  const u = K.find((S) => S.x === s && S.y === t);
                  const z = x && !M && !c;
                  const A = i ? Math.sin(Date.now() / 400 + i.id) * 0.3 + 0.7 : 1;
                  return (
                    <div
                      key={`${s}-${t}`}
                      data-cell
                      data-x={s}
                      data-y={t}
                      className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-sm md:rounded-md flex items-center justify-center text-[10px] sm:text-xs font-black transition-all duration-150 relative preserve-3d ${d ? "animate-snake-head-float" : ""} ${M ? "animate-target-3d-rotate" : ""} ${z ? "animate-danger-pulse" : ""} ${i ? "animate-obstacle-3d-pulse" : ""} ${u ? "animate-powerup-3d-float" : ""}`}
                      style={{
                        background: d
                          ? "linear-gradient(135deg, rgba(57,255,20,.7), rgba(0,212,160,.7))"
                          : f
                            ? pt(C, g.length)
                            : v
                              ? "rgba(57,255,20,.08)"
                              : M
                                ? "linear-gradient(135deg, rgba(255,214,0,.55), rgba(255,0,170,.35))"
                                : c
                                  ? "linear-gradient(135deg, rgba(57,255,20,.15), rgba(0,212,160,.15))"
                                  : i
                                    ? `rgba(255,68,68,${0.15 * A})`
                                    : u
                                      ? `${ce(u.type)}15`
                                      : "rgba(255,255,255,.02)",
                        border: d
                          ? "1.5px solid rgba(57,255,20,.95)"
                          : f
                            ? `1px solid ${mt(C, g.length)}`
                            : v
                              ? "1px solid rgba(57,255,20,.15)"
                              : M
                                ? "1.5px solid rgba(255,214,0,.9)"
                                : c
                                  ? "1px solid rgba(57,255,20,.3)"
                                  : i
                                    ? `1.5px solid rgba(255,68,68,${0.5 + 0.3 * Math.sin(Date.now() / 300)})`
                                    : u
                                      ? `1.5px solid ${ce(u.type)}60`
                                      : z
                                        ? "1px solid rgba(255,68,68,.3)"
                                        : "1px solid rgba(255,255,255,.04)",
                        boxShadow: d
                          ? `0 0 40px rgba(57,255,20,1), 0 0 80px rgba(57,255,20,.7), 0 0 120px rgba(57,255,20,.4), 0 0 160px rgba(0,212,255,.3), inset 0 0 20px rgba(255,255,255,.3)${q ? ", 0 0 50px #00d4ff, 0 0 80px #00d4ff" : ""}`
                          : f
                            ? gt(C, g.length)
                            : v
                              ? "0 0 12px rgba(57,255,20,.25)"
                              : M
                                ? "0 0 40px rgba(255,214,0,1), 0 0 80px rgba(255,214,0,.7), 0 0 120px rgba(255,214,0,.4), 0 0 160px rgba(255,0,170,.3)"
                                : i
                                  ? "0 0 30px rgba(255,68,68,.8), 0 0 60px rgba(255,68,68,.4), 0 0 90px rgba(255,68,68,.2)"
                                  : u
                                    ? `0 0 20px ${ce(u.type)}50, 0 0 40px ${ce(u.type)}30`
                                    : "none",
                        color: M
                          ? "#ffd600"
                          : f
                            ? "#39ff14"
                            : c
                              ? "rgba(57,255,20,.4)"
                              : z
                                ? "rgba(255,68,68,.5)"
                                : i
                                  ? "#ff4444"
                                  : "transparent",
                        textShadow: M
                          ? "0 0 20px rgba(255,214,0,1), 0 0 40px rgba(255,214,0,.8), 0 0 60px rgba(255,0,170,.4)"
                          : d
                            ? "0 0 20px rgba(57,255,20,1), 0 0 40px rgba(57,255,20,.6)"
                            : f
                              ? "0 0 12px rgba(57,255,20,.7)"
                              : "none",
                        transform: d
                          ? "translateZ(30px) scale(1.25)"
                          : M
                            ? "translateZ(25px) scale(1.15)"
                            : v
                              ? "translateZ(5px) scale(0.85)"
                              : i
                                ? "translateZ(15px) scale(0.95)"
                                : u
                                  ? "translateZ(22px) scale(1)"
                                  : "scale(1)",
                      }}
                    >
                      {d && (
                        <>
                          <ZtComponent dir={dir} />
                          <DtComponent dir={dir} />
                          {q && (
                            <div
                              className="absolute -top-1 -left-1 w-3 h-3 rounded-full animate-shield-rotate"
                              style={{
                                background: "#00d4ff",
                                boxShadow: "0 0 8px #00d4ff",
                                zIndex: 20,
                              }}
                            />
                          )}
                        </>
                      )}
                      {x ? (
                        <span className={M ? "animate-letter-spin" : z ? "animate-danger-shake" : ""}>
                          {x.letter}
                        </span>
                      ) : i ? (
                        <SkullIcon
                          size={10}
                          className="animate-skull-bounce"
                          style={{
                            color: "#ff4444",
                            filter: "drop-shadow(0 0 4px rgba(255,68,68,.6))",
                          }}
                        />
                      ) : u ? (
                        <EtComponent type={u.type} />
                      ) : null}
                      {z && (
                        <div
                          className="absolute inset-0 rounded-sm md:rounded-md animate-danger-bg"
                          style={{
                            background: "rgba(255,68,68,.08)",
                            pointerEvents: "none",
                          }}
                        />
                      )}
                    </div>
                  );
                }),
              )}
            </div>
          </div>
          <div className="absolute top-2 right-2 md:top-4 md:right-4 z-20 hidden md:block">
            <div
              className="w-20 h-24 rounded-xl p-2 relative"
              style={{
                background: "rgba(5,8,27,.8)",
                border: "1px solid rgba(57,255,20,.2)",
                boxShadow: "0 0 20px rgba(57,255,20,.1)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                className="text-[8px] font-bold text-center mb-1"
                style={{
                  color: "rgba(255,255,255,.4)",
                }}
              >
                MAPA
              </div>
              <div
                className="grid gap-px"
                style={{
                  gridTemplateColumns: `repeat(${String(T)}, 1fr)`,
                  gridTemplateRows: `repeat(${String(P)}, 1fr)`,
                }}
              >
                {Array.from({
                  length: P * T,
                }).map((a, t) => {
                  const r = t % T;
                  const s = Math.floor(t / T);
                  const f = g.some((c) => c.x === r && c.y === s);
                  const d = g[g.length - 1]?.x === r && g[g.length - 1]?.y === s;
                  const x = F.find((c) => c.x === r && c.y === s && c.index === w.length);
                  const M = R.find((c) => c.x === r && c.y === s);
                  return (
                    <div
                      key={t}
                      className="w-1 h-1 rounded-[1px]"
                      style={{
                        background: d
                          ? "#39ff14"
                          : f
                            ? "rgba(57,255,20,.4)"
                            : x
                              ? "#ffd600"
                              : M
                                ? "#ff4444"
                                : "rgba(255,255,255,.06)",
                        boxShadow: d ? "0 0 2px #39ff14" : x ? "0 0 2px #ffd600" : "none",
                      }}
                    />
                  );
                })}
              </div>
              {(() => {
                const a = g[g.length - 1];
                const t = F.find((d) => d.index === w.length);
                if (!a || !t) {
                  return null;
                }
                const r = t.x - a.x;
                const s = t.y - a.y;
                const f = Math.atan2(s, r) * (180 / Math.PI);
                return (
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center animate-direction-pulse"
                      style={{
                        background: "rgba(255,214,0,.2)",
                        border: "1px solid rgba(255,214,0,.4)",
                        boxShadow: "0 0 8px rgba(255,214,0,.3)",
                      }}
                    >
                      <ChevronRightIcon
                        size={10}
                        className="text-[#ffd600]"
                        style={{
                          transform: `rotate(${f}deg)`,
                        }}
                      />
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-2 md:hidden">
          <div className="grid grid-cols-3 gap-2">
            <div />
            <button
              onClick={() =>
                setO((a) => {
                  if (a !== "down") {
                    return "up";
                  }
                  return a;
                })
              }
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white transition-all active:scale-90 active:shadow-lg"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,.1), rgba(255,255,255,.04))",
                border: "1px solid rgba(255,255,255,.15)",
                boxShadow: "0 0 15px rgba(255,255,255,.08), 0 4px 15px rgba(0,0,0,.3)",
              }}
            >
              <ArrowUpIcon size={22} />
            </button>
            <div />
            <button
              onClick={() =>
                setO((a) => {
                  if (a !== "right") {
                    return "left";
                  }
                  return a;
                })
              }
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white transition-all active:scale-90 active:shadow-lg"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,.1), rgba(255,255,255,.04))",
                border: "1px solid rgba(255,255,255,.15)",
                boxShadow: "0 0 15px rgba(255,255,255,.08), 0 4px 15px rgba(0,0,0,.3)",
              }}
            >
              <ArrowLeftIcon size={22} />
            </button>
            <button
              onClick={() =>
                setO((a) => {
                  if (a !== "up") {
                    return "down";
                  }
                  return a;
                })
              }
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white transition-all active:scale-90 active:shadow-lg"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,.1), rgba(255,255,255,.04))",
                border: "1px solid rgba(255,255,255,.15)",
                boxShadow: "0 0 15px rgba(255,255,255,.08), 0 4px 15px rgba(0,0,0,.3)",
              }}
            >
              <ArrowDownIcon size={22} />
            </button>
            <button
              onClick={() =>
                setO((a) => {
                  if (a !== "left") {
                    return "right";
                  }
                  return a;
                })
              }
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white transition-all active:scale-90 active:shadow-lg"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,.1), rgba(255,255,255,.04))",
                border: "1px solid rgba(255,255,255,.15)",
                boxShadow: "0 0 15px rgba(255,255,255,.08), 0 4px 15px rgba(0,0,0,.3)",
              }}
            >
              <ArrowRightIcon size={22} />
            </button>
          </div>
        </div>
        <div className="hidden md:flex justify-center mb-3">
          <div
            className="flex items-center gap-3 px-4 py-2 rounded-full text-xs font-medium"
            style={{
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.08)",
              color: "rgba(255,255,255,.3)",
            }}
          >
            <span className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 rounded bg-white/10 font-bold">WASD</span> o
            </span>
            <span className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 rounded bg-white/10 font-bold">←↑↓→</span> para mover
            </span>
            <span className="flex items-center gap-1">
              <EyeIcon size={12} /> Escudo = atraviesa paredes
            </span>
          </div>
        </div>
        <div className="fixed bottom-4 right-4 z-50 pointer-events-none hidden md:block">
          <div className="animate-float">
            <KeComponent expression={expression} size={84} />
          </div>
          <div className="mt-1 text-center">
            <div
              className="text-[10px] font-black px-2 py-0.5 rounded-full inline-block animate-mascot-bubble"
              style={{
                background: "rgba(57,255,20,.15)",
                border: "1px solid rgba(57,255,20,.25)",
                color: "#39ff14",
                boxShadow: "0 0 10px rgba(57,255,20,.15)",
              }}
            >
              {$e
                ? "¡Palabra completada!"
                : N === "lost"
                  ? "Oh no!"
                  : N === "won"
                    ? "¡Ganaste!"
                    : q
                      ? "¡Inmortal!"
                      : de
                        ? "¡Doble!"
                        : ee
                          ? "¡Ay!"
                          : G >= 5
                            ? "¡Increíble!"
                            : G >= 3
                              ? "¡Fantástico!"
                              : G >= 1
                                ? "¡Bien!"
                                : je > 2
                                  ? "¡Cuidado!"
                                  : "¡Vamos!"}
            </div>
          </div>
        </div>
        {$e && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.88)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div
              className="text-center p-6 md:p-8 rounded-3xl max-w-sm mx-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(14,22,64,.95), rgba(5,8,27,.8))",
                border: "1px solid rgba(57,255,20,.4)",
                boxShadow:
                  "0 0 80px rgba(57,255,20,.3), 0 0 120px rgba(57,255,20,.15), inset 0 0 40px rgba(57,255,20,.05)",
                animation: "overlay-3d-pop 0.7s cubic-bezier(.2,.9,.2,1)",
                transformStyle: "preserve-3d",
                perspective: "800px",
              }}
            >
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({
                  length: 30,
                }).map((a, t) => (
                  <div
                    key={t}
                    className="absolute w-1 h-1 rounded-full animate-particle-bg"
                    style={{
                      left: `${(t * 37) % 100}%`,
                      top: `${(t * 23) % 100}%`,
                      background: ["#39ff14", "#00d4ff", "#ffd600", "#ff00aa", "#ffffff"][t % 5],
                      animationDelay: `${(t * 0.2) % 3}s`,
                    }}
                  />
                ))}
              </div>
              <StarIcon
                size={56}
                className="mx-auto mb-4 animate-bounce-slow"
                style={{
                  color: "#39ff14",
                  filter: "drop-shadow(0 0 20px rgba(57,255,20,.6))",
                }}
              />
              <h2
                className="text-3xl md:text-4xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg,#39ff14,#00d4a0,#ffd600)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 15px rgba(57,255,20,.4))",
                }}
              >
                ¡Palabra completada!
              </h2>
              <p className="text-white/60 text-sm mb-6">¿Qué quieres hacer ahora?</p>
              <div className="flex flex-col gap-3 justify-center relative">
                <button
                  onClick={ct}
                  className="px-6 py-3 rounded-full text-white font-black text-sm transition-all hover:scale-105 hover:shadow-2xl active:scale-95"
                  style={{
                    background: "linear-gradient(135deg,#39ff14,#00d4a0)",
                    boxShadow: "0 0 30px rgba(57,255,20,.4), 0 0 60px rgba(57,255,20,.2)",
                    textShadow: "0 1px 2px rgba(0,0,0,.3)",
                  }}
                >
                  <ZapIcon size={14} className="inline mr-1" /> Siguiente palabra / 下一个词
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setP("select");
                    set$e(false);
                    setN("playing");
                  }}
                  className="px-4 py-3 rounded-full text-xs font-bold transition-all hover:scale-105 hover:shadow-lg active:scale-95"
                  style={{
                    background: "rgba(255,0,170,.08)",
                    border: "1px solid rgba(255,0,170,.25)",
                    color: "#ff00aa",
                    boxShadow: "0 0 15px rgba(255,0,170,.1)",
                  }}
                >
                  <LayersIcon size={14} className="inline mr-1" /> Otro módulo / 其他模块
                </button>
                <Link
                  to="/juegos"
                  onClick={() => playClick()}
                  className="px-4 py-3 rounded-full text-xs font-bold transition-all hover:scale-105 hover:shadow-lg active:scale-95 inline-flex items-center justify-center gap-1"
                  style={{
                    background: "rgba(255,255,255,.08)",
                    border: "1px solid rgba(255,255,255,.15)",
                    color: "#fff",
                    boxShadow: "0 0 15px rgba(255,255,255,.05)",
                  }}
                >
                  <ArrowLeftIcon size={14} /> Volver al hub / 返回中心
                </Link>
              </div>
            </div>
          </div>
        )}
        {ft && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.92)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div
              className="text-center p-6 md:p-8 rounded-3xl max-w-sm mx-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(14,22,64,.9), rgba(5,8,27,.7))",
                border: N === "won" ? "1px solid rgba(57,255,20,.4)" : "1px solid rgba(255,68,68,.3)",
                boxShadow:
                  N === "won"
                    ? "0 0 80px rgba(57,255,20,.3), 0 0 120px rgba(57,255,20,.15)"
                    : "0 0 80px rgba(255,68,68,.2), 0 0 120px rgba(255,68,68,.1)",
                animation: "overlay-3d-pop 0.7s cubic-bezier(.2,.9,.2,1)",
                transformStyle: "preserve-3d",
                perspective: "800px",
              }}
            >
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({
                  length: 25,
                }).map((a, t) => (
                  <div
                    key={t}
                    className="absolute w-1 h-1 rounded-full animate-particle-bg"
                    style={{
                      left: `${(t * 37) % 100}%`,
                      top: `${(t * 23) % 100}%`,
                      background: ["#39ff14", "#00d4ff", "#ffd600", "#ff00aa", "#ffffff"][t % 5],
                      animationDelay: `${(t * 0.2) % 2}s`,
                    }}
                  />
                ))}
              </div>
              {N === "won" ? (
                <TrophyIcon
                  size={56}
                  className="mx-auto mb-4 animate-bounce-slow"
                  style={{
                    color: "#39ff14",
                    filter: "drop-shadow(0 0 20px rgba(57,255,20,.6))",
                  }}
                />
              ) : (
                <div
                  className="mx-auto mb-4 w-14 h-14 rounded-full flex items-center justify-center animate-pulse-glow"
                  style={{
                    background: "rgba(255,68,68,.15)",
                    border: "1px solid rgba(255,68,68,.3)",
                    boxShadow: "0 0 30px rgba(255,68,68,.3)",
                  }}
                >
                  <HeartIcon
                    size={28}
                    style={{
                      color: "#ff4444",
                    }}
                  />
                </div>
              )}
              <h2
                className="text-3xl md:text-4xl font-black mb-2"
                style={{
                  background:
                    N === "won"
                      ? "linear-gradient(135deg,#39ff14,#00d4a0,#ffd600)"
                      : "linear-gradient(135deg,#ff4444,#ff6b35)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter:
                    N === "won"
                      ? "drop-shadow(0 0 15px rgba(57,255,20,.4))"
                      : "drop-shadow(0 0 15px rgba(255,68,68,.3))",
                }}
              >
                {N === "won" ? "¡Completado!" : "Game Over"}
              </h2>
              <p className="text-white/50 text-sm mb-5">{N === "won" ? "完成！" : "游戏结束"}</p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(57,255,20,.12)",
                    border: "1px solid rgba(57,255,20,.2)",
                    boxShadow: "0 0 20px rgba(57,255,20,.1)",
                  }}
                >
                  <ZapIcon
                    size={18}
                    className="mx-auto mb-1"
                    style={{
                      color: "#39ff14",
                      filter: "drop-shadow(0 0 5px rgba(57,255,20,.5))",
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
                    className="text-xl font-black"
                    style={{
                      color: "#39ff14",
                      textShadow: "0 0 10px rgba(57,255,20,.5)",
                    }}
                  >
                    {he}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(0,212,255,.12)",
                    border: "1px solid rgba(0,212,255,.2)",
                    boxShadow: "0 0 20px rgba(0,212,255,.1)",
                  }}
                >
                  <GitBranchIcon
                    size={18}
                    className="mx-auto mb-1"
                    style={{
                      color: "#00d4ff",
                      filter: "drop-shadow(0 0 5px rgba(0,212,255,.5))",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Palabras
                  </p>
                  <p
                    className="text-xl font-black"
                    style={{
                      color: "#00d4ff",
                      textShadow: "0 0 10px rgba(0,212,255,.5)",
                    }}
                  >
                    {re}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(255,0,170,.12)",
                    border: "1px solid rgba(255,0,170,.2)",
                    boxShadow: "0 0 20px rgba(255,0,170,.1)",
                  }}
                >
                  <StarIcon
                    size={18}
                    className="mx-auto mb-1"
                    style={{
                      color: "#ff00aa",
                      filter: "drop-shadow(0 0 5px rgba(255,0,170,.5))",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Nivel
                  </p>
                  <p
                    className="text-xl font-black"
                    style={{
                      color: "#ff00aa",
                      textShadow: "0 0 10px rgba(255,0,170,.5)",
                    }}
                  >
                    {je}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(255,214,0,.12)",
                    border: "1px solid rgba(255,214,0,.2)",
                    boxShadow: "0 0 20px rgba(255,214,0,.1)",
                  }}
                >
                  <TrophyIcon
                    size={18}
                    className="mx-auto mb-1"
                    style={{
                      color: "#ffd600",
                      filter: "drop-shadow(0 0 5px rgba(255,214,0,.5))",
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
                    className="text-xl font-black"
                    style={{
                      color: "#ffd600",
                      textShadow: "0 0 10px rgba(255,214,0,.5)",
                    }}
                  >
                    {ye}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-center relative">
                <button
                  onClick={xt}
                  className="px-6 py-3 rounded-full text-white font-black text-sm transition-all hover:scale-105 hover:shadow-2xl active:scale-95"
                  style={{
                    background: "linear-gradient(135deg,#39ff14,#00d4a0)",
                    boxShadow: "0 0 30px rgba(57,255,20,.4), 0 0 60px rgba(57,255,20,.2)",
                    textShadow: "0 1px 2px rgba(0,0,0,.3)",
                  }}
                >
                  <RotateCcwIcon size={14} className="inline mr-1" /> Reintentar / 重试
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setP("select");
                  }}
                  className="px-4 py-3 rounded-full text-xs font-bold transition-all hover:scale-105 hover:shadow-lg active:scale-95"
                  style={{
                    background: "rgba(255,255,255,.08)",
                    border: "1px solid rgba(255,255,255,.15)",
                    color: "#fff",
                    boxShadow: "0 0 15px rgba(255,255,255,.05)",
                  }}
                >
                  <LayersIcon size={14} className="inline mr-1" /> Módulos
                </button>
              </div>
              <div className="mt-4">
                <P_1 currentGameId="word-snake" />
              </div>
            </div>
          </div>
        )}
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes overlayPop { 0%{transform:scale(0.7) rotateX(15deg);opacity:0} 100%{transform:scale(1) rotateX(5deg);opacity:1} }
        @keyframes float { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-12px) } }
        @keyframes head-pulse { 0%, 100% { transform: scale(1.22) } 50% { transform: scale(1.35) } }
        @keyframes target-float { 0%, 100% { transform: scale(1.15) translateY(0) rotate(0deg) } 25% { transform: scale(1.2) translateY(-3px) rotate(3deg) } 75% { transform: scale(1.2) translateY(-2px) rotate(-3deg) } }
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 15px rgba(57,255,20,.2) } 50% { box-shadow: 0 0 30px rgba(57,255,20,.4) } }
        @keyframes zap { 0%, 100% { transform: scale(1) } 50% { transform: scale(1.3) } }
        @keyframes pop { 0% { transform: scale(1) } 50% { transform: scale(1.3) } 100% { transform: scale(1) } }
        @keyframes shake { 0%, 100% { transform: translateX(0) } 10%, 30%, 50%, 70%, 90% { transform: translateX(-3px) } 20%, 40%, 60%, 80% { transform: translateX(3px) } }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-12px) } }
        @keyframes particle-bg { 0% { transform: translateY(0) scale(1); opacity: 0 } 50% { opacity: 1 } 100% { transform: translateY(-40px) scale(0); opacity: 0 } }
        @keyframes bg-particle { 0% { transform: translateY(0) translateX(0) scale(1); opacity: 0 } 20% { opacity: 1 } 80% { opacity: 0.5 } 100% { transform: translateY(-60px) translateX(20px) scale(0); opacity: 0 } }
        @keyframes sparkle-1 { 0%, 100% { opacity: 0.4; transform: scale(1) } 50% { opacity: 1; transform: scale(1.5) } }
        @keyframes sparkle-2 { 0%, 100% { opacity: 1; transform: scale(1.2) } 50% { opacity: 0.4; transform: scale(0.8) } }
        @keyframes sparkle-3 { 0%, 100% { opacity: 0.6; transform: scale(0.9) } 50% { opacity: 1; transform: scale(1.4) } }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.3 } 50% { opacity: 0.5 } }
        @keyframes grid-shake { 0%, 100% { transform: rotateX(5deg) } 10% { transform: rotateX(5deg) translateX(-4px) } 20% { transform: rotateX(5deg) translateX(4px) } 30% { transform: rotateX(5deg) translateX(-3px) } 40% { transform: rotateX(5deg) translateX(3px) } 50% { transform: rotateX(5deg) translateX(-2px) } 60% { transform: rotateX(5deg) translateX(2px) } 70% { transform: rotateX(5deg) translateX(-1px) } 80% { transform: rotateX(5deg) translateX(1px) } }
        @keyframes death-fade { 0% { filter: brightness(1) } 20% { filter: brightness(2) sepia(1) hue-rotate(-50deg) saturate(5) } 100% { filter: brightness(0.3) sepia(1) hue-rotate(-50deg) saturate(3) } }
        @keyframes wall-flash { 0% { opacity: 0.6 } 100% { opacity: 0 } }
        @keyframes letter-spin { 0% { transform: rotateY(0deg) } 100% { transform: rotateY(360deg) } }
        @keyframes danger-pulse { 0%, 100% { transform: scale(1) } 50% { transform: scale(1.05) } }
        @keyframes danger-shake { 0%, 100% { transform: translateX(0) } 25% { transform: translateX(-1px) } 75% { transform: translateX(1px) } }
        @keyframes danger-bg { 0%, 100% { opacity: 0.05 } 50% { opacity: 0.12 } }
        @keyframes obstacle-pulse { 0%, 100% { transform: scale(0.95) } 50% { transform: scale(1.05) } }
        @keyframes skull-bounce { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-1px) } }
        @keyframes powerup-pulse { 0%, 100% { transform: scale(1) } 50% { transform: scale(1.2) } }
        @keyframes tongue-flick { 0%, 90%, 100% { opacity: 0 } 45% { opacity: 1 } }
        @keyframes shield-rotate { 0% { transform: rotate(0deg) scale(1) } 50% { transform: rotate(180deg) scale(1.2) } 100% { transform: rotate(360deg) scale(1) } }
        @keyframes next-letter-bounce { 0%, 100% { transform: scale(1) } 50% { transform: scale(1.15) } }
        @keyframes direction-pulse { 0%, 100% { box-shadow: 0 0 4px rgba(255,214,0,.3) } 50% { box-shadow: 0 0 12px rgba(255,214,0,.5) } }
        @keyframes mascot-bubble { 0%, 100% { transform: scale(1) } 50% { transform: scale(1.05) } }
        @keyframes sweat { 0% { transform: translateY(0); opacity: 0.7 } 100% { transform: translateY(8px); opacity: 0 } }
        @keyframes borderGradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-head-pulse { animation: head-pulse 0.8s ease-in-out infinite; }
        .animate-target-float { animation: target-float 2s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-zap { animation: zap 0.8s ease-in-out infinite; }
        .animate-pop { animation: pop 0.3s ease-out; }
        .animate-shake { animation: shake 0.4s ease-in-out; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-particle-bg { animation: particle-bg 3s ease-in-out infinite; }
        .animate-bg-particle { animation: bg-particle 4s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-grid-shake { animation: grid-shake 0.5s ease-in-out; }
        .animate-death-fade { animation: death-fade 1.2s ease-out forwards; }
        .animate-wall-flash { animation: wall-flash 0.4s ease-out forwards; }
        .animate-letter-spin { animation: letter-spin 3s linear infinite; }
        .animate-danger-pulse { animation: danger-pulse 1.5s ease-in-out infinite; }
        .animate-danger-shake { animation: danger-shake 0.5s ease-in-out infinite; }
        .animate-obstacle-pulse { animation: obstacle-pulse 1.5s ease-in-out infinite; }
        .animate-skull-bounce { animation: skull-bounce 0.8s ease-in-out infinite; }
        .animate-powerup-pulse { animation: powerup-pulse 1.2s ease-in-out infinite; }
        .animate-tongue-flick { animation: tongue-flick 3s ease-in-out infinite; }
        .animate-shield-rotate { animation: shield-rotate 2s linear infinite; }
        .animate-next-letter-bounce { animation: next-letter-bounce 1.5s ease-in-out infinite; }
        .animate-direction-pulse { animation: direction-pulse 1.5s ease-in-out infinite; }
        .animate-mascot-bubble { animation: mascot-bubble 2s ease-in-out infinite; }
        .animate-sweat { animation: sweat 1.5s ease-in infinite; }
        .mascot-svg .sparkle-1 { animation: sparkle-1 2s ease-in-out infinite; }
        .mascot-svg .sparkle-2 { animation: sparkle-2 2s ease-in-out infinite 0.5s; }
        .mascot-svg .sparkle-3 { animation: sparkle-3 2s ease-in-out infinite 1s; }
        @keyframes snake-head-float { 0%, 100% { transform: translateZ(30px) scale(1.25) } 50% { transform: translateZ(35px) scale(1.35) } }
        @keyframes target-3d-rotate { 0% { transform: translateZ(25px) rotateY(0deg) scale(1.15) } 25% { transform: translateZ(28px) rotateY(90deg) scale(1.2) } 50% { transform: translateZ(25px) rotateY(180deg) scale(1.15) } 75% { transform: translateZ(28px) rotateY(270deg) scale(1.2) } 100% { transform: translateZ(25px) rotateY(360deg) scale(1.15) } }
        @keyframes score-float-3d { 0%, 100% { transform: translateZ(15px) translateY(0) } 50% { transform: translateZ(20px) translateY(-3px) } }
        @keyframes obstacle-3d-pulse { 0%, 100% { transform: translateZ(15px) scale(0.95) } 50% { transform: translateZ(20px) scale(1.05) } }
        @keyframes powerup-3d-float { 0%, 100% { transform: translateZ(22px) scale(1) } 50% { transform: translateZ(28px) scale(1.25) } }
        @keyframes overlay-3d-pop { 0% { transform: scale(0.7) rotateX(20deg) translateZ(-100px); opacity: 0 } 60% { transform: scale(1.05) rotateX(8deg) translateZ(50px); opacity: 1 } 100% { transform: scale(1) rotateX(8deg) translateZ(0); opacity: 1 } }
        @keyframes head-eyes-glow { 0%, 100% { filter: drop-shadow(0 0 6px rgba(255,255,255,0.9)) } 50% { filter: drop-shadow(0 0 12px rgba(57,255,20,1)) drop-shadow(0 0 20px rgba(0,212,255,0.8)) } }
        @keyframes shake-3d { 0%, 100% { transform: rotateX(5deg) translateX(0) translateZ(0) } 10% { transform: rotateX(5deg) translateX(-6px) translateZ(5px) } 20% { transform: rotateX(5deg) translateX(6px) translateZ(-3px) } 30% { transform: rotateX(5deg) translateX(-4px) translateZ(4px) } 40% { transform: rotateX(5deg) translateX(4px) translateZ(-2px) } 50% { transform: rotateX(5deg) translateX(-2px) translateZ(3px) } 60% { transform: rotateX(5deg) translateX(2px) translateZ(-2px) } 70% { transform: rotateX(5deg) translateX(-1px) translateZ(1px) } 80% { transform: rotateX(5deg) translateX(1px) translateZ(-1px) } 90% { transform: rotateX(5deg) translateX(0) translateZ(0) } }
        @keyframes letter-glow-pulse { 0%, 100% { text-shadow: 0 0 15px rgba(255,214,0,.9), 0 0 30px rgba(255,214,0,.6) } 50% { text-shadow: 0 0 25px rgba(255,214,0,1), 0 0 50px rgba(255,214,0,.8), 0 0 80px rgba(255,0,170,.4) } }
        @keyframes neon-grid-lines { 0%, 100% { opacity: 0.2 } 50% { opacity: 0.45 } }
        @keyframes trail-3d-glow { 0% { opacity: 0.5; transform: translateZ(8px) scale(0.9) } 100% { opacity: 0; transform: translateZ(0) scale(0.5) } }
        .animate-snake-head-float { animation: snake-head-float 0.8s ease-in-out infinite; }
        .animate-target-3d-rotate { animation: target-3d-rotate 3s linear infinite; transform-style: preserve-3d; }
        .animate-score-float-3d { animation: score-float-3d 2s ease-in-out infinite; transform-style: preserve-3d; }
        .animate-obstacle-3d-pulse { animation: obstacle-3d-pulse 1.5s ease-in-out infinite; transform-style: preserve-3d; }
        .animate-powerup-3d-float { animation: powerup-3d-float 1.2s ease-in-out infinite; transform-style: preserve-3d; }
        .animate-overlay-3d-pop { animation: overlay-3d-pop 0.7s cubic-bezier(.2,.9,.2,1) forwards; transform-style: preserve-3d; }
        .animate-head-eyes-glow { animation: head-eyes-glow 1.5s ease-in-out infinite; }
        .animate-shake-3d { animation: shake-3d 0.5s ease-in-out; }
        .animate-letter-glow-pulse { animation: letter-glow-pulse 1.5s ease-in-out infinite; }
        .animate-trail-3d-glow { animation: trail-3d-glow 0.8s ease-out forwards; }
        .preserve-3d { transform-style: preserve-3d; }
        .perspective-1000 { perspective: 1000px; }
        .animate-word-glow { animation: wordGlow 1.5s ease-in-out infinite; }
        @keyframes wordGlow { 0%,100% { box-shadow: 0 0 100px rgba(57,255,20,.9), 0 0 180px rgba(0,212,255,.6), 0 0 250px rgba(255,214,0,.4), 0 20px 60px rgba(0,0,0,.5), inset 0 0 60px rgba(57,255,20,.15) } 50% { box-shadow: 0 0 140px rgba(57,255,20,1), 0 0 220px rgba(0,212,255,.8), 0 0 300px rgba(255,214,0,.6), 0 20px 60px rgba(0,0,0,.5), inset 0 0 80px rgba(57,255,20,.25) } }
      `,
        }}
      />
    </StarfieldBackground>
  );
}
export { KtComponent as default };
