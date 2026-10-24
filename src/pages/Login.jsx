import { useAuth, useUser } from "@clerk/clerk-react";
import {
  Volume2Icon,
  VolumeXIcon,
  ZapIcon,
  DownloadIcon,
  GlobeIcon,
  ChevronDownIcon,
  XIcon,
  LoaderCircleIcon,
  SmartphoneIcon,
  KeyRoundIcon,
  MessageCircleIcon,
  Share2Icon,
  AppleIcon,
  LogInIcon,
} from "lucide-react";
import * as React from "react";
import { useNavigate } from "react-router";
import { L } from "../components/LearningImpactScene.jsx";
function ne() {
  try {
    return useAuth();
  } catch {
    return {
      isLoaded: true,
      isSignedIn: false,
    };
  }
}
function re() {
  try {
    return useUser();
  } catch {
    return {
      user: null,
    };
  }
}
function SeComponent() {
  const bRef = React.useRef(null);
  React.useEffect(() => {
    const bRef_current = bRef.current;
    if (!bRef_current) {
      return;
    }
    const a = bRef_current.getContext("2d", {
      willReadFrequently: false,
    });
    if (!a) {
      return;
    }
    let i;
    let o = 0;
    let h = 0;
    let u = 0;
    const m = 400;
    const r = 1200;
    const p = [];
    const f = ["#ff8a2a", "#00d4ff", "#ff00aa", "#ffd600", "#39ff14", "#ff3860"];
    const x = () => {
      bRef_current.width = window.innerWidth || 1;
      bRef_current.height = window.innerHeight || 1;
      p.length = 0;
      const y = Math.min(
        window.innerWidth < 768 ? 28 : 60,
        Math.floor((window.innerWidth * window.innerHeight) / 8000),
      );
      for (let l = 0; l < y; l++) {
        const S = (Math.random() - 0.5) * bRef_current.width * 1.5;
        const w = (Math.random() - 0.5) * bRef_current.height * 1.5;
        const N = (Math.random() - 0.5) * r;
        p.push({
          x: S,
          y: w,
          z: N,
          ox: S,
          oy: w,
          oz: N,
          color: f[Math.floor(Math.random() * f.length)],
          size: Math.random() * 2 + 0.5,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };
    const c = (y, l, S) => {
      const scale = m / (m + S);
      return {
        sx: y * scale + bRef_current.width / 2,
        sy: l * scale + bRef_current.height / 2,
        scale,
      };
    };
    const j = (y, l, S, w, N) => {
      let z = y;
      let M = l;
      let z_1 = S;
      let R = z * Math.cos(N) - z_1 * Math.sin(N);
      let I = z * Math.sin(N) + z_1 * Math.cos(N);
      z = R;
      z_1 = I;
      let E = M * Math.cos(w) - z_1 * Math.sin(w);
      I = M * Math.sin(w) + z_1 * Math.cos(w);
      M = E;
      z_1 = I;
      return {
        x: z,
        y: M,
        z: z_1,
      };
    };
    const v = () => {
      if (document.hidden) {
        i = requestAnimationFrame(v);
        return;
      }
      if (
        !bRef_current ||
        bRef_current.width <= 0 ||
        bRef_current.height <= 0 ||
        !isFinite(bRef_current.width) ||
        !isFinite(bRef_current.height)
      ) {
        i = requestAnimationFrame(v);
        return;
      }
      a.fillStyle = "rgba(2, 4, 18, 0.18)";
      a.fillRect(0, 0, bRef_current.width, bRef_current.height);
      u += 0.005;
      h += 0.0015;
      o += 0.0008;
      const y = [];
      for (const p_1 of p) {
        const S = Math.sin(u + p_1.phase) * 15;
        const w = p_1.ox + S;
        const N = p_1.oy + Math.cos(u * 0.7 + p_1.phase) * 10;
        const z = p_1.oz + Math.sin(u * 0.3 + p_1.phase) * 20;
        const M = j(w, N, z, o, h);
        const k = c(M.x, M.y, M.z);
        y.push({
          p: p_1,
          sx: k.sx,
          sy: k.sy,
          scale: k.scale,
          rz: M.z,
        });
      }
      y.sort((l, S) => S.rz - l.rz);
      for (const l of y) {
        if (l.rz < -m * 0.7) {
          continue;
        }
        const S = Math.max(0, Math.min(1, l.scale * 0.8));
        const w = 10 * l.scale;
        const N = l.p.size * l.scale;
        a.beginPath();
        a.fillStyle = l.p.color;
        a.globalAlpha = S * 0.85;
        a.shadowBlur = w;
        a.shadowColor = l.p.color;
        a.arc(l.sx, l.sy, N, 0, Math.PI * 2);
        a.fill();
        a.beginPath();
        a.fillStyle = "#ffffff";
        a.globalAlpha = S * 0.4;
        a.shadowBlur = 0;
        a.arc(l.sx, l.sy, N * 0.4, 0, Math.PI * 2);
        a.fill();
      }
      a.globalAlpha = 1;
      a.shadowBlur = 0;
      i = requestAnimationFrame(v);
    };
    const s = (y) => {
      y.clientX;
      y.clientY;
    };
    window.addEventListener("mousemove", s);
    x();
    window.addEventListener("resize", x);
    v();
    return () => {
      cancelAnimationFrame(i);
      window.removeEventListener("resize", x);
      window.removeEventListener("mousemove", s);
    };
  }, []);
  return (
    <canvas
      ref={bRef}
      className="login-particle-canvas fixed inset-0 w-full h-full"
      style={{
        zIndex: 0,
      }}
    />
  );
}
function OeComponent() {
  const bRef = React.useRef(null);
  React.useEffect(() => {
    const bRef_current = bRef.current;
    if (!bRef_current) {
      return;
    }
    const a = bRef_current.getContext("2d", {
      willReadFrequently: false,
    });
    if (!a || window.matchMedia("(max-width: 767px)").matches) {
      return;
    }
    let i;
    let o = bRef_current.width / 2;
    let h = bRef_current.height / 2;
    let u = o;
    let m = h;
    let phase = 0;
    const p = [];
    const f = ["rgba(0, 80, 180, 0.12)", "rgba(120, 0, 200, 0.10)", "rgba(255, 100, 0, 0.08)"];
    const x = () => {
      bRef_current.width = window.innerWidth || 1;
      bRef_current.height = window.innerHeight || 1;
      p.length = 0;
      for (let v = 0; v < 3; v++) {
        p.push({
          x: Math.random() * bRef_current.width,
          y: Math.random() * bRef_current.height,
          r: 150 + Math.random() * 250,
          color: f[v],
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };
    const c = () => {
      if (document.hidden) {
        i = requestAnimationFrame(c);
        return;
      }
      if (
        !bRef_current ||
        bRef_current.width <= 0 ||
        bRef_current.height <= 0 ||
        !isFinite(bRef_current.width) ||
        !isFinite(bRef_current.height)
      ) {
        i = requestAnimationFrame(c);
        return;
      }
      a.clearRect(0, 0, bRef_current.width, bRef_current.height);
      phase += 0.008;
      o += (u - o) * 0.03;
      h += (m - h) * 0.03;
      const v = {
        x: o,
        y: h,
        r: 180,
        color: "rgba(0, 150, 255, 0.10)",
        phase,
      };
      for (const s of [...p, v]) {
        s.x += s.vx + Math.sin(phase + s.phase) * 0.2;
        s.y += s.vy + Math.cos(phase * 0.7 + s.phase) * 0.2;
        if (s.x < -s.r) {
          s.x = bRef_current.width + s.r;
        }
        if (s.x > bRef_current.width + s.r) {
          s.x = -s.r;
        }
        if (s.y < -s.r) {
          s.y = bRef_current.height + s.r;
        }
        if (s.y > bRef_current.height + s.r) {
          s.y = -s.r;
        }
        if (![s.x, s.y, 0, s.x, s.y, s.r].every((l) => typeof l === "number" && isFinite(l))) {
          continue;
        }
        const y = a.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r);
        y.addColorStop(0, s.color);
        y.addColorStop(0.5, s.color.replace(/[\d.]+\)$/, "0.03)"));
        y.addColorStop(1, "transparent");
        a.fillStyle = y;
        a.fillRect(0, 0, bRef_current.width, bRef_current.height);
      }
      i = requestAnimationFrame(c);
    };
    const j = (v) => {
      u = v.clientX;
      m = v.clientY;
    };
    window.addEventListener("mousemove", j);
    x();
    window.addEventListener("resize", x);
    c();
    return () => {
      cancelAnimationFrame(i);
      window.removeEventListener("resize", x);
      window.removeEventListener("mousemove", j);
    };
  }, []);
  return (
    <canvas
      ref={bRef}
      className="login-nebula-canvas fixed inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 1,
        mixBlendMode: "screen",
      }}
    />
  );
}
function IeComponent() {
  const bRef = React.useRef(null);
  React.useEffect(() => {
    const bRef_current = bRef.current;
    if (!bRef_current) {
      return;
    }
    const a = bRef_current.getContext("2d", {
      willReadFrequently: false,
    });
    if (!a) {
      return;
    }
    let i;
    const o = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚÜabcdefghijklmnñopqrstuvwxyzáéíóúü";
    const h = [];
    const u = () => {
      bRef_current.width = window.innerWidth || 1;
      bRef_current.height = window.innerHeight || 1;
      h.length = 0;
      const r = Math.floor(window.innerWidth / 80);
      for (let p = 0; p < r; p++) {
        h.push({
          x: Math.random() * bRef_current.width,
          y: Math.random() * bRef_current.height - bRef_current.height,
          speed: 0.5 + Math.random() * 1.5,
          char: o[Math.floor(Math.random() * o.length)],
          color: ["#ff00aa", "#00d4ff", "#ff8a2a", "#ffd600", "#39ff14"][Math.floor(Math.random() * 5)],
          size: 10 + Math.random() * 14,
          opacity: 0.1 + Math.random() * 0.3,
        });
      }
    };
    const m = () => {
      if (document.hidden) {
        i = requestAnimationFrame(m);
        return;
      }
      if (
        !bRef_current ||
        bRef_current.width <= 0 ||
        bRef_current.height <= 0 ||
        !isFinite(bRef_current.width) ||
        !isFinite(bRef_current.height)
      ) {
        i = requestAnimationFrame(m);
        return;
      }
      a.clearRect(0, 0, bRef_current.width, bRef_current.height);
      for (const r of h) {
        r.y += r.speed;
        if (r.y > bRef_current.height + 50) {
          r.y = -50;
          r.x = Math.random() * bRef_current.width;
          r.char = o[Math.floor(Math.random() * o.length)];
        }
        a.font = `bold ${r.size}px monospace`;
        a.fillStyle = r.color;
        a.globalAlpha = r.opacity;
        a.shadowBlur = 8;
        a.shadowColor = r.color;
        a.fillText(r.char, r.x, r.y);
      }
      a.globalAlpha = 1;
      a.shadowBlur = 0;
      i = requestAnimationFrame(m);
    };
    u();
    window.addEventListener("resize", u);
    m();
    return () => {
      cancelAnimationFrame(i);
      window.removeEventListener("resize", u);
    };
  }, []);
  return (
    <canvas
      ref={bRef}
      className="login-letter-canvas fixed inset-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 1,
        opacity: 0.35,
      }}
    />
  );
}
function LeComponent({ target, suffix = "", duration = 2000 }) {
  const [i, setI] = React.useState(0);
  const h = parseInt(target.replace(/\D/g, ""), 10) || 0;
  const u = target.includes("+");
  React.useEffect(() => {
    let m = null;
    const r = (f) => {
      if (!m) {
        m = f;
      }
      const x = Math.min((f - m) / duration, 1);
      const c = 1 - (1 - x) ** 3;
      setI(Math.floor(c * h));
      if (x < 1) {
        requestAnimationFrame(r);
      }
    };
    const p = setTimeout(() => requestAnimationFrame(r), 300);
    return () => clearTimeout(p);
  }, [h, duration]);
  return (
    <>
      {i}
      {u ? "+" : ""}
      {suffix}
    </>
  );
}
function useDe() {
  const bRef = React.useRef(null);
  const [transform, setTransform] = React.useState("");
  const onMouseMove = React.useCallback((h) => {
    const bRef_current = bRef.current;
    if (!bRef_current) {
      return;
    }
    const m = bRef_current.getBoundingClientRect();
    const r = h.clientX - m.left;
    const p = h.clientY - m.top;
    const f = m.width / 2;
    const x = m.height / 2;
    const c = ((p - x) / x) * -6;
    const j = ((r - f) / f) * 6;
    setTransform(`perspective(1000px) rotateX(${c}deg) rotateY(${j}deg) scale3d(1.01, 1.01, 1.01)`);
  }, []);
  const onMouseLeave = React.useCallback(() => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  }, []);
  return {
    ref: bRef,
    transform,
    onMouseMove,
    onMouseLeave,
  };
}
function CeComponent({ parentRef }) {
  const tRef = React.useRef(null);
  React.useEffect(() => {
    const tRef_current = tRef.current;
    const parentRef_current = parentRef.current;
    if (!tRef_current || !parentRef_current) {
      return;
    }
    const o = tRef_current.getContext("2d", {
      willReadFrequently: false,
    });
    if (!o) {
      return;
    }
    let h;
    const u = [];
    const m = ["#ffd600", "#ff8a2a", "#ff00aa", "#00d4ff", "#ffffff"];
    const r = () => {
      const x = parentRef_current.getBoundingClientRect();
      tRef_current.width = x.width || 1;
      tRef_current.height = x.height || 1;
    };
    const p = () => {
      const x = parentRef_current.getBoundingClientRect();
      const c = Math.random() * Math.PI * 2;
      const j = 0.3 + Math.random() * 1.5;
      u.push({
        x: x.width / 2,
        y: x.height / 2,
        vx: Math.cos(c) * j,
        vy: Math.sin(c) * j,
        life: 0,
        maxLife: 30 + Math.random() * 40,
        size: 1 + Math.random() * 2.5,
        color: m[Math.floor(Math.random() * m.length)],
      });
    };
    const f = () => {
      if (document.hidden) {
        h = requestAnimationFrame(f);
        return;
      }
      if (
        !tRef_current ||
        tRef_current.width <= 0 ||
        tRef_current.height <= 0 ||
        !isFinite(tRef_current.width) ||
        !isFinite(tRef_current.height)
      ) {
        h = requestAnimationFrame(f);
        return;
      }
      o.clearRect(0, 0, tRef_current.width, tRef_current.height);
      if (Math.random() < 0.15) {
        p();
      }
      for (let x = u.length - 1; x >= 0; x--) {
        const c = u[x];
        c.x += c.vx;
        c.y += c.vy;
        c.life++;
        const j = c.life / c.maxLife;
        const v = j < 0.2 ? j / 0.2 : 1 - (j - 0.2) / 0.8;
        if (c.life >= c.maxLife) {
          u.splice(x, 1);
          continue;
        }
        o.beginPath();
        o.fillStyle = c.color;
        o.globalAlpha = v * 0.8;
        o.shadowBlur = 6;
        o.shadowColor = c.color;
        o.arc(c.x, c.y, c.size * (1 - j * 0.3), 0, Math.PI * 2);
        o.fill();
      }
      o.globalAlpha = 1;
      o.shadowBlur = 0;
      h = requestAnimationFrame(f);
    };
    r();
    window.addEventListener("resize", r);
    f();
    return () => {
      cancelAnimationFrame(h);
      window.removeEventListener("resize", r);
    };
  }, [parentRef]);
  return (
    <canvas
      ref={tRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 5,
        width: "100%",
        height: "100%",
      }}
    />
  );
}
function FeComponent() {
  const bRef = React.useRef(null);
  React.useEffect(() => {
    const bRef_current = bRef.current;
    if (!bRef_current) {
      return;
    }
    const a = bRef_current.getContext("2d", {
      willReadFrequently: false,
    });
    if (!a) {
      return;
    }
    let i;
    const o = [];
    const h = ["#00d4ff", "#ff00aa", "#ff8a2a", "#ffd600"];
    const u = () => {
      const bRef_current_parentElement = bRef_current.parentElement;
      if (bRef_current_parentElement) {
        bRef_current.width = bRef_current_parentElement.clientWidth || 1;
        bRef_current.height = bRef_current_parentElement.clientHeight || 1;
      }
    };
    const m = () => {
      if (o.length < 10 && Math.random() < 0.08) {
        o.push({
          x: Math.random() * bRef_current.width,
          y: bRef_current.height + 5,
          vy: -0.3 - Math.random() * 0.8,
          size: 1 + Math.random() * 2,
          alpha: 0.3 + Math.random() * 0.5,
          color: h[Math.floor(Math.random() * h.length)],
        });
      }
    };
    const r = () => {
      if (document.hidden) {
        i = requestAnimationFrame(r);
        return;
      }
      if (
        !bRef_current ||
        bRef_current.width <= 0 ||
        bRef_current.height <= 0 ||
        !isFinite(bRef_current.width) ||
        !isFinite(bRef_current.height)
      ) {
        i = requestAnimationFrame(r);
        return;
      }
      a.clearRect(0, 0, bRef_current.width, bRef_current.height);
      m();
      for (let p = o.length - 1; p >= 0; p--) {
        const f = o[p];
        f.y += f.vy;
        f.alpha -= 0.003;
        if (f.alpha <= 0 || f.y < -10) {
          o.splice(p, 1);
          continue;
        }
        a.beginPath();
        a.fillStyle = f.color;
        a.globalAlpha = f.alpha;
        a.shadowBlur = 4;
        a.shadowColor = f.color;
        a.arc(f.x, f.y, f.size, 0, Math.PI * 2);
        a.fill();
      }
      a.globalAlpha = 1;
      a.shadowBlur = 0;
      i = requestAnimationFrame(r);
    };
    u();
    window.addEventListener("resize", u);
    r();
    return () => {
      cancelAnimationFrame(i);
      window.removeEventListener("resize", u);
    };
  }, []);
  return (
    <canvas
      ref={bRef}
      className="absolute inset-0 pointer-events-none rounded-3xl"
      style={{
        zIndex: 3,
      }}
    />
  );
}
function YeComponent() {
  const { isSignedIn, isLoaded } = ne();
  const { user } = re();
  const i = useNavigate();
  const [o, setO] = React.useState(false);
  const [u, setU] = React.useState("");
  const [r, setR] = React.useState("");
  const [f, setF] = React.useState("");
  const [c, setC] = React.useState(false);
  const [v, setV] = React.useState("");
  const yRef = React.useRef("AI Español · 智能西班牙语");
  const [l, setL] = React.useState(true);
  const [w, setW] = React.useState(false);
  const [z, setZ] = React.useState(null);
  const [k, setK] = React.useState(false);
  const IRef = React.useRef(null);
  const E = useDe();
  React.useEffect(() => {
    const n = window.matchMedia("(display-mode: standalone)").matches || !!navigator.standalone;
    setK(n);
  }, []);
  const href = "./AiEspanol.apk";
  React.useEffect(() => {
    let n = 0;
    const g = setInterval(() => {
      if (n <= yRef.current.length) {
        setV(yRef.current.slice(0, n));
        n++;
      } else {
        clearInterval(g);
      }
    }, 80);
    return () => clearInterval(g);
  }, []);
  React.useEffect(() => {
    const n = setTimeout(() => setL(false), 5000);
    return () => clearTimeout(n);
  }, []);
  React.useEffect(() => {
    if (isLoaded && isSignedIn && !w) {
      setW(true);
      setTimeout(() => i("/dashboard"), 300);
    }
  }, [isLoaded, isSignedIn, i]);
  React.useEffect(() => {
    try {
      const n = sessionStorage.getItem("dele_auth");
      const g = sessionStorage.getItem("dele_expiry");
      if (n === "true" && g && Date.now() < Number(g) && !w) {
        setW(true);
        setTimeout(() => i("/dashboard"), 300);
      }
    } catch {}
  }, [i, w]);
  const onSubmit = (n) => {
    n.preventDefault();
    setF("");
    if (u.trim() === "admin" && r.trim() === "314159") {
      const g = Date.now() + 5400000;
      sessionStorage.setItem("dele_auth", "true");
      sessionStorage.setItem("dele_expiry", String(g));
      sessionStorage.removeItem("dele_guest");
      setW(true);
      setTimeout(() => i("/dashboard"), 300);
    } else {
      setF("Usuario o contraseña incorrectos / 用户名或密码错误");
    }
  };
  const F = [
    "#ff00aa",
    "#00d4ff",
    "#ffffff",
    "#ffd600",
    "#ff8a2a",
    "#ff0055",
    "#00ff88",
    "#aa00ff",
    "#ff4400",
    "#00ffff",
  ];
  return (
    <div
      className="cinematic-login min-h-screen relative overflow-hidden"
      style={{
        background: "#020412",
      }}
    >
      {w && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{
            background: "rgba(2,4,18,0.9)",
            backdropFilter: "blur(12px)",
          }}
        >
          <LoaderCircleIcon
            size={48}
            className="text-cyan-400 animate-spin mb-4"
            style={{
              filter: "drop-shadow(0 0 20px rgba(0,212,255,0.5))",
            }}
          />
          <p
            className="text-white font-bold text-lg"
            style={{
              textShadow: "0 0 20px rgba(0,212,255,0.5)",
            }}
          >
            Cargando... / 加载中...
          </p>
        </div>
      )}
      <SeComponent />
      <OeComponent />
      <IeComponent />
      <div className="login-aurora login-aurora-one" aria-hidden="true" />
      <div className="login-aurora login-aurora-two" aria-hidden="true" />
      <div className="login-scan-beam" aria-hidden="true" />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 35%, transparent 0%, rgba(2,4,18,0.75) 100%)",
          zIndex: 2,
        }}
      />
      <div
        className="fixed bottom-0 left-0 right-0 h-[45vh] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,170,0.025) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          transform: "perspective(350px) rotateX(60deg)",
          transformOrigin: "bottom center",
          maskImage: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
          zIndex: 2,
        }}
      />
      <button
        onClick={() => setC(!c)}
        className="fixed top-4 right-4 z-50 p-2.5 rounded-full transition-all hover:scale-110"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: c ? "#39ff14" : "rgba(255,255,255,0.3)",
          backdropFilter: "blur(8px)",
        }}
      >
        {c ? <Volume2Icon size={16} /> : <VolumeXIcon size={16} />}
      </button>
      <div className="login-stage relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <div
          className="text-center mb-12 relative"
          style={{
            perspective: "1200px",
          }}
        >
          <div className="absolute -left-[32%] top-6 hidden xl:block opacity-75">
            <L variant="dashboard" compact />
          </div>
          <div className="absolute -right-[32%] top-6 hidden xl:block opacity-70">
            <L variant="pronunciation" compact />
          </div>
          <div
            ref={IRef}
            className="relative w-60 h-60 mx-auto mb-8"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <CeComponent parentRef={IRef} />
            <div
              className="absolute inset-[-60px] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,140,0,0.22) 0%, rgba(255,0,170,0.12) 30%, rgba(0,212,255,0.08) 50%, transparent 70%)",
                animation: "loginV2AuraPulse 3s ease-in-out infinite",
              }}
            />
            <div
              className="absolute inset-[-30px] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(255,214,0,0.15) 0%, transparent 60%)",
                animation: "loginV2AuraPulse 3s ease-in-out infinite 0.5s",
              }}
            />
            <div
              className="absolute inset-[-14px] rounded-full border-[2.5px] border-transparent"
              style={{
                borderTopColor: "rgba(255,214,0,0.5)",
                borderBottomColor: "rgba(255,0,170,0.35)",
                animation: "loginV2RingSpin1 5s linear infinite",
                boxShadow: "0 0 20px rgba(255,214,0,0.1), inset 0 0 20px rgba(255,0,170,0.05)",
              }}
            />
            <div
              className="absolute inset-[-6px] rounded-full border-[2px] border-transparent"
              style={{
                borderLeftColor: "rgba(255,140,0,0.45)",
                borderRightColor: "rgba(0,212,255,0.4)",
                animation: "loginV2RingSpin2 7s linear infinite reverse",
                boxShadow: "0 0 15px rgba(255,140,0,0.1)",
              }}
            />
            <div
              className="absolute inset-[-22px] rounded-full border-[1.5px] border-transparent"
              style={{
                borderTopColor: "rgba(0,212,255,0.3)",
                borderBottomColor: "rgba(255,214,0,0.25)",
                animation: "loginV2RingSpin3 10s linear infinite",
              }}
            />
            <div
              className="absolute inset-[-32px] rounded-full"
              style={{
                border: "1px dashed rgba(255,255,255,0.12)",
                animation: "loginV2RingSpin4 15s linear infinite reverse",
              }}
            />
            <div
              className="absolute inset-[6px] rounded-full border border-transparent"
              style={{
                borderColor: "rgba(255,255,255,0.08)",
                animation: "loginV2RingSpin1 4s linear infinite reverse",
              }}
            />
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                animation: "loginV2Float3D 5s ease-in-out infinite",
                transformStyle: "preserve-3d",
              }}
            >
              <video
                src="./mascota-reymono.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-44 h-44 object-cover rounded-full"
                style={{
                  border: "3px solid rgba(255,214,0,0.7)",
                  boxShadow:
                    "0 0 80px rgba(255,214,0,0.35), 0 0 160px rgba(255,138,42,0.2), inset 0 0 50px rgba(255,214,0,0.15)",
                }}
                onError={(n) => {
                  const n_currentTarget = n.currentTarget;
                  n_currentTarget.style.display = "none";
                  const C = document.createElement("div");
                  C.className = "w-44 h-44 rounded-full flex items-center justify-center text-7xl";
                  C.style.cssText =
                    "background: linear-gradient(135deg,#ffd600,#ff8a2a); border: 3px solid #ffd600; box-shadow: 0 0 80px rgba(255,214,0,0.5);";
                  C.textContent = "🐵";
                  n_currentTarget.parentElement?.appendChild(C);
                }}
              />
            </div>
            <div
              className="absolute -top-1 -right-1 w-11 h-11 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #ffd600, #ff8a2a)",
                boxShadow: "0 0 25px rgba(255,214,0,0.9), 0 0 50px rgba(255,138,42,0.4)",
                animation: "loginV2SparkleSpin 2.5s ease-in-out infinite",
              }}
            >
              <ZapIcon size={20} className="text-white" />
            </div>
          </div>
          <div
            className="relative mb-2"
            style={{
              perspective: "800px",
            }}
          >
            {[4, 3, 2, 1].map((n) => (
              <h1
                key={n}
                className="absolute inset-0 text-5xl md:text-7xl font-black tracking-tight pointer-events-none select-none"
                style={{
                  transform: `translateZ(${-n * 3}px) translateY(${n * 1.5}px)`,
                  opacity: 0.15 + n * 0.05,
                  color: "#ff8a2a",
                  textShadow: `0 0 ${n * 8}px rgba(255,138,42,${0.1 + n * 0.05})`,
                }}
              >
                {"AI Español".split("").map((g, key) => (
                  <span key={key} className="inline-block">
                    {g === " " ? " " : g}
                  </span>
                ))}
              </h1>
            ))}
            <h1
              className="relative text-5xl md:text-7xl font-black tracking-tight"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {"AI Español".split("").map((n, g) => (
                <span
                  key={g}
                  style={{
                    color: F[g] || "#fff",
                    textShadow: `0 0 15px ${F[g] || "#fff"}, 0 0 40px ${F[g] || "#fff"}, 0 0 80px ${F[g] || "#fff"}40`,
                    animation: `loginV2WaveLetter 2.2s ease-in-out ${g * 0.12}s infinite, loginV2GlowPulse 3s ease-in-out ${g * 0.15}s infinite`,
                    display: "inline-block",
                  }}
                >
                  {n === " " ? " " : n}
                </span>
              ))}
            </h1>
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden"
              style={{
                mixBlendMode: "overlay",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,0,170,0.4) 25%, rgba(0,212,255,0.4) 50%, rgba(255,214,0,0.4) 75%, transparent 100%)",
                  backgroundSize: "200% 100%",
                  animation: "loginV2Shimmer 4s linear infinite",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              />
            </div>
          </div>
          <p
            className="text-lg md:text-xl font-bold mb-2 h-8"
            style={{
              color: "rgba(0,212,255,0.85)",
              textShadow: "0 0 15px rgba(0,212,255,0.5), 0 0 30px rgba(0,212,255,0.2)",
            }}
          >
            {v}
            <span className="animate-pulse">|</span>
          </p>
          <p
            className="text-sm font-medium mb-8"
            style={{
              color: "rgba(200,210,255,0.5)",
            }}
          >
            Plataforma para aprender español · DELE备考 · 西班牙语学习平台
          </p>
          <div className="login-hero">
            <h2 className="login-hero-title">
              Aprueba el <span>DELE</span>
            </h2>
            <p className="login-hero-zh">轻松通过西班牙语 DELE 考试</p>
            <ul className="login-pills">
              <li>Exámenes oficiales A1–B2</li>
              <li>Corrección con IA</li>
              <li>80 módulos · 47 juegos</li>
            </ul>
          </div>
          <div className="hidden">
            {[
              {
                num: "80",
                suffix: "+",
                label: "Módulos",
                labelZh: "模块",
                color: "#ff00aa",
              },
              {
                num: "40",
                suffix: "+",
                label: "Juegos",
                labelZh: "游戏",
                color: "#00d4ff",
              },
              {
                num: "A1-B2",
                suffix: "",
                label: "Niveles DELE",
                labelZh: "DELE等级",
                color: "#ffd600",
              },
              {
                num: "AI",
                suffix: "",
                label: "Tutor IA",
                labelZh: "AI导师",
                color: "#39ff14",
              },
            ].map((n, g) => (
              <div
                key={g}
                className="text-center px-3 py-2.5 rounded-xl transition-all cursor-default"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${n.color}25`,
                  boxShadow: `0 0 20px ${n.color}10, inset 0 0 20px ${n.color}05`,
                  animation: `loginV2StatFloat 4s ease-in-out ${g * 0.3}s infinite`,
                }}
                onMouseEnter={(C) => {
                  const C_currentTarget = C.currentTarget;
                  C_currentTarget.style.transform =
                    "perspective(500px) rotateX(-5deg) rotateY(5deg) scale(1.08)";
                  C_currentTarget.style.boxShadow = `0 0 40px ${n.color}40, inset 0 0 30px ${n.color}15`;
                  C_currentTarget.style.borderColor = `${n.color}60`;
                }}
                onMouseLeave={(C) => {
                  const C_currentTarget = C.currentTarget;
                  C_currentTarget.style.transform = "";
                  C_currentTarget.style.boxShadow = `0 0 20px ${n.color}10, inset 0 0 20px ${n.color}05`;
                  C_currentTarget.style.borderColor = `${n.color}25`;
                }}
              >
                <div
                  className="text-xl font-black"
                  style={{
                    color: n.color,
                    textShadow: `0 0 10px ${n.color}80, 0 0 25px ${n.color}40`,
                  }}
                >
                  {n.num === "A1-B2" || n.num === "AI" ? n.num : <LeComponent target={n.num + n.suffix} />}
                </div>
                <div className="text-[10px] font-bold text-white/40">{n.label}</div>
                <div className="text-[9px] text-white/25">{n.labelZh}</div>
              </div>
            ))}
          </div>
          {false && (
            <div
              className="mobile-install-launcher md:hidden"
              aria-label="Instalar AI Español como aplicación"
            >
              <div className="mobile-install-heading">
                <span>
                  <DownloadIcon size={15} />
                </span>
                <div>
                  <strong>在 iPhone / iPad 上安装</strong>
                  <small>添加到主屏幕，像应用一样使用</small>
                </div>
              </div>
              <div className="mobile-install-actions">
                <a href={href} download="AiEspanol.apk">
                  <SmartphoneIcon size={17} />
                  <span>Android APK</span>
                </a>
                <button type="button" onClick={() => setZ("ios")}>
                  <AppleIcon size={18} />
                  <span>iPhone / iPad</span>
                </button>
              </div>
            </div>
          )}
        </div>
        <div
          ref={E.ref}
          className="login-cardwrap relative w-full max-w-md"
          style={{
            perspective: "1000px",
            transform: E.transform,
            transition: "transform 0.15s ease-out",
          }}
          onMouseMove={E.onMouseMove}
          onMouseLeave={E.onMouseLeave}
        >
          <div
            className="absolute -inset-2 rounded-[2rem] opacity-60 blur-2xl"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(0,212,255,0.4), rgba(255,0,170,0.3), rgba(255,140,0,0.4), rgba(0,212,255,0.4))",
              animation: "loginV2CardGlow 3s ease-in-out infinite alternate",
            }}
          />
          <div
            className="relative rounded-3xl p-8 overflow-hidden"
            style={{
              background: "linear-gradient(180deg, rgba(12,18,50,0.92) 0%, rgba(6,10,30,0.96) 100%)",
              border: "1px solid rgba(0,212,255,0.2)",
              boxShadow:
                "0 0 80px rgba(0,212,255,0.12), 0 0 160px rgba(0,80,255,0.06), inset 0 1px 0 rgba(255,255,255,0.06)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.03) 100%)",
                zIndex: 2,
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,212,255,0.03) 0%, transparent 40%, transparent 60%, rgba(255,0,170,0.02) 100%)",
                zIndex: 2,
              }}
            />
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none p-[1.5px] overflow-hidden"
              style={{
                background: "conic-gradient(from 0deg, #00d4ff, #ff00aa, #ff8a2a, #ffd600, #00d4ff)",
                animation: "loginV2BorderSpin 4s linear infinite",
              }}
            >
              <div
                className="w-full h-full rounded-3xl"
                style={{
                  background: "linear-gradient(180deg, rgba(12,18,50,0.98) 0%, rgba(6,10,30,0.99) 100%)",
                }}
              />
            </div>
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden"
              style={{
                zIndex: 2,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 48%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 52%, transparent 60%)",
                  animation: "loginV2Shimmer 5s ease-in-out infinite",
                }}
              />
            </div>
            <FeComponent />
            <div
              className="absolute top-3 left-3 w-3.5 h-3.5 rounded-full"
              style={{
                background: "#00d4ff",
                boxShadow: "0 0 15px #00d4ff, 0 0 30px #00d4ff60",
                animation: "loginV2CornerPulse 1.8s ease-in-out infinite",
                zIndex: 4,
              }}
            />
            <div
              className="absolute top-3 right-3 w-3.5 h-3.5 rounded-full"
              style={{
                background: "#ff00aa",
                boxShadow: "0 0 15px #ff00aa, 0 0 30px #ff00aa60",
                animation: "loginV2CornerPulse 1.8s ease-in-out infinite 0.45s",
                zIndex: 4,
              }}
            />
            <div
              className="absolute bottom-3 left-3 w-3.5 h-3.5 rounded-full"
              style={{
                background: "#ff8a2a",
                boxShadow: "0 0 15px #ff8a2a, 0 0 30px #ff8a2a60",
                animation: "loginV2CornerPulse 1.8s ease-in-out infinite 0.9s",
                zIndex: 4,
              }}
            />
            <div
              className="absolute bottom-3 right-3 w-3.5 h-3.5 rounded-full"
              style={{
                background: "#ffd600",
                boxShadow: "0 0 15px #ffd600, 0 0 30px #ffd60060",
                animation: "loginV2CornerPulse 1.8s ease-in-out infinite 1.35s",
                zIndex: 4,
              }}
            />
            <div className="relative z-10">
              {o ? (
                <form onSubmit={onSubmit} className="w-full space-y-4">
                  <div className="text-center mb-4">
                    <h3 className="text-white font-bold text-lg">Admin Login</h3>
                    <p className="text-white/40 text-xs">Acceso de administrador / 管理员登录</p>
                  </div>
                  {f && (
                    <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-2 text-red-400 text-xs text-center">
                      {f}
                    </div>
                  )}
                  <input
                    type="text"
                    value={u}
                    onChange={(n) => setU(n.target.value)}
                    placeholder="Usuario / 用户名"
                    className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-2.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                  <input
                    type="password"
                    value={r}
                    onChange={(n) => setR(n.target.value)}
                    placeholder="Contraseña / 密码"
                    className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-4 py-2.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl py-2.5 text-sm transition-all shadow-lg"
                    style={{
                      boxShadow: "0 0 25px rgba(0,212,255,0.35)",
                    }}
                  >
                    Entrar / 登录
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setO(false);
                      setF("");
                    }}
                    className="w-full text-white/40 hover:text-white/60 text-xs transition-colors py-1"
                  >
                    ← Volver a opciones / 返回选项
                  </button>
                </form>
              ) : (
                <div className="w-full space-y-4">
                  <button
                    onClick={() => i("/sign-in")}
                    className="login-one w-full py-4 rounded-xl font-black text-sm transition-all hover:scale-[1.02] flex items-center justify-center gap-2 relative overflow-hidden group"
                    style={{
                      background: "linear-gradient(135deg, #ff8a2a, #ff5500)",
                      color: "#fff",
                      boxShadow: "0 0 40px rgba(255,140,0,0.5), 0 4px 15px rgba(0,0,0,0.3)",
                      border: "1px solid rgba(255,140,0,0.4)",
                    }}
                  >
                    <span
                      className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                      }}
                    />
                    <LogInIcon size={18} />
                    <span>Iniciar sesión · 登录</span>
                    <span className="ml-1">→</span>
                  </button>
                  {/admin/i.test(location.hash) && (
                    <button
                      onClick={() => setO(true)}
                      className="w-full py-2.5 rounded-lg font-bold text-xs transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5"
                      style={{
                        background: "transparent",
                        color: "rgba(200,210,255,0.5)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <KeyRoundIcon size={12} />
                      <span>Admin access / 管理员入口</span>
                    </button>
                  )}
                  {false && (
                    <div className="flex items-center gap-3 py-2">
                      <div
                        className="flex-1 h-px"
                        style={{
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12))",
                        }}
                      />
                      <span className="text-[10px] font-bold text-white/20">o</span>
                      <div
                        className="flex-1 h-px"
                        style={{
                          background: "linear-gradient(90deg, rgba(255,255,255,0.12), transparent)",
                        }}
                      />
                    </div>
                  )}
                  {false && (
                    <div className="flex flex-col items-center gap-3">
                      <div
                        className="flex items-center gap-2"
                        style={{
                          color: "rgba(200,210,255,0.6)",
                        }}
                      >
                        <MessageCircleIcon
                          size={14}
                          style={{
                            color: "#00d4ff",
                          }}
                        />
                        <span className="text-xs font-bold">Contacto WeChat / 微信联系</span>
                      </div>
                      <div
                        className="relative p-2 rounded-2xl group cursor-pointer"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          boxShadow: "0 0 25px rgba(0,212,255,0.15)",
                        }}
                      >
                        <img
                          src="./images/qr-wechat.png"
                          alt="WeChat QR"
                          className="w-28 h-28 rounded-xl object-cover transition-all group-hover:scale-105"
                          onError={(n) => {
                            n.target.style.display = "none";
                          }}
                        />
                        <div
                          className="absolute inset-0 rounded-2xl pointer-events-none"
                          style={{
                            boxShadow: "inset 0 0 25px rgba(0,212,255,0.15)",
                          }}
                        />
                        <div
                          className="absolute left-0 right-0 h-[2px] pointer-events-none"
                          style={{
                            background: "linear-gradient(90deg, transparent, #00d4ff, transparent)",
                            boxShadow: "0 0 12px #00d4ff",
                            animation: "loginV2ScanLine 3s ease-in-out infinite",
                          }}
                        />
                      </div>
                      <div
                        className="flex items-center gap-1.5"
                        style={{
                          color: "rgba(200,210,255,0.3)",
                        }}
                      >
                        <GlobeIcon size={10} />
                        <span className="text-[10px]">Soporte en español y chino / 中西双语支持</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {false && (
          <div
            className="fixed bottom-6 left-1/2 flex flex-col items-center gap-1 z-20"
            style={{
              animation: "loginV2Bounce 2s ease-in-out infinite",
              transform: "translateX(-50%)",
            }}
          >
            <span className="text-[10px] font-bold text-white/30">Desliza para explorar / 向下滑动</span>
            <ChevronDownIcon size={16} className="text-white/30" />
          </div>
        )}
      </div>
      {z && (
        <div
          className="mobile-install-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Cómo instalar la aplicación"
        >
          <button className="mobile-install-close" onClick={() => setZ(null)} aria-label="Cerrar">
            <XIcon size={20} />
          </button>
          <div className="mobile-install-logo">
            <span>ES</span>
          </div>
          <span className="mobile-install-kicker">快速安装</span>
          <h2>在 iPhone 或 iPad 上安装</h2>
          <ol>
            <li>
              <span>1</span>请使用 Safari 浏览器打开本网页。
            </li>
            <li>
              <span>2</span>点击 Safari 工具栏中的 <Share2Icon size={17} />
              “分享”按钮。
            </li>
            <li>
              <span>3</span>在菜单中选择“添加到主屏幕”。
            </li>
            <li>
              <span>4</span>点击右上角的“添加”，图标就会出现在桌面上。
            </li>
          </ol>
          <p>无需付费 Apple Developer 账户。以后可从桌面图标直接打开，并以全屏模式使用。</p>
          <button className="mobile-install-understood" onClick={() => setZ(null)}>
            我知道了
          </button>
        </div>
      )}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes loginV2AuraPulse { 0%,100%{transform:scale(1);opacity:0.8} 50%{transform:scale(1.2);opacity:1} }
        @keyframes loginV2RingSpin1 { 0%{transform:rotateX(60deg) rotateZ(0deg)} 100%{transform:rotateX(60deg) rotateZ(360deg)} }
        @keyframes loginV2RingSpin2 { 0%{transform:rotateY(60deg) rotateZ(0deg)} 100%{transform:rotateY(60deg) rotateZ(360deg)} }
        @keyframes loginV2RingSpin3 { 0%{transform:rotateX(45deg) rotateY(45deg) rotateZ(0deg)} 100%{transform:rotateX(45deg) rotateY(45deg) rotateZ(360deg)} }
        @keyframes loginV2RingSpin4 { 0%{transform:rotateX(30deg) rotateY(60deg) rotateZ(0deg)} 100%{transform:rotateX(30deg) rotateY(60deg) rotateZ(360deg)} }
        @keyframes loginV2Float3D {
          0%,100%{transform:translateY(0) rotateX(0) rotateY(0) rotateZ(0)}
          20%{transform:translateY(-10px) rotateX(5deg) rotateY(5deg) rotateZ(2deg)}
          40%{transform:translateY(-5px) rotateX(0) rotateY(8deg) rotateZ(-1deg)}
          60%{transform:translateY(-12px) rotateX(-4deg) rotateY(4deg) rotateZ(1deg)}
          80%{transform:translateY(-6px) rotateX(3deg) rotateY(-3deg) rotateZ(-2deg)}
        }
        @keyframes loginV2SparkleSpin { 0%,100%{transform:rotate(0) scale(1)} 50%{transform:rotate(180deg) scale(1.2)} }
        @keyframes loginV2WaveLetter {
          0%,100%{transform:translateY(0) scale(1) rotateZ(0)}
          25%{transform:translateY(-6px) scale(1.1) rotateZ(1deg)}
          50%{transform:translateY(-3px) scale(1.05) rotateZ(0)}
          75%{transform:translateY(-8px) scale(1.12) rotateZ(-1deg)}
        }
        @keyframes loginV2GlowPulse {
          0%,100%{text-shadow:0 0 15px currentColor, 0 0 40px currentColor, 0 0 80px currentColor40}
          50%{text-shadow:0 0 25px currentColor, 0 0 60px currentColor, 0 0 120px currentColor60}
        }
        @keyframes loginV2CardGlow { from{opacity:0.4;transform:scale(1)} to{opacity:0.8;transform:scale(1.03)} }
        @keyframes loginV2BorderSpin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes loginV2CornerPulse { 0%,100%{transform:scale(1);opacity:0.9} 50%{transform:scale(1.4);opacity:1} }
        @keyframes loginV2ScanLine { 0%{top:0;opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{top:100%;opacity:0} }
        @keyframes loginV2Bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
        @keyframes loginV2StatFloat {
          0%,100%{transform:translateY(0) rotateX(0) rotateY(0)}
          33%{transform:translateY(-4px) rotateX(2deg) rotateY(2deg)}
          66%{transform:translateY(-2px) rotateX(-1deg) rotateY(3deg)}
        }
        @keyframes loginV2Float3D {
          0%,100%{transform:translateY(0) rotateX(0) rotateY(0)}
          33%{transform:translateY(-4px) rotateX(2deg) rotateY(2deg)}
          66%{transform:translateY(-2px) rotateX(-1deg) rotateY(3deg)}
        }
      `,
        }}
      />
    </div>
  );
}
export { YeComponent as default };
