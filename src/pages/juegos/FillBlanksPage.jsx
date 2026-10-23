import {
  HeartIcon,
  ZapIcon,
  LightbulbIcon,
  TrophyIcon,
  BookOpenIcon,
  ArrowLeftIcon,
  PenToolIcon,
  LayersIcon,
  RotateCcwIcon,
  KeyboardIcon,
  FeatherIcon,
  ScrollIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { g as g_1, b as b_1, c as c_1 } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
function Ae(o) {
  const a = [...o];
  for (let t = a.length - 1; t > 0; t--) {
    const c = Math.floor(Math.random() * (t + 1));
    [a[t], a[c]] = [a[c], a[t]];
  }
  return a;
}
function ae(o = 80) {
  const a = ["#46ff9a", "#39ff14", "#00d4ff", "#ffd600", "#ff00aa", "#ff6b35", "#b829dd", "#00ff88"];
  const t = ["50%", "0%", "50% 0 50% 50%", "0 50% 50% 50%"];
  for (let c = 0; c < o; c++) {
    const l = document.createElement("div");
    const s = a[c % a.length];
    const p = t[c % t.length];
    const f = 6 + Math.random() * 10;
    l.style.cssText = `position:fixed;left:50%;top:50%;width:${f}px;height:${f}px;border-radius:${p};background:${s};pointer-events:none;z-index:9999;box-shadow:0 0 10px ${s};`;
    document.body.appendChild(l);
    const m = (Math.PI * 2 * c) / o + (Math.random() - 0.5) * 0.5;
    const h = 4 + Math.random() * 16;
    let g = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let u = 1;
    let k = 0;
    let d = (Math.random() - 0.5) * 20;
    const w = Math.cos(m) * h;
    let r = Math.sin(m) * h - 6;
    const j = 0.25;
    const N = () => {
      g += w;
      y += r;
      r += j;
      k += d;
      u -= 0.008;
      l.style.left = `${g}px`;
      l.style.top = `${y}px`;
      l.style.opacity = String(u);
      l.style.transform = `rotate(${k}deg)`;
      if (u > 0) {
        requestAnimationFrame(N);
      } else {
        l.remove();
      }
    };
    requestAnimationFrame(N);
  }
}
function Le(o) {
  const a = [];
  for (const t of o) {
    if (!t.espanol || !t.ejemplo) {
      continue;
    }
    const blank = t.espanol
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^A-ZÑ]/g, "")
      .trim();
    if (blank.length < 2 || blank.length > 12) {
      continue;
    }
    const l = t.ejemplo.toUpperCase();
    const s = [t.espanol.toUpperCase(), blank];
    let p = false;
    for (const f of s) {
      if (l.includes(f)) {
        const m = l.indexOf(f);
        const h = `${t.ejemplo.slice(0, m)}_____${t.ejemplo.slice(m + f.length)}`;
        a.push({
          sentence: h,
          blank,
          hint: t.chino,
          example: t.ejemplo,
        });
        p = true;
        break;
      }
    }
    if (!p) {
      const f = `Escribe la palabra: _____ (${t.chino})`;
      a.push({
        sentence: f,
        blank,
        hint: t.chino,
        example: t.ejemplo,
      });
    }
  }
  return a;
}
const Fe = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];
const Xe = ["Á", "É", "Í", "Ó", "Ú", "Ü"];
function TeComponent({ expression }) {
  const a = React.useMemo(() => {
    switch (expression) {
      case "happy":
        return {
          eyeY: 38,
          eyeType: "happy",
          mouth: "happy",
          cheek: true,
          blush: 0.4,
          bounce: true,
        };
      case "sad":
        return {
          eyeY: 42,
          eyeType: "sad",
          mouth: "sad",
          cheek: false,
          blush: 0,
          bounce: false,
        };
      case "excited":
        return {
          eyeY: 34,
          eyeType: "excited",
          mouth: "open",
          cheek: true,
          blush: 0.6,
          bounce: true,
        };
      case "celebrating":
        return {
          eyeY: 32,
          eyeType: "star",
          mouth: "open",
          cheek: true,
          blush: 0.7,
          bounce: true,
        };
      default:
        return {
          eyeY: 38,
          eyeType: "neutral",
          mouth: "neutral",
          cheek: false,
          blush: 0.1,
          bounce: false,
        };
    }
  }, [expression]);
  const TComponent = () => {
    const a_eyeY = a.eyeY;
    if (a.eyeType === "happy") {
      return (
        <>
          <path
            d={`M28,${a_eyeY} Q34,${a_eyeY - 6} 40,${a_eyeY}`}
            stroke="#5a3a1a"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={`M60,${a_eyeY} Q66,${a_eyeY - 6} 72,${a_eyeY}`}
            stroke="#5a3a1a"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </>
      );
    }
    if (a.eyeType === "sad") {
      return (
        <>
          <path
            d={`M28,${a_eyeY - 4} Q34,${a_eyeY} 40,${a_eyeY - 4}`}
            stroke="#5a3a1a"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={`M60,${a_eyeY - 4} Q66,${a_eyeY} 72,${a_eyeY - 4}`}
            stroke="#5a3a1a"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="34" cy={a_eyeY + 6} r="2.5" fill="#5a3a1a" opacity="0.6" />
          <circle cx="66" cy={a_eyeY + 6} r="2.5" fill="#5a3a1a" opacity="0.6" />
        </>
      );
    }
    if (a.eyeType === "excited") {
      return (
        <>
          <ellipse cx="34" cy={a_eyeY} rx="7" ry="9" fill="#5a3a1a" />
          <ellipse cx="66" cy={a_eyeY} rx="7" ry="9" fill="#5a3a1a" />
          <circle cx="36" cy={a_eyeY - 3} r="3" fill="#fff" />
          <circle cx="68" cy={a_eyeY - 3} r="3" fill="#fff" />
        </>
      );
    }
    if (a.eyeType === "star") {
      return (
        <>
          <polygon
            points="34,28 36,34 42,34 37,38 39,44 34,40 29,44 31,38 26,34 32,34"
            fill="#ffd600"
            stroke="#5a3a1a"
            strokeWidth="1"
          />
          <polygon
            points="66,28 68,34 74,34 69,38 71,44 66,40 61,44 63,38 58,34 64,34"
            fill="#ffd600"
            stroke="#5a3a1a"
            strokeWidth="1"
          />
        </>
      );
    }
    return (
      <>
        <ellipse cx="34" cy={a_eyeY} rx="6" ry="7" fill="#5a3a1a" />
        <ellipse cx="66" cy={a_eyeY} rx="6" ry="7" fill="#5a3a1a" />
        <circle cx="36" cy={a_eyeY - 2} r="2.5" fill="#fff" />
        <circle cx="68" cy={a_eyeY - 2} r="2.5" fill="#fff" />
      </>
    );
  };
  const CComponent = () => {
    if (a.mouth === "happy") {
      return (
        <path d="M38,55 Q50,65 62,55" stroke="#5a3a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      );
    }
    if (a.mouth === "sad") {
      return (
        <path d="M38,62 Q50,52 62,62" stroke="#5a3a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      );
    }
    if (a.mouth === "open") {
      return <ellipse cx="50" cy="58" rx="8" ry="6" fill="#ff6b6b" stroke="#5a3a1a" strokeWidth="2" />;
    }
    return (
      <path d="M44,58 Q50,62 56,58" stroke="#5a3a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    );
  };
  const l = a.bounce ? "mascot-bounce" : "mascot-float";
  return (
    <div
      className={`fixed bottom-4 right-4 z-50 pointer-events-none ${l}`}
      style={{
        width: 120,
        height: 120,
      }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
        <defs>
          <radialGradient id="mascotBody" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fff8e7" />
            <stop offset="100%" stopColor="#f5e6c8" />
          </radialGradient>
          <radialGradient id="mascotEar" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffd1dc" />
            <stop offset="100%" stopColor="#ffb7c5" />
          </radialGradient>
        </defs>
        <ellipse cx="20" cy="22" rx="14" ry="10" fill="url(#mascotEar)" transform="rotate(-25 20 22)" />
        <ellipse cx="80" cy="22" rx="14" ry="10" fill="url(#mascotEar)" transform="rotate(25 80 22)" />
        <circle cx="50" cy="50" r="38" fill="url(#mascotBody)" stroke="#e8d5a3" strokeWidth="2" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        {TComponent()}
        {CComponent()}
        {a.cheek && (
          <>
            <ellipse cx="24" cy="52" rx="7" ry="4" fill="#ff9eb5" opacity={a.blush} />
            <ellipse cx="76" cy="52" rx="7" ry="4" fill="#ff9eb5" opacity={a.blush} />
          </>
        )}
        <circle cx="30" cy="18" r="3" fill="#fff" opacity="0.6" />
        <circle cx="34" cy="22" r="1.5" fill="#fff" opacity="0.4" />
      </svg>
    </div>
  );
}
function TComponent() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({
        length: 18,
      }).map((o, a) => {
        const t = 4 + Math.random() * 12;
        const c = Math.random() * 100;
        const l = Math.random() * 100;
        const s = 12 + Math.random() * 20;
        const p = Math.random() * 10;
        const f = 8 + Math.random() * 12;
        const background = a % 2 === 0 ? "#46ff9a" : "#00d4ff";
        return (
          <div
            key={`ink-${a}`}
            className="absolute rounded-full opacity-20"
            style={{
              left: `${c}%`,
              top: `${l}%`,
              width: `${t}px`,
              height: `${t}px`,
              background,
              boxShadow: `0 0 ${f}px ${background}, 0 0 ${f * 2}px ${background}`,
              animation: `inkFloat ${s}s linear infinite`,
              animationDelay: `${p}s`,
            }}
          />
        );
      })}
    </div>
  );
}
function Re1Component() {
  const o = [
    {
      icon: "HOLA",
      color: "#46ff9a",
      x: 8,
      delay: 0,
    },
    {
      icon: "AMOR",
      color: "#ff00aa",
      x: 22,
      delay: 2,
    },
    {
      icon: "CASA",
      color: "#ffd600",
      x: 35,
      delay: 4,
    },
    {
      icon: "AGUA",
      color: "#00d4ff",
      x: 48,
      delay: 1,
    },
    {
      icon: "LUZ",
      color: "#39ff14",
      x: 62,
      delay: 3,
    },
    {
      icon: "FLOR",
      color: "#ff6b35",
      x: 75,
      delay: 5,
    },
    {
      icon: "PAZ",
      color: "#b829dd",
      x: 88,
      delay: 2.5,
    },
    {
      icon: "SOL",
      color: "#46ff9a",
      x: 15,
      delay: 6,
    },
    {
      icon: "VIDA",
      color: "#00d4ff",
      x: 55,
      delay: 7,
    },
    {
      icon: "LIBRO",
      color: "#ffd600",
      x: 82,
      delay: 4.5,
    },
    {
      icon: "PLUMA",
      color: "#ff00aa",
      x: 42,
      delay: 8,
    },
    {
      icon: "TINTA",
      color: "#39ff14",
      x: 68,
      delay: 1.5,
    },
  ];
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {o.map((a, t) => {
        const c = -10 + Math.random() * 20;
        const l = 18 + Math.random() * 15;
        return (
          <div
            key={`book-${t}`}
            className="absolute font-black text-xs opacity-[0.08] whitespace-nowrap"
            style={{
              left: `${a.x}%`,
              top: `${c}%`,
              color: a.color,
              textShadow: `0 0 20px ${a.color}, 0 0 40px ${a.color}`,
              animation: `floatBook ${l}s linear infinite`,
              animationDelay: `${a.delay}s`,
            }}
          >
            {a.icon}
          </div>
        );
      })}
    </div>
  );
}
function ReComponent({ m: m_1, onClick }) {
  const [t, setT] = React.useState({
    x: 0,
    y: 0,
  });
  const [l, setL] = React.useState(false);
  const pRef = React.useRef(null);
  const { playClick } = useSound();
  const m = (y) => {
    if (!pRef.current) {
      return;
    }
    const u = pRef.current.getBoundingClientRect();
    const k = (y.clientX - u.left) / u.width;
    const d = (y.clientY - u.top) / u.height;
    setT({
      x: (d - 0.5) * -20,
      y: (k - 0.5) * 20,
    });
  };
  const h = () => {
    setT({
      x: 0,
      y: 0,
    });
    setL(false);
  };
  const onMouseEnter = () => setL(true);
  return (
    <button
      ref={pRef}
      onClick={() => {
        playClick();
        onClick();
      }}
      onMouseMove={m}
      onMouseLeave={h}
      onMouseEnter={onMouseEnter}
      className="group rounded-xl p-5 text-left transition-all relative overflow-hidden"
      style={{
        background: "rgba(14,22,64,.6)",
        border: `1px solid ${m_1.color}40`,
        transform: `perspective(600px) rotateX(${t.x}deg) rotateY(${t.y}deg) translateZ(10px)`,
        transformStyle: "preserve-3d",
        boxShadow: l
          ? `0 10px 40px rgba(0,0,0,.4), 0 0 30px ${m_1.color}30, 0 0 60px ${m_1.color}15`
          : "0 10px 40px rgba(0,0,0,.4)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      <div
        className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, ${m_1.color}00, ${m_1.color}, ${m_1.color}00)`,
          backgroundSize: "200% 100%",
          animation: "borderRotate 2s linear infinite",
          zIndex: -1,
        }}
      />
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 relative"
        style={{
          background: `linear-gradient(135deg, ${m_1.color}, ${m_1.color}88)`,
          transform: "translateZ(20px)",
        }}
      >
        <BookOpenIcon size={24} className="text-white relative z-10" />
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle, ${m_1.color}60, transparent 70%)`,
            animation: "pulse-glow 2s ease-in-out infinite",
          }}
        />
      </div>
      <h3
        className="text-white font-black text-base mb-1"
        style={{
          transform: "translateZ(15px)",
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
function WeComponent({ ch, onClick, disabled, gameStatus }) {
  const [l, setL] = React.useState({
    x: 0,
    y: 0,
  });
  const [p, setP] = React.useState(false);
  const mRef = React.useRef(null);
  const h = (k) => {
    if (!mRef.current || disabled) {
      return;
    }
    const d = mRef.current.getBoundingClientRect();
    const w = (k.clientX - d.left) / d.width;
    const r = (k.clientY - d.top) / d.height;
    setL({
      x: (r - 0.5) * -12,
      y: (w - 0.5) * 12,
    });
  };
  const g = () => {
    setL({
      x: 0,
      y: 0,
    });
    setP(false);
  };
  const onMouseDown = () => setP(true);
  const onMouseUp = () => setP(false);
  return (
    <button
      ref={mRef}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={h}
      onMouseLeave={g}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      className="mobile-letter-key min-w-[44px] min-h-[44px] md:min-w-[38px] md:min-h-[38px] px-2 md:px-2 py-2.5 md:py-2.5 rounded-lg text-sm md:text-sm font-bold transition-all disabled:opacity-30"
      style={{
        background: "linear-gradient(180deg, rgba(70,255,154,.18), rgba(57,255,20,.1))",
        border: "1px solid rgba(70,255,154,.4)",
        color: "#46ff9a",
        boxShadow: p
          ? "0 0 8px rgba(70,255,154,.2), inset 0 2px 4px rgba(0,0,0,.3), 0 0 20px rgba(70,255,154,.1)"
          : "0 4px 8px rgba(0,0,0,.2), 0 0 12px rgba(70,255,154,.12), inset 0 1px 0 rgba(255,255,255,.08)",
        textShadow: "0 0 10px rgba(70,255,154,0.5)",
        transform: p
          ? `perspective(300px) rotateX(${l.x}deg) rotateY(${l.y}deg) translateZ(-2px) scale(0.95)`
          : `perspective(300px) rotateX(${l.x}deg) rotateY(${l.y}deg) translateZ(6px)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
      }}
    >
      {ch}
    </button>
  );
}
function VeComponent() {
  const [o, setO] = React.useState("select");
  const [t, setT] = React.useState([]);
  const [l, setL] = React.useState(0);
  const [p, setP] = React.useState("");
  const [m, setM] = React.useState(0);
  const [g, setG] = React.useState(0);
  const [u, setU] = React.useState(0);
  const [d, setD] = React.useState(3);
  const [r, setR] = React.useState("playing");
  const [N, setN] = React.useState(false);
  const [F, setF] = React.useState(false);
  const [ne, setNe] = React.useState(false);
  const [z, setZ] = React.useState(null);
  const [C, setC] = React.useState(null);
  const [_, set_] = React.useState(false);
  const DRef = React.useRef(null);
  const le = g_1();
  const [E, setE] = React.useState("");
  const ieRef = React.useRef(0);
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [fe, setFe] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("fillblanks_best") || "0");
    } catch {
      return 0;
    }
  });
  const expression = React.useMemo(() => {
    if (o === "gameover") {
      if (d > 0) {
        return "celebrating";
      }
      return "sad";
    }
    if (r === "correct") {
      return "excited";
    }
    if (r === "wrong") {
      return "sad";
    }
    return "neutral";
  }, [o, r, d]);
  const Y = React.useCallback((n) => {
    let x = n ? b_1(n) : c_1();
    if (x.length === 0) {
      setE(
        'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
      );
      return;
    }
    const b = Ae(Le(x)).slice(0, 10);
    setT(b);
    setL(0);
    setP("");
    setM(0);
    setG(0);
    setU(0);
    setD(3);
    setR("playing");
    setF(false);
    setO("playing");
  }, []);
  const V = () => {
    if (r !== "playing" || !t[l]) {
      return;
    }
    const n = t[l];
    if (
      p
        .trim()
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^A-ZÑ]/g, "")
        .trim() === n.blank
    ) {
      playCorrect();
      setR("correct");
      const b = g * 15;
      setM((M) => M + 100 + b);
      setG((M) => {
        const A = M + 1;
        setU((W) => Math.max(W, A));
        return A;
      });
      ++ieRef.current;
      setZ({
        show: true,
        text: `+${100 + g * 15}`,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 - 100,
      });
      setTimeout(() => setZ(null), 1200);
      ae(50);
      setC({
        show: true,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        color: "#46ff9a",
      });
      setTimeout(() => setC(null), 800);
    } else {
      playWrong();
      setR("wrong");
      setG(0);
      setD((b) => b - 1);
      setN(true);
      setNe(true);
      setC({
        show: true,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        color: "#ff3860",
      });
      setTimeout(() => {
        setN(false);
        setNe(false);
        setC(null);
      }, 500);
    }
  };
  const H = () => {
    playClick();
    if (d <= 0) {
      setO("gameover");
      playLose();
      setFe((n) => {
        const x = Math.max(n, m);
        localStorage.setItem("fillblanks_best", String(x));
        return x;
      });
      return;
    }
    if (l >= t.length - 1) {
      setO("gameover");
      playWin();
      setFe((n) => {
        const x = Math.max(n, m + g * 20);
        localStorage.setItem("fillblanks_best", String(x));
        return x;
      });
      ae(100);
      return;
    }
    setL((n) => n + 1);
    setP("");
    setR("playing");
    setF(false);
  };
  const O = (n) => {
    if (r === "playing") {
      playClick();
      setP((x) => x + n);
      setTimeout(() => DRef.current?.focus(), 0);
    }
  };
  const onClick = () => {
    if (r === "playing") {
      playClick();
      setP((n) => n.slice(0, -1));
    }
  };
  const onKeyDown = (n) => {
    if (n.key === "Enter") {
      if (r === "playing") {
        V();
      } else {
        H();
      }
    }
  };
  const S = t[l];
  const ue = ((l + (r !== "playing" ? 1 : 0)) / t.length) * 100;
  if (o === "select") {
    return (
      <StarfieldBackground>
        <TComponent />
        <Re1Component />
        <TeComponent expression="neutral" />
        <div
          className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative z-10"
          style={{
            perspective: "1000px",
          }}
        >
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
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 relative"
              style={{
                background: "linear-gradient(135deg, #46ff9a, #00d4ff)",
                boxShadow: "0 0 40px rgba(70,255,154,.3), 0 0 80px rgba(0,212,255,.15)",
              }}
            >
              <PenToolIcon size={36} className="text-white relative z-10" />
              <div
                className="absolute inset-0 rounded-2xl opacity-50 animate-pulse-glow"
                style={{
                  background: "radial-gradient(circle, rgba(70,255,154,.4), transparent 70%)",
                }}
              />
            </div>
            <h1
              className="text-4xl md:text-6xl font-black mb-3"
              style={{
                textShadow:
                  "0 0 60px rgba(0,212,255,0.4), 0 0 120px rgba(70,255,154,0.2), 0 0 180px rgba(0,212,255,0.1)",
                transform: "translateZ(30px)",
              }}
            >
              Fill Blanks
            </h1>
            <p className="text-white/40 text-sm font-medium">
              Selecciona un módulo para jugar / 选择模块开始游戏
            </p>
            {E && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold animate-fade-in-up"
                style={{
                  background: "rgba(255,68,68,.12)",
                  border: "1px solid rgba(255,68,68,.3)",
                  color: "#ff6b35",
                }}
              >
                {E}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => {
                playClick();
                setE("");
                Y(null);
              }}
              className="group rounded-xl p-5 text-left transition-all relative overflow-hidden"
              style={{
                background: "rgba(14,22,64,.6)",
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
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 relative"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                  transform: "translateZ(20px)",
                }}
              >
                <LayersIcon size={24} className="text-white relative z-10" />
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                  style={{
                    background: "radial-gradient(circle, rgba(255,0,170,.5), transparent 70%)",
                    animation: "pulse-glow 2s ease-in-out infinite",
                  }}
                />
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
            {le.map((m_1) => (
              <ReComponent
                key={m_1.id}
                m={m_1}
                onClick={() => {
                  setE("");
                  Y(m_1.id);
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
      <TComponent />
      <Re1Component />
      <TeComponent expression={expression} />
      {C && (
        <div
          className="fixed pointer-events-none z-[9997]"
          style={{
            left: C.x,
            top: C.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="ink-splash-anim"
            style={{
              "--ink-color": C.color,
            }}
          >
            <div className="ink-ring" />
            <div
              className="ink-ring"
              style={{
                animationDelay: "0.1s",
              }}
            />
            <div
              className="ink-ring"
              style={{
                animationDelay: "0.2s",
              }}
            />
          </div>
        </div>
      )}
      <div
        className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${ne ? "animate-screen-shake" : ""}`}
      >
        {Array.from({
          length: 12,
        }).map((n, x) => {
          const b = ["HOLA", "AMOR", "CASA", "AGUA", "LUZ", "FLOR", "PAZ", "SOL"];
          const M = Math.random() * 100;
          const A = Math.random() * 100;
          const W = 15 + Math.random() * 15;
          const he = Math.random() * 8;
          return (
            <div
              key={x}
              className="absolute font-black text-sm opacity-[0.07]"
              style={{
                left: `${M}%`,
                top: `${A}%`,
                color: "#46ff9a",
                animation: `floatWord ${W}s linear infinite`,
                animationDelay: `${he}s`,
              }}
            >
              {b[x % b.length]}
            </div>
          );
        })}
      </div>
      {z && (
        <div
          className="fixed pointer-events-none z-[9998] font-black text-2xl -translate-x-1/2"
          style={{
            left: z.x,
            top: z.y,
            color: "#46ff9a",
            textShadow: "0 0 20px #46ff9a, 0 0 40px #46ff9a, 0 0 80px #46ff9a",
            animation: "floatScoreFill 1.2s ease-out forwards",
          }}
        >
          {z.text}
        </div>
      )}
      <div
        className="max-w-3xl mx-auto px-4 py-6 min-h-screen relative z-10"
        style={{
          perspective: "1000px",
          touchAction: "manipulation",
        }}
      >
        <div
          className="flex items-center justify-between mb-6"
          style={{
            transform: "translateZ(25px)",
          }}
        >
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold group"
          >
            <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver /
            返回
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playClick();
                setO("select");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(57,236,255,0.2)]"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "#fff",
              }}
            >
              <LayersIcon size={12} /> Cambiar / 切换
            </button>
            <button
              onClick={() => {
                playClick();
                Y(null);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(70,255,154,0.2)]"
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
        <div
          className="text-center mb-6"
          style={{
            transform: "translateZ(20px)",
          }}
        >
          <h1
            className="text-4xl md:text-6xl font-black mb-2"
            style={{
              background: "linear-gradient(135deg,#46ff9a,#39ff14,#00d4ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(70,255,154,.4))",
            }}
          >
            Fill Blanks
          </h1>
          <p className="text-white/40 text-sm font-medium">Completa la frase / 完成句子</p>
        </div>
        <div
          className="flex gap-3 justify-center mb-4 flex-wrap"
          style={{
            transform: "translateZ(18px)",
          }}
        >
          <div
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold neon-pulse-red"
            style={{
              background: "rgba(255,56,96,.1)",
              border: "1px solid rgba(255,56,96,.3)",
              color: "#ff3860",
              boxShadow: "0 0 15px rgba(255,56,96,.15), 0 0 30px rgba(255,56,96,.05)",
            }}
          >
            {Array.from({
              length: 3,
            }).map((n, x) => (
              <HeartIcon
                key={x}
                size={14}
                fill={x < d ? "#ff3860" : "transparent"}
                style={{
                  color: x < d ? "#ff3860" : "rgba(255,255,255,.15)",
                  transition: "all 0.3s",
                  filter: x < d ? "drop-shadow(0 0 4px #ff3860)" : "none",
                }}
              />
            ))}
          </div>
          <div
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold neon-pulse-green"
            style={{
              background: "rgba(70,255,154,.1)",
              border: "1px solid rgba(70,255,154,.3)",
              color: "#46ff9a",
              boxShadow: "0 0 15px rgba(70,255,154,.15), 0 0 30px rgba(70,255,154,.05)",
            }}
          >
            <ZapIcon
              size={14}
              style={{
                filter: "drop-shadow(0 0 4px #46ff9a)",
              }}
            />{" "}
            {m}
          </div>
          <div
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold neon-pulse-lime"
            style={{
              background: "rgba(57,255,20,.1)",
              border: "1px solid rgba(57,255,20,.3)",
              color: "#39ff14",
              boxShadow: "0 0 15px rgba(57,255,20,.15), 0 0 30px rgba(57,255,20,.05)",
            }}
          >
            <PenToolIcon
              size={14}
              style={{
                filter: "drop-shadow(0 0 4px #39ff14)",
              }}
            />{" "}
            {l + 1}/{t.length}
          </div>
          {g > 1 && (
            <div
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold animate-streak-pulse"
              style={{
                background: "rgba(255,214,0,.12)",
                border: "1px solid rgba(255,214,0,.3)",
                color: "#ffd600",
                boxShadow: "0 0 15px rgba(255,214,0,.2), 0 0 30px rgba(255,214,0,.08)",
              }}
            >
              <ZapIcon
                size={14}
                fill="#ffd600"
                style={{
                  filter: "drop-shadow(0 0 4px #ffd600)",
                }}
              />{" "}
              x{g} Racha
            </div>
          )}
        </div>
        <div
          className="max-w-md mx-auto h-3 rounded-full overflow-hidden mb-6 relative"
          style={{
            background: "rgba(255,255,255,.05)",
            boxShadow: "0 0 15px rgba(70,255,154,.1), inset 0 0 10px rgba(0,0,0,.3)",
            transform: "translateZ(12px)",
          }}
        >
          <div
            className="h-full rounded-full transition-all duration-700 relative"
            style={{
              width: `${ue}%`,
              background: "linear-gradient(90deg,#46ff9a,#39ff14,#00d4ff)",
              boxShadow: "0 0 25px rgba(70,255,154,.5), 0 0 50px rgba(57,255,20,.2)",
            }}
          >
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white"
              style={{
                boxShadow: "0 0 15px #fff, 0 0 30px #46ff9a",
              }}
            />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                animation: "shimmer 2s infinite",
              }}
            />
          </div>
        </div>
        {S && (
          <div
            className={`rounded-3xl p-6 md:p-8 mb-6 relative overflow-hidden ${N ? "animate-blank-shake" : ""}`}
            style={{
              background: "linear-gradient(180deg, rgba(255,248,231,0.06), rgba(14,22,64,.7))",
              border:
                r === "correct"
                  ? "1px solid rgba(70,255,154,.6)"
                  : r === "wrong"
                    ? "1px solid rgba(255,56,96,.6)"
                    : "1px solid rgba(255,255,255,.15)",
              backdropFilter: "blur(20px)",
              boxShadow:
                r === "correct"
                  ? "0 0 60px rgba(70,255,154,.4), 0 0 120px rgba(57,255,20,.15), 0 20px 60px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.1)"
                  : r === "wrong"
                    ? "0 0 60px rgba(255,56,96,.4), 0 0 120px rgba(255,68,68,.15), 0 20px 60px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.1)"
                    : "0 0 30px rgba(70,255,154,.1), 0 20px 60px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.1)",
              animation: N ? "blankShake 0.5s ease" : "blankCardAppear 0.6s ease-out",
              transform: "translateZ(15px)",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-30"
              style={{
                background: "linear-gradient(135deg,#46ff9a,#39ff14,#00d4ff)",
                filter: "blur(20px)",
              }}
            />
            <div className="absolute -top-3 -right-2 md:-top-4 md:-right-4 opacity-20 rotate-12">
              <FeatherIcon
                size={40}
                className="text-white"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(255,255,255,0.3))",
                }}
              />
            </div>
            <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 opacity-10 -rotate-12">
              <ScrollIcon size={35} className="text-white" />
            </div>
            <p
              className="text-sm md:text-base font-medium text-center mb-6 leading-relaxed relative z-10"
              style={{
                color: "rgba(255,255,255,.9)",
                textShadow: "0 0 20px rgba(255,255,255,0.1)",
                transform: "translateZ(10px)",
              }}
            >
              {S.sentence.split("_____").map((n, x, b) => (
                <span key={x}>
                  {n}
                  {x < b.length - 1 && (
                    <span
                      className="inline-block mx-1 px-2 md:px-3 py-1.5 md:py-2 rounded-lg font-black text-lg md:text-xl min-w-[70px] md:min-w-[100px] text-center relative overflow-hidden"
                      style={{
                        background:
                          r === "correct"
                            ? "linear-gradient(135deg, rgba(70,255,154,.4), rgba(57,255,20,.25))"
                            : r === "wrong"
                              ? "linear-gradient(135deg, rgba(255,56,96,.4), rgba(255,68,68,.25))"
                              : "linear-gradient(135deg, rgba(255,255,255,.12), rgba(255,255,255,.05))",
                        border:
                          r === "correct"
                            ? "2px solid rgba(70,255,154,.9)"
                            : r === "wrong"
                              ? "2px solid rgba(255,56,96,.9)"
                              : p
                                ? "2px solid rgba(70,255,154,.5)"
                                : "2px solid rgba(255,255,255,.25)",
                        color: r === "correct" ? "#46ff9a" : r === "wrong" ? "#ff3860" : "#fff",
                        boxShadow:
                          r === "correct"
                            ? "0 0 40px rgba(70,255,154,.8), 0 0 80px rgba(57,255,20,.3), inset 0 0 20px rgba(70,255,154,.2)"
                            : r === "wrong"
                              ? "0 0 40px rgba(255,56,96,.8), 0 0 80px rgba(255,68,68,.3), inset 0 0 20px rgba(255,56,96,.2)"
                              : p
                                ? "0 0 20px rgba(70,255,154,.3), inset 0 0 8px rgba(70,255,154,.1)"
                                : "0 0 15px rgba(255,255,255,.1), inset 0 0 8px rgba(255,255,255,.05)",
                        textShadow:
                          r === "correct"
                            ? "0 0 20px rgba(70,255,154,.9), 0 0 40px rgba(70,255,154,.5)"
                            : r === "wrong"
                              ? "0 0 20px rgba(255,56,96,.9), 0 0 40px rgba(255,56,96,.5)"
                              : "0 0 10px rgba(255,255,255,.3)",
                        animation:
                          r === "correct"
                            ? "blankCorrectFlash 0.8s ease"
                            : r === "wrong"
                              ? "blankWrongWobble 0.6s ease"
                              : p
                                ? "none"
                                : "blankSlotPulse 2s ease-in-out infinite",
                        transition: "all 0.4s ease",
                        transform:
                          r === "correct"
                            ? "perspective(300px) scale(1.08) translateZ(20px)"
                            : r === "wrong"
                              ? "perspective(300px) scale(1.02) translateZ(5px)"
                              : "perspective(300px) scale(1) translateZ(10px)",
                        transformStyle: "preserve-3d",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <span className="relative z-10">{r !== "playing" ? S.blank : p || " "}</span>
                      {r === "playing" && p && (
                        <span
                          className="absolute inset-0 rounded-lg pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(90deg, rgba(70,255,154,0), rgba(70,255,154,.15), rgba(0,212,255,.15), rgba(70,255,154,0))",
                            backgroundSize: "200% 100%",
                            animation: "borderRotate 2s linear infinite",
                            opacity: 0.6,
                          }}
                        />
                      )}
                      {r === "playing" && !p && (
                        <span
                          className="absolute inset-0 rounded-lg pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(90deg, rgba(0,212,255,0), rgba(0,212,255,.1), rgba(70,255,154,.1), rgba(0,212,255,0))",
                            backgroundSize: "200% 100%",
                            animation: "borderRotate 3s linear infinite",
                            opacity: 0.4,
                          }}
                        />
                      )}
                    </span>
                  )}
                </span>
              ))}
            </p>
            <div
              className="text-center mb-4 relative z-10"
              style={{
                transform: "translateZ(8px)",
              }}
            >
              <button
                onClick={() => {
                  playClick();
                  setF(!F);
                }}
                onMouseEnter={() => set_(true)}
                onMouseLeave={() => set_(false)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105"
                style={{
                  background: "rgba(255,214,0,.1)",
                  border: `1px solid ${_ ? "rgba(255,214,0,.7)" : "rgba(255,214,0,.25)"}`,
                  color: "#ffd600",
                  boxShadow: _
                    ? "0 0 25px rgba(255,214,0,.4), 0 0 50px rgba(255,214,0,.15), inset 0 0 10px rgba(255,214,0,.1)"
                    : "0 0 8px rgba(255,214,0,.1)",
                  transform: _
                    ? "perspective(300px) translateZ(8px) scale(1.05)"
                    : "perspective(300px) translateZ(0) scale(1)",
                  transition: "all 0.3s ease",
                }}
              >
                <LightbulbIcon
                  size={12}
                  style={{
                    filter: _ ? "drop-shadow(0 0 6px #ffd600)" : "none",
                    transition: "all 0.3s ease",
                  }}
                />{" "}
                {F ? "Ocultar / 隐藏" : "Pista / 提示"}
              </button>
              {F && (
                <p
                  className="mt-3 text-sm font-bold animate-fade-in-up"
                  style={{
                    color: "rgba(255,214,0,.8)",
                    textShadow: "0 0 15px rgba(255,214,0,.4)",
                  }}
                >
                  {S.hint}
                </p>
              )}
            </div>
            <input
              ref={DRef}
              type="text"
              value={p}
              onChange={(n) => r === "playing" && setP(n.target.value.toUpperCase())}
              onKeyDown={onKeyDown}
              className="sr-only"
              aria-hidden="true"
            />
            {r === "correct" && (
              <div
                className="text-center p-4 rounded-xl mb-4 animate-fade-in-up relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(70,255,154,.15), rgba(57,255,20,.1))",
                  border: "1px solid rgba(70,255,154,.4)",
                  boxShadow: "0 0 30px rgba(70,255,154,.3), 0 0 60px rgba(57,255,20,.15)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(70,255,154,0.4), transparent)",
                    animation: "shimmer 1.5s infinite",
                  }}
                />
                <p
                  className="text-lg font-black relative z-10"
                  style={{
                    color: "#46ff9a",
                    textShadow: "0 0 15px rgba(70,255,154,0.8), 0 0 30px rgba(70,255,154,0.4)",
                  }}
                >
                  ¡Correcto! / 答对了！
                </p>
              </div>
            )}
            {r === "wrong" && (
              <div
                className="text-center p-4 rounded-xl mb-4 animate-fade-in-up relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, rgba(255,56,96,.15), rgba(255,68,68,.1))",
                  border: "1px solid rgba(255,56,96,.4)",
                  boxShadow: "0 0 30px rgba(255,56,96,.3), 0 0 60px rgba(255,68,68,.15)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,56,96,0.3), transparent)",
                    animation: "shimmer 1.5s infinite",
                  }}
                />
                <p
                  className="text-lg font-black relative z-10"
                  style={{
                    color: "#ff3860",
                    textShadow: "0 0 15px rgba(255,56,96,0.8), 0 0 30px rgba(255,56,96,0.4)",
                  }}
                >
                  ¡Incorrecto! / 错了！
                </p>
                <p
                  className="text-xs mt-1 relative z-10"
                  style={{
                    color: "rgba(207,216,255,.5)",
                  }}
                >
                  Respuesta:{" "}
                  <span
                    className="font-bold"
                    style={{
                      color: "#ff3860",
                      textShadow: "0 0 8px rgba(255,56,96,0.5)",
                    }}
                  >
                    {S.blank}
                  </span>
                </p>
              </div>
            )}
            <div
              className="text-center relative z-10"
              style={{
                transform: "translateZ(12px)",
              }}
            >
              {r === "playing" ? (
                <button
                  onClick={V}
                  disabled={!p.trim()}
                  className="px-8 py-3 rounded-full text-white font-black text-sm transition-all disabled:opacity-30 hover:scale-105 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg,#46ff9a,#39ff14)",
                    boxShadow:
                      "0 0 25px rgba(70,255,154,.4), 0 0 50px rgba(57,255,20,.2), 0 4px 15px rgba(0,0,0,.3)",
                    textShadow: "0 1px 2px rgba(0,0,0,.2)",
                    transform: "translateZ(8px)",
                  }}
                >
                  Comprobar / 检查
                </button>
              ) : (
                <button
                  onClick={H}
                  className="px-8 py-3 rounded-full text-white font-black text-sm transition-all hover:scale-105 active:scale-95 animate-next-btn-appear"
                  style={{
                    background: "linear-gradient(135deg,#46ff9a,#39ff14)",
                    boxShadow:
                      "0 0 25px rgba(70,255,154,.4), 0 0 50px rgba(57,255,20,.2), 0 4px 15px rgba(0,0,0,.3)",
                    textShadow: "0 1px 2px rgba(0,0,0,.2)",
                    transform: "translateZ(8px)",
                  }}
                >
                  {l < t.length - 1
                    ? "Siguiente / 下一个"
                    : d > 0
                      ? "Ver resultado / 查看结果"
                      : "Resultados / 结果"}
                </button>
              )}
            </div>
          </div>
        )}
        <div
          className="mobile-letter-keyboard flex flex-col gap-2 items-center mb-6 relative z-10"
          style={{
            transform: "translateZ(10px)",
            touchAction: "manipulation",
          }}
        >
          {Fe.map((n, x) => (
            <div key={x} className="mobile-letter-row flex gap-1 md:gap-1.5 justify-center w-full">
              {n.map((b) => (
                <WeComponent key={b} ch={b} onClick={() => O(b)} disabled={r !== "playing"} gameStatus={r} />
              ))}
              {x === 2 && (
                <button
                  onClick={onClick}
                  disabled={r !== "playing"}
                  className="min-w-[44px] min-h-[44px] md:min-w-[40px] md:min-h-[40px] px-2 md:px-3 py-2.5 md:py-2.5 rounded-lg text-xs font-bold transition-all disabled:opacity-30 hover:scale-105 active:scale-95"
                  style={{
                    background: "linear-gradient(180deg, rgba(255,56,96,.18), rgba(255,68,68,.1))",
                    border: "1px solid rgba(255,56,96,.4)",
                    color: "#ff3860",
                    textShadow: "0 0 10px rgba(255,56,96,0.5)",
                    boxShadow:
                      "0 4px 8px rgba(0,0,0,.2), 0 0 12px rgba(255,56,96,.12), inset 0 1px 0 rgba(255,255,255,.08)",
                  }}
                >
                  ⌫
                </button>
              )}
            </div>
          ))}
          <div className="flex gap-1 md:gap-2 justify-center w-full max-w-md mt-1">
            {Xe.map((n) => (
              <button
                key={n}
                onClick={() => O(n)}
                disabled={r !== "playing"}
                className="min-w-[40px] min-h-[40px] md:min-w-[36px] md:min-h-[36px] px-2 md:px-2 py-2 md:py-1.5 rounded-lg text-xs md:text-xs font-bold transition-all disabled:opacity-30 hover:scale-110 active:scale-95"
                style={{
                  background: "linear-gradient(180deg, rgba(70,255,154,.15), rgba(57,255,20,.08))",
                  border: "1px solid rgba(70,255,154,.35)",
                  color: "#46ff9a",
                  textShadow: "0 0 8px rgba(70,255,154,0.4)",
                  boxShadow: "0 0 8px rgba(70,255,154,.08)",
                }}
              >
                {n}
              </button>
            ))}
          </div>
          <p
            className="text-[10px] font-medium mt-1"
            style={{
              color: "rgba(207,216,255,.3)",
            }}
          >
            <KeyboardIcon size={10} className="inline mr-1" /> También puedes usar el teclado físico /
            也可以使用物理键盘
          </p>
        </div>
        {o === "gameover" && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.9)",
              backdropFilter: "blur(24px)",
              perspective: "1000px",
            }}
          >
            <TComponent />
            <div
              className="text-center p-6 md:p-8 rounded-3xl max-w-sm mx-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.85),rgba(5,8,27,.7))",
                border: d > 0 ? "1px solid rgba(70,255,154,.4)" : "1px solid rgba(255,56,96,.4)",
                boxShadow:
                  d > 0
                    ? "0 0 80px rgba(70,255,154,.3), 0 0 160px rgba(57,255,20,.1), 0 20px 80px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.1)"
                    : "0 0 80px rgba(255,56,96,.3), 0 0 160px rgba(255,68,68,.1), 0 20px 80px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.1)",
                transform: "translateZ(50px)",
                animation: "victoryBounce 1s ease-out",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-50"
                style={{
                  background:
                    d > 0
                      ? "linear-gradient(135deg,#46ff9a,#39ff14,#00d4ff)"
                      : "linear-gradient(135deg,#ff3860,#ff6b35)",
                  filter: "blur(30px)",
                  animation: "victoryGlow 2s ease-in-out infinite alternate",
                }}
              />
              <div
                className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center relative"
                style={{
                  background:
                    d > 0
                      ? "linear-gradient(135deg, #46ff9a, #39ff14)"
                      : "linear-gradient(135deg, #ff3860, #ff6b35)",
                  boxShadow:
                    d > 0
                      ? "0 0 30px rgba(70,255,154,.4), 0 0 60px rgba(57,255,20,.2)"
                      : "0 0 30px rgba(255,56,96,.4), 0 0 60px rgba(255,68,68,.2)",
                  transform: "translateZ(20px)",
                }}
              >
                <TrophyIcon
                  size={32}
                  className="text-white relative z-10"
                  style={{
                    filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-2xl opacity-50 animate-pulse-glow"
                  style={{
                    background:
                      d > 0
                        ? "radial-gradient(circle, rgba(70,255,154,.4), transparent 70%)"
                        : "radial-gradient(circle, rgba(255,56,96,.4), transparent 70%)",
                  }}
                />
              </div>
              <h2
                className="text-3xl md:text-4xl font-black mb-2"
                style={{
                  background:
                    d > 0
                      ? "linear-gradient(135deg,#46ff9a,#39ff14,#00d4ff)"
                      : "linear-gradient(135deg,#ff3860,#ff6b35)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter:
                    d > 0
                      ? "drop-shadow(0 0 20px rgba(70,255,154,.4))"
                      : "drop-shadow(0 0 20px rgba(255,56,96,.4))",
                  transform: "translateZ(15px)",
                }}
              >
                {d > 0 ? "¡Completado!" : "¡Fin del juego!"}
              </h2>
              <p
                className="text-white/50 text-sm mb-6"
                style={{
                  transform: "translateZ(10px)",
                }}
              >
                {d > 0 ? "完成！" : "游戏结束！"}
              </p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(70,255,154,.1)",
                    border: "1px solid rgba(70,255,154,.3)",
                    boxShadow: "0 0 15px rgba(70,255,154,.1), inset 0 0 10px rgba(70,255,154,.05)",
                    transform: "translateZ(12px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <ZapIcon
                    size={16}
                    style={{
                      color: "#46ff9a",
                      margin: "0 auto 4px",
                      filter: "drop-shadow(0 0 4px #46ff9a)",
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
                      color: "#46ff9a",
                      textShadow: "0 0 10px rgba(70,255,154,0.4)",
                    }}
                  >
                    {m}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(57,255,20,.1)",
                    border: "1px solid rgba(57,255,20,.3)",
                    boxShadow: "0 0 15px rgba(57,255,20,.1), inset 0 0 10px rgba(57,255,20,.05)",
                    transform: "translateZ(12px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <ZapIcon
                    size={16}
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
                    Racha
                  </p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#39ff14",
                      textShadow: "0 0 10px rgba(57,255,20,0.4)",
                    }}
                  >
                    {u}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{
                    background: "rgba(255,214,0,.1)",
                    border: "1px solid rgba(255,214,0,.3)",
                    boxShadow: "0 0 15px rgba(255,214,0,.1), inset 0 0 10px rgba(255,214,0,.05)",
                    transform: "translateZ(12px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <TrophyIcon
                    size={16}
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
                    Mejor
                  </p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#ffd600",
                      textShadow: "0 0 10px rgba(255,214,0,0.4)",
                    }}
                  >
                    {fe}
                  </p>
                </div>
              </div>
              <div
                className="flex gap-3 justify-center flex-wrap"
                style={{
                  transform: "translateZ(10px)",
                }}
              >
                <button
                  onClick={() => {
                    playClick();
                    Y(null);
                  }}
                  className="px-6 md:px-8 py-3 rounded-full text-white font-black text-sm transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(70,255,154,0.4)] active:scale-95"
                  style={{
                    background: "linear-gradient(135deg,#46ff9a,#39ff14)",
                    boxShadow: "0 0 25px rgba(70,255,154,.3), 0 0 50px rgba(57,255,20,.15)",
                  }}
                >
                  Jugar de nuevo / 再玩一次
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setO("select");
                  }}
                  className="px-4 py-3 rounded-full text-xs font-bold transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  style={{
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(255,255,255,.12)",
                    color: "#fff",
                  }}
                >
                  Cambiar / 切换
                </button>
                <P currentGameId="fill-blanks" />
              </div>
            </div>
          </div>
        )}
        <style>{`
          @keyframes blankCardAppear { from{transform:translateY(30px) rotateX(10deg);opacity:0} to{transform:translateY(0) rotateX(0);opacity:1} }
          @keyframes blankShake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-10px)} 40%{transform:translateX(10px)} 60%{transform:translateX(-7px)} 80%{transform:translateX(7px)} }
          @keyframes blankFillGlow { 0%{box-shadow:0 0 15px rgba(70,255,154,.3)} 50%{box-shadow:0 0 35px rgba(70,255,154,.7)} 100%{box-shadow:0 0 15px rgba(70,255,154,.3)} }
          @keyframes blankSlotPulse { 0%,100%{box-shadow:0 0 12px rgba(0,212,255,.15), inset 0 0 8px rgba(255,255,255,.03); border-color:rgba(255,255,255,.25)} 50%{box-shadow:0 0 25px rgba(0,212,255,.35), inset 0 0 12px rgba(0,212,255,.08); border-color:rgba(0,212,255,.5)} }
          @keyframes blankCorrectFlash { 0%{transform:perspective(300px) scale(1) translateZ(10px); box-shadow:0 0 15px rgba(70,255,154,.3)} 30%{transform:perspective(300px) scale(1.15) translateZ(30px); box-shadow:0 0 60px rgba(70,255,154,1), 0 0 120px rgba(57,255,20,.5)} 60%{transform:perspective(300px) scale(1.08) translateZ(20px); box-shadow:0 0 40px rgba(70,255,154,.8)} 100%{transform:perspective(300px) scale(1.08) translateZ(20px); box-shadow:0 0 40px rgba(70,255,154,.8), 0 0 80px rgba(57,255,20,.3)} }
          @keyframes blankWrongWobble { 0%{transform:perspective(300px) scale(1) translateZ(10px)} 15%{transform:perspective(300px) scale(1.05) translateZ(15px) rotateX(-3deg) rotateY(-5deg)} 30%{transform:perspective(300px) scale(1.02) translateZ(5px) rotateX(3deg) rotateY(5deg)} 45%{transform:perspective(300px) scale(1.04) translateZ(12px) rotateX(-2deg) rotateY(-3deg)} 60%{transform:perspective(300px) scale(1.02) translateZ(5px) rotateX(2deg) rotateY(3deg)} 100%{transform:perspective(300px) scale(1.02) translateZ(5px)} }
          @keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
          @keyframes fadeInUp { from{opacity:0;transform:translateY(15px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }
          @keyframes nextBtnAppear { from{transform:scale(0.8);opacity:0} to{transform:scale(1);opacity:1} }
          @keyframes floatWord { 0%{transform:translateY(100vh) rotate(0deg);opacity:0} 10%{opacity:.07} 90%{opacity:.07} 100%{transform:translateY(-10vh) rotate(20deg);opacity:0} }
          @keyframes floatBook { 0%{transform:translateY(110vh) rotate(-5deg);opacity:0} 10%{opacity:.08} 90%{opacity:.08} 100%{transform:translateY(-10vh) rotate(5deg);opacity:0} }
          @keyframes floatScoreFill { 0%{transform:translateY(0) scale(1);opacity:1} 100%{transform:translateY(-60px) scale(1.5);opacity:0} }
          @keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
          @keyframes screenShake { 0%,100%{transform:translateX(0)} 10%{transform:translateX(-8px)} 20%{transform:translateX(8px)} 30%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 50%{transform:translateX(-4px)} 60%{transform:translateX(4px)} 70%{transform:translateX(-2px)} 80%{transform:translateX(2px)} 90%{transform:translateX(-1px)} }
          @keyframes victoryBounce { 0%{transform:translateZ(50px) scale(0.8); opacity:0} 60%{transform:translateZ(50px) scale(1.02); opacity:1} 100%{transform:translateZ(50px) scale(1); opacity:1} }
          @keyframes victoryGlow { from{opacity:.3} to{opacity:.6} }
          @keyframes pulseGlow { 0%,100%{opacity:0.3} 50%{opacity:0.7} }
          @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
          @keyframes inkFloat { 0%{transform:translateY(0) translateX(0);opacity:0.15} 25%{transform:translateY(-20px) translateX(10px);opacity:0.25} 50%{transform:translateY(-40px) translateX(-5px);opacity:0.15} 75%{transform:translateY(-60px) translateX(15px);opacity:0.2} 100%{transform:translateY(-80px) translateX(0);opacity:0} }
          @keyframes inkSplash { 0%{transform:scale(0);opacity:0.8} 50%{transform:scale(1.5);opacity:0.4} 100%{transform:scale(2.5);opacity:0} }
          @keyframes mascotFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
          @keyframes mascotBounce { 0%,100%{transform:translateY(0) scale(1)} 25%{transform:translateY(-10px) scale(1.05)} 50%{transform:translateY(-4px) scale(0.98)} 75%{transform:translateY(-8px) scale(1.02)} }
          @keyframes streakPulse { 0%,100%{box-shadow:0 0 15px rgba(255,214,0,.2)} 50%{box-shadow:0 0 25px rgba(255,214,0,.5)} }

          .animate-fade-in-up { animation: fadeInUp 0.4s ease forwards; }
          .animate-blank-shake { animation: blankShake 0.5s ease; }
          .animate-next-btn-appear { animation: nextBtnAppear 0.4s ease-out; }
          .animate-streak-pulse { animation: streakPulse 1.5s ease-in-out infinite; }
          .animate-screen-shake { animation: screenShake 0.5s ease; }
          .animate-pulse-glow { animation: pulseGlow 2s ease-in-out infinite; }
          .mascot-float { animation: mascotFloat 3s ease-in-out infinite; }
          .mascot-bounce { animation: mascotBounce 1.2s ease-in-out infinite; }

          .neon-pulse-green { animation: neonPulseGreen 2s ease-in-out infinite; }
          .neon-pulse-red { animation: neonPulseRed 2s ease-in-out infinite; }
          .neon-pulse-lime { animation: neonPulseLime 2s ease-in-out infinite; }

          @keyframes neonPulseGreen { 0%,100%{box-shadow:0 0 10px rgba(70,255,154,.1)} 50%{box-shadow:0 0 20px rgba(70,255,154,.3)} }
          @keyframes neonPulseRed { 0%,100%{box-shadow:0 0 10px rgba(255,56,96,.1)} 50%{box-shadow:0 0 20px rgba(255,56,96,.3)} }
          @keyframes neonPulseLime { 0%,100%{box-shadow:0 0 10px rgba(57,255,20,.1)} 50%{box-shadow:0 0 20px rgba(57,255,20,.3)} }

          .ink-splash-anim { position: relative; width: 100px; height: 100px; }
          .ink-ring { position: absolute; inset: 0; border-radius: 50%; border: 3px solid var(--ink-color, #46ff9a); animation: inkSplash 0.8s ease-out forwards; opacity: 0; }
        `}</style>
      </div>
    </StarfieldBackground>
  );
}
export { VeComponent as default };
