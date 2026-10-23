import {
  BookOpenIcon,
  TrophyIcon,
  ZapIcon,
  StarIcon,
  HeartIcon,
  SparklesIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  GhostIcon,
  LayersIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { SoundToggles } from "../../components/SoundToggles.jsx";
import { g, a } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
const B = 15;
const K = 15;
const tr = [350, 300, 250, 200, 150];
const kt = 8000;
const length = 3;
const rr = 10;
const sr = 100;
const ar = 200;
const nr = 50;
const or = 500;
const lr = ["#ef4444", "#ff69b4", "#00d4ff", "#f97316"];
const ir = ["Blinky", "Pinky", "Inky", "Clyde"];
const Le = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 0, 1, 2, 2, 2, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 3, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
const et = [
  {
    x: 1,
    y: 1,
  },
  {
    x: 13,
    y: 1,
  },
  {
    x: 1,
    y: 13,
  },
  {
    x: 13,
    y: 13,
  },
];
const Z = [
  {
    x: 5,
    y: 6,
  },
  {
    x: 6,
    y: 6,
  },
  {
    x: 7,
    y: 6,
  },
  {
    x: 5,
    y: 7,
  },
];
const X = {
  x: 7,
  y: 13,
};
function St(espanol) {
  return espanol
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-ZÑ]/g, "")
    .trim();
}
function tt(o) {
  const n = [...o];
  for (let l = n.length - 1; l > 0; l--) {
    const m = Math.floor(Math.random() * (l + 1));
    [n[l], n[m]] = [n[m], n[l]];
  }
  return n;
}
function Rt() {
  const o = [];
  for (let y = 0; y < K; y++) {
    for (let x = 0; x < B; x++) {
      if (Le[y][x] === 0) {
        o.push({
          x,
          y,
        });
      }
    }
  }
  return o;
}
function cr(o) {
  return Rt().filter((l) => !o.some((m) => m.x === l.x && m.y === l.y));
}
function ze(o, n) {
  if (o < 0 || o >= B || n < 0 || n >= K) {
    return true;
  }
  return Le[n][o] === 1;
}
function Ie(o, n) {
  if (o < 0 || o >= B || n < 0 || n >= K) {
    return false;
  }
  return Le[n][o] === 2;
}
function dr(o) {
  switch (o) {
    case "up":
      return "down";
    case "down":
      return "up";
    case "left":
      return "right";
    case "right":
      return "left";
  }
}
function _(o) {
  switch (o) {
    case "up":
      return {
        dx: 0,
        dy: -1,
      };
    case "down":
      return {
        dx: 0,
        dy: 1,
      };
    case "left":
      return {
        dx: -1,
        dy: 0,
      };
    case "right":
      return {
        dx: 1,
        dy: 0,
      };
  }
}
function rt(o, n, l, m) {
  return Math.abs(o - l) + Math.abs(n - m);
}
function Nt(o, n, dir, m) {
  const i = ["up", "down", "left", "right"];
  const w = dr(dir);
  return i.filter((x) => {
    if (x === w) {
      return false;
    }
    const { dx, dy } = _(x);
    const P = o + dx;
    const v = n + dy;
    return !(ze(P, v) || (!m && Ie(P, v)));
  });
}
function xr() {
  const o = ["#ffd700", "#ff00aa", "#00d4ff", "#39ff14", "#ff4757", "#ff6b35", "#ffffff"];
  for (let n = 0; n < 100; n++) {
    const l = document.createElement("div");
    const m = 6 + Math.random() * 8;
    const i = window.innerWidth / 2 + (Math.random() - 0.5) * 300;
    const w = window.innerHeight / 2 + (Math.random() - 0.5) * 200;
    l.style.cssText = `position:fixed;left:${i}px;top:${w}px;width:${m}px;height:${m}px;border-radius:${Math.random() > 0.5 ? "50%" : "2px"};background:${o[Math.floor(Math.random() * o.length)]};pointer-events:none;z-index:9999;`;
    document.body.appendChild(l);
    let x = (Math.random() - 0.5) * 16;
    let j = -8 - Math.random() * 12;
    let T = Math.random() * 360;
    let P = (Math.random() - 0.5) * 20;
    let v = 1;
    const A = () => {
      x *= 0.98;
      j += 0.4;
      T += P;
      l.style.left = `${parseFloat(l.style.left) + x}px`;
      l.style.top = `${parseFloat(l.style.top) + j}px`;
      l.style.transform = `rotate(${T}deg)`;
      v -= 0.012;
      l.style.opacity = String(v);
      if (v > 0) {
        requestAnimationFrame(A);
      } else {
        l.remove();
      }
    };
    requestAnimationFrame(A);
  }
}
let W = null;
let Q = null;
let We = false;
let De = null;
function fr() {
  if (!We) {
    try {
      W = new (window.AudioContext || window.webkitAudioContext)();
      Q = W.createGain();
      Q.connect(W.destination);
      Q.gain.value = 0.06;
      const o = [
        {
          f: 220,
          d: 0.15,
        },
        {
          f: 220,
          d: 0.15,
        },
        {
          f: 220,
          d: 0.15,
        },
        {
          f: 293,
          d: 0.15,
        },
        {
          f: 293,
          d: 0.15,
        },
        {
          f: 329,
          d: 0.15,
        },
        {
          f: 329,
          d: 0.15,
        },
        {
          f: 293,
          d: 0.3,
        },
        {
          f: 220,
          d: 0.15,
        },
        {
          f: 220,
          d: 0.15,
        },
        {
          f: 220,
          d: 0.15,
        },
        {
          f: 293,
          d: 0.15,
        },
        {
          f: 293,
          d: 0.15,
        },
        {
          f: 329,
          d: 0.15,
        },
        {
          f: 329,
          d: 0.15,
        },
        {
          f: 293,
          d: 0.3,
        },
      ];
      let n = W.currentTime;
      for (let l = 0; l < 6; l++) {
        for (const m of o) {
          const i = W.createOscillator();
          const w = W.createGain();
          i.connect(w);
          w.connect(Q);
          i.type = "square";
          i.frequency.value = m.f;
          w.gain.setValueAtTime(0.05, n);
          w.gain.exponentialRampToValueAtTime(0.001, n + m.d * 0.9);
          i.start(n);
          i.stop(n + m.d);
          n += m.d;
        }
      }
      We = true;
      De = setTimeout(
        () => {
          We = false;
        },
        (n - W.currentTime) * 1000 + 500,
      );
    } catch (error) {
      console.error("Audio error", error);
    }
  }
}
function ur() {
  if (De) {
    clearTimeout(De);
    De = null;
  }
  if (Q) {
    try {
      Q.gain.exponentialRampToValueAtTime(0.001, (W?.currentTime || 0) + 0.3);
    } catch {}
  }
  setTimeout(() => {
    if (W) {
      try {
        W.close();
      } catch {}
      W = null;
    }
    Q = null;
    We = false;
  }, 400);
}
function Ae(o, n, l, m) {
  const i = [l, "#ffffff", "#ffd700", "#ff00aa", "#00d4ff"];
  for (let w = 0; w < m; w++) {
    const x = document.createElement("div");
    const j = 3 + Math.random() * 7;
    x.style.cssText = `position:fixed;left:${o}px;top:${n}px;width:${j}px;height:${j}px;border-radius:50%;background:${i[w % i.length]};pointer-events:none;z-index:9999;box-shadow:0 0 10px ${i[w % i.length]};`;
    document.body.appendChild(x);
    const T = Math.random() * Math.PI * 2;
    const P = 4 + Math.random() * 14;
    let v = Math.cos(T) * P;
    let A = Math.sin(T) * P;
    let V = 1;
    const we = () => {
      v *= 0.93;
      A *= 0.93;
      A += 0.3;
      x.style.left = `${parseFloat(x.style.left) + v}px`;
      x.style.top = `${parseFloat(x.style.top) + A}px`;
      V -= 0.02;
      x.style.opacity = String(V);
      x.style.transform = `scale(${V})`;
      if (V > 0) {
        requestAnimationFrame(we);
      } else {
        x.remove();
      }
    };
    requestAnimationFrame(we);
  }
}
function Te(o, n, l, m) {
  const i = document.createElement("div");
  i.textContent = l;
  i.style.cssText = `position:fixed;left:${o}px;top:${n}px;pointer-events:none;z-index:9999;font-weight:900;font-size:1.3rem;color:${m};text-shadow:0 0 20px ${m},0 0 40px ${m};transform:translate(-50%,-50%);`;
  document.body.appendChild(i);
  let w = 1;
  let x = 0;
  const j = () => {
    x -= 2;
    w -= 0.015;
    i.style.top = `${n + x}px`;
    i.style.opacity = String(w);
    i.style.transform = `translate(-50%,-50%) scale(${1 + (1 - w) * 0.5})`;
    if (w > 0) {
      requestAnimationFrame(j);
    } else {
      i.remove();
    }
  };
  requestAnimationFrame(j);
}
let pr = 0;
function MrComponent({ color, dir, vulnerable, flashing, size }) {
  const x = {
    up: {
      cx: -1.5,
      cy: -2,
    },
    down: {
      cx: -1.5,
      cy: 2,
    },
    left: {
      cx: -3,
      cy: 0,
    },
    right: {
      cx: 0.5,
      cy: 0,
    },
  }[dir];
  const j = vulnerable ? (flashing ? "#ffffff" : "#3b82f6") : color;
  const T = vulnerable && flashing ? "#ef4444" : "#ffffff";
  const P = vulnerable ? "#3b82f6" : "#1a1a2e";
  const v = vulnerable ? "#3b82f6" : color;
  const id = `ghostGlow-${pr++}`;
  return (
    <div
      style={{
        width: size,
        height: size,
        filter: `drop-shadow(0 0 6px ${v}80) drop-shadow(0 0 12px ${v}40)`,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 28 28">
        <defs>
          <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M14,2 C8,2 4,6 4,12 L4,22 C4,24 6,26 8,26 C10,26 11,24 12,22 C13,24 15,24 16,22 C17,24 18,26 20,26 C22,26 24,24 24,22 L24,12 C24,6 20,2 14,2 Z"
          fill={j}
          filter={`url(#${id})`}
        />
        <ellipse cx={10 + x.cx} cy={12 + x.cy} rx="2.5" ry="3.5" fill={T} />
        <ellipse cx={18 + x.cx} cy={12 + x.cy} rx="2.5" ry="3.5" fill={T} />
        <circle cx={10 + x.cx + 0.5} cy={12 + x.cy - 0.5} r="1.2" fill={P} />
        <circle cx={18 + x.cx + 0.5} cy={12 + x.cy - 0.5} r="1.2" fill={P} />
      </svg>
    </div>
  );
}
function CtComponent({ dir, size, mouthOpen }) {
  const m = {
    up: -90,
    down: 90,
    left: 180,
    right: 0,
  }[dir];
  const i = mouthOpen ? 5 : 40;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `conic-gradient(from ${m}deg, #ffd700 ${i}deg, transparent ${i}deg ${360 - i}deg, #ffd700 ${360 - i}deg)`,
        boxShadow: "0 0 10px #ffd70080, 0 0 20px #ffd70040, 0 0 40px #ffd70020",
        transform: "translateZ(10px)",
        transition: "background 0.15s ease-in-out",
      }}
    />
  );
}
function RrComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const w = g();
  const [x, setX] = React.useState("select");
  const [T, setT] = React.useState(0);
  const [v, setV] = React.useState(length);
  const [V, setV_1] = React.useState(() => {
    try {
      return parseInt(localStorage.getItem("wordpacman_best") || "0");
    } catch {
      return 0;
    }
  });
  const [Mt, setMt] = React.useState(0);
  const [at, setAt] = React.useState("");
  const [Pt, setPt] = React.useState(null);
  const [br, setBr] = React.useState("");
  const [gr, setGr] = React.useState(false);
  const [nt, setNt] = React.useState(false);
  const [zt, setZt] = React.useState(false);
  const [It, setIt] = React.useState(0);
  const [Wt, setWt] = React.useState(0);
  const [Lt, setLt] = React.useState(1);
  const [Oe, setOe] = React.useState({
    score: 0,
    words: 0,
    best: 0,
  });
  const [lt, setLt_1] = React.useState(0);
  const [ct, setCt] = React.useState(0);
  const [dt, setDt] = React.useState(0);
  const [$, set$] = React.useState(1);
  const [Gt, setGt] = React.useState([]);
  const [Ft, setFt] = React.useState(0);
  const ft = Gt[Ft];
  const fe = ft?.word || "";
  const ut = ft?.chino || "";
  const ERef = React.useRef({
    ...X,
    dir: "right",
    nextDir: "right",
    mouthPhase: 0,
  });
  const ORef = React.useRef([]);
  const FeRef = React.useRef([]);
  const ZeRef = React.useRef([]);
  const _eRef = React.useRef([]);
  const BeRef = React.useRef(null);
  const eeRef = React.useRef(0);
  const zRef = React.useRef(null);
  const URef = React.useRef(0);
  const DRef = React.useRef(0);
  const HeRef = React.useRef(false);
  const ueRef = React.useRef(length);
  const teRef = React.useRef(0);
  const peRef = React.useRef(0);
  const jeRef = React.useRef(0);
  const veRef = React.useRef(0);
  const YeRef = React.useRef(1);
  const keRef = React.useRef(false);
  const reRef = React.useRef(false);
  const seRef = React.useRef(false);
  const HRef = React.useRef(0);
  React.useRef(1);
  const SeRef = React.useRef(0);
  const qeRef = React.useRef(null);
  const XeRef = React.useRef(0);
  const meRef = React.useRef([]);
  const NeRef = React.useRef(null);
  const ptRef = React.useRef({
    score: 0,
    words: 0,
    best: 0,
  });
  const mtRef = React.useRef(0);
  React.useRef(0);
  const btRef = React.useRef(null);
  const [R, setR] = React.useState(0);
  fe[R];
  fe.slice(0, R).split("");
  fe.slice(R).split("");
  const Ue = React.useCallback(
    (t) => {
      playClick();
      setPt(t);
      qeRef.current = t;
      let c = t ? a(t) : a();
      if (c.length === 0) {
        setAt(
          'Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo o selecciona "Todos los módulos".',
        );
        return;
      }
      const h = c
        .filter((d) => d.espanol && d.chino)
        .map((d) => ({
          word: St(d.espanol),
          chino: d.chino.trim(),
        }))
        .filter((d) => d.word.length >= 3 && d.word.length <= 8);
      const M = [];
      const k = new Set();
      for (const d of h) {
        if (!k.has(d.word)) {
          k.add(d.word);
          M.push(d);
        }
      }
      const y = tt(M).slice(0, 30);
      if (y.length === 0) {
        setAt("Este módulo no tiene palabras válidas para este juego. Prueba con otro módulo.");
        return;
      }
      meRef.current = y;
      setGt(y);
      SeRef.current = 0;
      setFt(0);
      NeRef.current = y[0];
      DRef.current = 0;
      setT(0);
      ueRef.current = length;
      setV(length);
      veRef.current = 0;
      setMt(0);
      YeRef.current = 1;
      setLt(1);
      jeRef.current = 0;
      setLt_1(0);
      teRef.current = 0;
      setCt(0);
      peRef.current = 0;
      setDt(0);
      seRef.current = false;
      setZt(false);
      HRef.current = 0;
      setIt(0);
      URef.current = 0;
      setR(0);
      setAt("");
      setBr("");
      keRef.current = false;
      setGr(false);
      reRef.current = false;
      setNt(false);
      setX("playing");
      fr();
      Ce(y[0].word);
    },
    [playClick],
  );
  const Ce = (t) => {
    ERef.current = {
      x: X.x,
      y: X.y,
      dir: "right",
      nextDir: "right",
      mouthPhase: 0,
    };
    ORef.current = Z.map((u, S) => ({
      x: u.x,
      y: u.y,
      dir: "up",
      color: lr[S],
      name: ir[S],
      vulnerable: false,
      eaten: false,
      respawnTimer: 0,
    }));
    const h = Rt().filter(
      (u) =>
        !(
          (u.x === X.x && u.y === X.y) ||
          et.some((S) => S.x === u.x && S.y === u.y) ||
          Z.some((S) => S.x === u.x && S.y === u.y)
        ),
    );
    ZeRef.current = h.map((u) => ({
      x: u.x,
      y: u.y,
      collected: false,
    }));
    _eRef.current = et.map((u) => ({
      x: u.x,
      y: u.y,
      collected: false,
    }));
    const M = [X, ...Z, ...et];
    const k = cr(M);
    const y = tt(k);
    const d = [];
    for (let index = 0; index < t.length; index++) {
      if (index < y.length) {
        d.push({
          x: y[index].x,
          y: y[index].y,
          char: t[index],
          index,
          collected: false,
        });
      }
    }
    FeRef.current = d;
    URef.current = 0;
    setR(0);
    seRef.current = false;
    setZt(false);
    HRef.current = 0;
    setIt(0);
    eeRef.current = 0;
    HeRef.current = false;
  };
  const onClick = React.useCallback(() => {
    playClick();
    const t = SeRef.current + 1;
    if (t < meRef.current.length) {
      SeRef.current = t;
      NeRef.current = meRef.current[t];
      setFt(t);
      Ce(meRef.current[t].word);
      reRef.current = false;
      setNt(false);
      setX("playing");
    } else {
      const h = (qeRef.current ? a(qeRef.current) : a())
        .filter((d) => d.espanol && d.chino)
        .map((d) => ({
          word: St(d.espanol),
          chino: d.chino.trim(),
        }))
        .filter((d) => d.word.length >= 3 && d.word.length <= 8);
      const M = [];
      const k = new Set();
      for (const d of h) {
        if (!k.has(d.word)) {
          k.add(d.word);
          M.push(d);
        }
      }
      const y = tt(M).slice(0, 30);
      meRef.current = y;
      setGt(y);
      SeRef.current = 0;
      setFt(0);
      NeRef.current = y[0];
      Ce(y[0].word);
      reRef.current = false;
      setNt(false);
      setX("playing");
    }
  }, [playClick, Ce]);
  function gt(t, c, h, M) {
    if (t.eaten) {
      if (t.x === Z[0].x && t.y === Z[0].y) {
        t.eaten = false;
        t.vulnerable = false;
        return;
      }
      const N = Nt(t.x, t.y, t.dir, true);
      if (N.length === 0) {
        return;
      }
      let I = N[0];
      let f = Infinity;
      for (const q of N) {
        const { dx: dx_2, dy: dy_2 } = _(q);
        const p = rt(t.x + dx_2, t.y + dy_2, Z[0].x, Z[0].y);
        if (p < f) {
          f = p;
          I = q;
        }
      }
      const { dx: dx_1, dy: dy_1 } = _(I);
      t.x += dx_1;
      t.y += dy_1;
      t.dir = I;
      return;
    }
    const k = Nt(t.x, t.y, t.dir, false);
    if (k.length === 0) {
      return;
    }
    const y = k;
    let d = y[0];
    let u = Infinity;
    for (const N of y) {
      const { dx: dx_1, dy: dy_1 } = _(N);
      const C = t.x + dx_1;
      const G = t.y + dy_1;
      const a = rt(C, G, c, h) + Math.random() * M;
      if (a < u) {
        u = a;
        d = N;
      }
    }
    const { dx, dy } = _(d);
    t.x += dx;
    t.y += dy;
    t.dir = d;
  }
  btRef.current = () => {
    const ERef_current = ERef.current;
    const ORef_current = ORef.current;
    const FeRef_current = FeRef.current;
    const ZeRef_current = ZeRef.current;
    const _eRef_current = _eRef.current;
    const y = NeRef.current?.word || "";
    if (HeRef.current) {
      return;
    }
    const d = Date.now();
    if (eeRef.current > 0) {
      const a = Math.max(0, eeRef.current - d);
      HRef.current = Math.ceil(a / 1000);
      if (a <= 0) {
        eeRef.current = 0;
        seRef.current = false;
        HRef.current = 0;
        setZt(false);
        setIt(0);
        for (const s of ORef_current) {
          s.vulnerable = false;
        }
      } else {
        for (const s of ORef_current) {
          s.vulnerable = true;
        }
      }
    }
    let t_nextDir = ERef_current.nextDir;
    const { dx, dy } = _(t_nextDir);
    const N = ERef_current.x + dx;
    const I = ERef_current.y + dy;
    if (!ze(N, I) && !Ie(N, I)) {
      ERef_current.dir = t_nextDir;
      ERef_current.x = N;
      ERef_current.y = I;
    } else {
      const { dx: dx_1, dy: dy_1 } = _(ERef_current.dir);
      const p = ERef_current.x + dx_1;
      const b = ERef_current.y + dy_1;
      if (!ze(p, b) && !Ie(p, b)) {
        ERef_current.x = p;
        ERef_current.y = b;
      } else {
        const { dx: dx_2, dy: dy_2 } = _(ERef_current.nextDir);
        const L = ERef_current.x + dx_2;
        const ge = ERef_current.y + dy_2;
        if (!ze(L, ge) && !Ie(L, ge)) {
          ERef_current.dir = ERef_current.nextDir;
          ERef_current.x = L;
          ERef_current.y = ge;
        }
      }
    }
    const f = ZeRef_current.findIndex(
      (a) => a.x === ERef_current.x && a.y === ERef_current.y && !a.collected,
    );
    if (f >= 0) {
      ZeRef_current[f].collected = true;
      DRef.current += rr;
    }
    const C = _eRef_current.findIndex(
      (a) => a.x === ERef_current.x && a.y === ERef_current.y && !a.collected,
    );
    if (C >= 0) {
      _eRef_current[C].collected = true;
      DRef.current += nr;
      eeRef.current = Date.now() + kt;
      seRef.current = true;
      HRef.current = Math.ceil(kt / 1000);
      setZt(true);
      setIt(HRef.current);
      for (const a of ORef_current) {
        if (!a.eaten) {
          a.vulnerable = true;
        }
      }
      playCorrect();
      if (zRef.current) {
        const a = zRef.current.getBoundingClientRect();
        Ae(a.left + a.width / 2, a.top + a.height / 2, "#ffd700", 30);
      }
    }
    const G = FeRef_current.findIndex(
      (a) => a.x === ERef_current.x && a.y === ERef_current.y && !a.collected && a.index === URef.current,
    );
    if (G >= 0) {
      FeRef_current[G].collected = true;
      URef.current += 1;
      setR(URef.current);
      const a = Math.min(teRef.current, 5) * 20;
      const s = sr + a;
      DRef.current += s;
      teRef.current += 1;
      peRef.current += 1;
      setCt(teRef.current);
      setDt(peRef.current);
      playCorrect();
      if (zRef.current) {
        const p = zRef.current.querySelectorAll("[data-cell]");
        const b = Array.from(p).find(
          (g) =>
            parseInt(g.dataset.x || "0") === ERef_current.x &&
            parseInt(g.dataset.y || "0") === ERef_current.y,
        );
        if (b) {
          const g = b.getBoundingClientRect();
          Ae(g.left + g.width / 2, g.top + g.height / 2, "#ffd700", 24);
          Te(g.left + g.width / 2, g.top, `+${s}`, "#ffd700");
        }
      }
      if (URef.current >= y.length) {
        playWin();
        DRef.current += or + y.length * 50;
        veRef.current += 1;
        YeRef.current += 1;
        teRef.current = 0;
        peRef.current = 0;
        reRef.current = true;
        setNt(true);
        setMt(veRef.current);
        setLt(YeRef.current);
        setCt(0);
        setDt(0);
        HeRef.current = true;
        xr();
        if (zRef.current) {
          const p = zRef.current.getBoundingClientRect();
          Te(p.left + p.width / 2, p.top - 40, "¡PALABRA COMPLETADA!", "#39ff14");
          Te(p.left + p.width / 2, p.top - 20, "单词完成！", "#39ff14");
        }
        setTimeout(() => {
          reRef.current = false;
          setNt(false);
          setX("wordcomplete");
        }, 2000);
      }
    }
    for (const s of ORef_current) {
      if (s.eaten) {
        gt(s, 0, 0, 0);
        continue;
      }
      let p = ERef_current.x;
      let b = ERef_current.y;
      if (s.name === "Pinky") {
        const { dx: dx_1, dy: dy_1 } = _(ERef_current.dir);
        p = ERef_current.x + dx_1 * 2;
        b = ERef_current.y + dy_1 * 2;
      } else {
        if (s.name === "Inky") {
          p = ERef_current.x + (Math.random() - 0.5) * 4;
          b = ERef_current.y + (Math.random() - 0.5) * 4;
        } else if (s.name === "Clyde" && rt(s.x, s.y, ERef_current.x, ERef_current.y) < 4) {
          p = B - ERef_current.x;
          b = K - ERef_current.y;
        }
      }
      if (s.vulnerable) {
        p = B - ERef_current.x;
        b = K - ERef_current.y;
      }
      const g = s.name === "Clyde" ? 8 : s.name === "Inky" ? 6 : 2;
      gt(s, p, b, g);
    }
    for (const a of ORef_current) {
      if (a.x === ERef_current.x && a.y === ERef_current.y) {
        if (a.vulnerable && !a.eaten) {
          a.eaten = true;
          a.vulnerable = false;
          const s = ar + jeRef.current * 100;
          DRef.current += s;
          jeRef.current += 1;
          setLt_1(jeRef.current);
          playCorrect();
          if (zRef.current) {
            const p = zRef.current.querySelectorAll("[data-cell]");
            const b = Array.from(p).find(
              (g) =>
                parseInt(g.dataset.x || "0") === ERef_current.x &&
                parseInt(g.dataset.y || "0") === ERef_current.y,
            );
            if (b) {
              const g = b.getBoundingClientRect();
              Ae(g.left + g.width / 2, g.top + g.height / 2, "#00d4ff", 20);
              Te(g.left + g.width / 2, g.top, `+${s}`, "#00d4ff");
            }
          }
        } else if (!a.eaten) {
          playLose();
          keRef.current = true;
          setGr(true);
          teRef.current = 0;
          peRef.current = 0;
          setCt(0);
          setDt(0);
          if (zRef.current) {
            const s = zRef.current.querySelectorAll("[data-cell]");
            const p = Array.from(s).find(
              (b) =>
                parseInt(b.dataset.x || "0") === ERef_current.x &&
                parseInt(b.dataset.y || "0") === ERef_current.y,
            );
            if (p) {
              const b = p.getBoundingClientRect();
              Ae(b.left + b.width / 2, b.top + b.height / 2, "#ffd700", 40);
            }
          }
          setTimeout(() => {
            keRef.current = false;
            ueRef.current -= 1;
            if (ueRef.current <= 0) {
              ptRef.current = {
                score: DRef.current,
                words: veRef.current,
                best: Math.max(XeRef.current, DRef.current),
              };
              const s = Math.max(XeRef.current, DRef.current);
              XeRef.current = s;
              try {
                localStorage.setItem("wordpacman_best", String(s));
              } catch {}
              setOe(ptRef.current);
              setV_1(s);
              setX("gameover");
              ur();
            } else {
              ERef.current = {
                x: X.x,
                y: X.y,
                dir: "right",
                nextDir: "right",
                mouthPhase: 0,
              };
              for (let s = 0; s < ORef.current.length; s++) {
                ORef.current[s].x = Z[s].x;
                ORef.current[s].y = Z[s].y;
                ORef.current[s].dir = "up";
                ORef.current[s].vulnerable = false;
                ORef.current[s].eaten = false;
              }
              eeRef.current = 0;
              seRef.current = false;
              HRef.current = 0;
            }
            setGr(false);
            setV(ueRef.current);
            setCt(0);
            setDt(0);
            setZt(false);
            setIt(0);
          }, 1500);
          return;
        }
      }
    }
    ERef_current.mouthPhase = (ERef_current.mouthPhase + 1) % 2;
    const q = Date.now();
    if (q - mtRef.current > 200) {
      setT(DRef.current);
      setV(ueRef.current);
      mtRef.current = q;
    }
    setWt((a) => a + 1);
  };
  React.useEffect(() => {
    if (x === "playing") {
      BeRef.current = setInterval(() => btRef.current?.(), tr[$ - 1]);
      return () => {
        if (BeRef.current) {
          clearInterval(BeRef.current);
        }
      };
    }
  }, [x, $]);
  React.useEffect(() => {
    const t = (c) => {
      if (x !== "playing") {
        return;
      }
      const c_key = c.key;
      if (c_key === "ArrowUp" || c_key === "w" || c_key === "W") {
        ERef.current.nextDir = "up";
      }
      if (c_key === "ArrowDown" || c_key === "s" || c_key === "S") {
        ERef.current.nextDir = "down";
      }
      if (c_key === "ArrowLeft" || c_key === "a" || c_key === "A") {
        ERef.current.nextDir = "left";
      }
      if (c_key === "ArrowRight" || c_key === "d" || c_key === "D") {
        ERef.current.nextDir = "right";
      }
    };
    window.addEventListener("keydown", t);
    return () => window.removeEventListener("keydown", t);
  }, [x]);
  const Y = (t) => {
    if (x === "playing") {
      ERef.current.nextDir = t;
    }
  };
  const [ae, setAe] = React.useState(() => {
    if (typeof window === "undefined") {
      return 28;
    }
    const t = Math.min(window.innerWidth - 32, 480);
    return Math.floor(t / B);
  });
  React.useEffect(() => {
    const t = () => {
      if (typeof window === "undefined") {
        return;
      }
      const c = Math.min(window.innerWidth - 32, 480);
      setAe(Math.floor(c / B));
    };
    window.addEventListener("resize", t);
    return () => window.removeEventListener("resize", t);
  }, []);
  const Bt = React.useMemo(() => {
    const ERef_current = ERef.current;
    const ORef_current = ORef.current;
    const FeRef_current = FeRef.current;
    const ZeRef_current = ZeRef.current;
    const _eRef_current = _eRef.current;
    const y = Date.now();
    const d = new Map();
    for (const f of FeRef_current) {
      if (!f.collected) {
        d.set(`${f.x},${f.y}`, f);
      }
    }
    const u = new Set();
    for (const f of ZeRef_current) {
      if (!f.collected) {
        u.add(`${f.x},${f.y}`);
      }
    }
    const S = new Set();
    for (const f of _eRef_current) {
      if (!f.collected) {
        S.add(`${f.x},${f.y}`);
      }
    }
    const ne = new Map();
    for (const f of ORef_current) {
      if (!f.eaten) {
        ne.set(`${f.x},${f.y}`, f);
      }
    }
    const N = [];
    const URef_current = URef.current;
    for (let f = 0; f < K; f++) {
      for (let C = 0; C < B; C++) {
        const G = Le[f][C];
        const q = G === 1;
        const a = G === 2;
        const s = `${C},${f}`;
        const p = d.get(s);
        const b = p && p.index === URef_current;
        const g = u.has(s);
        const be = S.has(s);
        const L = ne.get(s);
        const ge = ERef_current.x === C && ERef_current.y === f;
        const Je = {
          width: ae,
          height: ae,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        };
        if (q) {
          N.push(
            <div
              key={s}
              data-cell
              data-x={C}
              data-y={f}
              style={{
                ...Je,
                background:
                  "linear-gradient(145deg, rgba(0,212,255,.22), rgba(0,100,200,.12), rgba(0,212,255,.18))",
                border: "1.5px solid rgba(0,212,255,.4)",
                boxShadow:
                  "inset 0 0 12px rgba(0,212,255,.15), 0 0 8px rgba(0,212,255,.25), 0 0 16px rgba(0,212,255,.1)",
              }}
            />,
          );
        } else if (a) {
          N.push(
            <div
              key={s}
              data-cell
              data-x={C}
              data-y={f}
              style={{
                ...Je,
                background: "linear-gradient(145deg, rgba(255,0,170,.15), rgba(150,0,100,.08))",
                border: "1.5px solid rgba(255,0,170,.35)",
                boxShadow: "inset 0 0 10px rgba(255,0,170,.15), 0 0 8px rgba(255,0,170,.2)",
              }}
            />,
          );
        } else {
          const J = [];
          if (g) {
            J.push(
              <div
                key="dot"
                style={{
                  position: "absolute",
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#ff69b4",
                  boxShadow: "0 0 6px #ff69b4cc, 0 0 12px #ff69b480, 0 0 20px #ff69b440",
                }}
              />,
            );
          }
          if (be) {
            const F = 10 + Math.sin(y / 200) * 3;
            J.push(
              <div
                key="pellet"
                style={{
                  position: "absolute",
                  width: F,
                  height: F,
                  borderRadius: "50%",
                  background: "#ffd700",
                  boxShadow: "0 0 12px #ffd700, 0 0 24px #ffd70080, 0 0 48px #ffd70040, 0 0 80px #ffd70020",
                  animation: "powerPelletPulse 0.6s ease-in-out infinite alternate",
                }}
              />,
            );
          }
          if (p) {
            const color = b ? "#ffd700" : "#ff69b4";
            const Yt = b ? "letterFloatNext" : "letterFloat";
            const fontSize = b ? 18 : 14;
            const opacity = b ? 1 : 0.75;
            J.push(
              <div
                key="letter"
                style={{
                  position: "absolute",
                  fontSize,
                  fontWeight: 900,
                  color,
                  textShadow: `0 0 10px ${color}cc, 0 0 20px ${color}80, 0 0 40px ${color}40`,
                  animation: `${Yt} 1.5s ease-in-out infinite`,
                  opacity,
                  zIndex: 5,
                  transform: "translateZ(5px)",
                }}
              >
                {p.char}
              </div>,
            );
          }
          if (L) {
            const flashing = seRef.current && HRef.current <= 2 && Math.floor(y / 200) % 2 === 0;
            J.push(
              <div
                key="ghost"
                style={{
                  position: "absolute",
                  zIndex: 10,
                  animation: "ghostFloat 1s ease-in-out infinite alternate",
                }}
              >
                <MrComponent
                  color={L.color}
                  dir={L.dir}
                  vulnerable={L.vulnerable}
                  flashing={flashing}
                  size={ae - 4}
                />
              </div>,
            );
          }
          if (ge) {
            if (keRef.current) {
              J.push(
                <div
                  key="pacman"
                  style={{
                    position: "absolute",
                    zIndex: 15,
                    animation: "deathShrink 1.5s ease-in forwards",
                  }}
                >
                  <CtComponent
                    dir={ERef_current.dir}
                    size={ae - 4}
                    mouthOpen={ERef_current.mouthPhase % 2 === 0}
                  />
                </div>,
              );
            } else {
              J.push(
                <div
                  key="pacman"
                  style={{
                    position: "absolute",
                    zIndex: 15,
                    animation: "pacmanWobble 0.2s ease-in-out infinite alternate",
                  }}
                >
                  <CtComponent
                    dir={ERef_current.dir}
                    size={ae - 4}
                    mouthOpen={ERef_current.mouthPhase % 2 === 0}
                  />
                </div>,
              );
            }
          }
          const boxShadow = reRef.current
            ? "0 0 20px rgba(57,255,20,.6), 0 0 40px rgba(57,255,20,.3)"
            : "none";
          N.push(
            <div
              key={s}
              data-cell
              data-x={C}
              data-y={f}
              style={{
                ...Je,
                background: "rgba(14,22,64,.4)",
                border: "1px solid rgba(255,255,255,.04)",
                boxShadow,
              }}
            >
              {J}
            </div>,
          );
        }
      }
    }
    return N;
  }, [Wt, ae]);
  switch (x) {
    case "select":
      return (
        <StarfieldBackground>
          <div className="max-w-5xl mx-auto px-4 py-6 min-h-screen relative z-10">
            <div className="flex items-center justify-between mb-8">
              <Link
                to="/juegos"
                className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold group"
              >
                <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver
                / 返回
              </Link>
              <SoundToggles />
            </div>
            <div className="text-center mb-10 relative">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="w-72 h-72 rounded-full opacity-20 blur-3xl animate-pulse-slow"
                  style={{
                    background: "radial-gradient(circle, rgba(255,214,0,.4), transparent 70%)",
                  }}
                />
              </div>
              <h1
                className="text-4xl md:text-6xl font-black mb-3 relative"
                style={{
                  textShadow:
                    "0 0 40px rgba(255,214,0,.4), 0 0 80px rgba(255,214,0,.2), 0 0 120px rgba(255,0,170,.15)",
                }}
              >
                <GhostIcon
                  size={40}
                  className="inline mr-3 mb-1 animate-pulse"
                  style={{
                    filter: "drop-shadow(0 0 15px rgba(255,214,0,.6))",
                  }}
                />{" "}
                Word Pac-Man
              </h1>
              <p className="text-white/40 text-sm md:text-base font-medium">
                Selecciona un módulo para jugar / 选择模块开始游戏
              </p>
              {at && (
                <div
                  className="mt-4 mx-auto max-w-lg p-4 rounded-xl text-sm font-bold animate-shake"
                  style={{
                    background: "rgba(255,68,68,.12)",
                    border: "1px solid rgba(255,68,68,.3)",
                    color: "#ff6b35",
                  }}
                >
                  {at}
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => {
                  playClick();
                  setAt("");
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
              {w.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    playClick();
                    setAt("");
                    Ue(t.id);
                  }}
                  className="group rounded-2xl p-5 md:p-6 text-left transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(14,22,64,.7), rgba(5,8,27,.6))",
                    border: `1px solid ${t.color}50`,
                    boxShadow: `0 0 30px ${t.color}15, 0 10px 40px rgba(0,0,0,.3)`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${t.color}10, transparent)`,
                    }}
                  />
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-3 relative"
                    style={{
                      background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
                      boxShadow: `0 0 25px ${t.color}40, 0 0 50px ${t.color}20`,
                    }}
                  >
                    <BookOpenIcon size={24} className="text-white" />
                  </div>
                  <h3 className="text-white font-black text-base md:text-lg mb-1">{t.titulo}</h3>
                  <p
                    className="text-xs font-medium mb-1"
                    style={{
                      color: `${t.color}cc`,
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
    case "gameover":
      return (
        <StarfieldBackground>
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{
              background: "rgba(3,4,17,.92)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div
              className="text-center p-6 md:p-8 rounded-3xl max-w-md mx-4 relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(14,22,64,.85), rgba(5,8,27,.65))",
                border: "1px solid rgba(255,0,170,.2)",
                boxShadow: "0 0 80px rgba(255,0,170,.15), 0 40px 100px rgba(0,0,0,.5)",
                perspective: "800px",
                animation: "popIn 0.6s ease-out",
                transform: "rotateX(3deg)",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="absolute -inset-[3px] rounded-[28px] -z-10"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #ffd600)",
                  opacity: 0.6,
                  filter: "blur(25px)",
                  animation: "neonPulse 3s ease-in-out infinite",
                }}
              />
              <TrophyIcon
                size={56}
                style={{
                  color: "#ffd600",
                  margin: "0 auto 16px",
                  filter: "drop-shadow(0 0 15px rgba(255,214,0,.6))",
                }}
              />
              <h2
                className="text-3xl md:text-4xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg, #ff00aa, #ffd600)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 15px rgba(255,0,170,.3))",
                }}
              >
                ¡Juego Terminado!
              </h2>
              <p className="text-white/50 text-sm mb-6">游戏结束！</p>
              <div
                className="grid grid-cols-2 gap-4 mb-6"
                style={{
                  perspective: "500px",
                }}
              >
                <div
                  className="p-4 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: "rgba(255,0,170,.1)",
                    border: "1px solid rgba(255,0,170,.2)",
                    boxShadow: "0 0 15px rgba(255,0,170,.1)",
                    transform: "rotateY(-5deg) translateZ(10px)",
                    animation: "neonPulse 3s ease-in-out infinite",
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
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Score
                  </p>
                  <p
                    className="text-xl font-black"
                    style={{
                      color: "#ff00aa",
                      textShadow: "0 0 10px rgba(255,0,170,.3)",
                    }}
                  >
                    {Oe.score}
                  </p>
                </div>
                <div
                  className="p-4 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: "rgba(255,214,0,.1)",
                    border: "1px solid rgba(255,214,0,.2)",
                    boxShadow: "0 0 15px rgba(255,214,0,.1)",
                    transform: "rotateY(5deg) translateZ(10px)",
                    animation: "neonPulse 3s ease-in-out infinite 0.5s",
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
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Mejor
                  </p>
                  <p
                    className="text-xl font-black"
                    style={{
                      color: "#ffd600",
                      textShadow: "0 0 10px rgba(255,214,0,.3)",
                    }}
                  >
                    {Oe.best}
                  </p>
                </div>
                <div
                  className="p-4 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: "rgba(0,212,255,.1)",
                    border: "1px solid rgba(0,212,255,.2)",
                    boxShadow: "0 0 15px rgba(0,212,255,.1)",
                    transform: "rotateY(-5deg) translateZ(10px)",
                    animation: "neonPulse 3s ease-in-out infinite 1s",
                  }}
                >
                  <StarIcon
                    size={18}
                    style={{
                      color: "#00d4ff",
                      margin: "0 auto 6px",
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
                      textShadow: "0 0 10px rgba(0,212,255,.3)",
                    }}
                  >
                    {Oe.words}
                  </p>
                </div>
                <div
                  className="p-4 rounded-xl transition-all hover:scale-105"
                  style={{
                    background: "rgba(57,255,20,.1)",
                    border: "1px solid rgba(57,255,20,.2)",
                    boxShadow: "0 0 15px rgba(57,255,20,.1)",
                    transform: "rotateY(5deg) translateZ(10px)",
                    animation: "neonPulse 3s ease-in-out infinite 1.5s",
                  }}
                >
                  <GhostIcon
                    size={18}
                    style={{
                      color: "#39ff14",
                      margin: "0 auto 6px",
                    }}
                  />
                  <p
                    className="text-xs"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Fantasmas
                  </p>
                  <p
                    className="text-xl font-black"
                    style={{
                      color: "#39ff14",
                      textShadow: "0 0 10px rgba(57,255,20,.3)",
                    }}
                  >
                    {lt}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-center flex-wrap items-center">
                <button
                  onClick={() => {
                    playClick();
                    Ue(Pt);
                  }}
                  className="px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #ff00aa, #ffd600)",
                    boxShadow: "0 0 30px rgba(255,0,170,.3)",
                    animation: "neonPulse 3s ease-in-out infinite",
                  }}
                >
                  Jugar de nuevo / 再玩一次
                </button>
                <button
                  onClick={() => {
                    playClick();
                    setX("select");
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
                <P currentGameId="word-pacman" />
              </div>
            </div>
          </div>
        </StarfieldBackground>
      );
    case "wordcomplete":
      return (
        <StarfieldBackground>
          <div className="max-w-3xl mx-auto px-4 py-6 min-h-screen flex flex-col items-center justify-center relative z-10">
            <div
              className="text-center p-8 rounded-3xl max-w-md mx-auto relative overflow-hidden"
              style={{
                background: "linear-gradient(180deg, rgba(14,22,64,.85), rgba(5,8,27,.65))",
                border: "1px solid rgba(57,255,20,.3)",
                boxShadow: "0 0 80px rgba(57,255,20,.2), 0 40px 100px rgba(0,0,0,.5)",
                animation: "popIn 0.6s ease-out",
                transform: "rotateX(3deg)",
                perspective: "800px",
              }}
            >
              <div
                className="absolute -inset-[3px] rounded-[28px] -z-10"
                style={{
                  background: "linear-gradient(135deg, #39ff14, #00d4ff)",
                  opacity: 0.6,
                  filter: "blur(25px)",
                  animation: "neonPulse 3s ease-in-out infinite",
                }}
              />
              <StarIcon
                size={56}
                className="mx-auto mb-4 animate-bounce"
                style={{
                  color: "#ffd600",
                  filter: "drop-shadow(0 0 15px rgba(255,214,0,.6))",
                }}
              />
              <h2
                className="text-3xl md:text-4xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg, #39ff14, #00d4ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 15px rgba(57,255,20,.3))",
                }}
              >
                ¡Palabra Completada!
              </h2>
              <p className="text-white/50 text-sm mb-2">单词完成！</p>
              <p
                className="text-2xl font-black mb-4"
                style={{
                  color: "#ffd600",
                  textShadow: "0 0 20px rgba(255,214,0,.5)",
                }}
              >
                {fe}
              </p>
              <p
                className="text-sm mb-6"
                style={{
                  color: "#ff69b4",
                }}
              >
                {ut}
              </p>
              <div className="flex gap-3 justify-center flex-wrap items-center">
                <button
                  onClick={onClick}
                  className="px-8 py-3 rounded-full text-white font-black transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #39ff14, #00d4ff)",
                    boxShadow: "0 0 30px rgba(57,255,20,.3)",
                    animation: "neonPulse 3s ease-in-out infinite",
                  }}
                >
                  Siguiente palabra / 下一个单词
                </button>
              </div>
            </div>
          </div>
        </StarfieldBackground>
      );
    default:
      return (
        <StarfieldBackground>
          <div className="max-w-3xl mx-auto px-2 md:px-4 py-3 md:py-5 min-h-screen flex flex-col relative z-10">
            <div className="flex items-center justify-between mb-2 md:mb-3 flex-wrap gap-2">
              <Link
                to="/juegos"
                className="inline-flex items-center gap-2 text-white/50 hover:text-[#39ecff] transition-colors text-sm font-bold group"
              >
                <ArrowLeftIcon size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver
                / 返回
              </Link>
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <SoundToggles />
                <button
                  onClick={() => {
                    playClick();
                    setX("select");
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 hover:shadow-lg"
                  style={{
                    background: "rgba(255,255,255,.08)",
                    border: "1px solid rgba(255,255,255,.15)",
                    color: "#fff",
                    boxShadow: "0 0 15px rgba(255,255,255,.05)",
                  }}
                >
                  <LayersIcon size={12} /> Cambiar / 切换
                </button>
                <div
                  className="px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105 animate-pulse-glow"
                  style={{
                    background: "rgba(255,214,0,.12)",
                    border: "1px solid rgba(255,214,0,.25)",
                    color: "#ffd600",
                    boxShadow: "0 0 15px rgba(255,214,0,.25)",
                  }}
                >
                  <ZapIcon size={12} /> {T}
                </div>
                <div
                  className="px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
                  style={{
                    background: "rgba(255,68,68,.12)",
                    border: "1px solid rgba(255,68,68,.25)",
                    color: "#ff4444",
                    boxShadow: "0 0 15px rgba(255,68,68,.2)",
                  }}
                >
                  <HeartIcon size={12} className="inline mr-1" /> {v}
                </div>
                <div
                  className="flex items-center gap-1 px-2 py-1 rounded-full"
                  style={{
                    background: "rgba(255,215,0,.1)",
                    border: "1px solid rgba(255,215,0,.2)",
                  }}
                >
                  <ZapIcon size={10} className="text-yellow-400" />
                  {[1, 2, 3, 4, 5].map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        playClick();
                        set$(t);
                      }}
                      className="w-5 h-5 rounded text-[9px] font-bold transition-all hover:scale-110"
                      style={{
                        background:
                          t <= $ ? "linear-gradient(135deg, #ffd700, #ff00aa)" : "rgba(255,255,255,.1)",
                        color: t <= $ ? "#000" : "rgba(255,255,255,.5)",
                        border: `1px solid ${t <= $ ? "#ffd700" : "rgba(255,255,255,.2)"}`,
                        boxShadow: t <= $ ? "0 0 6px rgba(255,215,0,.5)" : "none",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {V > 0 && (
                  <div
                    className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold"
                    style={{
                      background: "rgba(255,214,0,.1)",
                      border: "1px solid rgba(255,214,0,.2)",
                      color: "#ffd600",
                      boxShadow: "0 0 10px rgba(255,214,0,.15)",
                    }}
                  >
                    <TrophyIcon size={10} /> {V}
                  </div>
                )}
              </div>
            </div>
            <div className="text-center mb-2 md:mb-4">
              <h1
                className="text-2xl md:text-4xl font-black mb-2 relative inline-block"
                style={{
                  background: "linear-gradient(135deg, #ffd600, #ff00aa, #00d4ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 25px rgba(255,214,0,.4))",
                }}
              >
                <SparklesIcon
                  size={28}
                  className="inline mr-2 mb-1 animate-pulse"
                  style={{
                    filter: "drop-shadow(0 0 10px rgba(255,214,0,.6))",
                  }}
                />{" "}
                Word Pac-Man
              </h1>
            </div>
            <div className="text-center mb-3 md:mb-4">
              <div
                className="inline-flex items-center gap-3 md:gap-4 px-5 md:px-8 py-3 md:py-4 rounded-2xl transition-all"
                style={{
                  background: "linear-gradient(180deg, rgba(14,22,64,.85), rgba(5,8,27,.7))",
                  border: "1px solid rgba(255,214,0,.35)",
                  boxShadow:
                    "0 0 40px rgba(255,214,0,.25), 0 0 80px rgba(255,214,0,.1), inset 0 1px 0 rgba(255,255,255,.05)",
                  backdropFilter: "blur(14px)",
                  transform: "translateZ(20px) rotateX(5deg)",
                  perspective: "800px",
                }}
              >
                <div>
                  <div
                    className="text-xs font-bold uppercase tracking-wider mb-1"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Español / 西班牙语
                  </div>
                  <div className="flex gap-1 justify-center">
                    {fe.split("").map((t, c) => (
                      <span
                        key={c}
                        className="inline-block w-7 h-8 md:w-9 md:h-11 flex items-center justify-center text-sm md:text-lg font-black rounded-lg transition-all duration-300"
                        style={{
                          background:
                            c < R
                              ? "linear-gradient(135deg, rgba(57,255,20,.25), rgba(0,212,160,.25))"
                              : c === R
                                ? "linear-gradient(135deg, rgba(255,214,0,.2), rgba(255,0,170,.1))"
                                : "rgba(255,255,255,.04)",
                          border:
                            c < R
                              ? "1px solid rgba(57,255,20,.5)"
                              : c === R
                                ? "1px solid rgba(255,214,0,.6)"
                                : "1px solid rgba(255,255,255,.08)",
                          color: c < R ? "#39ff14" : c === R ? "#ffd600" : "rgba(255,255,255,.2)",
                          boxShadow:
                            c === R
                              ? "0 0 20px rgba(255,214,0,.4), 0 0 40px rgba(255,214,0,.15), inset 0 0 10px rgba(255,214,0,.05)"
                              : c < R
                                ? "0 0 12px rgba(57,255,20,.3), 0 0 25px rgba(57,255,20,.1)"
                                : "none",
                          textShadow:
                            c === R
                              ? "0 0 15px rgba(255,214,0,1), 0 0 30px rgba(255,214,0,.6)"
                              : c < R
                                ? "0 0 12px rgba(57,255,20,.7)"
                                : "none",
                          animation: c === R ? "letterPulse 0.8s ease-in-out infinite alternate" : "none",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className="w-px h-12"
                  style={{
                    background: "linear-gradient(180deg, transparent, rgba(255,255,255,.2), transparent)",
                  }}
                />
                <div>
                  <div
                    className="text-xs font-bold uppercase tracking-wider mb-1"
                    style={{
                      color: "rgba(207,216,255,.5)",
                    }}
                  >
                    Chino / 中文
                  </div>
                  <div
                    className="text-2xl md:text-3xl font-black"
                    style={{
                      color: "#ff69b4",
                      textShadow: "0 0 20px rgba(255,105,180,.5), 0 0 40px rgba(255,105,180,.3)",
                    }}
                  >
                    {ut}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1 mb-2 md:mb-3">
              {Array.from({
                length,
              }).map((t, c) => (
                <HeartIcon
                  key={c}
                  size={20}
                  className={c < v ? "animate-pulse" : ""}
                  style={{
                    color: c < v ? "#ff4444" : "rgba(255,255,255,.15)",
                    fill: c < v ? "#ff4444" : "transparent",
                    transition: "all 0.3s",
                    filter: c < v ? "drop-shadow(0 0 8px rgba(255,68,68,.5))" : "none",
                  }}
                />
              ))}
            </div>
            {zt && (
              <div className="text-center mb-2">
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black animate-pulse"
                  style={{
                    background: "rgba(59,130,246,.15)",
                    border: "1px solid rgba(59,130,246,.3)",
                    color: "#3b82f6",
                    boxShadow: "0 0 15px rgba(59,130,246,.3)",
                  }}
                >
                  <StarIcon size={12} /> ¡Modo Poder! / 强力模式！ {It}s
                </div>
              </div>
            )}
            {ct > 1 && (
              <div className="text-center mb-2">
                <div
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black animate-pulse-glow"
                  style={{
                    background: "rgba(255,0,170,.12)",
                    border: "1px solid rgba(255,0,170,.3)",
                    color: "#ff00aa",
                    boxShadow: "0 0 15px rgba(255,0,170,.2)",
                  }}
                >
                  <ZapIcon size={12} /> Combo x{ct}!
                </div>
              </div>
            )}
            <div
              className="flex-1 flex items-center justify-center mb-2 md:mb-3 relative"
              style={{
                perspective: "1200px",
                perspectiveOrigin: "50% 40%",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="w-full max-w-md rounded-3xl opacity-60 blur-3xl animate-pulse-slow"
                  style={{
                    background:
                      "radial-gradient(ellipse, rgba(255,214,0,.2), rgba(0,212,255,.15), transparent 70%)",
                    aspectRatio: "1/1",
                  }}
                />
              </div>
              <div
                ref={zRef}
                className="relative rounded-2xl overflow-hidden transition-all duration-500"
                style={{
                  background: "linear-gradient(180deg, rgba(14,22,64,.6), rgba(5,8,27,.5))",
                  border: nt ? "2px solid rgba(57,255,20,.9)" : "1px solid rgba(0,212,255,.5)",
                  boxShadow: nt
                    ? "0 0 120px rgba(57,255,20,1), 0 0 200px rgba(0,212,255,.8), 0 0 280px rgba(255,214,0,.6), 0 20px 60px rgba(0,0,0,.5), inset 0 0 80px rgba(57,255,20,.2)"
                    : "0 0 60px rgba(0,212,255,.4), 0 0 120px rgba(0,212,255,.2), 0 0 180px rgba(255,214,0,.1), 0 20px 60px rgba(0,0,0,.5), inset 0 0 50px rgba(0,212,255,.08)",
                  transform: "rotateX(5deg)",
                  transformStyle: "preserve-3d",
                  touchAction: "manipulation",
                }}
              >
                <div
                  className="grid gap-[1px] md:gap-[2px] p-1.5 md:p-2 relative z-10"
                  style={{
                    gridTemplateColumns: `repeat(${String(B)}, 1fr)`,
                    gridTemplateRows: `repeat(${String(K)}, 1fr)`,
                  }}
                >
                  {Bt}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center mb-4 md:hidden">
              <div
                className="relative"
                style={{
                  width: 160,
                  height: 160,
                }}
              >
                <button
                  onTouchStart={(t) => {
                    t.preventDefault();
                    Y("up");
                  }}
                  onClick={() => Y("up")}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 rounded-xl flex items-center justify-center transition-all active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,214,0,.2), rgba(255,214,0,.1))",
                    border: "1px solid rgba(255,214,0,.3)",
                    boxShadow: "0 0 15px rgba(255,214,0,.2), inset 0 0 10px rgba(255,214,0,.05)",
                    minWidth: 44,
                    minHeight: 44,
                  }}
                >
                  <ArrowUpIcon
                    size={24}
                    style={{
                      color: "#ffd600",
                    }}
                  />
                </button>
                <button
                  onTouchStart={(t) => {
                    t.preventDefault();
                    Y("left");
                  }}
                  onClick={() => Y("left")}
                  className="absolute top-1/2 left-0 -translate-y-1/2 w-14 h-14 rounded-xl flex items-center justify-center transition-all active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,214,0,.2), rgba(255,214,0,.1))",
                    border: "1px solid rgba(255,214,0,.3)",
                    boxShadow: "0 0 15px rgba(255,214,0,.2), inset 0 0 10px rgba(255,214,0,.05)",
                    minWidth: 44,
                    minHeight: 44,
                  }}
                >
                  <ArrowLeftIcon
                    size={24}
                    style={{
                      color: "#ffd600",
                    }}
                  />
                </button>
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(255,214,0,.08)",
                    border: "1px solid rgba(255,214,0,.15)",
                  }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: "#ffd600",
                      boxShadow: "0 0 10px #ffd600",
                    }}
                  />
                </div>
                <button
                  onTouchStart={(t) => {
                    t.preventDefault();
                    Y("right");
                  }}
                  onClick={() => Y("right")}
                  className="absolute top-1/2 right-0 -translate-y-1/2 w-14 h-14 rounded-xl flex items-center justify-center transition-all active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,214,0,.2), rgba(255,214,0,.1))",
                    border: "1px solid rgba(255,214,0,.3)",
                    boxShadow: "0 0 15px rgba(255,214,0,.2), inset 0 0 10px rgba(255,214,0,.05)",
                    minWidth: 44,
                    minHeight: 44,
                  }}
                >
                  <ArrowRightIcon
                    size={24}
                    style={{
                      color: "#ffd600",
                    }}
                  />
                </button>
                <button
                  onTouchStart={(t) => {
                    t.preventDefault();
                    Y("down");
                  }}
                  onClick={() => Y("down")}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-14 rounded-xl flex items-center justify-center transition-all active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,214,0,.2), rgba(255,214,0,.1))",
                    border: "1px solid rgba(255,214,0,.3)",
                    boxShadow: "0 0 15px rgba(255,214,0,.2), inset 0 0 10px rgba(255,214,0,.05)",
                    minWidth: 44,
                    minHeight: 44,
                  }}
                >
                  <ArrowDownIcon
                    size={24}
                    style={{
                      color: "#ffd600",
                    }}
                  />
                </button>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center gap-4 mb-4">
              <div className="text-xs font-medium text-white/30">
                Usa las flechas del teclado / 使用键盘方向键
              </div>
              <div className="flex gap-1">
                <div
                  className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
                  style={{
                    background: "rgba(255,214,0,.1)",
                    border: "1px solid rgba(255,214,0,.2)",
                    color: "#ffd600",
                  }}
                >
                  W
                </div>
                <div
                  className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
                  style={{
                    background: "rgba(255,214,0,.1)",
                    border: "1px solid rgba(255,214,0,.2)",
                    color: "#ffd600",
                  }}
                >
                  A
                </div>
                <div
                  className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
                  style={{
                    background: "rgba(255,214,0,.1)",
                    border: "1px solid rgba(255,214,0,.2)",
                    color: "#ffd600",
                  }}
                >
                  S
                </div>
                <div
                  className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold"
                  style={{
                    background: "rgba(255,214,0,.1)",
                    border: "1px solid rgba(255,214,0,.2)",
                    color: "#ffd600",
                  }}
                >
                  D
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
              <div
                className="px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5"
                style={{
                  background: "rgba(0,212,255,.1)",
                  border: "1px solid rgba(0,212,255,.25)",
                  color: "#00d4ff",
                  boxShadow: "0 0 10px rgba(0,212,255,.15)",
                }}
              >
                <SparklesIcon size={12} /> Nivel {Lt}
              </div>
              <div
                className="px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5"
                style={{
                  background: "rgba(255,214,0,.1)",
                  border: "1px solid rgba(255,214,0,.25)",
                  color: "#ffd600",
                  boxShadow: "0 0 10px rgba(255,214,0,.15)",
                }}
              >
                <StarIcon size={12} /> Palabras {Mt}
              </div>
              <div
                className="px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5"
                style={{
                  background: "rgba(57,255,20,.1)",
                  border: "1px solid rgba(57,255,20,.25)",
                  color: "#39ff14",
                  boxShadow: "0 0 10px rgba(57,255,20,.15)",
                }}
              >
                <GhostIcon size={12} /> Fantasmas {lt}
              </div>
              {dt > 1 && (
                <div
                  className="px-3 py-1 rounded-full text-xs font-black flex items-center gap-1"
                  style={{
                    background: "rgba(255,0,170,.1)",
                    border: "1px solid rgba(255,0,170,.25)",
                    color: "#ff00aa",
                    boxShadow: "0 0 10px rgba(255,0,170,.15)",
                  }}
                >
                  <ZapIcon size={12} /> Racha {dt}
                </div>
              )}
            </div>
          </div>
          <style>{`
        @keyframes pacmanWobble {
          0% { transform: translateZ(10px) rotate(-2deg) scale(1); }
          100% { transform: translateZ(10px) rotate(2deg) scale(1.05); }
        }
        @keyframes deathShrink {
          0% { transform: translateZ(10px) scale(1) rotate(0deg); opacity: 1; }
          50% { transform: translateZ(10px) scale(0.5) rotate(180deg); opacity: 0.7; }
          100% { transform: translateZ(10px) scale(0) rotate(360deg); opacity: 0; }
        }
        @keyframes ghostFloat {
          0% { transform: translateY(0) translateZ(5px); }
          100% { transform: translateY(-3px) translateZ(5px); }
        }
        @keyframes letterFloat {
          0% { transform: translateZ(5px) translateY(0); }
          100% { transform: translateZ(5px) translateY(-4px); }
        }
        @keyframes letterFloatNext {
          0% { transform: translateZ(8px) translateY(0) scale(1); filter: brightness(1); }
          100% { transform: translateZ(8px) translateY(-6px) scale(1.15); filter: brightness(1.3); }
        }
        @keyframes letterPulse {
          0% { box-shadow: 0 0 10px rgba(255,214,0,.4), 0 0 20px rgba(255,214,0,.2); }
          100% { box-shadow: 0 0 25px rgba(255,214,0,.8), 0 0 50px rgba(255,214,0,.4), 0 0 80px rgba(255,214,0,.2); }
        }
        @keyframes powerPelletPulse {
          0% { transform: scale(1); box-shadow: 0 0 10px #ffd700, 0 0 20px #ffd70080; }
          100% { transform: scale(1.3); box-shadow: 0 0 15px #ffd700, 0 0 30px #ffd700, 0 0 60px #ffd70080; }
        }
        @keyframes popIn {
          0% { transform: scale(0.85) translateY(20px) rotateX(5deg); opacity: 0; }
          100% { transform: scale(1) translateY(0) rotateX(3deg); opacity: 1; }
        }
        @keyframes neonPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(32,128,255,.3), 0 0 40px rgba(255,0,170,.1); }
          50% { box-shadow: 0 0 40px rgba(32,128,255,.5), 0 0 80px rgba(255,0,170,.25); }
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
        .animate-shake { animation: shake 0.4s ease-in-out; }
        @keyframes pulse-glow {
          0%, 100% { filter: drop-shadow(0 0 5px currentColor); }
          50% { filter: drop-shadow(0 0 15px currentColor) drop-shadow(0 0 30px currentColor); }
        }
        .animate-pulse-glow { animation: pulse-glow 1.5s ease-in-out infinite; }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.05); }
        }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        @keyframes score-float-3d {
          0% { transform: translateZ(20px) translateY(0); }
          100% { transform: translateZ(20px) translateY(-4px); }
        }
        .animate-score-float-3d { animation: score-float-3d 3s ease-in-out infinite alternate; }
      `}</style>
        </StarfieldBackground>
      );
  }
}
export { RrComponent as default };
