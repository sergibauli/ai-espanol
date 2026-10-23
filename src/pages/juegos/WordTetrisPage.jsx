import {
  BookOpenIcon,
  ZapIcon,
  StarIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  Trash2Icon,
  TrophyIcon,
  ArrowLeftIcon,
  Grid3x3Icon,
  LayersIcon,
  TargetIcon,
  ChevronLeftIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g, a as a_1 } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
const Z = 10;
const X = 13;
const ie = X - 1;
const de = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const Ee = ["#00d4ff", "#ff00aa", "#ffd700", "#10b981", "#ef4444", "#f97316", "#a855f7", "#3b82f6"];
const ce = 550;
const nt = 140;
const ot = 45;
const lt = 34;
const it = 4;
const Xe = 3000;
const ct = Array.from(
  {
    length: 16,
  },
  (x, l) => ({
    left: `${4 + l * 6}%`,
    delay: `${l * 0.12}s`,
    duration: `${0.35 + (l % 4) * 0.15}s`,
  }),
);
function Ye(espanol) {
  return espanol
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-ZÑ]/g, "")
    .trim();
}
function dt(x) {
  const l = [...x];
  for (let i = l.length - 1; i > 0; i--) {
    const u = Math.floor(Math.random() * (i + 1));
    [l[i], l[u]] = [l[u], l[i]];
  }
  return l;
}
function xt(x) {
  const l = de.indexOf(x) % Ee.length;
  return Ee[l >= 0 ? l : 0];
}
function ft(x, l, i, u) {
  const f = [i, "#ffffff", "#ffd700", "#ff00aa", "#00d4ff", "#10b981"];
  for (let m = 0; m < u; m++) {
    const c = document.createElement("div");
    const k = 3 + Math.random() * 8;
    const g = f[Math.floor(Math.random() * f.length)];
    c.style.cssText = `position:fixed;left:${x}px;top:${l}px;width:${k}px;height:${k}px;border-radius:50%;background:${g};pointer-events:none;z-index:9999;box-shadow:0 0 15px ${g};`;
    document.body.appendChild(c);
    const n = Math.random() * Math.PI * 2;
    const h = 3 + Math.random() * 12;
    let R = Math.cos(n) * h;
    let y = Math.sin(n) * h;
    let M = 1;
    const v = () => {
      R *= 0.92;
      y *= 0.92;
      y += 0.35;
      c.style.left = `${parseFloat(c.style.left) + R}px`;
      c.style.top = `${parseFloat(c.style.top) + y}px`;
      M -= 0.015;
      c.style.opacity = String(M);
      if (M > 0) {
        requestAnimationFrame(v);
      } else {
        c.remove();
      }
    };
    requestAnimationFrame(v);
  }
}
function pt() {
  const x = ["#ff00aa", "#00d4ff", "#ffd700", "#10b981", "#f97316", "#a855f7", "#ffffff"];
  for (let l = 0; l < 150; l++) {
    const i = document.createElement("div");
    const u = 4 + Math.random() * 10;
    const f = Math.random() * window.innerWidth;
    const m = window.innerHeight + 10;
    const c = x[Math.floor(Math.random() * x.length)];
    const k = Math.random() > 0.5 ? "50%" : "2px";
    i.style.cssText = `position:fixed;left:${f}px;top:${m}px;width:${u}px;height:${u}px;border-radius:${k};background:${c};pointer-events:none;z-index:9999;box-shadow:0 0 12px ${c};`;
    document.body.appendChild(i);
    let g = -6 - Math.random() * 10;
    let n = (Math.random() - 0.5) * 6;
    let h = m;
    let R = f;
    let y = 0;
    let M = (Math.random() - 0.5) * 20;
    let v = 1;
    const _ = () => {
      g += 0.12;
      R += n;
      h += g;
      y += M;
      i.style.left = `${R}px`;
      i.style.top = `${h}px`;
      i.style.transform = `rotate(${y}deg)`;
      v -= 0.004;
      i.style.opacity = String(v);
      if (v > 0 && h < window.innerHeight + 50) {
        requestAnimationFrame(_);
      } else {
        i.remove();
      }
    };
    requestAnimationFrame(_);
  }
}
function mt() {
  const x = document.getElementById("wordtetris-root");
  if (x) {
    x.classList.add("screen-shake-active");
    setTimeout(() => x.classList.remove("screen-shake-active"), 400);
  }
}
function ut(x, l, i) {
  const u = document.getElementById("wordtetris-root");
  if (!u) {
    return;
  }
  u.getBoundingClientRect();
  const f = u.querySelector("[data-game-area]");
  if (!f) {
    return;
  }
  const m = f.getBoundingClientRect();
  const c = document.createElement("div");
  const k = m.left + x * i;
  const g = m.top + l * i;
  c.style.cssText = `position:fixed;left:${k}px;top:${g}px;width:${i}px;height:${i}px;border-radius:8px;pointer-events:none;z-index:9998;background:radial-gradient(circle,rgba(16,185,129,0.8),transparent 70%);box-shadow:0 0 40px rgba(16,185,129,0.8);`;
  document.body.appendChild(c);
  let n = 1;
  const h = () => {
    n -= 0.04;
    c.style.opacity = String(n);
    c.style.transform = `scale(${1 + (1 - n) * 2})`;
    if (n > 0) {
      requestAnimationFrame(h);
    } else {
      c.remove();
    }
  };
  requestAnimationFrame(h);
}
function StComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [m, setM] = React.useState("select");
  const [k, setK] = React.useState("");
  const [n, setN] = React.useState(lt);
  const [R, setR] = React.useState(0);
  const [M, setM_1] = React.useState(1);
  const [_, set_] = React.useState(0);
  const [Ae, setAe] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("wordtetris_best") || "0");
    } catch {
      return 0;
    }
  });
  const [z, setZ] = React.useState("");
  const [We, setWe] = React.useState("");
  const [me, setMe] = React.useState("");
  const [Fe, setFe] = React.useState(false);
  const [Ie, setIe] = React.useState(false);
  const [E, setE] = React.useState(true);
  const [Pe, setPe] = React.useState(100);
  const [gt, setGt] = React.useState(0);
  const dRef = React.useRef(null);
  const pRef = React.useRef([]);
  const FRef = React.useRef([]);
  const LRef = React.useRef(0);
  const NRef = React.useRef(0);
  const TRef = React.useRef(1);
  const GRef = React.useRef(0);
  const aeRef = React.useRef(ce);
  const ORef = React.useRef(false);
  const reRef = React.useRef(false);
  const ueRef = React.useRef([]);
  const IRef = React.useRef("");
  const PRef = React.useRef(null);
  const seRef = React.useRef(0);
  const geRef = React.useRef(null);
  const SRef = React.useRef(0);
  const Be = g();
  React.useEffect(() => {
    const t = () => {
      const a = Math.min(window.innerWidth - 32, 480);
      const r = Math.max(28, Math.floor(a / Z));
      setN(r);
    };
    t();
    window.addEventListener("resize", t);
    return () => window.removeEventListener("resize", t);
  }, []);
  const be = React.useCallback(() => {
    const t = IRef.current[LRef.current] || "";
    const a = Math.random();
    let letter;
    if (a < 0.5 && t) {
      letter = t;
    } else {
      const o = IRef.current.split("").filter((C, D) => D >= LRef.current);
      if (a < 0.75 && o.length > 0) {
        letter = o[Math.floor(Math.random() * o.length)];
      } else {
        letter = de[Math.floor(Math.random() * de.length)];
      }
    }
    return {
      x: Math.floor(Z / 2),
      y: 0,
      letter,
      color: xt(letter),
    };
  }, []);
  const Y = React.useCallback(() => {
    const t = be();
    if (t.y >= X || pRef.current.some((r) => r.x === t.x && r.y === t.y)) {
      H();
      return;
    }
    dRef.current = t;
    SRef.current += 1;
    setGt((r) => r + 1);
  }, [be]);
  const B = React.useCallback(
    (t) => {
      if (t.length === 0) {
        return;
      }
      const a = t[Math.floor(Math.random() * t.length)];
      const r = Ye(a.espanol);
      if (r.length === 0 || r.length > 8) {
        B(t);
        return;
      }
      IRef.current = r;
      setZ(r);
      setWe(a.chino);
      FRef.current = new Array(r.length).fill("");
      LRef.current = 0;
      SRef.current += 1;
      setGt((o) => o + 1);
      Y();
    },
    [Y],
  );
  const H = React.useCallback(() => {
    if (!reRef.current) {
      reRef.current = true;
      ORef.current = false;
      playLose();
      setM("gameover");
      setAe((t) => {
        const a = Math.max(t, NRef.current);
        try {
          localStorage.setItem("wordtetris_best", String(a));
        } catch {}
        return a;
      });
    }
  }, [playLose]);
  const he = React.useCallback(() => {
    playWin();
    GRef.current += 1;
    set_(GRef.current);
    const t = GRef.current * 100;
    const a = TRef.current * 50;
    const r = 500 + t + a;
    NRef.current += r;
    setR(NRef.current);
    setMe(`¡Palabra completa! / 单词完成！ +${r}`);
    setFe(true);
    setTimeout(() => setFe(false), 600);
    pt();
    TRef.current += 1;
    setM_1(TRef.current);
    aeRef.current = Math.max(nt, ce - (TRef.current - 1) * ot);
    if (TRef.current > 1 && TRef.current % 2 === 0) {
      setIe(true);
      setTimeout(() => setIe(false), 1500);
    }
    setTimeout(() => {
      B(ueRef.current);
      setMe("");
    }, 1600);
  }, [playWin, B]);
  const ye = React.useCallback(
    (t, letter, color) => {
      let o = X - 1;
      const C = pRef.current.filter((w) => w.x === t);
      if (C.length > 0) {
        o = Math.min(...C.map((w) => w.y)) - 1;
      }
      if (o < 0) {
        H();
        return;
      }
      const D = {
        x: t,
        y: o,
        letter,
        color,
      };
      pRef.current = [...pRef.current, D];
      SRef.current += 1;
      setGt((w) => w + 1);
      if ((pRef.current.length > 0 ? Math.min(...pRef.current.map((w) => w.y)) : X) <= it) {
        H();
      }
    },
    [H],
  );
  const we = React.useCallback(
    (t, a) => {
      const length = IRef.current.length;
      if (length === 0) {
        return false;
      }
      const o = Math.floor((Z - length) / 2);
      const LRef_current = LRef.current;
      if (LRef_current >= length) {
        return false;
      }
      const D = o + LRef_current;
      if (t !== D || a !== IRef.current[LRef_current]) {
        return false;
      }
      const le = [...FRef.current];
      le[LRef_current] = a;
      FRef.current = le;
      LRef.current = LRef_current + 1;
      pRef.current = pRef.current.filter((A) => A.x !== t);
      NRef.current += 100 * TRef.current;
      setR(NRef.current);
      SRef.current += 1;
      setGt((A) => A + 1);
      playCorrect();
      ut(t, ie, n);
      const geRef_current = geRef.current;
      if (geRef_current) {
        const A = geRef_current.getBoundingClientRect();
        const He = A.left + t * n + n / 2;
        const qe = A.top + ie * n + n / 2;
        ft(He, qe, "#10b981", 80);
      }
      if (LRef.current >= length) {
        setTimeout(() => he(), 300);
      } else {
        Y();
      }
      return true;
    },
    [n, playCorrect, he, Y],
  );
  const ke = React.useCallback(
    (t, a, r) => {
      dRef.current = null;
      if (!we(t, a)) {
        playWrong();
        mt();
        ye(t, a, r);
        Y();
      }
    },
    [we, playWrong, ye, Y],
  );
  const q = React.useCallback(() => {
    if (!ORef.current || !dRef.current) {
      return;
    }
    const dRef_current = dRef.current;
    const a = dRef_current.y + 1;
    if (a >= X || pRef.current.some((o) => o.x === dRef_current.x && o.y === a)) {
      ke(dRef_current.x, dRef_current.letter, dRef_current.color);
    } else {
      dRef_current.y = a;
      dRef.current = dRef_current;
      SRef.current += 1;
      setGt((o) => o + 1);
    }
  }, [ke]);
  React.useEffect(() => {
    if (m !== "playing") {
      return;
    }
    let t = performance.now();
    const a = (r) => {
      if (!ORef.current) {
        return;
      }
      if (r - t >= aeRef.current) {
        q();
        t = r;
      }
      seRef.current = requestAnimationFrame(a);
    };
    seRef.current = requestAnimationFrame(a);
    return () => cancelAnimationFrame(seRef.current);
  }, [m, q]);
  const K = React.useCallback(() => {
    if (!dRef.current) {
      return;
    }
    const t = Math.max(0, dRef.current.x - 1);
    if (!pRef.current.some((r) => r.x === t && r.y === dRef.current.y)) {
      dRef.current = {
        ...dRef.current,
        x: t,
      };
      SRef.current += 1;
      setGt((r) => r + 1);
    }
  }, []);
  const V = React.useCallback(() => {
    if (!dRef.current) {
      return;
    }
    const t = Math.min(Z - 1, dRef.current.x + 1);
    if (!pRef.current.some((r) => r.x === t && r.y === dRef.current.y)) {
      dRef.current = {
        ...dRef.current,
        x: t,
      };
      SRef.current += 1;
      setGt((r) => r + 1);
    }
  }, []);
  const U = React.useCallback(() => {
    if (!dRef.current) {
      return;
    }
    let t = dRef.current.y;
    while (t + 1 < X && !pRef.current.some((a) => a.x === dRef.current.x && a.y === t + 1)) {
      t++;
    }
    dRef.current = {
      ...dRef.current,
      y: t,
    };
    SRef.current += 1;
    setGt((a) => a + 1);
    q();
  }, [q]);
  const J = React.useCallback(() => {
    if (!E || pRef.current.length === 0) {
      return;
    }
    playClick();
    setE(false);
    pRef.current = [];
    NRef.current = Math.max(0, NRef.current - 50);
    setR(NRef.current);
    SRef.current += 1;
    setGt((a) => a + 1);
    setMe("Limpieza! / 清除! -50");
    setTimeout(() => setMe(""), 1000);
    let t = 0;
    if (PRef.current) {
      clearInterval(PRef.current);
    }
    PRef.current = setInterval(() => {
      t += 100;
      const a = Math.round((t / Xe) * 100);
      setPe(a);
      if (t >= Xe) {
        if (PRef.current) {
          clearInterval(PRef.current);
        }
        setE(true);
        setPe(100);
      }
    }, 100);
  }, [E, playClick]);
  React.useEffect(() => {
    const t = (a) => {
      if (m === "playing") {
        if (a.key === "ArrowLeft") {
          a.preventDefault();
          K();
        }
        if (a.key === "ArrowRight") {
          a.preventDefault();
          V();
        }
        if (a.key === "ArrowDown") {
          a.preventDefault();
          U();
        }
        if (a.key === " " || a.key === "ArrowUp" || a.key === "c" || a.key === "C") {
          a.preventDefault();
          J();
        }
      }
    };
    window.addEventListener("keydown", t);
    return () => window.removeEventListener("keydown", t);
  }, [m, K, V, U, J]);
  const ne = React.useCallback(
    (t) => {
      playClick();
      let a = t ? a_1(t) : a_1();
      if (a.length === 0) {
        setK("Este módulo no tiene palabras válidas. Prueba con otro módulo o selecciona Todos los módulos.");
        return;
      }
      const r = dt(
        a
          .filter((o) => o.espanol && o.chino)
          .map((o) => ({
            espanol: Ye(o.espanol),
            chino: o.chino,
          }))
          .filter((o) => o.espanol.length >= 3 && o.espanol.length <= 8),
      );
      if (r.length === 0) {
        setK("Este módulo no tiene palabras válidas. Prueba con otro módulo o selecciona Todos los módulos.");
        return;
      }
      ueRef.current = r;
      pRef.current = [];
      FRef.current = [];
      LRef.current = 0;
      NRef.current = 0;
      TRef.current = 1;
      GRef.current = 0;
      aeRef.current = ce;
      ORef.current = true;
      reRef.current = false;
      dRef.current = null;
      setR(0);
      setM_1(1);
      set_(0);
      setMe("");
      setK("");
      setFe(false);
      setIe(false);
      setE(true);
      setPe(100);
      setZ("");
      setWe("");
      B(r);
      setM("playing");
    },
    [playClick, B],
  );
  const FRef_current = FRef.current;
  const pRef_current = pRef.current;
  const dRef_current = dRef.current;
  const _e = z.length > 0 ? Math.floor((Z - z.length) / 2) : 0;
  const ve = z.length > 0 ? Math.round((FRef_current.filter(Boolean).length / z.length) * 100) : 0;
  const je = z[LRef.current] || "";
  const Ge = React.useMemo(
    () => ({
      width: `${Z * n}px`,
      height: `${X * n}px`,
      perspective: "800px",
      transform: "rotateX(8deg) translateZ(0)",
      transformStyle: "preserve-3d",
      background: "linear-gradient(180deg, rgba(0,20,40,.5), rgba(5,8,27,.6))",
      backdropFilter: "blur(14px)",
      boxShadow:
        "0 0 40px rgba(0,212,255,.1), 0 20px 60px rgba(0,0,0,.4), inset 0 0 60px rgba(0,212,255,.05), 0 0 80px rgba(0,0,0,.5)",
    }),
    [n],
  );
  const Oe = React.useMemo(
    () => ({
      background: `repeating-linear-gradient(0deg, transparent, transparent ${n - 1}px, rgba(0,212,255,.08) ${n - 1}px, rgba(0,212,255,.08) ${n}px), repeating-linear-gradient(90deg, transparent, transparent ${n - 1}px, rgba(0,212,255,.08) ${n - 1}px, rgba(0,212,255,.08) ${n}px)`,
    }),
    [n],
  );
  if (m === "select") {
    return (
      <StarfieldBackground>
        <div className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/juegos"
              className="inline-flex items-center gap-2 text-white/50 hover:text-[#00d4ff] transition-colors text-sm font-bold"
            >
              <ArrowLeftIcon size={16} /> Volver / 返回
            </Link>
            <SoundToggles />
          </div>
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-black mb-3 animate-neon-title">
              <Grid3x3Icon size={36} className="inline mr-3 animate-spin-slow" /> Word Tetris
            </h1>
            <p className="text-white/40 text-sm font-medium">
              Selecciona un módulo para jugar / 选择模块开始游戏
            </p>
            {k && (
              <div
                className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold animate-shake"
                style={{
                  background: "rgba(239,68,68,.12)",
                  border: "1px solid rgba(239,68,68,.3)",
                  color: "#f97316",
                }}
              >
                {k}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => {
                playClick();
                setK("");
                ne(null);
              }}
              className="group rounded-xl p-5 text-left transition-all hover:scale-[1.02] hover:-translate-y-0.5 animate-card-glow"
              style={{
                background: "rgba(14,22,64,.6)",
                border: "1px solid rgba(0,212,255,.3)",
                transform: "translateZ(20px)",
                perspective: "800px",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 animate-pulse-glow"
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #3b82f6)",
                  boxShadow: "0 0 20px rgba(0,212,255,.3)",
                }}
              >
                <LayersIcon size={24} className="text-white" />
              </div>
              <h3 className="text-white font-black text-base mb-1">Todos los módulos</h3>
              <p
                className="text-xs font-medium mb-1"
                style={{
                  color: "rgba(0,212,255,.7)",
                }}
              >
                所有模块
              </p>
              <p className="text-xs font-medium text-white/40">Mezcla todo el vocabulario</p>
            </button>
            {Be.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  playClick();
                  setK("");
                  ne(t.id);
                }}
                className="group rounded-xl p-5 text-left transition-all hover:scale-[1.02] hover:-translate-y-0.5 animate-card-glow"
                style={{
                  background: "rgba(14,22,64,.6)",
                  border: `1px solid ${t.color}40`,
                  transform: "translateZ(20px)",
                  perspective: "800px",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 animate-pulse-glow"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
                    boxShadow: `0 0 20px ${t.color}30`,
                  }}
                >
                  <BookOpenIcon size={24} className="text-white" />
                </div>
                <h3 className="text-white font-black text-base mb-1">{t.titulo}</h3>
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
        <style>{`
          @keyframes float-mascot { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
          @keyframes neon-title { 0%,100%{text-shadow:0 0 20px rgba(0,212,255,.3),0 0 40px rgba(255,0,170,.2)} 50%{text-shadow:0 0 30px rgba(0,212,255,.5),0 0 60px rgba(255,0,170,.3)} }
          @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
          @keyframes pulse-glow { 0%,100%{box-shadow:0 0 20px rgba(0,212,255,.3)} 50%{box-shadow:0 0 35px rgba(0,212,255,.6)} }
          @keyframes shake { 0%,100%{transform:translateX(0)} 10%,30%,50%,70%,90%{transform:translateX(-4px)} 20%,40%,60%,80%{transform:translateX(4px)} }
          .animate-float-mascot { animation: float-mascot 3s ease-in-out infinite; }
          .animate-neon-title { animation: neon-title 2s ease-in-out infinite; }
          .animate-spin-slow { animation: spin-slow 8s linear infinite; }
          .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
          .animate-shake { animation: shake 0.5s ease-in-out; }
          .animate-card-glow:hover { box-shadow: 0 0 25px rgba(0,212,255,.15); }
        `}</style>
      </StarfieldBackground>
    );
  }
  return (
    <StarfieldBackground>
      <div
        id="wordtetris-root"
        className="max-w-4xl mx-auto px-2 sm:px-4 py-4 sm:py-6 min-h-screen relative z-10"
      >
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <Link
            to="/juegos"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#00d4ff] transition-colors text-sm font-bold"
          >
            <ArrowLeftIcon size={16} /> Volver / 返回
          </Link>
          <div className="flex items-center gap-2 flex-wrap">
            <SoundToggles />
            <button
              onClick={() => {
                playClick();
                setM("select");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "#fff",
              }}
            >
              <LayersIcon size={12} /> Cambiar / 切换
            </button>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 animate-score-pulse"
              style={{
                background: "rgba(0,212,255,.1)",
                border: "1px solid rgba(0,212,255,.3)",
                color: "#00d4ff",
                boxShadow: "0 0 15px rgba(0,212,255,.3)",
              }}
            >
              <ZapIcon size={12} className="inline mr-1" /> {R}
            </div>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{
                background: "rgba(255,0,170,.1)",
                border: "1px solid rgba(255,0,170,.3)",
                color: "#ff00aa",
                boxShadow: "0 0 15px rgba(255,0,170,.3)",
              }}
            >
              <StarIcon size={12} className="inline mr-1" /> Lv.{M}
            </div>
          </div>
        </div>
        <div className="text-center mb-4">
          <div
            className="inline-block rounded-2xl px-6 py-3 mb-2 animate-target-float"
            style={{
              background: "linear-gradient(135deg, rgba(14,22,64,.7), rgba(5,8,27,.5))",
              border: "1px solid rgba(255,215,0,.3)",
              boxShadow:
                "0 0 30px rgba(255,215,0,.15), 0 10px 40px rgba(0,0,0,.3), inset 0 0 30px rgba(255,215,0,.05)",
              backdropFilter: "blur(14px)",
              transform: "translateZ(40px) rotateX(5deg)",
              perspective: "800px",
            }}
          >
            <div className="flex items-center gap-2 justify-center mb-1">
              <TargetIcon
                size={14}
                style={{
                  color: "#ffd700",
                }}
              />
              <span
                className="text-[10px] font-bold uppercase tracking-wider"
                style={{
                  color: "rgba(255,215,0,.7)",
                }}
              >
                Objetivo / 目标
              </span>
            </div>
            <div
              className="text-2xl sm:text-3xl font-black tracking-wider"
              style={{
                color: "#ffd700",
                textShadow: "0 0 15px rgba(255,215,0,.4), 0 0 30px rgba(255,215,0,.2)",
              }}
            >
              {z.split("").map((t, a) => (
                <span
                  key={`tw-${a}`}
                  className={FRef_current[a] ? "animate-correct-letter" : "animate-pending-letter"}
                >
                  {t}
                </span>
              ))}
            </div>
            <div
              className="text-xs font-medium mt-1"
              style={{
                color: "rgba(255,255,255,.5)",
              }}
            >
              {We}
            </div>
          </div>
          <p className="text-white/30 text-[10px] sm:text-xs font-medium">
            Pulsa ↑ o Espacio para limpiar / 按上键或空格清除
          </p>
        </div>
        <div className="max-w-md mx-auto mb-4">
          <div className="flex items-center justify-between mb-1">
            <span
              className="text-[10px] font-bold"
              style={{
                color: "rgba(0,212,255,.7)",
              }}
            >
              Progreso / 进度
            </span>
            <span
              className="text-[10px] font-black"
              style={{
                color: "#00d4ff",
              }}
            >
              {ve}%
            </span>
          </div>
          <div
            className="w-full h-3 rounded-full overflow-hidden"
            style={{
              background: "rgba(0,0,0,.3)",
              border: "1px solid rgba(0,212,255,.2)",
            }}
          >
            <div
              className="h-full rounded-full animate-progress-pulse transition-all duration-300"
              style={{
                width: `${ve}%`,
                background: "linear-gradient(90deg, #00d4ff, #3b82f6)",
                boxShadow: "0 0 10px rgba(0,212,255,.5)",
              }}
            />
          </div>
          {je && (
            <div className="text-center mt-1">
              <span
                className="text-[10px] font-bold"
                style={{
                  color: "rgba(57,255,20,.7)",
                }}
              >
                Siguiente letra / 下一个字母:{" "}
              </span>
              <span
                className="text-sm font-black"
                style={{
                  color: "#10b981",
                  textShadow: "0 0 8px rgba(16,185,129,.5)",
                }}
              >
                {je}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center">
          <div
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              ref={geRef}
              data-game-area
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 transition-all animate-grid-glow"
              style={Ge}
            >
              <div className="absolute inset-0 pointer-events-none" style={Oe} />
              <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{
                  height: "20px",
                  background: "linear-gradient(0deg, rgba(0,0,0,.6), transparent)",
                  transform: "translateZ(-10px)",
                }}
              />
              {Fe && (
                <div
                  className="absolute inset-0 z-50 animate-flash pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, rgba(255,215,0,0.4) 0%, transparent 70%)",
                  }}
                />
              )}
              {Ie && (
                <div
                  className="absolute inset-0 pointer-events-none overflow-hidden"
                  style={{
                    zIndex: 40,
                  }}
                >
                  {ct.map((t, a) => (
                    <div
                      key={`sl-${a}`}
                      className="absolute"
                      style={{
                        left: t.left,
                        top: "-10%",
                        width: "2px",
                        height: "50px",
                        background: "linear-gradient(180deg, transparent, rgba(0,212,255,0.5), transparent)",
                        animation: `speedLine ${t.duration} linear infinite`,
                        animationDelay: t.delay,
                        opacity: 0.6,
                      }}
                    />
                  ))}
                </div>
              )}
              {z.split("").map((t, a) => {
                const r = _e + a;
                const o = FRef_current[a];
                return (
                  <div
                    key={`slot-${a}`}
                    className="absolute flex items-center justify-center font-black"
                    style={{
                      left: `${r * n}px`,
                      top: `${ie * n}px`,
                      width: `${n}px`,
                      height: `${n}px`,
                      background: o
                        ? "linear-gradient(145deg, rgba(16,185,129,0.85), rgba(16,185,129,0.35))"
                        : "linear-gradient(145deg, rgba(0,212,255,0.08), rgba(0,212,255,0.03))",
                      border: o ? "2.5px solid #10b981" : "1.5px solid rgba(0,212,255,0.3)",
                      boxShadow: o
                        ? "0 0 20px rgba(16,185,129,0.5), inset 0 0 15px rgba(16,185,129,0.2), 0 0 40px rgba(16,185,129,0.3)"
                        : "0 0 10px rgba(0,212,255,0.1), inset 0 0 10px rgba(0,212,255,0.05)",
                      color: o ? "#fff" : "rgba(255,255,255,0.15)",
                      textShadow: o ? "0 0 10px rgba(16,185,129,0.8)" : "none",
                      transform: "translateZ(15px)",
                      fontSize: `${n * 0.55}px`,
                      borderRadius: "6px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {o || t}
                  </div>
                );
              })}
              {pRef_current.map((t, a) => (
                <div
                  key={`wb-${a}`}
                  className="absolute flex items-center justify-center font-black animate-wrong-block"
                  style={{
                    left: `${t.x * n}px`,
                    top: `${t.y * n}px`,
                    width: `${n}px`,
                    height: `${n}px`,
                    background: `linear-gradient(145deg, ${t.color}60, ${t.color}20)`,
                    border: `1.5px solid ${t.color}80`,
                    color: "#fff",
                    boxShadow: `0 0 15px ${t.color}50, 0 0 30px ${t.color}25, inset 0 0 10px ${t.color}30`,
                    textShadow: `0 0 8px ${t.color}60`,
                    transform: "translateZ(12px) rotateX(-5deg) rotateY(5deg)",
                    fontSize: `${n * 0.55}px`,
                    borderRadius: "4px",
                  }}
                >
                  {t.letter}
                </div>
              ))}
              {dRef_current && (
                <div
                  className="absolute flex items-center justify-center font-black animate-falling-letter"
                  style={{
                    left: `${dRef_current.x * n}px`,
                    top: `${dRef_current.y * n}px`,
                    width: `${n}px`,
                    height: `${n}px`,
                    background: `linear-gradient(145deg, ${dRef_current.color}80, ${dRef_current.color}40)`,
                    border: `2.5px solid ${dRef_current.color}dd`,
                    color: "#fff",
                    boxShadow: `0 0 25px ${dRef_current.color}70, 0 0 50px ${dRef_current.color}40, 0 0 80px ${dRef_current.color}20, inset 0 0 15px ${dRef_current.color}50`,
                    textShadow: `0 0 12px ${dRef_current.color}80, 0 0 24px ${dRef_current.color}40`,
                    transform: "translateZ(25px) rotateX(-10deg) rotateY(10deg)",
                    fontSize: `${n * 0.55}px`,
                    borderRadius: "4px",
                    animation:
                      "fallingPulse 0.6s ease-in-out infinite alternate, fallingGlow 1.5s ease-in-out infinite alternate",
                  }}
                >
                  {dRef_current.letter}
                </div>
              )}
            </div>
            <div
              className="absolute -bottom-4 left-2 right-2 rounded-2xl pointer-events-none"
              style={{
                height: "16px",
                background: "radial-gradient(ellipse, rgba(0,0,0,.6), transparent 70%)",
                transform: "translateZ(-40px) rotateX(8deg)",
                filter: "blur(8px)",
              }}
            />
          </div>
          {me && (
            <div
              className="text-center mt-3 text-sm sm:text-base font-black animate-message-bounce transition-all"
              style={{
                color: "#10b981",
                textShadow: "0 0 10px rgba(16,185,129,.5), 0 0 30px rgba(16,185,129,.3)",
              }}
            >
              {me}
            </div>
          )}
          <div className="mt-4 flex justify-center gap-3 sm:gap-4">
            <button
              onTouchStart={(t) => {
                t.preventDefault();
                K();
              }}
              onClick={K}
              className="flex items-center justify-center font-black transition-all hover:scale-110 active:scale-90"
              style={{
                width: "56px",
                height: "56px",
                minWidth: "44px",
                minHeight: "44px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, rgba(0,212,255,.2), rgba(59,130,246,.2))",
                border: "1px solid rgba(0,212,255,.5)",
                color: "#fff",
                boxShadow: "0 0 15px rgba(0,212,255,.3), 0 8px 20px rgba(0,0,0,.3)",
                transform: "translateZ(10px)",
              }}
            >
              <ChevronLeftIcon size={28} />
            </button>
            <button
              onTouchStart={(t) => {
                t.preventDefault();
                U();
              }}
              onClick={U}
              className="flex items-center justify-center font-black transition-all hover:scale-110 active:scale-90"
              style={{
                width: "56px",
                height: "56px",
                minWidth: "44px",
                minHeight: "44px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, rgba(255,215,0,.2), rgba(249,115,22,.2))",
                border: "1px solid rgba(255,215,0,.5)",
                color: "#fff",
                boxShadow: "0 0 15px rgba(255,215,0,.3), 0 8px 20px rgba(0,0,0,.3)",
                transform: "translateZ(10px)",
              }}
            >
              <ChevronDownIcon size={28} />
            </button>
            <button
              onTouchStart={(t) => {
                t.preventDefault();
                V();
              }}
              onClick={V}
              className="flex items-center justify-center font-black transition-all hover:scale-110 active:scale-90"
              style={{
                width: "56px",
                height: "56px",
                minWidth: "44px",
                minHeight: "44px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, rgba(0,212,255,.2), rgba(59,130,246,.2))",
                border: "1px solid rgba(0,212,255,.5)",
                color: "#fff",
                boxShadow: "0 0 15px rgba(0,212,255,.3), 0 8px 20px rgba(0,0,0,.3)",
                transform: "translateZ(10px)",
              }}
            >
              <ChevronRightIcon size={28} />
            </button>
            <button
              onTouchStart={(t) => {
                t.preventDefault();
                J();
              }}
              onClick={J}
              className="flex items-center justify-center font-black transition-all hover:scale-110 active:scale-90 relative overflow-hidden"
              style={{
                width: "56px",
                height: "56px",
                minWidth: "44px",
                minHeight: "44px",
                borderRadius: "14px",
                background: E
                  ? "linear-gradient(135deg, rgba(239,68,68,.2), rgba(249,115,22,.2))"
                  : "linear-gradient(135deg, rgba(100,100,100,.2), rgba(80,80,80,.2))",
                border: E ? "1px solid rgba(239,68,68,.5)" : "1px solid rgba(100,100,100,.3)",
                color: E ? "#fff" : "rgba(255,255,255,.3)",
                boxShadow: E ? "0 0 15px rgba(239,68,68,.3), 0 8px 20px rgba(0,0,0,.3)" : "none",
                transform: "translateZ(10px)",
              }}
            >
              <Trash2Icon size={22} />
              {!E && (
                <div
                  className="absolute bottom-0 left-0 h-1 rounded-full transition-all"
                  style={{
                    width: `${Pe}%`,
                    background: "linear-gradient(90deg, #ef4444, #f97316)",
                  }}
                />
              )}
            </button>
          </div>
          <div className="mt-2 text-center">
            <p className="text-[10px] sm:text-xs text-white/30 font-medium">
              ← → Mover / Down: Caída rápida / ↑/Space: Limpiar
            </p>
          </div>
        </div>
        {m === "gameover" && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center animate-fade-in"
            style={{
              background: "rgba(3,4,17,.88)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div
              className="text-center p-6 sm:p-8 rounded-2xl sm:rounded-3xl max-w-sm mx-4 relative overflow-hidden animate-gameover-pop"
              style={{
                background: "linear-gradient(180deg, rgba(14,22,64,.8), rgba(5,8,27,.6))",
                border: "1px solid rgba(239,68,68,.3)",
                boxShadow:
                  "0 0 60px rgba(239,68,68,.2), 0 0 120px rgba(255,0,170,.1), 0 0 180px rgba(239,68,68,.05)",
                transform: "rotateX(5deg)",
                perspective: "800px",
              }}
            >
              <div
                className="absolute -inset-[2px] rounded-[26px] -z-10 opacity-60 animate-orb-glow"
                style={{
                  background: "linear-gradient(135deg, #ef4444, #ff00aa)",
                  filter: "blur(25px)",
                }}
              />
              <TrophyIcon
                size={56}
                className="mx-auto mb-4 animate-trophy-shake"
                style={{
                  color: "#ef4444",
                  filter: "drop-shadow(0 0 15px rgba(239,68,68,.5))",
                }}
              />
              <h2 className="text-2xl sm:text-3xl font-black mb-2 animate-neon-title-defeat">
                ¡Tetris Terminado!
              </h2>
              <p className="text-white/50 text-sm mb-6">俄罗斯方块结束！</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div
                  className="p-3 rounded-xl animate-score-card-left"
                  style={{
                    background: "rgba(239,68,68,.1)",
                    border: "1px solid rgba(239,68,68,.2)",
                    boxShadow: "0 0 20px rgba(239,68,68,.15)",
                  }}
                >
                  <ZapIcon
                    size={16}
                    className="mx-auto mb-1"
                    style={{
                      color: "#ef4444",
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
                      color: "#ef4444",
                    }}
                  >
                    {R}
                  </p>
                </div>
                <div
                  className="p-3 rounded-xl animate-score-card-right"
                  style={{
                    background: "rgba(255,0,170,.1)",
                    border: "1px solid rgba(255,0,170,.2)",
                    boxShadow: "0 0 20px rgba(255,0,170,.15)",
                  }}
                >
                  <TrophyIcon
                    size={16}
                    className="mx-auto mb-1"
                    style={{
                      color: "#ff00aa",
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
                    }}
                  >
                    {Ae}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div
                  className="p-2 rounded-xl"
                  style={{
                    background: "rgba(0,212,255,.1)",
                    border: "1px solid rgba(0,212,255,.2)",
                  }}
                >
                  <p
                    className="text-[10px]"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Nivel / 等级
                  </p>
                  <p
                    className="text-base font-black"
                    style={{
                      color: "#00d4ff",
                    }}
                  >
                    {M}
                  </p>
                </div>
                <div
                  className="p-2 rounded-xl"
                  style={{
                    background: "rgba(255,215,0,.1)",
                    border: "1px solid rgba(255,215,0,.2)",
                  }}
                >
                  <p
                    className="text-[10px]"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Racha / 连击
                  </p>
                  <p
                    className="text-base font-black"
                    style={{
                      color: "#ffd700",
                    }}
                  >
                    {_}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                <button
                  onClick={() => {
                    playClick();
                    ne(null);
                  }}
                  className="px-6 sm:px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105 animate-pulse-defeat"
                  style={{
                    background: "linear-gradient(135deg, #ef4444, #ff00aa)",
                    boxShadow: "0 0 25px rgba(239,68,68,.3)",
                  }}
                >
                  Jugar de nuevo / 再玩一次
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setM("select");
                  }}
                  className="px-4 py-3 rounded-full text-xs font-bold transition-all hover:scale-105"
                  style={{
                    background: "rgba(255,255,255,.06)",
                    border: "1px solid rgba(255,255,255,.12)",
                    color: "#fff",
                  }}
                >
                  Cambiar / 切换
                </button>
              </div>
              <P currentGameId="word-tetris" />
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes neon-title { 0%,100%{text-shadow:0 0 20px rgba(0,212,255,.3),0 0 40px rgba(255,0,170,.2)} 50%{text-shadow:0 0 30px rgba(0,212,255,.5),0 0 60px rgba(255,0,170,.3)} }
        @keyframes neon-title-defeat { 0%,100%{text-shadow:0 0 20px rgba(239,68,68,.3),0 0 40px rgba(255,0,170,.2)} 50%{text-shadow:0 0 30px rgba(239,68,68,.5),0 0 60px rgba(255,0,170,.3)} }
        @keyframes target-float { 0%,100%{transform:translateY(0) rotateX(5deg)} 50%{transform:translateY(-6px) rotateX(5deg)} }
        @keyframes correct-letter { 0%,100%{color:#10b981;text-shadow:0 0 15px rgba(16,185,129,.5)} 50%{color:#39ff14;text-shadow:0 0 25px rgba(57,255,20,.7)} }
        @keyframes pending-letter { 0%,100%{color:rgba(255,255,255,.15)} 50%{color:rgba(255,255,255,.25)} }
        @keyframes score-pulse { 0%,100%{box-shadow:0 0 15px rgba(0,212,255,.3)} 50%{box-shadow:0 0 25px rgba(0,212,255,.6)} }
        @keyframes grid-glow { 0%,100%{box-shadow:0 0 40px rgba(0,212,255,.1),0 20px 60px rgba(0,0,0,.4),inset 0 0 60px rgba(0,212,255,.05)} 50%{box-shadow:0 0 60px rgba(0,212,255,.2),0 20px 60px rgba(0,0,0,.4),inset 0 0 60px rgba(0,212,255,.08)} }
        @keyframes progress-pulse { 0%{box-shadow:0 0 5px rgba(0,212,255,.3)} 50%{box-shadow:0 0 15px rgba(0,212,255,.6)} 100%{box-shadow:0 0 5px rgba(0,212,255,.3)} }
        @keyframes flash { 0%{opacity:0} 50%{opacity:1} 100%{opacity:0} }
        @keyframes speedLine { 0%{transform:translateY(-100%);opacity:0} 20%{opacity:1} 80%{opacity:1} 100%{transform:translateY(600px);opacity:0} }
        @keyframes fallingPulse { from{transform:translateZ(25px) rotateX(-10deg) rotateY(10deg) scale(1)} to{transform:translateZ(35px) rotateX(-10deg) rotateY(10deg) scale(1.1)} }
        @keyframes fallingGlow { from{box-shadow:0 0 25px rgba(0,212,255,.4),0 0 50px rgba(0,212,255,.2)} to{box-shadow:0 0 40px rgba(0,212,255,.7),0 0 80px rgba(0,212,255,.4)} }
        @keyframes wrong-block { 0%{transform:translateZ(40px) scale(1.3);opacity:0.5} 100%{transform:translateZ(12px) scale(1) rotateX(-5deg) rotateY(5deg);opacity:1} }
        @keyframes message-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes fade-in { from{opacity:0} to{opacity:1} }
        @keyframes gameover-pop { 0%{transform:rotateX(5deg) scale(0.9);opacity:0} 50%{transform:rotateX(5deg) scale(1.02);opacity:1} 100%{transform:rotateX(5deg) scale(1);opacity:1} }
        @keyframes orb-glow { 0%,100%{opacity:0.6} 50%{opacity:0.9} }
        @keyframes trophy-shake { 0%,100%{transform:translateY(0) rotate(0deg)} 25%{transform:translateY(-4px) rotate(-3deg)} 75%{transform:translateY(-4px) rotate(3deg)} }
        @keyframes score-card-left { 0%{transform:translateY(20px) translateZ(0) rotateY(0deg);opacity:0} 100%{transform:translateY(0) translateZ(20px) rotateY(-5deg);opacity:1} }
        @keyframes score-card-right { 0%{transform:translateY(20px) translateZ(0) rotateY(0deg);opacity:0} 100%{transform:translateY(0) translateZ(20px) rotateY(5deg);opacity:1} }
        @keyframes pulse-defeat { 0%,100%{box-shadow:0 0 25px rgba(239,68,68,.3)} 50%{box-shadow:0 0 40px rgba(239,68,68,.6)} }
        @keyframes screen-shake { 0%,100%{transform:translateX(0)} 10%{transform:translateX(-8px)} 20%{transform:translateX(8px)} 30%{transform:translateX(-5px)} 40%{transform:translateX(5px)} 50%{transform:translateX(-3px)} 60%{transform:translateX(3px)} 70%{transform:translateX(-1px)} 80%{transform:translateX(1px)} }

        .animate-neon-title { animation: neon-title 2s ease-in-out infinite; }
        .animate-neon-title-defeat { animation: neon-title-defeat 2s ease-in-out infinite; }
        .animate-target-float { animation: target-float 4s ease-in-out infinite; }
        .animate-correct-letter { animation: correct-letter 1.5s ease-in-out infinite; }
        .animate-pending-letter { animation: pending-letter 2s ease-in-out infinite; }
        .animate-score-pulse { animation: score-pulse 2s ease-in-out infinite; }
        .animate-grid-glow { animation: grid-glow 3s ease-in-out infinite; }
        .animate-progress-pulse { animation: progress-pulse 2s ease-in-out infinite; }
        .animate-flash { animation: flash 0.5s ease-out forwards; }
        .animate-falling-letter { animation: fallingPulse 0.6s ease-in-out infinite alternate, fallingGlow 1.5s ease-in-out infinite alternate; }
        .animate-wrong-block { animation: wrong-block 0.3s ease-out; }
        .animate-message-bounce { animation: message-bounce 1s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-gameover-pop { animation: gameover-pop 0.6s ease-out; }
        .animate-orb-glow { animation: orb-glow 3s ease-in-out infinite; }
        .animate-trophy-shake { animation: trophy-shake 1.5s ease-in-out infinite; }
        .animate-score-card-left { animation: score-card-left 0.5s ease-out forwards; }
        .animate-score-card-right { animation: score-card-right 0.5s ease-out forwards; }
        .animate-pulse-defeat { animation: pulse-defeat 2s ease-in-out infinite; }
        .screen-shake-active { animation: screen-shake 0.4s ease-in-out; }
      `}</style>
    </StarfieldBackground>
  );
}
export { StComponent as default };
