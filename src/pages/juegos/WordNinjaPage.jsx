import {
  SparklesIcon,
  ZapIcon,
  HeartIcon,
  TrophyIcon,
  StarIcon,
  BookOpenIcon,
  ArrowLeftIcon,
  SwordIcon,
  LayersIcon,
  FlameIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g as g_1, a } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
function H(o) {
  return o
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-ZÑ]/g, "")
    .trim();
}
function ve(o) {
  const m = [...o];
  for (let g = m.length - 1; g > 0; g--) {
    const j = Math.floor(Math.random() * (g + 1));
    [m[g], m[j]] = [m[j], m[g]];
  }
  return m;
}
function JeComponent({ expression, scale = 1 }) {
  const g = expression === "happy" ? 1.5 : expression === "excited" ? 2.5 : expression === "sad" ? -0.5 : 0;
  const d =
    expression === "happy"
      ? "M 14 32 Q 20 38 26 32"
      : expression === "excited"
        ? "M 14 32 Q 20 42 26 32"
        : expression === "sad"
          ? "M 14 36 Q 20 30 26 36"
          : "M 16 34 Q 20 36 24 34";
  const stopOpacity = expression === "happy" || expression === "excited" ? 0.7 : 0.25;
  const Y = expression === "excited";
  const c = expression === "sad";
  const u = expression === "excited" || expression === "happy" ? "#00f0ff" : "#ff2a6d";
  const Z = expression === "sad" ? "#ff2a6d" : "#ff00aa";
  const className = expression === "excited" ? "kawaii-float-fast" : "kawaii-float";
  return (
    <svg
      width={80 * scale}
      height={90 * scale}
      viewBox="0 0 40 48"
      className={className}
      style={{
        filter: `drop-shadow(0 0 12px ${u}aa) drop-shadow(0 0 30px ${u}55) drop-shadow(0 4px 8px rgba(0,0,0,0.4))`,
        overflow: "visible",
      }}
    >
      <defs>
        <linearGradient id="ninjaFaceGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe8de" />
          <stop offset="100%" stopColor="#ffd0c0" />
        </linearGradient>
        <radialGradient id="ninjaBlush" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff4d79" stopOpacity={stopOpacity} />
          <stop offset="100%" stopColor="#ff4d79" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="katanaGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={u} />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor={u} />
        </linearGradient>
      </defs>
      <ellipse cx="20" cy="46" rx="10" ry="2" fill="#000" opacity="0.2" />
      <path d="M 10 34 L 8 44 Q 20 48 32 44 L 30 34 Z" fill="#0d0d1a" stroke="#1a1a2e" strokeWidth="1" />
      <rect x="18" y="38" width="4" height="4" rx="1" fill={Z}>
        <animate attributeName="opacity" values="0.8;1;0.8" dur="1s" repeatCount="indefinite" />
      </rect>
      <rect x="27" y="33" width="8" height="2" rx="0.5" transform="rotate(-35 27 33)" fill="#d4a843" />
      <rect x="34" y="27" width="4" height="1.5" rx="0.5" transform="rotate(-35 34 27)" fill="#2a2a3e" />
      <line
        x1="28"
        y1="36"
        x2="40"
        y2="26"
        stroke="url(#katanaGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.9"
      >
        <animate attributeName="stroke-width" values="2.5;3.5;2.5" dur="0.6s" repeatCount="indefinite" />
      </line>
      <circle cx="40" cy="26" r="2.5" fill={u} opacity="0.8">
        <animate attributeName="r" values="2;3.5;2" dur="0.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;1;0.6" dur="0.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="40" cy="26" r="6" fill={u} opacity="0.15">
        <animate attributeName="r" values="6;10;6" dur="1.2s" repeatCount="indefinite" />
      </circle>
      <ellipse cx="20" cy="24" rx="15" ry="13" fill="url(#ninjaFaceGrad)" />
      <rect x="7" y="10" width="26" height="4.5" rx="1" fill={Z} />
      <rect x="7" y="10" width="26" height="4.5" rx="1" fill="url(#katanaGrad)" opacity="0.3" />
      <path d="M 33 12 L 39 9 L 37 14 Z" fill={Z} />
      <path d="M 33 12 L 39 14 L 37 19 Z" fill="#00d4ff" opacity="0.9" />
      <path d="M 39 9 L 41 7 L 40 11 Z" fill="#00d4ff" opacity="0.7" />
      <path d="M 5 18 Q 20 15 35 18 L 35 28 Q 20 25 5 28 Z" fill="#0d0d1a" opacity="0.9" />
      <path d="M 5 18 Q 20 15 35 18" fill="none" stroke={Z} strokeWidth="0.5" opacity="0.6" />
      <ellipse cx="9" cy="30" rx="4" ry="2.5" fill="url(#ninjaBlush)" />
      <ellipse cx="31" cy="30" rx="4" ry="2.5" fill="url(#ninjaBlush)" />
      {Y ? (
        <>
          <polygon points="12,22 14,26 18,26 15,29 16,33 12,30 8,33 9,29 6,26 10,26" fill="#00f0ff">
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1;1.15;1"
              dur="0.4s"
              repeatCount="indefinite"
              additive="sum"
            />
          </polygon>
          <polygon points="28,22 30,26 34,26 31,29 32,33 28,30 24,33 25,29 22,26 26,26" fill="#00f0ff">
            <animateTransform
              attributeName="transform"
              type="scale"
              values="1;1.15;1"
              dur="0.4s"
              repeatCount="indefinite"
              additive="sum"
            />
          </polygon>
        </>
      ) : (
        <>
          <ellipse cx="14" cy={24 + g} rx="3" ry={expression === "sad" ? 2 : 3.5} fill="#00d4ff" />
          <ellipse cx="26" cy={24 + g} rx="3" ry={expression === "sad" ? 2 : 3.5} fill="#00d4ff" />
          <circle cx="15.5" cy={23 + g} r="1.2" fill="white" />
          <circle cx="27.5" cy={23 + g} r="1.2" fill="white" />
        </>
      )}
      {c && (
        <>
          <circle cx="11" cy="28" r="1.5" fill="#00d4ff" opacity="0.7">
            <animate attributeName="cy" values="28;34;28" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0;0.7" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="29" cy="28" r="1.5" fill="#00d4ff" opacity="0.7">
            <animate attributeName="cy" values="28;34;28" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0;0.7" dur="1.8s" repeatCount="indefinite" />
          </circle>
        </>
      )}
      <path d={d} fill="none" stroke="#c45c6a" strokeWidth="1.2" strokeLinecap="round" />
      {(expression === "happy" || expression === "excited") && (
        <>
          <polygon
            points="5,8 6,11 9,11 6.5,13 7.5,16 5,14 2.5,16 3.5,13 1,11 4,11"
            fill="#ffd600"
            opacity="0.8"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 5 12; 360 5 12"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite" />
          </polygon>
          <polygon
            points="35,6 35.5,8 37.5,8 36,9.5 36.5,11.5 35,10.5 33.5,11.5 34,9.5 32.5,8 34.5,8"
            fill="#ffd600"
            opacity="0.6"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 35 8.5; -360 35 8.5"
              dur="2.5s"
              repeatCount="indefinite"
            />
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
          </polygon>
        </>
      )}
    </svg>
  );
}
function QeComponent({ m: m_1, onClick }) {
  const [g, setG] = React.useState({
    x: 0,
    y: 0,
  });
  const zRef = React.useRef(null);
  const { playClick } = useSound();
  const onMouseMove = (Z) => {
    if (!zRef.current) {
      return;
    }
    const C = zRef.current.getBoundingClientRect();
    const Q = (Z.clientX - C.left) / C.width;
    const q = (Z.clientY - C.top) / C.height;
    setG({
      x: (q - 0.5) * -22,
      y: (Q - 0.5) * 22,
    });
  };
  const onMouseLeave = () =>
    setG({
      x: 0,
      y: 0,
    });
  return (
    <button
      ref={zRef}
      onClick={() => {
        playClick();
        onClick();
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group rounded-2xl p-5 md:p-6 text-left transition-all relative overflow-hidden"
      style={{
        background: "rgba(14,22,64,.5)",
        border: `1px solid ${m_1.color}40`,
        transform: `perspective(600px) rotateX(${g.x}deg) rotateY(${g.y}deg) translateZ(10px)`,
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
        className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-3"
        style={{
          background: `linear-gradient(135deg, ${m_1.color}, ${m_1.color}88)`,
          transform: "translateZ(20px)",
          boxShadow: `0 0 20px ${m_1.color}40`,
        }}
      >
        <BookOpenIcon size={24} className="text-white" />
      </div>
      <h3
        className="text-white font-black text-sm md:text-base mb-1"
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
function AtComponent() {
  const [o, setO] = React.useState("select");
  const [g, setG] = React.useState(0);
  const [z, setZ] = React.useState(3);
  const [c, setC] = React.useState(0);
  const [Z, setZ_1] = React.useState(0);
  const [Q, setQ] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("wordninja_best") || "0");
    } catch {
      return 0;
    }
  });
  const [re, setRe] = React.useState("");
  const [se, setSe] = React.useState(0);
  const [V, setV] = React.useState("none");
  const [G, setG_1] = React.useState("idle");
  const [oe, setOe] = React.useState("");
  const [Ne, setNe] = React.useState(false);
  const [Ze, setZe] = React.useState(1);
  const [expression, setExpression] = React.useState("neutral");
  const [W, setW] = React.useState(false);
  const _RefRef = React.useRef(null);
  const bRef = React.useRef(null);
  const Se = g_1();
  const RRef = React.useRef(0);
  const fRef = React.useRef(0);
  const ORef = React.useRef(0);
  const BRef = React.useRef(3);
  const ieRef = React.useRef([]);
  const JRef = React.useRef([]);
  const MRef = React.useRef(0);
  const FRef = React.useRef({
    words: [],
    particles: [],
    slashes: [],
    floaters: [],
    petals: [],
    sparks: [],
    confetti: [],
    ninjaSlash: 0,
    lastSpawn: 0,
    spawnInterval: 2500,
    gameTime: 0,
    difficulty: 1,
  });
  const wRef = React.useRef(null);
  const leRef = React.useRef(null);
  const { playCorrect, playWrong, playWin, playLose, playClick, playSlice } = useSound();
  const $ = (t) => {
    setExpression(t);
    if (_RefRef.current) {
      clearTimeout(_RefRef.current);
    }
    _RefRef.current = setTimeout(() => setExpression("neutral"), 1500);
  };
  const Ce = (x, y, l) => {
    const d = [
      "#ff00aa",
      "#00d4ff",
      "#ffd600",
      "#39ff14",
      "#ff6b35",
      "#b829dd",
      "#ff2a6d",
      "#00f0ff",
      "#ffffff",
    ];
    const FRef_current = FRef.current;
    for (let s = 0; s < l; s++) {
      const r = Math.random() * Math.PI * 2;
      const v = 2 + Math.random() * 8;
      FRef_current.confetti.push({
        id: MRef.current++,
        x,
        y,
        vx: Math.cos(r) * v,
        vy: Math.sin(r) * v - 5,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 15,
        color: d[Math.floor(Math.random() * d.length)],
        size: 4 + Math.random() * 8,
        life: 1.5 + Math.random() * 1,
        shape: Math.random() > 0.5 ? "rect" : "circle",
      });
    }
  };
  const ee = React.useCallback((t) => {
    let p = t ? a(t) : a();
    if (p.length === 0) {
      setRe(
        'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
      );
      return;
    }
    const l = ve(
      p
        .filter((r) => r.espanol && r.chino)
        .map((r) => ({
          espanol: H(r.espanol),
          chino: r.chino,
        }))
        .filter((r) => r.espanol.length >= 3 && r.espanol.length <= 14),
    );
    if (l.length === 0) {
      setRe(
        'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
      );
      return;
    }
    let d = a();
    const i = ve(
      d
        .filter((r) => r.espanol && r.chino)
        .map((r) => ({
          espanol: H(r.espanol),
          chino: r.chino,
        }))
        .filter((r) => r.espanol.length >= 3 && r.espanol.length <= 14),
    );
    ieRef.current = l;
    JRef.current = i.filter((r) => !l.some((v) => v.espanol === r.espanol));
    const FRef_current = FRef.current;
    FRef_current.words = [];
    FRef_current.particles = [];
    FRef_current.slashes = [];
    FRef_current.floaters = [];
    FRef_current.petals = [];
    FRef_current.sparks = [];
    FRef_current.confetti = [];
    FRef_current.ninjaSlash = 0;
    FRef_current.lastSpawn = 0;
    FRef_current.spawnInterval = 2500;
    FRef_current.gameTime = 0;
    FRef_current.difficulty = 1;
    setG(0);
    setZ(3);
    setC(0);
    setZ_1(0);
    setZe(1);
    setW(false);
    RRef.current = 0;
    fRef.current = 0;
    ORef.current = 0;
    BRef.current = 3;
    MRef.current = 0;
    setRe("");
    setV("none");
    setG_1("idle");
    setOe("");
    setNe(false);
    setExpression("neutral");
    setO("playing");
  }, []);
  React.useEffect(() => {
    if (o !== "playing") {
      return;
    }
    let t;
    let p = performance.now();
    (() => {
      const i = bRef.current ? bRef.current.clientWidth : 800;
      const s = bRef.current ? bRef.current.clientHeight : 500;
      const r = [];
      for (let id = 0; id < 50; id++) {
        r.push({
          id,
          x: Math.random() * i,
          y: Math.random() * s,
          vx: (Math.random() - 0.5) * 0.8,
          vy: Math.random() * 0.6 + 0.3,
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 3,
          size: 5 + Math.random() * 14,
          opacity: Math.random() * 0.4 + 0.2,
          sway: Math.random() * 0.02,
          hue: Math.random() > 0.3 ? 340 + Math.random() * 20 : 20 + Math.random() * 20,
        });
      }
      FRef.current.petals = r;
    })();
    const d = (i) => {
      const s = Math.min(i - p, 50);
      p = i;
      const FRef_current = FRef.current;
      FRef_current.gameTime += s;
      FRef_current.difficulty = 1 + Math.min(FRef_current.gameTime / 60000, 2);
      if (i - FRef_current.lastSpawn > FRef_current.spawnInterval) {
        FRef_current.lastSpawn = i;
        const a = bRef.current ? bRef.current.clientWidth : 800;
        const h = bRef.current ? bRef.current.clientHeight : 500;
        const isDecoy = Math.random() < 0.3 && JRef.current.length > 0;
        const N = isDecoy ? JRef.current : ieRef.current;
        const y = N[Math.floor(Math.random() * N.length)];
        if (y && FRef_current.words.length < 8) {
          const E = y.chino.length * 20 + 40;
          FRef_current.words.push({
            id: MRef.current++,
            chino: y.chino,
            espanol: y.espanol,
            x: Math.random() * Math.max(20, a - E - 40) + 20,
            y: h + 40,
            speed: 0.6 + (FRef_current.difficulty - 1) * 0.3 + Math.random() * 0.3,
            isDecoy,
            wobble: 0,
            matched: false,
            sliced: false,
            sliceTime: 0,
            opacity: 1,
          });
        }
        FRef_current.spawnInterval = Math.max(1400, 3000 - (FRef_current.difficulty - 1) * 500);
      }
      let v = false;
      const A = bRef.current ? bRef.current.clientHeight : 500;
      FRef_current.words = FRef_current.words.filter((a) => {
        if (a.sliced) {
          return ((a.opacity -= 0.04), (a.y -= 2), a.opacity > 0);
        }
        return (
          (a.y -= a.speed * (s / 16)),
          (a.wobble *= 0.92),
          a.y < -40 ? (a.isDecoy || (v = true), false) : true
        );
      });
      if (
        v &&
        ((BRef.current = Math.max(0, BRef.current - 1)),
        setZ(BRef.current),
        (fRef.current = 0),
        setC(0),
        setZe(1),
        setW(false),
        setV("red"),
        setTimeout(() => setV("none"), 200),
        setG_1("hurt"),
        $("sad"),
        wRef.current && clearTimeout(wRef.current),
        (wRef.current = setTimeout(() => setG_1("idle"), 400)),
        BRef.current <= 0)
      ) {
        setO("gameover");
        playLose();
        setQ((a) => {
          const h = Math.max(a, RRef.current);
          try {
            localStorage.setItem("wordninja_best", String(h));
          } catch {}
          return h;
        });
        setZ_1(ORef.current);
        return;
      }
      FRef_current.particles = FRef_current.particles
        .map((a) => ({
          ...a,
          x: a.x + a.vx * (s / 16),
          y: a.y + a.vy * (s / 16),
          vy: a.vy + 0.12,
          life: a.life - 0.018,
          rotation: a.rotation + a.rotSpeed * (s / 16),
        }))
        .filter((a) => a.life > 0);
      FRef_current.sparks = FRef_current.sparks
        .map((a) => ({
          ...a,
          x: a.x + a.vx * (s / 16),
          y: a.y + a.vy * (s / 16),
          vy: a.vy + 0.08,
          life: a.life - 0.025,
        }))
        .filter((a) => a.life > 0);
      FRef_current.slashes = FRef_current.slashes
        .map((a) => ({
          ...a,
          life: a.life - 0.025,
        }))
        .filter((a) => a.life > 0);
      FRef_current.floaters = FRef_current.floaters
        .map((a) => ({
          ...a,
          y: a.y - 0.8 * (s / 16),
          life: a.life - 0.008,
          scale: a.scale + 0.005,
        }))
        .filter((a) => a.life > 0);
      FRef_current.confetti = FRef_current.confetti
        .map((a) => ({
          ...a,
          x: a.x + a.vx * (s / 16),
          y: a.y + a.vy * (s / 16),
          vy: a.vy + 0.15,
          rotation: a.rotation + a.rotSpeed * (s / 16),
          life: a.life - 0.012,
        }))
        .filter((a) => a.life > 0);
      const k = bRef.current ? bRef.current.clientWidth : 800;
      FRef_current.petals = FRef_current.petals.map((a) => {
        let h = a.x + (a.vx + Math.sin(FRef_current.gameTime * 0.001 + a.id) * a.sway * 50) * (s / 16);
        let x = a.y + a.vy * (s / 16);
        if (x > A + 20) {
          x = -20;
          h = Math.random() * k;
        }
        if (h > k + 20) {
          h = -20;
        }
        if (h < -20) {
          h = k + 20;
        }
        return {
          ...a,
          x: h,
          y: x,
          rotation: a.rotation + a.rotSpeed * (s / 16),
        };
      });
      if (FRef_current.ninjaSlash > 0) {
        FRef_current.ninjaSlash -= s / 16;
      }
      setSe((a) => a + 1);
      t = requestAnimationFrame(d);
    };
    t = requestAnimationFrame(d);
    return () => {
      cancelAnimationFrame(t);
      if (wRef.current) {
        clearTimeout(wRef.current);
      }
    };
  }, [o, playLose]);
  const onChange = (t) => {
    setOe(t.target.value);
  };
  const onKeyDown = (t) => {
    if (t.key !== "Enter") {
      return;
    }
    const p = H(oe);
    if (!p) {
      return;
    }
    const FRef_current = FRef.current;
    const d = FRef_current.words.find((i) => !i.sliced && H(i.espanol) === p);
    if (d) {
      if (d.isDecoy) {
        playWrong();
        fRef.current = 0;
        setC(0);
        setZe(1);
        setW(false);
        RRef.current = Math.max(0, RRef.current - 150);
        setG(RRef.current);
        setV("red");
        setTimeout(() => setV("none"), 300);
        setG_1("hurt");
        if (wRef.current) {
          clearTimeout(wRef.current);
        }
        wRef.current = setTimeout(() => setG_1("idle"), 400);
        $("sad");
        const x = d.x + 40;
        const N = d.y + 20;
        for (let y = 0; y < 25; y++) {
          const E = Math.random() * Math.PI * 2;
          const xe = 2 + Math.random() * 6;
          FRef_current.particles.push({
            id: MRef.current++,
            x,
            y: N,
            vx: Math.cos(E) * xe,
            vy: Math.sin(E) * xe - 2,
            life: 1,
            color: "#ff2a6d",
            size: 3 + Math.random() * 6,
            shape: Math.random() > 0.5 ? "shuriken" : "circle",
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 20,
          });
        }
        FRef_current.floaters.push({
          id: MRef.current++,
          x,
          y: N - 20,
          text: "-150 BOMBA!",
          color: "#ff2a6d",
          life: 1.5,
          scale: 1.2,
        });
        d.sliced = true;
        setOe("");
        return;
      }
      playCorrect();
      playSlice();
      const i = d.x + 40;
      const s = d.y + 20;
      d.sliced = true;
      fRef.current++;
      if (fRef.current > ORef.current) {
        ORef.current = fRef.current;
      }
      setC(fRef.current);
      const r = Math.min(1 + Math.floor(fRef.current / 3) * 0.5, 5);
      setZe(r);
      const A = Math.floor(100 * r);
      RRef.current += A;
      setG(RRef.current);
      const k = fRef.current >= 8;
      if (k) {
        setW(true);
      } else if (fRef.current < 5) {
        setW(false);
      }
      if (fRef.current >= 5) {
        setNe(true);
        setTimeout(() => setNe(false), 600);
      }
      const a = [
        "#ff00aa",
        "#00d4ff",
        "#ffd600",
        "#39ff14",
        "#ff6b35",
        "#b829dd",
        "#ffffff",
        "#ff2a6d",
        "#00f0ff",
      ];
      for (let x = 0; x < 60; x++) {
        const N = Math.random() * Math.PI * 2;
        const y = 2 + Math.random() * 12;
        FRef_current.particles.push({
          id: MRef.current++,
          x: i,
          y: s,
          vx: Math.cos(N) * y,
          vy: Math.sin(N) * y - 3,
          life: 1,
          color: a[x % a.length],
          size: 2 + Math.random() * 8,
          shape: x % 5 === 0 ? "shuriken" : x % 7 === 0 ? "star" : "circle",
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 25,
        });
      }
      for (let x = 0; x < 25; x++) {
        const N = Math.random() * Math.PI;
        const y = 4 + Math.random() * 12;
        FRef_current.sparks.push({
          id: MRef.current++,
          x: i,
          y: s,
          vx: Math.cos(N) * y,
          vy: Math.sin(N) * y - 4,
          life: 1,
          size: 1 + Math.random() * 5,
        });
      }
      if (k) {
        Ce(i, s, 40);
        setV("gold");
      } else {
        setV("green");
      }
      setTimeout(() => setV("none"), k ? 300 : 150);
      const angle = Math.random() * 60 - 30;
      FRef_current.slashes.push({
        id: MRef.current++,
        x: i,
        y: s,
        angle,
        life: 1,
        width: 140 + Math.random() * 80,
        color: k ? "#ffd600" : fRef.current >= 5 ? "#ff6b35" : "#00d4ff",
      });
      FRef_current.floaters.push({
        id: MRef.current++,
        x: i,
        y: s - 20,
        text: `+${A}`,
        color: k ? "#ffd600" : fRef.current >= 5 ? "#ff6b35" : "#00d4ff",
        life: 1.2,
        scale: 1,
      });
      if (fRef.current > 1) {
        FRef_current.floaters.push({
          id: MRef.current++,
          x: i,
          y: s - 45,
          text: `${fRef.current}x COMBO!`,
          color: k ? "#ffd600" : "#ff6b35",
          life: 1.5,
          scale: k ? 1.4 : 1.2,
        });
      }
      FRef_current.ninjaSlash = 15;
      setG_1("slash");
      if (wRef.current) {
        clearTimeout(wRef.current);
      }
      wRef.current = setTimeout(() => setG_1("idle"), 300);
      $(fRef.current >= 8 ? "excited" : "happy");
      setOe("");
    } else {
      playWrong();
      fRef.current = 0;
      setC(0);
      setZe(1);
      setW(false);
      setV("red");
      setTimeout(() => setV("none"), 200);
      $("sad");
      setOe("");
    }
  };
  const FRef_current = FRef.current;
  const { words, particles, slashes, floaters, petals, sparks, confetti } = FRef_current;
  const LeComponent = (t) => {
    if (t.shape === "shuriken") {
      return (
        <svg
          width={t.size * 2}
          height={t.size * 2}
          viewBox="0 0 20 20"
          style={{
            transform: `rotate(${t.rotation}deg)`,
            opacity: t.life,
          }}
        >
          <polygon points="10,0 12,7 20,10 12,13 10,20 8,13 0,10 8,7" fill={t.color} />
        </svg>
      );
    }
    if (t.shape === "star") {
      return (
        <svg
          width={t.size * 2}
          height={t.size * 2}
          viewBox="0 0 20 20"
          style={{
            transform: `rotate(${t.rotation}deg)`,
            opacity: t.life,
          }}
        >
          <polygon points="10,1 12,7 19,7 13,11 15,18 10,14 5,18 7,11 1,7 8,7" fill={t.color} />
        </svg>
      );
    }
    return null;
  };
  if (o === "select") {
    return (
      <StarfieldBackground>
        <div
          className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative"
          style={{
            perspective: "1000px",
          }}
        >
          <SoundToggles />
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/juegos"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
            >
              <ArrowLeftIcon size={16} /> Volver / 返回
            </Link>
            <div className="hidden md:flex items-center gap-2 pointer-events-none">
              <SparklesIcon size={14} className="text-[#ff00aa]" />
              <span className="text-xs text-white/30 font-medium">Modo Ninja / 忍者模式</span>
            </div>
          </div>
          <div
            className="text-center mb-8 md:mb-10"
            style={{
              perspective: "1000px",
            }}
          >
            <div
              className="relative w-24 h-24 md:w-28 md:h-28 mx-auto mb-4"
              style={{
                animation: "ninjaFloat 3s ease-in-out infinite",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #00d4ff)",
                  boxShadow:
                    "0 0 60px rgba(255,0,170,0.7), 0 0 100px rgba(0,212,255,0.4), inset 0 0 20px rgba(255,255,255,0.1)",
                  transform: "translateZ(30px)",
                }}
              >
                <SwordIcon size={40} className="text-white relative z-10 md:w-12 md:h-12" />
              </div>
              <div
                className="absolute -inset-1 rounded-2xl border-2 border-[#ff00aa40]"
                style={{
                  animation: "orbitRing 4s linear infinite",
                  transform: "translateZ(10px)",
                }}
              />
              <div
                className="absolute -inset-2 rounded-2xl border border-[#00d4ff30]"
                style={{
                  animation: "orbitRing 6s linear infinite reverse",
                  transform: "translateZ(20px)",
                }}
              />
              <div
                className="absolute -inset-4 rounded-3xl border border-[#ffd60020]"
                style={{
                  animation: "orbitRing 8s linear infinite",
                  transform: "translateZ(5px)",
                }}
              />
            </div>
            <h1
              className="text-4xl md:text-6xl font-black mb-3"
              style={{
                textShadow: "0 0 40px rgba(255,0,170,0.5), 0 0 80px rgba(255,0,170,0.2)",
                background: "linear-gradient(135deg,#ff00aa,#00d4ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "titleRotate3D 6s ease-in-out infinite",
                transformStyle: "preserve-3d",
              }}
            >
              <SwordIcon
                size={32}
                className="inline mr-2 md:mr-3 md:w-10 md:h-10"
                style={{
                  color: "#ff00aa",
                  filter: "drop-shadow(0 0 10px rgba(255,0,170,.5))",
                }}
              />
              Word Ninja
            </h1>
            <p className="text-white/40 text-sm md:text-base font-medium">
              Escribe la traducción española antes de que la palabra llegue arriba /
              在单词到达顶部前输入西班牙语翻译
            </p>
            <p
              className="text-[#ff2a6d] text-sm mt-2 font-bold"
              style={{
                textShadow: "0 0 10px rgba(255,42,109,.4)",
              }}
            >
              ¡CUIDADO con las palabras ROJAS! / 小心红色的单词！
            </p>
            {re && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold animate-shake"
                style={{
                  background: "rgba(255,42,109,.12)",
                  border: "1px solid rgba(255,42,109,.3)",
                  color: "#ff6b35",
                }}
              >
                {re}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            <button
              onClick={() => {
                setRe("");
                ee(null);
              }}
              className="group rounded-2xl p-5 md:p-6 text-left transition-all relative overflow-hidden"
              style={{
                background: "rgba(14,22,64,.5)",
                border: "1px solid rgba(255,0,170,.3)",
                transform: "perspective(600px) translateZ(10px)",
                transformStyle: "preserve-3d",
                boxShadow:
                  "0 10px 40px rgba(0,0,0,.4), 0 0 20px rgba(255,0,170,.15), 0 0 60px rgba(255,0,170,.05)",
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
                className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,0,170,0), rgba(255,0,170,.15), rgba(0,212,255,.15), rgba(0,212,255,0))",
                  animation: "borderRotate 3s linear infinite reverse",
                  zIndex: -1,
                }}
              />
              <div
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-3"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                  transform: "translateZ(25px)",
                  boxShadow: "0 0 20px rgba(255,0,170,.4), 0 0 40px rgba(255,0,170,.2)",
                }}
              >
                <LayersIcon
                  size={24}
                  className="text-white"
                  style={{
                    filter: "drop-shadow(0 0 4px rgba(255,255,255,.5))",
                  }}
                />
              </div>
              <h3
                className="text-white font-black text-sm md:text-base mb-1"
                style={{
                  transform: "translateZ(18px)",
                  textShadow: "0 0 10px rgba(255,0,170,.3)",
                }}
              >
                Todos los módulos
              </h3>
              <p
                className="text-xs font-medium mb-1"
                style={{
                  color: "rgba(255,0,170,.7)",
                  transform: "translateZ(12px)",
                }}
              >
                所有模块
              </p>
              <p
                className="text-xs font-medium text-white/40"
                style={{
                  transform: "translateZ(6px)",
                }}
              >
                Mezcla todo el vocabulario
              </p>
            </button>
            {Se.map((m) => (
              <QeComponent
                key={m.id}
                m={m}
                onClick={() => {
                  setRe("");
                  ee(m.id);
                }}
              />
            ))}
          </div>
          <div
            className="fixed bottom-4 right-4 z-50 pointer-events-none"
            style={{
              animation: "ninjaFloat 2.5s ease-in-out infinite",
            }}
          >
            <JeComponent expression={expression} scale={1.3} />
          </div>
          <style>{`
            @keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
            @keyframes nebulaPulse { 0%,100%{transform:scale(1);opacity:0.15} 50%{transform:scale(1.2);opacity:0.25} }
            @keyframes flashFade { from{opacity:1} to{opacity:0} }
            @keyframes overlayPop { 0%{transform:scale(0.8);opacity:0} 100%{transform:scale(1);opacity:1} }
            @keyframes fireFlicker { 0%,100%{opacity:0.3} 50%{opacity:0.7} }
            @keyframes fireRise { 0%{opacity:0; height:0} 50%{opacity:1; height:80px} 100%{opacity:0; height:100px} }
            @keyframes victoryGlow { from{opacity:.3} to{opacity:.6} }
            @keyframes ninjaFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
            @keyframes kawaii-float { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-4px) rotate(2deg)} }
            @keyframes kawaii-float-fast { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-6px) rotate(-2deg)} }
            @keyframes orbitRing { 0%{transform:rotate(0deg) scale(1.1)} 50%{transform:rotate(180deg) scale(1.25)} 100%{transform:rotate(360deg) scale(1.1)} }
            @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-5px)} 40%{transform:translateX(5px)} 60%{transform:translateX(-3px)} 80%{transform:translateX(3px)} }
            .animate-shake { animation: shake 0.5s ease-in-out; }
            @keyframes titleRotate3D { 0%{transform:perspective(800px) rotateY(-6deg) rotateX(2deg)} 50%{transform:perspective(800px) rotateY(6deg) rotateX(-2deg)} 100%{transform:perspective(800px) rotateY(-6deg) rotateX(2deg)} }
            @keyframes scorePulse3D { 0%,100%{transform:perspective(400px) translateZ(0) scale(1)} 50%{transform:perspective(400px) translateZ(30px) scale(1.08)} }
            @keyframes comboPopup3D { 0%{transform:perspective(600px) translateZ(-200px) scale(0.3) rotateX(45deg);opacity:0} 60%{transform:perspective(600px) translateZ(60px) scale(1.2) rotateX(-10deg);opacity:1} 100%{transform:perspective(600px) translateZ(0) scale(1) rotateX(0deg);opacity:1} }
            @keyframes slice3D { 0%{transform:perspective(500px) rotateX(0deg) translateZ(0) scale(1)} 50%{transform:perspective(500px) rotateX(45deg) translateZ(-40px) scale(0.95)} 100%{transform:perspective(500px) rotateX(90deg) translateZ(-100px) scale(0.7)} }
            @keyframes glowTrail { 0%{opacity:0;transform:translateX(-20px) scaleX(0.5)} 50%{opacity:1;transform:translateX(0) scaleX(1)} 100%{opacity:0;transform:translateX(20px) scaleX(0.5)} }
            @keyframes inputGlow { 0%,100%{box-shadow:0 0 15px rgba(255,0,170,.2),0 0 30px rgba(0,212,255,.1),inset 0 0 10px rgba(255,0,170,.05)} 50%{box-shadow:0 0 25px rgba(255,0,170,.4),0 0 50px rgba(0,212,255,.2),inset 0 0 15px rgba(255,0,170,.1)} }
            @keyframes cardHover3D { 0%{transform:perspective(600px) rotateX(0) rotateY(0) translateZ(0)} 100%{transform:perspective(600px) rotateX(5deg) rotateY(-5deg) translateZ(20px)} }
            @keyframes neonPulse { 0%{box-shadow:0 0 10px rgba(255,0,170,.4)} 100%{box-shadow:0 0 25px rgba(255,0,170,.7)} }
            @keyframes neonPulseRed { 0%{box-shadow:0 0 10px rgba(255,42,109,.3)} 100%{box-shadow:0 0 25px rgba(255,42,109,.6)} }
            @keyframes wordFloat3D { 0%,100%{transform:translateY(0) rotateX(0deg)} 50%{transform:translateY(-6px) rotateX(3deg)} }
            @keyframes particleOrbit3D { 0%{transform:perspective(500px) rotateY(0deg) translateZ(40px) rotate(0deg)} 100%{transform:perspective(500px) rotateY(360deg) translateZ(40px) rotate(360deg)} }
            @keyframes cursorGlow { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.2)} }
            @keyframes shadowPulse { 0%,100%{transform:scale(1);opacity:.3} 50%{transform:scale(1.3);opacity:.1} }
          `}</style>
        </div>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <div className="max-w-5xl mx-auto px-3 md:px-4 py-3 md:py-4 min-h-screen relative z-10">
        <SoundToggles />
        <div
          className="flex items-center justify-between mb-2 md:mb-3 flex-wrap gap-2"
          style={{
            perspective: "800px",
          }}
        >
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-xs md:text-sm font-bold"
          >
            <ArrowLeftIcon size={14} /> Volver / 返回
          </Link>
          <div
            className="flex items-center gap-1.5 md:gap-2 flex-wrap"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <button
              onClick={() => {
                playClick();
                setO("select");
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 md:px-3 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "#fff",
              }}
            >
              <LayersIcon size={12} /> Cambiar / 切换
            </button>
            <div
              className="px-2.5 py-1.5 md:px-3 rounded-full text-[10px] md:text-xs font-bold"
              style={{
                background: "rgba(255,0,170,.1)",
                border: "1px solid rgba(255,0,170,.2)",
                color: "#ff00aa",
                boxShadow: "0 0 10px rgba(255,0,170,.2), 0 0 30px rgba(255,0,170,.1)",
                transform: "translateZ(25px)",
                animation: "scorePulse3D 2s ease-in-out infinite",
                textShadow: "0 0 8px rgba(255,0,170,.5)",
              }}
            >
              <ZapIcon
                size={12}
                className="inline mr-1"
                style={{
                  filter: "drop-shadow(0 0 3px rgba(255,0,170,.6))",
                }}
              />{" "}
              {g}
            </div>
            {c > 1 && (
              <div
                className="px-2.5 py-1.5 md:px-3 rounded-full text-[10px] md:text-xs font-bold animate-pulse"
                style={{
                  background: c >= 5 ? "rgba(255,107,53,.15)" : "rgba(255,107,53,.1)",
                  border: `1px solid ${c >= 5 ? "rgba(255,107,53,.4)" : "rgba(255,107,53,.2)"}`,
                  color: "#ff6b35",
                  boxShadow: c >= 5 ? "0 0 15px rgba(255,107,53,.3), 0 0 40px rgba(255,107,53,.15)" : "none",
                  transform: "translateZ(20px) rotateX(-5deg)",
                  textShadow: "0 0 8px rgba(255,107,53,.4)",
                }}
              >
                <FlameIcon
                  size={12}
                  className="inline mr-1"
                  style={{
                    filter: "drop-shadow(0 0 3px rgba(255,107,53,.6))",
                  }}
                />{" "}
                x{c}
              </div>
            )}
            <div
              className="px-2.5 py-1.5 md:px-3 rounded-full text-[10px] md:text-xs font-bold flex items-center gap-1"
              style={{
                background: "rgba(255,42,109,.1)",
                border: "1px solid rgba(255,42,109,.2)",
                color: "#ff2a6d",
                transform: "translateZ(15px)",
              }}
            >
              {Array.from({
                length: 3,
              }).map((t, p) => (
                <HeartIcon
                  key={p}
                  size={12}
                  fill={p < z ? "#ff2a6d" : "transparent"}
                  color={p < z ? "#ff2a6d" : "rgba(255,255,255,.2)"}
                  style={{
                    filter:
                      p < z
                        ? "drop-shadow(0 0 6px rgba(255,42,109,.8)) drop-shadow(0 0 12px rgba(255,42,109,.4))"
                        : "none",
                    transform: "translateZ(5px)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div
          className="text-center mb-2 md:mb-3"
          style={{
            perspective: "600px",
          }}
        >
          <h1
            className="text-2xl md:text-4xl font-black mb-1"
            style={{
              background: "linear-gradient(135deg,#ff00aa,#00d4ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(255,0,170,.5))",
              transform: "translateZ(20px) rotateX(5deg)",
              textShadow: "0 0 40px rgba(255,0,170,.3)",
              animation: "titleRotate3D 8s ease-in-out infinite",
            }}
          >
            Word Ninja
          </h1>
          <p
            className="text-white/40 text-xs md:text-sm font-medium"
            style={{
              transform: "translateZ(10px)",
            }}
          >
            Escribe la traducción en ESPAÑOL / 输入西班牙语翻译
          </p>
        </div>
        {c > 1 && (
          <div
            className="max-w-md mx-auto mb-2 md:mb-3"
            style={{
              perspective: "500px",
            }}
          >
            <div
              className="h-2 md:h-2.5 rounded-full overflow-hidden relative"
              style={{
                background: "rgba(255,255,255,.08)",
                boxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
                transform: "translateZ(10px) rotateX(5deg)",
              }}
            >
              <div
                className="h-full rounded-full transition-all relative"
                style={{
                  width: `${String(Math.min(100, c * 10))}%`,
                  background:
                    c > 8
                      ? "linear-gradient(90deg, #ff00aa, #ff6b35, #ffd600)"
                      : c > 4
                        ? "linear-gradient(90deg, #ff6b35, #ffd600)"
                        : "linear-gradient(90deg, #00d4ff, #39ff14)",
                  boxShadow:
                    c > 5
                      ? "0 0 20px rgba(255,0,170,.6), 0 0 40px rgba(255,107,53,.3), 0 0 60px rgba(255,214,0,.2)"
                      : "0 0 10px rgba(0,212,255,.3)",
                  animation: c >= 5 ? "neonPulse 1s ease-in-out infinite alternate" : "none",
                }}
              >
                {c >= 5 && (
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,.4), transparent)",
                      animation: "fireFlicker 0.3s ease-in-out infinite",
                    }}
                  />
                )}
              </div>
            </div>
            <div className="text-center mt-0.5">
              <span
                className="text-xs md:text-sm font-black"
                style={{
                  color: c >= 5 ? "#ff6b35" : "#00d4ff",
                  textShadow:
                    c >= 5
                      ? "0 0 10px rgba(255,107,53,.6), 0 0 20px rgba(255,107,53,.3)"
                      : "0 0 10px rgba(0,212,255,.3)",
                  transform: "translateZ(15px)",
                }}
              >
                {c >= 5 ? `🔥 MULTIPLICADOR x${Ze.toFixed(1)}` : `Combo x${c}`}
              </span>
            </div>
          </div>
        )}
        <div
          ref={bRef}
          className="relative mx-auto rounded-2xl overflow-hidden border-2"
          style={{
            height: "min(55vh, 520px)",
            minHeight: "280px",
            background: "linear-gradient(180deg, rgba(5,8,27,.95), rgba(14,22,64,.85), rgba(8,12,40,.95))",
            backdropFilter: "blur(14px)",
            boxShadow: W
              ? "0 0 80px rgba(255,214,0,.3), 0 0 120px rgba(255,0,170,.2), 0 20px 60px rgba(0,0,0,.4)"
              : "0 0 60px rgba(255,0,170,.15), 0 20px 60px rgba(0,0,0,.4)",
            border: W ? "2px solid rgba(255,214,0,.5)" : "2px solid rgba(255,0,170,.3)",
            transition: "box-shadow 0.3s, border-color 0.3s",
            touchAction: "manipulation",
          }}
          onClick={() => leRef.current?.focus()}
        >
          {V === "green" && (
            <div
              className="absolute inset-0 pointer-events-none z-40"
              style={{
                background: "rgba(0,255,100,.15)",
                animation: "flashFade 0.15s ease-out forwards",
              }}
            />
          )}
          {V === "red" && (
            <div
              className="absolute inset-0 pointer-events-none z-40"
              style={{
                background: "rgba(255,0,0,.18)",
                animation: "flashFade 0.2s ease-out forwards",
              }}
            />
          )}
          {V === "gold" && (
            <div
              className="absolute inset-0 pointer-events-none z-40"
              style={{
                background: "rgba(255,214,0,.15)",
                animation: "flashFade 0.3s ease-out forwards",
              }}
            />
          )}
          {Ne && (
            <div
              className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-35"
              style={{
                background: "linear-gradient(0deg, rgba(255,100,0,.35), transparent)",
                animation: "fireRise 0.5s ease-out",
              }}
            />
          )}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              perspective: "600px",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="absolute rounded-full opacity-25"
              style={{
                width: 400,
                height: 400,
                left: "10%",
                top: "10%",
                background: "radial-gradient(circle, rgba(255,0,170,.3), transparent 70%)",
                filter: "blur(60px)",
                animation: "nebulaPulse 7s ease-in-out infinite",
                transform: "translateZ(-40px)",
              }}
            />
            <div
              className="absolute rounded-full opacity-20"
              style={{
                width: 350,
                height: 350,
                right: "15%",
                top: "30%",
                background: "radial-gradient(circle, rgba(0,212,255,.3), transparent 70%)",
                filter: "blur(50px)",
                animation: "nebulaPulse 9s ease-in-out infinite 3s",
                transform: "translateZ(-20px)",
              }}
            />
            <div
              className="absolute rounded-full opacity-15"
              style={{
                width: 300,
                height: 300,
                left: "50%",
                bottom: "10%",
                background: "radial-gradient(circle, rgba(255,214,0,.2), transparent 70%)",
                filter: "blur(55px)",
                animation: "nebulaPulse 8s ease-in-out infinite 1.5s",
                transform: "translateZ(-60px)",
              }}
            />
            <div
              className="absolute rounded-full opacity-10"
              style={{
                width: 200,
                height: 200,
                left: "30%",
                top: "50%",
                background: "radial-gradient(circle, rgba(57,255,20,.25), transparent 70%)",
                filter: "blur(40px)",
                animation: "nebulaPulse 10s ease-in-out infinite 2s",
                transform: "translateZ(-80px)",
              }}
            />
            <div
              className="absolute"
              style={{
                left: "20%",
                top: "20%",
                animation: "particleOrbit3D 12s linear infinite",
                transform: "translateZ(20px)",
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "#00d4ff",
                  boxShadow: "0 0 10px #00d4ff, 0 0 20px #00d4ff88",
                }}
              />
            </div>
            <div
              className="absolute"
              style={{
                left: "70%",
                top: "40%",
                animation: "particleOrbit3D 15s linear infinite reverse",
                transform: "translateZ(30px)",
              }}
            >
              <div
                style={{
                  width: 3,
                  height: 3,
                  borderRadius: "50%",
                  background: "#ff00aa",
                  boxShadow: "0 0 8px #ff00aa, 0 0 16px #ff00aa88",
                }}
              />
            </div>
            <div
              className="absolute"
              style={{
                left: "40%",
                top: "70%",
                animation: "particleOrbit3D 18s linear infinite",
                transform: "translateZ(15px)",
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#ffd600",
                  boxShadow: "0 0 12px #ffd600, 0 0 24px #ffd60088",
                }}
              />
            </div>
            <div
              className="absolute"
              style={{
                left: "80%",
                top: "15%",
                animation: "particleOrbit3D 10s linear infinite reverse",
                transform: "translateZ(25px)",
              }}
            >
              <div
                style={{
                  width: 3,
                  height: 3,
                  borderRadius: "50%",
                  background: "#39ff14",
                  boxShadow: "0 0 8px #39ff14, 0 0 16px #39ff1488",
                }}
              />
            </div>
            <div
              className="absolute"
              style={{
                left: "10%",
                top: "60%",
                animation: "particleOrbit3D 14s linear infinite",
                transform: "translateZ(10px)",
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "#ff6b35",
                  boxShadow: "0 0 10px #ff6b35, 0 0 20px #ff6b3588",
                }}
              />
            </div>
          </div>
          <div
            className="absolute top-2 left-2 pointer-events-none opacity-20 z-0"
            style={{
              animation: "orbitRing 8s linear infinite",
              transform: "translateZ(30px)",
              filter: "drop-shadow(0 0 8px rgba(255,0,170,.5))",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 20 20">
              <polygon points="10,0 12,7 20,10 12,13 10,20 8,13 0,10 8,7" fill="#ff00aa" />
            </svg>
          </div>
          <div
            className="absolute top-4 right-4 pointer-events-none opacity-15 z-0"
            style={{
              animation: "orbitRing 10s linear infinite reverse",
              transform: "translateZ(20px)",
              filter: "drop-shadow(0 0 8px rgba(0,212,255,.5))",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 20 20">
              <polygon points="10,0 12,7 20,10 12,13 10,20 8,13 0,10 8,7" fill="#00d4ff" />
            </svg>
          </div>
          <div
            className="absolute bottom-8 left-8 pointer-events-none opacity-10 z-0"
            style={{
              animation: "orbitRing 12s linear infinite",
              transform: "translateZ(25px)",
              filter: "drop-shadow(0 0 6px rgba(255,214,0,.4))",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 20 20">
              <polygon points="10,0 12,7 20,10 12,13 10,20 8,13 0,10 8,7" fill="#ffd600" />
            </svg>
          </div>
          {petals.map((t) => (
            <div
              key={t.id}
              className="absolute pointer-events-none z-10"
              style={{
                left: t.x,
                top: t.y,
                width: t.size,
                height: t.size,
                opacity: t.opacity,
                transform: `rotate(${t.rotation}deg) translateZ(${t.size * 0.5}px)`,
              }}
            >
              <svg
                viewBox="0 0 20 20"
                width={t.size}
                height={t.size}
                style={{
                  opacity: t.opacity,
                }}
              >
                <path
                  d="M10 2 C12 8, 18 10, 10 18 C2 10, 8 8, 10 2"
                  fill={`hsl(${t.hue}, 80%, 75%)`}
                  opacity={0.6}
                />
                <path
                  d="M10 2 C10 8, 16 12, 10 18 C4 12, 10 8, 10 2"
                  fill={`hsl(${t.hue + 10}, 80%, 80%)`}
                  opacity={0.4}
                />
                <path d="M10 2 L10 18" stroke={`hsl(${t.hue}, 70%, 60%)`} strokeWidth="0.5" opacity={0.5} />
              </svg>
            </div>
          ))}
          {words.map((t) => {
            const { matched, sliced } = t;
            const d = (t.id % 4) * 12 + 8;
            const i = sliced ? 90 : (t.y / 520) * 8 - 4;
            const s = 1 + (t.y / 520) * 0.3;
            const r = 0.15 + (t.y / 520) * 0.1;
            return (
              <div
                key={t.id}
                className="absolute flex flex-col items-center justify-center px-4 py-2 md:px-5 md:py-3 rounded-2xl font-black select-none"
                style={{
                  left: t.x + (t.wobble > 0 ? (Math.random() - 0.5) * t.wobble * 2 : 0),
                  top: t.y,
                  transform: `scale(${matched ? 1.05 : 1}) translateZ(${d}px) rotateX(${i}deg) rotateY(${((t.id % 3) - 1) * 3}deg) ${sliced ? "rotateZ(90deg) scale(0.9)" : "rotateZ(0deg)"}`,
                  transition: "transform 0.15s ease-out, opacity 0.3s ease-out",
                  zIndex: 20 + Math.floor(t.y) + d,
                  opacity: t.opacity,
                  background: t.isDecoy
                    ? "rgba(255,42,109,.18)"
                    : matched
                      ? "rgba(0,212,255,.2)"
                      : "rgba(255,255,255,.08)",
                  border: t.isDecoy
                    ? "2px solid rgba(255,42,109,.8)"
                    : matched
                      ? "2px solid rgba(0,212,255,.6)"
                      : "2px solid rgba(255,255,255,.2)",
                  boxShadow: t.isDecoy
                    ? "0 0 25px rgba(255,42,109,.5), 0 0 50px rgba(255,42,109,.2), 0 0 80px rgba(255,42,109,.1), inset 0 0 15px rgba(255,42,109,.15)"
                    : matched
                      ? "0 0 25px rgba(0,212,255,.4), 0 0 50px rgba(0,212,255,.15), 0 0 80px rgba(0,212,255,.08), inset 0 0 15px rgba(0,212,255,.08)"
                      : "0 0 15px rgba(255,255,255,.06), 0 4px 20px rgba(0,0,0,.2), 0 8px 40px rgba(0,0,0,.15)",
                  minWidth: 70,
                  backdropFilter: "blur(8px)",
                  animation: t.isDecoy ? "neonPulseRed 1.5s ease-in-out infinite alternate" : "none",
                  transformStyle: "preserve-3d",
                }}
              >
                {!sliced && (
                  <div
                    className="absolute -inset-1 rounded-2xl pointer-events-none"
                    style={{
                      background: t.isDecoy
                        ? "linear-gradient(90deg, rgba(255,42,109,0), rgba(255,42,109,.3), rgba(255,42,109,0))"
                        : "linear-gradient(90deg, rgba(0,212,255,0), rgba(0,212,255,.2), rgba(255,0,170,.2), rgba(0,212,255,0))",
                      opacity: 0.6,
                      filter: "blur(6px)",
                      transform: `translateZ(-${d}px)`,
                      animation: "glowTrail 2s ease-in-out infinite",
                    }}
                  />
                )}
                {!sliced && (
                  <div
                    className="absolute rounded-2xl pointer-events-none"
                    style={{
                      width: "100%",
                      height: "100%",
                      background: `rgba(0,0,0,${r})`,
                      filter: "blur(8px)",
                      transform: `translateZ(-${d + 20}px) translateY(12px) scale(${s})`,
                      zIndex: -1,
                    }}
                  />
                )}
                <span
                  className="text-sm md:text-lg tracking-wider"
                  style={{
                    textShadow: t.isDecoy
                      ? "0 0 12px rgba(255,42,109,.8), 0 0 24px rgba(255,42,109,.4), 0 0 48px rgba(255,42,109,.2)"
                      : "0 0 8px rgba(255,255,255,.3), 0 0 16px rgba(255,255,255,.15)",
                    color: t.isDecoy ? "#ff2a6d" : "#fff",
                    transform: "translateZ(5px)",
                  }}
                >
                  {t.chino}
                </span>
                {t.isDecoy && (
                  <span
                    className="text-[9px] md:text-[10px] font-bold mt-0.5 animate-pulse"
                    style={{
                      color: "#ff2a6d",
                      textShadow: "0 0 5px rgba(255,42,109,.6), 0 0 10px rgba(255,42,109,.3)",
                      transform: "translateZ(3px)",
                    }}
                  >
                    ¡BOMBA!
                  </span>
                )}
              </div>
            );
          })}
          {slashes.map((t) => (
            <div
              key={t.id}
              className="absolute pointer-events-none z-50"
              style={{
                left: t.x - t.width / 2,
                top: t.y - 2,
                width: t.width,
                height: 4,
                transform: `perspective(400px) rotate(${t.angle}deg) rotateX(${t.life * 20}deg) translateZ(${t.life * 30}px) scaleX(${t.life})`,
                opacity: t.life,
                background: `linear-gradient(90deg, transparent, ${t.color}, #ffffff, ${t.color}, transparent)`,
                boxShadow: `0 0 20px ${t.color}, 0 0 40px ${t.color}88, 0 0 80px ${t.color}44, 0 0 120px ${t.color}22`,
                borderRadius: 2,
                transformOrigin: "center",
              }}
            />
          ))}
          {sparks.map((t) => (
            <div
              key={t.id}
              className="absolute rounded-full pointer-events-none z-50"
              style={{
                left: t.x,
                top: t.y,
                width: t.size,
                height: t.size,
                background: "#ffd600",
                boxShadow: `0 0 ${t.size * 3}px #ffd600, 0 0 ${t.size * 5}px #ff6b35, 0 0 ${t.size * 8}px #ff2a6d, 0 0 ${t.size * 12}px #ff00aa44`,
                opacity: t.life,
                transform: "translateZ(30px)",
              }}
            />
          ))}
          {particles.map((t) => (
            <div
              key={t.id}
              className="absolute pointer-events-none z-50"
              style={{
                left: t.x,
                top: t.y,
                width: t.size * 2,
                height: t.size * 2,
                opacity: t.life,
                transform: `translate(-50%, -50%) translateZ(${t.size * 3}px)`,
              }}
            >
              {t.shape === "circle" ? (
                <div
                  className="rounded-full w-full h-full"
                  style={{
                    background: t.color,
                    boxShadow: `0 0 ${t.size * 3}px ${t.color}, 0 0 ${t.size * 6}px ${t.color}88, 0 0 ${t.size * 10}px ${t.color}44`,
                  }}
                />
              ) : (
                LeComponent(t)
              )}
            </div>
          ))}
          {confetti.map((t) => (
            <div
              key={t.id}
              className="absolute pointer-events-none z-50"
              style={{
                left: t.x,
                top: t.y,
                width: t.size,
                height: t.size * (t.shape === "rect" ? 0.6 : 1),
                background: t.color,
                opacity: t.life,
                transform: `perspective(200px) rotateX(${t.rotation * 0.5}deg) rotateY(${t.rotation * 0.3}deg) rotateZ(${t.rotation}deg) translate(-50%, -50%) translateZ(${t.size * 2}px)`,
                boxShadow: `0 0 ${t.size}px ${t.color}88, 0 0 ${t.size * 2}px ${t.color}44`,
                borderRadius: t.shape === "circle" ? "50%" : "2px",
              }}
            />
          ))}
          {floaters.map((t) => (
            <div
              key={t.id}
              className="absolute pointer-events-none z-50 font-black text-sm md:text-lg"
              style={{
                left: t.x,
                top: t.y,
                color: t.color,
                opacity: t.life,
                transform: `perspective(400px) translateZ(${t.scale * 30}px) scale(${t.scale}) rotateX(${t.scale * 10}deg)`,
                textShadow: `0 0 12px ${t.color}, 0 0 24px ${t.color}88, 0 0 48px ${t.color}44, 0 0 80px ${t.color}22`,
              }}
            >
              {t.text}
            </div>
          ))}
          <div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none z-30 transition-transform duration-100"
            style={{
              transform: `translateX(-50%) ${G === "slash" ? "translateY(-10px) scale(1.05)" : G === "hurt" ? "translateY(4px) rotate(8deg)" : "translateY(0) scale(1)"}`,
            }}
          >
            <div
              className="relative"
              style={{
                width: 60,
                height: 80,
                perspective: "200px",
              }}
            >
              <div
                className="absolute left-1/2 -translate-x-1/2 top-0 w-5 h-5 md:w-6 md:h-6 rounded-full"
                style={{
                  background: "linear-gradient(180deg, #1a1a2e, #0f0f1a)",
                  border: "1px solid rgba(255,0,170,.3)",
                  boxShadow: "0 0 15px rgba(255,0,170,.4)",
                  transform: "translateZ(10px)",
                }}
              />
              <div
                className="absolute left-1/2 -translate-x-1/2 top-3 md:top-3.5 w-6 h-1.5 md:w-7 md:h-2 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #ff00aa, #00d4ff)",
                  boxShadow: "0 0 10px rgba(255,0,170,.6)",
                  transform: "translateZ(12px)",
                }}
              />
              <div
                className="absolute left-[55%] top-3 md:top-3.5 w-4 h-1 md:w-5 md:h-1.5 rounded-full origin-left"
                style={{
                  background: "#ff00aa",
                  transform: `rotate(${25 + Math.sin(se * 0.1) * 12}deg) translateZ(8px)`,
                  opacity: 0.9,
                }}
              />
              <div
                className="absolute left-[58%] top-4 md:top-4.5 w-3 h-1 md:w-4 md:h-1 rounded-full origin-left"
                style={{
                  background: "#00d4ff",
                  transform: `rotate(${35 + Math.sin(se * 0.15) * 10}deg) translateZ(6px)`,
                  opacity: 0.8,
                }}
              />
              <div
                className="absolute left-1/2 -translate-x-1/2 top-6 md:top-7 w-8 h-10 md:w-10 md:h-12 rounded-lg"
                style={{
                  background: "linear-gradient(180deg, #1a1a2e, #0f0f1a)",
                  border: "1px solid rgba(0,212,255,.25)",
                  boxShadow: "0 0 20px rgba(0,212,255,.2)",
                  transform: "translateZ(8px)",
                }}
              >
                <div
                  className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-2 md:w-4 md:h-3 rounded-sm"
                  style={{
                    background: "rgba(0,212,255,.15)",
                    border: "1px solid rgba(0,212,255,.2)",
                  }}
                />
              </div>
              <div
                className="absolute left-[8%] top-7 md:top-8 w-3 h-8 md:w-3.5 md:h-9 rounded-full origin-top"
                style={{
                  background: "linear-gradient(180deg, #1a1a2e, #0f0f1a)",
                  transform:
                    G === "slash"
                      ? "rotate(-55deg) rotateX(20deg) translateZ(5px)"
                      : "rotate(15deg) translateZ(4px)",
                  transition: "transform 0.15s",
                  border: "1px solid rgba(255,255,255,.08)",
                }}
              />
              <div
                className="absolute right-[8%] top-7 md:top-8 w-3 h-8 md:w-3.5 md:h-9 rounded-full origin-top"
                style={{
                  background: "linear-gradient(180deg, #1a1a2e, #0f0f1a)",
                  transform:
                    G === "slash"
                      ? "rotate(55deg) rotateX(20deg) translateZ(5px)"
                      : "rotate(-15deg) translateZ(4px)",
                  transition: "transform 0.15s",
                  border: "1px solid rgba(255,255,255,.08)",
                }}
              />
              <div
                className="absolute right-[-10px] md:right-[-12px] top-4 md:top-5 w-1 md:w-1.5 h-16 md:h-20 rounded-full origin-bottom z-10"
                style={{
                  background: "linear-gradient(180deg, #c0c0c0, #ffffff, #c0c0c0)",
                  transform:
                    G === "slash"
                      ? "rotate(-70deg) translateY(-6px) translateZ(15px)"
                      : "rotate(-20deg) translateZ(10px)",
                  transition: "transform 0.15s",
                  boxShadow:
                    "0 0 20px rgba(0,212,255,.8), 0 0 40px rgba(255,255,255,.4), 0 0 80px rgba(0,212,255,.2)",
                  opacity: 0.95,
                }}
              >
                <div
                  className="absolute bottom-3 -left-2 w-4 md:w-5 h-1 md:h-1.5 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #ffd600, #ff6b35)",
                    boxShadow: "0 0 10px rgba(255,214,0,.6)",
                  }}
                />
                <div
                  className="absolute bottom-0 -left-1 w-2 md:w-3 h-5 md:h-6 rounded-full"
                  style={{
                    background: "linear-gradient(180deg, #2a1a0a, #1a0a00)",
                    border: "1px solid rgba(180,140,80,.3)",
                  }}
                />
              </div>
              <div
                className="absolute left-[22%] top-[60%] md:top-[68%] w-2.5 h-8 md:w-3 md:h-10 rounded-full origin-top"
                style={{
                  background: "linear-gradient(180deg, #1a1a2e, #0f0f1a)",
                  transform: "rotate(-6deg) translateZ(2px)",
                  border: "1px solid rgba(255,255,255,.06)",
                }}
              />
              <div
                className="absolute right-[22%] top-[60%] md:top-[68%] w-2.5 h-8 md:w-3 md:h-10 rounded-full origin-top"
                style={{
                  background: "linear-gradient(180deg, #1a1a2e, #0f0f1a)",
                  transform: "rotate(6deg) translateZ(2px)",
                  border: "1px solid rgba(255,255,255,.06)",
                }}
              />
            </div>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-px pointer-events-none z-20"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,0,170,.4), rgba(0,212,255,.4), rgba(255,214,0,.4), transparent)",
              boxShadow:
                "0 0 15px rgba(255,0,170,.3), 0 0 30px rgba(0,212,255,.2), 0 0 60px rgba(255,0,170,.15)",
              transform: "translateZ(10px)",
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none z-20"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,42,109,.3), rgba(255,0,170,.3), transparent)",
              boxShadow: "0 0 10px rgba(255,42,109,.2), 0 0 20px rgba(255,42,109,.1)",
              transform: "translateZ(10px)",
            }}
          />
        </div>
        <div
          className="max-w-md mx-auto mt-3 md:mt-4"
          style={{
            perspective: "500px",
          }}
        >
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(180deg, rgba(14,22,64,.7), rgba(5,8,27,.55))",
              border: W ? "2px solid rgba(255,214,0,.4)" : "2px solid rgba(255,0,170,.3)",
              backdropFilter: "blur(14px)",
              boxShadow: W
                ? "0 0 40px rgba(255,214,0,.2), 0 20px 60px rgba(0,0,0,.3), 0 0 80px rgba(255,214,0,.1)"
                : "0 0 40px rgba(255,0,170,.15), 0 20px 60px rgba(0,0,0,.3), 0 0 60px rgba(255,0,170,.08)",
              transition: "border-color 0.3s, box-shadow 0.3s",
              transform: "translateZ(10px) rotateX(3deg)",
              transformStyle: "preserve-3d",
              animation: "inputGlow 3s ease-in-out infinite",
            }}
          >
            <div
              className="absolute -inset-[1px] rounded-2xl pointer-events-none z-0 opacity-70"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,0,170,0), rgba(255,0,170,.6), rgba(0,212,255,.6), rgba(255,0,170,0))",
                backgroundSize: "200% 100%",
                animation: "borderRotate 3s linear infinite",
              }}
            />
            <input
              ref={leRef}
              type="text"
              value={oe}
              onChange={onChange}
              onKeyDown={onKeyDown}
              placeholder="Escribe la traducción española... / 输入西班牙语翻译..."
              className="w-full px-4 md:px-6 py-3 md:py-4 bg-transparent text-white font-bold text-center outline-none placeholder-white/30 uppercase text-sm md:text-base relative z-10 min-h-[48px]"
              autoFocus
              style={{
                textShadow: "0 0 10px rgba(255,255,255,.2), 0 0 20px rgba(255,255,255,.1)",
                transform: "translateZ(5px)",
              }}
            />
            {W && (
              <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,214,0,.05), transparent)",
                  animation: "borderRotate 1s linear infinite",
                }}
              />
            )}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px pointer-events-none z-10"
              style={{
                width: "60%",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,0,170,.6), rgba(0,212,255,.6), rgba(255,0,170,.6), transparent)",
                boxShadow: "0 0 10px rgba(255,0,170,.4), 0 0 20px rgba(0,212,255,.2)",
              }}
            />
          </div>
          <p
            className="text-center text-[10px] md:text-xs text-white/30 mt-2"
            style={{
              transform: "translateZ(5px)",
            }}
          >
            Presiona Enter para cortar / 按回车切割
          </p>
        </div>
        {o === "gameover" && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.88)",
              backdropFilter: "blur(20px)",
              perspective: "800px",
            }}
          >
            <div
              className="text-center p-6 md:p-8 rounded-3xl max-w-sm mx-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.8),rgba(5,8,27,.6))",
                border: "2px solid rgba(255,0,170,.3)",
                boxShadow:
                  "0 0 80px rgba(255,0,170,.25), 0 0 120px rgba(0,212,255,.15), 0 0 160px rgba(255,0,170,.1)",
                animation: "overlayPop 0.5s cubic-bezier(.2,.9,.2,1)",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-60"
                style={{
                  background: "linear-gradient(135deg,#ff00aa,#00d4ff)",
                  filter: "blur(25px)",
                  animation: "victoryGlow 2s ease-in-out infinite alternate",
                }}
              />
              <SwordIcon
                size={48}
                className="mx-auto mb-4 md:w-14 md:h-14"
                style={{
                  color: "#00d4ff",
                  filter: "drop-shadow(0 0 20px rgba(0,212,255,.6))",
                  transform: "translateZ(40px)",
                }}
              />
              <h2
                className="text-2xl md:text-3xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg,#ff00aa,#00d4ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  transform: "translateZ(30px)",
                  textShadow: "0 0 40px rgba(255,0,170,.3)",
                }}
              >
                ¡Ninja Terminado!
              </h2>
              <p
                className="text-white/50 text-sm mb-5 md:mb-6"
                style={{
                  transform: "translateZ(20px)",
                }}
              >
                忍者结束了！
              </p>
              <div
                className="grid grid-cols-2 gap-2 md:gap-3 mb-5 md:mb-6"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="p-3 rounded-xl relative overflow-hidden group"
                  style={{
                    background: "rgba(255,0,170,.1)",
                    border: "1px solid rgba(255,0,170,.15)",
                    boxShadow: "0 0 20px rgba(255,0,170,.1), 0 0 40px rgba(255,0,170,.05)",
                    transform: "translateZ(25px) rotateY(-5deg)",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.3s",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,0,170,.1), rgba(0,212,255,.1))",
                    }}
                  />
                  <ZapIcon
                    size={16}
                    style={{
                      color: "#ff00aa",
                      margin: "0 auto 4px",
                      transform: "translateZ(15px)",
                      filter: "drop-shadow(0 0 6px rgba(255,0,170,.5))",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                      transform: "translateZ(10px)",
                    }}
                  >
                    Score
                  </p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#ff00aa",
                      transform: "translateZ(20px)",
                      textShadow: "0 0 12px rgba(255,0,170,.4)",
                    }}
                  >
                    {g}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl relative overflow-hidden group"
                  style={{
                    background: "rgba(255,107,53,.1)",
                    border: "1px solid rgba(255,107,53,.15)",
                    boxShadow: "0 0 20px rgba(255,107,53,.1), 0 0 40px rgba(255,107,53,.05)",
                    transform: "translateZ(25px) rotateY(5deg)",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.3s",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,107,53,.1), rgba(255,214,0,.1))",
                    }}
                  />
                  <FlameIcon
                    size={16}
                    style={{
                      color: "#ff6b35",
                      margin: "0 auto 4px",
                      transform: "translateZ(15px)",
                      filter: "drop-shadow(0 0 6px rgba(255,107,53,.5))",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                      transform: "translateZ(10px)",
                    }}
                  >
                    Combo Máx
                  </p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#ff6b35",
                      transform: "translateZ(20px)",
                      textShadow: "0 0 12px rgba(255,107,53,.4)",
                    }}
                  >
                    {Z}x
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl relative overflow-hidden group"
                  style={{
                    background: "rgba(255,214,0,.1)",
                    border: "1px solid rgba(255,214,0,.15)",
                    boxShadow: "0 0 20px rgba(255,214,0,.1), 0 0 40px rgba(255,214,0,.05)",
                    transform: "translateZ(15px) rotateY(-3deg)",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.3s",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,214,0,.1), rgba(255,107,53,.1))",
                    }}
                  />
                  <TrophyIcon
                    size={16}
                    style={{
                      color: "#ffd600",
                      margin: "0 auto 4px",
                      transform: "translateZ(15px)",
                      filter: "drop-shadow(0 0 6px rgba(255,214,0,.5))",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                      transform: "translateZ(10px)",
                    }}
                  >
                    Mejor Score
                  </p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#ffd600",
                      transform: "translateZ(20px)",
                      textShadow: "0 0 12px rgba(255,214,0,.4)",
                    }}
                  >
                    {Q}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl relative overflow-hidden group"
                  style={{
                    background: "rgba(0,212,255,.1)",
                    border: "1px solid rgba(0,212,255,.15)",
                    boxShadow: "0 0 20px rgba(0,212,255,.1), 0 0 40px rgba(0,212,255,.05)",
                    transform: "translateZ(15px) rotateY(3deg)",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.3s",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(0,212,255,.1), rgba(255,0,170,.1))",
                    }}
                  />
                  <StarIcon
                    size={16}
                    style={{
                      color: "#00d4ff",
                      margin: "0 auto 4px",
                      transform: "translateZ(15px)",
                      filter: "drop-shadow(0 0 6px rgba(0,212,255,.5))",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                      transform: "translateZ(10px)",
                    }}
                  >
                    Precisión
                  </p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#00d4ff",
                      transform: "translateZ(20px)",
                      textShadow: "0 0 12px rgba(0,212,255,.4)",
                    }}
                  >
                    {Z > 0 ? "¡Buena!" : "—"}
                  </p>
                </div>
              </div>
              <div
                className="flex gap-3 justify-center flex-wrap"
                style={{
                  transform: "translateZ(30px)",
                }}
              >
                <button
                  onClick={() => ee(null)}
                  className="px-6 md:px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg,#ff00aa,#00d4ff)",
                    boxShadow: "0 0 30px rgba(255,0,170,.4), 0 0 60px rgba(0,212,255,.2)",
                    transform: "translateZ(20px)",
                  }}
                >
                  Jugar de nuevo / 再玩一次
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setO("select");
                  }}
                  className="px-4 py-3 rounded-full text-xs font-bold transition-all hover:scale-105"
                  style={{
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(255,255,255,.12)",
                    color: "#fff",
                    transform: "translateZ(15px)",
                    boxShadow: "0 0 20px rgba(255,255,255,.05)",
                  }}
                >
                  Cambiar / 切换
                </button>
              </div>
              <div
                style={{
                  transform: "translateZ(10px)",
                }}
              >
                <P currentGameId="word-ninja" />
              </div>
            </div>
          </div>
        )}
        <div
          className="fixed bottom-4 right-4 z-50 pointer-events-none"
          style={{
            animation: "ninjaFloat 2.5s ease-in-out infinite",
            filter: "drop-shadow(0 0 20px rgba(255,0,170,.3)) drop-shadow(0 0 40px rgba(0,212,255,.15))",
            transform: "translateZ(50px)",
          }}
        >
          <JeComponent expression={expression} scale={1.3} />
        </div>
        <style>{`
          @keyframes borderRotate { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
          @keyframes nebulaPulse { 0%,100%{transform:scale(1);opacity:0.15} 50%{transform:scale(1.2);opacity:0.25} }
          @keyframes flashFade { from{opacity:1} to{opacity:0} }
          @keyframes overlayPop { 0%{transform:scale(0.8);opacity:0} 100%{transform:scale(1);opacity:1} }
          @keyframes fireFlicker { 0%,100%{opacity:0.3} 50%{opacity:0.7} }
          @keyframes fireRise { 0%{opacity:0; height:0} 50%{opacity:1; height:80px} 100%{opacity:0; height:100px} }
          @keyframes victoryGlow { from{opacity:.3} to{opacity:.6} }
          @keyframes ninjaFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
          @keyframes kawaii-float { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-4px) rotate(2deg)} }
          @keyframes kawaii-float-fast { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-6px) rotate(-2deg)} }
          @keyframes orbitRing { 0%{transform:rotate(0deg) scale(1.1)} 50%{transform:rotate(180deg) scale(1.25)} 100%{transform:rotate(360deg) scale(1.1)} }
          @keyframes neonPulse { 0%{box-shadow:0 0 10px rgba(255,0,170,.4)} 100%{box-shadow:0 0 25px rgba(255,0,170,.7)} }
          @keyframes neonPulseRed { 0%{box-shadow:0 0 10px rgba(255,42,109,.3)} 100%{box-shadow:0 0 25px rgba(255,42,109,.6)} }
          @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-5px)} 40%{transform:translateX(5px)} 60%{transform:translateX(-3px)} 80%{transform:translateX(3px)} }
          .animate-shake { animation: shake 0.5s ease-in-out; }
          @keyframes titleRotate3D { 0%{transform:perspective(800px) rotateY(-6deg) rotateX(2deg)} 50%{transform:perspective(800px) rotateY(6deg) rotateX(-2deg)} 100%{transform:perspective(800px) rotateY(-6deg) rotateX(2deg)} }
          @keyframes scorePulse3D { 0%,100%{transform:perspective(400px) translateZ(0) scale(1)} 50%{transform:perspective(400px) translateZ(30px) scale(1.08)} }
          @keyframes comboPopup3D { 0%{transform:perspective(600px) translateZ(-200px) scale(0.3) rotateX(45deg);opacity:0} 60%{transform:perspective(600px) translateZ(60px) scale(1.2) rotateX(-10deg);opacity:1} 100%{transform:perspective(600px) translateZ(0) scale(1) rotateX(0deg);opacity:1} }
          @keyframes slice3D { 0%{transform:perspective(500px) rotateX(0deg) translateZ(0) scale(1)} 50%{transform:perspective(500px) rotateX(45deg) translateZ(-40px) scale(0.95)} 100%{transform:perspective(500px) rotateX(90deg) translateZ(-100px) scale(0.7)} }
          @keyframes glowTrail { 0%{opacity:0;transform:translateX(-20px) scaleX(0.5)} 50%{opacity:1;transform:translateX(0) scaleX(1)} 100%{opacity:0;transform:translateX(20px) scaleX(0.5)} }
          @keyframes inputGlow { 0%,100%{box-shadow:0 0 15px rgba(255,0,170,.2),0 0 30px rgba(0,212,255,.1),inset 0 0 10px rgba(255,0,170,.05)} 50%{box-shadow:0 0 25px rgba(255,0,170,.4),0 0 50px rgba(0,212,255,.2),inset 0 0 15px rgba(255,0,170,.1)} }
          @keyframes cardHover3D { 0%{transform:perspective(600px) rotateX(0) rotateY(0) translateZ(0)} 100%{transform:perspective(600px) rotateX(5deg) rotateY(-5deg) translateZ(20px)} }
          @keyframes wordFloat3D { 0%,100%{transform:translateY(0) rotateX(0deg)} 50%{transform:translateY(-6px) rotateX(3deg)} }
          @keyframes particleOrbit3D { 0%{transform:perspective(500px) rotateY(0deg) translateZ(40px) rotate(0deg)} 100%{transform:perspective(500px) rotateY(360deg) translateZ(40px) rotate(360deg)} }
          @keyframes cursorGlow { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.2)} }
          @keyframes shadowPulse { 0%,100%{transform:scale(1);opacity:.3} 50%{transform:scale(1.3);opacity:.1} }
          @keyframes confettiSpin3D { 0%{transform:perspective(300px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)} 100%{transform:perspective(300px) rotateX(360deg) rotateY(180deg) rotateZ(360deg)} }
        `}</style>
      </div>
    </StarfieldBackground>
  );
}
export { AtComponent as default };
