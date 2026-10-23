import { ZapIcon, BookOpenIcon, TrophyIcon, ArrowLeftIcon, LayersIcon, TimerIcon } from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g, a as a_1 } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
function le(espanol) {
  return espanol
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-ZÑ]/g, "")
    .trim();
}
function ie(t) {
  const r = [...t];
  for (let n = r.length - 1; n > 0; n--) {
    const l = Math.floor(Math.random() * (n + 1));
    [r[n], r[l]] = [r[l], r[n]];
  }
  return r;
}
function ce() {
  const t = ["#2080ff", "#ff00aa", "#00d4ff", "#ffd600", "#ff4757", "#2ed573", "#ffa502"];
  const r = ["circle", "square"];
  for (let n = 0; n < 120; n++) {
    const l = document.createElement("div");
    const d = t[Math.floor(Math.random() * t.length)];
    const a = r[Math.floor(Math.random() * r.length)];
    const i = 6 + Math.random() * 8;
    let m = "";
    if (a === "square") {
      m = "border-radius:2px;";
    } else {
      m = "border-radius:50%;";
    }
    l.style.cssText = `position:fixed;left:50%;top:50%;width:${i}px;height:${i}px;background:${d};${m}pointer-events:none;z-index:9999;`;
    document.body.appendChild(l);
    const b = Math.random() * Math.PI * 2;
    const h = 4 + Math.random() * 16;
    let w = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let k = 1;
    let x = 0;
    const M = Math.cos(b) * h;
    let f = Math.sin(b) * h - 5;
    const C = 0.3;
    const c = () => {
      w += M;
      y += f;
      f += C;
      x += 8;
      k -= 0.008;
      l.style.left = `${w}px`;
      l.style.top = `${y}px`;
      l.style.opacity = String(k);
      l.style.transform = `rotate(${x}deg)`;
      if (k > 0) {
        requestAnimationFrame(c);
      } else {
        l.remove();
      }
    };
    requestAnimationFrame(c);
  }
}
const de = Array.from(
  {
    length: 32,
  },
  (t, id) => ({
    id,
    left: `${String(Math.random() * 100)}%`,
    delay: `${String(Math.random() * 5)}s`,
    duration: `${String(3 + Math.random() * 5)}s`,
    size: `${String(2 + Math.random() * 5)}px`,
    color: ["#2080ff", "#ff00aa", "#00d4ff", "#ffd600", "#2ed573", "#ff4757"][Math.floor(Math.random() * 6)],
  }),
);
function Q1Component() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {de.map((t) => (
        <div
          key={t.id}
          className="absolute rounded-full"
          style={{
            left: t.left,
            bottom: "-10px",
            width: t.size,
            height: t.size,
            background: t.color,
            boxShadow: `0 0 12px ${t.color}`,
            opacity: 0,
            animation: `particleFloat ${t.duration} ${t.delay} linear infinite`,
          }}
        />
      ))}
    </div>
  );
}
function UComponent({ mood }) {
  const r = `mascot-grad-${mood}`;
  return (
    <div
      className="fixed bottom-4 right-4 z-50 pointer-events-none"
      style={{
        animation: "mascotFloat 3s ease-in-out infinite",
      }}
    >
      <svg
        width="100"
        height="100"
        viewBox="0 0 120 120"
        className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
      >
        <defs>
          <linearGradient id="mascot-grad-neutral" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2080ff" />
            <stop offset="100%" stopColor="#00d4ff" />
          </linearGradient>
          <linearGradient id="mascot-grad-sad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5c6b7f" />
            <stop offset="100%" stopColor="#3a4554" />
          </linearGradient>
          <linearGradient id="mascot-grad-excited" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff00aa" />
            <stop offset="100%" stopColor="#ffd600" />
          </linearGradient>
          <linearGradient id="mascot-grad-happy" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff00aa" />
            <stop offset="100%" stopColor="#2080ff" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="65" r="42" fill={`url(#${r})`} />
        {mood === "neutral" && (
          <>
            <ellipse cx="46" cy="60" rx="5" ry="7" fill="#fff" />
            <ellipse cx="74" cy="60" rx="5" ry="7" fill="#fff" />
            <circle cx="47" cy="61" r="2" fill="#0e1640" />
            <circle cx="75" cy="61" r="2" fill="#0e1640" />
          </>
        )}
        {mood === "happy" && (
          <>
            <path d="M42 62 Q47 55 52 62" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M68 62 Q73 55 78 62" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        )}
        {mood === "excited" && (
          <>
            <path d="M42 56 L47 66 L52 56 L47 61 Z" fill="#ffd600" />
            <path d="M68 56 L73 66 L78 56 L73 61 Z" fill="#ffd600" />
          </>
        )}
        {mood === "sad" && (
          <>
            <ellipse cx="46" cy="62" rx="5" ry="6" fill="#fff" />
            <ellipse cx="74" cy="62" rx="5" ry="6" fill="#fff" />
            <path d="M43 56 Q46 53 49 56" stroke="#fff" strokeWidth="1.5" fill="none" />
            <path d="M71 56 Q74 53 77 56" stroke="#fff" strokeWidth="1.5" fill="none" />
            <circle cx="46" cy="72" r="2.5" fill="#00d4ff" opacity="0.8">
              <animate attributeName="cy" from="72" to="88" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.8" to="0" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </>
        )}
        {mood === "neutral" && (
          <path d="M53 78 Q60 82 67 78" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}
        {mood === "happy" && (
          <path d="M52 76 Q60 88 68 76" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
        )}
        {mood === "excited" && (
          <>
            <path d="M53 75 Q60 90 67 75 Z" fill="#ff4757" />
            <path d="M58 80 Q60 84 62 80" stroke="#fff" strokeWidth="1" fill="none" />
          </>
        )}
        {mood === "sad" && (
          <path d="M53 82 Q60 76 67 82" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}
        {(mood === "happy" || mood === "excited") && (
          <>
            <circle cx="38" cy="70" r="4" fill="#ff8fab" opacity="0.6" />
            <circle cx="82" cy="70" r="4" fill="#ff8fab" opacity="0.6" />
          </>
        )}
        {mood === "excited" && (
          <>
            <circle cx="22" cy="42" r="2" fill="#ffd600" opacity="0.8">
              <animate attributeName="r" values="2;4;2" dur="1s" repeatCount="indefinite" />
            </circle>
            <circle cx="98" cy="38" r="2" fill="#ff00aa" opacity="0.8">
              <animate attributeName="r" values="2;4;2" dur="1.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="18" cy="72" r="1.5" fill="#00d4ff" opacity="0.8">
              <animate attributeName="r" values="1.5;3;1.5" dur="0.8s" repeatCount="indefinite" />
            </circle>
          </>
        )}
      </svg>
    </div>
  );
}
function XeComponent({ combo }) {
  const r = Math.max(0.2, 0.6 - combo * 0.08);
  const n = {
    animation: `trackScroll ${r}s linear infinite`,
  };
  const l = {
    animation: `trackScroll ${r * 1.3}s linear infinite`,
  };
  const d = {
    animation: `trackScroll ${r * 0.7}s linear infinite`,
  };
  const a = {
    animation: `speedLine ${r * 0.5}s linear infinite`,
  };
  const i = {
    animation: `speedLine ${r * 0.7}s linear infinite reverse`,
  };
  return (
    <div
      className="relative w-full h-40 mt-4 overflow-hidden"
      style={{
        perspective: "600px",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: "rotateX(60deg) translateY(40px)",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(5,8,27,0.95), rgba(14,22,64,0.7))",
            border: "1px solid rgba(0,212,255,0.15)",
            borderRadius: "8px",
          }}
        />
        <div
          className="absolute left-1/3 top-0 bottom-0"
          style={{
            width: "2px",
            background:
              "repeating-linear-gradient(0deg, rgba(0,212,255,0.35) 0px, rgba(0,212,255,0.35) 20px, transparent 20px, transparent 40px)",
            ...n,
          }}
        />
        <div
          className="absolute left-2/3 top-0 bottom-0"
          style={{
            width: "2px",
            background:
              "repeating-linear-gradient(0deg, rgba(255,0,170,0.35) 0px, rgba(255,0,170,0.35) 20px, transparent 20px, transparent 40px)",
            ...l,
          }}
        />
        <div
          className="absolute left-1/2 top-0 bottom-0"
          style={{
            width: "3px",
            transform: "translateX(-50%)",
            background:
              "repeating-linear-gradient(0deg, rgba(255,214,0,0.55) 0px, rgba(255,214,0,0.55) 15px, transparent 15px, transparent 35px)",
            ...d,
          }}
        />
        <div
          className="absolute left-0 top-0 bottom-0"
          style={{
            width: "4px",
            background: "linear-gradient(180deg, rgba(0,212,255,0.5), rgba(255,0,170,0.5))",
            animation: "laneGlow 2s ease-in-out infinite",
            borderRadius: "2px 0 0 2px",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0"
          style={{
            width: "4px",
            background: "linear-gradient(180deg, rgba(255,0,170,0.5), rgba(0,212,255,0.5))",
            animation: "laneGlow 2s ease-in-out infinite reverse",
            borderRadius: "0 2px 2px 0",
          }}
        />
        <div
          className="absolute left-1/2"
          style={{
            bottom: "45%",
            width: "36px",
            height: "36px",
            transform: "translateX(-50%) translateZ(30px)",
            background: "linear-gradient(135deg, #00d4ff, #2080ff)",
            borderRadius: "8px",
            boxShadow:
              "0 0 30px rgba(0,212,255,0.7), 0 0 60px rgba(32,128,255,0.4), inset 0 0 12px rgba(255,255,255,0.3)",
            animation: "runnerBob 0.3s ease-in-out infinite",
          }}
        />
        <div
          className="absolute left-1/2"
          style={{
            bottom: "35%",
            width: "24px",
            height: "50px",
            transform: "translateX(-50%) translateZ(25px)",
            background: "linear-gradient(180deg, rgba(0,212,255,0.3), transparent)",
            borderRadius: "50% 50% 0 0",
            filter: "blur(6px)",
            animation: "runnerTrail 0.3s ease-in-out infinite",
          }}
        />
        {combo > 1 && (
          <>
            <div
              className="absolute"
              style={{
                top: "15%",
                left: "0",
                width: "80px",
                height: "2px",
                background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.4))",
                ...a,
              }}
            />
            <div
              className="absolute"
              style={{
                top: "75%",
                right: "0",
                width: "80px",
                height: "2px",
                background: "linear-gradient(90deg, rgba(255,0,170,0.4), transparent)",
                ...i,
              }}
            />
            <div
              className="absolute"
              style={{
                top: "30%",
                left: "0",
                width: "60px",
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(255,214,0,0.3))",
                ...a,
              }}
            />
          </>
        )}
        {combo >= 3 && (
          <>
            <div
              className="absolute left-1/2"
              style={{
                bottom: "25%",
                width: "28px",
                height: "60px",
                transform: "translateX(-50%) translateZ(20px)",
                background: "linear-gradient(180deg, rgba(255,214,0,0.5), transparent)",
                borderRadius: "50% 50% 0 0",
                filter: "blur(5px)",
                animation: "comboFlame 0.25s ease-in-out infinite",
              }}
            />
            <div
              className="absolute left-1/2"
              style={{
                bottom: "20%",
                width: "36px",
                height: "20px",
                transform: "translateX(-50%) translateZ(15px)",
                background: "radial-gradient(ellipse, rgba(255,100,0,0.4), transparent)",
                filter: "blur(8px)",
                animation: "comboFlame 0.4s ease-in-out infinite reverse",
              }}
            />
          </>
        )}
        <div
          className="absolute"
          style={{
            left: "20%",
            bottom: "55%",
            width: "20px",
            height: "20px",
            background: "linear-gradient(135deg, #ef4444, #ff6b35)",
            borderRadius: "4px",
            boxShadow: "0 0 15px rgba(239,68,68,0.5)",
            animation: `obstacleApproach ${r * 3}s linear infinite`,
            opacity: 0.7,
          }}
        />
        <div
          className="absolute"
          style={{
            left: "70%",
            bottom: "50%",
            width: "18px",
            height: "18px",
            background: "linear-gradient(135deg, #ef4444, #ff6b35)",
            borderRadius: "4px",
            boxShadow: "0 0 15px rgba(239,68,68,0.5)",
            animation: `obstacleApproach ${r * 4}s linear infinite`,
            animationDelay: "1.5s",
            opacity: 0.7,
          }}
        />
      </div>
    </div>
  );
}
function FeComponent({ timeLeft, maxTime }) {
  const n = Math.max(0, timeLeft / maxTime);
  const l = 2 * Math.PI * 52;
  const d = l * (1 - n);
  const a = timeLeft <= 10 ? "#ef4444" : timeLeft <= 30 ? "#f97316" : "#00d4ff";
  const i =
    timeLeft <= 10 ? "rgba(239,68,68,0.6)" : timeLeft <= 30 ? "rgba(249,115,22,0.5)" : "rgba(0,212,255,0.5)";
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: "110px",
        height: "110px",
        animation: timeLeft <= 10 ? "timerPulse 0.6s ease-in-out infinite" : "none",
      }}
    >
      <svg
        width="110"
        height="110"
        viewBox="0 0 110 110"
        className="absolute inset-0"
        style={{
          transform: "rotate(-90deg)",
        }}
      >
        <circle cx="55" cy="55" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
        <circle
          cx="55"
          cy="55"
          r="52"
          fill="none"
          stroke={a}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={String(l)}
          strokeDashoffset={String(d)}
          style={{
            transition: "stroke-dashoffset 0.5s ease",
            filter: `drop-shadow(0 0 8px ${a})`,
          }}
        />
      </svg>
      <div className="text-center">
        <span
          className="text-2xl font-black"
          style={{
            color: a,
            textShadow: `0 0 15px ${i}`,
          }}
        >
          {timeLeft}
        </span>
        <span
          className="block text-xs font-bold"
          style={{
            color: "rgba(255,255,255,0.3)",
          }}
        >
          s
        </span>
      </div>
    </div>
  );
}
function PeComponent({ score }) {
  const rRef = React.useRef(score);
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    if (score > rRef.current) {
      setN((a) => a + 1);
      rRef.current = score;
    }
  }, [score]);
  const d = React.useMemo(() => {
    const a = ["#00d4ff", "#ff00aa", "#ffd600", "#2080ff", "#2ed573", "#ff6b35"];
    return Array.from(
      {
        length: 24,
      },
      (i, m) => {
        const b = (m / 24) * Math.PI * 2 + Math.random() * 0.5;
        const h = 50 + Math.random() * 120;
        return {
          tx: Math.cos(b) * h,
          ty: Math.sin(b) * h - 30,
          color: a[Math.floor(Math.random() * a.length)],
          size: 4 + Math.random() * 8,
          delay: Math.random() * 0.15,
        };
      },
    );
  }, [n]);
  if (n === 0) {
    return null;
  }
  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      {d.map((a, key) => (
        <div
          key={key}
          className="absolute rounded-full"
          style={{
            width: `${a.size}px`,
            height: `${a.size}px`,
            left: "50%",
            top: "50%",
            marginLeft: `${-(a.size / 2)}px`,
            marginTop: `${-(a.size / 2)}px`,
            background: a.color,
            boxShadow: `0 0 15px ${a.color}, 0 0 30px ${a.color}`,
            animation: `burstFly 0.7s ease-out ${a.delay}s forwards`,
            "--tx": `${a.tx}px`,
            "--ty": `${a.ty}px`,
          }}
        />
      ))}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,255,0.4), transparent)",
          filter: "blur(10px)",
          animation: "burstRing 0.5s ease-out forwards",
        }}
      />
    </div>
  );
}
function MeComponent({ score, combo }) {
  const nRef = React.useRef(score);
  const [l, setL] = React.useState(false);
  React.useEffect(() => {
    if (score > nRef.current) {
      setL(true);
      const m = setTimeout(() => setL(false), 500);
      nRef.current = score;
      return () => clearTimeout(m);
    }
    nRef.current = score;
  }, [score]);
  const color = combo >= 5 ? "#ff00aa" : combo >= 3 ? "#ffd600" : "#00d4ff";
  const i = combo >= 5 ? "rgba(255,0,170,0.6)" : combo >= 3 ? "rgba(255,214,0,0.5)" : "rgba(0,212,255,0.5)";
  return (
    <div
      className="text-center"
      style={{
        perspective: "400px",
      }}
    >
      <div
        className="text-5xl md:text-6xl font-black"
        style={{
          color,
          textShadow: `0 0 20px ${i}, 0 0 50px ${i}`,
          transform: "rotateX(15deg) translateZ(30px)",
          animation: l ? "scorePop 0.5s ease-out" : "none",
          transition: "color 0.3s ease",
        }}
      >
        {score}
      </div>
      <div
        className="text-xs font-bold tracking-widest uppercase mt-1"
        style={{
          color: "rgba(255,255,255,0.3)",
        }}
      >
        SCORE
      </div>
    </div>
  );
}
function UeComponent({ chino, espanol, index }) {
  return (
    <div
      className="mb-6"
      style={{
        perspective: "1000px",
      }}
    >
      <div
        className="rounded-3xl p-6 md:p-8 text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, rgba(14,22,64,0.85), rgba(5,8,27,0.65))",
          border: "1px solid rgba(0,212,255,0.2)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 0 60px rgba(0,212,255,0.1), 0 25px 80px rgba(0,0,0,0.4)",
          animation:
            "neonPulse 3s ease-in-out infinite, wordFloat 5s ease-in-out infinite, popIn 0.5s ease-out",
          transform: "rotateX(8deg) rotateY(0deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute -inset-[3px] rounded-[28px] -z-10"
          style={{
            background: "linear-gradient(135deg, #00d4ff, #ff00aa, #2080ff)",
            opacity: 0.5,
            filter: "blur(18px)",
            animation: "neonPulse 3s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-2 right-2"
          style={{
            width: "40px",
            height: "40px",
            border: "2px solid rgba(255,214,0,0.3)",
            borderRadius: "50%",
            borderTopColor: "#ffd600",
            animation: "rotate3D 2s linear infinite",
          }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <p
              className="text-xs font-bold uppercase tracking-wider mb-2"
              style={{
                color: "rgba(207,216,255,0.4)",
              }}
            >
              Español / 西班牙语
            </p>
            <p
              className="text-3xl md:text-4xl font-black"
              style={{
                color: "#fff",
                textShadow: "0 0 30px rgba(255,255,255,0.2), 0 0 60px rgba(32,128,255,0.15)",
                animation: "neonFlicker 3s ease-in-out infinite",
              }}
            >
              ???
            </p>
          </div>
          <div>
            <p
              className="text-xs font-bold uppercase tracking-wider mb-2"
              style={{
                color: "rgba(207,216,255,0.4)",
              }}
            >
              Chino / 中文
            </p>
            <p
              className="text-3xl md:text-4xl font-black"
              style={{
                color: "#ff00aa",
                textShadow: "0 0 30px rgba(255,0,170,0.4), 0 0 60px rgba(255,0,170,0.2)",
                animation: "neonFlicker 4s ease-in-out infinite",
              }}
            >
              {chino}
            </p>
          </div>
        </div>
        <div className="mt-4 text-center">
          <span
            className="text-xs font-bold px-3 py-1 rounded-full"
            style={{
              background: "rgba(0,212,255,0.1)",
              border: "1px solid rgba(0,212,255,0.2)",
              color: "#00d4ff",
              boxShadow: "0 0 10px rgba(0,212,255,0.1)",
            }}
          >
            Palabra {index + 1}
          </span>
        </div>
      </div>
    </div>
  );
}
function GeComponent({ combo }) {
  if (combo < 3) {
    return null;
  }
  return (
    <div
      className="fixed inset-0 pointer-events-none z-20"
      style={{
        background: "radial-gradient(ellipse at center, rgba(0,212,255,0.03) 0%, transparent 70%)",
        animation: "neonPulse 2s ease-in-out infinite",
      }}
    />
  );
}
function BeComponent({ score, bestScore, bestStreak, streak, onRestart, onChange }) {
  const i = score >= bestScore && score > 0;
  const color = i ? "#ffd600" : "#ef4444";
  const b = i ? "rgba(255,214,0,0.5)" : "rgba(239,68,68,0.4)";
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background: "rgba(3,4,17,0.92)",
        backdropFilter: "blur(24px)",
      }}
    >
      <div
        className="text-center p-6 md:p-8 rounded-3xl max-w-md mx-4 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, rgba(14,22,64,0.85), rgba(5,8,27,0.65))",
          border: "1px solid rgba(0,212,255,0.2)",
          boxShadow: "0 0 80px rgba(32,128,255,0.15), 0 40px 100px rgba(0,0,0,0.5)",
          perspective: "800px",
          animation: "popIn 0.6s ease-out",
          transform: "rotateX(3deg)",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute -inset-[3px] rounded-[28px] -z-10"
          style={{
            background: `linear-gradient(135deg, ${color}, #ff00aa)`,
            opacity: 0.6,
            filter: "blur(25px)",
            animation: "neonPulse 3s ease-in-out infinite",
          }}
        />
        <TrophyIcon
          size={56}
          style={{
            color,
            margin: "0 auto 16px",
            filter: `drop-shadow(0 0 15px ${b})`,
          }}
        />
        <h2
          className="text-3xl md:text-4xl font-black mb-2"
          style={{
            background: "linear-gradient(135deg, #2080ff, #ff00aa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 15px rgba(32,128,255,0.3))",
          }}
        >
          {i ? "¡Nuevo Récord!" : "¡Tiempo!"}
        </h2>
        <p className="text-white/50 text-sm mb-6">{i ? "新纪录！" : "时间到！"}</p>
        <div
          className="grid grid-cols-2 gap-4 mb-6"
          style={{
            perspective: "500px",
          }}
        >
          <div
            className="p-4 rounded-xl transition-all hover:scale-105"
            style={{
              background: "rgba(32,128,255,0.1)",
              border: "1px solid rgba(32,128,255,0.2)",
              boxShadow: "0 0 15px rgba(32,128,255,0.1)",
              transform: "rotateY(-5deg) translateZ(10px)",
              animation: "neonPulse 3s ease-in-out infinite",
            }}
          >
            <ZapIcon
              size={18}
              style={{
                color: "#2080ff",
                margin: "0 auto 6px",
              }}
            />
            <p
              className="text-xs"
              style={{
                color: "rgba(207,216,255,0.5)",
              }}
            >
              Score
            </p>
            <p
              className="text-xl font-black"
              style={{
                color: "#2080ff",
                textShadow: "0 0 10px rgba(32,128,255,0.3)",
              }}
            >
              {score}
            </p>
          </div>
          <div
            className="p-4 rounded-xl transition-all hover:scale-105"
            style={{
              background: "rgba(255,0,170,0.1)",
              border: "1px solid rgba(255,0,170,0.2)",
              boxShadow: "0 0 15px rgba(255,0,170,0.1)",
              transform: "rotateY(5deg) translateZ(10px)",
              animation: "neonPulse 3s ease-in-out infinite 0.5s",
            }}
          >
            <ZapIcon
              size={18}
              style={{
                color: "#ff00aa",
                margin: "0 auto 6px",
              }}
            />
            <p
              className="text-xs"
              style={{
                color: "rgba(207,216,255,0.5)",
              }}
            >
              Mejor Racha
            </p>
            <p
              className="text-xl font-black"
              style={{
                color: "#ff00aa",
                textShadow: "0 0 10px rgba(255,0,170,0.3)",
              }}
            >
              {bestStreak}
            </p>
          </div>
          <div
            className="p-4 rounded-xl transition-all hover:scale-105"
            style={{
              background: "rgba(255,214,0,0.1)",
              border: "1px solid rgba(255,214,0,0.2)",
              boxShadow: "0 0 15px rgba(255,214,0,0.1)",
              transform: "rotateY(-5deg) translateZ(10px)",
              animation: "neonPulse 3s ease-in-out infinite 1s",
            }}
          >
            <TrophyIcon
              size={18}
              style={{
                color: "#ffd600",
                margin: "0 auto 6px",
              }}
            />
            <p
              className="text-xs"
              style={{
                color: "rgba(207,216,255,0.5)",
              }}
            >
              Mejor Score
            </p>
            <p
              className="text-xl font-black"
              style={{
                color: "#ffd600",
                textShadow: "0 0 10px rgba(255,214,0,0.3)",
              }}
            >
              {bestScore}
            </p>
          </div>
          <div
            className="p-4 rounded-xl transition-all hover:scale-105"
            style={{
              background: "rgba(0,212,255,0.1)",
              border: "1px solid rgba(0,212,255,0.2)",
              boxShadow: "0 0 15px rgba(0,212,255,0.1)",
              transform: "rotateY(5deg) translateZ(10px)",
              animation: "neonPulse 3s ease-in-out infinite 1.5s",
            }}
          >
            <TimerIcon
              size={18}
              style={{
                color: "#00d4ff",
                margin: "0 auto 6px",
              }}
            />
            <p
              className="text-xs"
              style={{
                color: "rgba(207,216,255,0.5)",
              }}
            >
              Palabras
            </p>
            <p
              className="text-xl font-black"
              style={{
                color: "#00d4ff",
                textShadow: "0 0 10px rgba(0,212,255,0.3)",
              }}
            >
              {streak}
            </p>
          </div>
        </div>
        <div className="flex gap-3 justify-center flex-wrap items-center">
          <button
            onClick={onRestart}
            className="px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #2080ff, #ff00aa)",
              boxShadow: "0 0 30px rgba(32,128,255,0.3)",
              animation: "neonPulse 3s ease-in-out infinite",
            }}
          >
            Jugar de nuevo / 再玩一次
          </button>
          <button
            onClick={onChange}
            className="px-4 py-3 rounded-full text-xs font-bold transition-all hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff",
            }}
          >
            Cambiar / 切换
          </button>
          <P currentGameId="word-dash" />
        </div>
      </div>
    </div>
  );
}
const K = `
@keyframes mascotFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-14px) rotate(2deg); }
}
@keyframes particleFloat {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  10% { opacity: 0.6; }
  90% { opacity: 0.4; }
  100% { transform: translateY(-110vh) scale(0.4); opacity: 0; }
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  15% { transform: translateX(-10px); }
  30% { transform: translateX(10px); }
  45% { transform: translateX(-8px); }
  60% { transform: translateX(8px); }
  75% { transform: translateX(-4px); }
  90% { transform: translateX(4px); }
}
@keyframes neonPulse {
  0%, 100% { box-shadow: 0 0 20px rgba(32,128,255,0.3), 0 0 40px rgba(255,0,170,0.1); }
  50% { box-shadow: 0 0 40px rgba(32,128,255,0.5), 0 0 80px rgba(255,0,170,0.25); }
}
@keyframes popIn {
  0% { transform: scale(0.85) translateY(20px); opacity: 0; }
  100% { transform: scale(1) translateY(0); opacity: 1; }
}
@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
/* === 3D SPEED/RUNNING TRACK ANIMATIONS === */
@keyframes trackScroll {
  0% { background-position: 0 0; }
  100% { background-position: 0 -80px; }
}
@keyframes runnerBob {
  0%, 100% { transform: translateX(-50%) translateZ(30px) translateY(0); }
  50% { transform: translateX(-50%) translateZ(30px) translateY(-14px); }
}
@keyframes runnerTrail {
  0%, 100% { opacity: 0.3; transform: translateX(-50%) translateZ(25px) scaleY(1); }
  50% { opacity: 0.6; transform: translateX(-50%) translateZ(25px) scaleY(0.8); }
}
@keyframes laneGlow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.9; }
}
@keyframes wordFloat {
  0%, 100% { transform: rotateX(8deg) rotateY(0deg) translateY(0); }
  25% { transform: rotateX(6deg) rotateY(3deg) translateY(-8px); }
  50% { transform: rotateX(8deg) rotateY(-2deg) translateY(-4px); }
  75% { transform: rotateX(7deg) rotateY(2deg) translateY(-6px); }
}
@keyframes neonFlicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
  20%, 24%, 55% { opacity: 0.7; }
}
@keyframes timerPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}
@keyframes speedLine {
  0% { transform: translateX(-100%); opacity: 0; }
  30% { opacity: 0.8; }
  100% { transform: translateX(200%); opacity: 0; }
}
@keyframes burstFly {
  0% { transform: translate(0, 0) scale(1); opacity: 1; }
  100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
}
@keyframes burstRing {
  0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
}
@keyframes comboFlame {
  0%, 100% { opacity: 0.4; transform: translateX(-50%) translateZ(20px) scaleY(1); }
  50% { opacity: 0.8; transform: translateX(-50%) translateZ(20px) scaleY(1.3); }
}
@keyframes obstacleApproach {
  0% { transform: translateZ(-300px) scale(0.2); opacity: 0.6; }
  100% { transform: translateZ(100px) scale(1.2); opacity: 0; }
}
@keyframes scorePop {
  0% { transform: rotateX(15deg) translateZ(30px) scale(1); }
  40% { transform: rotateX(15deg) translateZ(40px) scale(1.25); }
  100% { transform: rotateX(15deg) translateZ(30px) scale(1); }
}
@keyframes rotate3D {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
function NeComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [a, setA] = React.useState("select");
  const [m, setM] = React.useState([]);
  const [h, setH] = React.useState(0);
  const [y, setY] = React.useState("");
  const [x, setX] = React.useState(60);
  const [f, setF] = React.useState(0);
  const [c, setC] = React.useState(0);
  const [bestStreak, setBestStreak] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("worddash_beststreak") || "0");
    } catch {
      return 0;
    }
  });
  const [z, setZ] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("worddash_best") || "0");
    } catch {
      return 0;
    }
  });
  const [N, setN] = React.useState(1);
  const FRef = React.useRef(null);
  const ee = g();
  const [E, setE] = React.useState("");
  const [R, setR] = React.useState("neutral");
  const [S, setS] = React.useState(false);
  const TRef = React.useRef(f);
  const PRef = React.useRef(c);
  const j = m[h];
  const Z = React.useCallback((s) => {
    playClick();
    let u = s ? a_1(s) : a_1();
    if (u.length === 0) {
      setE(
        'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
      );
      return;
    }
    const I = ie(
      u
        .filter((p) => p.espanol && p.chino)
        .map((p) => ({
          espanol: le(p.espanol),
          chino: p.chino,
        }))
        .filter((p) => p.espanol.length >= 3 && p.espanol.length <= 12),
    );
    setM(I);
    setH(0);
    setY("");
    setX(60);
    setF(0);
    setC(0);
    setN(1);
    setA("playing");
    setR("neutral");
  }, []);
  React.useEffect(() => {
    if (a === "playing" && x > 0) {
      FRef.current = setInterval(() => setX((s) => s - 1), 1000);
      return () => {
        if (FRef.current) {
          clearInterval(FRef.current);
        }
      };
    }
  }, [a, x]);
  React.useEffect(() => {
    if (a === "playing" && x <= 0) {
      playLose();
      setA("gameover");
      setZ((s) => {
        const u = Math.max(s, f);
        localStorage.setItem("worddash_best", String(u));
        return u;
      });
      setBestStreak((s) => {
        const u = Math.max(s, c);
        localStorage.setItem("worddash_beststreak", String(u));
        return u;
      });
    }
  }, [a, x, f, c]);
  React.useEffect(() => {
    if (a === "playing" && f > TRef.current) {
      setR("happy");
      const s = setTimeout(() => setR(c >= 5 ? "excited" : "neutral"), 900);
      TRef.current = f;
      return () => clearTimeout(s);
    }
    TRef.current = f;
  }, [f, a, c]);
  React.useEffect(() => {
    if (a === "playing" && c > PRef.current && c > 0 && c % 5 === 0) {
      setR("excited");
      const s = setTimeout(() => setR("neutral"), 1500);
      PRef.current = c;
      return () => clearTimeout(s);
    }
    PRef.current = c;
  }, [c, a]);
  React.useEffect(() => {
    if (a === "playing") {
      if (x <= 10 && x > 0) {
        setR("sad");
      } else if (x > 10 && R === "sad") {
        setR("neutral");
      }
    }
  }, [x, a, R]);
  React.useEffect(() => {
    if (a === "gameover") {
      setR(f >= z && f > 0 ? "excited" : "sad");
    }
  }, [a, f, z]);
  React.useEffect(() => {
    if (a === "playing" && j && y.length > 0 && y.length >= j.espanol.length && y !== j.espanol) {
      setR("sad");
      setS(true);
      playWrong();
      const s = setTimeout(() => {
        setR("neutral");
        setS(false);
      }, 600);
      return () => clearTimeout(s);
    }
  }, [y, j, a, playWrong]);
  const te = (s) => {
    const u = s
      .toUpperCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^A-ZÑ]/g, "")
      .trim();
    setY(u);
    if (!j || u !== j.espanol) {
      return;
    }
    playCorrect();
    const I = 100 * N;
    setF((p) => p + I);
    setC((p) => p + 1);
    setN((p) => Math.min(p + 1, 5));
    setY("");
    setH((p) => p + 1);
    ce();
  };
  const onKeyDown = (s) => {
    if (s.key === "Enter") {
      te(y);
    }
  };
  if (a === "select") {
    return (
      <StarfieldBackground>
        <style>{K}</style>
        <Q1Component />
        <UComponent mood="neutral" />
        <div className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative z-10">
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
              className="text-4xl md:text-6xl font-black mb-3"
              style={{
                textShadow: "0 0 40px rgba(0,212,255,0.4), 0 0 80px rgba(255,0,170,0.2)",
                background: "linear-gradient(135deg, #2080ff, #ff00aa, #00d4ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% 200%",
                animation: "gradientMove 4s ease infinite",
              }}
            >
              <ZapIcon
                size={40}
                className="inline mr-3 align-middle"
                style={{
                  fill: "none",
                  stroke: "#ffd600",
                }}
              />{" "}
              Word Dash
            </h1>
            <p className="text-white/40 text-sm font-medium">
              Selecciona un módulo para jugar / 选择模块开始游戏
            </p>
            {E && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold animate-pulse"
                style={{
                  background: "rgba(255,68,68,0.12)",
                  border: "1px solid rgba(255,68,68,0.3)",
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
                Z(null);
              }}
              className="group rounded-xl p-5 text-left transition-all hover:scale-[1.03] hover:-translate-y-1"
              style={{
                background: "rgba(14,22,64,0.6)",
                border: "1px solid rgba(255,0,170,0.3)",
                boxShadow: "0 0 20px rgba(255,0,170,0.1)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all group-hover:scale-110 group-hover:rotate-3"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                  boxShadow: "0 0 25px rgba(255,0,170,0.4)",
                }}
              >
                <LayersIcon size={24} className="text-white" />
              </div>
              <h3 className="text-white font-black text-base mb-1">Todos los módulos</h3>
              <p
                className="text-xs font-medium mb-1"
                style={{
                  color: "rgba(255,0,170,0.7)",
                }}
              >
                所有模块
              </p>
              <p className="text-xs font-medium text-white/40">Mezcla todo el vocabulario</p>
            </button>
            {ee.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  playClick();
                  setE("");
                  Z(s.id);
                }}
                className="group rounded-xl p-5 text-left transition-all hover:scale-[1.03] hover:-translate-y-1"
                style={{
                  background: "rgba(14,22,64,0.6)",
                  border: `1px solid ${s.color}40`,
                  boxShadow: `0 0 20px ${s.color}15`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    background: `linear-gradient(135deg, ${s.color}, ${s.color}88)`,
                    boxShadow: `0 0 25px ${s.color}40`,
                  }}
                >
                  <BookOpenIcon size={24} className="text-white" />
                </div>
                <h3 className="text-white font-black text-base mb-1">{s.titulo}</h3>
                <p
                  className="text-xs font-medium mb-1"
                  style={{
                    color: `${s.color}aa`,
                  }}
                >
                  {s.tituloChino}
                </p>
                <p className="text-xs font-medium text-white/40">{s.vocabularioCount} palabras / 词</p>
              </button>
            ))}
          </div>
        </div>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <style>{K}</style>
      <Q1Component />
      <UComponent mood={R} />
      <GeComponent combo={N} />
      <PeComponent score={f} />
      <div className="max-w-3xl mx-auto px-4 py-6 min-h-screen relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 mb-4">
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold"
          >
            <ArrowLeftIcon size={16} /> Volver / 返回
          </Link>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <SoundToggles />
            <button
              onClick={() => {
                playClick();
                setA("select");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#fff",
              }}
            >
              <LayersIcon size={12} /> Cambiar / 切换
            </button>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(32,128,255,0.1)",
                border: "1px solid rgba(32,128,255,0.2)",
                color: "#2080ff",
                boxShadow: "0 0 10px rgba(32,128,255,0.2)",
              }}
            >
              <ZapIcon size={12} /> x{N}
            </div>
            <div
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 ${x <= 10 ? "animate-pulse" : ""}`}
              style={{
                background: x <= 10 ? "rgba(255,68,68,0.15)" : "rgba(255,0,170,0.1)",
                border: x <= 10 ? "1px solid rgba(255,68,68,0.3)" : "1px solid rgba(255,0,170,0.2)",
                color: x <= 10 ? "#ff6b35" : "#ff00aa",
                boxShadow: x <= 10 ? "0 0 15px rgba(255,68,68,0.3)" : "0 0 10px rgba(255,0,170,0.2)",
              }}
            >
              <TimerIcon size={12} /> {x}s
            </div>
          </div>
        </div>
        <div className="text-center mb-4">
          <h1
            className="text-3xl md:text-5xl font-black mb-2"
            style={{
              background: "linear-gradient(135deg, #2080ff, #ff00aa, #00d4ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% 200%",
              animation: "gradientMove 4s ease infinite",
              filter: "drop-shadow(0 0 20px rgba(32,128,255,0.3))",
            }}
          >
            Word Dash
          </h1>
          <p className="text-white/40 text-xs font-medium">Escribe la palabra española / 输入西班牙语单词</p>
        </div>
        <div className="flex items-center justify-center gap-6 mb-6">
          <MeComponent score={f} combo={c} />
          <FeComponent timeLeft={x} maxTime={60} />
        </div>
        <div className="flex gap-3 justify-center mb-4 flex-wrap">
          <div
            className="px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105"
            style={{
              background: "rgba(32,128,255,0.1)",
              border: "1px solid rgba(32,128,255,0.2)",
              color: "#2080ff",
              boxShadow: "0 0 10px rgba(32,128,255,0.2)",
            }}
          >
            <ZapIcon size={12} className="inline mr-1" /> Racha: {c}
          </div>
          <div
            className="px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105"
            style={{
              background: "rgba(255,0,170,0.1)",
              border: "1px solid rgba(255,0,170,0.2)",
              color: "#ff00aa",
              boxShadow: "0 0 10px rgba(255,0,170,0.2)",
            }}
          >
            <ZapIcon size={12} className="inline mr-1" /> Combo: x{N}
          </div>
        </div>
        {j && <UeComponent chino={j.chino} espanol={j.espanol} index={h} />}
        <div className="max-w-md mx-auto mb-4">
          <input
            type="text"
            value={y}
            onChange={(s) => setY(s.target.value.toUpperCase())}
            onKeyDown={onKeyDown}
            className={`w-full px-6 py-4 rounded-2xl font-black text-lg text-center bg-white/5 border text-white focus:outline-none focus:border-[#2080ff] transition-all ${S ? "border-red-500" : c >= 5 ? "border-[#ff00aa]" : c >= 3 ? "border-[#ffd600]" : "border-white/10"}`}
            style={{
              boxShadow: S
                ? "0 0 25px rgba(255,68,68,0.3)"
                : c >= 5
                  ? "0 0 25px rgba(255,0,170,0.3)"
                  : c >= 3
                    ? "0 0 20px rgba(255,214,0,0.2)"
                    : "0 0 20px rgba(32,128,255,0.1)",
              animation: S ? "shake 0.5s ease-in-out" : "none",
              color: S ? "#ff6b35" : "#fff",
              transform: S ? "none" : "perspective(500px) rotateX(2deg)",
            }}
            placeholder="Escribe aquí / 在此输入..."
            autoFocus
          />
        </div>
        <XeComponent combo={N} />
        <div
          className="text-center text-sm font-bold mt-2"
          style={{
            color: "rgba(207,216,255,0.5)",
          }}
        >
          Dificultad progresiva: palabra {h + 1}
        </div>
        {a === "gameover" && (
          <BeComponent
            score={f}
            bestScore={z}
            bestStreak={bestStreak}
            streak={c}
            onRestart={() => {
              playClick();
              Z(null);
            }}
            onChange={() => {
              playClick();
              setA("select");
            }}
          />
        )}
      </div>
    </StarfieldBackground>
  );
}
export { NeComponent as default };
