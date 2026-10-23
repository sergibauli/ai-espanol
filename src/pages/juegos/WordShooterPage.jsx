import {
  BookOpenIcon,
  HeartIcon,
  ZapIcon,
  StarIcon,
  TrophyIcon,
  SparklesIcon,
  ArrowLeftIcon,
  RocketIcon,
  LayersIcon,
  CrosshairIcon,
  TimerIcon,
  TargetIcon,
  ShieldIcon,
  FlameIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g, a, c } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
function qe(espanol) {
  return espanol
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-ZÑ]/g, "")
    .trim();
}
function Je(h) {
  const m = [...h];
  for (let d = m.length - 1; d > 0; d--) {
    const y = Math.floor(Math.random() * (d + 1));
    [m[d], m[y]] = [m[y], m[d]];
  }
  return m;
}
function Ve1Component({ mood }) {
  const d = {
    happy: {
      eye: "happy",
      mouth: "smile",
      blush: true,
      bounce: "mascotBounce 1s ease-in-out infinite",
      glow: "#39ff14",
      sparkle: true,
    },
    sad: {
      eye: "sad",
      mouth: "frown",
      blush: false,
      bounce: "none",
      glow: "#ff3860",
      sparkle: false,
    },
    excited: {
      eye: "happy",
      mouth: "open",
      blush: true,
      bounce: "mascotBounce 0.4s ease-in-out infinite",
      glow: "#ffd600",
      sparkle: true,
    },
    neutral: {
      eye: "normal",
      mouth: "small",
      blush: false,
      bounce: "mascotFloat 3s ease-in-out infinite",
      glow: "#00d4ff",
      sparkle: false,
    },
    focused: {
      eye: "normal",
      mouth: "small",
      blush: false,
      bounce: "mascotFloat 2s ease-in-out infinite",
      glow: "#ff00aa",
      sparkle: true,
    },
  }[mood];
  const y = {
    normal: "M-8,-4 Q-6,-6 -4,-4 Q-6,-2 -8,-4 M8,-4 Q6,-6 4,-4 Q6,-2 8,-4",
    happy: "M-8,-2 Q-6,-7 -4,-2 M8,-2 Q6,-7 4,-2",
    sad: "M-8,-2 Q-6,2 -4,-2 M8,-2 Q6,2 4,-2",
  }[d.eye];
  const k = {
    smile: "M-6,8 Q0,14 6,8",
    frown: "M-6,12 Q0,6 6,12",
    open: "M-5,8 Q0,18 5,8 Q0,0 -5,8",
    small: "M-3,10 Q0,12 3,10",
  }[d.mouth];
  return (
    <div
      className="fixed bottom-4 right-4 z-50 pointer-events-none"
      style={{
        animation: d.bounce,
        filter: `drop-shadow(0 0 15px ${d.glow}) drop-shadow(0 0 30px ${d.glow}44)`,
      }}
    >
      <svg width="90" height="90" viewBox="-50 -50 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="mascotBody" x1="0" y1="-50" x2="0" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a8edea" />
            <stop offset="100%" stopColor="#fed6e3" />
          </linearGradient>
          <linearGradient id="mascotEar" x1="0" y1="-50" x2="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#d299c2" />
            <stop offset="100%" stopColor="#fef9d7" />
          </linearGradient>
          <radialGradient id="mascotBlush" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ff9a9e" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ff9a9e" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="mascotGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={d.glow} stopOpacity="0.4" />
            <stop offset="100%" stopColor={d.glow} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="0" cy="0" r="48" fill="url(#mascotGlow)" />
        <ellipse cx="0" cy="0" rx="32" ry="30" fill="url(#mascotBody)" />
        <ellipse cx="-20" cy="-32" rx="10" ry="14" fill="url(#mascotEar)" transform="rotate(-20 -20 -32)" />
        <ellipse cx="20" cy="-32" rx="10" ry="14" fill="url(#mascotEar)" transform="rotate(20 20 -32)" />
        <ellipse
          cx="-20"
          cy="-32"
          rx="5"
          ry="7"
          fill="#ff9a9e"
          transform="rotate(-20 -20 -32)"
          opacity="0.6"
        />
        <ellipse cx="20" cy="-32" rx="5" ry="7" fill="#ff9a9e" transform="rotate(20 20 -32)" opacity="0.6" />
        <path d={y} stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="-6" cy="-4" r="1.5" fill="#333" />
        <circle cx="6" cy="-4" r="1.5" fill="#333" />
        <path d={k} stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
        {d.blush && (
          <>
            <circle cx="-20" cy="6" r="8" fill="url(#mascotBlush)" />
            <circle cx="20" cy="6" r="8" fill="url(#mascotBlush)" />
          </>
        )}
        {d.sparkle && (
          <>
            <g
              style={{
                animation: "sparkleSpin 2s linear infinite",
              }}
            >
              <path d="M-40,-40 L-38,-40 L-38,-38 L-40,-38 Z" fill="#fff" />
              <path d="M38,-38 L40,-38 L40,-36 L38,-36 Z" fill="#fff" />
              <path d="M-40,38 L-38,38 L-38,40 L-40,40 Z" fill="#fff" />
            </g>
          </>
        )}
        <ellipse
          cx="0"
          cy="40"
          rx="16"
          ry="5"
          fill="rgba(0,0,0,0.1)"
          style={{
            animation: "mascotShadow 1s ease-in-out infinite",
          }}
        />
      </svg>
    </div>
  );
}
function PtComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick, playSlice } = useSound();
  const [w, setW] = React.useState("select");
  const [ae, setAe] = React.useState([]);
  const [j, setJ] = React.useState("");
  const [Ne, setNe] = React.useState(60);
  const [se, setSe] = React.useState(0);
  const [u, setU] = React.useState(3);
  const [b, setB] = React.useState(0);
  const [oe, setOe] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("wordshooter_best") || "0");
    } catch {
      return 0;
    }
  });
  const [Me, setMe] = React.useState(false);
  const [et, setEt] = React.useState(0);
  const [Re, setRe] = React.useState(false);
  const [ie, setIe] = React.useState("");
  const [height, setHeight] = React.useState(() => {
    if (typeof window === "undefined") {
      return 500;
    }
    const window_innerWidth = window.innerWidth;
    if (window_innerWidth < 640) {
      return 320;
    }
    if (window_innerWidth < 1024) {
      return 420;
    }
    return 500;
  });
  const TeRef = React.useRef(0);
  const RRef = React.useRef(null);
  const CRef = React.useRef(0);
  const pRef = React.useRef(0);
  const NRef = React.useRef(3);
  const TRef = React.useRef(60);
  const FRef = React.useRef(null);
  const deRef = React.useRef(null);
  const cRef = React.useRef([]);
  const LRef = React.useRef([]);
  const vRef = React.useRef([]);
  const XRef = React.useRef([]);
  const ZRef = React.useRef([]);
  const qRef = React.useRef(0);
  const BRef = React.useRef(0);
  const IRef = React.useRef(0);
  const WRef = React.useRef(0);
  const DRef = React.useRef(0);
  const YRef = React.useRef(0);
  const GRef = React.useRef(0);
  const ORef = React.useRef(0);
  const xRef = React.useRef("select");
  const ERef = React.useRef([]);
  const JRef = React.useRef(() => {});
  const Fe = g();
  React.useEffect(() => {
    xRef.current = w;
  }, [w]);
  React.useEffect(() => {
    ERef.current = ae;
  }, [ae]);
  const Le = React.useMemo(
    () =>
      Array.from({
        length: 80,
      }).map((t, s) => ({
        id: s,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 3,
        delay: `${Math.random() * 3}s`,
        duration: `${2 + Math.random() * 3}s`,
        brightness: 0.3 + Math.random() * 0.7,
      })),
    [],
  );
  const Xe = React.useMemo(
    () =>
      Array.from({
        length: 8,
      }).map((t, s) => ({
        id: s,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 8}s`,
        duration: `${4 + Math.random() * 4}s`,
        scale: 0.5 + Math.random() * 0.5,
      })),
    [],
  );
  const mood = React.useMemo(() => {
    if (w === "select") {
      return "neutral";
    }
    if (w === "gameover") {
      return "sad";
    }
    if (b >= 3) {
      return "excited";
    }
    if (b >= 1) {
      return "happy";
    }
    if (u <= 1) {
      return "sad";
    }
    return "focused";
  }, [w, b, u]);
  const $ = React.useCallback(
    (t) => {
      playClick();
      let s = t ? a(t) : c();
      if (s.length === 0) {
        setIe('Este módulo no tiene palabras válidas. Prueba con otro o selecciona "Todos los módulos".');
        return;
      }
      const n = Je(
        s
          .filter((l) => l.espanol && l.chino)
          .map((l) => ({
            espanol: qe(l.espanol),
            chino: l.chino,
          }))
          .filter((l) => l.espanol.length >= 3 && l.espanol.length <= 12),
      );
      setAe(n);
      ERef.current = n;
      cRef.current = [];
      LRef.current = [];
      vRef.current = [];
      XRef.current = [];
      ZRef.current = [];
      setJ("");
      setNe(60);
      TRef.current = 60;
      setSe(0);
      CRef.current = 0;
      setU(3);
      NRef.current = 3;
      setB(0);
      pRef.current = 0;
      TeRef.current = 0;
      setW("playing");
      xRef.current = "playing";
      YRef.current = 0;
      GRef.current = 0;
      ORef.current = 0;
      BRef.current = 0;
      IRef.current = 0;
      WRef.current = 0;
      DRef.current = 0;
    },
    [playClick],
  );
  React.useEffect(() => {
    JRef.current = () => {
      playLose();
      xRef.current = "gameover";
      setW("gameover");
      setOe((s) => {
        const n = Math.max(s, CRef.current);
        localStorage.setItem("wordshooter_best", String(n));
        return n;
      });
      const t = Array.from({
        length: 60,
      }).map((s, n) => ({
        id: Date.now() + Math.random(),
        x: 50 + Math.random() * (FRef.current?.clientWidth || 600) - 300,
        y: -10,
        vx: (Math.random() - 0.5) * 4,
        vy: 2 + Math.random() * 4,
        life: 1,
        color: ["#00d4ff", "#39ff14", "#ffd600", "#ff00aa", "#ff3860", "#b829dd"][n % 6],
        size: 4 + Math.random() * 6,
      }));
      ZRef.current = t;
      setSe(CRef.current);
      setU(NRef.current);
      setB(pRef.current);
      setNe(TRef.current);
    };
  }, [playLose]);
  React.useEffect(() => {
    let t = true;
    const s = 50;
    const n = 30;
    const l = (o) => {
      if (!t) {
        return;
      }
      if (!YRef.current) {
        YRef.current = o;
        GRef.current = o;
        ORef.current = o;
        BRef.current = o;
        IRef.current = o;
        WRef.current = o;
        DRef.current = o;
      }
      const P = Date.now();
      if (xRef.current === "playing" && o - YRef.current >= s) {
        YRef.current = o;
        if (o - BRef.current >= 1000) {
          BRef.current = o;
          TRef.current -= 1;
          if (TRef.current <= 0) {
            JRef.current();
          }
        }
        if (
          o - IRef.current >= 2000 &&
          ((IRef.current = o), cRef.current.length < 8 && ERef.current.length > 0)
        ) {
          const i = ERef.current[Math.floor(Math.random() * ERef.current.length)];
          if (i) {
            const g = FRef.current ? FRef.current.clientWidth : 800;
            cRef.current.push({
              id: Date.now() + Math.random(),
              espanol: i.espanol,
              chino: i.chino,
              x: 40 + Math.random() * Math.max(20, g - 200),
              z: -1000,
              speed: 1.5 + Math.random() * 1.5,
              rotY: Math.random() * 360,
              destroyed: false,
              exploding: false,
            });
          }
        }
        let a = 0;
        const f = [];
        for (const i of cRef.current) {
          if (i.destroyed && !i.exploding) {
            continue;
          }
          if (i.destroyed || i.exploding) {
            f.push(i);
            continue;
          }
          const z = i.z + i.speed * 12;
          if (z >= 0) {
            a++;
            f.push({
              ...i,
              z: 0,
              destroyed: true,
            });
          } else {
            f.push({
              ...i,
              z,
              rotY: i.rotY + 2,
            });
          }
        }
        cRef.current = f;
        if (a > 0) {
          NRef.current = Math.max(0, NRef.current - a);
          pRef.current = 0;
          if (NRef.current <= 0) {
            JRef.current();
          } else {
            setMe(true);
            setTimeout(() => setMe(false), 400);
          }
        }
      }
      if (xRef.current === "playing" && o - GRef.current >= n) {
        GRef.current = o;
        LRef.current = LRef.current
          .map((a) => ({
            ...a,
            x: a.x + a.vx,
            y: a.y + a.vy,
            vy: a.vy + 0.3,
            life: a.life - 0.04,
          }))
          .filter((a) => a.life > 0);
      }
      if (xRef.current === "playing" && o - ORef.current >= n) {
        ORef.current = o;
        XRef.current = XRef.current
          .map((a) => ({
            ...a,
            y: a.y - 1.5,
            life: a.life - 0.02,
          }))
          .filter((a) => a.life > 0);
      }
      if (xRef.current === "playing") {
        vRef.current = vRef.current.filter((a) => P - a.id < 300);
      }
      if (xRef.current === "gameover") {
        ZRef.current = ZRef.current
          .map((a) => ({
            ...a,
            x: a.x + a.vx,
            y: a.y + a.vy,
            vy: a.vy + 0.1,
            life: a.life - 0.015,
          }))
          .filter((a) => a.life > 0 && a.y < 800);
      }
      if ((xRef.current === "playing" || xRef.current === "gameover") && o - WRef.current >= 200) {
        WRef.current = o;
        setSe(CRef.current);
        setU(NRef.current);
        setB(pRef.current);
        setNe(TRef.current);
      }
      if ((xRef.current === "playing" || xRef.current === "gameover") && o - DRef.current >= 16) {
        DRef.current = o;
        setEt((a) => a + 1);
      }
      qRef.current = requestAnimationFrame(l);
    };
    qRef.current = requestAnimationFrame(l);
    return () => {
      t = false;
      cancelAnimationFrame(qRef.current);
    };
  }, []);
  const S = (t) => {
    const s = t
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^A-ZÑ]/g, "")
      .trim();
    setJ(s);
    if (!s) {
      return;
    }
    const n = cRef.current.findIndex((l) => !l.destroyed && !l.exploding && l.espanol === s);
    if (n >= 0) {
      playCorrect();
      const l = cRef.current[n];
      const o = FRef.current;
      if (o) {
        const a = o.getBoundingClientRect();
        const f = document.getElementById(`ship-${l.id}`);
        if (f) {
          const i = f.getBoundingClientRect();
          const x = i.left + i.width / 2 - a.left;
          const ee = i.top + i.height / 2 - a.top;
          const ce = Date.now();
          vRef.current.push({
            id: ce,
            x,
            y: a.height - 20,
            targetY: ee,
          });
          setTimeout(() => {
            vRef.current = vRef.current.filter((M) => M.id !== ce);
          }, 200);
          const xe = [];
          const Ee = ["circle", "star", "diamond"];
          for (let M = 0; M < 48; M++) {
            const pe = Math.random() * Math.PI * 2;
            const fe = 2 + Math.random() * 10;
            xe.push({
              id: Date.now() + Math.random(),
              x,
              y: ee,
              vx: Math.cos(pe) * fe,
              vy: Math.sin(pe) * fe,
              life: 1,
              color: ["#ff4444", "#ff8800", "#ff0000", "#ffd600", "#39ff14", "#00d4ff", "#ff00aa", "#b829dd"][
                M % 8
              ],
              size: 3 + Math.random() * 8,
              shape: Ee[M % 3],
            });
          }
          LRef.current.push(...xe);
          const Pe = 150 + pRef.current * 50;
          const Ae = pRef.current >= 2 ? ` x${pRef.current + 1}!` : "";
          XRef.current.push({
            id: Date.now(),
            x,
            y: ee - 20,
            text: `+${Pe}${Ae}`,
            life: 1,
            color: pRef.current >= 3 ? "#ffd600" : pRef.current >= 2 ? "#ff00aa" : "#00d4ff",
            scale: 1 + pRef.current * 0.15,
          });
          if (pRef.current >= 2) {
            setRe(true);
            setTimeout(() => setRe(false), 600);
          }
        }
      }
      cRef.current = cRef.current.map((a, f) => {
        if (f === n) {
          return {
            ...a,
            exploding: true,
          };
        }
        return a;
      });
      setTimeout(() => {
        cRef.current = cRef.current.filter((a, f) => f !== n);
      }, 400);
      const P = 150 + pRef.current * 50;
      CRef.current += P;
      pRef.current += 1;
      setJ("");
    } else {
      if (
        !cRef.current.some((o) => !o.destroyed && !o.exploding && o.espanol.startsWith(s)) &&
        s.length >= 3
      ) {
        playWrong();
      }
    }
  };
  const onKeyDown = (t) => {
    if (t.key === "Enter") {
      S(j);
    }
  };
  React.useEffect(() => {
    const t = () => {
      if (typeof window === "undefined") {
        return;
      }
      const window_innerWidth = window.innerWidth;
      if (window_innerWidth < 640) {
        setHeight(320);
      } else if (window_innerWidth < 1024) {
        setHeight(420);
      } else {
        setHeight(500);
      }
    };
    window.addEventListener("resize", t);
    return () => window.removeEventListener("resize", t);
  }, []);
  if (w === "select") {
    return (
      <StarfieldBackground>
        <SoundToggles />
        <Ve1Component mood="neutral" />
        <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-6 min-h-screen relative z-10" ref={deRef}>
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <Link
              to="/juegos"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
            >
              <ArrowLeftIcon size={16} /> Volver / 返回
            </Link>
          </div>
          <div className="text-center mb-8 sm:mb-10">
            <div
              className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl mb-3 sm:mb-4 relative group"
              style={{
                background: "linear-gradient(135deg, #00d4ff, #39ff14)",
                boxShadow:
                  "0 0 40px rgba(0,212,255,.4), 0 0 80px rgba(57,255,20,.2), 0 0 120px rgba(0,212,255,.1)",
                transform: "rotateX(15deg) translateZ(30px)",
                perspective: "800px",
              }}
            >
              <RocketIcon
                size={36}
                className="text-white"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(0,212,255,.5)) drop-shadow(0 0 20px rgba(57,255,20,.3))",
                }}
              />
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #39ff14)",
                  opacity: 0,
                  animation: "neonPulse 2s ease-in-out infinite",
                }}
              />
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-2 sm:mb-3"
              style={{
                textShadow:
                  "0 0 40px rgba(0,212,255,0.3), 0 0 80px rgba(57,255,20,0.15), 0 0 120px rgba(0,212,255,0.05)",
                transform: "rotateX(5deg)",
                perspective: "800px",
              }}
            >
              Word Shooter
            </h1>
            <p className="text-white/40 text-xs sm:text-sm font-medium">
              Destruye las naves enemigas escribiendo la palabra correcta / 输入正确单词摧毁敌舰
            </p>
            {ie && (
              <div
                className="mt-4 mx-auto max-w-lg p-3 sm:p-4 rounded-xl text-xs sm:text-sm font-bold"
                style={{
                  background: "rgba(255,68,68,.12)",
                  border: "1px solid rgba(255,68,68,.3)",
                  color: "#ff6b35",
                  boxShadow: "0 0 20px rgba(255,68,68,.15), 0 0 40px rgba(255,68,68,.05)",
                }}
              >
                {ie}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <button
              onClick={() => {
                setIe("");
                $(null);
              }}
              className="group rounded-xl p-4 sm:p-5 text-left transition-all hover:scale-[1.02] hover:-translate-y-0.5"
              style={{
                background: "rgba(14,22,64,.6)",
                border: "1px solid rgba(255,0,170,.3)",
                transformStyle: "preserve-3d",
                boxShadow: "0 0 20px rgba(255,0,170,.1), 0 10px 30px rgba(0,0,0,.3)",
              }}
              onMouseEnter={(t) => {
                t.currentTarget.style.transform = "rotateY(5deg) rotateX(5deg) scale(1.02) translateZ(20px)";
                t.currentTarget.style.boxShadow =
                  "0 0 30px rgba(255,0,170,.2), 0 15px 40px rgba(0,0,0,.4), 0 0 60px rgba(255,0,170,.1)";
              }}
              onMouseLeave={(t) => {
                t.currentTarget.style.transform = "";
                t.currentTarget.style.boxShadow = "0 0 20px rgba(255,0,170,.1), 0 10px 30px rgba(0,0,0,.3)";
              }}
            >
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2 sm:mb-3"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                  boxShadow:
                    "0 0 20px rgba(255,0,170,.3), 0 0 40px rgba(184,41,221,.15), 0 0 60px rgba(255,0,170,.1)",
                }}
              >
                <LayersIcon size={22} className="text-white" />
              </div>
              <h3 className="text-white font-black text-sm sm:text-base mb-1">Todos los módulos</h3>
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
            {Fe.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setIe("");
                  $(t.id);
                }}
                className="group rounded-xl p-4 sm:p-5 text-left transition-all hover:scale-[1.02] hover:-translate-y-0.5"
                style={{
                  background: "rgba(14,22,64,.6)",
                  border: `1px solid ${t.color}40`,
                  transformStyle: "preserve-3d",
                  boxShadow: `0 0 20px ${t.color}15, 0 10px 30px rgba(0,0,0,.3)`,
                }}
                onMouseEnter={(s) => {
                  s.currentTarget.style.transform =
                    "rotateY(5deg) rotateX(5deg) scale(1.02) translateZ(20px)";
                  s.currentTarget.style.boxShadow = `0 0 30px ${t.color}30, 0 15px 40px rgba(0,0,0,.4), 0 0 60px ${t.color}15`;
                }}
                onMouseLeave={(s) => {
                  s.currentTarget.style.transform = "";
                  s.currentTarget.style.boxShadow = `0 0 20px ${t.color}15, 0 10px 30px rgba(0,0,0,.3)`;
                }}
              >
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2 sm:mb-3"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
                    boxShadow: `0 0 20px ${t.color}40, 0 0 40px ${t.color}20, 0 0 60px ${t.color}10`,
                  }}
                >
                  <BookOpenIcon size={22} className="text-white" />
                </div>
                <h3 className="text-white font-black text-sm sm:text-base mb-1">{t.titulo}</h3>
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
        </div>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <SoundToggles />
      <Ve1Component mood={mood} />
      <div
        className="max-w-5xl mx-auto px-3 sm:px-4 py-3 sm:py-6 min-h-screen relative z-10"
        style={{
          transform: Me ? `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)` : "none",
          transition: "transform 0.05s",
        }}
        ref={deRef}
      >
        <div className="flex items-center justify-between mb-2 sm:mb-4 flex-wrap gap-2">
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
          >
            <ArrowLeftIcon size={16} /> Volver / 返回
          </Link>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <button
              onClick={() => {
                playClick();
                setW("select");
                xRef.current = "select";
              }}
              className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "#fff",
                boxShadow: "0 0 10px rgba(255,255,255,.05)",
              }}
            >
              <LayersIcon size={12} /> <span className="hidden sm:inline">Cambiar</span> / 切换
            </button>
            <div
              className="px-2 sm:px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
              style={{
                background: "rgba(0,255,100,.1)",
                border: "1px solid rgba(0,255,100,.2)",
                color: "#39ff14",
                boxShadow: "0 0 10px rgba(57,255,20,.1)",
              }}
            >
              <CrosshairIcon size={12} /> x{b}
            </div>
            <div
              className="px-2 sm:px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
              style={{
                background: "rgba(0,212,255,.1)",
                border: "1px solid rgba(0,212,255,.2)",
                color: "#00d4ff",
                boxShadow: "0 0 10px rgba(0,212,255,.1)",
              }}
            >
              <TimerIcon size={12} /> {Ne}s
            </div>
            <div
              className="px-2 sm:px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
              style={{
                background: "rgba(255,0,100,.1)",
                border: "1px solid rgba(255,0,100,.2)",
                color: "#ff3860",
                boxShadow: "0 0 10px rgba(255,0,100,.1)",
              }}
            >
              {Array.from({
                length: 3,
              }).map((t, s) => (
                <HeartIcon
                  key={s}
                  size={10}
                  fill={s < u ? "#ff3860" : "transparent"}
                  color={s < u ? "#ff3860" : "rgba(255,255,255,.2)"}
                  className={s < u ? "heartBeat" : ""}
                  style={{
                    animation: s < u ? "heartPulse3D 1.2s ease-in-out infinite" : "none",
                    filter: s < u ? "drop-shadow(0 0 6px #ff3860) drop-shadow(0 0 12px #ff386088)" : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="text-center mb-2 sm:mb-4">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-black mb-1 sm:mb-2"
            style={{
              background: "linear-gradient(135deg,#00d4ff,#39ff14)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 20px rgba(0,212,255,.3)) drop-shadow(0 0 40px rgba(57,255,20,.15))",
            }}
          >
            Word Shooter
          </h1>
          <p className="text-white/40 text-xs font-medium flex items-center justify-center gap-1">
            <TargetIcon size={12} /> Escribe la palabra en ESPAÑOL / 输入西班牙语单词
          </p>
        </div>
        <div className="flex justify-center gap-2 sm:gap-3 mb-2 sm:mb-4 flex-wrap">
          <div
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold flex items-center gap-1.5"
            style={{
              background: "rgba(0,212,255,.1)",
              border: "1px solid rgba(0,212,255,.2)",
              color: "#00d4ff",
              boxShadow: "0 0 15px rgba(0,212,255,.1), 0 0 30px rgba(0,212,255,.05)",
            }}
          >
            <ZapIcon size={12} className="inline" /> Score: <span className="font-black">{se}</span>
          </div>
          <div
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold flex items-center gap-1.5"
            style={{
              background: "rgba(255,0,170,.1)",
              border: "1px solid rgba(255,0,170,.2)",
              color: "#ff00aa",
              boxShadow: "0 0 15px rgba(255,0,170,.1), 0 0 30px rgba(255,0,170,.05)",
            }}
          >
            <StarIcon size={12} className="inline" /> Combo: <span className="font-black">{b}</span>
          </div>
          <div
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold flex items-center gap-1.5"
            style={{
              background: "rgba(255,214,0,.1)",
              border: "1px solid rgba(255,214,0,.2)",
              color: "#ffd600",
              boxShadow: "0 0 15px rgba(255,214,0,.1), 0 0 30px rgba(255,214,0,.05)",
            }}
          >
            <TrophyIcon size={12} className="inline" /> Best: <span className="font-black">{oe}</span>
          </div>
        </div>
        {Re && b >= 3 && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            <div
              className="text-4xl sm:text-6xl font-black"
              style={{
                background: "linear-gradient(135deg,#ffd600,#ff00aa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 30px rgba(255,214,0,.5)) drop-shadow(0 0 60px rgba(255,0,170,.3))",
                animation: "comboPop 0.6s ease-out forwards",
              }}
            >
              x{b} COMBO!
            </div>
          </div>
        )}
        <div
          ref={FRef}
          className="relative mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10"
          style={{
            height,
            background: "linear-gradient(180deg,rgba(5,8,27,.95),rgba(14,22,64,.85))",
            backdropFilter: "blur(14px)",
            perspective: "1200px",
            boxShadow:
              "0 0 40px rgba(0,212,255,.15), 0 0 80px rgba(184,41,221,.08), 0 0 120px rgba(0,212,255,.05), 0 20px 60px rgba(0,0,0,.5)",
            transformStyle: "preserve-3d",
            touchAction: "manipulation",
          }}
          onClick={() => RRef.current?.focus()}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 100%, rgba(0,212,255,.08) 0%, transparent 60%)",
              animation: "depthFog 4s ease-in-out infinite",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 30% 0%, rgba(255,0,170,.05) 0%, transparent 50%)",
              animation: "depthFog 5s ease-in-out infinite 1s",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              transform: "translateZ(-500px) scale(1.5)",
            }}
          >
            {Le.map((t) => (
              <div
                key={t.id}
                className="absolute rounded-full"
                style={{
                  width: t.size,
                  height: t.size,
                  left: t.left,
                  top: t.top,
                  background: `rgba(255,255,255,${t.brightness})`,
                  animation: `starTwinkle ${t.duration} ease-in-out infinite`,
                  animationDelay: t.delay,
                  boxShadow: `0 0 ${t.size * 2}px rgba(255,255,255,${t.brightness * 0.5}), 0 0 ${t.size * 4}px rgba(0,212,255,${t.brightness * 0.3})`,
                }}
              />
            ))}
          </div>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              perspective: "600px",
              transformStyle: "preserve-3d",
              overflow: "hidden",
            }}
          >
            <div
              className="absolute left-0 right-0"
              style={{
                bottom: 0,
                height: "60%",
                transform: "rotateX(75deg) translateY(0)",
                transformOrigin: "bottom center",
                backgroundImage:
                  "linear-gradient(rgba(0,212,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,.15) 1px, transparent 1px)",
                backgroundSize: "50px 50px",
                animation: "gridScroll3D 2s linear infinite",
                maskImage: "linear-gradient(to top, rgba(0,0,0,.6), transparent)",
                WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,.6), transparent)",
              }}
            />
          </div>
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Xe.map((t) => (
              <div
                key={t.id}
                className="absolute meteor-shoot"
                style={{
                  left: t.left,
                  top: "-10px",
                  animationDelay: t.delay,
                  animationDuration: t.duration,
                  transform: `scale(${t.scale})`,
                }}
              >
                <div
                  className="w-1 h-8 rounded-full"
                  style={{
                    background: "linear-gradient(to bottom, transparent, #00d4ff, #39ff14)",
                    boxShadow: "0 0 10px #00d4ff, 0 0 20px #39ff14, 0 0 30px rgba(0,212,255,.5)",
                  }}
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute rounded-full opacity-20"
              style={{
                width: 300,
                height: 300,
                left: "10%",
                top: "20%",
                background: "radial-gradient(circle, rgba(0,212,255,.5), transparent 70%)",
                filter: "blur(50px)",
                animation: "nebulaPulse 6s ease-in-out infinite",
              }}
            />
            <div
              className="absolute rounded-full opacity-15"
              style={{
                width: 250,
                height: 250,
                right: "15%",
                top: "10%",
                background: "radial-gradient(circle, rgba(184,41,221,.5), transparent 70%)",
                filter: "blur(50px)",
                animation: "nebulaPulse 8s ease-in-out infinite 2s",
              }}
            />
            <div
              className="absolute rounded-full opacity-10"
              style={{
                width: 200,
                height: 200,
                left: "50%",
                bottom: "10%",
                background: "radial-gradient(circle, rgba(57,255,20,.5), transparent 70%)",
                filter: "blur(40px)",
                animation: "nebulaPulse 7s ease-in-out infinite 1s",
              }}
            />
            <div
              className="absolute rounded-full opacity-10"
              style={{
                width: 350,
                height: 350,
                left: "60%",
                top: "30%",
                background: "radial-gradient(circle, rgba(255,0,170,.4), transparent 70%)",
                filter: "blur(60px)",
                animation: "nebulaPulse 9s ease-in-out infinite 3s",
              }}
            />
          </div>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,.5) 100%)",
              animation: "vignettePulse 4s ease-in-out infinite",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,212,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {cRef.current.map((t) => {
            const s = (t.z + 1000) / 1000;
            const n = 0.5 + s * 0.8;
            const l = 10 + s * 75;
            const o = (1 - s) * 2;
            const P = s * 0.6 + 0.2;
            const a = t.z;
            return (
              <div
                key={t.id}
                id={`ship-${t.id}`}
                className="absolute cursor-pointer"
                style={{
                  left: t.x,
                  top: `${l}%`,
                  transform: `translateZ(${a}px) rotateY(${t.rotY}deg) rotateX(${s * 10}deg) scale(${n})`,
                  zIndex: Math.floor(t.z + 1000),
                  opacity: t.exploding ? 0 : 1,
                  transition: t.exploding ? "all 0.3s ease-out" : "top 0.05s linear",
                  filter: t.exploding ? "blur(2px) brightness(2)" : `blur(${o}px)`,
                  touchAction: "manipulation",
                }}
                onClick={() => {
                  if (!t.destroyed && !t.exploding) {
                    S(t.espanol);
                  }
                }}
              >
                <div
                  className="absolute -inset-4 rounded-2xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, rgba(0,212,255,${P * 0.3}), transparent 70%)`,
                    filter: "blur(8px)",
                    transform: "translateZ(-20px)",
                  }}
                />
                <div
                  className="relative px-4 py-2 rounded-xl font-black text-base whitespace-nowrap"
                  style={{
                    background: t.exploding
                      ? "rgba(255,68,68,.5)"
                      : "linear-gradient(135deg,rgba(0,212,255,.25),rgba(184,41,221,.25))",
                    border: t.exploding ? "1px solid rgba(255,68,68,.8)" : "1px solid rgba(0,212,255,.4)",
                    color: "#fff",
                    boxShadow: t.exploding
                      ? "0 0 40px rgba(255,68,68,.6), 0 0 80px rgba(255,68,68,.3)"
                      : "0 0 20px rgba(0,212,255,.4), 0 0 40px rgba(184,41,221,.2), 0 0 60px rgba(0,212,255,.1), inset 0 1px 0 rgba(255,255,255,.1)",
                    textShadow:
                      "0 0 10px rgba(0,212,255,.5), 0 0 20px rgba(0,212,255,.3), 0 0 30px rgba(0,212,255,.2)",
                    backdropFilter: "blur(8px)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="absolute -left-6 top-1/2 -translate-y-1/2"
                    style={{
                      animation: "shipFloat 1.5s ease-in-out infinite",
                      transform: "translateY(-50%) translateZ(10px)",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z"
                        fill="#00d4ff"
                        style={{
                          filter: "drop-shadow(0 0 4px #00d4ff) drop-shadow(0 0 8px #00d4ff)",
                        }}
                      />
                    </svg>
                  </div>
                  <div
                    className="text-xs font-bold text-white/60 mb-0.5"
                    style={{
                      textShadow: "0 0 5px rgba(255,255,255,.2)",
                    }}
                  >
                    {t.chino}
                  </div>
                  <div
                    className="tracking-wider"
                    style={{
                      transform: "translateZ(5px)",
                    }}
                  >
                    {t.espanol}
                  </div>
                  <div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-5 rounded-full"
                    style={{
                      background: "#00d4ff",
                      boxShadow:
                        "0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 30px rgba(0,212,255,.5), 0 0 50px rgba(0,212,255,.3)",
                      animation: "thrustFlame 0.3s ease-in-out infinite",
                      transform: "translateX(-50%) translateZ(-5px)",
                    }}
                  />
                  <div
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-6 rounded-full"
                    style={{
                      background: "linear-gradient(to bottom, #00d4ff, transparent)",
                      boxShadow: "0 0 8px #00d4ff",
                      animation: "thrustFlame 0.4s ease-in-out infinite 0.1s",
                      opacity: 0.7,
                      transform: "translateX(-50%) translateZ(-10px)",
                    }}
                  />
                  <div
                    className="absolute -left-2 top-1/2 -translate-y-1/2 w-1.5 h-3 rounded-full"
                    style={{
                      background: "#39ff14",
                      boxShadow: "0 0 8px #39ff14, 0 0 15px rgba(57,255,20,.5)",
                      animation: "thrustFlame 0.4s ease-in-out infinite 0.1s",
                      transform: "translateY(-50%) translateZ(-2px)",
                    }}
                  />
                  <div
                    className="absolute -right-2 top-1/2 -translate-y-1/2 w-1.5 h-3 rounded-full"
                    style={{
                      background: "#39ff14",
                      boxShadow: "0 0 8px #39ff14, 0 0 15px rgba(57,255,20,.5)",
                      animation: "thrustFlame 0.4s ease-in-out infinite 0.2s",
                      transform: "translateY(-50%) translateZ(-2px)",
                    }}
                  />
                </div>
              </div>
            );
          })}
          {vRef.current.map((t) => (
            <div
              key={t.id}
              className="absolute pointer-events-none"
              style={{
                left: t.x,
                bottom: 20,
                zIndex: 9998,
              }}
            >
              <div
                className="w-1 h-16 sm:h-20 rounded-full"
                style={{
                  background: "linear-gradient(to top, #39ff14, #00d4ff, #ffffff)",
                  boxShadow:
                    "0 0 10px #39ff14, 0 0 20px #00d4ff, 0 0 40px rgba(0,212,255,.5), 0 0 80px rgba(57,255,20,.2)",
                  animation: "laserShoot 0.2s ease-out forwards",
                }}
              />
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-24 sm:h-32 rounded-full"
                style={{
                  background:
                    "linear-gradient(to top, transparent, rgba(57,255,20,.3), rgba(0,212,255,.2), transparent)",
                  filter: "blur(4px)",
                  animation: "laserShoot 0.2s ease-out forwards",
                }}
              />
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full"
                style={{
                  background: "rgba(57,255,20,.6)",
                  boxShadow: "0 0 15px #39ff14, 0 0 30px #00d4ff",
                  animation: "laserShoot 0.2s ease-out forwards",
                }}
              />
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                style={{
                  background: "#fff",
                  boxShadow: "0 0 10px #fff, 0 0 20px #00d4ff",
                  animation: "laserShoot 0.15s ease-out forwards",
                }}
              />
            </div>
          ))}
          {LRef.current.map((t) => (
            <div
              key={t.id}
              className="absolute pointer-events-none"
              style={{
                left: t.x,
                top: t.y,
                width: t.size,
                height: t.size,
                background: t.shape === "circle" ? t.color : "transparent",
                borderRadius: t.shape === "circle" ? "50%" : t.shape === "diamond" ? "2px" : "0",
                transform:
                  t.shape === "diamond"
                    ? `rotate(45deg) scale(${1 + (1 - t.life) * 2})`
                    : t.shape === "star"
                      ? `rotate(${t.x * 3}deg)`
                      : `scale(${1 + (1 - t.life) * 2})`,
                boxShadow: `0 0 10px ${t.color}, 0 0 20px ${t.color}88, 0 0 40px ${t.color}44`,
                opacity: t.life,
                zIndex: 9999,
              }}
            >
              {t.shape === "star" && (
                <svg width={t.size} height={t.size} viewBox="0 0 10 10" fill={t.color}>
                  <polygon points="5,0 6.5,3.5 10,3.5 7.5,6 8.5,10 5,7.5 1.5,10 2.5,6 0,3.5 3.5,3.5" />
                </svg>
              )}
            </div>
          ))}
          {XRef.current.map((t) => (
            <div
              key={t.id}
              className="absolute pointer-events-none font-black text-sm sm:text-lg"
              style={{
                left: t.x,
                top: t.y,
                color: t.color,
                opacity: t.life,
                textShadow: `0 0 10px ${t.color}, 0 0 20px ${t.color}88, 0 0 40px ${t.color}44`,
                zIndex: 9999,
                transform: `translateX(-50%) scale(${t.scale || 1}) translateZ(50px) rotateX(-15deg)`,
                animation: "scoreFloat3D 0.6s ease-out forwards",
              }}
            >
              {t.text}
            </div>
          ))}
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 pointer-events-none">
            <div
              className="flex items-center gap-1 text-xs font-bold"
              style={{
                color: "rgba(0,212,255,.4)",
              }}
            >
              <ShieldIcon
                size={10}
                style={{
                  filter: "drop-shadow(0 0 4px rgba(0,212,255,.5))",
                }}
              />{" "}
              DEFENSE
            </div>
            <div
              className="w-16 sm:w-20 h-1 mt-1 rounded-full overflow-hidden"
              style={{
                background: "rgba(0,212,255,.1)",
                boxShadow: "0 0 5px rgba(0,212,255,.2)",
              }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(u / 3) * 100}%`,
                  background: "linear-gradient(90deg, #00d4ff, #39ff14)",
                  boxShadow: "0 0 8px rgba(0,212,255,.5)",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 pointer-events-none">
            <div
              className="flex items-center gap-1 text-xs font-bold"
              style={{
                color: "rgba(255,0,100,.4)",
              }}
            >
              <FlameIcon
                size={10}
                style={{
                  filter: "drop-shadow(0 0 4px rgba(255,0,100,.5))",
                }}
              />{" "}
              THREAT
            </div>
            <div
              className="w-16 sm:w-20 h-1 mt-1 rounded-full overflow-hidden"
              style={{
                background: "rgba(255,0,100,.1)",
                boxShadow: "0 0 5px rgba(255,0,100,.2)",
              }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(cRef.current.length / 8, 1) * 100}%`,
                  background: "linear-gradient(90deg, #ff3860, #ff00aa)",
                  boxShadow: "0 0 8px rgba(255,0,100,.5)",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1"
            style={{
              background: "linear-gradient(90deg, transparent, #00d4ff, #39ff14, #ff00aa, transparent)",
              opacity: 0.6,
              boxShadow: "0 0 10px #00d4ff, 0 0 20px #39ff14, 0 0 30px rgba(0,212,255,.3)",
            }}
          />
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="w-full h-0.5"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(0,212,255,.3), transparent)",
                animation: "scanLine 4s linear infinite",
                boxShadow: "0 0 10px rgba(0,212,255,.2), 0 0 20px rgba(0,212,255,.1)",
              }}
            />
          </div>
          <div
            className="absolute top-0 left-0 w-8 h-8 pointer-events-none"
            style={{
              borderTop: "2px solid rgba(0,212,255,.3)",
              borderLeft: "2px solid rgba(0,212,255,.3)",
              boxShadow: "0 0 10px rgba(0,212,255,.1)",
            }}
          />
          <div
            className="absolute top-0 right-0 w-8 h-8 pointer-events-none"
            style={{
              borderTop: "2px solid rgba(0,212,255,.3)",
              borderRight: "2px solid rgba(0,212,255,.3)",
              boxShadow: "0 0 10px rgba(0,212,255,.1)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-8 h-8 pointer-events-none"
            style={{
              borderBottom: "2px solid rgba(0,212,255,.3)",
              borderLeft: "2px solid rgba(0,212,255,.3)",
              boxShadow: "0 0 10px rgba(0,212,255,.1)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none"
            style={{
              borderBottom: "2px solid rgba(0,212,255,.3)",
              borderRight: "2px solid rgba(0,212,255,.3)",
              boxShadow: "0 0 10px rgba(0,212,255,.1)",
            }}
          />
        </div>
        <div className="mt-3 sm:mt-4 max-w-md mx-auto">
          <div className="relative">
            <input
              ref={RRef}
              type="text"
              value={j}
              onChange={(t) => S(t.target.value)}
              onKeyDown={onKeyDown}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-2xl font-black text-base sm:text-lg text-center bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00d4ff] transition-all min-h-[48px]"
              style={{
                boxShadow:
                  "0 0 20px rgba(0,212,255,.1), 0 0 40px rgba(0,212,255,.05), inset 0 1px 0 rgba(255,255,255,.05)",
                textShadow: "0 0 10px rgba(0,212,255,.3), 0 0 20px rgba(0,212,255,.15)",
              }}
              placeholder="Escribe en español / 输入西班牙语..."
              autoFocus
            />
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                border: "1px solid transparent",
                animation: "inputGlow 2s ease-in-out infinite",
              }}
            />
            {j.length > 0 && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 text-xs font-bold">
                {j.length}
              </div>
            )}
          </div>
        </div>
        <div
          className="mobile-letter-keyboard mt-3 max-w-md mx-auto"
          style={{
            touchAction: "manipulation",
          }}
        >
          <div className="flex flex-col gap-1.5 items-center">
            {["QWERTYUIOP", "ASDFGHJKLÑ", "ZXCVBNM"].map((t, s) => (
              <div key={s} className="mobile-letter-row flex gap-1 justify-center">
                {t.split("").map((n) => (
                  <button
                    key={n}
                    onClick={() => {
                      const l = j + n;
                      setJ(l);
                      S(l);
                      RRef.current?.focus();
                    }}
                    className="mobile-letter-key min-w-[40px] min-h-[44px] sm:min-w-[36px] sm:min-h-[40px] rounded-lg font-bold text-sm text-white flex items-center justify-center active:scale-95"
                    style={{
                      background: "linear-gradient(180deg, rgba(0,212,255,.2), rgba(184,41,221,.1))",
                      border: "1px solid rgba(0,212,255,.4)",
                      boxShadow: "0 4px 8px rgba(0,0,0,.2), 0 0 12px rgba(0,212,255,.15)",
                      textShadow: "0 0 8px rgba(0,212,255,.5)",
                    }}
                  >
                    {n}
                  </button>
                ))}
                {s === 2 && (
                  <>
                    <button
                      onClick={() => {
                        const n = j.slice(0, -1);
                        setJ(n);
                        S(n);
                        RRef.current?.focus();
                      }}
                      className="min-w-[44px] min-h-[44px] sm:min-w-[40px] sm:min-h-[40px] rounded-lg font-bold text-sm text-white flex items-center justify-center active:scale-95"
                      style={{
                        background: "linear-gradient(180deg, rgba(255,68,68,.2), rgba(255,0,100,.1))",
                        border: "1px solid rgba(255,68,68,.4)",
                        boxShadow: "0 4px 8px rgba(0,0,0,.2), 0 0 12px rgba(255,68,68,.15)",
                      }}
                    >
                      ⌫
                    </button>
                    <button
                      onClick={() => {
                        S(j);
                        RRef.current?.focus();
                      }}
                      className="min-w-[44px] min-h-[44px] sm:min-w-[40px] sm:min-h-[40px] rounded-lg font-bold text-sm text-white flex items-center justify-center active:scale-95"
                      style={{
                        background: "linear-gradient(180deg, rgba(57,255,20,.2), rgba(0,212,255,.1))",
                        border: "1px solid rgba(57,255,20,.4)",
                        boxShadow: "0 4px 8px rgba(0,0,0,.2), 0 0 12px rgba(57,255,20,.15)",
                        textShadow: "0 0 8px rgba(57,255,20,.5)",
                      }}
                    >
                      ↵
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        {w === "gameover" && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.9)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div
              className="text-center p-6 sm:p-8 rounded-2xl sm:rounded-3xl max-w-sm mx-3 sm:mx-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg,rgba(14,22,64,.8),rgba(5,8,27,.6))",
                border: "1px solid rgba(0,212,255,.2)",
                boxShadow:
                  "0 0 60px rgba(0,212,255,.15), 0 0 120px rgba(184,41,221,.08), 0 0 180px rgba(0,212,255,.05)",
                transformStyle: "preserve-3d",
                perspective: "800px",
                animation: "defeatEntrance 0.8s ease-out forwards",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-60"
                style={{
                  background: "linear-gradient(135deg,#00d4ff,#39ff14)",
                  filter: "blur(25px)",
                  animation: "neonPulse 3s ease-in-out infinite",
                }}
              />
              {ZRef.current.map((t) => (
                <div
                  key={t.id}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    left: t.x,
                    top: t.y,
                    width: t.size,
                    height: t.size,
                    background: t.color,
                    boxShadow: `0 0 8px ${t.color}, 0 0 16px ${t.color}88`,
                    opacity: t.life,
                    transform: `rotate(${t.x * 5}deg) scale(${1 + (1 - t.life)})`,
                  }}
                />
              ))}
              <div className="relative mb-4">
                <TrophyIcon
                  size={48}
                  className="sm:w-14 sm:h-14"
                  style={{
                    color: "#ffd600",
                    margin: "0 auto",
                    filter:
                      "drop-shadow(0 0 15px rgba(255,214,0,.5)) drop-shadow(0 0 30px rgba(255,214,0,.3)) drop-shadow(0 0 50px rgba(255,214,0,.1))",
                  }}
                />
                <div
                  className="absolute -top-2 -right-2"
                  style={{
                    animation: "sparkleSpin 2s linear infinite",
                  }}
                >
                  <SparklesIcon
                    size={20}
                    style={{
                      color: "#ffd600",
                      filter:
                        "drop-shadow(0 0 10px rgba(255,214,0,.5)) drop-shadow(0 0 20px rgba(255,214,0,.3))",
                    }}
                  />
                </div>
                <div
                  className="absolute -top-1 -left-3"
                  style={{
                    animation: "sparkleSpin 2.5s linear infinite 0.5s",
                  }}
                >
                  <StarIcon
                    size={16}
                    style={{
                      color: "#00d4ff",
                      filter: "drop-shadow(0 0 8px rgba(0,212,255,.5))",
                    }}
                  />
                </div>
                <div
                  className="absolute bottom-0 right-0"
                  style={{
                    animation: "sparkleSpin 1.8s linear infinite 1s",
                  }}
                >
                  <StarIcon
                    size={14}
                    style={{
                      color: "#ff00aa",
                      filter: "drop-shadow(0 0 8px rgba(255,0,170,.5))",
                    }}
                  />
                </div>
              </div>
              <h2
                className="text-2xl sm:text-3xl font-black mb-1 sm:mb-2"
                style={{
                  background: "linear-gradient(135deg,#00d4ff,#39ff14)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter:
                    "drop-shadow(0 0 20px rgba(0,212,255,.3)) drop-shadow(0 0 40px rgba(57,255,20,.15))",
                }}
              >
                ¡Misión Terminada!
              </h2>
              <p className="text-white/50 text-sm mb-4 sm:mb-6">任务完成！</p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div
                  className="p-2 sm:p-3 rounded-xl"
                  style={{
                    background: "rgba(0,212,255,.1)",
                    border: "1px solid rgba(0,212,255,.15)",
                    boxShadow: "0 0 10px rgba(0,212,255,.1), 0 0 20px rgba(0,212,255,.05)",
                    transform: "translateZ(20px)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <ZapIcon
                    size={16}
                    style={{
                      color: "#00d4ff",
                      margin: "0 auto 4px",
                      filter:
                        "drop-shadow(0 0 5px rgba(0,212,255,.5)) drop-shadow(0 0 10px rgba(0,212,255,.3))",
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
                      color: "#00d4ff",
                      textShadow: "0 0 10px rgba(0,212,255,.5), 0 0 20px rgba(0,212,255,.3)",
                    }}
                  >
                    {se}
                  </p>
                </div>
                <div
                  className="p-2 sm:p-3 rounded-xl"
                  style={{
                    background: "rgba(255,0,170,.1)",
                    border: "1px solid rgba(255,0,170,.15)",
                    boxShadow: "0 0 10px rgba(255,0,170,.1), 0 0 20px rgba(255,0,170,.05)",
                    transform: "translateZ(20px)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <CrosshairIcon
                    size={16}
                    style={{
                      color: "#ff00aa",
                      margin: "0 auto 4px",
                      filter:
                        "drop-shadow(0 0 5px rgba(255,0,170,.5)) drop-shadow(0 0 10px rgba(255,0,170,.3))",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Combo Máx
                  </p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#ff00aa",
                      textShadow: "0 0 10px rgba(255,0,170,.5), 0 0 20px rgba(255,0,170,.3)",
                    }}
                  >
                    {b}
                  </p>
                </div>
                <div
                  className="p-2 sm:p-3 rounded-xl"
                  style={{
                    background: "rgba(255,214,0,.1)",
                    border: "1px solid rgba(255,214,0,.15)",
                    boxShadow: "0 0 10px rgba(255,214,0,.1), 0 0 20px rgba(255,214,0,.05)",
                    transform: "translateZ(20px)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <TrophyIcon
                    size={16}
                    style={{
                      color: "#ffd600",
                      margin: "0 auto 4px",
                      filter:
                        "drop-shadow(0 0 5px rgba(255,214,0,.5)) drop-shadow(0 0 10px rgba(255,214,0,.3))",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Mejor Score
                  </p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#ffd600",
                      textShadow: "0 0 10px rgba(255,214,0,.5), 0 0 20px rgba(255,214,0,.3)",
                    }}
                  >
                    {oe}
                  </p>
                </div>
                <div
                  className="p-2 sm:p-3 rounded-xl"
                  style={{
                    background: "rgba(255,0,100,.1)",
                    border: "1px solid rgba(255,0,100,.15)",
                    boxShadow: "0 0 10px rgba(255,0,100,.1), 0 0 20px rgba(255,0,100,.05)",
                    transform: "translateZ(20px)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <HeartIcon
                    size={16}
                    style={{
                      color: "#ff3860",
                      margin: "0 auto 4px",
                      filter:
                        "drop-shadow(0 0 5px rgba(255,0,100,.5)) drop-shadow(0 0 10px rgba(255,0,100,.3))",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Vidas
                  </p>
                  <p
                    className="text-lg font-black"
                    style={{
                      color: "#ff3860",
                      textShadow: "0 0 10px rgba(255,0,100,.5), 0 0 20px rgba(255,0,100,.3)",
                    }}
                  >
                    {u}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3 justify-center flex-wrap">
                <button
                  onClick={() => $(null)}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-white font-black transition-all hover:scale-105 text-sm sm:text-base"
                  style={{
                    background: "linear-gradient(135deg,#00d4ff,#39ff14)",
                    boxShadow:
                      "0 0 25px rgba(0,212,255,.3), 0 0 50px rgba(57,255,20,.15), 0 0 80px rgba(0,212,255,.1)",
                  }}
                >
                  Jugar de nuevo / 再玩一次
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setW("select");
                    xRef.current = "select";
                  }}
                  className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-full text-xs font-bold transition-all hover:scale-105"
                  style={{
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(255,255,255,.12)",
                    color: "#fff",
                    boxShadow: "0 0 10px rgba(255,255,255,.05)",
                  }}
                >
                  Cambiar / 切换
                </button>
                <P currentGameId="word-shooter" />
              </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes starTwinkle { 0%,100%{opacity:0.2; transform:scale(1)} 50%{opacity:1; transform:scale(1.5)} }
        @keyframes nebulaPulse { 0%,100%{transform:scale(1);opacity:0.15} 50%{transform:scale(1.2);opacity:0.25} }
        @keyframes enginePulse { 0%,100%{transform:translateX(-50%) scaleY(1)} 50%{transform:translateX(-50%) scaleY(1.5)} }
        @keyframes laserShoot { from{transform:translateY(0);opacity:1} to{transform:translateY(-500px);opacity:0} }
        @keyframes comboPop { 0%{transform:scale(0.5) rotateX(90deg);opacity:0} 50%{transform:scale(1.2) rotateX(0deg);opacity:1} 100%{transform:scale(1) rotateX(0deg);opacity:0} }
        @keyframes confettiFall { 0%{transform:translateY(-20px) rotate(0deg);opacity:1} 100%{transform:translateY(100px) rotate(360deg);opacity:0} }
        @keyframes mascotBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes mascotFloat { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-6px) rotate(2deg)} }
        @keyframes mascotShadow { 0%,100%{transform:scaleX(1); opacity:0.1} 50%{transform:scaleX(0.8); opacity:0.05} }
        @keyframes sparkleSpin { 0%{transform:rotate(0deg) scale(1)} 50%{transform:rotate(180deg) scale(1.2)} 100%{transform:rotate(360deg) scale(1)} }
        @keyframes neonPulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes heartPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.2)} }
        @keyframes shipFloat { 0%,100%{transform:translateY(-50%) translateX(0) translateZ(10px)} 50%{transform:translateY(-50%) translateX(2px) translateZ(10px)} }
        @keyframes scanLine { 0%{transform:translateY(-100%)} 100%{transform:translateY(1000px)} }
        @keyframes inputGlow { 0%,100%{box-shadow:0 0 20px rgba(0,212,255,.1), inset 0 1px 0 rgba(255,255,255,.05)} 50%{box-shadow:0 0 30px rgba(0,212,255,.2), 0 0 50px rgba(0,212,255,.1), inset 0 1px 0 rgba(255,255,255,.05)} }
        @keyframes floatUp { 0%{transform:translateX(-50%) translateY(0) scale(1)} 100%{transform:translateX(-50%) translateY(-30px) scale(1.2)} }
        @keyframes meteorShoot { 0%{transform:translateY(-20px) translateX(0) rotate(15deg); opacity:0} 10%{opacity:1} 100%{transform:translateY(600px) translateX(-100px) rotate(15deg); opacity:0} }
        .meteor-shoot { animation: meteorShoot 4s linear infinite; position: absolute; }
        @keyframes thrustFlame { 0%,100%{transform:translateX(-50%) scaleY(1) scaleX(1); opacity:0.8} 50%{transform:translateX(-50%) scaleY(1.6) scaleX(0.7); opacity:1} }
        @keyframes scoreFloat3D { 0%{transform:translateX(-50%) scale(1) translateZ(0) rotateX(0deg); opacity:1} 50%{transform:translateX(-50%) scale(1.3) translateZ(50px) rotateX(-10deg); opacity:1} 100%{transform:translateX(-50%) scale(1.5) translateZ(100px) rotateX(-20deg); opacity:0} }
        @keyframes heartPulse3D { 0%,100%{transform:scale(1) translateZ(0); filter:drop-shadow(0 0 5px #ff3860)} 25%{transform:scale(1.2) translateZ(15px); filter:drop-shadow(0 0 15px #ff3860) drop-shadow(0 0 25px #ff386088)} 50%{transform:scale(1.4) translateZ(30px); filter:drop-shadow(0 0 25px #ff3860) drop-shadow(0 0 40px #ff3860aa)} 75%{transform:scale(1.2) translateZ(15px); filter:drop-shadow(0 0 15px #ff3860) drop-shadow(0 0 25px #ff386088)} }
        @keyframes defeatEntrance { 0%{transform:perspective(800px) rotateX(30deg) scale(0.7); opacity:0} 60%{transform:perspective(800px) rotateX(-5deg) scale(1.05); opacity:1} 100%{transform:perspective(800px) rotateX(0deg) scale(1); opacity:1} }
        @keyframes gridScroll3D { 0%{background-position:0 0} 100%{background-position:0 50px} }
        @keyframes depthFog { 0%,100%{opacity:0.3} 50%{opacity:0.5} }
        @keyframes vignettePulse { 0%,100%{opacity:0.4} 50%{opacity:0.6} }
      `}</style>
    </StarfieldBackground>
  );
}
export { PtComponent as default };
