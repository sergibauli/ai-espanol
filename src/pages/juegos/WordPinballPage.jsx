import {
  TrophyIcon,
  ZapIcon,
  StarIcon,
  HeartIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  LayersIcon,
  RotateCcwIcon,
  ChevronLeftIcon,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { StarfieldBackground } from "../../components/fx/StarfieldBackground.jsx";
import { P } from "../../components/PostGameNav.jsx";
import { g, a as a_1 } from "../../lib/juegos-utils.js";
import { useSound } from "../../lib/sound.jsx";
const width = 560;
const height = 620;
const r = 9;
const r_2 = 26;
const Q = 82;
const st = 0.26;
const Be = 0.993;
const F = 0.72;
const ze = 0.92;
const rt = 7;
const at = 9;
const V = 3;
const j = "#00d4ff";
const I = "#ff00aa";
const E = "#ffd700";
const Z = "#10b981";
const K = "#ef4444";
const ot = "#f97316";
function u(p, f) {
  return Math.random() * (f - p) + p;
}
function We(p, f, e) {
  return Math.max(f, Math.min(e, p));
}
function me(p, f, e, C) {
  const g = p - e;
  const m = f - C;
  return Math.sqrt(g * g + m * m);
}
function Xe(angle) {
  return (angle * Math.PI) / 180;
}
function lt({ length }) {
  const e = [];
  const C = 70;
  const g = 70;
  const m = width - C * 2;
  const S = height * 0.5 - g;
  const T = Math.min(length, 4);
  const P = Math.ceil(length / T);
  const o = m / T;
  const h = S / P;
  for (let N = 0; N < length; N++) {
    const X = N % T;
    const A = Math.floor(N / T);
    const W = u(-22, 22);
    const J = u(-18, 18);
    const D = C + X * o + o / 2 + W;
    const ce = g + A * h + h / 2 + J;
    e.push({
      x: We(D, C + r_2, width - C - r_2),
      y: We(ce, g + r_2, height * 0.5),
    });
  }
  return e;
}
function Be1Component() {
  return (
    <style>{`
      @keyframes bumperPulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.08); }
      }
      @keyframes bumperHit {
        0% { transform: translate(-50%, -50%) scale(1.3); }
        100% { transform: translate(-50%, -50%) scale(1); }
      }
      @keyframes ballGlow {
        0%, 100% { box-shadow: 0 0 10px rgba(0,212,255,0.6), 0 0 20px rgba(0,212,255,0.3), inset 0 0 6px rgba(255,255,255,0.5); }
        50% { box-shadow: 0 0 16px rgba(0,212,255,0.9), 0 0 32px rgba(0,212,255,0.5), inset 0 0 10px rgba(255,255,255,0.7); }
      }
      @keyframes flipperGlow {
        0%, 100% { box-shadow: 0 0 8px rgba(0,212,255,0.4); }
        50% { box-shadow: 0 0 16px rgba(0,212,255,0.7); }
      }
      @keyframes floatPanel {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
      }
      @keyframes neonPulse {
        0%, 100% { opacity: 0.7; }
        50% { opacity: 1; }
      }
      @keyframes confettiFall {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(120px) rotate(720deg); opacity: 0; }
      }
      @keyframes scorePop {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }
      @keyframes shakeWrong {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-6px); }
        40% { transform: translateX(6px); }
        60% { transform: translateX(-3px); }
        80% { transform: translateX(3px); }
      }
      @keyframes trailFade {
        0% { opacity: 0.6; transform: scale(1); }
        100% { opacity: 0; transform: scale(0.3); }
      }
      .pinball-table {
        perspective: 900px;
        transform-style: preserve-3d;
      }
      .pinball-inner {
        transform: rotateX(8deg);
        transform-style: preserve-3d;
      }
      .flipper-btn-press:active {
        transform: scale(0.92) !important;
        box-shadow: 0 0 30px rgba(0,212,255,0.6) !important;
      }
    `}</style>
  );
}
function nt(p, f) {
  if (!p || p.width <= 0 || p.height <= 0 || !isFinite(p.width) || !isFinite(p.height)) {
    return;
  }
  const e = p.getContext("2d", {
    willReadFrequently: false,
  });
  if (!e) {
    return;
  }
  const C = window.devicePixelRatio || 1;
  e.clearRect(0, 0, p.width, p.height);
  e.save();
  e.scale(C, C);
  const g = Date.now();
  e.strokeStyle = "rgba(0,212,255,0.15)";
  e.lineWidth = 1;
  for (let o = 0; o <= width; o += 40) {
    e.beginPath();
    e.moveTo(o, 0);
    e.lineTo(o, height);
    e.stroke();
  }
  for (let o = 0; o <= height; o += 40) {
    e.beginPath();
    e.moveTo(0, o);
    e.lineTo(width, o);
    e.stroke();
  }
  e.lineWidth = 2;
  e.globalAlpha = 0.6;
  e.strokeStyle = j;
  e.beginPath();
  e.moveTo(0, 14);
  e.lineTo(0, 0);
  e.lineTo(14, 0);
  e.stroke();
  e.beginPath();
  e.moveTo(width - 14, 0);
  e.lineTo(width, 0);
  e.lineTo(width, 14);
  e.stroke();
  e.strokeStyle = I;
  e.beginPath();
  e.moveTo(0, height - 14);
  e.lineTo(0, height);
  e.lineTo(14, height);
  e.stroke();
  e.beginPath();
  e.moveTo(width - 14, height);
  e.lineTo(width, height);
  e.lineTo(width, height - 14);
  e.stroke();
  e.globalAlpha = 1;
  e.strokeStyle = "rgba(0,212,255,0.15)";
  e.lineWidth = 2;
  e.beginPath();
  e.moveTo(0, height - 120);
  e.lineTo(20, height - 120);
  e.arcTo(80, height - 120, 80, height - 60, 60);
  e.lineTo(80, height);
  e.stroke();
  e.beginPath();
  e.moveTo(width, height - 120);
  e.lineTo(width - 20, height - 120);
  e.arcTo(width - 80, height - 120, width - 80, height - 60, 60);
  e.lineTo(width - 80, height);
  e.stroke();
  const m = 1 + Math.sin(g / 1000) * 0.04;
  for (const o of f.bumpers) {
    const h = o.idx === f.collectedCount;
    const N = o.collected ? 0.8 : o.flash > 0 ? 1.25 : m;
    const X = o.collected ? 0.25 : 1;
    e.save();
    e.globalAlpha = X;
    e.translate(o.x, o.y);
    e.scale(N, N);
    if (![-o.r * 0.3, -o.r * 0.3, 0, 0, 0, o.r].every((W) => typeof W === "number" && isFinite(W))) {
      continue;
    }
    const A = e.createRadialGradient(-o.r * 0.3, -o.r * 0.3, 0, 0, 0, o.r);
    if (o.collected) {
      A.addColorStop(0, "rgba(16,185,129,0.15)");
      A.addColorStop(1, "rgba(16,185,129,0.05)");
    } else {
      A.addColorStop(0, "rgba(0,212,255,0.2)");
      A.addColorStop(1, "rgba(0,212,255,0.05)");
    }
    e.fillStyle = A;
    e.beginPath();
    e.arc(0, 0, o.r, 0, Math.PI * 2);
    e.fill();
    e.lineWidth = 2;
    if (o.collected) {
      e.strokeStyle = "rgba(16,185,129,0.3)";
    } else if (h) {
      e.strokeStyle = E;
      e.shadowColor = E;
      e.shadowBlur = 16;
    } else {
      e.strokeStyle = j;
      e.shadowColor = j;
      e.shadowBlur = 8;
    }
    e.stroke();
    e.shadowBlur = 0;
    e.fillStyle = o.collected ? "rgba(16,185,129,0.4)" : h ? E : "rgba(255,255,255,0.9)";
    e.font = "bold 18px sans-serif";
    e.textAlign = "center";
    e.textBaseline = "middle";
    if (h && !o.collected) {
      e.shadowColor = E;
      e.shadowBlur = 8;
    } else if (!o.collected) {
      e.shadowColor = "rgba(0,212,255,0.5)";
      e.shadowBlur = 4;
    }
    e.fillText(o.letter.toUpperCase(), 0, 0);
    e.shadowBlur = 0;
    if (o.flash > 0) {
      e.shadowColor = o.flashColor;
      e.shadowBlur = 20 + o.flash * 2;
      e.strokeStyle = o.flashColor;
      e.lineWidth = 3;
      e.beginPath();
      e.arc(0, 0, o.r + 2, 0, Math.PI * 2);
      e.stroke();
      e.shadowBlur = 0;
    }
    e.restore();
  }
  for (const o of [f.leftFlipper, f.rightFlipper]) {
    e.save();
    e.translate(o.pivotX, o.pivotY);
    e.rotate(Xe(o.angle));
    e.shadowColor = j;
    e.shadowBlur = 10;
    const h = e.createLinearGradient(0, -5, Q, 5);
    if (o.side === "left") {
      h.addColorStop(0, "rgba(0,212,255,0.6)");
      h.addColorStop(1, "rgba(0,212,255,0.3)");
    } else {
      h.addColorStop(0, "rgba(0,212,255,0.3)");
      h.addColorStop(1, "rgba(0,212,255,0.6)");
    }
    e.fillStyle = h;
    e.strokeStyle = "rgba(0,212,255,0.5)";
    e.lineWidth = 1;
    e.beginPath();
    e.moveTo(0, -5);
    e.lineTo(Q, -5);
    e.arc(Q, 0, 5, -Math.PI / 2, Math.PI / 2);
    e.lineTo(0, 5);
    e.arc(0, 0, 5, Math.PI / 2, -Math.PI / 2);
    e.closePath();
    e.fill();
    e.stroke();
    e.shadowBlur = 0;
    e.restore();
    e.fillStyle = j;
    e.shadowColor = j;
    e.shadowBlur = 6;
    e.beginPath();
    e.arc(o.pivotX, o.pivotY, 4, 0, Math.PI * 2);
    e.fill();
    e.shadowBlur = 0;
  }
  const f_ball = f.ball;
  const T = 0.6 + Math.sin(g / 500) * 0.3;
  e.save();
  e.translate(f_ball.x, f_ball.y);
  e.shadowColor = j;
  e.shadowBlur = 10 + T * 6;
  const P = e.createRadialGradient(-f_ball.r * 0.35, -f_ball.r * 0.35, 0, 0, 0, f_ball.r);
  P.addColorStop(0, "#ffffff");
  P.addColorStop(0.4, "#00d4ff");
  P.addColorStop(1, "#0066aa");
  e.fillStyle = P;
  e.beginPath();
  e.arc(0, 0, f_ball.r, 0, Math.PI * 2);
  e.fill();
  e.shadowBlur = 0;
  e.restore();
  for (const o of f.particles) {
    const h = o.life / o.maxLife;
    const N = o.size * h;
    e.save();
    e.globalAlpha = h;
    e.fillStyle = o.color;
    e.shadowColor = o.color;
    e.shadowBlur = N * 2;
    e.beginPath();
    e.arc(o.x, o.y, N / 2, 0, Math.PI * 2);
    e.fill();
    e.restore();
  }
  e.restore();
}
function UtComponent() {
  const { playCorrect, playWrong, playWin, playLose, playClick } = useSound();
  const [m, setM] = React.useState("menu");
  const [T, setT] = React.useState(undefined);
  const [o, setO] = React.useState("#00d4ff");
  const [N, setN] = React.useState(0);
  const [A, setA] = React.useState(V);
  const [J, setJ] = React.useState(0);
  const [ce, setCe] = React.useState(0);
  const [$, set$] = React.useState(null);
  const [B, setB] = React.useState(0);
  const [Ye, setYe] = React.useState(false);
  const [xe, setXe] = React.useState({
    score: 0,
    words: 0,
    streak: 0,
  });
  const _eRef = React.useRef(null);
  const peRef = React.useRef(null);
  const feRef = React.useRef(null);
  const teRef = React.useRef(false);
  const current = React.useRef({
    playing: false,
    ball: {
      x: width / 2,
      y: height - 60,
      vx: 0,
      vy: 0,
      r,
    },
    bumpers: [],
    leftFlipper: {
      pivotX: 100,
      pivotY: 560,
      angle: 40,
      targetAngle: 40,
      restAngle: 40,
      activeAngle: -40,
      side: "left",
      prevAngle: 40,
    },
    rightFlipper: {
      pivotX: 460,
      pivotY: 560,
      angle: 140,
      targetAngle: 140,
      restAngle: 140,
      activeAngle: 220,
      side: "right",
      prevAngle: 140,
    },
    particles: [],
    score: 0,
    lives: V,
    streak: 0,
    wordsCompleted: 0,
    currentWord: null,
    collectedCount: 0,
    startTime: 0,
    wordTimes: [],
    rafId: 0,
    comboMult: 1,
    awaitingReset: false,
    wordIndex: 0,
    vocabList: [],
  }).current;
  const Ue = React.useMemo(() => g(), []);
  const se = React.useCallback(
    (t) => {
      const l = t.espanol.toLowerCase().trim();
      const n = lt(l);
      current.bumpers = l.split("").map((letter, idx) => ({
        idx,
        letter,
        x: n[idx].x,
        y: n[idx].y,
        r: r_2,
        collected: false,
        flash: 0,
        flashColor: "",
      }));
      current.currentWord = t;
      current.collectedCount = 0;
      current.startTime = Date.now();
      current.comboMult = 1 + Math.floor(current.streak / 3) * 0.5;
      set$(t);
      setB(0);
    },
    [current],
  );
  const G = React.useCallback(() => {
    current.ball.x = width / 2;
    current.ball.y = height - 50;
    current.ball.vx = u(-2.5, 2.5);
    current.ball.vy = u(-12, -9);
    current.awaitingReset = false;
  }, [current]);
  const re = React.useCallback(
    (t, l, color, a) => {
      for (let i = 0; i < a; i++) {
        const w = u(0, Math.PI * 2);
        const v = u(2, 7);
        current.particles.push({
          x: t,
          y: l,
          vx: Math.cos(w) * v,
          vy: Math.sin(w) * v - 2,
          life: u(20, 40),
          maxLife: 40,
          color,
          size: u(3, 7),
        });
      }
    },
    [current],
  );
  const ye = React.useCallback(
    (t, l) => {
      const n = [j, I, E, Z, ot, K];
      for (let a = 0; a < 50; a++) {
        const i = u(0, Math.PI * 2);
        const w = u(3, 10);
        current.particles.push({
          x: t,
          y: l,
          vx: Math.cos(i) * w,
          vy: Math.sin(i) * w - 4,
          life: u(30, 60),
          maxLife: 60,
          color: n[Math.floor(Math.random() * n.length)],
          size: u(4, 10),
        });
      }
    },
    [current],
  );
  const ae = React.useCallback(
    (t) => {
      const l = Math.round(t * current.comboMult);
      current.score += l;
      setN(current.score);
    },
    [current],
  );
  const we = React.useCallback(() => {
    const t = Date.now() - current.startTime;
    current.wordTimes.push(t);
    current.wordsCompleted++;
    current.streak++;
    current.comboMult = 1 + Math.floor(current.streak / 3) * 0.5;
    const l = Math.max(0, Math.round((10000 - t) / 20));
    ae(500 + l);
    setCe(current.wordsCompleted);
    setJ(current.streak);
    playWin();
    ye(width / 2, height / 2);
    setTimeout(() => {
      const n = current.wordIndex + 1;
      if (n >= current.vocabList.length) {
        for (let a = current.vocabList.length - 1; a > 0; a--) {
          const i = Math.floor(Math.random() * (a + 1));
          [current.vocabList[a], current.vocabList[i]] = [current.vocabList[i], current.vocabList[a]];
        }
        current.wordIndex = 0;
      } else {
        current.wordIndex = n;
      }
      se(current.vocabList[current.wordIndex]);
      G();
    }, 1200);
  }, [current, se, G, ae, playWin, ye]);
  const ke = React.useCallback(() => {
    if (!current.awaitingReset) {
      current.awaitingReset = true;
      current.lives--;
      current.streak = 0;
      current.comboMult = 1;
      setA(current.lives);
      setJ(0);
      playWrong();
      setYe(true);
      setTimeout(() => setYe(false), 400);
      re(current.ball.x, height - 10, K, 15);
      if (current.lives <= 0) {
        current.playing = false;
        setXe({
          score: current.score,
          words: current.wordsCompleted,
          streak: current.streak,
        });
        playLose();
        setTimeout(() => setM("gameover"), 800);
        return;
      }
      setTimeout(() => {
        G();
      }, 800);
    }
  }, [current, playWrong, playLose, G, re]);
  const je = React.useCallback((t, l, n, a, i, w, v, y) => {
    const b = t - a;
    const z = l - i;
    const R = Math.sqrt(b * b + z * z);
    if (R < n + w) {
      const _ = b / R;
      const U = z / R;
      const Y = v * _ + y * U;
      const le = v - 2 * Y * _;
      const ne = y - 2 * Y * U;
      const q = n + w - R + 1;
      return {
        hit: true,
        rvx: le * ze,
        rvy: ne * ze,
        pushX: _ * q,
        pushY: U * q,
      };
    }
    return {
      hit: false,
      rvx: v,
      rvy: y,
      pushX: 0,
      pushY: 0,
    };
  }, []);
  const Ce = React.useCallback((t, l, n, a, i, w, v, y, b) => {
    const z = w - a;
    const R = v - i;
    const _ = t - a;
    const U = l - i;
    const Y = _ * z + U * R;
    if (Y <= 0) {
      const k = me(t, l, a, i);
      if (k < n) {
        const M = (t - a) / k;
        const L = (l - i) / k;
        const O = y * M + b * L;
        return {
          hit: true,
          rvx: (y - 2 * O * M) * F,
          rvy: (b - 2 * O * L) * F,
          pushX: M * (n - k + 2),
          pushY: L * (n - k + 2),
        };
      }
      return {
        hit: false,
        rvx: y,
        rvy: b,
        pushX: 0,
        pushY: 0,
      };
    }
    const le = z * z + R * R;
    if (le <= Y) {
      const k = me(t, l, w, v);
      if (k < n) {
        const M = (t - w) / k;
        const L = (l - v) / k;
        const O = y * M + b * L;
        return {
          hit: true,
          rvx: (y - 2 * O * M) * F,
          rvy: (b - 2 * O * L) * F,
          pushX: M * (n - k + 2),
          pushY: L * (n - k + 2),
        };
      }
      return {
        hit: false,
        rvx: y,
        rvy: b,
        pushX: 0,
        pushY: 0,
      };
    }
    const ne = Y / le;
    const q = a + ne * z;
    const Pe = i + ne * R;
    const H = me(t, l, q, Pe);
    if (H < n) {
      const k = (t - q) / H;
      const M = (l - Pe) / H;
      const L = y * k + b * M;
      return {
        hit: true,
        rvx: (y - 2 * L * k) * F,
        rvy: (b - 2 * L * M) * F,
        pushX: k * (n - H + 2),
        pushY: M * (n - H + 2),
      };
    }
    return {
      hit: false,
      rvx: y,
      rvy: b,
      pushX: 0,
      pushY: 0,
    };
  }, []);
  const Se = React.useCallback((t) => {
    const l = Xe(t.angle);
    return {
      x: t.pivotX + Math.cos(l) * Q,
      y: t.pivotY + Math.sin(l) * Q,
    };
  }, []);
  const oe = React.useCallback(() => {
    if (document.hidden) {
      current.rafId = requestAnimationFrame(oe);
      return;
    }
    if (!current.playing) {
      return;
    }
    const current_ball = current.ball;
    current_ball.vy += st;
    current_ball.vx *= Be;
    current_ball.vy *= Be;
    current_ball.x += current_ball.vx;
    current_ball.y += current_ball.vy;
    const l = Math.sqrt(current_ball.vx * current_ball.vx + current_ball.vy * current_ball.vy);
    if (l > 18) {
      current_ball.vx = (current_ball.vx / l) * 18;
      current_ball.vy = (current_ball.vy / l) * 18;
    }
    if (current_ball.x < current_ball.r) {
      current_ball.x = current_ball.r;
      current_ball.vx = -current_ball.vx * F;
    }
    if (current_ball.x > width - current_ball.r) {
      current_ball.x = width - current_ball.r;
      current_ball.vx = -current_ball.vx * F;
    }
    if (current_ball.y < current_ball.r) {
      current_ball.y = current_ball.r;
      current_ball.vy = -current_ball.vy * F;
    }
    if (current_ball.y > height + current_ball.r * 3 && (ke(), !current.playing)) {
      return;
    }
    const n = [current.leftFlipper, current.rightFlipper];
    for (const a of n) {
      a.prevAngle = a.angle;
      const i = a.targetAngle - a.angle;
      if (Math.abs(i) > 0.5) {
        a.angle += Math.sign(i) * Math.min(Math.abs(i), rt);
      } else {
        a.angle = a.targetAngle;
      }
      const w = Se(a);
      const v = Ce(
        current_ball.x,
        current_ball.y,
        current_ball.r,
        a.pivotX,
        a.pivotY,
        w.x,
        w.y,
        current_ball.vx,
        current_ball.vy,
      );
      if (v.hit) {
        current_ball.vx = v.rvx;
        current_ball.vy = v.rvy;
        current_ball.x += v.pushX;
        current_ball.y += v.pushY;
        const y = Math.abs(a.angle - a.prevAngle);
        if (y > 1) {
          const b = at + y * 0.5;
          current_ball.vy -= b * 0.8;
          if (a.side === "left") {
            current_ball.vx += b * 0.3;
          } else {
            current_ball.vx -= b * 0.3;
          }
        }
      }
    }
    for (const a of current.bumpers) {
      if (a.collected) {
        continue;
      }
      const i = je(
        current_ball.x,
        current_ball.y,
        current_ball.r,
        a.x,
        a.y,
        a.r,
        current_ball.vx,
        current_ball.vy,
      );
      if (i.hit) {
        current_ball.vx = i.rvx;
        current_ball.vy = i.rvy;
        current_ball.x += i.pushX;
        current_ball.y += i.pushY;
        if (a.idx === current.collectedCount) {
          a.collected = true;
          a.flash = 15;
          a.flashColor = Z;
          current.collectedCount++;
          setB(current.collectedCount);
          ae(100);
          playCorrect();
          re(a.x, a.y, Z, 12);
          if (current.collectedCount >= current.bumpers.length) {
            we();
            current.rafId = requestAnimationFrame(oe);
            return;
          }
        } else {
          a.flash = 10;
          a.flashColor = K;
          playWrong();
          setYe(true);
          setTimeout(() => setYe(false), 300);
        }
      }
    }
    for (let a = current.particles.length - 1; a >= 0; a--) {
      const i = current.particles[a];
      i.x += i.vx;
      i.y += i.vy;
      i.vy += 0.15;
      i.life--;
      if (i.life <= 0) {
        current.particles.splice(a, 1);
      }
    }
    for (const a of current.bumpers) {
      if (a.flash > 0) {
        a.flash--;
      }
    }
    if (l > 2 && Math.random() > 0.5) {
      current.particles.push({
        x: current_ball.x + u(-2, 2),
        y: current_ball.y + u(-2, 2),
        vx: u(-0.5, 0.5),
        vy: u(-0.5, 0.5),
        life: u(6, 12),
        maxLife: 12,
        color: j,
        size: u(2, 5),
      });
    }
    nt(peRef.current, current);
    current.rafId = requestAnimationFrame(oe);
  }, [current, ke, Se, Ce, je, ae, playCorrect, playWrong, we, re]);
  feRef.current = oe;
  const Ne = React.useCallback((t, l) => {
    if (t) {
      setT(t);
      setO(l || "#00d4ff");
    } else {
      setT(undefined);
      setO("#00d4ff");
    }
    setM("playing");
  }, []);
  React.useEffect(() => {
    if (m !== "playing") {
      teRef.current = false;
      return;
    }
    if (teRef.current) {
      return;
    }
    teRef.current = true;
    current.playing = true;
    current.score = 0;
    current.lives = V;
    current.streak = 0;
    current.wordsCompleted = 0;
    current.wordTimes = [];
    current.particles = [];
    current.comboMult = 1;
    current.awaitingReset = false;
    current.wordIndex = 0;
    setN(0);
    setA(V);
    setJ(0);
    setCe(0);
    setB(0);
    const t = a_1(T);
    if (t.length === 0) {
      return;
    }
    for (let a = t.length - 1; a > 0; a--) {
      const i = Math.floor(Math.random() * (a + 1));
      [t[a], t[i]] = [t[i], t[a]];
    }
    current.vocabList = t;
    se(t[0]);
    G();
    const peRef_current = peRef.current;
    if (peRef_current) {
      const a = window.devicePixelRatio || 1;
      peRef_current.width = width * a;
      peRef_current.height = height * a;
      peRef_current.style.width = `${width}px`;
      peRef_current.style.height = `${height}px`;
    }
    const n = () => {
      if (feRef.current) {
        feRef.current();
      }
    };
    current.rafId = requestAnimationFrame(n);
    return () => {
      current.playing = false;
      cancelAnimationFrame(current.rafId);
    };
  }, [m, T, current, se, G]);
  React.useEffect(() => {
    if (m !== "playing") {
      return;
    }
    const t = (n) => {
      if (n.key === "ArrowLeft" || n.key === "a" || n.key === "A") {
        current.leftFlipper.targetAngle = current.leftFlipper.activeAngle;
        playClick();
      }
      if (n.key === "ArrowRight" || n.key === "d" || n.key === "D") {
        current.rightFlipper.targetAngle = current.rightFlipper.activeAngle;
        playClick();
      }
    };
    const l = (n) => {
      if (n.key === "ArrowLeft" || n.key === "a" || n.key === "A") {
        current.leftFlipper.targetAngle = current.leftFlipper.restAngle;
      }
      if (n.key === "ArrowRight" || n.key === "d" || n.key === "D") {
        current.rightFlipper.targetAngle = current.rightFlipper.restAngle;
      }
    };
    window.addEventListener("keydown", t);
    window.addEventListener("keyup", l);
    return () => {
      window.removeEventListener("keydown", t);
      window.removeEventListener("keyup", l);
    };
  }, [m, current, playClick]);
  const Me = React.useCallback(() => {
    if (m === "playing") {
      current.leftFlipper.targetAngle = current.leftFlipper.activeAngle;
      playClick();
    }
  }, [m, current, playClick]);
  const he = React.useCallback(() => {
    current.leftFlipper.targetAngle = current.leftFlipper.restAngle;
  }, [current]);
  const Ae = React.useCallback(() => {
    if (m === "playing") {
      current.rightFlipper.targetAngle = current.rightFlipper.activeAngle;
      playClick();
    }
  }, [m, current, playClick]);
  const ue = React.useCallback(() => {
    current.rightFlipper.targetAngle = current.rightFlipper.restAngle;
  }, [current]);
  const onClick = React.useCallback(() => {
    current.playing = false;
    cancelAnimationFrame(current.rafId);
    teRef.current = false;
    setM("menu");
  }, [current]);
  const Te = $ ? $.espanol.toLowerCase() : "";
  Te[B];
  switch (m) {
    case "menu":
      return (
        <StarfieldBackground>
          <Be1Component />
          <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
            <div className="mb-6">
              <Link
                to="/juegos"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
              >
                <ArrowLeftIcon size={18} />
                <span className="text-sm font-medium">Volver a juegos</span>
              </Link>
            </div>
            <div className="text-center mb-8">
              <h1
                className="text-4xl md:text-6xl font-black text-white mb-2"
                style={{
                  textShadow: "0 0 30px rgba(0,212,255,.5)",
                }}
              >
                PINBALL
              </h1>
              <p className="text-white/60 text-sm">Palabras / 词</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full">
              <button
                onClick={() => Ne()}
                className="group rounded-xl p-6 text-left transition-all hover:scale-105"
                style={{
                  background: "rgba(14,22,64,.6)",
                  border: "1px solid rgba(255,0,170,.3)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                  style={{
                    background: "linear-gradient(135deg, #ff00aa, #b829dd)",
                    boxShadow: "0 0 20px rgba(255,0,170,.3)",
                  }}
                >
                  <LayersIcon size={24} className="text-white" />
                </div>
                <h3 className="text-white font-black text-lg">Todos los módulos</h3>
                <p className="text-xs text-white/40">Mezcla todo el vocabulario</p>
              </button>
              {Ue.map((t) => (
                <button
                  key={t.id}
                  onClick={() => Ne(t.id, t.color)}
                  className="group rounded-xl p-6 text-left transition-all hover:scale-105"
                  style={{
                    background: "rgba(14,22,64,.6)",
                    border: `1px solid ${t.color}40`,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                    style={{
                      background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
                      boxShadow: `0 0 20px ${t.color}40`,
                    }}
                  >
                    <LayersIcon size={24} className="text-white" />
                  </div>
                  <h3 className="text-white font-black text-lg">{t.titulo}</h3>
                  <p className="text-xs text-white/40">{t.vocabularioCount} palabras</p>
                </button>
              ))}
            </div>
          </div>
        </StarfieldBackground>
      );
    case "gameover":
      return (
        <StarfieldBackground>
          <Be1Component />
          <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
            <div className="text-center mb-6">
              <h2
                className="text-4xl font-black text-white mb-2"
                style={{
                  textShadow: "0 0 40px rgba(255,0,170,.5)",
                }}
              >
                GAME OVER
              </h2>
              <p className="text-white/60">¡Fin del juego! / 游戏结束!</p>
            </div>
            <div
              className="rounded-2xl p-8 mb-6 w-full max-w-md"
              style={{
                background: "rgba(14,22,64,.7)",
                border: "1px solid rgba(0,212,255,.25)",
                boxShadow: "0 0 40px rgba(0,212,255,.15), inset 0 0 30px rgba(0,212,255,.05)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <TrophyIcon
                  size={32}
                  style={{
                    color: E,
                  }}
                />
                <span className="text-3xl font-black text-white">{xe.score}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className="text-center rounded-xl p-4"
                  style={{
                    background: "rgba(0,212,255,.08)",
                    border: "1px solid rgba(0,212,255,.2)",
                  }}
                >
                  <ZapIcon
                    size={20}
                    className="mx-auto mb-1"
                    style={{
                      color: j,
                    }}
                  />
                  <div className="text-2xl font-black text-white">{xe.words}</div>
                  <div className="text-xs text-white/50">Palabras / 单词</div>
                </div>
                <div
                  className="text-center rounded-xl p-4"
                  style={{
                    background: "rgba(255,0,170,.08)",
                    border: "1px solid rgba(255,0,170,.2)",
                  }}
                >
                  <StarIcon
                    size={20}
                    className="mx-auto mb-1"
                    style={{
                      color: I,
                    }}
                  />
                  <div className="text-2xl font-black text-white">{xe.streak}</div>
                  <div className="text-xs text-white/50">Racha máxima / 最高连击</div>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClick}
                className="px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-105 flex items-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #ff00aa)",
                  boxShadow: "0 0 20px rgba(0,212,255,.3)",
                }}
              >
                <RotateCcwIcon size={18} /> Reintentar / 重试
              </button>
            </div>
            <div className="mt-4">
              <P currentGameId="word-pinball" />
            </div>
          </div>
        </StarfieldBackground>
      );
    default:
      return (
        <StarfieldBackground>
          <Be1Component />
          <div
            className="min-h-screen flex flex-col items-center p-2 relative z-10"
            style={{
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            <div className="w-full flex items-center justify-between mb-2 px-2">
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-1.5"
                style={{
                  background: "rgba(14,22,64,.6)",
                  border: "1px solid rgba(0,212,255,.25)",
                  boxShadow: "0 0 15px rgba(0,212,255,.1)",
                }}
              >
                <ZapIcon
                  size={14}
                  style={{
                    color: E,
                  }}
                />
                <span className="text-white font-black text-sm">{N}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {Array.from({
                  length: V,
                }).map((t, l) => (
                  <HeartIcon
                    key={l}
                    size={16}
                    style={{
                      color: l < A ? K : "rgba(255,255,255,.15)",
                      filter: l < A ? `drop-shadow(0 0 4px ${K})` : "none",
                    }}
                  />
                ))}
              </div>
              <div
                className="flex items-center gap-1.5 rounded-xl px-3 py-1.5"
                style={{
                  background: "rgba(14,22,64,.6)",
                  border: "1px solid rgba(255,0,170,.25)",
                  boxShadow: "0 0 15px rgba(255,0,170,.1)",
                }}
              >
                <TrophyIcon
                  size={14}
                  style={{
                    color: I,
                  }}
                />
                <span className="text-white font-bold text-sm">{ce}</span>
              </div>
            </div>
            <div
              className="w-full mb-2 rounded-xl px-4 py-2 text-center"
              style={{
                background: "rgba(14,22,64,.5)",
                border: "1px solid rgba(0,212,255,.2)",
                backdropFilter: "blur(8px)",
                boxShadow: "0 0 20px rgba(0,212,255,.08), inset 0 0 20px rgba(0,212,255,.03)",
              }}
            >
              <div className="flex items-center justify-center gap-1.5 mb-1">
                {Te.split("").map((t, l) => (
                  <span
                    key={l}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg font-black text-lg"
                    style={{
                      background: l < B ? "rgba(16,185,129,.2)" : "rgba(0,212,255,.08)",
                      border: `1px solid ${l < B ? "rgba(16,185,129,.5)" : "rgba(0,212,255,.3)"}`,
                      color: l < B ? Z : l === B ? E : "rgba(255,255,255,.5)",
                      textShadow: l < B ? `0 0 10px ${Z}` : l === B ? `0 0 10px ${E}` : "none",
                      boxShadow: l < B ? "0 0 12px rgba(16,185,129,.3)" : "none",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {t.toUpperCase()}
                  </span>
                ))}
              </div>
              {$ && <p className="text-xs text-white/50">{$.chino}</p>}
            </div>
            {J > 0 && (
              <div
                className="mb-1 rounded-full px-3 py-0.5 text-xs font-bold"
                style={{
                  background: "rgba(255,0,170,.15)",
                  border: "1px solid rgba(255,0,170,.3)",
                  color: I,
                  boxShadow: "0 0 10px rgba(255,0,170,.2)",
                }}
              >{`x${(1 + Math.floor(J / 3) * 0.5).toFixed(1)} racha`}</div>
            )}
            <div className="pinball-table w-full flex justify-center">
              <div
                ref={_eRef}
                className="pinball-inner relative overflow-hidden"
                style={{
                  width: `${width}px`,
                  height: `${height}px`,
                  background: "linear-gradient(180deg, rgba(8,12,40,.95) 0%, rgba(14,22,64,.98) 100%)",
                  border: "2px solid rgba(0,212,255,.35)",
                  borderRadius: "16px",
                  boxShadow:
                    "0 0 40px rgba(0,212,255,.15), inset 0 0 60px rgba(0,0,0,.5), 0 20px 60px rgba(0,0,0,.4)",
                  animation: Ye ? "shakeWrong 0.4s ease" : "none",
                }}
              >
                <canvas
                  ref={peRef}
                  width={width}
                  height={height}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${width}px`,
                    height: `${height}px`,
                    zIndex: 5,
                  }}
                />
              </div>
            </div>
            <div
              className="w-full flex items-center justify-between mt-3 px-2"
              style={{
                maxWidth: `${width}px`,
              }}
            >
              <button
                className="flipper-btn-press flex items-center justify-center gap-2 rounded-2xl font-black text-white transition-all"
                style={{
                  width: "44%",
                  minHeight: "60px",
                  background: "linear-gradient(135deg, rgba(0,212,255,.2), rgba(0,212,255,.05))",
                  border: "2px solid rgba(0,212,255,.4)",
                  boxShadow: "0 0 20px rgba(0,212,255,.2), inset 0 0 12px rgba(0,212,255,.1)",
                  fontSize: "14px",
                }}
                onTouchStart={(t) => {
                  t.preventDefault();
                  Me();
                }}
                onTouchEnd={(t) => {
                  t.preventDefault();
                  he();
                }}
                onMouseDown={Me}
                onMouseUp={he}
                onMouseLeave={he}
              >
                <ChevronLeftIcon
                  size={28}
                  style={{
                    color: j,
                    filter: `drop-shadow(0 0 4px ${j})`,
                  }}
                />
                <span
                  style={{
                    color: j,
                    textShadow: `0 0 8px ${j}`,
                  }}
                >
                  IZQ
                </span>
              </button>
              <button
                className="flipper-btn-press flex items-center justify-center gap-2 rounded-2xl font-black text-white transition-all"
                style={{
                  width: "44%",
                  minHeight: "60px",
                  background: "linear-gradient(135deg, rgba(255,0,170,.2), rgba(255,0,170,.05))",
                  border: "2px solid rgba(255,0,170,.4)",
                  boxShadow: "0 0 20px rgba(255,0,170,.2), inset 0 0 12px rgba(255,0,170,.1)",
                  fontSize: "14px",
                }}
                onTouchStart={(t) => {
                  t.preventDefault();
                  Ae();
                }}
                onTouchEnd={(t) => {
                  t.preventDefault();
                  ue();
                }}
                onMouseDown={Ae}
                onMouseUp={ue}
                onMouseLeave={ue}
              >
                <span
                  style={{
                    color: I,
                    textShadow: `0 0 8px ${I}`,
                  }}
                >
                  DER
                </span>
                <ChevronRightIcon
                  size={28}
                  style={{
                    color: I,
                    filter: `drop-shadow(0 0 4px ${I})`,
                  }}
                />
              </button>
            </div>
            <div className="mt-2 text-center">
              <p className="text-white/30 text-xs">← → o A D para los flippers</p>
            </div>
            <div className="mt-2">
              <button
                onClick={onClick}
                className="px-4 py-2 rounded-xl font-bold text-white text-sm transition-all hover:scale-105 flex items-center gap-2"
                style={{
                  background: "rgba(255,255,255,.08)",
                  border: "1px solid rgba(255,255,255,.15)",
                }}
              >
                <RotateCcwIcon size={14} /> Salir / 退出
              </button>
            </div>
          </div>
        </StarfieldBackground>
      );
  }
}
export { UtComponent as default };
